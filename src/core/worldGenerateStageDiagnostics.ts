import { seedContinentSkeletonFields } from './worldContinents';
import {
  applyContinentSkeletonTerrainObedience,
  applyCrustProvinceTerrainDelta,
  applyProvinceCoastBreakup,
  applyProvinceCoherence,
  cleanupAccidentalTinyIslands,
  seedCrustFields,
} from './worldCrust';
import {
  computeGeologicFeatureAuthorityDiagnostics,
  type GeologicFeatureAuthorityDiagnostics,
} from './worldGeologicFeatureAuthority';
import { applyOceanBathymetrySmoothing } from './worldOceanBathymetry';
import { createDefaultGeneratorParams, generateWorldFromParams, type GeneratorParams } from './worldGenerator';
import { applyGeneratedWorldQualityPass } from './worldQualityPass';
import { applySkeletonBaseElevation } from './worldGeographyPipeline';
import { recomputeWorld } from './worldRecompute';
import { PlateType, type WorldBrain } from './worldSchema';

export type GenerateStageId =
  | 'RAW_GENERATOR'
  | 'CONTINENT_FIELDS'
  | 'SKELETON_ELEVATION'
  | 'FIRST_RECOMPUTE'
  | 'QUALITY_PASS'
  | 'CRUST_FIELDS'
  | 'CRUST_PROVINCE_DELTA'
  | 'CRUST_COAST_BREAKUP'
  | 'CRUST_COHERENCE'
  | 'CRUST_SKELETON_OBEDIENCE'
  | 'CRUST_TINY_ISLAND_CLEANUP'
  | 'OCEAN_BATHYMETRY_SMOOTHING'
  | 'FINAL_RECOMPUTE'
  | 'FINAL_CONTINENT_RESEED'
  | 'FINAL_CRUST_RESEED';

export type GenerateStageRawMetrics = {
  landFraction: number;
  landComponents: number;
  largestLandmassShare: number;
  tinyIslandShare: number;
  mediumFragmentCount: number;
  mediumFragmentShare: number;
  heightStdDev: number;
  landHeightStdDev: number;
  seamHeightRatio: number | null;
  plateSeamHeightRatio: number | null;
  provinceSeamHeightRatio: number | null;
  skeletonSeamHeightRatio: number | null;
  plateTypeTerrainMismatch: number;
  lowContinentalityLandShare: number;
  strongContinentalityWaterShare: number;
  featureAuthorityCoverage: number;
  plateAuthorityLeakShare: number;
  provinceAuthorityLeakShare: number;
  oceanPlateAuthorityLeakShare: number;
  oceanProvinceAuthorityLeakShare: number;
  landPlateAuthorityLeakShare: number;
  landProvinceAuthorityLeakShare: number;
  geologicAuthority: GeologicFeatureAuthorityDiagnostics;
};

export type GenerateStageTransitionMetrics = {
  newLandShare: number;
  lostLandShare: number;
  topologyFlipShare: number;
  meanAbsHeightDelta: number;
  maxAbsHeightDelta: number;
};

export type GenerateStageSnapshot = {
  id: GenerateStageId;
  label: string;
  note: string;
  raw: GenerateStageRawMetrics;
  deltaFromPrevious?: Partial<GenerateStageRawMetrics>;
  transitionFromPrevious?: GenerateStageTransitionMetrics;
};

export type GenerateStageDiagnostics = {
  seed: string;
  grid: string;
  stages: GenerateStageSnapshot[];
};

type StageTrace = {
  heights: Float32Array;
  land: Uint8Array;
  seaLevel: number;
};

