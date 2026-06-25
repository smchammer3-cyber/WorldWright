import { seedContinentSkeletonFields } from './worldContinents';
import {
  applyCoastShapePass,
  applyCrustProvinceTerrainDelta,
  applyMaterialReliefReinforcement,
  applyProvinceCoastBreakup,
  applyProvinceCoherence,
  cleanupAccidentalTinyIslands,
  seedCrustFields,
} from './worldCrust';
import { applyOceanBathymetrySmoothing } from './worldOceanBathymetry';
import { createDefaultGeneratorParams, generateWorldFromParams, type GeneratorParams } from './worldGenerator';
import { applyGeneratedWorldQualityPass } from './worldQualityPass';
import { applySkeletonBaseElevation } from './worldGeographyPipeline';
import { recomputeWorld } from './worldRecompute';
import { applyPlateBoundaryFeatureTerrain } from './worldPlateBoundaryFeatures';
import { applyIsostaticTerrainResponse } from './worldTerrainResponse';
import type { Cell, WorldBrain } from './worldSchema';

export type PipelineAuthorityPhase = 'source' | 'cause-seed' | 'feature-material' | 'terrain-shape' | 'derived-recompute' | 'terrain-cleanup' | 'final-cause-sync';
export type PipelineAuthorityLevel = 'ok' | 'watch' | 'bad';
export type PipelineAuthorityCategory = 'source' | 'cause' | 'feature' | 'material' | 'terrain' | 'derived' | 'terminal';
export type PipelineFieldGroup = 'terrain' | 'derivedSurface' | 'plateCause' | 'skeletonCause' | 'crustCause' | 'featureCause' | 'climateDerived' | 'biomeDerived' | 'hydrologyDerived' | 'worldCollections';

export type PipelineFieldChange = {
  group: PipelineFieldGroup;
  field: string;
  changedCount: number;
  changedShare: number;
  maxDelta?: number;
};

export type PipelineLedgerStage = {
  id: string;
  label: string;
  phase: PipelineAuthorityPhase;
  authorityCategory: PipelineAuthorityCategory;
  authority: string;
  expectedReads: PipelineFieldGroup[];
  allowedWrites: PipelineFieldGroup[];
  actualWrites: PipelineFieldChange[];
  unexpectedWrites: PipelineFieldChange[];
  changedGroups: PipelineFieldGroup[];
  changedCellShare: number;
  terrainWriteShare: number;
  topologyFlipShare: number;
  heightDeltaMean: number;
  heightDeltaMax: number;
  collectionChanges: string[];
  warnings: string[];
  failedConsequence: string | null;
  recommendedNextFix: string | null;
  level: PipelineAuthorityLevel;
};

export type PipelineAuthorityGateFailure = {
  stageId: string;
  firstFailedLayer: string;
  failedConsequence: string;
  authorityCategory: PipelineAuthorityCategory;
  recommendedNextFix: string;
  level: PipelineAuthorityLevel;
};

export type PipelineLedgerSummary = {
  stageCount: number;
  badCount: number;
  watchCount: number;
  firstTerrainWriter: string | null;
  firstDerivedWriter: string | null;
  firstBackwardRisk: string | null;
  firstUnexpectedWriter: string | null;
  firstFailedGate: PipelineAuthorityGateFailure | null;
};

export type GeneratePipelineAuthorityLedger = {
  seed: string;
  grid: string;
  summary: PipelineLedgerSummary;
  stages: PipelineLedgerStage[];
};

type CellSnapshot = {
  baseHeight: number;
  editHeightDelta: number;
  simHeightDelta: number;
  isWater: boolean;
  plateId: number;
  plateType: string | null;
  boundaryType: string | null;
  upliftRate: number;
  surfaceAge: number;
  volcanicActivity: number;
  continentId: number | null;
  continentCoreStrength: number;
  continentality: number;
  distanceToContinentCore: number;
  marginType: string | null;
  oceanBasinId: number | null;
  shelfStrength: number;
  islandCause: string | null;
  crustThickness: number;
  crustAge: number;
  crustProvince: string | null;
  temperature: number;
  rainfall: number;
  snowCover: number;
  baseBiomeId: number;
  editBiomeId: number;
  oceanDepthClass: string | null;
  flowDirection: number | null;
  flowAccumulation: number;
  basinId: number | null;
  climateCellId: number;
};

