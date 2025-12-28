<!— JARVIS_CHANGE
Date: 2025-12-02
Purpose: High-level dev notes for humans working on WorldWright.
—>

# WorldWright — Dev Notes (High-Level)

- Tech stack:
  - Vite + React + TypeScript
  - LocalStorage-based world persistence (for now)

- Current focus:
  - Stabilize generator + shell under the new Pro Rules.
  - Prepare for Globe/Minimap polish (5G) and mode separation.

- Where things live right now:
  - App entry point: `src/main.tsx`, `src/App.tsx`
  - Screens: `src/screens/*`
  - WorldBrain types: `src/core/world.ts`
  - Generator logic: `src/core/worldGenerator.ts`
  - Storage: `src/core/worldStorage.ts`
  - Styles: `src/styles.css`

- Next big architectural change:
  - Introduce `modes/` folder and AppShell + mini-app structure
    for Generate / Create / Sim.