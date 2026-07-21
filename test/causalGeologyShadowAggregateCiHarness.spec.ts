import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  createCausalGeologyInput,
  createCausalShadowAggregateReport,
  createCausalStageResult,
  createGeologicSpineResearchContext,
  createRegimeHistoryResearchContext,
  createScientificQuantity,
  createScientificRange,
  createScientificResearchBundle,
  hashCausalPayload,
  runGeologicSpineShadow,
  runRegimeHistoryShadow,
  validateCausalShadowAggregateReport,
  validateGeologicSpine,
  validateGeologicSpineShadowRunnerResult,
  validateInteriorState,
  validatePlanetaryPremise,
  validateRegimeHistoryShadowRunnerResult,
  validateTectonicRegimeHistory,
  type CausalGeologyInputId,
  type CausalInputDeclarationV1,
  type CausalShadowAuditCaseV1,
  type CausalShadowAuditVariationKindV1,
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

interface ShadowAuditCorpusCaseV1 {
  readonly caseId: string;
  readonly rootSeed: string;
  readonly regimeFixtureId: string;
  readonly archetypeFamily: string;
  readonly variationKind: CausalShadowAuditVariationKindV1;
  readonly directInputAxes: readonly string[];
}

interface ShadowAuditCorpusV1 {
  readonly schemaVersion: 1;
  readonly corpusVersion: 'W1_06A_SHADOW_AUDIT_CORPUS_V1';
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly upstreamMode: 'CONTROLLED_VALIDATED_W1_04_FIXTURES';
  readonly cases: readonly ShadowAuditCorpusCaseV1[];
}

const repositoryRoot = process.cwd();
const researchRoot = resolve(repositoryRoot, 'src/core/causalGeology/research');
const fixtureRoot = resolve(repositoryRoot, 'test/fixtures');
const artifactRoot = resolve(repositoryRoot, process.env.CAUSAL_SHADOW_AUDIT_CI_OUT ?? 'artifacts/causal-shadow-audit-gate');

const historyReview = readResearchJson<RegimeHistoryResearchReviewV1>('regime-history-review-record.json');
const historyFixtureSet = readResearchJson<RegimeHistoryFixtureSetV1>('regime-history-fixtures.json');
const spineReview = readResearchJson<GeologicSpineResearchReviewV1>('geologic-spine-review-record.json');
const spineFixtureSet = readResearchJson<GeologicSpineFixtureSetV1>('geologic-spine-fixtures.json');
const corpus = readFixtureJson<ShadowAuditCorpusV1>('w1-06a-shadow-audit-corpus.json');

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

function inputForCase(caseDefinition: ShadowAuditCorpusCaseV1, fixture: RegimeHistoryResearchFixtureV1) {
  const values: readonly [CausalGeologyInputId, number][] = [
    ['inventory.water', fixture.waterInventory],
    ['thermal.age', fixture.ageGyr],
  ];
  const declarations: CausalInputDeclarationV1[] = values.map(([inputId, value]) => {
    const contract = CONTRACTS[inputId];
    if (!contract) throw new Error(`Missing W1-06A quantity contract ${inputId}.`);
    return {
      schemaVersion: 1,
      inputId,
      quantity: createScientificQuantity(value, contract[0], contract[1]),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `w1-06a/${caseDefinition.caseId}/${inputId}`,
      confidenceSubject: `w1-06a.${caseDefinition.caseId}.${inputId}`,
      evidenceIds: [],
    };
  });
  return createCausalGeologyInput(caseDefinition.rootSeed, declarations, {
    initialConditionBundleHash: hashCausalPayload('WorldWright/w1-06a-shadow-audit-input/v1', {
      caseId: caseDefinition.caseId,
      fixtureId: fixture.fixtureId,
      rootSeed: caseDefinition.rootSeed,
      ageGyr: fixture.ageGyr,
      waterInventory: fixture.waterInventory,
    }),
  });
}

