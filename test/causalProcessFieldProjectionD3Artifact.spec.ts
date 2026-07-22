import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { D1_DETACHED_PROCESS_FIELD_DEFINITIONS_V1 } from '../src/core/causalGeology';
import { getAuthorityProcess } from '../src/core/worldAuthority';

interface D3ReadinessArtifactV1 {
  readonly schemaVersion: 1;
  readonly reportVersion: 'D3_PHASE_D_COMPLETION_READINESS_V1';
  readonly baseCommit: string;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly projectionMode: 'DETACHED_DIAGNOSTIC';
  readonly scientificStatus: 'PARTIAL';
  readonly phaseDImplementationStatus: 'COMPLETE_PENDING_EXACT_HEAD_VALIDATION';
  readonly phaseDScientificCompletion: 'PARTIAL';
  readonly phaseCReadiness: 'READY_FOR_DETACHED_STRUCTURAL_INTERPRETATION_ONLY';
  readonly ordinaryGenerateChanged: false;
  readonly visiblePhysicalOutputChanged: false;
  readonly causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN';
  readonly mergedMilestones: readonly Array<{
    readonly milestoneId: string;
    readonly pullRequest: number;
    readonly validatedHead: string;
    readonly mergeCommit: string;
    readonly summary: string;
  }>;
  readonly completionCorpus: {
    readonly fixtureIds: readonly string[];
    readonly fixtureKindCounts: Readonly<Record<string, number>>;
    readonly blockedOrNegativeEvidence: readonly string[];
    readonly gridResolutions: readonly Array<{ readonly width: number; readonly height: number }>;
    readonly requiredEvidence: readonly string[];
  };
  readonly phaseDGates: readonly Array<{
    readonly gateId: string;
    readonly target: 'PASS';
    readonly blockingPhaseC: boolean;
    readonly evidence: string;
  }>;
  readonly knownLimitations: readonly Array<{
    readonly limitationId: string;
    readonly severity: string;
    readonly status: 'OPEN';
    readonly description: string;
  }>;
  readonly phaseCEntryBoundary: {
    readonly allowed: boolean;
    readonly mode: 'DETACHED_STRUCTURAL_INTERPRETATION_ONLY';
    readonly firstScope: string;
    readonly reads: readonly string[];
    readonly writes: readonly string[];
    readonly forbiddenWrites: readonly string[];
    readonly forbiddenInputs: readonly string[];
    readonly ordinaryGenerateInvocation: 'FORBIDDEN';
    readonly physicalPromotion: 'FORBIDDEN';
  };
  readonly finalVerdict: Readonly<Record<string, string>>;
}

const artifact = JSON.parse(readFileSync(resolve(
  process.cwd(),
  'docs/implementation/phase-d/d3-phase-d-completion-readiness.json',
), 'utf8')) as D3ReadinessArtifactV1;
const commitPattern = /^[0-9a-f]{40}$/;

