# C03 Process Registry and Write-Authority Enforcement — Implementation Status

## Boundaries

- authority remains `LEGACY`;
- C02 is merged into `WorldWright-new` and is the direct base;
- no physical terrain, climate, water, biome, hydrology, or renderer formula changes;
- no C04/C05 behavior is enabled;
- PR #118 remains untouched;
- implementation remains a separate draft PR until explicit merge approval.

## Implemented contracts

- machine-readable field registry covering every current `Cell` field and major world record family;
- representation, lifecycle, owner, persistence, hashing, and scale metadata;
- versioned process registry for the complete legacy Generate sequence plus Create, Sim, diagnostics, and rendering;
- explicit legacy exceptions for height-derived morphology/material compatibility stages;
- fail-closed mutation guard that audits an isolated candidate and commits only legal writes;
- actionable process, group, and field violations without leaking rejected writes into canonical state;
- renderer and diagnostics declared read-only for canonical state;
- recompute stages prohibited from writing upstream causes;
- terminal cause-sync stages prohibited from preceding later terrain writers;
- canonical process order shared by registry validation tests;
- diagnostic trace completed with second recompute, crust-continent reseed, material relief, and coast-shape checkpoints.

## Verification target

- registry completeness and duplicate-ID checks;
- declared writes pass and commit;
- undeclared writes fail closed and leave canonical state unchanged;
- ledger and diagnostic stage IDs equal the canonical process sequence;
- all production terrain writers are represented;
- explicit-seed legacy physical output remains unchanged;
- build, full tests, diagnostics, snapshot canary, and full-globe review pass.
