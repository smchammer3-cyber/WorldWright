import {
  BoundaryType,
  ContinentMarginType,
  CrustProvince,
  IslandCause,
  OceanDepthClass,
  PlateType,
  type Cell,
  type WorldBrain,
} from './worldSchema';

export type ExportHeightDiagnostics = {
  invalidHeightCount: number;
  minHeight: number;
  maxHeight: number;
  heightRange: number;
  seaLevelPosition: number | null;
  maxNeighborJump: number;
  p95NeighborJump: number;
  singleCellSpikeShare: number;
  uncausedExtremeHighShare: number;
  uncausedExtremeLowShare: number;
  underwaterPlateSeamRatio: number | null;
  underwaterProvinceSeamRatio: number | null;
  unexplainedUnderwaterPlateEdgeShare: number;
  wrapSeamMaxJump: number;
  wrapSeamMeanJump: number;
  poleSpikeRatio: number | null;
  exportRiskScore: number;
};

/**
 * Cause-aware export height diagnostics.
 *
 * These checks do not try to flatten dramatic terrain. Mountains, trenches,
 * ridges, cliffs, volcanoes, and valleys are allowed when the cell has a
 * geological cause. The diagnostic is looking for export-hostile problems:
 * corrupt height values, isolated spikes, hard wrap seams, pole pinching, and
 * underwater plate/province ghosts that would become obvious in a heightmap.
 */
