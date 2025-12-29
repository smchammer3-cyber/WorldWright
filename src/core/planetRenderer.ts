// ========================================================
// WORLDWRIGHT -- PLANET RENDERER (CPU PREVIEW, SAFE)
// File: src/core/planetRenderer.ts
//
// Key points:
// • Global seaLevel from world.seaLevel (metadata fallback for legacy).
// • Renderer is pure and never throws -- out-of-range or invalid cells return magenta.
// • colorAt(x, y) and minimapColorAt(x, y) expect x/y in cell coordinates (floats).
// • sampleGlobeColor/sampleMinimapColor retained for backwards compatibility.
// ========================================================

import type { WorldBrain } from './worldSchema';

export type PlanetPreview = {
  width: number;
  height: number;
  seaLevel: number;

  // Main API: x,y are floats in [0..width‑1] and [0..height‑1]
  colorAt: (x: number, y: number) => [number, number, number];
  minimapColorAt: (x: number, y: number) => [number, number, number];

  // Compatibility API for any existing calls
  sampleGlobeColor: (cellIndex: number) => [number, number, number];
  sampleMinimapColor: (cellIndex: number) => [number, number, number];
};

/**
 * Build a safe, read-only preview interface from a WorldBrain.
 * It handles invalid indices and missing fields gracefully.
 */
export function buildPlanetPreview(world: WorldBrain): PlanetPreview {
  const width = world.gridWidth;
  const height = world.gridHeight;
  const seaLevel =
    typeof world.seaLevel === 'number'
      ? world.seaLevel
      : typeof world.metadata?.seaLevel === 'number'
      ? world.metadata.seaLevel
      : 0;

  const cells = Array.isArray(world.cells) ? world.cells : [];

  /** Internal: given row/col integers, sample a color or return debug magenta. */
  function sampleFromRowCol(row: number, col: number): [number, number, number] {
    if (
      !Number.isInteger(row) ||
      !Number.isInteger(col) ||
      row < 0 ||
      col < 0 ||
      row >= height ||
      col >= width
    ) {
      return [1, 0, 1]; // debug magenta
    }

    const idx = row * width + col;
    const cell = cells[idx];
    if (!cell) return [1, 0, 1];

    // Safeguard defaults
    const base = Number.isFinite(cell.baseHeight) ? cell.baseHeight : 0;
    const edit = Number.isFinite(cell.editHeightDelta) ? cell.editHeightDelta : 0;
    const sim = Number.isFinite(cell.simHeightDelta) ? cell.simHeightDelta : 0;
    const h = base + edit + sim;

    const temp = clamp01(Number.isFinite(cell.temperature) ? cell.temperature : 0.5);
    const rain = clamp01(Number.isFinite(cell.rainfall) ? cell.rainfall : 0.5);
    const snow = clamp01(Number.isFinite(cell.snowCover) ? cell.snowCover : 0);

    const isWater = cell.isWater || h < seaLevel;

    // Ocean shading
    if (isWater) {
      const depth = clamp01((seaLevel - h) * 1.5);
      const b = 0.55 - depth * 0.25;
      return [0.08, 0.22, b];
    }

    // Land shading
    const elev = clamp01((h - seaLevel) * 1.2);
    const green = clamp01(rain * 0.9);
    const dry = clamp01(1 - rain);

    let r = clamp01(0.25 + dry * 0.35 + elev * 0.15);
    let g = clamp01(0.25 + green * 0.45 - dry * 0.10);
    let b = clamp01(0.18 + elev * 0.10);

    // Snow overlay
    r = lerp(r, 0.92, snow);
    g = lerp(g, 0.94, snow);
    b = lerp(b, 0.98, snow);

    // Warmth tint
    const warm = clamp01((temp - 0.5) * 0.8 + 0.5);
    r = clamp01(r + warm * 0.04);
    g = clamp01(g + warm * 0.02);

    return [r, g, b];
  }

  return {
    width,
    height,
    seaLevel,

    // Primary API: convert floats to nearest cell indices
    colorAt: (x, y) => {
      const col = Math.floor(clamp(x, 0, width - 1));
      const row = Math.floor(clamp(y, 0, height - 1));
      return sampleFromRowCol(row, col);
    },

    minimapColorAt: (x, y) => {
      const col = Math.floor(clamp(x, 0, width - 1));
      const row = Math.floor(clamp(y, 0, height - 1));
      return sampleFromRowCol(row, col);
    },

    // Backwards compatibility: if passed a direct cell index
    sampleGlobeColor: (cellIndex: number) => {
      const idx = Number.isInteger(cellIndex) ? cellIndex : -1;
      const row = idx < 0 ? -1 : Math.floor(idx / width);
      const col = idx < 0 ? -1 : idx % width;
      return sampleFromRowCol(row, col);
    },
    sampleMinimapColor: (cellIndex: number) => {
      const idx = Number.isInteger(cellIndex) ? cellIndex : -1;
      const row = idx < 0 ? -1 : Math.floor(idx / width);
      const col = idx < 0 ? -1 : idx % width;
      return sampleFromRowCol(row, col);
    },
  };
}

/** Export for Generate/Create/Sim to build a preview from a world */
export function makePlanetPreviewFromWorldBrain(world: WorldBrain): PlanetPreview {
  return buildPlanetPreview(world);
}

// Legacy support
export const PlanetRenderer = { buildPlanetPreview };

function clamp01(n: number): number {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

function clamp(n: number, lo: number, hi: number): number {
  return n < lo ? lo : n > hi ? hi : n;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}