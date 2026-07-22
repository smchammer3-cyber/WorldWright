import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  D2_PRESERVATION_PROJECTION_ASSUMPTIONS_V1,
  D2_PROCESS_FIELD_PROJECTION_BUDGET_V1,
} from '../src/core/causalGeology';
import { getAuthorityProcess } from '../src/core/worldAuthority';

interface D2ArtifactV1 {
  readonly schemaVersion: 1;
  readonly reportVersion: 'D2_SPHERICAL_PROCESS_FIELD_PROJECTION_V1';
  readonly baseCommit: string;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly projectionMode: 'DETACHED_DIAGNOSTIC';
  readonly scientificStatus: 'PARTIAL';
  readonly ordinaryGenerateChanged: false;
  readonly visiblePhysicalOutputChanged: false;
  readonly causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN';
  readonly algorithm: {
    readonly sourceRecords: readonly string[];
    readonly coordinateConvention: string;
    readonly distanceMetric: string;
    readonly kernelFalloff: string;
    readonly blendRule: string;
    readonly contributionRule: string;
    readonly kernelRadiusSource: string;
    readonly kernelsPerSourceNode: number;
    readonly randomness: string;
    readonly diagnosticGridSampling: string;
  };
  readonly preservationProjectionAssumptions: typeof D2_PRESERVATION_PROJECTION_ASSUMPTIONS_V1;
  readonly budgets: {
    readonly maximumKernelsPerSourceNode: number;
    readonly maximumDiagnosticGridCells: number;
    readonly maximumDiagnosticGridSerializedBytes: number;
    readonly ciMaximumProjectionMillisecondsPerCase: number;
    readonly ciMaximumQueryMilliseconds: number;
    readonly ciMaximumGridMilliseconds: number;
    readonly ciMaximumProjectionBytes: number;
    readonly ciDiagnosticGridWidth: number;
    readonly ciDiagnosticGridHeight: number;
  };
  readonly validationCorpus: {
    readonly controlledSeeds: readonly string[];
    readonly holdoutSeeds: readonly string[];
    readonly requiredEvidence: readonly string[];
  };
  readonly authorityBoundary: {
    readonly writes: readonly string[];
    readonly forbiddenWrites: readonly string[];
    readonly forbiddenInputs: readonly string[];
  };
  readonly explicitNonScope: readonly string[];
  readonly nextScope: string;
}

const artifact = JSON.parse(readFileSync(resolve(
  process.cwd(),
  'docs/implementation/phase-d/d2-spherical-process-field-projection.json',
), 'utf8')) as D2ArtifactV1;

describe('D2 machine-readable projection artifact', () => {
  it('matches executable assumptions, budgets, and detached authority', () => {
    expect(artifact).toMatchObject({
      schemaVersion: 1,
      reportVersion: 'D2_SPHERICAL_PROCESS_FIELD_PROJECTION_V1',
      baseCommit: 'b52f85fdea4c0f3b8afb395ec951f81829c556c9',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      projectionMode: 'DETACHED_DIAGNOSTIC',
      scientificStatus: 'PARTIAL',
      ordinaryGenerateChanged: false,
      visiblePhysicalOutputChanged: false,
      causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN',
    });
    expect(artifact.algorithm).toMatchObject({
      coordinateConvention: 'SPHERICAL_LAT_LON_DEGREES_V1',
      distanceMetric: 'GREAT_CIRCLE_ANGULAR_DISTANCE_V1',
      kernelFalloff: 'COSINE_COMPACT_SUPPORT_V1',
      blendRule: 'MAXIMUM_COMPACT_SUPPORT_V1',
      contributionRule: 'PEAK_TIMES_TEMPORAL_TIMES_PRESERVATION_TIMES_COSINE_FALLOFF_V1',
      kernelsPerSourceNode: D2_PROCESS_FIELD_PROJECTION_BUDGET_V1.maximumKernelsPerSourceNode,
      randomness: 'NONE_DETERMINISTIC_FROM_SOURCE_RECORDS',
      diagnosticGridSampling: 'EQUIRECTANGULAR_CELL_CENTER_QUERY_V1',
    });
    expect(artifact.preservationProjectionAssumptions).toEqual(D2_PRESERVATION_PROJECTION_ASSUMPTIONS_V1);
    expect(artifact.preservationProjectionAssumptions.every((entry) => entry.physicallyCalibrated === false)).toBe(true);
    expect(artifact.budgets.maximumKernelsPerSourceNode).toBe(D2_PROCESS_FIELD_PROJECTION_BUDGET_V1.maximumKernelsPerSourceNode);
    expect(artifact.budgets.maximumDiagnosticGridCells).toBe(D2_PROCESS_FIELD_PROJECTION_BUDGET_V1.maximumDiagnosticGridCells);
    expect(artifact.budgets.maximumDiagnosticGridSerializedBytes).toBe(D2_PROCESS_FIELD_PROJECTION_BUDGET_V1.maximumDiagnosticGridSerializedBytes);

    const process = getAuthorityProcess('CAUSAL_PROCESS_FIELD_PROJECTION');
    expect(artifact.authorityBoundary.writes).toEqual(process.writes);
    expect(process.writes).toEqual(['diagnostics']);
    expect(artifact.authorityBoundary.forbiddenWrites).toContain('processFieldAuthority');
    expect(artifact.authorityBoundary.forbiddenWrites).toContain('terrain');
    expect(artifact.authorityBoundary.forbiddenInputs).toContain('legacy solved morphology');
    expect(artifact.validationCorpus.controlledSeeds).toHaveLength(6);
    expect(artifact.validationCorpus.holdoutSeeds).toHaveLength(1);
    expect(artifact.validationCorpus.requiredEvidence.length).toBeGreaterThan(0);
    expect(artifact.explicitNonScope.length).toBeGreaterThan(0);
    expect(artifact.nextScope).toMatch(/D3 distribution/i);
  });
});
