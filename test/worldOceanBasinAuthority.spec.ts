import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { applyOceanBasinAuthority } from '../src/core/worldOceanBasinAuthority';
import { buildGeographyProfile } from '../src/core/worldGeographyProfile';
import { ContinentMarginType, IslandCause } from '../src/core/worldSchema';

function seedTwoContinentCores(world: any): void {
  world.continentSkeletons = [
    { id: 1, coreLat: 0, coreLon: -80, shapeType: 'COMPACT_SHIELD', size: 0.65, axisAngle: 0, elongation: 1.0, lobeCount: 2 },
    { id: 2, coreLat: 0, coreLon: 80, shapeType: 'COMPACT_SHIELD', size: 0.65, axisAngle: 0, elongation: 1.0, lobeCount: 2 },
  ];
}

describe('world ocean basin authority', () => {
  it('cuts weak medium-continentality corridors between continent cores', () => {
    const params = createDefaultGeneratorParams();
    params.width = 16;
    params.height = 8;
    params.seed = 'ocean-corridor-authority';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;
    seedTwoContinentCores(world);
    const profile = buildGeographyProfile(world);

    const corridor = world.cells[3 * world.gridWidth + 7];
    corridor.baseHeight = 0.08;
    corridor.editHeightDelta = 0;
    corridor.simHeightDelta = 0;
    corridor.continentId = 1;
    corridor.oceanBasinId = 1;
    corridor.continentality = 0.45;
    corridor.continentCoreStrength = 0.10;
    corridor.shelfStrength = 0.50;
    corridor.marginType = ContinentMarginType.PASSIVE;
    corridor.islandCause = IslandCause.NONE;

    const before = corridor.baseHeight;
    applyOceanBasinAuthority(world, profile);

    expect(corridor.baseHeight).toBeLessThan(before);
  });

  it('protects true continent cores from ocean corridor cutting', () => {
    const params = createDefaultGeneratorParams();
    params.width = 16;
    params.height = 8;
    params.seed = 'ocean-core-protection';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;
    seedTwoContinentCores(world);
    const profile = buildGeographyProfile(world);

    const core = world.cells[3 * world.gridWidth + 4];
    core.baseHeight = 0.12;
    core.editHeightDelta = 0;
    core.simHeightDelta = 0;
    core.continentId = 1;
    core.oceanBasinId = null;
    core.continentality = 0.92;
    core.continentCoreStrength = 0.90;
    core.shelfStrength = 0.03;
    core.marginType = ContinentMarginType.NONE;
    core.islandCause = IslandCause.NONE;

    const before = core.baseHeight;
    applyOceanBasinAuthority(world, profile);

    expect(core.baseHeight).toBeGreaterThanOrEqual(before - 0.002);
  });

  it('cuts weak cells inside an excessive single landmass instead of lowering every core', () => {
    const params = createDefaultGeneratorParams();
    params.width = 16;
    params.height = 8;
    params.seed = 'ocean-excess-landmass';
    const world = generateWorldFromParams(params);
    world.seaLevel = 0;
    world.metadata.seaLevel = 0;
    seedTwoContinentCores(world);
    const profile = buildGeographyProfile(world);

    for (const cell of world.cells) {
      cell.baseHeight = 0.05;
      cell.editHeightDelta = 0;
      cell.simHeightDelta = 0;
      cell.continentality = 0.36;
      cell.continentCoreStrength = 0.08;
      cell.shelfStrength = 0.45;
      cell.continentId = 1;
      cell.oceanBasinId = 1;
      cell.marginType = ContinentMarginType.PASSIVE;
      cell.islandCause = IslandCause.NONE;
    }

    const protectedCore = world.cells[3 * world.gridWidth + 4];
    protectedCore.baseHeight = 0.13;
    protectedCore.continentality = 0.95;
    protectedCore.continentCoreStrength = 0.92;
    protectedCore.shelfStrength = 0.02;

    applyOceanBasinAuthority(world, profile);

    expect(protectedCore.baseHeight).toBeGreaterThan(0.11);
    expect(world.cells.some((cell) => cell.baseHeight < 0.05)).toBe(true);
  });
});
