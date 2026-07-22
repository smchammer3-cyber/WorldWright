import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  D1_DETACHED_PROCESS_FIELD_DEFINITIONS_V1,
  createCausalGeologyInput,
  createCausalProcessFieldProjectionSet,
  createCausalStageResult,
  createGeologicSpineResearchContext,
  createRegimeHistoryResearchContext,
  createScientificQuantity,
  createScientificRange,
  createScientificResearchBundle,
  createSphericalAnchor,
  evaluateCausalProcessFieldProjection,
  hashCausalPayload,
  resolveCausalProcessFieldProjection,
  resolveGeologicSpine,
  runRegimeHistoryShadow,
  sampleCausalProcessFieldProjectionDiagnosticGrid,
  validateCausalProcessFieldProjectionDiagnosticGrid,
  validateCausalProcessFieldProjectionQueryResult,
  validateCausalProcessFieldProjectionSet,
  type CausalGeologyInputV1,
  type CausalProcessFieldProjectionDiagnosticGridV1,
  type CausalProcessFieldProjectionIdV1,
  type GeologicSpineFixtureSetV1,
  type GeologicSpineNodeFamily,
  type GeologicSpineResearchReviewV1,
  type InteriorStateV1,
  type PlanetaryPremiseV1,
  type RegimeHistoryFixtureSetV1,
  type RegimeHistoryResearchFixtureV1,
  type RegimeHistoryResearchReviewV1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
  type SphericalAnchorV1,
  type TectonicRegimeHistoryV1,
} from '../src/core/causalGeology';
import { resolveWorldFeatureFlags } from '../src/core/worldFeatureFlags/resolve';

const repositoryRoot = process.cwd();
const researchRoot = resolve(repositoryRoot, 'src/core/causalGeology/research');
const artifactRoot = resolve(
  repositoryRoot,
  process.env.CAUSAL_PROCESS_FIELD_D3_CI_OUT ?? 'artifacts/d3-phase-d-completion',
);
const regimeFixtures = readResearchJson<RegimeHistoryFixtureSetV1>('regime-history-fixtures.json');
const completionFixtureIds = [
  'positive/cold-rocky-dwarf-single-lid-v1',
  'positive/earthlike-mixed-evolution-v1',
  'positive/hot-super-earth-magmatic-v1',
  'threshold/tidally-heated-rocky-v1',
  'positive/tidal-ice-shell-history-v1',
  'holdout/rock-ice-mixed-history-v1',
  'holdout/volatile-pressure-history-v1',
] as const;
const completionFixtures = completionFixtureIds.map(requireFixture);
const fieldIds = D1_DETACHED_PROCESS_FIELD_DEFINITIONS_V1.map((entry) => entry.fieldId);
const familyField: Readonly<Record<GeologicSpineNodeFamily, CausalProcessFieldProjectionIdV1>> = Object.freeze({
  ACCRETION_SYSTEM: 'accretionInfluence',
  CONTINENTAL_KERNEL: 'continentalKernelInfluence',
  CONVERGENCE_SYSTEM: 'convergenceInfluence',
  OCEAN_BASIN: 'oceanBasinInfluence',
  PLUME_SYSTEM: 'plumeInfluence',
  RIFT_SYSTEM: 'riftInfluence',
  TRANSFORM_SYSTEM: 'transformInfluence',
});
const fixedQueryAnchors: readonly SphericalAnchorV1[] = [
  createSphericalAnchor(0, 0),
  createSphericalAnchor(45, 90),
  createSphericalAnchor(-45, -90),
  createSphericalAnchor(80, 179),
  createSphericalAnchor(-80, -179),
];
const completionBudget = Object.freeze({
  maximumProjectionMillisecondsPerCase: 1_500,
  maximumExactQueryMillisecondsPerCase: 2_000,
  maximumLowGridMillisecondsPerCase: 5_000,
  maximumHighGridMillisecondsPerCase: 15_000,
  maximumProjectionBytesPerCase: 4_194_304,
  lowGrid: Object.freeze({ width: 24, height: 12 }),
  highGrid: Object.freeze({ width: 48, height: 24 }),
});

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
    fixtureSet: regimeFixtures,
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

