import { describe, expect, it } from 'vitest';
import { createEmptyLegacyCausalScaffold } from '../causalWorld/schema';
import { createEmptyCell, type WorldBrain } from '../worldSchema';
import { CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION } from '../worldSchema/version';
import {
  computeWorldContentHash,
  saveWorldWithEngine,
  summarizeWorld,
  summarizeWorldWithBranchLookup,
  type SimBranchRecord,
  type WorldStorageEngine,
  type WorldSummary,
} from './index';

function makeWorld(id = 'world-1'): WorldBrain {
  return {
    gridWidth: 1,
    gridHeight: 1,
    seaLevel: 0.5,
    cells: [createEmptyCell(0)],
    plates: [],
    rivers: [],
    countries: [],
    cultures: [],
    cultureRegions: [],
    cities: [],
    causal: createEmptyLegacyCausalScaffold(),
    metadata: {
      id,
      name: 'Test World',
      seed: 'seed-1',
      schemaVersion: CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION,
      version: 'test',
      styleMode: 'EARTHLIKE',
      gridWidth: 1,
      gridHeight: 1,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
  };
}

class MemoryWorldStorageEngine implements WorldStorageEngine {
  worlds = new Map<string, WorldBrain>();
  summaries = new Map<string, WorldSummary>();
  simBranches = new Map<string, SimBranchRecord>();

  async listWorldSummaries(): Promise<WorldSummary[]> {
    return [...this.summaries.values()];
  }

  async getWorldById(id: string): Promise<unknown | null> {
    return this.worlds.get(id) ?? null;
  }

  async putWorld(world: WorldBrain): Promise<void> {
    this.worlds.set(world.metadata.id, structuredClone(world));
  }

  async putWorldSummary(summary: WorldSummary): Promise<void> {
    this.summaries.set(summary.id, structuredClone(summary));
  }

  async deleteWorld(id: string): Promise<void> {
    this.worlds.delete(id);
    this.summaries.delete(id);
    for (const branch of this.simBranches.values()) {
      if (branch.worldId === id) this.simBranches.delete(branch.id);
    }
  }

  async listSimBranchRecords(worldId: string): Promise<SimBranchRecord[]> {
    return [...this.simBranches.values()].filter((branch) => branch.worldId === worldId);
  }

  async getSimBranchRecord(id: string): Promise<SimBranchRecord | null> {
    return this.simBranches.get(id) ?? null;
  }

  async putSimBranchRecord(record: SimBranchRecord): Promise<void> {
    this.simBranches.set(record.id, structuredClone(record));
  }

  async deleteSimBranchRecord(id: string): Promise<void> {
    this.simBranches.delete(id);
  }
}

describe('world storage transitional hardening', () => {
  it('stamps saved worlds and summaries with revision/hash/schema/authority metadata', async () => {
    const engine = new MemoryWorldStorageEngine();
    const original = makeWorld();
    const originalBeforeSave = structuredClone(original);
    const saved = await saveWorldWithEngine(original, engine);
    const [summary] = await engine.listWorldSummaries();

    expect(original).toEqual(originalBeforeSave);
    expect(saved).not.toBe(original);
    expect(saved.metadata.contentHash).toMatch(/^fnv1a32-[0-9a-f]{8}$/);
    expect(saved.metadata.revisionId).toBe(`${saved.metadata.id}:${saved.metadata.updatedAt}:${saved.metadata.contentHash}`);
    expect(computeWorldContentHash(saved)).toBe(saved.metadata.contentHash);
    expect(summary).toMatchObject({
      id: saved.metadata.id,
      revisionId: saved.metadata.revisionId,
      contentHash: saved.metadata.contentHash,
      schemaVersion: CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION,
      generatorAuthorityMode: 'LEGACY',
      status: {
        needsAttention: false,
        missingAssets: false,
        migrationRequired: false,
        recoveryAvailable: false,
        simBranchCount: 0,
        pluginPendingCount: 0,
      },
    });
  });

  it('readback verification catches a missing saved world', async () => {
    const engine = new MemoryWorldStorageEngine();
    engine.getWorldById = async () => null;

    await expect(saveWorldWithEngine(makeWorld('missing-world'), engine)).rejects.toThrow(/not found after save/);
    expect(await engine.listWorldSummaries()).toEqual([]);
  });

  it('readback verification catches mismatched saved world content', async () => {
    const engine = new MemoryWorldStorageEngine();
    engine.putWorld = async (world) => {
      const tampered = structuredClone(world);
      tampered.metadata.contentHash = 'fnv1a32-00000000';
      engine.worlds.set(world.metadata.id, tampered);
    };

    await expect(saveWorldWithEngine(makeWorld('tampered-world'), engine)).rejects.toThrow(/content hash mismatch|stored content hash mismatch/);
    expect(await engine.listWorldSummaries()).toEqual([]);
  });

  it('summarizeWorld exposes current schema and LEGACY authority for unsaved callers', () => {
    const summary = summarizeWorld(makeWorld('summary-world'));

    expect(summary.status.needsAttention).toBe(false);
    expect(summary.status.migrationRequired).toBe(false);
    expect(summary.status.simBranchCount).toBe(0);
    expect(summary.schemaVersion).toBe(CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION);
    expect(summary.generatorAuthorityMode).toBe('LEGACY');
    expect(summary.revisionId).toBe('');
    expect(summary.contentHash).toBe('');
  });

  it('keeps the world library summary available when branch snapshots cannot be loaded', async () => {
    const summary = summarizeWorld(makeWorld('branch-recovery-world'));
    const result = await summarizeWorldWithBranchLookup(summary, async () => {
      throw new Error('corrupt Sim branch snapshot');
    });

    expect(result.id).toBe(summary.id);
    expect(result.status.needsAttention).toBe(true);
    expect(result.status.recoveryAvailable).toBe(true);
    expect(result.status.simBranchCount).toBe(0);
    expect(result.schemaVersion).toBe(CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION);
    expect(result.generatorAuthorityMode).toBe('LEGACY');
  });
});
