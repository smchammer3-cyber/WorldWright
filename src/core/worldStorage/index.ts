// ========================================================
// WORLDWRIGHT -- WORLD STORAGE (TRANSITIONAL SAVE HARDENING)
// File: src/core/worldStorage/index.ts
// ========================================================

import type { GeneratorAuthorityMode } from '../causalWorld/schema';
import type { SimEvent } from '../simEvents';
import { createRandomIdentity, type EntropySource } from '../worldEntropy';
import { recomputeWorld } from '../worldRecompute';
import { simulateTick } from '../worldSim';
import {
  createSimRandomContext,
  deriveLegacySimBranchSalt,
  validateSimRandomContext,
  type SimRandomContextV1,
} from '../worldSim/randomContext';
import { cloneWorldDocument } from '../worldCloning';
import { migrateWorldDocument } from '../worldMigrations/migrateWorldDocument';
import { hashCanonicalJson } from '../worldProvenance/hash';
import type { WorldBrain } from '../worldSchema';
import { CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION } from '../worldSchema/version';
import { validateWorld } from '../worldValidation';

const DB_NAME = 'worldwright-db';
const INDEXED_DB_SCHEMA_VERSION = 4;

const STORE_WORLDS = 'worlds';
const STORE_INDEX = 'index';
const STORE_SIM_BRANCHES = 'simBranches';

export type WorldSummaryStatus = {
  needsAttention: boolean;
  missingAssets: boolean;
  migrationRequired: boolean;
  recoveryAvailable: boolean;
  simBranchCount: number;
  pluginPendingCount: number;
};

export type WorldSummary = {
  id: string;
  name: string;
  seed: string;
  updatedAt: string;
  createdAt: string;
  version: string;
  styleMode: string;
  revisionId: string;
  contentHash: string;
  schemaVersion: number | null;
  generatorAuthorityMode: GeneratorAuthorityMode | null;
  status: WorldSummaryStatus;
};

export type SimBranchRecordStatus = 'ACTIVE' | 'ARCHIVED' | 'TRASHED' | 'PROMOTED';

export type StoredSimEventDecision = {
  eventId: string;
  eventType: string;
  year: number;
  title: string;
  chosenOption: number;
  resolvedAt: string;
};

export type SimRandomContextProvenance = {
  source: 'CREATED_C02' | 'COMPAT_DERIVED';
  derivation: 'WEB_CRYPTO_BRANCH_SALT' | 'PERSISTED_IMMUTABLE_FIELDS_V1';
  assumption?: string;
};

export type SimBranchRecord = {
  recordSchemaVersion?: 1 | 2;
  id: string;
  worldId: string;
  name: string;
  baseWorldId: string;
  baseRevisionId: string;
  baseContentHash: string;
  startYear: number;
  currentYear: number;
  createdAt: string;
  updatedAt: string;
  status: SimBranchRecordStatus;
  worldSnapshot: WorldBrain;
  eventHistory: StoredSimEventDecision[];
  randomContext?: SimRandomContextV1;
  randomContextProvenance?: SimRandomContextProvenance;
  replayStateHash?: string;
};

export interface SimBranchTickCommitResult {
  readonly record: SimBranchRecord;
  readonly events: readonly SimEvent[];
}

export interface WorldStorageEngine {
  listWorldSummaries(): Promise<WorldSummary[]>;
  getWorldById(id: string): Promise<unknown | null>;
  putWorld(world: WorldBrain): Promise<void>;
  putWorldSummary(summary: WorldSummary): Promise<void>;
  deleteWorld(id: string): Promise<void>;
  listSimBranchRecords(worldId: string): Promise<SimBranchRecord[]>;
  getSimBranchRecord(id: string): Promise<SimBranchRecord | null>;
  putSimBranchRecord(record: SimBranchRecord): Promise<void>;
  deleteSimBranchRecord(id: string): Promise<void>;
  reset?(): Promise<void>;
}

let dbPromise: Promise<IDBDatabase> | null = null;

