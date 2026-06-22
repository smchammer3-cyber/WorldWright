import { BoundaryType, OceanDepthClass, PlateType, type WorldBrain } from './worldSchema';

export type DiagnosticLevel = 'ok' | 'watch' | 'problem';

export type DiagnosticMetric = {
  id: string;
  label: string;
  value: string;
  level: DiagnosticLevel;
  detail: string;
};

export type WorldDiagnostics = {
  summary: {
    problemCount: number;
    watchCount: number;
    okCount: number;
  };
  metrics: DiagnosticMetric[];
  raw: {
    landFraction: number;
    snowLandFraction: number;
    meanSnowOnLand: number;
    landComponents: number;
    largestLandmassShare: number;
    tinyIslandShare: number;
    coastlineEdgeDensity: number;
    maxHorizontalCoastRun: number;
    maxVerticalCoastRun: number;
    heightStdDev: number;
    landHeightStdDev: number;
    oceanHeightStdDev: number;
    plateBoundaryFraction: number;
    seamHeightRatio: number | null;
    plateTypeTerrainMismatch: number;
    oceanDepthDominantShare: number;
    oceanDepthDistribution: Record<string, number>;
  };
};

export function computeWorldDiagnostics(world: WorldBrain): WorldDiagnostics {
  const totalCells = Math.max(1, world.cells.length);
  const landIndices: number[] = [];
  const oceanDepthCounts: Record<string, number> = {
    [OceanDepthClass.SHELF]: 0,
    [OceanDepthClass.SLOPE]: 0,
    [OceanDepthClass.RIDGE]: 0,
    [OceanDepthClass.ABYSSAL]: 0,
    [OceanDepthClass.TRENCH]: 0,
    NONE: 0,
  };

  let snowLandCells = 0;
  let snowSumOnLand = 0;
  let boundaryCells = 0;
  let plateTypeTerrainMismatch = 0;
  const allHeights: number[] = [];
  const landHeights: number[] = [];
  const oceanHeights: number[] = [];

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = totalHeight(world, i);
    allHeights.push(h);

    if (cell.boundaryType !== BoundaryType.NONE) boundaryCells++;

    if (cell.isWater) {
      oceanHeights.push(h);
      oceanDepthCounts[cell.oceanDepthClass ?? 'NONE'] = (oceanDepthCounts[cell.oceanDepthClass ?? 'NONE'] ?? 0) + 1;
      if (cell.plateType === PlateType.CONTINENTAL) plateTypeTerrainMismatch++;
    } else {
      landIndices.push(i);
      landHeights.push(h);
      snowSumOnLand += cell.snowCover;
      if (cell.snowCover > 0.35) snowLandCells++;
      if (cell.plateType === PlateType.OCEANIC) plateTypeTerrainMismatch++;
    }
  }

  const landFraction = landIndices.length / totalCells;
  const componentSizes = landComponentSizes(world);
  const landCellCount = Math.max(1, landIndices.length);
  const largestLandmassShare = (componentSizes[0] ?? 0) / landCellCount;
  const tinyIslandShare = componentSizes.filter((size) => size < 12).reduce((sum, size) => sum + size, 0) / landCellCount;
  const seamHeightRatio = plateSeamHeightRatio(world);
  const oceanTotal = Math.max(1, oceanHeights.length);
  const dominantOceanDepthCount = Math.max(...Object.values(oceanDepthCounts));

  const raw = {
    landFraction,
    snowLandFraction: snowLandCells / landCellCount,
    meanSnowOnLand: snowSumOnLand / landCellCount,
    landComponents: componentSizes.length,
    largestLandmassShare,
    tinyIslandShare,
    coastlineEdgeDensity: coastlineEdgeDensity(world),
    maxHorizontalCoastRun: maxHorizontalCoastRun(world),
    maxVerticalCoastRun: maxVerticalCoastRun(world),
    heightStdDev: stdDev(allHeights),
    landHeightStdDev: stdDev(landHeights),
    oceanHeightStdDev: stdDev(oceanHeights),
    plateBoundaryFraction: boundaryCells / totalCells,
    seamHeightRatio,
    plateTypeTerrainMismatch: plateTypeTerrainMismatch / totalCells,
    oceanDepthDominantShare: dominantOceanDepthCount / oceanTotal,
    oceanDepthDistribution: normalizeCounts(oceanDepthCounts, oceanTotal),
  };

  const metrics: DiagnosticMetric[] = [
    metric('land', 'Land coverage', percent(raw.landFraction), landLevel(raw.landFraction), 'Target Earthlike range is roughly 22–45%. Too high/low means sea level is hiding terrain problems.'),
    metric('largestLandmass', 'Largest landmass', percent(raw.largestLandmassShare), largestLandmassLevel(raw.largestLandmassShare), 'Share of all land in the biggest connected landmass. High values mean slab/supercontinent risk.'),
    metric('landComponents', 'Landmasses', String(raw.landComponents), componentLevel(raw.landComponents), 'Connected 4-neighbor land bodies. Very low means blob continents; very high means noisy confetti.'),
    metric('tinyIslands', 'Tiny island share', percent(raw.tinyIslandShare), tinyIslandLevel(raw.tinyIslandShare), 'Land trapped in tiny components under 12 cells.'),
    metric('coastDensity', 'Coast density', percent(raw.coastlineEdgeDensity), coastDensityLevel(raw.coastlineEdgeDensity), 'Amount of land/water edge. Too low means smooth blobs; too high means noisy/static coast.'),
    metric('axisRuns', 'Long straight coast', `${raw.maxHorizontalCoastRun}/${raw.maxVerticalCoastRun}`, axisRunLevel(world, raw.maxHorizontalCoastRun, raw.maxVerticalCoastRun), 'Longest horizontal/vertical coast-cell run. High values reveal grid/block artifacts.'),
    metric('heightRelief', 'Height relief', fixed(raw.heightStdDev), reliefLevel(raw.heightStdDev), 'Standard deviation of total height. Low values mean flat colored regions.'),
    metric('landRelief', 'Land relief', fixed(raw.landHeightStdDev), reliefLevel(raw.landHeightStdDev), 'Land-only height variation. Low values mean land lacks mountains, basins, and highlands.'),
    metric('seams', 'Plate seam imprint', raw.seamHeightRatio == null ? 'n/a' : `${fixed(raw.seamHeightRatio)}×`, seamLevel(raw.seamHeightRatio), 'Height jump across plate borders divided by same-plate neighbor jumps. High values mean tectonic seams are visible in terrain.'),
    metric('boundaries', 'Boundary cells', percent(raw.plateBoundaryFraction), boundaryLevel(raw.plateBoundaryFraction), 'Percent of cells marked as plate boundaries. High values can make the world look tiled.'),
    metric('plateMismatch', 'Plate/terrain mismatch', percent(raw.plateTypeTerrainMismatch), mismatchLevel(raw.plateTypeTerrainMismatch), 'Continental plate under water or oceanic plate above water. Some is okay; too much means plate type is not matching terrain.'),
    metric('snow', 'Snowy land', percent(raw.snowLandFraction), snowLevel(raw.snowLandFraction), 'Land cells with snowCover > 0.35. High values explain pale/white wash.'),
    metric('oceanDepth', 'Dominant ocean class', percent(raw.oceanDepthDominantShare), oceanDepthLevel(raw.oceanDepthDominantShare), 'If one ocean-depth class dominates, bathymetry is painted/flat instead of shelf/slope/basin/trench mixed.'),
  ];

  const summary = {
    problemCount: metrics.filter((m) => m.level === 'problem').length,
    watchCount: metrics.filter((m) => m.level === 'watch').length,
    okCount: metrics.filter((m) => m.level === 'ok').length,
  };

  return { summary, metrics, raw };
}

