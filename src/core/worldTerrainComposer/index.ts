import {
  BoundaryType,
  ContinentMarginType,
  IslandCause,
  PlateType,
  type Cell,
  type WorldBrain,
} from '../worldSchema';
import { buildGeographyProfile, type GeographyProfile } from '../worldGeographyProfile';

/**
 * Composes base terrain from cause fields.
 *
 * Broad land and ocean shape should come from continent/ocean skeleton identity,
 * margins, and plate causes. Existing terrain is kept only as low-amplitude
 * substrate texture.
 */
export function composeSkeletonFirstTerrain(
  world: WorldBrain,
  profile: GeographyProfile = buildGeographyProfile(world),
): void {
  if (!world?.cells?.length) return;

  const seaLevel = typeof world.seaLevel === 'number' ? world.seaLevel : world.metadata?.seaLevel ?? 0;
  const seed = seedToUint32(world.metadata?.seed ?? world.parameters?.seed ?? 0);
  const prior = world.cells.map((cell) => totalHeight(cell));

  for (let index = 0; index < world.cells.length; index++) {
    const cell = world.cells[index];
    const continentality = clamp01(cell.continentality);
    const core = clamp01(cell.continentCoreStrength);
    const shelf = clamp01(cell.shelfStrength);
    const oceanicity = 1 - continentality;
    const substrate = clamp(prior[index], seaLevel - 0.35, seaLevel + 0.35) - seaLevel;
    const broadNoise = centeredJitter(seed, index, 3119) * profile.detailNoiseWeight * 0.34;
    const reliefNoise = centeredJitter(seed, cell.plateId * 971 + index, 6113) * profile.tectonicReliefWeight * 0.22;

    let target = seaLevel - 0.18 - oceanicity * 0.15;

    if (cell.continentId != null && continentality > 0.62) {
      target = seaLevel + 0.055 + core * 0.20 + (continentality - 0.62) * 0.20;
    } else if (cell.continentId != null && continentality > 0.42) {
      target = seaLevel + 0.008 + (continentality - 0.42) * 0.13 - shelf * 0.035;
    } else if (cell.oceanBasinId != null) {
      target = seaLevel - 0.095 - oceanicity * 0.18;
    }

    if (shelf > 0.28 && core < 0.64) {
      const shelfTarget = seaLevel - 0.050 + shelf * 0.026;
      target = blend(target, shelfTarget, profile.shelfWeight * shelf * 1.8);
    }

    if (cell.marginType === ContinentMarginType.COLLISION || cell.boundaryType === BoundaryType.CONVERGENT) {
      target += profile.tectonicReliefWeight * 0.11 * smoothstep(0.40, 0.90, continentality);
    }
    if (cell.marginType === ContinentMarginType.RIFT || cell.boundaryType === BoundaryType.DIVERGENT) {
      target -= profile.oceanBasinWeight * 0.080 * smoothstep(0.20, 0.68, oceanicity + shelf * 0.40);
    }
    if (cell.boundaryType === BoundaryType.CONVERGENT && cell.plateType === PlateType.OCEANIC) {
      target -= profile.oceanBasinWeight * 0.050;
    }

    if (cell.islandCause === IslandCause.ISLAND_ARC || cell.islandCause === IslandCause.VOLCANIC_HOTSPOT) {
      target = Math.max(target, seaLevel + 0.018 + cell.volcanicActivity * 0.045);
    } else if (cell.islandCause === IslandCause.RIFT_FRAGMENT || cell.islandCause === IslandCause.CONTINENTAL_FRAGMENT) {
      target = Math.max(target, seaLevel - 0.012 + continentality * 0.045);
    } else if (cell.islandCause === IslandCause.INVALID_FRAGMENT) {
      target = Math.min(target, seaLevel - 0.12);
    }

    const oldSubstrateInfluence = 0.08;
    const relief = (broadNoise + reliefNoise) * (0.4 + Math.max(core, shelf, cell.volcanicActivity) * 0.6);
    cell.baseHeight = clamp(target + substrate * oldSubstrateInfluence + relief, -1.4, 1.5);
    cell.editHeightDelta = 0;
    cell.simHeightDelta = 0;
  }
}

function totalHeight(cell: Cell): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
}

function blend(a: number, b: number, t: number): number {
  const u = clamp01(t);
  return a * (1 - u) + b * u;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / Math.max(1e-9, edge1 - edge0));
  return t * t * (3 - 2 * t);
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

function clamp(value: number, lo: number, hi: number): number {
  return value < lo ? lo : value > hi ? hi : value;
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
