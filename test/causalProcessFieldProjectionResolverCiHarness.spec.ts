import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  D2_PRESERVATION_PROJECTION_ASSUMPTIONS_V1,
  createCausalGeologyInput,
  createCausalProcessFieldProjectionSet,
  createCausalStageResult,
  createGeologicSpineResearchContext,
  createScientificQuantity,
  createScientificRange,
  createScientificResearchBundle,
  createSphericalAnchor,
  evaluateCausalProcessFieldProjection,
  hashCausalPayload,
  resolveCausalProcessFieldProjection,
  resolveGeologicSpine,
  sampleCausalProcessFieldProjectionDiagnosticGrid,
  sphericalAngularDistanceDegrees,
  validateCausalProcessFieldProjectionDiagnosticGrid,
  validateCausalProcessFieldProjectionQueryResult,
  validateCausalProcessFieldProjectionSet,
  type CausalGeologyInputV1,
  type CausalProcessFieldProjectionIdV1,
  type CausalStageResultV1,
  type GeologicSpineFixtureSetV1,
  type GeologicSpineNodeFamily,
  type GeologicSpineResearchReviewV1,
  type InteriorStateV1,
  type PlanetaryPremiseV1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
  type TectonicRegimeHistoryV1,
} from '../src/core/causalGeology';

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

function createResearchContext() {
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
    const researchContext = createResearchContext();
    const history = createHistory();
    const caseReports: Array<Record<string, unknown>> = [];
    const projectionHashes = new Set<string>();
    const sampledQueryHashes = new Set<string>();

    for (const seed of controlledSeeds) {
      const input = createInput(seed);
      const premise = createPremise(input);
      const interior = createInterior(seed);
      const historyStageResult = createHistoryStageResult(input, premise, interior, history);
      const spineResolution = resolveGeologicSpine({
        inputSnapshot: input,
        premise,
        interior,
        regimeHistory: history,
        regimeHistoryStageResult: historyStageResult,
        researchContext,
      });
      expect(spineResolution.status).toBe('PARTIAL');
      if (!spineResolution.spine) throw new Error(`D2 controlled case ${seed} did not produce a spine.`);

      const startProjection = performance.now();
      const projection = resolveCausalProcessFieldProjection(history, spineResolution.spine);
      const projectionMilliseconds = performance.now() - startProjection;
      const replay = resolveCausalProcessFieldProjection(history, spineResolution.spine);
      validateCausalProcessFieldProjectionSet(projection);
      expect(projection).toEqual(replay);
      expect(projection.kernels).toHaveLength(spineResolution.spine.nodes.length * 6);
      expect(projection.sourceRegimeHistoryHash).toEqual(history.contentHash);
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
    const researchContext = createResearchContext();
    const input = createInput('d2-lineage-rejection');
    const premise = createPremise(input);
    const interior = createInterior('d2-lineage-rejection');
    const history = createHistory();
    const stage = createHistoryStageResult(input, premise, interior, history);
    const resolution = resolveGeologicSpine({
      inputSnapshot: input,
      premise,
      interior,
      regimeHistory: history,
      regimeHistoryStageResult: stage,
      researchContext,
    });
    if (!resolution.spine) throw new Error('D2 lineage rejection fixture did not produce a spine.');
    const wrongHistory = createHistory('different-history');
    expect(() => resolveCausalProcessFieldProjection(wrongHistory, resolution.spine)).toThrow(/unknown history epoch|outside history epoch/i);
  });
});

function createInput(seed: string): CausalGeologyInputV1 {
  return createCausalGeologyInput(seed, [
    {
      schemaVersion: 1,
      inputId: 'thermal.age',
      quantity: createScientificQuantity(4.6, 'gigaannum', 'gigaannum-v1'),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `input:${seed}:thermal-age`,
      confidenceSubject: `d2.${seed}.thermal-age`,
      evidenceIds: [],
    },
    {
      schemaVersion: 1,
      inputId: 'inventory.water',
      quantity: createScientificQuantity(0.8, 'earth-water-inventory', 'earth-water-inventory-v1'),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `input:${seed}:water`,
      confidenceSubject: `d2.${seed}.water`,
      evidenceIds: [],
    },
    {
      schemaVersion: 1,
      inputId: 'thermal.radiogenic-heat',
      quantity: createScientificQuantity(0.6, 'normalized-0-1', 'normalized-0-1-v1'),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `input:${seed}:radiogenic`,
      confidenceSubject: `d2.${seed}.radiogenic`,
      evidenceIds: [],
    },
  ], {
    limitations: ['D2 controlled process-field projection input fixture.'],
  });
}

