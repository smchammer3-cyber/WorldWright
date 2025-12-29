// ========================================================
// WORLDWRIGHT -- WORLD VALIDATION (V1.3)
// File: src/core/worldValidation/index.ts
//
// Strict on structure, tolerant on content.
// ========================================================

import { WorldBrain } from "../worldSchema";

export type WorldValidationError = { path: string; message: string };

function err(path: string, message: string): WorldValidationError {
  return { path, message };
}

export function validateWorld(world: WorldBrain): WorldValidationError[] {
  const errors: WorldValidationError[] = [];

  if (!world || typeof world !== "object") return [err("world", "World is not an object.")];

  if (!Number.isFinite(world.gridWidth) || world.gridWidth <= 0) errors.push(err("gridWidth", "gridWidth must be > 0."));
  if (!Number.isFinite(world.gridHeight) || world.gridHeight <= 0) errors.push(err("gridHeight", "gridHeight must be > 0."));

  if (!Number.isFinite(world.seaLevel)) errors.push(err("seaLevel", "seaLevel must be a finite number."));

  const expected = world.gridWidth * world.gridHeight;

  if (!Array.isArray(world.cells)) errors.push(err("cells", "cells must be an array."));
  else if (world.cells.length !== expected) errors.push(err("cells", `cells.length ${world.cells.length} != expected ${expected}.`));

  if (!world.metadata || typeof world.metadata !== "object") {
    errors.push(err("metadata", "metadata missing."));
  } else {
    if (typeof world.metadata.id !== "string" || !world.metadata.id) errors.push(err("metadata.id", "id must be non-empty string."));
    if (typeof world.metadata.name !== "string") errors.push(err("metadata.name", "name must be string."));
    if (typeof world.metadata.seed !== "string") errors.push(err("metadata.seed", "seed must be string."));
    if (world.metadata.version !== "1.3") errors.push(err("metadata.version", "version must be '1.3'."));
    if (typeof world.metadata.styleMode !== "string") errors.push(err("metadata.styleMode", "styleMode must be string."));
    if (typeof world.metadata.createdAt !== "string") errors.push(err("metadata.createdAt", "createdAt must be ISO string."));
    if (typeof world.metadata.updatedAt !== "string") errors.push(err("metadata.updatedAt", "updatedAt must be ISO string."));
  }

  const arrays: Array<[string, any]> = [
    ["plates", world.plates],
    ["rivers", world.rivers],
    ["countries", world.countries],
    ["cultures", world.cultures],
    ["cultureRegions", world.cultureRegions],
    ["cities", world.cities],
    ["locations", world.locations],
    ["stickers", world.stickers],
  ];

  for (const [p, v] of arrays) {
    if (!Array.isArray(v)) errors.push(err(p, `${p} must be an array.`));
  }

  if (Array.isArray(world.cells)) {
    for (let i = 0; i < world.cells.length; i++) {
      const c: any = world.cells[i];
      if (!c || typeof c !== "object") {
        errors.push(err(`cells[${i}]`, "cell is not an object."));
        continue;
      }
      if (c.index !== i) errors.push(err(`cells[${i}].index`, `index ${c.index} != ${i}`));

      const mustNum = (k: string) => {
        if (!Number.isFinite(c[k])) errors.push(err(`cells[${i}].${k}`, `${k} must be a number.`));
      };

      mustNum("baseHeight");
      mustNum("editHeightDelta");
      mustNum("simHeightDelta");
      mustNum("temperature");
      mustNum("rainfall");
      mustNum("flowAccumulation");
      mustNum("plateId");
      mustNum("upliftRate");
      mustNum("surfaceAge");
      mustNum("volcanicActivity");
      mustNum("baseBiomeId");
      mustNum("snowCover");

      if (typeof c.isWater !== "boolean") errors.push(err(`cells[${i}].isWater`, "isWater must be boolean."));

      if (c.flowDirection !== null) {
        if (!Number.isFinite(c.flowDirection) || c.flowDirection < 0 || c.flowDirection > 7) {
          errors.push(err(`cells[${i}].flowDirection`, "flowDirection must be null or 0..7"));
        }
      }
      if (c.basinId !== null && !Number.isFinite(c.basinId)) {
        errors.push(err(`cells[${i}].basinId`, "basinId must be null or number"));
      }
    }
  }

  return errors;
}