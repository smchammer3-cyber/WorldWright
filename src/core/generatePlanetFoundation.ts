import type { PlanetFoundationSnapshot } from './worldSchema';
import {
  resolveGeneratePhysicalConsequences,
  type GeneratePhysicalConsequenceResolution,
} from './generatePhysicalConsequenceResolver';

export type GenerateFoundationInput = {
  styleMode?: 'EARTHLIKE' | 'FANTASY' | 'STYLIZED' | 'ALIEN';
  seaLevel?: number;
  seaLevelOffset?: number;
  waterInventory?: number;
  plateActivity?: number;
  planetAge?: number;
  erosionIntensity?: number;
  moistureLevel?: number;
  temperatureOffset?: number;
  planetProfile?: PlanetFoundationSnapshot['planetProfile'];
  planetRadiusEarth?: number;
  planetDensityEarth?: number;
  starLuminositySun?: number;
  orbitalDistanceAU?: number;
  albedo?: number;
  greenhouseStrength?: number;
  volatileInventory?: number;
  coreHeatIntent?: number;
  tidalHeatingIntent?: number;
  stagnantLidBias?: number;
  compositionRadioactivity?: number;
};

const SOLID_SURFACE_PROFILES = [
  'EARTHLIKE_ROCKY',
  'ROCKY_ALIEN',
  'VOLATILE_PRESSURE_ROCKY',
  'ICE_SHELL_OCEAN_WORLD',
  'DWARF_ROCKY_OR_ICY',
  'SUPER_EARTH_ROCKY',
  'ARTIFICIAL_OR_FANTASY_SHELL',
] as const;

