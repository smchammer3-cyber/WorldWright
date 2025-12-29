// ========================================================
// JARVIS CHANGE HEADER -- WORLD VALIDATION (V1.3)
// File: src/core/worldValidation/index.ts
//
// Purpose:
// - Catch structural/schema errors early.
// - Avoid false negatives during early world creation.
// - Enforce V1.3 WorldBrain invariants without over-validating content.
// ========================================================

import { WorldBrain } from "../worldSchema";

export type WorldValidationError = {
  path: string;
  message: string;
};

function err(path: string, message: string): WorldValidationError {
  return { path, message };
}

export function validateWorld(world: WorldBrain): WorldValidationError[] {
  const errors: WorldValidationError[] = [];

  if (!world || typeof world !== "object") {
    return [err("world", "World is not an object.")];
  }

  // -----------------------------
  // Grid + cells
  // -----------------------------
  if (!Number.isFinite(world.gridWidth) || world.gridWidth <= 0) {
    errors.push(err("gridWidth", "gridWidth must be a positive number."));
  }

  if (!Number.isFinite(world.gridHeight) || world.gridHeight <= 0) {
    errors.push(err("gridHeight", "gridHeight must be a positive number."));
  }

  const expectedCellCount = world.gridWidth * world.gridHeight;

  if (!Array.isArray(world.cells)) {
    errors.push(err("cells", "cells must be an array."));
  } else if (world.cells.length !== expectedCellCount) {
    errors.push(
      err(
        "cells",
        `cells.length (${world.cells.length}) does not match grid (${expectedCellCount}).`,
      ),
    );
  }

  // -----------------------------
  // Global sea level
  // -----------------------------
  if (!Number.isFinite(world.seaLevel)) {
    errors.push(err("seaLevel", "world.seaLevel must be a finite number."));
  }

  // -----------------------------
  // Metadata
  // -----------------------------
  if (!world.metadata || typeof world.metadata !== "object") {
    errors.push(err("metadata", "metadata object is missing."));
  } else {
    if (typeof world.metadata.id !== "string" || !world.metadata.id) {
      errors.push(err("metadata.id", "metadata.id must be a non-empty string."));
    }
    if (typeof world.metadata.name !== "string") {
      errors.push(err("metadata.name", "metadata.name must be a string."));
    }
    if (typeof world.metadata.seed !== "string") {
      errors.push(err("metadata.seed", "metadata.seed must be a string."));
    }
    if (typeof world.metadata.version !== "string") {
      errors.push(err("metadata.version", "metadata.version must be a string."));
    }
    if (typeof world.metadata.styleMode !== "string") {
      errors.push(err("metadata.styleMode", "metadata.styleMode must be a string."));
    }
  }

  // -----------------------------
  // Required arrays
  // -----------------------------
  const requiredArrays: Array<[string, any]> = [
    ["plates", world.plates],
    ["rivers", world.rivers],
    ["countries", world.countries],
    ["cultures", world.cultures],
    ["cultureRegions", world.cultureRegions],
    ["cities", world.cities],
  ];

  for (const [name, arr] of requiredArrays) {
    if (!Array.isArray(arr)) {
      errors.push(err(name, `${name} must be an array.`));
    }
  }

  // -----------------------------
  // Cell-level sanity checks
  // -----------------------------
  if (Array.isArray(world.cells)) {
    for (let i = 0; i < world.cells.length; i++) {
      const c = world.cells[i];
      if (!c || typeof c !== "object") {
        errors.push(err(`cells[${i}]`, "Cell is not an object."));
        continue;
      }

      if (c.index !== i) {
        errors.push(
          err(`cells[${i}].index`, `Cell index ${c.index} does not match position ${i}.`),
        );
      }

      if (!Number.isFinite(c.baseHeight)) {
        errors.push(err(`cells[${i}].baseHeight`, "baseHeight must be a number."));
      }

      if (!Number.isFinite(c.editHeightDelta)) {
        errors.push(err(`cells[${i}].editHeightDelta`, "editHeightDelta must be a number."));
      }

      if (!Number.isFinite(c.simHeightDelta)) {
        errors.push(err(`cells[${i}].simHeightDelta`, "simHeightDelta must be a number."));
      }

      if (typeof c.isWater !== "boolean") {
        errors.push(err(`cells[${i}].isWater`, "isWater must be boolean."));
      }

      if (
        c.flowDirection !== null &&
        (!Number.isFinite(c.flowDirection) ||
          c.flowDirection < 0 ||
          c.flowDirection > 7)
      ) {
        errors.push(
          err(
            `cells[${i}].flowDirection`,
            "flowDirection must be null or an integer 0..7.",
          ),
        );
      }

      if (!Number.isFinite(c.flowAccumulation)) {
        errors.push(
          err(`cells[${i}].flowAccumulation`, "flowAccumulation must be a number."),
        );
      }

      if (c.basinId !== null && !Number.isFinite(c.basinId)) {
        errors.push(err(`cells[${i}].basinId`, "basinId must be null or a number."));
      }
    }
  }

  return errors;
}