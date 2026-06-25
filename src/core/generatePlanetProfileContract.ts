// WorldWright Generate Mode planet profile contract registry.
// Blueprint source: WORLDWRIGHT_BLUEPRINT_PLANET_FOUNDATION_LAYERS.md
//
// This file is declarative validation for the runtime foundation layer.

export type GeneratePlanetProfileId =
  | 'EARTHLIKE_ROCKY'
  | 'ROCKY_ALIEN'
  | 'VOLATILE_PRESSURE_ROCKY'
  | 'ICE_SHELL_OCEAN_WORLD'
  | 'DWARF_ROCKY_OR_ICY'
  | 'SUPER_EARTH_ROCKY'
  | 'ARTIFICIAL_OR_FANTASY_SHELL';

export type GenerateSurfaceSupportMode =
  | 'ROCKY_CRUST'
  | 'LITHOSPHERE'
  | 'ICE_SHELL'
  | 'ARTIFICIAL_OR_FANTASY_SHELL';

export type GenerateLayerStackFamily =
  | 'TERRESTRIAL_ROCKY'
  | 'VOLATILE_PRESSURE_TERRESTRIAL'
  | 'ICE_SHELL_OCEAN'
  | 'LOW_GRAVITY_SMALL_BODY'
  | 'SUPER_EARTH_TERRESTRIAL'
  | 'ARTIFICIAL_OR_FANTASY';

export type PlanetProfileContract = {
  readonly id: GeneratePlanetProfileId;
  readonly label: string;
  readonly stackFamily: GenerateLayerStackFamily;
  readonly surfaceSupportMode: GenerateSurfaceSupportMode;
  readonly validForEarthlike: boolean;
  readonly validForAlien: boolean;
  readonly validForFantasy: boolean;
  readonly requiredLayers: readonly string[];
  readonly forbiddenLayers: readonly string[];
  readonly allowedSurfaceMaterials: readonly string[];
  readonly notes: readonly string[];
};

