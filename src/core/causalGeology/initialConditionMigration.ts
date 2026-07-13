import { cloneAndDeepFreeze } from './immutable';
import { createScientificQuantity } from './quantities';
import {
  createEnumGenerationControl,
  createGenerationRequest,
  createQuantityGenerationControl,
  LEGACY_PLANET_PROFILE_HINTS,
  STYLE_MODE_HINTS,
} from './initialConditionRequest';
import type {
  GenerationRequestControlV1,
  InitialConditionDirectInputId,
  InitialConditionExceptionPermission,
  InitialConditionRerollScope,
  LegacyControlMigrationDefinitionV1,
  LegacyControlMigrationResultV1,
  LegacyGenerateFoundationField,
} from './initialConditionTypes';
import type { RootSeedIdentity } from '../worldRandom/types';

export const LEGACY_CONTROL_MIGRATION_REGISTRY_V1: readonly LegacyControlMigrationDefinitionV1[] = Object.freeze([
  define('albedo', 'DIRECT_CONTROL', 'climate.declared-albedo', true, 'MIGRATE_DECLARED_ALBEDO_V1'),
  define('compositionRadioactivity', 'RESERVED_INACTIVE', undefined, false, 'RESERVE_COMPOSITION_RADIOACTIVITY_FOR_W1_03'),
  define('coreHeatIntent', 'RESERVED_INACTIVE', undefined, false, 'RESERVE_CORE_HEAT_INTENT_FOR_W1_03'),
  define('erosionIntensity', 'DOWNSTREAM_ONLY', undefined, false, 'RESERVE_EROSION_FOR_SURFACE_EVOLUTION'),
  define('greenhouseStrength', 'DIRECT_CONTROL', 'climate.declared-greenhouse', true, 'MIGRATE_DECLARED_GREENHOUSE_V1'),
  define('moistureLevel', 'DOWNSTREAM_ONLY', undefined, false, 'RESERVE_MOISTURE_FOR_PROVISIONAL_ENVIRONMENT'),
  define('orbitalDistanceAU', 'DIRECT_CONTROL', 'orbit.distance', true, 'MIGRATE_ORBIT_DISTANCE_AU_V1'),
  define('planetAge', 'RESERVED_INACTIVE', undefined, false, 'PLANET_AGE_SCALE_NOT_APPROVED'),
  define('planetDensityEarth', 'DIRECT_CONTROL', 'planet.density', true, 'MIGRATE_PLANET_DENSITY_EARTH_V1'),
  define('planetProfile', 'SOFT_HINT', 'legacy.planet-profile-hint', false, 'MIGRATE_PLANET_PROFILE_AS_HINT_ONLY'),
  define('planetRadiusEarth', 'DIRECT_CONTROL', 'planet.radius', true, 'MIGRATE_PLANET_RADIUS_EARTH_V1'),
  define('plateActivity', 'COMPARISON_ONLY', undefined, false, 'FORBID_SOLVED_PLATE_ACTIVITY'),
  define('seaLevel', 'DOWNSTREAM_ONLY', undefined, false, 'RESERVE_SEA_LEVEL_FOR_SURFACE_BOUNDARY'),
  define('seaLevelOffset', 'DOWNSTREAM_ONLY', undefined, false, 'RESERVE_SEA_LEVEL_OFFSET_FOR_SURFACE_BOUNDARY'),
  define('stagnantLidBias', 'COMPARISON_ONLY', undefined, false, 'FORBID_SOLVED_LID_BIAS'),
  define('starLuminositySun', 'DIRECT_CONTROL', 'star.luminosity', true, 'MIGRATE_STAR_LUMINOSITY_SUN_V1'),
  define('styleMode', 'SOFT_HINT', 'legacy.style-mode-hint', false, 'MIGRATE_STYLE_MODE_AS_HINT_ONLY'),
  define('temperatureOffset', 'DOWNSTREAM_ONLY', undefined, false, 'RESERVE_TEMPERATURE_OFFSET_FOR_PROVISIONAL_ENVIRONMENT'),
  define('tidalHeatingIntent', 'RESERVED_INACTIVE', undefined, false, 'TIDAL_HEATING_INTENT_SCALE_NOT_APPROVED'),
  define('volatileInventory', 'DIRECT_CONTROL', 'inventory.volatiles', true, 'MIGRATE_VOLATILE_INVENTORY_COMPAT_V1'),
  define('waterInventory', 'DIRECT_CONTROL', 'inventory.water', true, 'MIGRATE_WATER_INVENTORY_COMPAT_V1'),
]);

