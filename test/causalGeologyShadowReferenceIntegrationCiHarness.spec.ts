import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  GeologyReferenceRegistry,
  W1_06B3_REQUIRED_REFERENCE_KINDS,
  resolveCausalShadowReferenceIntegration,
  validateCausalShadowReferenceIntegrationResult,
  type CausalShadowReferenceIntegrationResultV1,
  type CausalShadowReferenceQueryV1,
  type RegistrySnapshot,
} from '../src/geologyAudit';
import { W1_06_REQUIRED_ARCHETYPE_FAMILIES } from '../src/core/causalGeology';

interface ReferenceQueryCorpusV1 {
  readonly schemaVersion: 1;
  readonly corpusVersion: 'W1_06B3_REFERENCE_QUERY_CORPUS_V1';
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly queries: readonly CausalShadowReferenceQueryV1[];
}

const repositoryRoot = process.cwd();
const fixtureRoot = resolve(repositoryRoot, 'test/fixtures');
const artifactRoot = resolve(
  repositoryRoot,
  process.env.CAUSAL_SHADOW_REFERENCE_CI_OUT ?? 'artifacts/causal-shadow-reference-gate',
);
const registrySnapshot = readFixtureJson<RegistrySnapshot>('w1-06b3-reference-registry.json');
const corpus = readFixtureJson<ReferenceQueryCorpusV1>('w1-06b3-reference-query-corpus.json');

describe('W1-06B3 detached four-kind reference integration CI harness', () => {
  it('retrieves approved positive, threshold, negative, and exception evidence for every controlled family', () => {
    validateCorpus(corpus);
    const registry = new GeologyReferenceRegistry(registrySnapshot);

    rmSync(artifactRoot, { recursive: true, force: true });
    mkdirSync(artifactRoot, { recursive: true });

    const results: CausalShadowReferenceIntegrationResultV1[] = [];
    for (const query of corpus.queries) {
      const result = resolveCausalShadowReferenceIntegration(query, registry);
      const replay = resolveCausalShadowReferenceIntegration(query, registry);
      expect(result).toEqual(replay);
      validateCausalShadowReferenceIntegrationResult(result);
      expect(result.softwareGatePass).toBe(true);
      expect(result.scientificStatus).toBe('PARTIAL');
      expect(result.missingReferenceKinds).toEqual([]);
      expect(result.unknownRuleIds).toEqual([]);
      expect(result.rejectedOrCandidateCaseIds).toEqual([]);
      expect(result.referencesByKind.map((entry) => entry.kind)).toEqual(W1_06B3_REQUIRED_REFERENCE_KINDS);
      expect(result.referencesByKind.every((entry) => entry.matches.length === 1)).toBe(true);
      expect(result.referencesByKind.flatMap((entry) => entry.matches).every((match) => match.reference.status === 'approved')).toBe(true);
      expect(result.negativeReferenceCaseIds).toEqual(['w1-06b3-negative-known-failure']);
      expect(result.approvedExceptionCaseIds).toEqual(['w1-06b3-approved-artificial-exception']);
      expect(result.referencesByKind.find((entry) => entry.kind === 'negative')?.matches[0].reference.authority).toBe('worldwright-failure');
      expect(result.referencesByKind.find((entry) => entry.kind === 'exception')?.matches[0].reference.authority).toBe('worldwright-approved');
      expect(JSON.stringify(result)).not.toContain('baseHeight');
      expect(JSON.stringify(result)).not.toContain('WorldBrain');
      expect(Object.isFrozen(result)).toBe(true);
      results.push(result);
      writeJson(resolve(artifactRoot, 'cases', `${query.caseId}.json`), result);
    }

    expect(new Set(results.map((entry) => entry.rootSeed)).size).toBe(10);
    expect(new Set(results.map((entry) => entry.archetypeFamily))).toEqual(new Set(W1_06_REQUIRED_ARCHETYPE_FAMILIES));
    expect(new Set(results.map((entry) => entry.contentHash.value)).size).toBe(10);

    writeJson(resolve(artifactRoot, 'corpus-manifest.json'), {
      schemaVersion: 1,
      corpusVersion: corpus.corpusVersion,
      registryVersion: registry.registryVersion,
      authorityMode: corpus.authorityMode,
      physicalGeneratorAuthority: corpus.physicalGeneratorAuthority,
      caseCount: results.length,
      uniqueSeedCount: new Set(results.map((entry) => entry.rootSeed)).size,
      archetypeFamilyCount: new Set(results.map((entry) => entry.archetypeFamily)).size,
      requiredReferenceKinds: W1_06B3_REQUIRED_REFERENCE_KINDS,
      softwareGatePass: results.every((entry) => entry.softwareGatePass),
      scientificStatus: 'PARTIAL',
    });
    writeJson(resolve(artifactRoot, 'reference-integration-report.json'), {
      schemaVersion: 1,
      reportVersion: 'W1_06B3_REFERENCE_INTEGRATION_REPORT_V1',
      softwareGatePass: results.every((entry) => entry.softwareGatePass),
      scientificStatus: 'PARTIAL',
      caseCount: results.length,
      coveredArchetypeFamilies: [...new Set(results.map((entry) => entry.archetypeFamily))].sort(compareStableText),
      coveredReferenceKinds: W1_06B3_REQUIRED_REFERENCE_KINDS,
      positiveReferenceCaseIds: uniqueCaseIds(results, 'positive'),
      thresholdReferenceCaseIds: uniqueCaseIds(results, 'threshold'),
      negativeReferenceCaseIds: uniqueCaseIds(results, 'negative'),
      approvedExceptionCaseIds: uniqueCaseIds(results, 'exception'),
      limitations: results[0].limitations,
      nextScope: 'W1-07 Wave 1 completion and promotion-readiness report with no physical-output change',
    });
  });

  it('fails closed when a required evidence class or rule is missing', () => {
    const withoutNegative: RegistrySnapshot = {
      ...registrySnapshot,
      references: registrySnapshot.references.filter((entry) => entry.kind !== 'negative'),
    };
    const missingKind = resolveCausalShadowReferenceIntegration(corpus.queries[0], new GeologyReferenceRegistry(withoutNegative));
    expect(missingKind.softwareGatePass).toBe(false);
    expect(missingKind.scientificStatus).toBe('FAILED');
    expect(missingKind.missingReferenceKinds).toEqual(['negative']);
    expect(missingKind.negativeReferenceCaseIds).toEqual([]);

    const unknownRuleQuery: CausalShadowReferenceQueryV1 = {
      ...corpus.queries[0],
      ruleIds: ['w1-06b3.unknown-rule'],
    };
    const unknownRule = resolveCausalShadowReferenceIntegration(unknownRuleQuery, new GeologyReferenceRegistry(registrySnapshot));
    expect(unknownRule.softwareGatePass).toBe(false);
    expect(unknownRule.unknownRuleIds).toEqual(['w1-06b3.unknown-rule']);
    expect(unknownRule.missingReferenceKinds).toEqual(W1_06B3_REQUIRED_REFERENCE_KINDS);
  });
});

