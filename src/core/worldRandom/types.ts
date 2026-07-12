import type { GeneratorAuthorityMode } from '../causalWorld/schema';

export const CAUSAL_RNG_ALGORITHM = 'philox4x32-10' as const;
export const CAUSAL_RNG_VERSION = 1 as const;
export const CAUSAL_SEED_ENCODING = 'utf8-v1' as const;

export type CausalRandomStreamName =
  | 'causal.premise'
  | 'causal.interior'
  | 'causal.regime-history'
  | 'causal.geologic-spine'
  | 'causal.event-graph'
  | 'causal.physical-surface'
  | 'sim.culture-drift'
  | 'sim.country-expansion'
  | 'sim.event-generation';

export type RandomScopePart = string | number;

export interface RootSeedIdentity {
  exactText: string;
  encoding: typeof CAUSAL_SEED_ENCODING;
  fingerprint: string;
}

export interface RandomStreamDefinition {
  name: CausalRandomStreamName;
  version: number;
  owner: string;
  purpose: string;
  scopeSchema: readonly string[];
  allowedAuthorityModes: readonly GeneratorAuthorityMode[];
  status: 'ACTIVE' | 'RESERVED' | 'DEPRECATED';
}

export interface RandomAddress {
  stream: CausalRandomStreamName;
  scope: readonly RandomScopePart[];
  draw: string | number;
}

export interface SequentialRandomCursor {
  stream: CausalRandomStreamName;
  scope: readonly RandomScopePart[];
  nextIndex: number;
}

export interface SequentialRandomStream {
  readonly stream: CausalRandomStreamName;
  readonly scope: readonly RandomScopePart[];
  readonly nextIndex: number;
  nextUint32(): number;
  nextFloat01(): number;
  snapshot(): SequentialRandomCursor;
}

export interface WorldRandomOracle {
  uint32(address: RandomAddress, lane?: 0 | 1 | 2 | 3): number;
  float01(address: RandomAddress, lane?: 0 | 1 | 2 | 3): number;
  boolean(address: RandomAddress, probability: number): boolean;
  integer(address: RandomAddress, minInclusive: number, maxExclusive: number): number;
  pick<T>(address: RandomAddress, values: readonly T[]): T;
  sequential(stream: CausalRandomStreamName, scope: readonly RandomScopePart[]): SequentialRandomStream;
}
