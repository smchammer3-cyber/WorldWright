import { ContinentMarginType, IslandCause, type WorldBrain } from '../worldSchema';
import { assertNoAuthoredTerrainDeltas } from '../worldLayerAuthority';
import { ensureCrustFields } from './index';
import {
  centeredJitter,
  clamp,
  computeCrustMaterialFields,
  isCausedIslandCell,
  materialSeamDamp,
  neighborIndices4,
  seedToUint32,
  smoothstep,
  totalHeight,
} from './materialFields';

type CrustTopologyStage = 'province-delta' | 'skeleton-obedience';
type CrustBlendMode = 'province-delta' | 'skeleton-obedience';

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
  const before = world.cells.map((cell) => totalHeight(cell));
  const deltas = new Float32Array(world.cells.length);

  for (let i = 0; i < world.cells.length; i++) {
    const h = before[i];
    const material = computeCrustMaterialFields(world, i, h, seaLevel, seed);
    const aboveSea = h - seaLevel;
    const landGate = smoothstep(-0.03, 0.20, aboveSea);
    const oceanGate = 1 - smoothstep(-0.20, 0.04, aboveSea);
    const coastGate = smoothstep(-0.16, 0.08, -Math.abs(aboveSea));

    const delta = clamp(
      (material.isostaticTargetHeight - h) * 0.16 +
        material.collisionRelief * (0.030 + material.strength * 0.025) * landGate -
        material.riftRelief * (0.026 * coastGate + 0.012 * landGate) +
        material.volcanicRelief * (0.018 + material.heat * 0.022) * smoothstep(-0.14, 0.18, aboveSea) -
        material.sedimentTendency * (0.018 * landGate + 0.010 * coastGate) -
        material.oceanSubsidence * 0.034 * oceanGate +
        material.roughness * (0.012 + material.erodibility * 0.020) * (landGate * 0.85 + coastGate * 0.45 + oceanGate * 0.18),
      -0.052,
      0.060,
    ) * materialSeamDamp(world, i);

    deltas[i] = constrainDelta(world, i, h, seaLevel, delta, before, 'province-delta');
  }

  for (let i = 0; i < world.cells.length; i++) {
    const blended = blendDeltaNearSeams(world, i, deltas, 'province-delta');
    const safe = constrainDelta(world, i, before[i], seaLevel, blended, before, 'province-delta');
    world.cells[i].baseHeight = clamp(world.cells[i].baseHeight + safe, -1.4, 1.5);
  }
}

export function applyProvinceCoastBreakup(world: WorldBrain): void {
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const seed = seedToUint32(world.metadata.seed);
  const before = world.cells.map((cell) => totalHeight(cell));

  for (let i = 0; i < world.cells.length; i++) {
    const h = before[i];
    const nearShore = smoothstep(-0.10, 0.18, h - seaLevel) * (1 - smoothstep(0.18, 0.34, h - seaLevel));
    if (nearShore <= 0) continue;
    const material = computeCrustMaterialFields(world, i, h, seaLevel, seed);
    const waterNeighbors = waterNeighborFraction(world, i, seaLevel, before);
    const edgeGate = smoothstep(0.28, 0.82, waterNeighbors);
    const notch = centeredJitter(seed, i, 11213);
    const channel = centeredJitter(seed, i + world.cells[i].plateId * 431, 14143);
    const delta = (
      -Math.max(0, -notch) * material.riftRelief * 0.032 * nearShore * edgeGate -
      Math.max(0.10, -notch) * material.sedimentTendency * 0.020 * nearShore * edgeGate +
      Math.max(0, channel) * material.erodibility * 0.012 * nearShore +
      Math.max(0, notch) * Math.max(material.collisionRelief, material.volcanicRelief) * 0.016 * nearShore
    ) * materialSeamDamp(world, i);
    if (delta !== 0) world.cells[i].baseHeight = clamp(world.cells[i].baseHeight + delta, -1.4, 1.5);
  }
}

