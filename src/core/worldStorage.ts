// ============================================
// WorldWright Storage System (Blueprint Step 3)
// In-memory storage + localStorage stub
// ============================================

import { World, WorldCell } from './world'

// In-memory saved worlds (runtime only)
let worlds: World[] = []

export interface WorldSummary {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

// Unique ID generator
export function createId(prefix: string = 'id'): string {
  return prefix + '_' + Math.random().toString(36).substring(2, 10)
}

// Create a simple placeholder world that satisfies the WorldBrain shape.
// Later, the real generator will replace this logic.
export function createPlaceholderWorld(name: string): World {
  const width = 64
  const height = 32
  const seed = Math.floor(Math.random() * 2 ** 31)

  const cells: WorldCell[] = []

  for (let y = 0; y < height; y++) {
    const latNorm = y / (height - 1)
    const baseBand = 0.3 + 0.3 * Math.sin(latNorm * Math.PI)

    for (let x = 0; x < width; x++) {
      const baseHeight = baseBand
      cells.push({
        x,
        y,
        baseHeight,
        editHeightDelta: 0,
        simHeightDelta: 0,
        baseBiomeId: 0,
        editBiomeId: null,
        countryId: null,
        cultureId: null,
        cityId: null
      })
    }
  }

  const now = new Date().toISOString()

  return {
    id: createId('world'),
    name,
    seed,
    width,
    height,
    seaLevel: 0.5,
    cells,
    countries: [],
    cultures: [],
    cities: [],
    createdAt: now,
    updatedAt: now
  }
}

// Add or update a world in storage
export function saveWorld(world: World): void {
  world.updatedAt = new Date().toISOString()

  const index = worlds.findIndex(w => w.id === world.id)
  if (index >= 0) {
    worlds[index] = world
  } else {
    worlds.push(world)
  }

  persistToLocalStorage()
}

// Convenience helper: create + save world in one step
export function createAndSavePlaceholderWorld(name: string): World {
  const world = createPlaceholderWorld(name)
  saveWorld(world)
  return world
}

// Get all saved worlds (full objects)
export function loadWorlds(): World[] {
  return [...worlds]
}

// Get lightweight world summaries for the Home screen
export function listWorldSummaries(): WorldSummary[] {
  return worlds.map(w => ({
    id: w.id,
    name: w.name,
    createdAt: w.createdAt,
    updatedAt: w.updatedAt
  }))
}

// Look up a world by ID
export function getWorldById(id: string): World | undefined {
  return worlds.find(w => w.id === id)
}

// Store worlds into localStorage
function persistToLocalStorage() {
  try {
    localStorage.setItem('worldwright_saves', JSON.stringify(worlds))
  } catch (e) {
    console.warn('LocalStorage unavailable:', e)
  }
}

// Load from localStorage on startup
export function restoreFromLocalStorage() {
  try {
    const data = localStorage.getItem('worldwright_saves')
    if (data) {
      worlds = JSON.parse(data)
    }
  } catch (e) {
    console.warn('Failed reading from LocalStorage:', e)
    worlds = []
  }
}