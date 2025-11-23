// ==========================================================
// WorldWright Generator Core (V1 / Step 5G)
// Continent-style heightfield + slider-friendly API
// ==========================================================

import { World, WorldCell } from './world'

// Generator config type from UI sliders
// NOTE: Sliders are 0–100 in the UI; we normalize inside the generator.
export interface GeneratorParams {
  name: string
  width: number
  height: number
  seed: string
  landmass: number        // 0–100, 0 = mostly ocean, 100 = lots of land
  seaLevel: number        // 0–100, ~50 = Earth-like
  plateActivity: number   // 0–100, reserved for future
  axisTilt: number        // 0–100, reserved for future
  planetAge: number       // 0–100, reserved for future
  climateVariance: number // 0–100, reserved for future
  worldStyle: number      // 0–100, reserved for presets
}

// Small helper for seeded PRNG
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

// Simple hash/noise helper
function noise(rand: () => number, x: number, y: number): number {
  // Lightweight hash-based noise – good enough for preview
  const r = Math.sin(x * 12.9898 + y * 78.233 + rand() * 43758.5453)
  return (r - Math.floor(r)) * 2 - 1 // -1..1
}

// Public helper to create initial generator slider values
export function createDefaultGeneratorParams(): GeneratorParams {
  return {
    name: 'New World',
    width: 256,
    height: 128,
    seed: '',
    landmass: 55,
    seaLevel: 50,
    plateActivity: 50,
    axisTilt: 23,
    planetAge: 60,
    climateVariance: 50,
    worldStyle: 50,
  }
}

// Main generator function – returns a full World object
export function generateWorldFromParams(params: GeneratorParams): World {
  const {
    name,
    width,
    height,
    seed,
    landmass: landmassSlider,
    seaLevel: seaLevelSlider,
  } = params

  const rand = makeRandom(seed || 'worldwright')

  // Normalize sliders to 0–1 ranges for math
  const landmass = Math.max(0, Math.min(1, landmassSlider / 100))
  const seaLevel = Math.max(0, Math.min(1, seaLevelSlider / 100))

  // --- CONFIG FOR CONTINENTS ---
  const platesCount = Math.floor(3 + landmass * 4) // 3–7 plates
  const plates: { x: number; y: number }[] = []
  for (let p = 0; p < platesCount; p++) {
    plates.push({
      x: Math.floor(rand() * width),
      y: Math.floor(rand() * height),
    })
  }

  const cells: WorldCell[] = []
  const now = new Date().toISOString()

  const maxDist = Math.sqrt(width * width + height * height)

  for (let y = 0; y < height; y++) {
    const v = y / (height - 1 || 1)
    const equatorDist = Math.abs(v - 0.5) * 2 // 0 at equator, 1 at poles

    for (let x = 0; x < width; x++) {
      // Distance to nearest plate center → builds continents
      let minDist = Infinity
      for (const plate of plates) {
        const dx = x - plate.x
        const dy = y - plate.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < minDist) minDist = dist
      }

      let base = 1 - minDist / maxDist // nearer plate center = higher land

      // Add noise for coast variation
      base += noise(rand, x, y) * 0.15

      // Center elevation around landmass slider:
      // landmass = 0.0 → most below sea
      // landmass = 1.0 → most above sea
      base = base * 0.5 + landmass * 0.5

      // Clamp to [0, 1]
      base = Math.max(0, Math.min(1, base))

      // Temperature proxy (equator vs poles) – ready for future biomes
      const temperature = 1 - equatorDist
      void temperature

      const cell: WorldCell = {
        x,
        y,
        baseHeight: base,
        editHeightDelta: 0,
        simHeightDelta: 0,
        baseBiomeId: null,
        editBiomeId: null,
        simBiomeId: null,
        countryId: null,
        cultureId: null,
        cityId: null,
      }

      cells.push(cell)
    }
  }

  const world: World = {
    id: '',
    name: name || 'New World',
    width,
    height,
    seed: seed || 'seed',
    seaLevel,
    cells,
    countries: [],
    cultures: [],
    cities: [],
    createdAt: now,
    updatedAt: now,
  }

  return world
}

// Convenience wrapper used by UI when saving a named world
export function buildWorldFromParams(
  params: GeneratorParams,
  explicitName?: string,
): World {
  const base = generateWorldFromParams(params)
  const trimmed = explicitName?.trim()
  if (trimmed && trimmed.length > 0) {
    return { ...base, name: trimmed }
  }
  return base
}