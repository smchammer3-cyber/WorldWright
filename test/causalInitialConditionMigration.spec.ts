import { describe, expect, it } from 'vitest';
import {
  migrateLegacyGenerateFoundationInput,
  resolvePlanetInitialConditionBundle,
} from '../src/core/causalGeology';

describe('W1-02A current-control migration', () => {
  it('migrates only approved direct controls and records downstream fields outside causal identity', () => {
    const migration = migrateLegacyGenerateFoundationInput('1040037', {
      planetRadiusEarth: 1.1,
      waterInventory: 50,
      seaLevel: 72,
      plateActivity: 90,
      planetAge: 70,
    }, { lockedFields: ['planetRadiusEarth'] });
    const byId = Object.fromEntries(migration.request.controls.map((control) => [control.controlId, control]));
    expect(byId['planet.radius'].intent).toBe('HARD_CONSTRAINT');
    expect(byId['inventory.water'].value?.kind === 'QUANTITY' ? byId['inventory.water'].value.quantity.value : null).toBe(0.5);
    expect(migration.request.controls.map((control) => control.controlId)).not.toContain('plateActivity');
    expect(migration.migrationDetailCodes).toContain('FORBID_SOLVED_PLATE_ACTIVITY');
    expect(migration.migrationDetailCodes).toContain('RESERVE_SEA_LEVEL_FOR_SURFACE_BOUNDARY');
  });

  it('proves ignored legacy morphology cannot perturb the deterministic request or bundle', () => {
    const baseInput = { planetRadiusEarth: 1, waterInventory: 0.5 };
    const a = migrateLegacyGeneratePlanet(baseInput);
    const b = migrateLegacyGeneratePlanet({
      ...baseInput,
      cells: [{ baseHeight: 999 }],
      plates: [{ id: 99 }],
      continentSkeletons: [{ id: 4 }],
      geologyStack: 'PLATE_TECTONIC',
      resolvedPhysicalConsequences: ['FORGED'],
    });
    expect(a.request).toEqual(b.request);
    const bundleA = resolvePlanetInitialConditionBundle(a.request, { authorityMode: 'CAUSAL_SHADOW' });
    const bundleB = resolvePlanetInitialConditionBundle(b.request, { authorityMode: 'CAUSAL_SHADOW' });
    expect(bundleA).toEqual(bundleB);
  });

  it('does not let aesthetic fantasy mode grant a scientific exception', () => {
    const migration = migrateLegacyGenerateFoundationInput('seed', { styleMode: 'FANTASY' });
    expect(migration.request.exceptionPermissions).toEqual([]);
    const bundle = resolvePlanetInitialConditionBundle(migration.request, { authorityMode: 'CAUSAL_SHADOW' });
    expect(bundle.status).not.toBe('BLOCKED');
  });

  it('rejects attempts to lock comparison-only or downstream controls', () => {
    expect(() => migrateLegacyGenerateFoundationInput('seed', { plateActivity: 80 }, { lockedFields: ['plateActivity'] })).toThrow(/cannot become a hard/);
    expect(() => migrateLegacyGenerateFoundationInput('seed', { seaLevel: 50 }, { lockedFields: ['seaLevel'] })).toThrow(/cannot become a hard/);
  });
});

function migrateLegacyGeneratePlanet(input: Readonly<Record<string, unknown>>) {
  return migrateLegacyGenerateFoundationInput('legacy-isolation-seed', input);
}
