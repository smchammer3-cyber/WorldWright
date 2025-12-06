# ============================================================
# WORLDWRIGHT SPINE v1.0
# The unbreakable internal rules that define how the system works.
# ============================================================

============================================================
1) WORLD BRAIN — THE CANONICAL DATA MODEL
============================================================

WorldBrain is a single structured object representing a world.
Every system reads from it. Every edit writes into it.
It is the CENTER of WorldWright.

Resolution:
- 1024 x 512 grid
- Equirectangular projection
- Coordinates: x = 0..1023, y = 0..511

Core Layers (must ALWAYS exist):
- baseHeight          (float per cell)
- editHeightDelta     (float — Create Mode edits)
- simHeightDelta      (float — Sim Mode deltas)

Biome Layers:
- baseBiomeId
- editBiomeId

Political Layers:
- countryId
- cultureId

Cities:
- Stored as list:
    city = { id, name, x, y, countryId, cultureId, populationTag }

Rivers:
- Stored as list of polylines:
    river = { id, points[], width, depth }

Stickers:
- Stored as list of polygons:
    sticker = { id, effectType, vertices[], falloff, metadata }

Metadata:
- worldName
- version
- timestamps
- export settings

Rules:
- WorldBrain MUST always be serializable (JSON or binary).
- No mode may mutate any layer that does not belong to it.
- All tools and simulations interact ONLY through WorldBrain APIs.


============================================================
2) MODE & APP SHELL — HOW THE APP IS STRUCTURED
============================================================

Four primary surfaces:
1. Home Screen
2. Generator Screen
3. Create Mode
4. Sim Mode

All modes mount inside:
- AppShell (shared UI layout)

AppShell contains:
- Top bar (back, world name, mode toggle, view toggle, save status)
- Left tool sidebar (Create Mode)
- Canvas (Globe or Map)
- Minimap in Create Mode + Globe View only

Rules:
- Create Mode and Sim Mode NEVER run at the same time.
- Switching modes swaps the entire app state, not just UI elements.
- The minimap must always appear bottom-left in Create Mode + Globe View.
- Map View never has a minimap.


============================================================
3) STORAGE & SERIALIZATION — WHERE WORLDS LIVE
============================================================

Every world is stored as:
- world.json                (main WorldBrain object)
- cities.json               (optional breakout)
- rivers.json               (optional breakout)
- stickers.json             (optional breakout)
- branch folders for Sim

Rules:
- Autosave writes to temp file first, then commits.
- Save format must NEVER break between versions unless explicitly migrated.
- Home Screen loads worlds by reading metadata only (fast).


============================================================
4) CREATE MODE — EDITING LAYERS
============================================================

Create Mode edits ONLY:
- editHeightDelta
- editBiomeId
- countryId
- cultureId
- city metadata
- stickers

Terrain editing:
- Brush system applies continuous deltas to editHeightDelta.

Sticker system (Polygon-based):
- Stickers are polygons with draggable vertices.
- Shapes (circle, ellipse, rectangle) are only templates.
- Stickers may apply biome, culture, resource, or terrain effects.

Country system:
- Countries are polygons.
- Border editing moves vertices.

Culture system:
- Cultures do NOT auto-grow in Create Mode.
- Painting may use brush or polygon stickers.

River system:
- Rivers auto-recalc in Generator.
- In Create Mode: prompt user before recalculating due to terrain changes.

Rules:
- All edits must support Undo/Redo.
- All edits must preserve serialization integrity.
- No edit may modify simHeightDelta.


============================================================
5) SIM MODE — NON-DESTRUCTIVE TIME SYSTEM
============================================================

Sim Mode runs in a branch, not in canon.

Branches store:
- Base world snapshot
- simHeightDelta
- accepted/rejected events
- final snapshot if promoted

Decision Inbox:
- Every major change (war, collapse, flooding, cultural split, city destruction, river shift)
  MUST require user acceptance.

Sim Mode edits only:
- simHeightDelta
- sim-layer political/culture changes
- sim-layer city changes

Rules:
- Sim Mode NEVER writes to Create Mode layers unless the user accepts.
- Promoting a branch creates a NEW canonical world, not overwriting the old.


============================================================
6) EXPORT SYSTEM — OUTPUT CONTRACT
============================================================

Exports supported:
- Heightmap (PNG or RAW)
- Biome map (PNG or ID grid)
- Country map (PNG or ID grid)
- Culture map (PNG or ID grid)
- City list (JSON)
- River splines (JSON)
- UE5 Profile (heightmap.raw, biome masks, country masks, culture masks, river splines, metadata)

Rules:
- All exports read ONLY from WorldBrain.
- Export manifest must include version, coordinate rules, resolutions.
- UE5 export must obey engine-safe file naming.


============================================================
7) EXTENSION POINTS — WHERE FUTURE FEATURES PLUG IN
============================================================

Allowed extension areas:
- New sticker effect types
- New biome rules
- Additional culture metadata
- New export profiles
- Future rivers/climate simulation upgrades
- Roads, resources, population layers

Forbidden structural changes:
- Changing WorldBrain coordinate system
- Replacing core layers
- Replacing mode separation model
- Changing save format shape without migration


============================================================
8) CORE SURGERY RULES — THE UNBREAKABLE SAFETY SYSTEM
============================================================

Core files that require extreme caution:
- world.ts / worldBrain
- worldGenerator.ts
- worldRenderer.ts
- worldStorage.ts
- mode-shell (AppShell)
- save/load logic
- simulation branch logic

Rules:
1. Never change more than ONE core concept per surgery.
2. Every surgery requires a clean commit point.
3. Every surgery must be additive-first (avoid destructive changes).
4. Schema changes require synchronized updates across:
   - Generator
   - Renderer
   - Storage
   - Editor tools
5. No silent schema changes. EVER.
6. Always snapshot-before-surgery.


============================================================
9) DIAGNOSTIC & DEBUGGING CONTRACT
============================================================

Standard diagnostic:
- Check imports and wiring
- Check mode switching
- Validate world loading/saving
- Confirm UI layout matches blueprint
- Check sticker and brush functionality

FULL DUMP DIAGNOSTIC (special rule):
- Dump every file from ZIP for full, raw visibility
- Ignore preview UI truncation
- Cross-reference:
    - Blueprint V1.2
    - SPINE v1.0
    - WORLDWRIGHT_STATUS.md
    - All src code files
- Verify:
    - Mode shell is correct
    - WorldBrain schema alignment
    - Rendering pipeline
    - Tool functionality
    - No regressions
    - Spine contract is obeyed
- Flag ANY mismatch with visual/UX expectations


============================================================
10) VISUAL & UX CONTRACT (MUST ALWAYS HOLD TRUE)
============================================================

The final app must present:
- Smooth cohesive continents (no island noise unless intentional)
- Gradual ocean depth shading
- Correct biome coloration
- Natural lighting
- Clean UI placement:
  - Left toolbar
  - Top bar
  - Bottom-left minimap (Globe View only)
- Stickers displayed with outlines + semi-transparent fill
- Polygon handles for editing

Rules:
- If code is structurally correct BUT visuals violate the blueprint → it is considered broken.
- Renderer must never mutate world data.


============================================================
11) WHAT THE SPINE GUARANTEES
============================================================

When this spine is followed:
- The foundation NEVER changes unexpectedly.
- Features plug in instead of ripping up prior work.
- We can add:
    - Countries
    - Cultures
    - Cities
    - Stickers
    - Rivers
    - Sim systems
  without destabilizing the base.

This is the source of stability for the entire project.