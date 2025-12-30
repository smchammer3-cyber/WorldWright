// ========================================================
// JARVIS CHANGE HEADER -- WORLD STORAGE IDB FALLBACK + CLEAR ERRORS
// File: src/core/worldStorage/index.ts
//
// Fixes:
// - Detect IndexedDB unavailability and fall back to localStorage for full snapshots.
// - Keep summaries index in localStorage (existing behavior).
// - Make save/load/delete resilient in embedded preview environments.
//
// Notes:
// - This fallback is intentionally minimal; it prevents "Save does nothing".
// - Large worlds may exceed localStorage quota; we surface errors rather than failing silently.
// ========================================================

import type { WorldBrain } from "../worldSchema";
import { recomputeWorld } from "../worldRecompute";

export type WorldSummary = {
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
const STORE_WORLDS = "worlds";

const LS_SUMMARIES_KEY = "worldwright_world_summaries_v1";
const LS_WORLD_PREFIX = "worldwright_world_snapshot_v3:";

const IDB_AVAILABLE = typeof indexedDB !== "undefined";

type StoredWorld = { id: string; world: WorldBrain };

let dbPromise: Promise<IDBDatabase> | null = null;

function nowIso() {
  return new Date().toISOString();
}

function safeJsonParse<T>(s: string | null): T | null {
  if (!s) return null;
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

function readSummaries(): WorldSummary[] {
  const rows = safeJsonParse<WorldSummary[]>(localStorage.getItem(LS_SUMMARIES_KEY));
  return Array.isArray(rows) ? rows : [];
}

function writeSummaries(rows: WorldSummary[]) {
  localStorage.setItem(LS_SUMMARIES_KEY, JSON.stringify(rows));
}

function upsertSummaryFromWorld(w: WorldBrain): WorldSummary {
  const id = w.metadata.id;
  const updatedAt = nowIso();
  const createdAt = w.metadata.createdAt || updatedAt;
  const styleMode = (w.metadata as any)?.styleMode ?? "EARTHLIKE";
  return {
    id,
    name: w.metadata.name || "Untitled World",
    seed: w.metadata.seed || "",
    updatedAt,
    createdAt,
    version: w.metadata.schemaVersion || "v3",
    styleMode,
  };
}

function snapshotKey(id: string) {
  return `${LS_WORLD_PREFIX}${id}`;
}

async function ensureDb(): Promise<IDBDatabase> {
  if (!IDB_AVAILABLE) {
    throw new Error("IndexedDB is not available in this environment.");
  }
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
    req.onerror = () => reject(req.error ?? new Error("IndexedDB open failed"));
  });

  return dbPromise;
}

async function idbPutWorld(id: string, world: WorldBrain): Promise<void> {
  const db = await ensureDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_WORLDS, "readwrite");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("IndexedDB transaction failed"));

    const store = tx.objectStore(STORE_WORLDS);
    store.put({ id, world } satisfies StoredWorld);
  });
}

async function idbGetWorld(id: string): Promise<WorldBrain | null> {
  const db = await ensureDb();
  return await new Promise<WorldBrain | null>((resolve, reject) => {
    const tx = db.transaction(STORE_WORLDS, "readonly");
    tx.onerror = () => reject(tx.error ?? new Error("IndexedDB transaction failed"));

    const store = tx.objectStore(STORE_WORLDS);
    const req = store.get(id);
    req.onsuccess = () => {
      const row = req.result as StoredWorld | undefined;
      resolve(row?.world ?? null);
    };
    req.onerror = () => reject(req.error ?? new Error("IndexedDB get failed"));
  });
}

async function idbDeleteWorld(id: string): Promise<void> {
  const db = await ensureDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_WORLDS, "readwrite");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("IndexedDB transaction failed"));

    const store = tx.objectStore(STORE_WORLDS);
    store.delete(id);
  });
}

