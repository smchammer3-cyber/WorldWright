import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import type {
  ContinentOceanStructureFixtureSetV1,
  RegimeHistoryFixtureSetV1,
} from '../src/core/causalGeology';
import { getAuthorityProcess } from '../src/core/worldAuthority';

interface C3MilestoneV1 {
  readonly milestoneId: 'C1' | 'C2A' | 'C2B';
  readonly pullRequest: number;
  readonly validatedHead: string;
  readonly mergeCommit: string;
  readonly summary: string;
}

interface C3GateV1 {
  readonly gateId: string;
  readonly target: 'PASS';
  readonly blockingPhaseM: true;
  readonly evidence: string;
}

interface C3LimitationV1 {
  readonly limitationId: string;
  readonly severity: string;
  readonly status: 'OPEN';
  readonly description: string;
}

interface C3ArtifactV1 {
  readonly schemaVersion: 1;
  readonly reportVersion: 'C3_PHASE_C_COMPLETION_AND_PHASE_M_READINESS_V1';
  readonly baseCommit: string;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly interpretationMode: 'DETACHED_DIAGNOSTIC';
  readonly scientificStatus: 'PARTIAL';
  readonly phaseCImplementationStatus: 'COMPLETE_PENDING_EXACT_HEAD_VALIDATION';
  readonly phaseCScientificCompletion: 'PARTIAL';
  readonly phaseMReadiness: 'READY_FOR_M1_DETACHED_STRUCTURE_MATERIAL_CONTRACTS_AND_RESEARCH_ONLY';
  readonly ordinaryGenerateChanged: false;
  readonly visiblePhysicalOutputChanged: false;
  readonly causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN';
  readonly mergedMilestones: readonly C3MilestoneV1[];
  readonly completionEvidence: {
    readonly fixedStructuralCorpus: {
      readonly fixtureSetVersion: string;
      readonly totalCases: number;
      readonly fixtureKindCounts: Readonly<Record<string, number>>;
      readonly holdoutsUsedForCalibration: false;
      readonly requiredEvidence: readonly string[];
    };
    readonly liveUpstreamCorpus: {
      readonly fixtureIds: readonly string[];
      readonly fixtureKindCounts: Readonly<Record<string, number>>;
      readonly route: string;
      readonly requiredEvidence: readonly string[];
    };
  };
  readonly phaseCGates: readonly C3GateV1[];
  readonly knownLimitations: readonly C3LimitationV1[];
  readonly phaseMEntryBoundary: {
    readonly allowed: true;
    readonly mode: 'M1_DETACHED_STRUCTURE_MATERIAL_CONTRACTS_AND_RESEARCH_ONLY';
    readonly firstScope: string;
    readonly reads: readonly string[];
    readonly writes: readonly string[];
    readonly forbiddenWrites: readonly string[];
    readonly forbiddenInputs: readonly string[];
    readonly ordinaryGenerateInvocation: 'FORBIDDEN';
    readonly physicalPromotion: 'FORBIDDEN';
    readonly causalActive: 'FORBIDDEN';
  };
  readonly finalVerdict: {
    readonly phaseCSoftwareImplementation: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS';
    readonly phaseCScientificStatus: 'PARTIAL';
    readonly phaseMDetachedEntry: 'ALLOWED_AFTER_EXACT_HEAD_GATE_PASS';
    readonly physicalPromotion: 'BLOCKED';
    readonly legacyRetirement: 'FORBIDDEN';
    readonly nextAction: 'BEGIN_M1_DETACHED_STRUCTURE_MATERIAL_CONTRACTS_AND_RESEARCH';
  };
}

const repositoryRoot = process.cwd();
const researchRoot = resolve(repositoryRoot, 'src/core/causalGeology/research');
const artifact = readJson<C3ArtifactV1>(resolve(
  repositoryRoot,
  'docs/implementation/phase-c/c3-phase-c-completion-readiness.json',
));
const structuralFixtures = readJson<ContinentOceanStructureFixtureSetV1>(resolve(
  researchRoot,
  'continent-ocean-structure-fixtures.json',
));
const regimeFixtures = readJson<RegimeHistoryFixtureSetV1>(resolve(
  researchRoot,
  'regime-history-fixtures.json',
));
const hashPattern = /^[0-9a-f]{40}$/;

