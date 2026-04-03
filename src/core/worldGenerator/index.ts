// ========================================================
// WORLDWRIGHT -- WORLD GENERATOR (V1.3 HYBRID TECTONIC)
// File: src/core/worldGenerator/index.ts
//
// Goals:
// - keep tectonicsSystem as an influence layer, not visible plate geometry
// - preserve pole-safe topology
// - build continents from blended fields, shelves, breakup, and erosion
// - use tectonics to bias uplift / trenches / continental tendency
// ========================================================

import {
  WorldBrain,
  Cell,
  River,
  SurfaceType,
  createEmptyCell,
} from '../worldSchema';
import { recomputeWorld } from '../worldRecompute';
import { generateCountries } from '../countryGenerator';
import {
  buildTectonicsField,
  applyTectonicUplift,
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

type BackboneSeed = {
  anchors: Vec3[];
  width: number;
  strength: number;
};

type ShelfSeed = {
  dir: Vec3;
  radius: number;
  strength: number;
};

type RiftMaskSeed = {
  anchors: Vec3[];
  width: number;
  strength: number;
};

type PoleSample = {
  baseHeight: number;
  plateId: number;
  plateType: any;
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

  const seaBias = clamp01(params.seaLevel / 100);
  const globalSeaLevel = lerp(-0.08, 0.12, seaBias);
  const plateAmp = lerp(0.45, 1.25, clamp01(params.plateActivity / 100));
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
  const plateCount = Math.max(targetContinentCount + 5, Math.round(targetContinentCount * 2.6));

  // ----------------------------------------------------
  // STEP 1: tectonics as influence layer
  // ----------------------------------------------------
  const tectonics = buildTectonicsField(width, height, cells, plateCount, rng);
  const plates = tectonics.plates;
  const fields = tectonics.fields;

  for (let i = 0; i < cells.length; i++) {
    cells[i].plateId = fields[i].plateId;
    cells[i].plateType = fields[i].plateType;
    cells[i].boundaryType = fields[i].boundaryType;
    cells[i].upliftRate = fields[i].upliftRate;
    cells[i].volcanicActivity =
      fields[i].boundaryType === 'CONVERGENT'
        ? clamp01(fields[i].boundaryStrength * 0.9)
        : fields[i].boundaryType === 'DIVERGENT'
        ? clamp01(fields[i].boundaryStrength * 0.45)
        : clamp01(fields[i].boundaryStrength * 0.15);
  }

  // ----------------------------------------------------
  // STEP 2: generator-owned structural fields
  // ----------------------------------------------------
  const backbones = createBackboneSeeds(targetContinentCount, rng);
  const shelfSeeds = createShelfSeeds(targetContinentCount + 4, rng);
  const riftMasks = createRiftMasks(targetContinentCount + 2, rng);

  const northPoleSample = buildPoleSample(
    90,
    seedUint,
    fields[0],
    backbones,
    shelfSeeds,
    riftMasks,
    globalSeaLevel
  );
  const southPoleSample = buildPoleSample(
    -90,
    seedUint,
    fields[(height - 1) * width],
    backbones,
    shelfSeeds,
    riftMasks,
    globalSeaLevel
  );

  // ----------------------------------------------------
  // STEP 3: hybrid terrain composition
  // ----------------------------------------------------
  for (let r = 0; r < height; r++) {
    const poleMode = getPoleRowMode(r, height);

    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];
      const tect = fields[idx];

      if (poleMode === 'NORTH_CAP') {
        cell.baseHeight = northPoleSample.baseHeight;
        cell.plateId = northPoleSample.plateId;
        cell.plateType = northPoleSample.plateType;
        continue;
      }

      if (poleMode === 'SOUTH_CAP') {
        cell.baseHeight = southPoleSample.baseHeight;
        cell.plateId = southPoleSample.plateId;
        cell.plateType = southPoleSample.plateType;
        continue;
      }

      const lat = 90 - ((r + 0.5) / height) * 180;
      const lon = ((c + 0.5) / width) * 360 - 180;
      const dir = latLonToUnitVector(lat, lon);

      const absLat01 = Math.abs(lat) / 90;
      const poleProximity = smoothstep(0.80, 1.0, absLat01);
      const detailDamp = lerp(1.0, 0.12, poleProximity);

      // Backbone continents: visible shape grammar comes from these, not from plate cells
      let backboneField = -1;
      for (const bb of backbones) {
        const dist = minDistanceToPolylineOnSphere(dir, bb.anchors);
        const signal = smoothstep(bb.width, 0.0, dist) * bb.strength;
        if (signal > backboneField) backboneField = signal;
      }

      let shelfField = 0;
      for (const shelf of shelfSeeds) {
        const d = greatCircleDistance01(dir, shelf.dir);
        const s = smoothstep(shelf.radius, 0.0, d) * shelf.strength;
        if (s > shelfField) shelfField = s;
      }

      let riftField = 0;
      for (const rift of riftMasks) {
        const d = minDistanceToPolylineOnSphere(dir, rift.anchors);
        const s = smoothstep(rift.width, 0.0, d) * rift.strength;
        if (s > riftField) riftField = s;
      }

      const continentNoise = sphereFbm(dir, seedUint, 0.9, 4);
      const macroNoise = sphereFbm(offsetVec(dir, 1.2, -0.3, 0.9), seedUint, 1.8, 3);
      const breakupNoise = sphereFbm(offsetVec(dir, -1.0, 0.8, -0.7), seedUint, 4.4, 3);
      const coastNoise = sphereFbm(offsetVec(dir, 0.7, 1.4, 0.1), seedUint, 8.0, 2);

      // Tectonics only biases the field -- no direct plate-cell silhouette
      const continentalBias =
        tect.plateType === 'CONTINENTAL' ? 0.08 : -0.05;

      const boundaryBias =
        tect.boundaryType === 'CONVERGENT'
          ? lerp(0.02, 0.12, tect.boundaryStrength)
          : tect.boundaryType === 'DIVERGENT'
          ? lerp(-0.08, 0.02, tect.boundaryStrength)
          : lerp(-0.01, 0.03, tect.boundaryStrength);

      const trenchBias =
        tect.boundaryType === 'DIVERGENT' && tect.plateType === 'OCEANIC'
          ? -tect.boundaryStrength * 0.05
          : 0;

      const terrainSignal =
        backboneField * 0.78 +
        continentNoise * 0.16 +
        macroNoise * 0.12 +
        breakupNoise * 0.10 -
        riftField * 0.18 +
        shelfField * 0.08 +
        coastNoise * 0.04 * detailDamp +
        continentalBias +
        boundaryBias +
        trenchBias -
        globalSeaLevel -
        poleProximity * 0.14;

      if (terrainSignal > 0) {
        const raised = 0.03 + Math.pow(terrainSignal, 1.08) * 0.82;
        const shoulder = Math.max(0, 0.10 - terrainSignal) * shelfField * 0.22;
        cell.baseHeight = raised - shoulder;
      } else {
        const oceanDepth = -terrainSignal;
        const abyssNoise = sphereFbm(offsetVec(dir, 1.1, -1.5, 0.3), seedUint, 2.1, 2);
        cell.baseHeight =
          -0.12 -
          Math.pow(oceanDepth, 1.03) * 0.88 +
          abyssNoise * 0.02;
      }

      cell.baseHeight = clamp(cell.baseHeight, -1.5, 1.6);
    }
  }

  // Apply moderated tectonic uplift only after terrain field exists
  applyHybridTectonicInfluence(cells, fields, plateAmp);

  blendCapAdjacentRows(cells, width, height, 1, northPoleSample.baseHeight, southPoleSample.baseHeight);
  blendCapAdjacentRows(cells, width, height, 2, northPoleSample.baseHeight, southPoleSample.baseHeight);

  // ----------------------------------------------------
  // STEP 4: coast-preserving erosion / smoothing
  // ----------------------------------------------------
  const smoothingPasses = Math.max(2, Math.round(lerp(2, 6, smoothness)));
  const smoothingStrength = lerp(0.10, 0.32, smoothness);

  for (let pass = 0; pass < smoothingPasses; pass++) {
    const nextHeights = new Array<number>(cells.length);

    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        const idx = r * width + c;
        const cell = cells[idx];

        if (r === 0) {
          nextHeights[idx] = northPoleSample.baseHeight;
          continue;
        }
        if (r === height - 1) {
          nextHeights[idx] = southPoleSample.baseHeight;
          continue;
        }

        const north = Math.max(0, r - 1);
        const south = Math.min(height - 1, r + 1);
        const west = (c - 1 + width) % width;
        const east = (c + 1) % width;

        const northHeight = cells[north * width + c].baseHeight;
        const southHeight = cells[south * width + c].baseHeight;

        const avg =
          r === 1 || r === height - 2
            ? (northHeight + southHeight + cell.baseHeight) / 3
            : (
                northHeight +
                southHeight +
                cells[r * width + west].baseHeight +
                cells[r * width + east].baseHeight
              ) / 4;

        const lat = 90 - ((r + 0.5) / height) * 180;
        const poleProximity = smoothstep(68 / 90, 1.0, Math.abs(lat) / 90);
        const localSmooth = lerp(smoothingStrength, smoothingStrength * 0.45, poleProximity);

        const nearSea = Math.abs(cell.baseHeight - globalSeaLevel) < 0.10;
        const coastPreserve = nearSea ? 0.48 : 1.0;

        const noiseBreakup =
          (rng() - 0.5) * 0.010 * (1 - smoothness) * (1 - poleProximity * 0.75);

        nextHeights[idx] = clamp(
          cell.baseHeight +
            (avg - cell.baseHeight) * localSmooth * coastPreserve +
            noiseBreakup,
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

  for (let c = 0; c < width; c++) {
    cells[c].baseHeight = northPoleSample.baseHeight;
    cells[(height - 1) * width + c].baseHeight = southPoleSample.baseHeight;
  }

  // ----------------------------------------------------
  // STEP 5: climate seed fields
  // ----------------------------------------------------
  const coastalMask = computeCoastalMask(cells, width, height, globalSeaLevel);

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];
      const tect = fields[idx];

      const lat = r === 0 ? 90 : r === height - 1 ? -90 : 90 - ((r + 0.5) / height) * 180;
      const lon = r === 0 || r === height - 1 ? 0 : ((c + 0.5) / width) * 360 - 180;
      const dir = latLonToUnitVector(lat, lon);

      const absLat01 = Math.abs(lat) / 90;
      const poleProximity = smoothstep(0.82, 1.0, absLat01);

      const equatorWarmth = Math.pow(1 - absLat01, lerp(0.85, 1.15, tilt01));
      const tempNoise =
        r === 0 || r === height - 1 ? 0 : sphereFbm(offsetVec(dir, 0.7, 1.6, -1.1), seedUint, 3.0, 3);
      const rainNoise =
        r === 0 || r === height - 1 ? 0 : sphereFbm(offsetVec(dir, -1.2, 0.5, 1.8), seedUint, 2.8, 3);

      const coastBoost = coastalMask[idx] * 0.15;
      const elevAboveSea = Math.max(0, cell.baseHeight - globalSeaLevel);
      const elevCooling = elevAboveSea * 0.28;
      const polarCooling = poleProximity * 0.16;
      const tectonicMoisture =
        tect.boundaryType === 'CONVERGENT' ? 0.03 :
        tect.boundaryType === 'DIVERGENT' ? -0.02 : 0;

      cell.temperature = clamp01(
        0.14 +
          equatorWarmth * 0.70 +
          tempNoise * (0.08 + climateVar01 * 0.08) +
          tempOffset01 +
          coastBoost * 0.03 -
          elevCooling -
          polarCooling
      );

      const hadleyWet = Math.exp(-Math.pow(absLat01 * 2.2, 2));
      const subtropicDry = Math.exp(-Math.pow((absLat01 - 0.34) * 5.0, 2));

      cell.rainfall = clamp01(
        0.20 +
          hadleyWet * 0.30 -
          subtropicDry * 0.18 +
          rainNoise * (0.12 + climateVar01 * 0.08) +
          moisture01 * 0.18 +
          coastBoost +
          tectonicMoisture -
          elevAboveSea * 0.08
      );

      const biome = pickBiome(cell.temperature, cell.rainfall);
      cell.baseBiomeId = biome;
      cell.editBiomeId = biome;
      cell.surfaceType = cell.plateType === 'OCEANIC' ? SurfaceType.ALLUVIAL : SurfaceType.ROCK;

      cell.flowDirection = null;
      cell.flowAccumulation = 0;
      cell.basinId = null;
    }
  }

  // ----------------------------------------------------
  // STEP 6: initial hydrology seeds
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

          let cc = c + dc;
          if (rr === 0 || rr === height - 1) {
            cc = c;
          } else {
            cc = (cc + width) % width;
          }

          if (cc < 0 || cc >= width) continue;

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
      const slopeBoost = Math.max(0, (cell.baseHeight - bestH) * 2.1);
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

