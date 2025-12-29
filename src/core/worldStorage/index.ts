// ========================================================
// JARVIS CHANGE HEADER -- STORAGE REALIGNMENT (V1.3 METADATA + GLOBAL SEALEVEL)
// File: src/core/worldStorage/index.ts
//
// Fixes:
// - Ensure metadata uses `version` (blueprint) not schemaVersion.
// - Ensure global world.seaLevel exists. Migrate legacy worlds that stored seaLevel
//   in metadata or per-cell fields.
// - Keep IndexedDB persistence + localStorage index.
// - Provides safe, minimal migration without refactors.
// ========================================================

import { WorldBrain } from "../worldSchema";

type WorldSummary = {
  id: string;
  name: string;
  seed: string;
  updatedAt: string;
  createdAt: string;
  version: string;
  styleMode: string;
};

const DB_NAME = "worldwright_db";
const DB_VERSION = 1;
const STORE_NAME = "worlds";
const INDEX_KEY = "worldwright_world_index_v1";

function nowISO() {
  return new Date().toISOString();
}

function safeUUID(): string {
  // crypto.randomUUID exists in modern browsers; fallback just in case.
  try {
    // @ts-ignore
    return crypto.randomUUID();
  } catch {
    return "ww_" + Math.floor(Math.random() * 1e15).toString(16);
  }
}

/* -------------------------------------------------------
   IndexedDB helpers
------------------------------------------------------- */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "metadata.id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function withStore<T>(
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => void,
): Promise<T> {
  const db = await openDB();
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, mode);
    const store = tx.objectStore(STORE_NAME);

    let result: any = undefined;

    try {
      fn(store);
    } catch (e) {
      reject(e);
      return;
    }

    tx.oncomplete = () => resolve(result as T);
    tx.onerror = () => reject(tx.error);

    // A tiny hack: allow fn to stash a return value on tx.
    // (We avoid wrapping every request in another promise.)
    (tx as any).__setResult = (v: any) => {
      result = v;
    };
  });
}

/* -------------------------------------------------------
   Index helpers (localStorage)
------------------------------------------------------- */
function readIndex(): string[] {
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter((x) => typeof x === "string");
    return [];
  } catch {
    return [];
  }
}

