// WorldWright – World Editor (V1.3 Spine)
//
// Non-destructive editing operations that modify ONLY editable layers.
// No base world data is mutated here.

import { WorldBrain, Sticker } from '../worldSchema';

export enum TerrainToolType {
  RAISE = 'RAISE',
  LOWER = 'LOWER',
  FLATTEN = 'FLATTEN',
  SMOOTH = 'SMOOTH',
}

export function applyTerrainTool(
  world: WorldBrain,
  row: number,
  col: number,
  radius: number,
  delta: number,
  tool: TerrainToolType,
): void {
  const { gridWidth, gridHeight, cells } = world;
  const r2 = radius * radius;

  for (let y = Math.floor(row - radius); y <= Math.ceil(row + radius); y++) {
    for (let x = Math.floor(col - radius); x <= Math.ceil(col + radius); x++) {
      const dy = y - row;
      const dx = x - col;
      if (dx * dx + dy * dy > r2) continue;

      const rr = (y + gridHeight) % gridHeight;
      const cc = (x + gridWidth) % gridWidth;
      const idx = rr * gridWidth + cc;
      const cell = cells[idx];

      switch (tool) {
        case TerrainToolType.RAISE:
          cell.editHeightDelta += delta;
          break;

        case TerrainToolType.LOWER:
          cell.editHeightDelta -= delta;
          break;

        case TerrainToolType.FLATTEN: {
          const target = cell.baseHeight + delta;
          const current = cell.baseHeight + cell.editHeightDelta;
          cell.editHeightDelta += target - current;
          break;
        }

        case TerrainToolType.SMOOTH: {
          let sum = 0;
          let count = 0;
          for (const [dr, dc] of [
            [0, 1], [1, 0], [-1, 0], [0, -1],
            [1, 1], [-1, -1], [1, -1], [-1, 1],
          ]) {
            const nr = (rr + dr + gridHeight) % gridHeight;
            const nc = (cc + dc + gridWidth) % gridWidth;
            const nIdx = nr * gridWidth + nc;
            sum += cells[nIdx].baseHeight + cells[nIdx].editHeightDelta;
            count++;
          }
          const avg = sum / count;
          const current = cell.baseHeight + cell.editHeightDelta;
          cell.editHeightDelta += (avg - current) * 0.5;
          break;
        }
      }

      const height = cell.baseHeight + cell.editHeightDelta;
      cell.isWater = height < cell.seaLevel;
    }
  }
}

export function applySticker(world: WorldBrain, sticker: Sticker): void {
  const { gridWidth, gridHeight, cells } = world;

  const lats = sticker.polygon.map(p => p.lat);
  const lons = sticker.polygon.map(p => p.lon);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);

  function inside(lat: number, lon: number): boolean {
    let hit = false;
    for (let i = 0, j = sticker.polygon.length - 1; i < sticker.polygon.length; j = i++) {
      const a = sticker.polygon[i];
      const b = sticker.polygon[j];
      const intersect =
        (a.lat > lat) !== (b.lat > lat) &&
        lon < ((b.lon - a.lon) * (lat - a.lat)) / (b.lat - a.lat) + a.lon;
      if (intersect) hit = !hit;
    }
    return hit;
  }

  for (let r = 0; r < gridHeight; r++) {
    const lat = (r / (gridHeight - 1)) * 180 - 90;
    if (lat < minLat || lat > maxLat) continue;

    for (let c = 0; c < gridWidth; c++) {
      const lon = (c / (gridWidth - 1)) * 360 - 180;
      if (lon < minLon || lon > maxLon) continue;

      if (!inside(lat, lon)) continue;

      const idx = r * gridWidth + c;
      const cell = cells[idx];

      switch (sticker.type) {
        case 'BIOME':
          if (typeof sticker.metadata?.biomeId === 'number') {
            cell.editBiomeId = sticker.metadata.biomeId;
          }
          break;

        case 'CULTURE':
          if (typeof sticker.metadata?.cultureId === 'string') {
            cell.cultureId = sticker.metadata.cultureId;
            cell.cultureMix = [{ cultureId: sticker.metadata.cultureId, weight: 1 }];
          }
          break;

        case 'TERRAIN':
          if (typeof sticker.metadata?.heightDelta === 'number') {
            cell.editHeightDelta += sticker.metadata.heightDelta;
            cell.isWater =
              cell.baseHeight + cell.editHeightDelta < cell.seaLevel;
          }
          break;
      }
    }
  }

  world.stickers ??= [];
  world.stickers.push(sticker);
}