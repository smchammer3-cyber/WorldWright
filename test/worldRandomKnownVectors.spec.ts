import { describe, expect, it } from 'vitest';
import {
  PHILOX4X32_ALGORITHM,
  PHILOX4X32_ROUNDS,
  bumpPhilox4x32Key,
  multiplyUint32HighLow,
  philox4x32_10,
  type Philox4x32Counter,
  type Philox4x32Key,
} from '../src/core/worldRandom/philox4x32';

function hexWords(values: readonly number[]): string[] {
  return values.map((value) => value.toString(16).padStart(8, '0'));
}

describe('Philox4x32-10 core', () => {
  it('locks the public algorithm identity and round count', () => {
    expect(PHILOX4X32_ALGORITHM).toBe('philox4x32-10');
    expect(PHILOX4X32_ROUNDS).toBe(10);
  });

  it.each([
    {
      name: 'zero counter and zero key',
      counter: [0x00000000, 0x00000000, 0x00000000, 0x00000000] as Philox4x32Counter,
      key: [0x00000000, 0x00000000] as Philox4x32Key,
      expected: ['6627e8d5', 'e169c58d', 'bc57ac4c', '9b00dbd8'],
    },
    {
      name: 'all-ones counter and key',
      counter: [0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff] as Philox4x32Counter,
      key: [0xffffffff, 0xffffffff] as Philox4x32Key,
      expected: ['408f276d', '41c83b0e', 'a20bc7c6', '6d5451fd'],
    },
    {
      name: 'digits-of-pi counter and key',
      counter: [0x243f6a88, 0x85a308d3, 0x13198a2e, 0x03707344] as Philox4x32Counter,
      key: [0xa4093822, 0x299f31d0] as Philox4x32Key,
      expected: ['d16cfe09', '94fdcceb', '5001e420', '24126ea1'],
    },
  ])('matches the official Random123 vector: $name', ({ counter, key, expected }) => {
    expect(hexWords(philox4x32_10(counter, key))).toEqual(expected);
  });

  it.each([
    [0x00000000, 0x00000000, 0x00000000, 0x00000000],
    [0xffffffff, 0xffffffff, 0xfffffffe, 0x00000001],
    [0x80000000, 0x00000002, 0x00000001, 0x00000000],
    [0x12345678, 0x9abcdef0, 0x0b00ea4e, 0x242d2080],
    [0xd2511f53, 0x243f6a88, 0x1dc781e3, 0xb37e0218],
    [0xcd9e8d57, 0x13198a2e, 0x0f5747f5, 0xad2d4ba2],
  ])(
    'returns the exact uint32 high/low product for %s × %s',
    (a, b, expectedHigh, expectedLow) => {
      expect(multiplyUint32HighLow(a, b)).toEqual({
        high: expectedHigh,
        low: expectedLow,
      });
    },
  );

  it('bumps both key words with the canonical Weyl constants', () => {
    expect(hexWords(bumpPhilox4x32Key([0, 0]))).toEqual(['9e3779b9', 'bb67ae85']);
    expect(hexWords(bumpPhilox4x32Key([0xffffffff, 0xffffffff]))).toEqual([
      '9e3779b8',
      'bb67ae84',
    ]);
  });

  it.each([
    [[-1, 0, 0, 0], [0, 0]],
    [[0x1_0000_0000, 0, 0, 0], [0, 0]],
    [[0, 0, 0, 0], [1.5, 0]],
  ])('rejects invalid uint32 inputs', (counter, key) => {
    expect(() =>
      philox4x32_10(counter as unknown as Philox4x32Counter, key as unknown as Philox4x32Key),
    ).toThrow(/unsigned 32-bit integer/);
  });
});
