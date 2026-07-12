import { describe, expect, it } from 'vitest';
import { createWorldRandomOracle, restoreSequentialRandomStream } from '../src/core/worldRandom/oracle';
import { createRootSeedIdentity, derivePhiloxKey } from '../src/core/worldRandom/seedMixer';
import { getRandomStreamDefinition } from '../src/core/worldRandom/streamRegistry';

const address = (stream: 'sim.culture-drift' | 'sim.country-expansion', entity: string, draw: string | number) => ({
  stream,
  scope: ['branch-a', 42, entity] as const,
  draw,
});

describe('C02 random stream isolation', () => {
  it('reproduces the same samples for the same exact inputs', () => {
    const a = createWorldRandomOracle('seed 1040037', { branchSalt: 'branch-a' });
    const b = createWorldRandomOracle('seed 1040037', { branchSalt: 'branch-a' });
    expect(a.uint32(address('sim.culture-drift', 'culture-1', 'trigger'))).toBe(
      b.uint32(address('sim.culture-drift', 'culture-1', 'trigger')),
    );
  });

  it('keeps streams isolated when unrelated draws are added', () => {
    const oracle = createWorldRandomOracle('1040037');
    const before = oracle.uint32(address('sim.country-expansion', 'country-1', 'trigger'));
    for (let i = 0; i < 50; i += 1) oracle.uint32(address('sim.culture-drift', 'culture-1', i));
    const after = oracle.uint32(address('sim.country-expansion', 'country-1', 'trigger'));
    expect(after).toBe(before);
  });

  it('keeps entity-keyed samples stable across iteration order and added entities', () => {
    const oracle = createWorldRandomOracle('1040037');
    const entities = ['a', 'b', 'c'];
    const sample = (values: string[]) => Object.fromEntries(values.map((id) => [id, oracle.uint32(address('sim.culture-drift', id, 'target'))]));
    expect(sample([...entities].reverse())).toEqual(sample(entities));
    expect(sample(['new', ...entities])).toMatchObject(sample(entities));
  });

  it('keeps another stream key unchanged when one stream version changes', () => {
    const root = createRootSeedIdentity('1040037');
    const country = getRandomStreamDefinition('sim.country-expansion');
    const culture = getRandomStreamDefinition('sim.culture-drift');
    const countryKeyBefore = derivePhiloxKey(root, country.name, country.version);
    derivePhiloxKey(root, culture.name, culture.version + 1);
    const countryKeyAfter = derivePhiloxKey(root, country.name, country.version);
    expect(countryKeyAfter).toEqual(countryKeyBefore);
  });

  it('replays sequential cursor snapshots exactly', () => {
    const oracle = createWorldRandomOracle('1040037');
    const stream = oracle.sequential('sim.event-generation', ['branch-a', 8, 'events']);
    stream.nextUint32();
    stream.nextFloat01();
    const cursor = stream.snapshot();
    const expected = [stream.nextUint32(), stream.nextUint32()];
    const restored = restoreSequentialRandomStream(oracle, cursor);
    expect([restored.nextUint32(), restored.nextUint32()]).toEqual(expected);
  });

  it('uses unbiased bounded selection within the requested range', () => {
    const oracle = createWorldRandomOracle('1040037');
    for (let i = 0; i < 500; i += 1) {
      const result = oracle.integer(address('sim.country-expansion', 'country-1', i), -7, 13);
      expect(result).toBeGreaterThanOrEqual(-7);
      expect(result).toBeLessThan(13);
    }
  });
});
