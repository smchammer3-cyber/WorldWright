// ========================================================
// WORLDWRIGHT -- WORLD GENERATOR (V1.3 PHASE 1 POLE FIX)
// File: src/core/worldGenerator/index.ts
//
// Phase 1 goal:
// - eliminate pole flower/starburst artifacts at the source
// - move macro landmass generation onto sphere-safe sampling
// - keep existing app contracts intact
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
import { generateCountries } from '../countryGenerator';

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

type PlateSeed = {
  id: number;
  type: PlateType;
  dir: Vec3;
  velocity: [number, number];
};

type ContinentSeed = {
  dir: Vec3;
  strength: number;
  radius: number;
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

  const seedUint = seedToUint32(params.seed);
  const rng = mulberry32(seedUint);
  const nowIso = new Date().toISOString();

  const globalSeaLevel = lerp(-0.12, 0.10, clamp01(params.seaLevel / 100));
  const plateAmp = lerp(0.35, 1.3, clamp01(params.plateActivity / 100));
  const age01 = clamp01(params.planetAge / 100);
  const erosion01 = clamp01(params.erosionIntensity / 100);
  const smoothness = (age01 + erosion01) * 0.5;
  const climateVar01 = clamp01(params.climateVar / 100);
  const tilt01 = clamp01(params.axisTilt / 100);
  const moisture01 = clamp01(params.moistureLevel / 100);
  const tempOffset01 = (params.temperatureOffset / 100) * 0.22;

  const cells: Cell[] = new Array(width * height);
  for (let i = 0; i < cells.length; i++) cells[i] = createEmptyCell(i);

  const targetContinentCount = clampInt(params.continentCount, 1, 12);
  const plateCount = Math.max(targetContinentCount + 3, Math.round(targetContinentCount * 2.4));

  const continentSeeds = createContinentSeeds(targetContinentCount, rng);
  const plateSeeds = createPlateSeeds(plateCount, targetContinentCount, rng);

  const plates: Plate[] = plateSeeds.map((p) => ({
    id: p.id,
    type: p.type,
    velocity: p.velocity,
  }));

  // ----------------------------------------------------
  // PASS 1: Macro landmass + plate assignment on sphere
  // ----------------------------------------------------
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];

      const lat = 90 - ((r + 0.5) / height) * 180;
      const lon = ((c + 0.5) / width) * 360 - 180;
      const dir = latLonToUnitVector(lat, lon);

      const absLat01 = Math.abs(lat) / 90;
      const poleProximity = smoothstep(0.80, 1.0, absLat01);

      const plateSeed = findNearestPlateSeed(dir, plateSeeds);
      cell.plateId = plateSeed.id;
      cell.plateType = plateSeed.type;

      // Broad continent support from spherical seed lobes.
      let continentInfluence = 0;
      for (const seed of continentSeeds) {
        const d = greatCircleDistance01(dir, seed.dir);
        const influence = smoothstep(seed.radius, 0.0, d) * seed.strength;
        if (influence > continentInfluence) {
          continentInfluence = influence;
        }
      }

      // Sphere-safe layered noise: no longitude singularity.
      const macroNoise = sphereFbm(dir, rng, 1.1, 4);
      const regionalNoise = sphereFbm(offsetVec(dir, 1.9, -0.8, 0.6), rng, 2.4, 3);
      const coastNoise = sphereFbm(offsetVec(dir, -0.6, 1.4, 0.9), rng, 5.6, 2);

      // High-frequency detail is damped toward poles to prevent starbursts.
      const polarDetailDamp = lerp(1.0, 0.18, poleProximity);
      const landSignal =
        continentInfluence * 0.80 +
        macroNoise * 0.22 +
        regionalNoise * 0.12 +
        coastNoise * 0.06 * polarDetailDamp;

      // Slightly discourage huge direct polar continent petals.
      const polarLandPenalty = poleProximity * 0.18;

      const continentalBias =
        plateSeed.type === PlateType.CONTINENTAL ? 0.09 : -0.06;

      const terrainPotential =
        landSignal + continentalBias - globalSeaLevel - polarLandPenalty;

      const isLand = terrainPotential > 0;

      if (isLand) {
        const upliftNoise = sphereFbm(offsetVec(dir, 0.4, 0.9, -1.3), rng, 7.0, 2);
        const baseLand = 0.08 + terrainPotential * 0.82;
        const uplifts =
          upliftNoise * 0.08 * plateAmp * polarDetailDamp;

        cell.baseHeight = baseLand + uplifts;
      } else {
        const oceanDepthSignal = -terrainPotential;
        const abyssNoise = sphereFbm(offsetVec(dir, 1.1, -1.7, 0.2), rng, 2.2, 2);
        cell.baseHeight = -0.18 - oceanDepthSignal * 0.95 + abyssNoise * 0.04;
      }

      cell.baseHeight = clamp(cell.baseHeight, -1.5, 1.5);
      cell.boundaryType = BoundaryType.NONE;
    }
  }

  // ----------------------------------------------------
  // PASS 2: Plate boundary tagging + terrain shaping
  // ----------------------------------------------------
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];
      const myPlate = cell.plateId;

      const north = Math.max(0, r - 1);
      const south = Math.min(height - 1, r + 1);
      const west = (c - 1 + width) % width;
      const east = (c + 1) % width;

      const nIdx = north * width + c;
      const sIdx = south * width + c;
      const wIdx = r * width + west;
      const eIdx = r * width + east;

      const neighborPlateIds = [
        cells[nIdx].plateId,
        cells[sIdx].plateId,
        cells[wIdx].plateId,
        cells[eIdx].plateId,
      ];

      const touchingBoundary = neighborPlateIds.some((p) => p !== myPlate);
      if (!touchingBoundary) {
        cell.boundaryType = BoundaryType.NONE;
        cell.upliftRate = clamp(0.01 * (1 - smoothness) * (0.4 + rng() * 0.8), 0, 0.4);
        cell.volcanicActivity = rng() * 0.04;
        continue;
      }

      const neighborTypes = [
        cells[nIdx].plateType,
        cells[sIdx].plateType,
        cells[wIdx].plateType,
        cells[eIdx].plateType,
      ];

      const hasOceanic = neighborTypes.some((t) => t === PlateType.OCEANIC);
      const hasContinental = neighborTypes.some((t) => t === PlateType.CONTINENTAL);

      if (hasOceanic && hasContinental) {
        cell.boundaryType = BoundaryType.CONVERGENT;
      } else {
        cell.boundaryType = rng() < 0.52 ? BoundaryType.DIVERGENT : BoundaryType.TRANSFORM;
      }

      const boundaryStrength =
        cell.boundaryType === BoundaryType.CONVERGENT
          ? 0.10
          : cell.boundaryType === BoundaryType.DIVERGENT
          ? -0.05
          : 0.02;

      cell.baseHeight += boundaryStrength * plateAmp * (0.55 + rng() * 0.65);
      cell.baseHeight = clamp(cell.baseHeight, -1.6, 1.7);

      cell.upliftRate =
        cell.boundaryType === BoundaryType.CONVERGENT
          ? clamp(0.14 * plateAmp * (0.7 + rng() * 0.6), 0, 3)
          : cell.boundaryType === BoundaryType.DIVERGENT
          ? clamp(0.05 * plateAmp * (0.7 + rng() * 0.5), 0, 1.4)
          : clamp(0.02 * plateAmp * (0.5 + rng() * 0.5), 0, 0.8);

      cell.volcanicActivity =
        cell.boundaryType === BoundaryType.CONVERGENT && hasOceanic
          ? clamp(0.25 + rng() * 0.9, 0, 3)
          : cell.boundaryType === BoundaryType.DIVERGENT
          ? clamp(rng() * 0.4, 0, 1.2)
          : rng() * 0.15;
    }
  }

  // ----------------------------------------------------
  // PASS 3: Erosion / smoothing with pole-safe damping
  // ----------------------------------------------------
  const smoothingPasses = Math.max(2, Math.round(lerp(2, 7, smoothness)));
  const smoothingStrength = lerp(0.16, 0.62, smoothness);

  for (let pass = 0; pass < smoothingPasses; pass++) {
    const nextHeights = new Array<number>(cells.length);

    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        const idx = r * width + c;
        const cell = cells[idx];

        const north = Math.max(0, r - 1);
        const south = Math.min(height - 1, r + 1);
        const west = (c - 1 + width) % width;
        const east = (c + 1) % width;

        const neighbors = [
          cells[north * width + c].baseHeight,
          cells[south * width + c].baseHeight,
          cells[r * width + west].baseHeight,
          cells[r * width + east].baseHeight,
        ];

        const avg =
          (neighbors[0] + neighbors[1] + neighbors[2] + neighbors[3]) / 4;

        const lat = 90 - ((r + 0.5) / height) * 180;
        const poleProximity = smoothstep(68 / 90, 1.0, Math.abs(lat) / 90);

        const localSmooth = lerp(smoothingStrength, smoothingStrength * 0.55, poleProximity);
        const upliftDelta = cell.upliftRate * 0.004;
        const noiseBreakup = (rng() - 0.5) * 0.012 * (1 - smoothness) * (1 - poleProximity * 0.65);

        nextHeights[idx] = clamp(
          cell.baseHeight + (avg - cell.baseHeight) * localSmooth + upliftDelta + noiseBreakup,
          -1.7,
          1.8
        );
      }
    }

    for (let i = 0; i < cells.length; i++) {
      cells[i].baseHeight = nextHeights[i];
      cells[i].surfaceAge = clamp01(0.18 + age01 * 0.72 + (rng() - 0.5) * 0.08);
    }
  }

  // ----------------------------------------------------
  // PASS 4: Climate seed fields (still refined later by recompute)
  // ----------------------------------------------------
  const coastalMask = computeCoastalMask(cells, width, height, globalSeaLevel);

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];

      const lat = 90 - ((r + 0.5) / height) * 180;
      const lon = ((c + 0.5) / width) * 360 - 180;
      const dir = latLonToUnitVector(lat, lon);

      const absLat01 = Math.abs(lat) / 90;
      const poleProximity = smoothstep(0.82, 1.0, absLat01);

      const equatorWarmth = Math.pow(1 - absLat01, lerp(0.85, 1.15, tilt01));
      const tempNoise = sphereFbm(offsetVec(dir, 0.7, 1.6, -1.1), rng, 3.4, 3);
      const rainNoise = sphereFbm(offsetVec(dir, -1.2, 0.5, 1.8), rng, 3.0, 3);

      const coastBoost = coastalMask[idx] * 0.16;
      const elevAboveSea = Math.max(0, cell.baseHeight - globalSeaLevel);
      const elevCooling = elevAboveSea * 0.34;
      const polarCooling = poleProximity * 0.18;

      cell.temperature = clamp01(
        0.12 +
          equatorWarmth * 0.72 +
          tempNoise * (0.10 + climateVar01 * 0.08) +
          tempOffset01 +
          coastBoost * 0.03 -
          elevCooling -
          polarCooling
      );

      const hadleyWet = Math.exp(-Math.pow(absLat01 * 2.2, 2));
      const subtropicDry = Math.exp(-Math.pow((absLat01 - 0.34) * 5.0, 2));

      cell.rainfall = clamp01(
        0.18 +
          hadleyWet * 0.34 -
          subtropicDry * 0.20 +
          rainNoise * (0.14 + climateVar01 * 0.08) +
          moisture01 * 0.20 +
          coastBoost -
          elevAboveSea * 0.12
      );

      const biome = pickBiome(cell.temperature, cell.rainfall);
      cell.baseBiomeId = biome;
      cell.editBiomeId = biome;

      cell.surfaceType =
        cell.plateType === PlateType.OCEANIC ? SurfaceType.ALLUVIAL : SurfaceType.ROCK;

      cell.flowDirection = null;
      cell.flowAccumulation = 0;
      cell.basinId = null;
    }
  }

  // ----------------------------------------------------
  // PASS 5: Simple initial hydrology seeds
  // ----------------------------------------------------
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];
      if (cell.baseHeight < globalSeaLevel) continue;

      let bestIdx: number | null = null;
      let bestH = cell.baseHeight;

      for (let dr = -1; dr <= 1; dr++) {
        const rr = r + dr;
        if (rr < 0 || rr >= height) continue;

        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const cc = (c + dc + width) % width;
          const nIdx = rr * width + cc;
          const nh = cells[nIdx].baseHeight;
          if (nh < bestH - 1e-6) {
            bestH = nh;
            bestIdx = nIdx;
          }
        }
      }

      if (bestIdx != null) {
        cell.flowDirection = bestIdx;
      }

      const rainFactor = clamp01(cell.rainfall || 0.2);
      const slopeBoost = Math.max(0, (cell.baseHeight - bestH) * 2.2);
      cell.flowAccumulation = Math.max(
        1,
        Math.floor(1 + rainFactor * 9 + slopeBoost * 4 + Math.floor(rng() * 2))
      );
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
      id: `w_${params.styleMode}_${width}x${height}_${seedUint}`,
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
  world.countries = generateCountries(world, targetContinentCount);

  return world;
}

