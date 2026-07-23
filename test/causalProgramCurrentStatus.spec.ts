import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  CAUSAL_SHADOW_DIAGNOSTIC_PROCESS_ORDER,
  getAuthorityProcess,
  validateAuthorityProcessRegistry,
} from '../src/core/worldAuthority';

interface CausalProgramCurrentStatusV1 {
  readonly schemaVersion: 1;
  readonly statusVersion: 'CAUSAL_PROGRAM_CURRENT_STATUS_AFTER_M1A_V1';
  readonly auditBaseCommit: string;
  readonly historicReadinessArtifactsAreImmutableSnapshots: true;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN';
  readonly ordinaryGenerateChanged: false;
  readonly visiblePhysicalOutputChanged: false;
  readonly scientificStatus: 'PARTIAL';
  readonly completedSoftwareMilestones: readonly string[];
  readonly currentAuthorizedScope: 'M1B_RESEARCH_FIXTURES_NEGATIVES_EXCEPTIONS_AND_HOLDOUTS_ONLY';
  readonly resolverImplementationAuthorized: false;
  readonly thresholdCalibrationAuthorized: false;
  readonly physicalPromotionAuthorized: false;
  readonly legacyRetirementAuthorized: false;
  readonly requiredRegressionGates: readonly string[];
  readonly openAuditBoundaries: readonly string[];
  readonly nextAction: 'BUILD_M1B_FIXED_RESEARCH_CORPUS_WITHOUT_RESOLVER_CODE';
}

const status = JSON.parse(readFileSync(resolve(
  process.cwd(),
  'docs/implementation/causal-program-current-status.json',
), 'utf8')) as CausalProgramCurrentStatusV1;

const commitPattern = /^[0-9a-f]{40}$/;

const requiredMilestones = [
  'WAVE_1_DETACHED_CAUSAL_RECORDS',
  'PHASE_D_DETACHED_PROCESS_FIELD_PROJECTION',
  'PHASE_C_DETACHED_STRUCTURAL_INTERPRETATION',
  'M1A_STRUCTURE_MATERIAL_CONTRACTS_AND_RESEARCH',
] as const;

const requiredGates = [
  'FULL_VITEST_SUITE',
  'TYPESCRIPT_BUILD',
  'REQUIRED_GENERATE_DIAGNOSTICS',
  'CAUSAL_SKELETON_SEVEN_SEED_HARNESS',
  'MULTI_SEED_LEGACY_PHYSICAL_EQUIVALENCE',
  'SNAPSHOT_CANARY',
  'FULL_GLOBE_REVIEW',
  'D1_EXACT_OWNED_FIELD_FIREWALL',
  'C1_EXACT_OWNED_FIELD_FIREWALL',
  'C1_RESOLUTION_STATE_EXCLUSIVITY',
  'M1A_AUTHORITY_AND_RESEARCH_FIREWALL',
] as const;

describe('current causal-program direction after M1A', () => {
  it('distinguishes current direction from immutable historical readiness snapshots', () => {
    expect(status).toMatchObject({
      schemaVersion: 1,
      statusVersion: 'CAUSAL_PROGRAM_CURRENT_STATUS_AFTER_M1A_V1',
      historicReadinessArtifactsAreImmutableSnapshots: true,
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN',
      ordinaryGenerateChanged: false,
      visiblePhysicalOutputChanged: false,
      scientificStatus: 'PARTIAL',
      currentAuthorizedScope: 'M1B_RESEARCH_FIXTURES_NEGATIVES_EXCEPTIONS_AND_HOLDOUTS_ONLY',
      resolverImplementationAuthorized: false,
      thresholdCalibrationAuthorized: false,
      physicalPromotionAuthorized: false,
      legacyRetirementAuthorized: false,
      nextAction: 'BUILD_M1B_FIXED_RESEARCH_CORPUS_WITHOUT_RESOLVER_CODE',
    });
    expect(status.auditBaseCommit).toMatch(commitPattern);
    expect(status.completedSoftwareMilestones).toEqual(requiredMilestones);
    expect(status.requiredRegressionGates).toEqual(requiredGates);
    expect(status.openAuditBoundaries).toContain(
      'WAVE_1_CORE_RECORD_EXACT_KEY_REVIEW_REMAINS_SEPARATE_FROM_THIS_D1_C1_M1A_REGRESSION_AUDIT',
    );
  });

  it('keeps every detached downstream process diagnostic-only and nonphysical', () => {
    expect(validateAuthorityProcessRegistry()).toEqual([]);
    expect(CAUSAL_SHADOW_DIAGNOSTIC_PROCESS_ORDER).toEqual([
      'CAUSAL_PROCESS_FIELD_PROJECTION',
      'CAUSAL_CONTINENT_OCEAN_STRUCTURE_INTERPRETATION',
      'CAUSAL_STRUCTURE_MATERIAL_INTERPRETATION',
      'CAUSAL_LANDFORM_POTENTIAL_INTERPRETATION',
      'CAUSAL_SHADOW_AUDIT',
    ]);
    for (const processId of CAUSAL_SHADOW_DIAGNOSTIC_PROCESS_ORDER) {
      const process = getAuthorityProcess(processId);
      expect(process.modes).toEqual(['CAUSAL_SHADOW']);
      expect(process.writes).toEqual(['diagnostics']);
      expect(process.modes).not.toContain('CAUSAL_ACTIVE');
      expect(process.forbiddenWrites).toEqual(expect.arrayContaining([
        'structureMaterialCause',
        'landformPotentialAuthority',
        'baseTerrain',
        'finalTerrain',
        'presentation',
      ]));
    }
  });
});