const MIGRATION_BY_FIELD = new Map(LEGACY_CONTROL_MIGRATION_REGISTRY_V1.map((entry) => [entry.field, entry]));
if (MIGRATION_BY_FIELD.size !== LEGACY_CONTROL_MIGRATION_REGISTRY_V1.length) throw new Error('Duplicate legacy control migration field.');

export interface MigrateLegacyGenerateFoundationInputOptionsV1 {
  readonly lockedFields?: readonly LegacyGenerateFoundationField[];
  readonly exceptionPermissions?: readonly InitialConditionExceptionPermission[];
  readonly rerollScopes?: readonly InitialConditionRerollScope[];
  readonly rerollOrdinal?: number;
  readonly sourceTemplateId?: string;
  readonly sourceTemplateVersion?: string;
}

export function migrateLegacyGenerateFoundationInput(
  rootSeed: string | number | RootSeedIdentity,
  legacyInput: Readonly<Record<string, unknown>>,
  options: MigrateLegacyGenerateFoundationInputOptionsV1 = {},
): LegacyControlMigrationResultV1 {
  if (!legacyInput || typeof legacyInput !== 'object' || Array.isArray(legacyInput)) throw new Error('Legacy generation input must be a plain object.');
  const prototype = Object.getPrototypeOf(legacyInput);
  if (prototype !== Object.prototype && prototype !== null) throw new Error('Legacy generation input must be a plain object.');
  const lockedFields = sortedUniqueKnownFields(options.lockedFields ?? [], 'Locked legacy generation fields');
  const controls: GenerationRequestControlV1[] = [];
  const observedFields: LegacyGenerateFoundationField[] = [];
  const ignoredFields: string[] = [];
  const migrationDetailCodes: string[] = [];

  for (const field of Object.keys(legacyInput).sort(compareStableText)) {
    const definition = MIGRATION_BY_FIELD.get(field as LegacyGenerateFoundationField);
    if (!definition) {
      ignoredFields.push(field);
      continue;
    }
    observedFields.push(definition.field);
    migrationDetailCodes.push(definition.detailCode);
    const value = legacyInput[field];
    if (value === undefined) continue;
    const locked = lockedFields.includes(definition.field);
    if (locked && !definition.hardConstraintEligible) throw new Error(`Legacy field ${definition.field} cannot become a hard initial-condition constraint.`);
    if (definition.disposition === 'DIRECT_CONTROL') {
      controls.push(createLegacyQuantityControl(definition.field, definition.targetControlId as InitialConditionDirectInputId, value, locked));
    } else if (definition.field === 'planetProfile') {
      if (typeof value !== 'string' || !LEGACY_PLANET_PROFILE_HINTS.includes(value as never)) throw new Error('Legacy planetProfile is invalid.');
      controls.push(createEnumGenerationControl('legacy.planet-profile-hint', value));
    } else if (definition.field === 'styleMode') {
      if (typeof value !== 'string' || !STYLE_MODE_HINTS.includes(value as never)) throw new Error('Legacy styleMode is invalid.');
      controls.push(createEnumGenerationControl('legacy.style-mode-hint', value));
    }
  }

  for (const lockedField of lockedFields) {
    if (!(lockedField in legacyInput)) throw new Error(`Locked legacy field ${lockedField} is missing from the generation input.`);
  }

  const request = createGenerationRequest(rootSeed, controls, {
    exceptionPermissions: options.exceptionPermissions,
    rerollScopes: options.rerollScopes,
    rerollOrdinal: options.rerollOrdinal,
    sourceTemplateId: options.sourceTemplateId,
    sourceTemplateVersion: options.sourceTemplateVersion,
  });
  return cloneAndDeepFreeze({
    request,
    observedFields: [...observedFields].sort(compareStableText),
    ignoredFields: [...ignoredFields].sort(compareStableText),
    migrationDetailCodes: [...new Set(migrationDetailCodes)].sort(compareStableText),
  });
}

