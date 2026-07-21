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
import {
  INTERIOR_LID_REGIME_CANDIDATES,
  INTERIOR_LITHOSPHERE_BEHAVIOR_CANDIDATES,
  INTERIOR_RHEOLOGY_CANDIDATES,
  validateInteriorFixtureSet,
  type InteriorFixtureSetV1,
  type InteriorLidRegimeCandidateV1,
  type InteriorLithosphereBehaviorCandidateV1,
  type InteriorResearchReviewV1,
  type InteriorRheologyCandidateV1,
} from './interiorResearchContracts';
import { validateCausalGeologyInput } from './inputAuthority';
import { createScientificRange } from './quantities';
import { validateScientificResearchBundle } from './researchLedger';
import { validateInteriorState, validatePlanetaryPremise, validateCausalStageResult } from './validation';
import { canProceedFromStage, createCausalStageResult } from './stageResult';
import type {
  CausalGeologyInputId,
  CausalGeologyInputV1,
  CausalStageResultV1,
  InteriorHeatSourceFractionV1,
  InteriorStateV1,
  PlanetaryPremiseV1,
  ScientificResearchBundleV1,
} from './types';

export const INTERIOR_RESOLVER_PERFORMANCE_BUDGET_V1 = Object.freeze({
  maxResearchSources: 16,
  maxClaimRules: 32,
  maxFixtures: 32,
  maxRheologyCandidates: INTERIOR_RHEOLOGY_CANDIDATES.length,
  maxLithosphereCandidates: INTERIOR_LITHOSPHERE_BEHAVIOR_CANDIDATES.length,
  maxLidCandidates: INTERIOR_LID_REGIME_CANDIDATES.length,
  maxBranchResolutions: 1,
  maxSerializedResultBytes: 256 * 1024,
  maxAverageResolutionMilliseconds: 1_000,
  maxHeapDeltaBytes: 128 * 1024 * 1024,
});

export interface InteriorResearchContextV1 {
  readonly schemaVersion: 1;
  readonly contextVersion: 1;
  readonly researchBundle: ScientificResearchBundleV1;
  readonly fixtureSet: InteriorFixtureSetV1;
  readonly review: InteriorResearchReviewV1;
  readonly contentHash: DeterministicHash;
}

export interface InteriorResolutionMetricsV1 {
  readonly schemaVersion: 1;
  readonly ruleEvaluations: number;
  readonly rheologyCandidateCount: number;
  readonly lithosphereCandidateCount: number;
  readonly lidCandidateCount: number;
  readonly branchResolutionCount: number;
  readonly serializedResultBytes: number;
}

export interface InteriorResolutionV1 {
  readonly schemaVersion: 1;
  readonly resolverVersion: 1;
  readonly status: 'PARTIAL' | 'BLOCKED';
  readonly inputSnapshotHash: DeterministicHash;
  readonly premiseHash: DeterministicHash;
  readonly researchContextHash: DeterministicHash;
  readonly interior?: InteriorStateV1;
  readonly branchResolutions: readonly WeightedBranchResolutionV1<string>[];
  readonly blockingReasons: readonly string[];
  readonly missingDomains: readonly string[];
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly metrics: InteriorResolutionMetricsV1;
  readonly contentHash: DeterministicHash;
}

export interface RunInteriorShadowOptionsV1 {
  readonly authorityMode: GeneratorAuthorityMode;
  readonly featureFlags: ResolvedWorldFeatureFlagSnapshot;
  readonly inputSnapshot: CausalGeologyInputV1;
  readonly premise: PlanetaryPremiseV1;
  readonly premiseStageResult: CausalStageResultV1<PlanetaryPremiseV1>;
  readonly researchContext: InteriorResearchContextV1;
}

export interface InteriorShadowRunnerResultV1 {
  readonly schemaVersion: 1;
  readonly runnerVersion: 1;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly inputSnapshotHash: DeterministicHash;
  readonly premiseHash: DeterministicHash;
  readonly researchContextHash: DeterministicHash;
  readonly resolution: InteriorResolutionV1;
  readonly stageResult: CausalStageResultV1<InteriorStateV1>;
  readonly contentHash: DeterministicHash;
}

const RESEARCH_CONTEXT_KEYS = ['schemaVersion', 'contextVersion', 'researchBundle', 'fixtureSet', 'review', 'contentHash'] as const;
const REVIEW_KEYS = ['schemaVersion', 'bundleVersion', 'status', 'reviewDate', 'reviewer', 'scope', 'completeEligibleRuleIds', 'partialOnlyRuleIds', 'implementationAuthorized', 'implementationAuthorizationDate', 'implementationAuthorizationBasis'] as const;
const RESOLUTION_KEYS = ['schemaVersion', 'resolverVersion', 'status', 'inputSnapshotHash', 'premiseHash', 'researchContextHash', 'interior', 'branchResolutions', 'blockingReasons', 'missingDomains', 'evidenceIds', 'contradictionIds', 'metrics', 'contentHash'] as const;
const METRICS_KEYS = ['schemaVersion', 'ruleEvaluations', 'rheologyCandidateCount', 'lithosphereCandidateCount', 'lidCandidateCount', 'branchResolutionCount', 'serializedResultBytes'] as const;
const RUNNER_KEYS = ['schemaVersion', 'runnerVersion', 'authorityMode', 'inputSnapshotHash', 'premiseHash', 'researchContextHash', 'resolution', 'stageResult', 'contentHash'] as const;
const REQUIRED_INPUT_IDS: readonly CausalGeologyInputId[] = [
  'inventory.water',
  'planet.density',
  'planet.radius',
  'thermal.age',
  'thermal.primordial-heat',
  'thermal.radiogenic-heat',
  'thermal.tidal-heating',
];
const ARTIFICIAL_BODY_CLASS = 'ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL';

