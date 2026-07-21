import type { GeneratorAuthorityMode } from '../causalWorld/schema';
import { worldFeatureFlagValue } from '../worldFeatureFlags/resolve';
import type { ResolvedWorldFeatureFlagSnapshot } from '../worldFeatureFlags/types';
import { canonicalJsonStringify } from '../worldProvenance/canonicalJson';
import type { DeterministicHash } from '../worldProvenance/hash';
import { createWorldRandomOracle } from '../worldRandom/oracle';
import type { WorldRandomOracle } from '../worldRandom/types';
import {
  type GeologicSpineFixtureSetV1,
  type GeologicSpineResearchReviewV1,
  validateGeologicSpineFixtureSet,
} from './geologicSpineResearchContracts';
import { assertDeterministicHash, deterministicHashEquals, hashCausalPayload } from './hashes';
import { cloneAndDeepFreeze } from './immutable';
import { validateCausalGeologyInput } from './inputAuthority';
import { createScientificRange } from './quantities';
import { validateScientificResearchBundle } from './researchLedger';
import { createSphericalAnchor, createSphericalExtent } from './spatial';
import { canProceedFromStage, createCausalStageResult } from './stageResult';
import type {
  CausalGeologyInputV1,
  CausalStageResultV1,
  GeologicPreservationState,
  GeologicSpineEdgeKind,
  GeologicSpineEdgeV1,
  GeologicSpineEventV1,
  GeologicSpineNodeFamily,
  GeologicSpineNodeV1,
  GeologicSpineV1,
  GeologicTemporalContextV1,
  InteriorStateV1,
  PlanetaryPremiseV1,
  ScientificResearchBundleV1,
  TectonicEpochV1,
  TectonicRegimeHistoryV1,
} from './types';
import {
  validateCausalStageResult,
  validateGeologicSpine,
  validateInteriorState,
  validatePlanetaryPremise,
  validateTectonicRegimeHistory,
} from './validation';

export const GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1 = Object.freeze({
  maxResearchSources: 16,
  maxClaimRules: 24,
  maxFixtures: 32,
  maxNodes: 32,
  maxEdges: 64,
  maxEvents: 32,
  maxSerializedSpineBytes: 512 * 1024,
  maxAverageResolutionMilliseconds: 1_000,
  maxHeapDeltaBytes: 128 * 1024 * 1024,
});

export interface GeologicSpineResearchContextV1 {
  readonly schemaVersion: 1;
  readonly contextVersion: 1;
  readonly researchBundle: ScientificResearchBundleV1;
  readonly fixtureSet: GeologicSpineFixtureSetV1;
  readonly review: GeologicSpineResearchReviewV1;
  readonly contentHash: DeterministicHash;
}

export interface GeologicSpineResolutionMetricsV1 {
  readonly schemaVersion: 1;
  readonly ruleEvaluations: number;
  readonly nodeCount: number;
  readonly edgeCount: number;
  readonly eventCount: number;
  readonly serializedSpineBytes: number;
}

export interface GeologicSpineResolutionV1 {
  readonly schemaVersion: 1;
  readonly resolverVersion: 1;
  readonly status: 'PARTIAL' | 'BLOCKED';
  readonly inputSnapshotHash: DeterministicHash;
  readonly premiseHash: DeterministicHash;
  readonly interiorHash: DeterministicHash;
  readonly regimeHistoryHash: DeterministicHash;
  readonly researchContextHash: DeterministicHash;
  readonly spine?: GeologicSpineV1;
  readonly blockingReasons: readonly string[];
  readonly missingDomains: readonly string[];
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly metrics: GeologicSpineResolutionMetricsV1;
  readonly contentHash: DeterministicHash;
}

export interface RunGeologicSpineShadowOptionsV1 {
  readonly authorityMode: GeneratorAuthorityMode;
  readonly featureFlags: ResolvedWorldFeatureFlagSnapshot;
  readonly inputSnapshot: CausalGeologyInputV1;
  readonly premise: PlanetaryPremiseV1;
  readonly interior: InteriorStateV1;
  readonly regimeHistory: TectonicRegimeHistoryV1;
  readonly regimeHistoryStageResult: CausalStageResultV1<TectonicRegimeHistoryV1>;
  readonly researchContext: GeologicSpineResearchContextV1;
}

export interface GeologicSpineShadowRunnerResultV1 {
  readonly schemaVersion: 1;
  readonly runnerVersion: 1;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly inputSnapshotHash: DeterministicHash;
  readonly premiseHash: DeterministicHash;
  readonly interiorHash: DeterministicHash;
  readonly regimeHistoryHash: DeterministicHash;
  readonly researchContextHash: DeterministicHash;
  readonly resolution: GeologicSpineResolutionV1;
  readonly stageResult: CausalStageResultV1<GeologicSpineV1>;
  readonly contentHash: DeterministicHash;
}

interface ActivitySummaryV1 {
  readonly mobility: number;
  readonly extension: number;
  readonly convergence: number;
  readonly transform: number;
  readonly plume: number;
  readonly crustProduction: number;
  readonly melt: number;
  readonly thermal: number;
  readonly rift: number;
  readonly hotspot: number;
  readonly organizedHistory: boolean;
}

interface PlannedFeatureV1 {
  readonly family: GeologicSpineNodeFamily;
  readonly ordinal: number;
  readonly nodeId: string;
  readonly eventId: string;
  readonly epoch: TectonicEpochV1;
  readonly eventStart: number;
  readonly eventEnd: number;
  readonly node: GeologicSpineNodeV1;
}

const NODE_FAMILY_ORDER: readonly GeologicSpineNodeFamily[] = Object.freeze([
  'CONTINENTAL_KERNEL',
  'PLUME_SYSTEM',
  'RIFT_SYSTEM',
  'OCEAN_BASIN',
  'CONVERGENCE_SYSTEM',
  'TRANSFORM_SYSTEM',
  'ACCRETION_SYSTEM',
]);
const CONTEXT_KEYS = ['schemaVersion', 'contextVersion', 'researchBundle', 'fixtureSet', 'review', 'contentHash'] as const;
const REVIEW_KEYS = ['schemaVersion', 'bundleVersion', 'status', 'reviewDate', 'reviewer', 'scope', 'completeEligibleRuleIds', 'partialOnlyRuleIds', 'implementationAuthorized', 'implementationAuthorizationDate', 'implementationAuthorizationBasis'] as const;
const RESOLUTION_REQUIRED_KEYS = ['schemaVersion', 'resolverVersion', 'status', 'inputSnapshotHash', 'premiseHash', 'interiorHash', 'regimeHistoryHash', 'researchContextHash', 'blockingReasons', 'missingDomains', 'evidenceIds', 'contradictionIds', 'metrics', 'contentHash'] as const;
const RESOLUTION_ALLOWED_KEYS = [...RESOLUTION_REQUIRED_KEYS, 'spine'] as const;
const METRICS_KEYS = ['schemaVersion', 'ruleEvaluations', 'nodeCount', 'edgeCount', 'eventCount', 'serializedSpineBytes'] as const;
const RUNNER_KEYS = ['schemaVersion', 'runnerVersion', 'authorityMode', 'inputSnapshotHash', 'premiseHash', 'interiorHash', 'regimeHistoryHash', 'researchContextHash', 'resolution', 'stageResult', 'contentHash'] as const;
const TEXT_ENCODER = new TextEncoder();

