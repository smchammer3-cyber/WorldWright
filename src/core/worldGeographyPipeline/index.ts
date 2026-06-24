import {
  ContinentMarginType,
  IslandCause,
  type Cell,
  type WorldBrain,
} from '../worldSchema';
import { recomputeWorld } from '../worldRecompute';
import { applyGeneratedWorldQualityPass } from '../worldQualityPass';
import { seedContinentSkeletonFields } from '../worldContinents';
import { applyCrustTerrainInfluence, seedCrustFields } from '../worldCrust';
import { assertNoAuthoredTerrainDeltas } from '../worldLayerAuthority';

/**
 * Authoritative generated-world geography order.
 *
 * This is intentionally separate from recomputeWorld. Recompute derives water,
 * climate, rivers, snow, and biomes from the existing terrain. This pipeline is
 * the generated-world geography constructor: it gives continent/ocean skeletons
 * authority before crust provinces and cleanup try to refine the surface.
 *
 * Generate-only authority guard:
 * This pipeline mutates baseHeight. It must never run after Create Mode or Sim
 * Mode have written editHeightDelta/simHeightDelta, otherwise it could collapse
 * authored/simulated terrain into the generated base layer.
 */
export function applyGeneratedGeographyPipeline(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyGeneratedGeographyPipeline');

  seedContinentSkeletonFields(world);
  applySkeletonBaseElevation(world);
  recomputeWorld(world, ['GENERATED']);

  applyGeneratedWorldQualityPass(world);
  recomputeWorld(world, ['GENERATED']);

  seedContinentSkeletonFields(world);
  seedCrustFields(world);
  applyCrustTerrainInfluence(world);
  recomputeWorld(world, ['GENERATED']);

  // Refresh diagnostic/cause fields after visible terrain obedience.
  seedContinentSkeletonFields(world);
  seedCrustFields(world);
}

/**
 * Broad skeleton-first base elevation pass.
 *
 * This pass should guide continent/ocean tendencies without becoming a hard
 * continent mask. Stage diagnostics showed the earlier version could drop land
 * coverage too aggressively and split coherent land into too many bodies, so
 * downward skeleton influence is now capped and existing coherent land gets
 * protection unless it is clearly an invalid fragment.
 *
 * Generate-only authority guard:
 * This pass reads totalHeight and writes baseHeight, so it may only run while
 * editHeightDelta and simHeightDelta are still pristine.
 */
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
    const nearSurface = 1 - smoothstep(0.10, 0.46, Math.abs(aboveSea));

    let target = h;
    let strength = 0;

    if (continentality > 0.62) {
      const coreTarget = seaLevel + 0.055 + continentality * 0.055 + core * 0.095;
      target = blendTarget(target, coreTarget, 0.34 + core * 0.18);
      strength = Math.max(strength, 0.24 + core * 0.16);
    } else if (continentality > 0.38) {
      const marginTarget = seaLevel + 0.016 + (continentality - 0.38) * 0.070 - shelf * 0.016;
      target = blendTarget(target, marginTarget, 0.22 + nearSurface * 0.10);
      strength = Math.max(strength, 0.15 + nearSurface * 0.08);
    } else {
      const basinTarget = seaLevel - 0.060 - (1 - continentality) * 0.135;
      const attachedLandProtection = wasLand ? smoothstep(0.32, 0.72, Math.max(localLand, tightLand)) : 0;
      const basinPull = (0.18 + nearSurface * 0.08) * lerp(1, 0.34, attachedLandProtection);
      target = blendTarget(target, basinTarget, basinPull);
      strength = Math.max(strength, (0.12 + nearSurface * 0.08) * lerp(1, 0.45, attachedLandProtection));
    }

    if (shelf > 0.30 && core < 0.70) {
      const shelfTarget = seaLevel - 0.026 + shelf * 0.020;
      const shelfPull = wasLand ? 0.14 * shelf : 0.24 * shelf;
      const attachedLandProtection = wasLand ? smoothstep(0.40, 0.82, Math.max(localLand, tightLand)) : 0;
      target = blendTarget(target, shelfTarget, shelfPull * lerp(1, 0.40, attachedLandProtection));
      strength = Math.max(strength, (0.12 + shelf * 0.08) * lerp(1, 0.65, attachedLandProtection));
    }

    switch (cell.marginType) {
      case ContinentMarginType.COLLISION:
      case ContinentMarginType.ACTIVE:
        target += 0.045 * smoothstep(0.32, 0.82, continentality);
        strength = Math.max(strength, 0.24);
        break;
      case ContinentMarginType.RIFT:
        target -= 0.045 * (0.35 + nearSurface * 0.45) * (1 - core * 0.45) * lerp(1, 0.42, smoothstep(0.38, 0.78, tightLand));
        strength = Math.max(strength, 0.20 * lerp(1, 0.60, smoothstep(0.38, 0.78, tightLand)));
        break;
      case ContinentMarginType.PASSIVE:
        target -= 0.010 * shelf * lerp(1, 0.50, smoothstep(0.42, 0.82, tightLand));
        strength = Math.max(strength, 0.12);
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
      const landProtection = clamp01(
        0.38 * smoothstep(0.20, 0.80, localLand) +
        0.30 * smoothstep(0.24, 0.70, continentality) +
        0.22 * smoothstep(0.25, 0.80, tightLand) +
        0.24 * core,
      );
      delta *= lerp(1.0, 0.18, landProtection);
      delta = Math.max(delta, -0.026);
    }

    const wouldFlipToWater = wasLand && h + delta < seaLevel;
    if (wouldFlipToWater && !canSkeletonSinkLand(cell, localLand, tightLand, continentality, shelf, core, invalidFragment)) {
      // Keep coherent existing land barely above water. Skeleton should guide
      // future morphology; it should not shatter raw land into fragments here.
      delta = Math.max(delta, seaLevel + 0.006 - h);
    }

    if (delta > 0 && !wasLand && continentality < 0.26 && shelf < 0.24 && !isCausedIsland(cell)) {
      delta *= 0.35;
    }

    const wouldFlipToLand = !wasLand && h + delta >= seaLevel;
    if (wouldFlipToLand && !canSkeletonRaiseWater(cell, localLand, tightLand, continentality, shelf, core)) {
      delta = Math.min(delta, seaLevel - 0.006 - h);
    }

    // The skeleton should guide broad continent/ocean tendency, not stamp hard
    // continent/ocean-basin borders into visible height. Dampen the final delta
    // near abrupt skeleton-field transitions while keeping strong interiors.
    delta *= skeletonSeamDamp(world, i);

    cell.baseHeight = clamp(cell.baseHeight + delta, -1.4, 1.5);
  }
}

