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
  const foundation = world.planetFoundation ?? resolveGeneratePlanetFoundation(world.parameters ?? {});
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

    cell.crustThickness = clamp01(
      lerp(0.24, 0.72, continentality)
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

  if ((feature.ISLAND_ARC ?? 0) > 0.44 || (feature.SUBDUCTION_ZONE ?? 0) > 0.58 && volcanic > 0.30) return CrustProvince.ISLAND_ARC;
  if (volcanic > 0.62 && aboveSea > -0.14) return CrustProvince.VOLCANIC_PROVINCE;
  if ((feature.COLLISION_ZONE ?? 0) > 0.42 || cell.marginType === ContinentMarginType.COLLISION || cell.marginType === ContinentMarginType.ACTIVE || cell.upliftRate > 0.24) return CrustProvince.MOBILE_BELT;
  if ((feature.RIFT_ZONE ?? 0) > 0.38 || cell.marginType === ContinentMarginType.RIFT || cell.upliftRate < -0.12 || cell.islandCause === IslandCause.RIFT_FRAGMENT) return CrustProvince.RIFT_MARGIN;
  if (continentality < 0.24 && shelf < 0.22) return CrustProvince.OCEANIC_BASIN;
  if (aboveSea >= -0.05 && aboveSea < 0.13 && shelf > 0.36) return CrustProvince.COASTAL_PLAIN;
  if (core > 0.58 && cell.crustAge > 0.62 && cell.crustThickness > 0.60) return CrustProvince.OLD_SHIELD;
  return CrustProvince.SEDIMENT_BASIN;
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
