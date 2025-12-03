# MODES OVERVIEW

WorldWright consists of three main interactive modes and one export mode. All modes share the unified AppShell layout:
- Left: tool panel  
- Center: main viewport  
- Bottom-left: minimap (Globe View only in Create Mode)  
- Top-right: info panel  

===============================================================================
1. GENERATE MODE
===============================================================================
Purpose:
- Create seeded procedural worlds.
- Adjust tectonics, water level, climate bias, and variation.

Key behaviors:
- Seed + parameters = deterministic world.
- Preview updates instantly.
- Accepting creates a new world snapshot.
- Does not overwrite edited worlds.

===============================================================================
2. CREATE MODE (PRIMARY EDITOR)
===============================================================================
Create Mode provides both:
- Globe View (3D, minimap enabled)
- Map View (2D, minimap disabled)

Create Mode follows the core editing philosophy of the blueprint:

-——————————————————————————
A. THE STICKER SYSTEM (THE CORE EDITOR)
-——————————————————————————
Stickers are the primary mechanism for editing world content.
They define:
- Biomes (forest, desert, alpine, wetlands, etc.)
- Cities (with metadata)
- Regions / kingdoms / climate zones
- Points of Interest
- Terrain features (mountain regions, cliffs, symbolic props)
- Any world-defining annotation or classification

Sticker rules:
- Stickers define biome regions.
- Stickers override generator biomes.
- Stickers determine region boundaries.
- Stickers react to height and climate:
  • Mountain-region stickers adapt to underlying height  
  • High-elevation placements behave differently  
  • Cities can warn about slopes/ocean if rules are obeyed  
- Stickers follow world rules unless “Ignore World Rules” toggle is enabled.
- Stickers appear in viewport and minimap (Map View = no minimap).
- Fully undo/redo supported.

Sticker Data Model:
Each sticker is an object containing:
id, type, iconId, location (map coords), worldPos (lat/lon), scale, rotation, metadata.

The Sticker System is the foundation of content editing in WorldWright.

-——————————————————————————
B. TERRAIN BRUSHES (HEIGHT ONLY)
-——————————————————————————
Brushes are purely for sculpting terrain elevation:
- Raise
- Lower
- Smooth (future)
- Roughen (future)

Brush Rules:
- Brushes do NOT assign biomes.
- Brushes do NOT place cities or regions.
- Brushes never override sticker logic.
- Brushes operate only on the heightmap.

-——————————————————————————
C. THE EDITING PIPELINE
-——————————————————————————
1. Sculpt land with brushes (terrain-only).
2. Place stickers to define content and world meaning:
   - biomes
   - regions
   - city markers
   - mountain regions
   - POIs and props
3. Stickers read terrain and world rules to determine behavior.

-——————————————————————————
D. VIEW SPECIFIC RULES
-——————————————————————————
Globe View:
- Minimaps shown
- Raycast placement for stickers
- Spatial context visualization

Map View:
- Full map only
- No minimap (Map View *is* the minimap)
- Precise pixel-level editing

===============================================================================
3. SIM MODE
===============================================================================
Sim Mode runs deterministic simulations on FROZEN snapshots:
- Climate preview
- Erosion
- Population/civilization spread

Rules:
- Sim never modifies the live editing world.
- Sim respects Sticker-defined biomes, regions, and cities.
- Two modes:
  • Preview Sim  
  • Deep Sim (long, resumable)

Results can be saved as new snapshots usable in Create Mode.

===============================================================================
4. EXPORT MODE
===============================================================================
Exports:
- Heightmaps (PNG/EXR)
- Biome masks (sticker-driven)
- Water masks
- City markers
- Region boundaries
- Metadata manifest
- Engine-agnostic JSON package

Exports are:
- Deterministic
- Non-destructive
- Schema-versioned
- Engine-safe naming

END OF MODES OVERVIEW