export const PLANET_PROFILE_CONTRACTS: readonly PlanetProfileContract[] = [
  {
    id: 'EARTHLIKE_ROCKY',
    label: 'Earthlike rocky planet',
    stackFamily: 'TERRESTRIAL_ROCKY',
    surfaceSupportMode: 'ROCKY_CRUST',
    validForEarthlike: true,
    validForAlien: true,
    validForFantasy: true,
    requiredLayers: ['PLANET_SIZE_GRAVITY', 'STELLAR_ENERGY', 'WORLD_CORE_HEAT', 'PLATE_SHELL', 'BOUNDARY_FEATURES', 'CONTINENTAL_MORPHOLOGY', 'CRUST_MATERIAL', 'TERRAIN_RESPONSE', 'WATER_SURFACE_STATE', 'CLIMATE_HYDROLOGY_BIOME', 'FINAL_RENDER', 'EXPORT'],
    forbiddenLayers: ['CLOUD_GAS_SURFACE', 'ICE_SHELL_TERRAIN_ONLY'],
    allowedSurfaceMaterials: ['rock', 'soil', 'sediment', 'ice', 'water'],
    notes: ['Strict calibration profile for neutral Earthlike worlds.', 'May use sliders for dry/flooded/hot/cold/extreme variants, but hard authority rules do not relax.'],
  },
  {
    id: 'ROCKY_ALIEN',
    label: 'Rocky alien planet',
    stackFamily: 'TERRESTRIAL_ROCKY',
    surfaceSupportMode: 'LITHOSPHERE',
    validForEarthlike: false,
    validForAlien: true,
    validForFantasy: true,
    requiredLayers: ['PLANET_SIZE_GRAVITY', 'STELLAR_ENERGY', 'WORLD_CORE_HEAT', 'MANTLE_VOLATILE_HOTSPOT', 'GEOLOGIC_FEATURE_AUTHORITY', 'MATERIAL_FIELDS', 'TERRAIN_RESPONSE', 'WATER_SURFACE_STATE', 'CLIMATE_HYDROLOGY_BIOME', 'FINAL_RENDER', 'EXPORT'],
    forbiddenLayers: [],
    allowedSurfaceMaterials: ['rock', 'soil', 'sediment', 'ice', 'salt', 'sulfur', 'carbon', 'water'],
    notes: ['Uses solid surface support, but allows wider chemistry, climate, heat, and gravity bands than Earthlike.', 'Can use plate, stagnant-lid, hybrid, or hotspot-dominant geology when those stacks are registered.'],
  },
  {
    id: 'VOLATILE_PRESSURE_ROCKY',
    label: 'Volatile-pressure rocky planet',
    stackFamily: 'VOLATILE_PRESSURE_TERRESTRIAL',
    surfaceSupportMode: 'LITHOSPHERE',
    validForEarthlike: false,
    validForAlien: true,
    validForFantasy: true,
    requiredLayers: ['PLANET_SIZE_GRAVITY', 'STELLAR_ENERGY', 'WORLD_CORE_HEAT', 'MANTLE_VOLATILE_HOTSPOT', 'SURFACE_SUPPORT_MODEL', 'GEOLOGIC_FEATURE_AUTHORITY', 'MATERIAL_FIELDS', 'TERRAIN_RESPONSE', 'ATMOSPHERE_RETENTION', 'CLIMATE_HYDROLOGY_BIOME', 'FINAL_RENDER', 'EXPORT'],
    forbiddenLayers: [],
    allowedSurfaceMaterials: ['rock', 'ice', 'sulfur', 'salt', 'carbon', 'mineral crust'],
    notes: ['Physically safe version of the hot-gas-center idea: a solid or ice shell sits above volatile pressure.', 'Volatile pressure may deform/crack the shell and create domes, vents, geysers, collapse basins, and chaos terrain.', 'Volatile pressure cannot replace the support shell as terrain authority.'],
  },
  {
    id: 'ICE_SHELL_OCEAN_WORLD',
    label: 'Ice-shell ocean world',
    stackFamily: 'ICE_SHELL_OCEAN',
    surfaceSupportMode: 'ICE_SHELL',
    validForEarthlike: false,
    validForAlien: true,
    validForFantasy: true,
    requiredLayers: ['PLANET_SIZE_GRAVITY', 'STELLAR_ENERGY', 'WORLD_CORE_HEAT', 'SURFACE_SUPPORT_MODEL', 'ICE_SHELL_FEATURES', 'TERRAIN_RESPONSE', 'ATMOSPHERE_RETENTION', 'FINAL_RENDER', 'EXPORT'],
    forbiddenLayers: ['CONTINENTAL_MORPHOLOGY', 'CRUST_PROVINCE_TERRAIN', 'NORMAL_RIVER_HYDROLOGY'],
    allowedSurfaceMaterials: ['ice', 'brine', 'salt', 'cryovolcanic deposits'],
    notes: ['Rock/metal interior plus deep ocean plus ice shell, possibly tidally heated.', 'Normal continents, shelves, and rocky crust provinces are illegal unless this is explicitly configured as a frozen rocky planet.'],
  },
  {
    id: 'DWARF_ROCKY_OR_ICY',
    label: 'Dwarf rocky or icy world',
    stackFamily: 'LOW_GRAVITY_SMALL_BODY',
    surfaceSupportMode: 'LITHOSPHERE',
    validForEarthlike: false,
    validForAlien: true,
    validForFantasy: true,
    requiredLayers: ['PLANET_SIZE_GRAVITY', 'STELLAR_ENERGY', 'WORLD_CORE_HEAT', 'SURFACE_SUPPORT_MODEL', 'TERRAIN_RESPONSE', 'ATMOSPHERE_RETENTION', 'FINAL_RENDER', 'EXPORT'],
    forbiddenLayers: ['EARTHLIKE_PLATE_EXPECTATIONS'],
    allowedSurfaceMaterials: ['rock', 'ice', 'regolith', 'frozen volatiles'],
    notes: ['Small rounded body profile: low gravity, thin atmosphere risk, sharp relief possible.', 'May have localized internal/tidal heat, cryovolcanism, ancient surface, or cratered terrain in later layers.'],
  },
  {
    id: 'SUPER_EARTH_ROCKY',
    label: 'Super-Earth rocky planet',
    stackFamily: 'SUPER_EARTH_TERRESTRIAL',
    surfaceSupportMode: 'LITHOSPHERE',
    validForEarthlike: false,
    validForAlien: true,
    validForFantasy: true,
    requiredLayers: ['PLANET_SIZE_GRAVITY', 'STELLAR_ENERGY', 'WORLD_CORE_HEAT', 'MANTLE_VOLATILE_HOTSPOT', 'GEOLOGIC_FEATURE_AUTHORITY', 'MATERIAL_FIELDS', 'TERRAIN_RESPONSE', 'ATMOSPHERE_RETENTION', 'CLIMATE_HYDROLOGY_BIOME', 'FINAL_RENDER', 'EXPORT'],
    forbiddenLayers: [],
    allowedSurfaceMaterials: ['rock', 'soil', 'sediment', 'ice', 'water'],
    notes: ['Higher gravity rocky planet: lower relative relief, stronger atmosphere retention, broader smoother terrain expectations.'],
  },
  {
    id: 'ARTIFICIAL_OR_FANTASY_SHELL',
    label: 'Artificial or fantasy shell world',
    stackFamily: 'ARTIFICIAL_OR_FANTASY',
    surfaceSupportMode: 'ARTIFICIAL_OR_FANTASY_SHELL',
    validForEarthlike: false,
    validForAlien: true,
    validForFantasy: true,
    requiredLayers: ['PLANET_SIZE_GRAVITY', 'SURFACE_SUPPORT_MODEL', 'TERRAIN_RESPONSE', 'FINAL_RENDER', 'EXPORT'],
    forbiddenLayers: [],
    allowedSurfaceMaterials: ['rock', 'metal', 'ice', 'constructed shell', 'fantasy material'],
    notes: ['Permits non-natural support logic only when explicitly selected.', 'Still must declare terrain authority and final color authority.'],
  },
];

export function getPlanetProfileContract(id: GeneratePlanetProfileId): PlanetProfileContract {
  const contract = PLANET_PROFILE_CONTRACTS.find((entry) => entry.id === id);
  if (!contract) throw new Error(`Unknown planet profile contract: ${id}`);
  return contract;
}

export function listPlanetProfilesForMode(mode: 'EARTHLIKE' | 'FANTASY' | 'STYLIZED' | 'ALIEN'): readonly PlanetProfileContract[] {
  if (mode === 'EARTHLIKE') return PLANET_PROFILE_CONTRACTS.filter((entry) => entry.validForEarthlike);
  if (mode === 'ALIEN') return PLANET_PROFILE_CONTRACTS.filter((entry) => entry.validForAlien);
  return PLANET_PROFILE_CONTRACTS.filter((entry) => entry.validForFantasy);
}
