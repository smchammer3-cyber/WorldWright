import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { applyGeographyAuthorityCleanup } from '../src/core/worldGeographyAuthority';
import { buildGeographyProfile } from '../src/core/worldGeographyProfile';
import { BoundaryType, ContinentMarginType, IslandCause, OceanDepthClass, PlateType } from '../src/core/worldSchema';

describe('world geography authority cleanup', () => {
  it('suppresses weak visible plate-boundary land when skeleton authority is low', () => {
    const params = createDefaultGeneratorParams();
    params.width = 16;
    params.height = 8;
    params.seed = 'authority-weak-plate-band';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;
    const profile = buildGeographyProfile(world);

    const cell = world.cells[3 * world.gridWidth + 8];
    cell.baseHeight = 0.035;
    cell.editHeightDelta = 0;
    cell.simHeightDelta = 0;
    cell.plateType = PlateType.CONTINENTAL;
    cell.boundaryType = BoundaryType.TRANSFORM;
    cell.boundaryStrength = 0.90;
    cell.distanceToBoundary = 0;
    cell.continentId = null;
    cell.continentality = 0.18;
    cell.continentCoreStrength = 0.05;
    cell.shelfStrength = 0.62;
    cell.marginType = ContinentMarginType.NONE;
    cell.islandCause = IslandCause.NONE;

    const before = cell.baseHeight;
    applyGeographyAuthorityCleanup(world, profile);

    expect(cell.baseHeight).toBeLessThan(before);
  });

  it('does not erase strong continent cores just because a plate boundary is nearby', () => {
    const params = createDefaultGeneratorParams();
    params.width = 16;
    params.height = 8;
    params.seed = 'authority-preserve-core';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;
    const profile = buildGeographyProfile(world);

    const cell = world.cells[3 * world.gridWidth + 8];
    cell.baseHeight = 0.12;
    cell.editHeightDelta = 0;
    cell.simHeightDelta = 0;
    cell.plateType = PlateType.CONTINENTAL;
    cell.boundaryType = BoundaryType.CONVERGENT;
    cell.boundaryStrength = 0.90;
    cell.distanceToBoundary = 0;
    cell.continentId = 1;
    cell.continentality = 0.90;
    cell.continentCoreStrength = 0.82;
    cell.shelfStrength = 0.05;
    cell.marginType = ContinentMarginType.COLLISION;
    cell.islandCause = IslandCause.NONE;

    const before = cell.baseHeight;
    applyGeographyAuthorityCleanup(world, profile);

    expect(cell.baseHeight).toBeGreaterThanOrEqual(before - 0.005);
  });

  it('deepens oceanic boundary patches that should read as ocean basins instead of plate polygons', () => {
    const params = createDefaultGeneratorParams();
    params.width = 16;
    params.height = 8;
    params.seed = 'authority-ocean-basin';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;
    const profile = buildGeographyProfile(world);

    const cell = world.cells[4 * world.gridWidth + 7];
    cell.baseHeight = -0.035;
    cell.editHeightDelta = 0;
    cell.simHeightDelta = 0;
    cell.plateType = PlateType.OCEANIC;
    cell.boundaryType = BoundaryType.TRANSFORM;
    cell.boundaryStrength = 0.85;
    cell.distanceToBoundary = 0.05;
    cell.oceanDepthClass = OceanDepthClass.SHELF;
    cell.continentId = null;
    cell.oceanBasinId = 1;
    cell.continentality = 0.12;
    cell.continentCoreStrength = 0.03;
    cell.shelfStrength = 0.18;
    cell.marginType = ContinentMarginType.NONE;
    cell.islandCause = IslandCause.NONE;

    const before = cell.baseHeight;
    applyGeographyAuthorityCleanup(world, profile);

    expect(cell.baseHeight).toBeLessThan(before);
  });
});
