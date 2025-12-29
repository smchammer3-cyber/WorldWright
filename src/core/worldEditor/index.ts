// ========================================================
// WORLDWRIGHT -- WORLD EDITOR (V1.3 Spine)
// File: src/core/worldEditor/index.ts
//
// Non-destructive editing operations that modify ONLY editable layers.
// IMPORTANT: This file now forwards edits through the Action gateway.
// ========================================================

import { WorldBrain, Sticker } from '../worldSchema';
import { applyAction } from '../worldActions';
import { recomputeWorld } from '../worldRecompute';

export enum TerrainToolType {
  RAISE = 'RAISE',
  LOWER = 'LOWER',
  FLATTEN = 'FLATTEN',
  SMOOTH = 'SMOOTH',
}

export function applyTerrainTool(
  world: WorldBrain,
  tool: TerrainToolType,
  centerRow: number,
  centerCol: number,
  radius: number,
  strength: number,
): void {
  applyAction(world, {
    type: 'TERRAIN_STROKE',
    tool,
    center: { row: centerRow, col: centerCol },
    radius,
    strength,
  });
}

/**
 * Sticker application remains direct for now (it will become actions next),
 * but it must always end in recomputeWorld() to keep derived layers consistent.
 */
export function applySticker(world: WorldBrain, sticker: Sticker): void {
  const { gridWidth, gridHeight, cells } = world;

  const lats = sticker.polygon.map(p => p.lat);
  const lons = sticker.polygon.map(p => p.lon);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);

  // Convert lat/lon bounds to grid bounds (simple equirectangular)
  const rMin = Math.floor(((90 - maxLat) / 180) * gridHeight);
  const rMax = Math.ceil(((90 - minLat) / 180) * gridHeight);
  const cMin = Math.floor(((minLon + 180) / 360) * gridWidth);
  const cMax = Math.ceil(((maxLon + 180) / 360) * gridWidth);

  for (let r = rMin; r <= rMax; r++) {
    for (let c = cMin; c <= cMax; c++) {
      const rr = (r + gridHeight) % gridHeight;
      const cc = (c + gridWidth) % gridWidth;
      const idx = rr * gridWidth + cc;
      const cell = cells[idx];

      // point-in-polygon test in lon/lat space
      const lat = 90 - (rr / gridHeight) * 180;
      const lon = (cc / gridWidth) * 360 - 180;

      if (!pointInPolygon({ lat, lon }, sticker.polygon)) continue;

      if (sticker.type === 'BIOME' && sticker.payload.biomeId != null) {
        cell.editBiomeId = sticker.payload.biomeId;
      }

      if (sticker.type === 'CULTURE' && sticker.payload.cultureId) {
        cell.cultureId = sticker.payload.cultureId;
      }

      if (sticker.type === 'HEIGHT' && typeof sticker.payload.heightDelta === 'number') {
        cell.editHeightDelta += sticker.payload.heightDelta;
      }
    }
  }

  world.stickers = world.stickers ?? [];
  world.stickers.push(sticker);

  recomputeWorld(world, ['STICKER_EDIT']);
}

function pointInPolygon(point: { lat: number; lon: number }, polygon: { lat: number; lon: number }[]): boolean {
  // Ray casting algorithm
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lon;
    const yi = polygon[i].lat;
    const xj = polygon[j].lon;
    const yj = polygon[j].lat;

    const intersect =
      yi > point.lat !== yj > point.lat &&
      point.lon < ((xj - xi) * (point.lat - yi)) / (yj - yi + 1e-12) + xi;

    if (intersect) inside = !inside;
  }
  return inside;
}