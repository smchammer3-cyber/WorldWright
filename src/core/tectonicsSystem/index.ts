// ========================================================
// WORLDWRIGHT -- TECTONICS SYSTEM (V1.3 UPGRADED)
// File: src/core/tectonicsSystem/index.ts
//
// Purpose:
// - provide a real tectonic field source of truth
// - generate better-distributed plates
// - assign per-cell plate ownership
// - classify boundaries with stronger semantics
// - expose uplift/trench/ridge influence that worldGenerator can use
// ========================================================

import type { Plate, PlateType, BoundaryType } from '../worldSchema';
import {
  PlateType as PlateTypeEnum,
  BoundaryType as BoundaryTypeEnum,
} from '../worldSchema';

type Vec2 = [number, number];

type PlateSeed = {
  plateId: number;
  row: number;
  col: number;
  type: PlateType;
  velocity: Vec2;
  driftAxis: Vec2;
  elevationBias: number;
};

export interface TectonicsField {
  plateId: number;
  plateType: PlateType;
  boundaryType: BoundaryType;
  upliftRate: number; // negative = trench/rift pull, positive = uplift
  boundaryStrength: number; // 0..1
  compression: number; // -1..1
  distanceToBoundary: number; // 0..1
  isBoundary: boolean;
}

export interface TectonicsResult {
  plates: Plate[];
  fields: TectonicsField[];
  seeds: PlateSeed[];
}

/**
 * Generate tectonic plates with better spread and explicit continental/oceanic intent.
 */
export function generatePlates(
  gridWidth: number,
  gridHeight: number,
  plateCount: number,
  rng: () => number
): Plate[] {
  const count = Math.max(2, Math.floor(plateCount));
  const continentalTarget = Math.max(1, Math.round(count * 0.42));

  const plates: Plate[] = [];

  for (let i = 0; i < count; i++) {
    const isContinental = i < continentalTarget;

    const angle = rng() * Math.PI * 2;
    const speed = isContinental
      ? 0.04 + rng() * 0.08
      : 0.06 + rng() * 0.10;

    plates.push({
      id: i,
      type: isContinental ? PlateTypeEnum.CONTINENTAL : PlateTypeEnum.OCEANIC,
      velocity: [Math.cos(angle) * speed, Math.sin(angle) * speed],
    });
  }

  return shuffleInPlace(plates, rng);
}

/**
 * Full tectonics solve:
 * - generates well-spaced seeds
 * - assigns cells by wrapped toroidal Voronoi
 * - classifies boundaries using relative plate motion
 * - computes per-cell boundary proximity / uplift field
 */
export function buildTectonicsField(
  gridWidth: number,
  gridHeight: number,
  cells: any[],
  plateCount: number,
  rng: () => number
): TectonicsResult {
  const plates = generatePlates(gridWidth, gridHeight, plateCount, rng);
  const seeds = createPlateSeeds(gridWidth, gridHeight, plates, rng);
  const fields = assignPlatesToCells(gridWidth, gridHeight, cells, plates, seeds);

  return { plates, fields, seeds };
}

/**
 * Backward-compatible entry point. If seeds are not provided, they will be generated.
 */
