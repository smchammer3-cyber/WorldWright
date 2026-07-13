import { cloneAndDeepFreeze } from './immutable';
import { assertDeterministicHash, deterministicHashEquals, hashCausalPayload } from './hashes';
import { validateScientificRange } from './quantities';
import type {
  InitialConditionDirectInputId,
  InitialConditionPriorConstraintBundleV1,
  InitialConditionPriorFamilyV1,
  InitialConditionPriorQuantityRangeV1,
} from './initialConditionTypes';

const BUNDLE_KEYS = ['schemaVersion', 'bundleId', 'bundleVersion', 'families', 'hardConstraintRuleIds', 'softCorrelationRuleIds', 'holdoutIds', 'knownLimitations', 'contentHash'] as const;
const FAMILY_KEYS = ['schemaVersion', 'familyId', 'weight', 'quantityRanges', 'profileHints', 'styleHints', 'provenanceClass', 'limitations'] as const;
const RANGE_KEYS = ['schemaVersion', 'inputId', 'min', 'max', 'unit', 'scaleId'] as const;

const DIRECT_INPUT_ORDER: readonly InitialConditionDirectInputId[] = Object.freeze([
  'climate.declared-albedo',
  'climate.declared-greenhouse',
  'inventory.volatiles',
  'inventory.water',
  'orbit.distance',
  'planet.density',
  'planet.radius',
  'star.luminosity',
  'thermal.age',
  'thermal.primordial-heat',
  'thermal.radiogenic-heat',
  'thermal.tidal-heating',
]);

