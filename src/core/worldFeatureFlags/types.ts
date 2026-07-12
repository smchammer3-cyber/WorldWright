import type { GeneratorAuthorityMode } from '../causalWorld/schema';

export type WorldFeatureFlagKey =
  | 'causal.provenance.enabled'
  | 'causal.stage-hashes.enabled'
  | 'causal.shadow.enabled'
  | 'causal.active.enabled'
  | 'simulation.deterministic-rng.enabled';

export type WorldFeatureFlagValue = boolean | string | number;

export interface WorldFeatureFlagDefinition<T extends WorldFeatureFlagValue = WorldFeatureFlagValue> {
  readonly key: WorldFeatureFlagKey;
  readonly type: 'boolean' | 'string' | 'number';
  readonly defaultValue: T;
  readonly owner: string;
  readonly description: string;
  readonly introducedIn: string;
  readonly affectsPhysicalOutput: boolean;
  readonly minimumAuthorityMode: GeneratorAuthorityMode;
  readonly status: 'ACTIVE' | 'DEPRECATED' | 'RETIRED';
}

export interface ResolvedWorldFeatureFlag<T extends WorldFeatureFlagValue = WorldFeatureFlagValue> {
  readonly key: WorldFeatureFlagKey;
  readonly value: T;
  readonly defaultValue: T;
  readonly source: 'DEFAULT' | 'RUN_OVERRIDE' | 'AUTHORITY_CONSTRAINT';
  readonly reason: 'DEFAULTED' | 'OVERRIDDEN' | 'MODE_BLOCKED' | 'INVALID_OVERRIDE';
  readonly affectsPhysicalOutput: boolean;
}

export interface ResolvedWorldFeatureFlagSnapshot {
  readonly schemaVersion: 1;
  readonly authorityMode: GeneratorAuthorityMode;
  readonly values: Readonly<Record<WorldFeatureFlagKey, ResolvedWorldFeatureFlag>>;
  readonly warnings: readonly string[];
}

export type WorldFeatureFlagOverrides = Readonly<Record<string, unknown>>;
