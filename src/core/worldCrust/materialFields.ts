import {
  BoundaryType,
  ContinentMarginType,
  IslandCause,
  PlateType,
  type Cell,
  type WorldBrain,
} from '../worldSchema';

export type CrustMaterialFields = {
  buoyancy: number;
  strength: number;
  heat: number;
  erodibility: number;
  sedimentTendency: number;
  roughness: number;
  isostaticTargetHeight: number;
  collisionRelief: number;
  riftRelief: number;
  volcanicRelief: number;
  oceanSubsidence: number;
};

type FeatureInfluence = {
  collision: number;
  rift: number;
  transform: number;
  volcanic: number;
  arc: number;
  shelf: number;
};

export function computeCrustMaterialFields(world: WorldBrain, index: number, height: number, seaLevel: number, seed: number): CrustMaterialFields {
  const cell = world.cells[index];
  const aboveSea = height - seaLevel;
  const feature = localFeatureInfluence(world, index);
  const landGate = smoothstep(-0.04, 0.22, aboveSea);
  const oceanGate = 1 - smoothstep(-0.20, 0.04, aboveSea);
  const coastGate = smoothstep(-0.18, 0.08, -Math.abs(aboveSea));
  const continentality = clamp01(cell.continentality);
  const core = clamp01(cell.continentCoreStrength);
  const thickness = clamp01(cell.crustThickness);
  const age = clamp01(cell.crustAge);
  const youngness = 1 - age;
  const thicknessBuoyancy = smoothstep(0.48, 0.78, thickness);
  const thinYoung = smoothstep(0.58, 0.30, thickness) * smoothstep(0.70, 0.30, age);

  const buoyancy = clamp01(thicknessBuoyancy * 0.46 + continentality * 0.28 + core * 0.18 + feature.collision * 0.16 + feature.arc * 0.08 - thinYoung * 0.20);
  const strength = clamp01(age * 0.52 + thickness * 0.34 + core * 0.24 - feature.rift * 0.28 - feature.volcanic * 0.22 - feature.transform * 0.08);
  const heat = clamp01(youngness * 0.34 + feature.rift * 0.34 + feature.volcanic * 0.44 + feature.arc * 0.22 + Math.max(0, -cell.upliftRate) * 0.20);
  const sedimentTendency = clamp01(smoothstep(0.03, 0.32, 1 - Math.abs(aboveSea)) * 0.20 + coastGate * 0.30 + feature.shelf * 0.30 + (1 - strength) * 0.16 + (1 - continentality) * landGate * 0.08);
  const erodibility = clamp01((1 - strength) * 0.52 + sedimentTendency * 0.24 + heat * 0.18 + coastGate * 0.16);
  const roughness = centeredJitter(seed, index, 7019) * (0.35 + strength * 0.45 + heat * 0.36);
  const collisionRelief = clamp01(feature.collision * (0.58 + continentality * 0.34 + Math.max(0, cell.upliftRate) * 0.20));
  const riftRelief = clamp01(feature.rift * (0.62 + heat * 0.24 + coastGate * 0.18));
  const volcanicRelief = clamp01(Math.max(feature.volcanic, feature.arc) * (0.52 + heat * 0.36));
  const oceanSubsidence = clamp01((cell.plateType === PlateType.OCEANIC ? 0.34 : 0) + thinYoung * 0.42 + oceanGate * (0.22 + youngness * 0.18) - feature.rift * 0.14 - feature.arc * 0.08);

  const isostaticTargetHeight = seaLevel
    + buoyancy * (0.060 + core * 0.030)
    + collisionRelief * 0.060
    + volcanicRelief * 0.030
    - riftRelief * (0.030 + coastGate * 0.020)
    - sedimentTendency * (0.022 + coastGate * 0.012)
    - oceanSubsidence * (0.070 * oceanGate + 0.018 * (1 - landGate));

  return { buoyancy, strength, heat, erodibility, sedimentTendency, roughness, isostaticTargetHeight, collisionRelief, riftRelief, volcanicRelief, oceanSubsidence };
}

export function materialSeamDamp(world: WorldBrain, index: number): number {
  const cell = world.cells[index];
  const neighbors = neighborIndices4(world, index);
  if (neighbors.length === 0) return 1;

  let differentPlate = 0;
  let materialGradient = 0;
  for (const neighborIndex of neighbors) {
    const neighbor = world.cells[neighborIndex];
    if (neighbor.plateId !== cell.plateId) differentPlate++;
    materialGradient += Math.abs(clamp01(neighbor.crustThickness) - clamp01(cell.crustThickness));
    materialGradient += Math.abs(clamp01(neighbor.crustAge) - clamp01(cell.crustAge)) * 0.55;
    materialGradient += Math.abs(clamp01(neighbor.continentality) - clamp01(cell.continentality)) * 0.35;
  }

  return lerp(1, 0.50, clamp01((differentPlate / neighbors.length) * 0.70 + (materialGradient / neighbors.length) * 0.55));
}

