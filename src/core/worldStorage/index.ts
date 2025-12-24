// WorldWright – World Storage (V1.3 Spine)
//
// Serialization helpers. Local-first friendly and browser-safe.
// File I/O is handled by the caller (UI layer).

import { WorldBrain } from '../worldSchema';

export function serializeWorld(world: WorldBrain): string {
  return JSON.stringify(world);
}

export function deserializeWorld(json: string): WorldBrain {
  return JSON.parse(json) as WorldBrain;
}

export function exportWorld(world: WorldBrain): string {
  // For now, export is just JSON. Later: manifests, engine profiles, chunked exports.
  return serializeWorld(world);
}