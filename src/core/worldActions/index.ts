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

export type RemoveRiverAction = { type: 'REMOVE_RIVER'; riverId: string | number };

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
  }
}

function applyTerrainStroke(world: WorldBrain, action: TerrainStrokeAction): void {
  const { center, radius, strength, tool } = action;
  const gw = world.gridWidth;
  const gh = world.gridHeight;

  for (let r = Math.max(0, center.row - radius); r <= Math.min(gh - 1, center.row + radius); r++) {
    for (let c = Math.max(0, center.col - radius); c <= Math.min(gw - 1, center.col + radius); c++) {
      const dr = r - center.row;
      const dc = c - center.col;
      const dist = Math.sqrt(dr * dr + dc * dc);
      if (dist > radius) continue;

      const idx = r * gw + c;
      const cell = world.cells[idx];
      if (!cell) continue;

      const falloff = 1 - dist / Math.max(1, radius);
      const delta = strength * falloff;

      if (tool === 'RAISE') {
        cell.editHeightDelta = (cell.editHeightDelta || 0) + delta;
      } else if (tool === 'LOWER') {
        cell.editHeightDelta = (cell.editHeightDelta || 0) - delta;
      } else if (tool === 'FLATTEN') {
        const target = averageHeight(world, center.row, center.col, radius);
        const current = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
        cell.editHeightDelta = (cell.editHeightDelta || 0) + (target - current) * falloff * 0.5;
      } else if (tool === 'SMOOTH') {
        const local = averageHeight(world, r, c, Math.max(1, Math.floor(radius / 2)));
        const current = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
        cell.editHeightDelta = (cell.editHeightDelta || 0) + (local - current) * falloff * 0.35;
      }
    }
  }
}

function averageHeight(world: WorldBrain, row: number, col: number, radius: number): number {
  const gw = world.gridWidth;
  const gh = world.gridHeight;
  let sum = 0;
  let count = 0;

  for (let r = Math.max(0, row - radius); r <= Math.min(gh - 1, row + radius); r++) {
    for (let c = Math.max(0, col - radius); c <= Math.min(gw - 1, col + radius); c++) {
      const cell = world.cells[r * gw + c];
      if (!cell) continue;
      sum += cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
      count++;
    }
  }

  return count > 0 ? sum / count : 0;
}

function applySticker(world: WorldBrain, action: StickerApplyAction): void {
  const sticker = action.sticker;
  for (const cell of world.cells) {
    const point = cellToLatLon(world, cell.index);
    if (pointInPolygon(point, sticker.polygon)) {
      if (sticker.type === 'BIOME' && typeof sticker.payload.biomeId === 'number') {
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
  world.rivers = (world.rivers ?? []).filter((r) => String(r.id) !== String(action.riverId));
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

    const intersects =
      yi > point.lat !== yj > point.lat &&
      point.lon < ((xj - xi) * (point.lat - yi)) / (yj - yi + 1e-9) + xi;

    if (intersects) inside = !inside;
  }
  return inside;
}

function cellToLatLon(world: WorldBrain, index: number): { lat: number; lon: number } {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  const lat = 90 - (row / Math.max(1, world.gridHeight - 1)) * 180;
  const lon = (col / Math.max(1, world.gridWidth - 1)) * 360 - 180;
  return { lat, lon };
}
