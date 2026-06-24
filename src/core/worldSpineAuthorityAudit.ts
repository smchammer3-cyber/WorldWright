import { getCurrentGenerateStageContract, type CurrentGenerateStageKind, type CurrentGenerateStageRisk } from './generateCurrentStageRegistry';
import { computeGeneratedStageDiagnostics, type GenerateStageDiagnostics, type GenerateStageSnapshot } from './worldGenerateStageDiagnostics';
import type { WorldBrain } from './worldSchema';

export type WorldSpineLayerKind = 'raw-identity' | 'cause' | 'feature-material' | 'terrain' | 'derived-surface' | 'visible-output';
export type WorldSpineRiskLevel = 'ok' | 'watch' | 'problem';

export type WorldSpineLayerSnapshot = {
  id: string;
  label: string;
  kind: WorldSpineLayerKind;
  owns: string;
  reads: string[];
  writes: string[];
  mayShapeTerrain: boolean;
  risk: WorldSpineRiskLevel;
  note: string;
};

export type WorldSpineStageAudit = {
  id: string;
  label: string;
  summary: string;
  layers: WorldSpineLayerSnapshot[];
  terrainChanged: boolean;
  topologyFlipped: boolean;
  imprintDelta: {
    plate: number | null;
    province: number | null;
    skeleton: number | null;
  };
  risk: WorldSpineRiskLevel;
  findings: string[];
};

export type WorldSpineAuthorityAudit = {
  seed: string;
  grid: string;
  contract: string[];
  stages: WorldSpineStageAudit[];
  topFindings: string[];
  source: GenerateStageDiagnostics;
};

export function computeWorldSpineAuthorityAudit(world: WorldBrain | null | undefined): WorldSpineAuthorityAudit | null {
  const stageDiagnostics = computeGeneratedStageDiagnostics(world);
  if (!stageDiagnostics) return null;

  const stages = stageDiagnostics.stages.map((stage) => auditStage(stage));
  return {
    seed: stageDiagnostics.seed,
    grid: stageDiagnostics.grid,
    contract: [
      'Raw identity explains where plates/provinces/skeleton regions came from; it does not own visible terrain by itself.',
      'Derived feature/material layers may shape terrain when they represent explicit geology: uplift, crust thickness, crust age, volcanism, margins, shelves, islands.',
      'Terrain owns final color and export height; final color should not reinterpret raw hidden labels.',
      'Cause reseeds after terrain shaping are explanation sync only; they must not feed a later terrain writer in the same pipeline.',
      'World Spine stage ownership is backed by the Generate current-stage registry; unregistered stages are diagnostic problems.',
    ],
    stages,
    topFindings: summarizeFindings(stages),
    source: stageDiagnostics,
  };
}

function auditStage(stage: GenerateStageSnapshot): WorldSpineStageAudit {
  const layers = layerSnapshotsForStage(stage);
  const terrainChanged = (stage.transitionFromPrevious?.meanAbsHeightDelta ?? 0) > 0.0005;
  const topologyFlipped = (stage.transitionFromPrevious?.topologyFlipShare ?? 0) > 0.002;
  const imprintDelta = {
    plate: stage.deltaFromPrevious?.plateSeamHeightRatio ?? null,
    province: stage.deltaFromPrevious?.provinceSeamHeightRatio ?? null,
    skeleton: stage.deltaFromPrevious?.skeletonSeamHeightRatio ?? null,
  };
  const findings = stageFindings(stage, layers, terrainChanged, topologyFlipped, imprintDelta);
  const risk = findings.some((finding) => finding.startsWith('Problem:'))
    ? 'problem'
    : findings.some((finding) => finding.startsWith('Watch:'))
      ? 'watch'
      : 'ok';

  return {
    id: stage.id,
    label: stage.label,
    summary: stage.note,
    layers,
    terrainChanged,
    topologyFlipped,
    imprintDelta,
    risk,
    findings,
  };
}

function layerSnapshotsForStage(stage: GenerateStageSnapshot): WorldSpineLayerSnapshot[] {
  const stageContract = getCurrentGenerateStageContract(stage.id);
  return [
    {
      id: stageContract.id,
      label: stageContract.label,
      kind: toWorldSpineKind(stageContract.kind),
      owns: stageContract.registryLayerIds.join(', '),
      reads: [...stageContract.allowedReads],
      writes: [...stageContract.allowedWrites],
      mayShapeTerrain: stageContract.mayShapeTerrain,
      risk: toWorldSpineRisk(stageContract.risk),
      note: stageContract.note,
    },
  ];
}

function stageFindings(
  stage: GenerateStageSnapshot,
  layers: WorldSpineLayerSnapshot[],
  terrainChanged: boolean,
  topologyFlipped: boolean,
  imprintDelta: { plate: number | null; province: number | null; skeleton: number | null },
): string[] {
  const findings: string[] = [];
  const highRiskTerrainLayer = layers.find((layer) => layer.mayShapeTerrain && layer.risk === 'problem');
  const stageContract = getCurrentGenerateStageContract(stage.id);

  if (layers.length === 0) {
    findings.push('Problem: stage has no registered Generate stage contract.');
  }
  if (highRiskTerrainLayer) {
    findings.push(`Problem: ${highRiskTerrainLayer.label} writes terrain from questionable authority.`);
  }
  for (const violation of stageContract.knownViolations) {
    findings.push(stageContract.risk === 'problem' ? `Problem: ${violation}.` : `Watch: ${violation}.`);
  }
  if (terrainChanged && (positive(imprintDelta.plate) > 0.05 || positive(imprintDelta.province) > 0.05 || positive(imprintDelta.skeleton) > 0.05)) {
    findings.push('Problem: terrain changed while raw plate/province/skeleton imprint increased.');
  }
  if (topologyFlipped) {
    findings.push('Watch: land/water topology changed at this stage.');
  }
  for (const layer of layers) {
    if (layer.risk === 'watch') findings.push(`Watch: ${layer.label} needs ownership review.`);
  }
  if (findings.length === 0) findings.push('OK: no immediate ownership violation flagged for this stage.');
  return findings;
}

function summarizeFindings(stages: WorldSpineStageAudit[]): string[] {
  const out: string[] = [];
  for (const stage of stages) {
    for (const finding of stage.findings) {
      if (finding.startsWith('Problem:')) out.push(`${stage.label}: ${finding.replace('Problem: ', '')}`);
      if (out.length >= 6) return out;
    }
  }
  return out.length > 0 ? out : ['No high-risk ownership violations detected by the audit model.'];
}

function toWorldSpineKind(kind: CurrentGenerateStageKind): WorldSpineLayerKind {
  return kind;
}

function toWorldSpineRisk(risk: CurrentGenerateStageRisk): WorldSpineRiskLevel {
  return risk;
}

function positive(value: number | null): number {
  return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, value) : 0;
}
