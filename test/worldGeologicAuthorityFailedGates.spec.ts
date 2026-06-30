import { describe, expect, it } from 'vitest';
import { computeGeologicAuthorityDiagnosticSummary } from '../src/core/worldGeologicAuthorityDiagnostics';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';

const SEEDS = ['67', '32319885', 'worldwright-a', 'worldwright-b', 'worldwright-c', 'worldwright-d', 'worldwright-e'];

describe('geologic authority failed gate diagnostics', () => {
  it('prints failed raw authority gates for the representative seeds', () => {
    const rows = SEEDS.map((seed) => {
      const world = generateWorldFromParams({ ...createDefaultGeneratorParams(), seed, width: 128, height: 64 });
      const summary = computeGeologicAuthorityDiagnosticSummary(world);
      expect(summary).toBeTruthy();
      return {
        seed,
        pass: summary?.pass,
        firstFailedAuthorityLayer: summary?.firstFailedAuthorityLayer,
        failedGates: summary?.gates
          .filter((gate) => !gate.passed)
          .map((gate) => ({
            id: gate.id,
            stageId: gate.stageId,
            value: Number(gate.value.toFixed(6)),
            threshold: gate.threshold,
          })),
        rawStage: summary?.stageMetrics.find((stage) => stage.stageId === 'RAW_GENERATOR'),
      };
    });

    console.log('[geologic-authority-failed-gates]', JSON.stringify(rows, null, 2));
    expect(rows.length).toBe(SEEDS.length);
  }, 30_000);
});
