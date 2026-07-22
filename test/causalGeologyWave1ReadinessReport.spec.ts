import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

interface Wave1MilestoneV1 {
  readonly milestoneId: string;
  readonly pullRequest: number;
  readonly title: string;
  readonly validatedHead: string;
  readonly mergeCommit: string;
  readonly scientificStatus: 'PARTIAL' | 'PLANNING_ONLY';
  readonly physicalOutputChanged: boolean;
}

interface Wave1DefinitionGateV1 {
  readonly gateId: string;
  readonly status: string;
  readonly blockingPromotion: boolean;
  readonly evidence: string;
}

interface Wave1BlockingGapV1 {
  readonly gapId: string;
  readonly severity: 'BLOCKING_PROMOTION';
  readonly status: 'OPEN';
  readonly requiredClosure: string;
}

interface Wave1ReadinessReportV1 {
  readonly schemaVersion: 1;
  readonly reportVersion: 'W1_07_WAVE1_PROMOTION_READINESS_V1';
  readonly generatedFromBaseCommit: string;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN';
  readonly ordinaryGenerateChanged: false;
  readonly visiblePhysicalOutputChanged: false;
  readonly scientificStatus: 'PARTIAL';
  readonly wave1MilestoneImplementation: 'COMPLETE';
  readonly wave1DefinitionOfDone: 'NOT_MET';
  readonly promotionReadiness: 'NOT_READY';
  readonly phaseDReadiness: 'READY_FOR_DETACHED_PROTOTYPING_WITH_GATES';
  readonly mergedWave1Milestones: readonly Wave1MilestoneV1[];
  readonly evidenceSummary: {
    readonly fixedAggregateCases: number;
    readonly fixedAggregateUniqueSeeds: number;
    readonly canonicalDirectInputAxes: number;
    readonly reviewedDirectInputRelations: number;
    readonly researchRequiredDirectInputRelations: number;
    readonly controlledArchetypeFamilies: number;
    readonly controlledArchetypeCases: number;
    readonly referenceKindsSeparated: readonly string[];
    readonly legacyPhysicalEquivalence: string;
    readonly knownLegacyFailureVisible: boolean;
    readonly knownLegacyFirstFailedAuthorityLayer: string;
  };
  readonly definitionOfDoneAssessment: readonly Wave1DefinitionGateV1[];
  readonly blockingPromotionGaps: readonly Wave1BlockingGapV1[];
  readonly phaseDEntryConditions: {
    readonly allowed: boolean;
    readonly mode: 'DETACHED_DIAGNOSTIC_ONLY';
    readonly physicalAuthority: 'NONE';
    readonly candidateNamespace: 'ISOLATED_CAUSAL_PROJECTION';
    readonly legacyFeedbackIntoCausalResolution: 'FORBIDDEN';
    readonly ordinaryGenerateInvocation: 'FORBIDDEN';
    readonly requiredFirstScope: string;
  };
  readonly rollback: {
    readonly legacyRemainsDefault: boolean;
    readonly causalActiveExists: boolean;
    readonly wave1ChangesAreDetachedAndRevertible: boolean;
    readonly ordinaryWorldMigrationRequired: boolean;
    readonly legacyRetirementPermitted: boolean;
  };
  readonly finalVerdict: {
    readonly wave1Implementation: string;
    readonly wave1ScientificCompletion: string;
    readonly promotion: string;
    readonly nextAction: string;
  };
}

const reportPath = resolve(
  process.cwd(),
  'docs/implementation/wave1/w1-07-promotion-readiness.json',
);
const report = JSON.parse(readFileSync(reportPath, 'utf8')) as Wave1ReadinessReportV1;
const hashPattern = /^[0-9a-f]{40}$/;

