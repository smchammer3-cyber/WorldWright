import { describe, expect, it } from 'vitest';
import { createEmptyLegacyCausalScaffold } from '../src/core/causalWorld/schema';
import type { EntropySource } from '../src/core/worldEntropy';
import {
  createC02SimBranchRecordFromWorld,
  normalizeC02SimBranchRecord,
  saveC02SimBranchRecordWithEngine,
} from '../src/core/worldStorage/c02SimBranch';
import type { SimBranchRecord, WorldStorageEngine, WorldSummary } from '../src/core/worldStorage';
import { createEmptyCell, type WorldBrain } from '../src/core/worldSchema';

function worldFixture(): WorldBrain {
  const width = 4;
  const height = 2;
  return {
    gridWidth: width,
    gridHeight: height,
    seaLevel: 0,
    cells: Array.from({ length: width * height }, (_, index) => createEmptyCell(index)),
    plates: [],
    rivers: [],
    countries: [],
    cultures: [],
    cultureRegions: [],
    cities: [],
    metadata: {
      id: 'world-storage-test',
      name: 'Test',
      seed: '1040037',
      schemaVersion: 4,
      version: 'test',
      styleMode: 'EARTHLIKE',
      gridWidth: width,
      gridHeight: height,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
    causal: createEmptyLegacyCausalScaffold(),
  };
}

const entropy: EntropySource = {
  getRandomValues<T extends ArrayBufferView>(array: T): T {
    if (array instanceof Uint8Array) array.fill(7);
    if (array instanceof Uint32Array) array.fill(7);
    return array;
  },
  randomUUID: () => '00000000-0000-4000-8000-000000000007',
};

class MemoryEngine implements WorldStorageEngine {
  branches = new Map<string, SimBranchRecord>();
  async listWorldSummaries(): Promise<WorldSummary[]> { return []; }
  async getWorldById(): Promise<unknown | null> { return null; }
  async putWorld(): Promise<void> {}
  async putWorldSummary(): Promise<void> {}
  async deleteWorld(): Promise<void> {}
  async listSimBranchRecords(worldId: string): Promise<SimBranchRecord[]> {
    return [...this.branches.values()].filter((record) => record.worldId === worldId);
  }
  async getSimBranchRecord(id: string): Promise<SimBranchRecord | null> { return this.branches.get(id) ?? null; }
  async putSimBranchRecord(record: SimBranchRecord): Promise<void> { this.branches.set(record.id, record); }
  async deleteSimBranchRecord(id: string): Promise<void> { this.branches.delete(id); }
}

describe('C02 Sim branch random context persistence', () => {
  it('creates new branches with injected identity entropy and persisted context', () => {
    const branch = createC02SimBranchRecordFromWorld(worldFixture(), 'Branch', 4, entropy);
    expect(branch.recordSchemaVersion).toBe(2);
    expect(branch.id).toContain('00000000-0000-4000-8000-000000000007');
    expect(branch.randomContext.rootWorldSeed).toBe('1040037');
    expect(branch.randomContextProvenance.source).toBe('CREATED_C02');
  });

  it('derives old branch compatibility context only from persisted immutable data', () => {
    const created = createC02SimBranchRecordFromWorld(worldFixture(), 'Branch', 4, entropy);
    const legacy = { ...created, recordSchemaVersion: 1 as const } as unknown as SimBranchRecord;
    delete (legacy as SimBranchRecord & { randomContext?: unknown }).randomContext;
    const first = normalizeC02SimBranchRecord(legacy);
    const second = normalizeC02SimBranchRecord(legacy);
    expect(second.randomContext).toEqual(first.randomContext);
    expect(first.randomContextProvenance.source).toBe('COMPAT_DERIVED');
  });

  it('verifies random context on save readback', async () => {
    const engine = new MemoryEngine();
    const branch = createC02SimBranchRecordFromWorld(worldFixture(), 'Branch', 4, entropy);
    const saved = await saveC02SimBranchRecordWithEngine(branch, engine);
    expect(saved.randomContext).toEqual(branch.randomContext);
  });
});
