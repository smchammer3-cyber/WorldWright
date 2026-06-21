# WORLDWRIGHT — MASTER BLUEPRINT V1.3 (Part 2 of 3)
**CREATOR TOOLS — Editor Shell, Camera, Create Mode, UX**

This document assumes Part 1 (World Core) is known.

---

## 5. EDITOR SHELL & CAMERA

### 5.1 Screen-as-Apps Architecture (Editor Shell)

- Editor Shell is a shared frame that hosts:
  - **CreateMode App**
  - **SimMode App**

- Both apps share:
  - WorldBrain access
  - Save/load system
  - Undo/redo
  - Rendering components (globe, map, minimap)

- They do **not** share internal business logic.  
  - No cross-importing of mode-specific logic.  
  - Communication is via world state and well-defined events.

### 5.2 Layout

Top bar (desktop):

- Back to Home  
- World name  
- Mode toggle: `Create | Sim`  
- View toggle: `Globe | Map`  
- Save status (Saved / Unsaved)  
- Export button  
- Settings

Left toolbar (desktop):

- Terrain tools  
- Biome tools  
- Water / lake tools  
- Volcano / special terrain tools  
- Countries & borders  
- Culture tools  
- City tools  
- (Sim-specific tools appear only in Sim Mode)

Canvas:

- Center area that shows **Globe** or **Map**.  
- Supports drag/pan, rotate, zoom.

Minimap:

- Only in **Create Mode + Globe View**.  
- Rectangular map in bottom-left.  
- Shows camera footprint rectangle.

Mobile layout:

- Top bar compressed to: world name, mode, view, menu.  
- Tools appear in a **bottom drawer** that can slide up.  
- Canvas gestures: drag, pinch, rotate.

### 5.3 Camera Rules

- Min zoom: entire globe visible with a small margin.  
- Max zoom: close enough to edit borders, rivers, stickers, cities comfortably.  
- Globe rotation is smooth and inertial, never jittery.  
- Map view is a 2D projection with pan & zoom but no rotation.

---

## 6. CREATE MODE — OVERVIEW

Create Mode is where **canonical** world data is edited.

- All edits write to **edit layers** or high-level entities (countries, stickers, cities, cultures).  
- Nothing in Sim branches touches Create Mode.  
- Undo/redo is always available.

Core editing systems:

1. Terrain Tools  
2. Stickers (polygon-based)  
3. Countries & Borders  
4. Cities  
5. Cultures  
6. Rivers & Lakes  
7. Biomes (where distinct from climate)

---

## 7. TERRAIN TOOLS

Terrain tools operate on `editHeightDelta`.

Tools:

- **Raise** — add positive delta.  
- **Lower** — add negative delta.  
- **Flatten** — move toward a chosen target height / local average.  
- **Smooth** — soften height differences.  
- **Carve Valley** — preferentially lower a path downhill.

Brush options:

- Size  
- Intensity  
- Falloff (soft/hard)  

Behavior:

- Drag = continuous stroke.  
- Click = single dab.  
- Optionally, each stroke can be one undo step.

Large terrain edits may:

- Mark hydrology & biomes as stale in the region.  
- Prompt user: “Recalculate rivers and climate in this area?”

---

## 8. STICKER SYSTEM (POLYGON-BASED)

Stickers are **polygon regions** with draggable vertices and falloff.

Use cases:

- Biome painting / overriding.  
- Culture influence regions.  
- Terrain biasing (e.g., raise an uplift zone).  
- Resource regions (future).  
- Special magical or thematic regions.

### 8.1 Sticker Creation

- User selects a sticker tool (Biome / Culture / Terrain / Resource / Special).  
- Chooses a primitive (circle, rectangle, polygon).  
- A polygon is created on the map or globe with handles at corners.  
- Sticker properties panel shows:
  - Type  
  - Mode (World-Rules / Override)  
  - Falloff  
  - Specific attributes (e.g., target biome, terrain bias strength)

### 8.2 Editing Stickers

- Drag vertices to reshape polygon.  
- Drag edges (midpoints) to refine shape.  
- Add/remove vertices for more control.  
- Drag entire sticker to move it.  
- Rotate/scale using modifiers or dedicated handles.

### 8.3 Modes

- **WORLD-RULES MODE**:
  - Engine attempts to respect realism.
  - For a biome sticker, it will nudge climate and local biome transitions to match plausible climates.
  - Offers warnings if requested effect is strongly unrealistic.

- **OVERRIDE MODE**:
  - Engine applies sticker effect directly.
  - Marked as override region so recalculations won’t erase it.
  - Warnings are shown but do not block.

### 8.4 Sticker Effects

Examples:

- **Biome sticker**:
  - Sets or biases `editBiomeId` in region.  
  - May also bias rainfall/vegetation fields in a subtle way.

- **Culture sticker**:
  - Adds or expands a culture region polygon.  
  - Updates culture grid weights in affected cells.

- **Terrain sticker**:
  - Applies a height delta pattern (e.g., broad dome uplift).

- **Resource sticker** (future):
  - Tags regions with resource metadata for exports or sim.

---

## 9. COUNTRIES & BORDERS

Countries are canonical **polygon regions** generated and edited in Create Mode.

### 9.1 Generation Workflow

- User chooses a target number of large/medium/small countries.  
- System partitions land into regions using:
  - Terrain features (mountains, basins).  
  - Hydrology (major rivers, coasts).  
  - Proximity to seas and plains.

