import {
  BoundaryType,
  ContinentMarginType,
  CrustProvince,
  IslandCause,
  type Cell,
  type WorldBrain,
} from '../worldSchema';
import { classifyPlateBoundaryFeatureAuthority } from '../worldPlateBoundaryFeatures';
import { resolveGeneratePlanetFoundation } from '../generatePlanetFoundation';

export function seedCrustFields(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  const foundation = world.planetFoundation ?? resolveGeneratePlanetFoundation((world.parameters ?? {}) as any);
  world.planetFoundation = foundation;
  const seed = seedToUint32(world.metadata?.seed ?? world.parameters?.seed ?? 0);
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const height = totalHeight(cell);
    const feature = classifyPlateBoundaryFeatureAuthority(cell).features;
    const continentality = clamp01(cell.continentality);
    const core = clamp01(cell.continentCoreStrength);
    const shelf = clamp01(cell.shelfStrength);
    const ridge = feature.OCEAN_RIDGE ?? 0;
    const rift = feature.RIFT_ZONE ?? 0;
    const trench = feature.OCEAN_TRENCH ?? 0;
    const arc = feature.ISLAND_ARC ?? 0;
    const collision = feature.COLLISION_ZONE ?? 0;
    const volcanic = clamp01(cell.volcanicActivity + foundation.volcanismBias * 0.18 + arc * 0.18);
    const materialNoise = centeredJitter(seed, i, 1001) * 0.055;
    // Keep broad crust contrast continuous; post-birth land/water plate labels must not become a hard crust mask.
    const crustBaseThickness = lerp(0.245, 0.715, continentality);

    cell.crustThickness = clamp01(
      crustBaseThickness
      + collision * 0.18
      + arc * 0.06
      - ridge * 0.08
      - rift * 0.10
      - trench * 0.04
      + core * 0.06
      + shelf * 0.035
      + materialNoise,
    );

    cell.crustAge = clamp01(
      0.22
      + foundation.thermalAge * 0.38
      + core * 0.28
      - ridge * 0.32
      - volcanic * 0.12
      - rift * 0.08
      + centeredJitter(seed, i, 3001) * 0.045,
    );

    cell.crustProvince = classifyCrustProvince(cell, height, seaLevel);
  }

  harmonizeWeakCrustProvinceEdges(world, seaLevel);
}

export function ensureCrustFields(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  let shouldSeed = false;
  for (const cell of world.cells as Array<Cell & { crustThickness?: unknown; crustAge?: unknown; crustProvince?: unknown }>) {
    if (typeof cell.crustThickness !== 'number' || typeof cell.crustAge !== 'number') {
      shouldSeed = true;
      break;
    }
  }
  if (shouldSeed) {
    seedCrustFields(world);
    return;
  }
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  for (const cell of world.cells as Array<Cell & { crustProvince?: unknown }>) {
    cell.crustThickness = clamp01(cell.crustThickness);
    cell.crustAge = clamp01(cell.crustAge);
    if (!isCrustProvince(cell.crustProvince)) cell.crustProvince = classifyCrustProvince(cell, totalHeight(cell), seaLevel);
  }
}

export function classifyCrustProvince(cell: Cell, height: number, seaLevel: number): CrustProvince {
  const aboveSea = height - seaLevel;
  const feature = classifyPlateBoundaryFeatureAuthority(cell).features;
  const continentality = clamp01(cell.continentality);
  const core = clamp01(cell.continentCoreStrength);
  const shelf = clamp01(cell.shelfStrength);
  const volcanic = clamp01(cell.volcanicActivity);
  const thickness = clamp01(cell.crustThickness);
  const age = clamp01(cell.crustAge);
  const activeFeature = (feature.COLLISION_ZONE ?? 0) + (feature.RIFT_ZONE ?? 0) + (feature.OCEAN_RIDGE ?? 0) + (feature.OCEAN_TRENCH ?? 0) + (feature.ISLAND_ARC ?? 0);
  const nearSea = Math.abs(aboveSea) < 0.13;

  if ((feature.ISLAND_ARC ?? 0) > 0.30 || ((feature.SUBDUCTION_ZONE ?? 0) > 0.40 && volcanic > 0.18)) return CrustProvince.ISLAND_ARC;
  if (volcanic > 0.50 && aboveSea > -0.20) return CrustProvince.VOLCANIC_PROVINCE;
  if ((feature.COLLISION_ZONE ?? 0) > 0.28 || cell.marginType === ContinentMarginType.COLLISION || cell.marginType === ContinentMarginType.ACTIVE || cell.upliftRate > 0.12) return CrustProvince.MOBILE_BELT;
  if ((feature.RIFT_ZONE ?? 0) > 0.24 || cell.marginType === ContinentMarginType.RIFT || cell.upliftRate < -0.06 || cell.islandCause === IslandCause.RIFT_FRAGMENT) return CrustProvince.RIFT_MARGIN;
  if ((feature.OCEAN_RIDGE ?? 0) > 0.25 || (feature.OCEAN_TRENCH ?? 0) > 0.25) return CrustProvince.OCEANIC_BASIN;
  if (nearSea && shelf > 0.18) return CrustProvince.COASTAL_PLAIN;
  if (aboveSea < -0.03 && (continentality < 0.72 || thickness < 0.62)) return CrustProvince.OCEANIC_BASIN;
  if (cell.boundaryType !== BoundaryType.NONE && activeFeature > 0.12) return CrustProvince.MOBILE_BELT;
  if (core > 0.22 && age > 0.40 && thickness > 0.40 && activeFeature < 0.50) return CrustProvince.OLD_SHIELD;
  if (continentality < 0.42 && aboveSea < 0.12) return CrustProvince.OCEANIC_BASIN;
  return CrustProvince.SEDIMENT_BASIN;
}

