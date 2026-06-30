import { BoundaryType, ContinentMarginType, IslandCause, type Cell, type WorldBrain } from '../worldSchema';
import { assertNoAuthoredTerrainDeltas } from '../worldLayerAuthority';
import { ensureCrustFields } from './materialFields';
import { classifyPlateBoundaryFeatureAuthority } from '../worldPlateBoundaryFeatures';
import { edgeHasSharedGeologicFeatureAuthority } from '../worldGeologicFeatureAuthority';
import { materialSignals } from '../worldTerrainResponse';

export function applyCrustProvinceTerrainDelta(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyCrustProvinceTerrainDelta');
  ensureCrustFields(world);
  const seed = seedToUint32(world.metadata.seed);
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const before = world.cells.map(totalHeight);
  const deltas = new Float32Array(world.cells.length);

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const aboveSea = h - seaLevel;
    const landGate = smoothstep(-0.02, 0.20, aboveSea);
    const oceanGate = 1 - smoothstep(-0.18, 0.04, aboveSea);
    const coastGate = 1 - smoothstep(0.02, 0.22, Math.abs(aboveSea));
    const mat = materialSignals(cell, world.planetFoundation);
    const feature = classifyPlateBoundaryFeatureAuthority(cell).features;
    const strongFeature = strongestCrustDeltaFeature(feature);
    const passiveOceanGate = passiveOceanDeltaGate(cell, h, seaLevel, strongFeature);
    const passiveOceanDamp = lerp(1, 0.22, passiveOceanGate);
    const authoritySeamDamp = unbackedAuthoritySeamDamp(world, i);
    const rough = smoothTexture(seed, world, i, 7019);
    let delta = 0;
    delta += mat.crustBuoyancy * 0.060 * landGate;
    delta += mat.crustStrength * 0.026 * landGate;
    delta += (feature.COLLISION_ZONE ?? 0) * 0.026 * landGate;
    delta += (feature.ISLAND_ARC ?? 0) * 0.020 * Math.max(landGate, coastGate);
    delta += (feature.OCEAN_RIDGE ?? 0) * 0.026 * Math.max(oceanGate, coastGate * 0.4);
    delta -= (feature.OCEAN_TRENCH ?? 0) * 0.032 * oceanGate;
    delta -= (feature.RIFT_ZONE ?? 0) * 0.026 * Math.max(landGate, coastGate * 0.5);
    delta += rough * 0.016 * (0.35 + mat.crustStrength * 0.65) * Math.max(landGate, coastGate * 0.5) * passiveOceanDamp * authoritySeamDamp;
    deltas[i] = constrainTopology(world, i, h, seaLevel, clamp(delta * passiveOceanDamp * authoritySeamDamp, -0.055, 0.060), before);
  }

  applyDeltas(world, before, seaLevel, deltas);
}

export function applyProvinceCoastBreakup(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyProvinceCoastBreakup');
  ensureCrustFields(world);
  const seed = seedToUint32(world.metadata.seed);
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const before = world.cells.map(totalHeight);

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const aboveSea = h - seaLevel;
    const nearShore = smoothstep(-0.10, 0.18, aboveSea) * (1 - smoothstep(0.18, 0.34, aboveSea));
    if (nearShore <= 0) continue;
    const waterNeighbors = waterNeighborFraction(world, i, seaLevel, before);
    const edgeGate = smoothstep(0.28, 0.82, waterNeighbors);
    const feature = classifyPlateBoundaryFeatureAuthority(cell).features;
    const mat = materialSignals(cell, world.planetFoundation);
    const notch = smoothTexture(seed, world, i, 11213);
    let delta = 0;
    delta -= Math.max(0, -notch) * ((feature.RIFT_ZONE ?? 0) * 0.030 + mat.sedimentTendency * 0.020) * nearShore * edgeGate;
    delta += Math.max(0, notch) * ((feature.ISLAND_ARC ?? 0) * 0.018 + (feature.COLLISION_ZONE ?? 0) * 0.014) * nearShore;
    if (delta !== 0) {
      const safe = constrainTopology(world, i, h, seaLevel, clamp(delta, -0.040, 0.035), before);
      if (safe !== 0) cell.baseHeight = clamp(cell.baseHeight + safe, -1.4, 1.5);
    }
  }
}

