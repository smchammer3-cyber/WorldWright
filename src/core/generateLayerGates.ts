// WorldWright Generate Mode layer gate registry.
// Blueprint sources:
// - WORLDWRIGHT_BLUEPRINT_GENERATE_LAYER_GATES.md
// - WORLDWRIGHT_BLUEPRINT_PHYSICAL_LAYER_MATH.md
// - WORLDWRIGHT_BLUEPRINT_PLANET_FOUNDATION_LAYERS.md
//
// This file is declarative only. It does not change generation behavior.

import type { GeneratePlanetProfileId } from './generatePlanetProfileContract';

export type GenerateLayerStatus = 'implemented' | 'partial' | 'planned' | 'deprecated';
export type GenerateLayerPhase =
  | 'planet-setup'
  | 'deep-engine'
  | 'support-model'
  | 'tectonic-geology'
  | 'feature-authority'
  | 'material-fields'
  | 'terrain-response'
  | 'water-surface'
  | 'climate-weather-hydrology'
  | 'biome-ecology'
  | 'presentation-output'
  | 'diagnostics';

export type GenerateLayerGate = {
  readonly id: string;
  readonly label: string;
  readonly status: GenerateLayerStatus;
  readonly phase: GenerateLayerPhase;
  readonly validPlanetProfiles: readonly GeneratePlanetProfileId[] | 'ALL';
  readonly requires: readonly string[];
  readonly allowedReads: readonly string[];
  readonly allowedWrites: readonly string[];
  readonly forbiddenReadsWhileWritingTerrain: readonly string[];
  readonly forbiddenReadsWhileWritingColor: readonly string[];
  readonly shiftedBySliders: readonly string[];
  readonly softPhysicalBands: readonly string[];
  readonly hardAuthorityRules: readonly string[];
  readonly runsBefore: readonly string[];
  readonly runsAfter: readonly string[];
  readonly terminal: boolean;
  readonly notes: readonly string[];
};

const ALL_PROFILES = 'ALL' as const;
const ROCKY_PROFILES: readonly GeneratePlanetProfileId[] = [
  'EARTHLIKE_ROCKY',
  'ROCKY_ALIEN',
  'VOLATILE_PRESSURE_ROCKY',
  'DWARF_ROCKY_OR_ICY',
  'SUPER_EARTH_ROCKY',
  'ARTIFICIAL_OR_FANTASY_SHELL',
];
const TERRESTRIAL_PROFILES: readonly GeneratePlanetProfileId[] = [
  'EARTHLIKE_ROCKY',
  'ROCKY_ALIEN',
  'VOLATILE_PRESSURE_ROCKY',
  'SUPER_EARTH_ROCKY',
  'ARTIFICIAL_OR_FANTASY_SHELL',
];

const HARD_IDENTITY_RULES = [
  'plateId cannot directly write terrain',
  'plateId cannot directly write final color',
  'crustProvince cannot directly write terrain',
  'crustProvince cannot directly write final color',
  'derived labels cannot become upstream causes without registered feature/material conversion',
] as const;

