import { cloneAndDeepFreeze } from './immutable';
import {
  INTERIOR_LID_REGIME_CANDIDATES,
  type InteriorLidRegimeCandidateV1,
} from './interiorResearchContracts';
import type { PremiseBodyClass } from './premiseResearchContracts';

export const REGIME_HISTORY_FAMILIES = Object.freeze([
  'EPISODIC_LID',
  'EPISODIC_SQUISHY_LID',
  'HEAT_PIPE_LID',
  'HOT_STAGNANT_LID',
  'ICE_SHELL_EPISODIC_LID',
  'ICE_SHELL_STAGNANT_LID',
  'MOBILE_LID_HYPOTHESIS',
  'PLUTONIC_SQUISHY_LID',
  'SLUGGISH_LID',
  'STAGNANT_LID',
] as const);

export const REGIME_HISTORY_TRANSITION_FAMILIES = Object.freeze([
  'LITHOSPHERE_DAMAGE_ACCUMULATION',
  'MAGMATIC_RHEOLOGY_REORGANIZATION',
  'RHEOLOGIC_HYSTERESIS',
  'SECULAR_COOLING',
  'SECULAR_COOLING_AND_WEAK_ZONE_MEMORY',
  'SHELL_THERMAL_RELAXATION',
  'TIDAL_FORCING_VARIATION',
  'TIDAL_THERMAL_DESTABILIZATION',
  'VOLCANIC_HEAT_TRANSPORT_DECLINE',
] as const);

export const REGIME_HISTORY_TEMPLATE_IDS = Object.freeze([
  'ICE_SHELL_EPISODIC_CYCLE',
  'ICE_SHELL_STAGNANT_ONLY',
  'MIXED_SOLID_EPISODIC',
  'ROCKY_HOT_EPISODIC_MOBILE',
  'ROCKY_HOT_EPISODIC_SLUGGISH',
  'ROCKY_MAGMATIC_SQUISHY',
  'ROCKY_SINGLE_STAGNANT',
  'ROCKY_TIDAL_EPISODIC',
  'VOLATILE_SOLID_EPISODIC',
] as const);

export type RegimeHistoryFamilyV1 = (typeof REGIME_HISTORY_FAMILIES)[number];
export type RegimeHistoryTransitionFamilyV1 = (typeof REGIME_HISTORY_TRANSITION_FAMILIES)[number];
export type RegimeHistoryTemplateIdV1 = (typeof REGIME_HISTORY_TEMPLATE_IDS)[number];
export type RegimeHistoryFixtureKindV1 = 'POSITIVE' | 'THRESHOLD' | 'HOLDOUT';

export interface RegimeHistoryResearchReviewV1 {
  readonly schemaVersion: 1;
  readonly bundleVersion: string;
  readonly status: 'REGIME_HISTORY_RESEARCH_PACKAGE_REVIEWED';
  readonly reviewDate: string;
  readonly reviewer: string;
  readonly scope: string;
  readonly completeEligibleRuleIds: readonly string[];
  readonly partialOnlyRuleIds: readonly string[];
  readonly implementationAuthorized: boolean;
  readonly implementationAuthorizationDate?: string;
  readonly implementationAuthorizationBasis?: string;
}

export interface RegimeHistoryFixtureHeatFractionsV1 {
  readonly primordial: number;
  readonly radiogenic: number;
  readonly tidal: number;
}

export interface RegimeHistoryFixtureInteriorV1 {
  readonly thermalBudgetCenter: number;
  readonly convectionCenter: number;
  readonly meltCenter: number;
  readonly riftCenter: number;
  readonly hotspotCenter: number;
  readonly heatSourceFractions: RegimeHistoryFixtureHeatFractionsV1;
  readonly lidRegimeCandidates: readonly InteriorLidRegimeCandidateV1[];
  readonly resolvedLidRegime: InteriorLidRegimeCandidateV1;
}

export interface RegimeHistoryFixtureExpectedV1 {
  readonly status: 'PARTIAL';
  readonly epochCountRange: readonly [number, number];
  readonly allowedRegimeFamilies: readonly RegimeHistoryFamilyV1[];
  readonly requiredAnyRegimeFamilies: readonly RegimeHistoryFamilyV1[];
  readonly allowedTransitionFamilies: readonly RegimeHistoryTransitionFamilyV1[];
}

