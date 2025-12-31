// ========================================================
// WORLDWRIGHT -- TERRAIN BRUSH CONTROLLER (V1.3)
// File: src/modes/create/TerrainBrushController.ts
//
// Manages terrain brush state, interaction, and action dispatch.
// ========================================================

import { WorldBrain } from '../../core/worldSchema';
import { applyWorldAction, TerrainStrokeAction } from '../../core/worldActions';
import { recomputeWorld } from '../../core/worldRecompute';
import { BrushParams } from '../../core/brushEngine';

export interface TerrainBrushState {
  enabled: boolean;
  tool: 'RAISE' | 'LOWER' | 'FLATTEN' | 'SMOOTH';
  brushParams: BrushParams;
  isDrawing: boolean;
  lastAppliedStroke?: TerrainStrokeAction;
}

export class TerrainBrushController {
  private state: TerrainBrushState;
  private actionHistory: TerrainStrokeAction[] = [];

  constructor(
    private world: WorldBrain | null,
    private onStateChange: (state: TerrainBrushState) => void,
    private onWorldChange: (world: WorldBrain) => void
  ) {
    this.state = {
      enabled: false,
      tool: 'RAISE',
      brushParams: {
        shape: 'CIRCLE',
        falloff: 'SOFT',
        radius: 10,
        strength: 0.5,
      },
      isDrawing: false,
    };
  }

  /**
   * Enable a specific terrain tool.
   */
  setTool(tool: 'RAISE' | 'LOWER' | 'FLATTEN' | 'SMOOTH'): void {
    this.state.tool = tool;
    this.state.enabled = true;
    this.notifyStateChange();
  }

  /**
   * Disable the brush.
   */
  disable(): void {
    this.state.enabled = false;
    this.state.isDrawing = false;
    this.notifyStateChange();
  }

  /**
   * Update brush parameters.
   */
  setBrushParams(params: Partial<BrushParams>): void {
    this.state.brushParams = { ...this.state.brushParams, ...params };
    this.notifyStateChange();
  }

  /**
   * Get current brush state.
   */
  getState(): TerrainBrushState {
    return { ...this.state };
  }

  /**
   * Update the world reference (called when world loads/changes).
   */
  setWorld(world: WorldBrain | null): void {
    this.world = world;
  }

  /**
   * Start a brush stroke (mouse/touch down).
   */
  startStroke(gridRow: number, gridCol: number): void {
    if (!this.state.enabled || !this.world) return;
    this.state.isDrawing = true;
    this.actionHistory = [];
    this.applyBrushAtCell(gridRow, gridCol);
  }

  /**
   * Continue a brush stroke (mouse/touch move).
   */
  continueStroke(gridRow: number, gridCol: number): void {
    if (!this.state.isDrawing || !this.state.enabled || !this.world) return;
    this.applyBrushAtCell(gridRow, gridCol);
  }

  /**
   * End a brush stroke (mouse/touch up).
   */
  endStroke(): void {
    this.state.isDrawing = false;
    this.notifyStateChange();
    // Finalize the action history for undo/redo
  }

  /**
   * Apply brush at a specific cell, creating and dispatching an action.
   */
  private applyBrushAtCell(gridRow: number, gridCol: number): void {
    if (!this.world) return;

    const action: TerrainStrokeAction = {
      type: 'TERRAIN_STROKE',
      tool: this.state.tool,
      center: { row: gridRow, col: gridCol },
      radius: this.state.brushParams.radius,
      strength: this.state.brushParams.strength,
    };

    // Apply action and recompute
    applyWorldAction(this.world, action);
    recomputeWorld(this.world, ['TERRAIN_EDIT']);

    this.state.lastAppliedStroke = action;
    this.actionHistory.push(action);
    this.onWorldChange(this.world);
  }

  /**
   * Notify listeners of state changes.
   */
  private notifyStateChange(): void {
    this.onStateChange(this.getState());
  }
}
