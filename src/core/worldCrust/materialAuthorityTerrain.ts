import {
  BoundaryType,
  ContinentMarginType,
  IslandCause,
  type Cell,
  type WorldBrain,
} from '../worldSchema';
import { assertNoAuthoredTerrainDeltas } from '../worldLayerAuthority';
import { ensureCrustFields } from './index';

type MaterialTerrainStage = 'crust-material-delta' | 'crust-coast-shape' | 'crust-coherence';

export function applyCrustProvinceTerrainDelta(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyCrustProvinceTerrainDelta');
  ensureCrustFields(world);

  const seed = seedToUint32(world.metadata.seed);
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const before = world.cells.map((cell) => totalHeight(cell));
  const rawDeltas = new Float32Array(world.cells.length);

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const aboveSea = h - seaLevel;
    const landGate = smoothstep(-0.02, 0.20, aboveSea);
    const oceanGate = 1 - smoothstep(-0.18, 0.04, aboveSea);
    const coastGate = smoothstep(-0.16, 0.08, -Math.abs(aboveSea));
    const material = materialSignals(cell);
    const rough = centeredJitter(seed, i, 7019);
    const broad = smoothMaterialTexture(seed, world, i, 9109);
    const seamDamp = materialSeamDamp(world, i);

    let delta = 0;
    delta += material.stableCore * 0.18 * landGate;
    delta += material.activeUplift * 0.080 * landGate;
    delta += material.volcanicRelief * 0.052 * smoothstep(-0.10, 0.16, aboveSea);
    delta += rough * (material.stableCore * 0.055 + material.activeUplift * 0.030 + material.volcanicRelief * 0.030) * Math.max(landGate, coastGate * 0.65);
    delta += broad * (0.010 + material.materialEnergy * 0.010) * landGate;

    delta -= material.sedimentTendency * 0.032 * smoothstep(-0.05, 0.20, aboveSea);
    delta -= material.riftTendency * 0.024 * coastGate;
    delta += rough * material.riftTendency * 0.030 * coastGate;
    delta -= material.thinYoungCrust * 0.110 * oceanGate;
    delta += material.shelfSupport * 0.014 * coastGate;

    const rawDelta = clamp(delta * seamDamp, -0.060, 0.070);
    rawDeltas[i] = constrainMaterialTopologyDelta(world, i, h, seaLevel, rawDelta, before, 'crust-material-delta');
  }

  for (let i = 0; i < world.cells.length; i++) {
    const blendedDelta = blendMaterialDelta(world, i, rawDeltas);
    const safeDelta = constrainMaterialTopologyDelta(world, i, before[i], seaLevel, blendedDelta, before, 'crust-material-delta');
    if (safeDelta !== 0) world.cells[i].baseHeight = clamp(world.cells[i].baseHeight + safeDelta, -1.4, 1.5);
  }
}

export function applyProvinceCoastBreakup(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyProvinceCoastBreakup');
  ensureCrustFields(world);

  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const seed = seedToUint32(world.metadata.seed);
  const before = world.cells.map((cell) => totalHeight(cell));

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const aboveSea = h - seaLevel;
    const nearShore = smoothstep(-0.10, 0.18, aboveSea) * (1 - smoothstep(0.18, 0.34, aboveSea));
    if (nearShore <= 0) continue;

    const waterNeighbors = waterNeighborFractionByHeight(world, i, seaLevel, before);
    const landNeighbors = 1 - waterNeighbors;
    const edgeGate = smoothstep(0.28, 0.82, waterNeighbors);
    const notch = centeredJitter(seed, i, 11213);
    const channel = smoothMaterialTexture(seed, world, i, 14143);
    const material = materialSignals(cell);
    const seamDamp = materialSeamDamp(world, i);

    let delta = 0;
    delta -= Math.max(0, -notch) * (0.012 + material.riftTendency * 0.022 + material.sedimentTendency * 0.018) * nearShore * edgeGate;
    delta += Math.max(0, channel) * (0.008 + material.riftTendency * 0.012) * nearShore * smoothstep(0.25, 0.85, waterNeighbors);
    delta += Math.max(0, notch) * (material.activeUplift * 0.018 + material.volcanicRelief * 0.018) * nearShore * smoothstep(0.24, 0.80, landNeighbors);

    if (delta !== 0) {
      const safe = constrainMaterialTopologyDelta(world, i, h, seaLevel, delta * seamDamp, before, 'crust-coast-shape', landNeighbors, waterNeighbors);
      if (safe !== 0) world.cells[i].baseHeight = clamp(world.cells[i].baseHeight + safe, -1.4, 1.5);
    }
  }
}

