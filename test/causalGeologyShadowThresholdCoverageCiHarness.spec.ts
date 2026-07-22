import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  W1_06B_CANONICAL_DIRECT_INPUT_AXES,
  createCausalGeologyInput,
  createCausalShadowThresholdCoverageReport,
  createScientificQuantity,
  hashCausalPayload,
  validateCausalGeologyInput,
  validateCausalShadowThresholdCorpus,
  validateCausalShadowThresholdCoverageReport,
  type CausalInputDeclarationV1,
  type CausalShadowThresholdCaseV1,
  type CausalShadowThresholdCorpusV1,
  type CausalShadowThresholdExecutionV1,
  type CausalGeologyInputV1,
} from '../src/core/causalGeology';

const repositoryRoot = process.cwd();
const fixtureRoot = resolve(repositoryRoot, 'test/fixtures');
const artifactRoot = resolve(
  repositoryRoot,
  process.env.CAUSAL_SHADOW_THRESHOLD_CI_OUT ?? 'artifacts/causal-shadow-threshold-gate',
);
const corpus = readFixtureJson<CausalShadowThresholdCorpusV1>('w1-06b1-direct-input-threshold-corpus.json');

type ThresholdPosition = 'low' | 'reference' | 'high';

describe('W1-06B1 canonical direct-input threshold CI harness', () => {
  it('executes all 12 authority inputs as deterministic isolated low/reference/high triplets', () => {
    validateCausalShadowThresholdCorpus(corpus);
    expect(corpus.cases.map((entry) => entry.axis)).toEqual(W1_06B_CANONICAL_DIRECT_INPUT_AXES);

    rmSync(artifactRoot, { recursive: true, force: true });
    mkdirSync(artifactRoot, { recursive: true });

    const executions: CausalShadowThresholdExecutionV1[] = [];
    for (const caseDefinition of corpus.cases) {
      const startTime = performance.now();
      const low = inputFor(caseDefinition, 'low');
      const reference = inputFor(caseDefinition, 'reference');
      const high = inputFor(caseDefinition, 'high');
      const lowReplay = inputFor(caseDefinition, 'low');
      const referenceReplay = inputFor(caseDefinition, 'reference');
      const highReplay = inputFor(caseDefinition, 'high');

      validateCausalGeologyInput(low);
      validateCausalGeologyInput(reference);
      validateCausalGeologyInput(high);
      expect(low).toEqual(lowReplay);
      expect(reference).toEqual(referenceReplay);
      expect(high).toEqual(highReplay);

      const execution: CausalShadowThresholdExecutionV1 = {
        schemaVersion: 1,
        caseId: caseDefinition.caseId,
        rootSeed: caseDefinition.rootSeed,
        axis: caseDefinition.axis,
        unit: caseDefinition.unit,
        scaleId: caseDefinition.scaleId,
        lowValue: caseDefinition.values.low,
        referenceValue: caseDefinition.values.reference,
        highValue: caseDefinition.values.high,
        downstreamTarget: caseDefinition.downstreamTarget,
        expectedRelation: caseDefinition.expectedRelation,
        relationStatus: caseDefinition.relationStatus,
        inputHashes: {
          low: low.contentHash.value,
          reference: reference.contentHash.value,
          high: high.contentHash.value,
        },
        replayStable:
          JSON.stringify(low) === JSON.stringify(lowReplay)
          && JSON.stringify(reference) === JSON.stringify(referenceReplay)
          && JSON.stringify(high) === JSON.stringify(highReplay),
        isolatedAxisChange:
          onlyAxisChanged(low, reference, caseDefinition.axis)
          && onlyAxisChanged(reference, high, caseDefinition.axis),
        durationMilliseconds: performance.now() - startTime,
        serializedPayloadBytes: Buffer.byteLength(JSON.stringify({ low, reference, high }), 'utf8'),
      };
      executions.push(execution);
      writeJson(resolve(artifactRoot, 'cases', `${caseDefinition.caseId}.json`), execution);
    }

    const report = createCausalShadowThresholdCoverageReport(executions);
    validateCausalShadowThresholdCoverageReport(report);

    expect(report.softwareGatePass).toBe(true);
    expect(report.scientificStatus).toBe('PARTIAL');
    expect(report.caseCount).toBe(12);
    expect(report.coverage.coveredAxes).toEqual(W1_06B_CANONICAL_DIRECT_INPUT_AXES);
    expect(report.coverage.missingAxes).toEqual([]);
    expect(report.coverage.duplicateAxes).toEqual([]);
    expect(report.determinism.replayFailureCaseIds).toEqual([]);
    expect(report.determinism.hashCollisionCaseIds).toEqual([]);
    expect(report.isolation.failureCaseIds).toEqual([]);
    expect(report.evidence.reviewedAxes).toEqual([]);
    expect(report.evidence.researchRequiredAxes).toHaveLength(12);
    expect(report.performance.overBudgetCaseIds).toEqual([]);
    expect(Object.isFrozen(report)).toBe(true);

    writeJson(resolve(artifactRoot, 'corpus-manifest.json'), {
      schemaVersion: 1,
      corpusVersion: corpus.corpusVersion,
      authorityMode: corpus.authorityMode,
      physicalGeneratorAuthority: corpus.physicalGeneratorAuthority,
      caseCount: corpus.cases.length,
      axisCount: new Set(corpus.cases.map((entry) => entry.axis)).size,
      softwareGatePass: report.softwareGatePass,
      scientificStatus: report.scientificStatus,
    });
    writeJson(resolve(artifactRoot, 'threshold-coverage-report.json'), report);
    writeJson(resolve(artifactRoot, 'scientific-limitations.json'), {
      schemaVersion: 1,
      scientificStatus: report.scientificStatus,
      researchRequiredAxes: report.evidence.researchRequiredAxes,
      limitations: report.limitations,
      nextScope: 'W1-06B2 controlled archetype completion and reviewed downstream sensitivity evidence',
    });
  });

  it('rejects duplicate axes rather than counting aliases as completed threshold coverage', () => {
    const duplicate = JSON.parse(JSON.stringify(corpus)) as CausalShadowThresholdCorpusV1;
    const cases = duplicate.cases as CausalShadowThresholdCaseV1[];
    cases[1] = { ...cases[1], axis: cases[0].axis, unit: cases[0].unit, scaleId: cases[0].scaleId };
    expect(() => validateCausalShadowThresholdCorpus(duplicate)).toThrow(/Duplicate causal threshold axis/);
  });
});

