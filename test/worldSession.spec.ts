import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { createSimBranch, resolveEvent, type SimEvent } from '../src/core/simEvents';
import { worldSession } from '../src/core/worldSession';
import { validateWorld } from '../src/core/worldValidation';
import type { TerrainStrokeAction } from '../src/core/worldActions';
import type { City, WorldBrain } from '../src/core/worldSchema';

function makeTestWorld(seed: number | string = 'world-session-spine-test'): WorldBrain {
  const params = createDefaultGeneratorParams();
  params.seed = seed;
  params.width = 32;
  params.height = 16;
  return generateWorldFromParams(params);
}

function cloneWorld(world: WorldBrain): WorldBrain {
  return JSON.parse(JSON.stringify(world)) as WorldBrain;
}

function editHeightSnapshot(world: WorldBrain): number[] {
  return world.cells.map((cell) => cell.editHeightDelta);
}

function baseHeightSnapshot(world: WorldBrain): number[] {
  return world.cells.map((cell) => cell.baseHeight);
}

function makeTestCity(world: WorldBrain, id = 'city-action-test'): City {
  const cell = world.cells.find((candidate) => !candidate.isWater) ?? world.cells[0];
  return {
    id,
    name: 'Action Test City',
    cellIndex: cell.index,
    population: 1000,
    type: 'TOWN',
    populationTier: 2,
    isCapital: false,
    economicRoles: ['TRADE'],
    tags: [],
    description: '',
  };
}

function countChangedCells(before: number[], after: number[]): number {
  let changed = 0;
  for (let i = 0; i < before.length; i++) {
    if (before[i] !== after[i]) changed++;
  }
  return changed;
}

function centerRaiseAction(world: WorldBrain): TerrainStrokeAction {
  return {
    type: 'TERRAIN_STROKE',
    tool: 'RAISE',
    center: {
      row: Math.floor(world.gridHeight / 2),
      col: Math.floor(world.gridWidth / 2),
    },
    radius: 2,
    strength: 0.25,
  };
}

