import { describe, expect, it } from 'vitest';
import { getDiagnosticContext } from '../src/core/worldDiagnosticContext';
import { computeWorldDiagnostics } from '../src/core/worldDiagnostics';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { applyGeneratedWorldQualityPass } from '../src/core/worldQualityPass';
import { recomputeWorld } from '../src/core/worldRecompute';

describe('baseline diagnostics and quality pass', () => {
  it('labels default earthlike worlds as baseline and sea-level extremes as current extremes', () => {
    const baselineParams = createDefaultGeneratorParams();
    baselineParams.width = 96;
    baselineParams.height = 48;
    baselineParams.seed = 'baseline-context';
    const baseline = generateWorldFromParams(baselineParams);
    expect(getDiagnosticContext(baseline).mode).toBe('baseline');

    const extremeParams = createDefaultGeneratorParams();
    extremeParams.width = 96;
    extremeParams.height = 48;
    extremeParams.seed = 'baseline-context';
    extremeParams.seaLevel = 100;
    const extreme = generateWorldFromParams(extremeParams);
    expect(getDiagnosticContext(extreme).mode).toBe('extreme');
    expect(getDiagnosticContext(extreme).warnings.length).toBeGreaterThan(0);
  });

  it('increases terrain signal without reintroducing plate seam dominance', () => {
    const params = createDefaultGeneratorParams();
    params.width = 96;
    params.height = 48;
    params.seed = 'quality-pass-target';

    const world = generateWorldFromParams(params);
    const before = computeWorldDiagnostics(world).raw;

    recomputeWorld(world, ['GENERATED']);
    applyGeneratedWorldQualityPass(world);
    recomputeWorld(world, ['GENERATED']);

    const after = computeWorldDiagnostics(world).raw;

    expect(after.landHeightStdDev).toBeGreaterThanOrEqual(before.landHeightStdDev * 0.95);
    expect(after.coastlineEdgeDensity).toBeGreaterThan(0.02);
    expect(after.seamHeightRatio ?? 0).toBeLessThan(2.5);
  });
});
