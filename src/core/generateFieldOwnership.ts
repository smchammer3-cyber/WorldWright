// WorldWright Generate Mode field ownership registry.
// Blueprint sources:
// - WORLDWRIGHT_BLUEPRINT_GENERATE_LAYER_GATES.md
// - WORLDWRIGHT_BLUEPRINT_GENERATE_SLIDER_CONTRACT.md
// - WORLDWRIGHT_BLUEPRINT_PLANET_FOUNDATION_LAYERS.md
//
// This file is declarative only. It does not change generation behavior.

export type GenerateFieldKind =
  | 'planet-input'
  | 'deep-cause'
  | 'geologic-cause'
  | 'material'
  | 'terrain'
  | 'derived-surface'
  | 'climate'
  | 'hydrology'
  | 'biome'
  | 'presentation'
  | 'export'
  | 'debug-label';

export type GenerateAuthorityRisk = 'safe' | 'watch' | 'dangerous-while-writing-terrain' | 'forbidden-output-authority';

export type GenerateFieldOwnership = {
  readonly id: string;
  readonly label: string;
  readonly kind: GenerateFieldKind;
  readonly ownerLayer: string;
  readonly mayBeReadByTerrainWriters: boolean;
  readonly mayBeReadByColorWriters: boolean;
  readonly mayBeWrittenAfterTerrainSolve: boolean;
  readonly authorityRisk: GenerateAuthorityRisk;
  readonly notes: readonly string[];
};

