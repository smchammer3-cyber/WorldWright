import {
  BoundaryType,
  ContinentMarginType,
  CrustProvince,
  IslandCause,
  OceanDepthClass,
  PlateType,
  type Cell,
  type WorldBrain,
} from '../worldSchema';
import { assertNoAuthoredTerrainDeltas } from '../worldLayerAuthority';
import {
  applyContinentSkeletonTerrainObedience,
  applyProvinceCoastBreakup,
  applyProvinceCoherence,
  cleanupAccidentalTinyIslands,
  ensureCrustFields,
} from './index';

type CrustTopologyStage = 'province-delta';

export function applyCrustTerrainInfluence(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyCrustTerrainInfluence');
  ensureCrustFields(world);

  applyCrustProvinceTerrainDelta(world);
  applyProvinceCoastBreakup(world);
  applyProvinceCoherence(world);
  applyContinentSkeletonTerrainObedience(world);
  cleanupAccidentalTinyIslands(world);
}

export function applyCrustProvinceTerrainDelta(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyCrustProvinceTerrainDelta');
  ensureCrustFields(world);

  const seed = seedToUint32(world.metadata.seed);
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const copy = world.cells.map((cell) => totalHeight(cell));
  const rawDeltas = new Float32Array(world.cells.length);

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = copy[i];
    const aboveSea = h - seaLevel;
    const landGate = smoothstep(-0.02, 0.22, aboveSea);
    const oceanGate = 1 - smoothstep(-0.22, 0.04, aboveSea);
    const coastGate = 1 - smoothstep(0.02, 0.24, Math.abs(aboveSea));
    const nearSurface = 1 - smoothstep(0.08, 0.32, Math.abs(aboveSea));
    const landNeighbors = landNeighborFractionByHeight(world, i, seaLevel, copy);
    const waterNeighbors = 1 - landNeighbors;

    const thickness = clamp01(cell.crustThickness);
    const age = clamp01(cell.crustAge);
    const uplift = Math.max(0, cell.upliftRate);
    const subsidence = Math.max(0, -cell.upliftRate);
    const volcanic = clamp01(cell.volcanicActivity);
    const shelfSignal = cell.oceanDepthClass === OceanDepthClass.SHELF
      ? 1
      : cell.oceanDepthClass === OceanDepthClass.SLOPE
        ? 0.55
        : 0;

    const stableCrust = Math.max(0, thickness - 0.58) * Math.max(0, age - 0.52);
    const thinYoungCrust = Math.max(0, 0.56 - thickness) * Math.max(0, 0.62 - age);
    const boundaryLift = cell.boundaryType === BoundaryType.CONVERGENT
      ? 0.55
      : cell.boundaryType === BoundaryType.TRANSFORM
        ? 0.22
        : 0;
    const marginLift = cell.marginType === ContinentMarginType.COLLISION || cell.marginType === ContinentMarginType.ACTIVE ? 0.22 : 0;
    const mountainSignal = clamp01(uplift * 0.90 + boundaryLift + marginLift);
    const riftSignal = clamp01(
      (cell.boundaryType === BoundaryType.DIVERGENT ? 0.55 : 0) +
      subsidence * 0.80 +
      (cell.marginType === ContinentMarginType.RIFT ? 0.35 : 0),
    );

    const rough = centeredJitter(seed, i, 7019);
    const fineTexture = centeredJitter(seed, i * 17 + 23, 17011);
    const seamDamp = crustSeamDamp(world, i);

    let delta = 0;

    // Material and derived feature signals are the terrain authority here.
    // Province labels below may bias the result, but should not stamp terrain alone.
    delta += stableCrust * 0.085 * landGate * (0.55 + landNeighbors * 0.45);
    delta += mountainSignal * 0.062 * landGate;
    delta += volcanic * 0.052 * smoothstep(-0.10, 0.16, aboveSea) * (cell.plateType === PlateType.OCEANIC ? 0.80 : 1);
    delta -= thinYoungCrust * 0.070 * oceanGate;
    delta -= riftSignal * 0.026 * coastGate * (0.35 + waterNeighbors * 0.65);
    delta -= shelfSignal * 0.012 * nearSurface * waterNeighbors;

    switch (cell.crustProvince) {
      case CrustProvince.OLD_SHIELD:
        delta += stableCrust * 0.012 * landGate;
        break;
      case CrustProvince.MOBILE_BELT:
        delta += mountainSignal * 0.010 * landGate;
        break;
      case CrustProvince.SEDIMENT_BASIN:
        delta -= 0.006 * landGate * (0.40 + waterNeighbors * 0.60);
        break;
      case CrustProvince.RIFT_MARGIN:
        delta -= 0.006 * coastGate;
        break;
      case CrustProvince.COASTAL_PLAIN:
        delta -= 0.006 * nearSurface * coastGate;
        break;
      case CrustProvince.VOLCANIC_PROVINCE:
        delta += volcanic * 0.008 * smoothstep(-0.08, 0.18, aboveSea);
        break;
      case CrustProvince.ISLAND_ARC:
        delta += volcanic * 0.010 * nearSurface;
        break;
      case CrustProvince.OCEANIC_BASIN:
      default:
        delta -= thinYoungCrust * 0.010 * oceanGate;
        break;
    }

    const featureEnergy = clamp01(stableCrust + thinYoungCrust + mountainSignal + riftSignal + volcanic + shelfSignal * 0.35);
    const materialTexture = rough * 0.018 + fineTexture * 0.010;
    delta += materialTexture * (0.30 + featureEnergy * 0.70) * landGate;
    delta += rough * 0.010 * featureEnergy * oceanGate;

    const shelfSoftening = cell.oceanDepthClass === OceanDepthClass.SHELF || cell.oceanDepthClass === OceanDepthClass.SLOPE
      ? (thickness - 0.50) * 0.010
      : 0;

    const rawDelta = clamp((delta + shelfSoftening) * seamDamp, -0.034, 0.034);
    rawDeltas[i] = constrainCrustTopologyDelta(world, i, h, seaLevel, rawDelta, copy, 'province-delta', landNeighbors, waterNeighbors);
  }

  for (let i = 0; i < world.cells.length; i++) {
    const blendedDelta = blendDeltaNearCrustSeams(world, i, rawDeltas);
    const safeDelta = constrainCrustTopologyDelta(world, i, copy[i], seaLevel, blendedDelta, copy, 'province-delta');
    world.cells[i].baseHeight = clamp(world.cells[i].baseHeight + safeDelta, -1.4, 1.5);
  }
}

