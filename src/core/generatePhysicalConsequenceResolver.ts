import type {
  GenerateGeologyStack,
  GenerateGroundSurfaceMaterial,
  GeneratePhysicalSupportMode,
  GenerateSurfaceWaterMode,
} from './generatePhysicalConsequenceContract';

export type GeneratePhysicalConsequenceInput = {
  planetProfile: string;
  preferredSupportMode: GeneratePhysicalSupportMode;
  waterInventory: number;
  seaLevelOffset01: number;
  stellarFluxEarth: number;
  surfaceAbsorbedFlux: number;
  effectiveHeatIndex: number;
  evaporationPotential: number;
  snowlineBias: number;
  atmosphereRetentionIndex: number;
  surfaceGravityEarth: number;
  coreHeat: number;
  heatFlowIndex: number;
  mantleConvectionIndex: number;
  tectonicVigor: number;
  volcanismBias: number;
  riftLikelihood: number;
  hotspotPotential: number;
  tidalHeatingIndex: number;
  volatileInventory: number;
  stagnantLidBias: number;
  albedo: number;
};

export type GeneratePhysicalConsequenceResolution = {
  surfaceWaterMode: GenerateSurfaceWaterMode;
  surfaceSupportMode: GeneratePhysicalSupportMode;
  groundSurfaceMaterial: GenerateGroundSurfaceMaterial;
  geologyStack: GenerateGeologyStack;
  iceStability: number;
  adjustedAlbedo: number;
  seaLevelOffset: number;
  waterInventory: number;
  resolvedPhysicalConsequences: string[];
};

export function resolveGeneratePhysicalConsequences(input: GeneratePhysicalConsequenceInput): GeneratePhysicalConsequenceResolution {
  const waterInventory = clamp01(input.waterInventory);
  const seaLevelOffset = clamp01(input.seaLevelOffset01);
  const iceStability = computeIceStability(input, waterInventory);
  const hotInterior = Math.max(input.coreHeat, input.heatFlowIndex, input.tidalHeatingIndex) >= 0.62;
  const coldInterior = input.coreHeat < 0.42 && input.heatFlowIndex < 0.42 && input.tidalHeatingIndex < 0.25;
  const farSun = input.stellarFluxEarth < 0.58 || input.effectiveHeatIndex < 0.82 || iceStability > 0.66;
  const nearSun = input.stellarFluxEarth > 1.34 || input.effectiveHeatIndex > 1.20;
  const retainedAtmosphere = input.atmosphereRetentionIndex > 0.52;
  const highWater = waterInventory >= 0.62;
  const lowWater = waterInventory <= 0.30;
  const consequences: string[] = [];

  const surfaceWaterMode = resolveSurfaceWaterMode({ input, waterInventory, iceStability, hotInterior, coldInterior, farSun, nearSun, retainedAtmosphere, highWater, lowWater, consequences });
  const surfaceSupportMode = resolveSurfaceSupportMode(input, surfaceWaterMode, waterInventory, iceStability, consequences);
  const groundSurfaceMaterial = resolveGroundSurfaceMaterial(surfaceSupportMode, surfaceWaterMode, waterInventory);
  const geologyStack = resolveGeologyStack({ input, surfaceSupportMode, surfaceWaterMode, hotInterior, coldInterior, highWater, lowWater, consequences });
  const adjustedAlbedo = computeAdjustedAlbedo(input.albedo, surfaceWaterMode, groundSurfaceMaterial, waterInventory, iceStability);

  return {
    surfaceWaterMode,
    surfaceSupportMode,
    groundSurfaceMaterial,
    geologyStack,
    iceStability,
    adjustedAlbedo,
    seaLevelOffset,
    waterInventory,
    resolvedPhysicalConsequences: unique(consequences),
  };
}

export function allowsNormalContinentalMorphology(geologyStack: GenerateGeologyStack): boolean {
  return geologyStack === 'PLATE_TECTONIC' || geologyStack === 'RIFT_DOMINATED' || geologyStack === 'HOTSPOT_DOMINATED' || geologyStack === 'STAGNANT_LID';
}

export function allowsNormalRockyCrustTerrain(geologyStack: GenerateGeologyStack): boolean {
  return geologyStack === 'PLATE_TECTONIC' || geologyStack === 'RIFT_DOMINATED' || geologyStack === 'HOTSPOT_DOMINATED' || geologyStack === 'STAGNANT_LID' || geologyStack === 'VOLATILE_PRESSURE_SHELL';
}

