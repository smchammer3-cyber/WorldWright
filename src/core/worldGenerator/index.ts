// ========================================================
// WORLDWRIGHT -- WORLD GENERATOR (V1.3 TERRAIN PIPELINE CORRECTION)
// File: src/core/worldGenerator/index.ts
//
// Goals:
// - preserve pole-safe topology
// - replace blob-first continent logic with backbone/rift logic
// - create more believable continental silhouettes
// - improve shelves/coasts before recompute
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

type BackboneSeed = {
  anchors: Vec3[];
  width: number;
  strength: number;
};

type RiftSeed = {
  anchors: Vec3[];
  width: number;
  strength: number;
};

type ShelfSeed = {
  dir: Vec3;
  radius: number;
  strength: number;
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
  const plateAmp = lerp(0.35, 1.25, clamp01(params.plateActivity / 100));
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

  const plateSeeds = createPlateSeeds(plateCount, targetContinentCount, rng);
  const backboneSeeds = createBackboneSeeds(targetContinentCount, rng);
  const riftSeeds = createRiftSeeds(targetContinentCount + 2, rng);
  const shelfSeeds = createShelfSeeds(targetContinentCount + 3, rng);

  const plates: Plate[] = plateSeeds.map((p) => ({
    id: p.id,
    type: p.type,
    velocity: p.velocity,
  }));

  const northPoleSample = buildPoleSample(
    90,
    seedUint,
    plateSeeds,
    backboneSeeds,
    riftSeeds,
    shelfSeeds,
    globalSeaLevel,
    plateAmp
  );
  const southPoleSample = buildPoleSample(
    -90,
    seedUint,
    plateSeeds,
    backboneSeeds,
    riftSeeds,
    shelfSeeds,
    globalSeaLevel,
    plateAmp
  );

  // ----------------------------------------------------
  // PASS 1: Macro terrain field from backbones + rifts
  // ----------------------------------------------------
  for (let r = 0; r < height; r++) {
    const rowPoleMode = getPoleRowMode(r, height);

    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];

      if (rowPoleMode === 'NORTH_CAP') {
        cell.plateId = northPoleSample.plateId;
        cell.plateType = northPoleSample.plateType;
        cell.baseHeight = northPoleSample.baseHeight;
        cell.boundaryType = BoundaryType.NONE;
        continue;
      }

      if (rowPoleMode === 'SOUTH_CAP') {
        cell.plateId = southPoleSample.plateId;
        cell.plateType = southPoleSample.plateType;
        cell.baseHeight = southPoleSample.baseHeight;
        cell.boundaryType = BoundaryType.NONE;
        continue;
      }

      const lat = 90 - ((r + 0.5) / height) * 180;
      const lon = ((c + 0.5) / width) * 360 - 180;
      const dir = latLonToUnitVector(lat, lon);
      const absLat01 = Math.abs(lat) / 90;
      const poleProximity = smoothstep(0.80, 1.0, absLat01);

      const plateSeed = findNearestPlateSeed(dir, plateSeeds);
      cell.plateId = plateSeed.id;
      cell.plateType = plateSeed.type;

      // Backbone-driven continental scaffolding
      let backboneField = -1;
      for (const seed of backboneSeeds) {
        const dist = minDistanceToPolylineOnSphere(dir, seed.anchors);
        const signal = smoothstep(seed.width, 0.0, dist) * seed.strength;
        if (signal > backboneField) backboneField = signal;
      }

      // Continental breakup masks
      const continentNoise = sphereFbm(dir, seedUint, 0.9, 4);
      const breakupNoiseA = sphereFbm(offsetVec(dir, 1.5, -0.2, 0.8), seedUint, 2.1, 3);
      const breakupNoiseB = sphereFbm(offsetVec(dir, -1.2, 0.8, -0.9), seedUint, 4.6, 3);
      const coastNoise = sphereFbm(offsetVec(dir, 0.7, 1.6, 0.1), seedUint, 8.0, 2);

      // Rift/basin carving -- line-like, not circular blobs
      let riftField = 0;
      for (const rift of riftSeeds) {
        const dist = minDistanceToPolylineOnSphere(dir, rift.anchors);
        const carve = smoothstep(rift.width, 0.0, dist) * rift.strength;
        if (carve > riftField) riftField = carve;
      }

      // Shelf zones encourage continental shoulders instead of inflated blobs
      let shelfField = 0;
      for (const shelf of shelfSeeds) {
        const d = greatCircleDistance01(dir, shelf.dir);
        const s = smoothstep(shelf.radius, 0.0, d) * shelf.strength;
        if (s > shelfField) shelfField = s;
      }

      const polarDetailDamp = lerp(1.0, 0.10, poleProximity);
      const continentalBias = plateSeed.type === PlateType.CONTINENTAL ? 0.10 : -0.08;

      const landSignal =
        backboneField * 0.86 +
        continentNoise * 0.18 +
        breakupNoiseA * 0.16 +
        breakupNoiseB * 0.10 +
        coastNoise * 0.05 * polarDetailDamp -
        riftField * 0.34 +
        shelfField * 0.08 +
        continentalBias;

      const polarPenalty = poleProximity * 0.14;
      const terrainPotential = landSignal - globalSeaLevel - polarPenalty;

      if (terrainPotential > 0) {
        const upliftNoise = sphereFbm(offsetVec(dir, 0.3, 0.9, -1.2), seedUint, 6.2, 2);
        const shoulderNoise = sphereFbm(offsetVec(dir, -0.9, 0.5, 1.0), seedUint, 3.8, 2);

        const continentalCore = 0.04 + Math.pow(terrainPotential, 1.12) * 0.86;
        const tectonicLift = upliftNoise * 0.08 * plateAmp * polarDetailDamp;
        const shoulder = Math.max(0, 0.10 - terrainPotential) * shoulderNoise * 0.22;

        cell.baseHeight = continentalCore + tectonicLift - shoulder;
      } else {
        const oceanDepthSignal = -terrainPotential;
        const abyssNoise = sphereFbm(offsetVec(dir, 1.1, -1.5, 0.3), seedUint, 2.0, 2);
        const trenchNoise = sphereFbm(offsetVec(dir, -1.3, 0.4, 1.4), seedUint, 5.0, 2);

        cell.baseHeight =
          -0.14 -
          Math.pow(oceanDepthSignal, 1.05) * 0.96 +
          abyssNoise * 0.025 -
          trenchNoise * 0.035;
      }

      cell.baseHeight = clamp(cell.baseHeight, -1.5, 1.5);
      cell.boundaryType = BoundaryType.NONE;
    }
  }

  blendCapAdjacentRows(cells, width, height, 1, northPoleSample.baseHeight, southPoleSample.baseHeight);
  blendCapAdjacentRows(cells, width, height, 2, northPoleSample.baseHeight, southPoleSample.baseHeight);

  // ----------------------------------------------------
  // PASS 2: Plate boundary terrain shaping
  // ----------------------------------------------------
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];
      const myPlate = cell.plateId;

      if (r === 0 || r === height - 1) {
        cell.boundaryType = BoundaryType.NONE;
        cell.upliftRate = 0;
        cell.volcanicActivity = 0;
        continue;
      }

      const north = Math.max(0, r - 1);
      const south = Math.min(height - 1, r + 1);
      const west = (c - 1 + width) % width;
      const east = (c + 1) % width;

      const neighbors = [
        cells[north * width + c],
        cells[south * width + c],
        cells[r * width + west],
        cells[r * width + east],
      ];

      const touchingBoundary = neighbors.some((n) => n.plateId !== myPlate);
      if (!touchingBoundary) {
        cell.boundaryType = BoundaryType.NONE;
        cell.upliftRate = clamp(0.01 * (1 - smoothness) * (0.4 + rng() * 0.8), 0, 0.4);
        cell.volcanicActivity = rng() * 0.04;
        continue;
      }

      const hasOceanic = neighbors.some((n) => n.plateType === PlateType.OCEANIC);
      const hasContinental = neighbors.some((n) => n.plateType === PlateType.CONTINENTAL);

      if (hasOceanic && hasContinental) {
        cell.boundaryType = BoundaryType.CONVERGENT;
      } else {
        cell.boundaryType = rng() < 0.5 ? BoundaryType.DIVERGENT : BoundaryType.TRANSFORM;
      }

      const lat = 90 - ((r + 0.5) / height) * 180;
      const poleProximity = smoothstep(72 / 90, 1.0, Math.abs(lat) / 90);

      const boundaryStrength =
        cell.boundaryType === BoundaryType.CONVERGENT
          ? 0.10
          : cell.boundaryType === BoundaryType.DIVERGENT
          ? -0.05
          : 0.018;

      cell.baseHeight += boundaryStrength * plateAmp * (0.55 + rng() * 0.65) * (1 - poleProximity * 0.7);
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
  // PASS 3: Coast-preserving smoothing / erosion
  // ----------------------------------------------------
  const smoothingPasses = Math.max(2, Math.round(lerp(2, 6, smoothness)));
  const smoothingStrength = lerp(0.12, 0.40, smoothness);

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
        const northHeight = cells[north * width + c].baseHeight;
        const southHeight = cells[south * width + c].baseHeight;

        let avg: number;
        if (r === 1 || r === height - 2) {
          avg = (northHeight + southHeight + cell.baseHeight) / 3;
        } else {
          const west = (c - 1 + width) % width;
          const east = (c + 1) % width;
          avg =
            (
              northHeight +
              southHeight +
              cells[r * width + west].baseHeight +
              cells[r * width + east].baseHeight
            ) / 4;
        }

        const lat = 90 - ((r + 0.5) / height) * 180;
        const poleProximity = smoothstep(68 / 90, 1.0, Math.abs(lat) / 90);
        const localSmooth = lerp(smoothingStrength, smoothingStrength * 0.45, poleProximity);

        const nearSea = Math.abs(cell.baseHeight - globalSeaLevel) < 0.10;
        const coastPreserve = nearSea ? 0.50 : 1.0;

        const upliftDelta = cell.upliftRate * 0.004;
        const noiseBreakup = (rng() - 0.5) * 0.010 * (1 - smoothness) * (1 - poleProximity * 0.75);

        nextHeights[idx] = clamp(
          cell.baseHeight +
            (avg - cell.baseHeight) * localSmooth * coastPreserve +
            upliftDelta +
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
  // PASS 4: Climate seed fields
  // ----------------------------------------------------
  const coastalMask = computeCoastalMask(cells, width, height, globalSeaLevel);

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];

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
      const elevCooling = elevAboveSea * 0.30;
      const polarCooling = poleProximity * 0.16;

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
          coastBoost -
          elevAboveSea * 0.08
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
  // PASS 5: Initial hydrology seeds
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