export function createInteriorResearchContext(input: {
  readonly researchBundle: ScientificResearchBundleV1;
  readonly fixtureSet: InteriorFixtureSetV1;
  readonly review: InteriorResearchReviewV1;
}): InteriorResearchContextV1 {
  validateScientificResearchBundle(input.researchBundle);
  validateInteriorFixtureSet(input.fixtureSet);
  validateInteriorReview(input.review, input.researchBundle);
  if (input.researchBundle.sources.length > INTERIOR_RESOLVER_PERFORMANCE_BUDGET_V1.maxResearchSources) throw new Error('Interior research source count exceeds the frozen budget.');
  if (input.researchBundle.claimRules.length > INTERIOR_RESOLVER_PERFORMANCE_BUDGET_V1.maxClaimRules) throw new Error('Interior claim-rule count exceeds the frozen budget.');
  if (input.fixtureSet.fixtures.length > INTERIOR_RESOLVER_PERFORMANCE_BUDGET_V1.maxFixtures) throw new Error('Interior fixture count exceeds the frozen budget.');
  const payload = {
    schemaVersion: 1 as const,
    contextVersion: 1 as const,
    researchBundle: input.researchBundle,
    fixtureSet: input.fixtureSet,
    review: input.review,
  };
  return cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/interior-research-context/v1', payload),
  });
}

