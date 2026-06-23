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

/**
 * Seeds the first real crust cause layer.
 *
 * Crust is deliberately separate from plate ownership. It records the hidden
 * geological causes that later terrain, coast, island, and Sim Mode passes can
 * use without letting plate polygons directly paint land and water.
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
    cell.crustProvince = classifyCrustProvince(cell, height, seaLevel);
  }
}

/**
 * Province-aware visible terrain pass.
 *
 * This makes the hidden crust causes harder to ignore: rift margins and basins
 * can become flooded cuts, mobile belts can become real highland chains, and
 * island arcs/volcanic provinces can preserve caused islands without sprinkling
 * accidental island confetti everywhere.
 */
export function applyCrustTerrainInfluence(world: WorldBrain): void {
  if (!world?.cells?.length) return;
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

    let delta = 0;

    switch (cell.crustProvince) {
      case CrustProvince.OLD_SHIELD:
        delta += oldStableCrust * 0.28 * landGate;
        delta += rough * oldStableCrust * 0.11 * landGate;
        delta += broad * 0.025 * landGate;
        break;
      case CrustProvince.MOBILE_BELT:
        delta += Math.max(0.028, Math.max(0, cell.upliftRate) * 0.15) * landGate;
        delta += rough * 0.070 * landGate;
        delta += broad * 0.035 * landGate;
        break;
      case CrustProvince.SEDIMENT_BASIN:
        delta -= 0.048 * smoothstep(-0.05, 0.20, aboveSea);
        delta += rough * 0.020 * landGate;
        break;
      case CrustProvince.RIFT_MARGIN:
        delta += rough * 0.090 * coastGate;
        delta -= 0.052 * coastGate;
        break;
      case CrustProvince.COASTAL_PLAIN:
        delta -= 0.060 * smoothstep(-0.06, 0.18, aboveSea);
        delta += broad * 0.020 * coastGate;
        break;
      case CrustProvince.VOLCANIC_PROVINCE:
        delta += 0.065 * Math.max(0.35, cell.volcanicActivity) * smoothstep(-0.06, 0.14, aboveSea);
        delta += rough * 0.055;
        break;
      case CrustProvince.ISLAND_ARC:
        delta += 0.060 * Math.max(0.35, cell.volcanicActivity) * smoothstep(-0.15, 0.12, aboveSea);
        delta += rough * 0.065 * smoothstep(-0.12, 0.16, aboveSea);
        break;
      case CrustProvince.OCEANIC_BASIN:
      default:
        delta -= thinYoungCrust * 0.22 * oceanGate;
        break;
    }

    const shelfSoftening = cell.oceanDepthClass === OceanDepthClass.SHELF || cell.oceanDepthClass === OceanDepthClass.SLOPE
      ? (cell.crustThickness - 0.50) * 0.025
      : 0;

    cell.baseHeight = clamp(cell.baseHeight + delta + shelfSoftening, -1.4, 1.5);
  }

  applyProvinceCoastBreakup(world, seaLevel, seed);
  applyProvinceCoherence(world, seaLevel, seed);
  applyContinentSkeletonTerrainObedience(world, seaLevel, seed);
  cleanupAccidentalTinyIslands(world, seaLevel);
}

/**
 * Ensures old saved worlds and test fixtures have sane crust fields. If fields
 * are missing, it seeds them from current terrain/geology. If they exist but are
 * malformed, it clamps them into range and derives missing province labels.
 */
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

function applyProvinceCoastBreakup(world: WorldBrain, seaLevel: number, seed: number): void {
  const before = world.cells.map((cell) => totalHeight(cell));

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const aboveSea = h - seaLevel;
    const nearShore = smoothstep(-0.10, 0.18, aboveSea) * (1 - smoothstep(0.18, 0.34, aboveSea));
    if (nearShore <= 0) continue;

    const waterNeighbors = waterNeighborFractionByHeight(world, i, seaLevel, before);
    const edgeGate = smoothstep(0.10, 0.70, waterNeighbors);
    const notch = centeredJitter(seed, i, 11213);
    const channel = centeredJitter(seed, i + cell.plateId * 431, 14143);

    let delta = 0;
    if (cell.crustProvince === CrustProvince.RIFT_MARGIN) {
      delta -= Math.max(0, -notch) * 0.085 * nearShore;
      delta += Math.max(0, channel) * 0.028 * nearShore;
    } else if (cell.crustProvince === CrustProvince.SEDIMENT_BASIN) {
      delta -= Math.max(0.25, -notch) * 0.055 * nearShore * (0.5 + edgeGate);
    } else if (cell.crustProvince === CrustProvince.COASTAL_PLAIN) {
      delta -= Math.max(0.15, -notch) * 0.050 * nearShore * (0.55 + edgeGate);
    } else if (cell.crustProvince === CrustProvince.MOBILE_BELT) {
      delta += Math.max(0, notch) * 0.035 * nearShore;
    } else if (cell.crustProvince === CrustProvince.ISLAND_ARC) {
      delta += Math.max(0, notch) * 0.030 * nearShore;
    }

    if (delta !== 0) {
      cell.baseHeight = clamp(cell.baseHeight + delta, -1.4, 1.5);
    }
  }
}

