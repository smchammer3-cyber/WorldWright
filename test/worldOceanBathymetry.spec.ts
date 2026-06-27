import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { applyOceanBathymetrySmoothing } from '../src/core/worldOceanBathymetry';
import { BoundaryType, ContinentMarginType, CrustProvince, IslandCause, OceanDepthClass, PlateType } from '../src/core/worldSchema';

function makeFlatOceanWorld() {
  const params = createDefaultGeneratorParams();
  params.width = 12;
  params.height = 6;
  params.seed = 'ocean-bathymetry-test';
  const world = generateWorldFromParams(params);
  world.seaLevel = 0;
  world.metadata.seaLevel = 0;
  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    cell.baseHeight = -0.20;
    cell.editHeightDelta = 0;
    cell.simHeightDelta = 0;
    cell.isWater = true;
    cell.plateType = PlateType.OCEANIC;
    cell.boundaryType = BoundaryType.NONE;
    cell.oceanDepthClass = OceanDepthClass.ABYSSAL;
    cell.crustProvince = CrustProvince.OCEANIC_BASIN;
    cell.islandCause = IslandCause.NONE;
    cell.volcanicActivity = 0;
    cell.upliftRate = 0;
    cell.crustThickness = 0.44;
    cell.crustAge = 0.36;
    cell.shelfStrength = 0;
    cell.marginType = ContinentMarginType.NONE;
    cell.continentality = 0;
    cell.continentCoreStrength = 0;
    cell.continentId = null;
    cell.plateId = i % world.gridWidth < world.gridWidth / 2 ? 1 : 2;
  }
  return world;
}

function setOceanGap(world: ReturnType<typeof makeFlatOceanWorld>, row: number, leftCol: number) {
  const left = world.cells[row * world.gridWidth + leftCol];
  const right = world.cells[row * world.gridWidth + leftCol + 1];
  left.baseHeight = -0.04;
  right.baseHeight = -0.22;
  return { left, right };
}

function gap(left: { baseHeight: number }, right: { baseHeight: number }): number {
  return Math.abs(left.baseHeight - right.baseHeight);
}

describe('ocean bathymetry smoothing', () => {
  it('softens unexplained underwater height ghosts without needing hidden IDs as authority', () => {
    const world = makeFlatOceanWorld();
    const { left, right } = setOceanGap(world, 2, 5);
    const beforeGap = gap(left, right);

    applyOceanBathymetrySmoothing(world);

    const afterGap = gap(left, right);
    expect(afterGap).toBeLessThan(beforeGap);
    expect(left.baseHeight).toBeLessThan(0);
    expect(right.baseHeight).toBeLessThan(0);
  });

  it('does not let oceanDepthClass or crustProvince alone protect bathymetry', () => {
    const world = makeFlatOceanWorld();
    const { left, right } = setOceanGap(world, 2, 5);
    left.oceanDepthClass = OceanDepthClass.TRENCH;
    right.oceanDepthClass = OceanDepthClass.TRENCH;
    left.crustProvince = CrustProvince.ISLAND_ARC;
    right.crustProvince = CrustProvince.ISLAND_ARC;
    const beforeGap = gap(left, right);

    applyOceanBathymetrySmoothing(world);

    const afterGap = gap(left, right);
    expect(afterGap).toBeLessThan(beforeGap * 0.98);
  });

  it('sinks unsupported submerged continent shelf fields instead of preserving mid-ocean circular ghosts', () => {
    const world = makeFlatOceanWorld();
    const { left, right } = setOceanGap(world, 2, 5);
    for (const cell of [left, right]) {
      cell.plateType = PlateType.CONTINENTAL;
      cell.continentality = 0.82;
      cell.continentCoreStrength = 0.72;
      cell.continentId = 7;
      cell.shelfStrength = 0.88;
      cell.marginType = ContinentMarginType.PASSIVE;
      cell.crustThickness = 0.68;
      cell.crustAge = 0.66;
      cell.crustProvince = CrustProvince.OLD_SHIELD;
    }
    const beforeLeft = left.baseHeight;
    const beforeGap = gap(left, right);

    applyOceanBathymetrySmoothing(world);

    const afterGap = gap(left, right);
    expect(afterGap).toBeLessThan(beforeGap * 0.98);
    expect(left.baseHeight).toBeLessThan(beforeLeft - 0.020);
    expect(left.baseHeight).toBeLessThan(-0.07);
    expect(right.baseHeight).toBeLessThan(0);
  });

  it('preserves explicitly caused trench and ridge bathymetry more than uncaused edges', () => {
    const uncaused = makeFlatOceanWorld();
    const uncausedGap = setOceanGap(uncaused, 3, 5);
    applyOceanBathymetrySmoothing(uncaused);
    const uncausedAfterGap = gap(uncausedGap.left, uncausedGap.right);

    const caused = makeFlatOceanWorld();
    const causedGap = setOceanGap(caused, 3, 5);
    causedGap.left.boundaryType = BoundaryType.CONVERGENT;
    causedGap.right.boundaryType = BoundaryType.CONVERGENT;
    causedGap.left.islandCause = IslandCause.ISLAND_ARC;
    causedGap.right.islandCause = IslandCause.ISLAND_ARC;
    causedGap.left.upliftRate = -0.72;
    causedGap.right.upliftRate = -0.72;

    applyOceanBathymetrySmoothing(caused);

    const causedAfterGap = gap(causedGap.left, causedGap.right);
    expect(causedAfterGap).toBeGreaterThan(uncausedAfterGap);
  });
});
