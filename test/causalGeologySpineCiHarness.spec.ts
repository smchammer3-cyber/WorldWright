import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  createCausalGeologyInput,
  createCausalStageResult,
  createGeologicSpineResearchContext,
  createRegimeHistoryResearchContext,
  createScientificQuantity,
  createScientificRange,
  createScientificResearchBundle,
  hashCausalPayload,
  runGeologicSpineShadow,
  runRegimeHistoryShadow,
  validateCausalGeologyInput,
  validateCausalStageResult,
  validateGeologicSpine,
  validateGeologicSpineShadowRunnerResult,
  validateInteriorState,
  validatePlanetaryPremise,
  validateRegimeHistoryShadowRunnerResult,
  validateTectonicRegimeHistory,
  type CausalGeologyInputId,
  type CausalInputDeclarationV1,
  type CausalStageResultV1,
  type GeologicSpineFixtureSetV1,
  type GeologicSpineResearchReviewV1,
  type InteriorStateV1,
  type PlanetaryPremiseV1,
  type RegimeHistoryFixtureSetV1,
  type RegimeHistoryResearchFixtureV1,
  type RegimeHistoryResearchReviewV1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
} from '../src/core/causalGeology';
import { resolveWorldFeatureFlags } from '../src/core/worldFeatureFlags/resolve';
import { getRandomStreamDefinition } from '../src/core/worldRandom/streamRegistry';

interface SkeletonCiCorpusCaseV1 {
  readonly caseId: string;
  readonly rootSeed: string;
  readonly regimeFixtureId: string;
}

interface SkeletonCiCorpusV1 {
  readonly schemaVersion: 1;
  readonly corpusVersion: 'W1_05B_SKELETON_CI_CORPUS_V1';
  readonly expectedSpineDisposition: 'PRESENT_SHADOW';
  readonly cases: readonly SkeletonCiCorpusCaseV1[];
}

interface SkeletonCiCaseSummaryV1 {
  readonly caseId: string;
  readonly rootSeed: string;
  readonly regimeFixtureId: string;
  readonly historyStatus: 'PARTIAL';
  readonly historyHash: string;
  readonly epochCount: number;
  readonly transitionCount: number;
  readonly currentRegime: string;
  readonly spineDisposition: 'PRESENT_SHADOW';
  readonly spineStatus: 'PARTIAL';
  readonly spineHash: string;
  readonly nodeCount: number;
  readonly edgeCount: number;
  readonly eventCount: number;
  readonly featureFamilies: readonly string[];
}

const repositoryRoot = process.cwd();
const researchRoot = resolve(repositoryRoot, 'src/core/causalGeology/research');
const fixtureRoot = resolve(repositoryRoot, 'test/fixtures');
const artifactRoot = resolve(repositoryRoot, process.env.CAUSAL_SKELETON_CI_OUT ?? 'artifacts/causal-skeleton-gate');

const historyReview = readResearchJson<RegimeHistoryResearchReviewV1>('regime-history-review-record.json');
const historyFixtureSet = readResearchJson<RegimeHistoryFixtureSetV1>('regime-history-fixtures.json');
const spineReview = readResearchJson<GeologicSpineResearchReviewV1>('geologic-spine-review-record.json');
const spineFixtureSet = readResearchJson<GeologicSpineFixtureSetV1>('geologic-spine-fixtures.json');
const corpus = readFixtureJson<SkeletonCiCorpusV1>('w1-05a-skeleton-ci-corpus.json');

const CONTRACTS: Readonly<Record<string, readonly [string, string]>> = {
  'inventory.water': ['earth-water-inventory', 'earth-water-inventory-v1'],
  'thermal.age': ['gigaannum', 'gigaannum-v1'],
};

