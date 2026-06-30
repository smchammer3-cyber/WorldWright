import { describe, expect, it } from 'vitest';
import { createEmptyCell, type WorldBrain } from '../worldSchema';
import {
  computeWorldContentHash,
  saveWorldWithEngine,
  summarizeWorld,
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
    metadata: {
      id,
      name: 'Test World',
      seed: 'seed-1',
      schemaVersion: '1.0',
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

  async listWorldSummaries(): Promise<WorldSummary[]> {
    return [...this.summaries.values()];
  }

  async getWorldById(id: string): Promise<WorldBrain | null> {
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
  }
}

describe('world storage transitional hardening', () => {
  it('stamps saved worlds and summaries with revision/hash/status placeholders', async () => {
    const engine = new MemoryWorldStorageEngine();
    const saved = await saveWorldWithEngine(makeWorld(), engine);
    const [summary] = await engine.listWorldSummaries();

    expect(saved.metadata.contentHash).toMatch(/^fnv1a32-[0-9a-f]{8}$/);
    expect(saved.metadata.revisionId).toBe(`${saved.metadata.id}:${saved.metadata.updatedAt}:${saved.metadata.contentHash}`);
    expect(computeWorldContentHash(saved)).toBe(saved.metadata.contentHash);
    expect(summary).toMatchObject({
      id: saved.metadata.id,
      revisionId: saved.metadata.revisionId,
      contentHash: saved.metadata.contentHash,
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

  it('summarizeWorld exposes default status placeholders for unsaved transitional callers', () => {
    const summary = summarizeWorld(makeWorld('summary-world'));

    expect(summary.status.needsAttention).toBe(false);
    expect(summary.status.simBranchCount).toBe(0);
    expect(summary.revisionId).toBe('');
    expect(summary.contentHash).toBe('');
  });
});
