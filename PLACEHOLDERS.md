<!— JARVIS_CHANGE
Date: 2025-12-02
Purpose: Introduce centralized placeholder ledger per WorldWright Pro Rules.
—>

# PLACEHOLDERS — WorldWright (Authoritative)

This file tracks all **temporary / placeholder** pieces of the project so we never forget
what is meant to be replaced later.

If something is not listed here and not tagged with `PLACEHOLDER` in code, it is treated
as **final** (for V1) and not assumed temporary.

—

## Active Placeholders

- [ ] `src/placeholder.txt`  
  - **Purpose:** Empty marker file to prevent accidental deletion of the `src` directory in some tools.  
  - **Replace/Remove By:** When the project structure is fully stable and no tooling requires it.  
  - **Notes:** Safe to ignore during runtime; no impact on behavior.

- [ ] `src/screens/EditorScreen.tsx`  
  - **Purpose:** Minimal stub for future Create/Sim Mode combined UI.  
  - **Replace/Refine By:** Dedicated CreateModeApp and SimModeApp mounted inside the shared AppShell.  
  - **Notes:** Currently does not edit worlds; only toggles mode/view in the UI.

- [ ] Generator + Globe rendering (2D canvas version inside `src/screens/GeneratorScreen.tsx`)  
  - **Purpose:** First-pass generator preview; serves as early implementation for Step 5F/5G.  
  - **Replace/Refine By:**  
    - 5G series steps (globe visual polish, minimap projection rules, improved lighting).  
    - Future integration with dedicated `planetRenderer` / 3D renderer as defined in the blueprint.  
  - **Notes:** Functionally acceptable for early V1, but visuals and layout will be refined.

—- [ ] Create Mode mini-app (`src/modes/create/CreateModeApp.tsx`)  
  - **Purpose:** Temporary shell for Create Mode UI (painting, editing, detail tools).  
  - **Replace/Refine By:** Fully-featured CreateModeApp that loads a selected world, exposes tools, and writes changes back to WorldBrain.  
  - **Notes:** Uses AppShell layout but does not yet modify world data.

- [ ] Sim Mode mini-app (`src/modes/sim/SimModeApp.tsx`)  
  - **Purpose:** Temporary shell for Sim Mode UI (time controls, layers, history playback).  
  - **Replace/Refine By:** Fully-featured SimModeApp that runs simulations over time using the shared WorldBrain model.  
  - **Notes:** Uses AppShell layout but displays only placeholder text for now.

- [ ] Generator + Globe rendering (2D canvas version inside `src/modes/generate/GenerateModeApp.tsx` + legacy `src/screens/GeneratorScreen.tsx`)  
  - **Purpose:** First-pass generator preview; serves as early implementation for Step 5F/5G.  
  - **Replace/Refine By:**  
    - 5G series steps (globe visual polish, minimap projection rules, improved lighting).  
    - Future integration with dedicated `planetRenderer` / 3D renderer as defined in the blueprint.  
  - **Notes:** Functionally acceptable for early V1, but visuals and layout will be refined.

## Completed / Removed Placeholders

*(None yet — this section will be updated as temporary implementations are fully replaced.)*