function applyHybridTectonicInfluence(
  cells: Cell[],
  fields: TectonicsField[],
  plateAmp: number
): void {
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const tect = fields[i];
    if (!cell || !tect) continue;

    let delta = 0;

    if (tect.boundaryType === 'CONVERGENT') {
      delta = lerp(0.01, 0.08, tect.boundaryStrength);
      if (tect.plateType === 'CONTINENTAL') delta *= 1.15;
    } else if (tect.boundaryType === 'DIVERGENT') {
      delta = lerp(-0.04, 0.02, tect.boundaryStrength);
    } else if (tect.boundaryType === 'TRANSFORM') {
      delta = lerp(-0.005, 0.015, tect.boundaryStrength);
    } else {
      delta = tect.plateType === 'CONTINENTAL'
        ? lerp(0.005, 0.025, 1 - tect.distanceToBoundary)
        : lerp(-0.015, 0.005, 1 - tect.distanceToBoundary);
    }

    cell.baseHeight = clamp(cell.baseHeight + delta * plateAmp, -1.6, 1.7);
  }
}

function buildPoleSample(
  lat: number,
  seed: number,
  tect: TectonicsField,
  backbones: BackboneSeed[],
  shelfSeeds: ShelfSeed[],
  riftMasks: RiftMaskSeed[],
  globalSeaLevel: number
): PoleSample {
  const dir = latLonToUnitVector(lat, 0);

  let backboneField = -1;
  for (const bb of backbones) {
    const dist = minDistanceToPolylineOnSphere(dir, bb.anchors);
    const signal = smoothstep(bb.width, 0.0, dist) * bb.strength;
    if (signal > backboneField) backboneField = signal;
  }

  let shelfField = 0;
  for (const shelf of shelfSeeds) {
    const d = greatCircleDistance01(dir, shelf.dir);
    const s = smoothstep(shelf.radius, 0.0, d) * shelf.strength;
    if (s > shelfField) shelfField = s;
  }

  let riftField = 0;
  for (const rift of riftMasks) {
    const d = minDistanceToPolylineOnSphere(dir, rift.anchors);
    const s = smoothstep(rift.width, 0.0, d) * rift.strength;
    if (s > riftField) riftField = s;
  }

  const noise = sphereFbm(dir, seed, 1.1, 3);
  const continentalBias = tect.plateType === 'CONTINENTAL' ? 0.08 : -0.05;
  const boundaryBias =
    tect.boundaryType === 'CONVERGENT'
      ? lerp(0.02, 0.10, tect.boundaryStrength)
      : tect.boundaryType === 'DIVERGENT'
      ? lerp(-0.06, 0.02, tect.boundaryStrength)
      : 0;

  const terrainSignal =
    backboneField * 0.70 +
    noise * 0.06 +
    shelfField * 0.05 -
    riftField * 0.10 +
    continentalBias +
    boundaryBias -
    globalSeaLevel -
    0.14;

  const baseHeight =
    terrainSignal > 0
      ? 0.02 + Math.pow(terrainSignal, 1.06) * 0.75
      : -0.12 - Math.pow(-terrainSignal, 1.02) * 0.84;

  return {
    baseHeight: clamp(baseHeight, -1.4, 1.4),
    plateId: tect.plateId,
    plateType: tect.plateType,
  };
}

