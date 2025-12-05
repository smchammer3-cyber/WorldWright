// ===============================
// WorldWright WorldBrain Types
// ===============================
//
// NOTE (6B-3B):
// - This file defines the core data structures for a saved world.
// - We have introduced a `stickers` field on `World` in a
//   backward-compatible way. Older worlds without `stickers` are still valid.

export type BiomeId = number
export type CountryId = string | null
export type CultureId = string | null
export type CityId = string | null

export type CityType = 'village' | 'town' | 'city' | 'capital'

/**
 * Single cell in the world grid.
 *
 * Resolution is width × height (e.g. 256 × 128).
 *
 * For V1 we keep this intentionally focused on the core climate +
 * terrain fields that the generator and renderer understand.
 */
export interface WorldCell {
  // Grid location in the world map
  x: number
  y: number

  /**
   * Normalized terrain height.
   * 0   = deepest ocean
   * 0.5 = sea level (approx)
   * 1   = highest peaks
   */
  baseHeight: number

  /**
   * Simple moisture metric (0 = dry, 1 = very wet).
   */
  moisture: number

  /**
   * Simple temperature metric (0 = cold, 1 = hot).
   */
  temperature: number

  /**
   * Simple biome classifier.
   * For now:
   * - 0 = water
   * - 1 = land
   * Future versions can expand this.
   */
  biomeId: BiomeId
}

/**
 * Lightweight representation of a sticker stored on a world.
 *
 * IMPORTANT (6B-3B):
 * - This is intentionally generic and JSON-friendly.
 * - The more detailed editor/runtime types live in `stickerEngine.ts`.
 * - We keep this decoupled so world saves remain stable even if
 *   the editor’s internal sticker model evolves.
 */
export interface WorldSticker {
  /** Stable ID for this sticker instance. */
  id: string
  /** The world ID this sticker belongs to. */
  worldId: string
  /** Category/kind of sticker (biome region, city, etc.). */
  type: string
  /**
   * Spatial footprint in world grid coordinates.
   * (Same coordinate system as WorldCell.x / .y)
   */
  x: number
  y: number
  width: number
  height: number
  /**
   * Optional metadata payload for type-specific details.
   * This should always remain JSON-serializable.
   */
  metadata?: Record<string, unknown>
  /**
   * Whether this sticker is currently active/enabled.
   * If omitted, treat as true.
   */
  isEnabled?: boolean
}

/**
 * Core world object saved/loaded in V1.
 */
export interface World {
  id: string
  name: string
  width: number
  height: number
  seed: string
  /** Normalized sea level in [0, 1]. */
  seaLevel: number
  /** World grid cells. Length = width × height. */
  cells: WorldCell[]

  /**
   * High-level worldbuilding containers.
   * For V1 these are mostly placeholders and remain `any[]` until
   * their schemas are locked.
   */
  countries: any[]
  cultures: any[]
  cities: any[]

  /**
   * (6B-3B) Stickers attached to this world.
   *
   * Stored as a generic JSON-friendly array so that:
   * - older worlds without `stickers` remain valid (field may be missing),
   * - editor/runtime sticker models can evolve separately.
   *
   * Callers should treat `undefined` the same as `[]`.
   */
  stickers?: WorldSticker[]

  /**
   * Timestamps (ISO 8601). Optional for backward compatibility.
   */
  createdAt?: string
  updatedAt?: string
}

/**
 * Helper to compute flat index from (x, y).
 */
export function cellIndex(x: number, y: number, width: number): number {
  return y * width + x
}

/**
 * Helper to compute x/y from flat index.
 */
export function indexToXY(
  index: number,
  width: number,
): { x: number; y: number } {
  const y = Math.floor(index / width)
  const x = index - y * width
  return { x, y }
}