function createContinentSeeds(count: number, rng: () => number): ContinentSeed[] {
  const seeds: ContinentSeed[] = [];

  for (let i = 0; i < count; i++) {
    const dir = randomSpherePointAvoidingExtremePoles(rng, 0.82);
    seeds.push({
      dir,
      strength: lerp(0.85, 1.15, rng()),
      radius: lerp(0.18, 0.34, rng()),
    });
  }

  return seeds;
}

function createPlateSeeds(
  count: number,
  continentCount: number,
  rng: () => number
): PlateSeed[] {
  const seeds: PlateSeed[] = [];

  for (let i = 0; i < count; i++) {
    seeds.push({
      id: i,
      type: i < continentCount ? PlateType.CONTINENTAL : PlateType.OCEANIC,
      dir:
        i < continentCount
          ? randomSpherePointAvoidingExtremePoles(rng, 0.88)
          : randomSpherePoint(rng),
      velocity: [lerp(-1, 1, rng()), lerp(-1, 1, rng())],
    });
  }

  return seeds;
}

function findNearestPlateSeed(dir: Vec3, plateSeeds: PlateSeed[]): PlateSeed {
  let best = plateSeeds[0];
  let bestDot = -Infinity;

  for (const seed of plateSeeds) {
    const d = dot3(dir, seed.dir);
    if (d > bestDot) {
      bestDot = d;
      best = seed;
    }
  }

  return best;
}

