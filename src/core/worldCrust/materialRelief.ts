import { BoundaryType, ContinentMarginType, OceanDepthClass, PlateType, type Cell, type WorldBrain } from '../worldSchema';
import { assertNoAuthoredTerrainDeltas } from '../worldLayerAuthority';
import {
  applyContinentSkeletonTerrainObedience,
  cleanupAccidentalTinyIslands,
  ensureCrustFields,
} from './index';
import {
  applyCrustProvinceTerrainDelta,
  applyProvinceCoastBreakup,
  applyProvinceCoherence,
} from './materialAuthorityTerrain';

export function applyCrustTerrainInfluence(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyCrustTerrainInfluence');
  ensureCrustFields(world);

  // Preserve the existing generated crust stage order, but route the first
  // three subpasses through material/feature-backed terrain authority instead
  // of raw crustProvince label switches.
  applyCrustProvinceTerrainDelta(world);
  applyProvinceCoastBreakup(world);
  applyProvinceCoherence(world);
  applyContinentSkeletonTerrainObedience(world);
  cleanupAccidentalTinyIslands(world);
  applyMaterialReliefReinforcement(world);
}

export function applyMaterialReliefReinforcement(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyMaterialReliefReinforcement');
  ensureCrustFields(world);

  const seed = seedToUint32(world.metadata.seed);
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const before = world.cells.map((cell) => totalHeight(cell));
  const rawDeltas = new Float32Array(world.cells.length);

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const aboveSea = h - seaLevel;
    if (aboveSea <= 0.012) continue;

    const landNeighbors = landNeighborFractionByHeight(world, i, seaLevel, before);
    if (landNeighbors < 0.50) continue;

    const landGate = smoothstep(0.012, 0.20, aboveSea);
    const interiorGate = smoothstep(0.48, 0.92, landNeighbors);
    const seamDamp = terrainSeamDamp(world, i);

    const thickness = clamp01(cell.crustThickness);
    const age = clamp01(cell.crustAge);
    const uplift = Math.max(0, cell.upliftRate);
    const volcanic = clamp01(cell.volcanicActivity);
    const stableCrust = Math.max(0, thickness - 0.56) * Math.max(0, age - 0.48);
    const mountainSignal = clamp01(
      uplift * 0.75 +
      (cell.boundaryType === BoundaryType.CONVERGENT ? 0.30 : 0) +
      (cell.marginType === ContinentMarginType.COLLISION || cell.marginType === ContinentMarginType.ACTIVE ? 0.18 : 0),
    );
    const volcanicSignal = volcanic * (cell.plateType === PlateType.OCEANIC ? 0.65 : 1);
    const shelfDamp = cell.oceanDepthClass === OceanDepthClass.SHELF || cell.oceanDepthClass === OceanDepthClass.SLOPE ? 0.65 : 1;

    const broad = smoothTerrainTexture(seed, world, i, 32003);
    const fine = centeredJitter(seed, i, 33013);
    const materialEnergy = clamp01(stableCrust + mountainSignal + volcanicSignal * 0.7);

    const relief = (broad * 0.032 + fine * 0.010) * (0.60 + materialEnergy * 0.50) * landGate * interiorGate * shelfDamp;
    const lift = (stableCrust * 0.010 + mountainSignal * 0.012 + volcanicSignal * 0.006) * landGate * interiorGate * shelfDamp;
    const delta = clamp((relief + lift) * seamDamp, -0.030, 0.036);

    rawDeltas[i] = keepLandDelta(h, seaLevel, delta);
  }

  for (let i = 0; i < world.cells.length; i++) {
    const delta = blendMaterialDelta(world, i, rawDeltas);
    if (delta !== 0) {
      world.cells[i].baseHeight = clamp(world.cells[i].baseHeight + keepLandDelta(before[i], seaLevel, delta), -1.4, 1.5);
    }
  }
}

function keepLandDelta(heightBefore: number, seaLevel: number, delta: number): number {
  if (heightBefore + delta < seaLevel + 0.006) {
    return Math.max(0, seaLevel + 0.006 - heightBefore);
  }
  return delta;
}

function blendMaterialDelta(world: WorldBrain, index: number, deltas: Float32Array): number {
  const raw = deltas[index];
  if (raw === 0) return 0;

  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return raw;

  let sum = 0;
  let count = 0;
  for (const neighbor of neighbors) {
    if (deltas[neighbor] === 0) continue;
    sum += deltas[neighbor];
    count++;
  }
  if (count === 0) return raw;

  const neighborAverage = sum / count;
  const edgeBlend = materialSeamBlendStrength(world, index);
  const softened = raw * 0.72 + neighborAverage * 0.28;
  return lerp(raw, softened, edgeBlend);
}

function smoothTerrainTexture(seed: number, world: WorldBrain, index: number, salt: number): number {
  const neighbors = neighborIndices4(world, index);
  let sum = centeredJitter(seed, index, salt) * 2.0;
  let weight = 2.0;
  for (const neighbor of neighbors) {
    sum += centeredJitter(seed, neighbor, salt);
    weight += 1;
  }
  return clamp(sum / weight, -1, 1);
}

function materialSeamBlendStrength(world: WorldBrain, index: number): number {
  const cell = world.cells[index];
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 0;

  let plateEdges = 0;
  let gradient = 0;
  for (const neighborIndex of neighbors) {
    const neighbor = world.cells[neighborIndex];
    if (neighbor.plateId !== cell.plateId) plateEdges++;
    gradient += Math.abs(clamp01(neighbor.continentality) - clamp01(cell.continentality));
    gradient += Math.abs(clamp01(neighbor.continentCoreStrength) - clamp01(cell.continentCoreStrength)) * 0.45;
    gradient += Math.abs(clamp01(neighbor.crustThickness) - clamp01(cell.crustThickness)) * 0.35;
  }

  return clamp01((plateEdges / neighbors.length) * 0.30 + (gradient / neighbors.length) * 0.28);
}

function terrainSeamDamp(world: WorldBrain, index: number): number {
  const cell = world.cells[index];
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 1;

  let plateEdges = 0;
  let gradient = 0;
  for (const neighborIndex of neighbors) {
    const neighbor = world.cells[neighborIndex];
    if (neighbor.plateId !== cell.plateId) plateEdges++;
    gradient += Math.abs(clamp01(neighbor.continentality) - clamp01(cell.continentality));
    gradient += Math.abs(clamp01(neighbor.crustThickness) - clamp01(cell.crustThickness)) * 0.35;
  }

  return lerp(1, 0.70, clamp01((plateEdges / neighbors.length) * 0.45 + (gradient / neighbors.length) * 0.25));
}

function landNeighborFractionByHeight(world: WorldBrain, index: number, seaLevel: number, heights: number[]): number {
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 0;
  let land = 0;
  for (const neighbor of neighbors) {
    if (heights[neighbor] >= seaLevel) land++;
  }
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
