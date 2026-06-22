// ========================================================
// WORLDWRIGHT -- WORLD GENERATOR (V1.4 CONTINUOUS TERRAIN)
// File: src/core/worldGenerator/index.ts
//
// PURPOSE OF THIS BUILD:
// - keep worldGenerator as the sole owner of initial generation
// - build continuous terrain first, then let sea level flood it
// - use tectonic interiors for broad continents and ocean basins
// - use boundaries for relief, not as the continent silhouette itself
// - remove the hard binary land-mask-first terrain path that made slabs/ribbons
// ========================================================

import {
  WorldBrain,
  Cell,
  SurfaceType,
  createEmptyCell,
  PlateType,
  BoundaryType,
  OceanDepthClass,
} from '../worldSchema';
import {
  buildTectonicsField,
  type TectonicsField,
} from '../tectonicsSystem';

export type GeneratorParams = {
  width: number;
  height: number;
  seaLevel: number;
  plateActivity: number;
  axisTilt: number;
  planetAge: number;
  climateVar: number;
  moistureLevel: number;
  temperatureOffset: number;
  erosionIntensity: number;
  continentCount: number;
  seed: number | string;
  styleMode: 'EARTHLIKE' | 'FANTASY' | 'STYLIZED' | 'ALIEN';
};

type Vec3 = [number, number, number];

type HeightBuild = {
  heights: Float32Array;
  seaLevel: number;
};

export function createDefaultGeneratorParams(): GeneratorParams {
  return {
    width: 256,
    height: 128,
    seaLevel: 50,
    plateActivity: 55,
    axisTilt: 45,
    planetAge: 70,
    climateVar: 35,
    moistureLevel: 50,
    temperatureOffset: 0,
    erosionIntensity: 70,
    continentCount: 4,
    seed: Math.floor(Math.random() * 1_000_000_000),
    styleMode: 'EARTHLIKE',
  };
}

export function generateWorldFromParams(params: GeneratorParams): WorldBrain {
  const width = clampInt(params.width, 32, 1024);
  const height = clampInt(params.height, 16, 512);
  const effectiveSeed = params.seed;
  const seedUint = seedToUint32(effectiveSeed);
  const rng = mulberry32(seedUint);
  const nowIso = new Date().toISOString();

  const plateActivity01 = clamp01(params.plateActivity / 100);
  const seaBias = clamp01(params.seaLevel / 100);
  const targetContinentCount = clampInt(params.continentCount, 1, 12);
  const targetLandFraction = computeTargetLandFraction(params.styleMode, seaBias, targetContinentCount);
  const plateCount = Math.max(8, Math.round(lerp(9, 20, clamp01((targetContinentCount - 1) / 11))));

  const cells: Cell[] = new Array(width * height);
  for (let i = 0; i < cells.length; i++) cells[i] = createEmptyCell(i);

  const tectonics = buildTectonicsField(width, height, cells, plateCount, rng, {
    plateActivity: params.plateActivity,
  });

  const plates = tectonics.plates;
  const fields = tectonics.fields;

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const f = fields[i];
    cell.plateId = f.plateId;
    cell.plateType = f.plateType;
    cell.boundaryType = f.boundaryType;
    cell.upliftRate = f.upliftRate;
    cell.volcanicActivity =
      f.boundaryType === BoundaryType.CONVERGENT
        ? clamp01(f.boundaryStrength * 0.9)
        : f.boundaryType === BoundaryType.DIVERGENT
          ? clamp01(f.boundaryStrength * 0.45)
          : clamp01(f.boundaryStrength * 0.15);
  }

  const terrain = buildContinuousTerrain({
    width,
    height,
    seedUint,
    fields,
    params,
    plateActivity01,
    targetLandFraction,
  });

  for (let i = 0; i < cells.length; i++) {
    cells[i].baseHeight = terrain.heights[i];
    cells[i].editHeightDelta = 0;
    cells[i].simHeightDelta = 0;
    cells[i].isWater = cells[i].baseHeight < terrain.seaLevel;
    cells[i].oceanDepthClass = classifyOceanDepth(cells[i].baseHeight, terrain.seaLevel, cells[i].isWater);
    cells[i].surfaceAge = clamp01(0.18 + clamp01(params.planetAge / 100) * 0.72 + deterministicJitter(seedUint, i, 17) * 0.08);
    cells[i].surfaceType = cells[i].isWater
      ? SurfaceType.ALLUVIAL
      : cells[i].volcanicActivity > 0.55
        ? SurfaceType.VOLCANIC
        : SurfaceType.ROCK;
  }

  seedClimateAndBiomes(cells, width, height, terrain.seaLevel, seedUint, params);
  seedHydrology(cells, width, height, terrain.seaLevel, rng);

  const world: WorldBrain = {
    gridWidth: width,
    gridHeight: height,
    seaLevel: terrain.seaLevel,
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
      id: `w_${params.styleMode}_${width}x${height}_${seedUint}`,
      name: 'Untitled World',
      seed: String(effectiveSeed),
      schemaVersion: 'v3',
      version: 'v1.4',
      styleMode: params.styleMode,
      gridWidth: width,
      gridHeight: height,
      createdAt: nowIso,
      updatedAt: nowIso,
      seaLevel: terrain.seaLevel,
    },
    parameters: {
      ...params,
      seed: effectiveSeed,
      seaLevel: params.seaLevel,
    },
  };

  return world;
}

