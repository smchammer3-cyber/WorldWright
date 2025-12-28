// ========================================================
// WORLD STORAGE -- V1.3 SPINE (WORLDBRAIN)
// Jarvis Change: Phase 1.2 -- schema-aware persistence + world management
//
// Responsibilities:
// - Persist WorldBrain objects to localStorage (local-first).
// - Maintain a small index for fast Home screen listing.
// - Provide core API:
//   • restoreFromLocalStorage()
//   • listWorlds(), listWorldSummaries()
//   • getWorld(id)
//   • saveWorld(world)
//   • deleteWorld(id)
//   • duplicateWorld(id)
//   • renameWorld(id, name)
//
// Notes:
// - This module is the single authority for persistence.
// - It does not do rendering or UI.
// - It preserves world.metadata fields and updates updatedAt on save.
// ========================================================

import { WorldBrain } from '../worldSchema'

// ---------- Types ----------

export interface WorldSummary {
  id: string
  name: string
  updatedAt: string
}

// ---------- Storage Keys ----------

const STORAGE_VERSION = 'v3'
const INDEX_KEY = `worldwright.${STORAGE_VERSION}.world_index`
const WORLD_KEY_PREFIX = `worldwright.${STORAGE_VERSION}.world.`

// Optional: legacy key (read-only / best-effort migration hook)
const LEGACY_INDEX_KEY = `worldwright.v2.worlds`

// ---------- Serialization ----------

export function serializeWorld(world: WorldBrain): string {
  return JSON.stringify(world)
}

export function deserializeWorld(json: string): WorldBrain {
  return JSON.parse(json) as WorldBrain
}

export function exportWorld(world: WorldBrain): string {
  // For now, export is just JSON. Later: manifests, engine profiles, chunked exports.
  return serializeWorld(world)
}

// ---------- Internal Helpers ----------

function nowIso(): string {
  return new Date().toISOString()
}

function safeParseJson<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function readIndex(): WorldSummary[] {
  const raw = localStorage.getItem(INDEX_KEY)
  const idx = safeParseJson<WorldSummary[]>(raw, [])
  // sanitize minimal shape
  return Array.isArray(idx)
    ? idx.filter(
        x =>
          x &&
          typeof x.id === 'string' &&
          typeof x.name === 'string' &&
          typeof x.updatedAt === 'string',
      )
    : []
}

function writeIndex(index: WorldSummary[]): void {
  localStorage.setItem(INDEX_KEY, JSON.stringify(index))
}

function worldKey(id: string): string {
  return `${WORLD_KEY_PREFIX}${id}`
}

function ensureWorldMetadata(world: WorldBrain): void {
  // WorldBrain (per schema) should always have metadata, but we guard anyway.
  const w: any = world as any
  if (!w.metadata) w.metadata = {}
  if (!w.metadata.id || typeof w.metadata.id !== 'string') {
    w.metadata.id = Math.random().toString(36).slice(2)
  }
  if (!w.metadata.name || typeof w.metadata.name !== 'string') {
    w.metadata.name = 'Untitled World'
  }
  if (!w.metadata.createdAt || typeof w.metadata.createdAt !== 'string') {
    w.metadata.createdAt = nowIso()
  }
  if (!w.metadata.updatedAt || typeof w.metadata.updatedAt !== 'string') {
    w.metadata.updatedAt = nowIso()
  }
  if (!w.metadata.version || typeof w.metadata.version !== 'string') {
    // schema/version tag for saves; keep it simple for now
    w.metadata.version = '1.3.0'
  }
}

function updateIndexEntry(id: string, name: string, updatedAt: string): void {
  const idx = readIndex()
  const existing = idx.find(w => w.id === id)
  if (existing) {
    existing.name = name
    existing.updatedAt = updatedAt
  } else {
    idx.push({ id, name, updatedAt })
  }
  // newest first
  idx.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
  writeIndex(idx)
}

function removeIndexEntry(id: string): void {
  const idx = readIndex().filter(w => w.id !== id)
  writeIndex(idx)
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T
}

