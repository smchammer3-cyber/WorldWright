import type { CausalGeologyInputId } from './types';

export const PREMISE_BODY_CLASSES = Object.freeze([
  'ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL',
  'ICE_SHELL_OCEAN_BODY',
  'ROCK_ICE_MIXED_SOLID_BODY',
  'ROCKY_DWARF_OR_SMALL_BODY',
  'ROCKY_SUPER_EARTH',
  'ROCKY_TERRESTRIAL',
  'VOLATILE_PRESSURE_SOLID_BODY',
] as const);

export const PREMISE_SURFACE_MEDIA = Object.freeze([
  'DECLARED_ARTIFICIAL_SOLID_SURFACE',
  'ICE_OVER_ROCK_SURFACE',
  'ICE_SHELL_SURFACE',
  'ROCK_OR_REGOLITH_SURFACE',
  'SEDIMENT_BEARING_SOLID_SURFACE',
  'VOLATILE_MODIFIED_SOLID_SURFACE',
] as const);

export const PREMISE_LAYER_STACKS = Object.freeze([
  'DECLARED_ARTIFICIAL_LAYER_STACK',
  'DIFFERENTIATED_METAL_SILICATE',
  'DIFFERENTIATED_ROCK_ICE',
  'ICE_SHELL_LIQUID_LAYER_ROCKY_INTERIOR',
  'PARTIALLY_DIFFERENTIATED_ROCKY',
  'UNDIFFERENTIATED_ROCK_ICE_MIXTURE',
  'VOLATILE_PRESSURE_OVER_SOLID_INTERIOR',
] as const);

export const PREMISE_BLOCKED_CATEGORY_IDS = Object.freeze([
  'BROWN_DWARF',
  'FLUID_ONLY_NO_COHERENT_SHELL',
  'GAS_GIANT_NO_COHERENT_SHELL',
  'STAR_OR_STELLAR_REMNANT',
] as const);

export type PremiseBodyClass = (typeof PREMISE_BODY_CLASSES)[number];
export type PremiseSurfaceMedium = (typeof PREMISE_SURFACE_MEDIA)[number];
export type PremiseLayerStack = (typeof PREMISE_LAYER_STACKS)[number];
export type PremiseBlockedCategoryId = (typeof PREMISE_BLOCKED_CATEGORY_IDS)[number];
export type PremiseCompatibilityPolicy = 'NATURAL_REVIEWED' | 'NATURAL_PARTIAL_CAPABLE' | 'EXPLICIT_EXCEPTION_ONLY';
export type PremiseFixtureKind = 'POSITIVE' | 'NEGATIVE' | 'THRESHOLD' | 'EXCEPTION' | 'CONTRADICTION' | 'MISSING_EVIDENCE' | 'HOLDOUT';
export type PremiseFixtureStatus = 'COMPLETE' | 'PARTIAL' | 'BLOCKED';

export interface PremiseCompatibilityRowV1 {
  readonly schemaVersion: 1;
  readonly bodyClass: PremiseBodyClass;
  readonly policy: PremiseCompatibilityPolicy;
  readonly allowedSurfaceMedia: readonly PremiseSurfaceMedium[];
  readonly allowedLayerStacks: readonly PremiseLayerStack[];
  readonly requiredRuleIds: readonly string[];
  readonly limitations: readonly string[];
}

export interface PremiseBlockedCategoryV1 {
  readonly schemaVersion: 1;
  readonly categoryId: PremiseBlockedCategoryId;
  readonly blockingCode: string;
  readonly requiredRuleIds: readonly string[];
  readonly limitations: readonly string[];
}

export interface PremiseCompatibilityMatrixV1 {
  readonly schemaVersion: 1;
  readonly matrixVersion: 'W1_02B_PREMISE_COMPATIBILITY_V1';
  readonly rows: readonly PremiseCompatibilityRowV1[];
  readonly blockedCategories: readonly PremiseBlockedCategoryV1[];
}

export interface PremiseFixtureQuantityV1 {
  readonly schemaVersion: 1;
  readonly inputId: CausalGeologyInputId;
  readonly value: number;
  readonly unit: string;
  readonly scaleId: string;
}

export interface PremiseFixtureInputV1 {
  readonly schemaVersion: 1;
  readonly quantities: readonly PremiseFixtureQuantityV1[];
  readonly exceptionPermissions: readonly string[];
  readonly scenarioTags: readonly string[];
}

