// ============================================
// WorldWright Storage System (Blueprint Step 3)
// Temporary in-memory storage + localStorage stub
// ============================================

import { World } from './world'

// In-memory saved worlds (runtime only)
let worlds: World[] = []

// Unique ID generator
export function createId(prefix: string = 'id'): string {
  return prefix + '_' + Math.random().toString(36).substring(2, 10)
}

// Add a world to storage
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

// Get all saved worlds
export function loadWorlds(): World[] {
  return [...worlds]
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