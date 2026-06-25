import { classifyPlateBoundaryFeatureAuthority } from './worldPlateBoundaryFeatures';
import { assertNoAuthoredTerrainDeltas } from './worldLayerAuthority';
import { resolveGeneratePlanetFoundation } from './generatePlanetFoundation';
import type { Cell, WorldBrain } from './worldSchema';

export function applyIsostaticTerrainResponse(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyIsostaticTerrainResponse');
  const foundation = world.planetFoundation ?? resolveGeneratePlanetFoundation(world.parameters ?? {});
  world.planetFoundation = foundation;

  const seed = seedToUint32(world.metadata.seed);
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const before = world.cells.map((cell) => totalHeight(cell));
  const deltas = new Float32Array(world.cells.length);

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const material = materialSignals(cell, foundation);
    const feature = classifyPlateBoundaryFeatureAuthority(cell).features;
    const oceanBasinStrength = clamp01((1 - cell.continentality) * (1 - cell.shelfStrength));
    const texture = smoothTexture(seed, world, i, 80341);
    const shearTexture = smoothTexture(seed, world, i, 80357);
    const lowFrequencyPlanetShape = smoothTexture(seed, world, i, 80369) * 0.018 * foundation.reliefGravityScale;

    const isostaticTarget = seaLevel
      + cell.continentality * 0.16
      + material.crustBuoyancy * 0.20
      + cell.continentCoreStrength * 0.08
      - oceanBasinStrength * 0.22
      - Math.max(0, material.crustDensity - 1.0) * 0.10;

    const featureRelief =
      (feature.COLLISION_ZONE ?? 0) * 0.16 * foundation.reliefGravityScale
      + (feature.ISLAND_ARC ?? 0) * 0.08 * foundation.reliefGravityScale
      + (feature.OCEAN_RIDGE ?? 0) * 0.07 * foundation.reliefGravityScale
      - (feature.OCEAN_TRENCH ?? 0) * 0.14 * foundation.reliefGravityScale
      - (feature.RIFT_ZONE ?? 0) * 0.08 * foundation.reliefGravityScale
      + (feature.TRANSFORM_ZONE ?? 0) * shearTexture * 0.025 * foundation.reliefGravityScale;

    const slope = localSlope(world, i, before);
    const flowProxy = localFlowProxy(world, i, before, seaLevel);
    const rainfall = clamp01(cell.rainfall);
    const lowlandGate = 1 - smoothstep(0.03, 0.22, Math.abs(h - seaLevel));
    const erosionWear = clamp01(flowProxy * slope * rainfall * foundation.erosionSedimentScale) * 0.055 + slope * foundation.thermalAge * 0.020;
    const sedimentFill = material.sedimentTendency * lowlandGate * flowProxy * foundation.thermalAge * 0.060;
    const smallTexture = texture * 0.018 * foundation.reliefGravityScale * (0.35 + material.crustStrength * 0.65);

    const target = lowFrequencyPlanetShape + isostaticTarget + featureRelief - erosionWear + sedimentFill + smallTexture;
    const terrainResponseStrength = clamp01(0.42 + foundation.tectonicVigor * 0.24 + material.crustBuoyancy * 0.10);
    let delta = (target - h) * terrainResponseStrength;
    delta = constrainTopologyDelta(world, i, h, seaLevel, delta, before, feature);
    deltas[i] = clamp(delta, -0.095, 0.105);
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
} {
  const continentality = clamp01(cell.continentality);
  const thickness = clamp01(cell.crustThickness);
  const age = clamp01(cell.crustAge);
  const heat = clamp01(foundation.heatFlowIndex ?? 0.5);
  const volcanic = clamp01(cell.volcanicActivity + (foundation.volcanismBias ?? 0.5) * 0.12);
  const crustDensity = clamp(lerp(1.10, 0.84, continentality) + age * (1 - continentality) * 0.08 - volcanic * 0.04, 0.72, 1.22);
  const crustStrength = clamp01(0.30 + age * 0.30 + thickness * 0.20 - heat * 0.25 + cell.continentCoreStrength * 0.20);
  const crustBuoyancy = clamp01(0.50 * thickness + 0.30 * (1.15 - crustDensity) + 0.20 * crustStrength);
  const lowland = clamp01(1 - cell.continentCoreStrength) * clamp01(1 - age) * (0.35 + clamp01(cell.shelfStrength) * 0.35 + (1 - continentality) * 0.30);
  const sedimentTendency = clamp01(lowland + heat * 0.06);
  return { crustDensity, crustStrength, crustBuoyancy, sedimentTendency };
}

function constrainTopologyDelta(world: WorldBrain, index: number, h: number, seaLevel: number, delta: number, heights: number[], feature: Partial<Record<string, number>>): number {
  const wasLand = h >= seaLevel;
  const willBeLand = h + delta >= seaLevel;
  if (wasLand === willBeLand) return delta;
  const cell = world.cells[index];
  const landNeighbors = landNeighborFraction(world, index, heights, seaLevel);
  const waterNeighbors = 1 - landNeighbors;
  const featureRaisedLand = (feature.COLLISION_ZONE ?? 0) > 0.25 || (feature.ISLAND_ARC ?? 0) > 0.25 || (feature.OCEAN_RIDGE ?? 0) > 0.45;
  const featureSunkLand = (feature.RIFT_ZONE ?? 0) > 0.25 || (feature.OCEAN_TRENCH ?? 0) > 0.25;
  if (!wasLand && willBeLand && !featureRaisedLand && !(cell.continentality > 0.52 && landNeighbors > 0.35)) return Math.min(delta, seaLevel - 0.006 - h);
  if (wasLand && !willBeLand && !featureSunkLand && !(cell.continentality < 0.24 && waterNeighbors > 0.62)) return Math.max(delta, seaLevel + 0.006 - h);
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
  return deltas[index] * 0.72 + (sum / neighbors.length) * 0.28;
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
