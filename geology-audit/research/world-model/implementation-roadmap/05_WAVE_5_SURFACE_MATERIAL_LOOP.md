# Wave 5 — Core Surface-Material Loop

## Goal

Create weathered/mobile material, evolving drainage, and source-to-sink deposition so erosion cannot delete terrain without consequences.

## C19 — Weathering, regolith, hillslopes, and mass wasting

### Purpose

Create mobile material before rivers, wind, ice, or coasts transport it.

### Add

- physical and chemical weathering state;
- parent material and regolith layers;
- strength, cohesion, permeability, and fracture state;
- regolith production, burial, and stripping;
- creep and nonlinear slope transport;
- landslide source, runout, deposit, and dam records;
- debris-flow material class;
- solid-material ledger entries;
- process branches for humid, arid, cold, airless, dense-hot, and gravity variants.

### Done when

- weathering changes physical state, not only color;
- landslide scars have displaced material and deposits;
- incompatible planetary processes remain disabled;
- no uniform terrain blur is used.

## C20 — Drainage, lakes, river incision, and mutable basins

### Purpose

Replace one-pass lowest-neighbor rivers with stable and evolving drainage topology.

### Add

- basin and divide graph;
- depression, lake, and spill policy;
- runoff and discharge regimes;
- perennial, intermittent, and ephemeral state;
- bedrock versus alluvial channels;
- incision thresholds;
- sediment tools and cover;
- channel profiles and knickpoints;
- divide migration and capture;
- lake and dam breach events;
- water and sediment transfer;
- paleodrainage and abandoned channels;
- internal drainage.

### Rules

- rivers may follow, alter, or inherit terrain;
- not every basin must reach an ocean;
- current climate cannot explain every fossil river;
- stream-power relations are bounded approximations, not canyon stamps.

### Done when

- capture updates discharge and sediment routing;
- lake spills and breaches conserve water and material;
- internal basins are valid;
- topology remains stable across seam and poles;
- rivers are not draped over a completed surface.

## C21 — Sediment routing, basins, floodplains, fans, and deltas

### Purpose

Close the source-to-sink material loop.

### Add

- broad grain/material classes;
- supply versus transport capacity;
- sediment tools/cover behavior;
- storage reservoirs and residence state;
- sorting, abrasion, and mixing;
- floodplain/channel migration and terraces;
- accommodation and basin fill;
- compaction and burial;
- alluvial fan apex, lobes, and valid radiality;
- delta channels, avulsion, lobe switching, abandonment, and drowning;
- shelf and deep-sea handoff;
- dissolved, exported, and subducted fractions.

### Conservation

```text
material released from source
≈ mobile storage
+ preserved deposits
+ dissolved material
+ exported/subducted fraction
```

### Done when

- erosion cannot occur without a ledger destination;
- sediment can increase or suppress bedrock incision;
- fans and deltas require sources, accommodation, and evolving pathways;
- basin filling is not generic flattening;
- storage delays and transforms signals;
- sediment residuals remain within approved tolerance.

## Wave 5 gate

Proceed only when:

- weathering produces explicit mobile material;
- landslides conserve source and deposit mass;
- drainage is stable, mutable, and history-aware;
- sediment is routed through storage to real sinks;
- fan/delta radiality has causal provenance;
- erosion and deposition close the material loop.