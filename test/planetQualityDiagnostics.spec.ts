import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { recomputeWorld } from '../src/core/worldRecompute';
import { validateWorld } from '../src/core/worldValidation';
import { makePlanetPreviewFromWorldBrain } from '../src/core/planetRenderer';
import { BoundaryType, type WorldBrain } from '../src/core/worldSchema';

type PlanetQualityMetrics = {
  seed: number | string;
  width: number;
  height: number;
  landFraction: number;
  landComponents: number;
  largestLandComponentFraction: number;
  tinyIslandFraction: number;
  coastEdgeDensity: number;
  maxHorizontalCoastRun: number;
  maxVerticalCoastRun: number;
  biomeEdgeHarshness: number;
  upliftHeightCorrelationNearBoundaries: number | null;
  uphillRiverSteps: number;
  riverStepCount: number;
  rendererUsesRawGridResolution: boolean;
  validationErrors: string[];
};

const DIAGNOSTIC_SEEDS: Array<number | string> = [101, 202, 'worldwright-diagnostic-303'];
const WIDTH = 96;
const HEIGHT = 48;

function makeDiagnosticWorld(seed: number | string): WorldBrain {
  const params = createDefaultGeneratorParams();
  params.seed = seed;
  params.width = WIDTH;
  params.height = HEIGHT;
  params.seaLevel = 50;
  params.plateActivity = 55;
  params.planetAge = 70;
  params.erosionIntensity = 70;
  params.continentCount = 4;

  const world = generateWorldFromParams(params);
  recomputeWorld(world, ['GENERATED']);
  return world;
}

function totalHeight(world: WorldBrain, index: number): number {
  const cell = world.cells[index];
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
}

function neighborIndices4(world: WorldBrain, index: number): number[] {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  const west = (col - 1 + world.gridWidth) % world.gridWidth;
  const east = (col + 1) % world.gridWidth;
  const neighbors = [row * world.gridWidth + west, row * world.gridWidth + east];

  if (row > 0) neighbors.push((row - 1) * world.gridWidth + col);
  if (row < world.gridHeight - 1) neighbors.push((row + 1) * world.gridWidth + col);

  return neighbors;
}

function landComponentSizes(world: WorldBrain): number[] {
  const visited = new Set<number>();
  const sizes: number[] = [];

  for (let i = 0; i < world.cells.length; i++) {
    if (visited.has(i) || world.cells[i].isWater) continue;

    let size = 0;
    const queue = [i];
    visited.add(i);

    while (queue.length > 0) {
      const current = queue.shift()!;
      size++;

      for (const next of neighborIndices4(world, current)) {
        if (!visited.has(next) && !world.cells[next].isWater) {
          visited.add(next);
          queue.push(next);
        }
      }
    }

    sizes.push(size);
  }

  return sizes.sort((a, b) => b - a);
}

function isCoastCell(world: WorldBrain, index: number): boolean {
  const isWater = world.cells[index].isWater;
  return neighborIndices4(world, index).some((neighbor) => world.cells[neighbor].isWater !== isWater);
}

function coastlineEdgeDensity(world: WorldBrain): number {
  let coastEdges = 0;
  let possibleEdges = 0;

  for (let row = 0; row < world.gridHeight; row++) {
    for (let col = 0; col < world.gridWidth; col++) {
      const idx = row * world.gridWidth + col;
      const east = row * world.gridWidth + ((col + 1) % world.gridWidth);
      coastEdges += world.cells[idx].isWater !== world.cells[east].isWater ? 1 : 0;
      possibleEdges++;

      if (row < world.gridHeight - 1) {
        const south = (row + 1) * world.gridWidth + col;
        coastEdges += world.cells[idx].isWater !== world.cells[south].isWater ? 1 : 0;
        possibleEdges++;
      }
    }
  }

  return possibleEdges === 0 ? 0 : coastEdges / possibleEdges;
}

function maxHorizontalCoastRun(world: WorldBrain): number {
  let maxRun = 0;

  for (let row = 0; row < world.gridHeight; row++) {
    let run = 0;
    for (let col = 0; col < world.gridWidth; col++) {
      const idx = row * world.gridWidth + col;
      if (isCoastCell(world, idx)) {
        run++;
        maxRun = Math.max(maxRun, run);
      } else {
        run = 0;
      }
    }
  }

  return maxRun;
}

function maxVerticalCoastRun(world: WorldBrain): number {
  let maxRun = 0;

  for (let col = 0; col < world.gridWidth; col++) {
    let run = 0;
    for (let row = 0; row < world.gridHeight; row++) {
      const idx = row * world.gridWidth + col;
      if (isCoastCell(world, idx)) {
        run++;
        maxRun = Math.max(maxRun, run);
      } else {
        run = 0;
      }
    }
  }

  return maxRun;
}

function biomeEdgeHarshness(world: WorldBrain): number {
  let differentBiomeEdges = 0;
  let landLandEdges = 0;

  for (let row = 0; row < world.gridHeight; row++) {
    for (let col = 0; col < world.gridWidth; col++) {
      const idx = row * world.gridWidth + col;
      const current = world.cells[idx];
      if (current.isWater) continue;

      const candidates = [row * world.gridWidth + ((col + 1) % world.gridWidth)];
      if (row < world.gridHeight - 1) candidates.push((row + 1) * world.gridWidth + col);

      for (const nextIdx of candidates) {
        const next = world.cells[nextIdx];
        if (next.isWater) continue;
        landLandEdges++;
        if (current.baseBiomeId !== next.baseBiomeId) differentBiomeEdges++;
      }
    }
  }

  return landLandEdges === 0 ? 0 : differentBiomeEdges / landLandEdges;
}

