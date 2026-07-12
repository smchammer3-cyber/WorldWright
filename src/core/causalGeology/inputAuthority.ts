import { canonicalJsonStringify } from '../worldProvenance/canonicalJson';
import type { DeterministicHash } from '../worldProvenance/hash';
import { createRootSeedIdentity } from '../worldRandom/seedMixer';
import type { RootSeedIdentity } from '../worldRandom/types';
import { cloneAndDeepFreeze } from './immutable';
import { hashCausalPayload, deterministicHashEquals, assertDeterministicHash } from './hashes';
import { CAUSAL_GEOLOGY_RESOURCE_LIMITS_V1 } from './limits';
import { validateScientificQuantity } from './quantities';
import type { CausalGeologyInputId, CausalGeologyInputV1, CausalInputDeclarationV1, CausalInputSourceClass } from './types';

export interface CausalInputAuthorityDefinitionV1 {
  readonly inputId: CausalGeologyInputId;
  readonly requiredUnit: string;
  readonly requiredScaleId: string;
  readonly allowedSourceClasses: readonly CausalInputSourceClass[];
}

export interface CausalDerivationDefinitionV1 {
  readonly inputId: CausalGeologyInputId;
  readonly derivationId: string;
  readonly formulaVersion: string;
  readonly dependencyInputIds: readonly CausalGeologyInputId[];
  readonly status: 'RESERVED' | 'ACTIVE';
}

export interface CausalInputCreationOptionsV1 {
  readonly initialConditionBundleHash: DeterministicHash;
  readonly contradictionIds?: readonly string[];
  readonly limitations?: readonly string[];
}

const DIRECT: readonly CausalInputSourceClass[] = ['DIRECT_DECLARATION'];
const DERIVED: readonly CausalInputSourceClass[] = ['APPROVED_PHYSICAL_DERIVATION'];

export const CAUSAL_INPUT_AUTHORITY_REGISTRY: readonly CausalInputAuthorityDefinitionV1[] = Object.freeze([
  define('planet.radius', 'earth-radius', 'earth-radius-v1', DIRECT),
  define('planet.density', 'earth-density', 'earth-density-v1', DIRECT),
  define('star.luminosity', 'solar-luminosity', 'solar-luminosity-v1', DIRECT),
  define('orbit.distance', 'astronomical-unit', 'astronomical-unit-v1', DIRECT),
  define('climate.declared-albedo', 'normalized-0-1', 'normalized-0-1-v1', DIRECT),
  define('climate.declared-greenhouse', 'normalized-0-1', 'normalized-0-1-v1', DIRECT),
  define('inventory.water', 'earth-water-inventory', 'earth-water-inventory-v1', DIRECT),
  define('inventory.volatiles', 'earth-volatile-inventory', 'earth-volatile-inventory-v1', DIRECT),
  define('thermal.age', 'gigaannum', 'gigaannum-v1', DIRECT),
  define('thermal.primordial-heat', 'normalized-0-1', 'normalized-0-1-v1', DIRECT),
  define('thermal.radiogenic-heat', 'normalized-0-1', 'normalized-0-1-v1', DIRECT),
  define('thermal.tidal-heating', 'normalized-0-1', 'normalized-0-1-v1', DIRECT),
  define('derived.mass', 'earth-mass', 'earth-mass-v1', DERIVED),
  define('derived.surface-gravity', 'earth-gravity', 'earth-gravity-v1', DERIVED),
  define('derived.escape-velocity', 'earth-escape-velocity', 'earth-escape-velocity-v1', DERIVED),
  define('derived.stellar-flux', 'earth-stellar-flux', 'earth-stellar-flux-v1', DERIVED),
  define('derived.total-heat', 'normalized-0-1', 'normalized-0-1-v1', DERIVED),
]);

export const CAUSAL_DERIVATION_REGISTRY: readonly CausalDerivationDefinitionV1[] = Object.freeze([
  reserveDerivation('derived.mass', 'mass-from-radius-density-v1', ['planet.radius', 'planet.density']),
  reserveDerivation('derived.surface-gravity', 'surface-gravity-from-mass-radius-v1', ['derived.mass', 'planet.radius']),
  reserveDerivation('derived.escape-velocity', 'escape-velocity-from-mass-radius-v1', ['derived.mass', 'planet.radius']),
  reserveDerivation('derived.stellar-flux', 'stellar-flux-from-luminosity-distance-v1', ['star.luminosity', 'orbit.distance']),
  reserveDerivation('derived.total-heat', 'total-heat-from-declared-sources-v1', ['thermal.primordial-heat', 'thermal.radiogenic-heat', 'thermal.tidal-heating']),
]);

