// ========================================================
// WORLDWRIGHT -- TECTONICS SYSTEM (V1.4 HARD OWNERSHIP)
// File: src/core/tectonicsSystem/index.ts
//
// Purpose:
// - provide the planet's tectonic skeleton as a source of truth
// - keep plate IDs stable and lookup-safe
// - separate hard plate ownership from soft influence values
// - derive boundaries from neighboring plate ownership, not fuzzy ambiguity
// - compute true distance-to-boundary by propagation from real boundary cells
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

type MacroCenter = {
  dir: Vec3;
  weight: number;
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
};

type RankedInfluence = {
  plateId: number;
  weight: number;
};

type ResolvedTectonicsOptions = {
  plateActivity01: number;
  continentalTarget: number;
  influenceSigma: number;
  activityStrength: number;
  continentalBiasStrength: number;
  macroCenterCount: number;
  boundaryInfluenceCells: number;
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

  const continentalSlots = new Set<number>();
  for (let i = 0; i < continentalTarget; i++) {
    continentalSlots.add(Math.round((i * (count - 1)) / Math.max(1, continentalTarget - 1)));
  }

  const plates: Plate[] = [];
  for (let i = 0; i < count; i++) {
    const isContinental = continentalSlots.has(i);
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

  // Important: do not shuffle. Several downstream structures intentionally use
  // plate.id as a stable identifier. Lookup is now ID-safe, but keeping array
  // order aligned with IDs prevents future accidental index bugs.
  return plates;
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
  const plateById = new Map<number, Plate>(plates.map((plate) => [plate.id, plate]));

  const localSeeds =
    seeds && seeds.length === plates.length
      ? seeds
      : createPlateSeeds(gridWidth, gridHeight, plates, mulberry32(123456789), options);
  const seedByPlateId = new Map<number, PlateSeed>(localSeeds.map((seed) => [seed.plateId, seed]));

  const total = gridWidth * gridHeight;
  const fields: TectonicsField[] = new Array(total);
  const cellDirs: Vec3[] = new Array(total);
  const plateWeightsPerCell: RankedInfluence[][] = new Array(total);

  // ----------------------------------------------------
  // Pass 1: hard plate ownership from soft influence ranking
  // ----------------------------------------------------
  for (let row = 0; row < gridHeight; row++) {
    const lat = rowToLat(row, gridHeight);

    for (let col = 0; col < gridWidth; col++) {
      const idx = row * gridWidth + col;
      const lon = colToLon(col, gridWidth);
      const dir = latLonToUnitVector(lat, lon);
      cellDirs[idx] = dir;

      const ranked = computeRankedPlateInfluencesWeighted(
        dir,
        localSeeds,
        resolved.influenceSigma,
        resolved
      );
      plateWeightsPerCell[idx] = ranked;

      const top = ranked[0];
      const dominantPlate = plateById.get(top.plateId) ?? plates[0];

      fields[idx] = {
        plateId: dominantPlate.id,
        plateType: dominantPlate.type,
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
  // Pass 2: real boundaries from neighboring plate ownership
  // ----------------------------------------------------
  const boundarySeeds: number[] = [];

  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      const idx = row * gridWidth + col;
      const field = fields[idx];
      const rivalId = findStrongestNeighborPlateId(fields, gridWidth, gridHeight, row, col);

      if (rivalId == null || rivalId === field.plateId) continue;

      const dominantPlate = plateById.get(field.plateId) ?? plates[0];
      const rivalPlate = plateById.get(rivalId) ?? dominantPlate;
      const topSeed = seedByPlateId.get(dominantPlate.id);
      const rivalSeed = seedByPlateId.get(rivalPlate.id);
      const ranked = plateWeightsPerCell[idx];
      const secondWeight = ranked.find((entry) => entry.plateId === rivalId)?.weight ?? ranked[1]?.weight ?? 0;
      const topWeight = ranked.find((entry) => entry.plateId === field.plateId)?.weight ?? ranked[0]?.weight ?? 1;

      const myDir = cellDirs[idx];
      const boundaryNormal = rivalSeed
        ? normalize2(projectNeighborDirectionToLocalTangent(myDir, rivalSeed.dir))
        : ([1, 0] as Vec2);

      const relativeVelocity: Vec2 = [
        dominantPlate.velocity[0] - rivalPlate.velocity[0],
        dominantPlate.velocity[1] - rivalPlate.velocity[1],
      ];

      const convergence = -dot2(relativeVelocity, boundaryNormal);
      const boundaryType = classifyBoundary(
        dominantPlate.type,
        rivalPlate.type,
        convergence,
        resolved.activityStrength
      );

      const ambiguity = clamp01(1 - Math.abs(topWeight - secondWeight) * 1.8);
      const localBoundaryStrength = clamp01(
        lerp(0.55, 0.92, resolved.activityStrength) * (0.68 + ambiguity * 0.32)
      );

      field.boundaryType = boundaryType;
      field.compression = clamp(convergence, -1, 1);
      field.boundaryStrength = localBoundaryStrength;
      field.distanceToBoundary = 0;
      field.isBoundary = true;
      field.upliftRate = computeUpliftRate(
        boundaryType,
        field.compression,
        localBoundaryStrength,
        dominantPlate.type,
        resolved.activityStrength
      );

      if (topSeed && rivalSeed) {
        // Keep the source-of-truth seed references live for future debugging.
        void topSeed;
      }

      boundarySeeds.push(idx);
    }
  }

  // ----------------------------------------------------
  // Pass 3: true normalized distance from actual boundary cells
  // ----------------------------------------------------
  const distanceSteps = computeBoundaryDistanceSteps(
    fields,
    gridWidth,
    gridHeight,
    boundarySeeds,
    resolved.boundaryInfluenceCells
  );

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const steps = distanceSteps[i];
    const distanceToBoundary = clamp01(steps / Math.max(1, resolved.boundaryInfluenceCells));
    field.distanceToBoundary = distanceToBoundary;

    if (field.isBoundary) continue;

    const interiorness = distanceToBoundary;
    const boundaryProximity = 1 - distanceToBoundary;

    field.boundaryStrength = boundaryProximity * lerp(0.10, 0.22, resolved.activityStrength);
    field.boundaryType = BoundaryTypeEnum.NONE as BoundaryType;
    field.compression = 0;

    if (field.plateType === PlateTypeEnum.CONTINENTAL) {
      field.upliftRate = lerp(
        lerp(0.018, 0.040, resolved.continentalBiasStrength),
        lerp(0.080, 0.155, resolved.continentalBiasStrength),
        interiorness
      );
    } else {
      field.upliftRate = lerp(
        lerp(-0.055, -0.025, resolved.activityStrength),
        lerp(-0.22, -0.12, resolved.activityStrength),
        interiorness
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
  const minAngularDistance = lerp(0.36, 0.54, resolved.activityStrength);
  const macroCenters = createMacroContinentalCenters(gridWidth, gridHeight, rng, resolved.macroCenterCount);

  for (const plate of plates) {
    let bestRow = Math.floor(rng() * gridHeight);
    let bestCol = Math.floor(rng() * gridWidth);
    let bestLat = rowToLat(bestRow, gridHeight);
    let bestLon = colToLon(bestCol, gridWidth);
    let bestDir = latLonToUnitVector(bestLat, bestLon);
    let bestScore = -Infinity;

    for (let attempt = 0; attempt < 96; attempt++) {
      const row = Math.floor(rng() * gridHeight);
      const col = Math.floor(rng() * gridWidth);
      const lat = rowToLat(row, gridHeight);
      const lon = colToLon(col, gridWidth);
      const dir = latLonToUnitVector(lat, lon);

      let nearest = Infinity;
      for (const seed of seeds) {
        nearest = Math.min(nearest, angularDistance(dir, seed.dir));
      }

      const normalizedRow = row / Math.max(1, gridHeight - 1);
      const equatorDistance = Math.abs(normalizedRow - 0.5) * 2;
      const equatorBias =
        plate.type === PlateTypeEnum.CONTINENTAL
          ? 1 - equatorDistance * lerp(0.06, 0.18, resolved.continentalBiasStrength)
          : 1 - (1 - equatorDistance) * lerp(0.02, 0.07, resolved.activityStrength);

      const macroAffinity = macroCenterAffinity(dir, macroCenters);
      const macroBias =
        plate.type === PlateTypeEnum.CONTINENTAL
          ? lerp(0.72, 1.16, macroAffinity)
          : lerp(1.08, 0.82, macroAffinity);

      const spacingScore = seeds.length === 0 ? minAngularDistance : nearest;
      const score = spacingScore * 1.45 + equatorBias * 0.34 + macroBias * 0.42;

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
          ? lerp(0.06, 0.14, resolved.continentalBiasStrength) + rng() * 0.035
          : lerp(-0.15, -0.07, resolved.activityStrength) + rng() * 0.030,
    });
  }

  return seeds;
}

function createMacroContinentalCenters(
  gridWidth: number,
  gridHeight: number,
  rng: () => number,
  centerCount: number
): MacroCenter[] {
  const centers: MacroCenter[] = [];
  const minAngular = lerp(0.92, 0.58, clamp01((centerCount - 2) / 3));

  for (let i = 0; i < centerCount; i++) {
    let bestDir: Vec3 = [1, 0, 0];
    let bestScore = -Infinity;

    for (let attempt = 0; attempt < 80; attempt++) {
      const row = Math.floor(rng() * gridHeight);
      const col = Math.floor(rng() * gridWidth);
      const lat = rowToLat(row, gridHeight);
      const lon = colToLon(col, gridWidth);
      const dir = latLonToUnitVector(lat, lon);

      let nearest = Infinity;
      for (const c of centers) nearest = Math.min(nearest, angularDistance(dir, c.dir));

      const normalizedRow = row / Math.max(1, gridHeight - 1);
      const equatorDistance = Math.abs(normalizedRow - 0.5) * 2;
      const equatorBias = 1 - equatorDistance * 0.20;
      const spacing = centers.length === 0 ? minAngular : nearest;
      const score = spacing * 1.55 + equatorBias * 0.42;

      if (score > bestScore) {
        bestScore = score;
        bestDir = dir;
      }
    }

    centers.push({ dir: bestDir, weight: lerp(0.86, 1.14, rng()) });
  }

  return centers;
}

function macroCenterAffinity(dir: Vec3, centers: MacroCenter[]): number {
  if (centers.length === 0) return 0.5;

  let best = 0;
  for (const center of centers) {
    const d = angularDistance(dir, center.dir);
    const affinity = Math.exp(-0.5 * Math.pow(d / 0.78, 2)) * center.weight;
    if (affinity > best) best = affinity;
  }

  return clamp01(best);
}

function computeRankedPlateInfluencesWeighted(
  dir: Vec3,
  seeds: PlateSeed[],
  sigma: number,
  resolved: ResolvedTectonicsOptions
): RankedInfluence[] {
  const weights: RankedInfluence[] = [];
  let total = 0;

  for (const seed of seeds) {
    const d = angularDistance(dir, seed.dir);
    const typeSigma =
      seed.type === PlateTypeEnum.CONTINENTAL
        ? sigma * lerp(1.04, 1.14, resolved.continentalBiasStrength)
        : sigma * lerp(0.96, 1.06, resolved.activityStrength);

    const base = gaussianFalloff(d, typeSigma);
    const bias = 1 + seed.elevationBias * 0.22;
    const w = Math.max(1e-9, base * bias);

    weights.push({ plateId: seed.plateId, weight: w });
    total += w;
  }

  const norm = Math.max(1e-9, total);
  for (const item of weights) item.weight /= norm;

  weights.sort((a, b) => b.weight - a.weight);
  return weights;
}

function findStrongestNeighborPlateId(
  fields: TectonicsField[],
  width: number,
  height: number,
  row: number,
  col: number
): number | null {
  const idx = row * width + col;
  const ownPlateId = fields[idx].plateId;
  const counts = new Map<number, number>();

  for (const nIdx of neighborIndices4(width, height, row, col)) {
    const plateId = fields[nIdx]?.plateId;
    if (typeof plateId !== 'number' || plateId === ownPlateId) continue;
    counts.set(plateId, (counts.get(plateId) ?? 0) + 1);
  }

  let best: number | null = null;
  let bestCount = 0;
  for (const [plateId, count] of counts) {
    if (count > bestCount) {
      best = plateId;
      bestCount = count;
    }
  }

  return best;
}

function computeBoundaryDistanceSteps(
  fields: TectonicsField[],
  width: number,
  height: number,
  boundarySeeds: number[],
  maxSteps: number
): Int32Array {
  const far = maxSteps + 1;
  const dist = new Int32Array(fields.length);
  dist.fill(far);

  const queue: number[] = [];
  let head = 0;

  for (const idx of boundarySeeds) {
    if (idx < 0 || idx >= fields.length) continue;
    if (dist[idx] === 0) continue;
    dist[idx] = 0;
    queue.push(idx);
  }

  while (head < queue.length) {
    const idx = queue[head++];
    const cur = dist[idx];
    if (cur >= maxSteps) continue;

    const row = Math.floor(idx / width);
    const col = idx % width;
    for (const nIdx of neighborIndices4(width, height, row, col)) {
      if (dist[nIdx] <= cur + 1) continue;
      dist[nIdx] = cur + 1;
      queue.push(nIdx);
    }
  }

  return dist;
}

function neighborIndices4(width: number, height: number, row: number, col: number): number[] {
  const out = [
    row * width + ((col - 1 + width) % width),
    row * width + ((col + 1) % width),
  ];

  if (row > 0) out.push((row - 1) * width + col);
  if (row < height - 1) out.push((row + 1) * width + col);

  return out;
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

  const convergentThreshold = lerp(0.060, 0.025, activityStrength);
  const divergentThreshold = lerp(-0.055, -0.022, activityStrength);

  if (convergence > convergentThreshold) {
    return BoundaryTypeEnum.CONVERGENT as BoundaryType;
  }

  if (convergence < divergentThreshold) {
    return mixed
      ? (BoundaryTypeEnum.TRANSFORM as BoundaryType)
      : (BoundaryTypeEnum.DIVERGENT as BoundaryType);
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
      lerp(0.18, 0.32, activityStrength) +
      strength * lerp(0.28, 0.52, activityStrength) +
      Math.max(0, compression) * lerp(0.08, 0.22, activityStrength);

    return plateType === PlateTypeEnum.CONTINENTAL
      ? clamp(base, -1, 1)
      : clamp(base * lerp(0.58, 0.78, activityStrength), -1, 1);
  }

  if (boundaryType === BoundaryTypeEnum.DIVERGENT) {
    const ridgeLift =
      plateType === PlateTypeEnum.OCEANIC
        ? lerp(0.055, 0.14, activityStrength)
        : lerp(0.018, 0.060, activityStrength);

    return clamp(
      lerp(-0.13, -0.055, activityStrength) +
        ridgeLift +
        compression * lerp(0.035, 0.095, activityStrength) +
        strength * lerp(0.07, 0.16, activityStrength),
      -1,
      1
    );
  }

  if (boundaryType === BoundaryTypeEnum.TRANSFORM) {
    return clamp(
      lerp(0.004, 0.018, activityStrength) +
        strength * lerp(0.010, 0.050, activityStrength),
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
  const continentalTarget = clampInt(
    Math.round(lerp(plateCount * 0.30, plateCount * 0.44, 0.5)),
    1,
    Math.max(1, plateCount - 1)
  );

  return {
    plateActivity01,
    continentalTarget,
    influenceSigma: lerp(0.50, 0.34, plateActivity01),
    activityStrength: plateActivity01,
    continentalBiasStrength: lerp(0.40, 0.68, plateActivity01),
    macroCenterCount: clampInt(Math.round(lerp(3, 5, plateActivity01)), 2, 5),
    boundaryInfluenceCells: Math.max(5, Math.round(lerp(9, 5, plateActivity01))),
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

function cross3(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function angularDistance(a: Vec3, b: Vec3): number {
  return Math.acos(clamp(dot3(a, b), -1, 1));
}

function projectNeighborDirectionToLocalTangent(fromDir: Vec3, toDir: Vec3): Vec2 {
  const [east, north] = tangentBasis(fromDir);
  const delta: Vec3 = [
    toDir[0] - fromDir[0],
    toDir[1] - fromDir[1],
    toDir[2] - fromDir[2],
  ];

  return [dot3(delta, east), dot3(delta, north)];
}

function tangentBasis(dir: Vec3): [Vec3, Vec3] {
  let east: Vec3;
  if (Math.hypot(dir[0], dir[2]) < 1e-6) {
    east = [1, 0, 0];
  } else {
    east = normalize3([-dir[2], 0, dir[0]]);
  }

  const north = normalize3(cross3(dir, east));
  return [east, north];
}

function normalize2(v: Vec2): Vec2 {
  const len = Math.hypot(v[0], v[1]);
  if (len < 1e-9) return [1, 0];
  return [v[0] / len, v[1] / len];
}

function normalize3(v: Vec3): Vec3 {
  const len = Math.hypot(v[0], v[1], v[2]);
  if (len < 1e-9) return [1, 0, 0];
  return [v[0] / len, v[1] / len, v[2] / len];
}

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

function clamp(x: number, lo: number, hi: number): number {
  return x < lo ? lo : x > hi ? hi : x;
}

function clampInt(x: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, Math.floor(x)));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function mulberry32(a: number): () => number {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
