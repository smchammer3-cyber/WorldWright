import { describe, expect, it } from 'vitest';
import { createSphericalAnchor, createSphericalExtent, normalizeBearingDegrees, normalizeLongitudeDegrees } from '../src/core/causalGeology';

describe('W1-01 resolution-independent spatial contracts', () => {
  it('normalizes longitude and bearing deterministically', () => {
    expect(normalizeLongitudeDegrees(540)).toBe(-180);
    expect(normalizeLongitudeDegrees(-181)).toBe(179);
    expect(normalizeBearingDegrees(-10)).toBe(350);
    expect(createSphericalAnchor(10, 190).longitudeDegrees).toBe(-170);
  });

  it('rejects grid-like or invalid spherical geometry', () => {
    expect(() => createSphericalAnchor(91, 0)).toThrow(/latitude/);
    expect(() => createSphericalExtent(0)).toThrow(/angular radius/);
    expect(() => createSphericalExtent(10, 20, 1.1)).toThrow(/elongation/);
  });
});
