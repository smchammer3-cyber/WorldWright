import { cloneAndDeepFreeze } from './immutable';
import type { PremiseBodyClass, PremiseLayerStack, PremiseSurfaceMedium } from './premiseResearchContracts';

export const INTERIOR_RHEOLOGY_CANDIDATES = Object.freeze([
  'ICE_SHELL_TEMPERATURE_DEPENDENT',
  'MIXED_ROCK_ICE_RHEOLOGY',
  'PARTIALLY_MOLTEN_ROCKY',
  'TEMPERATURE_DEPENDENT_SOLID_STATE',
  'VISCOELASTIC_TIDAL',
  'VOLATILE_MODIFIED_RHEOLOGY',
] as const);

export const INTERIOR_LITHOSPHERE_BEHAVIOR_CANDIDATES = Object.freeze([
  'DEFORMABLE_OR_YIELDING_LID',
  'MAGMATICALLY_WEAKENED_LID',
  'RIGID_ICE_SHELL',
  'RIGID_SINGLE_LID',
  'TIDALLY_FRACTURED_SHELL',
] as const);

export const INTERIOR_LID_REGIME_CANDIDATES = Object.freeze([
  'EPISODIC_LID',
  'EPISODIC_SQUISHY_LID',
  'ICE_SHELL_EPISODIC_LID',
  'ICE_SHELL_STAGNANT_LID',
  'MOBILE_LID_HYPOTHESIS',
  'PLUTONIC_SQUISHY_LID',
  'SLUGGISH_LID',
  'STAGNANT_LID',
] as const);

export type InteriorRheologyCandidateV1 = (typeof INTERIOR_RHEOLOGY_CANDIDATES)[number];
export type InteriorLithosphereBehaviorCandidateV1 = (typeof INTERIOR_LITHOSPHERE_BEHAVIOR_CANDIDATES)[number];
export type InteriorLidRegimeCandidateV1 = (typeof INTERIOR_LID_REGIME_CANDIDATES)[number];
export type InteriorFixtureKindV1 = 'POSITIVE' | 'THRESHOLD' | 'HOLDOUT';

export const INTERIOR_FIXTURE_QUANTITY_IDS = Object.freeze([
  'inventory.water',
  'planet.density',
  'planet.radius',
  'thermal.age',
  'thermal.primordial-heat',
  'thermal.radiogenic-heat',
  'thermal.tidal-heating',
] as const);

export interface InteriorResearchReviewV1 {
  readonly schemaVersion: 1;
  readonly bundleVersion: string;
  readonly status: 'INTERIOR_RESEARCH_PACKAGE_REVIEWED';
  readonly reviewDate: string;
  readonly reviewer: string;
  readonly scope: string;
  readonly completeEligibleRuleIds: readonly string[];
  readonly partialOnlyRuleIds: readonly string[];
  readonly implementationAuthorized: boolean;
  readonly implementationAuthorizationDate?: string;
  readonly implementationAuthorizationBasis?: string;
}

export interface InteriorFixturePremiseV1 {
  readonly status: 'COMPLETE' | 'PARTIAL';
  readonly bodyClassCandidates: readonly PremiseBodyClass[];
  readonly surfaceMediumCandidates: readonly PremiseSurfaceMedium[];
  readonly layerStackCandidates: readonly PremiseLayerStack[];
}

export interface InteriorFixtureExpectedV1 {
  readonly status: 'PARTIAL';
  readonly requiredRheologyCandidates: readonly InteriorRheologyCandidateV1[];
  readonly requiredLidRegimeCandidates: readonly InteriorLidRegimeCandidateV1[];
  readonly thermalBudgetEnvelope: readonly [number, number];
  readonly convectionEnvelope: readonly [number, number];
  readonly meltEnvelope: readonly [number, number];
}

export interface InteriorResearchFixtureV1 {
  readonly schemaVersion: 1;
  readonly fixtureId: string;
  readonly kind: InteriorFixtureKindV1;
  readonly withheldFromCalibration: boolean;
  readonly premise: InteriorFixturePremiseV1;
  readonly quantities: Readonly<Record<(typeof INTERIOR_FIXTURE_QUANTITY_IDS)[number], number>>;
  readonly expected: InteriorFixtureExpectedV1;
}

export interface InteriorFixtureSetV1 {
  readonly schemaVersion: 1;
  readonly fixtureSetVersion: 'W1_03_INTERIOR_FIXTURES_V1';
  readonly fixtures: readonly InteriorResearchFixtureV1[];
}

const FIXTURE_SET_KEYS = ['schemaVersion', 'fixtureSetVersion', 'fixtures'] as const;
const FIXTURE_KEYS = ['schemaVersion', 'fixtureId', 'kind', 'withheldFromCalibration', 'premise', 'quantities', 'expected'] as const;
const PREMISE_KEYS = ['status', 'bodyClassCandidates', 'surfaceMediumCandidates', 'layerStackCandidates'] as const;
const EXPECTED_KEYS = ['status', 'requiredRheologyCandidates', 'requiredLidRegimeCandidates', 'thermalBudgetEnvelope', 'convectionEnvelope', 'meltEnvelope'] as const;