function createBackboneSeeds(count: number, rng: () => number): BackboneSeed[] {
  const out: BackboneSeed[] = [];

  for (let i = 0; i < count; i++) {
    const anchorCount = clampInt(3 + Math.floor(rng() * 3), 3, 5);
    let prev = randomSpherePointAvoidingExtremePoles(rng, 0.78);
    const anchors: Vec3[] = [prev];

    for (let j = 1; j < anchorCount; j++) {
      prev = normalize3([
        prev[0] + (rng() * 2 - 1) * 0.55,
        prev[1] + (rng() * 2 - 1) * 0.25,
        prev[2] + (rng() * 2 - 1) * 0.55,
      ]);
      anchors.push([prev[0], clamp(prev[1], -0.80, 0.80), prev[2]] as Vec3);
    }

    out.push({
      anchors,
      width: lerp(0.08, 0.16, rng()),
      strength: lerp(0.90, 1.16, rng()),
    });
  }

  return out;
}

function createShelfSeeds(count: number, rng: () => number): ShelfSeed[] {
  const out: ShelfSeed[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      dir: randomSpherePoint(rng),
      radius: lerp(0.10, 0.20, rng()),
      strength: lerp(0.22, 0.50, rng()),
    });
  }
  return out;
}

function createRiftMasks(count: number, rng: () => number): RiftMaskSeed[] {
  const out: RiftMaskSeed[] = [];

  for (let i = 0; i < count; i++) {
    const anchorCount = clampInt(2 + Math.floor(rng() * 3), 2, 4);
    const anchors: Vec3[] = [];
    let prev = randomSpherePoint(rng);
    anchors.push(prev);

    for (let j = 1; j < anchorCount; j++) {
      prev = normalize3([
        prev[0] + (rng() * 2 - 1) * 0.45,
        prev[1] + (rng() * 2 - 1) * 0.18,
        prev[2] + (rng() * 2 - 1) * 0.45,
      ]);
      anchors.push(prev);
    }

    out.push({
      anchors,
      width: lerp(0.05, 0.11, rng()),
      strength: lerp(0.40, 0.75, rng()),
    });
  }

  return out;
}

