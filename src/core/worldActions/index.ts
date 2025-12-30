import type { WorldBrain } from "../worldSchema";

// Terrain brush tools supported by the WorldAction system.
// RAISE increases height, LOWER decreases height, FLATTEN brings heights towards
// the average height within the brush, and SMOOTH performs a similar
// operation. Tools are intentionally simple but produce real edits so they are
// compatible with undo/redo and derived-field recomputation.
export type TerrainStrokeTool = 'RAISE' | 'LOWER' | 'FLATTEN' | 'SMOOTH';

/**
 * WorldAction defines all possible edit commands that can be applied to a
 * WorldBrain. Each action type is a discriminated union with a specific
 * payload. As new actions are introduced (stickers, borders, cultures, etc.)
 * they should extend this union. For now, only terrain strokes are
 * implemented.
 */
export type WorldAction =
  | {
      type: 'TERRAIN_STROKE';
      tool: TerrainStrokeTool;
      center: { row: number; col: number };
      /**
       * Radius of the brush in grid cells. Values are clamped to at least 1
       * internally. The brush uses a circular falloff so distances outside
       * the radius are ignored.
       */
      radius: number;
      /**
       * Strength of the stroke. For RAISE/LOWER this is the maximum height
       * delta added or subtracted at the brush centre. For FLATTEN/SMOOTH
       * this controls how aggressively heights move towards the average. Must
       * be a non‑negative finite number.
       */
      strength: number;
    };

/**
 * Apply a single WorldAction to the provided world. This function mutates
 * world.cells in place but does not perform recomputation; callers should
 * invoke recomputeWorld() themselves after the action. Defensive checks are
 * performed on action payloads to avoid exceptions and to keep edits
 * deterministic.
 */
export function applyWorldAction(world: WorldBrain, action: WorldAction): void {
  switch (action.type) {
    case 'TERRAIN_STROKE': {
      const { tool, center, radius, strength } = action;
      if (!world || !Array.isArray(world.cells)) return;
      const gridWidth = world.gridWidth;
      const gridHeight = world.gridHeight;
      const cells = world.cells;

      // Clamp parameters to safe ranges.
      const rad = Math.max(1, Math.floor(Number.isFinite(radius) ? radius : 1));
      const str = Number.isFinite(strength) && strength >= 0 ? strength : 0;

      // Precompute the target height for flatten/smooth actions. We compute
      // a simple average of the current heights within the brush footprint.
      let targetHeight = 0;
      let count = 0;
      if (tool === 'FLATTEN' || tool === 'SMOOTH') {
        for (let dr = -rad; dr <= rad; dr++) {
          const r = center.row + dr;
          // Do not wrap vertically; out-of-bounds rows are ignored.
          if (r < 0 || r >= gridHeight) continue;
          for (let dc = -rad; dc <= rad; dc++) {
            const dist = Math.sqrt(dr * dr + dc * dc);
            if (dist > radius) continue;
            const c = center.col + dc;
            // Wrap horizontally around the world.
            const cc = ((c % gridWidth) + gridWidth) % gridWidth;
            const idx = r * gridWidth + cc;
            const cell = cells[idx];
            const h = cell.baseHeight + cell.editHeightDelta;
            targetHeight += h;
            count++;
          }
        }
        if (count > 0) targetHeight /= count;
      }

      // Apply brush to each cell within radius.
      for (let dr = -rad; dr <= rad; dr++) {
        const r = center.row + dr;
        if (r < 0 || r >= gridHeight) continue;
        for (let dc = -rad; dc <= rad; dc++) {
          const dist = Math.sqrt(dr * dr + dc * dc);
          if (dist > radius) continue;
          const c = center.col + dc;
          const cc = ((c % gridWidth) + gridWidth) % gridWidth;
          const idx = r * gridWidth + cc;
          const cell = cells[idx];
          // Linear falloff based on distance; 1 at center, 0 at radius.
          const weight = (radius - dist) / radius;

          if (tool === 'RAISE') {
            cell.editHeightDelta += str * weight;
          } else if (tool === 'LOWER') {
            cell.editHeightDelta -= str * weight;
          } else if (tool === 'FLATTEN' || tool === 'SMOOTH') {
            const current = cell.baseHeight + cell.editHeightDelta;
            const delta = (targetHeight - current) * str * weight;
            cell.editHeightDelta += delta;
          }
        }
      }
      return;
    }
    default: {
      // Exhaustive check: if union is extended but not handled here,
      // TypeScript will signal an error. At runtime we simply do nothing.
      const _exhaustive: never = action;
      void _exhaustive;
      return;
    }
  }
}

// Alias used by worldEditor; maintained for backward compatibility.
export const applyAction = applyWorldAction;