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
      'PLATE_BOUNDARY_FEATURE_TERRAIN',
      'SKELETON_ELEVATION',
      'FIRST_RECOMPUTE',
      'QUALITY_PASS',
      'SECOND_RECOMPUTE',
      'CRUST_CONTINENT_RESEED',
      'CRUST_FIELDS',
      'ISOSTATIC_TERRAIN_RESPONSE',
      'CRUST_PROVINCE_DELTA',
      'CRUST_COAST_BREAKUP',
      'CRUST_COHERENCE',
      'CRUST_TINY_ISLAND_CLEANUP',
      'MATERIAL_RELIEF_REINFORCEMENT',
      'COAST_SHAPE_PASS',
      'OCEAN_BATHYMETRY_SMOOTHING',
      'FINAL_RECOMPUTE',
      'FINAL_CONTINENT_RESEED',
      'FINAL_CRUST_RESEED',
    ]);

    for (const stage of diagnostics?.stages ?? []) {
      expect(Number.isFinite(stage.raw.landFraction)).toBe(true);
      expect(stage.raw.landFraction).toBeGreaterThanOrEqual(0);
      expect(stage.raw.landFraction).toBeLessThanOrEqual(1);
      expect(Number.isFinite(stage.raw.landComponents)).toBe(true);
      expect(Number.isFinite(stage.raw.mediumFragmentCount)).toBe(true);
      expect(Number.isFinite(stage.raw.landHeightStdDev)).toBe(true);
      expect(stage.raw.featureAuthorityCoverage).toBeGreaterThanOrEqual(0);
      expect(stage.raw.featureAuthorityCoverage).toBeLessThanOrEqual(1);
      expect(stage.raw.plateAuthorityLeakShare).toBeGreaterThanOrEqual(0);
      expect(stage.raw.plateAuthorityLeakShare).toBeLessThanOrEqual(1);
      expect(stage.raw.provinceAuthorityLeakShare).toBeGreaterThanOrEqual(0);
      expect(stage.raw.provinceAuthorityLeakShare).toBeLessThanOrEqual(1);
      expect(stage.raw.continentIdCount).toBeGreaterThanOrEqual(0);
      expect(stage.raw.continentAuthorityShare).toBeGreaterThanOrEqual(0);
      expect(stage.raw.continentAuthorityShare).toBeLessThanOrEqual(1);
      expect(stage.raw.strongContinentAuthorityShare).toBeGreaterThanOrEqual(0);
      expect(stage.raw.strongContinentAuthorityShare).toBeLessThanOrEqual(1);
      expect(stage.raw.continentAuthorityLandCaptureShare).toBeGreaterThanOrEqual(0);
      expect(stage.raw.continentAuthorityLandCaptureShare).toBeLessThanOrEqual(1);
      expect(stage.raw.openOceanContinentGhostShare).toBeGreaterThanOrEqual(0);
      expect(stage.raw.openOceanContinentGhostShare).toBeLessThanOrEqual(1);
      expect(stage.raw.meanLandContinentality).toBeGreaterThanOrEqual(0);
      expect(stage.raw.meanLandContinentality).toBeLessThanOrEqual(1);
      expect(stage.raw.meanOceanContinentality).toBeGreaterThanOrEqual(0);
      expect(stage.raw.meanOceanContinentality).toBeLessThanOrEqual(1);
      expect(stage.raw.meanOpenOceanContinentality).toBeGreaterThanOrEqual(0);
      expect(stage.raw.meanOpenOceanContinentality).toBeLessThanOrEqual(1);
    }

    const continentStage = diagnostics?.stages.find((stage) => stage.id === 'CONTINENT_FIELDS');
    expect(continentStage?.raw.continentAuthorityShare ?? 0).toBeGreaterThan(0);
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