export function allowsPlateBoundaryFeatureTerrain(geologyStack: GenerateGeologyStack): boolean {
  return geologyStack === 'PLATE_TECTONIC' || geologyStack === 'RIFT_DOMINATED';
}

export function isIceShellStack(geologyStack: GenerateGeologyStack): boolean {
  return geologyStack === 'ICE_SHELL_TECTONIC';
}

function resolveSurfaceWaterMode(args: {
  input: GeneratePhysicalConsequenceInput;
  waterInventory: number;
  iceStability: number;
  hotInterior: boolean;
  coldInterior: boolean;
  farSun: boolean;
  nearSun: boolean;
  retainedAtmosphere: boolean;
  highWater: boolean;
  lowWater: boolean;
  consequences: string[];
}): GenerateSurfaceWaterMode {
  const { input, waterInventory, iceStability, hotInterior, farSun, nearSun, retainedAtmosphere, highWater, lowWater, consequences } = args;

  if (input.planetProfile === 'ICE_SHELL_OCEAN_WORLD') {
    consequences.push(hotInterior ? 'HOT_CORE_ICE_SHELL' : 'COLD_CORE_ICE_SHELL');
    return hotInterior || highWater ? 'ICE_SHELL_OVER_OCEAN' : 'ICE_OVER_ROCK';
  }

  if (nearSun && highWater && retainedAtmosphere) {
    consequences.push('NEAR_SUN_HIGH_WATER_RETAINED_ATMOSPHERE');
    return 'STEAM_OR_VAPOR_DOMINATED';
  }

  if (farSun && highWater && hotInterior) {
    consequences.push('FAR_SUN_HIGH_WATER_HOT_CORE');
    return 'ICE_SHELL_OVER_OCEAN';
  }

  if (farSun && highWater) {
    consequences.push('FAR_SUN_HIGH_WATER_LOW_CORE');
    return iceStability > 0.78 ? 'SNOWBALL_SURFACE' : 'ICE_OVER_ROCK';
  }

  if (farSun && lowWater) {
    consequences.push('FAR_SUN_LOW_WATER');
    return waterInventory > 0.12 ? 'ICE_OVER_ROCK' : 'DRY';
  }

  if (nearSun && lowWater) {
    consequences.push('NEAR_SUN_LOW_WATER');
    return 'DRY';
  }

  if (waterInventory < 0.18) return 'DRY';
  if (iceStability > 0.58) return 'MIXED_LIQUID_ICE';
  return 'LIQUID_SURFACE_WATER';
}

function resolveSurfaceSupportMode(
  input: GeneratePhysicalConsequenceInput,
  waterMode: GenerateSurfaceWaterMode,
  waterInventory: number,
  iceStability: number,
  consequences: string[],
): GeneratePhysicalSupportMode {
  if (input.planetProfile === 'ARTIFICIAL_OR_FANTASY_SHELL') return 'ARTIFICIAL_OR_FANTASY_SHELL';
  if (input.planetProfile === 'ICE_SHELL_OCEAN_WORLD' || waterMode === 'ICE_SHELL_OVER_OCEAN') return 'ICE_SHELL';
  if (waterMode === 'SNOWBALL_SURFACE' || waterMode === 'ICE_OVER_ROCK' || (iceStability > 0.72 && waterInventory > 0.32)) return 'ICE_OVER_ROCK';
  if (input.planetProfile === 'DWARF_ROCKY_OR_ICY' && waterInventory < 0.42) return 'REGOLITH';
  if (input.planetProfile === 'VOLATILE_PRESSURE_ROCKY') {
    consequences.push('VOLATILE_PRESSURE_SHELL_SUPPORT_REQUIRED');
    return 'LITHOSPHERE';
  }
  if (input.surfaceGravityEarth > 1.22) return 'LITHOSPHERE';
  return input.preferredSupportMode;
}

