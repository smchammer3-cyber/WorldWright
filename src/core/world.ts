// ===============================
// WorldWright WorldBrain Types
// (Blueprint-compatible, simplified)
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

  // Height layers
  baseHeight: number
  editHeightDelta: number
  simHeightDelta: number

  // Biomes
  baseBiomeId: BiomeId
  editBiomeId: BiomeId | null

  // Ownership / culture
  countryId: CountryId
  cultureId: CultureId

  // City reference (if part of a settlement)
  cityId: CityId
}

export interface City {
  id: string
  name: string
  type: CityType
  x: number
  y: number
  countryId: CountryId
  cultureId: CultureId
  notes?: string
}

export interface Country {
  id: string
  name: string
}

export interface Culture {
  id: string
  name: string
}

export interface World {
  id: string
  name: string
  seed: number
  width: number
  height: number
  seaLevel: number
  cells: WorldCell[]
  countries: Country[]
  cultures: Culture[]
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