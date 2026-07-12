import type { GeologicSpineV1, InteriorStateV1, PlanetaryPremiseV1, TectonicRegimeHistoryV1 } from '../causalGeology/types';
import { validateGeologicSpine, validateInteriorState, validatePlanetaryPremise, validateTectonicRegimeHistory } from '../causalGeology/validation';
import { isCausalConfidenceLedgerV1 } from '../worldConfidence/confidence';
import type { CausalConfidenceLedgerV1 } from '../worldConfidence/types';
import type { CausalProvenanceManifestV1 } from '../worldProvenance/schema';

export type GeneratorAuthorityMode =
  | 'LEGACY'
  | 'CAUSAL_SHADOW'
  | 'CAUSAL_ACTIVE';

export type CausalWorldStatus = 'EMPTY' | 'SHADOW' | 'ACTIVE';

export interface CausalWorldScaffoldV1 {
  schemaVersion: 1;
  authorityMode: GeneratorAuthorityMode;
  status: CausalWorldStatus;
  premise?: PlanetaryPremiseV1;
  interior?: InteriorStateV1;
  regimeHistory?: TectonicRegimeHistoryV1;
  geologicSpine?: GeologicSpineV1;
  eventGraph?: Record<string, unknown>;
  processRegistry?: Record<string, unknown>;
  physicalSurface?: Record<string, unknown>;
  ledgers?: Record<string, unknown>;
  scaleRegistry?: Record<string, unknown>;
  provenance?: CausalProvenanceManifestV1;
  confidence?: CausalConfidenceLedgerV1;
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
  if (candidate.schemaVersion !== 1
    || !['LEGACY', 'CAUSAL_SHADOW', 'CAUSAL_ACTIVE'].includes(candidate.authorityMode as string)
    || !['EMPTY', 'SHADOW', 'ACTIVE'].includes(candidate.status as string)
    || (candidate.confidence !== undefined && !isCausalConfidenceLedgerV1(candidate.confidence))) return false;
  try {
    if (candidate.premise !== undefined) validatePlanetaryPremise(candidate.premise);
    if (candidate.interior !== undefined) validateInteriorState(candidate.interior);
    if (candidate.regimeHistory !== undefined) validateTectonicRegimeHistory(candidate.regimeHistory);
    if (candidate.geologicSpine !== undefined) validateGeologicSpine(candidate.geologicSpine);
    return true;
  } catch {
    return false;
  }
}
