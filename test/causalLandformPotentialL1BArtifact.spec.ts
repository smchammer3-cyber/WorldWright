import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getAuthorityProcess } from '../src/core/worldAuthority';

interface L1BArtifactV1 {
  readonly schemaVersion: 1;
  readonly artifactVersion: 'L1B_LANDFORM_POTENTIAL_RESEARCH_PACKAGE_V1';
  readonly baseCommit: string;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly scientificStatus: 'PARTIAL';
  readonly implementationStatus: 'RESEARCH_PACKAGE_COMPLETE_PENDING_EXACT_HEAD_VALIDATION';
  readonly ordinaryGenerateChanged: false;
  readonly visiblePhysicalOutputChanged: false;
  readonly causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN';
  readonly researchFoundation: {
    readonly sources: 17;
    readonly externalSources: 16;
    readonly primaryPeerReviewedSources: 15;
    readonly reviewOrSynthesisSources: 1;
    readonly internalScopeSources: 1;
    readonly genericClaimRules: 21;
    readonly independentCorrelationGroups: 17;
    readonly directInitialInputBypassAllowed: false;
    readonly internalScopeControlMayEstablishScientificPotential: false;
  };
  readonly ruleCounts: {
    readonly potentialRules: 7;
    readonly reviewedForFuturePartialCandidate: 5;
    readonly researchRequiredAmbiguityOnly: 1;
    readonly failClosedUnresolved: 1;
    readonly suppressionRules: 6;
    readonly completeEligible: 0;
  };
  readonly fixtureCounts: {
    readonly total: 20;
    readonly positive: 6;
    readonly boundary: 6;
    readonly negative: 4;
    readonly exception: 2;
    readonly holdout: 2;
    readonly withheldFromRuleDevelopment: 2;
    readonly potentialClassesRepresented: 7;
    readonly suppressionClassesRepresented: 6;
  };
  readonly frozenHoldouts: readonly string[];
  readonly authorityBoundary: Readonly<Record<string, unknown>>;
  readonly nextPhaseBoundary: {
    readonly l1cResolverImplementationAuthorizedByThisArtifact: false;
    readonly resolverEvaluationAuthorizedByThisArtifact: false;
    readonly separateExplicitAuthorizationRequired: true;
    readonly exactHeadValidationRequired: true;
    readonly thresholdCalibration: 'FORBIDDEN';
    readonly geometryOrTerrain: 'FORBIDDEN';
    readonly physicalPromotion: 'FORBIDDEN';
    readonly ordinaryGenerateIntegration: 'FORBIDDEN';
    readonly legacyRetirement: 'FORBIDDEN';
  };
  readonly finalVerdict: {
    readonly l1bResearchFoundation: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS';
    readonly l1bResearchRules: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS';
    readonly l1bSuppressionContracts: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS';
    readonly l1bFixedCorpus: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS';
    readonly l1bFrozenHoldouts: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS';
    readonly resolverImplementation: 'NOT_IMPLEMENTED_AND_NOT_AUTHORIZED';
    readonly resolverEvaluation: 'NOT_AUTHORIZED';
    readonly physicalPromotion: 'BLOCKED';
    readonly nextAction: 'VALIDATE_EXACT_L1B_HEAD_AND_STOP_PENDING_SEPARATE_AUTHORIZATION';
  };
}

const repositoryRoot = process.cwd();
const artifactPath = resolve(
  repositoryRoot,
  'docs/implementation/phase-l/l1b-landform-potential-research-package.json',
);
const statusPath = resolve(
  repositoryRoot,
  'docs/implementation/PHASE_L1B_LANDFORM_POTENTIAL_RESEARCH_PACKAGE_STATUS.md',
);
const workflowPath = resolve(
  repositoryRoot,
  '.github/workflows/l1b-landform-potential-research-package.yml',
);
const currentStatusPath = resolve(
  repositoryRoot,
  'docs/implementation/causal-program-current-status.json',
);
const resolverPath = resolve(
  repositoryRoot,
  'src/core/causalGeology/landformPotentialResolver.ts',
);
const artifact = JSON.parse(readFileSync(artifactPath, 'utf8')) as L1BArtifactV1;
const status = readFileSync(statusPath, 'utf8');
const workflow = readFileSync(workflowPath, 'utf8');
const currentStatus = readFileSync(currentStatusPath, 'utf8');
const commitPattern = /^[0-9a-f]{40}$/;

