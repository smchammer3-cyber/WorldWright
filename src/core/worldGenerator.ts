// ======================================================
// WorldWright Generator Core -- Blueprint Step 5F / 7A
// Large Continent Shaping + Plate/Erosion Approximation
// ======================================================

import { World, WorldCell as FullWorldCell } from './world'

export interface GeneratorParams {
  // For now this is a numeric preset selector (0 = Realistic, 1 = Fantasy, etc.)
  worldStyle: number
  // All slider values are expressed as 0–100 from the UI
  landmass: number // 0–100 (more = more land)
  seaLevel: number // 0–100 (higher = more ocean)
  climateVariance: number // reserved for future
  plateActivity: number // used for continent roughness in Step 7
  axisTilt: number // reserved for future
  planetAge: number // reserved for future
}

interface GeneratedWorld {
  width: number
  height: number
  cells: { baseHeight: number }[]
  seaLevel: number // normalized 0–1 sea threshold
}

/**
 * Create a reasonable starting set of generator parameters.
 * This is what the GeneratorScreen uses for its initial state.
 */
export function createDefaultGeneratorParams(): GeneratorParams {
  return {
    worldStyle: 0, // 0 = Realistic preset (future use)
    landmass: 50, // balanced land/sea
    seaLevel: 50, // mid sea level
    climateVariance: 50,
    plateActivity: 50,
    axisTilt: 40,
    planetAge: 50
  }
}

/**
 * A tiny hash-based RNG so that terrain noise is stable
 * for a given (x, y) but does not require storing a huge array.
 */
function makeNoise(width: number, height: number) {
  function hash(x: number, y: number, octave: number): number {
    let h = x * 374761393 + y * 668265263 + octave * 7000189
    h = (h ^ (h >> 13)) | 0
    h = Math.imul(h, 1274126177)
    h = (h ^ (h >> 16)) >>> 0
    // Convert to [0, 1)
    return h / 4294967296
  }

  return {
    sample(x: number, y: number): number {
      // 3–octave fBm noise
      const s0 = hash(x, y, 0)
      const s1 = hash(Math.floor(x / 2), Math.floor(y / 2), 1)
      const s2 = hash(Math.floor(x / 4), Math.floor(y / 4), 2)

      let v = s0
      v += s1 * 0.5
      v += s2 * 0.25
      v /= 1.75

      return v
    }
  }
}

/**
 * Generate a base height field in [0, 1] using simple fractal noise.
 */
function generateHeightField(width: number, height: number): number[] {
  const noise = makeNoise(width, height)
  const arr = new Array<number>(width * height)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x
      arr[i] = noise.sample(x, y)
    }
  }

  return arr
}

/**
 * Apply a large-scale continent mask so that
 * - There is more land near mid-latitudes
 * - Continents can wrap all the way around the globe
 *
 * Step 6C update:
 * We bias only by latitude so that land can appear on any longitude.
 */
function applyContinentMask(
  heights: number[],
  width: number,
  height: number
): number[] {
  const result = new Array<number>(heights.length)
  const cy = height / 2

  for (let i = 0; i < heights.length; i++) {
    const y = Math.floor(i / width)

    // Normalized latitude in [-1, 1] (0 = equator, ±1 = poles)
    const ny = (y - cy) / cy

    // Soft equatorial bias: more land near the middle, but
    // do NOT kill land at the poles completely.
    const latBias = 1 - 0.4 * ny * ny // between ~0.6 and 1

    let v = heights[i] * latBias

    // Clamp to [0, 1]
    if (v < 0) v = 0
    if (v > 1) v = 1

    result[i] = v
  }

  return result
}

/**
 * Smooth the height field a bit to merge tiny islands into
 * larger landmasses. This is a cheap approximation of
 * erosion / plate adjustment for Step 7.
 */
