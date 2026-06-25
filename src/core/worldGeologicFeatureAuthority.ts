import {
  BoundaryType,
  ContinentMarginType,
  IslandCause,
  OceanDepthClass,
  type Cell,
  type WorldBrain,
} from './worldSchema';
import { classifyPlateBoundaryFeatureAuthority } from './worldPlateBoundaryFeatures';

export type GeologicFeatureAuthorityId =
  | 'CONTINENT_CORE'
  | 'CONTINENT_MARGIN'
  | 'CONTINENT_SHELF'
  | 'SUBDUCTION_ZONE'
  | 'OCEAN_TRENCH'
  | 'OCEAN_RIDGE'
  | 'OCEAN_BASIN'
  | 'RIFT_ZONE'
  | 'COLLISION_ZONE'
  | 'TRANSFORM_ZONE'
  | 'DIFFUSE_BOUNDARY'
  | 'ISLAND_ARC'
  | 'HOTSPOT_CHAIN'
  | 'VOLCANIC_CENTER'
  | 'MOBILE_BELT'
  | 'SEDIMENT_BASIN'
  | 'COASTAL_PLAIN';

export type GeologicFeatureAuthority = {
  primary: GeologicFeatureAuthorityId | 'NONE';
  strength: number;
  features: Partial<Record<GeologicFeatureAuthorityId, number>>;
  hasStrongFeatureAuthority: boolean;
};

export type SharedGeologicFeatureAuthority = {
  hasSharedFeatureAuthority: boolean;
  strength: number;
  features: GeologicFeatureAuthorityId[];
};

export type GeologicFeatureAuthorityDiagnostics = {
  strongFeatureCellShare: number;
  highContrastEdgeShare: number;
  featureExplainedHighContrastEdgeShare: number;
  plateAuthorityLeakShare: number;
  provinceAuthorityLeakShare: number;
  oceanPlateAuthorityLeakShare: number;
  oceanProvinceAuthorityLeakShare: number;
  landPlateAuthorityLeakShare: number;
  landProvinceAuthorityLeakShare: number;
};

export type GeologicFeatureAuthorityDiagnosticsOptions = {
  heights?: ArrayLike<number>;
  seaLevel?: number;
};

const STRONG_FEATURE_AUTHORITY = 0.45;
const VISIBLE_AUTHORITY_JUMP = 0.035;

/**
 * Classifies the explicit geologic feature authority for a cell.
 *
 * Raw plateId, plateType, and crustProvince labels are not terrain/color
 * authority. Plate motion and crust material fields may explain features;
 * the feature authority is what may explain visible terrain/color decisions.
 *
 * Important: oceanDepthClass is derived from height during recompute, so it is
 * not allowed to be strong terrain authority by itself. A deep cell should not
 * become a self-justifying trench merely because the current height made it
 * deep. Strong ridge/trench authority must come from cause fields such as
 * boundaryType, marginType, islandCause, uplift, volcanism, and material state.
 */