export function resolveGeneratePlanetFoundation(input: GenerateFoundationInput = {}): PlanetFoundationSnapshot {
  const styleMode = input.styleMode ?? 'EARTHLIKE';
  const profile = selectPlanetProfile(input.planetProfile, styleMode);
  const seaLevelOffset01 = percent01(input.seaLevelOffset ?? input.seaLevel, 50);
  const age01 = percent01(input.planetAge, 70);
  const thermalYouth = 1 - age01;
  const plateActivityIntent = percent01(input.plateActivity, 55);
  const erosionIntent = percent01(input.erosionIntensity, 70);
  const moistureIntent = percent01(input.moistureLevel, 50);
  const tempOffset = clamp((input.temperatureOffset ?? 0) / 100, -1, 1);

  const profileDefaults = defaultsForProfile(profile, styleMode);
  const planetRadiusEarth = clamp(number(input.planetRadiusEarth, profileDefaults.radiusEarth), 0.12, 2.0);
  const planetDensityEarth = clamp(number(input.planetDensityEarth, profileDefaults.densityEarth), 0.35, 1.55);
  const planetMassEarth = planetDensityEarth * planetRadiusEarth ** 3;
  const surfaceGravityEarth = planetMassEarth / Math.max(0.0001, planetRadiusEarth ** 2);
  const escapeVelocityEarth = Math.sqrt(Math.max(0.0001, planetMassEarth / planetRadiusEarth));
  const reliefGravityScale = clamp(1 / Math.max(0.35, surfaceGravityEarth), 0.45, 1.85);

  const starLuminositySun = clamp(number(input.starLuminositySun, profileDefaults.starLuminositySun), 0.15, 3.0);
  const orbitalDistanceAU = clamp(number(input.orbitalDistanceAU, profileDefaults.orbitalDistanceAU), 0.25, 5.0);
  const albedo = clamp01(number(input.albedo, profileDefaults.albedo));
  const greenhouseStrength = clamp01(number(input.greenhouseStrength, profileDefaults.greenhouseStrength) + tempOffset * 0.20);
  const stellarFluxEarth = starLuminositySun / Math.max(0.0001, orbitalDistanceAU ** 2);
  const surfaceAbsorbedFlux = stellarFluxEarth * (1 - albedo);
  const blackbodyHeatProxy = Math.pow(Math.max(0.0001, surfaceAbsorbedFlux / 0.70), 0.25);
  const effectiveHeatIndex = clamp(blackbodyHeatProxy + greenhouseStrength * 0.22 + tempOffset * 0.18, 0.35, 1.85);
  const evaporationPotential = clamp01(0.50 * normalizeAroundOne(effectiveHeatIndex) + 0.30 * normalizeAroundOne(stellarFluxEarth) + 0.20 * greenhouseStrength + moistureIntent * 0.18);
  const snowlineBias = clamp(1.0 - effectiveHeatIndex, -0.75, 0.75);

  const volatileInventory = clamp01(unit01(input.volatileInventory, profileDefaults.volatileInventory));
  const waterInventory = clamp01(unit01(input.waterInventory, profileDefaults.waterInventory));
  const compositionRadioactivity = clamp01(unit01(input.compositionRadioactivity, profileDefaults.compositionRadioactivity));
  const tidalHeatingIndex = clamp01(unit01(input.tidalHeatingIntent, profileDefaults.tidalHeatingIntent));
  const coreHeatIntent = clamp01(unit01(input.coreHeatIntent, profileDefaults.coreHeatIntent));
  const stagnantLidBias = clamp01(unit01(input.stagnantLidBias, profileDefaults.stagnantLidBias));

  const primordialHeat = clamp01(0.85 * thermalYouth ** 1.35 + 0.15 * coreHeatIntent);
  const radiogenicHeat = clamp01(0.35 + 0.45 * compositionRadioactivity + 0.20 * thermalYouth);
  const coreHeat = clamp01(0.45 * primordialHeat + 0.35 * radiogenicHeat + 0.20 * tidalHeatingIndex);
  const mantleHeat = clamp01(0.70 * coreHeat + 0.20 * volatileInventory + 0.10 * thermalYouth);
  const riftWeakness = clamp01(0.25 * volatileInventory + 0.30 * mantleHeat + 0.20 * plateActivityIntent + 0.25 * reliefGravityScale / 1.85);
  const heatFlowIndex = clamp01(0.65 * mantleHeat + 0.25 * tidalHeatingIndex + 0.10 * riftWeakness);
  const lithosphereMobility = clamp01(0.40 + 0.35 * volatileInventory + 0.25 * normalizeRelief(reliefGravityScale) - 0.25 * stagnantLidBias);
  const mantleConvectionIndex = clamp01(heatFlowIndex * lithosphereMobility * (0.75 + normalizeRelief(reliefGravityScale) * 0.25));
  const tectonicVigor = clamp01(0.55 * mantleConvectionIndex + 0.30 * plateActivityIntent + 0.15 * volatileInventory - 0.18 * stagnantLidBias);
  const volcanismBias = clamp01(0.50 * heatFlowIndex + 0.25 * tidalHeatingIndex + 0.25 * tectonicVigor);
  const riftLikelihood = clamp01(0.45 * mantleConvectionIndex + 0.25 * profileDefaults.volatilePressure + 0.20 * plateActivityIntent + 0.10 * thermalYouth);
  const hotspotPotential = clamp01(0.50 * mantleHeat + 0.25 * heatFlowIndex + 0.25 * tidalHeatingIndex);
  const atmosphereRetentionIndex = clamp01(0.55 * escapeVelocityEarth + 0.25 * surfaceGravityEarth + 0.20 * volatileInventory);
  const erosionSedimentScale = clamp01(0.38 * erosionIntent + 0.24 * age01 + 0.22 * normalizeAroundOne(surfaceGravityEarth) + 0.16 * evaporationPotential);

  const physical = resolveGeneratePhysicalConsequences({
    planetProfile: profile,
    preferredSupportMode: profileDefaults.surfaceSupportMode,
    waterInventory,
    seaLevelOffset01,
    stellarFluxEarth,
    surfaceAbsorbedFlux,
    effectiveHeatIndex,
    evaporationPotential,
    snowlineBias,
    atmosphereRetentionIndex,
    surfaceGravityEarth,
    coreHeat,
    heatFlowIndex,
    mantleConvectionIndex,
    tectonicVigor,
    volcanismBias,
    riftLikelihood,
    hotspotPotential,
    tidalHeatingIndex,
    volatileInventory,
    stagnantLidBias,
    albedo,
  });

  return {
    planetProfile: profile,
    surfaceSupportMode: physical.surfaceSupportMode,
    surfaceMaterialFamily: profileDefaults.surfaceMaterialFamily,
    atmosphereFamily: profileDefaults.atmosphereFamily,
    waterPhaseFamily: profileDefaults.waterPhaseFamily,
    validLayerStack: validLayerStackForPhysical(profileDefaults.validLayerStack, physical),

    surfaceWaterMode: physical.surfaceWaterMode,
    groundSurfaceMaterial: physical.groundSurfaceMaterial,
    geologyStack: physical.geologyStack,
    resolvedPhysicalConsequences: physical.resolvedPhysicalConsequences,
    waterInventory: physical.waterInventory,
    seaLevelOffset: physical.seaLevelOffset,
    iceStability: physical.iceStability,
    adjustedAlbedo: physical.adjustedAlbedo,

    planetRadiusEarth,
    planetDensityEarth,
    planetMassEarth,
    surfaceGravityEarth,
    escapeVelocityEarth,
    reliefGravityScale,
    atmosphereRetentionIndex,

    starLuminositySun,
    orbitalDistanceAU,
    stellarFluxEarth,
    albedo,
    greenhouseStrength,
    surfaceAbsorbedFlux,
    effectiveHeatIndex,
    evaporationPotential,
    snowlineBias,

    thermalAge: age01,
    primordialHeat,
    radiogenicHeat,
    tidalHeatingIndex,
    coreHeat,
    mantleHeat,
    heatFlowIndex,
    mantleConvectionIndex,
    tectonicVigor,
    volcanismBias,
    riftLikelihood,
    hotspotPotential,
    volatileInventory,
    erosionSedimentScale,
  };
}

