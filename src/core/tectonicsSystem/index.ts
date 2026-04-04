// ========================================================
// WORLDWRIGHT -- TECTONICS SYSTEM (V1.3 SPHERICAL OWNERSHIP)
// File: src/core/tectonicsSystem/index.ts
//
// Purpose:
// - provide a tectonic field source of truth
// - replace toroidal/grid ownership with spherical ownership
// - classify boundaries using relative plate motion
// - compute per-cell boundary proximity / uplift field
//
// Notes:
// - This pass fixes geometry first.
// - Ownership is based on nearest plate seed on the sphere.
// - Boundary distance is derived from actual unlike-plate adjacency,
//   not from seed-gap heuristics.
// ========================================================

import type { Plate, PlateType, BoundaryType } from '../worldSchema';
import {
  PlateType as PlateTypeEnum,
  BoundaryType as BoundaryTypeEnum,
} from '../worldSchema';

type Vec2 = [number, number];
type Vec3 = [number, number, number];

type PlateSeed = {
  plateId: number;
  row: number;
  col: number;
  lat: number;
  lon: number;
  dir: Vec3;
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
 * - generates well-spaced seeds on the sphere
 * - assigns cells by nearest spherical seed
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
  const cellDirs: Vec3[] = new Array(cells.length);

  // ----------------------------------------------------
  // Ownership by nearest spherical seed
  // ----------------------------------------------------
  for (let row = 0; row < gridHeight; row++) {
    const lat = rowToLat(row, gridHeight);

    for (let col = 0; col < gridWidth; col++) {
      const idx = row * gridWidth + col;
      const lon = colToLon(col, gridWidth);
      const cellDir = latLonToUnitVector(lat, lon);
      cellDirs[idx] = cellDir;

      let bestSeed = localSeeds[0];
      let bestDot = -Infinity;

      for (const seed of localSeeds) {
        const d = dot3(cellDir, seed.dir);
        if (d > bestDot) {
          bestDot = d;
          bestSeed = seed;
        }
      }

      plateMap[idx] = bestSeed.plateId;
      const plate = plates[bestSeed.plateId];

      fields[idx] = {
        plateId: bestSeed.plateId,
        plateType: plate.type,
        boundaryType: BoundaryTypeEnum.NONE as BoundaryType,
        upliftRate: 0,
        boundaryStrength: 0,
        compression: 0,
        distanceToBoundary: 1,
        isBoundary: false,
      };
    }
  }

  // ----------------------------------------------------
  // Mark real boundary cells from unlike-plate adjacency
  // ----------------------------------------------------
  const boundaryDistanceSteps = new Int32Array(cells.length);
  boundaryDistanceSteps.fill(-1);

  const boundaryQueue: number[] = [];

  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      const idx = row * gridWidth + col;
      const myPlateId = plateMap[idx];
      const myPlate = plates[myPlateId];
      const myDir = cellDirs[idx];

      const neighborIndices = getNeighborIndices(row, col, gridWidth, gridHeight);

      let strongestBoundaryType: BoundaryType = BoundaryTypeEnum.NONE as BoundaryType;
      let strongestBoundaryScore = 0;
      let strongestCompression = 0;
      let unlikeNeighborCount = 0;

      for (const nIdx of neighborIndices) {
        const nPlateId = plateMap[nIdx];
        if (nPlateId === myPlateId) continue;

        unlikeNeighborCount++;
        const nPlate = plates[nPlateId];
        const nDir = cellDirs[nIdx];

        const normal = normalize2(projectNeighborDirectionToLocalTangent(myDir, nDir));

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
      }

      if (unlikeNeighborCount > 0) {
        const field = fields[idx];
        field.isBoundary = true;
        field.boundaryType = strongestBoundaryType;
        field.compression = strongestCompression;
        field.boundaryStrength = clamp01(
          unlikeNeighborCount / Math.max(1, neighborIndices.length) * 0.55 +
          strongestBoundaryScore * 0.45
        );
        field.distanceToBoundary = 0;
        field.upliftRate = computeUpliftRate(
          strongestBoundaryType,
          strongestCompression,
          field.boundaryStrength,
          myPlate.type
        );

        boundaryDistanceSteps[idx] = 0;
        boundaryQueue.push(idx);
      }
    }
  }

  // ----------------------------------------------------
  // Multi-source BFS distance from actual boundaries
  // ----------------------------------------------------
  let queueHead = 0;
  while (queueHead < boundaryQueue.length) {
    const idx = boundaryQueue[queueHead++];
    const step = boundaryDistanceSteps[idx];

    const row = Math.floor(idx / gridWidth);
    const col = idx % gridWidth;
    const myPlateId = plateMap[idx];

    const neighborIndices = getNeighborIndices(row, col, gridWidth, gridHeight);

    for (const nIdx of neighborIndices) {
      if (plateMap[nIdx] !== myPlateId) continue;
      if (boundaryDistanceSteps[nIdx] !== -1) continue;

      boundaryDistanceSteps[nIdx] = step + 1;
      boundaryQueue.push(nIdx);
    }
  }

  const maxBoundarySteps = Math.max(6, Math.floor(Math.min(gridWidth, gridHeight) * 0.14));

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const steps = boundaryDistanceSteps[i];

    if (steps < 0) {
      field.distanceToBoundary = 1;
      field.boundaryStrength = Math.max(field.boundaryStrength, 0);
    } else {
      field.distanceToBoundary = clamp01(steps / maxBoundarySteps);
      if (!field.isBoundary) {
        field.boundaryStrength = Math.max(field.boundaryStrength, clamp01(1 - field.distanceToBoundary));
      }
    }
  }

  // ----------------------------------------------------
  // Interior continental support / oceanic basin tendency
  // ----------------------------------------------------
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
 * Build deterministic, better-spaced seeds on the sphere.
 */
