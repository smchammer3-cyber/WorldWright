import { describe, expect, it } from 'vitest';
import { generateWorldFromParams, createDefaultGeneratorParams } from '../src/core/worldGenerator';
import { migrateWorldDocument } from '../src/core/worldMigrations/migrateWorldDocument';
import { CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION } from '../src/core/worldSchema/version';

function createV3World() {
  return generateWorldFromParams({
    ...createDefaultGeneratorParams(),
    width: 32,
    height: 16,
    seed: 1040037,
  });
}

describe('world document migration', () => {
  it('migrates schema v3 to v4 without mutating physical world state', () => {
    const raw = createV3World();
    const rawBefore = structuredClone(raw);

    const result = migrateWorldDocument(raw);

    expect(result.status).toBe('MIGRATED_IN_MEMORY');
    if (result.status !== 'MIGRATED_IN_MEMORY') return;

    expect(raw).toEqual(rawBefore);
    expect(result.report.stepsApplied).toEqual(['world-v3-to-v4-causal-scaffold']);
    expect(result.report.changed).toBe(true);
    expect(result.world.metadata.schemaVersion).toBe(CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION);
    expect((result.world as typeof result.world & { causal: unknown }).causal).toEqual({
      schemaVersion: 1,
      authorityMode: 'LEGACY',
      status: 'EMPTY',
    });

    expect(result.world.gridWidth).toBe(raw.gridWidth);
    expect(result.world.gridHeight).toBe(raw.gridHeight);
    expect(result.world.seaLevel).toBe(raw.seaLevel);
    expect(result.world.plates).toEqual(raw.plates);
    expect(result.world.rivers).toEqual(raw.rivers);
    expect(result.world.countries).toEqual(raw.countries);
    expect(result.world.cultures).toEqual(raw.cultures);
    expect(result.world.cultureRegions).toEqual(raw.cultureRegions);
    expect(result.world.cities).toEqual(raw.cities);

    expect(result.world.cells).toHaveLength(raw.cells.length);
    for (let index = 0; index < raw.cells.length; index++) {
      const before = raw.cells[index];
      const after = result.world.cells[index];
      expect(after.index).toBe(before.index);
      expect(after.baseHeight).toBe(before.baseHeight);
      expect(after.editHeightDelta).toBe(before.editHeightDelta);
      expect(after.simHeightDelta).toBe(before.simHeightDelta);
      expect(after.isWater).toBe(before.isWater);
      expect(after.plateId).toBe(before.plateId);
      expect(after.continentId).toBe(before.continentId);
      expect(after.crustType).toBe(before.crustType);
    }
  });

  it('is idempotent after a successful migration', () => {
    const first = migrateWorldDocument(createV3World());
    expect(first.status).toBe('MIGRATED_IN_MEMORY');
    if (first.status !== 'MIGRATED_IN_MEMORY') return;

    const second = migrateWorldDocument(first.world);
    expect(second.status).toBe('CURRENT');
    if (second.status !== 'CURRENT') return;
    expect(second.report.changed).toBe(false);
    expect(second.report.stepsApplied).toEqual([]);
    expect(second.world).toEqual(first.world);
  });

  it('classifies an unversioned current-shape document as v3 with an explicit assumption', () => {
    const raw = createV3World() as unknown as Record<string, unknown>;
    const metadata = { ...(raw.metadata as Record<string, unknown>) };
    delete metadata.schemaVersion;
    raw.metadata = metadata;

    const result = migrateWorldDocument(raw);
    expect(result.status).toBe('MIGRATED_IN_MEMORY');
    expect(result.report.assumptions.some((entry) => entry.code === 'CLASSIFIED_UNVERSIONED_V3_WORLD')).toBe(true);
  });

  it('reclassifies a transitional current-shaped string 1.0 document as v3', () => {
    const raw = createV3World() as unknown as Record<string, unknown>;
    raw.metadata = { ...(raw.metadata as Record<string, unknown>), schemaVersion: '1.0' };

    const result = migrateWorldDocument(raw);
    expect(result.status).toBe('MIGRATED_IN_MEMORY');
    if (result.status !== 'MIGRATED_IN_MEMORY') return;
    expect(result.report.decodedSourceVersion).toBe(3);
    expect(
      result.report.assumptions.some((entry) => entry.code === 'RECLASSIFIED_STRING_1_0_AS_V3_COMPAT')
    ).toBe(true);
    expect(result.world.metadata.schemaVersion).toBe(CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION);
  });

  it('protects unsupported newer documents from downgrade', () => {
    const raw = createV3World() as unknown as Record<string, unknown>;
    raw.metadata = { ...(raw.metadata as Record<string, unknown>), schemaVersion: 999 };

    const result = migrateWorldDocument(raw);
    expect(result.status).toBe('UNSUPPORTED_NEWER');
    if (result.status !== 'UNSUPPORTED_NEWER') return;
    expect(result.raw).toBe(raw);
    expect(result.report.decodedSourceVersion).toBe(999);
  });

  it('quarantines a corrupted grid instead of fabricating cells', () => {
    const raw = createV3World() as unknown as Record<string, unknown>;
    raw.cells = (raw.cells as unknown[]).slice(0, -1);

    const result = migrateWorldDocument(raw);
    expect(result.status).toBe('QUARANTINED');
    if (result.status !== 'QUARANTINED') return;
    expect(result.reason).toContain('does not match expected grid size');
    expect((result.raw as Record<string, unknown>).cells).toHaveLength(32 * 16 - 1);
  });

  it('recognizes schema v1 but quarantines it until a proven path exists', () => {
    const legacyV1 = {
      id: 'legacy-v1',
      name: 'Legacy',
      seed: '1',
      schemaVersion: 1,
      width: 2,
      height: 1,
      seaLevel: 0,
      cells: [
        { x: 0, y: 0, baseHeight: 0, temperature: 0.5, moisture: 0.5, biomeId: 1 },
        { x: 1, y: 0, baseHeight: 0, temperature: 0.5, moisture: 0.5, biomeId: 1 },
      ],
      editLayer: { elevationDelta: [0, 0], biomeOverride: [null, null] },
      simLayer: { elevationDelta: [0, 0], biomeDelta: [0, 0] },
    };

    const result = migrateWorldDocument({
      metadata: { id: legacyV1.id, seed: legacyV1.seed, schemaVersion: 1 },
      ...legacyV1,
    });
    expect(result.status).toBe('QUARANTINED');
    if (result.status !== 'QUARANTINED') return;
    expect(result.reason).toContain('No validated migration path exists');
  });

  it('quarantines values that cannot be structured-cloned', () => {
    const raw = createV3World() as unknown as Record<string, unknown>;
    raw.unsupportedFunction = () => 'not cloneable';

    const result = migrateWorldDocument(raw);
    expect(result.status).toBe('QUARANTINED');
    if (result.status !== 'QUARANTINED') return;
    expect(result.reason).toContain('structured clone');
  });
});