function buildContinuousTerrain(args: {
  width: number;
  height: number;
  seedUint: number;
  fields: TectonicsField[];
  params: GeneratorParams;
  plateActivity01: number;
  targetLandFraction: number;
}): HeightBuild {
  const { width, height, seedUint, fields, params, plateActivity01, targetLandFraction } = args;
  const heights = new Float32Array(width * height);

  const age01 = clamp01(params.planetAge / 100);
  const erosion01 = clamp01(params.erosionIntensity / 100);
  const count01 = clamp01((params.continentCount - 1) / 11);
  const terrainMaturity = age01;
  const terrainSharpness = lerp(1.12, 0.86, terrainMaturity);
  const silhouetteActivity = lerp(0.26, 0.58, plateActivity01);
  const continentFragmentation = lerp(0.70, 1.18, count01);

  for (let r = 0; r < height; r++) {
    const lat = 90 - ((r + 0.5) / height) * 180;
    const absLat01 = Math.abs(lat) / 90;
    const poleSoftener = smoothstep(0.88, 1.0, absLat01);

    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const tect = fields[idx];
      const lon = ((c + 0.5) / width) * 360 - 180;
      const dir = latLonToUnitVector(lat, lon);

      // distanceToBoundary is high in stable plate interiors and low near boundaries.
      // This generator uses interiors for broad land/ocean provinces, and boundaries only for relief.
      const interiorness = clamp01(tect.distanceToBoundary);
      const boundaryProximity = clamp01(1 - tect.distanceToBoundary);

      const broad = sphereFbm(shiftVec(dir, 17.1, -5.3, 8.7), seedUint, 0.55 * continentFragmentation, 4);
      const regional = sphereFbm(shiftVec(dir, -3.9, 11.8, 2.6), seedUint, 1.45 * continentFragmentation, 4);
      const breakup = sphereFbm(shiftVec(dir, 6.4, 1.7, -13.2), seedUint, 3.35 * continentFragmentation, 3);
      const detail = sphereFbm(shiftVec(dir, -12.6, 4.2, 5.9), seedUint, 7.8, 2);

      const plateProvince =
        tect.plateType === PlateType.CONTINENTAL
          ? lerp(0.12, 0.42, smoothstep(0.08, 0.92, interiorness))
          : lerp(-0.18, -0.48, smoothstep(0.08, 0.92, interiorness));

      const boundaryRelief =
        tect.boundaryType === BoundaryType.CONVERGENT
          ? lerp(0.03, 0.18, tect.boundaryStrength) * boundaryProximity
          : tect.boundaryType === BoundaryType.DIVERGENT
            ? lerp(-0.12, -0.025, tect.boundaryStrength) * boundaryProximity
            : tect.boundaryType === BoundaryType.TRANSFORM
              ? lerp(-0.015, 0.025, tect.boundaryStrength) * boundaryProximity
              : 0;

      const continentalInteriorRelief =
        tect.plateType === PlateType.CONTINENTAL
          ? lerp(0.015, 0.065, interiorness) * (1 - boundaryProximity * 0.30)
          : lerp(-0.020, -0.060, interiorness);

      const noiseShape =
        broad * 0.21 +
        regional * 0.11 +
        breakup * 0.050 +
        detail * 0.018;

      const styleBias =
        params.styleMode === 'FANTASY'
          ? 0.035
          : params.styleMode === 'STYLIZED'
            ? 0.018
            : params.styleMode === 'ALIEN'
              ? detail * 0.025
              : 0;

      heights[idx] = clamp(
        (plateProvince * silhouetteActivity + continentalInteriorRelief + boundaryRelief + noiseShape * terrainSharpness + styleBias) *
          (1 - poleSoftener * 0.18),
        -1.4,
        1.5
      );
    }
  }

  smoothHeightField(heights, width, height, Math.max(1, Math.round(lerp(1, 5, erosion01))), lerp(0.06, 0.18, erosion01));
  addCoastlineBreakup(heights, width, height, seedUint, lerp(0.018, 0.035, 1 - erosion01));

  const seaLevel = chooseSeaLevelForLandFraction(heights, width, height, targetLandFraction);

  // After sea level is chosen, gently spread near-sea heights instead of forcing binary shelves.
  // This keeps coasts readable without turning the land/water split back into a hard mask.
  for (let i = 0; i < heights.length; i++) {
    const d = heights[i] - seaLevel;
    if (Math.abs(d) < 0.055) {
      heights[i] = seaLevel + d * 0.78;
    }
  }

  return { heights, seaLevel };
}

