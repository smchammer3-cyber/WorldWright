import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  createCausalGeologyInput,
  createCausalStageResult,
  createInteriorResearchContext,
  createScientificQuantity,
  createScientificResearchBundle,
  hashCausalPayload,
  runInteriorShadow,
  validateInteriorShadowRunnerResult,
  validatePlanetaryPremise,
  type CausalGeologyInputId,
  type CausalInputDeclarationV1,
  type InteriorFixtureSetV1,
  type InteriorResearchReviewV1,
  type PlanetaryPremiseV1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
} from '../src/core/causalGeology';
import { resolveWorldFeatureFlags } from '../src/core/worldFeatureFlags/resolve';
import { getRandomStreamDefinition } from '../src/core/worldRandom/streamRegistry';

const root = resolve(process.cwd(), 'src/core/causalGeology/research');
const review = readJson<InteriorResearchReviewV1>('interior-review-record.json');
const fixtureSet = readJson<InteriorFixtureSetV1>('interior-fixtures.json');
const fixture = fixtureSet.fixtures.find((candidate) => candidate.fixtureId === 'positive/earthlike-mixed-heating-v1')!;
const CONTRACTS: Readonly<Record<string, readonly [string, string]>> = {
  'inventory.water': ['earth-water-inventory', 'earth-water-inventory-v1'],
  'planet.density': ['earth-density', 'earth-density-v1'],
  'planet.radius': ['earth-radius', 'earth-radius-v1'],
  'thermal.age': ['gigaannum', 'gigaannum-v1'],
  'thermal.primordial-heat': ['normalized-0-1', 'normalized-0-1-v1'],
  'thermal.radiogenic-heat': ['normalized-0-1', 'normalized-0-1-v1'],
  'thermal.tidal-heating': ['normalized-0-1', 'normalized-0-1-v1'],
};

function researchContext() {
  return createInteriorResearchContext({
    researchBundle: createScientificResearchBundle({
      bundleVersion: review.bundleVersion,
      sources: readJson<ScientificSourceV1[]>('interior-source-registry.json'),
      claimRules: readJson<ScientificClaimRuleV1[]>('interior-claim-rules.json'),
      correlationGroups: readJson<string[]>('interior-correlation-groups.json'),
      knownLimitations: readJson<string[]>('interior-known-limitations.json'),
    }),
    fixtureSet,
    review,
  });
}

function inputSnapshot() {
  const declarations: CausalInputDeclarationV1[] = Object.entries(fixture.quantities).map(([inputId, value]) => {
    const contract = CONTRACTS[inputId];
    if (!contract) throw new Error(`Missing fixture contract ${inputId}.`);
    return {
      schemaVersion: 1,
      inputId: inputId as CausalGeologyInputId,
      quantity: createScientificQuantity(value, contract[0], contract[1]),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `fixture/${inputId}`,
      confidenceSubject: `fixture.${inputId}`,
      evidenceIds: [],
    };
  });
  return createCausalGeologyInput('1040037', declarations, {
    initialConditionBundleHash: hashCausalPayload('WorldWright/test-interior-shadow-bundle/v1', fixture.quantities),
  });
}

function premise(inputHash: ReturnType<typeof inputSnapshot>['contentHash']): PlanetaryPremiseV1 {
  const payload = {
    schemaVersion: 1 as const,
    premiseVersion: 1,
    status: 'COMPLETE' as const,
    inputSnapshotHash: inputHash,
    bodyClassCandidates: fixture.premise.bodyClassCandidates,
    surfaceMediumCandidates: fixture.premise.surfaceMediumCandidates,
    layerStackCandidates: fixture.premise.layerStackCandidates,
    resolvedBodyClass: fixture.premise.bodyClassCandidates[0],
    resolvedSurfaceMedium: fixture.premise.surfaceMediumCandidates[0],
    resolvedLayerStack: fixture.premise.layerStackCandidates,
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: 'fixture.premise',
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: [] as readonly string[],
  };
  const value = {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/planetary-premise/v1', payload),
  };
  validatePlanetaryPremise(value);
  return value;
}

