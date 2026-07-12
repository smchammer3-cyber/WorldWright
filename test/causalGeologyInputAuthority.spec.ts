import { describe, expect, it } from 'vitest';
import {
  FORBIDDEN_LEGACY_CAUSAL_INPUT_FIELDS,
  createCausalGeologyInput,
  createScientificQuantity,
  validateCausalGeologyInput,
  type CausalInputDeclarationV1,
} from '../src/core/causalGeology';

function direct(inputId: CausalInputDeclarationV1['inputId'], value: number, unit: string, scaleId: string): CausalInputDeclarationV1 {
  return {
    schemaVersion: 1,
    inputId,
    quantity: createScientificQuantity(value, unit, scaleId),
    sourceClass: 'DIRECT_DECLARATION',
    sourceRecordId: `fixture:${inputId}`,
    evidenceIds: [],
  };
}

describe('W1-01 causal input authority', () => {
  it('creates a canonical sanitized input without legacy interpretations', () => {
    const input = createCausalGeologyInput('1040037', [
      direct('thermal.age', 4.5, 'gigaannum', 'gigaannum-v1'),
      direct('planet.radius', 1, 'earth-radius', 'earth-radius-v1'),
    ]);
    expect(input.sourceDeclarations.map((entry) => entry.inputId)).toEqual(['planet.radius', 'thermal.age']);
    expect(input.excludedLegacyFields).toEqual(FORBIDDEN_LEGACY_CAUSAL_INPUT_FIELDS);
    expect(input.physicalInputs['planet.radius'].value).toBe(1);
    expect(() => validateCausalGeologyInput(input)).not.toThrow();
  });

  it('rejects unapproved legacy conclusions and wrong source classes', () => {
    const invalid = direct('planet.radius', 1, 'earth-radius', 'earth-radius-v1') as CausalInputDeclarationV1 & { inputId: string };
    invalid.inputId = 'planetFoundation.tectonicVigor';
    expect(() => createCausalGeologyInput('seed', [invalid as CausalInputDeclarationV1])).toThrow(/Unapproved/);
    expect(() => createCausalGeologyInput('seed', [{
      ...direct('planet.radius', 1, 'earth-radius', 'earth-radius-v1'),
      sourceClass: 'APPROVED_PHYSICAL_DERIVATION',
      formulaVersion: 'bad-v1',
    }])).toThrow(/cannot use source class/);
  });

  it('requires versioned formulas for approved derivations and rejects hash corruption', () => {
    const derived: CausalInputDeclarationV1 = {
      schemaVersion: 1,
      inputId: 'derived.mass',
      quantity: createScientificQuantity(1, 'earth-mass', 'earth-mass-v1', 'mass-from-radius-density-v1'),
      sourceClass: 'APPROVED_PHYSICAL_DERIVATION',
      sourceRecordId: 'formula:mass-from-radius-density',
      formulaVersion: 'mass-from-radius-density-v1',
      evidenceIds: [],
    };
    const input = createCausalGeologyInput('seed', [derived]);
    expect(() => validateCausalGeologyInput({ ...input, rootSeed: 'tampered' })).toThrow(/hash mismatch/);
    expect(() => createCausalGeologyInput('seed', [{ ...derived, formulaVersion: undefined }])).toThrow(/formula version/);
  });
});