function smoothHeightField(
  heights: Float32Array,
  width: number,
  height: number,
  passes: number,
  strength: number
): void {
  for (let pass = 0; pass < passes; pass++) {
    const next = new Float32Array(heights.length);

    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        const idx = r * width + c;
        const north = Math.max(0, r - 1);
        const south = Math.min(height - 1, r + 1);
        const west = (c - 1 + width) % width;
        const east = (c + 1) % width;

        const avg =
          (heights[north * width + c] +
            heights[south * width + c] +
            heights[r * width + west] +
            heights[r * width + east]) /
          4;

        const lat = 90 - ((r + 0.5) / height) * 180;
        const absLat01 = Math.abs(lat) / 90;
        const poleDamp = lerp(1, 0.72, smoothstep(0.86, 1.0, absLat01));

        next[idx] = clamp(heights[idx] + (avg - heights[idx]) * strength * poleDamp, -1.4, 1.5);
      }
    }

    heights.set(next);
  }
}

function addCoastlineBreakup(
  heights: Float32Array,
  width: number,
  height: number,
  seedUint: number,
  amount: number
): void {
  for (let r = 0; r < height; r++) {
    const lat = 90 - ((r + 0.5) / height) * 180;
    for (let c = 0; c < width; c++) {
      const lon = ((c + 0.5) / width) * 360 - 180;
      const dir = latLonToUnitVector(lat, lon);
      const idx = r * width + c;
      const fine = sphereFbm(shiftVec(dir, 19.7, -14.1, 3.3), seedUint, 10.5, 2);
      heights[idx] = clamp(heights[idx] + fine * amount, -1.4, 1.5);
    }
  }
}

function computeTargetLandFraction(
  styleMode: GeneratorParams['styleMode'],
  seaBias: number,
  continentCount: number
): number {
  const base = lerp(0.43, 0.23, seaBias);
  const count01 = clamp01((continentCount - 1) / 11);
  const continentBonus = lerp(-0.015, 0.035, count01);

  let styleAdjust = 0;
  if (styleMode === 'FANTASY') styleAdjust = 0.045;
  if (styleMode === 'STYLIZED') styleAdjust = 0.018;
  if (styleMode === 'ALIEN') styleAdjust = 0.010;

  return clamp(base + continentBonus + styleAdjust, 0.18, 0.48);
}

function chooseSeaLevelForLandFraction(
  heights: Float32Array,
  width: number,
  height: number,
  targetLandFraction: number
): number {
  const samples: number[] = [];

  // Exclude only the exact pole rows from the sea-level percentile so projection pinching
  // does not over-control the whole planet.
  for (let r = 1; r < height - 1; r++) {
    for (let c = 0; c < width; c++) {
      samples.push(heights[r * width + c]);
    }
  }

  samples.sort((a, b) => a - b);
  const k = clampInt(Math.floor((1 - targetLandFraction) * (samples.length - 1)), 0, samples.length - 1);
  return samples[k] ?? 0;
}

