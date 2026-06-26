import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import {
  buildGenerateRuntimeStagePlan,
  generatorParamsFromRuntimeWorld,
} from '../src/core/generateRuntimeStagePlan';

function stageIds(world: ReturnType<typeof generateWorldFromParams>): string[] {
  return buildGenerateRuntimeStagePlan(world).stages.map((stage) => stage.id);
}

describe('Generate runtime stage plan', () => {
  it('describes the current normal rocky/liquid runtime order without decomposing hidden subpasses', () => {
    const world = generateWorldFromParams({
      ...createDefaultGeneratorParams(),
      width: 64,
      height: 32,
      seed: 'runtime-plan-earthlike',
      planetProfile: 'EARTHLIKE_ROCKY',
      waterInventory: 0.54,
      seaLevelOffset: 50,
    });

    expect(stageIds(world)).toEqual([
      'RAW_GENERATOR',
      'CONTINENT_FIELDS',
      'PLATE_BOUNDARY_FEATURE_TERRAIN',
      'SKELETON_ELEVATION',
      'FIRST_RECOMPUTE',
      'QUALITY_PASS',
      'SECOND_RECOMPUTE',
      'CRUST_CONTINENT_RESEED',
      'CRUST_FIELDS',
      'ISOSTATIC_TERRAIN_RESPONSE',
      'CRUST_TERRAIN_INFLUENCE',
      'OCEAN_BATHYMETRY_SMOOTHING',
      'FINAL_RECOMPUTE',
      'FINAL_CONTINENT_RESEED',
      'FINAL_CRUST_RESEED',
    ]);
  });

  it('blocks normal continents, crust, plate terrain, and ocean bathymetry for ice-shell worlds', () => {
    const world = generateWorldFromParams({
      ...createDefaultGeneratorParams(),
      width: 64,
      height: 32,
      seed: 'runtime-plan-ice-shell',
      planetProfile: 'ICE_SHELL_OCEAN_WORLD',
      waterInventory: 0.90,
      tidalHeatingIntent: 0.80,
      orbitalDistanceAU: 2.0,
    });

    const plan = buildGenerateRuntimeStagePlan(world);
    expect(plan.gates.geologyStack).toBe('ICE_SHELL_TECTONIC');
    expect(plan.gates.surfaceWaterMode).toBe('ICE_SHELL_OVER_OCEAN');
    expect(plan.stages.map((stage) => stage.id)).toEqual([
      'RAW_GENERATOR',
      'FIRST_RECOMPUTE',
      'SECOND_RECOMPUTE',
      'FINAL_RECOMPUTE',
    ]);
    expect(plan.blockedStages.map((stage) => stage.id)).toEqual(expect.arrayContaining([
      'CONTINENT_FIELDS',
      'PLATE_BOUNDARY_FEATURE_TERRAIN',
      'SKELETON_ELEVATION',
      'QUALITY_PASS',
      'CRUST_FIELDS',
      'ISOSTATIC_TERRAIN_RESPONSE',
      'CRUST_TERRAIN_INFLUENCE',
      'OCEAN_BATHYMETRY_SMOOTHING',
      'FINAL_CONTINENT_RESEED',
      'FINAL_CRUST_RESEED',
    ]));
  });

  it('preserves water inventory and sea-level offset when diagnostics reconstruct generator params', () => {
    const world = generateWorldFromParams({
      ...createDefaultGeneratorParams(),
      width: 80,
      height: 40,
      seed: 'runtime-plan-param-preservation',
      seaLevel: 63,
      seaLevelOffset: 63,
      waterInventory: 0.23,
      planetProfile: 'ROCKY_ALIEN',
    });

    const params = generatorParamsFromRuntimeWorld(world);
    expect(params.waterInventory).toBeCloseTo(0.23, 6);
    expect(params.seaLevelOffset).toBe(63);
    expect(params.planetProfile).toBe('ROCKY_ALIEN');
  });
});