describe('W1-03 detached interior shadow runner', () => {
  it('requires an exact premise dependency, remains detached, and replays byte-identically', () => {
    const input = inputSnapshot();
    const premiseRecord = premise(input.contentHash);
    const premiseStageResult = createCausalStageResult<PlanetaryPremiseV1>({
      stageId: 'CAUSAL_PREMISE_RESOLUTION',
      stageVersion: 1,
      status: 'COMPLETE',
      input,
      record: premiseRecord,
    });
    const options = {
      authorityMode: 'CAUSAL_SHADOW' as const,
      featureFlags: resolveWorldFeatureFlags('CAUSAL_SHADOW', { 'causal.shadow.enabled': true }),
      inputSnapshot: input,
      premise: premiseRecord,
      premiseStageResult,
      researchContext: researchContext(),
    };
    const a = runInteriorShadow(options);
    const b = runInteriorShadow(options);
    expect(a).toEqual(b);
    expect(a.stageResult.stageId).toBe('CAUSAL_INTERIOR_RESOLUTION');
    expect(a.stageResult.status).toBe('PARTIAL');
    expect(a.stageResult.downstreamCompatibleStageIds).toEqual(['CAUSAL_REGIME_HISTORY']);
    expect(a.resolution.interior?.resolvedLidRegime).toBeTruthy();
    const keys = collectObjectKeys(a);
    expect(keys).not.toContain('baseHeight');
    expect(keys).not.toContain('WorldBrain');
    expect(keys).not.toContain('tectonicVigor');
    expect(keys).not.toContain('continentSkeletons');
    expect(Object.isFrozen(a)).toBe(true);
    expect(() => validateInteriorShadowRunnerResult(a)).not.toThrow();
  });

  it('rejects legacy/active authority, a disabled flag, and tampered premise lineage', () => {
    const input = inputSnapshot();
    const premiseRecord = premise(input.contentHash);
    const premiseStageResult = createCausalStageResult<PlanetaryPremiseV1>({
      stageId: 'CAUSAL_PREMISE_RESOLUTION',
      stageVersion: 1,
      status: 'COMPLETE',
      input,
      record: premiseRecord,
    });
    const base = {
      featureFlags: resolveWorldFeatureFlags('CAUSAL_SHADOW', { 'causal.shadow.enabled': true }),
      inputSnapshot: input,
      premise: premiseRecord,
      premiseStageResult,
      researchContext: researchContext(),
    };
    expect(() => runInteriorShadow({ ...base, authorityMode: 'LEGACY' })).toThrow(/CAUSAL_SHADOW/);
    expect(() => runInteriorShadow({ ...base, authorityMode: 'CAUSAL_ACTIVE' })).toThrow(/CAUSAL_SHADOW/);
    expect(() => runInteriorShadow({
      ...base,
      authorityMode: 'CAUSAL_SHADOW',
      featureFlags: resolveWorldFeatureFlags('CAUSAL_SHADOW'),
    })).toThrow(/causal.shadow.enabled/);
    const otherInput = createCausalGeologyInput('different-seed', input.sourceDeclarations, {
      initialConditionBundleHash: input.initialConditionBundleHash,
    });
    expect(() => runInteriorShadow({
      ...base,
      authorityMode: 'CAUSAL_SHADOW',
      inputSnapshot: otherInput,
    })).toThrow(/bound|match|hash|input/i);
  });

  it('rejects a blocked premise stage and a premise stage that does not permit W1-03', () => {
    const input = inputSnapshot();
    const premiseRecord = premise(input.contentHash);
    const blocked = createCausalStageResult<PlanetaryPremiseV1>({
      stageId: 'CAUSAL_PREMISE_RESOLUTION',
      stageVersion: 1,
      status: 'BLOCKED',
      input,
      blockingReasons: ['TEST_BLOCK'],
    });
    expect(() => runInteriorShadow({
      authorityMode: 'CAUSAL_SHADOW',
      featureFlags: resolveWorldFeatureFlags('CAUSAL_SHADOW', { 'causal.shadow.enabled': true }),
      inputSnapshot: input,
      premise: premiseRecord,
      premiseStageResult: blocked,
      researchContext: researchContext(),
    })).toThrow(/does not permit/);
  });

  it('activates causal.interior only for shadow mode while W1-04 and W1-05 streams remain reserved', () => {
    const interior = getRandomStreamDefinition('causal.interior');
    expect(interior.status).toBe('ACTIVE');
    expect(interior.allowedAuthorityModes).toEqual(['CAUSAL_SHADOW']);
    expect(getRandomStreamDefinition('causal.regime-history').status).toBe('RESERVED');
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
