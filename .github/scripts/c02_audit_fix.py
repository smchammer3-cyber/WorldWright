from pathlib import Path
import re


def replace_once(path: str, old: str, new: str) -> None:
    file = Path(path)
    text = file.read_text()
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f'{path}: expected one exact replacement, found {count}')
    file.write_text(text.replace(old, new))


def regex_once(path: str, pattern: str, replacement: str) -> None:
    file = Path(path)
    text = file.read_text()
    updated, count = re.subn(pattern, replacement, text, count=1, flags=re.S)
    if count != 1:
        raise RuntimeError(f'{path}: expected one regex replacement, found {count}')
    file.write_text(updated)


# Integer-only simulation address inputs and operative deterministic-RNG flag.
replace_once(
    'src/core/worldSim/index.ts',
    "import type { ResolvedWorldFeatureFlagSnapshot } from '../worldFeatureFlags/types';\n",
    "import { worldFeatureFlagValue } from '../worldFeatureFlags/resolve';\nimport type { ResolvedWorldFeatureFlagSnapshot } from '../worldFeatureFlags/types';\n",
)
replace_once(
    'src/core/worldSim/index.ts',
    "  const dt = request.dt ?? 1;\n  if (!Number.isFinite(dt) || dt <= 0) throw new RangeError('Simulation dt must be a positive finite number.');\n  if (request.randomContext.tickIndex < 0) throw new RangeError('Simulation tick index cannot be negative.');\n\n  const random = createSimRandomOracle(request.randomContext);\n",
    "  const dt = request.dt ?? 1;\n  if (!Number.isSafeInteger(dt) || dt <= 0) {\n    throw new RangeError('Simulation dt must be a positive safe integer.');\n  }\n  if (!Number.isSafeInteger(request.year)) {\n    throw new RangeError('Simulation year must be a safe integer.');\n  }\n  if (request.randomContext.tickIndex < 0) throw new RangeError('Simulation tick index cannot be negative.');\n  if (request.flags && !worldFeatureFlagValue<boolean>(request.flags, 'simulation.deterministic-rng.enabled')) {\n    throw new Error('Deterministic simulation RNG is disabled for this run.');\n  }\n\n  const random = createSimRandomOracle(request.randomContext);\n",
)

