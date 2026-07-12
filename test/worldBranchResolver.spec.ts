import { describe, expect, it } from 'vitest';
import { isCausalConfidenceLedgerV1, resolveWeightedBranch, type ConfidenceEvidenceV1 } from '../src/core/worldConfidence';
import { createWorldRandomOracle } from '../src/core/worldRandom/oracle';

const options = [
  { id: 'mobile-lid', value: 'mobile-lid', weight: 3, evidenceIds: ['evidence-a'] },
  { id: 'stagnant-lid', value: 'stagnant-lid', weight: 1, evidenceIds: ['evidence-b'] },
] as const;

const evidence: readonly ConfidenceEvidenceV1[] = [
  { schemaVersion: 1, id: 'evidence-a', subject: 'interior.regime', kind: 'DERIVATION', polarity: 'SUPPORTS', weight: 1, reliability: 1, source: 'model-a' },
  { schemaVersion: 1, id: 'evidence-b', subject: 'interior.regime', kind: 'DERIVATION', polarity: 'SUPPORTS', weight: 1, reliability: 1, source: 'model-b' },
];

describe('C04 deterministic weighted branch resolution', () => {
  it('replays exactly and is independent of caller option order', () => {
    const oracle = createWorldRandomOracle('c04-seed', { authorityMode: 'CAUSAL_SHADOW' });
    const request = {
      branchId: 'interior-regime',
      stream: 'causal.interior' as const,
      scope: ['planetary-interior'] as const,
      options,
      oracle,
    };
    const first = resolveWeightedBranch(request);
    const replay = resolveWeightedBranch(request);
    const reversed = resolveWeightedBranch({ ...request, options: [...options].reverse() });
    expect(replay).toEqual(first);
    expect(reversed).toEqual(first);
    expect(first.normalizedWeights).toEqual([
      { optionId: 'mobile-lid', probability: 0.75 },
      { optionId: 'stagnant-lid', probability: 0.25 },
    ]);
  });

  it('uses branch identity in the random address', () => {
    const oracle = createWorldRandomOracle('c04-seed', { authorityMode: 'CAUSAL_SHADOW' });
    const first = resolveWeightedBranch({ branchId: 'branch-a', stream: 'causal.interior', scope: ['interior'], options, oracle });
    const second = resolveWeightedBranch({ branchId: 'branch-b', stream: 'causal.interior', scope: ['interior'], options, oracle });
    expect(first.scope).not.toEqual(second.scope);
    expect(first.randomUnit).not.toBe(second.randomUnit);
  });

  it('rejects ambiguous, invalid, or weightless option sets', () => {
    const oracle = createWorldRandomOracle('c04-seed', { authorityMode: 'CAUSAL_SHADOW' });
    expect(() => resolveWeightedBranch({
      branchId: 'duplicate', stream: 'causal.interior', scope: ['interior'], oracle,
      options: [options[0], { ...options[0] }],
    })).toThrow(/Duplicate/);
    expect(() => resolveWeightedBranch({
      branchId: 'weightless', stream: 'causal.interior', scope: ['interior'], oracle,
      options: options.map((option) => ({ ...option, weight: 0 })),
    })).toThrow(/positive/);
    expect(() => resolveWeightedBranch({
      branchId: 'invalid-value', stream: 'causal.interior', scope: ['interior'], oracle,
      options: [{ id: 'invalid', value: undefined as never, weight: 1, evidenceIds: [] }],
    })).toThrow(/canonical JSON/);
  });

  it('deep-freezes the chosen value and survives serialized ledger validation', () => {
    const oracle = createWorldRandomOracle('c04-seed', { authorityMode: 'CAUSAL_SHADOW' });
    const resolution = resolveWeightedBranch({
      branchId: 'structured-branch',
      stream: 'causal.interior',
      scope: ['interior'],
      oracle,
      options: [
        { id: 'structured', value: { regime: 'mobile-lid', epochs: [1, 2] }, weight: 1, evidenceIds: ['evidence-a'] },
      ],
    });
    expect(Object.isFrozen(resolution.chosenValue)).toBe(true);
    expect(Object.isFrozen((resolution.chosenValue as { epochs: readonly number[] }).epochs)).toBe(true);
    const roundTripped = JSON.parse(JSON.stringify(resolution));
    expect(isCausalConfidenceLedgerV1({ schemaVersion: 1, evidence, assessments: [], branchResolutions: [roundTripped], contradictions: [] })).toBe(true);
  });

  it('cannot consume reserved causal randomness under LEGACY authority', () => {
    const oracle = createWorldRandomOracle('c04-seed', { authorityMode: 'LEGACY' });
    expect(() => resolveWeightedBranch({ branchId: 'legacy', stream: 'causal.interior', scope: ['interior'], options, oracle }))
      .toThrow(/not allowed/);
  });
});
