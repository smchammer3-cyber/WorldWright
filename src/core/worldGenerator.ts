// ======================================================
// WorldWright Generator Core -- Steps 5F → 8B
// Continent Shaping + Plate/Erosion Approx + Land/Sea calibration
// + Basin vs Continent emphasis
// ======================================================

import { World, WorldCell as FullWorldCell } from './world'

export interface GeneratorParams {
  // For now this is a numeric preset selector (0 = Realistic, 1 = Fantasy, etc.)
  worldStyle: number
  // All slider values are expressed as 0–100 from the UI
  landmass: number // 0–100 (more = more land)
  seaLevel: number // 0–100 (higher = more ocean)
  climateVariance: number // reserved for future
  plateActivity: number // used for continent roughness in Step 7/8
  axisTilt: number // reserved for future biome/climate logic
  planetAge: number // 0–100 (younger = rougher, older = smoother)
}

interface GeneratedWorld {
  width: number
  height: number
  cells: { baseHeight: number }[]
  seaLevel: number // normalized 0–1 sea threshold used by renderer/sim
}

/**
 * Default generator params used by the GeneratorScreen.
 */
export function createDefaultGeneratorParams(): GeneratorParams {
  return {
    worldStyle: 0, // 0 = Realistic preset (future use)
    landmass: 50, // balanced land/sea
    seaLevel: 50, // mid sea level
    climateVariance: 50,
    plateActivity: 50,
    axisTilt: 40, // Earth-like default tilt
    planetAge: 50
  }
}

/**
 * Hash-based RNG so that terrain noise is stable
 * for a given (x, y, octave) but does not require storing a huge array.
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
      // 3–octave fBm-style noise
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
 * Simple one-dimensional hash for plate offsets.
 */
function hash1(i: number): number {
  let h = i * 374761393
  h = (h ^ (h >> 13)) | 0
  h = Math.imul(h, 1274126177)
  h = (h ^ (h >> 16)) >>> 0
  return h / 4294967296
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

    if (v < 0) v = 0
    if (v > 1) v = 1

    result[i] = v
  }

  return result
}

/**
 * Apply coarse "plate" offsets: big regions of uplift vs deep ocean.
 * This is a cheap tectonic approximation.
 */
function applyPlateOffsets(
  heights: number[],
  width: number,
  height: number,
  plateActivity: number
): number[] {
  const plateCols = 8
  const plateRows = 4
  const plateCount = plateCols * plateRows
  const offsets = new Array<number>(plateCount)

  const activity = Math.max(0, Math.min(1, plateActivity / 100))
  // How strong plate contrasts are: higher activity -> more dramatic plates.
  const maxOffset = 0.25 + activity * 0.15 // 0.25..0.4

  for (let p = 0; p < plateCount; p++) {
    const r = hash1(p + 12345)
    const isOceanic = r < 0.45

    // Basic pattern:
    // - Oceanic plates sit lower
    // - Continental plates sit higher
    let base: number
    if (isOceanic) {
      // deeper than average
      base = -0.6 + r * 0.3 // roughly -0.6..-0.3
    } else {
      // higher than average
      const rr = (r - 0.45) / 0.55
      base = 0.2 + rr * 0.6 // roughly 0.2..0.8
    }

    offsets[p] = base * maxOffset
  }

  const result = new Array<number>(heights.length)

  for (let y = 0; y < height; y++) {
    const gy = Math.min(
      plateRows - 1,
      Math.floor((y / height) * plateRows)
    )

    for (let x = 0; x < width; x++) {
      const gx = Math.min(
        plateCols - 1,
        Math.floor((x / width) * plateCols)
      )
      const plateIndex = gy * plateCols + gx
      const offset = offsets[plateIndex]

      const i = y * width + x
      let v = heights[i]

      // Blend the offset so we don't just hard-step heights.
      v = v * 0.6 + (v + offset) * 0.4

      if (v < 0) v = 0
      if (v > 1) v = 1

      result[i] = v
    }
  }

  return result
}

/**
 * Smooth the height field to merge tiny islands into
 * larger landmasses. This is a cheap approximation of
 * erosion / plate adjustment.
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
 * Emphasize deep ocean basins vs raised continents.
 * This reduces the "lots of lakes" look by pushing
 * low values lower and high values higher, with a softer
 * mid band around the would-be coastlines.
 */
function shapeBasinsAndContinents(
  heights: number[],
  seaLevelBias: number,
  plateActivity: number
): number[] {
  const result = new Array<number>(heights.length)

  // seaLevelBias: -0.5..+0.5 (from seaLevel slider)
  // plateActivity: 0..1
  const seaEmphasis = Math.max(0, Math.min(1, 0.5 + seaLevelBias))
  const ruggedness = Math.max(0, Math.min(1, plateActivity / 100))

  for (let i = 0; i < heights.length; i++) {
    let v = heights[i]

    // Base adjustment:
    // - Below mid: deepen oceans more aggressively
    // - Above mid: lift continents and compress near coast band
    const mid = 0.5
    if (v < mid) {
      const d = v / mid // 0..1
      // Exponent > 1 deepens basins; seaEmphasis controls how strong.
      const exp = 1.2 + seaEmphasis * 0.8
      v = mid * Math.pow(d, exp)
    } else {
      const d = (v - mid) / (1 - mid) // 0..1
      // Exponent < 1 lifts highlands; ruggedness keeps it from being too smooth.
      const exp = 0.9 - ruggedness * 0.3
      const raised = Math.pow(d, exp)
      v = mid + (1 - mid) * raised
    }

    if (v < 0) v = 0
    if (v > 1) v = 1

    result[i] = v
  }

  return result
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

  // 3) Coarse plate offsets: big regions of uplift vs deep ocean.
  heights = applyPlateOffsets(heights, width, height, params.plateActivity)

  // 4) Erosion-style smoothing: merge tiny islands into coherent continents.
  const plateFactor = params.plateActivity / 100 // 0–1
  const maxExtraIterations = 4
  const iterations =
    2 + Math.round((1 - plateFactor) * maxExtraIterations) // 2..6
  heights = smoothHeightField(heights, width, height, iterations, 0.6)

  // 5) Apply planet age curve (younger = rougher, older = smoother)
  const ageFactor = params.planetAge / 100 // 0–1

  heights = heights.map(v => {
    let val = v

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

  // 6) Basin vs continent emphasis (Step 8B).
  const seaBias = (params.seaLevel - 50) / 100 // -0.5..+0.5
  heights = shapeBasinsAndContinents(heights, seaBias, params.plateActivity)

  // 7) Land/sea calibration based on sliders.
  // Instead of guessing a sea level formula, we decide how much
  // land we *want* and then pick a threshold so that roughly that
  // fraction of cells are land.

  const landBias = (params.landmass - 50) / 100
  const seaSliderBias = (params.seaLevel - 50) / 100

  // Base target is 50% land, then landmass pushes it up/down
  // and sea level pushes it the opposite way.
  let targetLandFraction = 0.5 + landBias * 0.4 - seaSliderBias * 0.4

  // Clamp to something sane: avoid 100% land or 100% ocean.
  if (targetLandFraction < 0.15) targetLandFraction = 0.15
  if (targetLandFraction > 0.85) targetLandFraction = 0.85

  const sorted = heights.slice().sort((a, b) => a - b)
  const index = Math.floor(sorted.length * (1 - targetLandFraction))

  let seaLevel = sorted[index]
  if (seaLevel < 0.05) seaLevel = 0.05
  if (seaLevel > 0.95) seaLevel = 0.95

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