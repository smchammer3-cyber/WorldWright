import { describe, expect, it } from 'vitest';
import { assertCompatibleQuantities, createScientificQuantity, createScientificRange } from '../src/core/causalGeology';

describe('W1-01 scientific quantity contracts', () => {
  it('validates explicit units, scales, and ranges', () => {
    const radius = createScientificQuantity(1, 'earth-radius', 'earth-radius-v1');
    const range = createScientificRange(0.2, 0.8, 'normalized-0-1', 'normalized-0-1-v1', 'interior.convection');
    expect(radius.value).toBe(1);
    expect(range.max).toBe(0.8);
    expect(Object.isFrozen(radius)).toBe(true);
  });

  it('rejects mismatched units and invalid bounds', () => {
    expect(() => createScientificQuantity(1, 'earth-mass', 'earth-radius-v1')).toThrow(/does not match/);
    expect(() => createScientificRange(0.8, 0.2, 'normalized-0-1', 'normalized-0-1-v1', 'bad')).toThrow(/bounds/);
    expect(() => createScientificQuantity(1.2, 'normalized-0-1', 'normalized-0-1-v1')).toThrow(/maximum/);
  });

  it('fails incompatible comparisons explicitly', () => {
    const radius = createScientificQuantity(1, 'earth-radius', 'earth-radius-v1');
    const mass = createScientificQuantity(1, 'earth-mass', 'earth-mass-v1', 'mass-from-radius-density-v1');
    expect(() => assertCompatibleQuantities(radius, mass)).toThrow(/Incompatible/);
  });
});