const payload = {
  schemaVersion: 1 as const,
  bundleId: 'WORLDWRIGHT_INITIAL_CONDITION_PRIORS_V1' as const,
  bundleVersion: 1 as const,
  families: [
    family('balanced-solid-context', 12, {
      'planet.radius': range('planet.radius', 0.8, 1.2, 'earth-radius', 'earth-radius-v1'),
      'planet.density': range('planet.density', 0.85, 1.15, 'earth-density', 'earth-density-v1'),
      'star.luminosity': range('star.luminosity', 0.8, 1.2, 'solar-luminosity', 'solar-luminosity-v1'),
      'orbit.distance': range('orbit.distance', 0.85, 1.25, 'astronomical-unit', 'astronomical-unit-v1'),
      'climate.declared-albedo': range('climate.declared-albedo', 0.22, 0.38, 'normalized-0-1', 'normalized-0-1-v1'),
      'climate.declared-greenhouse': range('climate.declared-greenhouse', 0.15, 0.55, 'normalized-0-1', 'normalized-0-1-v1'),
      'inventory.water': range('inventory.water', 0.2, 1.2, 'earth-water-inventory', 'earth-water-inventory-v1'),
      'inventory.volatiles': range('inventory.volatiles', 0.2, 1, 'earth-volatile-inventory', 'earth-volatile-inventory-v1'),
      'thermal.age': range('thermal.age', 2.5, 6.5, 'gigaannum', 'gigaannum-v1'),
      'thermal.primordial-heat': range('thermal.primordial-heat', 0.1, 0.6, 'normalized-0-1', 'normalized-0-1-v1'),
      'thermal.radiogenic-heat': range('thermal.radiogenic-heat', 0.2, 0.8, 'normalized-0-1', 'normalized-0-1-v1'),
      'thermal.tidal-heating': range('thermal.tidal-heating', 0, 0.15, 'normalized-0-1', 'normalized-0-1-v1'),
    }, ['EARTHLIKE_ROCKY', 'ROCKY_ALIEN'], ['EARTHLIKE', 'STYLIZED']),
    family('compact-cool-solid-context', 8, {
      'planet.radius': range('planet.radius', 0.2, 0.65, 'earth-radius', 'earth-radius-v1'),
      'planet.density': range('planet.density', 0.55, 1, 'earth-density', 'earth-density-v1'),
      'star.luminosity': range('star.luminosity', 0.2, 0.8, 'solar-luminosity', 'solar-luminosity-v1'),
      'orbit.distance': range('orbit.distance', 0.8, 3, 'astronomical-unit', 'astronomical-unit-v1'),
      'climate.declared-albedo': range('climate.declared-albedo', 0.25, 0.65, 'normalized-0-1', 'normalized-0-1-v1'),
      'climate.declared-greenhouse': range('climate.declared-greenhouse', 0.02, 0.25, 'normalized-0-1', 'normalized-0-1-v1'),
      'inventory.water': range('inventory.water', 0.05, 1.5, 'earth-water-inventory', 'earth-water-inventory-v1'),
      'inventory.volatiles': range('inventory.volatiles', 0.05, 1.2, 'earth-volatile-inventory', 'earth-volatile-inventory-v1'),
      'thermal.age': range('thermal.age', 2, 10, 'gigaannum', 'gigaannum-v1'),
      'thermal.primordial-heat': range('thermal.primordial-heat', 0.05, 0.35, 'normalized-0-1', 'normalized-0-1-v1'),
      'thermal.radiogenic-heat': range('thermal.radiogenic-heat', 0.1, 0.6, 'normalized-0-1', 'normalized-0-1-v1'),
      'thermal.tidal-heating': range('thermal.tidal-heating', 0, 0.4, 'normalized-0-1', 'normalized-0-1-v1'),
    }, ['DWARF_ROCKY_OR_ICY', 'ROCKY_ALIEN'], ['ALIEN', 'STYLIZED']),
    family('volatile-cold-solid-context', 7, {
      'planet.radius': range('planet.radius', 0.25, 0.9, 'earth-radius', 'earth-radius-v1'),
      'planet.density': range('planet.density', 0.4, 0.85, 'earth-density', 'earth-density-v1'),
      'star.luminosity': range('star.luminosity', 0.1, 0.8, 'solar-luminosity', 'solar-luminosity-v1'),
      'orbit.distance': range('orbit.distance', 1, 5, 'astronomical-unit', 'astronomical-unit-v1'),
      'climate.declared-albedo': range('climate.declared-albedo', 0.35, 0.8, 'normalized-0-1', 'normalized-0-1-v1'),
      'climate.declared-greenhouse': range('climate.declared-greenhouse', 0, 0.25, 'normalized-0-1', 'normalized-0-1-v1'),
      'inventory.water': range('inventory.water', 0.5, 10, 'earth-water-inventory', 'earth-water-inventory-v1'),
      'inventory.volatiles': range('inventory.volatiles', 0.8, 10, 'earth-volatile-inventory', 'earth-volatile-inventory-v1'),
      'thermal.age': range('thermal.age', 1, 10, 'gigaannum', 'gigaannum-v1'),
      'thermal.primordial-heat': range('thermal.primordial-heat', 0.05, 0.4, 'normalized-0-1', 'normalized-0-1-v1'),
      'thermal.radiogenic-heat': range('thermal.radiogenic-heat', 0.05, 0.5, 'normalized-0-1', 'normalized-0-1-v1'),
      'thermal.tidal-heating': range('thermal.tidal-heating', 0.05, 0.8, 'normalized-0-1', 'normalized-0-1-v1'),
    }, ['DWARF_ROCKY_OR_ICY', 'ICE_SHELL_OCEAN_WORLD', 'VOLATILE_PRESSURE_ROCKY'], ['ALIEN']),
    family('large-rocky-solid-context', 6, {
      'planet.radius': range('planet.radius', 1.1, 2, 'earth-radius', 'earth-radius-v1'),
      'planet.density': range('planet.density', 0.9, 1.4, 'earth-density', 'earth-density-v1'),
      'star.luminosity': range('star.luminosity', 0.6, 2, 'solar-luminosity', 'solar-luminosity-v1'),
      'orbit.distance': range('orbit.distance', 0.6, 2.5, 'astronomical-unit', 'astronomical-unit-v1'),
      'climate.declared-albedo': range('climate.declared-albedo', 0.15, 0.45, 'normalized-0-1', 'normalized-0-1-v1'),
      'climate.declared-greenhouse': range('climate.declared-greenhouse', 0.15, 0.75, 'normalized-0-1', 'normalized-0-1-v1'),
      'inventory.water': range('inventory.water', 0.05, 2, 'earth-water-inventory', 'earth-water-inventory-v1'),
      'inventory.volatiles': range('inventory.volatiles', 0.1, 2, 'earth-volatile-inventory', 'earth-volatile-inventory-v1'),
      'thermal.age': range('thermal.age', 1, 8, 'gigaannum', 'gigaannum-v1'),
      'thermal.primordial-heat': range('thermal.primordial-heat', 0.15, 0.75, 'normalized-0-1', 'normalized-0-1-v1'),
      'thermal.radiogenic-heat': range('thermal.radiogenic-heat', 0.2, 0.9, 'normalized-0-1', 'normalized-0-1-v1'),
      'thermal.tidal-heating': range('thermal.tidal-heating', 0, 0.3, 'normalized-0-1', 'normalized-0-1-v1'),
    }, ['ROCKY_ALIEN', 'SUPER_EARTH_ROCKY'], ['ALIEN']),
  ],
  hardConstraintRuleIds: [
    'initial-condition/direct-quantity-scale-v1',
    'initial-condition/hard-lock-precedence-v1',
    'initial-condition/no-solved-geology-v1',
  ],
  softCorrelationRuleIds: [
    'initial-condition/family-correlated-ranges-v1',
    'initial-condition/profile-hint-bias-v1',
    'initial-condition/style-hint-bias-v1',
  ],
  holdoutIds: [
    'holdout/compact-dense-old-v1',
    'holdout/large-low-water-v1',
    'holdout/volatile-cold-tidal-v1',
  ],
  knownLimitations: [
    'Internal modeling priors are not planetary-premise classifications.',
    'Numeric priors remain provisional until later calibration and evidence review.',
    'The bundle intentionally contains no solved geology, tectonic regime, impact history, or morphology.',
  ],
};