describe('D3 machine-readable Phase D readiness artifact', () => {
  it('binds merged D1/D2 evidence and keeps Phase C detached', () => {
    expect(artifact).toMatchObject({
      schemaVersion: 1,
      reportVersion: 'D3_PHASE_D_COMPLETION_READINESS_V1',
      baseCommit: 'e3d34f8afddc07c97901e31fe426a1a0156ceea6',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      projectionMode: 'DETACHED_DIAGNOSTIC',
      scientificStatus: 'PARTIAL',
      phaseDImplementationStatus: 'COMPLETE_PENDING_EXACT_HEAD_VALIDATION',
      phaseDScientificCompletion: 'PARTIAL',
      phaseCReadiness: 'READY_FOR_DETACHED_STRUCTURAL_INTERPRETATION_ONLY',
      ordinaryGenerateChanged: false,
      visiblePhysicalOutputChanged: false,
      causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN',
    });
    expect(artifact.mergedMilestones).toEqual([
      expect.objectContaining({
        milestoneId: 'D1',
        pullRequest: 148,
        validatedHead: '302ee8a1c46715053c2945ba009c9998049e2318',
        mergeCommit: 'b52f85fdea4c0f3b8afb395ec951f81829c556c9',
      }),
      expect.objectContaining({
        milestoneId: 'D2',
        pullRequest: 149,
        validatedHead: '89ae3f3be32e656ca28cced8cedcc008e8b606ef',
        mergeCommit: artifact.baseCommit,
      }),
    ]);
    expect(artifact.mergedMilestones.every((entry) =>
      commitPattern.test(entry.validatedHead)
      && commitPattern.test(entry.mergeCommit)
      && entry.summary.length > 0)).toBe(true);

    expect(artifact.completionCorpus.fixtureIds).toHaveLength(7);
    expect(artifact.completionCorpus.fixtureKindCounts).toEqual({ POSITIVE: 4, THRESHOLD: 1, HOLDOUT: 2 });
    expect(artifact.completionCorpus.gridResolutions).toEqual([
      { width: 24, height: 12 },
      { width: 48, height: 24 },
    ]);
    expect(artifact.completionCorpus.requiredEvidence.length).toBeGreaterThan(0);
    expect(artifact.phaseDGates.length).toBeGreaterThanOrEqual(7);
    expect(artifact.phaseDGates.every((entry) =>
      entry.target === 'PASS'
      && entry.blockingPhaseC
      && entry.evidence.length > 0)).toBe(true);

    const process = getAuthorityProcess('CAUSAL_PROCESS_FIELD_PROJECTION');
    expect(process.writes).toEqual(['diagnostics']);
    expect(artifact.phaseCEntryBoundary).toMatchObject({
      allowed: true,
      mode: 'DETACHED_STRUCTURAL_INTERPRETATION_ONLY',
      writes: ['diagnostics'],
      ordinaryGenerateInvocation: 'FORBIDDEN',
      physicalPromotion: 'FORBIDDEN',
    });
    expect(artifact.phaseCEntryBoundary.forbiddenWrites).toContain('processFieldAuthority');
    expect(artifact.phaseCEntryBoundary.forbiddenWrites).toContain('structuralRoleAuthority');
    expect(artifact.phaseCEntryBoundary.forbiddenWrites).toContain('terrain');
    expect(artifact.phaseCEntryBoundary.forbiddenInputs).toContain('legacy solved morphology');
  });

  it('keeps radial geometry and scientific gaps explicit blockers to physical promotion', () => {
    const radial = artifact.knownLimitations.find((entry) => entry.limitationId === 'RADIAL_KERNEL_GEOMETRY');
    const preservation = artifact.knownLimitations.find((entry) => entry.limitationId === 'NONPHYSICAL_PRESERVATION_WEIGHTS');
    const sensitivity = artifact.knownLimitations.find((entry) => entry.limitationId === 'UNREVIEWED_DIRECT_INPUT_SENSITIVITY');
    expect(radial).toMatchObject({ severity: 'BLOCKING_PHYSICAL_PROMOTION', status: 'OPEN' });
    expect(radial?.description).toMatch(/oriented ridges, arcs, sutures, transforms/i);
    expect(preservation).toMatchObject({ severity: 'BLOCKING_PHYSICAL_PROMOTION', status: 'OPEN' });
    expect(sensitivity).toMatchObject({ severity: 'BLOCKING_PHYSICAL_PROMOTION', status: 'OPEN' });
    expect(artifact.finalVerdict).toMatchObject({
      phaseDScientificStatus: 'PARTIAL',
      physicalPromotion: 'BLOCKED',
      legacyRetirement: 'FORBIDDEN',
      nextAction: 'BEGIN_C1_DETACHED_STRUCTURAL_ROLE_CONTRACTS',
    });
    expect(D1_DETACHED_PROCESS_FIELD_DEFINITIONS_V1.every((definition) =>
      definition.physicalAuthority === false
      && definition.terrainAuthority === false
      && definition.landWaterAuthority === false)).toBe(true);
  });
});