export function applyProvinceCoherence(world: WorldBrain): void {
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const seed = seedToUint32(world.metadata.seed);
  const before = world.cells.map((cell) => totalHeight(cell));

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const aboveSea = h - seaLevel;
    const landNeighbors = landNeighborFraction(world, i, seaLevel, before);
    const waterNeighbors = 1 - landNeighbors;
    const material = computeCrustMaterialFields(world, i, h, seaLevel, seed);
    let delta = 0;
    if (h < seaLevel && landNeighbors >= 0.5) {
      delta += 0.022 * smoothstep(0.45, 1.0, landNeighbors) * Math.max(material.buoyancy, material.collisionRelief, material.volcanicRelief);
      if (cell.continentality > 0.42) delta += 0.006 * smoothstep(0.42, 0.78, cell.continentality);
    }
    if (h >= seaLevel && aboveSea < 0.16 && waterNeighbors >= 0.5) {
      delta -= 0.014 * material.sedimentTendency * smoothstep(0.45, 1.0, waterNeighbors);
      delta -= Math.max(0, -centeredJitter(seed, i, 19001)) * 0.010 * material.riftRelief * smoothstep(0.45, 1.0, waterNeighbors);
    }
    if (delta !== 0) world.cells[i].baseHeight = clamp(world.cells[i].baseHeight + delta * materialSeamDamp(world, i), -1.4, 1.5);
  }
}

export function applyContinentSkeletonTerrainObedience(world: WorldBrain): void {
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const seed = seedToUint32(world.metadata.seed);
  const before = world.cells.map((cell) => totalHeight(cell));
  const deltas = new Float32Array(world.cells.length);

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const wasLand = h >= seaLevel;
    const continentality = clamp01(cell.continentality);
    const core = clamp01(cell.continentCoreStrength);
    const shelf = clamp01(cell.shelfStrength);
    const landNeighbors = landNeighborFraction(world, i, seaLevel, before);
    const waterNeighbors = 1 - landNeighbors;
    const nearSurface = 1 - smoothstep(0.10, 0.34, Math.abs(h - seaLevel));
    const interiorLand = wasLand && landNeighbors >= 0.62;
    let delta = 0;
    if (continentality > 0.74 && core > 0.62) delta += (seaLevel + 0.020 + core * 0.045 - h) * (wasLand ? 0.18 : 0.08);
    if (interiorLand && continentality > 0.64) delta += 0.010 * smoothstep(0.64, 0.92, continentality) * (0.45 + core * 0.55);
    if (interiorLand && (cell.marginType === ContinentMarginType.COLLISION || cell.marginType === ContinentMarginType.ACTIVE)) delta += 0.012 * smoothstep(0.48, 0.88, continentality);
    if (interiorLand && cell.marginType === ContinentMarginType.RIFT && shelf > 0.42) delta -= 0.008 * nearSurface * smoothstep(0.42, 0.82, shelf);
    if (isCausedIslandCell(cell) && h > seaLevel - 0.025) delta += (cell.islandCause === IslandCause.ISLAND_ARC || cell.islandCause === IslandCause.VOLCANIC_HOTSPOT ? 0.010 : 0.006) * (0.45 + nearSurface * 0.55);
    if (cell.islandCause === IslandCause.INVALID_FRAGMENT && continentality < 0.20 && waterNeighbors >= 0.72) delta -= 0.012 * (0.50 + nearSurface * 0.50);
    if (delta !== 0) {
      const raw = clamp(delta + centeredJitter(seed, i, 26003) * 0.0025 * (wasLand ? 1 : 0.35), -0.018, 0.018) * materialSeamDamp(world, i);
      deltas[i] = constrainDelta(world, i, h, seaLevel, raw, before, 'skeleton-obedience', landNeighbors, waterNeighbors);
    }
  }

  for (let i = 0; i < world.cells.length; i++) {
    const safe = constrainDelta(world, i, before[i], seaLevel, blendDeltaNearSeams(world, i, deltas, 'skeleton-obedience'), before, 'skeleton-obedience');
    world.cells[i].baseHeight = clamp(world.cells[i].baseHeight + safe, -1.4, 1.5);
  }
}

function cleanupAccidentalTinyIslands(world: WorldBrain): void {
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  for (const component of landComponents(world, seaLevel)) {
    if (component.length > 10 || component.some((idx) => isCausedIslandCell(world.cells[idx]))) continue;
    const sink = component.length <= 4 ? 0.060 : 0.030;
    for (const idx of component) world.cells[idx].baseHeight = clamp(world.cells[idx].baseHeight - sink, -1.4, 1.5);
  }
}

