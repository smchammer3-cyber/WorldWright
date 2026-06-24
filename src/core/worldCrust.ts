import {
  BoundaryType,
  ContinentMarginType,
  CrustProvince,
  IslandCause,
  OceanDepthClass,
  PlateType,
  type Cell,
  type WorldBrain,
} from './worldSchema';
import { assertNoAuthoredTerrainDeltas } from './worldLayerAuthority';
import {
  applyContinentSkeletonTerrainObedience,
  applyProvinceCoastBreakup,
  applyProvinceCoherence,
  cleanupAccidentalTinyIslands,
} from './worldCrust/index';

export {
  applyContinentSkeletonTerrainObedience,
  applyProvinceCoastBreakup,
  applyProvinceCoherence,
  cleanupAccidentalTinyIslands,
} from './worldCrust/index';

type CrustTopologyStage = 'province-delta';

export function seedCrustFields(world: WorldBrain): void {
  if (!world?.cells?.length) return;

  const seed = seedToUint32(world.metadata?.seed ?? world.parameters?.seed ?? 0);
  const planetAge01 = numeric01((world.parameters?.planetAge as number | undefined) ?? 70, 100);

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const continental = cell.plateType === PlateType.CONTINENTAL ? 1 : 0;
    const oceanic = 1 - continental;
    const convergent = cell.boundaryType === BoundaryType.CONVERGENT ? 1 : 0;
    const divergent = cell.boundaryType === BoundaryType.DIVERGENT ? 1 : 0;
    const transform = cell.boundaryType === BoundaryType.TRANSFORM ? 1 : 0;
    const coreSignal = clamp01(cell.continentCoreStrength) * continental;
    const shelfSignal = clamp01(cell.shelfStrength) * continental;
    const plateNoise = centeredJitter(seed, cell.plateId, 2003) * 0.06;
    const cellNoise = centeredJitter(seed, i, 1001) * 0.055;

    cell.crustThickness = clamp01(
      0.46 +
        continental * 0.16 -
        oceanic * 0.11 +
        convergent * 0.075 -
        divergent * 0.075 +
        Math.max(0, cell.upliftRate) * 0.055 -
        Math.max(0, -cell.upliftRate) * 0.035 +
        coreSignal * 0.08 +
        shelfSignal * 0.025 +
        cell.volcanicActivity * 0.035 +
        plateNoise +
        cellNoise,
    );

    cell.crustAge = clamp01(
      0.22 +
        planetAge01 * 0.34 +
        cell.surfaceAge * 0.22 +
        (continental && cell.boundaryType === BoundaryType.NONE ? 0.22 : 0) +
        coreSignal * 0.055 -
        divergent * 0.26 -
        convergent * 0.12 -
        transform * 0.08 -
        oceanic * 0.10 -
        cell.volcanicActivity * 0.14 +
        centeredJitter(seed, i, 3001) * 0.06 +
        centeredJitter(seed, cell.plateId, 4001) * 0.05,
    );

    cell.crustProvince = classifyCrustProvince(cell);
  }
}

export function ensureCrustFields(world: WorldBrain): void {
  if (!world?.cells?.length) return;

  let shouldSeed = false;
  for (const cell of world.cells as Array<Cell & { crustThickness?: unknown; crustAge?: unknown; crustProvince?: unknown }>) {
    if (typeof cell.crustThickness !== 'number' || typeof cell.crustAge !== 'number') {
      shouldSeed = true;
      break;
    }
  }

  if (shouldSeed) {
    seedCrustFields(world);
    return;
  }

  for (const cell of world.cells as Array<Cell & { crustProvince?: unknown }>) {
    cell.crustThickness = clamp01(cell.crustThickness);
    cell.crustAge = clamp01(cell.crustAge);
    if (!isCrustProvince(cell.crustProvince)) cell.crustProvince = classifyCrustProvince(cell);
  }
}

