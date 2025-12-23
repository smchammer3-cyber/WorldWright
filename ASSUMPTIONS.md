<!— JARVIS_CHANGE
Date: 2025-12-02
Purpose: Explicitly record design assumptions so they are visible and reviewable.
—>

# WORLDWRIGHT — ASSUMPTIONS LOG

This file records assumptions made during design and implementation. If any of these
are wrong or need changing, we update the code *and* update or strike the assumption.

—

## Current Assumptions

1. **Desktop-first, mobile-safe layout.**  
   - Primary usage is on a desktop or laptop browser.  
   - Mobile support will be added/polished after stable desktop deployment.  
   - Layout patterns must be responsive-friendly (flex/grid, no brittle fixed layouts).

2. **Single unified app with three internal modes.**  
   - Generate, Create, and Sim are implemented as separate mini-apps mounted inside a single AppShell.  
   - Modes never share logic directly; they communicate only via world snapshots and WorldBrain.

3. **World resolution and sectors are fixed per world at generation time.**  
   - Each world has a defined grid resolution (e.g. 256×128, 512×256, etc.).  
   - Sectoring for export is based on this grid and remains consistent for that world’s lifetime.

4. **WorldWright is engine-agnostic but UE-friendly.**  
   - Export formats (heightmaps, masks, JSON metadata) do not hard-code Unreal concepts.  
   - However, export profiles and manifest structure are designed to integrate cleanly with UE5.

5. **Biomes drive materials and props through data, not baked meshes.**  
   - Biome definitions include colors, tags, and spawn rules, not direct object placements.  
   - Target engines (like UE5) are responsible for using those definitions to spawn props.

6. **Cities are data markers, not fixed geometry.**  
   - WorldWright defines where cities are and basic properties.  
   - The target engine defines how they look and can override/remove things freely.

7. **Current ZIP is the canonical baseline.**  
   - This ZIP represents the authoritative starting point under the new ruleset.  
   - All further steps assume this state unless a new canonical ZIP is provided.

—

## To Be Confirmed / Future Assumptions

- Exact grid resolutions we will officially support (for export to UE5).  
- Final height range conventions for sea level and mountains, per export profile.