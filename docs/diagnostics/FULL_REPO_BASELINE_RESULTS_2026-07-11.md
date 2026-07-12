# WorldWright Full Repository Baseline — Verified Results

## Identity

- **Base branch:** `WorldWright-new`
- **Base commit:** `1257ccc9746b35f32230e0235aeb88fe16113194`
- **Diagnostic branch commit tested:** `c5d6d1302d66cdb42422217b71d14ce2bfa6e8c5`
- **Workflow run:** `29173550890` / run 338
- **Date:** July 11–12, 2026
- **Application-code difference from base:** none; the branch contained one diagnostic Markdown file when the run started.

## 1. Automated baseline result

All configured jobs completed successfully:

```text
Tests: success
Production build: success
Jarvis snapshot canary: success
Jarvis full-globe review generation: success
```

This verifies that the merged research commit did not break the existing application toolchain.

It does **not** establish that current generated planets are visually or causally acceptable.

## 2. Test result

```text
Test files: 39 passed
Tests: 148 passed
Wall duration: 54.50 s
Vitest: 4.1.9
```

### Important diagnostic output inside the successful test run

The repository’s own Generate diagnostic reported:

```text
Geologic authority gate: pass false
First failed authority layer: RAW_GENERATOR
```

Reported top suspects:

```text
SKELETON_ELEVATION
ISOSTATIC_TERRAIN_RESPONSE
FINAL_CRUST_RESEED
QUALITY_PASS
```

Reported strongest plate-imprint increase:

```text
SKELETON_ELEVATION
```

Reported strongest province-imprint increases:

```text
ISOSTATIC_TERRAIN_RESPONSE
FINAL_CRUST_RESEED
CRUST_PROVINCE_DELTA
```

### Interpretation

The test suite is functioning correctly: it can pass as a software suite while still recording that the current generator fails the stricter geological-authority assessment.

That is not contradictory. It means:

- application invariants and expected legacy behavior are stable;
- the legacy geological architecture is known to be inadequate;
- the diagnostics are successfully refusing to greenwash that inadequacy.

### Test warning requiring follow-up

One passing `WorldSession` test emitted:

```text
ReferenceError: indexedDB is not defined
```

The application catches the storage lookup failure and continues, so the test passes. This should be cleaned up in or before C01 by injecting a storage test double or installing the intended IndexedDB test environment rather than relying on a caught environment error.

## 3. Build result

```text
TypeScript check: success
Vite production build: success
Modules transformed: 93
Build time: 2.66 s
Main JavaScript bundle: 891.90 kB minified
Main JavaScript bundle: 247.92 kB gzip
```

### Build warning

Vite reported the main JavaScript chunk exceeds 500 kB after minification.

This is not a C01 blocker, but it is a real application-delivery issue. Future work should consider route/module splitting and lazy diagnostic or Three.js-heavy tooling rather than increasing the monolithic bundle indefinitely.

## 4. Snapshot execution result

The full-globe baseline used:

```text
Seed: 1040037
World grid: 384 × 192
Globe captures: 384 × 384
Viewport: 1800 × 1200
Total snapshot time: approximately 11.82 s
Snapshot failures: none
```

The artifact contains:

- Generate-page screenshot;
- front globe view;
- +120° globe view;
- -120° globe view;
- snapshot state and timings;
- browser-console capture.

## 5. Browser-console baseline

No application exception or page error was captured.

Observed warnings:

- two React Router v7 future-flag warnings;
- repeated WebGL `ReadPixels` GPU-stall performance warnings during screenshot capture.

The router warnings are routine upgrade debt.

The WebGL warnings are expected from synchronous screenshot readback, but they confirm that snapshot/export work should remain diagnostic and should not be placed in a high-frequency interactive render loop.

## 6. Visual baseline review

### What works

- the application opens and drives the Generate controls;
- the final globe renders successfully;
- the globe rotates to all three requested views;
- no obvious longitude seam is visible in the three views;
- the spherical presentation itself is stable;
- land and water classification is legible;
- the artifact is consistent and reproducible enough to serve as a baseline.

