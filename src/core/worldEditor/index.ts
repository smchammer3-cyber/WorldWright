// ========================================================
// JARVIS CHANGE HEADER -- EDITOR REALIGNMENT (V1.3 GLOBAL SEALEVEL + STICKERS)
// File: src/core/worldEditor/index.ts
//
// Fixes:
// - Computes water using world.seaLevel (single source of truth).
// - Keeps edits non-destructive: only writes editHeightDelta/editBiomeId/cultureId/cultureMix.
// - Sticker input matches V1.3 schema Sticker: {type, polygon, falloff, mode, metadata}.
// - Polygon tool is vertex-based (no freehand). Uses point-in-polygon on cell centers.
// ========================================================

import { WorldBrain, Sticker } from "../worldSchema";

// -----------------------------
// Types
// -----------------------------

export type TerrainTool =
  | { type: "RAISE"; radius: number; strength: number }
  | { type: "LOWER"; radius: number; strength: number }
  | { type: "FLATTEN"; radius: number; strength: number; targetHeight?: number }
  | { type: "SMOOTH"; radius: number; strength: number };

export interface TerrainStroke {
  x: number; // grid coord
  y: number; // grid coord
  tool: TerrainTool;
}

// -----------------------------
// Helpers
// -----------------------------

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function dist(ax: number, ay: number, bx: number, by: number) {
  const dx = ax - bx;
  const dy = ay - by;
  return Math.sqrt(dx * dx + dy * dy);
}

function falloffWeight(d: number, r: number) {
  if (d >= r) return 0;
  const t = 1 - d / r; // 1 at center, 0 at edge
  // Smoothstep-ish
  return t * t * (3 - 2 * t);
}

function cellIndex(world: WorldBrain, x: number, y: number) {
  return y * world.gridWidth + x;
}

function recomputeWaterForCell(world: WorldBrain, idx: number) {
  const c = world.cells[idx];
  const h = c.baseHeight + c.editHeightDelta + c.simHeightDelta;
  c.isWater = h < world.seaLevel;
}

function recomputeWaterInRadius(world: WorldBrain, cx: number, cy: number, r: number) {
  const minX = clamp(Math.floor(cx - r), 0, world.gridWidth - 1);
  const maxX = clamp(Math.ceil(cx + r), 0, world.gridWidth - 1);
  const minY = clamp(Math.floor(cy - r), 0, world.gridHeight - 1);
  const maxY = clamp(Math.ceil(cy + r), 0, world.gridHeight - 1);

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const d = dist(cx, cy, x + 0.5, y + 0.5);
      if (d <= r) recomputeWaterForCell(world, cellIndex(world, x, y));
    }
  }
}

// Point in polygon (ray casting)
function pointInPoly(px: number, py: number, poly: [number, number][]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersect =
      yi > py !== yj > py &&
      px < ((xj - xi) * (py - yi)) / (yj - yi + 1e-9) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// Distance from point to segment
function pointSegDist(px: number, py: number, ax: number, ay: number, bx: number, by: number) {
  const vx = bx - ax;
  const vy = by - ay;
  const wx = px - ax;
  const wy = py - ay;

  const c1 = vx * wx + vy * wy;
  if (c1 <= 0) return dist(px, py, ax, ay);

  const c2 = vx * vx + vy * vy;
  if (c2 <= c1) return dist(px, py, bx, by);

  const t = c1 / c2;
  return dist(px, py, ax + t * vx, ay + t * vy);
}

function distanceToPolygonEdge(px: number, py: number, poly: [number, number][]) {
  let best = Infinity;
  for (let i = 0; i < poly.length; i++) {
    const [ax, ay] = poly[i];
    const [bx, by] = poly[(i + 1) % poly.length];
    best = Math.min(best, pointSegDist(px, py, ax, ay, bx, by));
  }
  return best;
}

// -----------------------------
// Terrain editing
// -----------------------------

export function applyTerrainStroke(world: WorldBrain, stroke: TerrainStroke) {
  const { x: cx, y: cy, tool } = stroke;
  const r = Math.max(0.5, tool.radius);

  const minX = clamp(Math.floor(cx - r), 0, world.gridWidth - 1);
  const maxX = clamp(Math.ceil(cx + r), 0, world.gridWidth - 1);
  const minY = clamp(Math.floor(cy - r), 0, world.gridHeight - 1);
  const maxY = clamp(Math.ceil(cy + r), 0, world.gridHeight - 1);

  // Precompute target for flatten if not provided
  let flattenTarget: number | null = null;
  if (tool.type === "FLATTEN") {
    flattenTarget =
      typeof tool.targetHeight === "number"
        ? tool.targetHeight
        : (() => {
            const idx = cellIndex(world, clamp(Math.floor(cx), 0, world.gridWidth - 1), clamp(Math.floor(cy), 0, world.gridHeight - 1));
            const c = world.cells[idx];
            return c.baseHeight + c.editHeightDelta + c.simHeightDelta;
          })();
  }

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const px = x + 0.5;
      const py = y + 0.5;
      const d = dist(cx, cy, px, py);
      if (d > r) continue;

      const w = falloffWeight(d, r);
      const idx = cellIndex(world, x, y);
      const c = world.cells[idx];

      const current = c.baseHeight + c.editHeightDelta + c.simHeightDelta;

      if (tool.type === "RAISE") {
        c.editHeightDelta += tool.strength * w;
      } else if (tool.type === "LOWER") {
        c.editHeightDelta -= tool.strength * w;
      } else if (tool.type === "FLATTEN") {
        const target = flattenTarget ?? current;
        const deltaToTarget = target - current;
        c.editHeightDelta += deltaToTarget * tool.strength * w;
      } else if (tool.type === "SMOOTH") {
        // Simple local smooth: blend toward neighborhood average (base+edit only)
        let sum = 0;
        let count = 0;
        for (let oy = -1; oy <= 1; oy++) {
          for (let ox = -1; ox <= 1; ox++) {
            const nx = x + ox;
            const ny = y + oy;
            if (nx < 0 || ny < 0 || nx >= world.gridWidth || ny >= world.gridHeight) continue;
            const n = world.cells[cellIndex(world, nx, ny)];
            sum += n.baseHeight + n.editHeightDelta + n.simHeightDelta;
            count++;
          }
        }
        const avg = count > 0 ? sum / count : current;
        const delta = avg - current;
        c.editHeightDelta += delta * tool.strength * w;
      }

      recomputeWaterForCell(world, idx);
    }
  }

  // optional: recompute water in radius again (safe)
  recomputeWaterInRadius(world, cx, cy, r);
}