export interface PremiseFixtureExpectationV1 {
  readonly schemaVersion: 1;
  readonly status: PremiseFixtureStatus;
  readonly bodyClassCandidates: readonly PremiseBodyClass[];
  readonly surfaceMediumCandidates: readonly PremiseSurfaceMedium[];
  readonly layerStackCandidates: readonly PremiseLayerStack[];
  readonly blockingCodes: readonly string[];
  readonly requiredRuleIds: readonly string[];
}

export interface PremiseResearchFixtureV1 {
  readonly schemaVersion: 1;
  readonly fixtureId: string;
  readonly kind: PremiseFixtureKind;
  readonly withheldFromRuleAuthoring: boolean;
  readonly input: PremiseFixtureInputV1;
  readonly expected: PremiseFixtureExpectationV1;
  readonly notes: readonly string[];
}

export interface PremiseFixtureSetV1 {
  readonly schemaVersion: 1;
  readonly fixtureSetVersion: 'W1_02B_PREMISE_FIXTURES_V1';
  readonly fixtures: readonly PremiseResearchFixtureV1[];
}

export const PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1 = Object.freeze({
  maxResearchSources: 16,
  maxClaimRules: 32,
  maxCompatibilityRows: PREMISE_BODY_CLASSES.length,
  maxBlockedCategories: PREMISE_BLOCKED_CATEGORY_IDS.length,
  maxFixtures: 64,
  maxQuantitiesPerFixture: 16,
  maxCandidateBodyClasses: PREMISE_BODY_CLASSES.length,
  maxCandidateSurfaceMedia: PREMISE_SURFACE_MEDIA.length,
  maxCandidateLayerStacks: PREMISE_LAYER_STACKS.length,
  maxRuleEvaluationsPerFixture: 64,
  maxSerializedResearchBytes: 512 * 1024,
  maxValidationMilliseconds: 1_000,
  maxHeapDeltaBytes: 128 * 1024 * 1024,
});

const MATRIX_KEYS = ['schemaVersion', 'matrixVersion', 'rows', 'blockedCategories'] as const;
const ROW_KEYS = ['schemaVersion', 'bodyClass', 'policy', 'allowedSurfaceMedia', 'allowedLayerStacks', 'requiredRuleIds', 'limitations'] as const;
const BLOCKED_KEYS = ['schemaVersion', 'categoryId', 'blockingCode', 'requiredRuleIds', 'limitations'] as const;
const FIXTURE_SET_KEYS = ['schemaVersion', 'fixtureSetVersion', 'fixtures'] as const;
const FIXTURE_KEYS = ['schemaVersion', 'fixtureId', 'kind', 'withheldFromRuleAuthoring', 'input', 'expected', 'notes'] as const;
const INPUT_KEYS = ['schemaVersion', 'quantities', 'exceptionPermissions', 'scenarioTags'] as const;
const QUANTITY_KEYS = ['schemaVersion', 'inputId', 'value', 'unit', 'scaleId'] as const;
const EXPECTATION_KEYS = ['schemaVersion', 'status', 'bodyClassCandidates', 'surfaceMediumCandidates', 'layerStackCandidates', 'blockingCodes', 'requiredRuleIds'] as const;

const NATURAL_BODY_CLASSES = PREMISE_BODY_CLASSES.filter((value) => value !== 'ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL');
const ALLOWED_EXCEPTION_PERMISSIONS = ['ALLOW_ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL'] as const;
const FIXTURE_KINDS: readonly PremiseFixtureKind[] = ['CONTRADICTION', 'EXCEPTION', 'HOLDOUT', 'MISSING_EVIDENCE', 'NEGATIVE', 'POSITIVE', 'THRESHOLD'];
const FIXTURE_STATUSES: readonly PremiseFixtureStatus[] = ['BLOCKED', 'COMPLETE', 'PARTIAL'];