export function computeExportHeightDiagnostics(world: WorldBrain): ExportHeightDiagnostics {
  const totalCells = Math.max(1, world.cells.length);
  const seaLevel = typeof world.seaLevel === 'number' ? world.seaLevel : world.metadata?.seaLevel ?? 0;
  const heights = world.cells.map((cell) => totalHeight(cell));
  const finiteHeights = heights.filter((height) => Number.isFinite(height));
  const invalidHeightCount = world.cells.length - finiteHeights.length;
  const minHeight = finiteHeights.length ? Math.min(...finiteHeights) : 0;
  const maxHeight = finiteHeights.length ? Math.max(...finiteHeights) : 0;
  const heightRange = maxHeight - minHeight;
  const seaLevelPosition = heightRange > 1e-9 ? clamp01((seaLevel - minHeight) / heightRange) : null;
  const globalStd = stdDev(finiteHeights);
  const globalMean = mean(finiteHeights);

  const neighborJumps: number[] = [];
  let maxNeighborJump = 0;
  let underwaterPlateBoundaryDelta = 0;
  let underwaterPlateBoundaryEdges = 0;
  let underwaterSamePlateDelta = 0;
  let underwaterSamePlateEdges = 0;
  let underwaterProvinceBoundaryDelta = 0;
  let underwaterProvinceBoundaryEdges = 0;
  let underwaterSameProvinceDelta = 0;
  let underwaterSameProvinceEdges = 0;
  let unexplainedUnderwaterPlateEdges = 0;
  let underwaterPlateEdges = 0;

  forEachEastSouthEdge(world, (a, b) => {
    const delta = Math.abs(heights[a] - heights[b]);
    if (!Number.isFinite(delta)) return;
    neighborJumps.push(delta);
    maxNeighborJump = Math.max(maxNeighborJump, delta);

    const ca = world.cells[a];
    const cb = world.cells[b];
    const bothWater = ca.isWater && cb.isWater;
    if (!bothWater) return;

    if (ca.plateId !== cb.plateId) {
      underwaterPlateBoundaryDelta += delta;
      underwaterPlateBoundaryEdges++;
      underwaterPlateEdges++;
      if (delta > 0.035 && !edgeHasExplicitOceanTectonicCause(ca, cb)) unexplainedUnderwaterPlateEdges++;
    } else {
      underwaterSamePlateDelta += delta;
      underwaterSamePlateEdges++;
    }

    if (ca.crustProvince !== cb.crustProvince) {
      underwaterProvinceBoundaryDelta += delta;
      underwaterProvinceBoundaryEdges++;
    } else {
      underwaterSameProvinceDelta += delta;
      underwaterSameProvinceEdges++;
    }
  });

  const p95NeighborJump = percentile(neighborJumps, 0.95);
  const samePlateMean = underwaterSamePlateEdges > 0 ? underwaterSamePlateDelta / underwaterSamePlateEdges : 0;
  const underwaterPlateSeamRatio = underwaterPlateBoundaryEdges > 0 && samePlateMean > 1e-9
    ? (underwaterPlateBoundaryDelta / underwaterPlateBoundaryEdges) / samePlateMean
    : null;
  const sameProvinceMean = underwaterSameProvinceEdges > 0 ? underwaterSameProvinceDelta / underwaterSameProvinceEdges : 0;
  const underwaterProvinceSeamRatio = underwaterProvinceBoundaryEdges > 0 && sameProvinceMean > 1e-9
    ? (underwaterProvinceBoundaryDelta / underwaterProvinceBoundaryEdges) / sameProvinceMean
    : null;
  const unexplainedUnderwaterPlateEdgeShare = underwaterPlateEdges > 0 ? unexplainedUnderwaterPlateEdges / underwaterPlateEdges : 0;

  let singleCellSpikes = 0;
  let uncausedExtremeHigh = 0;
  let uncausedExtremeLow = 0;
  const highCutoff = Math.max(seaLevel + 0.22, globalMean + globalStd * 2.75);
  const lowCutoff = Math.min(seaLevel - 0.36, globalMean - globalStd * 2.75);

  for (let i = 0; i < world.cells.length; i++) {
    const h = heights[i];
    if (!Number.isFinite(h)) continue;
    const cell = world.cells[i];
    const neighborIndices = neighborIndices4(world, i);
    const neighborHeights = neighborIndices.map((idx) => heights[idx]).filter((value) => Number.isFinite(value));
    if (neighborHeights.length) {
      const localMean = mean(neighborHeights);
      const localMeanJump = mean(neighborHeights.map((value) => Math.abs(h - value)));
      const spikeThreshold = Math.max(0.080, localMeanJump * 2.8, globalStd * 2.1);
      if (Math.abs(h - localMean) > spikeThreshold && !cellHasStrongHeightCause(cell)) singleCellSpikes++;
    }

    if (h > highCutoff && !cellHasStrongHeightCause(cell)) uncausedExtremeHigh++;
    if (h < lowCutoff && !cellHasDeepOceanCause(cell)) uncausedExtremeLow++;
  }

  const wrapJumps: number[] = [];
  for (let row = 0; row < world.gridHeight; row++) {
    const west = row * world.gridWidth;
    const east = row * world.gridWidth + (world.gridWidth - 1);
    const jump = Math.abs(heights[west] - heights[east]);
    if (Number.isFinite(jump)) wrapJumps.push(jump);
  }

  const polarBandRows = Math.max(1, Math.round(world.gridHeight * 0.06));
  const polarHeights: number[] = [];
  for (let row = 0; row < world.gridHeight; row++) {
    if (row >= polarBandRows && row < world.gridHeight - polarBandRows) continue;
    for (let col = 0; col < world.gridWidth; col++) {
      const height = heights[row * world.gridWidth + col];
      if (Number.isFinite(height)) polarHeights.push(height);
    }
  }
  const poleStd = stdDev(polarHeights);
  const poleSpikeRatio = globalStd > 1e-9 ? poleStd / globalStd : null;

  const singleCellSpikeShare = singleCellSpikes / totalCells;
  const uncausedExtremeHighShare = uncausedExtremeHigh / totalCells;
  const uncausedExtremeLowShare = uncausedExtremeLow / totalCells;
  const wrapSeamMaxJump = wrapJumps.length ? Math.max(...wrapJumps) : 0;
  const wrapSeamMeanJump = mean(wrapJumps);

  const exportRiskScore = computeExportRiskScore({
    invalidHeightCount,
    maxNeighborJump,
    p95NeighborJump,
    singleCellSpikeShare,
    uncausedExtremeHighShare,
    uncausedExtremeLowShare,
    underwaterPlateSeamRatio,
    underwaterProvinceSeamRatio,
    unexplainedUnderwaterPlateEdgeShare,
    wrapSeamMaxJump,
    poleSpikeRatio,
  });

  return {
    invalidHeightCount,
    minHeight,
    maxHeight,
    heightRange,
    seaLevelPosition,
    maxNeighborJump,
    p95NeighborJump,
    singleCellSpikeShare,
    uncausedExtremeHighShare,
    uncausedExtremeLowShare,
    underwaterPlateSeamRatio,
    underwaterProvinceSeamRatio,
    unexplainedUnderwaterPlateEdgeShare,
    wrapSeamMaxJump,
    wrapSeamMeanJump,
    poleSpikeRatio,
    exportRiskScore,
  };
}

