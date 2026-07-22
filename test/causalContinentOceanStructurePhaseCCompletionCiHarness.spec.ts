import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  C2B_CONTINENT_OCEAN_STRUCTURE_BUDGET_V1,
  D1_DETACHED_PROCESS_FIELD_DEFINITIONS_V1,
  createCausalGeologyInput,
  createCausalStageResult,
  createContinentOceanStructureResolverResearchContext,
  createGeologicSpineResearchContext,
  createRegimeHistoryResearchContext,
  createScientificQuantity,
  createScientificRange,
  createScientificResearchBundle,
  createSphericalExtent,
  freezeContinentOceanStructureFixtureSet,
  freezeContinentOceanStructureRuleSet,
  hashCausalPayload,
  resolveCausalProcessFieldProjection,
  resolveContinentOceanStructureFromProjection,
  resolveGeologicSpine,
  runRegimeHistoryShadow,
  sampleCausalProcessFieldProjectionDiagnosticGrid,
  validateCausalProcessFieldProjectionSet,
  validateContinentOceanStructureInterpretation,
  type CausalGeologyInputV1,
  type CausalProcessFieldProjectionIdV1,
  type ContinentOceanStructuralRoleV1,
  type ContinentOceanStructureFixtureSetV1,
  type ContinentOceanStructureResearchReviewV1,
  type ContinentOceanStructureRuleSetV1,
  type GeologicSpineFixtureSetV1,
  type GeologicSpineResearchReviewV1,
  type InteriorStateV1,
  type PlanetaryPremiseV1,
  type RegimeHistoryFixtureSetV1,
  type RegimeHistoryResearchFixtureV1,
  type RegimeHistoryResearchReviewV1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
  type TectonicRegimeHistoryV1,
} from '../src/core/causalGeology';
import { resolveWorldFeatureFlags } from '../src/core/worldFeatureFlags/resolve';

const repositoryRoot = process.cwd();
const researchRoot = resolve(repositoryRoot, 'src/core/causalGeology/research');
const artifactRoot = resolve(
  repositoryRoot,
  process.env.CAUSAL_CONTINENT_OCEAN_C3_CI_OUT ?? 'artifacts/c3-phase-c-completion',
);
const regimeFixtureSet = readResearchJson<RegimeHistoryFixtureSetV1>('regime-history-fixtures.json');
const structuralFixtureSet = freezeContinentOceanStructureFixtureSet(
  readResearchJson<ContinentOceanStructureFixtureSetV1>('continent-ocean-structure-fixtures.json'),
);
const completionFixtureIds = [
  'positive/cold-rocky-dwarf-single-lid-v1',
  'positive/earthlike-mixed-evolution-v1',
  'positive/hot-super-earth-magmatic-v1',
  'threshold/tidally-heated-rocky-v1',
  'positive/tidal-ice-shell-history-v1',
  'holdout/rock-ice-mixed-history-v1',
  'holdout/volatile-pressure-history-v1',
] as const;
const completionFixtures = completionFixtureIds.map(requireRegimeFixture);
const registeredFieldIds = new Set<CausalProcessFieldProjectionIdV1>(
  D1_DETACHED_PROCESS_FIELD_DEFINITIONS_V1.map((entry) => entry.fieldId),
);
const allowedLeadingRoles = new Set<ContinentOceanStructuralRoleV1>([
  'CONTINENTAL_INTERIOR',
  'DEEP_OCEAN_BASIN',
]);
const forbiddenLeadingRoles = new Set<ContinentOceanStructuralRoleV1>([
  'CONTINENTAL_MARGIN',
  'CONTINENTAL_SHELF',
  'CONTINENTAL_SLOPE',
  'OCEANIC_RIDGE_SYSTEM',
  'VOLCANIC_ARC_SYSTEM',
  'DROWNED_CONTINENTAL_FRAGMENT',
  'TRANSITIONAL_CRUST',
  'STRUCTURALLY_UNRESOLVED',
]);
const c3Budget = Object.freeze({
  maximumLiveCaseMilliseconds: 20_000,
  maximumSerializedInterpretationBytes: C2B_CONTINENT_OCEAN_STRUCTURE_BUDGET_V1.maximumSerializedInterpretationBytes,
  lowGrid: Object.freeze({ width: 12, height: 6 }),
  highGrid: Object.freeze({ width: 24, height: 12 }),
});
const forbiddenPhysicalPayloadKeys = new Set([
  'baseHeight',
  'landMask',
  'waterMask',
  'seaLevel',
  'bathymetry',
  'bathymetryValues',
  'bathymetryGrid',
  'bathymetryDepth',
  'depthMap',
  'terrain',
  'baseTerrain',
  'finalTerrain',
  'rendererColor',
  'rendererColors',
  'WorldBrain',
]);

