import type { GeneratorAuthorityMode } from '../causalWorld/schema';
import { resolveWorldFeatureFlags } from '../worldFeatureFlags/resolve';
import type { ResolvedWorldFeatureFlagSnapshot, WorldFeatureFlagOverrides } from '../worldFeatureFlags/types';
import { derivePhiloxKey, createRootSeedIdentity, RANDOM_SEED_MIXER } from '../worldRandom/seedMixer';
import { CAUSAL_RANDOM_STREAM_DEFINITIONS } from '../worldRandom/streamRegistry';
import type { RootSeedIdentity } from '../worldRandom/types';
import type {
  CausalProvenanceManifestV1,
  RandomStreamProvenance,
  SoftwareProvenance,
} from './schema';

export interface CreateC02ManifestOptions {
  readonly seed: string | number | RootSeedIdentity;
  readonly authorityMode?: GeneratorAuthorityMode;
  readonly flags?: ResolvedWorldFeatureFlagSnapshot;
  readonly flagOverrides?: WorldFeatureFlagOverrides;
  readonly worldSchemaVersion: number;
  readonly generatorVersion: string;
  readonly pipelineVersion: string;
  readonly buildCommit?: string;
  readonly completeness?: 'COMPLETE' | 'PARTIAL';
  readonly observedLegacyGeneration?: boolean;
  readonly limitations?: readonly string[];
}

export function createC02ProvenanceManifest(options: CreateC02ManifestOptions): CausalProvenanceManifestV1 {
  const authorityMode = options.authorityMode ?? 'LEGACY';
  const rootSeed = isRootSeed(options.seed) ? options.seed : createRootSeedIdentity(options.seed);
  const flags = options.flags ?? resolveWorldFeatureFlags(authorityMode, options.flagOverrides);
  const software: SoftwareProvenance = Object.freeze({
    worldSchemaVersion: options.worldSchemaVersion,
    causalSchemaVersion: 1,
    generatorVersion: options.generatorVersion,
    pipelineVersion: options.pipelineVersion,
    ...(options.buildCommit ? { buildCommit: options.buildCommit } : {}),
  });
  const streams: readonly RandomStreamProvenance[] = Object.freeze(
    CAUSAL_RANDOM_STREAM_DEFINITIONS.map((definition) => {
      const key = derivePhiloxKey(rootSeed, definition.name, definition.version);
      return Object.freeze({
        name: definition.name,
        version: definition.version,
        owner: definition.owner,
        keyFingerprint: `philox-key-${key[1].toString(16).padStart(8, '0')}${key[0].toString(16).padStart(8, '0')}`,
        purpose: definition.purpose,
      });
    }),
  );
  const observedLegacyGeneration = options.observedLegacyGeneration ?? false;
  const defaultLimitations = observedLegacyGeneration
    ? [
        'Visible physical terrain was produced by the unchanged legacy generator, not by Philox.',
        'Causal world domains remain empty and have no physical authority.',
      ]
    : [
        'Pre-C02 generation history was not observed; causal stage history is intentionally absent.',
        'Visible physical terrain is attributed to the legacy generator only.',
      ];

  return Object.freeze({
    schemaVersion: 1,
    completeness: options.completeness ?? (observedLegacyGeneration ? 'COMPLETE' : 'PARTIAL'),
    rootSeed,
    authorityMode,
    randomSystem: Object.freeze({
      causalAlgorithm: 'philox4x32-10',
      causalAlgorithmVersion: 1,
      seedDerivationAlgorithm: RANDOM_SEED_MIXER,
      seedEncoding: 'utf8-v1',
      legacyGeneratorAlgorithm: 'mulberry32-and-local-hash-jitter',
    }),
    flags,
    software,
    streams,
    stages: Object.freeze([]),
    legacyCompatibility: Object.freeze({
      physicalGenerator: 'LEGACY',
      randomAlgorithm: 'mulberry32-and-local-hash-jitter',
      explicitSeedOutputPreserved: true,
      stageHistoryObserved: observedLegacyGeneration,
    }),
    limitations: Object.freeze([...(options.limitations ?? defaultLimitations)]),
  });
}

function isRootSeed(value: string | number | RootSeedIdentity): value is RootSeedIdentity {
  return typeof value === 'object' && value !== null && value.encoding === 'utf8-v1';
}
