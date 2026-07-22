# W1-06B1 Canonical Direct-Input Thresholds — Implementation Status

## Governing boundary

```text
base branch: WorldWright-new
base commit: 43e7cc1bf1ac5e4436bf712dca33e488f9d1a061
implementation branch: agent/w1-06b1-canonical-direct-input-thresholds
W1-06A: merged through PR #143
physical generator authority: LEGACY
causal authority: CAUSAL_SHADOW only
ordinary Generate integration: forbidden
visible physical output changes: forbidden
CAUSAL_ACTIVE: forbidden and unimplemented
```

## Scope

W1-06B1 is the smallest coherent continuation of the W1-06 threshold work. It adds a committed low/reference/high corpus for every direct input authorized by `CAUSAL_INPUT_AUTHORITY_REGISTRY`:

```text
planet.radius
planet.density
star.luminosity
orbit.distance
climate.declared-albedo
climate.declared-greenhouse
inventory.water
inventory.volatiles
thermal.age
thermal.primordial-heat
thermal.radiogenic-heat
thermal.tidal-heating
```

The new coverage contract uses the actual causal input IDs. It does not rewrite the W1-06A display-axis aliases, because W1-06A artifacts and hashes must remain reproducible.

## New diagnostic ability

The W1-06B1 gate:

```text
constructs all 12 direct-input threshold triplets
holds the root seed and every non-target declaration constant within each triplet
proves only the selected declaration changes
proves low, reference, and high snapshots receive distinct causal input hashes
replays every snapshot byte-identically
validates units and scales against the causal authority registry
records runtime and payload evidence
writes machine-readable per-axis and aggregate artifacts
```

## Scientific status

```text
software gate target: PASS
scientific status target: PARTIAL
```

All downstream threshold relations are intentionally recorded as `RESEARCH_REQUIRED` with `UNKNOWN` direction. This is not missing test metadata; it is an explicit scientific boundary. W1-06B1 proves direct-input construction and isolation, not reviewed premise, interior, regime-history, or geologic-spine sensitivity.

No monotonic relation is invented merely to make the matrix appear complete.

## Explicit non-scope

This PR does not:

- complete the controlled archetype families;
- add positive, negative, threshold, and approved-exception geology-reference integration;
- claim reviewed downstream sensitivity;
- alter premise, interior, regime-history, or geologic-spine algorithms;
- read legacy solved morphology;
- invoke or alter ordinary Generate;
- write terrain, sea level, bathymetry, climate, hydrology, biomes, materials, resources, rendering, Create, Sim, or storage;
- implement or enable `CAUSAL_ACTIVE`;
- begin W1-07 or Phase D.

## Required exact-head validation

```text
npm run build
npm run test:run
npm run diagnostics:generate
npm run diagnostics:geology-audit
npm run diagnostics:world-audit-export
W1-06A 28-case aggregate gate
W1-06B1 12-axis threshold gate
snapshot canary
384x192 full-globe review
legacy physical-output equivalence
```

The PR may merge only when the exact audited head passes every applicable gate and the legacy physical output remains unchanged.

## Next bounded scope

W1-06B2 should add the missing controlled archetype families and downstream sensitivity evidence without converting provisional or research-required relations into reviewed science. W1-06B3 should integrate the four geology-reference kinds through a detached adapter outside the causal resolver package.
