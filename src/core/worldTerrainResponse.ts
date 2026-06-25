import { classifyPlateBoundaryFeatureAuthority } from './worldPlateBoundaryFeatures';
import { assertNoAuthoredTerrainDeltas } from './worldLayerAuthority';
import { resolveGeneratePlanetFoundation } from './generatePlanetFoundation';
import type { Cell, WorldBrain } from './worldSchema';

export function applyIsostaticTerrainResponse(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyIsostaticTerrainResponse');
  const foundation = world.planetFoundation ?? resolveGeneratePlanetFoundation((world.parameters ?? {}) as any);
  world.planetFoundation = foundation;

  const seed = seedToUint32(world.metadata.seed);
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const before = world.cells.map((cell) => totalHeight(cell));
  const deltas = new Float32Array(world.cells.length);

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const isOcean = h < seaLevel;
    const material = materialSignals(cell, foundation);
    const feature = classifyPlateBoundaryFeatureAuthority(cell).features;
    const featureStrength = maxFeatureStrength(feature);
    const oceanBasinStrength = clamp01((1 - cell.continentality) * (1 - cell.shelfStrength));
    const texture = smoothTexture(seed, world, i, 80341);
    const shearTexture = smoothTexture(seed, world, i, 80357);
    const segmentTexture = smoothTexture(seed, world, i, 80383);
    const lowFrequencyPlanetShape = smoothTexture(seed, world, i, 80369) * 0.022 * foundation.reliefGravityScale;
    const oceanFeatureGate = smoothstep(0.42, 0.78, featureStrength);
    const landFeatureGate = smoothstep(0.10, 0.45, featureStrength);
    const featureGate = isOcean ? oceanFeatureGate : landFeatureGate;
    const materialGate = isOcean ? lerp(0.18, 1, oceanFeatureGate) : 1;
    const ridgeSegmentGate = isOcean ? smoothstep(-0.15, 0.70, segmentTexture) : 1;
    const trenchSegmentGate = isOcean ? smoothstep(-0.30, 0.55, -segmentTexture) : 1;

    const isostaticTarget = seaLevel
      + cell.continentality * 0.18
      + material.crustBuoyancy * 0.27 * materialGate
      + material.stableCore * 0.11
      + cell.continentCoreStrength * 0.10
      - oceanBasinStrength * 0.24
      - Math.max(0, material.crustDensity - 1.0) * 0.08 * materialGate
      - material.basinSubsidence * 0.065;

    const featureRelief =
      (feature.COLLISION_ZONE ?? 0) * 0.18 * foundation.reliefGravityScale * landFeatureGate
      + (feature.ISLAND_ARC ?? 0) * 0.09 * foundation.reliefGravityScale * Math.max(landFeatureGate, oceanFeatureGate)
      + (feature.OCEAN_RIDGE ?? 0) * 0.075 * foundation.reliefGravityScale * ridgeSegmentGate * featureGate
      - (feature.OCEAN_TRENCH ?? 0) * 0.145 * foundation.reliefGravityScale * trenchSegmentGate * featureGate
      - (feature.RIFT_ZONE ?? 0) * 0.09 * foundation.reliefGravityScale * Math.max(landFeatureGate, oceanFeatureGate * 0.55)
      + (feature.TRANSFORM_ZONE ?? 0) * shearTexture * 0.020 * foundation.reliefGravityScale * featureGate;

    const slope = localSlope(world, i, before);
    const flowProxy = localFlowProxy(world, i, before, seaLevel);
    const rainfall = clamp01(cell.rainfall);
    const lowlandGate = 1 - smoothstep(0.03, 0.22, Math.abs(h - seaLevel));
    const erosionWear = clamp01(flowProxy * slope * rainfall * foundation.erosionSedimentScale) * 0.046 + slope * foundation.thermalAge * 0.016;
    const sedimentFill = material.sedimentTendency * lowlandGate * flowProxy * foundation.thermalAge * 0.050;
    const smallTexture = texture * 0.023 * foundation.reliefGravityScale * material.reliefEnergy * (isOcean ? lerp(0.20, 0.72, oceanFeatureGate) : 1);

    let target = lowFrequencyPlanetShape + isostaticTarget + featureRelief - erosionWear + sedimentFill + smallTexture;
    if (isOcean && oceanFeatureGate < 0.18) {
      const local = localHeightAverage(world, i, before, seaLevel, true);
      if (local != null) target = lerp(target, local - 0.010, 0.46 * (1 - oceanFeatureGate));
    }

    const terrainResponseStrength = clamp01(0.45 + foundation.tectonicVigor * 0.20 + material.crustBuoyancy * 0.12 + material.stableCore * 0.10);
    let delta = (target - h) * terrainResponseStrength;
    delta = constrainTopologyDelta(world, i, h, seaLevel, delta, before, feature);
    deltas[i] = clamp(delta, -0.110, 0.125);
  }

  for (let i = 0; i < world.cells.length; i++) {
    const blended = blendDelta(world, i, deltas);
    if (blended !== 0) world.cells[i].baseHeight = clamp(world.cells[i].baseHeight + blended, -1.4, 1.5);
  }
}

