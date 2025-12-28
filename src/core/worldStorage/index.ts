// ===============================================
// JARVIS CHANGE HEADER
// File: src/core/worldStorage/index.ts
// Date: 2025-12-28
// Purpose:
// - Provide local-first persistence for the V1.3 Spine WorldBrain schema.
// - Single source of truth for saving/loading worlds in localStorage.
// - Implements: list/get/save/delete/duplicate/rename + restore.
// ===============================================

import { WorldBrain, WorldMetadata } from '../worldSchema'

export interface WorldSummary {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  styleMode?: WorldMetadata['styleMode']
  gridWidth?: number
  gridHeight?: number
}

const STORAGE_NS = 'worldwright.v3'
const INDEX_KEY = `${STORAGE_NS}.world_index`
const WORLD_KEY_PREFIX = `${STORAGE_NS}.world.`

type IndexState = { ids: string[] }

function safeJSONParse<T>(raw: string | null): T | null {
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function loadIndex(): IndexState {
  const parsed = safeJSONParse<IndexState>(localStorage.getItem(INDEX_KEY))
  if (!parsed || !Array.isArray(parsed.ids)) {
    const fresh: IndexState = { ids: [] }
    localStorage.setItem(INDEX_KEY, JSON.stringify(fresh))
    return fresh
  }

  const seen = new Set<string>()
  const ids = parsed.ids.filter(id => {
    if (typeof id !== 'string' || !id) return false
    if (seen.has(id)) return false
    seen.add(id)
    return true
  })

  if (ids.length !== parsed.ids.length) {
    const repaired: IndexState = { ids }
    localStorage.setItem(INDEX_KEY, JSON.stringify(repaired))
    return repaired
  }

  return { ids }
}

function saveIndex(index: IndexState) {
  localStorage.setItem(INDEX_KEY, JSON.stringify(index))
}

function worldKey(id: string) {
  return `${WORLD_KEY_PREFIX}${id}`
}

function nowISO() {
  return new Date().toISOString()
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T
}

function isWorldBrain(candidate: any): candidate is WorldBrain {
  return (
    candidate &&
    typeof candidate === 'object' &&
    candidate.metadata &&
    typeof candidate.metadata.id === 'string' &&
    typeof candidate.metadata.name === 'string' &&
    Array.isArray(candidate.cells)
  )
}

function toSummary(world: WorldBrain): WorldSummary {
  return {
    id: world.metadata.id,
    name: world.metadata.name,
    createdAt: world.metadata.createdAt,
    updatedAt: world.metadata.updatedAt,
    styleMode: world.metadata.styleMode,
    gridWidth: world.metadata.gridWidth,
    gridHeight: world.metadata.gridHeight,
  }
}

/**
 * Call once on app boot.
 * Ensures the index exists and removes dangling ids that have no world record.
 */
export function restoreFromLocalStorage() {
  const index = loadIndex()
  const kept: string[] = []

  for (const id of index.ids) {
    const raw = localStorage.getItem(worldKey(id))
    if (!raw) continue
    const parsed = safeJSONParse<any>(raw)
    if (!isWorldBrain(parsed)) continue
    kept.push(id)
  }

  if (kept.length !== index.ids.length) {
    saveIndex({ ids: kept })
  }
}

export function listWorldSummaries(): WorldSummary[] {
  const index = loadIndex()
  const out: WorldSummary[] = []

  for (const id of index.ids) {
    const w = getWorld(id)
    if (!w) continue
    out.push(toSummary(w))
  }

  out.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
  return out
}

export function listWorlds(): WorldBrain[] {
  const index = loadIndex()
  const out: WorldBrain[] = []
  for (const id of index.ids) {
    const w = getWorld(id)
    if (w) out.push(w)
  }
  out.sort((a, b) => b.metadata.updatedAt.localeCompare(a.metadata.updatedAt))
  return out
}

export function getWorld(id: string): WorldBrain | null {
  const raw = localStorage.getItem(worldKey(id))
  if (!raw) return null
  const parsed = safeJSONParse<any>(raw)
  if (!isWorldBrain(parsed)) return null
  return parsed as WorldBrain
}

export async function saveWorld(world: WorldBrain): Promise<{ id: string }> {
  const index = loadIndex()
  const w = deepClone(world)

  if (!w.metadata.createdAt) w.metadata.createdAt = nowISO()
  w.metadata.updatedAt = nowISO()
  if (!w.metadata.name || !w.metadata.name.trim()) {
    w.metadata.name = 'Untitled World'
  }

  localStorage.setItem(worldKey(w.metadata.id), JSON.stringify(w))

  if (!index.ids.includes(w.metadata.id)) {
    index.ids.unshift(w.metadata.id)
  } else {
    index.ids = [w.metadata.id, ...index.ids.filter(x => x !== w.metadata.id)]
  }
  saveIndex(index)

  return { id: w.metadata.id }
}

export function deleteWorld(id: string) {
  const index = loadIndex()
  localStorage.removeItem(worldKey(id))
  saveIndex({ ids: index.ids.filter(x => x !== id) })
}

export function renameWorld(id: string, newName: string): boolean {
  const w = getWorld(id)
  if (!w) return false
  w.metadata.name = newName.trim() || w.metadata.name
  w.metadata.updatedAt = nowISO()
  localStorage.setItem(worldKey(id), JSON.stringify(w))
  return true
}

export function duplicateWorld(id: string): { id: string } | null {
  const w = getWorld(id)
  if (!w) return null

  const copy = deepClone(w)
  const newId =
    (globalThis.crypto as any)?.randomUUID?.() ??
    `ww_${Date.now()}_${Math.random().toString(16).slice(2)}`

  copy.metadata.id = newId
  copy.metadata.name = `${copy.metadata.name} (Copy)`
  copy.metadata.createdAt = nowISO()
  copy.metadata.updatedAt = copy.metadata.createdAt

  localStorage.setItem(worldKey(newId), JSON.stringify(copy))

  const index = loadIndex()
  index.ids.unshift(newId)
  saveIndex(index)

  return { id: newId }
}