export function classifyCrustProvince(cell: Cell, _height?: number, _seaLevel?: number): CrustProvince {
  const continentality = clamp01(cell.continentality);
  const shelf = clamp01(cell.shelfStrength);
  const core = clamp01(cell.continentCoreStrength);
  const thickOld = cell.crustAge > 0.66 && cell.crustThickness > 0.62;
  const thinYoung = cell.crustAge < 0.48 && cell.crustThickness < 0.60;
  const activeUplift = cell.upliftRate > 0.22;
  const activeRift = cell.upliftRate < -0.14;

  if (cell.plateType === PlateType.OCEANIC) {
    if (cell.boundaryType === BoundaryType.CONVERGENT && cell.volcanicActivity > 0.28) return CrustProvince.ISLAND_ARC;
    if (cell.volcanicActivity > 0.68) return CrustProvince.ISLAND_ARC;
    return CrustProvince.OCEANIC_BASIN;
  }

  if (cell.volcanicActivity > 0.64 && (cell.boundaryType !== BoundaryType.NONE || activeUplift || continentality > 0.42)) return CrustProvince.VOLCANIC_PROVINCE;
  if (cell.boundaryType === BoundaryType.CONVERGENT || cell.boundaryType === BoundaryType.TRANSFORM || activeUplift) return CrustProvince.MOBILE_BELT;
  if (cell.boundaryType === BoundaryType.DIVERGENT || activeRift || cell.marginType === ContinentMarginType.RIFT || thinYoung) return CrustProvince.RIFT_MARGIN;
  if (thickOld && (cell.boundaryType === BoundaryType.NONE || core > 0.52)) return CrustProvince.OLD_SHIELD;
  if (cell.marginType === ContinentMarginType.PASSIVE && shelf > 0.55 && continentality > 0.34) return CrustProvince.COASTAL_PLAIN;
  return CrustProvince.SEDIMENT_BASIN;
}

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
    const landGate = smoothstep(-0.02, 0.20, aboveSea);
    const oceanGate = 1 - smoothstep(-0.18, 0.04, aboveSea);
    const coastGate = smoothstep(-0.16, 0.08, -Math.abs(aboveSea));
    const oldStableCrust = Math.max(0, cell.crustThickness - 0.58) * Math.max(0, cell.crustAge - 0.48);
    const thinYoungCrust = Math.max(0, 0.54 - cell.crustThickness) * Math.max(0, 0.62 - cell.crustAge);
    const rough = centeredJitter(seed, i, 7019);
    const broad = centeredJitter(seed, cell.plateId * 7919 + i, 9109);
    let delta = 0;

    switch (cell.crustProvince) {
      case CrustProvince.OLD_SHIELD:
        delta += oldStableCrust * 0.16 * landGate + rough * oldStableCrust * 0.045 * landGate + broad * 0.01 * landGate;
        break;
      case CrustProvince.MOBILE_BELT:
        delta += Math.max(0.014, Math.max(0, cell.upliftRate) * 0.072) * landGate + rough * 0.03 * landGate + broad * 0.014 * landGate;
        break;
      case CrustProvince.SEDIMENT_BASIN:
        delta -= 0.016 * smoothstep(-0.05, 0.20, aboveSea);
        delta += rough * 0.008 * landGate;
        break;
      case CrustProvince.RIFT_MARGIN:
        delta += rough * 0.028 * coastGate - 0.014 * coastGate;
        break;
      case CrustProvince.COASTAL_PLAIN:
        delta -= 0.014 * smoothstep(-0.06, 0.18, aboveSea);
        delta += broad * 0.006 * coastGate;
        break;
      case CrustProvince.VOLCANIC_PROVINCE:
        delta += 0.040 * Math.max(0.35, cell.volcanicActivity) * smoothstep(-0.06, 0.14, aboveSea) + rough * 0.026;
        break;
      case CrustProvince.ISLAND_ARC:
        delta += 0.038 * Math.max(0.35, cell.volcanicActivity) * smoothstep(-0.15, 0.12, aboveSea) + rough * 0.030 * smoothstep(-0.12, 0.16, aboveSea);
        break;
      case CrustProvince.OCEANIC_BASIN:
      default:
        delta -= thinYoungCrust * 0.09 * oceanGate;
        break;
    }

    const shelfSoftening = cell.oceanDepthClass === OceanDepthClass.SHELF || cell.oceanDepthClass === OceanDepthClass.SLOPE ? (cell.crustThickness - 0.50) * 0.01 : 0;
    const rawDelta = (delta + shelfSoftening) * plateSeamDamp(world, i) * crustProvinceAuthority(cell);
    rawDeltas[i] = constrainCrustTopologyDelta(world, i, h, seaLevel, rawDelta, copy, 'province-delta');
  }

  for (let i = 0; i < world.cells.length; i++) {
    const blendedDelta = blendDeltaNearCrustSeams(world, i, rawDeltas);
    const safeDelta = constrainCrustTopologyDelta(world, i, copy[i], seaLevel, blendedDelta, copy, 'province-delta');
    world.cells[i].baseHeight = clamp(world.cells[i].baseHeight + safeDelta, -1.4, 1.5);
  }
}

