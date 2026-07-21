import type { GeneratorAuthorityMode } from '../causalWorld/schema';
import { resolveWeightedBranch } from '../worldConfidence/branchResolver';
import type { WeightedBranchResolutionV1 } from '../worldConfidence/types';
import { worldFeatureFlagValue } from '../worldFeatureFlags/resolve';
import type { ResolvedWorldFeatureFlagSnapshot } from '../worldFeatureFlags/types';
import { canonicalJsonStringify } from '../worldProvenance/canonicalJson';
import type { DeterministicHash } from '../worldProvenance/hash';
import { createWorldRandomOracle, type CreateWorldRandomOracleOptions } from '../worldRandom/oracle';
import type { WorldRandomOracle } from '../worldRandom/types';
import { cloneAndDeepFreeze } from './immutable';
import { assertDeterministicHash, deterministicHashEquals, hashCausalPayload } from './hashes';
import { validateCausalGeologyInput } from './inputAuthority';
import {
  REGIME_HISTORY_FAMILIES,
  REGIME_HISTORY_TEMPLATE_IDS,
  REGIME_HISTORY_TRANSITION_FAMILIES,
  validateRegimeHistoryFixtureSet,
  type RegimeHistoryFamilyV1,
  type RegimeHistoryFixtureSetV1,
  type RegimeHistoryResearchReviewV1,
  type RegimeHistoryTemplateIdV1,
  type RegimeHistoryTransitionFamilyV1,
} from './regimeHistoryResearchContracts';
import { createScientificQuantity, createScientificRange } from './quantities';
import { validateScientificResearchBundle } from './researchLedger';
import { canProceedFromStage, createCausalStageResult } from './stageResult';
import {
  validateCausalStageResult,
  validateInteriorState,
  validatePlanetaryPremise,
  validateTectonicRegimeHistory,
} from './validation';
import type {
  CausalGeologyInputV1,
  CausalStageResultV1,
  InteriorStateV1,
  PlanetaryPremiseV1,
  ScientificRangeV1,
  ScientificResearchBundleV1,
  TectonicEpochV1,
  TectonicRegimeHistoryV1,
  TectonicTransitionV1,
} from './types';

export const REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1 = Object.freeze({
  maxResearchSources: 16,
  maxClaimRules: 32,
  maxFixtures: 32,
  maxTemplateCandidates: REGIME_HISTORY_TEMPLATE_IDS.length,
  maxEpochs: 8,
  maxTransitions: 7,
  maxBranchResolutions: 1,
  maxSerializedResultBytes: 256 * 1024,
  maxAverageResolutionMilliseconds: 1_000,
  maxHeapDeltaBytes: 128 * 1024 * 1024,
});

export interface RegimeHistoryResearchContextV1 {
  readonly schemaVersion: 1;
  readonly contextVersion: 1;
  readonly researchBundle: ScientificResearchBundleV1;
  readonly fixtureSet: RegimeHistoryFixtureSetV1;
  readonly review: RegimeHistoryResearchReviewV1;
  readonly contentHash: DeterministicHash;
}

export interface RegimeHistoryResolutionMetricsV1 {
  readonly schemaVersion: 1;
  readonly ruleEvaluations: number;
  readonly templateCandidateCount: number;
  readonly epochCount: number;
  readonly transitionCount: number;
  readonly branchResolutionCount: number;
  readonly serializedResultBytes: number;
}

export interface RegimeHistoryResolutionV1 {
  readonly schemaVersion: 1;
  readonly resolverVersion: 1;
  readonly status: 'PARTIAL' | 'BLOCKED';
  readonly inputSnapshotHash: DeterministicHash;
  readonly premiseHash: DeterministicHash;
  readonly interiorHash: DeterministicHash;
  readonly researchContextHash: DeterministicHash;
  readonly history?: TectonicRegimeHistoryV1;
  readonly templateCandidates: readonly RegimeHistoryTemplateIdV1[];
  readonly selectedTemplateId?: RegimeHistoryTemplateIdV1;
  readonly branchResolutions: readonly WeightedBranchResolutionV1<string>[];
  readonly blockingReasons: readonly string[];
  readonly missingDomains: readonly string[];
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly metrics: RegimeHistoryResolutionMetricsV1;
  readonly contentHash: DeterministicHash;
}

export interface RunRegimeHistoryShadowOptionsV1 {
  readonly authorityMode: GeneratorAuthorityMode;
  readonly featureFlags: ResolvedWorldFeatureFlagSnapshot;
  readonly inputSnapshot: CausalGeologyInputV1;
  readonly premise: PlanetaryPremiseV1;
  readonly interior: InteriorStateV1;
  readonly interiorStageResult: CausalStageResultV1<InteriorStateV1>;
  readonly researchContext: RegimeHistoryResearchContextV1;
}

export interface RegimeHistoryShadowRunnerResultV1 {
  readonly schemaVersion: 1;
  readonly runnerVersion: 1;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly inputSnapshotHash: DeterministicHash;
  readonly premiseHash: DeterministicHash;
  readonly interiorHash: DeterministicHash;
  readonly researchContextHash: DeterministicHash;
  readonly resolution: RegimeHistoryResolutionV1;
  readonly stageResult: CausalStageResultV1<TectonicRegimeHistoryV1>;
  readonly contentHash: DeterministicHash;
}

interface HistoryTemplateV1 {
  readonly id: RegimeHistoryTemplateIdV1;
  readonly regimes: readonly RegimeHistoryFamilyV1[];
  readonly transitions: readonly RegimeHistoryTransitionFamilyV1[];
  readonly evidenceIds: readonly string[];
}

interface InteriorSummaryV1 {
  readonly thermal: number;
  readonly convection: number;
  readonly melt: number;
  readonly rift: number;
  readonly hotspot: number;
  readonly primordialFraction: number;
  readonly radiogenicFraction: number;
  readonly tidalFraction: number;
}

const RESEARCH_CONTEXT_KEYS = ['schemaVersion', 'contextVersion', 'researchBundle', 'fixtureSet', 'review', 'contentHash'] as const;
const REVIEW_KEYS = ['schemaVersion', 'bundleVersion', 'status', 'reviewDate', 'reviewer', 'scope', 'completeEligibleRuleIds', 'partialOnlyRuleIds', 'implementationAuthorized', 'implementationAuthorizationDate', 'implementationAuthorizationBasis'] as const;
const RESOLUTION_KEYS = ['schemaVersion', 'resolverVersion', 'status', 'inputSnapshotHash', 'premiseHash', 'interiorHash', 'researchContextHash', 'history', 'templateCandidates', 'selectedTemplateId', 'branchResolutions', 'blockingReasons', 'missingDomains', 'evidenceIds', 'contradictionIds', 'metrics', 'contentHash'] as const;
const METRICS_KEYS = ['schemaVersion', 'ruleEvaluations', 'templateCandidateCount', 'epochCount', 'transitionCount', 'branchResolutionCount', 'serializedResultBytes'] as const;
const RUNNER_KEYS = ['schemaVersion', 'runnerVersion', 'authorityMode', 'inputSnapshotHash', 'premiseHash', 'interiorHash', 'researchContextHash', 'resolution', 'stageResult', 'contentHash'] as const;