# Strict nested provenance validation.
regex_once(
    'src/core/worldProvenance/schema.ts',
    r"export function isCausalProvenanceManifestV1\(value: unknown\): value is CausalProvenanceManifestV1 \{.*?\n\}",
    '''export function isCausalProvenanceManifestV1(value: unknown): value is CausalProvenanceManifestV1 {
  if (!isRecord(value)) return false;
  if (value.schemaVersion !== 1 || (value.completeness !== 'COMPLETE' && value.completeness !== 'PARTIAL')) return false;
  if (!isAuthorityMode(value.authorityMode)) return false;

  const rootSeed = value.rootSeed;
  if (!isRecord(rootSeed)
    || typeof rootSeed.exactText !== 'string'
    || rootSeed.encoding !== 'utf8-v1'
    || typeof rootSeed.fingerprint !== 'string'
    || rootSeed.fingerprint.length === 0) return false;

  const randomSystem = value.randomSystem;
  if (!isRecord(randomSystem)
    || randomSystem.causalAlgorithm !== 'philox4x32-10'
    || randomSystem.causalAlgorithmVersion !== 1
    || typeof randomSystem.seedDerivationAlgorithm !== 'string'
    || randomSystem.seedEncoding !== 'utf8-v1'
    || (randomSystem.legacyGeneratorAlgorithm !== undefined && typeof randomSystem.legacyGeneratorAlgorithm !== 'string')) return false;

  const software = value.software;
  if (!isRecord(software)
    || !Number.isSafeInteger(software.worldSchemaVersion)
    || !Number.isSafeInteger(software.causalSchemaVersion)
    || typeof software.generatorVersion !== 'string'
    || typeof software.pipelineVersion !== 'string'
    || (software.buildCommit !== undefined && typeof software.buildCommit !== 'string')) return false;

  const flags = value.flags;
  if (!isRecord(flags)
    || flags.schemaVersion !== 1
    || flags.authorityMode !== value.authorityMode
    || !isRecord(flags.values)
    || !Array.isArray(flags.warnings)
    || !flags.warnings.every((warning) => typeof warning === 'string')) return false;
  for (const [key, entry] of Object.entries(flags.values)) {
    if (!isRecord(entry)
      || entry.key !== key
      || !isFeatureFlagValue(entry.value)
      || !isFeatureFlagValue(entry.defaultValue)
      || (entry.source !== 'DEFAULT' && entry.source !== 'RUN_OVERRIDE' && entry.source !== 'AUTHORITY_CONSTRAINT')
      || (entry.reason !== 'DEFAULTED' && entry.reason !== 'OVERRIDDEN' && entry.reason !== 'MODE_BLOCKED' && entry.reason !== 'INVALID_OVERRIDE')
      || typeof entry.affectsPhysicalOutput !== 'boolean') return false;
  }

  if (!Array.isArray(value.streams) || !value.streams.every(isRandomStreamProvenance)) return false;
  if (!Array.isArray(value.stages) || !value.stages.every(isStageProvenance)) return false;
  if (!Array.isArray(value.limitations) || !value.limitations.every((entry) => typeof entry === 'string')) return false;

  if (value.legacyCompatibility !== undefined) {
    const legacy = value.legacyCompatibility;
    if (!isRecord(legacy)
      || legacy.physicalGenerator !== 'LEGACY'
      || typeof legacy.randomAlgorithm !== 'string'
      || typeof legacy.explicitSeedOutputPreserved !== 'boolean'
      || typeof legacy.stageHistoryObserved !== 'boolean') return false;
  }

  return true;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isAuthorityMode(value: unknown): value is GeneratorAuthorityMode {
  return value === 'LEGACY' || value === 'CAUSAL_SHADOW' || value === 'CAUSAL_ACTIVE';
}

function isFeatureFlagValue(value: unknown): value is boolean | string | number {
  return typeof value === 'boolean' || typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value));
}

function isRandomStreamProvenance(value: unknown): boolean {
  return isRecord(value)
    && typeof value.name === 'string'
    && Number.isSafeInteger(value.version)
    && (value.version as number) > 0
    && typeof value.owner === 'string'
    && typeof value.keyFingerprint === 'string'
    && typeof value.purpose === 'string';
}

function isStageProvenance(value: unknown): boolean {
  if (!isRecord(value)
    || typeof value.stageId !== 'string'
    || value.stageId.length === 0
    || !Number.isSafeInteger(value.stageVersion)
    || (value.stageVersion as number) < 1
    || (value.status !== 'NOT_RUN' && value.status !== 'RECORDED' && value.status !== 'FAILED')
    || !Array.isArray(value.streamsUsed)
    || !Array.isArray(value.flagsUsed)
    || !Array.isArray(value.warnings)) return false;
  if (!value.streamsUsed.every((entry) => isRecord(entry)
    && typeof entry.name === 'string'
    && Number.isSafeInteger(entry.version)
    && (entry.version as number) > 0)) return false;
  if (!value.flagsUsed.every((entry) => typeof entry === 'string')) return false;
  if (!value.warnings.every((entry) => typeof entry === 'string')) return false;
  return isOptionalDeterministicHash(value.inputHash) && isOptionalDeterministicHash(value.outputHash);
}

function isOptionalDeterministicHash(value: unknown): boolean {
  return value === undefined || (isRecord(value)
    && value.algorithm === 'fnv1a64-canonical-json-v1'
    && typeof value.value === 'string'
    && /^[0-9a-f]{16}$/.test(value.value));
}''',
)