function constrainCrustTopologyDelta(world: WorldBrain, index: number, heightBefore: number, seaLevel: number, delta: number, heights: number[], stage: CrustTopologyStage): number {
  if (delta === 0) return 0;
  const next = heightBefore + delta;
  const wasLand = heightBefore >= seaLevel;
  const willBeLand = next >= seaLevel;
  if (wasLand === willBeLand) return delta;

  const cell = world.cells[index];
  const landNeighbors = landNeighborFractionByHeight(world, index, seaLevel, heights);
  const waterNeighbors = 1 - landNeighbors;
  const continentality = clamp01(cell.continentality);
  const core = clamp01(cell.continentCoreStrength);
  const strongCore = continentality > 0.72 && core > 0.68;
  const attachedLand = landNeighbors >= (stage === 'skeleton-obedience' ? 0.72 : 0.62) && continentality > 0.36;
  const invalidFragment = cell.islandCause === IslandCause.INVALID_FRAGMENT || (continentality < 0.18 && cell.crustProvince === CrustProvince.OCEANIC_BASIN);
  const caused = isCausedIslandCell(cell);

  if (!wasLand && willBeLand && !(caused || strongCore || attachedLand)) return Math.max(0, seaLevel - 0.006 - heightBefore);
  if (wasLand && !willBeLand) {
    const protectedLand = caused || strongCore || continentality > 0.36 || core > 0.24 || landNeighbors >= 0.50;
    if (!(invalidFragment || (!protectedLand && waterNeighbors >= 0.72))) return Math.min(0, seaLevel + 0.006 - heightBefore);
  }
  return delta;
}

function crustProvinceAuthority(cell: Cell): number {
  switch (cell.crustProvince) {
    case CrustProvince.OLD_SHIELD:
      return clamp01(0.48 + Math.max(0, cell.crustAge - 0.58) * 0.95 + Math.max(0, cell.crustThickness - 0.58) * 0.75);
    case CrustProvince.MOBILE_BELT:
      return clamp01(0.50 + Math.max(0, cell.upliftRate) * 0.75 + (cell.boundaryType !== BoundaryType.NONE ? 0.22 : 0));
    case CrustProvince.RIFT_MARGIN:
      return clamp01(0.40 + Math.max(0, -cell.upliftRate) * 0.80 + (cell.boundaryType === BoundaryType.DIVERGENT ? 0.26 : 0) + (cell.marginType === ContinentMarginType.RIFT ? 0.16 : 0));
    case CrustProvince.COASTAL_PLAIN:
      return clamp01(0.24 + clamp01(cell.shelfStrength) * 0.36 + (cell.marginType === ContinentMarginType.PASSIVE ? 0.16 : 0));
    case CrustProvince.SEDIMENT_BASIN:
      return clamp01(0.26 + Math.max(0, 0.58 - cell.crustThickness) * 0.40 + Math.max(0, 0.62 - cell.crustAge) * 0.24);
    case CrustProvince.VOLCANIC_PROVINCE:
      return clamp01(0.48 + cell.volcanicActivity * 0.52);
    case CrustProvince.ISLAND_ARC:
      return clamp01(0.50 + cell.volcanicActivity * 0.45 + (cell.boundaryType === BoundaryType.CONVERGENT ? 0.20 : 0));
    case CrustProvince.OCEANIC_BASIN:
    default:
      return clamp01(0.42 + Math.max(0, 0.56 - cell.crustThickness) * 0.36 + Math.max(0, 0.60 - cell.crustAge) * 0.20);
  }
}

