# WorldWright Blueprint: Modular City Maker Handoff Draft

Status: draft / scope-control architecture  
Owner: Iron Man  
Purpose: define the boundary between WorldWright, Micro Tiles, metadata-rich stickers, Unreal export, and a future compatible City Maker tool.

---

## 1. Core Law

```text
WorldWright must not become a full city editor.

WorldWright makes the world.
WorldWright creates macro terrain, micro tile terrain, heightmaps, world logic, and metadata-rich clay stickers.
WorldWright designates settlements, cities, landmarks, roads, rivers, regions, and sites as world-aware stickers.
WorldWright exports terrain and structured metadata.

Detailed city construction belongs to Unreal or a future compatible City Maker tool.
```

This is a deliberate scope-control law.

WorldWright already owns an enormous problem:

```text
planet generation
continents
oceans
micro tile system
heightmaps
hydrology
climate
biomes
settlements
roads
regions
simulation summaries
export packages
save/load
```

Adding a full city designer inside WorldWright would overload the product, the UI, the data model, the processing budget, and the development roadmap.

The correct modular model is:

```text
WorldWright = world source of truth.
City Maker = local city realization tool.
Unreal = high-detail runtime/visual/game realization target.
```

---

## 2. Product Boundary

### 2.1 WorldWright Owns

WorldWright owns:

```text
macro globe generation
macro view editing
micro tile grid
micro tile activation
micro tile terrain
micro tile heightmap export
world-aware clay stickers
settlement/city/site markers
roads/rivers/coasts/regions
world metadata
simulation proxy data
export sidecar data
```

WorldWright answers:

```text
Where is this city?
Why does it exist here?
What kind of place is it?
How large is it approximately?
What terrain does it sit on?
What world systems connect to it?
What culture/faction/region does it belong to?
What should downstream tools know?
```

### 2.2 WorldWright Does Not Own

WorldWright does not own:

```text
full city street layout
individual building placement
interior city blocks
citizen animation
asset placement
Unreal actor spawning
NPC behavior
final cinematic/game visuals
full building library
city district mesh generation
close-up population behavior
```

Those belong to:

```text
Unreal
future compatible City Maker
future dedicated settlement/city toolchain
```

### 2.3 City Maker Owns

A future City Maker tool would own:

```text
city layout generation or design
streets
blocks
districts
walls
gates
landmarks
building footprints
population zones
patrol routes
spawn areas
Unreal actor placement metadata
city-scale export packages
```

City Maker should be viable as a standalone product, but compatible with WorldWright.

### 2.4 Unreal Owns

Unreal owns:

```text
high-detail rendering
assets
materials
lighting
animation
actors
runtime systems
gameplay logic
NPC systems
procedural content realization
final interactive scene behavior
```

WorldWright should export intent and terrain. Unreal should realize that intent with assets, animation, gameplay, and close-up visual quality.

---

## 3. Modular Processing Law

```text
Processing load should be spread across modules.

WorldWright should not fully resolve every city.
WorldWright should not fully activate every micro tile.
WorldWright should not hold every future city layout in memory.
WorldWright should store settlement/city stickers as metadata-rich anchors.
WorldWright should activate/export only the requested micro tile, sticker context, or handoff package.
```

This preserves performance.

The hierarchy is:

```text
Macro globe:
  always available, lightweight enough to navigate

Micro tile:
  activated when selected, exported, or intentionally resolved

Settlement/city sticker:
  metadata-rich marker inside the world or micro tile

City Maker project:
  separate optional realization package, created only when user chooses to design the city deeply

Unreal project:
  external high-detail engine target
```

Important rule:

```text
Dormant does not mean lost.
Dormant means source-preserved but not fully resolved.
```

---

## 4. Revised View Hierarchy

WorldWright should have:

```text
Globe / Macro View
Micro Tile Mode
Metadata-rich clay stickers
Export / Handoff packages
```

It should not have a mandatory deep city editor inside Micro Tile Mode.

### 4.1 Globe / Macro View

Purpose:

```text
planet navigation
continent editing
world-scale systems
countries/kingdoms/cultures
major rivers
major roads/trade routes
settlement distribution
simulation overview
```

Graphics requirement:

```text
decent
readable
beautiful enough for world navigation
not close-up quality
not Unreal-level
```

### 4.2 Micro Tile Mode

