<!— JARVIS_CHANGE
Date: 2025-12-02
Purpose: Track current/next blueprint steps and high-level progress.
—>

# WORLDWRIGHT — STATUS

## Current Blueprint Phase

- **Phase:** Generator + Shell alignment  
- **Step:** 6A — AppShell + Mode Scaffolding (Partial)  
  - Shared AppShell layout is implemented and used by the generator screen.  
  - Dedicated `src/modes/generate|create|sim` folders exist with mode mini-apps.  
  - `/generate` now routes through the Generate Mode mini-app rather than the legacy GeneratorScreen.

## Last Completed (Functional) Milestones

- **5G-4 — Coastline & Landmass Readability (Preview Stage)**  
  - Adjusted preview-only height mapping and thresholds to make large landmasses feel less like noisy islands.  
  - Suppressed tiny isolated land specks and tiny water holes so continents look more continuous.  
  - Kept the underlying world data unchanged (visual-only interpretation).

- **5G-1 → 5G-3 — Generator + Minimap Pipeline**  
  - Implemented continent-style heightfield generation based on sliders.  
  - Wired a shared flat-map renderer for the minimap.  
  - Added globe preview sampling and lighting pass.

## Next Planned Steps

- **6A (continued) — Full AppShell Adoption + Mode Routing**  
  - Move Home and Editor flows fully into AppShell-backed modes.  
  - Update navigation so world creation flows directly into CreateModeApp / SimModeApp routes.  
  - Retire the legacy `GeneratorScreen` and `EditorScreen` once mode apps are fully functional.

- **6B — Mode Mini-Apps (Feature Pass)**  
  - Flesh out `GenerateModeApp`, `CreateModeApp`, and `SimModeApp` with their full toolsets.  
  - Ensure strict mode isolation: no cross-import of mode-specific logic; communication only via world snapshots in WorldBrain.

- **Create/Sim Roadmap (High-Level):**  
  - Replace `EditorScreen` stub with real CreateModeApp and SimModeApp.  
  - Hook these modes into the WorldBrain + world snapshots.  
  - Prepare data model for UE5 export (sectors, masks, biome masks, cities, etc.).