const TEMPLATES: Readonly<Record<RegimeHistoryTemplateIdV1, HistoryTemplateV1>> = cloneAndDeepFreeze({
  ICE_SHELL_EPISODIC_CYCLE: {
    id: 'ICE_SHELL_EPISODIC_CYCLE',
    regimes: ['ICE_SHELL_STAGNANT_LID', 'ICE_SHELL_EPISODIC_LID', 'ICE_SHELL_STAGNANT_LID'],
    transitions: ['TIDAL_THERMAL_DESTABILIZATION', 'SHELL_THERMAL_RELAXATION'],
    evidenceIds: ['history/ice-shell-episodic-evolution-v1', 'history/transition-trigger-families-only-v1'],
  },
  ICE_SHELL_STAGNANT_ONLY: {
    id: 'ICE_SHELL_STAGNANT_ONLY',
    regimes: ['ICE_SHELL_STAGNANT_LID'],
    transitions: [],
    evidenceIds: ['history/ice-shell-episodic-evolution-v1'],
  },
  MIXED_SOLID_EPISODIC: {
    id: 'MIXED_SOLID_EPISODIC',
    regimes: ['STAGNANT_LID', 'EPISODIC_LID', 'SLUGGISH_LID'],
    transitions: ['RHEOLOGIC_HYSTERESIS', 'SECULAR_COOLING'],
    evidenceIds: ['history/lid-regime-family-alternatives-v1', 'history/path-dependence-and-hysteresis-v1', 'history/secular-cooling-regime-window-v1'],
  },
  ROCKY_HOT_EPISODIC_MOBILE: {
    id: 'ROCKY_HOT_EPISODIC_MOBILE',
    regimes: ['HOT_STAGNANT_LID', 'EPISODIC_LID', 'MOBILE_LID_HYPOTHESIS'],
    transitions: ['LITHOSPHERE_DAMAGE_ACCUMULATION', 'SECULAR_COOLING_AND_WEAK_ZONE_MEMORY'],
    evidenceIds: ['history/damage-assisted-mobile-lid-initiation-v1', 'history/lid-regime-family-alternatives-v1', 'history/secular-cooling-regime-window-v1'],
  },
  ROCKY_HOT_EPISODIC_SLUGGISH: {
    id: 'ROCKY_HOT_EPISODIC_SLUGGISH',
    regimes: ['HOT_STAGNANT_LID', 'EPISODIC_LID', 'SLUGGISH_LID'],
    transitions: ['LITHOSPHERE_DAMAGE_ACCUMULATION', 'SECULAR_COOLING'],
    evidenceIds: ['history/damage-assisted-mobile-lid-initiation-v1', 'history/lid-regime-family-alternatives-v1', 'history/secular-cooling-regime-window-v1'],
  },
  ROCKY_MAGMATIC_SQUISHY: {
    id: 'ROCKY_MAGMATIC_SQUISHY',
    regimes: ['HEAT_PIPE_LID', 'PLUTONIC_SQUISHY_LID', 'EPISODIC_SQUISHY_LID'],
    transitions: ['VOLCANIC_HEAT_TRANSPORT_DECLINE', 'MAGMATIC_RHEOLOGY_REORGANIZATION'],
    evidenceIds: ['history/lid-regime-family-alternatives-v1', 'history/thermal-and-magmatic-transition-v1'],
  },
  ROCKY_SINGLE_STAGNANT: {
    id: 'ROCKY_SINGLE_STAGNANT',
    regimes: ['STAGNANT_LID'],
    transitions: [],
    evidenceIds: ['history/lid-regime-family-alternatives-v1', 'history/path-dependence-and-hysteresis-v1'],
  },
  ROCKY_TIDAL_EPISODIC: {
    id: 'ROCKY_TIDAL_EPISODIC',
    regimes: ['STAGNANT_LID', 'EPISODIC_SQUISHY_LID', 'PLUTONIC_SQUISHY_LID', 'EPISODIC_LID'],
    transitions: ['TIDAL_FORCING_VARIATION', 'MAGMATIC_RHEOLOGY_REORGANIZATION', 'RHEOLOGIC_HYSTERESIS'],
    evidenceIds: ['history/lid-regime-family-alternatives-v1', 'history/path-dependence-and-hysteresis-v1', 'history/thermal-and-magmatic-transition-v1'],
  },
  VOLATILE_SOLID_EPISODIC: {
    id: 'VOLATILE_SOLID_EPISODIC',
    regimes: ['HOT_STAGNANT_LID', 'EPISODIC_LID', 'SLUGGISH_LID'],
    transitions: ['LITHOSPHERE_DAMAGE_ACCUMULATION', 'SECULAR_COOLING'],
    evidenceIds: ['history/lid-regime-family-alternatives-v1', 'history/secular-cooling-regime-window-v1'],
  },
});

export function createRegimeHistoryResearchContext(input: {
  readonly researchBundle: ScientificResearchBundleV1;
  readonly fixtureSet: RegimeHistoryFixtureSetV1;
  readonly review: RegimeHistoryResearchReviewV1;
}): RegimeHistoryResearchContextV1 {
  validateScientificResearchBundle(input.researchBundle);
  validateRegimeHistoryFixtureSet(input.fixtureSet);
  validateRegimeHistoryReview(input.review, input.researchBundle);
  if (input.researchBundle.sources.length > REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1.maxResearchSources) throw new Error('Regime-history research source count exceeds the frozen budget.');
  if (input.researchBundle.claimRules.length > REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1.maxClaimRules) throw new Error('Regime-history claim-rule count exceeds the frozen budget.');
  if (input.fixtureSet.fixtures.length > REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1.maxFixtures) throw new Error('Regime-history fixture count exceeds the frozen budget.');
  const payload = {
    schemaVersion: 1 as const,
    contextVersion: 1 as const,
    researchBundle: input.researchBundle,
    fixtureSet: input.fixtureSet,
    review: input.review,
  };
  return cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/regime-history-research-context/v1', payload),
  });
}