export function resolveInteriorState(
  inputSnapshot: CausalGeologyInputV1,
  premise: PlanetaryPremiseV1,
  context: InteriorResearchContextV1,
): InteriorResolutionV1 {
  validateCausalGeologyInput(inputSnapshot);
  validatePlanetaryPremise(premise);
  validateInteriorResearchContext(context);
  if (!deterministicHashEquals(premise.inputSnapshotHash, inputSnapshot.contentHash)) throw new Error('Interior premise is not bound to the supplied sanitized input snapshot.');

  if (premise.bodyClassCandidates.includes(ARTIFICIAL_BODY_CLASS)) {
    return finalizeResolution({
      status: 'BLOCKED',
      inputSnapshot,
      premise,
      context,
      branchResolutions: [],
      blockingReasons: ['ARTIFICIAL_INTERIOR_MODEL_NOT_IMPLEMENTED'],
      missingDomains: [],
      evidenceIds: ['interior/no-downstream-geology-v1'],
      contradictionIds: premise.contradictionIds,
    });
  }

  const quantities = requiredQuantities(inputSnapshot);
  const water = quantities['inventory.water'];
  const density = quantities['planet.density'];
  const radius = quantities['planet.radius'];
  const age = quantities['thermal.age'];
  const primordial = quantities['thermal.primordial-heat'];
  const radiogenic = quantities['thermal.radiogenic-heat'];
  const tidal = quantities['thermal.tidal-heating'];

  const ageRetention = clamp(1 - (age / 14) * 0.55, 0.25, 1);
  const retainedPrimordial = primordial * ageRetention;
  const sizeFactor = clamp(0.75 + 0.25 * Math.sqrt(radius), 0.75, 1.15);
  const thermalCenter = clamp((0.32 * retainedPrimordial + 0.45 * radiogenic + 0.38 * tidal) * sizeFactor, 0, 1);
  const bodyAdjustment = bodyConvectionAdjustment(premise);
  const convectionCenter = clamp(
    0.08
      + thermalCenter * 0.78
      + clamp(radius - 1, -1, 1) * 0.08
      + tidal * 0.12
      - clamp(age / 10, 0, 1) * 0.12
      + bodyAdjustment,
    0,
    1,
  );
  const pressurePenalty = Math.max(0, density - 1.1) * 0.2;
  const meltCenter = clamp(
    0.02 + thermalCenter * 0.72 + tidal * 0.22 + primordial * 0.08 + bodyMeltAdjustment(premise) - pressurePenalty,
    0,
    1,
  );
  const waterFactor = clamp(water / 2, 0, 1);
  const riftCenter = clamp(0.05 + convectionCenter * 0.5 + waterFactor * 0.15 + tidal * 0.12, 0, 1);
  const hotspotCenter = clamp(0.08 + convectionCenter * 0.55 + tidal * 0.2 + thermalCenter * 0.1, 0, 1);

  const rheologyCandidates = resolveRheologyCandidates(premise, meltCenter, tidal);
  const lithosphereCandidates = resolveLithosphereCandidates(premise, convectionCenter, meltCenter, tidal);
  const lidCandidates = resolveLidCandidates(premise, thermalCenter, convectionCenter, meltCenter, tidal, waterFactor);
  const evidenceIds = resolveEvidenceIds(premise, radiogenic, tidal, thermalCenter);
  const oracle = createWorldRandomOracle(inputSnapshot.rootSeed, { authorityMode: 'CAUSAL_SHADOW' });
  const lidBranch = resolveWeightedBranch<string>({
    branchId: 'interior/lid-regime/v1',
    stream: 'causal.interior',
    scope: ['lid-regime', inputSnapshot.contentHash.value, premise.contentHash.value, context.contentHash.value],
    options: lidCandidates.map((candidate) => ({
      id: candidate,
      value: candidate,
      weight: lidWeight(candidate, thermalCenter, convectionCenter, meltCenter, tidal, waterFactor),
      evidenceIds,
      rationale: 'Replayable W1-03 working hypothesis among reviewed broad lid alternatives; not a tectonic-history conclusion.',
    })),
    oracle,
  });

  const limitations = canonicalText([
    ...context.researchBundle.knownLimitations,
    ...(premise.status === 'PARTIAL' ? ['Upstream planetary premise remains PARTIAL.'] : []),
  ], 'Interior limitations');
  const missingDomains = canonicalText([
    'intrusion-extrusion-partitioning',
    'material-yield-strength',
    'quantitative-rheology-parameters',
    'tectonic-history-and-regime-persistence',
    ...(premise.status === 'PARTIAL' ? ['premise-uniqueness'] : []),
    ...(isIcePremise(premise) ? ['ice-shell-geometry-and-ocean-state'] : []),
  ], 'Interior missing domains');
  const assumptions = canonicalText([
    'Declared heat-source inputs are accepted as upstream normalized quantities and are not recomputed from legacy fields.',
    'Normalized ranges are deliberately broad comparative indices rather than SI-unit predictions.',
    'The selected lid regime is a deterministic working hypothesis while the interior record remains PARTIAL.',
  ], 'Interior assumptions');

  const heatSourceFractions = createHeatSourceFractions(retainedPrimordial, radiogenic, tidal);
  const interiorPayload = {
    schemaVersion: 1 as const,
    status: 'PARTIAL' as const,
    interiorVersion: 1,
    thermalBudgetRange: normalizedRange(thermalCenter, 0.16, 'interior.thermal-budget'),
    heatSourceFractions,
    mantleConvectionRange: normalizedRange(convectionCenter, 0.18, 'interior.mantle-convection'),
    rheologyCandidates,
    lithosphereBehaviorCandidates: lithosphereCandidates,
    lidRegimeCandidates: lidCandidates,
    resolvedLidRegime: lidBranch.chosenValue,
    meltAndVolcanismRange: normalizedRange(meltCenter, 0.2, 'interior.melt-and-volcanism'),
    riftTendencyRange: normalizedRange(riftCenter, 0.2, 'interior.rift-tendency'),
    hotspotTendencyRange: normalizedRange(hotspotCenter, 0.2, 'interior.hotspot-tendency'),
    assumptions,
    branchResolutionIds: [lidBranch.branchId],
    confidenceAssessmentSubject: 'interior.broad-state',
    evidenceIds,
    contradictionIds: canonicalText([...inputSnapshot.contradictionIds, ...premise.contradictionIds], 'Interior contradiction IDs'),
    limitations,
  };
  const interior = cloneAndDeepFreeze({
    ...interiorPayload,
    contentHash: hashCausalPayload('WorldWright/interior-state/v1', interiorPayload),
  });
  validateInteriorState(interior);

  return finalizeResolution({
    status: 'PARTIAL',
    inputSnapshot,
    premise,
    context,
    interior,
    branchResolutions: [lidBranch],
    blockingReasons: [],
    missingDomains,
    evidenceIds,
    contradictionIds: interior.contradictionIds,
  });
}

