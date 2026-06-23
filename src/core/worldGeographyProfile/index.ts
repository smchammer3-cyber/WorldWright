import type { WorldBrain } from '../worldSchema';

export type GeographyRange = [number, number];

export type GeographyProfile = {
  styleMode: 'EARTHLIKE' | 'FANTASY' | 'STYLIZED' | 'ALIEN';
  landCoverageTarget: GeographyRange;
  largestLandmassTarget: GeographyRange;
  shelfAreaTarget: GeographyRange;
  deepOceanTarget: GeographyRange;
  archipelagoTolerance: number;
  supercontinentTolerance: number;
  artifactTolerance: number;
  skeletonWeight: number;
  oceanBasinWeight: number;
  provinceWeight: number;
  shelfWeight: number;
  tectonicReliefWeight: number;
  detailNoiseWeight: number;
  cleanupWeight: number;
};

/**
 * Converts user sliders into a bounded geography budget.
 *
 * Sliders should describe real pressures. They should not directly add chaos to
 * terrain. This profile is the governor that keeps skeletons, oceans, shelves,
 * crust provinces, cleanup, and detail within safe ratios for the selected
 * style mode.
 */
export function buildGeographyProfile(world: WorldBrain): GeographyProfile {
  const params = world.parameters ?? {};
  const styleMode = normalizeStyleMode(world.metadata?.styleMode ?? (params.styleMode as any));
  const seaLevel = slider01(params.seaLevel, 50);
  const plateActivity = slider01(params.plateActivity, 55);
  const planetAge = slider01(params.planetAge, 70);
  const continentCount = clamp01((numeric(params.continentCount, 4) - 1) / 11);

  const style = styleDefaults(styleMode);
  const seaPush = seaLevel - 0.5;
  const activePush = plateActivity - 0.5;
  const oldPush = planetAge - 0.5;

  const landMid = clamp(
    style.landMid - seaPush * 0.24 + (continentCount - 0.27) * 0.05,
    style.landRange[0],
    style.landRange[1],
  );
  const landWidth = styleMode === 'EARTHLIKE' ? 0.055 : 0.075;

  const largestMid = clamp(
    style.largestMid + (continentCount < 0.25 ? 0.08 : -continentCount * 0.10),
    style.largestRange[0],
    style.largestRange[1],
  );

  const shelfMid = clamp(
    style.shelfMid + seaPush * 0.07 + (0.5 - Math.abs(seaPush)) * 0.02,
    style.shelfRange[0],
    style.shelfRange[1],
  );

  const deepOceanMid = clamp(
    style.deepOceanMid + seaPush * 0.18 - continentCount * 0.03,
    style.deepOceanRange[0],
    style.deepOceanRange[1],
  );

  const skeletonWeight = clamp(style.skeletonWeight + oldPush * 0.08 - activePush * 0.04, 0.42, 0.72);
  const oceanBasinWeight = clamp(style.oceanBasinWeight + seaPush * 0.12, 0.38, 0.72);
  const shelfWeight = clamp(style.shelfWeight + seaPush * 0.08 - activePush * 0.04, 0.12, 0.38);
  const provinceWeight = clamp(style.provinceWeight + activePush * 0.08, 0.12, 0.34);
  const tectonicReliefWeight = clamp(style.tectonicReliefWeight + activePush * 0.16 - oldPush * 0.04, 0.10, 0.42);
  const detailNoiseWeight = clamp(style.detailNoiseWeight + style.weirdness * 0.04, 0.04, 0.18);
  const cleanupWeight = clamp(style.cleanupWeight - style.weirdness * 0.02, 0.02, 0.10);

  return {
    styleMode,
    landCoverageTarget: rangeAround(landMid, landWidth, style.landRange),
    largestLandmassTarget: rangeAround(largestMid, 0.10, style.largestRange),
    shelfAreaTarget: rangeAround(shelfMid, 0.035, style.shelfRange),
    deepOceanTarget: rangeAround(deepOceanMid, 0.08, style.deepOceanRange),
    archipelagoTolerance: clamp(style.archipelagoTolerance + continentCount * 0.12 + activePush * 0.06, 0.05, 0.45),
    supercontinentTolerance: clamp(style.supercontinentTolerance + (1 - continentCount) * 0.10, 0.08, 0.45),
    artifactTolerance: clamp(style.artifactTolerance + style.weirdness * 0.05, 0.02, 0.28),
    skeletonWeight,
    oceanBasinWeight,
    provinceWeight,
    shelfWeight,
    tectonicReliefWeight,
    detailNoiseWeight,
    cleanupWeight,
  };
}

