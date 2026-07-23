import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  M1C_STRUCTURE_MATERIAL_RESOLVER_BUDGET_V1,
  createCausalProcessFieldProjectionSet,
  createContinentOceanStructureInterpretation,
  createScientificRange,
  createScientificResearchBundle,
  createSphericalAnchor,
  createSphericalExtent,
  createStructureMaterialResolverResearchContext,
  hashCausalPayload,
  resolveStructureMaterialFromProjection,
  resolveStructureMaterialState,
  validateStructureMaterialM1CAuthorization,
  validateStructureMaterialState,
  type CausalProcessFieldProjectionKernelV1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
  type StructureMaterialEvidenceRegionV1,
  type StructureMaterialFixtureSetV1,
  type StructureMaterialM1BResearchReviewV1,
  type StructureMaterialM1CAuthorizationV1,
  type StructureMaterialRuleSetV1,
} from '../src/core/causalGeology';

const repositoryRoot = process.cwd();
const researchRoot = resolve(repositoryRoot, 'src/core/causalGeology/research');
const sources = readJson<ScientificSourceV1[]>('structure-material-source-registry.json');
const genericClaims = readJson<ScientificClaimRuleV1[]>('structure-material-claim-rules.json');
const correlationGroups = readJson<string[]>('structure-material-correlation-groups.json');
const knownLimitations = readJson<string[]>('structure-material-known-limitations.json');
const rules = readJson<StructureMaterialRuleSetV1>('structure-material-m1b-rules.json');
const fixtures = readJson<StructureMaterialFixtureSetV1>('structure-material-m1b-fixtures.json');
const m1bReview = readJson<StructureMaterialM1BResearchReviewV1>('structure-material-m1b-review-record.json');
const authorization = readJson<StructureMaterialM1CAuthorizationV1>('structure-material-m1c-authorization.json');
const bundle = createScientificResearchBundle({
  bundleVersion: m1bReview.bundleVersion,
  sources,
  claimRules: genericClaims,
  correlationGroups,
  knownLimitations,
});
const context = createStructureMaterialResolverResearchContext({
  researchBundle: bundle,
  ruleSet: rules,
  fixtureSet: fixtures,
  m1bReview,
  authorization,
});

const forbiddenPhysicalKeys = new Set([
  'baseHeight',
  'baseTerrain',
  'bathymetry',
  'bathymetryDepth',
  'depthMap',
  'finalTerrain',
  'landMask',
  'rendererColor',
  'seaLevel',
  'surfaceExposureSummary',
  'surfaceMaterial',
  'terrain',
  'waterMask',
  'WorldBrain',
]);

