import { describe, expect, it } from 'vitest';
import { createEmptyLegacyCausalScaffold } from '../causalWorld/schema';
import { resolveEvent, type SimEvent } from '../simEvents';
import { createEmptyCell, type WorldBrain } from '../worldSchema';
import { CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION } from '../worldSchema/version';
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
    causal: createEmptyLegacyCausalScaffold(),
    metadata: {
      id,
      name: 'Branch Test World',
      seed: 'seed-branch',
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
    expect(branch.recordSchemaVersion).toBe(2);
    expect(branch.randomContext).toMatchObject({ schemaVersion: 1, rootWorldSeed: savedWorld.metadata.seed, tickIndex: 0 });
    expect(branch.randomContextProvenance?.source).toBe('CREATED_C02');

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

    await expect(saveSimBranchRecordWithEngine(branch, engine)).rejects.toThrow(/replay state hash mismatch|base content hash mismatch/);
  });

  it('creates, saves, loads, selects, updates, and deletes a branch without mutating canonical world', async () => {
    const engine = new MemoryWorldStorageEngine();
    const savedWorld = await saveWorldWithEngine(makeWorld('branch-lifecycle-base'), engine);
    const canonicalBefore = structuredClone(savedWorld);

    const created = createSimBranchRecordFromWorld(savedWorld, 'Lifecycle branch', 5);
    const saved = await saveSimBranchRecordWithEngine(created, engine);
    const loadedBranches = await engine.listSimBranchRecords(savedWorld.metadata.id);
    const selected = loadedBranches.find((branch) => branch.id === saved.id);

    expect(selected?.name).toBe('Lifecycle branch');
    expect(selected?.currentYear).toBe(5);

    const updated = await saveSimBranchRecordWithEngine({
      ...selected!,
      currentYear: 6,
      randomContext: selected!.randomContext
        ? { ...selected!.randomContext, tickIndex: selected!.randomContext.tickIndex + 1 }
        : undefined,
      worldSnapshot: {
        ...selected!.worldSnapshot,
        cells: selected!.worldSnapshot.cells.map((cell, index) =>
          index === 0 ? { ...cell, simHeightDelta: 0.42 } : cell,
        ),
      },
    }, engine);

    expect(updated.currentYear).toBe(6);
    expect((await engine.getWorldById(savedWorld.metadata.id))).toEqual(canonicalBefore);

    await engine.deleteSimBranchRecord(updated.id);
    expect(await engine.getSimBranchRecord(updated.id)).toBeNull();
    expect(await engine.listSimBranchRecords(savedWorld.metadata.id)).toEqual([]);
    expect(await engine.getWorldById(savedWorld.metadata.id)).toEqual(canonicalBefore);
  });

  it('updates branch worldSnapshot and eventHistory for event resolution while canonical world stays unchanged', async () => {
    const engine = new MemoryWorldStorageEngine();
    let savedWorld = await saveWorldWithEngine(makeWorld('branch-event-base'), engine);
    savedWorld.cities.push({
      id: 'event-city',
      name: 'Event City',
      cellIndex: 0,
      population: 1000,
      type: 'TOWN',
      populationTier: 2,
      isCapital: false,
      economicRoles: [],
      tags: [],
      description: '',
    });
    savedWorld = await saveWorldWithEngine(savedWorld, engine);
    const canonicalBefore = structuredClone(await engine.getWorldById(savedWorld.metadata.id));
    const branch = createSimBranchRecordFromWorld(savedWorld, 'Event branch', 2);
    const branchWorld = structuredClone(branch.worldSnapshot);
    const event: SimEvent = {
      id: 'city-growth-event',
      type: 'CITY_GROWTH',
      year: 2,
      title: 'City growth',
      description: 'Branch-local city growth',
      affectedCityIds: ['event-city'],
      options: [{
        label: 'Accept growth',
        description: 'Grow the branch-local city population only.',
        effect: (world) => {
          const city = world.cities.find((candidate) => candidate.id === 'event-city');
          if (city) city.population = 1200;
        },
      }],
      severity: 'MINOR',
    };

    expect(resolveEvent(event, 0, branchWorld)).toBe(true);

    const savedBranch = await saveSimBranchRecordWithEngine({
      ...branch,
      worldSnapshot: branchWorld,
      eventHistory: [{
        eventId: event.id,
        eventType: event.type,
        year: event.year,
        title: event.title,
        chosenOption: 0,
        resolvedAt: '2026-01-02T00:00:00.000Z',
      }],
    }, engine);

    expect(savedBranch.worldSnapshot.cities[0].population).toBe(1200);
    expect(savedBranch.eventHistory).toHaveLength(1);
    expect(await engine.getWorldById(savedWorld.metadata.id)).toEqual(canonicalBefore);
  });

  it('persists tick-style currentYear updates through storage roundtrip', async () => {
    const engine = new MemoryWorldStorageEngine();
    const savedWorld = await saveWorldWithEngine(makeWorld('branch-tick-base'), engine);
    const branch = await saveSimBranchRecordWithEngine(
      createSimBranchRecordFromWorld(savedWorld, 'Tick branch', 0),
      engine,
    );

    await saveSimBranchRecordWithEngine({
      ...branch,
      currentYear: branch.currentYear + 1,
      randomContext: branch.randomContext
        ? { ...branch.randomContext, tickIndex: branch.randomContext.tickIndex + 1 }
        : undefined,
    }, engine);
    const roundtripped = await engine.getSimBranchRecord(branch.id);

    expect(roundtripped?.currentYear).toBe(1);
    expect(roundtripped?.worldSnapshot).toEqual(branch.worldSnapshot);
    expect(await engine.getWorldById(savedWorld.metadata.id)).toEqual(savedWorld);
  });
});
