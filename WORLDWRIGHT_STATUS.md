<!—
JARVIS_CHANGE
Date: 2025-12-03
Purpose:
- Reflect project state after completing Step 6A.
- Capture what 6A accomplished.
- Point clearly to Step 6B as the next phase.
—>

# 🌍 WORLDWRIGHT — PROJECT STATUS

## Current Phase

**Step 6A — AppShell Integration + Mode Architecture (COMPLETE)**  

WorldWright has fully moved from a simple “screen-based” structure to a **mode-based mini-app architecture** wrapped in a shared `AppShell`. The generator, create, and sim flows now live inside this unified shell.

The project is stable and ready for **Step 6B — Mode Features (Create & Sim)**.

—

## What Step 6A Achieved

### ✅ 1. Shared AppShell Layout

- All core modes use the same layout:
  - Left: tools / controls
  - Center: main viewport (globe or map)
  - Bottom-left: minimap overlay card
  - Right: info / context panel
- `AppShell` is the single source of truth for layout structure.

### ✅ 2. Modes Directory & Mini-Apps

Modes now live under:

- `src/modes/generate/GenerateModeApp.tsx`
- `src/modes/create/CreateModeApp.tsx`
- `src/modes/sim/SimModeApp.tsx`

Each is a self-contained mini-app mounted into `AppShell`.

### ✅ 3. Generator Migrated to Generate Mode

- The old `GeneratorScreen` has been functionally replaced by `GenerateModeApp`.
- `/generate` routes directly to `GenerateModeApp`.
- Generate Mode includes:
  - The 7 generator sliders (landmass, sea level, plate activity, axis tilt, planet age, climate variance, world style).
  - Globe preview (circular projection).
  - Flat minimap render using the shared renderer.
  - Coastline/readability tweaks (preview-only).
  - Save logic that stores a world and routes into Create Mode.

### ✅ 4. Modes-First Routing

Routing is now centered on modes:

- `/`  
  → `HomeScreen` (world list + “create new world”).
- Clicking “create new world”  
  → `/generate` → `GenerateModeApp`.
- Saving a generated world  
  → `/modes/create/:id` → `CreateModeApp`.
- Opening an existing world from Home  
  → `/modes/create/:id`.

Sim Mode has a route (`/modes/sim/:id`) and a placeholder shell, ready for future work.

### ✅ 5. Create Mode Loads Worlds & Renders Maps

`CreateModeApp` now:

- Reads world ID from the route.
- Loads the corresponding world from storage.
- Uses the shared 2D renderer to display:
  - A main 2D map in the center viewport.
  - A minimap overlay in the familiar bottom-left card.
- Shows basic world metadata:
  - Name
  - Width × height
  - Seed (raw value for now)
- Handles “world not found” with a safe fallback message.

### ✅ 6. Unified Layout for Generate & Create

- Create Mode’s main map is now laid out in the same visual structure as Generate Mode’s globe:
  - Centered viewport
  - Same general proportions and spacing
  - Minimap in the same bottom-left card position
- This ensures modes “feel like” different tools in the same application rather than separate apps.

### ✅ 7. Legacy Screens Retired from Routing

- `HomeScreen` still exists and is used as the landing page.
- `GeneratorScreen` and `EditorScreen` remain in the repo as legacy/backup references.
- Routing no longer uses `GeneratorScreen` or `EditorScreen`.

They can be safely removed once Create/Sim have more features, but they are not active code paths.

—

## Next Major Phase: Step 6B — Mode Features

With the shell and architecture complete, the next step is to give the modes real power.

### Planned Focus for Step 6B

#### Create Mode (Primary)

- Terrain editing tools.
- Biome painting tools.
- Selection / brush systems.
- City markers and footprints.
- Zoning / exclusion masks for props.
- Integration with WorldBrain for persistent world data.

#### Sim Mode (Secondary to start)

- Time controls (play/pause/speed).
- Layered visualizations (climate, population, etc.).
- Basic simulation playback for a saved world.

—

## Status Summary

- ✅ Step 6A is complete (AppShell + modes + basic Create functionality).
- 🟦 The app is stable and modes-first.
- 🔜 Step 6B will focus on **tools and interaction**, not on foundational layout.

This file should be updated again when:

- Create Mode gains its first real editing tools.
- Sim Mode gains its first real simulation layer.
- Legacy screens are removed or archived.