function computeExportRiskScore(input: {
  invalidHeightCount: number;
  maxNeighborJump: number;
  p95NeighborJump: number;
  singleCellSpikeShare: number;
  uncausedExtremeHighShare: number;
  uncausedExtremeLowShare: number;
  underwaterPlateSeamRatio: number | null;
  underwaterProvinceSeamRatio: number | null;
  unexplainedUnderwaterPlateEdgeShare: number;
  wrapSeamMaxJump: number;
  poleSpikeRatio: number | null;
}): number {
  if (input.invalidHeightCount > 0) return 100;

  const parts = [
    scaledRisk(input.maxNeighborJump, 0.16, 0.30),
    scaledRisk(input.p95NeighborJump, 0.055, 0.120),
    scaledRisk(input.singleCellSpikeShare, 0.002, 0.018),
    scaledRisk(input.uncausedExtremeHighShare + input.uncausedExtremeLowShare, 0.004, 0.026),
    scaledRisk(input.underwaterPlateSeamRatio ?? 1, 1.35, 2.15),
    scaledRisk(input.underwaterProvinceSeamRatio ?? 1, 1.35, 2.15),
    scaledRisk(input.unexplainedUnderwaterPlateEdgeShare, 0.02, 0.09),
    scaledRisk(input.wrapSeamMaxJump, 0.060, 0.160),
    scaledRisk(input.poleSpikeRatio ?? 1, 1.8, 3.0),
  ];

  return Math.round(Math.max(...parts) * 100);
}

function scaledRisk(value: number, okAt: number, problemAt: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value <= okAt) return 0;
  if (value >= problemAt) return 1;
  return (value - okAt) / Math.max(1e-9, problemAt - okAt);
}

function totalHeight(cell: Cell): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
}

function forEachEastSouthEdge(world: WorldBrain, visit: (a: number, b: number) => void): void {
  for (let row = 0; row < world.gridHeight; row++) {
    for (let col = 0; col < world.gridWidth; col++) {
      const idx = row * world.gridWidth + col;
      visit(idx, row * world.gridWidth + ((col + 1) % world.gridWidth));
      if (row < world.gridHeight - 1) visit(idx, (row + 1) * world.gridWidth + col);
    }
  }
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

function cellHasStrongHeightCause(cell: Cell): boolean {
  return (
    cell.boundaryType === BoundaryType.CONVERGENT ||
    cell.boundaryType === BoundaryType.DIVERGENT ||
    cell.marginType === ContinentMarginType.COLLISION ||
    cell.marginType === ContinentMarginType.ACTIVE ||
    cell.marginType === ContinentMarginType.RIFT ||
    cell.islandCause === IslandCause.ISLAND_ARC ||
    cell.islandCause === IslandCause.VOLCANIC_HOTSPOT ||
    cell.crustProvince === CrustProvince.MOBILE_BELT ||
    cell.crustProvince === CrustProvince.RIFT_MARGIN ||
    cell.crustProvince === CrustProvince.VOLCANIC_PROVINCE ||
    cell.crustProvince === CrustProvince.ISLAND_ARC ||
    cell.volcanicActivity > 0.45 ||
    cell.upliftRate > 0.25 ||
    cell.continentCoreStrength > 0.72
  );
}

function cellHasDeepOceanCause(cell: Cell): boolean {
  return (
    cell.plateType === PlateType.OCEANIC ||
    cell.oceanDepthClass === OceanDepthClass.TRENCH ||
    cell.oceanDepthClass === OceanDepthClass.ABYSSAL ||
    cell.oceanDepthClass === OceanDepthClass.RIDGE ||
    cell.boundaryType === BoundaryType.CONVERGENT ||
    cell.boundaryType === BoundaryType.DIVERGENT ||
    cell.crustProvince === CrustProvince.OCEANIC_BASIN ||
    cell.crustProvince === CrustProvince.ISLAND_ARC
  );
}

function edgeHasExplicitOceanTectonicCause(a: Cell, b: Cell): boolean {
  return (
    a.oceanDepthClass === OceanDepthClass.TRENCH ||
    b.oceanDepthClass === OceanDepthClass.TRENCH ||
    a.oceanDepthClass === OceanDepthClass.RIDGE ||
    b.oceanDepthClass === OceanDepthClass.RIDGE ||
    a.boundaryType === BoundaryType.CONVERGENT ||
    b.boundaryType === BoundaryType.CONVERGENT ||
    a.boundaryType === BoundaryType.DIVERGENT ||
    b.boundaryType === BoundaryType.DIVERGENT ||
    a.crustProvince === CrustProvince.ISLAND_ARC ||
    b.crustProvince === CrustProvince.ISLAND_ARC ||
    a.volcanicActivity > 0.55 ||
    b.volcanicActivity > 0.55
  );
}

function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.floor((sorted.length - 1) * p)));
  return sorted[index];
}

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function stdDev(values: number[]): number {
  if (values.length < 2) return 0;
  const m = mean(values);
  return Math.sqrt(values.reduce((sum, value) => sum + (value - m) ** 2, 0) / values.length);
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
