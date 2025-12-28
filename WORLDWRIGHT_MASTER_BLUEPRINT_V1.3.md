# WORLDWRIGHT — MASTER BLUEPRINT V1.3 (Part 1 of 3)
**WORLD CORE — Vision, WorldBrain, Planet Logic**

Status: **Canonical**  
Owner: **Iron Man**  
Purpose: Reference for future Jarvis (Agent Mode), engine devs, and worldbuilders.

---

## 0. PURPOSE, SCOPE, VERSIONING

WorldWright is a **world-authoring + simulation environment**, not primarily a game. It exists to:

- Generate believable planets using **Hybrid Realism** (real science + stylized flexibility).  
- Let users **edit** worlds in a fun, non-destructive way.  
- Let users **simulate** histories safely in branches.  
- Export clean data for engines like **UE5 / Blender / Houdini / GIS**.

This blueprint defines:

1. Physical & logical laws (terrain, climate, rivers, tectonics, biomes, cultures, etc.).  
2. The **WorldBrain** data model — the single source of truth.  
3. World generation (tectonics → terrain → climate → biomes → hydrology).  
4. UX principles that every mode must respect.  
5. Rules that keep realism and creativity in balance.

**Version tag**  
- Name: `WORLDWRIGHT_MASTER_BLUEPRINT_V1.3`  
- Based on: V1.2 + all added laws, including Hybrid Realism, tectonics, hydrology, culture zones, etc.

> **Blueprint Continuity Law**: No system may contradict this document. Changes must be explicit, versioned, and intentional.

---

## 1. CORE VISION & PHILOSOPHY

### 1.1 User Control

- The user always feels **in control** of their world.  
- No automatic destructive changes; **Sim Mode** never overwrites canon silently.  
- Big changes are gated via explicit user decisions (promote branch, accept event, etc.).

### 1.2 Hybrid Realism

- Terrain, climate, rivers, borders, cultures, cities follow **real-world logic** by default.  
- Hybrid Realism = **physically grounded** + **stylized + fantasy-capable**.  
- We start from Earthlike logic, then adjust via style modes:
  - `EARTHLIKE` — realistic, subdued.  
  - `FANTASY` — heightened contrasts, dramatic geography, magical exceptions.  
  - `STYLIZED` — simplified shapes, clean color blocks, high readability.  
  - `ALIEN` — different cell counts, atmospheres, ocean ratios, but still internally consistent.

### 1.3 Non-Destructive Editing

- Create Mode edits are always **reversible** via undo/redo.  
- Editors write into **edit layers**, never destroying base data.  
- Sim Mode runs on **branches**; it does not mutate the canonical save by default.  
- Deleting worlds/countries/cities is confirmed and undoable where possible.

### 1.4 Simple UX, Deep Systems

- UI is **simple and clean**; systems underneath can be deep and realistic.  
- Users interact with:
  - Sliders and toggles in Generator.  
  - Brushes, stickers, polygons in Create.  
  - Overlays and timelines in Sim.  
- The engine handles climate math, hydrology, tectonics, erosion, etc. internally.

### 1.5 Two Worlds: Canon vs Simulation

- **Create Mode** defines canonical reality (the “book version” of the world).  
- **Sim Mode** explores alternate histories and futures in **branches**.  
- The user may promote a branch to become the new canonical baseline.

### 1.6 Freedom-with-Rails

- Realism is the default **guide**, not a prison.  
- Tools offer realism warnings (“this is improbable”) but allow **Override Mode**.  
- Stickers have **World-Rules** mode (physics-aware) and **Override** mode (author freedom).  
- The world should feel coherent even after heavy creative editing.

---

## 2. WORLDBRAIN — DATA MODEL

WorldBrain is the authoritative world state. It must be:

- Fully serializable.  
- Resolution-agnostic (but with sane defaults).  
- Suitable for **rendering, tools, sim, and exports**.

### 2.1 Grid & Projection

- World is a **2D grid** representing the planet surface.  
- Default resolution: **1024 × 512** cells (configurable).  
- Projection: **equirectangular** (lon: -180→+180, lat: -90→+90).  
- Every system (tools, sim, exports) respects this common coordinate system.

