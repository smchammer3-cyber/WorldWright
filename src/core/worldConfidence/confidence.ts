import { getRandomStreamDefinition } from '../worldRandom/streamRegistry';
import { canonicalJsonStringify } from '../worldProvenance/canonicalJson';
import { hashCanonicalJson } from '../worldProvenance/hash';
import type {
  CausalConfidenceLedgerV1,
  ConfidenceAssessmentV1,
  ConfidenceBand,
  ConfidenceEvidenceV1,
  ContradictionRecordV1,
  WeightedBranchResolutionV1,
} from './types';

interface SourceContribution {
  support: number;
  opposition: number;
  neutral: number;
}

export function createConfidenceAssessment(
  subject: string,
  evidence: readonly ConfidenceEvidenceV1[],
  contradictions: readonly ContradictionRecordV1[] = [],
): ConfidenceAssessmentV1 {
  assertNonEmpty(subject, 'Confidence subject');
  const seenEvidence = new Set<string>();
  const contributions = new Map<string, SourceContribution>();

  for (const item of evidence) {
    validateConfidenceEvidence(item);
    if (item.subject !== subject) throw new Error(`Evidence ${item.id} belongs to ${item.subject}, not ${subject}.`);
    if (seenEvidence.has(item.id)) throw new Error(`Duplicate confidence evidence ID: ${item.id}`);
    seenEvidence.add(item.id);
    const contribution = contributions.get(item.source) ?? { support: 0, opposition: 0, neutral: 0 };
    const strength = item.weight * item.reliability;
    if (item.polarity === 'SUPPORTS') contribution.support += strength;
    else if (item.polarity === 'OPPOSES') contribution.opposition += strength;
    else contribution.neutral += strength;
    contributions.set(item.source, contribution);
  }

  let supportStrength = 0;
  let oppositionStrength = 0;
  let neutralStrength = 0;
  let contributingSourceCount = 0;
  for (const contribution of contributions.values()) {
    const rawTotal = contribution.support + contribution.opposition + contribution.neutral;
    if (rawTotal <= 0) continue;
    contributingSourceCount += 1;
    const scale = rawTotal > 1 ? 1 / rawTotal : 1;
    supportStrength += contribution.support * scale;
    oppositionStrength += contribution.opposition * scale;
    neutralStrength += contribution.neutral * scale;
  }

  const relevantContradictions = contradictions.filter((record) => record.subject === subject && record.status === 'OPEN');
  const seenContradictions = new Set<string>();
  for (const contradiction of relevantContradictions) {
    validateContradictionShape(contradiction);
    if (seenContradictions.has(contradiction.id)) throw new Error(`Duplicate contradiction ID: ${contradiction.id}`);
    seenContradictions.add(contradiction.id);
  }

  const totalStrength = supportStrength + oppositionStrength + neutralStrength;
  const probability = totalStrength === 0
    ? 0.5
    : clamp01((supportStrength + neutralStrength * 0.5) / totalStrength);
  const evidenceConfidence = totalStrength === 0 ? 0 : totalStrength / (totalStrength + 1);
  const contradictionLoad = relevantContradictions.reduce((sum, record) => sum + severityWeight(record.severity), 0);
  const confidence = clamp01(evidenceConfidence / (1 + contradictionLoad));
  const band = confidenceBand(confidence);
  const evidenceIds = Object.freeze([...seenEvidence].sort(compareStableText));
  const contradictionIds = Object.freeze([...seenContradictions].sort(compareStableText));

  return Object.freeze({
    schemaVersion: 1,
    subject,
    probability,
    confidence,
    band,
    supportStrength,
    oppositionStrength,
    neutralStrength,
    evidenceIds,
    contradictionIds,
    rationale: evidence.length === 0
      ? 'No evidence has been recorded; probability remains neutral and confidence is unknown.'
      : `Aggregated ${evidence.length} evidence record(s) across ${contributingSourceCount} contributing source(s); ${relevantContradictions.length} open contradiction(s) reduce confidence.`,
  });
}