export const FORBIDDEN_LEGACY_CAUSAL_INPUT_FIELDS: readonly string[] = Object.freeze([
  'world.cells',
  'world.terrain',
  'world.elevation',
  'world.landMask',
  'world.plates',
  'world.rivers',
  'world.continentSkeletons',
  'world.oceanBasinSkeletons',
  'world.biomes',
  'world.materials',
  'legacyCandidate',
  'legacyComparison',
  'comparisonDiagnostics',
  'planetFoundation.geologyStack',
  'planetFoundation.resolvedPhysicalConsequences',
  'planetFoundation.surfaceWaterMode',
  'planetFoundation.reliefGravityScale',
  'planetFoundation.seaLevelOffset',
  'planetFoundation.adjustedAlbedo',
  'planetFoundation.effectiveHeatIndex',
  'planetFoundation.evaporationPotential',
  'planetFoundation.snowlineBias',
  'planetFoundation.coreHeat',
  'planetFoundation.mantleHeat',
  'planetFoundation.heatFlowIndex',
  'planetFoundation.mantleConvectionIndex',
  'planetFoundation.tectonicVigor',
  'planetFoundation.volcanismBias',
  'planetFoundation.riftLikelihood',
  'planetFoundation.hotspotPotential',
  'planetFoundation.erosionSedimentScale',
]);

const AUTHORITY_BY_ID = new Map(CAUSAL_INPUT_AUTHORITY_REGISTRY.map((entry) => [entry.inputId, entry]));
const DERIVATION_BY_INPUT_ID = new Map(CAUSAL_DERIVATION_REGISTRY.map((entry) => [entry.inputId, entry]));
if (AUTHORITY_BY_ID.size !== CAUSAL_INPUT_AUTHORITY_REGISTRY.length) throw new Error('Duplicate causal input authority ID.');
if (DERIVATION_BY_INPUT_ID.size !== CAUSAL_DERIVATION_REGISTRY.length) throw new Error('Duplicate causal derivation input ID.');

export function createCausalGeologyInput(
  rootSeed: string | number | RootSeedIdentity,
  declarations: readonly CausalInputDeclarationV1[],
  options: CausalInputCreationOptionsV1,
): CausalGeologyInputV1 {
  const normalizedRootSeed = normalizeRootSeedIdentity(rootSeed);
  assertDeterministicHash(options?.initialConditionBundleHash, 'Initial-condition bundle');
  assertDeclarationCount(declarations);

  const sorted = [...declarations].sort((a, b) => compareStableText(a.inputId, b.inputId));
  const seen = new Set<string>();
  const physicalInputs: Record<string, CausalInputDeclarationV1['quantity']> = {};
  const approvedDerivations: Record<string, CausalInputDeclarationV1['quantity']> = {};
  for (const declaration of sorted) {
    validateCausalInputDeclaration(declaration);
    if (seen.has(declaration.inputId)) throw new Error(`Duplicate causal input declaration: ${declaration.inputId}`);
    seen.add(declaration.inputId);
    if (declaration.sourceClass === 'DIRECT_DECLARATION') physicalInputs[declaration.inputId] = declaration.quantity;
    else approvedDerivations[declaration.inputId] = declaration.quantity;
  }

  const payload = {
    schemaVersion: 1 as const,
    inputContractVersion: 1 as const,
    initialConditionContract: 'PLANET_INITIAL_CONDITION_BUNDLE_V1' as const,
    initialConditionBundleHash: options.initialConditionBundleHash,
    rootSeed: normalizedRootSeed,
    sourceDeclarations: sorted.map((entry) => cloneAndDeepFreeze(entry)),
    physicalInputs,
    approvedDerivations,
    excludedLegacyFields: [...FORBIDDEN_LEGACY_CAUSAL_INPUT_FIELDS],
    contradictionIds: sortedUniqueText(options.contradictionIds ?? [], 'Causal input contradiction IDs'),
    limitations: sortedUniqueText(options.limitations ?? [], 'Causal input limitations'),
  };
  const input: CausalGeologyInputV1 = {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/causal-geology-input/v1', payload),
  };
  return cloneAndDeepFreeze(input);
}

