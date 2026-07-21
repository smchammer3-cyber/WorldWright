import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1,
  createCausalGeologyInput,
  createCausalStageResult,
  createGeologicSpineResearchContext,
  createRegimeHistoryResearchContext,
  createScientificQuantity,
  createScientificRange,
  createScientificResearchBundle,
  hashCausalPayload,
  resolveGeologicSpine,
  runGeologicSpineShadow,
  runRegimeHistoryShadow,
  validateGeologicSpine,
  validateGeologicSpineFixtureSet,
  validateGeologicSpineResearchContext,
  validateGeologicSpineResolution,
  validateGeologicSpineShadowRunnerResult,
  validateInteriorState,
  validatePlanetaryPremise,
  type CausalInputDeclarationV1,
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
import { getRandomStreamDefinition } from '../src/core/worldRandom/streamRegistry';

const researchRoot = resolve(process.cwd(), 'src/core/causalGeology/research');
const historyReview = readJson<RegimeHistoryResearchReviewV1>('regime-history-review-record.json');
const historyFixtureSet = readJson<RegimeHistoryFixtureSetV1>('regime-history-fixtures.json');
const spineReview = readJson<GeologicSpineResearchReviewV1>('geologic-spine-review-record.json');
const spineFixtureSet = readJson<GeologicSpineFixtureSetV1>('geologic-spine-fixtures.json');
const fixture = historyFixtureSet.fixtures.find((candidate) => candidate.fixtureId === 'positive/earthlike-mixed-evolution-v1')!;

function historyContext() {
  return createRegimeHistoryResearchContext({
    researchBundle: createScientificResearchBundle({
      bundleVersion: historyReview.bundleVersion,
      sources: readJson<ScientificSourceV1[]>('regime-history-source-registry.json'),
      claimRules: readJson<ScientificClaimRuleV1[]>('regime-history-claim-rules.json'),
      correlationGroups: readJson<string[]>('regime-history-correlation-groups.json'),
      knownLimitations: readJson<string[]>('regime-history-known-limitations.json'),
    }),
    fixtureSet: historyFixtureSet,
    review: historyReview,
  });
}

function spineContext() {
  return createGeologicSpineResearchContext({
    researchBundle: createScientificResearchBundle({
      bundleVersion: spineReview.bundleVersion,
      sources: readJson<ScientificSourceV1[]>('geologic-spine-source-registry.json'),
      claimRules: readJson<ScientificClaimRuleV1[]>('geologic-spine-claim-rules.json'),
      correlationGroups: readJson<string[]>('geologic-spine-correlation-groups.json'),
      knownLimitations: readJson<string[]>('geologic-spine-known-limitations.json'),
    }),
    fixtureSet: spineFixtureSet,
    review: spineReview,
  });
}

function inputForFixture(source: RegimeHistoryResearchFixtureV1 = fixture) {
  const declarations: CausalInputDeclarationV1[] = [
    {
      schemaVersion: 1,
      inputId: 'inventory.water',
      quantity: createScientificQuantity(source.waterInventory, 'earth-water-inventory', 'earth-water-inventory-v1'),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `spine-fixture/${source.fixtureId}/inventory.water`,
      confidenceSubject: 'spine-fixture.inventory.water',
      evidenceIds: [],
    },
    {
      schemaVersion: 1,
      inputId: 'thermal.age',
      quantity: createScientificQuantity(source.ageGyr, 'gigaannum', 'gigaannum-v1'),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `spine-fixture/${source.fixtureId}/thermal.age`,
      confidenceSubject: 'spine-fixture.thermal.age',
      evidenceIds: [],
    },
  ];
  return createCausalGeologyInput(source.rootSeed, declarations, {
    initialConditionBundleHash: hashCausalPayload('WorldWright/test-geologic-spine-bundle/v1', {
      fixtureId: source.fixtureId,
      ageGyr: source.ageGyr,
      waterInventory: source.waterInventory,
    }),
  });
}

