# PR #70 Generate Diagnostics Report Runner

Status: reporting convenience only. This change does not modify terrain generation, renderer behavior, schema, sea level, Generate UI visuals, terrain tuning, or normal pipeline order.

## What it adds

Run this from Codespaces:

```bash
npm run diagnostics:generate
```

The command runs the PR #69 multi-seed diagnostics with default seeds and a focused ablation set:

```text
SKELETON_ELEVATION
QUALITY_PASS
CRUST_PROVINCE_DELTA
CRUST_SKELETON_OBEDIENCE
OCEAN_BATHYMETRY_SMOOTHING
```

It writes:

```text
diagnostics-output/generate-multiseed-latest.md
diagnostics-output/generate-multiseed-latest.json
```

`diagnostics-output/` is gitignored so generated reports do not get committed.

## What to copy back for review

The most useful section is `generate-multiseed-latest.md`. Copy these sections back into chat:

```text
Final ranked suspects
Stage ranking summary
Per-seed suspect table
Ablation summary
Cause-leak summary
```

## Why this exists

PR #69 added the diagnostics engine, but it did not expose a simple command for reading results. This PR gives the diagnostics a mouth: a console summary plus Markdown/JSON files.
