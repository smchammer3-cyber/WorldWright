import {
  IslandCause,
  OceanDepthClass,
  type Cell,
  type WorldBrain,
} from '../worldSchema';
import type { GeographyProfile } from '../worldGeographyProfile';

export type GeographyMetrics = {
  landCoverage: number;
  shelfCoverage: number;
  deepOceanCoverage: number;
  largestLandmassShare: number;
  tinyIslandShare: number;
  mediumFragmentShare: number;
  averageLandRelief: number;
  shelfBridgeRisk: number;
  skeletonImprintRisk: number;
};

export type GeographyFitReport = GeographyMetrics & {
  landCoverageStatus: 'LOW' | 'OK' | 'HIGH';
  shelfCoverageStatus: 'LOW' | 'OK' | 'HIGH';
  deepOceanStatus: 'LOW' | 'OK' | 'HIGH';
  largestLandmassStatus: 'OK' | 'HIGH';
};

/**
 * Scoreboard for generated geography. These numbers are not victory claims;
 * they are measured output that can be compared against the current profile.
 */
export function measureGeographyProfileFit(world: WorldBrain, profile: GeographyProfile): GeographyFitReport {
  const metrics = measureGeographyMetrics(world);
  return {
    ...metrics,
    landCoverageStatus: rangeStatus(metrics.landCoverage, profile.landCoverageTarget),
    shelfCoverageStatus: rangeStatus(metrics.shelfCoverage, profile.shelfAreaTarget),
    deepOceanStatus: rangeStatus(metrics.deepOceanCoverage, profile.deepOceanTarget),
    largestLandmassStatus: metrics.largestLandmassShare > profile.largestLandmassTarget[1] ? 'HIGH' : 'OK',
  };
}

export function measureGeographyMetrics(world: WorldBrain): GeographyMetrics {
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const total = Math.max(1, world.cells.length);
  let land = 0;
  let shelf = 0;
  let deepOcean = 0;
  let landHeightSum = 0;
  let landHeightSqSum = 0;
  let bridgeRiskSum = 0;
  let imprintRiskSum = 0;

  const components = landComponentsByHeight(world, seaLevel);
  let largest = 0;
  let tinyLand = 0;
  let mediumLand = 0;

  for (const component of components) {
    largest = Math.max(largest, component.length);
    if (component.length <= 14) tinyLand += component.length;
    else if (component.length <= Math.max(30, total * 0.012)) mediumLand += component.length;
  }

  const heights = world.cells.map((cell) => totalHeight(cell));

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = heights[i];
    const aboveSea = h - seaLevel;
    const isLand = h >= seaLevel;
    if (isLand) {
      land++;
      landHeightSum += aboveSea;
      landHeightSqSum += aboveSea * aboveSea;
    }

    if (!isLand && (cell.oceanDepthClass === OceanDepthClass.SHELF || cell.oceanDepthClass === OceanDepthClass.SLOPE)) {
      shelf++;
    }

    if (!isLand && (cell.oceanDepthClass === OceanDepthClass.ABYSSAL || cell.oceanDepthClass === OceanDepthClass.TRENCH)) {
      deepOcean++;
    }

    const shelfStrength = clamp01(cell.shelfStrength);
    const continentality = clamp01(cell.continentality);
    const core = clamp01(cell.continentCoreStrength);
    const landNeighbors = landNeighborFractionByHeight(world, i, seaLevel, heights);
    const waterNeighbors = 1 - landNeighbors;

    if (shelfStrength > 0.35 && core < 0.35 && Math.abs(aboveSea) < 0.09) {
      bridgeRiskSum += shelfStrength * (0.5 + Math.min(landNeighbors, waterNeighbors));
    }

    if (continentality > 0.18 && continentality < 0.55 && core < 0.22 && Math.abs(aboveSea) < 0.08) {
      imprintRiskSum += (1 - core) * (0.5 + shelfStrength * 0.5);
    }
  }

  const landMean = land > 0 ? landHeightSum / land : 0;
  const landVariance = land > 0 ? Math.max(0, landHeightSqSum / land - landMean * landMean) : 0;

  return {
    landCoverage: land / total,
    shelfCoverage: shelf / total,
    deepOceanCoverage: deepOcean / total,
    largestLandmassShare: land > 0 ? largest / land : 0,
    tinyIslandShare: land > 0 ? tinyLand / land : 0,
    mediumFragmentShare: land > 0 ? mediumLand / land : 0,
    averageLandRelief: Math.sqrt(landVariance),
    shelfBridgeRisk: bridgeRiskSum / total,
    skeletonImprintRisk: imprintRiskSum / total,
  };
}

/**
 * Conservative profile correction. This is intentionally targeted: it only
 * corrects measured failures instead of letting every pass push terrain freely.
 */
