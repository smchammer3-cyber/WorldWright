// ===============================
// WorldWright WorldBrain Types
// Blueprint-compatible core model for V1
// ===============================

export type BiomeId = number
export type CountryId = string | null
export type CultureId = string | null
export type CityId = string | null

export type CityType = 'village' | 'town' | 'city' | 'capital'

/**
 * Single cell in the world grid.
 *
 * Resolution is width × height (e.g. 256 × 128 or 1024 × 512).
 * All heights are normalized to the 0–1 range in the generation layer.
 *
 * Layer separation:
 * - baseHeight: generator output
 * - editHeightDelta: Create Mode edits (stickers, brushes)
 * - simHeightDelta: Sim Mode physical changes (erosion, floods, etc.)
 *
 * Biomes:
 * - baseBiomeId: generator classification
 * - editBiomeId: Create Mode overrides
 * - simBiomeId: Sim Mode overrides (if needed)
 */
export interface WorldCell {
  x: number
  y: number

  // Height layers
  baseHeight: number // 0–1
  editHeightDelta: number
  simHeightDelta: number

  // Biomes
  baseBiomeId: BiomeId | null
  editBiomeId: BiomeId | null
  simBiomeId: BiomeId | null

  // Ownership / culture / city
  countryId: CountryId
  cultureId: CultureId
  cityId: CityId
}

/**
 * Country metadata. In V1 this is light-weight,
 * but structured to grow (flags, notes, etc.).
 */
export interface WorldCountry {
  id: string
  name: string
  color: string // hex string used for maps/overlays
}

/**
 * Culture metadata. Also light-weight for V1.
 */
export interface WorldCulture {
  id: string
  name: string
  color: string // hex string for cultural overlays
}

/**
 * City / settlement entity placed on the map.
 *
 * Position is tracked in grid coordinates (x, y).
 * Later we can derive lat/long for exports.
 */
export interface WorldCity {
  id: string
  name: string
  type: CityType
  x: number
  y: number
  countryId: CountryId
  cultureId: CultureId
}

/**
 * Primary world container (WorldBrain root object).
 *
 * This is what Create Mode edits and Sim Mode
 * simulations operate on.
 */
export interface World {
  id: string
  name: string

  // Grid resolution
  width: number
  height: number

  // Generator metadata
  seed: string
  seaLevel: number // 0–1 global sea threshold

  // Core world layers
  cells: WorldCell[]
  countries: WorldCountry[]
  cultures: WorldCulture[]
  cities: WorldCity[]

  // Timestamps (ISO strings)
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