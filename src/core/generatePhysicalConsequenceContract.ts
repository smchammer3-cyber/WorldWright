// WorldWright Generate Mode physical consequence contract registry.
// Blueprint source: WORLDWRIGHT_BLUEPRINT_GENERATE_FEATURE_MATERIAL_HANDOFF.md
//
// This file is declarative validation for the missing handoff between
// planet-foundation physics and legal terrain authority. It does not yet
// change generation behavior, but tests and diagnostics can use it as the
// source of truth for PRs that implement the resolver.

export const DISALLOWED_GENERATE_WORLD_PROFILES = [
  'CLOUD_GAS_WORLD',
  'GAS_WORLD',
  'GAS_GIANT',
  'CLOUD_GAS_GIANT',
] as const;

export type DisallowedGenerateWorldProfile = typeof DISALLOWED_GENERATE_WORLD_PROFILES[number];

export type GenerateSurfaceWaterMode =
  | 'DRY'
  | 'LIQUID_SURFACE_WATER'
  | 'MIXED_LIQUID_ICE'
  | 'SNOWBALL_SURFACE'
  | 'ICE_OVER_ROCK'
  | 'ICE_SHELL_OVER_OCEAN'
  | 'SUBSURFACE_BRINE'
  | 'STEAM_OR_VAPOR_DOMINATED';

export type GenerateGroundSurfaceMaterial =
  | 'ROCK'
  | 'SEDIMENT'
  | 'REGOLITH'
  | 'ICE'
  | 'ICE_OVER_ROCK'
  | 'ICE_SHELL'
  | 'ARTIFICIAL_SHELL';

export type GeneratePhysicalSupportMode =
  | 'ROCKY_CRUST'
  | 'LITHOSPHERE'
  | 'ICE_OVER_ROCK'
  | 'ICE_SHELL'
  | 'REGOLITH'
  | 'ARTIFICIAL_OR_FANTASY_SHELL';

export type GenerateGeologyStack =
  | 'PLATE_TECTONIC'
  | 'STAGNANT_LID'
  | 'RIFT_DOMINATED'
  | 'HOTSPOT_DOMINATED'
  | 'ICE_SHELL_TECTONIC'
  | 'IMPACT_ANCIENT'
  | 'VOLATILE_PRESSURE_SHELL'
  | 'ARTIFICIAL_DECLARED';

export type GeneratePhysicalConsequenceRule = {
  readonly id: string;
  readonly label: string;
  readonly inputs: readonly string[];
  readonly requiredConsequence: string;
  readonly allowedSurfaceWaterModes: readonly GenerateSurfaceWaterMode[];
  readonly allowedSupportModes: readonly GeneratePhysicalSupportMode[];
  readonly allowedGeologyStacks: readonly GenerateGeologyStack[];
  readonly notes: readonly string[];
};

export type GenerateAuthorityRule = {
  readonly id: string;
  readonly source: string;
  readonly forbiddenDirectWrites: readonly string[];
  readonly allowedHandoff: readonly string[];
};

export const GENERATE_PIPELINE_ORDER = [
  'SEED',
  'PLANET_PROFILE',
  'PLANET_SIZE_GRAVITY',
  'STELLAR_ENERGY',
  'ATMOSPHERE_RETENTION_SURFACE_ENERGY',
  'WATER_INVENTORY_PHASE',
  'WORLD_CORE_HEAT',
  'MANTLE_TECTONIC_HOTSPOT_POTENTIAL',
  'SURFACE_SUPPORT_MODEL',
  'GEOLOGY_STACK_SELECTION',
  'GEOLOGIC_FEATURE_AUTHORITY',
  'MATERIAL_AUTHORITY',
  'TERRAIN_RESPONSE',
  'WATER_OCEAN_ICE_STATE',
  'CLIMATE_MOISTURE_TRANSPORT',
  'HYDROLOGY_EROSION_SEDIMENT',
  'BIOME_ECOLOGY',
  'FINAL_RENDER',
  'EXPORT',
  'DIAGNOSTICS',
] as const;

export const SUN_FACTOR_OUTPUTS = [
  'stellarFluxEarth',
  'surfaceAbsorbedFlux',
  'effectiveHeatIndex',
  'evaporationPotential',
  'snowlineBias',
  'iceStability',
  'seasonalityStrength',
  'latitudeEnergyGradient',
  'adjustedAlbedo',
] as const;