export function createGeologicSpineResearchContext(input: {
  readonly researchBundle: ScientificResearchBundleV1;
  readonly fixtureSet: GeologicSpineFixtureSetV1;
  readonly review: GeologicSpineResearchReviewV1;
}): GeologicSpineResearchContextV1 {
  validateScientificResearchBundle(input.researchBundle);
  validateGeologicSpineFixtureSet(input.fixtureSet);
  validateGeologicSpineReview(input.review, input.researchBundle);
  if (input.researchBundle.sources.length > GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxResearchSources) throw new Error('Geologic-spine research source count exceeds the frozen budget.');
  if (input.researchBundle.claimRules.length > GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxClaimRules) throw new Error('Geologic-spine claim-rule count exceeds the frozen budget.');
  if (input.fixtureSet.fixtures.length > GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxFixtures) throw new Error('Geologic-spine fixture count exceeds the frozen budget.');
  const payload = {
    schemaVersion: 1 as const,
    contextVersion: 1 as const,
    researchBundle: input.researchBundle,
    fixtureSet: input.fixtureSet,
    review: input.review,
  };
  return cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/geologic-spine-research-context/v1', payload),
  });
}

export function resolveGeologicSpine(
  inputSnapshot: CausalGeologyInputV1,
  premise: PlanetaryPremiseV1,
  interior: InteriorStateV1,
  regimeHistory: TectonicRegimeHistoryV1,
  context: GeologicSpineResearchContextV1,
): GeologicSpineResolutionV1 {
  validateCausalGeologyInput(inputSnapshot);
  validatePlanetaryPremise(premise);
  validateInteriorState(interior);
  validateTectonicRegimeHistory(regimeHistory);
  validateGeologicSpineResearchContext(context);
  if (!deterministicHashEquals(premise.inputSnapshotHash, inputSnapshot.contentHash)) throw new Error('Geologic spine premise is not bound to the supplied sanitized input snapshot.');

  const evidenceIds = uniqueText(context.researchBundle.claimRules.map((rule) => rule.ruleId));
  const contradictionIds = uniqueText([
    ...inputSnapshot.contradictionIds,
    ...premise.contradictionIds,
    ...interior.contradictionIds,
    ...regimeHistory.contradictionIds,
  ]);
  if (premise.bodyClassCandidates.includes('ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL')) {
    return finalizeResolution({
      status: 'BLOCKED',
      inputSnapshot,
      premise,
      interior,
      regimeHistory,
      context,
      blockingReasons: ['ARTIFICIAL_GEOLOGIC_SPINE_MODEL_NOT_IMPLEMENTED'],
      missingDomains: [],
      evidenceIds,
      contradictionIds,
    });
  }

  const summary = summarizeActivity(interior, regimeHistory);
  const isIceShell = premise.bodyClassCandidates.includes('ICE_SHELL_OCEAN_BODY');
  const familyCounts = resolveFamilyCounts(inputSnapshot, premise, regimeHistory, summary, isIceShell);
  const oracle = createWorldRandomOracle(inputSnapshot.rootSeed, { authorityMode: 'CAUSAL_SHADOW' });
  const plans = createFeaturePlans({ inputSnapshot, premise, interior, regimeHistory, context, summary, familyCounts, oracle });
  const events = createEvents(plans, regimeHistory);
  const eventById = new Map(events.map((event) => [event.eventId, event]));
  const nodes = plans.map((plan) => {
    const event = eventById.get(plan.eventId);
    if (!event) throw new Error(`Missing geologic-spine formation event ${plan.eventId}.`);
    return cloneAndDeepFreeze({ ...plan.node, formationEventIds: [event.eventId] });
  }).sort((a, b) => compareStableText(a.nodeId, b.nodeId));
  const edges = createEdges(nodes);
  const featureFamilies = uniqueFamilies(nodes.map((node) => node.family));
  const limitations = uniqueText([
    ...context.researchBundle.knownLimitations,
    ...(premise.status === 'PARTIAL' ? ['Upstream planetary premise remains PARTIAL.'] : []),
    ...(interior.status === 'PARTIAL' ? ['Upstream interior state remains PARTIAL.'] : []),
    ...(regimeHistory.status === 'PARTIAL' ? ['Upstream tectonic regime history remains PARTIAL.'] : []),
    ...(isIceShell ? ['Ice-shell structures use only broad plume and rift-system hypotheses because a dedicated ice-shell spatial vocabulary is not implemented.'] : []),
  ]);
  const missingDomains = uniqueText([
    'absolute-feature-boundaries',
    'composition-resolved-crustal-provinces',
    'final-plate-polygons',
    'fully-validated-feature-count-calibration',
    'material-and-buoyancy-fields',
    'process-field-rasterization',
    'unique-spatial-reconstruction',
  ]);
  const spinePayload = {
    schemaVersion: 1 as const,
    status: 'PARTIAL' as const,
    spineVersion: 1,
    coordinateConvention: 'SPHERICAL_LAT_LON_DEGREES_V1' as const,
    nodes,
    edges,
    events,
    featureFamilies,
    branchResolutionIds: [] as readonly string[],
    evidenceIds,
    contradictionIds,
    limitations,
  };
  const spine = cloneAndDeepFreeze({
    ...spinePayload,
    contentHash: hashCausalPayload('WorldWright/geologic-spine/v1', spinePayload),
  });
  validateGeologicSpine(spine);
  validateSpineHistoryCausality(spine, regimeHistory);
  assertNoPhysicalFields(spine);

  return finalizeResolution({
    status: 'PARTIAL',
    inputSnapshot,
    premise,
    interior,
    regimeHistory,
    context,
    spine,
    blockingReasons: [],
    missingDomains,
    evidenceIds,
    contradictionIds,
  });
}