type WorldSnapshot = { cells: CellSnapshot[]; riverCount: number; riverPathCells: number };

type StageContract = {
  id: string;
  label: string;
  phase: PipelineAuthorityPhase;
  authorityCategory: PipelineAuthorityCategory;
  authority: string;
  expectedReads: PipelineFieldGroup[];
  allowedWrites: PipelineFieldGroup[];
  warningsIfWrites?: Partial<Record<PipelineFieldGroup, string>>;
  intrinsicWarnings?: string[];
  failedConsequence?: string;
  recommendedNextFix?: string;
  run: (world: WorldBrain) => void;
};

const FIELD_GROUPS: Record<keyof CellSnapshot, PipelineFieldGroup> = {
  baseHeight: 'terrain', editHeightDelta: 'terrain', simHeightDelta: 'terrain',
  isWater: 'derivedSurface', oceanDepthClass: 'derivedSurface',
  plateId: 'plateCause', plateType: 'plateCause', boundaryType: 'plateCause',
  upliftRate: 'featureCause', surfaceAge: 'featureCause', volcanicActivity: 'featureCause',
  continentId: 'skeletonCause', continentCoreStrength: 'skeletonCause', continentality: 'skeletonCause', distanceToContinentCore: 'skeletonCause', marginType: 'skeletonCause', oceanBasinId: 'skeletonCause', shelfStrength: 'skeletonCause', islandCause: 'skeletonCause',
  crustThickness: 'crustCause', crustAge: 'crustCause', crustProvince: 'crustCause',
  temperature: 'climateDerived', rainfall: 'climateDerived', snowCover: 'climateDerived', climateCellId: 'climateDerived',
  baseBiomeId: 'biomeDerived', editBiomeId: 'biomeDerived',
  flowDirection: 'hydrologyDerived', flowAccumulation: 'hydrologyDerived', basinId: 'hydrologyDerived',
};

const GROUP_LABELS: Record<PipelineFieldGroup, string> = {
  terrain: 'terrain height',
  derivedSurface: 'derived surface',
  plateCause: 'plate causes',
  skeletonCause: 'skeleton causes',
  crustCause: 'crust causes',
  featureCause: 'feature causes',
  climateDerived: 'climate derived',
  biomeDerived: 'biome derived',
  hydrologyDerived: 'hydrology derived',
  worldCollections: 'world collections',
};

const NUMERIC_EPSILON = 1e-7;

export function computeGeneratePipelineAuthorityLedger(sourceWorld: WorldBrain | null | undefined): GeneratePipelineAuthorityLedger | null {
  if (!sourceWorld?.cells?.length) return null;
  const params = generatorParamsFromWorld(sourceWorld);
  const world = generateWorldFromParams(params);
  const stages: PipelineLedgerStage[] = [sourceStage(world, snapshotWorld(world))];

  for (const contract of stageContracts()) {
    const before = snapshotWorld(world);
    contract.run(world);
    stages.push(stageFromDiff(contract, before, snapshotWorld(world)));
  }

  const summary: PipelineLedgerSummary = {
    stageCount: stages.length,
    badCount: stages.filter((stage) => stage.level === 'bad').length,
    watchCount: stages.filter((stage) => stage.level === 'watch').length,
    firstTerrainWriter: stages.find((stage) => stage.terrainWriteShare > 0)?.label ?? null,
    firstDerivedWriter: stages.find((stage) => stage.changedGroups.some((group) => isDerivedGroup(group)))?.label ?? null,
    firstBackwardRisk: stages.find((stage) => stage.warnings.some((warning) => /backward|feedback|reseed/i.test(warning)))?.label ?? null,
    firstUnexpectedWriter: stages.find((stage) => stage.unexpectedWrites.length > 0)?.label ?? null,
    firstFailedGate: firstFailedGate(stages),
  };

  return { seed: String(params.seed), grid: `${params.width}×${params.height}`, summary, stages };
}

export function pipelineFieldGroupLabel(group: PipelineFieldGroup): string { return GROUP_LABELS[group]; }