export const CORE_FACTOR_OUTPUTS = [
  'coreHeat',
  'mantleHeat',
  'heatFlowIndex',
  'mantleConvectionIndex',
  'tectonicVigor',
  'volcanismBias',
  'riftLikelihood',
  'hotspotPotential',
  'crustHeat',
  'lithosphereWeakness',
] as const;

export const HARD_PHYSICAL_AUTHORITY_RULES: readonly GenerateAuthorityRule[] = [
  {
    id: 'SUN_NO_TERRAIN_OR_COLOR',
    source: 'Sun / stellar energy',
    forbiddenDirectWrites: ['baseHeight', 'finalColor', 'plateId', 'crustProvince', 'continentId', 'oceanBasinId'],
    allowedHandoff: ['temperature', 'rainfall potential', 'evaporationPotential', 'snowlineBias', 'iceStability', 'climate bands', 'biome inputs'],
  },
  {
    id: 'CORE_NO_TERRAIN_OR_COLOR',
    source: 'Core / internal heat',
    forbiddenDirectWrites: ['baseHeight', 'finalColor', 'biome', 'isWater', 'oceanDepthClass'],
    allowedHandoff: ['mantleConvectionIndex', 'tectonicVigor', 'volcanismBias', 'riftLikelihood', 'hotspotPotential', 'crustHeat'],
  },
  {
    id: 'GRAVITY_NO_DIRECT_PAINT',
    source: 'Gravity / size',
    forbiddenDirectWrites: ['baseHeight', 'finalColor', 'biome'],
    allowedHandoff: ['reliefGravityScale', 'atmosphereRetentionIndex', 'slopeTolerance', 'erosionTransportScale'],
  },
  {
    id: 'HIDDEN_IDS_NO_TERRAIN_OR_COLOR',
    source: 'Hidden identity labels',
    forbiddenDirectWrites: ['plateId -> baseHeight', 'plateId -> finalColor', 'crustProvince -> baseHeight', 'crustProvince -> finalColor', 'continentId -> baseHeight', 'oceanBasinId -> baseHeight'],
    allowedHandoff: ['feature authority', 'material authority', 'debug labels', 'terminal explanation sync'],
  },
  {
    id: 'OCEAN_DEPTH_CLASS_DERIVED_ONLY',
    source: 'OceanDepthClass',
    forbiddenDirectWrites: ['baseHeight', 'terrain cause', 'bathymetry protection without feature/material authority'],
    allowedHandoff: ['debug depth label', 'derived ocean class', 'render input after terrain solve'],
  },
];