function styleDefaults(styleMode: GeographyProfile['styleMode']) {
  switch (styleMode) {
    case 'FANTASY':
      return {
        landMid: 0.34,
        landRange: [0.20, 0.48] as GeographyRange,
        largestMid: 0.44,
        largestRange: [0.18, 0.70] as GeographyRange,
        shelfMid: 0.12,
        shelfRange: [0.05, 0.22] as GeographyRange,
        deepOceanMid: 0.48,
        deepOceanRange: [0.30, 0.68] as GeographyRange,
        skeletonWeight: 0.56,
        oceanBasinWeight: 0.52,
        provinceWeight: 0.23,
        shelfWeight: 0.23,
        tectonicReliefWeight: 0.24,
        detailNoiseWeight: 0.11,
        cleanupWeight: 0.06,
        archipelagoTolerance: 0.20,
        supercontinentTolerance: 0.22,
        artifactTolerance: 0.10,
        weirdness: 0.30,
      };
    case 'ALIEN':
      return {
        landMid: 0.32,
        landRange: [0.16, 0.54] as GeographyRange,
        largestMid: 0.42,
        largestRange: [0.12, 0.76] as GeographyRange,
        shelfMid: 0.10,
        shelfRange: [0.03, 0.24] as GeographyRange,
        deepOceanMid: 0.50,
        deepOceanRange: [0.24, 0.76] as GeographyRange,
        skeletonWeight: 0.52,
        oceanBasinWeight: 0.50,
        provinceWeight: 0.24,
        shelfWeight: 0.20,
        tectonicReliefWeight: 0.27,
        detailNoiseWeight: 0.13,
        cleanupWeight: 0.05,
        archipelagoTolerance: 0.24,
        supercontinentTolerance: 0.26,
        artifactTolerance: 0.16,
        weirdness: 0.55,
      };
    case 'STYLIZED':
      return {
        landMid: 0.33,
        landRange: [0.20, 0.46] as GeographyRange,
        largestMid: 0.46,
        largestRange: [0.20, 0.68] as GeographyRange,
        shelfMid: 0.10,
        shelfRange: [0.04, 0.20] as GeographyRange,
        deepOceanMid: 0.48,
        deepOceanRange: [0.30, 0.68] as GeographyRange,
        skeletonWeight: 0.58,
        oceanBasinWeight: 0.54,
        provinceWeight: 0.20,
        shelfWeight: 0.20,
        tectonicReliefWeight: 0.20,
        detailNoiseWeight: 0.08,
        cleanupWeight: 0.07,
        archipelagoTolerance: 0.16,
        supercontinentTolerance: 0.18,
        artifactTolerance: 0.08,
        weirdness: 0.18,
      };
    case 'EARTHLIKE':
    default:
      return {
        landMid: 0.31,
        landRange: [0.25, 0.38] as GeographyRange,
        largestMid: 0.40,
        largestRange: [0.25, 0.55] as GeographyRange,
        shelfMid: 0.10,
        shelfRange: [0.06, 0.14] as GeographyRange,
        deepOceanMid: 0.50,
        deepOceanRange: [0.40, 0.60] as GeographyRange,
        skeletonWeight: 0.60,
        oceanBasinWeight: 0.58,
        provinceWeight: 0.20,
        shelfWeight: 0.20,
        tectonicReliefWeight: 0.20,
        detailNoiseWeight: 0.07,
        cleanupWeight: 0.06,
        archipelagoTolerance: 0.12,
        supercontinentTolerance: 0.15,
        artifactTolerance: 0.05,
        weirdness: 0.00,
      };
  }
}

function rangeAround(mid: number, halfWidth: number, bounds: GeographyRange): GeographyRange {
  return [clamp(mid - halfWidth, bounds[0], bounds[1]), clamp(mid + halfWidth, bounds[0], bounds[1])];
}

function normalizeStyleMode(value: unknown): GeographyProfile['styleMode'] {
  if (value === 'FANTASY' || value === 'STYLIZED' || value === 'ALIEN') return value;
  return 'EARTHLIKE';
}

function slider01(value: unknown, fallback: number): number {
  return clamp01(numeric(value, fallback) / 100);
}

function numeric(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function clamp01(value: number): number {
  return clamp(value, 0, 1);
}
