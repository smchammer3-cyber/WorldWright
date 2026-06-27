import { allowsNormalContinentalMorphology } from './generatePhysicalConsequenceResolver';
import {
  OceanDepthClass,
  SurfaceType,
  type Cell,
  type WorldBrain,
} from './worldSchema';
import {
  buildContinentIntentField,
  seedContinentSkeletonFields,
  type ContinentIntentField,
} from './worldContinents/intentField';
import {
  createDefaultGeneratorParams,
  generateWorldFromParams as generateNoiseWorldFromParams,
  type GeneratorParams,
} from './worldGenerator/index';

export { createDefaultGeneratorParams } from './worldGenerator/index';
export type { GeneratorParams } from './worldGenerator/index';

export function generateWorldFromParams(params: GeneratorParams): WorldBrain {
  const world = generateNoiseWorldFromParams(params);
  applyContinentIntentBirthTerrain(world);
  if (world.planetFoundation && allowsNormalContinentalMorphology(world.planetFoundation.geologyStack)) {
    seedContinentSkeletonFields(world);
  }
  return world;
}

/**
 * Blueprint front-door terrain birth pass.
 *
 * The legacy generator produced a complete raw noise terrain, solved sea level,
 * and only then let continent skeletons try to explain the result. This pass
 * moves broad continent intent to the front of the public Generate path without
 * making debug IDs visible authority: it uses continuous intent fields to bend
 * the newborn height distribution, then re-solves sea level from that shaped
 * terrain before derived water/depth fields are exposed.
 */
function applyContinentIntentBirthTerrain(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  const foundation = world.planetFoundation;
  if (!foundation || !allowsNormalContinentalMorphology(foundation.geologyStack)) return;

  const seed = world.metadata?.seed ?? world.parameters?.seed ?? 0;
  const field = buildContinentIntentField({
    width: world.gridWidth,
    height: world.gridHeight,
    seed,
    continentCount: typeof world.parameters?.continentCount === 'number' ? world.parameters.continentCount : 4,
  });

  const oldSeaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const targetLandFraction = currentLandFraction(world, oldSeaLevel);
  const before = world.cells.map((cell) => totalHeight(cell));
  const seedUint = seedToUint32(seed);
  const reliefScale = numeric(foundation.reliefGravityScale, 1);
  const tectonicVigor = clamp01(numeric(foundation.tectonicVigor, 0.5));
  const erosionDamp = lerp(1.0, 0.72, clamp01(numeric(world.parameters?.erosionIntensity, 70) / 100));

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const intent = field.cells[i];
    const h = before[i];
    const texture = terrainTexture(seedUint, world, i);
    const fine = centeredJitter(seedUint, i, 47021);
    const continentGate = smoothstep(0.34, 0.86, intent.continentality);
    const coreGate = smoothstep(0.36, 0.90, intent.continentCoreStrength);
    const shelfGate = smoothstep(0.24, 0.80, intent.shelfTendency);
    const basinGate = smoothstep(0.20, 0.90, intent.oceanBasinTendency);
    const marginGate = smoothstep(0.22, 0.78, intent.marginTendency);
    const featureLift = Math.max(0, cell.upliftRate) * 0.026 * tectonicVigor;
    const volcanicLift = clamp01(cell.volcanicActivity) * 0.017 * Math.max(0.35, tectonicVigor);

    const terrainTarget = oldSeaLevel
      - basinGate * 0.085 * reliefScale
      + continentGate * 0.082 * reliefScale
      + coreGate * 0.046 * reliefScale
      - shelfGate * 0.022 * reliefScale
      - marginGate * 0.010 * reliefScale
      + featureLift
      + volcanicLift
      + texture * (0.038 + coreGate * 0.030 + marginGate * 0.020 + tectonicVigor * 0.016) * reliefScale * erosionDamp
      + fine * 0.011 * reliefScale * erosionDamp;

    const continentAuthority = clamp01(0.045 + continentGate * 0.20 + coreGate * 0.085 + basinGate * 0.075 + marginGate * 0.070);
    const blended = lerp(h, terrainTarget, continentAuthority);
    cell.baseHeight = clamp(blended, -1.4, 1.5);
  }

  const nextSeaLevel = chooseSeaLevelForLandFraction(world.cells.map((cell) => totalHeight(cell)), world.gridWidth, world.gridHeight, targetLandFraction);
  world.seaLevel = nextSeaLevel;
  if (world.metadata) world.metadata.seaLevel = nextSeaLevel;
  recomputeWaterAndSurface(world, field);
}

