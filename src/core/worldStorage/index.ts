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

function getDb(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);

      req.onupgradeneeded = () => {
        const db = req.result;

        if (!db.objectStoreNames.contains(STORE_WORLDS)) {
          db.createObjectStore(STORE_WORLDS, { keyPath: "metadata.id" });
        }
        if (!db.objectStoreNames.contains(STORE_INDEX)) {
          db.createObjectStore(STORE_INDEX, { keyPath: "id" });
        }
      };

      req.onerror = () => reject(req.error);
      req.onsuccess = () => resolve(req.result);
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