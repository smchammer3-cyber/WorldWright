// ============================================
// WorldWright Storage System (Blueprint Step 3)
// In-memory storage + localStorage stub
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

/**
 * Return a lightweight list of worlds for the home screen.
 */
export function listWorldSummaries(): WorldSummary[] {
  return worlds.map(w => ({
    id: w.id,
    name: w.name,
    createdAt: w.createdAt,
    updatedAt: w.updatedAt
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
 */
export function saveWorld(world: World): void {
  const existingIndex = worlds.findIndex(w => w.id === world.id)
  if (existingIndex >= 0) {
    worlds[existingIndex] = world
  } else {
    worlds.push(world)
  }
  persistToLocalStorage()
}

/**
 * Replace all worlds (used by restore).
 */
function setWorlds(newWorlds: World[]) {
  worlds = newWorlds
}

/**
 * Persist current worlds to localStorage.
 */
function persistToLocalStorage() {
  try {
    const data = JSON.stringify(worlds)
    localStorage.setItem('worldwright_saves', data)
  } catch (e) {
    console.warn('Failed writing to LocalStorage:', e)
  }
}

/**
 * Load from localStorage on startup.
 */
export function restoreFromLocalStorage() {
  try {
    const data = localStorage.getItem('worldwright_saves')
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