export function validateCausalGeologyInput(value: unknown): asserts value is CausalGeologyInputV1 {
  if (!value || typeof value !== 'object') throw new Error('Causal geology input must be an object.');
  const input = value as Partial<CausalGeologyInputV1>;
  if (input.schemaVersion !== 1 || input.inputContractVersion !== 1) throw new Error('Unsupported causal geology input contract.');
  if (input.initialConditionContract !== 'PLANET_INITIAL_CONDITION_BUNDLE_V1') throw new Error('Causal geology input is not bound to the approved initial-condition contract.');
  assertDeterministicHash(input.initialConditionBundleHash, 'Initial-condition bundle');
  const rootSeed = normalizeRootSeedIdentity(input.rootSeed as RootSeedIdentity);
  assertDeclarationCount(input.sourceDeclarations);
  if (!isRecord(input.physicalInputs) || !isRecord(input.approvedDerivations)) throw new Error('Causal input maps are invalid.');
  const seen = new Set<string>();
  const ids: string[] = [];
  for (const declaration of input.sourceDeclarations) {
    validateCausalInputDeclaration(declaration);
    if (seen.has(declaration.inputId)) throw new Error(`Duplicate causal input declaration: ${declaration.inputId}`);
    seen.add(declaration.inputId);
    ids.push(declaration.inputId);
    const expectedMap = declaration.sourceClass === 'DIRECT_DECLARATION' ? input.physicalInputs : input.approvedDerivations;
    const otherMap = declaration.sourceClass === 'DIRECT_DECLARATION' ? input.approvedDerivations : input.physicalInputs;
    if (!(declaration.inputId in expectedMap) || declaration.inputId in otherMap) throw new Error(`Causal input ${declaration.inputId} is in the wrong authority map.`);
    validateScientificQuantity(expectedMap[declaration.inputId]);
    if (canonicalJsonStringify(expectedMap[declaration.inputId]) !== canonicalJsonStringify(declaration.quantity)) throw new Error(`Causal input ${declaration.inputId} map value does not match its declaration.`);
  }
  if (!arraysEqual(ids, [...ids].sort(compareStableText))) throw new Error('Causal input declarations are not canonically ordered.');
  if (Object.keys(input.physicalInputs).length + Object.keys(input.approvedDerivations).length !== seen.size) throw new Error('Causal input maps contain undeclared values.');
  if (!Array.isArray(input.excludedLegacyFields) || !arraysEqual(input.excludedLegacyFields, FORBIDDEN_LEGACY_CAUSAL_INPUT_FIELDS)) throw new Error('Causal input legacy exclusion contract is incomplete.');
  const contradictionIds = validateSortedUniqueText(input.contradictionIds, 'Causal input contradiction IDs');
  const limitations = validateSortedUniqueText(input.limitations, 'Causal input limitations');
  assertDeterministicHash(input.contentHash, 'Causal input');
  const expected = hashCausalPayload('WorldWright/causal-geology-input/v1', {
    schemaVersion: 1,
    inputContractVersion: 1,
    initialConditionContract: input.initialConditionContract,
    initialConditionBundleHash: input.initialConditionBundleHash,
    rootSeed,
    sourceDeclarations: input.sourceDeclarations,
    physicalInputs: input.physicalInputs,
    approvedDerivations: input.approvedDerivations,
    excludedLegacyFields: input.excludedLegacyFields,
    contradictionIds,
    limitations,
  });
  if (!deterministicHashEquals(input.contentHash, expected)) throw new Error('Causal input content hash mismatch.');
}

