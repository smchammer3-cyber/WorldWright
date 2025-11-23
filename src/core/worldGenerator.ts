// ==========================================================
// WorldWright Generator Core (V1)
// Simple continent + sea level generator
// ==========================================================

import { World, WorldCell } from './world'
import type { PlanetPreview } from './planetRenderer'

export interface GeneratorParams {
  name: string
  width: number
  height: number
  seed: string
  landmass: number // 0–1 controls continent size
  seaLevel: number // 0..1 (0 = low oceans, 1 = high oceans)
}

export function createDefaultGeneratorParams(): GeneratorParams {
  return {
    name: 'New World',
    width: 256,
    height: 128,
    seed: '',
    landmass: 0.55,
    seaLevel: 0.5,
  }
}

function createRng(seed: string): () => number {
  // Small deterministic PRNG (mulberry32-ish)
  let h = 2166136261 >>> 0
  const s = seed || 'worldwright'
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }

  return function () {
    h += 0x6d2b79f5
    let t = h
    t = Math.imul(t ^ (t >>> 15), 1 | t)
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)
    t = (t ^ (t >>> 14)) >>> 0
    return t / 4294967296
  }
}

/**
 * Core generation: fills a grid of WorldCell objects.
 */
function generateCells(params: GeneratorParams): WorldCell[] {
  const { width, height, seed, landmass, seaLevel } = params
  const rng = createRng(`${seed}|${width}x${height}|${landmass}|${seaLevel}`)
  const cells: WorldCell[] = []

  // Map seaLevel 0..1 to a threshold in -1..1 space
  const seaThreshold = (seaLevel - 0.5) * 2 // center around 0

  for (let y = 0; y < height; y++) {
    const v = y / (height - 1 || 1)
    const equatorDist = Math.abs(v - 0.5) * 2 // 0 at equator, 1 at poles

    for (let x = 0; x < width; x++) {
      const u = x / (width - 1 || 1)

      // base roughness
      const r1 = rng()
      const r2 = rng()
      const ridge = Math.sin(u * Math.PI * 2) * Math.cos(v * Math.PI * 2)
      let h = ridge * 0.4 + (r1 * 2 - 1) * 0.6

      // landmass control: pull heights toward land or sea
      h *= 0.3 + landmass * 0.7

      // temperature & moisture
      const moisture = r2
      const temperature = Math.max(
        0,
        Math.min(1, 1 - equatorDist + (rng() - 0.5) * 0.1),
      )

      const biomeId = h < seaThreshold ? 0 : 1

      cells.push({
        x,
        y,
        baseHeight: h,
        moisture,
        temperature,
        biomeId,
      })
    }
  }

  return cells
}

/**
 * Deterministically generate a full World from parameters.
 */
export function generateWorldFromParams(params: GeneratorParams): World {
  const { name, width, height, seed, seaLevel } = params
  const now = new Date().toISOString()
  const cells = generateCells(params)

  const world: World = {
    id: '',
    name: name || 'New World',
    width,
    height,
    seed: seed || 'seed',
    seaLevel: (seaLevel - 0.5) * 2, // store in -1..1 space
    cells,
    countries: [],
    cultures: [],
    cities: [],
    createdAt: now,
    updatedAt: now,
  }

  return world
}

/**
 * Alias kept for compatibility with earlier code.
 */
export function buildWorldFromParams(params: GeneratorParams): World {
  return generateWorldFromParams(params)
}

/**
 * Build a simple preview object from a world.
 */
export function buildPreviewFromWorld(world: World): PlanetPreview {
  return {
    width: world.width,
    height: world.height,
    seaLevel: world.seaLevel,
    cells: world.cells.map((c) => ({ baseHeight: c.baseHeight })),
  }
}