export function applyProvinceCoherence(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyProvinceCoherence');
  ensureCrustFields(world);

  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const seed = seedToUint32(world.metadata.seed);
  const before = world.cells.map((cell) => totalHeight(cell));

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const aboveSea = h - seaLevel;
    const landNeighbors = landNeighborFractionByHeight(world, i, seaLevel, before);
    const waterNeighbors = 1 - landNeighbors;
    const local = centeredJitter(seed, i, 19001);
    const material = materialSignals(cell);
    const seamDamp = materialSeamDamp(world, i);

    let delta = 0;

    if (h < seaLevel && landNeighbors >= 0.5) {
      const fillSignal = clamp01(material.stableCore + material.activeUplift * 0.65 + material.volcanicRelief * 0.45 + material.shelfSupport * 0.25);
      delta += fillSignal * 0.028 * smoothstep(0.45, 1.0, landNeighbors);
      if (landNeighbors >= 0.78) delta += material.shelfSupport * 0.010;
    }

    if (h >= seaLevel && aboveSea < 0.16 && waterNeighbors >= 0.5) {
      const trimSignal = clamp01(material.sedimentTendency + material.riftTendency * 0.80 + material.thinYoungCrust * 0.35);
      delta -= trimSignal * 0.016 * smoothstep(0.45, 1.0, waterNeighbors);
      delta -= Math.max(0, -local) * material.riftTendency * 0.010 * smoothstep(0.45, 1.0, waterNeighbors);
    }

    if (delta !== 0) {
      const safe = constrainMaterialTopologyDelta(world, i, h, seaLevel, delta * seamDamp, before, 'crust-coherence', landNeighbors, waterNeighbors);
      if (safe !== 0) world.cells[i].baseHeight = clamp(world.cells[i].baseHeight + safe, -1.4, 1.5);
    }
  }
}

function materialSignals(cell: Cell): {
  stableCore: number;
  activeUplift: number;
  volcanicRelief: number;
  sedimentTendency: number;
  riftTendency: number;
  thinYoungCrust: number;
  shelfSupport: number;
  materialEnergy: number;
} {
  const thickness = clamp01(cell.crustThickness);
  const age = clamp01(cell.crustAge);
  const continentality = clamp01(cell.continentality);
  const core = clamp01(cell.continentCoreStrength);
  const shelf = clamp01(cell.shelfStrength);
  const uplift = typeof cell.upliftRate === 'number' ? cell.upliftRate : 0;
  const volcanic = clamp01(cell.volcanicActivity);

  const boundaryUplift = cell.boundaryType === BoundaryType.CONVERGENT
    ? 0.34
    : cell.boundaryType === BoundaryType.TRANSFORM
      ? 0.14
      : 0;
  const marginUplift = cell.marginType === ContinentMarginType.COLLISION || cell.marginType === ContinentMarginType.ACTIVE ? 0.20 : 0;
  const riftBoundary = cell.boundaryType === BoundaryType.DIVERGENT ? 0.38 : 0;
  const riftMargin = cell.marginType === ContinentMarginType.RIFT ? 0.32 : 0;

  const stableCore = clamp01(Math.max(0, thickness - 0.56) * Math.max(0, age - 0.46) * (0.55 + continentality * 0.45 + core * 0.35));
  const activeUplift = clamp01(Math.max(0, uplift) * 0.75 + boundaryUplift + marginUplift);
  const volcanicRelief = clamp01(volcanic * (0.55 + activeUplift * 0.35));
  const thinYoungCrust = clamp01(Math.max(0, 0.56 - thickness) * Math.max(0, 0.64 - age));
  const riftTendency = clamp01(Math.max(0, -uplift) * 0.65 + riftBoundary + riftMargin + thinYoungCrust * 0.55);
  const sedimentTendency = clamp01((1 - core) * Math.max(0, 0.64 - age) * (0.35 + shelf * 0.35 + (1 - continentality) * 0.30));
  const shelfSupport = clamp01(shelf * Math.max(0, thickness - 0.48) * (0.75 + continentality * 0.25));
  const materialEnergy = clamp01(stableCore + activeUplift + volcanicRelief + riftTendency * 0.5 + shelfSupport * 0.35);

  return {
    stableCore,
    activeUplift,
    volcanicRelief,
    sedimentTendency,
    riftTendency,
    thinYoungCrust,
    shelfSupport,
    materialEnergy,
  };
}

