import {
  BoundaryType,
  ContinentMarginType,
  IslandCause,
  OceanDepthClass,
  PlateType,
  type Cell,
  type WorldBrain,
} from './worldSchema';
import { assertNoAuthoredTerrainDeltas } from './worldLayerAuthority';

export type PlateBoundaryFeatureId =
  | 'NONE'
  | 'OCEAN_RIDGE'
  | 'RIFT_ZONE'
  | 'SUBDUCTION_ZONE'
  | 'OCEAN_TRENCH'
  | 'ISLAND_ARC'
  | 'COLLISION_ZONE'
  | 'TRANSFORM_ZONE'
  | 'DIFFUSE_BOUNDARY';

export type PlateBoundaryFeatureAuthority = {
  primary: PlateBoundaryFeatureId;
  strength: number;
  features: Partial<Record<Exclude<PlateBoundaryFeatureId, 'NONE'>, number>>;
  hasFeatureAuthority: boolean;
};

const STRONG_BOUNDARY_FEATURE = 0.42;

export function classifyPlateBoundaryFeatureAuthority(cell: Cell): PlateBoundaryFeatureAuthority {
  const features: PlateBoundaryFeatureAuthority['features'] = {};

  function add(id: Exclude<PlateBoundaryFeatureId, 'NONE'>, strength: number): void {
    if (!Number.isFinite(strength) || strength <= 0) return;
    features[id] = Math.max(features[id] ?? 0, clamp01(strength));
  }

  const uplift = typeof cell.upliftRate === 'number' ? cell.upliftRate : 0;
  const volcanic = clamp01(cell.volcanicActivity);
  const continentality = clamp01(cell.continentality);
  const core = clamp01(cell.continentCoreStrength);
  const shelf = clamp01(cell.shelfStrength);
  const thickCrust = clamp01((cell.crustThickness - 0.48) / 0.42);
  const oldCrust = clamp01((cell.crustAge - 0.42) / 0.42);
  const isLandLike = continentality > 0.42 || core > 0.38 || shelf > 0.48 || cell.plateType === PlateType.CONTINENTAL;
  const boundaryEnergy = clamp01(Math.abs(uplift) * 0.72 + volcanic * 0.24 + (cell.boundaryType === BoundaryType.NONE ? 0 : 0.52));

  if (cell.boundaryType === BoundaryType.DIVERGENT) {
    if (isLandLike || cell.marginType === ContinentMarginType.RIFT) {
      add('RIFT_ZONE', 0.58 + boundaryEnergy * 0.30);
    } else {
      add('OCEAN_RIDGE', 0.64 + boundaryEnergy * 0.28);
    }
  }

  if (cell.boundaryType === BoundaryType.CONVERGENT) {
    if (isLandLike && (thickCrust > 0.28 || core > 0.32 || continentality > 0.52)) {
      add('COLLISION_ZONE', 0.58 + boundaryEnergy * 0.30 + thickCrust * oldCrust * 0.10);
    }
    if (!isLandLike || cell.oceanDepthClass === OceanDepthClass.TRENCH) {
      add('SUBDUCTION_ZONE', 0.62 + boundaryEnergy * 0.24);
      add('OCEAN_TRENCH', 0.54 + boundaryEnergy * 0.24);
    }
    if (volcanic > 0.36 || cell.islandCause === IslandCause.ISLAND_ARC) {
      add('ISLAND_ARC', 0.54 + volcanic * 0.34 + boundaryEnergy * 0.12);
    }
  }

  if (cell.boundaryType === BoundaryType.TRANSFORM) {
    add('TRANSFORM_ZONE', 0.46 + boundaryEnergy * 0.22);
  }

  if (cell.marginType === ContinentMarginType.COLLISION) add('COLLISION_ZONE', 0.72 + thickCrust * 0.10);
  if (cell.marginType === ContinentMarginType.ACTIVE) add('SUBDUCTION_ZONE', 0.62 + volcanic * 0.12);
  if (cell.marginType === ContinentMarginType.RIFT) add('RIFT_ZONE', 0.68);
  if (cell.marginType === ContinentMarginType.TRANSFORM) add('TRANSFORM_ZONE', 0.50);

  if (cell.islandCause === IslandCause.ISLAND_ARC) add('ISLAND_ARC', 0.88);
  if (cell.islandCause === IslandCause.RIFT_FRAGMENT) add('RIFT_ZONE', 0.62);
  if (cell.islandCause === IslandCause.VOLCANIC_HOTSPOT) add('DIFFUSE_BOUNDARY', 0.48 + volcanic * 0.20);

  let primary: PlateBoundaryFeatureId = 'NONE';
  let strength = 0;
  for (const [id, value] of Object.entries(features) as [Exclude<PlateBoundaryFeatureId, 'NONE'>, number][]) {
    if (value > strength) {
      primary = id;
      strength = value;
    }
  }

  return {
    primary,
    strength,
    features,
    hasFeatureAuthority: strength >= STRONG_BOUNDARY_FEATURE,
  };
}

