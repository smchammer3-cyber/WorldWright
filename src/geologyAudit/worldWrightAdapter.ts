import {
  BoundaryType as WorldBoundaryType,
  ContinentMarginType,
  PlateType,
  type Cell,
  type WorldBrain,
} from '../core/worldSchema';
import {
  classifyGeologicFeatureAuthority,
  type GeologicFeatureAuthority,
  type GeologicFeatureAuthorityId,
} from '../core/worldGeologicFeatureAuthority';
import {
  GEOLOGY_AUDIT_SCHEMA_VERSION,
  type BoundaryType,
  type ClimateBand,
  type CrustType,
  type GeologicalRegionKind,
  type GeologicalRegionManifest,
  type GridBounds,
  type PlanetParameters,
  type WorldAuditAsset,
  type WorldAuditManifest,
} from './contracts';
import { GeologyAuditValidationError, validateWorldAuditManifest } from './validation';

export type WorldAuditExportOptions = {
  generatorCommit: string;
  generatedAt?: string;
  assets?: WorldAuditAsset[];
  includeCellIndexRuns?: boolean;
  minFeatureStrength?: number;
  minFeatureRegionCells?: number;
  maxFeatureRegions?: number;
};

export type JarvisReviewPackAssetOptions = {
  baseUri: string;
  width: number;
  height: number;
};

type RegionSource = {
  id: string;
  kind: GeologicalRegionKind;
  indices: number[];
  primaryFeature?: GeologicFeatureAuthorityId;
  extraFeatureTypes?: string[];
};

const STANDARD_REVIEW_PACK_ASSETS: ReadonlyArray<{
  assetId: string;
  role: WorldAuditAsset['role'];
  relativePath: string;
}> = [
  { assetId: 'final-flat-map', role: 'final-render', relativePath: 'FINAL/flat-map.png' },
  { assetId: 'elevation-flat-map', role: 'elevation', relativePath: 'HEIGHT/flat-map.png' },
  { assetId: 'land-water-flat-map', role: 'other', relativePath: 'LAND_WATER/flat-map.png' },
  { assetId: 'bathymetry-flat-map', role: 'bathymetry', relativePath: 'OCEAN_DEPTH/flat-map.png' },
  { assetId: 'plates-flat-map', role: 'plate-boundaries', relativePath: 'PLATES/flat-map.png' },
  { assetId: 'continents-flat-map', role: 'other', relativePath: 'CONTINENTS/flat-map.png' },
  { assetId: 'crust-flat-map', role: 'crust-type', relativePath: 'CRUST/flat-map.png' },
  { assetId: 'crust-province-flat-map', role: 'other', relativePath: 'CRUST_PROVINCE/flat-map.png' },
  { assetId: 'drainage-flat-map', role: 'drainage', relativePath: 'RIVERS/flat-map.png' },
];

export function describeJarvisReviewPackAuditAssets(options: JarvisReviewPackAssetOptions): WorldAuditAsset[] {
  const baseUri = options.baseUri.replace(/\/+$/, '');
  if (!baseUri) throw new Error('Jarvis review pack asset base URI must not be empty.');
  return STANDARD_REVIEW_PACK_ASSETS.map((spec) => ({
    assetId: spec.assetId,
    role: spec.role,
    uri: `${baseUri}/${spec.relativePath}`,
    mediaType: 'image/png',
    width: options.width,
    height: options.height,
  }));
}

export function exportWorldAuditManifest(world: WorldBrain, options: WorldAuditExportOptions): WorldAuditManifest {
  if (!options.generatorCommit.trim()) throw new Error('generatorCommit is required for audit provenance.');
  const assets = structuredClone(options.assets ?? []);
  const authorities = world.cells.map((cell) => classifyGeologicFeatureAuthority(cell));
  const sources = collectRegionSources(world, authorities, options);
  const assetIds = assets.map((asset) => asset.assetId);
  const includeCellIndexRuns = options.includeCellIndexRuns ?? true;

  const manifest: WorldAuditManifest = {
    schemaVersion: GEOLOGY_AUDIT_SCHEMA_VERSION,
    worldId: world.metadata.id,
    seed: String(world.metadata.seed),
    generatorCommit: options.generatorCommit,
    generatedAt: options.generatedAt ?? new Date().toISOString(),
    gridWidth: world.gridWidth,
    gridHeight: world.gridHeight,
    parameters: extractPlanetParameters(world),
    regions: sources.map((source) => buildRegionManifest(world, authorities, source, assetIds, includeCellIndexRuns)),
    assets,
  };

  const issues = validateWorldAuditManifest(manifest);
  if (issues.length) throw new GeologyAuditValidationError('WorldWright audit export produced an invalid manifest', issues);
  return manifest;
}

