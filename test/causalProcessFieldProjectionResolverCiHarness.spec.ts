import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  D2_PRESERVATION_PROJECTION_ASSUMPTIONS_V1,
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
  sphericalAngularDistanceDegrees,
  validateCausalProcessFieldProjectionDiagnosticGrid,
  validateCausalProcessFieldProjectionQueryResult,
  validateCausalProcessFieldProjectionSet,
  type CausalGeologyInputV1,
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
  type TectonicRegimeHistoryV1,
} from '../src/core/causalGeology';
import { resolveWorldFeatureFlags } from '../src/core/worldFeatureFlags/resolve';

const repositoryRoot = process.cwd();
const researchRoot = resolve(repositoryRoot, 'src/core/causalGeology/research');
const artifactRoot = resolve(
  repositoryRoot,
  process.env.CAUSAL_PROCESS_FIELD_D2_CI_OUT ?? 'artifacts/d2-process-field-projection-gate',
);
const controlledSeeds = [
  'd2-controlled-01',
  'd2-controlled-02',
  'd2-controlled-03',
  'd2-controlled-04',
  'd2-controlled-05',
  'd2-controlled-06',
  'd2-holdout-07',
] as const;
const regimeFixtures = readResearchJson<RegimeHistoryFixtureSetV1>('regime-history-fixtures.json');
const primaryFixture = requireFixture('positive/earthlike-mixed-evolution-v1');
const incompatibleFixture = requireFixture('positive/tidal-ice-shell-history-v1');

const familyField: Readonly<Record<GeologicSpineNodeFamily, CausalProcessFieldProjectionIdV1>> = Object.freeze({
  ACCRETION_SYSTEM: 'accretionInfluence',
  CONTINENTAL_KERNEL: 'continentalKernelInfluence',
  CONVERGENCE_SYSTEM: 'convergenceInfluence',
  OCEAN_BASIN: 'oceanBasinInfluence',
  PLUME_SYSTEM: 'plumeInfluence',
  RIFT_SYSTEM: 'riftInfluence',
  TRANSFORM_SYSTEM: 'transformInfluence',
});

