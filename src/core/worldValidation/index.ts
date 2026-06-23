// ========================================================
// WORLDWRIGHT -- WORLD VALIDATION (V1.3 Spine)
// File: src/core/worldValidation/index.ts
//
// Returns human-readable validation errors (non-throwing).
// Callers can show these in a debug panel or before export/save.
// ========================================================

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

  // Global sea level
  if (typeof (world as any).seaLevel !== 'number' || Number.isNaN((world as any).seaLevel)) {
    errors.push('World is missing global seaLevel (number).');
  }

  // Metadata sanity
  if (!world.metadata) errors.push('World metadata is missing.');
  if (!world.metadata?.id) errors.push('World metadata.id is missing.');
  if (!world.metadata?.schemaVersion) errors.push('World metadata.schemaVersion is missing.');

  // Cell contract checks
  for (let i = 0; i < world.cells.length; i++) {
    const cell: any = world.cells[i];

    if (cell.index !== i) {
      errors.push(`Cell index mismatch at i=${i} (cell.index=${cell.index}).`);
      break;
    }

    // Legacy per-cell seaLevel should not exist anymore
    if ('seaLevel' in cell) {
      errors.push('Legacy field detected: cell.seaLevel exists. World should be normalized/migrated.');
      break;
    }

    if (typeof cell.baseHeight !== 'number') errors.push(`Cell ${i} missing baseHeight.`);
    if (typeof cell.editHeightDelta !== 'number') errors.push(`Cell ${i} missing editHeightDelta.`);
    if (typeof cell.simHeightDelta !== 'number') errors.push(`Cell ${i} missing simHeightDelta.`);
    if (typeof cell.isWater !== 'boolean') errors.push(`Cell ${i} missing isWater.`);

    if (cell.flowDirection != null && typeof cell.flowDirection !== 'number') {
      errors.push(`Cell ${i} flowDirection invalid type.`);
    }
    if (typeof cell.flowAccumulation !== 'number') errors.push(`Cell ${i} missing flowAccumulation.`);
    if (cell.basinId != null && typeof cell.basinId !== 'number') errors.push(`Cell ${i} basinId invalid type.`);

    if (typeof cell.crustThickness !== 'number') errors.push(`Cell ${i} missing crustThickness.`);
    if (typeof cell.crustAge !== 'number') errors.push(`Cell ${i} missing crustAge.`);
    if (typeof cell.crustThickness === 'number' && (cell.crustThickness < 0 || cell.crustThickness > 1)) {
      errors.push(`Cell ${i} crustThickness outside 0..1.`);
    }
    if (typeof cell.crustAge === 'number' && (cell.crustAge < 0 || cell.crustAge > 1)) {
      errors.push(`Cell ${i} crustAge outside 0..1.`);
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
