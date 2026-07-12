import { cloneAndDeepFreeze } from './immutable';
import { assertDeterministicHash, deterministicHashEquals } from './hashes';
import type { CausalShadowArtifactEnvelopeV1, CausalShadowLoadResult } from './types';
import { validateCausalShadowRun } from './validation';

export function loadCausalShadowArtifact(value: unknown): CausalShadowLoadResult {
  if (!value || typeof value !== 'object') return Object.freeze({ status: 'QUARANTINED', reason: 'Causal shadow artifact is not an object.' });
  const candidate = value as Partial<CausalShadowArtifactEnvelopeV1> & { envelopeSchemaVersion?: unknown };
  if (typeof candidate.envelopeSchemaVersion === 'number' && candidate.envelopeSchemaVersion > 1) {
    return Object.freeze({ status: 'UNSUPPORTED_NEWER', schemaVersion: candidate.envelopeSchemaVersion, reason: 'Causal shadow artifact uses a newer envelope schema.' });
  }
  try {
    validateCausalShadowArtifactEnvelope(candidate);
    return Object.freeze({ status: 'LOADED', envelope: cloneAndDeepFreeze(candidate as CausalShadowArtifactEnvelopeV1) });
  } catch (error) {
    return Object.freeze({ status: 'QUARANTINED', reason: error instanceof Error ? error.message : 'Causal shadow artifact is invalid.' });
  }
}

export function validateCausalShadowArtifactEnvelope(value: unknown): asserts value is CausalShadowArtifactEnvelopeV1 {
  if (!value || typeof value !== 'object') throw new Error('Causal shadow artifact envelope must be an object.');
  const envelope = value as Partial<CausalShadowArtifactEnvelopeV1>;
  if (envelope.envelopeSchemaVersion !== 1) throw new Error('Unsupported causal shadow artifact envelope.');
  validateCausalShadowRun(envelope.payload);
  assertDeterministicHash(envelope.payloadHash, 'Causal shadow artifact payload');
  if (!deterministicHashEquals(envelope.payloadHash, envelope.payload.contentHash)) throw new Error('Causal shadow artifact payload hash mismatch.');
  if (!isIsoTimestamp(envelope.createdAt)) throw new Error('Causal shadow artifact timestamp is invalid.');
  for (const [label, text] of [['creator', envelope.createdBy], ['storage record ID', envelope.storageRecordId]] as const) {
    if (typeof text !== 'string' || text.trim().length === 0) throw new Error(`Causal shadow artifact ${label} is invalid.`);
  }
  if (!Array.isArray(envelope.notes) || !envelope.notes.every((note) => typeof note === 'string' && note.trim().length > 0)) throw new Error('Causal shadow artifact notes are invalid.');
}

function isIsoTimestamp(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value) && Number.isFinite(Date.parse(value));
}
