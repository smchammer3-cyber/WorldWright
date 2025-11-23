// ===============================
// WorldWright WorldBrain Types
// ===============================

export type BiomeId = number
export type CountryId = string | null
export type CultureId = string | null
export type CityId = string | null

export type CityType = 'village' | 'town' | 'city' | 'capital'

/**
 * Single cell in the world grid.
 *
 * Resolution is width × height (e.g. 256 × 128).
 */
export interface WorldCell {
  x: number
  y: number
  baseHeight: number // -1 .. 1
  moisture: number // 0 .. 1
  temperature: number // 0 .. 1
  biomeId: BiomeId
}

/**
 * Core world object saved/loaded in V1.
 */
export interface World {
  id: string
  name: string
  width: number
  height: number
  seed: string
  seaLevel: number // 0..1
  cells: WorldCell[]
  countries: any[]
  cultures: any[]
  cities: any[]
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
export function indexToXY(
  index: number,
  width: number,
): { x: number; y: number } {
  const y = Math.floor(index / width)
  const x = index - y * width
  return { x, y }
}