function canSkeletonSinkLand(
  cell: Cell,
  localLand: number,
  tightLand: number,
  continentality: number,
  shelf: number,
  core: number,
  invalidFragment: boolean,
): boolean {
  if (invalidFragment) return true;
  if (isCausedIsland(cell)) return false;
  if (core > 0.24 || continentality > 0.34 || shelf > 0.36) return false;
  return localLand < 0.34 && tightLand < 0.38;
}

function canSkeletonRaiseWater(
  cell: Cell,
  localLand: number,
  tightLand: number,
  continentality: number,
  shelf: number,
  core: number,
): boolean {
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

function skeletonSeamDamp(world: WorldBrain, index: number): number {
  const cell = world.cells[index];
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 1;

  let identityEdges = 0;
  let marginEdges = 0;
  let gradient = 0;

  for (const neighborIndex of neighbors) {
    const n = world.cells[neighborIndex];
    if (n.continentId !== cell.continentId || n.oceanBasinId !== cell.oceanBasinId) identityEdges++;
    if (n.marginType !== cell.marginType || n.islandCause !== cell.islandCause) marginEdges++;
    gradient += Math.abs(clamp01(n.continentality) - clamp01(cell.continentality));
    gradient += Math.abs(clamp01(n.continentCoreStrength) - clamp01(cell.continentCoreStrength)) * 0.65;
    gradient += Math.abs(clamp01(n.shelfStrength) - clamp01(cell.shelfStrength)) * 0.45;
  }

  const identityEdge = identityEdges / neighbors.length;
  const marginEdge = marginEdges / neighbors.length;
  const avgGradient = gradient / neighbors.length;
  const edgeStrength = clamp01(identityEdge * 0.58 + marginEdge * 0.24 + avgGradient * 0.46);
  const causedIslandProtection = isCausedIsland(cell) ? 0.45 : 1;
  return lerp(1, 0.62, edgeStrength * causedIslandProtection);
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

function isCausedIsland(cell: Cell): boolean {
  return (
    cell.islandCause === IslandCause.ISLAND_ARC ||
    cell.islandCause === IslandCause.VOLCANIC_HOTSPOT ||
    cell.islandCause === IslandCause.RIFT_FRAGMENT ||
    cell.islandCause === IslandCause.SHELF_ISLAND ||
    cell.islandCause === IslandCause.CONTINENTAL_FRAGMENT
  );
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
