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

type RecomputeProfile = {
  smoothLandmask: boolean;
  recomputeClimateStage: boolean;
  recomputeHydrologyStage: boolean;
  recomputeRiverStage: boolean;
  recomputeSnowStage: boolean;
  recomputeBiomeStage: boolean;
};

function getRecomputeProfile(reasons: RecomputeReason[]): RecomputeProfile {
  const has = (reason: RecomputeReason) => reasons.includes(reason);

  // Full passes for load/generate/sim/sea-level changes.
  if (
    has('GENERATED') ||
    has('LOADED') ||
    has('SIM_STEP') ||
    has('SEA_LEVEL_CHANGED')
  ) {
    return {
      smoothLandmask: true,
      recomputeClimateStage: true,
      recomputeHydrologyStage: true,
      recomputeRiverStage: true,
      recomputeSnowStage: true,
      recomputeBiomeStage: true,
    };
  }

  // Terrain edits still need land/water correctness and dependent visual layers,
  // but we skip the extra landmask smoothing pass to keep interaction lighter.
  if (has('TERRAIN_EDIT')) {
    return {
      smoothLandmask: false,
      recomputeClimateStage: true,
      recomputeHydrologyStage: true,
      recomputeRiverStage: true,
      recomputeSnowStage: true,
      recomputeBiomeStage: true,
    };
  }

  // Sticker edits usually affect biomes/height overlays. Keep it lighter.
  if (has('STICKER_EDIT')) {
    return {
      smoothLandmask: false,
      recomputeClimateStage: false,
      recomputeHydrologyStage: false,
      recomputeRiverStage: false,
      recomputeSnowStage: true,
      recomputeBiomeStage: true,
    };
  }

  // Default safe path.
  return {
    smoothLandmask: false,
    recomputeClimateStage: true,
    recomputeHydrologyStage: true,
    recomputeRiverStage: true,
    recomputeSnowStage: true,
    recomputeBiomeStage: true,
  };
}

export function recomputeWorld(
  world: WorldBrain,
  reasons: RecomputeReason[] = ['LOADED']
): void {
  const profile = getRecomputeProfile(reasons);

  // Stage 1: authoritative water classification
  recomputeIsWater(world);

  // Stage 2: optional coast cleanup for full rebuilds only
  if (profile.smoothLandmask) {
    smoothLandmaskNearSeaLevel(world, 1);
    recomputeIsWater(world);
  }

  // Stage 3: climate
  if (profile.recomputeClimateStage) {
    recomputeClimate(world);
  }

  // Stage 4: hydrology
  if (profile.recomputeHydrologyStage) {
    recomputeHydrology(world);
  }

  // Stage 5: river extraction
  if (profile.recomputeRiverStage) {
    recomputeRivers(world);
  }

  // Stage 6: cryosphere
  if (profile.recomputeSnowStage) {
    recomputeSnow(world);
  }

  // Stage 7: biome assignment
  if (profile.recomputeBiomeStage) {
    recomputeBiomes(world);
  }
}

function recomputeIsWater(world: WorldBrain): void {
  const sea = world.seaLevel;
  for (const cell of world.cells) {
    const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
    cell.isWater = h < sea;
  }
}

function recomputeSnow(world: WorldBrain): void {
  for (const cell of world.cells) {
    const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
    const t = clamp01(cell.temperature);
    const r = clamp01(cell.rainfall);

    const tempC = -30 + t * 60;

    const snowFromTemp = tempC < 0 ? clamp01((0 - tempC) / 6) : 0;
    const permIce = tempC < -12 ? clamp01((-12 - tempC) / 13) : 0;
    const heightBoost = clamp01((h - 0.15) * 1.0);
    const snowMoistMod = lerp(0.6, 1.0, r);

    let snow = Math.max(permIce, snowFromTemp * snowMoistMod);
    snow = clamp01(snow + heightBoost * 0.3);

    cell.snowCover = snow;
  }
}

function recomputeClimate(world: WorldBrain): void {
  const gw = world.gridWidth;
  const gh = world.gridHeight;
  const cells = world.cells;
  const sea = world.seaLevel;

  const axisTilt =
    typeof (world.parameters as any)?.axisTilt === 'number'
      ? ((world.parameters as any).axisTilt as number)
      : 45;
  const tilt01 = clamp01(axisTilt / 100);
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
    const latNorm = latDeg / 90;
    const absLat01 = Math.abs(latNorm);
    const poleFactor = Math.pow(absLat01, poleK);
    const equatorWarmth = 1 - poleFactor;

    for (let c = 0; c < gw; c++) {
      const idx = r * gw + c;
      const cell = cells[idx];
      if (!cell) continue;

      const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
      const elevFactor = clamp01((h - sea + 0.5) * 0.5);
      const oceanProx = oceanProximityAt(r, c, 4);

      const temp = clamp01(
        equatorWarmth * 0.92 + (1 - elevFactor) * 0.05 + oceanProx * 0.03
      );

      const lon01 = c / gw;
      const coastalBoost = oceanProx * (1 - elevFactor) * 0.08;
      const longWave = (1 - Math.cos(lon01 * Math.PI * 2)) * 0.04;
      let rainfall = clamp01(
        oceanProx * 0.6 +
          equatorWarmth * 0.2 +
          coastalBoost +
          longWave +
          (temp > 0.6 ? 0.05 : 0)
      );

      rainfall = clamp01(rainfall * (1 - elevFactor * 0.5));

      cell.temperature = temp;
      cell.rainfall = rainfall;
    }
  }
}

