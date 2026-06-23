// ========================================================
// WORLDWRIGHT -- WORLD SCHEMA (V1.3)
// File: src/core/worldSchema/index.ts
//
// Contract lock:
// - Global seaLevel lives on WorldBrain (and mirrored to metadata.seaLevel for storage/compat).
// - Cells DO NOT store seaLevel.
// - Cells only store editable + derived layers.
//
// This is a "spine contract" file. Change only with migration + validator updates.
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

export interface WorldMetadata {
  id: string;
  name: string;
  seed: string;

  // REQUIRED: worldStorage expects this to exist and will default to "v3"
  schemaVersion: string;

  // mirrored global sea level threshold used by generator/renderer (V1.3)
  seaLevel?: number;

  version: string;
  styleMode: 'EARTHLIKE' | 'FANTASY' | 'STYLIZED' | 'ALIEN';
  gridWidth: number;
  gridHeight: number;
  createdAt: string;
  updatedAt: string;
  exportProfiles?: string[];
  description?: string;
}

export interface Cell {
  index: number;

  // Terrain layers
  baseHeight: number;
  editHeightDelta: number;
  simHeightDelta: number;

  // Derived
  isWater: boolean;

  // Hydrology (derived or sim)
  flowDirection: number | null;
  flowAccumulation: number;
  basinId: number | null;

  // Climate (derived or sim)
  temperature: number; // 0..1
  rainfall: number; // 0..1
  climateCellId: number;
  prevailingWind: Vec2;

  // Tectonics / geology (base or derived)
  plateId: number;
  plateType: PlateType;
  boundaryType: BoundaryType;

  upliftRate: number; // -1..1
  surfaceAge: number; // 0..1
  volcanicActivity: number; // 0..1

  // Crust cause layer (base or derived)
  // These are intentionally separate from plateType so future generator work can
  // model old continental cores, young ocean basins, rifts, shelves, and buried
  // crust without making plate polygons directly paint land/water.
  crustThickness: number; // 0..1, higher means thicker/more buoyant crust
  crustAge: number; // 0..1, higher means older/more stable crust
  crustProvince: CrustProvince; // derived cause classification for terrain/coasts/islands

  // Biomes
  baseBiomeId: number;
  editBiomeId: number;

  // Surface classification
  surfaceType: SurfaceType;

  // Cryosphere
  snowCover: number; // 0..1

  // Ocean
  oceanDepthClass: OceanDepthClass | null;

  // Political / cultural overlays (creative layers)
  countryId?: string;
  cultureId?: string;
  cultureMix?: { cultureId: string; weight: number }[];
}

export interface Plate {
  id: number;
  type: PlateType;
  velocity: Vec2; // plate motion vector
  polygons?: { lat: number; lon: number }[][];
}

export interface River {
  id: number;
  sourceCellIndex: number;
  mouthCellIndex: number;
  path: number[]; // cell indices
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
  falloff: number; // 0..1
  opacity: number; // 0..1
}

export interface City {
  id: string;
  name: string;
  cellIndex: number;
  population: number;
  countryId?: string;
  cultureId?: string;

  // Extended metadata (V1.3 blueprint)
  type?: 'VILLAGE' | 'TOWN' | 'CITY' | 'METROPOLIS' | 'FORT' | 'PORT';
  isCapital?: boolean;
  populationTier?: 1 | 2 | 3 | 4 | 5; // 1=village, 5=metropolis
  economicRoles?: ('AGRICULTURAL' | 'INDUSTRIAL' | 'TRADE' | 'RELIGIOUS' | 'MILITARY')[];
  strategicValue?: number; // 0..1
  tags?: string[];
  description?: string;
}

export interface Location {
  id: string;
  name: string;
  cellIndex: number;
  type: string;
}

export interface Sticker {
  id: string;
  name: string;
  type: 'BIOME' | 'CULTURE' | 'HEIGHT';
  mode: 'WORLD_RULES' | 'OVERRIDE';
  polygon: { lat: number; lon: number }[];
  falloff: number; // 0..1
  payload: {
    biomeId?: number;
    cultureId?: string;
    heightDelta?: number;
  };
}

export interface WorldBrain {
  gridWidth: number;
  gridHeight: number;

  // GLOBAL sea level threshold (0..1 space of generator’s normalized height field)
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

  metadata: WorldMetadata;

  // Optional: generator parameters snapshot (not enforced by schema)
  parameters?: Record<string, unknown>;
}

// -----------------------------
// Helpers
// -----------------------------
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
