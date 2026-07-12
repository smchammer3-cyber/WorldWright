import { isCausalWorldScaffoldV1 } from '../causalWorld/schema';
import { cloneStructuredValue } from '../worldCloning';
import type { WorldBrain } from '../worldSchema';
import {
  CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION,
  decodeWorldDocumentSchemaVersion,
} from '../worldSchema/version';
import { resolveWorldMigrationPath } from './registry';
import type {
  MigrationAssumption,
  MigrationContext,
  MigrationWarning,
  WorldLoadResult,
  WorldMigrationReport,
} from './types';

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function getMetadata(raw: unknown): Record<string, unknown> | null {
  if (!isRecord(raw) || !isRecord(raw.metadata)) return null;
  return raw.metadata;
}

function looksLikeV3World(raw: unknown): boolean {
  if (!isRecord(raw) || !isRecord(raw.metadata)) return false;

  return (
    typeof raw.gridWidth === 'number' &&
    typeof raw.gridHeight === 'number' &&
    Array.isArray(raw.cells) &&
    typeof raw.metadata.id === 'string' &&
    typeof raw.metadata.seed === 'string' &&
    (raw.cells.length === 0 ||
      (isRecord(raw.cells[0]) &&
        typeof raw.cells[0].baseHeight === 'number' &&
        'plateId' in raw.cells[0]))
  );
}

function classifyUnversionedWorld(raw: unknown, assumptions: MigrationAssumption[]): 3 | null {
  if (!looksLikeV3World(raw)) return null;

  assumptions.push({
    code: 'CLASSIFIED_UNVERSIONED_V3_WORLD',
    path: 'metadata.schemaVersion',
    explanation:
      'The document had no schema version but matched the current pre-C01 WorldBrain structure, so it was classified as schema v3.',
    confidence: 'MEDIUM',
  });

  return 3;
}

function validateCurrentWorldDocument(value: unknown): string[] {
  const errors: string[] = [];
  if (!isRecord(value)) return ['World document is not an object.'];
  if (!isRecord(value.metadata)) return ['World metadata is missing or invalid.'];

  if (value.metadata.schemaVersion !== CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION) {
    errors.push(`World metadata schemaVersion is not ${CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION}.`);
  }
  if (typeof value.metadata.id !== 'string' || value.metadata.id.length === 0) {
    errors.push('World metadata.id is missing or invalid.');
  }
  if (typeof value.metadata.seed !== 'string') {
    errors.push('World metadata.seed is missing or invalid.');
  }
  if (!Number.isInteger(value.gridWidth) || (value.gridWidth as number) <= 0) {
    errors.push('World gridWidth is missing or invalid.');
  }
  if (!Number.isInteger(value.gridHeight) || (value.gridHeight as number) <= 0) {
    errors.push('World gridHeight is missing or invalid.');
  }
  if (typeof value.seaLevel !== 'number' || !Number.isFinite(value.seaLevel)) {
    errors.push('World seaLevel is missing or invalid.');
  }
  if (!Array.isArray(value.cells)) {
    errors.push('World cells are missing or invalid.');
  } else if (Number.isInteger(value.gridWidth) && Number.isInteger(value.gridHeight)) {
    const expected = (value.gridWidth as number) * (value.gridHeight as number);
    if (value.cells.length !== expected) {
      errors.push(`World cell count ${value.cells.length} does not match expected grid size ${expected}.`);
    }
  }

  for (const field of ['plates', 'rivers', 'countries', 'cultures', 'cultureRegions', 'cities']) {
    if (!Array.isArray(value[field])) errors.push(`World ${field} collection is missing or invalid.`);
  }

  if (!isCausalWorldScaffoldV1(value.causal)) {
    errors.push('World causal scaffold is missing or invalid.');
  }

  return errors;
}

