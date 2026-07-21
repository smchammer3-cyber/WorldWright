import { cloneAndDeepFreeze } from './immutable';

export const W1_06_REQUIRED_ARCHETYPE_FAMILIES = Object.freeze([
  'MOBILE_LID_ROCKY',
  'STAGNANT_LID_ROCKY',
  'RIFT_DOMINATED_ROCKY',
  'HOTSPOT_DOMINATED_ROCKY',
  'LOW_HEAT_OLD_ROCKY',
  'HIGH_HEAT_YOUNG_SUPER_EARTH',
  'WATER_RICH_ROCKY',
  'DRY_ROCKY',
  'SUPER_EARTH_DIRECT_INPUT_RANGE',
  'APPROVED_ARTIFICIAL_OR_FANTASY_EXCEPTION',
] as const);

export const W1_06_REQUIRED_DIRECT_INPUT_AXES = Object.freeze([
  'planet.radius',
  'planet.density',
  'stellar.luminosity',
  'orbit.distance',
  'surface.albedo',
  'atmosphere.greenhouse',
  'thermal.age',
  'thermal.radiogenicHeat',
  'thermal.primordialHeat',
  'thermal.tidalHeating',
  'inventory.water',
  'inventory.volatiles',
] as const);

export const W1_06_REQUIRED_REFERENCE_KINDS = Object.freeze([
  'POSITIVE',
  'THRESHOLD',
  'NEGATIVE',
  'EXCEPTION',
] as const);

export type CausalShadowAuditVariationKindV1 =
  | 'POSITIVE'
  | 'THRESHOLD'
  | 'NEGATIVE'
  | 'EXCEPTION'
  | 'HOLDOUT';

export type CausalShadowAuditStageStatusV1 = 'COMPLETE' | 'PARTIAL' | 'BLOCKED' | 'FAILED';

export interface CausalShadowAuditCaseV1 {
  readonly schemaVersion: 1;
  readonly caseId: string;
  readonly rootSeed: string;
  readonly archetypeFamily: string;
  readonly variationKind: CausalShadowAuditVariationKindV1;
  readonly directInputAxes: readonly string[];
  readonly stageStatus: CausalShadowAuditStageStatusV1;
  readonly currentRegime: string;
  readonly historyHash: string;
  readonly spineHash: string;
  readonly epochCount: number;
  readonly transitionCount: number;
  readonly nodeCount: number;
  readonly edgeCount: number;
  readonly eventCount: number;
  readonly featureFamilies: readonly string[];
  readonly openContradictionCount: number;
  readonly durationMilliseconds: number;
  readonly heapDeltaBytes: number;
  readonly serializedPayloadBytes: number;
}

export interface CausalShadowAuditBudgetV1 {
  readonly schemaVersion: 1;
  readonly budgetVersion: string;
  readonly minimumCaseCount: number;
  readonly minimumUniqueSeedCount: number;
  readonly minimumDistinctHistoryHashCount: number;
  readonly minimumDistinctSpineHashCount: number;
  readonly maximumBlockedOrFailedCaseCount: number;
  readonly maximumDurationMillisecondsPerCase: number;
  readonly maximumHeapDeltaBytesPerCase: number;
  readonly maximumSerializedPayloadBytesPerCase: number;
  readonly maximumNodeCountPerCase: number;
  readonly maximumEdgeCountPerCase: number;
  readonly maximumEventCountPerCase: number;
}

export const W1_06A_SHADOW_AUDIT_BUDGET_V1: CausalShadowAuditBudgetV1 = Object.freeze({
  schemaVersion: 1,
  budgetVersion: 'W1_06A_SHADOW_AUDIT_BUDGET_V1',
  minimumCaseCount: 24,
  minimumUniqueSeedCount: 24,
  minimumDistinctHistoryHashCount: 7,
  minimumDistinctSpineHashCount: 24,
  maximumBlockedOrFailedCaseCount: 0,
  maximumDurationMillisecondsPerCase: 5_000,
  maximumHeapDeltaBytesPerCase: 134_217_728,
  maximumSerializedPayloadBytesPerCase: 2_097_152,
  maximumNodeCountPerCase: 128,
  maximumEdgeCountPerCase: 256,
  maximumEventCountPerCase: 128,
});

export interface NumericDistributionV1 {
  readonly minimum: number;
  readonly maximum: number;
  readonly mean: number;
}