function constrainMaterialTopologyDelta(
  world: WorldBrain,
  index: number,
  heightBefore: number,
  seaLevel: number,
  delta: number,
  heights: number[],
  stage: MaterialTerrainStage,
  precomputedLandNeighbors?: number,
  precomputedWaterNeighbors?: number,
): number {
  if (delta === 0) return 0;

  const next = heightBefore + delta;
  const wasLand = heightBefore >= seaLevel;
  const willBeLand = next >= seaLevel;
  if (wasLand === willBeLand) return clampStageDelta(delta, stage);

  const cell = world.cells[index];
  const landNeighbors = precomputedLandNeighbors ?? landNeighborFractionByHeight(world, index, seaLevel, heights);
  const waterNeighbors = precomputedWaterNeighbors ?? (1 - landNeighbors);
  const continentality = clamp01(cell.continentality);
  const core = clamp01(cell.continentCoreStrength);
  const material = materialSignals(cell);
  const caused = isCausedIslandCell(cell);
  const volcanicArc = cell.volcanicActivity > 0.55 && cell.boundaryType === BoundaryType.CONVERGENT;
  const strongCore = continentality > 0.70 && core > 0.58;
  const attachedLand = landNeighbors >= (stage === 'crust-coherence' ? 0.58 : 0.62) && (continentality > 0.34 || material.shelfSupport > 0.20);
  const invalidFragment = cell.islandCause === IslandCause.INVALID_FRAGMENT || (continentality < 0.18 && material.thinYoungCrust > 0.04 && waterNeighbors >= 0.68);

  if (!wasLand && willBeLand) {
    const allowNewLand = caused || volcanicArc || strongCore || attachedLand;
    if (!allowNewLand) return Math.max(0, seaLevel - 0.006 - heightBefore);
  }

  if (wasLand && !willBeLand) {
    const protectedLand = caused || strongCore || continentality > 0.36 || core > 0.24 || landNeighbors >= 0.50;
    const allowSinkLand = invalidFragment || (!protectedLand && waterNeighbors >= 0.72);
    if (!allowSinkLand) return Math.min(0, seaLevel + 0.006 - heightBefore);
  }

  return clampStageDelta(delta, stage);
}

function clampStageDelta(delta: number, stage: MaterialTerrainStage): number {
  if (stage === 'crust-coast-shape') return clamp(delta, -0.045, 0.045);
  if (stage === 'crust-coherence') return clamp(delta, -0.035, 0.040);
  return clamp(delta, -0.060, 0.070);
}

function blendMaterialDelta(world: WorldBrain, index: number, deltas: Float32Array): number {
  const raw = deltas[index];
  if (raw === 0) return 0;

  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return raw;

  let neighborSum = 0;
  let neighborCount = 0;
  for (const neighbor of neighbors) {
    neighborSum += deltas[neighbor];
    neighborCount++;
  }
  if (neighborCount === 0) return raw;

  const neighborAverage = neighborSum / neighborCount;
  const edgeBlend = materialSeamBlendStrength(world, index);
  const softened = raw * 0.62 + neighborAverage * 0.38;
  return lerp(raw, softened, edgeBlend);
}

function materialSeamDamp(world: WorldBrain, index: number): number {
  return lerp(1, 0.62, materialSeamBlendStrength(world, index));
}

function materialSeamBlendStrength(world: WorldBrain, index: number): number {
  const cell = world.cells[index];
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 0;

  let gradient = 0;
  for (const neighborIndex of neighbors) {
    const neighbor = world.cells[neighborIndex];
    gradient += Math.abs(clamp01(neighbor.continentality) - clamp01(cell.continentality));
    gradient += Math.abs(clamp01(neighbor.continentCoreStrength) - clamp01(cell.continentCoreStrength)) * 0.50;
    gradient += Math.abs(clamp01(neighbor.shelfStrength) - clamp01(cell.shelfStrength)) * 0.36;
    gradient += Math.abs(clamp01(neighbor.crustThickness) - clamp01(cell.crustThickness)) * 0.36;
    gradient += Math.abs(clamp01(neighbor.crustAge) - clamp01(cell.crustAge)) * 0.22;
  }

  return clamp01(gradient / neighbors.length * 0.34);
}

function smoothMaterialTexture(seed: number, world: WorldBrain, index: number, salt: number): number {
  const neighbors = neighborIndices4(world, index);
  let sum = centeredJitter(seed, index, salt) * 2.0;
  let weight = 2.0;
  for (const neighbor of neighbors) {
    sum += centeredJitter(seed, neighbor, salt);
    weight += 1;
  }
  return clamp(sum / weight, -1, 1);
}

function landNeighborFractionByHeight(world: WorldBrain, index: number, seaLevel: number, heights: number[]): number {
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 0;
  let land = 0;
  for (const neighbor of neighbors) if (heights[neighbor] >= seaLevel) land++;
  return land / neighbors.length;
}

function waterNeighborFractionByHeight(world: WorldBrain, index: number, seaLevel: number, heights: number[]): number {
  return 1 - landNeighborFractionByHeight(world, index, seaLevel, heights);
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

function isCausedIslandCell(cell: Cell): boolean {
  return (
    cell.islandCause === IslandCause.ISLAND_ARC ||
    cell.islandCause === IslandCause.VOLCANIC_HOTSPOT ||
    cell.islandCause === IslandCause.RIFT_FRAGMENT ||
    cell.islandCause === IslandCause.SHELF_ISLAND ||
    cell.islandCause === IslandCause.CONTINENTAL_FRAGMENT ||
    cell.volcanicActivity > 0.42 ||
    cell.boundaryType === BoundaryType.CONVERGENT ||
    (cell.crustThickness > 0.68 && cell.crustAge > 0.58)
  );
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
