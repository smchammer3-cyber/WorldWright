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

export type GeologicAuthorityGateMetric = {
  id: string;
  label: string;
  value: number;
  threshold: number;
  passed: boolean;
  stageId: GenerateStageId;
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
  pass: boolean;
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

export function computeGeologicAuthorityDiagnosticSummary(
  world: WorldBrain | null | undefined,
  thresholds: GeologicAuthorityThresholds = DEFAULT_GEOLOGIC_AUTHORITY_THRESHOLDS,
): GeologicAuthorityDiagnosticSummary | null {
  const diagnostics = computeGeneratedStageDiagnostics(world) as GenerateStageDiagnostics | null;
  if (!diagnostics) return null;

  const stageMetrics = diagnostics.stages.map((stage) => metricsForStage(stage));
  const finalStage = stageMetrics[stageMetrics.length - 1];
  const gates: GeologicAuthorityGateMetric[] = [
    gate('submergedContinentGhostShare', 'Submerged continent ghost cells', finalStage.submergedContinentGhostShare, thresholds.submergedContinentGhostShare, finalStage.stageId, STRUCTURE_CONTRACT, 'Open-ocean water cells retain strong continental authority instead of being explained as shelf, margin, drowned fragment, or suppressed ocean basin.'),
    gate('oceanContinentAuthorityOverlapShare', 'Ocean/continent authority overlap', finalStage.oceanContinentAuthorityOverlapShare, thresholds.oceanContinentAuthorityOverlapShare, finalStage.stageId, STRUCTURE_CONTRACT, 'Ocean cells overlap strong continental/province authority, indicating continent/ocean/province authority leakage.'),
    gate('landWeakReliefAuthorityShare', 'Weak landform authority on land', finalStage.landWeakReliefAuthorityShare, thresholds.landWeakReliefAuthorityShare, finalStage.stageId, TERRAIN_CONTRACT, 'Land exists with weak continentality and weak relief authority, so terrain birth may be producing ugly or unsupported landforms.'),
    gate('roundSubmergedRegionShare', 'Large round submerged continental regions', finalStage.roundSubmergedRegionShare, thresholds.roundSubmergedRegionShare, finalStage.stageId, STRUCTURE_CONTRACT, 'Large round underwater continent-like regions are visible as submerged continent ghosts.'),
    gate('authorityMismatchShare', 'Authority mismatch', finalStage.authorityMismatchShare, thresholds.authorityMismatchShare, finalStage.stageId, TERRAIN_CONTRACT, 'Continent/ocean/province/process/bathymetry/terrain layers disagree enough that downstream terrain cannot be trusted as causal.'),
    gate('finalTerrainColorMaskShare', 'Final terrain/color masking risk', finalStage.finalTerrainColorMaskShare, thresholds.finalTerrainColorMaskShare, finalStage.stageId, SEA_LEVEL_CONTRACT, 'Final terrain/color appears acceptable while upstream authority still has hidden continent/ocean leakage; sea level or color must not conceal this.'),
  ];
  const firstFailed = firstFailedStage(stageMetrics, thresholds);
  return {
    seed: diagnostics.seed,
    grid: diagnostics.grid,
    thresholds,
    stageMetrics,
    gates,
    pass: gates.every((metric) => metric.passed),
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

function gate(id: string, label: string, value: number, threshold: number, stageId: GenerateStageId, blueprintContract: string, explanation: string): GeologicAuthorityGateMetric {
  return { id, label, value, threshold, passed: value <= threshold, stageId, blueprintContract, explanation };
}

function firstFailedStage(stages: GeologicAuthorityDiagnosticSummary['stageMetrics'], thresholds: GeologicAuthorityThresholds): { stageId: GenerateStageId; explanation: string } | null {
  for (const stage of stages) {
    if (stage.submergedContinentGhostShare > thresholds.submergedContinentGhostShare) return { stageId: stage.stageId, explanation: `${stage.label} first exceeds submerged continent ghost threshold.` };
    if (stage.oceanContinentAuthorityOverlapShare > thresholds.oceanContinentAuthorityOverlapShare) return { stageId: stage.stageId, explanation: `${stage.label} first shows strong ocean/continent/province overlap.` };
    if (stage.landWeakReliefAuthorityShare > thresholds.landWeakReliefAuthorityShare) return { stageId: stage.stageId, explanation: `${stage.label} first shows land with weak landform/relief authority.` };
    if (stage.roundSubmergedRegionShare > thresholds.roundSubmergedRegionShare) return { stageId: stage.stageId, explanation: `${stage.label} first shows large round submerged continental-region risk.` };
    if (stage.authorityMismatchShare > thresholds.authorityMismatchShare) return { stageId: stage.stageId, explanation: `${stage.label} first exceeds authority mismatch threshold.` };
    if (stage.finalTerrainColorMaskShare > thresholds.finalTerrainColorMaskShare) return { stageId: stage.stageId, explanation: `${stage.label} first shows final terrain/color masking risk.` };
  }
  return null;
}