export interface CausalShadowAggregateReportV1 {
  readonly schemaVersion: 1;
  readonly reportVersion: 'W1_06A_SHADOW_AGGREGATE_REPORT_V1';
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly scientificStatus: 'COMPLETE' | 'PARTIAL' | 'FAILED';
  readonly softwareGatePass: boolean;
  readonly caseCount: number;
  readonly uniqueSeedCount: number;
  readonly invalidCaseCount: number;
  readonly coverage: {
    readonly archetypeFamilies: readonly string[];
    readonly missingArchetypeFamilies: readonly string[];
    readonly directInputAxes: readonly string[];
    readonly missingDirectInputAxes: readonly string[];
    readonly variationKinds: readonly CausalShadowAuditVariationKindV1[];
    readonly missingReferenceKinds: readonly string[];
  };
  readonly determinism: {
    readonly distinctHistoryHashCount: number;
    readonly distinctSpineHashCount: number;
  };
  readonly distributions: {
    readonly stageStatuses: Readonly<Record<string, number>>;
    readonly currentRegimes: Readonly<Record<string, number>>;
    readonly featureFamilies: Readonly<Record<string, number>>;
    readonly epochCount: NumericDistributionV1;
    readonly transitionCount: NumericDistributionV1;
    readonly nodeCount: NumericDistributionV1;
    readonly edgeCount: NumericDistributionV1;
    readonly eventCount: NumericDistributionV1;
  };
  readonly contradictions: {
    readonly openCount: number;
    readonly affectedCaseCount: number;
  };
  readonly performance: {
    readonly budgetVersion: string;
    readonly durationMilliseconds: NumericDistributionV1;
    readonly heapDeltaBytes: NumericDistributionV1;
    readonly serializedPayloadBytes: NumericDistributionV1;
    readonly overBudgetCaseIds: readonly string[];
  };
  readonly warnings: readonly string[];
  readonly limitations: readonly string[];
}