function computeCoastalMask(
  cells: Cell[],
  width: number,
  height: number,
  seaLevel: number
): Float32Array {
  const mask = new Float32Array(cells.length);

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];

      const isLand = cell.baseHeight >= seaLevel;
      if (!isLand) {
        mask[idx] = 0;
        continue;
      }

      let waterNeighbors = 0;
      let total = 0;

      for (let dr = -2; dr <= 2; dr++) {
        const rr = r + dr;
        if (rr < 0 || rr >= height) continue;

        for (let dc = -2; dc <= 2; dc++) {
          const cc = (c + dc + width) % width;
          if (dr === 0 && dc === 0) continue;
          total++;
          if (cells[rr * width + cc].baseHeight < seaLevel) waterNeighbors++;
        }
      }

      mask[idx] = total > 0 ? waterNeighbors / total : 0;
    }
  }

  return mask;
}

function latLonToUnitVector(latDeg: number, lonDeg: number): Vec3 {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;

  const cosLat = Math.cos(lat);
  return [
    cosLat * Math.cos(lon),
    Math.sin(lat),
    cosLat * Math.sin(lon),
  ];
}

function greatCircleDistance01(a: Vec3, b: Vec3): number {
  const d = clamp(dot3(a, b), -1, 1);
  const angle = Math.acos(d);
  return angle / Math.PI;
}