function buildPoleSample(
  lat: number,
  seed: number,
  plateSeeds: PlateSeed[],
  backboneSeeds: BackboneSeed[],
  riftSeeds: RiftSeed[],
  shelfSeeds: ShelfSeed[],
  globalSeaLevel: number,
  plateAmp: number
) {
  const dir = latLonToUnitVector(lat, 0);
  const plateSeed = findNearestPlateSeed(dir, plateSeeds);

  let backboneField = -1;
  for (const bb of backboneSeeds) {
    const dist = minDistanceToPolylineOnSphere(dir, bb.anchors);
    const signal = smoothstep(bb.width, 0.0, dist) * bb.strength;
    if (signal > backboneField) backboneField = signal;
  }

  let riftField = 0;
  for (const rift of riftSeeds) {
    const dist = minDistanceToPolylineOnSphere(dir, rift.anchors);
    const carve = smoothstep(rift.width, 0.0, dist) * rift.strength;
    if (carve > riftField) riftField = carve;
  }

  let shelfField = 0;
  for (const shelf of shelfSeeds) {
    const d = greatCircleDistance01(dir, shelf.dir);
    const s = smoothstep(shelf.radius, 0.0, d) * shelf.strength;
    if (s > shelfField) shelfField = s;
  }

  const continentNoise = sphereFbm(dir, seed, 0.9, 4);
  const breakupNoiseA = sphereFbm(offsetVec(dir, 1.5, -0.2, 0.8), seed, 2.1, 3);
  const breakupNoiseB = sphereFbm(offsetVec(dir, -1.2, 0.8, -0.9), seed, 4.6, 3);
  const coastNoise = sphereFbm(offsetVec(dir, 0.7, 1.6, 0.1), seed, 8.0, 2);

  const continentalBias = plateSeed.type === PlateType.CONTINENTAL ? 0.10 : -0.08;

  const landSignal =
    backboneField * 0.86 +
    continentNoise * 0.18 +
    breakupNoiseA * 0.16 +
    breakupNoiseB * 0.10 +
    coastNoise * 0.005 -
    riftField * 0.34 +
    shelfField * 0.08 +
    continentalBias;

  const terrainPotential = landSignal - globalSeaLevel - 0.14;

  let baseHeight: number;

  if (terrainPotential > 0) {
    const upliftNoise = sphereFbm(offsetVec(dir, 0.3, 0.9, -1.2), seed, 6.2, 2);
    const shoulderNoise = sphereFbm(offsetVec(dir, -0.9, 0.5, 1.0), seed, 3.8, 2);

    const continentalCore = 0.04 + Math.pow(terrainPotential, 1.12) * 0.86;
    const tectonicLift = upliftNoise * 0.008 * plateAmp;
    const shoulder = Math.max(0, 0.10 - terrainPotential) * shoulderNoise * 0.22;

    baseHeight = continentalCore + tectonicLift - shoulder;
  } else {
    const oceanDepthSignal = -terrainPotential;
    const abyssNoise = sphereFbm(offsetVec(dir, 1.1, -1.5, 0.3), seed, 2.0, 2);
    const trenchNoise = sphereFbm(offsetVec(dir, -1.3, 0.4, 1.4), seed, 5.0, 2);

    baseHeight =
      -0.14 -
      Math.pow(oceanDepthSignal, 1.05) * 0.96 +
      abyssNoise * 0.025 -
      trenchNoise * 0.035;
  }

  return {
    dir,
    plateId: plateSeed.id,
    plateType: plateSeed.type,
    baseHeight: clamp(baseHeight, -1.5, 1.5),
  };
}

