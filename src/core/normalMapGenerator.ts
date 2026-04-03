// ========================================================
// WORLDWRIGHT -- NORMAL MAP GENERATOR
// File: src/core/normalMapGenerator.ts
//
// Generates normal maps from world height data for physically-based
// lighting in Three.js. Normals are derived from height gradients.
//
// CONTRACT: This is part of the Globe3D rendering pipeline only.
// The CPU planetRenderer outputs ALBEDO; this outputs NORMALS.
// ========================================================

import type { WorldBrain } from "./worldSchema";

export type NormalMap = {
  width: number;
  height: number;
  // RGB channels store normal XYZ (remapped from [-1,1] to [0,255])
  // Alpha is always 255
  rgba: Uint8ClampedArray;
};

/**
 * Generate a normal map from world height data.
 * Normals are computed from height gradients using central differences.
 * 
 * @param world - The world to generate normals from
 * @param heightScale - Vertical scale factor for height differences (default: 0.3)
 * @returns NormalMap with RGB encoding normals
 */
export function generateNormalMap(world: WorldBrain, heightScale: number = 0.3): NormalMap {
  const width = world.gridWidth;
  const height = world.gridHeight;
  const cells = Array.isArray(world.cells) ? world.cells : [];

  const rgba = new Uint8ClampedArray(width * height * 4);

  /**
   * Get total height at a cell (base + edit + sim deltas)
   */
  function getHeight(row: number, col: number): number {
    if (height === 0 || width === 0) return 0;
    
    // Clamp row (poles)
    const cRow = Math.max(0, Math.min(height - 1, row));
    
    // Wrap column (meridian)
    let cCol = col % width;
    if (cCol < 0) cCol += width;
    
    const idx = cRow * width + cCol;
    const cell = cells[idx];
    if (!cell) return 0;

    const base = typeof cell.baseHeight === "number" ? cell.baseHeight : 
                 typeof (cell as any).height === "number" ? (cell as any).height : 0;
    const editDelta = typeof cell.editHeightDelta === "number" ? cell.editHeightDelta : 0;
    const simDelta = typeof cell.simHeightDelta === "number" ? cell.simHeightDelta : 0;
    
    return base + editDelta + simDelta;
  }

  /**
   * Compute normal at cell (row, col) using central differences
   * with proper wrapping/clamping at boundaries
   */
  function computeNormal(row: number, col: number): [number, number, number] {
    const h = getHeight(row, col);
    
    // Sample neighbors with wrapping (horizontal) and clamping (vertical)
    const hL = getHeight(row, col - 1); // West
    const hR = getHeight(row, col + 1); // East
    const hU = getHeight(row - 1, col); // North
    const hD = getHeight(row + 1, col); // South
    
    // Central differences for gradients
    // dx: horizontal gradient (west to east)
    // dy: vertical gradient (north to south)
    const dx = (hR - hL) * heightScale;
    const dy = (hD - hU) * heightScale;
    
    // Normal from cross product of tangent vectors
    // Tangent along x: (1, 0, dx)
    // Tangent along y: (0, 1, dy)
    // Normal = cross product = (-dx, -dy, 1)
    const nx = -dx;
    const ny = -dy;
    const nz = 1.0;
    
    // Normalize
    const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (len < 1e-8) return [0, 0, 1]; // Fallback for flat areas
    
    return [nx / len, ny / len, nz / len];
  }

  // Generate normal map
  let offset = 0;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const [nx, ny, nz] = computeNormal(row, col);
      
      // Remap normal from [-1, 1] to [0, 255]
      rgba[offset++] = Math.round((nx * 0.5 + 0.5) * 255);
      rgba[offset++] = Math.round((ny * 0.5 + 0.5) * 255);
      rgba[offset++] = Math.round((nz * 0.5 + 0.5) * 255);
      rgba[offset++] = 255; // Alpha
    }
  }

  return {
    width,
    height,
    rgba,
  };
}

/**
 * Create a canvas texture from a normal map for use in Three.js
 */
export function normalMapToCanvas(normalMap: NormalMap): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = normalMap.width;
  canvas.height = normalMap.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to create canvas 2D context for normal map');
  
  const imageData = ctx.createImageData(normalMap.width, normalMap.height);
  imageData.data.set(normalMap.rgba);
  ctx.putImageData(imageData, 0, 0);
  
  return canvas;
}
