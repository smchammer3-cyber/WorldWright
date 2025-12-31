// ========================================================
// WORLDWRIGHT -- STICKER POLYGON EDITOR (V1.3 FIXED)
// File: src/modes/create/StickerPolygonEditor.ts
//
// Core functions for sticker creation and placement.
// FIXED: Adds stickers to world.stickers array properly
// ========================================================

import type { WorldBrain, Sticker } from '../../core/worldSchema';

// ===== Sticker Templates by Type =====
export const STICKER_TEMPLATES: Record<string, any> = {
  BIOME: {
    shape: 'polygon',
    blendMode: 'OVERRIDE',
    intensity: 1.0,
    payload: { biomeId: 5 },
  },
  CULTURE: {
    shape: 'polygon',
    blendMode: 'BLEND',
    intensity: 0.8,
    payload: { cultureId: 'culture_0' },
  },
  HEIGHT: {
    shape: 'polygon',
    blendMode: 'ADD',
    intensity: 0.5,
    payload: { heightDelta: 0.3 },
  },
};

/**
 * Convert screen coordinates to lat/lon based on viewport
 */
export function screenToLatLon(
  x: number,
  y: number,
  rect: DOMRect,
  gridWidth: number = 256,
  gridHeight: number = 128
): { lat: number; lon: number } {
  const relX = x - rect.left;
  const relY = y - rect.top;
  
  // Equirectangular projection
  const lon = (relX / rect.width) * 360 - 180;
  const lat = 90 - (relY / rect.height) * 180;
  
  return { lat, lon };
}

/**
 * Convert lat/lon to screen coordinates
 */
export function latLonToScreen(
  lat: number,
  lon: number,
  rect: DOMRect
): { x: number; y: number } {
  const x = rect.left + ((lon + 180) / 360) * rect.width;
  const y = rect.top + (90 - lat) / 180 * rect.height;
  return { x, y };
}

/**
 * Find nearest vertex within threshold
 */
export function findNearestVertex(
  point: { lat: number; lon: number },
  vertices: Array<{ lat: number; lon: number }>,
  threshold: number
): number | null {
  let nearest = -1;
  let minDist = threshold;
  
  for (let i = 0; i < vertices.length; i++) {
    const dist = Math.sqrt(
      Math.pow(point.lat - vertices[i].lat, 2) +
      Math.pow(point.lon - vertices[i].lon, 2)
    );
    
    if (dist < minDist) {
      minDist = dist;
      nearest = i;
    }
  }
  
  return nearest >= 0 ? nearest : null;
}

/**
 * Create a sticker object
 */
export function createSticker(
  id: string,
  type: 'BIOME' | 'CULTURE' | 'HEIGHT',
  vertices: Array<{ lat: number; lon: number }>,
  mode: 'WORLD_RULES' | 'OVERRIDE',
  payload: any
): Sticker {
  // Normalize lat/lon to 0-1 range for world coordinates
  const normalizedVertices = vertices.map(v => ({
    lat: (v.lat + 90) / 180,
    lon: (v.lon + 180) / 360,
  }));
  
  return {
    id,
    name: `${type} Sticker`,
    type,
    mode,
    polygon: normalizedVertices,
    falloff: 0,
    payload,
  };
}

/**
 * Apply sticker to world by updating affected cells
 */
export function applyStickerToWorld(world: WorldBrain, sticker: Sticker): void {
  if (!world.stickers) {
    world.stickers = [];
  }
  
  // Add sticker to array
  world.stickers.push(sticker);
  
  // Apply to grid based on type
  const { gridWidth, gridHeight } = world;
  
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      // Convert grid cell to lat/lon (0-1 range)
      const cellLat = y / gridHeight;
      const cellLon = x / gridWidth;
      
      if (isPointInPolygon(cellLat, cellLon, sticker.polygon)) {
        const index = y * gridWidth + x;
        const cell = world.cells[index];
        
        if (!cell) continue;
        
        if (sticker.type === 'BIOME' && sticker.payload.biomeId) {
          cell.editBiomeId = sticker.payload.biomeId;
        } else if (sticker.type === 'HEIGHT' && sticker.payload.heightDelta) {
          cell.editHeightDelta = Math.max(-1, Math.min(1, 
            cell.editHeightDelta + sticker.payload.heightDelta
          ));
        } else if (sticker.type === 'CULTURE' && sticker.payload.cultureId) {
          cell.cultureId = sticker.payload.cultureId;
        }
      }
    }
  }
}

/**
 * Check if point is inside polygon (ray casting)
 */
function isPointInPolygon(
  lat: number,
  lon: number,
  vertices: Array<{ lat: number; lon: number }>
): boolean {
  if (vertices.length < 3) return false;
  
  let inside = false;
  
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i].lon;
    const yi = vertices[i].lat;
    const xj = vertices[j].lon;
    const yj = vertices[j].lat;
    
    const intersect = ((yi > lat) !== (yj > lat)) &&
      (lon < ((xj - xi) * (lat - yi) / (yj - yi) + xi));
    
    if (intersect) inside = !inside;
  }
  
  return inside;
}

/**
 * Get all stickers of a specific type
 */
export function getStickersByType(
  world: WorldBrain,
  type: 'BIOME' | 'CULTURE' | 'HEIGHT'
): Sticker[] {
  return (world.stickers || []).filter(s => s.type === type);
}

/**
 * Remove sticker by ID
 */
export function removeStickerById(world: WorldBrain, stickerId: string): void {
  if (!world.stickers) return;
  const idx = world.stickers.findIndex(s => s.id === stickerId);
  if (idx >= 0) {
    world.stickers.splice(idx, 1);
  }
}

/**
 * Toggle sticker enabled state (stub - stickers don't have enabled field in schema)
 */
export function toggleSticker(world: WorldBrain, stickerId: string, enabled: boolean): void {
  // TODO: Stickers in schema don't have enabled field yet
  // This is a placeholder for future functionality
  if (!world.stickers) return;
  // const sticker = world.stickers.find(s => s.id === stickerId);
  // if (sticker) {
  //   sticker.enabled = enabled;
  // }
}
