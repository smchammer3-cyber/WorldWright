// ======================================================
// WorldWright Generator Core -- Steps 5F → 8D
// Continent shaping + plate approximation + mountains
// + coastline refinement & lake cleanup + land/sea calibration
// ======================================================

import { World, WorldCell as FullWorldCell } from './world'

export interface GeneratorParams {
  // For now this is a numeric preset selector (0 = Realistic, 1 = Fantasy, etc.)
  worldStyle: number
  // All slider values are 0–100 from the UI
  landmass: number      // more = more land
  seaLevel: number      // higher = more ocean
  climateVariance: number
  plateActivity: number // controls tectonic roughness
  axisTilt: number
  planetAge: number     // younger = rougher, older = smoother
}

interface GeneratedWorld {
  width: number
  height: number
  cells: { baseHeight: number }[]
  seaLevel: number      // normalized 0–1 sea threshold
}

// ------------------------------------------------------
// Defaults
// ------------------------------------------------------

export function createDefaultGeneratorParams(): GeneratorParams {
  return {
    worldStyle: 0,
    landmass: 50,
    seaLevel: 50,
    climateVariance: 50,
    plateActivity: 50,
    axisTilt: 40,
    planetAge: 50
  }
}

// ------------------------------------------------------
// Noise helpers
// ------------------------------------------------------

function makeNoise(width: number, height: number) {
  function hash(x: number, y: number, o: number): number {
    let h = x * 374761393 + y * 668265263 + o * 7000189
    h = (h ^ (h >> 13)) | 0
    h = Math.imul(h, 1274126177)
    h = (h ^ (h >> 16)) >>> 0
    return h / 4294967296
  }

  return {
    sample(x: number, y: number): number {
      const s0 = hash(x, y, 0)
      const s1 = hash(x >> 1, y >> 1, 1)
      const s2 = hash(x >> 2, y >> 2, 2)
      return (s0 + s1 * 0.5 + s2 * 0.25) / 1.75
    }
  }
}

function hash1(i: number): number {
  let h = i * 374761393
  h = (h ^ (h >> 13)) | 0
  h = Math.imul(h, 1274126177)
  h = (h ^ (h >> 16)) >>> 0
  return h / 4294967296
}

// ------------------------------------------------------
// Core terrain passes
// ------------------------------------------------------

function generateHeightField(w: number, h: number): number[] {
  const n = makeNoise(w, h)
  const arr = new Array<number>(w * h)
  for (let i = 0; i < arr.length; i++) {
    const x = i % w
    const y = Math.floor(i / w)
    arr[i] = n.sample(x, y)
  }
  return arr
}

function applyContinentMask(h: number[], w: number, H: number): number[] {
  const cy = H / 2
  const out = new Array<number>(h.length)
  for (let i = 0; i < h.length; i++) {
    const y = Math.floor(i / w)
    const ny = (y - cy) / cy      // -1..1
    const latBias = 1 - 0.4 * ny * ny  // ~0.6..1
    let v = h[i] * latBias
    if (v < 0) v = 0
    if (v > 1) v = 1
    out[i] = v
  }
  return out
}

function applyPlateOffsets(
  h: number[],
  w: number,
  H: number,
  plateActivity: number
): number[] {
  const plateCols = 8
  const plateRows = 4
  const plateCount = plateCols * plateRows
  const offsets = new Array<number>(plateCount)

  const activity = Math.max(0, Math.min(1, plateActivity / 100))
  const maxOffset = 0.25 + activity * 0.15 // 0.25..0.4

  for (let p = 0; p < plateCount; p++) {
    const r = hash1(p + 12345)
    const isOceanic = r < 0.45

    let base: number
    if (isOceanic) {
      base = -0.6 + r * 0.3 // deep plates
    } else {
      const rr = (r - 0.45) / 0.55
      base = 0.2 + rr * 0.6 // high plates
    }

    offsets[p] = base * maxOffset
  }

  const out = new Array<number>(h.length)

  for (let i = 0; i < h.length; i++) {
    const y = Math.floor(i / w)
    const x = i % w
    const gx = Math.min(plateCols - 1, Math.floor((x / w) * plateCols))
    const gy = Math.min(plateRows - 1, Math.floor((y / H) * plateRows))
    const pi = gy * plateCols + gx

    let v = h[i]
    v = v * 0.6 + (v + offsets[pi]) * 0.4
    if (v < 0) v = 0
    if (v > 1) v = 1
    out[i] = v
  }

  return out
}

