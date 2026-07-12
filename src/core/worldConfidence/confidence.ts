import type {
  CausalConfidenceLedgerV1,
  ConfidenceAssessmentV1,
  ConfidenceBand,
  ConfidenceEvidenceV1,
  ContradictionRecordV1,
} from './types';

export function createConfidenceAssessment(
  subject: string,
  evidence: readonly ConfidenceEvidenceV1[],
  contradictions: readonly ContradictionRecordV1[] = [],
): ConfidenceAssessmentV1 {
  assertNonEmpty(subject, 'Confidence subject');
  const seenEvidence = new Set<string>();
  let supportStrength = 0;
  let oppositionStrength = 0;
  let neutralStrength = 0;

  for (const item of evidence) {
    validateConfidenceEvidence(item);
    if (item.subject !== subject) throw new Error(`Evidence ${item.id} belongs to ${item.subject}, not ${subject}.`);
    if (seenEvidence.has(item.id)) throw new Error(`Duplicate confidence evidence ID: ${item.id}`);
    seenEvidence.add(item.id);
    const strength = item.weight * item.reliability;
    if (item.polarity === 'SUPPORTS') supportStrength += strength;
    else if (item.polarity === 'OPPOSES') oppositionStrength += strength;
    else neutralStrength += strength;
  }

  const relevantContradictions = contradictions.filter((record) => record.subject === subject && record.status === 'OPEN');
  for (const contradiction of relevantContradictions) validateContradictionShape(contradiction);

  const totalStrength = supportStrength + oppositionStrength + neutralStrength;
  const probability = totalStrength === 0
    ? 0.5
    : clamp01((supportStrength + neutralStrength * 0.5) / totalStrength);
  const evidenceConfidence = totalStrength === 0 ? 0 : totalStrength / (totalStrength + 1);
  const contradictionLoad = relevantContradictions.reduce((sum, record) => sum + severityWeight(record.severity), 0);
  const confidence = clamp01(evidenceConfidence / (1 + contradictionLoad));
  const band = confidenceBand(confidence);
  const evidenceIds = Object.freeze([...seenEvidence].sort());
  const contradictionIds = Object.freeze(relevantContradictions.map((record) => record.id).sort());

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
      : `Aggregated ${evidence.length} evidence record(s); ${relevantContradictions.length} open contradiction(s) reduce confidence.`,
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
  if (value.note !== undefined && typeof value.note !== 'string') throw new Error(`Evidence ${value.id} note must be text.`);
}

export function confidenceBand(confidence: number): ConfidenceBand {
  assertUnit(confidence, 'Confidence');
  if (confidence === 0) return 'UNKNOWN';
  if (confidence < 0.35) return 'LOW';
  if (confidence < 0.65) return 'MEDIUM';
  if (confidence < 0.9) return 'HIGH';
  return 'CERTAIN';
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

export function isCausalConfidenceLedgerV1(value: unknown): value is CausalConfidenceLedgerV1 {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<CausalConfidenceLedgerV1>;
  if (candidate.schemaVersion !== 1
    || !Array.isArray(candidate.evidence)
    || !Array.isArray(candidate.assessments)
    || !Array.isArray(candidate.branchResolutions)
    || !Array.isArray(candidate.contradictions)) return false;
  try {
    for (const item of candidate.evidence) validateConfidenceEvidence(item);
    for (const assessment of candidate.assessments) validateAssessmentShape(assessment);
    for (const contradiction of candidate.contradictions) validateContradictionShape(contradiction);
    for (const resolution of candidate.branchResolutions) validateBranchResolutionShape(resolution);
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
  if (!Array.isArray(value.evidenceIds) || !value.evidenceIds.every(isNonEmptyString)) throw new Error('Assessment evidence IDs are invalid.');
  if (!Array.isArray(value.contradictionIds) || !value.contradictionIds.every(isNonEmptyString)) throw new Error('Assessment contradiction IDs are invalid.');
  assertNonEmpty(value.rationale, 'Assessment rationale');
}

function validateContradictionShape(value: ContradictionRecordV1): void {
  if (!value || value.schemaVersion !== 1) throw new Error('Unsupported contradiction schema.');
  assertNonEmpty(value.id, 'Contradiction ID');
  assertNonEmpty(value.subject, 'Contradiction subject');
  if (!['LOW', 'MEDIUM', 'HIGH'].includes(value.severity)) throw new Error('Invalid contradiction severity.');
  if (!['OPEN', 'RESOLVED', 'DISMISSED'].includes(value.status)) throw new Error('Invalid contradiction status.');
  if (!Array.isArray(value.claimIds) || value.claimIds.length < 2 || !value.claimIds.every(isNonEmptyString)) throw new Error('Contradiction claim IDs are invalid.');
  if (!Array.isArray(value.evidenceIds) || !value.evidenceIds.every(isNonEmptyString)) throw new Error('Contradiction evidence IDs are invalid.');
  if (!Array.isArray(value.observedValues) || value.observedValues.length < 2) throw new Error('Contradiction observed values are invalid.');
  assertNonEmpty(value.message, 'Contradiction message');
  if (value.status === 'RESOLVED' && !value.resolution) throw new Error('Resolved contradiction lacks a resolution.');
}

function validateBranchResolutionShape(value: CausalConfidenceLedgerV1['branchResolutions'][number]): void {
  if (!value || value.schemaVersion !== 1) throw new Error('Unsupported branch-resolution schema.');
  assertNonEmpty(value.branchId, 'Branch ID');
  assertUnit(value.randomUnit, 'Branch random unit');
  if (!Number.isFinite(value.totalWeight) || value.totalWeight <= 0) throw new Error('Branch total weight must be positive.');
  assertNonEmpty(value.chosenOptionId, 'Chosen option ID');
  if (!Array.isArray(value.normalizedWeights) || value.normalizedWeights.length === 0) throw new Error('Branch normalized weights are missing.');
  const sum = value.normalizedWeights.reduce((total, entry) => total + entry.probability, 0);
  if (Math.abs(sum - 1) > 1e-12) throw new Error('Branch normalized weights do not sum to one.');
}

function severityWeight(severity: ContradictionRecordV1['severity']): number {
  if (severity === 'HIGH') return 1;
  if (severity === 'MEDIUM') return 0.5;
  return 0.25;
}

function assertUnit(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0 || value > 1) throw new RangeError(`${label} must be within [0, 1].`);
}

function assertNonEmpty(value: string, label: string): void {
  if (typeof value !== 'string' || value.trim().length === 0) throw new Error(`${label} must be non-empty text.`);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}
