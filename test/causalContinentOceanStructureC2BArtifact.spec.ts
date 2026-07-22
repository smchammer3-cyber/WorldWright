import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  C2B_CONTINENT_OCEAN_STRUCTURE_BUDGET_V1,
  type ContinentOceanStructureFixtureSetV1,
} from '../src/core/causalGeology';
import { getAuthorityProcess } from '../src/core/worldAuthority';

interface C2BArtifactV1 {
  readonly schemaVersion: 1;
  readonly reportVersion: 'C2B_DETACHED_STRUCTURAL_ROLE_RESOLVER_V1';
  readonly baseCommit: string;
  readonly c2aCompletion: {
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
  readonly resolver: {
    readonly contextVersion: string;
    readonly sourceEvidence: readonly string[];
    readonly outputRecord: string;
    readonly outputStatus: string;
    readonly randomness: string;
    readonly determinism: string;
    readonly writes: readonly string[];
  };
  readonly decisionPolicy: Readonly<Record<string, string>>;
  readonly fixtureGate: {
    readonly fixtureSetVersion: string;
    readonly totalCases: number;
    readonly positiveCases: number;
    readonly thresholdCases: number;
    readonly negativeCases: number;
    readonly approvedExceptionCases: number;
    readonly withheldHoldoutCases: number;
    readonly holdoutsUsedForCalibration: false;
    readonly requiredChecks: readonly string[];
  };
  readonly budgets: typeof C2B_CONTINENT_OCEAN_STRUCTURE_BUDGET_V1;
  readonly authorityBoundary: Readonly<Record<string, string | boolean>>;
  readonly blockingScientificLimitations: readonly string[];
  readonly explicitNonScope: readonly string[];
  readonly nextScope: string;
}

const repositoryRoot = process.cwd();
const artifact = JSON.parse(readFileSync(resolve(
  repositoryRoot,
  'docs/implementation/phase-c/c2b-detached-structural-role-resolver.json',
), 'utf8')) as C2BArtifactV1;
const fixtureSet = JSON.parse(readFileSync(resolve(
  repositoryRoot,
  'src/core/causalGeology/research/continent-ocean-structure-fixtures.json',
), 'utf8')) as ContinentOceanStructureFixtureSetV1;
const hashPattern = /^[0-9a-f]{40}$/;

describe('C2B machine-readable resolver artifact', () => {
  it('matches the executable budgets, fixed fixture corpus, C2A base, and diagnostics-only process', () => {
    expect(artifact).toMatchObject({
      schemaVersion: 1,
      reportVersion: 'C2B_DETACHED_STRUCTURAL_ROLE_RESOLVER_V1',
      baseCommit: 'e4e14ce0914c489964afe3a4ecea14097c4e07b5',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      interpretationMode: 'DETACHED_DIAGNOSTIC',
      scientificStatus: 'PARTIAL',
      ordinaryGenerateChanged: false,
      visiblePhysicalOutputChanged: false,
      causalActive: 'UNIMPLEMENTED_AND_FORBIDDEN',
    });
    expect(artifact.c2aCompletion).toEqual({
      pullRequest: 153,
      validatedHead: 'cc5227c03658d9e9d50bd303be1c0821a7078cdf',
      mergeCommit: artifact.baseCommit,
    });
    expect(artifact.c2aCompletion.validatedHead).toMatch(hashPattern);
    expect(artifact.c2aCompletion.mergeCommit).toMatch(hashPattern);
    expect(artifact.budgets).toEqual(C2B_CONTINENT_OCEAN_STRUCTURE_BUDGET_V1);

    const countKind = (kind: string) => fixtureSet.fixtures.filter((fixture) => fixture.kind === kind).length;
    expect(artifact.fixtureGate).toMatchObject({
      fixtureSetVersion: fixtureSet.fixtureSetVersion,
      totalCases: fixtureSet.fixtures.length,
      positiveCases: countKind('POSITIVE'),
      thresholdCases: countKind('THRESHOLD'),
      negativeCases: countKind('NEGATIVE'),
      approvedExceptionCases: countKind('EXCEPTION'),
      withheldHoldoutCases: countKind('HOLDOUT'),
      holdoutsUsedForCalibration: false,
    });
    expect(artifact.fixtureGate.requiredChecks.length).toBeGreaterThan(0);

    const process = getAuthorityProcess('CAUSAL_CONTINENT_OCEAN_STRUCTURE_INTERPRETATION');
    expect(process.modes).toEqual(['CAUSAL_SHADOW']);
    expect(process.writes).toEqual(['diagnostics']);
    expect(artifact.resolver.writes).toEqual(process.writes);
    expect(process.writes).not.toContain('structuralRoleAuthority');
    expect(process.writes).not.toContain('terrain');
    expect(artifact.authorityBoundary).toMatchObject({
      structuralRoleAuthority: false,
      physicalOutputAuthorized: false,
      landWaterAuthority: false,
      bathymetryAuthority: false,
      materialAuthority: false,
      terrainAuthority: false,
      rendererAuthority: false,
      legacyFeedbackIntoCausalResolution: 'FORBIDDEN',
    });
    expect(artifact.blockingScientificLimitations.length).toBeGreaterThan(0);
    expect(artifact.explicitNonScope.length).toBeGreaterThan(0);
    expect(artifact.nextScope).toBe('C3 Phase C completion and Phase M readiness report');
  });
});
