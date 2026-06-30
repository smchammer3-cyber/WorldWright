// ========================================================
// WORLDWRIGHT -- WORLD SCHEMA (V1.3)
// File: src/core/worldSchema/index.ts
// ========================================================

export type Vec2 = [number, number];

export enum PlateType {
  OCEANIC = 'OCEANIC',
  CONTINENTAL = 'CONTINENTAL',
}

export enum BoundaryType {
  NONE = 'NONE',
  DIVERGENT = 'DIVERGENT',
  CONVERGENT = 'CONVERGENT',
  TRANSFORM = 'TRANSFORM',
}

export enum SurfaceType {
  ROCK = 'ROCK',
  VOLCANIC = 'VOLCANIC',
  SAND = 'SAND',
  ALLUVIAL = 'ALLUVIAL',
  PEAT = 'PEAT',
  SALT = 'SALT',
  PERMAFROST = 'PERMAFROST',
}

export enum OceanDepthClass {
  TRENCH = 'TRENCH',
  ABYSSAL = 'ABYSSAL',
  RIDGE = 'RIDGE',
  SHELF = 'SHELF',
  SLOPE = 'SLOPE',
}

export enum CrustProvince {
  OLD_SHIELD = 'OLD_SHIELD',
  MOBILE_BELT = 'MOBILE_BELT',
  SEDIMENT_BASIN = 'SEDIMENT_BASIN',
  RIFT_MARGIN = 'RIFT_MARGIN',
  COASTAL_PLAIN = 'COASTAL_PLAIN',
  VOLCANIC_PROVINCE = 'VOLCANIC_PROVINCE',
  OCEANIC_BASIN = 'OCEANIC_BASIN',
  ISLAND_ARC = 'ISLAND_ARC',
}

export enum ContinentShapeType {
  COMPACT_SHIELD = 'COMPACT_SHIELD',
  RIFTED_BLOCK = 'RIFTED_BLOCK',
  COLLISION_WEDGE = 'COLLISION_WEDGE',
  ARC_ACCREDITED = 'ARC_ACCREDITED',
  RIBBON_CONTINENT = 'RIBBON_CONTINENT',
  TWIN_LOBE_CONTINENT = 'TWIN_LOBE_CONTINENT',
  PENINSULAR_CONTINENT = 'PENINSULAR_CONTINENT',
  BROKEN_MARGIN_CONTINENT = 'BROKEN_MARGIN_CONTINENT',
}

export enum ContinentMarginType {
  NONE = 'NONE',
  PASSIVE = 'PASSIVE',
  ACTIVE = 'ACTIVE',
  RIFT = 'RIFT',
  COLLISION = 'COLLISION',
  TRANSFORM = 'TRANSFORM',
  ACCRETED = 'ACCRETED',
}

export enum IslandCause {
  NONE = 'NONE',
  CONTINENTAL_FRAGMENT = 'CONTINENTAL_FRAGMENT',
  SHELF_ISLAND = 'SHELF_ISLAND',
  ISLAND_ARC = 'ISLAND_ARC',
  VOLCANIC_HOTSPOT = 'VOLCANIC_HOTSPOT',
  RIFT_FRAGMENT = 'RIFT_FRAGMENT',
  INVALID_FRAGMENT = 'INVALID_FRAGMENT',
}

export type SurfaceWaterMode =
  | 'DRY'
  | 'LIQUID_SURFACE_WATER'
  | 'MIXED_LIQUID_ICE'
  | 'SNOWBALL_SURFACE'
  | 'ICE_OVER_ROCK'
  | 'ICE_SHELL_OVER_OCEAN'
  | 'SUBSURFACE_BRINE'
  | 'STEAM_OR_VAPOR_DOMINATED';

export type SurfaceSupportMode =
  | 'ROCKY_CRUST'
  | 'LITHOSPHERE'
  | 'ICE_OVER_ROCK'
  | 'ICE_SHELL'
  | 'REGOLITH'
  | 'ARTIFICIAL_OR_FANTASY_SHELL';