function createHistoryResearchContext() {
  return createRegimeHistoryResearchContext({
    researchBundle: createScientificResearchBundle({
      bundleVersion: historyReview.bundleVersion,
      sources: readResearchJson<ScientificSourceV1[]>('regime-history-source-registry.json'),
      claimRules: readResearchJson<ScientificClaimRuleV1[]>('regime-history-claim-rules.json'),
      correlationGroups: readResearchJson<string[]>('regime-history-correlation-groups.json'),
      knownLimitations: readResearchJson<string[]>('regime-history-known-limitations.json'),
    }),
    fixtureSet: historyFixtureSet,
    review: historyReview,
  });
}

function createSpineResearchContext() {
  return createGeologicSpineResearchContext({
    researchBundle: createScientificResearchBundle({
      bundleVersion: spineReview.bundleVersion,
      sources: readResearchJson<ScientificSourceV1[]>('geologic-spine-source-registry.json'),
      claimRules: readResearchJson<ScientificClaimRuleV1[]>('geologic-spine-claim-rules.json'),
      correlationGroups: readResearchJson<string[]>('geologic-spine-correlation-groups.json'),
      knownLimitations: readResearchJson<string[]>('geologic-spine-known-limitations.json'),
    }),
    fixtureSet: spineFixtureSet,
    review: spineReview,
  });
}

function inputForCase(caseDefinition: SkeletonCiCorpusCaseV1, fixture: RegimeHistoryResearchFixtureV1) {
  const values: readonly [CausalGeologyInputId, number][] = [
    ['inventory.water', fixture.waterInventory],
    ['thermal.age', fixture.ageGyr],
  ];
  const declarations: CausalInputDeclarationV1[] = values.map(([inputId, value]) => {
    const contract = CONTRACTS[inputId];
    if (!contract) throw new Error(`Missing W1-05B quantity contract ${inputId}.`);
    return {
      schemaVersion: 1,
      inputId,
      quantity: createScientificQuantity(value, contract[0], contract[1]),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `w1-05b/${caseDefinition.caseId}/${inputId}`,
      confidenceSubject: `w1-05b.${caseDefinition.caseId}.${inputId}`,
      evidenceIds: [],
    };
  });
  return createCausalGeologyInput(caseDefinition.rootSeed, declarations, {
    initialConditionBundleHash: hashCausalPayload('WorldWright/w1-05b-skeleton-ci-input/v1', {
      caseId: caseDefinition.caseId,
      fixtureId: fixture.fixtureId,
      rootSeed: caseDefinition.rootSeed,
      ageGyr: fixture.ageGyr,
      waterInventory: fixture.waterInventory,
    }),
  });
}

function premiseForCase(
  caseDefinition: SkeletonCiCorpusCaseV1,
  fixture: RegimeHistoryResearchFixtureV1,
  inputHash: ReturnType<typeof inputForCase>['contentHash'],
): PlanetaryPremiseV1 {
  const payload = {
    schemaVersion: 1 as const,
    premiseVersion: 1,
    status: 'PARTIAL' as const,
    inputSnapshotHash: inputHash,
    bodyClassCandidates: fixture.premiseBodyClassCandidates,
    surfaceMediumCandidates: ['CONTROLLED_SOLID_SURFACE'],
    layerStackCandidates: ['CONTROLLED_SOLID_LAYER_STACK'],
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: `w1-05b.${caseDefinition.caseId}.premise`,
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['W1-05B uses a controlled validated premise fixture; aggregate premise evaluation remains W1-06 scope.'],
  };
  const value = {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/planetary-premise/v1', payload),
  };
  validatePlanetaryPremise(value);
  return value;
}

