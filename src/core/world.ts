// ===============================
// WorldWright WorldBrain Types
// Step 2 of the blueprint
// ===============================

export type BiomeId = number
export type CountryId = string | null
export type CultureId = string | null
export type CityId = string | null

export type CityType = 'village' | 'town' | 'city' | 'capital'

/**
 * Single cell in the world grid.
 * Resolution is width × height (e.g. 1024 × 512).
 */
export interface WorldCell {
  /** X index in grid (0..width-1), wraps around longitude */
  x: number
  /** Y index in grid (0..height-1), pole to pole */
  y: number

  /** Generated base elevation (0–1) */
  baseHeight: number

  /** Create Mode edits (stickers, brushes) */
  editHeightDelta: number

  /** Sim Mode changes (erosion, flooding, etc.) */
  simHeightDelta: number

  /** Generator-assigned biome */
  baseBiomeId: BiomeId

  /** Player override biome (if any) */
  editBiomeId: BiomeId | null

  /** Political + cultural ownership */
  countryId: CountryId
  cultureId: CultureId

  /** Optional city that occupies / references this cell */
  cityId: CityId
}

/**
 * A city or settlement pin on the map.
 */
export interface City {
  id: string
  name: string
  type: CityType

  /** Grid position for export + editor targeting */
  x: number
  y: number

  /** Owning country + culture at placement time */
  countryId: CountryId
  cultureId: CultureId

  /** Freeform lore notes */
  notes?: string
}

/**
 * A country / nation that owns land cells.
 */
export interface Country {
  id: string
  name: string

  /** Optional display color for maps */
  colorHex?: string

  /** Capital city, if defined */
  capitalCityId?: CityId
}

/**
 * Broad culture regions painted over the map.
 */
export interface Culture {
  id: string
  name: string
  description?: string
}

/**
 * Core world object stored in saves and used by Create/Sim.
 */
export interface World {
  id: string
  name: string

  /** Random seed used by the generator */
  seed: number

  /** Grid resolution */
  width: number
  height: number

  /** Sea level threshold (0–1) for oceans */
  seaLevel: number

  /** Flattened grid: index = y * width + x */
  cells: WorldCell[]

  /** High-level entities */
  countries: Country[]
  cultures: Culture[]
  cities: City[]

  /** Timestamps for future syncing/export */
  createdAt: string
  updatedAt: string
}

/**
 * Helper to compute flat index into the cells array.
 */
export function cellIndex(x: number, y: number, width: number): number {
  return y * width + x
}

/**
 * Helper to compute x/y from flat index.
 */
export function indexToXY(index: number, width: number): { x: number; y: number } {
  const y = Math.floor(index / width)
  const x = index - y * width
  return { x, y }
}