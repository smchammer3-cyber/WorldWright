import type { WorldFeatureFlagDefinition, WorldFeatureFlagKey, WorldFeatureFlagValue } from './types';

const DEFINITIONS: readonly WorldFeatureFlagDefinition[] = [
  define('causal.provenance.enabled', 'boolean', true, 'world-provenance', 'Attach C02 provenance metadata without granting physical authority.', 'C02', false, 'LEGACY'),
  define('causal.stage-hashes.enabled', 'boolean', true, 'world-provenance', 'Allow lazy diagnostic stage hashing.', 'C02', false, 'LEGACY'),
  define('causal.shadow.enabled', 'boolean', false, 'causal-runtime', 'Build future causal state in shadow mode.', 'C02', false, 'CAUSAL_SHADOW'),
  define('causal.active.enabled', 'boolean', false, 'causal-runtime', 'Permit future causal state to control physical output.', 'C02', true, 'CAUSAL_ACTIVE'),
  define('simulation.deterministic-rng.enabled', 'boolean', true, 'world-sim', 'Use persisted deterministic simulation streams.', 'C02', false, 'LEGACY'),
];

const REGISTRY = new Map<WorldFeatureFlagKey, WorldFeatureFlagDefinition>();
for (const definition of DEFINITIONS) {
  if (REGISTRY.has(definition.key)) throw new Error(`Duplicate world feature flag: ${definition.key}`);
  if (typeof definition.defaultValue !== definition.type) {
    throw new Error(`Default type mismatch for world feature flag: ${definition.key}`);
  }
  REGISTRY.set(definition.key, definition);
}

export const WORLD_FEATURE_FLAG_DEFINITIONS = Object.freeze([...DEFINITIONS]);
export const WORLD_FEATURE_FLAG_KEYS = Object.freeze(DEFINITIONS.map((definition) => definition.key));

export function isWorldFeatureFlagKey(value: string): value is WorldFeatureFlagKey {
  return REGISTRY.has(value as WorldFeatureFlagKey);
}

export function getWorldFeatureFlagDefinition(key: WorldFeatureFlagKey): WorldFeatureFlagDefinition {
  const definition = REGISTRY.get(key);
  if (!definition) throw new Error(`Unregistered world feature flag: ${key}`);
  return definition;
}

function define<T extends WorldFeatureFlagValue>(
  key: WorldFeatureFlagKey,
  type: WorldFeatureFlagDefinition<T>['type'],
  defaultValue: T,
  owner: string,
  description: string,
  introducedIn: string,
  affectsPhysicalOutput: boolean,
  minimumAuthorityMode: WorldFeatureFlagDefinition<T>['minimumAuthorityMode'],
): WorldFeatureFlagDefinition<T> {
  return Object.freeze({
    key,
    type,
    defaultValue,
    owner,
    description,
    introducedIn,
    affectsPhysicalOutput,
    minimumAuthorityMode,
    status: 'ACTIVE',
  });
}
