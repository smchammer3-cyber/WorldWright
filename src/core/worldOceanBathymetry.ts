import {
  BoundaryType,
  CrustProvince,
  IslandCause,
  OceanDepthClass,
  PlateType,
  type Cell,
  type WorldBrain,
} from './worldSchema';
import { assertNoAuthoredTerrainDeltas } from './worldLayerAuthority';
import { ensureCrustFields } from './worldCrust';

/**
 * Smooths unexplained underwater plate/province ghosts without erasing caused
 * bathymetry. Ridges, trenches, island arcs, shelves, and coastal slopes get
 * protection. Uncaused ocean cells near hard plate/province edges are blended
 * toward nearby ocean heights so Final view and future heightmap export do not
 * reveal the raw plate polygon map.
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

    const cause = explicitOceanBathymetryCause(cell);
    const coastProtection = oceanCoastProtection(world, i, source, seaLevel);
    const edgeGhost = unexplainedOceanEdgeSignal(world, i, source, seaLevel);
    const interiorBlock = oceanInteriorBlockSignal(world, i, source, seaLevel);
    const target = localOceanAverage(world, i, source, seaLevel);
    if (target == null) continue;

    const shelfProtection = cell.oceanDepthClass === OceanDepthClass.SHELF || cell.oceanDepthClass === OceanDepthClass.SLOPE ? 0.58 : 0;
    const causeProtection = clamp01(Math.max(cause, shelfProtection, coastProtection * 0.75));
    const strength = clamp01(0.05 + edgeGhost * 0.26 + interiorBlock * 0.08) * lerp(1, 0.16, causeProtection);
    if (strength <= 0.002) continue;

    deltas[i] = clamp((target - h) * strength, -0.022, 0.022);
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
  const center = world.cells[index];

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
      const cause = explicitOceanBathymetryCause(neighbor);
      const acrossHiddenEdge = neighbor.plateId !== center.plateId || neighbor.crustProvince !== center.crustProvince;
      const weight = (acrossHiddenEdge ? 1.35 : 1) * lerp(1, 0.34, cause);
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
    const edge = neighbor.plateId !== cell.plateId || neighbor.crustProvince !== cell.crustProvince;
    if (!edge) continue;
    count++;
    const caused = Math.max(explicitOceanBathymetryCause(cell), explicitOceanBathymetryCause(neighbor));
    const heightJump = Math.abs(heights[index] - heights[neighborIndex]);
    signal += smoothstep(0.018, 0.075, heightJump) * (1 - caused);
  }
  return count > 0 ? clamp01(signal / count) : 0;
}

function oceanInteriorBlockSignal(world: WorldBrain, index: number, heights: number[], seaLevel: number): number {
  const cell = world.cells[index];
  if (explicitOceanBathymetryCause(cell) > 0.20) return 0;
  const neighbors = neighborIndices4(world, index).filter((idx) => heights[idx] < seaLevel);
  if (neighbors.length < 2) return 0;
  let samePlateJump = 0;
  let samePlateCount = 0;
  let differentPlateJump = 0;
  let differentPlateCount = 0;
  for (const idx of neighbors) {
    const jump = Math.abs(heights[index] - heights[idx]);
    if (world.cells[idx].plateId === cell.plateId) {
      samePlateJump += jump;
      samePlateCount++;
    } else {
      differentPlateJump += jump;
      differentPlateCount++;
    }
  }
  if (samePlateCount === 0 || differentPlateCount === 0) return 0;
  return smoothstep(1.15, 2.10, (differentPlateJump / differentPlateCount) / Math.max(0.001, samePlateJump / samePlateCount));
}

function oceanCoastProtection(world: WorldBrain, index: number, heights: number[], seaLevel: number): number {
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 0;
  let land = 0;
  for (const neighbor of neighbors) if (heights[neighbor] >= seaLevel) land++;
  return smoothstep(0.01, 0.60, land / neighbors.length);
}

function explicitOceanBathymetryCause(cell: Cell): number {
  let cause = 0;
  if (cell.oceanDepthClass === OceanDepthClass.TRENCH) cause = Math.max(cause, 1.0);
  if (cell.oceanDepthClass === OceanDepthClass.RIDGE) cause = Math.max(cause, 0.95);
  if (cell.oceanDepthClass === OceanDepthClass.SHELF || cell.oceanDepthClass === OceanDepthClass.SLOPE) cause = Math.max(cause, 0.58);
  if (cell.boundaryType === BoundaryType.CONVERGENT || cell.boundaryType === BoundaryType.DIVERGENT) cause = Math.max(cause, 0.9);
  if (cell.boundaryType === BoundaryType.TRANSFORM) cause = Math.max(cause, 0.45);
  if (cell.crustProvince === CrustProvince.ISLAND_ARC || cell.crustProvince === CrustProvince.VOLCANIC_PROVINCE) cause = Math.max(cause, 0.82);
  if (cell.islandCause === IslandCause.ISLAND_ARC || cell.islandCause === IslandCause.VOLCANIC_HOTSPOT) cause = Math.max(cause, 0.9);
  if (cell.volcanicActivity > 0.55) cause = Math.max(cause, 0.72);
  if (cell.plateType === PlateType.OCEANIC && cell.crustProvince === CrustProvince.OCEANIC_BASIN) cause = Math.max(cause, 0.18);
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