export type GroundSurfaceMaterial =
  | 'ROCK'
  | 'SEDIMENT'
  | 'REGOLITH'
  | 'ICE'
  | 'ICE_OVER_ROCK'
  | 'ICE_SHELL'
  | 'ARTIFICIAL_SHELL';

export type GeologyStack =
  | 'PLATE_TECTONIC'
  | 'STAGNANT_LID'
  | 'RIFT_DOMINATED'
  | 'HOTSPOT_DOMINATED'
  | 'ICE_SHELL_TECTONIC'
  | 'IMPACT_ANCIENT'
  | 'VOLATILE_PRESSURE_SHELL'
  | 'ARTIFICIAL_DECLARED';

export interface PlanetFoundationSnapshot {
  planetProfile:
    | 'EARTHLIKE_ROCKY'
    | 'ROCKY_ALIEN'
    | 'VOLATILE_PRESSURE_ROCKY'
    | 'ICE_SHELL_OCEAN_WORLD'
    | 'DWARF_ROCKY_OR_ICY'
    | 'SUPER_EARTH_ROCKY'
    | 'ARTIFICIAL_OR_FANTASY_SHELL';
  surfaceSupportMode: SurfaceSupportMode;
  surfaceMaterialFamily: string;
  atmosphereFamily: string;
  waterPhaseFamily: string;
  validLayerStack: string[];

  surfaceWaterMode: SurfaceWaterMode;
  groundSurfaceMaterial: GroundSurfaceMaterial;
  geologyStack: GeologyStack;
  resolvedPhysicalConsequences: string[];
  waterInventory: number;
  seaLevelOffset: number;
  iceStability: number;
  adjustedAlbedo: number;

  planetRadiusEarth: number;
  planetDensityEarth: number;
  planetMassEarth: number;
  surfaceGravityEarth: number;
  escapeVelocityEarth: number;
  reliefGravityScale: number;
  atmosphereRetentionIndex: number;

  starLuminositySun: number;
  orbitalDistanceAU: number;
  stellarFluxEarth: number;
  albedo: number;
  greenhouseStrength: number;
  surfaceAbsorbedFlux: number;
  effectiveHeatIndex: number;
  evaporationPotential: number;
  snowlineBias: number;

  thermalAge: number;
  primordialHeat: number;
  radiogenicHeat: number;
  tidalHeatingIndex: number;
  coreHeat: number;
  mantleHeat: number;
  heatFlowIndex: number;
  mantleConvectionIndex: number;
  tectonicVigor: number;
  volcanismBias: number;
  riftLikelihood: number;
  hotspotPotential: number;
  volatileInventory: number;
  erosionSedimentScale: number;
}

export interface ContinentSkeleton {
  id: number;
  shapeType: ContinentShapeType;
  coreLat: number;
  coreLon: number;
  size: number;
  axisAngle: number;
  elongation: number;
  lobeCount: number;
}

export interface OceanBasinSkeleton {
  id: number;
  centerLat: number;
  centerLon: number;
  strength: number;
}

export interface WorldMetadata {
  id: string;
  name: string;
  seed: string;
  schemaVersion: string;
  seaLevel?: number;
  version: string;
  styleMode: 'EARTHLIKE' | 'FANTASY' | 'STYLIZED' | 'ALIEN';
  gridWidth: number;
  gridHeight: number;
  createdAt: string;
  updatedAt: string;
  exportProfiles?: string[];
  description?: string;
  revisionId?: string;
  contentHash?: string;
}

export interface Cell {
  index: number;
  baseHeight: number;
  editHeightDelta: number;
  simHeightDelta: number;
  isWater: boolean;
  flowDirection: number | null;
  flowAccumulation: number;
  basinId: number | null;
  temperature: number;
  rainfall: number;
  climateCellId: number;
  prevailingWind: Vec2;
  plateId: number;
  plateType: PlateType;
  boundaryType: BoundaryType;
  upliftRate: number;
  surfaceAge: number;
  volcanicActivity: number;
  continentId: number | null;
  continentCoreStrength: number;
  continentality: number;
  distanceToContinentCore: number;
  marginType: ContinentMarginType;
  oceanBasinId: number | null;
  shelfStrength: number;
  islandCause: IslandCause;
  crustThickness: number;
  crustAge: number;
  crustProvince: CrustProvince;
  baseBiomeId: number;
  editBiomeId: number;
  surfaceType: SurfaceType;
  snowCover: number;
  oceanDepthClass: OceanDepthClass | null;
  countryId?: string;
  cultureId?: string;
  cultureMix?: { cultureId: string; weight: number }[];
}

