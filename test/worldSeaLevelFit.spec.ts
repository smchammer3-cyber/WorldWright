import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { buildGeographyProfile } from '../src/core/worldGeographyProfile';
import { refitSeaLevelToProfile } from '../src/core/worldSeaLevelFit';
import { seedSkeletonCauseFields } from '../src/core/worldSkeletonCause';
import { composeSkeletonFirstTerrain } from '../src/core/worldTerrainComposer';

function landCoverage(world: ReturnType<typeof generateWorldFromParams>): number {
  const sea = world.seaLevel;
  const land = world.cells.filter((cell) => cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta >= sea).length;
  return land / world.cells.length;
}

describe('profile sea level fitting', () => {
  it('refits sea level to the profile land target after terrain changes', () => {
    const params = createDefaultGeneratorParams();
    params.width = 40;
    params.height = 20;
    params.seed = 'sea-level-fit';
    const world = generateWorldFromParams(params);
    const profile = buildGeographyProfile(world);

    for (let i = 0; i < world.cells.length; i++) {
      world.cells[i].baseHeight = -0.4 + (i / Math.max(1, world.cells.length - 1)) * 0.8;
      world.cells[i].editHeightDelta = 0;
      world.cells[i].simHeightDelta = 0;
    }

    refitSeaLevelToProfile(world, profile);
    const coverage = landCoverage(world);

    expect(coverage).toBeGreaterThanOrEqual(profile.landCoverageTarget[0] - 0.04);
    expect(coverage).toBeLessThanOrEqual(profile.landCoverageTarget[1] + 0.04);
    expect(world.metadata.seaLevel).toBe(world.seaLevel);
  });

  it('stabilizes skeleton-first composition by letting refit correct land coverage', () => {
    const params = createDefaultGeneratorParams();
    params.width = 64;
    params.height = 32;
    params.seed = 'composer-refit-stabilization';
    const world = generateWorldFromParams(params);
    const profile = buildGeographyProfile(world);

    seedSkeletonCauseFields(world);
    composeSkeletonFirstTerrain(world, profile);
    const before = landCoverage(world);
    refitSeaLevelToProfile(world, profile);
    const after = landCoverage(world);

    expect(Math.abs(after - midpoint(profile.landCoverageTarget))).toBeLessThan(Math.abs(before - midpoint(profile.landCoverageTarget)) + 0.001);
  });

  it('makes weak ocean-basin overlap cells ocean-favored in the composer', () => {
    const params = createDefaultGeneratorParams();
    params.width = 32;
    params.height = 16;
    params.seed = 'composer-overlap-ocean-wins';
    const world = generateWorldFromParams(params);
    const sea = world.seaLevel;
    const profile = buildGeographyProfile(world);
    const cell = world.cells[100];

    cell.baseHeight = sea + 0.20;
    cell.editHeightDelta = 0;
    cell.simHeightDelta = 0;
    cell.continentId = 1;
    cell.oceanBasinId = 1;
    cell.continentality = 0.50;
    cell.continentCoreStrength = 0.12;
    cell.shelfStrength = 0.35;
    cell.volcanicActivity = 0;

    composeSkeletonFirstTerrain(world, profile);

    expect(cell.baseHeight).toBeLessThan(sea + 0.02);
  });
});

function midpoint(range: [number, number]): number {
  return (range[0] + range[1]) / 2;
}