export function validateConfidenceEvidence(value: ConfidenceEvidenceV1): void {
  if (!value || typeof value !== 'object' || value.schemaVersion !== 1) throw new Error('Unsupported confidence evidence schema.');
  assertNonEmpty(value.id, 'Evidence ID');
  assertNonEmpty(value.subject, 'Evidence subject');
  assertNonEmpty(value.source, 'Evidence source');
  if (!['OBSERVATION', 'DERIVATION', 'CONSTRAINT', 'ASSUMPTION', 'LEGACY_COMPATIBILITY'].includes(value.kind)) {
    throw new Error(`Unsupported evidence kind: ${String(value.kind)}`);
  }
  if (!['SUPPORTS', 'OPPOSES', 'NEUTRAL'].includes(value.polarity)) {
    throw new Error(`Unsupported evidence polarity: ${String(value.polarity)}`);
  }
  assertUnit(value.weight, `Evidence ${value.id} weight`);
  assertUnit(value.reliability, `Evidence ${value.id} reliability`);
  if (value.note !== undefined && (typeof value.note !== 'string' || value.note.trim().length === 0)) {
    throw new Error(`Evidence ${value.id} note must be non-empty text when present.`);
  }
}

export function confidenceBand(confidence: number): ConfidenceBand {
  assertUnit(confidence, 'Confidence');
  if (confidence === 0) return 'UNKNOWN';
  if (confidence < 0.35) return 'LOW';
  if (confidence < 0.65) return 'MEDIUM';
  if (confidence < 0.9) return 'HIGH';
  return confidence === 1 ? 'CERTAIN' : 'HIGH';
}

export function createEmptyCausalConfidenceLedger(): CausalConfidenceLedgerV1 {
  return Object.freeze({
    schemaVersion: 1,
    evidence: Object.freeze([]),
    assessments: Object.freeze([]),
    branchResolutions: Object.freeze([]),
    contradictions: Object.freeze([]),
  });
}

export function validateCausalConfidenceLedger(value: unknown): asserts value is CausalConfidenceLedgerV1 {
  if (!value || typeof value !== 'object') throw new Error('Confidence ledger must be an object.');
  const candidate = value as Partial<CausalConfidenceLedgerV1>;
  if (candidate.schemaVersion !== 1
    || !Array.isArray(candidate.evidence)
    || !Array.isArray(candidate.assessments)
    || !Array.isArray(candidate.branchResolutions)
    || !Array.isArray(candidate.contradictions)) {
    throw new Error('Unsupported confidence ledger schema.');
  }

  const evidence = candidate.evidence as readonly ConfidenceEvidenceV1[];
  const assessments = candidate.assessments as readonly ConfidenceAssessmentV1[];
  const branchResolutions = candidate.branchResolutions as readonly WeightedBranchResolutionV1[];
  const contradictions = candidate.contradictions as readonly ContradictionRecordV1[];

  const evidenceById = new Map<string, ConfidenceEvidenceV1>();
  for (const item of evidence) {
    validateConfidenceEvidence(item);
    if (evidenceById.has(item.id)) throw new Error(`Duplicate confidence evidence ID: ${item.id}`);
    evidenceById.set(item.id, item);
  }

  const contradictionById = new Map<string, ContradictionRecordV1>();
  for (const contradiction of contradictions) {
    validateContradictionShape(contradiction);
    if (contradictionById.has(contradiction.id)) throw new Error(`Duplicate contradiction ID: ${contradiction.id}`);
    contradictionById.set(contradiction.id, contradiction);
    for (const evidenceId of contradiction.evidenceIds) {
      const linkedEvidence = evidenceById.get(evidenceId);
      if (!linkedEvidence) throw new Error(`Contradiction ${contradiction.id} references missing evidence ${evidenceId}.`);
      if (linkedEvidence.subject !== contradiction.subject) {
        throw new Error(`Contradiction ${contradiction.id} references evidence for ${linkedEvidence.subject}.`);
      }
    }
  }

  const assessmentSubjects = new Set<string>();
  for (const assessment of assessments) {
    validateAssessmentShape(assessment);
    if (assessmentSubjects.has(assessment.subject)) throw new Error(`Duplicate confidence assessment subject: ${assessment.subject}`);
    assessmentSubjects.add(assessment.subject);
    const linkedEvidence = assessment.evidenceIds.map((id) => {
      const item = evidenceById.get(id);
      if (!item) throw new Error(`Assessment ${assessment.subject} references missing evidence ${id}.`);
      if (item.subject !== assessment.subject) throw new Error(`Assessment ${assessment.subject} references evidence for ${item.subject}.`);
      return item;
    });
    const linkedContradictions = assessment.contradictionIds.map((id) => {
      const contradiction = contradictionById.get(id);
      if (!contradiction) throw new Error(`Assessment ${assessment.subject} references missing contradiction ${id}.`);
      if (contradiction.subject !== assessment.subject) throw new Error(`Assessment ${assessment.subject} references contradiction for ${contradiction.subject}.`);
      if (contradiction.status !== 'OPEN') throw new Error(`Assessment ${assessment.subject} references a non-open contradiction ${id}.`);
      return contradiction;
    });
    const recomputed = createConfidenceAssessment(assessment.subject, linkedEvidence, linkedContradictions);
    assertAssessmentMatches(assessment, recomputed);
  }

  const branchIds = new Set<string>();
  for (const resolution of branchResolutions) {
    validateBranchResolutionShape(resolution);
    if (branchIds.has(resolution.branchId)) throw new Error(`Duplicate weighted branch resolution: ${resolution.branchId}`);
    branchIds.add(resolution.branchId);
    for (const evidenceId of resolution.evidenceIds) {
      if (!evidenceById.has(evidenceId)) throw new Error(`Branch ${resolution.branchId} references missing evidence ${evidenceId}.`);
    }
  }
}