export function computeGeneratedStageDiagnostics(sourceWorld: WorldBrain | null | undefined): GenerateStageDiagnostics | null {
  if (!sourceWorld?.cells?.length) return null;
  const params = generatorParamsFromWorld(sourceWorld);
  const world = generateWorldFromParams(params);
  const stages: GenerateStageSnapshot[] = [];
  let previousTrace: StageTrace | null = null;

  function record(id: GenerateStageId, label: string, note: string): void {
    const trace = captureStageTrace(world);
    const raw = computeStageRawMetrics(world, trace);
    const previous = stages[stages.length - 1]?.raw;
    stages.push({
      id,
      label,
      note,
      raw,
      deltaFromPrevious: previous ? diffRaw(raw, previous) : undefined,
      transitionFromPrevious: previousTrace ? diffTrace(trace, previousTrace) : undefined,
    });
    previousTrace = trace;
  }

  record('RAW_GENERATOR', 'Raw generator', 'Continuous terrain before continent/crust pipeline stages.');
  seedContinentSkeletonFields(world);
  record('CONTINENT_FIELDS', 'Continent fields', 'Skeleton identity fields seeded; terrain should not change here.');
  applySkeletonBaseElevation(world);
  record('SKELETON_ELEVATION', 'Skeleton elevation', 'Broad continent/ocean height guidance applied. Watch skeleton seam and land flips here.');
  recomputeWorld(world, ['GENERATED']);
  record('FIRST_RECOMPUTE', 'First recompute', 'Derived water, climate, rivers, snow, and biomes refreshed after skeleton elevation.');
  applyGeneratedWorldQualityPass(world);
  record('QUALITY_PASS', 'Quality pass', 'Interior relief, coastline breakup, shelf roughness, and strait cuts applied.');
  recomputeWorld(world, ['GENERATED']);
  seedContinentSkeletonFields(world);
  seedCrustFields(world);
  record('CRUST_FIELDS', 'Crust fields', 'Crust thickness, age, and province causes seeded after quality pass. Height should not change here.');
  applyCrustProvinceTerrainDelta(world);
  record('CRUST_PROVINCE_DELTA', 'Crust delta', 'Province height deltas only. Watch province seam and topology flips here.');
  applyProvinceCoastBreakup(world);
  record('CRUST_COAST_BREAKUP', 'Crust coast', 'Province-aware coastline breakup only.');
  applyProvinceCoherence(world);
  record('CRUST_COHERENCE', 'Crust cohere', 'Province coherence: fills holes and trims frayed lowland edges.');
  applyContinentSkeletonTerrainObedience(world);
  record('CRUST_SKELETON_OBEDIENCE', 'Crust skeleton', 'Skeleton obedience inside the crust pass. This should not act like a second full skeleton elevation pass.');
  cleanupAccidentalTinyIslands(world);
  record('CRUST_TINY_ISLAND_CLEANUP', 'Tiny cleanup', 'Tiny accidental island cleanup after crust subpasses.');
  applyOceanBathymetrySmoothing(world);
  record('OCEAN_BATHYMETRY_SMOOTHING', 'Ocean bathy', 'Cause-aware ocean-only smoothing to hide unexplained underwater plate/province ghosts while preserving ridges, trenches, arcs, and shelves.');
  recomputeWorld(world, ['GENERATED']);
  record('FINAL_RECOMPUTE', 'Final recompute', 'Final derived state after the generated geography pipeline before final skeleton/crust reseeding.');
  seedContinentSkeletonFields(world);
  record('FINAL_CONTINENT_RESEED', 'Final continent reseed', 'Final continent/shelf/margin identity reseed. If skeleton imprint jumps here, the reseed, not recompute, is the cause.');
  seedCrustFields(world);
  record('FINAL_CRUST_RESEED', 'Final crust reseed', 'Final crust/province cause reseed after final continent fields. Height should not change here.');

  return { seed: String(params.seed), grid: `${params.width}×${params.height}`, stages };
}

