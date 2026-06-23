import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { applyGeneratedGeographyPipeline, applySkeletonBaseElevation } from '../src/core/worldGeographyPipeline';
import { seedContinentSkeletonFields } from '../src/core/worldContinents';
import { validateWorld } from '../src/core/worldValidation';
import { ContinentMarginType, IslandCause } from '../src/core/worldSchema';

describe('world geography pipeline', () => {
  it('runs a skeleton-first generated geography pipeline and keeps the world valid', () => {
    const params = createDefaultGeneratorParams();
    params.width = 96;
    params.height = 48;
    params.seed = 'skeleton-first-pipeline';
    params.continentCount = 4;
    const world = generateWorldFromParams(params);

    applyGeneratedGeographyPipeline(world);

    expect(validateWorld(world)).toEqual([]);
    expect(world.continentSkeletons?.length).toBeGreaterThanOrEqual(2);
    expect(world.oceanBasinSkeletons?.length).toBeGreaterThanOrEqual(2);
    expect(world.cells.some((cell) => cell.continentId != null)).toBe(true);
    expect(world.cells.some((cell) => cell.oceanBasinId != null)).toBe(true);
  });

  it('raises continent cores and lowers ocean basin interiors before crust cleanup', () => {
    const params = createDefaultGeneratorParams();
    params.width = 16;
    params.height = 8;
    params.seed = 'skeleton-base-elevation';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;
    seedContinentSkeletonFields(world);

    const core = world.cells[2 * world.gridWidth + 2];
    core.baseHeight = -0.03;
    core.editHeightDelta = 0;
    core.simHeightDelta = 0;
    core.continentId = 1;
    core.continentality = 0.95;
    core.continentCoreStrength = 0.95;
    core.shelfStrength = 0;
    core.marginType = ContinentMarginType.NONE;
    const coreBefore = core.baseHeight;

    const basin = world.cells[2 * world.gridWidth + 10];
    basin.baseHeight = 0.03;
    basin.editHeightDelta = 0;
    basin.simHeightDelta = 0;
    basin.continentId = null;
    basin.oceanBasinId = 1;
    basin.continentality = 0.05;
    basin.continentCoreStrength = 0;
    basin.shelfStrength = 0;
    basin.marginType = ContinentMarginType.NONE;
    basin.islandCause = IslandCause.INVALID_FRAGMENT;
    const basinBefore = basin.baseHeight;

    applySkeletonBaseElevation(world);

    expect(core.baseHeight).toBeGreaterThan(coreBefore);
    expect(core.baseHeight).toBeGreaterThan(0);
    expect(basin.baseHeight).toBeLessThan(basinBefore);
    expect(basin.baseHeight).toBeLessThan(0);
  });

  it('pulls shelves toward shallow water instead of turning them into bridges', () => {
    const params = createDefaultGeneratorParams();
    params.width = 16;
    params.height = 8;
    params.seed = 'skeleton-shelf-target';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;
    seedContinentSkeletonFields(world);

    const shelf = world.cells[3 * world.gridWidth + 8];
    shelf.baseHeight = 0.18;
    shelf.editHeightDelta = 0;
    shelf.simHeightDelta = 0;
    shelf.continentId = 1;
    shelf.continentality = 0.48;
    shelf.continentCoreStrength = 0.15;
    shelf.shelfStrength = 0.80;
    shelf.marginType = ContinentMarginType.PASSIVE;

    applySkeletonBaseElevation(world);

    expect(shelf.baseHeight).toBeLessThan(0.18);
    expect(shelf.baseHeight).toBeGreaterThan(-0.12);
  });
});
