// ========================================================
// WORLDWRIGHT -- WORLD STORAGE (V1.3 STABILIZE)
// File: src/core/worldStorage/index.ts
//
// Fixes:
// - Upgrade DB version to force schema refresh.
// - Ensure object stores exist with correct keyPaths.
// - Detect incompatible prior schemas and throw a clear "reset storage" error.
// - Handle onblocked + open timeout (no hangs).
// ========================================================

import type { WorldBrain } from "../worldSchema";

const DB_NAME = "worldwright";
const DB_VERSION = 2;

const STORE_WORLDS = "worlds";       // keyPath: "metadata.id"
const STORE_INDEX = "world_index";   // keyPath: "id"

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

function openTimeoutMs() {
  return 2000;
}

function ensureStores(db: IDBDatabase) {
  // Only callable during upgrade in practice (db.createObjectStore)
  if (!db.objectStoreNames.contains(STORE_WORLDS)) {
    db.createObjectStore(STORE_WORLDS, { keyPath: "metadata.id" });
  }
  if (!db.objectStoreNames.contains(STORE_INDEX)) {
    db.createObjectStore(STORE_INDEX, { keyPath: "id" });
  }
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
      reject(
        makeStorageError(
          `IndexedDB open timed out (${openTimeoutMs()}ms). Another tab may be blocking the database, or the browser is restricting storage.`
        )
      );
    }, openTimeoutMs());

    (req as any).onblocked = () => {
      clearTimeout(timeout);
      reject(
        makeStorageError(
          "IndexedDB upgrade/open is BLOCKED by another tab. Close other WorldWright tabs and reload."
        )
      );
    };

    req.onerror = () => {
      clearTimeout(timeout);
      reject(makeStorageError("IndexedDB open failed.", req.error));
    };

    req.onupgradeneeded = () => {
      const db = req.result;

      // Create stores if missing
      ensureStores(db);
    };

    req.onsuccess = () => {
      clearTimeout(timeout);

      const db = req.result;

      // ---- Schema sanity check (catches old broken schemas) ----
      // We must verify keyPath exists, otherwise puts will fail exactly like your screenshot.
      try {
        const t = db.transaction(STORE_WORLDS, "readonly");
        const s = t.objectStore(STORE_WORLDS);

        // If worlds store exists but has no keyPath (out-of-line keys),
        // our put(world) will fail unless we provide a key each time.
        // Blueprint + reliability: force user to reset storage.
        const kp = (s as any).keyPath;
        const autoInc = (s as any).autoIncrement;

        const keyPathOk = kp === "metadata.id";
        const hasKeyGenerator = !!autoInc;

        if (!keyPathOk && !hasKeyGenerator) {
          reject(
            makeStorageError(
              [
                "IndexedDB schema mismatch (old database).",
                "Your browser has an older WorldWright DB where the 'worlds' store has no keyPath and no key generator.",
                "Fix: clear site storage for this preview origin, then reload.",
                "In Chrome: DevTools → Application → Storage → Clear site data (or IndexedDB → delete 'worldwright').",
              ].join(" ")
            )
          );
          try {
            db.close();
          } catch {}
          return;
        }
      } catch (e) {
        reject(
          makeStorageError(
            "IndexedDB schema check failed. You may need to clear site storage for this origin and reload.",
            e
          )
        );
        try {
          db.close();
        } catch {}
        return;
      }

      resolve(db);
    };
  });

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
    if (!db.objectStoreNames.contains(storeName)) {
      reject(
        makeStorageError(
          `IndexedDB store "${storeName}" not found. This is an old/partial schema. Clear site storage and reload.`
        )
      );
      return;
    }

    const t = db.transaction(storeName, mode);
    const s = t.objectStore(storeName);
    const req = fn(s);

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(makeStorageError("IndexedDB request failed.", req.error));

    t.onabort = () => reject(makeStorageError("IndexedDB transaction aborted.", t.error));
    t.onerror = () => reject(makeStorageError("IndexedDB transaction error.", t.error));
  });
}

function summarizeWorld(w: WorldBrain): WorldSummary {
  const now = new Date().toISOString();
  const createdAt = w.metadata.createdAt || now;

  return {
    id: w.metadata.id,
    name: w.metadata.name || "Untitled World",
    seed: String(w.metadata.seed ?? ""),
    createdAt,
    updatedAt: now,
    version: w.metadata.version || "v1.3",
    styleMode: w.metadata.styleMode || "Earthlike",
  };
}

// --------------------------------------------
// Public API
// --------------------------------------------

export async function listWorldSummaries(): Promise<WorldSummary[]> {
  const db = await getDb();
  const idx = await tx<any[]>(db, STORE_INDEX, "readonly", (s) => s.getAll());
  const list = (idx || []) as WorldSummary[];
  return list.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export async function getWorldById(id: string): Promise<WorldBrain | null> {
  const db = await getDb();
  const w = await tx<any>(db, STORE_WORLDS, "readonly", (s) => s.get(id));
  return (w || null) as WorldBrain | null;
}

export async function saveWorld(world: WorldBrain): Promise<WorldBrain> {
  const db = await getDb();

  if (!world.metadata.id) {
    world.metadata.id = crypto.randomUUID();
  }

  const summary = summarizeWorld(world);
  world.metadata.createdAt = summary.createdAt;
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