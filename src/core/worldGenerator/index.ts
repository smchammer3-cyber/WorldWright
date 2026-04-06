// ========================================================
// WORLDWRIGHT -- WORLD GENERATOR (V1.3 MACRO SILHOUETTE LEVERAGE PASS)
// File: src/core/worldGenerator/index.ts
//
// PURPOSE OF THIS BUILD:
// - keep worldGenerator as the sole owner of generation
// - follow blueprint order: tectonics -> terrain -> climate -> biomes -> hydrology
// - strengthen tectonic ownership of broad land silhouette
// - let land fraction be a bias, not a hard normalization lock
// - reduce cleanup passes from re-gluing macro continents too aggressively
// - preserve polar-cap continuation behavior
// - preserve current debug stages
// ========================================================

import {
  WorldBrain,
  Cell,
  River,
  SurfaceType,
  createEmptyCell,
  PlateType,
  BoundaryType,
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
type DebugStage = 'FINAL' | 'LANDFIELD' | 'MASK_PRE' | 'MASK_POST' | 'HEIGHT';

const DEBUG_STAGE: DebugStage = 'MASK_PRE';
const DEBUG_LOCK_SEED = true;
const DEBUG_FIXED_SEED: number | string = 123456;

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

  const effectiveSeed = DEBUG_LOCK_SEED ? DEBUG_FIXED_SEED : params.seed;
  const seedUint = seedToUint32(effectiveSeed);
  const rng = mulberry32(seedUint);
  const nowIso = new Date().toISOString();

  const age01 = clamp01(params.planetAge / 100);
  const erosion01 = clamp01(params.erosionIntensity / 100);
  const plateActivity01 = clamp01(params.plateActivity / 100);

  // Clean separation:
  // - age controls terrain maturity / relief character
  // - erosion controls smoothing passes
  const terrainMaturity = age01;
  const terrainSharpness = lerp(1.10, 0.82, terrainMaturity);
  const erosionPasses = Math.max(1, Math.round(lerp(1, 6, erosion01)));
  const erosionStrength = lerp(0.05, 0.20, erosion01);

  const climateVar01 = clamp01(params.climateVar / 100);
  const tilt01 = clamp01(params.axisTilt / 100);
  const moisture01 = clamp01(params.moistureLevel / 100);
  const tempOffset01 = (params.temperatureOffset / 100) * 0.22;

  const plateAmp = lerp(0.30, 1.35, plateActivity01);
  const seaBias = clamp01(params.seaLevel / 100);
  const globalSeaLevel = lerp(-0.10, 0.14, seaBias);

  const targetContinentCount = clampInt(params.continentCount, 1, 12);
  const plateCount = Math.max(targetContinentCount + 5, Math.round(targetContinentCount * 2.5));

  const cells: Cell[] = new Array(width * height);
  for (let i = 0; i < cells.length; i++) cells[i] = createEmptyCell(i);

  // ----------------------------------------------------
  // STEP 1: tectonics base influence
  // ----------------------------------------------------
  const tectonics = buildTectonicsField(
    width,
    height,
    cells,
    plateCount,
    rng,
    {
      plateActivity: params.plateActivity,
      continentCount: params.continentCount,
    }
  );

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

  // ----------------------------------------------------
  // STEP 2: broad land plausibility (tectonics-led hybrid)
  // ----------------------------------------------------
  const targetLandFraction = computeTargetLandFraction(
    params.styleMode,
    seaBias,
    targetContinentCount
  );

  const landField = buildLandField(
    width,
    height,
    seedUint,
    rng,
    fields,
    params.styleMode,
    plateActivity01
  );

  if (DEBUG_STAGE === 'LANDFIELD') {
    const debugCells = cloneCells(cells);

    let minV = Number.POSITIVE_INFINITY;
    let maxV = Number.NEGATIVE_INFINITY;
    for (let r = 1; r < height - 1; r++) {
      for (let c = 0; c < width; c++) {
        const v = landField[r * width + c];
        if (v < minV) minV = v;
        if (v > maxV) maxV = v;
      }
    }
    const range = Math.max(1e-9, maxV - minV);

    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        const idx = r * width + c;
        const v = landField[idx];
        const t = clamp01((v - minV) / range);
        debugCells[idx].baseHeight = lerp(-0.6, 0.6, t);
      }
    }

    return buildDebugWorld({
      width,
      height,
      seaLevel: 0,
      cells: debugCells,
      plates,
      nowIso,
      params,
      effectiveSeed,
      styleMode: params.styleMode,
    });
  }

  const threshold = chooseThresholdForLandFraction(
    landField,
    width,
    height,
    targetLandFraction,
    rng
  );
  let landMask = thresholdField(landField, width, height, threshold);

  if (DEBUG_STAGE === 'MASK_PRE') {
    const debugCells = cloneCells(cells);
    for (let i = 0; i < debugCells.length; i++) {
      debugCells[i].baseHeight = landMask[i] === 1 ? 0.35 : -0.35;
      debugCells[i].temperature = landMask[i] === 1 ? 0.55 : 0.35;
      debugCells[i].rainfall = landMask[i] === 1 ? 0.45 : 0.55;
      debugCells[i].snowCover = 0;
    }

    return buildDebugWorld({
      width,
      height,
      seaLevel: 0,
      cells: debugCells,
      plates,
      nowIso,
      params,
      effectiveSeed,
      styleMode: params.styleMode,
    });
  }

  // ----------------------------------------------------
  // STEP 3: light geometric cleanup only
  // ----------------------------------------------------
  landMask = removeTinyIslandsAndExpandCoasts(landMask, width, height, rng);
  landMask = mergeNearbyLandmasses(landMask, width, height, rng, targetContinentCount);
  landMask = enforceLandCoverageTarget(landMask, width, height, rng, targetLandFraction);

  if (DEBUG_STAGE === 'MASK_POST') {
    const debugCells = cloneCells(cells);
    for (let i = 0; i < debugCells.length; i++) {
      debugCells[i].baseHeight = landMask[i] === 1 ? 0.35 : -0.35;
      debugCells[i].temperature = landMask[i] === 1 ? 0.55 : 0.35;
      debugCells[i].rainfall = landMask[i] === 1 ? 0.45 : 0.55;
      debugCells[i].snowCover = 0;
    }

    return buildDebugWorld({
      width,
      height,
      seaLevel: 0,
      cells: debugCells,
      plates,
      nowIso,
      params,
      effectiveSeed,
      styleMode: params.styleMode,
    });
  }

  // ----------------------------------------------------
  // STEP 4: convert silhouette + tectonics into terrain
  // ----------------------------------------------------
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];
      const tect = fields[idx];

      const lat = 90 - ((r + 0.5) / height) * 180;
      const lon = ((c + 0.5) / width) * 360 - 180;
      const dir = latLonToUnitVector(lat, lon);

      const absLat01 = Math.abs(lat) / 90;
      const capDamp = Math.pow(absLat01, 1.5);

      const coastalFactor = computeLocalLandFraction(landMask, width, height, r, c, 2);
      const coastBand = 1 - Math.abs(coastalFactor - 0.5) * 2;
      const inlandFactor = clamp01((coastalFactor - 0.42) / 0.58);
      const isLand = landMask[idx] === 1;

      const largeA = sphereFbm(offsetVec(dir, 1.1, -0.2, 0.7), seedUint, 0.70, 4);
      const largeB = sphereFbm(offsetVec(dir, -0.9, 1.3, -0.5), seedUint, 1.35, 4);
      const medium = sphereFbm(offsetVec(dir, 0.3, 1.7, 0.1), seedUint, 3.2, 3);
      const breakup = sphereFbm(offsetVec(dir, -1.2, -0.4, 1.0), seedUint, 7.5, 2);
      const detailNoise = sphereFbm(offsetVec(dir, -0.8, 1.0, -0.4), seedUint, 4.2, 3);
      const oceanNoise = sphereFbm(offsetVec(dir, -1.1, -0.7, 0.6), seedUint, 2.0, 2);

      const macroTerrain =
        (largeA * 0.10 + largeB * 0.08 + medium * 0.03 + breakup * 0.012) *
        terrainSharpness;

      const convergentRelief =
        tect.boundaryType === BoundaryType.CONVERGENT
          ? lerp(0.020, 0.120, tect.boundaryStrength) * (1 - tect.distanceToBoundary * 0.8)
          : 0;

      const divergentRelief =
        tect.boundaryType === BoundaryType.DIVERGENT
          ? lerp(-0.060, 0.012, tect.boundaryStrength) * (1 - tect.distanceToBoundary * 0.75)
          : 0;

      const transformRelief =
        tect.boundaryType === BoundaryType.TRANSFORM
          ? lerp(-0.004, 0.014, tect.boundaryStrength)
          : 0;

      const continentalRefine =
        tect.plateType === PlateType.CONTINENTAL
          ? lerp(0.016, 0.100, 1 - tect.distanceToBoundary)
          : lerp(-0.045, 0.0, 1 - tect.distanceToBoundary);

      if (isLand) {
        let h =
          0.02 +
          inlandFactor * lerp(0.58, 0.70, 1 - terrainMaturity) +
          macroTerrain +
          detailNoise * 0.04 * (1 - capDamp * 0.3) * terrainSharpness +
          continentalRefine +
          convergentRelief +
          divergentRelief * 0.22 +
          transformRelief * 0.30 -
          globalSeaLevel;

        h -= coastBand * Math.max(0, 0.05 - detailNoise * 0.04);
        cell.baseHeight = clamp(h, -1.4, 1.6);
      } else {
        let h =
          -0.16 -
          (0.18 + (1 - coastalFactor) * 0.56) +
          macroTerrain * 0.10 +
          oceanNoise * 0.04 * (1 - capDamp * 0.2) +
          continentalRefine * 0.08 +
          divergentRelief +
          transformRelief * 0.10 -
          globalSeaLevel * 0.15;

        cell.baseHeight = clamp(h, -1.7, 0.35);
      }
    }
  }

  // ----------------------------------------------------
  // STEP 5: tectonic moderation + smoothing
  // ----------------------------------------------------
  applyHybridTectonicInfluence(cells, fields, plateAmp);

  for (let pass = 0; pass < erosionPasses; pass++) {
    const nextHeights = new Array<number>(cells.length);

    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        const idx = r * width + c;
        const cell = cells[idx];

        const north = Math.max(0, r - 1);
        const south = Math.min(height - 1, r + 1);
        const west = (c - 1 + width) % width;
        const east = (c + 1) % width;

        const avg =
          (cells[north * width + c].baseHeight +
            cells[south * width + c].baseHeight +
            cells[r * width + west].baseHeight +
            cells[r * width + east].baseHeight) / 4;

        const lat = 90 - ((r + 0.5) / height) * 180;
        const absLat01 = Math.abs(lat) / 90;
        const capDamp = Math.pow(absLat01, 1.5);

        const nearSea = Math.abs(cell.baseHeight - globalSeaLevel) < 0.12;
        const coastPreserve = nearSea ? 0.36 : 1.0;

        const localSmooth = lerp(erosionStrength, erosionStrength * 0.98, capDamp);
        const noiseBreakup =
          (rng() - 0.5) * 0.0045 * (1 - erosion01) * (1 - capDamp * 0.05);

        nextHeights[idx] = clamp(
          cell.baseHeight + (avg - cell.baseHeight) * localSmooth * coastPreserve + noiseBreakup,
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
  // STEP 6: BLENDED POLAR CAP CONTINUATION
  // ----------------------------------------------------
  continuePolarCapsBlended(cells, width, height);

  if (DEBUG_STAGE === 'HEIGHT') {
    return buildDebugWorld({
      width,
      height,
      seaLevel: globalSeaLevel,
      cells: cloneCells(cells),
      plates,
      nowIso,
      params,
      effectiveSeed,
      styleMode: params.styleMode,
    });
  }

  // ----------------------------------------------------
  // STEP 7: climate seed fields
  // ----------------------------------------------------
  const coastalMask = computeCoastalMask(cells, width, height, globalSeaLevel);

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const cell = cells[idx];
      const tect = fields[idx];

      const lat =
        r === 0 ? 90 : r === height - 1 ? -90 : 90 - ((r + 0.5) / height) * 180;
      const lon =
        r === 0 || r === height - 1 ? 0 : ((c + 0.5) / width) * 360 - 180;
      const dir = latLonToUnitVector(lat, lon);

      const absLat01 = Math.abs(lat) / 90;
      const poleProximity = smoothstep(0.86, 1.0, absLat01);

      const equatorWarmth = Math.pow(1 - absLat01, lerp(0.85, 1.15, tilt01));
      const tempNoise =
        r === 0 || r === height - 1
          ? 0
          : sphereFbm(offsetVec(dir, 0.7, 1.6, -1.1), seedUint, 3.0, 3);
      const rainNoise =
        r === 0 || r === height - 1
          ? 0
          : sphereFbm(offsetVec(dir, -1.2, 0.5, 1.8), seedUint, 2.8, 3);

      const coastBoost = coastalMask[idx] * 0.15;
      const elevAboveSea = Math.max(0, cell.baseHeight - globalSeaLevel);
      const elevCooling = elevAboveSea * 0.28;
      const polarCooling = poleProximity * 0.13;
      const tectonicMoisture =
        tect.boundaryType === BoundaryType.CONVERGENT
          ? 0.03
          : tect.boundaryType === BoundaryType.DIVERGENT
            ? -0.02
            : 0;

      cell.temperature = clamp01(
        0.16 +
          equatorWarmth * 0.68 +
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
      cell.surfaceType =
        cell.plateType === PlateType.OCEANIC ? SurfaceType.ALLUVIAL : SurfaceType.ROCK;

      cell.flowDirection = null;
      cell.flowAccumulation = 0;
      cell.basinId = null;
      cell.snowCover = 0;
      cell.isWater = cell.baseHeight < globalSeaLevel;
    }
  }

  // ----------------------------------------------------
  // STEP 8: initial hydrology seeds
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
      seed: String(effectiveSeed),
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
      seed: effectiveSeed,
      seaLevel: params.seaLevel,
    },
  };

  return world;
}