# Persisted simulation replay integrity and atomic tick/save path.
replace_once(
    'src/core/worldStorage/index.ts',
    "import type { GeneratorAuthorityMode } from '../causalWorld/schema';\nimport { createRandomIdentity, type EntropySource } from '../worldEntropy';\n",
    "import type { GeneratorAuthorityMode } from '../causalWorld/schema';\nimport type { SimEvent } from '../simEvents';\nimport { createRandomIdentity, type EntropySource } from '../worldEntropy';\nimport { recomputeWorld } from '../worldRecompute';\nimport { simulateTick } from '../worldSim';\n",
)
replace_once(
    'src/core/worldStorage/index.ts',
    "import { cloneWorldDocument } from '../worldCloning';\nimport { migrateWorldDocument } from '../worldMigrations/migrateWorldDocument';\n",
    "import { cloneWorldDocument } from '../worldCloning';\nimport { migrateWorldDocument } from '../worldMigrations/migrateWorldDocument';\nimport { hashCanonicalJson } from '../worldProvenance/hash';\n",
)
replace_once(
    'src/core/worldStorage/index.ts',
    "import { CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION } from '../worldSchema/version';\n",
    "import { CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION } from '../worldSchema/version';\nimport { validateWorld } from '../worldValidation';\n",
)
replace_once(
    'src/core/worldStorage/index.ts',
    "  randomContext?: SimRandomContextV1;\n  randomContextProvenance?: SimRandomContextProvenance;\n};\n",
    "  randomContext?: SimRandomContextV1;\n  randomContextProvenance?: SimRandomContextProvenance;\n  replayStateHash?: string;\n};\n\nexport interface SimBranchTickCommitResult {\n  readonly record: SimBranchRecord;\n  readonly events: readonly SimEvent[];\n}\n",
)
replace_once(
    'src/core/worldStorage/index.ts',
    "    await tx(db, STORE_SIM_BRANCHES, 'readwrite', (s) => s.put(normalizeSimBranchRecord(record)));\n",
    "    await tx(db, STORE_SIM_BRANCHES, 'readwrite', (s) => s.put(normalizeSimBranchRecord(record, 'SAVE')));\n",
)
regex_once(
    'src/core/worldStorage/index.ts',
    r"function normalizeSimBranchRecord\(record: SimBranchRecord\): SimBranchRecord \{.*?\n\}\n\nfunction canonicalize",
    '''type SimBranchNormalizationMode = 'LOAD' | 'SAVE';

function normalizeSimBranchRecord(
  record: SimBranchRecord,
  mode: SimBranchNormalizationMode = 'LOAD',
): SimBranchRecord {
  if (!record || typeof record !== 'object') throw new Error('Sim branch record is missing or invalid.');
  const sourceSchemaVersion = record.recordSchemaVersion ?? 1;
  if (sourceSchemaVersion !== 1 && sourceSchemaVersion !== 2) {
    throw new Error(`Sim branch ${record.id || '<unknown>'} uses unsupported record schema ${String(sourceSchemaVersion)}.`);
  }
  if (!Number.isSafeInteger(record.startYear) || !Number.isSafeInteger(record.currentYear)) {
    throw new Error(`Sim branch ${record.id} startYear/currentYear must be safe integers.`);
  }
  if (record.currentYear < record.startYear) {
    throw new Error(`Sim branch ${record.id} currentYear cannot precede startYear.`);
  }

  const migration = migrateWorldDocument(record.worldSnapshot);
  if (migration.status === 'UNSUPPORTED_NEWER' || migration.status === 'QUARANTINED') {
    throw new Error(`Sim branch ${record.id} snapshot cannot be loaded: ${migration.reason}`);
  }

  let randomContext: SimRandomContextV1;
  let randomContextProvenance: SimRandomContextProvenance;
  if (sourceSchemaVersion === 2) {
    try {
      validateSimRandomContext(record.randomContext);
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'invalid random context';
      throw new Error(`Sim branch ${record.id} schema 2 random context is invalid: ${reason}`);
    }
    randomContext = record.randomContext;
    if (randomContext.rootWorldSeed !== migration.world.metadata.seed) {
      throw new Error(`Sim branch ${record.id} random root seed does not match its world snapshot.`);
    }
    randomContextProvenance = validateSimRandomContextProvenance(record.randomContextProvenance, record.id);
  } else {
    randomContext = createSimRandomContext(
      migration.world.metadata.seed,
      deriveLegacySimBranchSalt({
        baseWorldId: record.baseWorldId,
        baseRevisionId: record.baseRevisionId || '',
        branchId: record.id,
        createdAt: record.createdAt,
      }),
      Math.max(0, Math.floor(record.currentYear - record.startYear)),
    );
    randomContextProvenance = {
      source: 'COMPAT_DERIVED',
      derivation: 'PERSISTED_IMMUTABLE_FIELDS_V1',
      assumption: 'Pre-C02 branch randomness begins from persisted currentYear relative to startYear.',
    };
  }

  if (randomContext.tickIndex !== record.currentYear - record.startYear) {
    throw new Error(`Sim branch ${record.id} year and random tick index are inconsistent.`);
  }

  const normalized: SimBranchRecord = {
    ...record,
    recordSchemaVersion: 2,
    baseRevisionId: record.baseRevisionId || '',
    baseContentHash: record.baseContentHash || '',
    status: record.status || 'ACTIVE',
    eventHistory: Array.isArray(record.eventHistory)
      ? record.eventHistory.map((event) => ({ ...event }))
      : [],
    randomContext,
    randomContextProvenance,
    worldSnapshot: cloneWorldDocument(migration.world),
  };
  const replayStateHash = computeSimBranchReplayStateHash(normalized);
  if (sourceSchemaVersion === 2 && mode === 'LOAD') {
    if (typeof record.replayStateHash !== 'string' || record.replayStateHash.length === 0) {
      throw new Error(`Sim branch ${record.id} schema 2 replay state hash is missing.`);
    }
    if (record.replayStateHash !== replayStateHash) {
      throw new Error(`Sim branch ${record.id} replay state hash mismatch.`);
    }
  }
  return { ...normalized, replayStateHash };
}

function validateSimRandomContextProvenance(
  value: SimRandomContextProvenance | undefined,
  branchId: string,
): SimRandomContextProvenance {
  if (!value) throw new Error(`Sim branch ${branchId} schema 2 random context provenance is missing.`);
  if (value.source === 'CREATED_C02' && value.derivation === 'WEB_CRYPTO_BRANCH_SALT') {
    return { source: value.source, derivation: value.derivation };
  }
  if (value.source === 'COMPAT_DERIVED' && value.derivation === 'PERSISTED_IMMUTABLE_FIELDS_V1') {
    return {
      source: value.source,
      derivation: value.derivation,
      ...(typeof value.assumption === 'string' ? { assumption: value.assumption } : {}),
    };
  }
  throw new Error(`Sim branch ${branchId} schema 2 random context provenance is invalid.`);
}

export function computeSimBranchReplayStateHash(record: SimBranchRecord): string {
  const hash = hashCanonicalJson({
    contract: 'WorldWright/sim-branch-replay-state/v1',
    recordSchemaVersion: 2,
    id: record.id,
    worldId: record.worldId,
    baseWorldId: record.baseWorldId,
    baseRevisionId: record.baseRevisionId || '',
    baseContentHash: record.baseContentHash || '',
    startYear: record.startYear,
    currentYear: record.currentYear,
    status: record.status,
    worldSnapshotContentHash: computeWorldContentHash(record.worldSnapshot),
    eventHistory: Array.isArray(record.eventHistory) ? record.eventHistory : [],
    randomContext: record.randomContext ?? null,
    randomContextProvenance: record.randomContextProvenance ?? null,
  });
  return `${hash.algorithm}:${hash.value}`;
}

function withSimBranchReplayStateHash(record: SimBranchRecord): SimBranchRecord {
  return { ...record, replayStateHash: computeSimBranchReplayStateHash(record) };
}

function canonicalize''',
)
regex_once(
    'src/core/worldStorage/index.ts',
    r"function verifySimBranchReadback\(expected: SimBranchRecord, actual: SimBranchRecord \| null\): void \{.*?\n\}\n\nexport function createSimBranchRecordFromWorld",
    '''function verifySimBranchReadback(expected: SimBranchRecord, actual: SimBranchRecord | null): void {
  if (!actual) {
    throw new Error(`Sim branch readback verification failed: branch ${expected.id} was not found after save.`);
  }
  if (actual.id !== expected.id || actual.worldId !== expected.worldId) {
    throw new Error(`Sim branch readback verification failed: branch identity mismatch for ${expected.id}.`);
  }
  if (actual.baseRevisionId !== expected.baseRevisionId) {
    throw new Error(`Sim branch readback verification failed: base revision mismatch for ${expected.id}.`);
  }
  if (actual.baseContentHash !== expected.baseContentHash) {
    throw new Error(`Sim branch readback verification failed: base content hash mismatch for ${expected.id}.`);
  }
  if (actual.currentYear !== expected.currentYear) {
    throw new Error(`Sim branch readback verification failed: current year mismatch for ${expected.id}.`);
  }
  if (actual.replayStateHash !== expected.replayStateHash) {
    throw new Error(`Sim branch readback verification failed: replay state hash mismatch for ${expected.id}.`);
  }
  if (computeSimBranchReplayStateHash(actual) !== actual.replayStateHash) {
    throw new Error(`Sim branch readback verification failed: stored replay state is inconsistent for ${expected.id}.`);
  }
}

export function createSimBranchRecordFromWorld''',
)
regex_once(
    'src/core/worldStorage/index.ts',
    r"export function createSimBranchRecordFromWorld\(.*?\n\}\n\nexport async function saveWorldWithEngine",
    '''export function createSimBranchRecordFromWorld(
  baseWorld: WorldBrain,
  name: string = `Branch ${new Date().toISOString()}`,
  startYear: number = 0,
  entropy?: EntropySource,
): SimBranchRecord {
  if (!Number.isSafeInteger(startYear)) throw new RangeError('Sim branch start year must be a safe integer.');
  const currentWorld = readCurrentWorld(baseWorld, 'Cannot create Sim branch');
  const now = new Date().toISOString();
  const baseContentHash = currentWorld.metadata.contentHash || computeWorldContentHash(currentWorld);
  const baseRevisionId = currentWorld.metadata.revisionId || createRevisionId(currentWorld, baseContentHash);

  return withSimBranchReplayStateHash({
    recordSchemaVersion: 2,
    id: `simbranch_${createRandomIdentity(entropy)}`,
    worldId: currentWorld.metadata.id,
    name,
    baseWorldId: currentWorld.metadata.id,
    baseRevisionId,
    baseContentHash,
    startYear,
    currentYear: startYear,
    createdAt: now,
    updatedAt: now,
    status: 'ACTIVE',
    worldSnapshot: cloneWorldDocument(currentWorld),
    eventHistory: [],
    randomContext: createSimRandomContext(currentWorld.metadata.seed, `sim-${createRandomIdentity(entropy)}`),
    randomContextProvenance: {
      source: 'CREATED_C02',
      derivation: 'WEB_CRYPTO_BRANCH_SALT',
    },
  });
}

export async function saveWorldWithEngine''',
)
regex_once(
    'src/core/worldStorage/index.ts',
    r"export async function saveSimBranchRecordWithEngine\(.*?\n\}\n\nexport async function listWorldSummaries",
    '''export async function saveSimBranchRecordWithEngine(
  record: SimBranchRecord,
  engine: WorldStorageEngine
): Promise<SimBranchRecord> {
  const nextRecord = normalizeSimBranchRecord({
    ...record,
    updatedAt: new Date().toISOString(),
  }, 'SAVE');

  await engine.putSimBranchRecord(nextRecord);
  const readbackRaw = await engine.getSimBranchRecord(nextRecord.id);
  const readback = readbackRaw ? normalizeSimBranchRecord(readbackRaw, 'LOAD') : null;
  verifySimBranchReadback(nextRecord, readback);

  return readback as SimBranchRecord;
}

export async function simulateAndSaveSimBranchTickWithEngine(
  record: SimBranchRecord,
  engine: WorldStorageEngine,
  dt = 1,
): Promise<SimBranchTickCommitResult> {
  if (dt !== 1) throw new RangeError('Persisted Sim branch ticks advance exactly one year.');
  const current = normalizeSimBranchRecord(record, 'SAVE');
  const candidateWorld = cloneWorldDocument(current.worldSnapshot);
  const result = simulateTick(candidateWorld, {
    branchId: current.id,
    year: current.currentYear,
    dt,
    randomContext: current.randomContext as SimRandomContextV1,
  });
  recomputeWorld(candidateWorld, ['SIM_STEP']);
  const errors = validateWorld(candidateWorld);
  if (errors.length > 0) {
    throw new Error(`Sim branch tick validation failed for ${current.id}: ${errors.join(' ')}`);
  }

  const candidateRecord = withSimBranchReplayStateHash({
    ...current,
    currentYear: current.currentYear + 1,
    worldSnapshot: candidateWorld,
    randomContext: result.nextRandomContext,
    updatedAt: new Date().toISOString(),
  });
  const saved = await saveSimBranchRecordWithEngine(candidateRecord, engine);
  return Object.freeze({ record: saved, events: Object.freeze([...result.events]) });
}

export async function listWorldSummaries''',
)
replace_once(
    'src/core/worldStorage/index.ts',
    "export async function saveSimBranchRecord(record: SimBranchRecord): Promise<SimBranchRecord> {\n  return saveSimBranchRecordWithEngine(record, indexedDbStorageEngine);\n}\n\nexport async function deleteSimBranchRecord(id: string): Promise<void> {\n",
    "export async function saveSimBranchRecord(record: SimBranchRecord): Promise<SimBranchRecord> {\n  return saveSimBranchRecordWithEngine(record, indexedDbStorageEngine);\n}\n\nexport async function simulateAndSaveSimBranchTick(\n  record: SimBranchRecord,\n  dt = 1,\n): Promise<SimBranchTickCommitResult> {\n  return simulateAndSaveSimBranchTickWithEngine(record, indexedDbStorageEngine, dt);\n}\n\nexport async function deleteSimBranchRecord(id: string): Promise<void> {\n",
)