export function isSolidSurfacePlanetProfile(profile: string): profile is PlanetFoundationSnapshot['planetProfile'] {
  return (SOLID_SURFACE_PROFILES as readonly string[]).includes(profile);
}

function selectPlanetProfile(value: unknown, styleMode: GenerateFoundationInput['styleMode']): PlanetFoundationSnapshot['planetProfile'] {
  if (typeof value === 'string' && isSolidSurfacePlanetProfile(value)) return value;
  if (styleMode === 'ALIEN') return 'ROCKY_ALIEN';
  if (styleMode === 'FANTASY') return 'ARTIFICIAL_OR_FANTASY_SHELL';
  return 'EARTHLIKE_ROCKY';
}

type FoundationDefaults = {
  radiusEarth: number;
  densityEarth: number;
  starLuminositySun: number;
  orbitalDistanceAU: number;
  albedo: number;
  greenhouseStrength: number;
  volatileInventory: number;
  waterInventory: number;
  volatilePressure: number;
  compositionRadioactivity: number;
  tidalHeatingIntent: number;
  coreHeatIntent: number;
  stagnantLidBias: number;
  surfaceSupportMode: PlanetFoundationSnapshot['surfaceSupportMode'];
  surfaceMaterialFamily: PlanetFoundationSnapshot['surfaceMaterialFamily'];
  atmosphereFamily: PlanetFoundationSnapshot['atmosphereFamily'];
  waterPhaseFamily: PlanetFoundationSnapshot['waterPhaseFamily'];
  validLayerStack: string[];
};

