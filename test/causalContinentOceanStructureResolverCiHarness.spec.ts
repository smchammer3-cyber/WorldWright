import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  C2B_CONTINENT_OCEAN_STRUCTURE_BUDGET_V1,
  createCausalProcessFieldProjectionSet,
  createContinentOceanStructureResolverResearchContext,
  createScientificResearchBundle,
  createSphericalAnchor,
  createSphericalExtent,
  freezeContinentOceanStructureFixtureSet,
  freezeContinentOceanStructureRuleSet,
  hashCausalPayload,
  resolveContinentOceanStructureFromProjection,
  resolveContinentOceanStructureInterpretation,
  type ContinentOceanStructureEvidenceRegionV1,
  type ContinentOceanStructureFixtureSetV1,
  type ContinentOceanStructureResearchReviewV1,
  type ContinentOceanStructureRuleSetV1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
} from '../src/core/causalGeology';

const repositoryRoot = process.cwd();
const researchRoot = resolve(repositoryRoot, 'src/core/causalGeology/research');
const artifactRoot = resolve(
  repositoryRoot,
  process.env.CAUSAL_CONTINENT_OCEAN_C2B_CI_OUT ?? 'artifacts/c2b-structural-role-resolver-gate',
);
const sources = readResearchJson<ScientificSourceV1[]>('continent-ocean-structure-source-registry.json');
const genericRules = readResearchJson<ScientificClaimRuleV1[]>('continent-ocean-structure-claim-rules.json');
const correlationGroups = readResearchJson<string[]>('continent-ocean-structure-correlation-groups.json');
const knownLimitations = readResearchJson<string[]>('continent-ocean-structure-known-limitations.json');
const ruleSet = freezeContinentOceanStructureRuleSet(
  readResearchJson<ContinentOceanStructureRuleSetV1>('continent-ocean-structure-role-rules.json'),
);
const fixtureSet = freezeContinentOceanStructureFixtureSet(
  readResearchJson<ContinentOceanStructureFixtureSetV1>('continent-ocean-structure-fixtures.json'),
);
const review = readResearchJson<ContinentOceanStructureResearchReviewV1>('continent-ocean-structure-review-record.json');
const researchBundle = createScientificResearchBundle({
  bundleVersion: review.bundleVersion,
  sources,
  claimRules: genericRules,
  correlationGroups,
  knownLimitations,
});
const researchContext = createContinentOceanStructureResolverResearchContext({
  researchBundle,
  ruleSet,
  review,
});