function writeIndex(ids: string[]) {
  try {
    localStorage.setItem(INDEX_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

function addToIndex(id: string) {
  const ids = readIndex();
  if (!ids.includes(id)) {
    ids.unshift(id);
    writeIndex(ids);
  }
}

function removeFromIndex(id: string) {
  const ids = readIndex().filter((x) => x !== id);
  writeIndex(ids);
}

/* -------------------------------------------------------
   Migration + normalization
------------------------------------------------------- */
function normalizeWorldInPlace(world: any): WorldBrain {
  if (!world || typeof world !== "object") throw new Error("Invalid world object.");

  // Ensure metadata exists
  if (!world.metadata || typeof world.metadata !== "object") {
    world.metadata = {};
  }

  // Ensure id/name/seed/version
  if (typeof world.metadata.id !== "string" || !world.metadata.id) world.metadata.id = safeUUID();
  if (typeof world.metadata.name !== "string" || !world.metadata.name) world.metadata.name = "World";
  if (typeof world.metadata.seed !== "string" || !world.metadata.seed) {
    const s = (world.metadata.seed ?? world.seed ?? world.parameters?.seed ?? Math.floor(Math.random() * 1e9));
    world.metadata.seed = String(s);
  }

  // Blueprint: version field lives on metadata
  if (typeof world.metadata.version !== "string" || !world.metadata.version) world.metadata.version = "1.3";

  // Style mode default
  if (typeof world.metadata.styleMode !== "string" || !world.metadata.styleMode) world.metadata.styleMode = "EARTHLIKE";

  // Grid dims (prefer top-level, else metadata, else infer)
  const gw =
    Number.isFinite(world.gridWidth) ? world.gridWidth :
    Number.isFinite(world.metadata.gridWidth) ? world.metadata.gridWidth :
    0;

  const gh =
    Number.isFinite(world.gridHeight) ? world.gridHeight :
    Number.isFinite(world.metadata.gridHeight) ? world.metadata.gridHeight :
    0;

  if (!gw || !gh) {
    // Infer square-ish from cell count if needed
    const n = Array.isArray(world.cells) ? world.cells.length : 0;
    const side = n > 0 ? Math.round(Math.sqrt(n)) : 64;
    world.gridWidth = side;
    world.gridHeight = side;
    world.metadata.gridWidth = side;
    world.metadata.gridHeight = side;
  } else {
    world.gridWidth = gw;
    world.gridHeight = gh;
    world.metadata.gridWidth = gw;
    world.metadata.gridHeight = gh;
  }

  // createdAt/updatedAt
  if (typeof world.metadata.createdAt !== "string" || !world.metadata.createdAt) world.metadata.createdAt = nowISO();
  if (typeof world.metadata.updatedAt !== "string" || !world.metadata.updatedAt) world.metadata.updatedAt = nowISO();

  // ---- GLOBAL SEA LEVEL MIGRATION ----
  // Priority:
  // 1) world.seaLevel if valid
  // 2) metadata.seaLevel (legacy)
  // 3) first cell seaLevel (legacy per-cell)
  // 4) default 0.3
  let seaLevel: number | null = null;

  if (Number.isFinite(world.seaLevel)) seaLevel = world.seaLevel;
  else if (Number.isFinite(world.metadata.seaLevel)) seaLevel = world.metadata.seaLevel;
  else if (Array.isArray(world.cells) && world.cells.length > 0 && Number.isFinite(world.cells[0]?.seaLevel)) {
    seaLevel = world.cells[0].seaLevel;
  }

  if (!Number.isFinite(seaLevel)) seaLevel = 0.3;
  world.seaLevel = seaLevel;

  // Remove legacy metadata.seaLevel (optional, but keeps single source of truth)
  if (world.metadata && "seaLevel" in world.metadata) {
    delete world.metadata.seaLevel;
  }

  // Remove legacy per-cell seaLevel if present and recompute isWater consistently
  if (Array.isArray(world.cells)) {
    for (const c of world.cells) {
      if (c && typeof c === "object" && "seaLevel" in c) {
        delete c.seaLevel;
      }
      // Recompute water from canonical height fields if they exist
      const base = Number.isFinite(c.baseHeight) ? c.baseHeight : 0;
      const edit = Number.isFinite(c.editHeightDelta) ? c.editHeightDelta : 0;
      const sim = Number.isFinite(c.simHeightDelta) ? c.simHeightDelta : 0;
      const h = base + edit + sim;
      c.isWater = h < world.seaLevel;
    }
  }

  return world as WorldBrain;
}

/* -------------------------------------------------------
   Public API
------------------------------------------------------- */

export async function listWorldSummaries(): Promise<WorldSummary[]> {
  const ids = readIndex();
  const summaries: WorldSummary[] = [];

  for (const id of ids) {
    const w = await getWorld(id);
    if (!w) continue;
    summaries.push({
      id: w.metadata.id,
      name: w.metadata.name,
      seed: w.metadata.seed,
      updatedAt: w.metadata.updatedAt,
      createdAt: w.metadata.createdAt,
      version: w.metadata.version,
      styleMode: w.metadata.styleMode,
    });
  }

  // Newest first
  summaries.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  return summaries;
}

export async function getWorld(id: string): Promise<WorldBrain | null> {
  if (!id) return null;

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(id);

    req.onsuccess = () => {
      const raw = req.result;
      if (!raw) {
        resolve(null);
        return;
      }
      try {
        const normalized = normalizeWorldInPlace(structuredClone(raw));
        resolve(normalized);
      } catch (e) {
        // If normalization fails, still return raw (better than hard crash)
        resolve(raw as WorldBrain);
      }
    };

    req.onerror = () => reject(req.error);
  });
}

export async function saveWorld(world: WorldBrain): Promise<string> {
  if (!world) throw new Error("saveWorld: world is required.");

  const w = normalizeWorldInPlace(structuredClone(world));
  w.metadata.updatedAt = nowISO();

  await withStore<void>("readwrite", (store) => {
    const req = store.put(w);
    req.onsuccess = () => {
      // @ts-ignore
      (store.transaction as any).__setResult?.(undefined);
    };
  });

  addToIndex(w.metadata.id);
  return w.metadata.id;
}

export async function deleteWorld(id: string): Promise<void> {
  if (!id) return;

  await withStore<void>("readwrite", (store) => {
    store.delete(id);
  });

  removeFromIndex(id);
}

/**
 * Optional legacy migration hook: if you previously stored JSON worlds in localStorage,
 * you can import them once into IndexedDB.
 *
 * This is safe no-op if nothing is present.
 */
export async function migrateLegacyLocalStorageWorlds(legacyKey = "worldwright_worlds"): Promise<number> {
  let raw: any = null;

  try {
    const s = localStorage.getItem(legacyKey);
    if (!s) return 0;
    raw = JSON.parse(s);
  } catch {
    return 0;
  }

  if (!raw || typeof raw !== "object") return 0;

  let count = 0;
  const worlds: any[] = Array.isArray(raw) ? raw : Object.values(raw);

  for (const candidate of worlds) {
    try {
      const normalized = normalizeWorldInPlace(candidate);
      await saveWorld(normalized);
      count++;
    } catch {
      // skip bad legacy world
    }
  }

  // Optionally clear legacy key after successful migration
  try {
    localStorage.removeItem(legacyKey);
  } catch {
    // ignore
  }

  return count;
}