function createHistoryResearchContext() {
  const review = readResearchJson<RegimeHistoryResearchReviewV1>('regime-history-review-record.json');
  return createRegimeHistoryResearchContext({
    researchBundle: createScientificResearchBundle({
      bundleVersion: review.bundleVersion,
      sources: readResearchJson<ScientificSourceV1[]>('regime-history-source-registry.json'),
      claimRules: readResearchJson<ScientificClaimRuleV1[]>('regime-history-claim-rules.json'),
      correlationGroups: readResearchJson<string[]>('regime-history-correlation-groups.json'),
      knownLimitations: readResearchJson<string[]>('regime-history-known-limitations.json'),
    }),
    fixtureSet: regimeFixtureSet,
    review,
  });
}

function createSpineResearchContext() {
  const review = readResearchJson<GeologicSpineResearchReviewV1>('geologic-spine-review-record.json');
  return createGeologicSpineResearchContext({
    researchBundle: createScientificResearchBundle({
      bundleVersion: review.bundleVersion,
      sources: readResearchJson<ScientificSourceV1[]>('geologic-spine-source-registry.json'),
      claimRules: readResearchJson<ScientificClaimRuleV1[]>('geologic-spine-claim-rules.json'),
      correlationGroups: readResearchJson<string[]>('geologic-spine-correlation-groups.json'),
      knownLimitations: readResearchJson<string[]>('geologic-spine-known-limitations.json'),
    }),
    fixtureSet: readResearchJson<GeologicSpineFixtureSetV1>('geologic-spine-fixtures.json'),
    review,
  });
}

function createStructureResearchContext() {
  const review = readResearchJson<ContinentOceanStructureResearchReviewV1>('continent-ocean-structure-review-record.json');
  return createContinentOceanStructureResolverResearchContext({
    researchBundle: createScientificResearchBundle({
      bundleVersion: review.bundleVersion,
      sources: readResearchJson<ScientificSourceV1[]>('continent-ocean-structure-source-registry.json'),
      claimRules: readResearchJson<ScientificClaimRuleV1[]>('continent-ocean-structure-claim-rules.json'),
      correlationGroups: readResearchJson<string[]>('continent-ocean-structure-correlation-groups.json'),
      knownLimitations: readResearchJson<string[]>('continent-ocean-structure-known-limitations.json'),
    }),
    ruleSet: freezeContinentOceanStructureRuleSet(
      readResearchJson<ContinentOceanStructureRuleSetV1>('continent-ocean-structure-role-rules.json'),
    ),
    review,
  });
}