### 2.2 Terrain Layers

Each cell has three layers of height:

- `baseHeight` — Generated terrain, never modified once created.  
- `editHeightDelta` — Create Mode modifications (user sculpting).  
- `simHeightDelta` — optional Sim Mode structural changes (rare).  

**Rendered height:**

- In Create Mode:  
  `height = baseHeight + editHeightDelta`  
- In Sim Mode:  
  `height = baseHeight + editHeightDelta + simHeightDelta`

### 2.3 Hydrology & Water Fields

Per cell:

- `isWater` — derived from `height` vs global `seaLevel`.  
- `seaLevel` — global scalar for the world.  
- `flowDirection` — which neighbor receives runoff (steepest downhill).  
- `flowAccumulation` — accumulated upstream area / water.  
- `basinId` — watershed identifier.  

**Rivers** are separate entities:

```ts
interface RiverSegment {
  id: string;
  points: { cellIndex: number; width: number; depth: number }[];
  isMainStem: boolean;
  tributaryOf?: string; // parent river id
}
```

- Rivers come from hydrology fields but are exported and edited as polylines.

### 2.4 Climate & Atmosphere Fields

Per cell:

- `temperature` — approximate surface temperature.  
- `rainfall` — approximate annual precipitation or normalized moisture.  
- `climateCellId` — membership in atmospheric cell (Hadley / Ferrel / Polar / custom).  
- `prevailingWind` — stored as discrete direction or vector.

These are computed using:

- Latitude  
- Elevation  
- Land/ocean distribution  
- Axial tilt  
- Style mode (Earthlike/Fantasy/Stylized/Alien)  
- Base temperature & humidity biases.

### 2.5 Tectonic & Geological Fields

Per cell:

- `plateId` — which tectonic plate the cell belongs to.  
- `plateType` — `OCEANIC` | `CONTINENTAL`.  
- `boundaryType` — `NONE` | `DIVERGENT` | `CONVERGENT` | `TRANSFORM`.  
- `upliftRate` — scalar for net vertical motion contribution.  
- `surfaceAge` — relative age (young / mature / old).  
- `volcanicActivity` — intensity scalar.

These fields help drive:

- Mountains & trenches.  
- Volcanic arcs and hotspots.  
- Long-term erosion biases (young vs old surfaces).

### 2.6 Biomes & Surface Types

Per cell:

- `baseBiomeId` — derived from temperature, rainfall, elevation, distance to water.  
- `editBiomeId` — optional override from Create Mode stickers.  
- `surfaceType` — e.g., `ROCK`, `SAND`, `PEAT`, `PERMAFROST`, `SALT_FLATS`, `ICE`.  
- `snowCover` / `iceCover` — scalar or boolean coverage.  
- `oceanDepthClass` — e.g., `SHELF`, `SLOPE`, `ABYSSAL`, `TRENCH`.

Biomes follow Earthlike logic first, then are modulated by style mode.

### 2.7 Countries & Political Regions

WorldBrain stores:

- `countryId` per cell for fast lookups.  
- A `countries` list:
```ts
interface Country {
  id: string;
  name: string;
  color: string;

  polygons: { lat: number; lon: number }[][]; // multi-polygon

  metadata: {
    capitalCityId?: string;
    tags?: string[]; // "empire", "city-state"
  };
}
```

Rules:

- Countries are **polygon regions**, not stickers.  
- Borders align with geography at generation but do not auto-move when geography changes.  
- Suggestions may appear; the user decides whether to edit borders.

### 2.8 Cultures

Cultures have **definitions** and **regions**.

#### 2.8.1 Culture Definitions

```ts
interface Culture {
  id: string;
  name: string;
  color: string;

  parentCultureId?: string;
  originYear?: number;

  languageFamily?: string;
  religionTags?: string[];

  traits?: {
    openness?: number;
    militarism?: number;
    tradition?: number;
    expansionism?: number;
    collectivism?: number;
  };

  preferredBiomes?: string[];
  coastalAffinity?: number;
  riverAffinity?: number;
  mountainAffinity?: number;

  stabilityBase?: number;
  techBase?: number;
}
```