// ========================================================
// DEBUG WORLD HELPERS
// ========================================================

function buildDebugWorld(args: {
  width: number;
  height: number;
  seaLevel: number;
  cells: Cell[];
  plates: any[];
  nowIso: string;
  params: GeneratorParams;
  effectiveSeed: string | number;
  styleMode: GeneratorParams['styleMode'];
}): WorldBrain {
  const { width, height, seaLevel, cells, plates, nowIso, params, effectiveSeed, styleMode } = args;

  for (let i = 0; i < cells.length; i++) {
    cells[i].isWater = cells[i].baseHeight < seaLevel;
    cells[i].baseBiomeId = cells[i].isWater ? 0 : 5;
    cells[i].editBiomeId = cells[i].baseBiomeId;
    cells[i].flowDirection = null;
    cells[i].flowAccumulation = 0;
    cells[i].basinId = null;
  }

  return {
    gridWidth: width,
    gridHeight: height,
    seaLevel,
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
      id: `w_debug_${styleMode}_${width}x${height}_${seedToUint32(effectiveSeed)}`,
      name: 'Debug World',
      seed: String(effectiveSeed),
      schemaVersion: 'v3',
      version: 'v1.3-debug',
      styleMode,
      gridWidth: width,
      gridHeight: height,
      createdAt: nowIso,
      updatedAt: nowIso,
      seaLevel,
    },
    parameters: {
      ...params,
      seed: effectiveSeed,
    },
  };
}

