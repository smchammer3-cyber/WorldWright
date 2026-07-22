# Phase C3 Completion and Phase M Readiness — Status

## Governing boundary

```text
base branch: WorldWright-new
base commit: 6e5543511e2bcb7de9c32b57ec90870a12a7b0f4
implementation branch: agent/c3-phase-c-completion-readiness
physical generator authority: LEGACY
causal authority: CAUSAL_SHADOW only
interpretation mode: DETACHED_DIAGNOSTIC
scientific status: PARTIAL
ordinary Generate change: none
visible physical-output change: none
CAUSAL_ACTIVE: unimplemented and forbidden
```

C3 adds no new role equation, process field, material model, terrain term, or physical authority. It closes the bounded Phase C software evidence by proving that the merged C1, C2A, and C2B route remains deterministic, source-traceable, ambiguity-preserving, holdout-safe, physically isolated, and usable as an input to a later detached structure/material phase.

## Merged Phase C route

| Milestone | PR | Validated head | Merge commit |
|---|---:|---|---|
| C1 detached structural-role contracts | #151 | `082bc00583b979aa3b3c66e94acc4deb00b3c8fb` | `3060054b7e862a8a5dc898db83a4d5145868d3ff` |
| C2A structural-role research package | #153 | `cc5227c03658d9e9d50bd303be1c0821a7078cdf` | `e4e14ce0914c489964afe3a4ecea14097c4e07b5` |
| C2B detached structural-role resolver | #155 | `968a22026df1727e8d672d504f16e60839dd5ed1` | `6e5543511e2bcb7de9c32b57ec90870a12a7b0f4` |

C1 defines immutable structural candidates and explicit ambiguity without final land or water. C2A freezes the reviewed rules, provisional calibration boundaries, negatives, approved exception, and withheld holdouts. C2B evaluates supplied spherical evidence regions while preserving the authority firewall.

## Why the C2B fix was not greencoding

The original C2B test searched serialized text for the word `bathymetry`. That incorrectly rejected truthful metadata such as `bathymetryAuthority: false` and limitations explaining that bathymetry authority was absent.

The corrected gate now checks two distinct things:

```text
all authority booleans remain exactly false
actual physical-output object keys are absent recursively
```

That stronger test exposed a real resolver error: `positive/continental-interior-v1` admitted a provisional `CONTINENTAL_SHELF` candidate from overlapping field values even though only continental-kernel source provenance existed. The fixture was not weakened. C2B was narrowed so shelf and slope candidates require both continental-kernel and ocean-basin source provenance and no active tectonic influence. The unchanged sixteen-case corpus then passed.

## Fixed structural corpus

C3 reruns the complete C2A/C2B corpus rather than assuming the earlier workflow result:

```text
positive: 4
threshold: 7
negative: 2
approved exception: 1
withheld holdout: 2
total: 16
```

The gate preserves every committed fixture expectation:

```text
required candidates remain required
roles outside each fixture's allowed set remain forbidden
forbidden leading roles remain forbidden
threshold cases never become leading
negative and exception cases remain unresolved
required ghost risks and suppression recommendations remain present
holdouts remain withheld from runtime calibration
```

Fixture expectations are evidence contracts. C3 does not modify them to match implementation output.

## Live end-to-end completion corpus

C3 also exercises seven reviewed upstream worlds through the actual detached route:

```text
planetary premise
→ tectonic regime history
→ geologic spine
→ process-field projection
→ continent/ocean structural interpretation
```

The live fixtures are:

```text
positive/cold-rocky-dwarf-single-lid-v1
positive/earthlike-mixed-evolution-v1
positive/hot-super-earth-magmatic-v1
threshold/tidally-heated-rocky-v1
positive/tidal-ice-shell-history-v1
holdout/rock-ice-mixed-history-v1
holdout/volatile-pressure-history-v1
```

This provides four positive routes, one threshold route, and two upstream holdouts. The structural research fixture set is not inserted into the runtime resolver context, so neither structural holdout can alter calibration.

## Required live-route evidence

For every successful live route, C3 requires:

```text
reviewed history and spine route executes
projection replay is byte-identical
interpretation replay is byte-identical
premise, spine, and projection source hashes remain exact
reversing caller region order does not change the canonical interpretation
sampling disposable diagnostic grids does not change projection or interpretation
all candidate field IDs belong to the registered Phase D field set
all candidate source-node IDs belong to the validated spine
ambiguous and unresolved regions do not carry a hidden leading role
oriented and material-context roles never lead
serialized payload and runtime remain within budgets
semantic authority booleans remain false
physical-output object keys remain absent recursively
```

The live corpus does not require a preferred role frequency. A scientifically honest unresolved or ambiguous result is acceptable when the current radial evidence cannot justify more.

## Query-resolution independence

C3 does not claim that Phase C owns a final global structural partition. C2B interprets caller-supplied spherical regions.

The completion gate proves the narrower property that exists today:

- exact coordinate interpretation is deterministic;
- region input order cannot change the canonical result;
- disposable low- and higher-resolution diagnostic grids cannot feed back into projection or interpretation;
- the same source-linked regions replay identically.

This is query-resolution independence, not a claim that a final physical region mesh, coastline, or continent partition exists.

## Role traceability and ambiguity

Every structural candidate carries:

