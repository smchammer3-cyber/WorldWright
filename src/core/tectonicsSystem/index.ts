// ========================================================
// WORLDWRIGHT -- TECTONICS SYSTEM (V1.3 SLIDER-AWARE FIELD)
// File: src/core/tectonicsSystem/index.ts
//
// Purpose:
// - provide a tectonic field source of truth
// - keep spherical seed placement
// - keep continuous overlapping influence instead of hard Voronoi ownership
// - make tectonic-driving sliders matter at the source
// - expose smoother uplift / boundary / distance fields to worldGenerator
//
// Notes:
// - We still emit a dominant plateId/plateType for compatibility.
// - Broad terrain ownership is still in worldGenerator.
// - This pass makes the tectonic field itself slider-aware so the next
//   generator pass can consume more meaningful upstream structure.
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
  upliftRate: number;
  boundaryStrength: number;
  compression: number;
  distanceToBoundary: number;
  isBoundary: boolean;
}

export interface TectonicsResult {
  plates: Plate[];
  fields: TectonicsField[];
  seeds: PlateSeed[];
}

export type TectonicsBuildOptions = {
  plateActivity: number; // 0-100
  continentCount: number; // 1-12
};

type RankedInfluence = {
  plateId: number;
  weight: number;
};

type ResolvedTectonicsOptions = {
  plateActivity01: number;
  continentCount: number;
  continentalTarget: number;
  influenceSigma: number;
  boundaryThreshold: number;
  activityStrength: number;
  continentalBiasStrength: number;
};

export function generatePlates(
  gridWidth: number,
  gridHeight: number,
  plateCount: number,
  rng: () => number,
  options: TectonicsBuildOptions
): Plate[] {
  void gridWidth;
  void gridHeight;

  const resolved = resolveTectonicsOptions(plateCount, options);
  const count = Math.max(2, Math.floor(plateCount));
  const continentalTarget = clampInt(resolved.continentalTarget, 1, Math.max(1, count - 1));

  const activity01 = resolved.plateActivity01;
  const continentalSpeedMin = lerp(0.025, 0.070, activity01);
  const continentalSpeedMax = lerp(0.070, 0.150, activity01);
  const oceanicSpeedMin = lerp(0.040, 0.095, activity01);
  const oceanicSpeedMax = lerp(0.095, 0.185, activity01);

  const plates: Plate[] = [];

  for (let i = 0; i < count; i++) {
    const isContinental = i < continentalTarget;

    const angle = rng() * Math.PI * 2;
    const speed = isContinental
      ? lerp(continentalSpeedMin, continentalSpeedMax, rng())
      : lerp(oceanicSpeedMin, oceanicSpeedMax, rng());

    plates.push({
      id: i,
      type: isContinental ? PlateTypeEnum.CONTINENTAL : PlateTypeEnum.OCEANIC,
      velocity: [Math.cos(angle) * speed, Math.sin(angle) * speed],
    });
  }

  return shuffleInPlace(plates, rng);
}

export function buildTectonicsField(
  gridWidth: number,
  gridHeight: number,
  cells: any[],
  plateCount: number,
  rng: () => number,
  options: TectonicsBuildOptions
): TectonicsResult {
  const plates = generatePlates(gridWidth, gridHeight, plateCount, rng, options);
  const seeds = createPlateSeeds(gridWidth, gridHeight, plates, rng, options);
  const fields = assignPlatesToCells(gridWidth, gridHeight, cells, plates, options, seeds);

  return { plates, fields, seeds };
}