const expectedMilestones = [
  {
    milestoneId: 'C1',
    pullRequest: 151,
    validatedHead: '082bc00583b979aa3b3c66e94acc4deb00b3c8fb',
    mergeCommit: '3060054b7e862a8a5dc898db83a4d5145868d3ff',
  },
  {
    milestoneId: 'C2A',
    pullRequest: 153,
    validatedHead: 'cc5227c03658d9e9d50bd303be1c0821a7078cdf',
    mergeCommit: 'e4e14ce0914c489964afe3a4ecea14097c4e07b5',
  },
  {
    milestoneId: 'C2B',
    pullRequest: 155,
    validatedHead: '968a22026df1727e8d672d504f16e60839dd5ed1',
    mergeCommit: '6e5543511e2bcb7de9c32b57ec90870a12a7b0f4',
  },
] as const;

const requiredLimitationIds = [
  'PROVISIONAL_NORMALIZED_CALIBRATION',
  'RADIAL_PROCESS_FIELD_GEOMETRY',
  'SHELF_SLOPE_MATERIAL_SURFACE_CONTEXT',
  'DROWNED_FRAGMENT_CONTEXT',
  'NO_GLOBAL_REGION_PARTITIONER',
  'NO_OBSERVATIONAL_ROLE_FREQUENCY_CALIBRATION',
] as const;