function defaultsForProfile(profile: PlanetFoundationSnapshot['planetProfile'], styleMode: GenerateFoundationInput['styleMode']): FoundationDefaults {
  const commonStack = ['PLANET_PROFILE', 'PLANET_SIZE_GRAVITY', 'STELLAR_ENERGY', 'WORLD_CORE_HEAT', 'SURFACE_SUPPORT_MODEL', 'GEOLOGY_STACK_SELECTION', 'BOUNDARY_FEATURES', 'CRUST_MATERIAL', 'TERRAIN_RESPONSE', 'WATER_SURFACE_STATE', 'CLIMATE_HYDROLOGY_BIOME', 'FINAL_RENDER', 'EXPORT'];
  if (profile === 'DWARF_ROCKY_OR_ICY') {
    return baseDefaults({ radiusEarth: 0.42, densityEarth: 0.74, albedo: 0.36, greenhouseStrength: 0.16, volatileInventory: 0.32, waterInventory: 0.28, coreHeatIntent: 0.32, stagnantLidBias: 0.45, surfaceMaterialFamily: 'rock-ice-regolith', waterPhaseFamily: 'ice-limited', validLayerStack: commonStack });
  }
  if (profile === 'SUPER_EARTH_ROCKY') {
    return baseDefaults({ radiusEarth: 1.42, densityEarth: 1.08, albedo: 0.31, greenhouseStrength: 0.36, volatileInventory: 0.64, waterInventory: 0.62, coreHeatIntent: 0.58, surfaceSupportMode: 'LITHOSPHERE', surfaceMaterialFamily: 'rock-sediment-water', waterPhaseFamily: 'liquid-water-rich', validLayerStack: commonStack });
  }
  if (profile === 'ICE_SHELL_OCEAN_WORLD') {
    return baseDefaults({ radiusEarth: 0.38, densityEarth: 0.62, albedo: 0.58, greenhouseStrength: 0.10, volatileInventory: 0.78, waterInventory: 0.82, tidalHeatingIntent: 0.42, coreHeatIntent: 0.38, surfaceSupportMode: 'ICE_SHELL', surfaceMaterialFamily: 'ice-brine-salt', waterPhaseFamily: 'subsurface-ocean', validLayerStack: ['PLANET_PROFILE', 'PLANET_SIZE_GRAVITY', 'STELLAR_ENERGY', 'WORLD_CORE_HEAT', 'SURFACE_SUPPORT_MODEL', 'GEOLOGY_STACK_SELECTION', 'ICE_SHELL_FEATURES', 'TERRAIN_RESPONSE', 'FINAL_RENDER', 'EXPORT'] });
  }
  if (profile === 'VOLATILE_PRESSURE_ROCKY') {
    return baseDefaults({ radiusEarth: 0.92, densityEarth: 0.95, albedo: 0.28, greenhouseStrength: 0.46, volatileInventory: 0.78, waterInventory: 0.46, volatilePressure: 0.62, coreHeatIntent: 0.62, surfaceSupportMode: 'LITHOSPHERE', surfaceMaterialFamily: 'volatile-rich-crust', atmosphereFamily: 'volatile-rich', waterPhaseFamily: 'mixed-volatiles', validLayerStack: commonStack });
  }
  if (profile === 'ARTIFICIAL_OR_FANTASY_SHELL') {
    return baseDefaults({ radiusEarth: 1.0, densityEarth: 0.90, albedo: 0.34, greenhouseStrength: styleMode === 'FANTASY' ? 0.30 : 0.22, volatileInventory: 0.50, waterInventory: 0.50, coreHeatIntent: 0.40, surfaceSupportMode: 'ARTIFICIAL_OR_FANTASY_SHELL', surfaceMaterialFamily: 'declared-shell-material', atmosphereFamily: 'declared', waterPhaseFamily: 'declared', validLayerStack: commonStack });
  }
  if (profile === 'ROCKY_ALIEN') {
    return baseDefaults({ radiusEarth: 0.96, densityEarth: 0.98, albedo: 0.30, greenhouseStrength: 0.30, volatileInventory: 0.52, waterInventory: 0.50, coreHeatIntent: 0.54, surfaceMaterialFamily: 'rock-exotic-sediment', atmosphereFamily: 'alien-terrestrial', waterPhaseFamily: 'conditional-liquid', validLayerStack: commonStack });
  }
  return baseDefaults({ validLayerStack: commonStack });
}

function baseDefaults(overrides: Partial<FoundationDefaults>): FoundationDefaults {
  return {
    radiusEarth: 1.0,
    densityEarth: 1.0,
    starLuminositySun: 1.0,
    orbitalDistanceAU: 1.0,
    albedo: 0.30,
    greenhouseStrength: 0.32,
    volatileInventory: 0.54,
    waterInventory: 0.54,
    volatilePressure: 0.0,
    compositionRadioactivity: 0.50,
    tidalHeatingIntent: 0.0,
    coreHeatIntent: 0.52,
    stagnantLidBias: 0.10,
    surfaceSupportMode: 'ROCKY_CRUST',
    surfaceMaterialFamily: 'rock-soil-sediment-water',
    atmosphereFamily: 'nitrogen-oxygen-proxy',
    waterPhaseFamily: 'liquid-water',
    validLayerStack: [],
    ...overrides,
  };
}

function validLayerStackForPhysical(base: string[], physical: GeneratePhysicalConsequenceResolution): string[] {
  const out = new Set(base);
  out.add('WATER_INVENTORY_PHASE');
  out.add('GEOLOGY_STACK_SELECTION');
  out.add(`GEOLOGY_STACK_${physical.geologyStack}`);
  out.add(`SURFACE_WATER_${physical.surfaceWaterMode}`);
  out.add(`SURFACE_SUPPORT_${physical.surfaceSupportMode}`);
  if (physical.geologyStack === 'ICE_SHELL_TECTONIC') out.add('ICE_SHELL_FEATURES');
  if (physical.geologyStack === 'IMPACT_ANCIENT') out.add('IMPACT_ANCIENT_FEATURES');
  return Array.from(out);
}

function percent01(value: unknown, fallback: number): number {
  return clamp01(number(value, fallback) / 100);
}

function unit01(value: unknown, fallback: number): number {
  const n = number(value, fallback);
  return clamp01(n > 1 ? n / 100 : n);
}

function number(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function normalizeAroundOne(value: number): number {
  return clamp01((value - 0.35) / 1.50);
}

function normalizeRelief(value: number): number {
  return clamp01((value - 0.45) / 1.40);
}

function clamp(value: number, lo: number, hi: number): number {
  return value < lo ? lo : value > hi ? hi : value;
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
