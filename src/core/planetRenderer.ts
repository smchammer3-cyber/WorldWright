// ========================================================
// WORLDWRIGHT -- PLANET RENDERER (CPU PREVIEW)
// File: src/core/planetRenderer.ts
//
// Contract:
// - global seaLevel = world.seaLevel (metadata fallback only for legacy loads)
// - renderer is read-only
// ========================================================

import type { WorldBrain } from './worldSchema';

export type PlanetPreview = {
  width: number;
  height: number;
  seaLevel: number;

  sampleMinimapColor: (cellIndex: number) => [number, number, number];
  sampleGlobeColor: (cellIndex: number) => [number, number, number];
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

  function sampleColor(cellIndex: number): [number, number, number] {
    const cell = world.cells[cellIndex];
    const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;

    // Water
    if (h < seaLevel || cell.isWater) {
      const depth = clamp01((seaLevel - h) * 1.5);
      // deep -> darker
      const b = 0.55 - depth * 0.25;
      return [0.08, 0.22, b];
    }

    // Land: base from biome-ish ids and temperature
    const t = clamp01(cell.temperature);
    const r = clamp01(cell.rainfall);

    // Very simple stylized realism gradient
    // greener with rainfall, browner with dryness, lighter with higher elevation
    const elev = clamp01((h - seaLevel) * 1.2);
    const green = clamp01(r * 0.9);
    const dry = clamp01(1 - r);

    const baseR = clamp01(0.25 + dry * 0.35 + elev * 0.15);
    const baseG = clamp01(0.25 + green * 0.45 - dry * 0.1);
    const baseB = clamp01(0.18 + elev * 0.1);

    // Snow overlay
    const snow = clamp01(cell.snowCover);
    const rr = lerp(baseR, 0.92, snow);
    const gg = lerp(baseG, 0.94, snow);
    const bb = lerp(baseB, 0.98, snow);

    // Warmth tint
    const warm = clamp01((t - 0.5) * 0.8 + 0.5);
    return [clamp01(rr + warm * 0.04), clamp01(gg + warm * 0.02), bb];
  }

  return {
    width,
    height,
    seaLevel,
    sampleMinimapColor: sampleColor,
    sampleGlobeColor: sampleColor,
  };
}

/**
 * Compatibility export for the new session wiring.
 * Generate/Create/Sim can import:
 *   makePlanetPreviewFromWorldBrain(world)
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
}