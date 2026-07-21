import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  INTERIOR_RESOLVER_PERFORMANCE_BUDGET_V1,
  createCausalGeologyInput,
  createInteriorResearchContext,
  createScientificQuantity,
  createScientificResearchBundle,
  hashCausalPayload,
  resolveInteriorState,
  validateInteriorResolution,
  validatePlanetaryPremise,
  type CausalGeologyInputId,
  type CausalInputDeclarationV1,
  type InteriorFixtureSetV1,
  type InteriorResearchFixtureV1,
  type InteriorResearchReviewV1,
  type PlanetaryPremiseV1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
} from '../src/core/causalGeology';

const root = resolve(process.cwd(), 'src/core/causalGeology/research');
const review = readJson<InteriorResearchReviewV1>('interior-review-record.json');
const fixtureSet = readJson<InteriorFixtureSetV1>('interior-fixtures.json');

const QUANTITY_CONTRACTS: Readonly<Record<string, readonly [string, string]>> = {
  'inventory.water': ['earth-water-inventory', 'earth-water-inventory-v1'],
  'planet.density': ['earth-density', 'earth-density-v1'],
  'planet.radius': ['earth-radius', 'earth-radius-v1'],
  'thermal.age': ['gigaannum', 'gigaannum-v1'],
  'thermal.primordial-heat': ['normalized-0-1', 'normalized-0-1-v1'],
  'thermal.radiogenic-heat': ['normalized-0-1', 'normalized-0-1-v1'],
  'thermal.tidal-heating': ['normalized-0-1', 'normalized-0-1-v1'],
};

