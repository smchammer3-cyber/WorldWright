import { ContinentMarginType, IslandCause, type Cell, type WorldBrain } from '../worldSchema';
import { recomputeWorld } from '../worldRecompute';
import { applyGeneratedWorldQualityPass } from '../worldQualityPass';
import { seedContinentSkeletonFields } from '../worldContinents';
import { applyCrustTerrainInfluence, seedCrustFields } from '../worldCrust';
import { applyOceanBathymetrySmoothing } from '../worldOceanBathymetry';
import { applyPlateBoundaryFeatureTerrain } from '../worldPlateBoundaryFeatures';
import { applyIsostaticTerrainResponse } from '../worldTerrainResponse';
import { assertNoAuthoredTerrainDeltas } from '../worldLayerAuthority';

export function applyGeneratedGeographyPipeline(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyGeneratedGeographyPipeline');
  seedContinentSkeletonFields(world);
  applyPlateBoundaryFeatureTerrain(world);
  applySkeletonBaseElevation(world);
  recomputeWorld(world, ['GENERATED']);
  applyGeneratedWorldQualityPass(world);
  recomputeWorld(world, ['GENERATED']);
  seedContinentSkeletonFields(world);
  seedCrustFields(world);
  applyIsostaticTerrainResponse(world);
  applyCrustTerrainInfluence(world);
  applyOceanBathymetrySmoothing(world);
  recomputeWorld(world, ['GENERATED']);
  seedContinentSkeletonFields(world);
  seedCrustFields(world);
}