export function assignPlatesToCells(
  gridWidth: number,
  gridHeight: number,
  cells: any[],
  plates: Plate[],
  options: TectonicsBuildOptions,
  seeds?: PlateSeed[]
): TectonicsField[] {
  const resolved = resolveTectonicsOptions(plates.length, options);

  const localSeeds =
    seeds && seeds.length === plates.length
      ? seeds
      : createPlateSeeds(gridWidth, gridHeight, plates, mulberry32(123456789), options);

  const fields: TectonicsField[] = new Array(cells.length);
  const cellDirs: Vec3[] = new Array(cells.length);

  const influenceSigma = resolved.influenceSigma;
  const plateWeightsPerCell: RankedInfluence[][] = new Array(cells.length);

  // ----------------------------------------------------
  // Continuous plate influence solve
  // ----------------------------------------------------
  for (let row = 0; row < gridHeight; row++) {
    const lat = rowToLat(row, gridHeight);

    for (let col = 0; col < gridWidth; col++) {
      const idx = row * gridWidth + col;
      const lon = colToLon(col, gridWidth);
      const dir = latLonToUnitVector(lat, lon);
      cellDirs[idx] = dir;

      const ranked = computeRankedPlateInfluences(dir, localSeeds, influenceSigma);
      plateWeightsPerCell[idx] = ranked;

      const top = ranked[0];
      const second = ranked[1] ?? ranked[0];

      const dominantPlate = plates[top.plateId];
      const dominanceGap = clamp01(top.weight - second.weight);
      const ambiguity = clamp01(1 - dominanceGap);

      fields[idx] = {
        plateId: top.plateId,
        plateType: dominantPlate.type,
        boundaryType: BoundaryTypeEnum.NONE as BoundaryType,
        upliftRate: 0,
        boundaryStrength: ambiguity * lerp(0.48, 0.70, resolved.activityStrength),
        compression: 0,
        distanceToBoundary: 1 - ambiguity,
        isBoundary: false,
      };
    }
  }

  // ----------------------------------------------------
  // Boundary classification from competing influences
  // ----------------------------------------------------
  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      const idx = row * gridWidth + col;
      const ranked = plateWeightsPerCell[idx];
      const top = ranked[0];
      const second = ranked[1] ?? ranked[0];
      const myDir = cellDirs[idx];

      const dominantPlate = plates[top.plateId];
      const rivalPlate = plates[second.plateId];

      const dominanceGap = clamp01(top.weight - second.weight);
      const ambiguity = clamp01(1 - dominanceGap);

      const topSeed = localSeeds[top.plateId];
      const secondSeed = localSeeds[second.plateId];

      const topNormal = normalize2(projectNeighborDirectionToLocalTangent(myDir, topSeed.dir));
      const secondNormal = normalize2(projectNeighborDirectionToLocalTangent(myDir, secondSeed.dir));

      const blendedNormal = normalize2([
        topNormal[0] * top.weight - secondNormal[0] * second.weight,
        topNormal[1] * top.weight - secondNormal[1] * second.weight,
      ]);

      const relativeVelocity: Vec2 = [
        dominantPlate.velocity[0] - rivalPlate.velocity[0],
        dominantPlate.velocity[1] - rivalPlate.velocity[1],
      ];

      const convergence = -dot2(relativeVelocity, blendedNormal);
      const boundaryType = classifyBoundary(
        dominantPlate.type,
        rivalPlate.type,
        convergence,
        resolved.activityStrength
      );

      const rivalry = clamp01(
        second.weight / Math.max(1e-9, top.weight + second.weight)
      );

      const localBoundaryStrength = clamp01(
        ambiguity * lerp(0.64, 0.82, resolved.activityStrength) +
        rivalry * lerp(0.20, 0.34, resolved.activityStrength)
      );

      const isBoundary = localBoundaryStrength > resolved.boundaryThreshold;

      const field = fields[idx];
      field.boundaryType = isBoundary
        ? boundaryType
        : (BoundaryTypeEnum.NONE as BoundaryType);
      field.compression = isBoundary ? clamp(convergence, -1, 1) : 0;
      field.boundaryStrength = Math.max(field.boundaryStrength, localBoundaryStrength);
      field.distanceToBoundary = clamp01(1 - localBoundaryStrength);
      field.isBoundary = isBoundary;
      field.upliftRate = computeUpliftRate(
        field.boundaryType,
        field.compression,
        field.boundaryStrength,
        dominantPlate.type,
        resolved.activityStrength
      );
    }
  }

  // ----------------------------------------------------
  // Interior continental support / oceanic basin tendency
  // ----------------------------------------------------
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (field.isBoundary) continue;

    const interiorFactor = 1 - field.distanceToBoundary;

    if (field.plateType === PlateTypeEnum.CONTINENTAL) {
      field.upliftRate = lerp(
        lerp(0.025, 0.050, resolved.continentalBiasStrength),
        lerp(0.095, 0.155, resolved.continentalBiasStrength),
        interiorFactor
      );
    } else {
      field.upliftRate = lerp(
        lerp(-0.14, -0.09, resolved.activityStrength),
        lerp(-0.06, -0.02, resolved.activityStrength),
        interiorFactor
      );
    }
  }

  return fields;
}

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

function createPlateSeeds(
  gridWidth: number,
  gridHeight: number,
  plates: Plate[],
  rng: () => number,
  options: TectonicsBuildOptions
): PlateSeed[] {
  const resolved = resolveTectonicsOptions(plates.length, options);
  const seeds: PlateSeed[] = [];
  const minAngularDistance = lerp(0.34, 0.50, resolved.activityStrength);

  for (const plate of plates) {
    let bestRow = Math.floor(rng() * gridHeight);
    let bestCol = Math.floor(rng() * gridWidth);
    let bestLat = rowToLat(bestRow, gridHeight);
    let bestLon = colToLon(bestCol, gridWidth);
    let bestDir = latLonToUnitVector(bestLat, bestLon);
    let bestScore = -Infinity;

    for (let attempt = 0; attempt < 56; attempt++) {
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

      const normalizedRow = row / Math.max(1, gridHeight - 1);
      const equatorDistance = Math.abs(normalizedRow - 0.5) * 2;

      const equatorBias =
        plate.type === PlateTypeEnum.CONTINENTAL
          ? 1 - equatorDistance * lerp(0.12, 0.34, resolved.continentalBiasStrength)
          : 1 - (1 - equatorDistance) * lerp(0.02, 0.10, resolved.activityStrength);

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
          ? lerp(0.08, 0.18, resolved.continentalBiasStrength) + rng() * 0.05
          : lerp(-0.18, -0.08, resolved.activityStrength) + rng() * 0.04,
    });
  }

  return seeds;
}

