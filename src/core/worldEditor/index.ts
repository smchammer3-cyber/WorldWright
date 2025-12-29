// ========================================================
// WORLDWRIGHT -- WORLD EDITOR (V1.3)
// File: src/core/worldEditor/index.ts
//
// Non-destructive edits:
// - Terrain tools modify editHeightDelta only.
// - Biome edits modify editBiomeId only.
// - Culture edits modify cultureId/cultureMix only.
// Uses global world.seaLevel to recompute isWater.
// ========================================================

import { WorldBrain, Sticker } from "../worldSchema";

export type TerrainBrushMode = "RAISE" | "LOWER" | "FLATTEN" | "SMOOTH";

export interface TerrainToolParams {
  centerX: number;
  centerY: number;
  radius: number;
  strength: number; // 0..1
  mode: TerrainBrushMode;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function idxOf(x: number, y: number, w: number) {
  return y * w + x;
}

export function applyTerrainTool(world: WorldBrain, p: TerrainToolParams): WorldBrain {
  const next = structuredClone(world);

  const w = next.gridWidth;
  const h = next.gridHeight;

  const cx = p.centerX;
  const cy = p.centerY;

  const r = Math.max(1, p.radius);
  const r2 = r * r;

  // For flatten/smooth, compute target height from the center cell
  const cxi = clamp(Math.round(cx), 0, w - 1);
  const cyi = clamp(Math.round(cy), 0, h - 1);
  const cIndex = idxOf(cxi, cyi, w);
  const cCell = next.cells[cIndex];
  const centerHeight =
    cCell.baseHeight + cCell.editHeightDelta + cCell.simHeightDelta;

  // Brush
  const x0 = clamp(Math.floor(cx - r), 0, w - 1);
  const x1 = clamp(Math.ceil(cx + r), 0, w - 1);
  const y0 = clamp(Math.floor(cy - r), 0, h - 1);
  const y1 = clamp(Math.ceil(cy + r), 0, h - 1);

  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const d2 = dx * dx + dy * dy;
      if (d2 > r2) continue;

      const t = 1 - Math.sqrt(d2) / r; // 0..1
      const falloff = t * t; // smoother

      const i = idxOf(x, y, w);
      const cell = next.cells[i];

      const base = cell.baseHeight + cell.simHeightDelta;
      const current = base + cell.editHeightDelta;

      if (p.mode === "RAISE") {
        cell.editHeightDelta += falloff * p.strength * 0.06;
      } else if (p.mode === "LOWER") {
        cell.editHeightDelta -= falloff * p.strength * 0.06;
      } else if (p.mode === "FLATTEN") {
        const delta = centerHeight - current;
        cell.editHeightDelta += delta * falloff * p.strength * 0.35;
      } else if (p.mode === "SMOOTH") {
        // light smoothing toward center height to avoid heavy blur
        const delta = (centerHeight - current);
        cell.editHeightDelta += delta * falloff * p.strength * 0.12;
      }

      // Recompute water from global seaLevel
      const height = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
      cell.isWater = height < next.seaLevel;
    }
  }

  next.metadata.updatedAt = new Date().toISOString();
  return next;
}

/**
 * Sticker application: polygon is a list of cell indices.
 * For V1.3, stickers are data-driven. This is a minimal safe application.
 */
export function applySticker(world: WorldBrain, sticker: Sticker): WorldBrain {
  const next = structuredClone(world);

  // Add to world
  next.stickers.push(sticker);

  // Apply effect to cells listed in polygon (cell indices)
  for (const cellIndex of sticker.polygon) {
    const cell = next.cells[cellIndex];
    if (!cell) continue;

    if (sticker.type === "BIOME") {
      const biomeId = Number(sticker.data?.biomeId);
      if (Number.isFinite(biomeId)) cell.editBiomeId = biomeId;
    }

    if (sticker.type === "CULTURE") {
      const cultureId = Number(sticker.data?.cultureId);
      if (Number.isFinite(cultureId)) cell.cultureId = cultureId;
    }

    if (sticker.type === "TERRAIN") {
      const delta = Number(sticker.data?.heightDelta);
      if (Number.isFinite(delta)) cell.editHeightDelta += delta;
      const height = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
      cell.isWater = height < next.seaLevel;
    }
  }

  next.metadata.updatedAt = new Date().toISOString();
  return next;
}