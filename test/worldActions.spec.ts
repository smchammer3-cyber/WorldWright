import { describe, expect, it } from 'vitest';
import { applyWorldAction, type TerrainStrokeAction } from '../src/core/worldActions';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { recomputeWorld } from '../src/core/worldRecompute';
import type { WorldBrain } from '../src/core/worldSchema';
import { validateWorld } from '../src/core/worldValidation';

function makeActionTestWorld(seed: number | string = 'world-action-terrain-test'): WorldBrain {
  const params = createDefaultGeneratorParams();
  params.seed = seed;
  params.width = 32;
  params.height = 16;
  return generateWorldFromParams(params);
}

function makeRaiseStroke(): TerrainStrokeAction {
  return {
    type: 'TERRAIN_STROKE',
    tool: 'RAISE',
    center: { row: 8, col: 16 },
    radius: 2,
    strength: 0.25,
  };
}

function baseHeightSnapshot(world: WorldBrain): number[] {
  return world.cells.map((cell) => cell.baseHeight);
}

function editHeightSnapshot(world: WorldBrain): number[] {
  return world.cells.map((cell) => cell.editHeightDelta);
}

function simHeightSnapshot(world: WorldBrain): number[] {
  return world.cells.map((cell) => cell.simHeightDelta);
}

function changedIndices(before: number[], after: number[]): number[] {
  const changed: number[] = [];
  for (let i = 0; i < before.length; i++) {
    if (before[i] !== after[i]) changed.push(i);
  }
  return changed;
}

function isInsideStroke(world: WorldBrain, action: TerrainStrokeAction, cellIndex: number): boolean {
  const row = Math.floor(cellIndex / world.gridWidth);
  const col = cellIndex % world.gridWidth;
  const dr = row - action.center.row;
  const dc = col - action.center.col;
  return Math.sqrt(dr * dr + dc * dc) < action.radius;
}

describe('WorldAction terrain behavior', () => {
  it('applies TERRAIN_STROKE deterministically to editHeightDelta only', () => {
    const seed = 'deterministic-terrain-action';
    const action = makeRaiseStroke();
    const worldA = makeActionTestWorld(seed);
    const worldB = makeActionTestWorld(seed);

    const beforeAEdit = editHeightSnapshot(worldA);
    const beforeABase = baseHeightSnapshot(worldA);
    const beforeASim = simHeightSnapshot(worldA);

    const beforeBEdit = editHeightSnapshot(worldB);
    const beforeBBase = baseHeightSnapshot(worldB);
    const beforeBSim = simHeightSnapshot(worldB);

    applyWorldAction(worldA, action);
    applyWorldAction(worldB, action);

    const afterAEdit = editHeightSnapshot(worldA);
    const afterBEdit = editHeightSnapshot(worldB);
    const changedA = changedIndices(beforeAEdit, afterAEdit);
    const changedB = changedIndices(beforeBEdit, afterBEdit);

    expect(changedA.length).toBeGreaterThan(0);
    expect(changedA).toEqual(changedB);
    expect(afterAEdit).toEqual(afterBEdit);

    expect(baseHeightSnapshot(worldA)).toEqual(beforeABase);
    expect(baseHeightSnapshot(worldB)).toEqual(beforeBBase);
    expect(simHeightSnapshot(worldA)).toEqual(beforeASim);
    expect(simHeightSnapshot(worldB)).toEqual(beforeBSim);

    expect(validateWorld(worldA)).toEqual([]);
    recomputeWorld(worldA, ['TERRAIN_EDIT']);
    expect(validateWorld(worldA)).toEqual([]);
  });

  it('leaves cells outside the stroke radius unchanged', () => {
    const action = makeRaiseStroke();
    const world = makeActionTestWorld('terrain-action-unaffected-cells');
    const beforeEdit = editHeightSnapshot(world);

    applyWorldAction(world, action);

    const afterEdit = editHeightSnapshot(world);
    const changed = changedIndices(beforeEdit, afterEdit);

    expect(changed.length).toBeGreaterThan(0);
    for (const changedIndex of changed) {
      expect(isInsideStroke(world, action, changedIndex)).toBe(true);
    }

    for (let i = 0; i < world.cells.length; i++) {
      if (!isInsideStroke(world, action, i)) {
        expect(afterEdit[i]).toBe(beforeEdit[i]);
      }
    }
  });

  it('does not change baseHeight or simHeightDelta for affected terrain cells', () => {
    const action = makeRaiseStroke();
    const world = makeActionTestWorld('terrain-action-layer-isolation');
    const beforeBase = baseHeightSnapshot(world);
    const beforeEdit = editHeightSnapshot(world);
    const beforeSim = simHeightSnapshot(world);

    applyWorldAction(world, action);

    const afterEdit = editHeightSnapshot(world);
    const changed = changedIndices(beforeEdit, afterEdit);

    expect(changed.length).toBeGreaterThan(0);
    expect(baseHeightSnapshot(world)).toEqual(beforeBase);
    expect(simHeightSnapshot(world)).toEqual(beforeSim);

    for (const changedIndex of changed) {
      expect(afterEdit[changedIndex]).toBeGreaterThan(beforeEdit[changedIndex]);
      expect(world.cells[changedIndex].baseHeight).toBe(beforeBase[changedIndex]);
      expect(world.cells[changedIndex].simHeightDelta).toBe(beforeSim[changedIndex]);
    }
  });
});