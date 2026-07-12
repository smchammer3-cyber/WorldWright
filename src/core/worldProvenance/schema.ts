import type { GeneratorAuthorityMode } from '../causalWorld/schema';
import type { ResolvedWorldFeatureFlagSnapshot, WorldFeatureFlagKey } from '../worldFeatureFlags/types';
import { createRootSeedIdentity } from '../worldRandom/seedMixer';
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
  readonly status: 'NOT_RUN' | 'RECORDED' | 'PARTIAL' | 'BLOCKED' | 'FAILED';
  readonly streamsUsed: ReadonlyArray<{ readonly name: CausalRandomStreamName; readonly version: number }>;
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

export interface CausalGeologyProvenanceV1 {
  readonly schemaVersion: 1;
  readonly inputContractVersion: 1;
  readonly stageResultContractVersion: 1;
  readonly inputHash: DeterministicHash;
  readonly sourceBundleVersion: string;
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
  readonly causalGeology?: CausalGeologyProvenanceV1;
  readonly limitations: readonly string[];
}

export function isCausalProvenanceManifestV1(value: unknown): value is CausalProvenanceManifestV1 {
  if (!isRecord(value)) return false;
  if (value.schemaVersion !== 1 || (value.completeness !== 'COMPLETE' && value.completeness !== 'PARTIAL')) return false;
  if (!isAuthorityMode(value.authorityMode)) return false;

  const rootSeed = value.rootSeed;
  if (!isRecord(rootSeed) || typeof rootSeed.exactText !== 'string' || rootSeed.encoding !== 'utf8-v1' || typeof rootSeed.fingerprint !== 'string') return false;
  if (rootSeed.fingerprint !== createRootSeedIdentity(rootSeed.exactText).fingerprint) return false;

  const randomSystem = value.randomSystem;
  if (!isRecord(randomSystem)
    || randomSystem.causalAlgorithm !== 'philox4x32-10'
    || randomSystem.causalAlgorithmVersion !== 1
    || typeof randomSystem.seedDerivationAlgorithm !== 'string'
    || randomSystem.seedEncoding !== 'utf8-v1'
    || (randomSystem.legacyGeneratorAlgorithm !== undefined && typeof randomSystem.legacyGeneratorAlgorithm !== 'string')) return false;

  const software = value.software;
  if (!isRecord(software)
    || !Number.isSafeInteger(software.worldSchemaVersion)
    || !Number.isSafeInteger(software.causalSchemaVersion)
    || typeof software.generatorVersion !== 'string'
    || typeof software.pipelineVersion !== 'string'
    || (software.buildCommit !== undefined && typeof software.buildCommit !== 'string')) return false;

  const flags = value.flags;
  if (!isRecord(flags)
    || flags.schemaVersion !== 1
    || flags.authorityMode !== value.authorityMode
    || !isRecord(flags.values)
    || !Array.isArray(flags.warnings)
    || !flags.warnings.every((warning) => typeof warning === 'string')) return false;
  for (const [key, entry] of Object.entries(flags.values)) {
    if (!isRecord(entry)
      || entry.key !== key
      || !isFeatureFlagValue(entry.value)
      || !isFeatureFlagValue(entry.defaultValue)
      || (entry.source !== 'DEFAULT' && entry.source !== 'RUN_OVERRIDE' && entry.source !== 'AUTHORITY_CONSTRAINT')
      || (entry.reason !== 'DEFAULTED' && entry.reason !== 'OVERRIDDEN' && entry.reason !== 'MODE_BLOCKED' && entry.reason !== 'INVALID_OVERRIDE')
      || typeof entry.affectsPhysicalOutput !== 'boolean') return false;
  }

  if (!Array.isArray(value.streams) || !value.streams.every(isRandomStreamProvenance)) return false;
  if (!Array.isArray(value.stages) || !value.stages.every(isStageProvenance)) return false;
  if (!Array.isArray(value.limitations) || !value.limitations.every((entry) => typeof entry === 'string')) return false;

  if (value.legacyCompatibility !== undefined) {
    const legacy = value.legacyCompatibility;
    if (!isRecord(legacy)
      || legacy.physicalGenerator !== 'LEGACY'
      || typeof legacy.randomAlgorithm !== 'string'
      || typeof legacy.explicitSeedOutputPreserved !== 'boolean'
      || typeof legacy.stageHistoryObserved !== 'boolean') return false;
  }

  if (value.causalGeology !== undefined) {
    const geology = value.causalGeology;
    if (!isRecord(geology)
      || geology.schemaVersion !== 1
      || geology.inputContractVersion !== 1
      || geology.stageResultContractVersion !== 1
      || !isOptionalDeterministicHash(geology.inputHash)
      || geology.inputHash === undefined
      || typeof geology.sourceBundleVersion !== 'string'
      || geology.sourceBundleVersion.trim().length === 0) return false;
  }

  return true;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isAuthorityMode(value: unknown): value is GeneratorAuthorityMode {
  return value === 'LEGACY' || value === 'CAUSAL_SHADOW' || value === 'CAUSAL_ACTIVE';
}

function isFeatureFlagValue(value: unknown): value is boolean | string | number {
  return typeof value === 'boolean' || typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value));
}

function isRandomStreamProvenance(value: unknown): boolean {
  return isRecord(value)
    && typeof value.name === 'string'
    && Number.isSafeInteger(value.version)
    && (value.version as number) > 0
    && typeof value.owner === 'string'
    && typeof value.keyFingerprint === 'string'
    && typeof value.purpose === 'string';
}

function isStageProvenance(value: unknown): boolean {
  if (!isRecord(value)
    || typeof value.stageId !== 'string'
    || value.stageId.length === 0
    || !Number.isSafeInteger(value.stageVersion)
    || (value.stageVersion as number) < 1
    || !['NOT_RUN', 'RECORDED', 'PARTIAL', 'BLOCKED', 'FAILED'].includes(value.status as string)
    || !Array.isArray(value.streamsUsed)
    || !Array.isArray(value.flagsUsed)
    || !Array.isArray(value.warnings)) return false;
  if (!value.streamsUsed.every((entry) => isRecord(entry)
    && typeof entry.name === 'string'
    && Number.isSafeInteger(entry.version)
    && (entry.version as number) > 0)) return false;
  if (!value.flagsUsed.every((entry) => typeof entry === 'string')) return false;
  if (!value.warnings.every((entry) => typeof entry === 'string')) return false;
  return isOptionalDeterministicHash(value.inputHash) && isOptionalDeterministicHash(value.outputHash);
}

function isOptionalDeterministicHash(value: unknown): boolean {
  return value === undefined || (isRecord(value)
    && value.algorithm === 'fnv1a64-canonical-json-v1'
    && typeof value.value === 'string'
    && /^[0-9a-f]{16}$/.test(value.value));
}