describe('World Spine characterization', () => {
  it('generates a world with valid schema basics and required height layers on every cell', () => {
    const world = makeTestWorld();

    expect(world.gridWidth).toBe(32);
    expect(world.gridHeight).toBe(16);
    expect(world.cells).toHaveLength(world.gridWidth * world.gridHeight);
    expect(typeof world.seaLevel).toBe('number');
    expect(world.metadata.schemaVersion).toBeTruthy();
    expect(validateWorld(world)).toEqual([]);

    for (const [index, cell] of world.cells.entries()) {
      expect(cell.index).toBe(index);
      expect(typeof cell.baseHeight).toBe('number');
      expect(typeof cell.editHeightDelta).toBe('number');
      expect(typeof cell.simHeightDelta).toBe('number');
    }
  });

  it('applies a terrain action through worldSession.apply without changing baseHeight', async () => {
    await worldSession.loadWorld(makeTestWorld('session-apply-terrain'));
    const loaded = worldSession.getWorld();
    expect(loaded).not.toBeNull();

    const beforeEditHeights = editHeightSnapshot(loaded!);
    const beforeBaseHeights = baseHeightSnapshot(loaded!);

    worldSession.apply(centerRaiseAction(loaded!));
    const after = worldSession.getWorld();
    expect(after).not.toBeNull();

    const afterEditHeights = editHeightSnapshot(after!);
    const afterBaseHeights = baseHeightSnapshot(after!);

    expect(countChangedCells(beforeEditHeights, afterEditHeights)).toBeGreaterThan(0);
    expect(afterBaseHeights).toEqual(beforeBaseHeights);
    expect(validateWorld(after!)).toEqual([]);
  });

  it('makes worldSession.apply one undoable history step and supports undo/redo of editHeightDelta', async () => {
    await worldSession.loadWorld(makeTestWorld('session-undo-redo'));
    const loaded = worldSession.getWorld();
    expect(loaded).not.toBeNull();

    const initialEditHeights = editHeightSnapshot(loaded!);
    const initialBaseHeights = baseHeightSnapshot(loaded!);

    worldSession.apply(centerRaiseAction(loaded!));
    const edited = worldSession.getWorld();
    expect(edited).not.toBeNull();

    const editedEditHeights = editHeightSnapshot(edited!);
    expect(countChangedCells(initialEditHeights, editedEditHeights)).toBeGreaterThan(0);
    expect(baseHeightSnapshot(edited!)).toEqual(initialBaseHeights);

    worldSession.undo();
    const undone = worldSession.getWorld();
    expect(undone).not.toBeNull();
    expect(editHeightSnapshot(undone!)).toEqual(initialEditHeights);
    expect(baseHeightSnapshot(undone!)).toEqual(initialBaseHeights);

    worldSession.redo();
    const redone = worldSession.getWorld();
    expect(redone).not.toBeNull();
    expect(editHeightSnapshot(redone!)).toEqual(editedEditHeights);
    expect(baseHeightSnapshot(redone!)).toEqual(initialBaseHeights);

    worldSession.undo();
    const afterSingleUndo = worldSession.getWorld();
    expect(afterSingleUndo).not.toBeNull();
    expect(editHeightSnapshot(afterSingleUndo!)).toEqual(initialEditHeights);
  });

  it('applies ADD_CITY through worldSession.apply with undo/redo without changing baseHeight', async () => {
    await worldSession.loadWorld(makeTestWorld('session-add-city'));
    const loaded = worldSession.getWorld();
    expect(loaded).not.toBeNull();

    const beforeCityCount = loaded!.cities.length;
    const beforeBaseHeights = baseHeightSnapshot(loaded!);
    const city = makeTestCity(loaded!);

    worldSession.apply({ type: 'ADD_CITY', city });
    const after = worldSession.getWorld();
    expect(after).not.toBeNull();

    expect(after!.cities).toHaveLength(beforeCityCount + 1);
    expect(after!.cities[beforeCityCount]).toMatchObject({
      id: city.id,
      name: city.name,
      cellIndex: city.cellIndex,
      type: city.type,
    });
    expect(baseHeightSnapshot(after!)).toEqual(beforeBaseHeights);
    expect(validateWorld(after!)).toEqual([]);

    worldSession.undo();
    const undone = worldSession.getWorld();
    expect(undone).not.toBeNull();
    expect(undone!.cities).toHaveLength(beforeCityCount);
    expect(baseHeightSnapshot(undone!)).toEqual(beforeBaseHeights);

    worldSession.redo();
    const redone = worldSession.getWorld();
    expect(redone).not.toBeNull();
    expect(redone!.cities).toHaveLength(beforeCityCount + 1);
    expect(redone!.cities[beforeCityCount]).toMatchObject({
      id: city.id,
      name: city.name,
      cellIndex: city.cellIndex,
      type: city.type,
    });
    expect(baseHeightSnapshot(redone!)).toEqual(beforeBaseHeights);
  });

  it('characterizes applyCommittedLocalEdit as a legacy whole-world bypass path', async () => {
    await worldSession.loadWorld(makeTestWorld('committed-local-bypass'));
    const loaded = worldSession.getWorld();
    expect(loaded).not.toBeNull();

    const beforeEditHeights = editHeightSnapshot(loaded!);
    const bypassWorld = cloneWorld(loaded!);
    bypassWorld.cells[0].editHeightDelta += 0.5;

    worldSession.applyCommittedLocalEdit(bypassWorld);
    const after = worldSession.getWorld();
    expect(after).not.toBeNull();

    expect(after!.cells[0].editHeightDelta).toBe(beforeEditHeights[0] + 0.5);

    worldSession.undo();
    const undone = worldSession.getWorld();
    expect(undone).not.toBeNull();
    expect(editHeightSnapshot(undone!)).toEqual(beforeEditHeights);
  });

  it('characterizes applyLocalEdit as a legacy wrapper around the whole-world bypass path', async () => {
    await worldSession.loadWorld(makeTestWorld('local-edit-bypass'));
    const loaded = worldSession.getWorld();
    expect(loaded).not.toBeNull();

    const beforeEditHeights = editHeightSnapshot(loaded!);
    const bypassWorld = cloneWorld(loaded!);
    bypassWorld.cells[1].editHeightDelta -= 0.25;

    worldSession.applyLocalEdit(bypassWorld);
    const after = worldSession.getWorld();
    expect(after).not.toBeNull();

    expect(after!.cells[1].editHeightDelta).toBe(beforeEditHeights[1] - 0.25);

    worldSession.undo();
    const undone = worldSession.getWorld();
    expect(undone).not.toBeNull();
    expect(editHeightSnapshot(undone!)).toEqual(beforeEditHeights);
  });

  it('runs worldSession.simulateTick on a branch snapshot without mutating canonical Create state', async () => {
    await worldSession.loadWorld(makeTestWorld('sim-branch-contract'));
    const canonicalBefore = cloneWorld(worldSession.getWorld()!);

    worldSession.simulateTick(1);

    expect(worldSession.getWorld()).toEqual(canonicalBefore);
    expect(worldSession.getSimBranchWorld()).not.toBeNull();
  });

  it('resolves Sim events against a branch snapshot without mutating the base world', () => {
    const baseWorld = makeTestWorld('sim-event-branch-snapshot');
    const city = makeTestCity(baseWorld, 'sim-event-city');
    baseWorld.cities.push(city);
    const canonicalBefore = cloneWorld(baseWorld);

    const branch = createSimBranch(baseWorld, 0, 'Test Branch');
    const event: SimEvent = {
      id: 'branch_city_growth',
      type: 'CITY_GROWTH',
      year: 1,
      title: 'Branch city growth',
      description: 'A test event that grows branch-local population only.',
      affectedCityIds: [city.id],
      options: [
        {
          label: 'Accept branch growth',
          description: 'Population increases by 20% in the branch snapshot.',
          effect: (world) => {
            const target = world.cities.find((candidate) => candidate.id === city.id);
            if (target) target.population *= 1.2;
          },
        },
      ],
      severity: 'MINOR',
    };

    expect(resolveEvent(event, 0, branch.worldSnapshot)).toBe(true);

    expect(baseWorld).toEqual(canonicalBefore);
    expect(branch.worldSnapshot.cities.find((candidate) => candidate.id === city.id)?.population).toBe(1200);
  });
});