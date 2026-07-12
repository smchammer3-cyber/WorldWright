import { hashCanonicalJson } from '../worldProvenance/hash';
import { createWorldRandomOracle } from '../worldRandom/oracle';
import type { WorldRandomOracle } from '../worldRandom/types';

export interface SimRandomContextV1 {
  readonly schemaVersion: 1;
  readonly rootWorldSeed: string;
  readonly branchSalt: string;
  readonly rngAlgorithm: 'philox4x32-10';
  readonly rngVersion: 1;
  readonly seedDerivationVersion: 1;
  readonly tickIndex: number;
}

export function createSimRandomContext(
  rootWorldSeed: string | number,
  branchSalt: string,
  tickIndex = 0,
): SimRandomContextV1 {
  if (!branchSalt) throw new Error('Simulation random context requires a persisted branch salt.');
  if (!Number.isSafeInteger(tickIndex) || tickIndex < 0) throw new RangeError('Simulation tick index must be a non-negative safe integer.');
  return Object.freeze({
    schemaVersion: 1,
    rootWorldSeed: String(rootWorldSeed),
    branchSalt,
    rngAlgorithm: 'philox4x32-10',
    rngVersion: 1,
    seedDerivationVersion: 1,
    tickIndex,
  });
}

export function deriveLegacySimBranchSalt(input: {
  readonly baseWorldId: string;
  readonly baseRevisionId: string;
  readonly branchId: string;
  readonly createdAt: string;
}): string {
  return `compat-${hashCanonicalJson({
    contract: 'WorldWright/sim-branch-compat-salt/v1',
    baseWorldId: input.baseWorldId,
    baseRevisionId: input.baseRevisionId,
    branchId: input.branchId,
    createdAt: input.createdAt,
  }).value}`;
}

export function createSimRandomOracle(context: SimRandomContextV1): WorldRandomOracle {
  validateSimRandomContext(context);
  return createWorldRandomOracle(context.rootWorldSeed, {
    branchSalt: context.branchSalt,
    authorityMode: 'LEGACY',
  });
}

export function advanceSimRandomContext(context: SimRandomContextV1): SimRandomContextV1 {
  validateSimRandomContext(context);
  return createSimRandomContext(context.rootWorldSeed, context.branchSalt, context.tickIndex + 1);
}

export function validateSimRandomContext(value: unknown): asserts value is SimRandomContextV1 {
  if (!value || typeof value !== 'object') throw new Error('Simulation random context is missing.');
  const candidate = value as Partial<SimRandomContextV1>;
  if (candidate.schemaVersion !== 1
    || typeof candidate.rootWorldSeed !== 'string'
    || typeof candidate.branchSalt !== 'string'
    || candidate.branchSalt.length === 0
    || candidate.rngAlgorithm !== 'philox4x32-10'
    || candidate.rngVersion !== 1
    || candidate.seedDerivationVersion !== 1
    || !Number.isSafeInteger(candidate.tickIndex)
    || (candidate.tickIndex ?? -1) < 0) {
    throw new Error('Simulation random context is invalid or unsupported.');
  }
}