describe('C3 Phase C completion and detached Phase M readiness gate', () => {
  it('executes reviewed live upstream worlds through detached structural interpretation without calibration or physical leakage', () => {
    rmSync(artifactRoot, { recursive: true, force: true });
    mkdirSync(artifactRoot, { recursive: true });
    const historyContext = createHistoryResearchContext();
    const spineContext = createSpineResearchContext();
    const structureContext = createStructureResearchContext();
    const serializedStructureContext = JSON.stringify(structureContext);
    expect(Object.prototype.hasOwnProperty.call(structureContext, 'fixtureSet')).toBe(false);
    for (const holdout of structuralFixtureSet.fixtures.filter((fixture) => fixture.kind === 'HOLDOUT')) {
      expect(holdout.withheldFromCalibration).toBe(true);
      expect(serializedStructureContext).not.toContain(holdout.fixtureId);
    }

    const caseReports: Array<Record<string, unknown>> = [];
    const interpretationHashes = new Set<string>();
    const fixtureKindCounts = new Map<string, number>();
    const aggregateRoleCounts = new Map<string, number>();
    const aggregateResolutionCounts = new Map<string, number>();
    const aggregateGhostCounts = new Map<string, number>();

    for (const fixture of completionFixtures) {
      fixtureKindCounts.set(fixture.kind, (fixtureKindCounts.get(fixture.kind) ?? 0) + 1);
      const seed = `c3:${fixture.fixtureId}`;
      const startedAt = performance.now();
      const upstream = resolveUpstream(seed, fixture, historyContext);
      const spineResolution = resolveGeologicSpine(
        upstream.input,
        upstream.premise,
        upstream.interior,
        upstream.history,
        spineContext,
      );
      expect(spineResolution.status).toBe('PARTIAL');
      if (!spineResolution.spine) throw new Error(`C3 fixture ${fixture.fixtureId} did not produce a geologic spine.`);

      const projection = resolveCausalProcessFieldProjection(upstream.history, spineResolution.spine);
      const projectionReplay = resolveCausalProcessFieldProjection(upstream.history, spineResolution.spine);
      validateCausalProcessFieldProjectionSet(projection);
      expect(projection).toEqual(projectionReplay);
      expect(projection.sourceRegimeHistoryHash).toEqual(upstream.history.contentHash);
      expect(projection.sourceGeologicSpineHash).toEqual(spineResolution.spine.contentHash);

      const regions = spineResolution.spine.nodes.map((node, index) => ({
        regionId: `${fixture.fixtureId}::${String(index).padStart(3, '0')}::${node.nodeId}`,
        anchor: node.anchor,
        extent: createSphericalExtent(12),
      }));
      expect(regions.length).toBeGreaterThan(0);

      const interpretation = resolveContinentOceanStructureFromProjection({
        sourcePremiseHash: upstream.premise.contentHash,
        sourceGeologicSpineHash: spineResolution.spine.contentHash,
        premiseBodyClassCandidates: upstream.premise.bodyClassCandidates,
        projection,
        regions,
        researchContext: structureContext,
      });
      const interpretationReplay = resolveContinentOceanStructureFromProjection({
        sourcePremiseHash: upstream.premise.contentHash,
        sourceGeologicSpineHash: spineResolution.spine.contentHash,
        premiseBodyClassCandidates: upstream.premise.bodyClassCandidates,
        projection,
        regions,
        researchContext: structureContext,
      });
      validateContinentOceanStructureInterpretation(interpretation);
      expect(interpretation).toEqual(interpretationReplay);

      const lowGrid = sampleCausalProcessFieldProjectionDiagnosticGrid(
        projection,
        c3Budget.lowGrid.width,
        c3Budget.lowGrid.height,
      );
      const highGrid = sampleCausalProcessFieldProjectionDiagnosticGrid(
        projection,
        c3Budget.highGrid.width,
        c3Budget.highGrid.height,
      );
      const interpretationAfterSamplingAndReorder = resolveContinentOceanStructureFromProjection({
        sourcePremiseHash: upstream.premise.contentHash,
        sourceGeologicSpineHash: spineResolution.spine.contentHash,
        premiseBodyClassCandidates: upstream.premise.bodyClassCandidates,
        projection,
        regions: [...regions].reverse(),
        researchContext: structureContext,
      });
      expect(projection).toEqual(projectionReplay);
      expect(interpretationAfterSamplingAndReorder).toEqual(interpretation);
      expect(lowGrid.projectionHash).toEqual(projection.contentHash);
      expect(highGrid.projectionHash).toEqual(projection.contentHash);

      expect(interpretation).toMatchObject({
        authorityMode: 'CAUSAL_SHADOW',
        physicalGeneratorAuthority: 'LEGACY',
        interpretationMode: 'DETACHED_DIAGNOSTIC',
        scientificStatus: 'PARTIAL',
        structuralRoleAuthority: false,
        finalLandAuthority: false,
        finalWaterAuthority: false,
        bathymetryAuthority: false,
        terrainAuthority: false,
      });
      expect(interpretation.sourcePremiseHash).toEqual(upstream.premise.contentHash);
      expect(interpretation.sourceGeologicSpineHash).toEqual(spineResolution.spine.contentHash);
      expect(interpretation.sourceProcessFieldProjectionHash).toEqual(projection.contentHash);
      expect(interpretation.regions).toHaveLength(regions.length);
      expect(interpretation.regions.map((region) => region.regionId)).toEqual(
        [...regions].map((region) => region.regionId).sort(compareStableText),
      );
      for (const definition of interpretation.roleDefinitions) {
        expect(definition).toMatchObject({
          finalLandAuthority: false,
          finalWaterAuthority: false,
          bathymetryAuthority: false,
          terrainAuthority: false,
        });
      }

      const validSourceNodeIds = new Set(spineResolution.spine.nodes.map((node) => node.nodeId));
      const caseRoleCounts = new Map<string, number>();
      const caseResolutionCounts = new Map<string, number>();
      const caseGhostCounts = new Map<string, number>();
      for (const region of interpretation.regions) {
        increment(caseResolutionCounts, region.resolutionStatus);
        increment(aggregateResolutionCounts, region.resolutionStatus);
        expect(region.roleCandidates.length).toBeGreaterThan(0);
        const candidateRoles = region.roleCandidates.map((candidate) => candidate.role);
        if (region.resolutionStatus === 'SINGLE_LEADING_CANDIDATE') {
          expect(region.leadingRole).toBeDefined();
          expect(candidateRoles).toContain(region.leadingRole);
          expect(allowedLeadingRoles.has(region.leadingRole as ContinentOceanStructuralRoleV1)).toBe(true);
          expect(region.ghostRiskCandidates).toHaveLength(0);
        } else {
          expect(region.leadingRole).toBeUndefined();
        }
        if (region.leadingRole) expect(forbiddenLeadingRoles.has(region.leadingRole)).toBe(false);
        if (region.resolutionStatus === 'UNRESOLVED') {
          expect(candidateRoles).toContain('STRUCTURALLY_UNRESOLVED');
          expect(region.unresolvedReasonIds.length).toBeGreaterThan(0);
        }

        for (const candidate of region.roleCandidates) {
          increment(caseRoleCounts, candidate.role);
          increment(aggregateRoleCounts, candidate.role);
          expect(candidate.rationaleIds.length).toBeGreaterThan(0);
          if (candidate.role === 'STRUCTURALLY_UNRESOLVED') {
            expect(candidate.evidenceIds).toEqual([]);
          } else {
            expect(candidate.evidenceIds.length).toBeGreaterThan(0);
          }
          expect(candidate.supportRange.min).toBeGreaterThanOrEqual(0);
          expect(candidate.supportRange.max).toBeLessThanOrEqual(1);
          expect(candidate.supportRange.min).toBeLessThanOrEqual(candidate.supportRange.max);
          for (const fieldId of candidate.sourceFieldIds) expect(registeredFieldIds.has(fieldId)).toBe(true);
          for (const nodeId of candidate.sourceNodeIds) expect(validSourceNodeIds.has(nodeId)).toBe(true);
        }
        expect(region.roleCandidates.flatMap((candidate) => candidate.sourceNodeIds).length).toBeGreaterThan(0);
        for (const ghost of region.ghostRiskCandidates) {
          increment(caseGhostCounts, ghost.risk);
          increment(aggregateGhostCounts, ghost.risk);
          expect(ghost.rationaleIds.length).toBeGreaterThan(0);
          expect(ghost.evidenceIds.length).toBeGreaterThan(0);
          for (const fieldId of ghost.sourceFieldIds) expect(registeredFieldIds.has(fieldId)).toBe(true);
        }
      }

      expect(findForbiddenPhysicalPayloadKeys(interpretation)).toEqual([]);
      expect(Object.isFrozen(interpretation)).toBe(true);
      expect(Object.isFrozen(interpretation.regions)).toBe(true);
      const serializedBytes = Buffer.byteLength(JSON.stringify(interpretation), 'utf8');
      expect(serializedBytes).toBeLessThanOrEqual(c3Budget.maximumSerializedInterpretationBytes);
      const durationMilliseconds = performance.now() - startedAt;
      expect(durationMilliseconds).toBeLessThanOrEqual(c3Budget.maximumLiveCaseMilliseconds);
      interpretationHashes.add(interpretation.contentHash.value);

      const caseReport = {
        schemaVersion: 1,
        fixtureId: fixture.fixtureId,
        fixtureKind: fixture.kind,
        withheldFromCalibration: fixture.withheldFromCalibration,
        seed,
        bodyClassCandidates: fixture.premiseBodyClassCandidates,
        historyHash: upstream.history.contentHash.value,
        spineHash: spineResolution.spine.contentHash.value,
        projectionHash: projection.contentHash.value,
        interpretationHash: interpretation.contentHash.value,
        sourceNodeCount: spineResolution.spine.nodes.length,
        regionCount: interpretation.regions.length,
        roleCounts: canonicalCounts(caseRoleCounts),
        resolutionCounts: canonicalCounts(caseResolutionCounts),
        ghostCounts: canonicalCounts(caseGhostCounts),
        lowGridHash: lowGrid.contentHash.value,
        highGridHash: highGrid.contentHash.value,
        serializedBytes,
        durationMilliseconds,
        scientificStatus: interpretation.scientificStatus,
        physicalGeneratorAuthority: interpretation.physicalGeneratorAuthority,
      };
      caseReports.push(caseReport);
      writeJson(resolve(artifactRoot, 'cases', safeFileName(fixture.fixtureId)), caseReport);
    }

    expect(caseReports).toHaveLength(completionFixtures.length);
    expect(interpretationHashes.size).toBe(completionFixtures.length);
    expect(canonicalCounts(fixtureKindCounts)).toEqual({
      HOLDOUT: 2,
      POSITIVE: 4,
      THRESHOLD: 1,
    });
    expect(aggregateRoleCounts.size).toBeGreaterThan(0);
    expect(aggregateResolutionCounts.size).toBeGreaterThan(0);

    writeJson(resolve(artifactRoot, 'c3-completion-report.json'), {
      schemaVersion: 1,
      reportVersion: 'C3_PHASE_C_COMPLETION_REPORT_V1',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      interpretationMode: 'DETACHED_DIAGNOSTIC',
      scientificStatus: 'PARTIAL',
      softwareGatePass: true,
      phaseCImplementationStatus: 'COMPLETE',
      phaseMReadiness: 'READY_FOR_M1_DETACHED_STRUCTURE_MATERIAL_CONTRACTS_AND_RESEARCH_ONLY',
      fixedStructuralFixtureCount: structuralFixtureSet.fixtures.length,
      fixedStructuralHoldoutCount: structuralFixtureSet.fixtures.filter((fixture) => fixture.kind === 'HOLDOUT').length,
      structuralHoldoutsUsedForRuntimeCalibration: false,
      liveCaseCount: caseReports.length,
      uniqueInterpretationHashCount: interpretationHashes.size,
      liveFixtureKindCounts: canonicalCounts(fixtureKindCounts),
      aggregateRoleCounts: canonicalCounts(aggregateRoleCounts),
      aggregateResolutionCounts: canonicalCounts(aggregateResolutionCounts),
      aggregateGhostCounts: canonicalCounts(aggregateGhostCounts),
      diagnosticGridResolutions: [c3Budget.lowGrid, c3Budget.highGrid],
      budgets: c3Budget,
      cases: caseReports,
      knownLimitations: [
        'C2A normalized boundaries remain provisional software calibration rather than universal geophysical constants.',
        'Radial process fields do not independently reconstruct oriented margins, ridges, arcs, trenches, sutures, transforms, or spreading direction.',
        'Shelf and slope remain RESEARCH_REQUIRED and cannot lead without later material and surface context.',
        'Drowned continental affinity remains an alternative without material, buoyancy, exposure, or surface authority.',
        'C2B interprets caller-supplied regions and does not establish a final global physical partition.',
        'No generated-world role-frequency or observational calibration is claimed.',
      ],
      nextScope: 'M1 detached StructureMaterialStateV1 contracts and source-backed research only',
    });
  }, 180_000);

  it('fails closed for artificial premise, mismatched lineage, and empty region requests', () => {
    const historyContext = createHistoryResearchContext();
    const spineContext = createSpineResearchContext();
    const structureContext = createStructureResearchContext();
    const fixture = completionFixtures[1];
    const upstream = resolveUpstream('c3:blocked-route', fixture, historyContext);
    const spineResolution = resolveGeologicSpine(
      upstream.input,
      upstream.premise,
      upstream.interior,
      upstream.history,
      spineContext,
    );
    if (!spineResolution.spine) throw new Error('C3 blocked-route fixture did not produce a geologic spine.');
    const projection = resolveCausalProcessFieldProjection(upstream.history, spineResolution.spine);
    const region = {
      regionId: 'c3-blocked-artificial-region',
      anchor: spineResolution.spine.nodes[0].anchor,
      extent: createSphericalExtent(12),
    };

    const artificial = resolveContinentOceanStructureFromProjection({
      sourcePremiseHash: hashCausalPayload('WorldWright/c3/artificial-premise/v1', { bodyClass: 'ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL' }),
      sourceGeologicSpineHash: spineResolution.spine.contentHash,
      premiseBodyClassCandidates: ['ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL'],
      projection,
      regions: [region],
      researchContext: structureContext,
    });
    expect(artificial.regions).toHaveLength(1);
    expect(artificial.regions[0]).toMatchObject({
      resolutionStatus: 'UNRESOLVED',
    });
    expect(artificial.regions[0].leadingRole).toBeUndefined();
    expect(artificial.regions[0].roleCandidates.map((candidate) => candidate.role)).toEqual(['STRUCTURALLY_UNRESOLVED']);
    expect(artificial.regions[0].unresolvedReasonIds.length).toBeGreaterThan(0);
    expect(findForbiddenPhysicalPayloadKeys(artificial)).toEqual([]);

    expect(() => resolveContinentOceanStructureFromProjection({
      sourcePremiseHash: upstream.premise.contentHash,
      sourceGeologicSpineHash: hashCausalPayload('WorldWright/c3/mismatched-spine/v1', { fixtureId: fixture.fixtureId }),
      premiseBodyClassCandidates: upstream.premise.bodyClassCandidates,
      projection,
      regions: [region],
      researchContext: structureContext,
    })).toThrow(/does not belong to the supplied geologic-spine source hash/i);

    expect(() => resolveContinentOceanStructureFromProjection({
      sourcePremiseHash: upstream.premise.contentHash,
      sourceGeologicSpineHash: spineResolution.spine.contentHash,
      premiseBodyClassCandidates: upstream.premise.bodyClassCandidates,
      projection,
      regions: [],
      researchContext: structureContext,
    })).toThrow(/at least one structural evidence region/i);
  }, 30_000);
});