function blendDeltaNearCrustSeams(world: WorldBrain, index: number, deltas: Float32Array): number {
  const raw = deltas[index];
  if (raw === 0) return 0;
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return raw;
  let neighborSum = 0;
  for (const neighbor of neighbors) neighborSum += deltas[neighbor];
  const edgeBlend = crustSeamBlendStrength(world, index);
  return lerp(raw, raw * 0.58 + (neighborSum / neighbors.length) * 0.42, edgeBlend);
}

function crustSeamBlendStrength(world: WorldBrain, index: number): number {
  const cell = world.cells[index];
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 0;
  let plateEdges = 0;
  let provinceEdges = 0;
  for (const neighborIndex of neighbors) {
    const n = world.cells[neighborIndex];
    if (n.plateId !== cell.plateId) plateEdges++;
    if (n.crustProvince !== cell.crustProvince) provinceEdges++;
  }
  return clamp01((plateEdges / neighbors.length) * 0.42 + (provinceEdges / neighbors.length) * 0.44);
}

function plateSeamDamp(world: WorldBrain, index: number): number {
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
  return lerp(1, 0.42, clamp01((differentPlate / neighbors.length) * 0.70 + (differentProvince / neighbors.length) * 0.48));
}

function landNeighborFractionByHeight(world: WorldBrain, index: number, seaLevel: number, heights: number[]): number {
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 0;
  let land = 0;
  for (const neighbor of neighbors) if (heights[neighbor] >= seaLevel) land++;
  return land / neighbors.length;
}

function isCausedIslandCell(cell: Cell): boolean {
  return cell.islandCause === IslandCause.ISLAND_ARC || cell.islandCause === IslandCause.VOLCANIC_HOTSPOT || cell.islandCause === IslandCause.RIFT_FRAGMENT || cell.islandCause === IslandCause.SHELF_ISLAND || cell.islandCause === IslandCause.CONTINENTAL_FRAGMENT || cell.crustProvince === CrustProvince.ISLAND_ARC || cell.crustProvince === CrustProvince.VOLCANIC_PROVINCE || cell.crustProvince === CrustProvince.RIFT_MARGIN || cell.volcanicActivity > 0.42 || cell.boundaryType === BoundaryType.CONVERGENT || (cell.crustThickness > 0.68 && cell.crustAge > 0.58);
}

function neighborIndices4(world: WorldBrain, index: number): number[] {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  const neighbors = [row * world.gridWidth + ((col - 1 + world.gridWidth) % world.gridWidth), row * world.gridWidth + ((col + 1) % world.gridWidth)];
  if (row > 0) neighbors.push((row - 1) * world.gridWidth + col);
  if (row < world.gridHeight - 1) neighbors.push((row + 1) * world.gridWidth + col);
  return neighbors;
}

function isCrustProvince(value: unknown): value is CrustProvince {
  return typeof value === 'string' && Object.values(CrustProvince).includes(value as CrustProvince);
}

function totalHeight(cell: Cell): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
}

function numeric(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function numeric01(value: unknown, scale: number): number {
  return clamp01(numeric(value, 0) / scale);
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
