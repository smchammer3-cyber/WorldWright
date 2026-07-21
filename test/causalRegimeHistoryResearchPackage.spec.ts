import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  createRegimeHistoryResearchContext,
  createScientificResearchBundle,
  validateRegimeHistoryFixtureSet,
  validateRegimeHistoryResearchContext,
  validateScientificResearchBundle,
  type RegimeHistoryFixtureSetV1,
  type RegimeHistoryResearchReviewV1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
} from '../src/core/causalGeology';

const root = resolve(process.cwd(), 'src/core/causalGeology/research');
const sources = readJson<ScientificSourceV1[]>('regime-history-source-registry.json');
const claimRules = readJson<ScientificClaimRuleV1[]>('regime-history-claim-rules.json');
const correlationGroups = readJson<string[]>('regime-history-correlation-groups.json');
const knownLimitations = readJson<string[]>('regime-history-known-limitations.json');
const review = readJson<RegimeHistoryResearchReviewV1>('regime-history-review-record.json');
const fixtureSet = readJson<RegimeHistoryFixtureSetV1>('regime-history-fixtures.json');

function bundle() {
  return createScientificResearchBundle({
    bundleVersion: review.bundleVersion,
    sources,
    claimRules,
    correlationGroups,
    knownLimitations,
  });
}

describe('W1-04 tectonic regime history research package', () => {
  it('loads reviewed sources, rules, fixtures, and explicit implementation authorization', () => {
    const researchBundle = bundle();
    expect(() => validateScientificResearchBundle(researchBundle)).not.toThrow();
    expect(() => validateRegimeHistoryFixtureSet(fixtureSet)).not.toThrow();
    const context = createRegimeHistoryResearchContext({ researchBundle, fixtureSet, review });
    expect(() => validateRegimeHistoryResearchContext(context)).not.toThrow();
    expect(Object.isFrozen(context)).toBe(true);
    expect(review.status).toBe('REGIME_HISTORY_RESEARCH_PACKAGE_REVIEWED');
    expect(review.implementationAuthorized).toBe(true);
    expect(review.implementationAuthorizationDate).toBe('2026-07-21');
    expect(review.implementationAuthorizationBasis).toMatch(/user explicitly authorized/i);
  });

  it('keeps normalized chronology provisional while every mechanism rule is reviewed', () => {
    const byId = new Map(claimRules.map((rule) => [rule.ruleId, rule]));
    for (const ruleId of review.completeEligibleRuleIds) {
      const rule = byId.get(ruleId);
      expect(rule, `missing reviewed W1-04 rule ${ruleId}`).toBeDefined();
      expect(rule!.evidenceStatus).toBe('REVIEWED');
      expect(rule!.reviewer).toBeTruthy();
      expect(rule!.reviewDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    expect(review.partialOnlyRuleIds).toEqual(['history/normalized-epoch-calibration-provisional-v1']);
    expect(byId.get('history/normalized-epoch-calibration-provisional-v1')?.evidenceStatus).toBe('PROVISIONAL');
    expect(new Set([...review.completeEligibleRuleIds, ...review.partialOnlyRuleIds])).toEqual(new Set(claimRules.map((rule) => rule.ruleId)));
  });

  it('contains positive, threshold, rocky, icy, mixed, volatile, and withheld holdout coverage', () => {
    expect(fixtureSet.fixtures.some((fixture) => fixture.kind === 'POSITIVE')).toBe(true);
    expect(fixtureSet.fixtures.some((fixture) => fixture.kind === 'THRESHOLD')).toBe(true);
    const holdouts = fixtureSet.fixtures.filter((fixture) => fixture.kind === 'HOLDOUT');
    expect(holdouts.length).toBeGreaterThanOrEqual(2);
    expect(holdouts.every((fixture) => fixture.withheldFromCalibration)).toBe(true);
    const bodyClasses = new Set(fixtureSet.fixtures.flatMap((fixture) => fixture.premiseBodyClassCandidates));
    for (const bodyClass of [
      'ICE_SHELL_OCEAN_BODY',
      'ROCK_ICE_MIXED_SOLID_BODY',
      'ROCKY_DWARF_OR_SMALL_BODY',
      'ROCKY_SUPER_EARTH',
      'ROCKY_TERRESTRIAL',
      'VOLATILE_PRESSURE_SOLID_BODY',
    ]) expect(bodyClasses.has(bodyClass as never), `missing W1-04 fixture coverage for ${bodyClass}`).toBe(true);
  });

  it('fails closed on hostile fields, malformed holdout state, and revoked authorization', () => {
    expect(() => validateRegimeHistoryFixtureSet({ ...fixtureSet, platePolicy: 'invented' })).toThrow(/invalid fields/);
    const badHoldout = structuredClone(fixtureSet) as any;
    badHoldout.fixtures[0].withheldFromCalibration = true;
    expect(() => validateRegimeHistoryFixtureSet(badHoldout)).toThrow(/holdout state/);
    expect(() => createRegimeHistoryResearchContext({
      researchBundle: bundle(),
      fixtureSet,
      review: { ...review, implementationAuthorized: false },
    })).toThrow(/not authorized/);
  });

  it('keeps fixture identities and forbidden spatial identifiers out of runtime implementation', () => {
    const source = [
      'src/core/causalGeology/regimeHistoryResolver.ts',
      'src/core/causalGeology/regimeHistoryResearchContracts.ts',
    ].map((path) => readFileSync(resolve(process.cwd(), path), 'utf8')).join('\n');
    for (const fixture of fixtureSet.fixtures) expect(source).not.toContain(fixture.fixtureId);
    for (const forbidden of [
      'baseHeight',
      'continentSkeletons',
      'geologyStack',
      'latitudeDegrees',
      'longitudeDegrees',
      'oceanBasinSkeletons',
      'plateId',
      'WorldBrain',
    ]) expect(source).not.toMatch(new RegExp(`\\b${escapeRegExp(forbidden)}\\b`));
  });
});

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function readJson<T>(filename: string): T {
  return JSON.parse(readFileSync(resolve(root, filename), 'utf8')) as T;
}
