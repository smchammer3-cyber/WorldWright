# WORLDWRIGHT — MODULAR ARCHITECTURE BLUEPRINT (PART 4)

## 0. North Star
One stable **World Spine** at the center.  
Three **mini‑apps** around it (Generate, Create, Sim).  
Globe/Map are **views**, not logic owners.  
Everything communicates through **strict, small APIs**.

---

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

---

## 2. CORE/ — The World Spine

### 2.1 worldSchema/
Single authoritative definition of:
- World
- WorldCell
- Climate, Hydrology, Rivers, Plates, Biomes
- Countries, Cities, Cultures, Stickers
- Metadata, resolution, schemaVersion

**Absolutely no UI or rendering logic here.**

---

### 2.2 worldGenerator/
Pure world creation:
- `generateWorld(params)`
- `regenerateWorldWithNewSeed()`
- Generates tectonics, heightmap, climate, hydrology, biomes.

No React, no storage, no rendering.

---

### 2.3 worldEditor/
Receives **Edit Actions**, applies them safely:
- Terrain strokes
- Stickers (WorldRules + Override)
- Country polygon editing
- River editing
- Recompute cascade (physics → hydrology → biomes → features)

Create Mode never edits arrays directly—everything goes through here.

---

### 2.4 worldSim/
Simulation logic:
- `runSimTick(world, settings)`
- `computeSimOverlays(world, overlaySettings)`

Sim UI only configures; engine executes.

---

### 2.5 worldValidation/
Central integrity checker:
- `validateWorld(world)`
- `fixWorldIfPossible(world)`

Called on load, large edits, exports, debugging.

---

### 2.6 worldStorage/
All persistence:
- `serializeWorld(world)`
- `deserializeWorld(json)`
- `migrateWorld(oldJson)`

Single authority on schema version upgrades.

---

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

---

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

---

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

---

## 6. EXPORTS/
Translators:
- UE5 heightmaps + splines
- Houdini formats
- Debug JSON dumps

Operate only on validated `World` objects.

---

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

---

## 8. Rollout Plan (Safe Migration Steps)

1. Extract worldSchema into core/.
2. Move generation into worldGenerator.
3. Introduce worldSession; centralize world state.
4. Convert Create Mode tools into Edit‑Action calls.
5. Move render logic into globeRender/mapRender.
6. Enforce boundaries with tsconfig + lint rules.
7. Migrate old world saves via versioning system.

Each step is incremental and testable.

---

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

