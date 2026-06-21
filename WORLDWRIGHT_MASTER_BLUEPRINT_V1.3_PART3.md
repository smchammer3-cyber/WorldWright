# WORLDWRIGHT — MASTER BLUEPRINT V1.3 (Part 3 of 3)
**SIMULATION · VISUALIZATION · EXPORTS · ARCHITECTURE**

This document assumes Parts 1–2 are known.

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---

## 25. FUTURE HOOKS

Not required for current implementation, but the architecture must support:

- Road-level traffic simulation.  
- Natural resource layers and extraction impacts.  
- Procedural naming (cultures, cities, rivers).  
- Dynamic, time-dependent climate.  
- Mesh exports for high-res terrain to DCC tools.  
- Collaborative multi-user editing.

---

## 26. FINAL VERSION TAG

WORLDWRIGHT — MASTER BLUEPRINT V1.3  
Parts 1–3 together form the canonical **system bible** for:

- World core and planet logic.  
- Create Mode tools and UX.  
- Simulation, visualization, exports, and architecture.

Owner: **Iron Man**  
Collaborator: **Jarvis**

End of Blueprint.
