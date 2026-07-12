import type { GeneratorAuthorityMode } from '../causalWorld/schema';

export type AuthorityRepresentation =
  | 'persistent-record'
  | 'graph-network'
  | 'continuous-field'
  | 'layered-material'
  | 'event-history'
  | 'derived-cache'
  | 'diagnostic-only'
  | 'presentation-only';

export type AuthorityLifecycle =
  | 'input'
  | 'cause'
  | 'material'
  | 'terrain'
  | 'derived'
  | 'worldbuilding'
  | 'diagnostic'
  | 'presentation'
  | 'operational';

export type AuthorityFieldGroup =
  | 'metadata'
  | 'planetInput'
  | 'terrain'
  | 'derivedSurface'
  | 'plateCause'
  | 'skeletonCause'
  | 'crustCause'
  | 'featureCause'
  | 'climateDerived'
  | 'biomeDerived'
  | 'hydrologyDerived'
  | 'worldCollections'
  | 'worldbuilding'
  | 'causalRecord'
  | 'diagnostics'
  | 'presentation';

export type AuthorityProcessPhase =
  | 'source'
  | 'cause-seed'
  | 'feature-material'
  | 'terrain-shape'
  | 'derived-recompute'
  | 'terrain-cleanup'
  | 'final-cause-sync'
  | 'causal-input'
  | 'causal-resolution'
  | 'edit'
  | 'simulation'
  | 'diagnostic'
  | 'render';

export interface AuthorityFieldDefinition {
  readonly id: string;
  readonly group: AuthorityFieldGroup;
  readonly representation: AuthorityRepresentation;
  readonly lifecycle: AuthorityLifecycle;
  readonly owner: string;
  readonly canonical: boolean;
  readonly persisted: boolean;
  readonly hashed: boolean;
  readonly scaleOwner: 'planet' | 'grid-cell' | 'feature' | 'network' | 'record';
  readonly legalReaders: readonly string[];
  readonly legalWriters: readonly string[];
  readonly notes: readonly string[];
}

export interface AuthorityProcessDefinition {
  readonly id: string;
  readonly version: number;
  readonly owner: string;
  readonly phase: AuthorityProcessPhase;
  readonly reads: readonly AuthorityFieldGroup[];
  readonly writes: readonly AuthorityFieldGroup[];
  readonly forbiddenWrites: readonly AuthorityFieldGroup[];
  readonly prerequisites: readonly string[];
  readonly modes: readonly GeneratorAuthorityMode[];
  readonly terminal: boolean;
  readonly legacyException?: string;
  readonly invariants: readonly string[];
}

export interface AuthorityFieldMutation {
  readonly group: AuthorityFieldGroup;
  readonly fields: readonly string[];
}

export interface AuthorityAuditResult {
  readonly processId: string;
  readonly processVersion: number;
  readonly writes: readonly AuthorityFieldMutation[];
  readonly illegalWrites: readonly AuthorityFieldMutation[];
  readonly passed: boolean;
}

export class AuthorityViolationError extends Error {
  constructor(
    readonly processId: string,
    readonly violations: readonly AuthorityFieldMutation[],
  ) {
    super(
      `Authority violation in ${processId}: ${violations
        .map((violation) => `${violation.group} [${violation.fields.join(', ')}]`)
        .join('; ')}`,
    );
    this.name = 'AuthorityViolationError';
  }
}
