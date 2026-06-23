import type { WorldBrain } from '../worldSchema';
import { assertNoAuthoredTerrainDeltas } from '../worldLayerAuthority';

type Vec3 = [number, number, number];

/**
 * Post-generation terrain polish for blueprint-level planet believability.
 *
 * This is intentionally separate from tectonic ownership. The generator already
 * creates the world skeleton; this pass adds non-plate interior relief and
 * controlled near-sea-level coastline expression so land does not read as flat
 * painted slabs.
 *
 * Generate-only authority guard:
 * This pass reads total height and writes baseHeight, so it may only run while
 * editHeightDelta and simHeightDelta are still pristine.
 */
export function applyGeneratedWorldQualityPass(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyGeneratedWorldQualityPass');

  const style = world.metadata?.styleMode ?? world.parameters?.styleMode ?? 'EARTHLIKE';
  const seed = seedToUint32(world.metadata?.seed ?? world.parameters?.seed ?? 0);
  const width = world.gridWidth;
  const height = world.gridHeight;
  const seaLevel = world.seaLevel;
  const styleStrength = style === 'EARTHLIKE' ? 1.0 : style === 'ALIEN' ? 0.45 : 0.75;

  const source = new Float32Array(world.cells.length);
  for (let i = 0; i < world.cells.length; i++) {
    source[i] = world.cells[i].baseHeight + world.cells[i].editHeightDelta + world.cells[i].simHeightDelta;
  }

  for (let r = 0; r < height; r++) {
    const lat = 90 - ((r + 0.5) / height) * 180;
    const absLat01 = Math.abs(lat) / 90;
    const polarDamp = lerp(1.0, 0.74, smoothstep(0.78, 1.0, absLat01));

    for (let c = 0; c < width; c++) {
      const idx = r * width + c;
      const h = source[idx];
      const aboveSea = h - seaLevel;
      const lon = ((c + 0.5) / width) * 360 - 180;
      const dir = latLonToUnitVector(lat, lon);

      const regional = sphereFbm(shiftVec(dir, 4.7, -11.2, 6.4), seed, 2.0, 4);
      const highlands = sphereFbm(shiftVec(dir, -18.0, 8.1, 12.7), seed, 3.15, 3);
      const basins = sphereFbm(shiftVec(dir, 21.4, 2.8, -9.5), seed, 2.55, 3);
      const coastNoise = sphereFbm(shiftVec(dir, -6.2, 19.7, 4.2), seed, 7.2, 3);
      const inletNoise = sphereFbm(shiftVec(dir, 13.5, -3.2, 22.1), seed, 11.5, 2);
      const channelNoise = sphereFbm(shiftVec(dir, -31.0, 12.5, -6.0), seed, 4.85, 3);

      const landInterior = smoothstep(0.015, 0.22, aboveSea);
      const shallowLand = smoothstep(0.0, 0.16, aboveSea) * (1 - smoothstep(0.16, 0.34, aboveSea));
      const nearCoast = 1 - smoothstep(0.012, 0.21, Math.abs(aboveSea));
      const localLand = localFractionAboveSea(source, width, height, r, c, seaLevel, 4);

      const landRelief =
        (regional * 0.052 + highlands * 0.052 - Math.max(0, -basins) * 0.034) *
        landInterior *
        polarDamp *
        styleStrength;

      // The stage diagnostics showed this pass could explode land-body count.
      // Keep coast expression, but protect sparse/fragile land so the pass does
      // not freely carve weakened margins into medium fragments.
      const coastShape = (coastNoise * 0.034 + inletNoise * 0.020) * nearCoast * styleStrength;
      const carveSafety = smoothstep(0.62, 0.92, localLand);
      const waterBuildSafety = smoothstep(0.24, 0.68, localLand);
      const coastalBreakup = coastShape * (
        aboveSea >= 0
          ? coastShape < 0
            ? lerp(0.20, 1.0, carveSafety)
            : 0.70
          : coastShape > 0
            ? lerp(0.12, 0.65, waterBuildSafety)
            : 0.45
      );

      const straitLine = 1 - smoothstep(0.015, 0.075, Math.abs(channelNoise + regional * 0.06));
      const straitGate = smoothstep(0.68, 0.96, localLand) * shallowLand;
      const straitCut = straitLine * straitGate * 0.026 * styleStrength;

      const shelfRoughness = aboveSea < 0
        ? (coastNoise * 0.014 + inletNoise * 0.010) * nearCoast * styleStrength * waterBuildSafety
        : 0;

      world.cells[idx].baseHeight = clamp(
        world.cells[idx].baseHeight + landRelief + coastalBreakup - straitCut + shelfRoughness,
        -1.4,
        1.5,
      );
    }
  }
}