export function runGeologicSpineShadow(options: RunGeologicSpineShadowOptionsV1): GeologicSpineShadowRunnerResultV1 {
  if (options.authorityMode !== 'CAUSAL_SHADOW') throw new Error('Geologic-spine resolution is allowed only in CAUSAL_SHADOW mode.');
  if (options.featureFlags.authorityMode !== 'CAUSAL_SHADOW') throw new Error('Geologic-spine feature flags must be resolved for CAUSAL_SHADOW mode.');
  if (!worldFeatureFlagValue<boolean>(options.featureFlags, 'causal.shadow.enabled')) throw new Error('Geologic-spine resolution requires causal.shadow.enabled.');
  if (worldFeatureFlagValue<boolean>(options.featureFlags, 'causal.active.enabled')) throw new Error('Geologic-spine resolution cannot run with causal.active.enabled.');
  validateCausalGeologyInput(options.inputSnapshot);
  validatePlanetaryPremise(options.premise);
  validateInteriorState(options.interior);
  validateTectonicRegimeHistory(options.regimeHistory);
  validateCausalStageResult(options.regimeHistoryStageResult);
  validateGeologicSpineResearchContext(options.researchContext);
  if (options.regimeHistoryStageResult.stageId !== 'CAUSAL_REGIME_HISTORY') throw new Error('Geologic-spine resolution requires a regime-history stage result.');
  if (!canProceedFromStage(options.regimeHistoryStageResult, 'CAUSAL_GEOLOGIC_SPINE')) throw new Error('Regime-history stage does not permit geologic-spine resolution.');
  if (canonicalJsonStringify(options.regimeHistoryStageResult.record) !== canonicalJsonStringify(options.regimeHistory)) throw new Error('Regime-history stage record does not match the supplied history.');
  const expectedHistoryInputHash = hashCausalPayload('WorldWright/CAUSAL_REGIME_HISTORY/input/v1', {
    premise: options.premise,
    interior: options.interior,
  });
  if (!deterministicHashEquals(options.regimeHistoryStageResult.inputHash, expectedHistoryInputHash)) throw new Error('Regime-history stage is not bound to the supplied premise and interior.');

  const resolution = resolveGeologicSpine(options.inputSnapshot, options.premise, options.interior, options.regimeHistory, options.researchContext);
  const stageInput = { premise: options.premise, interior: options.interior, regimeHistory: options.regimeHistory };
  const stageResult = resolution.status === 'BLOCKED'
    ? createCausalStageResult<GeologicSpineV1>({
      stageId: 'CAUSAL_GEOLOGIC_SPINE',
      stageVersion: 1,
      status: 'BLOCKED',
      input: stageInput,
      blockingReasons: resolution.blockingReasons,
      evidenceIds: resolution.evidenceIds,
      contradictionIds: resolution.contradictionIds,
    })
    : createCausalStageResult<GeologicSpineV1>({
      stageId: 'CAUSAL_GEOLOGIC_SPINE',
      stageVersion: 1,
      status: 'PARTIAL',
      input: stageInput,
      record: resolution.spine as GeologicSpineV1,
      limitations: resolution.spine?.limitations,
      missingDomains: resolution.missingDomains,
      evidenceIds: resolution.evidenceIds,
      contradictionIds: resolution.contradictionIds,
    });
  const payload = {
    schemaVersion: 1 as const,
    runnerVersion: 1 as const,
    authorityMode: 'CAUSAL_SHADOW' as const,
    inputSnapshotHash: options.inputSnapshot.contentHash,
    premiseHash: options.premise.contentHash,
    interiorHash: options.interior.contentHash,
    regimeHistoryHash: options.regimeHistory.contentHash,
    researchContextHash: options.researchContext.contentHash,
    resolution,
    stageResult,
  };
  const result = cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/geologic-spine-shadow-runner/v1', payload),
  });
  validateGeologicSpineShadowRunnerResult(result);
  return result;
}

export function validateGeologicSpineResearchContext(value: unknown): asserts value is GeologicSpineResearchContextV1 {
  assertExactKeys(value, CONTEXT_KEYS, 'Geologic-spine research context');
  const context = value as GeologicSpineResearchContextV1;
  if (context.schemaVersion !== 1 || context.contextVersion !== 1) throw new Error('Unsupported geologic-spine research context.');
  validateScientificResearchBundle(context.researchBundle);
  validateGeologicSpineFixtureSet(context.fixtureSet);
  validateGeologicSpineReview(context.review, context.researchBundle);
  const expected = hashCausalPayload('WorldWright/geologic-spine-research-context/v1', {
    schemaVersion: context.schemaVersion,
    contextVersion: context.contextVersion,
    researchBundle: context.researchBundle,
    fixtureSet: context.fixtureSet,
    review: context.review,
  });
  if (!deterministicHashEquals(context.contentHash, expected)) throw new Error('Geologic-spine research context hash mismatch.');
}

export function validateGeologicSpineResolution(value: unknown): asserts value is GeologicSpineResolutionV1 {
  assertAllowedAndRequiredKeys(value, RESOLUTION_ALLOWED_KEYS, RESOLUTION_REQUIRED_KEYS, 'Geologic-spine resolution');
  const resolution = value as GeologicSpineResolutionV1;
  if (resolution.schemaVersion !== 1 || resolution.resolverVersion !== 1 || !['PARTIAL', 'BLOCKED'].includes(resolution.status)) throw new Error('Geologic-spine resolution identity is invalid.');
  assertDeterministicHash(resolution.inputSnapshotHash, 'Geologic-spine input');
  assertDeterministicHash(resolution.premiseHash, 'Geologic-spine premise');
  assertDeterministicHash(resolution.interiorHash, 'Geologic-spine interior');
  assertDeterministicHash(resolution.regimeHistoryHash, 'Geologic-spine history');
  assertDeterministicHash(resolution.researchContextHash, 'Geologic-spine research context');
  assertDeterministicHash(resolution.contentHash, 'Geologic-spine resolution');
  if ((resolution.spine !== undefined) !== (resolution.status === 'PARTIAL')) throw new Error('Geologic-spine resolution has invalid spine presence.');
  if (resolution.spine) validateGeologicSpine(resolution.spine);
  canonicalText(resolution.blockingReasons, 'Geologic-spine blocking reasons');
  canonicalText(resolution.missingDomains, 'Geologic-spine missing domains');
  canonicalText(resolution.evidenceIds, 'Geologic-spine evidence IDs');
  canonicalText(resolution.contradictionIds, 'Geologic-spine contradiction IDs');
  if (resolution.status === 'BLOCKED' && resolution.blockingReasons.length === 0) throw new Error('Blocked geologic-spine resolution requires a reason.');
  if (resolution.status === 'PARTIAL' && (resolution.blockingReasons.length !== 0 || resolution.missingDomains.length === 0)) throw new Error('Partial geologic-spine resolution has invalid blockers or missing domains.');
  validateMetrics(resolution.metrics);
  if (resolution.metrics.ruleEvaluations !== resolution.evidenceIds.length
    || resolution.metrics.nodeCount !== (resolution.spine?.nodes.length ?? 0)
    || resolution.metrics.edgeCount !== (resolution.spine?.edges.length ?? 0)
    || resolution.metrics.eventCount !== (resolution.spine?.events.length ?? 0)) {
    throw new Error('Geologic-spine metrics do not match the resolution payload.');
  }
  if (resolution.spine) {
    if (!arraysEqual(resolution.spine.evidenceIds, resolution.evidenceIds)) throw new Error('Geologic-spine evidence does not match the spine record.');
    if (!arraysEqual(resolution.spine.contradictionIds, resolution.contradictionIds)) throw new Error('Geologic-spine contradictions do not match the spine record.');
    const measured = TEXT_ENCODER.encode(canonicalJsonStringify(resolution.spine)).length;
    if (resolution.metrics.serializedSpineBytes !== measured) throw new Error('Geologic-spine serialized-byte metric is invalid.');
  } else if (resolution.metrics.serializedSpineBytes !== 0) throw new Error('Blocked geologic-spine resolution cannot report serialized spine bytes.');
  const expected = hashCausalPayload('WorldWright/geologic-spine-resolution/v1', resolutionPayloadWithoutHash(resolution));
  if (!deterministicHashEquals(resolution.contentHash, expected)) throw new Error('Geologic-spine resolution hash mismatch.');
}

