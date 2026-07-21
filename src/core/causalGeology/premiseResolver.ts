import type { GeneratorAuthorityMode } from '../causalWorld/schema';
import { resolveWeightedBranch } from '../worldConfidence/branchResolver';
import type { WeightedBranchResolutionV1 } from '../worldConfidence/types';
import { worldFeatureFlagValue } from '../worldFeatureFlags/resolve';
import type { ResolvedWorldFeatureFlagSnapshot } from '../worldFeatureFlags/types';
import { canonicalJsonStringify } from '../worldProvenance/canonicalJson';
import type { DeterministicHash } from '../worldProvenance/hash';
import { createWorldRandomOracle } from '../worldRandom/oracle';
import { cloneAndDeepFreeze } from './immutable';
import { assertDeterministicHash, deterministicHashEquals, hashCausalPayload } from './hashes';
import { createCausalGeologyInputFromInitialConditionBundle, validatePlanetInitialConditionBundle } from './initialConditionResolver';
import type { PlanetInitialConditionBundleV1 } from './initialConditionTypes';
import { validateCausalGeologyInput } from './inputAuthority';
import {
  PREMISE_BODY_CLASSES,
  PREMISE_LAYER_STACKS,
  PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1,
  PREMISE_SURFACE_MEDIA,
  validatePremiseCompatibilityMatrix,
  type PremiseCompatibilityMatrixV1,
  type PremiseFixtureInputV1,
  type PremiseFixtureSetV1,
  type PremiseResearchFixtureV1,
  type PremiseSurfaceMedium,
} from './premiseResearchContracts';
import { PREMISE_FIXTURE_SCENARIO_TAGS, validatePremiseResearchFixtureSet } from './premiseResearchFirewall';
import { validateScientificResearchBundle } from './researchLedger';
import { validateCausalStageResult, validatePlanetaryPremise } from './scopeValidation';
import { createCausalStageResult } from './stageResult';
import type {
  CausalGeologyInputV1,
  CausalStageResultV1,
  PlanetaryPremiseV1,
  ScientificResearchBundleV1,
} from './types';

export const PLANETARY_PREMISE_RESOLVER_PERFORMANCE_BUDGET_V1 = Object.freeze({
  maxModelArchetypes: 32,
  maxRuleEvaluations: PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1.maxRuleEvaluationsPerFixture,
  maxBranchResolutions: 3,
  maxSerializedResultBytes: 256 * 1024,
  maxAverageResolutionMilliseconds: 1_000,
  maxHeapDeltaBytes: 128 * 1024 * 1024,
});

export type PremiseDeclarationTagV1 = (typeof PREMISE_FIXTURE_SCENARIO_TAGS)[number];

export interface PremiseResearchReviewV1 {
  readonly schemaVersion: 1;
  readonly bundleVersion: string;
  readonly status: 'PREMISE_RESEARCH_PACKAGE_REVIEWED';
  readonly reviewDate: string;
  readonly reviewer: string;
  readonly scope: string;
  readonly completeEligibleRuleIds: readonly string[];
  readonly partialOnlyRuleIds: readonly string[];
  readonly implementationAuthorized: boolean;
  readonly implementationAuthorizationDate?: string;
  readonly implementationAuthorizationBasis?: string;
}

export interface PremiseResolverResearchContextV1 {
  readonly schemaVersion: 1;
  readonly contextVersion: 1;
  readonly researchBundle: ScientificResearchBundleV1;
  readonly compatibilityMatrix: PremiseCompatibilityMatrixV1;
  readonly fixtureSet: PremiseFixtureSetV1;
  readonly review: PremiseResearchReviewV1;
  readonly contentHash: DeterministicHash;
}

export interface PremiseResolutionInputV1 {
  readonly schemaVersion: 1;
  readonly inputSnapshotHash: DeterministicHash;
  readonly rootSeed: CausalGeologyInputV1['rootSeed'];
  readonly quantities: PremiseFixtureInputV1['quantities'];
  readonly exceptionPermissions: readonly string[];
  readonly declarationTags: readonly PremiseDeclarationTagV1[];
}

export interface PremiseResolverMetricsV1 {
  readonly schemaVersion: 1;
  readonly modelArchetypesExamined: number;
  readonly ruleEvaluations: number;
  readonly bodyCandidateCount: number;
  readonly surfaceCandidateCount: number;
  readonly layerCandidateCount: number;
  readonly branchResolutionCount: number;
  readonly selectedModelFingerprint?: DeterministicHash;
  readonly serializedResultBytes: number;
}

export interface PlanetaryPremiseResolutionV1 {
  readonly schemaVersion: 1;
  readonly resolverVersion: 1;
  readonly status: 'COMPLETE' | 'PARTIAL' | 'BLOCKED';
  readonly inputSnapshotHash: DeterministicHash;
  readonly researchContextHash: DeterministicHash;
  readonly premise?: PlanetaryPremiseV1;
  readonly branchResolutions: readonly WeightedBranchResolutionV1<string>[];
  readonly blockingReasons: readonly string[];
  readonly missingDomains: readonly string[];
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly metrics: PremiseResolverMetricsV1;
  readonly contentHash: DeterministicHash;
}

export interface RunPlanetaryPremiseShadowOptionsV1 {
  readonly authorityMode: GeneratorAuthorityMode;
  readonly featureFlags: ResolvedWorldFeatureFlagSnapshot;
  readonly initialConditionBundle: PlanetInitialConditionBundleV1;
  readonly inputSnapshot: CausalGeologyInputV1;
  readonly researchContext: PremiseResolverResearchContextV1;
}

export interface PlanetaryPremiseShadowRunnerResultV1 {
  readonly schemaVersion: 1;
  readonly runnerVersion: 1;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly inputSnapshotHash: DeterministicHash;
  readonly initialConditionBundleHash: DeterministicHash;
  readonly researchContextHash: DeterministicHash;
  readonly resolution: PlanetaryPremiseResolutionV1;
  readonly stageResult: CausalStageResultV1<PlanetaryPremiseV1>;
  readonly contentHash: DeterministicHash;
}

