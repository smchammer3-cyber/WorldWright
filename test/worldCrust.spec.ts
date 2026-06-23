import { describe, expect, it } from 'vitest';
import { computeWorldDiagnostics } from '../src/core/worldDiagnostics';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { applyCrustTerrainInfluence, seedCrustFields, ensureCrustFields } from '../src/core/worldCrust';
import { makePlanetPreviewFromWorldBrain, PLANET_PREVIEW_MODES } from '../src/core/planetRenderer';
import { recomputeWorld } from '../src/core/worldRecompute';
import { validateWorld } from '../src/core/worldValidation';
import { BoundaryType, CrustProvince, PlateType } from '../src/core/worldSchema';

describe('world crust fields', () => {
  it('seeds deterministic crust thickness, age, and province values in range', () => {
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
      expect(Object.values(CrustProvince)).toContain(cell.crustProvince);
    }

    const continental = average(world.cells.filter((cell) => cell.plateType === PlateType.CONTINENTAL).map((cell) => cell.crustThickness));
    const oceanic = average(world.cells.filter((cell) => cell.plateType === PlateType.OCEANIC).map((cell) => cell.crustThickness));
    const provinceCount = new Set(world.cells.map((cell) => cell.crustProvince)).size;

    expect(continental).toBeGreaterThan(oceanic);
    expect(provinceCount).toBeGreaterThan(2);
    expect(validateWorld(world)).toEqual([]);
  });

  it('repairs legacy worlds missing crust fields and provinces', () => {
    const params = createDefaultGeneratorParams();
    params.width = 64;
    params.height = 32;
    params.seed = 'legacy-crust-repair';
    const world = generateWorldFromParams(params) as any;

    delete world.cells[0].crustThickness;
    delete world.cells[0].crustAge;
    delete world.cells[1].crustProvince;

    ensureCrustFields(world);

    expect(typeof world.cells[0].crustThickness).toBe('number');
    expect(typeof world.cells[0].crustAge).toBe('number');
    expect(Object.values(CrustProvince)).toContain(world.cells[1].crustProvince);
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

  it('pushes basins down and mobile belts up relative to their starting height', () => {
    const params = createDefaultGeneratorParams();
    params.width = 16;
    params.height = 8;
    params.seed = 'province-shaping-test';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;

    for (const cell of world.cells) {
      cell.baseHeight = 0.08;
      cell.editHeightDelta = 0;
      cell.simHeightDelta = 0;
      cell.plateType = PlateType.CONTINENTAL;
      cell.boundaryType = BoundaryType.NONE;
      cell.upliftRate = 0;
      cell.volcanicActivity = 0;
      cell.crustThickness = 0.58;
      cell.crustAge = 0.52;
      cell.crustProvince = CrustProvince.SEDIMENT_BASIN;
    }

    const basin = world.cells[2 * world.gridWidth + 2];
    basin.crustProvince = CrustProvince.SEDIMENT_BASIN;

    const belt = world.cells[2 * world.gridWidth + 10];
    belt.crustProvince = CrustProvince.MOBILE_BELT;
    belt.upliftRate = 0.5;

    applyCrustTerrainInfluence(world);

    expect(basin.baseHeight).toBeLessThan(0.08);
    expect(belt.baseHeight).toBeGreaterThan(0.08);
  });

  it('preserves caused tiny islands while sinking accidental tiny islands', () => {
    const params = createDefaultGeneratorParams();
    params.width = 12;
    params.height = 6;
    params.seed = 'tiny-island-cause-test';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;

    for (const cell of world.cells) {
      cell.baseHeight = -0.25;
      cell.editHeightDelta = 0;
      cell.simHeightDelta = 0;
      cell.plateType = PlateType.OCEANIC;
      cell.boundaryType = BoundaryType.NONE;
      cell.volcanicActivity = 0;
      cell.crustThickness = 0.45;
      cell.crustAge = 0.35;
      cell.crustProvince = CrustProvince.OCEANIC_BASIN;
    }

    const accidental = world.cells[1 * world.gridWidth + 1];
    accidental.baseHeight = 0.03;
    accidental.crustProvince = CrustProvince.OCEANIC_BASIN;

    const caused = world.cells[1 * world.gridWidth + 9];
    caused.baseHeight = 0.03;
    caused.volcanicActivity = 0.8;
    caused.crustProvince = CrustProvince.ISLAND_ARC;

    applyCrustTerrainInfluence(world);

    expect(accidental.baseHeight).toBeLessThan(0);
    expect(caused.baseHeight).toBeGreaterThan(0);
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