export interface RegimeHistoryResearchFixtureV1 {
  readonly schemaVersion: 1;
  readonly fixtureId: string;
  readonly kind: RegimeHistoryFixtureKindV1;
  readonly withheldFromCalibration: boolean;
  readonly rootSeed: string;
  readonly ageGyr: number;
  readonly waterInventory: number;
  readonly premiseBodyClassCandidates: readonly PremiseBodyClass[];
  readonly interior: RegimeHistoryFixtureInteriorV1;
  readonly expected: RegimeHistoryFixtureExpectedV1;
}

export interface RegimeHistoryFixtureSetV1 {
  readonly schemaVersion: 1;
  readonly fixtureSetVersion: 'W1_04_REGIME_HISTORY_FIXTURES_V1';
  readonly fixtures: readonly RegimeHistoryResearchFixtureV1[];
}

const FIXTURE_SET_KEYS = ['schemaVersion', 'fixtureSetVersion', 'fixtures'] as const;
const FIXTURE_KEYS = [
  'schemaVersion',
  'fixtureId',
  'kind',
  'withheldFromCalibration',
  'rootSeed',
  'ageGyr',
  'waterInventory',
  'premiseBodyClassCandidates',
  'interior',
  'expected',
] as const;
const INTERIOR_KEYS = [
  'thermalBudgetCenter',
  'convectionCenter',
  'meltCenter',
  'riftCenter',
  'hotspotCenter',
  'heatSourceFractions',
  'lidRegimeCandidates',
  'resolvedLidRegime',
] as const;
const HEAT_KEYS = ['primordial', 'radiogenic', 'tidal'] as const;
const EXPECTED_KEYS = [
  'status',
  'epochCountRange',
  'allowedRegimeFamilies',
  'requiredAnyRegimeFamilies',
  'allowedTransitionFamilies',
] as const;

export function validateRegimeHistoryFixtureSet(value: unknown): asserts value is RegimeHistoryFixtureSetV1 {
  assertExactKeys(value, FIXTURE_SET_KEYS, 'Regime-history fixture set');
  const set = value as RegimeHistoryFixtureSetV1;
  if (set.schemaVersion !== 1 || set.fixtureSetVersion !== 'W1_04_REGIME_HISTORY_FIXTURES_V1') {
    throw new Error('Unsupported regime-history fixture set.');
  }
  if (!Array.isArray(set.fixtures) || set.fixtures.length < 5 || set.fixtures.length > 32) {
    throw new Error('Regime-history fixture count is invalid.');
  }
  const ids = new Set<string>();
  let holdoutCount = 0;
  for (const fixture of set.fixtures) {
    assertExactKeys(fixture, FIXTURE_KEYS, 'Regime-history fixture');
    if (fixture.schemaVersion !== 1 || !isText(fixture.fixtureId) || !['POSITIVE', 'THRESHOLD', 'HOLDOUT'].includes(fixture.kind)) {
      throw new Error('Regime-history fixture identity is invalid.');
    }
    if (ids.has(fixture.fixtureId)) throw new Error(`Duplicate regime-history fixture ${fixture.fixtureId}.`);
    ids.add(fixture.fixtureId);
    if (fixture.withheldFromCalibration !== (fixture.kind === 'HOLDOUT')) {
      throw new Error(`Regime-history fixture ${fixture.fixtureId} has inconsistent holdout state.`);
    }
    if (fixture.kind === 'HOLDOUT') holdoutCount += 1;
    if (!isText(fixture.rootSeed) || !isFiniteWithin(fixture.ageGyr, 0.001, 20) || !Number.isFinite(fixture.waterInventory) || fixture.waterInventory < 0) {
      throw new Error(`Regime-history fixture ${fixture.fixtureId} has invalid scalar inputs.`);
    }
    canonicalText(fixture.premiseBodyClassCandidates, `Regime-history fixture ${fixture.fixtureId} body classes`, 1);
    validateFixtureInterior(fixture.interior, fixture.fixtureId);
    validateFixtureExpected(fixture.expected, fixture.fixtureId);
  }
  if (holdoutCount < 2) throw new Error('Regime-history fixture set requires at least two withheld holdouts.');
}

export function freezeRegimeHistoryFixtureSet(value: RegimeHistoryFixtureSetV1): RegimeHistoryFixtureSetV1 {
  validateRegimeHistoryFixtureSet(value);
  return cloneAndDeepFreeze(value);
}