export function applyProvinceCoherence(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyProvinceCoherence');
  ensureCrustFields(world);
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const before = world.cells.map(totalHeight);

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const landNeighbors = landNeighborFraction(world, i, seaLevel, before);
    const waterNeighbors = 1 - landNeighbors;
    const mat = materialSignals(cell, world.planetFoundation);
    const feature = classifyPlateBoundaryFeatureAuthority(cell).features;
    let delta = 0;
    if (h < seaLevel && landNeighbors >= 0.55) delta += mat.crustBuoyancy * 0.020 * smoothstep(0.50, 1.0, landNeighbors);
    if (h >= seaLevel && waterNeighbors >= 0.62 && cell.continentality < 0.28 && !(feature.ISLAND_ARC || feature.COLLISION_ZONE)) delta -= mat.sedimentTendency * 0.018 * smoothstep(0.55, 1.0, waterNeighbors);
    if (delta !== 0) {
      const safe = constrainTopology(world, i, h, seaLevel, clamp(delta, -0.030, 0.035), before);
      if (safe !== 0) cell.baseHeight = clamp(cell.baseHeight + safe, -1.4, 1.5);
    }
  }
}

function applyDeltas(world: WorldBrain, before: number[], seaLevel: number, deltas: Float32Array): void {
  for (let i = 0; i < world.cells.length; i++) {
    const blended = blendDelta(world, i, deltas);
    const safe = constrainTopology(world, i, before[i], seaLevel, blended, before);
    if (safe !== 0) world.cells[i].baseHeight = clamp(world.cells[i].baseHeight + safe, -1.4, 1.5);
  }
}

function passiveOceanDeltaGate(cell: Cell, h: number, seaLevel: number, strongFeature: number): number {
  if (h >= seaLevel) return 0;
  const depth = seaLevel - h;
  const depthGate = smoothstep(0.030, 0.170, depth);
  const shelfGate = 1 - smoothstep(0.18, 0.48, clamp01(cell.shelfStrength));
  const featureGate = 1 - smoothstep(0.20, 0.46, strongFeature);
  const continentGate = 1 - smoothstep(0.52, 0.76, clamp01(cell.continentality));
  return clamp01(depthGate * shelfGate * featureGate * continentGate);
}

function strongestCrustDeltaFeature(feature: Partial<Record<string, number>>): number {
  return Math.max(
    feature.COLLISION_ZONE ?? 0,
    feature.ISLAND_ARC ?? 0,
    feature.OCEAN_RIDGE ?? 0,
    feature.OCEAN_TRENCH ?? 0,
    feature.RIFT_ZONE ?? 0,
    feature.SUBDUCTION_ZONE ?? 0,
    feature.TRANSFORM_ZONE ?? 0,
  );
}

function unbackedAuthoritySeamDamp(world: WorldBrain, index: number): number {
  const cell = world.cells[index];
  let risk = 0;
  for (const n of neighborIndices4(world, index)) {
    const other = world.cells[n];
    if (edgeHasSharedGeologicFeatureAuthority(cell, other)) continue;
    if (cell.plateId !== other.plateId) risk = Math.max(risk, 0.42);
    if (cell.crustProvince !== other.crustProvince) risk = Math.max(risk, 0.55);
    const materialJump = Math.abs(clamp01(cell.crustThickness) - clamp01(other.crustThickness))
      + Math.abs(clamp01(cell.crustAge) - clamp01(other.crustAge)) * 0.65
      + Math.abs(clamp01(cell.continentality) - clamp01(other.continentality)) * 0.50;
    risk = Math.max(risk, smoothstep(0.18, 0.70, materialJump) * 0.62);
  }
  return lerp(1, 0.26, clamp01(risk));
}

