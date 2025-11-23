// ======================================================
// WorldWright Generator Core -- Steps 5F → 8C
// Continent Shaping + Plate/Erosion Approx + Land/Sea calibration
// + Basin vs Continent emphasis + Mountain Uplift
// ======================================================

import { World, WorldCell as FullWorldCell } from './world'

export interface GeneratorParams {
  worldStyle: number
  landmass: number
  seaLevel: number
  climateVariance: number
  plateActivity: number
  axisTilt: number
  planetAge: number
}

interface GeneratedWorld {
  width: number
  height: number
  cells: { baseHeight: number }[]
  seaLevel: number
}

// ---------------- Noise Utilities ----------------

function makeNoise(width: number, height: number) {
  function hash(x: number, y: number, octave: number): number {
    let h = x * 374761393 + y * 668265263 + octave * 7000189
    h = (h ^ (h >> 13)) | 0
    h = Math.imul(h, 1274126177)
    h = (h ^ (h >> 16)) >>> 0
    return h / 4294967296
  }
  return {
    sample(x: number, y: number): number {
      const s0 = hash(x, y, 0)
      const s1 = hash(Math.floor(x / 2), Math.floor(y / 2), 1)
      const s2 = hash(Math.floor(x / 4), Math.floor(y / 4), 2)
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

// ---------------- Generation Steps ----------------

function generateHeightField(width: number, height: number): number[] {
  const noise = makeNoise(width, height)
  return Array.from({ length: width * height }, (_, i) =>
    noise.sample(i % width, Math.floor(i / width))
  )
}

function applyContinentMask(heights: number[], width: number, height: number): number[] {
  const cy = height / 2
  return heights.map((v, i) => {
    const y = Math.floor(i / width)
    const ny = (y - cy) / cy
    const latBias = 1 - 0.4 * ny * ny
    const val = v * latBias
    return Math.max(0, Math.min(1, val))
  })
}

function applyPlateOffsets(
  heights: number[], width: number, height: number,
  plateActivity: number
): number[] {
  const result = new Array<number>(heights.length)
  const plateCols = 8, plateRows = 4
  const plateCount = plateCols * plateRows
  const offsets = new Array<number>(plateCount)
  const activity = Math.max(0, Math.min(1, plateActivity / 100))
  const maxOffset = 0.25 + activity * 0.15

  for (let p = 0; p < plateCount; p++) {
    const r = hash1(p + 12345)
    const isOceanic = r < 0.45
    const base = isOceanic
      ? -0.6 + r * 0.3
      : 0.2 + ((r - 0.45) / 0.55) * 0.6
    offsets[p] = base * maxOffset
  }

  for (let i = 0; i < heights.length; i++) {
    const y = Math.floor(i / width)
    const x = i % width
    const gx = Math.min(plateCols - 1, Math.floor((x / width) * plateCols))
    const gy = Math.min(plateRows - 1, Math.floor((y / height) * plateRows))
    const px = gy * plateCols + gx
    const offset = offsets[px]
    let v = heights[i]
    v = v * 0.6 + (v + offset) * 0.4
    result[i] = Math.max(0, Math.min(1, v))
  }

  return result
}

function smoothHeightField(
  heights: number[], width: number, height: number,
  iterations: number, strength: number
): number[] {
  let current = heights.slice()
  const next = new Array<number>(heights.length)
  const iter = Math.max(0, Math.min(12, iterations))
  const s = Math.max(0, Math.min(1, strength))

  for (let k = 0; k < iter; k++) {
    for (let i = 0; i < current.length; i++) {
      const y = Math.floor(i / width)
      const x = i % width
      const iN = Math.max(0, y - 1) * width + x
      const iS = Math.min(height - 1, y + 1) * width + x
      const iW = y * width + ((x - 1 + width) % width)
      const iE = y * width + ((x + 1) % width)
      const center = current[i]
      const avg = (current[iN] + current[iS] + current[iW] + current[iE]) / 4
      next[i] = center * (1 - s) + avg * s
    }
    current = next.slice()
  }
  return current
}

// NEW for 8C: Mountain Uplift at Plate Boundaries
function addMountains(heights: number[], width: number, height: number): number[] {
  const result = new Array<number>(heights.length)
  const noise = makeNoise(width, height)

  for (let i = 0; i < heights.length; i++) {
    const v = heights[i]
    const y = Math.floor(i / width)
    const x = i % width

    const n = noise.sample(Math.floor(x / 4), Math.floor(y / 4))

    let uplift = Math.pow(v, 1.6) * Math.pow(n + 0.2, 2.0)

    result[i] = Math.min(1, Math.max(0, v + uplift * 0.18))
  }
  return result
}

// Basin vs continent shaping retained from 8B
function shapeBasinsAndContinents(
  heights: number[], seaBias: number,
  plateActivity: number
): number[] {
  const res = new Array<number>(heights.length)
  const rugged = Math.min(1, plateActivity / 100)
  for (let i = 0; i < heights.length; i++) {
    const v = heights[i]
    if (v < 0.5) {
      const d = v / 0.5
      res[i] = 0.5 * Math.pow(d, 1.4 + seaBias * 0.6)
    } else {
      const d = (v - 0.5) / 0.5
      res[i] = 0.5 + 0.5 * Math.pow(d, 0.9 - rugged * 0.25)
    }
    res[i] = Math.max(0, Math.min(1, res[i]))
  }
  return res
}

// ---------------- Main Generator ----------------

export function generateWorldFromParams(params: GeneratorParams): GeneratedWorld {
  const width = 128
  const height = 128

  let h = generateHeightField(width, height)
  h = applyContinentMask(h, width, height)
  h = applyPlateOffsets(h, width, height, params.plateActivity)
  h = smoothHeightField(h, width, height, 3, 0.6)
  h = addMountains(h, width, height) // 🌋 8C!
  const seaBias = (params.seaLevel - 50) / 100
  h = shapeBasinsAndContinents(h, seaBias, params.plateActivity)

  // Land/sea calibration
  const landBias = (params.landmass - 50) / 100
  let targetLand = 0.5 + landBias * 0.4 - seaBias * 0.3
  targetLand = Math.max(0.15, Math.min(0.85, targetLand))
  const sorted = h.slice().sort((a, b) => a - b)
  const index = Math.floor(sorted.length * (1 - targetLand))
  let seaLevel = sorted[index]
  seaLevel = Math.max(0.05, Math.min(0.95, seaLevel))

  return {
    width,
    height,
    cells: h.map(v => ({ baseHeight: v })),
    seaLevel
  }
}

// Build World Data Format
export function buildWorldFromParams(params: GeneratorParams, name: string): World {
  const g = generateWorldFromParams(params)
  const now = new Date().toISOString()
  const id = `world-${Math.floor(Math.random() * 1e9)}-${Date.now()}`
  const fullCells: FullWorldCell[] = new Array(g.cells.length)

  for (let i = 0; i < g.cells.length; i++) {
    fullCells[i] = {
      x: i % g.width,
      y: Math.floor(i / g.width),
      baseHeight: g.cells[i].baseHeight,
      editHeightDelta: 0,
      simHeightDelta: 0,
      baseBiomeId: 0,
      editBiomeId: null,
      countryId: null,
      cultureId: null,
      cityId: null
    }
  }

  return {
    id,
    name,
    width: g.width,
    height: g.height,
    seed: Math.floor(Math.random() * 1e9),
    seaLevel: g.seaLevel,
    cells: fullCells,
    countries: [],
    cultures: [],
    cities: [],
    createdAt: now,
    updatedAt: now
  }
}