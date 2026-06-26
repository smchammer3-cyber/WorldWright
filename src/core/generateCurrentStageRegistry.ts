import { getGenerateLayerGate } from './generateLayerGates';
import type { GenerateStageId } from './worldGenerateStageDiagnostics';

export type CurrentGenerateStageRisk = 'ok' | 'watch' | 'problem';
export type CurrentGenerateStageKind = 'raw-identity' | 'cause' | 'feature-material' | 'terrain' | 'derived-surface' | 'visible-output';

export type CurrentGenerateStageContract = {
  readonly id: GenerateStageId;
  readonly label: string;
  readonly kind: CurrentGenerateStageKind;
  readonly registryLayerIds: readonly string[];
  readonly allowedReads: readonly string[];
  readonly allowedWrites: readonly string[];
  readonly mayShapeTerrain: boolean;
  readonly risk: CurrentGenerateStageRisk;
  readonly note: string;
  readonly knownViolations: readonly string[];
  readonly terminalCauseSync?: boolean;
};

export const CURRENT_GENERATE_STAGE_CONTRACTS: readonly CurrentGenerateStageContract[] = [
  {
    id: 'RAW_GENERATOR',
    label: 'Raw generator',
    kind: 'terrain',
    registryLayerIds: ['PLANET_PROFILE', 'PLANET_SIZE_GRAVITY', 'STELLAR_ENERGY', 'WORLD_CORE_HEAT', 'PLATE_SHELL', 'TERRAIN_RESPONSE', 'WATER_SURFACE_STATE', 'CLIMATE_HYDROLOGY_BIOME'],
    allowedReads: ['seed', 'generator params', 'planetFoundation', 'tectonic cause fields'],
    allowedWrites: ['planetFoundation', 'plateId', 'plateType', 'boundaryType', 'upliftRate', 'volcanicActivity', 'baseHeight', 'isWater', 'oceanDepthClass', 'surfaceAge', 'surfaceType', 'temperature', 'rainfall', 'snowCover', 'baseBiomeId', 'flowDirection', 'flowAccumulation'],
    mayShapeTerrain: true,
    risk: 'watch',
    note: 'Combined bootstrap stage. It resolves planet foundation first and should keep initial terrain broad/foundation-based rather than direct plate-boundary relief.',
    knownViolations: ['Combined bootstrap stage mixes multiple target foundation phases.'],
  },
  {
    id: 'CONTINENT_FIELDS',
    label: 'Continent fields',
    kind: 'cause',
    registryLayerIds: ['CONTINENTAL_MORPHOLOGY'],
    allowedReads: ['baseHeight', 'plateType'],
    allowedWrites: ['continentality', 'continentId', 'oceanBasinId', 'continentCoreStrength', 'shelfStrength', 'marginType', 'islandCause'],
    mayShapeTerrain: false,
    risk: 'watch',
    note: 'Seeds continent/shelf morphology. IDs are labels and must not become exact terrain authority.',
    knownViolations: ['Current implementation reads terrain to seed cause fields; acceptable only as transitional explanation sync.'],
  },
  {
    id: 'PLATE_BOUNDARY_FEATURE_TERRAIN',
    label: 'Plate feature terrain',
    kind: 'terrain',
    registryLayerIds: ['BOUNDARY_FEATURES', 'TERRAIN_RESPONSE'],
    allowedReads: ['boundaryType', 'upliftRate', 'volcanicActivity', 'marginType', 'islandCause', 'continentality', 'shelfStrength'],
    allowedWrites: ['baseHeight'],
    mayShapeTerrain: true,
    risk: 'watch',
    note: 'Boundary relief is allowed only through explicit feature authority, not raw plateId.',
    knownViolations: [],
  },
  {
    id: 'SKELETON_ELEVATION',
    label: 'Skeleton elevation',
    kind: 'terrain',
    registryLayerIds: ['CONTINENTAL_MORPHOLOGY', 'TERRAIN_RESPONSE'],
    allowedReads: ['continentality', 'continentCoreStrength', 'shelfStrength', 'marginType', 'islandCause'],
    allowedWrites: ['baseHeight'],
    mayShapeTerrain: true,
    risk: 'watch',
    note: 'Broad morphology terrain guidance. Must not stamp continent/ocean IDs or be repeated late.',
    knownViolations: [],
  },
  {
    id: 'FIRST_RECOMPUTE',
    label: 'First recompute',
    kind: 'derived-surface',
    registryLayerIds: ['WATER_SURFACE_STATE', 'CLIMATE_HYDROLOGY_BIOME'],
    allowedReads: ['baseHeight'],
    allowedWrites: ['isWater', 'oceanDepthClass', 'temperature', 'rainfall', 'snowCover', 'baseBiomeId', 'flowDirection', 'flowAccumulation'],
    mayShapeTerrain: false,
    risk: 'ok',
    note: 'Derived refresh after initial feature/morphology terrain guidance.',
    knownViolations: [],
  },
  {
    id: 'QUALITY_PASS',
    label: 'Quality pass',
    kind: 'terrain',
    registryLayerIds: ['TERRAIN_RESPONSE'],
    allowedReads: ['baseHeight', 'isWater', 'oceanDepthClass', 'continentality', 'shelfStrength', 'marginType'],
    allowedWrites: ['baseHeight'],
    mayShapeTerrain: true,
    risk: 'watch',
    note: 'General terrain cleanup. Must not hide upstream identity leaks or read hidden identity while shaping terrain.',
    knownViolations: ['Current implementation needs ownership review because cleanup can mask upstream authority mistakes.'],
  },
  {
    id: 'SECOND_RECOMPUTE',
    label: 'Second recompute',
    kind: 'derived-surface',
    registryLayerIds: ['WATER_SURFACE_STATE', 'CLIMATE_HYDROLOGY_BIOME'],
    allowedReads: ['baseHeight'],
    allowedWrites: ['isWater', 'oceanDepthClass', 'temperature', 'rainfall', 'snowCover', 'baseBiomeId', 'flowDirection', 'flowAccumulation'],
    mayShapeTerrain: false,
    risk: 'ok',
    note: 'Derived refresh after generated quality pass.',
    knownViolations: [],
  },
  {
    id: 'CRUST_CONTINENT_RESEED',
    label: 'Crust continent reseed',
    kind: 'cause',
    registryLayerIds: ['CONTINENTAL_MORPHOLOGY'],
    allowedReads: ['baseHeight', 'isWater', 'plateType'],
    allowedWrites: ['continentality', 'continentId', 'oceanBasinId', 'continentCoreStrength', 'shelfStrength', 'marginType', 'islandCause'],
    mayShapeTerrain: false,
    risk: 'watch',
    note: 'Runtime reseeds continent/shelf morphology before crust fields. This is a known backward-feedback risk.',
    knownViolations: ['Cause fields are reseeded after terrain shaping and before later terrain writers.'],
  },
  {
    id: 'CRUST_FIELDS',
    label: 'Crust fields',
    kind: 'feature-material',
    registryLayerIds: ['CRUST_MATERIAL'],
    allowedReads: ['planetFoundation', 'feature authority', 'upliftRate', 'volcanicActivity', 'continentality', 'shelfStrength', 'marginType', 'baseHeight', 'isWater'],
    allowedWrites: ['crustThickness', 'crustAge', 'crustProvince'],
    mayShapeTerrain: false,
    risk: 'watch',
    note: 'Seeds material fields and a province label. Material fields are valid; crustProvince is terminal/debug only and must not directly drive terrain.',
    knownViolations: ['Current crust fields still derive partly from already-shaped terrain and ocean class.'],
  },
  {
    id: 'ISOSTATIC_TERRAIN_RESPONSE',
    label: 'Isostatic terrain',
    kind: 'terrain',
    registryLayerIds: ['CRUST_MATERIAL', 'BOUNDARY_FEATURES', 'TERRAIN_RESPONSE'],
    allowedReads: ['planetFoundation', 'crustThickness', 'crustAge', 'continentality', 'continentCoreStrength', 'shelfStrength', 'feature authority', 'rainfall'],
    allowedWrites: ['baseHeight'],
    mayShapeTerrain: true,
    risk: 'watch',
    note: 'Material/feature/gravity terrain response.',
    knownViolations: [],
  },
  {
    id: 'CRUST_TERRAIN_INFLUENCE',
    label: 'Crust terrain influence',
    kind: 'terrain',
    registryLayerIds: ['CRUST_MATERIAL', 'TERRAIN_RESPONSE', 'WATER_SURFACE_STATE'],
    allowedReads: ['baseHeight', 'isWater', 'crustThickness', 'crustAge', 'upliftRate', 'volcanicActivity', 'shelfStrength', 'marginType', 'islandCause', 'feature authority'],
    allowedWrites: ['baseHeight'],
    mayShapeTerrain: true,
    risk: 'watch',
    note: 'Bundled runtime crust terrain influence pass. Diagnostics must not pretend its internal subpasses are separate runtime stages.',
    knownViolations: ['Bundled pass still contains crustProvince-driven terrain logic and must be split/fixed after diagnostics align.'],
  },
  {
    id: 'OCEAN_BATHYMETRY_SMOOTHING',
    label: 'Ocean bathy',
    kind: 'terrain',
    registryLayerIds: ['TERRAIN_RESPONSE', 'WATER_SURFACE_STATE'],
    allowedReads: ['baseHeight', 'isWater', 'boundaryType', 'upliftRate', 'volcanicActivity', 'shelfStrength', 'marginType', 'islandCause'],
    allowedWrites: ['baseHeight'],
    mayShapeTerrain: true,
    risk: 'watch',
    note: 'Ocean terrain cleanup is valid only for positive liquid surface-water modes while preserving explicit ridges, trenches, arcs, and shelves.',
    knownViolations: [],
  },
  {
    id: 'FINAL_RECOMPUTE',
    label: 'Final recompute',
    kind: 'derived-surface',
    registryLayerIds: ['WATER_SURFACE_STATE', 'CLIMATE_HYDROLOGY_BIOME'],
    allowedReads: ['baseHeight'],
    allowedWrites: ['isWater', 'oceanDepthClass', 'temperature', 'rainfall', 'snowCover', 'baseBiomeId', 'flowDirection', 'flowAccumulation'],
    mayShapeTerrain: false,
    risk: 'ok',
    note: 'Final derived refresh after generated geography pipeline terrain stages.',
    knownViolations: [],
  },
  {
    id: 'FINAL_CONTINENT_RESEED',
    label: 'Final continent reseed',
    kind: 'cause',
    registryLayerIds: ['CONTINENTAL_MORPHOLOGY'],
    allowedReads: ['baseHeight', 'isWater', 'plateType'],
    allowedWrites: ['continentality', 'continentId', 'oceanBasinId', 'shelfStrength', 'marginType', 'islandCause'],
    mayShapeTerrain: false,
    risk: 'watch',
    note: 'Terminal explanation sync only; it must not feed a later terrain writer in the same pipeline.',
    knownViolations: [],
    terminalCauseSync: true,
  },
  {
    id: 'FINAL_CRUST_RESEED',
    label: 'Final crust reseed',
    kind: 'feature-material',
    registryLayerIds: ['CRUST_MATERIAL'],
    allowedReads: ['baseHeight', 'isWater', 'boundaryType', 'continentality', 'shelfStrength', 'marginType', 'feature authority'],
    allowedWrites: ['crustThickness', 'crustAge', 'crustProvince'],
    mayShapeTerrain: false,
    risk: 'watch',
    note: 'Terminal explanation sync only; dangerous if a future terrain pass reads crustProvince afterward.',
    knownViolations: [],
    terminalCauseSync: true,
  },
];

export function getCurrentGenerateStageContract(id: GenerateStageId): CurrentGenerateStageContract {
  const contract = CURRENT_GENERATE_STAGE_CONTRACTS.find((entry) => entry.id === id);
  if (!contract) throw new Error(`Unregistered current Generate stage: ${id}`);
  return contract;
}

export function listCurrentGenerateStageContracts(): readonly CurrentGenerateStageContract[] {
  return CURRENT_GENERATE_STAGE_CONTRACTS;
}

export function registryLayerLabelsForCurrentStage(stageId: GenerateStageId): string[] {
  return getCurrentGenerateStageContract(stageId)
    .registryLayerIds
    .map((layerId) => getGenerateLayerGate(layerId)?.label ?? `Missing layer: ${layerId}`);
}