function generatorParamsFromWorld(world: WorldBrain): GeneratorParams {
  const defaults = createDefaultGeneratorParams();
  const p = world.parameters ?? {};
  return {
    width: intParam(p.width, world.gridWidth, defaults.width),
    height: intParam(p.height, world.gridHeight, defaults.height),
    seaLevel: numberParam(p.seaLevel, defaults.seaLevel),
    plateActivity: numberParam(p.plateActivity, defaults.plateActivity),
    axisTilt: numberParam(p.axisTilt, defaults.axisTilt),
    planetAge: numberParam(p.planetAge, defaults.planetAge),
    climateVar: numberParam(p.climateVar, defaults.climateVar),
    moistureLevel: numberParam(p.moistureLevel, defaults.moistureLevel),
    temperatureOffset: numberParam(p.temperatureOffset, defaults.temperatureOffset),
    erosionIntensity: numberParam(p.erosionIntensity, defaults.erosionIntensity),
    continentCount: numberParam(p.continentCount, defaults.continentCount),
    seed: typeof p.seed === 'string' || typeof p.seed === 'number' ? p.seed : world.metadata?.seed ?? defaults.seed,
    styleMode: isStyleMode(p.styleMode) ? p.styleMode : world.metadata?.styleMode ?? defaults.styleMode,
  };
}

function captureStageTrace(world: WorldBrain): StageTrace {
  const seaLevel = typeof world.seaLevel === 'number' ? world.seaLevel : world.metadata?.seaLevel ?? 0;
  const heights = new Float32Array(world.cells.length);
  const land = new Uint8Array(world.cells.length);
  for (let i = 0; i < world.cells.length; i++) {
    const h = world.cells[i].baseHeight + world.cells[i].editHeightDelta + world.cells[i].simHeightDelta;
    heights[i] = h;
    land[i] = h >= seaLevel ? 1 : 0;
  }
  return { heights, land, seaLevel };
}

function computeStageRawMetrics(world: WorldBrain, trace = captureStageTrace(world)): GenerateStageRawMetrics {
  const totalCells = Math.max(1, world.cells.length);
  const landFlags = Array.from(trace.land, (value) => value === 1);
  const landHeights: number[] = [];
  for (let i = 0; i < trace.heights.length; i++) if (landFlags[i]) landHeights.push(trace.heights[i]);
  const oceanCellCount = totalCells - landHeights.length;
  const componentSizes = landComponentSizes(world, landFlags);
  const landCellCount = Math.max(1, landHeights.length);
  const largestLandmassShare = (componentSizes[0] ?? 0) / landCellCount;
  const tinyIslandShare = componentSizes.filter((size) => size < 12).reduce((sum, size) => sum + size, 0) / landCellCount;
  const mediumMax = Math.max(24, Math.round(landCellCount * 0.035));
  const mediumFragments = componentSizes.slice(1).filter((size) => size >= 12 && size <= mediumMax);
  const mediumFragmentCells = mediumFragments.reduce((sum, size) => sum + size, 0);
  let plateTypeTerrainMismatch = 0;
  let lowContinentalityLand = 0;
  let strongContinentalityWater = 0;
  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const isLand = landFlags[i];
    if (isLand && cell.plateType === PlateType.OCEANIC) plateTypeTerrainMismatch++;
    if (!isLand && cell.plateType === PlateType.CONTINENTAL) plateTypeTerrainMismatch++;
    if (isLand && clamp01(cell.continentality) < 0.24) lowContinentalityLand++;
    if (!isLand && clamp01(cell.continentality) > 0.62) strongContinentalityWater++;
  }
  const plateSeamHeightRatio = edgeHeightRatio(world, trace.heights, (a, b) => a.plateId !== b.plateId);
  const provinceSeamHeightRatio = edgeHeightRatio(world, trace.heights, (a, b) => hasCrustProvince(a) && hasCrustProvince(b) && a.crustProvince !== b.crustProvince);
  const skeletonSeamHeightRatio = edgeHeightRatio(world, trace.heights, (a, b) => a.continentId !== b.continentId || a.oceanBasinId !== b.oceanBasinId || a.marginType !== b.marginType || a.islandCause !== b.islandCause);
  const geologicAuthority = computeGeologicFeatureAuthorityDiagnostics(world, {
    heights: trace.heights,
    seaLevel: trace.seaLevel,
  });
  return {
    landFraction: landHeights.length / totalCells,
    landComponents: componentSizes.length,
    largestLandmassShare,
    tinyIslandShare,
    mediumFragmentCount: mediumFragments.length,
    mediumFragmentShare: mediumFragmentCells / landCellCount,
    heightStdDev: stdDev(Array.from(trace.heights)),
    landHeightStdDev: stdDev(landHeights),
    seamHeightRatio: plateSeamHeightRatio,
    plateSeamHeightRatio,
    provinceSeamHeightRatio,
    skeletonSeamHeightRatio,
    plateTypeTerrainMismatch: plateTypeTerrainMismatch / totalCells,
    lowContinentalityLandShare: lowContinentalityLand / landCellCount,
    strongContinentalityWaterShare: strongContinentalityWater / Math.max(1, oceanCellCount),
    featureAuthorityCoverage: geologicAuthority.featureExplainedHighContrastEdgeShare,
    plateAuthorityLeakShare: geologicAuthority.plateAuthorityLeakShare,
    provinceAuthorityLeakShare: geologicAuthority.provinceAuthorityLeakShare,
    oceanPlateAuthorityLeakShare: geologicAuthority.oceanPlateAuthorityLeakShare,
    oceanProvinceAuthorityLeakShare: geologicAuthority.oceanProvinceAuthorityLeakShare,
    landPlateAuthorityLeakShare: geologicAuthority.landPlateAuthorityLeakShare,
    landProvinceAuthorityLeakShare: geologicAuthority.landProvinceAuthorityLeakShare,
    geologicAuthority,
  };
}

