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

  it('ignores retracted claims', () => {
    expect(detectClaimContradictions([
      claim(),
      claim({ id: 'claim-b', value: 'stagnant-lid', status: 'RETRACTED' }),
    ])).toEqual([]);
  });

  it('resolves or dismisses immutably and validates the selected claim', () => {
    const contradiction = detectClaimContradictions([
      claim(),
      claim({ id: 'claim-b', value: 'stagnant-lid', evidenceIds: ['evidence-b'] }),
    ])[0];
    const resolved = resolveContradiction(contradiction, { selectedClaimId: 'claim-a', rationale: 'Better constrained.' });
    const dismissed = dismissContradiction(contradiction, 'Claims describe different epochs.');
    expect(resolved.status).toBe('RESOLVED');
    expect(resolved.resolution?.selectedClaimId).toBe('claim-a');
    expect(dismissed.status).toBe('DISMISSED');
    expect(contradiction.status).toBe('OPEN');
    expect(() => resolveContradiction(contradiction, { selectedClaimId: 'missing', rationale: 'No.' })).toThrow(/not part/);
  });
});
