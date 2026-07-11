# WorldWright Geological Reference Audit

## Purpose

This subsystem provides an independent, geology-conditioned audit for generated planets. It does not generate terrain, alter renderer output, tune parameters, or automatically promote findings into CI failures.

Its first responsibility is to answer, in order:

1. Which geological rules apply to this world or region?
2. Which approved references demonstrate those rules under nearby parameters?
3. Which threshold neighbors show how the result should change?
4. Which known failures and valid exceptions are relevant?
5. Which reference coverage is still missing?

The system deliberately does **not** begin by finding the most visually similar planet. Rules are resolved from the generator's declared geology before any image reference is retrieved.

## Boundary with the generator

```text
WorldWright generator
        |
        | exports a versioned WorldAuditManifest and immutable assets
        v
geologyAudit
        |
        | resolves rules, searches references, and produces an audit plan
        v
metric and visual evaluators (future)
```

The dependency is one-way. The generator may export data to the audit package. The audit package must not write terrain values back into generation.

## Current foundation

The initial implementation includes:

- versioned, serializable TypeScript contracts;
- runtime validation for manifests, rules, references, and registries;
- deterministic rule applicability matching;
- an in-memory registry whose source can later be JSON, SQLite, or object storage;
- parameter-neighbor reference ranking;
- separate positive, threshold, negative, and exception retrieval;
- explicit warnings for missing approved coverage;
- initial non-quantitative rules for collision belts, passive shelves, and authority-mask leakage.

No scientific metric threshold is hard-coded yet. Quantitative ranges must come from the curated research and reference program rather than from the current generator.

## Registry model

A registry snapshot contains two independent collections:

```text
rules[]       Geological obligations and known exceptions
references[]  Labeled evidence bundles that demonstrate one or more rules
```

Each approved reference must include:

- a unique case and family identifier;
- its evidence class and authority;
- exact parameter labels;
- the rules it demonstrates;
- one or more assets;
- geological, structural, and visual approval;
- source, licensing, limitations, and version information.

Candidate references may be indexed during curation, but the default resolver retrieves only approved references.

## Reference classes

- `positive`: valid examples under a coherent scenario;
- `threshold`: related examples showing expected change as a parameter moves;
- `negative`: known generator failures or invalid geological expressions;
- `exception`: unusual but valid examples that resemble a warning pattern for a justified reason.

Keeping these classes separate prevents a visually similar failure from being mistaken for a positive analogue.

## Modularity guarantees

1. **No generator imports.** The audit contracts do not import `WorldBrain` or generator implementation classes.
2. **No feedback loop.** Audit scores cannot alter generated terrain.
3. **Versioned contracts.** Schema, registry, rule, and reference versions are recorded independently.
4. **Rebuildable indexes.** Manifests and assets remain authoritative; SQLite or another search index can be regenerated.
5. **Warnings before gates.** Missing coverage and provisional rules remain report findings until independently calibrated.
6. **Plugin-sized diagnostics.** Future metrics should consume normalized audit assets and return structured findings without deciding overall world quality.

## Next implementation milestones

1. Add a generator adapter that exports a `WorldAuditManifest` plus standardized diagnostic assets without changing normal generation.
2. Curate the first reference family: continental collision belt versus radial blob.
3. Curate passive-margin/shelf examples versus submerged-continent ghosts.
4. Add threshold sweeps for erosion and sea level.
5. Implement metric plugins for elongation, radiality, boundary alignment, connected inundation, and mask leakage.
6. Produce a human-readable audit report linking every finding to rules and evidence assets.
7. Keep all new findings advisory until false-positive behavior is known across fixed and rotating seed sets.
