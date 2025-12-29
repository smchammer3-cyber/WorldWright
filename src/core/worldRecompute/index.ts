// ========================================================
// WORLDWRIGHT -- RECOMPUTE PIPELINE (V1.3)
// File: src/core/worldRecompute/index.ts
//
// Deterministic derived-field recomputation.
// This is the single place that updates isWater/snow/etc after edits or generation.
// ========================================================

import type { WorldBrain } from '../worldSchema';

export type RecomputeReason =
  | 'GENERATED'
  | 'SEA_LEVEL_CHANGED'
  | 'TERRAIN_EDIT'
  | 'SIM_STEP'
  | 'LOADED'
  | 'STICKER_EDIT';

export function recomputeWorld(world: WorldBrain, reasons: RecomputeReason[] = ['LOADED']): void {
  // For now this is intentionally minimal:
  // - isWater from global seaLevel
  // - snowCover from temperature + altitude
  // Expand later (hydrology, climate cells, erosion, biome smoothing) behind this gateway.

  recomputeIsWater(world);
  recomputeSnow(world);

  // Future hooks (intentionally stubbed):
  // if (reasons.includes('GENERATED') || reasons.includes('TERRAIN_EDIT')) recomputeHydrology(world);
  // if (reasons.includes('GENERATED')) recomputeClimateCells(world);
  // if (reasons.includes('GENERATED')) recomputeBiomes(world);
}

function recomputeIsWater(world: WorldBrain): void {
  const sea = world.seaLevel;
  for (const cell of world.cells) {
    const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
    cell.isWater = h < sea;
  }
}

function recomputeSnow(world: WorldBrain): void {
  // Simple, stable heuristic:
  // - colder temps => more snow
  // - higher elevation => more snow
  // Keep it cheap + deterministic; replace with real cryosphere later.
  for (const cell of world.cells) {
    const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;

    // temp: 0..1, where 0 is cold, 1 is hot
    const coldness = clamp01(1 - cell.temperature);

    // height influence: assume heights tend to be roughly in -1..1-ish
    const heightBoost = clamp01((h - 0.15) * 1.25);

    const snow = clamp01(coldness * 0.85 + heightBoost * 0.35);
    cell.snowCover = snow;
  }
}

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}