function getDb(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, INDEXED_DB_SCHEMA_VERSION);

      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_WORLDS)) {
          db.createObjectStore(STORE_WORLDS, { keyPath: 'metadata.id' });
        }
        if (!db.objectStoreNames.contains(STORE_INDEX)) {
          db.createObjectStore(STORE_INDEX, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORE_SIM_BRANCHES)) {
          db.createObjectStore(STORE_SIM_BRANCHES, { keyPath: 'id' });
        }
      };

      req.onblocked = () => {
        reject(new Error('Database upgrade blocked. Please close other WorldWright tabs and try again.'));
      };

      const timer = setTimeout(() => {
        reject(new Error('Opening database timed out. Try reloading or resetting storage.'));
      }, 5000);

      req.onerror = () => {
        clearTimeout(timer);
        reject(req.error);
      };

      req.onsuccess = () => {
        clearTimeout(timer);
        const db = req.result;
        db.onversionchange = () => {
          db.close();
          dbPromise = null;
        };
        resolve(db);
      };
    });
  }
  return dbPromise;
}

function tx<T>(
  db: IDBDatabase,
  store: string,
  mode: IDBTransactionMode,
  fn: (s: IDBObjectStore) => IDBRequest<T>
): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = db.transaction(store, mode);
    const s = t.objectStore(store);
    const r = fn(s);

    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
    t.onerror = () => reject(t.error);
  });
}

class IndexedDbWorldStorageEngine implements WorldStorageEngine {
  async listWorldSummaries(): Promise<WorldSummary[]> {
    const db = await getDb();
    const summaries = await tx<WorldSummary[]>(db, STORE_INDEX, 'readonly', (s) => s.getAll());
    return Promise.all(
      summaries.map((summary) =>
        summarizeWorldWithBranchLookup(summary, () => this.listSimBranchRecords(summary.id))
      )
    );
  }

  async getWorldById(id: string): Promise<unknown | null> {
    const db = await getDb();
    const value = await tx<unknown | undefined>(db, STORE_WORLDS, 'readonly', (s) => s.get(id));
    return value ?? null;
  }

  async putWorld(world: WorldBrain): Promise<void> {
    const db = await getDb();
    await tx(db, STORE_WORLDS, 'readwrite', (s) => s.put(world));
  }

  async putWorldSummary(summary: WorldSummary): Promise<void> {
    const db = await getDb();
    await tx(db, STORE_INDEX, 'readwrite', (s) => s.put(normalizeSummary(summary)));
  }

  async deleteWorld(id: string): Promise<void> {
    const db = await getDb();
    const branches = await this.listSimBranchRecords(id);
    await Promise.all(branches.map((branch) => this.deleteSimBranchRecord(branch.id)));
    await tx(db, STORE_WORLDS, 'readwrite', (s) => s.delete(id));
    await tx(db, STORE_INDEX, 'readwrite', (s) => s.delete(id));
  }

  async listSimBranchRecords(worldId: string): Promise<SimBranchRecord[]> {
    const db = await getDb();
    const records = await tx<SimBranchRecord[]>(db, STORE_SIM_BRANCHES, 'readonly', (s) => s.getAll());
    return records
      .filter((record) => record.worldId === worldId && record.status !== 'TRASHED')
      .map((record) => normalizeSimBranchRecord(record, 'LOAD'));
  }

  async getSimBranchRecord(id: string): Promise<SimBranchRecord | null> {
    const db = await getDb();
    const record = await tx<SimBranchRecord | undefined>(db, STORE_SIM_BRANCHES, 'readonly', (s) => s.get(id));
    return record ? normalizeSimBranchRecord(record) : null;
  }

  async putSimBranchRecord(record: SimBranchRecord): Promise<void> {
    const db = await getDb();
    await tx(db, STORE_SIM_BRANCHES, 'readwrite', (s) => s.put(normalizeSimBranchRecord(record, 'SAVE')));
  }

  async deleteSimBranchRecord(id: string): Promise<void> {
    const db = await getDb();
    await tx(db, STORE_SIM_BRANCHES, 'readwrite', (s) => s.delete(id));
  }