// ---------- Public API ----------

/**
 * Called on app bootstrap.
 * Ensures index exists and is valid JSON.
 * Does NOT aggressively migrate legacy saves unless you choose to later.
 */
export function restoreFromLocalStorage(): void {
  // Ensure index is present and valid.
  const idx = readIndex()
  writeIndex(idx)

  // If you want an explicit migration later, you can implement a dedicated
  // migrateLegacyWorlds() function and call it from the UI with a user prompt.
  // For now, we intentionally avoid silent migration.
  //
  // Legacy presence detection (no-op):
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const legacyRaw = localStorage.getItem(LEGACY_INDEX_KEY)
}

/**
 * Home screen listing.
 * Returns lightweight summaries only.
 */
export function listWorldSummaries(): WorldSummary[] {
  return readIndex()
}

/**
 * Returns full WorldBrain objects (loads each from localStorage).
 * If a world is missing/corrupt, it is skipped (and index entry is pruned).
 */
export function listWorlds(): WorldBrain[] {
  const idx = readIndex()
  const out: WorldBrain[] = []
  const keep: WorldSummary[] = []

  for (const entry of idx) {
    const raw = localStorage.getItem(worldKey(entry.id))
    if (!raw) continue
    try {
      const w = deserializeWorld(raw)
      ensureWorldMetadata(w)
      out.push(w)
      keep.push(entry)
    } catch {
      // corrupt save: skip it
    }
  }

  // prune index if needed
  if (keep.length !== idx.length) writeIndex(keep)

  return out
}

/**
 * Load one world by id.
 */
export function getWorld(id: string): WorldBrain | undefined {
  const raw = localStorage.getItem(worldKey(id))
  if (!raw) return undefined
  try {
    const w = deserializeWorld(raw)
    ensureWorldMetadata(w)
    return w
  } catch {
    return undefined
  }
}

/**
 * Save a world.
 * Returns a summary-like result with the id for routing.
 *
 * NOTE: GenerateModeApp does `await saveWorld(world)`. Awaiting a non-Promise
 * is fine in JS/TS; it will still work.
 */
export function saveWorld(world: WorldBrain): WorldSummary {
  ensureWorldMetadata(world)
  world.metadata.updatedAt = nowIso()

  const id = world.metadata.id
  const name = world.metadata.name
  const updatedAt = world.metadata.updatedAt

  const json = serializeWorld(world)

  try {
    localStorage.setItem(worldKey(id), json)
    updateIndexEntry(id, name, updatedAt)
    return { id, name, updatedAt }
  } catch (err) {
    // Quota-safe behavior: do not throw; keep app usable.
    // Still return the id so navigation can proceed (world exists in-memory).
    console.warn('WorldStorage: failed to persist world (quota?)', err)
    return { id, name, updatedAt }
  }
}

/**
 * Delete a world by id.
 */
export function deleteWorld(id: string): void {
  localStorage.removeItem(worldKey(id))
  removeIndexEntry(id)
}

/**
 * Duplicate a world (roadmap requirement).
 * Creates a deep copy with a new id and updated timestamps.
 */
export function duplicateWorld(id: string): WorldSummary | undefined {
  const original = getWorld(id)
  if (!original) return undefined

  const copy = deepClone(original)
  ensureWorldMetadata(copy)

  copy.metadata.id = Math.random().toString(36).slice(2)
  copy.metadata.createdAt = nowIso()
  copy.metadata.updatedAt = copy.metadata.createdAt

  const baseName = (original.metadata?.name ?? 'World').trim()
  copy.metadata.name = `${baseName} Copy`

  return saveWorld(copy)
}

/**
 * Rename a world (roadmap requirement).
 */
export function renameWorld(id: string, name: string): WorldSummary | undefined {
  const w = getWorld(id)
  if (!w) return undefined

  ensureWorldMetadata(w)
  w.metadata.name = name.trim() || w.metadata.name
  w.metadata.updatedAt = nowIso()

  return saveWorld(w)
}