function seedClimateAndBiomes(
  cells: Cell[],
  width: number,
  height: number,
  seaLevel: number,
  seedUint: number,
  params: GeneratorParams
): void {
  const climateVar01 = clamp01(params.climateVar / 100);
  const tilt01 = clamp01(params.axisTilt / 100);
  const moisture01 = clamp01(params.moistureLevel / 100);
  const tempOffset01 = (params.temperatureOffset / 100) * 0.22;

  for (let r = 0; r < height; r++) {
    const lat = 90 - ((r + 0.5) / height) * 180;
    const absLat01 = Math.abs(lat) / 90;
    const equatorWarmth = Math.pow(1 - absLat01, lerp(0.86, 1.14, tilt01));
    const hadleyWet = Math.exp(-Math.pow(absLat01 * 2.1, 2));
    const subtropicDry = Math.exp(-Math.pow((absLat01 - 0.34) * 4.8, 2));
    const polarDry = smoothstep(0.78, 1.0, absLat01) * 0.10;

    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];
      const lon = ((c + 0.5) / width) * 360 - 180;
      const dir = latLonToUnitVector(lat, lon);
      const elevAboveSea = Math.max(0, cell.baseHeight - seaLevel);
      const tempNoise = sphereFbm(shiftVec(dir, 2.3, 7.1, -4.6), seedUint, 2.5, 3);
      const rainNoise = sphereFbm(shiftVec(dir, -6.2, 3.9, 8.8), seedUint, 2.9, 3);
      const oceanProx = oceanProximityAt(cells, width, height, r, c, 4);
      const rainShadow = simpleRainShadow(cells, width, height, r, c, seaLevel);

      cell.temperature = clamp01(
        0.13 +
          equatorWarmth * 0.70 +
          tempNoise * (0.06 + climateVar01 * 0.08) +
          oceanProx * 0.035 +
          tempOffset01 -
          elevAboveSea * 0.38
      );

      cell.rainfall = clamp01(
        0.21 +
          hadleyWet * 0.29 -
          subtropicDry * 0.15 -
          polarDry +
          rainNoise * (0.10 + climateVar01 * 0.08) +
          moisture01 * 0.17 +
          oceanProx * 0.18 -
          rainShadow * 0.13 -
          elevAboveSea * 0.06
      );

      cell.snowCover = computeSnowCover(cell.temperature, cell.rainfall, elevAboveSea);
      cell.baseBiomeId = cell.isWater ? 0 : pickBiome(cell.temperature, cell.rainfall, cell.snowCover, elevAboveSea);
      cell.editBiomeId = cell.baseBiomeId;
    }
  }
}

function seedHydrology(
  cells: Cell[],
  width: number,
  height: number,
  seaLevel: number,
  rng: () => number
): void {
  const neighbors: Array<[number, number]> = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1],
  ];

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];
      cell.flowDirection = null;
      cell.flowAccumulation = cell.isWater ? 0 : 1;
      cell.basinId = null;
      if (cell.isWater) continue;

      let bestIdx: number | null = null;
      let bestH = cell.baseHeight;

      for (const [dr, dc] of neighbors) {
        const rr = r + dr;
        if (rr < 0 || rr >= height) continue;
        const cc = (c + dc + width) % width;
        const nIdx = rr * width + cc;
        const nh = cells[nIdx].baseHeight;
        if (nh < bestH - 1e-6) {
          bestH = nh;
          bestIdx = nIdx;
        }
      }

      cell.flowDirection = bestIdx;
      const slopeBoost = Math.max(0, (cell.baseHeight - bestH) * 2.0);
      cell.flowAccumulation = Math.max(1, Math.floor(1 + cell.rainfall * 8 + slopeBoost * 4 + Math.floor(rng() * 2)));
      if (cell.baseHeight - seaLevel < 0.03) cell.surfaceType = SurfaceType.ALLUVIAL;
    }
  }
}

function classifyOceanDepth(height: number, seaLevel: number, isWater: boolean): OceanDepthClass | null {
  if (!isWater) return null;
  const depth = seaLevel - height;
  if (depth > 0.70) return OceanDepthClass.TRENCH;
  if (depth > 0.42) return OceanDepthClass.ABYSSAL;
  if (depth > 0.20) return OceanDepthClass.SLOPE;
  if (depth > 0.08) return OceanDepthClass.RIDGE;
  return OceanDepthClass.SHELF;
}

function oceanProximityAt(
  cells: Cell[],
  width: number,
  height: number,
  row: number,
  col: number,
  radius: number
): number {
  let water = 0;
  let total = 0;

  for (let dr = -radius; dr <= radius; dr++) {
    const r = row + dr;
    if (r < 0 || r >= height) continue;

    for (let dc = -radius; dc <= radius; dc++) {
      const c = (col + dc + width) % width;
      total++;
      if (cells[r * width + c].isWater) water++;
    }
  }

  return total > 0 ? water / total : 0;
}

function simpleRainShadow(
  cells: Cell[],
  width: number,
  height: number,
  row: number,
  col: number,
  seaLevel: number
): number {
  let shadow = 0;

  for (let step = 1; step <= 5; step++) {
    const c = (col - step + width) % width;
    const idx = row * width + c;
    if (idx < 0 || idx >= cells.length) continue;
    const h = cells[idx].baseHeight - seaLevel;
    if (h > 0.12) shadow += h * (1 / step);
  }

  return clamp01(shadow * 0.65);
}