function smoothHeightField(
  h: number[],
  w: number,
  H: number,
  iterations: number,
  strength: number
): number[] {
  let cur = h.slice()
  let nxt = new Array<number>(h.length)

  const it = Math.max(0, Math.min(12, iterations))
  const s = Math.max(0, Math.min(1, strength))

  for (let k = 0; k < it; k++) {
    for (let i = 0; i < cur.length; i++) {
      const y = Math.floor(i / w)
      const x = i % w

      const iN = Math.max(0, y - 1) * w + x
      const iS = Math.min(H - 1, y + 1) * w + x
      const iW = y * w + ((x - 1 + w) % w)
      const iE = y * w + ((x + 1) % w)

      const center = cur[i]
      const avg = (cur[iN] + cur[iS] + cur[iW] + cur[iE]) * 0.25

      nxt[i] = center * (1 - s) + avg * s
    }
    const tmp = cur
    cur = nxt
    nxt = tmp
  }

  return cur
}

/**
 * Mountain uplift along plate boundaries and highlands.
 * (Step 8C)
 */
function addMountains(
  h: number[],
  w: number,
  H: number,
  plateActivity: number
): number[] {
  const n = makeNoise(w, H)
  const rugged = Math.max(0, Math.min(1, plateActivity / 100))
  const out = new Array<number>(h.length)

  for (let i = 0; i < h.length; i++) {
    const y = Math.floor(i / w)
    const x = i % w
    const base = h[i]

    const boundaryNoise = n.sample(x >> 2, y >> 2)
    const elevationFactor = Math.pow(Math.max(0, base - 0.35), 1.5)
    const boundaryFactor = Math.pow(Math.max(0, boundaryNoise - 0.5), 2.0)

    const uplift =
      (elevationFactor * 0.6 + boundaryFactor * 1.4) *
      (0.15 + rugged * 0.1)

    let v = base + uplift
    if (v < 0) v = 0
    if (v > 1) v = 1
    out[i] = v
  }

  return out
}

/**
 * Emphasize deep basins and raised continents.
 */
function shapeBasinsAndContinents(
  h: number[],
  seaBias: number,
  plateActivity: number
): number[] {
  const out = new Array<number>(h.length)
  const rugged = Math.max(0, Math.min(1, plateActivity / 100))

  for (let i = 0; i < h.length; i++) {
    let v = h[i]
    const mid = 0.5

    if (v < mid) {
      const d = v / mid
      const exp = 1.2 + seaBias * 0.8
      v = mid * Math.pow(d, exp)
    } else {
      const d = (v - mid) / (1 - mid)
      const exp = 0.9 - rugged * 0.3
      const raised = Math.pow(d, exp)
      v = mid + (1 - mid) * raised
    }

    if (v < 0) v = 0
    if (v > 1) v = 1
    out[i] = v
  }

  return out
}

/**
 * 8D: Coastline refinement and lake cleanup.
 * - Fills tiny lakes
 * - Removes one-cell islands
 * - Soft-smooths near the shoreline
 */
