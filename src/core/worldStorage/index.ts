// ========================================================
// WORLDWRIGHT -- WORLD STORAGE (V1.3 STABILIZE)
// File: src/core/worldStorage/index.ts
//
// Fixes:
// - Handle IndexedDB blocked state.
// - Add open timeout to prevent infinite hangs.
// - Throw clear errors (no silent failures).
// - Preserve existing API: listWorldSummaries, getWorldById, saveWorld, deleteWorld.
// ========================================================

import type { WorldBrain } from "../worldSchema";

const DB_NAME = "worldwright";
const DB_VERSION = 1;

const STORE_WORLDS = "worlds";
const STORE_INDEX = "world_index"; // minimal summaries list

type WorldSummary = {
  id: string;
  name: string;
  seed: string;
  updatedAt: string;
  createdAt: string;
  version: string;
  styleMode: string;
};

let dbPromise: Promise<IDBDatabase> | null = null;

function makeStorageError(msg: string, cause?: unknown) {
  const e = new Error(msg);
  (e as any).cause = cause;
  return e;
}

function getDbOpenTimeoutMs() {
  return 2000;
}

function getDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(makeStorageError("IndexedDB is not available in this environment."));
      return;
    }

    const req = indexedDB.open(DB_NAME, DB_VERSION);

    const timeout = setTimeout(() => {
      try {
        req.onerror = null;
        req.onsuccess = null;
        req.onupgradeneeded = null;
        (req as any).onblocked = null;
      } catch {}
      reject(
        makeStorageError(
          `IndexedDB open timed out (${getDbOpenTimeoutMs()}ms). Another tab may be blocking the database, or the browser is restricting storage.`
        )
      );
    }, getDbOpenTimeoutMs());

    (req as any).onblocked = () => {
      clearTimeout(timeout);
      reject(
        makeStorageError(
          "IndexedDB is blocked by another open tab or pending upgrade. Close other WorldWright tabs and reload."
        )
      );
    };

    req.onerror = () => {
      clearTimeout(timeout);
      reject(makeStorageError("IndexedDB open failed.", req.error));
    };

    req.onupgradeneeded = () => {
      const db = req.result;

      if (!db.objectStoreNames.contains(STORE_WORLDS)) {
        db.createObjectStore(STORE_WORLDS, { keyPath: "metadata.id" });
      }
      if (!db.objectStoreNames.contains(STORE_INDEX)) {
        db.createObjectStore(STORE_INDEX, { keyPath: "id" });
      }
    };

    req.onsuccess = () => {
      clearTimeout(timeout);
      resolve(req.result);
    };
  });

  // If open fails, allow retry on next call
  dbPromise.catch(() => {
    dbPromise = null;
  });

  return dbPromise;
}

function tx<T>(
  db: IDBDatabase,
  storeName: string,
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T>
): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = db.transaction(storeName, mode);
    const s = t.objectStore(storeName);
    const req = fn(s);

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(makeStorageError("IndexedDB request failed.", req.error));

    t.onabort = () => reject(makeStorageError("IndexedDB transaction aborted.", t.error));
    t.onerror = () => reject(makeStorageError("IndexedDB transaction error.", t.error));
  });
}

async function readIndex(db: IDBDatabase): Promise<WorldSummary[]> {
  const all = await tx<any[]>(db, STORE_INDEX, "readonly", (s) => s.getAll());
  return (all || []) as WorldSummary[];
}

async function writeIndex(db: IDBDatabase, summary: WorldSummary): Promise<void> {
  await tx(db, STORE_INDEX, "readwrite", (s) => s.put(summary));
}

async function removeIndex(db: IDBDatabase, id: string): Promise<void> {
  await tx(db, STORE_INDEX, "readwrite", (s) => s.delete(id));
}

function summarizeWorld(w: WorldBrain): WorldSummary {
  const now = new Date().toISOString();
  const createdAt = w.metadata.createdAt || now;
  const updatedAt = now;

  return {
    id: w.metadata.id,
    name: w.metadata.name || "Untitled World",
    seed: String(w.metadata.seed ?? ""),
    createdAt,
    updatedAt,
    version: w.metadata.version || "v1.3",
    styleMode: w.metadata.styleMode || "Earthlike",
  };
}

// --------------------------------------------
// Public API
// --------------------------------------------

export async function listWorldSummaries(): Promise<WorldSummary[]> {
  const db = await getDb();
  const idx = await readIndex(db);
  // newest first
  return idx.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export async function getWorldById(id: string): Promise<WorldBrain | null> {
  const db = await getDb();
  const w = await tx<any>(db, STORE_WORLDS, "readonly", (s) => s.get(id));
  return (w || null) as WorldBrain | null;
}

export async function saveWorld(world: WorldBrain): Promise<WorldBrain> {
  const db = await getDb();

  // Ensure we have an ID
  if (!world.metadata.id) {
    world.metadata.id = crypto.randomUUID();
  }

  // Mirror seaLevel if contract expects it
  if ((world as any).seaLevel != null) {
    (world.metadata as any).seaLevel = (world as any).seaLevel;
  }

  const summary = summarizeWorld(world);
  world.metadata.createdAt = summary.createdAt;
  world.metadata.updatedAt = summary.updatedAt;

  await tx(db, STORE_WORLDS, "readwrite", (s) => s.put(world));
  await writeIndex(db, summary);

  return world;
}

export async function deleteWorld(id: string): Promise<void> {
  const db = await getDb();
  await tx(db, STORE_WORLDS, "readwrite", (s) => s.delete(id));
  await removeIndex(db, id);
}