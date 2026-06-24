import { describe, expect, it } from 'vitest';
import { computeWorldDiagnostics } from '../src/core/worldDiagnostics';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';

function makeWorld() {
  const params = createDefaultGeneratorParams();
  params.width = 96;
  params.height = 48;
  params.seed = 'diagnostics-smoke';
  return generateWorldFromParams(params);
}

describe('world diagnostics', () => {
  it('computes stable metrics for generated worlds', () => {
    const diagnostics = computeWorldDiagnostics(makeWorld());

    expect(diagnostics.metrics.length).toBeGreaterThan(8);
    expect(diagnostics.summary.problemCount + diagnostics.summary.watchCount + diagnostics.summary.okCount).toBe(diagnostics.metrics.length);
    expect(diagnostics.raw.landFraction).toBeGreaterThanOrEqual(0);
    expect(diagnostics.raw.landFraction).toBeLessThanOrEqual(1);
    expect(diagnostics.raw.coastlineEdgeDensity).toBeGreaterThanOrEqual(0);
    expect(diagnostics.raw.coastlineEdgeDensity).toBeLessThanOrEqual(1);
    expect(diagnostics.raw.heightStdDev).toBeGreaterThanOrEqual(0);
    expect(diagnostics.raw.exportHeight.heightRange).toBeGreaterThanOrEqual(0);
    expect(diagnostics.raw.exportHeight.maxNeighborJump).toBeGreaterThanOrEqual(0);
    expect(diagnostics.raw.exportHeight.p95NeighborJump).toBeGreaterThanOrEqual(0);
    expect(diagnostics.raw.exportHeight.exportRiskScore).toBeGreaterThanOrEqual(0);
    expect(diagnostics.raw.exportHeight.exportRiskScore).toBeLessThanOrEqual(100);
    expect(diagnostics.metrics.some((metric) => metric.id === 'exportRisk')).toBe(true);
    expect(diagnostics.metrics.some((metric) => metric.id === 'underwaterPlateImprint')).toBe(true);
    expect(diagnostics.metrics.some((metric) => metric.id === 'wrapSeam')).toBe(true);

    for (const metric of diagnostics.metrics) {
      expect(metric.id).toBeTruthy();
      expect(metric.label).toBeTruthy();
      expect(metric.value).toBeTruthy();
      expect(['ok', 'watch', 'problem']).toContain(metric.level);
      expect(metric.detail).toBeTruthy();
    }
  });
});
