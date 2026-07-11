import {
  BoundaryType,
  ContinentMarginType,
  IslandCause,
  type Cell,
  type WorldBrain,
} from './worldSchema';
import { assertNoAuthoredTerrainDeltas } from './worldLayerAuthority';
import { ensureCrustFields } from './worldCrust';

/**
 * Smooths unexplained underwater height ghosts without letting derived labels or
 * hidden IDs become bathymetry authority. Ridges, trenches, island arcs,
 * and active margins get protection through explicit feature/material authority.
 * Passive shelves are protected by actual coast adjacency, not by submerged
 * continent-skeleton circles sitting in open ocean. Unsupported submerged
 * continental morphology is actively pulled back toward basin depth so it does
 * not paint round continent ghosts into Final/Ocean views.
 */
export function applyOceanBathymetrySmoothing(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyOceanBathymetrySmoothing');
  ensureCrustFields(world);

  const seaLevel = typeof world.seaLevel === 'number' ? world.seaLevel : world.metadata?.seaLevel ?? 0;
  const source = world.cells.map((cell) => totalHeight(cell));
  const deltas = new Float32Array(world.cells.length);

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = source[i];
    if (h >= seaLevel) continue;

    const coastProtection = oceanCoastProtection(world, i, source, seaLevel);
    const cause = explicitOceanBathymetryCause(cell, coastProtection);
    const submergedGhost = submergedContinentGhostSignal(cell, coastProtection);
    const edgeGhost = unexplainedOceanEdgeSignal(world, i, source, seaLevel);
    const interiorBlock = oceanInteriorBlockSignal(world, i, source, seaLevel);
    const localTarget = localOceanAverage(world, i, source, seaLevel);
    if (localTarget == null) continue;

    const basinTarget = seaLevel - lerp(0.10, 0.28, submergedGhost);
    const target = submergedGhost > 0 ? Math.min(localTarget, basinTarget) : localTarget;
    const morphologyProtection = clamp01(Math.max(cause, coastProtection * 0.75));
    const strength = clamp01(0.05 + edgeGhost * 0.26 + interiorBlock * 0.08 + submergedGhost * 0.42) * lerp(1, 0.16, morphologyProtection);
    if (strength <= 0.002) continue;

    const lowerCap = lerp(0.022, 0.060, submergedGhost);
    const rawDelta = clamp((target - h) * strength, -lowerCap, 0.022);
    deltas[i] = capUnbackedOceanProvinceJump(world, i, source, seaLevel, rawDelta, cause);
  }

  for (let i = 0; i < world.cells.length; i++) {
    const h = source[i];
    if (h >= seaLevel || deltas[i] === 0) continue;
    const next = Math.min(seaLevel - 0.006, h + deltas[i]);
    world.cells[i].baseHeight = clamp(world.cells[i].baseHeight + (next - h), -1.4, 1.5);
  }
}

function localOceanAverage(world: WorldBrain, index: number, heights: number[], seaLevel: number): number | null {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  let sum = 0;
  let weightSum = 0;

  for (let dr = -1; dr <= 1; dr++) {
    const r = row + dr;
    if (r < 0 || r >= world.gridHeight) continue;
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const c = (col + dc + world.gridWidth) % world.gridWidth;
      const idx = r * world.gridWidth + c;
      const h = heights[idx];
      if (h >= seaLevel) continue;
      const neighbor = world.cells[idx];
      const coastProtection = oceanCoastProtection(world, idx, heights, seaLevel);
      const cause = explicitOceanBathymetryCause(neighbor, coastProtection);
      const weight = lerp(1, 0.34, cause);
      sum += h * weight;
      weightSum += weight;
    }
  }

  return weightSum > 0 ? sum / weightSum : null;
}

function unexplainedOceanEdgeSignal(world: WorldBrain, index: number, heights: number[], seaLevel: number): number {
  const cell = world.cells[index];
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 0;
  let signal = 0;
  let count = 0;
  for (const neighborIndex of neighbors) {
    const neighbor = world.cells[neighborIndex];
    if (heights[neighborIndex] >= seaLevel) continue;
    count++;
    const cellCause = explicitOceanBathymetryCause(cell, oceanCoastProtection(world, index, heights, seaLevel));
    const neighborCause = explicitOceanBathymetryCause(neighbor, oceanCoastProtection(world, neighborIndex, heights, seaLevel));
    const caused = Math.max(cellCause, neighborCause);
    const heightJump = Math.abs(heights[index] - heights[neighborIndex]);
    signal += smoothstep(0.018, 0.075, heightJump) * (1 - caused);
  }
  return count > 0 ? clamp01(signal / count) : 0;
}

function oceanInteriorBlockSignal(world: WorldBrain, index: number, heights: number[], seaLevel: number): number {
  const cell = world.cells[index];
  const coastProtection = oceanCoastProtection(world, index, heights, seaLevel);
  if (explicitOceanBathymetryCause(cell, coastProtection) > 0.20) return 0;
  const neighborHeights = neighborIndices4(world, index)
    .filter((idx) => heights[idx] < seaLevel)
    .map((idx) => heights[idx]);
  if (neighborHeights.length < 2) return 0;
  const min = Math.min(...neighborHeights);
  const max = Math.max(...neighborHeights);
  return smoothstep(0.025, 0.100, max - min);
}