  async reset(): Promise<void> {
    return new Promise((resolve, reject) => {
      const req = indexedDB.deleteDatabase(DB_NAME);
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error('Database deletion blocked. Please close other tabs and try again.'));
      req.onsuccess = () => {
        dbPromise = null;
        resolve();
      };
    });
  }
}

const indexedDbStorageEngine = new IndexedDbWorldStorageEngine();

function defaultStatus(): WorldSummaryStatus {
  return {
    needsAttention: false,
    missingAssets: false,
    migrationRequired: false,
    recoveryAvailable: false,
    simBranchCount: 0,
    pluginPendingCount: 0,
  };
}

function normalizeSummary(summary: WorldSummary, simBranchCount?: number): WorldSummary {
  const schemaVersion = typeof summary.schemaVersion === 'number' ? summary.schemaVersion : null;
  const authorityMode =
    summary.generatorAuthorityMode === 'LEGACY' ||
    summary.generatorAuthorityMode === 'CAUSAL_SHADOW' ||
    summary.generatorAuthorityMode === 'CAUSAL_ACTIVE'
      ? summary.generatorAuthorityMode
      : null;

  return {
    ...summary,
    revisionId: summary.revisionId || '',
    contentHash: summary.contentHash || '',
    schemaVersion,
    generatorAuthorityMode: authorityMode,
    status: {
      ...defaultStatus(),
      ...(summary.status || {}),
      needsAttention: summary.status?.needsAttention || schemaVersion === null,
      migrationRequired:
        summary.status?.migrationRequired ||
        (schemaVersion !== null && schemaVersion !== CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION),
      simBranchCount: simBranchCount ?? summary.status?.simBranchCount ?? 0,
    },
  };
}

export async function summarizeWorldWithBranchLookup(
  summary: WorldSummary,
  loadBranches: () => Promise<SimBranchRecord[]>
): Promise<WorldSummary> {
  try {
    const branches = await loadBranches();
    return normalizeSummary(summary, branches.length);
  } catch {
    return normalizeSummary(
      {
        ...summary,
        status: {
          ...defaultStatus(),
          ...(summary.status || {}),
          needsAttention: true,
          recoveryAvailable: true,
        },
      },
      summary.status?.simBranchCount ?? 0
    );
  }
}

type SimBranchNormalizationMode = 'LOAD' | 'SAVE';

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

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = canonicalize((value as Record<string, unknown>)[key]);
        return acc;
      }, {});
  }
  return value;
}

function hashString(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return `fnv1a32-${(hash >>> 0).toString(16).padStart(8, '0')}`;
}

export function computeWorldContentHash(world: WorldBrain): string {
  const snapshot = {
    ...world,
    metadata: {
      ...world.metadata,
      revisionId: undefined,
      contentHash: undefined,
    },
  };
  return hashString(JSON.stringify(canonicalize(snapshot)));
}

function createRevisionId(world: WorldBrain, contentHash: string): string {
  return `${world.metadata.id}:${world.metadata.updatedAt}:${contentHash}`;
}

export function summarizeWorld(w: WorldBrain): WorldSummary {
  const now = new Date().toISOString();
  const createdAt = w.metadata.createdAt || now;
  const schemaVersion = typeof w.metadata.schemaVersion === 'number' ? w.metadata.schemaVersion : null;
  const authorityMode = w.causal?.authorityMode ?? null;

  return normalizeSummary({
    id: w.metadata.id,
    name: w.metadata.name || 'Untitled World',
    seed: w.metadata.seed || '',
    createdAt,
    updatedAt: w.metadata.updatedAt || now,
    version: w.metadata.version || 'unknown',
    styleMode: w.metadata.styleMode || 'unknown',
    revisionId: w.metadata.revisionId || '',
    contentHash: w.metadata.contentHash || '',
    schemaVersion,
    generatorAuthorityMode: authorityMode,
    status: defaultStatus(),
  });
}

