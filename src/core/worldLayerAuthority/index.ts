import type { WorldBrain } from '../worldSchema';

const TERRAIN_DELTA_EPSILON = 1e-9;

export type TerrainDeltaViolation = {
  cellIndex: number;
  editHeightDelta: number;
  simHeightDelta: number;
};

/**
 * Generated terrain passes are allowed to mutate baseHeight only while the
 * world still has a pristine generated terrain stack. Once Create Mode or Sim
 * Mode has written terrain deltas, generated passes must not read totalHeight
 * and fold those deltas back into baseHeight.
 */
export function assertNoAuthoredTerrainDeltas(world: WorldBrain, owner: string): void {
  const violations = findAuthoredTerrainDeltas(world, 5);
  if (violations.length === 0) return;

  const sample = violations
    .map((v) => `cell ${v.cellIndex}: edit=${formatDelta(v.editHeightDelta)}, sim=${formatDelta(v.simHeightDelta)}`)
    .join('; ');

  throw new Error(
    `${owner} is generate-only and cannot run after authored or simulation terrain deltas exist. ` +
      `This prevents generated passes from absorbing editHeightDelta/simHeightDelta into baseHeight. ` +
      `Examples: ${sample}`,
  );
}

export function findAuthoredTerrainDeltas(world: WorldBrain, limit = Infinity): TerrainDeltaViolation[] {
  const out: TerrainDeltaViolation[] = [];
  if (!world?.cells?.length) return out;

  for (let i = 0; i < world.cells.length; i++) {
    const cell = world.cells[i];
    const editHeightDelta = typeof cell.editHeightDelta === 'number' ? cell.editHeightDelta : 0;
    const simHeightDelta = typeof cell.simHeightDelta === 'number' ? cell.simHeightDelta : 0;

    if (Math.abs(editHeightDelta) > TERRAIN_DELTA_EPSILON || Math.abs(simHeightDelta) > TERRAIN_DELTA_EPSILON) {
      out.push({ cellIndex: i, editHeightDelta, simHeightDelta });
      if (out.length >= limit) break;
    }
  }

  return out;
}

function formatDelta(value: number): string {
  return Number.isFinite(value) ? value.toFixed(6) : String(value);
}
