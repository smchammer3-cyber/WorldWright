// ========================================================
// WORLDWRIGHT -- PLANET RENDERER (CPU PREVIEW)
// File: src/core/planetRenderer.ts
//
// Contract:
// - global seaLevel = world.seaLevel (metadata fallback only for legacy loads)
// - renderer is read-only
//
// NOTE:
// - AppShell expects preview.colorAt(...) returning [r,g,b]
// - We keep sampleGlobeColor/sampleMinimapColor as the "new" API
//   and provide compatibility aliases (colorAt/minimapColorAt).
// - Renderer must NEVER throw. If data is inconsistent, return debug color.
// ========================================================

import type { WorldBrain } from './worldSchema';

export type PlanetPreview = {
  width: number;
  height: number;
  seaLevel: number;

  // New API (explicit)
  sampleMinimapColor: (cellIndex: number) => [number, number, number];
  sampleGlobeColor: (cellIndex: number) => [number, number, number];

  // Compatibility API (older AppShell usage)
  colorAt: (cellIndex: number) => [number, number, number];
  minimapColorAt: (cellIndex: number) => [number, number, number];
};

export function buildPlanetPreview(world: WorldBrain): PlanetPreview {
  const width = world.gridWidth;
  const height = world.gridHeight;

  const seaLevel =
    typeof world.seaLevel === 'number'
      ? world.seaLevel
      : typeof world.metadata?.seaLevel === 'number'
        ? world.metadata.seaLevel
        : 0.0;

  const cells = Array.isArray(world.cells) ? world.cells : [];

  function sampleColor(cellIndex: number): [number, number, number] {
    // Defensive: out-of-range / bad index
    if (!Number.isFinite(cellIndex) || cellIndex < 0 || cellIndex >= cells.length) {
      // Debug magenta: highlights contract mismatch without crashing
      return [1.0, 0.0, 1.0];
    }

    const cell = cells[cellIndex];
    if (!cell) return [1.0, 0.0, 1.0];

    // Safe defaults if any fields are missing
    const baseHeight = Number.isFinite(cell.baseHeight) ? cell.baseHeight : 0;
    const editHeightDelta = Number.isFinite(cell.editHeightDelta) ? cell.editHeightDelta : 0;
    const simHeightDelta = Number.isFinite(cell.simHeightDelta) ? cell.simHeightDelta : 0;

    const temperature = Number.isFinite(cell.temperature) ? cell.temperature : 0.5;
    const rainfall = Number.isFinite(cell.rainfall) ? cell.rainfall : 0.5;
    const snowCover = Number.isFinite(cell.snowCover) ? cell.snowCover : 0;

    const isWater = !!cell.isWater;

    const h = baseHeight + editHeightDelta + simHeightDelta;

    // Water
    if (h < seaLevel || isWater) {
      const depth = clamp01((seaLevel - h) * 1.5);
      const b = 0.55 - depth * 0.25;
      return [0.08, 0.22, b];
    }

    // Land
    const t = clamp01(temperature);
    const r = clamp01(rainfall);

    const elev = clamp01((h - seaLevel) * 1.2);
    const green = clamp01(r * 0.9);
    const dry = clamp01(1 - r);

    const baseR = clamp01(0.25 + dry * 0.35 + elev * 0.15);
    const baseG = clamp01(0.25 + green * 0.45 - dry * 0.1);
    const baseB = clamp01(0.18 + elev * 0.1);

    const snow = clamp01(snowCover);
    const rr = lerp(baseR, 0.92, snow);
    const gg = lerp(baseG, 0.94, snow);
    const bb = lerp(baseB, 0.98, snow);

    const warm = clamp01((t - 0.5) * 0.8 + 0.5);
    return [clamp01(rr + warm * 0.04), clamp01(gg + warm * 0.02), bb];
  }

  return {
    width,
    height,
    seaLevel,

    // new API
    sampleMinimapColor: sampleColor,
    sampleGlobeColor: sampleColor,

    // compat API expected by AppShell right now
    colorAt: sampleColor,
    minimapColorAt: sampleColor,
  };
}

/**
 * Compatibility export for session wiring.
 */
export function makePlanetPreviewFromWorldBrain(world: WorldBrain): PlanetPreview {
  return buildPlanetPreview(world);
}

// Compatibility exports (older imports)
export const PlanetRenderer = {
  buildPlanetPreview,
};

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}m