function resolveGroundSurfaceMaterial(
  supportMode: GeneratePhysicalSupportMode,
  waterMode: GenerateSurfaceWaterMode,
  waterInventory: number,
): GenerateGroundSurfaceMaterial {
  if (supportMode === 'ARTIFICIAL_OR_FANTASY_SHELL') return 'ARTIFICIAL_SHELL';
  if (supportMode === 'ICE_SHELL') return 'ICE_SHELL';
  if (supportMode === 'ICE_OVER_ROCK' || waterMode === 'SNOWBALL_SURFACE' || waterMode === 'ICE_OVER_ROCK') return 'ICE_OVER_ROCK';
  if (supportMode === 'REGOLITH') return 'REGOLITH';
  if (waterInventory > 0.55 && waterMode === 'LIQUID_SURFACE_WATER') return 'SEDIMENT';
  return 'ROCK';
}

function resolveGeologyStack(args: {
  input: GeneratePhysicalConsequenceInput;
  surfaceSupportMode: GeneratePhysicalSupportMode;
  surfaceWaterMode: GenerateSurfaceWaterMode;
  hotInterior: boolean;
  coldInterior: boolean;
  highWater: boolean;
  lowWater: boolean;
  consequences: string[];
}): GenerateGeologyStack {
  const { input, surfaceSupportMode, surfaceWaterMode, hotInterior, coldInterior, consequences } = args;

  if (surfaceSupportMode === 'ARTIFICIAL_OR_FANTASY_SHELL') return 'ARTIFICIAL_DECLARED';
  if (surfaceSupportMode === 'ICE_SHELL' || surfaceWaterMode === 'ICE_SHELL_OVER_OCEAN') return hotInterior ? 'ICE_SHELL_TECTONIC' : 'IMPACT_ANCIENT';
  if (input.planetProfile === 'VOLATILE_PRESSURE_ROCKY') return 'VOLATILE_PRESSURE_SHELL';
  if (input.planetProfile === 'DWARF_ROCKY_OR_ICY') return hotInterior ? 'STAGNANT_LID' : 'IMPACT_ANCIENT';

  if (hotInterior && input.riftLikelihood > 0.58) {
    consequences.push('HOT_CORE_ROCKY_SUPPORT');
    return 'RIFT_DOMINATED';
  }
  if (hotInterior && input.hotspotPotential > 0.62) {
    consequences.push('HOT_CORE_ROCKY_SUPPORT');
    return 'HOTSPOT_DOMINATED';
  }
  if (coldInterior || input.stagnantLidBias > 0.56 || input.tectonicVigor < 0.34) {
    consequences.push('COLD_CORE_ROCKY_SUPPORT');
    return 'STAGNANT_LID';
  }
  return 'PLATE_TECTONIC';
}

function computeIceStability(input: GeneratePhysicalConsequenceInput, waterInventory: number): number {
  const lowHeat = clamp01((0.98 - input.effectiveHeatIndex) / 0.78);
  const farStar = clamp01((0.72 - input.stellarFluxEarth) / 0.56);
  const highAlbedo = clamp01((input.albedo - 0.30) / 0.45);
  const waterSupport = clamp01((waterInventory - 0.18) / 0.72);
  const internalMelt = clamp01(input.heatFlowIndex * 0.36 + input.tidalHeatingIndex * 0.42);
  return clamp01(lowHeat * 0.42 + farStar * 0.24 + highAlbedo * 0.16 + waterSupport * 0.18 - internalMelt * 0.16);
}

function computeAdjustedAlbedo(
  baseAlbedo: number,
  waterMode: GenerateSurfaceWaterMode,
  groundMaterial: GenerateGroundSurfaceMaterial,
  waterInventory: number,
  iceStability: number,
): number {
  const iceShare = waterMode === 'SNOWBALL_SURFACE'
    ? 0.90
    : waterMode === 'ICE_SHELL_OVER_OCEAN'
      ? 0.72
      : waterMode === 'ICE_OVER_ROCK'
        ? 0.52
        : waterMode === 'MIXED_LIQUID_ICE'
          ? 0.30
          : groundMaterial === 'ICE_OVER_ROCK' || groundMaterial === 'ICE_SHELL'
            ? 0.42
            : 0;
  const darkOceanShare = waterMode === 'LIQUID_SURFACE_WATER' ? waterInventory * (1 - iceStability) : 0;
  const cloudProxy = waterMode === 'STEAM_OR_VAPOR_DOMINATED' ? 0.75 : waterInventory * 0.22;
  return clamp01(baseAlbedo + iceShare * 0.28 + cloudProxy * 0.08 - darkOceanShare * 0.05);
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
