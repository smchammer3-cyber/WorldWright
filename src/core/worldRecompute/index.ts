// ========================================================
// WORLDWRIGHT -- RECOMPUTE PIPELINE (V1.3 DERIVATION LOCK)
// File: src/core/worldRecompute/index.ts
// ========================================================

import type { River, WorldBrain } from '../worldSchema';
import { OceanDepthClass } from '../worldSchema';

export type RecomputeReason =
  | 'GENERATED'
  | 'SEA_LEVEL_CHANGED'
  | 'TERRAIN_EDIT'
  | 'SIM_STEP'
  | 'LOADED'
  | 'STICKER_EDIT';

type RecomputeProfile = {
  recomputeClimateStage: boolean;
  recomputeHydrologyStage: boolean;
  recomputeRiverStage: boolean;
  recomputeSnowStage: boolean;
  recomputeBiomeStage: boolean;
};

function getRecomputeProfile(reasons: RecomputeReason[]): RecomputeProfile {
  const has = (reason: RecomputeReason) => reasons.includes(reason);
  if (has('GENERATED') || has('LOADED') || has('SIM_STEP') || has('SEA_LEVEL_CHANGED') || has('TERRAIN_EDIT')) return { recomputeClimateStage: true, recomputeHydrologyStage: true, recomputeRiverStage: true, recomputeSnowStage: true, recomputeBiomeStage: true };
  if (has('STICKER_EDIT')) return { recomputeClimateStage: false, recomputeHydrologyStage: false, recomputeRiverStage: false, recomputeSnowStage: true, recomputeBiomeStage: true };
  return { recomputeClimateStage: true, recomputeHydrologyStage: true, recomputeRiverStage: true, recomputeSnowStage: true, recomputeBiomeStage: true };
}

export function recomputeWorld(world: WorldBrain, reasons: RecomputeReason[] = ['LOADED']): void {
  const profile = getRecomputeProfile(reasons);
  recomputeIsWater(world);
  recomputeOceanDepthClasses(world);
  if (profile.recomputeClimateStage) recomputeClimate(world);
  if (profile.recomputeHydrologyStage) recomputeHydrology(world);
  if (profile.recomputeRiverStage) recomputeRivers(world);
  if (profile.recomputeSnowStage) recomputeSnow(world);
  if (profile.recomputeBiomeStage) recomputeBiomes(world);
}

function hasLiquidSurfaceWater(world: WorldBrain): boolean {
  const mode = world.planetFoundation?.surfaceWaterMode;
  return mode == null || mode === 'LIQUID_SURFACE_WATER' || mode === 'MIXED_LIQUID_ICE';
}

function recomputeIsWater(world: WorldBrain): void {
  const sea = world.seaLevel;
  const liquidSurface = hasLiquidSurfaceWater(world);
  for (const cell of world.cells) {
    const h = totalHeight(cell);
    cell.isWater = liquidSurface && h < sea;
  }
}

function recomputeOceanDepthClasses(world: WorldBrain): void {
  const sea = world.seaLevel;
  for (const cell of world.cells) {
    const h = totalHeight(cell);
    const depth = sea - h;
    if (!cell.isWater) {
      cell.oceanDepthClass = null;
      continue;
    }
    if (depth > 0.70) cell.oceanDepthClass = OceanDepthClass.TRENCH;
    else if (depth > 0.42) cell.oceanDepthClass = OceanDepthClass.ABYSSAL;
    else if (depth > 0.20) cell.oceanDepthClass = OceanDepthClass.SLOPE;
    else if (depth > 0.08) cell.oceanDepthClass = OceanDepthClass.RIDGE;
    else cell.oceanDepthClass = OceanDepthClass.SHELF;
  }
}

