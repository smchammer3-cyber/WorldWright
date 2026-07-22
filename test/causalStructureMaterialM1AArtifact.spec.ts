import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  M1A_STRUCTURE_MATERIAL_ALLOWED_FIELD_IDS_V1,
  M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
  type StructureMaterialResearchReviewV1,
} from '../src/core/causalGeology';
import { getAuthorityProcess } from '../src/core/worldAuthority';

interface M1AArtifactV1 {
  readonly schemaVersion: 1;
  readonly artifactVersion: 'M1A_DETACHED_STRUCTURE_MATERIAL_CONTRACTS_V1';
  readonly baseCommit: string;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly stateMode: 'DETACHED_DIAGNOSTIC';
  readonly scientificStatus: 'PARTIAL';
  readonly implementationStatus: 'CONTRACTS_AND_RESEARCH_COMPLETE_PENDING_EXACT_HEAD_VALIDATION';
  readonly ordinaryGenerateChanged: false;
  readonly visiblePhysicalOutputChanged: false;
  readonly causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN';
  readonly contractCounts: Readonly<Record<string, number>>;
  readonly researchCounts: Readonly<Record<string, number | boolean>>;
  readonly authorityBoundary: Readonly<Record<string, unknown>>;
  readonly m1bEntryBoundary: Readonly<Record<string, unknown>>;
  readonly finalVerdict: Readonly<Record<string, unknown>>;
}

const repositoryRoot = process.cwd();
const researchRoot = resolve(repositoryRoot, 'src/core/causalGeology/research');
const artifact = readJson<M1AArtifactV1>(resolve(
  repositoryRoot,
  'docs/implementation/phase-m/m1a-detached-structure-material-contracts.json',
));
const sources = readJson<ScientificSourceV1[]>(resolve(researchRoot, 'structure-material-source-registry.json'));
const claimRules = readJson<ScientificClaimRuleV1[]>(resolve(researchRoot, 'structure-material-claim-rules.json'));
const correlationGroups = readJson<string[]>(resolve(researchRoot, 'structure-material-correlation-groups.json'));
const review = readJson<StructureMaterialResearchReviewV1>(resolve(researchRoot, 'structure-material-review-record.json'));

const hashPattern = /^[0-9a-f]{40}$/;

describe('M1A machine-readable contract and research artifact', () => {
  it('matches committed contracts, sources, review status, and diagnostics-only ownership', () => {
    expect(artifact).toMatchObject({
      schemaVersion: 1,
      artifactVersion: 'M1A_DETACHED_STRUCTURE_MATERIAL_CONTRACTS_V1',
      baseCommit: 'e7fda4a079e0144de7a24d2b0883637203915bdd',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      stateMode: 'DETACHED_DIAGNOSTIC',
      scientificStatus: 'PARTIAL',
      implementationStatus: 'CONTRACTS_AND_RESEARCH_COMPLETE_PENDING_EXACT_HEAD_VALIDATION',
      ordinaryGenerateChanged: false,
      visiblePhysicalOutputChanged: false,
      causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN',
    });
    expect(artifact.baseCommit).toMatch(hashPattern);

    const supportedCount = M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1
      .filter((entry) => entry.researchStatus === 'SUPPORTED_CANDIDATE_CLASS').length;
    const researchRequiredCount = M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1
      .filter((entry) => entry.researchStatus === 'RESEARCH_REQUIRED').length;
    const unresolvedCount = M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1
      .filter((entry) => entry.researchStatus === 'UNRESOLVED').length;
    expect(artifact.contractCounts).toMatchObject({
      provinceDefinitions: M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1.length,
      supportedCandidateClasses: supportedCount,
      researchRequiredClasses: researchRequiredCount,
      unresolvedClasses: unresolvedCount,
      allowedProcessFieldIds: M1A_STRUCTURE_MATERIAL_ALLOWED_FIELD_IDS_V1.length,
    });
    expect(M1A_STRUCTURE_MATERIAL_ALLOWED_FIELD_IDS_V1).not.toContain('surfaceExposureSummary');

    expect(artifact.researchCounts).toMatchObject({
      sources: sources.length,
      externalSources: sources.filter((entry) => !['INTERNAL_CONTROLLED_ARCHETYPE', 'INTERNAL_HYPOTHESIS'].includes(entry.qualityClass)).length,
      internalScopeSources: sources.filter((entry) => entry.qualityClass === 'INTERNAL_CONTROLLED_ARCHETYPE').length,
      genericClaimRules: claimRules.length,
      independentCorrelationGroups: correlationGroups.length,
      completeEligibleProvinceClasses: review.completeEligibleProvinceClasses.length,
      researchRequiredProvinceClasses: review.researchRequiredProvinceClasses.length,
      resolverImplementationAuthorized: false,
      thresholdCalibrationAuthorized: false,
    });

    const authority = getAuthorityProcess('CAUSAL_STRUCTURE_MATERIAL_INTERPRETATION');
    expect(artifact.authorityBoundary).toMatchObject({
      diagnosticProcessId: authority.id,
      owner: authority.owner,
      prerequisite: authority.prerequisites[0],
      reads: authority.reads,
      writes: authority.writes,
      structureMaterialCauseAuthority: false,
      landformPotentialAuthority: false,
      baseTerrainAuthority: false,
      surfaceMaterialAuthority: false,
      finalLandAuthority: false,
      finalWaterAuthority: false,
      bathymetryAuthority: false,
      terrainAuthority: false,
    });
    expect(authority.forbiddenWrites).toContain('structureMaterialCause');
    expect(authority.forbiddenWrites).toContain('landformPotentialAuthority');

    expect(artifact.m1bEntryBoundary).toMatchObject({
      allowedAfterExactHeadValidation: true,
      resolverCodeInM1A: 'FORBIDDEN',
      thresholdTuningInM1A: 'FORBIDDEN',
      physicalPromotion: 'FORBIDDEN',
      ordinaryGenerateInvocation: 'FORBIDDEN',
      legacyRetirement: 'FORBIDDEN',
    });
    expect(artifact.finalVerdict).toEqual({
      m1aContracts: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS',
      m1aResearch: 'PARTIAL_AND_CONTRACT_ONLY',
      m1bResearchEntry: 'ALLOWED_AFTER_EXACT_HEAD_GATE_PASS',
      resolverImplementation: 'BLOCKED',
      physicalPromotion: 'BLOCKED',
      nextAction: 'BEGIN_M1B_RESEARCH_FIXTURES_AND_HOLDOUTS',
    });
  });
});

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}
