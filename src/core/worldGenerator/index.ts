import {
  BoundaryType,
  OceanDepthClass,
  PlateType,
  SurfaceType,
  WorldBrain,
  Cell,
  createEmptyCell,
} from '../worldSchema';
import { buildTectonicsField, type TectonicsField } from '../tectonicsSystem';
import { resolveGeneratePlanetFoundation } from '../generatePlanetFoundation';
import {
  allowsNormalContinentalMorphology,
  allowsPlateBoundaryFeatureTerrain,
} from '../generatePhysicalConsequenceResolver';

export type GeneratorParams = {
  width: number;
  height: number;
  seaLevel: number;
  seaLevelOffset?: number;
  waterInventory?: number;
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
  planetProfile?: WorldBrain['planetFoundation'] extends infer F ? F extends { planetProfile: infer P } ? P : never : never;
  planetRadiusEarth?: number;
  planetDensityEarth?: number;
  starLuminositySun?: number;
  orbitalDistanceAU?: number;
  albedo?: number;
  greenhouseStrength?: number;
  volatileInventory?: number;
  coreHeatIntent?: number;
  tidalHeatingIntent?: number;
  stagnantLidBias?: number;
  compositionRadioactivity?: number;
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
    seaLevelOffset: 50,
    waterInventory: 0.54,
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
    planetProfile: 'EARTHLIKE_ROCKY',
    planetRadiusEarth: 1,
    planetDensityEarth: 1,
    starLuminositySun: 1,
    orbitalDistanceAU: 1,
    albedo: 0.30,
    greenhouseStrength: 0.32,
    volatileInventory: 0.54,
    coreHeatIntent: 0.52,
    tidalHeatingIntent: 0,
    stagnantLidBias: 0.10,
    compositionRadioactivity: 0.50,
  };
}

export function generateWorldFromParams(params: GeneratorParams): WorldBrain {
  const width = clampInt(params.width, 32, 1024);
  const height = clampInt(params.height, 16, 512);
  const effectiveSeed = params.seed;
  const seedUint = seedToUint32(effectiveSeed);
  const rng = mulberry32(seedUint);
  const nowIso = new Date().toISOString();
  const foundation = resolveGeneratePlanetFoundation({ ...params, seaLevelOffset: params.seaLevelOffset ?? params.seaLevel });

  const seaBias = foundation.seaLevelOffset;
  const targetLandFraction = computeTargetLandFraction(params.styleMode, seaBias, foundation);
  const plateCount = computePlateCount(foundation);
  const plateFeatureTerrainAllowed = allowsPlateBoundaryFeatureTerrain(foundation.geologyStack);

  const cells: Cell[] = new Array(width * height);
  for (let i = 0; i < cells.length; i++) cells[i] = createEmptyCell(i);

  const tectonics = buildTectonicsField(width, height, cells, plateCount, rng, {
    plateActivity: plateFeatureTerrainAllowed ? foundation.tectonicVigor * 100 : foundation.tectonicVigor * 28,
  });

  const plates = tectonics.plates;
  const fields = tectonics.fields;

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const f = fields[i];
    cell.plateId = f.plateId;
    cell.plateType = f.plateType;
    cell.boundaryType = plateFeatureTerrainAllowed ? f.boundaryType : BoundaryType.NONE;
    cell.upliftRate = plateFeatureTerrainAllowed ? f.upliftRate * (0.45 + foundation.tectonicVigor * 0.55) : 0;
    cell.volcanicActivity = initialVolcanicActivity(f, foundation.volcanismBias, foundation.geologyStack);
  }

  const terrain = buildFoundationTerrain({
    width,
    height,
    seedUint,
    params,
    foundation,
    targetLandFraction,
  });

  for (let i = 0; i < cells.length; i++) {
    cells[i].baseHeight = terrain.heights[i];
    cells[i].editHeightDelta = 0;
    cells[i].simHeightDelta = 0;
    cells[i].isWater = cells[i].baseHeight < terrain.seaLevel && foundation.surfaceWaterMode !== 'DRY' && foundation.surfaceWaterMode !== 'ICE_OVER_ROCK';
    cells[i].oceanDepthClass = classifyOceanDepth(cells[i].baseHeight, terrain.seaLevel, cells[i].isWater);
    cells[i].surfaceAge = clamp01(0.18 + foundation.thermalAge * 0.72 + deterministicJitter(seedUint, i, 17) * 0.08 - cells[i].volcanicActivity * 0.10);
    cells[i].surfaceType = initialSurfaceType(cells[i], foundation);
  }

  seedClimateAndBiomes(cells, width, height, terrain.seaLevel, seedUint, params, foundation);
  seedHydrology(cells, width, height, terrain.seaLevel, rng);

  return {
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
    planetFoundation: foundation,
    metadata: {
      id: `w_${params.styleMode}_${width}x${height}_${seedUint}`,
      name: 'Untitled World',
      seed: String(effectiveSeed),
      schemaVersion: 'v3',
      version: 'v1.5.1',
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
      seaLevelOffset: params.seaLevelOffset ?? params.seaLevel,
      waterInventory: foundation.waterInventory,
    },
  };
}