function collectRegionSources(
  world: WorldBrain,
  authorities: GeologicFeatureAuthority[],
  options: WorldAuditExportOptions,
): RegionSource[] {
  const sources: RegionSource[] = [];

  const continentIds = uniqueNumeric(world.cells.map((cell) => cell.continentId));
  for (const continentId of continentIds) {
    const indices = world.cells
      .filter((cell) => cell.continentId === continentId && cell.continentality >= 0.24)
      .map((cell) => cell.index);
    if (indices.length) sources.push({
      id: `continent-${continentId}`,
      kind: 'continent',
      indices,
      extraFeatureTypes: ['continent'],
    });
  }

  const basinIds = uniqueNumeric(world.cells.map((cell) => cell.oceanBasinId));
  for (const basinId of basinIds) {
    const indices = world.cells
      .filter((cell) => cell.oceanBasinId === basinId && cell.isWater)
      .map((cell) => cell.index);
    if (indices.length) sources.push({
      id: `ocean-basin-${basinId}`,
      kind: 'ocean-basin',
      indices,
      extraFeatureTypes: ['ocean-basin'],
    });
  }

  const featureStrength = clamp01(options.minFeatureStrength ?? 0.45);
  const minCells = Math.max(2, options.minFeatureRegionCells ?? Math.max(3, Math.floor(world.cells.length * 0.0002)));
  const maxRegions = Math.max(1, options.maxFeatureRegions ?? 64);
  const components = connectedFeatureComponents(world, authorities, featureStrength)
    .filter((component) => component.indices.length >= minCells)
    .sort((a, b) => b.indices.length - a.indices.length || a.primary.localeCompare(b.primary))
    .slice(0, maxRegions);

  const sequence = new Map<GeologicFeatureAuthorityId, number>();
  for (const component of components) {
    const next = (sequence.get(component.primary) ?? 0) + 1;
    sequence.set(component.primary, next);
    sources.push({
      id: `feature-${featureSlug(component.primary)}-${String(next).padStart(3, '0')}`,
      kind: 'feature',
      indices: component.indices,
      primaryFeature: component.primary,
    });
  }

  return sources;
}

function connectedFeatureComponents(
  world: WorldBrain,
  authorities: GeologicFeatureAuthority[],
  minStrength: number,
): Array<{ primary: GeologicFeatureAuthorityId; indices: number[] }> {
  const visited = new Uint8Array(world.cells.length);
  const components: Array<{ primary: GeologicFeatureAuthorityId; indices: number[] }> = [];

  for (let start = 0; start < world.cells.length; start++) {
    if (visited[start]) continue;
    const authority = authorities[start];
    if (authority.primary === 'NONE' || authority.strength < minStrength) continue;

    const primary = authority.primary;
    const queue = [start];
    const indices: number[] = [];
    visited[start] = 1;

    for (let cursor = 0; cursor < queue.length; cursor++) {
      const index = queue[cursor];
      indices.push(index);
      for (const neighbor of neighborIndices4(world, index)) {
        if (visited[neighbor]) continue;
        const next = authorities[neighbor];
        if (next.primary !== primary || next.strength < minStrength) continue;
        visited[neighbor] = 1;
        queue.push(neighbor);
      }
    }
    components.push({ primary, indices });
  }
  return components;
}

function buildRegionManifest(
  world: WorldBrain,
  authorities: GeologicFeatureAuthority[],
  source: RegionSource,
  assetIds: string[],
  includeCellIndexRuns: boolean,
): GeologicalRegionManifest {
  const indices = [...new Set(source.indices)].sort((a, b) => a - b);
  const crustPair = inferCrustPair(world, indices);
  const boundaryType = dominantBoundaryType(world, indices);
  const featureTypes = aggregateFeatureTypes(world, authorities, indices, source, crustPair, boundaryType);

  return {
    regionId: source.id,
    regionKind: source.kind,
    primaryFeature: source.primaryFeature ? featureSlug(source.primaryFeature) : undefined,
    crustA: crustPair[0],
    crustB: crustPair[1],
    boundaryType,
    featureTypes,
    climate: classifyClimate(world, indices),
    parameters: extractRegionParameters(world, indices),
    assetIds: [...assetIds],
    cellCount: indices.length,
    cellIndexRuns: includeCellIndexRuns ? encodeCellIndexRuns(indices) : undefined,
    gridBounds: computeGridBounds(world, indices),
  };
}