export const INITIAL_CONDITION_PRIOR_CONSTRAINT_BUNDLE_V1: InitialConditionPriorConstraintBundleV1 = cloneAndDeepFreeze({
  ...payload,
  contentHash: hashCausalPayload('WorldWright/initial-condition-prior-constraint-bundle/v1', payload),
});

export function validateInitialConditionPriorConstraintBundle(value: unknown): asserts value is InitialConditionPriorConstraintBundleV1 {
  assertExactKeys(value, BUNDLE_KEYS, 'Initial-condition prior bundle');
  const bundle = value as Partial<InitialConditionPriorConstraintBundleV1>;
  if (bundle.schemaVersion !== 1 || bundle.bundleId !== 'WORLDWRIGHT_INITIAL_CONDITION_PRIORS_V1' || bundle.bundleVersion !== 1) throw new Error('Unsupported initial-condition prior bundle.');
  if (!Array.isArray(bundle.families) || bundle.families.length === 0 || bundle.families.length > 32) throw new Error('Initial-condition prior families are invalid.');
  const familyIds = new Set<string>();
  for (const candidate of bundle.families) {
    validatePriorFamily(candidate);
    if (familyIds.has(candidate.familyId)) throw new Error(`Duplicate initial-condition prior family: ${candidate.familyId}`);
    familyIds.add(candidate.familyId);
  }
  validateSortedUniqueText(bundle.hardConstraintRuleIds, 'Initial-condition hard constraint rule IDs');
  validateSortedUniqueText(bundle.softCorrelationRuleIds, 'Initial-condition soft correlation rule IDs');
  validateSortedUniqueText(bundle.holdoutIds, 'Initial-condition holdout IDs');
  validateSortedUniqueText(bundle.knownLimitations, 'Initial-condition prior limitations');
  assertDeterministicHash(bundle.contentHash, 'Initial-condition prior bundle');
  const expected = hashCausalPayload('WorldWright/initial-condition-prior-constraint-bundle/v1', {
    schemaVersion: bundle.schemaVersion,
    bundleId: bundle.bundleId,
    bundleVersion: bundle.bundleVersion,
    families: bundle.families,
    hardConstraintRuleIds: bundle.hardConstraintRuleIds,
    softCorrelationRuleIds: bundle.softCorrelationRuleIds,
    holdoutIds: bundle.holdoutIds,
    knownLimitations: bundle.knownLimitations,
  });
  if (!deterministicHashEquals(bundle.contentHash, expected)) throw new Error('Initial-condition prior bundle content hash mismatch.');
}

