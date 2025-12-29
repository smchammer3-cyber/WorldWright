// ========================================================
// JARVIS CHANGE HEADER -- STORAGE SPINE FIX (IndexedDB)
// File: src/core/worldStorage/index.ts
//
// Why:
// - localStorage quota is too small for real WorldBrain worlds.
// - IndexedDB supports much larger payloads and structured cloning.
//
// API:
// - listWorlds, listWorldSummaries, getWorld
// - saveWorld (async), deleteWorld
// - renameWorld, duplicateWorld
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

function nowMs() {
  return Date.now()
}

function ensureWorldMetadata(world: WorldBrain): WorldBrain {
  const meta: any = (world as any).metadata ?? {}
  const createdAt = Number.isFinite(meta.createdAt) ? meta.createdAt : nowMs()
  const updatedAt = nowMs()
  const id = typeof meta.id === 'string' && meta.id.length > 0 ? meta.id : `w_${createdAt}_${Math.floor(Math.random() * 1e9)}`
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
// IndexedDB helper
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

// -------------------------------
// Public API
// -------------------------------

export async function saveWorld(world: WorldBrain): Promise<{ id: string }> {
  const w = ensureWorldMetadata(world)
  const summary = worldToSummary(w)
  const id = summary.id

  const rec: WorldRecord = { id, summary, world: w }

  await withStore('readwrite', (store) => store.put(rec))

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

  // Deep clone via structuredClone if available, else JSON clone.
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

  const res = await saveWorld(clone)
  return res
}