function createReport(
  raw: unknown,
  sourceSchemaVersion: unknown,
  decodedSourceVersion: number | null,
  assumptions: MigrationAssumption[],
  warnings: MigrationWarning[]
): WorldMigrationReport {
  const metadata = getMetadata(raw);
  return {
    sourceSchemaVersion,
    decodedSourceVersion,
    targetSchemaVersion: CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION,
    stepsApplied: [],
    assumptions,
    warnings,
    changed: false,
    sourceRevisionId:
      metadata && typeof metadata.revisionId === 'string' ? metadata.revisionId : undefined,
    sourceContentHash:
      metadata && typeof metadata.contentHash === 'string' ? metadata.contentHash : undefined,
  };
}

export function migrateWorldDocument(raw: unknown): WorldLoadResult {
  const assumptions: MigrationAssumption[] = [];
  const warnings: MigrationWarning[] = [];
  const metadata = getMetadata(raw);
  const sourceVersionValue = metadata?.schemaVersion;
  const decoded = decodeWorldDocumentSchemaVersion(sourceVersionValue);

  let sourceVersion: number | null = null;
  if (decoded.kind === 'KNOWN') sourceVersion = decoded.version;
  if (decoded.kind === 'UNVERSIONED') {
    sourceVersion = classifyUnversionedWorld(raw, assumptions);
  }

  // Some transitional current-shaped WorldBrain documents and older tests used
  // the string "1.0" despite not matching the archived numeric schema-1 shape.
  // Reclassify only when the document structurally matches v3. Genuine numeric
  // schema 1 remains quarantined until a dedicated evidence-backed path exists.
  if (sourceVersion === 1 && sourceVersionValue === '1.0' && looksLikeV3World(raw)) {
    sourceVersion = 3;
    assumptions.push({
      code: 'RECLASSIFIED_STRING_1_0_AS_V3_COMPAT',
      path: 'metadata.schemaVersion',
      explanation:
        'The string schema label 1.0 was attached to a current-shaped WorldBrain document, so the document was treated as schema v3. Numeric schema 1 remains unsupported.',
      confidence: 'MEDIUM',
    });
  }

  const report = createReport(raw, sourceVersionValue, sourceVersion, assumptions, warnings);

  if (decoded.kind === 'UNSUPPORTED_NEWER') {
    return {
      status: 'UNSUPPORTED_NEWER',
      raw,
      report: { ...report, decodedSourceVersion: decoded.version },
      reason: `World schema ${decoded.version} is newer than supported schema ${CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION}.`,
    };
  }

  if (decoded.kind === 'UNRECOGNIZED' || sourceVersion === null) {
    return {
      status: 'QUARANTINED',
      raw,
      report,
      reason: 'World schema version is missing or unrecognized and the document does not match a supported legacy structure.',
    };
  }

  let candidate: unknown;
  try {
    candidate = cloneStructuredValue(raw);
  } catch (error) {
    return {
      status: 'QUARANTINED',
      raw,
      report,
      reason: error instanceof Error ? error.message : 'World document could not be cloned safely.',
    };
  }

  if (sourceVersion === CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION) {
    const errors = validateCurrentWorldDocument(candidate);
    if (errors.length > 0) {
      return {
        status: 'QUARANTINED',
        raw,
        report,
        reason: errors.join(' '),
      };
    }

    return {
      status: 'CURRENT',
      world: candidate as WorldBrain,
      report,
    };
  }

  let path;
  try {
    path = resolveWorldMigrationPath(sourceVersion);
  } catch (error) {
    return {
      status: 'QUARANTINED',
      raw,
      report,
      reason: error instanceof Error ? error.message : 'No validated migration path exists.',
    };
  }

  const context: MigrationContext = { assumptions, warnings };
  try {
    for (const step of path) {
      candidate = step.migrate(candidate, context);
      report.stepsApplied.push(step.id);
    }
  } catch (error) {
    return {
      status: 'QUARANTINED',
      raw,
      report,
      reason: error instanceof Error ? error.message : 'World migration failed.',
    };
  }

  const errors = validateCurrentWorldDocument(candidate);
  if (errors.length > 0) {
    return {
      status: 'QUARANTINED',
      raw,
      report,
      reason: errors.join(' '),
    };
  }

  report.changed = true;
  return {
    status: 'MIGRATED_IN_MEMORY',
    world: candidate as WorldBrain,
    report,
  };
}

export { validateCurrentWorldDocument };
