import { describe, expect, it } from 'vitest';
import { computeWorldDiagnostics } from '../src/core/worldDiagnostics';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';

describe('generator diagnostic targets', () => {
  it('tracks seam imprint and land relief on representative seeds', () => {
    const seeds = ['109344111', 'diagnostic-a', 'diagnostic-b', 'diagnostic-c'];
    const diagnostics = seeds.map((seed) => {
      const params = createDefaultGeneratorParams();
      params.width = 96;
      params.height = 48;
      params.seed = seed;
      const world = generateWorldFromParams(params);
      return computeWorldDiagnostics(world).raw;
    });

    const avgSeam = average(diagnostics.map((d) => d.seamHeightRatio ?? 0));
    const avgLandRelief = average(diagnostics.map((d) => d.landHeightStdDev));
    const avgLargestLandmass = average(diagnostics.map((d) => d.largestLandmassShare));

    expect(avgSeam).toBeLessThan(4.8);
    expect(avgLandRelief).toBeGreaterThan(0.015);
    expect(avgLargestLandmass).toBeLessThan(0.90);
  });
});

function average(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
}
