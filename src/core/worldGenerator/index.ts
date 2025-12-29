// ========================================================
// WORLDWRIGHT -- WORLD GENERATOR (V1.3)
// File: src/core/worldGenerator/index.ts
//
// Goals:
// - Strictly produce WorldBrain matching worldSchema (V1.3).
// - Global seaLevel (world.seaLevel).
// - Coherent continents (no "static mush") using FBM + domain warp.
// - Deterministic by seed.
// - Hydrology placeholders are schema-correct (flowDirection/flowAccumulation/basinId).
// ========================================================

import {
  WorldBrain,
  Cell,
  PlateType,
  BoundaryType,
  SurfaceType,
  OceanDepthClass,
  createEmptyCell,
} from "../worldSchema";

export interface GeneratorParams {
  seed: number;

  gridWidth: number;
  gridHeight: number;

  // 0..1 : higher => more ocean
  oceanCoverage: number;

  // 0..1 : tectonic intensity
  plateActivity: number;

  // degrees (0..60)
  axialTilt: number;

  // 0..1 : older => smoother
  planetAge: number;

  // 0..1 biases
  temperatureBias: number;
  humidityBias: number;

  styleMode: "EARTHLIKE" | "FANTASY" | "STYLIZED" | "ALIEN";
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function safeUUID(): string {
  try {
    // @ts-ignore
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      // @ts-ignore
      return crypto.randomUUID();
    }
  } catch {}
  return "ww_" + Math.floor(Math.random() * 1e15).toString(16);
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Hash-based value noise (deterministic, no precomputed tables)
function hash2D(ix: number, iy: number, seed: number) {
  let h = ix * 374761393 + iy * 668265263 + seed * 2147483647;
  h = (h ^ (h >>> 13)) * 1274126177;
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function fade(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function valueNoise(x: number, y: number, seed: number) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = x0 + 1;
  const y1 = y0 + 1;

  const sx = fade(x - x0);
  const sy = fade(y - y0);

  const n00 = hash2D(x0, y0, seed);
  const n10 = hash2D(x1, y0, seed);
  const n01 = hash2D(x0, y1, seed);
  const n11 = hash2D(x1, y1, seed);

  const ix0 = lerp(n00, n10, sx);
  const ix1 = lerp(n01, n11, sx);
  return lerp(ix0, ix1, sy); // 0..1
}

function fbm(x: number, y: number, seed: number, octaves: number, lacunarity: number, gain: number) {
  let amp = 1;
  let freq = 1;
  let sum = 0;
  let norm = 0;

  for (let i = 0; i < octaves; i++) {
    sum += valueNoise(x * freq, y * freq, seed + i * 1013) * amp;
    norm += amp;
    amp *= gain;
    freq *= lacunarity;
  }
  return sum / (norm || 1); // 0..1
}

function domainWarp(x: number, y: number, seed: number) {
  // low-frequency warp to create continent "blobs"
  const wx = fbm(x * 0.35, y * 0.35, seed + 9001, 3, 2.0, 0.5);
  const wy = fbm(x * 0.35, y * 0.35, seed + 9002, 3, 2.0, 0.5);
  // warp range roughly -0.5..0.5
  return { x: x + (wx - 0.5) * 1.2, y: y + (wy - 0.5) * 1.2 };
}

function sigmoid(t: number) {
  // 0..1 smootherstep-ish
  return t * t * (3 - 2 * t);
}

function computeSeaLevel(oceanCoverage: number) {
  // Ocean coverage ~55% => seaLevel around 0.30..0.36 in our height normalization.
  // Higher oceanCoverage raises sea level and eats coastlines.
  return clamp(0.18 + oceanCoverage * 0.36, 0.12, 0.62);
}

export function generateWorldFromParams(params: GeneratorParams): WorldBrain {
  const gw = Math.max(16, Math.floor(params.gridWidth));
  const gh = Math.max(16, Math.floor(params.gridHeight));
  const seed = Math.floor(params.seed || 0);

  const rand = mulberry32(seed);
  const seaLevel = computeSeaLevel(clamp(params.oceanCoverage, 0.05, 0.95));

  const cells: Cell[] = new Array(gw * gh);

  // "Style" modifiers (kept mild to avoid regressions)
  const styleRelief =
    params.styleMode === "FANTASY" ? 1.15 :
    params.styleMode === "STYLIZED" ? 1.05 :
    params.styleMode === "ALIEN" ? 1.10 : 1.0;

  const ageSmoothing = clamp(params.planetAge, 0, 1);
  const plateActivity = clamp(params.plateActivity, 0, 1);

  // Height generation:
  // - continent mask: very low freq fbm + warp
  // - detail: mid/high freq fbm
  // - apply tectonic relief controlled by plateActivity
  for (let y = 0; y < gh; y++) {
    for (let x = 0; x < gw; x++) {
      const idx = y * gw + x;
      const c = createEmptyCell(idx);

      // Normalize coords to a stable noise space
      const nx = x / gw;
      const ny = y / gh;

      // Domain warp
      const w = domainWarp(nx * 4.0, ny * 4.0, seed);
      const cx = w.x;
      const cy = w.y;

      // Continent mask (big blobs)
      const continent = fbm(cx * 0.55, cy * 0.55, seed + 100, 4, 2.0, 0.5); // 0..1
      // Ridge mask (adds spine variation)
      const ridges = fbm(cx * 1.4, cy * 1.4, seed + 200, 5, 2.1, 0.5);

      // Detail
      const detail = fbm(cx * 2.8, cy * 2.8, seed + 300, 5, 2.0, 0.5);

      // Combine:
      // - Push continent into land/water separation
      // - Add relief from ridges/detail
      let h = 0.0;
      h += (continent - 0.48) * 1.15;       // main landmass control
      h += (ridges - 0.5) * 0.35;           // mountain spines
      h += (detail - 0.5) * 0.22;           // small variation

      // Tectonic relief: young planets sharper; old smoother
      const youth = 1 - ageSmoothing;
      h += (rand() - 0.5) * 0.18 * plateActivity * youth;

      // Normalize into 0..1
      // Center around ~0.35..0.65 with clamp
      h = 0.5 + h * 0.75;
      h = clamp(h, 0, 1);

      // Apply style relief gently
      h = clamp(0.5 + (h - 0.5) * styleRelief, 0, 1);

      // Erosion smoothing with age: nudge toward mid
      const smooth = ageSmoothing * 0.12;
      h = clamp(lerp(h, 0.5, smooth), 0, 1);

      c.baseHeight = h;

      // Climate: latitude + altitude + biases + tilt effects
      const lat = Math.abs(ny - 0.5) * 2; // 0 equator .. 1 poles
      const tiltFactor = clamp(params.axialTilt / 60, 0, 1);

      // Temperature baseline
      let temp = 1 - lat;
      temp -= (h - seaLevel) * 0.65; // altitude cooling (above sea)
      temp -= tiltFactor * 0.12; // overall seasonal/tilt effect
      temp += (clamp(params.temperatureBias, 0, 1) - 0.5) * 0.40;
      temp = clamp(temp, 0, 1);

      // Rainfall baseline: more near equator, boosted by humidity bias
      let rain = (1 - lat) * 0.70 + (clamp(params.humidityBias, 0, 1) - 0.5) * 0.45;
      // Orographic-ish: higher relief => slightly more rain windward-ish (cheap heuristic)
      rain += (detail - 0.5) * 0.15;
      // Dry interiors: strong continents reduce rain (cheap continentality)
      rain -= clamp((continent - 0.62) * 0.55, 0, 0.25);
      // Tiny noise
      rain += (rand() - 0.5) * 0.06;
      rain = clamp(rain, 0, 1);

      c.temperature = temp;
      c.rainfall = rain;

      // Simplified tectonics placeholders
      c.plateId = 0;
      c.plateType = h < seaLevel * 0.85 ? PlateType.OCEANIC : PlateType.CONTINENTAL;
      c.boundaryType = BoundaryType.NONE;
      c.upliftRate = plateActivity * 0.5;
      c.surfaceAge = ageSmoothing;
      c.volcanicActivity = plateActivity * (1 - ageSmoothing) * (ridges);

      // Water classification
      c.isWater = h < seaLevel;

      // Ocean depth class (shelf vs abyssal vs trench)
      if (c.isWater) {
        const depth = clamp((seaLevel - h) / Math.max(0.001, seaLevel), 0, 1);
        c.oceanDepthClass =
          depth > 0.72 ? OceanDepthClass.ABYSSAL :
          depth > 0.35 ? OceanDepthClass.SHELF :
          OceanDepthClass.SHELF;
      } else {
        c.oceanDepthClass = null;
      }

      // Biome assignment (IDs are numeric placeholders but consistent)
      // 0 ocean, 1 rainforest, 2 temperate forest/grassland, 3 desert, 4 savanna, 5 tundra, 6 taiga
      if (c.isWater) {
        c.baseBiomeId = 0;
        c.surfaceType = SurfaceType.ROCK;
      } else if (temp < 0.18) {
        c.baseBiomeId = 5;
        c.surfaceType = SurfaceType.PERMAFROST;
      } else if (temp < 0.28) {
        c.baseBiomeId = 6;
        c.surfaceType = SurfaceType.ROCK;
      } else if (rain < 0.22) {
        c.baseBiomeId = 3;
        c.surfaceType = SurfaceType.SAND;
      } else if (rain < 0.38) {
        c.baseBiomeId = 4;
        c.surfaceType = SurfaceType.ALLUVIAL;
      } else if (rain > 0.72) {
        c.baseBiomeId = 1;
        c.surfaceType = SurfaceType.ALLUVIAL;
      } else {
        c.baseBiomeId = 2;
        c.surfaceType = SurfaceType.ROCK;
      }

      // Snow cover
      c.snowCover = temp < 0.15 ? clamp((0.15 - temp) / 0.15, 0, 1) : 0;

      // Hydrology placeholders (schema-correct)
      c.flowDirection = null;
      c.flowAccumulation = 0;
      c.basinId = null;

      cells[idx] = c;
    }
  }

  const now = new Date().toISOString();

  const world: WorldBrain = {
    gridWidth: gw,
    gridHeight: gh,
    seaLevel,

    cells,

    plates: [
      { id: 0, name: "Primary Plate", type: PlateType.CONTINENTAL },
    ],

    rivers: [],
    countries: [],
    cultures: [],
    cultureRegions: [],
    cities: [],
    locations: [],
    stickers: [],

    metadata: {
      id: safeUUID(),
      name: "New World",
      seed: String(seed),
      version: "1.3",
      styleMode: params.styleMode,
      gridWidth: gw,
      gridHeight: gh,
      createdAt: now,
      updatedAt: now,
    },
  };

  return world;
}