export function classifyGeologicFeatureAuthority(cell: Cell): GeologicFeatureAuthority {
  const features: Partial<Record<GeologicFeatureAuthorityId, number>> = {};

  function add(id: GeologicFeatureAuthorityId, strength: number): void {
    if (!Number.isFinite(strength) || strength <= 0) return;
    features[id] = Math.max(features[id] ?? 0, clamp01(strength));
  }

  const plateFeatureAuthority = classifyPlateBoundaryFeatureAuthority(cell);
  for (const [id, strength] of Object.entries(plateFeatureAuthority.features) as [GeologicFeatureAuthorityId, number][]) {
    add(id, strength);
  }

  const continentality = clamp01(cell.continentality);
  const core = clamp01(cell.continentCoreStrength);
  const shelf = clamp01(cell.shelfStrength);
  const thickness = clamp01(cell.crustThickness);
  const age = clamp01(cell.crustAge);
  const volcanic = clamp01(cell.volcanicActivity);
  const uplift = typeof cell.upliftRate === 'number' ? cell.upliftRate : 0;
  const stableMaterial = Math.max(0, thickness - 0.56) * Math.max(0, age - 0.46);
  const thinYoungMaterial = Math.max(0, 0.58 - thickness) * Math.max(0, 0.62 - age);

  const hasSubductionCause =
    cell.boundaryType === BoundaryType.CONVERGENT ||
    cell.marginType === ContinentMarginType.ACTIVE ||
    cell.marginType === ContinentMarginType.COLLISION ||
    cell.islandCause === IslandCause.ISLAND_ARC ||
    (volcanic > 0.52 && uplift > 0.18);

  const hasRiftCause =
    cell.boundaryType === BoundaryType.DIVERGENT ||
    cell.marginType === ContinentMarginType.RIFT ||
    cell.islandCause === IslandCause.RIFT_FRAGMENT ||
    uplift < -0.12 ||
    thinYoungMaterial > 0.04;

  if (cell.oceanDepthClass === OceanDepthClass.TRENCH) add('OCEAN_TRENCH', hasSubductionCause ? 0.94 : 0.32);
  if (cell.oceanDepthClass === OceanDepthClass.RIDGE) add('OCEAN_RIDGE', hasRiftCause ? 0.92 : 0.32);
  if (cell.oceanDepthClass === OceanDepthClass.SHELF) add('CONTINENT_SHELF', shelf > 0.50 ? 0.52 : 0.34);
  if (cell.oceanDepthClass === OceanDepthClass.SLOPE) add('CONTINENT_MARGIN', shelf > 0.42 ? 0.50 : 0.30);
  if (cell.oceanDepthClass === OceanDepthClass.ABYSSAL) add('OCEAN_BASIN', 0.16);

  if (cell.boundaryType === BoundaryType.CONVERGENT) {
    add('SUBDUCTION_ZONE', 0.82);
    add('COLLISION_ZONE', 0.72);
  }
  if (cell.boundaryType === BoundaryType.DIVERGENT) add('RIFT_ZONE', 0.86);
  if (cell.boundaryType === BoundaryType.TRANSFORM) add('TRANSFORM_ZONE', 0.46);

  if (cell.marginType === ContinentMarginType.COLLISION) add('COLLISION_ZONE', 0.84);
  if (cell.marginType === ContinentMarginType.ACTIVE) add('SUBDUCTION_ZONE', 0.70);
  if (cell.marginType === ContinentMarginType.RIFT) add('RIFT_ZONE', 0.78);
  if (cell.marginType === ContinentMarginType.TRANSFORM) add('TRANSFORM_ZONE', 0.50);
  if (cell.marginType === ContinentMarginType.PASSIVE) add('CONTINENT_MARGIN', 0.44);
  if (cell.marginType === ContinentMarginType.ACCRETED) add('CONTINENT_MARGIN', 0.54);

  if (cell.islandCause === IslandCause.CONTINENTAL_FRAGMENT) add('CONTINENT_MARGIN', 0.58);
  if (cell.islandCause === IslandCause.SHELF_ISLAND) add('CONTINENT_SHELF', 0.58);
  if (cell.islandCause === IslandCause.ISLAND_ARC) {
    add('SUBDUCTION_ZONE', 0.90);
    add('ISLAND_ARC', 0.94);
  }
  if (cell.islandCause === IslandCause.VOLCANIC_HOTSPOT) {
    add('HOTSPOT_CHAIN', 0.92);
    add('VOLCANIC_CENTER', 0.76);
  }
  if (cell.islandCause === IslandCause.RIFT_FRAGMENT) add('RIFT_ZONE', 0.74);

  if (core > 0.72) add('CONTINENT_CORE', 0.82);
  else if (core > 0.56) add('CONTINENT_CORE', 0.58);
  if (stableMaterial > 0.035 && core > 0.42) add('CONTINENT_CORE', 0.58 + core * 0.18 + stableMaterial * 0.30);
  if (stableMaterial > 0.020 && uplift > 0.10) add('MOBILE_BELT', 0.48 + clamp01(uplift) * 0.24);
  if (thinYoungMaterial > 0.035 && shelf > 0.20) add('SEDIMENT_BASIN', 0.40 + thinYoungMaterial * 0.40);
  if (shelf > 0.62) add('CONTINENT_SHELF', 0.54 + shelf * 0.18);
  if (shelf > 0.50 && continentality > 0.32 && Math.abs(uplift) < 0.12) add('COASTAL_PLAIN', 0.36 + shelf * 0.18);
  if (volcanic > 0.55) add('VOLCANIC_CENTER', 0.58 + volcanic * 0.28);
  if (uplift > 0.28) add('COLLISION_ZONE', 0.48 + clamp01(uplift) * 0.24);

  let primary: GeologicFeatureAuthorityId | 'NONE' = 'NONE';
  let strength = 0;
  for (const [id, value] of Object.entries(features) as [GeologicFeatureAuthorityId, number][]) {
    if (value > strength) {
      primary = id;
      strength = value;
    }
  }

  return {
    primary,
    strength,
    features,
    hasStrongFeatureAuthority: strength >= STRONG_FEATURE_AUTHORITY,
  };
}

export function getSharedGeologicFeatureAuthority(a: Cell, b: Cell, minStrength = STRONG_FEATURE_AUTHORITY): SharedGeologicFeatureAuthority {
  const fa = classifyGeologicFeatureAuthority(a).features;
  const fb = classifyGeologicFeatureAuthority(b).features;
  const features: GeologicFeatureAuthorityId[] = [];
  let strength = 0;

  for (const [id, aStrength] of Object.entries(fa) as [GeologicFeatureAuthorityId, number][]) {
    const bStrength = fb[id];
    if (typeof bStrength !== 'number') continue;
    const shared = Math.min(aStrength, bStrength);
    if (shared >= minStrength) {
      features.push(id);
      strength = Math.max(strength, shared);
    }
  }

  return { hasSharedFeatureAuthority: features.length > 0, strength, features };
}

