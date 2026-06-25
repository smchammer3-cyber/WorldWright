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
import { computeGeneratedStageDiagnostics, type GenerateStageDiagnostics, type GenerateStageId, type GenerateStageSnapshot } from './worldGenerateStageDiagnostics';
import { applyGeneratedGeographyPipeline, applySkeletonBaseElevation } from './worldGeographyPipeline';
import { createDefaultGeneratorParams, generateWorldFromParams, type GeneratorParams } from './worldGenerator';
import { applyOceanBathymetrySmoothing } from './worldOceanBathymetry';
import { applyPlateBoundaryFeatureTerrain } from './worldPlateBoundaryFeatures';
import { applyGeneratedWorldQualityPass } from './worldQualityPass';
import { applyIsostaticTerrainResponse } from './worldTerrainResponse';
import { recomputeWorld } from './worldRecompute';
import type { WorldBrain } from './worldSchema';

export const DEFAULT_GENERATE_DIAGNOSTIC_SEEDS = ['67', '32319885', 'worldwright-a', 'worldwright-b', 'worldwright-c', 'worldwright-d', 'worldwright-e'] as const;
export const DEFAULT_GENERATE_DIAGNOSTIC_WIDTH = 128;
export const DEFAULT_GENERATE_DIAGNOSTIC_HEIGHT = 64;

export type AblationStageId = Extract<GenerateStageId,
  | 'PLATE_BOUNDARY_FEATURE_TERRAIN'
  | 'SKELETON_ELEVATION'
  | 'QUALITY_PASS'
  | 'ISOSTATIC_TERRAIN_RESPONSE'
  | 'CRUST_PROVINCE_DELTA'
  | 'CRUST_COAST_BREAKUP'
  | 'CRUST_COHERENCE'
  | 'CRUST_TINY_ISLAND_CLEANUP'
  | 'OCEAN_BATHYMETRY_SMOOTHING'>;

export type GenerateDiagnosticOptions = Partial<Pick<GeneratorParams, 'width' | 'height' | 'continentCount'>> & {
  seeds?: Array<string | number>;
  ablations?: AblationStageId[];
};

export type MorphologyMetrics = {
  elevationQuantiles: Record<'p05' | 'p25' | 'p50' | 'p75' | 'p95', number>;
  landHeightStdDev: number;
  oceanDepthStdDev: number;
  slopeMean: number;
  slopeMax: number;
  slopeP95: number;
  roughnessMean: number;
  coastLength: number;
  coastComplexity: number;
  landPatchCount: number;
  landPatchSizeDistribution: number[];
  largestLandmassShare: number;
  islandSizeClasses: Record<'tiny' | 'small' | 'medium' | 'large', number>;
  shorelineJaggedness: number;
};

export type HydrologyMetrics = {
  riverCount: number;
  riverCellCount: number;
  averageRiverLength: number;
  maxRiverLength: number;
  percentRiversReachingOcean: number;
  inlandDeadEndRiverCount: number;
  flowAccumulationConcentration: number;
  basinCount: number;
  tinyIsolatedDrainageArtifacts: number;
};

export type CauseLeakMetrics = {
  plateHeightJump: number | null;
  provinceHeightJump: number | null;
  skeletonHeightJump: number | null;
  plateTopGradientShare: number;
  provinceTopGradientShare: number;
  skeletonTopGradientShare: number;
  crustThicknessCorrelation: number;
  crustAgeCorrelation: number;
  continentalityCorrelation: number;
  shelfStrengthCorrelation: number;
  provincePatchCount: number;
  provinceLabelEntropy: number;
  skeletonPatchCount: number;
  skeletonLabelEntropy: number;
  heightNeighborAutocorrelation: number;
  provinceNeighborAutocorrelation: number;
};