function initialVolcanicActivity(f: TectonicsField, volcanismBias: number, geologyStack: NonNullable<WorldBrain['planetFoundation']>['geologyStack']): number {
  const boundary = f.boundaryType === BoundaryType.CONVERGENT
    ? 0.48
    : f.boundaryType === BoundaryType.DIVERGENT
      ? 0.40
      : f.boundaryType === BoundaryType.TRANSFORM
        ? 0.12
        : 0;
  const stackBoost = geologyStack === 'HOTSPOT_DOMINATED'
    ? 0.38
    : geologyStack === 'RIFT_DOMINATED'
      ? 0.24
      : geologyStack === 'VOLATILE_PRESSURE_SHELL'
        ? 0.18
        : geologyStack === 'ICE_SHELL_TECTONIC'
          ? 0.14
          : 0;
  const boundaryScale = allowsPlateBoundaryFeatureTerrain(geologyStack) ? boundary * f.boundaryStrength : 0;
  return clamp01(boundaryScale + volcanismBias * 0.32 + stackBoost * volcanismBias);
}

function initialSurfaceType(cell: Cell, foundation: NonNullable<WorldBrain['planetFoundation']>): SurfaceType {
  if (foundation.surfaceWaterMode === 'SNOWBALL_SURFACE' || foundation.surfaceWaterMode === 'ICE_OVER_ROCK' || foundation.groundSurfaceMaterial === 'ICE_OVER_ROCK' || foundation.groundSurfaceMaterial === 'ICE_SHELL') return SurfaceType.PERMAFROST;
  if (foundation.surfaceWaterMode === 'STEAM_OR_VAPOR_DOMINATED' && !cell.isWater) return SurfaceType.SALT;
  if (cell.isWater) return SurfaceType.ALLUVIAL;
  if (cell.volcanicActivity > 0.55) return SurfaceType.VOLCANIC;
  return SurfaceType.ROCK;
}

