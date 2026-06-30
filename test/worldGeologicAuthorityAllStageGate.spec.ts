import { describe, expect, it } from 'vitest';
import { computeGeologicAuthorityDiagnosticSummary, type GeologicAuthorityMetricId, type GeologicAuthorityThresholds } from '../src/core/worldGeologicAuthorityDiagnostics';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';

describe('geologic authority all-stage gates', () => {
  it('reports all-stage gates separately from final-stage gates', () => {
    const params = { ...createDefaultGeneratorParams(), seed: 'geologic-authority-all-stage-shape', width: 64, height: 32 };
    const summary = computeGeologicAuthorityDiagnosticSummary(generateWorldFromParams(params));

    expect(summary).toBeTruthy();
    expect(summary?.gates.every((gate) => gate.aggregationScope === 'all-stages')).toBe(true);
    expect(summary?.finalStageGates.every((gate) => gate.aggregationScope === 'final-stage')).toBe(true);
    expect(summary?.finalStageGates.map((gate) => gate.id)).toEqual(summary?.gates.map((gate) => gate.id));
  });

  it('keeps overall pass false when an earlier stage fails but the final-stage value passes', () => {
    const params = { ...createDefaultGeneratorParams(), seed: 'geologic-authority-all-stage-fail', width: 64, height: 32 };
    const baseline = computeGeologicAuthorityDiagnosticSummary(generateWorldFromParams(params));
    expect(baseline).toBeTruthy();

    const candidate = (baseline?.gates ?? [])
      .map((gate) => {
        const finalGate = baseline?.finalStageGates.find((entry) => entry.id === gate.id);
        return { gate, finalGate, gap: gate.value - (finalGate?.value ?? gate.value) };
      })
      .find((entry) => entry.finalGate && entry.gap > 0.000001);

    expect(candidate).toBeTruthy();
    const metricId = candidate!.gate.id as GeologicAuthorityMetricId;
    const threshold = (candidate!.gate.value + candidate!.finalGate!.value) / 2;
    const thresholds: GeologicAuthorityThresholds = {
      submergedContinentGhostShare: Number.POSITIVE_INFINITY,
      oceanContinentAuthorityOverlapShare: Number.POSITIVE_INFINITY,
      landWeakReliefAuthorityShare: Number.POSITIVE_INFINITY,
      roundSubmergedRegionShare: Number.POSITIVE_INFINITY,
      authorityMismatchShare: Number.POSITIVE_INFINITY,
      finalTerrainColorMaskShare: Number.POSITIVE_INFINITY,
      [metricId]: threshold,
    };

    const summary = computeGeologicAuthorityDiagnosticSummary(generateWorldFromParams(params), thresholds);
    const allStageGate = summary?.gates.find((gate) => gate.id === metricId);
    const finalStageGate = summary?.finalStageGates.find((gate) => gate.id === metricId);

    expect(allStageGate?.passed).toBe(false);
    expect(finalStageGate?.passed).toBe(true);
    expect(summary?.pass).toBe(false);
    expect(summary?.firstFailedAuthorityLayer).toBeTruthy();
  });
});