function computeSnowCover(temp: number, rain: number, elevAboveSea: number): number {
  const tempC = -20 + clamp01(temp) * 48;
  const seasonalSnow = tempC < -5 ? clamp01((-5 - tempC) / 10) : 0;
  const permanentIce = tempC < -18 ? clamp01((-18 - tempC) / 10) : 0;
  const alpineBoost = clamp01((elevAboveSea - 0.34) * 0.42);
  const moistureFactor = lerp(0.35, 0.82, clamp01(rain));
  return clamp01(Math.max(permanentIce, seasonalSnow * moistureFactor) + alpineBoost * 0.11);
}

function pickBiome(temp: number, rain: number, snow: number, elevAboveSea: number): number {
  if (snow > 0.86 || elevAboveSea > 1.00) return 6;
  if (temp < 0.16) return rain < 0.30 ? 1 : 2;
  if (temp < 0.34) return rain < 0.32 ? 3 : 4;
  if (rain < 0.14) return temp > 0.58 ? 8 : 4;
  if (rain < 0.28) return temp > 0.62 ? 9 : 3;
  if (rain > 0.68) return temp > 0.62 ? 10 : 7;
  return 5;
}

function latLonToUnitVector(latDeg: number, lonDeg: number): Vec3 {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  const cosLat = Math.cos(lat);
  return [cosLat * Math.cos(lon), Math.sin(lat), cosLat * Math.sin(lon)];
}

function sphereFbm(v: Vec3, seed: number, frequency: number, octaves: number): number {
  let amp = 1;
  let freq = frequency;
  let sum = 0;
  let norm = 0;

  for (let i = 0; i < octaves; i++) {
    sum += amp * sphereValueNoise(v, freq, i + 1, seed);
    norm += amp;
    amp *= 0.5;
    freq *= 2.0;
  }

  return ((sum / Math.max(1e-9, norm)) * 2 - 1) * 0.9;
}

function sphereValueNoise(v: Vec3, f: number, salt: number, seed: number): number {
  const x = v[0] * f;
  const y = v[1] * f;
  const z = v[2] * f;

  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);

  const xf = x - xi;
  const yf = y - yi;
  const zf = z - zi;

  const u = smootherstep(xf);
  const vv = smootherstep(yf);
  const w = smootherstep(zf);

  const c000 = hash3(xi, yi, zi, salt, seed);
  const c100 = hash3(xi + 1, yi, zi, salt, seed);
  const c010 = hash3(xi, yi + 1, zi, salt, seed);
  const c110 = hash3(xi + 1, yi + 1, zi, salt, seed);
  const c001 = hash3(xi, yi, zi + 1, salt, seed);
  const c101 = hash3(xi + 1, yi, zi + 1, salt, seed);
  const c011 = hash3(xi, yi + 1, zi + 1, salt, seed);
  const c111 = hash3(xi + 1, yi + 1, zi + 1, salt, seed);

  const x00 = lerp(c000, c100, u);
  const x10 = lerp(c010, c110, u);
  const x01 = lerp(c001, c101, u);
  const x11 = lerp(c011, c111, u);

  const y0 = lerp(x00, x10, vv);
  const y1 = lerp(x01, x11, vv);

  return lerp(y0, y1, w);
}

function shiftVec(dir: Vec3, ox: number, oy: number, oz: number): Vec3 {
  // Do not normalize after offsetting. This is a normal noise-space translation;
  // normalizing after an offset bends the whole sphere toward the offset and creates smears.
  return [dir[0] + ox, dir[1] + oy, dir[2] + oz];
}

function deterministicJitter(seed: number, index: number, salt: number): number {
  return hash3(index, salt, index ^ salt, 991, seed) - 0.5;
}

function hash3(x: number, y: number, z: number, salt: number, seed: number): number {
  let h =
    Math.imul(x | 0, 374761393) ^
    Math.imul(y | 0, 668265263) ^
    Math.imul(z | 0, 2147483647) ^
    Math.imul(salt | 0, 1597334677) ^
    seed;

  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
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

function smootherstep(t: number): number {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / Math.max(1e-9, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function seedToUint32(s: string | number): number {
  if (typeof s === 'number') return s >>> 0;
  const str = String(s);
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) & 0xffffffff;
}

function mulberry32(a: number): () => number {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
