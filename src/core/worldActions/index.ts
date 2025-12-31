import type { WorldBrain, Sticker, City, Country } from '../worldSchema';
import { recomputeWorld } from '../worldRecompute';

// Terrain brush tools supported by the WorldAction system.
// RAISE increases height, LOWER decreases height, FLATTEN brings heights towards
// the average height within the brush, and SMOOTH performs a similar
// operation. Tools are intentionally simple but produce real edits so they are
// compatible with undo/redo and derived-field recomputation.
export type TerrainStrokeTool = 'RAISE' | 'LOWER' | 'FLATTEN' | 'SMOOTH';

/**
 * WorldAction defines all possible edit commands that can be applied to a
 * WorldBrain. Each action type is a discriminated union with a specific
 * payload. As new actions are introduced (stickers, borders, cultures, etc.)
 * they should extend this union. For now, only terrain strokes are
 * implemented.
 */
export type TerrainStrokeAction = {
  type: 'TERRAIN_STROKE';
  tool: TerrainStrokeTool;
  center: { row: number; col: number };
  radius: number;
  strength: number;
};

export type WorldAction =
  | TerrainStrokeAction
  | StickerApplyAction
  | AddCityAction
  | AddCountryAction;

/**
 * Apply a single WorldAction to the provided world. This function mutates
 * world.cells in place but does not perform recomputation; callers should
 * invoke recomputeWorld() themselves after the action. Defensive checks are
 * performed on action payloads to avoid exceptions and to keep edits
 * deterministic.
 */
export function applyWorldAction(world: WorldBrain, action: WorldAction): void {
  switch (action.type) {
    case 'TERRAIN_STROKE': {
      const { tool, center, radius, strength } = action as TerrainStrokeAction;
      if (!world || !Array.isArray(world.cells)) return;
      const gridWidth = world.gridWidth;
      const gridHeight = world.gridHeight;
      const cells = world.cells;

      // Clamp parameters to safe ranges.
      const rad = Math.max(1, Math.floor(Number.isFinite(radius) ? radius : 1));
      const str = Number.isFinite(strength) && strength >= 0 ? strength : 0;

      // Precompute the target height for flatten/smooth actions.
      let targetHeight = 0;
      let count = 0;
      if (tool === 'FLATTEN' || tool === 'SMOOTH') {
        for (let dr = -rad; dr <= rad; dr++) {
          const r = center.row + dr;
          if (r < 0 || r >= gridHeight) continue;
          for (let dc = -rad; dc <= rad; dc++) {
            const dist = Math.sqrt(dr * dr + dc * dc);
            if (dist > radius) continue;
            const c = center.col + dc;
            const cc = ((c % gridWidth) + gridWidth) % gridWidth;
            const idx = r * gridWidth + cc;
            const cell = cells[idx];
            const h = cell.baseHeight + (cell.editHeightDelta || 0);
            targetHeight += h;
            count++;
          }
        }
        if (count > 0) targetHeight /= count;
      }

      for (let dr = -rad; dr <= rad; dr++) {
        const r = center.row + dr;
        if (r < 0 || r >= gridHeight) continue;
        for (let dc = -rad; dc <= rad; dc++) {
          const dist = Math.sqrt(dr * dr + dc * dc);
          if (dist > radius) continue;
          const c = center.col + dc;
          const cc = ((c % gridWidth) + gridWidth) % gridWidth;
          const idx = r * gridWidth + cc;
          const cell = cells[idx];
          const weight = (radius - dist) / radius;

          if (tool === 'RAISE') {
            cell.editHeightDelta = (cell.editHeightDelta || 0) + str * weight;
          } else if (tool === 'LOWER') {
            cell.editHeightDelta = (cell.editHeightDelta || 0) - str * weight;
          } else if (tool === 'FLATTEN' || tool === 'SMOOTH') {
            const current = cell.baseHeight + (cell.editHeightDelta || 0);
            const delta = (targetHeight - current) * str * weight;
            cell.editHeightDelta = (cell.editHeightDelta || 0) + delta;
          }
        }
      }
      return;
    }

    case 'STICKER_APPLY':
      applySticker(world, action as StickerApplyAction);
      recomputeWorld(world, ['STICKER_EDIT']);
      return;

    case 'ADD_CITY':
      applyAddCity(world, action as AddCityAction);
      recomputeWorld(world, ['TERRAIN_EDIT']);
      return;

    case 'ADD_COUNTRY':
      applyAddCountry(world, action as AddCountryAction);
      recomputeWorld(world, ['TERRAIN_EDIT']);
      return;

    default:
      return;
  }
}

export type StickerApplyAction = { type: 'STICKER_APPLY'; sticker: Sticker };

export type AddCityAction = { type: 'ADD_CITY'; city: City };

export type AddCountryAction = { type: 'ADD_COUNTRY'; country: Country };

function applySticker(world: WorldBrain, action: StickerApplyAction): void {
  const { sticker } = action;
  const { gridWidth, gridHeight, cells } = world;

  const lats = sticker.polygon.map((p) => p.lat);
  const lons = sticker.polygon.map((p) => p.lon);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);

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
        cell.editHeightDelta = (cell.editHeightDelta || 0) + sticker.payload.heightDelta;
      }
    }
  }

  world.stickers = world.stickers ?? [];
  world.stickers.push(sticker);
}

function applyAddCity(world: WorldBrain, action: AddCityAction): void {
  world.cities = world.cities ?? [];
  world.cities.push(action.city);
}

function applyAddCountry(world: WorldBrain, action: AddCountryAction): void {
  world.countries = world.countries ?? [];
  world.countries.push(action.country);
}

function pointInPolygon(point: { lat: number; lon: number }, polygon: { lat: number; lon: number }[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lon;
    const yi = polygon[i].lat;
    const xj = polygon[j].lon;
    const yj = polygon[j].lat;

    const intersect = yi > point.lat !== yj > point.lat && point.lon < ((xj - xi) * (point.lat - yi)) / (yj - yi + 1e-12) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// Alias used by worldEditor; maintained for backward compatibility.
export const applyAction = applyWorldAction;