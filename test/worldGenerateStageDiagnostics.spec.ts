import { describe, expect, it } from 'vitest';
import { computeGeneratedStageDiagnostics } from '../src/core/worldGenerateStageDiagnostics';
import { buildGenerateRuntimeStagePlan } from '../src/core/generateRuntimeStagePlan';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';

describe('generated stage diagnostics', () => {
  it('replays the runtime stage plan and reports authority stages', () => {
    const params = createDefaultGeneratorParams();
    params.width = 64;
    params.height = 32;
    params.seed = 'stage-diagnostics';
    params.continentCount = 4;

    const world = generateWorldFromParams(params);
    const runtimePlan = buildGenerateRuntimeStagePlan(world);
    const diagnostics = computeGeneratedStageDiagnostics(world);

    expect(diagnostics).not.toBeNull();
    expect(diagnostics?.stages.map((stage) => stage.id)).toEqual(runtimePlan.stages.map((stage) => stage.id));
    expect(diagnostics?.stages.some((stage) => stage.id === 'CRUST_TERRAIN_INFLUENCE')).toBe(runtimePlan.stages.some((stage) => stage.id === 'CRUST_TERRAIN_INFLUENCE'));
    expect(diagnostics?.stages.some((stage) => stage.id === 'CRUST_PROVINCE_DELTA')).toBe(false);

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
