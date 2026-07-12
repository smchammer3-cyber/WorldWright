import type { Philox4x32Key } from './philox4x32';
import {
  RANDOM_DERIVATION_VERSION,
  ROOT_SEED_ENCODING,
  type CausalRandomStreamName,
  type RootSeedIdentity,
} from './types';

export const RANDOM_DERIVATION_DOMAIN = 'WorldWright/random/v1' as const;
export const RANDOM_SEED_MIXER = 'fnv1a64-domain-separated-v1' as const;

const FNV64_OFFSET = 0xcbf29ce484222325n;
const FNV64_PRIME = 0x100000001b3n;
const UINT64_MASK = 0xffffffffffffffffn;
const encoder = new TextEncoder();

export function createRootSeedIdentity(seed: string | number): RootSeedIdentity {
  if (typeof seed === 'number' && (!Number.isFinite(seed) || !Number.isSafeInteger(seed))) {
    throw new RangeError('Numeric root seed must be a finite safe integer.');
  }
  const exactText = String(seed);
  return Object.freeze({
    exactText,
    encoding: ROOT_SEED_ENCODING,
    fingerprint: `fnv1a64-${fnv1a64Hex(encodeFields(['WorldWright/root-seed/v1', exactText]))}`,
  });
}

export function derivePhiloxKey(
  rootSeed: RootSeedIdentity,
  stream: CausalRandomStreamName,
  streamVersion: number,
  branchSalt?: string,
): Philox4x32Key {
  if (!Number.isSafeInteger(streamVersion) || streamVersion < 1) {
    throw new RangeError('Stream version must be a positive safe integer.');
  }
  const fields = [
    RANDOM_DERIVATION_DOMAIN,
    String(RANDOM_DERIVATION_VERSION),
    rootSeed.encoding,
    rootSeed.exactText,
    stream,
    String(streamVersion),
    branchSalt ?? '',
  ];
  const hash = fnv1a64(encodeFields(fields));
  return [Number(hash & 0xffffffffn) >>> 0, Number((hash >> 32n) & 0xffffffffn) >>> 0];
}

export function fnv1a64Hex(bytes: Uint8Array): string {
  return fnv1a64(bytes).toString(16).padStart(16, '0');
}

export function fnv1a64(bytes: Uint8Array): bigint {
  let hash = FNV64_OFFSET;
  for (const byte of bytes) {
    hash ^= BigInt(byte);
    hash = (hash * FNV64_PRIME) & UINT64_MASK;
  }
  return hash;
}

export function encodeFields(fields: readonly string[]): Uint8Array {
  const chunks: Uint8Array[] = [];
  let length = 0;
  for (const field of fields) {
    const encoded = encoder.encode(field);
    const prefix = uint32Bytes(encoded.length);
    chunks.push(prefix, encoded);
    length += prefix.length + encoded.length;
  }
  const output = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.length;
  }
  return output;
}

function uint32Bytes(value: number): Uint8Array {
  if (!Number.isSafeInteger(value) || value < 0 || value > 0xffffffff) {
    throw new RangeError('Encoded field length exceeds uint32 range.');
  }
  return new Uint8Array([
    value & 0xff,
    (value >>> 8) & 0xff,
    (value >>> 16) & 0xff,
    (value >>> 24) & 0xff,
  ]);
}
