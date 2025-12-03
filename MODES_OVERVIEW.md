<!—
JARVIS_CHANGE
Date: 2025-12-03
Purpose:
- Document purpose and behavior of each Mode
- Clarify separation between screens and modes
—>

# 🧩 WORLDWRIGHT — MODES OVERVIEW

WorldWright operates as three **mini-apps** mounted inside a shared AppShell:

—

# 1. Generate Mode (Primary Entry)

**Route:** `/generate`  
**File:** `src/modes/generate/GenerateModeApp.tsx`

Purpose:
- Create new worlds  
- Adjust generator sliders  
- Preview globe + minimap  
- Save worlds to local storage

Output:
- A world snapshot passed into Create Mode

—

# 2. Create Mode (Core Mode)

**Route:** `/modes/create/:id`  
**File:** `src/modes/create/CreateModeApp.tsx`

Purpose:
- Edit an existing world  
- Paint terrain  
- Sculpt heightmaps  
- Define regions, biomes, cities  
- Select props/zones  
- Preview changes

Status:
- Currently loads world + shows 2D map and minimap  
- Tools added in Step 6B

—

# 3. Sim Mode (Secondary Mode)

**Route:** `/modes/sim/:id`  
**File:** `src/modes/sim/SimModeApp.tsx`

Purpose:
- Simulate climate  
- Simulate civilizations  
- Track terrain evolution  
- Show historical timelines  
- Playback world events

Status:
- Placeholder (AppShell only)

—

# 4. Home Screen

**File:** `src/screens/HomeScreen.tsx`

Purpose:
- List saved worlds  
- Start Generate Mode  
- Open Create Mode for existing worlds

—

# 5. Legacy Screens

Not used in routing:
- GeneratorScreen  
- EditorScreen

These are safe to delete once 6A is complete.