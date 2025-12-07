// ==========================================================
// WorldWright Generator Core (V2 / Step 6B – realistic terrain)
// Realistic heightfield with tectonics, climate & biomes
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
 * Sliders are 0–100; we normalize them internally.
 */
export interface GeneratorParams {
  name: string
  width: number
  height: number
  seed: string

  /** Fraction of land in the world: 0 = mostly ocean, 100 = mostly land */
  landmass: number
  /** Adjusts the global sea level up or down (0–100, 50 = neutral) */
  seaLevel: number
  /** Controls mountain roughness & height (0–100, higher = more mountains) */
  plateActivity: number
  /** Tilt of the planet’s axis (0–100, affects temperature distribution) */
  axisTilt: number
  /** Planet age: younger worlds have sharper terrain, older worlds are smoother */
  planetAge: number
  /** Variability of climate (0 = uniform climate, 100 = extreme variation) */
  climateVariance: number
  /** Style/theme slider reserved for future variants */
  worldStyle: number
}

/** Helper to clamp a value into the 0–1 range. */
function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

/** Pseudo-random PRNG generator based on seed (from previous code). */
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

/** Simple base noise used for FBM. */
function baseNoise(rand: () => number, x: number, y: number): number {
  // Lightly scrambled value using sine and a seeded random offset
  const r = Math.sin(x * 127.1 + y * 311.7 + rand() * 43758.5453)
  return (r - Math.floor(r)) * 2 - 1 // in [-1, 1]
}

/**
 * Fractal Brownian Motion (FBM) noise – combines multiple octaves of baseNoise.
 * freq: base frequency; octaves: number of layers; persistence: amplitude falloff per octave.
 */
function fbmNoise(
  rand: () => number,
  x: number,
  y: number,
  freq: number,
  octaves: number,
  persistence: number,
): number {
  let amplitude = 1
  let maxAmplitude = 0
  let noiseSum = 0
  let f = freq

  for (let i = 0; i < octaves; i++) {
    noiseSum += baseNoise(rand, x * f, y * f) * amplitude
    maxAmplitude += amplitude
    amplitude *= persistence
    f *= 2
  }
  return noiseSum / maxAmplitude
}

/** Create a default set of generator parameters. */
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
 * Primary world generator: builds a realistic world with continents, mountains, climate and biomes.
 */