export function validatePremiseCompatibilityMatrix(value: unknown, knownRuleIds: ReadonlySet<string>): asserts value is PremiseCompatibilityMatrixV1 {
  assertExactKeys(value, MATRIX_KEYS, 'Premise compatibility matrix');
  const matrix = value as Partial<PremiseCompatibilityMatrixV1>;
  if (matrix.schemaVersion !== 1 || matrix.matrixVersion !== 'W1_02B_PREMISE_COMPATIBILITY_V1') throw new Error('Unsupported premise compatibility matrix.');
  if (!Array.isArray(matrix.rows) || matrix.rows.length !== PREMISE_BODY_CLASSES.length || matrix.rows.length > PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1.maxCompatibilityRows) throw new Error('Premise compatibility rows are incomplete.');
  const bodyClasses: string[] = [];
  for (const row of matrix.rows) {
    assertExactKeys(row, ROW_KEYS, 'Premise compatibility row');
    if (row.schemaVersion !== 1 || !PREMISE_BODY_CLASSES.includes(row.bodyClass as PremiseBodyClass)) throw new Error('Premise compatibility body class is invalid.');
    if (!['NATURAL_REVIEWED', 'NATURAL_PARTIAL_CAPABLE', 'EXPLICIT_EXCEPTION_ONLY'].includes(row.policy)) throw new Error(`Premise compatibility policy is invalid for ${row.bodyClass}.`);
    validateVocabularyArray(row.allowedSurfaceMedia, PREMISE_SURFACE_MEDIA, `Surface media for ${row.bodyClass}`);
    validateVocabularyArray(row.allowedLayerStacks, PREMISE_LAYER_STACKS, `Layer stacks for ${row.bodyClass}`);
    validateRuleIds(row.requiredRuleIds, knownRuleIds, `Rule IDs for ${row.bodyClass}`);
    validateSortedUniqueText(row.limitations, `Limitations for ${row.bodyClass}`);
    if (row.bodyClass === 'ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL') {
      if (row.policy !== 'EXPLICIT_EXCEPTION_ONLY') throw new Error('Artificial premise row must be exception-only.');
      if (!arraysEqual(row.allowedSurfaceMedia, ['DECLARED_ARTIFICIAL_SOLID_SURFACE']) || !arraysEqual(row.allowedLayerStacks, ['DECLARED_ARTIFICIAL_LAYER_STACK'])) throw new Error('Artificial premise row may use only declared artificial vocabulary.');
    } else {
      if (row.policy === 'EXPLICIT_EXCEPTION_ONLY') throw new Error(`Natural premise row ${row.bodyClass} cannot be exception-only.`);
      if (row.allowedSurfaceMedia.includes('DECLARED_ARTIFICIAL_SOLID_SURFACE') || row.allowedLayerStacks.includes('DECLARED_ARTIFICIAL_LAYER_STACK')) throw new Error(`Natural premise row ${row.bodyClass} contains artificial vocabulary.`);
    }
    bodyClasses.push(row.bodyClass);
  }
  if (!arraysEqual(bodyClasses, [...PREMISE_BODY_CLASSES])) throw new Error('Premise compatibility rows must cover the canonical body-class order exactly.');
  if (!Array.isArray(matrix.blockedCategories) || matrix.blockedCategories.length !== PREMISE_BLOCKED_CATEGORY_IDS.length || matrix.blockedCategories.length > PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1.maxBlockedCategories) throw new Error('Premise blocked-category coverage is incomplete.');
  const blockedIds: string[] = [];
  for (const blocked of matrix.blockedCategories) {
    assertExactKeys(blocked, BLOCKED_KEYS, 'Premise blocked category');
    if (blocked.schemaVersion !== 1 || !PREMISE_BLOCKED_CATEGORY_IDS.includes(blocked.categoryId as PremiseBlockedCategoryId) || !isNonEmptyText(blocked.blockingCode)) throw new Error('Premise blocked category is invalid.');
    validateRuleIds(blocked.requiredRuleIds, knownRuleIds, `Rule IDs for ${blocked.categoryId}`);
    validateSortedUniqueText(blocked.limitations, `Limitations for ${blocked.categoryId}`);
    blockedIds.push(blocked.categoryId);
  }
  if (!arraysEqual(blockedIds, [...PREMISE_BLOCKED_CATEGORY_IDS])) throw new Error('Premise blocked categories must use canonical order.');
}