export function materialSignals(cell: Cell, foundation = { heatFlowIndex: 0.5, volcanismBias: 0.5 } as any): {
  crustDensity: number;
  crustStrength: number;
  crustBuoyancy: number;
  sedimentTendency: number;
  stableCore: number;
  basinSubsidence: number;
  reliefEnergy: number;
} {
  const continentality = clamp01(cell.continentality);
  const thickness = clamp01(cell.crustThickness);
  const age = clamp01(cell.crustAge);
  const core = clamp01(cell.continentCoreStrength);
  const shelf = clamp01(cell.shelfStrength);
  const heat = clamp01(foundation.heatFlowIndex ?? 0.5);
  const volcanic = clamp01(cell.volcanicActivity + (foundation.volcanismBias ?? 0.5) * 0.12);
  const crustDensity = clamp(lerp(1.10, 0.84, continentality) + age * (1 - continentality) * 0.08 - volcanic * 0.04, 0.72, 1.22);
  const crustStrength = clamp01(0.30 + age * 0.30 + thickness * 0.22 - heat * 0.23 + core * 0.24);
  const crustBuoyancy = clamp01(0.52 * thickness + 0.30 * (1.15 - crustDensity) + 0.18 * crustStrength);
  const stableCore = clamp01(core * continentality * crustStrength * (0.45 + age * 0.55));
  const lowland = clamp01(1 - core) * clamp01(1 - age) * (0.35 + shelf * 0.35 + (1 - continentality) * 0.30);
  const sedimentTendency = clamp01(lowland + heat * 0.06);
  const basinSubsidence = clamp01(sedimentTendency * (1 - core) * (0.35 + (1 - continentality) * 0.45));
  const reliefEnergy = clamp01(0.34 + crustStrength * 0.30 + crustBuoyancy * 0.24 + stableCore * 0.22);
  return { crustDensity, crustStrength, crustBuoyancy, sedimentTendency, stableCore, basinSubsidence, reliefEnergy };
}

function maxFeatureStrength(feature: Partial<Record<string, number>>): number {
  return Math.max(0, ...Object.values(feature).map((value) => typeof value === 'number' ? value : 0));
}

function constrainTopologyDelta(world: WorldBrain, index: number, h: number, seaLevel: number, delta: number, heights: number[], feature: Partial<Record<string, number>>): number {
  const wasLand = h >= seaLevel;
  const willBeLand = h + delta >= seaLevel;
  if (wasLand === willBeLand) return delta;
  const cell = world.cells[index];
  const landNeighbors = landNeighborFraction(world, index, heights, seaLevel);
  const waterNeighbors = 1 - landNeighbors;
  const featureRaisedLand = (feature.COLLISION_ZONE ?? 0) > 0.25 || (feature.ISLAND_ARC ?? 0) > 0.25 || (feature.OCEAN_RIDGE ?? 0) > 0.55;
  const featureSunkLand = (feature.RIFT_ZONE ?? 0) > 0.25 || (feature.OCEAN_TRENCH ?? 0) > 0.25;
  if (!wasLand && willBeLand && !featureRaisedLand && !(cell.continentality > 0.50 && landNeighbors > 0.30)) return Math.min(delta, seaLevel - 0.006 - h);
  if (wasLand && !willBeLand && !featureSunkLand && !(cell.continentality < 0.22 && waterNeighbors > 0.58)) return Math.max(delta, seaLevel + 0.006 - h);
  return delta;
}

function localSlope(world: WorldBrain, index: number, heights: number[]): number {
  let maxDrop = 0;
  for (const n of neighborIndices4(world, index)) maxDrop = Math.max(maxDrop, Math.abs(heights[index] - heights[n]));
  return clamp01(maxDrop / 0.18);
}

function localFlowProxy(world: WorldBrain, index: number, heights: number[], seaLevel: number): number {
  const h = heights[index];
  let higher = 0;
  let total = 0;
  for (const n of neighborIndices4(world, index)) {
    total++;
    if (heights[n] > h) higher++;
  }
  const lowland = 1 - smoothstep(0.00, 0.28, Math.abs(h - seaLevel));
  return clamp01((higher / Math.max(1, total)) * 0.65 + lowland * 0.35);
}

function blendDelta(world: WorldBrain, index: number, deltas: Float32Array): number {
  const neighbors = neighborIndices4(world, index);
  if (!neighbors.length) return deltas[index];
  let sum = 0;
  for (const n of neighbors) sum += deltas[n];
  return deltas[index] * 0.70 + (sum / neighbors.length) * 0.30;
}

function localHeightAverage(world: WorldBrain, index: number, heights: number[], seaLevel: number, oceanOnly: boolean): number | null {
  const neighbors = neighborIndices4(world, index);
  let sum = 0;
  let count = 0;
  for (const n of neighbors) {
    if (oceanOnly && heights[n] >= seaLevel) continue;
    sum += heights[n];
    count++;
  }
  return count > 0 ? sum / count : null;
}

function landNeighborFraction(world: WorldBrain, index: number, heights: number[], seaLevel: number): number {
  const neighbors = neighborIndices4(world, index);
  if (!neighbors.length) return 0;
  let land = 0;
  for (const n of neighbors) if (heights[n] >= seaLevel) land++;
  return land / neighbors.length;
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

function neighborIndices4(world: WorldBrain, index: number): number[] {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  const out = [row * world.gridWidth + ((col - 1 + world.gridWidth) % world.gridWidth), row * world.gridWidth + ((col + 1) % world.gridWidth)];
  if (row > 0) out.push((row - 1) * world.gridWidth + col);
  if (row < world.gridHeight - 1) out.push((row + 1) * world.gridWidth + col);
  return out;
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
