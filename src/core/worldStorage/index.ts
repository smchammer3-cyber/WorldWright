// ========================================================
// WORLDWRIGHT -- WORLD STORAGE (IndexedDB, V1.3)
// File: src/core/worldStorage/index.ts
//
// - Local-first persistence.
// - Normalizes metadata to V1.3 (metadata.version).
// - Ensures global world.seaLevel exists.
// - Migrates legacy worlds that stored seaLevel per-cell or in metadata.
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
  try {
    // @ts-ignore
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      // @ts-ignore
      return crypto.randomUUID();
    }
  } catch {}
  return "ww_" + Math.floor(Math.random() * 1e15).toString(16);
}

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
  } catch {}
}

function addToIndex(id: string) {
  const ids = readIndex();
  if (!ids.includes(id)) {
    ids.unshift(id);
    writeIndex(ids);
  }
}

function removeFromIndex(id: string) {
  writeIndex(readIndex().filter((x) => x !== id));
}

function normalizeWorldInPlace(raw: any): WorldBrain {
  if (!raw || typeof raw !== "object") throw new Error("Invalid world");

  if (!raw.metadata || typeof raw.metadata !== "object") raw.metadata = {};

  if (typeof raw.metadata.id !== "string" || !raw.metadata.id) raw.metadata.id = safeUUID();
  if (typeof raw.metadata.name !== "string" || !raw.metadata.name) raw.metadata.name = "World";
  if (typeof raw.metadata.seed !== "string" || !raw.metadata.seed) raw.metadata.seed = String(raw.seed ?? Math.floor(Math.random() * 1e9));

  // Force V1.3 metadata.version
  raw.metadata.version = "1.3";

  if (typeof raw.metadata.styleMode !== "string" || !raw.metadata.styleMode) raw.metadata.styleMode = "EARTHLIKE";

  // Grid
  if (!Number.isFinite(raw.gridWidth) || !Number.isFinite(raw.gridHeight)) {
    const n = Array.isArray(raw.cells) ? raw.cells.length : 0;
    const side = n > 0 ? Math.round(Math.sqrt(n)) : 128;
    raw.gridWidth = side;
    raw.gridHeight = side;
  }
  raw.metadata.gridWidth = raw.gridWidth;
  raw.metadata.gridHeight = raw.gridHeight;

  if (typeof raw.metadata.createdAt !== "string" || !raw.metadata.createdAt) raw.metadata.createdAt = nowISO();
  if (typeof raw.metadata.updatedAt !== "string" || !raw.metadata.updatedAt) raw.metadata.updatedAt = nowISO();

  // Sea level migration:
  let sea = Number.isFinite(raw.seaLevel) ? raw.seaLevel : null;

  if (!Number.isFinite(sea) && Number.isFinite(raw.metadata?.seaLevel)) sea = raw.metadata.seaLevel;

  if (!Number.isFinite(sea) && Array.isArray(raw.cells) && raw.cells.length > 0) {
    const c0 = raw.cells[0];
    if (Number.isFinite(c0?.seaLevel)) sea = c0.seaLevel;
  }

  if (!Number.isFinite(sea)) sea = 0.3;
  raw.seaLevel = sea;

  if (raw.metadata && "seaLevel" in raw.metadata) delete raw.metadata.seaLevel;

  // Remove per-cell seaLevel and recompute isWater
  if (Array.isArray(raw.cells)) {
    for (const c of raw.cells) {
      if (!c || typeof c !== "object") continue;
      if ("seaLevel" in c) delete c.seaLevel;

      const base = Number.isFinite(c.baseHeight) ? c.baseHeight : 0;
      const edit = Number.isFinite(c.editHeightDelta) ? c.editHeightDelta : 0;
      const sim = Number.isFinite(c.simHeightDelta) ? c.simHeightDelta : 0;
      const h = base + edit + sim;
      c.isWater = h < raw.seaLevel;
    }
  }

  // Ensure arrays exist
  if (!Array.isArray(raw.plates)) raw.plates = [];
  if (!Array.isArray(raw.rivers)) raw.rivers = [];
  if (!Array.isArray(raw.countries)) raw.countries = [];
  if (!Array.isArray(raw.cultures)) raw.cultures = [];
  if (!Array.isArray(raw.cultureRegions)) raw.cultureRegions = [];
  if (!Array.isArray(raw.cities)) raw.cities = [];
  if (!Array.isArray(raw.locations)) raw.locations = [];
  if (!Array.isArray(raw.stickers)) raw.stickers = [];

  return raw as WorldBrain;
}

export async function listWorldSummaries(): Promise<WorldSummary[]> {
  const ids = readIndex();
  const out: WorldSummary[] = [];

  for (const id of ids) {
    const w = await getWorld(id);
    if (!w) continue;
    out.push({
      id: w.metadata.id,
      name: w.metadata.name,
      seed: w.metadata.seed,
      updatedAt: w.metadata.updatedAt,
      createdAt: w.metadata.createdAt,
      version: w.metadata.version,
      styleMode: w.metadata.styleMode,
    });
  }

  out.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  return out;
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
        resolve(normalizeWorldInPlace(structuredClone(raw)));
      } catch {
        resolve(raw as WorldBrain);
      }
    };
    req.onerror = () => reject(req.error);
  });
}

export async function saveWorld(world: WorldBrain): Promise<string> {
  const db = await openDB();
  const w = normalizeWorldInPlace(structuredClone(world));
  w.metadata.updatedAt = nowISO();

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(w);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });

  addToIndex(w.metadata.id);
  return w.metadata.id;
}

export async function deleteWorld(id: string): Promise<void> {
  if (!id) return;
  const db = await openDB();

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });

  removeFromIndex(id);
}