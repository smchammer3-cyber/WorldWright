import { createDefaultGeneratorParams, type GeneratorParams } from './worldGenerator';
import {
  allowsNormalContinentalMorphology,
  allowsNormalRockyCrustTerrain,
  allowsPlateBoundaryFeatureTerrain,
} from './generatePhysicalConsequenceResolver';
import type { WorldBrain } from './worldSchema';

export type GenerateRuntimeStageId =
  | 'RAW_GENERATOR'
  | 'CONTINENT_FIELDS'
  | 'PLATE_BOUNDARY_FEATURE_TERRAIN'
  | 'SKELETON_ELEVATION'
  | 'FIRST_RECOMPUTE'
  | 'QUALITY_PASS'
  | 'SECOND_RECOMPUTE'
  | 'CRUST_CONTINENT_RESEED'
  | 'CRUST_FIELDS'
  | 'ISOSTATIC_TERRAIN_RESPONSE'
  | 'CRUST_TERRAIN_INFLUENCE'
  | 'OCEAN_BATHYMETRY_SMOOTHING'
  | 'FINAL_RECOMPUTE'
  | 'FINAL_CONTINENT_RESEED'
  | 'FINAL_CRUST_RESEED';

export type GenerateRuntimeStagePhase =
  | 'source'
  | 'cause-seed'
  | 'terrain-shape'
  | 'derived-recompute'
  | 'terrain-cleanup'
  | 'feature-material'
  | 'terminal-sync';

export type GenerateRuntimeGateSummary = {
  geologyStack: NonNullable<WorldBrain['planetFoundation']>['geologyStack'];
  surfaceWaterMode: NonNullable<WorldBrain['planetFoundation']>['surfaceWaterMode'];
  allowContinents: boolean;
  allowRockyCrust: boolean;
  allowPlateFeatures: boolean;
  allowNormalOceanBathymetry: boolean;
};

export type GenerateRuntimeStagePlanEntry = {
  id: GenerateRuntimeStageId;
  label: string;
  phase: GenerateRuntimeStagePhase;
  reason: string;
};

export type GenerateRuntimeBlockedStage = {
  id: GenerateRuntimeStageId;
  label: string;
  blockedBy: keyof GenerateRuntimeGateSummary;
  reason: string;
};

export type GenerateRuntimeStagePlan = {
  seed: string;
  grid: string;
  params: GeneratorParams;
  gates: GenerateRuntimeGateSummary;
  stages: GenerateRuntimeStagePlanEntry[];
  blockedStages: GenerateRuntimeBlockedStage[];
};

export function generatorParamsFromRuntimeWorld(world: WorldBrain): GeneratorParams {
  const defaults = createDefaultGeneratorParams();
  const p = world.parameters ?? {};
  return {
    width: intParam(p.width, world.gridWidth, defaults.width),
    height: intParam(p.height, world.gridHeight, defaults.height),
    seaLevel: numberParam(p.seaLevel, world.seaLevel ?? defaults.seaLevel),
    seaLevelOffset: numberParam(p.seaLevelOffset, world.planetFoundation?.seaLevelOffset != null ? world.planetFoundation.seaLevelOffset * 100 : defaults.seaLevelOffset ?? defaults.seaLevel),
    waterInventory: numberParam(p.waterInventory, world.planetFoundation?.waterInventory ?? defaults.waterInventory ?? 0.54),
    plateActivity: numberParam(p.plateActivity, defaults.plateActivity),
    axisTilt: numberParam(p.axisTilt, defaults.axisTilt),
    planetAge: numberParam(p.planetAge, defaults.planetAge),
    climateVar: numberParam(p.climateVar, defaults.climateVar),
    moistureLevel: numberParam(p.moistureLevel, defaults.moistureLevel),
    temperatureOffset: numberParam(p.temperatureOffset, defaults.temperatureOffset),
    erosionIntensity: numberParam(p.erosionIntensity, defaults.erosionIntensity),
    continentCount: numberParam(p.continentCount, defaults.continentCount),
    seed: typeof p.seed === 'string' || typeof p.seed === 'number' ? p.seed : world.metadata?.seed ?? defaults.seed,
    styleMode: isStyleMode(p.styleMode) ? p.styleMode : world.metadata?.styleMode ?? defaults.styleMode,
    planetProfile: isPlanetProfile(p.planetProfile) ? p.planetProfile : world.planetFoundation?.planetProfile ?? defaults.planetProfile,
    planetRadiusEarth: numberParam(p.planetRadiusEarth, world.planetFoundation?.planetRadiusEarth ?? defaults.planetRadiusEarth ?? 1),
    planetDensityEarth: numberParam(p.planetDensityEarth, world.planetFoundation?.planetDensityEarth ?? defaults.planetDensityEarth ?? 1),
    starLuminositySun: numberParam(p.starLuminositySun, world.planetFoundation?.starLuminositySun ?? defaults.starLuminositySun ?? 1),
    orbitalDistanceAU: numberParam(p.orbitalDistanceAU, world.planetFoundation?.orbitalDistanceAU ?? defaults.orbitalDistanceAU ?? 1),
    albedo: numberParam(p.albedo, world.planetFoundation?.albedo ?? defaults.albedo ?? 0.30),
    greenhouseStrength: numberParam(p.greenhouseStrength, world.planetFoundation?.greenhouseStrength ?? defaults.greenhouseStrength ?? 0.32),
    volatileInventory: numberParam(p.volatileInventory, world.planetFoundation?.volatileInventory ?? defaults.volatileInventory ?? 0.54),
    coreHeatIntent: numberParam(p.coreHeatIntent, defaults.coreHeatIntent ?? 0.52),
    tidalHeatingIntent: numberParam(p.tidalHeatingIntent, world.planetFoundation?.tidalHeatingIndex ?? defaults.tidalHeatingIntent ?? 0),
    stagnantLidBias: numberParam(p.stagnantLidBias, defaults.stagnantLidBias ?? 0.10),
    compositionRadioactivity: numberParam(p.compositionRadioactivity, defaults.compositionRadioactivity ?? 0.50),
  };
}

