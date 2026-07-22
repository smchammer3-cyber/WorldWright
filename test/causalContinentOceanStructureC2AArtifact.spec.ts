import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1,
  type ContinentOceanStructureFixtureSetV1,
  type ContinentOceanStructureResearchReviewV1,
  type ContinentOceanStructureRuleSetV1,
} from '../src/core/causalGeology';
import { getAuthorityProcess } from '../src/core/worldAuthority';

interface C2AArtifactV1 {
  readonly schemaVersion: 1;
  readonly reportVersion: 'C2A_STRUCTURAL_ROLE_RESEARCH_PACKAGE_V1';
  readonly baseCommit: string;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly interpretationMode: 'DETACHED_DIAGNOSTIC';
  readonly scientificStatus: 'PARTIAL';
  readonly ordinaryGenerateChanged: false;
  readonly visiblePhysicalOutputChanged: false;
  readonly causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN';
  readonly researchBundleVersion: string;
  readonly ruleSetVersion: string;
  readonly fixtureSetVersion: string;
  readonly sources: {
    readonly total: number;
    readonly primaryPeerReviewed: number;
    readonly authoritativeDataOrModel: number;
    readonly internalControlledScope: number;
    readonly sourceIds: readonly string[];
  };
  readonly genericClaims: {
    readonly total: number;
    readonly reviewed: number;
    readonly claimIds: readonly string[];
  };
  readonly specializedRules: {
    readonly roleRuleCount: number;
    readonly ghostRuleCount: number;
    readonly completeEligibleRuleIds: readonly string[];
    readonly researchRequiredRuleIds: readonly string[];
    readonly orientedGeometryRequiredForLeadingRoles: readonly string[];
    readonly materialOrSurfaceContextRequiredForLeadingRoles: readonly string[];
    readonly provisionalNormalizedBoundaryStatus: string;
  };
  readonly fixtures: {
    readonly total: number;
    readonly kindCounts: Readonly<Record<string, number>>;
    readonly withheldHoldoutIds: readonly string[];
    readonly requiredEvidenceClasses: readonly string[];
  };
  readonly review: {
    readonly status: string;
    readonly reviewDate: string;
    readonly reviewer: string;
    readonly externalPeerReviewClaimed: boolean;
    readonly implementationAuthorized: boolean;
    readonly authorizedScope: string;
  };
  readonly gates: Readonly<Record<string, string>>;
  readonly explicitNonScope: readonly string[];
  readonly nextScope: string;
}

const repositoryRoot = process.cwd();
const researchRoot = resolve(repositoryRoot, 'src/core/causalGeology/research');
const artifact = JSON.parse(readFileSync(resolve(
  repositoryRoot,
  'docs/implementation/phase-c/c2a-structural-role-research-package.json',
), 'utf8')) as C2AArtifactV1;
const ruleSet = readJson<ContinentOceanStructureRuleSetV1>('continent-ocean-structure-role-rules.json');
const fixtureSet = readJson<ContinentOceanStructureFixtureSetV1>('continent-ocean-structure-fixtures.json');
const review = readJson<ContinentOceanStructureResearchReviewV1>('continent-ocean-structure-review-record.json');
const sources = readJson<Array<{ sourceId: string; qualityClass: string }>>('continent-ocean-structure-source-registry.json');
const claims = readJson<Array<{ ruleId: string; evidenceStatus: string }>>('continent-ocean-structure-claim-rules.json');