export function isCausalConfidenceLedgerV1(value: unknown): value is CausalConfidenceLedgerV1 {
  try {
    validateCausalConfidenceLedger(value);
    return true;
  } catch {
    return false;
  }
}

function validateAssessmentShape(value: ConfidenceAssessmentV1): void {
  if (!value || value.schemaVersion !== 1) throw new Error('Unsupported confidence assessment schema.');
  assertNonEmpty(value.subject, 'Assessment subject');
  assertUnit(value.probability, 'Assessment probability');
  assertUnit(value.confidence, 'Assessment confidence');
  if (confidenceBand(value.confidence) !== value.band) throw new Error(`Assessment ${value.subject} has an inconsistent confidence band.`);
  for (const strength of [value.supportStrength, value.oppositionStrength, value.neutralStrength]) {
    if (!Number.isFinite(strength) || strength < 0) throw new Error(`Assessment ${value.subject} contains invalid evidence strength.`);
  }
  assertSortedUniqueNonEmptyStrings(value.evidenceIds, 'Assessment evidence IDs');
  assertSortedUniqueNonEmptyStrings(value.contradictionIds, 'Assessment contradiction IDs');
  assertNonEmpty(value.rationale, 'Assessment rationale');
}

function validateContradictionShape(value: ContradictionRecordV1): void {
  if (!value || value.schemaVersion !== 1) throw new Error('Unsupported contradiction schema.');
  assertNonEmpty(value.id, 'Contradiction ID');
  assertNonEmpty(value.subject, 'Contradiction subject');
  if (!['LOW', 'MEDIUM', 'HIGH'].includes(value.severity)) throw new Error('Invalid contradiction severity.');
  if (!['OPEN', 'RESOLVED', 'DISMISSED'].includes(value.status)) throw new Error('Invalid contradiction status.');
  assertSortedUniqueNonEmptyStrings(value.claimIds, 'Contradiction claim IDs', 2);
  assertSortedUniqueNonEmptyStrings(value.evidenceIds, 'Contradiction evidence IDs');
  if (!Array.isArray(value.observedValues) || value.observedValues.length < 2) throw new Error('Contradiction observed values are invalid.');
  const canonicalValues = value.observedValues.map((entry) => canonicalJsonStringify(entry));
  if (new Set(canonicalValues).size !== canonicalValues.length) throw new Error('Contradiction observed values contain duplicates.');
  if (!arraysEqual(canonicalValues, [...canonicalValues].sort(compareStableText))) throw new Error('Contradiction observed values are not canonically ordered.');
  assertNonEmpty(value.message, 'Contradiction message');

  if (value.status === 'OPEN') {
    if (value.resolution || value.dismissal) throw new Error('Open contradiction cannot have a resolution or dismissal.');
  } else if (value.status === 'RESOLVED') {
    if (!value.resolution || value.dismissal) throw new Error('Resolved contradiction has invalid disposition fields.');
    assertNonEmpty(value.resolution.selectedClaimId, 'Selected claim ID');
    assertNonEmpty(value.resolution.rationale, 'Resolution rationale');
    if (!value.claimIds.includes(value.resolution.selectedClaimId)) throw new Error('Resolved contradiction selected an unrelated claim.');
  } else {
    if (!value.dismissal || value.resolution) throw new Error('Dismissed contradiction has invalid disposition fields.');
    assertNonEmpty(value.dismissal.rationale, 'Dismissal rationale');
  }

  const expectedId = `contradiction_${hashCanonicalJson({
    contract: 'WorldWright/contradiction/v1',
    subject: value.subject,
    claimIds: value.claimIds,
    observedValues: value.observedValues,
  }).value}`;
  if (value.id !== expectedId) throw new Error(`Contradiction ${value.id} has an unstable identity; expected ${expectedId}.`);
}

