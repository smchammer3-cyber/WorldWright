import { allowsNormalContinentalMorphology } from './generatePhysicalConsequenceResolver';
import { OceanDepthClass, PlateType, SurfaceType, type Cell, type WorldBrain } from './worldSchema';
import { buildContinentIntentField, seedContinentSkeletonFields, type ContinentIntentField } from './worldContinents/intentField';
import { createDefaultGeneratorParams, generateWorldFromParams as generateNoiseWorldFromParams, type GeneratorParams } from './worldGenerator/index';

export { createDefaultGeneratorParams } from './worldGenerator/index';
export type { GeneratorParams } from './worldGenerator/index';

export function generateWorldFromParams(params: GeneratorParams): WorldBrain {
  const world = generateNoiseWorldFromParams(params);
  applyContinentIntentBirthTerrain(world);
  if (world.planetFoundation && allowsNormalContinentalMorphology(world.planetFoundation.geologyStack)) {
    seedContinentSkeletonFields(world);
    alignRawSurfaceAuthority(world);
  }
  return world;
}

function applyContinentIntentBirthTerrain(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  const foundation = world.planetFoundation;
  if (!foundation || !allowsNormalContinentalMorphology(foundation.geologyStack)) return;
  const seed = world.metadata?.seed ?? world.parameters?.seed ?? 0;
  const field = buildContinentIntentField({ width: world.gridWidth, height: world.gridHeight, seed, continentCount: typeof world.parameters?.continentCount === 'number' ? world.parameters.continentCount : 4 });
  const oldSeaLevel = num(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const targetLandFraction = applySeaLevelExposureToTarget(continentSupportedLandFraction(field, currentLandFraction(world, oldSeaLevel)), num(world.parameters?.seaLevelOffset, num(world.parameters?.seaLevel, 50)));
  const before = world.cells.map((cell) => totalHeight(cell));
  const seedUint = seedToUint32(seed);
  const reliefScale = num(foundation.reliefGravityScale, 1);
  const tectonicVigor = clamp01(num(foundation.tectonicVigor, 0.5));
  const erosionDamp = lerp(1.0, 0.72, clamp01(num(world.parameters?.erosionIntensity, 70) / 100));
  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i], intent = field.cells[i], h = before[i];
    const texture = terrainTexture(seedUint, world, i), fine = centeredJitter(seedUint, i, 47021);
    const continentGate = smoothstep(0.34, 0.86, intent.continentality), coreGate = smoothstep(0.36, 0.90, intent.continentCoreStrength), shelfGate = smoothstep(0.24, 0.80, intent.shelfTendency), basinGate = smoothstep(0.20, 0.90, intent.oceanBasinTendency), marginGate = smoothstep(0.22, 0.78, intent.marginTendency);
    const featureLift = Math.max(0, cell.upliftRate) * 0.026 * tectonicVigor, volcanicLift = clamp01(cell.volcanicActivity) * 0.017 * Math.max(0.35, tectonicVigor);
    const terrainTarget = oldSeaLevel - basinGate * 0.135 * reliefScale + continentGate * 0.122 * reliefScale + coreGate * 0.072 * reliefScale - shelfGate * 0.030 * reliefScale - marginGate * 0.012 * reliefScale + featureLift + volcanicLift + texture * (0.040 + coreGate * 0.035 + marginGate * 0.022 + tectonicVigor * 0.016) * reliefScale * erosionDamp + fine * 0.011 * reliefScale * erosionDamp;
    cell.baseHeight = clamp(lerp(h, terrainTarget, clamp01(0.055 + continentGate * 0.255 + coreGate * 0.120 + basinGate * 0.105 + marginGate * 0.080)), -1.4, 1.5);
  }
  let nextSeaLevel = chooseSeaLevelForLandFraction(world.cells.map((cell) => totalHeight(cell)), world.gridWidth, world.gridHeight, targetLandFraction);
  applyBirthCoastlineBreakup(world, field, nextSeaLevel, seedUint, reliefScale, erosionDamp);
  nextSeaLevel = chooseSeaLevelForLandFraction(world.cells.map((cell) => totalHeight(cell)), world.gridWidth, world.gridHeight, targetLandFraction);
  world.seaLevel = nextSeaLevel;
  if (world.metadata) world.metadata.seaLevel = nextSeaLevel;
  recomputeWaterAndSurface(world, field);
}

