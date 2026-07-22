import { CAUSAL_INPUT_AUTHORITY_REGISTRY } from './inputAuthority';
import { cloneAndDeepFreeze } from './immutable';
import type { CausalGeologyInputId } from './types';

export const W1_06B_CANONICAL_DIRECT_INPUT_AXES: readonly CausalGeologyInputId[] = Object.freeze([
  'planet.radius',
  'planet.density',
  'star.luminosity',
  'orbit.distance',
  'climate.declared-albedo',
  'climate.declared-greenhouse',
  'inventory.water',
  'inventory.volatiles',
  'thermal.age',
  'thermal.primordial-heat',
  'thermal.radiogenic-heat',
  'thermal.tidal-heating',
]);

export type CausalThresholdRelationV1 =
  | 'INCREASE'
  | 'DECREASE'
  | 'NONDECREASING'
  | 'NONINCREASING'
  | 'STABLE'
  | 'UNKNOWN';

export type CausalThresholdEvidenceStatusV1 = 'REVIEWED' | 'RESEARCH_REQUIRED';

export interface CausalShadowThresholdCaseV1 {
  readonly schemaVersion: 1;
  readonly caseId: string;
  readonly rootSeed: string;
  readonly axis: CausalGeologyInputId;
  readonly unit: string;
  readonly scaleId: string;
  readonly values: {
    readonly low: number;
    readonly reference: number;
    readonly high: number;
  };
  readonly downstreamTarget: string;
  readonly expectedRelation: CausalThresholdRelationV1;
  readonly relationStatus: CausalThresholdEvidenceStatusV1;
  readonly rationale: string;
  readonly limitations: readonly string[];
}

export interface CausalShadowThresholdCorpusV1 {
  readonly schemaVersion: 1;
  readonly corpusVersion: 'W1_06B1_DIRECT_INPUT_THRESHOLD_CORPUS_V1';
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly cases: readonly CausalShadowThresholdCaseV1[];
}

export interface CausalShadowThresholdExecutionV1 {
  readonly schemaVersion: 1;
  readonly caseId: string;
  readonly rootSeed: string;
  readonly axis: CausalGeologyInputId;
  readonly unit: string;
  readonly scaleId: string;
  readonly lowValue: number;
  readonly referenceValue: number;
  readonly highValue: number;
  readonly downstreamTarget: string;
  readonly expectedRelation: CausalThresholdRelationV1;
  readonly relationStatus: CausalThresholdEvidenceStatusV1;
  readonly inputHashes: {
    readonly low: string;
    readonly reference: string;
    readonly high: string;
  };
  readonly replayStable: boolean;
  readonly isolatedAxisChange: boolean;
  readonly durationMilliseconds: number;
  readonly serializedPayloadBytes: number;
}

export interface CausalShadowThresholdBudgetV1 {
  readonly schemaVersion: 1;
  readonly budgetVersion: string;
  readonly maximumDurationMillisecondsPerCase: number;
  readonly maximumSerializedPayloadBytesPerCase: number;
}

export const W1_06B1_DIRECT_INPUT_THRESHOLD_BUDGET_V1: CausalShadowThresholdBudgetV1 = Object.freeze({
  schemaVersion: 1,
  budgetVersion: 'W1_06B1_DIRECT_INPUT_THRESHOLD_BUDGET_V1',
  maximumDurationMillisecondsPerCase: 1_000,
  maximumSerializedPayloadBytesPerCase: 1_048_576,
});

export interface CausalShadowThresholdCoverageReportV1 {
  readonly schemaVersion: 1;
  readonly reportVersion: 'W1_06B1_DIRECT_INPUT_THRESHOLD_REPORT_V1';
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly scientificStatus: 'PARTIAL' | 'FAILED';
  readonly softwareGatePass: boolean;
  readonly caseCount: number;
  readonly coverage: {
    readonly coveredAxes: readonly CausalGeologyInputId[];
    readonly missingAxes: readonly CausalGeologyInputId[];
    readonly duplicateAxes: readonly CausalGeologyInputId[];
  };
  readonly determinism: {
    readonly replayFailureCaseIds: readonly string[];
    readonly hashCollisionCaseIds: readonly string[];
  };
  readonly isolation: {
    readonly failureCaseIds: readonly string[];
  };
  readonly evidence: {
    readonly reviewedAxes: readonly CausalGeologyInputId[];
    readonly researchRequiredAxes: readonly CausalGeologyInputId[];
  };
  readonly performance: {
    readonly budgetVersion: string;
    readonly overBudgetCaseIds: readonly string[];
  };
  readonly warnings: readonly string[];
  readonly limitations: readonly string[];
}