export function applyPlateBoundaryFeatureTerrain(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyPlateBoundaryFeatureTerrain');

  const seed = seedToUint32(world.metadata.seed);
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const before = world.cells.map((cell) => totalHeight(cell));
  const rawDeltas = new Float32Array(world.cells.length);

  for (let i = 0; i < world.cells.length; i++) {
    const h = before[i];
    const cell = world.cells[i];
    const local = localPlateBoundaryFeatureAuthority(world, i, 2);
    if (!local.hasFeatureAuthority) continue;

    const aboveSea = h - seaLevel;
    const landGate = smoothstep(-0.02, 0.18, aboveSea);
    const oceanGate = 1 - smoothstep(-0.18, 0.05, aboveSea);
    const nearSea = 1 - smoothstep(0.02, 0.22, Math.abs(aboveSea));
    const texture = smoothFeatureTexture(seed, world, i, 51011);
    const fine = centeredJitter(seed, i, 51043);
    const strength = clamp01(local.strength);
    let delta = 0;

    delta += (local.features.COLLISION_ZONE ?? 0) * (0.055 + texture * 0.018) * Math.max(landGate, 0.35);
    delta += (local.features.ISLAND_ARC ?? 0) * (0.040 + Math.max(0, fine) * 0.020) * Math.max(nearSea, oceanGate * 0.55);
    delta += (local.features.OCEAN_RIDGE ?? 0) * (0.035 + texture * 0.014) * Math.max(oceanGate, 0.30);

    const rift = local.features.RIFT_ZONE ?? 0;
    if (rift > 0) {
      delta -= rift * (0.036 + Math.max(0, -texture) * 0.020) * Math.max(landGate, nearSea * 0.50);
      delta += rift * Math.max(0, texture) * 0.015 * nearSea;
    }

    delta -= (local.features.OCEAN_TRENCH ?? 0) * (0.060 + Math.max(0, -fine) * 0.020) * Math.max(oceanGate, nearSea * 0.40);
    delta -= (local.features.SUBDUCTION_ZONE ?? 0) * 0.020 * Math.max(oceanGate, nearSea * 0.40);
    delta += (local.features.TRANSFORM_ZONE ?? 0) * (texture * 0.014 - 0.004) * Math.max(nearSea, 0.40);
    delta += (local.features.DIFFUSE_BOUNDARY ?? 0) * texture * 0.010;

    const seamDamp = featureSeamDamp(world, i);
    const safeDelta = constrainFeatureTopologyDelta(world, i, h, seaLevel, clamp(delta * seamDamp * (0.55 + strength * 0.45), -0.070, 0.075), before, local);
    rawDeltas[i] = safeDelta;

    // Feature-backed active boundaries should leave feature evidence for later
    // diagnostics and material passes, not raw plate-polygons. We intentionally
    // do not read plateId here.
    if (local.features.OCEAN_RIDGE || local.features.RIFT_ZONE) cell.volcanicActivity = Math.max(cell.volcanicActivity, 0.38 * strength);
    if (local.features.COLLISION_ZONE || local.features.SUBDUCTION_ZONE) cell.upliftRate = Math.max(cell.upliftRate, 0.18 * strength);
  }

  for (let i = 0; i < world.cells.length; i++) {
    const raw = rawDeltas[i];
    if (raw === 0) continue;
    const blended = blendFeatureDelta(world, i, rawDeltas);
    const local = localPlateBoundaryFeatureAuthority(world, i, 2);
    const safe = constrainFeatureTopologyDelta(world, i, before[i], seaLevel, blended, before, local);
    if (safe !== 0) world.cells[i].baseHeight = clamp(world.cells[i].baseHeight + safe, -1.4, 1.5);
  }
}