describe('L1B landform-potential research-package artifact', () => {
  it('records the exact research foundation, rules, and fixed corpus', () => {
    expect(artifact).toMatchObject({
      schemaVersion: 1,
      artifactVersion: 'L1B_LANDFORM_POTENTIAL_RESEARCH_PACKAGE_V1',
      baseCommit: 'c24233b16fdd1f9321328d9a2fe24814a8e15f43',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      scientificStatus: 'PARTIAL',
      implementationStatus: 'RESEARCH_PACKAGE_COMPLETE_PENDING_EXACT_HEAD_VALIDATION',
      ordinaryGenerateChanged: false,
      visiblePhysicalOutputChanged: false,
      causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN',
      researchFoundation: {
        sources: 17,
        externalSources: 16,
        primaryPeerReviewedSources: 15,
        reviewOrSynthesisSources: 1,
        internalScopeSources: 1,
        genericClaimRules: 21,
        independentCorrelationGroups: 17,
        directInitialInputBypassAllowed: false,
        internalScopeControlMayEstablishScientificPotential: false,
      },
      ruleCounts: {
        potentialRules: 7,
        reviewedForFuturePartialCandidate: 5,
        researchRequiredAmbiguityOnly: 1,
        failClosedUnresolved: 1,
        suppressionRules: 6,
        completeEligible: 0,
      },
      fixtureCounts: {
        total: 20,
        positive: 6,
        boundary: 6,
        negative: 4,
        exception: 2,
        holdout: 2,
        withheldFromRuleDevelopment: 2,
        potentialClassesRepresented: 7,
        suppressionClassesRepresented: 6,
      },
    });
    expect(artifact.baseCommit).toMatch(commitPattern);
    expect(artifact.frozenHoldouts).toEqual([
      'holdout/mixed-rift-magmatic-transition-v1',
      'holdout/orogenic-strength-thickening-overlap-v1',
    ]);
  });

  it('keeps L1B diagnostic-only and grants no downstream authorization', () => {
    const authority = getAuthorityProcess('CAUSAL_LANDFORM_POTENTIAL_INTERPRETATION');
    expect(artifact.authorityBoundary).toMatchObject({
      diagnosticProcessId: authority.id,
      writes: ['diagnostics'],
      landformPotentialAuthority: false,
      baseTerrainAuthority: false,
      surfaceMaterialAuthority: false,
      finalLandAuthority: false,
      finalWaterAuthority: false,
      bathymetryAuthority: false,
      finalTerrainAuthority: false,
      terrainAuthority: false,
    });
    expect(artifact.nextPhaseBoundary).toEqual({
      l1cResolverImplementationAuthorizedByThisArtifact: false,
      resolverEvaluationAuthorizedByThisArtifact: false,
      separateExplicitAuthorizationRequired: true,
      exactHeadValidationRequired: true,
      thresholdCalibration: 'FORBIDDEN',
      geometryOrTerrain: 'FORBIDDEN',
      physicalPromotion: 'FORBIDDEN',
      ordinaryGenerateIntegration: 'FORBIDDEN',
      legacyRetirement: 'FORBIDDEN',
    });
    expect(artifact.finalVerdict).toEqual({
      l1bResearchFoundation: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS',
      l1bResearchRules: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS',
      l1bSuppressionContracts: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS',
      l1bFixedCorpus: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS',
      l1bFrozenHoldouts: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS',
      resolverImplementation: 'NOT_IMPLEMENTED_AND_NOT_AUTHORIZED',
      resolverEvaluation: 'NOT_AUTHORIZED',
      physicalPromotion: 'BLOCKED',
      nextAction: 'VALIDATE_EXACT_L1B_HEAD_AND_STOP_PENDING_SEPARATE_AUTHORIZATION',
    });
  });

  it('ships status and CI records but no resolver, terrain, Generate, or promotion path', () => {
    expect(existsSync(statusPath)).toBe(true);
    expect(existsSync(workflowPath)).toBe(true);
    expect(existsSync(resolverPath)).toBe(false);
    expect(status).toContain('It does not implement or evaluate a landform-potential resolver.');
    expect(status).toContain('ordinary Generate change: none');
    expect(status).toContain('authority promotion: blocked');
    expect(workflow).toContain('L1B Landform Potential Research Package Gate');
    expect(workflow).toContain('test/causalLandformPotentialL1BResearchPackage.spec.ts');
    expect(workflow).toContain('test/causalLandformPotentialL1BArtifact.spec.ts');
    expect(currentStatus).toContain(
      '"currentAuthorizedScope": "NONE_AFTER_L1B_RESEARCH_PENDING_SEPARATE_EXPLICIT_AUTHORIZATION"',
    );
    expect(currentStatus).toContain('"resolverImplementationAuthorized": false');
    expect(currentStatus).toContain('"ordinaryGenerateIntegrationAuthorized": false');
    expect(currentStatus).toContain('"physicalPromotionAuthorized": false');
  });
});
