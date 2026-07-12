import { describe, expect, it } from 'vitest';
import { canProceedFromStage, createCausalStageResult, validateCausalStageResult } from '../src/core/causalGeology';

describe('W1-01 stage status semantics', () => {
  it('separates complete, partial, blocked, and failed results', () => {
    const complete = createCausalStageResult({ stageId: 'CAUSAL_PREMISE_RESOLUTION', stageVersion: 1, status: 'COMPLETE', input: { seed: 'a' }, record: { result: 'ok' } });
    const partial = createCausalStageResult({ stageId: 'CAUSAL_PREMISE_RESOLUTION', stageVersion: 1, status: 'PARTIAL', input: {}, record: { result: 'limited' }, limitations: ['missing-water-constraint'] });
    const blocked = createCausalStageResult({ stageId: 'CAUSAL_INTERIOR_RESOLUTION', stageVersion: 1, status: 'BLOCKED', input: {}, blockingReasons: ['premise-blocked'] });
    const failed = createCausalStageResult({ stageId: 'CAUSAL_INTERIOR_RESOLUTION', stageVersion: 1, status: 'FAILED', input: {}, validationIssues: ['invalid-contract'] });
    for (const result of [complete, partial, blocked, failed]) expect(() => validateCausalStageResult(result)).not.toThrow();
    expect(canProceedFromStage(complete)).toBe(true);
    expect(canProceedFromStage(partial)).toBe(false);
    expect(canProceedFromStage(partial, ['missing-water-constraint'])).toBe(true);
    expect(canProceedFromStage(blocked)).toBe(false);
  });

  it('prevents blocked or failed stages from carrying authoritative records', () => {
    expect(() => createCausalStageResult({ stageId: 'CAUSAL_INTERIOR_RESOLUTION', stageVersion: 1, status: 'BLOCKED', input: {}, record: { fake: true }, blockingReasons: ['blocked'] })).toThrow(/cannot contain/);
    expect(() => createCausalStageResult({ stageId: 'CAUSAL_INTERIOR_RESOLUTION', stageVersion: 1, status: 'PARTIAL', input: {}, record: { limited: true } })).toThrow(/requires limitations/);
  });
});
