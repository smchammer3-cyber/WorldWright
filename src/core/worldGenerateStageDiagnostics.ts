import { seedContinentSkeletonFields } from './worldContinents';
import { applyCrustTerrainInfluence, seedCrustFields } from './worldCrust';
import { computeGeologicFeatureAuthorityDiagnostics, type GeologicFeatureAuthorityDiagnostics } from './worldGeologicFeatureAuthority';
import { buildGenerateRuntimeStagePlan, generatorParamsFromRuntimeWorld, type GenerateRuntimeStageId, type GenerateRuntimeStagePlanEntry } from './generateRuntimeStagePlan';
import { applyOceanBathymetrySmoothing } from './worldOceanBathymetry';
import { applyPlateBoundaryFeatureTerrain } from './worldPlateBoundaryFeatures';
import { generateWorldFromParams } from './worldGenerator';
import { applyGeneratedWorldQualityPass } from './worldQualityPass';
import { applySkeletonBaseElevation } from './worldGeographyPipeline';
import { applyIsostaticTerrainResponse } from './worldTerrainResponse';
import { recomputeWorld } from './worldRecompute';
import { PlateType, type WorldBrain } from './worldSchema';

export type GenerateStageId = GenerateRuntimeStageId;

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

type StageTrace = { heights: Float32Array; land: Uint8Array; seaLevel: number };

export function computeGeneratedStageDiagnostics(sourceWorld: WorldBrain | null | undefined): GenerateStageDiagnostics | null {
  if (!sourceWorld?.cells?.length) return null;
  const params = generatorParamsFromRuntimeWorld(sourceWorld);
  const world = generateWorldFromParams(params);
  const plan = buildGenerateRuntimeStagePlan(world);
  const stages: GenerateStageSnapshot[] = [];
  let previousTrace: StageTrace | null = null;

  const record = (stage: GenerateRuntimeStagePlanEntry): void => {
    const trace = captureStageTrace(world);
    const raw = computeStageRawMetrics(world, trace);
    const previous = stages[stages.length - 1]?.raw;
    stages.push({ id: stage.id, label: stage.label, note: stage.reason, raw, deltaFromPrevious: previous ? diffRaw(raw, previous) : undefined, transitionFromPrevious: previousTrace ? diffTrace(trace, previousTrace) : undefined });
    previousTrace = trace;
  };

  for (const stage of plan.stages) {
    if (stage.id !== 'RAW_GENERATOR') runRuntimeStage(world, stage.id);
    record(stage);
  }
  return { seed: plan.seed, grid: plan.grid, stages };
}

function runRuntimeStage(world: WorldBrain, id: GenerateRuntimeStageId): void {
  if (id === 'CONTINENT_FIELDS' || id === 'CRUST_CONTINENT_RESEED' || id === 'FINAL_CONTINENT_RESEED') seedContinentSkeletonFields(world);
  else if (id === 'PLATE_BOUNDARY_FEATURE_TERRAIN') applyPlateBoundaryFeatureTerrain(world);
  else if (id === 'SKELETON_ELEVATION') applySkeletonBaseElevation(world);
  else if (id === 'FIRST_RECOMPUTE' || id === 'SECOND_RECOMPUTE' || id === 'FINAL_RECOMPUTE') recomputeWorld(world, ['GENERATED']);
  else if (id === 'QUALITY_PASS') applyGeneratedWorldQualityPass(world);
  else if (id === 'CRUST_FIELDS' || id === 'FINAL_CRUST_RESEED') seedCrustFields(world);
  else if (id === 'ISOSTATIC_TERRAIN_RESPONSE') applyIsostaticTerrainResponse(world);
  else if (id === 'CRUST_TERRAIN_INFLUENCE') applyCrustTerrainInfluence(world);
  else if (id === 'OCEAN_BATHYMETRY_SMOOTHING') applyOceanBathymetrySmoothing(world);
}

function captureStageTrace(world: WorldBrain): StageTrace {
  const seaLevel = typeof world.seaLevel === 'number' ? world.seaLevel : world.metadata?.seaLevel ?? 0;
  const heights = new Float32Array(world.cells.length);
  const land = new Uint8Array(world.cells.length);
  for (let i = 0; i < world.cells.length; i++) {
    const h = totalHeight(world.cells[i]);
    heights[i] = h;
    land[i] = h >= seaLevel ? 1 : 0;
  }
  return { heights, land, seaLevel };
}

