import { describe, expect, it } from 'vitest';
import {
  createDefaultGeneratorParams,
  generateLegacyV3WorldFromParams,
} from '../src/core/worldGenerator';
import { WorldSession, type WorldSessionStorage } from '../src/core/worldSession';
import { CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION } from '../src/core/worldSchema/version';
import type { WorldBrain } from '../src/core/worldSchema';

function createV3World(seed = 'session-migration-v3'): WorldBrain {
  return generateLegacyV3WorldFromParams({
    ...createDefaultGeneratorParams(),
    width: 32,
    height: 16,
    seed,
  });
}

function createMemoryStorage(raw: unknown): {
  storage: WorldSessionStorage;
  getSaved: () => WorldBrain | null;
} {
  let saved: WorldBrain | null = null;

  return {
    storage: {
      getWorldById: async () => structuredClone(raw),
      saveWorld: async (world) => {
        saved = structuredClone(world);
        return structuredClone(world);
      },
    },
    getSaved: () => saved,
  };
}

describe('WorldSession migration boundary', () => {
  it('loads v3 in memory, reports migration pending, and clears it after verified save', async () => {
    const raw = createV3World();
    const { storage, getSaved } = createMemoryStorage(raw);
    const session = new WorldSession(storage);

    await session.loadWorld(raw.metadata.id);

    expect(session.isMigrationPending()).toBe(true);
    expect(session.getWorldLoadReport()).toMatchObject({
      decodedSourceVersion: 3,
      targetSchemaVersion: CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION,
      changed: true,
      stepsApplied: ['world-v3-to-v4-causal-scaffold'],
    });
    expect(session.getWorld()?.metadata.schemaVersion).toBe(CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION);
    expect(session.getWorld()?.causal).toEqual({
      schemaVersion: 1,
      authorityMode: 'LEGACY',
      status: 'EMPTY',
    });

    await session.save();

    expect(session.isMigrationPending()).toBe(false);
    expect(getSaved()?.metadata.schemaVersion).toBe(CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION);
    expect(getSaved()?.causal?.authorityMode).toBe('LEGACY');
  });

  it('keeps migration pending and the in-memory world intact when save fails', async () => {
    const raw = createV3World('session-migration-save-failure');
    const session = new WorldSession({
      getWorldById: async () => structuredClone(raw),
      saveWorld: async () => {
        throw new Error('simulated save failure');
      },
    });

    await session.loadWorld(raw.metadata.id);
    const beforeSave = structuredClone(session.getWorld());

    await expect(session.save()).rejects.toThrow('simulated save failure');
    expect(session.isMigrationPending()).toBe(true);
    expect(session.getWorld()).toEqual(beforeSave);
  });

  it('refuses unsupported newer documents without creating an editable session world', async () => {
    const raw = createV3World('session-future-version') as unknown as Record<string, unknown>;
    raw.metadata = {
      ...(raw.metadata as Record<string, unknown>),
      schemaVersion: CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION + 1,
    };
    const session = new WorldSession({
      getWorldById: async () => structuredClone(raw),
      saveWorld: async (world) => structuredClone(world),
    });

    await expect(session.loadWorld('future')).rejects.toThrow(/UNSUPPORTED_NEWER/);
    expect(session.getWorld()).toBeNull();
    expect(session.isMigrationPending()).toBe(false);
  });

  it('quarantines corrupted grids instead of padding or fabricating cells', async () => {
    const raw = createV3World('session-corrupted-grid') as unknown as Record<string, unknown>;
    raw.cells = (raw.cells as unknown[]).slice(0, -1);
    const session = new WorldSession({
      getWorldById: async () => structuredClone(raw),
      saveWorld: async (world) => structuredClone(world),
    });

    await expect(session.loadWorld('corrupt')).rejects.toThrow(/QUARANTINED/);
    expect(session.getWorld()).toBeNull();
  });

  it('preserves the schema and causal scaffold through undo and redo', async () => {
    const raw = createV3World('session-migration-history');
    const { storage } = createMemoryStorage(raw);
    const session = new WorldSession(storage);

    await session.loadWorld(raw.metadata.id);
    const loaded = session.getWorld();
    expect(loaded).not.toBeNull();

    session.apply({
      type: 'TERRAIN_STROKE',
      tool: 'RAISE',
      center: { row: 8, col: 16 },
      radius: 1,
      strength: 0.1,
    });
    session.undo();
    expect(session.getWorld()?.metadata.schemaVersion).toBe(CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION);
    expect(session.getWorld()?.causal?.authorityMode).toBe('LEGACY');

    session.redo();
    expect(session.getWorld()?.metadata.schemaVersion).toBe(CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION);
    expect(session.getWorld()?.causal?.authorityMode).toBe('LEGACY');
  });
});