export function createCausalShadowAggregateReport(
  cases: readonly CausalShadowAuditCaseV1[],
  budget: CausalShadowAuditBudgetV1 = W1_06A_SHADOW_AUDIT_BUDGET_V1,
): CausalShadowAggregateReportV1 {
  validateBudget(budget);
  if (!Array.isArray(cases) || cases.length === 0) throw new Error('Causal shadow aggregate audit requires at least one case.');

  const caseIds = new Set<string>();
  const seeds = new Set<string>();
  for (const auditCase of cases) {
    validateAuditCase(auditCase);
    if (caseIds.has(auditCase.caseId)) throw new Error(`Duplicate causal shadow audit case ${auditCase.caseId}.`);
    if (seeds.has(auditCase.rootSeed)) throw new Error(`Duplicate causal shadow audit seed ${auditCase.rootSeed}.`);
    caseIds.add(auditCase.caseId);
    seeds.add(auditCase.rootSeed);
  }

  const ordered = [...cases].sort((a, b) => compareStableText(a.caseId, b.caseId));
  const archetypeFamilies = uniqueSorted(ordered.map((entry) => entry.archetypeFamily));
  const directInputAxes = uniqueSorted(ordered.flatMap((entry) => entry.directInputAxes));
  const variationKinds = uniqueSorted(ordered.map((entry) => entry.variationKind)) as CausalShadowAuditVariationKindV1[];
  const missingArchetypeFamilies = W1_06_REQUIRED_ARCHETYPE_FAMILIES.filter((family) => !archetypeFamilies.includes(family));
  const missingDirectInputAxes = W1_06_REQUIRED_DIRECT_INPUT_AXES.filter((axis) => !directInputAxes.includes(axis));
  const missingReferenceKinds = W1_06_REQUIRED_REFERENCE_KINDS.filter((kind) => !variationKinds.includes(kind));

  const invalidCases = ordered.filter((entry) => entry.stageStatus === 'BLOCKED' || entry.stageStatus === 'FAILED');
  const historyHashes = new Set(ordered.map((entry) => entry.historyHash));
  const spineHashes = new Set(ordered.map((entry) => entry.spineHash));
  const overBudgetCaseIds = ordered
    .filter((entry) =>
      entry.durationMilliseconds > budget.maximumDurationMillisecondsPerCase
      || entry.heapDeltaBytes > budget.maximumHeapDeltaBytesPerCase
      || entry.serializedPayloadBytes > budget.maximumSerializedPayloadBytesPerCase
      || entry.nodeCount > budget.maximumNodeCountPerCase
      || entry.edgeCount > budget.maximumEdgeCountPerCase
      || entry.eventCount > budget.maximumEventCountPerCase)
    .map((entry) => entry.caseId);

  const softwareGatePass =
    ordered.length >= budget.minimumCaseCount
    && seeds.size >= budget.minimumUniqueSeedCount
    && historyHashes.size >= budget.minimumDistinctHistoryHashCount
    && spineHashes.size >= budget.minimumDistinctSpineHashCount
    && invalidCases.length <= budget.maximumBlockedOrFailedCaseCount
    && overBudgetCaseIds.length === 0;

  const openContradictionCount = sum(ordered.map((entry) => entry.openContradictionCount));
  const coverageIncomplete =
    missingArchetypeFamilies.length > 0
    || missingDirectInputAxes.length > 0
    || missingReferenceKinds.length > 0;

  const scientificStatus: CausalShadowAggregateReportV1['scientificStatus'] =
    softwareGatePass ? (coverageIncomplete || openContradictionCount > 0 ? 'PARTIAL' : 'COMPLETE') : 'FAILED';

  const warnings: string[] = [];
  if (missingArchetypeFamilies.length) warnings.push(`Missing controlled archetype families: ${missingArchetypeFamilies.join(', ')}.`);
  if (missingDirectInputAxes.length) warnings.push(`Missing direct-input threshold axes: ${missingDirectInputAxes.join(', ')}.`);
  if (missingReferenceKinds.length) warnings.push(`Missing reference kinds: ${missingReferenceKinds.join(', ')}.`);
  if (openContradictionCount > 0) warnings.push(`${openContradictionCount} open contradiction references remain visible.`);
  if (invalidCases.length) warnings.push(`${invalidCases.length} blocked or failed cases are present.`);
  if (overBudgetCaseIds.length) warnings.push(`Performance or graph budgets exceeded for: ${overBudgetCaseIds.join(', ')}.`);

  return cloneAndDeepFreeze({
    schemaVersion: 1,
    reportVersion: 'W1_06A_SHADOW_AGGREGATE_REPORT_V1',
    authorityMode: 'CAUSAL_SHADOW',
    physicalGeneratorAuthority: 'LEGACY',
    scientificStatus,
    softwareGatePass,
    caseCount: ordered.length,
    uniqueSeedCount: seeds.size,
    invalidCaseCount: invalidCases.length,
    coverage: {
      archetypeFamilies,
      missingArchetypeFamilies,
      directInputAxes,
      missingDirectInputAxes,
      variationKinds,
      missingReferenceKinds,
    },
    determinism: {
      distinctHistoryHashCount: historyHashes.size,
      distinctSpineHashCount: spineHashes.size,
    },
    distributions: {
      stageStatuses: countValues(ordered.map((entry) => entry.stageStatus)),
      currentRegimes: countValues(ordered.map((entry) => entry.currentRegime)),
      featureFamilies: countValues(ordered.flatMap((entry) => entry.featureFamilies)),
      epochCount: distribution(ordered.map((entry) => entry.epochCount)),
      transitionCount: distribution(ordered.map((entry) => entry.transitionCount)),
      nodeCount: distribution(ordered.map((entry) => entry.nodeCount)),
      edgeCount: distribution(ordered.map((entry) => entry.edgeCount)),
      eventCount: distribution(ordered.map((entry) => entry.eventCount)),
    },
    contradictions: {
      openCount: openContradictionCount,
      affectedCaseCount: ordered.filter((entry) => entry.openContradictionCount > 0).length,
    },
    performance: {
      budgetVersion: budget.budgetVersion,
      durationMilliseconds: distribution(ordered.map((entry) => entry.durationMilliseconds)),
      heapDeltaBytes: distribution(ordered.map((entry) => entry.heapDeltaBytes)),
      serializedPayloadBytes: distribution(ordered.map((entry) => entry.serializedPayloadBytes)),
      overBudgetCaseIds,
    },
    warnings,
    limitations: [
      'This report is diagnostic only and cannot write causal or physical world state.',
      'Legacy solved morphology is not an input to aggregate causal statistics.',
      'W1-06A establishes the 24+ case aggregate gate but does not claim complete archetype, threshold, negative, or exception coverage.',
      'Operational timing and heap measurements are environment-dependent and never enter causal identity.',
    ],
  });
}

