// ========================================================
// WORLDWRIGHT -- PLANET RENDERER (V1.3 INTERPRETATION LOCK)
// File: src/core/planetRenderer.ts
//
// Goals:
// - interpret world data faithfully without exaggerating artifacts
// - reduce washed-out white/alpine overreach
// - improve ocean depth readability
// - keep sticker tinting visible but not overpowering
// - keep country borders subtle for evaluation
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
      case 1: return [0.80, 0.86, 0.92]; // tundra/ice tint
      case 3: return [0.66, 0.74, 0.44]; // grass/temperate
      case 4: return [0.82, 0.70, 0.44]; // desert
      case 5: return [0.22, 0.52, 0.26]; // lush/jungle
      case 6: return [0.58, 0.58, 0.62]; // mountain/alpine
      default: return null;
    }
  }

  function sampleOceanColor(cell: any, h: number): [number, number, number] {
    const depth = clamp01((seaLevel - h) * 1.5);
    const cls = cell?.oceanDepthClass ?? null;

    // Base ramp is calmer and less neon than before.
    let shallow: [number, number, number] = [0.19, 0.52, 0.72];
    let mid: [number, number, number] = [0.08, 0.30, 0.54];
    let deep: [number, number, number] = [0.02, 0.10, 0.28];

    if (cls === "SHELF") {
      shallow = [0.24, 0.58, 0.75];
    } else if (cls === "RIDGE") {
      shallow = [0.17, 0.48, 0.68];
      mid = [0.07, 0.28, 0.50];
    } else if (cls === "SLOPE") {
      mid = [0.07, 0.26, 0.46];
    } else if (cls === "ABYSSAL") {
      deep = [0.02, 0.08, 0.23];
    } else if (cls === "TRENCH") {
      deep = [0.01, 0.06, 0.18];
    }

    let r: number;
    let g: number;
    let b: number;

    if (depth < 0.35) {
      const t = depth / 0.35;
      r = lerp(shallow[0], mid[0], t);
      g = lerp(shallow[1], mid[1], t);
      b = lerp(shallow[2], mid[2], t);
    } else {
      const t = (depth - 0.35) / 0.65;
      r = lerp(mid[0], deep[0], t);
      g = lerp(mid[1], deep[1], t);
      b = lerp(mid[2], deep[2], t);
    }

    return [r, g, b];
  }

  function sampleLandColor(cell: any, h: number): [number, number, number] {
    const rainfall = typeof cell.rainfall === "number" ? clamp01(cell.rainfall) : 0.5;
    const temp = typeof cell.temperature === "number" ? clamp01(cell.temperature) : 0.5;
    const snow = typeof cell.snowCover === "number" ? clamp01(cell.snowCover) : 0;
    const elev = clamp01(Math.max(0, h - seaLevel) * 2.0);

    // Base biome-style interpretation from climate, but more restrained.
    let r = 0.40;
    let g = 0.48;
    let b = 0.32;

    // Convert normalized temp to rough Celsius-like scale for snow cues
    const tempC = -22 + temp * 50;
    const permanentIce = tempC < -17 ? clamp01((-17 - tempC) / 10) : 0;

    // Only very cold / truly alpine areas go close to white.
    if (snow > 0.88 || permanentIce > 0.35 || elev > 0.94) {
      const iceFactor = clamp01(Math.max(snow, permanentIce, elev > 0.94 ? 1.0 : 0.0));
      r = lerp(0.70, 0.83, iceFactor);
      g = lerp(0.74, 0.87, iceFactor);
      b = lerp(0.78, 0.92, iceFactor);
    } else if (temp < 0.18) {
      // cold scrub / tundra stone
      r = 0.54;
      g = 0.58;
      b = 0.52;
    } else if (rainfall < 0.12) {
      // driest deserts
      r = 0.76;
      g = 0.66;
      b = 0.42;
    } else if (rainfall < 0.24) {
      // dry steppe / semi-arid
      r = 0.63;
      g = 0.67;
      b = 0.38;
    } else if (rainfall < 0.46) {
      // grasslands / temperate fields
      r = 0.48;
      g = 0.63;
      b = 0.34;
    } else if (temp < 0.38) {
      // cool forest
      r = 0.28;
      g = 0.47;
      b = 0.29;
    } else if (temp > 0.64 && rainfall > 0.62) {
      // lush tropical
      r = 0.14;
      g = 0.40;
      b = 0.18;
    } else {
      // temperate forest / mixed vegetation
      r = 0.24;
      g = 0.50;
      b = 0.24;
    }

    // Slight elevation desaturation/lift, not chalky white
    if (elev > 0.34) {
      const mountain = clamp01((elev - 0.34) / 0.66);
      r = lerp(r, 0.58, mountain * 0.16);
      g = lerp(g, 0.57, mountain * 0.16);
      b = lerp(b, 0.53, mountain * 0.16);
    }

    return [r, g, b];
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
      return [
        lerp(rgb[0], overlay[0], 0.28),
        lerp(rgb[1], overlay[1], 0.28),
        lerp(rgb[2], overlay[2], 0.28),
      ];
    }
    return rgb;
  }

  function applyCountryBorderTint(
    rgb: [number, number, number],
    row: number,
    col: number,
    cell: any
  ): [number, number, number] {
    if (!cell || cell.isWater || cell.countryId == null) return rgb;

    const myId = cell.countryId;
    let diffCount = 0;

    const neighbors: Array<{ dr: number; dc: number }> = [
      { dr: -1, dc: 0 }, { dr: 1, dc: 0 }, { dr: 0, dc: -1 }, { dr: 0, dc: 1 },
      { dr: -1, dc: -1 }, { dr: -1, dc: 1 }, { dr: 1, dc: -1 }, { dr: 1, dc: 1 },
    ];

    for (const n of neighbors) {
      const nr = clampRow(row + n.dr);
      const nc = wrapCol(col + n.dc);
      const nCell = cells[nr * width + nc];
      const nid = nCell?.countryId;
      if (nid != null && nid !== myId) diffCount++;
    }

    if (diffCount <= 0) return rgb;

    const strength = clamp01(diffCount / 7) * 0.12;
    return [
      lerp(rgb[0], 0.18, strength),
      lerp(rgb[1], 0.20, strength),
      lerp(rgb[2], 0.22, strength),
    ];
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