# PR #69 Multi-seed Generate Diagnostics and Terrain Morphology Metrics

Status: diagnostics only. This PR does not change normal terrain generation behavior, renderer output, schema, sea level, Generate UI visuals, terrain tuning, or the normal pipeline order.

## Methodology

PR #69 adds a reusable core diagnostic harness that replays the existing Generate stage diagnostics across a default seed set and computes stage deltas, aggregate stage rankings, final-world morphology metrics, hydrology sanity metrics, cause-to-terrain leak metrics, spatial autocorrelation/blotchiness metrics, and optional ablation replays.

The harness is intentionally read-only with respect to normal Generate output: it constructs fresh generated worlds from generator parameters, runs diagnostic-only replays in local objects, and never edits the normal `applyGeneratedGeographyPipeline` implementation.

## Seed list

Default seeds:

| Seed |
| --- |
| `67` |
| `32319885` |
| `worldwright-a` |
| `worldwright-b` |
| `worldwright-c` |
| `worldwright-d` |
| `worldwright-e` |

Default grid: `128×64`.

## Stage ranking table

The machine-readable summary object returned by `runMultiSeedGenerateDiagnostics()` includes deterministic ranking arrays for:

| Ranking key | Meaning |
| --- | --- |
| `plateImprintIncreases` | Stages most often/strongly increasing plate seam height imprint. |
| `provinceImprintIncreases` | Stages most often/strongly increasing crust-province seam height imprint. |
| `skeletonImprintIncreases` | Stages most often/strongly increasing continent/ocean-basin/skeleton seam imprint. |
| `reliefDecreases` | Stages most often/strongly decreasing land relief. |
| `fragmentIncreases` | Stages most often/strongly increasing land bodies and medium fragments. |
| `fragmentRepairs` | Stages most often/strongly reducing land bodies and medium fragments. |
| `worstRepairBenefitVsImprintCost` | Stages with high imprint cost compared with fragment-repair benefit. |

## Per-seed suspect table

Each per-seed run returns the full ordered stage list with raw metrics, deltas from the previous stage, and terrain transition metrics. Use the largest positive deltas in plate/province/skeleton imprint, negative land-relief deltas, and fragment deltas to identify per-seed suspects.

## Morphology summary

Final-world morphology metrics include:

- elevation quantiles (`p05`, `p25`, `p50`, `p75`, `p95`)
- land height standard deviation
- ocean depth standard deviation
- slope mean, max, and p95
- roughness/local height variance
- coast length and coast complexity
- land patch count and patch size distribution
- largest landmass share
- island count by size class
- shoreline jaggedness

## Hydrology summary

Hydrology sanity metrics include:

- river count
- river cell count
- average and maximum river length
- percent of rivers reaching ocean
- inland dead-end river count
- flow accumulation concentration
- basin count
- tiny isolated drainage artifacts

## Cause-leak summary

Cause-to-terrain leak metrics include:

- mean relative height jump across plate, province, and skeleton seams
- percent of top 10% height gradients that lie on plate, province, or skeleton seams
- height correlations with crust thickness, crust age, continentality, and shelf strength
- province and skeleton label entropy
- province and skeleton patch counts
- height neighbor autocorrelation
- province-label neighbor autocorrelation

These metrics are designed to distinguish natural smooth/noisy terrain from terrain clustering into hidden-label-shaped regions.

## Ablation summary

Ablation mode can skip any single diagnostic terrain stage from this set:

- `SKELETON_ELEVATION`
- `QUALITY_PASS`
- `CRUST_PROVINCE_DELTA`
- `CRUST_COAST_BREAKUP`
- `CRUST_COHERENCE`
- `CRUST_SKELETON_OBEDIENCE`
- `CRUST_TINY_ISLAND_CLEANUP`
- `OCEAN_BATHYMETRY_SMOOTHING`

For each skip, the harness compares final metrics to the normal baseline and flags likely topology collapse. This answers which stage most reduces imprint when removed, which improves relief, which is needed for repair, and which has poor repair-benefit versus imprint-cost tradeoff.

## Final ranked suspects

The top suspect list is computed from aggregate ranking leaders for plate imprint, province imprint, skeleton imprint, and relief decreases. Based on PR #68's single-seed findings, expected suspects to watch across the sample set remain:

1. `SKELETON_ELEVATION` for first broad plate/skeleton height imprint amplification.
2. `CRUST_PROVINCE_DELTA` for province terrain imprint and relief decrease risk.
3. `CRUST_SKELETON_OBEDIENCE` for late skeleton imprint amplification.
4. `QUALITY_PASS` for possible relief reduction in some seeds.
5. `CRUST_FIELDS` for province label/metadata risk, not direct terrain mutation.

## Caveat

Diagnostics only, not a fix. The output should guide the next terrain change, but this PR intentionally does not tune terrain, alter renderer behavior, migrate schema, change sea level, change Generate UI visuals, or reorder the normal generation pipeline.
