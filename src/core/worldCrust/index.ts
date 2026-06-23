import {
  BoundaryType,
  ContinentMarginType,
  CrustProvince,
  IslandCause,
  OceanDepthClass,
  PlateType,
  type Cell,
  type WorldBrain,
} from '../worldSchema';
import { assertNoAuthoredTerrainDeltas } from '../worldLayerAuthority';

type CrustTopologyStage = 'province-delta' | 'skeleton-obedience';

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

    const oldContinentalInterior = cell.plateType === PlateType.CONTINENTAL && cell.boundaryType === BoundaryType.NONE ? 0.24 : 0;
    const youngOceanicPenalty = cell.plateType === PlateType.OCEANIC ? 0.10 : 0;
    const volcanicPenalty = cell.volcanicActivity * 0.14;
    const heightAgeSignal = terrainBuoyancy * 0.08;
    const ageNoise = centeredJitter(seed, i, 3001) * 0.07 + centeredJitter(seed, cell.plateId, 4001) * 0.05;

    cell.crustAge = clamp01(
      0.22 + planetAge01 * 0.34 + cell.surfaceAge * 0.20 + oldContinentalInterior + heightAgeSignal - boundaryAgePenalty - youngOceanicPenalty - volcanicPenalty + ageNoise,
    );
    cell.crustProvince = classifyCrustProvince(cell, height, seaLevel);
  }
}

export function applyCrustTerrainInfluence(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyCrustTerrainInfluence');
  ensureCrustFields(world);

  applyCrustProvinceTerrainDelta(world);
  applyProvinceCoastBreakup(world);
  applyProvinceCoherence(world);
  applyContinentSkeletonTerrainObedience(world);
  cleanupAccidentalTinyIslands(world);
}

export function applyCrustProvinceTerrainDelta(world: WorldBrain): void {
  if (!world?.cells?.length) return;
  assertNoAuthoredTerrainDeltas(world, 'applyCrustProvinceTerrainDelta');
  ensureCrustFields(world);

  const seed = seedToUint32(world.metadata.seed);
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const copy = world.cells.map((cell) => totalHeight(cell));

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = copy[i];
    const aboveSea = h - seaLevel;
    const landGate = smoothstep(-0.02, 0.20, aboveSea);
    const oceanGate = 1 - smoothstep(-0.18, 0.04, aboveSea);
    const coastGate = smoothstep(-0.16, 0.08, -Math.abs(aboveSea));
    const oldStableCrust = Math.max(0, cell.crustThickness - 0.58) * Math.max(0, cell.crustAge - 0.48);
    const thinYoungCrust = Math.max(0, 0.54 - cell.crustThickness) * Math.max(0, 0.62 - cell.crustAge);
    const rough = centeredJitter(seed, i, 7019);
    const broad = centeredJitter(seed, cell.plateId * 7919 + i, 9109);
    const seamDamp = plateSeamDamp(world, i);

    let delta = 0;

    switch (cell.crustProvince) {
      case CrustProvince.OLD_SHIELD:
        delta += oldStableCrust * 0.18 * landGate;
        delta += rough * oldStableCrust * 0.055 * landGate;
        delta += broad * 0.014 * landGate;
        break;
      case CrustProvince.MOBILE_BELT:
        delta += Math.max(0.018, Math.max(0, cell.upliftRate) * 0.085) * landGate;
        delta += rough * 0.038 * landGate;
        delta += broad * 0.018 * landGate;
        break;
      case CrustProvince.SEDIMENT_BASIN:
        delta -= 0.026 * smoothstep(-0.05, 0.20, aboveSea);
        delta += rough * 0.012 * landGate;
        break;
      case CrustProvince.RIFT_MARGIN:
        delta += rough * 0.038 * coastGate;
        delta -= 0.022 * coastGate;
        break;
      case CrustProvince.COASTAL_PLAIN:
        delta -= 0.028 * smoothstep(-0.06, 0.18, aboveSea);
        delta += broad * 0.010 * coastGate;
        break;
      case CrustProvince.VOLCANIC_PROVINCE:
        delta += 0.048 * Math.max(0.35, cell.volcanicActivity) * smoothstep(-0.06, 0.14, aboveSea);
        delta += rough * 0.032;
        break;
      case CrustProvince.ISLAND_ARC:
        delta += 0.042 * Math.max(0.35, cell.volcanicActivity) * smoothstep(-0.15, 0.12, aboveSea);
        delta += rough * 0.036 * smoothstep(-0.12, 0.16, aboveSea);
        break;
      case CrustProvince.OCEANIC_BASIN:
      default:
        delta -= thinYoungCrust * 0.11 * oceanGate;
        break;
    }

    const shelfSoftening = cell.oceanDepthClass === OceanDepthClass.SHELF || cell.oceanDepthClass === OceanDepthClass.SLOPE
      ? (cell.crustThickness - 0.50) * 0.014
      : 0;

    const rawDelta = (delta + shelfSoftening) * seamDamp;
    const topologySafeDelta = constrainCrustTopologyDelta(world, i, h, seaLevel, rawDelta, copy, 'province-delta');
    cell.baseHeight = clamp(cell.baseHeight + topologySafeDelta, -1.4, 1.5);
  }
}