describe('C2A machine-readable research package artifact', () => {
  it('matches the executable source, rule, fixture, and review package', () => {
    expect(artifact).toMatchObject({
      schemaVersion: 1,
      reportVersion: 'C2A_STRUCTURAL_ROLE_RESEARCH_PACKAGE_V1',
      baseCommit: '3060054b7e862a8a5dc898db83a4d5145868d3ff',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      interpretationMode: 'DETACHED_DIAGNOSTIC',
      scientificStatus: 'PARTIAL',
      ordinaryGenerateChanged: false,
      visiblePhysicalOutputChanged: false,
      causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN',
      researchBundleVersion: review.bundleVersion,
      ruleSetVersion: ruleSet.ruleSetVersion,
      fixtureSetVersion: fixtureSet.fixtureSetVersion,
    });
    expect(artifact.sources).toMatchObject({
      total: sources.length,
      primaryPeerReviewed: sources.filter((entry) => entry.qualityClass === 'PRIMARY_PEER_REVIEWED').length,
      authoritativeDataOrModel: sources.filter((entry) => entry.qualityClass === 'AUTHORITATIVE_DATA_OR_MODEL').length,
      internalControlledScope: sources.filter((entry) => entry.qualityClass === 'INTERNAL_CONTROLLED_ARCHETYPE').length,
      sourceIds: sources.map((entry) => entry.sourceId),
    });
    expect(artifact.genericClaims).toEqual({
      total: claims.length,
      reviewed: claims.filter((entry) => entry.evidenceStatus === 'REVIEWED').length,
      claimIds: claims.map((entry) => entry.ruleId),
    });
    expect(artifact.specializedRules.roleRuleCount).toBe(ruleSet.roleRules.length);
    expect(artifact.specializedRules.ghostRuleCount).toBe(ruleSet.ghostRules.length);
    expect(artifact.specializedRules.completeEligibleRuleIds).toEqual(review.completeEligibleRuleIds);
    expect(artifact.specializedRules.researchRequiredRuleIds).toEqual(review.researchRequiredRuleIds);
    expect(artifact.fixtures.total).toBe(fixtureSet.fixtures.length);
    expect(artifact.fixtures.kindCounts).toEqual(Object.fromEntries(
      ['EXCEPTION', 'HOLDOUT', 'NEGATIVE', 'POSITIVE', 'THRESHOLD'].map((kind) => [
        kind,
        fixtureSet.fixtures.filter((entry) => entry.kind === kind).length,
      ]),
    ));
    expect(artifact.fixtures.withheldHoldoutIds).toEqual(
      fixtureSet.fixtures.filter((entry) => entry.withheldFromCalibration).map((entry) => entry.fixtureId),
    );
    expect(artifact.review).toMatchObject({
      status: review.status,
      reviewDate: review.reviewDate,
      reviewer: review.reviewer,
      externalPeerReviewClaimed: false,
      implementationAuthorized: review.implementationAuthorized,
    });
  });

  it('keeps all roles candidate-only and every physical authority forbidden', () => {
    expect(new Set(ruleSet.roleRules.map((entry) => entry.role))).toEqual(
      new Set(C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1.map((entry) => entry.role)),
    );
    expect(artifact.gates).toMatchObject({
      partialScientificStatus: 'REQUIRED',
      completeEligibleRules: 'FORBIDDEN',
      structuralRoleAuthority: 'FORBIDDEN',
      landWaterAuthority: 'FORBIDDEN',
      bathymetryAuthority: 'FORBIDDEN',
      terrainAuthority: 'FORBIDDEN',
    });
    expect(artifact.specializedRules.provisionalNormalizedBoundaryStatus).toBe(
      'SOFTWARE_CALIBRATION_ONLY_NOT_UNIVERSAL_GEOPHYSICAL_THRESHOLD',
    );
    expect(artifact.review.authorizedScope).toBe('C2B deterministic detached candidate resolver only');
    expect(artifact.explicitNonScope.length).toBeGreaterThan(0);
    expect(artifact.nextScope).toMatch(/C2B detached structural-role candidate resolver/i);

    const process = getAuthorityProcess('CAUSAL_CONTINENT_OCEAN_STRUCTURE_INTERPRETATION');
    expect(process.writes).toEqual(['diagnostics']);
    expect(process.writes).not.toContain('structuralRoleAuthority');
    expect(process.writes).not.toContain('terrain');
    expect(process.modes).toEqual(['CAUSAL_SHADOW']);
  });
});

function readJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(researchRoot, fileName), 'utf8')) as T;
}
