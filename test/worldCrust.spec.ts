import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { seedCrustFields, ensureCrustFields } from '../src/core/worldCrust';
import { validateWorld } from '../src/core/worldValidation';
import { PlateType } from '../src/core/worldSchema';

describe('world crust fields', () => {
  it('seeds deterministic crust thickness and age values in range', () => {
    const params = createDefaultGeneratorParams();
    params.width = 96;
    params.height = 48;
    params.seed = 'crust-scaffold';
    const world = generateWorldFromParams(params);

    seedCrustFields(world);

    for (const cell of world.cells) {
      expect(cell.crustThickness).toBeGreaterThanOrEqual(0);
      expect(cell.crustThickness).toBeLessThanOrEqual(1);
      expect(cell.crustAge).toBeGreaterThanOrEqual(0);
      expect(cell.crustAge).toBeLessThanOrEqual(1);
    }

    const continental = average(world.cells.filter((cell) => cell.plateType === PlateType.CONTINENTAL).map((cell) => cell.crustThickness));
    const oceanic = average(world.cells.filter((cell) => cell.plateType === PlateType.OCEANIC).map((cell) => cell.crustThickness));

    expect(continental).toBeGreaterThan(oceanic);
    expect(validateWorld(world)).toEqual([]);
  });

  it('repairs legacy worlds missing crust fields', () => {
    const params = createDefaultGeneratorParams();
    params.width = 64;
    params.height = 32;
    params.seed = 'legacy-crust-repair';
    const world = generateWorldFromParams(params) as any;

    delete world.cells[0].crustThickness;
    delete world.cells[0].crustAge;

    ensureCrustFields(world);

    expect(typeof world.cells[0].crustThickness).toBe('number');
    expect(typeof world.cells[0].crustAge).toBe('number');
    expect(validateWorld(world)).toEqual([]);
  });
});

function average(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
}