function context() {
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

function inputForFixture(fixture: InteriorResearchFixtureV1, reverse = false) {
  const entries = Object.entries(fixture.quantities);
  if (reverse) entries.reverse();
  const declarations: CausalInputDeclarationV1[] = entries.map(([inputId, value]) => {
    const contract = QUANTITY_CONTRACTS[inputId];
    if (!contract) throw new Error(`Missing test quantity contract for ${inputId}.`);
    return {
      schemaVersion: 1,
      inputId: inputId as CausalGeologyInputId,
      quantity: createScientificQuantity(value, contract[0], contract[1]),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `fixture/${fixture.fixtureId}/${inputId}`,
      confidenceSubject: `fixture.${inputId}`,
      evidenceIds: [],
    };
  });
  return createCausalGeologyInput(`interior-${fixture.kind}`, declarations, {
    initialConditionBundleHash: hashCausalPayload('WorldWright/test-interior-bundle/v1', fixture.quantities),
  });
}

function premiseForFixture(fixture: InteriorResearchFixtureV1, inputSnapshotHash = inputForFixture(fixture).contentHash): PlanetaryPremiseV1 {
  const premisePayload = {
    schemaVersion: 1 as const,
    premiseVersion: 1,
    status: fixture.premise.status,
    inputSnapshotHash,
    bodyClassCandidates: fixture.premise.bodyClassCandidates,
    surfaceMediumCandidates: fixture.premise.surfaceMediumCandidates,
    layerStackCandidates: fixture.premise.layerStackCandidates,
    ...(fixture.premise.status === 'COMPLETE' ? {
      resolvedBodyClass: fixture.premise.bodyClassCandidates[0],
      resolvedSurfaceMedium: fixture.premise.surfaceMediumCandidates[0],
      resolvedLayerStack: fixture.premise.layerStackCandidates,
    } : {}),
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: 'fixture.premise',
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: fixture.premise.status === 'PARTIAL' ? ['Controlled fixture premise remains partial.'] : [],
  };
  const premise = {
    ...premisePayload,
    contentHash: hashCausalPayload('WorldWright/planetary-premise/v1', premisePayload),
  };
  validatePlanetaryPremise(premise);
  return premise;
}

describe('W1-03 interior and rheology resolver', () => {
  it('satisfies every committed positive, threshold, and withheld holdout envelope', () => {
    const researchContext = context();
    for (const fixture of fixtureSet.fixtures) {
      const input = inputForFixture(fixture);
      const premise = premiseForFixture(fixture, input.contentHash);
      const resolution = resolveInteriorState(input, premise, researchContext);
      expect(resolution.status, fixture.fixtureId).toBe(fixture.expected.status);
      expect(resolution.interior, fixture.fixtureId).toBeDefined();
      for (const candidate of fixture.expected.requiredRheologyCandidates) {
        expect(resolution.interior?.rheologyCandidates, fixture.fixtureId).toContain(candidate);
      }
      for (const candidate of fixture.expected.requiredLidRegimeCandidates) {
        expect(resolution.interior?.lidRegimeCandidates, fixture.fixtureId).toContain(candidate);
      }
      expect(resolution.interior?.lidRegimeCandidates, fixture.fixtureId).toContain(resolution.interior?.resolvedLidRegime);
      expect(midpoint(resolution.interior!.thermalBudgetRange), fixture.fixtureId).toBeGreaterThanOrEqual(fixture.expected.thermalBudgetEnvelope[0]);
      expect(midpoint(resolution.interior!.thermalBudgetRange), fixture.fixtureId).toBeLessThanOrEqual(fixture.expected.thermalBudgetEnvelope[1]);
      expect(midpoint(resolution.interior!.mantleConvectionRange), fixture.fixtureId).toBeGreaterThanOrEqual(fixture.expected.convectionEnvelope[0]);
      expect(midpoint(resolution.interior!.mantleConvectionRange), fixture.fixtureId).toBeLessThanOrEqual(fixture.expected.convectionEnvelope[1]);
      expect(midpoint(resolution.interior!.meltAndVolcanismRange), fixture.fixtureId).toBeGreaterThanOrEqual(fixture.expected.meltEnvelope[0]);
      expect(midpoint(resolution.interior!.meltAndVolcanismRange), fixture.fixtureId).toBeLessThanOrEqual(fixture.expected.meltEnvelope[1]);
      expect(() => validateInteriorResolution(resolution)).not.toThrow();
    }
  });

  it('replays byte-identically and ignores declaration insertion order', () => {
    const fixture = fixtureSet.fixtures.find((candidate) => candidate.fixtureId === 'positive/earthlike-mixed-heating-v1')!;
    const a = inputForFixture(fixture);
    const b = inputForFixture(fixture, true);
    expect(a).toEqual(b);
    const premiseA = premiseForFixture(fixture, a.contentHash);
    const premiseB = premiseForFixture(fixture, b.contentHash);
    expect(resolveInteriorState(a, premiseA, context())).toEqual(resolveInteriorState(b, premiseB, context()));
  });

  it('keeps heat-source fractions explicit, bounded, and canonically ordered', () => {
    const fixture = fixtureSet.fixtures.find((candidate) => candidate.fixtureId === 'threshold/tidally-heated-rocky-v1')!;
    const input = inputForFixture(fixture);
    const result = resolveInteriorState(input, premiseForFixture(fixture, input.contentHash), context());
    expect(result.interior?.heatSourceFractions.map((entry) => entry.sourceId)).toEqual(['PRIMORDIAL', 'RADIOGENIC', 'TIDAL']);
    for (const entry of result.interior!.heatSourceFractions) {
      expect(entry.fractionRange.min).toBeGreaterThanOrEqual(0);
      expect(entry.fractionRange.max).toBeLessThanOrEqual(1);
    }
    expect(result.interior?.heatSourceFractions.find((entry) => entry.sourceId === 'TIDAL')?.fractionRange.max).toBeGreaterThan(0.4);
  });

  it('blocks unsupported artificial interiors rather than coercing them into a natural model', () => {
    const fixture = fixtureSet.fixtures[0];
    const input = inputForFixture(fixture);
    const natural = premiseForFixture(fixture, input.contentHash);
    const payload = {
      ...natural,
      status: 'COMPLETE' as const,
      bodyClassCandidates: ['ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL'],
      surfaceMediumCandidates: ['DECLARED_ARTIFICIAL_SOLID_SURFACE'],
      layerStackCandidates: ['DECLARED_ARTIFICIAL_LAYER_STACK'],
      resolvedBodyClass: 'ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL',
      resolvedSurfaceMedium: 'DECLARED_ARTIFICIAL_SOLID_SURFACE',
      resolvedLayerStack: ['DECLARED_ARTIFICIAL_LAYER_STACK'],
      limitations: [] as readonly string[],
    };
    const { contentHash: _ignored, ...withoutHash } = payload;
    const artificial = {
      ...withoutHash,
      contentHash: hashCausalPayload('WorldWright/planetary-premise/v1', withoutHash),
    };
    validatePlanetaryPremise(artificial);
    const resolution = resolveInteriorState(input, artificial, context());
    expect(resolution.status).toBe('BLOCKED');
    expect(resolution.blockingReasons).toEqual(['ARTIFICIAL_INTERIOR_MODEL_NOT_IMPLEMENTED']);
    expect(resolution.interior).toBeUndefined();
  });

  it('rejects tampered premise lineage and hostile unowned resolution fields', () => {
    const fixture = fixtureSet.fixtures[0];
    const input = inputForFixture(fixture);
    const premise = premiseForFixture(fixture, input.contentHash);
    expect(() => resolveInteriorState(input, { ...premise, inputSnapshotHash: hashCausalPayload('WorldWright/tampered/v1', {}) }, context())).toThrow(/bound|hash|input/i);
    const resolution = resolveInteriorState(input, premise, context());
    expect(() => validateInteriorResolution({ ...resolution, terrain: [] })).toThrow(/unowned fields/);
  });

  it('does not special-case fixture identities and stays within frozen budgets', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/core/causalGeology/interiorResolver.ts'), 'utf8');
    for (const fixture of fixtureSet.fixtures) expect(source).not.toContain(fixture.fixtureId);
    const researchContext = context();
    const startHeap = process.memoryUsage().heapUsed;
    const start = performance.now();
    for (let repeat = 0; repeat < 4; repeat += 1) {
      for (const fixture of fixtureSet.fixtures) {
        const input = inputForFixture(fixture);
        const result = resolveInteriorState(input, premiseForFixture(fixture, input.contentHash), researchContext);
        expect(result.metrics.rheologyCandidateCount).toBeLessThanOrEqual(INTERIOR_RESOLVER_PERFORMANCE_BUDGET_V1.maxRheologyCandidates);
        expect(result.metrics.lithosphereCandidateCount).toBeLessThanOrEqual(INTERIOR_RESOLVER_PERFORMANCE_BUDGET_V1.maxLithosphereCandidates);
        expect(result.metrics.lidCandidateCount).toBeLessThanOrEqual(INTERIOR_RESOLVER_PERFORMANCE_BUDGET_V1.maxLidCandidates);
        expect(result.metrics.branchResolutionCount).toBeLessThanOrEqual(INTERIOR_RESOLVER_PERFORMANCE_BUDGET_V1.maxBranchResolutions);
        expect(result.metrics.serializedResultBytes).toBeLessThanOrEqual(INTERIOR_RESOLVER_PERFORMANCE_BUDGET_V1.maxSerializedResultBytes);
      }
    }
    const averageMilliseconds = (performance.now() - start) / (fixtureSet.fixtures.length * 4);
    const heapDelta = Math.max(0, process.memoryUsage().heapUsed - startHeap);
    expect(averageMilliseconds).toBeLessThan(INTERIOR_RESOLVER_PERFORMANCE_BUDGET_V1.maxAverageResolutionMilliseconds);
    expect(heapDelta).toBeLessThan(INTERIOR_RESOLVER_PERFORMANCE_BUDGET_V1.maxHeapDeltaBytes);
  });
});

function midpoint(range: { readonly min: number; readonly max: number }): number {
  return (range.min + range.max) / 2;
}

function readJson<T>(filename: string): T {
  return JSON.parse(readFileSync(resolve(root, filename), 'utf8')) as T;
}
