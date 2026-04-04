// ========================================================
// WORLDWRIGHT -- PLANET RENDERER (V1.4 CONTINUOUS OCEAN PROOF)
// File: src/core/planetRenderer.ts
//
// Goals:
// - interpret world data more continuously and less bucket-like
// - reduce slabby climate banding
// - keep oceans readable without overwhelming continents
// - reduce over-harsh polar/ice whitening
// - keep raw Generate debugging visually honest
// - PROOF STEP: remove oceanDepthClass color branching and
//   use a continuous ocean depth gradient only
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
    const base = typeof cell.baseHeight === "number" ? cell.baseHeight : 0;
    const editDelta = typeof cell.editHeightDelta === "number" ? cell.editHeightDelta : 0;
    const simDelta = typeof cell.simHeightDelta === "number" ? cell.simHeightDelta : 0;
    return base + editDelta + simDelta;
  }

  function toRGBA255(rgb: [number, number, number]): [number, number, number, number] {
    return [
      clamp255(Math.round(rgb[0] * 255)),
      clamp255(Math.round(rgb[1] * 255)),
      clamp255(Math.round(rgb[2] * 255)),
      255,
    ];
  }

  function stickerOverlayColor(editBiomeId: number | undefined): [number, number, number] | null {
    switch (editBiomeId) {
      case 1: return [0.80, 0.86, 0.92];
      case 3: return [0.66, 0.74, 0.44];
      case 4: return [0.82, 0.70, 0.44];
      case 5: return [0.22, 0.52, 0.26];
      case 6: return [0.58, 0.58, 0.62];
      default: return null;
    }
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

  function sampleOceanColor(_cell: any, h: number): [number, number, number] {
    const depth = clamp01((seaLevel - h) * 1.5);

    // PROOF STEP:
    // Ignore oceanDepthClass entirely and render oceans from a single
    // continuous depth gradient. If the multi-colored polar rings weaken,
    // then ocean depth class coloring was a major visual amplifier.
    const shallow: [number, number, number] = [0.20, 0.54, 0.73];
    const mid: [number, number, number] = [0.08, 0.30, 0.53];
    const deep: [number, number, number] = [0.02, 0.09, 0.24];

    if (depth < 0.35) {
      const t = depth / 0.35;
      return blend(shallow, mid, t);
    }

    const t = (depth - 0.35) / 0.65;
    return blend(mid, deep, t);
  }

  function sampleLandColor(cell: any, h: number): [number, number, number] {
    const rainfall = typeof cell.rainfall === "number" ? clamp01(cell.rainfall) : 0.5;
    const temp = typeof cell.temperature === "number" ? clamp01(cell.temperature) : 0.5;
    const snow = typeof cell.snowCover === "number" ? clamp01(cell.snowCover) : 0;
    const elev = clamp01(Math.max(0, h - seaLevel) * 2.0);

    const arid: [number, number, number] = [0.76, 0.66, 0.42];
    const steppe: [number, number, number] = [0.63, 0.67, 0.38];
    const grass: [number, number, number] = [0.48, 0.63, 0.34];
    const temperate: [number, number, number] = [0.24, 0.50, 0.24];
    const coolForest: [number, number, number] = [0.28, 0.47, 0.29];
    const tropical: [number, number, number] = [0.14, 0.40, 0.18];
    const tundra: [number, number, number] = [0.54, 0.58, 0.52];
    const rock: [number, number, number] = [0.58, 0.57, 0.53];
    const ice: [number, number, number] = [0.82, 0.87, 0.92];

    const dry = 1 - rainfall;
    const warm = temp;

    let rgb = grass;

    rgb = blend(rgb, steppe, clamp01((dry - 0.35) / 0.30));
    rgb = blend(rgb, arid, clamp01((dry - 0.62) / 0.28));

    const tropicality = clamp01((warm - 0.58) / 0.30) * clamp01((rainfall - 0.55) / 0.30);
    rgb = blend(rgb, tropical, tropicality);

    const coolness = clamp01((0.45 - warm) / 0.30);
    rgb = blend(rgb, coolForest, coolness * clamp01((rainfall - 0.35) / 0.35));

    const tundraFactor = clamp01((0.22 - warm) / 0.20);
    rgb = blend(rgb, tundra, tundraFactor);

    const mountain = clamp01((elev - 0.40) / 0.45);
    rgb = blend(rgb, rock, mountain * 0.45);

    const tempC = -22 + temp * 50;
    const permanentIce = tempC < -17 ? clamp01((-17 - tempC) / 12) : 0;
    const iceFactor = clamp01(Math.max(snow * 0.75, permanentIce * 0.85));

    const whitenStrength =
      iceFactor * 0.55 +
      clamp01((elev - 0.88) / 0.12) * 0.35;

    rgb = blend(rgb, ice, clamp01(whitenStrength));

    return rgb;
  }

  function applyStickerTint(
    rgb: [number, number, number],
    cell: any
  ): [number, number, number] {
    const overlay = stickerOverlayColor(cell?.editBiomeId);
    if (
      overlay &&
      typeof cell?.editBiomeId === "number" &&
      cell.editBiomeId !== cell.baseBiomeId
    ) {
      return blend(rgb, overlay, 0.28);
    }
    return rgb;
  }

  function applyCountryBorderTint(
    rgb: [number, number, number],
    _row: number,
    _col: number,
    _cell: any
  ): [number, number, number] {
    return rgb;
  }

  function sampleFromRowCol(row: number, col: number): [number, number, number] {
    if (height === 0 || width === 0) return [1, 0, 1];

    const r = clampRow(row);
    const c = wrapCol(col);
    const idx = r * width + c;
    const cell = cells[idx];
    if (!cell) return [1, 0, 1];

    const h = totalHeightAtCell(cell);
    const isWater = h < seaLevel;

    let rgb = isWater
      ? sampleOceanColor(cell, h)
      : sampleLandColor(cell, h);

    rgb = applyStickerTint(rgb, cell);
    rgb = applyCountryBorderTint(rgb, r, c, cell);

    return rgb;
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