import { ContinentMarginType, IslandCause, type Cell, type WorldBrain } from '../worldSchema';
import { recomputeWorld } from '../worldRecompute';
import { applyGeneratedWorldQualityPass } from '../worldQualityPass';
import { seedContinentSkeletonFields } from '../worldContinents';
import { applyCrustTerrainInfluence, seedCrustFields } from '../worldCrust';
import { applyOceanBathymetrySmoothing } from '../worldOceanBathymetry';
import { applyPlateBoundaryFeatureTerrain } from '../worldPlateBoundaryFeatures';
import { applyIsostaticTerrainResponse } from '../worldTerrainResponse';
import { assertNoAuthoredTerrainDeltas } from '../worldLayerAuthority';
import {
  allowsNormalContinentalMorphology,
  allowsNormalRockyCrustTerrain,
  allowsPlateBoundaryFeatureTerrain,
} from '../generatePhysicalConsequenceResolver';

export function applyGeneratedGeographyPipeline(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyGeneratedGeographyPipeline');

  const geologyStack = world.planetFoundation?.geologyStack ?? 'PLATE_TECTONIC';
  const waterMode = world.planetFoundation?.surfaceWaterMode ?? 'LIQUID_SURFACE_WATER';
  const allowContinents = allowsNormalContinentalMorphology(geologyStack);
  const allowRockyCrust = allowsNormalRockyCrustTerrain(geologyStack);
  const allowPlateFeatures = allowsPlateBoundaryFeatureTerrain(geologyStack);
  const allowNormalOceanBathymetry = waterMode === 'LIQUID_SURFACE_WATER' || waterMode === 'MIXED_LIQUID_ICE';

  if (allowContinents) seedContinentSkeletonFields(world);
  if (allowPlateFeatures) applyPlateBoundaryFeatureTerrain(world);
  if (allowContinents) applySkeletonBaseElevation(world);
  recomputeWorld(world, ['GENERATED']);

  if (allowContinents || allowRockyCrust) applyGeneratedWorldQualityPass(world);
  recomputeWorld(world, ['GENERATED']);

  if (allowContinents) seedContinentSkeletonFields(world);
  if (allowRockyCrust) {
    seedCrustFields(world);
    applyIsostaticTerrainResponse(world);
    applyCrustTerrainInfluence(world);
  }
  if (allowNormalOceanBathymetry) applyOceanBathymetrySmoothing(world);
  recomputeWorld(world, ['GENERATED']);
  if (allowContinents) seedContinentSkeletonFields(world);
  if (allowRockyCrust) seedCrustFields(world);
}

