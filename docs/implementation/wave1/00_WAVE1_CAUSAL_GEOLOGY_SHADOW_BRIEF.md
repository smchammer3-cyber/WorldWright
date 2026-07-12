# Wave 1 — Causal Geology Shadow Brief

## Status and authority boundary

```text
planning branch: plan/wave1-causal-geology-shadow-brief
base: WorldWright-new after merged C04
physical generator authority: LEGACY
default causal flag: causal.shadow.enabled = false
CAUSAL_ACTIVE: forbidden and unimplemented
visible planet changes: none
legacy generator/pipeline edits: forbidden
PR #118: untouched
```

Wave 1 begins the first upstream causal-geology system, but only in `CAUSAL_SHADOW`. It must construct an independent, replayable scientific explanation from approved planetary inputs, preserve uncertainty and contradictions, and produce inspectable records without controlling terrain, water, climate, biomes, hydrology, materials, or rendering.

## Objective

Build and validate this forward-only chain:

```text
approved direct planetary inputs
  → sanitized causal input snapshot
  → planetary premise
  → interior and rheology
  → tectonic regime history
  → geologic spine
  → read-only shadow audit and reference comparison
```

The causal stages must never receive `WorldBrain`. They accept only a sanitized `CausalGeologyInputV1` plus prior validated causal records. This is the enforceable input firewall. The audit stage is the only Wave 1 stage allowed to receive legacy solved morphology, and its outputs may never feed back into causal resolution.

## Why Wave 1 starts here

The known geological authority failure remains at `RAW_GENERATOR`. More smoothing, coastline shaping, or material reinforcement would operate downstream of an unproven source. Wave 1 therefore creates the missing upstream explanation before any future causal terrain writer is considered.

C02 supplies deterministic streams, provenance, flags, and replay. C03 supplies field/process ownership and fail-closed write guards. C04 supplies evidence, confidence, deterministic weighted alternatives, and contradiction records. Wave 1 must use those foundations rather than invent parallel mechanisms.

## Input firewall

`PlanetFoundationSnapshot` is not automatically trusted as causal input. It mixes direct physical values with legacy-derived interpretations such as geology stack, tectonic vigor, mantle-convection estimates, rift likelihood, hotspot potential, and resolved consequences.

W1-01 must define an explicit field-by-field authority matrix:

- `DIRECT_DECLARATION`: user or fixture supplied physical premise;
- `APPROVED_PHYSICAL_DERIVATION`: recomputed by a versioned Wave 1 formula from direct declarations;
- `LEGACY_DERIVATION`: available only to comparison diagnostics;
- `FORBIDDEN_SOLVED_MORPHOLOGY`: unavailable to all causal resolvers.

A value cannot become causal authority merely because it already exists on `world.planetFoundation`.

## Required shadow stages

1. **`CAUSAL_INPUT_SANITIZATION`**
   - reads declared generation inputs and approved immutable physical values;
   - writes a detached `CausalGeologyInputV1`, not world state;
   - classifies every input by authority source and derivation version;
   - rejects unapproved or contradictory required inputs.

2. **`CAUSAL_PREMISE_RESOLUTION`**
   - reads only `CausalGeologyInputV1` and approved run configuration;
   - writes only `causalRecord`;
   - resolves world class, valid layer stack, surface-support assumptions, volatile/water premise, and explicit scientific limitations;
   - uses `causal.premise` for deterministic alternatives.

3. **`CAUSAL_INTERIOR_RESOLUTION`**
   - reads only validated premise plus sanitized causal inputs;
   - writes only `causalRecord`;
   - resolves thermal budget, mantle-convection range, lithosphere/rheology family, lid behavior, and bounded volcanic/rift/hotspot tendencies;
   - uses `causal.interior`.

4. **`CAUSAL_REGIME_HISTORY`**
   - reads validated premise and interior state;
   - writes only `causalRecord`;
   - creates ordered geological epochs and transitions rather than one timeless tectonic label;
   - uses `causal.regime-history` with epoch identity in the random scope.

5. **`CAUSAL_GEOLOGIC_SPINE`**
   - reads validated premise, interior, and regime history;
   - writes only `causalRecord`;
   - creates resolution-independent spherical identities and relationships for continental kernels, ocean basins, rifts, convergence systems, transforms, plumes/hotspots, and major event ancestry;
   - uses `causal.geologic-spine`.