#### 2.8.2 Culture Regions & Grid

- Culture **regions** are polygon overlays:
```ts
interface CultureRegion {
  id: string;
  cultureId: string;
  polygon: { lat: number; lon: number }[];
  falloff: number;
  isOverride?: boolean;
}
```

- We also maintain a **baked culture grid** for rendering & sim:
  - `primaryCultureId`  
  - `cultureMix?: { cultureId: string; weight: number }[]`

Create Mode edits polygons; Sim Mode updates the grid over time within branches.

### 2.9 Cities

```ts
interface City {
  id: string;
  name: string;

  lat: number;
  lon: number;
  cellIndex: number;

  countryId?: string;
  cultureId?: string;

  type: 'VILLAGE' | 'TOWN' | 'CITY' | 'METROPOLIS' | 'FORT' | 'PORT';
  isCapital?: boolean;

  populationTier: 1 | 2 | 3 | 4 | 5;
  economicRoles?: ('AGRICULTURAL' | 'INDUSTRIAL' | 'TRADE' | 'RELIGIOUS' | 'MILITARY')[];
  strategicValue?: number;

  tags?: string[];
  description?: string;
}
```

- Cities are placed in Create Mode and evolve in Sim.  
- They must be on land and typically near coasts, rivers, fertile land, or crossroads.

### 2.10 Special Locations (Points of Interest)

```ts
interface Location {
  id: string;
  name: string;
  type: 'WONDER' | 'RUIN' | 'DUNGEON' | 'NATURAL_WONDER' | 'MAGICAL_ZONE' | 'LANDMARK';

  lat: number;
  lon: number;
  cellIndex: number;

  polygon?: { lat: number; lon: number }[];
  countryId?: string;
  cultureId?: string;

  tags?: string[];
  description?: string;
}
```

These are author-facing story hooks and don’t usually affect physics.

### 2.11 Stickers — Polygon Editing Regions

Stickers are the primary editing tool for large-scale content.

```ts
interface Sticker {
  id: string;
  type: 'BIOME' | 'CULTURE' | 'TERRAIN' | 'RESOURCE' | 'SPECIAL';

  polygon: { lat: number; lon: number }[];
  falloff: number;
  mode: 'WORLD_RULES' | 'OVERRIDE';
  metadata?: Record<string, any>;
}
```

Rules:

- All stickers are **polygon-based** with draggable vertices / handles.  
- They may be reshaped, moved, scaled, and rotated.  
- In WORLD-RULES mode, engine enforces/adjusts to keep realism.  
- In OVERRIDE mode, the user can break realism intentionally.

### 2.12 World Metadata & Versioning

```ts
interface WorldMetadata {
  id: string;
  name: string;
  seed: string;

  version: string; // schema version
  styleMode: 'EARTHLIKE' | 'FANTASY' | 'STYLIZED' | 'ALIEN';

  gridWidth: number;
  gridHeight: number;

  createdAt: string;
  updatedAt: string;

  exportProfiles?: string[];
}
```

---

## 3. GLOBAL SYSTEM LAWS (ALWAYS-ON)

These rules apply to the entire app.

### 3.1 Single Source of Truth

Each concept has exactly one canonical home:

- Terrain: height layers.  
- Biomes: `baseBiomeId` + `editBiomeId`.  
- Cultures: culture definitions + regions + baked grid.  
- Countries: polygons + per-cell `countryId`.  
- Cities: city list.  
- Rivers: hydrology fields + river polylines.

No subsystem keeps a private, divergent copy of canonical data.

### 3.2 Cause–Effect Consistency

We edit **causes**, not raw derived fields.

- Editing terrain → may recompute hydrology → update climate/biomes.  
- Editing base world parameters → full re-generation.  
- Manual overrides are clearly marked so the engine knows what **not** to overwrite.

### 3.3 Separation of Concerns

- Renderer never writes world data.  
- Tools operate via well-defined APIs into WorldBrain.  
- Sim uses **branch snapshots**, not the mainline save.  
- Exports are read-only.

### 3.4 Time Consistency

At any given moment:

