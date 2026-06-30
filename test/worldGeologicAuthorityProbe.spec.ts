import { describe, expect, it } from 'vitest';
import { computeGeologicAuthorityDiagnosticSummary } from '../src/core/worldGeologicAuthorityDiagnostics';
import { computeGeneratedStageDiagnostics } from '../src/core/worldGenerateStageDiagnostics';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';

describe('temporary raw geologic authority probe', () => {
  it('prints seed 67 raw authority metrics', () => {
    const world = generateWorldFromParams({ ...createDefaultGeneratorParams(), seed: '67', width: 128, height: 64 });
    const summary = computeGeologicAuthorityDiagnosticSummary(world);
    const diagnostics = computeGeneratedStageDiagnostics(world);
    const rawStage = diagnostics?.stages.find((stage) => stage.id === 'RAW_GENERATOR');
    const firstFailedStage = summary?.firstFailedAuthorityLayer
      ? diagnostics?.stages.find((stage) => stage.id === summary.firstFailedAuthorityLayer)
      : null;
    console.log('[raw-authority-probe]', JSON.stringify({
      pass: summary?.pass,
      firstFailedAuthorityLayer: summary?.firstFailedAuthorityLayer,
      firstFailedExplanation: summary?.firstFailedExplanation,
      thresholds: summary?.thresholds,
      rawStageMetrics: summary?.stageMetrics.find((stage) => stage.stageId === 'RAW_GENERATOR'),
      rawUnderlying: rawStage?.raw,
      firstFailedStageMetrics: summary?.firstFailedAuthorityLayer
        ? summary?.stageMetrics.find((stage) => stage.stageId === summary.firstFailedAuthorityLayer)
        : null,
      firstFailedUnderlying: firstFailedStage?.raw,
      firstFailedDeltaFromPrevious: firstFailedStage?.deltaFromPrevious,
      firstFailedTransitionFromPrevious: firstFailedStage?.transitionFromPrevious,
      failedGates: summary?.gates.filter((gate) => !gate.passed).map((gate) => ({
        id: gate.id,
        stageId: gate.stageId,
        value: Number(gate.value.toFixed(6)),
        threshold: gate.threshold,
        explanation: gate.explanation,
      })),
    }, null, 2));
    expect(summary).toBeTruthy();
  }, 20_000);
});
