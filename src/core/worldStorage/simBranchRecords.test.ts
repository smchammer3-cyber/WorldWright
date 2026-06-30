import { describe, expect, it } from 'vitest';
import { createEmptyCell, type WorldBrain } from '../worldSchema';
import {
  computeWorldContentHash,
  createSimBranchRecordFromWorld,
  saveSimBranchRecordWithEngine,
  saveWorldWithEngine,
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
    metadata: {
      id,
      name: 'Branch Test World',
      seed: 'seed-branch',
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
  simBranches = new Map<string, SimBranchRecord>();

  async listWorldSummaries(): Promise<WorldSummary[]> {
    return [...this.summaries.values()].map((summary) => ({
      ...summary,
      status: {
        ...summary.status,
        simBranchCount: [...this.simBranches.values()].filter(
          (branch) => branch.worldId === summary.id && branch.status !== 'TRASHED',
        ).length,
      },
    }));
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
    for (const branch of this.simBranches.values()) {
      if (branch.worldId === id) this.simBranches.delete(branch.id);
    }
  }

  async listSimBranchRecords(worldId: string): Promise<SimBranchRecord[]> {
    return [...this.simBranches.values()].filter((branch) => branch.worldId === worldId && branch.status !== 'TRASHED');
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

describe('Sim branch record storage', () => {
  it('creates a branch record with base revision/hash metadata and a cloned world snapshot', async () => {
    const engine = new MemoryWorldStorageEngine();
    const savedWorld = await saveWorldWithEngine(makeWorld('branch-base'), engine);
    const branch = createSimBranchRecordFromWorld(savedWorld, 'What if branch', 12);

    expect(branch.worldId).toBe(savedWorld.metadata.id);
    expect(branch.baseWorldId).toBe(savedWorld.metadata.id);
    expect(branch.baseRevisionId).toBe(savedWorld.metadata.revisionId);
    expect(branch.baseContentHash).toBe(savedWorld.metadata.contentHash);
    expect(branch.currentYear).toBe(12);
    expect(branch.status).toBe('ACTIVE');

    branch.worldSnapshot.cells[0].editHeightDelta = 0.75;
    expect(savedWorld.cells[0].editHeightDelta).toBe(0);
    expect(computeWorldContentHash(savedWorld)).toBe(savedWorld.metadata.contentHash);
  });

  it('saves and lists branch records separately from canonical worlds', async () => {
    const engine = new MemoryWorldStorageEngine();
    const savedWorld = await saveWorldWithEngine(makeWorld('branch-list-base'), engine);
    const branch = createSimBranchRecordFromWorld(savedWorld, 'Stored branch', 3);
    branch.worldSnapshot.cells[0].simHeightDelta = 0.33;
    branch.eventHistory.push({
      eventId: 'event-1',
      eventType: 'CITY_GROWTH',
      year: 3,
      title: 'Branch-only event',
      chosenOption: 0,
      resolvedAt: '2026-01-02T00:00:00.000Z',
    });

    const savedBranch = await saveSimBranchRecordWithEngine(branch, engine);
    const canonicalReadback = await engine.getWorldById(savedWorld.metadata.id);
    const branchReadback = await engine.getSimBranchRecord(savedBranch.id);
    const branchList = await engine.listSimBranchRecords(savedWorld.metadata.id);
    const [summary] = await engine.listWorldSummaries();

    expect(canonicalReadback).toEqual(savedWorld);
    expect(branchReadback?.worldSnapshot.cells[0].simHeightDelta).toBe(0.33);
    expect(branchReadback?.eventHistory).toHaveLength(1);
    expect(branchList).toHaveLength(1);
    expect(summary.status.simBranchCount).toBe(1);
  });

  it('readback verification catches a missing Sim branch record', async () => {
    const engine = new MemoryWorldStorageEngine();
    const savedWorld = await saveWorldWithEngine(makeWorld('branch-missing-base'), engine);
    const branch = createSimBranchRecordFromWorld(savedWorld, 'Missing branch');
    engine.getSimBranchRecord = async () => null;

    await expect(saveSimBranchRecordWithEngine(branch, engine)).rejects.toThrow(/was not found after save/);
  });

  it('readback verification catches mismatched Sim branch base metadata', async () => {
    const engine = new MemoryWorldStorageEngine();
    const savedWorld = await saveWorldWithEngine(makeWorld('branch-tamper-base'), engine);
    const branch = createSimBranchRecordFromWorld(savedWorld, 'Tampered branch');
    engine.putSimBranchRecord = async (record) => {
      const tampered = structuredClone(record);
      tampered.baseContentHash = 'fnv1a32-00000000';
      engine.simBranches.set(record.id, tampered);
    };

    await expect(saveSimBranchRecordWithEngine(branch, engine)).rejects.toThrow(/base content hash mismatch/);
  });
});