function stageContracts(): StageContract[] {
  return [
    { id: 'CONTINENT_FIELDS', label: 'Continent fields', phase: 'cause-seed', authorityCategory: 'cause', authority: 'Seeds continent/ocean skeleton identity from generated terrain and generator parameters.', expectedReads: ['terrain', 'plateCause'], allowedWrites: ['skeletonCause'], intrinsicWarnings: ['Height-derived cause seeding: acceptable as a first interpretation, but dangerous if repeated after terrain shaping.'], failedConsequence: 'Cause fields are being interpreted from generated height instead of a fully upstream morphology resolver.', recommendedNextFix: 'PR 3 should introduce the physical consequence resolver before further terrain tuning.', run: seedContinentSkeletonFields },
    { id: 'PLATE_BOUNDARY_FEATURE_TERRAIN', label: 'Plate feature terrain', phase: 'terrain-shape', authorityCategory: 'feature', authority: 'Turns explicit plate-boundary feature authority into legal terrain response.', expectedReads: ['plateCause', 'featureCause', 'skeletonCause'], allowedWrites: ['terrain'], run: applyPlateBoundaryFeatureTerrain },
    { id: 'SKELETON_ELEVATION', label: 'Skeleton elevation', phase: 'terrain-shape', authorityCategory: 'terrain', authority: 'Uses broad morphology fields to push terrain toward continent, shelf, margin, and basin tendencies.', expectedReads: ['terrain', 'skeletonCause'], allowedWrites: ['terrain'], run: applySkeletonBaseElevation },
    { id: 'FIRST_RECOMPUTE', label: 'First recompute', phase: 'derived-recompute', authorityCategory: 'derived', authority: 'Derives water, ocean class, climate, biome, rivers, and snow from current terrain.', expectedReads: ['terrain', 'skeletonCause', 'plateCause'], allowedWrites: ['derivedSurface', 'climateDerived', 'biomeDerived', 'hydrologyDerived', 'worldCollections'], warningsIfWrites: { terrain: 'Derived recompute wrote terrain, which violates the one-way stack.' }, run: (world) => recomputeWorld(world, ['GENERATED']) },
    { id: 'QUALITY_PASS', label: 'Quality pass', phase: 'terrain-cleanup', authorityCategory: 'terrain', authority: 'Adds interior relief, coast breakup, shelf roughness, and strait cuts to improve generated terrain quality.', expectedReads: ['terrain', 'derivedSurface', 'skeletonCause', 'plateCause'], allowedWrites: ['terrain'], run: applyGeneratedWorldQualityPass },
    { id: 'SECOND_RECOMPUTE', label: 'Second recompute', phase: 'derived-recompute', authorityCategory: 'derived', authority: 'Refreshes derived fields after the quality pass changed terrain.', expectedReads: ['terrain', 'skeletonCause', 'plateCause'], allowedWrites: ['derivedSurface', 'climateDerived', 'biomeDerived', 'hydrologyDerived', 'worldCollections'], warningsIfWrites: { terrain: 'Derived recompute wrote terrain, which violates the one-way stack.' }, run: (world) => recomputeWorld(world, ['GENERATED']) },
    { id: 'CRUST_CONTINENT_RESEED', label: 'Crust continent reseed', phase: 'cause-seed', authorityCategory: 'cause', authority: 'Reinterprets continent/shelf/margin identity after terrain cleanup.', expectedReads: ['terrain', 'derivedSurface', 'plateCause'], allowedWrites: ['skeletonCause'], intrinsicWarnings: ['Backward-feedback risk: skeleton causes are being reseeded after terrain was already shaped.'], failedConsequence: 'Terrain-shaped state is feeding a new cause layer before later terrain writers.', recommendedNextFix: 'Move this to terminal-only sync or replace it with upstream morphology fields before PR 4 pipeline selection.', run: seedContinentSkeletonFields },
    { id: 'CRUST_FIELDS', label: 'Crust fields', phase: 'feature-material', authorityCategory: 'material', authority: 'Seeds crust thickness, age, and province from plates, current height, ocean class, and skeleton context.', expectedReads: ['terrain', 'derivedSurface', 'plateCause', 'featureCause', 'skeletonCause'], allowedWrites: ['crustCause'], intrinsicWarnings: ['Backward-feedback risk: crust fields still read terrain/ocean class before later crust terrain stages.'], failedConsequence: 'Material authority still partially derives from already-shaped terrain instead of a fully upstream material resolver.', recommendedNextFix: 'PR 3 and PR 4 should move material support into the physical consequence/geology-stack resolver.', run: seedCrustFields },
    { id: 'ISOSTATIC_TERRAIN_RESPONSE', label: 'Isostatic terrain', phase: 'terrain-shape', authorityCategory: 'terrain', authority: 'Applies material/feature/gravity terrain response after crust material fields exist.', expectedReads: ['terrain', 'crustCause', 'featureCause', 'skeletonCause', 'climateDerived'], allowedWrites: ['terrain'], run: applyIsostaticTerrainResponse },
    { id: 'CRUST_PROVINCE_DELTA', label: 'Crust delta', phase: 'terrain-shape', authorityCategory: 'terrain', authority: 'Uses material/feature-backed crust fields to create broad terrain tendencies.', expectedReads: ['terrain', 'crustCause', 'featureCause', 'derivedSurface'], allowedWrites: ['terrain'], run: applyCrustProvinceTerrainDelta },
    { id: 'CRUST_COAST_BREAKUP', label: 'Crust coast', phase: 'terrain-shape', authorityCategory: 'terrain', authority: 'Uses material/feature-backed coast behavior to notch and vary coastlines.', expectedReads: ['terrain', 'crustCause', 'derivedSurface'], allowedWrites: ['terrain'], run: applyProvinceCoastBreakup },
    { id: 'CRUST_COHERENCE', label: 'Crust cohere', phase: 'terrain-cleanup', authorityCategory: 'terrain', authority: 'Fills/cleans material-driven holes and frayed lowland edges.', expectedReads: ['terrain', 'crustCause', 'derivedSurface'], allowedWrites: ['terrain'], run: applyProvinceCoherence },
    { id: 'CRUST_TINY_ISLAND_CLEANUP', label: 'Tiny cleanup', phase: 'terrain-cleanup', authorityCategory: 'terrain', authority: 'Removes accidental tiny generated islands after crust shaping.', expectedReads: ['terrain', 'skeletonCause', 'crustCause'], allowedWrites: ['terrain'], run: cleanupAccidentalTinyIslands },
    { id: 'MATERIAL_RELIEF_REINFORCEMENT', label: 'Material relief', phase: 'terrain-shape', authorityCategory: 'terrain', authority: 'Adds bounded land relief from material and feature signals after crust cleanup.', expectedReads: ['terrain', 'crustCause', 'featureCause', 'skeletonCause', 'derivedSurface'], allowedWrites: ['terrain'], run: applyMaterialReliefReinforcement },
    { id: 'COAST_SHAPE_PASS', label: 'Coast shape', phase: 'terrain-cleanup', authorityCategory: 'terrain', authority: 'Adds final local coast variation from solved terrain/water adjacency.', expectedReads: ['terrain', 'derivedSurface', 'plateCause'], allowedWrites: ['terrain'], run: applyCoastShapePass },
    { id: 'OCEAN_BATHYMETRY_SMOOTHING', label: 'Ocean bathy', phase: 'terrain-cleanup', authorityCategory: 'terrain', authority: 'Smooths unexplained underwater bathymetry ghosts while preserving feature/material/morphology causes.', expectedReads: ['terrain', 'featureCause', 'skeletonCause'], allowedWrites: ['terrain'], run: applyOceanBathymetrySmoothing },
    { id: 'FINAL_RECOMPUTE', label: 'Final recompute', phase: 'derived-recompute', authorityCategory: 'derived', authority: 'Refreshes derived state after all terrain-changing generate passes.', expectedReads: ['terrain', 'skeletonCause', 'plateCause'], allowedWrites: ['derivedSurface', 'climateDerived', 'biomeDerived', 'hydrologyDerived', 'worldCollections'], warningsIfWrites: { terrain: 'Derived recompute wrote terrain, which violates the one-way stack.' }, run: (world) => recomputeWorld(world, ['GENERATED']) },
    { id: 'FINAL_CONTINENT_RESEED', label: 'Final continent reseed', phase: 'final-cause-sync', authorityCategory: 'terminal', authority: 'Synchronizes final skeleton identity to final terrain for debug/metadata, without changing terrain.', expectedReads: ['terrain', 'derivedSurface', 'plateCause'], allowedWrites: ['skeletonCause'], intrinsicWarnings: ['Final cause sync reads final terrain. It must not be used later in this pipeline to shape terrain.'], run: seedContinentSkeletonFields },
    { id: 'FINAL_CRUST_RESEED', label: 'Final crust reseed', phase: 'final-cause-sync', authorityCategory: 'terminal', authority: 'Synchronizes final crust/province identity to final terrain for debug/metadata, without changing terrain.', expectedReads: ['terrain', 'derivedSurface', 'plateCause', 'skeletonCause', 'featureCause'], allowedWrites: ['crustCause'], intrinsicWarnings: ['Final cause sync reads final terrain. It must not be used later in this pipeline to shape terrain.'], run: seedCrustFields },
  ];
}