function sphereFbm(dir: Vec3, rng: () => number, frequency: number, octaves: number): number {
  let amp = 1;
  let freq = frequency;
  let sum = 0;
  let norm = 0;

  for (let i = 0; i < octaves; i++) {
    sum += amp * sphereValueNoise(dir, freq, i + 1);
    norm += amp;
    amp *= 0.5;
    freq *= 2.0;
  }

  return ((sum / Math.max(1e-9, norm)) * 2 - 1) * 0.9;

  function sphereValueNoise(v: Vec3, f: number, salt: number): number {
    const x = v[0] * f;
    const y = v[1] * f;
    const z = v[2] * f;

    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const zi = Math.floor(z);

    const xf = x - xi;
    const yf = y - yi;
    const zf = z - zi;

    const u = smoothstep(xf);
    const vv = smoothstep(yf);
    const w = smoothstep(zf);

    const c000 = hash3(xi, yi, zi, salt, rng);
    const c100 = hash3(xi + 1, yi, zi, salt, rng);
    const c010 = hash3(xi, yi + 1, zi, salt, rng);
    const c110 = hash3(xi + 1, yi + 1, zi, salt, rng);
    const c001 = hash3(xi, yi, zi + 1, salt, rng);
    const c101 = hash3(xi + 1, yi, zi + 1, salt, rng);
    const c011 = hash3(xi, yi + 1, zi + 1, salt, rng);
    const c111 = hash3(xi + 1, yi + 1, zi + 1, salt, rng);

    const x00 = lerp(c000, c100, u);
    const x10 = lerp(c010, c110, u);
    const x01 = lerp(c001, c101, u);
    const x11 = lerp(c011, c111, u);

    const y0 = lerp(x00, x10, vv);
    const y1 = lerp(x01, x11, vv);

    return lerp(y0, y1, w);
  }
}

