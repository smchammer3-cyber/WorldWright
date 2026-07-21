import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  PLANETARY_PREMISE_RESOLVER_PERFORMANCE_BUDGET_V1,
  createGenerationRequest,
  createPremiseResolutionInput,
  createPremiseResolverResearchContext,
  createScientificResearchBundle,
  hashCausalPayload,
  resolvePlanetaryPremise,
  validatePlanetaryPremiseResolution,
  type PremiseCompatibilityMatrixV1,
  type PremiseDeclarationTagV1,
  type PremiseFixtureSetV1,
  type PremiseResearchReviewV1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
} from '../src/core/causalGeology';

const researchRoot = resolve(process.cwd(), 'src/core/causalGeology/research');
const sources = readJson<ScientificSourceV1[]>('source-registry.json');
const claimRules = readJson<ScientificClaimRuleV1[]>('claim-rules.json');
const correlationGroups = readJson<string[]>('correlation-groups.json');
const knownLimitations = readJson<string[]>('known-limitations.json');
const review = readJson<PremiseResearchReviewV1>('review-record.json');
const compatibilityMatrix = readJson<PremiseCompatibilityMatrixV1>('premise-compatibility-matrix.json');
const fixtureSet = readJson<PremiseFixtureSetV1>('premise-fixtures.json');

function researchContext() {
  return createPremiseResolverResearchContext({
    researchBundle: createScientificResearchBundle({
      bundleVersion: review.bundleVersion,
      sources,
      claimRules,
      correlationGroups,
      knownLimitations,
    }),
    compatibilityMatrix,
    fixtureSet,
    review,
  });
}

function inputForFixture(fixture: PremiseFixtureSetV1['fixtures'][number]) {
  return createPremiseResolutionInput({
    inputSnapshotHash: hashCausalPayload('WorldWright/test-premise-input/v1', fixture.input),
    rootSeed: createGenerationRequest(`premise-${fixture.kind}`, []).rootSeed,
    quantities: fixture.input.quantities,
    exceptionPermissions: fixture.input.exceptionPermissions,
    declarationTags: fixture.input.scenarioTags as readonly PremiseDeclarationTagV1[],
  });
}