function createPlateSeeds(
  gridWidth: number,
  gridHeight: number,
  plates: Plate[],
  rng: () => number
): PlateSeed[] {
  const seeds: PlateSeed[] = [];
  const minAngularDistance = 0.42; // radians; moderate separation

  for (const plate of plates) {
    let bestRow = Math.floor(rng() * gridHeight);
    let bestCol = Math.floor(rng() * gridWidth);
    let bestLat = rowToLat(bestRow, gridHeight);
    let bestLon = colToLon(bestCol, gridWidth);
    let bestDir = latLonToUnitVector(bestLat, bestLon);
    let bestScore = -Infinity;

    // Poisson-ish candidate search on sphere
    for (let attempt = 0; attempt < 48; attempt++) {
      const row = Math.floor(rng() * gridHeight);
      const col = Math.floor(rng() * gridWidth);
      const lat = rowToLat(row, gridHeight);
      const lon = colToLon(col, gridWidth);
      const dir = latLonToUnitVector(lat, lon);

      let nearest = Infinity;
      for (const seed of seeds) {
        const d = angularDistance(dir, seed.dir);
        nearest = Math.min(nearest, d);
      }

      const equatorBias =
        plate.type === PlateTypeEnum.CONTINENTAL
          ? 1 - Math.abs(row / Math.max(1, gridHeight - 1) - 0.5) * 2 * 0.18
          : 1;

      const score = (seeds.length === 0 ? minAngularDistance : nearest) * equatorBias;

      if (score > bestScore) {
        bestScore = score;
        bestRow = row;
        bestCol = col;
        bestLat = lat;
        bestLon = lon;
        bestDir = dir;
      }
    }

    const angle = rng() * Math.PI * 2;
    const driftAxis: Vec2 = [Math.cos(angle), Math.sin(angle)];

    seeds.push({
      plateId: plate.id,
      row: bestRow,
      col: bestCol,
      lat: bestLat,
      lon: bestLon,
      dir: bestDir,
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
  const neighbors: number[] = [];

  for (let dr = -1; dr <= 1; dr++) {
    const rr = row + dr;
    if (rr < 0 || rr >= gridHeight) continue;

    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const cc = (col + dc + gridWidth) % gridWidth;
      neighbors.push(rr * gridWidth + cc);
    }
  }

  return neighbors;
}

function rowToLat(row: number, gridHeight: number): number {
  return 90 - ((row + 0.5) / gridHeight) * 180;
}

function colToLon(col: number, gridWidth: number): number {
  return ((col + 0.5) / gridWidth) * 360 - 180;
}

function latLonToUnitVector(latDeg: number, lonDeg: number): Vec3 {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  const cosLat = Math.cos(lat);
  return [cosLat * Math.cos(lon), Math.sin(lat), cosLat * Math.sin(lon)];
}

function dot2(a: Vec2, b: Vec2): number {
  return a[0] * b[0] + a[1] * b[1];
}

function dot3(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function angularDistance(a: Vec3, b: Vec3): number {
  return Math.acos(clamp(dot3(a, b), -1, 1));
}

/**
 * Build a simple local 2D tangent-ish direction from one spherical cell to a neighboring one.
 * This is a lightweight geometric improvement over row/col wrapped direction.
 */
function projectNeighborDirectionToLocalTangent(fromDir: Vec3, toDir: Vec3): Vec2 {
  const east = normalize3([-fromDir[2], 0, fromDir[0]]);
  const north = normalize3(cross3(fromDir, east));
  const delta: Vec3 = [
    toDir[0] - fromDir[0],
    toDir[1] - fromDir[1],
    toDir[2] - fromDir[2],
  ];

  const eastComp = dot3(delta, east);
  const northComp = dot3(delta, north);

  return [eastComp, northComp];
}

function cross3(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function normalize2(v: Vec2): Vec2 {
  const len = Math.hypot(v[0], v[1]) || 1;
  return [v[0] / len, v[1] / len];
}

function normalize3(v: Vec3): Vec3 {
  const len = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
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