function buildFoundationTerrain(args: {
  width: number;
  height: number;
  seedUint: number;
  params: GeneratorParams;
  foundation: NonNullable<WorldBrain['planetFoundation']>;
  targetLandFraction: number;
}): HeightBuild {
  const { width, height, seedUint, params, foundation, targetLandFraction } = args;
  const heights = new Float32Array(width * height);
  const age01 = clamp01(params.planetAge / 100);
  const erosion01 = clamp01(params.erosionIntensity / 100);
  const count01 = allowsNormalContinentalMorphology(foundation.geologyStack) ? clamp01((params.continentCount - 1) / 11) : 0.25;
  const terrainSharpness = lerp(1.18, 0.92, age01) * lerp(1.12, 0.82, foundation.surfaceGravityEarth > 1 ? clamp01((foundation.surfaceGravityEarth - 1) / 2) : 0);
  const relief = foundation.reliefGravityScale * reliefForGeologyStack(foundation.geologyStack, foundation.tectonicVigor);
  const continentFragmentation = lerp(0.82, 1.46, count01);

  for (let r = 0; r < height; r++) {
    const lat = 90 - ((r + 0.5) / height) * 180;
    const absLat01 = Math.abs(lat) / 90;
    const poleSoftener = smoothstep(0.90, 1.0, absLat01);

    for (let c = 0; c < width; c++) {
      const lon = ((c + 0.5) / width) * 360 - 180;
      const dir = latLonToUnitVector(lat, lon);
      const idx = r * width + c;
      const broad = sphereFbm(shiftVec(dir, 17.1, -5.3, 8.7), seedUint, 0.62 * continentFragmentation, 4);
      const regional = sphereFbm(shiftVec(dir, -3.9, 11.8, 2.6), seedUint, 1.65 * continentFragmentation, 4);
      const breakup = sphereFbm(shiftVec(dir, 6.4, 1.7, -13.2), seedUint, 4.25 * continentFragmentation, 3);
      const detail = sphereFbm(shiftVec(dir, -12.6, 4.2, 5.9), seedUint, 8.9, 2);
      const basin = sphereFbm(shiftVec(dir, -8.8, -2.6, 15.4), seedUint, 2.3, 3);
      const supportBias = supportHeightBias(foundation);
      const rawShape = broad * 0.150 + regional * 0.115 + breakup * 0.070 + detail * 0.026 - Math.max(0, -basin) * 0.045;
      heights[idx] = clamp((rawShape * relief * terrainSharpness + supportBias) * (1 - poleSoftener * 0.10), -1.4, 1.5);
    }
  }

  smoothHeightField(heights, width, height, Math.max(1, Math.round(lerp(1, 2, erosion01))), lerp(0.024, 0.070, foundation.erosionSedimentScale));
  addSubtleTerrainTexture(heights, width, height, seedUint, lerp(0.010, 0.024, 1 - erosion01) * foundation.reliefGravityScale);
  const seaLevel = chooseSeaLevelForLandFraction(heights, width, height, targetLandFraction);
  if (foundation.surfaceWaterMode !== 'DRY' && foundation.surfaceWaterMode !== 'ICE_OVER_ROCK') {
    carveNearSeaLevelStraits(heights, width, height, seedUint, seaLevel, lerp(0.018, 0.050, 1 - erosion01) * foundation.reliefGravityScale);
    applyCoastalShelfShaping(heights, width, height, seaLevel);
  }
  return { heights, seaLevel };
}

function reliefForGeologyStack(geologyStack: NonNullable<WorldBrain['planetFoundation']>['geologyStack'], tectonicVigor: number): number {
  switch (geologyStack) {
    case 'PLATE_TECTONIC': return lerp(0.78, 1.18, tectonicVigor);
    case 'RIFT_DOMINATED': return 1.10;
    case 'HOTSPOT_DOMINATED': return 0.98;
    case 'STAGNANT_LID': return 0.72;
    case 'ICE_SHELL_TECTONIC': return 0.42;
    case 'IMPACT_ANCIENT': return 0.60;
    case 'VOLATILE_PRESSURE_SHELL': return 0.86;
    case 'ARTIFICIAL_DECLARED': return 0.74;
  }
}

function supportHeightBias(foundation: NonNullable<WorldBrain['planetFoundation']>): number {
  if (foundation.surfaceSupportMode === 'ICE_SHELL') return -0.050;
  if (foundation.surfaceSupportMode === 'ICE_OVER_ROCK') return -0.020;
  if (foundation.surfaceSupportMode === 'REGOLITH') return -0.010;
  if (foundation.surfaceSupportMode === 'ARTIFICIAL_OR_FANTASY_SHELL') return 0.016;
  return 0;
}

function smoothHeightField(heights: Float32Array, width: number, height: number, passes: number, strength: number): void {
  for (let pass = 0; pass < passes; pass++) {
    const next = new Float32Array(heights.length);
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        const idx = r * width + c;
        const north = Math.max(0, r - 1);
        const south = Math.min(height - 1, r + 1);
        const west = (c - 1 + width) % width;
        const east = (c + 1) % width;
        const avg = (heights[north * width + c] + heights[south * width + c] + heights[r * width + west] + heights[r * width + east]) / 4;
        const lat = 90 - ((r + 0.5) / height) * 180;
        const poleDamp = lerp(1, 0.74, smoothstep(0.86, 1.0, Math.abs(lat) / 90));
        next[idx] = clamp(heights[idx] + (avg - heights[idx]) * strength * poleDamp, -1.4, 1.5);
      }
    }
    heights.set(next);
  }
}

