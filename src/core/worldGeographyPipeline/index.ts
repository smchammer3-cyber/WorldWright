import {
  ContinentMarginType,
  IslandCause,
  type Cell,
  type WorldBrain,
} from '../worldSchema';
import { recomputeWorld } from '../worldRecompute';
import { applyGeneratedWorldQualityPass } from '../worldQualityPass';
import { seedSkeletonCauseFields } from '../worldSkeletonCause';
import { composeSkeletonFirstTerrain } from '../worldTerrainComposer';
import { refitSeaLevelToProfile } from '../worldSeaLevelFit';
import { applyCrustTerrainInfluence, seedCrustFields } from '../worldCrust';
import { buildGeographyProfile, type GeographyProfile } from '../worldGeographyProfile';
import { applyOceanBasinAuthority } from '../worldOceanBasinAuthority';
import { applyGeographyAuthorityCleanup } from '../worldGeographyAuthority';
import { applyGeographyProfileCorrections, measureGeographyProfileFit } from '../worldGeographyMetrics';

/**
 * Authoritative generated-world geography order.
 *
 * This is intentionally separate from recomputeWorld. Recompute derives water,
 * climate, rivers, snow, and biomes from the existing terrain. This pipeline is
 * the generated-world geography constructor: it gives continent/ocean skeletons
 * authority before crust provinces and cleanup try to refine the surface.
 */
export function applyGeneratedGeographyPipeline(world: WorldBrain): void {
  if (!world?.cells?.length) return;

  const profile = buildGeographyProfile(world);

  seedSkeletonCauseFields(world);
  composeSkeletonFirstTerrain(world, profile);
  refitSeaLevelToProfile(world, profile);
  recomputeWorld(world, ['GENERATED']);

  applyOceanBasinAuthority(world, profile);
  recomputeWorld(world, ['GENERATED']);

  applyGeneratedWorldQualityPass(world, profile);
  recomputeWorld(world, ['GENERATED']);

  seedSkeletonCauseFields(world);
  seedCrustFields(world);
  applyCrustTerrainInfluence(world);
  recomputeWorld(world, ['GENERATED']);

  seedSkeletonCauseFields(world);
  applyOceanBasinAuthority(world, profile);
  recomputeWorld(world, ['GENERATED']);

  applyGeographyAuthorityCleanup(world, profile);
  recomputeWorld(world, ['GENERATED']);

  applyGeographyProfileCorrections(world, profile);
  refitSeaLevelToProfile(world, profile);
  recomputeWorld(world, ['GENERATED']);

  // Refresh diagnostic/cause fields after visible terrain obedience/correction.
  seedSkeletonCauseFields(world);
  seedCrustFields(world);
  measureGeographyProfileFit(world, profile);
}

/**
 * Broad skeleton-first base elevation pass.
 *
 * This legacy helper remains available for focused tests and older callers, but
 * the generated-world pipeline now composes the first terrain body from skeleton
 * causes before using correction passes.
 */
export function applySkeletonBaseElevation(
  world: WorldBrain,
  profile: GeographyProfile = buildGeographyProfile(world),
): void {
  const seaLevel = typeof world.seaLevel === 'number' ? world.seaLevel : world.metadata?.seaLevel ?? 0;

  for (const cell of world.cells) {
    const h = totalHeight(cell);
    const continentality = clamp01(cell.continentality);
    const core = clamp01(cell.continentCoreStrength);
    const shelf = clamp01(cell.shelfStrength);
    const nearSurface = 1 - smoothstep(0.10, 0.46, Math.abs(h - seaLevel));

    let target = h;
    let strength = 0;

    if (continentality > 0.62) {
      const coreTarget = seaLevel + 0.055 + continentality * 0.065 + core * 0.105;
      target = blendTarget(target, coreTarget, profile.skeletonWeight * (0.54 + core * 0.24));
      strength = Math.max(strength, profile.skeletonWeight * (0.44 + core * 0.22));
    } else if (continentality > 0.38) {
      const marginTarget = seaLevel + 0.006 + (continentality - 0.38) * 0.085 - shelf * 0.030;
      target = blendTarget(target, marginTarget, profile.skeletonWeight * (0.28 + nearSurface * 0.18));
      strength = Math.max(strength, profile.skeletonWeight * (0.24 + nearSurface * 0.14));
    } else {
      const basinTarget = seaLevel - 0.095 - (1 - continentality) * 0.205;
      target = blendTarget(target, basinTarget, profile.oceanBasinWeight * (0.30 + nearSurface * 0.16));
      strength = Math.max(strength, profile.oceanBasinWeight * (0.24 + nearSurface * 0.16));
    }

    if (shelf > 0.30 && core < 0.70) {
      const shelfTarget = seaLevel - 0.045 + shelf * 0.022;
      target = blendTarget(target, shelfTarget, profile.shelfWeight * shelf);
      strength = Math.max(strength, profile.shelfWeight * (0.42 + shelf * 0.22));
    }

    switch (cell.marginType) {
      case ContinentMarginType.COLLISION:
      case ContinentMarginType.ACTIVE:
        target += 0.055 * profile.tectonicReliefWeight * smoothstep(0.32, 0.82, continentality);
        strength = Math.max(strength, profile.tectonicReliefWeight * 0.70);
        break;
      case ContinentMarginType.RIFT:
        target -= 0.075 * profile.oceanBasinWeight * (0.45 + nearSurface * 0.55);
        strength = Math.max(strength, profile.oceanBasinWeight * 0.48);
        break;
      case ContinentMarginType.PASSIVE:
        target -= 0.020 * profile.shelfWeight * shelf;
        strength = Math.max(strength, profile.shelfWeight * 0.36);
        break;
      default:
        break;
    }

    if (cell.islandCause === IslandCause.INVALID_FRAGMENT && continentality < 0.28) {
      target = Math.min(target, seaLevel - 0.105);
      strength = Math.max(strength, profile.cleanupWeight * 5.0);
    } else if (cell.islandCause === IslandCause.ISLAND_ARC || cell.islandCause === IslandCause.VOLCANIC_HOTSPOT) {
      target = Math.max(target, seaLevel + 0.018);
      strength = Math.max(strength, profile.tectonicReliefWeight * 0.60);
    }

    const delta = (target - h) * clamp01(strength);
    cell.baseHeight = clamp(cell.baseHeight + delta, -1.4, 1.5);
  }
}

function totalHeight(cell: Cell): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
}

function blendTarget(currentTarget: number, nextTarget: number, amount: number): number {
  const t = clamp01(amount);
  return currentTarget * (1 - t) + nextTarget * t;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / Math.max(1e-9, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function clamp(value: number, lo: number, hi: number): number {
  return value < lo ? lo : value > hi ? hi : value;
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
