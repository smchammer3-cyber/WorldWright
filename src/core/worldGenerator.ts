// ==========================================================
// WorldWright Generator Core (V3 / Step 6B – realistic terrain)
// Combines elliptical continent seeds, FBM noise and climate
// ==========================================================

import {
  World,
  WorldCell,
  CURRENT_WORLD_SCHEMA_VERSION,
  createEmptyEditLayer,
  createEmptySimLayer,
} from './world'

/**
 * Generator parameters exposed in the UI.
 */
export interface GeneratorParams {
  name: string
  width: number
  height: number
  seed: string
  landmass: number
  seaLevel: number
  plateActivity: number
  axisTilt: number
  planetAge: number
  climateVariance: number
  worldStyle: number
}

/** Clamp value into 0–1 range. */
function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

/** Seeded PRNG. */
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

/** Base noise using sine; returns value in [-1, 1]. */
function baseNoise(rand: () => number, x: number, y: number): number {
  const r = Math.sin(x * 127.1 + y * 311.7 + rand() * 43758.5453)
  return (r - Math.floor(r)) * 2 - 1
}

/** Fractal Brownian Motion (FBM) noise. */
function fbmNoise(
  rand: () => number,
  x: number,
  y: number,
  freq: number,
  octaves: number,
  persistence: number,
): number {
  let amplitude = 1
  let maxAmp = 0
  let sum = 0
  let f = freq
  for (let i = 0; i < octaves; i++) {
    sum += baseNoise(rand, x * f, y * f) * amplitude
    maxAmp += amplitude
    amplitude *= persistence
    f *= 2
  }
  return sum / maxAmp
}

/** Default parameters. */
export function createDefaultGeneratorParams(): GeneratorParams {
  return {
    name: 'New World',
    width: 256,
    height: 128,
    seed: '',
    landmass: 55,
    seaLevel: 50,
    plateActivity: 50,
    axisTilt: 50,
    planetAge: 50,
    climateVariance: 50,
    worldStyle: 50,
  }
}

/**
 * Create an array of continent descriptors.  Each continent is an ellipse
 * defined by its center (u,v), radii (rx, ry) and rotation angle (radians).
 * Using a random ellipse as the starting shape gives a high degree of
 * variability and produces shapes that look like islands or continents [oai_citation:1‡medium.com](https://medium.com/procedural-emotions/shorelines-and-continents-2c94c8cd862c#:~:text=Then%20we%E2%80%99ll%20define%20a%20basic,areas%20included%20in%20the%20shape).
 */
function createContinents(
  rand: () => number,
  count: number,
): { u: number; v: number; rx: number; ry: number; angle: number }[] {
  const continents = []
  for (let i = 0; i < count; i++) {
    const u = rand() * 0.8 + 0.1
    const v = rand() * 0.8 + 0.1
    // base radius between 0.15 and 0.35
    const base = 0.15 + rand() * 0.2
    // ellipticity factor: 1 means circle, lower values more squashed
    const ellipticity = 0.6 + rand() * 0.4
    const rx = base
    const ry = base * ellipticity
    const angle = rand() * Math.PI * 2
    continents.push({ u, v, rx, ry, angle })
  }
  return continents
}

/**
 * Compute the base land height at UV by taking the maximum contribution
 * from all continents.  Each continent defines an ellipse; distance > 1 yields
 * no contribution.  We warp the distance exponent to control falloff.
 */
function computeContinentHeight(
  u: number,
  v: number,
  continents: { u: number; v: number; rx: number; ry: number; angle: number }[],
): number {
  let h = 0
  for (const c of continents) {
    // translate into continent space
    const dx = u - c.u
    const dy = v - c.v
    // rotate coordinates by negative angle
    const cos = Math.cos(c.angle)
    const sin = Math.sin(c.angle)
    const xr = dx * cos + dy * sin
    const yr = -dx * sin + dy * cos
    const dist = Math.sqrt(
      (xr / c.rx) * (xr / c.rx) + (yr / c.ry) * (yr / c.ry),
    )
    if (dist < 1) {
      // falloff exponent controls slope; 1.5 produces wide coasts
      const val = Math.pow(1 - dist, 1.5)
      if (val > h) h = val
    }
  }
  return clamp01(h)
}

/**
 * Main generator function.  Produces a World object with realistic landmass,
 * continents, mountains, erosion smoothing and climate‑driven biomes.
 */
