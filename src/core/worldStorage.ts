// ========================================================
// WORLD STORAGE -- WORLDBRAIN STEP 1.1-B (SCHEMA-AWARE STORAGE)
// Jarvis change: 1.1-B -- Update worldStorage.ts
//
// Responsibilities:
// - Persist World objects to localStorage.
// - Normalize/migrate older saves to the current schema:
//   • Add schemaVersion when missing.
//   • Add editLayer / simLayer when missing.
//   • Ensure arrays (countries, cultures, cities, stickers) exist.
// - Provide a simple API used by the app:
//   • restoreFromLocalStorage() for App bootstrap
//   • listWorldSummaries() for Home screen
//   • listWorlds()
//   • getWorld(id)
//   • saveWorld(world)
//   • deleteWorld(id)
// ========================================================

import {
  World,
  WorldCell,
  WorldSticker,
  Country,
  Culture,
  City,
  CURRENT_WORLD_SCHEMA_VERSION,
  createEmptyEditLayer,
  createEmptySimLayer,
} from './world'

const STORAGE_KEY = 'worldwright.worlds'

/**
 * Lightweight shape returned to the Home screen for listing worlds.
 */
export interface WorldSummary {
  id: string
  name: string
  updatedAt: string
}

/**
 * In-memory cache of worlds.
 * Always normalized to the current schema.
 */
let worlds: World[] = []

// --------------------------------------------------------
// Utility: safe JSON parse
// --------------------------------------------------------

