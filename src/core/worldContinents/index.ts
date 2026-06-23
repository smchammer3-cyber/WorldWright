import {
  BoundaryType,
  ContinentMarginType,
  ContinentShapeType,
  IslandCause,
  PlateType,
  type ContinentSkeleton,
  type OceanBasinSkeleton,
  type WorldBrain,
} from '../worldSchema';

/**
 * First scaffold for true continent skeletons.
 *
 * This does not replace the height generator yet. It gives every cell a broad
 * geological identity first: which continent/ocean basin it belongs to, how
 * strongly continental it is, where the old core is, and what kind of margin or
 * island ancestry it has. Later terrain passes can use these fields instead of
 * treating all land as random height above sea level.
 */
export function seedContinentSkeletonFields(world: WorldBrain): void {
  if (!world?.cells?.length) return;

  const seed = seedToUint32(world.metadata?.seed ?? world.parameters?.seed ?? 0);
  const requestedCount = typeof world.parameters?.continentCount === 'number'
    ? world.parameters.continentCount
    : 4;
  const continentCount = clampInt(Math.round(requestedCount), 2, 7);
  const continents = createContinentSkeletons(seed, continentCount);
  const oceanBasins = createOceanBasins(seed, Math.max(2, Math.min(5, continentCount + 1)));

  world.continentSkeletons = continents;
  world.oceanBasinSkeletons = oceanBasins;

  const seaLevel = typeof world.seaLevel === 'number' ? world.seaLevel : world.metadata?.seaLevel ?? 0;

  for (let index = 0; index < world.cells.length; index++) {
    const cell = world.cells[index];
    const { lat, lon } = cellLatLon(world, index);
    const best = bestContinentInfluence(lat, lon, continents, seed);
    const ocean = bestOceanBasin(lat, lon, oceanBasins);
    const h = totalHeight(cell);
    const aboveSea = h - seaLevel;

    cell.continentCoreStrength = clamp01(best.coreStrength);
    cell.continentality = clamp01(best.continentality);
    cell.distanceToContinentCore = clamp01(best.distanceNorm);
    cell.continentId = best.continentality > 0.24 ? best.continent.id : null;
    cell.oceanBasinId = best.continentality < 0.46 ? ocean.id : null;
    cell.shelfStrength = computeShelfStrength(best.continentality, aboveSea);
    cell.marginType = classifyMargin(cell.boundaryType, best.continentality, best.distanceNorm, aboveSea, best.continent.shapeType);
    cell.islandCause = classifyIslandCause(cell.plateType, cell.boundaryType, cell.volcanicActivity, best.continentality, best.distanceNorm, aboveSea, cell.marginType);
  }
}

/**
 * Repairs old worlds and fixtures that do not yet have continent skeleton fields.
 */
export function ensureContinentSkeletonFields(world: WorldBrain): void {
  if (!world?.cells?.length) return;

  const needsSkeletons = !Array.isArray(world.continentSkeletons) || world.continentSkeletons.length === 0;
  const needsOceanBasins = !Array.isArray(world.oceanBasinSkeletons) || world.oceanBasinSkeletons.length === 0;
  const needsCells = world.cells.some((cell: any) =>
    typeof cell.continentality !== 'number' ||
    typeof cell.continentCoreStrength !== 'number' ||
    typeof cell.distanceToContinentCore !== 'number' ||
    typeof cell.shelfStrength !== 'number' ||
    !isMarginType(cell.marginType) ||
    !isIslandCause(cell.islandCause)
  );

  if (needsSkeletons || needsOceanBasins || needsCells) {
    seedContinentSkeletonFields(world);
    return;
  }

  for (const cell of world.cells) {
    cell.continentCoreStrength = clamp01(cell.continentCoreStrength);
    cell.continentality = clamp01(cell.continentality);
    cell.distanceToContinentCore = clamp01(cell.distanceToContinentCore);
    cell.shelfStrength = clamp01(cell.shelfStrength);
    if (!isMarginType(cell.marginType)) cell.marginType = ContinentMarginType.NONE;
    if (!isIslandCause(cell.islandCause)) cell.islandCause = IslandCause.NONE;
    if (cell.continentId != null && typeof cell.continentId !== 'number') cell.continentId = null;
    if (cell.oceanBasinId != null && typeof cell.oceanBasinId !== 'number') cell.oceanBasinId = null;
  }
}