function addSubtleTerrainTexture(heights: Float32Array, width: number, height: number, seedUint: number, amount: number): void {
  for (let r = 0; r < height; r++) {
    const lat = 90 - ((r + 0.5) / height) * 180;
    for (let c = 0; c < width; c++) {
      const lon = ((c + 0.5) / width) * 360 - 180;
      const dir = latLonToUnitVector(lat, lon);
      const idx = r * width + c;
      const small = sphereFbm(shiftVec(dir, 13.9, -9.1, 4.7), seedUint, 14.0, 2);
      heights[idx] = clamp(heights[idx] + small * amount, -1.4, 1.5);
    }
  }
}

function carveNearSeaLevelStraits(heights: Float32Array, width: number, height: number, seedUint: number, seaLevel: number, amount: number): void {
  const copy = new Float32Array(heights);
  for (let r = 0; r < height; r++) {
    const lat = 90 - ((r + 0.5) / height) * 180;
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const aboveSea = copy[idx] - seaLevel;
      if (aboveSea <= 0 || aboveSea > 0.15) continue;
      const lon = ((c + 0.5) / width) * 360 - 180;
      const dir = latLonToUnitVector(lat, lon);
      const localLand = localFractionAboveSea(copy, width, height, r, c, seaLevel, 4);
      const channelNoise = sphereFbm(shiftVec(dir, -31.0, 12.5, -6.0), seedUint, 4.4, 3);
      const channel = 1 - smoothstep(0.020, 0.095, Math.abs(channelNoise));
      heights[idx] = clamp(copy[idx] - channel * smoothstep(0.35, 0.90, localLand) * amount, -1.4, 1.5);
    }
  }
}

function applyCoastalShelfShaping(heights: Float32Array, width: number, height: number, seaLevel: number): void {
  const copy = new Float32Array(heights);
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const d = copy[idx] - seaLevel;
      const localLand = localFractionAboveSea(copy, width, height, r, c, seaLevel, 2);
      if (d < 0 && localLand > 0.10) heights[idx] = seaLevel + d * lerp(1.0, 0.42, smoothstep(0.10, 0.62, localLand));
      else if (d > 0 && localLand < 0.88) heights[idx] = seaLevel + d * lerp(1.0, 0.76, 1 - smoothstep(0.42, 0.88, localLand));
      else if (Math.abs(d) < 0.045) heights[idx] = seaLevel + d * 0.82;
    }
  }
}

function localFractionAboveSea(heights: Float32Array, width: number, height: number, row: number, col: number, seaLevel: number, radius: number): number {
  let land = 0, total = 0;
  for (let dr = -radius; dr <= radius; dr++) {
    const r = row + dr;
    if (r < 0 || r >= height) continue;
    for (let dc = -radius; dc <= radius; dc++) {
      const c = (col + dc + width) % width;
      total++;
      if (heights[r * width + c] >= seaLevel) land++;
    }
  }
  return total > 0 ? land / total : 0;
}

function computeTargetLandFraction(styleMode: GeneratorParams['styleMode'], seaBias: number, foundation: NonNullable<WorldBrain['planetFoundation']>): number {
  if (foundation.surfaceWaterMode === 'DRY') return clamp(lerp(0.78, 0.48, seaBias) - foundation.waterInventory * 0.08, 0.48, 0.82);
  if (foundation.surfaceWaterMode === 'ICE_SHELL_OVER_OCEAN') return clamp(lerp(0.22, 0.04, seaBias), 0.02, 0.24);
  if (foundation.surfaceWaterMode === 'SNOWBALL_SURFACE' || foundation.surfaceWaterMode === 'ICE_OVER_ROCK') return clamp(lerp(0.44, 0.18, seaBias) - foundation.waterInventory * 0.10, 0.10, 0.46);
  if (foundation.surfaceWaterMode === 'STEAM_OR_VAPOR_DOMINATED') return clamp(lerp(0.40, 0.14, seaBias) - foundation.waterInventory * 0.06, 0.10, 0.46);

  const inventoryBase = 0.55 - foundation.waterInventory * 0.40;
  const exposureShift = lerp(0.16, -0.16, seaBias);
  let styleAdjust = 0;
  if (styleMode === 'FANTASY') styleAdjust = 0.045;
  if (styleMode === 'STYLIZED') styleAdjust = 0.018;
  if (styleMode === 'ALIEN') styleAdjust = 0.010;
  const heatWaterShift = clamp((foundation.effectiveHeatIndex - 1) * -0.020, -0.035, 0.035);
  return clamp(inventoryBase + exposureShift + styleAdjust + heatWaterShift, 0.08, 0.68);
}