6. **`CAUSAL_SHADOW_AUDIT`**
   - reads completed causal records, legacy world state, diagnostics, and geology-audit references;
   - writes diagnostics only;
   - compares rules, expected tendencies, thresholds, contradictions, and reference coverage;
   - cannot mutate the world or causal records.

## Stage completion and failure semantics

Every causal stage returns one of:

```text
COMPLETE  — valid output with sufficient contract coverage
PARTIAL   — valid output with explicit limitations or unknowns
BLOCKED   — prerequisite evidence/input is insufficient or contradictory
FAILED    — contract, validation, or execution failure
```

Rules:

- no stage silently substitutes a fallback;
- `FAILED` stops all downstream causal stages;
- `BLOCKED` prevents any downstream stage requiring the blocked domain;
- `PARTIAL` may continue only when downstream validators explicitly accept the missing dimensions;
- a shadow run may be persisted as partial or blocked for inspection, but never presented as complete;
- operational errors are distinct from scientific uncertainty.

## Non-goals

Wave 1 does not:

- write `cell.baseHeight` or any other terrain field;
- replace legacy plates, boundaries, continent fields, crust fields, or feature fields;
- derive climate, rivers, biomes, materials, or colors;
- tune the causal model to imitate known legacy defects;
- mark a causal result correct merely because it resembles the legacy globe;
- trust legacy-derived foundation interpretations as upstream scientific facts;
- enable `causal.active.enabled`;
- create a promotion path hidden inside an implementation PR.

## Forbidden causal reads

The following are forbidden for premise, interior, regime-history, and geologic-spine resolution:

```text
WorldBrain itself
all cell fields
world.plates
world.rivers
world.continentSkeletons
world.oceanBasinSkeletons
legacy geologyStack
legacy resolvedPhysicalConsequences
legacy mantleConvectionIndex
legacy tectonicVigor
legacy volcanismBias
legacy riftLikelihood
legacy hotspotPotential
legacy crust/continent/feature interpretations
```

The input sanitizer may inspect only the declared-input source and a reviewed allowlist. The audit may read legacy solved morphology after the causal run is complete and immutable.

## Shadow attachment and persistence

Default `LEGACY` generation remains byte-identical and does not attach or compute shadow state.

An explicit shadow request may either:

1. return a detached immutable `CausalShadowRunV1`; or
2. attach its validated causal payload to a cloned world with:
   - `causal.authorityMode = 'CAUSAL_SHADOW'`;
   - `causal.status = 'SHADOW'`;
   - explicit run status;
   - provenance and confidence ledgers.

The deterministic causal payload must not contain timestamps or random operational IDs. Operational metadata belongs in a separate artifact envelope. Unsupported future schemas fail as unsupported; malformed current schemas are quarantined; neither is silently regenerated or reinterpreted.

## Implementation sequence

Wave 1 is split into deliberately narrow PRs:

```text
W1-01 input authority, quantities, contracts, validators, storage envelope, research ledger, process registration
W1-02 planetary premise shadow resolution
W1-03 interior and rheology shadow resolution
W1-04 tectonic regime-history shadow resolution
W1-05 geologic-spine graph and event ancestry
W1-06 shadow diagnostics, controlled archetypes, threshold fixtures, and reference integration
W1-07 completion and promotion-readiness report only — no CAUSAL_ACTIVE implementation
```

Each PR must be independently revertible and preserve legacy physical output. Implementation does not begin until this planning PR is explicitly approved and merged.

## Definition of done

Wave 1 is complete only when:

- identical seed, sanitized inputs, flags, and versions produce byte-identical causal payloads;
- serialization and reload reproduce the same records, hashes, statuses, and next deterministic decisions;
- all quantities carry explicit units or normalization contracts;
- all scientific alternatives have source-backed evidence IDs, confidence, and rationale;
- unresolved contradictions remain visible and reduce confidence;
- forbidden terrain and legacy-derived values cannot affect causal records;
- process guards prove Wave 1 writes only `causalRecord` and diagnostics;
- blocked/partial/failed stages cannot masquerade as complete;
- geologic-spine geometry is spherical and independent of grid resolution;
- the geology audit reports positive, threshold, negative, exception, and missing-reference evidence separately;
- fixed-seed and direct-input threshold matrices show reviewed sensitivity rather than unexplained branch collapse;
- runtime and memory remain within approved shadow-mode budgets;
- normal LEGACY world output remains byte-identical to the merged C04 baseline;
- the known legacy geological failure remains visible rather than being greenwashed;
- `CAUSAL_ACTIVE` remains disabled and unimplemented.
