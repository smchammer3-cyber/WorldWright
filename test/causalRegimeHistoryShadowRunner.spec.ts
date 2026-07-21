import { readFileSync } from 'node:fs';
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
  validateInteriorState,
  validatePlanetaryPremise,
  validateRegimeHistoryShadowRunnerResult,
  type CausalInputDeclarationV1,
  type InteriorStateV1,
  type PlanetaryPremiseV1,
  type RegimeHistoryFixtureSetV1,
  type RegimeHistoryResearchReviewV1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
} from '../src/core/causalGeology';
import { resolveWorldFeatureFlags } from '../src/core/worldFeatureFlags/resolve';
import { getRandomStreamDefinition } from '../src/core/worldRandom/streamRegistry';

const root = resolve(process.cwd(), 'src/core/causalGeology/research');
const review = readJson<RegimeHistoryResearchReviewV1>('regime-history-review-record.json');
const fixtureSet = readJson<RegimeHistoryFixtureSetV1>('regime-history-fixtures.json');
const fixture = fixtureSet.fixtures.find((candidate) => candidate.fixtureId === 'positive/earthlike-mixed-evolution-v1')!;

function researchContext() {
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

function inputSnapshot() {
  const declarations: CausalInputDeclarationV1[] = [
    {
      schemaVersion: 1,
      inputId: 'inventory.water',
      quantity: createScientificQuantity(fixture.waterInventory, 'earth-water-inventory', 'earth-water-inventory-v1'),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: 'fixture/inventory.water',
      confidenceSubject: 'fixture.inventory.water',
      evidenceIds: [],
    },
    {
      schemaVersion: 1,
      inputId: 'thermal.age',
      quantity: createScientificQuantity(fixture.ageGyr, 'gigaannum', 'gigaannum-v1'),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: 'fixture/thermal.age',
      confidenceSubject: 'fixture.thermal.age',
      evidenceIds: [],
    },
  ];
  return createCausalGeologyInput(fixture.rootSeed, declarations, {
    initialConditionBundleHash: hashCausalPayload('WorldWright/test-regime-history-shadow-bundle/v1', {
      ageGyr: fixture.ageGyr,
      waterInventory: fixture.waterInventory,
    }),
  });
}

function premise(inputHash: ReturnType<typeof inputSnapshot>['contentHash']): PlanetaryPremiseV1 {
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

function interior(): InteriorStateV1 {
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
    thermalBudgetRange: normalized(fixture.interior.thermalBudgetCenter, 'fixture.thermal'),
    heatSourceFractions: [
      { sourceId: 'PRIMORDIAL' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.primordial, 'fixture.primordial') },
      { sourceId: 'RADIOGENIC' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.radiogenic, 'fixture.radiogenic') },
      { sourceId: 'TIDAL' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.tidal, 'fixture.tidal') },
    ],
    mantleConvectionRange: normalized(fixture.interior.convectionCenter, 'fixture.convection'),
    rheologyCandidates: ['TEMPERATURE_DEPENDENT_SOLID_STATE'],
    lithosphereBehaviorCandidates: ['RIGID_SINGLE_LID'],
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

function upstream() {
  const input = inputSnapshot();
  const premiseRecord = premise(input.contentHash);
  const interiorRecord = interior();
  const interiorStageResult = createCausalStageResult<InteriorStateV1>({
    stageId: 'CAUSAL_INTERIOR_RESOLUTION',
    stageVersion: 1,
    status: 'PARTIAL',
    input: { inputSnapshot: input, premise: premiseRecord },
    record: interiorRecord,
    limitations: interiorRecord.limitations,
    missingDomains: ['controlled-fixture-interior-uncertainty'],
    downstreamCompatibleStageIds: ['CAUSAL_REGIME_HISTORY'],
  });
  return { input, premiseRecord, interiorRecord, interiorStageResult };
}