export function runInteriorShadow(options: RunInteriorShadowOptionsV1): InteriorShadowRunnerResultV1 {
  if (options.authorityMode !== 'CAUSAL_SHADOW') throw new Error('Interior resolution is allowed only in CAUSAL_SHADOW mode.');
  if (options.featureFlags.authorityMode !== 'CAUSAL_SHADOW') throw new Error('Interior feature flags must be resolved for CAUSAL_SHADOW mode.');
  if (!worldFeatureFlagValue<boolean>(options.featureFlags, 'causal.shadow.enabled')) throw new Error('Interior resolution requires causal.shadow.enabled.');
  if (worldFeatureFlagValue<boolean>(options.featureFlags, 'causal.active.enabled')) throw new Error('Interior resolution cannot run with causal.active.enabled.');
  validateCausalGeologyInput(options.inputSnapshot);
  validatePlanetaryPremise(options.premise);
  validateCausalStageResult(options.premiseStageResult);
  validateInteriorResearchContext(options.researchContext);
  if (options.premiseStageResult.stageId !== 'CAUSAL_PREMISE_RESOLUTION') throw new Error('Interior resolution requires a planetary-premise stage result.');
  if (!canProceedFromStage(options.premiseStageResult, 'CAUSAL_INTERIOR_RESOLUTION')) throw new Error('Planetary-premise stage does not permit interior resolution.');
  if (canonicalJsonStringify(options.premiseStageResult.record) !== canonicalJsonStringify(options.premise)) throw new Error('Interior premise stage record does not match the supplied premise.');
  const expectedPremiseInputHash = hashCausalPayload('WorldWright/CAUSAL_PREMISE_RESOLUTION/input/v1', options.inputSnapshot);
  if (!deterministicHashEquals(options.premiseStageResult.inputHash, expectedPremiseInputHash)) throw new Error('Interior premise stage is not bound to the supplied input snapshot.');

  const resolution = resolveInteriorState(options.inputSnapshot, options.premise, options.researchContext);
  const stageInput = { inputSnapshot: options.inputSnapshot, premise: options.premise };
  const stageResult = resolution.status === 'BLOCKED'
    ? createCausalStageResult<InteriorStateV1>({
      stageId: 'CAUSAL_INTERIOR_RESOLUTION',
      stageVersion: 1,
      status: 'BLOCKED',
      input: stageInput,
      blockingReasons: resolution.blockingReasons,
      evidenceIds: resolution.evidenceIds,
      contradictionIds: resolution.contradictionIds,
    })
    : createCausalStageResult<InteriorStateV1>({
      stageId: 'CAUSAL_INTERIOR_RESOLUTION',
      stageVersion: 1,
      status: 'PARTIAL',
      input: stageInput,
      record: resolution.interior as InteriorStateV1,
      limitations: resolution.interior?.limitations,
      missingDomains: resolution.missingDomains,
      downstreamCompatibleStageIds: ['CAUSAL_REGIME_HISTORY'],
      evidenceIds: resolution.evidenceIds,
      contradictionIds: resolution.contradictionIds,
    });
  const payload = {
    schemaVersion: 1 as const,
    runnerVersion: 1 as const,
    authorityMode: 'CAUSAL_SHADOW' as const,
    inputSnapshotHash: options.inputSnapshot.contentHash,
    premiseHash: options.premise.contentHash,
    researchContextHash: options.researchContext.contentHash,
    resolution,
    stageResult,
  };
  const result = cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/interior-shadow-runner/v1', payload),
  });
  validateInteriorShadowRunnerResult(result);
  return result;
}

export function validateInteriorResearchContext(value: unknown): asserts value is InteriorResearchContextV1 {
  assertExactKeys(value, RESEARCH_CONTEXT_KEYS, 'Interior research context');
  const context = value as InteriorResearchContextV1;
  if (context.schemaVersion !== 1 || context.contextVersion !== 1) throw new Error('Unsupported interior research context.');
  validateScientificResearchBundle(context.researchBundle);
  validateInteriorFixtureSet(context.fixtureSet);
  validateInteriorReview(context.review, context.researchBundle);
  const expected = hashCausalPayload('WorldWright/interior-research-context/v1', {
    schemaVersion: context.schemaVersion,
    contextVersion: context.contextVersion,
    researchBundle: context.researchBundle,
    fixtureSet: context.fixtureSet,
    review: context.review,
  });
  if (!deterministicHashEquals(context.contentHash, expected)) throw new Error('Interior research context hash mismatch.');
}

