import { getWorldStyleRules, levelFromRange, rangeText } from './worldStyleRules';
import { BoundaryType, OceanDepthClass, PlateType, type WorldBrain } from './worldSchema';
import { computeExportHeightDiagnostics, type ExportHeightDiagnostics } from './worldExportHeightDiagnostics';
import {
  computeFinalColorAuthorityDiagnostics,
  type FinalColorAuthorityDiagnostics,
} from './worldFinalColorAuthorityDiagnostics';

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
    meanContinentalCrustThickness: number;
    meanOceanicCrustThickness: number;
    crustThicknessSpread: number;
    crustAgeSpread: number;
    oldStableContinentalShare: number;
    oceanDepthDominantShare: number;
    oceanDepthDistribution: Record<string, number>;
    exportHeight: ExportHeightDiagnostics;
    finalColor: FinalColorAuthorityDiagnostics;
  };
};

export function computeWorldDiagnostics(world: WorldBrain): WorldDiagnostics {
  const rules = getWorldStyleRules(world.metadata?.styleMode ?? world.parameters?.styleMode);
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
  let oldStableContinentalCells = 0;
  const allHeights: number[] = [];
  const landHeights: number[] = [];
  const oceanHeights: number[] = [];
  const continentalCrustThickness: number[] = [];
  const oceanicCrustThickness: number[] = [];
  const crustThicknessValues: number[] = [];
  const crustAgeValues: number[] = [];

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = totalHeight(world, i);
    allHeights.push(h);

    if (cell.boundaryType !== BoundaryType.NONE) boundaryCells++;

    const crustThickness = clamp01(typeof cell.crustThickness === 'number' ? cell.crustThickness : 0.5);
    const crustAge = clamp01(typeof cell.crustAge === 'number' ? cell.crustAge : 0.5);
    crustThicknessValues.push(crustThickness);
    crustAgeValues.push(crustAge);
    if (cell.plateType === PlateType.CONTINENTAL) {
      continentalCrustThickness.push(crustThickness);
      if (crustAge > 0.62 && crustThickness > 0.62 && cell.boundaryType === BoundaryType.NONE) oldStableContinentalCells++;
    } else {
      oceanicCrustThickness.push(crustThickness);
    }

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
  const meanContinentalCrustThickness = mean(continentalCrustThickness);
  const meanOceanicCrustThickness = mean(oceanicCrustThickness);
  const exportHeight = computeExportHeightDiagnostics(world);
  const finalColor = computeFinalColorAuthorityDiagnostics(world);

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
    meanContinentalCrustThickness,
    meanOceanicCrustThickness,
    crustThicknessSpread: stdDev(crustThicknessValues),
    crustAgeSpread: stdDev(crustAgeValues),
    oldStableContinentalShare: oldStableContinentalCells / Math.max(1, continentalCrustThickness.length),
    oceanDepthDominantShare: dominantOceanDepthCount / oceanTotal,
    oceanDepthDistribution: normalizeCounts(oceanDepthCounts, oceanTotal),
    exportHeight,
    finalColor,
  };

  const worstCoastRunFraction = Math.max(
    raw.maxHorizontalCoastRun / Math.max(1, world.gridWidth),
    raw.maxVerticalCoastRun / Math.max(1, world.gridHeight),
  );
  const crustContrast = raw.meanContinentalCrustThickness - raw.meanOceanicCrustThickness;

  const metrics: DiagnosticMetric[] = [
    metric('land', 'Land coverage', percent(raw.landFraction), levelFromRange(raw.landFraction, rules.diagnostics.landFraction), `${rules.label} target range is about ${rangeText(rules.diagnostics.landFraction)}. Too high/low means sea level or style settings may be hiding terrain problems.`),
    metric('largestLandmass', 'Largest landmass', percent(raw.largestLandmassShare), levelFromRange(raw.largestLandmassShare, rules.diagnostics.largestLandmassShare), `Share of all land in the biggest connected landmass. ${rules.label} allows ${rangeText(rules.diagnostics.largestLandmassShare)} before slab/supercontinent risk increases.`),
    metric('landComponents', 'Landmasses', String(raw.landComponents), levelFromRange(raw.landComponents, rules.diagnostics.landComponents), `Connected 4-neighbor land bodies. ${rules.label} expects roughly ${rangeText(rules.diagnostics.landComponents)} before blob/confetti risk.`),
    metric('tinyIslands', 'Tiny island share', percent(raw.tinyIslandShare), levelFromRange(raw.tinyIslandShare, rules.diagnostics.tinyIslandShare), 'Land trapped in tiny components under 12 cells.'),
    metric('coastDensity', 'Coast density', percent(raw.coastlineEdgeDensity), levelFromRange(raw.coastlineEdgeDensity, rules.diagnostics.coastlineEdgeDensity), `Amount of land/water edge. ${rules.label} target is ${rangeText(rules.diagnostics.coastlineEdgeDensity)}; too low means smooth blobs, too high means noisy/static coast.`),
    metric('axisRuns', 'Long straight coast', `${raw.maxHorizontalCoastRun}/${raw.maxVerticalCoastRun}`, levelFromRange(worstCoastRunFraction, rules.diagnostics.longCoastWorstFraction), `Longest horizontal/vertical coast-cell run. ${rules.label} tolerates a normalized run around ${rangeText(rules.diagnostics.longCoastWorstFraction)} before grid/block artifacts are suspected.`),
    metric('heightRelief', 'Height relief', fixed(raw.heightStdDev), levelFromRange(raw.heightStdDev, rules.diagnostics.heightRelief), `Standard deviation of total height. ${rules.label} target is ${rangeText(rules.diagnostics.heightRelief)}; low values mean flat colored regions.`),
    metric('landRelief', 'Land relief', fixed(raw.landHeightStdDev), levelFromRange(raw.landHeightStdDev, rules.diagnostics.landRelief), `Land-only height variation. ${rules.label} target is ${rangeText(rules.diagnostics.landRelief)}; low values mean land lacks mountains, basins, and highlands.`),
    metric('seams', 'Plate seam imprint', raw.seamHeightRatio == null ? 'n/a' : `${fixed(raw.seamHeightRatio)}×`, raw.seamHeightRatio == null ? 'watch' : levelFromRange(raw.seamHeightRatio, rules.diagnostics.seamHeightRatio), `Height jump across plate borders divided by same-plate neighbor jumps. ${rules.label} target is ${rangeText(rules.diagnostics.seamHeightRatio)}.`),
    metric('boundaries', 'Boundary cells', percent(raw.plateBoundaryFraction), levelFromRange(raw.plateBoundaryFraction, rules.diagnostics.plateBoundaryFraction), 'Percent of cells marked as plate boundaries. High values can make the world look tiled.'),
    metric('plateMismatch', 'Plate/terrain mismatch', percent(raw.plateTypeTerrainMismatch), levelFromRange(raw.plateTypeTerrainMismatch, rules.diagnostics.plateMismatchFraction), 'Continental plate under water or oceanic plate above water. Some is okay; too much means plate type is not matching terrain.'),
    metric('crustContrast', 'Crust contrast', fixed(crustContrast), crustContrastLevel(crustContrast), 'Mean continental crust thickness minus mean oceanic crust thickness. Positive contrast shows crust fields are separating causes before terrain uses them.'),
    metric('oldCores', 'Old stable crust', percent(raw.oldStableContinentalShare), oldCoreLevel(raw.oldStableContinentalShare), 'Share of continental cells that are old, thick, and away from active boundaries. Future terrain should use these as shields/highlands/basins.'),
    metric('snow', 'Snowy land', percent(raw.snowLandFraction), levelFromRange(raw.snowLandFraction, rules.diagnostics.snowLandFraction), 'Land cells with snowCover > 0.35. High values explain pale/white wash.'),
    metric('oceanDepth', 'Dominant ocean class', percent(raw.oceanDepthDominantShare), levelFromRange(raw.oceanDepthDominantShare, rules.diagnostics.oceanDepthDominantShare), 'If one ocean-depth class dominates, bathymetry is painted/flat instead of shelf/slope/basin/trench mixed.'),
    metric('heightCorruption', 'Height corruption', String(raw.exportHeight.invalidHeightCount), raw.exportHeight.invalidHeightCount === 0 ? 'ok' : 'problem', 'NaN/Infinity/missing final height values. Any corruption is export-blocking.'),
    metric('exportRisk', 'Export risk', `${Math.round(raw.exportHeight.exportRiskScore)}/100`, exportRiskLevel(raw.exportHeight.exportRiskScore), 'Composite terrain sanity risk for future heightmap export. It is cause-aware and does not penalize justified mountains, trenches, ridges, or volcanic chains.'),
    metric('heightRange', 'Height range', `${fixed(raw.exportHeight.minHeight)}..${fixed(raw.exportHeight.maxHeight)}`, heightRangeLevel(raw.exportHeight.heightRange), 'Final total height range before export normalization. Too tiny means flat world; too huge means likely broken spikes or unsafe Unreal scaling.'),
    metric('neighborJump95', 'Slope p95', fixed(raw.exportHeight.p95NeighborJump), thresholdLevel(raw.exportHeight.p95NeighborJump, 0.055, 0.120), '95th percentile neighbor height jump. Allows mountains and trenches, but watches for widespread staircase/cliff behavior.'),
    metric('maxNeighborJump', 'Max slope jump', fixed(raw.exportHeight.maxNeighborJump), thresholdLevel(raw.exportHeight.maxNeighborJump, 0.16, 0.30), 'Largest adjacent-cell height jump. Extreme caused cliffs/trenches are allowed conceptually, but export-hostile single-edge spikes should stay rare.'),
    metric('singleCellSpikes', 'Uncaused spikes', percent(raw.exportHeight.singleCellSpikeShare), thresholdLevel(raw.exportHeight.singleCellSpikeShare, 0.002, 0.018), 'Cells that strongly disagree with local neighbors without a tectonic, volcanic, shelf, ridge, trench, or continent-core cause.'),
    metric('unexplainedExtremes', 'Uncaused extremes', percent(raw.exportHeight.uncausedExtremeHighShare + raw.exportHeight.uncausedExtremeLowShare), thresholdLevel(raw.exportHeight.uncausedExtremeHighShare + raw.exportHeight.uncausedExtremeLowShare, 0.004, 0.026), 'Very high or very low cells with no obvious cause. High/low is fine when caused; random spikes/pits are not.'),
    metric('underwaterPlateImprint', 'Underwater plate imprint', raw.exportHeight.underwaterPlateSeamRatio == null ? 'n/a' : `${fixed(raw.exportHeight.underwaterPlateSeamRatio)}×`, raw.exportHeight.underwaterPlateSeamRatio == null ? 'watch' : thresholdLevel(raw.exportHeight.underwaterPlateSeamRatio, 1.35, 2.15), 'Ocean-only height jump across plate borders compared to same-plate ocean jumps. Real ridges/trenches are fine; hidden plate polygons are not.'),
    metric('underwaterProvinceImprint', 'Underwater province imprint', raw.exportHeight.underwaterProvinceSeamRatio == null ? 'n/a' : `${fixed(raw.exportHeight.underwaterProvinceSeamRatio)}×`, raw.exportHeight.underwaterProvinceSeamRatio == null ? 'watch' : thresholdLevel(raw.exportHeight.underwaterProvinceSeamRatio, 1.35, 2.15), 'Ocean-only height jump across crust-province borders compared to same-province ocean jumps.'),
    metric('unexplainedOceanPlateEdges', 'Unexplained ocean plate edges', percent(raw.exportHeight.unexplainedUnderwaterPlateEdgeShare), thresholdLevel(raw.exportHeight.unexplainedUnderwaterPlateEdgeShare, 0.02, 0.09), 'Share of underwater plate-border edges with noticeable height jumps but no shared geologic feature authority.'),
    metric('finalColorSurfaceAuthority', 'Final color surface authority', percent(raw.finalColor.surfaceExplainedColorJumpShare), minimumLevel(raw.finalColor.surfaceExplainedColorJumpShare, 0.82, 0.65), 'Share of visible Final-color jumps explained by water, height, biome, snow, temperature, or rainfall changes rather than hidden identity masks.'),
    metric('finalColorHiddenLeak', 'Final color hidden leak', percent(raw.finalColor.hiddenAuthorityColorLeakShare), thresholdLevel(raw.finalColor.hiddenAuthorityColorLeakShare, 0.02, 0.09), 'Visible Final-color jumps on plate/province/skeleton borders that do not have a visible surface explanation.'),
    metric('finalColorPlateImprint', 'Final color plate imprint', ratioText(raw.finalColor.plateColorImprintRatio), ratioLevel(raw.finalColor.plateColorImprintRatio, 1.20, 1.75), 'Final-color jump across plate borders divided by same-plate color jumps. This catches hidden plate masks leaking through color.'),
    metric('finalColorProvinceImprint', 'Final color province imprint', ratioText(raw.finalColor.provinceColorImprintRatio), ratioLevel(raw.finalColor.provinceColorImprintRatio, 1.20, 1.75), 'Final-color jump across crust-province borders divided by same-province color jumps.'),
    metric('finalColorSkeletonImprint', 'Final color skeleton imprint', ratioText(raw.finalColor.skeletonColorImprintRatio), ratioLevel(raw.finalColor.skeletonColorImprintRatio, 1.20, 1.75), 'Final-color jump across continent/ocean-basin/margin/island-cause borders divided by same-skeleton color jumps.'),
    metric('wrapSeam', 'Wrap seam jump', fixed(raw.exportHeight.wrapSeamMaxJump), thresholdLevel(raw.exportHeight.wrapSeamMaxJump, 0.060, 0.160), 'Max height jump across the east/west map wrap. Exported heightmaps expose this seam if it is too high.'),
    metric('poleSpike', 'Pole spike ratio', raw.exportHeight.poleSpikeRatio == null ? 'n/a' : `${fixed(raw.exportHeight.poleSpikeRatio)}×`, raw.exportHeight.poleSpikeRatio == null ? 'watch' : thresholdLevel(raw.exportHeight.poleSpikeRatio, 1.8, 3.0), 'Polar-band height variation divided by global height variation. Watches for pole pinching or cap artifacts before export.'),
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

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function stdDev(values: number[]): number {
  if (values.length < 2) return 0;
  const m = mean(values);
  const variance = values.reduce((sum, value) => sum + (value - m) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

function crustContrastLevel(v: number): DiagnosticLevel {
  if (v < 0.04) return 'problem';
  if (v < 0.08) return 'watch';
  return 'ok';
}

function oldCoreLevel(v: number): DiagnosticLevel {
  if (v < 0.03) return 'problem';
  if (v < 0.08) return 'watch';
  return 'ok';
}

function minimumLevel(value: number, okAt: number, problemBelow: number): DiagnosticLevel {
  if (!Number.isFinite(value)) return 'watch';
  if (value >= okAt) return 'ok';
  if (value >= problemBelow) return 'watch';
  return 'problem';
}

function thresholdLevel(value: number, okAt: number, problemAt: number): DiagnosticLevel {
  if (!Number.isFinite(value)) return 'watch';
  if (value <= okAt) return 'ok';
  if (value <= problemAt) return 'watch';
  return 'problem';
}

function ratioLevel(value: number | null, okAt: number, problemAt: number): DiagnosticLevel {
  if (value == null) return 'watch';
  return thresholdLevel(value, okAt, problemAt);
}

function exportRiskLevel(value: number): DiagnosticLevel {
  if (value <= 30) return 'ok';
  if (value <= 60) return 'watch';
  return 'problem';
}

function heightRangeLevel(value: number): DiagnosticLevel {
  if (!Number.isFinite(value)) return 'problem';
  if (value < 0.05 || value > 3.0) return 'problem';
  if (value < 0.16 || value > 2.2) return 'watch';
  return 'ok';
}

function percent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function ratioText(value: number | null): string {
  return value == null ? 'n/a' : `${fixed(value)}×`;
}

function fixed(value: number): string {
  return value.toFixed(2);
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
