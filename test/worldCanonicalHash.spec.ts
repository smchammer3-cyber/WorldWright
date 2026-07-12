import { describe, expect, it } from 'vitest';
import { canonicalJsonStringify } from '../src/core/worldProvenance/canonicalJson';
import { hashCanonicalJson } from '../src/core/worldProvenance/hash';

describe('C02 canonical diagnostic hashing', () => {
  it('ignores object insertion order while preserving array order', () => {
    expect(hashCanonicalJson({ b: 2, a: 1 })).toEqual(hashCanonicalJson({ a: 1, b: 2 }));
    expect(hashCanonicalJson({ a: [1, 2] })).not.toEqual(hashCanonicalJson({ a: [2, 1] }));
  });

  it('normalizes negative zero', () => {
    expect(canonicalJsonStringify({ value: -0 })).toBe('{"value":0}');
  });

  it.each([
    [{ value: Number.NaN }, '$.value'],
    [{ value: Number.POSITIVE_INFINITY }, '$.value'],
    [{ value: undefined }, '$.value'],
    [{ value: () => 1 }, '$.value'],
    [{ value: 1n }, '$.value'],
  ])('fails closed for unsupported values', (value, path) => {
    expect(() => canonicalJsonStringify(value)).toThrow(path);
  });

  it('rejects sparse arrays and cycles with a path', () => {
    const sparse: unknown[] = [];
    sparse.length = 2;
    sparse[1] = 'x';
    expect(() => canonicalJsonStringify(sparse)).toThrow(/\$\[0\]/);

    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    expect(() => canonicalJsonStringify(cyclic)).toThrow(/\$\.self/);
  });
});
