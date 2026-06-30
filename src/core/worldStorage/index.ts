// ========================================================
// WORLDWRIGHT -- WORLD STORAGE (TRANSITIONAL SAVE HARDENING)
// File: src/core/worldStorage/index.ts
//
// Phase 2 storage hardening:
// - Keep IndexedDB as the active storage engine.
// - Add a storage engine interface boundary for future engines.
// - Stamp saved worlds with revision IDs and content hashes.
// - Verify every save by reading the stored world back before success.
// - Add world-summary status placeholders without changing current UX flow.
// ========================================================

import { WorldBrain } from "../worldSchema";

const DB_NAME = "worldwright-db";
const DB_VERSION = 3;

const STORE_WORLDS = "worlds";
const STORE_INDEX = "index";

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
  status: WorldSummaryStatus;
};

export interface WorldStorageEngine {
  listWorldSummaries(): Promise<WorldSummary[]>;
  getWorldById(id: string): Promise<WorldBrain | null>;
  putWorld(world: WorldBrain): Promise<void>;
  putWorldSummary(summary: WorldSummary): Promise<void>;
  deleteWorld(id: string): Promise<void>;
  reset?(): Promise<void>;
}

let dbPromise: Promise<IDBDatabase> | null = null;

/**
 * Open (or create) the IndexedDB database. Handles onblocked events and
 * enforces an open timeout to prevent hanging. The returned promise
 * resolves with an opened database or rejects with an error. Once a
 * database is successfully opened, subsequent calls return the same
 * promise. On blocked or timeout errors callers can call resetStorage() to
 * delete the database and retry.
 */
function getDb(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      // If the database needs to be upgraded, create object stores.
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_WORLDS)) {
          db.createObjectStore(STORE_WORLDS, { keyPath: 'metadata.id' });
        }
        if (!db.objectStoreNames.contains(STORE_INDEX)) {
          db.createObjectStore(STORE_INDEX, { keyPath: 'id' });
        }
      };

      // Blocked: another tab with an older version prevents upgrade.
      req.onblocked = () => {
        reject(new Error('Database upgrade blocked. Please close other WorldWright tabs and try again.'));
      };

      // Timeout: if the open takes too long, reject.
      const timer = setTimeout(() => {
        reject(new Error('Opening database timed out. Try reloading or resetting storage.'));
      }, 5000);

      req.onerror = () => {
        clearTimeout(timer);
        reject(req.error);
      };

      req.onsuccess = () => {
        clearTimeout(timer);
        resolve(req.result);
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
    return tx(db, STORE_INDEX, "readonly", (s) => s.getAll());
  }

  async getWorldById(id: string): Promise<WorldBrain | null> {
    const db = await getDb();
    return tx(db, STORE_WORLDS, "readonly", (s) => s.get(id));
  }

  async putWorld(world: WorldBrain): Promise<void> {
    const db = await getDb();
    await tx(db, STORE_WORLDS, "readwrite", (s) => s.put(world));
  }

  async putWorldSummary(summary: WorldSummary): Promise<void> {
    const db = await getDb();
    await tx(db, STORE_INDEX, "readwrite", (s) => s.put(summary));
  }

  async deleteWorld(id: string): Promise<void> {
    const db = await getDb();
    await tx(db, STORE_WORLDS, "readwrite", (s) => s.delete(id));
    await tx(db, STORE_INDEX, "readwrite", (s) => s.delete(id));
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

  return {
    id: w.metadata.id,
    name: w.metadata.name || "Untitled World",
    seed: w.metadata.seed || "",
    createdAt,
    updatedAt: w.metadata.updatedAt || now,
    version: w.metadata.version || "unknown",
    styleMode: w.metadata.styleMode || "unknown",
    revisionId: w.metadata.revisionId || "",
    contentHash: w.metadata.contentHash || "",
    status: defaultStatus(),
  };
}

function verifyReadback(expected: WorldBrain, actual: WorldBrain | null): void {
  if (!actual) {
    throw new Error(`Save readback verification failed: world ${expected.metadata.id} was not found after save.`);
  }
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
}

export async function saveWorldWithEngine(world: WorldBrain, engine: WorldStorageEngine): Promise<WorldBrain> {
  const now = new Date().toISOString();
  world.metadata.createdAt = world.metadata.createdAt || now;
  world.metadata.updatedAt = now;
  world.metadata.contentHash = computeWorldContentHash(world);
  world.metadata.revisionId = createRevisionId(world, world.metadata.contentHash);

  const summary = summarizeWorld(world);

  await engine.putWorld(world);
  const readback = await engine.getWorldById(world.metadata.id);
  verifyReadback(world, readback);
  await engine.putWorldSummary(summary);

  return world;
}

export async function listWorldSummaries(): Promise<WorldSummary[]> {
  return indexedDbStorageEngine.listWorldSummaries();
}

export async function getWorldById(id: string): Promise<WorldBrain | null> {
  return indexedDbStorageEngine.getWorldById(id);
}

export async function saveWorld(world: WorldBrain): Promise<WorldBrain> {
  return saveWorldWithEngine(world, indexedDbStorageEngine);
}

export async function deleteWorld(id: string): Promise<void> {
  await indexedDbStorageEngine.deleteWorld(id);
}

/**
 * Clear all stored worlds and metadata by deleting the entire IndexedDB
 * database. This can be used as a recovery path if opening the database
 * continuously fails or becomes blocked. After deletion the next call to
 * getDb() will recreate the database.
 */
export async function resetStorage(): Promise<void> {
  await indexedDbStorageEngine.reset();
}
