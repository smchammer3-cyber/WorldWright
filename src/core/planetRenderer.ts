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

  function sampleFromRowCol(row: number, col: number): [number, number, number] {
    if (height === 0 || width === 0) return [1, 0, 1];
    const cRow = clampRow(row);
    const c = wrapCol(col);
    const idx = cRow * width + c;
    const cell = cells[idx];
    if (!cell) return [1, 0, 1];

    // Height sampling (supports delta layers if present)
    const base =
      typeof cell.baseHeight === "number"
        ? cell.baseHeight
        : typeof (cell as any).height === "number"
        ? (cell as any).height
        : 0;

    const editDelta = typeof cell.editHeightDelta === "number" ? cell.editHeightDelta : 0;
    const simDelta = typeof cell.simHeightDelta === "number" ? cell.simHeightDelta : 0;
    const h = base + editDelta + simDelta;

    // Always compute isWater from current height vs seaLevel (cells can be edited after generation)
    const isWater = h < seaLevel;

    // Get rainfall (not 'moisture' which doesn't exist)
    const rainfall = typeof cell.rainfall === "number" ? clamp01(cell.rainfall) : 0.5;
    const temp = typeof cell.temperature === "number" ? clamp01(cell.temperature) : 0.5;
    const snow = typeof cell.snowCover === "number" ? clamp01(cell.snowCover) : 0;

    // ========================================================
    // CONTRACT ENFORCEMENT: ALBEDO ONLY
    // No baked lighting here. All lighting is handled by Three.js.
    // This renderer outputs base color (albedo) only.
    // ========================================================

    if (isWater) {
      // Clean ocean colors with depth variation + continental shelf band
      const depth = clamp01((seaLevel - h) * 2.0);

      // Shelf mask: strongest very near coast, fades by modest depth
      const shelfMask = smoothstep(0.35, 0.02, depth);
      
      // Three-tier ocean depth
      const shallowR = 0.20, shallowG = 0.55, shallowB = 0.75; // Coastal blue
      const midR = 0.10, midG = 0.35, midB = 0.60; // Ocean blue
      const deepR = 0.03, deepG = 0.15, deepB = 0.40; // Deep navy

      let r, g, b;
      if (depth < 0.4) {
        // Shallow to mid
        const t = depth / 0.4;
        r = lerp(shallowR, midR, t);
        g = lerp(shallowG, midG, t);
        b = lerp(shallowB, midB, t);
      } else {
        // Mid to deep
        const t = (depth - 0.4) / 0.6;
        r = lerp(midR, deepR, t);
        g = lerp(midG, deepG, t);
        b = lerp(midB, deepB, t);
      }

      // Blend lighter shelf tint near coasts to improve coast readability
      const shelfR = 0.28, shelfG = 0.65, shelfB = 0.80;
      r = lerp(r, shelfR, shelfMask * 0.40);
      g = lerp(g, shelfG, shelfMask * 0.40);
      b = lerp(b, shelfB, shelfMask * 0.40);

      // Pure albedo - no lighting applied
      return [r, g, b];
    }

    // Land biomes based on temperature and rainfall (Earth-like Whittaker biome diagram)
    const elev = clamp01((h - seaLevel) * 3.0);
    let r = 0.3, g = 0.3, b = 0.2;

    // Permanent ice factor based primarily on temperature (renderer-only overlay)
    const permIce = temp < 0.20 ? smoothstep(0.20, 0.08, temp) : 0;

    // Snow/ice caps (high elevation or cold + wet or permanent ice)
    if (snow > 0.6 || permIce > 0 || (temp < 0.2 && rainfall > 0.4) || elev > 0.75) {
      // Ice and snow: brilliant white/light blue
      const iceFactor = clamp01(Math.max(snow, permIce, elev > 0.75 ? 1.0 : 0.0));
      r = lerp(0.85, 0.95, iceFactor);
      g = lerp(0.88, 0.96, iceFactor);
      b = lerp(0.92, 0.98, iceFactor);
    }
    // Tundra (cold, low rainfall)
    else if (temp < 0.25) {
      r = 0.55; g = 0.58; b = 0.52; // gray-green
    }
    // Taiga/boreal forest (cold, moderate rainfall)
    else if (temp < 0.40 && rainfall > 0.35) {
      r = 0.20; g = 0.35; b = 0.22; // dark green
    }
    // Desert (hot + dry OR moderate + very dry)
    else if (rainfall < 0.25 || (temp > 0.65 && rainfall < 0.35)) {
      const dryness = 1.0 - rainfall;
      r = lerp(0.70, 0.85, dryness);
      g = lerp(0.60, 0.70, dryness);
      b = lerp(0.35, 0.45, dryness);
    }
    // Grassland/savanna (moderate temp, moderate rain)
    else if (rainfall < 0.50) {
      r = 0.58; g = 0.62; b = 0.35;
    }
    // Temperate forest (moderate temp, good rain)
    else if (temp >= 0.40 && temp < 0.65 && rainfall >= 0.50) {
      r = 0.25; g = 0.48; b = 0.22;
    }
    // Tropical rainforest (hot + wet)
    else if (temp >= 0.65 && rainfall >= 0.60) {
      r = 0.10; g = 0.40; b = 0.15;
    }
    // Default temperate
    else {
      r = 0.35; g = 0.50; b = 0.28;
    }

    // Elevation shading: higher = slightly lighter (mountains)
    if (elev > 0.3) {
      const mountain = (elev - 0.3) / 0.7;
      r = lerp(r, 0.70, mountain * 0.35);
      g = lerp(g, 0.65, mountain * 0.35);
      b = lerp(b, 0.60, mountain * 0.35);
    }

    // Pure albedo - no lighting applied
    // All lighting is handled by Three.js shader

    // COUNTRY BORDERS: Overlay borders on land cells
    if (!isWater && cell.countryId !== undefined && cell.countryId !== null) {
      // Check if this is a border cell (neighbor has different countryId)
      const isBorder = [
        cRow > 0 ? cells[(cRow - 1) * width + c]?.countryId : null,
        cRow < height - 1 ? cells[(cRow + 1) * width + c]?.countryId : null,
        cells[cRow * width + wrapCol(c - 1)]?.countryId,
        cells[cRow * width + wrapCol(c + 1)]?.countryId,
      ].some(neighborId => neighborId !== undefined && neighborId !== cell.countryId);

      if (isBorder) {
        // Draw border as dark line
        r = r * 0.4;
        g = g * 0.4;
        b = b * 0.4;
      }
    }

    // Polar sunburst artifact guard: collapse color variation near poles by row-averaging
    const polarRows = Math.max(1, Math.floor(height * 0.02));
    if (row < polarRows || row > height - 1 - polarRows) {
      const dist = Math.min(row, height - 1 - row);
      const strength = clamp01((polarRows - dist) / polarRows) * 0.6;
      // Simple local row blur (5-tap) to approximate longitude-average
      let ar = 0, ag = 0, ab = 0, ct = 0;
      for (let dc = -2; dc <= 2; dc++) {
        const nc = wrapCol(col + dc);
        const nIdx = row * width + nc;
        const n = cells[nIdx];
        if (!n) continue;
        // Recompute minimal water/land color for neighbor (avoid heavy recursion)
        const nb = (typeof n.baseHeight === 'number' ? n.baseHeight : 0) + (typeof n.editHeightDelta === 'number' ? n.editHeightDelta : 0) + (typeof n.simHeightDelta === 'number' ? n.simHeightDelta : 0);
        const nIsWater = nb < seaLevel;
        if (nIsWater) {
          const nDepth = clamp01((seaLevel - nb) * 2.0);
          const nShelf = smoothstep(0.35, 0.02, nDepth);
          let nr = nDepth < 0.4 ? lerp(0.20, 0.10, nDepth / 0.4) : lerp(0.10, 0.03, (nDepth - 0.4) / 0.6);
          let ng = nDepth < 0.4 ? lerp(0.55, 0.35, nDepth / 0.4) : lerp(0.35, 0.15, (nDepth - 0.4) / 0.6);
          let nbcol = nDepth < 0.4 ? lerp(0.75, 0.60, nDepth / 0.4) : lerp(0.60, 0.40, (nDepth - 0.4) / 0.6);
          nr = lerp(nr, 0.28, nShelf * 0.40);
          ng = lerp(ng, 0.65, nShelf * 0.40);
          nbcol = lerp(nbcol, 0.80, nShelf * 0.40);
          ar += nr; ag += ng; ab += nbcol; ct++;
        } else {
          const nt = typeof n.temperature === 'number' ? clamp01(n.temperature) : 0.5;
          const nrain = typeof n.rainfall === 'number' ? clamp01(n.rainfall) : 0.5;
          const nsnow = typeof n.snowCover === 'number' ? clamp01(n.snowCover) : 0;
          const nelev = clamp01((nb - seaLevel) * 3.0);
          const npIce = nt < 0.20 ? smoothstep(0.20, 0.08, nt) : 0;
          let nr = 0.35, ng = 0.50, nbcol = 0.28;
          if (nsnow > 0.6 || npIce > 0 || (nt < 0.2 && nrain > 0.4) || nelev > 0.75) {
            const iceF = clamp01(Math.max(nsnow, npIce, nelev > 0.75 ? 1.0 : 0.0));
            nr = lerp(0.85, 0.95, iceF);
            ng = lerp(0.88, 0.96, iceF);
            nbcol = lerp(0.92, 0.98, iceF);
          } else if (nt < 0.25) {
            nr = 0.55; ng = 0.58; nbcol = 0.52;
          } else if (nt < 0.40 && nrain > 0.35) {
            nr = 0.20; ng = 0.35; nbcol = 0.22;
          } else if (nrain < 0.25 || (nt > 0.65 && nrain < 0.35)) {
            const dryness = 1.0 - nrain;
            nr = lerp(0.70, 0.85, dryness);
            ng = lerp(0.60, 0.70, dryness);
            nbcol = lerp(0.35, 0.45, dryness);
          } else if (nrain < 0.50) {
            nr = 0.58; ng = 0.62; nbcol = 0.35;
          } else if (nt >= 0.40 && nt < 0.65 && nrain >= 0.50) {
            nr = 0.25; ng = 0.48; nbcol = 0.22;
          } else if (nt >= 0.65 && nrain >= 0.60) {
            nr = 0.10; ng = 0.40; nbcol = 0.15;
          }
          if (nelev > 0.3) {
            const m = (nelev - 0.3) / 0.7;
            nr = lerp(nr, 0.70, m * 0.35);
            ng = lerp(ng, 0.65, m * 0.35);
            nbcol = lerp(nbcol, 0.60, m * 0.35);
          }
          ar += nr; ag += ng; ab += nbcol; ct++;
        }
      }
      if (ct > 0) {
        const arAvg = ar / ct, agAvg = ag / ct, abAvg = ab / ct;
        r = lerp(r, arAvg, strength);
        g = lerp(g, agAvg, strength);
        b = lerp(b, abAvg, strength);
      }
    }

    return [r, g, b];
  }

  function sampleRGBAFromRowCol(row: number, col: number): [number, number, number, number] {
    return toRGBA01(sampleFromRowCol(row, col));
  }

  // Pre-rasterize for canvas fallbacks (Create/Sim currently use preview.rgba).
  // This makes the contract explicit and prevents runtime mismatches.
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

function clamp(n: number, lo: number, hi: number): number {
  if (!Number.isFinite(n)) return lo;
  if (n < lo) return lo;
  if (n > hi) return hi;
  return n;
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