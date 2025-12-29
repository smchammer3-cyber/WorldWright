// ========================================================
// WORLDWRIGHT -- PLANET PREVIEW RENDERER (CPU, V1.3)
// File: src/core/planetRenderer.ts
//
// Provides planetPreview used by AppShell.
// Uses global world.seaLevel and cell data.
// ========================================================

import { WorldBrain } from "./worldSchema";

export type PlanetPreview = {
  width: number;
  height: number;
  seaLevel: number;
  colorAt: (x: number, y: number) => [number, number, number, number];
  minimapColorAt: (x: number, y: number) => [number, number, number, number];
};

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function rgb(r: number, g: number, b: number, a = 255): [number, number, number, number] {
  return [clamp(r, 0, 255), clamp(g, 0, 255), clamp(b, 0, 255), clamp(a, 0, 255)];
}

function biomeColor(biomeId: number): [number, number, number, number] {
  // 0 ocean, 1 rainforest, 2 temperate, 3 desert, 4 savanna, 5 tundra, 6 taiga
  switch (biomeId) {
    case 0: return rgb(22, 80, 150);
    case 1: return rgb(30, 120, 70);
    case 2: return rgb(70, 140, 90);
    case 3: return rgb(190, 175, 110);
    case 4: return rgb(140, 150, 85);
    case 5: return rgb(190, 205, 215);
    case 6: return rgb(70, 110, 90);
    default: return rgb(120, 120, 120);
  }
}

export function makePlanetPreviewFromWorldBrain(world: WorldBrain): PlanetPreview {
  const w = world.gridWidth;
  const h = world.gridHeight;
  const sea = world.seaLevel;

  const sample = (x: number, y: number) => {
    const ix = clamp(Math.floor(x), 0, w - 1);
    const iy = clamp(Math.floor(y), 0, h - 1);
    const idx = iy * w + ix;
    const c = world.cells[idx];

    const height = c.baseHeight + c.editHeightDelta + c.simHeightDelta;
    const isWater = height < sea;

    const biome = (c.editBiomeId ?? c.baseBiomeId) | 0;

    return { c, height, isWater, biome };
  };

  const colorAt = (x: number, y: number) => {
    const s = sample(x, y);
    const { height, isWater, biome, c } = s;

    if (isWater) {
      // Ocean gradient by depth
      const depth = clamp((sea - height) / Math.max(0.001, sea), 0, 1);
      const deep = rgb(10, 40, 90);
      const shelf = rgb(28, 95, 165);
      const col = [
        mix(shelf[0], deep[0], depth),
        mix(shelf[1], deep[1], depth),
        mix(shelf[2], deep[2], depth),
        255,
      ] as [number, number, number, number];

      // Sea-ice tint if very cold
      const ice = clamp((0.12 - c.temperature) / 0.12, 0, 1);
      col[0] = mix(col[0], 190, ice * 0.55);
      col[1] = mix(col[1], 210, ice * 0.55);
      col[2] = mix(col[2], 220, ice * 0.55);

      return col;
    }

    // Land: start from biome
    let [r, g, b, a] = biomeColor(biome);

    // Elevation shading (subtle)
    const elev = clamp((height - sea) / Math.max(0.001, 1 - sea), 0, 1);
    const brighten = elev * 0.20;
    r = r + 255 * brighten * 0.18;
    g = g + 255 * brighten * 0.18;
    b = b + 255 * brighten * 0.18;

    // Snow overlay
    const snow = clamp(c.snowCover, 0, 1);
    r = mix(r, 235, snow);
    g = mix(g, 240, snow);
    b = mix(b, 245, snow);

    return rgb(r, g, b, a);
  };

  const minimapColorAt = (x: number, y: number) => {
    // Slightly flatter (less shading) for clarity
    const s = sample(x, y);
    const { height, isWater, biome, c } = s;

    if (isWater) {
      const depth = clamp((sea - height) / Math.max(0.001, sea), 0, 1);
      const deep = rgb(10, 35, 85);
      const shelf = rgb(35, 110, 180);
      const col = [
        mix(shelf[0], deep[0], depth),
        mix(shelf[1], deep[1], depth),
        mix(shelf[2], deep[2], depth),
        255,
      ] as [number, number, number, number];

      const ice = clamp((0.12 - c.temperature) / 0.12, 0, 1);
      col[0] = mix(col[0], 200, ice * 0.45);
      col[1] = mix(col[1], 220, ice * 0.45);
      col[2] = mix(col[2], 235, ice * 0.45);

      return col;
    }

    let [r, g, b] = biomeColor(biome);
    const snow = clamp(c.snowCover, 0, 1);
    r = mix(r, 240, snow);
    g = mix(g, 245, snow);
    b = mix(b, 250, snow);

    return rgb(r, g, b, 255);
  };

  return { width: w, height: h, seaLevel: sea, colorAt, minimapColorAt };
}

// Back-compat export (if older files import planetRenderer differently)
export default { makePlanetPreviewFromWorldBrain };