- All layers are either up-to-date or clearly marked as needing recalculation.  
- We avoid half-updated states; user sees either “stale” warnings or up-to-date visuals.

### 3.5 Override Immunity

When the user enables **Override Mode**, their decision is respected:

- Override stickers & edits are tagged.  
- Automatic recalculations avoid overwriting override regions.  
- Warnings are allowed; forced changes are not.

### 3.6 Non-Destructive Safety

- Major destructive operations (delete country, overwrite world, etc.) prompt confirmation.  
- Sim changes live in branches; Create Mode remains safe.

### 3.7 Undo/Redo Purity

- Every user-visible action is grouped into atoms meaningful to undo/redo.  
- “Paint mountain ridge” = one undo.  
- “Place sticker + adjust vertices in one drag” can be grouped.

---

## 4. PLANET GENERATION — HIGH-LEVEL OVERVIEW

Parts 2–3 will detail tools, sim, exports, and architecture.  
The remainder of Part 1 focuses on **planet logic**: tectonics, terrain, climate, hydrology, and biomes.

### 4.1 Safe vs Advanced Parameters

**Safe knobs** (default Generator UI):

- World style (Earthlike / Fantasy / Stylized / Alien)  
- Ocean coverage  
- Axial tilt  
- Planet age  
- Base temperature  
- Humidity bias  
- Plate activity level  
- Resolution preset  

**Advanced knobs** (expert / Agent Mode):

- Plate count  
- Oceanic vs continental ratio  
- Tectonic chaos  
- River density  
- Erosion strength  
- Lake bias  
- Elevation exaggeration  
- Biome stylization level  
- Atmosphere cell count  
- Gravity & atmos density (for Alien)

All parameters are stored for reproducibility.

### 4.2 Tectonic Plate Model

1. Partition the world into plates.  
2. Assign `plateType` (oceanic/continental).  
3. Assign motion vectors on the sphere.  
4. Classify boundaries as divergent, convergent, transform.  
5. Derive uplift/subsidence from boundary geometry and motion.  
6. Use these to boost height where mountain chains and mid-ocean ridges belong.

### 4.3 Base Terrain Generation

- Start with multi-octave noise for broad shapes.  
- Bias heights by plate uplift fields:
  - Convergent continental boundaries → high mountains.  
  - Divergent mid-ocean ridges → raised oceanic ridges.  
- Carve ocean basins to achieve desired ocean coverage.  
- Normalize heights and apply planet age–dependent erosion/smoothing.  

### 4.4 Atmospheric Cells & Circulation

Default Earthlike:

- 3 major cells per hemisphere (Hadley, Ferrel, Polar).  
- Equatorial rising air, descending subtropical highs, polar cells.  
- Coriolis deflection creates:
  - Trade winds in tropics.  
  - Westerlies in mid-latitudes.  
  - Polar easterlies.

Alien mode can change the number of cells and pattern but must preserve:

- Heat in at equator, out at poles.  
- Rotational deflection.  
- Rising at warm zones, sinking at cool zones.

### 4.5 Temperature Estimation

Key factors:

- Latitude (colder near poles).  
- Elevation (lapse rate).  
- Ocean proximity (moderated temperatures).  
- Global `baseTemperature` & style mode.

Implementation concept:  
`T = baseLatTemp - elevationPenalty + coastalBonus + globalBias + styleAdjust`

### 4.6 Moisture & Rainfall Estimation

- Start with moisture source over oceans.  
- Move air masses along prevailing winds.  
- Moist air rises over mountain slopes → rain on windward side.  
- Rain shadows form on leeward sides.  
- Extra uplift and rainfall near equator and major storm tracks.  
- Dry descending air near subtropical highs → deserts.

### 4.7 Hydrology & Rivers

- Compute downhill flow directions per cell.  
- Accumulate flow to estimate how much water passes through each cell.  
- Cells above a threshold become **river cells**.  
- Build continuous polylines from source to outlet (ocean or internal basin).  
- Mark deltas where rivers meet large water bodies and branch into distributaries.  
- Lakes form where flow is trapped in a local basin.

### 4.8 Erosion & Planet Age

