import { CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION } from '../worldSchema/version';
import type { WorldMigrationStep } from './types';
import { migrateV3ToV4 } from './steps/v3ToV4';

export const WORLD_MIGRATION_STEPS: readonly WorldMigrationStep[] = [migrateV3ToV4];

function validateRegistry(steps: readonly WorldMigrationStep[]): void {
  const seenFrom = new Set<number>();

  for (const step of steps) {
    if (!Number.isInteger(step.fromVersion) || !Number.isInteger(step.toVersion)) {
      throw new Error(`Migration step ${step.id} has a non-integer version.`);
    }
    if (step.toVersion <= step.fromVersion) {
      throw new Error(`Migration step ${step.id} must advance the schema version.`);
    }
    if (seenFrom.has(step.fromVersion)) {
      throw new Error(`Multiple migration steps start from schema ${step.fromVersion}.`);
    }
    seenFrom.add(step.fromVersion);
  }
}

validateRegistry(WORLD_MIGRATION_STEPS);

export function resolveWorldMigrationPath(
  fromVersion: number,
  toVersion: number = CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION
): WorldMigrationStep[] {
  if (fromVersion === toVersion) return [];
  if (fromVersion > toVersion) {
    throw new Error(`World schema ${fromVersion} cannot be migrated backward to ${toVersion}.`);
  }

  const byFrom = new Map(WORLD_MIGRATION_STEPS.map((step) => [step.fromVersion, step]));
  const path: WorldMigrationStep[] = [];
  const visited = new Set<number>();
  let current = fromVersion;

  while (current < toVersion) {
    if (visited.has(current)) {
      throw new Error(`World migration registry contains a cycle at schema ${current}.`);
    }
    visited.add(current);

    const step = byFrom.get(current);
    if (!step) {
      throw new Error(`No validated migration path exists from world schema ${current} to ${toVersion}.`);
    }
    if (step.toVersion > toVersion) {
      throw new Error(
        `Migration step ${step.id} overshoots requested schema ${toVersion} with target ${step.toVersion}.`
      );
    }

    path.push(step);
    current = step.toVersion;
  }

  if (current !== toVersion) {
    throw new Error(`World migration path ended at schema ${current}, not ${toVersion}.`);
  }

  return path;
}
