# PR 87: Detailed Generate Authority Audit

## Context
This audit ensures the terrain generation pipeline follows the blueprint: plates define features, features influence terrain, and terrain shapes final color and height. The goal is to identify where unintended authority leakage or misalignment occurs before further generation changes are made.

## Scope
We will assess:
1. Field ownership from tectonics, crust, skeletons, and terrain layers.
2. Each stage’s role in the `generateWorld` pipeline.
3. Whether final terrain or color emerges from intended authority layers.
4. Diagnostic gaps—do we measure enough to catch surprises?

## Step-by-Step Audit Plan

### 1. Map the Full Pipeline (From Seed to Render)
- Identify each function in `worldGenerator` that mutates `baseHeight` or assigns authority fields (plate, skeleton, crust, features).
- Document the exact order: raw generation → continent skeleton → plate/crust features → terrain influences → quality passes → recomputes → render preview.
- Create a visual diagram (optional) or a clear list of these stages.

### 2. Validate Authority Separation
- For each stage, ask: Does it read from tectonics/plates, from skeletons, from crust, or from prior terrain?
- Confirm: Does it only influence its intended layer (e.g., plates influence features, features influence terrain)?
- Check for direct terrain painting by `plateId`, `crustProvince`, or skeleton fields. If any direct imprints exist, note them as authority violations.

### 3. Measure Land Hierarchy & Fragmentation
- Ensure diagnostics capture not just total land coverage, but:
  - Number of landmasses.
  - Largest landmass share.
  - Medium-sized fragments count.
  - Unintentional isolated fragments.
- If current diagnostics don’t measure these, add a plan to expand them.

### 4. Check Stage-by-Stage Diagnostics
- For each stage (e.g., continent seeding, crust influence, quality pass), record:
  - Does landmass count increase unexpectedly here?
  - Does relief flatten here?
  - Do skeleton/plate masks become visible here?
  - Are coastline or shelf shaping steps clear?
- If any stage lacks measurement, document a need for added diagnostics.

### 5. Guard Against Future Authority Collapse
- Ensure that all terrain generation steps have guards preventing them from running after user edits (`editHeightDelta`) or simulation deltas (`simHeightDelta`) exist.
- Implement or confirm `assertNoAuthoredTerrainDeltas()` guard is in place.

### 6. Document Known Unknowns (Flexibility)
- Acknowledge that diagnostics may reveal unexpected patterns:
  - Note that if a stage introduces unexpected artifacts, we must add diagnostics or refine the authority model.
- Keep this audit as an evolving checklist—if new issues arise (e.g., plate seams visible after a pass that shouldn’t reveal them), we will update the authority map.

## Deliverable
- This audit document will be updated after each diagnostic run.
- If new authority leaks or hierarchy issues are found, they will be added.
- The final result will be a clear “authority map” showing which layers own which outcomes, with any violations highlighted and follow-up tasks listed.

---

## Next Actions (Post-Audit)
1. Run diagnostics on a range of seeds and parameter sets.
2. Update this document with findings.
3. If authority misalignments are found, create focused PRs to correct them (e.g., removing terrain imprinting from plateId).
4. Only once authority is stable will we proceed to visual refinement or terrain tuning patches.

This audit plan is meant to evolve. If unexpected behavior appears—such as a new type of terrain artifact or a mismatch between intended and actual layers—we will expand the diagnostics and revise the authority map accordingly. The goal is not rigid steps but a structured, adaptable roadmap to ensure we fix the right layers before any further feature work.