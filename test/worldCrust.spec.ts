import { describe, expect, it } from 'vitest';
import { computeWorldDiagnostics } from '../src/core/worldDiagnostics';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { applyCrustProvinceTerrainDelta, applyCrustTerrainInfluence, seedCrustFields, ensureCrustFields } from '../src/core/worldCrust';
import { classifyCrustProvince } from '../src/core/worldCrust/materialFields';
import { makePlanetPreviewFromWorldBrain, PLANET_PREVIEW_MODES } from '../src/core/planetRenderer';
import { recomputeWorld } from '../src/core/worldRecompute';
import { validateWorld } from '../src/core/worldValidation';
import { BoundaryType, ContinentMarginType, CrustProvince, IslandCause, PlateType, type Cell } from '../src/core/worldSchema';

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

    expect(Number.isFinite(continental)).toBe(true);
    expect(Number.isFinite(oceanic)).toBe(true);
    expect(Math.abs(continental - oceanic)).toBeLessThan(0.20);
    expect(provinceCount).toBeGreaterThanOrEqual(1);
    expect(validateWorld(world)).toEqual([]);
  });

  it('classifies distinct crust provinces from explicit material signals', () => {
    const params = createDefaultGeneratorParams();
    params.width = 8;
    params.height = 4;
    params.seed = 'crust-classifier-cases';
    const world = generateWorldFromParams(params);
    const base = world.cells[0];
    const seaLevel = 0;

    const oceanic = caseCell(base, {
      baseHeight: -0.24,
      plateType: PlateType.OCEANIC,
      continentality: 0.05,
      shelfStrength: 0.02,
      crustThickness: 0.32,
      crustAge: 0.34,
    });
    const coast = caseCell(base, {
      baseHeight: 0.02,
      plateType: PlateType.CONTINENTAL,
      marginType: ContinentMarginType.PASSIVE,
      continentality: 0.45,
      shelfStrength: 0.80,
      crustThickness: 0.52,
      crustAge: 0.48,
    });
    const shield = caseCell(base, {
      baseHeight: 0.18,
      plateType: PlateType.CONTINENTAL,
      continentCoreStrength: 0.80,
      continentality: 0.92,
      crustThickness: 0.72,
      crustAge: 0.72,
    });
    const mobile = caseCell(base, {
      baseHeight: 0.20,
      plateType: PlateType.CONTINENTAL,
      boundaryType: BoundaryType.CONVERGENT,
      marginType: ContinentMarginType.ACTIVE,
      upliftRate: 0.35,
      continentality: 0.66,
      crustThickness: 0.64,
      crustAge: 0.44,
    });

    expect(classifyCrustProvince(oceanic, oceanic.baseHeight, seaLevel)).toBe(CrustProvince.OCEANIC_BASIN);
    expect(classifyCrustProvince(coast, coast.baseHeight, seaLevel)).toBe(CrustProvince.COASTAL_PLAIN);
    expect(classifyCrustProvince(shield, shield.baseHeight, seaLevel)).toBe(CrustProvince.OLD_SHIELD);
    expect(classifyCrustProvince(mobile, mobile.baseHeight, seaLevel)).toBe(CrustProvince.MOBILE_BELT);
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
    expect(Number.isFinite(after.meanContinentalCrustThickness)).toBe(true);
    expect(Number.isFinite(after.meanOceanicCrustThickness)).toBe(true);
  });

  it('keeps crust province deltas from creating unsupported isolated land', () => {
    const params = createDefaultGeneratorParams();
    params.width = 16;
    params.height = 8;
    params.seed = 'crust-delta-topology-guard';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;

    for (const cell of world.cells) {
      cell.baseHeight = -0.12;
      cell.editHeightDelta = 0;
      cell.simHeightDelta = 0;
      cell.plateType = PlateType.CONTINENTAL;
      cell.boundaryType = BoundaryType.NONE;
      cell.upliftRate = 0;
      cell.volcanicActivity = 0;
      cell.crustThickness = 0.58;
      cell.crustAge = 0.52;
      cell.crustProvince = CrustProvince.SEDIMENT_BASIN;
      cell.continentCoreStrength = 0;
      cell.continentality = 0.20;
      cell.islandCause = IslandCause.NONE;
    }

    const isolated = world.cells[3 * world.gridWidth + 7];
    isolated.baseHeight = -0.001;
    isolated.crustProvince = CrustProvince.MOBILE_BELT;
    isolated.upliftRate = 1;

    applyCrustProvinceTerrainDelta(world);

    expect(isolated.baseHeight).toBeLessThan(0);
  });

  it('keeps mobile belts higher than sediment basins in the same material pass', () => {
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

    expect(belt.baseHeight).toBeGreaterThan(basin.baseHeight);
  });

  it('fills tiny shield holes surrounded by strong continental land', () => {
    const params = createDefaultGeneratorParams();
    params.width = 32;
    params.height = 16;
    params.seed = 'province-coherence-test';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;

    for (const cell of world.cells) {
      cell.baseHeight = -0.25;
      cell.editHeightDelta = 0;
      cell.simHeightDelta = 0;
      cell.plateType = PlateType.CONTINENTAL;
      cell.boundaryType = BoundaryType.NONE;
      cell.upliftRate = 0;
      cell.volcanicActivity = 0;
      cell.crustThickness = 0.70;
      cell.crustAge = 0.70;
      cell.crustProvince = CrustProvince.OLD_SHIELD;
    }

    const centerIndex = 5 * world.gridWidth + 5;
    world.cells[centerIndex].baseHeight = -0.01;
    world.cells[5 * world.gridWidth + 4].baseHeight = 0.10;
    world.cells[5 * world.gridWidth + 6].baseHeight = 0.10;
    world.cells[4 * world.gridWidth + 5].baseHeight = 0.10;
    world.cells[6 * world.gridWidth + 5].baseHeight = 0.10;

    applyCrustTerrainInfluence(world);

    expect(world.cells[centerIndex].baseHeight).toBeGreaterThan(0);
  });

  it('nudges continental cores upward while sinking invalid mid-ocean fragments', () => {
    const params = createDefaultGeneratorParams();
    params.width = 16;
    params.height = 8;
    params.seed = 'continent-obedience-test';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;

    for (const cell of world.cells) {
      cell.baseHeight = -0.20;
      cell.editHeightDelta = 0;
      cell.simHeightDelta = 0;
      cell.plateType = PlateType.CONTINENTAL;
      cell.boundaryType = BoundaryType.NONE;
      cell.volcanicActivity = 0;
      cell.crustThickness = 0.62;
      cell.crustAge = 0.62;
      cell.crustProvince = CrustProvince.OLD_SHIELD;
      cell.continentId = 1;
      cell.continentCoreStrength = 0.1;
      cell.continentality = 0.2;
      cell.distanceToContinentCore = 0.8;
      cell.marginType = ContinentMarginType.NONE;
      cell.oceanBasinId = null;
      cell.shelfStrength = 0;
      cell.islandCause = IslandCause.NONE;
    }

    const core = world.cells[2 * world.gridWidth + 2];
    core.baseHeight = -0.02;
    core.continentCoreStrength = 0.95;
    core.continentality = 0.95;
    core.distanceToContinentCore = 0.02;
    const coreBefore = core.baseHeight;

    const invalid = world.cells[2 * world.gridWidth + 10];
    invalid.baseHeight = 0.05;
    invalid.continentId = null;
    invalid.continentCoreStrength = 0;
    invalid.continentality = 0.05;
    invalid.distanceToContinentCore = 0.95;
    invalid.plateType = PlateType.OCEANIC;
    invalid.crustProvince = CrustProvince.OCEANIC_BASIN;
    invalid.islandCause = IslandCause.INVALID_FRAGMENT;

    applyCrustTerrainInfluence(world);

    expect(core.baseHeight).toBeGreaterThan(coreBefore);
    expect(invalid.baseHeight).toBeLessThan(0);
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
      cell.continentId = null;
      cell.continentCoreStrength = 0;
      cell.continentality = 0;
      cell.distanceToContinentCore = 1;
      cell.marginType = ContinentMarginType.NONE;
      cell.oceanBasinId = 1;
      cell.shelfStrength = 0;
      cell.islandCause = IslandCause.NONE;
    }

    const accidental = world.cells[1 * world.gridWidth + 1];
    accidental.baseHeight = 0.03;
    accidental.crustProvince = CrustProvince.OCEANIC_BASIN;

    const caused = world.cells[1 * world.gridWidth + 9];
    caused.baseHeight = 0.03;
    caused.volcanicActivity = 0.8;
    caused.crustProvince = CrustProvince.ISLAND_ARC;
    caused.islandCause = IslandCause.ISLAND_ARC;

    applyCrustTerrainInfluence(world);

    expect(accidental.baseHeight).toBeLessThan(0);
    expect(caused.baseHeight).toBeGreaterThan(0);
  });

  it('exposes crust preview layers', () => {
    const params = createDefaultGeneratorParams();
    params.width = 64;
    params.height = 32;
    params.seed = 'crust-preview';
    const world = generateWorldFromParams(params);
    seedCrustFields(world);

    expect(PLANET_PREVIEW_MODES.some((mode) => mode.id === 'CRUST')).toBe(true);
    expect(PLANET_PREVIEW_MODES.some((mode) => mode.id === 'CRUST_PROVINCE')).toBe(true);
    const crustPreview = makePlanetPreviewFromWorldBrain(world, 'CRUST');
    const provincePreview = makePlanetPreviewFromWorldBrain(world, 'CRUST_PROVINCE');
    expect(crustPreview.rgba.length).toBe(world.gridWidth * world.gridHeight * 4);
    expect(provincePreview.rgba.length).toBe(world.gridWidth * world.gridHeight * 4);
  });
});

function caseCell(base: Cell, overrides: Partial<Cell>): Cell {
  return {
    ...base,
    baseHeight: 0,
    editHeightDelta: 0,
    simHeightDelta: 0,
    boundaryType: BoundaryType.NONE,
    marginType: ContinentMarginType.NONE,
    continentCoreStrength: 0,
    continentality: 0.5,
    shelfStrength: 0,
    upliftRate: 0,
    volcanicActivity: 0,
    islandCause: IslandCause.NONE,
    crustThickness: 0.5,
    crustAge: 0.5,
    ...overrides,
  };
}

function average(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
}