export function validateCausalInputDeclaration(value: unknown): asserts value is CausalInputDeclarationV1 {
  if (!value || typeof value !== 'object') throw new Error('Causal input declaration must be an object.');
  const declaration = value as Partial<CausalInputDeclarationV1>;
  if (declaration.schemaVersion !== 1 || !isNonEmptyText(declaration.inputId)) throw new Error('Causal input declaration identity is invalid.');
  const authority = AUTHORITY_BY_ID.get(declaration.inputId as CausalGeologyInputId);
  if (!authority) throw new Error(`Unapproved causal input: ${declaration.inputId}`);
  if (!authority.allowedSourceClasses.includes(declaration.sourceClass as CausalInputSourceClass)) throw new Error(`Causal input ${declaration.inputId} cannot use source class ${String(declaration.sourceClass)}.`);
  validateScientificQuantity(declaration.quantity);
  if (declaration.quantity.unit !== authority.requiredUnit || declaration.quantity.scaleId !== authority.requiredScaleId) throw new Error(`Causal input ${declaration.inputId} uses the wrong quantity scale.`);
  if (!isNonEmptyText(declaration.sourceRecordId)) throw new Error(`Causal input ${declaration.inputId} source record is invalid.`);
  if (!isNonEmptyText(declaration.confidenceSubject)) throw new Error(`Causal input ${declaration.inputId} confidence subject is invalid.`);
  if (declaration.sourceClass === 'DIRECT_DECLARATION') {
    if (declaration.formulaVersion !== undefined || declaration.quantity.derivationId !== undefined) throw new Error(`Direct causal input ${declaration.inputId} cannot declare derivation metadata.`);
  } else {
    const derivation = DERIVATION_BY_INPUT_ID.get(declaration.inputId as CausalGeologyInputId);
    if (!derivation || derivation.status !== 'ACTIVE') throw new Error(`Derived causal input ${declaration.inputId} is reserved and not yet approved for execution.`);
    if (declaration.formulaVersion !== derivation.formulaVersion || declaration.quantity.derivationId !== derivation.derivationId) throw new Error(`Derived causal input ${declaration.inputId} does not match its approved derivation contract.`);
  }
  validateSortedUniqueText(declaration.evidenceIds, `Causal input ${declaration.inputId} evidence IDs`);
}

export function normalizeRootSeedIdentity(seed: string | number | RootSeedIdentity): RootSeedIdentity {
  const candidate = typeof seed === 'string' || typeof seed === 'number' ? createRootSeedIdentity(seed) : seed;
  if (!candidate || typeof candidate !== 'object' || typeof candidate.exactText !== 'string' || candidate.encoding !== 'utf8-v1' || typeof candidate.fingerprint !== 'string') throw new Error('Causal root seed identity is invalid.');
  const expected = createRootSeedIdentity(candidate.exactText);
  if (candidate.fingerprint !== expected.fingerprint) throw new Error('Causal root seed fingerprint mismatch.');
  return cloneAndDeepFreeze(expected);
}

function assertDeclarationCount(value: unknown): asserts value is readonly CausalInputDeclarationV1[] {
  if (!Array.isArray(value) || value.length === 0) throw new Error('At least one causal input declaration is required.');
  if (value.length > CAUSAL_GEOLOGY_RESOURCE_LIMITS_V1.maxInputDeclarations) throw new Error(`Causal input declarations exceed the limit of ${CAUSAL_GEOLOGY_RESOURCE_LIMITS_V1.maxInputDeclarations}.`);
}

function define(inputId: CausalGeologyInputId, requiredUnit: string, requiredScaleId: string, allowedSourceClasses: readonly CausalInputSourceClass[]): CausalInputAuthorityDefinitionV1 {
  return Object.freeze({ inputId, requiredUnit, requiredScaleId, allowedSourceClasses: Object.freeze([...allowedSourceClasses]) });
}

function reserveDerivation(inputId: CausalGeologyInputId, formulaVersion: string, dependencyInputIds: readonly CausalGeologyInputId[]): CausalDerivationDefinitionV1 {
  return Object.freeze({ inputId, derivationId: formulaVersion, formulaVersion, dependencyInputIds: Object.freeze([...dependencyInputIds]), status: 'RESERVED' });
}

function sortedUniqueText(values: readonly string[], label: string): readonly string[] {
  validateTextArray(values, label);
  return Object.freeze([...values].sort(compareStableText));
}

function validateSortedUniqueText(value: unknown, label: string): readonly string[] {
  validateTextArray(value, label);
  const values = value as readonly string[];
  if (!arraysEqual(values, [...values].sort(compareStableText))) throw new Error(`${label} are not canonically ordered.`);
  return values;
}

function validateTextArray(value: unknown, label: string): asserts value is readonly string[] {
  if (!Array.isArray(value) || !value.every(isNonEmptyText)) throw new Error(`${label} are invalid.`);
  if (new Set(value).size !== value.length) throw new Error(`${label} contain duplicates.`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isNonEmptyText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function arraysEqual<T>(a: readonly T[], b: readonly T[]): boolean {
  return a.length === b.length && a.every((entry, index) => entry === b[index]);
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
