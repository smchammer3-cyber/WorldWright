import { describe, expect, it } from 'vitest';
import { computeGeologicAuthorityDiagnosticSummary } from '../src/core/worldGeologicAuthorityDiagnostics';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';

describe('geologic authority diagnostics', () => {
  it('emits machine-readable gates, thresholds, stage table, and first failing layer', () => {
    const params = { ...createDefaultGeneratorParams(), seed: 'geologic-authority-smoke', width: 64, height: 32 };
    const summary = computeGeologicAuthorityDiagnosticSummary(generateWorldFromParams(params));

    expect(summary).toBeTruthy();
    expect(summary?.seed).toBe(params.seed);
    expect(summary?.grid).toBe('64×32');
    expect(summary?.stageMetrics.length).toBeGreaterThan(4);
    expect(summary?.gates.map((gate) => gate.id)).toEqual([
      'submergedContinentGhostShare',
      'oceanContinentAuthorityOverlapShare',
      'landWeakReliefAuthorityShare',
      'roundSubmergedRegionShare',
      'authorityMismatchShare',
      'finalTerrainColorMaskShare',
    ]);
    for (const gate of summary?.gates ?? []) {
      expect(gate.blueprintContract).toMatch(/^WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_/);
      expect(Number.isFinite(gate.value)).toBe(true);
      expect(Number.isFinite(gate.threshold)).toBe(true);
    }
  });

  it('fails a strict gate before sea level or final color can greenwash upstream authority leakage', () => {
    const params = { ...createDefaultGeneratorParams(), seed: 'geologic-authority-strict', width: 64, height: 32 };
    const summary = computeGeologicAuthorityDiagnosticSummary(generateWorldFromParams(params), {
      submergedContinentGhostShare: 0,
      oceanContinentAuthorityOverlapShare: 0,
      landWeakReliefAuthorityShare: 0,
      roundSubmergedRegionShare: 0,
      authorityMismatchShare: 0,
      finalTerrainColorMaskShare: 0,
    });

    expect(summary?.pass).toBe(false);
    expect(summary?.firstFailedAuthorityLayer).toBeTruthy();
    expect(summary?.gates.some((gate) => !gate.passed)).toBe(true);
  });
});