function resolveUpstream(
  seed: string,
  fixture: RegimeHistoryResearchFixtureV1,
  historyContext: ReturnType<typeof createHistoryResearchContext>,
): {
  readonly input: CausalGeologyInputV1;
  readonly premise: PlanetaryPremiseV1;
  readonly interior: InteriorStateV1;
  readonly history: TectonicRegimeHistoryV1;
} {
  const input = inputForFixture(seed, fixture);
  const premise = premiseForFixture(input, fixture);
  const interior = interiorForFixture(seed, fixture);
  const run = runRegimeHistoryShadow({
    authorityMode: 'CAUSAL_SHADOW',
    featureFlags: resolveWorldFeatureFlags('CAUSAL_SHADOW', { 'causal.shadow.enabled': true }),
    inputSnapshot: input,
    premise,
    interior,
    interiorStageResult: createCausalStageResult({
      stageId: 'CAUSAL_INTERIOR_RESOLUTION',
      stageVersion: 1,
      status: 'PARTIAL',
      input: { inputSnapshot: input, premise },
      record: interior,
      limitations: interior.limitations,
      missingDomains: ['controlled-c3-interior-fixture'],
      downstreamCompatibleStageIds: ['CAUSAL_REGIME_HISTORY'],
    }),
    researchContext: historyContext,
  });
  expect(run.stageResult.status).toBe('PARTIAL');
  if (!run.resolution.history) throw new Error(`C3 upstream fixture ${fixture.fixtureId} did not produce regime history.`);
  return { input, premise, interior, history: run.resolution.history };
}

