import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1,
  C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1,
} from '../src/core/causalGeology';
import { getAuthorityProcess } from '../src/core/worldAuthority';

interface C1ArtifactV1 {
  readonly schemaVersion: 1;
  readonly reportVersion: 'C1_DETACHED_STRUCTURAL_ROLE_CONTRACTS_V1';
  readonly baseCommit: string;
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly interpretationMode: 'DETACHED_DIAGNOSTIC';
  readonly scientificStatus: 'PARTIAL';
  readonly ordinaryGenerateChanged: false;
  readonly visiblePhysicalOutputChanged: false;
  readonly causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN';
  readonly record: 'ContinentOceanStructureInterpretationV1';
  readonly process: {
    readonly processId: 'CAUSAL_CONTINENT_OCEAN_STRUCTURE_INTERPRETATION';
    readonly reads: readonly string[];
    readonly writes: readonly string[];
    readonly prerequisites: readonly string[];
    readonly allowedDiagnosticInputs: readonly string[];
    readonly forbiddenAuthorityWrites: readonly string[];
  };
  readonly roleIds: readonly string[];
  readonly resolutionStatuses: readonly string[];
  readonly ghostRiskIds: readonly string[];
  readonly suppressionRecommendationIds: readonly string[];
  readonly budgets: typeof C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1;
  readonly gates: Readonly<Record<string, string>>;
  readonly forbiddenInputs: readonly string[];
  readonly explicitNonScope: readonly string[];
  readonly nextScope: string;
}

const artifact = JSON.parse(readFileSync(resolve(
  process.cwd(),
  'docs/implementation/phase-c/c1-structural-role-contracts.json',
), 'utf8')) as C1ArtifactV1;

describe('C1 machine-readable structural-role contract artifact', () => {
  it('matches executable roles, budgets, and diagnostic-only authority', () => {
    expect(artifact).toMatchObject({
      schemaVersion: 1,
      reportVersion: 'C1_DETACHED_STRUCTURAL_ROLE_CONTRACTS_V1',
      baseCommit: '5dad3bc94749ff3e3fdcc83f91c74132b4a94835',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      interpretationMode: 'DETACHED_DIAGNOSTIC',
      scientificStatus: 'PARTIAL',
      ordinaryGenerateChanged: false,
      visiblePhysicalOutputChanged: false,
      causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN',
      record: 'ContinentOceanStructureInterpretationV1',
    });
    expect(artifact.roleIds).toEqual(C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1.map((entry) => entry.role));
    expect(artifact.budgets).toEqual(C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1);
    expect(artifact.resolutionStatuses).toEqual([
      'SINGLE_LEADING_CANDIDATE',
      'AMBIGUOUS_CANDIDATES',
      'UNRESOLVED',
    ]);
    expect(artifact.ghostRiskIds).toHaveLength(5);
    expect(artifact.suppressionRecommendationIds).toHaveLength(6);
    expect(Object.values(artifact.gates)).toContain('FORBIDDEN');
    expect(artifact.forbiddenInputs).toContain('legacy solved morphology');
    expect(artifact.forbiddenInputs).toContain('shadow-audit comparison output');
    expect(artifact.explicitNonScope.length).toBeGreaterThan(0);
    expect(artifact.nextScope).toMatch(/C2 reviewed structural-role interpretation rules/i);

    const process = getAuthorityProcess(artifact.process.processId);
    expect(artifact.process.reads).toEqual(process.reads);
    expect(artifact.process.writes).toEqual(process.writes);
    expect(artifact.process.prerequisites).toEqual(process.prerequisites);
    expect(process.writes).toEqual(['diagnostics']);
    expect(artifact.process.forbiddenAuthorityWrites).toContain('structuralRoleAuthority');
    expect(artifact.process.forbiddenAuthorityWrites).toContain('terrain');
    expect(artifact.process.allowedDiagnosticInputs).toContain('validated detached process-field projection');
    expect(C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1.every((definition) =>
      definition.finalLandAuthority === false
      && definition.finalWaterAuthority === false
      && definition.bathymetryAuthority === false
      && definition.terrainAuthority === false)).toBe(true);
  });
});
