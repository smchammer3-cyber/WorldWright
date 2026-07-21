# W1-05A Geologic Skeleton Test and CI Harness — Implementation Status

## Authorization and branch

The user explicitly authorized adding the new skeleton tests and CI lane after merge of W1-04.

```text
base branch: WorldWright-new
base commit: 262af1d1258d4b0059785ec96d35960f14d34b89
implementation branch: agent/w1-05a-skeleton-ci-harness
harness implementation: authorized
W1-05 geologic-spine resolver: NOT IMPLEMENTED BY THIS PR
causal.geologic-spine stream activation: NOT AUTHORIZED BY THIS PR
merge authorization: NOT GRANTED
physical generator authority: LEGACY
CAUSAL_ACTIVE: forbidden and unimplemented
ordinary Generate integration: forbidden
visible physical output changes: forbidden
```

## Purpose

W1-05A installs the deterministic test and CI structure that the real W1-05 geologic-spine resolver must satisfy.

It does not create a skeleton. It proves that:

- at least six committed fixed seeds are exercised on every PR;
- controlled validated upstream records reach a valid W1-04 regime history;
- the history is replayable, contiguous, and compatible with its current interior state;
- the history stage explicitly permits `CAUSAL_GEOLOGIC_SPINE` downstream;
- `causal.geologic-spine` remains `RESERVED` until the resolver PR activates it;
- a missing skeleton is reported honestly as `ABSENT_RESERVED` rather than silently omitted;
- legacy physical fields remain forbidden from causal records;
- a complete diagnostic artifact pack is uploaded for each case.

## Fixed corpus

The committed corpus contains seven unique seeds:

```text
cold rocky dwarf
earthlike mixed history
hot super-Earth magmatic history
tidally heated rocky history
tidal ice-shell history
rock-ice mixed withheld holdout
volatile-pressure withheld holdout
```

The corpus contains positive, threshold, and withheld cases. Runtime seed selection is forbidden.

## Diagnostic artifacts

Each case writes:

```text
causal-shadow-manifest.json
sanitized-input.json
stage-results.json
premise.json
interior.json
regime-history.json
geologic-spine.json
confidence-ledger.json
contradictions.json
provenance.json
validation-report.json
reference-audit-plan.json
shadow-vs-legacy-comparison.json
performance-report.json
```

`geologic-spine.json` must currently report `ABSENT_RESERVED` with the stream still reserved. When the real W1-05 resolver is implemented, that PR must deliberately change the expected disposition and satisfy graph, event, ancestry, resolution-independence, scientific, and performance gates.

## CI changes

The workflow gains separate blocking jobs for:

```text
Build
Tests
Required diagnostics
Causal skeleton gate
Jarvis snapshot canary
Jarvis full globe review
```

The required diagnostics job explicitly runs:

```text
npm run diagnostics:generate
npm run diagnostics:geology-audit
npm run diagnostics:world-audit-export
```

The causal skeleton gate runs:

```text
npm run ci:causal-skeleton
```

The full-globe capture process now fails the job when capture fails or times out. Human judgment of visual quality remains separate; this change blocks only on successful production of the required review evidence.

## Explicit non-scope

This PR does not:

```text
activate causal.geologic-spine
create spherical nodes, edges, or events
create plates, continents, basins, rifts, transforms, or hotspots
write terrain, land masks, sea level, climate, hydrology, biomes, materials, or rendering
change Generate, Create, Sim, storage, or physical schema
change legacy visual baselines
start W1-06 aggregate scientific auditing
promote any causal authority
```

## Merge boundary

This branch may be opened as a draft PR and audited through CI. Merging requires separate explicit user approval.
