import {
  ContinentMarginType,
  IslandCause,
  type Cell,
  type WorldBrain,
} from '../worldSchema';
import { buildGeographyProfile, type GeographyProfile } from '../worldGeographyProfile';
import { measureGeographyMetrics } from '../worldGeographyMetrics';

type ContinentCore = {
  id: number;
  coreLat: number;
  coreLon: number;
};

type CellPosition = {
  lat: number;
  lon: number;
};

/**
 * Ocean basin authority makes negative space first-class.
 *
 * This pass is deliberately feature-level compared with the local profile
 * correction loop. It strengthens ocean basin interiors and cuts weak corridors
 * between separate continent cores, instead of letting medium-continentality
 * shelves connect the whole planet into one low-relief supercontinent.
 */
export function applyOceanBasinAuthority(
  world: WorldBrain,
  profile: GeographyProfile = buildGeographyProfile(world),
): void {
  if (!world?.cells?.length) return;

  const seaLevel = typeof world.seaLevel === 'number' ? world.seaLevel : world.metadata?.seaLevel ?? 0;
  const metrics = measureGeographyMetrics(world);
  const landExcess = Math.max(0, metrics.landCoverage - profile.landCoverageTarget[1]);
  const largestExcess = Math.max(0, metrics.largestLandmassShare - profile.largestLandmassTarget[1]);
  const deepOceanDeficit = Math.max(0, profile.deepOceanTarget[0] - metrics.deepOceanCoverage);
  const emergency = clamp01(landExcess * 2.4 + largestExcess * 1.2 + deepOceanDeficit * 1.5);

  const cores = (world.continentSkeletons ?? []) as ContinentCore[];
  const before = world.cells.map((cell) => totalHeight(cell));
  const rawDelta = new Float32Array(world.cells.length);
  const largestLand = new Set(largestLandComponent(world, seaLevel, before));

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const h = before[i];
    const aboveSea = h - seaLevel;
    const continentality = clamp01(cell.continentality);
    const core = clamp01(cell.continentCoreStrength);
    const shelf = clamp01(cell.shelfStrength);
    const position = cellLatLon(world, i);
    const corridor = continentSeparationCorridor(position, cores, cell.continentId ?? null);
    const caused = isProtectedOceanException(cell);
    const trueCore = core > 0.58 && continentality > 0.66;

    if (trueCore) continue;

    let target = h;
    let strength = 0;

    // Ocean basin interiors are negative authority, not leftover water labels.
    if (cell.oceanBasinId != null && continentality < 0.46 && !caused) {
      const basinDepth = seaLevel - 0.105 - (1 - continentality) * 0.145 - deepOceanDeficit * 0.20;
      target = Math.min(target, basinDepth);
      strength = Math.max(strength, profile.oceanBasinWeight * (0.26 + emergency * 0.38));
    }

    // Medium continentality should not default to exposed land. When it is not a
    // core, not a caused island/arc, and not a protected margin, let oceans cut.
    if (!caused && continentality >= 0.30 && continentality < 0.62 && core < 0.42) {
      const cutGate = Math.max(corridor, largestLand.has(i) ? largestExcess : 0, landExcess * 0.65);
      if (cutGate > 0.035 || aboveSea < 0.12) {
        const marginOceanTarget = seaLevel - 0.045 - cutGate * 0.115 - shelf * 0.035;
        target = Math.min(target, marginOceanTarget);
        strength = Math.max(strength, profile.oceanBasinWeight * (0.24 + cutGate * 0.48 + emergency * 0.26));
      }
    }

    // Explicit separation corridors between continent cores. This is the main
    // anti-supercontinent rule: shelves may soften coasts, but cannot connect the
    // whole world through weak core/margin cells.
    if (!caused && corridor > 0.16 && core < 0.50) {
      const corridorTarget = seaLevel - 0.070 - corridor * 0.155;
      target = Math.min(target, corridorTarget);
      strength = Math.max(strength, profile.oceanBasinWeight * (0.34 + corridor * 0.46));
    }

    // If a huge landmass already exists, cut its weakest shelf/margin cells more
    // decisively instead of nudging the whole planet down.
    if (!caused && largestLand.has(i) && largestExcess > 0.02 && core < 0.45 && shelf > 0.18 && aboveSea < 0.18) {
      const seawayTarget = seaLevel - 0.055 - Math.min(0.16, largestExcess * 0.35);
      target = Math.min(target, seawayTarget);
      strength = Math.max(strength, profile.oceanBasinWeight * (0.36 + largestExcess * 0.36));
    }

    if (target < h) {
      rawDelta[i] = (target - h) * clamp01(strength);
    }
  }

  const smoothed = smoothNegativeDeltas(world, rawDelta, 0.24);
  for (let i = 0; i < world.cells.length; i++) {
    const delta = smoothed[i];
    if (Math.abs(delta) < 1e-6) continue;
    world.cells[i].baseHeight = clamp(world.cells[i].baseHeight + delta, -1.4, 1.5);
  }
}

