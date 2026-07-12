import { describe, expect, it } from 'vitest';
import {
  createDefaultGeneratorParams,
  generateLegacyV3WorldFromParams,
  generateWorldFromParams,
} from '../src/core/worldGenerator';
import { CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION } from '../src/core/worldSchema/version';

describe('C01 generated-world output equivalence', () => {
  it('changes only document schema/scaffold metadata for the CI baseline world', () => {
    const params = {
      ...createDefaultGeneratorParams(),
      width: 384,
      height: 192,
      seed: 1040037,
    };

    const legacy = generateLegacyV3WorldFromParams(params);
    const current = generateWorldFromParams(params);

    expect(current.metadata.schemaVersion).toBe(CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION);
    expect(current.causal).toEqual({
      schemaVersion: 1,
      authorityMode: 'LEGACY',
      status: 'EMPTY',
    });

    const normalizedCurrent = structuredClone(current) as typeof current & {
      causal?: unknown;
    };
    delete normalizedCurrent.causal;
    normalizedCurrent.metadata.schemaVersion = legacy.metadata.schemaVersion;
    normalizedCurrent.metadata.createdAt = legacy.metadata.createdAt;
    normalizedCurrent.metadata.updatedAt = legacy.metadata.updatedAt;

    expect(normalizedCurrent).toEqual(legacy);
  }, 30_000);
});