export function ensureCrustFields(world: WorldBrain): void {
  if (!world?.cells?.length) return;

  let shouldSeed = false;
  for (const cell of world.cells as Array<Cell & { crustThickness?: unknown; crustAge?: unknown; crustProvince?: unknown }>) {
    if (typeof cell.crustThickness !== 'number' || typeof cell.crustAge !== 'number') {
      shouldSeed = true;
      break;
    }
  }

  if (shouldSeed) {
    seedCrustFields(world);
    return;
  }

  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  for (const cell of world.cells as Array<Cell & { crustProvince?: unknown }>) {
    cell.crustThickness = clamp01(cell.crustThickness);
    cell.crustAge = clamp01(cell.crustAge);
    if (!isCrustProvince(cell.crustProvince)) {
      cell.crustProvince = classifyCrustProvince(cell, totalHeight(cell), seaLevel);
    }
  }
}

export function classifyCrustProvince(cell: Cell, height: number, seaLevel: number): CrustProvince {
  const aboveSea = height - seaLevel;

  if (cell.volcanicActivity > 0.58 && (cell.boundaryType !== BoundaryType.NONE || aboveSea > -0.12)) {
    return cell.plateType === PlateType.OCEANIC ? CrustProvince.ISLAND_ARC : CrustProvince.VOLCANIC_PROVINCE;
  }

  if (cell.plateType === PlateType.OCEANIC) {
    if (cell.boundaryType === BoundaryType.CONVERGENT && cell.volcanicActivity > 0.28) return CrustProvince.ISLAND_ARC;
    return CrustProvince.OCEANIC_BASIN;
  }

  if (cell.boundaryType === BoundaryType.CONVERGENT || cell.boundaryType === BoundaryType.TRANSFORM || cell.upliftRate > 0.22) {
    return CrustProvince.MOBILE_BELT;
  }

  if (cell.boundaryType === BoundaryType.DIVERGENT || cell.upliftRate < -0.12 || (cell.crustAge < 0.45 && cell.crustThickness < 0.62)) {
    return CrustProvince.RIFT_MARGIN;
  }

  if (aboveSea >= -0.04 && aboveSea < 0.12 && cell.crustThickness > 0.50) {
    return CrustProvince.COASTAL_PLAIN;
  }

  if (cell.crustAge > 0.66 && cell.crustThickness > 0.62) {
    return CrustProvince.OLD_SHIELD;
  }

  return CrustProvince.SEDIMENT_BASIN;
}

