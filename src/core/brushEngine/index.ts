// ========================================================
// WORLDWRIGHT -- BRUSH ENGINE (V1.3)
// File: src/core/brushEngine/index.ts
//
// Pure brush calculation functions for terrain editing.
// No world mutation - returns deltas to be applied.
// ========================================================

export type BrushShape = 'CIRCLE' | 'SQUARE';
export type BrushFalloff = 'HARD' | 'SOFT';

export interface BrushParams {
  shape: BrushShape;
  falloff: BrushFalloff;
  radius: number; // in cells
  strength: number; // 0..1
}

export type BrushDelta = {
  cellIndex: number;
  heightDelta: number;
};

/**
 * Calculate a gaussian falloff from 0 to 1 based on normalized distance.
 * distance: 0..1 (0 at center, 1 at edge of brush)
 */
function gaussianFalloff(distance: number): number {
  // Gaussian: e^(-4*d^2) gives smooth drop-off
  return Math.exp(-4 * distance * distance);
}

/**
 * Linear falloff: 1 at center, 0 at edge
 */
function linearFalloff(distance: number): number {
  return Math.max(0, 1 - distance);
}

/**
 * Hard falloff: 1 within radius, 0 outside
 */
function hardFalloff(distance: number): number {
  return distance <= 1 ? 1 : 0;
}

function getFalloffFn(falloff: BrushFalloff): (d: number) => number {
  switch (falloff) {
    case 'HARD':
      return hardFalloff;
    case 'SOFT':
      return gaussianFalloff;
    default:
      return gaussianFalloff;
  }
}

/**
 * Calculate brush effect radius in grid cells based on brush params.
 */
export function calculateBrushRadius(params: BrushParams): number {
  return Math.max(1, Math.floor(params.radius));
}

/**
 * Calculate affected cells and their height deltas for a brush stroke.
 * Returns array of deltas to apply to world cells.
 */
export function calculateBrushDeltas(
  gridWidth: number,
  gridHeight: number,
  centerRow: number,
  centerCol: number,
  params: BrushParams,
  operation: 'RAISE' | 'LOWER' | 'FLATTEN' | 'SMOOTH',
  existingHeights: number[]
): BrushDelta[] {
  const deltas: BrushDelta[] = [];
  const radius = calculateBrushRadius(params);
  const falloffFn = getFalloffFn(params.falloff);
  const strength = Math.max(0, Math.min(1, params.strength));

  // Get the height at brush center for FLATTEN operation
  const centerIdx = centerRow * gridWidth + centerCol;
  let flattenTarget = 0;
  if (centerIdx >= 0 && centerIdx < existingHeights.length) {
    flattenTarget = existingHeights[centerIdx];
  }

  // Collect affected cells
  const minRow = Math.max(0, centerRow - radius);
  const maxRow = Math.min(gridHeight - 1, centerRow + radius);
  const minCol = centerCol - radius; // wrap horizontally

  for (let r = minRow; r <= maxRow; r++) {
    for (let c = minCol; c < minCol + 2 * radius + 1; c++) {
      // Wrap column around for spherical world
      const wrappedCol = ((c % gridWidth) + gridWidth) % gridWidth;
      const idx = r * gridWidth + wrappedCol;

      if (idx < 0 || idx >= existingHeights.length) continue;

      // Distance calculation
      const dr = r - centerRow;
      const dc = Math.abs(c - centerCol);
      // Handle wrapping: shortest distance around sphere
      const wrappedDc = Math.min(dc, gridWidth - dc);

      let dist: number;
      if (params.shape === 'CIRCLE') {
        dist = Math.sqrt(dr * dr + wrappedDc * wrappedDc) / radius;
      } else {
        // SQUARE: Chebyshev distance
        dist = Math.max(Math.abs(dr), wrappedDc) / radius;
      }

      if (dist > 1) continue; // Outside brush

      const falloff = falloffFn(dist);
      const effect = falloff * strength;

      let delta = 0;
      const currentHeight = existingHeights[idx];

      switch (operation) {
        case 'RAISE':
          delta = 0.1 * effect; // Raise by ~0.1 * effect
          break;
        case 'LOWER':
          delta = -0.1 * effect;
          break;
        case 'FLATTEN': {
          const diff = flattenTarget - currentHeight;
          delta = diff * effect * 0.5; // Partial move toward target
          break;
        }
        case 'SMOOTH': {
          // Average with neighbors
          let neighborSum = 0;
          let count = 0;
          const smoothRadius = 1;
          for (let sr = -smoothRadius; sr <= smoothRadius; sr++) {
            const nr = r + sr;
            if (nr < 0 || nr >= gridHeight) continue;
            for (let sc = -smoothRadius; sc <= smoothRadius; sc++) {
              if (sr === 0 && sc === 0) continue;
              const nwr = ((sr + 1 + gridHeight) % gridHeight);
              const nwc = ((wrappedCol + sc) % gridWidth + gridWidth) % gridWidth;
              const nIdx = nwr * gridWidth + nwc;
              if (nIdx >= 0 && nIdx < existingHeights.length) {
                neighborSum += existingHeights[nIdx];
                count++;
              }
            }
          }
          if (count > 0) {
            const avgNeighbor = neighborSum / count;
            const diff = avgNeighbor - currentHeight;
            delta = diff * effect * 0.3; // Partial smooth
          }
          break;
        }
      }

      if (Math.abs(delta) > 1e-6) {
        deltas.push({ cellIndex: idx, heightDelta: delta });
      }
    }
  }

  return deltas;
}

/**
 * Merge multiple brush deltas (for multi-stroke actions) by summing per-cell.
 */
export function mergeBrushDeltas(deltaArrays: BrushDelta[][]): BrushDelta[] {
  const map = new Map<number, number>();
  for (const deltaArray of deltaArrays) {
    for (const { cellIndex, heightDelta } of deltaArray) {
      map.set(cellIndex, (map.get(cellIndex) ?? 0) + heightDelta);
    }
  }
  return Array.from(map.entries()).map(([cellIndex, heightDelta]) => ({
    cellIndex,
    heightDelta,
  }));
}
