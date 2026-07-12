import type { WorldBrain } from '../worldSchema';
import type { CurrentWorldDocumentSchemaVersion } from '../worldSchema/version';

export type WorldLoadStatus =
  | 'CURRENT'
  | 'MIGRATED_IN_MEMORY'
  | 'UNSUPPORTED_NEWER'
  | 'QUARANTINED';

export interface MigrationAssumption {
  code: string;
  path: string;
  explanation: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface MigrationWarning {
  code: string;
  path?: string;
  message: string;
}

export interface WorldMigrationReport {
  sourceSchemaVersion: unknown;
  decodedSourceVersion: number | null;
  targetSchemaVersion: CurrentWorldDocumentSchemaVersion;
  stepsApplied: string[];
  assumptions: MigrationAssumption[];
  warnings: MigrationWarning[];
  changed: boolean;
  sourceRevisionId?: string;
  sourceContentHash?: string;
}

export type WorldLoadResult =
  | {
      status: 'CURRENT' | 'MIGRATED_IN_MEMORY';
      world: WorldBrain;
      report: WorldMigrationReport;
    }
  | {
      status: 'UNSUPPORTED_NEWER' | 'QUARANTINED';
      raw: unknown;
      report: WorldMigrationReport;
      reason: string;
    };

export interface MigrationContext {
  assumptions: MigrationAssumption[];
  warnings: MigrationWarning[];
}

export interface WorldMigrationStep<FromVersion extends number = number, ToVersion extends number = number> {
  id: string;
  fromVersion: FromVersion;
  toVersion: ToVersion;
  migrate(input: unknown, context: MigrationContext): unknown;
}