function inputForFixture(seed: string, fixture: RegimeHistoryResearchFixtureV1): CausalGeologyInputV1 {
  return createCausalGeologyInput(seed, [
    {
      schemaVersion: 1,
      inputId: 'thermal.age',
      quantity: createScientificQuantity(fixture.ageGyr, 'gigaannum', 'gigaannum-v1'),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `c3:${fixture.fixtureId}:${seed}:thermal-age`,
      confidenceSubject: `c3.${seed}.thermal-age`,
      evidenceIds: [],
    },
    {
      schemaVersion: 1,
      inputId: 'inventory.water',
      quantity: createScientificQuantity(fixture.waterInventory, 'earth-water-inventory', 'earth-water-inventory-v1'),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `c3:${fixture.fixtureId}:${seed}:water`,
      confidenceSubject: `c3.${seed}.water`,
      evidenceIds: [],
    },
  ], {
    initialConditionBundleHash: hashCausalPayload('WorldWright/test/c3-initial-condition-bundle/v1', {
      fixtureId: fixture.fixtureId,
      seed,
    }),
    limitations: ['C3 controlled Phase C completion input fixture.'],
  });
}

function premiseForFixture(
  input: CausalGeologyInputV1,
  fixture: RegimeHistoryResearchFixtureV1,
): PlanetaryPremiseV1 {
  const payload = {
    schemaVersion: 1 as const,
    premiseVersion: 1,
    status: 'PARTIAL' as const,
    inputSnapshotHash: input.contentHash,
    bodyClassCandidates: fixture.premiseBodyClassCandidates,
    surfaceMediumCandidates: ['CONTROLLED_SOLID_SURFACE'],
    layerStackCandidates: ['CONTROLLED_SOLID_LAYER_STACK'],
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: `c3.${fixture.fixtureId}.premise`,
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['C3 controlled premise fixture.'],
  };
  return {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/planetary-premise/v1', payload),
  };
}

