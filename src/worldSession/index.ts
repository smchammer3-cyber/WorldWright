// WorldWright – World Session (V1.3 Spine)
//
// Coordinates canonical world state, undo/redo, editing, and simulation branches.
// This is the glue layer between UI and core logic.

import {
  WorldBrain,
  Sticker,
} from '../core/worldSchema';

import {
  cloneWorld,
  simulateTick,
} from '../core/worldSim';

import {
  applyTerrainTool,
  TerrainToolType,
  applySticker,
} from '../core/worldEditor';

interface Branch {
  id: string;
  world: WorldBrain;
}

export class WorldSession {
  private world: WorldBrain | null = null;
  private undoStack: WorldBrain[] = [];
  private redoStack: WorldBrain[] = [];
  private branches = new Map<string, Branch>();

  // ---------- Canonical World ----------

  loadWorld(world: WorldBrain): void {
    this.world = cloneWorld(world);
    this.undoStack = [];
    this.redoStack = [];
    this.branches.clear();
  }

  getWorld(): WorldBrain {
    if (!this.world) {
      throw new Error('WorldSession: no world loaded');
    }
    return this.world;
  }

  // ---------- Undo / Redo ----------

  applyEdit(editFn: (world: WorldBrain) => void): void {
    if (!this.world) return;

    const snapshot = cloneWorld(this.world);
    this.undoStack.push(snapshot);
    this.redoStack = [];

    editFn(this.world);
  }

  undo(): void {
    if (!this.world || this.undoStack.length === 0) return;

    const prev = this.undoStack.pop()!;
    this.redoStack.push(cloneWorld(this.world));
    this.world = cloneWorld(prev);
  }

  redo(): void {
    if (!this.world || this.redoStack.length === 0) return;

    const next = this.redoStack.pop()!;
    this.undoStack.push(cloneWorld(this.world));
    this.world = cloneWorld(next);
  }

  // ---------- Editing Helpers ----------

  applyTerrain(
    row: number,
    col: number,
    radius: number,
    delta: number,
    tool: TerrainToolType,
  ): void {
    this.applyEdit((w) => {
      applyTerrainTool(w, row, col, radius, delta, tool);
    });
  }

  applyStickerOperation(sticker: Sticker): void {
    this.applyEdit((w) => {
      applySticker(w, sticker);
    });
  }

  // ---------- Simulation Branches ----------

  createBranch(id: string): void {
    if (!this.world) {
      throw new Error('WorldSession: no world loaded');
    }
    this.branches.set(id, {
      id,
      world: cloneWorld(this.world),
    });
  }

  simulateBranchTick(id: string, dt: number = 1): void {
    const branch = this.branches.get(id);
    if (!branch) {
      throw new Error(`WorldSession: branch "${id}" does not exist`);
    }
    simulateTick(branch.world, dt);
  }

  promoteBranch(id: string): void {
    const branch = this.branches.get(id);
    if (!branch) {
      throw new Error(`WorldSession: branch "${id}" does not exist`);
    }
    this.world = cloneWorld(branch.world);
    this.undoStack = [];
    this.redoStack = [];
    this.branches.delete(id);
  }
}