export function applyProvinceCoastBreakup(world: WorldBrain): void {
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const seed = seedToUint32(world.metadata.seed);
  const before = world.cells.map((cell) => totalHeight(cell));

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const aboveSea = h - seaLevel;
    const nearShore = smoothstep(-0.10, 0.18, aboveSea) * (1 - smoothstep(0.18, 0.34, aboveSea));
    if (nearShore <= 0) continue;

    const waterNeighbors = waterNeighborFractionByHeight(world, i, seaLevel, before);
    const edgeGate = smoothstep(0.28, 0.82, waterNeighbors);
    const notch = centeredJitter(seed, i, 11213);
    const channel = centeredJitter(seed, i + cell.plateId * 431, 14143);
    const seamDamp = plateSeamDamp(world, i);

    let delta = 0;
    if (cell.crustProvince === CrustProvince.RIFT_MARGIN) {
      delta -= Math.max(0, -notch) * 0.032 * nearShore * edgeGate;
      delta += Math.max(0, channel) * 0.014 * nearShore;
    } else if (cell.crustProvince === CrustProvince.SEDIMENT_BASIN) {
      delta -= Math.max(0.12, -notch) * 0.024 * nearShore * edgeGate;
    } else if (cell.crustProvince === CrustProvince.COASTAL_PLAIN) {
      delta -= Math.max(0.10, -notch) * 0.020 * nearShore * edgeGate;
    } else if (cell.crustProvince === CrustProvince.MOBILE_BELT) {
      delta += Math.max(0, notch) * 0.020 * nearShore;
    } else if (cell.crustProvince === CrustProvince.ISLAND_ARC) {
      delta += Math.max(0, notch) * 0.020 * nearShore;
    }

    if (delta !== 0) {
      cell.baseHeight = clamp(cell.baseHeight + delta * seamDamp, -1.4, 1.5);
    }
  }
}

export function applyProvinceCoherence(world: WorldBrain): void {
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const seed = seedToUint32(world.metadata.seed);
  const before = world.cells.map((cell) => totalHeight(cell));

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const aboveSea = h - seaLevel;
    const landNeighbors = landNeighborFractionByHeight(world, i, seaLevel, before);
    const waterNeighbors = 1 - landNeighbors;
    const local = centeredJitter(seed, i, 19001);
    const seamDamp = plateSeamDamp(world, i);

    let delta = 0;

    if (h < seaLevel && landNeighbors >= 0.5) {
      if (cell.crustProvince === CrustProvince.OLD_SHIELD || cell.crustProvince === CrustProvince.MOBILE_BELT) {
        delta += 0.026 * smoothstep(0.45, 1.0, landNeighbors) * Math.max(0.45, cell.crustThickness);
      } else if (cell.crustProvince === CrustProvince.VOLCANIC_PROVINCE) {
        delta += 0.020 * smoothstep(0.45, 1.0, landNeighbors);
      } else if (cell.crustProvince === CrustProvince.COASTAL_PLAIN && landNeighbors >= 0.78) {
        delta += 0.010;
      }
    }

    if (h >= seaLevel && aboveSea < 0.16 && waterNeighbors >= 0.5) {
      if (cell.crustProvince === CrustProvince.SEDIMENT_BASIN || cell.crustProvince === CrustProvince.COASTAL_PLAIN) {
        delta -= 0.014 * smoothstep(0.45, 1.0, waterNeighbors);
      } else if (cell.crustProvince === CrustProvince.RIFT_MARGIN) {
        delta -= Math.max(0, -local) * 0.012 * smoothstep(0.45, 1.0, waterNeighbors);
      }
    }

    if (delta !== 0) {
      cell.baseHeight = clamp(cell.baseHeight + delta * seamDamp, -1.4, 1.5);
    }
  }
}