describe('D3 Phase D completion and Phase C readiness gate', () => {
  it('proves detached projection coverage across positive, threshold, ice-shell, and holdout worlds', () => {
    rmSync(artifactRoot, { recursive: true, force: true });
    mkdirSync(artifactRoot, { recursive: true });
    const historyContext = createHistoryResearchContext();
    const spineContext = createSpineResearchContext();
    const caseReports: Array<Record<string, unknown>> = [];
    const projectionHashes = new Set<string>();
    const fixtureKinds = new Map<string, number>();

    for (const fixture of completionFixtures) {
      fixtureKinds.set(fixture.kind, (fixtureKinds.get(fixture.kind) ?? 0) + 1);
      const seed = `d3:${fixture.fixtureId}`;
      const upstream = resolveUpstream(seed, fixture, historyContext);
      const spineResolution = resolveGeologicSpine(
        upstream.input,
        upstream.premise,
        upstream.interior,
        upstream.history,
        spineContext,
      );
      expect(spineResolution.status).toBe('PARTIAL');
      if (!spineResolution.spine) throw new Error(`D3 fixture ${fixture.fixtureId} did not produce a geologic spine.`);

      const projectionStarted = performance.now();
      const projection = resolveCausalProcessFieldProjection(upstream.history, spineResolution.spine);
      const projectionMilliseconds = performance.now() - projectionStarted;
      const projectionReplay = resolveCausalProcessFieldProjection(upstream.history, spineResolution.spine);
      validateCausalProcessFieldProjectionSet(projection);
      expect(projection).toEqual(projectionReplay);
      expect(projection.kernels).toHaveLength(spineResolution.spine.nodes.length * 6);
      expect(projection.sourceRegimeHistoryHash).toEqual(upstream.history.contentHash);
      expect(projection.sourceGeologicSpineHash).toEqual(spineResolution.spine.contentHash);
      expect(projectionMilliseconds).toBeLessThanOrEqual(completionBudget.maximumProjectionMillisecondsPerCase);
      const projectionBytes = Buffer.byteLength(JSON.stringify(projection), 'utf8');
      expect(projectionBytes).toBeLessThanOrEqual(completionBudget.maximumProjectionBytesPerCase);
      projectionHashes.add(projection.contentHash.value);

      const exactQueryStarted = performance.now();
      const sourceAnchorEvidence = spineResolution.spine.nodes.map((node) => {
        const query = evaluateCausalProcessFieldProjection(projection, node.anchor);
        validateCausalProcessFieldProjectionQueryResult(query);
        const familySample = query.values.find((sample) => sample.fieldId === familyField[node.family]);
        const confidenceSample = query.values.find((sample) => sample.fieldId === 'projectionConfidence');
        expect(familySample?.value).toBeGreaterThan(0);
        expect(familySample?.dominantKernelId).toBeDefined();
        expect(familySample?.contributingKernelCount).toBeGreaterThan(0);
        expect(confidenceSample?.value).toBe(1);
        const dominantKernel = projection.kernels.find((kernel) => kernel.kernelId === familySample?.dominantKernelId);
        expect(dominantKernel).toBeDefined();
        expect(dominantKernel?.fieldId).toBe(familyField[node.family]);
        expect(spineResolution.spine?.nodes.some((candidate) => candidate.nodeId === dominantKernel?.sourceNodeId)).toBe(true);
        return {
          nodeId: node.nodeId,
          family: node.family,
          queryHash: query.contentHash.value,
          familyFieldId: familySample?.fieldId,
          familyValue: familySample?.value,
          dominantKernelId: familySample?.dominantKernelId,
          projectionConfidence: confidenceSample?.value,
        };
      });
      const fixedQueriesBefore = fixedQueryAnchors.map((anchor) =>
        evaluateCausalProcessFieldProjection(projection, anchor));
      const exactQueryMilliseconds = performance.now() - exactQueryStarted;
      expect(exactQueryMilliseconds).toBeLessThanOrEqual(completionBudget.maximumExactQueryMillisecondsPerCase);

      const lowStarted = performance.now();
      const lowGrid = sampleCausalProcessFieldProjectionDiagnosticGrid(
        projection,
        completionBudget.lowGrid.width,
        completionBudget.lowGrid.height,
      );
      const lowGridMilliseconds = performance.now() - lowStarted;
      const highStarted = performance.now();
      const highGrid = sampleCausalProcessFieldProjectionDiagnosticGrid(
        projection,
        completionBudget.highGrid.width,
        completionBudget.highGrid.height,
      );
      const highGridMilliseconds = performance.now() - highStarted;
      validateCausalProcessFieldProjectionDiagnosticGrid(lowGrid);
      validateCausalProcessFieldProjectionDiagnosticGrid(highGrid);
      expect(lowGridMilliseconds).toBeLessThanOrEqual(completionBudget.maximumLowGridMillisecondsPerCase);
      expect(highGridMilliseconds).toBeLessThanOrEqual(completionBudget.maximumHighGridMillisecondsPerCase);
      expect(lowGrid.projectionHash).toEqual(projection.contentHash);
      expect(highGrid.projectionHash).toEqual(projection.contentHash);

      const fixedQueriesAfter = fixedQueryAnchors.map((anchor) =>
        evaluateCausalProcessFieldProjection(projection, anchor));
      expect(fixedQueriesAfter).toEqual(fixedQueriesBefore);
      expect(projection).toEqual(projectionReplay);

      const lowDistribution = summarizeGrid(lowGrid);
      const highDistribution = summarizeGrid(highGrid);
      expect(Object.values(lowDistribution).every(isValidDistribution)).toBe(true);
      expect(Object.values(highDistribution).every(isValidDistribution)).toBe(true);
      expect(highDistribution.projectionConfidence.nonzeroCount).toBeGreaterThan(0);
      expect(highDistribution.projectionConfidence.maximum).toBeGreaterThan(0);
      expect(highDistribution.projectionConfidence.maximum).toBeLessThanOrEqual(1);
      expect(Object.values(highDistribution).some((entry) => entry.nonzeroCount > 0)).toBe(true);

      const serializedProjection = JSON.stringify(projection);
      for (const forbidden of ['WorldBrain', 'baseHeight', 'landMask', 'waterMask', 'rendererColor', 'processFieldAuthority', 'structuralRoleAuthority']) {
        expect(serializedProjection).not.toContain(forbidden);
      }

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
        sourceNodeCount: spineResolution.spine.nodes.length,
        sourceEdgeCount: spineResolution.spine.edges.length,
        sourceEventCount: spineResolution.spine.events.length,
        featureFamilies: spineResolution.spine.featureFamilies,
        kernelCount: projection.kernels.length,
        sourceAnchorEvidence,
        fixedCoordinateQueryHashes: fixedQueriesAfter.map((query) => query.contentHash.value),
        lowGridHash: lowGrid.contentHash.value,
        highGridHash: highGrid.contentHash.value,
        lowDistribution,
        highDistribution,
        projectionMilliseconds,
        exactQueryMilliseconds,
        lowGridMilliseconds,
        highGridMilliseconds,
        projectionBytes,
        scientificStatus: projection.scientificStatus,
        physicalGeneratorAuthority: projection.physicalGeneratorAuthority,
      };
      caseReports.push(caseReport);
      writeJson(resolve(artifactRoot, 'cases', safeFileName(fixture.fixtureId)), caseReport);
      writeJson(resolve(artifactRoot, 'grids', `${safeFileName(fixture.fixtureId)}.low.json`), lowGrid);
      writeJson(resolve(artifactRoot, 'grids', `${safeFileName(fixture.fixtureId)}.high.json`), highGrid);
    }

    expect(projectionHashes.size).toBe(completionFixtures.length);
    expect(Object.fromEntries([...fixtureKinds.entries()].sort(([a], [b]) => compareStableText(a, b)))).toEqual({
      HOLDOUT: 2,
      POSITIVE: 4,
      THRESHOLD: 1,
    });

    writeJson(resolve(artifactRoot, 'd3-completion-report.json'), {
      schemaVersion: 1,
      reportVersion: 'D3_PHASE_D_COMPLETION_REPORT_V1',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      projectionMode: 'DETACHED_DIAGNOSTIC',
      scientificStatus: 'PARTIAL',
      softwareGatePass: true,
      phaseDImplementationStatus: 'COMPLETE',
      phaseCReadiness: 'READY_FOR_DETACHED_STRUCTURAL_INTERPRETATION_ONLY',
      caseCount: caseReports.length,
      uniqueProjectionHashCount: projectionHashes.size,
      fixtureKindCounts: Object.fromEntries([...fixtureKinds.entries()].sort(([a], [b]) => compareStableText(a, b))),
      gridResolutions: [completionBudget.lowGrid, completionBudget.highGrid],
      budgets: completionBudget,
      cases: caseReports,
      knownLimitations: [
        'Radial compact-support kernels do not independently encode oriented ridges, arcs, sutures, transforms, or elongated corridors.',
        'Preservation weights remain nonphysical diagnostic visibility assumptions.',
        'Wave 1 direct-input downstream sensitivity remains research-required.',
        'Phase D does not classify continent, ocean, shelf, transitional crust, land, water, bathymetry, or terrain.',
      ],
      nextScope: 'C1 detached structural-role interpretation contracts, ambiguity, provenance, and authority isolation',
    });
  }, 120_000);

  it('fails closed for incompatible lineage and empty projection artifacts', () => {
    const historyContext = createHistoryResearchContext();
    const spineContext = createSpineResearchContext();
    const primary = resolveUpstream('d3:blocked:primary', completionFixtures[1], historyContext);
    const incompatible = resolveUpstream('d3:blocked:incompatible', completionFixtures[4], historyContext);
    const spineResolution = resolveGeologicSpine(
      primary.input,
      primary.premise,
      primary.interior,
      primary.history,
      spineContext,
    );
    if (!spineResolution.spine) throw new Error('D3 blocked lineage fixture did not produce a spine.');
    expect(() => resolveCausalProcessFieldProjection(incompatible.history, spineResolution.spine)).toThrow(
      /unknown history epoch|does not overlap history epoch/i,
    );
    expect(() => createCausalProcessFieldProjectionSet({
      sourceRegimeHistoryHash: primary.history.contentHash,
      sourceGeologicSpineHash: spineResolution.spine.contentHash,
      kernels: [],
      limitations: ['D3 empty-kernel rejection fixture.'],
    })).toThrow(/at least one kernel/i);
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
      missingDomains: ['controlled-d3-interior-fixture'],
      downstreamCompatibleStageIds: ['CAUSAL_REGIME_HISTORY'],
    }),
    researchContext: historyContext,
  });
  expect(run.stageResult.status).toBe('PARTIAL');
  if (!run.resolution.history) throw new Error(`D3 upstream fixture ${fixture.fixtureId} did not produce regime history.`);
  return { input, premise, interior, history: run.resolution.history };
}

