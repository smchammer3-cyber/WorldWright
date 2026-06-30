import { computeGeneratedStageDiagnostics, type GenerateStageDiagnostics, type GenerateStageId, type GenerateStageSnapshot } from './worldGenerateStageDiagnostics';
import type { WorldBrain } from './worldSchema';

export type GeologicAuthorityThresholds = {
  submergedContinentGhostShare: number;
  oceanContinentAuthorityOverlapShare: number;
  landWeakReliefAuthorityShare: number;
  roundSubmergedRegionShare: number;
  authorityMismatchShare: number;
  finalTerrainColorMaskShare: number;
};

export type GeologicAuthorityMetricId = keyof GeologicAuthorityThresholds;

export type GeologicAuthorityGateMetric = {
  id: GeologicAuthorityMetricId;
  label: string;
  value: number;
  threshold: number;
  passed: boolean;
  stageId: GenerateStageId;
  aggregationScope: 'all-stages' | 'final-stage';
  blueprintContract: string;
  explanation: string;
};

export type GeologicAuthorityDiagnosticSummary = {
  seed: string;
  grid: string;
  thresholds: GeologicAuthorityThresholds;
  stageMetrics: Array<{
    stageId: GenerateStageId;
    label: string;
    submergedContinentGhostShare: number;
    oceanContinentAuthorityOverlapShare: number;
    landWeakReliefAuthorityShare: number;
    roundSubmergedRegionShare: number;
    authorityMismatchShare: number;
    finalTerrainColorMaskShare: number;
  }>;
  gates: GeologicAuthorityGateMetric[];
  finalStageGates: GeologicAuthorityGateMetric[];
  pass: boolean;
  finalStagePass: boolean;
  firstFailedAuthorityLayer: GenerateStageId | null;
  firstFailedExplanation: string;
  controllingBlueprintContract: string;
};

export const DEFAULT_GEOLOGIC_AUTHORITY_THRESHOLDS: GeologicAuthorityThresholds = {
  submergedContinentGhostShare: 0.055,
  oceanContinentAuthorityOverlapShare: 0.070,
  landWeakReliefAuthorityShare: 0.34,
  roundSubmergedRegionShare: 0.030,
  authorityMismatchShare: 0.16,
  finalTerrainColorMaskShare: 0.09,
};

const STRUCTURE_CONTRACT = 'WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_AND_OCEAN_BASIN_STRUCTURE.md';
const TERRAIN_CONTRACT = 'WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_CORE_CONTRACT.md';
const SEA_LEVEL_CONTRACT = 'WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEA_LEVEL_SOLVE_CORE_CONTRACT.md';

const GATE_DEFINITIONS: Array<{
  id: GeologicAuthorityMetricId;
  label: string;
  blueprintContract: string;
  explanation: string;
}> = [
  { id: 'submergedContinentGhostShare', label: 'Submerged continent ghost cells', blueprintContract: STRUCTURE_CONTRACT, explanation: 'Open-ocean water cells retain strong continental authority instead of being explained as shelf, margin, drowned fragment, or suppressed ocean basin.' },
  { id: 'oceanContinentAuthorityOverlapShare', label: 'Ocean/continent authority overlap', blueprintContract: STRUCTURE_CONTRACT, explanation: 'Ocean cells overlap strong continental/province authority, indicating authority leakage.' },
  { id: 'landWeakReliefAuthorityShare', label: 'Weak landform authority on land', blueprintContract: TERRAIN_CONTRACT, explanation: 'Land exists with weak continentality and weak relief authority.' },
  { id: 'roundSubmergedRegionShare', label: 'Large round submerged continental-region proxy', blueprintContract: STRUCTURE_CONTRACT, explanation: 'Proxy metric for round underwater continent-like regions; this is not yet connected-component circularity.' },
  { id: 'authorityMismatchShare', label: 'Authority mismatch', blueprintContract: TERRAIN_CONTRACT, explanation: 'Continent, ocean, province, process, bathymetry, and terrain layers disagree.' },
  { id: 'finalTerrainColorMaskShare', label: 'Final terrain/color masking risk', blueprintContract: SEA_LEVEL_CONTRACT, explanation: 'Final terrain/color should not override upstream authority diagnostics.' },
];

export function computeGeologicAuthorityDiagnosticSummary(
  world: WorldBrain | null | undefined,
  thresholds: GeologicAuthorityThresholds = DEFAULT_GEOLOGIC_AUTHORITY_THRESHOLDS,
): GeologicAuthorityDiagnosticSummary | null {
  const diagnostics = computeGeneratedStageDiagnostics(world) as GenerateStageDiagnostics | null;
  if (!diagnostics) return null;

  const stageMetrics = diagnostics.stages.map((stage) => metricsForStage(stage));
  const finalStage = stageMetrics[stageMetrics.length - 1];
  const gates = GATE_DEFINITIONS.map((definition) => allStageGate(definition, stageMetrics, thresholds));
  const finalStageGates = GATE_DEFINITIONS.map((definition) => finalStageGate(definition, finalStage, thresholds));
  const firstFailed = firstFailedStage(stageMetrics, thresholds);

  return {
    seed: diagnostics.seed,
    grid: diagnostics.grid,
    thresholds,
    stageMetrics,
    gates,
    finalStageGates,
    pass: gates.every((metric) => metric.passed),
    finalStagePass: finalStageGates.every((metric) => metric.passed),
    firstFailedAuthorityLayer: firstFailed?.stageId ?? null,
    firstFailedExplanation: firstFailed?.explanation ?? 'No geologic authority gate exceeded its threshold in the recorded Generate stages.',
    controllingBlueprintContract: STRUCTURE_CONTRACT,
  };
}