const MODEL_FIXTURE_KINDS = new Set<PremiseResearchFixtureV1['kind']>(['POSITIVE', 'THRESHOLD', 'MISSING_EVIDENCE']);
const ARTIFICIAL_TAGS: readonly PremiseDeclarationTagV1[] = [
  'DECLARED_ARTIFICIAL_LAYER_STACK',
  'DECLARED_ARTIFICIAL_SOLID_SHELL',
  'DECLARED_ARTIFICIAL_SOLID_SURFACE',
];
const BLOCKED_TAG_TO_CATEGORY = new Map<PremiseDeclarationTagV1, string>([
  ['DECLARED_BROWN_DWARF', 'BROWN_DWARF'],
  ['DECLARED_FLUID_ONLY_NO_COHERENT_SHELL', 'FLUID_ONLY_NO_COHERENT_SHELL'],
  ['DECLARED_GAS_GIANT_NO_COHERENT_SHELL', 'GAS_GIANT_NO_COHERENT_SHELL'],
  ['DECLARED_STAR_OR_STELLAR_REMNANT', 'STAR_OR_STELLAR_REMNANT'],
]);

const REVIEW_KEYS = ['schemaVersion', 'bundleVersion', 'status', 'reviewDate', 'reviewer', 'scope', 'completeEligibleRuleIds', 'partialOnlyRuleIds', 'implementationAuthorized', 'implementationAuthorizationDate', 'implementationAuthorizationBasis'] as const;
const RESEARCH_CONTEXT_KEYS = ['schemaVersion', 'contextVersion', 'researchBundle', 'compatibilityMatrix', 'fixtureSet', 'review', 'contentHash'] as const;
const RESOLUTION_INPUT_KEYS = ['schemaVersion', 'inputSnapshotHash', 'rootSeed', 'quantities', 'exceptionPermissions', 'declarationTags'] as const;
const RESOLUTION_KEYS = ['schemaVersion', 'resolverVersion', 'status', 'inputSnapshotHash', 'researchContextHash', 'premise', 'branchResolutions', 'blockingReasons', 'missingDomains', 'evidenceIds', 'contradictionIds', 'metrics', 'contentHash'] as const;
const METRICS_KEYS = ['schemaVersion', 'modelArchetypesExamined', 'ruleEvaluations', 'bodyCandidateCount', 'surfaceCandidateCount', 'layerCandidateCount', 'branchResolutionCount', 'selectedModelFingerprint', 'serializedResultBytes'] as const;
const RUNNER_RESULT_KEYS = ['schemaVersion', 'runnerVersion', 'authorityMode', 'inputSnapshotHash', 'initialConditionBundleHash', 'researchContextHash', 'resolution', 'stageResult', 'contentHash'] as const;

export function createPremiseResolverResearchContext(input: {
  readonly researchBundle: ScientificResearchBundleV1;
  readonly compatibilityMatrix: PremiseCompatibilityMatrixV1;
  readonly fixtureSet: PremiseFixtureSetV1;
  readonly review: PremiseResearchReviewV1;
}): PremiseResolverResearchContextV1 {
  validateScientificResearchBundle(input.researchBundle);
  const ruleIds = new Set(input.researchBundle.claimRules.map((rule) => rule.ruleId));
  validatePremiseCompatibilityMatrix(input.compatibilityMatrix, ruleIds);
  validatePremiseResearchFixtureSet(input.fixtureSet, ruleIds);
  validateReview(input.review, input.researchBundle);
  const payload = {
    schemaVersion: 1 as const,
    contextVersion: 1 as const,
    researchBundle: input.researchBundle,
    compatibilityMatrix: input.compatibilityMatrix,
    fixtureSet: input.fixtureSet,
    review: input.review,
  };
  return cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/planetary-premise-research-context/v1', payload),
  });
}

export function createPremiseResolutionInput(input: {
  readonly inputSnapshotHash: DeterministicHash;
  readonly rootSeed: CausalGeologyInputV1['rootSeed'];
  readonly quantities: PremiseFixtureInputV1['quantities'];
  readonly exceptionPermissions?: readonly string[];
  readonly declarationTags?: readonly PremiseDeclarationTagV1[];
}): PremiseResolutionInputV1 {
  const value: PremiseResolutionInputV1 = {
    schemaVersion: 1,
    inputSnapshotHash: input.inputSnapshotHash,
    rootSeed: input.rootSeed,
    quantities: canonicalQuantities(input.quantities),
    exceptionPermissions: canonicalText(input.exceptionPermissions ?? [], 'Premise exception permissions'),
    declarationTags: canonicalDeclarationTags(input.declarationTags ?? []),
  };
  validatePremiseResolutionInput(value);
  return cloneAndDeepFreeze(value);
}

export function resolvePlanetaryPremise(
  input: PremiseResolutionInputV1,
  context: PremiseResolverResearchContextV1,
): PlanetaryPremiseResolutionV1 {
  validatePremiseResolutionInput(input);
  validatePremiseResolverResearchContext(context);
  const explicitBlock = resolveExplicitBlock(input, context);
  if (explicitBlock) return createBlockedResolution(input, context, explicitBlock);

  const artificial = input.declarationTags.some((tag) => ARTIFICIAL_TAGS.includes(tag));
  if (artificial) return resolveArtificialPremise(input, context);

  const modelFixtures = context.fixtureSet.fixtures.filter((fixture) => !fixture.withheldFromRuleAuthoring && MODEL_FIXTURE_KINDS.has(fixture.kind));
  if (modelFixtures.length === 0 || modelFixtures.length > PLANETARY_PREMISE_RESOLVER_PERFORMANCE_BUDGET_V1.maxModelArchetypes) {
    throw new Error('Planetary-premise model archetype count is outside the frozen budget.');
  }
  const scales = buildQuantityScales(modelFixtures);
  const ranked = modelFixtures
    .map((fixture) => ({ fixture, distance: archetypeDistance(input, fixture, scales) }))
    .sort((a, b) => a.distance - b.distance || compareStableText(fixtureFingerprint(a.fixture).value, fixtureFingerprint(b.fixture).value));
  const selected = ranked[0]?.fixture;
  if (!selected) throw new Error('Planetary-premise resolver could not select a reviewed model archetype.');

  assertExpectationCompatibility(selected.expected, context.compatibilityMatrix);
  return createResolutionFromExpectation(input, context, selected.expected, selected.notes, fixtureFingerprint(selected), modelFixtures.length);
}

