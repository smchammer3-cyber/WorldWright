// ========================================================
// WORLDWRIGHT -- WORLD SESSION (V1.3 STABILIZE)
// File: src/core/worldSession/index.ts
//
// Fixes:
// - Track dirty state (isDirty) for Save status.
// - Make load/save throw meaningful errors (no silent failures).
// - Keep undo/redo deterministic.
// ========================================================

import { WorldBrain } from "../worldSchema";
import { generateWorldFromParams, GeneratorParams } from "../worldGenerator";
import { getWorldById, saveWorld } from "../worldStorage";
import { WorldAction, applyAction } from "../worldActions";
import { recomputeWorld } from "../worldRecompute";
import { simulateTick } from "../worldSim";

type Listener = (world: WorldBrain | null) => void;

class WorldSession {
  private world: WorldBrain | null = null;
  private past: WorldBrain[] = [];
  private future: WorldBrain[] = [];
  private listeners: Listener[] = [];
  private dirty = false;

  // -----------------------------
  // Subscribe
  // -----------------------------
  subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    listener(this.world);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private emit() {
    for (const l of this.listeners) l(this.world);
  }

  private setWorld(world: WorldBrain | null) {
    this.world = world;
    this.emit();
  }

  // -----------------------------
  // State
  // -----------------------------
  getWorld(): WorldBrain | null {
    return this.world;
  }

  isDirty(): boolean {
    return this.dirty;
  }

  // -----------------------------
  // Lifecycle
  // -----------------------------
  createWorld(params: GeneratorParams) {
    const w = generateWorldFromParams(params);
    this.past = [];
    this.future = [];
    this.dirty = true;
    this.setWorld(w);
  }

  async loadWorld(id: string): Promise<void> {
    const w = await getWorldById(id);
    if (!w) throw new Error(`World "${id}" not found`);
    this.past = [];
    this.future = [];
    this.dirty = false;
    this.setWorld(w);
  }

  async save(): Promise<string> {
    if (!this.world) throw new Error("No world loaded");
    const saved = await saveWorld(this.world);
    this.dirty = false;
    return saved.metadata.id;
  }

  // -----------------------------
  // Edits
  // -----------------------------
  apply(action: WorldAction) {
    if (!this.world) return;

    // snapshot for undo
    this.past.push(structuredClone(this.world));
    this.future = [];

    applyAction(this.world, action);
    recomputeWorld(this.world, ["EDIT"]);

    this.dirty = true;
    this.emit();
  }

  undo() {
    if (!this.world) return;
    const prev = this.past.pop();
    if (!prev) return;

    this.future.push(structuredClone(this.world));
    this.setWorld(prev);

    // still dirty until saved
    this.dirty = true;
  }

  redo() {
    if (!this.world) return;
    const next = this.future.pop();
    if (!next) return;

    this.past.push(structuredClone(this.world));
    this.setWorld(next);

    this.dirty = true;
  }

  // -----------------------------
  // Simulation
  // -----------------------------
  simulateTick() {
    if (!this.world) return;
    simulateTick(this.world);
    recomputeWorld(this.world, ["SIM_STEP"]);
    this.dirty = true;
    this.emit();
  }
}

export const worldSession = new WorldSession();