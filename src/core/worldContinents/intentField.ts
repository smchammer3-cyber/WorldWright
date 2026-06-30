import {
  BoundaryType,
  ContinentMarginType,
  ContinentShapeType,
  IslandCause,
  PlateType,
  type Cell,
  type ContinentSkeleton,
  type OceanBasinSkeleton,
  type WorldBrain,
} from '../worldSchema';

export type ContinentIntentCell = {
  continentId: number | null;
  oceanBasinId: number | null;
  continentality: number;
  continentCoreStrength: number;
  distanceToContinentCore: number;
  shelfTendency: number;
  marginTendency: number;
  oceanBasinTendency: number;
};

export type ContinentIntentField = {
  width: number;
  height: number;
  seed: number;
  continents: ContinentSkeleton[];
  oceanBasins: OceanBasinSkeleton[];
  cells: ContinentIntentCell[];
};

export function buildContinentIntentField(args: {
  width: number;
  height: number;
  seed: string | number;
  continentCount?: number;
}): ContinentIntentField {
  const width = clampInt(args.width, 32, 1024);
  const height = clampInt(args.height, 16, 512);
  const seed = seedToUint32(args.seed);
  const continentCount = clampInt(Math.round(args.continentCount ?? 4), 2, 8);
  const continents = createContinentSkeletons(seed, continentCount);
  const oceanBasins = createOceanBasins(seed, Math.max(2, Math.min(6, continentCount + 1)));
  const cells: ContinentIntentCell[] = new Array(width * height);

  for (let index = 0; index < cells.length; index++) {
    const { lat, lon } = cellLatLon(width, height, index);
    const best = bestContinentIntent(lat, lon, continents, seed);
    const basin = bestOceanBasin(lat, lon, oceanBasins);
    const continentality = clamp01(best.continentality);
    const core = clamp01(best.coreStrength);
    const distance = clamp01(best.distanceNorm);
    const shelfTendency = computeShelfTendency(continentality, core, distance, best.edgeNoise);
    const marginTendency = smoothstep(0.26, 0.68, continentality) * smoothstep(0.34, 0.94, distance);

    cells[index] = {
      continentId: continentality > 0.265 ? best.continent.id : null,
      oceanBasinId: continentality < 0.42 ? basin.id : null,
      continentality,
      continentCoreStrength: core,
      distanceToContinentCore: distance,
      shelfTendency,
      marginTendency,
      oceanBasinTendency: clamp01((1 - continentality) * (0.76 + basin.strength * 0.24)),
    };
  }

  return { width, height, seed, continents, oceanBasins, cells };
}