function validateFixtureInterior(interior: RegimeHistoryFixtureInteriorV1, fixtureId: string): void {
  assertExactKeys(interior, INTERIOR_KEYS, `Regime-history fixture ${fixtureId} interior`);
  for (const [label, value] of [
    ['thermal budget', interior.thermalBudgetCenter],
    ['convection', interior.convectionCenter],
    ['melt', interior.meltCenter],
    ['rift', interior.riftCenter],
    ['hotspot', interior.hotspotCenter],
  ] as const) {
    if (!isFiniteWithin(value, 0, 1)) throw new Error(`Regime-history fixture ${fixtureId} ${label} center is invalid.`);
  }
  assertExactKeys(interior.heatSourceFractions, HEAT_KEYS, `Regime-history fixture ${fixtureId} heat fractions`);
  const fractions = HEAT_KEYS.map((key) => interior.heatSourceFractions[key]);
  if (fractions.some((value) => !isFiniteWithin(value, 0, 1)) || Math.abs(fractions.reduce((sum, value) => sum + value, 0) - 1) > 1e-9) {
    throw new Error(`Regime-history fixture ${fixtureId} heat fractions are invalid.`);
  }
  const lids = canonicalText(interior.lidRegimeCandidates, `Regime-history fixture ${fixtureId} lid candidates`, 1);
  for (const lid of lids) {
    if (!INTERIOR_LID_REGIME_CANDIDATES.includes(lid as InteriorLidRegimeCandidateV1)) {
      throw new Error(`Regime-history fixture ${fixtureId} has unsupported lid candidate ${lid}.`);
    }
  }
  if (!INTERIOR_LID_REGIME_CANDIDATES.includes(interior.resolvedLidRegime) || !interior.lidRegimeCandidates.includes(interior.resolvedLidRegime)) {
    throw new Error(`Regime-history fixture ${fixtureId} resolved lid is invalid.`);
  }
}

function validateFixtureExpected(expected: RegimeHistoryFixtureExpectedV1, fixtureId: string): void {
  assertExactKeys(expected, EXPECTED_KEYS, `Regime-history fixture ${fixtureId} expected result`);
  if (expected.status !== 'PARTIAL') throw new Error(`Regime-history fixture ${fixtureId} must preserve PARTIAL status.`);
  const [minimum, maximum] = expected.epochCountRange;
  if (!Array.isArray(expected.epochCountRange) || expected.epochCountRange.length !== 2
    || !Number.isSafeInteger(minimum) || !Number.isSafeInteger(maximum)
    || minimum < 1 || maximum < minimum || maximum > 8) {
    throw new Error(`Regime-history fixture ${fixtureId} epoch-count range is invalid.`);
  }
  const allowed = canonicalText(expected.allowedRegimeFamilies, `Regime-history fixture ${fixtureId} allowed regimes`, 1);
  const required = canonicalText(expected.requiredAnyRegimeFamilies, `Regime-history fixture ${fixtureId} required regimes`, 1);
  const transitions = canonicalText(expected.allowedTransitionFamilies, `Regime-history fixture ${fixtureId} allowed transitions`);
  for (const regime of allowed) if (!REGIME_HISTORY_FAMILIES.includes(regime as RegimeHistoryFamilyV1)) throw new Error(`Regime-history fixture ${fixtureId} has unsupported regime ${regime}.`);
  for (const regime of required) {
    if (!REGIME_HISTORY_FAMILIES.includes(regime as RegimeHistoryFamilyV1) || !allowed.includes(regime as RegimeHistoryFamilyV1)) {
      throw new Error(`Regime-history fixture ${fixtureId} required regime ${regime} is not allowed.`);
    }
  }
  for (const transition of transitions) {
    if (!REGIME_HISTORY_TRANSITION_FAMILIES.includes(transition as RegimeHistoryTransitionFamilyV1)) {
      throw new Error(`Regime-history fixture ${fixtureId} has unsupported transition ${transition}.`);
    }
  }
  if (maximum === 1 && transitions.length !== 0) throw new Error(`Regime-history fixture ${fixtureId} single-epoch case cannot allow transitions.`);
  if (minimum > 1 && transitions.length === 0) throw new Error(`Regime-history fixture ${fixtureId} multi-epoch case requires transition coverage.`);
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
  const keys = Object.keys(value);
  const unknown = keys.filter((key) => !allowed.includes(key)).sort(compareStableText);
  const missing = allowed.filter((key) => !(key in value));
  if (unknown.length || missing.length) {
    throw new Error(`${label} has invalid fields; unknown=${unknown.join(',')}; missing=${missing.join(',')}.`);
  }
}

function isFiniteWithin(value: number, minimum: number, maximum: number): boolean {
  return Number.isFinite(value) && !Object.is(value, -0) && value >= minimum && value <= maximum;
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