export function validateCausalShadowAggregateReport(value: unknown): asserts value is CausalShadowAggregateReportV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Causal shadow aggregate report must be an object.');
  const report = value as Partial<CausalShadowAggregateReportV1>;
  if (
    report.schemaVersion !== 1
    || report.reportVersion !== 'W1_06A_SHADOW_AGGREGATE_REPORT_V1'
    || report.authorityMode !== 'CAUSAL_SHADOW'
    || report.physicalGeneratorAuthority !== 'LEGACY'
  ) throw new Error('Unsupported causal shadow aggregate report.');
  if (!Number.isInteger(report.caseCount) || (report.caseCount ?? 0) < 1) throw new Error('Causal shadow aggregate report case count is invalid.');
  if (typeof report.softwareGatePass !== 'boolean') throw new Error('Causal shadow aggregate report gate state is invalid.');
  if (!['COMPLETE', 'PARTIAL', 'FAILED'].includes(report.scientificStatus ?? '')) throw new Error('Causal shadow aggregate report scientific status is invalid.');
  if (!report.coverage || !report.determinism || !report.distributions || !report.performance || !report.contradictions) {
    throw new Error('Causal shadow aggregate report is incomplete.');
  }
}

function validateAuditCase(value: CausalShadowAuditCaseV1): void {
  if (!value || typeof value !== 'object') throw new Error('Causal shadow audit case must be an object.');
  if (value.schemaVersion !== 1 || !isText(value.caseId) || !isText(value.rootSeed) || !isText(value.archetypeFamily)) {
    throw new Error('Causal shadow audit case identity is invalid.');
  }
  if (!['POSITIVE', 'THRESHOLD', 'NEGATIVE', 'EXCEPTION', 'HOLDOUT'].includes(value.variationKind)) {
    throw new Error(`Causal shadow audit case ${value.caseId} has an invalid variation kind.`);
  }
  if (!['COMPLETE', 'PARTIAL', 'BLOCKED', 'FAILED'].includes(value.stageStatus)) {
    throw new Error(`Causal shadow audit case ${value.caseId} has an invalid stage status.`);
  }
  if (!isText(value.currentRegime) || !isHash(value.historyHash) || !isHash(value.spineHash)) {
    throw new Error(`Causal shadow audit case ${value.caseId} has invalid result identity.`);
  }
  assertTextArray(value.directInputAxes, `${value.caseId} direct input axes`);
  assertTextArray(value.featureFamilies, `${value.caseId} feature families`);
  for (const [label, number] of [
    ['epoch count', value.epochCount],
    ['transition count', value.transitionCount],
    ['node count', value.nodeCount],
    ['edge count', value.edgeCount],
    ['event count', value.eventCount],
    ['open contradiction count', value.openContradictionCount],
    ['duration', value.durationMilliseconds],
    ['heap delta', value.heapDeltaBytes],
    ['serialized payload size', value.serializedPayloadBytes],
  ] as const) {
    if (!Number.isFinite(number) || number < 0) throw new Error(`Causal shadow audit case ${value.caseId} ${label} is invalid.`);
  }
}

function validateBudget(value: CausalShadowAuditBudgetV1): void {
  if (value.schemaVersion !== 1 || !isText(value.budgetVersion)) throw new Error('Causal shadow audit budget identity is invalid.');
  for (const [key, number] of Object.entries(value)) {
    if (key === 'schemaVersion' || key === 'budgetVersion') continue;
    if (!Number.isFinite(number) || number < 0) throw new Error(`Causal shadow audit budget ${key} is invalid.`);
  }
}

function distribution(values: readonly number[]): NumericDistributionV1 {
  if (!values.length) return { minimum: 0, maximum: 0, mean: 0 };
  return {
    minimum: Math.min(...values),
    maximum: Math.max(...values),
    mean: sum(values) / values.length,
  };
}

function countValues(values: readonly string[]): Readonly<Record<string, number>> {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return Object.freeze(Object.fromEntries([...counts.entries()].sort(([a], [b]) => compareStableText(a, b))));
}

function uniqueSorted(values: readonly string[]): string[] {
  return [...new Set(values)].sort(compareStableText);
}

function sum(values: readonly number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

function isHash(value: string): boolean {
  return /^[0-9a-f]{16}$/.test(value);
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function assertTextArray(value: readonly string[], label: string): void {
  if (!Array.isArray(value) || value.some((entry) => !isText(entry))) throw new Error(`${label} must contain non-empty text.`);
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
