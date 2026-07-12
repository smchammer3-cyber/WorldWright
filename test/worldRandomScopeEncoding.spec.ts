import { describe, expect, it } from 'vitest';
import { createWorldRandomOracle, encodeRandomScope } from '../src/core/worldRandom/oracle';
import { createRootSeedIdentity } from '../src/core/worldRandom/seedMixer';

function hex(bytes: Uint8Array): string {
  return [...bytes].map((value) => value.toString(16).padStart(2, '0')).join('');
}

describe('C02 root seed and scope encoding', () => {
  it('preserves exact seed text without trimming or normalization', () => {
    expect(createRootSeedIdentity(' 123 ').exactText).toBe(' 123 ');
    expect(createRootSeedIdentity('ABC').fingerprint).not.toBe(createRootSeedIdentity('abc').fingerprint);
    expect(createRootSeedIdentity(123).exactText).toBe('123');
  });

  it('distinguishes typed and length-delimited scope values', () => {
    expect(hex(encodeRandomScope([1]))).not.toBe(hex(encodeRandomScope(['1'])));
    expect(hex(encodeRandomScope(['ab', 'c']))).not.toBe(hex(encodeRandomScope(['a', 'bc'])));
    expect(hex(encodeRandomScope(['', 0]))).not.toBe(hex(encodeRandomScope([0, ''])));
  });

  it('rejects unsupported and unsafe values with a path', () => {
    expect(() => encodeRandomScope([Number.NaN])).toThrow(/scope\[0\]/);
    expect(() => encodeRandomScope([Number.MAX_SAFE_INTEGER + 1])).toThrow(/scope\[0\]/);
    expect(() => encodeRandomScope([{} as never])).toThrow(/scope\[0\]/);
  });

  it('distinguishes branch salts and stream identities', () => {
    const first = createWorldRandomOracle('1040037', { branchSalt: 'a' });
    const second = createWorldRandomOracle('1040037', { branchSalt: 'b' });
    const input = { stream: 'sim.event-generation' as const, scope: ['branch', 1], draw: 'trigger' };
    expect(first.uint32(input)).not.toBe(second.uint32(input));
    expect(first.uint32(input)).not.toBe(first.uint32({ ...input, stream: 'sim.culture-drift' }));
  });

  it('blocks future causal streams while authority remains LEGACY', () => {
    const oracle = createWorldRandomOracle('1040037', { authorityMode: 'LEGACY' });
    expect(() => oracle.uint32({ stream: 'causal.premise', scope: ['test'], draw: 'branch' })).toThrow(/not allowed/);
  });
});