- Younger worlds: sharp peaks, dramatic relief.  
- Mature worlds: mix of sharp and worn terrain.  
- Old worlds: smoothed ranges, wide plains, big sedimentary basins.

Erosion logic (simplified):

- Fluvial erosion = function(flowAccumulation, slope).  
- Hillslope diffusion smooths steep slopes.  
- Coastal erosion softens coastlines over time.  
- Tectonic uplift and erosion are balanced by planet age & style.

### 4.9 Biome Assignment

Given temperature, rainfall, elevation, and distance to water:

- Use a classic **temperature × moisture** biome matrix as core.  
- Adjust based on elevation (alpine zones) and style mode.  
- Generate smooth transitions between adjacent biomes, avoiding jagged noise.  
- Insert micro-biomes (oases, riparian corridors, volcanic pockets) where conditions differ locally.

### 4.10 Style Modes

**Earthlike**:  
- Conservative palette, realistic diversity.

**Fantasy**:  
- More extreme contrasts; dramatic mountains; deserts, volcano belts, strange patterns.  
- May allow magical anomalies that are physically unlikely but still clickable and understandable.

**Stylized**:  
- Simplified land shapes and biome blobs.  
- Fewer micro-details; strong color clarity.

**Alien**:  
- Different atmospheric cells, stronger or weaker gravity, exotic biome definitions.  
- Still respects consistent heat and moisture logic.

---

_End of Part 1 of 3._  
See Part 2 for **Create Mode, tools, and UI/UX**, and Part 3 for **Sim Mode, exports, and developer architecture**.

# WORLDWRIGHT — MASTER BLUEPRINT V1.3 (Part 2 of 3)
**CREATOR TOOLS — Editor Shell, Camera, Create Mode, UX**

This document assumes Part 1 (World Core) is known.

—

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

—

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

—

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

—

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

—

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

—

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

—

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

—

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

—

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

—

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

—

## 15. CREATIVE FREEDOM & FLOW

Create Mode should feel **playful and inspiring**, not like a CAD tool.

Principles:

- Fast feedback: edits appear immediately on globe and minimap.  
- Soft, friendly warnings instead of aggressive errors.  
- Overrides are allowed and preserved.  
- The UI encourages experimenting, then committing once it “feels right.”

—

_End of Part 2 of 3._  
See Part 3 for **Sim Mode, visual overlays, exports, rendering rules, and engine architecture**.

# WORLDWRIGHT — MASTER BLUEPRINT V1.3 (Part 3 of 3)
**SIMULATION · VISUALIZATION · EXPORTS · ARCHITECTURE**

This document assumes Parts 1–2 are known.

—

## 16. SIM MODE (OVERVIEW)

Sim Mode is a **non-destructive time simulation** that runs on **branches**, not on the canonical world directly.

Purposes:

- Explore alternate histories.  
- Watch cultures drift and split.  
- See cities grow, trade routes form, and empires rise/fall.  
- Drive story inspiration and exported timelines.

Key rules:

- Sim never silently mutates Create Mode.  
- Every major change is gatekept via branch promotion or an explicit decision.

—

## 17. SIM MODE UI

Top bar:

- World name  
- Mode: **Sim**  
- Current year / time slider  
- Controls: Pause, Play, Step, Speed (1x, 5x, 10x)

Side panel:

- Overlays:
  - Population density  
  - Political map (countries)  
  - Culture map  
  - Trade & roads  
  - Shipping lanes  
  - Climate anomalies  
  - Event markers

Canvas:

- Globe or Map view.  
- Displays dynamic changes in borders, cities, cultures, and routes.

—

## 18. SIM EVENTS & DECISION INBOX

Sim generates **events** that represent significant changes.

Examples:

- “Culture A split into A1 and A2 in the northern mountains.”  
- “City X has grown into a major trade hub.”  
- “The southern empire has annexed three border provinces.”  
- “Severe drought has pushed migrations north.”  
- “Shipping lane across this strait has opened.”

Each event includes:

- Title, description.  
- Affected entities and region.  
- Visual preview (highlight region).  
- Proposed change to world state.

**Decision Inbox**:

- Lists pending events.  
- User can **Accept** (apply in branch) or **Reject**.  
- Some minor background changes may auto-apply but major ones do not.