export type StageDeltaRanking = { stage: GenerateStageId; score: number; count: number };
export type AblationResult = { skippedStage: AblationStageId; finalMetrics: StageSummary; deltaFromBaseline: Partial<StageSummary>; topologyCollapse: boolean };
export type StageSummary = Pick<GenerateStageSnapshot['raw'], 'landFraction' | 'landComponents' | 'mediumFragmentCount' | 'mediumFragmentShare' | 'landHeightStdDev' | 'plateSeamHeightRatio' | 'provinceSeamHeightRatio' | 'skeletonSeamHeightRatio'>;
export type MultiSeedGenerateDiagnostics = {
  seeds: string[];
  grid: string;
  runs: Array<{ seed: string; stages: GenerateStageSnapshot[]; finalMorphology: MorphologyMetrics; finalHydrology: HydrologyMetrics; finalCauseLeak: CauseLeakMetrics; ablations: AblationResult[] }>;
  rankings: Record<'plateImprintIncreases' | 'provinceImprintIncreases' | 'skeletonImprintIncreases' | 'reliefDecreases' | 'fragmentIncreases' | 'fragmentRepairs' | 'worstRepairBenefitVsImprintCost', StageDeltaRanking[]>;
  topSuspectStages: GenerateStageId[];
};

export function runMultiSeedGenerateDiagnostics(options: GenerateDiagnosticOptions = {}): MultiSeedGenerateDiagnostics {
  const defaults = createDefaultGeneratorParams();
  const seeds = (options.seeds ?? [...DEFAULT_GENERATE_DIAGNOSTIC_SEEDS]).map(String);
  const paramsBase = { ...defaults, width: options.width ?? DEFAULT_GENERATE_DIAGNOSTIC_WIDTH, height: options.height ?? DEFAULT_GENERATE_DIAGNOSTIC_HEIGHT, continentCount: options.continentCount ?? defaults.continentCount };
  const runs = seeds.map((seed) => {
    const source = generateWorldFromParams({ ...paramsBase, seed });
    const diagnostics = computeGeneratedStageDiagnostics(source) as GenerateStageDiagnostics;
    const finalWorld = generateWorldFromParams({ ...paramsBase, seed });
    applyGeneratedGeographyPipeline(finalWorld);
    return {
      seed,
      stages: diagnostics.stages,
      finalMorphology: computeMorphologyMetrics(finalWorld),
      finalHydrology: computeHydrologyMetrics(finalWorld),
      finalCauseLeak: computeCauseLeakMetrics(finalWorld),
      ablations: (options.ablations ?? []).map((stage) => runAblation({ ...paramsBase, seed }, stage, diagnostics.stages[diagnostics.stages.length - 1])),
    };
  });
  const rankings = aggregateRankings(runs.map((r) => r.stages));
  const topSuspectStages = Array.from(new Set([
    ...rankings.plateImprintIncreases.slice(0, 2).map((r) => r.stage),
    ...rankings.provinceImprintIncreases.slice(0, 2).map((r) => r.stage),
    ...rankings.skeletonImprintIncreases.slice(0, 2).map((r) => r.stage),
    ...rankings.reliefDecreases.slice(0, 1).map((r) => r.stage),
  ]));
  return { seeds, grid: `${paramsBase.width}×${paramsBase.height}`, runs, rankings, topSuspectStages };
}

function aggregateRankings(stageRuns: GenerateStageSnapshot[][]): MultiSeedGenerateDiagnostics['rankings'] {
  const add = (metric: (s: GenerateStageSnapshot) => number | undefined, positive: boolean) => rank(stageRuns, (s) => {
    const v = metric(s) ?? 0;
    return positive ? Math.max(0, v) : Math.max(0, -v);
  });
  return {
    plateImprintIncreases: add((s) => s.deltaFromPrevious?.plateSeamHeightRatio ?? undefined, true),
    provinceImprintIncreases: add((s) => s.deltaFromPrevious?.provinceSeamHeightRatio ?? undefined, true),
    skeletonImprintIncreases: add((s) => s.deltaFromPrevious?.skeletonSeamHeightRatio ?? undefined, true),
    reliefDecreases: add((s) => s.deltaFromPrevious?.landHeightStdDev, false),
    fragmentIncreases: add((s) => (s.deltaFromPrevious?.landComponents ?? 0) + (s.deltaFromPrevious?.mediumFragmentCount ?? 0), true),
    fragmentRepairs: add((s) => (s.deltaFromPrevious?.landComponents ?? 0) + (s.deltaFromPrevious?.mediumFragmentCount ?? 0), false),
    worstRepairBenefitVsImprintCost: rank(stageRuns, (s) => Math.max(0, (s.deltaFromPrevious?.plateSeamHeightRatio ?? 0) + (s.deltaFromPrevious?.provinceSeamHeightRatio ?? 0) + (s.deltaFromPrevious?.skeletonSeamHeightRatio ?? 0)) / (1 + Math.max(0, -(s.deltaFromPrevious?.landComponents ?? 0) - (s.deltaFromPrevious?.mediumFragmentCount ?? 0)))),
  };
}