Purpose:

```text
selected local overhead area map
micro terrain review
local roads/rivers/coasts
local terrain stickers
settlement/site markers
heightmap export unit
metadata export unit
```

Micro Tile Mode may show a city/town/settlement as:

```text
marker
label
approximate radius
connection hints
status icon
metadata inspector
export readiness
```

Micro Tile Mode should not be required to show:

```text
individual buildings
full animated city layout
full district detail
full population behavior
```

### 4.3 Settlement / City Sticker

A settlement/city sticker is a world anchor.

It is not a full city layout.

It stores:

```text
location
size
role
population tier
culture/faction
terrain context
connections
simulation proxy
export intent
handoff readiness
```

### 4.4 City Maker Handoff

A city sticker may optionally create a handoff package.

That package can be opened by:

```text
future WorldWright City Maker
Unreal import pipeline
custom external tool
```

---

## 5. Settlement Sticker Data Contract

A settlement/city sticker should be lightweight but information-rich.

```ts
interface SettlementSticker {
  id: string;
  type: 'SETTLEMENT';

  name: string;

  parentWorldId: string;
  parentMicroTileId?: string;

  location: WorldPosition;
  approximateRadiusMeters: number;

  settlementKind:
    | 'HAMLET'
    | 'VILLAGE'
    | 'TOWN'
    | 'CITY'
    | 'CAPITAL'
    | 'FORTRESS'
    | 'HARBOR'
    | 'RUINED_SETTLEMENT'
    | 'SACRED_SETTLEMENT'
    | 'MILITARY_OUTPOST'
    | 'NOMAD_CAMP';

  populationTier:
    | 'NONE'
    | 'TINY'
    | 'SMALL'
    | 'MEDIUM'
    | 'LARGE'
    | 'HUGE'
    | 'MEGACITY';

  roleTags: SettlementRoleTag[];
  cultureId?: string;
  factionId?: string;
  regionId?: string;

  terrainContext: SettlementTerrainContext;
  connections: SettlementConnections;
  simProxy: SettlementSimProxy;
  exportIntent: SettlementExportIntent;

  notes?: string;
}
```

### 5.1 Settlement Terrain Context

```ts
interface SettlementTerrainContext {
  elevationMeters?: number;
  averageSlope?: number;
  minSlope?: number;
  maxSlope?: number;

  waterAccess?: boolean;
  riverAccess?: boolean;
  lakeAccess?: boolean;
  coastAccess?: boolean;
  harborSuitability?: number;

  roadAccess?: boolean;
  passAccess?: boolean;
  tradeRouteAccess?: boolean;

  floodRisk?: number;
  landslideRisk?: number;
  droughtRisk?: number;
  stormExposure?: number;

  nearbyBiomeIds?: string[];
  nearbyResourceIds?: string[];
}
```

### 5.2 Settlement Connections

```ts
interface SettlementConnections {
  roadIds?: string[];
  riverIds?: string[];
  tradeRouteIds?: string[];
  harborRouteIds?: string[];
  nearbyStickerIds?: string[];
  controllingRegionId?: string;
  neighboringSettlementIds?: string[];
}
```

### 5.3 Settlement Sim Proxy

```ts
interface SettlementSimProxy {
  populationEstimate?: number;
  growthPressure?: number;
  declinePressure?: number;
  tradeImportance?: number;
  militaryImportance?: number;
  culturalImportance?: number;
  religiousImportance?: number;
  unrestRisk?: number;
  disasterRisk?: number;
  lastResolvedTick?: number;
}
```

### 5.4 Settlement Export Intent

```ts
interface SettlementExportIntent {
  includeInWorldMetadataExport: boolean;
  includeInMicroTileExport: boolean;
  canCreateCityMakerHandoff: boolean;

  suggestedDownstreamUse:
    | 'BACKGROUND_LOCATION'
    | 'CITY_SITE'
    | 'HARBOR_SITE'
    | 'FORTRESS_SITE'
    | 'RUIN_SITE'
    | 'SPAWN_AREA'
    | 'QUEST_LOCATION'
    | 'TRADE_NODE'
    | 'CULTURE_CENTER'
    | 'CUSTOM';

  unrealTag?: string;
  cityMakerTemplateHint?: string;
  exportScaleHint?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'CUSTOM';
}
```

---

