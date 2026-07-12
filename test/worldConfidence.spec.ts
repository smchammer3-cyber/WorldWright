import { describe, expect, it } from 'vitest';
import {
  confidenceBand,
  createConfidenceAssessment,
  createEmptyCausalConfidenceLedger,
  isCausalConfidenceLedgerV1,
  type ConfidenceEvidenceV1,
  type ContradictionRecordV1,
} from '../src/core/worldConfidence';

const evidence = (overrides: Partial<ConfidenceEvidenceV1> = {}): ConfidenceEvidenceV1 => ({
  schemaVersion: 1,
  id: 'evidence-a',
  subject: 'mantle.regime',
  kind: 'DERIVATION',
  polarity: 'SUPPORTS',
  weight: 1,
  reliability: 1,
  source: 'test-model',
  ...overrides,
});

describe('C04 confidence model', () => {
  it('keeps no-evidence state explicitly unknown', () => {
    const assessment = createConfidenceAssessment('mantle.regime', []);
    expect(assessment.probability).toBe(0.5);
    expect(assessment.confidence).toBe(0);
    expect(assessment.band).toBe('UNKNOWN');
    expect(Object.isFrozen(assessment)).toBe(true);
  });

  it('aggregates support and opposition without pretending certainty', () => {
    const assessment = createConfidenceAssessment('mantle.regime', [
      evidence(),
      evidence({ id: 'evidence-b', polarity: 'OPPOSES', weight: 0.5, reliability: 0.5 }),
    ]);
    expect(assessment.probability).toBeCloseTo(0.8);
    expect(assessment.confidence).toBeGreaterThan(0.5);
    expect(assessment.confidence).toBeLessThan(0.6);
    expect(assessment.band).toBe('MEDIUM');
    expect(assessment.evidenceIds).toEqual(['evidence-a', 'evidence-b']);
  });

  it('reduces confidence when open contradictions remain', () => {
    const contradiction: ContradictionRecordV1 = {
      schemaVersion: 1,
      id: 'contradiction-a',
      subject: 'mantle.regime',
      severity: 'HIGH',
      status: 'OPEN',
      claimIds: ['claim-a', 'claim-b'],
      evidenceIds: ['evidence-a'],
      observedValues: ['mobile-lid', 'stagnant-lid'],
      message: 'Conflicting regimes.',
    };
    const clean = createConfidenceAssessment('mantle.regime', [evidence()]);
    const conflicted = createConfidenceAssessment('mantle.regime', [evidence()], [contradiction]);
    expect(conflicted.confidence).toBeLessThan(clean.confidence);
    expect(conflicted.contradictionIds).toEqual(['contradiction-a']);
  });

  it('validates evidence and complete ledger shape', () => {
    expect(() => createConfidenceAssessment('mantle.regime', [evidence({ weight: 2 })])).toThrow(/\[0, 1\]/);
    const ledger = createEmptyCausalConfidenceLedger();
    expect(isCausalConfidenceLedgerV1(ledger)).toBe(true);
    expect(isCausalConfidenceLedgerV1({ ...ledger, schemaVersion: 2 })).toBe(false);
    expect(confidenceBand(0.9)).toBe('CERTAIN');
  });
});