function rank(stageRuns: GenerateStageSnapshot[][], scoreOf: (stage: GenerateStageSnapshot) => number): StageDeltaRanking[] {
  const scores = new Map<GenerateStageId, { score: number; count: number }>();
  for (const stages of stageRuns) for (const stage of stages.slice(1)) {
    const score = scoreOf(stage);
    const prev = scores.get(stage.id) ?? { score: 0, count: 0 };
    scores.set(stage.id, { score: prev.score + score, count: prev.count + (score > 0 ? 1 : 0) });
  }
  return Array.from(scores, ([stage, value]) => ({ stage, ...value })).sort((a, b) => b.score - a.score || a.stage.localeCompare(b.stage));
}

function runAblation(params: GeneratorParams, skippedStage: AblationStageId, baselineFinal: GenerateStageSnapshot): AblationResult {
  const world = replayGenerate(params, skippedStage);
  const final = summarizeFinalWorld(world);
  const base = summarizeStage(baselineFinal);
  return { skippedStage, finalMetrics: final, deltaFromBaseline: diffSummary(final, base), topologyCollapse: final.landComponents > base.landComponents * 2 || final.landFraction < base.landFraction * 0.5 };
}

function replayGenerate(params: GeneratorParams, skip?: AblationStageId): WorldBrain {
  const world = generateWorldFromParams(params);
  seedContinentSkeletonFields(world);
  if (skip !== 'PLATE_BOUNDARY_FEATURE_TERRAIN') applyPlateBoundaryFeatureTerrain(world);
  if (skip !== 'SKELETON_ELEVATION') applySkeletonBaseElevation(world);
  recomputeWorld(world, ['GENERATED']);
  if (skip !== 'QUALITY_PASS') applyGeneratedWorldQualityPass(world);
  recomputeWorld(world, ['GENERATED']);
  seedContinentSkeletonFields(world); seedCrustFields(world);
  if (skip !== 'ISOSTATIC_TERRAIN_RESPONSE') applyIsostaticTerrainResponse(world);
  if (skip !== 'CRUST_PROVINCE_DELTA') applyCrustProvinceTerrainDelta(world);
  if (skip !== 'CRUST_COAST_BREAKUP') applyProvinceCoastBreakup(world);
  if (skip !== 'CRUST_COHERENCE') applyProvinceCoherence(world);
  if (skip !== 'CRUST_TINY_ISLAND_CLEANUP') cleanupAccidentalTinyIslands(world);
  applyMaterialReliefReinforcement(world);
  applyCoastShapePass(world);
  if (skip !== 'OCEAN_BATHYMETRY_SMOOTHING') applyOceanBathymetrySmoothing(world);
  recomputeWorld(world, ['GENERATED']); seedContinentSkeletonFields(world); seedCrustFields(world);
  return world;
}