function offsetVec(dir: Vec3, ox: number, oy: number, oz: number): Vec3 {
  return normalize3([dir[0] + ox, dir[1] + oy, dir[2] + oz]);
}

function randomSpherePoint(rng: () => number): Vec3 {
  const u = rng() * 2 - 1;
  const theta = rng() * Math.PI * 2;
  const s = Math.sqrt(Math.max(0, 1 - u * u));
  return [s * Math.cos(theta), u, s * Math.sin(theta)];
}

function randomSpherePointAvoidingExtremePoles(
  rng: () => number,
  maxAbsY: number
): Vec3 {
  for (let i = 0; i < 100; i++) {
    const p = randomSpherePoint(rng);
    if (Math.abs(p[1]) <= maxAbsY) return p;
  }
  const fallback = randomSpherePoint(rng);
  return [fallback[0], clamp(fallback[1], -maxAbsY, maxAbsY), fallback[2]];
}

function dot3(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function normalize3(v: Vec3): Vec3 {
  const len = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
}

function hash3(
  x: number,
  y: number,
  z: number,
  salt: number,
  rng: () => number
): number {
  let h = x * 374761393 + y * 668265263 + z * 2147483647 + salt * 1597334677;
  const rv = Math.floor(rng() * 0xffffffff);
  h = (h ^ rv) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h = h ^ (h >>> 16);
  return (h >>> 0) / 4294967295;
}

function pickBiome(temp: number, rain: number): number {
  if (temp < 0.20) return rain < 0.35 ? 1 : 2;
  if (temp < 0.35) return rain < 0.35 ? 3 : 4;
  if (temp < 0.60) return rain < 0.30 ? 5 : rain < 0.60 ? 6 : 7;
  return rain < 0.25 ? 8 : rain < 0.55 ? 9 : 10;
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

function smoothstep(edge0OrT: number, edge1?: number, maybeX?: number): number {
  if (typeof edge1 === 'undefined' || typeof maybeX === 'undefined') {
    const t = edge0OrT;
    return t * t * (3 - 2 * t);
  }

  const t = clamp01((maybeX - edge0OrT) / (edge1 - edge0OrT));
  return t * t * (3 - 2 * t);
}