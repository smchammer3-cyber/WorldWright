import { describe, expect, it } from 'vitest';
import { makePlanetPreviewFromWorldBrain } from '../src/core/planetRenderer';
import { applyGeneratedGeographyPipeline } from '../src/core/worldGeographyPipeline';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import {
  BoundaryType,
  ContinentMarginType,
  CrustProvince,
  IslandCause,
  OceanDepthClass,
  type WorldBrain,
} from '../src/core/worldSchema';

function makeSmallGeneratedWorld(seed: string): WorldBrain {
  const params = createDefaultGeneratorParams();
  params.width = 64;
  params.height = 32;
  params.seed = seed;
  const world = generateWorldFromParams(params);
  applyGeneratedGeographyPipeline(world);
  return world;
}

function cloneWorld(world: WorldBrain): WorldBrain {
  return JSON.parse(JSON.stringify(world)) as WorldBrain;
}

function scrambleHiddenAuthority(world: WorldBrain): WorldBrain {
  const out = cloneWorld(world);
  const provinces = Object.values(CrustProvince);
  const margins = Object.values(ContinentMarginType);
  const islands = Object.values(IslandCause);
  const boundaries = Object.values(BoundaryType);
  const oceanDepths = Object.values(OceanDepthClass);

  for (const cell of out.cells) {
    cell.plateId = 10_000 + ((cell.index * 17) % 23);
    cell.crustProvince = provinces[(cell.index * 5) % provinces.length];
    cell.marginType = margins[(cell.index * 7) % margins.length];
    cell.islandCause = islands[(cell.index * 11) % islands.length];
    cell.boundaryType = boundaries[(cell.index * 13) % boundaries.length];
    cell.oceanDepthClass = oceanDepths[(cell.index * 3) % oceanDepths.length];
    cell.continentId = cell.isWater ? null : 500 + ((cell.index * 19) % 13);
    cell.oceanBasinId = cell.isWater ? 900 + ((cell.index * 23) % 11) : null;
  }

  return out;
}

describe('Final renderer authority', () => {
  it('does not change Final colors when only hidden cause masks change', () => {
    const world = makeSmallGeneratedWorld('final-authority-hidden-mask');
    const scrambled = scrambleHiddenAuthority(world);

    const before = makePlanetPreviewFromWorldBrain(world, 'FINAL').rgba;
    const after = makePlanetPreviewFromWorldBrain(scrambled, 'FINAL').rgba;

    expect(Array.from(after)).toEqual(Array.from(before));
  });

  it('keeps debug mask layers responsive to hidden cause masks', () => {
    const world = makeSmallGeneratedWorld('final-authority-debug-mask');
    const scrambled = scrambleHiddenAuthority(world);

    const before = makePlanetPreviewFromWorldBrain(world, 'CRUST_PROVINCE').rgba;
    const after = makePlanetPreviewFromWorldBrain(scrambled, 'CRUST_PROVINCE').rgba;

    expect(Array.from(after)).not.toEqual(Array.from(before));
  });

  it('still lets Final color respond to visible surface facts', () => {
    const world = makeSmallGeneratedWorld('final-authority-surface');
    const changed = cloneWorld(world);
    const index = changed.cells.findIndex((cell) => !cell.isWater);
    expect(index).toBeGreaterThanOrEqual(0);

    const before = makePlanetPreviewFromWorldBrain(changed, 'FINAL').sampleGlobeColor(index);
    changed.cells[index].rainfall = changed.cells[index].rainfall > 0.5 ? 0 : 1;
    changed.cells[index].temperature = changed.cells[index].temperature > 0.5 ? 0 : 1;
    changed.cells[index].snowCover = changed.cells[index].snowCover > 0.3 ? 0 : 0.85;
    const after = makePlanetPreviewFromWorldBrain(changed, 'FINAL').sampleGlobeColor(index);

    expect(after).not.toEqual(before);
  });
});
