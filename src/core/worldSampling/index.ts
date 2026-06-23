import type { PlanetPreview } from '../planetRenderer';
import { createEquirectangularGrid } from '../worldGrid';

type Rgba = [number, number, number, number];

/**
 * Globe-specific sampling for equirectangular preview layers.
 *
 * The current world data is still stored as a rectangular compatibility view,
 * but the globe should not squeeze every longitude column into a hard polar
 * artifact. Near the poles, blend each sample toward a local longitude window
 * instead of averaging the whole latitude ring. This keeps broad polar land,
 * water, biome, and depth shapes visible while softening thin radial artifacts.
 */
export function sampleGlobePreviewAtLatLon(preview: PlanetPreview, lat: number, lon: number): Rgba {
  const base = samplePreviewNearest(preview, lat, lon);
  const absLat = Math.abs(lat);
  const polarBlend = smoothstep(78, 89.5, absLat);
  if (polarBlend <= 0) return base;

  const windowDegrees = lerp(4, 28, polarBlend);
  const localAverage = averageLocalLongitudeWindow(preview, lat, lon, windowDegrees);
  return mixRgba(base, localAverage, polarBlend * 0.55);
}

export function rasterizeGlobeTextureFromPreview(preview: PlanetPreview): Uint8ClampedArray {
  const width = Math.max(1, Math.floor(preview.width));
  const height = Math.max(1, Math.floor(preview.height));
  const grid = createEquirectangularGrid(width, height);
  const out = new Uint8ClampedArray(width * height * 4);
  let o = 0;

  for (let i = 0; i < grid.cellCount; i++) {
    const { lat, lon } = grid.cellCenterLatLon(i);
    const color = sampleGlobePreviewAtLatLon(preview, lat, lon);
    out[o++] = color[0];
    out[o++] = color[1];
    out[o++] = color[2];
    out[o++] = color[3];
  }

  return out;
}

function samplePreviewNearest(preview: PlanetPreview, lat: number, lon: number): Rgba {
  const width = Math.max(1, preview.width);
  const height = Math.max(1, preview.height);
  const x = ((normalizeLon(lon) + 180) / 360) * width;
  const y = ((90 - clamp(lat, -90, 90)) / 180) * height;
  const sx = wrap(Math.floor(x), width);
  const sy = clampInt(Math.floor(y), 0, height - 1);
  return preview.colorAt(sx, sy);
}

function averageLocalLongitudeWindow(preview: PlanetPreview, lat: number, lon: number, radiusDegrees: number): Rgba {
  const offsets = [-1, -0.66, -0.33, 0, 0.33, 0.66, 1];
  const weights = [0.10, 0.15, 0.19, 0.22, 0.19, 0.15, 0.10];
  let r = 0;
  let g = 0;
  let b = 0;
  let a = 0;
  let totalWeight = 0;

  for (let i = 0; i < offsets.length; i++) {
    const weight = weights[i];
    const color = samplePreviewNearest(preview, lat, lon + offsets[i] * radiusDegrees);
    r += color[0] * weight;
    g += color[1] * weight;
    b += color[2] * weight;
    a += color[3] * weight;
    totalWeight += weight;
  }

  return [
    clamp255(Math.round(r / totalWeight)),
    clamp255(Math.round(g / totalWeight)),
    clamp255(Math.round(b / totalWeight)),
    clamp255(Math.round(a / totalWeight)),
  ];
}

function mixRgba(a: Rgba, b: Rgba, t: number): Rgba {
  const x = clamp(t, 0, 1);
  return [
    clamp255(Math.round(lerp(a[0], b[0], x))),
    clamp255(Math.round(lerp(a[1], b[1], x))),
    clamp255(Math.round(lerp(a[2], b[2], x))),
    clamp255(Math.round(lerp(a[3], b[3], x))),
  ];
}

function normalizeLon(lon: number): number {
  let out = lon;
  while (out < -180) out += 360;
  while (out >= 180) out -= 360;
  return out;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / Math.max(1e-9, edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function wrap(value: number, modulus: number): number {
  const m = value % modulus;
  return m < 0 ? m + modulus : m;
}

function clampInt(value: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, Math.floor(value)));
}

function clamp(value: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, value));
}

function clamp255(value: number): number {
  return Math.max(0, Math.min(255, value | 0));
}
