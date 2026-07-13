import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  PREMISE_BODY_CLASSES,
  PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1,
  createScientificResearchBundle,
  measurePremiseResearchArtifacts,
  validatePremiseCompatibilityMatrix,
  validatePremiseResearchFixtureSet,
  validateScientificResearchBundle,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
} from '../src/core/causalGeology';

const root = resolve(process.cwd(), 'src/core/causalGeology/research');
const sources = readJson<ScientificSourceV1[]>('source-registry.json');
const claimRules = readJson<ScientificClaimRuleV1[]>('claim-rules.json');
const correlationGroups = readJson<string[]>('correlation-groups.json');
const knownLimitations = readJson<string[]>('known-limitations.json');
const review = readJson<{
  readonly bundleVersion: string;
  readonly status: string;
  readonly completeEligibleRuleIds: readonly string[];
  readonly partialOnlyRuleIds: readonly string[];
  readonly implementationAuthorized: boolean;
}>('review-record.json');
const compatibility = readJson<unknown>('premise-compatibility-matrix.json');
const fixtures = readJson<unknown>('premise-fixtures.json');

function buildBundle() {
  return createScientificResearchBundle({
    bundleVersion: review.bundleVersion,
    sources,
    claimRules,
    correlationGroups,
    knownLimitations,
  });
}

describe('W1-02B planetary-premise research package', () => {
  it('loads a reviewed and traceable scientific bundle without authorizing implementation', () => {
    const bundle = buildBundle();
    expect(() => validateScientificResearchBundle(bundle)).not.toThrow();
    expect(review.status).toBe('PREMISE_RESEARCH_PACKAGE_REVIEWED');
    expect(review.implementationAuthorized).toBe(false);
    expect(bundle.sources.length).toBeLessThanOrEqual(PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1.maxResearchSources);
    expect(bundle.claimRules.length).toBeLessThanOrEqual(PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1.maxClaimRules);
  });

  it('keeps COMPLETE-eligible rules reviewed and provisional rules PARTIAL-only', () => {
    const byId = new Map(claimRules.map((rule) => [rule.ruleId, rule]));
    for (const ruleId of review.completeEligibleRuleIds) {
      const rule = byId.get(ruleId);
      expect(rule, `missing COMPLETE-eligible rule ${ruleId}`).toBeDefined();
      expect(rule!.evidenceStatus).toBe('REVIEWED');
      expect(rule!.reviewer).toBeTruthy();
      expect(rule!.reviewDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    for (const ruleId of review.partialOnlyRuleIds) {
      const rule = byId.get(ruleId);
      expect(rule, `missing PARTIAL-only rule ${ruleId}`).toBeDefined();
      expect(rule!.evidenceStatus).not.toBe('REVIEWED');
      expect(review.completeEligibleRuleIds).not.toContain(ruleId);
    }
    expect(new Set([...review.completeEligibleRuleIds, ...review.partialOnlyRuleIds])).toEqual(new Set(claimRules.map((rule) => rule.ruleId)));
  });

  it('validates complete vocabulary, compatibility, blocked-route, archetype, and holdout coverage', () => {
    const ruleIds = new Set(claimRules.map((rule) => rule.ruleId));
    expect(() => validatePremiseCompatibilityMatrix(compatibility, ruleIds)).not.toThrow();
    expect(() => validatePremiseResearchFixtureSet(fixtures, ruleIds)).not.toThrow();
    const holdoutBodyClasses = new Set(
      (fixtures as any).fixtures
        .filter((fixture: any) => fixture.kind === 'HOLDOUT')
        .flatMap((fixture: any) => fixture.expected.bodyClassCandidates),
    );
    for (const bodyClass of PREMISE_BODY_CLASSES) {
      if (bodyClass === 'ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL') continue;
      expect(holdoutBodyClasses.has(bodyClass), `missing holdout for ${bodyClass}`).toBe(true);
    }
  });

  it('does not special-case fixture IDs or smuggle downstream geology into scientific rules', () => {
    const fixtureIds = (fixtures as any).fixtures.map((fixture: any) => fixture.fixtureId as string);
    const rulesText = JSON.stringify(claimRules);
    for (const fixtureId of fixtureIds) expect(rulesText).not.toContain(fixtureId);
    for (const forbiddenField of ['continentSkeletons', 'geologyStack', 'plateActivity', 'resolvedPhysicalConsequences', 'terrain']) {
      expect(rulesText).not.toContain(`\"${forbiddenField}\"`);
    }
    const scopeRule = claimRules.find((rule) => rule.ruleId === 'premise/no-downstream-geology-v1');
    expect(scopeRule?.expectedRelation).toContain('may not infer tectonic regime');
  });

  it('freezes serialized-size, validation-time, and heap-growth budgets before resolver work', () => {
    const startHeap = process.memoryUsage().heapUsed;
    const start = performance.now();
    for (let index = 0; index < 16; index += 1) {
      const bundle = buildBundle();
      const ruleIds = new Set(bundle.claimRules.map((rule) => rule.ruleId));
      validatePremiseCompatibilityMatrix(compatibility, ruleIds);
      validatePremiseResearchFixtureSet(fixtures, ruleIds);
      measurePremiseResearchArtifacts(bundle, compatibility, fixtures, review);
    }
    const averageMilliseconds = (performance.now() - start) / 16;
    const heapDelta = Math.max(0, process.memoryUsage().heapUsed - startHeap);
    expect(averageMilliseconds).toBeLessThan(PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1.maxValidationMilliseconds);
    expect(heapDelta).toBeLessThan(PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1.maxHeapDeltaBytes);
  });

  it('rejects matrix, fixture, input-authority, and candidate tampering instead of normalizing hostile records silently', () => {
    const ruleIds = new Set(claimRules.map((rule) => rule.ruleId));
    expect(() => validatePremiseCompatibilityMatrix({ ...(compatibility as object), terrainPolicy: 'invented' }, ruleIds)).toThrow(/unowned fields/);

    const blockedWithCandidates = structuredClone(fixtures as any);
    blockedWithCandidates.fixtures[0].expected.bodyClassCandidates = ['ROCKY_TERRESTRIAL'];
    expect(() => validatePremiseResearchFixtureSet(blockedWithCandidates, ruleIds)).toThrow(/Blocked fixture/);

    const legacyInput = structuredClone(fixtures as any);
    legacyInput.fixtures[0].input.quantities.push({
      schemaVersion: 1,
      inputId: 'legacy.tectonic-vigor',
      value: 1,
      unit: 'normalized-0-1',
      scaleId: 'normalized-0-1-v1',
    });
    legacyInput.fixtures[0].input.quantities.sort((a: any, b: any) => String(a.inputId).localeCompare(String(b.inputId)));
    expect(() => validatePremiseResearchFixtureSet(legacyInput, ruleIds)).toThrow(/non-W1-02A input/);

    const wrongScale = structuredClone(fixtures as any);
    wrongScale.fixtures.find((fixture: any) => fixture.input.quantities.length > 0).input.quantities[0].scaleId = 'invented-scale-v1';
    expect(() => validatePremiseResearchFixtureSet(wrongScale, ruleIds)).toThrow(/wrong quantity contract/);
  });
});

function readJson<T>(filename: string): T {
  return JSON.parse(readFileSync(resolve(root, filename), 'utf8')) as T;
}