function inputForFixture(seed: string, fixture: RegimeHistoryResearchFixtureV1): CausalGeologyInputV1 {
  return createCausalGeologyInput(seed, [
    {
      schemaVersion: 1,
      inputId: 'thermal.age',
      quantity: createScientificQuantity(fixture.ageGyr, 'gigaannum', 'gigaannum-v1'),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `d3:${fixture.fixtureId}:${seed}:thermal-age`,
      confidenceSubject: `d3.${seed}.thermal-age`,
      evidenceIds: [],
    },
    {
      schemaVersion: 1,
      inputId: 'inventory.water',
      quantity: createScientificQuantity(fixture.waterInventory, 'earth-water-inventory', 'earth-water-inventory-v1'),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `d3:${fixture.fixtureId}:${seed}:water`,
      confidenceSubject: `d3.${seed}.water`,
      evidenceIds: [],
    },
  ], {
    initialConditionBundleHash: hashCausalPayload('WorldWright/test/d3-initial-condition-bundle/v1', {
      fixtureId: fixture.fixtureId,
      seed,
    }),
    limitations: ['D3 controlled Phase D completion input fixture.'],
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
    confidenceAssessmentSubject: `d3.${fixture.fixtureId}.premise`,
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['D3 controlled premise fixture.'],
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
    thermalBudgetRange: normalized(fixture.interior.thermalBudgetCenter, `d3.${seed}.thermal`),
    heatSourceFractions: [
      { sourceId: 'PRIMORDIAL' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.primordial, `d3.${seed}.primordial`) },
      { sourceId: 'RADIOGENIC' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.radiogenic, `d3.${seed}.radiogenic`) },
      { sourceId: 'TIDAL' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.tidal, `d3.${seed}.tidal`) },
    ],
    mantleConvectionRange: normalized(fixture.interior.convectionCenter, `d3.${seed}.convection`),
    rheologyCandidates: ['TEMPERATURE_DEPENDENT_SOLID_STATE'],
    lithosphereBehaviorCandidates: ['RIGID_SINGLE_LID'],
    lidRegimeCandidates: fixture.interior.lidRegimeCandidates,
    resolvedLidRegime: fixture.interior.resolvedLidRegime,
    meltAndVolcanismRange: normalized(fixture.interior.meltCenter, `d3.${seed}.melt`),
    riftTendencyRange: normalized(fixture.interior.riftCenter, `d3.${seed}.rift`),
    hotspotTendencyRange: normalized(fixture.interior.hotspotCenter, `d3.${seed}.hotspot`),
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: `d3.${fixture.fixtureId}.interior`,
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['D3 controlled interior fixture.'],
  };
  return {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/interior-state/v1', payload),
  };
}

