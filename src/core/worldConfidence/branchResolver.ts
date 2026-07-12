import type { CausalBranchValue, ResolveWeightedBranchRequest, WeightedBranchResolutionV1 } from './types';

export function resolveWeightedBranch<T extends CausalBranchValue>(
  request: ResolveWeightedBranchRequest<T>,
): WeightedBranchResolutionV1<T> {
  if (!request || typeof request !== 'object') throw new Error('Weighted branch request is required.');
  assertNonEmpty(request.branchId, 'Branch ID');
  if (!Array.isArray(request.scope)) throw new Error('Branch scope must be an array.');
  if (!Array.isArray(request.options) || request.options.length === 0) throw new Error('Weighted branch requires at least one option.');

  const seen = new Set<string>();
  const sorted = [...request.options].sort((a, b) => a.id.localeCompare(b.id));
  let totalWeight = 0;
  for (const option of sorted) {
    assertNonEmpty(option.id, 'Option ID');
    if (seen.has(option.id)) throw new Error(`Duplicate weighted branch option ID: ${option.id}`);
    seen.add(option.id);
    if (!Number.isFinite(option.weight) || option.weight < 0) throw new RangeError(`Option ${option.id} weight must be finite and non-negative.`);
    if (!Array.isArray(option.evidenceIds) || !option.evidenceIds.every(isNonEmptyString)) throw new Error(`Option ${option.id} evidence IDs are invalid.`);
    totalWeight += option.weight;
  }
  if (!Number.isFinite(totalWeight) || totalWeight <= 0) throw new RangeError('Weighted branch total weight must be positive.');

  const stableScope = Object.freeze([...request.scope, request.branchId, 'weighted-branch-v1']);
  const randomUnit = request.oracle.float01({
    stream: request.stream,
    scope: stableScope,
    draw: 'selection',
  });
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
  const evidenceIds = Object.freeze([...new Set<string>(chosen.evidenceIds)].sort());

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
    chosenValue: structuredClone(chosen.value),
    evidenceIds,
  });
}

function assertNonEmpty(value: string, label: string): void {
  if (typeof value !== 'string' || value.trim().length === 0) throw new Error(`${label} must be non-empty text.`);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