export const PHYSICAL_CONSEQUENCE_RULES: readonly GeneratePhysicalConsequenceRule[] = [
  {
    id: 'FAR_SUN_HIGH_WATER_LOW_CORE',
    label: 'Far Sun + high water + low internal heat',
    inputs: ['low stellarFluxEarth', 'high waterInventory', 'low coreHeat', 'low tidalHeatingIndex'],
    requiredConsequence: 'Frozen surface: snowball, frozen ocean, or ice over rock. Do not leave as ordinary temperate liquid-ocean Earthlike terrain.',
    allowedSurfaceWaterModes: ['SNOWBALL_SURFACE', 'ICE_OVER_ROCK', 'MIXED_LIQUID_ICE', 'SUBSURFACE_BRINE'],
    allowedSupportModes: ['ICE_OVER_ROCK', 'LITHOSPHERE', 'REGOLITH', 'ICE_SHELL'],
    allowedGeologyStacks: ['STAGNANT_LID', 'IMPACT_ANCIENT', 'ICE_SHELL_TECTONIC'],
    notes: ['Ice may become ground only through surface/support state, not through final color paint.'],
  },
  {
    id: 'FAR_SUN_HIGH_WATER_HOT_CORE',
    label: 'Far Sun + high water + high internal or tidal heat',
    inputs: ['low stellarFluxEarth', 'high waterInventory', 'high coreHeat or high tidalHeatingIndex'],
    requiredConsequence: 'Cold icy surface with possible subsurface ocean, ice-shell deformation, cracks, chaos terrain, cryovolcanism, or geyser-like vents.',
    allowedSurfaceWaterModes: ['ICE_SHELL_OVER_OCEAN', 'SUBSURFACE_BRINE', 'SNOWBALL_SURFACE'],
    allowedSupportModes: ['ICE_SHELL', 'ICE_OVER_ROCK'],
    allowedGeologyStacks: ['ICE_SHELL_TECTONIC', 'VOLATILE_PRESSURE_SHELL'],
    notes: ['Low Sun does not mean geologically dead when internal/tidal heat is high.'],
  },
  {
    id: 'FAR_SUN_LOW_WATER',
    label: 'Far Sun + low water',
    inputs: ['low stellarFluxEarth', 'low waterInventory'],
    requiredConsequence: 'Cold rocky/regolith/permafrost world. Do not automatically create an ice-shell ocean world without water inventory.',
    allowedSurfaceWaterModes: ['DRY', 'ICE_OVER_ROCK', 'SUBSURFACE_BRINE'],
    allowedSupportModes: ['LITHOSPHERE', 'REGOLITH', 'ROCKY_CRUST'],
    allowedGeologyStacks: ['STAGNANT_LID', 'IMPACT_ANCIENT', 'PLATE_TECTONIC'],
    notes: ['Cold plus dry is not the same as high-water ice shell.'],
  },
  {
    id: 'NEAR_SUN_HIGH_WATER_RETAINED_ATMOSPHERE',
    label: 'Near Sun + high water + retained atmosphere',
    inputs: ['high stellarFluxEarth', 'high waterInventory', 'high atmosphereRetentionIndex'],
    requiredConsequence: 'High evaporation, strong greenhouse/cloud risk, wet-greenhouse or steam/vapor-dominated risk before normal liquid-ocean assumptions.',
    allowedSurfaceWaterModes: ['LIQUID_SURFACE_WATER', 'MIXED_LIQUID_ICE', 'STEAM_OR_VAPOR_DOMINATED'],
    allowedSupportModes: ['ROCKY_CRUST', 'LITHOSPHERE', 'ARTIFICIAL_OR_FANTASY_SHELL'],
    allowedGeologyStacks: ['PLATE_TECTONIC', 'RIFT_DOMINATED', 'HOTSPOT_DOMINATED', 'STAGNANT_LID'],
    notes: ['Hot plus wet should affect evaporation/cloud/greenhouse diagnostics, not directly paint terrain.'],
  },
  {
    id: 'NEAR_SUN_LOW_WATER',
    label: 'Near Sun + low water',
    inputs: ['high stellarFluxEarth', 'low waterInventory'],
    requiredConsequence: 'Arid rock, salt flats, dry basins, sparse snow/ice, and limited hydrology.',
    allowedSurfaceWaterModes: ['DRY', 'STEAM_OR_VAPOR_DOMINATED'],
    allowedSupportModes: ['ROCKY_CRUST', 'LITHOSPHERE', 'REGOLITH'],
    allowedGeologyStacks: ['PLATE_TECTONIC', 'STAGNANT_LID', 'RIFT_DOMINATED', 'HOTSPOT_DOMINATED', 'IMPACT_ANCIENT'],
    notes: ['Dry heat changes climate and hydrology, not hidden terrain authority.'],
  },
  {
    id: 'HOT_CORE_ROCKY_SUPPORT',
    label: 'Hot core + rocky support',
    inputs: ['high coreHeat', 'high heatFlowIndex', 'rocky or lithosphere support'],
    requiredConsequence: 'More volcanism, rifts, hotspots, weak lithosphere, resurfacing, and feature-backed relief.',
    allowedSurfaceWaterModes: ['DRY', 'LIQUID_SURFACE_WATER', 'MIXED_LIQUID_ICE', 'STEAM_OR_VAPOR_DOMINATED'],
    allowedSupportModes: ['ROCKY_CRUST', 'LITHOSPHERE'],
    allowedGeologyStacks: ['PLATE_TECTONIC', 'RIFT_DOMINATED', 'HOTSPOT_DOMINATED', 'VOLATILE_PRESSURE_SHELL'],
    notes: ['Core heat must become feature/material authority before terrain writes.'],
  },
  {
    id: 'COLD_CORE_ROCKY_SUPPORT',
    label: 'Cold core + rocky support',
    inputs: ['low coreHeat', 'low heatFlowIndex', 'rocky or lithosphere support'],
    requiredConsequence: 'Stagnant lid tendency, old crust, weak volcanism, fewer/no active plate boundaries unless another cause overrides.',
    allowedSurfaceWaterModes: ['DRY', 'LIQUID_SURFACE_WATER', 'MIXED_LIQUID_ICE', 'SNOWBALL_SURFACE', 'ICE_OVER_ROCK'],
    allowedSupportModes: ['ROCKY_CRUST', 'LITHOSPHERE', 'REGOLITH'],
    allowedGeologyStacks: ['STAGNANT_LID', 'IMPACT_ANCIENT', 'PLATE_TECTONIC'],
    notes: ['Cold-core worlds must not blindly force a normal active plate network.'],
  },
  {
    id: 'HOT_CORE_ICE_SHELL',
    label: 'Hot core or tidal heat + ice shell',
    inputs: ['ICE_SHELL support', 'high coreHeat or high tidalHeatingIndex'],
    requiredConsequence: 'Cryovolcanism, fractures, ice ridges, chaos terrain, resurfacing, or geyser-like features may be legal.',
    allowedSurfaceWaterModes: ['ICE_SHELL_OVER_OCEAN', 'SUBSURFACE_BRINE', 'SNOWBALL_SURFACE'],
    allowedSupportModes: ['ICE_SHELL', 'ICE_OVER_ROCK'],
    allowedGeologyStacks: ['ICE_SHELL_TECTONIC', 'VOLATILE_PRESSURE_SHELL'],
    notes: ['Ice-shell terrain is feature-backed ice/shell deformation, not continental crust.'],
  },
  {
    id: 'COLD_CORE_ICE_SHELL',
    label: 'Cold core + ice shell',
    inputs: ['ICE_SHELL support', 'low coreHeat', 'low tidalHeatingIndex'],
    requiredConsequence: 'Thick stable ice, fewer vents, older frozen surface, weaker resurfacing.',
    allowedSurfaceWaterModes: ['ICE_SHELL_OVER_OCEAN', 'SNOWBALL_SURFACE', 'ICE_OVER_ROCK'],
    allowedSupportModes: ['ICE_SHELL', 'ICE_OVER_ROCK'],
    allowedGeologyStacks: ['ICE_SHELL_TECTONIC', 'IMPACT_ANCIENT'],
    notes: ['Cold ice shells should not become active volcanic/plate worlds without a heat source.'],
  },
];