function sourceStage(world: WorldBrain, snapshot: WorldSnapshot): PipelineLedgerStage {
  return {
    id: 'RAW_GENERATOR', label: 'Raw generator', phase: 'source', authorityCategory: 'source', authority: 'Initial source: creates base terrain plus first-pass plate and feature fields from the seed.',
    expectedReads: [], allowedWrites: ['terrain', 'plateCause', 'featureCause'],
    actualWrites: [
      { group: 'terrain', field: 'baseHeight', changedCount: snapshot.cells.length, changedShare: 1 },
      { group: 'plateCause', field: 'plateId/plateType/boundaryType', changedCount: snapshot.cells.length, changedShare: 1 },
      { group: 'featureCause', field: 'uplift/surfaceAge/volcanism', changedCount: snapshot.cells.length, changedShare: 1 },
    ],
    unexpectedWrites: [], changedGroups: ['terrain', 'plateCause', 'featureCause'], changedCellShare: 1, terrainWriteShare: 1, topologyFlipShare: 0, heightDeltaMean: 0, heightDeltaMax: 0,
    collectionChanges: collectionChangeText(null, world), warnings: [], failedConsequence: null, recommendedNextFix: null, level: 'ok',
  };
}

function stageFromDiff(contract: StageContract, before: WorldSnapshot, after: WorldSnapshot): PipelineLedgerStage {
  const actualWrites = diffSnapshots(before, after);
  const changedGroups = unique(actualWrites.map((change) => change.group));
  const unexpectedWrites = actualWrites.filter((change) => !contract.allowedWrites.includes(change.group));
  const terrain = terrainDelta(before, after);
  const topologyFlipShare = topologyFlip(before, after);
  const warnings = [...(contract.intrinsicWarnings ?? [])];

  for (const change of unexpectedWrites) warnings.push(`Unexpected write: ${GROUP_LABELS[change.group]} (${change.field}) changed in a ${contract.phase} stage.`);
  for (const [group, warning] of Object.entries(contract.warningsIfWrites ?? {}) as [PipelineFieldGroup, string][]) if (actualWrites.some((change) => change.group === group)) warnings.push(warning);
  if (contract.phase === 'cause-seed' && actualWrites.some((change) => change.group === 'terrain')) warnings.push('Cause seed changed terrain. Cause seeding should write identity fields only.');
  if (contract.phase === 'feature-material' && actualWrites.some((change) => change.group === 'terrain')) warnings.push('Feature/material stage changed terrain. It must only write authority fields before terrain response.');
  if (contract.phase === 'derived-recompute' && actualWrites.some((change) => change.group === 'crustCause' || change.group === 'skeletonCause')) warnings.push('Derived recompute changed cause fields. That points to authority feedback.');
  if ((contract.phase === 'terrain-shape' || contract.phase === 'terrain-cleanup') && terrain.changedShare > 0 && topologyFlipShare > 0.02) warnings.push('Terrain stage caused significant land/water flips. Verify feature/material authority, not raw masks.');
  if (contract.phase === 'final-cause-sync' && terrain.changedShare > 0) warnings.push('Final cause sync changed terrain. Final sync must be read-only for terrain.');

  const level: PipelineAuthorityLevel = unexpectedWrites.length > 0 ? 'bad' : warnings.some((warning) => /violates|Unexpected|changed terrain|feedback/i.test(warning)) ? 'watch' : 'ok';
  return {
    id: contract.id, label: contract.label, phase: contract.phase, authorityCategory: contract.authorityCategory, authority: contract.authority,
    expectedReads: contract.expectedReads, allowedWrites: contract.allowedWrites, actualWrites, unexpectedWrites, changedGroups,
    changedCellShare: cellChangedShare(before, after), terrainWriteShare: terrain.changedShare, topologyFlipShare, heightDeltaMean: terrain.meanAbsDelta, heightDeltaMax: terrain.maxAbsDelta,
    collectionChanges: collectionChangeText(before, after), warnings,
    failedConsequence: level === 'ok' ? null : contract.failedConsequence ?? warnings[0] ?? null,
    recommendedNextFix: level === 'ok' ? null : contract.recommendedNextFix ?? 'Inspect this stage against the Generate feature/material handoff contract.',
    level,
  };
}

