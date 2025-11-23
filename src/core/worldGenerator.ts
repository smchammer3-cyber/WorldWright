// ==========================================================
// WorldWright Generator Core (Blueprint Steps 7B → 8D)
// New continent physics + sea level balance
// ==========================================================

import { World, WorldCell } from './world'

// Generator config type from UI sliders
export interface GeneratorParams {
  name: string
  width: number
  height: number
  seed: string
  landmass: number  // 0–1 controls continent size
  seaLevel: number  // ~0.5 for Earth-like defaults
}

// Basic seeded PRNG so results change with seed
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

// Helper noise (no library yet)
function noise(rand: () => number, x: number, y: number): number {
  const r = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return (r - Math.floor(r)) * 2 - 1 // -1 to +1
}

// Main generator function
export function generateWorldFromParams(params: GeneratorParams): World {
  const { name, width, height, seed, landmass, seaLevel } = params
  const rand = makeRandom(seed)

  // --- CONFIG FOR CONTINENTS ---
  const platesCount = Math.floor(3 + landmass * 4) // 3–7 plates
  const plates = []
  for (let p = 0; p < platesCount; p++) {
    plates.push({
      x: Math.floor(rand() * width),
      y: Math.floor(rand() * height)
    })
  }

  // Allocate cell container
  const cells: WorldCell[] = []
  const now = new Date().toISOString()

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {

      // Distance to nearest plate center → builds continents
      let minDist = Infinity
      for (const plate of plates) {
        const dx = x - plate.x
        const dy = y - plate.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < minDist) minDist = dist
      }

      // Normalize distances
      const maxDist = Math.sqrt(width * width + height * height)
      let base = 1 - minDist / maxDist // nearer plate center = higher land

      // Add noise for coast variation
      base += noise(rand, x, y) * 0.15

      // Center elevation around landmass slider:
      // landmass = 0.0 → most below sea
      // landmass = 1.0 → most above sea
      base = base * 0.5 + landmass * 0.5

      // Clamp to [0, 1]
      base = Math.max(0, Math.min(1, base))

      cells.push({
        x, y,
        baseHeight: base,
        editHeightDelta: 0,
        simHeightDelta: 0,
        baseBiomeId: null,
        editBiomeId: null,
        simBiomeId: null,
        countryId: null,
        cultureId: null,
        cityId: null
      })
    }
  }

  // Final World object
  const world: World = {
    id: seed,
    name,
    width,
    height,
    seed,
    seaLevel,
    cells,
    countries: [],
    cultures: [],
    cities: [],
    createdAt: now,
    updatedAt: now
  }

  return world
}