## 6. Micro Tile Export Contract

A micro tile can export terrain and world context.

It may include settlement stickers, but it should not need to include full city layout.

Example export package:

```text
Elmsreach_Coast_Tile/
  terrain/
    height.r16
    height.png
    water_mask.png
    slope_mask.png
    surface_mask.png
    unreal_landscape.json

  vectors/
    rivers.json
    roads.json
    coastline.json
    region_edges.json

  stickers/
    stickers.json
    settlements.json
    landmarks.json
    resources.json

  context/
    world_context.json
    tile_context.json
    culture_context.json
    faction_context.json

  reports/
    loss_report.json
    diagnostics.json
```

A settlement inside `settlements.json` should be a metadata object, not a full designed city.

Example:

```json
{
  "id": "settlement_elmsreach",
  "type": "SETTLEMENT",
  "name": "Elmsreach",
  "kind": "HARBOR",
  "populationTier": "MEDIUM",
  "approximateRadiusMeters": 850,
  "roleTags": ["port", "market", "river-mouth", "regional-trade"],
  "terrainContext": {
    "coastAccess": true,
    "riverAccess": true,
    "roadAccess": true,
    "harborSuitability": 0.82,
    "floodRisk": 0.32
  },
  "exportIntent": {
    "unrealTag": "WW_SETTLEMENT_HARBOR",
    "suggestedDownstreamUse": "CITY_SITE",
    "canCreateCityMakerHandoff": true
  }
}
```

---

## 7. City Maker Handoff Package

A settlement sticker may create a separate City Maker handoff package.

This should happen only when the user chooses:

```text
Create City Maker Handoff
Open in City Maker
Export for City Builder
Export City Context for Unreal
```

The package should include enough information for a downstream tool to create the city while preserving WorldWright context.

Example:

```text
Elmsreach_CityMaker_Handoff/
  city_context.json
  source_settlement_sticker.json
  local_height_crop.r16
  local_height_crop.png
  local_water_mask.png
  local_slope_mask.png
  local_surface_mask.png
  connection_edges.json
  roads_in.json
  rivers_in.json
  culture_context.json
  faction_context.json
  world_reference.json
  handoff_manifest.json
```

### 7.1 Handoff Manifest

```ts
interface CityMakerHandoffManifest {
  schemaVersion: string;
  sourceWorldId: string;
  sourceMicroTileId: string;
  sourceSettlementStickerId: string;

  cityName: string;
  settlementKind: string;
  approximateRadiusMeters: number;

  files: {
    cityContext: string;
    settlementSticker: string;
    heightCrop?: string;
    waterMask?: string;
    slopeMask?: string;
    surfaceMask?: string;
    roadsIn?: string;
    riversIn?: string;
    connectionEdges?: string;
    cultureContext?: string;
    factionContext?: string;
  };

  coordinateSystem: HandoffCoordinateSystem;
  scale: HandoffScale;
  lossReport: string;
}
```

### 7.2 City Context

```ts
interface CityContextForHandoff {
  cityName: string;
  location: WorldPosition;
  localFrame: TileLocalFrame;

  settlementKind: string;
  populationTier: string;
  roleTags: string[];

  terrain: {
    elevationRangeMeters?: [number, number];
    averageSlope?: number;
    harborSuitability?: number;
    floodRisk?: number;
    buildableAreaEstimate?: number;
  };

  connections: {
    incomingRoads: HandoffConnection[];
    incomingRivers: HandoffConnection[];
    harborAccess?: HandoffConnection[];
    tradeRoutes?: HandoffConnection[];
  };

  culturalContext?: {
    cultureId?: string;
    factionId?: string;
    regionId?: string;
    styleHints?: string[];
  };

  suggestedCityMakerInputs?: {
    templateHint?: string;
    expectedDistricts?: string[];
    wallLikely?: boolean;
    harborLikely?: boolean;
    fortressLikely?: boolean;
    marketLikely?: boolean;
  };
}
```

---

## 8. Handoff Height Crop

A settlement sticker may export a local height crop for City Maker or Unreal.

This crop is not a whole micro tile unless requested.

It is a local terrain sample centered on or bounded around the settlement sticker.

Rules:

```text
The crop must include scale metadata.
The crop must include world position metadata.
The crop must include min/max height encoding metadata.
The crop must include sea level metadata.
The crop must include source tile ID and source settlement sticker ID.
The crop must say whether it is raw generated terrain, sticker-influenced terrain, or export-resolved terrain.
```

Example sidecar:

```json
{
  "sourceWorldId": "world_caelora",
  "sourceMicroTileId": "F2-L8-X103-Y044",
  "sourceSettlementStickerId": "settlement_elmsreach",
  "heightEncoding": "uint16-linear",
  "width": 1009,
  "height": 1009,
  "metersPerPixel": 2.0,
  "minMeters": -30.0,
  "maxMeters": 220.0,
  "seaLevelMeters": 0.0,
  "localOriginMeters": [0, 0],
  "worldPosition": {
    "lat": 42.1,
    "lon": -87.3
  },
  "terrainSource": "MICRO_TILE_RESOLVED_WITH_STICKER_CONTEXT"
}
```

This makes the city handoff compatible with Unreal or a future City Maker without forcing WorldWright to design the city.

---

## 9. Unreal Compatibility Intent

WorldWright should export data that Unreal can use, but WorldWright should not become an Unreal editor.

WorldWright Unreal-facing exports should include:

```text
heightmaps
water masks
slope masks
surface masks
roads/rivers as vector data
settlement metadata
landmark metadata
resource metadata
culture/faction context
export sidecars
loss reports
```

Unreal or an Unreal-side importer can use that data to:

```text
create a landscape
place placeholder markers
create PCG volumes
create actor spawn points
create population zones
create road/river splines
place landmarks
assign biome/surface materials
```

WorldWright should provide intent. Unreal should provide realization.

---

## 10. City Maker as Separate Compatible Product

A future City Maker should be able to operate in two ways.

### 10.1 Standalone Mode

City Maker can create cities without WorldWright.

It may ask for:

```text
terrain or flat base
city type
culture style
population size
road inputs
water inputs
walls/harbor/fortress needs
export target
```

This makes City Maker viable by itself.

### 10.2 WorldWright-Compatible Mode

City Maker can import a WorldWright handoff package.

It receives:

```text
settlement sticker metadata
local height crop
local water/slope/surface masks
roads/rivers entering the site
world/culture/faction context
scale and coordinate metadata
export target hints
```

Then it can produce:

```text
city layout
streets
districts
building zones
population zones
Unreal actor metadata
City Maker project file
Unreal import package
```

This modular design spreads processing load and keeps each product focused.

---

## 11. Save/Load Rules

WorldWright save files must preserve:

```text
settlement sticker metadata
settlement location
settlement approximate size
settlement role tags
settlement sim proxy
settlement export intent
whether a City Maker handoff exists
handoff package reference, if any
handoff source hash
last exported timestamp
```

WorldWright save files should not need to preserve:

```text
full city layout
building list
NPC placement
city interior animation state
Unreal actor graph
```

If a City Maker handoff exists, WorldWright stores the relationship, not necessarily the whole city project.

```text
WorldWright knows that Elmsreach has a City Maker project.
WorldWright does not have to load the Elmsreach city project during normal globe or micro tile work.
```

---

## 12. Sim Behavior

Sim Mode should treat settlement stickers as macro/micro proxies.

A dormant settlement sticker may change by summary:

```text
population grows
population declines
trade importance increases
risk increases
faction changes
status becomes ruined
harbor importance changes
road connection improves
```

Sim Mode should not require a detailed city layout to exist.

If a City Maker handoff exists, Sim Mode may mark it stale:

```text
CITY_CONTEXT_CHANGED
POPULATION_PROXY_CHANGED
FACTION_CHANGED
ROAD_CONNECTION_CHANGED
TERRAIN_CONTEXT_CHANGED
EXPORT_STALE
```

But Sim Mode must not silently rewrite the external City Maker project.

Rule:

```text
WorldWright may update settlement metadata.
WorldWright may mark a city handoff stale.
WorldWright may suggest regeneration.
WorldWright must not silently overwrite external city design work.
```

---

## 13. Export Rules

WorldWright exports must declare what is included.

### 13.1 WorldWright Export May Include

```text
terrain heightmaps
micro tile data
settlement stickers
city/settlement metadata
local height crop
roads/rivers/coasts
culture/faction context
simulation proxy summaries
```

### 13.2 WorldWright Export Must Not Pretend To Include