export function applyGeographyProfileCorrections(world: WorldBrain, profile: GeographyProfile): GeographyFitReport {
  const before = measureGeographyProfileFit(world, profile);
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const heights = world.cells.map((cell) => totalHeight(cell));
  const largestSet = new Set(largestLandComponent(world, seaLevel));

  const landHigh = excess(before.landCoverage, profile.landCoverageTarget[1]);
  const landLow = excess(profile.landCoverageTarget[0], before.landCoverage);
  const shelfHigh = excess(before.shelfCoverage, profile.shelfAreaTarget[1]);
  const deepLow = excess(profile.deepOceanTarget[0], before.deepOceanCoverage);
  const largestHigh = excess(before.largestLandmassShare, profile.largestLandmassTarget[1]);
  const bridgeHigh = Math.max(0, before.shelfBridgeRisk - profile.artifactTolerance * 0.16);
  const imprintHigh = Math.max(0, before.skeletonImprintRisk - profile.artifactTolerance * 0.18);

  if (landHigh + landLow + shelfHigh + deepLow + largestHigh + bridgeHigh + imprintHigh <= 0) {
    return before;
  }

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = heights[i];
    const aboveSea = h - seaLevel;
    const continentality = clamp01(cell.continentality);
    const core = clamp01(cell.continentCoreStrength);
    const shelf = clamp01(cell.shelfStrength);
    const landNeighbors = landNeighborFractionByHeight(world, i, seaLevel, heights);
    const waterNeighbors = 1 - landNeighbors;
    const caused = isCausedIslandCell(cell);

    let delta = 0;

    if (shelfHigh > 0 && h < seaLevel && shelf > 0.25 && core < 0.50) {
      delta -= Math.min(0.070, shelfHigh * 0.70) * profile.oceanBasinWeight * (0.45 + waterNeighbors * 0.55);
    }

    if (deepLow > 0 && h < seaLevel && continentality < 0.28 && shelf < 0.32) {
      delta -= Math.min(0.085, deepLow * 0.62) * profile.oceanBasinWeight;
    }

    if (landHigh > 0 && h >= seaLevel && aboveSea < 0.14 && core < 0.45 && !caused) {
      delta -= Math.min(0.075, landHigh * 0.72) * profile.cleanupWeight * 5.0 * (0.45 + waterNeighbors * 0.55);
    }

    if (landLow > 0 && h > seaLevel - 0.08 && continentality > 0.68 && core > 0.42) {
      delta += Math.min(0.060, landLow * 0.55) * profile.skeletonWeight * (0.60 + core * 0.40);
    }

    if (largestHigh > 0 && largestSet.has(i) && aboveSea > -0.02 && aboveSea < 0.16 && core < 0.36 && shelf > 0.25) {
      delta -= Math.min(0.065, largestHigh * 0.28) * profile.oceanBasinWeight * (0.35 + shelf * 0.65);
    }

    if (bridgeHigh > 0 && Math.abs(aboveSea) < 0.10 && shelf > 0.35 && core < 0.35) {
      delta -= Math.min(0.050, bridgeHigh * 0.90) * (0.4 + Math.min(landNeighbors, waterNeighbors));
    }

    if (imprintHigh > 0 && Math.abs(aboveSea) < 0.08 && continentality > 0.18 && continentality < 0.55 && core < 0.22 && !caused) {
      delta -= Math.min(0.040, imprintHigh * 0.85) * (0.45 + shelf * 0.55);
    }

    if (delta !== 0) {
      cell.baseHeight = clamp(cell.baseHeight + delta, -1.4, 1.5);
    }
  }

  return measureGeographyProfileFit(world, profile);
}

function rangeStatus(value: number, range: [number, number]): 'LOW' | 'OK' | 'HIGH' {
  if (value < range[0]) return 'LOW';
  if (value > range[1]) return 'HIGH';
  return 'OK';
}

function excess(value: number, limit: number): number {
  return Math.max(0, value - limit);
}

function largestLandComponent(world: WorldBrain, seaLevel: number): number[] {
  let largest: number[] = [];
  for (const component of landComponentsByHeight(world, seaLevel)) {
    if (component.length > largest.length) largest = component;
  }
  return largest;
}

function landComponentsByHeight(world: WorldBrain, seaLevel: number): number[][] {
  const visited = new Uint8Array(world.cells.length);
  const out: number[][] = [];

  for (let i = 0; i < world.cells.length; i++) {
    if (visited[i] || totalHeight(world.cells[i]) < seaLevel) continue;
    const component: number[] = [];
    const queue = [i];
    visited[i] = 1;

    for (let head = 0; head < queue.length; head++) {
      const current = queue[head];
      component.push(current);
      for (const neighbor of neighborIndices4(world, current)) {
        if (!visited[neighbor] && totalHeight(world.cells[neighbor]) >= seaLevel) {
          visited[neighbor] = 1;
          queue.push(neighbor);
        }
      }
    }

    out.push(component);
  }

  return out;
}

function landNeighborFractionByHeight(world: WorldBrain, index: number, seaLevel: number, heights: number[]): number {
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 0;
  let land = 0;
  for (const neighbor of neighbors) {
    if (heights[neighbor] >= seaLevel) land++;
  }
  return land / neighbors.length;
}

function neighborIndices4(world: WorldBrain, index: number): number[] {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  const neighbors = [
    row * world.gridWidth + ((col - 1 + world.gridWidth) % world.gridWidth),
    row * world.gridWidth + ((col + 1) % world.gridWidth),
  ];
  if (row > 0) neighbors.push((row - 1) * world.gridWidth + col);
  if (row < world.gridHeight - 1) neighbors.push((row + 1) * world.gridWidth + col);
  return neighbors;
}

function isCausedIslandCell(cell: Cell): boolean {
  return (
    cell.islandCause === IslandCause.ISLAND_ARC ||
    cell.islandCause === IslandCause.VOLCANIC_HOTSPOT ||
    cell.islandCause === IslandCause.RIFT_FRAGMENT ||
    cell.islandCause === IslandCause.SHELF_ISLAND ||
    cell.islandCause === IslandCause.CONTINENTAL_FRAGMENT ||
    cell.volcanicActivity > 0.42
  );
}

function totalHeight(cell: Cell): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
}

function numeric(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function clamp(value: number, lo: number, hi: number): number {
  return value < lo ? lo : value > hi ? hi : value;
}

function clamp01(value: number): number {
  return clamp(value, 0, 1);
}