function firstFailedGate(stages: PipelineLedgerStage[]): PipelineAuthorityGateFailure | null {
  const failed = stages.find((stage) => stage.level === 'bad') ?? stages.find((stage) => stage.level === 'watch');
  return failed ? { stageId: failed.id, firstFailedLayer: failed.label, failedConsequence: failed.failedConsequence ?? failed.warnings[0] ?? 'Stage failed the authority ledger contract.', authorityCategory: failed.authorityCategory, recommendedNextFix: failed.recommendedNextFix ?? 'Inspect this stage against the Generate feature/material handoff contract.', level: failed.level } : null;
}

function diffSnapshots(before: WorldSnapshot, after: WorldSnapshot): PipelineFieldChange[] {
  const changes = new Map<string, PipelineFieldChange>();
  const fields = Object.keys(FIELD_GROUPS) as Array<keyof CellSnapshot>;
  for (const field of fields) {
    let changedCount = 0;
    let maxDelta = 0;
    const group = FIELD_GROUPS[field];
    for (let i = 0; i < after.cells.length; i++) {
      const a = before.cells[i]?.[field];
      const b = after.cells[i]?.[field];
      if (valueChanged(a, b)) {
        changedCount++;
        if (typeof a === 'number' && typeof b === 'number') maxDelta = Math.max(maxDelta, Math.abs(b - a));
      }
    }
    if (changedCount > 0) changes.set(`${group}:${String(field)}`, { group, field: String(field), changedCount, changedShare: changedCount / Math.max(1, after.cells.length), maxDelta: maxDelta > 0 ? maxDelta : undefined });
  }
  if (before.riverCount !== after.riverCount || before.riverPathCells !== after.riverPathCells) changes.set('worldCollections:rivers', { group: 'worldCollections', field: 'rivers', changedCount: Math.abs(after.riverPathCells - before.riverPathCells) || Math.abs(after.riverCount - before.riverCount), changedShare: 1 });
  return Array.from(changes.values()).sort((a, b) => groupSort(a.group) - groupSort(b.group) || b.changedShare - a.changedShare);
}