export function generateWorldFromParams(params: GeneratorParams): World {
  const {
    name,
    width,
    height,
    seed,
    landmass,
    seaLevel,
    plateActivity,
    axisTilt,
    planetAge,
    climateVariance,
  } = params

  const rand = makeRandom(seed || 'worldwright')

  // Normalize sliders
  const landmass01 = clamp01(landmass / 100)
  const sea01 = clamp01(seaLevel / 100)
  const plate01 = clamp01(plateActivity / 100)
  const tilt01 = clamp01(axisTilt / 100)
  const age01 = clamp01(planetAge / 100)
  const climate01 = clamp01(climateVariance / 100)

  // Determine number of continents (3–6) influenced by landmass & plate activity
  const continentCount = Math.floor(3 + landmass01 * 2 + plate01 * 1)
  const continents = createContinents(rand, continentCount)

  // Separate noise generators for coast, mountains, temperature, moisture
  const coastRand = makeRandom(seed + '_coast')
  const mountRand = makeRandom(seed + '_mount')
  const tempRand = makeRandom(seed + '_temp')
  const moistRand = makeRandom(seed + '_moist')

  const cells: WorldCell[] = []
  const heights: number[] = []

  // Precompute heights & climate
  for (let y = 0; y < height; y++) {
    const v = y / Math.max(height - 1, 1)
    // Latitude band influences base temperature; tilt shifts hot band up/down
    const tiltOffset = (tilt01 - 0.5) * 0.5 // [-0.25, +0.25]
    const lat = clamp01(Math.abs(v - (0.5 + tiltOffset)) * 2)
    const baseTemp = 1 - lat // 1 at equator, 0 at poles

    for (let x = 0; x < width; x++) {
      const u = x / Math.max(width - 1, 1)

      // Base continent height from ellipses
      let h = computeContinentHeight(u, v, continents)

      // Coastline irregularity: multiply by coast noise (0.8–1.2)
      const coastNoise =
        (fbmNoise(coastRand, u, v, 1.5, 4, 0.5) + 1) * 0.5 // [0,1]
      h *= 0.8 + coastNoise * 0.4

      // Mountains: high‑frequency FBM; raise to power to create ridges
      const mountBase = (fbmNoise(mountRand, u, v, 8.0, 3, 0.5) + 1) * 0.5
      const mountHeight = Math.pow(mountBase, 2 + plate01 * 4) // sharper peaks with higher plateActivity
      h += mountHeight * (0.3 + plate01 * 0.5)

      // Clamp height
      h = clamp01(h)

      // Erosion smoothing: older planets have smoother terrain
      const erosion = age01 * 0.7 // up to 0.7 smoothing
      h = h * (1 - erosion) + 0.5 * erosion
      h = clamp01(h)

      heights.push(h)

      // Temperature & moisture noise
      const tempNoise =
        (fbmNoise(tempRand, u, v, 3.0, 4, 0.5) + 1) * 0.5 // [0,1]
      const temperature = clamp01(
        baseTemp + (tempNoise - 0.5) * 0.4 * climate01,
      )

      const moistNoise =
        (fbmNoise(moistRand, u, v, 3.5, 4, 0.5) + 1) * 0.5 // [0,1]
      const rainBand = 1 - Math.abs(v - 0.5) * 2 // equator wetter
      const moisture = clamp01(
        0.3 + rainBand * 0.5 + (moistNoise - 0.5) * 0.5 * climate01,
      )

      cells.push({
        x,
        y,
        baseHeight: h,
        temperature,
        moisture,
        biomeId: 'unknown',
      })
    }
  }

  // Compute sea‑level threshold by sorting heights and selecting quantile
  const sorted = [...heights].sort((a, b) => a - b)
  const targetWater = clamp01(1 - landmass01)
  let seaThreshold = sorted[Math.floor(targetWater * (sorted.length - 1))]
  // Adjust by slider ±0.3
  seaThreshold += (sea01 - 0.5) * 0.6
  seaThreshold = clamp01(seaThreshold)

  // Assign biomes and normalize land heights relative to sea level
  for (let i = 0; i < cells.length; i++) {
    const c = cells[i]
    if (c.baseHeight < seaThreshold) {
      c.biomeId = 'water'
      c.baseHeight = c.baseHeight - seaThreshold // negative for ocean shading
    } else {
      const hRel = (c.baseHeight - seaThreshold) / (1 - seaThreshold)
      c.baseHeight = hRel
      // Simple biome assignment by temperature/moisture
      if (c.temperature < 0.2) {
        c.biomeId = c.moisture < 0.3 ? 'tundra' : 'snow'
      } else if (c.temperature < 0.4) {
        c.biomeId = c.moisture < 0.4 ? 'steppe' : 'taiga'
      } else if (c.temperature < 0.7) {
        if (c.moisture < 0.3) c.biomeId = 'desert'
        else if (c.moisture < 0.5) c.biomeId = 'grassland'
        else c.biomeId = 'forest'
      } else {
        c.biomeId = c.moisture < 0.4 ? 'savanna' : 'rainforest'
      }
    }
  }

  const now = new Date().toISOString()
  const cellCount = cells.length

  const world: World = {
    id: '',
    name: name || 'New World',
    seed: seed || '',
    schemaVersion: CURRENT_WORLD_SCHEMA_VERSION,
    createdAt: now,
    updatedAt: now,
    width,
    height,
    seaLevel: seaThreshold,
    cells,
    editLayer: createEmptyEditLayer(cellCount),
    simLayer: createEmptySimLayer(cellCount),
    countries: [],
    cultures: [],
    cities: [],
    stickers: [],
  }

  return world
}

/**
 * Wrapper used when saving a named world.  Allows overriding the name.
 */
export function buildWorldFromParams(
  params: GeneratorParams,
  explicitName?: string,
): World {
  const world = generateWorldFromParams(params)
  const trimmed = explicitName?.trim()
  if (trimmed && trimmed.length > 0) {
    return { ...world, name: trimmed }
  }
  return world
}