function interiorForCase(caseDefinition: SkeletonCiCorpusCaseV1, fixture: RegimeHistoryResearchFixtureV1): InteriorStateV1 {
  const normalized = (center: number, subject: string) => createScientificRange(
    Math.max(0, center - 0.04),
    Math.min(1, center + 0.04),
    'normalized-0-1',
    'normalized-0-1-v1',
    subject,
  );
  const ice = fixture.premiseBodyClassCandidates.includes('ICE_SHELL_OCEAN_BODY');
  const payload = {
    schemaVersion: 1 as const,
    status: 'PARTIAL' as const,
    interiorVersion: 1,
    thermalBudgetRange: normalized(fixture.interior.thermalBudgetCenter, `w1-05b.${caseDefinition.caseId}.thermal`),
    heatSourceFractions: [
      { sourceId: 'PRIMORDIAL' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.primordial, `w1-05b.${caseDefinition.caseId}.primordial`) },
      { sourceId: 'RADIOGENIC' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.radiogenic, `w1-05b.${caseDefinition.caseId}.radiogenic`) },
      { sourceId: 'TIDAL' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.tidal, `w1-05b.${caseDefinition.caseId}.tidal`) },
    ],
    mantleConvectionRange: normalized(fixture.interior.convectionCenter, `w1-05b.${caseDefinition.caseId}.convection`),
    rheologyCandidates: [ice ? 'ICE_SHELL_TEMPERATURE_DEPENDENT' : 'TEMPERATURE_DEPENDENT_SOLID_STATE'],
    lithosphereBehaviorCandidates: [ice ? 'RIGID_ICE_SHELL' : 'RIGID_SINGLE_LID'],
    lidRegimeCandidates: fixture.interior.lidRegimeCandidates,
    resolvedLidRegime: fixture.interior.resolvedLidRegime,
    meltAndVolcanismRange: normalized(fixture.interior.meltCenter, `w1-05b.${caseDefinition.caseId}.melt`),
    riftTendencyRange: normalized(fixture.interior.riftCenter, `w1-05b.${caseDefinition.caseId}.rift`),
    hotspotTendencyRange: normalized(fixture.interior.hotspotCenter, `w1-05b.${caseDefinition.caseId}.hotspot`),
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: `w1-05b.${caseDefinition.caseId}.interior`,
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['W1-05B uses a controlled validated interior fixture; aggregate interior evaluation remains W1-06 scope.'],
  };
  const value = {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/interior-state/v1', payload),
  };
  validateInteriorState(value);
  return value;
}

function createUpstreamStageResults(
  input: ReturnType<typeof inputForCase>,
  premise: PlanetaryPremiseV1,
  interior: InteriorStateV1,
): readonly CausalStageResultV1[] {
  const inputStage = createCausalStageResult({
    stageId: 'CAUSAL_INPUT_SANITIZATION',
    stageVersion: 1,
    status: 'COMPLETE',
    input: { rootSeed: input.rootSeed, sourceDeclarations: input.sourceDeclarations },
    record: input,
  });
  const premiseStage = createCausalStageResult({
    stageId: 'CAUSAL_PREMISE_RESOLUTION',
    stageVersion: 1,
    status: 'PARTIAL',
    input,
    record: premise,
    limitations: premise.limitations,
    missingDomains: ['controlled-fixture-premise-resolution'],
    downstreamCompatibleStageIds: ['CAUSAL_INTERIOR_RESOLUTION'],
  });
  const interiorStage = createCausalStageResult({
    stageId: 'CAUSAL_INTERIOR_RESOLUTION',
    stageVersion: 1,
    status: 'PARTIAL',
    input: { inputSnapshot: input, premise },
    record: interior,
    limitations: interior.limitations,
    missingDomains: ['controlled-fixture-interior-resolution'],
    downstreamCompatibleStageIds: ['CAUSAL_REGIME_HISTORY'],
  });
  for (const stage of [inputStage, premiseStage, interiorStage]) validateCausalStageResult(stage);
  return Object.freeze([inputStage, premiseStage, interiorStage]);
}

