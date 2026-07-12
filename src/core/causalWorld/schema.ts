export type GeneratorAuthorityMode =
  | 'LEGACY'
  | 'CAUSAL_SHADOW'
  | 'CAUSAL_ACTIVE';

export type CausalWorldStatus = 'EMPTY' | 'SHADOW' | 'ACTIVE';

export interface CausalWorldScaffoldV1 {
  schemaVersion: 1;
  authorityMode: GeneratorAuthorityMode;
  status: CausalWorldStatus;
  premise?: Record<string, unknown>;
  interior?: Record<string, unknown>;
  regimeHistory?: Record<string, unknown>;
  geologicSpine?: Record<string, unknown>;
  eventGraph?: Record<string, unknown>;
  processRegistry?: Record<string, unknown>;
  physicalSurface?: Record<string, unknown>;
  ledgers?: Record<string, unknown>;
  scaleRegistry?: Record<string, unknown>;
  provenance?: Record<string, unknown>;
  confidence?: Record<string, unknown>;
}

export function createEmptyLegacyCausalScaffold(): CausalWorldScaffoldV1 {
  return {
    schemaVersion: 1,
    authorityMode: 'LEGACY',
    status: 'EMPTY',
  };
}

export function isCausalWorldScaffoldV1(value: unknown): value is CausalWorldScaffoldV1 {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<CausalWorldScaffoldV1>;

  return (
    candidate.schemaVersion === 1 &&
    (candidate.authorityMode === 'LEGACY' ||
      candidate.authorityMode === 'CAUSAL_SHADOW' ||
      candidate.authorityMode === 'CAUSAL_ACTIVE') &&
    (candidate.status === 'EMPTY' ||
      candidate.status === 'SHADOW' ||
      candidate.status === 'ACTIVE')
  );
}
