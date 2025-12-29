// WorldWright – World Generator (V1.3 Spine)
//
// Goal: produce a deterministic, coherent "starter world" WorldBrain object
// that the rest of the app (Create/Sim/Render) can rely on.

import {
  WorldBrain,
  Cell,
  PlateType,
  BoundaryType,
} from '../worldSchema'

// -----------------------------
// Types
// -----------------------------

export interface GeneratorConfig {
  // reserved for future expansion (profiles, etc.)
}

export interface GeneratorParams {
  name: string
  width: number
  height: number
  seed: string

  // 0–100: more land vs water (future)
  landmass: number

  // 0–100: bias the final sea level a bit
  seaLevel: number

  // 0–100: more tectonic activity → more mountains (affects height now)
  plateActivity: number

  // 0–100: stronger axis tilt → stronger pole/equator contrast (affects temp now)
  axisTilt: number

  // 0–100: older planet → smoother terrain (affects height smoothing now)
  planetAge: number

  // 0–100: climate noise strength (affects temp/rain now)
  climateVariance: number

  // 0–100: baseline temperature (affects temp now)
  temperature: number

  // 0–100: baseline humidity (affects rain now)
  humidity: number

  // 0–100: style selector (future; currently stored)
  worldStyle: number
}

export function createDefaultGeneratorParams(): GeneratorParams {
  return {
    name: 'New World',
    width: 256,
    height: 128,
    seed: String(Math.floor(Math.random() * 1_000_000_000)),

    landmass: 50,
    seaLevel: 50,
    plateActivity: 50,
    axisTilt: 50,
    planetAge: 50,
    climateVariance: 40,
    temperature: 50,
    humidity: 50,
    worldStyle: 25,
  }
}

// -----------------------------
// Deterministic RNG helpers
// -----------------------------

function hashToUnit(seed: number) {
  const x = Math.sin(seed * 99991.1337) * 43758.5453123
  return x - Math.floor(x)
}

function makeRng(seedStr: string) {
  // cheap deterministic rng from string
  let h = 2166136261
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  let s = h >>> 0
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0
    return (s & 0xfffffff) / 0xfffffff
  }
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

// -----------------------------
// Noise helpers (very simple)
// -----------------------------

function valueNoise2D(x: number, y: number, seedN: number) {
  // deterministic value noise from continuous coords
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi

  const h00 = hashToUnit(seedN + xi * 374761393 + yi * 668265263)
  const h10 = hashToUnit(seedN + (xi + 1) * 374761393 + yi * 668265263)
  const h01 = hashToUnit(seedN + xi * 374761393 + (yi + 1) * 668265263)
  const h11 = hashToUnit(seedN + (xi + 1) * 374761393 + (yi + 1) * 668265263)

  const sx = xf * xf * (3 - 2 * xf)
  const sy = yf * yf * (3 - 2 * yf)

  const ix0 = lerp(h00, h10, sx)
  const ix1 = lerp(h01, h11, sx)
  return lerp(ix0, ix1, sy) * 2 - 1 // -1..1
}

function fbm(x: number, y: number, seedN: number, octaves: number, lacunarity = 2.0, gain = 0.5) {
  let amp = 1
  let freq = 1
  let sum = 0
  let norm = 0
  for (let i = 0; i < octaves; i++) {
    sum += valueNoise2D(x * freq, y * freq, seedN + i * 1013) * amp
    norm += amp
    amp *= gain
    freq *= lacunarity
  }
  return sum / (norm || 1)
}

// -----------------------------
// Main generator
// -----------------------------

export function generateWorld(params: GeneratorParams, _config?: GeneratorConfig): WorldBrain {
  return generateWorldFromParams(params)
}