function inputFor(caseDefinition: CausalShadowThresholdCaseV1, position: ThresholdPosition): CausalGeologyInputV1 {
  const declarations: CausalInputDeclarationV1[] = corpus.cases.map((entry) => ({
    schemaVersion: 1,
    inputId: entry.axis,
    quantity: createScientificQuantity(
      entry.axis === caseDefinition.axis ? entry.values[position] : entry.values.reference,
      entry.unit,
      entry.scaleId,
    ),
    sourceClass: 'DIRECT_DECLARATION',
    sourceRecordId: `w1-06b1/${caseDefinition.caseId}/${entry.axis}`,
    confidenceSubject: `w1-06b1.${caseDefinition.caseId}.${entry.axis}`,
    evidenceIds: [],
  }));
  const bundlePayload = {
    caseId: caseDefinition.caseId,
    position,
    declarations: declarations.map((entry) => ({ inputId: entry.inputId, quantity: entry.quantity })),
  };
  return createCausalGeologyInput(caseDefinition.rootSeed, declarations, {
    initialConditionBundleHash: hashCausalPayload('WorldWright/w1-06b1-threshold-input-bundle/v1', bundlePayload),
    limitations: ['W1-06B1 canonical direct-input threshold execution; downstream scientific relation not yet asserted.'],
  });
}

function onlyAxisChanged(a: CausalGeologyInputV1, b: CausalGeologyInputV1, axis: string): boolean {
  if (a.sourceDeclarations.length !== b.sourceDeclarations.length) return false;
  let changedCount = 0;
  for (let index = 0; index < a.sourceDeclarations.length; index++) {
    const left = a.sourceDeclarations[index];
    const right = b.sourceDeclarations[index];
    if (left.inputId !== right.inputId) return false;
    const changed = JSON.stringify(left) !== JSON.stringify(right);
    if (changed) {
      if (left.inputId !== axis) return false;
      changedCount++;
    }
  }
  return changedCount === 1;
}

function readFixtureJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(fixtureRoot, fileName), 'utf8')) as T;
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(resolve(path, '..'), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}