function computeRankedPlateInfluences(
  dir: Vec3,
  seeds: PlateSeed[],
  sigma: number
): RankedInfluence[] {
  const weights: RankedInfluence[] = [];

  let total = 0;
  for (const seed of seeds) {
    const d = angularDistance(dir, seed.dir);
    const w = gaussianFalloff(d, sigma);
    weights.push({ plateId: seed.plateId, weight: w });
    total += w;
  }

  const norm = Math.max(1e-9, total);
  for (const item of weights) {
    item.weight /= norm;
  }

  weights.sort((a, b) => b.weight - a.weight);
  return weights;
}

function gaussianFalloff(distance: number, sigma: number): number {
  const x = distance / Math.max(1e-9, sigma);
  return Math.exp(-0.5 * x * x);
}

function classifyBoundary(
  a: PlateType,
  b: PlateType,
  convergence: number,
  activityStrength: number
): BoundaryType {
  const aOceanic = a === PlateTypeEnum.OCEANIC;
  const bOceanic = b === PlateTypeEnum.OCEANIC;
  const mixed = aOceanic !== bOceanic;

  const convergentThreshold = lerp(0.06, 0.025, activityStrength);
  const divergentThreshold = lerp(-0.05, -0.02, activityStrength);

  if (convergence > convergentThreshold) {
    return mixed || (!aOceanic && !bOceanic)
      ? (BoundaryTypeEnum.CONVERGENT as BoundaryType)
      : (BoundaryTypeEnum.CONVERGENT as BoundaryType);
  }

  if (convergence < divergentThreshold) {
    return BoundaryTypeEnum.DIVERGENT as BoundaryType;
  }

  return BoundaryTypeEnum.TRANSFORM as BoundaryType;
}

function computeUpliftRate(
  boundaryType: BoundaryType,
  compression: number,
  boundaryStrength: number,
  plateType: PlateType,
  activityStrength: number
): number {
  const strength = clamp01(boundaryStrength);

  if (boundaryType === BoundaryTypeEnum.CONVERGENT) {
    const base =
      lerp(0.22, 0.34, activityStrength) +
      strength * lerp(0.34, 0.58, activityStrength) +
      Math.max(0, compression) * lerp(0.10, 0.24, activityStrength);

    return plateType === PlateTypeEnum.CONTINENTAL
      ? clamp(base, -1, 1)
      : clamp(base * lerp(0.62, 0.80, activityStrength), -1, 1);
  }

  if (boundaryType === BoundaryTypeEnum.DIVERGENT) {
    const ridgeLift = plateType === PlateTypeEnum.OCEANIC
      ? lerp(0.06, 0.14, activityStrength)
      : lerp(0.02, 0.06, activityStrength);

    return clamp(
      lerp(-0.14, -0.07, activityStrength) +
      ridgeLift +
      compression * lerp(0.04, 0.10, activityStrength) +
      strength * lerp(0.08, 0.18, activityStrength),
      -1,
      1
    );
  }

  if (boundaryType === BoundaryTypeEnum.TRANSFORM) {
    return clamp(
      lerp(0.008, 0.024, activityStrength) +
      strength * lerp(0.02, 0.07, activityStrength),
      -1,
      1
    );
  }

  return 0;
}

function resolveTectonicsOptions(
  plateCount: number,
  options: TectonicsBuildOptions
): ResolvedTectonicsOptions {
  const plateActivity01 = clamp01(options.plateActivity / 100);
  const continentCount = clampInt(options.continentCount, 1, 12);

  const continentalTarget = clampInt(
    Math.round(lerp(plateCount * 0.26, plateCount * 0.58, continentCount / 12)),
    1,
    Math.max(1, plateCount - 1)
  );

  return {
    plateActivity01,
    continentCount,
    continentalTarget,
    influenceSigma: lerp(0.62, 0.36, plateActivity01),
    boundaryThreshold: lerp(0.26, 0.12, plateActivity01),
    activityStrength: plateActivity01,
    continentalBiasStrength: clamp01((continentCount - 1) / 11),
  };
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

function clampInt(x: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, Math.floor(x)));
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