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
- Seed and parameters determine the world deterministically.
- Preview updates as sliders change.
- Accepting creates a new world snapshot.
- Generate Mode does not overwrite edited worlds.

===============================================================================
2. CREATE MODE (PRIMARY EDITOR)
===============================================================================
Create Mode provides both:
- Globe View (3D, minimap enabled).
- Map View (2D, minimap disabled).

Create Mode follows the core editing philosophy of the blueprint:

-——————————————————————————
A. STICKER SYSTEM — CORE CONTENT EDITOR
-——————————————————————————
Stickers are the primary mechanism for editing world content.

Stickers define:
- Biomes (forest, desert, alpine, wetlands, etc.).
- Cities (with metadata).
- Regions and kingdoms.
- Climate zones and special regions.
- Points of interest (POIs).
- Terrain features as classifications (mountain regions, cliffs, etc.).
- Narrative and gameplay markers.

Sticker rules:
- Stickers define biome regions (not paint brushes).
- Stickers override generator biomes where applied.
- Stickers determine regions for Sim and Export.
- Stickers react to the underlying world:
  - Height (e.g., mountain regions on high terrain).
  - Climate context, where applicable.
  - Suitability for cities (warnings for extreme slopes or ocean).
- Stickers follow world rules by default.
- An “Ignore World Rules” toggle allows placing stickers anywhere.
- Stickers appear in the viewport and, when applicable, on minimaps.
- All sticker actions fully support undo and redo.

Stickers are stored as structured data (id, type, icon, position, scale, rotation, metadata) in the world model.

-——————————————————————————
B. TERRAIN BRUSHES — HEIGHT-ONLY TOOLS
-——————————————————————————
Brushes are purely for sculpting terrain elevation.

Brush behavior:
- Raise terrain.
- Lower terrain.
- Additional operations (smooth, roughen) may be added later.

Brush rules:
- Brushes only modify the terrain heightmap.
- Brushes do NOT assign or change biomes.
- Brushes do NOT place or modify cities, regions, or props.
- Brushes never override sticker logic.
- All brush strokes support undo and redo.

Current implementation:
- 6B-2 provides a basic terrain brush with:
  - Raise / Lower modes.
  - Adjustable size.
  - Adjustable strength.
- This brush runs within the AppShell, acting on the 2D map canvas.

-——————————————————————————
C. EDITING PIPELINE IN CREATE MODE
-——————————————————————————
The intended workflow is:

1. Shape terrain using brushes (height-only).
2. Use stickers to define:
   - Biomes.
   - Cities.
   - Regions and kingdoms.
   - Mountain regions and special zones.
   - POIs and narrative elements.
3. Stickers read the existing terrain and world rules to determine behavior.
4. Later simulations and exports consume the sticker-driven content and terrain.

-——————————————————————————
D. VIEW-SPECIFIC BEHAVIOR
-——————————————————————————
Globe View:
- Uses the AppShell with minimap enabled.
- Shows the world as a 3D planet.
- Ideal for understanding large-scale layout and context.

Map View:
- Uses the AppShell without a minimap.
- Shows the world as a 2D map only.
- Ideal for precise editing and tool use.

===============================================================================
3. SIM MODE
===============================================================================
Sim Mode runs deterministic simulations on frozen world snapshots.

Sim types:
- Climate previews.
- Erosion.
- Basic population and civilization spread.

Core rules:
- Sim never modifies the live Create Mode world directly.
- Sim respects sticker-based biomes, regions, and cities.
- Two simulation levels:
  - Preview Sim (short, fast).
  - Deep Sim (longer, resumable).

Simulation results can be saved as new snapshots that Create Mode can edit.

===============================================================================
4. EXPORT MODE
===============================================================================
Export Mode outputs world data to external engines.

Supports:
- Heightmaps (PNG/EXR).
- Biome masks (derived from stickers and terrain).
- Water masks.
- City and region data.
- World metadata and manifests.
- Engine-agnostic JSON world packages.

Exports are:
- Deterministic.
- Non-destructive.
- Versioned with schema information.
- Named using engine-safe conventions.

END OF MODES OVERVIEW