export function validateGeologicSpineShadowRunnerResult(value: unknown): asserts value is GeologicSpineShadowRunnerResultV1 {
  assertExactKeys(value, RUNNER_KEYS, 'Geologic-spine shadow-runner result');
  const result = value as GeologicSpineShadowRunnerResultV1;
  if (result.schemaVersion !== 1 || result.runnerVersion !== 1 || result.authorityMode !== 'CAUSAL_SHADOW') throw new Error('Unsupported geologic-spine shadow-runner result.');
  for (const [label, hash] of [
    ['input', result.inputSnapshotHash],
    ['premise', result.premiseHash],
    ['interior', result.interiorHash],
    ['history', result.regimeHistoryHash],
    ['research context', result.researchContextHash],
  ] as const) assertDeterministicHash(hash, `Geologic-spine runner ${label}`);
  validateGeologicSpineResolution(result.resolution);
  validateCausalStageResult(result.stageResult);
  if (result.stageResult.stageId !== 'CAUSAL_GEOLOGIC_SPINE' || result.stageResult.status !== result.resolution.status) throw new Error('Geologic-spine stage result does not match the resolution.');
  if (result.resolution.spine && canonicalJsonStringify(result.stageResult.record) !== canonicalJsonStringify(result.resolution.spine)) throw new Error('Geologic-spine stage record does not match the resolution spine.');
  const expectedStageInput = hashCausalPayload('WorldWright/CAUSAL_GEOLOGIC_SPINE/input/v1', {
    premise: { contentHash: result.premiseHash },
    interior: { contentHash: result.interiorHash },
    regimeHistory: { contentHash: result.regimeHistoryHash },
  });
  void expectedStageInput;
  const expected = hashCausalPayload('WorldWright/geologic-spine-shadow-runner/v1', {
    schemaVersion: result.schemaVersion,
    runnerVersion: result.runnerVersion,
    authorityMode: result.authorityMode,
    inputSnapshotHash: result.inputSnapshotHash,
    premiseHash: result.premiseHash,
    interiorHash: result.interiorHash,
    regimeHistoryHash: result.regimeHistoryHash,
    researchContextHash: result.researchContextHash,
    resolution: result.resolution,
    stageResult: result.stageResult,
  });
  if (!deterministicHashEquals(result.contentHash, expected)) throw new Error('Geologic-spine shadow-runner hash mismatch.');
}

function resolveFamilyCounts(
  inputSnapshot: CausalGeologyInputV1,
  premise: PlanetaryPremiseV1,
  regimeHistory: TectonicRegimeHistoryV1,
  summary: ActivitySummaryV1,
  isIceShell: boolean,
): ReadonlyMap<GeologicSpineNodeFamily, number> {
  const counts = new Map<GeologicSpineNodeFamily, number>();
  if (isIceShell) {
    counts.set('PLUME_SYSTEM', 1 + thresholdCount(summary.plume, 0.55, 0.78));
    counts.set('RIFT_SYSTEM', 1 + thresholdCount(summary.extension, 0.45, 0.7));
    return counts;
  }
  const age = inputSnapshot.physicalInputs['thermal.age']?.value ?? regimeHistory.totalResolvedDuration.value;
  const water = inputSnapshot.physicalInputs['inventory.water']?.value ?? 0;
  const rocky = premise.bodyClassCandidates.some((candidate) => candidate.includes('ROCKY') || candidate.includes('ROCK_ICE') || candidate.includes('VOLATILE_PRESSURE'));
  if (!rocky) throw new Error('Natural geologic-spine premise is not supported by the current rocky or ice-shell vocabulary.');

  counts.set('CONTINENTAL_KERNEL', clampInteger(1 + (age >= 3 ? 1 : 0) + (summary.crustProduction >= 0.65 ? 1 : 0), 1, 3));
  counts.set('PLUME_SYSTEM', clampInteger(1 + thresholdCount(summary.plume, 0.45, 0.72), 1, 3));
  if (summary.extension >= 0.15 || summary.rift >= 0.15 || summary.organizedHistory) counts.set('RIFT_SYSTEM', clampInteger(1 + thresholdCount(Math.max(summary.extension, summary.rift), 0.5, 0.75), 1, 3));
  if (summary.convergence >= 0.28 || summary.mobility >= 0.48 || summary.organizedHistory) counts.set('CONVERGENCE_SYSTEM', clampInteger(1 + thresholdCount(Math.max(summary.convergence, summary.mobility), 0.58, 0.78), 1, 3));
  if (counts.has('RIFT_SYSTEM') && (summary.mobility >= 0.32 || summary.extension >= 0.45 || summary.organizedHistory)) counts.set('OCEAN_BASIN', clampInteger(1 + thresholdCount(Math.max(summary.mobility, summary.extension), 0.62, 0.82), 1, 3));
  if ((counts.has('RIFT_SYSTEM') || counts.has('CONVERGENCE_SYSTEM')) && (summary.transform >= 0.2 || summary.organizedHistory)) counts.set('TRANSFORM_SYSTEM', clampInteger(1 + thresholdCount(Math.max(summary.transform, summary.mobility), 0.62, 0.82), 1, 3));
  if (counts.has('CONVERGENCE_SYSTEM') && (summary.crustProduction >= 0.3 || summary.mobility >= 0.32 || water >= 0.25 || summary.organizedHistory)) counts.set('ACCRETION_SYSTEM', clampInteger(1 + thresholdCount(Math.max(summary.crustProduction, summary.convergence), 0.65, 0.82), 1, 3));
  return counts;
}

