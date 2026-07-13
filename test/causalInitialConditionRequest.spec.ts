import { describe, expect, it } from 'vitest';
import {
  createGenerationRequest,
  createQuantityGenerationControl,
  createScientificQuantity,
  validateGenerationRequest,
} from '../src/core/causalGeology';
import { createWorldRandomOracle } from '../src/core/worldRandom/oracle';
import { getRandomStreamDefinition } from '../src/core/worldRandom/streamRegistry';

describe('W1-02A generation request contract', () => {
  it('canonicalizes control order and produces deterministic identity', () => {
    const radius = createQuantityGenerationControl('planet.radius', createScientificQuantity(1, 'earth-radius', 'earth-radius-v1'), 'HARD_CONSTRAINT');
    const water = createQuantityGenerationControl('inventory.water', createScientificQuantity(0.6, 'earth-water-inventory', 'earth-water-inventory-v1'), 'SOFT_PREFERENCE');
    const a = createGenerationRequest('1040037', [radius, water]);
    const b = createGenerationRequest('1040037', [water, radius]);
    expect(a).toEqual(b);
    expect(a.controls.map((control) => control.controlId)).toEqual(['inventory.water', 'planet.radius']);
    expect(Object.isFrozen(a)).toBe(true);
    expect(() => validateGenerationRequest(a)).not.toThrow();
  });

  it('rejects unowned fields, wrong quantity scales, and hard compound hints', () => {
    const request = createGenerationRequest('seed', []);
    expect(() => validateGenerationRequest({ ...request, displayName: 'operational metadata' })).toThrow(/unowned fields/);
    expect(() => createQuantityGenerationControl('planet.radius', createScientificQuantity(1, 'earth-density', 'earth-density-v1'), 'HARD_CONSTRAINT')).toThrow(/wrong quantity scale/);
    expect(() => validateGenerationRequest({
      ...request,
      controls: [{
        schemaVersion: 1,
        controlId: 'legacy.planet-profile-hint',
        intent: 'HARD_CONSTRAINT',
        value: { schemaVersion: 1, kind: 'ENUM', enumContract: 'LEGACY_PLANET_PROFILE_HINT_V1', value: 'EARTHLIKE_ROCKY' },
        source: 'USER',
        lockState: 'LOCKED',
        scope: 'BODY_AND_COMPOSITION',
      }],
    })).toThrow(/Only direct quantity controls/);
  });

  it('activates a shadow-only initial-condition random stream without enabling active authority', () => {
    const definition = getRandomStreamDefinition('causal.initial-conditions');
    expect(definition.status).toBe('ACTIVE');
    expect(definition.allowedAuthorityModes).toEqual(['CAUSAL_SHADOW']);
    const shadow = createWorldRandomOracle('seed', { authorityMode: 'CAUSAL_SHADOW' });
    expect(() => shadow.uint32({ stream: 'causal.initial-conditions', scope: ['test'], draw: 0 })).not.toThrow();
    const active = createWorldRandomOracle('seed', { authorityMode: 'CAUSAL_ACTIVE' });
    expect(() => active.uint32({ stream: 'causal.initial-conditions', scope: ['test'], draw: 0 })).toThrow(/not allowed/);
  });

  it('requires scoped reroll ordinals to be explicit and bounded', () => {
    expect(() => createGenerationRequest('seed', [], { rerollOrdinal: 1 })).toThrow(/requires at least one reroll scope/);
    const request = createGenerationRequest('seed', [], { rerollScopes: ['THERMAL_INITIAL_CONDITIONS'], rerollOrdinal: 2 });
    expect(request.rerollScopes).toEqual(['THERMAL_INITIAL_CONDITIONS']);
    expect(request.rerollOrdinal).toBe(2);
  });
});
