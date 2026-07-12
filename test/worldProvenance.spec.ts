import { describe, expect, it } from 'vitest';
import { createC02ProvenanceManifest } from '../src/core/worldProvenance/createManifest';
import { isCausalProvenanceManifestV1 } from '../src/core/worldProvenance/schema';
import { recordStageProvenance } from '../src/core/worldProvenance/stageRecorder';

describe('C02 provenance', () => {
  it('creates complete observed legacy provenance without misattributing terrain to Philox', () => {
    const manifest = createC02ProvenanceManifest({
      seed: '1040037',
      worldSchemaVersion: 4,
      generatorVersion: 'v1.5.1',
      pipelineVersion: 'legacy-v1',
      observedLegacyGeneration: true,
    });
    expect(isCausalProvenanceManifestV1(manifest)).toBe(true);
    expect(manifest.completeness).toBe('COMPLETE');
    expect(manifest.authorityMode).toBe('LEGACY');
    expect(manifest.legacyCompatibility).toMatchObject({
      physicalGenerator: 'LEGACY',
      explicitSeedOutputPreserved: true,
      stageHistoryObserved: true,
    });
    expect(manifest.limitations.join(' ')).toMatch(/legacy generator/);
    expect(manifest.stages).toEqual([]);
  });

  it('creates honest partial provenance for pre-C02 worlds', () => {
    const manifest = createC02ProvenanceManifest({
      seed: 'legacy-seed',
      worldSchemaVersion: 4,
      generatorVersion: 'unknown',
      pipelineVersion: 'legacy-v1',
      completeness: 'PARTIAL',
    });
    expect(manifest.completeness).toBe('PARTIAL');
    expect(manifest.legacyCompatibility?.stageHistoryObserved).toBe(false);
    expect(manifest.stages).toHaveLength(0);
  });

  it('records stage hashes with declared streams and flags', () => {
    const stage = recordStageProvenance({
      stageId: 'TEST_STAGE',
      stageVersion: 1,
      streamsUsed: ['sim.event-generation'],
      flagsUsed: ['simulation.deterministic-rng.enabled'],
      input: { b: 2, a: 1 },
      output: { result: [1, 2, 3] },
    });
    expect(stage.status).toBe('RECORDED');
    expect(stage.inputHash?.algorithm).toBe('fnv1a64-canonical-json-v1');
    expect(stage.streamsUsed[0]).toMatchObject({ name: 'sim.event-generation', version: 1 });
  });
});
