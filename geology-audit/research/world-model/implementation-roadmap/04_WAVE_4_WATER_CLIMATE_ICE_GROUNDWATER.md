# Wave 4 — Water, Climate, Ice, and Groundwater

## Goal

Separate solid geology from water, atmosphere, climate, ice, and groundwater before surface erosion and deposition begin.

## C16 — Structural bathymetry and physical water-volume solve

### Purpose

Replace depth-class geology and quantile-selected sea level in the causal pipeline.

### Add

- ocean-basin identity from crustal history;
- ridge age and thermal-subsidence baseline;
- trench, plateau, seamount, fracture-zone, flexural, and dynamic departures;
- basement versus sediment-surface separation;
- connected-ocean and isolated-basin graph;
- spill and merge elevations;
- water-volume allocation;
- physical water-surface solution;
- derived depth and exposure;
- adapter translating land/ocean user intent into premise and water budget.

### Preserve

- legacy quantile sea level in `LEGACY` mode;
- current UI parameter through a compatibility adapter.

### Done when

- depth cannot assign canonical ridge/trench/shelf identity;
- changing water volume changes exposure coherently;
- isolated basins fill and spill correctly;
- water ledger closes;
- no shelf halo or submerged continent ghost appears.

## C17 — Atmosphere and reduced climate forcing

### Purpose

Create geological climate forcing and process permissions without attempting a full general circulation model.

### Add

- atmosphere pressure, density, and composition;
- temperature and seasonality;
- precipitation and rain/snow partition;
- directional wind distribution;
- storm and extreme-event classes;
- evaporation/aridity;
- freeze–thaw and permafrost climate state;
- orographic precipitation and rain shadows from moisture pathways and topography;
- present and formation-climate epoch records;
- explicit process permissions and prohibitions.

### Rules

- climate does not directly write terrain;
- current climate does not erase formation-climate history;
- atmosphere controls whether rivers, dunes, snow, glaciers, or ordinary surface liquids are possible.

### Done when

- airless worlds cannot enable ordinary rainfall or wind dunes;
- rain shadows respond to wind, moisture, and barrier geometry;
- tidally locked and exotic branches retain confidence labels;
- no terrain changes are written directly by climate fields.

## C18 — Hydrosphere, cryosphere, lakes, and groundwater foundation

### Purpose

Add water, ice, and groundwater reservoirs and initial flow state before erosion begins.

### Add

- connected oceans and isolated lakes;
- lake storage, spill, and breach placeholders;
- groundwater recharge, storage, and potential;
- land ice, sea ice, and ice-shell records;
- ice accumulation and ablation;
- ice thickness and flow skeleton;
- grounded/floating state;
- basal thermal and hydrologic state;
- water transfer among oceans, lakes, groundwater, ice, atmosphere, and interior approximations;
- ice/load ledger and rebound hooks.

### Out of scope

- detailed glacial erosion;
- river incision;
- sediment transport;
- karst conduit growth;
- coastal morphodynamics.

### Done when

- water and ice ledgers close;
- a glacier requires accumulation and mass balance, not temperature alone;
- groundwater exchanges with surface reservoirs through explicit transactions;
- no erosion/deposition is silently performed.

## Wave 4 gate

Proceed only when:

- bedrock and sediment surface are distinct;
- water occupancy derives from volume and topology;
- climate controls process permissions without painting terrain;
- ice has mass, geometry, flow, and basal state;
- groundwater is a real reservoir;
- all relevant ledgers balance.