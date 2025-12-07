// ===============================================================
// WorldWright Generator Core (V4 – warped continents & coastlines)
// Uses domain warping to distort elliptical continents, producing
// irregular shorelines without resorting to full plate simulations.
// ===============================================================

import {
  World,
  WorldCell,
  CURRENT_WORLD_SCHEMA_VERSION,
  createEmptyEditLayer,
  createEmptySimLayer,
} from './world'

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

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

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

function baseNoise(rand: () => number, x: number, y: number): number {
  const r = Math.sin(x * 127.1 + y * 311.7 + rand() * 43758.5453)
  return (r - Math.floor(r)) * 2 - 1
}

function fbmNoise(
  rand: () => number,
  x: number,
  y: number,
  freq: number,
  octaves: number,
  persistence: number,
): number {
  let amp = 1
  let maxAmp = 0
  let sum = 0
  let f = freq
  for (let i = 0; i < octaves; i++) {
    sum += baseNoise(rand, x * f, y * f) * amp
    maxAmp += amp
    amp *= persistence
    f *= 2
  }
  return sum / maxAmp
}

// Create default parameters
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

// Continent descriptor
interface Continent {
  u: number
  v: number
  rx: number
  ry: number
  angle: number
  warpX: number
  warpY: number
}

/**
 * Build an array of continents.  Each one has a random ellipse plus
 * its own warp directions so that each continent warps differently.
 * Random ellipses with eccentricity and rotation give variability and
 * produce island‑ or continent‑like shapes [oai_citation:2‡medium.com](https://medium.com/procedural-emotions/shorelines-and-continents-2c94c8cd862c#:~:text=Then%20we%E2%80%99ll%20define%20a%20basic,areas%20included%20in%20the%20shape).
 */
function createContinents(rand: () => number, count: number): Continent[] {
  const continents: Continent[] = []
  for (let i = 0; i < count; i++) {
    const u = rand() * 0.8 + 0.1
    const v = rand() * 0.8 + 0.1
    const base = 0.15 + rand() * 0.25 // radius 0.15–0.40
    const ellipticity = 0.5 + rand() * 0.5 // 0.5–1.0
    const rx = base
    const ry = base * ellipticity
    const angle = rand() * Math.PI * 2
    // warp directions: random unit vector
    const theta = rand() * Math.PI * 2
    const warpX = Math.cos(theta)
    const warpY = Math.sin(theta)
    continents.push({ u, v, rx, ry, angle, warpX, warpY })
  }
  return continents
}

/**
 * Compute base continent height at (u,v) using domain warping.
 * We offset (u,v) by a low‑frequency noise along a continent’s warp
 * direction.  This distorts the ellipse, creating irregular coasts.
 */
function computeContinentHeight(
  u: number,
  v: number,
  continents: Continent[],
  warpNoise: (x: number, y: number) => number,
): number {
  let h = 0
  for (const c of continents) {
    // domain warp: offset UV along warp vector by noise
    const warpVal = warpNoise(u, v) // [-1,1]
    const du = c.u - u + c.warpX * warpVal * 0.2
    const dv = c.v - v + c.warpY * warpVal * 0.2

    // rotate coordinates
    const cos = Math.cos(c.angle)
    const sin = Math.sin(c.angle)
    const xr = du * cos + dv * sin
    const yr = -du * sin + dv * cos

    const dist = Math.sqrt(
      (xr / c.rx) * (xr / c.rx) + (yr / c.ry) * (yr / c.ry),
    )
    if (dist < 1) {
      const val = Math.pow(1 - dist, 1.8) // steeper falloff
      if (val > h) h = val
    }
  }
  return clamp01(h)
}

/**
 * The main world generator using warped continents, mountains, erosion
 * and climate.  Domain warping distorts continent boundaries to avoid
 * perfectly round shapes and create peninsulas and bays.
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

  const land01 = clamp01(landmass / 100)
  const sea01 = clamp01(seaLevel / 100)
  const plate01 = clamp01(plateActivity / 100)
  const tilt01 = clamp01(axisTilt / 100)
  const age01 = clamp01(planetAge / 100)
  const climate01 = clamp01(climateVariance / 100)

  // Number of continents: 3–6
  const continentCount = Math.floor(3 + land01 * 2 + plate01)
  const continents = createContinents(rand, continentCount)

  // Random generators for noise layers
  const coastRand = makeRandom(seed + '_coast')
  const mountainRand = makeRandom(seed + '_mount')
  const warpRand = makeRandom(seed + '_warp')
  const tempRand = makeRandom(seed + '_temp')
  const moistRand = makeRandom(seed + '_moist')

  // Warp noise: low frequency & few octaves
  function warpNoise(x: number, y: number): number {
    return fbmNoise(warpRand, x * 1.5, y * 1.5, 1.5, 3, 0.5)
  }

  const cells: WorldCell[] = []
  const heights: number[] = []

  for (let y = 0; y < height; y++) {
    const v = y / Math.max(height - 1, 1)
    // Temperature base from latitude & tilt
    const tiltOffset = (tilt01 - 0.5) * 0.5
    const lat = clamp01(Math.abs(v - (0.5 + tiltOffset)) * 2)
    const baseTemp = 1 - lat

    for (let x = 0; x < width; x++) {
      const u = x / Math.max(width - 1, 1)

      // Base height from warped continents
      let h = computeContinentHeight(u, v, continents, warpNoise)

      // Irregular coastlines: multiply (not add) by coast noise
      const coastVal =
        (fbmNoise(coastRand, u * 2.0, v * 2.0, 2.0, 3, 0.5) + 1) * 0.5 // [0,1]
      h *= 0.7 + coastVal * 0.6 // 0.7–1.3

      // Mountains: high‑frequency noise
      const mountVal =
        (fbmNoise(mountainRand, u * 8.0, v * 8.0, 3.0, 3, 0.5) + 1) * 0.5
      const mountain = Math.pow(mountVal, 2.5 + plate01 * 3) // steeper peaks with more plate activity
      h += mountain * (0.25 + plate01 * 0.45)

      h = clamp01(h)

      // Age‑based erosion
      const erosion = age01 * 0.7
      h = h * (1 - erosion) + 0.5 * erosion
      h = clamp01(h)

      heights.push(h)

      // Climate noise
      const tempNoise =
        (fbmNoise(tempRand, u * 3.5, v * 3.5, 3.5, 4, 0.5) + 1) * 0.5
      const temperature = clamp01(baseTemp + (tempNoise - 0.5) * 0.4 * climate01)

      const moistNoise =
        (fbmNoise(moistRand, u * 3.5, v * 3.5, 3.5, 4, 0.5) + 1) * 0.5
      const rainBand = 1 - Math.abs(v - 0.5) * 2
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

  // Determine sea level by height quantile
  const sorted = [...heights].sort((a, b) => a - b)
  const waterFraction = clamp01(1 - land01)
  let seaThreshold = sorted[Math.floor(waterFraction * (sorted.length - 1))]
  seaThreshold += (sea01 - 0.5) * 0.6
  seaThreshold = clamp01(seaThreshold)

  // Assign biomes & normalize land heights
  for (let i = 0; i < cells.length; i++) {
    const c = cells[i]
    if (c.baseHeight < seaThreshold) {
      c.biomeId = 'water'
      c.baseHeight = c.baseHeight - seaThreshold
    } else {
      const hRel = (c.baseHeight - seaThreshold) / (1 - seaThreshold)
      c.baseHeight = hRel
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