function premiseForCase(
  caseDefinition: ShadowAuditCorpusCaseV1,
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
    confidenceAssessmentSubject: `w1-06a.${caseDefinition.caseId}.premise`,
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['W1-06A aggregate harness uses a controlled validated premise fixture; direct premise threshold expansion remains later W1-06 scope.'],
  };
  const premise = {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/planetary-premise/v1', payload),
  };
  validatePlanetaryPremise(premise);
  return premise;
}

function interiorForCase(caseDefinition: ShadowAuditCorpusCaseV1, fixture: RegimeHistoryResearchFixtureV1): InteriorStateV1 {
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
    thermalBudgetRange: normalized(fixture.interior.thermalBudgetCenter, `w1-06a.${caseDefinition.caseId}.thermal`),
    heatSourceFractions: [
      { sourceId: 'PRIMORDIAL' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.primordial, `w1-06a.${caseDefinition.caseId}.primordial`) },
      { sourceId: 'RADIOGENIC' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.radiogenic, `w1-06a.${caseDefinition.caseId}.radiogenic`) },
      { sourceId: 'TIDAL' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.tidal, `w1-06a.${caseDefinition.caseId}.tidal`) },
    ],
    mantleConvectionRange: normalized(fixture.interior.convectionCenter, `w1-06a.${caseDefinition.caseId}.convection`),
    rheologyCandidates: [ice ? 'ICE_SHELL_TEMPERATURE_DEPENDENT' : 'TEMPERATURE_DEPENDENT_SOLID_STATE'],
    lithosphereBehaviorCandidates: [ice ? 'RIGID_ICE_SHELL' : 'RIGID_SINGLE_LID'],
    lidRegimeCandidates: fixture.interior.lidRegimeCandidates,
    resolvedLidRegime: fixture.interior.resolvedLidRegime,
    meltAndVolcanismRange: normalized(fixture.interior.meltCenter, `w1-06a.${caseDefinition.caseId}.melt`),
    riftTendencyRange: normalized(fixture.interior.riftCenter, `w1-06a.${caseDefinition.caseId}.rift`),
    hotspotTendencyRange: normalized(fixture.interior.hotspotCenter, `w1-06a.${caseDefinition.caseId}.hotspot`),
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: `w1-06a.${caseDefinition.caseId}.interior`,
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['W1-06A aggregate harness uses a controlled validated interior fixture; direct interior threshold expansion remains later W1-06 scope.'],
  };
  const interior = {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/interior-state/v1', payload),
  };
  validateInteriorState(interior);
  return interior;
}

function interiorStageResult(
  input: ReturnType<typeof inputForCase>,
  premise: PlanetaryPremiseV1,
  interior: InteriorStateV1,
): CausalStageResultV1<InteriorStateV1> {
  return createCausalStageResult({
    stageId: 'CAUSAL_INTERIOR_RESOLUTION',
    stageVersion: 1,
    status: 'PARTIAL',
    input: { inputSnapshot: input, premise },
    record: interior,
    limitations: interior.limitations,
    missingDomains: ['controlled-fixture-interior-resolution'],
    downstreamCompatibleStageIds: ['CAUSAL_REGIME_HISTORY'],
  });
}