function canBlendAcrossAuthorityEdge(a: Cell, b: Cell): boolean {
  if (edgeHasSharedGeologicFeatureAuthority(a, b)) return true;
  if (a.plateId !== b.plateId) return false;
  if (a.crustProvince !== b.crustProvince) return false;
  const materialJump = Math.abs(clamp01(a.crustThickness) - clamp01(b.crustThickness))
    + Math.abs(clamp01(a.crustAge) - clamp01(b.crustAge)) * 0.65
    + Math.abs(clamp01(a.continentality) - clamp01(b.continentality)) * 0.50;
  return materialJump < 0.32;
}

function constrainTopology(world: WorldBrain, index: number, h: number, seaLevel: number, delta: number, heights: number[]): number {
  const next = h + delta;
  const wasLand = h >= seaLevel;
  const willBeLand = next >= seaLevel;
  if (wasLand === willBeLand) return delta;
  const cell = world.cells[index];
  const land = landNeighborFraction(world, index, seaLevel, heights);
  const water = 1 - land;
  const caused = isCausedIslandCell(cell);
  if (!wasLand && willBeLand && !(caused || cell.continentality > 0.42 || land > 0.55)) return Math.min(delta, seaLevel - 0.006 - h);
  if (wasLand && !willBeLand && (caused || cell.continentality > 0.34 || land > 0.48) && water < 0.74) return Math.max(delta, seaLevel + 0.006 - h);
  return delta;
}

function blendDelta(world: WorldBrain, index: number, deltas: Float32Array): number {
  const neighbors = neighborIndices4(world, index);
  if (!neighbors.length) return deltas[index];
  const cell = world.cells[index];
  let sum = 0;
  let count = 0;
  for (const n of neighbors) {
    if (!canBlendAcrossAuthorityEdge(cell, world.cells[n])) continue;
    sum += deltas[n];
    count++;
  }
  if (count === 0) return deltas[index];
  return deltas[index] * 0.78 + (sum / count) * 0.22;
}

function smoothTexture(seed: number, world: WorldBrain, index: number, salt: number): number {
  let sum = centeredJitter(seed, index, salt) * 2;
  let weight = 2;
  for (const n of neighborIndices4(world, index)) {
    sum += centeredJitter(seed, n, salt);
    weight++;
  }
  return clamp(sum / weight, -1, 1);
}

function landNeighborFraction(world: WorldBrain, index: number, seaLevel: number, heights: number[]): number {
  const neighbors = neighborIndices4(world, index);
  if (!neighbors.length) return 0;
  let land = 0;
  for (const n of neighbors) if (heights[n] >= seaLevel) land++;
  return land / neighbors.length;
}

function waterNeighborFraction(world: WorldBrain, index: number, seaLevel: number, heights: number[]): number {
  return 1 - landNeighborFraction(world, index, seaLevel, heights);
}

function neighborIndices4(world: WorldBrain, index: number): number[] {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  const out = [row * world.gridWidth + ((col - 1 + world.gridWidth) % world.gridWidth), row * world.gridWidth + ((col + 1) % world.gridWidth)];
  if (row > 0) out.push((row - 1) * world.gridWidth + col);
  if (row < world.gridHeight - 1) out.push((row + 1) * world.gridWidth + col);
  return out;
}

function isCausedIslandCell(cell: Cell): boolean {
  return cell.islandCause === IslandCause.ISLAND_ARC || cell.islandCause === IslandCause.VOLCANIC_HOTSPOT || cell.islandCause === IslandCause.RIFT_FRAGMENT || cell.islandCause === IslandCause.SHELF_ISLAND || cell.islandCause === IslandCause.CONTINENTAL_FRAGMENT;
}

function totalHeight(cell: Cell): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
}

function numeric(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function centeredJitter(seed: number, index: number, salt: number): number {
  let h = seed ^ Math.imul(index + 1, 374761393) ^ Math.imul(salt + 1, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return ((h >>> 0) / 4294967295) * 2 - 1;
}

function seedToUint32(s: string | number): number {
  if (typeof s === 'number') return s >>> 0;
  let h = 2166136261 >>> 0;
  for (let i = 0; i < String(s).length; i++) {
    h ^= String(s).charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
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
