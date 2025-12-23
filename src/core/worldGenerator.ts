// ===============================================================
// WorldWright Generator Core (Planet Spine V1.2)
// Multi-continent height + climate generator for WorldWright.
//
// Goals for this version:
// - Produce believable, non-"blob" continents with varied shapes.
// - Support multiple high-level world styles: earthlike, fantasy,
//   stylized, and alien.
// - Keep the generator fully deterministic from (seed + params).
// - Provide height, temperature, and moisture fields suitable for
//   Create + Sim modes to read without knowing generator internals.
// - Respect all existing sliders in GeneratorParams.
//
// This file is intentionally self-contained and pure. It only
// depends on the World schema and helpers from world.ts.
// ===============================================================

import {
  World,
  WorldCell,
  CURRENT_WORLD_SCHEMA_VERSION,
  createEmptyEditLayer,
  createEmptySimLayer,
} from './world'

// --------------------------------------------------------
// Public parameters (UI → generator)
// --------------------------------------------------------

export interface GeneratorParams {
  name: string
  width: number
  height: number
  seed: string

  // 0–100: more land vs water
  landmass: number

  // 0–100: bias the final sea level a bit
  seaLevel: number

  // 0–100: more tectonic activity → more mountains
  plateActivity: number

  // 0–100: stronger axis tilt → more extreme poles/seasons
  axisTilt: number

  // 0–100: older planet → more erosion / smoother terrain
  planetAge: number

  // 0–100: how "wild" the climate patterns can be
  climateVariance: number

  // 0–100: style selector (see WorldStyleMode below)
  //  0–25  → earthlike
  // 25–50  → fantasy
  // 50–75  → stylized
  // 75–100 → alien
  worldStyle: number
}

// High-level style presets (mapped from worldStyle 0–100)
type WorldStyleMode = 'earthlike' | 'fantasy' | 'stylized' | 'alien'