function applyBirthCoastlineBreakup(world: WorldBrain, field: ContinentIntentField, seaLevel: number, seed: number, reliefScale: number, erosionDamp: number): void {
  const before = world.cells.map((cell) => totalHeight(cell));
  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i], intent = field.cells[i], h = before[i], aboveSea = h - seaLevel;
    const nearSurface = 1 - smoothstep(0.020, 0.150, Math.abs(aboveSea));
    const coastIntent = clamp01(intent.shelfTendency * 0.62 + intent.marginTendency * 0.50 + smoothstep(0.22, 0.56, intent.continentality) * (1 - smoothstep(0.62, 0.88, intent.continentality)) * 0.34);
    const coastGate = nearSurface * smoothstep(0.16, 0.72, coastIntent), landGate = smoothstep(0.010, 0.130, aboveSea), interiorGate = smoothstep(0.42, 0.88, intent.continentality) * (1 - smoothstep(0.00, 0.18, Math.abs(aboveSea)));
    const coastTexture = edgeTexture(seed, world, i), reliefTexture = terrainTexture(seed ^ 0x5bd1e995, world, i);
    let delta = 0;
    if (coastGate > 0) delta += (Math.max(0, coastTexture) * 0.020 - Math.max(0, -coastTexture) * 0.034) * coastGate * reliefScale * erosionDamp;
    if (interiorGate > 0 && aboveSea > 0) delta += reliefTexture * (0.012 + Math.max(0, cell.upliftRate) * 0.012 + clamp01(cell.volcanicActivity) * 0.006) * interiorGate * landGate * reliefScale * erosionDamp;
    if (delta !== 0) cell.baseHeight = clamp(cell.baseHeight + clamp(delta, -0.045, 0.036), -1.4, 1.5);
  }
}

function recomputeWaterAndSurface(world: WorldBrain, field: ContinentIntentField): void {
  const seaLevel = num(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const liquid = world.planetFoundation?.surfaceWaterMode == null || world.planetFoundation.surfaceWaterMode === 'LIQUID_SURFACE_WATER' || world.planetFoundation.surfaceWaterMode === 'MIXED_LIQUID_ICE';
  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i], h = totalHeight(cell);
    cell.isWater = liquid && h < seaLevel;
    cell.oceanDepthClass = classifyOceanDepth(h, seaLevel, cell.isWater);
    if (cell.isWater) { cell.surfaceType = SurfaceType.ALLUVIAL; cell.baseBiomeId = 0; cell.editBiomeId = 0; }
    else if (cell.baseBiomeId === 0) { cell.surfaceType = cell.volcanicActivity > 0.55 ? SurfaceType.VOLCANIC : SurfaceType.ROCK; cell.baseBiomeId = field.cells[i].continentality > 0.52 ? 2 : 1; cell.editBiomeId = cell.baseBiomeId; }
  }
}

function alignRawSurfaceAuthority(world: WorldBrain): void {
  const seaLevel = num(world.seaLevel, world.metadata?.seaLevel ?? 0);
  for (const cell of world.cells) {
    const height = totalHeight(cell);
    if (height >= seaLevel) {
      const exposure = smoothstep(0.00, 0.16, height - seaLevel);
      if (cell.continentality < 0.24) { cell.continentality = clamp(Math.max(cell.continentality, 0.28 + exposure * 0.14), 0, 1); cell.continentCoreStrength = Math.max(cell.continentCoreStrength, 0.06 + exposure * 0.08); }
      cell.plateType = PlateType.CONTINENTAL;
    } else {
      cell.plateType = PlateType.OCEANIC;
      if (cell.oceanDepthClass !== OceanDepthClass.SHELF && cell.continentality > 0.54) { cell.continentality = 0.54; cell.continentCoreStrength = Math.min(cell.continentCoreStrength, 0.22); }
    }
  }
}