function constrainCrustTopologyDelta(
  world: WorldBrain,
  index: number,
  heightBefore: number,
  seaLevel: number,
  delta: number,
  heights: number[],
  stage: CrustTopologyStage,
  precomputedLandNeighbors?: number,
  precomputedWaterNeighbors?: number,
): number {
  if (delta === 0) return 0;

  const next = heightBefore + delta;
  const wasLand = heightBefore >= seaLevel;
  const willBeLand = next >= seaLevel;
  if (wasLand === willBeLand) return delta;

  const cell = world.cells[index];
  const landNeighbors = precomputedLandNeighbors ?? landNeighborFractionByHeight(world, index, seaLevel, heights);
  const waterNeighbors = precomputedWaterNeighbors ?? (1 - landNeighbors);
  const continentality = clamp01(cell.continentality);
  const core = clamp01(cell.continentCoreStrength);
  const caused = isCausedIslandCell(cell);
  const volcanicArc = cell.volcanicActivity > 0.55 && cell.boundaryType === BoundaryType.CONVERGENT;
  const strongCore = continentality > 0.72 && core > 0.68;
  const attachedLand = landNeighbors >= (stage === 'province-delta' ? 0.62 : 0.72) && continentality > 0.36;
  const invalidFragment = cell.islandCause === IslandCause.INVALID_FRAGMENT || (continentality < 0.18 && cell.crustProvince === CrustProvince.OCEANIC_BASIN);

  if (!wasLand && willBeLand) {
    const allowNewLand = caused || volcanicArc || strongCore || attachedLand;
    if (!allowNewLand) return Math.max(0, seaLevel - 0.006 - heightBefore);
  }

  if (wasLand && !willBeLand) {
    const protectedLand = caused || strongCore || continentality > 0.36 || core > 0.24 || landNeighbors >= 0.50;
    const allowSinkLand = invalidFragment || (!protectedLand && waterNeighbors >= 0.72);
    if (!allowSinkLand) return Math.min(0, seaLevel + 0.006 - heightBefore);
  }

  return delta;
}

function blendDeltaNearCrustSeams(world: WorldBrain, index: number, deltas: Float32Array): number {
  const raw = deltas[index];
  if (raw === 0) return 0;

  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return raw;

  let neighborSum = 0;
  for (const neighbor of neighbors) neighborSum += deltas[neighbor];
  const neighborAverage = neighborSum / neighbors.length;
  const edgeBlend = crustSeamBlendStrength(world, index);
  const softened = raw * 0.70 + neighborAverage * 0.30;
  return lerp(raw, softened, edgeBlend);
}

