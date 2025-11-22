// ============================================
// WorldWright Generator Core (Blueprint Step 5)
// Parameter model + basic terrain + biome logic
// ============================================

import { World, WorldCell } from './world'
import { createId } from './worldStorage'

export type WorldStyle = 'realistic' | 'fantasy' | 'scifi'

export interface GeneratorParams {
  worldStyle: WorldStyle
  landmass: number // 0–100
  seaLevel: number // 0–100
  climateVariance: number // 0–100
  plateActivity: number // 0–100
  axisTilt: number // 0–100
  planetAge: number // 0–100
}

/**
 * Default slider values that match the blueprint's examples.
 */
export function createDefaultGeneratorParams(): GeneratorParams {
  return {
    worldStyle: 'realistic',
    landmass: 50,
    seaLevel: 50,
    climateVariance: 50,
    plateActivity: 50,
    axisTilt: 30,
    planetAge: 60
  }
}

// ---------------------------------------------------------------------
// Small helper: deterministic pseudo-random based on x, y, seed.
// This lets us generate "noise" without any external libraries.
// ---------------------------------------------------------------------
function hash3(x: number, y: number, seed: number): number {
  let h = x * 374761393 + y * 668265263 + seed * 982451653
  h = (h ^ (h >>> 13)) * 1274126177
  h = h ^ (h >>> 16)
  return (h >>> 0) / 4294967295
}

// Simple fractal noise: average a few octaves of hash3.
function fractalNoise2D(
  x: number,
  y: number,
  seed: number,
  octaves: number,
  roughness: number
): number {
  let value = 0
  let amp = 1
  let freq = 1
  let totalAmp = 0

  for (let i = 0; i < octaves; i++) {
    const nx = x * freq
    const ny = y * freq
    value += hash3(Math.floor(nx), Math.floor(ny), seed + i * 1013) * amp
    totalAmp += amp
    amp *= roughness
    freq *= 2
  }

  return value / totalAmp
}

// ---------------------------------------------------------------------
// Biome classification
// ---------------------------------------------------------------------

export enum Biome {
  Ocean = 0,
  Coast = 1,
  Desert = 2,
  Grassland = 3,
  Forest = 4,
  Taiga = 5,
  Tundra = 6,
  Ice = 7,
  Mountain = 8
}

interface EnvSample {
  height: number
  temp: number
  moisture: number
}

function classifyBiome(env: EnvSample): Biome {
  const { height, temp, moisture } = env

  // Ocean vs land
  if (height < 0.5) {
    return Biome.Ocean
  }

  // Mountains (high elevation)
  if (height > 0.8) {
    return Biome.Mountain
  }

  // Temperature bands (very rough)
  if (temp < 0.1) {
    return Biome.Ice
  }
  if (temp < 0.25) {
    return moisture > 0.4 ? Biome.Taiga : Biome.Tundra
  }
  if (temp > 0.8) {
    if (moisture < 0.3) return Biome.Desert
    if (moisture < 0.6) return Biome.Grassland
    return Biome.Forest
  }

  // Mid-latitudes
  if (moisture < 0.25) return Biome.Desert
  if (moisture < 0.55) return Biome.Grassland
  return Biome.Forest
}

// ---------------------------------------------------------------------
// Main generator – creates a full World according to the blueprint.
// ---------------------------------------------------------------------

export function generateWorldFromParams(
  name: string,
  params: GeneratorParams
): World {
  // For V1 we use a moderate resolution; we can later bump this to the
  // blueprint's "full" resolution once performance is confirmed.
  const width = 512
  const height = 256

  const seed = Math.floor(Math.random() * 2 ** 31)

  const cells: WorldCell[] = []

  // Derived knobs
  const ruggedness = 0.4 + (params.plateActivity / 100) * 0.4 // 0.4–0.8
  const moistureVariance = 0.3 + (params.climateVariance / 100) * 0.5
  const seaLevelBase = 0.45 + (params.seaLevel - 50) / 500 // 0.35–0.55
  const landBias = (params.landmass - 50) / 100 // -0.5 – +0.5
  const ageSmoothing = 0.3 + (params.planetAge / 100) * 0.5 // 0.3–0.8

  for (let y = 0; y < height; y++) {
    const latNorm = y / (height - 1) // 0 at top, 1 at bottom
    const latFromEquator = Math.abs(latNorm - 0.5) * 2 // 0 equator, 1 poles

    // Axis tilt: stronger tilt = broader warm band
    const tilt = 0.3 + (params.axisTilt / 100) * 0.4
    let temp = 1 - Math.pow(latFromEquator, tilt)

    // Base moisture pattern by latitude
    let moistureBase = 0.5
    moistureBase += Math.sin(latNorm * Math.PI * 2) * 0.15

    for (let x = 0; x < width; x++) {
      const nx = x / width
      const ny = y / height

      // Continents: low-frequency noise
      const continentNoise = fractalNoise2D(
        nx * 2,
        ny * 2,
        seed,
        4,
        ruggedness
      )

      // Detail noise
      const detailNoise = fractalNoise2D(nx * 16, ny * 16, seed + 777, 3, 0.5)

      let heightValue =
        continentNoise * 0.7 + detailNoise * 0.3 + landBias * 0.4

      // Normalize roughly to 0–1
      heightValue = (heightValue - 0.3) / 0.7
      heightValue = Math.min(1, Math.max(0, heightValue))

      // "Age" smoothing – older planets are softer
      heightValue = ageSmoothing * heightValue + (1 - ageSmoothing) * 0.5

      // Apply sea level
      const seaLevel = seaLevelBase
      const heightNorm = heightValue

      // Temperature variation by noise
      const tempNoise = hash3(x, y, seed + 1234) * 0.25
      const tempFinal = Math.min(
        1,
        Math.max(0, temp * 0.9 + tempNoise * 0.1)
      )

      // Moisture noise
      const moistNoise =
        (hash3(x, y, seed + 5678) - 0.5) * moistureVariance * 2
      const moistureFinal = Math.min(
        1,
        Math.max(0, moistureBase + moistNoise)
      )

      const env: EnvSample = {
        height: heightNorm - seaLevel + 0.5,
        temp: tempFinal,
        moisture: moistureFinal
      }

      const biome = classifyBiome(env)

      const cell: WorldCell = {
        x,
        y,
        baseHeight: heightNorm,
        editHeightDelta: 0,
        simHeightDelta: 0,
        baseBiomeId: biome,
        editBiomeId: null,
        countryId: null,
        cultureId: null,
        cityId: null
      }

      cells.push(cell)
    }
  }

  const now = new Date().toISOString()

  const world: World = {
    id: createId('world'),
    name,
    seed,
    width,
    height,
    seaLevel: 0.5,
    cells,
    countries: [],
    cultures: [],
    cities: [],
    createdAt: now,
    updatedAt: now
  }

  return world
}