function createPremise(input: CausalGeologyInputV1): PlanetaryPremiseV1 {
  const payload = {
    schemaVersion: 1 as const,
    premiseVersion: 1,
    status: 'PARTIAL' as const,
    inputSnapshotHash: input.contentHash,
    bodyClassCandidates: ['ROCKY_TERRESTRIAL' as const],
    surfaceMediumCandidates: ['SOLID_SURFACE'],
    layerStackCandidates: ['METALLIC_CORE_SILICATE_MANTLE_CRUST'],
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: 'd2.controlled.premise',
    evidenceIds: ['evidence.d2.premise'],
    contradictionIds: [] as readonly string[],
    limitations: ['D2 controlled premise fixture.'],
  };
  return {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/planetary-premise/v1', payload),
  };
}

function createInterior(seed: string): InteriorStateV1 {
  const payload = {
    schemaVersion: 1 as const,
    status: 'PARTIAL' as const,
    interiorVersion: 1,
    thermalBudgetRange: createScientificRange(0.68, 0.76, 'normalized-0-1', 'normalized-0-1-v1', `d2.${seed}.thermal`),
    heatSourceFractions: [
      { sourceId: 'PRIMORDIAL' as const, fractionRange: createScientificRange(0.2, 0.3, 'normalized-0-1', 'normalized-0-1-v1', `d2.${seed}.primordial`) },
      { sourceId: 'RADIOGENIC' as const, fractionRange: createScientificRange(0.4, 0.5, 'normalized-0-1', 'normalized-0-1-v1', `d2.${seed}.radiogenic`) },
      { sourceId: 'TIDAL' as const, fractionRange: createScientificRange(0.05, 0.1, 'normalized-0-1', 'normalized-0-1-v1', `d2.${seed}.tidal`) },
    ],
    mantleConvectionRange: createScientificRange(0.55, 0.68, 'normalized-0-1', 'normalized-0-1-v1', `d2.${seed}.convection`),
    rheologyCandidates: ['TEMPERATURE_DEPENDENT_SOLID_STATE'],
    lithosphereBehaviorCandidates: ['RIGID_SINGLE_LID'],
    lidRegimeCandidates: ['EPISODIC_LID', 'MOBILE_LID_HYPOTHESIS'],
    resolvedLidRegime: 'MOBILE_LID_HYPOTHESIS' as const,
    meltAndVolcanismRange: createScientificRange(0.45, 0.58, 'normalized-0-1', 'normalized-0-1-v1', `d2.${seed}.melt`),
    riftTendencyRange: createScientificRange(0.5, 0.65, 'normalized-0-1', 'normalized-0-1-v1', `d2.${seed}.rift`),
    hotspotTendencyRange: createScientificRange(0.35, 0.5, 'normalized-0-1', 'normalized-0-1-v1', `d2.${seed}.hotspot`),
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: `d2.${seed}.interior`,
    evidenceIds: ['evidence.d2.interior'],
    contradictionIds: [] as readonly string[],
    limitations: ['D2 controlled interior fixture.'],
  };
  return {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/interior-state/v1', payload),
  };
}