function createContinentSkeletons(seed: number, count: number): ContinentSkeleton[] {
  const shapes = Object.values(ContinentShapeType);
  const out: ContinentSkeleton[] = [];

  for (let i = 0; i < count; i++) {
    const golden = (i + 0.5) / count;
    const lonBase = wrapLon(golden * 360 - 180 + centeredJitter(seed, i, 101) * 30);
    const latBand = Math.asin(2 * golden01(i, count, seed) - 1) * 180 / Math.PI;
    const lat = clamp(latBand + centeredJitter(seed, i, 211) * 18, -62, 62);
    const shapeType = shapes[Math.floor(deterministicJitter(seed, i, 307) * shapes.length) % shapes.length];

    out.push({
      id: i + 1,
      shapeType,
      coreLat: lat,
      coreLon: lonBase,
      size: clamp01(0.54 + centeredJitter(seed, i, 401) * 0.16 + (count <= 3 ? 0.10 : 0)),
      axisAngle: deterministicJitter(seed, i, 503) * Math.PI,
      elongation: 1.0 + deterministicJitter(seed, i, 601) * shapeElongationBonus(shapeType),
      lobeCount: shapeLobeCount(shapeType, seed, i),
    });
  }

  return out;
}

function createOceanBasins(seed: number, count: number): OceanBasinSkeleton[] {
  const out: OceanBasinSkeleton[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      id: i + 1,
      centerLat: clamp(centeredJitter(seed, i, 811) * 55, -65, 65),
      centerLon: wrapLon(((i + 0.18) / count) * 360 - 180 + centeredJitter(seed, i, 911) * 42),
      strength: clamp01(0.50 + deterministicJitter(seed, i, 1009) * 0.35),
    });
  }
  return out;
}

function bestContinentInfluence(lat: number, lon: number, continents: ContinentSkeleton[], seed: number) {
  let best = {
    continent: continents[0],
    continentality: 0,
    coreStrength: 0,
    distanceNorm: 1,
  };

  for (const continent of continents) {
    const dist = angularDistanceDeg(lat, lon, continent.coreLat, continent.coreLon);
    const distanceNorm = clamp01(dist / 92);
    const axis = axisProjection(lat, lon, continent);
    const radius = 23 + continent.size * 30;
    const elongatedRadius = radius * (1 + axis.along * (continent.elongation - 1) * 0.55);
    const base = 1 - smoothstep(elongatedRadius * 0.35, elongatedRadius, dist);
    const lobe = lobeInfluence(lat, lon, continent, seed);
    const coreStrength = 1 - smoothstep(0, Math.max(10, radius * 0.42), dist);
    const shapeBias = shapeContinentalityBias(continent.shapeType, axis.cross, axis.along);
    const continentality = clamp01(base * 0.82 + lobe * 0.28 + coreStrength * 0.18 + shapeBias);

    if (continentality > best.continentality) {
      best = { continent, continentality, coreStrength, distanceNorm };
    }
  }

  return best;
}

function bestOceanBasin(lat: number, lon: number, basins: OceanBasinSkeleton[]): OceanBasinSkeleton {
  let best = basins[0];
  let bestScore = Infinity;
  for (const basin of basins) {
    const score = angularDistanceDeg(lat, lon, basin.centerLat, basin.centerLon) / Math.max(0.1, basin.strength);
    if (score < bestScore) {
      bestScore = score;
      best = basin;
    }
  }
  return best;
}