```text
full city design
final buildings
final city roads
NPC behavior
Unreal actor placement
animated population
close-up city visuals
```

unless those are explicitly imported from a City Maker project or Unreal-side package.

### 13.3 Loss Report

If exporting to a target that cannot preserve metadata, WorldWright must report loss.

Example:

```text
This export includes terrain heightmap and water mask.
Settlement metadata was not included in this target format.
City Maker handoff data was not included.
```

No silent loss.

---

## 14. Diagnostics

Required diagnostics:

```text
settlementStickerCount
settlementStickerMetadataCompleteness
settlementTerrainContextCompleteness
settlementConnectionCompleteness
settlementExportIntentCompleteness
cityMakerHandoffCompleteness
cityMakerHandoffStaleCount
heightCropValidity
heightCropScaleMetadataPresent
heightCropSourceReferencePresent
unrealExportIntentCoverage
externalProjectReferenceIntegrity
simProxySettlementCoverage
```

Failure thresholds should eventually cover:

```text
settlement sticker lacks location
settlement sticker lacks approximate size
settlement sticker lacks export intent
height crop lacks scale metadata
height crop lacks source tile/sticker reference
handoff package lacks manifest
handoff package does not identify source world
handoff package silently omits loss report
WorldWright attempts to store full city design inside normal micro tile data
```

---

## 15. Tests

Required tests:

```text
settlement sticker serializes/deserializes
settlement sticker survives save/load
settlement metadata export includes required fields
micro tile export includes settlement metadata
city handoff package includes manifest
height crop sidecar includes scale and source IDs
loss report is emitted when city metadata is omitted
sim proxy updates settlement without requiring city layout
city handoff can be marked stale without mutating external project
WorldWright does not require full city data to load globe or micro tile
```

---

## 16. Failure Modes

Forbidden failure modes:

```text
WorldWright becomes a full city editor by accident.
Micro Tile Mode requires building-level city data.
Opening a micro tile loads every city project.
Settlement sticker has only a label and no useful metadata.
Settlement metadata cannot be exported.
City Maker handoff lacks terrain scale.
City Maker handoff lacks source world/tile/sticker ID.
Sim Mode silently overwrites external city work.
Unreal export claims to include city detail that is not actually present.
External City Maker project becomes disconnected from its source WorldWright sticker.
```

Most important failure:

```text
WorldWright loses focus and tries to solve city construction before it has solved world construction.
```

---

## 17. Forbidden Shortcuts

```text
Do not put full city design inside baseline WorldWright Micro Tile Mode.
Do not require a city layout for a city sticker to exist.
Do not make city metadata an unstructured notes blob only.
Do not export a height crop without scale and source metadata.
Do not silently break the relationship between a settlement sticker and City Maker handoff.
Do not let Sim Mode mutate external city design without explicit user action.
Do not make Unreal compatibility depend on hidden assumptions.
Do not treat city design as required for world simulation.
Do not store final Unreal-only assets as WorldWright canonical world truth.
```

---

## 18. Readiness Criteria

This architecture is blueprint-ready when WorldWright can define:

```text
settlement sticker metadata contract
micro tile export contract
height crop sidecar format
City Maker handoff manifest
external project reference model
Sim proxy behavior for settlements
stale handoff behavior
loss report requirements
Unreal export intent fields
failure modes and diagnostics
```

Implementation is ready when:

```text
WorldWright can place a settlement sticker.
The sticker stores location, size, role, terrain context, and export intent.
The sticker survives save/load.
A micro tile export can include the settlement metadata.
A city handoff package can be generated from the settlement sticker.
The package includes height crop, sidecar metadata, context, and manifest.
WorldWright can reopen without loading the full external city project.
```

Product readiness is reached only when:

```text
WorldWright remains focused on world generation and world metadata.
City design remains optional and modular.
The user can export terrain and city intent without losing context.
External tools can use the handoff without guessing scale, location, or meaning.
```

---

## 19. Summary Law

```text
WorldWright should not build every city.
WorldWright should know where cities are, why they exist, what they mean, what terrain they sit on, and how external tools should use them.

City construction should be modular.
A future City Maker can stand alone, but it should also accept WorldWright settlement stickers, height crops, context metadata, and export intent.

This spreads processing load, protects WorldWright scope, and keeps the world source of truth clean.
```
