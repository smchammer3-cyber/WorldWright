import { canonicalJsonStringify } from '../worldProvenance/canonicalJson';
import { hashCanonicalJson } from '../worldProvenance/hash';
import type {
  CausalBranchValue,
  ContradictionRecordV1,
  ContradictionResolutionV1,
  ContradictionSeverity,
  ScientificClaimV1,
} from './types';

export function detectClaimContradictions(
  claims: readonly ScientificClaimV1[],
): readonly ContradictionRecordV1[] {
  const activeClaims = claims.filter((claim) => {
    validateScientificClaim(claim);
    return claim.status === 'ACTIVE';
  });
  const bySubject = new Map<string, ScientificClaimV1[]>();
  for (const claim of activeClaims) {
    const group = bySubject.get(claim.subject) ?? [];
    group.push(claim);
    bySubject.set(claim.subject, group);
  }

  const contradictions: ContradictionRecordV1[] = [];
  for (const subject of [...bySubject.keys()].sort()) {
    const subjectClaims = [...(bySubject.get(subject) ?? [])].sort((a, b) => a.id.localeCompare(b.id));
    const valueGroups = new Map<string, { value: CausalBranchValue; claims: ScientificClaimV1[] }>();
    for (const claim of subjectClaims) {
      const key = canonicalJsonStringify(claim.value);
      const group = valueGroups.get(key) ?? { value: claim.value, claims: [] };
      group.claims.push(claim);
      valueGroups.set(key, group);
    }
    if (valueGroups.size < 2) continue;

    const claimIds = Object.freeze(subjectClaims.map((claim) => claim.id));
    const evidenceIds = Object.freeze([...new Set(subjectClaims.flatMap((claim) => claim.evidenceIds))].sort());
    const observedValues = Object.freeze([...valueGroups.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, group]) => structuredClone(group.value)));
    const severity = contradictionSeverity(subjectClaims);
    const idHash = hashCanonicalJson({ contract: 'WorldWright/contradiction/v1', subject, claimIds, observedValues });

    contradictions.push(Object.freeze({
      schemaVersion: 1,
      id: `contradiction_${idHash.value}`,
      subject,
      severity,
      status: 'OPEN',
      claimIds,
      evidenceIds,
      observedValues,
      message: `${subject} has ${valueGroups.size} incompatible active claim values.`,
    }));
  }
  return Object.freeze(contradictions);
}

export function resolveContradiction(
  contradiction: ContradictionRecordV1,
  resolution: ContradictionResolutionV1,
): ContradictionRecordV1 {
  if (contradiction.status !== 'OPEN') throw new Error(`Contradiction ${contradiction.id} is not open.`);
  if (!contradiction.claimIds.includes(resolution.selectedClaimId)) {
    throw new Error(`Resolution claim ${resolution.selectedClaimId} is not part of contradiction ${contradiction.id}.`);
  }
  if (typeof resolution.rationale !== 'string' || resolution.rationale.trim().length === 0) {
    throw new Error('Contradiction resolution rationale must be non-empty text.');
  }
  return Object.freeze({
    ...contradiction,
    status: 'RESOLVED',
    resolution: Object.freeze({ ...resolution }),
  });
}

export function dismissContradiction(
  contradiction: ContradictionRecordV1,
  rationale: string,
): ContradictionRecordV1 {
  if (contradiction.status !== 'OPEN') throw new Error(`Contradiction ${contradiction.id} is not open.`);
  if (typeof rationale !== 'string' || rationale.trim().length === 0) throw new Error('Dismissal rationale must be non-empty text.');
  return Object.freeze({
    ...contradiction,
    status: 'DISMISSED',
    resolution: Object.freeze({ selectedClaimId: contradiction.claimIds[0], rationale }),
  });
}

export function validateScientificClaim<T extends CausalBranchValue>(claim: ScientificClaimV1<T>): void {
  if (!claim || typeof claim !== 'object' || claim.schemaVersion !== 1) throw new Error('Unsupported scientific claim schema.');
  assertNonEmpty(claim.id, 'Claim ID');
  assertNonEmpty(claim.subject, 'Claim subject');
  assertNonEmpty(claim.source, 'Claim source');
  if (!Number.isFinite(claim.confidence) || claim.confidence < 0 || claim.confidence > 1) {
    throw new RangeError(`Claim ${claim.id} confidence must be within [0, 1].`);
  }
  if (!Array.isArray(claim.evidenceIds) || !claim.evidenceIds.every(isNonEmptyString)) throw new Error(`Claim ${claim.id} evidence IDs are invalid.`);
  if (claim.status !== 'ACTIVE' && claim.status !== 'RETRACTED') throw new Error(`Claim ${claim.id} status is invalid.`);
  canonicalJsonStringify(claim.value);
}

function contradictionSeverity(claims: readonly ScientificClaimV1[]): ContradictionSeverity {
  const highConfidenceClaims = claims.filter((claim) => claim.confidence >= 0.8).length;
  if (highConfidenceClaims >= 2) return 'HIGH';
  if (claims.filter((claim) => claim.confidence >= 0.5).length >= 2) return 'MEDIUM';
  return 'LOW';
}

function assertNonEmpty(value: string, label: string): void {
  if (typeof value !== 'string' || value.trim().length === 0) throw new Error(`${label} must be non-empty text.`);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
