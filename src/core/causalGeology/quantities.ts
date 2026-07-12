import { cloneAndDeepFreeze } from './immutable';
import type { ScientificQuantityV1, ScientificRangeV1 } from './types';

export interface ScientificScaleDefinitionV1 {
  readonly unit: string;
  readonly scaleId: string;
  readonly minimum?: number;
  readonly maximum?: number;
  readonly notes: string;
}

export const CAUSAL_QUANTITY_SCALES: readonly ScientificScaleDefinitionV1[] = Object.freeze([
  Object.freeze({ unit: 'earth-radius', scaleId: 'earth-radius-v1', minimum: 0.01, notes: 'Planet radius relative to Earth.' }),
  Object.freeze({ unit: 'earth-density', scaleId: 'earth-density-v1', minimum: 0.01, notes: 'Mean density relative to Earth.' }),
  Object.freeze({ unit: 'solar-luminosity', scaleId: 'solar-luminosity-v1', minimum: 0, notes: 'Stellar luminosity relative to the Sun.' }),
  Object.freeze({ unit: 'astronomical-unit', scaleId: 'astronomical-unit-v1', minimum: 0.001, notes: 'Orbital distance in AU.' }),
  Object.freeze({ unit: 'normalized-0-1', scaleId: 'normalized-0-1-v1', minimum: 0, maximum: 1, notes: 'Dimensionless bounded normalized value.' }),
  Object.freeze({ unit: 'gigaannum', scaleId: 'gigaannum-v1', minimum: 0, notes: 'Billions of years.' }),
  Object.freeze({ unit: 'earth-water-inventory', scaleId: 'earth-water-inventory-v1', minimum: 0, notes: 'Water inventory relative to Earth.' }),
  Object.freeze({ unit: 'earth-volatile-inventory', scaleId: 'earth-volatile-inventory-v1', minimum: 0, notes: 'Volatile inventory relative to Earth.' }),
  Object.freeze({ unit: 'earth-mass', scaleId: 'earth-mass-v1', minimum: 0.000001, notes: 'Mass relative to Earth.' }),
  Object.freeze({ unit: 'earth-gravity', scaleId: 'earth-gravity-v1', minimum: 0, notes: 'Surface gravity relative to Earth.' }),
  Object.freeze({ unit: 'earth-escape-velocity', scaleId: 'earth-escape-velocity-v1', minimum: 0, notes: 'Escape velocity relative to Earth.' }),
  Object.freeze({ unit: 'earth-stellar-flux', scaleId: 'earth-stellar-flux-v1', minimum: 0, notes: 'Incident stellar flux relative to Earth.' }),
]);

const SCALE_BY_ID = new Map(CAUSAL_QUANTITY_SCALES.map((definition) => [definition.scaleId, definition]));
if (SCALE_BY_ID.size !== CAUSAL_QUANTITY_SCALES.length) throw new Error('Duplicate causal quantity scale ID.');

export function createScientificQuantity(value: number, unit: string, scaleId: string, derivationId?: string): ScientificQuantityV1 {
  const quantity: ScientificQuantityV1 = {
    schemaVersion: 1,
    value: canonicalNumber(value),
    unit,
    scaleId,
    ...(derivationId ? { derivationId } : {}),
  };
  validateScientificQuantity(quantity);
  return cloneAndDeepFreeze(quantity);
}

export function createScientificRange(min: number, max: number, unit: string, scaleId: string, confidenceSubject: string): ScientificRangeV1 {
  const range: ScientificRangeV1 = {
    schemaVersion: 1,
    min: canonicalNumber(min),
    max: canonicalNumber(max),
    unit,
    scaleId,
    confidenceSubject,
  };
  validateScientificRange(range);
  return cloneAndDeepFreeze(range);
}

export function validateScientificQuantity(value: unknown): asserts value is ScientificQuantityV1 {
  if (!value || typeof value !== 'object') throw new Error('Scientific quantity must be an object.');
  const quantity = value as Partial<ScientificQuantityV1>;
  if (quantity.schemaVersion !== 1 || !Number.isFinite(quantity.value) || Object.is(quantity.value, -0)) throw new Error('Scientific quantity value is invalid or non-canonical.');
  const scale = getScientificScale(quantity.scaleId);
  if (quantity.unit !== scale.unit) throw new Error(`Quantity unit ${String(quantity.unit)} does not match scale ${scale.scaleId}.`);
  enforceScaleBounds(quantity.value as number, scale, 'Scientific quantity');
  if (quantity.derivationId !== undefined && !isNonEmptyText(quantity.derivationId)) throw new Error('Quantity derivation ID is invalid.');
}

export function validateScientificRange(value: unknown): asserts value is ScientificRangeV1 {
  if (!value || typeof value !== 'object') throw new Error('Scientific range must be an object.');
  const range = value as Partial<ScientificRangeV1>;
  if (range.schemaVersion !== 1 || !Number.isFinite(range.min) || !Number.isFinite(range.max) || Object.is(range.min, -0) || Object.is(range.max, -0) || (range.min as number) > (range.max as number)) {
    throw new Error('Scientific range bounds are invalid or non-canonical.');
  }
  const scale = getScientificScale(range.scaleId);
  if (range.unit !== scale.unit) throw new Error(`Range unit ${String(range.unit)} does not match scale ${scale.scaleId}.`);
  enforceScaleBounds(range.min as number, scale, 'Scientific range minimum');
  enforceScaleBounds(range.max as number, scale, 'Scientific range maximum');
  if (!isNonEmptyText(range.confidenceSubject)) throw new Error('Scientific range confidence subject is invalid.');
}

export function getScientificScale(scaleId: unknown): ScientificScaleDefinitionV1 {
  if (!isNonEmptyText(scaleId)) throw new Error('Scientific scale ID is invalid.');
  const scale = SCALE_BY_ID.get(scaleId);
  if (!scale) throw new Error(`Unregistered scientific scale: ${scaleId}`);
  return scale;
}

export function assertCompatibleQuantities(a: ScientificQuantityV1, b: ScientificQuantityV1): void {
  validateScientificQuantity(a);
  validateScientificQuantity(b);
  if (a.unit !== b.unit || a.scaleId !== b.scaleId) throw new Error(`Incompatible scientific quantities: ${a.scaleId} versus ${b.scaleId}.`);
}

function canonicalNumber(value: number): number {
  if (!Number.isFinite(value)) return value;
  return Object.is(value, -0) ? 0 : value;
}

function enforceScaleBounds(value: number, scale: ScientificScaleDefinitionV1, label: string): void {
  if (scale.minimum !== undefined && value < scale.minimum) throw new RangeError(`${label} is below ${scale.scaleId} minimum.`);
  if (scale.maximum !== undefined && value > scale.maximum) throw new RangeError(`${label} is above ${scale.scaleId} maximum.`);
}

function isNonEmptyText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
