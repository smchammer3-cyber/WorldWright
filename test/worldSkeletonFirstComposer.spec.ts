import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { buildGeographyProfile } from '../src/core/worldGeographyProfile';
import { seedSkeletonCauseFields } from '../src/core/worldSkeletonCause';
import { composeSkeletonFirstTerrain } from '../src/core/worldTerrainComposer';

describe('skeleton-first terrain composition', () => {
  it('normalizes skeleton cause fields without depending on existing height', () => {
    const params = createDefaultGeneratorParams();
    params.width = 32;
    params.height = 16;
    params.seed = 'height-independent-skeleton-causes';

    const high = generateWorldFromParams(params);
    const low = generateWorldFromParams(params);
    for (const cell of high.cells) cell.baseHeight = 0.65;
    for (const cell of low.cells) cell.baseHeight = -0.65;

    seedSkeletonCauseFields(high);
    seedSkeletonCauseFields(low);

    const index = Math.floor(high.cells.length * 0.43);
    expect(high.cells[index].continentality).toBeCloseTo(low.cells[index].continentality, 6);
    expect(high.cells[index].shelfStrength).toBeCloseTo(low.cells[index].shelfStrength, 6);
    expect(high.cells[index].marginType).toBe(low.cells[index].marginType);
    expect(high.cells[index].islandCause).toBe(low.cells[index].islandCause);
  });

  it('demotes the previous heightmap to substrate and creates ocean from ocean-basin identity', () => {
    const params = createDefaultGeneratorParams();
    params.width = 32;
    params.height = 16;
    params.seed = 'composer-ocean-identity';
    const world = generateWorldFromParams(params);
    const seaLevel = world.seaLevel;

    for (const cell of world.cells) {
      cell.baseHeight = seaLevel + 0.50;
      cell.editHeightDelta = 0;
      cell.simHeightDelta = 0;
    }

    seedSkeletonCauseFields(world);
    composeSkeletonFirstTerrain(world, buildGeographyProfile(world));

    const oceanLike = world.cells.reduce((best, cell) =>
      cell.continentality < best.continentality ? cell : best,
    world.cells[0]);

    expect(oceanLike.continentality).toBeLessThan(0.45);
    expect(oceanLike.baseHeight).toBeLessThan(seaLevel);
  });

  it('keeps strong continent cores above sea after composition', () => {
    const params = createDefaultGeneratorParams();
    params.width = 32;
    params.height = 16;
    params.seed = 'composer-core-protection';
    const world = generateWorldFromParams(params);
    const seaLevel = world.seaLevel;

    seedSkeletonCauseFields(world);
    composeSkeletonFirstTerrain(world, buildGeographyProfile(world));

    const core = world.cells.reduce((best, cell) =>
      cell.continentCoreStrength > best.continentCoreStrength ? cell : best,
    world.cells[0]);

    expect(core.continentCoreStrength).toBeGreaterThan(0.65);
    expect(core.baseHeight).toBeGreaterThan(seaLevel);
  });
});