describe('W1-05B causal geologic-skeleton CI harness', () => {
  it('runs seven unique fixed causal cases and requires a valid present shadow skeleton', () => {
    validateCorpus(corpus, historyFixtureSet, spineFixtureSet);
    const fixtureById = new Map(historyFixtureSet.fixtures.map((fixture) => [fixture.fixtureId, fixture]));
    const spineFixtureByRegimeId = new Map(spineFixtureSet.fixtures.map((fixture) => [fixture.regimeFixtureId, fixture]));
    const historyResearchContext = createHistoryResearchContext();
    const spineResearchContext = createSpineResearchContext();
    const spineStream = getRandomStreamDefinition('causal.geologic-spine');

    expect(corpus.cases.length).toBeGreaterThanOrEqual(6);
    expect(new Set(corpus.cases.map((entry) => entry.rootSeed)).size).toBe(corpus.cases.length);
    expect(spineStream.status).toBe('ACTIVE');
    expect(spineStream.allowedAuthorityModes).toEqual(['CAUSAL_SHADOW']);

    rmSync(artifactRoot, { recursive: true, force: true });
    mkdirSync(artifactRoot, { recursive: true });

    const summaries: SkeletonCiCaseSummaryV1[] = [];
    for (const caseDefinition of corpus.cases) {
      const fixture = fixtureById.get(caseDefinition.regimeFixtureId);
      const spineFixture = spineFixtureByRegimeId.get(caseDefinition.regimeFixtureId);
      if (!fixture) throw new Error(`Missing W1-05B regime fixture ${caseDefinition.regimeFixtureId}.`);
      if (!spineFixture) throw new Error(`Missing W1-05B spine fixture for ${caseDefinition.regimeFixtureId}.`);

      const startHeap = process.memoryUsage().heapUsed;
      const startTime = performance.now();
      const input = inputForCase(caseDefinition, fixture);
      const premise = premiseForCase(caseDefinition, fixture, input.contentHash);
      const interior = interiorForCase(caseDefinition, fixture);
      const upstreamStages = createUpstreamStageResults(input, premise, interior);
      const interiorStageResult = upstreamStages[2] as CausalStageResultV1<InteriorStateV1>;
      const featureFlags = resolveWorldFeatureFlags('CAUSAL_SHADOW', { 'causal.shadow.enabled': true });
      const historyOptions = {
        authorityMode: 'CAUSAL_SHADOW' as const,
        featureFlags,
        inputSnapshot: input,
        premise,
        interior,
        interiorStageResult,
        researchContext: historyResearchContext,
      };
      const historyFirst = runRegimeHistoryShadow(historyOptions);
      const historyReplay = runRegimeHistoryShadow(historyOptions);
      expect(historyFirst).toEqual(historyReplay);
      validateRegimeHistoryShadowRunnerResult(historyFirst);
      const history = historyFirst.resolution.history!;

      const spineOptions = {
        authorityMode: 'CAUSAL_SHADOW' as const,
        featureFlags,
        inputSnapshot: input,
        premise,
        interior,
        regimeHistory: history,
        regimeHistoryStageResult: historyFirst.stageResult,
        researchContext: spineResearchContext,
      };
      const spineFirst = runGeologicSpineShadow(spineOptions);
      const spineReplay = runGeologicSpineShadow(spineOptions);
      const durationMilliseconds = performance.now() - startTime;
      const heapDeltaBytes = Math.max(0, process.memoryUsage().heapUsed - startHeap);

      validateCausalGeologyInput(input);
      validatePlanetaryPremise(premise);
      validateInteriorState(interior);
      validateTectonicRegimeHistory(history);
      validateGeologicSpineShadowRunnerResult(spineFirst);
      expect(spineFirst).toEqual(spineReplay);
      expect(historyFirst.stageResult.status).toBe('PARTIAL');
      expect(historyFirst.stageResult.downstreamCompatibleStageIds).toEqual(['CAUSAL_GEOLOGIC_SPINE']);
      expect(spineFirst.stageResult.status).toBe('PARTIAL');
      expect(spineFirst.stageResult.downstreamCompatibleStageIds).toEqual([]);
      expect(spineFirst.resolution.spine).toBeDefined();

      const spine = spineFirst.resolution.spine!;
      validateGeologicSpine(spine);
      expect(spine.nodes.length).toBeGreaterThanOrEqual(spineFixture.expected.minimumNodeCount);
      expect(spine.nodes.length).toBeLessThanOrEqual(spineFixture.expected.maximumNodeCount);
      expect(spine.edges.length).toBeGreaterThanOrEqual(spineFixture.expected.minimumEdgeCount);
      expect(spine.edges.length).toBeLessThanOrEqual(spineFixture.expected.maximumEdgeCount);
      expect(spine.events.length).toBeGreaterThanOrEqual(spineFixture.expected.minimumEventCount);
      expect(spine.events.length).toBeLessThanOrEqual(spineFixture.expected.maximumEventCount);
      for (const family of spineFixture.expected.requiredFamilies) expect(spine.featureFamilies).toContain(family);
      for (const family of spine.featureFamilies) expect(spineFixture.expected.allowedFamilies).toContain(family);
      expect(history.epochs[0].startTime).toBe(0);
      expect(history.epochs.at(-1)?.endTime).toBe(1);
      expect(history.transitions.length).toBe(history.epochs.length - 1);
      expect(history.epochs.at(-1)?.regimeFamily).toBe(interior.resolvedLidRegime);
      expect(spine.nodes.length).toBe(spine.events.length);
      for (const node of spine.nodes) expect(node.formationEventIds).toHaveLength(1);

      const runtimeKeys = collectObjectKeys(spineFirst);
      for (const forbidden of [
        'baseHeight',
        'continentSkeletons',
        'elevation',
        'finalTerrain',
        'landMask',
        'oceanBasinSkeletons',
        'plateId',
        'seaLevel',
        'terrainHeight',
        'WorldBrain',
      ]) expect(runtimeKeys).not.toContain(forbidden);

      const stageResults = [...upstreamStages, historyFirst.stageResult, spineFirst.stageResult];
      for (const stage of stageResults) validateCausalStageResult(stage);
      const validationReport = {
        schemaVersion: 1,
        caseId: caseDefinition.caseId,
        checks: {
          sanitizedInputValid: true,
          premiseValid: true,
          interiorValid: true,
          regimeHistoryValid: true,
          historyDeterministicReplay: true,
          normalizedHistoryCoverage: true,
          adjacentTransitionCount: true,
          finalEpochMatchesCurrentInterior: true,
          geologicSpineStreamActiveShadowOnly: spineStream.status === 'ACTIVE' && spineStream.allowedAuthorityModes.length === 1 && spineStream.allowedAuthorityModes[0] === 'CAUSAL_SHADOW',
          geologicSpineRecordPresent: true,
          geologicSpineValid: true,
          geologicSpineDeterministicReplay: true,
          requiredFeatureFamiliesPresent: true,
          eventAncestryValid: true,
          sphericalCoordinatesValid: true,
          legacyPhysicalFieldsAbsent: true,
        },
        pass: true,
      } as const;
      const caseSummary: SkeletonCiCaseSummaryV1 = {
        caseId: caseDefinition.caseId,
        rootSeed: caseDefinition.rootSeed,
        regimeFixtureId: fixture.fixtureId,
        historyStatus: history.status,
        historyHash: history.contentHash.value,
        epochCount: history.epochs.length,
        transitionCount: history.transitions.length,
        currentRegime: interior.resolvedLidRegime ?? 'UNRESOLVED',
        spineDisposition: 'PRESENT_SHADOW',
        spineStatus: spine.status,
        spineHash: spine.contentHash.value,
        nodeCount: spine.nodes.length,
        edgeCount: spine.edges.length,
        eventCount: spine.events.length,
        featureFamilies: spine.featureFamilies,
      };
      summaries.push(caseSummary);

      const caseDirectory = resolve(artifactRoot, caseDefinition.caseId);
      mkdirSync(caseDirectory, { recursive: true });
      writeJson(resolve(caseDirectory, 'causal-shadow-manifest.json'), {
        schemaVersion: 1,
        harnessVersion: 2,
        corpusVersion: corpus.corpusVersion,
        caseId: caseDefinition.caseId,
        rootSeed: caseDefinition.rootSeed,
        authorityMode: 'CAUSAL_SHADOW',
        upstreamMode: 'CONTROLLED_VALIDATED_W1_04_FIXTURES',
        stageStatuses: stageResults.map((stage) => ({ stageId: stage.stageId, status: stage.status })),
        geologicSpineDisposition: corpus.expectedSpineDisposition,
      });
      writeJson(resolve(caseDirectory, 'sanitized-input.json'), input);
      writeJson(resolve(caseDirectory, 'stage-results.json'), stageResults);
      writeJson(resolve(caseDirectory, 'premise.json'), premise);
      writeJson(resolve(caseDirectory, 'interior.json'), interior);
      writeJson(resolve(caseDirectory, 'regime-history.json'), history);
      writeJson(resolve(caseDirectory, 'geologic-spine.json'), spine);
      writeJson(resolve(caseDirectory, 'confidence-ledger.json'), {
        schemaVersion: 1,
        status: 'DEFERRED_TO_W1_06',
        reason: 'Aggregate confidence correlation and reference scoring remain W1-06 scope; W1-05B retains evidence IDs and PARTIAL status.',
      });
      writeJson(resolve(caseDirectory, 'contradictions.json'), {
        schemaVersion: 1,
        contradictionIds: [...new Set([
          ...input.contradictionIds,
          ...premise.contradictionIds,
          ...interior.contradictionIds,
          ...history.contradictionIds,
          ...spine.contradictionIds,
        ])].sort(compareStableText),
      });
      writeJson(resolve(caseDirectory, 'provenance.json'), {
        schemaVersion: 1,
        corpusVersion: corpus.corpusVersion,
        regimeFixtureId: fixture.fixtureId,
        spineFixtureId: spineFixture.fixtureId,
        inputHash: input.contentHash,
        premiseHash: premise.contentHash,
        interiorHash: interior.contentHash,
        historyHash: history.contentHash,
        spineHash: spine.contentHash,
        historyResearchContextHash: historyResearchContext.contentHash,
        spineResearchContextHash: spineResearchContext.contentHash,
      });
      writeJson(resolve(caseDirectory, 'validation-report.json'), validationReport);
      writeJson(resolve(caseDirectory, 'reference-audit-plan.json'), {
        schemaVersion: 1,
        status: 'W1_05_REVIEWED_RULES_WITH_W1_06_AGGREGATE_AUDIT_PENDING',
        reviewedRuleIds: spine.evidenceIds,
        reason: 'W1-05B uses a reviewed source bundle and controlled fixtures; full aggregate distributions and expanded archetype coverage remain W1-06 scope.',
      });
      writeJson(resolve(caseDirectory, 'shadow-vs-legacy-comparison.json'), {
        schemaVersion: 1,
        status: 'NOT_READ_BY_CAUSAL_HARNESS',
        reason: 'Legacy solved morphology is forbidden input. Snapshot and full-globe jobs remain the independent physical-output isolation gates.',
      });
      writeJson(resolve(caseDirectory, 'performance-report.json'), {
        schemaVersion: 1,
        operationalOnly: true,
        durationMilliseconds,
        heapDeltaBytes,
        serializedHistoryBytes: Buffer.byteLength(JSON.stringify(history), 'utf8'),
        serializedSpineBytes: Buffer.byteLength(JSON.stringify(spine), 'utf8'),
        epochCount: history.epochs.length,
        transitionCount: history.transitions.length,
        nodeCount: spine.nodes.length,
        edgeCount: spine.edges.length,
        eventCount: spine.events.length,
        note: 'Operational performance values are diagnostics and never enter causal identity.',
      });
    }

    expect(summaries.length).toBe(corpus.cases.length);
    expect(summaries.every((summary) => summary.spineDisposition === 'PRESENT_SHADOW')).toBe(true);
    expect(new Set(summaries.map((summary) => summary.historyHash)).size).toBeGreaterThan(1);
    expect(new Set(summaries.map((summary) => summary.spineHash)).size).toBe(corpus.cases.length);

    writeJson(resolve(artifactRoot, 'corpus-manifest.json'), {
      schemaVersion: 1,
      harnessVersion: 2,
      corpusVersion: corpus.corpusVersion,
      authorityMode: 'CAUSAL_SHADOW',
      caseCount: summaries.length,
      uniqueSeedCount: new Set(summaries.map((summary) => summary.rootSeed)).size,
      expectedSpineDisposition: corpus.expectedSpineDisposition,
      geologicSpineStreamStatus: spineStream.status,
      geologicSpineAllowedAuthorityModes: spineStream.allowedAuthorityModes,
      physicalGeneratorAuthority: 'LEGACY',
      cases: summaries,
    });
  });
});

