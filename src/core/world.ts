// ===============================
// WorldWright WorldBrain Types
// (Blueprint-compatible, simplified for V1)
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
  x: number
  y: number

  // Terrain
  baseHeight: number // 0–1
  editHeightDelta: number
  simHeightDelta: number

  // Biomes
  baseBiomeId: BiomeId
  editBiomeId: BiomeId | null
  simBiomeId: BiomeId | null

  // Ownership / culture
  countryId: CountryId
  cultureId: CultureId
  cityId: CityId
}

/**
 * Basic city entity – enough for lists and map pins.
 */
export interface City {
  id: string
  name: string
  type: CityType
  cellIndex: number
  countryId: CountryId
  cultureId: CultureId
  notes?: string
}

/**
 * Simple country stub for V1.
 */
export interface Country {
  id: string
  name: string
}

/**
 * Simple culture stub for V1.
 */
export interface CultureRegion {
  id: string
  name: string
}

/**
 * Full world state stored in memory / localStorage.
 */
export interface World {
  id: string
  name: string
  width: number
  height: number
  seed: number
  seaLevel: number
  cells: WorldCell[]
  countries: Country[]
  cultures: CultureRegion[]
  cities: City[]
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