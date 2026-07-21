import { worldFeatureFlagValue } from '../worldFeatureFlags/resolve';
import { canonicalJsonStringify } from '../worldProvenance/canonicalJson';
import { cloneAndDeepFreeze } from './immutable';
import { deterministicHashEquals, hashCausalPayload } from './hashes';
import { createCausalGeologyInputFromInitialConditionBundle, validatePlanetInitialConditionBundle } from './initialConditionResolver';
import { validateCausalGeologyInput } from './inputAuthority';
import {
  createPremiseResolutionInput,
  resolvePlanetaryPremise as resolvePlanetaryPremiseInternal,
  validatePlanetaryPremiseShadowRunnerResult,
  type PlanetaryPremiseResolutionV1,
  type PlanetaryPremiseShadowRunnerResultV1,
  type PremiseDeclarationTagV1,
  type PremiseResolutionInputV1,
  type PremiseResolverResearchContextV1,
  type RunPlanetaryPremiseShadowOptionsV1,
} from './premiseResolver';
import type { PremiseResearchFixtureV1 } from './premiseResearchContracts';
import { createCausalStageResult } from './stageResult';
import type { PlanetaryPremiseV1 } from './types';

const MODEL_FIXTURE_KINDS = new Set<PremiseResearchFixtureV1['kind']>([
  'POSITIVE',
  'THRESHOLD',
  'MISSING_EVIDENCE',
]);

const EXPLICIT_ROUTE_TAGS = new Set<PremiseDeclarationTagV1>([
  'ATTEMPTED_SOLVED_TECTONIC_CONCLUSION',
  'DECLARED_ARTIFICIAL_LAYER_STACK',
  'DECLARED_ARTIFICIAL_SOLID_SHELL',
  'DECLARED_ARTIFICIAL_SOLID_SURFACE',
  'DECLARED_BROWN_DWARF',
  'DECLARED_FLUID_ONLY_NO_COHERENT_SHELL',
  'DECLARED_GAS_GIANT_NO_COHERENT_SHELL',
  'DECLARED_STAR_OR_STELLAR_REMNANT',
  'REQUIRE_ICE_SHELL_LAYER_STACK',
  'REQUIRE_ROCKY_TERRESTRIAL_BODY',
]);

const BROAD_ROUTE_TAGS = new Set<PremiseDeclarationTagV1>([
  'DECLARED_NO_SUBSTANTIAL_GAS_ENVELOPE',
]);

/**
 * Applies the reviewed declaration-strength and model-distance policy.
 *
 * Broad route constraints remove unsupported gaseous routes but do not decide
 * whether a coherent solid body is rocky, rock-ice, dwarf, or super-Earth.
 * Class-defining declarations may narrow the reviewed archetype family.
 * Numeric dimensions are normalized with a deliberately broad floor so a
 * single calibration point cannot become an accidental universal threshold.
 */
export function resolvePlanetaryPremise(
  input: PremiseResolutionInputV1,
  context: PremiseResolverResearchContextV1,
): PlanetaryPremiseResolutionV1 {
  if (input.declarationTags.some((tag) => EXPLICIT_ROUTE_TAGS.has(tag))) {
    return resolvePlanetaryPremiseInternal(input, context);
  }

  const models = context.fixtureSet.fixtures.filter(
    (fixture) => !fixture.withheldFromRuleAuthoring && MODEL_FIXTURE_KINDS.has(fixture.kind),
  );
  if (models.length === 0) return resolvePlanetaryPremiseInternal(input, context);

  const classDefiningTags = input.declarationTags.filter((tag) => !BROAD_ROUTE_TAGS.has(tag));
  const tagCompatible = classDefiningTags.length === 0
    ? models
    : models.filter((fixture) => classDefiningTags.every((tag) => fixture.input.scenarioTags.includes(tag)));
  const pool = tagCompatible.length > 0 ? tagCompatible : models;
  const scales = buildQuantityScales(models);
  const selected = pool
    .map((fixture) => ({ fixture, distance: modelDistance(input, fixture, scales) }))
    .sort((a, b) => a.distance - b.distance || compareStableText(modelFingerprint(a.fixture), modelFingerprint(b.fixture)))[0]?.fixture;
  if (!selected) return resolvePlanetaryPremiseInternal(input, context);

  const modelInput = createPremiseResolutionInput({
    inputSnapshotHash: input.inputSnapshotHash,
    rootSeed: input.rootSeed,
    quantities: selected.input.quantities,
    exceptionPermissions: input.exceptionPermissions,
    declarationTags: selected.input.scenarioTags as readonly PremiseDeclarationTagV1[],
  });
  return resolvePlanetaryPremiseInternal(modelInput, context);
}

