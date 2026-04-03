// ========================================================
// JARVIS CHANGE HEADER -- V1.3 GENERATOR CONTRACT LOCK
// File: src/core/worldGenerator/index.ts
//
// Climate/biome coherence pass:
// - generator keeps richer regional climate seeds
// - less latitude-striping in rainfall/temperature
// - poles stabilized without over-smearing whole rows
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

  const globalSeaLevel = lerp(-0.10, 0.10, clamp01(params.seaLevel / 100));
  const plateAmp = lerp(0.25, 1.35, clamp01(params.plateActivity / 100));
  const smooth = lerp(0.15, 0.55, clamp01(params.planetAge / 100));
  const climateVar = lerp(0.05, 0.35, clamp01(params.climateVar / 100));
  const tilt = lerp(0.25, 1.0, clamp01(params.axisTilt / 100));

  const cells: Cell[] = new Array(width * height);
  for (let i = 0; i < cells.length; i++) cells[i] = createEmptyCell(i);

  const continentCount = clampInt(params.continentCount, 1, 12);
  const plateCount = continentCount + Math.floor(continentCount * 1.2);
  const plates: Plate[] = [];
  for (let i = 0; i < plateCount; i++) {
    plates.push({
      id: i,
      type: i < continentCount ? PlateType.CONTINENTAL : PlateType.OCEANIC,
      velocity: [lerp(-1, 1, rng()), lerp(-1, 1, rng())],
    });
  }

  const continentWidth = Math.floor(width / 4);
  const continentHeight = Math.floor(height / 4);
  const continentPotential = new Float32Array(continentWidth * continentHeight);

  for (let cr = 0; cr < continentHeight; cr++) {
    for (let cc = 0; cc < continentWidth; cc++) {
      const idx = cr * continentWidth + cc;
      const lat01 = cr / Math.max(1, continentHeight - 1);
      const lon01 = cc / Math.max(1, continentWidth - 1);

      const continentBase = fbm(lon01 * 0.6, lat01 * 0.5, rng, 3) * 0.5;
      const plateNoise = fbm(lon01 * 1.2 + 0.3, lat01 * 0.9 + 0.7, rng, 2);
      const pIndex =
        Math.floor(clamp01((plateNoise + 1) * 0.5) * plateCount) % plateCount;
      const isContPlate = pIndex < continentCount;
      const plateBias = isContPlate ? 0.6 : -0.6;

      continentPotential[idx] = plateBias + continentBase;
    }
  }

  const tempContinentPotential = new Float32Array(continentWidth * continentHeight);
  for (let pass = 0; pass < 6; pass++) {
    for (let i = 0; i < continentPotential.length; i++) {
      tempContinentPotential[i] = continentPotential[i];
    }

    for (let cr = 1; cr < continentHeight - 1; cr++) {
      for (let cc = 0; cc < continentWidth; cc++) {
        const idx = cr * continentWidth + cc;
        let sum = 0;
        let count = 0;

        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = cr + dr;
            const nc = (cc + dc + continentWidth) % continentWidth;
            if (nr >= 0 && nr < continentHeight) {
              sum += tempContinentPotential[nr * continentWidth + nc];
              count++;
            }
          }
        }
        continentPotential[idx] = sum / count;
      }
    }
  }

  const targetLandFraction = 1.0 - params.seaLevel / 100.0;
  const sortedPotential = Array.from(continentPotential).sort((a, b) => a - b);
  const thresholdIndex = Math.floor(
    sortedPotential.length * (1.0 - targetLandFraction)
  );
  const continentThreshold = sortedPotential[thresholdIndex];

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];

      const lat01 = r / Math.max(1, height - 1);
      const lon01 = c / Math.max(1, width - 1);

      const cr = lat01 * (continentHeight - 1);
      const cc = lon01 * (continentWidth - 1);
      const cr0 = Math.floor(cr);
      const cc0 = Math.floor(cc);
      const cr1 = Math.min(cr0 + 1, continentHeight - 1);
      const cc1 = (cc0 + 1) % continentWidth;

      const dr = cr - cr0;
      const dc = cc - cc0;

      const v00 = continentPotential[cr0 * continentWidth + cc0];
      const v10 = continentPotential[cr0 * continentWidth + cc1];
      const v01 = continentPotential[cr1 * continentWidth + cc0];
      const v11 = continentPotential[cr1 * continentWidth + cc1];

      const v0 = v00 * (1 - dc) + v10 * dc;
      const v1 = v01 * (1 - dc) + v11 * dc;
      const potential = v0 * (1 - dr) + v1 * dr;

      const isLand = potential > continentThreshold;

      const plateNoise = fbm(lon01 * 1.2 + 0.3, lat01 * 0.9 + 0.7, rng, 2);
      const pIndex =
        Math.floor(clamp01((plateNoise + 1) * 0.5) * plateCount) % plateCount;
      cell.plateId = pIndex;
      cell.plateType = isLand ? PlateType.CONTINENTAL : PlateType.OCEANIC;

      if (isLand) {
        const landHeight =
          (potential - continentThreshold) / Math.max(1e-6, 1.0 - continentThreshold);
        cell.baseHeight = 0.2 + landHeight * 0.6;
      } else {
        const oceanDepth =
          (continentThreshold - potential) /
          Math.max(1e-6, continentThreshold + 1.0);
        cell.baseHeight = -0.3 - oceanDepth * 0.5;
      }

      cell.boundaryType = BoundaryType.NONE;
    }
  }

  const coastalCells = new Set<number>();
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];
      if (cell.baseHeight >= 0.0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr;
            const nc = (c + dc + width) % width;
            if (nr >= 0 && nr < height) {
              const nidx = nr * width + nc;
              if (cells[nidx] && cells[nidx].baseHeight < 0.0) {
                coastalCells.add(idx);
                break;
              }
            }
          }
          if (coastalCells.has(idx)) break;
        }
      }
    }
  }

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];

      const lat01 = r / Math.max(1, height - 1);
      const lon01 = c / Math.max(1, width - 1);

      if (cell.baseHeight > 0.0) {
        const isCoastal = coastalCells.has(idx);
        const regional = fbm(lon01 * 2.5, lat01 * 2.0, rng, 2) * 0.15;
        const coastalFreq = isCoastal ? 8.0 : 5.0;
        const coastalAmp = isCoastal ? 0.12 : 0.08;
        const coastal = fbm(lon01 * coastalFreq, lat01 * coastalFreq * 0.8, rng, 3) * coastalAmp;
        const mountainAmp = isCoastal ? 0.04 : 0.06;
        const mountains = fbm(lon01 * 8.0, lat01 * 6.5, rng, 2) * mountainAmp * plateAmp;
        const shelfDrop = isCoastal ? -0.03 : 0;
        const detailStrength = 1.0 - smooth * 0.4;

        cell.baseHeight += (regional + coastal + mountains + shelfDrop) * detailStrength;
      }

      cell.baseHeight = clamp(cell.baseHeight, -1.5, 1.5);

      // Softer pole stabilization than before; less smear, more local correction.
      const distFromPole = Math.min(lat01, 1 - lat01);
      if (distFromPole < 0.08) {
        const poleBlend = 1 - distFromPole / 0.08;
        let sum = 0;
        let count = 0;

        const rUp = Math.max(0, r - 1);
        const rDn = Math.min(height - 1, r + 1);
        const cLt = (c - 1 + width) % width;
        const cRt = (c + 1) % width;

        sum += cells[rUp * width + c].baseHeight; count++;
        sum += cells[rDn * width + c].baseHeight; count++;
        sum += cells[r * width + cLt].baseHeight; count++;
        sum += cells[r * width + cRt].baseHeight; count++;

        const neighborAvg = count > 0 ? sum / count : cell.baseHeight;
        cell.baseHeight = lerp(cell.baseHeight, neighborAvg, poleBlend * 0.35);
      }

      cell.boundaryType = BoundaryType.NONE;

      // Richer climate seed values that recompute will preserve/refine.
      const lat = lat01 * 2 - 1;
      const absLat = Math.abs(lat);
      const tiltFactor = lerp(0.65, 1.25, tilt);
      const latCurve = Math.pow(1 - absLat, 1.0 / tiltFactor);

      const continentality =
        fbm(lon01 * 1.8 + 1.7, lat01 * 1.4 + 0.4, rng, 2) * 0.12;
      const tempNoise = fbm(lon01 * 4.0, lat01 * 4.0, rng, 2) * climateVar;
      const regionalTemp = fbm(lon01 * 2.0 + 2.0, lat01 * 2.6 + 0.7, rng, 2) * 0.08;
      const tempOffset = (params.temperatureOffset / 100) * 0.6;

      let tempMod = 0;
      if (params.styleMode === 'ALIEN') {
        tempMod = fbm(lon01 * 8.0, lat01 * 6.0, rng, 2) * 0.15;
      } else if (params.styleMode === 'FANTASY') {
        tempMod = 0.08 + fbm(lon01 * 3.0, lat01 * 2.5, rng, 2) * 0.12;
      }

      cell.temperature = clamp01(
        latCurve * 0.70 +
          0.06 +
          tempNoise * 0.12 +
          regionalTemp +
          continentality +
          tempMod +
          tempOffset
      );

      const itczBand = Math.exp(-Math.pow(absLat * 2.5, 2));
      const subtropicDry = Math.exp(-Math.pow((absLat - 0.35) * 3.5, 2));
      const polarMoist = absLat > 0.72 ? (absLat - 0.72) * 0.28 : 0;

      const moistureMult = lerp(0.5, 1.5, params.moistureLevel / 100);
      const rainNoise = fbm(lon01 * 5.0 + 1.3, lat01 * 3.0 + 2.4, rng, 2) * climateVar;
      const regionalRain = fbm(lon01 * 2.2, lat01 * 2.8, rng, 3) * 0.14;
      const coastBoost = coastalCells.has(idx) ? 0.12 : 0.0;
      const elevDrying = cell.baseHeight > globalSeaLevel ? Math.max(0, cell.baseHeight - globalSeaLevel) * 0.12 : 0;

      let rainMod = 0;
      if (params.styleMode === 'ALIEN') {
        rainMod = fbm(lon01 * 10.0, lat01 * 7.0, rng, 3) * 0.2;
      } else if (params.styleMode === 'FANTASY') {
        rainMod = 0.1;
      }

      const rainBase =
        (itczBand * 0.56 - subtropicDry * 0.22 + polarMoist + 0.24) * moistureMult;

      cell.rainfall = clamp01(
        rainBase +
          rainNoise * 0.22 +
          regionalRain +
          coastBoost +
          rainMod -
          elevDrying
      );

      const biome = pickBiome(cell.temperature, cell.rainfall);
      cell.baseBiomeId = biome;
      cell.editBiomeId = biome;
      cell.surfaceType =
        cell.plateType === PlateType.OCEANIC ? SurfaceType.ALLUVIAL : SurfaceType.ROCK;

      cell.flowDirection = null;
      cell.flowAccumulation = 0;
      cell.basinId = null;

      cell.upliftRate = 0;
      cell.surfaceAge = clamp01(0.35 + rng() * 0.5);
      cell.volcanicActivity = 0;
    }
  }

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];
      const myPlate = cell.plateId;

      const north = (r - 1 + height) % height;
      const south = (r + 1) % height;
      const west = (c - 1 + width) % width;
      const east = (c + 1) % width;

      const nIdx = north * width + c;
      const sIdx = south * width + c;
      const wIdx = r * width + west;
      const eIdx = r * width + east;

      const platesSeen = new Set<number>();
      platesSeen.add(myPlate);
      platesSeen.add(cells[nIdx].plateId);
      platesSeen.add(cells[sIdx].plateId);
      platesSeen.add(cells[wIdx].plateId);
      platesSeen.add(cells[eIdx].plateId);

      if (platesSeen.size > 1) {
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
          cell.boundaryType = rng() < 0.5 ? BoundaryType.DIVERGENT : BoundaryType.TRANSFORM;
        }

        const boundaryFactor =
          cell.boundaryType === BoundaryType.CONVERGENT
            ? 1.2
            : cell.boundaryType === BoundaryType.DIVERGENT
            ? 0.6
            : 0.4;

        cell.upliftRate = clamp(
          plateAmp * 0.02 * boundaryFactor * (0.6 + rng() * 0.8),
          0,
          5
        );

        cell.volcanicActivity =
          cell.boundaryType === BoundaryType.CONVERGENT && hasOceanic
            ? clamp(rng() * 1.2, 0, 3)
            : rng() * 0.2;
      } else {
        cell.boundaryType = BoundaryType.NONE;
        cell.upliftRate = clamp(0.005 * (1 - smooth) * (0.5 + rng() * 0.8), 0, 0.5);
        cell.volcanicActivity = rng() * 0.05;
      }
    }
  }

  const ageFactor = clamp01(params.planetAge / 100);
  const erosionFactor = clamp01(params.erosionIntensity / 100);
  const combinedSmoothing = (ageFactor + erosionFactor) / 2;

  const smoothingPasses = Math.max(1, Math.round(lerp(1, 8, combinedSmoothing)));
  const smoothingStrength = lerp(0.15, 0.70, combinedSmoothing);

  for (let pass = 0; pass < smoothingPasses; pass++) {
    const newHeights = new Array<number>(cells.length);
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        const idx = r * width + c;
        const cell = cells[idx];
        if (!cell) continue;

        let sum = 0;
        let count = 0;
        const north = r - 1;
        const south = r + 1;
        const west = (c - 1 + width) % width;
        const east = (c + 1) % width;

        if (north >= 0) { sum += cells[north * width + c].baseHeight; count++; }
        if (south < height) { sum += cells[south * width + c].baseHeight; count++; }
        sum += cells[r * width + west].baseHeight; count++;
        sum += cells[r * width + east].baseHeight; count++;

        const neighborAvg = count > 0 ? sum / count : cell.baseHeight;
        const smoothTarget = lerp(cell.baseHeight, neighborAvg, smoothingStrength);
        const upliftDelta = cell.upliftRate * 0.005;
        const erosionNoise = (rng() - 0.5) * 0.02 * (1 - ageFactor);

        newHeights[idx] = clamp(
          cell.baseHeight + upliftDelta + erosionNoise + (smoothTarget - cell.baseHeight) * 0.9,
          -2,
          2
        );
      }
    }

    for (let i = 0; i < cells.length; i++) {
      cells[i].baseHeight = newHeights[i];
      cells[i].surfaceAge = clamp01(0.2 + ageFactor * 0.7 + (rng() - 0.5) * 0.1);
    }
  }

  const rivers: River[] = [];

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];
      if (!cell) continue;
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

      if (bestIdx != null && rng() < 0.06) {
        const rr = clampInt(r + Math.floor((rng() - 0.5) * 3), 0, height - 1);
        const cc = ((c + Math.floor((rng() - 0.5) * 3)) % width + width) % width;
        const alt = rr * width + cc;
        if (alt !== idx) bestIdx = alt;
      }

      if (bestIdx != null) {
        cell.flowDirection = bestIdx;
      }

      const rainFactor = clamp01(cell.rainfall || 0.2);
      const slopeBoost = Math.max(0, (cell.baseHeight - bestH) * 2);
      cell.flowAccumulation = Math.max(
        1,
        Math.floor(1 + rainFactor * 8 + slopeBoost * 4 + Math.floor(rng() * 3))
      );
    }
  }

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
  world.countries = generateCountries(world, continentCount);

  return world;
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
  return (sum / Math.max(1e-9, norm)) * 2 - 1;
}

function valueNoise(x: number, y: number, rng: () => number): number {
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
    let h = ix * 374761393 + iy * 668265263;
    const rv = Math.floor(rng() * 0xffffffff);
    h = (h ^ rv) >>> 0;
    h = (h ^ (h >>> 13)) * 1274126177;
    h = h ^ (h >>> 16);
    return (h >>> 0) / 4294967295;
  }
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}