// ========================================================
// WORLDWRIGHT -- STICKER POLYGON EDITOR (V1.3 PRIMITIVES FIXED)
// File: src/modes/create/StickerPolygonEditor.ts
//
// Primitive-based sticker helpers for shape-first editing.
// FIXED: stickers now store raw lat/lon coordinates to match schema.
// ========================================================

import type { WorldBrain, Sticker } from '../../core/worldSchema';

export type StickerToolType = 'BIOME' | 'CULTURE' | 'HEIGHT';
export type StickerPrimitive = 'circle' | 'square' | 'rectangle' | 'triangle' | 'polygon';
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

export function createPrimitive(
  primitive: StickerPrimitive,
  center: LatLonPoint
): LatLonPoint[] {
  switch (primitive) {
    case 'circle':
      return createCirclePrimitive(center, 14, 12);
    case 'square':
      return createRectanglePrimitive(center, 12, 12);
    case 'rectangle':
      return createRectanglePrimitive(center, 16, 10);
    case 'triangle':
      return createTrianglePrimitive(center, 16, 12);
    case 'polygon':
      return createRectanglePrimitive(center, 14, 10);
    default:
      return createRectanglePrimitive(center, 16, 10);
  }
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

export function createTrianglePrimitive(
  center: LatLonPoint,
  halfWidthDeg = 16,
  halfHeightDeg = 12
): LatLonPoint[] {
  return [
    { lat: clamp(center.lat + halfHeightDeg, -90, 90), lon: wrapLon(center.lon) },
    { lat: clamp(center.lat - halfHeightDeg, -90, 90), lon: wrapLon(center.lon + halfWidthDeg) },
    { lat: clamp(center.lat - halfHeightDeg, -90, 90), lon: wrapLon(center.lon - halfWidthDeg) },
  ];
}

export function createCirclePrimitive(
  center: LatLonPoint,
  radiusLonDeg = 14,
  radiusLatDeg = 12,
  segments = 20
): LatLonPoint[] {
  const pts: LatLonPoint[] = [];
  for (let i = 0; i < segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    pts.push({
      lat: clamp(center.lat + Math.sin(t) * radiusLatDeg, -90, 90),
      lon: wrapLon(center.lon + Math.cos(t) * radiusLonDeg),
    });
  }
  return pts;
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

export function scalePolygonFromCenter(
  points: LatLonPoint[],
  center: LatLonPoint,
  scaleX: number,
  scaleY: number
): LatLonPoint[] {
  return points.map((p) => ({
    lat: clamp(center.lat + (p.lat - center.lat) * scaleY, -90, 90),
    lon: wrapLon(center.lon + (p.lon - center.lon) * scaleX),
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

export function getBoundingBox(points: LatLonPoint[]) {
  if (points.length === 0) {
    return { minLat: 0, maxLat: 0, minLon: 0, maxLon: 0 };
  }

  let minLat = points[0].lat;
  let maxLat = points[0].lat;
  let minLon = points[0].lon;
  let maxLon = points[0].lon;

  for (const p of points) {
    minLat = Math.min(minLat, p.lat);
    maxLat = Math.max(maxLat, p.lat);
    minLon = Math.min(minLon, p.lon);
    maxLon = Math.max(maxLon, p.lon);
  }

  return { minLat, maxLat, minLon, maxLon };
}

export function getBoundingHandlePoints(points: LatLonPoint[]) {
  const box = getBoundingBox(points);
  const centerLat = (box.minLat + box.maxLat) / 2;
  const centerLon = wrapLon((box.minLon + box.maxLon) / 2);

  return {
    nw: { lat: box.maxLat, lon: box.minLon },
    ne: { lat: box.maxLat, lon: box.maxLon },
    se: { lat: box.minLat, lon: box.maxLon },
    sw: { lat: box.minLat, lon: box.minLon },
    n: { lat: box.maxLat, lon: centerLon },
    e: { lat: centerLat, lon: box.maxLon },
    s: { lat: box.minLat, lon: centerLon },
    w: { lat: centerLat, lon: box.minLon },
    center: { lat: centerLat, lon: centerLon },
  };
}

export function createSticker(
  id: string,
  type: StickerToolType,
  vertices: LatLonPoint[],
  mode: 'WORLD_RULES' | 'OVERRIDE',
  payload: any,
  falloff = 0.15
): Sticker {
  return {
    id,
    name: `${type} Sticker`,
    type,
    mode,
    polygon: vertices.map((v) => ({
      lat: clamp(v.lat, -90, 90),
      lon: wrapLon(v.lon),
    })),
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
      const cellLat = 90 - ((y + 0.5) / gridHeight) * 180;
      const cellLon = ((x + 0.5) / gridWidth) * 360 - 180;

      if (!isPointInPolygonLatLon(cellLat, cellLon, sticker.polygon)) continue;

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

function isPointInPolygonLatLon(
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

function wrapLon(lon: number): number {
  let value = lon;
  while (value < -180) value += 360;
  while (value > 180) value -= 360;
  return value;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}