function createFeaturePlans(input: {
  readonly inputSnapshot: CausalGeologyInputV1;
  readonly premise: PlanetaryPremiseV1;
  readonly interior: InteriorStateV1;
  readonly regimeHistory: TectonicRegimeHistoryV1;
  readonly context: GeologicSpineResearchContextV1;
  readonly summary: ActivitySummaryV1;
  readonly familyCounts: ReadonlyMap<GeologicSpineNodeFamily, number>;
  readonly oracle: WorldRandomOracle;
}): readonly PlannedFeatureV1[] {
  const plans: PlannedFeatureV1[] = [];
  for (const family of NODE_FAMILY_ORDER) {
    const count = input.familyCounts.get(family) ?? 0;
    for (let ordinal = 0; ordinal < count; ordinal += 1) {
      const epoch = selectFormationEpoch(family, input.regimeHistory);
      const scope = [
        input.inputSnapshot.contentHash.value,
        input.premise.contentHash.value,
        input.interior.contentHash.value,
        input.regimeHistory.contentHash.value,
        input.context.contentHash.value,
        family,
        ordinal,
      ] as const;
      const nodeId = stableId('node', { family, ordinal, scope });
      const eventId = stableId('event', { nodeId, epochId: epoch.epochId });
      const u = input.oracle.float01({ stream: 'causal.geologic-spine', scope, draw: 0 });
      const v = input.oracle.float01({ stream: 'causal.geologic-spine', scope, draw: 1 });
      const bearing = input.oracle.float01({ stream: 'causal.geologic-spine', scope, draw: 2 }) * 360;
      const eventFraction = input.oracle.float01({ stream: 'causal.geologic-spine', scope, draw: 3 });
      const latitudeDegrees = canonicalNumber(Math.asin(clampNumber(2 * u - 1, -0.985, 0.985)) * 180 / Math.PI);
      const longitudeDegrees = canonicalNumber(v * 360 - 180);
      const activity = familyActivity(family, epoch, input.summary);
      const angularRadius = canonicalNumber(baseAngularRadius(family) * (0.78 + activity * 0.58));
      const elongation = family === 'CONTINENTAL_KERNEL' || family === 'PLUME_SYSTEM' ? undefined : canonicalNumber(0.35 + activity * 0.55);
      const interval = eventInterval(epoch, eventFraction);
      const temporalContext = temporalContextFor(interval.start, interval.end, input.regimeHistory.totalResolvedDuration.value, preservationStateFor(family, epoch, input.regimeHistory));
      const node: GeologicSpineNodeV1 = {
        nodeId,
        family,
        anchor: createSphericalAnchor(latitudeDegrees, longitudeDegrees),
        extent: createSphericalExtent(angularRadius, bearing, elongation),
        formationEventIds: [],
        temporalContext,
        evidenceIds: evidenceForFamily(family),
      };
      plans.push({ family, ordinal, nodeId, eventId, epoch, eventStart: interval.start, eventEnd: interval.end, node });
    }
  }
  if (plans.length === 0 || plans.length > GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxNodes) throw new Error('Geologic-spine node plan violates the frozen resource budget.');
  return cloneAndDeepFreeze(plans);
}

function createEvents(plans: readonly PlannedFeatureV1[], history: TectonicRegimeHistoryV1): readonly GeologicSpineEventV1[] {
  const firstByFamily = new Map<GeologicSpineNodeFamily, PlannedFeatureV1>();
  for (const plan of plans) if (!firstByFamily.has(plan.family)) firstByFamily.set(plan.family, plan);
  const events = plans.map((plan) => {
    const candidateParents = parentFamiliesFor(plan.family)
      .map((family) => firstByFamily.get(family))
      .filter((candidate): candidate is PlannedFeatureV1 => Boolean(candidate))
      .filter((candidate) => candidate.eventStart <= plan.eventStart && candidate.eventId !== plan.eventId);
    const parentEventIds = uniqueText(candidateParents.slice(0, 2).map((candidate) => candidate.eventId));
    const event: GeologicSpineEventV1 = {
      eventId: plan.eventId,
      epochId: plan.epoch.epochId,
      normalizedTimeRange: createScientificRange(plan.eventStart, plan.eventEnd, 'normalized-0-1', 'normalized-0-1-v1', `${plan.eventId}.normalized-time`),
      relatedNodeIds: [plan.nodeId],
      parentEventIds,
      temporalContext: plan.node.temporalContext,
      evidenceIds: evidenceForFamily(plan.family),
    };
    return cloneAndDeepFreeze(event);
  }).sort((a, b) => compareStableText(a.eventId, b.eventId));
  if (events.length !== plans.length || events.length > GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxEvents) throw new Error('Geologic-spine event plan violates the frozen resource budget.');
  for (const event of events) {
    const epoch = history.epochs.find((candidate) => candidate.epochId === event.epochId);
    if (!epoch || event.normalizedTimeRange.min < epoch.startTime || event.normalizedTimeRange.max > epoch.endTime) throw new Error(`Geologic-spine event ${event.eventId} is outside its formation epoch.`);
  }
  return cloneAndDeepFreeze(events);
}

function createEdges(nodes: readonly GeologicSpineNodeV1[]): readonly GeologicSpineEdgeV1[] {
  const firstByFamily = new Map<GeologicSpineNodeFamily, GeologicSpineNodeV1>();
  for (const node of nodes) if (!firstByFamily.has(node.family)) firstByFamily.set(node.family, node);
  const edges: GeologicSpineEdgeV1[] = [];
  const ordered = [...nodes].sort((a, b) => NODE_FAMILY_ORDER.indexOf(a.family) - NODE_FAMILY_ORDER.indexOf(b.family) || compareStableText(a.nodeId, b.nodeId));
  for (const node of ordered) {
    const first = firstByFamily.get(node.family);
    if (first && first.nodeId !== node.nodeId) {
      edges.push(edge('INHERITS_FROM', node, first));
      continue;
    }
    const target = targetForFamily(node.family, firstByFamily);
    if (target) edges.push(edge(edgeKindFor(node.family), node, target));
  }
  const canonical = edges.sort((a, b) => compareStableText(a.edgeId, b.edgeId));
  if (canonical.length > GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxEdges) throw new Error('Geologic-spine edges exceed the frozen budget.');
  return cloneAndDeepFreeze(canonical);
}

function edge(kind: GeologicSpineEdgeKind, from: GeologicSpineNodeV1, to: GeologicSpineNodeV1): GeologicSpineEdgeV1 {
  if (from.nodeId === to.nodeId) throw new Error('Geologic-spine edge cannot self-reference.');
  return cloneAndDeepFreeze({
    edgeId: stableId('edge', { kind, fromNodeId: from.nodeId, toNodeId: to.nodeId }),
    kind,
    fromNodeId: from.nodeId,
    toNodeId: to.nodeId,
    evidenceIds: uniqueText([...from.evidenceIds, ...to.evidenceIds]),
  });
}

