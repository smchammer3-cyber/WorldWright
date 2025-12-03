// ========================================================
// JARVIS_CHANGE (6B-3A – Sticker System Foundation)
// Date: 2025-12-03
//
// Purpose:
// - Introduce core types and pure logic helpers for the Sticker System.
// - Stickers are the primary content editor in WorldWright
//   (biomes, cities, regions, features, POIs).
// - This module does NOT touch the UI or rendering directly.
// - World integration (attaching stickers to saved worlds) will happen
//   in a later step so we keep each change small and testable.
// ========================================================

export type StickerKind =
  | 'biome'
  | 'city'
  | 'region'
  | 'feature'
  | 'poi'
  | 'custom'

export interface StickerMetadata {
  name?: string
  biomeId?: string
  regionId?: string
  cityPopulationEstimate?: number
  notes?: string
  // Future fields can be added as the simulation and export layers evolve.
}

export interface Sticker {
  id: string
  kind: StickerKind
  iconId: string

  // Map-space coordinates (2D view).
  mapX: number
  mapY: number

  // Approximate globe coordinates for the 3D view.
  lat: number
  lon: number

  // Visual transform.
  scale: number
  rotation: number

  // If true, the sticker must obey world rules (height, climate, suitability).
  // If false, placement is allowed anywhere (Ignore World Rules toggle).
  obeyWorldRules: boolean

  metadata: StickerMetadata
}

export interface StickerEngineState {
  stickers: Sticker[]
}

export function createEmptyStickerState(): StickerEngineState {
  return { stickers: [] }
}

export function createSticker(input: {
  id: string
  kind: StickerKind
  iconId: string
  mapX: number
  mapY: number
  lat: number
  lon: number
  obeyWorldRules: boolean
  scale?: number
  rotationDegrees?: number
  metadata?: StickerMetadata
}): Sticker {
  return {
    id: input.id,
    kind: input.kind,
    iconId: input.iconId,
    mapX: input.mapX,
    mapY: input.mapY,
    lat: input.lat,
    lon: input.lon,
    scale: input.scale ?? 1,
    rotation: (input.rotationDegrees ?? 0) * (Math.PI / 180),
    obeyWorldRules: input.obeyWorldRules,
    metadata: input.metadata ?? {},
  }
}

export function addSticker(
  state: StickerEngineState,
  sticker: Sticker,
): StickerEngineState {
  return {
    ...state,
    stickers: [...state.stickers, sticker],
  }
}

export function updateSticker(
  state: StickerEngineState,
  stickerId: string,
  updater: (current: Sticker) => Sticker,
): StickerEngineState {
  return {
    ...state,
    stickers: state.stickers.map(sticker =>
      sticker.id === stickerId ? updater(sticker) : sticker,
    ),
  }
}

export function removeSticker(
  state: StickerEngineState,
  stickerId: string,
): StickerEngineState {
  return {
    ...state,
    stickers: state.stickers.filter(sticker => sticker.id !== stickerId),
  }
}

export function moveSticker(
  state: StickerEngineState,
  stickerId: string,
  mapX: number,
  mapY: number,
  lat: number,
  lon: number,
): StickerEngineState {
  return updateSticker(state, stickerId, current => ({
    ...current,
    mapX,
    mapY,
    lat,
    lon,
  }))
}

export function setStickerObeyWorldRules(
  state: StickerEngineState,
  stickerId: string,
  obeyWorldRules: boolean,
): StickerEngineState {
  return updateSticker(state, stickerId, current => ({
    ...current,
    obeyWorldRules,
  }))
}

export function getStickerById(
  state: StickerEngineState,
  stickerId: string,
): Sticker | undefined {
  return state.stickers.find(sticker => sticker.id === stickerId)
}

export function getStickersInRadius(
  state: StickerEngineState,
  mapX: number,
  mapY: number,
  radius: number,
): Sticker[] {
  const radiusSq = radius * radius
  return state.stickers.filter(sticker => {
    const dx = sticker.mapX - mapX
    const dy = sticker.mapY - mapY
    const distSq = dx * dx + dy * dy
    return distSq <= radiusSq
  })
}