function snapshotWorld(world: WorldBrain): WorldSnapshot {
  return { cells: world.cells.map(snapshotCell), riverCount: Array.isArray(world.rivers) ? world.rivers.length : 0, riverPathCells: Array.isArray(world.rivers) ? world.rivers.reduce((sum, river) => sum + (Array.isArray(river.path) ? river.path.length : 0), 0) : 0 };
}

function snapshotCell(cell: Cell): CellSnapshot {
  return {
    baseHeight: numberValue(cell.baseHeight), editHeightDelta: numberValue(cell.editHeightDelta), simHeightDelta: numberValue(cell.simHeightDelta), isWater: Boolean(cell.isWater),
    plateId: numberValue(cell.plateId), plateType: stringValue(cell.plateType), boundaryType: stringValue(cell.boundaryType), upliftRate: numberValue(cell.upliftRate), surfaceAge: numberValue(cell.surfaceAge), volcanicActivity: numberValue(cell.volcanicActivity),
    continentId: nullableNumber(cell.continentId), continentCoreStrength: numberValue(cell.continentCoreStrength), continentality: numberValue(cell.continentality), distanceToContinentCore: numberValue(cell.distanceToContinentCore), marginType: stringValue(cell.marginType), oceanBasinId: nullableNumber(cell.oceanBasinId), shelfStrength: numberValue(cell.shelfStrength), islandCause: stringValue(cell.islandCause),
    crustThickness: numberValue(cell.crustThickness), crustAge: numberValue(cell.crustAge), crustProvince: stringValue(cell.crustProvince),
    temperature: numberValue(cell.temperature), rainfall: numberValue(cell.rainfall), snowCover: numberValue(cell.snowCover), baseBiomeId: numberValue(cell.baseBiomeId), editBiomeId: numberValue(cell.editBiomeId), oceanDepthClass: stringValue(cell.oceanDepthClass), flowDirection: nullableNumber(cell.flowDirection), flowAccumulation: numberValue(cell.flowAccumulation), basinId: nullableNumber(cell.basinId), climateCellId: numberValue(cell.climateCellId),
  };
}