function safeParseJSON<T>(value: string | null): T | null {
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

// --------------------------------------------------------
// Normalization / Migration
// --------------------------------------------------------

/**
 * Normalize a raw cell from older saves into a WorldCell.
 */
function normalizeCell(raw: any): WorldCell {
  return {
    x: typeof raw?.x === 'number' ? raw.x : 0,
    y: typeof raw?.y === 'number' ? raw.y : 0,
    baseHeight:
      typeof raw?.baseHeight === 'number'
        ? raw.baseHeight
        : 0,
    temperature:
      typeof raw?.temperature === 'number'
        ? raw.temperature
        : 0.5,
    moisture:
      typeof raw?.moisture === 'number'
        ? raw.moisture
        : 0.5,
    biomeId:
      typeof raw?.biomeId === 'string'
        ? raw.biomeId
        : 'unknown',
  }
}

function normalizeSticker(raw: any, worldId: string): WorldSticker {
  return {
    id: String(
      raw?.id ?? `sticker-${Math.random().toString(36).slice(2)}`,
    ),
    worldId,
    type: String(raw?.type ?? 'REGION'),
    x: typeof raw?.x === 'number' ? raw.x : 0,
    y: typeof raw?.y === 'number' ? raw.y : 0,
    width: typeof raw?.width === 'number' ? raw.width : 1,
    height: typeof raw?.height === 'number' ? raw.height : 1,
    metadata:
      raw?.metadata && typeof raw.metadata === 'object'
        ? raw.metadata
        : {},
  }
}

function normalizeCountry(raw: any): Country {
  return {
    id: String(
      raw?.id ?? `country-${Math.random().toString(36).slice(2)}`,
    ),
    name: String(raw?.name ?? 'Unnamed country'),
  }
}

function normalizeCulture(raw: any): Culture {
  return {
    id: String(
      raw?.id ?? `culture-${Math.random().toString(36).slice(2)}`,
    ),
    name: String(raw?.name ?? 'Unnamed culture'),
  }
}

function normalizeCity(raw: any): City {
  return {
    id: String(raw?.id ?? `city-${Math.random().toString(36).slice(2)}`),
    name: String(raw?.name ?? 'Unnamed city'),
    x: typeof raw?.x === 'number' ? raw.x : 0,
    y: typeof raw?.y === 'number' ? raw.y : 0,
    population:
      typeof raw?.population === 'number'
        ? raw.population
        : undefined,
  }
}

/**
 * Normalize/migrate a raw world object from storage into a proper World.
 * This is where we:
 * - Add schemaVersion if missing.
 * - Create editLayer/simLayer if missing.
 * - Normalize arrays.
 * - Ensure createdAt / updatedAt timestamps exist.
 */
function normalizeWorld(raw: any): World | null {
  if (!raw) return null

  const width = typeof raw.width === 'number' ? raw.width : 256
  const height = typeof raw.height === 'number' ? raw.height : 128

  const rawCells = Array.isArray(raw.cells) ? raw.cells : []
  const cells: WorldCell[] = rawCells.map(normalizeCell)

  const cellCount = cells.length || width * height

  // schemaVersion: default to CURRENT if missing/invalid
  const schemaVersion =
    typeof raw.schemaVersion === 'number'
      ? (raw.schemaVersion as typeof CURRENT_WORLD_SCHEMA_VERSION)
      : CURRENT_WORLD_SCHEMA_VERSION

  const nowIso = new Date().toISOString()
  const createdAt: string =
    typeof raw.createdAt === 'string' ? raw.createdAt : nowIso
  const updatedAt: string =
    typeof raw.updatedAt === 'string' ? raw.updatedAt : createdAt

  // editLayer / simLayer: if missing, create zeroed layers
  const rawEditLayer = raw.editLayer
  const rawSimLayer = raw.simLayer

  const editLayer =
    rawEditLayer &&
    Array.isArray(rawEditLayer.heightDelta) &&
    rawEditLayer.heightDelta.length === cellCount
      ? { heightDelta: [...rawEditLayer.heightDelta] }
      : createEmptyEditLayer(cellCount)

  const simLayer =
    rawSimLayer &&
    Array.isArray(rawSimLayer.heightDelta) &&
    rawSimLayer.heightDelta.length === cellCount
      ? { heightDelta: [...rawSimLayer.heightDelta] }
      : createEmptySimLayer(cellCount)

  const countriesRaw = Array.isArray(raw.countries) ? raw.countries : []
  const culturesRaw = Array.isArray(raw.cultures) ? raw.cultures : []
  const citiesRaw = Array.isArray(raw.cities) ? raw.cities : []
  const stickersRaw = Array.isArray(raw.stickers) ? raw.stickers : []

  const countries: Country[] = countriesRaw.map(normalizeCountry)
  const cultures: Culture[] = culturesRaw.map(normalizeCulture)
  const cities: City[] = citiesRaw.map(normalizeCity)
  const stickers: WorldSticker[] = stickersRaw.map((s: any) =>
    normalizeSticker(s, String(raw.id ?? 'unknown')),
  )

  const world: World = {
    id: String(
      raw.id ?? `world-${Math.random().toString(36).slice(2)}`,
    ),
    name: String(raw.name ?? 'Untitled world'),
    seed: String(raw.seed ?? '0'),
    schemaVersion,
    createdAt,
    updatedAt,
    width,
    height,
    seaLevel:
      typeof raw.seaLevel === 'number' ? raw.seaLevel : 0.5,
    cells,
    editLayer,
    simLayer,
    countries,
    cultures,
    cities,
    stickers,
  }

  return world
}

// --------------------------------------------------------
// Load from and save to localStorage
// --------------------------------------------------------

function loadWorldsFromStorage(): World[] {
  const parsed = safeParseJSON<any[]>(localStorage.getItem(STORAGE_KEY))
  if (!parsed || !Array.isArray(parsed)) {
    return []
  }

  const normalized: World[] = []
  for (const raw of parsed) {
    const w = normalizeWorld(raw)
    if (w) normalized.push(w)
  }
  return normalized
}

function persistWorldsToStorage() {
  try {
    const serialized = JSON.stringify(worlds)
    localStorage.setItem(STORAGE_KEY, serialized)
  } catch (error) {
    console.error('Failed to persist worlds to storage:', error)
  }
}

// --------------------------------------------------------
// Public API
// --------------------------------------------------------

/**
 * Return a snapshot of all worlds.
 */
export function listWorlds(): World[] {
  return worlds.slice()
}

/**
 * Return a lightweight, UI-friendly list of worlds for the Home screen.
 * Sorted by updatedAt (newest first).
 */
export function listWorldSummaries(): WorldSummary[] {
  return worlds
    .slice()
    .map(w => ({
      id: w.id,
      name: w.name,
      updatedAt: w.updatedAt,
    }))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

/**
 * Find a world by id.
 */
export function getWorld(id: string): World | undefined {
  return worlds.find(w => w.id === id)
}

/**
 * Insert or replace a world, then persist to storage.
 *
 * Call this from:
 * - Generate Mode when creating a new world.
 * - Create Mode when saving edits.
 */
export function saveWorld(world: World): void {
  const index = worlds.findIndex(w => w.id === world.id)

  const nowIso = new Date().toISOString()

  const toStore: World = {
    ...world,
    schemaVersion: CURRENT_WORLD_SCHEMA_VERSION,
    createdAt: world.createdAt || nowIso,
    updatedAt: nowIso,
  }

  if (index >= 0) {
    worlds[index] = toStore
  } else {
    worlds.push(toStore)
  }

  persistWorldsToStorage()
}

/**
 * Delete a world by id.
 */
export function deleteWorld(id: string): void {
  const next = worlds.filter(w => w.id !== id)
  if (next.length === worlds.length) return
  worlds = next
  persistWorldsToStorage()
}

/**
 * Compatibility helper for App.tsx.
 *
 * Older versions explicitly called restoreFromLocalStorage() on startup.
 * With the new design, worlds are already loaded at module init, but
 * keeping this function avoids breaking the import and allows us to
 * refresh the cache if we ever need to.
 */
export function restoreFromLocalStorage(): void {
  worlds = loadWorldsFromStorage()
}

// --------------------------------------------------------
// Initialization
// --------------------------------------------------------

// Initialize worlds on module load.
worlds = loadWorldsFromStorage()