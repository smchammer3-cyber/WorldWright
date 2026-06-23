import {
  BoundaryType,
  ContinentMarginType,
  ContinentShapeType,
  IslandCause,
  PlateType,
  type OceanBasinSkeleton,
  type WorldBrain,
} from '../worldSchema';
import { seedContinentSkeletonFields } from '../worldContinents';

type CellPosition = { lat: number; lon: number };

/**
 * Blueprint-order skeleton seeding.
 *
 * The legacy continent seeder still bootstraps continent/ocean skeleton objects,
 * but this normalizer removes the height/sea-level dependency from the cause
 * fields used by generated terrain. Bones must not depend on the old skin.
 */
export function seedSkeletonCauseFields(world: WorldBrain): void {
  seedContinentSkeletonFields(world);
  normalizeSkeletonCauseFields(world);
}

export function normalizeSkeletonCauseFields(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  const basins = world.oceanBasinSkeletons ?? [];
  const continents = world.continentSkeletons ?? [];

  for (let index = 0; index < world.cells.length; index++) {
    const cell = world.cells[index];
    const pos = cellLatLon(world, index);
    const continentality = clamp01(cell.continentality);
    const core = clamp01(cell.continentCoreStrength);
    const distance = clamp01(cell.distanceToContinentCore);
    const shape = continents.find((continent) => continent.id === cell.continentId)?.shapeType ?? ContinentShapeType.COMPACT_SHIELD;

    cell.continentId = continentality > 0.34 ? cell.continentId : null;
    cell.oceanBasinId = continentality < 0.58 ? bestOceanBasin(pos, basins)?.id ?? null : null;
    cell.shelfStrength = computeGeometryShelfStrength(continentality, distance);
    cell.marginType = classifyGeometryMargin(cell.boundaryType, continentality, distance, shape);
    cell.islandCause = classifyCausePotential(
      cell.plateType,
      cell.boundaryType,
      cell.volcanicActivity,
      continentality,
      distance,
      cell.marginType,
      core,
    );
  }
}

function bestOceanBasin(pos: CellPosition, basins: OceanBasinSkeleton[]): OceanBasinSkeleton | null {
  let best: OceanBasinSkeleton | null = null;
  let bestScore = Infinity;
  for (const basin of basins) {
    const score = angularDistanceDeg(pos.lat, pos.lon, basin.centerLat, basin.centerLon) / Math.max(0.1, basin.strength);
    if (score < bestScore) {
      bestScore = score;
      best = basin;
    }
  }
  return best;
}

function computeGeometryShelfStrength(continentality: number, distanceToCore: number): number {
  const marginBand = smoothstep(0.28, 0.58, continentality) * (1 - smoothstep(0.60, 0.82, continentality));
  const awayFromCore = smoothstep(0.28, 0.72, distanceToCore);
  return clamp01(marginBand * (0.40 + awayFromCore * 0.46));
}

function classifyGeometryMargin(
  boundary: BoundaryType,
  continentality: number,
  distanceNorm: number,
  shape: ContinentShapeType,
): ContinentMarginType {
  if (continentality < 0.24) return ContinentMarginType.NONE;
  const marginBand = continentality >= 0.28 && continentality < 0.62 && distanceNorm > 0.32;
  if (boundary === BoundaryType.CONVERGENT && continentality > 0.34) return ContinentMarginType.COLLISION;
  if (boundary === BoundaryType.TRANSFORM && marginBand) return ContinentMarginType.TRANSFORM;
  if ((boundary === BoundaryType.DIVERGENT || shape === ContinentShapeType.RIFTED_BLOCK) && marginBand) return ContinentMarginType.RIFT;
  if (shape === ContinentShapeType.ARC_ACCREDITED && marginBand) return ContinentMarginType.ACCRETED;
  if (marginBand) return ContinentMarginType.PASSIVE;
  return ContinentMarginType.NONE;
}

function classifyCausePotential(
  plateType: PlateType,
  boundary: BoundaryType,
  volcanicActivity: number,
  continentality: number,
  distanceNorm: number,
  marginType: ContinentMarginType,
  core: number,
): IslandCause {
  if (boundary === BoundaryType.CONVERGENT && volcanicActivity > 0.25 && continentality < 0.62) return IslandCause.ISLAND_ARC;
  if (volcanicActivity > 0.58 && core < 0.55) return IslandCause.VOLCANIC_HOTSPOT;
  if (marginType === ContinentMarginType.RIFT && continentality < 0.62) return IslandCause.RIFT_FRAGMENT;
  if (continentality > 0.54 && distanceNorm > 0.46) return IslandCause.SHELF_ISLAND;
  if (continentality > 0.36 && distanceNorm > 0.56) return IslandCause.CONTINENTAL_FRAGMENT;
  if (plateType === PlateType.OCEANIC && volcanicActivity < 0.20 && continentality < 0.18) return IslandCause.INVALID_FRAGMENT;
  return IslandCause.NONE;
}

function cellLatLon(world: WorldBrain, index: number): CellPosition {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  return {
    lat: 90 - ((row + 0.5) / world.gridHeight) * 180,
    lon: ((col + 0.5) / world.gridWidth) * 360 - 180,
  };
}

function angularDistanceDeg(latA: number, lonA: number, latB: number, lonB: number): number {
  const a = (latA * Math.PI) / 180;
  const b = (latB * Math.PI) / 180;
  const dLat = ((latB - latA) * Math.PI) / 180;
  const dLon = (shortestLonDelta(lonB, lonA) * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a) * Math.cos(b) * Math.sin(dLon / 2) ** 2;
  return (2 * Math.atan2(Math.sqrt(h), Math.sqrt(Math.max(0, 1 - h))) * 180) / Math.PI;
}

function shortestLonDelta(a: number, b: number): number {
  let d = a - b;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / Math.max(1e-9, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