describe('W1-02B planetary-premise resolver', () => {
  it('satisfies every committed positive, negative, threshold, exception, contradiction, missing-evidence, and holdout fixture', () => {
    const context = researchContext();
    for (const fixture of fixtureSet.fixtures) {
      const resolution = resolvePlanetaryPremise(inputForFixture(fixture), context);
      expect(resolution.status, fixture.fixtureId).toBe(fixture.expected.status);
      expect(resolution.blockingReasons, fixture.fixtureId).toEqual(fixture.expected.blockingCodes);
      if (fixture.expected.status === 'BLOCKED') {
        expect(resolution.premise, fixture.fixtureId).toBeUndefined();
        continue;
      }
      expect(resolution.premise?.bodyClassCandidates, fixture.fixtureId).toEqual(fixture.expected.bodyClassCandidates);
      expect(resolution.premise?.surfaceMediumCandidates, fixture.fixtureId).toEqual(fixture.expected.surfaceMediumCandidates);
      expect(resolution.premise?.layerStackCandidates, fixture.fixtureId).toEqual(fixture.expected.layerStackCandidates);
      expect(resolution.evidenceIds, fixture.fixtureId).toEqual(fixture.expected.requiredRuleIds);
      expect(() => validatePlanetaryPremiseResolution(resolution)).not.toThrow();
    }
  });

  it('replays byte-identically and ignores input insertion order', () => {
    const context = researchContext();
    const fixture = fixtureSet.fixtures.find((candidate) => candidate.fixtureId === 'positive/earth-scale-rocky-v1')!;
    const a = inputForFixture(fixture);
    const b = createPremiseResolutionInput({
      inputSnapshotHash: a.inputSnapshotHash,
      rootSeed: a.rootSeed,
      quantities: [...fixture.input.quantities].reverse(),
      exceptionPermissions: [...fixture.input.exceptionPermissions].reverse(),
      declarationTags: [...fixture.input.scenarioTags].reverse() as PremiseDeclarationTagV1[],
    });
    expect(a).toEqual(b);
    expect(resolvePlanetaryPremise(a, context)).toEqual(resolvePlanetaryPremise(b, context));
  });

  it('blocks unsupported brown-dwarf declarations and forbidden later-stage conclusions', () => {
    const context = researchContext();
    const base = {
      inputSnapshotHash: hashCausalPayload('WorldWright/test-premise-input/v1', { case: 'blocked' }),
      rootSeed: createGenerationRequest('blocked-premise', []).rootSeed,
      quantities: [],
    } as const;
    const brownDwarf = resolvePlanetaryPremise(createPremiseResolutionInput({ ...base, declarationTags: ['DECLARED_BROWN_DWARF'] }), context);
    expect(brownDwarf.status).toBe('BLOCKED');
    expect(brownDwarf.blockingReasons).toEqual(['UNSUPPORTED_BROWN_DWARF_SOLID_ROUTE']);
    const hostile = resolvePlanetaryPremise(createPremiseResolutionInput({ ...base, declarationTags: ['ATTEMPTED_SOLVED_TECTONIC_CONCLUSION'] }), context);
    expect(hostile.status).toBe('BLOCKED');
    expect(hostile.blockingReasons).toEqual(['FORBIDDEN_DOWNSTREAM_CONCLUSION_IN_PREMISE_INPUT']);
  });

  it('fails closed on unowned fields, unauthorized research state, and tampered hashes', () => {
    const context = researchContext();
    const fixture = fixtureSet.fixtures.find((candidate) => candidate.kind === 'POSITIVE')!;
    const result = resolvePlanetaryPremise(inputForFixture(fixture), context);
    expect(() => validatePlanetaryPremiseResolution({ ...result, terrain: [] })).toThrow(/unowned fields/);
    expect(() => validatePlanetaryPremiseResolution({ ...result, status: 'BLOCKED' })).toThrow();
    expect(() => createPremiseResolverResearchContext({
      researchBundle: context.researchBundle,
      compatibilityMatrix,
      fixtureSet,
      review: { ...review, implementationAuthorized: false },
    })).toThrow(/not authorized/);
  });

  it('does not special-case committed fixture identities and stays within frozen budgets', () => {
    const implementationSources = [
      'src/core/causalGeology/premiseResolver.ts',
      'src/core/causalGeology/premiseResolverPolicy.ts',
    ].map((path) => readFileSync(resolve(process.cwd(), path), 'utf8')).join('\n');
    for (const fixture of fixtureSet.fixtures) expect(implementationSources).not.toContain(fixture.fixtureId);
    const context = researchContext();
    const startHeap = process.memoryUsage().heapUsed;
    const start = performance.now();
    for (let repeat = 0; repeat < 4; repeat += 1) {
      for (const fixture of fixtureSet.fixtures) {
        const result = resolvePlanetaryPremise(inputForFixture(fixture), context);
        expect(result.metrics.modelArchetypesExamined).toBeLessThanOrEqual(PLANETARY_PREMISE_RESOLVER_PERFORMANCE_BUDGET_V1.maxModelArchetypes);
        expect(result.metrics.ruleEvaluations).toBeLessThanOrEqual(PLANETARY_PREMISE_RESOLVER_PERFORMANCE_BUDGET_V1.maxRuleEvaluations);
        expect(result.metrics.serializedResultBytes).toBeLessThanOrEqual(PLANETARY_PREMISE_RESOLVER_PERFORMANCE_BUDGET_V1.maxSerializedResultBytes);
      }
    }
    const averageMilliseconds = (performance.now() - start) / (fixtureSet.fixtures.length * 4);
    const heapDelta = Math.max(0, process.memoryUsage().heapUsed - startHeap);
    expect(averageMilliseconds).toBeLessThan(PLANETARY_PREMISE_RESOLVER_PERFORMANCE_BUDGET_V1.maxAverageResolutionMilliseconds);
    expect(heapDelta).toBeLessThan(PLANETARY_PREMISE_RESOLVER_PERFORMANCE_BUDGET_V1.maxHeapDeltaBytes);
  });
});

function readJson<T>(filename: string): T {
  return JSON.parse(readFileSync(resolve(researchRoot, filename), 'utf8')) as T;
}