describe('W1-06A complete shadow aggregate CI harness', () => {
  it('runs 28 unique seeds, produces aggregate distributions, and keeps incomplete science explicitly partial', () => {
    validateCorpus(corpus, historyFixtureSet);
    const fixtureById = new Map(historyFixtureSet.fixtures.map((fixture) => [fixture.fixtureId, fixture]));
    const historyResearchContext = createHistoryResearchContext();
    const spineResearchContext = createSpineResearchContext();
    const featureFlags = resolveWorldFeatureFlags('CAUSAL_SHADOW', { 'causal.shadow.enabled': true });

    rmSync(artifactRoot, { recursive: true, force: true });
    mkdirSync(artifactRoot, { recursive: true });

    const auditCases: CausalShadowAuditCaseV1[] = [];
    for (const caseDefinition of corpus.cases) {
      const fixture = fixtureById.get(caseDefinition.regimeFixtureId);
      if (!fixture) throw new Error(`Missing W1-06A regime fixture ${caseDefinition.regimeFixtureId}.`);

      const startHeap = process.memoryUsage().heapUsed;
      const startTime = performance.now();
      const input = inputForCase(caseDefinition, fixture);
      const premise = premiseForCase(caseDefinition, fixture, input.contentHash);
      const interior = interiorForCase(caseDefinition, fixture);
      const history = runRegimeHistoryShadow({
        authorityMode: 'CAUSAL_SHADOW',
        featureFlags,
        inputSnapshot: input,
        premise,
        interior,
        interiorStageResult: interiorStageResult(input, premise, interior),
        researchContext: historyResearchContext,
      });
      const historyReplay = runRegimeHistoryShadow({
        authorityMode: 'CAUSAL_SHADOW',
        featureFlags,
        inputSnapshot: input,
        premise,
        interior,
        interiorStageResult: interiorStageResult(input, premise, interior),
        researchContext: historyResearchContext,
      });
      expect(history).toEqual(historyReplay);
      validateRegimeHistoryShadowRunnerResult(history);
      const historyRecord = history.resolution.history!;

      const spine = runGeologicSpineShadow({
        authorityMode: 'CAUSAL_SHADOW',
        featureFlags,
        inputSnapshot: input,
        premise,
        interior,
        regimeHistory: historyRecord,
        regimeHistoryStageResult: history.stageResult,
        researchContext: spineResearchContext,
      });
      const spineReplay = runGeologicSpineShadow({
        authorityMode: 'CAUSAL_SHADOW',
        featureFlags,
        inputSnapshot: input,
        premise,
        interior,
        regimeHistory: historyRecord,
        regimeHistoryStageResult: history.stageResult,
        researchContext: spineResearchContext,
      });
      expect(spine).toEqual(spineReplay);
      validateGeologicSpineShadowRunnerResult(spine);
      const spineRecord = spine.resolution.spine!;

      validateTectonicRegimeHistory(historyRecord);
      validateGeologicSpine(spineRecord);
      expect(history.stageResult.status).toBe('PARTIAL');
      expect(spine.stageResult.status).toBe('PARTIAL');

      const durationMilliseconds = performance.now() - startTime;
      const heapDeltaBytes = Math.max(0, process.memoryUsage().heapUsed - startHeap);
      const serializedPayloadBytes = Buffer.byteLength(JSON.stringify({ input, premise, interior, history: historyRecord, spine: spineRecord }), 'utf8');
      const contradictionIds = new Set([
        ...input.contradictionIds,
        ...premise.contradictionIds,
        ...interior.contradictionIds,
        ...historyRecord.contradictionIds,
        ...spineRecord.contradictionIds,
      ]);

      const auditCase: CausalShadowAuditCaseV1 = {
        schemaVersion: 1,
        caseId: caseDefinition.caseId,
        rootSeed: caseDefinition.rootSeed,
        archetypeFamily: caseDefinition.archetypeFamily,
        variationKind: caseDefinition.variationKind,
        directInputAxes: caseDefinition.directInputAxes,
        stageStatus: spine.stageResult.status,
        currentRegime: interior.resolvedLidRegime ?? 'UNRESOLVED',
        historyHash: historyRecord.contentHash.value,
        spineHash: spineRecord.contentHash.value,
        epochCount: historyRecord.epochs.length,
        transitionCount: historyRecord.transitions.length,
        nodeCount: spineRecord.nodes.length,
        edgeCount: spineRecord.edges.length,
        eventCount: spineRecord.events.length,
        featureFamilies: spineRecord.featureFamilies,
        openContradictionCount: contradictionIds.size,
        durationMilliseconds,
        heapDeltaBytes,
        serializedPayloadBytes,
      };
      auditCases.push(auditCase);
      writeJson(resolve(artifactRoot, 'cases', `${caseDefinition.caseId}.json`), auditCase);
    }

    const aggregate = createCausalShadowAggregateReport(auditCases);
    validateCausalShadowAggregateReport(aggregate);

    expect(aggregate.softwareGatePass).toBe(true);
    expect(aggregate.scientificStatus).toBe('PARTIAL');
    expect(aggregate.caseCount).toBe(28);
    expect(aggregate.uniqueSeedCount).toBe(28);
    expect(aggregate.invalidCaseCount).toBe(0);
    expect(aggregate.determinism.distinctHistoryHashCount).toBeGreaterThanOrEqual(7);
    expect(aggregate.determinism.distinctSpineHashCount).toBe(28);
    expect(aggregate.coverage.missingArchetypeFamilies.length).toBeGreaterThan(0);
    expect(aggregate.coverage.missingDirectInputAxes.length).toBeGreaterThan(0);
    expect(aggregate.coverage.missingReferenceKinds).toEqual(['EXCEPTION', 'NEGATIVE']);
    expect(aggregate.performance.overBudgetCaseIds).toEqual([]);

    writeJson(resolve(artifactRoot, 'corpus-manifest.json'), {
      schemaVersion: 1,
      corpusVersion: corpus.corpusVersion,
      authorityMode: corpus.authorityMode,
      upstreamMode: corpus.upstreamMode,
      physicalGeneratorAuthority: 'LEGACY',
      caseCount: corpus.cases.length,
      uniqueSeedCount: new Set(corpus.cases.map((entry) => entry.rootSeed)).size,
      scientificStatus: aggregate.scientificStatus,
      softwareGatePass: aggregate.softwareGatePass,
    });
    writeJson(resolve(artifactRoot, 'aggregate-report.json'), aggregate);
    writeJson(resolve(artifactRoot, 'coverage-gaps.json'), {
      schemaVersion: 1,
      missingArchetypeFamilies: aggregate.coverage.missingArchetypeFamilies,
      missingDirectInputAxes: aggregate.coverage.missingDirectInputAxes,
      missingReferenceKinds: aggregate.coverage.missingReferenceKinds,
      nextScope: 'W1-06B controlled archetype and direct-input threshold expansion',
    });
  });
});

