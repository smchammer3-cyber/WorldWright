import { describe, expect, it } from 'vitest';
import {
  CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION,
  decodeWorldDocumentSchemaVersion,
} from '../src/core/worldSchema/version';
import {
  createEmptyLegacyCausalScaffold,
  isCausalWorldScaffoldV1,
} from '../src/core/causalWorld/schema';

describe('world document schema version decoding', () => {
  it.each([
    [1, 1],
    ['1', 1],
    ['1.0', 1],
    ['v1', 1],
    [3, 3],
    ['3', 3],
    ['3.0', 3],
    ['v3', 3],
    [4, CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION],
    ['4', CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION],
    ['4.0', CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION],
    ['v4', CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION],
  ])('recognizes %p as schema %i', (sourceValue, version) => {
    expect(decodeWorldDocumentSchemaVersion(sourceValue)).toEqual({
      kind: 'KNOWN',
      version,
      sourceValue,
    });
  });

  it('keeps absent versions distinct for structural classification', () => {
    expect(decodeWorldDocumentSchemaVersion(undefined)).toEqual({
      kind: 'UNVERSIONED',
      sourceValue: undefined,
    });
    expect(decodeWorldDocumentSchemaVersion(null)).toEqual({
      kind: 'UNVERSIONED',
      sourceValue: null,
    });
  });

  it('rejects unsupported newer versions without coercion', () => {
    expect(decodeWorldDocumentSchemaVersion(5)).toEqual({
      kind: 'UNSUPPORTED_NEWER',
      version: 5,
      sourceValue: 5,
    });
    expect(decodeWorldDocumentSchemaVersion('999')).toEqual({
      kind: 'UNSUPPORTED_NEWER',
      version: 999,
      sourceValue: '999',
    });
  });

  it.each([2, '2', 0, -1, 1.5, 'banana', {}, []])(
    'fails closed for unrecognized version %p',
    (sourceValue) => {
      expect(decodeWorldDocumentSchemaVersion(sourceValue)).toEqual({
        kind: 'UNRECOGNIZED',
        sourceValue,
      });
    }
  );
});

describe('empty causal scaffold', () => {
  it('creates only a LEGACY empty authority container', () => {
    const scaffold = createEmptyLegacyCausalScaffold();

    expect(scaffold).toEqual({
      schemaVersion: 1,
      authorityMode: 'LEGACY',
      status: 'EMPTY',
    });
    expect(isCausalWorldScaffoldV1(scaffold)).toBe(true);
  });

  it('rejects incomplete or invalid authority containers', () => {
    expect(isCausalWorldScaffoldV1(null)).toBe(false);
    expect(isCausalWorldScaffoldV1({ schemaVersion: 1 })).toBe(false);
    expect(
      isCausalWorldScaffoldV1({
        schemaVersion: 1,
        authorityMode: 'LEGACY',
        status: 'ACTIVE',
      })
    ).toBe(true);
    expect(
      isCausalWorldScaffoldV1({
        schemaVersion: 2,
        authorityMode: 'LEGACY',
        status: 'EMPTY',
      })
    ).toBe(false);
  });
});
