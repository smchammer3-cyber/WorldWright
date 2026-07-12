import type { GeneratorAuthorityMode } from '../causalWorld/schema';
import {
  WORLD_FEATURE_FLAG_DEFINITIONS,
  getWorldFeatureFlagDefinition,
  isWorldFeatureFlagKey,
} from './registry';
import type {
  ResolvedWorldFeatureFlag,
  ResolvedWorldFeatureFlagSnapshot,
  WorldFeatureFlagKey,
  WorldFeatureFlagOverrides,
  WorldFeatureFlagValue,
} from './types';

const MODE_RANK: Record<GeneratorAuthorityMode, number> = {
  LEGACY: 0,
  CAUSAL_SHADOW: 1,
  CAUSAL_ACTIVE: 2,
};

export function resolveWorldFeatureFlags(
  authorityMode: GeneratorAuthorityMode,
  overrides: WorldFeatureFlagOverrides = {},
): ResolvedWorldFeatureFlagSnapshot {
  const warnings: string[] = [];
  for (const key of Object.keys(overrides).sort()) {
    if (!isWorldFeatureFlagKey(key)) warnings.push(`Unknown world feature flag ignored: ${key}`);
  }

  const values = {} as Record<WorldFeatureFlagKey, ResolvedWorldFeatureFlag>;
  for (const definition of WORLD_FEATURE_FLAG_DEFINITIONS) {
    const hasOverride = Object.prototype.hasOwnProperty.call(overrides, definition.key);
    const override = overrides[definition.key];
    const typeValid = hasOverride && typeof override === definition.type;
    let value: WorldFeatureFlagValue = definition.defaultValue;
    let source: ResolvedWorldFeatureFlag['source'] = 'DEFAULT';
    let reason: ResolvedWorldFeatureFlag['reason'] = 'DEFAULTED';

    if (hasOverride && !typeValid) {
      warnings.push(`Invalid override for ${definition.key}; expected ${definition.type}.`);
      reason = 'INVALID_OVERRIDE';
    } else if (typeValid) {
      value = override as WorldFeatureFlagValue;
      source = 'RUN_OVERRIDE';
      reason = 'OVERRIDDEN';
    }

    const modeBlocked = MODE_RANK[authorityMode] < MODE_RANK[definition.minimumAuthorityMode];
    if (modeBlocked || definition.status === 'RETIRED') {
      value = typeof definition.defaultValue === 'boolean' ? false : definition.defaultValue;
      source = 'AUTHORITY_CONSTRAINT';
      reason = 'MODE_BLOCKED';
    }

    values[definition.key] = Object.freeze({
      key: definition.key,
      value,
      defaultValue: definition.defaultValue,
      source,
      reason,
      affectsPhysicalOutput: definition.affectsPhysicalOutput,
    });
  }

  return Object.freeze({
    schemaVersion: 1,
    authorityMode,
    values: Object.freeze(values),
    warnings: Object.freeze(warnings),
  });
}

export function worldFeatureFlagValue<T extends WorldFeatureFlagValue>(
  snapshot: ResolvedWorldFeatureFlagSnapshot,
  key: WorldFeatureFlagKey,
): T {
  getWorldFeatureFlagDefinition(key);
  return snapshot.values[key].value as T;
}