// -----------------------------
// Schema normalization (minimal)
// -----------------------------
function normalizeWorldToV3(w: WorldBrain): WorldBrain {
  // Ensure required metadata fields exist.
  if (!w.metadata) (w as any).metadata = {};
  if (!w.metadata.id) (w.metadata as any).id = crypto.randomUUID?.() ?? String(Math.random());
  if (!w.metadata.name) (w.metadata as any).name = "Untitled World";
  if (!w.metadata.seed) (w.metadata as any).seed = String((w.metadata as any).seed ?? "");
  if (!w.metadata.schemaVersion) (w.metadata as any).schemaVersion = "v3";
  if (!w.metadata.createdAt) (w.metadata as any).createdAt = nowIso();
  if (!w.metadata.updatedAt) (w.metadata as any).updatedAt = nowIso();

  // Mirror global seaLevel to metadata for storage/compat
  if ((w as any).seaLevel != null) {
    (w.metadata as any).seaLevel = (w as any).seaLevel;
  } else if ((w.metadata as any).seaLevel != null) {
    (w as any).seaLevel = (w.metadata as any).seaLevel;
  }

  // Recompute derived fields
  try {
    recomputeWorld(w, ["LOAD"]);
  } catch {
    // Keep load resilient; validator/recompute can be tightened later.
  }
  return w;
}

// -----------------------------
// Public API
// -----------------------------
export async function listWorldSummaries(): Promise<WorldSummary[]> {
  return readSummaries().sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));
}

export async function getWorldById(id: string): Promise<WorldBrain | null> {
  // Try IndexedDB first
  try {
    const w = await idbGetWorld(id);
    if (w) return normalizeWorldToV3(w);
  } catch (e) {
    console.error("worldStorage.getWorldById (idb) failed:", e);
  }

  // Fallback: localStorage snapshot
  const raw = localStorage.getItem(snapshotKey(id));
  const parsed = safeJsonParse<WorldBrain>(raw);
  if (parsed) return normalizeWorldToV3(parsed);
  return null;
}

export async function saveWorld(world: WorldBrain): Promise<WorldBrain> {
  const w = normalizeWorldToV3(structuredClone(world) as WorldBrain);

  // Ensure metadata timestamps
  const updatedAt = nowIso();
  (w.metadata as any).updatedAt = updatedAt;
  if (!(w.metadata as any).createdAt) (w.metadata as any).createdAt = updatedAt;

  // Ensure ID
  if (!w.metadata.id) {
    (w.metadata as any).id = crypto.randomUUID?.() ?? String(Math.random());
  }

  // Keep summaries index in localStorage
  const summary = upsertSummaryFromWorld(w);
  const rows = readSummaries();
  const next = rows.filter((r) => r.id !== summary.id);
  next.unshift(summary);
  writeSummaries(next);

  // Primary: IndexedDB
  try {
    await idbPutWorld(w.metadata.id, w);
    return w;
  } catch (e) {
    console.error("worldStorage.saveWorld (idb) failed, falling back to localStorage:", e);
  }

  // Fallback: localStorage snapshot
  try {
    localStorage.setItem(snapshotKey(w.metadata.id), JSON.stringify(w));
    return w;
  } catch (e) {
    console.error("worldStorage.saveWorld (localStorage fallback) failed:", e);
    // Surface a real error so UI can show it.
    throw new Error(
      "Save failed: storage unavailable (IndexedDB blocked and localStorage quota/availability prevented fallback)."
    );
  }
}

export async function deleteWorld(id: string): Promise<void> {
  // Update summaries first
  const rows = readSummaries();
  writeSummaries(rows.filter((r) => r.id !== id));

  // Try IDB
  try {
    await idbDeleteWorld(id);
  } catch (e) {
    console.error("worldStorage.deleteWorld (idb) failed:", e);
  }

  // Always remove fallback snapshot
  try {
    localStorage.removeItem(snapshotKey(id));
  } catch (e) {
    console.error("worldStorage.deleteWorld (localStorage) failed:", e);
  }
}

// Legacy migration: previously stored full worlds in localStorage. Keep as a no-op safe pass.
export async function migrateLegacyLocalStorageWorlds(): Promise<void> {
  // If future legacy keys exist, this is where we would import them into summaries + IDB.
  return;
}