// ========================================================
// WORLD CORE TYPES -- WORLDBRAIN STEP 1.1 (SCHEMA STABILIZATION)
// Jarvis change: 1.1-A -- Update world.ts
//
// Goals:
// - Provide a single, explicit, versioned World schema.
// - Keep existing fields (cells, seaLevel, stickers, etc.) intact.
// - Introduce edit/sim layers for non-destructive editing & simulation.
// - Define basic Country / Culture / City / Sticker interfaces.
// - Keep everything serializable and backwards-friendly.
// ========================================================

/**
 * Current schema version for World objects.
 *
 * This should be bumped (2, 3, …) only when we make a breaking change
 * to the saved world shape. Storage code can use this to migrate older
 * saves safely.
 */
export const CURRENT_WORLD_SCHEMA_VERSION = 1 as const
export type WorldSchemaVersion = typeof CURRENT_WORLD_SCHEMA_VERSION

// --------------------------------------------------------
// Core cell data (authoring/base layer)
// --------------------------------------------------------

/**
 * A single cell in the base world grid.
 *
 * This represents the "authoring-time" terrain & climate -- the stable
 * base that generation creates and the editor starts from.
 *
 * - baseHeight: normalized 0–1
 * - temperature: normalized (0–1) for now
 * - moisture: normalized (0–1) for now
 * - biomeId: string id into a biome table (future)
 */
export interface WorldCell {
  x: number
  y: number

  baseHeight: number
  temperature: number
  moisture: number
  biomeId: string
}

// --------------------------------------------------------
// Edit & Simulation layers
// --------------------------------------------------------

/**
 * User-authored, non-destructive edits applied on top of the base data.
 *
 * For Step 1.1 this is mostly a placeholder. Future steps will:
 * - Move Create Mode height painting to editLayer.heightDelta
 * - Add biome overrides, paint masks, culture overrides, etc.
 */
export interface WorldEditLayer {
  /**
   * Per-cell height delta authored in the editor.
   * Same length/order as the World.cells array.
   *
   * 0   => no change
   * > 0 => raise terrain
   * < 0 => lower terrain
   */
  heightDelta: number[]
}

/**
 * Simulation-driven deltas applied on top of base + edit layers.
 *
 * For Step 1.1 this is also a placeholder; future steps will cover
 * erosion, sediment, water depth, long-term climate drift, etc.
 */
export interface WorldSimLayer {
  /**
   * Per-cell height changes from simulation (erosion, uplift, etc).
   * Same length/order as the World.cells array.
   *
   * 0   => no simulated change
   * > 0 => raised by sim
   * < 0 => lowered by sim
   */
  heightDelta: number[]
}

/**
 * Helper to create a zeroed edit layer for a given number of cells.
 */
export function createEmptyEditLayer(cellCount: number): WorldEditLayer {
  return {
    heightDelta: new Array(cellCount).fill(0),
  }
}

/**
 * Helper to create a zeroed simulation layer for a given number of cells.
 */
export function createEmptySimLayer(cellCount: number): WorldSimLayer {
  return {
    heightDelta: new Array(cellCount).fill(0),
  }
}

// --------------------------------------------------------
// Higher-level world structures
// --------------------------------------------------------

export interface Country {
  id: string
  name: string

  // Future: polygon region, government type, population, etc.
  // regionPolygonId?: string
}

export interface Culture {
  id: string
  name: string

  // Future: settlement-based influence regions, language, etc.
  // primaryLanguageId?: string
}

export interface City {
  id: string
  name: string

  // Grid-space location in the world map
  x: number
  y: number

  population?: number
}

/**
 * Stickers are generic editor overlays used for regions, notes, etc.
 *
 * They are kept deliberately flexible + JSON-friendly so they can be
 * extended by metadata without schema breaks.
 */
export interface WorldSticker {
  id: string
  worldId: string
  type: string

  x: number
  y: number
  width: number
  height: number

  metadata: Record<string, unknown>
}

// --------------------------------------------------------
// World root object
// --------------------------------------------------------

/**
 * The canonical World object used by:
 * - worldGenerator
 * - worldStorage
 * - Generate / Create / Sim modes
 * - future export pipelines
 */
export interface World {
  // identity & meta
  id: string
  name: string
  seed: string

  /**
   * Explicit schema version for this world.
   * New worlds should use CURRENT_WORLD_SCHEMA_VERSION.
   * Older saves may omit this; storage should backfill.
   */
  schemaVersion: WorldSchemaVersion

  // dimensions
  width: number
  height: number

  // global settings
  seaLevel: number

  // base authoring data
  cells: WorldCell[]

  // layered deltas (non-destructive editing & sim)
  editLayer: WorldEditLayer
  simLayer: WorldSimLayer

  // higher-level structures
  countries: Country[]
  cultures: Culture[]
  cities: City[]
  stickers: WorldSticker[]
}