export function validateInteriorResolution(value: unknown): asserts value is InteriorResolutionV1 {
  assertExactKeys(value, RESOLUTION_KEYS, 'Interior resolution');
  const resolution = value as InteriorResolutionV1;
  if (resolution.schemaVersion !== 1 || resolution.resolverVersion !== 1 || !['PARTIAL', 'BLOCKED'].includes(resolution.status)) throw new Error('Interior resolution identity is invalid.');
  assertDeterministicHash(resolution.inputSnapshotHash, 'Interior resolution input');
  assertDeterministicHash(resolution.premiseHash, 'Interior resolution premise');
  assertDeterministicHash(resolution.researchContextHash, 'Interior resolution research context');
  assertDeterministicHash(resolution.contentHash, 'Interior resolution');
  const hasInterior = resolution.interior !== undefined;
  if (hasInterior !== (resolution.status === 'PARTIAL')) throw new Error('Interior resolution has invalid record presence.');
  if (resolution.interior) validateInteriorState(resolution.interior);
  canonicalText(resolution.blockingReasons, 'Interior blocking reasons');
  canonicalText(resolution.missingDomains, 'Interior missing domains');
  canonicalText(resolution.evidenceIds, 'Interior evidence IDs');
  canonicalText(resolution.contradictionIds, 'Interior contradiction IDs');
  if (resolution.status === 'BLOCKED' && resolution.blockingReasons.length === 0) throw new Error('Blocked interior resolution requires a reason.');
  if (resolution.status === 'PARTIAL' && (resolution.blockingReasons.length !== 0 || resolution.missingDomains.length === 0)) throw new Error('Partial interior resolution has invalid blocker or missing-domain state.');
  if (!Array.isArray(resolution.branchResolutions) || resolution.branchResolutions.length > INTERIOR_RESOLVER_PERFORMANCE_BUDGET_V1.maxBranchResolutions) throw new Error('Interior branch resolutions exceed the frozen budget.');
  if (resolution.status === 'BLOCKED' && resolution.branchResolutions.length !== 0) throw new Error('Blocked interior resolution cannot retain branches.');
  if (resolution.status === 'PARTIAL' && resolution.branchResolutions.length !== 1) throw new Error('Partial interior resolution requires one deterministic lid branch.');
  validateInteriorMetrics(resolution.metrics);
  if (resolution.metrics.ruleEvaluations !== resolution.evidenceIds.length
    || resolution.metrics.rheologyCandidateCount !== (resolution.interior?.rheologyCandidates.length ?? 0)
    || resolution.metrics.lithosphereCandidateCount !== (resolution.interior?.lithosphereBehaviorCandidates.length ?? 0)
    || resolution.metrics.lidCandidateCount !== (resolution.interior?.lidRegimeCandidates.length ?? 0)
    || resolution.metrics.branchResolutionCount !== resolution.branchResolutions.length) throw new Error('Interior metrics do not match the resolution payload.');
  if (resolution.interior) {
    const branchIds = resolution.branchResolutions.map((branch) => branch.branchId);
    if (!arraysEqual(branchIds, resolution.interior.branchResolutionIds)) throw new Error('Interior branch records do not match the interior record.');
    if (!arraysEqual(resolution.evidenceIds, resolution.interior.evidenceIds)) throw new Error('Interior evidence does not match the interior record.');
    if (!arraysEqual(resolution.contradictionIds, resolution.interior.contradictionIds)) throw new Error('Interior contradictions do not match the interior record.');
    const chosen = resolution.branchResolutions[0]?.chosenValue;
    if (chosen !== resolution.interior.resolvedLidRegime) throw new Error('Interior resolved lid does not match its deterministic branch.');
  }
  const measuredBytes = measureResolutionBytes({
    schemaVersion: resolution.schemaVersion,
    resolverVersion: resolution.resolverVersion,
    status: resolution.status,
    inputSnapshotHash: resolution.inputSnapshotHash,
    premiseHash: resolution.premiseHash,
    researchContextHash: resolution.researchContextHash,
    ...(resolution.interior ? { interior: resolution.interior } : {}),
    branchResolutions: resolution.branchResolutions,
    blockingReasons: resolution.blockingReasons,
    missingDomains: resolution.missingDomains,
    evidenceIds: resolution.evidenceIds,
    contradictionIds: resolution.contradictionIds,
  }, resolution.metrics);
  if (measuredBytes !== resolution.metrics.serializedResultBytes) throw new Error('Interior serialized-size metric is inconsistent.');
  if (measuredBytes > INTERIOR_RESOLVER_PERFORMANCE_BUDGET_V1.maxSerializedResultBytes) throw new Error('Interior resolution exceeds the frozen artifact-size budget.');
  const expected = hashCausalPayload('WorldWright/interior-resolution/v1', {
    schemaVersion: resolution.schemaVersion,
    resolverVersion: resolution.resolverVersion,
    status: resolution.status,
    inputSnapshotHash: resolution.inputSnapshotHash,
    premiseHash: resolution.premiseHash,
    researchContextHash: resolution.researchContextHash,
    ...(resolution.interior ? { interior: resolution.interior } : {}),
    branchResolutions: resolution.branchResolutions,
    blockingReasons: resolution.blockingReasons,
    missingDomains: resolution.missingDomains,
    evidenceIds: resolution.evidenceIds,
    contradictionIds: resolution.contradictionIds,
    metrics: resolution.metrics,
  });
  if (!deterministicHashEquals(resolution.contentHash, expected)) throw new Error('Interior resolution hash mismatch.');
}

export function validateInteriorShadowRunnerResult(value: unknown): asserts value is InteriorShadowRunnerResultV1 {
  assertExactKeys(value, RUNNER_KEYS, 'Interior shadow runner result');
  const result = value as InteriorShadowRunnerResultV1;
  if (result.schemaVersion !== 1 || result.runnerVersion !== 1 || result.authorityMode !== 'CAUSAL_SHADOW') throw new Error('Interior shadow runner identity is invalid.');
  assertDeterministicHash(result.inputSnapshotHash, 'Interior runner input');
  assertDeterministicHash(result.premiseHash, 'Interior runner premise');
  assertDeterministicHash(result.researchContextHash, 'Interior runner research context');
  assertDeterministicHash(result.contentHash, 'Interior shadow runner');
  validateInteriorResolution(result.resolution);
  validateCausalStageResult(result.stageResult);
  if (result.stageResult.stageId !== 'CAUSAL_INTERIOR_RESOLUTION' || result.stageResult.status !== result.resolution.status) throw new Error('Interior runner stage result is inconsistent.');
  if (!deterministicHashEquals(result.resolution.inputSnapshotHash, result.inputSnapshotHash)
    || !deterministicHashEquals(result.resolution.premiseHash, result.premiseHash)
    || !deterministicHashEquals(result.resolution.researchContextHash, result.researchContextHash)) throw new Error('Interior runner lineage hashes are inconsistent.');
  const expected = hashCausalPayload('WorldWright/interior-shadow-runner/v1', {
    schemaVersion: result.schemaVersion,
    runnerVersion: result.runnerVersion,
    authorityMode: result.authorityMode,
    inputSnapshotHash: result.inputSnapshotHash,
    premiseHash: result.premiseHash,
    researchContextHash: result.researchContextHash,
    resolution: result.resolution,
    stageResult: result.stageResult,
  });
  if (!deterministicHashEquals(result.contentHash, expected)) throw new Error('Interior shadow runner hash mismatch.');
}