export const GENERATE_LAYER_GATES: readonly GenerateLayerGate[] = [
  {
    id: 'PLANET_PROFILE',
    label: 'Planet profile / legal stack',
    status: 'planned',
    phase: 'planet-setup',
    validPlanetProfiles: ALL_PROFILES,
    requires: [],
    allowedReads: ['styleMode', 'planetProfileIntent'],
    allowedWrites: ['planetProfile', 'interiorProfile', 'validLayerStack', 'surfaceSupportMode', 'surfaceMaterialFamily', 'atmosphereFamily', 'waterPhaseFamily'],
    forbiddenReadsWhileWritingTerrain: ['plateId', 'crustProvince', 'continentId', 'oceanBasinId'],
    forbiddenReadsWhileWritingColor: ['plateId', 'crustProvince', 'continentId', 'oceanBasinId'],
    shiftedBySliders: ['PLANET_PROFILE', 'STYLE_MODE'],
    softPhysicalBands: ['validPlanetProfileLayerSet'],
    hardAuthorityRules: ['selected planet profile determines which later layers are legal'],
    runsBefore: ['PLANET_SIZE_GRAVITY', 'STELLAR_ENERGY', 'WORLD_CORE_HEAT'],
    runsAfter: [],
    terminal: false,
    notes: ['Generate Mode should start with the kind of planet being generated, not with plates.'],
  },
  {
    id: 'PLANET_SIZE_GRAVITY',
    label: 'Size, density, mass, gravity',
    status: 'planned',
    phase: 'planet-setup',
    validPlanetProfiles: ALL_PROFILES,
    requires: ['PLANET_PROFILE'],
    allowedReads: ['planetProfile', 'planetRadiusEarth', 'planetDensityEarth'],
    allowedWrites: ['planetRadiusEarth', 'planetDensityEarth', 'planetMassEarth', 'surfaceGravityEarth', 'escapeVelocityEarth', 'reliefGravityScale', 'atmosphereRetentionIndex'],
    forbiddenReadsWhileWritingTerrain: ['plateId', 'crustProvince', 'baseBiomeId'],
    forbiddenReadsWhileWritingColor: ['plateId', 'crustProvince'],
    shiftedBySliders: ['PLANET_SIZE_GRAVITY', 'STYLE_MODE'],
    softPhysicalBands: ['reliefHeightTolerance', 'slopeTolerance', 'atmosphereRetention', 'hydrologyPersistence', 'exportHeightScaling'],
    hardAuthorityRules: ['gravity may shift expectations but cannot directly paint terrain/color'],
    runsBefore: ['ATMOSPHERE_RETENTION', 'TERRAIN_RESPONSE', 'EXPORT'],
    runsAfter: ['PLANET_PROFILE'],
    terminal: false,
    notes: ['Uses Earth-relative mass/gravity/escape-velocity proxy formulas.'],
  },
  {
    id: 'STELLAR_ENERGY',
    label: 'Stellar energy, albedo, greenhouse',
    status: 'planned',
    phase: 'planet-setup',
    validPlanetProfiles: ALL_PROFILES,
    requires: ['PLANET_PROFILE'],
    allowedReads: ['starLuminositySun', 'orbitalDistanceAU', 'albedo', 'greenhouseStrength'],
    allowedWrites: ['stellarFluxEarth', 'surfaceAbsorbedFlux', 'effectiveHeatIndex', 'evaporationPotential', 'snowlineBias'],
    forbiddenReadsWhileWritingTerrain: ['plateId', 'crustProvince', 'baseHeight'],
    forbiddenReadsWhileWritingColor: ['plateId', 'crustProvince'],
    shiftedBySliders: ['SOLAR_INPUT', 'GREENHOUSE', 'ALBEDO', 'TEMPERATURE_OFFSET_CURRENT'],
    softPhysicalBands: ['meanTemperature', 'evaporationPotential', 'snowIceShare', 'biomeTemperatureBands'],
    hardAuthorityRules: ['stellar energy may drive climate but not terrain/color directly'],
    runsBefore: ['CLIMATE_FORCING', 'ATMOSPHERE_RETENTION', 'BIOME_ECOLOGY'],
    runsAfter: ['PLANET_PROFILE'],
    terminal: false,
    notes: ['Uses stellarFluxEarth = starLuminositySun / orbitalDistanceAU^2.'],
  },
  {
    id: 'WORLD_CORE_HEAT',
    label: 'World core / internal heat',
    status: 'planned',
    phase: 'deep-engine',
    validPlanetProfiles: ALL_PROFILES,
    requires: ['PLANET_PROFILE', 'PLANET_SIZE_GRAVITY'],
    allowedReads: ['planetProfile', 'planetMassEarth', 'planetRadiusEarth', 'thermalAge', 'tidalHeatingIndex'],
    allowedWrites: ['coreHeat', 'mantleHeat', 'radiogenicHeat', 'primordialHeat', 'thermalAge', 'tidalHeatingIndex', 'heatFlowIndex'],
    forbiddenReadsWhileWritingTerrain: ['plateId', 'crustProvince', 'baseHeight'],
    forbiddenReadsWhileWritingColor: ['plateId', 'crustProvince'],
    shiftedBySliders: ['CORE_HEAT', 'PLANET_AGE_CURRENT', 'PLANET_THERMAL_AGE'],
    softPhysicalBands: ['heatFlowIndex', 'volcanicActivityFrequency', 'riftLikelihood', 'hotspotActivity'],
    hardAuthorityRules: ['core heat must become feature/material authority before terrain response'],
    runsBefore: ['MANTLE_VOLATILE_HOTSPOT', 'PLATE_SHELL', 'CRUST_MATERIAL'],
    runsAfter: ['PLANET_SIZE_GRAVITY'],
    terminal: false,
    notes: ['Deep thermal engine; never directly writes height, color, or biome.'],
  },
  {
    id: 'MANTLE_VOLATILE_HOTSPOT',
    label: 'Mantle, volatiles, hotspots',
    status: 'planned',
    phase: 'deep-engine',
    validPlanetProfiles: ['ROCKY_ALIEN', 'VOLATILE_PRESSURE_ROCKY', 'ICE_SHELL_OCEAN_WORLD', 'DWARF_ROCKY_OR_ICY', 'SUPER_EARTH_ROCKY', 'ARTIFICIAL_OR_FANTASY_SHELL'],
    requires: ['WORLD_CORE_HEAT'],
    allowedReads: ['coreHeat', 'mantleHeat', 'heatFlowIndex', 'volatileReservoir', 'tidalHeatingIndex'],
    allowedWrites: ['mantleConvectionIndex', 'hotspotPotential', 'plumeCenterCandidates', 'volatilePressure', 'volatileReservoir', 'outgassingPotential', 'riftWeakness', 'crustInstability'],
    forbiddenReadsWhileWritingTerrain: ['plateId', 'crustProvince', 'baseHeight'],
    forbiddenReadsWhileWritingColor: ['plateId', 'crustProvince'],
    shiftedBySliders: ['CORE_HEAT', 'VOLATILE_INVENTORY', 'PLANET_THERMAL_AGE'],
    softPhysicalBands: ['hotspotActivity', 'volatilePressure', 'outgassingPotential', 'riftLikelihood'],
    hardAuthorityRules: ['volatile pressure requires solid/ice/artificial support before land can exist'],
    runsBefore: ['SURFACE_SUPPORT_MODEL', 'BOUNDARY_FEATURES', 'CRUST_MATERIAL'],
    runsAfter: ['WORLD_CORE_HEAT'],
    terminal: false,
    notes: ['Creates valid cause signals for hotspots, vents, domes, rifts, and volatile-pressure terrain response.'],
  },
  {
    id: 'SURFACE_SUPPORT_MODEL',
    label: 'Surface support model',
    status: 'planned',
    phase: 'support-model',
    validPlanetProfiles: ALL_PROFILES,
    requires: ['PLANET_PROFILE'],
    allowedReads: ['planetProfile', 'surfaceSupportMode', 'volatilePressure', 'iceShellThickness'],
    allowedWrites: ['surfaceSupportMode', 'surfaceMaterialFamily', 'iceShellThickness', 'lithosphereStrength'],
    forbiddenReadsWhileWritingTerrain: ['plateId', 'crustProvince'],
    forbiddenReadsWhileWritingColor: ['plateId', 'crustProvince'],
    shiftedBySliders: ['PLANET_PROFILE', 'VOLATILE_INVENTORY', 'PLANET_SIZE_GRAVITY'],
    softPhysicalBands: ['supportShellValidity', 'shellStrength', 'iceShellThickness'],
    hardAuthorityRules: ['landmass terrain requires rocky, lithosphere, ice, artificial, or fantasy support shell'],
    runsBefore: ['TERRAIN_RESPONSE'],
    runsAfter: ['PLANET_PROFILE'],
    terminal: false,
    notes: ['Prevents gas/cloud interiors from accidentally running normal landmass terrain.'],
  },
  {
    id: 'PLATE_SHELL',
    label: 'Plate shell / tectonic ownership',
    status: 'partial',
    phase: 'tectonic-geology',
    validPlanetProfiles: TERRESTRIAL_PROFILES,
    requires: ['PLANET_PROFILE', 'WORLD_CORE_HEAT'],
    allowedReads: ['planetProfile', 'heatFlowIndex', 'surfaceGravityEarth', 'plateFragmentationIntent'],
    allowedWrites: ['plateId', 'plateType', 'plateVelocityMagnitude', 'boundaryGraph'],
    forbiddenReadsWhileWritingTerrain: ['plateId', 'crustProvince'],
    forbiddenReadsWhileWritingColor: ['plateId', 'crustProvince'],
    shiftedBySliders: ['PLATE_ACTIVITY_CURRENT', 'PLATE_FRAGMENTATION', 'BOUNDARY_COMPLEXITY', 'CORE_HEAT'],
    softPhysicalBands: ['majorPlateCount', 'plateAreaCoefficientOfVariation', 'largestPlateShare', 'straightBoundaryRunFraction'],
    hardAuthorityRules: ['plateId is hidden identity; it cannot directly own terrain or final color'],
    runsBefore: ['BOUNDARY_FEATURES', 'CRUST_MATERIAL'],
    runsAfter: ['WORLD_CORE_HEAT'],
    terminal: false,
    notes: ['Current implementation exists, but mature target requires hierarchical unequal plates and motion-classified boundaries.'],
  },
  {
    id: 'BOUNDARY_FEATURES',
    label: 'Boundary feature authority',
    status: 'planned',
    phase: 'feature-authority',
    validPlanetProfiles: ROCKY_PROFILES,
    requires: ['PLATE_SHELL'],
    allowedReads: ['plateType', 'boundaryGraph', 'plateVelocityMagnitude', 'heatFlowIndex'],
    allowedWrites: ['boundaryType', 'upliftRate', 'volcanicActivity', 'ridgeFeature', 'trenchFeature', 'riftFeature', 'arcFeature', 'transformFeature'],
    forbiddenReadsWhileWritingTerrain: ['plateId', 'crustProvince'],
    forbiddenReadsWhileWritingColor: ['plateId', 'crustProvince'],
    shiftedBySliders: ['TECTONIC_ENERGY', 'PLATE_ACTIVITY_CURRENT', 'BOUNDARY_COMPLEXITY'],
    softPhysicalBands: ['boundaryFeatureMappedShare', 'visibleBoundaryReliefFeatureSupported', 'unexplainedBoundaryReliefShare'],
    hardAuthorityRules: ['visible boundary relief must be feature-backed, not raw plate-backed'],
    runsBefore: ['CRUST_MATERIAL', 'TERRAIN_RESPONSE'],
    runsAfter: ['PLATE_SHELL'],
    terminal: false,
    notes: ['Converts plate motion/boundary relationships into explicit geologic features.'],
  },
  {
    id: 'CONTINENTAL_MORPHOLOGY',
    label: 'Continental morphology / skeleton',
    status: 'partial',
    phase: 'feature-authority',
    validPlanetProfiles: TERRESTRIAL_PROFILES,
    requires: ['PLANET_PROFILE', 'SURFACE_SUPPORT_MODEL'],
    allowedReads: ['planetProfile', 'surfaceSupportMode', 'continentalAssemblyIntent', 'continentalFragmentationIntent'],
    allowedWrites: ['continentality', 'continentCoreStrength', 'shelfStrength', 'marginType', 'islandCause', 'continentId', 'oceanBasinId'],
    forbiddenReadsWhileWritingTerrain: ['continentId', 'oceanBasinId', 'plateId', 'crustProvince'],
    forbiddenReadsWhileWritingColor: ['continentId', 'oceanBasinId', 'plateId', 'crustProvince'],
    shiftedBySliders: ['CONTINENT_COUNT_CURRENT', 'CONTINENTAL_ASSEMBLY', 'CONTINENTAL_FRAGMENTATION', 'WATER_INVENTORY'],
    softPhysicalBands: ['continentalityStdDev', 'shelfHaloAttachedToContinentality', 'skeletonToCurrentLandMaskCoupling'],
    hardAuthorityRules: ['continentId and oceanBasinId are labels; morphology fields are the valid cause'],
    runsBefore: ['CRUST_MATERIAL', 'TERRAIN_RESPONSE', 'WATER_SURFACE_STATE'],
    runsAfter: ['SURFACE_SUPPORT_MODEL'],
    terminal: false,
    notes: ['Skeleton must be a broad morphology field, not an exact land-mask repair authority.'],
  },
  {
    id: 'CRUST_MATERIAL',
    label: 'Crust / shell material fields',
    status: 'partial',
    phase: 'material-fields',
    validPlanetProfiles: ROCKY_PROFILES,
    requires: ['BOUNDARY_FEATURES', 'CONTINENTAL_MORPHOLOGY'],
    allowedReads: ['boundaryType', 'upliftRate', 'volcanicActivity', 'continentality', 'shelfStrength', 'heatFlowIndex', 'surfaceGravityEarth'],
    allowedWrites: ['crustThickness', 'crustAge', 'crustBuoyancy', 'crustDensity', 'crustStrength', 'crustHeat', 'erodibility', 'sedimentTendency', 'crustProvince'],
    forbiddenReadsWhileWritingTerrain: ['crustProvince', 'plateId', 'continentId', 'oceanBasinId'],
    forbiddenReadsWhileWritingColor: ['crustProvince', 'plateId', 'continentId', 'oceanBasinId'],
    shiftedBySliders: ['PLANET_THERMAL_AGE', 'CORE_HEAT', 'TECTONIC_ENERGY', 'SURFACE_MATURITY'],
    softPhysicalBands: ['meanContinentalCrustThickness', 'meanOceanicCrustThickness', 'continentalMinusOceanicThickness', 'crustAgeSpread'],
    hardAuthorityRules: ['crustProvince is debug/explanation label and cannot directly switch terrain/color'],
    runsBefore: ['TERRAIN_RESPONSE', 'WATER_SURFACE_STATE'],
    runsAfter: ['BOUNDARY_FEATURES', 'CONTINENTAL_MORPHOLOGY'],
    terminal: false,
    notes: ['Material fields, not province labels, should drive isostatic/material terrain response.'],
  },
  {
    id: 'TERRAIN_RESPONSE',
    label: 'Terrain response',
    status: 'partial',
    phase: 'terrain-response',
    validPlanetProfiles: ALL_PROFILES,
    requires: ['SURFACE_SUPPORT_MODEL', 'MATERIAL_FIELDS_OR_EQUIVALENT'],
    allowedReads: ['surfaceSupportMode', 'surfaceGravityEarth', 'crustThickness', 'crustAge', 'crustBuoyancy', 'upliftRate', 'volcanicActivity', 'shelfStrength', 'hotspotPotential', 'volatilePressure'],
    allowedWrites: ['baseHeight', 'simHeightDelta'],
    forbiddenReadsWhileWritingTerrain: ['plateId', 'continentId', 'oceanBasinId', 'crustProvince', 'oceanDepthClass', 'baseBiomeId'],
    forbiddenReadsWhileWritingColor: ['plateId', 'continentId', 'oceanBasinId', 'crustProvince'],
    shiftedBySliders: ['TECTONIC_ENERGY', 'PLANET_SIZE_GRAVITY', 'CORE_HEAT', 'SURFACE_MATURITY', 'EROSION_INTENSITY_CURRENT'],
    softPhysicalBands: ['hypsometricSeparationZ', 'bimodalitySeparation', 'globalHeightStdDev', 'featureSupportedExtremeShare', 'uncausedSingleCellSpikeShare'],
    hardAuthorityRules: ['terrain must be caused by registered feature/material/support fields'],
    runsBefore: ['WATER_SURFACE_STATE', 'CLIMATE_HYDROLOGY_BIOME', 'FINAL_RENDER', 'EXPORT'],
    runsAfter: ['CRUST_MATERIAL', 'SURFACE_SUPPORT_MODEL'],
    terminal: false,
    notes: ['The main height solve. Later meaningful height writes require explicit terrain-response sublayers.'],
  },
  {
    id: 'WATER_SURFACE_STATE',
    label: 'Water state / sea level / ocean classes',
    status: 'partial',
    phase: 'water-surface',
    validPlanetProfiles: ALL_PROFILES,
    requires: ['TERRAIN_RESPONSE', 'STELLAR_ENERGY'],
    allowedReads: ['baseHeight', 'seaLevel', 'waterInventory', 'surfaceGravityEarth', 'effectiveHeatIndex'],
    allowedWrites: ['isWater', 'oceanDepthClass', 'surfaceWaterState', 'snowCover'],
    forbiddenReadsWhileWritingTerrain: ['plateId', 'crustProvince', 'continentId', 'oceanBasinId'],
    forbiddenReadsWhileWritingColor: ['plateId', 'crustProvince'],
    shiftedBySliders: ['SEA_LEVEL_CURRENT', 'WATER_INVENTORY', 'SEA_LEVEL_OFFSET', 'SOLAR_INPUT', 'GREENHOUSE'],
    softPhysicalBands: ['landCoverage', 'shelfClassShareOfOcean', 'slopeClassShareOfOcean', 'abyssalClassShareOfOcean', 'trenchClassShareOfOcean'],
    hardAuthorityRules: ['oceanDepthClass is derived and cannot prove ocean feature authority by itself'],
    runsBefore: ['CLIMATE_HYDROLOGY_BIOME', 'FINAL_RENDER'],
    runsAfter: ['TERRAIN_RESPONSE'],
    terminal: false,
    notes: ['Water follows terrain/sea-level/water-inventory; it should not be upstream terrain cause.'],
  },
  {
    id: 'CLIMATE_HYDROLOGY_BIOME',
    label: 'Climate, weather, hydrology, biome chain',
    status: 'partial',
    phase: 'climate-weather-hydrology',
    validPlanetProfiles: ALL_PROFILES,
    requires: ['STELLAR_ENERGY', 'WATER_SURFACE_STATE', 'TERRAIN_RESPONSE', 'ATMOSPHERE_RETENTION'],
    allowedReads: ['stellarFluxEarth', 'greenhouseStrength', 'albedo', 'surfaceGravityEarth', 'baseHeight', 'isWater', 'oceanDepthClass', 'temperature', 'rainfall', 'flowAccumulation', 'snowCover'],
    allowedWrites: ['temperature', 'rainfall', 'snowCover', 'flowDirection', 'flowAccumulation', 'basinId', 'soilMoisture', 'baseBiomeId', 'editBiomeId'],
    forbiddenReadsWhileWritingTerrain: ['plateId', 'crustProvince', 'continentId', 'oceanBasinId'],
    forbiddenReadsWhileWritingColor: ['plateId', 'crustProvince', 'continentId', 'oceanBasinId'],
    shiftedBySliders: ['AXIS_TILT', 'CLIMATE_VARIABILITY', 'MOISTURE_LEVEL', 'TEMPERATURE_OFFSET_CURRENT', 'SOLAR_INPUT', 'GREENHOUSE', 'ALBEDO'],
    softPhysicalBands: ['latitudeTemperatureGradient', 'rainfallMean', 'riverDensity', 'wetBiomeShare', 'dryBiomeShare', 'snowLandFraction'],
    hardAuthorityRules: ['biomes may only derive through climate/water/hydrology/surface fields, not hidden identity'],
    runsBefore: ['FINAL_RENDER'],
    runsAfter: ['WATER_SURFACE_STATE'],
    terminal: false,
    notes: ['Placeholder umbrella until atmospheric circulation, moisture transport, hydrology, and biome sublayers are split.'],
  },
  {
    id: 'FINAL_RENDER',
    label: 'Final render / visible color',
    status: 'implemented',
    phase: 'presentation-output',
    validPlanetProfiles: ALL_PROFILES,
    requires: ['TERRAIN_RESPONSE', 'WATER_SURFACE_STATE', 'CLIMATE_HYDROLOGY_BIOME'],
    allowedReads: ['baseHeight', 'isWater', 'oceanDepthClass', 'temperature', 'rainfall', 'snowCover', 'baseBiomeId', 'surfaceType', 'volcanicActivity'],
    allowedWrites: ['finalColor'],
    forbiddenReadsWhileWritingTerrain: ['plateId', 'crustProvince', 'continentId', 'oceanBasinId'],
    forbiddenReadsWhileWritingColor: ['plateId', 'crustProvince', 'continentId', 'oceanBasinId'],
    shiftedBySliders: ['STYLE_MODE', 'MOISTURE_LEVEL', 'TEMPERATURE_OFFSET_CURRENT', 'SOLAR_INPUT', 'GREENHOUSE', 'ALBEDO'],
    softPhysicalBands: ['finalColorSurfaceExplainedJumpShare', 'finalColorPlateImprint', 'finalColorProvinceImprint', 'hiddenLeakShare'],
    hardAuthorityRules: ['final color must be explained by visible surface/climate/biome/terrain, not hidden raw labels'],
    runsBefore: ['EXPORT', 'DIAGNOSTICS'],
    runsAfter: ['CLIMATE_HYDROLOGY_BIOME'],
    terminal: false,
    notes: ['Renderer follows the visible state; it must not reinterpret hidden labels.'],
  },
  {
    id: 'EXPORT',
    label: 'Export height/output safety',
    status: 'implemented',
    phase: 'presentation-output',
    validPlanetProfiles: ALL_PROFILES,
    requires: ['TERRAIN_RESPONSE', 'FINAL_RENDER'],
    allowedReads: ['baseHeight', 'finalColor', 'surfaceGravityEarth'],
    allowedWrites: ['exportHeight', 'exportMetadata'],
    forbiddenReadsWhileWritingTerrain: ['plateId', 'crustProvince', 'continentId', 'oceanBasinId'],
    forbiddenReadsWhileWritingColor: ['plateId', 'crustProvince', 'continentId', 'oceanBasinId'],
    shiftedBySliders: ['PLANET_SIZE_GRAVITY', 'RESOLUTION'],
    softPhysicalBands: ['exportRisk', 'p95NeighborJump', 'maxNeighborJump', 'wrapSeamMaxJump', 'poleSpikeRatio'],
    hardAuthorityRules: ['export height derives from terrain; export cannot invent or hide authority'],
    runsBefore: ['DIAGNOSTICS'],
    runsAfter: ['FINAL_RENDER'],
    terminal: false,
    notes: ['Numerical safety/output layer.'],
  },
  {
    id: 'DIAGNOSTICS',
    label: 'Generate diagnostics',
    status: 'partial',
    phase: 'diagnostics',
    validPlanetProfiles: ALL_PROFILES,
    requires: ['EXPORT'],
    allowedReads: ['*'],
    allowedWrites: ['diagnosticReport'],
    forbiddenReadsWhileWritingTerrain: [],
    forbiddenReadsWhileWritingColor: [],
    shiftedBySliders: ['ALL'],
    softPhysicalBands: ['allSliderAdjustedBands'],
    hardAuthorityRules: [
      'unregistered Generate layer is a problem',
      'registered layer running outside its valid planet profile is a problem',
      'layer reading derived output as upstream cause is a problem',
      'layer writing a field before prerequisites exist is a problem',
    ],
    runsBefore: [],
    runsAfter: ['EXPORT'],
    terminal: true,
    notes: ['Diagnostics are terminal and do not change the world.'],
  },
];

export function getGenerateLayerGate(id: string): GenerateLayerGate | undefined {
  return GENERATE_LAYER_GATES.find((entry) => entry.id === id);
}

export function listLayerGatesForPlanetProfile(profileId: GeneratePlanetProfileId): readonly GenerateLayerGate[] {
  return GENERATE_LAYER_GATES.filter((gate) => gate.validPlanetProfiles === 'ALL' || gate.validPlanetProfiles.includes(profileId));
}

export function layerCanRunForPlanetProfile(layerId: string, profileId: GeneratePlanetProfileId): boolean {
  const gate = getGenerateLayerGate(layerId);
  if (!gate) return false;
  return gate.validPlanetProfiles === 'ALL' || gate.validPlanetProfiles.includes(profileId);
}
