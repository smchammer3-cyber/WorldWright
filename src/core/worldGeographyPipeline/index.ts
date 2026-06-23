import {
  ContinentMarginType,
  IslandCause,
  type Cell,
  type WorldBrain,
} from '../worldSchema';
import { recomputeWorld } from '../worldRecompute';
import { applyGeneratedWorldQualityPass } from '../worldQualityPass';
import { seedContinentSkeletonFields } from '../worldContinents';
import { applyCrustTerrainInfluence, seedCrustFields } from '../worldCrust';

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

  seedContinentSkeletonFields(world);
  applySkeletonBaseElevation(world);
  recomputeWorld(world, ['GENERATED']);

  applyGeneratedWorldQualityPass(world);
  recomputeWorld(world, ['GENERATED']);

  seedContinentSkeletonFields(world);
  seedCrustFields(world);
  applyCrustTerrainInfluence(world);
  recomputeWorld(world, ['GENERATED']);

  // Refresh diagnostic/cause fields after visible terrain obedience.
  seedContinentSkeletonFields(world);
  seedCrustFields(world);
}

/**
 * Broad skeleton-first base elevation pass.
 *
 * This is the pipeline-order fix: continent cores and ocean basins now establish
 * broad height tendencies before province cleanup runs. It should reduce the
 * feeling that land is old noise with skeleton forces painted on afterward.
 */
export function applySkeletonBaseElevation(world: WorldBrain): void {
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
      const coreTarget = seaLevel + 0.060 + continentality * 0.070 + core * 0.115;
      target = blendTarget(target, coreTarget, 0.50 + core * 0.25);
      strength = Math.max(strength, 0.34 + core * 0.22);
    } else if (continentality > 0.38) {
      const marginTarget = seaLevel + 0.010 + (continentality - 0.38) * 0.105 - shelf * 0.035;
      target = blendTarget(target, marginTarget, 0.34 + nearSurface * 0.22);
      strength = Math.max(strength, 0.24 + nearSurface * 0.16);
    } else {
      const basinTarget = seaLevel - 0.110 - (1 - continentality) * 0.220;
      target = blendTarget(target, basinTarget, 0.34 + nearSurface * 0.18);
      strength = Math.max(strength, 0.22 + nearSurface * 0.18);
    }

    if (shelf > 0.30 && core < 0.70) {
      const shelfTarget = seaLevel - 0.040 + shelf * 0.030;
      target = blendTarget(target, shelfTarget, 0.36 * shelf);
      strength = Math.max(strength, 0.18 + shelf * 0.16);
    }

    switch (cell.marginType) {
      case ContinentMarginType.COLLISION:
      case ContinentMarginType.ACTIVE:
        target += 0.060 * smoothstep(0.32, 0.82, continentality);
        strength = Math.max(strength, 0.32);
        break;
      case ContinentMarginType.RIFT:
        target -= 0.085 * (0.45 + nearSurface * 0.55);
        strength = Math.max(strength, 0.30);
        break;
      case ContinentMarginType.PASSIVE:
        target -= 0.025 * shelf;
        strength = Math.max(strength, 0.18);
        break;
      default:
        break;
    }

    if (cell.islandCause === IslandCause.INVALID_FRAGMENT && continentality < 0.28) {
      target = Math.min(target, seaLevel - 0.120);
      strength = Math.max(strength, 0.46);
    } else if (cell.islandCause === IslandCause.ISLAND_ARC || cell.islandCause === IslandCause.VOLCANIC_HOTSPOT) {
      target = Math.max(target, seaLevel + 0.020);
      strength = Math.max(strength, 0.22);
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
