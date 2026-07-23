import { describe, expect, it } from 'vitest';
import {
  D1_DETACHED_PROCESS_FIELD_DEFINITIONS_V1,
  createCausalProcessFieldProjectionSet,
  createSphericalAnchor,
  hashCausalPayload,
  validateCausalProcessFieldProjectionSet,
  type CausalProcessFieldProjectionKernelV1,
} from '../src/core/causalGeology';
import {
  CAUSAL_SHADOW_DIAGNOSTIC_PROCESS_ORDER,
  getAuthorityProcess,
  validateAuthorityProcessRegistry,
} from '../src/core/worldAuthority';

const regimeHistoryHash = hashCausalPayload('WorldWright/test/d1-history/v1', { history: 'controlled' });
const geologicSpineHash = hashCausalPayload('WorldWright/test/d1-spine/v1', { spine: 'controlled' });

const kernels: readonly CausalProcessFieldProjectionKernelV1[] = [
  {
    schemaVersion: 1,
    kernelId: 'a-continental-kernel-01',
    fieldId: 'continentalKernelInfluence',
    sourceNodeId: 'continental-kernel-01',
    sourceNodeFamily: 'CONTINENTAL_KERNEL',
    anchor: createSphericalAnchor(18, 179.5),
    angularRadiusDegrees: 36,
    peakValue: 0.9,
    temporalWeight: 0.75,
    preservationWeight: 0.8,
    falloff: 'COSINE_COMPACT_SUPPORT_V1',
    evidenceIds: ['evidence.d1.continental-kernel'],
  },
  {
    schemaVersion: 1,
    kernelId: 'b-projection-confidence-01',
    fieldId: 'projectionConfidence',
    sourceNodeId: 'continental-kernel-01',
    sourceNodeFamily: 'CONTINENTAL_KERNEL',
    anchor: createSphericalAnchor(18, -180.5),
    angularRadiusDegrees: 36,
    peakValue: 0.8,
    temporalWeight: 0.75,
    preservationWeight: 0.8,
    falloff: 'COSINE_COMPACT_SUPPORT_V1',
    evidenceIds: ['evidence.d1.projection-confidence'],
  },
];

