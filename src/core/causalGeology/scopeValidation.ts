import type { CausalShadowRunV1, CausalStageResultV1, PlanetaryPremiseV1 } from './types';
import {
  validateCausalShadowRun as validateBaseCausalShadowRun,
  validateCausalStageResult as validateBaseCausalStageResult,
  validatePlanetaryPremise as validateBasePlanetaryPremise,
} from './validation';

const PLANETARY_PREMISE_KEYS = new Set([
  'schemaVersion',
  'premiseVersion',
  'status',
  'inputSnapshotHash',
  'bodyClassCandidates',
  'surfaceMediumCandidates',
  'layerStackCandidates',
  'resolvedBodyClass',
  'resolvedSurfaceMedium',
  'resolvedLayerStack',
  'assumptions',
  'branchResolutionIds',
  'confidenceAssessmentSubject',
  'evidenceIds',
  'contradictionIds',
  'limitations',
  'contentHash',
]);

const FORBIDDEN_PREMISE_CONCLUSION_PATTERN = /(?:\b(?:tectonic(?:s)?|plates?|resurfac\w*|continents?|basins?|epochs?|terrain)\b|impact[\s_-]*history)/i;

export function validatePlanetaryPremise(value: unknown): asserts value is PlanetaryPremiseV1 {
  validateBasePlanetaryPremise(value);
  assertPlanetaryPremiseScope(value);
}

export function validateCausalStageResult(value: unknown): asserts value is CausalStageResultV1 {
  validateBaseCausalStageResult(value);
  if (value.stageId === 'CAUSAL_PREMISE_RESOLUTION' && value.record !== undefined) {
    assertPlanetaryPremiseScope(value.record as PlanetaryPremiseV1);
  }
}

export function validateCausalShadowRun(value: unknown): asserts value is CausalShadowRunV1 {
  validateBaseCausalShadowRun(value);
  if (value.premise !== undefined) assertPlanetaryPremiseScope(value.premise);
  for (const result of value.stageResults) {
    if (result.stageId === 'CAUSAL_PREMISE_RESOLUTION' && result.record !== undefined) {
      assertPlanetaryPremiseScope(result.record as PlanetaryPremiseV1);
    }
  }
}

function assertPlanetaryPremiseScope(premise: PlanetaryPremiseV1): void {
  for (const key of Object.keys(premise)) {
    if (!PLANETARY_PREMISE_KEYS.has(key)) throw new Error(`Planetary premise contains an unowned field: ${key}.`);
  }

  const conclusionValues = [
    ...premise.bodyClassCandidates,
    ...premise.surfaceMediumCandidates,
    ...premise.layerStackCandidates,
    ...(premise.resolvedBodyClass === undefined ? [] : [premise.resolvedBodyClass]),
    ...(premise.resolvedSurfaceMedium === undefined ? [] : [premise.resolvedSurfaceMedium]),
    ...(premise.resolvedLayerStack ?? []),
    ...premise.assumptions,
  ];
  for (const candidate of conclusionValues) {
    const match = candidate.match(FORBIDDEN_PREMISE_CONCLUSION_PATTERN);
    if (match) throw new Error(`Planetary premise contains forbidden later-stage conclusion: ${match[0]}.`);
  }
}