function metricsForStage(stage: GenerateStageSnapshot): GeologicAuthorityDiagnosticSummary['stageMetrics'][number] {
  const raw = stage.raw;
  const submergedContinentGhostShare = raw.openOceanContinentGhostShare;
  const oceanContinentAuthorityOverlapShare = Math.max(raw.strongContinentalityWaterShare, raw.oceanProvinceAuthorityLeakShare, raw.oceanPlateAuthorityLeakShare);
  const landWeakReliefAuthorityShare = Math.max(0, raw.lowContinentalityLandShare - raw.landHeightStdDev);
  const roundSubmergedRegionShare = Math.max(0, raw.openOceanContinentGhostShare * (raw.skeletonSeamHeightRatio ?? 1) - raw.featureAuthorityCoverage * 0.25);
  const authorityMismatchShare = Math.max(raw.plateTypeTerrainMismatch, raw.plateAuthorityLeakShare, raw.provinceAuthorityLeakShare, raw.strongContinentalityWaterShare * 0.65);
  const finalTerrainColorMaskShare = Math.max(raw.geologicAuthority.plateAuthorityLeakShare, raw.geologicAuthority.provinceAuthorityLeakShare, raw.geologicAuthority.oceanProvinceAuthorityLeakShare, raw.openOceanContinentGhostShare);
  return { stageId: stage.id, label: stage.label, submergedContinentGhostShare, oceanContinentAuthorityOverlapShare, landWeakReliefAuthorityShare, roundSubmergedRegionShare, authorityMismatchShare, finalTerrainColorMaskShare };
}

function allStageGate(
  definition: (typeof GATE_DEFINITIONS)[number],
  stages: GeologicAuthorityDiagnosticSummary['stageMetrics'],
  thresholds: GeologicAuthorityThresholds,
): GeologicAuthorityGateMetric {
  const worst = stages.reduce((best, stage) => metricValue(stage, definition.id) > metricValue(best, definition.id) ? stage : best, stages[0]);
  return makeGate(definition, metricValue(worst, definition.id), thresholds[definition.id], worst.stageId, 'all-stages');
}

function finalStageGate(
  definition: (typeof GATE_DEFINITIONS)[number],
  finalStage: GeologicAuthorityDiagnosticSummary['stageMetrics'][number],
  thresholds: GeologicAuthorityThresholds,
): GeologicAuthorityGateMetric {
  return makeGate(definition, metricValue(finalStage, definition.id), thresholds[definition.id], finalStage.stageId, 'final-stage');
}

function metricValue(stage: GeologicAuthorityDiagnosticSummary['stageMetrics'][number], id: GeologicAuthorityMetricId): number {
  return stage[id];
}

function makeGate(
  definition: (typeof GATE_DEFINITIONS)[number],
  value: number,
  threshold: number,
  stageId: GenerateStageId,
  aggregationScope: GeologicAuthorityGateMetric['aggregationScope'],
): GeologicAuthorityGateMetric {
  return { id: definition.id, label: definition.label, value, threshold, passed: value <= threshold, stageId, aggregationScope, blueprintContract: definition.blueprintContract, explanation: definition.explanation };
}

function firstFailedStage(stages: GeologicAuthorityDiagnosticSummary['stageMetrics'], thresholds: GeologicAuthorityThresholds): { stageId: GenerateStageId; explanation: string } | null {
  for (const stage of stages) {
    if (stage.submergedContinentGhostShare > thresholds.submergedContinentGhostShare) return { stageId: stage.stageId, explanation: `${stage.label} first exceeds submerged continent ghost threshold.` };
    if (stage.oceanContinentAuthorityOverlapShare > thresholds.oceanContinentAuthorityOverlapShare) return { stageId: stage.stageId, explanation: `${stage.label} first shows strong ocean/continent/province overlap.` };
    if (stage.landWeakReliefAuthorityShare > thresholds.landWeakReliefAuthorityShare) return { stageId: stage.stageId, explanation: `${stage.label} first shows land with weak landform/relief authority.` };
    if (stage.roundSubmergedRegionShare > thresholds.roundSubmergedRegionShare) return { stageId: stage.stageId, explanation: `${stage.label} first shows large round submerged continental-region proxy risk.` };
    if (stage.authorityMismatchShare > thresholds.authorityMismatchShare) return { stageId: stage.stageId, explanation: `${stage.label} first exceeds authority mismatch threshold.` };
    if (stage.finalTerrainColorMaskShare > thresholds.finalTerrainColorMaskShare) return { stageId: stage.stageId, explanation: `${stage.label} first shows final terrain/color masking risk.` };
  }
  return null;
}
