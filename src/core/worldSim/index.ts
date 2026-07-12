// WorldWright – deterministic simulation foundation (C02)

import { generateSimEvents, type SimEvent } from '../simEvents';
import { cloneWorldDocument } from '../worldCloning';
import { worldFeatureFlagValue } from '../worldFeatureFlags/resolve';
import type { ResolvedWorldFeatureFlagSnapshot } from '../worldFeatureFlags/types';
import type { WorldBrain } from '../worldSchema';
import {
  advanceSimRandomContext,
  createSimRandomContext,
  createSimRandomOracle,
  type SimRandomContextV1,
} from './randomContext';

export interface SimTickRequest {
  readonly branchId: string;
  readonly year: number;
  readonly randomContext: SimRandomContextV1;
  readonly dt?: number;
  readonly flags?: ResolvedWorldFeatureFlagSnapshot;
}

export interface SimTickResult {
  readonly events: readonly SimEvent[];
  readonly nextRandomContext: SimRandomContextV1;
}

export function cloneWorld(world: WorldBrain): WorldBrain {
  return cloneWorldDocument(world);
}

/**
 * Advance a branch snapshot deterministically. The caller persists the returned
 * random context only after the entire tick and save transaction succeeds.
 */
export function simulateTick(
  world: WorldBrain,
  requestOrDt: SimTickRequest | number = 1,
): SimTickResult {
  const request = typeof requestOrDt === 'number'
    ? fallbackTickRequest(world, requestOrDt)
    : requestOrDt;
  const dt = request.dt ?? 1;
  if (!Number.isSafeInteger(dt) || dt <= 0) {
    throw new RangeError('Simulation dt must be a positive safe integer.');
  }
  if (!Number.isSafeInteger(request.year)) {
    throw new RangeError('Simulation year must be a safe integer.');
  }
  if (request.randomContext.tickIndex < 0) throw new RangeError('Simulation tick index cannot be negative.');
  if (request.flags && !worldFeatureFlagValue<boolean>(request.flags, 'simulation.deterministic-rng.enabled')) {
    throw new Error('Deterministic simulation RNG is disabled for this run.');
  }

  const random = createSimRandomOracle(request.randomContext);

  const growthRate = 0.01 * dt;
  for (const city of world.cities) city.population += city.population * growthRate;

  const landCellIndices = world.cells
    .map((cell, index) => ({ cell, index }))
    .filter(({ cell }) => !cell.isWater)
    .map(({ index }) => index);

  for (const culture of [...world.cultures].sort(byId)) {
    const scope = [request.branchId, request.year, request.randomContext.tickIndex, culture.id] as const;
    if (!random.boolean({ stream: 'sim.culture-drift', scope, draw: 'trigger' }, 0.05)) continue;
    if (landCellIndices.length === 0) continue;
    const cellIndex = random.pick({ stream: 'sim.culture-drift', scope, draw: 'target-cell' }, landCellIndices);
    world.cells[cellIndex].cultureId = culture.id;
  }

  for (const country of [...world.countries].sort(byId)) {
    const countryCellIndices = world.cells
      .map((cell, index) => ({ cell, index }))
      .filter(({ cell }) => cell.countryId === country.id)
      .map(({ index }) => index)
      .sort((a, b) => a - b);
    if (countryCellIndices.length === 0) continue;

    const scope = [request.branchId, request.year, request.randomContext.tickIndex, country.id] as const;
    if (!random.boolean({ stream: 'sim.country-expansion', scope, draw: 'trigger' }, 0.03)) continue;
    const sourceIndex = random.pick({ stream: 'sim.country-expansion', scope, draw: 'source-cell' }, countryCellIndices);
    const neighbors = neighborIndices(world, sourceIndex).sort((a, b) => a - b);
    const offset = random.integer({ stream: 'sim.country-expansion', scope, draw: 'neighbor-order' }, 0, neighbors.length);
    for (let step = 0; step < neighbors.length; step += 1) {
      const neighbor = world.cells[neighbors[(offset + step) % neighbors.length]];
      if (!neighbor.isWater && !neighbor.countryId) {
        neighbor.countryId = country.id;
        break;
      }
    }
  }

  const events = generateSimEvents(world, request.year, {
    branchId: request.branchId,
    tickIndex: request.randomContext.tickIndex,
    random,
  });

  return Object.freeze({
    events: Object.freeze(events),
    nextRandomContext: advanceSimRandomContext(request.randomContext),
  });
}

function fallbackTickRequest(world: WorldBrain, dt: number): SimTickRequest {
  const branchId = `transient-${world.metadata.id}`;
  return {
    branchId,
    year: 0,
    dt,
    randomContext: createSimRandomContext(world.metadata.seed, branchId),
  };
}

function neighborIndices(world: WorldBrain, cellIndex: number): number[] {
  const row = Math.floor(cellIndex / world.gridWidth);
  const col = cellIndex % world.gridWidth;
  return [
    ((row - 1 + world.gridHeight) % world.gridHeight) * world.gridWidth + col,
    ((row + 1) % world.gridHeight) * world.gridWidth + col,
    row * world.gridWidth + ((col - 1 + world.gridWidth) % world.gridWidth),
    row * world.gridWidth + ((col + 1) % world.gridWidth),
  ];
}

function byId<T extends { id: string }>(a: T, b: T): number {
  return a.id.localeCompare(b.id);
}