function validateCorpus(
  value: SkeletonCiCorpusV1,
  historyFixtures: RegimeHistoryFixtureSetV1,
  spineFixtures: GeologicSpineFixtureSetV1,
): void {
  const rootKeys = Object.keys(value).sort(compareStableText);
  expect(rootKeys).toEqual(['cases', 'corpusVersion', 'expectedSpineDisposition', 'schemaVersion']);
  expect(value.schemaVersion).toBe(1);
  expect(value.corpusVersion).toBe('W1_05B_SKELETON_CI_CORPUS_V1');
  expect(value.expectedSpineDisposition).toBe('PRESENT_SHADOW');
  expect(value.cases.length).toBeGreaterThanOrEqual(6);

  const historyFixtureIds = new Set(historyFixtures.fixtures.map((fixture) => fixture.fixtureId));
  const spineRegimeFixtureIds = new Set(spineFixtures.fixtures.map((fixture) => fixture.regimeFixtureId));
  const caseIds = new Set<string>();
  const seeds = new Set<string>();
  let holdoutCount = 0;
  let thresholdCount = 0;
  for (const entry of value.cases) {
    expect(Object.keys(entry).sort(compareStableText)).toEqual(['caseId', 'regimeFixtureId', 'rootSeed']);
    expect(entry.caseId.trim().length).toBeGreaterThan(0);
    expect(entry.rootSeed.trim().length).toBeGreaterThan(0);
    expect(historyFixtureIds.has(entry.regimeFixtureId)).toBe(true);
    expect(spineRegimeFixtureIds.has(entry.regimeFixtureId)).toBe(true);
    expect(caseIds.has(entry.caseId)).toBe(false);
    expect(seeds.has(entry.rootSeed)).toBe(false);
    caseIds.add(entry.caseId);
    seeds.add(entry.rootSeed);
    const fixture = historyFixtures.fixtures.find((candidate) => candidate.fixtureId === entry.regimeFixtureId);
    if (fixture?.kind === 'HOLDOUT') holdoutCount += 1;
    if (fixture?.kind === 'THRESHOLD') thresholdCount += 1;
  }
  expect(holdoutCount).toBeGreaterThanOrEqual(2);
  expect(thresholdCount).toBeGreaterThanOrEqual(1);
}

function writeJson(path: string, value: unknown): void {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function collectObjectKeys(value: unknown, output = new Set<string>()): Set<string> {
  if (!value || typeof value !== 'object') return output;
  if (Array.isArray(value)) {
    for (const entry of value) collectObjectKeys(entry, output);
    return output;
  }
  for (const [key, entry] of Object.entries(value)) {
    output.add(key);
    collectObjectKeys(entry, output);
  }
  return output;
}

function readResearchJson<T>(filename: string): T {
  return JSON.parse(readFileSync(resolve(researchRoot, filename), 'utf8')) as T;
}

function readFixtureJson<T>(filename: string): T {
  return JSON.parse(readFileSync(resolve(fixtureRoot, filename), 'utf8')) as T;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