export function generateWorldFromParams(params: GeneratorParams): World {
  const {
    name,
    width,
    height,
    seed,
    landmass: landmassSlider,
    seaLevel: seaLevelSlider,
    plateActivity,
    axisTilt,
    planetAge,
    climateVariance,
  } = params

  const rand = makeRandom(seed || 'worldwright')

  // Normalize sliders to 0–1
  const landmass01 = clamp01(landmassSlider / 100)
  const seaSlider01 = clamp01(seaLevelSlider / 100)
  const plates01 = clamp01(plateActivity / 100)
  const tilt01 = clamp01(axisTilt / 100)
  const age01 = clamp01(planetAge / 100)
  const climate01 = clamp01(climateVariance / 100)

  // Determine number of continents (2–5) based on landmass & plate activity
  const continentCount = Math.floor(2 + landmass01 * 3) // 2–5 continents
  const continents: { u: number; v: number; radius: number }[] = []
  for (let i = 0; i < continentCount; i++) {
    const u = rand() * 0.9 + 0.05
    const v = rand() * 0.9 + 0.05
    const radius = 0.12 + rand() * 0.2 // 0.12–0.32
    continents.push({ u, v, radius })
  }

  // Precompute FBM seeds for height, mountains, moisture & temperature
  const heightRand = makeRandom(seed + '_height')
  const mountainRand = makeRandom(seed + '_mount')
  const moistureRand = makeRandom(seed + '_moist')
  const tempRand = makeRandom(seed + '_temp')

  const cells: WorldCell[] = []
  const heights: number[] = []

  // Generate base heights and collect for sea-level quantile
  for (let y = 0; y < height; y++) {
    const v = y / (height - 1 || 1)

    // Compute base temperature by latitude and axis tilt
    // tilt01 shifts the hot band up/down; we adjust by ±0.25 at most
    const tiltOffset = (tilt01 - 0.5) * 0.5 // [-0.25, +0.25]
    const lat = clamp01(Math.abs(v - (0.5 + tiltOffset)) * 2)
    const baseTemp = 1 - lat // 1 at equator, 0 at poles

    for (let x = 0; x < width; x++) {
      const u = x / (width - 1 || 1)

      // Find the strongest continent influence for this UV point
      let continentInfluence = 0
      for (const c of continents) {
        const dx = u - c.u
        const dy = v - c.v
        const dist = Math.sqrt(dx * dx + dy * dy)
        const influence = clamp01(1 - dist / c.radius)
        if (influence > continentInfluence) continentInfluence = influence
      }

      // Fractal noise for hills and valleys – coarse to fine
      const baseFbm = fbmNoise(heightRand, u, v, 2.0, 4, 0.5) // [-1, 1]
      const mountFbm = fbmNoise(mountainRand, u, v, 8.0, 3, 0.5) // [-1, 1]

      // Plate activity boosts mountains amplitude
      const mountainHeight =
        ((mountFbm + 1) / 2) ** (3 + plates01 * 3) // sharper peaks at higher plateActivity
      const mountainFactor = plates01 * 0.4 + 0.1 // 0.1–0.5

      // Final base height combines continent influence, hills and mountains
      let h =
        continentInfluence +
        baseFbm * 0.3 + // gentle hills
        mountainHeight * mountainFactor // mountains
      h = clamp01(h)

      // Smooth world with erosion depending on planet age: older => smoother
      // We simulate by interpolating towards average (0.5)
      const erosion = age01 * 0.6 // up to 0.6 smoothing
      h = h * (1 - erosion) + 0.5 * erosion
      h = clamp01(h)

      heights.push(h)

      // Climate: temperature & moisture vary with noise and climateVariance
      const tempNoise = fbmNoise(tempRand, u, v, 4.0, 4, 0.5) // [-1, 1]
      const temperature = clamp01(
        baseTemp + tempNoise * 0.3 * climate01, // climate variability
      )

      const moistNoise = fbmNoise(moistureRand, u, v, 3.0, 3, 0.5) // [-1, 1]
      // Moisture base decreases near poles & equator; peaks at mid latitudes (band of rain)
      const rainBand = 1 - Math.abs(v - 0.5) * 2 // 1 at equator, 0 at poles
      const moisture = clamp01(
        0.3 +
          rainBand * 0.5 +
          moistNoise * 0.4 * climate01, // climate variability
      )

      const cell: WorldCell = {
        x,
        y,
        baseHeight: h,
        temperature,
        moisture,
        biomeId: 'unknown', // will be assigned after sea-level & climate logic
      }
      cells.push(cell)
    }
  }

  // Sea-level calculation: sort heights & pick quantile based on landmass slider
  const sortedHeights = [...heights].sort((a, b) => a - b)
  const targetWaterFraction = clamp01(1 - landmass01) // landmass=0.6 => 0.4 water
  const idx = Math.floor(targetWaterFraction * (sortedHeights.length - 1))
  let baseSeaLevel = sortedHeights[idx]
  // Nudged by sea-level slider ±0.2
  baseSeaLevel += (seaSlider01 - 0.5) * 0.4
  baseSeaLevel = clamp01(baseSeaLevel)

  // Assign biomes & finalize heights (land or water)
  for (let i = 0; i < cells.length; i++) {
    const c = cells[i]
    const h = c.baseHeight
    // Land/water decision
    if (h < baseSeaLevel) {
      c.biomeId = 'water'
      // Lower water cells slightly (for shading)
      c.baseHeight = h - 0.05
    } else {
      // Land: determine biome by temperature & moisture
      if (c.temperature < 0.2) {
        // cold region
        c.biomeId = c.moisture < 0.3 ? 'tundra' : 'snow'
      } else if (c.temperature < 0.4) {
        c.biomeId = c.moisture < 0.4 ? 'steppe' : 'taiga'
      } else if (c.temperature < 0.7) {
        if (c.moisture < 0.3) c.biomeId = 'desert'
        else if (c.moisture < 0.5) c.biomeId = 'grassland'
        else c.biomeId = 'forest'
      } else {
        // warm region
        c.biomeId = c.moisture < 0.4 ? 'savanna' : 'rainforest'
      }
      // Raise land cells slightly (for shading)
      c.baseHeight = (h - baseSeaLevel) / (1 - baseSeaLevel)
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
    seaLevel: baseSeaLevel,
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
 * Convenience wrapper used by UI when saving a named world.
 * If explicitName is provided and not blank, it overrides the name in params.
 */
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