function smoothHeightField(
  heights: number[],
  width: number,
  height: number,
  iterations: number,
  strength: number
): number[] {
  let current = heights.slice()
  let next = new Array<number>(heights.length)

  const clampedIterations = Math.max(0, Math.min(12, iterations))
  const s = Math.max(0, Math.min(1, strength))

  for (let iter = 0; iter < clampedIterations; iter++) {
    for (let y = 0; y < height; y++) {
      const yN = Math.max(0, y - 1)
      const yS = Math.min(height - 1, y + 1)

      for (let x = 0; x < width; x++) {
        const xW = (x - 1 + width) % width
        const xE = (x + 1) % width

        const i = y * width + x
        const iN = yN * width + x
        const iS = yS * width + x
        const iW = y * width + xW
        const iE = y * width + xE

        const center = current[i]
        const neighborAvg =
          (current[iN] + current[iS] + current[iW] + current[iE]) / 4

        const blended = center * (1 - s) + neighborAvg * s

        next[i] = blended
      }
    }

    const tmp = current
    current = next
    next = tmp
  }

  return current
}

/**
 * Core terrain generation used both for preview and for building real worlds.
 */
export function generateWorldFromParams(params: GeneratorParams): GeneratedWorld {
  const width = 128
  const height = 128

  // 1) Base noise
  let heights = generateHeightField(width, height)

  // 2) Shape into a rough continent layout (latitudinal bias)
  heights = applyContinentMask(heights, width, height)

  // 3) Step 7: cheap plate / erosion approximation.
  // We smooth small-scale noise so we get fewer speckled islands
  // and more coherent continent blobs. PlateActivity controls
  // how "rough" the continents are:
  //
  //   low plateActivity  -> more smoothing (older, calmer world)
  //   high plateActivity -> less smoothing (younger, more rugged)
  const plateFactor = params.plateActivity / 100 // 0–1
  const maxExtraIterations = 5
  const iterations =
    2 + Math.round((1 - plateFactor) * maxExtraIterations) // 2..7
  heights = smoothHeightField(heights, width, height, iterations, 0.6)

  // 4) Apply slider influences for sea level and planet age
  const baseSea = params.seaLevel / 100 // 0–1 sea level
  const landmassShift = (params.landmass - 50) / 200 // -0.25..+0.25

  const seaLevel = Math.min(0.95, Math.max(0.05, baseSea - landmassShift))

  heights = heights.map(v => {
    let val = v

    // Very young planets = sharper extremes, older = smoother
    const ageFactor = params.planetAge / 100 // 0–1
    if (ageFactor < 0.5) {
      // Younger → exaggerate contrasts slightly
      const k = 1 + (0.5 - ageFactor) * 0.7
      val = Math.pow(val, 1 / k)
    } else {
      // Older → smooth things out
      const k = 1 + (ageFactor - 0.5) * 0.7
      val = Math.pow(val, k)
    }

    if (val < 0) val = 0
    if (val > 1) val = 1

    return val
  })

  const cells = heights.map(v => ({
    baseHeight: v
  }))

  return {
    width,
    height,
    cells,
    seaLevel
  }
}

/**
 * Build a full World object (WorldBrain type) from the generator parameters.
 * This is used when the player hits "Save World".
 */
export function buildWorldFromParams(
  params: GeneratorParams,
  name: string
): World {
  const generated = generateWorldFromParams(params)
  const { width, height, cells, seaLevel } = generated

  const now = new Date().toISOString()
  const seed = Math.floor(Math.random() * 1_000_000_000)
  const id = `world-${seed}-${Date.now()}`

  const fullCells: FullWorldCell[] = new Array(width * height)

  for (let i = 0; i < cells.length; i++) {
    const x = i % width
    const y = Math.floor(i / width)
    const baseHeight = cells[i].baseHeight

    fullCells[i] = {
      x,
      y,
      baseHeight,
      editHeightDelta: 0,
      simHeightDelta: 0,
      baseBiomeId: 0,
      editBiomeId: null,
      countryId: null,
      cultureId: null,
      cityId: null
    }
  }

  const world: World = {
    id,
    name,
    width,
    height,
    seed,
    seaLevel,
    cells: fullCells,
    countries: [],
    cultures: [],
    cities: [],
    createdAt: now,
    updatedAt: now
  }

  return world
}