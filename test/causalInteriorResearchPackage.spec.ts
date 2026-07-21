import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  createInteriorResearchContext,
  createScientificResearchBundle,
  validateInteriorFixtureSet,
  validateInteriorResearchContext,
  validateScientificResearchBundle,
  type InteriorFixtureSetV1,
  type InteriorResearchReviewV1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
} from '../src/core/causalGeology';

const root = resolve(process.cwd(), 'src/core/causalGeology/research');
const sources = readJson<ScientificSourceV1[]>('interior-source-registry.json');
const claimRules = readJson<ScientificClaimRuleV1[]>('interior-claim-rules.json');
const correlationGroups = readJson<string[]>('interior-correlation-groups.json');
const knownLimitations = readJson<string[]>('interior-known-limitations.json');
const review = readJson<InteriorResearchReviewV1>('interior-review-record.json');
const fixtureSet = readJson<InteriorFixtureSetV1>('interior-fixtures.json');

function bundle() {
  return createScientificResearchBundle({
    bundleVersion: review.bundleVersion,
    sources,
    claimRules,
    correlationGroups,
    knownLimitations,
  });
}

describe('W1-03 interior and rheology research package', () => {
  it('loads reviewed sources, rules, fixtures, and explicit implementation authorization', () => {
    const researchBundle = bundle();
    expect(() => validateScientificResearchBundle(researchBundle)).not.toThrow();
    expect(() => validateInteriorFixtureSet(fixtureSet)).not.toThrow();
    const context = createInteriorResearchContext({ researchBundle, fixtureSet, review });
    expect(() => validateInteriorResearchContext(context)).not.toThrow();
    expect(Object.isFrozen(context)).toBe(true);
    expect(review.status).toBe('INTERIOR_RESEARCH_PACKAGE_REVIEWED');
    expect(review.implementationAuthorized).toBe(true);
    expect(review.implementationAuthorizationDate).toBe('2026-07-21');
    expect(review.implementationAuthorizationBasis).toMatch(/user explicitly authorized/i);
  });

  it('keeps the normalized range calibration provisional and every other approved rule reviewed', () => {
    const byId = new Map(claimRules.map((rule) => [rule.ruleId, rule]));
    for (const ruleId of review.completeEligibleRuleIds) {
      const rule = byId.get(ruleId);
      expect(rule, `missing reviewed W1-03 rule ${ruleId}`).toBeDefined();
      expect(rule!.evidenceStatus).toBe('REVIEWED');
      expect(rule!.reviewer).toBeTruthy();
      expect(rule!.reviewDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    expect(review.partialOnlyRuleIds).toEqual(['interior/normalized-range-calibration-provisional-v1']);
    expect(byId.get('interior/normalized-range-calibration-provisional-v1')?.evidenceStatus).toBe('PROVISIONAL');
    expect(new Set([...review.completeEligibleRuleIds, ...review.partialOnlyRuleIds])).toEqual(new Set(claimRules.map((rule) => rule.ruleId)));
  });

  it('contains independent positive, threshold, and withheld holdout coverage', () => {
    expect(fixtureSet.fixtures.some((fixture) => fixture.kind === 'POSITIVE')).toBe(true);
    expect(fixtureSet.fixtures.some((fixture) => fixture.kind === 'THRESHOLD')).toBe(true);
    const holdouts = fixtureSet.fixtures.filter((fixture) => fixture.kind === 'HOLDOUT');
    expect(holdouts.length).toBeGreaterThanOrEqual(2);
    expect(holdouts.every((fixture) => fixture.withheldFromCalibration)).toBe(true);
    expect(new Set(fixtureSet.fixtures.flatMap((fixture) => fixture.premise.bodyClassCandidates))).toEqual(expect.objectContaining(new Set([
      'ICE_SHELL_OCEAN_BODY',
      'ROCK_ICE_MIXED_SOLID_BODY',
      'ROCKY_DWARF_OR_SMALL_BODY',
      'ROCKY_SUPER_EARTH',
      'ROCKY_TERRESTRIAL',
      'VOLATILE_PRESSURE_SOLID_BODY',
    ])));
  });

  it('fails closed on hostile fields, malformed holdout state, and revoked authorization', () => {
    expect(() => validateInteriorFixtureSet({ ...fixtureSet, terrainPolicy: 'invented' })).toThrow(/invalid fields/);
    const badHoldout = structuredClone(fixtureSet) as InteriorFixtureSetV1;
    (badHoldout.fixtures[0] as { withheldFromCalibration: boolean }).withheldFromCalibration = true;
    expect(() => validateInteriorFixtureSet(badHoldout)).toThrow(/holdout state/);
    expect(() => createInteriorResearchContext({
      researchBundle: bundle(),
      fixtureSet,
      review: { ...review, implementationAuthorized: false },
    })).toThrow(/not authorized/);
  });

  it('keeps fixture identities and forbidden downstream fields out of the implementation', () => {
    const source = [
      'src/core/causalGeology/interiorResolver.ts',
      'src/core/causalGeology/interiorResearchContracts.ts',
    ].map((path) => readFileSync(resolve(process.cwd(), path), 'utf8')).join('\n');
    for (const fixture of fixtureSet.fixtures) expect(source).not.toContain(fixture.fixtureId);
    for (const forbidden of [
      'continentSkeletons',
      'oceanBasinSkeletons',
      'geologyStack',
      'mantleConvectionIndex',
      'tectonicVigor',
      'volcanismBias',
      'riftLikelihood',
      'hotspotPotential',
      'baseHeight',
      'WorldBrain',
    ]) expect(source).not.toContain(forbidden);
  });
});

function readJson<T>(filename: string): T {
  return JSON.parse(readFileSync(resolve(root, filename), 'utf8')) as T;
}