function computePlateCount(foundation: NonNullable<WorldBrain['planetFoundation']>): number {
  switch (foundation.geologyStack) {
    case 'PLATE_TECTONIC': return Math.max(6, Math.round(lerp(7, 18, foundation.tectonicVigor)));
    case 'RIFT_DOMINATED': return Math.max(4, Math.round(lerp(4, 9, foundation.riftLikelihood)));
    case 'HOTSPOT_DOMINATED': return Math.max(3, Math.round(lerp(3, 7, foundation.hotspotPotential)));
    case 'STAGNANT_LID': return 2;
    case 'ICE_SHELL_TECTONIC': return 2;
    case 'IMPACT_ANCIENT': return 2;
    case 'VOLATILE_PRESSURE_SHELL': return 3;
    case 'ARTIFICIAL_DECLARED': return 2;
  }
}

function chooseSeaLevelForLandFraction(heights: Float32Array, width: number, height: number, targetLandFraction: number): number {
  const samples: number[] = [];
  for (let r = 1; r < height - 1; r++) for (let c = 0; c < width; c++) samples.push(heights[r * width + c]);
  samples.sort((a, b) => a - b);
  return samples[clampInt(Math.floor((1 - targetLandFraction) * (samples.length - 1)), 0, samples.length - 1)] ?? 0;
}

function seedClimateAndBiomes(cells: Cell[], width: number, height: number, seaLevel: number, seedUint: number, params: GeneratorParams, foundation: NonNullable<WorldBrain['planetFoundation']>): void {
  const climateVar01 = clamp01(params.climateVar / 100);
  const tilt01 = clamp01(params.axisTilt / 100);
  const moisture01 = clamp01(params.moistureLevel / 100);
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
      cell.temperature = clamp01(0.08 + foundation.effectiveHeatIndex * 0.34 + equatorWarmth * 0.42 + tempNoise * (0.05 + climateVar01 * 0.08) + oceanProx * 0.045 - elevAboveSea * 0.38 * foundation.reliefGravityScale - foundation.snowlineBias * smoothstep(0.60, 1.0, absLat01) * 0.10);
      cell.rainfall = clamp01(0.12 + moisture01 * 0.22 + foundation.evaporationPotential * oceanProx * 0.28 + hadleyWet * 0.18 - subtropicDry * 0.14 - polarDry + rainNoise * (0.08 + climateVar01 * 0.08) - rainShadow * 0.13 - elevAboveSea * 0.05);
      cell.snowCover = computeSnowCover(cell.temperature, cell.rainfall, elevAboveSea, foundation.effectiveHeatIndex);
      if (foundation.surfaceWaterMode === 'SNOWBALL_SURFACE' || foundation.surfaceWaterMode === 'ICE_SHELL_OVER_OCEAN') cell.snowCover = Math.max(cell.snowCover, 0.62);
      cell.baseBiomeId = cell.isWater ? 0 : pickBiome(cell.temperature, cell.rainfall, cell.snowCover, elevAboveSea);
      cell.editBiomeId = cell.baseBiomeId;
    }
  }
}

function seedHydrology(cells: Cell[], width: number, height: number, seaLevel: number, rng: () => number): void {
  void rng;
  const order = cells.map((cell) => cell.index).sort((a, b) => cells[b].baseHeight - cells[a].baseHeight);
  for (const cell of cells) {
    cell.flowDirection = null;
    cell.flowAccumulation = cell.isWater ? 0 : Math.max(0.1, cell.rainfall);
    cell.basinId = null;
  }
  for (const idx of order) {
    const cell = cells[idx];
    if (cell.isWater) continue;
    let bestIdx: number | null = null;
    let bestHeight = cell.baseHeight;
    for (const n of neighborIndices8(width, height, idx)) {
      if (cells[n].baseHeight < bestHeight) {
        bestHeight = cells[n].baseHeight;
        bestIdx = n;
      }
    }
    cell.flowDirection = bestIdx;
    if (bestIdx != null) cells[bestIdx].flowAccumulation += cell.flowAccumulation * 0.92;
  }
  for (const cell of cells) if (cell.baseHeight < seaLevel) cell.flowAccumulation = 0;
}