export function assignPlatesToCells(
  gridWidth: number,
  gridHeight: number,
  cells: any[],
  plates: Plate[],
  seeds?: PlateSeed[]
): TectonicsField[] {
  const localSeeds =
    seeds && seeds.length === plates.length
      ? seeds
      : createPlateSeeds(gridWidth, gridHeight, plates, mulberry32(123456789));

  const fields: TectonicsField[] = new Array(cells.length);
  const plateMap = new Array<number>(cells.length).fill(-1);

  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      const idx = row * gridWidth + col;

      let bestSeed = localSeeds[0];
      let bestDist = Infinity;
      let secondBestDist = Infinity;

      for (const seed of localSeeds) {
        const d = wrappedGridDistance(row, col, seed.row, seed.col, gridWidth, gridHeight);

        if (d < bestDist) {
          secondBestDist = bestDist;
          bestDist = d;
          bestSeed = seed;
        } else if (d < secondBestDist) {
          secondBestDist = d;
        }
      }

      plateMap[idx] = bestSeed.plateId;

      const plate = plates[bestSeed.plateId];
      const boundaryGap = secondBestDist - bestDist;
      const boundaryStrength = clamp01(1 - boundaryGap / 4.5);

      fields[idx] = {
        plateId: bestSeed.plateId,
        plateType: plate.type,
        boundaryType: BoundaryTypeEnum.NONE as BoundaryType,
        upliftRate: 0,
        boundaryStrength: boundaryStrength * 0.6,
        compression: 0,
        distanceToBoundary: 1 - boundaryStrength,
        isBoundary: false,
      };
    }
  }

  // Boundary classification based on neighboring plates and relative motion
  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      const idx = row * gridWidth + col;
      const myPlateId = plateMap[idx];
      const myPlate = plates[myPlateId];
      const mySeed = localSeeds[myPlateId];

      const neighborIndices = getNeighborIndices(row, col, gridWidth, gridHeight);

      let strongestBoundaryType: BoundaryType = BoundaryTypeEnum.NONE as BoundaryType;
      let strongestBoundaryScore = 0;
      let strongestCompression = 0;
      let minBoundaryDistance = fields[idx].distanceToBoundary;

      for (const nIdx of neighborIndices) {
        const nPlateId = plateMap[nIdx];
        if (nPlateId === myPlateId) continue;

        const nPlate = plates[nPlateId];
        const nSeed = localSeeds[nPlateId];

        const nRow = Math.floor(nIdx / gridWidth);
        const nCol = nIdx % gridWidth;

        const normal = normalize2(wrappedDirectionVector(
          row,
          col,
          nRow,
          nCol,
          gridWidth,
          gridHeight
        ));

        const relativeVelocity: Vec2 = [
          myPlate.velocity[0] - nPlate.velocity[0],
          myPlate.velocity[1] - nPlate.velocity[1],
        ];

        // Positive = compressing toward each other, negative = separating
        const convergence = -dot2(relativeVelocity, normal);

        const boundaryType = classifyBoundary(myPlate.type, nPlate.type, convergence);
        const boundaryScore = Math.abs(convergence);

        if (boundaryScore > strongestBoundaryScore) {
          strongestBoundaryScore = boundaryScore;
          strongestBoundaryType = boundaryType;
          strongestCompression = clamp(convergence, -1, 1);
        }

        const seedBoundaryDistance =
          Math.abs(
            wrappedGridDistance(row, col, mySeed.row, mySeed.col, gridWidth, gridHeight) -
              wrappedGridDistance(row, col, nSeed.row, nSeed.col, gridWidth, gridHeight)
          ) * 0.5;

        minBoundaryDistance = Math.min(minBoundaryDistance, clamp01(seedBoundaryDistance / 6));
      }

      if (strongestBoundaryType !== BoundaryTypeEnum.NONE) {
        const field = fields[idx];
        field.boundaryType = strongestBoundaryType;
        field.compression = strongestCompression;
        field.isBoundary = true;
        field.distanceToBoundary = minBoundaryDistance;
        field.boundaryStrength = Math.max(
          field.boundaryStrength,
          clamp01(1 - minBoundaryDistance)
        );
        field.upliftRate = computeUpliftRate(
          strongestBoundaryType,
          strongestCompression,
          field.boundaryStrength,
          myPlate.type
        );
      }
    }
  }

  // Interior continental support / oceanic basin tendency
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (field.isBoundary) continue;

    if (field.plateType === PlateTypeEnum.CONTINENTAL) {
      field.upliftRate = lerp(0.04, 0.12, 1 - field.distanceToBoundary);
    } else {
      field.upliftRate = lerp(-0.10, -0.03, 1 - field.distanceToBoundary);
    }
  }

  return fields;
}

/**
 * Apply uplift directly onto cells. Keep this moderate because worldGenerator
 * should still own final terrain composition.
 */
export function applyTectonicUplift(
  cells: any[],
  tectonicsFields: TectonicsField[],
  plateAmp: number = 1.0
): void {
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const tectonic = tectonicsFields[i];
    if (!cell || !tectonic) continue;

    const strength = tectonic.upliftRate * plateAmp;

    if (tectonic.boundaryType === BoundaryTypeEnum.CONVERGENT) {
      cell.baseHeight += strength * 0.18;
    } else if (tectonic.boundaryType === BoundaryTypeEnum.DIVERGENT) {
      cell.baseHeight += strength * 0.10;
    } else if (tectonic.boundaryType === BoundaryTypeEnum.TRANSFORM) {
      cell.baseHeight += strength * 0.04;
    } else {
      cell.baseHeight += strength * 0.03;
    }
  }
}

/**
 * Build deterministic, better-spaced seeds from the plate list.
 */