const budget = Object.freeze({
  maximumProjectionMillisecondsPerCase: 1_500,
  maximumQueryMilliseconds: 100,
  maximumGridMilliseconds: 15_000,
  maximumProjectionBytes: 4_194_304,
  diagnosticGridWidth: 36,
  diagnosticGridHeight: 18,
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

describe('D2 spherical process-field projection CI harness', () => {
  it('resolves deterministic detached projections for controlled and holdout seeds', () => {
    rmSync(artifactRoot, { recursive: true, force: true });
    mkdirSync(artifactRoot, { recursive: true });
    const historyContext = createHistoryResearchContext();
    const spineContext = createSpineResearchContext();
    const caseReports: Array<Record<string, unknown>> = [];
    const projectionHashes = new Set<string>();
    const sampledQueryHashes = new Set<string>();

    for (const seed of controlledSeeds) {
      const upstream = resolveUpstream(seed, primaryFixture, historyContext);
      const spineResolution = resolveGeologicSpine(
        upstream.input,
        upstream.premise,
        upstream.interior,
        upstream.history,
        spineContext,
      );
      expect(spineResolution.status).toBe('PARTIAL');
      if (!spineResolution.spine) throw new Error(`D2 controlled case ${seed} did not produce a spine.`);

      const startProjection = performance.now();
      const projection = resolveCausalProcessFieldProjection(upstream.history, spineResolution.spine);
      const projectionMilliseconds = performance.now() - startProjection;
      const replay = resolveCausalProcessFieldProjection(upstream.history, spineResolution.spine);
      validateCausalProcessFieldProjectionSet(projection);
      expect(projection).toEqual(replay);
      expect(projection.kernels).toHaveLength(spineResolution.spine.nodes.length * 6);
      expect(projection.sourceRegimeHistoryHash).toEqual(upstream.history.contentHash);
      expect(projection.sourceGeologicSpineHash).toEqual(spineResolution.spine.contentHash);
      expect(projection.physicalGeneratorAuthority).toBe('LEGACY');
      expect(projection.projectionMode).toBe('DETACHED_DIAGNOSTIC');
      expect(projection.scientificStatus).toBe('PARTIAL');
      expect(projectionMilliseconds).toBeLessThanOrEqual(budget.maximumProjectionMillisecondsPerCase);
      const projectionBytes = Buffer.byteLength(JSON.stringify(projection), 'utf8');
      expect(projectionBytes).toBeLessThanOrEqual(budget.maximumProjectionBytes);
      projectionHashes.add(projection.contentHash.value);

      const sourceNode = spineResolution.spine.nodes[0];
      const startQuery = performance.now();
      const query = evaluateCausalProcessFieldProjection(projection, sourceNode.anchor);
      const queryMilliseconds = performance.now() - startQuery;
      const queryReplay = evaluateCausalProcessFieldProjection(projection, sourceNode.anchor);
      validateCausalProcessFieldProjectionQueryResult(query);
      expect(query).toEqual(queryReplay);
      expect(queryMilliseconds).toBeLessThanOrEqual(budget.maximumQueryMilliseconds);
      expect(query.values.find((entry) => entry.fieldId === familyField[sourceNode.family])?.value).toBeGreaterThan(0);
      expect(query.values.find((entry) => entry.fieldId === 'projectionConfidence')?.value).toBe(1);
      expect(query.values.every((entry) => entry.value >= 0 && entry.value <= 1)).toBe(true);
      sampledQueryHashes.add(query.contentHash.value);

      let gridMilliseconds: number | undefined;
      let gridHash: string | undefined;
      if (seed === controlledSeeds[0] || seed === controlledSeeds[controlledSeeds.length - 1]) {
        const startGrid = performance.now();
        const grid = sampleCausalProcessFieldProjectionDiagnosticGrid(
          projection,
          budget.diagnosticGridWidth,
          budget.diagnosticGridHeight,
        );
        gridMilliseconds = performance.now() - startGrid;
        validateCausalProcessFieldProjectionDiagnosticGrid(grid);
        expect(gridMilliseconds).toBeLessThanOrEqual(budget.maximumGridMilliseconds);
        expect(grid.width * grid.height).toBe(budget.diagnosticGridWidth * budget.diagnosticGridHeight);
        expect(Object.values(grid.valuesByField).every((values) =>
          values.length === grid.width * grid.height
          && values.every((value) => value >= 0 && value <= 1))).toBe(true);
        expect(evaluateCausalProcessFieldProjection(projection, sourceNode.anchor)).toEqual(query);
        gridHash = grid.contentHash.value;
        writeJson(resolve(artifactRoot, 'grids', `${seed}.json`), grid);
      }

      expect(JSON.stringify(projection)).not.toContain('baseHeight');
      expect(JSON.stringify(projection)).not.toContain('WorldBrain');
      expect(JSON.stringify(projection)).not.toContain('rendererColor');
      expect(JSON.stringify(projection)).not.toContain('landMask');
      expect(JSON.stringify(projection)).not.toContain('waterMask');

      const caseReport = {
        schemaVersion: 1,
        seed,
        holdout: seed.startsWith('d2-holdout'),
        historyHash: upstream.history.contentHash.value,
        spineHash: spineResolution.spine.contentHash.value,
        projectionHash: projection.contentHash.value,
        queryHash: query.contentHash.value,
        gridHash,
        sourceNodeCount: spineResolution.spine.nodes.length,
        kernelCount: projection.kernels.length,
        projectionMilliseconds,
        queryMilliseconds,
        gridMilliseconds,
        projectionBytes,
        scientificStatus: projection.scientificStatus,
        physicalGeneratorAuthority: projection.physicalGeneratorAuthority,
      };
      caseReports.push(caseReport);
      writeJson(resolve(artifactRoot, 'cases', `${seed}.json`), caseReport);
    }

    expect(projectionHashes.size).toBe(controlledSeeds.length);
    expect(sampledQueryHashes.size).toBe(controlledSeeds.length);
    expect(D2_PRESERVATION_PROJECTION_ASSUMPTIONS_V1).toHaveLength(6);
    expect(new Set(D2_PRESERVATION_PROJECTION_ASSUMPTIONS_V1.map((entry) => entry.state)).size).toBe(6);
    expect(D2_PRESERVATION_PROJECTION_ASSUMPTIONS_V1.every((entry) =>
      entry.physicallyCalibrated === false
      && entry.weight >= 0
      && entry.weight <= 1
      && entry.rationale.length > 0)).toBe(true);

    writeJson(resolve(artifactRoot, 'd2-projection-report.json'), {
      schemaVersion: 1,
      reportVersion: 'D2_SPHERICAL_PROCESS_FIELD_PROJECTION_REPORT_V1',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      projectionMode: 'DETACHED_DIAGNOSTIC',
      scientificStatus: 'PARTIAL',
      softwareGatePass: true,
      caseCount: caseReports.length,
      uniqueProjectionHashCount: projectionHashes.size,
      uniqueQueryHashCount: sampledQueryHashes.size,
      holdoutCaseCount: caseReports.filter((entry) => entry.holdout).length,
      budgets: budget,
      cases: caseReports,
      limitations: [
        'D2 validates deterministic spherical projections and diagnostic sampling, not terrain or structural-role authority.',
        'Preservation weights are explicit nonphysical diagnostic assumptions.',
        'No legacy morphology, renderer, land/water, or final physical field is read or written.',
      ],
      nextScope: 'D3 distribution, interpretability, resolution, and phase-completion evidence across difficult controlled worlds',
    });
  });

  it('is wrap-safe at the longitude seam and stable near the poles', () => {
    expect(sphericalAngularDistanceDegrees(
      createSphericalAnchor(0, 179),
      createSphericalAnchor(0, -179),
    )).toBeCloseTo(2, 10);
    expect(sphericalAngularDistanceDegrees(
      createSphericalAnchor(89, 0),
      createSphericalAnchor(89, 180),
    )).toBeCloseTo(2, 3);

    const seamProjection = createCausalProcessFieldProjectionSet({
      sourceRegimeHistoryHash: hashCausalPayload('WorldWright/test/d2-seam-history/v1', { seed: 'seam' }),
      sourceGeologicSpineHash: hashCausalPayload('WorldWright/test/d2-seam-spine/v1', { seed: 'seam' }),
      kernels: [{
        schemaVersion: 1,
        kernelId: 'seam-node::riftInfluence',
        fieldId: 'riftInfluence',
        sourceNodeId: 'seam-node',
        sourceNodeFamily: 'RIFT_SYSTEM',
        anchor: createSphericalAnchor(0, 180),
        angularRadiusDegrees: 20,
        peakValue: 1,
        temporalWeight: 1,
        preservationWeight: 1,
        falloff: 'COSINE_COMPACT_SUPPORT_V1',
        evidenceIds: ['evidence.d2.seam'],
      }],
      limitations: ['D2 seam fixture is a detached geometry test only.'],
    });
    const east = evaluateCausalProcessFieldProjection(seamProjection, createSphericalAnchor(0, 179));
    const west = evaluateCausalProcessFieldProjection(seamProjection, createSphericalAnchor(0, -179));
    expect(east.values.find((entry) => entry.fieldId === 'riftInfluence')?.value).toEqual(
      west.values.find((entry) => entry.fieldId === 'riftInfluence')?.value,
    );
  });

  it('fails closed when spine events do not belong to the supplied history', () => {
    const historyContext = createHistoryResearchContext();
    const spineContext = createSpineResearchContext();
    const primary = resolveUpstream('d2-lineage-primary', primaryFixture, historyContext);
    const incompatible = resolveUpstream('d2-lineage-incompatible', incompatibleFixture, historyContext);
    const spineResolution = resolveGeologicSpine(
      primary.input,
      primary.premise,
      primary.interior,
      primary.history,
      spineContext,
    );
    if (!spineResolution.spine) throw new Error('D2 lineage rejection fixture did not produce a spine.');
    expect(() => resolveCausalProcessFieldProjection(incompatible.history, spineResolution.spine)).toThrow(/unknown history epoch|outside history epoch/i);
  });
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
      missingDomains: ['controlled-d2-interior-fixture'],
      downstreamCompatibleStageIds: ['CAUSAL_REGIME_HISTORY'],
    }),
    researchContext: historyContext,
  });
  expect(run.stageResult.status).toBe('PARTIAL');
  if (!run.resolution.history) throw new Error(`D2 upstream fixture ${fixture.fixtureId} did not produce regime history.`);
  return { input, premise, interior, history: run.resolution.history };
}

