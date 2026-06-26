import { seedContinentSkeletonFields } from './worldContinents';
import { applyCrustTerrainInfluence, seedCrustFields } from './worldCrust';
import { buildGenerateRuntimeStagePlan, generatorParamsFromRuntimeWorld, type GenerateRuntimeStageId, type GenerateRuntimeStagePlanEntry } from './generateRuntimeStagePlan';
import { applyOceanBathymetrySmoothing } from './worldOceanBathymetry';
import { generateWorldFromParams } from './worldGenerator';
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

export type PipelineFieldChange = { group: PipelineFieldGroup; field: string; changedCount: number; changedShare: number; maxDelta?: number };
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
export type PipelineAuthorityGateFailure = { stageId: string; firstFailedLayer: string; failedConsequence: string; authorityCategory: PipelineAuthorityCategory; recommendedNextFix: string; level: PipelineAuthorityLevel };
export type PipelineLedgerSummary = { stageCount: number; badCount: number; watchCount: number; firstTerrainWriter: string | null; firstDerivedWriter: string | null; firstBackwardRisk: string | null; firstUnexpectedWriter: string | null; firstFailedGate: PipelineAuthorityGateFailure | null };
export type GeneratePipelineAuthorityLedger = { seed: string; grid: string; summary: PipelineLedgerSummary; stages: PipelineLedgerStage[] };

type CellSnapshot = {
  baseHeight: number; editHeightDelta: number; simHeightDelta: number; isWater: boolean;
  plateId: number; plateType: string | null; boundaryType: string | null; upliftRate: number; surfaceAge: number; volcanicActivity: number;
  continentId: number | null; continentCoreStrength: number; continentality: number; distanceToContinentCore: number; marginType: string | null; oceanBasinId: number | null; shelfStrength: number; islandCause: string | null;
  crustThickness: number; crustAge: number; crustProvince: string | null;
  temperature: number; rainfall: number; snowCover: number; baseBiomeId: number; editBiomeId: number; oceanDepthClass: string | null; flowDirection: number | null; flowAccumulation: number; basinId: number | null; climateCellId: number;
};
type WorldSnapshot = { cells: CellSnapshot[]; riverCount: number; riverPathCells: number };
type StageContract = { id: GenerateRuntimeStageId; label: string; phase: PipelineAuthorityPhase; authorityCategory: PipelineAuthorityCategory; authority: string; expectedReads: PipelineFieldGroup[]; allowedWrites: PipelineFieldGroup[]; warningsIfWrites?: Partial<Record<PipelineFieldGroup, string>>; intrinsicWarnings?: string[]; failedConsequence?: string; recommendedNextFix?: string; run: (world: WorldBrain) => void };

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
  terrain: 'terrain height', derivedSurface: 'derived surface', plateCause: 'plate causes', skeletonCause: 'skeleton causes', crustCause: 'crust causes', featureCause: 'feature causes', climateDerived: 'climate derived', biomeDerived: 'biome derived', hydrologyDerived: 'hydrology derived', worldCollections: 'world collections',
};
const NUMERIC_EPSILON = 1e-7;

