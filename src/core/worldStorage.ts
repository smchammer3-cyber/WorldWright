// ============================================
// WorldWright Storage System (Blueprint Step 3)
// In-memory storage + localStorage persistence
// ============================================

import { World } from './world'

let worlds: World[] = []

export interface WorldSummary {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'worldwright.worlds.v1'

function generateId(): string {
  return (
    Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10)
  )
}

function canUseLocalStorage(): boolean {
  try {
    if (typeof window === 'undefined') return false
    if (!('localStorage' in window)) return false
    const testKey = '__ww_test__'
    window.localStorage.setItem(testKey, '1')
    window.localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

function persistToLocalStorage() {
  if (!canUseLocalStorage()) return
  try {
    const payload = JSON.stringify(worlds)
    window.localStorage.setItem(STORAGE_KEY, payload)
  } catch (e) {
    console.warn('WorldWright: failed to persist worlds:', e)
  }
}

/**
 * Used by App on startup.
 */
export function restoreFromLocalStorage() {
  if (!canUseLocalStorage()) {
    worlds = []
    return
  }

  try {
    const data = window.localStorage.getItem(STORAGE_KEY)
    if (!data) {
      worlds = []
      return
    }
    const parsed = JSON.parse(data)
    if (Array.isArray(parsed)) {
      worlds = parsed as World[]
    } else {
      worlds = []
    }
  } catch (e) {
    console.warn('WorldWright: failed reading from LocalStorage:', e)
    worlds = []
  }
}

export function listWorldSummaries(): WorldSummary[] {
  return worlds
    .map((w) => ({
      id: w.id,
      name: w.name,
      createdAt: w.createdAt,
      updatedAt: w.updatedAt,
    }))
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
}

export function getWorldById(id: string): World | undefined {
  return worlds.find((w) => w.id === id)
}

/**
 * Save or update a world. Returns its id.
 */
export function saveWorld(world: World): string {
  const now = new Date().toISOString()
  let existingIndex = worlds.findIndex((w) => w.id === world.id)
  let id = world.id

  if (!id) {
    id = generateId()
    const newWorld: World = {
      ...world,
      id,
      createdAt: now,
      updatedAt: now,
    }
    worlds.push(newWorld)
  } else if (existingIndex >= 0) {
    const updated: World = {
      ...worlds[existingIndex],
      ...world,
      id,
      updatedAt: now,
    }
    worlds[existingIndex] = updated
  } else {
    const newWorld: World = {
      ...world,
      id,
      createdAt: now,
      updatedAt: now,
    }
    worlds.push(newWorld)
  }

  persistToLocalStorage()
  return id
}