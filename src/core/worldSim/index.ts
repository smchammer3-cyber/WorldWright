// WorldWright – World Simulation (V1.3 Spine)
//
// Simulation runs on branch snapshots (cloneWorld). The canonical world
// should never be mutated by Sim Mode directly without promotion.
// This scaffold simulates simple city population growth and is designed
// to be extended (culture drift, economy, borders, etc.).

import { WorldBrain } from '../worldSchema';

export function cloneWorld(world: WorldBrain): WorldBrain {
  // Deep clone (safe baseline). Optimize later with structured cloning.
  return JSON.parse(JSON.stringify(world)) as WorldBrain;
}

export function simulateTick(world: WorldBrain, dt: number = 1): void {
  // Minimal stub: grow city populations slowly
  const growthRate = 0.01 * dt;

  for (const city of world.cities) {
    city.population += city.population * growthRate;
  }

  // Future (blueprint): culture drift, trade routes, wars, events, roads, etc.
}