function aggregateFeatureTypes(
  world: WorldBrain,
  authorities: GeologicFeatureAuthority[],
  indices: number[],
  source: RegionSource,
  crustPair: readonly [CrustType, CrustType | undefined],
  boundaryType: BoundaryType,
): string[] {
  const features = new Set(source.extraFeatureTypes ?? []);
  if (source.primaryFeature) features.add(featureSlug(source.primaryFeature));

  const maximums = new Map<GeologicFeatureAuthorityId, number>();
  let passiveMargins = 0;
  for (const index of indices) {
    const authority = authorities[index];
    for (const [id, strength] of Object.entries(authority.features) as Array<[GeologicFeatureAuthorityId, number]>) {
      maximums.set(id, Math.max(maximums.get(id) ?? 0, strength));
    }
    if (world.cells[index].marginType === ContinentMarginType.PASSIVE) passiveMargins++;
  }
  for (const [id, strength] of maximums) if (strength >= 0.45) features.add(featureSlug(id));

  if (features.has('continent-shelf')) {
    features.delete('continent-shelf');
    features.add('continental-shelf');
  }
  if (features.has('continent-margin')) {
    features.delete('continent-margin');
    features.add('continental-margin');
  }
  if (passiveMargins / Math.max(1, indices.length) >= 0.25) features.add('passive-margin');

  const isContinentalCollision = boundaryType === 'convergent' && crustPair[0] === 'continental' && crustPair[1] === 'continental';
  if (features.has('collision-zone') && isContinentalCollision) {
    features.add('continental-collision');
    const age = mean(indices.map((index) => clamp01(world.cells[index].surfaceAge)));
    features.add(age <= 0.58 ? 'young-orogen' : 'old-orogen');
  }

  return [...features].sort();
}

function inferCrustPair(world: WorldBrain, indices: number[]): readonly [CrustType, CrustType | undefined] {
  const plateCounts = new Map<number, number>();
  const plateTypes = new Map<number, CrustType>();
  for (const index of indices) {
    const cell = world.cells[index];
    plateCounts.set(cell.plateId, (plateCounts.get(cell.plateId) ?? 0) + 1);
    plateTypes.set(cell.plateId, mapCrustType(cell.plateType));
  }
  const rankedPlates = [...plateCounts.entries()].sort((a, b) => b[1] - a[1]);
  const crustA = plateTypes.get(rankedPlates[0]?.[0] ?? -1) ?? dominantCrustType(world, indices);
  if (rankedPlates.length > 1) return [crustA, plateTypes.get(rankedPlates[1][0]) ?? 'unknown'];

  const outsideTypes: CrustType[] = [];
  const member = new Set(indices);
  for (const index of indices) {
    const plateId = world.cells[index].plateId;
    for (const neighbor of neighborIndices4(world, index)) {
      if (member.has(neighbor) || world.cells[neighbor].plateId === plateId) continue;
      outsideTypes.push(mapCrustType(world.cells[neighbor].plateType));
    }
  }
  return [crustA, outsideTypes.length ? mode(outsideTypes) : undefined];
}

function dominantCrustType(world: WorldBrain, indices: number[]): CrustType {
  return mode(indices.map((index) => mapCrustType(world.cells[index].plateType)));
}

function dominantBoundaryType(world: WorldBrain, indices: number[]): BoundaryType {
  const mapped = indices.map((index) => mapBoundaryType(world.cells[index].boundaryType));
  const active = mapped.filter((value) => value !== 'none');
  return mode(active.length ? active : mapped);
}

function classifyClimate(world: WorldBrain, indices: number[]): ClimateBand {
  const bands = indices.map((index): ClimateBand => {
    const cell = world.cells[index];
    if (cell.temperature < 0.22) return 'polar';
    if (cell.rainfall < 0.28) return 'arid';
    if (cell.rainfall > 0.62) return 'humid';
    return 'temperate';
  });
  const dominant = mode(bands);
  const share = bands.filter((band) => band === dominant).length / Math.max(1, bands.length);
  return share >= 0.60 ? dominant : 'mixed';
}

