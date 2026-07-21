import { cloneAndDeepFreeze } from './immutable';
import type { GeologicSpineNodeFamily } from './types';

export const GEOLOGIC_SPINE_FIXTURE_KINDS = Object.freeze(['POSITIVE', 'THRESHOLD', 'HOLDOUT'] as const);

export type GeologicSpineFixtureKindV1 = (typeof GEOLOGIC_SPINE_FIXTURE_KINDS)[number];

export interface GeologicSpineResearchReviewV1 {
  readonly schemaVersion: 1;
  readonly bundleVersion: string;
  readonly status: 'GEOLOGIC_SPINE_RESEARCH_PACKAGE_REVIEWED';
  readonly reviewDate: string;
  readonly reviewer: string;
  readonly scope: string;
  readonly completeEligibleRuleIds: readonly string[];
  readonly partialOnlyRuleIds: readonly string[];
  readonly implementationAuthorized: boolean;
  readonly implementationAuthorizationDate?: string;
  readonly implementationAuthorizationBasis?: string;
}

export interface GeologicSpineFixtureExpectedV1 {
  readonly status: 'PARTIAL';
  readonly minimumNodeCount: number;
  readonly maximumNodeCount: number;
  readonly minimumEdgeCount: number;
  readonly maximumEdgeCount: number;
  readonly minimumEventCount: number;
  readonly maximumEventCount: number;
  readonly requiredFamilies: readonly GeologicSpineNodeFamily[];
  readonly allowedFamilies: readonly GeologicSpineNodeFamily[];
}

export interface GeologicSpineResearchFixtureV1 {
  readonly schemaVersion: 1;
  readonly fixtureId: string;
  readonly kind: GeologicSpineFixtureKindV1;
  readonly withheldFromCalibration: boolean;
  readonly regimeFixtureId: string;
  readonly expected: GeologicSpineFixtureExpectedV1;
}

export interface GeologicSpineFixtureSetV1 {
  readonly schemaVersion: 1;
  readonly fixtureSetVersion: 'W1_05_GEOLOGIC_SPINE_FIXTURES_V1';
  readonly fixtures: readonly GeologicSpineResearchFixtureV1[];
}

const NODE_FAMILIES: readonly GeologicSpineNodeFamily[] = Object.freeze([
  'ACCRETION_SYSTEM',
  'CONTINENTAL_KERNEL',
  'CONVERGENCE_SYSTEM',
  'OCEAN_BASIN',
  'PLUME_SYSTEM',
  'RIFT_SYSTEM',
  'TRANSFORM_SYSTEM',
]);
const FIXTURE_SET_KEYS = ['schemaVersion', 'fixtureSetVersion', 'fixtures'] as const;
const FIXTURE_KEYS = ['schemaVersion', 'fixtureId', 'kind', 'withheldFromCalibration', 'regimeFixtureId', 'expected'] as const;
const EXPECTED_KEYS = [
  'status',
  'minimumNodeCount',
  'maximumNodeCount',
  'minimumEdgeCount',
  'maximumEdgeCount',
  'minimumEventCount',
  'maximumEventCount',
  'requiredFamilies',
  'allowedFamilies',
] as const;

export function validateGeologicSpineFixtureSet(value: unknown): asserts value is GeologicSpineFixtureSetV1 {
  assertExactKeys(value, FIXTURE_SET_KEYS, 'Geologic-spine fixture set');
  const set = value as GeologicSpineFixtureSetV1;
  if (set.schemaVersion !== 1 || set.fixtureSetVersion !== 'W1_05_GEOLOGIC_SPINE_FIXTURES_V1') {
    throw new Error('Unsupported geologic-spine fixture set.');
  }
  if (!Array.isArray(set.fixtures) || set.fixtures.length < 6 || set.fixtures.length > 32) {
    throw new Error('Geologic-spine fixture count is invalid.');
  }
  const ids = new Set<string>();
  const regimeIds = new Set<string>();
  let holdoutCount = 0;
  let thresholdCount = 0;
  for (const fixture of set.fixtures) {
    assertExactKeys(fixture, FIXTURE_KEYS, 'Geologic-spine fixture');
    if (fixture.schemaVersion !== 1 || !isText(fixture.fixtureId) || !isText(fixture.regimeFixtureId) || !GEOLOGIC_SPINE_FIXTURE_KINDS.includes(fixture.kind)) {
      throw new Error('Geologic-spine fixture identity is invalid.');
    }
    if (ids.has(fixture.fixtureId)) throw new Error(`Duplicate geologic-spine fixture ${fixture.fixtureId}.`);
    if (regimeIds.has(fixture.regimeFixtureId)) throw new Error(`Duplicate geologic-spine regime fixture ${fixture.regimeFixtureId}.`);
    ids.add(fixture.fixtureId);
    regimeIds.add(fixture.regimeFixtureId);
    if (fixture.withheldFromCalibration !== (fixture.kind === 'HOLDOUT')) throw new Error(`Geologic-spine fixture ${fixture.fixtureId} has inconsistent holdout state.`);
    if (fixture.kind === 'HOLDOUT') holdoutCount += 1;
    if (fixture.kind === 'THRESHOLD') thresholdCount += 1;
    validateExpected(fixture.expected, fixture.fixtureId);
  }
  if (holdoutCount < 2) throw new Error('Geologic-spine fixture set requires at least two withheld holdouts.');
  if (thresholdCount < 1) throw new Error('Geologic-spine fixture set requires at least one threshold case.');
}

export function freezeGeologicSpineFixtureSet(value: GeologicSpineFixtureSetV1): GeologicSpineFixtureSetV1 {
  validateGeologicSpineFixtureSet(value);
  return cloneAndDeepFreeze(value);
}

function validateExpected(expected: GeologicSpineFixtureExpectedV1, fixtureId: string): void {
  assertExactKeys(expected, EXPECTED_KEYS, `Geologic-spine fixture ${fixtureId} expected result`);
  if (expected.status !== 'PARTIAL') throw new Error(`Geologic-spine fixture ${fixtureId} must preserve PARTIAL status.`);
  for (const [minimumKey, maximumKey, label] of [
    ['minimumNodeCount', 'maximumNodeCount', 'node'] as const,
    ['minimumEdgeCount', 'maximumEdgeCount', 'edge'] as const,
    ['minimumEventCount', 'maximumEventCount', 'event'] as const,
  ]) {
    const minimum = expected[minimumKey];
    const maximum = expected[maximumKey];
    if (!Number.isSafeInteger(minimum) || !Number.isSafeInteger(maximum) || minimum < 1 || maximum < minimum || maximum > 256) {
      throw new Error(`Geologic-spine fixture ${fixtureId} ${label}-count range is invalid.`);
    }
  }
  const allowed = canonicalFamilies(expected.allowedFamilies, `Geologic-spine fixture ${fixtureId} allowed families`, 1);
  const required = canonicalFamilies(expected.requiredFamilies, `Geologic-spine fixture ${fixtureId} required families`, 1);
  for (const family of required) if (!allowed.includes(family)) throw new Error(`Geologic-spine fixture ${fixtureId} required family ${family} is not allowed.`);
}

function canonicalFamilies(values: readonly GeologicSpineNodeFamily[], label: string, minimum: number): readonly GeologicSpineNodeFamily[] {
  if (!Array.isArray(values) || values.length < minimum || !values.every((value) => NODE_FAMILIES.includes(value))) throw new Error(`${label} are invalid.`);
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
  if (unknown.length || missing.length) throw new Error(`${label} has invalid fields; unknown=${unknown.join(',')}; missing=${missing.join(',')}.`);
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