—

## 19. BRANCHES & PROMOTION

Sim runs inside **branches**.

A branch includes:

- Reference to base canonical world snapshot.  
- Simulation parameters (start year, speed, aggressiveness).  
- Event decisions (accept/reject history).  
- Resulting world state over time.

User actions:

- Create new branch from canon.  
- Rename branch.  
- Switch branches.  
- **Promote branch**: copy its final world state back as new canonical mainline.

Promotion rules:

- Promotion is explicit and undoable (where feasible).  
- Previous canonical states may be preserved as older save slots.

—

## 20. SIMULATION LOGIC (HIGH-LEVEL CONCEPTS)

### 20.1 Population

Population distribution responds to:

- Terrain (fertile plains vs harsh mountains).  
- Climate (comfortable vs extreme).  
- Rivers, coasts, and trade routes.  
- Wars and disasters.

Population growth:

- Increases in stable, fertile, well-connected cities.  
- Declines in warzones, harsh regions, disaster areas.

### 20.2 Cultures

Sim handles:

- Slow **drift** of cultures along contact zones.  
- **Split** events when separated regions diverge enough.  
- **Merge**/assimilation where one culture overwhelms another.  
- Migration along rivers, coasts, and roads.

Cultures influence:

- Country stability.  
- Conflict likelihood.  
- City roles and identity.

### 20.3 Countries & Borders

Countries:

- Expand or contract based on wars, alliances, collapses.  
- May **unify** into empires or **fragment** into successor states.  
- Border changes always appear as events with previews.

### 20.4 Cities

Cities:

- Grow into towns, cities, metropolises with success and stability.  
- Decline under repeated shocks or economic collapse.  
- May be abandoned or ruined; ruin status affects culture and trade.

### 20.5 Trade Routes & Shipping Lanes

Sim introduces:

- Land routes between cities (roads and caravan routes).  
- Sea routes between ports (shipping lanes).  

Routes are:

- Weighted by traffic.  
- Informed by geography and political borders.  
- Visualized with animated strokes.

### 20.6 Environmental & Climate Changes

Sim can optionally model:

- Regional desertification or greening.  
- Shifts of agricultural zones due to gradual climate drift.  
- Rare major events like volcanic winters (if enabled).

All of these appear as **events** and apply within branches only.

—

## 21. SIM VISUALIZATION & ANIMATION

### 21.1 Settlements

- Cities have icons that scale with **population tier**.  
- Growth: subtle **blooming rings** and increased halo.  
- Decline: shrinking halo and desaturation.  
- Conversion to ruins: icon changes and color fades toward gray/sepia.

### 21.2 Cultures

- Culture regions are semi-transparent fields of color.  
- Active frontiers show slow, pulsing animation along the edges.  
- Overlaps: crosshatch patterns or dual-colored overlays.  

Selected culture:

- Brightened region.  
- Handles visible for region polygons.  
- Clear label and stats panel.

### 21.3 Trade & Shipping

Trade routes (land):

- Lines between cities; thickness indicates intensity.  
- Animated dashes or pulses along the line.

Shipping lanes:

- Curved paths across oceans between ports.  
- Tiny ship-like markers or pulses traveling along paths.

### 21.4 Focus Modes

To reduce clutter, user can choose a **focus mode**:

- Political  
- Culture  
- Trade & Economy  
- History & Events  

Each mode turns certain overlays on/off and adjusts their brightness.

—

## 22. EXPORT SYSTEM

Exports must be:

- Deterministic.  
- Well-documented.  
- Engine-agnostic where possible.  
- Versioned and compatible with evolving schema.

### 22.1 Core Export Types

- **Heightmap** (RAW / PNG): from `baseHeight + editHeightDelta`.  
- **Biome Map** (PNG / JSON): biome IDs per cell.  
- **Country Map** (PNG / JSON): country IDs per cell.  
- **Culture Map** (PNG / JSON): culture IDs per cell.  
- **River Data** (JSON / spline format): polylines with width & depth.  
- **City Data** (JSON): metadata for each city.  
- **World Manifest** (JSON): world metadata, resolution, style, version.

