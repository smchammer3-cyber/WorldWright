import { cloneAndDeepFreeze } from './immutable';
import { W1_06_REQUIRED_ARCHETYPE_FAMILIES } from './shadowAudit';

export type CausalControlledArchetypeFamilyV1 = typeof W1_06_REQUIRED_ARCHETYPE_FAMILIES[number];
export type CausalControlledArchetypeEvidenceModeV1 = 'CONTROLLED_NATURAL_CHAIN' | 'APPROVED_EXCEPTION_PREMISE';
export type CausalControlledArchetypeCriterionV1 =
  | 'MOBILE_CURRENT_REGIME'
  | 'STAGNANT_CURRENT_REGIME'
  | 'RIFT_NOT_LESS_THAN_PLUME'
  | 'PLUME_NOT_LESS_THAN_RIFT'
  | 'LOW_HEAT_OLD_INPUT'
  | 'HIGH_HEAT_YOUNG_SUPER_EARTH_INPUT'
  | 'WATER_RICH_INPUT'
  | 'DRY_INPUT'
  | 'SUPER_EARTH_INPUT_RANGE'
  | 'APPROVED_EXCEPTION_PERMISSION';

export interface CausalControlledArchetypeExecutionV1 {
  readonly schemaVersion: 1;
  readonly caseId: string;
  readonly rootSeed: string;
  readonly archetypeFamily: CausalControlledArchetypeFamilyV1;
  readonly evidenceMode: CausalControlledArchetypeEvidenceModeV1;
  readonly criterion: CausalControlledArchetypeCriterionV1;
  readonly observedStageStatus: 'PARTIAL' | 'COMPLETE' | 'BLOCKED';
  readonly criterionPass: boolean;
  readonly replayStable: boolean;
  readonly currentRegime: string;
  readonly historyHash?: string;
  readonly spineHash?: string;
  readonly premiseHash?: string;
  readonly featureFamilyCounts: Readonly<Record<string, number>>;
  readonly openContradictionCount: number;
  readonly durationMilliseconds: number;
  readonly heapDeltaBytes: number;
  readonly serializedPayloadBytes: number;
  readonly limitations: readonly string[];
}

export interface CausalControlledArchetypeBudgetV1 {
  readonly schemaVersion: 1;
  readonly budgetVersion: string;
  readonly minimumCasesPerFamily: number;
  readonly maximumDurationMillisecondsPerCase: number;
  readonly maximumHeapDeltaBytesPerCase: number;
  readonly maximumSerializedPayloadBytesPerCase: number;
}

export const W1_06B2_CONTROLLED_ARCHETYPE_BUDGET_V1: CausalControlledArchetypeBudgetV1 = Object.freeze({
  schemaVersion: 1,
  budgetVersion: 'W1_06B2_CONTROLLED_ARCHETYPE_BUDGET_V1',
  minimumCasesPerFamily: 3,
  maximumDurationMillisecondsPerCase: 5_000,
  maximumHeapDeltaBytesPerCase: 134_217_728,
  maximumSerializedPayloadBytesPerCase: 2_097_152,
});

export interface CausalControlledArchetypeCoverageReportV1 {
  readonly schemaVersion: 1;
  readonly reportVersion: 'W1_06B2_CONTROLLED_ARCHETYPE_REPORT_V1';
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly scientificStatus: 'PARTIAL' | 'FAILED';
  readonly softwareGatePass: boolean;
  readonly caseCount: number;
  readonly uniqueSeedCount: number;
  readonly coverage: {
    readonly coveredFamilies: readonly CausalControlledArchetypeFamilyV1[];
    readonly missingFamilies: readonly CausalControlledArchetypeFamilyV1[];
    readonly underrepresentedFamilies: readonly CausalControlledArchetypeFamilyV1[];
    readonly casesPerFamily: Readonly<Record<string, number>>;
  };
  readonly determinism: {
    readonly replayFailureCaseIds: readonly string[];
    readonly missingNaturalHashCaseIds: readonly string[];
  };
  readonly criteria: {
    readonly failureCaseIds: readonly string[];
  };
  readonly contradictions: {
    readonly openCount: number;
    readonly affectedCaseIds: readonly string[];
  };
  readonly performance: {
    readonly budgetVersion: string;
    readonly overBudgetCaseIds: readonly string[];
  };
  readonly warnings: readonly string[];
  readonly limitations: readonly string[];
}