export function seedContinentSkeletonFields(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  const field = buildContinentIntentField({
    width: world.gridWidth,
    height: world.gridHeight,
    seed: world.metadata?.seed ?? world.parameters?.seed ?? 0,
    continentCount: typeof world.parameters?.continentCount === 'number' ? world.parameters.continentCount : 4,
  });

  world.continentSkeletons = field.continents;
  world.oceanBasinSkeletons = field.oceanBasins;

  const seaLevel = typeof world.seaLevel === 'number' ? world.seaLevel : world.metadata?.seaLevel ?? 0;

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const intent = field.cells[i];
    const aboveSea = totalHeight(cell) - seaLevel;
    const exposedLandSupport = aboveSea >= 0
      ? Math.max(clamp01(cell.continentality), 0.28 + smoothstep(0.00, 0.16, aboveSea) * 0.14)
      : 0;
    const supportedContinentality = exposedLandSupport > 0
      ? Math.max(intent.continentality, exposedLandSupport)
      : intent.continentality;
    const supportedCore = exposedLandSupport > 0
      ? Math.max(intent.continentCoreStrength, (exposedLandSupport - 0.26) * 0.42)
      : intent.continentCoreStrength;
    const supportedShelf = exposedLandSupport > 0
      ? Math.max(intent.shelfTendency, smoothstep(0.24, 0.56, supportedContinentality) * 0.18)
      : intent.shelfTendency;
    const supportedMargin = exposedLandSupport > 0
      ? Math.max(intent.marginTendency, smoothstep(0.28, 0.58, supportedContinentality) * 0.16)
      : intent.marginTendency;
    const terrainSyncedIntent: ContinentIntentCell = {
      ...intent,
      continentality: clamp01(supportedContinentality),
      continentCoreStrength: clamp01(supportedCore),
      shelfTendency: clamp01(supportedShelf),
      marginTendency: clamp01(supportedMargin),
      oceanBasinTendency: clamp01((1 - supportedContinentality) * intent.oceanBasinTendency),
    };
    const suppressSubmergedGhost = shouldSuppressSubmergedContinentAuthority(world, i, terrainSyncedIntent, aboveSea, seaLevel);
    const assignedIntent: ContinentIntentCell = suppressSubmergedGhost
      ? {
          ...terrainSyncedIntent,
          continentId: null,
          continentality: Math.min(terrainSyncedIntent.continentality, 0.54),
          continentCoreStrength: Math.min(terrainSyncedIntent.continentCoreStrength, 0.24),
          shelfTendency: 0,
          marginTendency: 0,
        }
      : terrainSyncedIntent;

    cell.continentCoreStrength = assignedIntent.continentCoreStrength;
    cell.continentality = assignedIntent.continentality;
    cell.distanceToContinentCore = assignedIntent.distanceToContinentCore;
    cell.continentId = assignedIntent.continentId;
    cell.oceanBasinId = assignedIntent.oceanBasinId;
    cell.shelfStrength = assignedIntent.shelfTendency;
    cell.marginType = suppressSubmergedGhost ? ContinentMarginType.NONE : classifyMargin(cell, assignedIntent);
    cell.islandCause = suppressSubmergedGhost ? IslandCause.NONE : classifyIslandCause(cell, assignedIntent);
  }
}

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
    const lonStride = (i * 0.618033988749895 + deterministicJitter(seed, i, 101) * 0.16) % 1;
    const lonBase = wrapLon(lonStride * 360 - 180);
    const lat01 = (i * 0.381966011250105 + deterministicJitter(seed, i, 211) * 0.22 + 0.19) % 1;
    const latBand = Math.asin(2 * lat01 - 1) * 180 / Math.PI;
    const lat = clamp(latBand + centeredJitter(seed, i, 223) * 10, -58, 58);
    const shapeType = shapes[Math.floor(deterministicJitter(seed, i, 307) * shapes.length) % shapes.length];

    out.push({
      id: i + 1,
      shapeType,
      coreLat: lat,
      coreLon: lonBase,
      size: clamp01(0.36 + centeredJitter(seed, i, 401) * 0.12 + (count <= 3 ? 0.06 : 0)),
      axisAngle: deterministicJitter(seed, i, 503) * Math.PI,
      elongation: 0.88 + deterministicJitter(seed, i, 601) * shapeElongationBonus(shapeType),
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

function bestContinentIntent(lat: number, lon: number, continents: ContinentSkeleton[], seed: number): {
  continent: ContinentSkeleton;
  continentality: number;
  coreStrength: number;
  distanceNorm: number;
  edgeNoise: number;
} {
  let best = {
    continent: continents[0],
    continentality: 0,
    coreStrength: 0,
    distanceNorm: 1,
    edgeNoise: 0,
  };

  for (const continent of continents) {
    const local = distortedLocalCoordinates(lat, lon, continent, seed);
    const shapeDistance = normalizedShapeDistance(local.x, local.y, continent.shapeType);
    const lobe = lobeEdgeOffset(local.angle, local.radius, continent, seed);
    const gulf = gulfCutout(local.angle, local.radius, continent, seed);
    const edgeNoise = lobe - gulf;
    const warpedDistance = clamp(shapeDistance - lobe + gulf, 0, 2.4);
    const base = 1 - smoothstep(0.56, 1.00, warpedDistance);
    const coreStrength = 1 - smoothstep(0.00, 0.34, warpedDistance);
    const shapeBias = shapeContinentalityBias(continent.shapeType, local.x, local.y);
    const continentality = clamp01(base * 0.82 + coreStrength * 0.18 + shapeBias);

    if (continentality > best.continentality) {
      best = {
        continent,
        continentality,
        coreStrength,
        distanceNorm: clamp01(warpedDistance / 1.08),
        edgeNoise,
      };
    }
  }

  return best;
}

function distortedLocalCoordinates(lat: number, lon: number, continent: ContinentSkeleton, seed: number): { x: number; y: number; radius: number; angle: number } {
  const dLat = (lat - continent.coreLat) / 90;
  const dLon = shortestLonDelta(lon, continent.coreLon) / 180;
  const ca = Math.cos(continent.axisAngle);
  const sa = Math.sin(continent.axisAngle);
  const alongRaw = dLon * ca + dLat * sa;
  const crossRaw = dLon * -sa + dLat * ca;
  const radiusBase = 0.13 + continent.size * 0.16;
  const alongScale = radiusBase * continent.elongation;
  const crossScale = radiusBase / Math.sqrt(Math.max(0.62, continent.elongation));
  const broadWarp = valueNoise2D(seed, lon * 0.018 + continent.id * 4.7, lat * 0.018 - continent.id * 2.9, 1811) * 2 - 1;
  const mediumWarp = valueNoise2D(seed, lon * 0.052 - continent.id * 1.3, lat * 0.052 + continent.id * 3.1, 1907) * 2 - 1;
  const x = alongRaw / Math.max(1e-6, alongScale) + broadWarp * 0.08 + mediumWarp * 0.050;
  const y = crossRaw / Math.max(1e-6, crossScale) - broadWarp * 0.055 + mediumWarp * 0.065;
  return { x, y, radius: Math.sqrt(x * x + y * y), angle: Math.atan2(y, x) };
}

function normalizedShapeDistance(x: number, y: number, shape: ContinentShapeType): number {
  switch (shape) {
    case ContinentShapeType.RIBBON_CONTINENT:
      return Math.max(Math.abs(y) * 1.55, Math.abs(x) * 0.92) + Math.abs(y) * 0.14;
    case ContinentShapeType.PENINSULAR_CONTINENT:
      return Math.sqrt(x * x * 0.82 + y * y * 1.16) + Math.max(0, -x) * 0.22;
    case ContinentShapeType.TWIN_LOBE_CONTINENT: {
      const left = Math.sqrt((x + 0.30) * (x + 0.30) * 1.12 + y * y * 1.24);
      const right = Math.sqrt((x - 0.30) * (x - 0.30) * 1.12 + y * y * 1.24);
      return Math.min(left, right) + Math.max(0, 0.16 - Math.abs(x)) * 0.72;
    }
    case ContinentShapeType.RIFTED_BLOCK:
      return Math.sqrt(x * x * 1.02 + y * y * 1.12) + Math.max(0, 0.28 - Math.abs(y)) * Math.max(0, x) * 0.24;
    case ContinentShapeType.COLLISION_WEDGE:
      return Math.max(Math.abs(y) * (1.20 + Math.max(0, x) * 0.70), Math.abs(x) * 0.96);
    case ContinentShapeType.ARC_ACCREDITED:
      return Math.sqrt(x * x * 0.90 + (Math.abs(y) - 0.16) * (Math.abs(y) - 0.16) * 1.18) + Math.max(0, -x) * 0.12;
    case ContinentShapeType.BROKEN_MARGIN_CONTINENT:
      return Math.sqrt(x * x * 1.00 + y * y * 1.06) + Math.max(0, y) * 0.16;
    case ContinentShapeType.COMPACT_SHIELD:
    default:
      return Math.sqrt(x * x + y * y);
  }
}

function lobeEdgeOffset(angle: number, radius: number, continent: ContinentSkeleton, seed: number): number {
  const lobes = Math.max(2, continent.lobeCount);
  const phase = deterministicJitter(seed, continent.id, 2309) * Math.PI * 2;
  const wave = Math.sin(angle * lobes + phase) * 0.5 + Math.sin(angle * (lobes + 2) - phase * 0.7) * 0.32;
  const edgeGate = smoothstep(0.34, 0.86, radius) * (1 - smoothstep(1.02, 1.42, radius));
  return Math.max(0, wave) * edgeGate * (0.080 + continent.size * 0.045);
}

function gulfCutout(angle: number, radius: number, continent: ContinentSkeleton, seed: number): number {
  const lobes = Math.max(2, continent.lobeCount + 1);
  const phase = deterministicJitter(seed, continent.id, 2707) * Math.PI * 2;
  const wave = Math.sin(angle * lobes + phase) * 0.5 + Math.cos(angle * (lobes + 3) + phase) * 0.28;
  const edgeGate = smoothstep(0.44, 0.94, radius) * (1 - smoothstep(1.05, 1.44, radius));
  return Math.max(0, -wave) * edgeGate * 0.18;
}

function computeShelfTendency(continentality: number, core: number, distanceNorm: number, edgeNoise: number): number {
  const marginBand = smoothstep(0.26, 0.58, continentality) * (1 - smoothstep(0.62, 0.86, continentality));
  const edgeBand = smoothstep(0.38, 0.88, distanceNorm) * (1 - smoothstep(0.96, 1.0, distanceNorm));
  return clamp01(marginBand * 0.64 + edgeBand * 0.30 + Math.max(0, edgeNoise) * 0.14 - core * 0.12);
}

function classifyMargin(cell: Cell, intent: ContinentIntentCell): ContinentMarginType {
  const continentality = intent.continentality;
  if (continentality < 0.22) return ContinentMarginType.NONE;
  const marginBand = intent.marginTendency > 0.18 || (continentality >= 0.22 && continentality < 0.62 && intent.distanceToContinentCore > 0.34);
  if (cell.boundaryType === BoundaryType.CONVERGENT) return ContinentMarginType.COLLISION;
  if (cell.boundaryType === BoundaryType.TRANSFORM) return ContinentMarginType.TRANSFORM;
  if (cell.boundaryType === BoundaryType.DIVERGENT) return marginBand ? ContinentMarginType.RIFT : ContinentMarginType.NONE;
  if (intent.shelfTendency > 0.30 && marginBand) return ContinentMarginType.PASSIVE;
  return ContinentMarginType.NONE;
}

function classifyIslandCause(cell: Cell, intent: ContinentIntentCell): IslandCause {
  if (cell.boundaryType === BoundaryType.CONVERGENT && cell.volcanicActivity > 0.25) return IslandCause.ISLAND_ARC;
  if (cell.volcanicActivity > 0.55) return IslandCause.VOLCANIC_HOTSPOT;
  if (intent.marginTendency > 0.45 && cell.boundaryType === BoundaryType.DIVERGENT) return IslandCause.RIFT_FRAGMENT;
  if (intent.continentality > 0.48 && intent.distanceToContinentCore > 0.48 && intent.shelfTendency > 0.32) return IslandCause.SHELF_ISLAND;
  if (intent.continentality > 0.34 && intent.distanceToContinentCore > 0.66) return IslandCause.CONTINENTAL_FRAGMENT;
  if (cell.plateType === PlateType.OCEANIC && cell.volcanicActivity < 0.20 && intent.continentality < 0.18) return IslandCause.INVALID_FRAGMENT;
  return IslandCause.NONE;
}

function shouldSuppressSubmergedContinentAuthority(world: WorldBrain, index: number, intent: ContinentIntentCell, aboveSea: number, seaLevel: number): boolean {
  if (intent.continentality <= 0.62) return false;
  if (aboveSea > -0.045) return false;
  return landNeighborShare(world, index, seaLevel) < 0.20;
}

function landNeighborShare(world: WorldBrain, index: number, seaLevel: number): number {
  const width = world.gridWidth;
  const height = world.gridHeight;
  const row = Math.floor(index / width);
  const col = index % width;
  const offsets = [[-1, 0], [1, 0], [0, -1], [0, 1]] as const;
  let land = 0;
  let count = 0;
  for (const [dr, dc] of offsets) {
    const rr = row + dr;
    if (rr < 0 || rr >= height) continue;
    const cc = (col + dc + width) % width;
    const neighbor = world.cells[rr * width + cc];
    count++;
    if (totalHeight(neighbor) >= seaLevel) land++;
  }
  return land / Math.max(1, count);
}

function totalHeight(cell: { baseHeight: number; editHeightDelta: number; simHeightDelta: number }): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
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

function shapeContinentalityBias(shape: ContinentShapeType, x: number, y: number): number {
  switch (shape) {
    case ContinentShapeType.RIBBON_CONTINENT:
      return -Math.abs(y) * 0.055 + Math.abs(x) * 0.010;
    case ContinentShapeType.PENINSULAR_CONTINENT:
      return x > 0 ? 0.030 : -0.025;
    case ContinentShapeType.TWIN_LOBE_CONTINENT:
      return Math.abs(x) > 0.18 && Math.abs(x) < 0.70 ? 0.030 : -0.020;
    case ContinentShapeType.RIFTED_BLOCK:
      return Math.abs(y) < 0.18 && x > 0 ? -0.090 : 0.025;
    case ContinentShapeType.COLLISION_WEDGE:
      return x > 0 ? 0.030 - Math.max(0, y) * 0.025 : -0.015;
    case ContinentShapeType.ARC_ACCREDITED:
    case ContinentShapeType.BROKEN_MARGIN_CONTINENT:
      return x > 0.30 ? 0.025 : -0.005;
    case ContinentShapeType.COMPACT_SHIELD:
    default:
      return 0.010;
  }
}

function shapeElongationBonus(shape: ContinentShapeType): number {
  switch (shape) {
    case ContinentShapeType.RIBBON_CONTINENT: return 0.85;
    case ContinentShapeType.PENINSULAR_CONTINENT: return 0.65;
    case ContinentShapeType.COLLISION_WEDGE: return 0.50;
    case ContinentShapeType.RIFTED_BLOCK: return 0.45;
    case ContinentShapeType.ARC_ACCREDITED: return 0.65;
    case ContinentShapeType.BROKEN_MARGIN_CONTINENT: return 0.55;
    case ContinentShapeType.TWIN_LOBE_CONTINENT: return 0.35;
    case ContinentShapeType.COMPACT_SHIELD:
    default: return 0.25;
  }
}

function shapeLobeCount(shape: ContinentShapeType, seed: number, index: number): number {
  const jitter = Math.floor(deterministicJitter(seed, index, 701) * 3);
  switch (shape) {
    case ContinentShapeType.COMPACT_SHIELD: return 3 + jitter;
    case ContinentShapeType.RIFTED_BLOCK: return 4 + jitter;
    case ContinentShapeType.COLLISION_WEDGE: return 3 + jitter;
    case ContinentShapeType.ARC_ACCREDITED: return 5 + jitter;
    case ContinentShapeType.RIBBON_CONTINENT: return 4 + jitter;
    case ContinentShapeType.TWIN_LOBE_CONTINENT: return 2 + jitter;
    case ContinentShapeType.PENINSULAR_CONTINENT: return 4 + jitter;
    case ContinentShapeType.BROKEN_MARGIN_CONTINENT: return 5 + jitter;
  }
}

function cellLatLon(width: number, height: number, index: number): { lat: number; lon: number } {
  const row = Math.floor(index / width);
  const col = index % width;
  return {
    lat: 90 - ((row + 0.5) / height) * 180,
    lon: ((col + 0.5) / width) * 360 - 180,
  };
}

function angularDistanceDeg(latA: number, lonA: number, latB: number, lonB: number): number {
  const aLat = latA * Math.PI / 180;
  const bLat = latB * Math.PI / 180;
  const dLat = (latB - latA) * Math.PI / 180;
  const dLon = shortestLonDelta(lonB, lonA) * Math.PI / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(aLat) * Math.cos(bLat) * Math.sin(dLon / 2) ** 2;
  return 2 * Math.atan2(Math.sqrt(h), Math.sqrt(Math.max(0, 1 - h))) * 180 / Math.PI;
}

function shortestLonDelta(lon: number, origin: number): number {
  let delta = lon - origin;
  while (delta < -180) delta += 360;
  while (delta > 180) delta -= 360;
  return delta;
}

function wrapLon(lon: number): number {
  let out = lon;
  while (out < -180) out += 360;
  while (out > 180) out -= 360;
  return out;
}

function valueNoise2D(seed: number, x: number, y: number, salt: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const tx = x - x0;
  const ty = y - y0;
  const a = hashGrid(seed, x0, y0, salt);
  const b = hashGrid(seed, x0 + 1, y0, salt);
  const c = hashGrid(seed, x0, y0 + 1, salt);
  const d = hashGrid(seed, x0 + 1, y0 + 1, salt);
  const sx = tx * tx * (3 - 2 * tx);
  const sy = ty * ty * (3 - 2 * ty);
  return lerp(lerp(a, b, sx), lerp(c, d, sx), sy);
}

function hashGrid(seed: number, x: number, y: number, salt: number): number {
  let h = seed ^ Math.imul(x + 4099, 374761393) ^ Math.imul(y + 9176, 668265263) ^ Math.imul(salt + 1, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
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

function seedToUint32(s: string | number): number {
  if (typeof s === 'number') return s >>> 0;
  let h = 2166136261 >>> 0;
  for (let i = 0; i < String(s).length; i++) {
    h ^= String(s).charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) & 0xffffffff;
}

function isMarginType(value: unknown): value is ContinentMarginType {
  return Object.values(ContinentMarginType).includes(value as ContinentMarginType);
}

function isIslandCause(value: unknown): value is IslandCause {
  return Object.values(IslandCause).includes(value as IslandCause);
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / Math.max(1e-9, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp(value: number, lo: number, hi: number): number {
  return value < lo ? lo : value > hi ? hi : value;
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

function clampInt(value: number, lo: number, hi: number): number {
  const n = Math.round(Number.isFinite(value) ? value : lo);
  return n < lo ? lo : n > hi ? hi : n;
}
