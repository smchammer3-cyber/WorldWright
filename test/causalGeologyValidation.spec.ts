import { describe, expect, it } from 'vitest';
import {
  createCausalGeologyInput,
  createCausalStageResult,
  createScientificQuantity,
  hashCausalPayload,
  validateCausalShadowRun,
  type CausalShadowRunV1,
} from '../src/core/causalGeology';
import { createConfidenceAssessment } from '../src/core/worldConfidence/confidence';
import type { CausalConfidenceLedgerV1 } from '../src/core/worldConfidence/types';
import type { CausalProvenanceManifestV1 } from '../src/core/worldProvenance/schema';

function fixtureRun(): CausalShadowRunV1 {
  const input = createCausalGeologyInput('fixture-seed', [{
    schemaVersion: 1,
    inputId: 'planet.radius',
    quantity: createScientificQuantity(1, 'earth-radius', 'earth-radius-v1'),
    sourceClass: 'DIRECT_DECLARATION',
    sourceRecordId: 'fixture:planet.radius',
    confidenceSubject: 'input.planet.radius',
    evidenceIds: [],
  }]);
  const stage = createCausalStageResult({ stageId: 'CAUSAL_INPUT_SANITIZATION', stageVersion: 1, status: 'COMPLETE', input: { fixture: 'raw-input' }, record: input });
  const confidenceLedger: CausalConfidenceLedgerV1 = {
    schemaVersion: 1,
    evidence: [],
    assessments: [createConfidenceAssessment('input.planet.radius', [])],
    branchResolutions: [],
    contradictions: [],
  };
  const provenance: CausalProvenanceManifestV1 = {
    schemaVersion: 1,
    completeness: 'PARTIAL',
    rootSeed: input.rootSeed,
    authorityMode: 'CAUSAL_SHADOW',
    randomSystem: { causalAlgorithm: 'philox4x32-10', causalAlgorithmVersion: 1, seedDerivationAlgorithm: 'fnv1a64-domain-separated-v1', seedEncoding: 'utf8-v1' },
    flags: { schemaVersion: 1, authorityMode: 'CAUSAL_SHADOW', values: {}, warnings: [] },
    software: { worldSchemaVersion: 4, causalSchemaVersion: 1, generatorVersion: 'fixture', pipelineVersion: 'fixture' },
    streams: [],
    stages: [{ stageId: stage.stageId, stageVersion: 1, status: 'RECORDED', streamsUsed: [], flagsUsed: [], inputHash: stage.inputHash, outputHash: stage.outputHash, warnings: [] }],
    causalGeology: { schemaVersion: 1, inputContractVersion: 1, stageResultContractVersion: 1, inputHash: input.contentHash, sourceBundleVersion: 'fixture-v1' },
    limitations: [],
  };
  const payload = {
    schemaVersion: 1 as const,
    runContractVersion: 1 as const,
    inputSnapshot: input,
    stageResults: [stage],
    confidenceLedger,
    contradictionIds: [],
    provenance,
  };
  return { ...payload, contentHash: hashCausalPayload('WorldWright/causal-shadow-run/v1', payload) };
}

describe('W1-01 complete shadow-run validation', () => {
  it('validates a self-consistent sanitized-input-only run', () => {
    expect(() => validateCausalShadowRun(fixtureRun())).not.toThrow();
  });

  it('detects nested stage-record corruption before trusting outer hashes', () => {
    const run = structuredClone(fixtureRun());
    run.stageResults[0].record = { ...run.inputSnapshot, limitations: ['tampered'] } as never;
    expect(() => validateCausalShadowRun(run)).toThrow(/Causal input content hash mismatch/);
  });

  it('rejects skipped prerequisites and provenance seed mismatches', () => {
    const skipped = structuredClone(fixtureRun());
    skipped.stageResults.push(createCausalStageResult({ stageId: 'CAUSAL_INTERIOR_RESOLUTION', stageVersion: 1, status: 'BLOCKED', input: {}, blockingReasons: ['missing-premise'] }));
    expect(() => validateCausalShadowRun(skipped)).toThrow(/contiguous prefix/);

    const mismatched = structuredClone(fixtureRun());
    const other = createCausalGeologyInput('other-seed', [mismatched.inputSnapshot.sourceDeclarations[0]]);
    mismatched.provenance.rootSeed = other.rootSeed;
    expect(() => validateCausalShadowRun(mismatched)).toThrow(/root seed/);
  });
});