export function applyContinentSkeletonTerrainObedience(world: WorldBrain): void {
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const seed = seedToUint32(world.metadata.seed);
  const before = world.cells.map((cell) => totalHeight(cell));

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const aboveSea = h - seaLevel;
    const continentality = clamp01(cell.continentality);
    const core = clamp01(cell.continentCoreStrength);
    const shelf = clamp01(cell.shelfStrength);
    const landNeighbors = landNeighborFractionByHeight(world, i, seaLevel, before);
    const waterNeighbors = 1 - landNeighbors;
    const nearSurface = 1 - smoothstep(0.12, 0.48, Math.abs(aboveSea));
    const broadNoise = centeredJitter(seed, cell.continentId ?? cell.oceanBasinId ?? i, 26003);
    const seamDamp = plateSeamDamp(world, i);

    let delta = 0;

    if (continentality > 0.58) {
      delta += (0.028 * smoothstep(0.58, 0.90, continentality) + 0.052 * core) * (0.35 + nearSurface * 0.65);
      delta += broadNoise * 0.010 * smoothstep(0.55, 1.0, continentality);
    }

    if (shelf > 0.28 && core < 0.60) {
      const shelfTarget = seaLevel - 0.024 + shelf * 0.018;
      delta += (shelfTarget - h) * 0.11 * shelf * (0.35 + nearSurface * 0.65);
    }

    if (cell.marginType === ContinentMarginType.COLLISION || cell.marginType === ContinentMarginType.ACTIVE) {
      delta += 0.032 * smoothstep(0.35, 0.85, continentality) * (0.40 + nearSurface * 0.60);
    } else if (cell.marginType === ContinentMarginType.RIFT) {
      delta -= 0.022 * nearSurface * (0.40 + smoothstep(0.20, 0.70, shelf));
    } else if (cell.marginType === ContinentMarginType.PASSIVE && shelf > 0.35) {
      delta -= 0.010 * nearSurface;
    }

    if (aboveSea > -0.02 && continentality < 0.24 && !isCausedIslandCell(cell)) {
      const invalidPenalty = cell.islandCause === IslandCause.INVALID_FRAGMENT ? 0.045 : 0.024;
      delta -= invalidPenalty * (0.55 + smoothstep(-0.02, 0.16, aboveSea) * 0.25);
    }

    if (cell.islandCause === IslandCause.ISLAND_ARC || cell.islandCause === IslandCause.VOLCANIC_HOTSPOT) {
      delta += 0.024 * (0.50 + nearSurface * 0.50);
    } else if (cell.islandCause === IslandCause.SHELF_ISLAND || cell.islandCause === IslandCause.CONTINENTAL_FRAGMENT) {
      delta += 0.014 * nearSurface;
    }

    if (delta !== 0) {
      const rawDelta = delta * seamDamp;
      const topologySafeDelta = constrainCrustTopologyDelta(world, i, h, seaLevel, rawDelta, before, 'skeleton-obedience', landNeighbors, waterNeighbors);
      cell.baseHeight = clamp(cell.baseHeight + topologySafeDelta, -1.4, 1.5);
    }
  }
}

export function cleanupAccidentalTinyIslands(world: WorldBrain): void {
  const seaLevel = numeric(world.seaLevel, world.metadata?.seaLevel ?? 0);
  const components = landComponentsByHeight(world, seaLevel);
  for (const component of components) {
    if (component.length > 10) continue;
    if (component.some((idx) => isCausedIslandCell(world.cells[idx]))) continue;

    const sinkStrength = component.length <= 4 ? 0.060 : 0.030;
    for (const idx of component) {
      const cell = world.cells[idx];
      cell.baseHeight = clamp(cell.baseHeight - sinkStrength, -1.4, 1.5);
    }
  }
}

function constrainCrustTopologyDelta(
  world: WorldBrain,
  index: number,
  heightBefore: number,
  seaLevel: number,
  delta: number,
  heights: number[],
  stage: CrustTopologyStage,
  precomputedLandNeighbors?: number,
  precomputedWaterNeighbors?: number,
): number {
  if (delta === 0) return 0;

  const next = heightBefore + delta;
  const wasLand = heightBefore >= seaLevel;
  const willBeLand = next >= seaLevel;
  if (wasLand === willBeLand) return delta;

  const cell = world.cells[index];
  const landNeighbors = precomputedLandNeighbors ?? landNeighborFractionByHeight(world, index, seaLevel, heights);
  const waterNeighbors = precomputedWaterNeighbors ?? (1 - landNeighbors);
  const continentality = clamp01(cell.continentality);
  const core = clamp01(cell.continentCoreStrength);
  const caused = isCausedIslandCell(cell);
  const volcanicArc = cell.volcanicActivity > 0.55 && cell.boundaryType === BoundaryType.CONVERGENT;
  const strongCore = continentality > 0.72 && core > 0.68;
  const attachedLand = landNeighbors >= (stage === 'skeleton-obedience' ? 0.72 : 0.62) && continentality > 0.36;
  const invalidFragment = cell.islandCause === IslandCause.INVALID_FRAGMENT || (continentality < 0.18 && cell.crustProvince === CrustProvince.OCEANIC_BASIN);

  if (!wasLand && willBeLand) {
    const allowNewLand = caused || volcanicArc || strongCore || attachedLand;
    if (!allowNewLand) {
      return Math.max(0, seaLevel - 0.006 - heightBefore);
    }
  }

  if (wasLand && !willBeLand) {
    const protectedLand = caused || strongCore || continentality > 0.36 || core > 0.24 || landNeighbors >= 0.50;
    const allowSinkLand = invalidFragment || (!protectedLand && waterNeighbors >= 0.72);
    if (!allowSinkLand) {
      return Math.min(0, seaLevel + 0.006 - heightBefore);
    }
  }

  return delta;
}