function createPlateSeeds(
  gridWidth: number,
  gridHeight: number,
  plates: Plate[],
  rng: () => number
): PlateSeed[] {
  const seeds: PlateSeed[] = [];
  const minSeedDistance = Math.max(8, Math.min(gridWidth, gridHeight) * 0.18);

  for (const plate of plates) {
    let bestRow = Math.floor(rng() * gridHeight);
    let bestCol = Math.floor(rng() * gridWidth);
    let bestScore = -Infinity;

    // Poisson-ish candidate search
    for (let attempt = 0; attempt < 40; attempt++) {
      const row = Math.floor(rng() * gridHeight);
      const col = Math.floor(rng() * gridWidth);

      let nearest = Infinity;
      for (const seed of seeds) {
        const d = wrappedGridDistance(row, col, seed.row, seed.col, gridWidth, gridHeight);
        nearest = Math.min(nearest, d);
      }

      const equatorBias =
        plate.type === PlateTypeEnum.CONTINENTAL
          ? 1 - Math.abs(row / Math.max(1, gridHeight - 1) - 0.5) * 2 * 0.45
          : 1;

      const score = (seeds.length === 0 ? minSeedDistance : nearest) * equatorBias;

      if (score > bestScore) {
        bestScore = score;
        bestRow = row;
        bestCol = col;
      }
    }

    const angle = rng() * Math.PI * 2;
    const driftAxis: Vec2 = [Math.cos(angle), Math.sin(angle)];

    seeds.push({
      plateId: plate.id,
      row: bestRow,
      col: bestCol,
      type: plate.type,
      velocity: [plate.velocity[0], plate.velocity[1]],
      driftAxis,
      elevationBias:
        plate.type === PlateTypeEnum.CONTINENTAL
          ? 0.10 + rng() * 0.12
          : -0.16 + rng() * 0.08,
    });
  }

  return seeds;
}

function classifyBoundary(
  a: PlateType,
  b: PlateType,
  convergence: number
): BoundaryType {
  if (convergence > 0.06) {
    return BoundaryTypeEnum.CONVERGENT as BoundaryType;
  }

  if (convergence < -0.05) {
    return BoundaryTypeEnum.DIVERGENT as BoundaryType;
  }

  return BoundaryTypeEnum.TRANSFORM as BoundaryType;
}

function computeUpliftRate(
  boundaryType: BoundaryType,
  compression: number,
  boundaryStrength: number,
  plateType: PlateType
): number {
  const strength = clamp01(boundaryStrength);

  if (boundaryType === BoundaryTypeEnum.CONVERGENT) {
    const base = 0.35 + strength * 0.55 + Math.max(0, compression) * 0.20;
    return plateType === PlateTypeEnum.CONTINENTAL
      ? clamp(base, -1, 1)
      : clamp(base * 0.70, -1, 1);
  }

  if (boundaryType === BoundaryTypeEnum.DIVERGENT) {
    const ridgeLift = plateType === PlateTypeEnum.OCEANIC ? 0.10 : 0.04;
    return clamp(-0.10 + ridgeLift + compression * 0.10 + strength * 0.18, -1, 1);
  }

  if (boundaryType === BoundaryTypeEnum.TRANSFORM) {
    return clamp(0.02 + strength * 0.06, -1, 1);
  }

  return 0;
}

function getNeighborIndices(
  row: number,
  col: number,
  gridWidth: number,
  gridHeight: number
): number[] {
  const west = (col - 1 + gridWidth) % gridWidth;
  const east = (col + 1) % gridWidth;

  const neighbors: number[] = [
    row * gridWidth + west,
    row * gridWidth + east,
  ];

  if (row > 0) {
    neighbors.push((row - 1) * gridWidth + col);
  }
  if (row < gridHeight - 1) {
    neighbors.push((row + 1) * gridWidth + col);
  }

  return neighbors;
}

function wrappedGridDistance(
  rowA: number,
  colA: number,
  rowB: number,
  colB: number,
  gridWidth: number,
  gridHeight: number
): number {
  const dr = rowA - rowB;
  const rawDc = Math.abs(colA - colB);
  const dc = Math.min(rawDc, gridWidth - rawDc);
  return Math.hypot(dr, dc);
}

function wrappedDirectionVector(
  rowA: number,
  colA: number,
  rowB: number,
  colB: number,
  gridWidth: number,
  gridHeight: number
): Vec2 {
  let dc = colB - colA;
  if (dc > gridWidth / 2) dc -= gridWidth;
  if (dc < -gridWidth / 2) dc += gridWidth;

  const dr = rowB - rowA;
  return [dc, dr];
}

function dot2(a: Vec2, b: Vec2): number {
  return a[0] * b[0] + a[1] * b[1];
}

function normalize2(v: Vec2): Vec2 {
  const len = Math.hypot(v[0], v[1]) || 1;
  return [v[0] / len, v[1] / len];
}

function clamp(x: number, lo: number, hi: number): number {
  return x < lo ? lo : x > hi ? hi : x;
}

function clamp01(x: number): number {
  return clamp(x, 0, 1);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function shuffleInPlace<T>(arr: T[], rng: () => number): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function mulberry32(a: number): () => number {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}