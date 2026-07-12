import { canonicalJsonStringify } from './canonicalJson';

export const DETERMINISTIC_HASH_ALGORITHM = 'fnv1a64-canonical-json-v1' as const;

export interface DeterministicHash {
  readonly algorithm: typeof DETERMINISTIC_HASH_ALGORITHM;
  readonly value: string;
}

const OFFSET = 0xcbf29ce484222325n;
const PRIME = 0x100000001b3n;
const MASK = 0xffffffffffffffffn;
const encoder = new TextEncoder();

export function hashCanonicalJson(value: unknown): DeterministicHash {
  const canonical = canonicalJsonStringify(value);
  let hash = OFFSET;
  for (const byte of encoder.encode(canonical)) {
    hash ^= BigInt(byte);
    hash = (hash * PRIME) & MASK;
  }
  return Object.freeze({
    algorithm: DETERMINISTIC_HASH_ALGORITHM,
    value: hash.toString(16).padStart(16, '0'),
  });
}
