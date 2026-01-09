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
  private pendingStrokeSamples: Array<{ row: number; col: number }> = [];
  private recomputeThrottleTimer: number | null = null;
  private lastApplyTime: number = 0;

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
    // Flush any pending strokes
    if (this.recomputeThrottleTimer) {
      clearTimeout(this.recomputeThrottleTimer);
      this.recomputeThrottleTimer = null;
    }
    this.flushPendingStrokes();
    
    this.state.isDrawing = false;
    this.notifyStateChange();
    // Finalize the action history for undo/redo
  }

  /**
   * Apply brush at a specific cell, creating and dispatching an action.
   * OPTIMIZED: Batch samples and throttle recompute to avoid lag.
   */
  private applyBrushAtCell(gridRow: number, gridCol: number): void {
    if (!this.world) return;

    // Accumulate stroke sample
    this.pendingStrokeSamples.push({ row: gridRow, col: gridCol });

    const now = performance.now();
    const timeSinceLastApply = now - this.lastApplyTime;

    // Throttle: only apply every 100ms to avoid lag
    if (timeSinceLastApply < 100 && this.state.isDrawing) {
      // Schedule a delayed flush if not already scheduled
      if (!this.recomputeThrottleTimer) {
        this.recomputeThrottleTimer = window.setTimeout(() => {
          this.flushPendingStrokes();
        }, 100);
      }
      return;
    }

    this.flushPendingStrokes();
  }

  /**
   * Flush accumulated stroke samples to world.
   */
  private flushPendingStrokes(): void {
    if (!this.world || this.pendingStrokeSamples.length === 0) {
      this.pendingStrokeSamples = [];
      this.recomputeThrottleTimer = null;
      return;
    }

    // Apply each sample
    for (const sample of this.pendingStrokeSamples) {
      const action: TerrainStrokeAction = {
        type: 'TERRAIN_STROKE',
        tool: this.state.tool,
        center: { row: sample.row, col: sample.col },
        radius: this.state.brushParams.radius,
        strength: this.state.brushParams.strength * 0.3, // Reduce strength for smoother accumulation
      };
      applyWorldAction(this.world, action);
      this.actionHistory.push(action);
    }

    // Single recompute for all accumulated samples
    recomputeWorld(this.world, ['TERRAIN_EDIT']);

    // Notify once
    this.lastApplyTime = performance.now();
    this.onWorldChange(this.world);

    // Clear pending samples
    this.pendingStrokeSamples = [];
    this.recomputeThrottleTimer = null;
  }

  /**
   * Notify listeners of state changes.
   */
  private notifyStateChange(): void {
    this.onStateChange(this.getState());
  }
}
