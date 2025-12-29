// ========================================================
// WORLDWRIGHT -- WORLD SCHEMA (V1.3)
// File: src/core/worldSchema/index.ts
//
// Single source of truth for world data.
// Global sea level. Non-destructive edit layers.
// No archive references.
// ========================================================

/* -------------------- Enums -------------------- */

export enum PlateType {
  CONTINENTAL = "CONTINENTAL",
  OCEANIC = "OCEANIC",
}

export enum BoundaryType {
  NONE = "NONE",
  CONVERGENT = "CONVERGENT",
  DIVERGENT = "DIVERGENT",
  TRANSFORM = "TRANSFORM",
}

export enum SurfaceType {
  ROCK = "ROCK",
  SAND = "SAND",
  ALLUVIAL = "ALLUVIAL",
  VOLCANIC = "VOLCANIC",
  PERMAFROST = "PERMAFROST",
}

export enum OceanDepthClass {
  SHELF = "SHELF",
  ABYSSAL = "ABYSSAL",
  TRENCH = "TRENCH",
}

/* -------------------- Cell -------------------- */

export interface Cell {
  index: number;

  // Height layers
  baseHeight: number;
  editHeightDelta: number;
  simHeightDelta: number;

  // Climate
  temperature: number;
  rainfall: number;

  // Hydrology
  flowDirection: number | null; // 0..7 or null
  flowAccumulation: number;
  basinId: number | null;

  // Plate / geology
  plateId: number;
  plateType: PlateType;
  boundaryType: BoundaryType;
  upliftRate: number;
  surfaceAge: number;
  volcanicActivity: number;

  // Biomes
  baseBiomeId: number;
  editBiomeId: number | null;

  // Surface
  surfaceType: SurfaceType;
  oceanDepthClass: OceanDepthClass | null;

  // Cryosphere
  snowCover: number;

  // Derived
  isWater: boolean;

  // Political / cultural (optional)
  countryId?: number;
  cultureId?: number;
  cultureMix?: Record<number, number>;
}

/* -------------------- World Objects -------------------- */

export interface Plate {
  id: number;
  name: string;
  type: PlateType;
}

export interface River {
  id: number;
  path: number[]; // cell indices
}

export interface Country {
  id: number;
  name: string;
  polygon: number[]; // cell indices
}

export interface Culture {
  id: number;
  name: string;
  color: string;
}

export interface CultureRegion {
  cultureId: number;
  polygon: number[];
}

export interface City {
  id: number;
  name: string;
  cellIndex: number;
  population: number;
}

export interface Location {
  id: number;
  name: string;
  cellIndex: number;
}

export interface Sticker {
  id: string;
  type: "TERRAIN" | "BIOME" | "CULTURE";
  polygon: number[];
  data: Record<string, any>;
}

/* -------------------- Metadata -------------------- */

export interface WorldMetadata {
  id: string;
  name: string;
  seed: string;
  version: "1.3";
  styleMode: "EARTHLIKE" | "FANTASY" | "STYLIZED" | "ALIEN";
  gridWidth: number;
  gridHeight: number;
  createdAt: string;
  updatedAt: string;
}

/* -------------------- WorldBrain -------------------- */

export interface WorldBrain {
  gridWidth: number;
  gridHeight: number;

  // Global sea level (0..1)
  seaLevel: number;

  cells: Cell[];

  plates: Plate[];
  rivers: River[];

  countries: Country[];
  cultures: Culture[];
  cultureRegions: CultureRegion[];
  cities: City[];
  locations: Location[];
  stickers: Sticker[];

  metadata: WorldMetadata;
}

/* -------------------- Helpers -------------------- */

export function createEmptyCell(index: number): Cell {
  return {
    index,

    baseHeight: 0,
    editHeightDelta: 0,
    simHeightDelta: 0,

    temperature: 0,
    rainfall: 0,

    flowDirection: null,
    flowAccumulation: 0,
    basinId: null,

    plateId: 0,
    plateType: PlateType.CONTINENTAL,
    boundaryType: BoundaryType.NONE,
    upliftRate: 0,
    surfaceAge: 0,
    volcanicActivity: 0,

    baseBiomeId: 0,
    editBiomeId: null,

    surfaceType: SurfaceType.ROCK,
    oceanDepthClass: null,

    snowCover: 0,
    isWater: false,
  };
}