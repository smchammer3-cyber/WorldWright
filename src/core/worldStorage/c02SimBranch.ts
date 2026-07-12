import { createRandomIdentity, type EntropySource } from '../worldEntropy';
import {
  createSimRandomContext,
  deriveLegacySimBranchSalt,
  validateSimRandomContext,
  type SimRandomContextV1,
} from '../worldSim/randomContext';
import type { WorldBrain } from '../worldSchema';
import {
  createSimBranchRecordFromWorld,
  type SimBranchRecord,
  type WorldStorageEngine,
} from './index';

export type SimRandomContextProvenance = {
  readonly source: 'CREATED_C02' | 'COMPAT_DERIVED';
  readonly derivation: 'WEB_CRYPTO_BRANCH_SALT' | 'PERSISTED_IMMUTABLE_FIELDS_V1';
  readonly assumption?: string;
};

export type C02SimBranchRecord = Omit<SimBranchRecord, 'recordSchemaVersion'> & {
  readonly recordSchemaVersion: 2;
  readonly randomContext: SimRandomContextV1;
  readonly randomContextProvenance: SimRandomContextProvenance;
};

export function createC02SimBranchRecordFromWorld(
  baseWorld: WorldBrain,
  name?: string,
  startYear = 0,
  entropy?: EntropySource,
): C02SimBranchRecord {
  const legacy = createSimBranchRecordFromWorld(baseWorld, name, startYear);
  const id = `simbranch_${createRandomIdentity(entropy)}`;
  return normalizeC02SimBranchRecord({
    ...legacy,
    id,
    recordSchemaVersion: 2,
    randomContext: createSimRandomContext(baseWorld.metadata.seed, `sim-${createRandomIdentity(entropy)}`),
    randomContextProvenance: {
      source: 'CREATED_C02',
      derivation: 'WEB_CRYPTO_BRANCH_SALT',
    },
  });
}

export function normalizeC02SimBranchRecord(
  record: SimBranchRecord | C02SimBranchRecord | (SimBranchRecord & { randomContext?: unknown; randomContextProvenance?: unknown }),
): C02SimBranchRecord {
  let randomContext: SimRandomContextV1;
  let provenance: SimRandomContextProvenance;
  try {
    validateSimRandomContext((record as { randomContext?: unknown }).randomContext);
    randomContext = (record as { randomContext: SimRandomContextV1 }).randomContext;
    provenance = validProvenance((record as { randomContextProvenance?: unknown }).randomContextProvenance)
      ?? { source: 'CREATED_C02', derivation: 'WEB_CRYPTO_BRANCH_SALT' };
  } catch {
    const branchSalt = deriveLegacySimBranchSalt({
      baseWorldId: record.baseWorldId,
      baseRevisionId: record.baseRevisionId || '',
      branchId: record.id,
      createdAt: record.createdAt,
    });
    const tickIndex = Math.max(0, Math.floor(record.currentYear - record.startYear));
    randomContext = createSimRandomContext(record.worldSnapshot.metadata.seed, branchSalt, tickIndex);
    provenance = {
      source: 'COMPAT_DERIVED',
      derivation: 'PERSISTED_IMMUTABLE_FIELDS_V1',
      assumption: 'Pre-C02 branch randomness begins from persisted currentYear relative to startYear.',
    };
  }

  return {
    ...record,
    recordSchemaVersion: 2,
    randomContext,
    randomContextProvenance: provenance,
  };
}

export async function saveC02SimBranchRecordWithEngine(
  record: C02SimBranchRecord,
  engine: WorldStorageEngine,
): Promise<C02SimBranchRecord> {
  const candidate = normalizeC02SimBranchRecord({ ...record, updatedAt: new Date().toISOString() });
  await engine.putSimBranchRecord(candidate as unknown as SimBranchRecord);
  const raw = await engine.getSimBranchRecord(candidate.id);
  if (!raw) throw new Error(`C02 Sim branch readback failed: ${candidate.id} was not found.`);
  const verified = normalizeC02SimBranchRecord(raw as SimBranchRecord & { randomContext?: unknown; randomContextProvenance?: unknown });
  if (verified.baseRevisionId !== candidate.baseRevisionId || verified.baseContentHash !== candidate.baseContentHash) {
    throw new Error(`C02 Sim branch readback failed: base identity mismatch for ${candidate.id}.`);
  }
  if (verified.randomContext.tickIndex !== candidate.randomContext.tickIndex
    || verified.randomContext.branchSalt !== candidate.randomContext.branchSalt) {
    throw new Error(`C02 Sim branch readback failed: random context mismatch for ${candidate.id}.`);
  }
  return verified;
}

function validProvenance(value: unknown): SimRandomContextProvenance | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Partial<SimRandomContextProvenance>;
  if ((candidate.source === 'CREATED_C02' || candidate.source === 'COMPAT_DERIVED')
    && (candidate.derivation === 'WEB_CRYPTO_BRANCH_SALT' || candidate.derivation === 'PERSISTED_IMMUTABLE_FIELDS_V1')) {
    return candidate as SimRandomContextProvenance;
  }
  return null;
}
