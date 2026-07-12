import { describe, expect, it } from 'vitest';
import { createEmptyLegacyCausalScaffold } from '../src/core/causalWorld/schema';
import { resolveWorldFeatureFlags } from '../src/core/worldFeatureFlags/resolve';
import { createC02ProvenanceManifest } from '../src/core/worldProvenance/createManifest';
import { isCausalProvenanceManifestV1 } from '../src/core/worldProvenance/schema';
import { createSimRandomContext } from '../src/core/worldSim/randomContext';
import { simulateTick } from '../src/core/worldSim';
import { createEmptyCell, type WorldBrain } from '../src/core/worldSchema';
import {
  createSimBranchRecordFromWorld,
  saveSimBranchRecordWithEngine,
  saveWorldWithEngine,
  simulateAndSaveSimBranchTickWithEngine,
  type SimBranchRecord,
  type WorldStorageEngine,
  type WorldSummary,
} from '../src/core/worldStorage';

function makeWorld(id = 'audit-world'): WorldBrain {
  return {
    gridWidth: 2,
    gridHeight: 1,
    seaLevel: 0.5,
    cells: [createEmptyCell(0), createEmptyCell(1)],
    plates: [], rivers: [], countries: [], cultures: [], cultureRegions: [], cities: [],
    causal: createEmptyLegacyCausalScaffold(),
    metadata: {
      id, name: 'Audit World', seed: '1040037', schemaVersion: 4, version: 'test',
      styleMode: 'EARTHLIKE', gridWidth: 2, gridHeight: 1,
      createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
    },
  };
}

class MemoryEngine implements WorldStorageEngine {
  worlds = new Map<string, WorldBrain>();
  summaries = new Map<string, WorldSummary>();
  branches = new Map<string, SimBranchRecord>();
  async listWorldSummaries() { return [...this.summaries.values()]; }
  async getWorldById(id: string) { return this.worlds.get(id) ?? null; }
  async putWorld(world: WorldBrain) { this.worlds.set(world.metadata.id, structuredClone(world)); }
  async putWorldSummary(summary: WorldSummary) { this.summaries.set(summary.id, structuredClone(summary)); }
  async deleteWorld(id: string) { this.worlds.delete(id); this.summaries.delete(id); }
  async listSimBranchRecords(worldId: string) { return [...this.branches.values()].filter((branch) => branch.worldId === worldId); }
  async getSimBranchRecord(id: string) { return this.branches.get(id) ?? null; }
  async putSimBranchRecord(record: SimBranchRecord) { this.branches.set(record.id, structuredClone(record)); }
  async deleteSimBranchRecord(id: string) { this.branches.delete(id); }
}

describe('C02 audit corrections', () => {
  it('round-trips and replays snapshot, year, events, and random context together', async () => {
    const firstEngine = new MemoryEngine();
    const replayEngine = new MemoryEngine();
    const savedWorld = await saveWorldWithEngine(makeWorld('replay-base'), firstEngine);
    const starting = await saveSimBranchRecordWithEngine(createSimBranchRecordFromWorld(savedWorld, 'Replay', 12), firstEngine);
    await replayEngine.putSimBranchRecord(structuredClone(starting));

    const first = await simulateAndSaveSimBranchTickWithEngine(starting, firstEngine);
    const replay = await simulateAndSaveSimBranchTickWithEngine(structuredClone(starting), replayEngine);
    expect(replay.record.worldSnapshot).toEqual(first.record.worldSnapshot);
    expect(replay.record.currentYear).toBe(first.record.currentYear);
    expect(replay.record.randomContext).toEqual(first.record.randomContext);
    expect(replay.record.replayStateHash).toBe(first.record.replayStateHash);
    expect(replay.events.map((event) => event.id)).toEqual(first.events.map((event) => event.id));

    const firstLoaded = await firstEngine.getSimBranchRecord(starting.id);
    const replayLoaded = await replayEngine.getSimBranchRecord(starting.id);
    const firstNext = await simulateAndSaveSimBranchTickWithEngine(firstLoaded!, firstEngine);
    const replayNext = await simulateAndSaveSimBranchTickWithEngine(replayLoaded!, replayEngine);
    expect(replayNext.record.worldSnapshot).toEqual(firstNext.record.worldSnapshot);
    expect(replayNext.record.randomContext).toEqual(firstNext.record.randomContext);
    expect(replayNext.record.replayStateHash).toBe(firstNext.record.replayStateHash);
  });

  it('fails closed for corrupt schema-2 replay state and unsupported future schemas', async () => {
    const engine = new MemoryEngine();
    const savedWorld = await saveWorldWithEngine(makeWorld('corrupt-base'), engine);
    const branch = createSimBranchRecordFromWorld(savedWorld, 'Corrupt');
    engine.getSimBranchRecord = async () => {
      const tampered = structuredClone(branch);
      tampered.randomContext = tampered.randomContext
        ? { ...tampered.randomContext, tickIndex: tampered.randomContext.tickIndex + 1 }
        : undefined;
      return tampered;
    };
    await expect(saveSimBranchRecordWithEngine(branch, engine)).rejects.toThrow(/inconsistent|replay state hash mismatch/);
    await expect(saveSimBranchRecordWithEngine({ ...branch, recordSchemaVersion: 99 as never }, new MemoryEngine()))
      .rejects.toThrow(/unsupported record schema/);
  });

  it('does not advance the caller record when persistence fails', async () => {
    const engine = new MemoryEngine();
    const savedWorld = await saveWorldWithEngine(makeWorld('failure-base'), engine);
    const branch = createSimBranchRecordFromWorld(savedWorld, 'Failure');
    const before = structuredClone(branch);
    engine.putSimBranchRecord = async () => { throw new Error('simulated persistence failure'); };
    await expect(simulateAndSaveSimBranchTickWithEngine(branch, engine)).rejects.toThrow(/persistence failure/);
    expect(branch).toEqual(before);
  });

  it('rejects fractional time and honors the deterministic simulation flag', () => {
    const world = makeWorld('time-base');
    const before = structuredClone(world);
    const context = createSimRandomContext(world.metadata.seed, 'branch-salt', 0);
    expect(() => simulateTick(world, { branchId: 'branch', year: 0, randomContext: context, dt: 0.5 })).toThrow(/safe integer/);
    expect(() => simulateTick(world, { branchId: 'branch', year: 0.5, randomContext: context })).toThrow(/safe integer/);
    const flags = resolveWorldFeatureFlags('LEGACY', { 'simulation.deterministic-rng.enabled': false });
    expect(() => simulateTick(world, { branchId: 'branch', year: 0, randomContext: context, flags })).toThrow(/disabled/);
    expect(world).toEqual(before);
  });

  it('rejects malformed nested provenance', () => {
    const manifest = createC02ProvenanceManifest({
      seed: '1040037', worldSchemaVersion: 4, generatorVersion: 'test', pipelineVersion: 'legacy-v1', observedLegacyGeneration: true,
    });
    const badAlgorithm = structuredClone(manifest) as unknown as { randomSystem: { causalAlgorithm: string } };
    badAlgorithm.randomSystem.causalAlgorithm = 'not-philox';
    expect(isCausalProvenanceManifestV1(badAlgorithm)).toBe(false);
    const badStream = structuredClone(manifest) as unknown as { streams: Array<{ version: number }> };
    badStream.streams[0].version = 0;
    expect(isCausalProvenanceManifestV1(badStream)).toBe(false);
  });
});