function cloneCells(cells: Cell[]): Cell[] {
  return cells.map((cell) => ({ ...cell }));
}

// ========================================================
// LAND FIELD + THRESHOLDING
// ========================================================

function computeTargetLandFraction(
  styleMode: GeneratorParams['styleMode'],
  seaBias: number,
  continentCount: number
): number {
  const base = lerp(0.46, 0.24, seaBias);
  const continentBonus = clamp01((continentCount - 4) / 8) * 0.04;

  let styleAdjust = 0;
  if (styleMode === 'FANTASY') styleAdjust = 0.05;
  if (styleMode === 'STYLIZED') styleAdjust = 0.02;
  if (styleMode === 'ALIEN') styleAdjust = 0.01;

  return clamp(base + continentBonus + styleAdjust, 0.20, 0.50);
}

function buildLandField(
  width: number,
  height: number,
  seedUint: number,
  rng: () => number,
  fields: TectonicsField[],
  styleMode: GeneratorParams['styleMode'],
  plateActivity01: number
): Float32Array {
  const field = new Float32Array(width * height);

  for (let r = 1; r < height - 1; r++) {
    const lat = 90 - ((r + 0.5) / height) * 180;
    const absLat01 = Math.abs(lat) / 90;
    const poleFade = smoothstep(0.90, 1.0, absLat01);

    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const tect = fields[idx];
      const lon = ((c + 0.5) / width) * 360 - 180;
      const dir = latLonToUnitVector(lat, lon);

      const largeA = sphereFbm(offsetVec(dir, 1.1, -0.2, 0.7), seedUint, 0.70, 4);
      const largeB = sphereFbm(offsetVec(dir, -0.9, 1.3, -0.5), seedUint, 1.35, 4);
      const medium = sphereFbm(offsetVec(dir, 0.3, 1.7, 0.1), seedUint, 3.2, 3);
      const breakup = sphereFbm(offsetVec(dir, -1.2, -0.4, 1.0), seedUint, 7.5, 2);

      const noiseRefine =
        largeA * 0.16 +
        largeB * 0.12 +
        medium * 0.05 +
        breakup * 0.02;

      let tectonicStructure = 0;

      if (tect.plateType === PlateType.CONTINENTAL) {
        tectonicStructure += lerp(0.09, 0.18, plateActivity01);
      } else {
        tectonicStructure -= lerp(0.08, 0.16, plateActivity01);
      }

      if (tect.boundaryType === BoundaryType.CONVERGENT) {
        tectonicStructure += lerp(0.08, 0.22, plateActivity01) * tect.boundaryStrength;
      } else if (tect.boundaryType === BoundaryType.DIVERGENT) {
        tectonicStructure -= lerp(0.06, 0.16, plateActivity01) * tect.boundaryStrength;
      } else if (tect.boundaryType === BoundaryType.TRANSFORM) {
        tectonicStructure += lerp(0.010, 0.028, plateActivity01) * tect.boundaryStrength;
      } else {
        tectonicStructure +=
          tect.plateType === PlateType.CONTINENTAL
            ? lerp(0.05, 0.12, 1 - tect.distanceToBoundary)
            : lerp(-0.08, -0.02, 1 - tect.distanceToBoundary);
      }

      let value =
        tectonicStructure * (1 - poleFade * 0.65) +
        noiseRefine;

      if (styleMode === 'FANTASY') value += 0.03;
      if (styleMode === 'STYLIZED') value += 0.02;
      if (styleMode === 'ALIEN') value += (rng() - 0.5) * 0.03;

      value += (rng() - 0.5) * 0.008;
      field[idx] = value;
    }
  }

  return field;
}

