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
    if (!world) return;
    for (const l of this.listeners) l(world);
  }

  /** Create a new world from generator params */
  createWorld(params: GeneratorParams) {
    const w = generateWorldFromParams(params);
    this.past = [];
    this.future = [];
    this.setWorld(w);
  }

  /** Loads a world by ID from storage */
  async loadWorld(id: string): Promise<void> {
    const w = await getWorldById(id);
    if (!w) throw new Error(`WorldSession: world "${id}" not found`);
    this.past = [];
    this.future = [];
    this.setWorld(w);
  }

  /** Returns current world (read-only reference; mutations happen via actions) */
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

  undo() {
    if (!this.world) return;
    const prev = this.past.pop();
    if (!prev) return;
    this.future.push(structuredClone(this.world));
    this.setWorld(prev);
  }

  redo() {
    if (!this.world) return;
    const next = this.future.pop();
    if (!next) return;
    this.past.push(structuredClone(this.world));
    this.setWorld(next);
  }

  /** Saves the current world to storage and returns its ID */
  async save(): Promise<string | null> {
    if (!this.world) return null;
    try {
      const saved = await saveWorld(this.world);
      // saveWorld returns a normalized WorldBrain; canonical id lives in metadata.id
      return (saved as any)?.metadata?.id ?? this.world.metadata?.id ?? null;
    } catch {
      return null;
    }
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