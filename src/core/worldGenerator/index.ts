// ========================================================
// JARVIS CHANGE HEADER -- V1.3 GENERATOR CONTRACT LOCK
// File: src/core/worldGenerator/index.ts
//
// Fixes:
// - Global seaLevel lives on world.seaLevel (mirrored to metadata.seaLevel).
// - Cells no longer store seaLevel.
// - Generator outputs schema-consistent cells.
// - Derived fields recomputed via recomputeWorld().
// ========================================================

import {
  WorldBrain,
  Cell,
  Plate,
  River,
  PlateType,
  BoundaryType,
  SurfaceType,
  createEmptyCell,
} from '../worldSchema';
import { recomputeWorld } from '../worldRecompute';

export type GeneratorParams = {
  width: number;
  height: number;

  // 0–100: higher -> more ocean
  seaLevel: number;

  // 0–100: more tectonic activity -> rougher terrain (MVP)
  plateActivity: number;

  // 0–100: axial tilt affects temperature gradient seasonality (MVP)
  axisTilt: number;

  // 0–100: planet age affects smoothing (MVP)
  planetAge: number;

  // 0–100: climate variability (MVP)
  climateVar: number;

  seed: number;
  styleMode: 'EARTHLIKE' | 'FANTASY' | 'STYLIZED' | 'ALIEN';
};

export function createDefaultGeneratorParams(): GeneratorParams {
  return {
    width: 256,
    height: 128,

    seaLevel: 50,
    plateActivity: 50,
    axisTilt: 45,
    planetAge: 50,
    climateVar: 35,

    seed: Math.floor(Math.random() * 1_000_000_000),
    styleMode: 'EARTHLIKE',
  };
}

export function generateWorldFromParams(params: GeneratorParams): WorldBrain {
  const width = clampInt(params.width, 32, 1024);
  const height = clampInt(params.height, 16, 512);

  const rng = mulberry32(params.seed >>> 0);

  const nowIso = new Date().toISOString();

  // Map UI 0..100 to world seaLevel in normalized height space
  // Higher slider => more ocean => higher sea threshold.
  const globalSeaLevel = lerp(-0.18, 0.22, clamp01(params.seaLevel / 100));

  const plateAmp = lerp(0.25, 1.35, clamp01(params.plateActivity / 100));

  // Age smoothing: older => smoother
  const smooth = lerp(0.15, 0.55, clamp01(params.planetAge / 100));

  // Climate variability
  const climateVar = lerp(0.05, 0.35, clamp01(params.climateVar / 100));

  // Axis tilt impacts lat temperature curve (MVP)
  const tilt = lerp(0.25, 1.0, clamp01(params.axisTilt / 100));

  const cells: Cell[] = new Array(width * height);
  for (let i = 0; i < cells.length; i++) cells[i] = createEmptyCell(i);

  // Plates (MVP): a few synthetic plates
  const plateCount = 10;
  const plates: Plate[] = [];
  for (let i = 0; i < plateCount; i++) {
    plates.push({
      id: i,
      type: i % 3 === 0 ? PlateType.OCEANIC : PlateType.CONTINENTAL,
      velocity: [lerp(-1, 1, rng()), lerp(-1, 1, rng())],
    });
  }

  // Height field (MVP but stable):
  // - base noise + continental blobs + smoothing
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];

      const lat01 = r / (height - 1);
      const lon01 = c / (width - 1);

      // Blobby continents via low-frequency noise
      const n0 = fbm(lon01 * 2.0, lat01 * 1.8, rng, 4);
      const n1 = fbm(lon01 * 0.8, lat01 * 0.8, rng, 3);
      const blob = (n0 * 0.65 + n1 * 0.35);

      // Add tectonic roughness
      const rough = fbm(lon01 * 12.0, lat01 * 8.0, rng, 3) * plateAmp;

      // Smoothness: dampen roughness for older worlds
      const base = blob + rough * (1 - smooth);

      // Normalize to roughly -1..1-ish
      cell.baseHeight = clamp(base * 0.85, -1.0, 1.0);

      // Assign plate id roughly by noise buckets (MVP)
      const pPick = Math.floor(clamp01((blob + 1) * 0.5) * plateCount) % plateCount;
      cell.plateId = pPick;
      cell.plateType = plates[pPick].type;
      cell.boundaryType = BoundaryType.NONE;

      // Temperature: lat gradient + noise + tilt
      const lat = lat01 * 2 - 1; // -1..1
      const latCurve = 1 - Math.abs(lat) * tilt; // equator warm
      const tNoise = fbm(lon01 * 4.0, lat01 * 4.0, rng, 2) * climateVar;
      cell.temperature = clamp01(latCurve * 0.85 + 0.1 + tNoise * 0.25);

      // Rainfall: simple bands + noise
      const band = 0.55 - Math.abs(lat) * 0.35;
      const rNoise = fbm(lon01 * 5.0, lat01 * 3.0, rng, 2) * climateVar;
      cell.rainfall = clamp01(band + 0.15 + rNoise * 0.35);

      // Biomes (very MVP placeholder IDs; renderer can map these later)
      // We'll set baseBiomeId from temp/rain. editBiomeId defaults = baseBiomeId.
      const biome = pickBiome(cell.temperature, cell.rainfall);
      cell.baseBiomeId = biome;
      cell.editBiomeId = biome;

      // Surface type guess
      cell.surfaceType = cell.plateType === PlateType.OCEANIC ? SurfaceType.ALLUVIAL : SurfaceType.ROCK;

      // Hydrology baseline (empty)
      cell.flowDirection = null;
      cell.flowAccumulation = 0;
      cell.basinId = null;

      // Geology baseline
      cell.upliftRate = 0;
      cell.surfaceAge = clamp01(0.35 + rng() * 0.5);
      cell.volcanicActivity = 0;
    }
  }

  const rivers: River[] = [];

  const world: WorldBrain = {
    gridWidth: width,
    gridHeight: height,
    seaLevel: globalSeaLevel,

    cells,
    plates,
    rivers,

    countries: [],
    cultures: [],
    cultureRegions: [],
    cities: [],

    locations: [],
    stickers: [],

    metadata: {
      id: `w_${Date.now()}_${Math.floor(rng() * 1e9)}`,
      name: 'Untitled World',
      seed: String(params.seed),
      schemaVersion: 'v3',

      version: 'v1.3',
      styleMode: params.styleMode,
      gridWidth: width,
      gridHeight: height,
      createdAt: nowIso,
      updatedAt: nowIso,

      seaLevel: globalSeaLevel,
    },

    parameters: {
      ...params,
      seaLevel: params.seaLevel,
    },
  };

  recomputeWorld(world, ['GENERATED']);
  return world;
}