function diffRaw(raw: GenerateStageRawMetrics, previous: GenerateStageRawMetrics): Partial<GenerateStageRawMetrics> {
  return {
    landFraction: raw.landFraction - previous.landFraction,
    landComponents: raw.landComponents - previous.landComponents,
    largestLandmassShare: raw.largestLandmassShare - previous.largestLandmassShare,
    tinyIslandShare: raw.tinyIslandShare - previous.tinyIslandShare,
    mediumFragmentCount: raw.mediumFragmentCount - previous.mediumFragmentCount,
    mediumFragmentShare: raw.mediumFragmentShare - previous.mediumFragmentShare,
    heightStdDev: raw.heightStdDev - previous.heightStdDev,
    landHeightStdDev: raw.landHeightStdDev - previous.landHeightStdDev,
    seamHeightRatio: raw.seamHeightRatio == null || previous.seamHeightRatio == null ? undefined : raw.seamHeightRatio - previous.seamHeightRatio,
    plateSeamHeightRatio: raw.plateSeamHeightRatio == null || previous.plateSeamHeightRatio == null ? undefined : raw.plateSeamHeightRatio - previous.plateSeamHeightRatio,
    provinceSeamHeightRatio: raw.provinceSeamHeightRatio == null || previous.provinceSeamHeightRatio == null ? undefined : raw.provinceSeamHeightRatio - previous.provinceSeamHeightRatio,
    skeletonSeamHeightRatio: raw.skeletonSeamHeightRatio == null || previous.skeletonSeamHeightRatio == null ? undefined : raw.skeletonSeamHeightRatio - previous.skeletonSeamHeightRatio,
    plateTypeTerrainMismatch: raw.plateTypeTerrainMismatch - previous.plateTypeTerrainMismatch,
    lowContinentalityLandShare: raw.lowContinentalityLandShare - previous.lowContinentalityLandShare,
    strongContinentalityWaterShare: raw.strongContinentalityWaterShare - previous.strongContinentalityWaterShare,
    featureAuthorityCoverage: raw.featureAuthorityCoverage - previous.featureAuthorityCoverage,
    plateAuthorityLeakShare: raw.plateAuthorityLeakShare - previous.plateAuthorityLeakShare,
    provinceAuthorityLeakShare: raw.provinceAuthorityLeakShare - previous.provinceAuthorityLeakShare,
    oceanPlateAuthorityLeakShare: raw.oceanPlateAuthorityLeakShare - previous.oceanPlateAuthorityLeakShare,
    oceanProvinceAuthorityLeakShare: raw.oceanProvinceAuthorityLeakShare - previous.oceanProvinceAuthorityLeakShare,
    landPlateAuthorityLeakShare: raw.landPlateAuthorityLeakShare - previous.landPlateAuthorityLeakShare,
    landProvinceAuthorityLeakShare: raw.landProvinceAuthorityLeakShare - previous.landProvinceAuthorityLeakShare,
  };
}

