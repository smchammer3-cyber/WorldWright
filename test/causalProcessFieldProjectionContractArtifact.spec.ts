import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  CAUSAL_PROCESS_FIELD_PROJECTION_LIMITS_V1,
  D1_DETACHED_PROCESS_FIELD_DEFINITIONS_V1,
} from '../src/core/causalGeology';
import { getAuthorityProcess, type AuthorityFieldGroup } from '../src/core/worldAuthority';

interface D1ContractArtifactV1 {
  readonly schemaVersion: 1;
  readonly reportVersion: 'D1_DETACHED_PROCESS_FIELD_CONTRACT_V1';
  readonly baseCommit: string;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly projectionMode: 'DETACHED_DIAGNOSTIC';
  readonly scientificStatus: 'PARTIAL';
  readonly visiblePhysicalOutputChanged: false;
  readonly ordinaryGenerateChanged: false;
  readonly causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN';
  readonly process: {
    readonly processId: 'CAUSAL_PROCESS_FIELD_PROJECTION';
    readonly reads: readonly string[];
    readonly writes: readonly string[];
    readonly prerequisites: readonly string[];
    readonly forbiddenAuthorityWrites: readonly string[];
  };
  readonly queryContract: {
    readonly coordinateConvention: string;
    readonly queryModel: string;
    readonly falloff: string;
    readonly randomStreamPolicy: string;
    readonly unit: string;
    readonly scaleId: string;
  };
  readonly fieldIds: readonly string[];
  readonly budgets: {
    readonly maximumDefinitions: number;
    readonly maximumKernels: number;
    readonly maximumSerializedBytes: number;
  };
  readonly gates: Readonly<Record<string, string>>;
  readonly explicitNonScope: readonly string[];
  readonly nextScope: string;
}

const artifact = JSON.parse(readFileSync(resolve(
  process.cwd(),
  'docs/implementation/phase-d/d1-detached-process-field-contract.json',
), 'utf8')) as D1ContractArtifactV1;

describe('D1 machine-readable contract artifact', () => {
  it('matches the executable field registry, budgets, and shadow-only process boundary', () => {
    expect(artifact).toMatchObject({
      schemaVersion: 1,
      reportVersion: 'D1_DETACHED_PROCESS_FIELD_CONTRACT_V1',
      baseCommit: '0c55202d331702702c0106e6b60c95d85e0dfeef',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      projectionMode: 'DETACHED_DIAGNOSTIC',
      scientificStatus: 'PARTIAL',
      visiblePhysicalOutputChanged: false,
      ordinaryGenerateChanged: false,
      causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN',
    });
    expect(artifact.fieldIds).toEqual(D1_DETACHED_PROCESS_FIELD_DEFINITIONS_V1.map((definition) => definition.fieldId));
    expect(artifact.budgets).toEqual(CAUSAL_PROCESS_FIELD_PROJECTION_LIMITS_V1);

    const process = getAuthorityProcess(artifact.process.processId);
    expect(artifact.process.reads).toEqual(process.reads);
    expect(artifact.process.writes).toEqual(process.writes);
    expect(artifact.process.prerequisites).toEqual(process.prerequisites);
    expect(artifact.process.forbiddenAuthorityWrites.every((group) =>
      process.writes.includes(group as AuthorityFieldGroup) === false)).toBe(true);
    expect(artifact.process.forbiddenAuthorityWrites).toContain('processFieldAuthority');
    expect(artifact.process.forbiddenAuthorityWrites).toContain('terrain');
    expect(artifact.explicitNonScope.length).toBeGreaterThan(0);
    expect(artifact.nextScope).toMatch(/deterministic spherical kernel construction/i);
  });
});