function correlation(xs: number[], ys: number[]): number | null {
  if (xs.length < 2 || xs.length !== ys.length) return null;

  const meanX = xs.reduce((sum, value) => sum + value, 0) / xs.length;
  const meanY = ys.reduce((sum, value) => sum + value, 0) / ys.length;

  let numerator = 0;
  let denomX = 0;
  let denomY = 0;

  for (let i = 0; i < xs.length; i++) {
    const dx = xs[i] - meanX;
    const dy = ys[i] - meanY;
    numerator += dx * dy;
    denomX += dx * dx;
    denomY += dy * dy;
  }

  const denominator = Math.sqrt(denomX * denomY);
  return denominator === 0 ? null : numerator / denominator;
}

function upliftHeightCorrelationNearBoundaries(world: WorldBrain): number | null {
  const uplift: number[] = [];
  const heights: number[] = [];

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    if (cell.boundaryType === BoundaryType.NONE) continue;
    if (!Number.isFinite(cell.upliftRate)) continue;

    uplift.push(cell.upliftRate);
    heights.push(totalHeight(world, i));
  }

  return correlation(uplift, heights);
}

function riverSlopeDiagnostics(world: WorldBrain): { uphillRiverSteps: number; riverStepCount: number } {
  let uphillRiverSteps = 0;
  let riverStepCount = 0;

  for (const river of world.rivers) {
    for (let i = 0; i < river.path.length - 1; i++) {
      const current = river.path[i];
      const next = river.path[i + 1];
      if (current < 0 || next < 0 || current >= world.cells.length || next >= world.cells.length) continue;

      riverStepCount++;
      if (totalHeight(world, next) > totalHeight(world, current) + 1e-6) {
        uphillRiverSteps++;
      }
    }
  }

  return { uphillRiverSteps, riverStepCount };
}

function collectMetrics(seed: number | string): PlanetQualityMetrics {
  const world = makeDiagnosticWorld(seed);
  const validationErrors = validateWorld(world);
  const preview = makePlanetPreviewFromWorldBrain(world);

  const landCells = world.cells.filter((cell) => !cell.isWater).length;
  const componentSizes = landComponentSizes(world);
  const tinyLandCells = componentSizes.filter((size) => size < 12).reduce((sum, size) => sum + size, 0);
  const largestLandComponent = componentSizes[0] ?? 0;
  const riverDiagnostics = riverSlopeDiagnostics(world);

  return {
    seed,
    width: world.gridWidth,
    height: world.gridHeight,
    landFraction: landCells / world.cells.length,
    landComponents: componentSizes.length,
    largestLandComponentFraction: landCells === 0 ? 0 : largestLandComponent / landCells,
    tinyIslandFraction: landCells === 0 ? 0 : tinyLandCells / landCells,
    coastEdgeDensity: coastlineEdgeDensity(world),
    maxHorizontalCoastRun: maxHorizontalCoastRun(world),
    maxVerticalCoastRun: maxVerticalCoastRun(world),
    biomeEdgeHarshness: biomeEdgeHarshness(world),
    upliftHeightCorrelationNearBoundaries: upliftHeightCorrelationNearBoundaries(world),
    uphillRiverSteps: riverDiagnostics.uphillRiverSteps,
    riverStepCount: riverDiagnostics.riverStepCount,
    rendererUsesRawGridResolution: preview.width === world.gridWidth && preview.height === world.gridHeight,
    validationErrors,
  };
}

function expectMetricIsFinite(value: number): void {
  expect(Number.isFinite(value)).toBe(true);
}

describe('planet visual quality diagnostics', () => {
  it('reports fixed-seed planet quality metrics without changing production behavior', () => {
    const metrics = DIAGNOSTIC_SEEDS.map(collectMetrics);

    // This is intentionally diagnostic, not a quality gate yet.
    // The printed JSON gives future work stable evidence for coastline,
    // biome, river, tectonic, and renderer raw-grid problems.
    console.log('[planet-quality-diagnostics]', JSON.stringify(metrics, null, 2));

    expect(metrics).toHaveLength(DIAGNOSTIC_SEEDS.length);

    for (const metric of metrics) {
      expect(metric.width).toBe(WIDTH);
      expect(metric.height).toBe(HEIGHT);
      expect(metric.validationErrors).toEqual([]);

      expectMetricIsFinite(metric.landFraction);
      expectMetricIsFinite(metric.largestLandComponentFraction);
      expectMetricIsFinite(metric.tinyIslandFraction);
      expectMetricIsFinite(metric.coastEdgeDensity);
      expectMetricIsFinite(metric.maxHorizontalCoastRun);
      expectMetricIsFinite(metric.maxVerticalCoastRun);
      expectMetricIsFinite(metric.biomeEdgeHarshness);
      expectMetricIsFinite(metric.uphillRiverSteps);
      expectMetricIsFinite(metric.riverStepCount);

      expect(metric.landFraction).toBeGreaterThanOrEqual(0);
      expect(metric.landFraction).toBeLessThanOrEqual(1);
      expect(metric.rendererUsesRawGridResolution).toBe(true);
    }
  });
});