function chooseThresholdForLandFraction(
  field: Float32Array,
  width: number,
  height: number,
  targetFraction: number,
  rng: () => number
): number {
  const values: number[] = [];
  for (let r = 1; r < height - 1; r++) {
    for (let c = 0; c < width; c++) {
      values.push(field[r * width + c]);
    }
  }

  values.sort((a, b) => a - b);

  const loosen = 0.035 + rng() * 0.02;
  const biasedTarget = clamp(targetFraction + (rng() - 0.5) * loosen, 0.18, 0.54);

  const k = clampInt(
    Math.floor((1 - biasedTarget) * (values.length - 1)),
    0,
    values.length - 1
  );

  return values[k];
}

function thresholdField(
  field: Float32Array,
  width: number,
  height: number,
  threshold: number
): Uint8Array {
  const mask = new Uint8Array(width * height);

  for (let r = 1; r < height - 1; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      mask[idx] = field[idx] >= threshold ? 1 : 0;
    }
  }

  return mask;
}

// ========================================================
// CONNECTED COMPONENT CLEANUP / MERGE
// ========================================================

function removeTinyIslandsAndExpandCoasts(
  mask: Uint8Array,
  width: number,
  height: number,
  rng: () => number
): Uint8Array {
  const next = new Uint8Array(mask);

  const components = getLandComponents(mask, width, height);
  const minKeepSize = Math.max(12, Math.floor((width * height) * 0.0008));

  for (const comp of components) {
    if (comp.length < minKeepSize) {
      for (const idx of comp) next[idx] = 0;
    }
  }

  for (let r = 1; r < height - 1; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      if (next[idx] === 1) continue;

      const landFrac = computeLocalLandFraction(next, width, height, r, c, 1);
      if (landFrac > 0.62 && rng() < 0.14) next[idx] = 1;
    }
  }

  return next;
}

