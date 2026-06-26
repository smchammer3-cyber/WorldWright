import type { WorldBrain, Sticker, City, Country, River } from '../worldSchema';

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

export type StickerApplyAction = { type: 'STICKER_APPLY'; sticker: Sticker };

export type AddCityAction = { type: 'ADD_CITY'; city: City };

export type AddCountryAction = { type: 'ADD_COUNTRY'; country: Country };

export type AddRiverAction = { type: 'ADD_RIVER'; river: River };

export type RemoveRiverAction = { type: 'REMOVE_RIVER'; riverId: number };

export type SetLakeLevelAction = {
  type: 'SET_LAKE_LEVEL';
  cellIndex: number;
  newLevel: number;
};

export type WorldAction =
  | TerrainStrokeAction
  | StickerApplyAction
  | AddCityAction
  | AddCountryAction
  | AddRiverAction
  | RemoveRiverAction
  | SetLakeLevelAction;

/**
 * Apply a single WorldAction to the provided world.
 *
 * IMPORTANT ARCHITECTURE RULE:
 * This function mutates world state only.
 * It does NOT perform recomputation.
 *
 * The sole orchestration owner for recompute/validate/history/publish is
 * worldSession. This keeps action application deterministic and prevents
 * duplicate recompute passes.
 */
export function applyWorldAction(world: WorldBrain, action: WorldAction): void {
  switch (action.type) {
    case 'TERRAIN_STROKE': {
      applyTerrainStroke(world, action);
      return;
    }

    case 'STICKER_APPLY':
      applySticker(world, action);
      return;

    case 'ADD_CITY':
      applyAddCity(world, action);
      return;

    case 'ADD_COUNTRY':
      applyAddCountry(world, action);
      return;

    case 'ADD_RIVER':
      applyAddRiver(world, action);
      return;

    case 'REMOVE_RIVER':
      applyRemoveRiver(world, action);
      return;

    case 'SET_LAKE_LEVEL':
      applySetLakeLevel(world, action);
      return;

    default:
      return;
  }
}

function applyTerrainStroke(world: WorldBrain, action: TerrainStrokeAction): void {
  const { tool, center, radius, strength } = action;
  if (!world || !Array.isArray(world.cells)) return;

  const gridWidth = world.gridWidth;
  const gridHeight = world.gridHeight;
  const cells = world.cells;

  const rad = Math.max(1, Math.floor(Number.isFinite(radius) ? radius : 1));
  const str = Number.isFinite(strength) && strength >= 0 ? strength : 0;

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
        const h =
          (typeof cell.baseHeight === 'number' ? cell.baseHeight : 0) +
          (typeof cell.editHeightDelta === 'number' ? cell.editHeightDelta : 0);

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
        const current =
          (typeof cell.baseHeight === 'number' ? cell.baseHeight : 0) +
          (typeof cell.editHeightDelta === 'number' ? cell.editHeightDelta : 0);

        const delta = (targetHeight - current) * str * weight;
        cell.editHeightDelta = (cell.editHeightDelta || 0) + delta;
      }
    }
  }
}

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

function applyAddRiver(world: WorldBrain, action: AddRiverAction): void {
  world.rivers = world.rivers ?? [];
  world.rivers.push(action.river);
}

function applyRemoveRiver(world: WorldBrain, action: RemoveRiverAction): void {
  world.rivers = (world.rivers ?? []).filter((r) => r.id !== action.riverId);
}

function applySetLakeLevel(world: WorldBrain, action: SetLakeLevelAction): void {
  const cell = world.cells[action.cellIndex];
  if (!cell) return;

  const basinId = cell.basinId;
  const currentLevel = (cell.baseHeight || 0) + (cell.editHeightDelta || 0);
  const delta = action.newLevel - currentLevel;

  if (basinId != null) {
    for (const c of world.cells) {
      if (c.basinId === basinId) {
        c.editHeightDelta = (c.editHeightDelta ?? 0) + delta;
      }
    }
  }
}

function pointInPolygon(
  point: { lat: number; lon: number },
  polygon: { lat: number; lon: number }[]
): boolean {
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

// Alias used by worldEditor; maintained for backward compatibility.
export const applyAction = applyWorldAction;