function interiorForFixture(seed: string, fixture: RegimeHistoryResearchFixtureV1): InteriorStateV1 {
  const normalized = (center: number, subject: string) => createScientificRange(
    Math.max(0, center - 0.04),
    Math.min(1, center + 0.04),
    'normalized-0-1',
    'normalized-0-1-v1',
    subject,
  );
  const payload = {
    schemaVersion: 1 as const,
    status: 'PARTIAL' as const,
    interiorVersion: 1,
    thermalBudgetRange: normalized(fixture.interior.thermalBudgetCenter, `c3.${seed}.thermal`),
    heatSourceFractions: [
      { sourceId: 'PRIMORDIAL' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.primordial, `c3.${seed}.primordial`) },
      { sourceId: 'RADIOGENIC' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.radiogenic, `c3.${seed}.radiogenic`) },
      { sourceId: 'TIDAL' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.tidal, `c3.${seed}.tidal`) },
    ],
    mantleConvectionRange: normalized(fixture.interior.convectionCenter, `c3.${seed}.convection`),
    rheologyCandidates: ['TEMPERATURE_DEPENDENT_SOLID_STATE'],
    lithosphereBehaviorCandidates: ['RIGID_SINGLE_LID'],
    lidRegimeCandidates: fixture.interior.lidRegimeCandidates,
    resolvedLidRegime: fixture.interior.resolvedLidRegime,
    meltAndVolcanismRange: normalized(fixture.interior.meltCenter, `c3.${seed}.melt`),
    riftTendencyRange: normalized(fixture.interior.riftCenter, `c3.${seed}.rift`),
    hotspotTendencyRange: normalized(fixture.interior.hotspotCenter, `c3.${seed}.hotspot`),
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: `c3.${fixture.fixtureId}.interior`,
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['C3 controlled interior fixture.'],
  };
  return {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/interior-state/v1', payload),
  };
}