function mergeNearbyLandmasses(
  mask: Uint8Array,
  width: number,
  height: number,
  rng: () => number,
  targetContinentCount: number
): Uint8Array {
  let next = new Uint8Array(mask);

  for (let pass = 0; pass < 2; pass++) {
    const components = getLandComponents(next, width, height);
    if (components.length <= Math.max(targetContinentCount + 4, 6)) break;

    const bridge = new Uint8Array(next);

    for (let r = 1; r < height - 1; r++) {
      for (let c = 0; c < width; c++) {
        const idx = r * width + c;
        if (next[idx] === 1) continue;

        const landFracNear = computeLocalLandFraction(next, width, height, r, c, 2);
        const landFracFar = computeLocalLandFraction(next, width, height, r, c, 3);

        if (landFracNear > 0.30 && landFracFar > 0.46) {
          if (rng() < 0.08) bridge[idx] = 1;
        }
      }
    }

    next = bridge;
  }

  return next;
}

function enforceLandCoverageTarget(
  mask: Uint8Array,
  width: number,
  height: number,
  rng: () => number,
  targetFraction: number
): Uint8Array {
  let next = new Uint8Array(mask);

  function currentFraction(): number {
    let land = 0;
    let total = 0;
    for (let r = 1; r < height - 1; r++) {
      for (let c = 0; c < width; c++) {
        total++;
        if (next[r * width + c] === 1) land++;
      }
    }
    return total > 0 ? land / total : 0;
  }

  let fraction = currentFraction();
  let safety = 0;

  while (fraction < targetFraction - 0.05 && safety < 3) {
    const grow = new Uint8Array(next);

    for (let r = 1; r < height - 1; r++) {
      for (let c = 0; c < width; c++) {
        const idx = r * width + c;
        if (next[idx] === 1) continue;

        const landFrac = computeLocalLandFraction(next, width, height, r, c, 2);
        if (landFrac <= 0.34) continue;

        if (rng() < 0.08 + landFrac * 0.12) {
          grow[idx] = 1;
        }
      }
    }

    next = grow;
    fraction = currentFraction();
    safety++;
  }

  safety = 0;
  while (fraction > targetFraction + 0.06 && safety < 2) {
    const prune = new Uint8Array(next);

    for (let r = 1; r < height - 1; r++) {
      for (let c = 0; c < width; c++) {
        const idx = r * width + c;
        if (next[idx] === 0) continue;

        const landFrac = computeLocalLandFraction(next, width, height, r, c, 1);
        if (landFrac >= 0.40) continue;

        if (rng() < 0.12) prune[idx] = 0;
      }
    }

    next = prune;
    fraction = currentFraction();
    safety++;
  }

  return next;
}