function createHistory(suffix = 'controlled'): TectonicRegimeHistoryV1 {
  const epochs = [
    {
      schemaVersion: 1 as const,
      epochId: `epoch-0-${suffix}`,
      startTime: 0,
      endTime: 0.32,
      regime: 'STAGNANT_LID' as const,
      transitionInEventId: undefined,
      transitionOutEventId: `transition-0-${suffix}`,
      confidenceAssessmentSubject: `d2.${suffix}.epoch0`,
      evidenceIds: ['evidence.d2.history'],
      contradictionIds: [] as readonly string[],
      limitations: ['D2 controlled stagnant epoch.'],
    },
    {
      schemaVersion: 1 as const,
      epochId: `epoch-1-${suffix}`,
      startTime: 0.32,
      endTime: 0.66,
      regime: 'EPISODIC_LID' as const,
      transitionInEventId: `transition-0-${suffix}`,
      transitionOutEventId: `transition-1-${suffix}`,
      confidenceAssessmentSubject: `d2.${suffix}.epoch1`,
      evidenceIds: ['evidence.d2.history'],
      contradictionIds: [] as readonly string[],
      limitations: ['D2 controlled episodic epoch.'],
    },
    {
      schemaVersion: 1 as const,
      epochId: `epoch-2-${suffix}`,
      startTime: 0.66,
      endTime: 1,
      regime: 'MOBILE_LID_HYPOTHESIS' as const,
      transitionInEventId: `transition-1-${suffix}`,
      transitionOutEventId: undefined,
      confidenceAssessmentSubject: `d2.${suffix}.epoch2`,
      evidenceIds: ['evidence.d2.history'],
      contradictionIds: [] as readonly string[],
      limitations: ['D2 controlled mobile-lid hypothesis epoch.'],
    },
  ];
  const transitions = [
    {
      schemaVersion: 1 as const,
      transitionEventId: `transition-0-${suffix}`,
      normalizedTime: 0.32,
      fromRegime: 'STAGNANT_LID' as const,
      toRegime: 'EPISODIC_LID' as const,
      trigger: 'SECULAR_COOLING' as const,
      sourceEpochId: `epoch-0-${suffix}`,
      destinationEpochId: `epoch-1-${suffix}`,
      assumptions: [] as readonly string[],
      branchResolutionIds: [] as readonly string[],
      confidenceAssessmentSubject: `d2.${suffix}.transition0`,
      evidenceIds: ['evidence.d2.history'],
      contradictionIds: [] as readonly string[],
      limitations: ['D2 controlled regime transition.'],
    },
    {
      schemaVersion: 1 as const,
      transitionEventId: `transition-1-${suffix}`,
      normalizedTime: 0.66,
      fromRegime: 'EPISODIC_LID' as const,
      toRegime: 'MOBILE_LID_HYPOTHESIS' as const,
      trigger: 'WATER_WEAKENING' as const,
      sourceEpochId: `epoch-1-${suffix}`,
      destinationEpochId: `epoch-2-${suffix}`,
      assumptions: [] as readonly string[],
      branchResolutionIds: [] as readonly string[],
      confidenceAssessmentSubject: `d2.${suffix}.transition1`,
      evidenceIds: ['evidence.d2.history'],
      contradictionIds: [] as readonly string[],
      limitations: ['D2 controlled regime transition.'],
    },
  ];
  const payload = {
    schemaVersion: 1 as const,
    status: 'PARTIAL' as const,
    regimeHistoryVersion: 1,
    totalResolvedDuration: createScientificQuantity(4.6, 'gigaannum', 'gigaannum-v1'),
    epochs,
    transitions,
    currentRegime: 'MOBILE_LID_HYPOTHESIS' as const,
    currentEpochId: `epoch-2-${suffix}`,
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: `d2.${suffix}.history`,
    evidenceIds: ['evidence.d2.history'],
    contradictionIds: [] as readonly string[],
    limitations: ['D2 controlled tectonic regime history fixture.'],
  };
  return {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/tectonic-regime-history/v1', payload),
  };
}

function createHistoryStageResult(
  input: CausalGeologyInputV1,
  premise: PlanetaryPremiseV1,
  interior: InteriorStateV1,
  history: TectonicRegimeHistoryV1,
): CausalStageResultV1<TectonicRegimeHistoryV1> {
  return createCausalStageResult({
    stageId: 'CAUSAL_REGIME_HISTORY',
    stageVersion: 1,
    status: 'PARTIAL',
    input: { inputSnapshot: input, premise, interior },
    record: history,
    limitations: history.limitations,
    missingDomains: ['long-term-regime-history-calibration'],
    downstreamCompatibleStageIds: ['CAUSAL_GEOLOGIC_SPINE'],
  });
}

function readResearchJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(researchRoot, fileName), 'utf8')) as T;
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(resolve(path, '..'), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}
