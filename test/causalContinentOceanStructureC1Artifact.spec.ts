import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1,
  C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1,
} from '../src/core/causalGeology';
import { getAuthorityProcess, type AuthorityFieldGroup } from '../src/core/worldAuthority';

interface C1ContractArtifactV1 {
  readonly schemaVersion: 1;
  readonly reportVersion: 'C1_DETACHED_STRUCTURAL_ROLE_CONTRACT_V1';
  readonly baseCommit: string;
  readonly phaseDCompletion: {
    readonly pullRequest: number;
    readonly validatedHead: string;
    readonly mergeCommit: string;
  };
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly interpretationMode: 'DETACHED_DIAGNOSTIC';
  readonly scientificStatus: 'PARTIAL';
  readonly ordinaryGenerateChanged: false;
  readonly visiblePhysicalOutputChanged: false;
  readonly causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN';
  readonly process: {
    readonly processId: 'CAUSAL_CONTINENT_OCEAN_STRUCTURE';
    readonly owner: string;
    readonly reads: readonly AuthorityFieldGroup[];
    readonly writes: readonly AuthorityFieldGroup[];
    readonly prerequisites: readonly string[];
    readonly forbiddenAuthorityWrites: readonly AuthorityFieldGroup[];
  };
  readonly record: {
    readonly recordId: 'ContinentOceanStructureStateV1';
    readonly coordinateConvention: string;
    readonly randomStreamPolicy: string;
    readonly sourceHashes: readonly string[];
    readonly physicalAuthority: false;
    readonly structuralRoleAuthority: false;
    readonly terrainAuthority: false;
    readonly landWaterAuthority: false;
  };
  readonly roleIds: readonly string[];
  readonly interpretationContract: {
    readonly statuses: readonly string[];
    readonly ambiguityStatuses: readonly string[];
    readonly unresolvedMustRemainExplicit: boolean;
    readonly dominantCandidateIsDiagnosticOnly: boolean;
    readonly supportUnit: string;
    readonly supportScaleId: string;
  };
  readonly ghostContract: {
    readonly riskLevels: readonly string[];
    readonly dispositions: readonly string[];
    readonly physicallySuppressesOutput: false;
    readonly candidateSuppressionRequiresHighRisk: boolean;
    readonly hiddenMaskAllowed: false;
  };
  readonly budgets: {
    readonly maximumDefinitions: number;
    readonly maximumRegions: number;
    readonly maximumCandidatesPerRegion: number;
    readonly maximumSourceReferencesPerCandidate: number;
    readonly maximumSerializedBytes: number;
  };
  readonly gates: Readonly<Record<string, string>>;
  readonly explicitNonScope: readonly string[];
  readonly nextScope: string;
}

const artifact = JSON.parse(readFileSync(resolve(
  process.cwd(),
  'docs/implementation/phase-c/c1-detached-structural-role-contract.json',
), 'utf8')) as C1ContractArtifactV1;

const hashPattern = /^[0-9a-f]{40}$/;

describe('C1 machine-readable structural-role contract artifact', () => {
  it('matches executable role definitions, budgets, authority, and the merged D3 boundary', () => {
    expect(artifact).toMatchObject({
      schemaVersion: 1,
      reportVersion: 'C1_DETACHED_STRUCTURAL_ROLE_CONTRACT_V1',
      baseCommit: '5dad3bc94749ff3e3fdcc83f91c74132b4a94835',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      interpretationMode: 'DETACHED_DIAGNOSTIC',
      scientificStatus: 'PARTIAL',
      ordinaryGenerateChanged: false,
      visiblePhysicalOutputChanged: false,
      causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN',
    });
    expect(artifact.phaseDCompletion).toEqual({
      pullRequest: 150,
      validatedHead: '4ff5ce2508fa7c21f3518a722041cc1b85d508e2',
      mergeCommit: artifact.baseCommit,
    });
    expect(artifact.phaseDCompletion.validatedHead).toMatch(hashPattern);
    expect(artifact.phaseDCompletion.mergeCommit).toMatch(hashPattern);
    expect(artifact.roleIds).toEqual(
      C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1.map((definition) => definition.roleId),
    );
    expect(artifact.budgets).toEqual(C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1);

    const process = getAuthorityProcess(artifact.process.processId);
    expect(artifact.process.owner).toBe(process.owner);
    expect(artifact.process.reads).toEqual(process.reads);
    expect(artifact.process.writes).toEqual(process.writes);
    expect(artifact.process.prerequisites).toEqual(process.prerequisites);
    expect(artifact.process.writes).toEqual(['diagnostics']);
    expect(artifact.process.forbiddenAuthorityWrites.every((group) =>
      !process.writes.includes(group))).toBe(true);
    expect(artifact.process.forbiddenAuthorityWrites).toContain('structuralRoleAuthority');
    expect(artifact.process.forbiddenAuthorityWrites).toContain('processFieldAuthority');
    expect(artifact.process.forbiddenAuthorityWrites).toContain('terrain');

    expect(artifact.record).toMatchObject({
      recordId: 'ContinentOceanStructureStateV1',
      coordinateConvention: 'SPHERICAL_LAT_LON_DEGREES_V1',
      randomStreamPolicy: 'NONE_CONTRACT_ONLY',
      physicalAuthority: false,
      structuralRoleAuthority: false,
      terrainAuthority: false,
      landWaterAuthority: false,
    });
    expect(artifact.interpretationContract.unresolvedMustRemainExplicit).toBe(true);
    expect(artifact.interpretationContract.dominantCandidateIsDiagnosticOnly).toBe(true);
    expect(artifact.interpretationContract.supportScaleId).toBe('normalized-0-1-v1');
    expect(artifact.ghostContract.physicallySuppressesOutput).toBe(false);
    expect(artifact.ghostContract.candidateSuppressionRequiresHighRisk).toBe(true);
    expect(artifact.ghostContract.hiddenMaskAllowed).toBe(false);
    expect(artifact.gates.structuralRoleAuthority).toBe('FORBIDDEN_UNTIL_A2');
    expect(artifact.explicitNonScope.length).toBeGreaterThan(0);
    expect(artifact.nextScope).toMatch(/C2 reviewed structural-interpretation rules/i);
  });
});