export function computeGeneratePipelineAuthorityLedger(sourceWorld: WorldBrain | null | undefined): GeneratePipelineAuthorityLedger | null {
  if (!sourceWorld?.cells?.length) return null;
  const params = generatorParamsFromRuntimeWorld(sourceWorld);
  const world = generateWorldFromParams(params);
  const plan = buildGenerateRuntimeStagePlan(world);
  const stages: PipelineLedgerStage[] = [];

  for (const entry of plan.stages) {
    if (entry.id === 'RAW_GENERATOR') {
      stages.push(sourceStage(world, snapshotWorld(world), entry));
      continue;
    }
    const contract = contractFor(entry);
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

  return { seed: plan.seed, grid: plan.grid, summary, stages };
}

export function pipelineFieldGroupLabel(group: PipelineFieldGroup): string { return GROUP_LABELS[group]; }

function contractFor(entry: GenerateRuntimeStagePlanEntry): StageContract {
  const id = entry.id;
  const base = { id, label: entry.label, phase: mapPhase(entry), authority: entry.reason, run: (world: WorldBrain) => runRuntimeStage(world, id) };
  if (id === 'CONTINENT_FIELDS') return { ...base, authorityCategory: 'cause', expectedReads: ['terrain', 'plateCause'], allowedWrites: ['skeletonCause'], intrinsicWarnings: ['Height-derived cause seeding: acceptable as a first interpretation, but dangerous if repeated after terrain shaping.'], failedConsequence: 'Cause fields are being interpreted from generated height instead of a fully upstream morphology resolver.', recommendedNextFix: 'Move continent morphology into an upstream geologic feature authority layer before further terrain tuning.' };
  if (id === 'PLATE_BOUNDARY_FEATURE_TERRAIN') return { ...base, authorityCategory: 'feature', expectedReads: ['plateCause', 'featureCause', 'skeletonCause'], allowedWrites: ['terrain'] };
  if (id === 'SKELETON_ELEVATION') return { ...base, authorityCategory: 'terrain', expectedReads: ['terrain', 'skeletonCause'], allowedWrites: ['terrain'] };
  if (id === 'FIRST_RECOMPUTE' || id === 'SECOND_RECOMPUTE' || id === 'FINAL_RECOMPUTE') return { ...base, authorityCategory: 'derived', expectedReads: ['terrain', 'skeletonCause', 'plateCause'], allowedWrites: ['derivedSurface', 'climateDerived', 'biomeDerived', 'hydrologyDerived', 'worldCollections'], warningsIfWrites: { terrain: 'Derived recompute wrote terrain, which violates the one-way stack.' } };
  if (id === 'QUALITY_PASS') return { ...base, authorityCategory: 'terrain', expectedReads: ['terrain', 'derivedSurface', 'skeletonCause', 'plateCause'], allowedWrites: ['terrain'] };
  if (id === 'CRUST_CONTINENT_RESEED') return { ...base, authorityCategory: 'cause', expectedReads: ['terrain', 'derivedSurface', 'plateCause'], allowedWrites: ['skeletonCause'], intrinsicWarnings: ['Backward-feedback risk: skeleton causes are being reseeded after terrain was already shaped.'], failedConsequence: 'Terrain-shaped state is feeding a new cause layer before later terrain writers.', recommendedNextFix: 'Move this to terminal-only sync or replace it with upstream morphology fields.' };
  if (id === 'CRUST_FIELDS') return { ...base, authorityCategory: 'material', expectedReads: ['terrain', 'derivedSurface', 'plateCause', 'featureCause', 'skeletonCause'], allowedWrites: ['crustCause'], intrinsicWarnings: ['Backward-feedback risk: crust fields still read terrain/ocean class before later crust terrain stages.'], failedConsequence: 'Material authority still partially derives from already-shaped terrain instead of a fully upstream material resolver.', recommendedNextFix: 'Move material authority into the shared geologic feature/material layer.' };
  if (id === 'ISOSTATIC_TERRAIN_RESPONSE') return { ...base, authorityCategory: 'terrain', expectedReads: ['terrain', 'crustCause', 'featureCause', 'skeletonCause', 'climateDerived'], allowedWrites: ['terrain'] };
  if (id === 'CRUST_TERRAIN_INFLUENCE') return { ...base, authorityCategory: 'terrain', expectedReads: ['terrain', 'crustCause', 'featureCause', 'skeletonCause', 'derivedSurface'], allowedWrites: ['terrain'], intrinsicWarnings: ['Bundled crust terrain influence still hides multiple material/terrain subpasses behind one runtime call.'] };
  if (id === 'OCEAN_BATHYMETRY_SMOOTHING') return { ...base, authorityCategory: 'terrain', expectedReads: ['terrain', 'featureCause', 'skeletonCause'], allowedWrites: ['terrain'] };
  if (id === 'FINAL_CONTINENT_RESEED') return { ...base, authorityCategory: 'terminal', expectedReads: ['terrain', 'derivedSurface', 'plateCause'], allowedWrites: ['skeletonCause'], intrinsicWarnings: ['Final cause sync reads final terrain. It must not be used later in this pipeline to shape terrain.'] };
  if (id === 'FINAL_CRUST_RESEED') return { ...base, authorityCategory: 'terminal', expectedReads: ['terrain', 'derivedSurface', 'plateCause', 'skeletonCause', 'featureCause'], allowedWrites: ['crustCause'], intrinsicWarnings: ['Final cause sync reads final terrain. It must not be used later in this pipeline to shape terrain.'] };
  return { ...base, authorityCategory: 'source', expectedReads: [], allowedWrites: [] };
}

function mapPhase(entry: GenerateRuntimeStagePlanEntry): PipelineAuthorityPhase {
  return entry.phase === 'terminal-sync' ? 'final-cause-sync' : entry.phase;
}

function runRuntimeStage(world: WorldBrain, id: GenerateRuntimeStageId): void {
  if (id === 'CONTINENT_FIELDS' || id === 'CRUST_CONTINENT_RESEED' || id === 'FINAL_CONTINENT_RESEED') seedContinentSkeletonFields(world);
  else if (id === 'PLATE_BOUNDARY_FEATURE_TERRAIN') applyPlateBoundaryFeatureTerrain(world);
  else if (id === 'SKELETON_ELEVATION') applySkeletonBaseElevation(world);
  else if (id === 'FIRST_RECOMPUTE' || id === 'SECOND_RECOMPUTE' || id === 'FINAL_RECOMPUTE') recomputeWorld(world, ['GENERATED']);
  else if (id === 'QUALITY_PASS') applyGeneratedWorldQualityPass(world);
  else if (id === 'CRUST_FIELDS' || id === 'FINAL_CRUST_RESEED') seedCrustFields(world);
  else if (id === 'ISOSTATIC_TERRAIN_RESPONSE') applyIsostaticTerrainResponse(world);
  else if (id === 'CRUST_TERRAIN_INFLUENCE') applyCrustTerrainInfluence(world);
  else if (id === 'OCEAN_BATHYMETRY_SMOOTHING') applyOceanBathymetrySmoothing(world);
}

function sourceStage(world: WorldBrain, snapshot: WorldSnapshot, entry: GenerateRuntimeStagePlanEntry): PipelineLedgerStage {
  return { id: entry.id, label: entry.label, phase: 'source', authorityCategory: 'source', authority: entry.reason, expectedReads: [], allowedWrites: ['terrain', 'plateCause', 'featureCause'], actualWrites: [{ group: 'terrain', field: 'baseHeight', changedCount: snapshot.cells.length, changedShare: 1 }, { group: 'plateCause', field: 'plateId/plateType/boundaryType', changedCount: snapshot.cells.length, changedShare: 1 }, { group: 'featureCause', field: 'uplift/surfaceAge/volcanism', changedCount: snapshot.cells.length, changedShare: 1 }], unexpectedWrites: [], changedGroups: ['terrain', 'plateCause', 'featureCause'], changedCellShare: 1, terrainWriteShare: 1, topologyFlipShare: 0, heightDeltaMean: 0, heightDeltaMax: 0, collectionChanges: collectionChangeText(null, world), warnings: [], failedConsequence: null, recommendedNextFix: null, level: 'ok' };
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
  const level: PipelineAuthorityLevel = unexpectedWrites.length > 0 ? 'bad' : warnings.some((warning) => /violates|Unexpected|changed terrain|feedback|Backward-feedback/i.test(warning)) ? 'watch' : 'ok';
  return { id: contract.id, label: contract.label, phase: contract.phase, authorityCategory: contract.authorityCategory, authority: contract.authority, expectedReads: contract.expectedReads, allowedWrites: contract.allowedWrites, actualWrites, unexpectedWrites, changedGroups, changedCellShare: cellChangedShare(before, after), terrainWriteShare: terrain.changedShare, topologyFlipShare, heightDeltaMean: terrain.meanAbsDelta, heightDeltaMax: terrain.maxAbsDelta, collectionChanges: collectionChangeText(before, after), warnings, failedConsequence: level === 'ok' ? null : contract.failedConsequence ?? warnings[0] ?? null, recommendedNextFix: level === 'ok' ? null : contract.recommendedNextFix ?? 'Inspect this stage against the shared Generate runtime stage plan.', level };
}

function firstFailedGate(stages: PipelineLedgerStage[]): PipelineAuthorityGateFailure | null {
  const failed = stages.find((stage) => stage.level === 'bad') ?? stages.find((stage) => stage.level === 'watch');
  return failed ? { stageId: failed.id, firstFailedLayer: failed.label, failedConsequence: failed.failedConsequence ?? failed.warnings[0] ?? 'Stage failed the authority ledger contract.', authorityCategory: failed.authorityCategory, recommendedNextFix: failed.recommendedNextFix ?? 'Inspect this stage against the shared Generate runtime stage plan.', level: failed.level } : null;
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
      if (valueChanged(a, b)) { changedCount++; if (typeof a === 'number' && typeof b === 'number') maxDelta = Math.max(maxDelta, Math.abs(b - a)); }
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
  return { baseHeight: numberValue(cell.baseHeight), editHeightDelta: numberValue(cell.editHeightDelta), simHeightDelta: numberValue(cell.simHeightDelta), isWater: Boolean(cell.isWater), plateId: numberValue(cell.plateId), plateType: stringValue(cell.plateType), boundaryType: stringValue(cell.boundaryType), upliftRate: numberValue(cell.upliftRate), surfaceAge: numberValue(cell.surfaceAge), volcanicActivity: numberValue(cell.volcanicActivity), continentId: nullableNumber(cell.continentId), continentCoreStrength: numberValue(cell.continentCoreStrength), continentality: numberValue(cell.continentality), distanceToContinentCore: numberValue(cell.distanceToContinentCore), marginType: stringValue(cell.marginType), oceanBasinId: nullableNumber(cell.oceanBasinId), shelfStrength: numberValue(cell.shelfStrength), islandCause: stringValue(cell.islandCause), crustThickness: numberValue(cell.crustThickness), crustAge: numberValue(cell.crustAge), crustProvince: stringValue(cell.crustProvince), temperature: numberValue(cell.temperature), rainfall: numberValue(cell.rainfall), snowCover: numberValue(cell.snowCover), baseBiomeId: numberValue(cell.baseBiomeId), editBiomeId: numberValue(cell.editBiomeId), oceanDepthClass: stringValue(cell.oceanDepthClass), flowDirection: nullableNumber(cell.flowDirection), flowAccumulation: numberValue(cell.flowAccumulation), basinId: nullableNumber(cell.basinId), climateCellId: numberValue(cell.climateCellId) };
}

function terrainDelta(before: WorldSnapshot, after: WorldSnapshot): { changedShare: number; meanAbsDelta: number; maxAbsDelta: number } {
  let changed = 0, sum = 0, max = 0;
  for (let i = 0; i < after.cells.length; i++) {
    const delta = Math.abs(totalHeight(after.cells[i]) - totalHeight(before.cells[i]));
    if (delta > NUMERIC_EPSILON) changed++;
    sum += delta;
    max = Math.max(max, delta);
  }
  return { changedShare: changed / Math.max(1, after.cells.length), meanAbsDelta: sum / Math.max(1, after.cells.length), maxAbsDelta: max };
}

function topologyFlip(before: WorldSnapshot, after: WorldSnapshot): number {
  let flips = 0;
  for (let i = 0; i < after.cells.length; i++) if (before.cells[i]?.isWater !== after.cells[i]?.isWater) flips++;
  return flips / Math.max(1, after.cells.length);
}

function cellChangedShare(before: WorldSnapshot, after: WorldSnapshot): number {
  let changed = 0;
  for (let i = 0; i < after.cells.length; i++) if (JSON.stringify(before.cells[i]) !== JSON.stringify(after.cells[i])) changed++;
  return changed / Math.max(1, after.cells.length);
}

function collectionChangeText(before: WorldSnapshot | null, afterWorld: WorldBrain | WorldSnapshot): string[] {
  const after = 'cells' in afterWorld && Array.isArray((afterWorld as WorldSnapshot).cells) && 'riverCount' in afterWorld ? afterWorld as WorldSnapshot : snapshotWorld(afterWorld as WorldBrain);
  if (!before) return [`rivers: ${after.riverCount}`];
  const out: string[] = [];
  if (before.riverCount !== after.riverCount) out.push(`rivers: ${before.riverCount} -> ${after.riverCount}`);
  if (before.riverPathCells !== after.riverPathCells) out.push(`river path cells: ${before.riverPathCells} -> ${after.riverPathCells}`);
  return out;
}

function totalHeight(cell: Pick<CellSnapshot, 'baseHeight' | 'editHeightDelta' | 'simHeightDelta'>): number { return cell.baseHeight + cell.editHeightDelta + cell.simHeightDelta; }
function valueChanged(a: unknown, b: unknown): boolean { return typeof a === 'number' && typeof b === 'number' ? Math.abs(a - b) > NUMERIC_EPSILON : a !== b; }
function numberValue(value: unknown): number { return typeof value === 'number' && Number.isFinite(value) ? value : 0; }
function nullableNumber(value: unknown): number | null { return typeof value === 'number' && Number.isFinite(value) ? value : null; }
function stringValue(value: unknown): string | null { return typeof value === 'string' && value.length > 0 ? value : null; }
function unique<T>(values: T[]): T[] { return Array.from(new Set(values)); }
function isDerivedGroup(group: PipelineFieldGroup): boolean { return group === 'derivedSurface' || group === 'climateDerived' || group === 'biomeDerived' || group === 'hydrologyDerived' || group === 'worldCollections'; }
function groupSort(group: PipelineFieldGroup): number { return ['terrain', 'derivedSurface', 'plateCause', 'featureCause', 'skeletonCause', 'crustCause', 'climateDerived', 'biomeDerived', 'hydrologyDerived', 'worldCollections'].indexOf(group); }