function validateCorpus(value: ShadowAuditCorpusV1, historyFixtures: RegimeHistoryFixtureSetV1): void {
  expect(Object.keys(value).sort(compareStableText)).toEqual(['authorityMode', 'cases', 'corpusVersion', 'schemaVersion', 'upstreamMode']);
  expect(value.schemaVersion).toBe(1);
  expect(value.corpusVersion).toBe('W1_06A_SHADOW_AUDIT_CORPUS_V1');
  expect(value.authorityMode).toBe('CAUSAL_SHADOW');
  expect(value.upstreamMode).toBe('CONTROLLED_VALIDATED_W1_04_FIXTURES');
  expect(value.cases.length).toBeGreaterThanOrEqual(24);

  const fixtureIds = new Set(historyFixtures.fixtures.map((fixture) => fixture.fixtureId));
  const caseIds = new Set<string>();
  const seeds = new Set<string>();
  for (const entry of value.cases) {
    expect(Object.keys(entry).sort(compareStableText)).toEqual([
      'archetypeFamily',
      'caseId',
      'directInputAxes',
      'regimeFixtureId',
      'rootSeed',
      'variationKind',
    ]);
    expect(entry.caseId.trim().length).toBeGreaterThan(0);
    expect(entry.rootSeed.trim().length).toBeGreaterThan(0);
    expect(entry.archetypeFamily.trim().length).toBeGreaterThan(0);
    expect(entry.directInputAxes.length).toBeGreaterThan(0);
    expect(fixtureIds.has(entry.regimeFixtureId)).toBe(true);
    expect(caseIds.has(entry.caseId)).toBe(false);
    expect(seeds.has(entry.rootSeed)).toBe(false);
    caseIds.add(entry.caseId);
    seeds.add(entry.rootSeed);
  }
  expect(seeds.size).toBe(value.cases.length);
}

function readResearchJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(researchRoot, fileName), 'utf8')) as T;
}

function readFixtureJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(fixtureRoot, fileName), 'utf8')) as T;
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(resolve(path, '..'), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
