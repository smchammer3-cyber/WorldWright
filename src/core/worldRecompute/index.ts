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
  // Subtle, deterministic landmask smoothing near sea level to remove pixel acne
  smoothLandmaskNearSeaLevel(world, 1);
  // Re-evaluate water after smoothing
  recomputeIsWater(world);
  // Basic climate -> hydrology -> cryosphere -> biomes pipeline
  recomputeClimate(world);
  recomputeHydrology(world);
  // Extract river polylines from flow fields
  recomputeRivers(world);
  recomputeSnow(world);
  recomputeBiomes(world);

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
  // Blueprint-correct overlays via single stored field 'snowCover'.
  // Rules:
  // - Snow increases when tempC <= 0 with a soft ramp (~0..-6C).
  // - Permanent ice increases when tempC <= -12 with a soft ramp (~-12..-25C).
  // - Moisture may modulate SNOW depth, but permanent ice does not require rainfall.
  // - Elevation boosts both slightly.
  for (const cell of world.cells) {
    const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
    const t = clamp01(cell.temperature);
    const r = clamp01(cell.rainfall);

    // Map normalized temp to approximate Celsius for ramps (-30C..+30C)
    const tempC = -30 + t * 60;

    // Soft ramps (0..1)
    const snowFromTemp = tempC < 0 ? clamp01((0 - tempC) / 6) : 0; // 1 at -6C and colder
    const permIce = tempC < -12 ? clamp01((-12 - tempC) / 13) : 0; // 1 at ~-25C

    // Elevation boost (normalized around global sea level space)
    const heightBoost = clamp01((h - 0.15) * 1.00);

    // Moisture modulates snow depth a bit, but not permanent ice
    const snowMoistMod = lerp(0.6, 1.0, r);

    // Combine: permanent ice dominates; snow adds with moisture and elevation
    let snow = Math.max(permIce, snowFromTemp * snowMoistMod);
    snow = clamp01(snow + heightBoost * 0.30);

    // Gentle spatial smoothing via min clamp to avoid hard bands
    cell.snowCover = snow;
  }
}

function recomputeClimate(world: WorldBrain): void {
  const gw = world.gridWidth;
  const gh = world.gridHeight;
  const cells = world.cells;
  const sea = world.seaLevel;
  // Read axis tilt if available to shape latitudinal cooling
  const axisTilt = typeof (world.parameters as any)?.axisTilt === 'number' ? (world.parameters as any).axisTilt as number : 45;
  const tilt01 = clamp01(axisTilt / 100);
  // k ~ 1.7..2.3: higher tilt => stronger seasonal contrast but here we keep poles colder
  const poleK = lerp(1.7, 2.3, tilt01);

  function oceanProximityAt(row: number, col: number, radius = 4): number {
    let count = 0;
    let total = 0;
    for (let dr = -radius; dr <= radius; dr++) {
      const r = row + dr;
      if (r < 0 || r >= gh) continue;
      for (let dc = -radius; dc <= radius; dc++) {
        const c = ((col + dc) % gw + gw) % gw;
        total++;
        const idx = r * gw + c;
        const cell = cells[idx];
        if (cell && cell.isWater) count++;
      }
    }
    return total > 0 ? count / total : 0;
  }

  for (let r = 0; r < gh; r++) {
    const latDeg = 90 - (r / gh) * 180;
    const latNorm = latDeg / 90; // -1..1 mapped to -1..1 via deg/90
    const absLat01 = Math.abs(latNorm); // 0 at equator, 1 at poles
    const poleFactor = Math.pow(absLat01, poleK); // stronger cooling toward poles
    const equatorWarmth = 1 - poleFactor; // 1 at equator, ~0 at poles
    for (let c = 0; c < gw; c++) {
      const idx = r * gw + c;
      const cell = cells[idx];
      if (!cell) continue;
      const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
      const elevFactor = clamp01((h - sea + 0.5) * 0.5);
      const oceanProx = oceanProximityAt(r, c, 4);

      // Temperature: equator warmth dominates; elevation and ocean proximity modulate
      const temp = clamp01(equatorWarmth * 0.92 + (1 - elevFactor) * 0.05 + oceanProx * 0.03);
      let rainfall = clamp01(oceanProx * 0.6 + equatorWarmth * 0.20 + (temp > 0.6 ? 0.05 : 0));
      rainfall = clamp01(rainfall * (1 - elevFactor * 0.5));

      cell.temperature = temp;
      cell.rainfall = rainfall;
    }
  }
}

