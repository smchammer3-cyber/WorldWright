// Philox4x32-10 constants and round structure follow the public Random123
// reference implementation by D. E. Shaw Research.
//
// This module is intentionally world-agnostic. Seed derivation, named streams,
// scopes, and provenance belong to later C02 layers.

export const PHILOX4X32_ALGORITHM = 'philox4x32-10' as const;
export const PHILOX4X32_ROUNDS = 10 as const;

export type Philox4x32Counter = readonly [number, number, number, number];
export type Philox4x32Key = readonly [number, number];
export type Philox4x32Block = readonly [number, number, number, number];

const PHILOX_M4X32_0 = 0xd2511f53;
const PHILOX_M4X32_1 = 0xcd9e8d57;
const PHILOX_W32_0 = 0x9e3779b9;
const PHILOX_W32_1 = 0xbb67ae85;

export interface Uint32Product {
  readonly high: number;
  readonly low: number;
}

function assertUint32(value: number, label: string): void {
  if (!Number.isInteger(value) || value < 0 || value > 0xffffffff) {
    throw new RangeError(`${label} must be an unsigned 32-bit integer.`);
  }
}

function validateCounter(counter: Philox4x32Counter): void {
  if (!Array.isArray(counter) || counter.length !== 4) {
    throw new RangeError('Philox4x32 counter must contain exactly four words.');
  }
  counter.forEach((word, index) => assertUint32(word, `counter[${index}]`));
}

function validateKey(key: Philox4x32Key): void {
  if (!Array.isArray(key) || key.length !== 2) {
    throw new RangeError('Philox4x32 key must contain exactly two words.');
  }
  key.forEach((word, index) => assertUint32(word, `key[${index}]`));
}

/**
 * Multiply two unsigned 32-bit words and return the exact high and low halves.
 *
 * JavaScript numbers cannot represent every unsigned 64-bit integer exactly.
 * Splitting both operands into 16-bit halves keeps every intermediate below
 * Number.MAX_SAFE_INTEGER and preserves the exact Random123 uint32 behavior.
 */
export function multiplyUint32HighLow(a: number, b: number): Uint32Product {
  assertUint32(a, 'a');
  assertUint32(b, 'b');

  const aLow = a & 0xffff;
  const aHigh = a >>> 16;
  const bLow = b & 0xffff;
  const bHigh = b >>> 16;

  const lowLow = aLow * bLow;
  const lowHigh = aLow * bHigh;
  const highLow = aHigh * bLow;
  const highHigh = aHigh * bHigh;

  const middle =
    (lowLow >>> 16) +
    (lowHigh & 0xffff) +
    (highLow & 0xffff);

  const low = (((middle & 0xffff) << 16) | (lowLow & 0xffff)) >>> 0;
  const high = (
    highHigh +
    (lowHigh >>> 16) +
    (highLow >>> 16) +
    (middle >>> 16)
  ) >>> 0;

  return { high, low };
}

export function philox4x32Round(
  counter: Philox4x32Counter,
  key: Philox4x32Key,
): Philox4x32Block {
  validateCounter(counter);
  validateKey(key);

  const product0 = multiplyUint32HighLow(PHILOX_M4X32_0, counter[0]);
  const product1 = multiplyUint32HighLow(PHILOX_M4X32_1, counter[2]);

  return [
    (product1.high ^ counter[1] ^ key[0]) >>> 0,
    product1.low,
    (product0.high ^ counter[3] ^ key[1]) >>> 0,
    product0.low,
  ];
}

export function bumpPhilox4x32Key(key: Philox4x32Key): Philox4x32Key {
  validateKey(key);
  return [
    (key[0] + PHILOX_W32_0) >>> 0,
    (key[1] + PHILOX_W32_1) >>> 0,
  ];
}

/** Execute the canonical ten-round Philox4x32 bijection. */
export function philox4x32_10(
  counter: Philox4x32Counter,
  key: Philox4x32Key,
): Philox4x32Block {
  validateCounter(counter);
  validateKey(key);

  let currentCounter: Philox4x32Block = [...counter];
  let currentKey: Philox4x32Key = [...key];

  for (let round = 0; round < PHILOX4X32_ROUNDS; round += 1) {
    currentCounter = philox4x32Round(currentCounter, currentKey);
    if (round < PHILOX4X32_ROUNDS - 1) {
      currentKey = bumpPhilox4x32Key(currentKey);
    }
  }

  return currentCounter;
}