function harmonizeWeakCrustProvinceEdges(world: WorldBrain, seaLevel: number): void {
  const next = world.cells.map((cell) => cell.crustProvince);
  forEachEastSouthEdge(world, (a, b) => {
    const ca = world.cells[a];
    const cb = world.cells[b];
    if (ca.crustProvince === cb.crustProvince) return;
    if (hasStrongCrustProvinceCause(ca) || hasStrongCrustProvinceCause(cb)) return;
    const ha = totalHeight(ca);
    const hb = totalHeight(cb);
    if (Math.abs(ha - hb) <= 0.035) return;
    const shared = sharedPassiveProvince(ca, cb, ha, hb, seaLevel);
    next[a] = shared;
    next[b] = shared;
  });
  for (let i = 0; i < world.cells.length; i++) world.cells[i].crustProvince = next[i];
}

function hasStrongCrustProvinceCause(cell: Cell): boolean {
  const feature = classifyPlateBoundaryFeatureAuthority(cell).features;
  const activeFeature = (feature.COLLISION_ZONE ?? 0) + (feature.RIFT_ZONE ?? 0) + (feature.OCEAN_RIDGE ?? 0) + (feature.OCEAN_TRENCH ?? 0) + (feature.ISLAND_ARC ?? 0);
  return activeFeature > 0.35
    || cell.marginType === ContinentMarginType.ACTIVE
    || cell.marginType === ContinentMarginType.COLLISION
    || cell.marginType === ContinentMarginType.RIFT
    || cell.islandCause === IslandCause.ISLAND_ARC
    || cell.islandCause === IslandCause.RIFT_FRAGMENT
    || cell.islandCause === IslandCause.VOLCANIC_HOTSPOT
    || Math.abs(cell.upliftRate) > 0.13
    || cell.volcanicActivity > 0.55
    || (cell.continentCoreStrength > 0.56 && cell.crustAge > 0.48 && cell.crustThickness > 0.48);
}

function sharedPassiveProvince(a: Cell, b: Cell, ha: number, hb: number, seaLevel: number): CrustProvince {
  const aWater = ha < seaLevel;
  const bWater = hb < seaLevel;
  const maxShelf = Math.max(clamp01(a.shelfStrength), clamp01(b.shelfStrength));
  const maxContinentality = Math.max(clamp01(a.continentality), clamp01(b.continentality));
  const nearSurface = Math.min(Math.abs(ha - seaLevel), Math.abs(hb - seaLevel)) < 0.16;
  if (maxShelf > 0.24 || (nearSurface && maxContinentality > 0.28)) return CrustProvince.COASTAL_PLAIN;
  if (aWater && bWater) return CrustProvince.OCEANIC_BASIN;
  if (maxContinentality < 0.34 && (aWater || bWater)) return CrustProvince.OCEANIC_BASIN;
  return CrustProvince.SEDIMENT_BASIN;
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

function isCrustProvince(value: unknown): value is CrustProvince {
  return typeof value === 'string' && Object.values(CrustProvince).includes(value as CrustProvince);
}

function totalHeight(cell: Cell): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
}

function numeric(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function centeredJitter(seed: number, index: number, salt: number): number {
  let h = seed ^ Math.imul(index + 1, 374761393) ^ Math.imul(salt + 1, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return ((h >>> 0) / 4294967295) * 2 - 1;
}

function seedToUint32(s: string | number): number {
  if (typeof s === 'number') return s >>> 0;
  let h = 2166136261 >>> 0;
  for (let i = 0; i < String(s).length; i++) {
    h ^= String(s).charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