function recomputeClimate(world: WorldBrain): void {
  const gw = world.gridWidth;
  const gh = world.gridHeight;
  const cells = world.cells;
  const sea = world.seaLevel;
  const axisTilt = typeof (world.parameters as any)?.axisTilt === 'number' ? ((world.parameters as any).axisTilt as number) : 45;
  const tilt01 = clamp01(axisTilt / 100);
  const moistureLevel = typeof (world.parameters as any)?.moistureLevel === 'number' ? clamp01(((world.parameters as any).moistureLevel as number) / 100) : 0.5;
  const tempOffset = typeof (world.parameters as any)?.temperatureOffset === 'number' ? (((world.parameters as any).temperatureOffset as number) / 100) * 0.18 : 0;
  const oldTemp = new Float32Array(cells.length);
  const oldRain = new Float32Array(cells.length);
  for (let i = 0; i < cells.length; i++) {
    oldTemp[i] = clamp01(typeof cells[i].temperature === 'number' ? cells[i].temperature : 0.5);
    oldRain[i] = clamp01(typeof cells[i].rainfall === 'number' ? cells[i].rainfall : 0.5);
  }
  function oceanProximityAt(row: number, col: number, radius = 4): number {
    let count = 0, total = 0;
    for (let dr = -radius; dr <= radius; dr++) {
      const r = row + dr;
      if (r < 0 || r >= gh) continue;
      for (let dc = -radius; dc <= radius; dc++) {
        const c = ((col + dc) % gw + gw) % gw;
        total++;
        if (cells[r * gw + c]?.isWater) count++;
      }
    }
    return total > 0 ? count / total : 0;
  }
  function rainShadowAt(row: number, col: number): number {
    let shadow = 0;
    for (let step = 1; step <= 6; step++) {
      const westCol = ((col - step) % gw + gw) % gw;
      const idx = row * gw + westCol;
      const c = cells[idx];
      if (!c) continue;
      const h = totalHeight(c) - sea;
      if (h > 0.14) shadow += h * (1 / step);
    }
    return clamp01(shadow * 0.70);
  }
  for (let r = 0; r < gh; r++) {
    const lat01 = gh <= 1 ? 0.5 : r / (gh - 1);
    const lat = lat01 * 2 - 1;
    const absLat = Math.abs(lat);
    const latWarmth = Math.pow(1 - absLat, lerp(0.90, 1.10, tilt01));
    const hadleyWet = Math.exp(-Math.pow(absLat * 2.0, 2));
    const subtropicDry = Math.exp(-Math.pow((absLat - 0.33) * 4.4, 2));
    const polarDry = absLat > 0.78 ? (absLat - 0.78) * 0.22 : 0;
    for (let c = 0; c < gw; c++) {
      const idx = r * gw + c;
      const cell = cells[idx];
      if (!cell) continue;
      const h = totalHeight(cell);
      const elevAboveSea = Math.max(0, h - sea);
      const elevCooling = clamp01(elevAboveSea * 0.50);
      const oceanProx = oceanProximityAt(r, c, 4);
      const rainShadow = rainShadowAt(r, c);
      const targetTemp = clamp01(latWarmth * 0.75 + oceanProx * 0.04 + (1 - elevCooling) * 0.05 + tempOffset);
      const coastalWetness = oceanProx * (1 - elevCooling) * 0.20;
      const targetRain = clamp01(0.22 + hadleyWet * 0.26 - subtropicDry * 0.15 - polarDry + coastalWetness + moistureLevel * 0.14 - rainShadow * 0.15);
      cell.temperature = clamp01(oldTemp[idx] * 0.84 + targetTemp * 0.16);
      cell.rainfall = clamp01(oldRain[idx] * 0.82 + targetRain * 0.18);
    }
  }
  const nextTemp = new Float32Array(cells.length);
  const nextRain = new Float32Array(cells.length);
  for (let r = 0; r < gh; r++) for (let c = 0; c < gw; c++) {
    const idx = r * gw + c;
    const north = Math.max(0, r - 1), south = Math.min(gh - 1, r + 1), west = (c - 1 + gw) % gw, east = (c + 1) % gw;
    const neighborTemp = (cells[north * gw + c].temperature + cells[south * gw + c].temperature + cells[r * gw + west].temperature + cells[r * gw + east].temperature) / 4;
    const neighborRain = (cells[north * gw + c].rainfall + cells[south * gw + c].rainfall + cells[r * gw + west].rainfall + cells[r * gw + east].rainfall) / 4;
    nextTemp[idx] = clamp01(cells[idx].temperature * 0.96 + neighborTemp * 0.04);
    nextRain[idx] = clamp01(cells[idx].rainfall * 0.96 + neighborRain * 0.04);
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].temperature = nextTemp[i];
    cells[i].rainfall = nextRain[i];
  }
}

