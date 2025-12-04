// ========================================================
// JARVIS_CHANGE
// Date: 2025-12-03
// Step: 6B-3A -- Sticker System Foundation (Types + Engine Scaffolding)
// File: src/core/stickerEngine.ts
//
// Purpose:
// - Define the core types and pure helper functions for the sticker system.
// - No imports from world.ts or other core files.
// - No side effects, no I/O, no direct world mutation.
// - This module is safe to exist in isolation and safe to delete without
//   breaking the rest of the app.
//
// Notes:
// - Future steps will wire stickers into worlds and editor tools.
// - For now, this file only defines data structures and pure operations.
// ========================================================

/**
 * High-level classification of stickers.
 *
 * More variants can be added later (e.g. "RESOURCE", "DUNGEON", etc.)
 * without breaking the existing structure.
 */
export type StickerType =
  | "BIOME"
  | "CITY"
  | "REGION"
  | "LANDFORM"
  | "POINT_OF_INTEREST"

/**
 * Common spatial properties for all stickers.
 *
 * Coordinates are expressed in the same abstract grid space as the world:
 * - x, y: integer grid coordinates (0..width-1, 0..height-1)
 * - width, height: footprint of the sticker in grid cells
 *
 * We do not assume any particular projection or world dimensions here.
 */
export interface StickerTransform {
  x: number
  y: number
  width: number
  height: number
  /**
   * Optional rotation in degrees. Not used yet, but included for future
   * visual placement logic (e.g. rotated mountain ranges, angled regions).
   */
  rotationDegrees?: number
}

/**
 * A simple strength hint for how strongly the sticker influences the world.
 * This is intentionally vague at this stage -- later steps can map these
 * levels to numeric weights in the generator/editor.
 */
export type StickerInfluenceLevel = "LOW" | "MEDIUM" | "HIGH"

/**
 * Base metadata shared by all sticker types.
 *
 * Each specific sticker type can extend this with its own shape later,
 * but for 6B-3A we keep it intentionally minimal and generic.
 */
export interface BaseStickerMetadata {
  /** Human-readable name shown in UI. */
  label?: string
  /** Optional description shown in inspector panels. */
  description?: string
  /** How strongly this sticker should influence surrounding systems. */
  influence?: StickerInfluenceLevel
  /** Freeform tags for search, filtering, and rules. */
  tags?: string[]
}

/**
 * Type-specific metadata for individual sticker categories.
 *
 * These are deliberately light for 6B-3A and can be evolved in later steps.
 */
export interface BiomeStickerMetadata extends BaseStickerMetadata {
  biomeKey?: string // e.g. "temperate_forest", "desert", etc.
}

export interface CityStickerMetadata extends BaseStickerMetadata {
  populationEstimate?: number
  isCapital?: boolean
}

export interface RegionStickerMetadata extends BaseStickerMetadata {
  regionKind?: "KINGDOM" | "EMPIRE" | "PROVINCE" | "WILDERNESS"
}

export interface LandformStickerMetadata extends BaseStickerMetadata {
  landformKind?: "MOUNTAIN_RANGE" | "VOLCANO" | "CANYON" | "PLATEAU" | "HILL"
}

export interface PoiStickerMetadata extends BaseStickerMetadata {
  importance?: "LOCAL" | "REGIONAL" | "GLOBAL"
}

/**
 * Unified metadata type for all stickers.
 * Later steps may refine this into a discriminated union if needed.
 */
export type StickerMetadata =
  | BiomeStickerMetadata
  | CityStickerMetadata
  | RegionStickerMetadata
  | LandformStickerMetadata
  | PoiStickerMetadata
  | BaseStickerMetadata // fallback / generic

/**
 * Core sticker representation.
 *
 * At this stage, stickers are independent records that refer to a world by ID.
 * Future steps will decide how/where these are attached to world data.
 */
export interface Sticker {
  /** Globally unique sticker ID (stable across saves). */
  id: string
  /** The world ID this sticker belongs to. */
  worldId: string
  /** Category of sticker (biome, city, etc.). */
  type: StickerType
  /** Spatial footprint on the world grid. */
  transform: StickerTransform
  /** Optional metadata; type-specific details are encoded here. */
  metadata?: StickerMetadata
  /** Whether this sticker is currently enabled/active. */
  isEnabled: boolean
}