function summarizeStage(stage: GenerateStageSnapshot): StageSummary { const r = stage.raw; return { landFraction: r.landFraction, landComponents: r.landComponents, mediumFragmentCount: r.mediumFragmentCount, mediumFragmentShare: r.mediumFragmentShare, landHeightStdDev: r.landHeightStdDev, plateSeamHeightRatio: r.plateSeamHeightRatio, provinceSeamHeightRatio: r.provinceSeamHeightRatio, skeletonSeamHeightRatio: r.skeletonSeamHeightRatio }; }
function summarizeFinalWorld(world: WorldBrain): StageSummary { const morphology = computeMorphologyMetrics(world); const leak = computeCauseLeakMetrics(world); const landCells = world.cells.filter((c) => !c.isWater).length; const mediumMax = Math.max(24, Math.round(Math.max(1, landCells) * 0.035)); const medium = morphology.landPatchSizeDistribution.slice(1).filter((size) => size >= 12 && size <= mediumMax); return { landFraction: landCells / Math.max(1, world.cells.length), landComponents: morphology.landPatchCount, mediumFragmentCount: medium.length, mediumFragmentShare: medium.reduce((sum, size) => sum + size, 0) / Math.max(1, landCells), landHeightStdDev: morphology.landHeightStdDev, plateSeamHeightRatio: leak.plateHeightJump, provinceSeamHeightRatio: leak.provinceHeightJump, skeletonSeamHeightRatio: leak.skeletonHeightJump }; }
function diffSummary(a: StageSummary, b: StageSummary): Partial<StageSummary> { return Object.fromEntries(Object.keys(a).map((k) => [k, ((a as any)[k] ?? 0) - ((b as any)[k] ?? 0)])) as Partial<StageSummary>; }

export function assertDiagnosticsDoNotChangeNormalGenerate(params: GeneratorParams): boolean {
  const before = generateWorldFromParams(params); applyGeneratedGeographyPipeline(before);
  runMultiSeedGenerateDiagnostics({ seeds: [params.seed], width: params.width, height: params.height, continentCount: params.continentCount });
  const after = generateWorldFromParams(params); applyGeneratedGeographyPipeline(after);
  return JSON.stringify(before.cells.map(heightAndWater)) === JSON.stringify(after.cells.map(heightAndWater));
}
function heightAndWater(c: WorldBrain['cells'][number]) { return [c.baseHeight, c.editHeightDelta, c.simHeightDelta, c.isWater]; }