function applyProvinceCoherence(world: WorldBrain, seaLevel: number, seed: number): void {
  const before = world.cells.map((cell) => totalHeight(cell));

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const aboveSea = h - seaLevel;
    const landNeighbors = landNeighborFractionByHeight(world, i, seaLevel, before);
    const waterNeighbors = 1 - landNeighbors;
    const local = centeredJitter(seed, i, 19001);

    let delta = 0;

    // Fill small holes and thin accidental channels inside strong continental
    // provinces, but leave rifts and basins open so breakup still has causes.
    if (h < seaLevel && landNeighbors >= 0.5) {
      if (cell.crustProvince === CrustProvince.OLD_SHIELD || cell.crustProvince === CrustProvince.MOBILE_BELT) {
        delta += 0.038 * smoothstep(0.45, 1.0, landNeighbors) * Math.max(0.45, cell.crustThickness);
      } else if (cell.crustProvince === CrustProvince.VOLCANIC_PROVINCE) {
        delta += 0.030 * smoothstep(0.45, 1.0, landNeighbors);
      } else if (cell.crustProvince === CrustProvince.COASTAL_PLAIN && landNeighbors >= 0.75) {
        delta += 0.018;
      }
    }

    // Sink extremely frayed lowland edges so coasts consolidate into fewer,
    // stronger bays and peninsulas instead of random speckles.
    if (h >= seaLevel && aboveSea < 0.16 && waterNeighbors >= 0.5) {
      if (cell.crustProvince === CrustProvince.SEDIMENT_BASIN || cell.crustProvince === CrustProvince.COASTAL_PLAIN) {
        delta -= 0.030 * smoothstep(0.45, 1.0, waterNeighbors);
      } else if (cell.crustProvince === CrustProvince.RIFT_MARGIN) {
        delta -= Math.max(0, -local) * 0.034 * smoothstep(0.45, 1.0, waterNeighbors);
      }
    }

    if (delta !== 0) {
      cell.baseHeight = clamp(cell.baseHeight + delta, -1.4, 1.5);
    }
  }
}

function applyContinentSkeletonTerrainObedience(world: WorldBrain, seaLevel: number, seed: number): void {
  const before = world.cells.map((cell) => totalHeight(cell));

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const aboveSea = h - seaLevel;
    const continentality = clamp01(cell.continentality);
    const core = clamp01(cell.continentCoreStrength);
    const shelf = clamp01(cell.shelfStrength);
    const nearSurface = 1 - smoothstep(0.12, 0.48, Math.abs(aboveSea));
    const broadNoise = centeredJitter(seed, cell.continentId ?? cell.oceanBasinId ?? i, 26003);

    let delta = 0;

    // Mainland obedience: broad continent bodies should not collapse into a
    // swarm of shallow islands. Strong cores get buoyant support near sea level.
    if (continentality > 0.58) {
      delta += (0.040 * smoothstep(0.58, 0.90, continentality) + 0.075 * core) * (0.35 + nearSurface * 0.65);
      delta += broadNoise * 0.018 * smoothstep(0.55, 1.0, continentality);
    }

    // Margin obedience: shelves should become shallow water or low coastal land,
    // not random mid-ocean land fragments.
    if (shelf > 0.28 && core < 0.60) {
      const shelfTarget = seaLevel - 0.035 + shelf * 0.025;
      delta += (shelfTarget - h) * 0.22 * shelf * (0.35 + nearSurface * 0.65);
    }

    // Margin type expression.
    if (cell.marginType === ContinentMarginType.COLLISION || cell.marginType === ContinentMarginType.ACTIVE) {
      delta += 0.050 * smoothstep(0.35, 0.85, continentality) * (0.40 + nearSurface * 0.60);
    } else if (cell.marginType === ContinentMarginType.RIFT) {
      delta -= 0.045 * nearSurface * (0.40 + smoothstep(0.20, 0.70, shelf));
    } else if (cell.marginType === ContinentMarginType.PASSIVE && shelf > 0.35) {
      delta -= 0.020 * nearSurface;
    }

    // Invalid island obedience: if a visible cell is far from continental bones
    // and has no island ancestry, sink it. This targets the "all little islands"
    // failure without deleting caused island arcs and shelf fragments.
    if (aboveSea > -0.02 && continentality < 0.24 && !isCausedIslandCell(cell)) {
      const invalidPenalty = cell.islandCause === IslandCause.INVALID_FRAGMENT ? 0.090 : 0.055;
      delta -= invalidPenalty * (0.65 + smoothstep(-0.02, 0.16, aboveSea) * 0.35);
    }

    // Caused islands get modest support so arcs/fragments survive as readable
    // systems rather than random dots.
    if (cell.islandCause === IslandCause.ISLAND_ARC || cell.islandCause === IslandCause.VOLCANIC_HOTSPOT) {
      delta += 0.032 * (0.50 + nearSurface * 0.50);
    } else if (cell.islandCause === IslandCause.SHELF_ISLAND || cell.islandCause === IslandCause.CONTINENTAL_FRAGMENT) {
      delta += 0.020 * nearSurface;
    }

    if (delta !== 0) {
      cell.baseHeight = clamp(cell.baseHeight + delta, -1.4, 1.5);
    }
  }
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

function cleanupAccidentalTinyIslands(world: WorldBrain, seaLevel: number): void {
  const components = landComponentsByHeight(world, seaLevel);
  for (const component of components) {
    if (component.length > 14) continue;
    if (component.some((idx) => isCausedIslandCell(world.cells[idx]))) continue;

    const sinkStrength = component.length <= 4 ? 0.080 : 0.045;
    for (const idx of component) {
      const cell = world.cells[idx];
      cell.baseHeight = clamp(cell.baseHeight - sinkStrength, -1.4, 1.5);
    }
  }
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

function clamp(value: number, lo: number, hi: number): number {
  return value < lo ? lo : value > hi ? hi : value;
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