function family(
  familyId: string,
  weight: number,
  ranges: Readonly<Record<InitialConditionDirectInputId, InitialConditionPriorQuantityRangeV1>>,
  profileHints: readonly string[],
  styleHints: readonly string[],
): InitialConditionPriorFamilyV1 {
  return {
    schemaVersion: 1,
    familyId,
    weight,
    quantityRanges: DIRECT_INPUT_ORDER.map((inputId) => ranges[inputId]),
    profileHints: [...profileHints].sort(compareStableText),
    styleHints: [...styleHints].sort(compareStableText),
    provenanceClass: 'INTERNAL_MODELING_PRIOR',
    limitations: ['Internal modeling prior; not a resolved body or geology classification.'],
  };
}

function range(inputId: InitialConditionDirectInputId, min: number, max: number, unit: string, scaleId: string): InitialConditionPriorQuantityRangeV1 {
  return { schemaVersion: 1, inputId, min, max, unit, scaleId };
}

function validatePriorFamily(value: unknown): asserts value is InitialConditionPriorFamilyV1 {
  assertExactKeys(value, FAMILY_KEYS, 'Initial-condition prior family');
  const family = value as Partial<InitialConditionPriorFamilyV1>;
  if (family.schemaVersion !== 1 || !isNonEmptyText(family.familyId) || !Number.isSafeInteger(family.weight) || (family.weight as number) <= 0) throw new Error('Initial-condition prior family identity is invalid.');
  if (family.provenanceClass !== 'INTERNAL_MODELING_PRIOR') throw new Error('Initial-condition prior family provenance is invalid.');
  if (!Array.isArray(family.quantityRanges) || family.quantityRanges.length !== DIRECT_INPUT_ORDER.length) throw new Error(`Initial-condition prior family ${family.familyId} has incomplete quantity coverage.`);
  const ids: string[] = [];
  for (const candidate of family.quantityRanges) {
    assertExactKeys(candidate, RANGE_KEYS, `Initial-condition prior family ${family.familyId} range`);
    const quantityRange = candidate as unknown as InitialConditionPriorQuantityRangeV1;
    if (quantityRange.schemaVersion !== 1 || !DIRECT_INPUT_ORDER.includes(quantityRange.inputId)) throw new Error(`Initial-condition prior family ${family.familyId} has an invalid range.`);
    validateScientificRange({ schemaVersion: 1, min: quantityRange.min, max: quantityRange.max, unit: quantityRange.unit, scaleId: quantityRange.scaleId, confidenceSubject: `initial-condition.${quantityRange.inputId}` });
    ids.push(quantityRange.inputId);
  }
  if (!arraysEqual(ids, DIRECT_INPUT_ORDER)) throw new Error(`Initial-condition prior family ${family.familyId} ranges are not canonically ordered.`);
  validateSortedUniqueText(family.profileHints, `Initial-condition prior family ${family.familyId} profile hints`);
  validateSortedUniqueText(family.styleHints, `Initial-condition prior family ${family.familyId} style hints`);
  validateSortedUniqueText(family.limitations, `Initial-condition prior family ${family.familyId} limitations`);
}

function validateSortedUniqueText(value: unknown, label: string): readonly string[] {
  if (!Array.isArray(value) || value.some((entry) => !isNonEmptyText(entry))) throw new Error(`${label} must contain non-empty text.`);
  const normalized = [...value].sort(compareStableText);
  if (!arraysEqual(value, normalized) || new Set(value).size !== value.length) throw new Error(`${label} must be sorted and unique.`);
  return value;
}

function assertExactKeys(value: unknown, allowedKeys: readonly string[], label: string): asserts value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
  const keys = Object.keys(value).sort(compareStableText);
  const allowed = [...allowedKeys].sort(compareStableText);
  const unknown = keys.filter((key) => !allowed.includes(key));
  if (unknown.length > 0) throw new Error(`${label} contains unowned fields: ${unknown.join(', ')}`);
}

function arraysEqual(a: readonly unknown[], b: readonly unknown[]): boolean {
  return a.length === b.length && a.every((entry, index) => entry === b[index]);
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function isNonEmptyText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