function computeMorphologyMetrics(world: WorldBrain): MorphologyMetrics {
  const heights = world.cells.map((_, i) => totalHeight(world, i));
  const land = world.cells.filter((c) => !c.isWater).map((c) => totalHeight(world, c.index));
  const ocean = world.cells.filter((c) => c.isWater).map((c) => totalHeight(world, c.index));
  const slopes = neighborDeltas(world); const patches = patchSizes(world, (i) => !world.cells[i].isWater); const coast = coastEdges(world);
  return { elevationQuantiles: quantiles(heights), landHeightStdDev: stdDev(land), oceanDepthStdDev: stdDev(ocean), slopeMean: mean(slopes), slopeMax: Math.max(0, ...slopes), slopeP95: percentile(slopes, 0.95), roughnessMean: mean(world.cells.map((_, i) => stdDev(neighborIndices4(world, i).map((n) => totalHeight(world, n))))), coastLength: coast, coastComplexity: coast / Math.max(1, Math.sqrt(Math.max(1, land.length))), landPatchCount: patches.length, landPatchSizeDistribution: patches, largestLandmassShare: (patches[0] ?? 0) / Math.max(1, land.length), islandSizeClasses: { tiny: patches.filter((s) => s < 12).length, small: patches.filter((s) => s >= 12 && s < 64).length, medium: patches.filter((s) => s >= 64 && s < 256).length, large: patches.filter((s) => s >= 256).length }, shorelineJaggedness: coast / Math.max(1, patches.length) };
}
function computeHydrologyMetrics(world: WorldBrain): HydrologyMetrics { const lengths = (world.rivers ?? []).map((r) => r.path?.length ?? 0); const cells = new Set((world.rivers ?? []).flatMap((r) => r.path ?? [])); const reaching = (world.rivers ?? []).filter((r) => world.cells[r.mouthCellIndex]?.isWater).length; const flow = world.cells.map((c) => c.flowAccumulation ?? 0).sort((a,b)=>b-a); return { riverCount: lengths.length, riverCellCount: cells.size, averageRiverLength: mean(lengths), maxRiverLength: Math.max(0, ...lengths), percentRiversReachingOcean: reaching / Math.max(1, lengths.length), inlandDeadEndRiverCount: lengths.length - reaching, flowAccumulationConcentration: flow.slice(0, Math.max(1, Math.ceil(flow.length * 0.01))).reduce((a,b)=>a+b,0) / Math.max(1, flow.reduce((a,b)=>a+b,0)), basinCount: new Set(world.cells.map((c) => c.basinId).filter((v) => v != null)).size, tinyIsolatedDrainageArtifacts: patchSizes(world, (i) => (world.cells[i].flowAccumulation ?? 0) > 0 && (world.cells[i].flowAccumulation ?? 0) < 4).filter((s) => s <= 2).length }; }
function computeCauseLeakMetrics(world: WorldBrain): CauseLeakMetrics { const h = world.cells.map((_, i) => totalHeight(world, i)); return { plateHeightJump: seamRatio(world, (a,b)=>a.plateId!==b.plateId), provinceHeightJump: seamRatio(world, (a,b)=>!!a.crustProvince && !!b.crustProvince && a.crustProvince!==b.crustProvince), skeletonHeightJump: seamRatio(world, (a,b)=>a.continentId!==b.continentId || a.oceanBasinId!==b.oceanBasinId || a.marginType!==b.marginType || a.islandCause!==b.islandCause), plateTopGradientShare: topGradientShare(world, (a,b)=>a.plateId!==b.plateId), provinceTopGradientShare: topGradientShare(world, (a,b)=>!!a.crustProvince && !!b.crustProvince && a.crustProvince!==b.crustProvince), skeletonTopGradientShare: topGradientShare(world, (a,b)=>a.continentId!==b.continentId || a.oceanBasinId!==b.oceanBasinId || a.marginType!==b.marginType || a.islandCause!==b.islandCause), crustThicknessCorrelation: corr(h, world.cells.map(c=>c.crustThickness ?? 0)), crustAgeCorrelation: corr(h, world.cells.map(c=>c.crustAge ?? 0)), continentalityCorrelation: corr(h, world.cells.map(c=>c.continentality ?? 0)), shelfStrengthCorrelation: corr(h, world.cells.map(c=>c.shelfStrength ?? 0)), provincePatchCount: patchSizes(world, (i)=>!!world.cells[i].crustProvince).length, provinceLabelEntropy: entropy(world.cells.map(c=>c.crustProvince ?? 'none')), skeletonPatchCount: patchSizes(world, ()=>true, (i)=>`${world.cells[i].continentId}:${world.cells[i].oceanBasinId}:${world.cells[i].marginType}:${world.cells[i].islandCause}`).length, skeletonLabelEntropy: entropy(world.cells.map(c=>`${c.continentId}:${c.oceanBasinId}:${c.marginType}:${c.islandCause}`)), heightNeighborAutocorrelation: neighborAutocorr(world, h), provinceNeighborAutocorrelation: labelNeighborShare(world, (i)=>world.cells[i].crustProvince ?? 'none') }; }

