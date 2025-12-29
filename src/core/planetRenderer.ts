// ========================================================
// JARVIS CHANGE HEADER -- PLANET RENDERER REALIGNMENT (V1.3 GLOBAL SEALEVEL)
// File: src/core/planetRenderer.ts
//
// Fixes:
// - Derive dims from world.gridWidth/world.gridHeight (not metadata width/height).
// - Use global world.seaLevel as the only sea level source.
// - Sampling functions use canonical height = baseHeight + editHeightDelta + simHeightDelta.
// - Provides coherent color sampling for minimap + globe CPU preview.
//
// Non-goals:
// - GPU renderer / Three.js mesh upgrades (later).
// ========================================================

import { WorldBrain } from "./worldSchema";

export type PlanetPreview = {
  width: number;
  height: number;

  // Global scalar sea level threshold
  seaLevel: number;

  // Accessors
  heightAt: (x: number, y: number) => number; // normalized height 0..1-ish
  isWaterAt: (x: number, y: number) => boolean;

  temperatureAt: (x: number, y: number) => number; // 0..1
  rainfallAt: (x: number, y: number) => number; // 0..1

  // Color sampling
  colorAt: (x: number, y: number) => [number, number, number, number]; // RGBA 0..255
  minimapColorAt: (x: number, y: number) => [number, number, number, number];
};

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function idxOf(world: WorldBrain, x: number, y: number) {
  const ix = clamp(Math.floor(x), 0, world.gridWidth - 1);
  const iy = clamp(Math.floor(y), 0, world.gridHeight - 1);
  return iy * world.gridWidth + ix;
}

function heightOfCell(world: WorldBrain, i: number) {
  const c = world.cells[i];
  return c.baseHeight + c.editHeightDelta + c.simHeightDelta;
}

function seaLevelOfWorld(world: WorldBrain) {
  const v = (world as any).seaLevel;
  if (Number.isFinite(v)) return v as number;

  // Legacy fallback (just in case)
  const mv = (world as any).metadata?.seaLevel;
  if (Number.isFinite(mv)) return mv as number;

  return 0.3;
}

/**
 * Small utility: shade by slope-ish (cheap).
 * Samples 4-neighbors and returns approx gradient magnitude.
 */
function approxSlope(world: WorldBrain, x: number, y: number) {
  const w = world.gridWidth;
  const h = world.gridHeight;

  const x0 = clamp(Math.floor(x) - 1, 0, w - 1);
  const x1 = clamp(Math.floor(x) + 1, 0, w - 1);
  const y0 = clamp(Math.floor(y) - 1, 0, h - 1);
  const y1 = clamp(Math.floor(y) + 1, 0, h - 1);

  const hL = heightOfCell(world, idxOf(world, x0, y));
  const hR = heightOfCell(world, idxOf(world, x1, y));
  const hD = heightOfCell(world, idxOf(world, x, y0));
  const hU = heightOfCell(world, idxOf(world, x, y1));

  const dx = hR - hL;
  const dy = hU - hD;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Base palette helpers (stylized realism).
 * You can refine later; this is stable and readable now.
 */
function colorOcean(depth01: number): [number, number, number] {
  // depth01: 0 shallow -> 1 deep
  const r = lerp(30, 10, depth01);
  const g = lerp(90, 40, depth01);
  const b = lerp(160, 90, depth01);
  return [r, g, b];
}

function colorLand(temp01: number, rain01: number, elev01: number): [number, number, number] {
  // A simple biome-ish blend:
  // - cold -> desaturated / snowy
  // - dry -> tan
  // - wet -> green
  const cold = smoothstep(0.0, 0.25, 1 - temp01); // high when cold
  const dry = smoothstep(0.0, 0.35, 1 - rain01);
  const wet = smoothstep(0.45, 1.0, rain01);

  // base earth tones
  let r = 80;
  let g = 105;
  let b = 70;

  // dry -> tan
  r = lerp(r, 150, dry);
  g = lerp(g, 125, dry);
  b = lerp(b, 85, dry);

  // wet -> green
  r = lerp(r, 60, wet);
  g = lerp(g, 140, wet);
  b = lerp(b, 70, wet);

  // elevation -> rockier/brighter
  const high = smoothstep(0.65, 0.95, elev01);
  r = lerp(r, 130, high);
  g = lerp(g, 130, high);
  b = lerp(b, 130, high);

  // cold -> snow tint
  r = lerp(r, 230, cold);
  g = lerp(g, 235, cold);
  b = lerp(b, 240, cold);

  return [r, g, b];
}

function applyLighting(rgb: [number, number, number], light01: number) {
  // light01 ~ 0.6..1.1
  const [r, g, b] = rgb;
  return [
    clamp(Math.round(r * light01), 0, 255),
    clamp(Math.round(g * light01), 0, 255),
    clamp(Math.round(b * light01), 0, 255),
  ] as [number, number, number];
}

/**
 * Main entry: create a CPU preview interface from the WorldBrain.
 */
export function makePlanetPreviewFromWorldBrain(world: WorldBrain): PlanetPreview {
  const width = world.gridWidth;
  const height = world.gridHeight;
  const seaLevel = seaLevelOfWorld(world);

  function heightAt(x: number, y: number) {
    const i = idxOf(world, x, y);
    return heightOfCell(world, i);
  }

  function isWaterAt(x: number, y: number) {
    const h = heightAt(x, y);
    return h < seaLevel;
  }

  function temperatureAt(x: number, y: number) {
    const i = idxOf(world, x, y);
    return clamp(world.cells[i].temperature ?? 0.5, 0, 1);
  }

  function rainfallAt(x: number, y: number) {
    const i = idxOf(world, x, y);
    return clamp(world.cells[i].rainfall ?? 0.5, 0, 1);
  }

  function colorAt(x: number, y: number): [number, number, number, number] {
    const h = heightAt(x, y);
    const water = h < seaLevel;

    const temp = temperatureAt(x, y);
    const rain = rainfallAt(x, y);

    // Normalize elevation relative to sea level for visual mapping
    const elev01 = water
      ? clamp((seaLevel - h) / Math.max(1e-6, seaLevel + 0.01), 0, 1)
      : clamp((h - seaLevel) / Math.max(1e-6, 1 - seaLevel + 0.01), 0, 1);

    let rgb: [number, number, number];

    if (water) {
      rgb = colorOcean(clamp(elev01, 0, 1));
    } else {
      rgb = colorLand(temp, rain, elev01);
    }

    // Cheap lighting from slope
    const slope = approxSlope(world, x, y);
    const light = clamp(1.05 - slope * 0.9, 0.65, 1.15);
    const lit = applyLighting(rgb, light);

    return [lit[0], lit[1], lit[2], 255];
  }

  function minimapColorAt(x: number, y: number): [number, number, number, number] {
    // Slightly higher contrast for minimap readability
    const c = colorAt(x, y);
    const [r, g, b, a] = c;

    const boost = 1.08;
    return [
      clamp(Math.round(r * boost), 0, 255),
      clamp(Math.round(g * boost), 0, 255),
      clamp(Math.round(b * boost), 0, 255),
      a,
    ];
  }

  return {
    width,
    height,
    seaLevel,
    heightAt,
    isWaterAt,
    temperatureAt,
    rainfallAt,
    colorAt,
    minimapColorAt,
  };
}