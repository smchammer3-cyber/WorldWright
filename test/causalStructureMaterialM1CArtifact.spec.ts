import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

interface M1CArtifactV1 {
  readonly schemaVersion: 1;
  readonly artifactVersion: 'M1C_STRUCTURE_MATERIAL_RESOLVER_V1';
  readonly baseCommit: string;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly scientificStatus: 'PARTIAL';
  readonly implementationStatus: 'DETACHED_RESOLVER_IMPLEMENTED_PENDING_EXACT_HEAD_VALIDATION';
  readonly ordinaryGenerateChanged: false;
  readonly visiblePhysicalOutputChanged: false;
  readonly causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN';
  readonly resolver: {
    readonly implementationFile: string;
    readonly authorizationFile: string;
    readonly ruleSetVersion: 'M1B_STRUCTURE_MATERIAL_RULES_V1';
    readonly fixtureSetVersion: 'M1B_STRUCTURE_MATERIAL_FIXTURES_V1';
    readonly authorizationVersion: 'M1C_STRUCTURE_MATERIAL_RESOLVER_AUTHORIZATION_V1';
    readonly candidateConstruction: 'ROLE_SOURCE_LINEAGE_AND_RELATIVE_FIELD_EVIDENCE';
    readonly universalThresholds: false;
    readonly researchRequiredMayLead: false;
    readonly completeEligibleRuleCount: 0;
  };
  readonly fixtureCounts: {
    readonly total: 18;
    readonly positive: 6;
    readonly threshold: 6;
    readonly negative: 3;
    readonly exception: 1;
    readonly holdout: 2;
    readonly withheldFromCalibration: 2;
  };
  readonly authorityBoundary: {
    readonly structureMaterialCauseAuthority: false;
    readonly landformPotentialAuthority: false;
    readonly baseTerrainAuthority: false;
    readonly surfaceMaterialAuthority: false;
    readonly finalLandAuthority: false;
    readonly finalWaterAuthority: false;
    readonly bathymetryAuthority: false;
    readonly terrainAuthority: false;
  };
  readonly nextPhaseBoundary: {
    readonly separateExplicitAuthorizationRequired: true;
    readonly exactHeadValidationRequired: true;
    readonly mergeRequired: true;
    readonly thresholdCalibration: 'FORBIDDEN';
    readonly physicalPromotion: 'FORBIDDEN';
    readonly ordinaryGenerateInvocation: 'FORBIDDEN';
    readonly legacyRetirement: 'FORBIDDEN';
  };
}

const repositoryRoot = process.cwd();
const artifactPath = resolve(repositoryRoot, 'docs/implementation/phase-m/m1c-structure-material-resolver.json');
const statusPath = resolve(repositoryRoot, 'docs/implementation/PHASE_M1C_STRUCTURE_MATERIAL_RESOLVER_STATUS.md');
const workflowPath = resolve(repositoryRoot, '.github/workflows/m1c-structure-material-resolver.yml');
const resolverPath = resolve(repositoryRoot, 'src/core/causalGeology/structureMaterialResolver.ts');
const authorizationPath = resolve(repositoryRoot, 'src/core/causalGeology/research/structure-material-m1c-authorization.json');
const artifact = JSON.parse(readFileSync(artifactPath, 'utf8')) as M1CArtifactV1;
const status = readFileSync(statusPath, 'utf8');
const workflow = readFileSync(workflowPath, 'utf8');
const resolver = readFileSync(resolverPath, 'utf8');
const commitPattern = /^[0-9a-f]{40}$/;

describe('M1C structure/material resolver artifact', () => {
  it('records the detached resolver and complete fixed-corpus boundary', () => {
    expect(artifact).toMatchObject({
      schemaVersion: 1,
      artifactVersion: 'M1C_STRUCTURE_MATERIAL_RESOLVER_V1',
      baseCommit: '1754a105a417b322743ad9da481ee3062ff0ea83',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      scientificStatus: 'PARTIAL',
      implementationStatus: 'DETACHED_RESOLVER_IMPLEMENTED_PENDING_EXACT_HEAD_VALIDATION',
      ordinaryGenerateChanged: false,
      visiblePhysicalOutputChanged: false,
      causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN',
      resolver: {
        ruleSetVersion: 'M1B_STRUCTURE_MATERIAL_RULES_V1',
        fixtureSetVersion: 'M1B_STRUCTURE_MATERIAL_FIXTURES_V1',
        authorizationVersion: 'M1C_STRUCTURE_MATERIAL_RESOLVER_AUTHORIZATION_V1',
        candidateConstruction: 'ROLE_SOURCE_LINEAGE_AND_RELATIVE_FIELD_EVIDENCE',
        universalThresholds: false,
        researchRequiredMayLead: false,
        completeEligibleRuleCount: 0,
      },
      fixtureCounts: {
        total: 18,
        positive: 6,
        threshold: 6,
        negative: 3,
        exception: 1,
        holdout: 2,
        withheldFromCalibration: 2,
      },
    });
    expect(artifact.baseCommit).toMatch(commitPattern);
  });

  it('keeps every physical authority and later promotion path blocked', () => {
    expect(artifact.authorityBoundary).toMatchObject({
      structureMaterialCauseAuthority: false,
      landformPotentialAuthority: false,
      baseTerrainAuthority: false,
      surfaceMaterialAuthority: false,
      finalLandAuthority: false,
      finalWaterAuthority: false,
      bathymetryAuthority: false,
      terrainAuthority: false,
    });
    expect(artifact.nextPhaseBoundary).toEqual({
      separateExplicitAuthorizationRequired: true,
      exactHeadValidationRequired: true,
      mergeRequired: true,
      thresholdCalibration: 'FORBIDDEN',
      physicalPromotion: 'FORBIDDEN',
      ordinaryGenerateInvocation: 'FORBIDDEN',
      legacyRetirement: 'FORBIDDEN',
    });
  });

  it('ships the resolver, authorization, status record, and dedicated CI gate without Generate integration', () => {
    expect(existsSync(resolverPath)).toBe(true);
    expect(existsSync(authorizationPath)).toBe(true);
    expect(existsSync(statusPath)).toBe(true);
    expect(existsSync(workflowPath)).toBe(true);
    expect(status).toContain('M1C implements the first detached source-backed structure/material province resolver');
    expect(status).toContain('withheld holdout: 2');
    expect(status).toContain('ordinary Generate change: none');
    expect(workflow).toContain('M1C Detached Structure Material Resolver Gate');
    expect(workflow).toContain('test/causalStructureMaterialM1CResolver.spec.ts');
    expect(resolver).not.toContain('generateWorld');
    expect(resolver).not.toContain('surfaceExposureSummary as');
    expect(resolver).not.toContain('CAUSAL_ACTIVE');
  });
});
