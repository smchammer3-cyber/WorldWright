import type { Cell, WorldBrain } from '../worldSchema';
import { buildGeographyProfile, type GeographyProfile } from '../worldGeographyProfile';

export type SeaLevelFitResult = {
  previousSeaLevel: number;
  seaLevel: number;
  targetLandCoverage: number;
};

/**
 * Refit global sea level after terrain composition.
 *
 * The old generator chooses sea level from the old terrain distribution. Once a
 * skeleton-first composer replaces that terrain, the flood threshold must be
 * recalculated from the profile target or the world can swing to giant land or
 * ocean masks.
 */
export function refitSeaLevelToProfile(
  world: WorldBrain,
  profile: GeographyProfile = buildGeographyProfile(world),
): SeaLevelFitResult {
  const previousSeaLevel = typeof world.seaLevel === 'number' ? world.seaLevel : world.metadata?.seaLevel ?? 0;
  if (!world?.cells?.length) {
    return { previousSeaLevel, seaLevel: previousSeaLevel, targetLandCoverage: midpoint(profile.landCoverageTarget) };
  }

  const targetLandCoverage = clamp(midpoint(profile.landCoverageTarget), 0.05, 0.72);
  const heights = world.cells.map((cell) => totalHeight(cell)).sort((a, b) => a - b);
  const waterFraction = clamp(1 - targetLandCoverage, 0.02, 0.98);
  const index = clampInt(Math.floor(waterFraction * (heights.length - 1)), 0, heights.length - 1);
  const fitted = heights[index];
  const seaLevel = clamp(fitted, previousSeaLevel - 0.55, previousSeaLevel + 0.55);

  world.seaLevel = seaLevel;
  if (world.metadata) world.metadata.seaLevel = seaLevel;

  return { previousSeaLevel, seaLevel, targetLandCoverage };
}

function midpoint(range: [number, number]): number {
  return (range[0] + range[1]) / 2;
}

function totalHeight(cell: Cell): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
}

function clamp(value: number, lo: number, hi: number): number {
  return value < lo ? lo : value > hi ? hi : value;
}

function clampInt(value: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, Math.floor(value)));
}
