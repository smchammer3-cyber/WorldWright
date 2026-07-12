import type { WorldBrain } from '../worldSchema';
import { CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION } from '../worldSchema/version';
import { createC02ProvenanceManifest } from './createManifest';
import { isCausalProvenanceManifestV1 } from './schema';

export interface EnsureC02ProvenanceOptions {
  readonly observedLegacyGeneration: boolean;
  readonly generatorVersion?: string;
  readonly pipelineVersion?: string;
}

/**
 * Attach honest optional C02 provenance without changing physical authority.
 * Existing valid manifests are retained. Missing legacy history is recorded as
 * partial rather than reconstructed from current terrain.
 */
export function ensureC02Provenance(
  world: WorldBrain,
  options: EnsureC02ProvenanceOptions,
): WorldBrain {
  if (!world.causal) throw new Error('C02 provenance requires the C01 causal scaffold.');
  if (world.causal.authorityMode !== 'LEGACY' || world.causal.status !== 'EMPTY') {
    throw new Error('C02 may attach provenance only while causal authority remains LEGACY/EMPTY.');
  }
  if (isCausalProvenanceManifestV1(world.causal.provenance)) return world;

  world.causal.provenance = createC02ProvenanceManifest({
    seed: world.metadata.seed,
    authorityMode: 'LEGACY',
    worldSchemaVersion: CURRENT_WORLD_DOCUMENT_SCHEMA_VERSION,
    generatorVersion: options.generatorVersion ?? world.metadata.version ?? 'unknown',
    pipelineVersion: options.pipelineVersion ?? 'legacy-generate-pipeline-v1',
    observedLegacyGeneration: options.observedLegacyGeneration,
    completeness: options.observedLegacyGeneration ? 'COMPLETE' : 'PARTIAL',
  });
  return world;
}