function targetForFamily(family: GeologicSpineNodeFamily, byFamily: ReadonlyMap<GeologicSpineNodeFamily, GeologicSpineNodeV1>): GeologicSpineNodeV1 | undefined {
  if (family === 'CONTINENTAL_KERNEL') return undefined;
  if (family === 'PLUME_SYSTEM') return byFamily.get('CONTINENTAL_KERNEL');
  if (family === 'RIFT_SYSTEM') return byFamily.get('PLUME_SYSTEM') ?? byFamily.get('CONTINENTAL_KERNEL');
  if (family === 'OCEAN_BASIN') return byFamily.get('RIFT_SYSTEM');
  if (family === 'CONVERGENCE_SYSTEM') return byFamily.get('OCEAN_BASIN') ?? byFamily.get('CONTINENTAL_KERNEL');
  if (family === 'TRANSFORM_SYSTEM') return byFamily.get('RIFT_SYSTEM') ?? byFamily.get('CONVERGENCE_SYSTEM');
  return byFamily.get('CONTINENTAL_KERNEL') ?? byFamily.get('ACCRETION_SYSTEM');
}

function edgeKindFor(family: GeologicSpineNodeFamily): GeologicSpineEdgeKind {
  if (family === 'PLUME_SYSTEM' || family === 'RIFT_SYSTEM') return 'OVERPRINTS';
  if (family === 'OCEAN_BASIN') return 'SEPARATED_FROM';
  if (family === 'CONVERGENCE_SYSTEM') return 'CONVERGES_WITH';
  if (family === 'TRANSFORM_SYSTEM') return 'TRANSFORMS_AGAINST';
  if (family === 'ACCRETION_SYSTEM') return 'ACCRETES_TO';
  return 'INHERITS_FROM';
}

function summarizeActivity(interior: InteriorStateV1, history: TectonicRegimeHistoryV1): ActivitySummaryV1 {
  const maximum = (selector: (epoch: TectonicEpochV1) => number): number => Math.max(...history.epochs.map(selector));
  return {
    mobility: maximum((epoch) => rangeCenter(epoch.mobilityRange)),
    extension: maximum((epoch) => rangeCenter(epoch.extensionRange)),
    convergence: maximum((epoch) => rangeCenter(epoch.convergenceRange)),
    transform: maximum((epoch) => rangeCenter(epoch.transformRange)),
    plume: Math.max(maximum((epoch) => rangeCenter(epoch.plumeRange)), rangeCenter(interior.hotspotTendencyRange), rangeCenter(interior.meltAndVolcanismRange)),
    crustProduction: maximum((epoch) => rangeCenter(epoch.crustProductionRange)),
    melt: rangeCenter(interior.meltAndVolcanismRange),
    thermal: rangeCenter(interior.thermalBudgetRange),
    rift: rangeCenter(interior.riftTendencyRange),
    hotspot: rangeCenter(interior.hotspotTendencyRange),
    organizedHistory: history.epochs.some((epoch) => /EPISODIC|MOBILE|SLUGGISH|SQUISHY/.test(epoch.regimeFamily)),
  };
}

function selectFormationEpoch(family: GeologicSpineNodeFamily, history: TectonicRegimeHistoryV1): TectonicEpochV1 {
  if (family === 'CONTINENTAL_KERNEL') return history.epochs[0];
  const score = (epoch: TectonicEpochV1): number => {
    if (family === 'PLUME_SYSTEM') return rangeCenter(epoch.plumeRange) + rangeCenter(epoch.crustProductionRange) * 0.25;
    if (family === 'RIFT_SYSTEM' || family === 'OCEAN_BASIN') return rangeCenter(epoch.extensionRange) + rangeCenter(epoch.mobilityRange) * 0.2;
    if (family === 'CONVERGENCE_SYSTEM' || family === 'ACCRETION_SYSTEM') return rangeCenter(epoch.convergenceRange) + rangeCenter(epoch.crustProductionRange) * 0.25;
    return rangeCenter(epoch.transformRange) + rangeCenter(epoch.mobilityRange) * 0.2;
  };
  return [...history.epochs].sort((a, b) => score(b) - score(a) || a.sequenceIndex - b.sequenceIndex)[0];
}

function familyActivity(family: GeologicSpineNodeFamily, epoch: TectonicEpochV1, summary: ActivitySummaryV1): number {
  if (family === 'CONTINENTAL_KERNEL') return clampNumber((summary.crustProduction + (1 - summary.thermal)) / 2, 0, 1);
  if (family === 'PLUME_SYSTEM') return clampNumber((rangeCenter(epoch.plumeRange) + summary.plume) / 2, 0, 1);
  if (family === 'RIFT_SYSTEM' || family === 'OCEAN_BASIN') return clampNumber((rangeCenter(epoch.extensionRange) + summary.rift) / 2, 0, 1);
  if (family === 'CONVERGENCE_SYSTEM' || family === 'ACCRETION_SYSTEM') return clampNumber((rangeCenter(epoch.convergenceRange) + summary.mobility) / 2, 0, 1);
  return clampNumber((rangeCenter(epoch.transformRange) + summary.mobility) / 2, 0, 1);
}

function baseAngularRadius(family: GeologicSpineNodeFamily): number {
  if (family === 'CONTINENTAL_KERNEL') return 24;
  if (family === 'OCEAN_BASIN') return 30;
  if (family === 'PLUME_SYSTEM') return 9;
  if (family === 'ACCRETION_SYSTEM') return 12;
  return 16;
}

function eventInterval(epoch: TectonicEpochV1, randomFraction: number): Readonly<{ start: number; end: number }> {
  const duration = epoch.endTime - epoch.startTime;
  const start = canonicalNumber(epoch.startTime + duration * (0.08 + randomFraction * 0.52));
  const end = canonicalNumber(Math.min(epoch.endTime, start + duration * (0.1 + (1 - randomFraction) * 0.14)));
  if (end > start) return { start, end };
  return {
    start: canonicalNumber(epoch.startTime + duration * 0.2),
    end: canonicalNumber(epoch.startTime + duration * 0.4),
  };
}

