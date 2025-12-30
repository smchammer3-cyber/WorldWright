import type { WorldBrain } from "./worldSchema";

export type PlanetPreview = {
  width: number;
  height: number;
  colorAt(x: number, y: number): [number, number, number, number];
  minimapColorAt(x: number, y: number): [number, number, number, number];
};

export function makePlanetPreviewFromWorldBrain(world: WorldBrain): PlanetPreview {
  return buildPlanetPreview(world);
}

function buildPlanetPreview(world: WorldBrain): PlanetPreview {
  const width = 360;
  const height = 180;

  return {
    width,
    height,
    colorAt(x, y) {
      const nx = Math.floor((x / width) * world.width);
      const ny = Math.floor((y / height) * world.height);
      const cell = world.cells[ny * world.width + nx];
      if (!cell) return [0, 0, 0, 255];
      if (cell.isWater) return [20, 60, 140, 255];
      return [40, 140, 60, 255];
    },
    minimapColorAt(x, y) {
      return this.colorAt(x, y);
    },
  };
}

export function rasterizePlanetPreview(
  preview: PlanetPreview,
  outW: number,
  outH: number
): Uint8ClampedArray {
  const w = Math.max(1, Math.floor(outW));
  const h = Math.max(1, Math.floor(outH));
  const out = new Uint8ClampedArray(w * h * 4);

  let o = 0;
  for (let y = 0; y < h; y++) {
    const sy = (y / h) * preview.height;
    for (let x = 0; x < w; x++) {
      const sx = (x / w) * preview.width;
      const rgba = preview.colorAt(sx, sy);
      out[o++] = rgba[0];
      out[o++] = rgba[1];
      out[o++] = rgba[2];
      out[o++] = rgba[3];
    }
  }
  return out;
}

export function rasterizeMinimapPreview(
  preview: PlanetPreview,
  outW: number,
  outH: number
): Uint8ClampedArray {
  const w = Math.max(1, Math.floor(outW));
  const h = Math.max(1, Math.floor(outH));
  const out = new Uint8ClampedArray(w * h * 4);

  let o = 0;
  for (let y = 0; y < h; y++) {
    const sy = (y / h) * preview.height;
    for (let x = 0; x < w; x++) {
      const sx = (x / w) * preview.width;
      const rgba = preview.minimapColorAt(sx, sy);
      out[o++] = rgba[0];
      out[o++] = rgba[1];
      out[o++] = rgba[2];
      out[o++] = rgba[3];
    }
  }
  return out;
}