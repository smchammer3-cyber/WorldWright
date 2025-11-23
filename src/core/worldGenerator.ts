// ==========================================================
// WorldWright Generator Core (V1 / Step 5G)
// Continent-style heightfield + slider-friendly API
// ==========================================================

import { World, WorldCell } from './world'

// Generator config type from UI sliders
// NOTE: Sliders are 0–100 in the UI; we normalize inside the generator.
export interface GeneratorParams {
  name: string
  width: number
  height: number
  seed: string
  landmass: number        // 0–100, 0 = mostly ocean, 100 = lots of land
  seaLevel: number        // 0–100, 50 ~ balanced
  plateActivity: number   // 0–100, reserved for future use
  axisTilt: number        // 0–100, reserved for future use
  planetAge: number       // 0–100, reserved for future use
  climateVariance: number // 0–100, reserved for future use
  worldStyle: number      // 0–100, reserved for presets
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

// Small helper for seeded PRNG
function makeRandom(seed: string) {
  let h = 2166136261 >>> 0
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return () => {
    h ^= h >>> 13
    h ^= h << 17
    h ^= h >>> 5
    return (h >>> 0) / 4294967296
  }
}

// Very lightweight hash-based noise – used only to roughen coastlines
function noise(rand: () => number, x: number, y: number): number {
  const r = Math.sin(x * 12.9898 + y * 78.233 + rand() * 43758.5453)
  return (r - Math.floor(r)) * 2 - 1 // -1..1
}

// Public helper to create initial generator slider values
export function createDefaultGeneratorParams(): GeneratorParams {
  return {
    name: 'New World',
    width: 256,
    height: 128,
    seed: '',
    landmass: 55,
    seaLevel: 50,
    plateActivity: 50,
    axisTilt: 23,
    planetAge: 60,
    climateVariance: 50,
    worldStyle: 50,
  }
}

/**
 * Main generator: builds a world with broad continents instead of speckled dots.
 *
 * Strategy:
 *  - Place a few "continent centers" in UV space.
 *  - Each cell's base height is how strongly it belongs to the nearest continent.
 *  - Add a little low-amplitude noise to roughen coastlines.
 *  - Use the landmass slider to decide roughly how much land exists.
 *  - Use seaLevel slider as a gentle offset on top of that.
 */
export function generateWorldFromParams(params: GeneratorParams): World {
  const {
    name,
    width,
    height,
    seed,
    landmass: landmassSlider,
    seaLevel: seaLevelSlider,
  } = params

  const rand = makeRandom(seed || 'worldwright')

  // Normalize sliders
  const landmass01 = clamp01(landmassSlider / 100) // target land fraction
  const seaSlider01 = clamp01(seaLevelSlider / 100)

  // Decide how many continents to place: 2–4 is usually enough
  const baseContinentCount = 2 + Math.floor(landmass01 * 2) // 2, 3, or 4
  const continentCount = Math.max(1, baseContinentCount)

  type Continent = { cx: number; cy: number; radius: number }
  const continents: Continent[] = []

  for (let i = 0; i < continentCount; i++) {
    const cx = rand()
    const cy = rand()
    // More landmass → slightly bigger continents, but they also overlap
    const radius = 0.18 + (1 - landmass01) * 0.1 // ~0.18–0.28 of world size
    continents.push({ cx, cy, radius })
  }

  // First pass: build raw heights + climate fields (no seaLevel yet)
  const draftCells: { x: number; y: number; baseHeight: number; moisture: number; temperature: number }[] = []
  const heights: number[] = []

  for (let y = 0; y < height; y++) {
    const v = height <= 1 ? 0 : y / (height - 1)
    const equatorDist = Math.abs(v - 0.5) * 2 // 0 at equator, 1 at poles

    for (let x = 0; x < width; x++) {
      const u = width <= 1 ? 0 : x / (width - 1)

      // --- Continent mask: max influence of any continent ---
      let mask = 0
      for (const c of continents) {
        const dx = u - c.cx
        const dy = v - c.cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const m = 1 - dist / c.radius
        if (m > mask) mask = m
      }

      // Cut off outside blobs and clamp
      mask = clamp01(mask)

      // Shape continents: exponent < 1 → fatter centers, smoother edges
      const shaped = Math.pow(mask, 0.8 + landmass01 * 0.4) // ~0.8–1.2

      // Add some gentle multiscale noise for coastlines
      let h = shaped
      h += noise(rand, u * 4, v * 4) * 0.05
      h += noise(rand, u * 8, v * 8) * 0.025
      h = clamp01(h)

      // Moisture / temperature (for future biome work)
      const tempBase = 1 - equatorDist
      const temperature = clamp01(tempBase + noise(rand, u * 2, v * 2) * 0.1)

      const moistureBase = 0.5 + noise(rand, u * 3.1, v * 2.7) * 0.25
      const moisture = clamp01(moistureBase)

      draftCells.push({
        x,
        y,
        baseHeight: h,
        moisture,
        temperature,
      })
      heights.push(h)
    }
  }

  // Approximate a sea level that matches desired landmass fraction:
  // sort heights and pick a quantile.
  const sortedHeights = [...heights].sort((a, b) => a - b)
  const targetWaterFraction = clamp01(1 - landmass01) // e.g., landmass=0.6 → 0.4 water
  const idx = Math.floor(targetWaterFraction * (sortedHeights.length - 1))
  const baseSeaLevel = sortedHeights[idx]

  // Sea slider nudges that threshold up/down without being insane
  const seaOffset = (seaSlider01 - 0.5) * 0.25 // move by at most ±0.25
  const finalSeaLevel = clamp01(baseSeaLevel + seaOffset)

  // Second pass: finalize cells with biome ids based on finalSeaLevel
  const cells: WorldCell[] = draftCells.map((c) => ({
    x: c.x,
    y: c.y,
    baseHeight: c.baseHeight,
    moisture: c.moisture,
    temperature: c.temperature,
    biomeId: c.baseHeight < finalSeaLevel ? 0 : 1, // 0 = water, 1 = land (for now)
  }))

  const now = new Date().toISOString()

  const world: World = {
    id: '',
    name: name || 'New World',
    width,
    height,
    seed: seed || 'seed',
    seaLevel: finalSeaLevel,
    cells,
    countries: [],
    cultures: [],
    cities: [],
    createdAt: now,
    updatedAt: now,
  }

  return world
}

// Convenience wrapper used by UI when saving a named world
export function buildWorldFromParams(
  params: GeneratorParams,
  explicitName?: string,
): World {
  const base = generateWorldFromParams(params)
  const trimmed = explicitName?.trim()
  if (trimmed && trimmed.length > 0) {
    return { ...base, name: trimmed }
  }
  return base
}