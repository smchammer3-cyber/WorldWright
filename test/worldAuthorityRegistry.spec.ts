import { describe, expect, it } from 'vitest';
import { createEmptyCell } from '../src/core/worldSchema';
import {
  CELL_AUTHORITY_FIELDS,
  LEGACY_GENERATE_PROCESS_ORDER,
  WORLD_AUTHORITY_FIELDS,
  getAuthorityProcess,
  validateAuthorityProcessRegistry,
} from '../src/core/worldAuthority';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { computeGeneratePipelineAuthorityLedger } from '../src/core/worldGeneratePipelineLedger';
import { computeGeneratedStageDiagnostics } from '../src/core/worldGenerateStageDiagnostics';

describe('C03 authority registries', () => {
  it('assigns every current Cell field one authority owner', () => {
    const registered = Object.keys(CELL_AUTHORITY_FIELDS);
    for (const key of Object.keys(createEmptyCell(0))) expect(registered).toContain(key);
    expect(registered).toEqual(expect.arrayContaining(['countryId', 'cultureId', 'cultureMix']));
    expect(new Set(WORLD_AUTHORITY_FIELDS.map((field) => field.id)).size).toBe(WORLD_AUTHORITY_FIELDS.length);
  });

  it('has internally valid process contracts and stable versions', () => {
    expect(validateAuthorityProcessRegistry()).toEqual([]);
    for (const id of LEGACY_GENERATE_PROCESS_ORDER) {
      expect(getAuthorityProcess(id).version).toBeGreaterThan(0);
    }
  });

  it('keeps ledger and diagnostic stage identity aligned to the canonical process order', () => {
    const world = generateWorldFromParams({ ...createDefaultGeneratorParams(), width: 32, height: 16, seed: 1040037 });
    const ledger = computeGeneratePipelineAuthorityLedger(world);
    const diagnostics = computeGeneratedStageDiagnostics(world);
    expect(ledger?.stages.map((stage) => stage.id)).toEqual(LEGACY_GENERATE_PROCESS_ORDER);
    expect(diagnostics?.stages.map((stage) => stage.id)).toEqual(LEGACY_GENERATE_PROCESS_ORDER);
  }, 30_000);

  it('contains every declared production terrain writer in both traces', () => {
    const terrainWriters = LEGACY_GENERATE_PROCESS_ORDER.filter((id) => getAuthorityProcess(id).writes.includes('terrain'));
    expect(terrainWriters).toContain('MATERIAL_RELIEF_REINFORCEMENT');
    expect(terrainWriters).toContain('COAST_SHAPE_PASS');
    const terminalIndex = LEGACY_GENERATE_PROCESS_ORDER.indexOf('FINAL_CONTINENT_RESEED');
    expect(LEGACY_GENERATE_PROCESS_ORDER.slice(terminalIndex).some((id) => getAuthorityProcess(id).writes.includes('terrain'))).toBe(false);
  });
});