const AUTHORITY_BY_ID = new Map(CAUSAL_INPUT_AUTHORITY_REGISTRY.map((entry) => [entry.inputId, entry]));
const CANONICAL_AXIS_SET = new Set<CausalGeologyInputId>(W1_06B_CANONICAL_DIRECT_INPUT_AXES);

export function validateCausalShadowThresholdCorpus(value: unknown): asserts value is CausalShadowThresholdCorpusV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Causal shadow threshold corpus must be an object.');
  const corpus = value as Partial<CausalShadowThresholdCorpusV1>;
  if (
    corpus.schemaVersion !== 1
    || corpus.corpusVersion !== 'W1_06B1_DIRECT_INPUT_THRESHOLD_CORPUS_V1'
    || corpus.authorityMode !== 'CAUSAL_SHADOW'
    || corpus.physicalGeneratorAuthority !== 'LEGACY'
  ) throw new Error('Unsupported causal shadow threshold corpus.');
  if (!Array.isArray(corpus.cases) || corpus.cases.length === 0) throw new Error('Causal shadow threshold corpus requires cases.');

  const caseIds = new Set<string>();
  const rootSeeds = new Set<string>();
  const axes = new Set<CausalGeologyInputId>();
  for (const candidate of corpus.cases) {
    validateThresholdCase(candidate);
    if (caseIds.has(candidate.caseId)) throw new Error(`Duplicate causal threshold case ${candidate.caseId}.`);
    if (rootSeeds.has(candidate.rootSeed)) throw new Error(`Duplicate causal threshold root seed ${candidate.rootSeed}.`);
    if (axes.has(candidate.axis)) throw new Error(`Duplicate causal threshold axis ${candidate.axis}.`);
    caseIds.add(candidate.caseId);
    rootSeeds.add(candidate.rootSeed);
    axes.add(candidate.axis);
  }
}

