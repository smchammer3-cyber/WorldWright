import { describe, expect, it } from 'vitest';
import {
  FORBIDDEN_LEGACY_CAUSAL_INPUT_FIELDS,
  createCausalGeologyInput,
  createScientificQuantity,
  hashCausalPayload,
  validateCausalGeologyInput,
  type CausalInputDeclarationV1,
} from '../src/core/causalGeology';

const INITIAL_CONDITION_HASH = hashCausalPayload('fixture/planet-initial-condition-bundle/v1', { profile: 'fixture' });

function direct(inputId: CausalInputDeclarationV1['inputId'], value: number, unit: string, scaleId: string): CausalInputDeclarationV1 {
  return {
    schemaVersion: 1,
    inputId,
    quantity: createScientificQuantity(value, unit, scaleId),
    sourceClass: 'DIRECT_DECLARATION',
    sourceRecordId: `fixture:${inputId}`,
    confidenceSubject: `input.${inputId}`,
    evidenceIds: [],
  };
}

describe('W1-01 causal input authority', () => {
  it('creates a canonical sanitizer output bound to a compatible initial-condition bundle', () => {
    const input = createCausalGeologyInput('1040037', [
      direct('thermal.age', 4.5, 'gigaannum', 'gigaannum-v1'),
      direct('planet.radius', 1, 'earth-radius', 'earth-radius-v1'),
    ], { initialConditionBundleHash: INITIAL_CONDITION_HASH });
    expect(input.rootSeed).toMatchObject({ exactText: '1040037', encoding: 'utf8-v1' });
    expect(input.initialConditionContract).toBe('PLANET_INITIAL_CONDITION_BUNDLE_V1');
    expect(input.initialConditionBundleHash).toEqual(INITIAL_CONDITION_HASH);
    expect(input.sourceDeclarations.map((entry) => entry.inputId)).toEqual(['planet.radius', 'thermal.age']);
    expect(input.excludedLegacyFields).toEqual(FORBIDDEN_LEGACY_CAUSAL_INPUT_FIELDS);
    expect(input.physicalInputs['planet.radius'].value).toBe(1);
    expect(() => validateCausalGeologyInput(input)).not.toThrow();
  });

  it('rejects unapproved legacy conclusions and wrong source classes', () => {
    const invalid = { ...direct('planet.radius', 1, 'earth-radius', 'earth-radius-v1'), inputId: 'planetFoundation.tectonicVigor' as never };
    expect(() => createCausalGeologyInput('seed', [invalid], { initialConditionBundleHash: INITIAL_CONDITION_HASH })).toThrow(/Unapproved/);
    expect(() => createCausalGeologyInput('seed', [{
      ...direct('planet.radius', 1, 'earth-radius', 'earth-radius-v1'),
      sourceClass: 'APPROVED_PHYSICAL_DERIVATION',
      formulaVersion: 'bad-v1',
    }], { initialConditionBundleHash: INITIAL_CONDITION_HASH })).toThrow(/cannot use source class/);
  });

  it('keeps reserved derivations inactive until their formula is implemented and reviewed', () => {
    const derived: CausalInputDeclarationV1 = {
      schemaVersion: 1,
      inputId: 'derived.mass',
      quantity: createScientificQuantity(1, 'earth-mass', 'earth-mass-v1', 'mass-from-radius-density-v1'),
      sourceClass: 'APPROVED_PHYSICAL_DERIVATION',
      sourceRecordId: 'formula:mass-from-radius-density',
      formulaVersion: 'mass-from-radius-density-v1',
      confidenceSubject: 'input.derived.mass',
      evidenceIds: [],
    };
    expect(() => createCausalGeologyInput('seed', [derived], { initialConditionBundleHash: INITIAL_CONDITION_HASH })).toThrow(/reserved and not yet approved/);
  });

  it('rejects forged seed, initial-condition, and direct-derivation identities', () => {
    const input = createCausalGeologyInput('seed', [direct('planet.radius', 1, 'earth-radius', 'earth-radius-v1')], { initialConditionBundleHash: INITIAL_CONDITION_HASH });
    expect(() => validateCausalGeologyInput({ ...input, rootSeed: { ...input.rootSeed, exactText: 'tampered' } })).toThrow(/fingerprint mismatch/);
    expect(() => validateCausalGeologyInput({ ...input, initialConditionBundleHash: { ...INITIAL_CONDITION_HASH, value: 'bad' } })).toThrow(/hash is invalid/);
    expect(() => createCausalGeologyInput('seed', [{
      ...direct('planet.radius', 1, 'earth-radius', 'earth-radius-v1'),
      quantity: createScientificQuantity(1, 'earth-radius', 'earth-radius-v1', 'fake-derivation'),
    }], { initialConditionBundleHash: INITIAL_CONDITION_HASH })).toThrow(/cannot declare derivation metadata/);
  });
});
