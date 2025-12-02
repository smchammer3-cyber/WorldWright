<!— JARVIS_CHANGE
Date: 2025-12-02
Purpose: Track current/next blueprint steps and high-level progress.
—>

# WORLDWRIGHT — STATUS

## Current Blueprint Phase

- **Phase:** Generator + Shell alignment  
- **Step:** 5G-4 — Coastline & Landmass Readability (Preview Stage)  
  - Adjust preview-only height mapping and thresholds to make large landmasses feel less like noisy islands.  
  - Suppress tiny isolated land specks and tiny water holes so continents look more continuous.  
  - Keep the underlying world data unchanged (visual-only interpretation).

## Last Completed (Functional) Milestones

- ✅ Vite + React + TypeScript app boots and renders.  
- ✅ World generator implemented with slider-based params (`worldGenerator.ts`).  
- ✅ LocalStorage-based world saving and listing (`worldStorage.ts` + `HomeScreen`).  
- ✅ Simple canvas-based globe + map previews in `GeneratorScreen`.  
- ✅ Project-level docs added: `PLACEHOLDERS.md`, `KNOWN_ISSUES.md`, `ASSUMPTIONS.md`, `WORLDWRIGHT_STATUS.md`.  
- ✅ 5G-1: Minimap rendering routed through `core/planetRenderer.ts` so the flat map uses a shared renderer.  
- ✅ 5G-2: Smoother minimap and globe preview sampling to reduce pixel speckle and improve continuity (preview-only polish).  
- ✅ 5G-3: Shared color palette + softer lighting for the preview globe so visuals are closer to the locked target style (still preview-only).  
- ✅ 5G-4: Preview-only coastline & landmass readability improvements so landmasses look more continuous and less like pure noise.

## Next Planned Steps

- **6A — AppShell Introduction:**  
  - Introduce the shared `AppShell` layout (left tools, right info panel, globe center, minimap bottom-left).  
  - Move current screens into the shell without changing functionality.

- **6B — Mode Mini-Apps:**  
  - Split the app into `GenerateModeApp`, `CreateModeApp`, and `SimModeApp`, each mounted inside the shared shell.  
  - Ensure mode isolation: no cross-import of mode-specific logic; communication only via world snapshots.

- **Create/Sim Roadmap (High-Level):**  
  - Replace `EditorScreen` stub with real CreateModeApp and SimModeApp.  
  - Hook these modes into the WorldBrain + world snapshots.  
  - Prepare data model for UE5 export (sectors, masks, biome masks, cities, etc.).