function diffTrace(current: StageTrace, previous: StageTrace): GenerateStageTransitionMetrics {
  const total = Math.max(1, current.heights.length);
  let newLand = 0, lostLand = 0, absSum = 0, maxAbs = 0;
  for (let i = 0; i < current.heights.length; i++) {
    if (previous.land[i] === 0 && current.land[i] === 1) newLand++;
    if (previous.land[i] === 1 && current.land[i] === 0) lostLand++;
    const absDelta = Math.abs(current.heights[i] - previous.heights[i]);
    absSum += absDelta;
    if (absDelta > maxAbs) maxAbs = absDelta;
  }
  return { newLandShare: newLand / total, lostLandShare: lostLand / total, topologyFlipShare: (newLand + lostLand) / total, meanAbsHeightDelta: absSum / total, maxAbsHeightDelta: maxAbs };
}

function landComponentSizes(world: WorldBrain, landFlags: boolean[]): number[] {
  const visited = new Uint8Array(world.cells.length);
  const sizes: number[] = [];
  for (let i = 0; i < world.cells.length; i++) {
    if (visited[i] || !landFlags[i]) continue;
    let size = 0;
    const queue = [i];
    visited[i] = 1;
    for (let head = 0; head < queue.length; head++) {
      const current = queue[head];
      size++;
      for (const next of neighborIndices4(world, current)) {
        if (!visited[next] && landFlags[next]) {
          visited[next] = 1;
          queue.push(next);
        }
      }
    }
    sizes.push(size);
  }
  return sizes.sort((a, b) => b - a);
}

function neighborIndices4(world: WorldBrain, index: number): number[] {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  const neighbors = [row * world.gridWidth + ((col - 1 + world.gridWidth) % world.gridWidth), row * world.gridWidth + ((col + 1) % world.gridWidth)];
  if (row > 0) neighbors.push((row - 1) * world.gridWidth + col);
  if (row < world.gridHeight - 1) neighbors.push((row + 1) * world.gridWidth + col);
  return neighbors;
}

function edgeHeightRatio(world: WorldBrain, heights: Float32Array, isEdge: (a: WorldBrain['cells'][number], b: WorldBrain['cells'][number]) => boolean): number | null {
  let edgeDelta = 0, edgeCount = 0, baseDelta = 0, baseCount = 0;
  for (let row = 0; row < world.gridHeight; row++) {
    for (let col = 0; col < world.gridWidth; col++) {
      const idx = row * world.gridWidth + col;
      const candidates = [row * world.gridWidth + ((col + 1) % world.gridWidth)];
      if (row < world.gridHeight - 1) candidates.push((row + 1) * world.gridWidth + col);
      for (const next of candidates) {
        const delta = Math.abs(heights[idx] - heights[next]);
        if (isEdge(world.cells[idx], world.cells[next])) {
          edgeDelta += delta;
          edgeCount++;
        } else {
          baseDelta += delta;
          baseCount++;
        }
      }
    }
  }
  if (edgeCount === 0 || baseCount === 0) return null;
  const baseMean = baseDelta / baseCount;
  if (baseMean <= 1e-9) return null;
  return (edgeDelta / edgeCount) / baseMean;
}

function hasCrustProvince(cell: WorldBrain['cells'][number]): boolean {
  return typeof cell.crustProvince === 'string' && cell.crustProvince.length > 0;
}

function stdDev(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

function intParam(primary: unknown, fallback: unknown, defaultValue: number): number {
  const value = numberParam(primary, typeof fallback === 'number' ? fallback : defaultValue);
  return Math.floor(value);
}

function numberParam(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function isStyleMode(value: unknown): value is GeneratorParams['styleMode'] {
  return value === 'EARTHLIKE' || value === 'FANTASY' || value === 'STYLIZED' || value === 'ALIEN';
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
