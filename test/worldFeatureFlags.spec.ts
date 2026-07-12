import { describe, expect, it } from 'vitest';
import { resolveWorldFeatureFlags, worldFeatureFlagValue } from '../src/core/worldFeatureFlags/resolve';

describe('C02 world feature flags', () => {
  it('resolves deterministic defaults', () => {
    const first = resolveWorldFeatureFlags('LEGACY');
    const second = resolveWorldFeatureFlags('LEGACY');
    expect(first).toEqual(second);
    expect(worldFeatureFlagValue<boolean>(first, 'causal.provenance.enabled')).toBe(true);
    expect(worldFeatureFlagValue<boolean>(first, 'simulation.deterministic-rng.enabled')).toBe(true);
  });

  it('accepts valid overrides and rejects invalid types', () => {
    const valid = resolveWorldFeatureFlags('LEGACY', { 'causal.stage-hashes.enabled': false });
    expect(valid.values['causal.stage-hashes.enabled']).toMatchObject({ value: false, reason: 'OVERRIDDEN' });

    const invalid = resolveWorldFeatureFlags('LEGACY', { 'causal.stage-hashes.enabled': 'yes' });
    expect(invalid.values['causal.stage-hashes.enabled']).toMatchObject({ value: true, reason: 'INVALID_OVERRIDE' });
    expect(invalid.warnings[0]).toMatch(/expected boolean/);
  });

  it('ignores unknown persisted keys with a stable warning', () => {
    const snapshot = resolveWorldFeatureFlags('LEGACY', { 'unknown.flag': true });
    expect(snapshot.warnings).toEqual(['Unknown world feature flag ignored: unknown.flag']);
  });

  it('blocks shadow and active authority in LEGACY', () => {
    const snapshot = resolveWorldFeatureFlags('LEGACY', {
      'causal.shadow.enabled': true,
      'causal.active.enabled': true,
    });
    expect(snapshot.values['causal.shadow.enabled']).toMatchObject({ value: false, source: 'AUTHORITY_CONSTRAINT', reason: 'MODE_BLOCKED' });
    expect(snapshot.values['causal.active.enabled']).toMatchObject({ value: false, source: 'AUTHORITY_CONSTRAINT', reason: 'MODE_BLOCKED' });
  });

  it('returns an immutable snapshot', () => {
    const snapshot = resolveWorldFeatureFlags('LEGACY');
    expect(Object.isFrozen(snapshot)).toBe(true);
    expect(Object.isFrozen(snapshot.values)).toBe(true);
    expect(Object.isFrozen(snapshot.values['causal.provenance.enabled'])).toBe(true);
  });
});