function getLandComponents(
  mask: Uint8Array,
  width: number,
  height: number
): number[][] {
  const visited = new Uint8Array(mask.length);
  const components: number[][] = [];

  for (let r = 1; r < height - 1; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      if (mask[idx] === 0 || visited[idx]) continue;

      const comp: number[] = [];
      const queue: number[] = [idx];
      visited[idx] = 1;

      while (queue.length > 0) {
        const cur = queue.pop()!;
        comp.push(cur);

        const rr = Math.floor(cur / width);
        const cc = cur % width;

        for (let dr = -1; dr <= 1; dr++) {
          const nr = rr + dr;
          if (nr <= 0 || nr >= height - 1) continue;

          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nc = (cc + dc + width) % width;
            const ni = nr * width + nc;

            if (mask[ni] === 1 && !visited[ni]) {
              visited[ni] = 1;
              queue.push(ni);
            }
          }
        }
      }

      components.push(comp);
    }
  }

  components.sort((a, b) => b.length - a.length);
  return components;
}

// Kept for compatibility if needed elsewhere, but not used in generate pass.
function clearPoleRows(mask: Uint8Array, width: number, height: number): void {
  for (let c = 0; c < width; c++) {
    mask[c] = 0;
    mask[(height - 1) * width + c] = 0;
  }
}

