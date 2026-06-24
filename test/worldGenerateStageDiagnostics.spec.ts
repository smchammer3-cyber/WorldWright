import { describe, expect, it } from 'vitest';
import { computeGeneratedStageDiagnostics } from '../src/core/worldGenerateStageDiagnostics';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';

describe('generated stage diagnostics', () => {
  it('replays the generated pipeline and reports all authority stages', () => {
    const params = createDefaultGeneratorParams();
    params.width = 64;
    params.height = 32;
    params.seed = 'stage-diagnostics';
    params.continentCount = 4;

    const world = generateWorldFromParams(params);
    const diagnostics = computeGeneratedStageDiagnostics(world);

    expect(diagnostics).not.toBeNull();
    expect(diagnostics?.stages.map((stage) => stage.id)).toEqual([
      'RAW_GENERATOR',
      'CONTINENT_FIELDS',
      'SKELETON_ELEVATION',
      'FIRST_RECOMPUTE',
      'QUALITY_PASS',
      'CRUST_FIELDS',
      'CRUST_PROVINCE_DELTA',
      'CRUST_COAST_BREAKUP',
      'CRUST_COHERENCE',
      'CRUST_SKELETON_OBEDIENCE',
      'CRUST_TINY_ISLAND_CLEANUP',
      'OCEAN_BATHYMETRY_SMOOTHING',
      'FINAL_RECOMPUTE',
    ]);

    for (const stage of diagnostics?.stages ?? []) {
      expect(Number.isFinite(stage.raw.landFraction)).toBe(true);
      expect(stage.raw.landFraction).toBeGreaterThanOrEqual(0);
      expect(stage.raw.landFraction).toBeLessThanOrEqual(1);
      expect(Number.isFinite(stage.raw.landComponents)).toBe(true);
      expect(Number.isFinite(stage.raw.mediumFragmentCount)).toBe(true);
      expect(Number.isFinite(stage.raw.landHeightStdDev)).toBe(true);
    }
  });

  it('does not mutate the active world while replaying stage diagnostics', () => {
    const params = createDefaultGeneratorParams();
    params.width = 64;
    params.height = 32;
    params.seed = 'stage-diagnostics-no-mutate';

    const world = generateWorldFromParams(params);
    const before = world.cells.map((cell) => ({
      baseHeight: cell.baseHeight,
      editHeightDelta: cell.editHeightDelta,
      simHeightDelta: cell.simHeightDelta,
      isWater: cell.isWater,
    }));

    computeGeneratedStageDiagnostics(world);

    const after = world.cells.map((cell) => ({
      baseHeight: cell.baseHeight,
      editHeightDelta: cell.editHeightDelta,
      simHeightDelta: cell.simHeightDelta,
      isWater: cell.isWater,
    }));
    expect(after).toEqual(before);
  });
});