describe('M1C detached structure/material resolver', () => {
  it('passes the complete M1B fixed corpus, including negatives, exception, thresholds, and withheld holdouts', () => {
    const stateHashes = new Set<string>();
    for (const [index, fixture] of fixtures.fixtures.entries()) {
      const evidenceRegion = evidenceRegionForFixture(fixture, index);
      const hashes = hashesForFixture(fixture.fixtureId);
      const startedAt = performance.now();
      const state = resolveStructureMaterialState({
        ...hashes,
        evidenceRegions: [evidenceRegion],
        researchContext: context,
      });
      const durationMilliseconds = performance.now() - startedAt;
      const replay = resolveStructureMaterialState({
        ...hashes,
        evidenceRegions: [evidenceRegion],
        researchContext: context,
      });

      validateStructureMaterialState(state);
      expect(state).toEqual(replay);
      expect(state).toMatchObject({
        authorityMode: 'CAUSAL_SHADOW',
        physicalGeneratorAuthority: 'LEGACY',
        stateMode: 'DETACHED_DIAGNOSTIC',
        scientificStatus: 'PARTIAL',
        structureMaterialCauseAuthority: false,
        landformPotentialAuthority: false,
        baseTerrainAuthority: false,
        surfaceMaterialAuthority: false,
        finalLandAuthority: false,
        finalWaterAuthority: false,
        bathymetryAuthority: false,
        terrainAuthority: false,
      });
      expect(durationMilliseconds).toBeLessThanOrEqual(
        M1C_STRUCTURE_MATERIAL_RESOLVER_BUDGET_V1.maximumResolverMillisecondsPerRegion,
      );
      expect(state.regions).toHaveLength(1);
      const region = state.regions[0];
      const candidateClasses = region.provinceCandidates.map((candidate) => candidate.provinceClass);
      for (const required of fixture.expected.requiredProvinceCandidates) expect(candidateClasses).toContain(required);
      for (const candidateClass of candidateClasses) expect(fixture.expected.allowedProvinceCandidates).toContain(candidateClass);
      expect(fixture.expected.allowedResolutionStatuses).toContain(region.resolutionStatus);
      if (region.leadingProvinceClass) {
        expect(fixture.expected.forbiddenLeadingProvinceClasses).not.toContain(region.leadingProvinceClass);
      }
      const terrainPermissions = new Set(region.provinceCandidates.flatMap((candidate) => candidate.terrainTermPermissionCandidates));
      for (const required of fixture.expected.requiredTerrainTermPermissionCandidates) expect(terrainPermissions.has(required)).toBe(true);
      for (const candidate of region.provinceCandidates) {
        if (candidate.provinceClass === 'EXHUMED_MANTLE_TRANSITION' || candidate.provinceClass === 'MIXED_TRANSITIONAL_PROVINCE') {
          expect(region.leadingProvinceClass).not.toBe(candidate.provinceClass);
        }
      }
      if (fixture.kind === 'NEGATIVE' || fixture.kind === 'EXCEPTION') {
        expect(region.resolutionStatus).toBe('UNRESOLVED');
        expect(candidateClasses).toContain('STRUCTURE_MATERIAL_UNRESOLVED');
      }
      if (fixture.kind === 'HOLDOUT') expect(fixture.withheldFromCalibration).toBe(true);
      expect(Object.isFrozen(state)).toBe(true);
      expect(Object.isFrozen(region.provinceCandidates)).toBe(true);
      expect(findForbiddenKeys(state)).toEqual([]);
      stateHashes.add(state.contentHash.value);
    }
    expect(stateHashes.size).toBe(fixtures.fixtures.length);
    expect(fixtures.fixtures.filter((fixture) => fixture.withheldFromCalibration)).toHaveLength(2);
  });

  it('integrates detached process fields and structural roles while enforcing exact source lineage', () => {
    const sourcePremiseHash = hashCausalPayload('WorldWright/test/m1c-live-premise/v1', { body: 'ROCKY_TERRESTRIAL' });
    const sourceInteriorStateHash = hashCausalPayload('WorldWright/test/m1c-live-interior/v1', { regime: 'MOBILE_LID' });
    const sourceRegimeHistoryHash = hashCausalPayload('WorldWright/test/m1c-live-history/v1', { epoch: 'controlled' });
    const sourceGeologicSpineHash = hashCausalPayload('WorldWright/test/m1c-live-spine/v1', { node: 'continental-kernel-live' });
    const anchor = createSphericalAnchor(12, 24);
    const kernels: CausalProcessFieldProjectionKernelV1[] = [
      {
        schemaVersion: 1,
        kernelId: 'continental-kernel-live::continentalKernelInfluence',
        fieldId: 'continentalKernelInfluence',
        sourceNodeId: 'continental-kernel-live',
        sourceNodeFamily: 'CONTINENTAL_KERNEL',
        anchor,
        angularRadiusDegrees: 30,
        peakValue: 0.86,
        temporalWeight: 1,
        preservationWeight: 1,
        falloff: 'COSINE_COMPACT_SUPPORT_V1',
        evidenceIds: ['evidence.m1c.live-continental'],
      },
      {
        schemaVersion: 1,
        kernelId: 'continental-kernel-live::formationAgeSummary',
        fieldId: 'formationAgeSummary',
        sourceNodeId: 'continental-kernel-live',
        sourceNodeFamily: 'CONTINENTAL_KERNEL',
        anchor,
        angularRadiusDegrees: 30,
        peakValue: 0.79,
        temporalWeight: 1,
        preservationWeight: 1,
        falloff: 'COSINE_COMPACT_SUPPORT_V1',
        evidenceIds: ['evidence.m1c.live-continental'],
      },
      {
        schemaVersion: 1,
        kernelId: 'continental-kernel-live::persistenceSummary',
        fieldId: 'persistenceSummary',
        sourceNodeId: 'continental-kernel-live',
        sourceNodeFamily: 'CONTINENTAL_KERNEL',
        anchor,
        angularRadiusDegrees: 30,
        peakValue: 0.83,
        temporalWeight: 1,
        preservationWeight: 1,
        falloff: 'COSINE_COMPACT_SUPPORT_V1',
        evidenceIds: ['evidence.m1c.live-continental'],
      },
      {
        schemaVersion: 1,
        kernelId: 'continental-kernel-live::preservationSummary',
        fieldId: 'preservationSummary',
        sourceNodeId: 'continental-kernel-live',
        sourceNodeFamily: 'CONTINENTAL_KERNEL',
        anchor,
        angularRadiusDegrees: 30,
        peakValue: 0.74,
        temporalWeight: 1,
        preservationWeight: 1,
        falloff: 'COSINE_COMPACT_SUPPORT_V1',
        evidenceIds: ['evidence.m1c.live-continental'],
      },
      {
        schemaVersion: 1,
        kernelId: 'continental-kernel-live::projectionConfidence',
        fieldId: 'projectionConfidence',
        sourceNodeId: 'continental-kernel-live',
        sourceNodeFamily: 'CONTINENTAL_KERNEL',
        anchor,
        angularRadiusDegrees: 30,
        peakValue: 0.82,
        temporalWeight: 1,
        preservationWeight: 1,
        falloff: 'COSINE_COMPACT_SUPPORT_V1',
        evidenceIds: ['evidence.m1c.live-continental'],
      },
    ];
    const projection = createCausalProcessFieldProjectionSet({
      sourceRegimeHistoryHash,
      sourceGeologicSpineHash,
      kernels,
      evidenceIds: ['evidence.m1c.live-continental'],
      limitations: ['M1C live integration projection fixture.'],
    });
    const structuralInterpretation = createContinentOceanStructureInterpretation({
      sourcePremiseHash,
      sourceGeologicSpineHash,
      sourceProcessFieldProjectionHash: projection.contentHash,
      regions: [{
        schemaVersion: 1,
        regionId: 'live-continental-interior',
        anchor,
        extent: createSphericalExtent(12),
        resolutionStatus: 'SINGLE_LEADING_CANDIDATE',
        leadingRole: 'CONTINENTAL_INTERIOR',
        roleCandidates: [{
          schemaVersion: 1,
          role: 'CONTINENTAL_INTERIOR',
          supportRange: createScientificRange(0.72, 0.86, 'normalized-0-1', 'normalized-0-1-v1', 'm1c.live.structural-support'),
          sourceFieldIds: ['continentalKernelInfluence', 'formationAgeSummary', 'persistenceSummary', 'preservationSummary'],
          sourceNodeIds: ['continental-kernel-live'],
          rationaleIds: ['m1c.live.continental-role'],
          evidenceIds: ['evidence.m1c.live-continental'],
        }],
        ghostRiskCandidates: [],
        suppressionRecommendations: ['NO_SUPPRESSION_RECOMMENDATION'],
        unresolvedReasonIds: [],
        confidenceAssessmentSubject: 'm1c.live.structural-region',
        evidenceIds: ['evidence.m1c.live-continental'],
        contradictionIds: [],
        limitations: ['M1C live structural interpretation fixture.'],
      }],
      evidenceIds: ['evidence.m1c.live-continental'],
      limitations: ['M1C live structural interpretation fixture.'],
    });

    const state = resolveStructureMaterialFromProjection({
      sourcePremiseHash,
      sourceInteriorStateHash,
      sourceRegimeHistoryHash,
      sourceGeologicSpineHash,
      premiseBodyClassCandidates: ['ROCKY_TERRESTRIAL'],
      projection,
      structuralInterpretation,
      researchContext: context,
    });
    expect(state.regions[0]).toMatchObject({
      resolutionStatus: 'SINGLE_LEADING_CANDIDATE',
      leadingProvinceClass: 'STABLE_CONTINENTAL_ROOT',
    });
    expect(state.regions[0].provinceCandidates.map((candidate) => candidate.provinceClass)).toEqual([
      'STABLE_CONTINENTAL_ROOT',
    ]);

    expect(() => resolveStructureMaterialFromProjection({
      sourcePremiseHash,
      sourceInteriorStateHash,
      sourceRegimeHistoryHash,
      sourceGeologicSpineHash: hashCausalPayload('WorldWright/test/m1c-live-spine/v1', { node: 'wrong' }),
      premiseBodyClassCandidates: ['ROCKY_TERRESTRIAL'],
      projection,
      structuralInterpretation,
      researchContext: context,
    })).toThrow(/does not belong to the supplied geologic-spine source/i);
  });

  it('fails closed for weakened authorization, surface evidence, legacy morphology, and research-class promotion', () => {
    const promotedAuthorization = {
      ...authorization,
      physicalOutputAuthorized: true,
    } as unknown as StructureMaterialM1CAuthorizationV1;
    expect(() => validateStructureMaterialM1CAuthorization(
      promotedAuthorization,
      rules,
      fixtures,
      m1bReview,
    )).toThrow(/authorization boundary is invalid/i);

    const fixture = fixtures.fixtures.find((entry) => entry.fixtureId === 'positive/stable-continental-root-v1');
    if (!fixture) throw new Error('M1C hostile fixture is missing.');
    const region = evidenceRegionForFixture(fixture, 0);
    const hashes = hashesForFixture('hostile');
    const surfaceBypass = {
      ...region,
      fieldValues: {
        ...region.fieldValues,
        surfaceExposureSummary: 0.95,
      },
    } as unknown as StructureMaterialEvidenceRegionV1;
    expect(() => resolveStructureMaterialState({
      ...hashes,
      evidenceRegions: [surfaceBypass],
      researchContext: context,
    })).toThrow(/surface-only field|forbidden/i);

    const legacyBypass = {
      ...region,
      baseHeight: 0.8,
    } as unknown as StructureMaterialEvidenceRegionV1;
    expect(() => resolveStructureMaterialState({
      ...hashes,
      evidenceRegions: [legacyBypass],
      researchContext: context,
    })).toThrow(/unowned field.*baseHeight/i);

    for (const fixtureCase of fixtures.fixtures) {
      const state = resolveStructureMaterialState({
        ...hashesForFixture(`promotion-${fixtureCase.fixtureId}`),
        evidenceRegions: [evidenceRegionForFixture(fixtureCase, 0)],
        researchContext: context,
      });
      expect(state.regions[0].leadingProvinceClass).not.toBe('EXHUMED_MANTLE_TRANSITION');
      expect(state.regions[0].leadingProvinceClass).not.toBe('MIXED_TRANSITIONAL_PROVINCE');
    }
  });

  it('keeps M1B holdouts outside calibration and every physical authority false', () => {
    expect(authorization).toMatchObject({
      reviewStatus: 'APPROVED_FOR_DETACHED_PARTIAL_RESOLVER',
      completeEligibleRuleIds: [],
      resolverImplementationAuthorized: true,
      thresholdCalibrationAuthorized: false,
      structureMaterialCauseAuthorityAuthorized: false,
      landformPotentialAuthorityAuthorized: false,
      physicalOutputAuthorized: false,
      ordinaryGenerateInvocationAuthorized: false,
      legacyMorphologyInputAuthorized: false,
      surfaceExposureInputAuthorized: false,
    });
    expect(fixtures.fixtures.filter((fixture) => fixture.withheldFromCalibration).map((fixture) => fixture.fixtureId)).toEqual([
      'holdout/arc-thickening-overlap-v1',
      'holdout/magma-poor-transition-v1',
    ]);
    expect(context.thresholdCalibrationAuthorized).toBe(false);
    expect(context.physicalOutputAuthorized).toBe(false);
    expect(Object.isFrozen(context)).toBe(true);
  });
});

