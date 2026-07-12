import { describe, expect, it } from 'vitest';
import {
  detectClaimContradictions,
  dismissContradiction,
  resolveContradiction,
  type ScientificClaimV1,
} from '../src/core/worldConfidence';

const claim = (overrides: Partial<ScientificClaimV1> = {}): ScientificClaimV1 => ({
  schemaVersion: 1,
  id: 'claim-a',
  subject: 'interior.regime',
  value: 'mobile-lid',
  confidence: 0.9,
  evidenceIds: ['evidence-a'],
  source: 'test-model',
  status: 'ACTIVE',
  ...overrides,
});

describe('C04 contradiction records', () => {
  it('does not report agreement as contradiction', () => {
    expect(detectClaimContradictions([
      claim(),
      claim({ id: 'claim-b', evidenceIds: ['evidence-b'] }),
    ])).toEqual([]);
  });

  it('detects conflicting active claims with stable identity and ordering', () => {
    const claims = [
      claim(),
      claim({ id: 'claim-b', value: 'stagnant-lid', confidence: 0.85, evidenceIds: ['evidence-b'] }),
    ];
    const first = detectClaimContradictions(claims);
    const reordered = detectClaimContradictions([...claims].reverse());
    expect(first).toEqual(reordered);
    expect(first).toHaveLength(1);
    expect(first[0].severity).toBe('HIGH');
    expect(first[0].claimIds).toEqual(['claim-a', 'claim-b']);
    expect(first[0].id).toMatch(/^contradiction_[0-9a-f]{16}$/);
  });

  it('rejects duplicate claim identity and ignores retracted claims', () => {
    expect(() => detectClaimContradictions([claim(), claim({ value: 'stagnant-lid' })])).toThrow(/Duplicate scientific claim/);
    expect(detectClaimContradictions([
      claim(),
      claim({ id: 'claim-b', value: 'stagnant-lid', status: 'RETRACTED' }),
    ])).toEqual([]);
  });

  it('deep-freezes observed structured values', () => {
    const contradiction = detectClaimContradictions([
      claim({ value: { regime: 'mobile-lid', epochs: [1, 2] } }),
      claim({ id: 'claim-b', value: { regime: 'stagnant-lid', epochs: [1, 3] }, evidenceIds: ['evidence-b'] }),
    ])[0];
    expect(Object.isFrozen(contradiction.observedValues[0])).toBe(true);
    expect(Object.isFrozen((contradiction.observedValues[0] as { epochs: readonly number[] }).epochs)).toBe(true);
  });

  it('resolves or dismisses immutably without inventing a selected claim for dismissal', () => {
    const contradiction = detectClaimContradictions([
      claim(),
      claim({ id: 'claim-b', value: 'stagnant-lid', evidenceIds: ['evidence-b'] }),
    ])[0];
    const resolved = resolveContradiction(contradiction, { selectedClaimId: 'claim-a', rationale: 'Better constrained.' });
    const dismissed = dismissContradiction(contradiction, 'Claims describe different epochs.');
    expect(resolved.status).toBe('RESOLVED');
    expect(resolved.resolution?.selectedClaimId).toBe('claim-a');
    expect(dismissed.status).toBe('DISMISSED');
    expect(dismissed.resolution).toBeUndefined();
    expect(dismissed.dismissal?.rationale).toMatch(/different epochs/);
    expect(contradiction.status).toBe('OPEN');
    expect(() => resolveContradiction(contradiction, { selectedClaimId: 'missing', rationale: 'No.' })).toThrow(/not part/);
  });
});
