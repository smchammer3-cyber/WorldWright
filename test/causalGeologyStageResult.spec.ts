import { describe, expect, it } from 'vitest';
import { canProceedFromStage, createCausalStageResult, validateCausalStageResult } from '../src/core/causalGeology';

describe('W1-01 stage status semantics', () => {
  it('separates complete, partial, blocked, and failed results', () => {
    const complete = createCausalStageResult({ stageId: 'CAUSAL_SHADOW_AUDIT', stageVersion: 1, status: 'COMPLETE', input: { seed: 'a' }, record: { result: 'ok' } });
    const partial = createCausalStageResult({
      stageId: 'CAUSAL_PREMISE_RESOLUTION', stageVersion: 1, status: 'PARTIAL', input: {}, record: {
        schemaVersion: 1,
        premiseVersion: 1,
        status: 'PARTIAL',
        inputSnapshotHash: { algorithm: 'fnv1a64-canonical-json-v1', value: '0000000000000000' },
        planetProfile: 'fixture', surfaceSupportCandidates: ['ROCKY'], surfaceWaterCandidates: ['UNKNOWN'], layerStackCandidates: ['UNKNOWN'],
        assumptions: [], limitations: ['missing-water-constraint'], branchResolutionIds: [], evidenceIds: [], contradictionIds: [],
        confidenceAssessmentSubject: 'premise.fixture', contentHash: { algorithm: 'fnv1a64-canonical-json-v1', value: '0000000000000000' },
      }, limitations: ['missing-water-constraint'], missingDomains: ['surface-water'], downstreamCompatibleStageIds: ['CAUSAL_INTERIOR_RESOLUTION'],
    });
    const blocked = createCausalStageResult({ stageId: 'CAUSAL_INTERIOR_RESOLUTION', stageVersion: 1, status: 'BLOCKED', input: {}, blockingReasons: ['premise-blocked'] });
    const failed = createCausalStageResult({ stageId: 'CAUSAL_INTERIOR_RESOLUTION', stageVersion: 1, status: 'FAILED', input: {}, validationIssues: ['invalid-contract'] });
    expect(() => validateCausalStageResult(complete)).not.toThrow();
    expect(canProceedFromStage(complete, 'CAUSAL_PREMISE_RESOLUTION')).toBe(true);
    expect(canProceedFromStage(partial, 'CAUSAL_INTERIOR_RESOLUTION')).toBe(true);
    expect(canProceedFromStage(partial, 'CAUSAL_REGIME_HISTORY')).toBe(false);
    expect(canProceedFromStage(blocked, 'CAUSAL_REGIME_HISTORY')).toBe(false);
    expect(failed.status).toBe('FAILED');
  });

  it('prevents blocked records, underspecified partial states, and output-hash tampering', () => {
    expect(() => createCausalStageResult({ stageId: 'CAUSAL_INTERIOR_RESOLUTION', stageVersion: 1, status: 'BLOCKED', input: {}, record: { fake: true }, blockingReasons: ['blocked'] })).toThrow(/cannot contain/);
    expect(() => createCausalStageResult({ stageId: 'CAUSAL_SHADOW_AUDIT', stageVersion: 1, status: 'PARTIAL', input: {}, record: { limited: true }, limitations: ['limited'] })).toThrow(/missing domains/);
    const result = createCausalStageResult({ stageId: 'CAUSAL_SHADOW_AUDIT', stageVersion: 1, status: 'COMPLETE', input: {}, record: { valid: true } });
    expect(() => validateCausalStageResult({ ...result, record: { valid: false } })).toThrow(/output hash/);
  });
});
