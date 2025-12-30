import type { WorldBrain } from "../worldSchema";

export type WorldAction =
  | {
      type: "TERRAIN_STROKE";
      delta: number;
    };

export function applyWorldAction(world: WorldBrain, action: WorldAction): void {
  switch (action.type) {
    case "TERRAIN_STROKE": {
      for (const cell of world.cells) {
        cell.editHeightDelta += action.delta;
      }
      return;
    }
    default: {
      // Defensive: if action types drift, do nothing.
      // We cannot claim unreachable until WorldAction is a real union.
      const _exhaustive: never = action as never;
      void _exhaustive;
      return;
    }
  }
}