export interface Plate {
  id: number;
  type: PlateType;
  velocity: Vec2;
  polygons?: { lat: number; lon: number }[][];
}

export interface River {
  id: string;
  sourceCellIndex: number;
  mouthCellIndex: number;
  path: number[];
}

export interface Country {
  id: string;
  name: string;
  polygons: { lat: number; lon: number }[][];
  color?: string;
}

export interface Culture {
  id: string;
  name: string;
  color?: string;
}

export interface CultureRegion {
  id: string;
  cultureId: string;
  polygon: { lat: number; lon: number }[];
  falloff: number;
  opacity: number;
}

export interface City {
  id: string;
  name: string;
  cellIndex: number;
  population: number;
  countryId?: string;
  cultureId?: string;
  type?: 'VILLAGE' | 'TOWN' | 'CITY' | 'METROPOLIS' | 'FORT' | 'PORT';
  isCapital?: boolean;
  populationTier?: 1 | 2 | 3 | 4 | 5;
  economicRoles?: ('AGRICULTURAL' | 'INDUSTRIAL' | 'TRADE' | 'RELIGIOUS' | 'MILITARY')[];
  strategicValue?: number;
  tags?: string[];
  description?: string;
}

export interface Location {
  id: string;
  name: string;
  cellIndex: number;
  type: string;
  coordinates?: { lat: number; lon: number };
  description?: string;
  category?: string;
  tags?: string[];
}

export interface Sticker {
  id: string;
  name: string;
  type: 'BIOME' | 'CULTURE' | 'HEIGHT';
  mode: 'WORLD_RULES' | 'OVERRIDE';
  polygon: { lat: number; lon: number }[];
  falloff: number;
  payload: {
    biomeId?: number;
    cultureId?: string;
    heightDelta?: number;
  };
}

export interface WorldBrain {
  gridWidth: number;
  gridHeight: number;
  seaLevel: number;
  cells: Cell[];
  plates: Plate[];
  rivers: River[];
  countries: Country[];
  cultures: Culture[];
  cultureRegions: CultureRegion[];
  cities: City[];
  locations?: Location[];
  stickers?: Sticker[];
  continentSkeletons?: ContinentSkeleton[];
  oceanBasinSkeletons?: OceanBasinSkeleton[];
  planetFoundation?: PlanetFoundationSnapshot;
  metadata: WorldMetadata;
  parameters?: Record<string, unknown>;
}

export function createEmptyCell(index: number): Cell {
  return {
    index,
    baseHeight: 0,
    editHeightDelta: 0,
    simHeightDelta: 0,
    isWater: false,
    flowDirection: null,
    flowAccumulation: 0,
    basinId: null,
    temperature: 0.5,
    rainfall: 0.5,
    climateCellId: 0,
    prevailingWind: [0, 0],
    plateId: 0,
    plateType: PlateType.CONTINENTAL,
    boundaryType: BoundaryType.NONE,
    upliftRate: 0,
    surfaceAge: 0.5,
    volcanicActivity: 0,
    continentId: null,
    continentCoreStrength: 0,
    continentality: 0,
    distanceToContinentCore: 1,
    marginType: ContinentMarginType.NONE,
    oceanBasinId: null,
    shelfStrength: 0,
    islandCause: IslandCause.NONE,
    crustThickness: 0.5,
    crustAge: 0.5,
    crustProvince: CrustProvince.OLD_SHIELD,
    baseBiomeId: 0,
    editBiomeId: 0,
    surfaceType: SurfaceType.ROCK,
    snowCover: 0,
    oceanDepthClass: null,
  };
}