function computeStageRawMetrics(world: WorldBrain, trace = captureStageTrace(world)): GenerateStageRawMetrics {
  const totalCells = Math.max(1, world.cells.length);
  const landFlags = Array.from(trace.land, (value) => value === 1);
  const landHeights = Array.from(trace.heights).filter((_, index) => landFlags[index]);
  const componentSizes = landComponentSizes(world, landFlags);
  const landCellCount = Math.max(1, landHeights.length);
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
  const geologicAuthority = computeGeologicFeatureAuthorityDiagnostics(world, { heights: trace.heights, seaLevel: trace.seaLevel });
  return {
    landFraction: landHeights.length / totalCells,
    landComponents: componentSizes.length,
    largestLandmassShare: (componentSizes[0] ?? 0) / landCellCount,
    tinyIslandShare: componentSizes.filter((size) => size < 12).reduce((sum, size) => sum + size, 0) / landCellCount,
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
    strongContinentalityWaterShare: strongContinentalityWater / Math.max(1, totalCells - landHeights.length),
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
  return Object.fromEntries(Object.keys(raw).filter((key) => key !== 'geologicAuthority').map((key) => {
    const a = (raw as any)[key];
    const b = (previous as any)[key];
    return [key, typeof a === 'number' && typeof b === 'number' ? a - b : undefined];
  })) as Partial<GenerateStageRawMetrics>;
}

function diffTrace(current: StageTrace, previous: StageTrace): GenerateStageTransitionMetrics {
  const total = Math.max(1, current.heights.length);
  let newLand = 0;
  let lostLand = 0;
  let absSum = 0;
  let maxAbs = 0;
  for (let i = 0; i < current.heights.length; i++) {
    if (previous.land[i] === 0 && current.land[i] === 1) newLand++;
    if (previous.land[i] === 1 && current.land[i] === 0) lostLand++;
    const absDelta = Math.abs(current.heights[i] - previous.heights[i]);
    absSum += absDelta;
    maxAbs = Math.max(maxAbs, absDelta);
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
      for (const next of neighborIndices4(world, current)) if (!visited[next] && landFlags[next]) { visited[next] = 1; queue.push(next); }
    }
    sizes.push(size);
  }
  return sizes.sort((a, b) => b - a);
}

function edgeHeightRatio(world: WorldBrain, heights: Float32Array, isEdge: (a: WorldBrain['cells'][number], b: WorldBrain['cells'][number]) => boolean): number | null {
  let edgeDelta = 0;
  let edgeCount = 0;
  let baseDelta = 0;
  let baseCount = 0;
  for (let row = 0; row < world.gridHeight; row++) {
    for (let col = 0; col < world.gridWidth; col++) {
      const idx = row * world.gridWidth + col;
      const candidates = [row * world.gridWidth + ((col + 1) % world.gridWidth)];
      if (row < world.gridHeight - 1) candidates.push((row + 1) * world.gridWidth + col);
      for (const next of candidates) {
        const delta = Math.abs(heights[idx] - heights[next]);
        if (isEdge(world.cells[idx], world.cells[next])) { edgeDelta += delta; edgeCount++; }
        else { baseDelta += delta; baseCount++; }
      }
    }
  }
  if (edgeCount === 0 || baseCount === 0) return null;
  const baseMean = baseDelta / baseCount;
  return baseMean <= 1e-9 ? null : (edgeDelta / edgeCount) / baseMean;
}

function neighborIndices4(world: WorldBrain, index: number): number[] {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  const neighbors = [row * world.gridWidth + ((col - 1 + world.gridWidth) % world.gridWidth), row * world.gridWidth + ((col + 1) % world.gridWidth)];
  if (row > 0) neighbors.push((row - 1) * world.gridWidth + col);
  if (row < world.gridHeight - 1) neighbors.push((row + 1) * world.gridWidth + col);
  return neighbors;
}

function hasCrustProvince(cell: WorldBrain['cells'][number]): boolean {
  return typeof cell.crustProvince === 'string' && cell.crustProvince.length > 0;
}

function totalHeight(cell: WorldBrain['cells'][number]): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
}

function stdDev(values: number[]): number {
  if (values.length < 2) return 0;
  const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
  return Math.sqrt(values.reduce((sum, value) => sum + (value - avg) ** 2, 0) / values.length);
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