# Existing test now advances both sides of the replay cursor contract.
replace_once(
    'src/core/worldStorage/simBranchRecords.test.ts',
    "    await saveSimBranchRecordWithEngine({ ...branch, currentYear: branch.currentYear + 1 }, engine);\n",
    "    await saveSimBranchRecordWithEngine({\n      ...branch,\n      currentYear: branch.currentYear + 1,\n      randomContext: branch.randomContext\n        ? { ...branch.randomContext, tickIndex: branch.randomContext.tickIndex + 1 }\n        : undefined,\n    }, engine);\n",
)
replace_once(
    'src/core/worldStorage/simBranchRecords.test.ts',
    "    await expect(saveSimBranchRecordWithEngine(branch, engine)).rejects.toThrow(/base content hash mismatch/);\n",
    "    await expect(saveSimBranchRecordWithEngine(branch, engine)).rejects.toThrow(/replay state hash mismatch|base content hash mismatch/);\n",
)

# Add dedicated audit-regression coverage without coupling to existing fixtures.
Path('test/worldC02AuditFixes.spec.ts').write_text('''import { describe, expect, it } from 'vitest';
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
''')

replace_once(
    'docs/implementation/C02_IMPLEMENTATION_STATUS.md',
    "- Run #384: exact source through deterministic Sim/session/storage integration — all configured jobs passed.\n- Final complete-head CI and artifact evidence must be recorded before merge review.\n",
    "- Run #384: exact source through deterministic Sim/session/storage integration — all configured jobs passed.\n- Run #410: pre-audit complete head — build, tests, snapshot canary, and full-globe review passed.\n- Post-audit corrections add atomic persisted tick/save, replay-state hashing, strict schema-2 validation, integer simulation time, and nested provenance validation.\n- The final corrected-head run ID and artifact evidence are recorded in the PR conversation after GitHub assigns them.\n",
)

# One-time operational files must not survive the correction commit.
for temporary in [
    '.github/workflows/c02-audit-source-export.yml',
    '.github/workflows/c02-audit-fix.yml',
    '.github/workflows/c02-audit-fix-v2.yml',
    '.github/scripts/c02_audit_fix.py',
]:
    Path(temporary).unlink(missing_ok=True)

print('C02 audit patch applied successfully.')
