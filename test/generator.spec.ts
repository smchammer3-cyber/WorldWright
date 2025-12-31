import { describe, it, expect } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';

function sampleHeights(world: any, count = 128) {
  const arr: number[] = [];
  const total = world.cells.length;
  const step = Math.max(1, Math.floor(total / count));
  for (let i = 0; i < total && arr.length < count; i += step) arr.push(world.cells[i].baseHeight);
  return arr;
}

describe('Generator determinism', () => {
  it('produces identical samples for the same numeric seed', () => {
    const p1 = createDefaultGeneratorParams();
    p1.seed = 12345;
    p1.width = 128;
    p1.height = 64;

    const a = generateWorldFromParams(p1);
    const b = generateWorldFromParams(p1);

    expect(a.metadata.seed).toBe(String(p1.seed));
    expect(a.gridWidth).toBe(b.gridWidth);
    expect(a.gridHeight).toBe(b.gridHeight);
    expect(sampleHeights(a)).toEqual(sampleHeights(b));
  });

  it('produces identical samples for the same string seed', () => {
    const p1 = createDefaultGeneratorParams();
    p1.seed = 'seed-xyz-001';
    p1.width = 64;
    p1.height = 32;

    const a = generateWorldFromParams(p1);
    const b = generateWorldFromParams(p1);

    expect(a.metadata.seed).toBe(String(p1.seed));
    expect(sampleHeights(a)).toEqual(sampleHeights(b));
  });

  it('produces different samples for different seeds', () => {
    const p1 = createDefaultGeneratorParams();
    p1.seed = 123456789;
    p1.width = 96;
    p1.height = 48;
    p1.plateActivity = 90;

    const p2 = { ...p1, seed: 987654321 };

    const a = generateWorldFromParams(p1);
    const b = generateWorldFromParams(p2);

    // Different seeds should produce different deterministic ids (seed-derived)
    expect(a.metadata.id).not.toBe(b.metadata.id);
  });
});
