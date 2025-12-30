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

  // Pre-rasterized RGBA bytes (width * height * 4), 0..255.
  // Used by canvas fallbacks. Primary 3D globe should sample via colorAt.
  rgba: Uint8ClampedArray;

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
    if (row < 0 || row >= height || col < 0 || col >= width) return [1, 0, 1]; // magenta debug
    const idx = row * width + col;
    const cell = cells[idx];
    if (!cell) return [1, 0, 1];

    // Height sampling (supports delta layers if present)
    const base =
      typeof cell.baseHeight === "number"
        ? cell.baseHeight
        : typeof cell.height === "number"
        ? cell.height
        : 0;

    const editDelta = typeof cell.editHeightDelta === "number" ? cell.editHeightDelta : 0;
    const simDelta = typeof cell.simHeightDelta === "number" ? cell.simHeightDelta : 0;
    const h = base + editDelta + simDelta;

    const isWater = typeof cell.isWater === "boolean" ? cell.isWater : h < seaLevel;

    // Basic biome-ish shading (stable + deterministic)
    const temp = typeof cell.temperature === "number" ? clamp01(cell.temperature) : 0.5;
    const moist = typeof cell.moisture === "number" ? clamp01(cell.moisture) : 0.5;
    const snow = typeof cell.snowCover === "number" ? clamp01(cell.snowCover) : 0;

    if (isWater) {
      // deeper water darker
      const depth = clamp01((seaLevel - h) * 0.6);
      return [0.06, 0.16, clamp01(0.45 - depth * 0.22)];
    }

    // Land: start green → dry brown → snowy white
    const dry = clamp01(1 - moist);
    let r = lerp(0.12, 0.44, dry);
    let g = lerp(0.36, 0.34, dry);
    let b = lerp(0.14, 0.10, dry);

    // elevation tint
    const elev = clamp01((h - seaLevel) * 0.25);
    r = clamp01(r + elev * 0.10);
    g = clamp01(g + elev * 0.06);
    b = clamp01(b + elev * 0.04);

    // warmth tint
    const warm = clamp01((temp - 0.5) * 0.8 + 0.5);
    r = clamp01(r + warm * 0.04);
    g = clamp01(g + warm * 0.02);

    // snow overlay
    if (snow > 0) {
      const s = clamp01(snow);
      r = lerp(r, 0.92, s);
      g = lerp(g, 0.92, s);
      b = lerp(b, 0.96, s);
    }

    return [r, g, b];
  }

  function sampleRGBAFromRowCol(row: number, col: number): [number, number, number, number] {
    return toRGBA01(sampleFromRowCol(row, col));
  }

  // Pre-rasterize for canvas fallbacks (Create/Sim currently use preview.rgba).
  // This makes the contract explicit and prevents runtime mismatches.
  const rgba = rasterizeToBytes(width, height, (x, y) => {
    const col = Math.floor(clamp(x, 0, width - 1));
    const row = Math.floor(clamp(y, 0, height - 1));
    return sampleRGBAFromRowCol(row, col);
  });

  return {
    width,
    height,
    seaLevel,

    rgba,

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
  if (!Number.isFinite(n)) return 0;
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

function clamp255(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return n < 0 ? 0 : n > 255 ? 255 : n;
}

function clamp(n: number, lo: number, hi: number): number {
  if (!Number.isFinite(n)) return lo;
  if (n < lo) return lo;
  if (n > hi) return hi;
  return n;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function rasterizeToBytes(
  w: number,
  h: number,
  sample: (x: number, y: number) => [number, number, number, number]
): Uint8ClampedArray {
  const out = new Uint8ClampedArray(w * h * 4);
  let o = 0;

  // Sample at pixel centers in cell coordinates.
  for (let y = 0; y < h; y++) {
    const sy = y + 0.5;
    for (let x = 0; x < w; x++) {
      const sx = x + 0.5;
      const rgba = sample(sx, sy);
      out[o++] = rgba[0] | 0;
      out[o++] = rgba[1] | 0;
      out[o++] = rgba[2] | 0;
      out[o++] = rgba[3] | 0;
    }
  }

  return out;
}

export function rasterizePlanetPreview(preview: PlanetPreview, outW: number, outH: number): Uint8ClampedArray {
  const w = Math.max(1, Math.floor(outW));
  const h = Math.max(1, Math.floor(outH));
  // Map output pixels to preview cell coordinates.
  return rasterizeToBytes(w, h, (x, y) => {
    const sx = (x / w) * preview.width;
    const sy = (y / h) * preview.height;
    return preview.colorAt(sx, sy);
  });
}

export function rasterizeMinimapPreview(preview: PlanetPreview, outW: number, outH: number): Uint8ClampedArray {
  const w = Math.max(1, Math.floor(outW));
  const h = Math.max(1, Math.floor(outH));
  return rasterizeToBytes(w, h, (x, y) => {
    const sx = (x / w) * preview.width;
    const sy = (y / h) * preview.height;
    return preview.minimapColorAt(sx, sy);
  });
}