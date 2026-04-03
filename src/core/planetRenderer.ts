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

  function toRGBA01(rgb: [number, number, number]): [number, number, number, number] {
    const r = clamp255(Math.round(rgb[0] * 255));
    const g = clamp255(Math.round(rgb[1] * 255));
    const b = clamp255(Math.round(rgb[2] * 255));
    return [r, g, b, 255];
  }

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

  function biomeOverlayColor(editBiomeId: number | undefined): [number, number, number] | null {
    switch (editBiomeId) {
      case 1: return [0.86, 0.92, 0.98];
      case 3: return [0.66, 0.78, 0.42];
      case 4: return [0.88, 0.76, 0.42];
      case 5: return [0.16, 0.60, 0.22];
      case 6: return [0.62, 0.62, 0.68];
      default: return null;
    }
  }

  function sampleFromRowCol(row: number, col: number): [number, number, number] {
    if (height === 0 || width === 0) return [1, 0, 1];
    const cRow = clampRow(row);
    const c = wrapCol(col);
    const idx = cRow * width + c;
    const cell = cells[idx];
    if (!cell) return [1, 0, 1];

    const base =
      typeof cell.baseHeight === "number"
        ? cell.baseHeight
        : typeof (cell as any).height === "number"
        ? (cell as any).height
        : 0;

    const editDelta = typeof cell.editHeightDelta === "number" ? cell.editHeightDelta : 0;
    const simDelta = typeof cell.simHeightDelta === "number" ? cell.simHeightDelta : 0;
    const h = base + editDelta + simDelta;

    const isWater = h < seaLevel;
    const rainfall = typeof cell.rainfall === "number" ? clamp01(cell.rainfall) : 0.5;
    const temp = typeof cell.temperature === "number" ? clamp01(cell.temperature) : 0.5;
    const snow = typeof cell.snowCover === "number" ? clamp01(cell.snowCover) : 0;

    if (isWater) {
      const depth = clamp01((seaLevel - h) * 2.0);
      const shelfMask = smoothstep(0.35, 0.02, depth);

      const shallowR = 0.20, shallowG = 0.55, shallowB = 0.75;
      const midR = 0.10, midG = 0.35, midB = 0.60;
      const deepR = 0.03, deepG = 0.15, deepB = 0.40;

      let r, g, b;
      if (depth < 0.4) {
        const t = depth / 0.4;
        r = lerp(shallowR, midR, t);
        g = lerp(shallowG, midG, t);
        b = lerp(shallowB, midB, t);
      } else {
        const t = (depth - 0.4) / 0.6;
        r = lerp(midR, deepR, t);
        g = lerp(midG, deepG, t);
        b = lerp(midB, deepB, t);
      }

      r = lerp(r, 0.28, shelfMask * 0.40);
      g = lerp(g, 0.65, shelfMask * 0.40);
      b = lerp(b, 0.80, shelfMask * 0.40);

      return [r, g, b];
    }

    const elev = clamp01((h - seaLevel) * 3.0);
    let r = 0.3, g = 0.3, b = 0.2;

    const permIce = temp < 0.20 ? smoothstep(0.20, 0.08, temp) : 0;

    if (snow > 0.6 || permIce > 0 || (temp < 0.2 && rainfall > 0.4) || elev > 0.75) {
      const iceFactor = clamp01(Math.max(snow, permIce, elev > 0.75 ? 1.0 : 0.0));
      r = lerp(0.85, 0.95, iceFactor);
      g = lerp(0.88, 0.96, iceFactor);
      b = lerp(0.92, 0.98, iceFactor);
    } else if (temp < 0.25) {
      r = 0.55; g = 0.58; b = 0.52;
    } else if (temp < 0.40 && rainfall > 0.35) {
      r = 0.20; g = 0.35; b = 0.22;
    } else if (rainfall < 0.25 || (temp > 0.65 && rainfall < 0.35)) {
      const dryness = 1.0 - rainfall;
      r = lerp(0.70, 0.85, dryness);
      g = lerp(0.60, 0.70, dryness);
      b = lerp(0.35, 0.45, dryness);
    } else if (rainfall < 0.50) {
      r = 0.58; g = 0.62; b = 0.35;
    } else if (temp >= 0.40 && temp < 0.65 && rainfall >= 0.50) {
      r = 0.25; g = 0.48; b = 0.22;
    } else if (temp >= 0.65 && rainfall >= 0.60) {
      r = 0.10; g = 0.40; b = 0.15;
    } else {
      r = 0.35; g = 0.50; b = 0.28;
    }

    if (elev > 0.3) {
      const mountain = (elev - 0.3) / 0.7;
      r = lerp(r, 0.70, mountain * 0.35);
      g = lerp(g, 0.65, mountain * 0.35);
      b = lerp(b, 0.60, mountain * 0.35);
    }

    // Respect edit biome overlays so stickers visibly appear
    const overlay = biomeOverlayColor(cell.editBiomeId);
    if (overlay && typeof cell.editBiomeId === "number" && cell.editBiomeId !== cell.baseBiomeId) {
      r = lerp(r, overlay[0], 0.52);
      g = lerp(g, overlay[1], 0.52);
      b = lerp(b, overlay[2], 0.52);
    }

    if (!isWater && cell.countryId !== undefined && cell.countryId !== null) {
      const myId = cell.countryId;
      let diffCount = 0;
      const neighbors: Array<{ dr: number; dc: number }> = [
        { dr: -1, dc: 0 }, { dr: 1, dc: 0 }, { dr: 0, dc: -1 }, { dr: 0, dc: 1 },
        { dr: -1, dc: -1 }, { dr: -1, dc: 1 }, { dr: 1, dc: -1 }, { dr: 1, dc: 1 },
      ];
      for (const n of neighbors) {
        const nr = clampRow(cRow + n.dr);
        const nc = wrapCol(c + n.dc);
        const nCell = cells[nr * width + nc];
        const nid = nCell?.countryId;
        if (nid !== undefined && nid !== null && nid !== myId) diffCount++;
      }
      if (diffCount > 0) {
        const strength = clamp01(diffCount / 3) * 0.85;
        r = lerp(r, 0.05, strength);
        g = lerp(g, 0.05, strength);
        b = lerp(b, 0.07, strength);
      }
    }

    return [r, g, b];
  }

  function sampleRGBAFromRowCol(row: number, col: number): [number, number, number, number] {
    return toRGBA01(sampleFromRowCol(row, col));
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

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
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

export function rasterizePlanetPreview(preview: PlanetPreview, outW: number, outH: number): Uint8ClampedArray {
  const w = Math.max(1, Math.floor(outW));
  const h = Math.max(1, Math.floor(outH));
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