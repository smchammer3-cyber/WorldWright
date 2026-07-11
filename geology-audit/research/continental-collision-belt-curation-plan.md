# Continental collision belt curation plan

## Purpose

This document turns the collision-belt research brief into a practical curation plan for the WorldWright audit registry.

The immediate deliverable is **not** a metric. It is an approved, well-labeled evidence family that later metrics can learn from.

## Family identifier

- **familyId:** `collision-belt-vs-radial-blob`
- **primary rule domain:** `continental-collision`
- **first target rule IDs:**
  - `collision-belt-elongate-structure`
  - `collision-belt-basin-pairing`
  - `collision-belt-nonradial-organization`
  - `collision-belt-plateau-front-logic`

## Evidence classes to build

### Positive
Use real collision-belt examples that demonstrate expected morphology.

Target count: **4–6** approved cases.

Suggested spread:
1. Himalaya–Tibet type
2. Zagros type
3. Alps / Carpathian curved-belt type
4. Older eroded thrust-belt type
5. Optional plateau-backed variant
6. Optional oblique-convergence variant

### Threshold
Use nearby cases or controlled subfamilies to show how morphology should shift.

Target count: **3–5** approved cases.

Threshold axes to vary:
- curvature;
- erosion strength / maturity;
- foreland-basin strength;
- plateau width;
- belt width vs length;
- climate smoothing / glacial dissection.

### Negative
Use known WorldWright failures or carefully controlled anti-examples.

Target count: **3–4** approved cases.

Negative classes:
- symmetric blob;
- concentric ring massif;
- radial drainage super-hub;
- flooded continental ghost.

### Exception
Use valid shapes that might superficially resemble a failure.

Target count: **2–3** approved cases.

Exception classes:
- strongly curved syntaxis;
- local dome inside larger belt;
- broad plateau interior with preserved frontal belt.

## Required assets per reference case

Each approved case should try to include at least four assets:

1. **shaded relief / DEM-like view**
   - best for topographic organization and belt geometry
2. **tectonic or structural map**
   - best for suture, thrust, or fold-belt logic
3. **natural color / satellite context**
   - best for human visual realism cross-checks
4. **drainage / hydrography view**
   - best for detecting radial vs anisotropic organization

Optional helpful assets:
- slope map;
- curvature map;
- interpreted ridge-orientation overlay;
- simple annotated teaching panel.

## Minimum metadata per case

Each case should include:
- `caseId`
- `familyId`
- `kind` (positive / threshold / negative / exception)
- `status`
- `authority`
- `rulesDemonstrated`
- `parameters`
- `metrics` (may be initially sparse)
- `assets`
- `review`
- `version`

## Parameter labels to capture

The exact values can remain qualitative at first if full calibrated numbers are not available.

Suggested labels:
- `tectonicActivity`
- `surfaceAgeNormalized`
- `erosionStrength`
- `seaLevelNormalized`
- `precipitationNormalized`
- `heatFlowNormalized`
- `crustThicknessNormalized`

Suggested qualitative tags:
- `beltCurvature`
- `beltWidthClass`
- `plateauPresence`
- `forelandExpression`
- `erosionalDissection`
- `radialityRisk`

## Review checklist for positive cases

A positive case should generally pass most of these checks:

- clear dominant belt or arc axis;
- mountain belt length visibly exceeds width;
- relief is directional, not center-driven;
- ridge/fold pattern broadly tracks belt orientation;
- adjacent basin or lowland pairing is visible or defensible;
- drainage is mixed longitudinal / trellis / transverse, not globally radial;
- complexity is real but does not collapse into a circular massif.

## Review checklist for negative cases

A negative case should generally show several of these:

- circular or near-circular mountain field;
- equal-radius uplift from a central area;
- concentric relief bands;
- basin absent or arranged symmetrically;
- major drainage fanning from one central hub;
- no convincing plate-boundary-facing front.

## How to use WorldWright outputs as negatives

WorldWright failed outputs are valuable because they capture the exact false positives we want to prevent.

For each failed world used as a negative reference:
- preserve the exact seed and generator commit;
- export the same diagnostic asset bundle used by the audit exporter;
- record why the world fails collision-belt logic;
- label whether the failure is radiality, ghosting, lack of basin pairing, over-smoothing, or mixed causes.

## Approval policy

A reference should not become `approved` unless it has:
- at least one clearly useful visual asset;
- a short geological justification;
- review notes for geological correctness;
- review notes for visual usefulness;
- explicit case class (positive, threshold, negative, or exception).

## First concrete case slate

### Positive candidates
- `ccb-pos-himalaya-arc-plateau`
- `ccb-pos-zagros-fold-thrust`
- `ccb-pos-alps-arcuate-collision`
- `ccb-pos-old-eroded-thrust-belt`

### Threshold candidates
- `ccb-thr-curvature-low`
- `ccb-thr-curvature-high`
- `ccb-thr-erosion-low`
- `ccb-thr-erosion-high`
- `ccb-thr-plateau-broadening`

### Negative candidates
- `ccb-neg-radial-blob-worldwright-001`
- `ccb-neg-concentric-bullseye-worldwright-002`
- `ccb-neg-radial-drainage-worldwright-003`
- `ccb-neg-submerged-ghost-worldwright-004`

### Exception candidates
- `ccb-exc-syntaxis-strong-curvature`
- `ccb-exc-local-dome-inside-belt`
- `ccb-exc-plateau-interior-preserved-front`

## Suggested workflow

1. **Collect** candidate assets.
2. **Label** each case provisionally.
3. **Reject** weak or ambiguous cases early.
4. **Approve** a small clean seed set first.
5. **Only then** attempt metric calibration.
6. **Only after calibration** consider advisory scoring in reports.
7. **Only after false-positive study** consider CI gating.

## Stop conditions

Do **not** move to automatic scoring if any of the following remain unresolved:
- the positive family still depends on one everything-example;
- negative examples are not cleanly separated from valid curved belts;
- plateau-backed cases are being misread as blobs;
- erosion state changes the audit outcome unpredictably;
- the review team cannot explain why a case passed or failed.

## Next bounded implementation step

After this curation plan is accepted, the next engineering step should be:

1. create provisional registry entries for this family;
2. attach placeholder asset descriptors;
3. wire the family into a human-readable audit report;
4. keep all findings advisory only.