function classifyOceanDepth(h: number, seaLevel: number, isWater: boolean): OceanDepthClass | null {
  if (!isWater) return null;
  const d = seaLevel - h;
  if (d < 0.045) return OceanDepthClass.SHELF;
  if (d < 0.100) return OceanDepthClass.SLOPE;
  if (d > 0.320) return OceanDepthClass.TRENCH;
  if (d < 0.170) return OceanDepthClass.RIDGE;
  return OceanDepthClass.ABYSSAL;
}

function computeSnowCover(temp: number, rain: number, elevation: number, heatIndex: number): number {
  return clamp01((1 - temp) * 0.70 + elevation * 0.18 + rain * 0.12 - heatIndex * 0.15);
}

function pickBiome(temp: number, rain: number, snow: number, elev: number): number {
  if (snow > 0.58) return 7;
  if (elev > 0.60) return 6;
  if (temp > 0.68 && rain < 0.26) return 5;
  if (rain < 0.22) return 4;
  if (rain > 0.68 && temp > 0.52) return 3;
  if (rain > 0.50) return 2;
  return 1;
}

function oceanProximityAt(cells: Cell[], width: number, height: number, row: number, col: number, radius: number): number {
  let water = 0, total = 0;
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

function simpleRainShadow(cells: Cell[], width: number, height: number, row: number, col: number, seaLevel: number): number {
  let barrier = 0;
  for (let step = 1; step <= 3; step++) {
    const c = (col - step + width) % width;
    const h = cells[row * width + c]?.baseHeight ?? seaLevel;
    barrier = Math.max(barrier, h - seaLevel);
  }
  return clamp01(barrier * 1.8);
}

function neighborIndices8(width: number, height: number, index: number): number[] {
  const row = Math.floor(index / width);
  const col = index % width;
  const out: number[] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const r = row + dr;
      if (r < 0 || r >= height) continue;
      out.push(r * width + ((col + dc + width) % width));
    }
  }
  return out;
}

function sphereFbm(dir: Vec3, seed: number, frequency: number, octaves: number): number {
  let value = 0;
  let amp = 0.5;
  let norm = 0;
  for (let o = 0; o < octaves; o++) {
    value += valueNoise3(dir[0] * frequency, dir[1] * frequency, dir[2] * frequency, seed + o * 1013) * amp;
    norm += amp;
    frequency *= 2.02;
    amp *= 0.52;
  }
  return norm > 0 ? value / norm : 0;
}

function valueNoise3(x: number, y: number, z: number, seed: number): number {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  let sum = 0;
  for (let dx = 0; dx <= 1; dx++) {
    for (let dy = 0; dy <= 1; dy++) {
      for (let dz = 0; dz <= 1; dz++) {
        const wx = dx ? smooth(xf) : 1 - smooth(xf);
        const wy = dy ? smooth(yf) : 1 - smooth(yf);
        const wz = dz ? smooth(zf) : 1 - smooth(zf);
        sum += hash3(xi + dx, yi + dy, zi + dz, seed) * wx * wy * wz;
      }
    }
  }
  return sum * 2 - 1;
}

function hash3(x: number, y: number, z: number, seed: number): number {
  let h = seed ^ Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(z, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

function latLonToUnitVector(lat: number, lon: number): Vec3 {
  const phi = (lat * Math.PI) / 180;
  const theta = (lon * Math.PI) / 180;
  const cosPhi = Math.cos(phi);
  return [cosPhi * Math.cos(theta), Math.sin(phi), cosPhi * Math.sin(theta)];
}

function shiftVec(v: Vec3, x: number, y: number, z: number): Vec3 {
  return [v[0] + x, v[1] + y, v[2] + z];
}

function seedToUint32(s: string | number): number {
  if (typeof s === 'number') return s >>> 0;
  let h = 2166136261 >>> 0;
  for (let i = 0; i < String(s).length; i++) {
    h ^= String(s).charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function deterministicJitter(seed: number, index: number, salt: number): number {
  let h = seed ^ Math.imul(index + 1, 374761393) ^ Math.imul(salt + 1, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / Math.max(1e-9, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clampInt(value: number, lo: number, hi: number): number {
  return Math.floor(clamp(value, lo, hi));
}

function clamp(value: number, lo: number, hi: number): number {
  return value < lo ? lo : value > hi ? hi : value;
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
