import { describe, expect, it } from 'vitest';
import { computeFinalColorAuthorityDiagnostics } from '../src/core/worldFinalColorAuthorityDiagnostics';
import { applyGeneratedGeographyPipeline } from '../src/core/worldGeographyPipeline';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';

describe('final color authority diagnostics', () => {
  it('reports bounded final-color authority metrics for a generated world', () => {
    const params = createDefaultGeneratorParams();
    params.width = 64;
    params.height = 32;
    params.seed = 'final-color-authority';

    const world = generateWorldFromParams(params);
    applyGeneratedGeographyPipeline(world);

    const diagnostics = computeFinalColorAuthorityDiagnostics(world);

    expect(diagnostics.surfaceExplainedColorJumpShare).toBeGreaterThanOrEqual(0);
    expect(diagnostics.surfaceExplainedColorJumpShare).toBeLessThanOrEqual(1);
    expect(diagnostics.hiddenAuthorityColorLeakShare).toBeGreaterThanOrEqual(0);
    expect(diagnostics.hiddenAuthorityColorLeakShare).toBeLessThanOrEqual(1);

    for (const ratio of [
      diagnostics.plateColorImprintRatio,
      diagnostics.provinceColorImprintRatio,
      diagnostics.skeletonColorImprintRatio,
    ]) {
      if (ratio != null) expect(Number.isFinite(ratio)).toBe(true);
    }
  });
});
