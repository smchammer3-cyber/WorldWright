import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { makePlanetPreviewFromWorldBrain, PLANET_PREVIEW_MODES } from '../src/core/planetRenderer';
import { seedContinentSkeletonFields, ensureContinentSkeletonFields } from '../src/core/worldContinents';
import { validateWorld } from '../src/core/worldValidation';
import { ContinentMarginType, IslandCause } from '../src/core/worldSchema';

describe('continent skeleton fields', () => {
  it('seeds deterministic continent and ocean basin skeletons', () => {
    const params = createDefaultGeneratorParams();
    params.width = 96;
    params.height = 48;
    params.seed = 'continent-skeletons';
    params.continentCount = 5;
    const world = generateWorldFromParams(params);

    seedContinentSkeletonFields(world);

    expect(world.continentSkeletons?.length).toBeGreaterThanOrEqual(2);
    expect(world.continentSkeletons?.length).toBeLessThanOrEqual(7);
    expect(world.oceanBasinSkeletons?.length).toBeGreaterThanOrEqual(2);

    const continentalCells = world.cells.filter((cell) => cell.continentId != null);
    const oceanCells = world.cells.filter((cell) => cell.oceanBasinId != null);
    expect(continentalCells.length).toBeGreaterThan(world.cells.length * 0.10);
    expect(oceanCells.length).toBeGreaterThan(world.cells.length * 0.10);

    for (const cell of world.cells) {
      expect(cell.continentCoreStrength).toBeGreaterThanOrEqual(0);
      expect(cell.continentCoreStrength).toBeLessThanOrEqual(1);
      expect(cell.continentality).toBeGreaterThanOrEqual(0);
      expect(cell.continentality).toBeLessThanOrEqual(1);
      expect(cell.distanceToContinentCore).toBeGreaterThanOrEqual(0);
      expect(cell.distanceToContinentCore).toBeLessThanOrEqual(1);
      expect(cell.shelfStrength).toBeGreaterThanOrEqual(0);
      expect(cell.shelfStrength).toBeLessThanOrEqual(1);
      expect(Object.values(ContinentMarginType)).toContain(cell.marginType);
      expect(Object.values(IslandCause)).toContain(cell.islandCause);
    }

    expect(validateWorld(world)).toEqual([]);
  });

  it('repairs legacy worlds missing continent skeleton fields', () => {
    const params = createDefaultGeneratorParams();
    params.width = 64;
    params.height = 32;
    params.seed = 'legacy-continent-skeletons';
    const world = generateWorldFromParams(params) as any;

    delete world.continentSkeletons;
    delete world.oceanBasinSkeletons;
    delete world.cells[0].continentality;
    delete world.cells[0].continentCoreStrength;
    delete world.cells[0].distanceToContinentCore;
    delete world.cells[0].shelfStrength;
    delete world.cells[0].marginType;
    delete world.cells[0].islandCause;

    ensureContinentSkeletonFields(world);

    expect(world.continentSkeletons.length).toBeGreaterThan(0);
    expect(world.oceanBasinSkeletons.length).toBeGreaterThan(0);
    expect(typeof world.cells[0].continentality).toBe('number');
    expect(Object.values(ContinentMarginType)).toContain(world.cells[0].marginType);
    expect(Object.values(IslandCause)).toContain(world.cells[0].islandCause);
    expect(validateWorld(world)).toEqual([]);
  });

  it('exposes a continent skeleton preview layer', () => {
    const params = createDefaultGeneratorParams();
    params.width = 64;
    params.height = 32;
    params.seed = 'continent-preview';
    const world = generateWorldFromParams(params);
    seedContinentSkeletonFields(world);

    expect(PLANET_PREVIEW_MODES.some((mode) => mode.id === 'CONTINENTS')).toBe(true);
    const preview = makePlanetPreviewFromWorldBrain(world, 'CONTINENTS');
    expect(preview.rgba.length).toBe(world.gridWidth * world.gridHeight * 4);
  });
});
