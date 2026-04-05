// ========================================================
// WORLDWRIGHT -- PLANET RENDERER (V1.3 RAW HEIGHT PROOF MODE)
// File: src/core/planetRenderer.ts
//
// Purpose:
// - isolate renderer/recompute responsibility for the bullseye
// - render ONLY from raw total height and sea level
// - ignore climate, rainfall, snow, biome paint, stickers, and borders
// ========================================================

import type { WorldBrain } from "./worldSchema";

export type PlanetPreview = {
  width: number;
  height: number;
  seaLevel: number;
  rgba: Uint8ClampedArray;
  colorAt: (x: number, y: number) => [number, number, number, number];
  minimapColorAt: (x: number, y: number) => [number, number, number, number];
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

  function wrapCol(c: number): number {
    if (width === 0) return 0;
    const m = c % width;
    return m < 0 ? m + width : m;
  }

  function clampRow(r: number): number {
    if (height === 0) return 0;
    if (r < 0) return 0;
    if (r >= height) return height - 1;
    return r;
  }

  function totalHeightAtCell(cell: any): number {
    if (!cell) return 0;
    const base =
      typeof cell.baseHeight === "number"
        ? cell.baseHeight
        : typeof cell.height === "number"
        ? cell.height
        : 0;
    const editDelta = typeof cell.editHeightDelta === "number" ? cell.editHeightDelta : 0;
    const simDelta = typeof cell.simHeightDelta === "number" ? cell.simHeightDelta : 0;
    return base + editDelta + simDelta;
  }

  function blend(
    a: [number, number, number],
    b: [number, number, number],
    t: number
  ): [number, number, number] {
    return [
      lerp(a[0], b[0], t),
      lerp(a[1], b[1], t),
      lerp(a[2], b[2], t),
    ];
  }

  function oceanColorFromHeight(h: number): [number, number, number] {
    const depth = clamp01((seaLevel - h) * 1.7);

    const shallow: [number, number, number] = [0.18, 0.48, 0.68];
    const mid: [number, number, number] = [0.09, 0.30, 0.52];
    const deep: [number, number, number] = [0.03, 0.12, 0.32];

    if (depth < 0.4) {
      return blend(shallow, mid, depth / 0.4);
    }
    return blend(mid, deep, (depth - 0.4) / 0.6);
  }

  function landColorFromHeight(h: number): [number, number, number] {
    const elev = clamp01((h - seaLevel) * 2.2);

    const beach: [number, number, number] = [0.78, 0.70, 0.52];
    const low: [number, number, number] = [0.44, 0.60, 0.34];
    const mid: [number, number, number] = [0.34, 0.50, 0.28];
    const high: [number, number, number] = [0.48, 0.52, 0.42];
    const rock: [number, number, number] = [0.60, 0.60, 0.66];
    const snow: [number, number, number] = [0.84, 0.89, 0.95];

    if (elev < 0.08) return blend(beach, low, elev / 0.08);
    if (elev < 0.32) return blend(low, mid, (elev - 0.08) / 0.24);
    if (elev < 0.60) return blend(mid, high, (elev - 0.32) / 0.28);
    if (elev < 0.84) return blend(high, rock, (elev - 0.60) / 0.24);
    return blend(rock, snow, (elev - 0.84) / 0.16);
  }

  function sampleFromRowCol(row: number, col: number): [number, number, number] {
    if (height === 0 || width === 0) return [1, 0, 1];

    const r = clampRow(row);
    const c = wrapCol(col);
    const idx = r * width + c;
    const cell = cells[idx];
    if (!cell) return [1, 0, 1];

    const h = totalHeightAtCell(cell);
    return h < seaLevel ? oceanColorFromHeight(h) : landColorFromHeight(h);
  }

  function toRGBA255(rgb: [number, number, number]): [number, number, number, number] {
    return [
      clamp255(Math.round(rgb[0] * 255)),
      clamp255(Math.round(rgb[1] * 255)),
      clamp255(Math.round(rgb[2] * 255)),
      255,
    ];
  }

  function sampleRGBAFromRowCol(row: number, col: number): [number, number, number, number] {
    return toRGBA255(sampleFromRowCol(row, col));
  }

  const rgba = rasterizeToBytes(width, height, (x, y) => {
    const col = Math.floor(x);
    const row = Math.floor(y);
    return sampleRGBAFromRowCol(row, col);
  });

  return {
    width,
    height,
    seaLevel,
    rgba,
    colorAt: (x, y) => {
      const col = Math.floor(x);
      const row = Math.floor(y);
      return sampleRGBAFromRowCol(row, col);
    },
    minimapColorAt: (x, y) => {
      const col = Math.floor(x);
      const row = Math.floor(y);
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

export function rasterizePlanetPreview(
  preview: PlanetPreview,
  outW: number,
  outH: number
): Uint8ClampedArray {
  const w = Math.max(1, Math.floor(outW));
  const h = Math.max(1, Math.floor(outH));
  return rasterizeToBytes(w, h, (x, y) => {
    const sx = (x / w) * preview.width;
    const sy = (y / h) * preview.height;
    return preview.colorAt(sx, sy);
  });
}

export function rasterizeMinimapPreview(
  preview: PlanetPreview,
  outW: number,
  outH: number
): Uint8ClampedArray {
  const w = Math.max(1, Math.floor(outW));
  const h = Math.max(1, Math.floor(outH));
  return rasterizeToBytes(w, h, (x, y) => {
    const sx = (x / w) * preview.width;
    const sy = (y / h) * preview.height;
    return preview.minimapColorAt(sx, sy);
  });
}