import { describe, expect, it } from 'vitest';
import {
  canProceedFromStage,
  createCausalStageResult,
  hashCausalPayload,
  validateCausalStageResult,
  validatePlanetaryPremise,
  type PlanetaryPremiseV1,
} from '../src/core/causalGeology';

const HASH = { algorithm: 'fnv1a64-canonical-json-v1' as const, value: '0000000000000000' };

function premise(status: 'COMPLETE' | 'PARTIAL'): PlanetaryPremiseV1 {
  const payload = {
    schemaVersion: 1 as const,
    premiseVersion: 1,
    status,
    inputSnapshotHash: HASH,
    bodyClassCandidates: ['ROCKY'],
    surfaceMediumCandidates: ['SOLID_SURFACE'],
    layerStackCandidates: ['ROCKY_LAYER_STACK'],
    ...(status === 'COMPLETE' ? {
      resolvedBodyClass: 'ROCKY',
      resolvedSurfaceMedium: 'SOLID_SURFACE',
      resolvedLayerStack: ['ROCKY_LAYER_STACK'],
    } : {}),
    assumptions: [],
    limitations: status === 'PARTIAL' ? ['missing-layer-resolution'] : [],
    branchResolutionIds: [],
    evidenceIds: [],
    contradictionIds: [],
    confidenceAssessmentSubject: 'premise.fixture',
  };
  return { ...payload, contentHash: hashCausalPayload('WorldWright/planetary-premise/v1', payload) };
}

function rehashPremise(payload: Record<string, unknown>): PlanetaryPremiseV1 {
  const { contentHash: _contentHash, ...record } = payload;
  return {
    ...record,
    contentHash: hashCausalPayload('WorldWright/planetary-premise/v1', record),
  } as unknown as PlanetaryPremiseV1;
}

describe('W1-01 stage status semantics', () => {
  it('separates complete, partial, blocked, and failed results', () => {
    const complete = createCausalStageResult({ stageId: 'CAUSAL_PREMISE_RESOLUTION', stageVersion: 1, status: 'COMPLETE', input: { seed: 'a' }, record: premise('COMPLETE') });
    const partial = createCausalStageResult({
      stageId: 'CAUSAL_PREMISE_RESOLUTION',
      stageVersion: 1,
      status: 'PARTIAL',
      input: {},
      record: premise('PARTIAL'),
      limitations: ['missing-layer-resolution'],
      missingDomains: ['resolved-layer-stack'],
      downstreamCompatibleStageIds: ['CAUSAL_INTERIOR_RESOLUTION'],
    });
    const blocked = createCausalStageResult({ stageId: 'CAUSAL_INTERIOR_RESOLUTION', stageVersion: 1, status: 'BLOCKED', input: {}, blockingReasons: ['premise-blocked'] });
    const failed = createCausalStageResult({ stageId: 'CAUSAL_INTERIOR_RESOLUTION', stageVersion: 1, status: 'FAILED', input: {}, validationIssues: ['invalid-contract'] });
    expect(() => validateCausalStageResult(complete)).not.toThrow();
    expect(canProceedFromStage(complete, 'CAUSAL_INTERIOR_RESOLUTION')).toBe(true);
    expect(canProceedFromStage(partial, 'CAUSAL_INTERIOR_RESOLUTION')).toBe(true);
    expect(canProceedFromStage(partial, 'CAUSAL_REGIME_HISTORY')).toBe(false);
    expect(canProceedFromStage(blocked, 'CAUSAL_REGIME_HISTORY')).toBe(false);
    expect(failed.status).toBe('FAILED');
  });

  it('prevents blocked records, underspecified partial states, and output-hash tampering', () => {
    expect(() => createCausalStageResult({ stageId: 'CAUSAL_INTERIOR_RESOLUTION', stageVersion: 1, status: 'BLOCKED', input: {}, record: { fake: true }, blockingReasons: ['blocked'] })).toThrow(/cannot contain/);
    expect(() => createCausalStageResult({ stageId: 'CAUSAL_PREMISE_RESOLUTION', stageVersion: 1, status: 'PARTIAL', input: {}, record: premise('PARTIAL'), limitations: ['limited'] })).toThrow(/missing domains/);
    const result = createCausalStageResult({ stageId: 'CAUSAL_PREMISE_RESOLUTION', stageVersion: 1, status: 'COMPLETE', input: {}, record: premise('COMPLETE') });
    expect(() => validateCausalStageResult({ ...result, record: premise('PARTIAL') })).toThrow(/output hash/);
  });

  it('rejects later-stage conclusions hidden in premise text or extra fields even with valid hashes', () => {
    const semanticLeak = rehashPremise({ ...premise('COMPLETE'), assumptions: ['mobile tectonics'] });
    expect(() => validatePlanetaryPremise(semanticLeak)).toThrow(/forbidden later-stage conclusion/);

    const ownershipLeak = rehashPremise({ ...premise('COMPLETE'), resurfacingHistory: ['global-overprint'] });
    expect(() => validatePlanetaryPremise(ownershipLeak)).toThrow(/unowned field/);
  });
});