export function resolveTectonicRegimeHistory(
  inputSnapshot: CausalGeologyInputV1,
  premise: PlanetaryPremiseV1,
  interior: InteriorStateV1,
  context: RegimeHistoryResearchContextV1,
): RegimeHistoryResolutionV1 {
  validateCausalGeologyInput(inputSnapshot);
  validatePlanetaryPremise(premise);
  validateInteriorState(interior);
  validateRegimeHistoryResearchContext(context);
  if (!deterministicHashEquals(premise.inputSnapshotHash, inputSnapshot.contentHash)) throw new Error('Regime history premise is not bound to the supplied sanitized input snapshot.');

  if (premise.bodyClassCandidates.includes('ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL')) {
    return finalizeResolution({
      status: 'BLOCKED',
      inputSnapshot,
      premise,
      interior,
      context,
      templateCandidates: [],
      branchResolutions: [],
      blockingReasons: ['ARTIFICIAL_REGIME_HISTORY_MODEL_NOT_IMPLEMENTED'],
      missingDomains: [],
      evidenceIds: ['history/no-spatial-geology-v1'],
      contradictionIds: uniqueText([...inputSnapshot.contradictionIds, ...premise.contradictionIds, ...interior.contradictionIds]),
    });
  }

  const ageQuantity = inputSnapshot.physicalInputs['thermal.age'];
  const waterQuantity = inputSnapshot.physicalInputs['inventory.water'];
  if (!ageQuantity || ageQuantity.unit !== 'gigaannum' || ageQuantity.scaleId !== 'gigaannum-v1' || ageQuantity.value <= 0) {
    throw new Error('Regime history requires a positive sanitized thermal.age in gigaannum-v1.');
  }
  if (!waterQuantity) throw new Error('Regime history requires sanitized inventory.water.');

  const summary = summarizeInterior(interior);
  const templateWeights = resolveTemplateWeights(premise, interior, summary, waterQuantity.value);
  const templateCandidates = templateWeights.map((entry) => entry.id).sort(compareStableText);
  const evidenceIds = uniqueText([
    'history/no-spatial-geology-v1',
    'history/normalized-epoch-calibration-provisional-v1',
    'history/path-dependence-and-hysteresis-v1',
    'history/transition-trigger-families-only-v1',
    ...templateWeights.flatMap((entry) => TEMPLATES[entry.id].evidenceIds),
  ]);
  const oracleOptions: CreateWorldRandomOracleOptions = { authorityMode: 'CAUSAL_SHADOW' };
  const oracle = createWorldRandomOracle(inputSnapshot.rootSeed, oracleOptions);
  const branch = resolveWeightedBranch<string>({
    branchId: 'regime-history/template/v1',
    stream: 'causal.regime-history',
    scope: [inputSnapshot.contentHash.value, premise.contentHash.value, interior.contentHash.value, context.contentHash.value],
    options: templateWeights.map((entry) => ({
      id: entry.id,
      value: entry.id,
      weight: entry.weight,
      evidenceIds: TEMPLATES[entry.id].evidenceIds,
      rationale: 'Replayable W1-04 working history selected from reviewed path-dependent alternatives; not a unique reconstruction.',
    })),
    oracle,
  });
  const selectedTemplateId = branch.chosenValue as RegimeHistoryTemplateIdV1;
  const template = TEMPLATES[selectedTemplateId];
  const boundaries = createEpochBoundaries(template.regimes.length, oracle, [
    inputSnapshot.contentHash.value,
    premise.contentHash.value,
    interior.contentHash.value,
    context.contentHash.value,
    selectedTemplateId,
  ]);
  const epochs = template.regimes.map((regime, index) => createEpoch({
    regime,
    index,
    startTime: boundaries[index],
    endTime: boundaries[index + 1],
    totalDuration: ageQuantity.value,
    summary,
    templateEvidenceIds: template.evidenceIds,
  }));
  const transitions = template.transitions.map((triggerFamily, index) => createTransition({
    triggerFamily,
    index,
    fromEpochId: epochs[index].epochId,
    toEpochId: epochs[index + 1].epochId,
    templateEvidenceIds: template.evidenceIds,
  }));

  const limitations = uniqueText([
    ...context.researchBundle.knownLimitations,
    ...(premise.status === 'PARTIAL' ? ['Upstream planetary premise remains PARTIAL.'] : []),
    ...(interior.status === 'PARTIAL' ? ['Upstream interior state remains PARTIAL.'] : []),
  ]);
  const missingDomains = uniqueText([
    'absolute-transition-ages',
    'climate-rheology-coupling',
    'lithosphere-damage-memory',
    'material-yield-strength-and-composition',
    'unique-history-selection',
    ...(isIcePremise(premise) ? ['orbital-forcing-and-ice-shell-evolution'] : []),
  ]);
  const contradictionIds = uniqueText([...inputSnapshot.contradictionIds, ...premise.contradictionIds, ...interior.contradictionIds]);
  const historyPayload = {
    schemaVersion: 1 as const,
    status: 'PARTIAL' as const,
    historyVersion: 1,
    timeConvention: 'FRACTION_OF_RESOLVED_GEOLOGIC_HISTORY_V1' as const,
    totalResolvedDuration: createScientificQuantity(ageQuantity.value, 'gigaannum', 'gigaannum-v1', 'history/declared-age-v1'),
    epochs,
    transitions,
    branchResolutionIds: [branch.branchId],
    evidenceIds,
    contradictionIds,
    limitations,
  };
  const history = cloneAndDeepFreeze({
    ...historyPayload,
    contentHash: hashCausalPayload('WorldWright/tectonic-regime-history/v1', historyPayload),
  });
  validateTectonicRegimeHistory(history);

  return finalizeResolution({
    status: 'PARTIAL',
    inputSnapshot,
    premise,
    interior,
    context,
    history,
    templateCandidates,
    selectedTemplateId,
    branchResolutions: [branch],
    blockingReasons: [],
    missingDomains,
    evidenceIds,
    contradictionIds,
  });
}