function lobeInfluence(lat: number, lon: number, continent: ContinentSkeleton, seed: number): number {
  let best = 0;
  const radius = 15 + continent.size * 15;
  for (let lobe = 0; lobe < continent.lobeCount; lobe++) {
    const angle = continent.axisAngle + ((Math.PI * 2) / Math.max(1, continent.lobeCount)) * lobe + centeredJitter(seed, continent.id * 17 + lobe, 1201) * 0.45;
    const offset = 13 + deterministicJitter(seed, continent.id * 23 + lobe, 1301) * 19;
    const lobeLat = clamp(continent.coreLat + Math.sin(angle) * offset * 0.55, -72, 72);
    const lobeLon = wrapLon(continent.coreLon + Math.cos(angle) * offset / Math.max(0.2, Math.cos((continent.coreLat * Math.PI) / 180)));
    const dist = angularDistanceDeg(lat, lon, lobeLat, lobeLon);
    best = Math.max(best, 1 - smoothstep(radius * 0.25, radius, dist));
  }
  return clamp01(best);
}

function shapeContinentalityBias(shape: ContinentShapeType, cross: number, along: number): number {
  switch (shape) {
    case ContinentShapeType.RIBBON_CONTINENT:
      return -Math.abs(cross) * 0.10 + along * 0.10;
    case ContinentShapeType.PENINSULAR_CONTINENT:
      return along * 0.08 - Math.max(0, -cross) * 0.04;
    case ContinentShapeType.TWIN_LOBE_CONTINENT:
      return Math.abs(along - 0.55) < 0.24 ? 0.06 : 0;
    case ContinentShapeType.RIFTED_BLOCK:
      return Math.abs(cross) < 0.20 && along > 0.25 ? -0.10 : 0.04;
    case ContinentShapeType.COLLISION_WEDGE:
      return along * 0.06 - Math.max(0, cross) * 0.04;
    case ContinentShapeType.ARC_ACCREDITED:
    case ContinentShapeType.BROKEN_MARGIN_CONTINENT:
      return along > 0.45 ? 0.04 : 0;
    case ContinentShapeType.COMPACT_SHIELD:
    default:
      return 0.02;
  }
}

function classifyMargin(boundary: BoundaryType, continentality: number, distanceNorm: number, aboveSea: number, shape: ContinentShapeType): ContinentMarginType {
  if (continentality < 0.18) return ContinentMarginType.NONE;
  const marginBand = continentality >= 0.18 && continentality < 0.58 && distanceNorm > 0.34;
  if (boundary === BoundaryType.CONVERGENT) return ContinentMarginType.COLLISION;
  if (boundary === BoundaryType.TRANSFORM) return ContinentMarginType.TRANSFORM;
  if (boundary === BoundaryType.DIVERGENT || shape === ContinentShapeType.RIFTED_BLOCK) return marginBand ? ContinentMarginType.RIFT : ContinentMarginType.NONE;
  if (shape === ContinentShapeType.ARC_ACCREDITED && marginBand) return ContinentMarginType.ACCRETED;
  if (marginBand || (aboveSea < 0.08 && continentality > 0.35)) return ContinentMarginType.PASSIVE;
  return ContinentMarginType.NONE;
}

function classifyIslandCause(
  plateType: PlateType,
  boundary: BoundaryType,
  volcanicActivity: number,
  continentality: number,
  distanceNorm: number,
  aboveSea: number,
  marginType: ContinentMarginType,
): IslandCause {
  if (aboveSea < -0.03) return IslandCause.NONE;
  if (boundary === BoundaryType.CONVERGENT && volcanicActivity > 0.25) return IslandCause.ISLAND_ARC;
  if (volcanicActivity > 0.55) return IslandCause.VOLCANIC_HOTSPOT;
  if (marginType === ContinentMarginType.RIFT) return IslandCause.RIFT_FRAGMENT;
  if (continentality > 0.48 && distanceNorm > 0.42) return IslandCause.SHELF_ISLAND;
  if (continentality > 0.30) return IslandCause.CONTINENTAL_FRAGMENT;
  if (plateType === PlateType.OCEANIC && volcanicActivity < 0.20) return IslandCause.INVALID_FRAGMENT;
  return IslandCause.NONE;
}

