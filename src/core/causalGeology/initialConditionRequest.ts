import { canonicalJsonStringify } from '../worldProvenance/canonicalJson';
import { cloneAndDeepFreeze } from './immutable';
import { assertDeterministicHash, deterministicHashEquals, hashCausalPayload } from './hashes';
import { CAUSAL_INPUT_AUTHORITY_REGISTRY, normalizeRootSeedIdentity } from './inputAuthority';
import { validateScientificQuantity } from './quantities';
import type {
  GenerationRequestControlV1,
  GenerationRequestV1,
  InitialConditionControlId,
  InitialConditionControlSource,
  InitialConditionControlValueV1,
  InitialConditionDirectInputId,
  InitialConditionEnumControlValueV1,
  InitialConditionExceptionPermission,
  InitialConditionHintControlId,
  InitialConditionQuantityControlValueV1,
  InitialConditionRerollScope,
} from './initialConditionTypes';
import type { RootSeedIdentity } from '../worldRandom/types';
import type { ScientificQuantityV1 } from './types';

export const INITIAL_CONDITION_DIRECT_INPUT_IDS: readonly InitialConditionDirectInputId[] = Object.freeze([
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

export const INITIAL_CONDITION_REROLL_SCOPES: readonly InitialConditionRerollScope[] = Object.freeze([
  'BODY_AND_COMPOSITION',
  'ORBIT_AND_STELLAR_CONTEXT',
  'THERMAL_INITIAL_CONDITIONS',
  'VOLATILE_AND_SURFACE_INVENTORY',
]);

export const INITIAL_CONDITION_EXCEPTION_PERMISSIONS: readonly InitialConditionExceptionPermission[] = Object.freeze([
  'ALLOW_ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL',
]);

export const LEGACY_PLANET_PROFILE_HINTS = Object.freeze([
  'ARTIFICIAL_OR_FANTASY_SHELL',
  'DWARF_ROCKY_OR_ICY',
  'EARTHLIKE_ROCKY',
  'ICE_SHELL_OCEAN_WORLD',
  'ROCKY_ALIEN',
  'SUPER_EARTH_ROCKY',
  'VOLATILE_PRESSURE_ROCKY',
] as const);

export const STYLE_MODE_HINTS = Object.freeze(['ALIEN', 'EARTHLIKE', 'FANTASY', 'STYLIZED'] as const);

const CONTROL_SCOPE_BY_ID: Readonly<Record<InitialConditionControlId, InitialConditionRerollScope>> = Object.freeze({
  'planet.radius': 'BODY_AND_COMPOSITION',
  'planet.density': 'BODY_AND_COMPOSITION',
  'legacy.planet-profile-hint': 'BODY_AND_COMPOSITION',
  'star.luminosity': 'ORBIT_AND_STELLAR_CONTEXT',
  'orbit.distance': 'ORBIT_AND_STELLAR_CONTEXT',
  'climate.declared-albedo': 'ORBIT_AND_STELLAR_CONTEXT',
  'climate.declared-greenhouse': 'ORBIT_AND_STELLAR_CONTEXT',
  'legacy.style-mode-hint': 'ORBIT_AND_STELLAR_CONTEXT',
  'inventory.water': 'VOLATILE_AND_SURFACE_INVENTORY',
  'inventory.volatiles': 'VOLATILE_AND_SURFACE_INVENTORY',
  'thermal.age': 'THERMAL_INITIAL_CONDITIONS',
  'thermal.primordial-heat': 'THERMAL_INITIAL_CONDITIONS',
  'thermal.radiogenic-heat': 'THERMAL_INITIAL_CONDITIONS',
  'thermal.tidal-heating': 'THERMAL_INITIAL_CONDITIONS',
});

const REQUEST_KEYS = [
  'schemaVersion',
  'requestContractVersion',
  'rootSeed',
  'controls',
  'exceptionPermissions',
  'rerollScopes',
  'rerollOrdinal',
  'sourceTemplateId',
  'sourceTemplateVersion',
  'limitations',
  'contentHash',
] as const;
const CONTROL_KEYS = ['schemaVersion', 'controlId', 'intent', 'value', 'source', 'lockState', 'scope'] as const;
const QUANTITY_VALUE_KEYS = ['schemaVersion', 'kind', 'quantity'] as const;
const ENUM_VALUE_KEYS = ['schemaVersion', 'kind', 'enumContract', 'value'] as const;

export interface CreateGenerationRequestOptionsV1 {
  readonly exceptionPermissions?: readonly InitialConditionExceptionPermission[];
  readonly rerollScopes?: readonly InitialConditionRerollScope[];
  readonly rerollOrdinal?: number;
  readonly sourceTemplateId?: string;
  readonly sourceTemplateVersion?: string;
  readonly limitations?: readonly string[];
}

export function createGenerationRequest(
  rootSeed: string | number | RootSeedIdentity,
  controls: readonly GenerationRequestControlV1[],
  options: CreateGenerationRequestOptionsV1 = {},
): GenerationRequestV1 {
  const normalizedRootSeed = normalizeRootSeedIdentity(rootSeed);
  if (!Array.isArray(controls) || controls.length > 64) throw new Error('Generation request controls exceed the supported limit.');
  const normalizedControls = controls.map((entry) => cloneAndDeepFreeze(entry)).sort((a, b) => compareStableText(a.controlId, b.controlId));
  const seen = new Set<string>();
  for (const control of normalizedControls) {
    validateGenerationRequestControl(control);
    if (seen.has(control.controlId)) throw new Error(`Duplicate generation request control: ${control.controlId}`);
    seen.add(control.controlId);
  }
  const exceptionPermissions = sortedUniqueEnum(options.exceptionPermissions ?? [], INITIAL_CONDITION_EXCEPTION_PERMISSIONS, 'Initial-condition exception permissions');
  const rerollScopes = sortedUniqueEnum(options.rerollScopes ?? [], INITIAL_CONDITION_REROLL_SCOPES, 'Initial-condition reroll scopes');
  const rerollOrdinal = options.rerollOrdinal ?? 0;
  if (!Number.isSafeInteger(rerollOrdinal) || rerollOrdinal < 0 || rerollOrdinal > 1_000_000) throw new Error('Initial-condition reroll ordinal is invalid.');
  if (rerollScopes.length === 0 && rerollOrdinal !== 0) throw new Error('A reroll ordinal requires at least one reroll scope.');
  if (options.sourceTemplateId !== undefined && !isNonEmptyText(options.sourceTemplateId)) throw new Error('Generation request template ID is invalid.');
  if (options.sourceTemplateVersion !== undefined && !isNonEmptyText(options.sourceTemplateVersion)) throw new Error('Generation request template version is invalid.');
  if ((options.sourceTemplateId === undefined) !== (options.sourceTemplateVersion === undefined)) throw new Error('Generation request template ID and version must be provided together.');
  const limitations = sortedUniqueText(options.limitations ?? [], 'Generation request limitations');
  const payload = {
    schemaVersion: 1 as const,
    requestContractVersion: 1 as const,
    rootSeed: normalizedRootSeed,
    controls: normalizedControls,
    exceptionPermissions,
    rerollScopes,
    rerollOrdinal,
    ...(options.sourceTemplateId ? { sourceTemplateId: options.sourceTemplateId, sourceTemplateVersion: options.sourceTemplateVersion } : {}),
    limitations,
  };
  const request: GenerationRequestV1 = {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/generation-request/v1', payload),
  };
  validateGenerationRequest(request);
  return cloneAndDeepFreeze(request);
}

export function createQuantityGenerationControl(
  controlId: InitialConditionDirectInputId,
  quantity: ScientificQuantityV1,
  intent: 'HARD_CONSTRAINT' | 'SOFT_PREFERENCE',
  source: InitialConditionControlSource = 'USER',
): GenerationRequestControlV1 {
  validateScientificQuantity(quantity);
  const control: GenerationRequestControlV1 = {
    schemaVersion: 1,
    controlId,
    intent,
    value: { schemaVersion: 1, kind: 'QUANTITY', quantity },
    source,
    lockState: intent === 'HARD_CONSTRAINT' ? 'LOCKED' : 'UNLOCKED',
    scope: getInitialConditionControlScope(controlId),
  };
  validateGenerationRequestControl(control);
  return cloneAndDeepFreeze(control);
}

export function createEnumGenerationControl(
  controlId: InitialConditionHintControlId,
  value: string,
  source: InitialConditionControlSource = 'USER',
): GenerationRequestControlV1 {
  const enumContract = controlId === 'legacy.planet-profile-hint' ? 'LEGACY_PLANET_PROFILE_HINT_V1' : 'STYLE_MODE_HINT_V1';
  const control: GenerationRequestControlV1 = {
    schemaVersion: 1,
    controlId,
    intent: 'SOFT_PREFERENCE',
    value: { schemaVersion: 1, kind: 'ENUM', enumContract, value },
    source,
    lockState: 'UNLOCKED',
    scope: getInitialConditionControlScope(controlId),
  };
  validateGenerationRequestControl(control);
  return cloneAndDeepFreeze(control);
}

export function createUnspecifiedGenerationControl(
  controlId: InitialConditionControlId,
  source: InitialConditionControlSource = 'SEEDED_DEFAULT_REQUEST',
): GenerationRequestControlV1 {
  const control: GenerationRequestControlV1 = {
    schemaVersion: 1,
    controlId,
    intent: 'UNSPECIFIED',
    source,
    lockState: 'UNLOCKED',
    scope: getInitialConditionControlScope(controlId),
  };
  validateGenerationRequestControl(control);
  return cloneAndDeepFreeze(control);
}

export function validateGenerationRequest(value: unknown): asserts value is GenerationRequestV1 {
  assertExactKeys(value, REQUEST_KEYS, 'Generation request');
  const request = value as Partial<GenerationRequestV1>;
  if (request.schemaVersion !== 1 || request.requestContractVersion !== 1) throw new Error('Unsupported generation request contract.');
  const rootSeed = normalizeRootSeedIdentity(request.rootSeed as RootSeedIdentity);
  if (!Array.isArray(request.controls) || request.controls.length > 64) throw new Error('Generation request controls are invalid.');
  const ids: string[] = [];
  const seen = new Set<string>();
  for (const control of request.controls) {
    validateGenerationRequestControl(control);
    if (seen.has(control.controlId)) throw new Error(`Duplicate generation request control: ${control.controlId}`);
    seen.add(control.controlId);
    ids.push(control.controlId);
  }
  if (!arraysEqual(ids, [...ids].sort(compareStableText))) throw new Error('Generation request controls are not canonically ordered.');
  const exceptionPermissions = validateSortedUniqueEnum(request.exceptionPermissions, INITIAL_CONDITION_EXCEPTION_PERMISSIONS, 'Initial-condition exception permissions');
  const rerollScopes = validateSortedUniqueEnum(request.rerollScopes, INITIAL_CONDITION_REROLL_SCOPES, 'Initial-condition reroll scopes');
  if (!Number.isSafeInteger(request.rerollOrdinal) || (request.rerollOrdinal as number) < 0 || (request.rerollOrdinal as number) > 1_000_000) throw new Error('Initial-condition reroll ordinal is invalid.');
  if (rerollScopes.length === 0 && request.rerollOrdinal !== 0) throw new Error('A reroll ordinal requires at least one reroll scope.');
  if (request.sourceTemplateId !== undefined && !isNonEmptyText(request.sourceTemplateId)) throw new Error('Generation request template ID is invalid.');
  if (request.sourceTemplateVersion !== undefined && !isNonEmptyText(request.sourceTemplateVersion)) throw new Error('Generation request template version is invalid.');
  if ((request.sourceTemplateId === undefined) !== (request.sourceTemplateVersion === undefined)) throw new Error('Generation request template ID and version must be provided together.');
  const limitations = validateSortedUniqueText(request.limitations, 'Generation request limitations');
  assertDeterministicHash(request.contentHash, 'Generation request');
  const expected = hashCausalPayload('WorldWright/generation-request/v1', {
    schemaVersion: request.schemaVersion,
    requestContractVersion: request.requestContractVersion,
    rootSeed,
    controls: request.controls,
    exceptionPermissions,
    rerollScopes,
    rerollOrdinal: request.rerollOrdinal,
    ...(request.sourceTemplateId ? { sourceTemplateId: request.sourceTemplateId, sourceTemplateVersion: request.sourceTemplateVersion } : {}),
    limitations,
  });
  if (!deterministicHashEquals(request.contentHash, expected)) throw new Error('Generation request content hash mismatch.');
}

export function validateGenerationRequestControl(value: unknown): asserts value is GenerationRequestControlV1 {
  assertExactKeys(value, CONTROL_KEYS, 'Generation request control');
  const control = value as Partial<GenerationRequestControlV1>;
  if (control.schemaVersion !== 1 || !isInitialConditionControlId(control.controlId)) throw new Error('Generation request control identity is invalid.');
  if (!['HARD_CONSTRAINT', 'SOFT_PREFERENCE', 'UNSPECIFIED'].includes(String(control.intent))) throw new Error(`Generation request control ${control.controlId} intent is invalid.`);
  if (!['USER', 'TEMPLATE', 'SEEDED_DEFAULT_REQUEST'].includes(String(control.source))) throw new Error(`Generation request control ${control.controlId} source is invalid.`);
  if (!['LOCKED', 'UNLOCKED'].includes(String(control.lockState))) throw new Error(`Generation request control ${control.controlId} lock state is invalid.`);
  if (control.scope !== getInitialConditionControlScope(control.controlId)) throw new Error(`Generation request control ${control.controlId} uses the wrong scope.`);
  if (control.intent === 'UNSPECIFIED') {
    if (control.value !== undefined || control.lockState !== 'UNLOCKED') throw new Error(`Unspecified generation request control ${control.controlId} cannot carry a value or lock.`);
    return;
  }
  if (control.value === undefined) throw new Error(`Generation request control ${control.controlId} requires a value.`);
  validateInitialConditionControlValue(control.controlId, control.value);
  if (control.intent === 'HARD_CONSTRAINT') {
    if (!isInitialConditionDirectInputId(control.controlId) || control.value.kind !== 'QUANTITY') throw new Error(`Only direct quantity controls may be hard constraints: ${control.controlId}`);
    if (control.lockState !== 'LOCKED') throw new Error(`Hard generation request control ${control.controlId} must be locked.`);
  } else if (control.lockState !== 'UNLOCKED') {
    throw new Error(`Soft generation request control ${control.controlId} must remain unlocked in W1-02A.`);
  }
}

export function validateInitialConditionControlValue(controlId: InitialConditionControlId, value: unknown): asserts value is InitialConditionControlValueV1 {
  if (!value || typeof value !== 'object') throw new Error(`Generation request control ${controlId} value must be an object.`);
  const candidate = value as Partial<InitialConditionControlValueV1>;
  if (candidate.kind === 'QUANTITY') {
    assertExactKeys(candidate, QUANTITY_VALUE_KEYS, `Generation request control ${controlId} quantity value`);
    if (candidate.schemaVersion !== 1 || !isInitialConditionDirectInputId(controlId)) throw new Error(`Generation request control ${controlId} cannot use a quantity value.`);
    const quantity = (candidate as InitialConditionQuantityControlValueV1).quantity;
    validateScientificQuantity(quantity);
    const authority = CAUSAL_INPUT_AUTHORITY_REGISTRY.find((entry) => entry.inputId === controlId);
    if (!authority || quantity.unit !== authority.requiredUnit || quantity.scaleId !== authority.requiredScaleId) throw new Error(`Generation request control ${controlId} uses the wrong quantity scale.`);
    return;
  }
  if (candidate.kind === 'ENUM') {
    assertExactKeys(candidate, ENUM_VALUE_KEYS, `Generation request control ${controlId} enum value`);
    if (candidate.schemaVersion !== 1 || !isInitialConditionHintControlId(controlId)) throw new Error(`Generation request control ${controlId} cannot use an enum value.`);
    const enumValue = candidate as InitialConditionEnumControlValueV1;
    if (controlId === 'legacy.planet-profile-hint') {
      if (enumValue.enumContract !== 'LEGACY_PLANET_PROFILE_HINT_V1' || !LEGACY_PLANET_PROFILE_HINTS.includes(enumValue.value as never)) throw new Error('Legacy planet profile hint is invalid.');
    } else if (enumValue.enumContract !== 'STYLE_MODE_HINT_V1' || !STYLE_MODE_HINTS.includes(enumValue.value as never)) {
      throw new Error('Style mode hint is invalid.');
    }
    return;
  }
  throw new Error(`Generation request control ${controlId} value kind is invalid.`);
}

export function getInitialConditionControlScope(controlId: InitialConditionControlId): InitialConditionRerollScope {
  const scope = CONTROL_SCOPE_BY_ID[controlId];
  if (!scope) throw new Error(`Unregistered initial-condition control: ${controlId}`);
  return scope;
}

export function getGenerationRequestResolutionBasisHash(request: GenerationRequestV1) {
  validateGenerationRequest(request);
  return hashCausalPayload('WorldWright/generation-request-resolution-basis/v1', {
    rootSeed: request.rootSeed,
    controls: request.controls,
    exceptionPermissions: request.exceptionPermissions,
  });
}

export function generationRequestsEqual(a: GenerationRequestV1, b: GenerationRequestV1): boolean {
  validateGenerationRequest(a);
  validateGenerationRequest(b);
  return canonicalJsonStringify(a) === canonicalJsonStringify(b);
}

export function isInitialConditionDirectInputId(value: unknown): value is InitialConditionDirectInputId {
  return typeof value === 'string' && INITIAL_CONDITION_DIRECT_INPUT_IDS.includes(value as InitialConditionDirectInputId);
}

export function isInitialConditionHintControlId(value: unknown): value is InitialConditionHintControlId {
  return value === 'legacy.planet-profile-hint' || value === 'legacy.style-mode-hint';
}

export function isInitialConditionControlId(value: unknown): value is InitialConditionControlId {
  return isInitialConditionDirectInputId(value) || isInitialConditionHintControlId(value);
}

function sortedUniqueEnum<T extends string>(values: readonly T[], allowed: readonly T[], label: string): readonly T[] {
  const normalized = [...values].sort(compareStableText) as T[];
  validateSortedUniqueEnum(normalized, allowed, label);
  return normalized;
}

function validateSortedUniqueEnum<T extends string>(value: unknown, allowed: readonly T[], label: string): readonly T[] {
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== 'string' || !allowed.includes(entry as T))) throw new Error(`${label} contain unsupported values.`);
  const normalized = [...value].sort(compareStableText);
  if (!arraysEqual(value, normalized) || new Set(value).size !== value.length) throw new Error(`${label} must be sorted and unique.`);
  return value as readonly T[];
}

function sortedUniqueText(values: readonly string[], label: string): readonly string[] {
  const normalized = [...values].sort(compareStableText);
  validateSortedUniqueText(normalized, label);
  return normalized;
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