// Majority-filter smoothing of landmask by nudging heights near sea level.
// Deterministic, parameter-free; adjusts simHeightDelta by tiny amounts to flip borderline cells.
function smoothLandmaskNearSeaLevel(world: WorldBrain, iterations: number = 1): void {
  const gw = world.gridWidth;
  const gh = world.gridHeight;
  const cells = world.cells;
  const sea = world.seaLevel;
  const epsilon = 0.02; // only adjust cells within ~2% of normalized height around sea level
  const margin = 0.008; // small push across threshold

  for (let pass = 0; pass < iterations; pass++) {
    for (let r = 0; r < gh; r++) {
      for (let c = 0; c < gw; c++) {
        const idx = r * gw + c;
        const cell = cells[idx];
        if (!cell) continue;
        const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
        const isWater = h < sea;

        // Count 4-neighbor majority
        let landNeighbors = 0;
        let waterNeighbors = 0;
        const north = r - 1;
        const south = r + 1;
        const west = (c - 1 + gw) % gw;
        const east = (c + 1) % gw;
        if (north >= 0) { const hn = cells[north * gw + c].baseHeight + cells[north * gw + c].editHeightDelta + cells[north * gw + c].simHeightDelta; (hn < sea ? waterNeighbors++ : landNeighbors++); }
        if (south < gh) { const hs = cells[south * gw + c].baseHeight + cells[south * gw + c].editHeightDelta + cells[south * gw + c].simHeightDelta; (hs < sea ? waterNeighbors++ : landNeighbors++); }
        { const hw = cells[r * gw + west].baseHeight + cells[r * gw + west].editHeightDelta + cells[r * gw + west].simHeightDelta; (hw < sea ? waterNeighbors++ : landNeighbors++); }
        { const he = cells[r * gw + east].baseHeight + cells[r * gw + east].editHeightDelta + cells[r * gw + east].simHeightDelta; (he < sea ? waterNeighbors++ : landNeighbors++); }

        const majorityWater = waterNeighbors > landNeighbors;
        const majorityLand = landNeighbors > waterNeighbors;

        // Only nudge borderline cells
        const dist = Math.abs(h - sea);
        if (dist > epsilon) continue;

        if (isWater && majorityLand) {
          // raise slightly to land
          cell.simHeightDelta += dist + margin;
        } else if (!isWater && majorityWater) {
          // sink slightly to water
          cell.simHeightDelta -= dist + margin;
        }
      }
    }
  }
}

