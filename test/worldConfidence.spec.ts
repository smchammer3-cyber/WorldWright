import { describe, expect, it } from 'vitest';
import { createEmptyLegacyCausalScaffold, isCausalWorldScaffoldV1 } from '../src/core/causalWorld/schema';
import {
  confidenceBand,
  createConfidenceAssessment,
  createEmptyCausalConfidenceLedger,
  detectClaimContradictions,
  isCausalConfidenceLedgerV1,
  type ConfidenceEvidenceV1,
  type ScientificClaimV1,
} from '../src/core/worldConfidence';

const evidence = (overrides: Partial<ConfidenceEvidenceV1> = {}): ConfidenceEvidenceV1 => ({
  schemaVersion: 1,
  id: 'evidence-a',
  subject: 'mantle.regime',
  kind: 'DERIVATION',
  polarity: 'SUPPORTS',
  weight: 1,
  reliability: 1,
  source: 'test-model-a',
  ...overrides,
});

const claim = (overrides: Partial<ScientificClaimV1> = {}): ScientificClaimV1 => ({
  schemaVersion: 1,
  id: 'claim-a',
  subject: 'mantle.regime',
  value: 'mobile-lid',
  confidence: 0.9,
  evidenceIds: ['evidence-a'],
  source: 'test-model-a',
  status: 'ACTIVE',
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
      evidence({ id: 'evidence-b', polarity: 'OPPOSES', weight: 0.5, reliability: 0.5, source: 'test-model-b' }),
    ]);
    expect(assessment.probability).toBeCloseTo(0.8);
    expect(assessment.confidence).toBeGreaterThan(0.5);
    expect(assessment.confidence).toBeLessThan(0.6);
    expect(assessment.band).toBe('MEDIUM');
    expect(assessment.evidenceIds).toEqual(['evidence-a', 'evidence-b']);
  });

  it('caps repeated records from one source and reserves CERTAIN for exact confidence one', () => {
    const single = createConfidenceAssessment('mantle.regime', [evidence()]);
    const repeated = createConfidenceAssessment('mantle.regime', Array.from({ length: 20 }, (_, index) => evidence({ id: `evidence-${index}` })));
    expect(repeated.supportStrength).toBeCloseTo(single.supportStrength);
    expect(repeated.confidence).toBeCloseTo(single.confidence);
    expect(confidenceBand(0.9)).toBe('HIGH');
    expect(confidenceBand(1)).toBe('CERTAIN');
  });

  it('reduces confidence when open contradictions remain', () => {
    const contradiction = detectClaimContradictions([
      claim(),
      claim({ id: 'claim-b', value: 'stagnant-lid', confidence: 0.85, evidenceIds: ['evidence-b'], source: 'test-model-b' }),
    ])[0];
    const clean = createConfidenceAssessment('mantle.regime', [evidence()]);
    const conflicted = createConfidenceAssessment('mantle.regime', [evidence()], [contradiction]);
    expect(conflicted.confidence).toBeLessThan(clean.confidence);
    expect(conflicted.contradictionIds).toEqual([contradiction.id]);
    expect(() => createConfidenceAssessment('mantle.regime', [evidence()], [contradiction, contradiction])).toThrow(/Duplicate contradiction/);
  });

  it('fails closed for dangling or internally inconsistent ledger records', () => {
    const ledger = createEmptyCausalConfidenceLedger();
    expect(isCausalConfidenceLedgerV1(ledger)).toBe(true);
    expect(isCausalConfidenceLedgerV1({ ...ledger, schemaVersion: 2 })).toBe(false);
    expect(isCausalConfidenceLedgerV1({
      ...ledger,
      assessments: [{
        schemaVersion: 1,
        subject: 'mantle.regime',
        probability: 1,
        confidence: 1,
        band: 'CERTAIN',
        supportStrength: 1,
        oppositionStrength: 0,
        neutralStrength: 0,
        evidenceIds: ['missing'],
        contradictionIds: [],
        rationale: 'Invalid dangling reference.',
      }],
    })).toBe(false);
  });

  it('rejects malformed confidence ledgers on the causal scaffold', () => {
    const scaffold = createEmptyLegacyCausalScaffold();
    expect(isCausalWorldScaffoldV1(scaffold)).toBe(true);
    expect(isCausalWorldScaffoldV1({ ...scaffold, confidence: { schemaVersion: 1 } })).toBe(false);
  });

  it('validates evidence bounds', () => {
    expect(() => createConfidenceAssessment('mantle.regime', [evidence({ weight: 2 })])).toThrow(/\[0, 1\]/);
  });
});
