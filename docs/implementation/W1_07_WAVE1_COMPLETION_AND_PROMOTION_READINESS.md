# W1-07 Wave 1 Completion and Promotion-Readiness Report

## Governing verdict

```text
base branch: WorldWright-new
base commit: 0b97438776423f52b40fde55f1920f38c1a63e4f
physical generator authority: LEGACY
causal authority: CAUSAL_SHADOW only
CAUSAL_ACTIVE: unimplemented and forbidden
ordinary Generate change: none
visible physical-output change: none
scientific status: PARTIAL
Wave 1 milestone implementation: COMPLETE
Wave 1 definition of done: NOT MET
promotion readiness: NOT READY
Phase D entry: DETACHED DIAGNOSTIC ONLY
```

W1-07 changes no scientific algorithm, generator route, world schema, physical field, renderer, Create behavior, Sim behavior, or storage behavior. It records the exact merged evidence and separates three different questions that must not be conflated:

1. Were the bounded Wave 1 implementation milestones merged and software-validated? **Yes.**
2. Has the full Wave 1 scientific definition of done been met? **No.**
3. May physical authority be promoted? **No.**

The machine-readable source of truth is:

```text
docs/implementation/wave1/w1-07-promotion-readiness.json
```

## Exact merged route

| Milestone | PR | Exact validated head | Merge commit |
|---|---:|---|---|
| W1-01 | #133 | `01f7a29a8562b9597231ad5793239748b533528e` | `df3b09efa9eef3d5828f6d870d66bd0adeb843e3` |
| W1-02 readiness | #135 | `cf81ebb785c5a7ad34537df46fc5e372935ed285` | `7febf56742d1ba59b899477cfede575fef440dee` |
| W1-02A | #136 | `19094c3f8cd9f80614749a7fd48af9a7eb9dd3d2` | `a10537eaf17f1bc6464f24e189ce9a43e37166c7` |
| W1-02B research | #137 | `158ea903cd39ce053222dca419659ad8280272ef` | `4dfb74076a6dd55451cecca12be20d0b16dedb33` |
| W1-02B resolver | #138 | `68a0120d83eb3c27b41ba493053ec17cb9f468c0` | `64e77b1d2cc440ebe4bff5d09a019c23f7989c28` |
| W1-03 | #139 | `d7daa8e64e711d4235632fc6807ab1d106fac91b` | `3b4fcf30c35306d75110eb3214c89ab210e496d5` |
| W1-04 | #140 | `5b0f8473b0ec42f8c3969b94a71a801feb752804` | `262af1d1258d4b0059785ec96d35960f14d34b89` |
| W1-05A | #141 | `373171fbddbe2fb5632c772faff68b80952dc50e` | `ff37dc1d54172699c304115a5d5d00c69037c4d2` |
| W1-05B | #142 | `d63b4a6282b81419b454adcf895f691792d458f4` | `ff71a9fea348c95a442f1ccb8f34c60dd243314b` |
| W1-06A | #143 | `45baed4d733e1df5fc4b2348e425350d06bbd4a5` | `43e7cc1bf1ac5e4436bf712dca33e488f9d1a061` |
| W1-06B1 | #144 | `6cf170d355d5234197b7c9a0e0f476855fed5796` | `fcc8c5670a03bfc01a72852732612b8dfc425cba` |
| W1-06B2 | #145 | `a8d36e816da7e4c023fd9ba8e7863a52d5b41864` | `ce68ad38c3533148dc4d1ba4df3732f40f02abc4` |
| W1-06B3 | #146 | `1f5bae7a15c1cce50ccc3c7165278531ca1f9bb8` | `0b97438776423f52b40fde55f1920f38c1a63e4f` |

Every listed implementation PR preserved `LEGACY` as the only physical generator authority. No milestone created an active causal route.

## What Wave 1 now proves

### Deterministic detached causal records

The implemented route provides versioned, immutable, canonically hashed records for:

```text
initial conditions
planetary premise
interior and rheology
tectonic regime history
spherical geologic spine
shadow audit and reference routing
```

