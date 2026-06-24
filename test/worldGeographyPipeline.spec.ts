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
  });

  it('dampens skeleton elevation near plate and skeleton seams', () => {
    const params = createDefaultGeneratorParams();
    params.width = 16;
    params.height = 8;
    params.seed = 'skeleton-seam-dampening';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;
    seedContinentSkeletonFields(world);

    const configureCore = (row: number, col: number, plateId: number, continentId: number) => {
      const cell = world.cells[row * world.gridWidth + col];
      cell.baseHeight = -0.03;
      cell.editHeightDelta = 0;
      cell.simHeightDelta = 0;
      cell.plateId = plateId;
      cell.continentId = continentId;
      cell.oceanBasinId = null;
      cell.continentality = 0.92;
      cell.continentCoreStrength = 0.86;
      cell.shelfStrength = 0.04;
      cell.marginType = ContinentMarginType.NONE;
      cell.islandCause = IslandCause.NONE;
      return cell;
    };

    const interior = configureCore(2, 4, 1, 1);
    for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) configureCore(2 + dr, 4 + dc, 1, 1);

    const seam = configureCore(5, 10, 2, 2);
    for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const neighbor = world.cells[(5 + dr) * world.gridWidth + 10 + dc];
      neighbor.baseHeight = -0.03;
      neighbor.editHeightDelta = 0;
      neighbor.simHeightDelta = 0;
      neighbor.plateId = 3;
      neighbor.continentId = null;
      neighbor.oceanBasinId = 1;
      neighbor.continentality = 0.08;
      neighbor.continentCoreStrength = 0;
      neighbor.shelfStrength = 0.05;
      neighbor.marginType = ContinentMarginType.NONE;
      neighbor.islandCause = IslandCause.NONE;
    }

    const interiorBefore = interior.baseHeight;
    const seamBefore = seam.baseHeight;

    applySkeletonBaseElevation(world);

    const interiorDelta = interior.baseHeight - interiorBefore;
    const seamDelta = seam.baseHeight - seamBefore;
    expect(interiorDelta).toBeGreaterThan(0);
    expect(seamDelta).toBeGreaterThanOrEqual(0);
    expect(seamDelta).toBeLessThan(interiorDelta * 0.75);
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
    expect(shelf.baseHeight).toBeGreaterThan(0.10);
  });

  it('keeps coherent raw land from being flipped into skeleton-cut water', () => {
    const params = createDefaultGeneratorParams();
    params.width = 16;
    params.height = 8;
    params.seed = 'skeleton-coherent-land-guard';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;
    seedContinentSkeletonFields(world);

    const row = 3;
    const col = 7;
    const center = world.cells[row * world.gridWidth + col];
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        const cell = world.cells[r * world.gridWidth + c];
        cell.baseHeight = 0.018;
        cell.editHeightDelta = 0;
        cell.simHeightDelta = 0;
        cell.continentality = 0.12;
        cell.continentCoreStrength = 0;
        cell.shelfStrength = 0.18;
        cell.marginType = ContinentMarginType.NONE;
        cell.islandCause = IslandCause.NONE;
      }
    }
    const before = center.baseHeight;

    applySkeletonBaseElevation(world);

    expect(center.baseHeight).toBeGreaterThanOrEqual(0.006);
    expect(center.baseHeight).toBeLessThan(before);
  });

  it('still sinks isolated invalid fragments', () => {
    const params = createDefaultGeneratorParams();
    params.width = 16;
    params.height = 8;
    params.seed = 'skeleton-invalid-fragment-sink';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;
    seedContinentSkeletonFields(world);

    const row = 3;
    const col = 7;
    const center = world.cells[row * world.gridWidth + col];
    center.baseHeight = 0.018;
    center.editHeightDelta = 0;
    center.simHeightDelta = 0;
    center.continentality = 0.08;
    center.continentCoreStrength = 0;
    center.shelfStrength = 0.08;
    center.marginType = ContinentMarginType.NONE;
    center.islandCause = IslandCause.INVALID_FRAGMENT;

    for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const neighbor = world.cells[(row + dr) * world.gridWidth + col + dc];
      neighbor.baseHeight = -0.08;
      neighbor.editHeightDelta = 0;
      neighbor.simHeightDelta = 0;
    }

    applySkeletonBaseElevation(world);

    expect(center.baseHeight).toBeLessThan(0);
  });

  it('softens skeleton elevation so it does not collapse raw land coverage', () => {
    const params = createDefaultGeneratorParams();
    params.width = 96;
    params.height = 48;
    params.seed = 'skeleton-land-preservation';
    params.continentCount = 4;
    const world = generateWorldFromParams(params);
    const seaLevel = world.seaLevel;
    const landBefore = fractionLand(world, seaLevel);

    seedContinentSkeletonFields(world);
    applySkeletonBaseElevation(world);

    const landAfter = fractionLand(world, seaLevel);
    expect(landAfter).toBeGreaterThan(landBefore - 0.10);
  });

  it('blocks generated geography passes once authored terrain deltas exist', () => {
    const params = createDefaultGeneratorParams();
    params.width = 32;
    params.height = 16;
    params.seed = 'generated-pass-edit-guard';
    const world = generateWorldFromParams(params);
    world.cells[0].editHeightDelta = 0.125;

    expect(() => applyGeneratedGeographyPipeline(world)).toThrow(/generate-only/);
  });

  it('blocks skeleton base elevation once simulation terrain deltas exist', () => {
    const params = createDefaultGeneratorParams();
    params.width = 32;
    params.height = 16;
    params.seed = 'generated-pass-sim-guard';
    const world = generateWorldFromParams(params);
    seedContinentSkeletonFields(world);
    world.cells[0].simHeightDelta = -0.05;

    expect(() => applySkeletonBaseElevation(world)).toThrow(/generate-only/);
  });
});

function fractionLand(world: ReturnType<typeof generateWorldFromParams>, seaLevel: number): number {
  const land = world.cells.filter((cell) => cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta >= seaLevel).length;
  return land / Math.max(1, world.cells.length);
}
