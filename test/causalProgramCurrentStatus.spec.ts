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
  readonly statusVersion: 'CAUSAL_PROGRAM_CURRENT_STATUS_AFTER_L1C_BLUEPRINT_V1';
  readonly auditBaseCommit: string;
  readonly historicReadinessArtifactsAreImmutableSnapshots: true;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN';
  readonly ordinaryGenerateChanged: false;
  readonly visiblePhysicalOutputChanged: false;
  readonly scientificStatus: 'PARTIAL';
  readonly completedSoftwareMilestones: readonly string[];
  readonly completedBlueprintMilestones: readonly string[];
  readonly l1bPostMergeClosureRecorded: true;
  readonly resolverBlueprintCompleted: true;
  readonly currentAuthorizedScope: 'NONE_AFTER_L1C_BLUEPRINT_PENDING_SEPARATE_EXPLICIT_IMPLEMENTATION_AUTHORIZATION';
  readonly resolverImplementationAuthorized: false;
  readonly resolverEvaluationAuthorized: false;
  readonly thresholdCalibrationAuthorized: false;
  readonly geometryOrElevationAuthorized: false;
  readonly ordinaryGenerateIntegrationAuthorized: false;
  readonly physicalPromotionAuthorized: false;
  readonly legacyRetirementAuthorized: false;
  readonly requiredRegressionGates: readonly string[];
  readonly openAuditBoundaries: readonly string[];
  readonly nextAction: 'AWAIT_SEPARATE_EXPLICIT_L1C_IMPLEMENTATION_AUTHORIZATION';
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
  'PHASE_M_DETACHED_STRUCTURE_MATERIAL_INTERPRETATION',
  'L1A_DETACHED_LANDFORM_POTENTIAL_CONTRACTS',
  'L1B_LANDFORM_POTENTIAL_RESEARCH_PACKAGE',
] as const;

const requiredBlueprintMilestones = [
  'L1B_POST_MERGE_CLOSURE',
  'L1C_LANDFORM_POTENTIAL_RESOLVER_BLUEPRINT_ONLY',
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
  'M1B_RESEARCH_CORPUS_AND_HOLDOUT_FIREWALL',
  'M1C_DETACHED_RESOLVER_AUTHORITY_FIREWALL',
  'L1A_LANDFORM_POTENTIAL_CONTRACT_FIREWALL',
  'L1B_RESEARCH_ONLY_AND_HOLDOUT_FIREWALL',
  'L1C_BLUEPRINT_ONLY_NO_IMPLEMENTATION_FIREWALL',
] as const;

describe('current causal-program direction after the L1C blueprint-only checkpoint', () => {
  it('distinguishes current direction from immutable historical readiness snapshots', () => {
    expect(status).toMatchObject({
      schemaVersion: 1,
      statusVersion: 'CAUSAL_PROGRAM_CURRENT_STATUS_AFTER_L1C_BLUEPRINT_V1',
      historicReadinessArtifactsAreImmutableSnapshots: true,
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN',
      ordinaryGenerateChanged: false,
      visiblePhysicalOutputChanged: false,
      scientificStatus: 'PARTIAL',
      l1bPostMergeClosureRecorded: true,
      resolverBlueprintCompleted: true,
      currentAuthorizedScope: 'NONE_AFTER_L1C_BLUEPRINT_PENDING_SEPARATE_EXPLICIT_IMPLEMENTATION_AUTHORIZATION',
      resolverImplementationAuthorized: false,
      resolverEvaluationAuthorized: false,
      thresholdCalibrationAuthorized: false,
      geometryOrElevationAuthorized: false,
      ordinaryGenerateIntegrationAuthorized: false,
      physicalPromotionAuthorized: false,
      legacyRetirementAuthorized: false,
      nextAction: 'AWAIT_SEPARATE_EXPLICIT_L1C_IMPLEMENTATION_AUTHORIZATION',
    });
    expect(status.auditBaseCommit).toMatch(commitPattern);
    expect(status.completedSoftwareMilestones).toEqual(requiredMilestones);
    expect(status.completedBlueprintMilestones).toEqual(requiredBlueprintMilestones);
    expect(status.requiredRegressionGates).toEqual(requiredGates);
    expect(status.openAuditBoundaries).toContain(
      'L1C_IMPLEMENTATION_REQUIRES_SEPARATE_EXPLICIT_AUTHORIZATION',
    );
    expect(status.openAuditBoundaries).toContain(
      'GRAIN_ANISOTROPY_ORIENTATION_REPRESENTATION_REMAINS_OPEN',
    );
    expect(status.openAuditBoundaries).toEqual(expect.arrayContaining([
      'L1C_EVIDENCE_RELATION_CONTRACTS_REQUIRE_SEPARATE_REVIEW',
      'L1C_SUPPORT_RANGE_PROPAGATION_REQUIRES_SEPARATE_REVIEW',
      'L1C_COMPETITION_SEPARATION_REQUIRES_SEPARATE_REVIEW',
      'L1C_SPATIAL_COVERAGE_RELATION_REQUIRES_SEPARATE_REVIEW',
      'L1C_REGION_RECONCILIATION_REQUIRES_SEPARATE_REVIEW',
    ]));
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