// Kept for compatibility if needed elsewhere, but not used in generate pass.
function weakenNearPoleRows(
  mask: Uint8Array,
  width: number,
  height: number,
  rng: () => number
): void {
  const rows = [1, 2, height - 2, height - 3].filter((r) => r > 0 && r < height - 1);

  for (const r of rows) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      if (mask[idx] === 0) continue;

      const landFrac = computeLocalLandFraction(mask, width, height, r, c, 2);
      if (landFrac < 0.58 && rng() < 0.34) {
        mask[idx] = 0;
      }
    }
  }
}

// ========================================================
// TERRAIN / CLIMATE HELPERS
// ========================================================

function wrappedRowLocalMean(cells: Cell[], width: number, row: number, col: number, radius: number): number {
  let sum = 0;
  let count = 0;

  for (let dc = -radius; dc <= radius; dc++) {
    const cc = (col + dc + width) % width;
    sum += cells[row * width + cc].baseHeight;
    count++;
  }

  return count > 0 ? sum / count : cells[row * width + col].baseHeight;
}

function continuePolarCapsBlended(cells: Cell[], width: number, height: number): void {
  if (height < 6) return;

  const northRow0 = 0;
  const northRow1 = 1;
  const northRow2 = 2;
  const northRow3 = 3;

  const southRow0 = height - 1;
  const southRow1 = height - 2;
  const southRow2 = height - 3;
  const southRow3 = height - 4;

  const nextNorth0 = new Array<number>(width);
  const nextNorth1 = new Array<number>(width);
  const nextNorth2 = new Array<number>(width);

  const nextSouth0 = new Array<number>(width);
  const nextSouth1 = new Array<number>(width);
  const nextSouth2 = new Array<number>(width);

  for (let c = 0; c < width; c++) {
    const northMean1 = wrappedRowLocalMean(cells, width, northRow1, c, 2);
    const northMean2 = wrappedRowLocalMean(cells, width, northRow2, c, 2);
    const northMean3 = wrappedRowLocalMean(cells, width, northRow3, c, 3);

    const southMean1 = wrappedRowLocalMean(cells, width, southRow1, c, 2);
    const southMean2 = wrappedRowLocalMean(cells, width, southRow2, c, 2);
    const southMean3 = wrappedRowLocalMean(cells, width, southRow3, c, 3);

    const north2Base = cells[northRow2 * width + c].baseHeight;
    const north1Base = cells[northRow1 * width + c].baseHeight;

    const south2Base = cells[southRow2 * width + c].baseHeight;
    const south1Base = cells[southRow1 * width + c].baseHeight;

    nextNorth2[c] = lerp(north2Base, (northMean2 * 0.72 + northMean3 * 0.28), 0.18);
    nextSouth2[c] = lerp(south2Base, (southMean2 * 0.72 + southMean3 * 0.28), 0.18);

    nextNorth1[c] = lerp(north1Base, (northMean1 * 0.40 + northMean2 * 0.60), 0.42);
    nextSouth1[c] = lerp(south1Base, (southMean1 * 0.40 + southMean2 * 0.60), 0.42);

    nextNorth0[c] = lerp(nextNorth1[c], northMean1, 0.55);
    nextSouth0[c] = lerp(nextSouth1[c], southMean1, 0.55);
  }

  for (let c = 0; c < width; c++) {
    cells[northRow2 * width + c].baseHeight = nextNorth2[c];
    cells[northRow1 * width + c].baseHeight = nextNorth1[c];
    cells[northRow0 * width + c].baseHeight = nextNorth0[c];

    cells[southRow2 * width + c].baseHeight = nextSouth2[c];
    cells[southRow1 * width + c].baseHeight = nextSouth1[c];
    cells[southRow0 * width + c].baseHeight = nextSouth0[c];
  }
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

    if (tect.boundaryType === BoundaryType.CONVERGENT) {
      delta = lerp(0.014, 0.085, tect.boundaryStrength);
      if (tect.plateType === PlateType.CONTINENTAL) delta *= 1.16;
    } else if (tect.boundaryType === BoundaryType.DIVERGENT) {
      delta = lerp(-0.034, 0.008, tect.boundaryStrength);
    } else if (tect.boundaryType === BoundaryType.TRANSFORM) {
      delta = lerp(-0.004, 0.010, tect.boundaryStrength);
    } else {
      delta =
        tect.plateType === PlateType.CONTINENTAL
          ? lerp(0.003, 0.012, 1 - tect.distanceToBoundary)
          : lerp(-0.010, 0.004, 1 - tect.distanceToBoundary);
    }

    cell.baseHeight = clamp(cell.baseHeight + delta * plateAmp, -1.6, 1.7);
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

function computeLocalLandFraction(
  mask: Uint8Array,
  width: number,
  height: number,
  row: number,
  col: number,
  radius: number
): number {
  let land = 0;
  let total = 0;

  for (let dr = -radius; dr <= radius; dr++) {
    const rr = row + dr;
    if (rr < 0 || rr >= height) continue;

    for (let dc = -radius; dc <= radius; dc++) {
      const cc = (col + dc + width) % width;
      total++;
      if (mask[rr * width + cc] === 1) land++;
    }
  }

  return total > 0 ? land / total : 0;
}

function latLonToUnitVector(latDeg: number, lonDeg: number): Vec3 {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  const cosLat = Math.cos(lat);
  return [cosLat * Math.cos(lon), Math.sin(lat), cosLat * Math.sin(lon)];
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

function normalize3(v: Vec3): Vec3 {
  const len = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
}

function hash3(x: number, y: number, z: number, salt: number, seed: number): number {
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

// ========================================================
// MATH / RNG HELPERS
// ========================================================

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