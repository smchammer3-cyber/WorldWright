# One causal physical path — executable handoff and switch blockers
Status: implementation in progress, **NOT production-promoted**.
Base: `WorldWright-new` at 2026-10-30. This is a current design/implementation note, not a superseding scientific blueprint.
Governing documents: `WORLDWRIGHT_BLUEPRINT_CURRENT_AUTHORITY.md`, `docs/blueprint/current/01_UNIFIED_CAUSAL_TECHNICAL_ARCHITECTURE.md`, `02_AUTHORITY_OWNERSHIP_AND_PROMOTION.md`, and `06_IMPLEMENTATION_ROADMAP_AND_GATES.md`.

## Desired end state

New Generate Mode worlds have **exactly one authoritative physical route: CAUSAL**. One root seed + approved input/constraint bundle produces a deterministic causal history, spatial causes, structural/material roles, terrain, bounded surface evolution and final derived surface. The renderer only reads the finished world. The old generator exists solely to load/display existing legacy worlds or as an explicitly selected rollback while promotion is still underway; it never writes any field inside a causal run.

**No piecemeal promotion:** do not mix old noise terrain with causal geology; do not run `applyGeneratedGeographyPipeline` on a CAUSAL world; do not reconstruct cause fields from finished height, water masks or colors; do not silently replace blocked causal fields with legacy data. When an essential stage is incomplete, return BLOCKED with a concrete reason rather than an invented planet.

## Live path as of this branch

`GenerateControls` -> `GenerateModeApp.handleGenerate` -> `WorldSession.createWorld(params)` -> `generateCompletePhysicalWorld(..., LEGACY)` -> `worldGenerator.ts` -> `worldGenerator/index.ts` -> `prepareWorld` -> `recomputeWorld` -> `applyGeneratedGeographyPipeline` -> validation -> saved/visible `WorldBrain`.

The new route dispatcher now owns **the entire legacy physical generation and terrain-adjustment sequence**, not just the raw height stage. `CAUSAL` is explicitly rejected before invoking legacy construction. Existing worlds still use `WorldSession.loadWorld` and migrations.

**What this PR proves:** isolation of the whole existing physical route and an explicit fail-closed boundary. **What it does not prove:** any improvement to visible worlds or a functioning causal generator. It does not change the default and does not authorize a physical switch.

## What actually exists in the new causal system

- Planetary initial-condition resolver (with joint-constraint policy and shadow-only inputs).
- Premise, interior, tectonic regime history and geologic spine detached resolvers.
- Spherical process-field diagnostic projections.
- Detached continent/ocean structural interpretation.
- Detached structure/material province candidate resolver.
- L1A landform-potential **types and state contracts**, and L1B reviewed rule/research package.

These components are not substitute implementations of the old continent/crust modules; they are the *new* causal architecture. Preserve their provenance/immutability/firewalls while introducing a complete independent route.

## Actual missing work — in dependency order

1. **Landform-potential resolution (L1C or later).** Currently `causalGeology/landformPotential.ts` defines the diagnostic state and potential candidates; `docs/implementation/causal-program-current-status.json` explicitly states resolver implementation/evaluation and calibration are not yet authorized. Build a source-backed, conservative, fail-closed resolver from C/D/M candidate evidence. A `PARTIAL` output must not be recast as calibrated physical authority. Resolve scientific orientation and suppression gaps rather than guessing coefficients.
2. **Causal solid-body base Terrain Birth (Phase B).** Implement `BaseTerrainState` outside old `worldGenerator/index.ts`. It consumes *only* approved causal upstream records and versioned, reviewed terrain rules. Geological structures must produce identifiable shape terms with recorded cause IDs; continental and ocean-basement terms have distinct authority. Orientation for mountain/rift belts must be real, not invented from radial kernel IDs. No noise term may invent a mountain/rift/continent without a cause.
3. **Provisional boundaries + bounded surface evolution (Phase E).** Surface water/climate/ice/erosion/sediment affect the already causal solid-body topography in a bounded, deterministic snapshot-to-snapshot process. No stage may rewrite its geological history to explain the outcome. Demonstrate relief-age and material sensitivity; conserve mass where applicable.
4. **Final terrain composition and independent derived surface (Phase FNL).** A single causal composer resolves final height. Derive physical sea level (not just arbitrary percentile target), land/water, bathymetry, climate, hydrology, rivers, biomes and materials from that final terrain. Existing `worldRecompute/index.ts` reads/mixes prior climate state and its ocean-depth labels use depth thresholds as features; audit and extract *pure reusable derivations* deliberately rather than invoking the legacy recompute blindly. Legacy `worldCrust`, `worldContinents`, and `worldGeographyPipeline` must not be invoked.
5. **One complete candidate serializer + route handoff (A3-A4).** Build a valid `WorldBrain` document (or versioned successor) entirely from the new causal state, including provenance of **which complete route wrote it**, without smuggling legacy anatomy through the `prepareWorld` legacy repair path. Migrate only after confirming migration does not synthesize legacy causes. A single selector routes whole-world creation to one complete implementation; never stack their outputs.
6. **Real-world review and default promotion (A5-A6).** Compare fixed-seed generated height, geological-cause overlays, globe front/back/other rotations, drainage and land/water transitions, along with multi-seed and slider sensitivity. Keep difficult/blocked seeds visible, not discarded. After the causal route beats the reference evidence and passes physical/visual acceptance, make CAUSAL the *default for new worlds*. Keep legacy only for old saved worlds and explicitly reversible rollback until retirement.

## Acceptance that matters (not merely a green CI badge)

A single collision feature must cause its belt-shaped uplift at identifiable world coordinates, with a traceable ID and measurable removal response in an ablation; an unsupported collision must not produce uplift. Real heights and geographic renderings—not just type/schema asserts—must show it. Across unrelated seeds, worlds must look different but geologically plausible; each seed must replay. Sea level must change exposure without retroactively changing geological history. A generated river must follow final drainage. Backward-compatible legacy loading must continue.

## Coding boundaries for this PR

- Change only the **route boundary**, tests for exclusive dispatch, and this documented gap map.
- Do **not** edit causal scientific modules, remove duplicate-looking legacy functions, change thresholds, or blend legacy/new terrain.
- Do **not** claim the switch is finished; no `CAUSAL_ACTIVE`, no sneaky UI toggle, no merge without review.

## Next useful coding target

The FIRST missing mathematical/physical output is not another feature-flag registry or more debug panels: it is the authorized landform-potential resolver, immediately followed by a base-terrain candidate with visible, source-attributed geology. Implement that along one continuous route, with fail-closed support for genuinely unresolved science.