function recomputeHydrology(world: WorldBrain): void {
  const gw = world.gridWidth, gh = world.gridHeight, cells = world.cells;
  const heightOf = (i: number) => totalHeight(cells[i]);
  for (const cell of cells) { cell.flowDirection = null; cell.flowAccumulation = 1; cell.basinId = null; }
  const neigh: Array<[number, number]> = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  for (let r = 0; r < gh; r++) for (let c = 0; c < gw; c++) {
    const idx = r * gw + c;
    const cell = cells[idx];
    if (!cell || cell.isWater) continue;
    const h = heightOf(idx);
    let bestIdx: number | null = null, bestH = h;
    for (const [dr, dc] of neigh) {
      const rr = r + dr;
      if (rr < 0 || rr >= gh) continue;
      const cc = ((c + dc) % gw + gw) % gw;
      const nIdx = rr * gw + cc;
      const nh = heightOf(nIdx);
      if (nh < bestH - 1e-6) { bestH = nh; bestIdx = nIdx; }
    }
    cell.flowDirection = bestIdx;
  }
  const order = cells.map((_, i) => i).sort((a, b) => heightOf(b) - heightOf(a));
  for (const i of order) {
    const cell = cells[i];
    if (!cell || cell.isWater) continue;
    const dir = cell.flowDirection;
    if (dir != null && dir >= 0 && dir < cells.length) cells[dir].flowAccumulation += cell.flowAccumulation;
  }
  function findOutlet(start: number): number {
    let cur = start;
    const seen = new Set<number>();
    for (let steps = 0; steps < 1000; steps++) {
      if (seen.has(cur)) return cur;
      seen.add(cur);
      const c = cells[cur];
      if (!c || c.isWater) return cur;
      const d = c.flowDirection;
      if (d == null) return cur;
      cur = d;
    }
    return cur;
  }
  for (let i = 0; i < cells.length; i++) cells[i].basinId = findOutlet(i);
}

function recomputeRivers(world: WorldBrain): void {
  const cells = world.cells;
  const total = world.gridWidth * world.gridHeight;
  const threshold = Math.max(24, Math.round(total / 3800));
  const rivers: River[] = [];
  const used = new Set<number>();
  let nextId = 1;
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    if (!cell || cell.isWater || cell.flowAccumulation < threshold || used.has(i)) continue;
    const path: number[] = [];
    let cur = i;
    const seen = new Set<number>();
    for (let steps = 0; steps < cells.length; steps++) {
      if (seen.has(cur)) break;
      seen.add(cur);
      path.push(cur);
      used.add(cur);
      const c = cells[cur];
      if (!c || c.isWater) break;
      const d = c.flowDirection;
      if (d == null) break;
      if (used.has(d)) { path.push(d); break; }
      cur = d;
    }
    if (path.length >= 2) rivers.push({ id: `river-${nextId++}`, sourceCellIndex: i, mouthCellIndex: path[path.length - 1], path });
  }
  world.rivers = rivers;
}

function recomputeSnow(world: WorldBrain): void {
  const mode = world.planetFoundation?.surfaceWaterMode;
  for (const cell of world.cells) {
    const h = totalHeight(cell);
    const elevAboveSea = Math.max(0, h - world.seaLevel);
    const t = clamp01(cell.temperature);
    const r = clamp01(cell.rainfall);
    const tempC = -22 + t * 50;
    const seasonalSnow = tempC < -3 ? clamp01((-3 - tempC) / 9) : 0;
    const permanentIce = tempC < -17 ? clamp01((-17 - tempC) / 10) : 0;
    const alpineBoost = clamp01((elevAboveSea - 0.30) * 0.48);
    const moistureFactor = lerp(0.40, 0.90, r);
    let snow = Math.max(permanentIce, seasonalSnow * moistureFactor);
    snow = clamp01(snow + alpineBoost * 0.13);
    if (mode === 'SNOWBALL_SURFACE' || mode === 'ICE_SHELL_OVER_OCEAN') snow = Math.max(snow, 0.72);
    if (mode === 'ICE_OVER_ROCK') snow = Math.max(snow, 0.46);
    cell.snowCover = snow;
  }
}

function recomputeBiomes(world: WorldBrain): void {
  const sea = world.seaLevel;
  for (const cell of world.cells) {
    if (!cell) continue;
    if (cell.isWater) { cell.baseBiomeId = 0; continue; }
    if (typeof cell.editBiomeId === 'number' && cell.editBiomeId !== cell.baseBiomeId) { cell.baseBiomeId = cell.editBiomeId; continue; }
    const h = totalHeight(cell), elev = Math.max(0, h - sea), t = clamp01(cell.temperature), r = clamp01(cell.rainfall);
    if (cell.snowCover > 0.86 || elev > 0.92) { cell.baseBiomeId = 6; continue; }
    if (t < 0.13) { cell.baseBiomeId = r < 0.28 ? 1 : 2; continue; }
    if (r < 0.13) { cell.baseBiomeId = t > 0.58 ? 8 : 4; continue; }
    if (r < 0.27) { cell.baseBiomeId = t > 0.62 ? 9 : 3; continue; }
    if (r > 0.68) { cell.baseBiomeId = t > 0.62 ? 10 : 7; continue; }
    cell.baseBiomeId = 5;
  }
}

function totalHeight(cell: WorldBrain['cells'][number]): number { return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta; }
function clamp01(x: number): number { return x < 0 ? 0 : x > 1 ? 1 : x; }
function lerp(a: number, b: number, t: number): number { return a + (b - a) * t; }