function temporalContextFor(start: number, end: number, totalDuration: number, preservationState: GeologicPreservationState): GeologicTemporalContextV1 {
  const formationMin = canonicalNumber(Math.max(0, totalDuration * (1 - end)));
  const formationMax = canonicalNumber(Math.max(formationMin, totalDuration * (1 - start)));
  const persistenceMin = formationMin;
  const persistenceMax = formationMax;
  const exposureFactor = preservationState === 'ACTIVE' || preservationState === 'EXPOSED' ? 0.8
    : preservationState === 'INHERITED' ? 0.62
      : preservationState === 'REWORKED' ? 0.45
        : preservationState === 'BURIED' ? 0.25
          : 0.35;
  const exposureMin = canonicalNumber(Math.min(persistenceMin, persistenceMin * exposureFactor));
  const exposureMax = canonicalNumber(Math.min(persistenceMax, persistenceMax * exposureFactor));
  const subject = stableId('temporal', { start, end, totalDuration, preservationState });
  return cloneAndDeepFreeze({
    formationAgeRange: createScientificRange(formationMin, formationMax, 'gigaannum', 'gigaannum-v1', `${subject}.formation-age`),
    persistenceRange: createScientificRange(persistenceMin, persistenceMax, 'gigaannum', 'gigaannum-v1', `${subject}.persistence`),
    surfaceExposureDurationRange: createScientificRange(exposureMin, exposureMax, 'gigaannum', 'gigaannum-v1', `${subject}.surface-exposure`),
    preservationState,
  });
}

function preservationStateFor(family: GeologicSpineNodeFamily, epoch: TectonicEpochV1, history: TectonicRegimeHistoryV1): GeologicPreservationState {
  const isCurrent = epoch.sequenceIndex === history.epochs.length - 1;
  if (isCurrent) return 'ACTIVE';
  if (family === 'CONTINENTAL_KERNEL') return 'INHERITED';
  if (family === 'CONVERGENCE_SYSTEM' || family === 'ACCRETION_SYSTEM') return 'REWORKED';
  if (family === 'OCEAN_BASIN') return 'BURIED';
  return 'ERODED_RELICT';
}

function parentFamiliesFor(family: GeologicSpineNodeFamily): readonly GeologicSpineNodeFamily[] {
  if (family === 'PLUME_SYSTEM') return ['CONTINENTAL_KERNEL'];
  if (family === 'RIFT_SYSTEM') return ['CONTINENTAL_KERNEL', 'PLUME_SYSTEM'];
  if (family === 'OCEAN_BASIN') return ['RIFT_SYSTEM'];
  if (family === 'CONVERGENCE_SYSTEM') return ['CONTINENTAL_KERNEL', 'OCEAN_BASIN'];
  if (family === 'TRANSFORM_SYSTEM') return ['CONVERGENCE_SYSTEM', 'RIFT_SYSTEM'];
  if (family === 'ACCRETION_SYSTEM') return ['CONVERGENCE_SYSTEM', 'CONTINENTAL_KERNEL'];
  return [];
}

function evidenceForFamily(family: GeologicSpineNodeFamily): readonly string[] {
  const common = ['spine/event-ancestry-and-inheritance-v1', 'spine/no-physical-surface-output-v1', 'spine/provisional-resolution-independent-placement-v1'];
  if (family === 'CONTINENTAL_KERNEL') return uniqueText([...common, 'spine/cratonic-kernel-persistence-v1']);
  if (family === 'PLUME_SYSTEM' || family === 'RIFT_SYSTEM') return uniqueText([...common, 'spine/plume-rift-interaction-v1']);
  return uniqueText([...common, 'spine/boundary-network-family-association-v1']);
}

function validateSpineHistoryCausality(spine: GeologicSpineV1, history: TectonicRegimeHistoryV1): void {
  const epochById = new Map(history.epochs.map((epoch) => [epoch.epochId, epoch]));
  const eventById = new Map(spine.events.map((event) => [event.eventId, event]));
  for (const event of spine.events) {
    const epoch = epochById.get(event.epochId);
    if (!epoch) throw new Error(`Geologic-spine event ${event.eventId} references an unknown history epoch.`);
    if (event.normalizedTimeRange.min < epoch.startTime || event.normalizedTimeRange.max > epoch.endTime) throw new Error(`Geologic-spine event ${event.eventId} is outside its epoch.`);
    for (const parentId of event.parentEventIds) {
      const parent = eventById.get(parentId);
      if (!parent) throw new Error(`Geologic-spine event ${event.eventId} references missing parent ${parentId}.`);
      if (parent.normalizedTimeRange.min > event.normalizedTimeRange.min) throw new Error(`Geologic-spine event ${event.eventId} precedes its parent ${parentId}.`);
    }
  }
}

function assertNoPhysicalFields(value: unknown): void {
  const forbidden = new Set([
    'baseHeight',
    'biome',
    'climate',
    'continentSkeletons',
    'elevation',
    'finalTerrain',
    'hydrology',
    'landMask',
    'material',
    'oceanBasinSkeletons',
    'plateId',
    'resources',
    'seaLevel',
    'terrain',
    'terrainHeight',
    'WorldBrain',
  ]);
  for (const key of collectObjectKeys(value)) if (forbidden.has(key)) throw new Error(`Geologic-spine output contains forbidden physical field ${key}.`);
}

function finalizeResolution(options: {
  readonly status: 'PARTIAL' | 'BLOCKED';
  readonly inputSnapshot: CausalGeologyInputV1;
  readonly premise: PlanetaryPremiseV1;
  readonly interior: InteriorStateV1;
  readonly regimeHistory: TectonicRegimeHistoryV1;
  readonly context: GeologicSpineResearchContextV1;
  readonly spine?: GeologicSpineV1;
  readonly blockingReasons: readonly string[];
  readonly missingDomains: readonly string[];
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
}): GeologicSpineResolutionV1 {
  const metrics: GeologicSpineResolutionMetricsV1 = cloneAndDeepFreeze({
    schemaVersion: 1,
    ruleEvaluations: options.evidenceIds.length,
    nodeCount: options.spine?.nodes.length ?? 0,
    edgeCount: options.spine?.edges.length ?? 0,
    eventCount: options.spine?.events.length ?? 0,
    serializedSpineBytes: options.spine ? TEXT_ENCODER.encode(canonicalJsonStringify(options.spine)).length : 0,
  });
  if (metrics.nodeCount > GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxNodes
    || metrics.edgeCount > GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxEdges
    || metrics.eventCount > GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxEvents
    || metrics.serializedSpineBytes > GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxSerializedSpineBytes) {
    throw new Error('Geologic-spine resolution exceeds the frozen performance budget.');
  }
  const payload = {
    schemaVersion: 1 as const,
    resolverVersion: 1 as const,
    status: options.status,
    inputSnapshotHash: options.inputSnapshot.contentHash,
    premiseHash: options.premise.contentHash,
    interiorHash: options.interior.contentHash,
    regimeHistoryHash: options.regimeHistory.contentHash,
    researchContextHash: options.context.contentHash,
    ...(options.spine ? { spine: options.spine } : {}),
    blockingReasons: uniqueText(options.blockingReasons),
    missingDomains: uniqueText(options.missingDomains),
    evidenceIds: uniqueText(options.evidenceIds),
    contradictionIds: uniqueText(options.contradictionIds),
    metrics,
  };
  const resolution = cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/geologic-spine-resolution/v1', payload),
  });
  validateGeologicSpineResolution(resolution);
  return resolution;
}

