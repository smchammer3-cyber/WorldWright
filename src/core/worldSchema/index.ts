// WorldWright – World Schema Module
// Core data structures of the WorldBrain (Blueprint V1.3 + Modular PT4)

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
  SAND = 'SAND',
  PEAT = 'PEAT',
  PERMAFROST = 'PERMAFROST',
  SALT_FLATS = 'SALT_FLATS',
  ICE = 'ICE',
}

export enum OceanDepthClass {
  SHELF = 'SHELF',
  SLOPE = 'SLOPE',
  ABYSSAL = 'ABYSSAL',
  TRENCH = 'TRENCH',
}

export interface RiverSegment {
  id: string;
  points: { cellIndex: number; width: number; depth: number }[];
  isMainStem: boolean;
  tributaryOf?: string;
}

export interface Country {
  id: string;
  name: string;
  color: string;
  polygons: { lat: number; lon: number }[][];
  metadata: {
    capitalCityId?: string;
    tags?: string[];
  };
}

export interface Culture {
  id: string;
  name: string;
  color: string;
  parentCultureId?: string;
  originYear?: number;
  languageFamily?: string;
  religionTags?: string[];
  traits?: {
    openness?: number;
    militarism?: number;
    tradition?: number;
    expansionism?: number;
    collectivism?: number;
  };
  preferredBiomes?: string[];
  coastalAffinity?: number;
  riverAffinity?: number;
  mountainAffinity?: number;
  stabilityBase?: number;
  techBase?: number;
}

export interface CultureRegion {
  id: string;
  cultureId: string;
  polygon: { lat: number; lon: number }[];
  falloff: number;
  isOverride?: boolean;
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
  type: 'WONDER' | 'RUIN' | 'DUNGEON' | 'NATURAL_WONDER' | 'MAGICAL_ZONE' | 'LANDMARK';
  lat: number;
  lon: number;
  cellIndex: number;
  polygon?: { lat: number; lon: number }[];
  countryId?: string;
  cultureId?: string;
  tags?: string[];
  description?: string;
}

export interface Sticker {
  id: string;
  type: 'BIOME' | 'CULTURE' | 'TERRAIN' | 'RESOURCE' | 'SPECIAL';
  polygon: { lat: number; lon: number }[];
  falloff: number;
  mode: 'WORLD_RULES' | 'OVERRIDE';
  metadata?: Record<string, any>;
}

export interface WorldMetadata {
  id: string;
  name: string;
  seed: string;
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

  baseHeight: number;
  editHeightDelta: number;
  simHeightDelta: number;

  isWater: boolean;
  seaLevel: number;

  flowDirection: number | null;
  flowAccumulation: number;
  basinId: number | null;

  temperature: number;
  rainfall: number;

  climateCellId: number;
  prevailingWind: [number, number];

  plateId: number;
  plateType: PlateType;
  boundaryType: BoundaryType;
  upliftRate: number;

  surfaceAge: number;
  volcanicActivity: number;

  baseBiomeId: number;
  editBiomeId?: number;

  surfaceType: SurfaceType;

  snowCover: number;
  oceanDepthClass: OceanDepthClass | null;

  countryId?: string;

  cultureId?: string;
  cultureMix?: { cultureId: string; weight: number }[];
}

export interface WorldBrain {
  gridWidth: number;
  gridHeight: number;
  cells: Cell[];

  plates: { id: number; name: string; type: PlateType }[];

  rivers: RiverSegment[];
  countries: Country[];

  cultures: Culture[];
  cultureRegions: CultureRegion[];

  cities: City[];

  locations?: Location[];
  stickers?: Sticker[];

  metadata: WorldMetadata;
}

export function createEmptyCell(index: number, seaLevel: number): Cell {
  return {
    index,
    baseHeight: 0,
    editHeightDelta: 0,
    simHeightDelta: 0,
    isWater: false,
    seaLevel,
    flowDirection: null,
    flowAccumulation: 0,
    basinId: null,
    temperature: 0,
    rainfall: 0,
    climateCellId: 0,
    prevailingWind: [0, 0],
    plateId: 0,
    plateType: PlateType.OCEANIC,
    boundaryType: BoundaryType.NONE,
    upliftRate: 0,
    surfaceAge: 0.5,
    volcanicActivity: 0,
    baseBiomeId: 0,
    surfaceType: SurfaceType.ROCK,
    snowCover: 0,
    oceanDepthClass: null,
    cultureMix: undefined,
  };
}