function findForbiddenPhysicalPayloadKeys(value: unknown, path = 'interpretation'): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((entry, index) => findForbiddenPhysicalPayloadKeys(entry, `${path}[${index}]`));
  }
  if (!value || typeof value !== 'object') return [];

  return Object.entries(value as Record<string, unknown>).flatMap(([key, nestedValue]) => {
    const nestedPath = `${path}.${key}`;
    const matches = forbiddenPhysicalPayloadKeys.has(key) ? [nestedPath] : [];
    return [...matches, ...findForbiddenPhysicalPayloadKeys(nestedValue, nestedPath)];
  });
}

function increment(map: Map<string, number>, key: string): void {
  map.set(key, (map.get(key) ?? 0) + 1);
}

function canonicalCounts(map: ReadonlyMap<string, number>): Readonly<Record<string, number>> {
  return Object.fromEntries([...map.entries()].sort(([a], [b]) => compareStableText(a, b)));
}

function requireRegimeFixture(fixtureId: string): RegimeHistoryResearchFixtureV1 {
  const fixture = regimeFixtureSet.fixtures.find((entry) => entry.fixtureId === fixtureId);
  if (!fixture) throw new Error(`Missing C3 regime-history fixture ${fixtureId}.`);
  return fixture;
}

function safeFileName(fixtureId: string): string {
  return `${fixtureId.replaceAll('/', '__')}.json`;
}

function readResearchJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(researchRoot, fileName), 'utf8')) as T;
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(resolve(path, '..'), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