function metric(id: string, label: string, value: string, level: DiagnosticLevel, detail: string): DiagnosticMetric {
  return { id, label, value, level, detail };
}

function totalHeight(world: WorldBrain, index: number): number {
  const cell = world.cells[index];
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
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

function landComponentSizes(world: WorldBrain): number[] {
  const visited = new Uint8Array(world.cells.length);
  const sizes: number[] = [];

  for (let i = 0; i < world.cells.length; i++) {
    if (visited[i] || world.cells[i].isWater) continue;

    let size = 0;
    const queue = [i];
    visited[i] = 1;

    for (let head = 0; head < queue.length; head++) {
      const current = queue[head];
      size++;
      for (const next of neighborIndices4(world, current)) {
        if (!visited[next] && !world.cells[next].isWater) {
          visited[next] = 1;
          queue.push(next);
        }
      }
    }

    sizes.push(size);
  }

  return sizes.sort((a, b) => b - a);
}

function coastlineEdgeDensity(world: WorldBrain): number {
  let coastEdges = 0;
  let possibleEdges = 0;

  for (let row = 0; row < world.gridHeight; row++) {
    for (let col = 0; col < world.gridWidth; col++) {
      const idx = row * world.gridWidth + col;
      const east = row * world.gridWidth + ((col + 1) % world.gridWidth);
      possibleEdges++;
      if (world.cells[idx].isWater !== world.cells[east].isWater) coastEdges++;

      if (row < world.gridHeight - 1) {
        const south = (row + 1) * world.gridWidth + col;
        possibleEdges++;
        if (world.cells[idx].isWater !== world.cells[south].isWater) coastEdges++;
      }
    }
  }

  return possibleEdges === 0 ? 0 : coastEdges / possibleEdges;
}

function isCoastCell(world: WorldBrain, index: number): boolean {
  const isWater = world.cells[index].isWater;
  return neighborIndices4(world, index).some((neighbor) => world.cells[neighbor].isWater !== isWater);
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

function plateSeamHeightRatio(world: WorldBrain): number | null {
  let boundaryDelta = 0;
  let boundaryEdges = 0;
  let samePlateDelta = 0;
  let samePlateEdges = 0;

  for (let row = 0; row < world.gridHeight; row++) {
    for (let col = 0; col < world.gridWidth; col++) {
      const idx = row * world.gridWidth + col;
      const candidates = [row * world.gridWidth + ((col + 1) % world.gridWidth)];
      if (row < world.gridHeight - 1) candidates.push((row + 1) * world.gridWidth + col);

      for (const next of candidates) {
        const delta = Math.abs(totalHeight(world, idx) - totalHeight(world, next));
        if (world.cells[idx].plateId !== world.cells[next].plateId) {
          boundaryDelta += delta;
          boundaryEdges++;
        } else {
          samePlateDelta += delta;
          samePlateEdges++;
        }
      }
    }
  }

  if (boundaryEdges === 0 || samePlateEdges === 0) return null;
  const boundaryMean = boundaryDelta / boundaryEdges;
  const sameMean = samePlateDelta / samePlateEdges;
  if (sameMean <= 1e-9) return null;
  return boundaryMean / sameMean;
}

function normalizeCounts(counts: Record<string, number>, denominator: number): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [key, value] of Object.entries(counts)) out[key] = value / Math.max(1, denominator);
  return out;
}