const REQUIRED_FAMILY_SET = new Set<string>(W1_06_REQUIRED_ARCHETYPE_FAMILIES);

export function createCausalControlledArchetypeCoverageReport(
  executions: readonly CausalControlledArchetypeExecutionV1[],
  budget: CausalControlledArchetypeBudgetV1 = W1_06B2_CONTROLLED_ARCHETYPE_BUDGET_V1,
): CausalControlledArchetypeCoverageReportV1 {
  validateBudget(budget);
  if (!Array.isArray(executions) || executions.length === 0) throw new Error('Controlled archetype coverage requires executions.');

  const caseIds = new Set<string>();
  const rootSeeds = new Set<string>();
  const familyCounts = new Map<CausalControlledArchetypeFamilyV1, number>();
  for (const execution of executions) {
    validateControlledArchetypeExecution(execution);
    if (caseIds.has(execution.caseId)) throw new Error(`Duplicate controlled archetype case ${execution.caseId}.`);
    if (rootSeeds.has(execution.rootSeed)) throw new Error(`Duplicate controlled archetype seed ${execution.rootSeed}.`);
    caseIds.add(execution.caseId);
    rootSeeds.add(execution.rootSeed);
    familyCounts.set(execution.archetypeFamily, (familyCounts.get(execution.archetypeFamily) ?? 0) + 1);
  }

  const ordered = [...executions].sort((a, b) => compareStableText(a.caseId, b.caseId));
  const coveredFamilies = W1_06_REQUIRED_ARCHETYPE_FAMILIES.filter((family) => familyCounts.has(family));
  const missingFamilies = W1_06_REQUIRED_ARCHETYPE_FAMILIES.filter((family) => !familyCounts.has(family));
  const underrepresentedFamilies = W1_06_REQUIRED_ARCHETYPE_FAMILIES.filter(
    (family) => (familyCounts.get(family) ?? 0) < budget.minimumCasesPerFamily,
  );
  const replayFailureCaseIds = ordered.filter((entry) => !entry.replayStable).map((entry) => entry.caseId);
  const missingNaturalHashCaseIds = ordered
    .filter((entry) => entry.evidenceMode === 'CONTROLLED_NATURAL_CHAIN' && (!entry.historyHash || !entry.spineHash))
    .map((entry) => entry.caseId);
  const criterionFailureCaseIds = ordered.filter((entry) => !entry.criterionPass).map((entry) => entry.caseId);
  const contradictionCases = ordered.filter((entry) => entry.openContradictionCount > 0);
  const overBudgetCaseIds = ordered
    .filter((entry) =>
      entry.durationMilliseconds > budget.maximumDurationMillisecondsPerCase
      || entry.heapDeltaBytes > budget.maximumHeapDeltaBytesPerCase
      || entry.serializedPayloadBytes > budget.maximumSerializedPayloadBytesPerCase)
    .map((entry) => entry.caseId);

  const softwareGatePass =
    executions.length >= W1_06_REQUIRED_ARCHETYPE_FAMILIES.length * budget.minimumCasesPerFamily
    && missingFamilies.length === 0
    && underrepresentedFamilies.length === 0
    && replayFailureCaseIds.length === 0
    && missingNaturalHashCaseIds.length === 0
    && criterionFailureCaseIds.length === 0
    && contradictionCases.length === 0
    && overBudgetCaseIds.length === 0;

  const warnings: string[] = [];
  if (missingFamilies.length) warnings.push(`Missing controlled archetype families: ${missingFamilies.join(', ')}.`);
  if (underrepresentedFamilies.length) warnings.push(`Underrepresented controlled archetype families: ${underrepresentedFamilies.join(', ')}.`);
  if (replayFailureCaseIds.length) warnings.push(`Controlled archetype replay failures: ${replayFailureCaseIds.join(', ')}.`);
  if (missingNaturalHashCaseIds.length) warnings.push(`Natural controlled cases missing history or spine hashes: ${missingNaturalHashCaseIds.join(', ')}.`);
  if (criterionFailureCaseIds.length) warnings.push(`Controlled archetype criterion failures: ${criterionFailureCaseIds.join(', ')}.`);
  if (contradictionCases.length) warnings.push(`Controlled archetype contradictions remain open in: ${contradictionCases.map((entry) => entry.caseId).join(', ')}.`);
  if (overBudgetCaseIds.length) warnings.push(`Controlled archetype budget failures: ${overBudgetCaseIds.join(', ')}.`);

  return cloneAndDeepFreeze({
    schemaVersion: 1,
    reportVersion: 'W1_06B2_CONTROLLED_ARCHETYPE_REPORT_V1',
    authorityMode: 'CAUSAL_SHADOW',
    physicalGeneratorAuthority: 'LEGACY',
    scientificStatus: softwareGatePass ? 'PARTIAL' : 'FAILED',
    softwareGatePass,
    caseCount: ordered.length,
    uniqueSeedCount: rootSeeds.size,
    coverage: {
      coveredFamilies,
      missingFamilies,
      underrepresentedFamilies,
      casesPerFamily: Object.fromEntries(
        W1_06_REQUIRED_ARCHETYPE_FAMILIES.map((family) => [family, familyCounts.get(family) ?? 0]),
      ),
    },
    determinism: { replayFailureCaseIds, missingNaturalHashCaseIds },
    criteria: { failureCaseIds: criterionFailureCaseIds },
    contradictions: {
      openCount: contradictionCases.reduce((sum, entry) => sum + entry.openContradictionCount, 0),
      affectedCaseIds: contradictionCases.map((entry) => entry.caseId),
    },
    performance: { budgetVersion: budget.budgetVersion, overBudgetCaseIds },
    warnings,
    limitations: [
      'W1-06B2 uses controlled validated upstream states to test detached regime-history and geologic-spine behavior.',
      'Controlled archetype coverage does not prove that all direct-input combinations naturally resolve to those archetypes.',
      'Rift- and hotspot-dominated labels are bounded comparison criteria over current broad spine families, not final terrain morphology.',
      'The approved artificial or fantasy archetype is evidence-complete only as an explicitly permissioned premise exception; no artificial geology resolver exists.',
      'Scientific status remains PARTIAL and no physical or visible world field is written.',
    ],
  });
}

