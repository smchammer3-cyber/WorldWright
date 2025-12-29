// ========================================================
// JARVIS CHANGE HEADER -- V1.3 GENERATOR SCHEMA ALIGNMENT
// File: src/core/worldGenerator/index.ts
//
// Fixes:
// - Generator now outputs a WorldBrain that matches src/core/worldSchema exactly.
// - Correct hydrology field names (flowDirection, flowAccumulation, basinId).
// - Correct enum casing (PlateType.CONTINENTAL, BoundaryType.NONE, etc.).
// - Populate required Cell fields (index, isWater, climateCellId, prevailingWind, etc.).
// - Metadata now includes schemaVersion + version + styleMode + ISO timestamps.
// - Global sea level is stored at world.metadata.seaLevel and mirrored per-cell (for now)
//   to avoid breaking existing editor logic that references cell.seaLevel.
//
// Non-goals:
// - Full Hybrid Realism (tectonics/hydrology/climate cells/erosion) -- this is the
//   stable V1.3-compatible starter world needed for the rest of the spine.
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

// -----------------------------
// Types
// -----------------------------

export interface GeneratorConfig {
  // reserved for future expansion (profiles, etc.)
}

export interface GeneratorParams {
  name: string;
  width: number;
  height: number;
  seed: string;

  // 0–100: more land vs water (future)
  landmass: number;

  // 0–100: bias the final sea level (implemented)
  seaLevel: number;

  // 0–100: more tectonic activity → more mountains (affects height now)
  plateActivity: number;

  // 0–100: stronger axis tilt → stronger pole/equator contrast (affects temp now)
  axisTilt: number;

  // 0–100: older planet → smoother terrain (affects height smoothing now)
  planetAge: number;

  // 0–100: climate noise strength (affects temp/rain now)
  climateVariance: number;

  // 0–100: baseline temperature (affects temp now)
  temperature: number;

  // 0–100: baseline humidity (affects rain now)
  humidity: number;

  // 0–100: user-facing style selector mapped to schema styleMode
  worldStyle: number;
}

export function createDefaultGeneratorParams(): GeneratorParams {
  return {
    name: "New World",
    width: 256,
    height: 128,
    seed: String(Math.floor(Math.random() * 1_000_000_000)),

    landmass: 50,
    seaLevel: 50,
    plateActivity: 50,
    axisTilt: 50,
    planetAge: 50,
    climateVariance: 40,
    temperature: 50,
    humidity: 50,
    worldStyle: 25,
  };
}

// -----------------------------
// Deterministic RNG helpers
// -----------------------------

function hashToUnit(seed: number) {
  const x = Math.sin(seed * 99991.1337) * 43758.5453123;
  return x - Math.floor(x);
}

function makeRng(seedStr: string) {
  // cheap deterministic rng from string
  let h = 2166136261;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    // convert to [0,1)
    return ((h >>> 0) % 1_000_000) / 1_000_000;
  };
}

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// -----------------------------
// Noise helpers (simple value noise)
// -----------------------------

function valueNoise2D(x: number, y: number, seed: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;

  const s00 = hashToUnit(seed + xi * 374761393 + yi * 668265263);
  const s10 = hashToUnit(seed + (xi + 1) * 374761393 + yi * 668265263);
  const s01 = hashToUnit(seed + xi * 374761393 + (yi + 1) * 668265263);
  const s11 = hashToUnit(seed + (xi + 1) * 374761393 + (yi + 1) * 668265263);

  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);

  const nx0 = lerp(s00, s10, u);
  const nx1 = lerp(s01, s11, u);
  return lerp(nx0, nx1, v);
}

function fbm2D(x: number, y: number, seed: number, octaves: number) {
  let amp = 0.5;
  let freq = 1.0;
  let sum = 0;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * valueNoise2D(x * freq, y * freq, seed + i * 99991);
    norm += amp;
    amp *= 0.5;
    freq *= 2.0;
  }
  return sum / Math.max(1e-6, norm);
}

function mapWorldStyleToMode(worldStyle0to100: number): "EARTHLIKE" | "FANTASY" | "STYLIZED" | "ALIEN" {
  const t = clamp01(worldStyle0to100 / 100);
  if (t < 0.25) return "EARTHLIKE";
  if (t < 0.5) return "FANTASY";
  if (t < 0.75) return "STYLIZED";
  return "ALIEN";
}

// -----------------------------
// Public API
// -----------------------------