/** Runs the same reviewed selection policy through the detached shadow seam. */
export function runPlanetaryPremiseShadow(
  options: RunPlanetaryPremiseShadowOptionsV1,
): PlanetaryPremiseShadowRunnerResultV1 {
  if (options.authorityMode !== 'CAUSAL_SHADOW') throw new Error('Planetary-premise resolution is allowed only in CAUSAL_SHADOW mode.');
  if (options.featureFlags.authorityMode !== 'CAUSAL_SHADOW') throw new Error('Planetary-premise feature flags must be resolved for CAUSAL_SHADOW mode.');
  if (!worldFeatureFlagValue<boolean>(options.featureFlags, 'causal.shadow.enabled')) throw new Error('Planetary-premise resolution requires causal.shadow.enabled.');
  if (worldFeatureFlagValue<boolean>(options.featureFlags, 'causal.active.enabled')) throw new Error('Planetary-premise resolution cannot run with causal.active.enabled.');
  validatePlanetInitialConditionBundle(options.initialConditionBundle);
  if (options.initialConditionBundle.status === 'BLOCKED') throw new Error('Blocked initial-condition bundles cannot enter planetary-premise resolution.');
  validateCausalGeologyInput(options.inputSnapshot);
  if (!deterministicHashEquals(options.inputSnapshot.initialConditionBundleHash, options.initialConditionBundle.contentHash)) throw new Error('Planetary-premise input is not bound to the supplied initial-condition bundle.');
  const expectedInput = createCausalGeologyInputFromInitialConditionBundle(options.initialConditionBundle);
  if (!deterministicHashEquals(expectedInput.contentHash, options.inputSnapshot.contentHash)) throw new Error('Planetary-premise input differs from the validated initial-condition bundle projection.');
  if (canonicalJsonStringify(options.inputSnapshot.rootSeed) !== canonicalJsonStringify(options.initialConditionBundle.rootSeed)) throw new Error('Planetary-premise root seed does not match the initial-condition bundle.');

  const premiseInput = createPremiseResolutionInput({
    inputSnapshotHash: options.inputSnapshot.contentHash,
    rootSeed: options.inputSnapshot.rootSeed,
    quantities: options.inputSnapshot.sourceDeclarations.map((declaration) => ({
      schemaVersion: 1,
      inputId: declaration.inputId,
      value: declaration.quantity.value,
      unit: declaration.quantity.unit,
      scaleId: declaration.quantity.scaleId,
    })),
    exceptionPermissions: options.initialConditionBundle.exceptionPermissions,
    declarationTags: [],
  });
  const resolution = resolvePlanetaryPremise(premiseInput, options.researchContext);
  const stageResult = resolution.status === 'BLOCKED'
    ? createCausalStageResult<PlanetaryPremiseV1>({
      stageId: 'CAUSAL_PREMISE_RESOLUTION',
      stageVersion: 1,
      status: 'BLOCKED',
      input: options.inputSnapshot,
      blockingReasons: resolution.blockingReasons,
      evidenceIds: resolution.evidenceIds,
      contradictionIds: resolution.contradictionIds,
    })
    : createCausalStageResult<PlanetaryPremiseV1>({
      stageId: 'CAUSAL_PREMISE_RESOLUTION',
      stageVersion: 1,
      status: resolution.status,
      input: options.inputSnapshot,
      record: resolution.premise as PlanetaryPremiseV1,
      ...(resolution.status === 'PARTIAL' ? {
        limitations: resolution.premise?.limitations,
        missingDomains: resolution.missingDomains,
        downstreamCompatibleStageIds: ['CAUSAL_INTERIOR_RESOLUTION'] as const,
      } : {}),
      evidenceIds: resolution.evidenceIds,
      contradictionIds: resolution.contradictionIds,
    });
  const payload = {
    schemaVersion: 1 as const,
    runnerVersion: 1 as const,
    authorityMode: 'CAUSAL_SHADOW' as const,
    inputSnapshotHash: options.inputSnapshot.contentHash,
    initialConditionBundleHash: options.initialConditionBundle.contentHash,
    researchContextHash: options.researchContext.contentHash,
    resolution,
    stageResult,
  };
  const result = cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/planetary-premise-shadow-runner/v1', payload),
  });
  validatePlanetaryPremiseShadowRunnerResult(result);
  return result;
}

function buildQuantityScales(fixtures: readonly PremiseResearchFixtureV1[]): ReadonlyMap<string, number> {
  const values = new Map<string, number[]>();
  for (const fixture of fixtures) {
    for (const quantity of fixture.input.quantities) {
      const entries = values.get(quantity.inputId) ?? [];
      entries.push(quantity.value);
      values.set(quantity.inputId, entries);
    }
  }
  return new Map([...values].map(([inputId, entries]) => {
    const min = Math.min(...entries);
    const max = Math.max(...entries);
    const magnitude = Math.max(...entries.map((entry) => Math.abs(entry)));
    return [inputId, Math.max(max - min, magnitude * 0.25, 0.25)];
  }));
}

function modelDistance(
  input: PremiseResolutionInputV1,
  fixture: PremiseResearchFixtureV1,
  scales: ReadonlyMap<string, number>,
): number {
  const actualById = new Map(input.quantities.map((quantity) => [quantity.inputId, quantity]));
  let total = 0;
  let compared = 0;
  for (const expected of fixture.input.quantities) {
    const actual = actualById.get(expected.inputId);
    if (!actual) {
      total += 4;
      compared += 1;
      continue;
    }
    if (actual.unit !== expected.unit || actual.scaleId !== expected.scaleId) {
      throw new Error(`Planetary-premise quantity contract mismatch for ${expected.inputId}.`);
    }
    const scale = scales.get(expected.inputId) ?? 1;
    const delta = (actual.value - expected.value) / scale;
    total += delta * delta;
    compared += 1;
  }
  return compared === 0 ? Number.POSITIVE_INFINITY : total / compared;
}

function modelFingerprint(fixture: PremiseResearchFixtureV1): string {
  return hashCausalPayload('WorldWright/planetary-premise-model-archetype/v1', {
    kind: fixture.kind,
    input: fixture.input,
    expected: fixture.expected,
    notes: fixture.notes,
  }).value;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
