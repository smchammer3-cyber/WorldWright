import { type Cell, type WorldBrain } from '../worldSchema';
import { assertNoAuthoredTerrainDeltas } from '../worldLayerAuthority';
import { applyCrustTerrainInfluence as applyMaterialReliefTerrainInfluence } from './materialRelief';

export function applyCrustTerrainInfluence(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyCrustTerrainInfluence');
  applyMaterialReliefTerrainInfluence(world);
  applyCoastShapePass(world);
}

export function applyCoastShapePass(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyCoastShapePass');

  const seed = seedToUint32(world.metadata.seed);
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const before = world.cells.map((cell) => totalHeight(cell));

  for (let i = 0; i < world.cells.length; i++) {
    const h = before[i];
    const aboveSea = h - seaLevel;
    const landNeighbors = landNeighborFractionByHeight(world, i, seaLevel, before);
    const waterNeighbors = 1 - landNeighbors;
    const coastMix = Math.min(landNeighbors, waterNeighbors) * 2;
    const nearSurface = 1 - smoothstep(0.025, 0.115, Math.abs(aboveSea));
    const gate = smoothstep(0.18, 0.78, coastMix) * nearSurface;
    if (gate <= 0) continue;

    const texture = smoothTexture(seed, world, i, 41011);
    const fine = centeredJitter(seed, i, 41039);
    const isLand = aboveSea >= 0;
    const damp = coastDamp(world, i);
    let delta = 0;

    if (isLand) {
      delta += Math.max(0, texture) * 0.012 * gate;
      delta -= Math.max(0, -texture - fine * 0.25) * 0.038 * gate * smoothstep(0.18, 0.70, waterNeighbors);
    } else {
      delta += Math.max(0, texture + fine * 0.25) * 0.040 * gate * smoothstep(0.42, 0.90, landNeighbors);
      delta -= Math.max(0, -texture) * 0.010 * gate;
    }

    const safe = guardCoastDelta(h, seaLevel, delta * damp, landNeighbors, waterNeighbors);
    if (safe !== 0) world.cells[i].baseHeight = clamp(world.cells[i].baseHeight + safe, -1.4, 1.5);
  }
}

function guardCoastDelta(height: number, seaLevel: number, delta: number, landNeighbors: number, waterNeighbors: number): number {
  const next = height + delta;
  const wasLand = height >= seaLevel;
  const willBeLand = next >= seaLevel;
  if (!wasLand && willBeLand && landNeighbors < 0.50) return Math.max(0, seaLevel - 0.006 - height);
  if (wasLand && !willBeLand && waterNeighbors < 0.42) return Math.min(0, seaLevel + 0.006 - height);
  return clamp(delta, -0.045, 0.045);
}

function smoothTexture(seed: number, world: WorldBrain, index: number, salt: number): number {
  const neighbors = neighborIndices4(world, index);
  let sum = centeredJitter(seed, index, salt) * 2.2;
  let weight = 2.2;
  for (const neighbor of neighbors) {
    sum += centeredJitter(seed, neighbor, salt);
    weight++;
  }
  return clamp(sum / weight, -1, 1);
}

function coastDamp(world: WorldBrain, index: number): number {
  const cell = world.cells[index];
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 1;
  let plateEdges = 0;
  for (const neighborIndex of neighbors) if (world.cells[neighborIndex].plateId !== cell.plateId) plateEdges++;
  return lerp(1, 0.78, plateEdges / neighbors.length);
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
  const neighbors = [row * world.gridWidth + ((col - 1 + world.gridWidth) % world.gridWidth), row * world.gridWidth + ((col + 1) % world.gridWidth)];
  if (row > 0) neighbors.push((row - 1) * world.gridWidth + col);
  if (row < world.gridHeight - 1) neighbors.push((row + 1) * world.gridWidth + col);
  return neighbors;
}

function totalHeight(cell: Cell): number { return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta; }
function numeric(value: unknown, fallback: number): number { return typeof value === 'number' && Number.isFinite(value) ? value : fallback; }
function centeredJitter(seed: number, index: number, salt: number): number { return deterministicJitter(seed, index, salt) * 2 - 1; }
function deterministicJitter(seed: number, index: number, salt: number): number {
  let h = seed ^ Math.imul(index + 1, 374761393) ^ Math.imul(salt + 1, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}
function seedToUint32(s: string | number): number {
  if (typeof s === 'number') return s >>> 0;
  let h = 2166136261 >>> 0;
  for (let i = 0; i < String(s).length; i++) { h ^= String(s).charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0) & 0xffffffff;
}
function smoothstep(edge0: number, edge1: number, x: number): number { const t = clamp01((x - edge0) / Math.max(1e-9, edge1 - edge0)); return t * t * (3 - 2 * t); }
function lerp(a: number, b: number, t: number): number { return a + (b - a) * t; }
function clamp(value: number, lo: number, hi: number): number { return value < lo ? lo : value > hi ? hi : value; }
function clamp01(value: number): number { return value < 0 ? 0 : value > 1 ? 1 : value; }