export function validatePremiseFixtureSet(value: unknown, knownRuleIds: ReadonlySet<string>): asserts value is PremiseFixtureSetV1 {
  assertExactKeys(value, FIXTURE_SET_KEYS, 'Premise fixture set');
  const fixtureSet = value as Partial<PremiseFixtureSetV1>;
  if (fixtureSet.schemaVersion !== 1 || fixtureSet.fixtureSetVersion !== 'W1_02B_PREMISE_FIXTURES_V1') throw new Error('Unsupported premise fixture set.');
  if (!Array.isArray(fixtureSet.fixtures) || fixtureSet.fixtures.length === 0 || fixtureSet.fixtures.length > PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1.maxFixtures) throw new Error('Premise fixture count is invalid.');
  const ids: string[] = [];
  const kinds = new Set<PremiseFixtureKind>();
  const holdoutCoverage = new Set<PremiseBodyClass>();
  for (const fixture of fixtureSet.fixtures) {
    validatePremiseFixture(fixture, knownRuleIds);
    ids.push(fixture.fixtureId);
    kinds.add(fixture.kind);
    if (fixture.kind === 'HOLDOUT') {
      if (!fixture.withheldFromRuleAuthoring) throw new Error(`Holdout fixture ${fixture.fixtureId} must be withheld from rule authoring.`);
      for (const bodyClass of fixture.expected.bodyClassCandidates) if (bodyClass !== 'ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL') holdoutCoverage.add(bodyClass);
    } else if (fixture.withheldFromRuleAuthoring) {
      throw new Error(`Only holdout fixtures may be withheld: ${fixture.fixtureId}`);
    }
  }
  if (new Set(ids).size !== ids.length || !arraysEqual(ids, [...ids].sort(compareStableText))) throw new Error('Premise fixture IDs must be canonical and unique.');
  for (const kind of FIXTURE_KINDS) if (!kinds.has(kind)) throw new Error(`Premise fixture set is missing kind ${kind}.`);
  for (const bodyClass of NATURAL_BODY_CLASSES) if (!holdoutCoverage.has(bodyClass)) throw new Error(`Premise holdouts do not cover ${bodyClass}.`);
}

export function validatePremiseFixture(value: unknown, knownRuleIds: ReadonlySet<string>): asserts value is PremiseResearchFixtureV1 {
  assertExactKeys(value, FIXTURE_KEYS, 'Premise fixture');
  const fixture = value as Partial<PremiseResearchFixtureV1>;
  if (fixture.schemaVersion !== 1 || !isNonEmptyText(fixture.fixtureId) || !FIXTURE_KINDS.includes(fixture.kind as PremiseFixtureKind) || typeof fixture.withheldFromRuleAuthoring !== 'boolean') throw new Error('Premise fixture identity is invalid.');
  assertExactKeys(fixture.input, INPUT_KEYS, `Premise fixture ${fixture.fixtureId} input`);
  if (fixture.input.schemaVersion !== 1 || !Array.isArray(fixture.input.quantities) || fixture.input.quantities.length > PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1.maxQuantitiesPerFixture) throw new Error(`Premise fixture ${fixture.fixtureId} quantities are invalid.`);
  const inputIds: string[] = [];
  for (const quantity of fixture.input.quantities) {
    assertExactKeys(quantity, QUANTITY_KEYS, `Premise fixture ${fixture.fixtureId} quantity`);
    if (quantity.schemaVersion !== 1 || !isNonEmptyText(quantity.inputId) || !Number.isFinite(quantity.value) || !isNonEmptyText(quantity.unit) || !isNonEmptyText(quantity.scaleId)) throw new Error(`Premise fixture ${fixture.fixtureId} quantity is invalid.`);
    inputIds.push(quantity.inputId);
  }
  if (new Set(inputIds).size !== inputIds.length || !arraysEqual(inputIds, [...inputIds].sort(compareStableText))) throw new Error(`Premise fixture ${fixture.fixtureId} quantities must be canonical and unique.`);
  validateVocabularyArray(fixture.input.exceptionPermissions, ALLOWED_EXCEPTION_PERMISSIONS, `Exception permissions for ${fixture.fixtureId}`);
  validateSortedUniqueText(fixture.input.scenarioTags, `Scenario tags for ${fixture.fixtureId}`);
  assertExactKeys(fixture.expected, EXPECTATION_KEYS, `Premise fixture ${fixture.fixtureId} expectation`);
  if (fixture.expected.schemaVersion !== 1 || !FIXTURE_STATUSES.includes(fixture.expected.status as PremiseFixtureStatus)) throw new Error(`Premise fixture ${fixture.fixtureId} status is invalid.`);
  validateVocabularyArray(fixture.expected.bodyClassCandidates, PREMISE_BODY_CLASSES, `Body candidates for ${fixture.fixtureId}`);
  validateVocabularyArray(fixture.expected.surfaceMediumCandidates, PREMISE_SURFACE_MEDIA, `Surface candidates for ${fixture.fixtureId}`);
  validateVocabularyArray(fixture.expected.layerStackCandidates, PREMISE_LAYER_STACKS, `Layer candidates for ${fixture.fixtureId}`);
  validateSortedUniqueText(fixture.expected.blockingCodes, `Blocking codes for ${fixture.fixtureId}`);
  validateRuleIds(fixture.expected.requiredRuleIds, knownRuleIds, `Rule IDs for ${fixture.fixtureId}`);
  validateSortedUniqueText(fixture.notes, `Notes for ${fixture.fixtureId}`);
  if (fixture.expected.bodyClassCandidates.length > PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1.maxCandidateBodyClasses || fixture.expected.surfaceMediumCandidates.length > PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1.maxCandidateSurfaceMedia || fixture.expected.layerStackCandidates.length > PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1.maxCandidateLayerStacks) throw new Error(`Premise fixture ${fixture.fixtureId} exceeds candidate budgets.`);
  if (fixture.expected.status === 'BLOCKED') {
    if (fixture.expected.blockingCodes.length === 0) throw new Error(`Blocked fixture ${fixture.fixtureId} requires a blocking code.`);
    if (fixture.expected.bodyClassCandidates.length + fixture.expected.surfaceMediumCandidates.length + fixture.expected.layerStackCandidates.length > 0) throw new Error(`Blocked fixture ${fixture.fixtureId} cannot contain authoritative candidates.`);
  } else if (fixture.expected.bodyClassCandidates.length === 0 || fixture.expected.surfaceMediumCandidates.length === 0 || fixture.expected.layerStackCandidates.length === 0) {
    throw new Error(`Non-blocked fixture ${fixture.fixtureId} requires candidates in every premise domain.`);
  }
  if (fixture.input.scenarioTags.includes('ATTEMPTED_SOLVED_TECTONIC_CONCLUSION') && fixture.expected.status !== 'BLOCKED') throw new Error(`Hostile tectonic fixture ${fixture.fixtureId} must be blocked.`);
  const artificialCandidate = fixture.expected.bodyClassCandidates.includes('ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL');
  if (artificialCandidate && !fixture.input.exceptionPermissions.includes('ALLOW_ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL')) throw new Error(`Artificial fixture ${fixture.fixtureId} lacks explicit permission.`);
}

