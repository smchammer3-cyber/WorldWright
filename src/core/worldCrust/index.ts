import { BoundaryType, OceanDepthClass, PlateType, type Cell, type WorldBrain } from '../worldSchema';

/**
 * Seeds the first real crust cause layer.
 *
 * This does not reshape terrain yet. It gives the world stable, deterministic
 * crustThickness and crustAge fields that future generator/sim passes can use
 * instead of letting plate polygons directly paint land and water.
 */
export function seedCrustFields(world: WorldBrain): void {
  if (!world?.cells?.length) return;

  const seed = seedToUint32(world.metadata?.seed ?? world.parameters?.seed ?? 0);
  const planetAge01 = numeric01((world.parameters?.planetAge as number | undefined) ?? 70, 100);
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const height = totalHeight(cell);
    const aboveSea = height - seaLevel;
    const terrainBuoyancy = smoothstep(-0.20, 0.32, aboveSea);
    const shelfInfluence = cell.oceanDepthClass === OceanDepthClass.SHELF ? 0.10 : cell.oceanDepthClass === OceanDepthClass.SLOPE ? 0.04 : 0;
    const plateBias = cell.plateType === PlateType.CONTINENTAL ? 0.16 : -0.12;
    const boundaryAgePenalty = cell.boundaryType === BoundaryType.DIVERGENT
      ? 0.28
      : cell.boundaryType === BoundaryType.CONVERGENT
        ? 0.12
        : cell.boundaryType === BoundaryType.TRANSFORM
          ? 0.08
          : 0;
    const boundaryThickening = cell.boundaryType === BoundaryType.CONVERGENT
      ? clamp01(Math.max(0, cell.upliftRate) * 0.12)
      : cell.boundaryType === BoundaryType.DIVERGENT
        ? -0.10
        : 0;
    const crustNoise = centeredJitter(seed, i, 1001) * 0.09 + centeredJitter(seed, cell.plateId, 2003) * 0.06;

    cell.crustThickness = clamp01(
      0.46 + terrainBuoyancy * 0.30 + plateBias + shelfInfluence + boundaryThickening + crustNoise,
    );

    const oldContinentalInterior = cell.plateType === PlateType.CONTINENTAL && cell.boundaryType === BoundaryType.NONE
      ? 0.24
      : 0;
    const youngOceanicPenalty = cell.plateType === PlateType.OCEANIC ? 0.10 : 0;
    const volcanicPenalty = cell.volcanicActivity * 0.14;
    const heightAgeSignal = terrainBuoyancy * 0.08;
    const ageNoise = centeredJitter(seed, i, 3001) * 0.07 + centeredJitter(seed, cell.plateId, 4001) * 0.05;

    cell.crustAge = clamp01(
      0.22 + planetAge01 * 0.34 + cell.surfaceAge * 0.20 + oldContinentalInterior + heightAgeSignal - boundaryAgePenalty - youngOceanicPenalty - volcanicPenalty + ageNoise,
    );
  }
}

/**
 * Lightly lets the crust cause layer influence visible terrain.
 *
 * This is intentionally conservative: it should raise old/thick continental
 * interiors and deepen young/thin oceanic basins without turning crust into a
 * new hard land mask or reintroducing plate seams.
 */
export function applyCrustTerrainInfluence(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  ensureCrustFields(world);

  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const copy = world.cells.map((cell) => totalHeight(cell));

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = copy[i];
    const aboveSea = h - seaLevel;
    const interiorGate = cell.boundaryType === BoundaryType.NONE ? 1 : 0.35;
    const landGate = smoothstep(-0.02, 0.20, aboveSea);
    const oceanGate = 1 - smoothstep(-0.18, 0.04, aboveSea);
    const oldStableCrust = Math.max(0, cell.crustThickness - 0.58) * Math.max(0, cell.crustAge - 0.48);
    const thinYoungCrust = Math.max(0, 0.54 - cell.crustThickness) * Math.max(0, 0.62 - cell.crustAge);
    const activeBoundaryDamp = cell.boundaryType === BoundaryType.NONE ? 1 : 0.55;

    const continentalUplift = cell.plateType === PlateType.CONTINENTAL
      ? oldStableCrust * 0.28 * landGate * interiorGate
      : 0;
    const shieldBasinTexture = cell.plateType === PlateType.CONTINENTAL
      ? centeredJitter(seedToUint32(world.metadata.seed), i, 7019) * oldStableCrust * 0.11 * landGate * activeBoundaryDamp
      : 0;
    const oceanicDeepening = cell.plateType === PlateType.OCEANIC
      ? -thinYoungCrust * 0.22 * oceanGate
      : 0;
    const shelfSoftening = cell.oceanDepthClass === OceanDepthClass.SHELF || cell.oceanDepthClass === OceanDepthClass.SLOPE
      ? (cell.crustThickness - 0.50) * 0.030
      : 0;

    cell.baseHeight = clamp(
      cell.baseHeight + continentalUplift + shieldBasinTexture + oceanicDeepening + shelfSoftening,
      -1.4,
      1.5,
    );
  }
}

/**
 * Ensures old saved worlds and test fixtures have sane crust fields. If fields
 * are missing, it seeds them from current terrain/geology. If they exist but are
 * malformed, it clamps them into range.
 */
export function ensureCrustFields(world: WorldBrain): void {
  if (!world?.cells?.length) return;

  let shouldSeed = false;
  for (const cell of world.cells as Array<Cell & { crustThickness?: unknown; crustAge?: unknown }>) {
    if (typeof cell.crustThickness !== 'number' || typeof cell.crustAge !== 'number') {
      shouldSeed = true;
      break;
    }
  }

  if (shouldSeed) {
    seedCrustFields(world);
    return;
  }

  for (const cell of world.cells) {
    cell.crustThickness = clamp01(cell.crustThickness);
    cell.crustAge = clamp01(cell.crustAge);
  }
}

function totalHeight(cell: Cell): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
}

function numeric(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function numeric01(value: unknown, scale: number): number {
  return clamp01(numeric(value, 0) / scale);
}

function centeredJitter(seed: number, index: number, salt: number): number {
  return deterministicJitter(seed, index, salt) * 2 - 1;
}

function deterministicJitter(seed: number, index: number, salt: number): number {
  let h = seed ^ Math.imul(index + 1, 374761393) ^ Math.imul(salt + 1, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

function seedToUint32(s: string | number): number {
  if (typeof s === 'number') return s >>> 0;
  let h = 2166136261 >>> 0;
  for (let i = 0; i < String(s).length; i++) {
    h ^= String(s).charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) & 0xffffffff;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / Math.max(1e-9, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function clamp(value: number, lo: number, hi: number): number {
  return value < lo ? lo : value > hi ? hi : value;
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