export function applySkeletonBaseElevation(world: WorldBrain): void {
  assertNoAuthoredTerrainDeltas(world, 'applySkeletonBaseElevation');
  const seaLevel = typeof world.seaLevel === 'number' ? world.seaLevel : world.metadata?.seaLevel ?? 0;
  const source = world.cells.map((cell) => totalHeight(cell));
  const seed = seedToUint32(world.metadata?.seed ?? world.parameters?.seed ?? 0);
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
    const adjacentLand = cardinalFractionAboveSea(world, source, i, seaLevel);
    const directLandSupport = Math.max(adjacentLand, tightLand * 0.45, localLand * 0.20);
    const skeletonContinuity = skeletonAuthorityContinuity(world, i);
    const nearSurface = 1 - smoothstep(0.10, 0.46, Math.abs(aboveSea));
    const landTexture = skeletonLandTexture(world, i, seed);
    const continentLandIntent = clamp01(continentality * 0.72 + core * 0.34 + landTexture * 0.22 - shelf * 0.08);
    const strongCoreLand = continentality > 0.66 && core > 0.38 && continentLandIntent > 0.72;
    const attachedMarginLand = continentality > 0.48 && directLandSupport >= 0.22 && continentLandIntent > 0.66;
    const shouldCaptureContinentLand = strongCoreLand || attachedMarginLand || isCausedIsland(cell);
    const unsupportedSubmergedContinent = !wasLand
      && !shouldCaptureContinentLand
      && continentality > 0.52
      && directLandSupport < 0.22;
    let target = h;
    let strength = 0;

    if (continentality > 0.62) {
      if (!wasLand && !shouldCaptureContinentLand) {
        const basinTarget = seaLevel - 0.080 - (continentality - 0.62) * 0.13 - core * 0.035;
        target = blendTarget(target, basinTarget, 0.36 + core * 0.16 + nearSurface * 0.10);
        strength = Math.max(strength, 0.24 + core * 0.14 + nearSurface * 0.08);
      } else {
        const coreTarget = seaLevel + 0.044 + continentality * 0.050 + core * 0.088 + landTexture * 0.016;
        target = blendTarget(target, coreTarget, 0.42 + core * 0.22 + (wasLand ? 0.06 : 0.12));
        strength = Math.max(strength, 0.26 + core * 0.18 + (wasLand ? 0.04 : 0.10));
      }
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

    if (unsupportedSubmergedContinent) {
      const ghostTarget = seaLevel - 0.095 - (continentality - 0.52) * 0.12 - shelf * 0.025;
      target = Math.min(target, ghostTarget);
      strength = Math.max(strength, 0.30 + nearSurface * 0.12);
    }

    if (shelf > 0.30 && core < 0.70) {
      const coastAttached = adjacentLand >= 0.25 || wasLand;
      const shelfTarget = coastAttached
        ? seaLevel - 0.024 + shelf * 0.018
        : seaLevel - 0.085 - shelf * 0.035;
      const shelfPull = wasLand ? 0.10 * shelf : (coastAttached ? 0.18 * shelf : 0.24 * shelf);
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
    if (!wasLand && h + delta >= seaLevel && !canSkeletonRaiseWater(cell, localLand, tightLand, continentality, shelf, core, shouldCaptureContinentLand)) delta = Math.min(delta, seaLevel - 0.006 - h);
    const seamDamp = skeletonSeamDamp(world, i);
    const geometryDamp = unsupportedSubmergedContinent
      ? lerp(0.92, 1, skeletonContinuity) * lerp(0.88, 1, seamDamp)
      : lerp(0.70, 1, skeletonContinuity) * seamDamp;
    delta *= geometryDamp;
    delta = capSkeletonDelta(delta, cell, skeletonContinuity, invalidFragment, shouldCaptureContinentLand);
    cell.baseHeight = clamp(cell.baseHeight + delta, -1.4, 1.5);
  }
}

function canSkeletonSinkLand(cell: Cell, localLand: number, tightLand: number, continentality: number, shelf: number, core: number, invalidFragment: boolean): boolean {
  if (invalidFragment) return true;
  if (isCausedIsland(cell)) return false;
  if (core > 0.24 || continentality > 0.34 || shelf > 0.36) return false;
  return localLand < 0.34 && tightLand < 0.38;
}

function canSkeletonRaiseWater(cell: Cell, localLand: number, tightLand: number, continentality: number, shelf: number, core: number, continentLandIntent: boolean): boolean {
  if (continentLandIntent) return true;
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

function cardinalFractionAboveSea(world: WorldBrain, heights: number[], index: number, seaLevel: number): number {
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 0;
  let land = 0;
  for (const neighborIndex of neighbors) {
    if (heights[neighborIndex] >= seaLevel) land++;
  }
  return land / neighbors.length;
}

function skeletonAuthorityContinuity(world: WorldBrain, index: number): number {
  const cell = world.cells[index];
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 1;
  let mismatch = 0;
  for (const neighborIndex of neighbors) {
    const n = world.cells[neighborIndex];
    if (n.marginType !== cell.marginType || n.islandCause !== cell.islandCause) mismatch += 0.14;
    mismatch += Math.abs(clamp01(n.continentality) - clamp01(cell.continentality)) * 0.34;
    mismatch += Math.abs(clamp01(n.continentCoreStrength) - clamp01(cell.continentCoreStrength)) * 0.22;
    mismatch += Math.abs(clamp01(n.shelfStrength) - clamp01(cell.shelfStrength)) * 0.16;
  }
  return 1 - clamp01(mismatch / neighbors.length);
}

function skeletonLandTexture(world: WorldBrain, index: number, seed: number): number {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  const x = col / Math.max(1, world.gridWidth);
  const y = row / Math.max(1, world.gridHeight);
  const broad = valueNoise2D(seed, x * 5.0, y * 3.0, 3101);
  const medium = valueNoise2D(seed, x * 11.0, y * 7.0, 3203);
  const coast = valueNoise2D(seed, x * 23.0, y * 13.0, 3307);
  return clamp01(broad * 0.48 + medium * 0.34 + coast * 0.18);
}

function valueNoise2D(seed: number, x: number, y: number, salt: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const tx = x - x0;
  const ty = y - y0;
  const a = hashGrid(seed, x0, y0, salt);
  const b = hashGrid(seed, x0 + 1, y0, salt);
  const c = hashGrid(seed, x0, y0 + 1, salt);
  const d = hashGrid(seed, x0 + 1, y0 + 1, salt);
  const sx = tx * tx * (3 - 2 * tx);
  const sy = ty * ty * (3 - 2 * ty);
  return lerp(lerp(a, b, sx), lerp(c, d, sx), sy);
}

function hashGrid(seed: number, x: number, y: number, salt: number): number {
  let h = seed ^ Math.imul(x + 4099, 374761393) ^ Math.imul(y + 9176, 668265263) ^ Math.imul(salt + 1, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

function capSkeletonDelta(delta: number, cell: Cell, continuity: number, invalidFragment: boolean, continentLandIntent = false): number {
  if (invalidFragment) return clamp(delta, -0.085, 0.060);
  if (isCausedIsland(cell)) return clamp(delta, -0.040, 0.060);
  const core = clamp01(cell.continentCoreStrength);
  const continentality = clamp01(cell.continentality);
  const shelf = clamp01(cell.shelfStrength);
  const marginBoost = cell.marginType === ContinentMarginType.NONE ? 0 : 0.010;
  const positiveCap = continentLandIntent
    ? 0.120 + core * 0.080 + continentality * 0.030
    : lerp(0.026, 0.052, continuity) + core * 0.030 + marginBoost;
  const negativeCap = lerp(0.024, 0.044, continuity) + (1 - continentality) * 0.014 + shelf * 0.010 + marginBoost;
  const ghostSinkCap = !continentLandIntent && continentality > 0.52 ? 0.080 + shelf * 0.030 : negativeCap;
  return delta > 0 ? Math.min(delta, positiveCap) : Math.max(delta, -ghostSinkCap);
}

function skeletonSeamDamp(world: WorldBrain, index: number): number {
  const cell = world.cells[index];
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 1;
  let marginEdges = 0;
  let gradient = 0;
  for (const neighborIndex of neighbors) {
    const n = world.cells[neighborIndex];
    if (n.marginType !== cell.marginType || n.islandCause !== cell.islandCause) marginEdges++;
    gradient += Math.abs(clamp01(n.continentality) - clamp01(cell.continentality));
    gradient += Math.abs(clamp01(n.continentCoreStrength) - clamp01(cell.continentCoreStrength)) * 0.65;
    gradient += Math.abs(clamp01(n.shelfStrength) - clamp01(cell.shelfStrength)) * 0.45;
  }
  const edgeStrength = clamp01((marginEdges / neighbors.length) * 0.20 + (gradient / neighbors.length) * 0.50);
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

function seedToUint32(s: string | number): number {
  if (typeof s === 'number') return s >>> 0;
  let h = 2166136261 >>> 0;
  for (let i = 0; i < String(s).length; i++) {
    h ^= String(s).charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) & 0xffffffff;
}

function clamp(value: number, lo: number, hi: number): number {
  return value < lo ? lo : value > hi ? hi : value;
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