export function runRegimeHistoryShadow(options: RunRegimeHistoryShadowOptionsV1): RegimeHistoryShadowRunnerResultV1 {
  if (options.authorityMode !== 'CAUSAL_SHADOW') throw new Error('Regime-history resolution is allowed only in CAUSAL_SHADOW mode.');
  if (options.featureFlags.authorityMode !== 'CAUSAL_SHADOW') throw new Error('Regime-history feature flags must be resolved for CAUSAL_SHADOW mode.');
  if (!worldFeatureFlagValue<boolean>(options.featureFlags, 'causal.shadow.enabled')) throw new Error('Regime-history resolution requires causal.shadow.enabled.');
  if (worldFeatureFlagValue<boolean>(options.featureFlags, 'causal.active.enabled')) throw new Error('Regime-history resolution cannot run with causal.active.enabled.');
  validateCausalGeologyInput(options.inputSnapshot);
  validatePlanetaryPremise(options.premise);
  validateInteriorState(options.interior);
  validateCausalStageResult(options.interiorStageResult);
  validateRegimeHistoryResearchContext(options.researchContext);
  if (options.interiorStageResult.stageId !== 'CAUSAL_INTERIOR_RESOLUTION') throw new Error('Regime-history resolution requires an interior-stage result.');
  if (!canProceedFromStage(options.interiorStageResult, 'CAUSAL_REGIME_HISTORY')) throw new Error('Interior stage does not permit regime-history resolution.');
  if (canonicalJsonStringify(options.interiorStageResult.record) !== canonicalJsonStringify(options.interior)) throw new Error('Interior stage record does not match the supplied interior state.');
  const expectedInteriorInputHash = hashCausalPayload('WorldWright/CAUSAL_INTERIOR_RESOLUTION/input/v1', {
    inputSnapshot: options.inputSnapshot,
    premise: options.premise,
  });
  if (!deterministicHashEquals(options.interiorStageResult.inputHash, expectedInteriorInputHash)) throw new Error('Interior stage is not bound to the supplied input and premise.');

  const resolution = resolveTectonicRegimeHistory(options.inputSnapshot, options.premise, options.interior, options.researchContext);
  const stageInput = { inputSnapshot: options.inputSnapshot, premise: options.premise, interior: options.interior };
  const stageResult = resolution.status === 'BLOCKED'
    ? createCausalStageResult<TectonicRegimeHistoryV1>({
      stageId: 'CAUSAL_REGIME_HISTORY',
      stageVersion: 1,
      status: 'BLOCKED',
      input: stageInput,
      blockingReasons: resolution.blockingReasons,
      evidenceIds: resolution.evidenceIds,
      contradictionIds: resolution.contradictionIds,
    })
    : createCausalStageResult<TectonicRegimeHistoryV1>({
      stageId: 'CAUSAL_REGIME_HISTORY',
      stageVersion: 1,
      status: 'PARTIAL',
      input: stageInput,
      record: resolution.history as TectonicRegimeHistoryV1,
      limitations: resolution.history?.limitations,
      missingDomains: resolution.missingDomains,
      downstreamCompatibleStageIds: ['CAUSAL_GEOLOGIC_SPINE'],
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
    researchContextHash: options.researchContext.contentHash,
    resolution,
    stageResult,
  };
  const result = cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/regime-history-shadow-runner/v1', payload),
  });
  validateRegimeHistoryShadowRunnerResult(result);
  return result;
}

export function validateRegimeHistoryResearchContext(value: unknown): asserts value is RegimeHistoryResearchContextV1 {
  assertExactKeys(value, RESEARCH_CONTEXT_KEYS, 'Regime-history research context');
  const context = value as RegimeHistoryResearchContextV1;
  if (context.schemaVersion !== 1 || context.contextVersion !== 1) throw new Error('Unsupported regime-history research context.');
  validateScientificResearchBundle(context.researchBundle);
  validateRegimeHistoryFixtureSet(context.fixtureSet);
  validateRegimeHistoryReview(context.review, context.researchBundle);
  const expected = hashCausalPayload('WorldWright/regime-history-research-context/v1', {
    schemaVersion: context.schemaVersion,
    contextVersion: context.contextVersion,
    researchBundle: context.researchBundle,
    fixtureSet: context.fixtureSet,
    review: context.review,
  });
  if (!deterministicHashEquals(context.contentHash, expected)) throw new Error('Regime-history research context hash mismatch.');
}

export function validateRegimeHistoryResolution(value: unknown): asserts value is RegimeHistoryResolutionV1 {
  assertExactKeys(value, RESOLUTION_KEYS, 'Regime-history resolution');
  const resolution = value as RegimeHistoryResolutionV1;
  if (resolution.schemaVersion !== 1 || resolution.resolverVersion !== 1 || !['PARTIAL', 'BLOCKED'].includes(resolution.status)) throw new Error('Regime-history resolution identity is invalid.');
  assertDeterministicHash(resolution.inputSnapshotHash, 'Regime-history input');
  assertDeterministicHash(resolution.premiseHash, 'Regime-history premise');
  assertDeterministicHash(resolution.interiorHash, 'Regime-history interior');
  assertDeterministicHash(resolution.researchContextHash, 'Regime-history research context');
  assertDeterministicHash(resolution.contentHash, 'Regime-history resolution');
  if ((resolution.history !== undefined) !== (resolution.status === 'PARTIAL')) throw new Error('Regime-history resolution has invalid history presence.');
  if (resolution.history) validateTectonicRegimeHistory(resolution.history);
  const templates = canonicalVocabulary(resolution.templateCandidates, REGIME_HISTORY_TEMPLATE_IDS, 'Regime-history template candidates', resolution.status === 'PARTIAL' ? 1 : 0);
  if ((resolution.selectedTemplateId !== undefined) !== (resolution.status === 'PARTIAL')) throw new Error('Regime-history resolution has invalid selected template presence.');
  if (resolution.selectedTemplateId !== undefined && !templates.includes(resolution.selectedTemplateId)) throw new Error('Selected regime-history template is not a candidate.');
  canonicalText(resolution.blockingReasons, 'Regime-history blocking reasons');
  canonicalText(resolution.missingDomains, 'Regime-history missing domains');
  canonicalText(resolution.evidenceIds, 'Regime-history evidence IDs');
  canonicalText(resolution.contradictionIds, 'Regime-history contradiction IDs');
  if (resolution.status === 'BLOCKED' && resolution.blockingReasons.length === 0) throw new Error('Blocked regime-history resolution requires a reason.');
  if (resolution.status === 'PARTIAL' && (resolution.blockingReasons.length !== 0 || resolution.missingDomains.length === 0)) throw new Error('Partial regime-history resolution has invalid blockers or missing domains.');
  if (resolution.status === 'BLOCKED' && resolution.branchResolutions.length !== 0) throw new Error('Blocked regime-history resolution cannot retain branches.');
  if (resolution.status === 'PARTIAL' && resolution.branchResolutions.length !== 1) throw new Error('Partial regime-history resolution requires one deterministic template branch.');
  if (resolution.branchResolutions.length > REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1.maxBranchResolutions) throw new Error('Regime-history branch resolutions exceed the frozen budget.');
  validateRegimeHistoryMetrics(resolution.metrics);
  if (resolution.metrics.ruleEvaluations !== resolution.evidenceIds.length
    || resolution.metrics.templateCandidateCount !== resolution.templateCandidates.length
    || resolution.metrics.epochCount !== (resolution.history?.epochs.length ?? 0)
    || resolution.metrics.transitionCount !== (resolution.history?.transitions.length ?? 0)
    || resolution.metrics.branchResolutionCount !== resolution.branchResolutions.length) {
    throw new Error('Regime-history metrics do not match the resolution payload.');
  }
  if (resolution.history) {
    if (!arraysEqual(resolution.history.branchResolutionIds, resolution.branchResolutions.map((branch) => branch.branchId))) throw new Error('Regime-history branches do not match the history record.');
    if (!arraysEqual(resolution.history.evidenceIds, resolution.evidenceIds)) throw new Error('Regime-history evidence does not match the history record.');
    if (!arraysEqual(resolution.history.contradictionIds, resolution.contradictionIds)) throw new Error('Regime-history contradictions do not match the history record.');
    if (resolution.branchResolutions[0]?.chosenValue !== resolution.selectedTemplateId) throw new Error('Regime-history selected template does not match its deterministic branch.');
  }
  const payloadWithoutMetrics: Omit<RegimeHistoryResolutionV1, 'metrics' | 'contentHash'> = {
    schemaVersion: resolution.schemaVersion,
    resolverVersion: resolution.resolverVersion,
    status: resolution.status,
    inputSnapshotHash: resolution.inputSnapshotHash,
    premiseHash: resolution.premiseHash,
    interiorHash: resolution.interiorHash,
    researchContextHash: resolution.researchContextHash,
    ...(resolution.history ? { history: resolution.history } : {}),
    templateCandidates: resolution.templateCandidates,
    ...(resolution.selectedTemplateId ? { selectedTemplateId: resolution.selectedTemplateId } : {}),
    branchResolutions: resolution.branchResolutions,
    blockingReasons: resolution.blockingReasons,
    missingDomains: resolution.missingDomains,
    evidenceIds: resolution.evidenceIds,
    contradictionIds: resolution.contradictionIds,
  };
  const measuredBytes = measureResolutionBytes(payloadWithoutMetrics, resolution.metrics);
  if (measuredBytes !== resolution.metrics.serializedResultBytes) throw new Error('Regime-history serialized-size metric is inconsistent.');
  if (measuredBytes > REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1.maxSerializedResultBytes) throw new Error('Regime-history resolution exceeds the frozen artifact-size budget.');
  const expected = hashCausalPayload('WorldWright/regime-history-resolution/v1', { ...payloadWithoutMetrics, metrics: resolution.metrics });
  if (!deterministicHashEquals(resolution.contentHash, expected)) throw new Error('Regime-history resolution hash mismatch.');
}

