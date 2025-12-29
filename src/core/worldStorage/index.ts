// ========================================================
// JARVIS CHANGE HEADER -- STORAGE SPINE FIX (IndexedDB + Legacy Migration)
// File: src/core/worldStorage/index.ts
//
// Goals:
// - Canonical storage is IndexedDB (local-first, large capacity).
// - Preserve public API used by UI.
// - Provide real migration from legacy localStorage worlds -> IndexedDB.
// - Keep App.tsx call restoreFromLocalStorage() working "for real".
//
// Notes:
// - This module is a persistence boundary. UI should not touch localStorage.
// ========================================================

import { WorldBrain } from '../worldSchema'

export type WorldSummary = {
  id: string
  name: string
  createdAt: number
  updatedAt: number
  width?: number
  height?: number
}

const DB_NAME = 'worldwright-db'
const DB_VERSION = 1
const STORE_WORLDS = 'worlds'

// Migration guard key
const MIGRATION_DONE_KEY = 'worldwright.migration.localStorageToIndexedDb.v1.done'

function nowMs() {
  return Date.now()
}

function ensureWorldMetadata(world: WorldBrain): WorldBrain {
  const meta: any = (world as any).metadata ?? {}

  const createdAt = Number.isFinite(meta.createdAt) ? meta.createdAt : nowMs()
  const updatedAt = nowMs()
  const id =
    typeof meta.id === 'string' && meta.id.length > 0
      ? meta.id
      : `w_${createdAt}_${Math.floor(Math.random() * 1e9)}`
  const name = typeof meta.name === 'string' && meta.name.length > 0 ? meta.name : 'Untitled World'

  ;(world as any).metadata = {
    ...meta,
    id,
    name,
    createdAt,
    updatedAt,
  }

  return world
}

function worldToSummary(world: WorldBrain): WorldSummary {
  const meta: any = (world as any).metadata ?? {}
  return {
    id: String(meta.id ?? ''),
    name: String(meta.name ?? 'Untitled World'),
    createdAt: Number(meta.createdAt ?? 0),
    updatedAt: Number(meta.updatedAt ?? 0),
    width: Number.isFinite(meta.width) ? meta.width : undefined,
    height: Number.isFinite(meta.height) ? meta.height : undefined,
  }
}

// -------------------------------
// IndexedDB helpers
// -------------------------------

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)

    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE_WORLDS)) {
        db.createObjectStore(STORE_WORLDS, { keyPath: 'id' })
      }
    }

    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error ?? new Error('Failed to open IndexedDB'))
  })
}

async function withStore<T>(
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T> | void
): Promise<T | void> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_WORLDS, mode)
    const store = tx.objectStore(STORE_WORLDS)

    let request: IDBRequest<T> | void
    try {
      request = fn(store)
    } catch (e) {
      reject(e)
      return
    }

    tx.oncomplete = () => resolve(undefined)
    tx.onerror = () => reject(tx.error ?? new Error('IndexedDB transaction failed'))
    tx.onabort = () => reject(tx.error ?? new Error('IndexedDB transaction aborted'))

    if (request) {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed'))
    }
  })
}

// Store record shape
type WorldRecord = {
  id: string
  summary: WorldSummary
  world: WorldBrain
}

async function putRecord(rec: WorldRecord): Promise<void> {
  await withStore('readwrite', (store) => store.put(rec))
}

// -------------------------------
// Public API (canonical)
// -------------------------------

export async function saveWorld(world: WorldBrain): Promise<{ id: string }> {
  const w = ensureWorldMetadata(world)
  const summary = worldToSummary(w)
  const id = summary.id

  const rec: WorldRecord = { id, summary, world: w }
  await putRecord(rec)

  return { id }
}

export async function getWorld(id: string): Promise<WorldBrain | null> {
  if (!id) return null
  const rec = (await withStore<WorldRecord>('readonly', (store) => store.get(id))) as any
  return rec?.world ?? null
}

export async function deleteWorld(id: string): Promise<void> {
  if (!id) return
  await withStore('readwrite', (store) => store.delete(id))
}

export async function listWorlds(): Promise<WorldBrain[]> {
  const all = (await withStore<WorldRecord[]>('readonly', (store) => store.getAll())) as any
  if (!Array.isArray(all)) return []
  return all.map((r) => r.world).filter(Boolean)
}

