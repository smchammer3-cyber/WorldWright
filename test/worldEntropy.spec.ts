import { describe, expect, it } from 'vitest';
import { createRandomIdentity, createRandomNumericSeed, type EntropySource } from '../src/core/worldEntropy';

function fixedEntropy(words: number[], uuid?: string): EntropySource {
  let index = 0;
  return {
    getRandomValues<T extends ArrayBufferView>(array: T): T {
      if (array instanceof Uint32Array) {
        for (let i = 0; i < array.length; i += 1) array[i] = words[index++ % words.length] >>> 0;
      } else if (array instanceof Uint8Array) {
        for (let i = 0; i < array.length; i += 1) array[i] = (words[index++ % words.length] ?? i) & 0xff;
      }
      return array;
    },
    ...(uuid ? { randomUUID: () => uuid } : {}),
  };
}

describe('C02 entropy and identity separation', () => {
  it('creates bounded numeric seeds from injected entropy', () => {
    expect(createRandomNumericSeed(fixedEntropy([123456789]), 1_000_000_000)).toBe(123456789);
  });

  it('uses an injected UUID provider when available', () => {
    const expected = '00000000-0000-4000-8000-000000000001';
    expect(createRandomIdentity(fixedEntropy([1], expected))).toBe(expected);
  });

  it('creates an RFC4122-shaped fallback identity without causal randomness', () => {
    const result = createRandomIdentity(fixedEntropy([1, 2, 3, 4]));
    expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });
});