export function applySkeletonBaseElevation(world: WorldBrain): void {
  assertNoAuthoredTerrainDeltas(world, 'applySkeletonBaseElevation');
  const seaLevel = typeof world.seaLevel === 'number' ? world.seaLevel : world.metadata?.seaLevel ?? 0;
  const source = world.cells.map((cell) => totalHeight(cell));
  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = source[i];
    const aboveSea = h - seaLevel;
    const wasLand = aboveSea >= 0;
    const continentality = clamp01(cell.continentality);
    const core = clamp01(cell.continentCoreStrength);
    const shelf = clamp01(cell.shelfStrength);
    const localLand = localFractionAboveSea(world, source, i, seaLevel, 4);
    const tightLand = localFractionAboveSea(world, source, i, seaLevel, 1);
    const skeletonContinuity = skeletonAuthorityContinuity(world, i);
    const nearSurface = 1 - smoothstep(0.10, 0.46, Math.abs(aboveSea));
    let target = h;
    let strength = 0;
    if (continentality > 0.62) {
      const coreTarget = seaLevel + 0.052 + continentality * 0.048 + core * 0.082;
      target = blendTarget(target, coreTarget, 0.30 + core * 0.14);
      strength = Math.max(strength, 0.20 + core * 0.12);
    } else if (continentality > 0.38) {
      const marginTarget = seaLevel + 0.014 + (continentality - 0.38) * 0.060 - shelf * 0.014;
      target = blendTarget(target, marginTarget, 0.18 + nearSurface * 0.08);
      strength = Math.max(strength, 0.12 + nearSurface * 0.06);
    } else {
      const basinTarget = seaLevel - 0.052 - (1 - continentality) * 0.115;
      const attachedLandProtection = wasLand ? smoothstep(0.32, 0.72, Math.max(localLand, tightLand)) : 0;
      const basinPull = (0.14 + nearSurface * 0.06) * lerp(1, 0.34, attachedLandProtection);
      target = blendTarget(target, basinTarget, basinPull);
      strength = Math.max(strength, (0.10 + nearSurface * 0.06) * lerp(1, 0.45, attachedLandProtection));
    }
    if (shelf > 0.30 && core < 0.70) {
      const shelfTarget = seaLevel - 0.024 + shelf * 0.018;
      const shelfPull = wasLand ? 0.10 * shelf : 0.18 * shelf;
      const attachedLandProtection = wasLand ? smoothstep(0.40, 0.82, Math.max(localLand, tightLand)) : 0;
      target = blendTarget(target, shelfTarget, shelfPull * lerp(1, 0.40, attachedLandProtection));
      strength = Math.max(strength, (0.10 + shelf * 0.06) * lerp(1, 0.65, attachedLandProtection));
    }
    switch (cell.marginType) {
      case ContinentMarginType.COLLISION:
      case ContinentMarginType.ACTIVE:
        target += 0.032 * smoothstep(0.32, 0.82, continentality);
        strength = Math.max(strength, 0.20);
        break;
      case ContinentMarginType.RIFT:
        target -= 0.032 * (0.35 + nearSurface * 0.45) * (1 - core * 0.45) * lerp(1, 0.42, smoothstep(0.38, 0.78, tightLand));
        strength = Math.max(strength, 0.16 * lerp(1, 0.60, smoothstep(0.38, 0.78, tightLand)));
        break;
      case ContinentMarginType.PASSIVE:
        target -= 0.008 * shelf * lerp(1, 0.50, smoothstep(0.42, 0.82, tightLand));
        strength = Math.max(strength, 0.10);
        break;
      default:
        break;
    }
    const invalidFragment = cell.islandCause === IslandCause.INVALID_FRAGMENT && continentality < 0.22 && shelf < 0.28;
    if (invalidFragment) {
      target = Math.min(target, seaLevel - 0.090);
      strength = Math.max(strength, 0.34);
    } else if (cell.islandCause === IslandCause.ISLAND_ARC || cell.islandCause === IslandCause.VOLCANIC_HOTSPOT) {
      target = Math.max(target, seaLevel + 0.018);
      strength = Math.max(strength, 0.20);
    }
    let delta = (target - h) * clamp01(strength);
    if (delta < 0 && wasLand && !invalidFragment) {
      const landProtection = clamp01(0.38 * smoothstep(0.20, 0.80, localLand) + 0.30 * smoothstep(0.24, 0.70, continentality) + 0.22 * smoothstep(0.25, 0.80, tightLand) + 0.24 * core);
      delta *= lerp(1.0, 0.18, landProtection);
      delta = Math.max(delta, -0.026);
    }
    if (wasLand && h + delta < seaLevel && !canSkeletonSinkLand(cell, localLand, tightLand, continentality, shelf, core, invalidFragment)) delta = Math.max(delta, seaLevel + 0.006 - h);
    if (delta > 0 && !wasLand && continentality < 0.26 && shelf < 0.24 && !isCausedIsland(cell)) delta *= 0.35;
    if (!wasLand && h + delta >= seaLevel && !canSkeletonRaiseWater(cell, localLand, tightLand, continentality, shelf, core)) delta = Math.min(delta, seaLevel - 0.006 - h);
    delta *= lerp(0.70, 1, skeletonContinuity) * skeletonSeamDamp(world, i);
    delta = capSkeletonDelta(delta, cell, skeletonContinuity, invalidFragment);
    cell.baseHeight = clamp(cell.baseHeight + delta, -1.4, 1.5);
  }
}

function canSkeletonSinkLand(cell: Cell, localLand: number, tightLand: number, continentality: number, shelf: number, core: number, invalidFragment: boolean): boolean {
  if (invalidFragment) return true;
  if (isCausedIsland(cell)) return false;
  if (core > 0.24 || continentality > 0.34 || shelf > 0.36) return false;
  return localLand < 0.34 && tightLand < 0.38;
}

function canSkeletonRaiseWater(cell: Cell, localLand: number, tightLand: number, continentality: number, shelf: number, core: number): boolean {
  if (isCausedIsland(cell)) return true;
  if (continentality > 0.70 && core > 0.56) return true;
  if (continentality > 0.46 && shelf > 0.42 && Math.max(localLand, tightLand) >= 0.34) return true;
  return false;
}

function totalHeight(cell: Cell): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
}

function localFractionAboveSea(world: WorldBrain, heights: number[], index: number, seaLevel: number, radius: number): number {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  let land = 0;
  let total = 0;
  for (let dr = -radius; dr <= radius; dr++) {
    const r = row + dr;
    if (r < 0 || r >= world.gridHeight) continue;
    for (let dc = -radius; dc <= radius; dc++) {
      const c = (col + dc + world.gridWidth) % world.gridWidth;
      total++;
      if (heights[r * world.gridWidth + c] >= seaLevel) land++;
    }
  }
  return total > 0 ? land / total : 0;
}

