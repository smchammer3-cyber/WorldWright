// ========================================================
// WORLDWRIGHT -- PLANET RENDERER (V1.4 BIOME-AWARE PREVIEW)
// File: src/core/planetRenderer.ts
//
// Purpose:
// - render the visible planet from WorldBrain layers, not height alone
// - keep generator, schema, and WorldBrain ownership unchanged
// - expose debug preview modes for diagnosing bad planets layer-by-layer
// ========================================================

import {
  BoundaryType,
  OceanDepthClass,
  PlateType,
  type WorldBrain,
} from "./worldSchema";

type Rgb = [number, number, number];
type Rgba = [number, number, number, number];
type Cell = WorldBrain["cells"][number];

export type PlanetPreviewMode =
  | "FINAL"
  | "HEIGHT"
  | "LAND_WATER"
  | "BIOME"
  | "TEMPERATURE"
  | "RAINFALL"
  | "SNOW"
  | "OCEAN_DEPTH"
  | "CRUST"
  | "GRID"
  | "PLATES"
  | "RIVERS";

export const PLANET_PREVIEW_MODES: Array<{ id: PlanetPreviewMode; label: string }> = [
  { id: "FINAL", label: "Final" },
  { id: "HEIGHT", label: "Height" },
  { id: "LAND_WATER", label: "Land / Water" },
  { id: "BIOME", label: "Biome" },
  { id: "TEMPERATURE", label: "Temperature" },
  { id: "RAINFALL", label: "Rainfall" },
  { id: "SNOW", label: "Snow" },
  { id: "OCEAN_DEPTH", label: "Ocean Depth" },
  { id: "CRUST", label: "Crust" },
  { id: "GRID", label: "Grid" },
  { id: "PLATES", label: "Plates" },
  { id: "RIVERS", label: "Rivers" },
];

export type PlanetPreview = {
  width: number;
  height: number;
  seaLevel: number;
  rgba: Uint8ClampedArray;
  colorAt: (x: number, y: number) => Rgba;
  minimapColorAt: (x: number, y: number) => Rgba;
  sampleGlobeColor: (cellIndex: number) => Rgba;
  sampleMinimapColor: (cellIndex: number) => Rgba;
};

