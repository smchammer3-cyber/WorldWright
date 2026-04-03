// ========================================================
// WORLDWRIGHT -- WORLD GENERATOR (V1.3 PHASE 2 CONTINENT SHAPE CORRECTION)
// File: src/core/worldGenerator/index.ts
//
// Goals:
// - preserve pole-safe topology fixes
// - improve macro continent silhouettes
// - reduce slab/wedge ocean cuts
// - add believable continental breakup and coastline structure
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
  elongation: number;
  drift: Vec3;
};

type BasinSeed = {
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

  const globalSeaLevel = lerp(-0.10, 0.12, clamp01(params.seaLevel / 100));
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
  const plateCount = Math.max(targetContinentCount + 4, Math.round(targetContinentCount * 2.5));

  const continentSeeds = createContinentSeeds(targetContinentCount, rng);
  const basinSeeds = createBasinSeeds(targetContinentCount + 2, rng);
  const plateSeeds = createPlateSeeds(plateCount, targetContinentCount, rng);

  const plates: Plate[] = plateSeeds.map((p) => ({
    id: p.id,
    type: p.type,
    velocity: p.velocity,
  }));

  const northPoleSample = buildPoleSample(
    90,
    continentSeeds,
    basinSeeds,
    plateSeeds,
    seedUint,
    globalSeaLevel,
    plateAmp
  );
  const southPoleSample = buildPoleSample(
    -90,
    continentSeeds,
    basinSeeds,
    plateSeeds,
    seedUint,
    globalSeaLevel,
    plateAmp
  );

  // ----------------------------------------------------
  // PASS 1: Macro landmass + plate assignment on sphere
  // ----------------------------------------------------
  for (let r = 0; r < height; r++) {
    const rowPoleMode = getPoleRowMode(r, height);

    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];

      let lat: number;
      let lon: number;
      let dir: Vec3;
      let poleProximity: number;

      if (rowPoleMode === 'NORTH_CAP') {
        lat = 90;
        lon = 0;
        dir = northPoleSample.dir;
        poleProximity = 1;
      } else if (rowPoleMode === 'SOUTH_CAP') {
        lat = -90;
        lon = 0;
        dir = southPoleSample.dir;
        poleProximity = 1;
      } else {
        lat = 90 - ((r + 0.5) / height) * 180;
        lon = ((c + 0.5) / width) * 360 - 180;
        dir = latLonToUnitVector(lat, lon);
        const absLat01 = Math.abs(lat) / 90;
        poleProximity = smoothstep(0.80, 1.0, absLat01);
      }

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

      const plateSeed = findNearestPlateSeed(dir, plateSeeds);
      cell.plateId = plateSeed.id;
      cell.plateType = plateSeed.type;

      // Primary continent support
      let continentField = 0;
      for (const seed of continentSeeds) {
        const primary = greatCircleDistance01(dir, seed.dir);
        const driftedDir = normalize3([
          dir[0] + seed.drift[0] * 0.18,
          dir[1] + seed.drift[1] * 0.18,
          dir[2] + seed.drift[2] * 0.18,
        ]);
        const secondary = greatCircleDistance01(driftedDir, seed.dir);

        const core = smoothstep(seed.radius, 0.0, primary) * seed.strength;
        const lobe = smoothstep(seed.radius * seed.elongation, 0.0, secondary) * seed.strength * 0.65;

        continentField = Math.max(continentField, core + lobe);
      }

      // Ocean basin carving
      let basinField = 0;
      for (const basin of basinSeeds) {
        const d = greatCircleDistance01(dir, basin.dir);
        const carve = smoothstep(basin.radius, 0.0, d) * basin.strength;
        if (carve > basinField) basinField = carve;
      }

      // Multi-scale shape breakup
      const macroNoise = sphereFbm(dir, seedUint, 0.95, 4);
      const continentalNoise = sphereFbm(offsetVec(dir, 1.7, -0.4, 0.8), seedUint, 1.9, 3);
      const breakupNoise = sphereFbm(offsetVec(dir, -0.8, 1.1, -1.6), seedUint, 3.8, 3);
      const coastNoise = sphereFbm(offsetVec(dir, 0.5, 1.9, 0.2), seedUint, 7.2, 2);

      const polarDetailDamp = lerp(1.0, 0.10, poleProximity);

      const continentalBias = plateSeed.type === PlateType.CONTINENTAL ? 0.11 : -0.08;

      // Important: use additive + subtractive breakup, not just smooth blobs
      const landSignal =
        continentField * 0.86 +
        macroNoise * 0.14 +
        continentalNoise * 0.16 +
        breakupNoise * 0.12 -
        basinField * 0.38 +
        coastNoise * 0.05 * polarDetailDamp;

      const polarLandPenalty = poleProximity * 0.16;

      const terrainPotential =
        landSignal + continentalBias - globalSeaLevel - polarLandPenalty;

      if (terrainPotential > 0) {
        const upliftNoise = sphereFbm(offsetVec(dir, 0.4, 0.9, -1.3), seedUint, 6.5, 2);
        const shelfNoise = sphereFbm(offsetVec(dir, -1.2, 0.7, 1.0), seedUint, 4.4, 2);

        // Sharper continental shoulder + coastal shelf variation
        const raised = 0.05 + Math.pow(terrainPotential, 1.18) * 0.88;
        const tectonicLift = upliftNoise * 0.08 * plateAmp * polarDetailDamp;
        const shelfCut = Math.max(0, 0.06 - terrainPotential) * shelfNoise * 0.25;

        cell.baseHeight = raised + tectonicLift - shelfCut;
      } else {
        const oceanDepthSignal = -terrainPotential;
        const abyssNoise = sphereFbm(offsetVec(dir, 1.1, -1.7, 0.2), seedUint, 2.2, 2);
        const trenchNoise = sphereFbm(offsetVec(dir, -1.4, 0.4, 1.6), seedUint, 5.0, 2);

        cell.baseHeight =
          -0.16 -
          Math.pow(oceanDepthSignal, 1.08) * 0.94 +
          abyssNoise * 0.03 -
          trenchNoise * 0.03;
      }

      cell.baseHeight = clamp(cell.baseHeight, -1.5, 1.5);
      cell.boundaryType = BoundaryType.NONE;
    }
  }

  blendCapAdjacentRows(cells, width, height, 1, northPoleSample.baseHeight, southPoleSample.baseHeight);
  blendCapAdjacentRows(cells, width, height, 2, northPoleSample.baseHeight, southPoleSample.baseHeight);

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

      const isExactPoleRow = r === 0 || r === height - 1;
      if (isExactPoleRow) {
        cell.boundaryType = BoundaryType.NONE;
        cell.upliftRate = 0;
        cell.volcanicActivity = 0;
        continue;
      }

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

      const lat = 90 - ((r + 0.5) / height) * 180;
      const poleProximity = smoothstep(72 / 90, 1.0, Math.abs(lat) / 90);

      const boundaryStrength =
        cell.boundaryType === BoundaryType.CONVERGENT
          ? 0.09
          : cell.boundaryType === BoundaryType.DIVERGENT
          ? -0.045
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
  // PASS 3: Erosion / coastline shaping
  // ----------------------------------------------------
  const smoothingPasses = Math.max(2, Math.round(lerp(2, 7, smoothness)));
  const smoothingStrength = lerp(0.14, 0.52, smoothness);

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
        const localSmooth = lerp(smoothingStrength, smoothingStrength * 0.46, poleProximity);

        // Coast-preserving erosion: don’t over-round shorelines
        const nearSea = Math.abs(cell.baseHeight - globalSeaLevel) < 0.09;
        const coastPreserve = nearSea ? 0.58 : 1.0;

        const upliftDelta = cell.upliftRate * 0.004;
        const noiseBreakup = (rng() - 0.5) * 0.012 * (1 - smoothness) * (1 - poleProximity * 0.75);

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
        r === 0 || r === height - 1 ? 0 : sphereFbm(offsetVec(dir, 0.7, 1.6, -1.1), seedUint, 3.4, 3);
      const rainNoise =
        r === 0 || r === height - 1 ? 0 : sphereFbm(offsetVec(dir, -1.2, 0.5, 1.8), seedUint, 3.0, 3);

      const coastBoost = coastalMask[idx] * 0.16;
      const elevAboveSea = Math.max(0, cell.baseHeight - globalSeaLevel);
      const elevCooling = elevAboveSea * 0.32;
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
          elevAboveSea * 0.10
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
  continentSeeds: ContinentSeed[],
  basinSeeds: BasinSeed[],
  plateSeeds: PlateSeed[],
  seed: number,
  globalSeaLevel: number,
  plateAmp: number
) {
  const dir = latLonToUnitVector(lat, 0);
  const plateSeed = findNearestPlateSeed(dir, plateSeeds);

  let continentField = 0;
  for (const seedDef of continentSeeds) {
    const primary = greatCircleDistance01(dir, seedDef.dir);
    const driftedDir = normalize3([
      dir[0] + seedDef.drift[0] * 0.18,
      dir[1] + seedDef.drift[1] * 0.18,
      dir[2] + seedDef.drift[2] * 0.18,
    ]);
    const secondary = greatCircleDistance01(driftedDir, seedDef.dir);

    const core = smoothstep(seedDef.radius, 0.0, primary) * seedDef.strength;
    const lobe =
      smoothstep(seedDef.radius * seedDef.elongation, 0.0, secondary) *
      seedDef.strength *
      0.65;

    continentField = Math.max(continentField, core + lobe);
  }

  let basinField = 0;
  for (const basin of basinSeeds) {
    const d = greatCircleDistance01(dir, basin.dir);
    const carve = smoothstep(basin.radius, 0.0, d) * basin.strength;
    if (carve > basinField) basinField = carve;
  }

  const macroNoise = sphereFbm(dir, seed, 0.95, 4);
  const continentalNoise = sphereFbm(offsetVec(dir, 1.7, -0.4, 0.8), seed, 1.9, 3);
  const breakupNoise = sphereFbm(offsetVec(dir, -0.8, 1.1, -1.6), seed, 3.8, 3);
  const coastNoise = sphereFbm(offsetVec(dir, 0.5, 1.9, 0.2), seed, 7.2, 2);

  const polarDetailDamp = 0.08;
  const continentalBias = plateSeed.type === PlateType.CONTINENTAL ? 0.11 : -0.08;

  const landSignal =
    continentField * 0.86 +
    macroNoise * 0.14 +
    continentalNoise * 0.16 +
    breakupNoise * 0.12 -
    basinField * 0.38 +
    coastNoise * 0.05 * polarDetailDamp;

  const polarLandPenalty = 0.16;
  const terrainPotential =
    landSignal + continentalBias - globalSeaLevel - polarLandPenalty;

  let baseHeight: number;

  if (terrainPotential > 0) {
    const upliftNoise = sphereFbm(offsetVec(dir, 0.4, 0.9, -1.3), seed, 6.5, 2);
    const shelfNoise = sphereFbm(offsetVec(dir, -1.2, 0.7, 1.0), seed, 4.4, 2);
    const raised = 0.05 + Math.pow(terrainPotential, 1.18) * 0.88;
    const tectonicLift = upliftNoise * 0.08 * plateAmp * polarDetailDamp;
    const shelfCut = Math.max(0, 0.06 - terrainPotential) * shelfNoise * 0.25;
    baseHeight = raised + tectonicLift - shelfCut;
  } else {
    const oceanDepthSignal = -terrainPotential;
    const abyssNoise = sphereFbm(offsetVec(dir, 1.1, -1.7, 0.2), seed, 2.2, 2);
    const trenchNoise = sphereFbm(offsetVec(dir, -1.4, 0.4, 1.6), seed, 5.0, 2);
    baseHeight =
      -0.16 -
      Math.pow(oceanDepthSignal, 1.08) * 0.94 +
      abyssNoise * 0.03 -
      trenchNoise * 0.03;
  }

  return {
    dir,
    plateId: plateSeed.id,
    plateType: plateSeed.type,
    baseHeight: clamp(baseHeight, -1.5, 1.5),
  };
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

function createContinentSeeds(count: number, rng: () => number): ContinentSeed[] {
  const seeds: ContinentSeed[] = [];

  for (let i = 0; i < count; i++) {
    const dir = randomSpherePointAvoidingExtremePoles(rng, 0.80);
    const drift = randomSpherePoint(rng);
    seeds.push({
      dir,
      strength: lerp(0.82, 1.18, rng()),
      radius: lerp(0.16, 0.28, rng()),
      elongation: lerp(1.15, 1.65, rng()),
      drift,
    });
  }

  return seeds;
}

function createBasinSeeds(count: number, rng: () => number): BasinSeed[] {
  const seeds: BasinSeed[] = [];
  for (let i = 0; i < count; i++) {
    seeds.push({
      dir: randomSpherePoint(rng),
      strength: lerp(0.65, 1.00, rng()),
      radius: lerp(0.12, 0.24, rng()),
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