function oceanCoastProtection(world: WorldBrain, index: number, heights: number[], seaLevel: number): number {
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 0;
  let land = 0;
  for (const neighbor of neighbors) if (heights[neighbor] >= seaLevel) land++;
  return smoothstep(0.01, 0.60, land / neighbors.length);
}

function explicitOceanBathymetryCause(cell: Cell, coastProtection: number): number {
  let cause = explicitActiveOceanCause(cell);

  // Shelf strength is valid bathymetry authority only when it is attached to a
  // real coast. Otherwise submerged continent-skeleton fields can show up as
  // large circular shallow-water ghosts in Final/Ocean views.
  if (cell.shelfStrength > 0.42 && coastProtection > 0.20) cause = Math.max(cause, 0.58);
  if (cell.marginType === ContinentMarginType.PASSIVE && cell.shelfStrength > 0.32 && coastProtection > 0.20) cause = Math.max(cause, 0.42);
  return clamp01(cause);
}

function submergedContinentGhostSignal(cell: Cell, coastProtection: number): number {
  const activeCause = explicitActiveOceanCause(cell);
  if (activeCause > 0.20 || coastProtection > 0.28) return 0;
  const continentalSignal =
    clamp01(cell.continentality) * 0.48
    + clamp01(cell.continentCoreStrength) * 0.34
    + clamp01(cell.shelfStrength) * 0.32
    + (cell.marginType === ContinentMarginType.PASSIVE ? 0.16 : 0);
  const openOceanGate = 1 - smoothstep(0.08, 0.32, coastProtection);
  return clamp01(continentalSignal * openOceanGate);
}

function capUnbackedOceanProvinceJump(world: WorldBrain, index: number, heights: number[], seaLevel: number, delta: number, cause: number): number {
  if (delta === 0 || cause > 0.34) return delta;
  const cell = world.cells[index];
  let cappedDelta = delta;
  for (const neighborIndex of neighborIndices4(world, index)) {
    const neighborHeight = heights[neighborIndex];
    if (neighborHeight >= seaLevel) continue;
    const neighbor = world.cells[neighborIndex];
    if (neighbor.crustProvince === cell.crustProvince) continue;
    const neighborCause = explicitOceanBathymetryCause(neighbor, oceanCoastProtection(world, neighborIndex, heights, seaLevel));
    if (neighborCause > 0.34 || hasSharedActiveOceanCause(cell, neighbor)) continue;
    const beforeJump = Math.abs(heights[index] - neighborHeight);
    const afterHeight = heights[index] + cappedDelta;
    const afterJump = Math.abs(afterHeight - neighborHeight);
    if (afterJump <= beforeJump || afterJump <= 0.034) continue;
    const allowedJump = Math.max(beforeJump, 0.034);
    const sign = afterHeight >= neighborHeight ? 1 : -1;
    const cappedHeight = neighborHeight + sign * allowedJump;
    const candidateDelta = cappedHeight - heights[index];
    if (Math.abs(candidateDelta) < Math.abs(cappedDelta)) cappedDelta = candidateDelta;
  }
  return cappedDelta;
}

function hasSharedActiveOceanCause(a: Cell, b: Cell): boolean {
  if (Math.min(explicitActiveOceanCause(a), explicitActiveOceanCause(b)) > 0.22) return true;
  if (a.marginType === b.marginType && (a.marginType === ContinentMarginType.ACTIVE || a.marginType === ContinentMarginType.RIFT)) return true;
  if (a.islandCause === b.islandCause && (a.islandCause === IslandCause.ISLAND_ARC || a.islandCause === IslandCause.VOLCANIC_HOTSPOT || a.islandCause === IslandCause.RIFT_FRAGMENT)) return true;
  return false;
}

function explicitActiveOceanCause(cell: Cell): number {
  let cause = 0;
  if (cell.boundaryType === BoundaryType.CONVERGENT || cell.boundaryType === BoundaryType.DIVERGENT) cause = Math.max(cause, 0.9);
  if (cell.boundaryType === BoundaryType.TRANSFORM) cause = Math.max(cause, 0.45);
  if (cell.islandCause === IslandCause.ISLAND_ARC || cell.islandCause === IslandCause.VOLCANIC_HOTSPOT) cause = Math.max(cause, 0.9);
  if (cell.volcanicActivity > 0.55) cause = Math.max(cause, 0.72);
  if (Math.abs(cell.upliftRate) > 0.55) cause = Math.max(cause, 0.64);
  if (cell.marginType === ContinentMarginType.ACTIVE || cell.marginType === ContinentMarginType.RIFT) cause = Math.max(cause, 0.50);
  return clamp01(cause);
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