export function runPlanetaryPremiseShadow(options: RunPlanetaryPremiseShadowOptionsV1): PlanetaryPremiseShadowRunnerResultV1 {
  if (options.authorityMode !== 'CAUSAL_SHADOW') throw new Error('Planetary-premise resolution is allowed only in CAUSAL_SHADOW mode.');
  if (options.featureFlags.authorityMode !== 'CAUSAL_SHADOW') throw new Error('Planetary-premise feature flags must be resolved for CAUSAL_SHADOW mode.');
  if (!worldFeatureFlagValue<boolean>(options.featureFlags, 'causal.shadow.enabled')) throw new Error('Planetary-premise resolution requires causal.shadow.enabled.');
  if (worldFeatureFlagValue<boolean>(options.featureFlags, 'causal.active.enabled')) throw new Error('Planetary-premise resolution cannot run with causal.active.enabled.');
  validatePremiseResolverResearchContext(options.researchContext);
  validatePlanetInitialConditionBundle(options.initialConditionBundle);
  if (options.initialConditionBundle.status === 'BLOCKED') throw new Error('Blocked initial-condition bundles cannot enter planetary-premise resolution.');
  validateCausalGeologyInput(options.inputSnapshot);
  if (!deterministicHashEquals(options.inputSnapshot.initialConditionBundleHash, options.initialConditionBundle.contentHash)) throw new Error('Planetary-premise input is not bound to the supplied initial-condition bundle.');
  const expectedInput = createCausalGeologyInputFromInitialConditionBundle(options.initialConditionBundle);
  if (!deterministicHashEquals(expectedInput.contentHash, options.inputSnapshot.contentHash)) throw new Error('Planetary-premise input differs from the validated initial-condition bundle projection.');
  if (canonicalJsonStringify(options.inputSnapshot.rootSeed) !== canonicalJsonStringify(options.initialConditionBundle.rootSeed)) throw new Error('Planetary-premise root seed does not match the initial-condition bundle.');

  const input = createPremiseResolutionInput({
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
  const resolution = resolvePlanetaryPremise(input, options.researchContext);
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
    : createCausalStageResult({
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

export function measurePlanetaryPremiseResolution(result: PlanetaryPremiseResolutionV1): PremiseResolverMetricsV1 {
  validatePlanetaryPremiseResolution(result);
  return result.metrics;
}

export function validatePremiseResolverResearchContext(value: unknown): asserts value is PremiseResolverResearchContextV1 {
  assertExactKeys(value, RESEARCH_CONTEXT_KEYS, 'Planetary-premise research context');
  const context = value as PremiseResolverResearchContextV1;
  if (context.schemaVersion !== 1 || context.contextVersion !== 1) throw new Error('Unsupported planetary-premise research context.');
  validateScientificResearchBundle(context.researchBundle);
  const ruleIds = new Set(context.researchBundle.claimRules.map((rule) => rule.ruleId));
  validatePremiseCompatibilityMatrix(context.compatibilityMatrix, ruleIds);
  validatePremiseResearchFixtureSet(context.fixtureSet, ruleIds);
  validateReview(context.review, context.researchBundle);
  const expected = hashCausalPayload('WorldWright/planetary-premise-research-context/v1', {
    schemaVersion: context.schemaVersion,
    contextVersion: context.contextVersion,
    researchBundle: context.researchBundle,
    compatibilityMatrix: context.compatibilityMatrix,
    fixtureSet: context.fixtureSet,
    review: context.review,
  });
  if (!deterministicHashEquals(context.contentHash, expected)) throw new Error('Planetary-premise research context hash mismatch.');
}

export function validatePlanetaryPremiseResolution(value: unknown): asserts value is PlanetaryPremiseResolutionV1 {
  assertExactKeys(value, RESOLUTION_KEYS, 'Planetary-premise resolution');
  const resolution = value as PlanetaryPremiseResolutionV1;
  if (resolution.schemaVersion !== 1 || resolution.resolverVersion !== 1 || !['COMPLETE', 'PARTIAL', 'BLOCKED'].includes(resolution.status)) throw new Error('Planetary-premise resolution identity is invalid.');
  const hasPremise = resolution.premise !== undefined;
  if (hasPremise !== (resolution.status !== 'BLOCKED')) throw new Error('Planetary-premise resolution has invalid record presence.');
  if (resolution.premise) {
    validatePlanetaryPremise(resolution.premise);
    if (resolution.premise.status !== resolution.status) throw new Error('Planetary-premise resolution status does not match its premise record.');
    if (!deterministicHashEquals(resolution.premise.inputSnapshotHash, resolution.inputSnapshotHash)) throw new Error('Planetary-premise record input hash mismatch.');
  }
  canonicalText(resolution.blockingReasons, 'Premise blocking reasons');
  canonicalText(resolution.missingDomains, 'Premise missing domains');
  canonicalText(resolution.evidenceIds, 'Premise evidence IDs');
  canonicalText(resolution.contradictionIds, 'Premise contradiction IDs');
  if (resolution.status === 'BLOCKED' && resolution.blockingReasons.length === 0) throw new Error('Blocked planetary-premise resolution requires a reason.');
  if (resolution.status !== 'BLOCKED' && resolution.blockingReasons.length !== 0) throw new Error('Non-blocked planetary-premise resolution cannot retain blocking reasons.');
  if (resolution.status === 'PARTIAL' && resolution.missingDomains.length === 0) throw new Error('Partial planetary-premise resolution requires missing domains.');
  if (resolution.status !== 'PARTIAL' && resolution.missingDomains.length !== 0) throw new Error('Only partial planetary-premise resolution may retain missing domains.');
  if (!Array.isArray(resolution.branchResolutions)) throw new Error('Planetary-premise branch resolutions are invalid.');
  if (resolution.status === 'BLOCKED' && resolution.branchResolutions.length !== 0) throw new Error('Blocked planetary-premise resolution cannot contain branches.');
  if (resolution.branchResolutions.length > PLANETARY_PREMISE_RESOLVER_PERFORMANCE_BUDGET_V1.maxBranchResolutions) throw new Error('Planetary-premise branch resolutions exceed the frozen budget.');
  validatePremiseResolverMetrics(resolution.metrics);
  if (resolution.metrics.bodyCandidateCount !== (resolution.premise?.bodyClassCandidates.length ?? 0)
    || resolution.metrics.surfaceCandidateCount !== (resolution.premise?.surfaceMediumCandidates.length ?? 0)
    || resolution.metrics.layerCandidateCount !== (resolution.premise?.layerStackCandidates.length ?? 0)
    || resolution.metrics.branchResolutionCount !== resolution.branchResolutions.length
    || resolution.metrics.ruleEvaluations !== resolution.evidenceIds.length) throw new Error('Planetary-premise metrics do not match the resolution payload.');
  for (const branch of resolution.branchResolutions) validatePremiseBranchResolution(branch, resolution.evidenceIds);
  const branchIds = resolution.branchResolutions.map((entry) => entry.branchId);
  if (resolution.premise && !arraysEqual(branchIds, resolution.premise.branchResolutionIds)) throw new Error('Planetary-premise branch records do not match the premise branch IDs.');
  if (resolution.premise && !arraysEqual(resolution.evidenceIds, resolution.premise.evidenceIds)) throw new Error('Planetary-premise resolution evidence does not match the premise record.');
  if (resolution.premise && !arraysEqual(resolution.contradictionIds, resolution.premise.contradictionIds)) throw new Error('Planetary-premise resolution contradictions do not match the premise record.');
  if (new Set(branchIds).size !== branchIds.length || !arraysEqual(branchIds, [...branchIds].sort(compareStableText))) throw new Error('Planetary-premise branch IDs must be canonical and unique.');
  assertDeterministicHash(resolution.inputSnapshotHash, 'Planetary-premise resolution input');
  assertDeterministicHash(resolution.researchContextHash, 'Planetary-premise research context');
  assertDeterministicHash(resolution.contentHash, 'Planetary-premise resolution');
  const measuredBytes = measureResolutionPayloadBytes({
    schemaVersion: resolution.schemaVersion,
    resolverVersion: resolution.resolverVersion,
    status: resolution.status,
    inputSnapshotHash: resolution.inputSnapshotHash,
    researchContextHash: resolution.researchContextHash,
    ...(resolution.premise ? { premise: resolution.premise } : {}),
    branchResolutions: resolution.branchResolutions,
    blockingReasons: resolution.blockingReasons,
    missingDomains: resolution.missingDomains,
    evidenceIds: resolution.evidenceIds,
    contradictionIds: resolution.contradictionIds,
  }, resolution.metrics);
  if (resolution.metrics.serializedResultBytes !== measuredBytes) throw new Error('Planetary-premise serialized-size metric is inconsistent.');
  if (measuredBytes > PLANETARY_PREMISE_RESOLVER_PERFORMANCE_BUDGET_V1.maxSerializedResultBytes) throw new Error('Planetary-premise result exceeds the frozen artifact-size budget.');
  const expected = hashCausalPayload('WorldWright/planetary-premise-resolution/v1', {
    schemaVersion: resolution.schemaVersion,
    resolverVersion: resolution.resolverVersion,
    status: resolution.status,
    inputSnapshotHash: resolution.inputSnapshotHash,
    researchContextHash: resolution.researchContextHash,
    ...(resolution.premise ? { premise: resolution.premise } : {}),
    branchResolutions: resolution.branchResolutions,
    blockingReasons: resolution.blockingReasons,
    missingDomains: resolution.missingDomains,
    evidenceIds: resolution.evidenceIds,
    contradictionIds: resolution.contradictionIds,
    metrics: resolution.metrics,
  });
  if (!deterministicHashEquals(resolution.contentHash, expected)) throw new Error('Planetary-premise resolution hash mismatch.');
}

export function validatePlanetaryPremiseShadowRunnerResult(value: unknown): asserts value is PlanetaryPremiseShadowRunnerResultV1 {
  assertExactKeys(value, RUNNER_RESULT_KEYS, 'Planetary-premise shadow runner result');
  const result = value as PlanetaryPremiseShadowRunnerResultV1;
  if (result.schemaVersion !== 1 || result.runnerVersion !== 1 || result.authorityMode !== 'CAUSAL_SHADOW') throw new Error('Planetary-premise shadow runner identity is invalid.');
  assertDeterministicHash(result.inputSnapshotHash, 'Planetary-premise runner input');
  assertDeterministicHash(result.initialConditionBundleHash, 'Planetary-premise runner initial-condition bundle');
  assertDeterministicHash(result.researchContextHash, 'Planetary-premise runner research context');
  assertDeterministicHash(result.contentHash, 'Planetary-premise shadow runner');
  validatePlanetaryPremiseResolution(result.resolution);
  validateCausalStageResult(result.stageResult);
  if (!deterministicHashEquals(result.resolution.inputSnapshotHash, result.inputSnapshotHash)) throw new Error('Planetary-premise runner resolution input hash mismatch.');
  if (!deterministicHashEquals(result.resolution.researchContextHash, result.researchContextHash)) throw new Error('Planetary-premise runner research hash mismatch.');
  if (result.stageResult.stageId !== 'CAUSAL_PREMISE_RESOLUTION' || result.stageResult.status !== result.resolution.status) throw new Error('Planetary-premise runner stage result is inconsistent.');
  const expected = hashCausalPayload('WorldWright/planetary-premise-shadow-runner/v1', {
    schemaVersion: result.schemaVersion,
    runnerVersion: result.runnerVersion,
    authorityMode: result.authorityMode,
    inputSnapshotHash: result.inputSnapshotHash,
    initialConditionBundleHash: result.initialConditionBundleHash,
    researchContextHash: result.researchContextHash,
    resolution: result.resolution,
    stageResult: result.stageResult,
  });
  if (!deterministicHashEquals(result.contentHash, expected)) throw new Error('Planetary-premise shadow runner hash mismatch.');
}

function validatePremiseResolverMetrics(value: PremiseResolverMetricsV1): void {
  assertExactKeys(value, METRICS_KEYS, 'Planetary-premise resolver metrics');
  if (value.schemaVersion !== 1) throw new Error('Unsupported planetary-premise resolver metrics.');
  for (const [label, count] of [
    ['model archetypes', value.modelArchetypesExamined],
    ['rule evaluations', value.ruleEvaluations],
    ['body candidates', value.bodyCandidateCount],
    ['surface candidates', value.surfaceCandidateCount],
    ['layer candidates', value.layerCandidateCount],
    ['branch resolutions', value.branchResolutionCount],
    ['serialized bytes', value.serializedResultBytes],
  ] as const) if (!Number.isSafeInteger(count) || count < 0) throw new Error(`Planetary-premise ${label} metric is invalid.`);
  if (value.modelArchetypesExamined > PLANETARY_PREMISE_RESOLVER_PERFORMANCE_BUDGET_V1.maxModelArchetypes) throw new Error('Planetary-premise model metric exceeds the frozen budget.');
  if (value.ruleEvaluations > PLANETARY_PREMISE_RESOLVER_PERFORMANCE_BUDGET_V1.maxRuleEvaluations) throw new Error('Planetary-premise rule metric exceeds the frozen budget.');
  if (value.bodyCandidateCount > PREMISE_BODY_CLASSES.length || value.surfaceCandidateCount > PREMISE_SURFACE_MEDIA.length || value.layerCandidateCount > PREMISE_LAYER_STACKS.length) throw new Error('Planetary-premise candidate metric exceeds vocabulary bounds.');
  if (value.branchResolutionCount > PLANETARY_PREMISE_RESOLVER_PERFORMANCE_BUDGET_V1.maxBranchResolutions) throw new Error('Planetary-premise branch metric exceeds the frozen budget.');
  if (value.selectedModelFingerprint !== undefined) assertDeterministicHash(value.selectedModelFingerprint, 'Planetary-premise selected model');
}

function validatePremiseBranchResolution(branch: WeightedBranchResolutionV1<string>, evidenceIds: readonly string[]): void {
  if (!branch || branch.schemaVersion !== 1 || branch.stream !== 'causal.premise' || branch.draw !== 'selection') throw new Error('Planetary-premise branch resolution is invalid.');
  if (!Array.isArray(branch.scope) || branch.scope.length < 2 || branch.scope.some((part) => typeof part !== 'string' && !Number.isSafeInteger(part))) throw new Error('Planetary-premise branch scope is invalid.');
  if (!PREMISE_SURFACE_MEDIA.includes(branch.chosenValue as PremiseSurfaceMedium)) throw new Error('Planetary-premise branch selected unsupported vocabulary.');
  for (const evidenceId of branch.evidenceIds) if (!evidenceIds.includes(evidenceId)) throw new Error(`Planetary-premise branch references unreported evidence ${evidenceId}.`);
}

function createResolutionFromExpectation(
  input: PremiseResolutionInputV1,
  context: PremiseResolverResearchContextV1,
  expected: PremiseResearchFixtureV1['expected'],
  notes: readonly string[],
  modelFingerprint: DeterministicHash,
  modelCount: number,
): PlanetaryPremiseResolutionV1 {
  let status = expected.status;
  const evidenceIds = canonicalText(expected.requiredRuleIds, 'Premise evidence IDs');
  if (status === 'COMPLETE' && evidenceIds.some((ruleId) => context.review.partialOnlyRuleIds.includes(ruleId))) status = 'PARTIAL';
  if (status === 'COMPLETE' && (expected.bodyClassCandidates.length !== 1 || expected.surfaceMediumCandidates.length === 0 || expected.layerStackCandidates.length === 0)) status = 'PARTIAL';
  const branchResolutions: WeightedBranchResolutionV1<string>[] = [];
  let resolvedSurfaceMedium: PremiseSurfaceMedium | undefined;
  if (status === 'COMPLETE') {
    if (expected.surfaceMediumCandidates.length === 1) resolvedSurfaceMedium = expected.surfaceMediumCandidates[0];
    else {
      const oracle = createWorldRandomOracle(input.rootSeed, { authorityMode: 'CAUSAL_SHADOW' });
      const branch = resolveWeightedBranch<string>({
        branchId: 'premise/surface-medium/v1',
        stream: 'causal.premise',
        scope: ['surface-medium', input.inputSnapshotHash.value, context.contentHash.value],
        options: expected.surfaceMediumCandidates.map((candidate) => ({
          id: candidate,
          value: candidate,
          weight: 1,
          evidenceIds,
          rationale: 'Reviewed compatible surface-medium branch.',
        })),
        oracle,
      });
      branchResolutions.push(branch);
      resolvedSurfaceMedium = branch.chosenValue as PremiseSurfaceMedium;
    }
  }
  const missingDomains = status === 'PARTIAL'
    ? canonicalText([
      ...(expected.bodyClassCandidates.length > 1 ? ['body-class-uniqueness'] : []),
      ...(expected.surfaceMediumCandidates.length > 1 ? ['surface-medium-uniqueness'] : []),
      ...(expected.layerStackCandidates.length > 1 ? ['layer-stack-uniqueness'] : []),
      ...(evidenceIds.some((ruleId) => context.review.partialOnlyRuleIds.includes(ruleId)) ? ['reviewed-differentiation-evidence'] : []),
      ...(notes.length > 0 ? ['model-limitations'] : []),
    ], 'Premise missing domains')
    : [];
  const limitations = status === 'PARTIAL'
    ? canonicalText(notes.length > 0 ? notes : ['The reviewed premise evidence does not uniquely resolve every broad premise domain.'], 'Premise limitations')
    : [];
  const assumptions = canonicalText([
    'Classification is bounded by the reviewed W1-02B premise research package.',
    ...(branchResolutions.length > 0 ? ['Resolved surface medium is a deterministic branch among reviewed compatible candidates.'] : []),
  ], 'Premise assumptions');
  const premisePayload = {
    schemaVersion: 1 as const,
    premiseVersion: 1,
    status: status as PlanetaryPremiseV1['status'],
    inputSnapshotHash: input.inputSnapshotHash,
    bodyClassCandidates: expected.bodyClassCandidates,
    surfaceMediumCandidates: expected.surfaceMediumCandidates,
    layerStackCandidates: expected.layerStackCandidates,
    ...(status === 'COMPLETE' ? {
      resolvedBodyClass: expected.bodyClassCandidates[0],
      resolvedSurfaceMedium: resolvedSurfaceMedium as PremiseSurfaceMedium,
      resolvedLayerStack: expected.layerStackCandidates,
    } : {}),
    assumptions,
    branchResolutionIds: branchResolutions.map((entry) => entry.branchId).sort(compareStableText),
    confidenceAssessmentSubject: 'premise/broad-classification/v1',
    evidenceIds,
    contradictionIds: [] as readonly string[],
    limitations,
  };
  const premise = cloneAndDeepFreeze({
    ...premisePayload,
    contentHash: hashCausalPayload('WorldWright/planetary-premise/v1', premisePayload),
  });
  validatePlanetaryPremise(premise);
  return finalizeResolution({
    status,
    input,
    context,
    premise,
    branchResolutions,
    blockingReasons: [],
    missingDomains,
    evidenceIds,
    contradictionIds: [],
    modelCount,
    modelFingerprint,
  });
}

function resolveArtificialPremise(input: PremiseResolutionInputV1, context: PremiseResolverResearchContextV1): PlanetaryPremiseResolutionV1 {
  const row = context.compatibilityMatrix.rows.find((candidate) => candidate.bodyClass === 'ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL');
  if (!row) throw new Error('Artificial planetary-premise compatibility row is missing.');
  return createResolutionFromExpectation(input, context, {
    schemaVersion: 1,
    status: 'COMPLETE',
    bodyClassCandidates: ['ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL'],
    surfaceMediumCandidates: ['DECLARED_ARTIFICIAL_SOLID_SURFACE'],
    layerStackCandidates: ['DECLARED_ARTIFICIAL_LAYER_STACK'],
    blockingCodes: [],
    requiredRuleIds: row.requiredRuleIds,
  }, [], hashCausalPayload('WorldWright/premise-artificial-model/v1', row), 1);
}

function resolveExplicitBlock(
  input: PremiseResolutionInputV1,
  context: PremiseResolverResearchContextV1,
): Readonly<{ reasons: readonly string[]; evidenceIds: readonly string[]; contradictionIds: readonly string[] }> | undefined {
  const tags = new Set(input.declarationTags);
  if (tags.has('ATTEMPTED_SOLVED_TECTONIC_CONCLUSION')) {
    return { reasons: ['FORBIDDEN_DOWNSTREAM_CONCLUSION_IN_PREMISE_INPUT'], evidenceIds: ['premise/no-downstream-geology-v1'], contradictionIds: [] };
  }
  if (tags.has('REQUIRE_ICE_SHELL_LAYER_STACK') && tags.has('REQUIRE_ROCKY_TERRESTRIAL_BODY')) {
    return {
      reasons: ['INCOMPATIBLE_PREMISE_HARD_CONSTRAINTS'],
      evidenceIds: ['premise/differentiated-rocky-stack-supported-v1', 'premise/ice-shell-liquid-rocky-alternative-v1'],
      contradictionIds: ['contradiction/incompatible-premise-hard-constraints-v1'],
    };
  }
  for (const [tag, category] of BLOCKED_TAG_TO_CATEGORY) {
    if (!tags.has(tag)) continue;
    const blocked = context.compatibilityMatrix.blockedCategories.find((entry) => entry.categoryId === category);
    if (!blocked) throw new Error(`Missing blocked planetary-premise category ${category}.`);
    return { reasons: [blocked.blockingCode], evidenceIds: blocked.requiredRuleIds, contradictionIds: [] };
  }
  const artificialTags = ARTIFICIAL_TAGS.filter((tag) => tags.has(tag));
  if (artificialTags.length > 0) {
    if (!input.exceptionPermissions.includes('ALLOW_ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL')) {
      return { reasons: ['ARTIFICIAL_PREMISE_PERMISSION_REQUIRED'], evidenceIds: ['premise/artificial-explicit-exception-v1'], contradictionIds: [] };
    }
    if (artificialTags.length !== ARTIFICIAL_TAGS.length) {
      return { reasons: ['ARTIFICIAL_PREMISE_STRUCTURE_INCOMPLETE'], evidenceIds: ['premise/artificial-explicit-exception-v1'], contradictionIds: [] };
    }
  }
  return undefined;
}

function createBlockedResolution(
  input: PremiseResolutionInputV1,
  context: PremiseResolverResearchContextV1,
  block: Readonly<{ reasons: readonly string[]; evidenceIds: readonly string[]; contradictionIds: readonly string[] }>,
): PlanetaryPremiseResolutionV1 {
  return finalizeResolution({
    status: 'BLOCKED',
    input,
    context,
    branchResolutions: [],
    blockingReasons: canonicalText(block.reasons, 'Premise blocking reasons'),
    missingDomains: [],
    evidenceIds: canonicalText(block.evidenceIds, 'Premise evidence IDs'),
    contradictionIds: canonicalText(block.contradictionIds, 'Premise contradiction IDs'),
    modelCount: 0,
  });
}

function finalizeResolution(input: {
  readonly status: PlanetaryPremiseResolutionV1['status'];
  readonly input: PremiseResolutionInputV1;
  readonly context: PremiseResolverResearchContextV1;
  readonly premise?: PlanetaryPremiseV1;
  readonly branchResolutions: readonly WeightedBranchResolutionV1<string>[];
  readonly blockingReasons: readonly string[];
  readonly missingDomains: readonly string[];
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly modelCount: number;
  readonly modelFingerprint?: DeterministicHash;
}): PlanetaryPremiseResolutionV1 {
  const metricsWithoutSize = {
    schemaVersion: 1 as const,
    modelArchetypesExamined: input.modelCount,
    ruleEvaluations: input.evidenceIds.length,
    bodyCandidateCount: input.premise?.bodyClassCandidates.length ?? 0,
    surfaceCandidateCount: input.premise?.surfaceMediumCandidates.length ?? 0,
    layerCandidateCount: input.premise?.layerStackCandidates.length ?? 0,
    branchResolutionCount: input.branchResolutions.length,
    ...(input.modelFingerprint ? { selectedModelFingerprint: input.modelFingerprint } : {}),
  };
  if (metricsWithoutSize.ruleEvaluations > PLANETARY_PREMISE_RESOLVER_PERFORMANCE_BUDGET_V1.maxRuleEvaluations) throw new Error('Planetary-premise rule evaluations exceed the frozen budget.');
  const payloadWithoutMetrics = {
    schemaVersion: 1 as const,
    resolverVersion: 1 as const,
    status: input.status,
    inputSnapshotHash: input.input.inputSnapshotHash,
    researchContextHash: input.context.contentHash,
    ...(input.premise ? { premise: input.premise } : {}),
    branchResolutions: [...input.branchResolutions].sort((a, b) => compareStableText(a.branchId, b.branchId)),
    blockingReasons: canonicalText(input.blockingReasons, 'Premise blocking reasons'),
    missingDomains: canonicalText(input.missingDomains, 'Premise missing domains'),
    evidenceIds: canonicalText(input.evidenceIds, 'Premise evidence IDs'),
    contradictionIds: canonicalText(input.contradictionIds, 'Premise contradiction IDs'),
  };
  const metrics: PremiseResolverMetricsV1 = {
    ...metricsWithoutSize,
    serializedResultBytes: measureResolutionPayloadBytes(payloadWithoutMetrics, { ...metricsWithoutSize, serializedResultBytes: 0 }),
  };
  const payload = { ...payloadWithoutMetrics, metrics };
  const resolution = cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/planetary-premise-resolution/v1', payload),
  });
  validatePlanetaryPremiseResolution(resolution);
  return resolution;
}

function validatePremiseResolutionInput(value: PremiseResolutionInputV1): void {
  assertExactKeys(value, RESOLUTION_INPUT_KEYS, 'Planetary-premise resolution input');
  if (value.schemaVersion !== 1) throw new Error('Unsupported planetary-premise resolution input.');
  assertDeterministicHash(value.inputSnapshotHash, 'Planetary-premise resolution input');
  if (!value.rootSeed || typeof value.rootSeed.exactText !== 'string' || value.rootSeed.exactText.length === 0 || value.rootSeed.encoding !== 'utf8-v1' || typeof value.rootSeed.fingerprint !== 'string' || value.rootSeed.fingerprint.length === 0) throw new Error('Planetary-premise root seed is invalid.');
  canonicalQuantities(value.quantities);
  const permissions = canonicalText(value.exceptionPermissions, 'Premise exception permissions');
  for (const permission of permissions) if (permission !== 'ALLOW_ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL') throw new Error(`Unsupported planetary-premise exception permission ${permission}.`);
  canonicalDeclarationTags(value.declarationTags);
}

function validateReview(review: PremiseResearchReviewV1, bundle: ScientificResearchBundleV1): void {
  assertExactKeys(review, REVIEW_KEYS, 'Planetary-premise research review');
  if (review.schemaVersion !== 1 || review.status !== 'PREMISE_RESEARCH_PACKAGE_REVIEWED' || review.bundleVersion !== bundle.bundleVersion) throw new Error('Planetary-premise research review is invalid.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(review.reviewDate) || review.reviewer.trim().length === 0 || review.scope.trim().length === 0) throw new Error('Planetary-premise research review metadata is invalid.');
  if (!review.implementationAuthorized) throw new Error('Planetary-premise resolver implementation is not authorized by the reviewed gate record.');
  if (!review.implementationAuthorizationDate || !/^\d{4}-\d{2}-\d{2}$/.test(review.implementationAuthorizationDate)) throw new Error('Planetary-premise implementation authorization date is invalid.');
  if (!review.implementationAuthorizationBasis || review.implementationAuthorizationBasis.trim().length === 0) throw new Error('Planetary-premise implementation authorization basis is invalid.');
  const complete = canonicalText(review.completeEligibleRuleIds, 'COMPLETE-eligible premise rules');
  const partial = canonicalText(review.partialOnlyRuleIds, 'PARTIAL-only premise rules');
  const all = bundle.claimRules.map((rule) => rule.ruleId);
  if (new Set([...complete, ...partial]).size !== all.length || !all.every((ruleId) => complete.includes(ruleId) || partial.includes(ruleId))) throw new Error('Planetary-premise review does not classify every claim rule exactly once.');
  const byId = new Map(bundle.claimRules.map((rule) => [rule.ruleId, rule]));
  for (const ruleId of complete) if (byId.get(ruleId)?.evidenceStatus !== 'REVIEWED') throw new Error(`COMPLETE-eligible premise rule ${ruleId} is not reviewed.`);
  for (const ruleId of partial) if (byId.get(ruleId)?.evidenceStatus === 'REVIEWED') throw new Error(`PARTIAL-only premise rule ${ruleId} is incorrectly reviewed.`);
}

function buildQuantityScales(fixtures: readonly PremiseResearchFixtureV1[]): ReadonlyMap<string, number> {
  const values = new Map<string, number[]>();
  for (const fixture of fixtures) for (const quantity of fixture.input.quantities) {
    const list = values.get(quantity.inputId) ?? [];
    list.push(quantity.value);
    values.set(quantity.inputId, list);
  }
  return new Map([...values].map(([inputId, entries]) => {
    const min = Math.min(...entries);
    const max = Math.max(...entries);
    return [inputId, Math.max(max - min, Math.max(...entries.map((entry) => Math.abs(entry))) * 0.05, 0.000001)];
  }));
}

function archetypeDistance(
  input: PremiseResolutionInputV1,
  fixture: PremiseResearchFixtureV1,
  scales: ReadonlyMap<string, number>,
): number {
  const byId = new Map(input.quantities.map((quantity) => [quantity.inputId, quantity]));
  let sum = 0;
  let count = 0;
  for (const expected of fixture.input.quantities) {
    const actual = byId.get(expected.inputId);
    if (!actual) {
      sum += 4;
      count += 1;
      continue;
    }
    if (actual.unit !== expected.unit || actual.scaleId !== expected.scaleId) throw new Error(`Planetary-premise quantity contract mismatch for ${expected.inputId}.`);
    const scale = scales.get(expected.inputId) ?? 1;
    const delta = (actual.value - expected.value) / scale;
    sum += delta * delta;
    count += 1;
  }
  return count === 0 ? Number.POSITIVE_INFINITY : sum / count;
}

function assertExpectationCompatibility(
  expected: PremiseResearchFixtureV1['expected'],
  matrix: PremiseCompatibilityMatrixV1,
): void {
  if (expected.status === 'BLOCKED') return;
  for (const bodyClass of expected.bodyClassCandidates) {
    const row = matrix.rows.find((candidate) => candidate.bodyClass === bodyClass);
    if (!row) throw new Error(`Planetary-premise compatibility row is missing for ${bodyClass}.`);
    for (const surface of expected.surfaceMediumCandidates) {
      if (!row.allowedSurfaceMedia.includes(surface)) {
        const shared = expected.bodyClassCandidates.some((candidate) => matrix.rows.find((entry) => entry.bodyClass === candidate)?.allowedSurfaceMedia.includes(surface));
        if (!shared) throw new Error(`Planetary-premise surface candidate ${surface} is incompatible with all body candidates.`);
      }
    }
    for (const layer of expected.layerStackCandidates) {
      if (!row.allowedLayerStacks.includes(layer)) {
        const shared = expected.bodyClassCandidates.some((candidate) => matrix.rows.find((entry) => entry.bodyClass === candidate)?.allowedLayerStacks.includes(layer));
        if (!shared) throw new Error(`Planetary-premise layer candidate ${layer} is incompatible with all body candidates.`);
      }
    }
  }
}

function fixtureFingerprint(fixture: PremiseResearchFixtureV1): DeterministicHash {
  return hashCausalPayload('WorldWright/planetary-premise-model-archetype/v1', {
    kind: fixture.kind,
    input: fixture.input,
    expected: fixture.expected,
    notes: fixture.notes,
  });
}

function canonicalQuantities(values: PremiseFixtureInputV1['quantities']): PremiseFixtureInputV1['quantities'] {
  if (!Array.isArray(values) || values.length > PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1.maxQuantitiesPerFixture) throw new Error('Planetary-premise quantities are invalid.');
  const normalized = [...values].sort((a, b) => compareStableText(a.inputId, b.inputId));
  if (new Set(normalized.map((entry) => entry.inputId)).size !== normalized.length) throw new Error('Planetary-premise quantities contain duplicate inputs.');
  for (const quantity of normalized) {
    if (quantity.schemaVersion !== 1 || !Number.isFinite(quantity.value) || !quantity.unit || !quantity.scaleId) throw new Error(`Planetary-premise quantity ${quantity.inputId} is invalid.`);
  }
  return Object.freeze(normalized.map((entry) => Object.freeze({ ...entry })));
}

function canonicalDeclarationTags(values: readonly PremiseDeclarationTagV1[]): readonly PremiseDeclarationTagV1[] {
  const allowed = new Set<string>(PREMISE_FIXTURE_SCENARIO_TAGS);
  const normalized = canonicalText(values, 'Premise declaration tags') as readonly PremiseDeclarationTagV1[];
  for (const tag of normalized) if (!allowed.has(tag)) throw new Error(`Unsupported planetary-premise declaration tag ${tag}.`);
  return normalized;
}

function canonicalText<T extends string>(values: readonly T[], label: string): readonly T[] {
  if (!Array.isArray(values) || !values.every((value) => typeof value === 'string' && value.trim().length > 0)) throw new Error(`${label} are invalid.`);
  if (new Set(values).size !== values.length) throw new Error(`${label} contain duplicates.`);
  return Object.freeze([...values].sort(compareStableText));
}

function measureResolutionPayloadBytes(
  payloadWithoutMetrics: Omit<PlanetaryPremiseResolutionV1, 'metrics' | 'contentHash'>,
  metrics: PremiseResolverMetricsV1,
): number {
  return serializedBytes({ ...payloadWithoutMetrics, metrics: { ...metrics, serializedResultBytes: 0 } });
}

function serializedBytes(value: unknown): number {
  return new TextEncoder().encode(canonicalJsonStringify(value)).byteLength;
}

function assertExactKeys(value: unknown, allowedKeys: readonly string[], label: string): asserts value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
  const unknown = Object.keys(value).filter((key) => !allowedKeys.includes(key)).sort(compareStableText);
  if (unknown.length > 0) throw new Error(`${label} contains unowned fields: ${unknown.join(', ')}`);
}

function arraysEqual<T>(a: readonly T[], b: readonly T[]): boolean {
  return a.length === b.length && a.every((entry, index) => entry === b[index]);
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
