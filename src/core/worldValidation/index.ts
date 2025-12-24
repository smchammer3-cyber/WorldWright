// WorldWright – World Validation (V1.3 Spine)
//
// Returns human-readable validation errors (non-throwing).
// Callers can show these in a debug panel or before export/save.

import { WorldBrain } from '../worldSchema';

export function validateWorld(world: WorldBrain): string[] {
  const errors: string[] = [];

  // Basic grid integrity
  const expected = world.gridWidth * world.gridHeight;
  if (world.cells.length !== expected) {
    errors.push(
      `Cell array size (${world.cells.length}) does not match grid (${world.gridWidth}×${world.gridHeight} = ${expected}).`,
    );
  }

  // Cell indices + flow indices
  for (let i = 0; i < world.cells.length; i++) {
    const c = world.cells[i];
    if (c.index !== i) {
      errors.push(`Cell at array index ${i} has mismatched cell.index=${c.index}.`);
    }
    if (c.flowDirection !== null) {
      if (c.flowDirection < 0 || c.flowDirection >= world.cells.length) {
        errors.push(`Cell ${i} has invalid flowDirection=${c.flowDirection}.`);
      }
    }
  }

  // Rivers sanity
  for (const r of world.rivers) {
    if (!r.id) errors.push('A river is missing an id.');
    if (!r.points || r.points.length === 0) errors.push(`River ${r.id} has no points.`);
    for (let i = 0; i < (r.points?.length ?? 0); i++) {
      const pt = r.points[i];
      if (pt.cellIndex < 0 || pt.cellIndex >= world.cells.length) {
        errors.push(`River ${r.id} point ${i} references invalid cellIndex=${pt.cellIndex}.`);
      }
    }
  }

  // Countries sanity
  for (const country of world.countries) {
    if (!country.id) errors.push('A country is missing an id.');
    if (!country.polygons || country.polygons.length === 0) {
      errors.push(`Country ${country.id || '(unknown)'} has no polygons.`);
    }
  }

  // Cities sanity
  for (const city of world.cities) {
    if (city.cellIndex < 0 || city.cellIndex >= world.cells.length) {
      errors.push(`City ${city.id || city.name} has invalid cellIndex=${city.cellIndex}.`);
    }
  }

  return errors;
}