export function measurePremiseResearchArtifacts(...values: readonly unknown[]) {
  const bytes = values.reduce((sum, value) => sum + new TextEncoder().encode(JSON.stringify(value)).byteLength, 0);
  if (bytes > PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1.maxSerializedResearchBytes) throw new Error('Premise research artifacts exceed the frozen serialized-size budget.');
  return Object.freeze({ schemaVersion: 1 as const, serializedResearchBytes: bytes });
}

function validateRuleIds(value: unknown, knownRuleIds: ReadonlySet<string>, label: string): readonly string[] {
  const values = validateSortedUniqueText(value, label);
  for (const ruleId of values) if (!knownRuleIds.has(ruleId)) throw new Error(`${label} reference unknown rule ${ruleId}.`);
  return values;
}

function validateVocabularyArray<T extends string>(value: unknown, vocabulary: readonly T[], label: string): readonly T[] {
  const values = validateSortedUniqueText(value, label);
  for (const entry of values) if (!vocabulary.includes(entry as T)) throw new Error(`${label} contain unsupported value ${entry}.`);
  return values as readonly T[];
}

function validateSortedUniqueText(value: unknown, label: string): readonly string[] {
  if (!Array.isArray(value) || value.some((entry) => !isNonEmptyText(entry))) throw new Error(`${label} must contain non-empty text.`);
  const normalized = [...value].sort(compareStableText);
  if (new Set(value).size !== value.length || !arraysEqual(value, normalized)) throw new Error(`${label} must be sorted and unique.`);
  return value;
}

function assertExactKeys(value: unknown, allowedKeys: readonly string[], label: string): asserts value is Record<string, any> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
  const unknown = Object.keys(value).filter((key) => !allowedKeys.includes(key)).sort(compareStableText);
  if (unknown.length > 0) throw new Error(`${label} contains unowned fields: ${unknown.join(', ')}`);
}

function arraysEqual<T>(a: readonly T[], b: readonly T[]): boolean {
  return a.length === b.length && a.every((entry, index) => entry === b[index]);
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function isNonEmptyText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