function refineCoastlines(
  h: number[],
  w: number,
  H: number,
  seaLevel: number
): number[] {
  const margin = 0.015
  const isWater = (v: number) => v < seaLevel

  const pass1 = h.slice()

  // Remove tiny lakes and tiny islands based on 4-neighbor counts.
  for (let i = 0; i < h.length; i++) {
    const y = Math.floor(i / w)
    const x = i % w

    const iN = Math.max(0, y - 1) * w + x
    const iS = Math.min(H - 1, y + 1) * w + x
    const iW = y * w + ((x - 1 + w) % w)
    const iE = y * w + ((x + 1) % w)

    const wc =
      (isWater(h[iN]) ? 1 : 0) +
      (isWater(h[iS]) ? 1 : 0) +
      (isWater(h[iW]) ? 1 : 0) +
      (isWater(h[iE]) ? 1 : 0)

    const v = h[i]

    if (isWater(v) && wc <= 1) {
      // Tiny lake in land → fill it.
      pass1[i] = seaLevel + margin
    } else if (!isWater(v) && wc >= 3) {
      // Tiny island in ocean → sink it.
      pass1[i] = seaLevel - margin
    }
  }

  // Gentle smoothing near the shoreline for nicer coasts.
  const pass2 = pass1.slice()

  for (let i = 0; i < pass1.length; i++) {
    const v = pass1[i]
    if (Math.abs(v - seaLevel) > 0.05) continue

    const y = Math.floor(i / w)
    const x = i % w

    const iN = Math.max(0, y - 1) * w + x
    const iS = Math.min(H - 1, y + 1) * w + x
    const iW = y * w + ((x - 1 + w) % w)
    const iE = y * w + ((x + 1) % w)

    const avg =
      (pass1[iN] + pass1[iS] + pass1[iW] + pass1[iE] + v) / 5

    pass2[i] = avg
  }

  return pass2
}

// ------------------------------------------------------
// Main generator (used by preview + buildWorldFromParams)
// ------------------------------------------------------

export function generateWorldFromParams(params: GeneratorParams): GeneratedWorld {
  const w = 128
  const H = 128

  // 1) Base noise
  let h = generateHeightField(w, H)

  // 2) Continent mask (latitudinal bias)
  h = applyContinentMask(h, w, H)

  // 3) Plate offsets (8A/8B)
  h = applyPlateOffsets(h, w, H, params.plateActivity)

  // 4) Smoothing / pseudo-erosion
  const plateFactor = params.plateActivity / 100
  const maxExtraIterations = 4
  const iterations = 2 + Math.round((1 - plateFactor) * maxExtraIterations)
  h = smoothHeightField(h, w, H, iterations, 0.6)

  // 5) Planet age shaping
  const ageFactor = params.planetAge / 100
  h = h.map(v => {
    let val = v
    if (ageFactor < 0.5) {
      const k = 1 + (0.5 - ageFactor) * 0.7
      val = Math.pow(val, 1 / k)
    } else {
      const k = 1 + (ageFactor - 0.5) * 0.7
      val = Math.pow(val, k)
    }
    if (val < 0) val = 0
    if (val > 1) val = 1
    return val
  })

  // 6) Mountain uplift (8C)
  h = addMountains(h, w, H, params.plateActivity)

  // 7) Basins vs continents shaping
  const seaBias = (params.seaLevel - 50) / 100
  h = shapeBasinsAndContinents(h, seaBias, params.plateActivity)

  // 8) Initial land/sea calibration (provisional sea level)
  const landBias = (params.landmass - 50) / 100
  const seaSliderBias = (params.seaLevel - 50) / 100
  let targetLandFraction = 0.5 + landBias * 0.4 - seaSliderBias * 0.4
  if (targetLandFraction < 0.15) targetLandFraction = 0.15
  if (targetLandFraction > 0.85) targetLandFraction = 0.85

  let sorted = h.slice().sort((a, b) => a - b)
  let index = Math.floor(sorted.length * (1 - targetLandFraction))
  let seaLevel = sorted[index]
  if (seaLevel < 0.05) seaLevel = 0.05
  if (seaLevel > 0.95) seaLevel = 0.95

  // 9) Coastline refinement (8D)
  h = refineCoastlines(h, w, H, seaLevel)

  // 10) Recompute sea level after refinement to keep land fraction near target
  sorted = h.slice().sort((a, b) => a - b)
  index = Math.floor(sorted.length * (1 - targetLandFraction))
  seaLevel = sorted[index]
  if (seaLevel < 0.05) seaLevel = 0.05
  if (seaLevel > 0.95) seaLevel = 0.95

  const cells = h.map(v => ({ baseHeight: v }))

  return {
    width: w,
    height: H,
    cells,
    seaLevel
  }
}

// ------------------------------------------------------
// World builder (used when player hits "Save World")
// ------------------------------------------------------

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
      simBiomeId: null,
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