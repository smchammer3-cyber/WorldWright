import { canonicalJsonStringify } from '../worldProvenance/canonicalJson';
import type { CausalBranchValue } from './types';

export function validateCausalBranchValue(value: unknown): asserts value is CausalBranchValue {
  canonicalJsonStringify(value);
}

export function cloneAndDeepFreezeCausalValue<T extends CausalBranchValue>(value: T): T {
  validateCausalBranchValue(value);
  return deepFreeze(structuredClone(value));
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    for (const nested of Object.values(value as Record<string, unknown>)) deepFreeze(nested);
    Object.freeze(value);
  }
  return value;
}
