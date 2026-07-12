import { describe, expect, it } from 'vitest';
import { createEmptyLegacyCausalScaffold } from '../src/core/causalWorld/schema';
import { generateSimEvents } from '../src/core/simEvents';
import { cloneWorldDocument } from '../src/core/worldCloning';
import { createSimRandomContext, createSimRandomOracle } from '../src/core/worldSim/randomContext';
import { simulateTick } from '../src/core/worldSim';
import { createEmptyCell, type WorldBrain } from '../src/core/worldSchema';

function worldFixture(): WorldBrain {
  const width = 8;
  const height = 4;
  const cells = Array.from({ length: width * height }, (_, index) => {
    const cell = createEmptyCell(index);
    cell.isWater = index % 7 === 0;
    if (index < 4) cell.countryId = 'country-a';
    if (index >= 4 && index < 8) cell.countryId = 'country-b';
    return cell;
  });
  return {
    gridWidth: width,
    gridHeight: height,
    seaLevel: 0,
    cells,
    plates: [],
    rivers: [],
    countries: [
      { id: 'country-b', name: 'B', polygons: [] },
      { id: 'country-a', name: 'A', polygons: [] },
    ],
    cultures: [
      { id: 'culture-b', name: 'B' },
      { id: 'culture-a', name: 'A' },
    ],
    cultureRegions: [],
    cities: [
      { id: 'city-b', name: 'B', cellIndex: 5, population: 200 },
      { id: 'city-a', name: 'A', cellIndex: 2, population: 100 },
    ],
    metadata: {
      id: 'world-test',
      name: 'Test',
      seed: '1040037',
      schemaVersion: 4,
      version: 'test',
      styleMode: 'EARTHLIKE',
      gridWidth: width,
      gridHeight: height,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
    causal: createEmptyLegacyCausalScaffold(),
  };
}

function eventProjection(events: ReturnType<typeof generateSimEvents>) {
  return events.map((event) => ({
    id: event.id,
    type: event.type,
    year: event.year,
    affectedCityIds: event.affectedCityIds,
    affectedCountryIds: event.affectedCountryIds,
    affectedCultureIds: event.affectedCultureIds,
    optionLabels: event.options.map((option) => option.label),
  }));
}

describe('C02 deterministic simulation', () => {
  it('replays identical branch state, events, and next random context', () => {
    const context = createSimRandomContext('1040037', 'branch-salt-a', 12);
    const first = worldFixture();
    const second = cloneWorldDocument(first);
    const firstResult = simulateTick(first, { branchId: 'branch-a', year: 300, randomContext: context });
    const secondResult = simulateTick(second, { branchId: 'branch-a', year: 300, randomContext: context });
    expect(second).toEqual(first);
    expect(eventProjection(secondResult.events as ReturnType<typeof generateSimEvents>)).toEqual(
      eventProjection(firstResult.events as ReturnType<typeof generateSimEvents>),
    );
    expect(secondResult.nextRandomContext).toEqual(firstResult.nextRandomContext);
    expect(context.tickIndex).toBe(12);
  });

  it('does not mutate country ordering during event candidate selection', () => {
    const world = worldFixture();
    const before = world.countries.map((country) => country.id);
    const context = createSimRandomContext(world.metadata.seed, 'branch-salt-a', 3);
    generateSimEvents(world, 10, { branchId: 'branch-a', tickIndex: 3, random: createSimRandomOracle(context) });
    expect(world.countries.map((country) => country.id)).toEqual(before);
  });

  it('does not advance a supplied context when a tick fails', () => {
    const world = worldFixture();
    const context = createSimRandomContext(world.metadata.seed, 'branch-salt-a', 5);
    expect(() => simulateTick(world, { branchId: 'branch-a', year: 10, randomContext: context, dt: 0 })).toThrow();
    expect(context.tickIndex).toBe(5);
  });

  it('keeps canonical Create state unchanged when ticking a cloned branch', () => {
    const canonical = worldFixture();
    const before = cloneWorldDocument(canonical);
    const branch = cloneWorldDocument(canonical);
    simulateTick(branch, {
      branchId: 'branch-a',
      year: 10,
      randomContext: createSimRandomContext(canonical.metadata.seed, 'branch-salt-a'),
    });
    expect(canonical).toEqual(before);
  });
});