describe('D1 detached process-field projection contracts', () => {
  it('creates an immutable, deterministic, continuously queryable diagnostic artifact contract', () => {
    const projection = createCausalProcessFieldProjectionSet({
      sourceRegimeHistoryHash: regimeHistoryHash,
      sourceGeologicSpineHash: geologicSpineHash,
      kernels,
      evidenceIds: ['evidence.d1.contract-review'],
      limitations: [
        'D1 defines detached queryable projection contracts only; field algorithms and physical authority are not implemented.',
      ],
    });
    const replay = createCausalProcessFieldProjectionSet({
      sourceRegimeHistoryHash: regimeHistoryHash,
      sourceGeologicSpineHash: geologicSpineHash,
      kernels,
      evidenceIds: ['evidence.d1.contract-review'],
      limitations: [
        'D1 defines detached queryable projection contracts only; field algorithms and physical authority are not implemented.',
      ],
    });

    validateCausalProcessFieldProjectionSet(projection);
    expect(projection).toEqual(replay);
    expect(projection.contentHash).toEqual(replay.contentHash);
    expect(projection.authorityMode).toBe('CAUSAL_SHADOW');
    expect(projection.physicalGeneratorAuthority).toBe('LEGACY');
    expect(projection.projectionMode).toBe('DETACHED_DIAGNOSTIC');
    expect(projection.scientificStatus).toBe('PARTIAL');
    expect(projection.randomStreamPolicy).toBe('NONE_DETERMINISTIC_FROM_SOURCE_RECORDS');
    expect(projection.definitions).toEqual(D1_DETACHED_PROCESS_FIELD_DEFINITIONS_V1);
    expect(projection.definitions.every((definition) =>
      !definition.physicalAuthority
      && !definition.terrainAuthority
      && !definition.landWaterAuthority)).toBe(true);
    expect(Object.isFrozen(projection)).toBe(true);
    expect(Object.isFrozen(projection.kernels)).toBe(true);
    expect(JSON.stringify(projection)).not.toContain('baseHeight');
    expect(JSON.stringify(projection)).not.toContain('WorldBrain');
    expect(JSON.stringify(projection)).not.toContain('rendererColor');
  });

  it('changes the projection hash when an authoritative causal source hash changes', () => {
    const first = createCausalProcessFieldProjectionSet({
      sourceRegimeHistoryHash: regimeHistoryHash,
      sourceGeologicSpineHash: geologicSpineHash,
      kernels,
      limitations: ['D1 source-link sensitivity contract.'],
    });
    const second = createCausalProcessFieldProjectionSet({
      sourceRegimeHistoryHash: regimeHistoryHash,
      sourceGeologicSpineHash: hashCausalPayload('WorldWright/test/d1-spine/v1', { spine: 'changed' }),
      kernels,
      limitations: ['D1 source-link sensitivity contract.'],
    });
    expect(first.contentHash.value).not.toBe(second.contentHash.value);
  });

  it('rejects noncanonical kernels, unsupported family-field pairings, and forged hashes', () => {
    expect(() => createCausalProcessFieldProjectionSet({
      sourceRegimeHistoryHash: regimeHistoryHash,
      sourceGeologicSpineHash: geologicSpineHash,
      kernels: [...kernels].reverse(),
      limitations: ['D1 rejection fixture.'],
    })).toThrow(/canonically ordered/i);

    const invalidFamily = JSON.parse(JSON.stringify(kernels)) as CausalProcessFieldProjectionKernelV1[];
    invalidFamily[0] = { ...invalidFamily[0], sourceNodeFamily: 'OCEAN_BASIN' };
    expect(() => createCausalProcessFieldProjectionSet({
      sourceRegimeHistoryHash: regimeHistoryHash,
      sourceGeologicSpineHash: geologicSpineHash,
      kernels: invalidFamily,
      limitations: ['D1 rejection fixture.'],
    })).toThrow(/unsupported source family/i);

    const valid = createCausalProcessFieldProjectionSet({
      sourceRegimeHistoryHash: regimeHistoryHash,
      sourceGeologicSpineHash: geologicSpineHash,
      kernels,
      limitations: ['D1 hash rejection fixture.'],
    });
    const forged = JSON.parse(JSON.stringify(valid)) as typeof valid;
    (forged as { contentHash: { algorithm: string; value: string } }).contentHash.value = '0000000000000000';
    expect(() => validateCausalProcessFieldProjectionSet(forged)).toThrow(/content hash does not match/i);
  });

  it('keeps the Phase D process shadow-only while preserving the exact downstream diagnostic chain', () => {
    expect(validateAuthorityProcessRegistry()).toEqual([]);
    expect(CAUSAL_SHADOW_DIAGNOSTIC_PROCESS_ORDER).toEqual([
      'CAUSAL_PROCESS_FIELD_PROJECTION',
      'CAUSAL_CONTINENT_OCEAN_STRUCTURE_INTERPRETATION',
      'CAUSAL_STRUCTURE_MATERIAL_INTERPRETATION',
      'CAUSAL_SHADOW_AUDIT',
    ]);
    const process = getAuthorityProcess('CAUSAL_PROCESS_FIELD_PROJECTION');
    expect(process.modes).toEqual(['CAUSAL_SHADOW']);
    expect(process.reads).toEqual(['causalRecord']);
    expect(process.writes).toEqual(['diagnostics']);
    expect(process.writes).not.toContain('processFieldAuthority');
    expect(process.writes).not.toContain('terrain');
    expect(process.prerequisites).toEqual(['CAUSAL_GEOLOGIC_SPINE']);

    const material = getAuthorityProcess('CAUSAL_STRUCTURE_MATERIAL_INTERPRETATION');
    expect(material.modes).toEqual(['CAUSAL_SHADOW']);
    expect(material.prerequisites).toEqual(['CAUSAL_CONTINENT_OCEAN_STRUCTURE_INTERPRETATION']);
    expect(material.writes).toEqual(['diagnostics']);
    expect(material.writes).not.toContain('structureMaterialCause');
    expect(material.writes).not.toContain('terrain');
  });
});