function evidenceRegionForFixture(
  fixture: StructureMaterialFixtureSetV1['fixtures'][number],
  index: number,
): StructureMaterialEvidenceRegionV1 {
  return {
    schemaVersion: 1,
    regionId: `m1c-fixture-${String(index).padStart(2, '0')}-${safeName(fixture.fixtureId)}`,
    sourceStructuralRegionId: fixture.fixtureId,
    anchor: createSphericalAnchor(-72 + (index % 17) * 8, -165 + (index % 13) * 21),
    extent: createSphericalExtent(10 + (index % 4) * 2),
    premiseBodyClassCandidates: fixture.premiseBodyClassCandidates,
    structuralRoles: fixture.structuralRoles,
    fieldValues: fixture.fieldValues,
    sourceNodes: fixture.sourceFamilies
      .map((family, familyIndex) => ({
        schemaVersion: 1 as const,
        nodeId: `${fixture.fixtureId}::${String(familyIndex).padStart(2, '0')}::${family}`,
        family,
      }))
      .sort((left, right) => left.nodeId.localeCompare(right.nodeId)),
    evidenceIds: [],
    contradictionIds: [],
    limitations: fixture.limitations,
  };
}

function hashesForFixture(fixtureId: string) {
  return {
    sourcePremiseHash: hashCausalPayload('WorldWright/test/m1c-fixture-premise/v1', { fixtureId }),
    sourceInteriorStateHash: hashCausalPayload('WorldWright/test/m1c-fixture-interior/v1', { fixtureId }),
    sourceRegimeHistoryHash: hashCausalPayload('WorldWright/test/m1c-fixture-history/v1', { fixtureId }),
    sourceGeologicSpineHash: hashCausalPayload('WorldWright/test/m1c-fixture-spine/v1', { fixtureId }),
    sourceProcessFieldProjectionHash: hashCausalPayload('WorldWright/test/m1c-fixture-projection/v1', { fixtureId }),
    sourceContinentOceanStructureHash: hashCausalPayload('WorldWright/test/m1c-fixture-structure/v1', { fixtureId }),
  };
}

function readJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(researchRoot, fileName), 'utf8')) as T;
}

function findForbiddenKeys(value: unknown, path = '$'): readonly string[] {
  if (Array.isArray(value)) return value.flatMap((entry, index) => findForbiddenKeys(entry, `${path}[${index}]`));
  if (!value || typeof value !== 'object') return [];
  const found: string[] = [];
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (forbiddenPhysicalKeys.has(key)) found.push(`${path}.${key}`);
    found.push(...findForbiddenKeys(child, `${path}.${key}`));
  }
  return found;
}

function safeName(value: string): string {
  return value.replace(/[^a-z0-9_.-]+/gi, '-');
}