function skeletonAuthorityContinuity(world: WorldBrain, index: number): number {
  const cell = world.cells[index];
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 1;
  let mismatch = 0;
  for (const neighborIndex of neighbors) {
    const n = world.cells[neighborIndex];
    if (n.plateId !== cell.plateId) mismatch += 0.26;
    if (n.continentId !== cell.continentId || n.oceanBasinId !== cell.oceanBasinId) mismatch += 0.30;
    if (n.marginType !== cell.marginType || n.islandCause !== cell.islandCause) mismatch += 0.14;
    mismatch += Math.abs(clamp01(n.continentality) - clamp01(cell.continentality)) * 0.34;
    mismatch += Math.abs(clamp01(n.continentCoreStrength) - clamp01(cell.continentCoreStrength)) * 0.22;
    mismatch += Math.abs(clamp01(n.shelfStrength) - clamp01(cell.shelfStrength)) * 0.16;
  }
  return 1 - clamp01(mismatch / neighbors.length);
}

function capSkeletonDelta(delta: number, cell: Cell, continuity: number, invalidFragment: boolean): number {
  if (invalidFragment) return clamp(delta, -0.085, 0.060);
  if (isCausedIsland(cell)) return clamp(delta, -0.040, 0.060);
  const core = clamp01(cell.continentCoreStrength);
  const continentality = clamp01(cell.continentality);
  const shelf = clamp01(cell.shelfStrength);
  const marginBoost = cell.marginType === ContinentMarginType.NONE ? 0 : 0.010;
  const positiveCap = lerp(0.026, 0.052, continuity) + core * 0.030 + marginBoost;
  const negativeCap = lerp(0.024, 0.044, continuity) + (1 - continentality) * 0.014 + shelf * 0.010 + marginBoost;
  return delta > 0 ? Math.min(delta, positiveCap) : Math.max(delta, -negativeCap);
}

function skeletonSeamDamp(world: WorldBrain, index: number): number {
  const cell = world.cells[index];
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 1;
  let plateEdges = 0;
  let identityEdges = 0;
  let marginEdges = 0;
  let gradient = 0;
  for (const neighborIndex of neighbors) {
    const n = world.cells[neighborIndex];
    if (n.plateId !== cell.plateId) plateEdges++;
    if (n.continentId !== cell.continentId || n.oceanBasinId !== cell.oceanBasinId) identityEdges++;
    if (n.marginType !== cell.marginType || n.islandCause !== cell.islandCause) marginEdges++;
    gradient += Math.abs(clamp01(n.continentality) - clamp01(cell.continentality));
    gradient += Math.abs(clamp01(n.continentCoreStrength) - clamp01(cell.continentCoreStrength)) * 0.65;
    gradient += Math.abs(clamp01(n.shelfStrength) - clamp01(cell.shelfStrength)) * 0.45;
  }
  const edgeStrength = clamp01((plateEdges / neighbors.length) * 0.46 + (identityEdges / neighbors.length) * 0.50 + (marginEdges / neighbors.length) * 0.20 + (gradient / neighbors.length) * 0.50);
  return lerp(1, 0.40, edgeStrength * (isCausedIsland(cell) ? 0.45 : 1));
}

function neighborIndices4(world: WorldBrain, index: number): number[] {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  const neighbors = [row * world.gridWidth + ((col - 1 + world.gridWidth) % world.gridWidth), row * world.gridWidth + ((col + 1) % world.gridWidth)];
  if (row > 0) neighbors.push((row - 1) * world.gridWidth + col);
  if (row < world.gridHeight - 1) neighbors.push((row + 1) * world.gridWidth + col);
  return neighbors;
}

function isCausedIsland(cell: Cell): boolean {
  return cell.islandCause === IslandCause.ISLAND_ARC || cell.islandCause === IslandCause.VOLCANIC_HOTSPOT || cell.islandCause === IslandCause.RIFT_FRAGMENT || cell.islandCause === IslandCause.SHELF_ISLAND || cell.islandCause === IslandCause.CONTINENTAL_FRAGMENT;
}

function blendTarget(currentTarget: number, nextTarget: number, amount: number): number {
  const t = clamp01(amount);
  return currentTarget * (1 - t) + nextTarget * t;
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