describe('W1-07 Wave 1 completion and promotion-readiness report', () => {
  it('records the exact detached authority verdict without claiming scientific completion', () => {
    expect(report.schemaVersion).toBe(1);
    expect(report.reportVersion).toBe('W1_07_WAVE1_PROMOTION_READINESS_V1');
    expect(report.generatedFromBaseCommit).toBe('0b97438776423f52b40fde55f1920f38c1a63e4f');
    expect(report.authorityMode).toBe('CAUSAL_SHADOW');
    expect(report.physicalGeneratorAuthority).toBe('LEGACY');
    expect(report.causalActive).toBe('UNIMPLEMENTED_AND_FORBIDDEN');
    expect(report.ordinaryGenerateChanged).toBe(false);
    expect(report.visiblePhysicalOutputChanged).toBe(false);
    expect(report.scientificStatus).toBe('PARTIAL');
    expect(report.wave1MilestoneImplementation).toBe('COMPLETE');
    expect(report.wave1DefinitionOfDone).toBe('NOT_MET');
    expect(report.promotionReadiness).toBe('NOT_READY');
  });

  it('binds every Wave 1 implementation milestone to unique PR, head, and merge identities', () => {
    expect(report.mergedWave1Milestones).toHaveLength(13);
    expect(report.mergedWave1Milestones.map((entry) => entry.milestoneId)).toEqual([
      'W1-01',
      'W1-02-READINESS',
      'W1-02A',
      'W1-02B-RESEARCH',
      'W1-02B',
      'W1-03',
      'W1-04',
      'W1-05A',
      'W1-05B',
      'W1-06A',
      'W1-06B1',
      'W1-06B2',
      'W1-06B3',
    ]);
    expect(new Set(report.mergedWave1Milestones.map((entry) => entry.pullRequest)).size).toBe(13);
    expect(new Set(report.mergedWave1Milestones.map((entry) => entry.validatedHead)).size).toBe(13);
    expect(new Set(report.mergedWave1Milestones.map((entry) => entry.mergeCommit)).size).toBe(13);
    for (const milestone of report.mergedWave1Milestones) {
      expect(milestone.validatedHead).toMatch(hashPattern);
      expect(milestone.mergeCommit).toMatch(hashPattern);
      expect(milestone.physicalOutputChanged).toBe(false);
      expect(['PARTIAL', 'PLANNING_ONLY']).toContain(milestone.scientificStatus);
    }
    expect(report.mergedWave1Milestones.at(-1)).toMatchObject({
      milestoneId: 'W1-06B3',
      pullRequest: 146,
      validatedHead: '1f5bae7a15c1cce50ccc3c7165278531ca1f9bb8',
      mergeCommit: report.generatedFromBaseCommit,
    });
  });

  it('fails promotion while all twelve direct-input relations remain research-required', () => {
    expect(report.evidenceSummary.canonicalDirectInputAxes).toBe(12);
    expect(report.evidenceSummary.reviewedDirectInputRelations).toBe(0);
    expect(report.evidenceSummary.researchRequiredDirectInputRelations).toBe(12);
    expect(report.evidenceSummary.fixedAggregateCases).toBe(28);
    expect(report.evidenceSummary.fixedAggregateUniqueSeeds).toBe(28);
    expect(report.evidenceSummary.controlledArchetypeFamilies).toBe(10);
    expect(report.evidenceSummary.controlledArchetypeCases).toBe(30);
    expect(report.evidenceSummary.referenceKindsSeparated).toEqual([
      'positive',
      'threshold',
      'negative',
      'exception',
    ]);

    const sensitivityGate = report.definitionOfDoneAssessment.find(
      (entry) => entry.gateId === 'REVIEWED_DIRECT_INPUT_SENSITIVITY',
    );
    expect(sensitivityGate).toMatchObject({
      status: 'FAIL_OPEN_RESEARCH',
      blockingPromotion: true,
    });
    expect(report.blockingPromotionGaps).toHaveLength(4);
    expect(report.blockingPromotionGaps.every((entry) =>
      entry.severity === 'BLOCKING_PROMOTION'
      && entry.status === 'OPEN'
      && entry.requiredClosure.trim().length > 0)).toBe(true);
    expect(report.finalVerdict.promotion).toBe('BLOCKED');
    expect(report.finalVerdict.wave1ScientificCompletion).toBe('NOT_COMPLETE');
  });

  it('permits Phase D only as detached diagnostic projections with no physical authority', () => {
    expect(report.phaseDReadiness).toBe('READY_FOR_DETACHED_PROTOTYPING_WITH_GATES');
    expect(report.phaseDEntryConditions).toMatchObject({
      allowed: true,
      mode: 'DETACHED_DIAGNOSTIC_ONLY',
      physicalAuthority: 'NONE',
      candidateNamespace: 'ISOLATED_CAUSAL_PROJECTION',
      legacyFeedbackIntoCausalResolution: 'FORBIDDEN',
      ordinaryGenerateInvocation: 'FORBIDDEN',
    });
    expect(report.phaseDEntryConditions.requiredFirstScope).toMatch(/process-field contracts/i);
    expect(report.finalVerdict.nextAction).toBe('BEGIN_PHASE_D_AS_DETACHED_DIAGNOSTIC_PROJECTIONS_ONLY');
  });

  it('preserves rollback, legacy default authority, and the known legacy failure', () => {
    expect(report.evidenceSummary.legacyPhysicalEquivalence).toBe('PASS');
    expect(report.evidenceSummary.knownLegacyFailureVisible).toBe(true);
    expect(report.evidenceSummary.knownLegacyFirstFailedAuthorityLayer).toBe('RAW_GENERATOR');
    expect(report.rollback).toEqual({
      legacyRemainsDefault: true,
      causalActiveExists: false,
      wave1ChangesAreDetachedAndRevertible: true,
      ordinaryWorldMigrationRequired: false,
      legacyRetirementPermitted: false,
    });
  });
});
