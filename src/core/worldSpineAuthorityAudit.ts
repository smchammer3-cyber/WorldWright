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
  switch (stage.id) {
    case 'RAW_GENERATOR':
      return [
        layer('plate-source', 'Plate layout', 'raw-identity', 'Initial plate partition and boundary context', ['seed', 'generator params'], ['plateId', 'plateType', 'boundaryType'], false, 'ok', 'Creates identity context.'),
        layer('raw-terrain', 'Initial terrain', 'terrain', 'First height field', ['plate context', 'generator params'], ['baseHeight'], true, 'watch', 'This is the source terrain writer, so identity coupling here must stay broad and intentional.'),
      ];
    case 'CONTINENT_FIELDS':
      return [
        layer('continent-cause', 'Continent/shelf causes', 'cause', 'Skeleton explanation fields', ['terrain', 'plate context'], ['continentality', 'continentId', 'oceanBasinId', 'shelfStrength', 'marginType'], false, 'watch', 'Reads terrain to seed causes; safe only if not later reused as raw terrain authority without derived features.'),
      ];
    case 'SKELETON_ELEVATION':
      return [
        layer('skeleton-terrain', 'Skeleton terrain guidance', 'terrain', 'Broad continent/ocean terrain shaping', ['continentality', 'continentCoreStrength', 'shelfStrength', 'marginType'], ['baseHeight'], true, 'watch', 'Legitimate terrain stage, but should not stamp skeleton IDs or later run twice.'),
      ];
    case 'FIRST_RECOMPUTE':
    case 'FINAL_RECOMPUTE':
      return [
        layer('derived-surface', 'Derived surface', 'derived-surface', 'Terrain-derived water/climate/color inputs', ['baseHeight', 'terrain deltas'], ['isWater', 'oceanDepthClass', 'temperature', 'rainfall', 'snowCover', 'baseBiomeId'], false, 'ok', 'Derived refresh; should not write terrain.'),
      ];
    case 'QUALITY_PASS':
      return [
        layer('quality-terrain', 'Quality terrain pass', 'terrain', 'General terrain cleanup', ['terrain', 'surface', 'skeleton', 'plate'], ['baseHeight'], true, 'watch', 'Allowed cleanup, but raw identity reads while shaping terrain deserve inspection.'),
      ];
    case 'CRUST_FIELDS':
      return [
        layer('crust-cause', 'Crust causes', 'cause', 'Crust explanation fields', ['terrain', 'surface', 'plate', 'skeleton'], ['crustThickness', 'crustAge', 'crustProvince'], false, 'problem', 'Crust province is derived after terrain shaping and later crust terrain stages read it.'),
      ];
    case 'CRUST_PROVINCE_DELTA':
      return [
        layer('crust-province-terrain', 'Crust/province terrain', 'terrain', 'Crust terrain shaping', ['crustProvince', 'crustThickness', 'crustAge', 'upliftRate', 'volcanicActivity', 'oceanDepthClass'], ['baseHeight'], true, 'problem', 'Raw province labels participate in terrain writes here.'),
      ];
    case 'CRUST_COAST_BREAKUP':
      return [
        layer('crust-coast-terrain', 'Crust coast terrain', 'terrain', 'Near-shore terrain shaping', ['crustProvince', 'terrain', 'surface'], ['baseHeight'], true, 'problem', 'Still uses crustProvince while writing terrain.'),
      ];
    case 'CRUST_COHERENCE':
      return [
        layer('crust-coherence-terrain', 'Crust coherence terrain', 'terrain', 'Hole/fray cleanup', ['crustProvince', 'terrain', 'surface'], ['baseHeight'], true, 'watch', 'Cleanup is valid, but province reads while shaping terrain should be replaced by feature/material support.'),
      ];
    case 'CRUST_SKELETON_OBEDIENCE':
      return [
        layer('crust-skeleton-terrain', 'Late skeleton terrain', 'terrain', 'Second skeleton reinforcement', ['continentality', 'continentCoreStrength', 'shelfStrength', 'marginType', 'islandCause'], ['baseHeight'], true, 'problem', 'Skeleton has already shaped terrain once; this can double-apply skeleton authority.'),
      ];
    case 'CRUST_TINY_ISLAND_CLEANUP':
      return [
        layer('tiny-island-cleanup', 'Tiny island cleanup', 'terrain', 'Topology cleanup', ['terrain', 'islandCause', 'crustProvince'], ['baseHeight'], true, 'watch', 'Cleanup is legitimate, but caused-island classification must not be raw label authority.'),
      ];
    case 'OCEAN_BATHYMETRY_SMOOTHING':
      return [
        layer('ocean-terrain-cleanup', 'Ocean bathymetry cleanup', 'terrain', 'Underwater terrain cleanup', ['terrain', 'surface', 'skeleton', 'crust', 'feature authority'], ['baseHeight'], true, 'watch', 'Acceptable only when preserving explicit ridges/trenches/arcs and not hiding raw identity leaks.'),
      ];
    case 'FINAL_CONTINENT_RESEED':
      return [
        layer('final-continent-sync', 'Final continent cause sync', 'cause', 'Final explanation sync', ['final terrain', 'surface', 'plate'], ['shelfStrength', 'islandCause', 'marginType'], false, 'watch', 'Safe only if no later terrain writer reads these fields in the same pipeline.'),
      ];
    case 'FINAL_CRUST_RESEED':
      return [
        layer('final-crust-sync', 'Final crust cause sync', 'cause', 'Final explanation sync', ['final terrain', 'surface', 'plate', 'skeleton', 'feature authority'], ['crustThickness', 'crustAge', 'crustProvince'], false, 'watch', 'Safe only as final explanation labels; dangerous if future terrain passes read them.'),
      ];
    default:
      return [];
  }
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
  if (highRiskTerrainLayer) {
    findings.push(`Problem: ${highRiskTerrainLayer.label} writes terrain from questionable authority.`);
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

function layer(
  id: string,
  label: string,
  kind: WorldSpineLayerKind,
  owns: string,
  reads: string[],
  writes: string[],
  mayShapeTerrain: boolean,
  risk: WorldSpineRiskLevel,
  note: string,
): WorldSpineLayerSnapshot {
  return { id, label, kind, owns, reads, writes, mayShapeTerrain, risk, note };
}

function positive(value: number | null): number {
  return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, value) : 0;
}
