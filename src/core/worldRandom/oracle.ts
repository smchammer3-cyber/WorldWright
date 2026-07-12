import type { GeneratorAuthorityMode } from '../causalWorld/schema';
import { philox4x32_10, type Philox4x32Counter } from './philox4x32';
import { derivePhiloxKey, encodeFields, fnv1a64, createRootSeedIdentity } from './seedMixer';
import { assertRandomStreamAllowed, getRandomStreamDefinition } from './streamRegistry';
import {
  type CausalRandomStreamName,
  type RandomAddress,
  type RandomScopePart,
  type RootSeedIdentity,
  type SequentialRandomCursor,
  type SequentialRandomStream,
  type WorldRandomOracle,
  WorldRandomContractError,
} from './types';

const UINT32_SIZE = 0x1_0000_0000;

export interface CreateWorldRandomOracleOptions {
  readonly branchSalt?: string;
  readonly authorityMode?: GeneratorAuthorityMode;
}

export function createWorldRandomOracle(
  seed: string | number | RootSeedIdentity,
  options: CreateWorldRandomOracleOptions = {},
): WorldRandomOracle {
  const rootSeed = isRootSeedIdentity(seed) ? seed : createRootSeedIdentity(seed);
  const branchSalt = options.branchSalt;
  const authorityMode = options.authorityMode ?? 'LEGACY';

  const sampleUint32 = (address: RandomAddress, lane: 0 | 1 | 2 | 3 = 0, attempt = 0): number => {
    validateAddress(address);
    assertRandomStreamAllowed(address.stream, authorityMode);
    const definition = getRandomStreamDefinition(address.stream);
    const key = derivePhiloxKey(rootSeed, address.stream, definition.version, branchSalt);
    const counter = counterForAddress(address, attempt);
    return philox4x32_10(counter, key)[lane] >>> 0;
  };

  const oracle: WorldRandomOracle = {
    rootSeed,
    branchSalt,
    uint32(address, lane = 0) {
      return sampleUint32(address, lane);
    },
    float01(address, lane = 0) {
      return sampleUint32(address, lane) / UINT32_SIZE;
    },
    boolean(address, probability) {
      if (!Number.isFinite(probability) || probability < 0 || probability > 1) {
        throw new RangeError('Probability must be within [0, 1].');
      }
      if (probability === 0) return false;
      if (probability === 1) return true;
      return sampleUint32(address, 0) / UINT32_SIZE < probability;
    },
    integer(address, minInclusive, maxExclusive) {
      if (!Number.isSafeInteger(minInclusive) || !Number.isSafeInteger(maxExclusive)) {
        throw new RangeError('Integer bounds must be safe integers.');
      }
      const range = maxExclusive - minInclusive;
      if (range <= 0 || range > UINT32_SIZE) {
        throw new RangeError('Integer range must be within 1..2^32.');
      }
      const acceptanceLimit = Math.floor(UINT32_SIZE / range) * range;
      for (let attempt = 0; attempt < 4096; attempt += 1) {
        const value = sampleUint32(address, (attempt & 3) as 0 | 1 | 2 | 3, Math.floor(attempt / 4));
        if (value < acceptanceLimit) return minInclusive + (value % range);
      }
      throw new Error('Unbiased integer rejection sampling exceeded its bounded attempt limit.');
    },
    pick<T>(address: RandomAddress, values: readonly T[]): T {
      if (values.length === 0) throw new RangeError('Cannot pick from an empty collection.');
      return values[this.integer(address, 0, values.length)];
    },
    sequential(stream, scope, startIndex = 0) {
      return createSequentialRandomStream(oracle, stream, scope, startIndex);
    },
  };

  return Object.freeze(oracle);
}

export function createSequentialRandomStream(
  oracle: WorldRandomOracle,
  stream: CausalRandomStreamName,
  scope: readonly RandomScopePart[],
  startIndex = 0,
): SequentialRandomStream {
  if (!Number.isSafeInteger(startIndex) || startIndex < 0) {
    throw new RangeError('Sequential random start index must be a non-negative safe integer.');
  }
  const stableScope = Object.freeze([...scope]);
  encodeRandomScope(stableScope);
  let nextIndex = startIndex;
  return {
    stream,
    scope: stableScope,
    get nextIndex() {
      return nextIndex;
    },
    nextUint32() {
      const value = oracle.uint32({ stream, scope: stableScope, draw: nextIndex });
      nextIndex += 1;
      return value;
    },
    nextFloat01() {
      const value = oracle.float01({ stream, scope: stableScope, draw: nextIndex });
      nextIndex += 1;
      return value;
    },
    snapshot(): SequentialRandomCursor {
      return Object.freeze({ schemaVersion: 1, stream, scope: stableScope, nextIndex });
    },
  };
}

export function restoreSequentialRandomStream(
  oracle: WorldRandomOracle,
  cursor: SequentialRandomCursor,
): SequentialRandomStream {
  if (cursor.schemaVersion !== 1) throw new Error(`Unsupported sequential random cursor schema: ${cursor.schemaVersion}`);
  return createSequentialRandomStream(oracle, cursor.stream, cursor.scope, cursor.nextIndex);
}

export function encodeRandomScope(scope: readonly RandomScopePart[]): Uint8Array {
  if (!Array.isArray(scope)) throw new WorldRandomContractError('Random scope must be an array', 'scope');
  return encodeFields(scope.map((part, index) => encodePart(part, `scope[${index}]`)));
}

function counterForAddress(address: RandomAddress, attempt: number): Philox4x32Counter {
  const scopeBytes = encodeRandomScope(address.scope);
  const draw = encodePart(address.draw, 'draw');
  const base = encodeFields([
    'WorldWright/random-address/v1',
    address.stream,
    bytesToHex(scopeBytes),
    draw,
    String(attempt),
  ]);
  const first = fnv1a64(base);
  const second = fnv1a64(encodeFields(['WorldWright/random-address/v1/second', bytesToHex(base)]));
  return [
    Number(first & 0xffffffffn) >>> 0,
    Number((first >> 32n) & 0xffffffffn) >>> 0,
    Number(second & 0xffffffffn) >>> 0,
    Number((second >> 32n) & 0xffffffffn) >>> 0,
  ];
}

function encodePart(part: RandomScopePart, path: string): string {
  if (typeof part === 'string') return `s:${part.length}:${part}`;
  if (typeof part === 'number') {
    if (!Number.isSafeInteger(part)) {
      throw new WorldRandomContractError('Random numeric scope part must be a safe integer', path);
    }
    return `n:${Object.is(part, -0) ? '-0' : String(part)}`;
  }
  throw new WorldRandomContractError('Random scope part must be a stable string or safe integer', path);
}

function validateAddress(address: RandomAddress): void {
  if (!address || typeof address !== 'object') throw new WorldRandomContractError('Random address must be an object', 'address');
  getRandomStreamDefinition(address.stream);
  encodeRandomScope(address.scope);
  encodePart(address.draw, 'draw');
}

function isRootSeedIdentity(value: unknown): value is RootSeedIdentity {
  return Boolean(value && typeof value === 'object' && typeof (value as RootSeedIdentity).exactText === 'string' && (value as RootSeedIdentity).encoding === 'utf8-v1' && typeof (value as RootSeedIdentity).fingerprint === 'string');
}

function bytesToHex(bytes: Uint8Array): string {
  let output = '';
  for (const byte of bytes) output += byte.toString(16).padStart(2, '0');
  return output;
}