describe('C2B detached structural-role resolver CI harness', () => {
  it('passes the complete fixed C2A corpus, including negatives, exception, and withheld holdouts', () => {
    rmSync(artifactRoot, { recursive: true, force: true });
    mkdirSync(artifactRoot, { recursive: true });
    const caseReports: Array<Record<string, unknown>> = [];
    const interpretationHashes = new Set<string>();

    for (const [index, fixture] of fixtureSet.fixtures.entries()) {
      const evidenceRegion = evidenceRegionForFixture(fixture, index);
      const sourcePremiseHash = hashCausalPayload('WorldWright/c2b-fixture-premise/v1', {
        fixtureId: fixture.fixtureId,
        bodyClasses: fixture.premiseBodyClassCandidates,
      });
      const sourceGeologicSpineHash = hashCausalPayload('WorldWright/c2b-fixture-spine/v1', {
        fixtureId: fixture.fixtureId,
        sourceFamilies: fixture.sourceFamilies,
      });
      const sourceProcessFieldProjectionHash = hashCausalPayload('WorldWright/c2b-fixture-projection/v1', {
        fixtureId: fixture.fixtureId,
        fieldValues: fixture.fieldValues,
      });
      const startTime = performance.now();
      const interpretation = resolveContinentOceanStructureInterpretation({
        sourcePremiseHash,
        sourceGeologicSpineHash,
        sourceProcessFieldProjectionHash,
        evidenceRegions: [evidenceRegion],
        researchContext,
      });
      const durationMilliseconds = performance.now() - startTime;
      const replay = resolveContinentOceanStructureInterpretation({
        sourcePremiseHash,
        sourceGeologicSpineHash,
        sourceProcessFieldProjectionHash,
        evidenceRegions: [evidenceRegion],
        researchContext,
      });
      expect(interpretation).toEqual(replay);
      expect(interpretation.status).toBe('PARTIAL');
      expect(interpretation.authorityMode).toBe('CAUSAL_SHADOW');
      expect(interpretation.physicalGeneratorAuthority).toBe('LEGACY');
      expect(interpretation.interpretationMode).toBe('DETACHED_DIAGNOSTIC');
      expect(interpretation.regions).toHaveLength(1);
      expect(durationMilliseconds).toBeLessThanOrEqual(C2B_CONTINENT_OCEAN_STRUCTURE_BUDGET_V1.maximumResolverMillisecondsPerRegion);
      expect(Buffer.byteLength(JSON.stringify(interpretation), 'utf8')).toBeLessThanOrEqual(
        C2B_CONTINENT_OCEAN_STRUCTURE_BUDGET_V1.maximumSerializedInterpretationBytes,
      );

      const region = interpretation.regions[0];
      const roles = region.roleCandidates.map((candidate) => candidate.role);
      const ghostRisks = region.ghostRiskCandidates.map((candidate) => candidate.risk);
      for (const requiredRole of fixture.expected.requiredRoleCandidates) expect(roles).toContain(requiredRole);
      for (const role of roles) expect(fixture.expected.allowedRoleCandidates).toContain(role);
      expect(fixture.expected.allowedResolutionStatuses).toContain(region.resolutionStatus);
      if (region.leadingRole) expect(fixture.expected.forbiddenLeadingRoles).not.toContain(region.leadingRole);
      for (const requiredRisk of fixture.expected.requiredGhostRisks) expect(ghostRisks).toContain(requiredRisk);
      for (const recommendation of fixture.expected.requiredSuppressionRecommendations) {
        expect(region.suppressionRecommendations).toContain(recommendation);
      }
      if (fixture.kind === 'NEGATIVE' || fixture.kind === 'EXCEPTION') {
        expect(region.resolutionStatus).toBe('UNRESOLVED');
        expect(roles).toContain('STRUCTURALLY_UNRESOLVED');
      }
      if (fixture.kind === 'HOLDOUT') expect(fixture.withheldFromCalibration).toBe(true);
      if (fixture.kind === 'THRESHOLD') expect(region.resolutionStatus).not.toBe('SINGLE_LEADING_CANDIDATE');
      expect(Object.isFrozen(interpretation)).toBe(true);
      expect(Object.isFrozen(region.roleCandidates)).toBe(true);
      expect(JSON.stringify(interpretation)).not.toContain('baseHeight');
      expect(JSON.stringify(interpretation)).not.toContain('landMask');
      expect(JSON.stringify(interpretation)).not.toContain('waterMask');
      expect(JSON.stringify(interpretation)).not.toContain('seaLevel');
      expect(JSON.stringify(interpretation)).not.toContain('bathymetry');
      expect(JSON.stringify(interpretation)).not.toContain('rendererColor');
      expect(JSON.stringify(interpretation)).not.toContain('WorldBrain');
      interpretationHashes.add(interpretation.contentHash.value);

      const caseReport = {
        schemaVersion: 1,
        fixtureId: fixture.fixtureId,
        kind: fixture.kind,
        withheldFromCalibration: fixture.withheldFromCalibration,
        interpretationHash: interpretation.contentHash.value,
        resolutionStatus: region.resolutionStatus,
        leadingRole: region.leadingRole,
        roles,
        ghostRisks,
        suppressionRecommendations: region.suppressionRecommendations,
        durationMilliseconds,
        serializedBytes: Buffer.byteLength(JSON.stringify(interpretation), 'utf8'),
      };
      caseReports.push(caseReport);
      writeJson(resolve(artifactRoot, 'cases', `${safeFileName(fixture.fixtureId)}.json`), caseReport);
    }

    expect(interpretationHashes.size).toBe(fixtureSet.fixtures.length);
    expect(caseReports.filter((entry) => entry.withheldFromCalibration)).toHaveLength(2);
    writeJson(resolve(artifactRoot, 'c2b-resolver-report.json'), {
      schemaVersion: 1,
      reportVersion: 'C2B_DETACHED_STRUCTURAL_ROLE_RESOLVER_REPORT_V1',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      interpretationMode: 'DETACHED_DIAGNOSTIC',
      scientificStatus: 'PARTIAL',
      softwareGatePass: true,
      fixtureCount: fixtureSet.fixtures.length,
      uniqueInterpretationHashCount: interpretationHashes.size,
      holdoutCount: caseReports.filter((entry) => entry.withheldFromCalibration).length,
      budgets: C2B_CONTINENT_OCEAN_STRUCTURE_BUDGET_V1,
      cases: caseReports,
      limitations: [
        'C2B thresholds remain provisional controlled software calibration rather than universal geophysical constants.',
        'Radial process fields do not independently establish oriented margins, ridges, arcs, trenches, sutures, or spreading direction.',
        'Shelf, slope, and drowned-fragment candidates require later material or surface context before leading authority.',
        'No structural-role, land, water, bathymetry, material, terrain, rendering, or canonical-world authority is granted.',
      ],
      nextScope: 'C3 Phase C completion and readiness evidence before Phase M',
    });
  });

  it('integrates a validated Phase D projection and rejects mismatched spine lineage', () => {
    const sourcePremiseHash = hashCausalPayload('WorldWright/c2b-live-premise/v1', { bodyClass: 'ROCKY_TERRESTRIAL' });
    const sourceGeologicSpineHash = hashCausalPayload('WorldWright/c2b-live-spine/v1', { nodeId: 'continental-kernel-live' });
    const anchor = createSphericalAnchor(12, 24);
    const kernels = [
      ['continentalKernelInfluence', 0.8],
      ['formationAgeSummary', 0.65],
      ['persistenceSummary', 0.7],
      ['preservationSummary', 0.65],
      ['projectionConfidence', 0.8],
    ].map(([fieldId, peakValue]) => ({
      schemaVersion: 1 as const,
      kernelId: `continental-kernel-live::${fieldId}`,
      fieldId: fieldId as 'continentalKernelInfluence' | 'formationAgeSummary' | 'persistenceSummary' | 'preservationSummary' | 'projectionConfidence',
      sourceNodeId: 'continental-kernel-live',
      sourceNodeFamily: 'CONTINENTAL_KERNEL' as const,
      anchor,
      angularRadiusDegrees: 30,
      peakValue: peakValue as number,
      temporalWeight: 1,
      preservationWeight: 1,
      falloff: 'COSINE_COMPACT_SUPPORT_V1' as const,
      evidenceIds: ['evidence.c2b.live-projection'],
    })).sort((a, b) => a.kernelId.localeCompare(b.kernelId));
    const projection = createCausalProcessFieldProjectionSet({
      sourceRegimeHistoryHash: hashCausalPayload('WorldWright/c2b-live-history/v1', { epoch: 'controlled' }),
      sourceGeologicSpineHash,
      kernels,
      evidenceIds: ['evidence.c2b.live-projection'],
      limitations: ['C2B live-projection integration fixture.'],
    });

    const interpretation = resolveContinentOceanStructureFromProjection({
      sourcePremiseHash,
      sourceGeologicSpineHash,
      premiseBodyClassCandidates: ['ROCKY_TERRESTRIAL'],
      projection,
      regions: [{
        regionId: 'live-continental-interior',
        anchor,
        extent: createSphericalExtent(20),
      }],
      researchContext,
    });
    expect(interpretation.regions[0]).toMatchObject({
      resolutionStatus: 'SINGLE_LEADING_CANDIDATE',
      leadingRole: 'CONTINENTAL_INTERIOR',
    });
    expect(interpretation.regions[0].roleCandidates.map((candidate) => candidate.role)).toEqual(['CONTINENTAL_INTERIOR']);

    expect(() => resolveContinentOceanStructureFromProjection({
      sourcePremiseHash,
      sourceGeologicSpineHash: hashCausalPayload('WorldWright/c2b-live-spine/v1', { nodeId: 'wrong' }),
      premiseBodyClassCandidates: ['ROCKY_TERRESTRIAL'],
      projection,
      regions: [{
        regionId: 'live-lineage-rejection',
        anchor,
        extent: createSphericalExtent(20),
      }],
      researchContext,
    })).toThrow(/does not belong to the supplied geologic-spine source hash/i);
  });
});

function evidenceRegionForFixture(
  fixture: ContinentOceanStructureFixtureSetV1['fixtures'][number],
  index: number,
): ContinentOceanStructureEvidenceRegionV1 {
  return {
    schemaVersion: 1,
    regionId: fixture.fixtureId,
    anchor: createSphericalAnchor(-72 + index * 9, -165 + index * 21),
    extent: createSphericalExtent(12 + (index % 4) * 3),
    premiseBodyClassCandidates: fixture.premiseBodyClassCandidates,
    fieldValues: fixture.fieldValues,
    sourceNodes: fixture.sourceFamilies
      .map((family, familyIndex) => ({
        schemaVersion: 1 as const,
        nodeId: `${fixture.fixtureId}::${String(familyIndex).padStart(2, '0')}::${family}`,
        family,
      }))
      .sort((a, b) => a.nodeId.localeCompare(b.nodeId)),
  };
}

function safeFileName(value: string): string {
  return value.replace(/[^a-zA-Z0-9._-]+/g, '-');
}

function readResearchJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(researchRoot, fileName), 'utf8')) as T;
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(resolve(path, '..'), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}
