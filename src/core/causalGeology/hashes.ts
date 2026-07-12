import { hashCanonicalJson, type DeterministicHash } from '../worldProvenance/hash';

export function hashCausalPayload(contract: string, value: unknown): DeterministicHash {
  if (typeof contract !== 'string' || contract.trim().length === 0) throw new Error('Causal hash contract must be non-empty text.');
  return hashCanonicalJson({ contract, value });
}

export function hashRecordWithoutContentHash(
  contract: string,
  record: Readonly<Record<string, unknown>>,
): DeterministicHash {
  const { contentHash: _contentHash, ...payload } = record;
  return hashCausalPayload(contract, payload);
}

export function deterministicHashEquals(a: DeterministicHash, b: DeterministicHash): boolean {
  return a.algorithm === b.algorithm && a.value === b.value;
}

export function assertDeterministicHash(value: unknown, label: string): asserts value is DeterministicHash {
  if (!value || typeof value !== 'object') throw new Error(`${label} hash is missing.`);
  const candidate = value as Partial<DeterministicHash>;
  if (candidate.algorithm !== 'fnv1a64-canonical-json-v1' || typeof candidate.value !== 'string' || !/^[0-9a-f]{16}$/.test(candidate.value)) {
    throw new Error(`${label} hash is invalid.`);
  }
}