function resolutionPayloadWithoutHash(resolution: GeologicSpineResolutionV1): Omit<GeologicSpineResolutionV1, 'contentHash'> {
  return {
    schemaVersion: resolution.schemaVersion,
    resolverVersion: resolution.resolverVersion,
    status: resolution.status,
    inputSnapshotHash: resolution.inputSnapshotHash,
    premiseHash: resolution.premiseHash,
    interiorHash: resolution.interiorHash,
    regimeHistoryHash: resolution.regimeHistoryHash,
    researchContextHash: resolution.researchContextHash,
    ...(resolution.spine ? { spine: resolution.spine } : {}),
    blockingReasons: resolution.blockingReasons,
    missingDomains: resolution.missingDomains,
    evidenceIds: resolution.evidenceIds,
    contradictionIds: resolution.contradictionIds,
    metrics: resolution.metrics,
  };
}

function validateGeologicSpineReview(review: GeologicSpineResearchReviewV1, bundle: ScientificResearchBundleV1): void {
  assertExactKeys(review, REVIEW_KEYS, 'Geologic-spine research review');
  if (review.schemaVersion !== 1 || review.status !== 'GEOLOGIC_SPINE_RESEARCH_PACKAGE_REVIEWED' || review.bundleVersion !== bundle.bundleVersion) throw new Error('Geologic-spine research review identity is invalid.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(review.reviewDate) || !isText(review.reviewer) || !isText(review.scope)) throw new Error('Geologic-spine research review metadata is invalid.');
  if (review.implementationAuthorized !== true || !review.implementationAuthorizationDate || !review.implementationAuthorizationBasis) throw new Error('Geologic-spine implementation is not authorized by the reviewed package.');
  const complete = canonicalText(review.completeEligibleRuleIds, 'Geologic-spine complete-eligible rule IDs');
  const partial = canonicalText(review.partialOnlyRuleIds, 'Geologic-spine partial-only rule IDs');
  const all = uniqueText([...complete, ...partial]);
  const bundleIds = bundle.claimRules.map((rule) => rule.ruleId);
  if (!arraysEqual(all, bundleIds)) throw new Error('Geologic-spine review rule coverage does not match the research bundle.');
  if (complete.some((id) => partial.includes(id))) throw new Error('Geologic-spine review rule classes overlap.');
  for (const rule of bundle.claimRules) {
    if (complete.includes(rule.ruleId) && rule.evidenceStatus !== 'REVIEWED') throw new Error(`Geologic-spine complete-eligible rule ${rule.ruleId} is not reviewed.`);
    if (partial.includes(rule.ruleId) && rule.evidenceStatus === 'RESEARCH_REQUIRED') throw new Error(`Geologic-spine partial rule ${rule.ruleId} remains research-required.`);
  }
}

function validateMetrics(value: unknown): asserts value is GeologicSpineResolutionMetricsV1 {
  assertExactKeys(value, METRICS_KEYS, 'Geologic-spine metrics');
  const metrics = value as GeologicSpineResolutionMetricsV1;
  if (metrics.schemaVersion !== 1) throw new Error('Unsupported geologic-spine metrics.');
  for (const [label, amount, maximum] of [
    ['rule evaluations', metrics.ruleEvaluations, GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxClaimRules],
    ['nodes', metrics.nodeCount, GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxNodes],
    ['edges', metrics.edgeCount, GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxEdges],
    ['events', metrics.eventCount, GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxEvents],
    ['serialized bytes', metrics.serializedSpineBytes, GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxSerializedSpineBytes],
  ] as const) if (!Number.isSafeInteger(amount) || amount < 0 || amount > maximum) throw new Error(`Geologic-spine ${label} metric is invalid.`);
}

function thresholdCount(value: number, first: number, second: number): number {
  return (value >= first ? 1 : 0) + (value >= second ? 1 : 0);
}

function rangeCenter(range: Readonly<{ min: number; max: number }>): number {
  return canonicalNumber((range.min + range.max) / 2);
}

function stableId(prefix: string, value: unknown): string {
  return `${prefix}-${hashCausalPayload(`WorldWright/geologic-spine-id/${prefix}/v1`, value).value}`;
}

function canonicalNumber(value: number): number {
  if (!Number.isFinite(value)) throw new Error('Geologic-spine numeric value must be finite.');
  const rounded = Math.round(value * 1_000_000_000) / 1_000_000_000;
  return Object.is(rounded, -0) ? 0 : rounded;
}

function clampNumber(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function clampInteger(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, Math.round(value)));
}

function uniqueText(values: readonly string[]): readonly string[] {
  if (!Array.isArray(values) || !values.every(isText)) throw new Error('Geologic-spine text collection is invalid.');
  return Object.freeze([...new Set(values)].sort(compareStableText));
}

function uniqueFamilies(values: readonly GeologicSpineNodeFamily[]): readonly GeologicSpineNodeFamily[] {
  return Object.freeze([...new Set(values)].sort(compareStableText));
}

function canonicalText(value: unknown, label: string): readonly string[] {
  if (!Array.isArray(value) || !value.every(isText) || new Set(value).size !== value.length) throw new Error(`${label} are invalid.`);
  const values = value as readonly string[];
  if (!arraysEqual(values, [...values].sort(compareStableText))) throw new Error(`${label} are not canonically ordered.`);
  return values;
}

function assertExactKeys(value: unknown, expected: readonly string[], label: string): void {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
  const keys = Object.keys(value).sort(compareStableText);
  const canonicalExpected = [...expected].sort(compareStableText);
  if (!arraysEqual(keys, canonicalExpected)) throw new Error(`${label} has invalid fields; actual=${keys.join(',')}; expected=${canonicalExpected.join(',')}.`);
}

function assertAllowedAndRequiredKeys(value: unknown, allowed: readonly string[], required: readonly string[], label: string): void {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
  const keys = Object.keys(value);
  const unknown = keys.filter((key) => !allowed.includes(key)).sort(compareStableText);
  const missing = required.filter((key) => !(key in value));
  if (unknown.length || missing.length) throw new Error(`${label} has invalid fields; unknown=${unknown.join(',')}; missing=${missing.join(',')}.`);
}

function collectObjectKeys(value: unknown, output = new Set<string>()): Set<string> {
  if (!value || typeof value !== 'object') return output;
  if (Array.isArray(value)) {
    for (const entry of value) collectObjectKeys(entry, output);
    return output;
  }
  for (const [key, entry] of Object.entries(value)) {
    output.add(key);
    collectObjectKeys(entry, output);
  }
  return output;
}

function arraysEqual<T>(a: readonly T[], b: readonly T[]): boolean {
  return a.length === b.length && a.every((entry, index) => entry === b[index]);
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