function crustSeamBlendStrength(world: WorldBrain, index: number): number {
  const cell = world.cells[index];
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 0;

  let plateEdges = 0;
  let provinceEdges = 0;
  let skeletonEdges = 0;
  let gradient = 0;
  for (const neighborIndex of neighbors) {
    const n = world.cells[neighborIndex];
    if (n.plateId !== cell.plateId) plateEdges++;
    if (n.crustProvince !== cell.crustProvince) provinceEdges++;
    if (n.continentId !== cell.continentId || n.oceanBasinId !== cell.oceanBasinId) skeletonEdges++;
    gradient += Math.abs(clamp01(n.continentality) - clamp01(cell.continentality));
    gradient += Math.abs(clamp01(n.continentCoreStrength) - clamp01(cell.continentCoreStrength)) * 0.55;
    gradient += Math.abs(clamp01(n.shelfStrength) - clamp01(cell.shelfStrength)) * 0.35;
  }

  const causedIsland = isCausedIslandCell(cell) ? 0.45 : 1;
  return clamp01(
    (plateEdges / neighbors.length * 0.34 +
      provinceEdges / neighbors.length * 0.26 +
      skeletonEdges / neighbors.length * 0.18 +
      gradient / neighbors.length * 0.26) * causedIsland,
  );
}

function crustSeamDamp(world: WorldBrain, index: number): number {
  const cell = world.cells[index];
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 1;

  let differentPlate = 0;
  let differentProvince = 0;
  for (const neighborIndex of neighbors) {
    const neighbor = world.cells[neighborIndex];
    if (neighbor.plateId !== cell.plateId) differentPlate++;
    if (neighbor.crustProvince !== cell.crustProvince) differentProvince++;
  }

  const plateEdge = differentPlate / neighbors.length;
  const provinceEdge = differentProvince / neighbors.length;
  return lerp(1, 0.65, clamp01(plateEdge * 0.60 + provinceEdge * 0.28));
}

function landNeighborFractionByHeight(world: WorldBrain, index: number, seaLevel: number, heights: number[]): number {
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 0;
  let land = 0;
  for (const neighbor of neighbors) if (heights[neighbor] >= seaLevel) land++;
  return land / neighbors.length;
}

function isCausedIslandCell(cell: Cell): boolean {
  return (
    cell.islandCause === IslandCause.ISLAND_ARC ||
    cell.islandCause === IslandCause.VOLCANIC_HOTSPOT ||
    cell.islandCause === IslandCause.RIFT_FRAGMENT ||
    cell.islandCause === IslandCause.SHELF_ISLAND ||
    cell.islandCause === IslandCause.CONTINENTAL_FRAGMENT ||
    cell.crustProvince === CrustProvince.ISLAND_ARC ||
    cell.crustProvince === CrustProvince.VOLCANIC_PROVINCE ||
    cell.crustProvince === CrustProvince.RIFT_MARGIN ||
    cell.volcanicActivity > 0.42 ||
    cell.boundaryType === BoundaryType.CONVERGENT ||
    (cell.crustThickness > 0.68 && cell.crustAge > 0.58)
  );
}

function neighborIndices4(world: WorldBrain, index: number): number[] {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  const neighbors = [
    row * world.gridWidth + ((col - 1 + world.gridWidth) % world.gridWidth),
    row * world.gridWidth + ((col + 1) % world.gridWidth),
  ];
  if (row > 0) neighbors.push((row - 1) * world.gridWidth + col);
  if (row < world.gridHeight - 1) neighbors.push((row + 1) * world.gridWidth + col);
  return neighbors;
}

function totalHeight(cell: Cell): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
}

function numeric(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function centeredJitter(seed: number, index: number, salt: number): number {
  return deterministicJitter(seed, index, salt) * 2 - 1;
}

function deterministicJitter(seed: number, index: number, salt: number): number {
  let h = seed ^ Math.imul(index + 1, 374761393) ^ Math.imul(salt + 1, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

function seedToUint32(s: string | number): number {
  if (typeof s === 'number') return s >>> 0;
  let h = 2166136261 >>> 0;
  for (let i = 0; i < String(s).length; i++) {
    h ^= String(s).charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) & 0xffffffff;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / Math.max(1e-9, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp(value: number, lo: number, hi: number): number {
  return value < lo ? lo : value > hi ? hi : value;
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