function premiseForFixture(source: RegimeHistoryResearchFixtureV1, inputHash: ReturnType<typeof inputForFixture>['contentHash']): PlanetaryPremiseV1 {
  const payload = {
    schemaVersion: 1 as const,
    premiseVersion: 1,
    status: 'PARTIAL' as const,
    inputSnapshotHash: inputHash,
    bodyClassCandidates: source.premiseBodyClassCandidates,
    surfaceMediumCandidates: ['CONTROLLED_SOLID_SURFACE'],
    layerStackCandidates: ['CONTROLLED_SOLID_LAYER_STACK'],
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: 'spine-fixture.premise',
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['Controlled geologic-spine premise remains partial.'],
  };
  const value = { ...payload, contentHash: hashCausalPayload('WorldWright/planetary-premise/v1', payload) };
  validatePlanetaryPremise(value);
  return value;
}

function interiorForFixture(source: RegimeHistoryResearchFixtureV1): InteriorStateV1 {
  const normalized = (center: number, subject: string) => createScientificRange(
    Math.max(0, center - 0.04),
    Math.min(1, center + 0.04),
    'normalized-0-1',
    'normalized-0-1-v1',
    subject,
  );
  const ice = source.premiseBodyClassCandidates.includes('ICE_SHELL_OCEAN_BODY');
  const payload = {
    schemaVersion: 1 as const,
    status: 'PARTIAL' as const,
    interiorVersion: 1,
    thermalBudgetRange: normalized(source.interior.thermalBudgetCenter, 'spine-fixture.thermal'),
    heatSourceFractions: [
      { sourceId: 'PRIMORDIAL' as const, fractionRange: normalized(source.interior.heatSourceFractions.primordial, 'spine-fixture.primordial') },
      { sourceId: 'RADIOGENIC' as const, fractionRange: normalized(source.interior.heatSourceFractions.radiogenic, 'spine-fixture.radiogenic') },
      { sourceId: 'TIDAL' as const, fractionRange: normalized(source.interior.heatSourceFractions.tidal, 'spine-fixture.tidal') },
    ],
    mantleConvectionRange: normalized(source.interior.convectionCenter, 'spine-fixture.convection'),
    rheologyCandidates: [ice ? 'ICE_SHELL_TEMPERATURE_DEPENDENT' : 'TEMPERATURE_DEPENDENT_SOLID_STATE'],
    lithosphereBehaviorCandidates: [ice ? 'RIGID_ICE_SHELL' : 'RIGID_SINGLE_LID'],
    lidRegimeCandidates: source.interior.lidRegimeCandidates,
    resolvedLidRegime: source.interior.resolvedLidRegime,
    meltAndVolcanismRange: normalized(source.interior.meltCenter, 'spine-fixture.melt'),
    riftTendencyRange: normalized(source.interior.riftCenter, 'spine-fixture.rift'),
    hotspotTendencyRange: normalized(source.interior.hotspotCenter, 'spine-fixture.hotspot'),
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: 'spine-fixture.interior',
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['Controlled geologic-spine interior remains partial.'],
  };
  const value = { ...payload, contentHash: hashCausalPayload('WorldWright/interior-state/v1', payload) };
  validateInteriorState(value);
  return value;
}

function upstream(source: RegimeHistoryResearchFixtureV1 = fixture) {
  const input = inputForFixture(source);
  const premise = premiseForFixture(source, input.contentHash);
  const interior = interiorForFixture(source);
  const interiorStage = createCausalStageResult<InteriorStateV1>({
    stageId: 'CAUSAL_INTERIOR_RESOLUTION',
    stageVersion: 1,
    status: 'PARTIAL',
    input: { inputSnapshot: input, premise },
    record: interior,
    limitations: interior.limitations,
    missingDomains: ['controlled-fixture-interior-uncertainty'],
    downstreamCompatibleStageIds: ['CAUSAL_REGIME_HISTORY'],
  });
  const historyRun = runRegimeHistoryShadow({
    authorityMode: 'CAUSAL_SHADOW',
    featureFlags: resolveWorldFeatureFlags('CAUSAL_SHADOW', { 'causal.shadow.enabled': true }),
    inputSnapshot: input,
    premise,
    interior,
    interiorStageResult: interiorStage,
    researchContext: historyContext(),
  });
  return { input, premise, interior, history: historyRun.resolution.history!, historyStage: historyRun.stageResult };
}