function validateCorpus(value: ReferenceQueryCorpusV1): void {
  expect(value.schemaVersion).toBe(1);
  expect(value.corpusVersion).toBe('W1_06B3_REFERENCE_QUERY_CORPUS_V1');
  expect(value.authorityMode).toBe('CAUSAL_SHADOW');
  expect(value.physicalGeneratorAuthority).toBe('LEGACY');
  expect(value.queries).toHaveLength(W1_06_REQUIRED_ARCHETYPE_FAMILIES.length);

  const caseIds = new Set<string>();
  const seeds = new Set<string>();
  const families = new Set<string>();
  for (const query of value.queries) {
    expect(caseIds.has(query.caseId)).toBe(false);
    expect(seeds.has(query.rootSeed)).toBe(false);
    expect(families.has(query.archetypeFamily)).toBe(false);
    expect(query.ruleIds).toEqual(['w1-06b3.detached-causal-comparison']);
    caseIds.add(query.caseId);
    seeds.add(query.rootSeed);
    families.add(query.archetypeFamily);
  }
  expect(families).toEqual(new Set(W1_06_REQUIRED_ARCHETYPE_FAMILIES));
}

function uniqueCaseIds(results: readonly CausalShadowReferenceIntegrationResultV1[], kind: typeof W1_06B3_REQUIRED_REFERENCE_KINDS[number]): readonly string[] {
  return [...new Set(results.flatMap((result) =>
    result.referencesByKind
      .find((entry) => entry.kind === kind)?.matches
      .map((match) => match.reference.caseId) ?? []))]
    .sort(compareStableText);
}

function readFixtureJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(fixtureRoot, fileName), 'utf8')) as T;
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(resolve(path, '..'), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
