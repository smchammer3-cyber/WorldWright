import { makePlanetPreviewFromWorldBrain } from './planetRenderer';
import type { WorldBrain } from './worldSchema';

export type FinalColorAuthorityDiagnostics = {
  plateColorImprintRatio: number | null;
  provinceColorImprintRatio: number | null;
  skeletonColorImprintRatio: number | null;
  surfaceExplainedColorJumpShare: number;
  hiddenAuthorityColorLeakShare: number;
};

const VISIBLE_COLOR_JUMP = 0.085;
const VISIBLE_HEIGHT_JUMP = 0.035;

/**
 * Diagnoses whether the FINAL preview is mostly responding to visible surface
 * facts, or whether hidden cause layers are leaking into visible color.
 *
 * This does not mutate the world and does not judge art style. It only asks
 * whether visible color jumps line up with terrain/water/biome/snow changes, or
 * suspiciously line up with plate/province/skeleton identity borders.
 */
export function computeFinalColorAuthorityDiagnostics(world: WorldBrain): FinalColorAuthorityDiagnostics {
  const preview = makePlanetPreviewFromWorldBrain(world, 'FINAL');

  let plateColorDelta = 0;
  let plateColorEdges = 0;
  let samePlateColorDelta = 0;
  let samePlateEdges = 0;

  let provinceColorDelta = 0;
  let provinceColorEdges = 0;
  let sameProvinceColorDelta = 0;
  let sameProvinceEdges = 0;

  let skeletonColorDelta = 0;
  let skeletonColorEdges = 0;
  let sameSkeletonColorDelta = 0;
  let sameSkeletonEdges = 0;

  let visibleColorJumps = 0;
  let surfaceExplainedColorJumps = 0;
  let hiddenAuthorityEdges = 0;
  let hiddenAuthorityLeaks = 0;

  forEachEastSouthEdge(world, (a, b) => {
    const ca = world.cells[a];
    const cb = world.cells[b];
    const colorDelta = colorDistance(preview.sampleGlobeColor(a), preview.sampleGlobeColor(b));
    const plateEdge = ca.plateId !== cb.plateId;
    const provinceEdge = ca.crustProvince !== cb.crustProvince;
    const skeletonEdge =
      ca.continentId !== cb.continentId ||
      ca.oceanBasinId !== cb.oceanBasinId ||
      ca.marginType !== cb.marginType ||
      ca.islandCause !== cb.islandCause;

    if (plateEdge) {
      plateColorDelta += colorDelta;
      plateColorEdges++;
    } else {
      samePlateColorDelta += colorDelta;
      samePlateEdges++;
    }

    if (provinceEdge) {
      provinceColorDelta += colorDelta;
      provinceColorEdges++;
    } else {
      sameProvinceColorDelta += colorDelta;
      sameProvinceEdges++;
    }

    if (skeletonEdge) {
      skeletonColorDelta += colorDelta;
      skeletonColorEdges++;
    } else {
      sameSkeletonColorDelta += colorDelta;
      sameSkeletonEdges++;
    }

    const visibleColorJump = colorDelta > VISIBLE_COLOR_JUMP;
    const surfaceExplained = edgeHasVisibleSurfaceExplanation(world, a, b);
    if (visibleColorJump) {
      visibleColorJumps++;
      if (surfaceExplained) surfaceExplainedColorJumps++;
    }

    if (visibleColorJump && (plateEdge || provinceEdge || skeletonEdge)) {
      hiddenAuthorityEdges++;
      if (!surfaceExplained) hiddenAuthorityLeaks++;
    }
  });

  return {
    plateColorImprintRatio: ratio(plateColorDelta, plateColorEdges, samePlateColorDelta, samePlateEdges),
    provinceColorImprintRatio: ratio(provinceColorDelta, provinceColorEdges, sameProvinceColorDelta, sameProvinceEdges),
    skeletonColorImprintRatio: ratio(skeletonColorDelta, skeletonColorEdges, sameSkeletonColorDelta, sameSkeletonEdges),
    surfaceExplainedColorJumpShare: visibleColorJumps > 0 ? surfaceExplainedColorJumps / visibleColorJumps : 1,
    hiddenAuthorityColorLeakShare: hiddenAuthorityEdges > 0 ? hiddenAuthorityLeaks / hiddenAuthorityEdges : 0,
  };
}

function edgeHasVisibleSurfaceExplanation(world: WorldBrain, a: number, b: number): boolean {
  const ca = world.cells[a];
  const cb = world.cells[b];
  const ha = totalHeight(ca);
  const hb = totalHeight(cb);

  if (ca.isWater !== cb.isWater) return true;
  if (Math.abs(ha - hb) > VISIBLE_HEIGHT_JUMP) return true;
  if ((ca.editBiomeId ?? ca.baseBiomeId) !== (cb.editBiomeId ?? cb.baseBiomeId)) return true;
  if (Math.abs(ca.snowCover - cb.snowCover) > 0.18) return true;
  if (Math.abs(ca.temperature - cb.temperature) > 0.20) return true;
  if (Math.abs(ca.rainfall - cb.rainfall) > 0.20) return true;

  return false;
}

function colorDistance(a: ArrayLike<number>, b: ArrayLike<number>): number {
  const dr = ((a[0] ?? 0) - (b[0] ?? 0)) / 255;
  const dg = ((a[1] ?? 0) - (b[1] ?? 0)) / 255;
  const db = ((a[2] ?? 0) - (b[2] ?? 0)) / 255;
  return Math.sqrt(dr * dr + dg * dg + db * db) / Math.sqrt(3);
}

function ratio(edgeDelta: number, edgeCount: number, baseDelta: number, baseCount: number): number | null {
  if (edgeCount === 0 || baseCount === 0) return null;
  const baseMean = baseDelta / baseCount;
  if (baseMean <= 1e-9) return null;
  return (edgeDelta / edgeCount) / baseMean;
}

function totalHeight(cell: WorldBrain['cells'][number]): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
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