export function generateWorldFromParams(params: GeneratorParams): WorldBrain {
  const rng = makeRng(params.seed)

  const width = Math.max(16, Math.floor(params.width))
  const height = Math.max(8, Math.floor(params.height))

  // Normalize knobs
  const seaLevelBias = lerp(-0.18, 0.22, clamp01(params.seaLevel / 100))
  const plateAmp = lerp(0.25, 1.35, clamp01(params.plateActivity / 100))
  const ageSmooth = lerp(0.0, 0.55, clamp01(params.planetAge / 100)) // 0 young, 1 old
  const baseTemp = lerp(0.25, 0.75, clamp01(params.temperature / 100))
  const baseHum = lerp(0.20, 0.85, clamp01(params.humidity / 100))
  const tilt = lerp(0.10, 0.80, clamp01(params.axisTilt / 100))
  const climateVar = lerp(0.05, 0.55, clamp01(params.climateVariance / 100))

  const seedN = Math.floor(rng() * 1e9)

  const cells: Cell[] = new Array(width * height)

  // Height field
  for (let y = 0; y < height; y++) {
    const v = y / (height - 1)
    for (let x = 0; x < width; x++) {
      const u = x / (width - 1)
      const i = y * width + x

      // Base tectonic-ish height
      const h0 =
        fbm(u * 3.0, v * 2.0, seedN + 11, 5) * 0.55 +
        fbm(u * 8.0, v * 6.0, seedN + 97, 3) * 0.25

      const mountains = fbm(u * 12.0, v * 10.0, seedN + 333, 4) * 0.35 * plateAmp

      let baseHeight = (h0 + mountains) * 0.85

      // "Old planet" smoothing: reduce extremes
      if (ageSmooth > 0) {
        baseHeight = lerp(baseHeight, Math.tanh(baseHeight), ageSmooth)
      }

      // Climate bands
      const lat = (v - 0.5) * 2 // -1..1
      const equatorWarm = 1 - Math.abs(lat)
      const tiltEffect = 1 - Math.pow(Math.abs(lat), lerp(1.0, 0.55, tilt))
      const bandTemp = clamp01(baseTemp * 0.55 + equatorWarm * 0.35 + tiltEffect * 0.20)

      const nTemp = fbm(u * 6.0, v * 6.0, seedN + 555, 4) * climateVar
      const temperature = clamp01(bandTemp + nTemp)

      // Rainfall: humidity baseline + noise + orographic proxy (higher → slightly drier interior)
      const nRain = fbm(u * 5.0, v * 5.0, seedN + 777, 4) * climateVar
      const heightDry = clamp01((baseHeight + 0.2) * 0.6)
      const rainfall = clamp01(baseHum + nRain - heightDry * 0.18)

      // Simple biome ids (placeholder-ish but deterministic)
      // 0 ocean, 1 desert, 2 grass, 3 forest, 4 tundra, 5 snow, 6 mountain
      const seaLevel = seaLevelBias
      const isOcean = baseHeight < seaLevel

      let baseBiomeId = 2
      if (isOcean) baseBiomeId = 0
      else if (baseHeight > 0.65) baseBiomeId = temperature < 0.35 ? 5 : 6
      else if (temperature < 0.25) baseBiomeId = 4
      else if (rainfall < 0.25) baseBiomeId = 1
      else if (rainfall > 0.60) baseBiomeId = 3
      else baseBiomeId = 2

      cells[i] = {
        baseHeight,
        editHeightDelta: 0,
        simHeightDelta: 0,

        temperature,
        rainfall,

        baseBiomeId,
        editBiomeId: baseBiomeId,

        countryId: null,
        cultureId: null,
        plateId: 0,

        // hydrology stub fields expected by schema
        flowDir: 0,
        flowAccum: 0,
        riverId: null,
        lakeId: null,

        seaLevel,
      } as any
    }
  }

  // Minimal plates/rivers arrays to satisfy schema expectations
  const plates = [
    {
      id: 0,
      type: PlateType.Continental,
      boundaryType: BoundaryType.None,
      driftX: 0,
      driftY: 0,
    },
  ] as any

  const now = Date.now()
  const worldId = `w_${now}_${Math.floor(rng() * 1e9)}`

  const world: WorldBrain = {
    schemaVersion: 1,
    metadata: {
      id: worldId,
      name: params.name,
      createdAt: now,
      updatedAt: now,
      seed: params.seed,
      gridWidth: width,
      gridHeight: height,
      worldStyle: params.worldStyle,
    } as any,

    gridWidth: width as any,
    gridHeight: height as any,

    cells,

    plates: plates as any,
    rivers: [] as any,

    countries: [],
    cultures: [],
    cultureRegions: [],
    cities: [],
    locations: [],
    stickers: [],
  } as any

  return world
}