function readCurrentWorld(raw: unknown, context: string): WorldBrain {
  const migration = migrateWorldDocument(raw);
  if (migration.status !== 'CURRENT') {
    const reason =
      migration.status === 'MIGRATED_IN_MEMORY'
        ? 'stored readback unexpectedly required migration'
        : migration.reason;
    throw new Error(`${context}: ${reason}`);
  }
  return migration.world;
}

function verifyReadback(expected: WorldBrain, actualRaw: unknown | null): WorldBrain {
  if (!actualRaw) {
    throw new Error(`Save readback verification failed: world ${expected.metadata.id} was not found after save.`);
  }
  const actual = readCurrentWorld(actualRaw, 'Save readback verification failed');
  if (actual.metadata.id !== expected.metadata.id) {
    throw new Error(`Save readback verification failed: expected world ${expected.metadata.id} but read ${actual.metadata.id}.`);
  }
  if (actual.metadata.revisionId !== expected.metadata.revisionId) {
    throw new Error(`Save readback verification failed: revision mismatch for world ${expected.metadata.id}.`);
  }
  if (actual.metadata.contentHash !== expected.metadata.contentHash) {
    throw new Error(`Save readback verification failed: content hash mismatch for world ${expected.metadata.id}.`);
  }
  const actualHash = computeWorldContentHash(actual);
  if (actualHash !== expected.metadata.contentHash) {
    throw new Error(`Save readback verification failed: stored content hash mismatch for world ${expected.metadata.id}.`);
  }
  return actual;
}

function verifySimBranchReadback(expected: SimBranchRecord, actual: SimBranchRecord | null): void {
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

export function createSimBranchRecordFromWorld(
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

export async function saveWorldWithEngine(world: WorldBrain, engine: WorldStorageEngine): Promise<WorldBrain> {
  const current = readCurrentWorld(world, 'Cannot save world');
  const candidate = cloneWorldDocument(current);
  const now = new Date().toISOString();
  candidate.metadata.createdAt = candidate.metadata.createdAt || now;
  candidate.metadata.updatedAt = now;
  candidate.metadata.contentHash = computeWorldContentHash(candidate);
  candidate.metadata.revisionId = createRevisionId(candidate, candidate.metadata.contentHash);

  await engine.putWorld(candidate);
  const readbackRaw = await engine.getWorldById(candidate.metadata.id);
  const verified = verifyReadback(candidate, readbackRaw);
  await engine.putWorldSummary(summarizeWorld(verified));

  return cloneWorldDocument(verified);
}

export async function saveSimBranchRecordWithEngine(
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

export async function listWorldSummaries(): Promise<WorldSummary[]> {
  return indexedDbStorageEngine.listWorldSummaries();
}

export async function getWorldById(id: string): Promise<unknown | null> {
  return indexedDbStorageEngine.getWorldById(id);
}

export async function saveWorld(world: WorldBrain): Promise<WorldBrain> {
  return saveWorldWithEngine(world, indexedDbStorageEngine);
}

export async function deleteWorld(id: string): Promise<void> {
  await indexedDbStorageEngine.deleteWorld(id);
}

export async function listSimBranchRecords(worldId: string): Promise<SimBranchRecord[]> {
  return indexedDbStorageEngine.listSimBranchRecords(worldId);
}

export async function getSimBranchRecord(id: string): Promise<SimBranchRecord | null> {
  return indexedDbStorageEngine.getSimBranchRecord(id);
}

export async function saveSimBranchRecord(record: SimBranchRecord): Promise<SimBranchRecord> {
  return saveSimBranchRecordWithEngine(record, indexedDbStorageEngine);
}

export async function simulateAndSaveSimBranchTick(
  record: SimBranchRecord,
  dt = 1,
): Promise<SimBranchTickCommitResult> {
  return simulateAndSaveSimBranchTickWithEngine(record, indexedDbStorageEngine, dt);
}

export async function deleteSimBranchRecord(id: string): Promise<void> {
  await indexedDbStorageEngine.deleteSimBranchRecord(id);
}

export async function resetStorage(): Promise<void> {
  await indexedDbStorageEngine.reset();
}
