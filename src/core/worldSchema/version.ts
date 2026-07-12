export const CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION = 4 as const;

export type CurrentWorldDocumentSchemaVersion =
  typeof CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION;

export type KnownWorldDocumentSchemaVersion = 1 | 3 | CurrentWorldDocumentSchemaVersion;

export type DecodedWorldDocumentSchemaVersion =
  | {
      kind: 'KNOWN';
      version: KnownWorldDocumentSchemaVersion;
      sourceValue: unknown;
    }
  | {
      kind: 'UNVERSIONED';
      sourceValue: null | undefined;
    }
  | {
      kind: 'UNSUPPORTED_NEWER';
      version: number;
      sourceValue: unknown;
    }
  | {
      kind: 'UNRECOGNIZED';
      sourceValue: unknown;
    };

const STRING_VERSION_ALIASES: Readonly<Record<string, KnownWorldDocumentSchemaVersion>> = {
  '1': 1,
  '1.0': 1,
  v1: 1,
  '3': 3,
  '3.0': 3,
  v3: 3,
  '4': CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION,
  '4.0': CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION,
  v4: CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION,
};

export function decodeWorldDocumentSchemaVersion(
  sourceValue: unknown
): DecodedWorldDocumentSchemaVersion {
  if (sourceValue === null || sourceValue === undefined) {
    return { kind: 'UNVERSIONED', sourceValue };
  }

  if (typeof sourceValue === 'number') {
    if (!Number.isFinite(sourceValue) || !Number.isInteger(sourceValue) || sourceValue < 1) {
      return { kind: 'UNRECOGNIZED', sourceValue };
    }

    if (sourceValue > CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION) {
      return {
        kind: 'UNSUPPORTED_NEWER',
        version: sourceValue,
        sourceValue,
      };
    }

    if (sourceValue === 1 || sourceValue === 3 || sourceValue === CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION) {
      return {
        kind: 'KNOWN',
        version: sourceValue,
        sourceValue,
      };
    }

    return { kind: 'UNRECOGNIZED', sourceValue };
  }

  if (typeof sourceValue === 'string') {
    const normalized = sourceValue.trim().toLowerCase();
    const version = STRING_VERSION_ALIASES[normalized];

    if (version !== undefined) {
      return { kind: 'KNOWN', version, sourceValue };
    }

    if (/^\d+$/.test(normalized)) {
      const numericVersion = Number(normalized);
      if (numericVersion > CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION) {
        return {
          kind: 'UNSUPPORTED_NEWER',
          version: numericVersion,
          sourceValue,
        };
      }
    }
  }

  return { kind: 'UNRECOGNIZED', sourceValue };
}
