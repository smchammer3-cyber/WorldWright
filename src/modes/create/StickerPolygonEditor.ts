// ========================================================
// WORLDWRIGHT -- STICKER POLYGON EDITOR (V1.3 SHAPE-FIRST)
// File: src/modes/create/StickerPolygonEditor.ts
//
// Shape-first helpers for sticker creation/editing.
// Supports rectangle spawning, midpoint insertion, movement,
// and application to the world grid.
// ========================================================

import type { WorldBrain, Sticker } from '../../core/worldSchema';

export type StickerToolType = 'BIOME' | 'CULTURE' | 'HEIGHT';

export type LatLonPoint = { lat: number; lon: number };

export const STICKER_TEMPLATES: Record<string, any> = {
  BIOME: {
    shape: 'rectangle',
    blendMode: 'OVERRIDE',
    intensity: 1.0,
    payload: { biomeId: 5 },
  },
  CULTURE: {
    shape: 'rectangle',
    blendMode: 'BLEND',
    intensity: 0.8,
    payload: { cultureId: 'culture_0' },
  },
  HEIGHT: {
    shape: 'rectangle',
    blendMode: 'ADD',
    intensity: 0.5,
    payload: { heightDelta: 0.3 },
  },
};

export function screenToLatLon(
  x: number,
  y: number,
  rect: DOMRect
): { lat: number; lon: number } {
  const relX = x - rect.left;
  const relY = y - rect.top;

  const lon = (relX / rect.width) * 360 - 180;
  const lat = 90 - (relY / rect.height) * 180;

  return {
    lat: clamp(lat, -90, 90),
    lon: wrapLon(lon),
  };
}

export function latLonToScreen(
  lat: number,
  lon: number,
  rect: DOMRect
): { x: number; y: number } {
  const x = rect.left + ((wrapLon(lon) + 180) / 360) * rect.width;
  const y = rect.top + ((90 - clamp(lat, -90, 90)) / 180) * rect.height;
  return { x, y };
}

export function createRectanglePrimitive(
  center: LatLonPoint,
  halfWidthDeg = 14,
  halfHeightDeg = 10
): LatLonPoint[] {
  const left = wrapLon(center.lon - halfWidthDeg);
  const right = wrapLon(center.lon + halfWidthDeg);
  const top = clamp(center.lat + halfHeightDeg, -90, 90);
  const bottom = clamp(center.lat - halfHeightDeg, -90, 90);

  return [
    { lat: top, lon: left },
    { lat: top, lon: right },
    { lat: bottom, lon: right },
    { lat: bottom, lon: left },
  ];
}

export function getPolygonCentroid(points: LatLonPoint[]): LatLonPoint {
  if (points.length === 0) return { lat: 0, lon: 0 };

  let lat = 0;
  let lon = 0;

  for (const p of points) {
    lat += p.lat;
    lon += p.lon;
  }

  return {
    lat: lat / points.length,
    lon: wrapLon(lon / points.length),
  };
}

export function movePolygon(
  points: LatLonPoint[],
  deltaLat: number,
  deltaLon: number
): LatLonPoint[] {
  return points.map((p) => ({
    lat: clamp(p.lat + deltaLat, -90, 90),
    lon: wrapLon(p.lon + deltaLon),
  }));
}

export function insertMidpoint(points: LatLonPoint[], edgeIndex: number): LatLonPoint[] {
  if (points.length < 2) return points.slice();

  const a = points[edgeIndex];
  const b = points[(edgeIndex + 1) % points.length];
  const midpoint: LatLonPoint = {
    lat: (a.lat + b.lat) / 2,
    lon: wrapLon((a.lon + b.lon) / 2),
  };

  const next = points.slice();
  next.splice(edgeIndex + 1, 0, midpoint);
  return next;
}

export function findNearestVertexScreen(
  x: number,
  y: number,
  points: LatLonPoint[],
  rect: DOMRect,
  thresholdPx = 12
): number | null {
  let bestIndex: number | null = null;
  let bestDist = thresholdPx;

  for (let i = 0; i < points.length; i++) {
    const s = latLonToScreen(points[i].lat, points[i].lon, rect);
    const dist = Math.hypot(x - s.x, y - s.y);
    if (dist <= bestDist) {
      bestDist = dist;
      bestIndex = i;
    }
  }

  return bestIndex;
}

export function findNearestEdgeMidpointScreen(
  x: number,
  y: number,
  points: LatLonPoint[],
  rect: DOMRect,
  thresholdPx = 10
): number | null {
  if (points.length < 2) return null;

  let bestIndex: number | null = null;
  let bestDist = thresholdPx;

  for (let i = 0; i < points.length; i++) {
    const a = latLonToScreen(points[i].lat, points[i].lon, rect);
    const b = latLonToScreen(points[(i + 1) % points.length].lat, points[(i + 1) % points.length].lon, rect);
    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2;
    const dist = Math.hypot(x - midX, y - midY);
    if (dist <= bestDist) {
      bestDist = dist;
      bestIndex = i;
    }
  }

  return bestIndex;
}

export function isPointInPolygonNormalized(
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

    const intersect =
      yi > lat !== yj > lat &&
      lon < ((xj - xi) * (lat - yi)) / ((yj - yi) || 1e-9) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
}

export function createSticker(
  id: string,
  type: StickerToolType,
  vertices: LatLonPoint[],
  mode: 'WORLD_RULES' | 'OVERRIDE',
  payload: any,
  falloff = 0.15
): Sticker {
  const normalizedVertices = vertices.map((v) => ({
    lat: (v.lat + 90) / 180,
    lon: (wrapLon(v.lon) + 180) / 360,
  }));

  return {
    id,
    name: `${type} Sticker`,
    type,
    mode,
    polygon: normalizedVertices,
    falloff,
    payload,
  };
}

export function applyStickerToWorld(world: WorldBrain, sticker: Sticker): void {
  if (!world.stickers) {
    world.stickers = [];
  }

  world.stickers.push(sticker);

  const { gridWidth, gridHeight } = world;

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const cellLat = y / gridHeight;
      const cellLon = x / gridWidth;

      if (!isPointInPolygonNormalized(cellLat, cellLon, sticker.polygon)) continue;

      const index = y * gridWidth + x;
      const cell = world.cells[index];
      if (!cell) continue;

      if (sticker.type === 'BIOME' && sticker.payload.biomeId != null) {
        cell.editBiomeId = sticker.payload.biomeId;
      } else if (sticker.type === 'HEIGHT' && typeof sticker.payload.heightDelta === 'number') {
        cell.editHeightDelta = Math.max(
          -1,
          Math.min(1, cell.editHeightDelta + sticker.payload.heightDelta)
        );
      } else if (sticker.type === 'CULTURE' && sticker.payload.cultureId) {
        cell.cultureId = sticker.payload.cultureId;
      }
    }
  }
}

function wrapLon(lon: number): number {
  let value = lon;
  while (value < -180) value += 360;
  while (value > 180) value -= 360;
  return value;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}