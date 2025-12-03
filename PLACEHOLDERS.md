<!—
JARVIS_CHANGE
Date: 2025-12-03
Purpose:
- Accurately document all placeholder components and logic still active
- Remove outdated references to GeneratorScreen and EditorScreen
- Clarify which placeholders belong to the new Mode architecture
—>

# 📄 PLACEHOLDERS — ACTIVE TEMPORARY COMPONENTS

This file tracks **temporary components**, **stub logic**, and **incomplete features** that are currently present in the project and awaiting final implementation. These are expected and normal during Step 6A.

WorldWright is transitioning from a *screen-based* architecture to a **mode-based mini-app architecture**. During this transition, some items remain placeholders until their full implementations arrive in Step 6B and Step 7.

—

# 🟦 1. Mode App Placeholders

These mode apps exist, load correctly, and use AppShell — but still contain placeholder UI or incomplete logic.

## **1.1 CreateModeApp.tsx**
**Status:** First-pass implementation  
**Location:** `src/modes/create/CreateModeApp.tsx`

### What is done:
- Loads worlds by ID  
- Renders 2D map + minimap using shared renderer  
- Displays world details (name, size, seed)  
- Uses AppShell with left tools, main view, minimap, and right info panel  

### What is placeholder:
- No painting tools yet  
- No biome editing  
- No sculpting or terrain modification  
- No selection tools  
- No zoning masks or prop placement logic  
- Right panel shows placeholder text  
- Layout still needs final 6A unification pass

Full tool suite comes in **Step 6B**.

—

## **1.2 SimModeApp.tsx**
**Status:** Pure placeholder  
**Location:** `src/modes/sim/SimModeApp.tsx`

### Placeholder behavior:
- Uses AppShell  
- Loads `id` from route  
- Displays only placeholder text  
- No simulation UI  
- No climate/historical layers  
- No time controls  
- No rendering

Simulation tools begin after Create Mode is stable.

—

# 🟦 2. Legacy Screens (NOT routed)

These files exist in the repo but are **no longer used** by routing:

- `src/screens/GeneratorScreen.tsx`  
- `src/screens/EditorScreen.tsx`

### Why they remain:
- Kept temporarily as reference  
- Safe to delete once Create/Sim reach feature parity  
- Not harmful during 6A

**Generator logic has been fully migrated to GenerateModeApp.  
Editor logic will be replaced entirely by Create Mode.**

—

# 🟦 3. UI Placeholders

### 3.1 AppShell Non-Final Styles
- Mode UI consistently uses AppShell  
- Some spacing, width, and positioning values still require final pass  
- Create Mode main viewport not yet aligned to Generate Mode proportions

This will be finalized in **6A-5**.

—

# 🟦 4. Data / System Placeholders

### 4.1 WorldBrain
WorldBrain exists as a conceptual blueprint but does not yet have:
- data binding to Create Mode  
- exposure in UI  
- live editing hooks  
- biome/prop/city interfaces  

WorldBrain integration begins after 6A completion.

### 4.2 Export Systems
UE5 / Houdini export stubs are not implemented yet.

—

# 🟦 Summary

All placeholders listed above are expected for this stage of development.  
None represent errors — they simply mark unfinished surfaces of Step 6A and Step 6B.

This document will be updated again when:

- Create Mode gains tools  
- Sim Mode gains simulation layers  
- Legacy screens are removed 