function pickBiome(temp: number, rain: number): number {
  // Minimal stable biome IDs (0..N). Refine later behind renderer.
  if (temp < 0.20) return rain < 0.35 ? 1 : 2; // polar desert / tundra
  if (temp < 0.35) return rain < 0.35 ? 3 : 4; // steppe / taiga
  if (temp < 0.60) return rain < 0.30 ? 5 : rain < 0.60 ? 6 : 7; // desert / grassland / temperate forest
  return rain < 0.25 ? 8 : rain < 0.55 ? 9 : 10; // hot desert / savanna / rainforest
}

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

function clamp(x: number, lo: number, hi: number): number {
  return x < lo ? lo : x > hi ? hi : x;
}

function clampInt(x: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, Math.floor(x)));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function mulberry32(a: number): () => number {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Lightweight fractal noise using rng (stable enough for MVP, not true gradient noise)
function fbm(x: number, y: number, rng: () => number, octaves: number): number {
  let amp = 1;
  let freq = 1;
  let sum = 0;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * valueNoise(x * freq, y * freq, rng);
    norm += amp;
    amp *= 0.5;
    freq *= 2.0;
  }
  return (sum / Math.max(1e-9, norm)) * 2 - 1; // -1..1
}

function valueNoise(x: number, y: number, rng: () => number): number {
  // Deterministic hash from coordinates (not from rng stream)
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;

  const v00 = hash2(xi, yi);
  const v10 = hash2(xi + 1, yi);
  const v01 = hash2(xi, yi + 1);
  const v11 = hash2(xi + 1, yi + 1);

  const u = smoothstep(xf);
  const v = smoothstep(yf);

  const x1 = lerp(v00, v10, u);
  const x2 = lerp(v01, v11, u);
  return lerp(x1, x2, v);

  function hash2(ix: number, iy: number): number {
    // Simple integer hash to 0..1
    let h = ix * 374761393 + iy * 668265263;
    h = (h ^ (h >>> 13)) * 1274126177;
    h = h ^ (h >>> 16);
    return ((h >>> 0) / 4294967295);
  }
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}