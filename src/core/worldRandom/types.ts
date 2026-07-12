import type { GeneratorAuthorityMode } from '../causalWorld/schema';

export const CAUSAL_RNG_ALGORITHM = 'philox4x32-10' as const;
export const CAUSAL_RNG_VERSION = 1 as const;
export const ROOT_SEED_ENCODING = 'utf8-v1' as const;
export const RANDOM_DERIVATION_VERSION = 1 as const;

export type RandomScopePart = string | number;

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

export interface RootSeedIdentity {
  readonly exactText: string;
  readonly encoding: typeof ROOT_SEED_ENCODING;
  readonly fingerprint: string;
}

export interface RandomStreamDefinition {
  readonly name: CausalRandomStreamName;
  readonly version: number;
  readonly owner: string;
  readonly purpose: string;
  readonly scopeSchema: readonly string[];
  readonly allowedAuthorityModes: readonly GeneratorAuthorityMode[];
  readonly status: 'ACTIVE' | 'RESERVED' | 'DEPRECATED';
}

export interface RandomAddress {
  readonly stream: CausalRandomStreamName;
  readonly scope: readonly RandomScopePart[];
  readonly draw: string | number;
}

export interface WorldRandomOracle {
  readonly rootSeed: RootSeedIdentity;
  readonly branchSalt?: string;
  uint32(address: RandomAddress, lane?: 0 | 1 | 2 | 3): number;
  float01(address: RandomAddress, lane?: 0 | 1 | 2 | 3): number;
  boolean(address: RandomAddress, probability: number): boolean;
  integer(address: RandomAddress, minInclusive: number, maxExclusive: number): number;
  pick<T>(address: RandomAddress, values: readonly T[]): T;
  sequential(stream: CausalRandomStreamName, scope: readonly RandomScopePart[], startIndex?: number): SequentialRandomStream;
}

export interface SequentialRandomCursor {
  readonly schemaVersion: 1;
  readonly stream: CausalRandomStreamName;
  readonly scope: readonly RandomScopePart[];
  readonly nextIndex: number;
}

export interface SequentialRandomStream {
  readonly stream: CausalRandomStreamName;
  readonly scope: readonly RandomScopePart[];
  readonly nextIndex: number;
  nextUint32(): number;
  nextFloat01(): number;
  snapshot(): SequentialRandomCursor;
}

export class WorldRandomContractError extends Error {
  constructor(message: string, readonly path: string) {
    super(`${message} at ${path}`);
    this.name = 'WorldRandomContractError';
  }
}