function smoothLandmaskNearSeaLevel(
  world: WorldBrain,
  iterations: number = 1
): void {
  const gw = world.gridWidth;
  const gh = world.gridHeight;
  const cells = world.cells;
  const sea = world.seaLevel;
  const epsilon = 0.02;
  const margin = 0.008;

  for (let pass = 0; pass < iterations; pass++) {
    for (let r = 0; r < gh; r++) {
      for (let c = 0; c < gw; c++) {
        const idx = r * gw + c;
        const cell = cells[idx];
        if (!cell) continue;

        const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
        const isWater = h < sea;

        let landNeighbors = 0;
        let waterNeighbors = 0;

        const north = r - 1;
        const south = r + 1;
        const west = (c - 1 + gw) % gw;
        const east = (c + 1) % gw;

        if (north >= 0) {
          const hn =
            cells[north * gw + c].baseHeight +
            cells[north * gw + c].editHeightDelta +
            cells[north * gw + c].simHeightDelta;
          hn < sea ? waterNeighbors++ : landNeighbors++;
        }

        if (south < gh) {
          const hs =
            cells[south * gw + c].baseHeight +
            cells[south * gw + c].editHeightDelta +
            cells[south * gw + c].simHeightDelta;
          hs < sea ? waterNeighbors++ : landNeighbors++;
        }

        {
          const hw =
            cells[r * gw + west].baseHeight +
            cells[r * gw + west].editHeightDelta +
            cells[r * gw + west].simHeightDelta;
          hw < sea ? waterNeighbors++ : landNeighbors++;
        }

        {
          const he =
            cells[r * gw + east].baseHeight +
            cells[r * gw + east].editHeightDelta +
            cells[r * gw + east].simHeightDelta;
          he < sea ? waterNeighbors++ : landNeighbors++;
        }

        const majorityWater = waterNeighbors > landNeighbors;
        const majorityLand = landNeighbors > waterNeighbors;
        const dist = Math.abs(h - sea);

        if (dist > epsilon) continue;

        if (isWater && majorityLand) {
          cell.simHeightDelta += dist + margin;
        } else if (!isWater && majorityWater) {
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

  for (const cell of cells) {
    cell.flowDirection = null;
    cell.flowAccumulation = 1;
    cell.basinId = null;
  }

  const neigh: Array<[number, number]> = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1],
  ];

  for (let r = 0; r < gh; r++) {
    for (let c = 0; c < gw; c++) {
      const idx = r * gw + c;
      const cell = cells[idx];
      if (!cell || cell.isWater) continue;

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

  const order = cells
    .map((_, i) => i)
    .sort((a, b) => heightOf(b) - heightOf(a));

  for (const i of order) {
    const cell = cells[i];
    if (!cell || cell.isWater) continue;

    const dir = cell.flowDirection;
    if (dir != null && dir >= 0 && dir < cells.length) {
      const target = cells[dir];
      if (target) {
        target.flowAccumulation += cell.flowAccumulation;
      }
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
  const sea = world.seaLevel;

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
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

function recomputeRivers(world: WorldBrain): void {
  const cells = world.cells;
  const gw = world.gridWidth;
  const gh = world.gridHeight;

  const total = gw * gh;
  const threshold = Math.max(20, Math.round(total / 4000));

  const rivers: { id: number; sourceCellIndex: number; mouthCellIndex: number; path: number[] }[] = [];
  const used = new Set<number>();
  let nextId = 1;

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    if (!cell || cell.isWater) continue;
    if (cell.flowAccumulation < threshold) continue;
    if (used.has(i)) continue;

    const path: number[] = [];
    let cur = i;
    const seen = new Set<number>();

    for (let steps = 0; steps < cells.length; steps++) {
      if (seen.has(cur)) break;
      seen.add(cur);

      path.push(cur);
      used.add(cur);

      const c = cells[cur];
      if (!c) break;
      if (c.isWater) break;

      const d = c.flowDirection;
      if (d == null) break;

      if (used.has(d)) {
        path.push(d);
        cur = d;
        break;
      }

      cur = d;
    }

    if (path.length >= 2) {
      const mouth = path[path.length - 1];
      rivers.push({
        id: nextId++,
        sourceCellIndex: i,
        mouthCellIndex: mouth,
        path,
      });
    }
  }

  world.rivers = rivers.map((r) => ({
    id: r.id,
    sourceCellIndex: r.sourceCellIndex,
    mouthCellIndex: r.mouthCellIndex,
    path: r.path,
  }));
}

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}