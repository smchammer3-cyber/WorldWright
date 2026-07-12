import { cloneAndDeepFreeze } from './immutable';
import { assertDeterministicHash, deterministicHashEquals } from './hashes';
import { validateCausalShadowRun } from './scopeValidation';
import type { CausalShadowArtifactEnvelopeV1, CausalShadowLoadResult } from './types';

export function loadCausalShadowArtifact(value: unknown): CausalShadowLoadResult {
  if (!value || typeof value !== 'object') return Object.freeze({ status: 'QUARANTINED', reason: 'Causal shadow artifact is not an object.' });
  const future = detectUnsupportedNewerSchema(value);
  if (future) return Object.freeze({ status: 'UNSUPPORTED_NEWER', schemaVersion: future.version, reason: future.reason });
  try {
    validateCausalShadowArtifactEnvelope(value);
    return Object.freeze({ status: 'LOADED', envelope: cloneAndDeepFreeze(value as CausalShadowArtifactEnvelopeV1) });
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
    if (!isNonEmptyText(text)) throw new Error(`Causal shadow artifact ${label} is invalid.`);
  }
  for (const [label, text] of [['display name', envelope.displayName], ['world ID', envelope.worldId], ['source revision ID', envelope.sourceRevisionId]] as const) {
    if (text !== undefined && !isNonEmptyText(text)) throw new Error(`Causal shadow artifact ${label} is invalid.`);
  }
  if (!Array.isArray(envelope.notes) || !envelope.notes.every(isNonEmptyText)) throw new Error('Causal shadow artifact notes are invalid.');
}

function detectUnsupportedNewerSchema(value: unknown): { version: number; reason: string } | undefined {
  const envelope = value as Record<string, unknown>;
  const checks: readonly [unknown, string][] = [
    [envelope.envelopeSchemaVersion, 'envelope schema'],
  ];
  for (const [candidate, label] of checks) if (typeof candidate === 'number' && candidate > 1) return { version: candidate, reason: `Causal shadow artifact uses a newer ${label}.` };
  const payload = isRecord(envelope.payload) ? envelope.payload : undefined;
  if (!payload) return undefined;
  for (const [candidate, label] of [[payload.schemaVersion, 'payload schema'], [payload.runContractVersion, 'run contract']] as const) {
    if (typeof candidate === 'number' && candidate > 1) return { version: candidate, reason: `Causal shadow artifact uses a newer ${label}.` };
  }
  const input = isRecord(payload.inputSnapshot) ? payload.inputSnapshot : undefined;
  if (input) for (const [candidate, label] of [[input.schemaVersion, 'input schema'], [input.inputContractVersion, 'input contract']] as const) {
    if (typeof candidate === 'number' && candidate > 1) return { version: candidate, reason: `Causal shadow artifact uses a newer ${label}.` };
  }
  if (Array.isArray(payload.stageResults)) for (const result of payload.stageResults) if (isRecord(result) && typeof result.schemaVersion === 'number' && result.schemaVersion > 1) return { version: result.schemaVersion, reason: 'Causal shadow artifact contains a newer stage-result schema.' };
  for (const [key, label] of [['premise', 'premise'], ['interior', 'interior'], ['regimeHistory', 'regime history'], ['geologicSpine', 'geologic spine'], ['confidenceLedger', 'confidence ledger'], ['provenance', 'provenance']] as const) {
    const nested = isRecord(payload[key]) ? payload[key] as Record<string, unknown> : undefined;
    if (nested && typeof nested.schemaVersion === 'number' && nested.schemaVersion > 1) return { version: nested.schemaVersion, reason: `Causal shadow artifact contains a newer ${label} schema.` };
  }
  return undefined;
}

function isIsoTimestamp(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)) return false;
  const parsed = new Date(value);
  if (!Number.isFinite(parsed.getTime())) return false;
  const normalized = parsed.toISOString();
  return value === normalized || value === normalized.replace('.000Z', 'Z');
}

function isNonEmptyText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
