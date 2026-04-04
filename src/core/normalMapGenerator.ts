// ========================================================
// WORLDWRIGHT -- NORMAL MAP GENERATOR
// File: src/core/normalMapGenerator.ts
//
// Generates normal maps from world height data for physically-based
// lighting in Three.js. Normals are derived from height gradients.
//
// CONTRACT: This is part of the Globe3D rendering pipeline only.
// The CPU planetRenderer outputs ALBEDO; this outputs NORMALS.
//
// V1.3 POLE-SAFE UPDATE:
// - damp horizontal gradients near poles
// - avoid harsh clamp-derived vertical artifacts at top/bottom rows
// - reduce concentric ring / pole singular amplification
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
 * Normals are computed from height gradients using central differences,
 * with pole-safe damping and edge handling.
 *
 * @param world - The world to generate normals from
 * @param heightScale - Vertical scale factor for height differences (default: 0.3)
 * @returns NormalMap with RGB encoding normals
 */
export function generateNormalMap(
  world: WorldBrain,
  heightScale: number = 0.3
): NormalMap {
  const width = world.gridWidth;
  const height = world.gridHeight;
  const cells = Array.isArray(world.cells) ? world.cells : [];

  const rgba = new Uint8ClampedArray(width * height * 4);

  function clampRow(row: number): number {
    return Math.max(0, Math.min(height - 1, row));
  }

  function wrapCol(col: number): number {
    if (width === 0) return 0;
    let c = col % width;
    if (c < 0) c += width;
    return c;
  }

  /**
   * Get total height at a cell (base + edit + sim deltas)
   */
  function getHeight(row: number, col: number): number {
    if (height === 0 || width === 0) return 0;

    const cRow = clampRow(row);
    const cCol = wrapCol(col);

    const idx = cRow * width + cCol;
    const cell = cells[idx];
    if (!cell) return 0;

    const base =
      typeof cell.baseHeight === "number"
        ? cell.baseHeight
        : typeof (cell as any).height === "number"
        ? (cell as any).height
        : 0;

    const editDelta =
      typeof cell.editHeightDelta === "number" ? cell.editHeightDelta : 0;
    const simDelta =
      typeof cell.simHeightDelta === "number" ? cell.simHeightDelta : 0;

    return base + editDelta + simDelta;
  }

  /**
   * Compute latitude-based pole damping.
   * 0 near equator, 1 at poles.
   */
  function poleProximity(row: number): number {
    if (height <= 1) return 1;
    const lat01 = Math.abs((row / (height - 1)) * 2 - 1);
    return smoothstep(0.78, 1.0, lat01);
  }

  /**
   * Compute normal at cell (row, col).
   *
   * Important:
   * - horizontal gradient is damped near poles because longitude collapses there
   * - top/bottom rows use one-sided vertical differences instead of clamp-reuse
   */
  function computeNormal(row: number, col: number): [number, number, number] {
    const p = poleProximity(row);

    const h = getHeight(row, col);

    const hL = getHeight(row, col - 1);
    const hR = getHeight(row, col + 1);

    let dy: number;
    if (row <= 0) {
      // one-sided difference at north pole row
      dy = (getHeight(1, col) - h) * heightScale;
    } else if (row >= height - 1) {
      // one-sided difference at south pole row
      dy = (h - getHeight(height - 2, col)) * heightScale;
    } else {
      const hU = getHeight(row - 1, col);
      const hD = getHeight(row + 1, col);
      dy = (hD - hU) * heightScale * 0.5;
    }

    // Longitude effectively converges near poles, so horizontal derivatives
    // should contribute less and less as we approach them.
    const horizontalDamp = lerp(1.0, 0.12, p);
    const dx = (hR - hL) * heightScale * 0.5 * horizontalDamp;

    // Also reduce total normal exaggeration in the polar bands.
    const normalStrength = lerp(1.0, 0.35, p);

    const nx = -dx * normalStrength;
    const ny = -dy * normalStrength;
    const nz = 1.0;

    const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (len < 1e-8) return [0, 0, 1];

    return [nx / len, ny / len, nz / len];
  }

  let offset = 0;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const [nx, ny, nz] = computeNormal(row, col);

      rgba[offset++] = Math.round((nx * 0.5 + 0.5) * 255);
      rgba[offset++] = Math.round((ny * 0.5 + 0.5) * 255);
      rgba[offset++] = Math.round((nz * 0.5 + 0.5) * 255);
      rgba[offset++] = 255;
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
  const canvas = document.createElement("canvas");
  canvas.width = normalMap.width;
  canvas.height = normalMap.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to create canvas 2D context for normal map");
  }

  const imageData = ctx.createImageData(normalMap.width, normalMap.height);
  imageData.data.set(normalMap.rgba);
  ctx.putImageData(imageData, 0, 0);

  return canvas;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}