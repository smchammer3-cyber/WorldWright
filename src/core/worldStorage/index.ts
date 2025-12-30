// ========================================================
// WORLDWRIGHT -- WORLD STORAGE (V1.3 STABILIZE)
// File: src/core/worldStorage/index.ts
//
// Fixes:
// - Upgrade DB version to force schema refresh.
// - Centralize world summary generation.
// ========================================================

import { WorldBrain } from "../worldSchema";

const DB_NAME = "worldwright-db";
const DB_VERSION = 3;

const STORE_WORLDS = "worlds";
const STORE_INDEX = "index";

export type WorldSummary = {
  id: string;
  name: string;
  seed: string;
  updatedAt: string;
  createdAt: string;
  version: string;
  styleMode: string;
};

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

function summarizeWorld(w: WorldBrain): WorldSummary {
  const now = new Date().toISOString();
  const createdAt = w.metadata.createdAt || now;

  return {
    id: w.metadata.id,
    name: w.metadata.name || "Untitled World",
    seed: w.metadata.seed || "",
    createdAt,
    updatedAt: now,
    version: w.metadata.version || "unknown",
    styleMode: w.metadata.styleMode || "unknown",
  };
}

export async function listWorldSummaries(): Promise<WorldSummary[]> {
  const db = await getDb();
  return tx(db, STORE_INDEX, "readonly", (s) => s.getAll());
}

export async function getWorldById(id: string): Promise<WorldBrain | null> {
  const db = await getDb();
  return tx(db, STORE_WORLDS, "readonly", (s) => s.get(id));
}

export async function saveWorld(world: WorldBrain): Promise<WorldBrain> {
  const db = await getDb();
  const summary = summarizeWorld(world);

  world.metadata.updatedAt = summary.updatedAt;

  await tx(db, STORE_WORLDS, "readwrite", (s) => s.put(world));
  await tx(db, STORE_INDEX, "readwrite", (s) => s.put(summary));

  return world;
}

export async function deleteWorld(id: string): Promise<void> {
  const db = await getDb();
  await tx(db, STORE_WORLDS, "readwrite", (s) => s.delete(id));
  await tx(db, STORE_INDEX, "readwrite", (s) => s.delete(id));
}

/**
 * Clear all stored worlds and metadata by deleting the entire IndexedDB
 * database. This can be used as a recovery path if opening the database
 * continuously fails or becomes blocked. After deletion the next call to
 * getDb() will recreate the database.
 */
export async function resetStorage(): Promise<void> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.deleteDatabase(DB_NAME);
    req.onerror = () => reject(req.error);
    req.onblocked = () => reject(new Error('Database deletion blocked. Please close other tabs and try again.'));
    req.onsuccess = () => {
      // Reset our local promise so the DB will be reopened on next use.
      dbPromise = null;
      resolve();
    };
  });
}