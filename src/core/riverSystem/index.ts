// ========================================================
// WORLDWRIGHT -- RIVER SYSTEM (V1.3)
// File: src/core/riverSystem/index.ts
//
// Extract rivers from hydrology and provide editing tools.
// ========================================================

import type { WorldBrain, River } from '../worldSchema';

/**
 * Extract rivers from flow accumulation data.
 * Returns polylines representing major river systems.
 */
export function extractRiversFromHydrology(world: WorldBrain, threshold: number = 100): River[] {
  const { cells, gridWidth, gridHeight, seaLevel } = world;
  const rivers: River[] = [];
  const visited = new Set<number>();
  let riverCount = 0;

  // Find cells with high flow accumulation (river source candidates)
  const riverCells = cells.filter(
    (c) =>
      !c.isWater &&
      c.flowAccumulation > threshold &&
      c.baseHeight + c.editHeightDelta > seaLevel
  );

  for (const sourceCell of riverCells) {
    if (visited.has(sourceCell.index)) continue;

    // Trace river downstream
    const path: number[] = [];
    let currentIdx = sourceCell.index;
    let safety = 0;
    const maxSafety = gridWidth * gridHeight;

    while (safety < maxSafety) {
      safety++;
      if (visited.has(currentIdx)) break;

      path.push(currentIdx);
      visited.add(currentIdx);

      const cell = cells[currentIdx];
      if (!cell || cell.isWater || cell.flowDirection === null) break;

      currentIdx = cell.flowDirection;
      if (currentIdx < 0 || currentIdx >= cells.length) break;
    }

    if (path.length > 5) {
      // Only count meaningful rivers (>5 cells long)
      const mouthIdx = path[path.length - 1];
      rivers.push({
        id: riverCount++,
        sourceCellIndex: sourceCell.index,
        mouthCellIndex: mouthIdx,
        path,
      });
    }
  }

  return rivers;
}

/**
 * Add a new river by drawing a path from source to mouth.
 */
export function addRiver(world: WorldBrain, sourceCellIdx: number, mouthCellIdx: number): River | null {
  const { cells, gridWidth, gridHeight } = world;

  if (sourceCellIdx < 0 || sourceCellIdx >= cells.length) return null;
  if (mouthCellIdx < 0 || mouthCellIdx >= cells.length) return null;

  // Trace path downhill from source to mouth (or nearest water)
  const path = tracePathDownhill(world, sourceCellIdx);

  const newRiver: River = {
    id: world.rivers.length,
    sourceCellIndex: sourceCellIdx,
    mouthCellIndex: path[path.length - 1],
    path,
  };

  world.rivers.push(newRiver);
  return newRiver;
}

/**
 * Trace a path downhill from a source cell.
 */
function tracePathDownhill(world: WorldBrain, startIdx: number): number[] {
  const { cells, gridWidth, gridHeight, seaLevel } = world;
  const path: number[] = [];
  let currentIdx = startIdx;
  let safety = 0;
  const maxSafety = gridWidth * gridHeight;

  while (safety < maxSafety) {
    safety++;
    if (path.includes(currentIdx)) break; // Cycle detection

    path.push(currentIdx);
    const cell = cells[currentIdx];

    if (!cell || cell.isWater) break; // Reached water body

    // Follow flow direction
    if (cell.flowDirection !== null) {
      currentIdx = cell.flowDirection;
      if (currentIdx < 0 || currentIdx >= cells.length) break;
    } else {
      break; // No more downhill cells
    }
  }

  return path;
}

/**
 * Delete a river by ID.
 */
export function deleteRiver(world: WorldBrain, riverId: number): boolean {
  const index = world.rivers.findIndex((r) => r.id === riverId);
  if (index >= 0) {
    world.rivers.splice(index, 1);
    return true;
  }
  return false;
}

/**
 * Reroute a river (change its path).
 */
export function rerouteRiver(world: WorldBrain, riverId: number, newPath: number[]): boolean {
  const river = world.rivers.find((r) => r.id === riverId);
  if (!river) return false;

  river.path = newPath;
  if (newPath.length > 0) {
    river.mouthCellIndex = newPath[newPath.length - 1];
  }
  return true;
}
