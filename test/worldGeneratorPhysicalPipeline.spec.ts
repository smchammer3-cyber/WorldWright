import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { applyGeneratedGeographyPipeline } from '../src/core/worldGeographyPipeline';
import { recomputeWorld } from '../src/core/worldRecompute';
import { BoundaryType, SurfaceType } from '../src/core/worldSchema';

function landFraction(world: ReturnType<typeof generateWorldFromParams>): number {
  const land = world.cells.filter((cell) => !cell.isWater).length;
  return land / Math.max(1, world.cells.length);
}

describe('Generate physical pipeline selection', () => {
  it('keeps continent count from being a direct land-coverage control', () => {
    const base = { ...createDefaultGeneratorParams(), width: 96, height: 48, seed: 'continent-count-not-water', seaLevel: 50, seaLevelOffset: 50, waterInventory: 0.54 };
    const few = generateWorldFromParams({ ...base, continentCount: 1 });
    const many = generateWorldFromParams({ ...base, continentCount: 12 });

    expect(few.planetFoundation?.waterInventory).toBeCloseTo(many.planetFoundation?.waterInventory ?? 0, 6);
    expect(few.planetFoundation?.seaLevelOffset).toBeCloseTo(many.planetFoundation?.seaLevelOffset ?? 0, 6);
    expect(Math.abs(landFraction(few) - landFraction(many))).toBeLessThan(0.035);
  });

  it('lets water inventory change exposure independently of continent count', () => {
    const base = { ...createDefaultGeneratorParams(), width: 96, height: 48, seed: 'water-inventory-exposure', seaLevel: 50, seaLevelOffset: 50, continentCount: 4 };
    const dry = generateWorldFromParams({ ...base, waterInventory: 0.06 });
    const wet = generateWorldFromParams({ ...base, waterInventory: 0.92 });

    expect(dry.planetFoundation?.waterInventory).toBeLessThan(wet.planetFoundation?.waterInventory ?? 0);
    expect(landFraction(dry)).toBeGreaterThan(landFraction(wet));
  });

  it('uses sea level offset as exposure over the solved water inventory', () => {
    const base = { ...createDefaultGeneratorParams(), width: 96, height: 48, seed: 'sea-level-offset-exposure', waterInventory: 0.54, continentCount: 4 };
    const lowOffset = generateWorldFromParams({ ...base, seaLevel: 20, seaLevelOffset: 20 });
    const highOffset = generateWorldFromParams({ ...base, seaLevel: 80, seaLevelOffset: 80 });

    expect(lowOffset.planetFoundation?.waterInventory).toBeCloseTo(highOffset.planetFoundation?.waterInventory ?? 0, 6);
    expect(lowOffset.planetFoundation?.seaLevelOffset).toBeLessThan(highOffset.planetFoundation?.seaLevelOffset ?? 0);
    expect(landFraction(lowOffset)).toBeGreaterThan(landFraction(highOffset));
  });

  it('does not seed surface water or ocean classes for an ice shell raw world', () => {
    const world = generateWorldFromParams({
      ...createDefaultGeneratorParams(),
      width: 64,
      height: 32,
      seed: 'raw-ice-shell-water-mode',
      planetProfile: 'ICE_SHELL_OCEAN_WORLD',
      waterInventory: 0.90,
      tidalHeatingIntent: 0.80,
      orbitalDistanceAU: 2.0,
    });

    expect(world.planetFoundation?.surfaceWaterMode).toBe('ICE_SHELL_OVER_OCEAN');
    expect(world.cells.every((cell) => !cell.isWater)).toBe(true);
    expect(world.cells.every((cell) => cell.oceanDepthClass == null)).toBe(true);
    expect(world.cells.filter((cell) => cell.baseHeight < world.seaLevel).some((cell) => cell.flowAccumulation > 0)).toBe(true);
  });

  it('does not run normal continent/crust terrain passes for an ice shell ocean world', () => {
    const world = generateWorldFromParams({
      ...createDefaultGeneratorParams(),
      width: 64,
      height: 32,
      seed: 'ice-shell-pipeline-gate',
      planetProfile: 'ICE_SHELL_OCEAN_WORLD',
      waterInventory: 0.90,
      tidalHeatingIntent: 0.80,
      orbitalDistanceAU: 2.0,
    });

    expect(world.planetFoundation?.geologyStack).toBe('ICE_SHELL_TECTONIC');
    applyGeneratedGeographyPipeline(world);

    expect(world.continentSkeletons?.length ?? 0).toBe(0);
    expect(world.cells.every((cell) => cell.continentId == null)).toBe(true);
    expect(world.cells.every((cell) => !cell.isWater)).toBe(true);
    expect(world.cells.some((cell) => cell.surfaceType === SurfaceType.PERMAFROST)).toBe(true);
  });

  it('suppresses plate boundary terrain causes on stagnant-lid rocky worlds', () => {
    const world = generateWorldFromParams({
      ...createDefaultGeneratorParams(),
      width: 64,
      height: 32,
      seed: 'stagnant-lid-pipeline-gate',
      planetProfile: 'ROCKY_ALIEN',
      waterInventory: 0.20,
      coreHeatIntent: 0.04,
      compositionRadioactivity: 0.05,
      tidalHeatingIntent: 0,
      stagnantLidBias: 0.95,
      planetAge: 98,
      plateActivity: 5,
    });

    expect(world.planetFoundation?.geologyStack).toBe('STAGNANT_LID');
    expect(world.cells.every((cell) => cell.boundaryType === BoundaryType.NONE)).toBe(true);
    expect(world.cells.every((cell) => Math.abs(cell.upliftRate) < 1e-9)).toBe(true);
  });

  it('keeps recomputed river ids compatible with the WorldBrain schema', () => {
    const world = generateWorldFromParams({ ...createDefaultGeneratorParams(), width: 64, height: 32, seed: 'schema-safe-rivers' });
    recomputeWorld(world, ['GENERATED']);

    expect(world.rivers.every((river) => typeof river.id === 'string')).toBe(true);
  });
});
