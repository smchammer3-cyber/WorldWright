import { describe, expect, it } from 'vitest';
import {
  createDefaultGeneratorParams,
  generateLegacyV3WorldFromParams,
  generateWorldFromParams,
} from '../src/core/worldGenerator';
import { CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION } from '../src/core/worldSchema/version';
import { isCausalProvenanceManifestV1 } from '../src/core/worldProvenance/schema';

const CANONICAL_CAUSAL_REGRESSION_SEEDS = [
  2_040_037,
  1_040_037,
  9_011,
  3_301,
  4_404,
  7_205,
  8_808,
] as const;

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

    expectPhysicalEquivalence(current, legacy);
  }, 30_000);

  it('preserves complete legacy physical output across the seven canonical causal regression seeds', () => {
    for (const seed of CANONICAL_CAUSAL_REGRESSION_SEEDS) {
      const params = {
        ...createDefaultGeneratorParams(),
        width: 96,
        height: 48,
        seed,
      };
      const legacy = generateLegacyV3WorldFromParams(params);
      const current = generateWorldFromParams(params);

      expect(current.causal).toMatchObject({
        authorityMode: 'LEGACY',
        status: 'EMPTY',
      });
      expectPhysicalEquivalence(current, legacy);
    }
  }, 60_000);
});

function expectPhysicalEquivalence(
  current: ReturnType<typeof generateWorldFromParams>,
  legacy: ReturnType<typeof generateLegacyV3WorldFromParams>,
): void {
  const normalizedCurrent = physicalProjection(current);
  normalizedCurrent.metadata.schemaVersion = legacy.metadata.schemaVersion;
  normalizedCurrent.metadata.createdAt = legacy.metadata.createdAt;
  normalizedCurrent.metadata.updatedAt = legacy.metadata.updatedAt;
  expect(normalizedCurrent).toEqual(legacy);
}