function validateBranchResolutionShape(value: WeightedBranchResolutionV1): void {
  if (!value || value.schemaVersion !== 1) throw new Error('Unsupported branch-resolution schema.');
  assertNonEmpty(value.branchId, 'Branch ID');
  getRandomStreamDefinition(value.stream);
  if (!Array.isArray(value.scope) || value.scope.length < 2) throw new Error('Branch scope is invalid.');
  for (let index = 0; index < value.scope.length; index += 1) {
    const part = value.scope[index];
    if (typeof part === 'string') continue;
    if (typeof part === 'number' && Number.isSafeInteger(part)) continue;
    throw new Error(`Branch scope part ${index} is invalid.`);
  }
  if (value.scope[value.scope.length - 2] !== value.branchId || value.scope[value.scope.length - 1] !== 'weighted-branch-v1') {
    throw new Error(`Branch ${value.branchId} scope does not preserve its deterministic identity.`);
  }
  if (value.draw !== 'selection') throw new Error(`Branch ${value.branchId} has an invalid draw identity.`);
  assertUnitOpenUpper(value.randomUnit, 'Branch random unit');
  if (!Number.isFinite(value.totalWeight) || value.totalWeight <= 0) throw new Error('Branch total weight must be positive.');
  assertNonEmpty(value.chosenOptionId, 'Chosen option ID');
  if (!Array.isArray(value.normalizedWeights) || value.normalizedWeights.length === 0) throw new Error('Branch normalized weights are missing.');
  const optionIds: string[] = [];
  let chosenProbability: number | undefined;
  let sum = 0;
  for (const entry of value.normalizedWeights) {
    if (!entry || typeof entry !== 'object') throw new Error('Branch normalized weight entry is invalid.');
    assertNonEmpty(entry.optionId, 'Branch option ID');
    assertUnit(entry.probability, `Branch option ${entry.optionId} probability`);
    optionIds.push(entry.optionId);
    sum += entry.probability;
    if (entry.optionId === value.chosenOptionId) chosenProbability = entry.probability;
  }
  if (new Set(optionIds).size !== optionIds.length) throw new Error('Branch normalized weights contain duplicate option IDs.');
  if (!arraysEqual(optionIds, [...optionIds].sort(compareStableText))) throw new Error('Branch normalized weights are not canonically ordered.');
  if (Math.abs(sum - 1) > 1e-12) throw new Error('Branch normalized weights do not sum to one.');
  if (chosenProbability === undefined || chosenProbability <= 0) throw new Error('Chosen branch option is missing or has zero probability.');
  canonicalJsonStringify(value.chosenValue);
  assertSortedUniqueNonEmptyStrings(value.evidenceIds, 'Branch evidence IDs');
}

function assertAssessmentMatches(actual: ConfidenceAssessmentV1, expected: ConfidenceAssessmentV1): void {
  for (const key of ['probability', 'confidence', 'supportStrength', 'oppositionStrength', 'neutralStrength'] as const) {
    if (Math.abs(actual[key] - expected[key]) > 1e-12) throw new Error(`Assessment ${actual.subject} has inconsistent ${key}.`);
  }
  if (actual.band !== expected.band) throw new Error(`Assessment ${actual.subject} has an inconsistent band.`);
  if (!arraysEqual(actual.evidenceIds, expected.evidenceIds)) throw new Error(`Assessment ${actual.subject} has inconsistent evidence references.`);
  if (!arraysEqual(actual.contradictionIds, expected.contradictionIds)) throw new Error(`Assessment ${actual.subject} has inconsistent contradiction references.`);
}

function severityWeight(severity: ContradictionRecordV1['severity']): number {
  if (severity === 'HIGH') return 1;
  if (severity === 'MEDIUM') return 0.5;
  return 0.25;
}

function assertSortedUniqueNonEmptyStrings(values: readonly string[], label: string, minimumLength = 0): void {
  if (!Array.isArray(values) || values.length < minimumLength || !values.every(isNonEmptyString)) throw new Error(`${label} are invalid.`);
  if (new Set(values).size !== values.length) throw new Error(`${label} contain duplicates.`);
  if (!arraysEqual(values, [...values].sort(compareStableText))) throw new Error(`${label} are not canonically ordered.`);
}

function assertUnit(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0 || value > 1) throw new RangeError(`${label} must be within [0, 1].`);
}

function assertUnitOpenUpper(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0 || value >= 1) throw new RangeError(`${label} must be within [0, 1).`);
}

function assertNonEmpty(value: string, label: string): void {
  if (typeof value !== 'string' || value.trim().length === 0) throw new Error(`${label} must be non-empty text.`);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function arraysEqual<T>(a: readonly T[], b: readonly T[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}