// --------------------------------------------------------
// Utility helpers
// --------------------------------------------------------

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function hashString(seed: string): number {
  let h = 2166136261 >>> 0
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/**
 * Simple deterministic RNG from a string seed.
 * Same seed → same sequence → same world.
 */
function makeRandom(seed: string) {
  let h = hashString(seed || 'worldwright')
  return () => {
    // xorshift32
    h ^= h << 13
    h ^= h >>> 17
    h ^= h << 5
    return ((h >>> 0) & 0xffffffff) / 0xffffffff
  }
}

// Map numeric worldStyle [0,100] → named style preset.
function resolveWorldStyle(worldStyle: number): WorldStyleMode {
  const t = clamp01(worldStyle / 100)
  if (t < 0.25) return 'earthlike'
  if (t < 0.5) return 'fantasy'
  if (t < 0.75) return 'stylized'
  return 'alien'
}

// --------------------------------------------------------
// 2D noise helpers (value noise + FBM)
// --------------------------------------------------------

function baseNoise(rand: () => number, x: number, y: number): number {
  // Hash lattice coordinates, then interpolate.
  const x0 = Math.floor(x)
  const y0 = Math.floor(y)
  const x1 = x0 + 1
  const y1 = y0 + 1

  const sx = x - x0
  const sy = y - y0

  const n00 = lattice(x0, y0)
  const n10 = lattice(x1, y0)
  const n01 = lattice(x0, y1)
  const n11 = lattice(x1, y1)

  const ix0 = lerp(n00, n10, smoothStep(sx))
  const ix1 = lerp(n01, n11, smoothStep(sx))
  return lerp(ix0, ix1, smoothStep(sy))

  // Local lattice based only on coordinates, not rand() state,
  // so calls are deterministic and independent.
  function lattice(ix: number, iy: number): number {
    const key = `${ix}|${iy}`
    let h = hashString(key)
    h ^= h << 13
    h ^= h >>> 17
    h ^= h << 5
    const val = ((h >>> 0) & 0xffffffff) / 0xffffffff
    return val * 2 - 1 // [-1,1]
  }
}

function smoothStep(t: number): number {
  return t * t * (3 - 2 * t)
}

function fbmNoise(
  // rand is only used for seeding via hashString; we don't mutate it here.
  _rand: () => number,
  x: number,
  y: number,
  freq: number,
  octaves: number,
  persistence: number,
): number {
  let amp = 1
  let sum = 0
  let maxAmp = 0
  let f = freq
  for (let i = 0; i < octaves; i++) {
    sum += baseNoise(_rand, x * f, y * f) * amp
    maxAmp += amp
    amp *= persistence
    f *= 2
  }
  return maxAmp > 0 ? sum / maxAmp : 0
}

// --------------------------------------------------------
// Continent model
// --------------------------------------------------------

interface Continent {
  u: number
  v: number
  radius: number
  ellipticity: number
  angle: number
  warpX: number
  warpY: number
}

/**
 * Default UI parameters.
 */
export function createDefaultGeneratorParams(): GeneratorParams {
  return {
    name: 'New World',
    width: 256,
    height: 128,
    seed: 'WorldWright',
    landmass: 55,
    seaLevel: 50,
    plateActivity: 50,
    axisTilt: 35,
    planetAge: 50,
    climateVariance: 50,
    worldStyle: 25, // default: earthlike band
  }
}

/**
 * Build an array of continents. We vary:
 * - number of continents based on landmass + style
 * - radius (some big, some small)
 * - eccentricity & rotation
 * - warp direction (for domain warping)
 */
function createContinents(
  rand: () => number,
  land01: number,
  plate01: number,
  style01: number,
  styleMode: WorldStyleMode,
): Continent[] {
  // Base count: 2–5. More for fragmented styles.
  const baseCount = 2 + Math.floor(land01 * 2 + plate01 * 0.5)

  let extraIslands = 0
  switch (styleMode) {
    case 'earthlike':
      extraIslands = Math.floor(style01 * 1.0)
      break
    case 'fantasy':
      extraIslands = Math.floor(style01 * 2.0) + 1
      break
    case 'stylized':
      extraIslands = Math.floor(style01 * 3.0) + 2
      break
    case 'alien':
      extraIslands = Math.floor(style01 * 4.0) + 3
      break
  }

  const total =
    clamp01(land01 * 1.25) > 0.6 ? baseCount + extraIslands : baseCount

  const continents: Continent[] = []

  for (let i = 0; i < total; i++) {
    // Slightly constrain to avoid poles and edges only.
    const u = rand() * 0.9 + 0.05
    const v = rand() * 0.9 + 0.05

    const isMicro = i >= baseCount

    // Style-dependent base radius
    let baseRadius: number
    switch (styleMode) {
      case 'earthlike':
        baseRadius = isMicro ? 0.06 + rand() * 0.04 : 0.18 + rand() * 0.18
        break
      case 'fantasy':
        baseRadius = isMicro ? 0.05 + rand() * 0.05 : 0.15 + rand() * 0.16
        break
      case 'stylized':
        baseRadius = isMicro ? 0.03 + rand() * 0.04 : 0.12 + rand() * 0.10
        break
      case 'alien':
        baseRadius = isMicro ? 0.03 + rand() * 0.03 : 0.10 + rand() * 0.10
        break
    }

    // Ellipticity & rotation
    const eccentricity = 0.4 + rand() * 0.6 // 0.4–1.0
    const angle = rand() * Math.PI * 2

    const theta = rand() * Math.PI * 2
    const warpX = Math.cos(theta)
    const warpY = Math.sin(theta)

    continents.push({
      u,
      v,
      radius: baseRadius,
      ellipticity: eccentricity,
      angle,
      warpX,
      warpY,
    })
  }

  return continents
}

/**
 * Compute base continent height at (u,v) using domain warping.
 * We combine contributions from several nearby continents to avoid
 * a single "round blob" dominating each plate.
 */
function computeContinentHeight(
  u: number,
  v: number,
  continents: Continent[],
  warpNoise: (x: number, y: number) => number,
  style01: number,
  styleMode: WorldStyleMode,
): number {
  if (continents.length === 0) return 0

  let h = 0
  let count = 0

  // Style-dependent warp strength
  let minWarp = 0.10
  let maxWarp = 0.22
  switch (styleMode) {
    case 'earthlike':
      minWarp = 0.08
      maxWarp = 0.18
      break
    case 'fantasy':
      minWarp = 0.10
      maxWarp = 0.24
      break
    case 'stylized':
      minWarp = 0.14
      maxWarp = 0.30
      break
    case 'alien':
      minWarp = 0.16
      maxWarp = 0.36
      break
  }

  for (const c of continents) {
    const warpVal = warpNoise(u, v) // [-1,1]
    const warpScale = lerp(minWarp, maxWarp, style01)
    const du = u - (c.u + c.warpX * warpVal * warpScale)
    const dv = v - (c.v + c.warpY * warpVal * warpScale)

    // Rotate by continent angle
    const cos = Math.cos(c.angle)
    const sin = Math.sin(c.angle)
    const xr = du * cos + dv * sin
    const yr = -du * sin + dv * cos

    const rx = c.radius
    const ry = c.radius * c.ellipticity

    // Guard against absurdly tiny radii
    const safeRx = Math.max(rx, 0.03)
    const safeRy = Math.max(ry, 0.03)

    const dist = Math.sqrt(
      (xr / safeRx) * (xr / safeRx) + (yr / safeRy) * (yr / safeRy),
    )
    if (dist < 1.2) {
      // Softer edge; value falls off toward 0.
      const t = clamp01(dist / 1.1)
      const val = Math.pow(1 - t, 2.2)
      h += val
      count++
    }
  }

  if (count === 0) return 0
  // Normalize combined continents -- multiple overlaps give stronger cores.
  const base = h / count
  return clamp01(base * 1.4)
}

// --------------------------------------------------------
// Climate helpers
// --------------------------------------------------------

function computeLatitude(v: number, tilt01: number): number {
  // 0 at equator, 1 at poles, with tilt shifting the equator band.
  const tiltOffset = (tilt01 - 0.5) * 0.5
  return clamp01(Math.abs(v - (0.5 + tiltOffset)) * 2)
}

/**
 * Temperature and moisture are intentionally simple but plausible.
 */
function computeClimateForCell(
  u: number,
  v: number,
  tilt01: number,
  climate01: number,
  tempRand: () => number,
  moistRand: () => number,
): { temperature: number; moisture: number } {
  const lat = computeLatitude(v, tilt01)
  const baseTemp = 1 - lat // equator = 1, poles = 0

  const tempNoise =
    (fbmNoise(tempRand, u * 2.0, v * 2.0, 2.0, 3, 0.5) + 1) * 0.5
  const temperature = clamp01(
    lerp(baseTemp, baseTemp * 0.7 + tempNoise * 0.3, climate01),
  )

  const moistNoise =
    (fbmNoise(moistRand, u * 3.0, v * 3.0, 2.5, 3, 0.5) + 1) * 0.5

  const rainBand = 1 - Math.abs(v - 0.5) * 2 // equatorial rainy belt
  const baseMoist = clamp01(0.25 + rainBand * 0.6)
  const moisture = clamp01(
    lerp(baseMoist, baseMoist * 0.5 + moistNoise * 0.5, climate01),
  )

  return { temperature, moisture }
}

// --------------------------------------------------------
// World generation
// --------------------------------------------------------

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
    worldStyle,
  } = params

  const rand = makeRandom(seed || 'worldwright')

  const land01 = clamp01(landmass / 100)
  const sea01 = clamp01(seaLevel / 100)
  const plate01 = clamp01(plateActivity / 100)
  const tilt01 = clamp01(axisTilt / 100)
  const age01 = clamp01(planetAge / 100)
  const climate01 = clamp01(climateVariance / 100)
  const style01 = clamp01(worldStyle / 100)
  const styleMode = resolveWorldStyle(worldStyle)

  const continents = createContinents(rand, land01, plate01, style01, styleMode)

  const coastRand = makeRandom(seed + '_coast')
  const mountainRand = makeRandom(seed + '_mount')
  const warpRand = makeRandom(seed + '_warp')
  const tempRand = makeRandom(seed + '_temp')
  const moistRand = makeRandom(seed + '_moist')

  const warpNoise = (x: number, y: number) =>
    fbmNoise(warpRand, x * 0.8, y * 0.8, 1.0, 2, 0.5)

  const cells: WorldCell[] = []
  const heights: number[] = []

  // Build core height + climate fields
  for (let y = 0; y < height; y++) {
    const v = y / Math.max(height - 1, 1)

    for (let x = 0; x < width; x++) {
      const u = x / Math.max(width - 1, 1)

      // Base height from continents
      let h = computeContinentHeight(
        u,
        v,
        continents,
        warpNoise,
        style01,
        styleMode,
      )

      // Coast detail
      const coast =
        (fbmNoise(coastRand, u * 2.2, v * 2.2, 2.0, 3, 0.5) + 1) * 0.5
      h *= lerp(0.7, 1.35, coast)

      // Mountains
      const mount =
        (fbmNoise(mountainRand, u * 7.5, v * 7.5, 2.8, 3, 0.5) + 1) * 0.5

      let mountExponent = 2.3 + plate01 * 3.0
      switch (styleMode) {
        case 'earthlike':
          mountExponent = 2.0 + plate01 * 2.5
          break
        case 'fantasy':
          mountExponent = 2.3 + plate01 * 3.2
          break
        case 'stylized':
          mountExponent = 2.5 + plate01 * 3.8
          break
        case 'alien':
          mountExponent = 1.8 + plate01 * 4.2
          break
      }

      const mountStrength = Math.pow(mount, mountExponent)
      const mountScaleBase = styleMode === 'earthlike' ? 0.18 : 0.25
      h += mountStrength * lerp(mountScaleBase, 0.7, plate01)

      h = clamp01(h)

      // Age-based erosion: older → more mid-range heights.
      const erosion = age01 * 0.75
      h = h * (1 - erosion) + 0.5 * erosion

      // Slight style-based compression: alien worlds get a bit more contrast.
      const worldContrast =
        styleMode === 'alien' ? 1.15 : styleMode === 'stylized' ? 1.05 : 1.0
      h = clamp01((h - 0.5) * worldContrast + 0.5)

      heights.push(h)

      const { temperature, moisture } = computeClimateForCell(
        u,
        v,
        tilt01,
        climate01,
        tempRand,
        moistRand,
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

  // Decide sea level based on target water fraction and slider bias.
  const sorted = [...heights].sort((a, b) => a - b)
  const targetWater = clamp01(1 - land01)
  let seaThreshold =
    sorted[Math.floor(targetWater * (sorted.length - 1) || 0)]

  // Bias sea level with user slider (sea01).
  seaThreshold += (sea01 - 0.5) * 0.6
  seaThreshold = clamp01(seaThreshold)

  // Normalize land heights and tag water.
  let landSum = 0
  let landCount = 0
  let tempSum = 0
  let moistSum = 0

  for (let i = 0; i < cells.length; i++) {
    const c = cells[i]
    tempSum += c.temperature
    moistSum += c.moisture

    if (c.baseHeight < seaThreshold) {
      c.biomeId = 'water'
      // Map water to [seaThreshold-0.3, seaThreshold)
      const rel = clamp01((c.baseHeight - seaThreshold) / 0.3 + 1)
      c.baseHeight = seaThreshold - rel * 0.3
    } else {
      const hRel = (c.baseHeight - seaThreshold) / (1 - seaThreshold || 1)
      const landHeight = clamp01(hRel)
      c.baseHeight = landHeight
      landSum += landHeight
      landCount++
    }
  }

  const landFraction = landCount > 0 ? landCount / cells.length : 0
  const avgTemperature = cells.length > 0 ? tempSum / cells.length : 0
  const avgMoisture = cells.length > 0 ? moistSum / cells.length : 0

  const cellCount = cells.length

  const editLayer = createEmptyEditLayer(cellCount)
  const simLayer = createEmptySimLayer(cellCount)

  const now = new Date().toISOString()
  const finalName = (name || 'New World').trim() || 'New World'

  const world: World = {
    id: `world-${hashString(seed).toString(36)}`,
    name: finalName,
    seed: seed || 'worldwright',
    schemaVersion: CURRENT_WORLD_SCHEMA_VERSION,
    createdAt: now,
    updatedAt: now,

    width,
    height,

    landFraction,
    avgTemperature,
    avgMoisture,

    seaLevel: seaThreshold,

    cells,
    editLayer,
    simLayer,

    countries: [],
    cultures: [],
    cities: [],
    stickers: [],
  }

  return world
}

// Convenience wrapper: allow explicit name override without changing params.
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