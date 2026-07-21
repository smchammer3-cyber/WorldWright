import { describe, expect, it } from 'vitest';
import {
  createCausalShadowAggregateReport,
  validateCausalShadowAggregateReport,
  type CausalShadowAuditCaseV1,
} from '../src/core/causalGeology';

function auditCase(index: number, overrides: Partial<CausalShadowAuditCaseV1> = {}): CausalShadowAuditCaseV1 {
  return {
    schemaVersion: 1,
    caseId: `aggregate-case-${index}`,
    rootSeed: `seed-${index}`,
    archetypeFamily: index % 2 === 0 ? 'STAGNANT_LID_ROCKY' : 'HIGH_HEAT_YOUNG_SUPER_EARTH',
    variationKind: index % 6 === 0 ? 'THRESHOLD' : 'POSITIVE',
    directInputAxes: ['inventory.water', 'thermal.age'],
    stageStatus: 'PARTIAL',
    currentRegime: index % 2 === 0 ? 'STAGNANT_LID' : 'EPISODIC_LID',
    historyHash: index.toString(16).padStart(16, '0'),
    spineHash: (index + 1000).toString(16).padStart(16, '0'),
    epochCount: index % 3 + 1,
    transitionCount: index % 3,
    nodeCount: 6 + index % 8,
    edgeCount: 5 + index % 8,
    eventCount: 6 + index % 8,
    featureFamilies: index % 2 === 0 ? ['CONTINENTAL_KERNEL', 'RIFT_SYSTEM'] : ['PLUME_SYSTEM', 'OCEAN_BASIN'],
    openContradictionCount: 0,
    durationMilliseconds: 20 + index,
    heapDeltaBytes: 1024 * (index + 1),
    serializedPayloadBytes: 4096 + index,
    ...overrides,
  };
}

describe('W1-06A causal shadow aggregate audit', () => {
  it('passes the 24-case software gate while reporting incomplete scientific coverage honestly', () => {
    const report = createCausalShadowAggregateReport(Array.from({ length: 24 }, (_, index) => auditCase(index + 1)));

    validateCausalShadowAggregateReport(report);
    expect(report.softwareGatePass).toBe(true);
    expect(report.scientificStatus).toBe('PARTIAL');
    expect(report.caseCount).toBe(24);
    expect(report.uniqueSeedCount).toBe(24);
    expect(report.determinism.distinctHistoryHashCount).toBe(24);
    expect(report.determinism.distinctSpineHashCount).toBe(24);
    expect(report.coverage.missingArchetypeFamilies.length).toBeGreaterThan(0);
    expect(report.coverage.missingDirectInputAxes.length).toBeGreaterThan(0);
    expect(report.coverage.missingReferenceKinds).toEqual(['EXCEPTION', 'NEGATIVE']);
    expect(report.performance.overBudgetCaseIds).toEqual([]);
    expect(Object.isFrozen(report)).toBe(true);
  });

  it('rejects duplicate seeds instead of hiding corpus collapse', () => {
    const cases = Array.from({ length: 24 }, (_, index) => auditCase(index + 1));
    cases[1] = auditCase(2, { rootSeed: cases[0].rootSeed });

    expect(() => createCausalShadowAggregateReport(cases)).toThrow(/Duplicate causal shadow audit seed/);
  });
});
