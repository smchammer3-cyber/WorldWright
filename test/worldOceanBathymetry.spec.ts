import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { applyOceanBathymetrySmoothing } from '../src/core/worldOceanBathymetry';
import { BoundaryType, CrustProvince, IslandCause, OceanDepthClass, PlateType } from '../src/core/worldSchema';

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
    cell.plateId = i % world.gridWidth < world.gridWidth / 2 ? 1 : 2;
  }
  return world;
}

describe('ocean bathymetry smoothing', () => {
  it('softens unexplained underwater height ghosts without needing hidden IDs as authority', () => {
    const world = makeFlatOceanWorld();
    const left = world.cells[2 * world.gridWidth + 5];
    const right = world.cells[2 * world.gridWidth + 6];
    left.baseHeight = -0.04;
    right.baseHeight = -0.22;
    const beforeGap = Math.abs(left.baseHeight - right.baseHeight);

    applyOceanBathymetrySmoothing(world);

    const afterGap = Math.abs(left.baseHeight - right.baseHeight);
    expect(afterGap).toBeLessThan(beforeGap);
    expect(left.baseHeight).toBeLessThan(0);
    expect(right.baseHeight).toBeLessThan(0);
  });

  it('does not let oceanDepthClass or crustProvince alone protect bathymetry', () => {
    const world = makeFlatOceanWorld();
    const left = world.cells[2 * world.gridWidth + 5];
    const right = world.cells[2 * world.gridWidth + 6];
    left.baseHeight = -0.04;
    right.baseHeight = -0.22;
    left.oceanDepthClass = OceanDepthClass.TRENCH;
    right.oceanDepthClass = OceanDepthClass.TRENCH;
    left.crustProvince = CrustProvince.ISLAND_ARC;
    right.crustProvince = CrustProvince.ISLAND_ARC;
    const beforeGap = Math.abs(left.baseHeight - right.baseHeight);

    applyOceanBathymetrySmoothing(world);

    const afterGap = Math.abs(left.baseHeight - right.baseHeight);
    expect(afterGap).toBeLessThan(beforeGap * 0.98);
  });

  it('preserves explicitly caused trench and ridge bathymetry more than uncaused edges', () => {
    const world = makeFlatOceanWorld();
    const left = world.cells[3 * world.gridWidth + 5];
    const right = world.cells[3 * world.gridWidth + 6];
    left.baseHeight = -0.04;
    right.baseHeight = -0.22;
    left.boundaryType = BoundaryType.CONVERGENT;
    right.boundaryType = BoundaryType.CONVERGENT;
    left.islandCause = IslandCause.ISLAND_ARC;
    right.islandCause = IslandCause.ISLAND_ARC;
    left.upliftRate = -0.72;
    right.upliftRate = -0.72;
    const beforeGap = Math.abs(left.baseHeight - right.baseHeight);

    applyOceanBathymetrySmoothing(world);

    const afterGap = Math.abs(left.baseHeight - right.baseHeight);
    expect(afterGap).toBeGreaterThan(beforeGap * 0.92);
  });
});
