import {
  BoundaryType,
  ContinentMarginType,
  IslandCause,
  OceanDepthClass,
  PlateType,
  type Cell,
  type WorldBrain,
} from '../worldSchema';
import { buildGeographyProfile, type GeographyProfile } from '../worldGeographyProfile';

/**
 * Authority cleanup is not another world generator. It is a guardrail that keeps
 * plate/boundary artifacts from overruling the continent/ocean skeleton after
 * crust influence runs.
 */
export function applyGeographyAuthorityCleanup(
  world: WorldBrain,
  profile: GeographyProfile = buildGeographyProfile(world),
): void {
  if (!world?.cells?.length) return;

  const seaLevel = typeof world.seaLevel === 'number' ? world.seaLevel : world.metadata?.seaLevel ?? 0;
  const before = world.cells.map((cell) => totalHeight(cell));
  const rawDelta = new Float32Array(world.cells.length);

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const aboveSea = h - seaLevel;
    const boundaryProximity = 1 - clamp01(cell.distanceToBoundary);
    const plateSignal = clamp01(cell.boundaryStrength * 0.70 + boundaryProximity * 0.30);
    if (plateSignal <= 0.10) continue;

    const continentality = clamp01(cell.continentality);
    const core = clamp01(cell.continentCoreStrength);
    const shelf = clamp01(cell.shelfStrength);
    const nearSurface = 1 - smoothstep(0.08, 0.26, Math.abs(aboveSea));
    const landNeighbors = landNeighborFractionByHeight(world, i, seaLevel, before);
    const waterNeighbors = 1 - landNeighbors;
    const caused = isCausedPlateFeature(cell);

    let delta = 0;

    // Plates may express collision/rift/arcs, but low-authority ocean/shelf cells
    // should not become long visible plate-painted bands.
    const weakSkeletonAuthority = continentality < 0.34 && core < 0.24;
    if (weakSkeletonAuthority && nearSurface > 0 && !caused) {
      const sink = 0.038 * profile.oceanBasinWeight * plateSignal * nearSurface * (0.45 + waterNeighbors * 0.55);
      delta -= sink;
    }

    // Continental plate type alone is not allowed to create exposed land far from
    // continent skeletons. Skeleton identity wins broad land/ocean authority.
    if (cell.plateType === PlateType.CONTINENTAL && cell.continentId == null && continentality < 0.26 && aboveSea > -0.04) {
      delta -= 0.030 * profile.cleanupWeight * 5.0 * plateSignal;
    }

    // Shelf bridges are allowed only near real continental cores/margins. When a
    // plate boundary is keeping shallow water at threshold, push it toward ocean.
    if (shelf > 0.36 && core < 0.36 && Math.abs(aboveSea) < 0.10) {
      delta -= 0.030 * profile.shelfWeight * plateSignal * (0.55 + Math.min(landNeighbors, waterNeighbors));
    }

    // Oceanic interiors should read as ocean basins, not plate polygons.
    if (cell.plateType === PlateType.OCEANIC && continentality < 0.28 && h < seaLevel && cell.oceanDepthClass !== OceanDepthClass.TRENCH) {
      delta -= 0.020 * profile.oceanBasinWeight * plateSignal * (1 - shelf * 0.55);
    }

    // Preserve meaningful plate causes when they agree with skeleton/province
    // context, but keep them modest so they become features, not whole polygons.
    if ((cell.boundaryType === BoundaryType.CONVERGENT || cell.marginType === ContinentMarginType.COLLISION) && continentality > 0.48) {
      delta += 0.014 * profile.tectonicReliefWeight * plateSignal * smoothstep(0.44, 0.88, continentality);
    } else if (cell.boundaryType === BoundaryType.DIVERGENT || cell.marginType === ContinentMarginType.RIFT) {
      delta -= 0.018 * profile.oceanBasinWeight * plateSignal * nearSurface;
    }

    rawDelta[i] = delta;
  }

  const smoothedDelta = smoothDeltas(world, rawDelta, 0.35);
  for (let i = 0; i < world.cells.length; i++) {
    const delta = smoothedDelta[i];
    if (Math.abs(delta) < 1e-6) continue;
    world.cells[i].baseHeight = clamp(world.cells[i].baseHeight + delta, -1.4, 1.5);
  }
}

function smoothDeltas(world: WorldBrain, deltas: Float32Array, neighborBlend: number): Float32Array {
  const out = new Float32Array(deltas.length);
  for (let i = 0; i < deltas.length; i++) {
    const neighbors = neighborIndices4(world, i);
    if (neighbors.length === 0) {
      out[i] = deltas[i];
      continue;
    }
    let sum = 0;
    for (const n of neighbors) sum += deltas[n];
    const avg = sum / neighbors.length;
    out[i] = deltas[i] * (1 - neighborBlend) + avg * neighborBlend;
  }
  return out;
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

function isCausedPlateFeature(cell: Cell): boolean {
  return (
    cell.islandCause === IslandCause.ISLAND_ARC ||
    cell.islandCause === IslandCause.VOLCANIC_HOTSPOT ||
    cell.islandCause === IslandCause.RIFT_FRAGMENT ||
    cell.boundaryType === BoundaryType.CONVERGENT ||
    cell.marginType === ContinentMarginType.COLLISION ||
    cell.marginType === ContinentMarginType.RIFT ||
    cell.volcanicActivity > 0.48
  );
}

function totalHeight(cell: Cell): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / Math.max(1e-9, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function clamp(value: number, lo: number, hi: number): number {
  return value < lo ? lo : value > hi ? hi : value;
}

function clamp01(value: number): number {
  return clamp(value, 0, 1);
}
