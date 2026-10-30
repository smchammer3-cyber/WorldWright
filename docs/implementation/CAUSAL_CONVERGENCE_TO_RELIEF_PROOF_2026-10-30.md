# Causal convergence → relief proof (not promotion)
Date: 2026-10-30. Parent: draft PR #168. Status: an isolated, explicitly **uncalibrated geometry experiment**; no physical or production authority.

## The question this code answers
Can one actual, source-recorded geological event produce **visible terrain geometry**, and can we demonstrate the terrain contribution disappears when that geological cause is removed — without the old noise generator, final color, or a retrofitted land mask? Previously, nearly every green geology test proved a record or schema existed rather than any source-caused landform.

The prototype `src/core/causalTerrainCandidate/convergenceReliefDiagnostic.ts` takes a **real `GeologicSpineV1`** from the existing detached resolver. A convergence node must have a valid `CONVERGES_WITH` graph edge and formation event. Its spherical anchor, spatial extent and axis produce an *oriented, localized, dimensionless uplift response*. Every term is zero outside the convergence region. A second run explicitly ablates all convergence sources, producing a zero field. It records node IDs, event IDs, edge ancestry, source hash and output stats, and exports an SVG of both rasters side by side.

The proof's existing test calls **`resolveGeologicSpine` with the existing reviewed Earthlike fixture**, then generates the actual geometry and its ablation from that returned spine. It is an output-based proof: there is a visual artifact in CI, not merely a boolean assert. The test also checks that all sources ablated means zero relief, replay is identical and all values are finite/bounded.

## What it DOES NOT demonstrate
- A convergence node and `CONVERGES_WITH` edge do **not** establish a **continental collision**, a material-limited uplift mechanism, or a mountain system's physical elevation.
- The current spine uses **independently seeded feature positions and bearings**. Its graph relationships do not establish spatial contact; this is a critical blocker before using it as physical authority. We must make collision adjacency, orientation and chronology genuinely causal.
- The dimensionless amplitude, belt width, synthetic fold detail and source footprint are **demonstration geometry only**, NOT scientifically calibrated uplift terms. A physical mountain-height model needs scientific constraints, approved response laws, stress/orientation and material evidence.
- Current M1C structure/material and L1B landform potential remain `PARTIAL`/detached; neither is promoted. No official `LandformPotentialStateV1` was invented, no physical `BaseTerrainState` was claimed, no climate or surface evolution was created.
- Ordinary Generate still uses the legacy route; the `CAUSAL` route fails closed. No legacy code is removed or allowed to supply this candidate's height.
- No artifact proves realistic geological or visual quality until a person **examines the SVG** and the source provenance.
- A fixed synthetic test fixture of a rocky history is not the equivalent of arbitrary planet generation.

## Next actual integration blockers in order
1. Spatially coherent causal source graph: geologic adjacency must exist, not just random anchors linked by edges.
2. Resolve candidate potentials and suppress invalid terms from evidence (L1C) with explicit science review.
3. Physically supported, oriented deformation mechanics and crust/material response as approved Base Terrain Birth; output with units and cause ID.
4. Evolve the surface within bounds with climate/erosion/sediment/ice; derive final height, sea-level and hydrology from the *finished* terrain.
5. Integrate complete candidate through the one physical route dispatcher; validate real 3D globe, saved data and several seeds.
6. Switch default new-world route to `CAUSAL` only after complete coherent candidate proves itself. Legacy worlds retain a separate load/compatibility path.

## Where to inspect
The CI artifact **`causal-convergence-geometry-proof`** contains `real-spine-convergence-vs-ablation.svg` and `source-and-ablation.json`. Judge visible shape, not CI alone.
