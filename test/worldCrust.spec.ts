import { describe, expect, it } from 'vitest';
import { computeWorldDiagnostics } from '../src/core/worldDiagnostics';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { applyCrustTerrainInfluence, seedCrustFields, ensureCrustFields } from '../src/core/worldCrust';
import { makePlanetPreviewFromWorldBrain, PLANET_PREVIEW_MODES } from '../src/core/planetRenderer';
import { recomputeWorld } from '../src/core/worldRecompute';
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

  it('applies a conservative crust terrain influence without reviving plate seams', () => {
    const params = createDefaultGeneratorParams();
    params.width = 96;
    params.height = 48;
    params.seed = 'crust-terrain-pass';
    const world = generateWorldFromParams(params);
    recomputeWorld(world, ['GENERATED']);
    seedCrustFields(world);

    const before = computeWorldDiagnostics(world).raw;
    applyCrustTerrainInfluence(world);
    recomputeWorld(world, ['GENERATED']);
    seedCrustFields(world);
    const after = computeWorldDiagnostics(world).raw;

    expect(after.heightStdDev).toBeGreaterThan(before.heightStdDev * 0.95);
    expect(after.seamHeightRatio ?? 0).toBeLessThan(2.5);
    expect(after.meanContinentalCrustThickness).toBeGreaterThan(after.meanOceanicCrustThickness);
  });

  it('exposes a crust preview layer', () => {
    const params = createDefaultGeneratorParams();
    params.width = 64;
    params.height = 32;
    params.seed = 'crust-preview';
    const world = generateWorldFromParams(params);
    seedCrustFields(world);

    expect(PLANET_PREVIEW_MODES.some((mode) => mode.id === 'CRUST')).toBe(true);
    const preview = makePlanetPreviewFromWorldBrain(world, 'CRUST');
    expect(preview.rgba.length).toBe(world.gridWidth * world.gridHeight * 4);
  });
});

function average(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
}