export function computeGenerateRuntimeGates(world: WorldBrain): GenerateRuntimeGateSummary {
  const geologyStack = world.planetFoundation?.geologyStack ?? 'PLATE_TECTONIC';
  const surfaceWaterMode = world.planetFoundation?.surfaceWaterMode ?? 'LIQUID_SURFACE_WATER';
  return {
    geologyStack,
    surfaceWaterMode,
    allowContinents: allowsNormalContinentalMorphology(geologyStack),
    allowRockyCrust: allowsNormalRockyCrustTerrain(geologyStack),
    allowPlateFeatures: allowsPlateBoundaryFeatureTerrain(geologyStack),
    allowNormalOceanBathymetry: surfaceWaterMode === 'LIQUID_SURFACE_WATER' || surfaceWaterMode === 'MIXED_LIQUID_ICE',
  };
}

export function buildGenerateRuntimeStagePlan(world: WorldBrain): GenerateRuntimeStagePlan {
  const params = generatorParamsFromRuntimeWorld(world);
  const gates = computeGenerateRuntimeGates(world);
  const stages: GenerateRuntimeStagePlanEntry[] = [];
  const blockedStages: GenerateRuntimeBlockedStage[] = [];

  const run = (id: GenerateRuntimeStageId, label: string, phase: GenerateRuntimeStagePhase, reason: string): void => {
    stages.push({ id, label, phase, reason });
  };
  const block = (id: GenerateRuntimeStageId, label: string, blockedBy: keyof GenerateRuntimeGateSummary, reason: string): void => {
    blockedStages.push({ id, label, blockedBy, reason });
  };

  run('RAW_GENERATOR', 'Raw generator', 'source', 'Initial generator source state before generated geography pipeline.');

  if (gates.allowContinents) run('CONTINENT_FIELDS', 'Continent fields', 'cause-seed', 'Runtime seeds normal continent/shelf/ocean-basin morphology for this geology stack.');
  else block('CONTINENT_FIELDS', 'Continent fields', 'allowContinents', `Blocked for geology stack ${gates.geologyStack}.`);

  if (gates.allowPlateFeatures) run('PLATE_BOUNDARY_FEATURE_TERRAIN', 'Plate feature terrain', 'terrain-shape', 'Runtime applies explicit plate-boundary feature terrain for active plate/rift stacks.');
  else block('PLATE_BOUNDARY_FEATURE_TERRAIN', 'Plate feature terrain', 'allowPlateFeatures', `Blocked for geology stack ${gates.geologyStack}.`);

  if (gates.allowContinents) run('SKELETON_ELEVATION', 'Skeleton elevation', 'terrain-shape', 'Runtime applies broad normal continent/ocean morphology terrain guidance.');
  else block('SKELETON_ELEVATION', 'Skeleton elevation', 'allowContinents', `Blocked for geology stack ${gates.geologyStack}.`);

  run('FIRST_RECOMPUTE', 'First recompute', 'derived-recompute', 'Runtime always refreshes derived state after initial generated terrain stages.');

  if (gates.allowContinents || gates.allowRockyCrust) run('QUALITY_PASS', 'Quality pass', 'terrain-cleanup', 'Runtime applies generated terrain quality cleanup for normal continent or rocky-crust stacks.');
  else block('QUALITY_PASS', 'Quality pass', 'allowRockyCrust', `Blocked because neither normal continents nor rocky crust are legal for ${gates.geologyStack}.`);

  run('SECOND_RECOMPUTE', 'Second recompute', 'derived-recompute', 'Runtime always refreshes derived state after the quality pass gate.');

  if (gates.allowContinents) run('CRUST_CONTINENT_RESEED', 'Crust continent reseed', 'cause-seed', 'Runtime reseeds normal continent morphology before crust/material fields. This remains a known backward-feedback risk.');
  else block('CRUST_CONTINENT_RESEED', 'Crust continent reseed', 'allowContinents', `Blocked for geology stack ${gates.geologyStack}.`);

  if (gates.allowRockyCrust) {
    run('CRUST_FIELDS', 'Crust fields', 'feature-material', 'Runtime seeds normal rocky crust/material fields.');
    run('ISOSTATIC_TERRAIN_RESPONSE', 'Isostatic terrain', 'terrain-shape', 'Runtime applies material/feature/gravity terrain response.');
    run('CRUST_TERRAIN_INFLUENCE', 'Crust terrain influence', 'terrain-shape', 'Runtime calls the bundled crust terrain influence pass exactly as production does today.');
  } else {
    block('CRUST_FIELDS', 'Crust fields', 'allowRockyCrust', `Blocked for geology stack ${gates.geologyStack}.`);
    block('ISOSTATIC_TERRAIN_RESPONSE', 'Isostatic terrain', 'allowRockyCrust', `Blocked for geology stack ${gates.geologyStack}.`);
    block('CRUST_TERRAIN_INFLUENCE', 'Crust terrain influence', 'allowRockyCrust', `Blocked for geology stack ${gates.geologyStack}.`);
  }

  if (gates.allowNormalOceanBathymetry) run('OCEAN_BATHYMETRY_SMOOTHING', 'Ocean bathy', 'terrain-cleanup', 'Runtime applies normal liquid-ocean bathymetry cleanup only for liquid surface-water modes.');
  else block('OCEAN_BATHYMETRY_SMOOTHING', 'Ocean bathy', 'allowNormalOceanBathymetry', `Blocked for surface water mode ${gates.surfaceWaterMode}.`);

  run('FINAL_RECOMPUTE', 'Final recompute', 'derived-recompute', 'Runtime always refreshes final derived state after generated terrain passes.');

  if (gates.allowContinents) run('FINAL_CONTINENT_RESEED', 'Final continent reseed', 'terminal-sync', 'Runtime final normal continent explanation sync; no later terrain writer may consume it.');
  else block('FINAL_CONTINENT_RESEED', 'Final continent reseed', 'allowContinents', `Blocked for geology stack ${gates.geologyStack}.`);

  if (gates.allowRockyCrust) run('FINAL_CRUST_RESEED', 'Final crust reseed', 'terminal-sync', 'Runtime final rocky crust/province explanation sync; no later terrain writer may consume it.');
  else block('FINAL_CRUST_RESEED', 'Final crust reseed', 'allowRockyCrust', `Blocked for geology stack ${gates.geologyStack}.`);

  return { seed: String(params.seed), grid: `${params.width}×${params.height}`, params, gates, stages, blockedStages };
}

function intParam(primary: unknown, fallback: unknown, defaultValue: number): number {
  const value = numberParam(primary, typeof fallback === 'number' ? fallback : defaultValue);
  return Math.floor(value);
}

function numberParam(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function isStyleMode(value: unknown): value is GeneratorParams['styleMode'] {
  return value === 'EARTHLIKE' || value === 'FANTASY' || value === 'STYLIZED' || value === 'ALIEN';
}

function isPlanetProfile(value: unknown): value is NonNullable<GeneratorParams['planetProfile']> {
  return value === 'EARTHLIKE_ROCKY'
    || value === 'ROCKY_ALIEN'
    || value === 'VOLATILE_PRESSURE_ROCKY'
    || value === 'ICE_SHELL_OCEAN_WORLD'
    || value === 'DWARF_ROCKY_OR_ICY'
    || value === 'SUPER_EARTH_ROCKY'
    || value === 'ARTIFICIAL_OR_FANTASY_SHELL';
}