### 22.2 UE5 Export Profile (Example)

UE5 profile includes:

- `heightmap.raw`  
- `biome_masks/*.png`  
- `country_masks/*.png`  
- `culture_masks/*.png`  
- `river_splines.json`  
- `cities.json`  
- `world_manifest.json`  

Naming conventions:

- Engine-safe names, no spaces.  
- Clear prefixes and suffixes (e.g., `worldName_layer_type.ext`).

### 22.3 Chunked Exports

User can export:

- Entire world.  
- Region by bounding box.  
- Country-based chunks.  

Chunk rules:

- Adjacent chunks align perfectly with no seams.  
- Coordinates and scales consistent across chunks.  
- Manifest clearly describes extents and indices.

—

## 23. RENDERING & PERFORMANCE RULES

### 23.1 Rendering

- GPU-accelerated globe and minimap.  
- Smooth shading, no noisy textures.  
- Biomes and overlays composited with careful blending.  
- Camera updates must remain responsive while editing and simulating.

### 23.2 Performance & Caching

- Use **local updates**: only re-render changed regions where possible.  
- Cache derived layers (e.g., biome textures) and invalidate selectively.  
- Provide low/medium/high quality settings to fit a range of devices.

—

## 24. DEVELOPER ARCHITECTURE & CORE RULES

### 24.1 Single App, Multiple Sub-Apps

- Home, Generator, Editor Shell (Create/Sim) are logically distinct.  
- Mode-specific logic lives within its sub-app.  
- Shared modules:
  - WorldBrain schema & access  
  - Renderer  
  - Storage & autosave  
  - Export system

### 24.2 Core Surgery Rules

Core spine modules (world schema, generator, renderer, storage) are high-risk; when changing them:

- Snapshot current state.  
- Change one core concept at a time.  
- Update generator, storage, and renderer together.  
- No silent schema changes.  
- Additive changes preferred over breaking changes.  
- Always maintain migration paths for older worlds.

### 24.3 Versioning

- All saves and exports contain a schema version string.  
- When schema changes:
  - Implement migration or mark incompatible versions clearly.  
  - Avoid silent failure; show clear messages if load fails.

—

## 25. FUTURE HOOKS

Not required for current implementation, but the architecture must support:

- Road-level traffic simulation.  
- Natural resource layers and extraction impacts.  
- Procedural naming (cultures, cities, rivers).  
- Dynamic, time-dependent climate.  
- Mesh exports for high-res terrain to DCC tools.  
- Collaborative multi-user editing.

—

## 26. FINAL VERSION TAG

WORLDWRIGHT — MASTER BLUEPRINT V1.3  
Parts 1–3 together form the canonical **system bible** for:

- World core and planet logic.  
- Create Mode tools and UX.  
- Simulation, visualization, exports, and architecture.

Owner: **Iron Man**  
Collaborator: **Jarvis**

End part 3-3

# WORLDWRIGHT — MODULAR ARCHITECTURE BLUEPRINT (PART 4)

## 0. North Star
One stable **World Spine** at the center.  
Three **mini‑apps** around it (Generate, Create, Sim).  
Globe/Map are **views**, not logic owners.  
Everything communicates through **strict, small APIs**.

—

## 1. Folder / Module Layout

```
src/
  core/
    worldSchema/
    worldGenerator/
    worldEditor/
    worldSim/
    worldValidation/
    worldStorage/

  render/
    globeRender/
    mapRender/
    palettes/
    camera/

  appShell/
    layout/
    routing/
    worldSession/
    ui-kit/

  modes/
    generateMode/
    createMode/
    simMode/

  exports/
    ue5Export/
    debugExport/

  util/
```

—

## 2. CORE/ — The World Spine

### 2.1 worldSchema/
Single authoritative definition of:
- World
- WorldCell
- Climate, Hydrology, Rivers, Plates, Biomes
- Countries, Cities, Cultures, Stickers
- Metadata, resolution, schemaVersion

**Absolutely no UI or rendering logic here.**

—

### 2.2 worldGenerator/
Pure world creation:
- `generateWorld(params)`
- `regenerateWorldWithNewSeed()`
- Generates tectonics, heightmap, climate, hydrology, biomes.

