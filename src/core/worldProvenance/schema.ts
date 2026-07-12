import type { GeneratorAuthorityMode } from '../causalWorld/schema';
import type { ResolvedWorldFeatureFlagSnapshot, WorldFeatureFlagKey } from '../worldFeatureFlags/types';
import type { CausalRandomStreamName, RootSeedIdentity } from '../worldRandom/types';
import type { DeterministicHash } from './hash';

export interface RandomSystemProvenance {
  readonly causalAlgorithm: 'philox4x32-10';
  readonly causalAlgorithmVersion: 1;
  readonly seedDerivationAlgorithm: string;
  readonly seedEncoding: 'utf8-v1';
  readonly legacyGeneratorAlgorithm?: string;
}

export interface SoftwareProvenance {
  readonly worldSchemaVersion: number;
  readonly causalSchemaVersion: number;
  readonly generatorVersion: string;
  readonly pipelineVersion: string;
  readonly buildCommit?: string;
}

export interface RandomStreamProvenance {
  readonly name: CausalRandomStreamName;
  readonly version: number;
  readonly owner: string;
  readonly keyFingerprint: string;
  readonly purpose: string;
}

export interface StageProvenanceRecord {
  readonly stageId: string;
  readonly stageVersion: number;
  readonly status: 'NOT_RUN' | 'RECORDED' | 'FAILED';
  readonly streamsUsed: readonly Array<{ readonly name: CausalRandomStreamName; readonly version: number }>;
  readonly flagsUsed: readonly WorldFeatureFlagKey[];
  readonly inputHash?: DeterministicHash;
  readonly outputHash?: DeterministicHash;
  readonly warnings: readonly string[];
}

export interface LegacyCompatibilityProvenance {
  readonly physicalGenerator: 'LEGACY';
  readonly randomAlgorithm: string;
  readonly explicitSeedOutputPreserved: boolean;
  readonly stageHistoryObserved: boolean;
}

export interface CausalProvenanceManifestV1 {
  readonly schemaVersion: 1;
  readonly completeness: 'COMPLETE' | 'PARTIAL';
  readonly rootSeed: RootSeedIdentity;
  readonly authorityMode: GeneratorAuthorityMode;
  readonly randomSystem: RandomSystemProvenance;
  readonly flags: ResolvedWorldFeatureFlagSnapshot;
  readonly software: SoftwareProvenance;
  readonly streams: readonly RandomStreamProvenance[];
  readonly stages: readonly StageProvenanceRecord[];
  readonly legacyCompatibility?: LegacyCompatibilityProvenance;
  readonly limitations: readonly string[];
}

export function isCausalProvenanceManifestV1(value: unknown): value is CausalProvenanceManifestV1 {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<CausalProvenanceManifestV1>;
  return candidate.schemaVersion === 1
    && (candidate.completeness === 'COMPLETE' || candidate.completeness === 'PARTIAL')
    && Boolean(candidate.rootSeed && typeof candidate.rootSeed.exactText === 'string')
    && (candidate.authorityMode === 'LEGACY' || candidate.authorityMode === 'CAUSAL_SHADOW' || candidate.authorityMode === 'CAUSAL_ACTIVE')
    && Boolean(candidate.flags && candidate.flags.schemaVersion === 1)
    && Array.isArray(candidate.streams)
    && Array.isArray(candidate.stages)
    && Array.isArray(candidate.limitations);
}