export function generateWorldFromParams(params: GeneratorParams, _config?: GeneratorConfig): WorldBrain {
  const width = Math.max(8, Math.floor(params.width));
  const height = Math.max(8, Math.floor(params.height));

  const rng = makeRng(params.seed);

  // map knobs to continuous ranges (MVP)
  const seaLevelBias = lerp(-0.18, 0.22, clamp01(params.seaLevel / 100));
  const plateAmp = lerp(0.25, 1.35, clamp01(params.plateActivity / 100));
  const ageSmooth = lerp(0.0, 0.55, clamp01(params.planetAge / 100)); // 0 young, 1 old
  const baseTemp = lerp(0.25, 0.75, clamp01(params.temperature / 100));
  const baseHum = lerp(0.20, 0.85, clamp01(params.humidity / 100));
  const tilt = lerp(0.10, 0.80, clamp01(params.axisTilt / 100));
  const climateVar = lerp(0.05, 0.55, clamp01(params.climateVariance / 100));

  // landmass affects large-scale height bias
  const landBias = lerp(-0.10, 0.10, clamp01(params.landmass / 100));

  const seedN = Math.floor(rng() * 1e9);

  const globalSeaLevel = seaLevelBias;

  const cells: Cell[] = new Array(width * height);

  for (let y = 0; y < height; y++) {
    const latT = height <= 1 ? 0.5 : y / (height - 1); // 0..1
    const lat = lerp(-1, 1, latT); // -1..1

    for (let x = 0; x < width; x++) {
      const idx = y * width + x;

      // height: mix low-freq continents and higher-freq mountains
      const nx = x / width;
      const ny = y / height;

      const cont = fbm2D(nx * 2.0, ny * 2.0, seedN + 101, 4); // 0..1
      const ridge = fbm2D(nx * 8.0, ny * 8.0, seedN + 303, 5); // 0..1

      // center to [-0.5,0.5]
      let h0 = (cont - 0.5) * 1.2 + landBias;
      const h1 = (ridge - 0.5) * 0.65;

      // mountains stronger with plate activity
      h0 += h1 * plateAmp;

      // old planets smooth peaks a bit
      h0 = lerp(h0, (cont - 0.5) * 1.0 + landBias, ageSmooth);

      // temperature: latitude + baseTemp + noise + tilt
      const latAbs = Math.abs(lat);
      const latCooling = lerp(0.0, 0.55, latAbs * tilt);
      const tempNoise = (fbm2D(nx * 6.0, ny * 6.0, seedN + 707, 4) - 0.5) * climateVar;
      let temperature = baseTemp - latCooling + tempNoise;
      temperature = clamp01(temperature);

      // rainfall: humidity + noise + mild orographic effect
      const rainNoise = (fbm2D(nx * 6.0, ny * 6.0, seedN + 909, 4) - 0.5) * climateVar;
      let rainfall = baseHum + rainNoise - Math.max(0, h0) * 0.15;
      rainfall = clamp01(rainfall);

      // water classification
      const isWater = h0 < globalSeaLevel;

      // biome ids (simple MVP table)
      let baseBiomeId = 2; // default temperate
      if (isWater) baseBiomeId = 0;
      else if (h0 > 0.65) baseBiomeId = temperature < 0.35 ? 5 : 6; // alpine / mountain
      else if (temperature < 0.25) baseBiomeId = 4; // tundra/taiga-ish
      else if (rainfall < 0.25) baseBiomeId = 1; // desert
      else if (rainfall > 0.60) baseBiomeId = 3; // rainforest
      else baseBiomeId = 2;

      const cell = createEmptyCell(idx, globalSeaLevel);

      // required layers
      cell.baseHeight = h0;
      cell.editHeightDelta = 0;
      cell.simHeightDelta = 0;

      cell.isWater = isWater;

      cell.temperature = temperature;
      cell.rainfall = rainfall;

      cell.baseBiomeId = baseBiomeId;
      cell.editBiomeId = baseBiomeId;

      // hydrology placeholders (schema-correct names)
      cell.flowDirection = null;
      cell.flowAccumulation = 0;
      cell.basinId = null;

      // climate / wind placeholders
      cell.climateCellId = 0;
      cell.prevailingWind = [0, 0];

      // tectonics/geology placeholders (schema-correct enums)
      cell.plateId = 0;
      cell.plateType = PlateType.CONTINENTAL;
      cell.boundaryType = BoundaryType.NONE;
      cell.upliftRate = 0;

      cell.surfaceAge = clamp01(params.planetAge / 100);
      cell.volcanicActivity = 0;

      // surface classification placeholders
      cell.surfaceType = isWater ? SurfaceType.ROCK : (rainfall < 0.25 ? SurfaceType.SAND : SurfaceType.ROCK);
      cell.snowCover = clamp01((0.25 - temperature) * 2.0); // more snow as it gets colder

      if (isWater) {
        const depth = clamp01((globalSeaLevel - h0 + 0.05) / 0.6);
        if (depth < 0.2) cell.oceanDepthClass = OceanDepthClass.SHELF;
        else if (depth < 0.45) cell.oceanDepthClass = OceanDepthClass.SLOPE;
        else if (depth < 0.8) cell.oceanDepthClass = OceanDepthClass.ABYSSAL;
        else cell.oceanDepthClass = OceanDepthClass.TRENCH;
      } else {
        cell.oceanDepthClass = null;
      }

      cells[idx] = cell;
    }
  }

  // Minimal plates list (schema expects id/name/type only)
  const plates = [{ id: 0, name: "Plate 0", type: PlateType.CONTINENTAL }];

  const nowIso = new Date().toISOString();
  const worldId = `w_${Date.now()}_${Math.floor(rng() * 1e9)}`;

  const world: WorldBrain = {
    gridWidth: width,
    gridHeight: height,
    cells,

    plates,
    rivers: [],

    countries: [],
    cultures: [],
    cultureRegions: [],
    cities: [],

    locations: [],
    stickers: [],

    metadata: {
      id: worldId,
      name: params.name,
      seed: params.seed,

      schemaVersion: "v3",
      version: "1.0.0",

      styleMode: mapWorldStyleToMode(params.worldStyle),

      gridWidth: width,
      gridHeight: height,

      createdAt: nowIso,
      updatedAt: nowIso,

      seaLevel: globalSeaLevel,
    },
  };

  return world;
}