// -----------------------------
// Sticker application
// -----------------------------

export function applySticker(world: WorldBrain, sticker: Sticker) {
  // Ensure stickers array exists
  if (!world.stickers) world.stickers = [];
  world.stickers.push(sticker);

  const poly = sticker.polygon;
  if (!poly || poly.length < 3) return;

  // Bounding box for speed
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  for (const [vx, vy] of poly) {
    minX = Math.min(minX, vx);
    minY = Math.min(minY, vy);
    maxX = Math.max(maxX, vx);
    maxY = Math.max(maxY, vy);
  }

  const pad = Math.max(1, sticker.falloff || 0);
  const bx0 = clamp(Math.floor(minX - pad), 0, world.gridWidth - 1);
  const by0 = clamp(Math.floor(minY - pad), 0, world.gridHeight - 1);
  const bx1 = clamp(Math.ceil(maxX + pad), 0, world.gridWidth - 1);
  const by1 = clamp(Math.ceil(maxY + pad), 0, world.gridHeight - 1);

  for (let y = by0; y <= by1; y++) {
    for (let x = bx0; x <= bx1; x++) {
      const px = x + 0.5;
      const py = y + 0.5;

      const inside = pointInPoly(px, py, poly);
      if (!inside && (sticker.falloff || 0) <= 0) continue;

      // falloff weight if outside-but-near-edge or to soften inside edges
      let w = 1;
      if (sticker.falloff && sticker.falloff > 0) {
        const dEdge = distanceToPolygonEdge(px, py, poly);
        // inside gets full weight; near edge gets softened; outside fades to 0
        if (!inside) {
          if (dEdge > sticker.falloff) continue;
          w = 1 - dEdge / sticker.falloff;
        } else {
          // soften edge inside too
          w = Math.max(0, Math.min(1, dEdge / sticker.falloff));
          w = 1 - (1 - w) * (1 - w); // ease
        }
      }

      const idx = cellIndex(world, x, y);
      const c = world.cells[idx];

      // Apply based on sticker.type and metadata payload
      const meta = sticker.metadata || {};

      switch (sticker.type) {
        case "BIOME": {
          const biomeId = typeof meta.biomeId === "number" ? meta.biomeId : null;
          if (biomeId !== null) {
            // blend only via editBiomeId, never mutate baseBiomeId
            c.editBiomeId = biomeId;
          }
          break;
        }

        case "CULTURE": {
          const cultureId = typeof meta.cultureId === "string" ? meta.cultureId : null;
          if (cultureId) {
            c.cultureId = cultureId;

            // Optional mixing support
            if (Array.isArray(meta.mix)) {
              c.cultureMix = meta.mix;
            } else if (meta.weight && typeof meta.weight === "number") {
              c.cultureMix = [{ cultureId, weight: clamp(meta.weight * w, 0, 1) }];
            }
          }
          break;
        }

        case "TERRAIN": {
          // Height delta (edit layer)
          const heightDelta = typeof meta.heightDelta === "number" ? meta.heightDelta : 0;
          if (heightDelta !== 0) {
            c.editHeightDelta += heightDelta * w;
            recomputeWaterForCell(world, idx);
          }

          // Optional flatten target (absolute)
          if (typeof meta.flattenTo === "number") {
            const current = c.baseHeight + c.editHeightDelta + c.simHeightDelta;
            const delta = meta.flattenTo - current;
            c.editHeightDelta += delta * w;
            recomputeWaterForCell(world, idx);
          }
          break;
        }

        default:
          // Unknown sticker types are stored but do not mutate world cells yet.
          break;
      }
    }
  }

  // conservative: recompute water around the bbox
  recomputeWaterInRadius(
    world,
    (bx0 + bx1) * 0.5,
    (by0 + by1) * 0.5,
    Math.max(bx1 - bx0, by1 - by0) * 0.6,
  );
}