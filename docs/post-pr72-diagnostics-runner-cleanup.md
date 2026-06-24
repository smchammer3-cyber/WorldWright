# Diagnostics Runner Cleanup

Follow-up after PR #72 and Codex review.

## Why

The diagnostics runner should not use a default Vitest test filename because normal `npm test` would discover it, run the slow multi-seed diagnostics, and write reports unexpectedly.

## Change

The diagnostics command now uses a dedicated config:

```bash
npm run diagnostics:generate
```

which maps to:

```bash
vitest run --config vitest.diagnostics.config.ts --reporter=basic
```

The diagnostics-only Vitest config includes only:

```text
scripts/run-generate-diagnostics.runner.ts
```

This keeps the report runner out of normal `npm test` while preserving the explicit diagnostics command.