export function edgeHasSharedGeologicFeatureAuthority(a: Cell, b: Cell, minStrength = STRONG_FEATURE_AUTHORITY): boolean {
  return getSharedGeologicFeatureAuthority(a, b, minStrength).hasSharedFeatureAuthority;
}

export function computeGeologicFeatureAuthorityDiagnostics(
  world: WorldBrain,
  options: GeologicFeatureAuthorityDiagnosticsOptions = {},
): GeologicFeatureAuthorityDiagnostics {
  const totalCells = Math.max(1, world.cells.length);
  const seaLevel = typeof options.seaLevel === 'number'
    ? options.seaLevel
    : typeof world.seaLevel === 'number'
      ? world.seaLevel
      : world.metadata?.seaLevel ?? 0;

  let strongFeatureCells = 0;
  for (const cell of world.cells) {
    if (classifyGeologicFeatureAuthority(cell).hasStrongFeatureAuthority) strongFeatureCells++;
  }

  let totalEdges = 0;
  let highContrastEdges = 0;
  let featureExplainedHighContrastEdges = 0;

  let plateEdges = 0;
  let plateLeaks = 0;
  let provinceEdges = 0;
  let provinceLeaks = 0;

  let oceanPlateEdges = 0;
  let oceanPlateLeaks = 0;
  let oceanProvinceEdges = 0;
  let oceanProvinceLeaks = 0;

  let landPlateEdges = 0;
  let landPlateLeaks = 0;
  let landProvinceEdges = 0;
  let landProvinceLeaks = 0;

  forEachEastSouthEdge(world, (a, b) => {
    totalEdges++;
    const ca = world.cells[a];
    const cb = world.cells[b];
    const ha = heightAt(world, a, options.heights);
    const hb = heightAt(world, b, options.heights);
    const delta = Math.abs(ha - hb);
    if (!Number.isFinite(delta)) return;

    const visibleJump = delta > VISIBLE_AUTHORITY_JUMP;
    const shared = edgeHasSharedGeologicFeatureAuthority(ca, cb);
    if (visibleJump) {
      highContrastEdges++;
      if (shared) featureExplainedHighContrastEdges++;
    }

    const bothOcean = ha < seaLevel && hb < seaLevel;
    const bothLand = ha >= seaLevel && hb >= seaLevel;
    const authorityLeak = visibleJump && !shared;

    if (ca.plateId !== cb.plateId) {
      plateEdges++;
      if (authorityLeak) plateLeaks++;
      if (bothOcean) {
        oceanPlateEdges++;
        if (authorityLeak) oceanPlateLeaks++;
      }
      if (bothLand) {
        landPlateEdges++;
        if (authorityLeak) landPlateLeaks++;
      }
    }

    if (ca.crustProvince !== cb.crustProvince) {
      provinceEdges++;
      if (authorityLeak) provinceLeaks++;
      if (bothOcean) {
        oceanProvinceEdges++;
        if (authorityLeak) oceanProvinceLeaks++;
      }
      if (bothLand) {
        landProvinceEdges++;
        if (authorityLeak) landProvinceLeaks++;
      }
    }
  });

  return {
    strongFeatureCellShare: strongFeatureCells / totalCells,
    highContrastEdgeShare: highContrastEdges / Math.max(1, totalEdges),
    featureExplainedHighContrastEdgeShare: highContrastEdges > 0 ? featureExplainedHighContrastEdges / highContrastEdges : 1,
    plateAuthorityLeakShare: plateEdges > 0 ? plateLeaks / plateEdges : 0,
    provinceAuthorityLeakShare: provinceEdges > 0 ? provinceLeaks / provinceEdges : 0,
    oceanPlateAuthorityLeakShare: oceanPlateEdges > 0 ? oceanPlateLeaks / oceanPlateEdges : 0,
    oceanProvinceAuthorityLeakShare: oceanProvinceEdges > 0 ? oceanProvinceLeaks / oceanProvinceEdges : 0,
    landPlateAuthorityLeakShare: landPlateEdges > 0 ? landPlateLeaks / landPlateEdges : 0,
    landProvinceAuthorityLeakShare: landProvinceEdges > 0 ? landProvinceLeaks / landProvinceEdges : 0,
  };
}

function heightAt(world: WorldBrain, index: number, heights?: ArrayLike<number>): number {
  const override = heights?.[index];
  if (typeof override === 'number') return override;
  const cell = world.cells[index];
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

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