function plateSeamDamp(world: WorldBrain, index: number): number {
  const cell = world.cells[index];
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 1;

  let differentPlate = 0;
  let differentProvince = 0;
  for (const neighborIndex of neighbors) {
    const neighbor = world.cells[neighborIndex];
    if (neighbor.plateId !== cell.plateId) differentPlate++;
    if (neighbor.crustProvince !== cell.crustProvince) differentProvince++;
  }

  const plateEdge = differentPlate / neighbors.length;
  const provinceEdge = differentProvince / neighbors.length;
  return lerp(1, 0.45, clamp01(plateEdge * 0.75 + provinceEdge * 0.35));
}

function landNeighborFractionByHeight(world: WorldBrain, index: number, seaLevel: number, heights: number[]): number {
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 0;
  let land = 0;
  for (const neighbor of neighbors) {
    if (heights[neighbor] >= seaLevel) land++;
  }
  return land / neighbors.length;
}

function waterNeighborFractionByHeight(world: WorldBrain, index: number, seaLevel: number, heights: number[]): number {
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 0;
  let water = 0;
  for (const neighbor of neighbors) {
    if (heights[neighbor] < seaLevel) water++;
  }
  return water / neighbors.length;
}

function isCausedIslandCell(cell: Cell): boolean {
  return (
    cell.islandCause === IslandCause.ISLAND_ARC ||
    cell.islandCause === IslandCause.VOLCANIC_HOTSPOT ||
    cell.islandCause === IslandCause.RIFT_FRAGMENT ||
    cell.islandCause === IslandCause.SHELF_ISLAND ||
    cell.islandCause === IslandCause.CONTINENTAL_FRAGMENT ||
    cell.crustProvince === CrustProvince.ISLAND_ARC ||
    cell.crustProvince === CrustProvince.VOLCANIC_PROVINCE ||
    cell.crustProvince === CrustProvince.RIFT_MARGIN ||
    cell.volcanicActivity > 0.42 ||
    cell.boundaryType === BoundaryType.CONVERGENT ||
    (cell.crustThickness > 0.68 && cell.crustAge > 0.58)
  );
}

function landComponentsByHeight(world: WorldBrain, seaLevel: number): number[][] {
  const visited = new Uint8Array(world.cells.length);
  const out: number[][] = [];

  for (let i = 0; i < world.cells.length; i++) {
    if (visited[i] || totalHeight(world.cells[i]) < seaLevel) continue;
    const component: number[] = [];
    const queue = [i];
    visited[i] = 1;

    for (let head = 0; head < queue.length; head++) {
      const current = queue[head];
      component.push(current);
      for (const neighbor of neighborIndices4(world, current)) {
        if (!visited[neighbor] && totalHeight(world.cells[neighbor]) >= seaLevel) {
          visited[neighbor] = 1;
          queue.push(neighbor);
        }
      }
    }

    out.push(component);
  }

  return out;
}

function neighborIndices4(world: WorldBrain, index: number): number[] {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  const neighbors = [
    row * world.gridWidth + ((col - 1 + world.gridWidth) % world.gridWidth),
    row * world.gridWidth + ((col + 1) % world.gridWidth),
  ];
  if (row > 0) neighbors.push((row - 1) * world.gridWidth + col);
  if (row < world.gridHeight - 1) neighbors.push((row + 1) * world.gridWidth + col);
  return neighbors;
}

function isCrustProvince(value: unknown): value is CrustProvince {
  return typeof value === 'string' && Object.values(CrustProvince).includes(value as CrustProvince);
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

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp(value: number, lo: number, hi: number): number {
  return value < lo ? lo : value > hi ? hi : value;
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
