import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1 } from '../src/core/causalGeology';
import { getAuthorityProcess } from '../src/core/worldAuthority';

interface L1AArtifactV1 {
  readonly schemaVersion: 1;
  readonly artifactVersion: 'L1A_DETACHED_LANDFORM_POTENTIAL_CONTRACTS_V1';
  readonly baseCommit: string;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly stateMode: 'DETACHED_DIAGNOSTIC';
  readonly scientificStatus: 'PARTIAL';
  readonly implementationStatus: 'CONTRACTS_COMPLETE_PENDING_EXACT_HEAD_VALIDATION';
  readonly ordinaryGenerateChanged: false;
  readonly visiblePhysicalOutputChanged: false;
  readonly causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN';
  readonly contractCounts: {
    readonly potentialDefinitions: 7;
    readonly researchRequiredPotentialClasses: 6;
    readonly unresolvedPotentialClasses: 1;
    readonly responseModes: 7;
    readonly spatialExpressionCandidates: 7;
    readonly suppressionClasses: 6;
  };
  readonly authorityBoundary: Readonly<Record<string, unknown>>;
  readonly sparseCoverageBoundary: {
    readonly explicitSuppressionClass: 'SPATIAL_COVERAGE_UNRESOLVED';
    readonly arbitraryInterpolationAllowed: false;
    readonly visualGapFillingAllowed: false;
    readonly unresolvedRegionsMustRemainExplicit: true;
  };
  readonly l1bEntryBoundary: Readonly<Record<string, unknown>>;
  readonly finalVerdict: Readonly<Record<string, unknown>>;
}

const repositoryRoot = process.cwd();
const artifactPath = resolve(repositoryRoot, 'docs/implementation/phase-l/l1a-detached-landform-potential-contracts.json');
const statusPath = resolve(repositoryRoot, 'docs/implementation/PHASE_L1A_DETACHED_LANDFORM_POTENTIAL_CONTRACTS_STATUS.md');
const workflowPath = resolve(repositoryRoot, '.github/workflows/l1a-detached-landform-potential-contracts.yml');
const resolverPath = resolve(repositoryRoot, 'src/core/causalGeology/landformPotentialResolver.ts');
const artifact = JSON.parse(readFileSync(artifactPath, 'utf8')) as L1AArtifactV1;
const status = readFileSync(statusPath, 'utf8');
const workflow = readFileSync(workflowPath, 'utf8');
const commitPattern = /^[0-9a-f]{40}$/;

describe('L1A landform-potential contract artifact', () => {
  it('matches the committed vocabulary and diagnostics-only authority boundary', () => {
    expect(artifact).toMatchObject({
      schemaVersion: 1,
      artifactVersion: 'L1A_DETACHED_LANDFORM_POTENTIAL_CONTRACTS_V1',
      baseCommit: 'a7fc1a7b608166ce8bd7dfb73af7b3100003b004',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      stateMode: 'DETACHED_DIAGNOSTIC',
      scientificStatus: 'PARTIAL',
      implementationStatus: 'CONTRACTS_COMPLETE_PENDING_EXACT_HEAD_VALIDATION',
      ordinaryGenerateChanged: false,
      visiblePhysicalOutputChanged: false,
      causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN',
      contractCounts: {
        potentialDefinitions: L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1.length,
        researchRequiredPotentialClasses: 6,
        unresolvedPotentialClasses: 1,
        responseModes: 7,
        spatialExpressionCandidates: 7,
        suppressionClasses: 6,
      },
    });
    expect(artifact.baseCommit).toMatch(commitPattern);

    const authority = getAuthorityProcess('CAUSAL_LANDFORM_POTENTIAL_INTERPRETATION');
    expect(artifact.authorityBoundary).toMatchObject({
      diagnosticProcessId: authority.id,
      owner: authority.owner,
      prerequisite: authority.prerequisites[0],
      reads: authority.reads,
      writes: authority.writes,
      landformPotentialAuthority: false,
      baseTerrainAuthority: false,
      surfaceMaterialAuthority: false,
      finalLandAuthority: false,
      finalWaterAuthority: false,
      bathymetryAuthority: false,
      finalTerrainAuthority: false,
      terrainAuthority: false,
    });
    expect(authority.forbiddenWrites).toContain('landformPotentialAuthority');
    expect(authority.forbiddenWrites).toContain('baseTerrain');
    expect(authority.forbiddenWrites).toContain('finalTerrain');
  });

  it('locks sparse coverage and L1B entry behind explicit review and merge', () => {
    expect(artifact.sparseCoverageBoundary).toEqual({
      explicitSuppressionClass: 'SPATIAL_COVERAGE_UNRESOLVED',
      arbitraryInterpolationAllowed: false,
      visualGapFillingAllowed: false,
      unresolvedRegionsMustRemainExplicit: true,
    });
    expect(artifact.l1bEntryBoundary).toMatchObject({
      allowedAfterExactHeadValidationAndMerge: true,
      sourceRegistryAndReviewedRules: 'ALLOWED_IN_SEPARATE_PHASE',
      fixedFixturesAndHoldouts: 'ALLOWED_IN_SEPARATE_PHASE',
      resolverCodeInL1A: 'FORBIDDEN',
      thresholdCalibrationInL1A: 'FORBIDDEN',
      geometryOrElevationInL1A: 'FORBIDDEN',
      physicalPromotion: 'FORBIDDEN',
      ordinaryGenerateInvocation: 'FORBIDDEN',
      legacyRetirement: 'FORBIDDEN',
    });
    expect(artifact.finalVerdict).toEqual({
      l1aContracts: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS',
      l1aResearch: 'NOT_STARTED',
      l1bResearchEntry: 'ALLOWED_AFTER_EXACT_HEAD_GATE_PASS_AND_MERGE',
      resolverImplementation: 'BLOCKED',
      baseTerrain: 'BLOCKED',
      physicalPromotion: 'BLOCKED',
      nextAction: 'VALIDATE_EXACT_L1A_HEAD_AND_REVIEW_BEFORE_L1B',
    });
  });

  it('ships status and CI records but no landform-potential resolver', () => {
    expect(existsSync(statusPath)).toBe(true);
    expect(existsSync(workflowPath)).toBe(true);
    expect(existsSync(resolverPath)).toBe(false);
    expect(status).toContain('six affirmative families remain `RESEARCH_REQUIRED`');
    expect(status).toContain('SPATIAL_COVERAGE_UNRESOLVED');
    expect(status).toContain('ordinary Generate change: none');
    expect(workflow).toContain('L1A Detached Landform Potential Contracts Gate');
    expect(workflow).toContain('test/causalLandformPotentialL1AContracts.spec.ts');
  });
});