describe('W1-04 detached regime-history shadow runner', () => {
  it('requires exact interior lineage, remains detached, and replays byte-identically', () => {
    const { input, premiseRecord, interiorRecord, interiorStageResult } = upstream();
    const options = {
      authorityMode: 'CAUSAL_SHADOW' as const,
      featureFlags: resolveWorldFeatureFlags('CAUSAL_SHADOW', { 'causal.shadow.enabled': true }),
      inputSnapshot: input,
      premise: premiseRecord,
      interior: interiorRecord,
      interiorStageResult,
      researchContext: researchContext(),
    };
    const a = runRegimeHistoryShadow(options);
    const b = runRegimeHistoryShadow(options);
    expect(a).toEqual(b);
    expect(a.stageResult.stageId).toBe('CAUSAL_REGIME_HISTORY');
    expect(a.stageResult.status).toBe('PARTIAL');
    expect(a.stageResult.downstreamCompatibleStageIds).toEqual(['CAUSAL_GEOLOGIC_SPINE']);
    expect(a.stageResult.inputHash).toEqual(hashCausalPayload('WorldWright/CAUSAL_REGIME_HISTORY/input/v1', {
      premise: premiseRecord,
      interior: interiorRecord,
    }));
    expect(a.resolution.history?.epochs.length).toBeGreaterThan(0);
    const keys = collectObjectKeys(a);
    for (const forbidden of ['baseHeight', 'continentSkeletons', 'latitudeDegrees', 'longitudeDegrees', 'oceanBasinSkeletons', 'plateId', 'WorldBrain']) {
      expect(keys).not.toContain(forbidden);
    }
    expect(Object.isFrozen(a)).toBe(true);
    expect(() => validateRegimeHistoryShadowRunnerResult(a)).not.toThrow();
  });

  it('rejects legacy/active authority, disabled shadow, and tampered upstream lineage', () => {
    const { input, premiseRecord, interiorRecord, interiorStageResult } = upstream();
    const base = {
      featureFlags: resolveWorldFeatureFlags('CAUSAL_SHADOW', { 'causal.shadow.enabled': true }),
      inputSnapshot: input,
      premise: premiseRecord,
      interior: interiorRecord,
      interiorStageResult,
      researchContext: researchContext(),
    };
    expect(() => runRegimeHistoryShadow({ ...base, authorityMode: 'LEGACY' })).toThrow(/CAUSAL_SHADOW/);
    expect(() => runRegimeHistoryShadow({ ...base, authorityMode: 'CAUSAL_ACTIVE' })).toThrow(/CAUSAL_SHADOW/);
    expect(() => runRegimeHistoryShadow({
      ...base,
      authorityMode: 'CAUSAL_SHADOW',
      featureFlags: resolveWorldFeatureFlags('CAUSAL_SHADOW'),
    })).toThrow(/causal.shadow.enabled/);
    const otherInput = createCausalGeologyInput('different-seed', input.sourceDeclarations, {
      initialConditionBundleHash: input.initialConditionBundleHash,
    });
    expect(() => runRegimeHistoryShadow({
      ...base,
      authorityMode: 'CAUSAL_SHADOW',
      inputSnapshot: otherInput,
    })).toThrow(/bound|match|hash|input/i);
    expect(() => runRegimeHistoryShadow({
      ...base,
      authorityMode: 'CAUSAL_SHADOW',
      interior: { ...interiorRecord, limitations: ['Tampered interior.'] },
    })).toThrow(/match|hash|record/i);
  });

  it('rejects a blocked interior stage', () => {
    const { input, premiseRecord, interiorRecord } = upstream();
    const blocked = createCausalStageResult<InteriorStateV1>({
      stageId: 'CAUSAL_INTERIOR_RESOLUTION',
      stageVersion: 1,
      status: 'BLOCKED',
      input: { inputSnapshot: input, premise: premiseRecord },
      blockingReasons: ['TEST_BLOCK'],
    });
    expect(() => runRegimeHistoryShadow({
      authorityMode: 'CAUSAL_SHADOW',
      featureFlags: resolveWorldFeatureFlags('CAUSAL_SHADOW', { 'causal.shadow.enabled': true }),
      inputSnapshot: input,
      premise: premiseRecord,
      interior: interiorRecord,
      interiorStageResult: blocked,
      researchContext: researchContext(),
    })).toThrow(/does not permit/);
  });

  it('activates causal.regime-history only for shadow mode while W1-05 remains reserved', () => {
    const history = getRandomStreamDefinition('causal.regime-history');
    expect(history.status).toBe('ACTIVE');
    expect(history.allowedAuthorityModes).toEqual(['CAUSAL_SHADOW']);
    expect(getRandomStreamDefinition('causal.geologic-spine').status).toBe('RESERVED');
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
  return JSON.parse(readFileSync(resolve(root, filename), 'utf8')) as T;
}
