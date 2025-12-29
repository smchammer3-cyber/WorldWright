// WorldWright – World Schema Module
// Core data structures for WorldBrain and related sub-systems.
//
// NOTE: This is the single source of truth for the world data contract.
//
// ========================================================
// JARVIS CHANGE HEADER -- METADATA SCHEMA ALIGNMENT (V1.3)
// File: src/core/worldSchema/index.ts
//
// Fixes:
// - Add metadata.schemaVersion (required) to match worldStorage.ensureWorldMetadata().
// - Add optional metadata.seaLevel (global sea level threshold) used by generator/renderer.
// ========================================================

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
  ALLUVIAL = 'ALLUVIAL',
  SAND = 'SAND',
  PEAT = 'PEAT',
  SALT_FLATS = 'SALT_FLATS',
  PERMAFROST = 'PERMAFROST',
}

export enum OceanDepthClass {
  SHELF = 'SHELF',
  SLOPE = 'SLOPE',
  ABYSSAL = 'ABYSSAL',
  TRENCH = 'TRENCH',
}

export interface Country {
  id: string;
  name: string;
  color: string;
  polygon: [number, number][];
}

export interface Culture {
  id: string;
  name: string;
  color: string;
}

export interface CultureRegion {
  id: string;
  cultureId: string;
  // radius-based influence OR polygon-based influence (future)
  polygon: [number, number][];
  opacity?: number;
}

export interface City {
  id: string;
  name: string;
  x: number;
  y: number;
  population: number;
  cultureId?: string;
  countryId?: string;
}

export interface Location {
  id: string;
  name: string;
  x: number;
  y: number;
  kind?: string;
}

export interface Sticker {
  id: string;
  name: string;
  kind: string; // biome / culture / terrain / prop / etc.
  polygon: [number, number][];
  falloff?: number;
  overrideWorldRules?: boolean;
  payload?: any;
}

export interface Plate {
  id: number;
  name: string;
  type: PlateType;
}

export interface River {
  id: number;
  name?: string;
  // derived polylines (future) – for now we store placeholder structure
  points?: [number, number][];
}

export interface WorldMetadata {
  id: string;
  name: string;
  seed: string;

  // REQUIRED: worldStorage expects this to exist and will default to "v3"
  schemaVersion: string;

  // global sea level threshold used by generator/renderer (V1.3)
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

  plates: Plate[];
  rivers: River[];

  countries: Country[];
  cultures: Culture[];
  cultureRegions: CultureRegion[];
  cities: City[];

  locations?: Location[];
  stickers?: Sticker[];

  metadata: WorldMetadata;
}

// -----------------------------
// Helpers
// -----------------------------

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

    baseBiomeId: 0,
    editBiomeId: 0,

    surfaceType: SurfaceType.ROCK,

    snowCover: 0,
    oceanDepthClass: null,
  };
}