function constrainDelta(world: WorldBrain, index: number, h: number, seaLevel: number, delta: number, heights: number[], stage: CrustTopologyStage, landN?: number, waterN?: number): number {
  if (delta === 0) return 0;
  const next = h + delta;
  const wasLand = h >= seaLevel;
  const willBeLand = next >= seaLevel;
  if (wasLand === willBeLand) return delta;
  const cell = world.cells[index];
  const landNeighbors = landN ?? landNeighborFraction(world, index, seaLevel, heights);
  const waterNeighbors = waterN ?? (1 - landNeighbors);
  const continentality = clamp01(cell.continentality);
  const core = clamp01(cell.continentCoreStrength);
  const caused = isCausedIslandCell(cell);
  const strongCore = continentality > 0.72 && core > 0.68;
  const attachedLand = landNeighbors >= (stage === 'skeleton-obedience' ? 0.72 : 0.62) && continentality > 0.36;
  const invalidFragment = cell.islandCause === IslandCause.INVALID_FRAGMENT || (continentality < 0.18 && cell.plateType === 'OCEANIC' && cell.shelfStrength < 0.20);
  if (!wasLand && willBeLand && !(caused || strongCore || attachedLand)) return Math.max(0, seaLevel - 0.006 - h);
  if (wasLand && !willBeLand) {
    const protectedLand = caused || strongCore || continentality > 0.36 || core > 0.24 || landNeighbors >= 0.50;
    if (!(invalidFragment || (!protectedLand && waterNeighbors >= 0.72))) return Math.min(0, seaLevel + 0.006 - h);
  }
  return delta;
}

function blendDeltaNearSeams(world: WorldBrain, index: number, deltas: Float32Array, mode: CrustBlendMode): number {
  const raw = deltas[index];
  if (raw === 0) return 0;
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return raw;
  const avg = neighbors.reduce((sum, n) => sum + deltas[n], 0) / neighbors.length;
  const softened = raw * 0.58 + avg * 0.42;
  return raw + (softened - raw) * seamBlendStrength(world, index, mode);
}

function seamBlendStrength(world: WorldBrain, index: number, mode: CrustBlendMode): number {
  const cell = world.cells[index];
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 0;
  let plate = 0;
  let skeleton = 0;
  let gradient = 0;
  for (const nIdx of neighbors) {
    const n = world.cells[nIdx];
    if (n.plateId !== cell.plateId) plate++;
    if (n.continentId !== cell.continentId || n.oceanBasinId !== cell.oceanBasinId) skeleton++;
    gradient += Math.abs(clamp01(n.continentality) - clamp01(cell.continentality));
    gradient += Math.abs(clamp01(n.crustThickness) - clamp01(cell.crustThickness)) * 0.30;
    gradient += Math.abs(clamp01(n.crustAge) - clamp01(cell.crustAge)) * 0.18;
  }
  return clamp01((plate / neighbors.length) * 0.38 + (skeleton / neighbors.length) * (mode === 'skeleton-obedience' ? 0.38 : 0.22) + (gradient / neighbors.length) * 0.46);
}

function landNeighborFraction(world: WorldBrain, index: number, seaLevel: number, heights: number[]): number {
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 0;
  return neighbors.filter((n) => heights[n] >= seaLevel).length / neighbors.length;
}

function waterNeighborFraction(world: WorldBrain, index: number, seaLevel: number, heights: number[]): number {
  return 1 - landNeighborFraction(world, index, seaLevel, heights);
}

function landComponents(world: WorldBrain, seaLevel: number): number[][] {
  const visited = new Uint8Array(world.cells.length);
  const out: number[][] = [];
  for (let i = 0; i < world.cells.length; i++) {
    if (visited[i] || totalHeight(world.cells[i]) < seaLevel) continue;
    const component: number[] = [];
    const queue = [i];
    visited[i] = 1;
    for (let head = 0; head < queue.length; head++) {
      const current = queue[head];
      component.push(current);
      for (const n of neighborIndices4(world, current)) if (!visited[n] && totalHeight(world.cells[n]) >= seaLevel) { visited[n] = 1; queue.push(n); }
    }
    out.push(component);
  }
  return out;
}

function numeric(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
