import { cloneAndDeepFreeze } from './immutable';
import { hashCausalPayload, deterministicHashEquals, assertDeterministicHash } from './hashes';
import { validateScientificQuantity } from './quantities';
import type { CausalGeologyInputId, CausalGeologyInputV1, CausalInputDeclarationV1, CausalInputSourceClass } from './types';

export interface CausalInputAuthorityDefinitionV1 {
  readonly inputId: CausalGeologyInputId;
  readonly requiredUnit: string;
  readonly requiredScaleId: string;
  readonly allowedSourceClasses: readonly CausalInputSourceClass[];
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

export const FORBIDDEN_LEGACY_CAUSAL_INPUT_FIELDS: readonly string[] = Object.freeze([
  'world.cells',
  'world.plates',
  'world.rivers',
  'world.continentSkeletons',
  'world.oceanBasinSkeletons',
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
if (AUTHORITY_BY_ID.size !== CAUSAL_INPUT_AUTHORITY_REGISTRY.length) throw new Error('Duplicate causal input authority ID.');

export function createCausalGeologyInput(
  rootSeed: string,
  declarations: readonly CausalInputDeclarationV1[],
  options: Readonly<{ contradictionIds?: readonly string[]; limitations?: readonly string[] }> = {},
): CausalGeologyInputV1 {
  if (!isNonEmptyText(rootSeed)) throw new Error('Causal root seed must be non-empty text.');
  if (!Array.isArray(declarations) || declarations.length === 0) throw new Error('At least one causal input declaration is required.');

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
    rootSeed,
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
  if (input.schemaVersion !== 1 || input.inputContractVersion !== 1 || !isNonEmptyText(input.rootSeed)) {
    throw new Error('Unsupported causal geology input contract.');
  }
  if (!Array.isArray(input.sourceDeclarations) || input.sourceDeclarations.length === 0) throw new Error('Causal input declarations are missing.');
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
    if (JSON.stringify(expectedMap[declaration.inputId]) !== JSON.stringify(declaration.quantity)) throw new Error(`Causal input ${declaration.inputId} map value does not match its declaration.`);
  }
  if (!arraysEqual(ids, [...ids].sort(compareStableText))) throw new Error('Causal input declarations are not canonically ordered.');
  if (Object.keys(input.physicalInputs).length + Object.keys(input.approvedDerivations).length !== seen.size) throw new Error('Causal input maps contain undeclared values.');
  if (!Array.isArray(input.excludedLegacyFields) || !arraysEqual(input.excludedLegacyFields, FORBIDDEN_LEGACY_CAUSAL_INPUT_FIELDS)) {
    throw new Error('Causal input legacy exclusion contract is incomplete.');
  }
  const contradictionIds = validateSortedUniqueText(input.contradictionIds, 'Causal input contradiction IDs');
  const limitations = validateSortedUniqueText(input.limitations, 'Causal input limitations');
  assertDeterministicHash(input.contentHash, 'Causal input');
  const expected = hashCausalPayload('WorldWright/causal-geology-input/v1', {
    schemaVersion: 1,
    inputContractVersion: 1,
    rootSeed: input.rootSeed,
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
  if (!authority.allowedSourceClasses.includes(declaration.sourceClass as CausalInputSourceClass)) {
    throw new Error(`Causal input ${declaration.inputId} cannot use source class ${String(declaration.sourceClass)}.`);
  }
  validateScientificQuantity(declaration.quantity);
  if (declaration.quantity.unit !== authority.requiredUnit || declaration.quantity.scaleId !== authority.requiredScaleId) {
    throw new Error(`Causal input ${declaration.inputId} uses the wrong quantity scale.`);
  }
  if (!isNonEmptyText(declaration.sourceRecordId)) throw new Error(`Causal input ${declaration.inputId} source record is invalid.`);
  if (declaration.sourceClass === 'APPROVED_PHYSICAL_DERIVATION' && !isNonEmptyText(declaration.formulaVersion)) {
    throw new Error(`Derived causal input ${declaration.inputId} requires a formula version.`);
  }
  if (declaration.sourceClass === 'DIRECT_DECLARATION' && declaration.formulaVersion !== undefined) {
    throw new Error(`Direct causal input ${declaration.inputId} cannot declare a formula version.`);
  }
  validateSortedUniqueText(declaration.evidenceIds, `Causal input ${declaration.inputId} evidence IDs`);
}

function define(inputId: CausalGeologyInputId, requiredUnit: string, requiredScaleId: string, allowedSourceClasses: readonly CausalInputSourceClass[]): CausalInputAuthorityDefinitionV1 {
  return Object.freeze({ inputId, requiredUnit, requiredScaleId, allowedSourceClasses: Object.freeze([...allowedSourceClasses]) });
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