describe('C3 machine-readable completion and readiness artifact', () => {
  it('matches the merged Phase C route, fixed corpus, live corpus, and detached Phase M boundary', () => {
    expect(artifact).toMatchObject({
      schemaVersion: 1,
      reportVersion: 'C3_PHASE_C_COMPLETION_AND_PHASE_M_READINESS_V1',
      baseCommit: '6e5543511e2bcb7de9c32b57ec90870a12a7b0f4',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      interpretationMode: 'DETACHED_DIAGNOSTIC',
      scientificStatus: 'PARTIAL',
      phaseCImplementationStatus: 'COMPLETE_PENDING_EXACT_HEAD_VALIDATION',
      phaseCScientificCompletion: 'PARTIAL',
      phaseMReadiness: 'READY_FOR_M1_DETACHED_STRUCTURE_MATERIAL_CONTRACTS_AND_RESEARCH_ONLY',
      ordinaryGenerateChanged: false,
      visiblePhysicalOutputChanged: false,
      causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN',
    });
    expect(artifact.baseCommit).toMatch(hashPattern);
    expect(artifact.mergedMilestones).toHaveLength(expectedMilestones.length);
    for (const expected of expectedMilestones) {
      const actual = artifact.mergedMilestones.find((entry) => entry.milestoneId === expected.milestoneId);
      expect(actual).toMatchObject(expected);
      expect(actual?.validatedHead).toMatch(hashPattern);
      expect(actual?.mergeCommit).toMatch(hashPattern);
      expect(actual?.summary.length).toBeGreaterThan(0);
    }
    expect(artifact.mergedMilestones.at(-1)?.mergeCommit).toBe(artifact.baseCommit);

    const countStructuralKind = (kind: string) => structuralFixtures.fixtures.filter((fixture) => fixture.kind === kind).length;
    expect(artifact.completionEvidence.fixedStructuralCorpus).toMatchObject({
      fixtureSetVersion: structuralFixtures.fixtureSetVersion,
      totalCases: structuralFixtures.fixtures.length,
      fixtureKindCounts: {
        POSITIVE: countStructuralKind('POSITIVE'),
        THRESHOLD: countStructuralKind('THRESHOLD'),
        NEGATIVE: countStructuralKind('NEGATIVE'),
        EXCEPTION: countStructuralKind('EXCEPTION'),
        HOLDOUT: countStructuralKind('HOLDOUT'),
      },
      holdoutsUsedForCalibration: false,
    });
    expect(artifact.completionEvidence.fixedStructuralCorpus.requiredEvidence.length).toBeGreaterThanOrEqual(8);

    const liveFixtureIds = new Set(artifact.completionEvidence.liveUpstreamCorpus.fixtureIds);
    expect(liveFixtureIds.size).toBe(artifact.completionEvidence.liveUpstreamCorpus.fixtureIds.length);
    const liveFixtures = artifact.completionEvidence.liveUpstreamCorpus.fixtureIds.map((fixtureId) => {
      const fixture = regimeFixtures.fixtures.find((entry) => entry.fixtureId === fixtureId);
      expect(fixture).toBeDefined();
      return fixture as RegimeHistoryFixtureSetV1['fixtures'][number];
    });
    const liveKindCounts = Object.fromEntries(['HOLDOUT', 'POSITIVE', 'THRESHOLD'].map((kind) => [
      kind,
      liveFixtures.filter((fixture) => fixture.kind === kind).length,
    ]));
    expect(artifact.completionEvidence.liveUpstreamCorpus.fixtureKindCounts).toEqual(liveKindCounts);
    expect(artifact.completionEvidence.liveUpstreamCorpus.fixtureIds).toHaveLength(7);
    expect(artifact.completionEvidence.liveUpstreamCorpus.route).toContain('structural interpretation');
    expect(artifact.completionEvidence.liveUpstreamCorpus.requiredEvidence.length).toBeGreaterThanOrEqual(10);

    expect(artifact.phaseCGates.length).toBeGreaterThanOrEqual(9);
    expect(new Set(artifact.phaseCGates.map((gate) => gate.gateId)).size).toBe(artifact.phaseCGates.length);
    for (const gate of artifact.phaseCGates) {
      expect(gate.target).toBe('PASS');
      expect(gate.blockingPhaseM).toBe(true);
      expect(gate.evidence.length).toBeGreaterThan(0);
    }

    const limitationIds = artifact.knownLimitations.map((entry) => entry.limitationId);
    for (const limitationId of requiredLimitationIds) expect(limitationIds).toContain(limitationId);
    for (const limitation of artifact.knownLimitations) {
      expect(limitation.status).toBe('OPEN');
      expect(limitation.severity.length).toBeGreaterThan(0);
      expect(limitation.description.length).toBeGreaterThan(0);
    }

    const process = getAuthorityProcess('CAUSAL_CONTINENT_OCEAN_STRUCTURE_INTERPRETATION');
    expect(process.modes).toEqual(['CAUSAL_SHADOW']);
    expect(process.writes).toEqual(['diagnostics']);
    expect(artifact.phaseMEntryBoundary).toMatchObject({
      allowed: true,
      mode: 'M1_DETACHED_STRUCTURE_MATERIAL_CONTRACTS_AND_RESEARCH_ONLY',
      writes: ['diagnostics'],
      ordinaryGenerateInvocation: 'FORBIDDEN',
      physicalPromotion: 'FORBIDDEN',
      causalActive: 'FORBIDDEN',
    });
    for (const forbiddenWrite of [
      'processFieldAuthority',
      'structuralRoleAuthority',
      'structureMaterialCause',
      'landformPotentialAuthority',
      'baseTerrain',
      'finalTerrain',
      'landMask',
      'waterMask',
      'seaLevel',
      'bathymetry',
      'presentation',
    ]) expect(artifact.phaseMEntryBoundary.forbiddenWrites).toContain(forbiddenWrite);
    expect(artifact.phaseMEntryBoundary.forbiddenInputs).toContain('legacy solved morphology');
    expect(artifact.finalVerdict).toEqual({
      phaseCSoftwareImplementation: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS',
      phaseCScientificStatus: 'PARTIAL',
      phaseMDetachedEntry: 'ALLOWED_AFTER_EXACT_HEAD_GATE_PASS',
      physicalPromotion: 'BLOCKED',
      legacyRetirement: 'FORBIDDEN',
      nextAction: 'BEGIN_M1_DETACHED_STRUCTURE_MATERIAL_CONTRACTS_AND_RESEARCH',
    });
  });
});

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}