function validateInteriorReview(review: InteriorResearchReviewV1, bundle: ScientificResearchBundleV1): void {
  assertExactKeys(review, REVIEW_KEYS, 'Interior research review');
  if (review.schemaVersion !== 1 || review.status !== 'INTERIOR_RESEARCH_PACKAGE_REVIEWED' || review.bundleVersion !== bundle.bundleVersion) throw new Error('Interior research review is invalid.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(review.reviewDate) || !isText(review.reviewer) || !isText(review.scope)) throw new Error('Interior research review metadata is invalid.');
  if (!review.implementationAuthorized) throw new Error('Interior resolver implementation is not authorized.');
  if (!review.implementationAuthorizationDate || !/^\d{4}-\d{2}-\d{2}$/.test(review.implementationAuthorizationDate) || !isText(review.implementationAuthorizationBasis)) throw new Error('Interior implementation authorization metadata is invalid.');
  const complete = canonicalText(review.completeEligibleRuleIds, 'Interior COMPLETE-eligible rules');
  const partial = canonicalText(review.partialOnlyRuleIds, 'Interior PARTIAL-only rules');
  const all = bundle.claimRules.map((rule) => rule.ruleId).sort(compareStableText);
  if (!arraysEqual([...complete, ...partial].sort(compareStableText), all) || new Set([...complete, ...partial]).size !== all.length) throw new Error('Interior review does not classify every claim rule exactly once.');
  const byId = new Map(bundle.claimRules.map((rule) => [rule.ruleId, rule]));
  for (const ruleId of complete) if (byId.get(ruleId)?.evidenceStatus !== 'REVIEWED') throw new Error(`Interior COMPLETE-eligible rule ${ruleId} is not reviewed.`);
  for (const ruleId of partial) if (byId.get(ruleId)?.evidenceStatus === 'REVIEWED') throw new Error(`Interior PARTIAL-only rule ${ruleId} is incorrectly reviewed.`);
  if (!partial.includes('interior/normalized-range-calibration-provisional-v1')) throw new Error('Interior provisional calibration rule must remain PARTIAL-only.');
}

function requiredQuantities(input: CausalGeologyInputV1): Readonly<Record<(typeof REQUIRED_INPUT_IDS)[number], number>> {
  const values = {} as Record<(typeof REQUIRED_INPUT_IDS)[number], number>;
  for (const inputId of REQUIRED_INPUT_IDS) {
    const quantity = input.physicalInputs[inputId];
    if (!quantity) throw new Error(`Interior resolution requires sanitized input ${inputId}.`);
    values[inputId] = quantity.value;
  }
  return values;
}

function resolveRheologyCandidates(premise: PlanetaryPremiseV1, melt: number, tidal: number): readonly InteriorRheologyCandidateV1[] {
  const values = new Set<InteriorRheologyCandidateV1>();
  if (isIcePremise(premise)) values.add('ICE_SHELL_TEMPERATURE_DEPENDENT');
  else values.add('TEMPERATURE_DEPENDENT_SOLID_STATE');
  if (premise.bodyClassCandidates.includes('ROCK_ICE_MIXED_SOLID_BODY')) values.add('MIXED_ROCK_ICE_RHEOLOGY');
  if (premise.bodyClassCandidates.includes('VOLATILE_PRESSURE_SOLID_BODY')) values.add('VOLATILE_MODIFIED_RHEOLOGY');
  if (melt >= 0.5 && !isIcePremise(premise)) values.add('PARTIALLY_MOLTEN_ROCKY');
  if (tidal >= 0.25) values.add('VISCOELASTIC_TIDAL');
  return canonicalVocabulary(values, INTERIOR_RHEOLOGY_CANDIDATES, 'Interior rheology candidates');
}

function resolveLithosphereCandidates(
  premise: PlanetaryPremiseV1,
  convection: number,
  melt: number,
  tidal: number,
): readonly InteriorLithosphereBehaviorCandidateV1[] {
  const values = new Set<InteriorLithosphereBehaviorCandidateV1>();
  if (isIcePremise(premise)) {
    values.add('RIGID_ICE_SHELL');
    if (tidal >= 0.25) values.add('TIDALLY_FRACTURED_SHELL');
    if (convection >= 0.35) values.add('DEFORMABLE_OR_YIELDING_LID');
  } else {
    values.add('RIGID_SINGLE_LID');
    if (convection >= 0.25) values.add('DEFORMABLE_OR_YIELDING_LID');
    if (melt >= 0.45) values.add('MAGMATICALLY_WEAKENED_LID');
  }
  return canonicalVocabulary(values, INTERIOR_LITHOSPHERE_BEHAVIOR_CANDIDATES, 'Interior lithosphere candidates');
}

function resolveLidCandidates(
  premise: PlanetaryPremiseV1,
  thermal: number,
  convection: number,
  melt: number,
  tidal: number,
  water: number,
): readonly InteriorLidRegimeCandidateV1[] {
  const values = new Set<InteriorLidRegimeCandidateV1>();
  if (isIcePremise(premise)) {
    values.add('ICE_SHELL_STAGNANT_LID');
    if (convection >= 0.2 || tidal >= 0.25) values.add('ICE_SHELL_EPISODIC_LID');
  } else {
    values.add('STAGNANT_LID');
    if (thermal >= 0.22) values.add('EPISODIC_LID');
    if (convection >= 0.25) values.add('SLUGGISH_LID');
    if (melt >= 0.45) values.add('PLUTONIC_SQUISHY_LID');
    if (tidal >= 0.45 || melt >= 0.55) values.add('EPISODIC_SQUISHY_LID');
    if (water >= 0.125 && convection >= 0.45) values.add('MOBILE_LID_HYPOTHESIS');
  }
  return canonicalVocabulary(values, INTERIOR_LID_REGIME_CANDIDATES, 'Interior lid candidates');
}

function resolveEvidenceIds(premise: PlanetaryPremiseV1, radiogenic: number, tidal: number, thermal: number): readonly string[] {
  const ids = new Set<string>([
    'interior/declared-heat-sources-only-v1',
    'interior/lid-regime-nonuniqueness-v1',
    'interior/mixed-heating-convection-v1',
    'interior/no-downstream-geology-v1',
    'interior/normalized-range-calibration-provisional-v1',
  ]);
  if (radiogenic > 0) ids.add('interior/radiogenic-long-term-driver-v1');
  if (tidal > 0) ids.add('interior/tidal-viscoelastic-coupling-v1');
  if (thermal > 0.1) ids.add('interior/magmatism-thermal-coupling-v1');
  if (isIcePremise(premise)) ids.add('interior/ice-shell-convection-alternatives-v1');
  return canonicalText([...ids], 'Interior evidence IDs');
}

function createHeatSourceFractions(primordial: number, radiogenic: number, tidal: number): readonly InteriorHeatSourceFractionV1[] {
  const total = primordial + radiogenic + tidal;
  const denominator = total > 0 ? total : 1;
  const values: readonly [InteriorHeatSourceFractionV1['sourceId'], number, string][] = [
    ['PRIMORDIAL', primordial / denominator, 'interior.heat-fraction.primordial'],
    ['RADIOGENIC', radiogenic / denominator, 'interior.heat-fraction.radiogenic'],
    ['TIDAL', tidal / denominator, 'interior.heat-fraction.tidal'],
  ];
  return cloneAndDeepFreeze(values.map(([sourceId, center, subject]) => ({
    sourceId,
    fractionRange: normalizedRange(center, 0.1, subject),
  })));
}

function normalizedRange(center: number, uncertainty: number, subject: string) {
  return createScientificRange(clamp(center - uncertainty, 0, 1), clamp(center + uncertainty, 0, 1), 'normalized-0-1', 'normalized-0-1-v1', subject);
}

function bodyConvectionAdjustment(premise: PlanetaryPremiseV1): number {
  if (premise.bodyClassCandidates.includes('ROCKY_DWARF_OR_SMALL_BODY')) return -0.08;
  if (premise.bodyClassCandidates.includes('ROCKY_SUPER_EARTH')) return 0.08;
  if (premise.bodyClassCandidates.includes('ICE_SHELL_OCEAN_BODY')) return 0.05;
  if (premise.bodyClassCandidates.includes('ROCK_ICE_MIXED_SOLID_BODY')) return 0.02;
  return 0;
}

function bodyMeltAdjustment(premise: PlanetaryPremiseV1): number {
  if (premise.bodyClassCandidates.includes('ROCKY_DWARF_OR_SMALL_BODY')) return -0.08;
  return 0;
}

function isIcePremise(premise: PlanetaryPremiseV1): boolean {
  return premise.bodyClassCandidates.includes('ICE_SHELL_OCEAN_BODY');
}

function lidWeight(
  candidate: string,
  thermal: number,
  convection: number,
  melt: number,
  tidal: number,
  water: number,
): number {
  if (candidate === 'STAGNANT_LID') return Math.max(0.1, 1 - thermal * 0.8 - convection * 0.3);
  if (candidate === 'SLUGGISH_LID') return 0.2 + convection * 0.8;
  if (candidate === 'EPISODIC_LID') return 0.2 + thermal * 0.5 + tidal * 0.3;
  if (candidate === 'MOBILE_LID_HYPOTHESIS') return 0.1 + convection * 0.5 + water * 0.3;
  if (candidate === 'PLUTONIC_SQUISHY_LID') return 0.1 + melt * 0.9;
  if (candidate === 'EPISODIC_SQUISHY_LID') return 0.1 + melt * 0.5 + tidal * 0.6;
  if (candidate === 'ICE_SHELL_STAGNANT_LID') return 0.6 + (1 - convection) * 0.4;
  if (candidate === 'ICE_SHELL_EPISODIC_LID') return 0.2 + convection * 0.5 + tidal * 0.5;
  throw new Error(`Unsupported interior lid candidate ${candidate}.`);
}

function finalizeResolution(input: {
  readonly status: InteriorResolutionV1['status'];
  readonly inputSnapshot: CausalGeologyInputV1;
  readonly premise: PlanetaryPremiseV1;
  readonly context: InteriorResearchContextV1;
  readonly interior?: InteriorStateV1;
  readonly branchResolutions: readonly WeightedBranchResolutionV1<string>[];
  readonly blockingReasons: readonly string[];
  readonly missingDomains: readonly string[];
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
}): InteriorResolutionV1 {
  const payloadWithoutMetrics = {
    schemaVersion: 1 as const,
    resolverVersion: 1 as const,
    status: input.status,
    inputSnapshotHash: input.inputSnapshot.contentHash,
    premiseHash: input.premise.contentHash,
    researchContextHash: input.context.contentHash,
    ...(input.interior ? { interior: input.interior } : {}),
    branchResolutions: [...input.branchResolutions],
    blockingReasons: canonicalText(input.blockingReasons, 'Interior blocking reasons'),
    missingDomains: canonicalText(input.missingDomains, 'Interior missing domains'),
    evidenceIds: canonicalText(input.evidenceIds, 'Interior evidence IDs'),
    contradictionIds: canonicalText(input.contradictionIds, 'Interior contradiction IDs'),
  };
  const metricsWithoutSize = {
    schemaVersion: 1 as const,
    ruleEvaluations: payloadWithoutMetrics.evidenceIds.length,
    rheologyCandidateCount: input.interior?.rheologyCandidates.length ?? 0,
    lithosphereCandidateCount: input.interior?.lithosphereBehaviorCandidates.length ?? 0,
    lidCandidateCount: input.interior?.lidRegimeCandidates.length ?? 0,
    branchResolutionCount: input.branchResolutions.length,
  };
  const metrics: InteriorResolutionMetricsV1 = {
    ...metricsWithoutSize,
    serializedResultBytes: measureResolutionBytes(payloadWithoutMetrics, { ...metricsWithoutSize, serializedResultBytes: 0 }),
  };
  const payload = { ...payloadWithoutMetrics, metrics };
  const resolution = cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/interior-resolution/v1', payload),
  });
  validateInteriorResolution(resolution);
  return resolution;
}

