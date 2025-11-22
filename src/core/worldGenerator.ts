// ======================================================
// WorldWright Generator Core -- Blueprint Step 5F
// Large Continent Shaping + World builder
// ======================================================

import { World, WorldCell as FullWorldCell } from './world'

export interface GeneratorParams {
  // For now this is a numeric preset selector (0 = Realistic, 1 = Fantasy, etc.)
  worldStyle: number
  // All slider values are expressed as 0–100 from the UI
  landmass: number // 0–100 (more = more land)
  seaLevel: number // 0–100 (higher = more ocean)
  climateVariance: number // reserved for future
  plateActivity: number // reserved for future
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
    axisTilt: 30,
    planetAge: 60
  }
}

// ---------- Internal helpers ----------

// NOTE: For now this just uses Math.random(). A seeded PRNG can replace this later.
function random(seedOffset = 0): number {
  return Math.random() + seedOffset * 0.000001
}

// Simple layered noise: not physically perfect, but good enough for v1
function generateHeightField(width: number, height: number): number[] {
  const arr = new Array<number>(width * height)

  for (let i = 0; i < arr.length; i++) {
    // Three layers of noise blended together
    let v = random(0)
    v += random(1) * 0.5
    v += random(2) * 0.25
    v /= 1.75
    arr[i] = v
  }

  return arr
}

/**
 * Apply a large-scale continent mask so that
 * - The center of the map tends to be land
 * - The edges tend to fall off into ocean
 */
function applyContinentMask(heights: number[], width: number, height: number): number[] {
  const result = new Array<number>(heights.length)
  const cx = width / 2
  const cy = height / 2

  for (let i = 0; i < heights.length; i++) {
    const x = i % width
    const y = Math.floor(i / width)

    const dx = (x - cx) / (width * 0.35)
    const dy = (y - cy) / (height * 0.35)
    const distSq = dx * dx + dy * dy

    // Stronger in the middle, fades to 0 near edges
    const mask = Math.max(0, 1.15 - distSq * 1.2)

    let v = heights[i] * mask
    // Clamp to [0, 1]
    if (v < 0) v = 0
    if (v > 1) v = 1

    result[i] = v
  }

  return result
}

/**
 * Core terrain generation used both for preview and for building real worlds.
 * This keeps the "large continent" shaping from the blueprint.
 */
export function generateWorldFromParams(params: GeneratorParams): GeneratedWorld {
  const width = 128
  const height = 128

  // 1) Base noise
  let heights = generateHeightField(width, height)

  // 2) Shape into a rough continent layout
  heights = applyContinentMask(heights, width, height)

  // 3) Apply slider influences
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
export function buildWorldFromParams(params: GeneratorParams, name: string): World {
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