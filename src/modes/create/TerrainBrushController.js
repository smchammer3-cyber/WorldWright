// ========================================================
// WORLDWRIGHT -- TERRAIN BRUSH CONTROLLER (V1.3)
// File: src/modes/create/TerrainBrushController.ts
//
// Manages terrain brush state, interaction, and action dispatch.
// ========================================================
import { applyWorldAction } from '../../core/worldActions';
import { recomputeWorld } from '../../core/worldRecompute';
export class TerrainBrushController {
    constructor(world, onStateChange, onWorldChange) {
        Object.defineProperty(this, "world", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: world
        });
        Object.defineProperty(this, "onStateChange", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: onStateChange
        });
        Object.defineProperty(this, "onWorldChange", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: onWorldChange
        });
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "actionHistory", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
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
    setTool(tool) {
        this.state.tool = tool;
        this.state.enabled = true;
        this.notifyStateChange();
    }
    /**
     * Disable the brush.
     */
    disable() {
        this.state.enabled = false;
        this.state.isDrawing = false;
        this.notifyStateChange();
    }
    /**
     * Update brush parameters.
     */
    setBrushParams(params) {
        this.state.brushParams = { ...this.state.brushParams, ...params };
        this.notifyStateChange();
    }
    /**
     * Get current brush state.
     */
    getState() {
        return { ...this.state };
    }
    /**
     * Update the world reference (called when world loads/changes).
     */
    setWorld(world) {
        this.world = world;
    }
    /**
     * Start a brush stroke (mouse/touch down).
     */
    startStroke(gridRow, gridCol) {
        if (!this.state.enabled || !this.world)
            return;
        this.state.isDrawing = true;
        this.actionHistory = [];
        this.applyBrushAtCell(gridRow, gridCol);
    }
    /**
     * Continue a brush stroke (mouse/touch move).
     */
    continueStroke(gridRow, gridCol) {
        if (!this.state.isDrawing || !this.state.enabled || !this.world)
            return;
        this.applyBrushAtCell(gridRow, gridCol);
    }
    /**
     * End a brush stroke (mouse/touch up).
     */
    endStroke() {
        this.state.isDrawing = false;
        this.notifyStateChange();
        // Finalize the action history for undo/redo
    }
    /**
     * Apply brush at a specific cell, creating and dispatching an action.
     */
    applyBrushAtCell(gridRow, gridCol) {
        if (!this.world)
            return;
        const action = {
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
    notifyStateChange() {
        this.onStateChange(this.getState());
    }
}