function stdDev(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

function percent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function fixed(value: number): string {
  return value.toFixed(2);
}

function landLevel(v: number): DiagnosticLevel {
  if (v < 0.18 || v > 0.55) return 'problem';
  if (v < 0.23 || v > 0.48) return 'watch';
  return 'ok';
}

function largestLandmassLevel(v: number): DiagnosticLevel {
  if (v > 0.82) return 'problem';
  if (v > 0.68) return 'watch';
  return 'ok';
}

function componentLevel(v: number): DiagnosticLevel {
  if (v < 2 || v > 120) return 'problem';
  if (v < 4 || v > 70) return 'watch';
  return 'ok';
}

function tinyIslandLevel(v: number): DiagnosticLevel {
  if (v > 0.14) return 'problem';
  if (v > 0.07) return 'watch';
  return 'ok';
}

function coastDensityLevel(v: number): DiagnosticLevel {
  if (v < 0.020 || v > 0.22) return 'problem';
  if (v < 0.035 || v > 0.16) return 'watch';
  return 'ok';
}

function axisRunLevel(world: WorldBrain, horizontal: number, vertical: number): DiagnosticLevel {
  const worst = Math.max(horizontal / Math.max(1, world.gridWidth), vertical / Math.max(1, world.gridHeight));
  if (worst > 0.34) return 'problem';
  if (worst > 0.22) return 'watch';
  return 'ok';
}

function reliefLevel(v: number): DiagnosticLevel {
  if (v < 0.070) return 'problem';
  if (v < 0.120) return 'watch';
  return 'ok';
}

function seamLevel(v: number | null): DiagnosticLevel {
  if (v == null) return 'watch';
  if (v > 2.0) return 'problem';
  if (v > 1.35) return 'watch';
  return 'ok';
}

function boundaryLevel(v: number): DiagnosticLevel {
  if (v > 0.22) return 'problem';
  if (v > 0.15) return 'watch';
  return 'ok';
}

function mismatchLevel(v: number): DiagnosticLevel {
  if (v > 0.45) return 'problem';
  if (v > 0.30) return 'watch';
  return 'ok';
}

function snowLevel(v: number): DiagnosticLevel {
  if (v > 0.45) return 'problem';
  if (v > 0.28) return 'watch';
  return 'ok';
}

function oceanDepthLevel(v: number): DiagnosticLevel {
  if (v > 0.78) return 'problem';
  if (v > 0.62) return 'watch';
  return 'ok';
}