function getPoleRowMode(r: number, height: number): 'NORTH_CAP' | 'SOUTH_CAP' | 'NORMAL' {
  if (r === 0) return 'NORTH_CAP';
  if (r === height - 1) return 'SOUTH_CAP';
  return 'NORMAL';
}

function blendCapAdjacentRows(
  cells: Cell[],
  width: number,
  height: number,
  rowDistance: 1 | 2,
  northHeight: number,
  southHeight: number
): void {
  const northRow = rowDistance;
  const southRow = height - 1 - rowDistance;

  const northBlend = rowDistance === 1 ? 0.55 : 0.28;
  const southBlend = rowDistance === 1 ? 0.55 : 0.28;

  for (let c = 0; c < width; c++) {
    const nIdx = northRow * width + c;
    cells[nIdx].baseHeight = lerp(cells[nIdx].baseHeight, northHeight, northBlend);

    const sIdx = southRow * width + c;
    cells[sIdx].baseHeight = lerp(cells[sIdx].baseHeight, southHeight, southBlend);
  }
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

      if (cells[idx].baseHeight < seaLevel) {
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

function minDistanceToPolylineOnSphere(dir: Vec3, anchors: Vec3[]): number {
  let best = 1;

  for (let i = 0; i < anchors.length; i++) {
    best = Math.min(best, greatCircleDistance01(dir, anchors[i]));
  }

  for (let i = 0; i < anchors.length - 1; i++) {
    const mid = normalize3([
      (anchors[i][0] + anchors[i + 1][0]) * 0.5,
      (anchors[i][1] + anchors[i + 1][1]) * 0.5,
      (anchors[i][2] + anchors[i + 1][2]) * 0.5,
    ]);
    best = Math.min(best, greatCircleDistance01(dir, mid));
  }

  return best;
}

function latLonToUnitVector(latDeg: number, lonDeg: number): Vec3 {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;

  const cosLat = Math.cos(lat);
  return [cosLat * Math.cos(lon), Math.sin(lat), cosLat * Math.sin(lon)];
}

function greatCircleDistance01(a: Vec3, b: Vec3): number {
  const d = clamp(dot3(a, b), -1, 1);
  return Math.acos(d) / Math.PI;
}

function sphereFbm(dir: Vec3, seed: number, frequency: number, octaves: number): number {
  let amp = 1;
  let freq = frequency;
  let sum = 0;
  let norm = 0;

  for (let i = 0; i < octaves; i++) {
    sum += amp * sphereValueNoise(dir, freq, i + 1, seed);
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

  const u = smoothstep(xf);
  const vv = smoothstep(yf);
  const w = smoothstep(zf);

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
  seed: number
): number {
  let h =
    Math.imul(x, 374761393) ^
    Math.imul(y, 668265263) ^
    Math.imul(z, 2147483647) ^
    Math.imul(salt, 1597334677) ^
    seed;

  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
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

function smoothstep(edge0OrT: number, edge1?: number, maybeX?: number): number {
  if (typeof edge1 === 'undefined' || typeof maybeX === 'undefined') {
    const t = edge0OrT;
    return t * t * (3 - 2 * t);
  }

  const t = clamp01((maybeX - edge0OrT) / (edge1 - edge0OrT));
  return t * t * (3 - 2 * t);
}