function recomputeWaterAndSurface(world: WorldBrain, field: ContinentIntentField): void {
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const liquidSurface = world.planetFoundation?.surfaceWaterMode == null
    || world.planetFoundation.surfaceWaterMode === 'LIQUID_SURFACE_WATER'
    || world.planetFoundation.surfaceWaterMode === 'MIXED_LIQUID_ICE';

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = totalHeight(cell);
    cell.isWater = liquidSurface && h < seaLevel;
    cell.oceanDepthClass = classifyOceanDepth(h, seaLevel, cell.isWater);
    if (cell.isWater) {
      cell.surfaceType = SurfaceType.ALLUVIAL;
      cell.baseBiomeId = 0;
      cell.editBiomeId = 0;
    } else if (cell.baseBiomeId === 0) {
      const intent = field.cells[i];
      cell.surfaceType = cell.volcanicActivity > 0.55 ? SurfaceType.VOLCANIC : SurfaceType.ROCK;
      cell.baseBiomeId = intent.continentality > 0.52 ? 2 : 1;
      cell.editBiomeId = cell.baseBiomeId;
    }
  }
}

function currentLandFraction(world: WorldBrain, seaLevel: number): number {
  if (!world.cells.length) return 0.35;
  let land = 0;
  for (const cell of world.cells) if (totalHeight(cell) >= seaLevel) land++;
  return clamp(land / world.cells.length, 0.04, 0.86);
}

function chooseSeaLevelForLandFraction(heights: number[], width: number, height: number, targetLandFraction: number): number {
  const samples: number[] = [];
  for (let r = 1; r < height - 1; r++) {
    for (let c = 0; c < width; c++) samples.push(heights[r * width + c]);
  }
  samples.sort((a, b) => a - b);
  return samples[clampInt(Math.floor((1 - targetLandFraction) * (samples.length - 1)), 0, samples.length - 1)] ?? 0;
}

function terrainTexture(seed: number, world: WorldBrain, index: number): number {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  const x = col / Math.max(1, world.gridWidth);
  const y = row / Math.max(1, world.gridHeight);
  const broad = valueNoise2D(seed, x * 5.5, y * 3.5, 43003) * 2 - 1;
  const medium = valueNoise2D(seed, x * 13.0, y * 7.0, 43019) * 2 - 1;
  const fine = valueNoise2D(seed, x * 31.0, y * 17.0, 43037) * 2 - 1;
  return clamp(broad * 0.46 + medium * 0.38 + fine * 0.16, -1, 1);
}

function classifyOceanDepth(h: number, seaLevel: number, isWater: boolean): OceanDepthClass | null {
  if (!isWater) return null;
  const d = seaLevel - h;
  if (d < 0.045) return OceanDepthClass.SHELF;
  if (d < 0.100) return OceanDepthClass.SLOPE;
  if (d > 0.320) return OceanDepthClass.TRENCH;
  if (d < 0.170) return OceanDepthClass.RIDGE;
  return OceanDepthClass.ABYSSAL;
}

function totalHeight(cell: Cell): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
}

function valueNoise2D(seed: number, x: number, y: number, salt: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const tx = x - x0;
  const ty = y - y0;
  const a = hashGrid(seed, x0, y0, salt);
  const b = hashGrid(seed, x0 + 1, y0, salt);
  const c = hashGrid(seed, x0, y0 + 1, salt);
  const d = hashGrid(seed, x0 + 1, y0 + 1, salt);
  const sx = tx * tx * (3 - 2 * tx);
  const sy = ty * ty * (3 - 2 * ty);
  return lerp(lerp(a, b, sx), lerp(c, d, sx), sy);
}

function hashGrid(seed: number, x: number, y: number, salt: number): number {
  let h = seed ^ Math.imul(x + 4099, 374761393) ^ Math.imul(y + 9176, 668265263) ^ Math.imul(salt + 1, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

function centeredJitter(seed: number, index: number, salt: number): number {
  let h = seed ^ Math.imul(index + 1, 374761393) ^ Math.imul(salt + 1, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return ((h >>> 0) / 4294967295) * 2 - 1;
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

function numeric(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / Math.max(1e-9, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp(value: number, lo: number, hi: number): number {
  return value < lo ? lo : value > hi ? hi : value;
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

function clampInt(value: number, lo: number, hi: number): number {
  const n = Math.round(Number.isFinite(value) ? value : lo);
  return n < lo ? lo : n > hi ? hi : n;
}
