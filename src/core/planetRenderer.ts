// ========================================================
// WORLDWRIGHT -- PLANET RENDERER (CPU PREVIEW, SAFE)
// File: src/core/planetRenderer.ts
//
// Returns RGBA 0..255 (opaque) to match AppShell.
// Never throws: invalid indices return debug magenta.
// ========================================================

import type { WorldBrain } from "./worldSchema";

export type PlanetPreview = {
  width: number;
  height: number;
  seaLevel: number;

  // x/y are floats in cell coordinates
  colorAt: (x: number, y: number) => [number, number, number, number];
  minimapColorAt: (x: number, y: number) => [number, number, number, number];

  // Compatibility API
  sampleGlobeColor: (cellIndex: number) => [number, number, number, number];
  sampleMinimapColor: (cellIndex: number) => [number, number, number, number];
};

export function buildPlanetPreview(world: WorldBrain): PlanetPreview {
  const width = world.gridWidth;
  const height = world.gridHeight;
  const seaLevel =
    typeof world.seaLevel === "number"
      ? world.seaLevel
      : typeof world.metadata?.seaLevel === "number"
      ? world.metadata.seaLevel
      : 0;

  const cells = Array.isArray(world.cells) ? world.cells : [];

  function toRGBA01(rgb: [number, number, number]): [number, number, number, number] {
    const r = clamp255(Math.round(rgb[0] * 255));
    const g = clamp255(Math.round(rgb[1] * 255));
    const b = clamp255(Math.round(rgb[2] * 255));
    return [r, g, b, 255];
  }

  function sampleFromRowCol(row: number, col: number): [number, number, number] {
    if (!Number.isInteger(row) || !Number.isInteger(col) || row < 0 || col < 0 || row >= height || col >= width) {
      return [1, 0, 1]; // debug magenta
    }

    const idx = row * width + col;
    const cell = cells[idx];
    if (!cell) return [1, 0, 1];

    const base = Number.isFinite(cell.baseHeight) ? cell.baseHeight : 0;
    const edit = Number.isFinite(cell.editHeightDelta) ? cell.editHeightDelta : 0;
    const sim = Number.isFinite(cell.simHeightDelta) ? cell.simHeightDelta : 0;
    const h = base + edit + sim;

    const temp = clamp01(Number.isFinite(cell.temperature) ? cell.temperature : 0.5);
    const rain = clamp01(Number.isFinite(cell.rainfall) ? cell.rainfall : 0.5);
    const snow = clamp01(Number.isFinite(cell.snowCover) ? cell.snowCover : 0);

    const isWater = !!cell.isWater || h < seaLevel;

    if (isWater) {
      const depth = clamp01((seaLevel - h) * 1.5);
      const b = 0.55 - depth * 0.25;
      return [0.08, 0.22, b];
    }

    const elev = clamp01((h - seaLevel) * 1.2);
    const green = clamp01(rain * 0.9);
    const dry = clamp01(1 - rain);

    let r = clamp01(0.25 + dry * 0.35 + elev * 0.15);
    let g = clamp01(0.25 + green * 0.45 - dry * 0.10);
    let b = clamp01(0.18 + elev * 0.10);

    // snow overlay
    r = lerp(r, 0.92, snow);
    g = lerp(g, 0.94, snow);
    b = lerp(b, 0.98, snow);

    // warmth tint
    const warm = clamp01((temp - 0.5) * 0.8 + 0.5);
    r = clamp01(r + warm * 0.04);
    g = clamp01(g + warm * 0.02);

    return [r, g, b];
  }

  function sampleRGBAFromRowCol(row: number, col: number): [number, number, number, number] {
    return toRGBA01(sampleFromRowCol(row, col));
  }

  return {
    width,
    height,
    seaLevel,

    colorAt: (x, y) => {
      const col = Math.floor(clamp(x, 0, width - 1));
      const row = Math.floor(clamp(y, 0, height - 1));
      return sampleRGBAFromRowCol(row, col);
    },

    minimapColorAt: (x, y) => {
      const col = Math.floor(clamp(x, 0, width - 1));
      const row = Math.floor(clamp(y, 0, height - 1));
      return sampleRGBAFromRowCol(row, col);
    },

    sampleGlobeColor: (cellIndex) => {
      const idx = Number.isInteger(cellIndex) ? cellIndex : -1;
      const row = idx < 0 ? -1 : Math.floor(idx / width);
      const col = idx < 0 ? -1 : idx % width;
      return sampleRGBAFromRowCol(row, col);
    },

    sampleMinimapColor: (cellIndex) => {
      const idx = Number.isInteger(cellIndex) ? cellIndex : -1;
      const row = idx < 0 ? -1 : Math.floor(idx / width);
      const col = idx < 0 ? -1 : idx % width;
      return sampleRGBAFromRowCol(row, col);
    },
  };
}

export function makePlanetPreviewFromWorldBrain(world: WorldBrain): PlanetPreview {
  return buildPlanetPreview(world);
}

export const PlanetRenderer = { buildPlanetPreview };

function clamp01(n: number): number {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

function clamp(n: number, lo: number, hi: number): number {
  return n < lo ? lo : n > hi ? hi : n;
}

function clamp255(n: number): number {
  return n < 0 ? 0 : n > 255 ? 255 : n;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}