export function validateCausalControlledArchetypeCoverageReport(value: unknown): asserts value is CausalControlledArchetypeCoverageReportV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Controlled archetype coverage report must be an object.');
  const report = value as Partial<CausalControlledArchetypeCoverageReportV1>;
  if (
    report.schemaVersion !== 1
    || report.reportVersion !== 'W1_06B2_CONTROLLED_ARCHETYPE_REPORT_V1'
    || report.authorityMode !== 'CAUSAL_SHADOW'
    || report.physicalGeneratorAuthority !== 'LEGACY'
  ) throw new Error('Unsupported controlled archetype coverage report.');
  if (report.scientificStatus !== 'PARTIAL' && report.scientificStatus !== 'FAILED') throw new Error('Controlled archetype scientific status is invalid.');
  if (typeof report.softwareGatePass !== 'boolean' || !Number.isInteger(report.caseCount) || !Number.isInteger(report.uniqueSeedCount)) {
    throw new Error('Controlled archetype gate state is invalid.');
  }
  if (!report.coverage || !report.determinism || !report.criteria || !report.contradictions || !report.performance) {
    throw new Error('Controlled archetype coverage report is incomplete.');
  }
}

export function validateControlledArchetypeExecution(value: CausalControlledArchetypeExecutionV1): void {
  if (!value || typeof value !== 'object' || value.schemaVersion !== 1) throw new Error('Controlled archetype execution is invalid.');
  if (!isText(value.caseId) || !isText(value.rootSeed) || !REQUIRED_FAMILY_SET.has(value.archetypeFamily)) throw new Error('Controlled archetype identity is invalid.');
  if (!['CONTROLLED_NATURAL_CHAIN', 'APPROVED_EXCEPTION_PREMISE'].includes(value.evidenceMode)) throw new Error(`Controlled archetype ${value.caseId} evidence mode is invalid.`);
  if (!['PARTIAL', 'COMPLETE', 'BLOCKED'].includes(value.observedStageStatus)) throw new Error(`Controlled archetype ${value.caseId} status is invalid.`);
  if (typeof value.criterionPass !== 'boolean' || typeof value.replayStable !== 'boolean') throw new Error(`Controlled archetype ${value.caseId} boolean evidence is invalid.`);
  if (!isText(value.currentRegime)) throw new Error(`Controlled archetype ${value.caseId} current regime is invalid.`);
  if (value.evidenceMode === 'CONTROLLED_NATURAL_CHAIN') {
    if (value.observedStageStatus !== 'PARTIAL' || !isHash(value.historyHash) || !isHash(value.spineHash) || value.premiseHash !== undefined) {
      throw new Error(`Natural controlled archetype ${value.caseId} has invalid detached-chain evidence.`);
    }
  } else if (value.observedStageStatus !== 'COMPLETE' || !isHash(value.premiseHash) || value.historyHash !== undefined || value.spineHash !== undefined) {
    throw new Error(`Approved exception archetype ${value.caseId} has invalid premise evidence.`);
  }
  if (!value.featureFamilyCounts || typeof value.featureFamilyCounts !== 'object' || Array.isArray(value.featureFamilyCounts)) throw new Error(`Controlled archetype ${value.caseId} feature counts are invalid.`);
  for (const count of Object.values(value.featureFamilyCounts)) if (!Number.isInteger(count) || count < 0) throw new Error(`Controlled archetype ${value.caseId} feature count is invalid.`);
  if (!Number.isInteger(value.openContradictionCount) || value.openContradictionCount < 0) throw new Error(`Controlled archetype ${value.caseId} contradiction count is invalid.`);
  if (!Number.isFinite(value.durationMilliseconds) || value.durationMilliseconds < 0) throw new Error(`Controlled archetype ${value.caseId} duration is invalid.`);
  if (!Number.isFinite(value.heapDeltaBytes) || value.heapDeltaBytes < 0) throw new Error(`Controlled archetype ${value.caseId} heap evidence is invalid.`);
  if (!Number.isFinite(value.serializedPayloadBytes) || value.serializedPayloadBytes < 0) throw new Error(`Controlled archetype ${value.caseId} payload evidence is invalid.`);
  if (!Array.isArray(value.limitations) || value.limitations.length === 0 || value.limitations.some((entry) => !isText(entry))) throw new Error(`Controlled archetype ${value.caseId} limitations are invalid.`);
}

function validateBudget(value: CausalControlledArchetypeBudgetV1): void {
  if (value.schemaVersion !== 1 || !isText(value.budgetVersion) || !Number.isInteger(value.minimumCasesPerFamily) || value.minimumCasesPerFamily < 1) {
    throw new Error('Controlled archetype budget identity is invalid.');
  }
  if (!Number.isFinite(value.maximumDurationMillisecondsPerCase) || value.maximumDurationMillisecondsPerCase < 0) throw new Error('Controlled archetype duration budget is invalid.');
  if (!Number.isFinite(value.maximumHeapDeltaBytesPerCase) || value.maximumHeapDeltaBytesPerCase < 0) throw new Error('Controlled archetype heap budget is invalid.');
  if (!Number.isFinite(value.maximumSerializedPayloadBytesPerCase) || value.maximumSerializedPayloadBytesPerCase < 0) throw new Error('Controlled archetype payload budget is invalid.');
}

function isHash(value: unknown): value is string {
  return typeof value === 'string' && /^[0-9a-f]{16}$/.test(value);
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