export function createCausalShadowThresholdCoverageReport(
  executions: readonly CausalShadowThresholdExecutionV1[],
  budget: CausalShadowThresholdBudgetV1 = W1_06B1_DIRECT_INPUT_THRESHOLD_BUDGET_V1,
): CausalShadowThresholdCoverageReportV1 {
  validateBudget(budget);
  if (!Array.isArray(executions) || executions.length === 0) throw new Error('Causal shadow threshold coverage requires executions.');

  const caseIds = new Set<string>();
  const rootSeeds = new Set<string>();
  const axisCounts = new Map<CausalGeologyInputId, number>();
  for (const execution of executions) {
    validateThresholdExecution(execution);
    if (caseIds.has(execution.caseId)) throw new Error(`Duplicate causal threshold execution ${execution.caseId}.`);
    if (rootSeeds.has(execution.rootSeed)) throw new Error(`Duplicate causal threshold execution seed ${execution.rootSeed}.`);
    caseIds.add(execution.caseId);
    rootSeeds.add(execution.rootSeed);
    axisCounts.set(execution.axis, (axisCounts.get(execution.axis) ?? 0) + 1);
  }

  const ordered = [...executions].sort((a, b) => compareStableText(a.caseId, b.caseId));
  const coveredAxes = W1_06B_CANONICAL_DIRECT_INPUT_AXES.filter((axis) => axisCounts.has(axis));
  const missingAxes = W1_06B_CANONICAL_DIRECT_INPUT_AXES.filter((axis) => !axisCounts.has(axis));
  const duplicateAxes = W1_06B_CANONICAL_DIRECT_INPUT_AXES.filter((axis) => (axisCounts.get(axis) ?? 0) > 1);
  const replayFailureCaseIds = ordered.filter((entry) => !entry.replayStable).map((entry) => entry.caseId);
  const hashCollisionCaseIds = ordered
    .filter((entry) => new Set(Object.values(entry.inputHashes)).size !== 3)
    .map((entry) => entry.caseId);
  const isolationFailureCaseIds = ordered.filter((entry) => !entry.isolatedAxisChange).map((entry) => entry.caseId);
  const overBudgetCaseIds = ordered
    .filter((entry) =>
      entry.durationMilliseconds > budget.maximumDurationMillisecondsPerCase
      || entry.serializedPayloadBytes > budget.maximumSerializedPayloadBytesPerCase)
    .map((entry) => entry.caseId);
  const reviewedAxes = ordered
    .filter((entry) => entry.relationStatus === 'REVIEWED')
    .map((entry) => entry.axis)
    .sort(compareStableText);
  const researchRequiredAxes = ordered
    .filter((entry) => entry.relationStatus === 'RESEARCH_REQUIRED')
    .map((entry) => entry.axis)
    .sort(compareStableText);

  const softwareGatePass =
    executions.length === W1_06B_CANONICAL_DIRECT_INPUT_AXES.length
    && missingAxes.length === 0
    && duplicateAxes.length === 0
    && replayFailureCaseIds.length === 0
    && hashCollisionCaseIds.length === 0
    && isolationFailureCaseIds.length === 0
    && overBudgetCaseIds.length === 0;

  const warnings: string[] = [];
  if (missingAxes.length) warnings.push(`Missing canonical direct-input axes: ${missingAxes.join(', ')}.`);
  if (duplicateAxes.length) warnings.push(`Duplicate direct-input axes: ${duplicateAxes.join(', ')}.`);
  if (replayFailureCaseIds.length) warnings.push(`Replay failures: ${replayFailureCaseIds.join(', ')}.`);
  if (hashCollisionCaseIds.length) warnings.push(`Threshold input hash collisions: ${hashCollisionCaseIds.join(', ')}.`);
  if (isolationFailureCaseIds.length) warnings.push(`Threshold isolation failures: ${isolationFailureCaseIds.join(', ')}.`);
  if (overBudgetCaseIds.length) warnings.push(`Threshold budget failures: ${overBudgetCaseIds.join(', ')}.`);
  if (researchRequiredAxes.length) warnings.push(`${researchRequiredAxes.length} downstream threshold relations remain research-required.`);

  return cloneAndDeepFreeze({
    schemaVersion: 1,
    reportVersion: 'W1_06B1_DIRECT_INPUT_THRESHOLD_REPORT_V1',
    authorityMode: 'CAUSAL_SHADOW',
    physicalGeneratorAuthority: 'LEGACY',
    scientificStatus: softwareGatePass ? 'PARTIAL' : 'FAILED',
    softwareGatePass,
    caseCount: ordered.length,
    coverage: { coveredAxes, missingAxes, duplicateAxes },
    determinism: { replayFailureCaseIds, hashCollisionCaseIds },
    isolation: { failureCaseIds: isolationFailureCaseIds },
    evidence: { reviewedAxes, researchRequiredAxes },
    performance: { budgetVersion: budget.budgetVersion, overBudgetCaseIds },
    warnings,
    limitations: [
      'W1-06B1 proves canonical direct-input threshold construction, deterministic replay, and one-axis isolation only.',
      'It does not claim reviewed downstream monotonic behavior for premise, interior, regime history, or geologic spine.',
      'No causal or physical world field is written, and ordinary LEGACY generation is not invoked.',
      'The W1-06A display-axis aliases remain unchanged so its committed artifact contract stays reproducible.',
    ],
  });
}

export function validateCausalShadowThresholdCoverageReport(value: unknown): asserts value is CausalShadowThresholdCoverageReportV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Causal threshold coverage report must be an object.');
  const report = value as Partial<CausalShadowThresholdCoverageReportV1>;
  if (
    report.schemaVersion !== 1
    || report.reportVersion !== 'W1_06B1_DIRECT_INPUT_THRESHOLD_REPORT_V1'
    || report.authorityMode !== 'CAUSAL_SHADOW'
    || report.physicalGeneratorAuthority !== 'LEGACY'
  ) throw new Error('Unsupported causal threshold coverage report.');
  if (report.scientificStatus !== 'PARTIAL' && report.scientificStatus !== 'FAILED') throw new Error('Causal threshold coverage scientific status is invalid.');
  if (typeof report.softwareGatePass !== 'boolean' || !Number.isInteger(report.caseCount) || (report.caseCount ?? 0) < 1) {
    throw new Error('Causal threshold coverage report gate state is invalid.');
  }
  if (!report.coverage || !report.determinism || !report.isolation || !report.evidence || !report.performance) {
    throw new Error('Causal threshold coverage report is incomplete.');
  }
}