function localFractionAboveSea(heights: Float32Array, width: number, height: number, row: number, col: number, seaLevel: number, radius: number): number {
  let land = 0;
  let total = 0;

  for (let dr = -radius; dr <= radius; dr++) {
    const r = row + dr;
    if (r < 0 || r >= height) continue;
    for (let dc = -radius; dc <= radius; dc++) {
      const c = (col + dc + width) % width;
      total++;
      if (heights[r * width + c] >= seaLevel) land++;
    }
  }

  return total > 0 ? land / total : 0;
}

function latLonToUnitVector(latDeg: number, lonDeg: number): Vec3 {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  const cosLat = Math.cos(lat);
  return [cosLat * Math.cos(lon), Math.sin(lat), cosLat * Math.sin(lon)];
}

function sphereFbm(v: Vec3, seed: number, frequency: number, octaves: number): number {
  let amp = 1;
  let freq = frequency;
  let sum = 0;
  let norm = 0;

  for (let i = 0; i < octaves; i++) {
    sum += amp * sphereValueNoise(v, freq, i + 1, seed);
    norm += amp;
    amp *= 0.5;
    freq *= 2.0;
  }

  return ((sum / Math.max(1e-9, norm)) * 2 - 1) * 0.9;
}

function sphereValueNoise(v: Vec3, f: number, salt: number, seed: number): number {
  const x = v[0] * f;
  const y = v[1] * f;
  const z = v[2] * f;
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const xf = x - xi;
  const yf = y - yi;
  const zf = z - zi;
  const u = smootherstep(xf);
  const vv = smootherstep(yf);
  const w = smootherstep(zf);
  const c000 = hash3(xi, yi, zi, salt, seed);
  const c100 = hash3(xi + 1, yi, zi, salt, seed);
  const c010 = hash3(xi, yi + 1, zi, salt, seed);
  const c110 = hash3(xi + 1, yi + 1, zi, salt, seed);
  const c001 = hash3(xi, yi, zi + 1, salt, seed);
  const c101 = hash3(xi + 1, yi, zi + 1, salt, seed);
  const c011 = hash3(xi, yi + 1, zi + 1, salt, seed);
  const c111 = hash3(xi + 1, yi + 1, zi + 1, salt, seed);
  const x00 = lerp(c000, c100, u);
  const x10 = lerp(c010, c110, u);
  const x01 = lerp(c001, c101, u);
  const x11 = lerp(c011, c111, u);
  return lerp(lerp(x00, x10, vv), lerp(x01, x11, vv), w);
}

function shiftVec(dir: Vec3, ox: number, oy: number, oz: number): Vec3 {
  return [dir[0] + ox, dir[1] + oy, dir[2] + oz];
}

function hash3(x: number, y: number, z: number, salt: number, seed: number): number {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(z | 0, 2147483647) ^ Math.imul(salt | 0, 1597334677) ^ seed;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

function seedToUint32(s: string | number): number {
  if (typeof s === 'number') return s >>> 0;
  let h = 2166136261 >>> 0;
  for (let i = 0; i < String(s).length; i++) {
    h ^= String(s).charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) & 0xffffffff;
}

function clamp(x: number, lo: number, hi: number): number {
  return x < lo ? lo : x > hi ? hi : x;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / Math.max(1e-9, edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function smootherstep(t: number): number {
  const x = clamp(t, 0, 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
}
