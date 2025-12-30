import type { WorldBrain } from "../worldSchema";
import { recomputeWorld } from "../worldRecompute";
import { applyWorldAction } from "../worldActions";

class WorldSession {
  world: WorldBrain | null = null;
  isDirty = false;

  loadWorld(world: WorldBrain) {
    this.world = world;
    recomputeWorld(this.world, ["LOADED"]);
    this.isDirty = false;
  }

  apply(action: any) {
    if (!this.world) return;
    applyWorldAction(this.world, action);
    recomputeWorld(this.world, ["TERRAIN_EDIT"]);
    this.isDirty = true;
  }
}

export const worldSession = new WorldSession();