import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1,
  createCausalGeologyInput,
  createRegimeHistoryResearchContext,
  createScientificQuantity,
  createScientificRange,
  createScientificResearchBundle,
  hashCausalPayload,
  resolveTectonicRegimeHistory,
  validateInteriorState,
  validatePlanetaryPremise,
  validateRegimeHistoryResolution,
  validateTectonicRegimeHistory,
  type CausalGeologyInputId,
  type CausalInputDeclarationV1,
  type InteriorStateV1,
  type PlanetaryPremiseV1,
  type RegimeHistoryFixtureSetV1,
  type RegimeHistoryResearchFixtureV1,
  type RegimeHistoryResearchReviewV1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
} from '../src/core/causalGeology';

const root = resolve(process.cwd(), 'src/core/causalGeology/research');
const review = readJson<RegimeHistoryResearchReviewV1>('regime-history-review-record.json');
const fixtureSet = readJson<RegimeHistoryFixtureSetV1>('regime-history-fixtures.json');
const CONTRACTS: Readonly<Record<string, readonly [string, string]>> = {
  'inventory.water': ['earth-water-inventory', 'earth-water-inventory-v1'],
  'thermal.age': ['gigaannum', 'gigaannum-v1'],
};

function context() {
  return createRegimeHistoryResearchContext({
    researchBundle: createScientificResearchBundle({
      bundleVersion: review.bundleVersion,
      sources: readJson<ScientificSourceV1[]>('regime-history-source-registry.json'),
      claimRules: readJson<ScientificClaimRuleV1[]>('regime-history-claim-rules.json'),
      correlationGroups: readJson<string[]>('regime-history-correlation-groups.json'),
      knownLimitations: readJson<string[]>('regime-history-known-limitations.json'),
    }),
    fixtureSet,
    review,
  });
}

function inputForFixture(fixture: RegimeHistoryResearchFixtureV1, reverse = false) {
  const values: readonly [CausalGeologyInputId, number][] = [
    ['inventory.water', fixture.waterInventory],
    ['thermal.age', fixture.ageGyr],
  ];
  const ordered = reverse ? [...values].reverse() : [...values];
  const declarations: CausalInputDeclarationV1[] = ordered.map(([inputId, value]) => {
    const contract = CONTRACTS[inputId];
    if (!contract) throw new Error(`Missing history fixture contract ${inputId}.`);
    return {
      schemaVersion: 1,
      inputId,
      quantity: createScientificQuantity(value, contract[0], contract[1]),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `fixture/${fixture.fixtureId}/${inputId}`,
      confidenceSubject: `fixture.${inputId}`,
      evidenceIds: [],
    };
  });
  return createCausalGeologyInput(fixture.rootSeed, declarations, {
    initialConditionBundleHash: hashCausalPayload('WorldWright/test-regime-history-bundle/v1', {
      ageGyr: fixture.ageGyr,
      waterInventory: fixture.waterInventory,
    }),
  });
}

function premiseForFixture(fixture: RegimeHistoryResearchFixtureV1, inputHash: ReturnType<typeof inputForFixture>['contentHash']): PlanetaryPremiseV1 {
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
    confidenceAssessmentSubject: 'fixture.premise',
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['Controlled fixture premise remains partial.'],
  };
  const value = {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/planetary-premise/v1', payload),
  };
  validatePlanetaryPremise(value);
  return value;
}

function interiorForFixture(fixture: RegimeHistoryResearchFixtureV1): InteriorStateV1 {
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
    thermalBudgetRange: normalized(fixture.interior.thermalBudgetCenter, 'fixture.thermal'),
    heatSourceFractions: [
      { sourceId: 'PRIMORDIAL' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.primordial, 'fixture.primordial') },
      { sourceId: 'RADIOGENIC' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.radiogenic, 'fixture.radiogenic') },
      { sourceId: 'TIDAL' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.tidal, 'fixture.tidal') },
    ],
    mantleConvectionRange: normalized(fixture.interior.convectionCenter, 'fixture.convection'),
    rheologyCandidates: [ice ? 'ICE_SHELL_TEMPERATURE_DEPENDENT' : 'TEMPERATURE_DEPENDENT_SOLID_STATE'],
    lithosphereBehaviorCandidates: [ice ? 'RIGID_ICE_SHELL' : 'RIGID_SINGLE_LID'],
    lidRegimeCandidates: fixture.interior.lidRegimeCandidates,
    resolvedLidRegime: fixture.interior.resolvedLidRegime,
    meltAndVolcanismRange: normalized(fixture.interior.meltCenter, 'fixture.melt'),
    riftTendencyRange: normalized(fixture.interior.riftCenter, 'fixture.rift'),
    hotspotTendencyRange: normalized(fixture.interior.hotspotCenter, 'fixture.hotspot'),
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: 'fixture.interior',
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['Controlled fixture interior remains partial.'],
  };
  const value = {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/interior-state/v1', payload),
  };
  validateInteriorState(value);
  return value;
}

