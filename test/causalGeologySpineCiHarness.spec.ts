import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  createCausalGeologyInput,
  createCausalStageResult,
  createRegimeHistoryResearchContext,
  createScientificQuantity,
  createScientificRange,
  createScientificResearchBundle,
  hashCausalPayload,
  runRegimeHistoryShadow,
  validateCausalGeologyInput,
  validateCausalStageResult,
  validateInteriorState,
  validatePlanetaryPremise,
  validateRegimeHistoryShadowRunnerResult,
  validateTectonicRegimeHistory,
  type CausalGeologyInputId,
  type CausalInputDeclarationV1,
  type CausalStageResultV1,
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
  readonly corpusVersion: 'W1_05A_SKELETON_CI_CORPUS_V1';
  readonly expectedSpineDisposition: 'ABSENT_RESERVED';
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
  readonly spineDisposition: 'ABSENT_RESERVED';
}

const repositoryRoot = process.cwd();
const researchRoot = resolve(repositoryRoot, 'src/core/causalGeology/research');
const fixtureRoot = resolve(repositoryRoot, 'test/fixtures');
const artifactRoot = resolve(repositoryRoot, process.env.CAUSAL_SKELETON_CI_OUT ?? 'artifacts/causal-skeleton-gate');

const review = readResearchJson<RegimeHistoryResearchReviewV1>('regime-history-review-record.json');
const fixtureSet = readResearchJson<RegimeHistoryFixtureSetV1>('regime-history-fixtures.json');
const corpus = readFixtureJson<SkeletonCiCorpusV1>('w1-05a-skeleton-ci-corpus.json');

const CONTRACTS: Readonly<Record<string, readonly [string, string]>> = {
  'inventory.water': ['earth-water-inventory', 'earth-water-inventory-v1'],
  'thermal.age': ['gigaannum', 'gigaannum-v1'],
};

function createResearchContext() {
  return createRegimeHistoryResearchContext({
    researchBundle: createScientificResearchBundle({
      bundleVersion: review.bundleVersion,
      sources: readResearchJson<ScientificSourceV1[]>('regime-history-source-registry.json'),
      claimRules: readResearchJson<ScientificClaimRuleV1[]>('regime-history-claim-rules.json'),
      correlationGroups: readResearchJson<string[]>('regime-history-correlation-groups.json'),
      knownLimitations: readResearchJson<string[]>('regime-history-known-limitations.json'),
    }),
    fixtureSet,
    review,
  });
}

