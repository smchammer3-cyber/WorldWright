# Wave 6 — Specialized Surface Systems

## Goal

Add glaciers, wind, coasts, and karst only after the core material, water, climate, and sediment systems exist.

## C22 — Glacial, periglacial, meltwater, and rebound system

### Purpose

Add ice flow, selective erosion/preservation, deposits, meltwater, permafrost, and load response.

### Add

- internal deformation, sliding, and ice-stream classes;
- cold-, warm-, and polythermal basal state;
- abrasion, quarrying, and preservation fields;
- valley glaciers, ice sheets, outlets, cirques, overdeepenings, and fjords;
- till, moraines, drumlins, eskers, outwash, and marine/lake deposits;
- subglacial lakes, channels, and outbursts;
- glacioisostatic depression and rebound;
- permafrost, active layer, thermokarst, and thaw failures;
- Mars-like and gravity/atmosphere branches.

### Done when

- cold-based ice can preserve terrain;
- retreat routes water and sediment and updates load;
- fjords require excavation plus inundation history;
- rebound requires prior loading;
- no universal U-valley filter is used.

## C23 — Aeolian, dust, and arid-land system

### Purpose

Add atmosphere-dependent threshold transport and directional landforms.

### Add

- initiation and cessation thresholds;
- saltation, reptation, and suspension;
- sediment supply, grain class, cohesion, moisture, frost, and crust state;
- directional wind-transport history;
- dune identity, migration, interaction, coarsening, stabilization, and reactivation;
- deflation, lag, blowouts, yardangs, dust, and loess;
- river, playa, coast, glacier, volcanic, and impact sediment handoffs;
- Earth, Mars, Titan, Venus-candidate, locked-world, and airless branches.

### Done when

- dunes require atmosphere and mobile sediment;
- dune forms derive from wind distribution and supply;
- deflated material enters a ledger destination;
- no repeated tiles or global parallel texture appear;
- ordinary aeolian systems remain disabled on airless worlds.

## C24 — Coastal, tidal, storm, and reef system

### Purpose

Add evolving shorelines after structural margin, water, climate, and sediment exist.

### Add

- reduced wave climate and exposure/fetch;
- coastal sediment-cell graph;
- cross-shore and alongshore transport;
- beaches, shorefaces, barriers, inlets, estuaries, cliffs, and terraces;
- tides from basin/orbital geometry approximation;
- storms, surge, overwash, breach, and recovery;
- tsunami hooks from impacts, landslides, and volcanism;
- optional reef, carbonate, and biogenic construction;
- growth versus drowning, burial, and erosion;
- glacial, volcanic, tectonic, waterworld, exotic-fluid, and gravity branches.

### Done when

- beaches are not fixed-width bands;
- barriers require sediment and can migrate, breach, or drown;
- cliff retreat routes debris;
- tides are not globally constant;
- reefs are optional and physically constrained;
- shoreline change separates inundation from morphological change.

## C25 — Groundwater, karst, caves, and collapse system

### Purpose

Complete coupled surface–subsurface hydrology and soluble-material landscapes.

### Add

- refined groundwater storage and flow;
- soluble material and fluid-chemistry classes;
- recharge, conduit, cave-level, spring, and resurgence graphs;
- losing and gaining rivers;
- underground capture and piracy;
- solution, subsidence, cover-collapse, and bedrock-collapse sinkholes;
- sediment plugging and piping;
- void support and collapse material;
- dissolved mass export and precipitation hooks;
- coastal, drowned, fossil, evaporite, and bounded exotic branches;
- lookalike diagnostics for lava tubes, thermokarst, impact pits, and volcanic pits.

### Done when

- disappearing water has a destination;
- caves connect recharge, storage, and outlets;
- collapse requires void/support state and displaced material;
- dissolution differs by material and fluid;
- shape alone never assigns karst.

## Wave 6 gate

Proceed only when:

- each specialized module consumes existing causal state rather than inventing its own terrain;
- atmosphere, water, ice, material, and gravity permissions are respected;
- material and water handoffs balance;
- active, fossil, buried, and reactivated states are supported;
- procedural stamps and textures are absent.