function createLegacyQuantityControl(
  field: LegacyGenerateFoundationField,
  controlId: InitialConditionDirectInputId,
  rawValue: unknown,
  locked: boolean,
): GenerationRequestControlV1 {
  if (typeof rawValue !== 'number' || !Number.isFinite(rawValue)) throw new Error(`Legacy field ${field} must be a finite number.`);
  const spec = quantitySpec(controlId);
  const normalizedValue = spec.compatUnit01 ? normalizeLegacyUnit01(rawValue, field) : rawValue;
  return createQuantityGenerationControl(
    controlId,
    createScientificQuantity(normalizedValue, spec.unit, spec.scaleId),
    locked ? 'HARD_CONSTRAINT' : 'SOFT_PREFERENCE',
    'USER',
  );
}

function quantitySpec(controlId: InitialConditionDirectInputId): { readonly unit: string; readonly scaleId: string; readonly compatUnit01: boolean } {
  switch (controlId) {
    case 'planet.radius': return { unit: 'earth-radius', scaleId: 'earth-radius-v1', compatUnit01: false };
    case 'planet.density': return { unit: 'earth-density', scaleId: 'earth-density-v1', compatUnit01: false };
    case 'star.luminosity': return { unit: 'solar-luminosity', scaleId: 'solar-luminosity-v1', compatUnit01: false };
    case 'orbit.distance': return { unit: 'astronomical-unit', scaleId: 'astronomical-unit-v1', compatUnit01: false };
    case 'climate.declared-albedo':
    case 'climate.declared-greenhouse':
      return { unit: 'normalized-0-1', scaleId: 'normalized-0-1-v1', compatUnit01: true };
    case 'inventory.water': return { unit: 'earth-water-inventory', scaleId: 'earth-water-inventory-v1', compatUnit01: true };
    case 'inventory.volatiles': return { unit: 'earth-volatile-inventory', scaleId: 'earth-volatile-inventory-v1', compatUnit01: true };
    default: throw new Error(`Legacy migration does not activate ${controlId}.`);
  }
}

function normalizeLegacyUnit01(value: number, field: string): number {
  if (value < 0) throw new RangeError(`Legacy field ${field} cannot be negative.`);
  if (value <= 1) return value;
  if (value <= 100) return value / 100;
  throw new RangeError(`Legacy field ${field} exceeds the versioned 0..1 or 0..100 compatibility range.`);
}

function sortedUniqueKnownFields(values: readonly LegacyGenerateFoundationField[], label: string): readonly LegacyGenerateFoundationField[] {
  if (!Array.isArray(values) || values.some((field) => !MIGRATION_BY_FIELD.has(field))) throw new Error(`${label} contain unsupported fields.`);
  const normalized = [...values].sort(compareStableText);
  if (new Set(normalized).size !== normalized.length) throw new Error(`${label} must be unique.`);
  return normalized;
}

function define(
  field: LegacyGenerateFoundationField,
  disposition: LegacyControlMigrationDefinitionV1['disposition'],
  targetControlId: LegacyControlMigrationDefinitionV1['targetControlId'],
  hardConstraintEligible: boolean,
  detailCode: string,
): LegacyControlMigrationDefinitionV1 {
  return Object.freeze({ field, disposition, ...(targetControlId ? { targetControlId } : {}), hardConstraintEligible, detailCode });
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
