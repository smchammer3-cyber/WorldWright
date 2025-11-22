// ============================================
// WorldWright - World Generator (Blueprint Step 5B + 5C)
// ============================================

import { World, WorldCell } from './world'

// Overall "theme" of the world – used to tweak generation later.
export type WorldStyle = 'realistic' | 'fantasy' | 'scifi'

/**
 * Parameters driving world generation.
 * UI sliders use 0–100, so we normalise to 0–1 internally.
 */
export interface GeneratorParams {
  worldStyle: WorldStyle
  landmass: number // 0–100
  seaLevel: number // 0–100
  climateVariance: number // 0–100
  plateActivity: number // 0–100
  axisTilt: number // 0–100
  planetAge: number // 0–100
  seed: number
}

/**
 * Default generator parameters for the UI.
 */
export function createDefaultGeneratorParams(): GeneratorParams {
  return {
    worldStyle: 'realistic',
    landmass: 50,
    seaLevel: 50,
    climateVariance: 50,
    plateActivity: 50,
    axisTilt: 23,
    planetAge: 50,
    seed: Math.floor(Math.random() * 1_000_000_000)
  }
}

/**
 * Very simple deterministic noise function.
 * (We can swap this out for real noise later.)
 */
function randomNoise(x: number, y: number, seed: number): number {
  let v = Math.sin(x * 15731 + y * 789221 + seed * 137631) * 43758.5453
  return v - Math.floor(v)
}

/**
 * Very basic biome logic for now (will improve later).
 * Returns a numeric biome ID.
 */
function biomeFrom(lat: number, height: number, seaLevel: number): number {
  // Ocean
  if (height < seaLevel) return 0

  // Poles
  if (lat > 0.8 || lat < -0.8) return 1 // Ice caps

  // High mountains
  if (height > 0.8) return 2

  // Cold band
  if (lat > 0.6 || lat < -0.6) return 3 // Tundra

  // Temperate vs tropical (placeholder)
  if (lat > 0.3 || lat < -0.3) return 4 // Forest / taiga

  // Equator-ish
  return 5 // Drylands / grass / desert variants later
}

/**
 * Core world generation from parameters.
 * For now this is intentionally simple and fast – it just needs to
 * produce something believable and consistent with the sliders.
 */
export function generateWorldFromParams(params: GeneratorParams): World {
  const width = 256
  const height = 128

  // Normalise 0–100 sliders to 0–1 ranges
  const seaLevel = params.seaLevel / 100
  const landmass = params.landmass / 100
  const climateVariance = params.climateVariance / 100
  const plateActivity = params.plateActivity / 100
  const axisTilt = params.axisTilt / 100
  const planetAge = params.planetAge / 100

  const cells: WorldCell[] = []

  for (let y = 0; y < height; y++) {
    const lat = (y / height) * 2 - 1 // -1 south pole → 1 north pole

    for (let x = 0; x < width; x++) {
      // Base height from noise
      let h = randomNoise(x, y, params.seed)

      // Landmass: shift overall distribution up/down
      h = h * 1.5 - (1 - landmass)

      // Plate activity / ruggedness (very rough placeholder)
      const plateNoise = randomNoise(x * 2, y * 2, params.seed + 1337)
      h += (plateNoise - 0.5) * plateActivity * 0.4

      // Planet age: young = sharper, old = smoother
      if (planetAge > 0.5) {
        // Older → slightly eroded
        h = (h + randomNoise(x, y, params.seed + 9999)) / 2
      }

      // Clamp height into 0–1
      if (h < 0) h = 0
      if (h > 1) h = 1

      // Simple climate / biome logic
      const effectiveLat = lat * (1 + (axisTilt - 0.23) * 0.3)
      const latWithVariance =
        effectiveLat +
        (randomNoise(x, y, params.seed + 4242) - 0.5) * climateVariance * 0.3

      const biomeId = biomeFrom(latWithVariance, h, seaLevel)

      cells.push({
        x,
        y,
        baseHeight: h,
        editHeightDelta: 0,
        simHeightDelta: 0,
        baseBiomeId: biomeId,
        editBiomeId: null,
        simBiomeId: null,
        countryId: null,
        cultureId: null,
        cityId: null
      })
    }
  }

  return {
    id: crypto.randomUUID(),
    name: 'New World',
    width,
    height,
    seed: params.seed,
    seaLevel,
    cells,
    countries: [],
    cultures: [],
    cities: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}