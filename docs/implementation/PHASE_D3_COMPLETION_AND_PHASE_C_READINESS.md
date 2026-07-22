# Phase D3 Completion and Phase C Readiness — Status

## Governing boundary

```text
base branch: WorldWright-new
base commit: e3d34f8afddc07c97901e31fe426a1a0156ceea6
implementation branch: agent/d3-phase-d-completion
physical generator authority: LEGACY
causal authority: CAUSAL_SHADOW only
projection mode: DETACHED_DIAGNOSTIC
scientific status: PARTIAL
ordinary Generate change: none
visible physical-output change: none
CAUSAL_ACTIVE: unimplemented and forbidden
```

D3 adds no new morphology equation and no physical field. It closes Phase D’s bounded software evidence by evaluating whether the D1/D2 detached projection is deterministic, interpretable, resolution-independent, bounded, and useful across diverse reviewed regimes without becoming a hidden land mask or renderer trick.

## Merged Phase D route

| Milestone | PR | Validated head | Merge commit |
|---|---:|---|---|
| D1 detached contracts | #148 | `302ee8a1c46715053c2945ba009c9998049e2318` | `b52f85fdea4c0f3b8afb395ec951f81829c556c9` |
| D2 spherical projection | #149 | `89ae3f3be32e656ca28cced8cedcc008e8b606ef` | `e3d34f8afddc07c97901e31fe426a1a0156ceea6` |

D1 defines immutable field and kernel contracts and registers a shadow-only diagnostic process. D2 implements great-circle compact-support evaluation, exact coordinate queries, disposable grid sampling, source-linked hashes, and reviewed epoch-overlap lineage.

## D3 completion corpus

The completion gate exercises every reviewed regime-history and geologic-spine family currently committed for Phase D:

```text
positive/cold-rocky-dwarf-single-lid-v1
positive/earthlike-mixed-evolution-v1
positive/hot-super-earth-magmatic-v1
threshold/tidally-heated-rocky-v1
positive/tidal-ice-shell-history-v1
holdout/rock-ice-mixed-history-v1
holdout/volatile-pressure-history-v1
```

This provides:

```text
positive cases: 4
threshold cases: 1
holdout cases: 2
rocky dwarf coverage: yes
terrestrial mixed-history coverage: yes
hot super-Earth coverage: yes
tidal threshold coverage: yes
ice-shell coverage: yes
mixed rock/ice holdout coverage: yes
volatile-pressure holdout coverage: yes
```

## Required evidence

For every successful case, D3 requires:

```text
reviewed history and spine route executes
projection replay is byte-identical
projection hash binds history and spine hashes
six kernels exist per source node
all values are finite and normalized
exact source-anchor queries produce a matching nonzero family field
matching family queries expose a dominant source-kernel identity
diagnostic confidence is 1 at the exact source anchor
24×12 and 48×24 grids remain disposable evidence products
sampling either resolution does not change projection or exact coordinate queries
projection, queries, grids, payload, and runtime remain within budgets
no WorldBrain, terrain, land/water mask, renderer color, or physical authority appears
```

Grid cell centers are not required to land exactly on a source anchor. Therefore, a diagnostic grid’s `projectionConfidence` maximum is not required to equal `1`; only an exact source-coordinate query carries that requirement.

## Fail-closed evidence

D3 also requires:

- a spine combined with a history whose epoch identities do not overlap is rejected;
- a projection artifact with no kernels is rejected;
- artificial or fantasy premise exceptions remain outside the natural history-to-spine-to-projection route;
- a failed or blocked case cannot be counted as successful field coverage.

## Distribution and interpretability

The gate records, per fixture and per field:

```text
minimum
maximum
mean
nonzero sample count
nonzero sample fraction
```

These summaries are diagnostic evidence only. They do not define scientific calibration ranges, land thresholds, ocean thresholds, final terrain, or visual color classes.

At exact source anchors, each node-family influence must identify a dominant kernel whose `sourceNodeId` matches a validated spine node. This preserves causal interpretability through the projection layer.

## Known limitations

### Radial kernel geometry

D2 uses radial compact-support kernels centered on spine nodes. The fields do not independently encode oriented ridges, volcanic arcs, sutures, transform corridors, elongated rifts, or other line-like geometry.

This limitation is acceptable for detached Phase D diagnostics but blocks physical promotion. Phase C must not reinterpret radial influence as a final continent, ocean, shelf, or terrain mask.

### Preservation weights

The preservation weights remain published diagnostic visibility assumptions with `physicallyCalibrated: false`. They cannot become material, erosion, exposure, or terrain equations without new reviewed science.

### Direct-input sensitivity

Wave 1’s twelve direct-input downstream relations remain research-required. D3 proves downstream projection behavior for reviewed controlled upstream records; it does not complete direct-input scientific sensitivity.

### No structural-role authority

Phase D does not classify continent, ocean basin, shelf, transitional crust, or uncertain regions. That interpretation belongs to Phase C and must begin detached.

## Phase D verdict

```text
Phase D bounded software implementation: complete after exact-head gate pass
Phase D scientific status: PARTIAL
physical promotion: blocked
processFieldAuthority: not written
ordinary Generate: unchanged
legacy retirement: forbidden
```

## Phase C entry boundary

Phase C may begin only as detached structural interpretation:

```text
first scope: C1 immutable structural-role contracts
allowed reads: validated premise, spine, and detached projection
writes: diagnostics only
structuralRoleAuthority: forbidden
terrain and land/water authority: forbidden
legacy morphology input: forbidden
ordinary Generate invocation: forbidden
CAUSAL_ACTIVE: forbidden
```

C1 must represent ambiguity explicitly. It may produce candidate structural roles such as continental core, continental margin, ocean basin, transitional crust, or unresolved, but it may not convert those roles into final land, water, sea level, bathymetry, or terrain.

## Artifacts

```text
docs/implementation/phase-d/d3-phase-d-completion-readiness.json
artifacts/d3-phase-d-completion/d3-completion-report.json
artifacts/d3-phase-d-completion/cases/*.json
artifacts/d3-phase-d-completion/grids/*.json
```

## Next bounded scope

After the exact D3 head passes every inherited and D3-specific gate, begin C1 detached structural-role contracts, provenance, ambiguity representation, resource limits, and authority registration. Do not bundle a structural resolver or physical output into the C1 contract PR.