function createBackboneSeeds(count: number, rng: () => number): BackboneSeed[] {
  const out: BackboneSeed[] = [];

  for (let i = 0; i < count; i++) {
    const anchorCount = clampInt(3 + Math.floor(rng() * 3), 3, 5);
    const start = randomSpherePointAvoidingExtremePoles(rng, 0.78);
    const anchors: Vec3[] = [start];
    let prev = start;

    for (let j = 1; j < anchorCount; j++) {
      const next = normalize3([
        prev[0] + (rng() * 2 - 1) * 0.55,
        prev[1] + (rng() * 2 - 1) * 0.25,
        prev[2] + (rng() * 2 - 1) * 0.55,
      ]);
      anchors.push([next[0], clamp(next[1], -0.80, 0.80), next[2]] as Vec3);
      prev = anchors[anchors.length - 1];
    }

    out.push({
      anchors,
      width: lerp(0.08, 0.16, rng()),
      strength: lerp(0.92, 1.18, rng()),
    });
  }

  return out;
}

function createRiftSeeds(count: number, rng: () => number): RiftSeed[] {
  const out: RiftSeed[] = [];

  for (let i = 0; i < count; i++) {
    const anchorCount = clampInt(2 + Math.floor(rng() * 3), 2, 4);
    const start = randomSpherePoint(rng);
    const anchors: Vec3[] = [start];
    let prev = start;

    for (let j = 1; j < anchorCount; j++) {
      const next = normalize3([
        prev[0] + (rng() * 2 - 1) * 0.45,
        prev[1] + (rng() * 2 - 1) * 0.18,
        prev[2] + (rng() * 2 - 1) * 0.45,
      ]);
      anchors.push([next[0], clamp(next[1], -0.86, 0.86), next[2]] as Vec3);
      prev = anchors[anchors.length - 1];
    }

    out.push({
      anchors,
      width: lerp(0.05, 0.11, rng()),
      strength: lerp(0.60, 0.95, rng()),
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
      strength: lerp(0.25, 0.55, rng()),
    });
  }
  return out;
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

function minDistanceToPolylineOnSphere(dir: Vec3, anchors: Vec3[]): number {
  let best = 1;

  for (let i = 0; i < anchors.length; i++) {
    const d = greatCircleDistance01(dir, anchors[i]);
    if (d < best) best = d;
  }

  for (let i = 0; i < anchors.length - 1; i++) {
    const mid = normalize3([
      (anchors[i][0] + anchors[i + 1][0]) * 0.5,
      (anchors[i][1] + anchors[i + 1][1]) * 0.5,
      (anchors[i][2] + anchors[i + 1][2]) * 0.5,
    ]);
    const d = greatCircleDistance01(dir, mid);
    if (d < best) best = d;
  }

  return best;
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
      const cell = cells[idx];

      if (cell.baseHeight < seaLevel) {
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