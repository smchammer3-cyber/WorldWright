import { createEmptyLegacyCausalScaffold } from '../../causalWorld/schema';
import { CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION } from '../../worldSchema/version';
import type { MigrationContext, WorldMigrationStep } from '../types';

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function migrateCell(cell: unknown, index: number, context: MigrationContext): Record<string, unknown> {
  if (!isRecord(cell)) {
    throw new Error(`Schema v3 cell ${index} is not an object.`);
  }

  const next: Record<string, unknown> = { ...cell, index };

  if (Object.prototype.hasOwnProperty.call(next, 'seaLevel')) {
    delete next.seaLevel;
    context.warnings.push({
      code: 'REMOVED_LEGACY_CELL_SEA_LEVEL',
      path: `cells[${index}].seaLevel`,
      message: 'Removed obsolete per-cell sea level in favor of the canonical world sea level.',
    });
  }

  const defaults: Array<[string, unknown]> = [
    ['editHeightDelta', 0],
    ['simHeightDelta', 0],
    ['isWater', false],
    ['temperature', 0.5],
    ['rainfall', 0.5],
    ['baseBiomeId', 0],
    ['snowCover', 0],
  ];

  for (const [field, value] of defaults) {
    if (!(field in next)) {
      next[field] = value;
      context.assumptions.push({
        code: 'BACKFILLED_KNOWN_V3_CELL_FIELD',
        path: `cells[${index}].${field}`,
        explanation: `Backfilled missing schema-v3 compatibility field ${field}.`,
        confidence: 'HIGH',
      });
    }
  }

  if (!('editBiomeId' in next)) {
    next.editBiomeId = typeof next.baseBiomeId === 'number' ? next.baseBiomeId : 0;
    context.assumptions.push({
      code: 'BACKFILLED_EDIT_BIOME_ID',
      path: `cells[${index}].editBiomeId`,
      explanation: 'Initialized the editable biome layer from the base biome.',
      confidence: 'HIGH',
    });
  }

  return next;
}

export const migrateV3ToV4: WorldMigrationStep<3, 4> = {
  id: 'world-v3-to-v4-causal-scaffold',
  fromVersion: 3,
  toVersion: CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION,
  migrate(input: unknown, context: MigrationContext): unknown {
    if (!isRecord(input)) {
      throw new Error('Schema v3 world is not an object.');
    }
    if (!isRecord(input.metadata)) {
      throw new Error('Schema v3 world metadata is missing or invalid.');
    }
    if (!Array.isArray(input.cells)) {
      throw new Error('Schema v3 world cells are missing or invalid.');
    }

    const worldSeaLevel =
      typeof input.seaLevel === 'number'
        ? input.seaLevel
        : typeof input.metadata.seaLevel === 'number'
          ? input.metadata.seaLevel
          : 0;

    if (typeof input.seaLevel !== 'number') {
      context.assumptions.push({
        code: 'BACKFILLED_WORLD_SEA_LEVEL',
        path: 'seaLevel',
        explanation:
          typeof input.metadata.seaLevel === 'number'
            ? 'Promoted legacy metadata sea level to the canonical world field.'
            : 'No legacy sea level was present; used the historical compatibility default of 0.',
        confidence: typeof input.metadata.seaLevel === 'number' ? 'HIGH' : 'MEDIUM',
      });
    }

    return {
      ...input,
      seaLevel: worldSeaLevel,
      cells: input.cells.map((cell, index) => migrateCell(cell, index, context)),
      metadata: {
        ...input.metadata,
        schemaVersion: CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION,
      },
      causal: createEmptyLegacyCausalScaffold(),
    };
  },
};
