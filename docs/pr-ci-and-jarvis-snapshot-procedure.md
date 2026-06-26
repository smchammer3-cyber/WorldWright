# PR CI and Jarvis snapshot procedure

This document defines the standing WorldWright procedure for handling pull requests after CI and Jarvis snapshot automation is available.

## Purpose

Every meaningful PR should leave the project in a known state. A merge is not considered complete just because GitHub accepts it. After each PR merge, the project should confirm that CI ran, inspect any failures, and collect Jarvis review artifacts when the snapshot job is available.

This procedure prevents quiet regressions in the world-generation pipeline, especially visual regressions that are not obvious from unit tests alone.

## Required workflow behavior

The repository should have a GitHub Actions workflow that runs on:

- pushes to `WorldWright-new`
- pull requests targeting `WorldWright-new`
- manual `workflow_dispatch` runs

The workflow should include two jobs:

1. **Build and tests**
   - install dependencies
   - run `npm run test:run`
   - run `npm run build`

2. **Jarvis snapshots**
   - install dependencies
   - install Playwright and Chromium
   - run `npm run snapshots:jarvis`
   - upload `artifacts/jarvis-snapshots/` as a GitHub Actions artifact named `jarvis-snapshots`

The snapshot output should remain an artifact. Generated screenshots and HTML review packs should not be committed to git history.

## PR handling procedure

For each PR:

1. **Review compatibility before merge**
   - Confirm the PR targets `WorldWright-new`.
   - Confirm it is not a draft.
   - Confirm GitHub reports it as mergeable.
   - Inspect the changed files and verify the diff matches the PR's stated purpose.
   - Check for PR comments or unresolved review concerns.
   - Check available status checks or workflow runs.

2. **Merge only if compatible**
   - Use the expected head SHA when merging so the merge cannot silently include a newer unreviewed commit.
   - Prefer normal merge commits unless a different repository convention is adopted.

3. **Confirm CI starts after merge**
   - After the merge commit lands on `WorldWright-new`, check whether the GitHub Actions workflow starts.
   - If no workflow starts, record that CI did not run and do not treat the merge as fully verified.

4. **Inspect CI result**
   - If CI passes, record that the PR is verified by build/tests.
   - If CI fails, inspect the failing job, step summaries, and logs before starting another code PR.
   - Prefer fixing the first real failure rather than stacking unrelated PRs on top of a broken base.

5. **Fetch and inspect Jarvis snapshots when available**
   - If the `jarvis-snapshots` artifact exists, download it.
   - Inspect `manifest.json` first to identify seeds, viewport, width, and artifact paths.
   - Review the generated screenshots and `jarvis-review-pack.html` files for visual regressions.
   - Treat visual artifacts as a required signal for terrain, coast, ocean, plate/province authority, world-spine, and rendering changes.

## Jarvis review expectations

When Jarvis reviews a PR after merge, the response should include:

- PR number and title
- merge commit SHA
- whether CI started
- whether build/tests passed
- failing job or log summary if CI failed
- whether Jarvis snapshot artifacts were found
- snapshot observations if artifacts were available
- any recommended next PR, if the result reveals a clear next step

## Failure policy

If CI or snapshots fail after a merge:

- Do not assume the last PR is automatically wrong.
- Identify whether the failure is from tests, TypeScript/build, Playwright setup, app startup, snapshot export, or visual output.
- Fix infrastructure failures separately from world-generation logic failures.
- Avoid broad smoothing or visual patches unless diagnostics point to a specific authority, terrain, color, or rendering cause.

## Current known limitation

Jarvis can inspect existing GitHub Actions runs, logs, and uploaded artifacts, but may not be able to manually dispatch a brand-new workflow run from chat. The workflow should therefore run automatically on pushes and PRs, and it should also support manual dispatch for the repository owner.