### What remains visibly poor

The current seed is not visually acceptable as a convincing planet.

Observed problems:

1. **Very weak geological relief**
   - Mountains, plateaus, trenches, ridges, drainage, volcanic forms, and climate-driven surface structure are not meaningfully visible in the final globe.
   - The world reads primarily as a two-color land/water mask.

2. **Large empty ocean hemisphere**
   - One of the three views is almost entirely uniform ocean with only small edge fragments of land.
   - Large ocean basins are valid, but here there is too little visible bathymetric or tectonic structure to make the hemisphere feel geologically authored.

3. **Blocky and pixel-stepped coastlines**
   - Coastlines strongly reveal the underlying 384×192 cell grid.
   - Many islands and peninsulas have rectangular, staircase, or cut-paper silhouettes.

4. **Flat and uniform continents**
   - The largest landmass has little internal material, elevation, biome, river, or tectonic differentiation.
   - It appears as a broad flat beige province rather than a continent with geological history.

5. **Fragmentary island shapes**
   - Several islands appear as short angular strips or isolated rectangular fragments without an obvious arc, hotspot, rift, shelf, or erosional relationship.

6. **Final rendering conceals rather than communicates geology**
   - Smooth ocean shading and muted land color make the globe visually clean, but they do not expose the physical systems the current code claims to calculate.
   - This confirms why final-color success cannot substitute for causal-stage review.

### Visual conclusion

The visual artifact supports the research diagnosis:

> the present renderer is functioning, but it is displaying a terrain-first classification result rather than a richly causal physical planet.

No new terrain cleanup should be added to repair this baseline before the causal foundation exists.

## 7. Baseline verdict

```text
Technical baseline: VERIFIED GREEN
Save/session/diagnostic foundations: WORTH PRESERVING
Current geologic authority: VERIFIED FAILING BY PROJECT DIAGNOSTIC
Current visual planet quality: NOT ACCEPTABLE AS FINAL TARGET
C01 readiness: YES, AFTER SCOPE AND MIGRATION CONTRACT REVIEW
Immediate terrain patching: NO
```

## 8. Pre-C01 blockers and required decisions

### Must resolve in the C01 implementation brief

1. canonical world schema version and migration order;
2. accepted legacy schema versions;
3. behavior for unknown future schemas;
4. malformed-world quarantine versus repair;
5. separation of IndexedDB database version from WorldBrain schema version;
6. storage representation of `LEGACY`, `CAUSAL_SHADOW`, and `CAUSAL_ACTIVE`;
7. migration of canonical world, undo snapshots, and Sim branch records;
8. safe optional causal defaults;
9. exact no-visible-output-change test;
10. storage test environment so `indexedDB` failures are not merely caught warnings.

### Not a C01 blocker, but record now

- main bundle is 891.90 kB minified;
- simulation and several secondary paths use direct `Math.random()`;
- visual capture uses costly GPU readback;
- tests are not included in the normal TypeScript project typecheck;
- no dedicated lint, coverage, security-audit, or repeatable performance script exists.

## 9. Recommended next action

Do not begin terrain work.

Prepare one exact, file-by-file C01 implementation brief containing:

```text
schema types
migration entry point
version constants
storage/session integration
legacy adapters
fixtures and tests
rollback behavior
explicitly untouched generator files
```

Then open C01 as a draft implementation PR only after that brief is reviewed.

## 10. Current gate

```text
Full source diagnostic: COMPLETE
Exact current baseline CI: COMPLETE — ALL JOBS PASSED
Visual artifact review: COMPLETE — CURRENT PLANET STILL POOR
Diagnostic PR #124: OPEN AND DRAFT
C01 implementation brief: NEXT
C01 code: NOT STARTED
PR #118: UNCHANGED
Legacy generator default: UNCHANGED
```
