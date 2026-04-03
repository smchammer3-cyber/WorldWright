// ========================================================
// WORLDWRIGHT -- RECOMPUTE PIPELINE (V1.3 CLIMATE / BIOME POLISH PASS)
// File: src/core/worldRecompute/index.ts
//
// Goals:
// - preserve generated climate much more strongly
// - reduce east-west banding
// - reduce snow / alpine over-application
// - keep recompute as refinement, not a second generator
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

  if (
    has('GENERATED') ||
    has('LOADED') ||
    has('SIM_STEP') ||
    has('SEA_LEVEL_CHANGED')
  ) {
    return {
      smoothLandmask: false,
      recomputeClimateStage: true,
      recomputeHydrologyStage: true,
      recomputeRiverStage: true,
      recomputeSnowStage: true,
      recomputeBiomeStage: true,
    };
  }

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

  recomputeIsWater(world);

  if (profile.smoothLandmask) {
    smoothLandmaskNearSeaLevel(world, 1);
    recomputeIsWater(world);
  }

  if (profile.recomputeClimateStage) {
    recomputeClimate(world);
  }

  if (profile.recomputeHydrologyStage) {
    recomputeHydrology(world);
  }

  if (profile.recomputeRiverStage) {
    recomputeRivers(world);
  }

  if (profile.recomputeSnowStage) {
    recomputeSnow(world);
  }

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
    const elevAboveSea = Math.max(0, h - world.seaLevel);
    const t = clamp01(cell.temperature);
    const r = clamp01(cell.rainfall);

    const tempC = -22 + t * 50;

    const seasonalSnow = tempC < -3 ? clamp01((-3 - tempC) / 9) : 0;
    const permanentIce = tempC < -17 ? clamp01((-17 - tempC) / 10) : 0;
    const alpineBoost = clamp01((elevAboveSea - 0.28) * 0.55);
    const moistureFactor = lerp(0.40, 0.90, r);

    let snow = Math.max(permanentIce, seasonalSnow * moistureFactor);
    snow = clamp01(snow + alpineBoost * 0.16);

    cell.snowCover = snow;
  }
}

/**
 * Preserve generator climate strongly. Recompute only nudges toward
 * physically sensible large-scale behavior; it should not flatten the world
 * back into broad latitudinal bands.
 */
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

  const moistureLevel =
    typeof (world.parameters as any)?.moistureLevel === 'number'
      ? clamp01(((world.parameters as any).moistureLevel as number) / 100)
      : 0.5;

  const tempOffset =
    typeof (world.parameters as any)?.temperatureOffset === 'number'
      ? (((world.parameters as any).temperatureOffset as number) / 100) * 0.18
      : 0;

  function oceanProximityAt(row: number, col: number, radius = 4): number {
    let count = 0;
    let total = 0;

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
      const cell = cells[idx];
      if (!cell) continue;

      const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta - sea;
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

      const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
      const elevAboveSea = Math.max(0, h - sea);
      const elevCooling = clamp01(elevAboveSea * 0.50);
      const oceanProx = oceanProximityAt(r, c, 4);
      const rainShadow = rainShadowAt(r, c);

      const priorTemp =
        typeof cell.temperature === 'number' ? clamp01(cell.temperature) : 0.5;
      const priorRain =
        typeof cell.rainfall === 'number' ? clamp01(cell.rainfall) : 0.5;

      const targetTemp = clamp01(
        latWarmth * 0.75 +
          oceanProx * 0.04 +
          (1 - elevCooling) * 0.05 +
          tempOffset
      );

      const coastalWetness = oceanProx * (1 - elevCooling) * 0.20;
      const targetRain = clamp01(
        0.22 +
          hadleyWet * 0.26 -
          subtropicDry * 0.15 -
          polarDry +
          coastalWetness +
          moistureLevel * 0.14 -
          rainShadow * 0.15
      );

      // Much stronger preservation of generator climate
      cell.temperature = clamp01(priorTemp * 0.82 + targetTemp * 0.18);
      cell.rainfall = clamp01(priorRain * 0.80 + targetRain * 0.20);

      // Minimal neighbor consistency pass -- enough to reduce hard seams,
      // not enough to flatten structure.
      if (r > 0 && r < gh - 1) {
        const north = cells[(r - 1) * gw + c];
        const south = cells[(r + 1) * gw + c];
        if (north && south) {
          cell.temperature = clamp01(
            cell.temperature * 0.95 +
              ((north.temperature + south.temperature) * 0.5) * 0.05
          );
          cell.rainfall = clamp01(
            cell.rainfall * 0.95 +
              ((north.rainfall + south.rainfall) * 0.5) * 0.05
          );
        }
      }
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
  const epsilon = 0.012;
  const margin = 0.003;

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
  const sea = world.seaLevel;

  for (const cell of world.cells) {
    if (!cell) continue;

    if (cell.isWater) {
      cell.baseBiomeId = 0;
      continue;
    }

    const h = cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
    const elev = Math.max(0, h - sea);
    const t = clamp01(cell.temperature);
    const r = clamp01(cell.rainfall);

    if (cell.snowCover > 0.84 || elev > 0.88) {
      cell.baseBiomeId = 6;
      continue;
    }

    if (t < 0.13) {
      cell.baseBiomeId = r < 0.28 ? 1 : 2;
      continue;
    }

    if (r < 0.13) {
      cell.baseBiomeId = t > 0.58 ? 8 : 4;
      continue;
    }

    if (r < 0.27) {
      cell.baseBiomeId = t > 0.62 ? 9 : 3;
      continue;
    }

    if (r > 0.68) {
      cell.baseBiomeId = t > 0.62 ? 10 : 7;
      continue;
    }

    cell.baseBiomeId = 5;
  }
}

function recomputeRivers(world: WorldBrain): void {
  const cells = world.cells;
  const gw = world.gridWidth;
  const gh = world.gridHeight;

  const total = gw * gh;
  const threshold = Math.max(24, Math.round(total / 3800));

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