function validateInteriorMetrics(value: InteriorResolutionMetricsV1): void {
  assertExactKeys(value, METRICS_KEYS, 'Interior metrics');
  if (value.schemaVersion !== 1) throw new Error('Unsupported interior metrics.');
  for (const [label, count] of [
    ['rule evaluations', value.ruleEvaluations],
    ['rheology candidates', value.rheologyCandidateCount],
    ['lithosphere candidates', value.lithosphereCandidateCount],
    ['lid candidates', value.lidCandidateCount],
    ['branch resolutions', value.branchResolutionCount],
    ['serialized bytes', value.serializedResultBytes],
  ] as const) if (!Number.isSafeInteger(count) || count < 0) throw new Error(`Interior ${label} metric is invalid.`);
  if (value.rheologyCandidateCount > INTERIOR_RESOLVER_PERFORMANCE_BUDGET_V1.maxRheologyCandidates
    || value.lithosphereCandidateCount > INTERIOR_RESOLVER_PERFORMANCE_BUDGET_V1.maxLithosphereCandidates
    || value.lidCandidateCount > INTERIOR_RESOLVER_PERFORMANCE_BUDGET_V1.maxLidCandidates
    || value.branchResolutionCount > INTERIOR_RESOLVER_PERFORMANCE_BUDGET_V1.maxBranchResolutions) throw new Error('Interior metrics exceed frozen candidate or branch budgets.');
}