function recomputeHydrology(world: WorldBrain): void {
  const gw = world.gridWidth;
  const gh = world.gridHeight;
  const cells = world.cells;

  function heightOf(i: number) {
    const c = cells[i];
    return c ? c.baseHeight + c.editHeightDelta + c.simHeightDelta : 0;
  }

  // Reset only missing defaults — preserve any hints provided by the generator
  for (const cell of cells) {
    if (cell.flowDirection === undefined) cell.flowDirection = null;
    if (typeof cell.flowAccumulation !== 'number') cell.flowAccumulation = 1;
    if (cell.basinId === undefined) cell.basinId = null;
  }

  const neigh: Array<[number, number]> = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  for (let r = 0; r < gh; r++) {
    for (let c = 0; c < gw; c++) {
      const idx = r * gw + c;
      const cell = cells[idx];
      if (!cell) continue;
      const h = heightOf(idx);
      let bestIdx: number | null = null;
      let bestH = h;
      for (const [dr, dc] of neigh) {
        const rr = r + dr;
        if (rr < 0 || rr >= gh) continue;
        const cc = ((c + dc) % gw + gw) % gw;
        const nIdx = rr * gw + cc;
        const nh = heightOf(nIdx);
        if (nh < bestH - 1e-6) {
          bestH = nh;
          bestIdx = nIdx;
        }
      }
      cell.flowDirection = bestIdx;
    }
  }

  const order = cells.map((_, i) => i).sort((a, b) => heightOf(b) - heightOf(a));
  for (const i of order) {
    const cell = cells[i];
    if (!cell) continue;
    const dir = cell.flowDirection;
    if (dir != null && dir >= 0 && dir < cells.length) {
      const target = cells[dir];
      if (target) target.flowAccumulation += cell.flowAccumulation;
    }
  }

  function findOutlet(start: number): number {
    let cur = start;
    const seen = new Set<number>();
    for (let steps = 0; steps < 1000; steps++) {
      if (seen.has(cur)) return cur;
      seen.add(cur);
      const c = cells[cur];
      if (!c) return cur;
      if (c.isWater) return cur;
      const d = c.flowDirection;
      if (d == null) return cur;
      cur = d;
    }
    return cur;
  }

  for (let i = 0; i < cells.length; i++) {
    cells[i].basinId = findOutlet(i);
  }
}

function recomputeBiomes(world: WorldBrain): void {
  const gw = world.gridWidth;
  const gh = world.gridHeight;
  const cells = world.cells;
  const sea = world.seaLevel;

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    if (!cell) continue;
    if (cell.isWater) {
      cell.baseBiomeId = 0;
      continue;
    }

    const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
    const elev = (h - sea) * 0.25;
    if (elev > 0.6) {
      cell.baseBiomeId = 6;
      continue;
    }

    const t = clamp01(cell.temperature);
    const r = clamp01(cell.rainfall);

    if (t < 0.2) cell.baseBiomeId = 1;
    else if (r < 0.15) cell.baseBiomeId = 4;
    else if (t > 0.6 && r > 0.6) cell.baseBiomeId = 5;
    else cell.baseBiomeId = 3;
  }
}

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function recomputeRivers(world: WorldBrain): void {
  const cells = world.cells;
  const gw = world.gridWidth;
  const gh = world.gridHeight;

  // Simple thresholding: cells with enough upstream accumulation become river sources.
  // Threshold chosen to be stable across resolutions: a small fraction of total cells.
  const total = gw * gh;
  const threshold = Math.max(20, Math.round(total / 4000));

  const rivers: { id: number; sourceCellIndex: number; mouthCellIndex: number; path: number[] }[] = [];
  const used = new Set<number>();
  let nextId = 1;

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    if (!cell) continue;
    if (cell.flowAccumulation < threshold) continue;
    if (used.has(i)) continue;

    // Walk downstream until water, null, loop, or already-used cell.
    const path: number[] = [];
    let cur = i;
    const seen = new Set<number>();
    for (let steps = 0; steps < cells.length; steps++) {
      if (seen.has(cur)) break; // loop
      seen.add(cur);
      path.push(cur);
      used.add(cur);
      const c = cells[cur];
      if (!c) break;
      if (c.isWater) break;
      const d = c.flowDirection;
      if (d == null) break;
      if (used.has(d)) {
        // If downstream cell already belongs to a river, include it as mouth and stop.
        path.push(d);
        cur = d;
        break;
      }
      cur = d;
    }

    if (path.length >= 2) {
      const mouth = path[path.length - 1];
      rivers.push({ id: nextId++, sourceCellIndex: i, mouthCellIndex: mouth, path });
    }
  }

  // Assign to world.rivers using schema River interface
  world.rivers = rivers.map((r) => ({ id: r.id, sourceCellIndex: r.sourceCellIndex, mouthCellIndex: r.mouthCellIndex, path: r.path }));
}