function computeShelfStrength(continentality: number, aboveSea: number): number {
  const margin = smoothstep(0.18, 0.58, continentality) * (1 - smoothstep(0.60, 0.88, continentality));
  const shallow = 1 - smoothstep(0.02, 0.24, Math.abs(aboveSea));
  return clamp01(margin * 0.72 + shallow * Math.max(0, continentality - 0.24) * 0.55);
}

function axisProjection(lat: number, lon: number, continent: ContinentSkeleton): { along: number; cross: number } {
  const dLat = (lat - continent.coreLat) / 90;
  const dLon = shortestLonDelta(lon, continent.coreLon) / 180;
  const ca = Math.cos(continent.axisAngle);
  const sa = Math.sin(continent.axisAngle);
  const along = clamp01(Math.abs(dLon * ca + dLat * sa) * 2.0);
  const cross = dLon * -sa + dLat * ca;
  return { along, cross };
}

function cellLatLon(world: WorldBrain, index: number): { lat: number; lon: number } {
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

function shapeElongationBonus(shape: ContinentShapeType): number {
  switch (shape) {
    case ContinentShapeType.RIBBON_CONTINENT:
      return 1.30;
    case ContinentShapeType.PENINSULAR_CONTINENT:
    case ContinentShapeType.COLLISION_WEDGE:
      return 0.90;
    case ContinentShapeType.RIFTED_BLOCK:
    case ContinentShapeType.ARC_ACCREDITED:
      return 0.70;
    default:
      return 0.45;
  }
}

function shapeLobeCount(shape: ContinentShapeType, seed: number, i: number): number {
  const jitter = Math.floor(deterministicJitter(seed, i, 701) * 2);
  switch (shape) {
    case ContinentShapeType.TWIN_LOBE_CONTINENT:
      return 2;
    case ContinentShapeType.PENINSULAR_CONTINENT:
      return 2 + jitter;
    case ContinentShapeType.ARC_ACCREDITED:
    case ContinentShapeType.BROKEN_MARGIN_CONTINENT:
      return 3 + jitter;
    case ContinentShapeType.RIFTED_BLOCK:
      return 2 + jitter;
    case ContinentShapeType.RIBBON_CONTINENT:
      return 1 + jitter;
    default:
      return 1 + jitter;
  }
}

function golden01(i: number, count: number, seed: number): number {
  return clamp01(((i * 0.61803398875 + deterministicJitter(seed, i, 37) * 0.22) % 1 + 1) % 1);
}

function isMarginType(value: unknown): value is ContinentMarginType {
  return typeof value === 'string' && Object.values(ContinentMarginType).includes(value as ContinentMarginType);
}

function isIslandCause(value: unknown): value is IslandCause {
  return typeof value === 'string' && Object.values(IslandCause).includes(value as IslandCause);
}

function shortestLonDelta(a: number, b: number): number {
  let d = a - b;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
}

function wrapLon(lon: number): number {
  let out = lon;
  while (out > 180) out -= 360;
  while (out < -180) out += 360;
  return out;
}

function totalHeight(cell: { baseHeight: number; editHeightDelta: number; simHeightDelta: number }): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
}

function seedToUint32(s: string | number): number {
  if (typeof s === 'number') return s >>> 0;
  let h = 2166136261 >>> 0;
  for (let i = 0; i < String(s).length; i++) {
    h ^= String(s).charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) & 0xffffffff;
}

function deterministicJitter(seed: number, index: number, salt: number): number {
  let h = seed ^ Math.imul(index + 1, 374761393) ^ Math.imul(salt + 1, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

function centeredJitter(seed: number, index: number, salt: number): number {
  return deterministicJitter(seed, index, salt) * 2 - 1;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / Math.max(1e-9, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function clampInt(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Math.floor(value)));
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