export async function listWorldSummaries(): Promise<WorldSummary[]> {
  const all = (await withStore<WorldRecord[]>('readonly', (store) => store.getAll())) as any
  if (!Array.isArray(all)) return []
  return all
    .map((r) => r.summary)
    .filter(Boolean)
    .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))
}

export async function renameWorld(id: string, newName: string): Promise<void> {
  const w = await getWorld(id)
  if (!w) return
  ;(w as any).metadata = { ...(w as any).metadata, name: newName }
  await saveWorld(w)
}

export async function duplicateWorld(id: string): Promise<{ id: string } | null> {
  const w = await getWorld(id)
  if (!w) return null

  const clone: WorldBrain =
    typeof structuredClone === 'function'
      ? structuredClone(w)
      : (JSON.parse(JSON.stringify(w)) as WorldBrain)

  const meta: any = (clone as any).metadata ?? {}
  const createdAt = nowMs()

  ;(clone as any).metadata = {
    ...meta,
    id: `w_${createdAt}_${Math.floor(Math.random() * 1e9)}`,
    name: `${String(meta.name ?? 'World')} (Copy)`,
    createdAt,
    updatedAt: createdAt,
  }

  return await saveWorld(clone)
}

// -------------------------------
// Legacy localStorage migration
// -------------------------------

function looksLikeWorldObject(obj: any): obj is WorldBrain {
  if (!obj || typeof obj !== 'object') return false

  // WorldBrain-ish
  if (obj.metadata && typeof obj.metadata === 'object' && Array.isArray(obj.cells)) return true

  // Some legacy shapes might nest the world
  if (obj.world && obj.world.metadata && Array.isArray(obj.world.cells)) return true

  return false
}

function extractWorld(obj: any): WorldBrain | null {
  if (!obj || typeof obj !== 'object') return null
  if (obj.metadata && Array.isArray(obj.cells)) return obj as WorldBrain
  if (obj.world && obj.world.metadata && Array.isArray(obj.world.cells)) return obj.world as WorldBrain
  return null
}

function isLikelyWorldKey(key: string): boolean {
  const k = key.toLowerCase()

  // Broad but safe filters; we also validate by parsing structure.
  if (!k.includes('worldwright')) return false
  if (!k.includes('world')) return false

  // Avoid obvious non-world keys
  if (k.includes('migration')) return false
  if (k.includes('settings')) return false
  if (k.includes('debug')) return false

  return true
}

async function migrateLegacyLocalStorageToIndexedDbOnce(): Promise<void> {
  try {
    if (localStorage.getItem(MIGRATION_DONE_KEY) === '1') return
  } catch {
    // If localStorage is blocked, just skip migration.
    return
  }

  const keys: string[] = []
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (!k) continue
      if (isLikelyWorldKey(k)) keys.push(k)
    }
  } catch {
    return
  }

  if (keys.length === 0) {
    try {
      localStorage.setItem(MIGRATION_DONE_KEY, '1')
    } catch {}
    return
  }

  console.log(`[WorldWright] Migrating legacy localStorage worlds -> IndexedDB. Candidates: ${keys.length}`)

  const importedKeys: string[] = []

  for (const key of keys) {
    let raw: string | null = null
    try {
      raw = localStorage.getItem(key)
    } catch {
      continue
    }
    if (!raw) continue

    let parsed: any
    try {
      parsed = JSON.parse(raw)
    } catch {
      continue
    }

    if (!looksLikeWorldObject(parsed)) continue

    const world = extractWorld(parsed)
    if (!world) continue

    try {
      // Ensure metadata exists so it can be addressed by ID.
      const w = ensureWorldMetadata(world)

      // IMPORTANT: write directly into IndexedDB via canonical save
      await saveWorld(w)

      importedKeys.push(key)
      console.log(`[WorldWright] Imported legacy world from key: ${key}`)
    } catch (e) {
      console.warn(`[WorldWright] Failed importing key ${key}:`, e)
    }
  }

  // Cleanup legacy keys after successful import
  for (const key of importedKeys) {
    try {
      localStorage.removeItem(key)
    } catch {}
  }

  try {
    localStorage.setItem(MIGRATION_DONE_KEY, '1')
  } catch {}

  console.log(`[WorldWright] Migration complete. Imported: ${importedKeys.length}/${keys.length}`)
}

// --------------------------------------------------------
// COMPAT: App bootstrap hook (do it "for real").
// --------------------------------------------------------
export async function restoreFromLocalStorage(): Promise<void> {
  // Migration is safe to call on every boot; it guards itself.
  await migrateLegacyLocalStorageToIndexedDbOnce()
}