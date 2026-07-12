import { describe, expect, it } from 'vitest';
import {
  createScientificQuantity,
  createScientificRange,
  hashCausalPayload,
  validateTectonicRegimeHistory,
  type TectonicRegimeHistoryV1,
} from '../src/core/causalGeology';

function normalized(subject: string, min = 0.2, max = 0.8) {
  return createScientificRange(min, max, 'normalized-0-1', 'normalized-0-1-v1', subject);
}

function duration(subject: string, min: number, max: number) {
  return createScientificRange(min, max, 'gigaannum', 'gigaannum-v1', subject);
}

function history(overrides: Partial<Omit<TectonicRegimeHistoryV1, 'contentHash'>> = {}): TectonicRegimeHistoryV1 {
  const payload = {
    schemaVersion: 1 as const,
    historyVersion: 1,
    status: 'PARTIAL' as const,
    timeConvention: 'FRACTION_OF_RESOLVED_GEOLOGIC_HISTORY_V1' as const,
    totalResolvedDuration: createScientificQuantity(4.5, 'gigaannum', 'gigaannum-v1'),
    epochs: [{
      epochId: 'epoch-a',
      sequenceIndex: 0,
      startTime: 0,
      endTime: 1,
      regimeFamily: 'STAGNANT_LID',
      mobilityRange: normalized('epoch-a.mobility'),
      extensionRange: normalized('epoch-a.extension'),
      convergenceRange: normalized('epoch-a.convergence'),
      transformRange: normalized('epoch-a.transform'),
      plumeRange: normalized('epoch-a.plume'),
      crustProductionRange: normalized('epoch-a.crust-production'),
      persistenceRange: duration('epoch-a.persistence', 3, 4.5),
      surfaceExposureRange: duration('epoch-a.exposure', 0.5, 2),
      confidenceSubject: 'epoch-a.confidence',
      evidenceIds: [],
    }],
    transitions: [],
    branchResolutionIds: [],
    evidenceIds: [],
    contradictionIds: [],
    limitations: ['fixture-partial'],
    ...overrides,
  };
  return { ...payload, contentHash: hashCausalPayload('WorldWright/tectonic-regime-history/v1', payload) } as TectonicRegimeHistoryV1;
}

describe('W1-01 geological-history duration contract', () => {
  it('accepts normalized epochs with an explicit total duration and exposure summary', () => {
    expect(() => validateTectonicRegimeHistory(history())).not.toThrow();
  });

  it('rejects absent or non-positive total geological duration', () => {
    expect(() => validateTectonicRegimeHistory(history({ totalResolvedDuration: undefined as never }))).toThrow(/Scientific quantity/);
    expect(() => validateTectonicRegimeHistory(history({ totalResolvedDuration: createScientificQuantity(0, 'gigaannum', 'gigaannum-v1') }))).toThrow(/positive/);
  });

  it('rejects persistence beyond total history and exposure beyond persistence', () => {
    const baseEpoch = history().epochs[0];
    expect(() => validateTectonicRegimeHistory(history({ epochs: [{ ...baseEpoch, persistenceRange: duration('bad.persistence', 4, 5) }] }))).toThrow(/exceeds total resolved geological duration/);
    expect(() => validateTectonicRegimeHistory(history({ epochs: [{ ...baseEpoch, surfaceExposureRange: duration('bad.exposure', 3, 4.4), persistenceRange: duration('bad.persistence', 2, 3) }] }))).toThrow(/surface exposure exceeds persistence/);
  });
});