function currentLandFraction(world: WorldBrain, seaLevel: number): number { let land = 0; for (const cell of world.cells) if (totalHeight(cell) >= seaLevel) land++; return clamp(land / Math.max(1, world.cells.length), 0.04, 0.86); }
function continentSupportedLandFraction(field: ContinentIntentField, fallback: number): number { let strong = 0, margin = 0; for (const cell of field.cells) { if (cell.continentality >= 0.34) strong++; else if (cell.continentality >= 0.24) margin++; } const supported = (strong + margin * 0.50) / Math.max(1, field.cells.length); return clamp(Math.min(fallback, supported * 1.08) * 0.86 + fallback * 0.14, 0.205, 0.58); }
function applySeaLevelExposureToTarget(target: number, seaLevelOffset: number): number { return clamp(target + ((50 - clamp(seaLevelOffset, 0, 100)) / 100) * 0.10, 0.205, 0.58); }
function chooseSeaLevelForLandFraction(heights: number[], width: number, height: number, targetLandFraction: number): number { const samples: number[] = []; for (let r = 1; r < height - 1; r++) for (let c = 0; c < width; c++) samples.push(heights[r * width + c]); samples.sort((a, b) => a - b); return samples[clampInt(Math.floor((1 - targetLandFraction) * (samples.length - 1)), 0, samples.length - 1)] ?? 0; }
function terrainTexture(seed: number, world: WorldBrain, index: number): number { const r = Math.floor(index / world.gridWidth), c = index % world.gridWidth, x = c / Math.max(1, world.gridWidth), y = r / Math.max(1, world.gridHeight); return clamp((valueNoise2D(seed, x * 5.5, y * 3.5, 43003) * 2 - 1) * 0.46 + (valueNoise2D(seed, x * 13.0, y * 7.0, 43019) * 2 - 1) * 0.38 + (valueNoise2D(seed, x * 31.0, y * 17.0, 43037) * 2 - 1) * 0.16, -1, 1); }
function edgeTexture(seed: number, world: WorldBrain, index: number): number { const r = Math.floor(index / world.gridWidth), c = index % world.gridWidth, x = c / Math.max(1, world.gridWidth), y = r / Math.max(1, world.gridHeight); return clamp((valueNoise2D(seed, x * 8.5 + 4.7, y * 5.5 - 2.2, 51011) * 2 - 1) * 0.38 + (valueNoise2D(seed, x * 19.0 - 1.1, y * 11.0 + 5.3, 51023) * 2 - 1) * 0.44 + (valueNoise2D(seed, x * 43.0 + 8.0, y * 23.0 - 3.0, 51047) * 2 - 1) * 0.18, -1, 1); }
function classifyOceanDepth(h: number, seaLevel: number, isWater: boolean): OceanDepthClass | null { if (!isWater) return null; const d = seaLevel - h; if (d < 0.055) return OceanDepthClass.SHELF; if (d < 0.100) return OceanDepthClass.SLOPE; if (d > 0.320) return OceanDepthClass.TRENCH; if (d < 0.170) return OceanDepthClass.RIDGE; return OceanDepthClass.ABYSSAL; }
function totalHeight(cell: Cell): number { return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta; }
function valueNoise2D(seed: number, x: number, y: number, salt: number): number { const x0 = Math.floor(x), y0 = Math.floor(y), tx = x - x0, ty = y - y0, sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty); return lerp(lerp(hashGrid(seed, x0, y0, salt), hashGrid(seed, x0 + 1, y0, salt), sx), lerp(hashGrid(seed, x0, y0 + 1, salt), hashGrid(seed, x0 + 1, y0 + 1, salt), sx), sy); }
function hashGrid(seed: number, x: number, y: number, salt: number): number { let h = seed ^ Math.imul(x + 4099, 374761393) ^ Math.imul(y + 9176, 668265263) ^ Math.imul(salt + 1, 1274126177); h = Math.imul(h ^ (h >>> 13), 1274126177); h ^= h >>> 16; return (h >>> 0) / 4294967295; }
function centeredJitter(seed: number, index: number, salt: number): number { let h = seed ^ Math.imul(index + 1, 374761393) ^ Math.imul(salt + 1, 668265263); h = Math.imul(h ^ (h >>> 13), 1274126177); h ^= h >>> 16; return ((h >>> 0) / 4294967295) * 2 - 1; }
function seedToUint32(s: string | number): number { if (typeof s === 'number') return s >>> 0; let h = 2166136261 >>> 0; for (let i = 0; i < String(s).length; i++) { h ^= String(s).charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function num(value: unknown, fallback: number): number { return typeof value === 'number' && Number.isFinite(value) ? value : fallback; }
function smoothstep(edge0: number, edge1: number, x: number): number { const t = clamp01((x - edge0) / Math.max(1e-9, edge1 - edge0)); return t * t * (3 - 2 * t); }
function lerp(a: number, b: number, t: number): number { return a + (b - a) * t; }
function clamp(value: number, lo: number, hi: number): number { return value < lo ? lo : value > hi ? hi : value; }
function clamp01(value: number): number { return value < 0 ? 0 : value > 1 ? 1 : value; }
function clampInt(value: number, lo: number, hi: number): number { const n = Math.round(Number.isFinite(value) ? value : lo); return n < lo ? lo : n > hi ? hi : n; }
