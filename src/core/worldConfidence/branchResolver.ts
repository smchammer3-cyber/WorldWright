import { cloneAndDeepFreezeCausalValue, validateCausalBranchValue } from './immutable';
import type { CausalBranchValue, ResolveWeightedBranchRequest, WeightedBranchResolutionV1 } from './types';

export function resolveWeightedBranch<T extends CausalBranchValue>(
  request: ResolveWeightedBranchRequest<T>,
): WeightedBranchResolutionV1<T> {
  if (!request || typeof request !== 'object') throw new Error('Weighted branch request is required.');
  assertNonEmpty(request.branchId, 'Branch ID');
  if (!request.oracle || typeof request.oracle.float01 !== 'function') throw new Error('Weighted branch requires a random oracle.');
  validateScope(request.scope);
  if (!Array.isArray(request.options) || request.options.length === 0) throw new Error('Weighted branch requires at least one option.');

  const seen = new Set<string>();
  const sorted = [...request.options].sort((a, b) => compareStableText(a.id, b.id));
  let totalWeight = 0;
  for (const option of sorted) {
    assertNonEmpty(option.id, 'Option ID');
    if (seen.has(option.id)) throw new Error(`Duplicate weighted branch option ID: ${option.id}`);
    seen.add(option.id);
    if (!Number.isFinite(option.weight) || option.weight < 0) throw new RangeError(`Option ${option.id} weight must be finite and non-negative.`);
    assertUniqueNonEmptyStrings(option.evidenceIds, `Option ${option.id} evidence IDs`);
    if (option.rationale !== undefined && (typeof option.rationale !== 'string' || option.rationale.trim().length === 0)) {
      throw new Error(`Option ${option.id} rationale must be non-empty text when present.`);
    }
    validateCausalBranchValue(option.value);
    totalWeight += option.weight;
  }
  if (!Number.isFinite(totalWeight) || totalWeight <= 0) throw new RangeError('Weighted branch total weight must be positive.');

  const stableScope = Object.freeze([...request.scope, request.branchId, 'weighted-branch-v1']);
  const randomUnit = request.oracle.float01({
    stream: request.stream,
    scope: stableScope,
    draw: 'selection',
  });
  if (!Number.isFinite(randomUnit) || randomUnit < 0 || randomUnit >= 1) {
    throw new Error('Random oracle returned a value outside [0, 1).');
  }

  const target = randomUnit * totalWeight;
  let cumulative = 0;
  let chosen = sorted[sorted.length - 1];
  for (const option of sorted) {
    cumulative += option.weight;
    if (target < cumulative) {
      chosen = option;
      break;
    }
  }

  const normalizedWeights = Object.freeze(sorted.map((option) => Object.freeze({
    optionId: option.id,
    probability: option.weight / totalWeight,
  })));
  const evidenceIds = Object.freeze([...new Set<string>(chosen.evidenceIds)].sort(compareStableText));

  return Object.freeze({
    schemaVersion: 1,
    branchId: request.branchId,
    stream: request.stream,
    scope: stableScope,
    draw: 'selection',
    randomUnit,
    totalWeight,
    normalizedWeights,
    chosenOptionId: chosen.id,
    chosenValue: cloneAndDeepFreezeCausalValue(chosen.value),
    evidenceIds,
  });
}

function validateScope(scope: readonly unknown[]): void {
  if (!Array.isArray(scope)) throw new Error('Branch scope must be an array.');
  for (let index = 0; index < scope.length; index += 1) {
    const part = scope[index];
    if (typeof part === 'string') continue;
    if (typeof part === 'number' && Number.isSafeInteger(part)) continue;
    throw new Error(`Branch scope part ${index} must be a stable string or safe integer.`);
  }
}

function assertUniqueNonEmptyStrings(values: readonly string[], label: string): void {
  if (!Array.isArray(values) || !values.every(isNonEmptyString)) throw new Error(`${label} are invalid.`);
  if (new Set(values).size !== values.length) throw new Error(`${label} contain duplicates.`);
}

function assertNonEmpty(value: string, label: string): void {
  if (typeof value !== 'string' || value.trim().length === 0) throw new Error(`${label} must be non-empty text.`);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