function validateThresholdCase(value: CausalShadowThresholdCaseV1): void {
  if (!value || typeof value !== 'object') throw new Error('Causal threshold case must be an object.');
  if (value.schemaVersion !== 1 || !isText(value.caseId) || !isText(value.rootSeed)) throw new Error('Causal threshold case identity is invalid.');
  validateAxisContract(value.axis, value.unit, value.scaleId);
  validateTriplet(value.values.low, value.values.reference, value.values.high, value.caseId);
  if (!isText(value.downstreamTarget) || !isText(value.rationale)) throw new Error(`Causal threshold case ${value.caseId} explanation is incomplete.`);
  if (!['INCREASE', 'DECREASE', 'NONDECREASING', 'NONINCREASING', 'STABLE', 'UNKNOWN'].includes(value.expectedRelation)) {
    throw new Error(`Causal threshold case ${value.caseId} relation is invalid.`);
  }
  if (value.relationStatus !== 'REVIEWED' && value.relationStatus !== 'RESEARCH_REQUIRED') {
    throw new Error(`Causal threshold case ${value.caseId} evidence status is invalid.`);
  }
  assertTextArray(value.limitations, `Causal threshold case ${value.caseId} limitations`);
  if (value.relationStatus === 'RESEARCH_REQUIRED' && value.expectedRelation !== 'UNKNOWN') {
    throw new Error(`Research-required threshold case ${value.caseId} must not invent a directional relation.`);
  }
}

function validateThresholdExecution(value: CausalShadowThresholdExecutionV1): void {
  if (!value || typeof value !== 'object') throw new Error('Causal threshold execution must be an object.');
  if (value.schemaVersion !== 1 || !isText(value.caseId) || !isText(value.rootSeed)) throw new Error('Causal threshold execution identity is invalid.');
  validateAxisContract(value.axis, value.unit, value.scaleId);
  validateTriplet(value.lowValue, value.referenceValue, value.highValue, value.caseId);
  if (!isText(value.downstreamTarget)) throw new Error(`Causal threshold execution ${value.caseId} target is invalid.`);
  if (!['INCREASE', 'DECREASE', 'NONDECREASING', 'NONINCREASING', 'STABLE', 'UNKNOWN'].includes(value.expectedRelation)) {
    throw new Error(`Causal threshold execution ${value.caseId} relation is invalid.`);
  }
  if (value.relationStatus !== 'REVIEWED' && value.relationStatus !== 'RESEARCH_REQUIRED') {
    throw new Error(`Causal threshold execution ${value.caseId} evidence status is invalid.`);
  }
  for (const [label, hash] of Object.entries(value.inputHashes)) if (!isHash(hash)) throw new Error(`Causal threshold execution ${value.caseId} ${label} hash is invalid.`);
  if (typeof value.replayStable !== 'boolean' || typeof value.isolatedAxisChange !== 'boolean') throw new Error(`Causal threshold execution ${value.caseId} boolean evidence is invalid.`);
  if (!Number.isFinite(value.durationMilliseconds) || value.durationMilliseconds < 0) throw new Error(`Causal threshold execution ${value.caseId} duration is invalid.`);
  if (!Number.isFinite(value.serializedPayloadBytes) || value.serializedPayloadBytes < 0) throw new Error(`Causal threshold execution ${value.caseId} payload size is invalid.`);
}

function validateAxisContract(axis: CausalGeologyInputId, unit: string, scaleId: string): void {
  if (!CANONICAL_AXIS_SET.has(axis)) throw new Error(`Unrecognized W1-06B canonical direct-input axis ${String(axis)}.`);
  const authority = AUTHORITY_BY_ID.get(axis);
  if (!authority || authority.requiredUnit !== unit || authority.requiredScaleId !== scaleId) {
    throw new Error(`W1-06B threshold axis ${axis} does not match its causal input authority contract.`);
  }
}

function validateTriplet(low: number, reference: number, high: number, caseId: string): void {
  if (![low, reference, high].every(Number.isFinite) || !(low < reference && reference < high)) {
    throw new Error(`Causal threshold case ${caseId} must define a strictly ordered finite low/reference/high triplet.`);
  }
}

function validateBudget(value: CausalShadowThresholdBudgetV1): void {
  if (value.schemaVersion !== 1 || !isText(value.budgetVersion)) throw new Error('Causal threshold budget identity is invalid.');
  if (!Number.isFinite(value.maximumDurationMillisecondsPerCase) || value.maximumDurationMillisecondsPerCase < 0) throw new Error('Causal threshold duration budget is invalid.');
  if (!Number.isFinite(value.maximumSerializedPayloadBytesPerCase) || value.maximumSerializedPayloadBytesPerCase < 0) throw new Error('Causal threshold payload budget is invalid.');
}

function isHash(value: unknown): value is string {
  return typeof value === 'string' && /^[0-9a-f]{16}$/.test(value);
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function assertTextArray(value: readonly string[], label: string): void {
  if (!Array.isArray(value) || value.length === 0 || value.some((entry) => !isText(entry))) throw new Error(`${label} must contain non-empty text.`);
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
