// WorldWright – World Simulation (V1.3 Spine)
//
// Simulation runs on branch snapshots (cloneWorld). The canonical world
// should never be mutated by Sim Mode directly without promotion.
// This module provides simulation ticking with event generation and
// cultural/demographic evolution.

import { WorldBrain } from '../worldSchema';
import { generateSimEvents } from '../simEvents';

export function cloneWorld(world: WorldBrain): WorldBrain {
  // Deep clone (safe baseline). Optimize later with structured cloning.
  return JSON.parse(JSON.stringify(world)) as WorldBrain;
}

/**
 * Main simulation tick: advance world by one year.
 * - Grows city populations
 * - Generates events (culture splits, wars, disasters)
 * - Evolves culture zones
 */
export function simulateTick(world: WorldBrain, dt: number = 1): void {
  // City population growth
  const growthRate = 0.01 * dt;
  for (const city of world.cities) {
    city.population += city.population * growthRate;
  }

  // Culture drift (slowly shift nearby cells to culture)
  for (const culture of world.cultures) {
    if (Math.random() < 0.05) {
      const cellIdx = Math.floor(Math.random() * world.cells.length);
      if (!world.cells[cellIdx].isWater) {
        world.cells[cellIdx].cultureId = culture.id;
      }
    }
  }

  // Natural country expansion (borders shift into unclaimed land)
  for (const country of world.countries) {
    // Find cells belonging to this country
    const countryCells = world.cells
      .map((c, idx) => ({ cell: c, idx }))
      .filter((x) => x.cell.countryId === country.id);

    if (countryCells.length > 0 && Math.random() < 0.03) {
      const randomCell = countryCells[Math.floor(Math.random() * countryCells.length)];
      const cellIdx = randomCell.idx;
      const row = Math.floor(cellIdx / world.gridWidth);
      const col = cellIdx % world.gridWidth;

      // Try to expand to a neighbor
      const neighbors = [
        ((row - 1 + world.gridHeight) % world.gridHeight) * world.gridWidth + col,
        ((row + 1) % world.gridHeight) * world.gridWidth + col,
        row * world.gridWidth + ((col - 1 + world.gridWidth) % world.gridWidth),
        row * world.gridWidth + ((col + 1) % world.gridWidth),
      ];

      for (const neighborIdx of neighbors) {
        const neighbor = world.cells[neighborIdx];
        if (!neighbor.isWater && !neighbor.countryId) {
          neighbor.countryId = country.id;
          break;
        }
      }
    }
  }

  // Future (blueprint): trade routes, roads, religious spread, etc.
}