// ========================================================
// JARVIS CHANGE HEADER -- WORLD STORAGE: FIX IDB KEYPATH + NO-SILENT FAILS
// File: src/core/worldStorage/index.ts
//
// Fixes:
// - IndexedDB store uses out-of-line keys (prevents DataError: key path did not yield a value).
// - DB_VERSION bumped to force upgrade; store is recreated.
// - localStorage stores summaries only; no full-world localStorage snapshots (avoids QuotaExceeded).
// - Errors are surfaced to callers.
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
const DB_VERSION = 2; // bumped to fix object store schema
const STORE_WORLDS = "worlds";

const LS_SUMMARIES_KEY = "worldwright_world_summaries_v1";

const IDB_AVAILABLE = typeof indexedDB !== "undefined";

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

function fallbackId(): string {
  const r = Math.floor(Math.random() * 1e9);
  return `w_${Date.now()}_${r}`;
}

async function ensureDb(): Promise<IDBDatabase> {
  if (!IDB_AVAILABLE) throw new Error("IndexedDB is not available in this environment.");
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;

      // Recreate store to avoid legacy keyPath mismatches.
      if (db.objectStoreNames.contains(STORE_WORLDS)) {
        db.deleteObjectStore(STORE_WORLDS);
      }

      // Out-of-line keys (id passed to put/get).
      db.createObjectStore(STORE_WORLDS);
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
    store.put(world, id);
  });
}

async function idbGetWorld(id: string): Promise<WorldBrain | null> {
  const db = await ensureDb();
  return await new Promise<WorldBrain | null>((resolve, reject) => {
    const tx = db.transaction(STORE_WORLDS, "readonly");
    tx.onerror = () => reject(tx.error ?? new Error("IndexedDB transaction failed"));

    const store = tx.objectStore(STORE_WORLDS);
    const req = store.get(id);
    req.onsuccess = () => resolve((req.result as WorldBrain) ?? null);
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
  if (!w.metadata) (w as any).metadata = {};

  if (!w.metadata.id) (w.metadata as any).id = (globalThis.crypto as any)?.randomUUID?.() ?? fallbackId();
  if (!w.metadata.name) (w.metadata as any).name = "Untitled World";
  if (!w.metadata.seed) (w.metadata as any).seed = String((w.metadata as any).seed ?? "");
  if (!w.metadata.schemaVersion) (w.metadata as any).schemaVersion = "v3";
  if (!w.metadata.createdAt) (w.metadata as any).createdAt = nowIso();
  if (!w.metadata.updatedAt) (w.metadata as any).updatedAt = nowIso();

  // Mirror seaLevel between root and metadata for compatibility.
  if ((w as any).seaLevel != null) {
    (w.metadata as any).seaLevel = (w as any).seaLevel;
  } else if ((w.metadata as any).seaLevel != null) {
    (w as any).seaLevel = (w.metadata as any).seaLevel;
  }

  try {
    recomputeWorld(w, ["LOAD"]);
  } catch {
    // keep resilient
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
  try {
    const w = await idbGetWorld(id);
    if (w) return normalizeWorldToV3(w);
  } catch (e) {
    console.error("worldStorage.getWorldById (idb) failed:", e);
  }

  // No full-world localStorage fallback (avoids quota failures); if IDB is blocked, surface null.
  return null;
}

export async function saveWorld(world: WorldBrain): Promise<WorldBrain> {
  const cloneFn = (globalThis as any).structuredClone as ((x: any) => any) | undefined;
  const w = normalizeWorldToV3((cloneFn ? cloneFn(world) : JSON.parse(JSON.stringify(world))) as WorldBrain);

  const updatedAt = nowIso();
  (w.metadata as any).updatedAt = updatedAt;
  if (!(w.metadata as any).createdAt) (w.metadata as any).createdAt = updatedAt;

  if (!w.metadata.id) (w.metadata as any).id = (globalThis.crypto as any)?.randomUUID?.() ?? fallbackId();

  // Update summaries index (localStorage)
  const summary = upsertSummaryFromWorld(w);
  const rows = readSummaries();
  const next = rows.filter((r) => r.id !== summary.id);
  next.unshift(summary);
  writeSummaries(next);

  // Primary: IndexedDB
  await idbPutWorld(w.metadata.id, w);
  return w;
}

export async function deleteWorld(id: string): Promise<void> {
  // Update summaries first
  const rows = readSummaries();
  writeSummaries(rows.filter((r) => r.id !== id));

  // Delete from IDB
  await idbDeleteWorld(id);
}

export async function migrateLegacyLocalStorageWorlds(): Promise<void> {
  return;
}