export function buildPlanetPreview(
  world: WorldBrain,
  mode: PlanetPreviewMode = "FINAL"
): PlanetPreview {
  const width = world.gridWidth;
  const height = world.gridHeight;
  const seaLevel =
    typeof world.seaLevel === "number"
      ? world.seaLevel
      : typeof world.metadata?.seaLevel === "number"
      ? world.metadata.seaLevel
      : 0;

  const cells = Array.isArray(world.cells) ? world.cells : [];
  const riverCells = buildRiverCellSet(world);

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

  function cellIndex(row: number, col: number): number {
    return clampRow(row) * width + wrapCol(col);
  }

  function cellAt(row: number, col: number): Cell | null {
    if (height === 0 || width === 0) return null;
    return cells[cellIndex(row, col)] ?? null;
  }

  function totalHeightAtCell(cell: Cell | null): number {
    if (!cell) return 0;
    const legacyHeight = (cell as { height?: number }).height;
    const base =
      typeof cell.baseHeight === "number"
        ? cell.baseHeight
        : typeof legacyHeight === "number"
        ? legacyHeight
        : 0;
    const editDelta = typeof cell.editHeightDelta === "number" ? cell.editHeightDelta : 0;
    const simDelta = typeof cell.simHeightDelta === "number" ? cell.simHeightDelta : 0;
    return base + editDelta + simDelta;
  }

  function isWaterCell(cell: Cell | null): boolean {
    if (!cell) return false;
    if (typeof cell.isWater === "boolean") return cell.isWater;
    return totalHeightAtCell(cell) < seaLevel;
  }

  function localWaterFraction(row: number, col: number, radius = 1): number {
    let water = 0;
    let total = 0;

    for (let dr = -radius; dr <= radius; dr++) {
      const rr = row + dr;
      if (rr < 0 || rr >= height) continue;

      for (let dc = -radius; dc <= radius; dc++) {
        total++;
        if (isWaterCell(cellAt(rr, col + dc))) water++;
      }
    }

    return total > 0 ? water / total : 0;
  }

  function localLandFraction(row: number, col: number, radius = 1): number {
    return 1 - localWaterFraction(row, col, radius);
  }

  function oceanColor(cell: Cell, h: number, row: number, col: number): Rgb {
    const depth = clamp01((seaLevel - h) * 1.25);

    let color: Rgb;
    switch (cell.oceanDepthClass) {
      case OceanDepthClass.TRENCH:
        color = [0.018, 0.055, 0.16];
        break;
      case OceanDepthClass.ABYSSAL:
        color = [0.03, 0.12, 0.30];
        break;
      case OceanDepthClass.SLOPE:
        color = [0.06, 0.24, 0.43];
        break;
      case OceanDepthClass.RIDGE:
        color = [0.12, 0.38, 0.57];
        break;
      case OceanDepthClass.SHELF:
        color = [0.18, 0.52, 0.66];
        break;
      default: {
        const shallow: Rgb = [0.20, 0.54, 0.70];
        const mid: Rgb = [0.09, 0.30, 0.52];
        const deep: Rgb = [0.025, 0.09, 0.24];
        color = depth < 0.45
          ? mix(shallow, mid, depth / 0.45)
          : mix(mid, deep, (depth - 0.45) / 0.55);
      }
    }

    const coastalBlend = smoothstep(0.08, 0.45, localLandFraction(row, col, 1)) * 0.45;
    color = mix(color, [0.25, 0.67, 0.73], coastalBlend);

    return color;
  }

  function landColor(cell: Cell, h: number, row: number, col: number): Rgb {
    const biomeId =
      typeof cell.editBiomeId === "number" ? cell.editBiomeId : cell.baseBiomeId;
    const temp = clamp01(cell.temperature);
    const rain = clamp01(cell.rainfall);
    const elev = clamp01((h - seaLevel) * 0.82);

    let color = biomeColorFromId(biomeId);

    color = mix(color, [0.76, 0.62, 0.36], Math.max(0, 0.55 - rain) * 0.16);
    color = mix(color, [0.16, 0.43, 0.22], Math.max(0, rain - 0.55) * 0.13);
    color = mix(color, [0.72, 0.76, 0.70], Math.max(0, 0.26 - temp) * 0.18);

    color = shade(color, lerp(0.92, 1.14, elev));

    if (elev > 0.68) {
      color = mix(color, [0.56, 0.56, 0.52], (elev - 0.68) / 0.32 * 0.32);
    }

    const coastBlend = smoothstep(0.08, 0.45, localWaterFraction(row, col, 1)) * 0.52;
    color = mix(color, [0.78, 0.70, 0.50], coastBlend);

    if (cell.snowCover > 0) {
      color = mix(color, [0.91, 0.94, 0.91], clamp01(cell.snowCover) * 0.86);
    }

    const idx = cellIndex(row, col);
    if (riverCells.has(idx)) {
      color = mix(color, [0.04, 0.30, 0.62], 0.46);
    }

    return color;
  }

  function finalColor(row: number, col: number): Rgb {
    const cell = cellAt(row, col);
    if (!cell) return [1, 0, 1];

    const h = totalHeightAtCell(cell);
    return isWaterCell(cell) ? oceanColor(cell, h, row, col) : landColor(cell, h, row, col);
  }

  function debugColor(row: number, col: number): Rgb {
    const cell = cellAt(row, col);
    if (!cell) return [1, 0, 1];

    const h = totalHeightAtCell(cell);
    const water = isWaterCell(cell);
    const idx = cellIndex(row, col);

    switch (mode) {
      case "HEIGHT":
        return heightDebugColor(h, seaLevel);
      case "LAND_WATER":
        return water ? [0.04, 0.20, 0.48] : [0.46, 0.68, 0.34];
      case "BIOME":
        return water ? oceanColor(cell, h, row, col) : biomeColorFromId(cell.baseBiomeId);
      case "TEMPERATURE":
        return temperatureColor(cell.temperature);
      case "RAINFALL":
        return rainfallColor(cell.rainfall);
      case "SNOW":
        return snowColor(cell.snowCover);
      case "OCEAN_DEPTH":
        return water ? oceanColor(cell, h, row, col) : [0.35, 0.36, 0.31];
      case "CRUST":
        return crustColor(cell);
      case "GRID":
        return gridColor(row, col, width, height);
      case "PLATES":
        return plateColor(cell);
      case "RIVERS": {
        const base: Rgb = water ? [0.07, 0.18, 0.34] : [0.38, 0.48, 0.31];
        return riverCells.has(idx) ? mix(base, [0.02, 0.38, 0.86], 0.82) : base;
      }
      case "FINAL":
      default:
        return finalColor(row, col);
    }
  }

  function sampleFromRowCol(row: number, col: number): Rgb {
    if (height === 0 || width === 0) return [1, 0, 1];
    return mode === "FINAL" ? finalColor(clampRow(row), wrapCol(col)) : debugColor(clampRow(row), wrapCol(col));
  }

  function sampleRGBAFromRowCol(row: number, col: number): Rgba {
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

export function makePlanetPreviewFromWorldBrain(
  world: WorldBrain,
  mode: PlanetPreviewMode = "FINAL"
): PlanetPreview {
  return buildPlanetPreview(world, mode);
}

export const PlanetRenderer = { buildPlanetPreview };

function buildRiverCellSet(world: WorldBrain): Set<number> {
  const out = new Set<number>();
  if (!Array.isArray(world.rivers)) return out;

  for (const river of world.rivers) {
    if (!Array.isArray(river.path)) continue;
    for (const idx of river.path) {
      if (Number.isInteger(idx) && idx >= 0 && idx < world.cells.length) {
        out.add(idx);
      }
    }
  }

  return out;
}

function biomeColorFromId(id: number): Rgb {
  switch (id) {
    case 1:
      return [0.58, 0.64, 0.60];
    case 2:
      return [0.30, 0.43, 0.34];
    case 3:
      return [0.56, 0.56, 0.34];
    case 4:
      return [0.66, 0.60, 0.45];
    case 5:
      return [0.33, 0.56, 0.28];
    case 6:
      return [0.72, 0.74, 0.70];
    case 7:
      return [0.23, 0.50, 0.31];
    case 8:
      return [0.75, 0.62, 0.36];
    case 9:
      return [0.62, 0.58, 0.30];
    case 10:
      return [0.16, 0.43, 0.22];
    case 0:
    default:
      return [0.40, 0.58, 0.30];
  }
}

function heightDebugColor(h: number, seaLevel: number): Rgb {
  if (h < seaLevel) {
    const depth = clamp01((seaLevel - h) * 1.15);
    return mix([0.22, 0.55, 0.74], [0.02, 0.08, 0.24], depth);
  }

  const elev = clamp01((h - seaLevel) * 0.80);
  if (elev < 0.20) return mix([0.72, 0.68, 0.45], [0.34, 0.58, 0.28], elev / 0.20);
  if (elev < 0.68) return mix([0.34, 0.58, 0.28], [0.52, 0.47, 0.35], (elev - 0.20) / 0.48);
  return mix([0.52, 0.47, 0.35], [0.88, 0.88, 0.84], (elev - 0.68) / 0.32);
}

function temperatureColor(value: number): Rgb {
  const t = clamp01(value);
  if (t < 0.50) return mix([0.12, 0.32, 0.70], [0.86, 0.86, 0.66], t / 0.50);
  return mix([0.86, 0.86, 0.66], [0.78, 0.16, 0.10], (t - 0.50) / 0.50);
}

function rainfallColor(value: number): Rgb {
  const t = clamp01(value);
  if (t < 0.50) return mix([0.74, 0.60, 0.32], [0.38, 0.58, 0.34], t / 0.50);
  return mix([0.38, 0.58, 0.34], [0.08, 0.28, 0.74], (t - 0.50) / 0.50);
}

function snowColor(value: number): Rgb {
  return mix([0.07, 0.08, 0.10], [0.94, 0.97, 0.95], clamp01(value));
}

function crustColor(cell: Cell): Rgb {
  const thickness = clamp01(cell.crustThickness);
  const age = clamp01(cell.crustAge);

  const thinYoung: Rgb = [0.06, 0.16, 0.42];
  const middle: Rgb = [0.34, 0.55, 0.36];
  const thickOld: Rgb = [0.84, 0.72, 0.42];
  let color = thickness < 0.52
    ? mix(thinYoung, middle, thickness / 0.52)
    : mix(middle, thickOld, (thickness - 0.52) / 0.48);

  color = mix(color, [0.96, 0.92, 0.72], age * 0.28);

  if (cell.boundaryType && cell.boundaryType !== BoundaryType.NONE) {
    const boundary: Rgb = cell.boundaryType === BoundaryType.CONVERGENT
      ? [1.0, 0.62, 0.16]
      : cell.boundaryType === BoundaryType.DIVERGENT
        ? [0.20, 0.85, 1.0]
        : [0.95, 0.92, 0.25];
    color = mix(color, boundary, 0.32);
  }

  return shade(color, 0.86 + age * 0.20);
}

function gridColor(row: number, col: number, width: number, height: number): Rgb {
  const latLine = row % Math.max(1, Math.round(height / 16)) === 0;
  const lonLine = col % Math.max(1, Math.round(width / 24)) === 0;
  const poleBand = row < Math.max(1, Math.round(height * 0.08)) || row >= height - Math.max(1, Math.round(height * 0.08));
  let color: Rgb = poleBand ? [0.38, 0.20, 0.48] : [0.10, 0.12, 0.16];
  if (latLine || lonLine) color = mix(color, [0.75, 0.78, 0.86], 0.70);
  if (latLine && lonLine) color = [0.96, 0.86, 0.28];
  return color;
}

function plateColor(cell: Cell): Rgb {
  const n = hash01(cell.plateId);
  let color: Rgb = [
    0.22 + hash01(cell.plateId + 11) * 0.48,
    0.22 + hash01(cell.plateId + 23) * 0.48,
    0.22 + hash01(cell.plateId + 37) * 0.48,
  ];

  if (cell.plateType === PlateType.OCEANIC) {
    color = mix(color, [0.06, 0.16, 0.34], 0.42);
  } else {
    color = mix(color, [0.38, 0.48, 0.24], 0.26);
  }

  if (cell.boundaryType && cell.boundaryType !== BoundaryType.NONE) {
    const boundary: Rgb =
      cell.boundaryType === BoundaryType.CONVERGENT
        ? [0.95, 0.65, 0.18]
        : cell.boundaryType === BoundaryType.DIVERGENT
        ? [0.26, 0.82, 0.95]
        : [0.92, 0.90, 0.30];
    color = mix(color, boundary, 0.58);
  }

  return shade(color, 0.88 + n * 0.18);
}

function hash01(n: number): number {
  let x = Math.imul((n | 0) ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 0xffffffff;
}

function toRGBA255(rgb: Rgb): Rgba {
  return [
    clamp255(Math.round(rgb[0] * 255)),
    clamp255(Math.round(rgb[1] * 255)),
    clamp255(Math.round(rgb[2] * 255)),
    255,
  ];
}

function mix(a: Rgb, b: Rgb, t: number): Rgb {
  const x = clamp01(t);
  return [
    lerp(a[0], b[0], x),
    lerp(a[1], b[1], x),
    lerp(a[2], b[2], x),
  ];
}

function shade(color: Rgb, amount: number): Rgb {
  return [
    clamp01(color[0] * amount),
    clamp01(color[1] * amount),
    clamp01(color[2] * amount),
  ];
}

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
  const t = clamp01((x - edge0) / Math.max(1e-9, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function rasterizeToBytes(
  w: number,
  h: number,
  sample: (x: number, y: number) => Rgba
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