export function validateInteriorFixtureSet(value: unknown): asserts value is InteriorFixtureSetV1 {
  assertExactKeys(value, FIXTURE_SET_KEYS, 'Interior fixture set');
  const set = value as InteriorFixtureSetV1;
  if (set.schemaVersion !== 1 || set.fixtureSetVersion !== 'W1_03_INTERIOR_FIXTURES_V1') throw new Error('Unsupported interior fixture set.');
  if (!Array.isArray(set.fixtures) || set.fixtures.length < 5 || set.fixtures.length > 32) throw new Error('Interior fixture count is invalid.');
  const ids = new Set<string>();
  let holdoutCount = 0;
  for (const fixture of set.fixtures) {
    assertExactKeys(fixture, FIXTURE_KEYS, 'Interior fixture');
    if (fixture.schemaVersion !== 1 || !isText(fixture.fixtureId) || !['POSITIVE', 'THRESHOLD', 'HOLDOUT'].includes(fixture.kind)) throw new Error('Interior fixture identity is invalid.');
    if (ids.has(fixture.fixtureId)) throw new Error(`Duplicate interior fixture ${fixture.fixtureId}.`);
    ids.add(fixture.fixtureId);
    if (fixture.withheldFromCalibration !== (fixture.kind === 'HOLDOUT')) throw new Error(`Interior fixture ${fixture.fixtureId} has inconsistent holdout state.`);
    if (fixture.kind === 'HOLDOUT') holdoutCount += 1;
    validateFixturePremise(fixture.premise, fixture.fixtureId);
    validateFixtureQuantities(fixture.quantities, fixture.fixtureId);
    validateFixtureExpected(fixture.expected, fixture.fixtureId);
  }
  if (holdoutCount < 2) throw new Error('Interior fixture set requires at least two withheld holdouts.');
}

export function freezeInteriorFixtureSet(value: InteriorFixtureSetV1): InteriorFixtureSetV1 {
  validateInteriorFixtureSet(value);
  return cloneAndDeepFreeze(value);
}

function validateFixturePremise(premise: InteriorFixturePremiseV1, fixtureId: string): void {
  assertExactKeys(premise, PREMISE_KEYS, `Interior fixture ${fixtureId} premise`);
  if (!['COMPLETE', 'PARTIAL'].includes(premise.status)) throw new Error(`Interior fixture ${fixtureId} premise status is invalid.`);
  canonicalText(premise.bodyClassCandidates, `Interior fixture ${fixtureId} body candidates`, 1);
  canonicalText(premise.surfaceMediumCandidates, `Interior fixture ${fixtureId} surface candidates`, 1);
  canonicalText(premise.layerStackCandidates, `Interior fixture ${fixtureId} layer candidates`, 1);
}

function validateFixtureQuantities(quantities: InteriorResearchFixtureV1['quantities'], fixtureId: string): void {
  assertExactKeys(quantities, INTERIOR_FIXTURE_QUANTITY_IDS, `Interior fixture ${fixtureId} quantities`);
  for (const id of INTERIOR_FIXTURE_QUANTITY_IDS) {
    const value = quantities[id];
    if (!Number.isFinite(value) || Object.is(value, -0) || value < 0) throw new Error(`Interior fixture ${fixtureId} quantity ${id} is invalid.`);
    if (id.startsWith('thermal.') && id !== 'thermal.age' && value > 1) throw new Error(`Interior fixture ${fixtureId} normalized heat ${id} exceeds one.`);
  }
}

function validateFixtureExpected(expected: InteriorFixtureExpectedV1, fixtureId: string): void {
  assertExactKeys(expected, EXPECTED_KEYS, `Interior fixture ${fixtureId} expected result`);
  if (expected.status !== 'PARTIAL') throw new Error(`Interior fixture ${fixtureId} must preserve provisional PARTIAL status.`);
  const rheology = canonicalText(expected.requiredRheologyCandidates, `Interior fixture ${fixtureId} required rheology`, 1);
  for (const candidate of rheology) if (!INTERIOR_RHEOLOGY_CANDIDATES.includes(candidate as InteriorRheologyCandidateV1)) throw new Error(`Interior fixture ${fixtureId} has unsupported rheology ${candidate}.`);
  const lids = canonicalText(expected.requiredLidRegimeCandidates, `Interior fixture ${fixtureId} required lids`, 1);
  for (const candidate of lids) if (!INTERIOR_LID_REGIME_CANDIDATES.includes(candidate as InteriorLidRegimeCandidateV1)) throw new Error(`Interior fixture ${fixtureId} has unsupported lid regime ${candidate}.`);
  validateEnvelope(expected.thermalBudgetEnvelope, `${fixtureId} thermal budget`);
  validateEnvelope(expected.convectionEnvelope, `${fixtureId} convection`);
  validateEnvelope(expected.meltEnvelope, `${fixtureId} melt`);
}

function validateEnvelope(value: readonly [number, number], label: string): void {
  if (!Array.isArray(value) || value.length !== 2 || !Number.isFinite(value[0]) || !Number.isFinite(value[1]) || value[0] < 0 || value[1] > 1 || value[0] > value[1]) throw new Error(`Interior fixture ${label} envelope is invalid.`);
}

function canonicalText(values: readonly string[], label: string, minimum = 0): readonly string[] {
  if (!Array.isArray(values) || values.length < minimum || !values.every(isText)) throw new Error(`${label} are invalid.`);
  if (new Set(values).size !== values.length) throw new Error(`${label} contain duplicates.`);
  const sorted = [...values].sort(compareStableText);
  if (!values.every((value, index) => value === sorted[index])) throw new Error(`${label} must be canonically ordered.`);
  return values;
}

function assertExactKeys(value: unknown, allowed: readonly string[], label: string): void {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
  const unknown = Object.keys(value).filter((key) => !allowed.includes(key)).sort(compareStableText);
  const missing = allowed.filter((key) => !(key in value));
  if (unknown.length || missing.length) throw new Error(`${label} has invalid fields; unknown=${unknown.join(',')}; missing=${missing.join(',')}.`);
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
