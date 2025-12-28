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