function totalHeight(w: WorldBrain, i: number) { const c = w.cells[i]; return c.baseHeight + c.editHeightDelta + c.simHeightDelta; }
function neighborIndices4(w: WorldBrain, i: number) { const r=Math.floor(i/w.gridWidth), c=i%w.gridWidth; const n=[r*w.gridWidth+((c+1)%w.gridWidth), r*w.gridWidth+((c-1+w.gridWidth)%w.gridWidth)]; if(r>0)n.push((r-1)*w.gridWidth+c); if(r<w.gridHeight-1)n.push((r+1)*w.gridWidth+c); return n; }
function neighborDeltas(w: WorldBrain) { const out:number[]=[]; for(let i=0;i<w.cells.length;i++) for(const n of neighborIndices4(w,i)) if(n>i) out.push(Math.abs(totalHeight(w,i)-totalHeight(w,n))); return out; }
function patchSizes(w: WorldBrain, include: (i:number)=>boolean, label: (i:number)=>string = ()=>'land') { const seen=new Uint8Array(w.cells.length), sizes:number[]=[]; for(let i=0;i<w.cells.length;i++){ if(seen[i]||!include(i)) continue; const lab=label(i), q=[i]; seen[i]=1; let size=0; for(let h=0;h<q.length;h++){ const cur=q[h]; size++; for(const n of neighborIndices4(w,cur)) if(!seen[n]&&include(n)&&label(n)===lab){seen[n]=1;q.push(n);} } sizes.push(size);} return sizes.sort((a,b)=>b-a); }
function coastEdges(w: WorldBrain) { let c=0; for(let i=0;i<w.cells.length;i++) for(const n of neighborIndices4(w,i)) if(n>i && w.cells[i].isWater!==w.cells[n].isWater)c++; return c; }
function seamRatio(w: WorldBrain, edge:(a:WorldBrain['cells'][number],b:WorldBrain['cells'][number])=>boolean){ let e=0,ec=0,b=0,bc=0; for(let i=0;i<w.cells.length;i++) for(const n of neighborIndices4(w,i)) if(n>i){ const d=Math.abs(totalHeight(w,i)-totalHeight(w,n)); if(edge(w.cells[i],w.cells[n])){e+=d;ec++;}else{b+=d;bc++;}} return ec&&bc&&b/bc>1e-9 ? (e/ec)/(b/bc) : null; }
function topGradientShare(w: WorldBrain, edge:(a:WorldBrain['cells'][number],b:WorldBrain['cells'][number])=>boolean){ const edges: Array<[number, boolean]>=[]; for(let i=0;i<w.cells.length;i++) for(const n of neighborIndices4(w,i)) if(n>i) edges.push([Math.abs(totalHeight(w,i)-totalHeight(w,n)), edge(w.cells[i],w.cells[n])]); edges.sort((a,b)=>b[0]-a[0]); const top=edges.slice(0,Math.max(1,Math.ceil(edges.length*.1))); return top.filter(([,e])=>e).length/top.length; }
function quantiles(v:number[]) { return { p05: percentile(v, .05), p25: percentile(v, .25), p50: percentile(v, .5), p75: percentile(v, .75), p95: percentile(v, .95) }; }
function percentile(v:number[], p:number){ if(!v.length)return 0; const s=[...v].sort((a,b)=>a-b); return s[Math.min(s.length-1, Math.max(0, Math.floor((s.length-1)*p)))]; }
function mean(v:number[]){ return v.length ? v.reduce((a,b)=>a+b,0)/v.length : 0; }
function stdDev(v:number[]){ const m=mean(v); return v.length ? Math.sqrt(mean(v.map(x=>(x-m)**2))) : 0; }
function corr(a:number[], b:number[]){ const ma=mean(a), mb=mean(b), sa=stdDev(a), sb=stdDev(b); if(sa<=1e-9||sb<=1e-9)return 0; return mean(a.map((x,i)=>(x-ma)*(b[i]-mb)))/(sa*sb); }
function entropy(labels:string[]){ const counts=new Map<string,number>(); labels.forEach(l=>counts.set(l,(counts.get(l)??0)+1)); return -Array.from(counts.values()).reduce((s,c)=>{const p=c/labels.length; return s+p*Math.log2(p);},0); }
function neighborAutocorr(w:WorldBrain, v:number[]){ const pairs:number[]=[]; for(let i=0;i<w.cells.length;i++) for(const n of neighborIndices4(w,i)) if(n>i) pairs.push((v[i]-mean(v))*(v[n]-mean(v))); const sd=stdDev(v); return sd<=1e-9?0:mean(pairs)/(sd*sd); }
function labelNeighborShare(w:WorldBrain, label:(i:number)=>string){ let same=0,total=0; for(let i=0;i<w.cells.length;i++) for(const n of neighborIndices4(w,i)) if(n>i){ total++; if(label(i)===label(n)) same++; } return same/Math.max(1,total); }
