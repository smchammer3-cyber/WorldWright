// ============================================
// WorldWright Storage System (Blueprint Step 3)
// In-memory storage + LocalStorage persistence
//
// (6B-3B) Notes:
// - World now has an optional `stickers` field.
// - We normalize loaded worlds so `stickers` is always an array,
//   even for older saves that never had this field.
// ============================================

import { World } from './world'

// In-memory saved worlds (runtime only)
let worlds: World[] = []

export interface WorldSummary {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'worldwright_saves'

function normalizeWorld(world: World): World {
  // Ensure array fields are at least empty arrays
  const countries = Array.isArray(world.countries) ? world.countries : []
  const cultures = Array.isArray(world.cultures) ? world.cultures : []
  const cities = Array.isArray(world.cities) ? world.cities : []

  // Stickers may be missing on older saves; treat missing as []
  const stickersRaw = (world as any).stickers
  const stickers = Array.isArray(stickersRaw) ? stickersRaw : []

  return {
    ...world,
    countries,
    cultures,
    cities,
    stickers,
  }
}

function setWorlds(next: World[]) {
  worlds = next.map(normalizeWorld)
}

/**
 * Ensure a world has a non-empty id.
 */
function ensureWorldHasId(world: World): World {
  const trimmedId = world.id?.trim()
  if (trimmedId && trimmedId.length > 0) {
    return world
  }
  const id = `world_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 8)}`
  return { ...world, id }
}

/**
 * Return a lightweight list of worlds for the home screen.
 */
export function listWorldSummaries(): WorldSummary[] {
  return worlds
    .map(w => {
      const createdAt = w.createdAt || new Date().toISOString()
      const updatedAt = w.updatedAt || createdAt
      return {
        id: w.id,
        name: w.name || 'Untitled world',
        createdAt,
        updatedAt,
      }
    })
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
}

/**
 * Get a full world by id.
 */
export function getWorld(id: string): World | undefined {
  return worlds.find(w => w.id === id)
}

/**
 * Save (or update) a world in memory and persist it.
 * Returns the world's id.
 */
export function saveWorld(world: World): string {
  const now = new Date().toISOString()
  const withId = ensureWorldHasId(world)

  const existingIndex = worlds.findIndex(w => w.id === withId.id)

  if (existingIndex >= 0) {
    const existing = worlds[existingIndex]
    const createdAt = existing.createdAt || withId.createdAt || now
    const updated: World = normalizeWorld({
      ...existing,
      ...withId,
      createdAt,
      updatedAt: now,
    })
    worlds[existingIndex] = updated
  } else {
    const createdAt = withId.createdAt || now
    const created: World = normalizeWorld({
      ...withId,
      createdAt,
      updatedAt: now,
    })
    worlds.push(created)
  }

  persistToLocalStorage()
  return withId.id
}

/**
 * Persist the in-memory list of worlds to LocalStorage.
 */
function persistToLocalStorage() {
  try {
    const data = JSON.stringify(worlds)
    localStorage.setItem(STORAGE_KEY, data)
  } catch (e) {
    console.warn('Failed to write to LocalStorage:', e)
  }
}

/**
 * Restore the in-memory list of worlds from LocalStorage.
 * Safe to call multiple times; will overwrite the in-memory list.
 */
export function restoreFromLocalStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) {
      worlds = []
      return
    }
    const parsed = JSON.parse(data)
    if (Array.isArray(parsed)) {
      setWorlds(parsed as World[])
    } else {
      worlds = []
    }
  } catch (e) {
    console.warn('Failed reading from LocalStorage:', e)
    worlds = []
  }
}