// WorldWright – World Schema Module
// Core data structures for WorldBrain and related sub-systems.
//
// NOTE: This is the single source of truth for the world data contract.
//
// ========================================================
// JARVIS CHANGE HEADER -- V1.3 SCHEMA REALIGNMENT (GLOBAL SEA LEVEL)
// File: src/core/worldSchema/index.ts
//
// Fixes:
// - Removed per-cell seaLevel; a single global seaLevel exists on the WorldBrain.
// - Cells compute `isWater` from (baseHeight + editHeightDelta + simHeightDelta) vs the
//   world’s global seaLevel.  Updated whenever terrain or seaLevel changes.
// - Unified metadata: use `version` instead of `schemaVersion` (blueprint field).
// - Updated Sticker interface to match blueprint V1.3 shape.
// ========================================================

export enum PlateType {
  OCEANIC = "OCEANIC",
  CONTINENTAL = "CONTINENTAL",
}

export enum BoundaryType {
  NONE = "NONE",
  DIVERGENT = "DIVERGENT",
  CONVERGENT = "CONVERGENT",
  TRANSFORM = "TRANSFORM",
}

export enum SurfaceType {
  ROCK = "ROCK",
  VOLCANIC = "VOLCANIC",
  ALLUVIAL = "ALLUVIAL",
  SAND = "SAND",
  PEAT = "PEAT",
  SALT_FLATS = "SALT_FLATS",
  PERMAFROST = "PERMAFROST",
}

export enum OceanDepthClass {
  SHELF = "SHELF",
  SLOPE = "SLOPE",
  ABYSSAL = "ABYSSAL",
  TRENCH = "TRENCH",
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

/**
 * Blueprint-aligned Sticker shape (V1.3).
 *
 * - type: what system it affects (BIOME / CULTURE / TERRAIN / etc.)
 * - polygon: editable vertex list (no freehand)
 * - falloff: soft edge in cell units
 * - mode: WORLD_RULES (physics-aware) or OVERRIDE (freeform)
 * - metadata: payload (e.g., biomeId, cultureId, heightDelta, etc.)
 */
export interface Sticker {
  id: string;
  type: string;
  polygon: [number, number][];
  falloff: number;
  mode: "WORLD_RULES" | "OVERRIDE";
  metadata?: Record<string, any>;
}

export interface Plate {
  id: number;
  name: string;
  type: PlateType;
}

export interface River {
  id: number;
  name?: string;
  points?: [number, number][];
}

export interface WorldMetadata {
  id: string;
  name: string;
  seed: string;

  // Blueprint field: version string used for schema/profile versioning
  version: string;

  styleMode: "EARTHLIKE" | "FANTASY" | "STYLIZED" | "ALIEN";
  gridWidth: number;
  gridHeight: number;
  createdAt: string;
  updatedAt: string;
  exportProfiles?: string[];
  description?: string;
}

export interface Cell {
  index: number;

  // Height layers (blueprint: base + editable + sim)
  baseHeight: number;
  editHeightDelta: number;
  simHeightDelta: number;

  /**
   * Derived land/water flag. This is computed from the global world.seaLevel and the
   * height of each cell to derive `isWater`.  Per-cell seaLevel has been
   * removed to keep a single source of truth.
   */
  isWater: boolean;

  // Hydrology
  flowDirection: number | null; // 0..7 (8-neighbor) or null
  flowAccumulation: number; // number of upstream cells or normalized value
  basinId: number | null;

  // Climate
  temperature: number; // 0..1
  rainfall: number; // 0..1
  climateCellId: number;
  prevailingWind: [number, number];

  // Tectonics / geology
  plateId: number;
  plateType: PlateType;
  boundaryType: BoundaryType;
  upliftRate: number;
  surfaceAge: number; // 0..1
  volcanicActivity: number; // 0..1

  // Biomes
  baseBiomeId: number;
  editBiomeId?: number;

  // Surface classification
  surfaceType: SurfaceType;

  // Snow / ice
  snowCover: number; // 0..1
  oceanDepthClass: OceanDepthClass | null;

  // Political / cultural
  countryId?: string;
  cultureId?: string;
  cultureMix?: { cultureId: string; weight: number }[];
}

export interface WorldBrain {
  gridWidth: number;
  gridHeight: number;

  /**
   * Global sea level scalar used across the entire world.  Water is determined by comparing
   * (baseHeight + editHeightDelta + simHeightDelta) against this value.
   */
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

    // isWater will be computed after generation based on global seaLevel
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

    baseBiomeId: 0,
    editBiomeId: 0,

    surfaceType: SurfaceType.ROCK,

    snowCover: 0,
    oceanDepthClass: null,
  };
}