export const GENERATE_FIELD_OWNERSHIP: readonly GenerateFieldOwnership[] = [
  // Planet setup / sliders / deep physical causes.
  {
    id: 'planetProfile',
    label: 'Planet profile',
    kind: 'planet-input',
    ownerLayer: 'PLANET_PROFILE',
    mayBeReadByTerrainWriters: true,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'safe',
    notes: ['Determines legal stack, not visible terrain by itself.'],
  },
  {
    id: 'validLayerStack',
    label: 'Valid layer stack',
    kind: 'planet-input',
    ownerLayer: 'PLANET_PROFILE',
    mayBeReadByTerrainWriters: false,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'safe',
    notes: ['Used for diagnostic legality checks.'],
  },
  {
    id: 'surfaceGravityEarth',
    label: 'Surface gravity, Earth-relative',
    kind: 'planet-input',
    ownerLayer: 'PLANET_SIZE_GRAVITY',
    mayBeReadByTerrainWriters: true,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'safe',
    notes: ['May shift relief/slope/atmosphere expectations, never direct color.'],
  },
  {
    id: 'stellarFluxEarth',
    label: 'Stellar flux, Earth-relative',
    kind: 'planet-input',
    ownerLayer: 'STELLAR_ENERGY',
    mayBeReadByTerrainWriters: false,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'safe',
    notes: ['May affect climate/evaporation/snow/biomes through climate layers.'],
  },
  {
    id: 'greenhouseStrength',
    label: 'Greenhouse strength',
    kind: 'planet-input',
    ownerLayer: 'STELLAR_ENERGY',
    mayBeReadByTerrainWriters: false,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'safe',
    notes: ['Heat retention proxy for climate layers.'],
  },
  {
    id: 'coreHeat',
    label: 'Core heat',
    kind: 'deep-cause',
    ownerLayer: 'WORLD_CORE_HEAT',
    mayBeReadByTerrainWriters: false,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'safe',
    notes: ['Must flow through mantle/features/materials before terrain changes.'],
  },
  {
    id: 'heatFlowIndex',
    label: 'Heat flow index',
    kind: 'deep-cause',
    ownerLayer: 'WORLD_CORE_HEAT',
    mayBeReadByTerrainWriters: false,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'safe',
    notes: ['May influence mantle convection, volcanism, crust heat, and feature authority.'],
  },
  {
    id: 'hotspotPotential',
    label: 'Hotspot potential',
    kind: 'geologic-cause',
    ownerLayer: 'MANTLE_VOLATILE_HOTSPOT',
    mayBeReadByTerrainWriters: true,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'safe',
    notes: ['Valid feature cause only when converted into hotspot/plume feature fields.'],
  },
  {
    id: 'volatilePressure',
    label: 'Volatile pressure',
    kind: 'geologic-cause',
    ownerLayer: 'MANTLE_VOLATILE_HOTSPOT',
    mayBeReadByTerrainWriters: true,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'watch',
    notes: ['May deform a solid/ice/artificial support shell; cannot replace surface support.'],
  },

  // Current raw tectonic identity and feature fields.
  {
    id: 'plateId',
    label: 'Plate ID',
    kind: 'debug-label',
    ownerLayer: 'PLATE_SHELL',
    mayBeReadByTerrainWriters: false,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'forbidden-output-authority',
    notes: ['Raw hidden identity. Must not directly own terrain or final color.'],
  },
  {
    id: 'plateType',
    label: 'Plate type',
    kind: 'geologic-cause',
    ownerLayer: 'PLATE_SHELL',
    mayBeReadByTerrainWriters: true,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'watch',
    notes: ['Transitional cause signal. Mature stack should prefer material/feature fields.'],
  },
  {
    id: 'boundaryType',
    label: 'Boundary type',
    kind: 'geologic-cause',
    ownerLayer: 'BOUNDARY_FEATURES',
    mayBeReadByTerrainWriters: true,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'safe',
    notes: ['Feature authority when paired with relative motion and boundary feature fields.'],
  },
  {
    id: 'upliftRate',
    label: 'Uplift rate',
    kind: 'geologic-cause',
    ownerLayer: 'BOUNDARY_FEATURES',
    mayBeReadByTerrainWriters: true,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'safe',
    notes: ['Valid terrain cause when derived from feature/material authority.'],
  },
  {
    id: 'volcanicActivity',
    label: 'Volcanic activity',
    kind: 'geologic-cause',
    ownerLayer: 'BOUNDARY_FEATURES',
    mayBeReadByTerrainWriters: true,
    mayBeReadByColorWriters: true,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'safe',
    notes: ['Can shape terrain and surface color if exposed through surface/material fields, not raw plate identity.'],
  },

  // Continental/skeleton fields.
  {
    id: 'continentality',
    label: 'Continentality',
    kind: 'geologic-cause',
    ownerLayer: 'CONTINENTAL_MORPHOLOGY',
    mayBeReadByTerrainWriters: true,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'safe',
    notes: ['Broad morphology field. Not an exact dry-land mask.'],
  },
  {
    id: 'continentId',
    label: 'Continent ID',
    kind: 'debug-label',
    ownerLayer: 'CONTINENTAL_MORPHOLOGY',
    mayBeReadByTerrainWriters: false,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: true,
    authorityRisk: 'forbidden-output-authority',
    notes: ['Debug/identity grouping. Must not directly own height or color.'],
  },
  {
    id: 'shelfStrength',
    label: 'Shelf strength',
    kind: 'geologic-cause',
    ownerLayer: 'CONTINENTAL_MORPHOLOGY',
    mayBeReadByTerrainWriters: true,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'safe',
    notes: ['Valid margin/shelf morphology cause.'],
  },
  {
    id: 'oceanBasinId',
    label: 'Ocean basin ID',
    kind: 'debug-label',
    ownerLayer: 'CONTINENTAL_MORPHOLOGY',
    mayBeReadByTerrainWriters: false,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: true,
    authorityRisk: 'forbidden-output-authority',
    notes: ['Debug/identity grouping. Ocean terrain must be feature/material/depth-driven.'],
  },

  // Crust/material fields.
  {
    id: 'crustThickness',
    label: 'Crust thickness',
    kind: 'material',
    ownerLayer: 'CRUST_MATERIAL',
    mayBeReadByTerrainWriters: true,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'safe',
    notes: ['Primary material driver for isostatic response.'],
  },
  {
    id: 'crustAge',
    label: 'Crust age',
    kind: 'material',
    ownerLayer: 'CRUST_MATERIAL',
    mayBeReadByTerrainWriters: true,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'safe',
    notes: ['Material/history field; may affect heat, strength, and bathymetry expectations.'],
  },
  {
    id: 'crustProvince',
    label: 'Crust province',
    kind: 'debug-label',
    ownerLayer: 'CRUST_MATERIAL',
    mayBeReadByTerrainWriters: false,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: true,
    authorityRisk: 'forbidden-output-authority',
    notes: ['Derived explanation/debug label. Must not directly switch height or final color.'],
  },

  // Terrain/surface/climate/output.
  {
    id: 'baseHeight',
    label: 'Base height',
    kind: 'terrain',
    ownerLayer: 'TERRAIN_RESPONSE',
    mayBeReadByTerrainWriters: true,
    mayBeReadByColorWriters: true,
    mayBeWrittenAfterTerrainSolve: false,
    authorityRisk: 'safe',
    notes: ['Terrain owns final height basis. Later meaningful writes require registered terrain layer authority.'],
  },
  {
    id: 'isWater',
    label: 'Water mask',
    kind: 'derived-surface',
    ownerLayer: 'WATER_SURFACE_STATE',
    mayBeReadByTerrainWriters: false,
    mayBeReadByColorWriters: true,
    mayBeWrittenAfterTerrainSolve: true,
    authorityRisk: 'watch',
    notes: ['Derived from terrain and sea level. Should not be upstream terrain cause.'],
  },
  {
    id: 'oceanDepthClass',
    label: 'Ocean depth class',
    kind: 'derived-surface',
    ownerLayer: 'WATER_SURFACE_STATE',
    mayBeReadByTerrainWriters: false,
    mayBeReadByColorWriters: true,
    mayBeWrittenAfterTerrainSolve: true,
    authorityRisk: 'watch',
    notes: ['Derived class. Cannot prove ridge/trench/shelf authority by itself.'],
  },
  {
    id: 'temperature',
    label: 'Temperature',
    kind: 'climate',
    ownerLayer: 'CLIMATE_HYDROLOGY_BIOME',
    mayBeReadByTerrainWriters: false,
    mayBeReadByColorWriters: true,
    mayBeWrittenAfterTerrainSolve: true,
    authorityRisk: 'safe',
    notes: ['Biome/color input. Not terrain authority.'],
  },
  {
    id: 'rainfall',
    label: 'Rainfall',
    kind: 'climate',
    ownerLayer: 'CLIMATE_HYDROLOGY_BIOME',
    mayBeReadByTerrainWriters: false,
    mayBeReadByColorWriters: true,
    mayBeWrittenAfterTerrainSolve: true,
    authorityRisk: 'safe',
    notes: ['Hydrology/biome/color input. Not terrain authority.'],
  },
  {
    id: 'flowAccumulation',
    label: 'Flow accumulation',
    kind: 'hydrology',
    ownerLayer: 'HYDROLOGY_SOIL',
    mayBeReadByTerrainWriters: false,
    mayBeReadByColorWriters: true,
    mayBeWrittenAfterTerrainSolve: true,
    authorityRisk: 'safe',
    notes: ['River/soil/biome support. Later erosion layers may read through explicit surface-process contracts.'],
  },
  {
    id: 'baseBiomeId',
    label: 'Base biome',
    kind: 'biome',
    ownerLayer: 'BIOME_ECOLOGY',
    mayBeReadByTerrainWriters: false,
    mayBeReadByColorWriters: true,
    mayBeWrittenAfterTerrainSolve: true,
    authorityRisk: 'safe',
    notes: ['Derived from climate/hydrology/surface fields. Must not read hidden identity.'],
  },
  {
    id: 'finalColor',
    label: 'Final color',
    kind: 'presentation',
    ownerLayer: 'FINAL_RENDER',
    mayBeReadByTerrainWriters: false,
    mayBeReadByColorWriters: true,
    mayBeWrittenAfterTerrainSolve: true,
    authorityRisk: 'safe',
    notes: ['Output only. Should be explained by visible surface/biome/climate/terrain.'],
  },
  {
    id: 'exportHeight',
    label: 'Export height',
    kind: 'export',
    ownerLayer: 'EXPORT',
    mayBeReadByTerrainWriters: false,
    mayBeReadByColorWriters: false,
    mayBeWrittenAfterTerrainSolve: true,
    authorityRisk: 'safe',
    notes: ['Numerical output derived from terrain.'],
  },
];

export function getFieldOwnership(id: string): GenerateFieldOwnership | undefined {
  return GENERATE_FIELD_OWNERSHIP.find((entry) => entry.id === id);
}

export function isForbiddenTerrainRead(fieldId: string): boolean {
  const field = getFieldOwnership(fieldId);
  return field ? !field.mayBeReadByTerrainWriters : true;
}

export function isForbiddenColorRead(fieldId: string): boolean {
  const field = getFieldOwnership(fieldId);
  return field ? !field.mayBeReadByColorWriters : true;
}
