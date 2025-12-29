// src/core/worldSession/index.ts
import { WorldBrain } from "../worldSchema";
import { generateWorldFromParams, GeneratorParams } from "../worldGenerator";
import { getWorldById, saveWorld } from "../worldStorage";
import { WorldAction, applyAction } from "../worldActions";
import { recomputeWorld } from "../worldRecompute";
import { simulateTick } from "../worldSim";

type Listener = (world: WorldBrain) => void;

class WorldSession {
  private world: WorldBrain | null = null;
  private past: WorldBrain[] = [];
  private future: WorldBrain[] = [];
  private listeners: Listener[] = [];

  subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    if (this.world) listener(this.world);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private setWorld(world: WorldBrain | null) {
    this.world = world;
    if (!this.world) return;
    for (const l of this.listeners) l(this.world);
  }

  createWorld(params: GeneratorParams) {
    const w = generateWorldFromParams(params);
    this.past = [];
    this.future = [];
    this.setWorld(w);
  }

  async loadWorld(id: string): Promise<void> {
    const w = await getWorldById(id);
    if (!w) throw new Error(`WorldSession: world "${id}" not found`);
    this.past = [];
    this.future = [];
    this.setWorld(w);
  }

  getWorld(): WorldBrain | null {
    return this.world;
  }

  apply(action: WorldAction) {
    if (!this.world) return;
    this.past.push(structuredClone(this.world));
    this.future = [];
    applyAction(this.world, action);
    recomputeWorld(this.world, ["TERRAIN_EDIT"]);
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

  async save(): Promise<string | null> {
    if (!this.world) return null;
    try {
      const saved = await saveWorld(this.world);
      // Canonical id is metadata.id on WorldBrain
      return (saved as any)?.metadata?.id ?? this.world.metadata?.id ?? null;
    } catch (e) {
      console.error("WorldSession.save failed:", e);
      return null;
    }
  }

  simulateTick() {
    if (!this.world) return;
    simulateTick(this.world);
    recomputeWorld(this.world, ["SIM_STEP"]);
    this.setWorld(this.world);
  }
}

export const worldSession = new WorldSession();