export function validateRegimeHistoryShadowRunnerResult(value: unknown): asserts value is RegimeHistoryShadowRunnerResultV1 {
  assertExactKeys(value, RUNNER_KEYS, 'Regime-history shadow runner result');
  const result = value as RegimeHistoryShadowRunnerResultV1;
  if (result.schemaVersion !== 1 || result.runnerVersion !== 1 || result.authorityMode !== 'CAUSAL_SHADOW') throw new Error('Regime-history shadow runner identity is invalid.');
  assertDeterministicHash(result.inputSnapshotHash, 'Regime-history runner input');
  assertDeterministicHash(result.premiseHash, 'Regime-history runner premise');
  assertDeterministicHash(result.interiorHash, 'Regime-history runner interior');
  assertDeterministicHash(result.researchContextHash, 'Regime-history runner research context');
  assertDeterministicHash(result.contentHash, 'Regime-history shadow runner');
  validateRegimeHistoryResolution(result.resolution);
  validateCausalStageResult(result.stageResult);
  if (result.stageResult.stageId !== 'CAUSAL_REGIME_HISTORY' || result.stageResult.status !== result.resolution.status) throw new Error('Regime-history runner stage result is inconsistent.');
  if (!deterministicHashEquals(result.resolution.inputSnapshotHash, result.inputSnapshotHash)
    || !deterministicHashEquals(result.resolution.premiseHash, result.premiseHash)
    || !deterministicHashEquals(result.resolution.interiorHash, result.interiorHash)
    || !deterministicHashEquals(result.resolution.researchContextHash, result.researchContextHash)) {
    throw new Error('Regime-history runner lineage hashes are inconsistent.');
  }
  const expected = hashCausalPayload('WorldWright/regime-history-shadow-runner/v1', {
    schemaVersion: result.schemaVersion,
    runnerVersion: result.runnerVersion,
    authorityMode: result.authorityMode,
    inputSnapshotHash: result.inputSnapshotHash,
    premiseHash: result.premiseHash,
    interiorHash: result.interiorHash,
    researchContextHash: result.researchContextHash,
    resolution: result.resolution,
    stageResult: result.stageResult,
  });
  if (!deterministicHashEquals(result.contentHash, expected)) throw new Error('Regime-history shadow runner hash mismatch.');
}