function localPlateBoundaryFeatureAuthority(world: WorldBrain, index: number, radius: number): PlateBoundaryFeatureAuthority {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  const features: PlateBoundaryFeatureAuthority['features'] = {};
  let totalWeight = 0;

  function addFeature(id: Exclude<PlateBoundaryFeatureId, 'NONE'>, value: number, weight: number): void {
    features[id] = Math.max(features[id] ?? 0, value * weight);
  }

  for (let dr = -radius; dr <= radius; dr++) {
    const r = row + dr;
    if (r < 0 || r >= world.gridHeight) continue;
    for (let dc = -radius; dc <= radius; dc++) {
      const c = (col + dc + world.gridWidth) % world.gridWidth;
      const dist = Math.abs(dr) + Math.abs(dc);
      const weight = dist === 0 ? 1 : dist === 1 ? 0.64 : 0.32;
      const authority = classifyPlateBoundaryFeatureAuthority(world.cells[r * world.gridWidth + c]);
      if (!authority.hasFeatureAuthority) continue;
      totalWeight += weight;
      for (const [id, value] of Object.entries(authority.features) as [Exclude<PlateBoundaryFeatureId, 'NONE'>, number][]) {
        addFeature(id, value, weight);
      }
    }
  }

  let primary: PlateBoundaryFeatureId = 'NONE';
  let strength = 0;
  const normalize = Math.max(1, Math.min(3.4, totalWeight));
  for (const [id, raw] of Object.entries(features) as [Exclude<PlateBoundaryFeatureId, 'NONE'>, number][]) {
    const value = clamp01(raw / normalize);
    features[id] = value;
    if (value > strength) {
      primary = id;
      strength = value;
    }
  }

  return { primary, strength, features, hasFeatureAuthority: strength >= STRONG_BOUNDARY_FEATURE * 0.65 };
}

function constrainFeatureTopologyDelta(
  world: WorldBrain,
  index: number,
  heightBefore: number,
  seaLevel: number,
  delta: number,
  heights: number[],
  authority: PlateBoundaryFeatureAuthority,
): number {
  if (delta === 0) return 0;
  const next = heightBefore + delta;
  const wasLand = heightBefore >= seaLevel;
  const willBeLand = next >= seaLevel;
  if (wasLand === willBeLand) return delta;

  const cell = world.cells[index];
  const landNeighbors = landNeighborFractionByHeight(world, index, seaLevel, heights);
  const waterNeighbors = 1 - landNeighbors;
  const canRaiseLand =
    authority.features.COLLISION_ZONE ||
    authority.features.ISLAND_ARC ||
    authority.features.OCEAN_RIDGE ||
    cell.islandCause === IslandCause.ISLAND_ARC ||
    (clamp01(cell.continentality) > 0.54 && landNeighbors >= 0.42);
  const canSinkLand =
    authority.features.RIFT_ZONE ||
    authority.features.OCEAN_TRENCH ||
    (clamp01(cell.continentality) < 0.22 && waterNeighbors >= 0.64);

  if (!wasLand && willBeLand && !canRaiseLand) return Math.max(0, seaLevel - 0.006 - heightBefore);
  if (wasLand && !willBeLand && !canSinkLand) return Math.min(0, seaLevel + 0.006 - heightBefore);
  return delta;
}

function blendFeatureDelta(world: WorldBrain, index: number, deltas: Float32Array): number {
  const raw = deltas[index];
  const neighbors = neighborIndices4(world, index);
  if (!neighbors.length) return raw;
  let sum = 0;
  for (const neighbor of neighbors) sum += deltas[neighbor];
  const neighborAverage = sum / neighbors.length;
  return raw * 0.68 + neighborAverage * 0.32;
}

function featureSeamDamp(world: WorldBrain, index: number): number {
  const cell = world.cells[index];
  const neighbors = neighborIndices4(world, index);
  if (!neighbors.length) return 1;
  let gradient = 0;
  for (const neighborIndex of neighbors) {
    const neighbor = world.cells[neighborIndex];
    gradient += Math.abs(clamp01(neighbor.continentality) - clamp01(cell.continentality));
    gradient += Math.abs(clamp01(neighbor.shelfStrength) - clamp01(cell.shelfStrength)) * 0.35;
    gradient += Math.abs(clamp01(neighbor.volcanicActivity) - clamp01(cell.volcanicActivity)) * 0.25;
  }
  return lerp(1, 0.72, clamp01(gradient / neighbors.length * 0.34));
}

function smoothFeatureTexture(seed: number, world: WorldBrain, index: number, salt: number): number {
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
