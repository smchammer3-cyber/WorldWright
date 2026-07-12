import type { GeologicSpineV1, InteriorStateV1, PlanetaryPremiseV1, TectonicRegimeHistoryV1 } from '../causalGeology/types';
import { validateCausalDomainReferences, validateGeologicSpine, validateInteriorState, validatePlanetaryPremise, validateTectonicRegimeHistory } from '../causalGeology/validation';
import { isCausalConfidenceLedgerV1 } from '../worldConfidence/confidence';
import type { CausalConfidenceLedgerV1 } from '../worldConfidence/types';
import { isCausalProvenanceManifestV1, type CausalProvenanceManifestV1 } from '../worldProvenance/schema';

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
  provenance?: CausalProvenanceManifestV1;
  confidence?: CausalConfidenceLedgerV1;
}

const SCAFFOLD_KEYS = new Set<keyof CausalWorldScaffoldV1>([
  'schemaVersion',
  'authorityMode',
  'status',
  'premise',
  'interior',
  'regimeHistory',
  'geologicSpine',
  'provenance',
  'confidence',
]);

export function createEmptyLegacyCausalScaffold(): CausalWorldScaffoldV1 {
  return {
    schemaVersion: 1,
    authorityMode: 'LEGACY',
    status: 'EMPTY',
  };
}

export function isCausalWorldScaffoldV1(value: unknown): value is CausalWorldScaffoldV1 {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const candidate = value as Partial<CausalWorldScaffoldV1>;
  if (Object.keys(candidate).some((key) => !SCAFFOLD_KEYS.has(key as keyof CausalWorldScaffoldV1))) return false;
  if (candidate.schemaVersion !== 1
    || !['LEGACY', 'CAUSAL_SHADOW', 'CAUSAL_ACTIVE'].includes(candidate.authorityMode as string)
    || !['EMPTY', 'SHADOW', 'ACTIVE'].includes(candidate.status as string)
    || !authorityStatusMatch(candidate.authorityMode, candidate.status)
    || (candidate.confidence !== undefined && !isCausalConfidenceLedgerV1(candidate.confidence))
    || (candidate.provenance !== undefined && !isCausalProvenanceManifestV1(candidate.provenance))
    || (candidate.provenance !== undefined && candidate.provenance.authorityMode !== candidate.authorityMode)) return false;
  try {
    if (candidate.premise !== undefined) validatePlanetaryPremise(candidate.premise);
    if (candidate.interior !== undefined) validateInteriorState(candidate.interior);
    if (candidate.regimeHistory !== undefined) validateTectonicRegimeHistory(candidate.regimeHistory);
    if (candidate.geologicSpine !== undefined) validateGeologicSpine(candidate.geologicSpine);
    if (candidate.authorityMode === 'LEGACY' && [candidate.premise, candidate.interior, candidate.regimeHistory, candidate.geologicSpine].some((entry) => entry !== undefined)) return false;
    if (candidate.interior !== undefined && candidate.premise === undefined) return false;
    if (candidate.regimeHistory !== undefined && candidate.interior === undefined) return false;
    if (candidate.geologicSpine !== undefined && candidate.regimeHistory === undefined) return false;
    if ([candidate.premise, candidate.interior, candidate.regimeHistory, candidate.geologicSpine].some((entry) => entry !== undefined)) {
      if (!candidate.confidence) return false;
      validateCausalDomainReferences({ premise: candidate.premise, interior: candidate.interior, regimeHistory: candidate.regimeHistory, geologicSpine: candidate.geologicSpine }, candidate.confidence);
    }
    return true;
  } catch {
    return false;
  }
}

function authorityStatusMatch(authorityMode: GeneratorAuthorityMode | undefined, status: CausalWorldStatus | undefined): boolean {
  return (authorityMode === 'LEGACY' && status === 'EMPTY')
    || (authorityMode === 'CAUSAL_SHADOW' && status === 'SHADOW');
}