/**
 * Container for sticker collections.
 *
 * We keep this as a simple array-based state for 6B-3A. If we need indexing
 * or partitioning later, we can evolve this structure in a future step.
 */
export interface StickerState {
  stickers: Sticker[]
}

/**
 * Options that affect how sticker operations behave.
 *
 * The key flag for 6B-3A is `followWorldRules`. We do not implement the
 * actual rule checks yet -- future steps will wire this flag into world-aware
 * suitability logic.
 */
export interface StickerOperationOptions {
  /**
   * Whether the operation should respect world rules (height, climate,
   * placement constraints).
   *
   * For 6B-3A, this flag is recorded and passed through the API but the
   * actual enforcement is a future step.
   */
  followWorldRules?: boolean
}

/**
 * Input payload for creating a new sticker.
 * Does not include the ID, which is assigned by the engine function.
 */
export interface CreateStickerInput {
  worldId: string
  type: StickerType
  transform: StickerTransform
  metadata?: StickerMetadata
  isEnabled?: boolean
}

/**
 * Partial update payload for an existing sticker.
 *
 * Note that we allow updating nested transform and metadata objects,
 * but the engine will merge these shallowly -- callers are expected
 * to supply complete nested objects when making changes.
 */
export interface UpdateStickerInput {
  type?: StickerType
  transform?: Partial<StickerTransform>
  metadata?: StickerMetadata
  isEnabled?: boolean
}

/**
 * Generate a simple sticker ID. This is intentionally not cryptographically
 * strong -- it only needs to be unique within a project and stable across
 * a single editing session.
 *
 * If a more robust ID scheme is required later, this implementation can be
 * swapped out without changing the external API.
 */
function generateStickerId(): string {
  return `stk_${Math.random().toString(36).slice(2, 10)}`
}

/**
 * Create a new Sticker and return the updated StickerState.
 *
 * This function is pure: it does not mutate the input state.
 * The followWorldRules flag is accepted but not yet enforced in 6B-3A.
 */
export function createSticker(
  state: StickerState,
  input: CreateStickerInput,
  options: StickerOperationOptions = {},
): { state: StickerState; sticker: Sticker } {
  const { followWorldRules = true } = options

  // 6B-3A: We do NOT enforce world rules yet. In future steps, this is where
  // height/climate suitability checks would occur when followWorldRules is true.
  void followWorldRules

  const sticker: Sticker = {
    id: generateStickerId(),
    worldId: input.worldId,
    type: input.type,
    transform: { ...input.transform },
    metadata: input.metadata,
    isEnabled: input.isEnabled ?? true,
  }

  const nextState: StickerState = {
    stickers: [...state.stickers, sticker],
  }

  return { state: nextState, sticker }
}

/**
 * Update an existing sticker by ID.
 *
 * If the sticker cannot be found, the state is returned unchanged.
 * This function is pure and does not mutate the input state.
 */
export function updateSticker(
  state: StickerState,
  stickerId: string,
  patch: UpdateStickerInput,
  options: StickerOperationOptions = {},
): StickerState {
  const { followWorldRules = true } = options

  // 6B-3A: World-rule enforcement will be implemented later. For now,
  // we simply apply the patch regardless of this flag.
  void followWorldRules

  const updatedStickers = state.stickers.map((sticker) => {
    if (sticker.id !== stickerId) return sticker

    const nextTransform: StickerTransform = {
      ...sticker.transform,
      ...(patch.transform ?? {}),
    }

    return {
      ...sticker,
      type: patch.type ?? sticker.type,
      transform: nextTransform,
      metadata: patch.metadata ?? sticker.metadata,
      isEnabled: patch.isEnabled ?? sticker.isEnabled,
    }
  })

  return { stickers: updatedStickers }
}

/**
 * Remove a sticker by ID.
 * Returns a new StickerState without the specified sticker.
 */
export function removeSticker(
  state: StickerState,
  stickerId: string,
  _options: StickerOperationOptions = {},
): StickerState {
  // 6B-3A: followWorldRules is not relevant for deletion yet.
  void _options

  const remaining = state.stickers.filter((sticker) => sticker.id !== stickerId)
  return { stickers: remaining }
}

/**
 * Convenience helper to create an empty StickerState.
 */
export function emptyStickerState(): StickerState {
  return { stickers: [] }
}