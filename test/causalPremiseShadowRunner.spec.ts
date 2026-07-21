import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  createCausalGeologyInputFromInitialConditionBundle,
  createGenerationRequest,
  createPremiseResolverResearchContext,
  createQuantityGenerationControl,
  createScientificQuantity,
  createScientificResearchBundle,
  resolvePlanetInitialConditionBundle,
  runPlanetaryPremiseShadow,
  validatePlanetaryPremiseShadowRunnerResult,
  type PremiseCompatibilityMatrixV1,
  type PremiseFixtureSetV1,
  type PremiseResearchReviewV1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
} from '../src/core/causalGeology';
import { resolveWorldFeatureFlags } from '../src/core/worldFeatureFlags/resolve';
import { getRandomStreamDefinition } from '../src/core/worldRandom/streamRegistry';

const root = resolve(process.cwd(), 'src/core/causalGeology/research');
const review = readJson<PremiseResearchReviewV1>('review-record.json');

function context() {
  return createPremiseResolverResearchContext({
    researchBundle: createScientificResearchBundle({
      bundleVersion: review.bundleVersion,
      sources: readJson<ScientificSourceV1[]>('source-registry.json'),
      claimRules: readJson<ScientificClaimRuleV1[]>('claim-rules.json'),
      correlationGroups: readJson<string[]>('correlation-groups.json'),
      knownLimitations: readJson<string[]>('known-limitations.json'),
    }),
    compatibilityMatrix: readJson<PremiseCompatibilityMatrixV1>('premise-compatibility-matrix.json'),
    fixtureSet: readJson<PremiseFixtureSetV1>('premise-fixtures.json'),
    review,
  });
}

function earthBundle() {
  const request = createGenerationRequest('1040037', [
    createQuantityGenerationControl('planet.radius', createScientificQuantity(1, 'earth-radius', 'earth-radius-v1'), 'HARD_CONSTRAINT'),
    createQuantityGenerationControl('planet.density', createScientificQuantity(1, 'earth-density', 'earth-density-v1'), 'HARD_CONSTRAINT'),
    createQuantityGenerationControl('inventory.water', createScientificQuantity(0.5, 'earth-water-inventory', 'earth-water-inventory-v1'), 'HARD_CONSTRAINT'),
  ]);
  return resolvePlanetInitialConditionBundle(request, { authorityMode: 'CAUSAL_SHADOW' });
}

describe('W1-02B detached premise shadow runner', () => {
  it('runs only with explicit shadow authority, remains detached, and replays byte-identically', () => {
    const initialConditionBundle = earthBundle();
    expect(initialConditionBundle.status).not.toBe('BLOCKED');
    const inputSnapshot = createCausalGeologyInputFromInitialConditionBundle(initialConditionBundle);
    const options = {
      authorityMode: 'CAUSAL_SHADOW' as const,
      featureFlags: resolveWorldFeatureFlags('CAUSAL_SHADOW', { 'causal.shadow.enabled': true }),
      initialConditionBundle,
      inputSnapshot,
      researchContext: context(),
    };
    const a = runPlanetaryPremiseShadow(options);
    const b = runPlanetaryPremiseShadow(options);
    expect(a).toEqual(b);
    expect(a.stageResult.stageId).toBe('CAUSAL_PREMISE_RESOLUTION');
    expect(a.stageResult.inputHash).toEqual(b.stageResult.inputHash);
    expect(a.resolution.premise?.bodyClassCandidates).toContain('ROCKY_TERRESTRIAL');
    expect(JSON.stringify(a)).not.toContain('baseHeight');
    expect(JSON.stringify(a)).not.toContain('WorldBrain');
    expect(Object.isFrozen(a)).toBe(true);
    expect(() => validatePlanetaryPremiseShadowRunnerResult(a)).not.toThrow();
  });

  it('rejects legacy/active authority, a disabled shadow flag, and tampered bundle lineage', () => {
    const initialConditionBundle = earthBundle();
    const inputSnapshot = createCausalGeologyInputFromInitialConditionBundle(initialConditionBundle);
    const researchContext = context();
    const shadowFlags = resolveWorldFeatureFlags('CAUSAL_SHADOW', { 'causal.shadow.enabled': true });
    expect(() => runPlanetaryPremiseShadow({ authorityMode: 'LEGACY', featureFlags: shadowFlags, initialConditionBundle, inputSnapshot, researchContext })).toThrow(/CAUSAL_SHADOW/);
    expect(() => runPlanetaryPremiseShadow({ authorityMode: 'CAUSAL_ACTIVE', featureFlags: shadowFlags, initialConditionBundle, inputSnapshot, researchContext })).toThrow(/CAUSAL_SHADOW/);
    expect(() => runPlanetaryPremiseShadow({
      authorityMode: 'CAUSAL_SHADOW',
      featureFlags: resolveWorldFeatureFlags('CAUSAL_SHADOW'),
      initialConditionBundle,
      inputSnapshot,
      researchContext,
    })).toThrow(/causal.shadow.enabled/);
    expect(() => runPlanetaryPremiseShadow({
      authorityMode: 'CAUSAL_SHADOW',
      featureFlags: shadowFlags,
      initialConditionBundle,
      inputSnapshot: { ...inputSnapshot, initialConditionBundleHash: initialConditionBundle.requestHash },
      researchContext,
    })).toThrow(/bundle|hash|bound/i);
  });

  it('keeps premise, interior, regime-history, and geologic-spine streams active only in shadow mode', () => {
    for (const stream of ['causal.premise', 'causal.interior', 'causal.regime-history', 'causal.geologic-spine'] as const) {
      const definition = getRandomStreamDefinition(stream);
      expect(definition.status).toBe('ACTIVE');
      expect(definition.allowedAuthorityModes).toEqual(['CAUSAL_SHADOW']);
    }
  });
});

function readJson<T>(filename: string): T {
  return JSON.parse(readFileSync(resolve(root, filename), 'utf8')) as T;
}
