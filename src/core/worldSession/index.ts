// src/core/worldSession/index.ts
import { WorldBrain } from '../worldSchema';
import { generateWorldFromParams, GeneratorParams } from '../worldGenerator';
import { getWorldById, saveWorld } from '../worldStorage';
import { WorldAction, applyAction } from '../worldActions';
import { recomputeWorld } from '../worldRecompute';
import { simulateTick } from '../worldSim';

/**
 * A session manager that owns the current world and manages undo/redo.
 * All mode components interact with the world through this class.
 */
type Listener = (world: WorldBrain) => void;

class WorldSession {
  private world: WorldBrain | null = null;
  private past: WorldBrain[] = [];
  private future: WorldBrain[] = [];
  private listeners: Listener[] = [];

  /** Subscribe to world changes; returns an unsubscribe function */
  subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    // Immediately notify with current world (if any)
    if (this.world) listener(this.world);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /** Internal helper to set the current world and notify listeners */
  private setWorld(world: WorldBrain | null) {
    this.world = world;
    this.listeners.forEach((l) => {
      if (this.world) l(this.world);
    });
  }

  /** Creates a new world from generator params */
  createWorld(params: GeneratorParams) {
    const w = generateWorldFromParams(params);
    this.past = [];
    this.future = [];
    this.setWorld(w);
  }

  /** Loads an existing world by ID from storage */
  async loadWorld(id: string): Promise<void> {
    const w = await getWorldById(id);
    this.past = [];
    this.future = [];
    this.setWorld(w);
  }

  /** Returns the current world (may be null if not loaded yet) */
  getWorld(): WorldBrain | null {
    return this.world;
  }

  /** Applies an action to the current world and recomputes derived fields */
  apply(action: WorldAction) {
    if (!this.world) return;
    // Store current world for undo
    this.past.push(structuredClone(this.world));
    // Clear redo stack
    this.future = [];
    // Apply mutation
    applyAction(this.world, action);
    recomputeWorld(this.world, ['TERRAIN_EDIT']);
    this.setWorld(this.world);
  }

  /** Undo the last action */
  undo() {
    if (this.past.length === 0 || !this.world) return;
    const prev = this.past.pop()!;
    this.future.push(structuredClone(this.world));
    this.setWorld(prev);
  }

  /** Redo the last undone action */
  redo() {
    if (this.future.length === 0 || !this.world) return;
    const next = this.future.pop()!;
    this.past.push(structuredClone(this.world));
    this.setWorld(next);
  }

  /** Saves the current world to storage and returns its ID */
  async save(): Promise<string | null> {
    if (!this.world) return null;
    const saved = await saveWorld(this.world);
    return saved.id;
  }

  /** Runs a simulation tick on the current world */
  simulateTick() {
    if (!this.world) return;
    simulateTick(this.world);
    recomputeWorld(this.world, ['SIM_STEP']);
    this.setWorld(this.world);
  }
}

export const worldSession = new WorldSession();