function validateRegimeHistoryReview(review: RegimeHistoryResearchReviewV1, bundle: ScientificResearchBundleV1): void {
  assertExactKeys(review, REVIEW_KEYS, 'Regime-history research review');
  if (review.schemaVersion !== 1 || review.status !== 'REGIME_HISTORY_RESEARCH_PACKAGE_REVIEWED' || review.bundleVersion !== bundle.bundleVersion) throw new Error('Regime-history research review is invalid.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(review.reviewDate) || !isText(review.reviewer) || !isText(review.scope)) throw new Error('Regime-history research review metadata is invalid.');
  if (!review.implementationAuthorized) throw new Error('Regime-history resolver implementation is not authorized.');
  if (!review.implementationAuthorizationDate || !/^\d{4}-\d{2}-\d{2}$/.test(review.implementationAuthorizationDate) || !isText(review.implementationAuthorizationBasis)) throw new Error('Regime-history implementation authorization metadata is invalid.');
  const complete = canonicalText(review.completeEligibleRuleIds, 'Regime-history COMPLETE-eligible rules');
  const partial = canonicalText(review.partialOnlyRuleIds, 'Regime-history PARTIAL-only rules');
  const all = bundle.claimRules.map((rule) => rule.ruleId).sort(compareStableText);
  if (!arraysEqual([...complete, ...partial].sort(compareStableText), all) || new Set([...complete, ...partial]).size !== all.length) throw new Error('Regime-history review does not classify every claim rule exactly once.');
  const byId = new Map(bundle.claimRules.map((rule) => [rule.ruleId, rule]));
  for (const ruleId of complete) if (byId.get(ruleId)?.evidenceStatus !== 'REVIEWED') throw new Error(`Regime-history COMPLETE-eligible rule ${ruleId} is not reviewed.`);
  for (const ruleId of partial) if (byId.get(ruleId)?.evidenceStatus === 'REVIEWED') throw new Error(`Regime-history PARTIAL-only rule ${ruleId} is incorrectly reviewed.`);
  if (!partial.includes('history/normalized-epoch-calibration-provisional-v1')) throw new Error('Regime-history provisional calibration rule must remain PARTIAL-only.');
}

function resolveTemplateWeights(
  premise: PlanetaryPremiseV1,
  interior: InteriorStateV1,
  summary: InteriorSummaryV1,
  waterInventory: number,
): readonly { readonly id: RegimeHistoryTemplateIdV1; readonly weight: number }[] {
  const candidates: { id: RegimeHistoryTemplateIdV1; weight: number }[] = [];
  const has = (candidate: string) => interior.lidRegimeCandidates.includes(candidate);
  if (isIcePremise(premise)) {
    candidates.push({ id: 'ICE_SHELL_STAGNANT_ONLY', weight: Math.max(0.1, 1 - summary.convection * 0.6 - summary.tidalFraction * 0.4) });
    if (has('ICE_SHELL_EPISODIC_LID') || summary.convection >= 0.2 || summary.tidalFraction >= 0.2) {
      candidates.push({ id: 'ICE_SHELL_EPISODIC_CYCLE', weight: 0.25 + summary.convection * 0.6 + summary.tidalFraction * 0.8 });
    }
    return canonicalTemplateWeights(candidates);
  }
  if (premise.bodyClassCandidates.includes('ROCK_ICE_MIXED_SOLID_BODY')) {
    candidates.push({ id: 'ROCKY_SINGLE_STAGNANT', weight: Math.max(0.15, 0.8 - summary.convection) });
    if (summary.convection >= 0.2 || has('EPISODIC_LID') || has('SLUGGISH_LID')) candidates.push({ id: 'MIXED_SOLID_EPISODIC', weight: 0.35 + summary.convection + summary.melt * 0.3 });
    return canonicalTemplateWeights(candidates);
  }
  if (premise.bodyClassCandidates.includes('VOLATILE_PRESSURE_SOLID_BODY')) {
    return canonicalTemplateWeights([{ id: 'VOLATILE_SOLID_EPISODIC', weight: 1 + summary.convection * 0.5 }]);
  }
  if (summary.convection < 0.2 && summary.melt < 0.2 && interior.lidRegimeCandidates.length === 1 && has('STAGNANT_LID')) {
    return canonicalTemplateWeights([{ id: 'ROCKY_SINGLE_STAGNANT', weight: 1 }]);
  }
  if (summary.tidalFraction >= 0.45 && (has('EPISODIC_SQUISHY_LID') || has('PLUTONIC_SQUISHY_LID'))) {
    return canonicalTemplateWeights([{ id: 'ROCKY_TIDAL_EPISODIC', weight: 1 + summary.tidalFraction + summary.melt * 0.5 }]);
  }
  if (summary.melt >= 0.65 && (has('PLUTONIC_SQUISHY_LID') || has('EPISODIC_SQUISHY_LID'))) {
    return canonicalTemplateWeights([{ id: 'ROCKY_MAGMATIC_SQUISHY', weight: 1 + summary.melt + summary.hotspot * 0.3 }]);
  }
  if (has('MOBILE_LID_HYPOTHESIS') && waterInventory >= 0.2 && summary.convection >= 0.35) {
    candidates.push({ id: 'ROCKY_HOT_EPISODIC_MOBILE', weight: 0.4 + summary.convection + clamp(waterInventory / 2, 0, 1) * 0.4 });
  }
  if (has('SLUGGISH_LID') || has('EPISODIC_LID') || summary.convection >= 0.25) {
    candidates.push({ id: 'ROCKY_HOT_EPISODIC_SLUGGISH', weight: 0.5 + summary.convection * 0.8 + summary.thermal * 0.2 });
  }
  if (candidates.length === 0) candidates.push({ id: 'ROCKY_SINGLE_STAGNANT', weight: 1 });
  return canonicalTemplateWeights(candidates);
}

function canonicalTemplateWeights(values: readonly { readonly id: RegimeHistoryTemplateIdV1; readonly weight: number }[]) {
  const byId = new Map<RegimeHistoryTemplateIdV1, number>();
  for (const entry of values) {
    if (!REGIME_HISTORY_TEMPLATE_IDS.includes(entry.id) || !Number.isFinite(entry.weight) || entry.weight <= 0) throw new Error('Regime-history template weight is invalid.');
    byId.set(entry.id, (byId.get(entry.id) ?? 0) + entry.weight);
  }
  const output = [...byId.entries()].map(([id, weight]) => ({ id, weight })).sort((a, b) => compareStableText(a.id, b.id));
  if (output.length === 0 || output.length > REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1.maxTemplateCandidates) throw new Error('Regime-history template candidates are invalid.');
  return Object.freeze(output);
}

function createEpochBoundaries(count: number, oracle: WorldRandomOracle, scope: readonly string[]): readonly number[] {
  if (!Number.isSafeInteger(count) || count < 1 || count > REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1.maxEpochs) throw new Error('Regime-history epoch count is invalid.');
  if (count === 1) return Object.freeze([0, 1]);
  const weights = Array.from({ length: count }, (_, index) => 0.8 + oracle.float01({ stream: 'causal.regime-history', scope: [...scope, 'epoch-boundaries'], draw: index }) * 0.4);
  const total = weights.reduce((sum, value) => sum + value, 0);
  const boundaries = [0];
  let cumulative = 0;
  for (let index = 0; index < count - 1; index += 1) {
    cumulative += weights[index];
    const minimum = boundaries[index] + 0.000001;
    const maximum = 1 - (count - index - 1) * 0.000001;
    boundaries.push(clamp(round6(cumulative / total), minimum, maximum));
  }
  boundaries.push(1);
  return Object.freeze(boundaries);
}

function createEpoch(input: {
  readonly regime: RegimeHistoryFamilyV1;
  readonly index: number;
  readonly startTime: number;
  readonly endTime: number;
  readonly totalDuration: number;
  readonly summary: InteriorSummaryV1;
  readonly templateEvidenceIds: readonly string[];
}): TectonicEpochV1 {
  const profile = regimeProfile(input.regime);
  const midpointTime = (input.startTime + input.endTime) / 2;
  const earlyHeat = 1 - midpointTime;
  const mobilityCenter = clamp(profile.mobility + input.summary.convection * 0.15 + profile.earlyMobility * earlyHeat, 0, 1);
  const extensionCenter = clamp(profile.extension + input.summary.rift * 0.18 + profile.earlyExtension * earlyHeat, 0, 1);
  const convergenceCenter = clamp(profile.convergence + input.summary.convection * 0.12, 0, 1);
  const transformCenter = clamp(profile.transform + mobilityCenter * 0.12, 0, 1);
  const plumeCenter = clamp(profile.plume + input.summary.hotspot * 0.18 + input.summary.thermal * 0.1 * earlyHeat, 0, 1);
  const crustCenter = clamp(profile.crust + input.summary.melt * 0.2 + input.summary.thermal * 0.08 * earlyHeat, 0, 1);
  const duration = (input.endTime - input.startTime) * input.totalDuration;
  const persistenceMin = clamp(duration * 0.82, 0, input.totalDuration);
  const persistenceMax = clamp(duration * 1.12, persistenceMin, input.totalDuration);
  const exposureCenter = duration * profile.exposure;
  const exposureMin = clamp(exposureCenter * 0.65, 0, persistenceMax);
  const exposureMax = clamp(exposureCenter * 1.15, exposureMin, persistenceMax);
  const epochId = `epoch-${String(input.index).padStart(2, '0')}-${input.regime.toLowerCase().replaceAll('_', '-')}`;
  return cloneAndDeepFreeze({
    epochId,
    sequenceIndex: input.index,
    startTime: input.startTime,
    endTime: input.endTime,
    regimeFamily: input.regime,
    mobilityRange: normalizedRange(mobilityCenter, 0.18, `${epochId}.mobility`),
    extensionRange: normalizedRange(extensionCenter, 0.2, `${epochId}.extension`),
    convergenceRange: normalizedRange(convergenceCenter, 0.2, `${epochId}.convergence`),
    transformRange: normalizedRange(transformCenter, 0.18, `${epochId}.transform`),
    plumeRange: normalizedRange(plumeCenter, 0.2, `${epochId}.plume`),
    crustProductionRange: normalizedRange(crustCenter, 0.2, `${epochId}.crust-production`),
    persistenceRange: createScientificRange(persistenceMin, persistenceMax, 'gigaannum', 'gigaannum-v1', `${epochId}.persistence`),
    surfaceExposureRange: createScientificRange(exposureMin, exposureMax, 'gigaannum', 'gigaannum-v1', `${epochId}.surface-exposure`),
    confidenceSubject: `${epochId}.broad-regime`,
    evidenceIds: uniqueText([...input.templateEvidenceIds, ...regimeEvidenceIds(input.regime)]),
  });
}

function createTransition(input: {
  readonly triggerFamily: RegimeHistoryTransitionFamilyV1;
  readonly index: number;
  readonly fromEpochId: string;
  readonly toEpochId: string;
  readonly templateEvidenceIds: readonly string[];
}): TectonicTransitionV1 {
  return cloneAndDeepFreeze({
    transitionId: `transition-${String(input.index).padStart(2, '0')}-${input.triggerFamily.toLowerCase().replaceAll('_', '-')}`,
    fromEpochId: input.fromEpochId,
    toEpochId: input.toEpochId,
    triggerFamily: input.triggerFamily,
    triggerEvidenceIds: uniqueText([...input.templateEvidenceIds, ...transitionEvidenceIds(input.triggerFamily)]),
    confidenceSubject: `transition-${String(input.index).padStart(2, '0')}.broad-trigger`,
  });
}

function regimeProfile(regime: RegimeHistoryFamilyV1) {
  const profiles: Readonly<Record<RegimeHistoryFamilyV1, {
    mobility: number;
    extension: number;
    convergence: number;
    transform: number;
    plume: number;
    crust: number;
    exposure: number;
    earlyMobility: number;
    earlyExtension: number;
  }>> = {
    EPISODIC_LID: { mobility: 0.42, extension: 0.42, convergence: 0.38, transform: 0.28, plume: 0.45, crust: 0.48, exposure: 0.55, earlyMobility: 0.05, earlyExtension: 0.05 },
    EPISODIC_SQUISHY_LID: { mobility: 0.5, extension: 0.5, convergence: 0.38, transform: 0.28, plume: 0.68, crust: 0.72, exposure: 0.42, earlyMobility: 0.08, earlyExtension: 0.08 },
    HEAT_PIPE_LID: { mobility: 0.08, extension: 0.14, convergence: 0.08, transform: 0.03, plume: 0.82, crust: 0.86, exposure: 0.22, earlyMobility: 0.02, earlyExtension: 0.03 },
    HOT_STAGNANT_LID: { mobility: 0.06, extension: 0.12, convergence: 0.06, transform: 0.03, plume: 0.52, crust: 0.58, exposure: 0.32, earlyMobility: 0.02, earlyExtension: 0.04 },
    ICE_SHELL_EPISODIC_LID: { mobility: 0.35, extension: 0.38, convergence: 0.08, transform: 0.16, plume: 0.6, crust: 0.22, exposure: 0.38, earlyMobility: 0.04, earlyExtension: 0.05 },
    ICE_SHELL_STAGNANT_LID: { mobility: 0.06, extension: 0.12, convergence: 0.03, transform: 0.03, plume: 0.3, crust: 0.08, exposure: 0.58, earlyMobility: 0.01, earlyExtension: 0.02 },
    MOBILE_LID_HYPOTHESIS: { mobility: 0.74, extension: 0.62, convergence: 0.7, transform: 0.58, plume: 0.36, crust: 0.58, exposure: 0.68, earlyMobility: 0.02, earlyExtension: 0.02 },
    PLUTONIC_SQUISHY_LID: { mobility: 0.28, extension: 0.36, convergence: 0.22, transform: 0.13, plume: 0.65, crust: 0.78, exposure: 0.36, earlyMobility: 0.06, earlyExtension: 0.07 },
    SLUGGISH_LID: { mobility: 0.31, extension: 0.29, convergence: 0.27, transform: 0.21, plume: 0.32, crust: 0.36, exposure: 0.62, earlyMobility: 0.03, earlyExtension: 0.03 },
    STAGNANT_LID: { mobility: 0.05, extension: 0.1, convergence: 0.04, transform: 0.02, plume: 0.24, crust: 0.24, exposure: 0.74, earlyMobility: 0.01, earlyExtension: 0.02 },
  };
  return profiles[regime];
}

function regimeEvidenceIds(regime: RegimeHistoryFamilyV1): readonly string[] {
  if (regime === 'ICE_SHELL_EPISODIC_LID' || regime === 'ICE_SHELL_STAGNANT_LID') return ['history/ice-shell-episodic-evolution-v1'];
  if (regime === 'HEAT_PIPE_LID' || regime === 'PLUTONIC_SQUISHY_LID' || regime === 'EPISODIC_SQUISHY_LID') return ['history/lid-regime-family-alternatives-v1', 'history/thermal-and-magmatic-transition-v1'];
  if (regime === 'MOBILE_LID_HYPOTHESIS') return ['history/damage-assisted-mobile-lid-initiation-v1', 'history/lid-regime-family-alternatives-v1'];
  return ['history/lid-regime-family-alternatives-v1', 'history/secular-cooling-regime-window-v1'];
}

function transitionEvidenceIds(trigger: RegimeHistoryTransitionFamilyV1): readonly string[] {
  if (trigger === 'LITHOSPHERE_DAMAGE_ACCUMULATION' || trigger === 'SECULAR_COOLING_AND_WEAK_ZONE_MEMORY') return ['history/damage-assisted-mobile-lid-initiation-v1', 'history/transition-trigger-families-only-v1'];
  if (trigger === 'MAGMATIC_RHEOLOGY_REORGANIZATION' || trigger === 'VOLCANIC_HEAT_TRANSPORT_DECLINE') return ['history/thermal-and-magmatic-transition-v1', 'history/transition-trigger-families-only-v1'];
  if (trigger === 'SHELL_THERMAL_RELAXATION' || trigger === 'TIDAL_THERMAL_DESTABILIZATION') return ['history/ice-shell-episodic-evolution-v1', 'history/transition-trigger-families-only-v1'];
  if (trigger === 'RHEOLOGIC_HYSTERESIS') return ['history/path-dependence-and-hysteresis-v1', 'history/transition-trigger-families-only-v1'];
  return ['history/secular-cooling-regime-window-v1', 'history/transition-trigger-families-only-v1'];
}

function summarizeInterior(interior: InteriorStateV1): InteriorSummaryV1 {
  const fraction = (sourceId: 'PRIMORDIAL' | 'RADIOGENIC' | 'TIDAL') => {
    const entry = interior.heatSourceFractions.find((candidate) => candidate.sourceId === sourceId);
    if (!entry) throw new Error(`Regime history requires interior heat fraction ${sourceId}.`);
    return midpoint(entry.fractionRange);
  };
  return Object.freeze({
    thermal: midpoint(interior.thermalBudgetRange),
    convection: midpoint(interior.mantleConvectionRange),
    melt: midpoint(interior.meltAndVolcanismRange),
    rift: midpoint(interior.riftTendencyRange),
    hotspot: midpoint(interior.hotspotTendencyRange),
    primordialFraction: fraction('PRIMORDIAL'),
    radiogenicFraction: fraction('RADIOGENIC'),
    tidalFraction: fraction('TIDAL'),
  });
}

function midpoint(range: ScientificRangeV1): number {
  return (range.min + range.max) / 2;
}

function normalizedRange(center: number, uncertainty: number, subject: string): ScientificRangeV1 {
  return createScientificRange(clamp(center - uncertainty, 0, 1), clamp(center + uncertainty, 0, 1), 'normalized-0-1', 'normalized-0-1-v1', subject);
}

function isIcePremise(premise: PlanetaryPremiseV1): boolean {
  return premise.bodyClassCandidates.includes('ICE_SHELL_OCEAN_BODY');
}

function finalizeResolution(input: {
  readonly status: RegimeHistoryResolutionV1['status'];
  readonly inputSnapshot: CausalGeologyInputV1;
  readonly premise: PlanetaryPremiseV1;
  readonly interior: InteriorStateV1;
  readonly context: RegimeHistoryResearchContextV1;
  readonly history?: TectonicRegimeHistoryV1;
  readonly templateCandidates: readonly RegimeHistoryTemplateIdV1[];
  readonly selectedTemplateId?: RegimeHistoryTemplateIdV1;
  readonly branchResolutions: readonly WeightedBranchResolutionV1<string>[];
  readonly blockingReasons: readonly string[];
  readonly missingDomains: readonly string[];
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
}): RegimeHistoryResolutionV1 {
  const payloadWithoutMetrics: Omit<RegimeHistoryResolutionV1, 'metrics' | 'contentHash'> = {
    schemaVersion: 1,
    resolverVersion: 1,
    status: input.status,
    inputSnapshotHash: input.inputSnapshot.contentHash,
    premiseHash: input.premise.contentHash,
    interiorHash: input.interior.contentHash,
    researchContextHash: input.context.contentHash,
    ...(input.history ? { history: input.history } : {}),
    templateCandidates: canonicalVocabulary(input.templateCandidates, REGIME_HISTORY_TEMPLATE_IDS, 'Regime-history template candidates', input.status === 'PARTIAL' ? 1 : 0),
    ...(input.selectedTemplateId ? { selectedTemplateId: input.selectedTemplateId } : {}),
    branchResolutions: [...input.branchResolutions],
    blockingReasons: canonicalText(input.blockingReasons, 'Regime-history blocking reasons'),
    missingDomains: canonicalText(input.missingDomains, 'Regime-history missing domains'),
    evidenceIds: uniqueText(input.evidenceIds),
    contradictionIds: uniqueText(input.contradictionIds),
  };
  const metricsWithoutSize = {
    schemaVersion: 1 as const,
    ruleEvaluations: payloadWithoutMetrics.evidenceIds.length,
    templateCandidateCount: payloadWithoutMetrics.templateCandidates.length,
    epochCount: input.history?.epochs.length ?? 0,
    transitionCount: input.history?.transitions.length ?? 0,
    branchResolutionCount: input.branchResolutions.length,
  };
  const metrics: RegimeHistoryResolutionMetricsV1 = {
    ...metricsWithoutSize,
    serializedResultBytes: measureResolutionBytes(payloadWithoutMetrics, { ...metricsWithoutSize, serializedResultBytes: 0 }),
  };
  const payload = { ...payloadWithoutMetrics, metrics };
  const resolution = cloneAndDeepFreeze({
    ...payload,
    contentHash: hashCausalPayload('WorldWright/regime-history-resolution/v1', payload),
  });
  validateRegimeHistoryResolution(resolution);
  return resolution;
}

function validateRegimeHistoryMetrics(value: RegimeHistoryResolutionMetricsV1): void {
  assertExactKeys(value, METRICS_KEYS, 'Regime-history metrics');
  if (value.schemaVersion !== 1) throw new Error('Unsupported regime-history metrics.');
  const counts = [value.ruleEvaluations, value.templateCandidateCount, value.epochCount, value.transitionCount, value.branchResolutionCount, value.serializedResultBytes];
  if (counts.some((count) => !Number.isSafeInteger(count) || count < 0)) throw new Error('Regime-history metrics contain invalid counts.');
  if (value.templateCandidateCount > REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1.maxTemplateCandidates
    || value.epochCount > REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1.maxEpochs
    || value.transitionCount > REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1.maxTransitions
    || value.branchResolutionCount > REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1.maxBranchResolutions) {
    throw new Error('Regime-history metrics exceed frozen budgets.');
  }
}

function measureResolutionBytes(payload: Omit<RegimeHistoryResolutionV1, 'metrics' | 'contentHash'>, metrics: RegimeHistoryResolutionMetricsV1): number {
  return new TextEncoder().encode(canonicalJsonStringify({ ...payload, metrics: { ...metrics, serializedResultBytes: 0 } })).byteLength;
}

function canonicalVocabulary<T extends string>(values: readonly T[], vocabulary: readonly T[], label: string, minimum = 0): readonly T[] {
  if (!Array.isArray(values) || values.length < minimum || values.some((value) => !vocabulary.includes(value))) throw new Error(`${label} are invalid.`);
  if (new Set(values).size !== values.length) throw new Error(`${label} contain duplicates.`);
  const output = [...values].sort((a, b) => compareStableText(a, b));
  if (!arraysEqual(values, output)) throw new Error(`${label} must be canonically ordered.`);
  return Object.freeze(output);
}

function canonicalText(values: readonly string[], label: string): readonly string[] {
  if (!Array.isArray(values) || !values.every(isText)) throw new Error(`${label} are invalid.`);
  if (new Set(values).size !== values.length) throw new Error(`${label} contain duplicates.`);
  const output = [...values].sort(compareStableText);
  if (!arraysEqual(values, output)) throw new Error(`${label} must be canonically ordered.`);
  return Object.freeze(output);
}

function uniqueText(values: readonly string[]): readonly string[] {
  return Object.freeze([...new Set(values)].sort(compareStableText));
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

function round6(value: number): number {
  return Math.round(value * 1_000_000) / 1_000_000;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
