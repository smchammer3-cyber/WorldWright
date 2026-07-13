import { describe, expect, it } from 'vitest';
import {
  createCausalGeologyInputFromInitialConditionBundle,
  createEnumGenerationControl,
  createGenerationRequest,
  createQuantityGenerationControl,
  createScientificQuantity,
  resolvePlanetInitialConditionBundle,
  validatePlanetInitialConditionBundle,
} from '../src/core/causalGeology';

function quantityValues(bundle: ReturnType<typeof resolvePlanetInitialConditionBundle>) {
  return Object.fromEntries(bundle.resolvedDeclarations.map((declaration) => [declaration.inputId, declaration.quantity.value]));
}

describe('W1-02A initial-condition resolver', () => {
  it('replays byte-identically and binds the sanitizer to the bundle hash', () => {
    const request = createGenerationRequest('1040037', []);
    const a = resolvePlanetInitialConditionBundle(request, { authorityMode: 'CAUSAL_SHADOW' });
    const b = resolvePlanetInitialConditionBundle(request, { authorityMode: 'CAUSAL_SHADOW' });
    expect(a).toEqual(b);
    expect(a.status).toBe('COMPLETE');
    expect(a.resolvedDeclarations).toHaveLength(12);
    expect(() => validatePlanetInitialConditionBundle(a, request)).not.toThrow();
    const input = createCausalGeologyInputFromInitialConditionBundle(a);
    expect(input.initialConditionBundleHash).toEqual(a.contentHash);
  });

  it('preserves hard locks and blocks incompatible hard constraints without fallback', () => {
    const radius = createQuantityGenerationControl('planet.radius', createScientificQuantity(1.8, 'earth-radius', 'earth-radius-v1'), 'HARD_CONSTRAINT');
    const compatible = resolvePlanetInitialConditionBundle(createGenerationRequest('seed', [radius]), { authorityMode: 'CAUSAL_SHADOW' });
    expect(quantityValues(compatible)['planet.radius']).toBe(1.8);

    const density = createQuantityGenerationControl('planet.density', createScientificQuantity(0.5, 'earth-density', 'earth-density-v1'), 'HARD_CONSTRAINT');
    const irrelevant = createQuantityGenerationControl('star.luminosity', createScientificQuantity(1, 'solar-luminosity', 'solar-luminosity-v1'), 'HARD_CONSTRAINT');
    const blockedRequest = createGenerationRequest('seed', [radius, density, irrelevant]);
    const blocked = resolvePlanetInitialConditionBundle(blockedRequest, { authorityMode: 'CAUSAL_SHADOW' });
    expect(blocked.status).toBe('BLOCKED');
    expect(blocked.resolvedDeclarations).toEqual([]);
    expect(blocked.conflicts[0].detailCode).toBe('NO_PRIOR_FAMILY_SATISFIES_HARD_CONSTRAINTS');
    expect(blocked.conflicts[0].controlIds).toEqual(['planet.density', 'planet.radius']);
    expect(() => createCausalGeologyInputFromInitialConditionBundle(blocked)).toThrow(/Blocked/);
  });

  it('blocks conflicting declarations of the same hard control instead of selecting a source silently', () => {
    const user = createQuantityGenerationControl('planet.radius', createScientificQuantity(1, 'earth-radius', 'earth-radius-v1'), 'HARD_CONSTRAINT', 'USER');
    const template = createQuantityGenerationControl('planet.radius', createScientificQuantity(1.1, 'earth-radius', 'earth-radius-v1'), 'HARD_CONSTRAINT', 'TEMPLATE');
    const blocked = resolvePlanetInitialConditionBundle(createGenerationRequest('seed', [template, user]), { authorityMode: 'CAUSAL_SHADOW' });
    expect(blocked.status).toBe('BLOCKED');
    expect(blocked.conflicts[0]).toMatchObject({
      controlIds: ['planet.radius'],
      detailCode: 'INCOMPATIBLE_HARD_DECLARATIONS',
    });
  });

  it('lets higher-priority soft controls determine physics while retaining lower-priority request provenance', () => {
    const user = createQuantityGenerationControl('planet.radius', createScientificQuantity(1.1, 'earth-radius', 'earth-radius-v1'), 'SOFT_PREFERENCE', 'USER');
    const template = createQuantityGenerationControl('planet.radius', createScientificQuantity(0.4, 'earth-radius', 'earth-radius-v1'), 'SOFT_PREFERENCE', 'TEMPLATE');
    const userOnly = resolvePlanetInitialConditionBundle(createGenerationRequest('precedence-seed', [user]), { authorityMode: 'CAUSAL_SHADOW' });
    const combinedRequest = createGenerationRequest('precedence-seed', [template, user]);
    const combined = resolvePlanetInitialConditionBundle(combinedRequest, { authorityMode: 'CAUSAL_SHADOW' });
    expect(combined.requestHash).toEqual(combinedRequest.contentHash);
    expect(combined.resolvedCorrelatedSelections).toEqual(userOnly.resolvedCorrelatedSelections);
    expect(combined.resolvedDeclarations).toEqual(userOnly.resolvedDeclarations);
    expect(combined.softPreferences).toEqual(['planet.radius']);
  });

  it('rerolls only the requested unlocked scope while preserving all other quantities and locks', () => {
    const ageLock = createQuantityGenerationControl('thermal.age', createScientificQuantity(4.5, 'gigaannum', 'gigaannum-v1'), 'HARD_CONSTRAINT');
    const baseRequest = createGenerationRequest('reroll-seed', [ageLock]);
    const rerollRequest = createGenerationRequest('reroll-seed', [ageLock], {
      rerollScopes: ['THERMAL_INITIAL_CONDITIONS'],
      rerollOrdinal: 1,
    });
    const base = resolvePlanetInitialConditionBundle(baseRequest, { authorityMode: 'CAUSAL_SHADOW' });
    const rerolled = resolvePlanetInitialConditionBundle(rerollRequest, { authorityMode: 'CAUSAL_SHADOW' });
    expect(base.resolvedCorrelatedSelections[0].familyId).toBe(rerolled.resolvedCorrelatedSelections[0].familyId);
    const before = quantityValues(base);
    const after = quantityValues(rerolled);
    expect(before['thermal.age']).toBe(4.5);
    expect(after['thermal.age']).toBe(4.5);
    for (const inputId of Object.keys(before)) {
      if (inputId.startsWith('thermal.')) continue;
      expect(after[inputId]).toBe(before[inputId]);
    }
    expect(Object.keys(before).filter((inputId) => inputId.startsWith('thermal.') && inputId !== 'thermal.age').some((inputId) => before[inputId] !== after[inputId])).toBe(true);
  });

  it('keeps artificial branches blocked without silently granting or inventing support', () => {
    const hint = createEnumGenerationControl('legacy.planet-profile-hint', 'ARTIFICIAL_OR_FANTASY_SHELL');
    const noPermission = resolvePlanetInitialConditionBundle(createGenerationRequest('seed', [hint]), { authorityMode: 'CAUSAL_SHADOW' });
    expect(noPermission.status).toBe('BLOCKED');
    expect(noPermission.conflicts[0].detailCode).toBe('ARTIFICIAL_INITIAL_CONDITION_PERMISSION_REQUIRED');
    const permitted = resolvePlanetInitialConditionBundle(createGenerationRequest('seed', [hint], {
      exceptionPermissions: ['ALLOW_ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL'],
    }), { authorityMode: 'CAUSAL_SHADOW' });
    expect(permitted.status).toBe('BLOCKED');
    expect(permitted.conflicts[0].detailCode).toBe('ARTIFICIAL_INITIAL_CONDITION_PRIOR_NOT_IMPLEMENTED');
  });

  it('passes the committed W1-02A holdout requests without special-casing seed or fixture identity', () => {
    const holdouts = [
      createGenerationRequest('holdout-compact', [
        createQuantityGenerationControl('planet.radius', createScientificQuantity(0.55, 'earth-radius', 'earth-radius-v1'), 'HARD_CONSTRAINT'),
        createQuantityGenerationControl('planet.density', createScientificQuantity(0.8, 'earth-density', 'earth-density-v1'), 'HARD_CONSTRAINT'),
        createQuantityGenerationControl('thermal.age', createScientificQuantity(8, 'gigaannum', 'gigaannum-v1'), 'HARD_CONSTRAINT'),
      ]),
      createGenerationRequest('holdout-large', [
        createQuantityGenerationControl('planet.radius', createScientificQuantity(1.5, 'earth-radius', 'earth-radius-v1'), 'HARD_CONSTRAINT'),
        createQuantityGenerationControl('planet.density', createScientificQuantity(1.1, 'earth-density', 'earth-density-v1'), 'HARD_CONSTRAINT'),
        createQuantityGenerationControl('inventory.water', createScientificQuantity(0.1, 'earth-water-inventory', 'earth-water-inventory-v1'), 'HARD_CONSTRAINT'),
      ]),
      createGenerationRequest('holdout-volatile', [
        createQuantityGenerationControl('planet.radius', createScientificQuantity(0.5, 'earth-radius', 'earth-radius-v1'), 'HARD_CONSTRAINT'),
        createQuantityGenerationControl('planet.density', createScientificQuantity(0.6, 'earth-density', 'earth-density-v1'), 'HARD_CONSTRAINT'),
        createQuantityGenerationControl('inventory.volatiles', createScientificQuantity(2, 'earth-volatile-inventory', 'earth-volatile-inventory-v1'), 'HARD_CONSTRAINT'),
        createQuantityGenerationControl('thermal.tidal-heating', createScientificQuantity(0.5, 'normalized-0-1', 'normalized-0-1-v1'), 'HARD_CONSTRAINT'),
      ]),
    ];
    for (const request of holdouts) expect(resolvePlanetInitialConditionBundle(request, { authorityMode: 'CAUSAL_SHADOW' }).status).not.toBe('BLOCKED');
  });

  it('rejects legacy and active authority modes and detects tampering', () => {
    const request = createGenerationRequest('seed', []);
    expect(() => resolvePlanetInitialConditionBundle(request, { authorityMode: 'LEGACY' })).toThrow(/CAUSAL_SHADOW/);
    expect(() => resolvePlanetInitialConditionBundle(request, { authorityMode: 'CAUSAL_ACTIVE' })).toThrow(/CAUSAL_SHADOW/);
    const bundle = resolvePlanetInitialConditionBundle(request, { authorityMode: 'CAUSAL_SHADOW' });
    expect(() => validatePlanetInitialConditionBundle({ ...bundle, terrain: [] })).toThrow(/unowned fields/);
    expect(() => validatePlanetInitialConditionBundle({ ...bundle, resolvedDeclarations: bundle.resolvedDeclarations.slice(1) })).toThrow(/incomplete direct-input coverage|content hash mismatch/);
  });
});