function extractPlanetParameters(world: WorldBrain): PlanetParameters {
  const foundation = world.planetFoundation;
  const raw = world.parameters ?? {};
  return compactParameters({
    gravityEarthG: finite(foundation?.surfaceGravityEarth),
    tectonicActivity: finite(foundation?.tectonicVigor) ?? percent(raw.plateActivity),
    erosionStrength: percent(raw.erosionIntensity) ?? finite(foundation?.erosionSedimentScale),
    surfaceAgeNormalized: percent(raw.planetAge) ?? finite(foundation?.thermalAge) ?? meanFinite(world.cells.map((cell) => cell.surfaceAge)),
    seaLevelNormalized: percent(raw.seaLevelOffset ?? raw.seaLevel) ?? finite(foundation?.seaLevelOffset),
    precipitationNormalized: percent(raw.moistureLevel) ?? meanFinite(world.cells.map((cell) => cell.rainfall)),
    heatFlowNormalized: finite(foundation?.heatFlowIndex),
    crustThicknessNormalized: meanFinite(world.cells.map((cell) => cell.crustThickness)),
  });
}

function extractRegionParameters(world: WorldBrain, indices: number[]): PlanetParameters {
  return compactParameters({
    surfaceAgeNormalized: meanFinite(indices.map((index) => world.cells[index].surfaceAge)),
    precipitationNormalized: meanFinite(indices.map((index) => world.cells[index].rainfall)),
    crustThicknessNormalized: meanFinite(indices.map((index) => world.cells[index].crustThickness)),
  });
}

function compactParameters(parameters: Record<string, number | undefined>): PlanetParameters {
  return Object.fromEntries(Object.entries(parameters).filter((entry): entry is [string, number] => Number.isFinite(entry[1]))) as PlanetParameters;
}

function encodeCellIndexRuns(indices: number[]): Array<[number, number]> {
  if (!indices.length) return [];
  const runs: Array<[number, number]> = [];
  let start = indices[0];
  let previous = indices[0];
  for (let i = 1; i < indices.length; i++) {
    const value = indices[i];
    if (value === previous + 1) {
      previous = value;
      continue;
    }
    runs.push([start, previous - start + 1]);
    start = value;
    previous = value;
  }
  runs.push([start, previous - start + 1]);
  return runs;
}

function computeGridBounds(world: WorldBrain, indices: number[]): GridBounds {
  let minRow = world.gridHeight - 1;
  let maxRow = 0;
  let minCol = world.gridWidth - 1;
  let maxCol = 0;
  for (const index of indices) {
    const row = Math.floor(index / world.gridWidth);
    const col = index % world.gridWidth;
    minRow = Math.min(minRow, row);
    maxRow = Math.max(maxRow, row);
    minCol = Math.min(minCol, col);
    maxCol = Math.max(maxCol, col);
  }
  const edgeBand = Math.max(1, Math.floor(world.gridWidth * 0.03));
  const wrapsLongitude = indices.some((index) => index % world.gridWidth < edgeBand)
    && indices.some((index) => index % world.gridWidth >= world.gridWidth - edgeBand);
  return { minRow, maxRow, minCol, maxCol, wrapsLongitude };
}

function neighborIndices4(world: WorldBrain, index: number): number[] {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  const result = [row * world.gridWidth + ((col - 1 + world.gridWidth) % world.gridWidth), row * world.gridWidth + ((col + 1) % world.gridWidth)];
  if (row > 0) result.push((row - 1) * world.gridWidth + col);
  if (row + 1 < world.gridHeight) result.push((row + 1) * world.gridWidth + col);
  return result;
}

function featureSlug(feature: GeologicFeatureAuthorityId): string {
  return feature.toLowerCase().replace(/_/g, '-');
}

function mapCrustType(type: PlateType): CrustType {
  if (type === PlateType.CONTINENTAL) return 'continental';
  if (type === PlateType.OCEANIC) return 'oceanic';
  return 'unknown';
}

function mapBoundaryType(type: WorldBoundaryType): BoundaryType {
  if (type === WorldBoundaryType.CONVERGENT) return 'convergent';
  if (type === WorldBoundaryType.DIVERGENT) return 'divergent';
  if (type === WorldBoundaryType.TRANSFORM) return 'transform';
  if (type === WorldBoundaryType.NONE) return 'none';
  return 'unknown';
}

function uniqueNumeric(values: Array<number | null>): number[] {
  return [...new Set(values.filter((value): value is number => typeof value === 'number' && Number.isFinite(value)))].sort((a, b) => a - b);
}

function mode<T extends string>(values: T[]): T {
  if (!values.length) return 'unknown' as T;
  const counts = new Map<T, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])))[0][0];
}

function percent(value: unknown): number | undefined {
  const number = finite(value);
  if (number === undefined) return undefined;
  return clamp01(Math.abs(number) > 1 ? number / 100 : number);
}

function finite(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function meanFinite(values: number[]): number | undefined {
  const valid = values.filter(Number.isFinite);
  return valid.length ? mean(valid) : undefined;
}

function mean(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
