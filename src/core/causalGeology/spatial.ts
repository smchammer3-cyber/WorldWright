import { cloneAndDeepFreeze } from './immutable';
import type { SphericalAnchorV1, SphericalExtentV1 } from './types';

const SPHERICAL_ANCHOR_KEYS = new Set([
  'schemaVersion',
  'latitudeDegrees',
  'longitudeDegrees',
]);

const SPHERICAL_EXTENT_KEYS = new Set([
  'schemaVersion',
  'angularRadiusDegrees',
  'axisBearingDegrees',
  'elongation',
]);

export function createSphericalAnchor(latitudeDegrees: number, longitudeDegrees: number): SphericalAnchorV1 {
  const anchor: SphericalAnchorV1 = {
    schemaVersion: 1,
    latitudeDegrees,
    longitudeDegrees: normalizeLongitudeDegrees(longitudeDegrees),
  };
  validateSphericalAnchor(anchor);
  return cloneAndDeepFreeze(anchor);
}

export function createSphericalExtent(
  angularRadiusDegrees: number,
  axisBearingDegrees?: number,
  elongation?: number,
): SphericalExtentV1 {
  const extent: SphericalExtentV1 = {
    schemaVersion: 1,
    angularRadiusDegrees,
    ...(axisBearingDegrees !== undefined ? { axisBearingDegrees: normalizeBearingDegrees(axisBearingDegrees) } : {}),
    ...(elongation !== undefined ? { elongation } : {}),
  };
  validateSphericalExtent(extent);
  return cloneAndDeepFreeze(extent);
}

export function validateSphericalAnchor(value: unknown): asserts value is SphericalAnchorV1 {
  assertRecord(value, 'Spherical anchor');
  assertExactKeys(value, SPHERICAL_ANCHOR_KEYS, 'Spherical anchor');
  const anchor = value as Partial<SphericalAnchorV1>;
  if (anchor.schemaVersion !== 1 || !Number.isFinite(anchor.latitudeDegrees) || !Number.isFinite(anchor.longitudeDegrees)) throw new Error('Spherical anchor values are invalid.');
  if ((anchor.latitudeDegrees as number) < -90 || (anchor.latitudeDegrees as number) > 90) throw new RangeError('Spherical latitude must be within [-90, 90].');
  if ((anchor.longitudeDegrees as number) < -180 || (anchor.longitudeDegrees as number) >= 180) throw new RangeError('Spherical longitude must be within [-180, 180).');
}

export function validateSphericalExtent(value: unknown): asserts value is SphericalExtentV1 {
  assertRecord(value, 'Spherical extent');
  assertExactKeys(value, SPHERICAL_EXTENT_KEYS, 'Spherical extent');
  const extent = value as Partial<SphericalExtentV1>;
  if (extent.schemaVersion !== 1 || !Number.isFinite(extent.angularRadiusDegrees)) throw new Error('Spherical extent radius is invalid.');
  if ((extent.angularRadiusDegrees as number) <= 0 || (extent.angularRadiusDegrees as number) > 180) throw new RangeError('Spherical angular radius must be within (0, 180].');
  if (extent.axisBearingDegrees !== undefined && (!Number.isFinite(extent.axisBearingDegrees) || extent.axisBearingDegrees < 0 || extent.axisBearingDegrees >= 360)) {
    throw new RangeError('Spherical axis bearing must be within [0, 360).');
  }
  if (extent.elongation !== undefined && (!Number.isFinite(extent.elongation) || extent.elongation < 0 || extent.elongation > 1)) {
    throw new RangeError('Spherical elongation must be within [0, 1].');
  }
}

export function normalizeLongitudeDegrees(longitudeDegrees: number): number {
  if (!Number.isFinite(longitudeDegrees)) throw new Error('Longitude must be finite.');
  const normalized = ((longitudeDegrees + 180) % 360 + 360) % 360 - 180;
  return Object.is(normalized, -0) ? 0 : normalized;
}

export function normalizeBearingDegrees(bearingDegrees: number): number {
  if (!Number.isFinite(bearingDegrees)) throw new Error('Bearing must be finite.');
  const normalized = ((bearingDegrees % 360) + 360) % 360;
  return Object.is(normalized, -0) ? 0 : normalized;
}

function assertRecord(value: unknown, label: string): asserts value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
}

function assertExactKeys(value: Record<string, unknown>, allowedKeys: ReadonlySet<string>, label: string): void {
  for (const key of Object.keys(value)) {
    if (!allowedKeys.has(key)) throw new Error(`${label} contains an unowned field: ${key}.`);
  }
}
