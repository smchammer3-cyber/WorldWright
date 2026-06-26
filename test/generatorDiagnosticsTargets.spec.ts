import { describe, expect, it } from 'vitest';
import { computeWorldDiagnostics } from '../src/core/worldDiagnostics';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';

const REPRESENTATIVE_SEEDS = ['109344111', 'diagnostic-a', 'diagnostic-b', 'diagnostic-c'];
const EARTHLIKE_LAND_RELIEF_OK_MIN = 0.12;
const EARTHLIKE_SEAM_IMPRINT_OK_MAX = 1.35;

describe('generator diagnostic targets', () => {
  it('tracks representative seeds without pretending current low relief is final quality', () => {
    const diagnostics = representativeDiagnostics();

    const avgSeam = average(diagnostics.map((d) => d.raw.seamHeightRatio ?? 0));
    const avgLandRelief = average(diagnostics.map((d) => d.raw.landHeightStdDev));
    const avgLargestLandmass = average(diagnostics.map((d) => d.raw.largestLandmassShare));
    const landReliefLevels = diagnostics.map((d) => metricLevel(d, 'landRelief'));
    const seamLevels = diagnostics.map((d) => metricLevel(d, 'seams'));

    expect(avgSeam).toBeLessThan(4.8);
    expect(avgLandRelief).toBeGreaterThan(0.015);
    expect(avgLargestLandmass).toBeLessThan(0.90);

    if (avgLandRelief < EARTHLIKE_LAND_RELIEF_OK_MIN) {
      expect(landReliefLevels.every((level) => level !== 'ok')).toBe(true);
    }

    if (avgSeam > EARTHLIKE_SEAM_IMPRINT_OK_MAX) {
      expect(seamLevels.some((level) => level !== 'ok')).toBe(true);
    }
  });
});

function representativeDiagnostics(): ReturnType<typeof computeWorldDiagnostics>[] {
  return REPRESENTATIVE_SEEDS.map((seed) => {
    const params = createDefaultGeneratorParams();
    params.width = 96;
    params.height = 48;
    params.seed = seed;
    const world = generateWorldFromParams(params);
    return computeWorldDiagnostics(world);
  });
}

function metricLevel(diagnostics: ReturnType<typeof computeWorldDiagnostics>, id: string): string {
  const metric = diagnostics.metrics.find((item) => item.id === id);
  expect(metric, `Expected diagnostic metric ${id}`).toBeDefined();
  return metric?.level ?? 'problem';
}

function average(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
}
