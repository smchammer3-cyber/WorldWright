/**
 * WORLDWRIGHT CORE: World Storage (IndexedDB-backed)
 * --------------------------------------------------
 * - Local-first persistence without localStorage quota problems.
 * - Stores full WorldBrain snapshots in IndexedDB.
 * - Keeps a lightweight index + summaries in localStorage for fast HomeScreen listing.
 *
 * Contract guardrail:
 * - normalizeWorldToV3() runs on load and before save.
 */

import type { WorldBrain } from "../worldSchema";
import { recomputeWorld } from "../worldRecompute";

export type WorldSummary = {
  id: string;
  name: string;
  updatedAtMs: number;
  createdAtMs: number;
  width: number;
  height: number;
};

const DB_NAME = "worldwright_db";
const DB_VERSION = 1;
const STORE_WORLDS = "worlds";

const LS_INDEX_KEY = "worldwright_world_index_v1";

let dbPromise: Promise<IDBDatabase> | null = null;

function nowIso(): string {
  return new Date().toISOString();
}

function nowMs(): number {
  return Date.now();
}

function safeJsonParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function getDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_WORLDS)) {
        db.createObjectStore(STORE_WORLDS, { keyPath: "id" });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

  return dbPromise;
}

function ensureWorldMetadata(world: WorldBrain): void {
  const tIso = nowIso();

  world.metadata = world.metadata ?? ({} as any);

  if (!world.metadata.id || typeof world.metadata.id !== "string") {
    world.metadata.id = `w_${Date.now()}_${Math.floor(Math.random() * 1e9)}`;
  }
  if (!world.metadata.name || typeof world.metadata.name !== "string") {
    world.metadata.name = "Untitled World";
  }
  if (!world.metadata.seed || typeof world.metadata.seed !== "string") {
    world.metadata.seed = String((world.parameters as any)?.seed ?? Math.floor(Math.random() * 1e9));
  }
  if (!world.metadata.createdAt || typeof world.metadata.createdAt !== "string") {
    world.metadata.createdAt = tIso;
  }
  world.metadata.updatedAt = tIso;

  if (!world.metadata.schemaVersion || typeof world.metadata.schemaVersion !== "string") {
    world.metadata.schemaVersion = "v3";
  }

  // Mirror global seaLevel into metadata for compatibility
  if (typeof (world as any).seaLevel === "number") {
    world.metadata.seaLevel = (world as any).seaLevel;
  }
}

function normalizeWorldToV3(world: any): WorldBrain {
  // 1) Ensure global seaLevel exists:
  // - Prefer world.seaLevel
  // - Else fallback metadata.seaLevel
  // - Else fallback legacy cell.seaLevel
  let seaLevel: number | null = null;

  if (typeof world.seaLevel === "number") seaLevel = world.seaLevel;
  if (seaLevel == null && typeof world.metadata?.seaLevel === "number") seaLevel = world.metadata.seaLevel;

  if (seaLevel == null && Array.isArray(world.cells) && world.cells.length > 0) {
    const c0 = world.cells[0];
    if (c0 && typeof c0.seaLevel === "number") seaLevel = c0.seaLevel;
  }

  if (seaLevel == null) seaLevel = 0.0;

  world.seaLevel = seaLevel;

  // 2) Remove legacy per-cell seaLevel if present
  if (Array.isArray(world.cells)) {
    for (const cell of world.cells) {
      if (cell && "seaLevel" in cell) {
        delete cell.seaLevel;
      }
    }
  }

  // 3) Mirror metadata fields
  world.metadata = world.metadata ?? {};
  world.metadata.seaLevel = seaLevel;

  // 4) Recompute derived fields so renderer/editor are consistent
  try {
    recomputeWorld(world as WorldBrain, ["LOADED"]);
  } catch {
    // non-fatal; keep going
  }

  return world as WorldBrain;
}

function makeSummary(world: WorldBrain): WorldSummary {
  const createdAtMs = world.metadata?.createdAt ? Date.parse(world.metadata.createdAt) : nowMs();
  const updatedAtMs = world.metadata?.updatedAt ? Date.parse(world.metadata.updatedAt) : nowMs();

  return {
    id: world.metadata.id,
    name: world.metadata.name,
    createdAtMs: Number.isFinite(createdAtMs) ? createdAtMs : nowMs(),
    updatedAtMs: Number.isFinite(updatedAtMs) ? updatedAtMs : nowMs(),
    width: world.gridWidth,
    height: world.gridHeight,
  };
}

function readIndex(): WorldSummary[] {
  const raw = localStorage.getItem(LS_INDEX_KEY);
  const parsed = safeJsonParse<WorldSummary[]>(raw);
  return Array.isArray(parsed) ? parsed : [];
}

function writeIndex(items: WorldSummary[]): void {
  localStorage.setItem(LS_INDEX_KEY, JSON.stringify(items));
}

export async function listWorldSummaries(): Promise<WorldSummary[]> {
  const items = readIndex();
  return items.sort((a, b) => b.updatedAtMs - a.updatedAtMs);
}

export async function getWorldById(id: string): Promise<WorldBrain | null> {
  const db = await getDb();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_WORLDS, "readonly");
    const store = tx.objectStore(STORE_WORLDS);
    const req = store.get(id);

    req.onsuccess = () => {
      const row = req.result as any;
      if (!row?.world) return resolve(null);
      const w = normalizeWorldToV3(row.world);
      return resolve(w);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function saveWorld(worldIn: WorldBrain): Promise<WorldBrain> {
  // Normalize + ensure metadata before saving
  const world = normalizeWorldToV3(worldIn as any);
  ensureWorldMetadata(world);

  const summary = makeSummary(world);

  const db = await getDb();

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_WORLDS, "readwrite");
    const store = tx.objectStore(STORE_WORLDS);

    const req = store.put({
      id: world.metadata.id,
      world,
    });

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });

  // Update index
  const index = readIndex();
  const next = index.filter(x => x.id !== summary.id);
  next.unshift(summary);
  writeIndex(next);

  return world;
}

export async function deleteWorld(id: string): Promise<void> {
  const db = await getDb();

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_WORLDS, "readwrite");
    const store = tx.objectStore(STORE_WORLDS);

    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });

  const index = readIndex().filter(x => x.id !== id);
  writeIndex(index);
}

// Legacy localStorage migration (kept, but normalized)
export async function migrateLegacyLocalStorageWorlds(): Promise<number> {
  const keyPrefix = "worldwright_world_";
  let migrated = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k || !k.startsWith(keyPrefix)) continue;

    const raw = localStorage.getItem(k);
    const parsed = safeJsonParse<any>(raw);
    if (!parsed) continue;

    const world = normalizeWorldToV3(parsed);
    await saveWorld(world);
    localStorage.removeItem(k);
    migrated++;
  }

  return migrated;
}