function inputForFixture(seed: string, fixture: RegimeHistoryResearchFixtureV1): CausalGeologyInputV1 {
  return createCausalGeologyInput(seed, [
    {
      schemaVersion: 1,
      inputId: 'thermal.age',
      quantity: createScientificQuantity(fixture.ageGyr, 'gigaannum', 'gigaannum-v1'),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `d2:${fixture.fixtureId}:${seed}:thermal-age`,
      confidenceSubject: `d2.${seed}.thermal-age`,
      evidenceIds: [],
    },
    {
      schemaVersion: 1,
      inputId: 'inventory.water',
      quantity: createScientificQuantity(fixture.waterInventory, 'earth-water-inventory', 'earth-water-inventory-v1'),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `d2:${fixture.fixtureId}:${seed}:water`,
      confidenceSubject: `d2.${seed}.water`,
      evidenceIds: [],
    },
  ], {
    limitations: ['D2 controlled process-field projection input fixture.'],
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
    confidenceAssessmentSubject: `d2.${fixture.fixtureId}.premise`,
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['D2 controlled premise fixture.'],
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
    thermalBudgetRange: normalized(fixture.interior.thermalBudgetCenter, `d2.${seed}.thermal`),
    heatSourceFractions: [
      { sourceId: 'PRIMORDIAL' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.primordial, `d2.${seed}.primordial`) },
      { sourceId: 'RADIOGENIC' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.radiogenic, `d2.${seed}.radiogenic`) },
      { sourceId: 'TIDAL' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.tidal, `d2.${seed}.tidal`) },
    ],
    mantleConvectionRange: normalized(fixture.interior.convectionCenter, `d2.${seed}.convection`),
    rheologyCandidates: ['TEMPERATURE_DEPENDENT_SOLID_STATE'],
    lithosphereBehaviorCandidates: ['RIGID_SINGLE_LID'],
    lidRegimeCandidates: fixture.interior.lidRegimeCandidates,
    resolvedLidRegime: fixture.interior.resolvedLidRegime,
    meltAndVolcanismRange: normalized(fixture.interior.meltCenter, `d2.${seed}.melt`),
    riftTendencyRange: normalized(fixture.interior.riftCenter, `d2.${seed}.rift`),
    hotspotTendencyRange: normalized(fixture.interior.hotspotCenter, `d2.${seed}.hotspot`),
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: `d2.${fixture.fixtureId}.interior`,
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['D2 controlled interior fixture.'],
  };
  return {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/interior-state/v1', payload),
  };
}

function requireFixture(fixtureId: string): RegimeHistoryResearchFixtureV1 {
  const fixture = regimeFixtures.fixtures.find((entry) => entry.fixtureId === fixtureId);
  if (!fixture) throw new Error(`Missing D2 regime-history fixture ${fixtureId}.`);
  return fixture;
}

function readResearchJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(researchRoot, fileName), 'utf8')) as T;
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(resolve(path, '..'), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}