function continentSeparationCorridor(position: CellPosition, cores: ContinentCore[], ownContinentId: number | null): number {
  if (cores.length < 2) return 0;

  let firstDist = Infinity;
  let secondDist = Infinity;
  let firstId: number | null = null;

  for (const core of cores) {
    const d = angularDistanceDeg(position.lat, position.lon, core.coreLat, core.coreLon);
    if (d < firstDist) {
      secondDist = firstDist;
      firstDist = d;
      firstId = core.id;
    } else if (d < secondDist) {
      secondDist = d;
    }
  }

  if (!Number.isFinite(firstDist) || !Number.isFinite(secondDist)) return 0;
  const total = Math.max(1e-6, firstDist + secondDist);
  const balance = 1 - Math.abs(firstDist - secondDist) / total;
  const awayFromCore = smoothstep(24, 62, firstDist);
  const betweenCores = smoothstep(0.32, 0.82, balance);
  const ownPenalty = ownContinentId != null && firstId === ownContinentId ? 0.82 : 1.0;
  return clamp01(betweenCores * awayFromCore * ownPenalty);
}

function largestLandComponent(world: WorldBrain, seaLevel: number, heights: number[]): number[] {
  const visited = new Uint8Array(world.cells.length);
  let largest: number[] = [];

  for (let i = 0; i < world.cells.length; i++) {
    if (visited[i] || heights[i] < seaLevel) continue;
    const component: number[] = [];
    const queue = [i];
    visited[i] = 1;

    for (let head = 0; head < queue.length; head++) {
      const current = queue[head];
      component.push(current);
      for (const neighbor of neighborIndices4(world, current)) {
        if (!visited[neighbor] && heights[neighbor] >= seaLevel) {
          visited[neighbor] = 1;
          queue.push(neighbor);
        }
      }
    }

    if (component.length > largest.length) largest = component;
  }

  return largest;
}

function smoothNegativeDeltas(world: WorldBrain, deltas: Float32Array, neighborBlend: number): Float32Array {
  const out = new Float32Array(deltas.length);
  for (let i = 0; i < deltas.length; i++) {
    const neighbors = neighborIndices4(world, i);
    if (neighbors.length === 0) {
      out[i] = deltas[i];
      continue;
    }
    let sum = 0;
    let count = 0;
    for (const n of neighbors) {
      if (deltas[n] < 0) {
        sum += deltas[n];
        count++;
      }
    }
    const avg = count > 0 ? sum / count : 0;
    out[i] = deltas[i] * (1 - neighborBlend) + avg * neighborBlend;
  }
  return out;
}

function isProtectedOceanException(cell: Cell): boolean {
  return (
    cell.islandCause === IslandCause.ISLAND_ARC ||
    cell.islandCause === IslandCause.VOLCANIC_HOTSPOT ||
    cell.islandCause === IslandCause.RIFT_FRAGMENT ||
    cell.marginType === ContinentMarginType.COLLISION
  );
}

function cellLatLon(world: WorldBrain, index: number): CellPosition {
  const row = Math.floor(index / world.gridWidth);
  const col = index % world.gridWidth;
  return {
    lat: 90 - ((row + 0.5) / world.gridHeight) * 180,
    lon: ((col + 0.5) / world.gridWidth) * 360 - 180,
  };
}

function angularDistanceDeg(latA: number, lonA: number, latB: number, lonB: number): number {
  const a = latLonToUnitVector(latA, lonA);
  const b = latLonToUnitVector(latB, lonB);
  const dot = clamp(a[0] * b[0] + a[1] * b[1] + a[2] * b[2], -1, 1);
  return (Math.acos(dot) * 180) / Math.PI;
}

function latLonToUnitVector(latDeg: number, lonDeg: number): [number, number, number] {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  const cosLat = Math.cos(lat);
  return [cosLat * Math.cos(lon), Math.sin(lat), cosLat * Math.sin(lon)];
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

function totalHeight(cell: Cell): number {
  return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / Math.max(1e-9, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function clamp(value: number, lo: number, hi: number): number {
  return value < lo ? lo : value > hi ? hi : value;
}

function clamp01(value: number): number {
  return clamp(value, 0, 1);
}
