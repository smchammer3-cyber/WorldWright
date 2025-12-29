// ========================================================
// WORLDWRIGHT -- ACTIONS (V1.3)
// File: src/core/worldActions/index.ts
//
// Single mutation gateway: all Create-mode edits become actions.
// This is how we reach "tiny modular edits only."
// ========================================================

import type { WorldBrain } from '../worldSchema';
import { recomputeWorld } from '../worldRecompute';

export type WorldAction =
  | TerrainStrokeAction;

export type TerrainStrokeAction = {
  type: 'TERRAIN_STROKE';
  tool: 'RAISE' | 'LOWER' | 'FLATTEN' | 'SMOOTH';
  center: { row: number; col: number };
  radius: number;
  strength: number; // positive magnitude
};

export function applyAction(world: WorldBrain, action: WorldAction): void {
  switch (action.type) {
    case 'TERRAIN_STROKE':
      applyTerrainStroke(world, action);
      recomputeWorld(world, ['TERRAIN_EDIT']);
      return;

    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

function applyTerrainStroke(world: WorldBrain, action: TerrainStrokeAction): void {
  const { gridWidth, gridHeight, cells } = world;

  const { tool, center, radius, strength } = action;
  const r0 = center.row;
  const c0 = center.col;

  const rMin = Math.floor(r0 - radius);
  const rMax = Math.ceil(r0 + radius);
  const cMin = Math.floor(c0 - radius);
  const cMax = Math.ceil(c0 + radius);

  // Cheap radial falloff (0..1)
  for (let r = rMin; r <= rMax; r++) {
    for (let c = cMin; c <= cMax; c++) {
      const dr = r - r0;
      const dc = c - c0;
      const dist = Math.sqrt(dr * dr + dc * dc);
      if (dist > radius) continue;

      const falloff = 1 - dist / Math.max(0.0001, radius);
      const delta = strength * falloff;

      const rr = (r + gridHeight) % gridHeight;
      const cc = (c + gridWidth) % gridWidth;
      const idx = rr * gridWidth + cc;
      const cell = cells[idx];

      switch (tool) {
        case 'RAISE':
          cell.editHeightDelta += delta;
          break;

        case 'LOWER':
          cell.editHeightDelta -= delta;
          break;

        case 'FLATTEN': {
          const target = cell.baseHeight + delta;
          const current = cell.baseHeight + cell.editHeightDelta;
          cell.editHeightDelta += target - current;
          break;
        }

        case 'SMOOTH': {
          // Smooth: pull toward neighbor average (small, stable)
          let sum = 0;
          let count = 0;

          for (const [dr2, dc2] of [
            [0, 1], [1, 0], [-1, 0], [0, -1],
            [1, 1], [-1, -1], [1, -1], [-1, 1],
          ] as const) {
            const nr = (rr + dr2 + gridHeight) % gridHeight;
            const nc = (cc + dc2 + gridWidth) % gridWidth;
            const nIdx = nr * gridWidth + nc;
            const nCell = cells[nIdx];
            sum += nCell.baseHeight + nCell.editHeightDelta;
            count++;
          }

          const avg = sum / Math.max(1, count);
          const current = cell.baseHeight + cell.editHeightDelta;
          const pull = (avg - current) * 0.35; // smoothing factor
          cell.editHeightDelta += pull * falloff;
          break;
        }
      }
    }
  }
}