No React, no storage, no rendering.

—

### 2.3 worldEditor/
Receives **Edit Actions**, applies them safely:
- Terrain strokes
- Stickers (WorldRules + Override)
- Country polygon editing
- River editing
- Recompute cascade (physics → hydrology → biomes → features)

Create Mode never edits arrays directly—everything goes through here.

—

### 2.4 worldSim/
Simulation logic:
- `runSimTick(world, settings)`
- `computeSimOverlays(world, overlaySettings)`

Sim UI only configures; engine executes.

—

### 2.5 worldValidation/
Central integrity checker:
- `validateWorld(world)`
- `fixWorldIfPossible(world)`

Called on load, large edits, exports, debugging.

—

### 2.6 worldStorage/
All persistence:
- `serializeWorld(world)`
- `deserializeWorld(json)`
- `migrateWorld(oldJson)`

Single authority on schema version upgrades.

—

## 3. RENDER/ — View Layer Only

### 3.1 globeRender/
Pure translators:
- `buildGlobeMesh(world)`
- `updateGlobe(world)`

Handles biome → color, height shading, lighting, buffers.

### 3.2 mapRender/
Pure 2D projection logic:
- Build minimap texture
- Convert lat/lon to map projection

Renderers never modify world data.

—

## 4. APPSHELL/ — Shared Shell + World Session

### 4.1 layout/ + routing/
Controls:
- Navigation
- Mode switching
- Shared UI elements

### 4.2 worldSession/
**The only place where the “current world” lives.**

Responsibilities:
- Load/save worlds
- Undo/redo history
- Apply edits via worldEditor
- Run sim ticks via worldSim
- Keep snapshots consistent

Modes access the world *only* through `worldSession`.

### 4.3 ui-kit/
Shared UI components:
- Sliders
- Panels
- Buttons
- Modals

No world logic inside.

—

## 5. MODES/ — Mini Apps

### 5.1 generateMode/
- Shows parameter sliders
- Calls worldGenerator through worldSession
- Saves worlds via worldSession

### 5.2 createMode/
- Stickers, brushes, borders, culture zones, cities
- Builds **Edit Actions**
- Sends them to worldSession → worldEditor

Never mutates world directly.

### 5.3 simMode/
- Timeline controls, overlays
- Calls worldSession.runSimTick()
- Renders overlays produced by worldSim

—

## 6. EXPORTS/
Translators:
- UE5 heightmaps + splines
- Houdini formats
- Debug JSON dumps

Operate only on validated `World` objects.

—

## 7. Hard Laws of the Architecture

1. **Import Boundaries**
   - core/ imports NOTHING above it.
   - render/ imports core/ and util/ only.
   - modes/ import:
     - core/
     - render/
     - appShell/worldSession
     - ui-kit
   - modes never import each other.

2. **Edit‑via‑Actions Only**
   - No UI component manipulates world data.
   - All modifications go through worldEditor via worldSession.

3. **Schema Versioning**
   - World carries `schemaVersion`.
   - worldStorage + worldValidation handle migrations.

4. **Single Source of Truth**
   - Only worldSession owns the live world.
   - No hidden `useState<World>` copies.

5. **UI Never Contains Planet Logic**
   - Climate, hydrology, biome rules, tectonics—all inside core/.

—

## 8. Rollout Plan (Safe Migration Steps)

1. Extract worldSchema into core/.
2. Move generation into worldGenerator.
3. Introduce worldSession; centralize world state.
4. Convert Create Mode tools into Edit‑Action calls.
5. Move render logic into globeRender/mapRender.
6. Enforce boundaries with tsconfig + lint rules.
7. Migrate old world saves via versioning system.

Each step is incremental and testable.

—

## 9. Summary

The “absolute best” WorldWright architecture uses:
- One stable **World Spine**
- Strict module boundaries  
- Modes as isolated mini‑apps  
- Renderer as pure view layer  
- A single controlled worldSession  
- Edit‑via‑actions  
- Schema versioning  
- Truly modular growth

This keeps WorldWright powerful, safe, and infinitely extendable.
