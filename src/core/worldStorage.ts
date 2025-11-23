// ============================================
// WorldWright Storage System (Blueprint Step 3)
// In-memory storage + LocalStorage persistence
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
  return worlds.map(w => ({
    id: w.id,
    name: w.name,
    createdAt: w.createdAt,
    updatedAt: w.updatedAt,
  }))
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
    worlds[existingIndex] = {
      ...withId,
      updatedAt: now,
    }
  } else {
    const createdAt = withId.createdAt || now
    worlds.push({
      ...withId,
      createdAt,
      updatedAt: now,
    })
  }

  persistToLocalStorage()
  return withId.id
}

/**
 * Replace all worlds (used by restore).
 */
function setWorlds(newWorlds: World[]) {
  worlds = newWorlds
}

/**
 * Persist current worlds to LocalStorage.
 */
function persistToLocalStorage() {
  try {
    const data = JSON.stringify(worlds)
    localStorage.setItem(STORAGE_KEY, data)
  } catch (e) {
    console.warn('Failed writing to LocalStorage:', e)
  }
}

/**
 * Load from LocalStorage on startup.
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