Fixed-seed replay, insertion-order resistance, lineage checks, status validation, unit/scale validation, graph validity, storage boundaries, resource budgets, and authority firewalls are covered by the committed suites.

### Aggregate and controlled evidence

```text
W1-06A aggregate corpus: 28 cases / 28 unique seeds
W1-06B1 canonical direct-input axes: 12
W1-06B2 controlled archetype families: 10
W1-06B2 controlled cases: 30
W1-06B3 separated evidence kinds: positive / threshold / negative / exception
```

The ordinary legacy planet remained unchanged throughout the route. The known authority failure remains visible at:

```text
RAW_GENERATOR
```

That continued failure is expected evidence that Wave 1 did not greenwash or silently alter the physical generator.

## Why the Wave 1 scientific definition of done is not met

The Wave 1 brief requires fixed-seed and direct-input threshold matrices to show **reviewed sensitivity**, not merely deterministic construction or branch variation.

W1-06B1 covers all twelve real authority IDs, but it deliberately and correctly records:

```text
reviewed downstream relations: 0
research-required downstream relations: 12
expected relation: UNKNOWN
```

This is scientifically honest, but it means the promotion gate is open research rather than complete evidence.

### Blocking gap 1 — reviewed direct-input relations

The repository still needs source-backed expected downstream relations, allowed alternatives, exceptions, units, limitations, and calibration boundaries for every direct input. Those relations must be written before results are reviewed and must not be invented to force a monotonic pass.

### Blocking gap 2 — complete dependency matrix

The tests do not yet prove, for every direct input, exactly which downstream records may change and which must remain byte-identical across premise, interior, regime history, and spine.

### Blocking gap 3 — natural archetype reachability

W1-06B2 proves the detached history-to-spine chain can represent every frozen archetype under controlled validated upstream states. It does not prove that the complete natural direct-input route reaches every archetype with reviewed frequency, sensitivity, holdouts, and negative cases.

### Blocking gap 4 — scientific reference calibration

W1-06B3 proves that positive, threshold, negative, and bounded-exception evidence are routed and separated correctly. Its committed records are internal diagnostic evidence, not a complete family-specific observational calibration set for morphology or physical thresholds.

## Promotion decision

```text
promotion readiness: NOT READY
bounded physical influence: NOT AUTHORIZED
CAUSAL_ACTIVE: NOT AUTHORIZED
legacy retirement: NOT AUTHORIZED
```

Passing software gates is not equivalent to completing the science. No causal stage may claim active physical authority from this report.

## Phase D decision

Phase D may begin because its approved scope is detached diagnostics and causal projections, not physical authority.

The allowed Phase D boundary is:

```text
mode: detached diagnostic only
namespace: isolated causal projection
physical-field writes: none
terrain ownership: none
land/water ownership: none
ordinary Generate invocation: forbidden
legacy feedback into causal resolution: forbidden
comparison adapters: external and read-only
scientific status: PARTIAL unless evidence supports more
```

The first Phase D PR should define immutable process-field projection contracts and provenance before adding algorithms. It must prove spherical/resolution behavior, interpretability, budgets, and the absence of terrain or physical writes.

## Rollback and compatibility

```text
LEGACY remains default: yes
ordinary-world migration required: no
CAUSAL_ACTIVE exists: no
Wave 1 route independently revertible: yes
legacy retirement permitted: no
```

No saved ordinary world depends on Wave 1 causal physical output because no such output exists.

## Final direction check

1. **New causal ability:** a detached, replayable causal explanation through geologic-spine identity plus auditable evidence routing.
2. **Intentionally absent:** terrain, land/water, physical-field authority, ordinary Generate integration, and `CAUSAL_ACTIVE`.
3. **Movement toward causal terrain:** Phase D can project the spine into interpretable detached process fields without crossing into terrain ownership.
4. **Remaining scientific/computational risk:** reviewed sensitivity, dependency isolation, natural archetype reachability, reference calibration, spatial usefulness, resolution behavior, and projection cost.
5. **Earliest missing cause:** detached process fields and diagnostic projections, not continent masks, smoothing, or final terrain.
