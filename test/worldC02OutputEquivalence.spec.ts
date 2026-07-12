import { describe, expect, it } from 'vitest';
import {
  createDefaultGeneratorParams,
  generateLegacyV3WorldFromParams,
  generateWorldFromParams,
} from '../src/core/worldGenerator';
import { CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION } from '../src/core/worldSchema/version';
import { isCausalProvenanceManifestV1 } from '../src/core/worldProvenance/schema';

function physicalProjection<T extends ReturnType<typeof generateWorldFromParams>>(world: T): Omit<T, 'causal'> {
  const clone = structuredClone(world) as T & { causal?: unknown };
  delete clone.causal;
  return clone;
}

describe('C02 explicit-seed legacy output equivalence', () => {
  it('adds only schema and provenance state to the 384x192 CI baseline world', () => {
    const params = {
      ...createDefaultGeneratorParams(),
      width: 384,
      height: 192,
      seed: 1040037,
    };

    const legacy = generateLegacyV3WorldFromParams(params);
    const current = generateWorldFromParams(params);

    expect(current.metadata.schemaVersion).toBe(CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION);
    expect(current.causal).toMatchObject({
      schemaVersion: 1,
      authorityMode: 'LEGACY',
      status: 'EMPTY',
    });
    expect(isCausalProvenanceManifestV1(current.causal?.provenance)).toBe(true);
    expect(current.causal?.provenance).toMatchObject({
      completeness: 'COMPLETE',
      authorityMode: 'LEGACY',
      legacyCompatibility: {
        physicalGenerator: 'LEGACY',
        explicitSeedOutputPreserved: true,
        stageHistoryObserved: true,
      },
    });

    const normalizedCurrent = physicalProjection(current);
    normalizedCurrent.metadata.schemaVersion = legacy.metadata.schemaVersion;
    normalizedCurrent.metadata.createdAt = legacy.metadata.createdAt;
    normalizedCurrent.metadata.updatedAt = legacy.metadata.updatedAt;
    expect(normalizedCurrent).toEqual(legacy);
  }, 30_000);
});