function summarizeGrid(
  grid: CausalProcessFieldProjectionDiagnosticGridV1,
): Readonly<Record<CausalProcessFieldProjectionIdV1, FieldDistributionV1>> {
  return Object.fromEntries(fieldIds.map((fieldId) => {
    const values = grid.valuesByField[fieldId];
    const nonzeroCount = values.filter((value) => value > 0).length;
    const sum = values.reduce((total, value) => total + value, 0);
    return [fieldId, {
      minimum: Math.min(...values),
      maximum: Math.max(...values),
      mean: Number((sum / values.length).toFixed(12)),
      nonzeroCount,
      nonzeroFraction: Number((nonzeroCount / values.length).toFixed(12)),
    }];
  })) as Readonly<Record<CausalProcessFieldProjectionIdV1, FieldDistributionV1>>;
}

interface FieldDistributionV1 {
  readonly minimum: number;
  readonly maximum: number;
  readonly mean: number;
  readonly nonzeroCount: number;
  readonly nonzeroFraction: number;
}

function isValidDistribution(entry: FieldDistributionV1): boolean {
  return Number.isFinite(entry.minimum)
    && Number.isFinite(entry.maximum)
    && Number.isFinite(entry.mean)
    && entry.minimum >= 0
    && entry.maximum <= 1
    && entry.minimum <= entry.maximum
    && entry.mean >= 0
    && entry.mean <= 1
    && Number.isSafeInteger(entry.nonzeroCount)
    && entry.nonzeroCount >= 0
    && entry.nonzeroFraction >= 0
    && entry.nonzeroFraction <= 1;
}

function requireFixture(fixtureId: string): RegimeHistoryResearchFixtureV1 {
  const fixture = regimeFixtures.fixtures.find((entry) => entry.fixtureId === fixtureId);
  if (!fixture) throw new Error(`Missing D3 regime-history fixture ${fixtureId}.`);
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
