import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

interface M1BArtifactV1 {
  readonly schemaVersion: 1;
  readonly artifactVersion: 'M1B_STRUCTURE_MATERIAL_RESEARCH_PACKAGE_V1';
  readonly baseCommit: string;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly scientificStatus: 'PARTIAL';
  readonly implementationStatus: 'RESEARCH_PACKAGE_COMPLETE_PENDING_EXACT_HEAD_VALIDATION';
  readonly ordinaryGenerateChanged: false;
  readonly visiblePhysicalOutputChanged: false;
  readonly causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN';
  readonly ruleCounts: {
    readonly provinceRules: 9;
    readonly reviewedForFuturePartialCandidate: 6;
    readonly researchRequiredAmbiguityOnly: 2;
    readonly failClosedUnresolved: 1;
    readonly completeEligible: 0;
  };
  readonly fixtureCounts: {
    readonly total: 18;
    readonly positive: 6;
    readonly threshold: 6;
    readonly negative: 3;
    readonly exception: 1;
    readonly holdout: 2;
    readonly withheldFromCalibration: 2;
    readonly provinceClassesRepresented: 9;
  };
  readonly nextPhaseBoundary: {
    readonly m1cResolverImplementationAuthorizedByThisArtifact: false;
    readonly separateExplicitAuthorizationRequired: true;
    readonly exactHeadValidationRequired: true;
    readonly thresholdCalibration: 'FORBIDDEN';
    readonly physicalPromotion: 'FORBIDDEN';
    readonly ordinaryGenerateInvocation: 'FORBIDDEN';
    readonly legacyRetirement: 'FORBIDDEN';
  };
  readonly finalVerdict: {
    readonly m1bResearchRules: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS';
    readonly m1bFixedCorpus: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS';
    readonly m1bHoldouts: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS';
    readonly resolverImplementation: 'NOT_IMPLEMENTED_AND_NOT_AUTHORIZED';
    readonly physicalPromotion: 'BLOCKED';
    readonly nextAction: 'VALIDATE_EXACT_M1B_HEAD_AND_REVIEW_BEFORE_M1C';
  };
}

const repositoryRoot = process.cwd();
const artifactPath = resolve(repositoryRoot, 'docs/implementation/phase-m/m1b-structure-material-research-package.json');
const statusPath = resolve(repositoryRoot, 'docs/implementation/PHASE_M1B_STRUCTURE_MATERIAL_RESEARCH_PACKAGE_STATUS.md');
const workflowPath = resolve(repositoryRoot, '.github/workflows/m1b-structure-material-research-package.yml');
const resolverPath = resolve(repositoryRoot, 'src/core/causalGeology/structureMaterialResolver.ts');
const artifact = JSON.parse(readFileSync(artifactPath, 'utf8')) as M1BArtifactV1;
const status = readFileSync(statusPath, 'utf8');

const commitPattern = /^[0-9a-f]{40}$/;

describe('M1B structure/material research-package artifact', () => {
  it('records the fixed research corpus without changing physical authority', () => {
    expect(artifact).toMatchObject({
      schemaVersion: 1,
      artifactVersion: 'M1B_STRUCTURE_MATERIAL_RESEARCH_PACKAGE_V1',
      baseCommit: '01c91ffad8576087506913c3778e9cb0495deae0',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      scientificStatus: 'PARTIAL',
      implementationStatus: 'RESEARCH_PACKAGE_COMPLETE_PENDING_EXACT_HEAD_VALIDATION',
      ordinaryGenerateChanged: false,
      visiblePhysicalOutputChanged: false,
      causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN',
      ruleCounts: {
        provinceRules: 9,
        reviewedForFuturePartialCandidate: 6,
        researchRequiredAmbiguityOnly: 2,
        failClosedUnresolved: 1,
        completeEligible: 0,
      },
      fixtureCounts: {
        total: 18,
        positive: 6,
        threshold: 6,
        negative: 3,
        exception: 1,
        holdout: 2,
        withheldFromCalibration: 2,
        provinceClassesRepresented: 9,
      },
    });
    expect(artifact.baseCommit).toMatch(commitPattern);
  });

  it('keeps M1C, threshold calibration, physical promotion, and legacy retirement blocked', () => {
    expect(artifact.nextPhaseBoundary).toEqual({
      m1cResolverImplementationAuthorizedByThisArtifact: false,
      separateExplicitAuthorizationRequired: true,
      exactHeadValidationRequired: true,
      thresholdCalibration: 'FORBIDDEN',
      physicalPromotion: 'FORBIDDEN',
      ordinaryGenerateInvocation: 'FORBIDDEN',
      legacyRetirement: 'FORBIDDEN',
    });
    expect(artifact.finalVerdict).toEqual({
      m1bResearchRules: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS',
      m1bFixedCorpus: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS',
      m1bHoldouts: 'COMPLETE_AFTER_EXACT_HEAD_GATE_PASS',
      resolverImplementation: 'NOT_IMPLEMENTED_AND_NOT_AUTHORIZED',
      physicalPromotion: 'BLOCKED',
      nextAction: 'VALIDATE_EXACT_M1B_HEAD_AND_REVIEW_BEFORE_M1C',
    });
  });

  it('ships a dedicated status record and CI gate but no resolver implementation', () => {
    expect(existsSync(statusPath)).toBe(true);
    expect(status).toContain('M1B turns the M1A province definitions');
    expect(status).toContain('resolver implementation: not implemented and not authorized');
    expect(status).toContain('withheld holdout: 2');
    expect(existsSync(workflowPath)).toBe(true);
    expect(existsSync(resolverPath)).toBe(false);
  });
});