describe('W1-04 tectonic regime history resolver', () => {
  it('satisfies every committed positive, threshold, and withheld holdout fixture', () => {
    const researchContext = context();
    for (const fixture of fixtureSet.fixtures) {
      const input = inputForFixture(fixture);
      const premise = premiseForFixture(fixture, input.contentHash);
      const interior = interiorForFixture(fixture);
      const resolution = resolveTectonicRegimeHistory(input, premise, interior, researchContext);
      expect(resolution.status, fixture.fixtureId).toBe(fixture.expected.status);
      expect(resolution.history, fixture.fixtureId).toBeDefined();
      const history = resolution.history!;
      expect(history.epochs.length, fixture.fixtureId).toBeGreaterThanOrEqual(fixture.expected.epochCountRange[0]);
      expect(history.epochs.length, fixture.fixtureId).toBeLessThanOrEqual(fixture.expected.epochCountRange[1]);
      expect(history.epochs.every((epoch) => fixture.expected.allowedRegimeFamilies.includes(epoch.regimeFamily as never)), fixture.fixtureId).toBe(true);
      expect(history.epochs.some((epoch) => fixture.expected.requiredAnyRegimeFamilies.includes(epoch.regimeFamily as never)), fixture.fixtureId).toBe(true);
      expect(history.transitions.every((transition) => fixture.expected.allowedTransitionFamilies.includes(transition.triggerFamily as never)), fixture.fixtureId).toBe(true);
      expect(history.epochs[0].startTime, fixture.fixtureId).toBe(0);
      expect(history.epochs.at(-1)?.endTime, fixture.fixtureId).toBe(1);
      for (let index = 0; index < history.epochs.length - 1; index += 1) {
        expect(history.epochs[index].endTime, fixture.fixtureId).toBe(history.epochs[index + 1].startTime);
        expect(history.transitions[index].fromEpochId, fixture.fixtureId).toBe(history.epochs[index].epochId);
        expect(history.transitions[index].toEpochId, fixture.fixtureId).toBe(history.epochs[index + 1].epochId);
      }
      expect(history.totalResolvedDuration.value, fixture.fixtureId).toBe(fixture.ageGyr);
      expect(history.status).toBe('PARTIAL');
      expect(() => validateTectonicRegimeHistory(history)).not.toThrow();
      expect(() => validateRegimeHistoryResolution(resolution)).not.toThrow();
    }
  });

  it('replays byte-identically and ignores input declaration insertion order', () => {
    const fixture = fixtureSet.fixtures.find((candidate) => candidate.fixtureId === 'positive/earthlike-mixed-evolution-v1')!;
    const a = inputForFixture(fixture);
    const b = inputForFixture(fixture, true);
    expect(a).toEqual(b);
    const interior = interiorForFixture(fixture);
    const premiseA = premiseForFixture(fixture, a.contentHash);
    const premiseB = premiseForFixture(fixture, b.contentHash);
    expect(resolveTectonicRegimeHistory(a, premiseA, interior, context())).toEqual(resolveTectonicRegimeHistory(b, premiseB, interior, context()));
  });

  it('keeps every epoch bounded by declared duration and every exposure bounded by persistence', () => {
    const fixture = fixtureSet.fixtures.find((candidate) => candidate.fixtureId === 'positive/hot-super-earth-magmatic-v1')!;
    const input = inputForFixture(fixture);
    const history = resolveTectonicRegimeHistory(input, premiseForFixture(fixture, input.contentHash), interiorForFixture(fixture), context()).history!;
    for (const epoch of history.epochs) {
      expect(epoch.persistenceRange.min).toBeGreaterThanOrEqual(0);
      expect(epoch.persistenceRange.max).toBeLessThanOrEqual(fixture.ageGyr);
      expect(epoch.surfaceExposureRange.max).toBeLessThanOrEqual(epoch.persistenceRange.max);
      for (const range of [epoch.mobilityRange, epoch.extensionRange, epoch.convergenceRange, epoch.transformRange, epoch.plumeRange, epoch.crustProductionRange]) {
        expect(range.min).toBeGreaterThanOrEqual(0);
        expect(range.max).toBeLessThanOrEqual(1);
      }
    }
  });

  it('blocks unsupported artificial histories instead of coercing them into natural evolution', () => {
    const fixture = fixtureSet.fixtures[0];
    const input = inputForFixture(fixture);
    const natural = premiseForFixture(fixture, input.contentHash);
    const payload = {
      ...natural,
      bodyClassCandidates: ['ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL'],
      surfaceMediumCandidates: ['DECLARED_ARTIFICIAL_SOLID_SURFACE'],
      layerStackCandidates: ['DECLARED_ARTIFICIAL_LAYER_STACK'],
    };
    const { contentHash: _ignored, ...withoutHash } = payload;
    const artificial = {
      ...withoutHash,
      contentHash: hashCausalPayload('WorldWright/planetary-premise/v1', withoutHash),
    };
    validatePlanetaryPremise(artificial);
    const resolution = resolveTectonicRegimeHistory(input, artificial, interiorForFixture(fixture), context());
    expect(resolution.status).toBe('BLOCKED');
    expect(resolution.blockingReasons).toEqual(['ARTIFICIAL_REGIME_HISTORY_MODEL_NOT_IMPLEMENTED']);
    expect(resolution.history).toBeUndefined();
  });

  it('rejects tampered premise lineage and hostile unowned resolution fields', () => {
    const fixture = fixtureSet.fixtures[0];
    const input = inputForFixture(fixture);
    const premise = premiseForFixture(fixture, input.contentHash);
    const interior = interiorForFixture(fixture);
    expect(() => resolveTectonicRegimeHistory(input, { ...premise, inputSnapshotHash: hashCausalPayload('WorldWright/tampered/v1', {}) }, interior, context())).toThrow(/bound|hash|input/i);
    const resolution = resolveTectonicRegimeHistory(input, premise, interior, context());
    expect(() => validateRegimeHistoryResolution({ ...resolution, plates: [] })).toThrow(/unowned fields/);
  });

  it('does not special-case fixture identities and stays within frozen budgets', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/core/causalGeology/regimeHistoryResolver.ts'), 'utf8');
    for (const fixture of fixtureSet.fixtures) expect(source).not.toContain(fixture.fixtureId);
    const researchContext = context();
    const startHeap = process.memoryUsage().heapUsed;
    const start = performance.now();
    for (let repeat = 0; repeat < 4; repeat += 1) {
      for (const fixture of fixtureSet.fixtures) {
        const input = inputForFixture(fixture);
        const result = resolveTectonicRegimeHistory(input, premiseForFixture(fixture, input.contentHash), interiorForFixture(fixture), researchContext);
        expect(result.metrics.templateCandidateCount).toBeLessThanOrEqual(REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1.maxTemplateCandidates);
        expect(result.metrics.epochCount).toBeLessThanOrEqual(REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1.maxEpochs);
        expect(result.metrics.transitionCount).toBeLessThanOrEqual(REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1.maxTransitions);
        expect(result.metrics.branchResolutionCount).toBeLessThanOrEqual(REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1.maxBranchResolutions);
        expect(result.metrics.serializedResultBytes).toBeLessThanOrEqual(REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1.maxSerializedResultBytes);
      }
    }
    const averageMilliseconds = (performance.now() - start) / (fixtureSet.fixtures.length * 4);
    const heapDelta = Math.max(0, process.memoryUsage().heapUsed - startHeap);
    expect(averageMilliseconds).toBeLessThan(REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1.maxAverageResolutionMilliseconds);
    expect(heapDelta).toBeLessThan(REGIME_HISTORY_RESOLVER_PERFORMANCE_BUDGET_V1.maxHeapDeltaBytes);
  });
});

function readJson<T>(filename: string): T {
  return JSON.parse(readFileSync(resolve(root, filename), 'utf8')) as T;
}