function terrainDelta(before: WorldSnapshot, after: WorldSnapshot): { changedShare: number; meanAbsDelta: number; maxAbsDelta: number } {
  let changed = 0, sum = 0, max = 0;
  for (let i = 0; i < after.cells.length; i++) {
    const delta = Math.abs(totalSnapshotHeight(after.cells[i]) - totalSnapshotHeight(before.cells[i]));
    if (delta > NUMERIC_EPSILON) changed++;
    sum += delta;
    max = Math.max(max, delta);
  }
  return { changedShare: changed / Math.max(1, after.cells.length), meanAbsDelta: sum / Math.max(1, after.cells.length), maxAbsDelta: max };
}

function topologyFlip(before: WorldSnapshot, after: WorldSnapshot): number { let flips = 0; for (let i = 0; i < after.cells.length; i++) if (before.cells[i]?.isWater !== after.cells[i]?.isWater) flips++; return flips / Math.max(1, after.cells.length); }
function cellChangedShare(before: WorldSnapshot, after: WorldSnapshot): number { let changed = 0; for (let i = 0; i < after.cells.length; i++) { const a = before.cells[i], b = after.cells[i]; if (!a || !b) continue; for (const field of Object.keys(FIELD_GROUPS) as Array<keyof CellSnapshot>) if (valueChanged(a[field], b[field])) { changed++; break; } } return changed / Math.max(1, after.cells.length); }
function collectionChangeText(before: WorldSnapshot | null, after: WorldSnapshot | WorldBrain): string[] { const afterRiverCount = 'riverCount' in after ? after.riverCount : Array.isArray(after.rivers) ? after.rivers.length : 0; const afterRiverCells = 'riverPathCells' in after ? after.riverPathCells : Array.isArray(after.rivers) ? after.rivers.reduce((sum, river) => sum + (Array.isArray(river.path) ? river.path.length : 0), 0) : 0; if (!before) return [`rivers=${afterRiverCount}`, `riverCells=${afterRiverCells}`]; const out: string[] = []; if (before.riverCount !== afterRiverCount) out.push(`rivers ${before.riverCount}→${afterRiverCount}`); if (before.riverPathCells !== afterRiverCells) out.push(`riverCells ${before.riverPathCells}→${afterRiverCells}`); return out; }
function totalSnapshotHeight(cell: CellSnapshot | undefined): number { return cell ? cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta : 0; }
function valueChanged(a: unknown, b: unknown): boolean { return typeof a === 'number' && typeof b === 'number' ? Math.abs(a - b) > NUMERIC_EPSILON : a !== b; }
function isDerivedGroup(group: PipelineFieldGroup): boolean { return group === 'derivedSurface' || group === 'climateDerived' || group === 'biomeDerived' || group === 'hydrologyDerived' || group === 'worldCollections'; }

