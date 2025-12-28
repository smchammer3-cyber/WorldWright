<!—
JARVIS_CHANGE
Date: 2025-12-03
Purpose:
- Document active placeholders now that Step 6A is complete.
- Clarify which parts are intentionally unfinished for Step 6B.
—>

# 📄 WORLDWRIGHT — PLACEHOLDERS

This document lists **deliberate placeholders** and **incomplete implementations** that are expected at the current stage of the project.

Step 6A (AppShell + Modes + basic Create) is complete. The items below are primarily targets for **Step 6B and beyond**.

—

## 1. Mode-Level Placeholders

### 1.1 Create Mode (Tools Placeholder)

**File:** `src/modes/create/CreateModeApp.tsx`  
**Status:** Functional but bare-bones.

What it already does:

- Loads a specific world by ID from storage.
- Renders a main 2D map using the shared renderer.
- Shows a minimap overlay using the same renderer.
- Displays basic metadata (name, size, seed).
- Uses the unified AppShell layout.

What is still placeholder / missing:

- No painting tools (terrain, biome, temperature, etc.).
- No brush/selection system.
- No city marker placement or editing.
- No zoning/exclusion mask editing.
- No live link to a WorldBrain data model exposed in the UI.

These tools are the core of **Step 6B (Create Mode feature passes)**.

—

### 1.2 Sim Mode (Full Placeholder)

**File:** `src/modes/sim/SimModeApp.tsx`  
**Status:** Shell only.

What it does now:

- Accepts a world ID from the route.
- Mounts inside AppShell with the standard layout.
- Displays placeholder text that a simulation UI will live here.

What is missing:

- No climate or environment layers.
- No population/society visualization.
- No time controls or playback.
- No simulation engine integration.

This is intentional. Sim Mode will be fleshed out after Create Mode has core tools.

—

## 2. Legacy Screens

These files exist but are **not used by the router** anymore:

- `src/screens/GeneratorScreen.tsx`
- `src/screens/EditorScreen.tsx`

They serve as:

- Historical reference for how generator/editor were first implemented.
- Backup while modes are still evolving.

They can be safely removed once you are comfortable that GenerateModeApp and CreateModeApp fully replace them.

—

## 3. System-Level Placeholders

### 3.1 WorldBrain (Concept Present, UI Absent)

WorldBrain is specified in the blueprint as the central world data model but is not yet:

- Exposed in Create Mode tools.
- Used to drive detailed UI (biomes, props, cities, etc.).
- Integrated with export logic.

At this stage, worlds are primarily stored and accessed through the simpler world storage system.

—

### 3.2 Export Pipelines

UE5 / engine exports are not implemented yet. Placeholders for this concept exist in the blueprint but not in the current code:

- No heightmap export.
- No biome mask export.
- No prop/city export manifests.

These belong to a later phase, once world editing is more mature.

—

## 4. UI / Visual Placeholders

Some parts of the UI are “good enough for 6A” but intentionally not final:

- Create Mode’s informational text and panel content are simple and descriptive, not the final UX copy.
- Some margins, fonts, and responsive behavior are basic or not fully tuned.
- Sim Mode visuals are purely placeholder.

These will be refined as Create and Sim gain real tools and user flows.

—

## Summary

The items above are **not bugs** — they are **intentional placeholders** marking work reserved for:

- Step 6B (Create Mode features),
- Sim Mode feature passes,
- and later export/integration phases.

This document should be revisited whenever:

- Create Mode gains its first editing tools,
- Sim Mode becomes interactive,
- WorldBrain and export pipelines start appearing in the code.