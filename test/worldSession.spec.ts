import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { worldSession } from '../src/core/worldSession';
import { validateWorld } from '../src/core/worldValidation';
import type { TerrainStrokeAction } from '../src/core/worldActions';
import type { WorldBrain } from '../src/core/worldSchema';

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

  it.skip('documents current Sim risk: simulation should run on a branch snapshot, not mutate canon directly', async () => {
    await worldSession.loadWorld(makeTestWorld('sim-branch-contract'));
    const canonicalBefore = cloneWorld(worldSession.getWorld()!);

    worldSession.simulateTick(1);

    // Desired future contract:
    // - the canonical world remains equal to canonicalBefore
    // - a separate selected Sim branch receives population/culture/country changes
    // This is skipped because current worldSession.simulateTick mutates the live world.
    expect(worldSession.getWorld()).toEqual(canonicalBefore);
  });
});