export function isCausedIslandCell(cell: Cell): boolean {
  return cell.islandCause === IslandCause.ISLAND_ARC ||
    cell.islandCause === IslandCause.VOLCANIC_HOTSPOT ||
    cell.islandCause === IslandCause.RIFT_FRAGMENT ||
    cell.islandCause === IslandCause.SHELF_ISLAND ||
    cell.islandCause === IslandCause.CONTINENTAL_FRAGMENT ||
    cell.volcanicActivity > 0.42 ||
    cell.boundaryType === BoundaryType.CONVERGENT ||
    cell.boundaryType === BoundaryType.DIVERGENT ||
    (cell.crustThickness > 0.68 && cell.crustAge > 0.58);
}

function localFeatureInfluence(world: WorldBrain, index: number): FeatureInfluence {
  const out = { ...directFeatureInfluence(world.cells[index]) };
  const neighbors = neighborIndices4(world, index);
  let weight = 1;
  for (const neighborIndex of neighbors) {
    const n = directFeatureInfluence(world.cells[neighborIndex]);
    out.collision += n.collision * 0.46;
    out.rift += n.rift * 0.46;
    out.transform += n.transform * 0.36;
    out.volcanic += n.volcanic * 0.42;
    out.arc += n.arc * 0.42;
    out.shelf += n.shelf * 0.42;
    weight += 0.46;
  }
  return { collision: clamp01(out.collision / weight), rift: clamp01(out.rift / weight), transform: clamp01(out.transform / weight), volcanic: clamp01(out.volcanic / weight), arc: clamp01(out.arc / weight), shelf: clamp01(out.shelf / weight) };
}

function directFeatureInfluence(cell: Cell): FeatureInfluence {
  return {
    collision: clamp01((cell.boundaryType === BoundaryType.CONVERGENT ? 0.74 : 0) + (cell.marginType === ContinentMarginType.COLLISION ? 0.72 : 0) + (cell.marginType === ContinentMarginType.ACTIVE ? 0.34 : 0) + Math.max(0, cell.upliftRate) * 1.15),
    rift: clamp01((cell.boundaryType === BoundaryType.DIVERGENT ? 0.74 : 0) + (cell.marginType === ContinentMarginType.RIFT ? 0.72 : 0) + (cell.islandCause === IslandCause.RIFT_FRAGMENT ? 0.52 : 0) + Math.max(0, -cell.upliftRate) * 1.10),
    transform: clamp01((cell.boundaryType === BoundaryType.TRANSFORM ? 0.70 : 0) + (cell.marginType === ContinentMarginType.TRANSFORM ? 0.52 : 0)),
    arc: clamp01((cell.islandCause === IslandCause.ISLAND_ARC ? 0.80 : 0) + (cell.boundaryType === BoundaryType.CONVERGENT && cell.volcanicActivity > 0.24 ? 0.48 : 0)),
    volcanic: clamp01(cell.volcanicActivity * 0.88 + (cell.islandCause === IslandCause.VOLCANIC_HOTSPOT ? 0.70 : 0)),
    shelf: clamp01(clamp01(cell.shelfStrength) * 0.72 + (cell.marginType === ContinentMarginType.PASSIVE ? 0.22 : 0) + (cell.islandCause === IslandCause.SHELF_ISLAND ? 0.44 : 0)),
  };
}

export function totalHeight(cell: Cell): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
}

export function neighborIndices4(world: WorldBrain, index: number): number[] {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  const neighbors = [row * world.gridWidth + ((col - 1 + world.gridWidth) % world.gridWidth), row * world.gridWidth + ((col + 1) % world.gridWidth)];
  if (row > 0) neighbors.push((row - 1) * world.gridWidth + col);
  if (row < world.gridHeight - 1) neighbors.push((row + 1) * world.gridWidth + col);
  return neighbors;
}

export function centeredJitter(seed: number, index: number, salt: number): number {
  return deterministicJitter(seed, index, salt) * 2 - 1;
}

function deterministicJitter(seed: number, index: number, salt: number): number {
  let h = seed ^ Math.imul(index + 1, 374761393) ^ Math.imul(salt + 1, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

export function seedToUint32(s: string | number): number {
  if (typeof s === 'number') return s >>> 0;
  let h = 2166136261 >>> 0;
  for (let i = 0; i < String(s).length; i++) {
    h ^= String(s).charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) & 0xffffffff;
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / Math.max(1e-9, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(value: number, lo: number, hi: number): number {
  return value < lo ? lo : value > hi ? hi : value;
}

export function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
