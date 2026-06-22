import { describe, expect, it } from 'vitest';
import { createEmptyCell } from '../src/core/worldSchema';
import { buildTectonicsField, generatePlates } from '../src/core/tectonicsSystem';

function rng(seed = 123456): () => number {
  let a = seed >>> 0;
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe('tectonics skeleton', () => {
  it('keeps plate IDs aligned and unique', () => {
    const plates = generatePlates(128, 64, 12, rng(1), { plateActivity: 55 });

    expect(plates).toHaveLength(12);
    expect(new Set(plates.map((plate) => plate.id)).size).toBe(12);

    for (let i = 0; i < plates.length; i++) {
      expect(plates[i].id).toBe(i);
    }
  });

  it('derives real boundaries and interior distance from hard plate ownership', () => {
    const width = 96;
    const height = 48;
    const cells = Array.from({ length: width * height }, (_, i) => createEmptyCell(i));

    const result = buildTectonicsField(width, height, cells, 12, rng(2), { plateActivity: 55 });
    const fields = result.fields;

    const plateIds = new Set(fields.map((field) => field.plateId));
    const boundaryFields = fields.filter((field) => field.isBoundary);
    const interiorFields = fields.filter((field) => !field.isBoundary);

    expect(plateIds.size).toBeGreaterThan(4);
    expect(boundaryFields.length).toBeGreaterThan(0);
    expect(interiorFields.length).toBeGreaterThan(0);

    const averageBoundaryDistance =
      boundaryFields.reduce((sum, field) => sum + field.distanceToBoundary, 0) / boundaryFields.length;
    const averageInteriorDistance =
      interiorFields.reduce((sum, field) => sum + field.distanceToBoundary, 0) / interiorFields.length;

    expect(averageBoundaryDistance).toBeLessThan(0.05);
    expect(averageInteriorDistance).toBeGreaterThan(averageBoundaryDistance);
    expect(Math.max(...fields.map((field) => field.distanceToBoundary))).toBeGreaterThan(0.5);
  });
});
