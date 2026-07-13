import type { GeneratorAuthorityMode } from '../causalWorld/schema';
import type { CausalRandomStreamName, RandomStreamDefinition } from './types';

const ALL_MODES: readonly GeneratorAuthorityMode[] = ['LEGACY', 'CAUSAL_SHADOW', 'CAUSAL_ACTIVE'];
const CAUSAL_MODES: readonly GeneratorAuthorityMode[] = ['CAUSAL_SHADOW', 'CAUSAL_ACTIVE'];
const SHADOW_ONLY_MODES: readonly GeneratorAuthorityMode[] = ['CAUSAL_SHADOW'];

const DEFINITIONS: readonly RandomStreamDefinition[] = [
  define('causal.initial-conditions', 1, 'planet-initial-conditions', 'Resolve constraint-aware initial-condition bundles without solved geology.', ['purpose', 'family', 'scope', 'ordinal', 'input'], SHADOW_ONLY_MODES, 'ACTIVE'),
  define('causal.premise', 1, 'planetary-premise', 'Resolve future planetary premise branches.', ['purpose'], CAUSAL_MODES, 'RESERVED'),
  define('causal.interior', 1, 'interior-rheology', 'Resolve future interior and rheology branches.', ['purpose'], CAUSAL_MODES, 'RESERVED'),
  define('causal.regime-history', 1, 'regime-history', 'Resolve future regime epochs and transitions.', ['epoch', 'purpose'], CAUSAL_MODES, 'RESERVED'),
  define('causal.geologic-spine', 1, 'geologic-spine', 'Resolve future large-scale feature identity.', ['feature', 'purpose'], CAUSAL_MODES, 'RESERVED'),
  define('causal.event-graph', 1, 'event-graph', 'Resolve future geological event branches.', ['epoch', 'event-family', 'purpose'], CAUSAL_MODES, 'RESERVED'),
  define('causal.physical-surface', 1, 'physical-surface', 'Resolve future bounded physical-surface variation.', ['feature', 'purpose'], CAUSAL_MODES, 'RESERVED'),
  define('sim.culture-drift', 1, 'world-sim', 'Replayable culture-drift triggers and target selection.', ['branch', 'year', 'tick', 'culture', 'purpose'], ALL_MODES, 'ACTIVE'),
  define('sim.country-expansion', 1, 'world-sim', 'Replayable country-expansion triggers and target selection.', ['branch', 'year', 'tick', 'country', 'purpose'], ALL_MODES, 'ACTIVE'),
  define('sim.event-generation', 1, 'sim-events', 'Replayable event triggers, subtypes, and participants.', ['branch', 'year', 'tick', 'event-family', 'entity', 'purpose'], ALL_MODES, 'ACTIVE'),
];

const REGISTRY = new Map<CausalRandomStreamName, RandomStreamDefinition>();
for (const definition of DEFINITIONS) {
  if (!/^[a-z][a-z0-9]*(?:[.-][a-z0-9]+)*$/.test(definition.name)) {
    throw new Error(`Invalid causal random stream name: ${definition.name}`);
  }
  if (REGISTRY.has(definition.name)) throw new Error(`Duplicate causal random stream: ${definition.name}`);
  if (!Number.isSafeInteger(definition.version) || definition.version < 1) {
    throw new Error(`Invalid version for causal random stream ${definition.name}`);
  }
  REGISTRY.set(definition.name, definition);
}

export const CAUSAL_RANDOM_STREAM_DEFINITIONS = Object.freeze([...DEFINITIONS]);

export function getRandomStreamDefinition(name: CausalRandomStreamName): RandomStreamDefinition {
  const definition = REGISTRY.get(name);
  if (!definition) throw new Error(`Unregistered causal random stream: ${name}`);
  return definition;
}

export function assertRandomStreamAllowed(name: CausalRandomStreamName, mode: GeneratorAuthorityMode): void {
  const definition = getRandomStreamDefinition(name);
  if (!definition.allowedAuthorityModes.includes(mode)) {
    throw new Error(`Random stream ${name} is not allowed in authority mode ${mode}.`);
  }
  if (definition.status === 'DEPRECATED') {
    throw new Error(`Random stream ${name} is deprecated.`);
  }
}

function define(
  name: CausalRandomStreamName,
  version: number,
  owner: string,
  purpose: string,
  scopeSchema: readonly string[],
  allowedAuthorityModes: readonly GeneratorAuthorityMode[],
  status: RandomStreamDefinition['status'],
): RandomStreamDefinition {
  return Object.freeze({ name, version, owner, purpose, scopeSchema: Object.freeze([...scopeSchema]), allowedAuthorityModes: Object.freeze([...allowedAuthorityModes]), status });
}