describe('W1-05B detached geologic-spine resolver', () => {
  it('validates its reviewed research and fixed fixture contracts', () => {
    expect(() => validateGeologicSpineFixtureSet(spineFixtureSet)).not.toThrow();
    const context = spineContext();
    expect(() => validateGeologicSpineResearchContext(context)).not.toThrow();
    expect(context.review.implementationAuthorized).toBe(true);
    expect(context.fixtureSet.fixtures.filter((entry) => entry.kind === 'HOLDOUT')).toHaveLength(2);
    expect(context.fixtureSet.fixtures.some((entry) => entry.kind === 'THRESHOLD')).toBe(true);
  });

  it('creates a deterministic spherical graph with valid event ancestry and no physical fields', () => {
    const { input, premise, interior, history } = upstream();
    const context = spineContext();
    const first = resolveGeologicSpine(input, premise, interior, history, context);
    const replay = resolveGeologicSpine(input, premise, interior, history, context);
    expect(first).toEqual(replay);
    expect(first.status).toBe('PARTIAL');
    expect(first.spine).toBeDefined();
    const spine = first.spine!;
    expect(() => validateGeologicSpine(spine)).not.toThrow();
    expect(() => validateGeologicSpineResolution(first)).not.toThrow();
    expect(spine.nodes.length).toBeGreaterThan(0);
    expect(spine.events.length).toBe(spine.nodes.length);
    expect(spine.featureFamilies).toEqual([...spine.featureFamilies].sort());
    expect(spine.nodes.every((node) => node.anchor.latitudeDegrees >= -90 && node.anchor.latitudeDegrees <= 90)).toBe(true);
    expect(spine.nodes.every((node) => node.anchor.longitudeDegrees >= -180 && node.anchor.longitudeDegrees < 180)).toBe(true);
    expect(spine.nodes.every((node) => node.formationEventIds.length === 1)).toBe(true);

    const eventById = new Map(spine.events.map((event) => [event.eventId, event]));
    for (const event of spine.events) {
      const epoch = history.epochs.find((candidate) => candidate.epochId === event.epochId)!;
      expect(event.normalizedTimeRange.min).toBeGreaterThanOrEqual(epoch.startTime);
      expect(event.normalizedTimeRange.max).toBeLessThanOrEqual(epoch.endTime);
      for (const parentId of event.parentEventIds) {
        const parent = eventById.get(parentId)!;
        expect(parent.normalizedTimeRange.min).toBeLessThanOrEqual(event.normalizedTimeRange.min);
      }
    }
    const forbidden = ['WorldBrain', 'baseHeight', 'landMask', 'plateId', 'seaLevel', 'terrainHeight', 'finalTerrain'];
    const keys = collectObjectKeys(first);
    for (const key of forbidden) expect(keys).not.toContain(key);
  });

  it('runs only in explicit shadow mode and rejects tampered history lineage', () => {
    const { input, premise, interior, history, historyStage } = upstream();
    const base = {
      featureFlags: resolveWorldFeatureFlags('CAUSAL_SHADOW', { 'causal.shadow.enabled': true }),
      inputSnapshot: input,
      premise,
      interior,
      regimeHistory: history,
      regimeHistoryStageResult: historyStage,
      researchContext: spineContext(),
    };
    expect(() => runGeologicSpineShadow({ ...base, authorityMode: 'LEGACY' })).toThrow(/CAUSAL_SHADOW/);
    expect(() => runGeologicSpineShadow({ ...base, authorityMode: 'CAUSAL_ACTIVE' })).toThrow(/CAUSAL_SHADOW/);
    expect(() => runGeologicSpineShadow({
      ...base,
      authorityMode: 'CAUSAL_SHADOW',
      featureFlags: resolveWorldFeatureFlags('CAUSAL_SHADOW'),
    })).toThrow(/causal.shadow.enabled/);
    expect(() => runGeologicSpineShadow({
      ...base,
      authorityMode: 'CAUSAL_SHADOW',
      regimeHistory: { ...history, limitations: ['Tampered history.'] },
    })).toThrow(/match|hash|record/i);

    const first = runGeologicSpineShadow({ ...base, authorityMode: 'CAUSAL_SHADOW' });
    const replay = runGeologicSpineShadow({ ...base, authorityMode: 'CAUSAL_SHADOW' });
    expect(first).toEqual(replay);
    expect(first.stageResult.stageId).toBe('CAUSAL_GEOLOGIC_SPINE');
    expect(first.stageResult.status).toBe('PARTIAL');
    expect(first.stageResult.downstreamCompatibleStageIds).toEqual([]);
    expect(() => validateGeologicSpineShadowRunnerResult(first)).not.toThrow();
  });

  it('rejects a blocked history stage and blocks unsupported artificial shells honestly', () => {
    const { input, premise, interior, history } = upstream();
    const blockedHistory = createCausalStageResult<TectonicRegimeHistoryV1>({
      stageId: 'CAUSAL_REGIME_HISTORY',
      stageVersion: 1,
      status: 'BLOCKED',
      input: { premise, interior },
      blockingReasons: ['TEST_BLOCK'],
    });
    expect(() => runGeologicSpineShadow({
      authorityMode: 'CAUSAL_SHADOW',
      featureFlags: resolveWorldFeatureFlags('CAUSAL_SHADOW', { 'causal.shadow.enabled': true }),
      inputSnapshot: input,
      premise,
      interior,
      regimeHistory: history,
      regimeHistoryStageResult: blockedHistory,
      researchContext: spineContext(),
    })).toThrow(/does not permit/);

    const artificialPayload = {
      ...premise,
      bodyClassCandidates: ['ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL'],
      surfaceMediumCandidates: ['DECLARED_ARTIFICIAL_SOLID_SURFACE'],
      layerStackCandidates: ['DECLARED_ARTIFICIAL_LAYER_STACK'],
    };
    const { contentHash: _ignored, ...withoutHash } = artificialPayload;
    const artificial = {
      ...withoutHash,
      contentHash: hashCausalPayload('WorldWright/planetary-premise/v1', withoutHash),
    };
    validatePlanetaryPremise(artificial);
    const result = resolveGeologicSpine(input, artificial, interior, history, spineContext());
    expect(result.status).toBe('BLOCKED');
    expect(result.spine).toBeUndefined();
    expect(result.blockingReasons).toEqual(['ARTIFICIAL_GEOLOGIC_SPINE_MODEL_NOT_IMPLEMENTED']);
  });

  it('does not special-case fixtures and stays within frozen budgets', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/core/causalGeology/geologicSpineResolver.ts'), 'utf8');
    for (const fixtureRecord of spineFixtureSet.fixtures) {
      expect(source).not.toContain(fixtureRecord.fixtureId);
      expect(source).not.toContain(fixtureRecord.regimeFixtureId);
    }
    for (const forbiddenImport of ['worldSchema', 'worldGenerator', 'worldWrightAdapter']) expect(source).not.toContain(forbiddenImport);

    const { input, premise, interior, history } = upstream();
    const context = spineContext();
    const startHeap = process.memoryUsage().heapUsed;
    const start = performance.now();
    for (let repeat = 0; repeat < 20; repeat += 1) {
      const result = resolveGeologicSpine(input, premise, interior, history, context);
      expect(result.metrics.nodeCount).toBeLessThanOrEqual(GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxNodes);
      expect(result.metrics.edgeCount).toBeLessThanOrEqual(GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxEdges);
      expect(result.metrics.eventCount).toBeLessThanOrEqual(GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxEvents);
      expect(result.metrics.serializedSpineBytes).toBeLessThanOrEqual(GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxSerializedSpineBytes);
    }
    const averageMilliseconds = (performance.now() - start) / 20;
    const heapDelta = Math.max(0, process.memoryUsage().heapUsed - startHeap);
    expect(averageMilliseconds).toBeLessThan(GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxAverageResolutionMilliseconds);
    expect(heapDelta).toBeLessThan(GEOLOGIC_SPINE_RESOLVER_PERFORMANCE_BUDGET_V1.maxHeapDeltaBytes);
  });

  it('keeps geologic-spine random authority active only in shadow mode', () => {
    const stream = getRandomStreamDefinition('causal.geologic-spine');
    expect(stream.status).toBe('ACTIVE');
    expect(stream.allowedAuthorityModes).toEqual(['CAUSAL_SHADOW']);
    expect(getRandomStreamDefinition('causal.event-graph').status).toBe('RESERVED');
    expect(getRandomStreamDefinition('causal.physical-surface').status).toBe('RESERVED');
  });
});

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

function readJson<T>(filename: string): T {
  return JSON.parse(readFileSync(resolve(researchRoot, filename), 'utf8')) as T;
}