function generatorParamsFromWorld(world: WorldBrain): GeneratorParams {
  const defaults = createDefaultGeneratorParams();
  const p = world.parameters ?? {};
  return {
    width: intParam(p.width, world.gridWidth, defaults.width), height: intParam(p.height, world.gridHeight, defaults.height), seaLevel: numberParam(p.seaLevel, defaults.seaLevel), plateActivity: numberParam(p.plateActivity, defaults.plateActivity), axisTilt: numberParam(p.axisTilt, defaults.axisTilt), planetAge: numberParam(p.planetAge, defaults.planetAge), climateVar: numberParam(p.climateVar, defaults.climateVar), moistureLevel: numberParam(p.moistureLevel, defaults.moistureLevel), temperatureOffset: numberParam(p.temperatureOffset, defaults.temperatureOffset), erosionIntensity: numberParam(p.erosionIntensity, defaults.erosionIntensity), continentCount: numberParam(p.continentCount, defaults.continentCount), seed: typeof p.seed === 'string' || typeof p.seed === 'number' ? p.seed : world.metadata?.seed ?? defaults.seed, styleMode: isStyleMode(p.styleMode) ? p.styleMode : world.metadata?.styleMode ?? defaults.styleMode,
    planetProfile: isPlanetProfile(p.planetProfile) ? p.planetProfile : defaults.planetProfile, planetRadiusEarth: numberParam(p.planetRadiusEarth, defaults.planetRadiusEarth ?? 1), planetDensityEarth: numberParam(p.planetDensityEarth, defaults.planetDensityEarth ?? 1), starLuminositySun: numberParam(p.starLuminositySun, defaults.starLuminositySun ?? 1), orbitalDistanceAU: numberParam(p.orbitalDistanceAU, defaults.orbitalDistanceAU ?? 1), albedo: numberParam(p.albedo, defaults.albedo ?? 0.30), greenhouseStrength: numberParam(p.greenhouseStrength, defaults.greenhouseStrength ?? 0.32), volatileInventory: numberParam(p.volatileInventory, defaults.volatileInventory ?? 0.54), coreHeatIntent: numberParam(p.coreHeatIntent, defaults.coreHeatIntent ?? 0.52), tidalHeatingIntent: numberParam(p.tidalHeatingIntent, defaults.tidalHeatingIntent ?? 0), stagnantLidBias: numberParam(p.stagnantLidBias, defaults.stagnantLidBias ?? 0.10), compositionRadioactivity: numberParam(p.compositionRadioactivity, defaults.compositionRadioactivity ?? 0.50),
  };
}

function intParam(primary: unknown, fallback: unknown, defaultValue: number): number { return Math.floor(numberParam(primary, typeof fallback === 'number' ? fallback : defaultValue)); }
function numberParam(value: unknown, fallback: number): number { return typeof value === 'number' && Number.isFinite(value) ? value : fallback; }
function isStyleMode(value: unknown): value is GeneratorParams['styleMode'] { return value === 'EARTHLIKE' || value === 'FANTASY' || value === 'STYLIZED' || value === 'ALIEN'; }
function isPlanetProfile(value: unknown): value is NonNullable<GeneratorParams['planetProfile']> { return value === 'EARTHLIKE_ROCKY' || value === 'ROCKY_ALIEN' || value === 'VOLATILE_PRESSURE_ROCKY' || value === 'ICE_SHELL_OCEAN_WORLD' || value === 'DWARF_ROCKY_OR_ICY' || value === 'SUPER_EARTH_ROCKY' || value === 'ARTIFICIAL_OR_FANTASY_SHELL'; }
function numberValue(value: unknown): number { return typeof value === 'number' && Number.isFinite(value) ? value : 0; }
function nullableNumber(value: unknown): number | null { return typeof value === 'number' && Number.isFinite(value) ? value : null; }
function stringValue(value: unknown): string | null { return typeof value === 'string' ? value : null; }
function unique<T>(values: T[]): T[] { return Array.from(new Set(values)); }
function groupSort(group: PipelineFieldGroup): number { return ['terrain', 'derivedSurface', 'plateCause', 'skeletonCause', 'crustCause', 'featureCause', 'climateDerived', 'biomeDerived', 'hydrologyDerived', 'worldCollections'].indexOf(group); }