function measureResolutionBytes(
  payload: Omit<InteriorResolutionV1, 'metrics' | 'contentHash'>,
  metrics: InteriorResolutionMetricsV1,
): number {
  return new TextEncoder().encode(canonicalJsonStringify({ ...payload, metrics: { ...metrics, serializedResultBytes: 0 } })).byteLength;
}

function canonicalVocabulary<T extends string>(values: ReadonlySet<T>, vocabulary: readonly T[], label: string): readonly T[] {
  const output = [...values].sort(compareStableText);
  if (output.length === 0 || output.some((value) => !vocabulary.includes(value))) throw new Error(`${label} are invalid.`);
  return Object.freeze(output);
}

function canonicalText<T extends string>(values: readonly T[], label: string): readonly T[] {
  if (!Array.isArray(values) || !values.every(isText)) throw new Error(`${label} are invalid.`);
  if (new Set(values).size !== values.length) throw new Error(`${label} contain duplicates.`);
  return Object.freeze([...values].sort(compareStableText));
}

function assertExactKeys(value: unknown, allowed: readonly string[], label: string): void {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
  const unknown = Object.keys(value).filter((key) => !allowed.includes(key)).sort(compareStableText);
  if (unknown.length) throw new Error(`${label} contains unowned fields: ${unknown.join(', ')}`);
}

function arraysEqual<T>(a: readonly T[], b: readonly T[]): boolean {
  return a.length === b.length && a.every((entry, index) => entry === b[index]);
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
