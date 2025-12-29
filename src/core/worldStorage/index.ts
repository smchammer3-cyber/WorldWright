/**
 * WORLDWRIGHT CORE: World Storage (IndexedDB-backed)
 * --------------------------------------------------
 * - Local-first persistence without localStorage quota problems.
 * - Stores full WorldBrain snapshots in IndexedDB.
 * - Keeps a lightweight index + summaries in localStorage for fast HomeScreen listing.
 */

import type { WorldBrain } from "../worldSchema";

export type WorldSummary = {
  id: string;
  name: string;
  updatedAtMs: number;
  createdAtMs: number;
  width: number;
  height: number;
  seed?: string;
};

type StorageIndex = {
  version: 3;
  ids: string[];
  summaries: Record<string, WorldSummary>;
};

const INDEX_KEY = "worldwright.v3.index";

// Legacy localStorage keys we may want to migrate away from (best-effort).
const LEGACY_PREFIXES = ["worldwright.v1.", "worldwright.v2.", "worldwright.v3.world."];

const DB_NAME = "worldwright";
const DB_VERSION = 1;
const WORLDS_STORE = "worlds";

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

function loadIndex(): StorageIndex {
  const parsed = safeJsonParse<StorageIndex>(localStorage.getItem(INDEX_KEY));
  if (!parsed || parsed.version !== 3 || !Array.isArray(parsed.ids) || typeof parsed.summaries !== "object") {
    return { version: 3, ids: [], summaries: {} };
  }

  const seen = new Set<string>();
  const ids = parsed.ids.filter((id) => typeof id === "string" && id.length > 0 && !seen.has(id) && (seen.add(id), true));
  const summaries = parsed.summaries ?? {};
  return { version: 3, ids, summaries };
}

function saveIndex(index: StorageIndex): void {
  localStorage.setItem(INDEX_KEY, JSON.stringify(index));
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
    // seed is stored as string in the schema
    world.metadata.seed = String((world.parameters as any)?.seed ?? Math.floor(Math.random() * 1e9));
  }
  if (!world.metadata.createdAt || typeof world.metadata.createdAt !== "string") {
    world.metadata.createdAt = tIso;
  }
  world.metadata.updatedAt = tIso;

  // schemaVersion may exist already; keep if present.
  if (!world.metadata.schemaVersion || typeof world.metadata.schemaVersion !== "string") {
    world.metadata.schemaVersion = "v3";
  }
}

function makeSummary(world: WorldBrain): WorldSummary {
  const createdAtMs = world.metadata?.createdAt ? Date.parse(world.metadata.createdAt) : nowMs();
  const updatedAtMs = world.metadata?.updatedAt ? Date.parse(world.metadata.updatedAt) : nowMs();

  return {
    id: world.metadata.id,
    name: world.metadata.name,
    createdAtMs: Number.isFinite(createdAtMs) ? createdAtMs : nowMs(),
    updatedAtMs: Number.isFinite(updatedAtMs) ? updatedAtMs : nowMs(),
    width: Number(world.gridWidth ?? 0),
    height: Number(world.gridHeight ?? 0),
    seed: world.metadata.seed,
  };
}

function openDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(WORLDS_STORE)) {
        db.createObjectStore(WORLDS_STORE);
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

  return dbPromise;
}

async function idbGet<T>(key: string): Promise<T | null> {
  const db = await openDb();
  return await new Promise<T | null>((resolve, reject) => {
    const tx = db.transaction(WORLDS_STORE, "readonly");
    const store = tx.objectStore(WORLDS_STORE);
    const req = store.get(key);
    req.onsuccess = () => resolve((req.result as T) ?? null);
    req.onerror = () => reject(req.error);
  });
}

async function idbSet<T>(key: string, value: T): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(WORLDS_STORE, "readwrite");
    const store = tx.objectStore(WORLDS_STORE);
    const req = store.put(value as any, key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

async function idbDel(key: string): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(WORLDS_STORE, "readwrite");
    const store = tx.objectStore(WORLDS_STORE);
    const req = store.delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

/**
 * Public API
 */

export function listWorldSummaries(): WorldSummary[] {
  const index = loadIndex();
  return index.ids
    .map((id) => index.summaries[id])
    .filter((s): s is WorldSummary => !!s)
    .sort((a, b) => b.updatedAtMs - a.updatedAtMs);
}

export async function getWorld(id: string): Promise<WorldBrain | null> {
  if (!id) return null;
  return await idbGet<WorldBrain>(id);
}

export async function saveWorld(world: WorldBrain): Promise<string> {
  ensureWorldMetadata(world);
  const id = world.metadata.id;

  await idbSet(id, world);

  const index = loadIndex();
  const summary = makeSummary(world);

  index.summaries[id] = summary;
  index.ids = [id, ...index.ids.filter((x) => x !== id)];

  saveIndex(index);
  return id;
}

export async function deleteWorld(id: string): Promise<void> {
  if (!id) return;
  await idbDel(id);
  const index = loadIndex();
  index.ids = index.ids.filter((x) => x !== id);
  delete index.summaries[id];
  saveIndex(index);
}

/**
 * Migration / cleanup:
 * - Best-effort migration of any older localStorage world blobs into IndexedDB
 * - Deletes migrated blobs to free localStorage quota.
 */
export async function restoreFromLocalStorage(): Promise<void> {
  // Ensure index exists
  saveIndex(loadIndex());

  try {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k) keys.push(k);
    }

    const legacyKeys = keys.filter((k) => LEGACY_PREFIXES.some((p) => k.startsWith(p)));
    for (const k of legacyKeys) {
      const raw = localStorage.getItem(k);
      if (!raw) continue;

      const maybeWorld = safeJsonParse<any>(raw);
      if (!maybeWorld?.metadata?.id || typeof maybeWorld?.metadata?.id !== "string") continue;

      // Migrate
      const id = String(maybeWorld.metadata.id);
      await idbSet(id, maybeWorld as WorldBrain);

      // Add to index
      const idx = loadIndex();
      const createdAtMs = maybeWorld.metadata?.createdAt ? Date.parse(maybeWorld.metadata.createdAt) : nowMs();
      const updatedAtMs = maybeWorld.metadata?.updatedAt ? Date.parse(maybeWorld.metadata.updatedAt) : nowMs();

      idx.summaries[id] = {
        id,
        name: String(maybeWorld.metadata?.name ?? "Untitled World"),
        createdAtMs: Number.isFinite(createdAtMs) ? createdAtMs : nowMs(),
        updatedAtMs: Number.isFinite(updatedAtMs) ? updatedAtMs : nowMs(),
        width: Number(maybeWorld.gridWidth ?? 0),
        height: Number(maybeWorld.gridHeight ?? 0),
        seed: maybeWorld.metadata?.seed,
      };
      idx.ids = [id, ...idx.ids.filter((x) => x !== id)];
      saveIndex(idx);

      // Free quota
      localStorage.removeItem(k);
    }
  } catch {
    // Never crash app due to migration.
  }
}