- Generated borders:
  - Prefer ridgelines.  
  - Use rivers where natural.  
  - Avoid weird spikes or slivers unless user later introduces them.

### 9.2 Border Editing

- Selecting a country highlights its polygon.  
- Vertex handles appear; user can:
  - Drag vertices.  
  - Drag edges.  
  - Insert or remove vertices.  
- Optional snapping modes:
  - Snap to ridgelines.  
  - Snap to rivers.  
  - Snap to coasts.  
- Overlaps and gaps are disallowed by default; the editor maintains a clean tiling of land.

Rivers changing do **not** automatically move borders; system may propose updates.

---

## 10. CITIES

Cities are **point entities** with rich metadata.

### 10.1 Placement

- City tool active → click on land cell = new city.  
- Auto-assigns:
  - Default name (“New City #”)  
  - `countryId` and `cultureId` from the cell  
  - Type based on context (coastal? → `PORT`; major river crossing? → `TOWN`/`CITY`).

### 10.2 Editing

- Sidebar panel lets user:
  - Rename city.  
  - Change type & population tier.  
  - Mark as capital.  
  - Add tags (e.g., “ancient”, “holy city”, “trade hub”).  
  - Write descriptive notes (author-facing).

### 10.3 Display

- Icon size shows population tier.  
- Capitals have a distinct icon or halo.  
- Important tags (e.g., “holy”) may add subtle overlays or adornments.  

Sim Mode will animate city growth/decline using these attributes.

---

## 11. CULTURES

Cultures in Create Mode define **starting conditions** for Sim.

### 11.1 Culture Zones

- Cultures use polygon **influence regions** with handles.  
- Regions are semi-transparent shapes tinted by culture color.  
- Overlaps create mixed zones.

### 11.2 Editing Rules

- User selects a culture, then draws/edits its regions.  
- When cultures overlap:
  - The currently selected culture’s handles are on top.  
  - Mixed cells show blended colors.  

- Create Mode:
  - No automatic culture spread.  
  - Only user-driven changes.

- Sim Mode:
  - Cultures may drift, spread, split, or vanish over time.

---

## 12. RIVERS & LAKES IN CREATE MODE

Rivers are initially generated in the world core (Part 1’s hydrology).  
Create Mode gives the user **editing control** over them.

### 12.1 River Edits

User can:

- Add a river:
  - Draw a path downhill; engine snaps to plausible route along slope.  
- Delete sections:
  - Remove segments from a polyline; engine adjusts connectivity.  
- Reroute:
  - Drag points; engine warns if the river would flow uphill.

### 12.2 Hydrology Recalc

After significant terrain changes, the engine may flag hydrology as stale and prompt:

> “Terrain changed in this region. Recalculate rivers and lakes here?”

Options:

- Recalculate (respecting WORLD-RULES vs override zones).  
- Keep existing river layout as an artistic override.

### 12.3 Lakes & Inland Seas

- Lakes appear in internal basins.  
- Tools let users:
  - Raise/lower local lake levels.  
  - Convert into marshes or salt flats.  
- Lake masks are included in exports.

---

## 13. BIOME EDITING IN CREATE MODE

Biomes are mostly determined from climate, but Create Mode can override them.

### 13.1 Biome Brush

- Works like a paintbrush tool: assign a target biome with falloff.  
- In WORLD-RULES mode:
  - Engine checks if the biome fits local climate.  
  - If not, it may nudge local climate values or show warnings.  

### 13.2 Biome Stickers

- Polygon-based biome regions (see Sticker System).  
- Ideal for:
  - Large forests.  
  - Desert expansions.  
  - Special magical zones (fantasy).

### 13.3 Realism Warnings

Example messages:

- “This biome is unlikely at this latitude and temperature.”  
- “High rainfall + cold temperatures would usually produce boreal forest rather than desert.”  

Warnings never block; they educate and suggest.

---

## 14. UX / VISUAL DESIGN RULES

### 14.1 UI Style

- Clean, low-clutter; minimal but expressive icons.  
- Panels use **frosted-glass** aesthetics with soft blurs and rounded corners.  
- Colors are gentle, not neon; focus is on the world.

### 14.2 Tool Feedback

- Active tool is clearly highlighted.  
- Hover states (desktop) and pressed states (all devices) communicate interaction.  
- Invalid actions show short textual hints:  
  - “Cities must be placed on land.”  
  - “This tool only works on terrain.”

### 14.3 Accessibility

- Sufficient contrast for text and icons.  
- UI elements sized for touch where possible.  
- No critical information is conveyed by color alone (use icons/shapes).  
- Zoom/pan support for visual comfort.

### 14.4 Undo/Redo & Autosave

- Undo/redo stack covers:
  - Terrain edits  
  - Sticker placement/edits  
  - Country border edits  
  - Culture zones  
  - City placement and edits  

- Autosave:
  - Triggers after meaningful edits.  
  - Never blocks interaction or causes freezes.  
  - Always indicates last save time.

---

## 15. CREATIVE FREEDOM & FLOW

Create Mode should feel **playful and inspiring**, not like a CAD tool.

Principles:

- Fast feedback: edits appear immediately on globe and minimap.  
- Soft, friendly warnings instead of aggressive errors.  
- Overrides are allowed and preserved.  
- The UI encourages experimenting, then committing once it “feels right.”

---

_End of Part 2 of 3._  
See Part 3 for **Sim Mode, visual overlays, exports, rendering rules, and engine architecture**.
