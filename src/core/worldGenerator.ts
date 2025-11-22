// ============================================
// WorldWright - World Generator (Blueprint Step 5B)
// ============================================

import { World, WorldCell } from './world'

export interface GeneratorParams {
  landmass: number // 0–1
  seaLevel: number // 0–1
  climateVariance: number // 0–1
  plateActivity: number // 0–1
  axisTilt: number // 0–1
  planetAge: number // 0–1
  seed: number
}

function randomNoise(x: number, y: number, seed: number): number {
  // deterministic simple noise function
  let v = Math.sin(x * 15731 + y * 789221 + seed * 137631) * 43758.5453
  return v - Math.floor(v)
}

function biomeFrom(lat: number, height: number, seaLevel: number): number {
  // Very basic biome logic for now (will improve later)
  if (height < seaLevel) return 0 // Ocean

  if (lat > 0.8 || lat < -0.8) return 1 // Ice Caps
  if (height > 0.8) return 2 // Mountains
  if (lat > 0.6 || lat < -0.6) return 3 // Tundra
  if (lat > 0.3 || lat < -0.3) return 4 // Forest/Taiga
  return 5 // Drylands / Grass / Desert variants later
}

export function generateWorldFromParams(
  params: GeneratorParams
): World {
  const width = 256
  const height = 128

  const cells: WorldCell[] = []
  const seaLevel = params.seaLevel

  for (let y = 0; y < height; y++) {
    const lat = (y / height) * 2 - 1 // -1 south pole → 1 north pole

    for (let x = 0; x < width; x++) {
      const n = randomNoise(x, y, params.seed)
      
      // Generate base terrain height with landmass factor
      let baseHeight = n * params.landmass

      const biomeId = biomeFrom(lat, baseHeight, seaLevel)

      cells.push({
        x, y,
        baseHeight,
        editHeightDelta: 0,
        simHeightDelta: 0,
        baseBiomeId: biomeId,
        editBiomeId: null,
        countryId: null,
        cultureId: null,
        cityRef: null
      })
    }
  }

  return {
    id: crypto.randomUUID(),
    name: "New World",
    width,
    height,
    seed: params.seed,
    seaLevel,
    cells,
    countries: [],
    cities: [],
    cultures: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}