function inputForCase(caseDefinition: SkeletonCiCorpusCaseV1, fixture: RegimeHistoryResearchFixtureV1) {
  const values: readonly [CausalGeologyInputId, number][] = [
    ['inventory.water', fixture.waterInventory],
    ['thermal.age', fixture.ageGyr],
  ];
  const declarations: CausalInputDeclarationV1[] = values.map(([inputId, value]) => {
    const contract = CONTRACTS[inputId];
    if (!contract) throw new Error(`Missing W1-05A quantity contract ${inputId}.`);
    return {
      schemaVersion: 1,
      inputId,
      quantity: createScientificQuantity(value, contract[0], contract[1]),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `w1-05a/${caseDefinition.caseId}/${inputId}`,
      confidenceSubject: `w1-05a.${caseDefinition.caseId}.${inputId}`,
      evidenceIds: [],
    };
  });
  return createCausalGeologyInput(caseDefinition.rootSeed, declarations, {
    initialConditionBundleHash: hashCausalPayload('WorldWright/w1-05a-skeleton-ci-input/v1', {
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
    confidenceAssessmentSubject: `w1-05a.${caseDefinition.caseId}.premise`,
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['W1-05A uses a controlled validated premise fixture; full aggregate premise evaluation remains W1-06 scope.'],
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
    thermalBudgetRange: normalized(fixture.interior.thermalBudgetCenter, `w1-05a.${caseDefinition.caseId}.thermal`),
    heatSourceFractions: [
      { sourceId: 'PRIMORDIAL' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.primordial, `w1-05a.${caseDefinition.caseId}.primordial`) },
      { sourceId: 'RADIOGENIC' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.radiogenic, `w1-05a.${caseDefinition.caseId}.radiogenic`) },
      { sourceId: 'TIDAL' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.tidal, `w1-05a.${caseDefinition.caseId}.tidal`) },
    ],
    mantleConvectionRange: normalized(fixture.interior.convectionCenter, `w1-05a.${caseDefinition.caseId}.convection`),
    rheologyCandidates: [ice ? 'ICE_SHELL_TEMPERATURE_DEPENDENT' : 'TEMPERATURE_DEPENDENT_SOLID_STATE'],
    lithosphereBehaviorCandidates: [ice ? 'RIGID_ICE_SHELL' : 'RIGID_SINGLE_LID'],
    lidRegimeCandidates: fixture.interior.lidRegimeCandidates,
    resolvedLidRegime: fixture.interior.resolvedLidRegime,
    meltAndVolcanismRange: normalized(fixture.interior.meltCenter, `w1-05a.${caseDefinition.caseId}.melt`),
    riftTendencyRange: normalized(fixture.interior.riftCenter, `w1-05a.${caseDefinition.caseId}.rift`),
    hotspotTendencyRange: normalized(fixture.interior.hotspotCenter, `w1-05a.${caseDefinition.caseId}.hotspot`),
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: `w1-05a.${caseDefinition.caseId}.interior`,
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['W1-05A uses a controlled validated interior fixture; full aggregate interior evaluation remains W1-06 scope.'],
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

describe('W1-05A causal geologic-skeleton CI harness', () => {
  it('runs seven unique fixed causal cases and reports the spine as explicitly absent/reserved', () => {
    validateCorpus(corpus, fixtureSet);
    const fixtureById = new Map(fixtureSet.fixtures.map((fixture) => [fixture.fixtureId, fixture]));
    const researchContext = createResearchContext();
    const spineStream = getRandomStreamDefinition('causal.geologic-spine');

    expect(corpus.cases.length).toBeGreaterThanOrEqual(6);
    expect(new Set(corpus.cases.map((entry) => entry.rootSeed)).size).toBe(corpus.cases.length);
    expect(spineStream.status).toBe('RESERVED');

    rmSync(artifactRoot, { recursive: true, force: true });
    mkdirSync(artifactRoot, { recursive: true });

    const summaries: SkeletonCiCaseSummaryV1[] = [];
    for (const caseDefinition of corpus.cases) {
      const fixture = fixtureById.get(caseDefinition.regimeFixtureId);
      if (!fixture) throw new Error(`Missing W1-05A regime fixture ${caseDefinition.regimeFixtureId}.`);

      const startHeap = process.memoryUsage().heapUsed;
      const startTime = performance.now();
      const input = inputForCase(caseDefinition, fixture);
      const premise = premiseForCase(caseDefinition, fixture, input.contentHash);
      const interior = interiorForCase(caseDefinition, fixture);
      const upstreamStages = createUpstreamStageResults(input, premise, interior);
      const interiorStageResult = upstreamStages[2] as CausalStageResultV1<InteriorStateV1>;
      const runnerOptions = {
        authorityMode: 'CAUSAL_SHADOW' as const,
        featureFlags: resolveWorldFeatureFlags('CAUSAL_SHADOW', { 'causal.shadow.enabled': true }),
        inputSnapshot: input,
        premise,
        interior,
        interiorStageResult,
        researchContext,
      };
      const first = runRegimeHistoryShadow(runnerOptions);
      const replay = runRegimeHistoryShadow(runnerOptions);
      const durationMilliseconds = performance.now() - startTime;
      const heapDeltaBytes = Math.max(0, process.memoryUsage().heapUsed - startHeap);

      validateCausalGeologyInput(input);
      validatePlanetaryPremise(premise);
      validateInteriorState(interior);
      validateRegimeHistoryShadowRunnerResult(first);
      expect(first).toEqual(replay);
      expect(first.stageResult.status).toBe('PARTIAL');
      expect(first.stageResult.downstreamCompatibleStageIds).toEqual(['CAUSAL_GEOLOGIC_SPINE']);
      expect(first.resolution.history).toBeDefined();
      validateTectonicRegimeHistory(first.resolution.history!);

      const history = first.resolution.history!;
      expect(history.epochs[0].startTime).toBe(0);
      expect(history.epochs[history.epochs.length - 1].endTime).toBe(1);
      expect(history.transitions.length).toBe(history.epochs.length - 1);
      expect(history.epochs[history.epochs.length - 1].regimeFamily).toBe(interior.resolvedLidRegime);

      const runtimeKeys = collectObjectKeys(first);
      for (const forbidden of [
        'baseHeight',
        'continentSkeletons',
        'landMask',
        'oceanBasinSkeletons',
        'plateId',
        'seaLevel',
        'terrainHeight',
        'WorldBrain',
      ]) expect(runtimeKeys).not.toContain(forbidden);

      const stageResults = [...upstreamStages, first.stageResult];
      const spineAbsence = {
        schemaVersion: 1,
        stageId: 'CAUSAL_GEOLOGIC_SPINE',
        disposition: corpus.expectedSpineDisposition,
        streamName: spineStream.name,
        streamStatus: spineStream.status,
        allowedAuthorityModes: spineStream.allowedAuthorityModes,
        reason: 'W1-05A installs the test and CI harness only. The geologic-spine resolver, stream activation, graph output, and authority remain unimplemented.',
      } as const;
      const validationReport = {
        schemaVersion: 1,
        caseId: caseDefinition.caseId,
        checks: {
          sanitizedInputValid: true,
          premiseValid: true,
          interiorValid: true,
          regimeHistoryValid: true,
          deterministicReplay: true,
          normalizedHistoryCoverage: true,
          adjacentTransitionCount: true,
          finalEpochMatchesCurrentInterior: true,
          geologicSpineStreamReserved: spineStream.status === 'RESERVED',
          geologicSpineRecordAbsent: true,
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
        spineDisposition: 'ABSENT_RESERVED',
      };
      summaries.push(caseSummary);

      const caseDirectory = resolve(artifactRoot, caseDefinition.caseId);
      mkdirSync(caseDirectory, { recursive: true });
      writeJson(resolve(caseDirectory, 'causal-shadow-manifest.json'), {
        schemaVersion: 1,
        harnessVersion: 1,
        corpusVersion: corpus.corpusVersion,
        caseId: caseDefinition.caseId,
        rootSeed: caseDefinition.rootSeed,
        authorityMode: 'CAUSAL_SHADOW',
        upstreamMode: 'CONTROLLED_VALIDATED_W1_04_FIXTURES',
        stageStatuses: stageResults.map((stage) => ({ stageId: stage.stageId, status: stage.status })),
        geologicSpineDisposition: spineAbsence.disposition,
      });
      writeJson(resolve(caseDirectory, 'sanitized-input.json'), input);
      writeJson(resolve(caseDirectory, 'stage-results.json'), stageResults);
      writeJson(resolve(caseDirectory, 'premise.json'), premise);
      writeJson(resolve(caseDirectory, 'interior.json'), interior);
      writeJson(resolve(caseDirectory, 'regime-history.json'), history);
      writeJson(resolve(caseDirectory, 'geologic-spine.json'), spineAbsence);
      writeJson(resolve(caseDirectory, 'confidence-ledger.json'), {
        schemaVersion: 1,
        status: 'ABSENT_NOT_OWNED_BY_W1_05A_HARNESS',
        reason: 'Confidence aggregation and reference scoring remain W1-06 scope.',
      });
      writeJson(resolve(caseDirectory, 'contradictions.json'), {
        schemaVersion: 1,
        contradictionIds: [...new Set([
          ...input.contradictionIds,
          ...premise.contradictionIds,
          ...interior.contradictionIds,
          ...history.contradictionIds,
        ])].sort(compareStableText),
      });
      writeJson(resolve(caseDirectory, 'provenance.json'), {
        schemaVersion: 1,
        corpusVersion: corpus.corpusVersion,
        regimeFixtureId: fixture.fixtureId,
        inputHash: input.contentHash,
        premiseHash: premise.contentHash,
        interiorHash: interior.contentHash,
        historyHash: history.contentHash,
        researchContextHash: researchContext.contentHash,
      });
      writeJson(resolve(caseDirectory, 'validation-report.json'), validationReport);
      writeJson(resolve(caseDirectory, 'reference-audit-plan.json'), {
        schemaVersion: 1,
        status: 'DEFERRED_TO_W1_06',
        reason: 'W1-05A establishes deterministic structural gates; complete reference/archetype audit remains W1-06 scope.',
      });
      writeJson(resolve(caseDirectory, 'shadow-vs-legacy-comparison.json'), {
        schemaVersion: 1,
        status: 'NOT_READ_BY_CAUSAL_HARNESS',
        reason: 'Legacy solved morphology is forbidden input. Existing snapshot and full-globe jobs remain the physical-output isolation gate.',
      });
      writeJson(resolve(caseDirectory, 'performance-report.json'), {
        schemaVersion: 1,
        operationalOnly: true,
        durationMilliseconds,
        heapDeltaBytes,
        serializedHistoryBytes: Buffer.byteLength(JSON.stringify(history), 'utf8'),
        epochCount: history.epochs.length,
        transitionCount: history.transitions.length,
        note: 'Operational performance values are diagnostics and never enter causal identity.',
      });
    }

    expect(summaries.length).toBe(corpus.cases.length);
    expect(summaries.every((summary) => summary.spineDisposition === 'ABSENT_RESERVED')).toBe(true);
    expect(new Set(summaries.map((summary) => summary.historyHash)).size).toBeGreaterThan(1);

    writeJson(resolve(artifactRoot, 'corpus-manifest.json'), {
      schemaVersion: 1,
      harnessVersion: 1,
      corpusVersion: corpus.corpusVersion,
      authorityMode: 'CAUSAL_SHADOW',
      caseCount: summaries.length,
      uniqueSeedCount: new Set(summaries.map((summary) => summary.rootSeed)).size,
      expectedSpineDisposition: corpus.expectedSpineDisposition,
      geologicSpineStreamStatus: spineStream.status,
      physicalGeneratorAuthority: 'LEGACY',
      cases: summaries,
    });
  });
});

function validateCorpus(value: SkeletonCiCorpusV1, fixtures: RegimeHistoryFixtureSetV1): void {
  const rootKeys = Object.keys(value).sort(compareStableText);
  expect(rootKeys).toEqual(['cases', 'corpusVersion', 'expectedSpineDisposition', 'schemaVersion']);
  expect(value.schemaVersion).toBe(1);
  expect(value.corpusVersion).toBe('W1_05A_SKELETON_CI_CORPUS_V1');
  expect(value.expectedSpineDisposition).toBe('ABSENT_RESERVED');
  expect(value.cases.length).toBeGreaterThanOrEqual(6);

  const fixtureIds = new Set(fixtures.fixtures.map((fixture) => fixture.fixtureId));
  const caseIds = new Set<string>();
  const seeds = new Set<string>();
  let holdoutCount = 0;
  let thresholdCount = 0;
  for (const entry of value.cases) {
    expect(Object.keys(entry).sort(compareStableText)).toEqual(['caseId', 'regimeFixtureId', 'rootSeed']);
    expect(entry.caseId.trim().length).toBeGreaterThan(0);
    expect(entry.rootSeed.trim().length).toBeGreaterThan(0);
    expect(fixtureIds.has(entry.regimeFixtureId)).toBe(true);
    expect(caseIds.has(entry.caseId)).toBe(false);
    expect(seeds.has(entry.rootSeed)).toBe(false);
    caseIds.add(entry.caseId);
    seeds.add(entry.rootSeed);
    const fixture = fixtures.fixtures.find((candidate) => candidate.fixtureId === entry.regimeFixtureId);
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
