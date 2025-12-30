// ========================================================
// WORLDWRIGHT -- WORLD STORAGE (V1.3)
// File: src/core/worldStorage/index.ts
//
// IndexedDB-backed storage for WorldBrain snapshots.
// ========================================================

import { WorldBrain } from "../worldTypes";
import { generateId } from "../util/id";

const DB_NAME = "worldwright-db";
const DB_VERSION = 1;
const STORE_WORLDS = "worlds";

let dbPromise: Promise<IDBDatabase> | null = null;

function getDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  const OPEN_TIMEOUT_MS = 2000;

  dbPromise = new Promise((resolve, reject) => {
    let settled = false;

    const fail = (err: unknown) => {
      if (settled) return;
      settled = true;
      dbPromise = null; // allow retry
      reject(err);
    };

    const timer = window.setTimeout(() => {
      fail(
        new Error(
          "IndexedDB open timed out. It may be blocked by another tab/window."
        )
      );
    }, OPEN_TIMEOUT_MS);

    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_WORLDS)) {
        db.createObjectStore(STORE_WORLDS, { keyPath: "id" });
      }
    };

    req.onblocked = () => {
      window.clearTimeout(timer);
      fail(
        new Error(
          "IndexedDB is blocked. Close other WorldWright tabs/windows and reload."
        )
      );
    };

    req.onsuccess = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      resolve(req.result);
    };

    req.onerror = () => {
      window.clearTimeout(timer);
      fail(req.error ?? new Error("IndexedDB open failed"));
    };
  });

  return dbPromise;
}

export async function saveWorld(world: WorldBrain): Promise<string> {
  const db = await getDb();

  const id = world.id ?? generateId();
  const now = new Date().toISOString();

  const record = {
    id,
    name: world.meta?.name ?? "Untitled World",
    seed: world.meta?.seed ?? "",
    createdAt: world.meta?.createdAt ?? now,
    updatedAt: now,
    version: world.meta?.version ?? "1.3",
    styleMode: world.meta?.styleMode ?? "Earthlike",
    world,
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_WORLDS, "readwrite");
    const store = tx.objectStore(STORE_WORLDS);

    const req = store.put(record);

    req.onsuccess = () => resolve(id);
    req.onerror = () => reject(req.error);
  });
}

export async function loadWorld(id: string): Promise<WorldBrain> {
  const db = await getDb();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_WORLDS, "readonly");
    const store = tx.objectStore(STORE_WORLDS);

    const req = store.get(id);

    req.onsuccess = () => {
      if (!req.result) {
        reject(new Error("World not found"));
      } else {
        resolve(req.result.world);
      }
    };

    req.onerror = () => reject(req.error);
  });
}

export async function listWorldSummaries() {
  const db = await getDb();

  return new Promise<any[]>((resolve, reject) => {
    const tx = db.transaction(STORE_WORLDS, "readonly");
    const store = tx.objectStore(STORE_WORLDS);

    const req = store.getAll();

    req.onsuccess = () => {
      resolve(
        req.result.map((r) => ({
          id: r.id,
          name: r.name,
          seed: r.seed,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,
          version: r.version,
          styleMode: r.styleMode,
        }))
      );
    };

    req.onerror = () => reject(req.error);
  });
}

export async function deleteWorld(id: string): Promise<void> {
  const db = await getDb();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_WORLDS, "readwrite");
    const store = tx.objectStore(STORE_WORLDS);

    const req = store.delete(id);

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}