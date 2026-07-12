# Wave 1 — Causal Geology Shadow Brief

## Status and authority boundary

```text
planning branch: plan/wave1-causal-geology-shadow-brief
base: WorldWright-new after merged C04
physical generator authority: LEGACY
default causal flag: causal.shadow.enabled = false
CAUSAL_ACTIVE: forbidden in Wave 1
visible planet changes: none
legacy generator/pipeline edits: forbidden
PR #118: untouched
```

Wave 1 begins the first real upstream causal-geology system, but only in `CAUSAL_SHADOW`. It must construct an independent scientific explanation of a world from planetary inputs, preserve uncertainty and contradictions, and produce inspectable records without controlling terrain, water, climate, biomes, hydrology, materials, or rendering.

## Objective

Build and validate this causal chain:

```text
planetary inputs
  → planetary premise
  → interior and rheology
  → tectonic regime history
  → geologic spine
  → shadow audit and reference comparison
```

The chain must flow forward. Premise and interior may not infer themselves backward from legacy `baseHeight`, `isWater`, crust provinces, continent labels, or other solved morphology. Shadow diagnostics may compare causal records with the legacy world, but comparison data may never feed back into causal resolution.

## Why Wave 1 starts here

The known geological authority failure remains at `RAW_GENERATOR`. More smoothing, coastline shaping, or material reinforcement would operate downstream of an unproven source. Wave 1 therefore creates the missing upstream explanation before any future causal terrain writer is considered.

C02 supplies deterministic streams, provenance, flags, and replay. C03 supplies field/process ownership and fail-closed write guards. C04 supplies evidence, confidence, deterministic weighted alternatives, and contradiction records. Wave 1 must use those foundations rather than invent parallel mechanisms.

## Required shadow stages

1. **`CAUSAL_PREMISE_RESOLUTION`**
   - reads only `planetInput` and approved run configuration;
   - writes only `causalRecord`;
   - resolves the world class, valid layer stack, surface-support assumptions, volatile/water premise, and explicit scientific limitations;
   - uses `causal.premise` for deterministic alternatives.

2. **`CAUSAL_INTERIOR_RESOLUTION`**
   - reads planetary premise and planetary foundation inputs;
   - writes only `causalRecord`;
   - resolves thermal budget, mantle-convection range, lithosphere/rheology family, lid behavior, and bounded volcanic/rift/hotspot tendencies;
   - uses `causal.interior`.

3. **`CAUSAL_REGIME_HISTORY`**
   - reads premise and interior state;
   - writes only `causalRecord`;
   - creates ordered geological epochs and transitions rather than one timeless tectonic label;
   - uses `causal.regime-history` with epoch identity in the random scope.

4. **`CAUSAL_GEOLOGIC_SPINE`**
   - reads premise, interior, and regime history;
   - writes only `causalRecord`;
   - creates large-scale feature identity and relationships: continental kernels, ocean-basin identities, major rifts, convergence systems, transform systems, plume/hotspot systems, and major event ancestry;
   - uses `causal.geologic-spine`.

5. **`CAUSAL_SHADOW_AUDIT`**
   - reads causal records, legacy world state, diagnostics, and geology-audit references;
   - writes diagnostics only;
   - compares rules, expected morphology tendencies, thresholds, contradictions, and reference coverage;
   - cannot mutate the world or causal records.

## Non-goals

Wave 1 does not:

- write `cell.baseHeight` or any other terrain field;
- replace legacy plate IDs, boundary types, continent fields, crust fields, or feature fields;
- derive climate, rivers, biomes, materials, or colors;
- tune the causal model to imitate known legacy defects;
- mark a causal result correct merely because it resembles the legacy globe;
- enable `causal.active.enabled`;
- create a promotion path hidden inside an implementation PR.

## Core causality rule

The following reads are forbidden for premise, interior, regime-history, and geologic-spine resolution:

```text
cell.baseHeight
cell.editHeightDelta
cell.simHeightDelta
cell.isWater
cell.oceanDepthClass
cell.continentId
cell.continentality
cell.crustThickness
cell.crustAge
cell.crustProvince
world.plates
world.continentSkeletons
world.oceanBasinSkeletons
```

Those fields may be read only by `CAUSAL_SHADOW_AUDIT`, after the causal result is complete and immutable.

## Shadow attachment behavior

Default `LEGACY` generation remains byte-identical and does not attach new shadow state.

An explicit shadow request may either:

1. return a detached `CausalShadowRunV1`, or
2. attach it to a cloned world with:
   - `causal.authorityMode = 'CAUSAL_SHADOW'`;
   - `causal.status = 'SHADOW'`;
   - complete provenance and confidence ledgers.

Attaching shadow state to the canonical generated world is not allowed unless the caller explicitly requested shadow mode. Shadow execution must never occur as a hidden side effect of ordinary generation.

## Implementation sequence

Wave 1 should be implemented through separate, reviewable PRs:

```text
W1-01 typed contracts, validation, research ledger, and process registration
W1-02 planetary premise and interior shadow resolution
W1-03 tectonic regime-history shadow resolution
W1-04 geologic-spine graph and event ancestry
W1-05 shadow diagnostics, controlled archetypes, and reference integration
W1-06 promotion-readiness report only — no CAUSAL_ACTIVE implementation
```

Each PR must be independently revertible and must preserve legacy physical output.

## Definition of done

Wave 1 is complete only when:

- identical seed, inputs, flags, and versions produce byte-identical causal records;
- serialization and reload reproduce the same next decisions and hashes;
- all scientific alternatives have evidence IDs, confidence, and rationale;
- unresolved contradictions remain visible and reduce confidence;
- premise/interior causality tests prove forbidden terrain reads cannot affect results;
- process guards prove Wave 1 writes only `causalRecord` and diagnostics;
- the geology audit reports positive, threshold, negative, exception, and missing-reference evidence separately;
- fixed-seed and threshold matrices show scientifically plausible sensitivity rather than branch collapse;
- normal LEGACY world output remains byte-identical to the merged C04 baseline;
- the known legacy geological failure remains visible rather than being greenwashed;
- `CAUSAL_ACTIVE` remains disabled and unimplemented.