```text
registered process-field IDs
validated source-node IDs where the rule uses source families
reviewed generic-claim evidence IDs
rule and signal rationale IDs
normalized support range
```

A `SINGLE_LEADING_CANDIDATE` must name one of its candidates and may currently lead only when the C2A rule is radial-safe, non-research-required, unambiguous, and ghost-free. In practice, only controlled `CONTINENTAL_INTERIOR` or `DEEP_OCEAN_BASIN` candidates may lead.

The following remain unable to lead in Phase C:

```text
CONTINENTAL_MARGIN
CONTINENTAL_SHELF
CONTINENTAL_SLOPE
OCEANIC_RIDGE_SYSTEM
VOLCANIC_ARC_SYSTEM
DROWNED_CONTINENTAL_FRAGMENT
TRANSITIONAL_CRUST
STRUCTURALLY_UNRESOLVED
```

## Fail-closed evidence

C3 requires:

- artificial or fictional solid-shell premises resolve to `STRUCTURALLY_UNRESOLVED`;
- mismatched geologic-spine lineage is rejected;
- empty region requests are rejected;
- an unresolved region includes explicit unresolved reasons;
- no blocked or artificial route is counted as successful natural structural evidence.

## Physical and visible-output firewall

C3 verifies explicit false authority at the interpretation and role-definition levels:

```text
structuralRoleAuthority: false
finalLandAuthority: false
finalWaterAuthority: false
bathymetryAuthority: false
terrainAuthority: false
```

It separately scans object keys recursively and rejects physical payloads such as:

```text
baseHeight
landMask
waterMask
seaLevel
bathymetryGrid
bathymetryDepth
rendererColor
WorldBrain
```

Text that accurately describes a forbidden domain is not confused with a physical write. A real physical payload key still fails.

## Known limitations

### Provisional normalized calibration

C2A signal boundaries are controlled software calibration. They are not universal geophysical constants, observational probabilities, crustal thicknesses, or final role frequencies.

### Radial geometry

Phase D fields remain radial compact-support influence fields. They do not independently reconstruct oriented margins, ridge axes, volcanic arcs, trenches, sutures, transform corridors, polarity, segmentation, or spreading direction.

This blocks oriented structural-role authority and all physical promotion.

### Shelf, slope, and drowned-fragment context

Shelf and slope remain `RESEARCH_REQUIRED`. Their candidacy requires mixed continental-kernel and ocean-basin source provenance and no active tectonic influence, but even then they cannot lead without later material, sedimentary, sea-level, bathymetric, and surface-gradient evidence.

Drowned continental affinity remains an alternative until later material, buoyancy, exposure, and surface context exists.

### No global region partitioner

Phase C accepts explicit spherical evidence regions. It does not yet create a final global region mesh, continent polygon, coastline, land/water mask, or physical structural geometry.

### No observational role-frequency calibration

C3 proves software conformance and bounded source-linked usefulness. It does not establish generated-world structural-role frequencies or global observational accuracy.

## Phase C verdict

```text
Phase C bounded software implementation: complete after exact-head gate pass
Phase C scientific status: PARTIAL
structuralRoleAuthority: not written
physical promotion: blocked
ordinary Generate: unchanged
legacy retirement: forbidden
```

Phase C now provides an honest detached answer to: “Given these reviewed sources, process fields, and explicit spherical regions, what structural candidates remain plausible?” It does not answer land, water, height, material, or final geometry.

## Phase M entry boundary

Phase M may begin only with M1 detached structure/material contracts and research:

```text
first scope: immutable StructureMaterialStateV1 candidate contracts
allowed reads: validated premise/interior constraints, history, spine, projection, and detached structural interpretation
writes: diagnostics only
structureMaterialCause: forbidden
structuralRoleAuthority: forbidden
terrain and land/water authority: forbidden
legacy morphology input: forbidden
ordinary Generate invocation: forbidden
CAUSAL_ACTIVE: forbidden
```

M1 must represent alternative crust/material provinces, buoyancy or thickness tendencies, resistance, structural grain, and terrain-term permissions without creating physical material authority or terrain. It must clearly separate deep geological material from later exposed or weathered surface material.

## Direction check

1. **New causal ability:** deterministic, source-traceable structural candidates can now be produced from reviewed upstream causal records across fixed and live evidence routes.
2. **Intentionally absent:** final region geometry, material state, land, water, sea level, bathymetry, height, terrain, rendering, and active authority.
3. **Movement toward causal terrain:** Phase M can consume explicit structural alternatives rather than infer material from legacy height or color.
4. **Remaining failure modes:** provisional calibration, radial geometry, missing surface/material context, no global partitioner, and no observational role-frequency validation.
5. **Earliest missing cause:** detached deep structure/material genesis contracts and research—not smoothing, terrain birth, color, or final surface output.

## Artifacts

```text
docs/implementation/phase-c/c3-phase-c-completion-readiness.json
artifacts/c3-phase-c-completion/c3-completion-report.json
artifacts/c3-phase-c-completion/cases/*.json
```

## Next bounded scope

After the exact C3 head passes every inherited gate, the unchanged fixed corpus, the live end-to-end completion gate, full tests, diagnostics, snapshot canary, and full-globe review, begin M1 detached structure/material contracts and source-backed research. Do not bundle a material resolver, `structureMaterialCause`, terrain permissions with physical effect, or ordinary Generate wiring into C3.