export const FEATURE_AUTHORITY_FIELDS = [
  'ridge',
  'rift',
  'trench',
  'subduction',
  'islandArc',
  'collisionBelt',
  'transformShear',
  'diffuseDeformation',
  'hotspot',
  'volcanicProvince',
  'cratonCore',
  'passiveMargin',
  'activeMargin',
  'shelfPlatform',
  'abyssalBasin',
  'impactBasin',
  'iceRidge',
  'iceCrack',
  'chaosTerrain',
  'cryovolcanicVent',
  'volatileDome',
  'sinkholeBasin',
] as const;

export const MATERIAL_AUTHORITY_FIELDS = [
  'crustThickness',
  'crustDensity',
  'crustBuoyancy',
  'crustStrength',
  'crustAge',
  'crustHeat',
  'erodibility',
  'sedimentTendency',
  'iceThickness',
  'iceStrength',
  'regolithDepth',
  'volatilePressure',
  'supportStrength',
] as const;

export const REGISTERED_TERRAIN_RESPONSE_INPUTS = [
  'supportStrength',
  'featureAuthority',
  'materialAuthority',
  'reliefGravityScale',
  'surfaceProcessSettings',
  'waterPhase',
  'icePhase',
] as const;

export function isDisallowedGenerateWorldProfile(profile: string): profile is DisallowedGenerateWorldProfile {
  return (DISALLOWED_GENERATE_WORLD_PROFILES as readonly string[]).includes(profile);
}

export function consequenceRuleById(id: string): GeneratePhysicalConsequenceRule | undefined {
  return PHYSICAL_CONSEQUENCE_RULES.find((rule) => rule.id === id);
}

export function assertAllowedGenerateWorldProfile(profile: string): void {
  if (isDisallowedGenerateWorldProfile(profile)) {
    throw new Error(`Disallowed Generate world profile: ${profile}. WorldWright Generate supports editable surface-bearing worlds only.`);
  }
}
