# Glacial, periglacial, and glacioisostatic systems

## Research status

- **Domain IDs:** S06, linked to F01, F06–F08, V01–V03, O01–O05, S01–S05, X01–X04, H01–H06
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Generator implementation:** DEFERRED UNTIL STAGE 1 RESEARCH COMPLETION
- **Purpose:** define ice as a flowing, eroding, depositing, loading, and climate-sensitive material system rather than a white mask or generic valley-carving filter.

## 1. Central rule

Glacial landscapes emerge from coupled ice mass, flow, thermal state, erosion, sediment transport, deposition, meltwater, and crustal response.

```text
climate / topography / moisture supply
→ snow accumulation and ice formation
→ ice flow and basal thermal state
→ abrasion, quarrying, deformation, and meltwater erosion
→ sediment transport and deposition
→ loading, flexure, and isostatic depression
→ retreat, rebound, lake formation, drainage reorganization, and inherited landforms
```

Ice both responds to terrain and changes it.

## 2. Ice mass balance and geometry

A glacier or ice sheet requires:

- accumulation;
- ablation;
- ice thickness;
- surface slope;
- basal boundary conditions;
- flow law/rheology;
- thermal state;
- ocean or lake contact where present.

Mass balance may vary through:

- latitude and elevation;
- orographic snowfall;
- rain/snow partition;
- temperature and seasonality;
- wind redistribution;
- sublimation;
- calving;
- basal melting;
- debris cover;
- volcanic or geothermal heat.

### Generator obligation

WorldWright eventually needs:

- accumulation and ablation fields;
- ice thickness and age;
- ice-surface elevation;
- flow direction and speed class;
- grounded, floating, or detached state;
- thermal state at the base;
- advance/retreat history;
- calving or sublimation branch.

A glacier cannot be generated from temperature alone.

## 3. Ice flow

Ice moves through combinations of:

- internal deformation;
- basal sliding;
- deformation of subglacial sediment;
- flow through outlet valleys;
- ice-stream localization;
- floating shelf flow.

Flow depends on:

- thickness;
- surface slope;
- temperature;
- basal water pressure;
- bed roughness;
- substrate strength;
- lateral confinement;
- buttressing;
- gravity.

### Important consequence

The same ice thickness can produce very different erosion and landforms depending on whether the bed is frozen, temperate, water-lubricated, deformable, or floating.

## 4. Basal thermal state

### Cold-based ice

Potential behavior:

- frozen to bed;
- limited sliding;
- low erosion;
- preservation of preglacial landscapes;
- burial beneath ice without major reshaping.

### Warm/temperate-based ice

Potential behavior:

- basal sliding;
- meltwater;
- stronger abrasion and quarrying;
- sediment deformation;
- efficient valley deepening and widening;
- tunnel-channel formation.

A cold climate does not guarantee high glacial erosion. Ice may preserve ancient relief when its base remains frozen.

## 5. Glacial erosion

Major processes include:

- abrasion by debris-rich basal ice;
- quarrying/plucking along fractures;
- subglacial fluvial erosion;
- deformation and evacuation of sediment;
- freeze-on and entrainment;
- rockfall and supraglacial debris delivery.

Erosion depends on:

- basal sliding speed;
- effective pressure;
- debris availability;
- rock fracture and lithology;
- ice thickness;
- thermal state;
- water drainage;
- duration and repeated occupation.

A simple sliding-speed erosion law can be useful, but it cannot by itself determine valley shape.

## 6. Valley glaciers

Potential forms:

- U-shaped valleys;
- hanging valleys;
- truncated spurs;
- overdeepened basins;
- rock steps and thresholds;
- cirques;
- arêtes and horns;
- fjords;
- valley-side trimlines;
- moraines and outwash.

### Why valleys widen and deepen unevenly

Controls include:

- tributary ice input;
- bedrock strength and structure;
- ice convergence;
- basal water;
- preglacial valley geometry;
- repeated glacial cycles;
- erosion concentrated near equilibrium-line and confluence zones in some settings;
- postglacial fluvial and hillslope modification.

Procedural warning:

- converting every V-shaped valley into the same U-shaped cross section is invalid.

## 7. Cirques, arêtes, and alpine relief

Cirques form through localized snow/ice accumulation, frost processes, basal sliding, quarrying, and headwall retreat.

Potential consequences:

- amphitheater-shaped basins;
- threshold lips;
- tarns;
- sharp arêtes between cirques;
- horns where several cirques intersect;
- asymmetric development due to aspect, wind, snowfall, and structure.

Cirques can enlarge during glacial and deglacial phases and may remain fossil under a warmer later climate.

## 8. Ice sheets and selective erosion

Large ice sheets do not uniformly plane continents.

Possible behavior:

- strong erosion in fast-flowing outlet corridors;
- preservation under cold-based interiors;
- stripping of regolith in some regions;
- retention of ancient surfaces in others;
- overdeepened basins;
- streamlined bedrock and sediment landforms;
- broad sediment dispersal;
- repeated reuse of inherited valleys and weak zones.

### Generator obligation

Represent:

- spatially variable basal thermal state;
- ice-stream corridors;
- erosion versus preservation zones;
- sediment entrainment and deposition;
- inherited bed control.

## 9. Fjords and glaciated margins

Fjords are glacially deepened valleys later occupied by water.

Potential architecture:

- deep inner basins;
- shallower thresholds/sills;
- hanging tributary valleys;
- steep walls;
- submerged moraines;
- sediment-rich inner basins;
- delta and fan infill;
- isostatically tilted shorelines.

A fjord is not simply a narrow flooded valley. It requires glacial excavation and later inundation history.

## 10. Subglacial hydrology

Water may move through:

- distributed films and linked cavities;
- channels cut into ice or substrate;
- subglacial lakes;
- tunnel valleys;
- seasonal drainage reorganizations;
- catastrophic outburst floods.

Water affects:

- basal sliding;
- effective pressure;
- erosion;
- sediment transport;
- ice-stream activation;
- lake drainage;
- downstream flooding.

A drainage system can reorganize rapidly and should not be treated as a static river network beneath ice.

## 11. Glacial sediment transport

Ice transports material:

- at the bed;
- within the ice;
- on the surface;
- through meltwater;
- by iceberg rafting;
- through mass wasting from valley walls.

Potential deposits:

- till;
- lodgement/deformation till;
- moraines;
- drumlins;
- eskers;
- kames;
- outwash plains;
- glaciolacustrine deposits;
- glaciomarine muds;
- ice-rafted debris;
- trough-mouth fans.

### Conservation requirement

```text
glacially eroded and entrained material
≈ stored in ice
+ subglacial deposits
+ moraines/outwash/lakes
+ marine export
+ remobilized river/coastal sediment
```

## 12. Moraines and ice-margin deposits

Moraines may record:

- stable margins;
- readvance;
- retreat pauses;
- surges;
- debris-rich ice;
- calving-front behavior;
- topographic pinning.

They are often discontinuous, overridden, eroded, reworked, or buried.

A continuous clean ridge around every former ice margin is invalid.

## 13. Streamlined subglacial landforms

Potential forms include:

- drumlins;
- flutes;
- mega-scale glacial lineations;
- roche moutonnée;
- crag-and-tail forms;
- lineated till plains.

These reflect flow direction, substrate, sediment deformation, erosion, and ice-stream history.

Directional fabric is causal evidence and must not become generic parallel texture.

## 14. Glacial lakes and outburst floods

Ice and moraines can dam water, creating:

- proglacial lakes;
- ice-marginal lakes;
- subglacial lakes;
- moraine-dammed lakes;
- lake basins in overdeepened valleys.

Failure can produce:

- catastrophic spillways;
- scabland-style erosion;
- giant bars and flood deposits;
- drainage capture;
- rapid lake-level fall;
- downstream sediment pulses.

Water and sediment must be routed through the breach event.

## 15. Glacioisostasy and flexure

Large ice loads depress the lithosphere and mantle response continues after melting.

Potential consequences:

- depressed crust under ice;
- peripheral forebulge;
- altered relative sea/lake level;
- postglacial rebound;
- tilted shorelines;
- river-gradient changes;
- fault reactivation;
- marine transgression followed by regression;
- basin and coastline reorganization.

The response depends on:

- load geometry and history;
- lithosphere strength;
- mantle viscosity;
- sediment and water loads;
- deglaciation rate.

Ice volume transfer and vertical land motion must remain separate contributions to relative sea level.

## 16. Periglacial systems

Periglacial processes can operate with or without glaciers.

Potential processes:

- frost cracking;
- freeze–thaw weathering;
- solifluction/gelifluction;
- frost heave;
- cryoturbation;
- ice-wedge growth;
- thermokarst;
- thaw slumps;
- rock glaciers;
- patterned ground;
- nivation;
- seasonal active-layer dynamics.

### Required distinction

- permafrost is long-term frozen ground;
- an active layer thaws seasonally;
- ground ice can deform or collapse terrain;
- thermokarst is ice-loss subsidence, not carbonate karst.

## 17. Permafrost degradation

Thaw can produce:

- subsidence;
- thaw lakes;
- retrogressive thaw slumps;
- gullying;
- sediment and carbon release;
- drainage integration or disruption;
- slope failure;
- coastal retreat.

A warming climate does not merely remove a frozen-material label; it can create new relief and sediment pulses.

## 18. Glacial buzzsaw and mountain-height limits

Glacial erosion may limit or reorganize mountain relief in some climates and tectonic settings, but the universal “buzzsaw” hypothesis is not established.

The outcome depends on:

- uplift rate;
- equilibrium-line altitude;
- ice flux;
- valley geometry;
- bedrock resistance;
- basal thermal state;
- postglacial erosion;
- preservation of nonglacial summit surfaces.

WorldWright must retain multiple branches:

- effective glacial relief limitation;
- valley-focused incision without summit planation;
- selective preservation under cold ice;
- tectonic uplift outrunning glacial modification.

## 19. Planetary-regime branches

### Earthlike rocky glaciers

Water ice flows over bedrock/regolith with atmosphere-driven accumulation and melt.

### Mars-like cold-based and debris-covered ice

Potential forms:

- lobate debris aprons;
- lineated valley fill;
- pedestal craters;
- buried ice;
- sublimation-modified surfaces;
- long-lived periglacial cycles;
- fossil glacial landforms under current aridity.

### Low-gravity branch

- altered ice stress and thickness/flow relationship;
- potentially thicker relief-supporting ice masses;
- different sediment settling and outburst behavior;
- atmosphere and sublimation may dominate preservation.

### High-gravity branch

- stronger driving stress for given thickness/slope;
- different stable ice thickness and basal pressure;
- stronger loading/isostatic response;
- flow and erosion require gravity-aware scaling.

### Thin-atmosphere branch

- sublimation may dominate ablation;
- snowfall may be sparse or episodic;
- debris cover can protect ice;
- liquid meltwater may be transient.

### Ice-shell worlds

Global ice shells require separate tidal/fracture/convection mechanics. Surface glacier analogies apply only where mobile surface ice, mass wasting, plume fallout, or meltwater systems are physically supported.

## 20. Multiscale visual obligations

### Planetary scale

- ice-sheet extent and flow sectors;
- erosion versus preservation provinces;
- glacioisostatic depression and forebulge;
- major sediment dispersal and sea-level effects;
- fossil glacial terrain after climate transition.

### Continental scale

- outlet-glacier networks;
- fjords and troughs;
- overdeepened basins;
- glacial lakes;
- morainal belts;
- outwash plains;
- trough-mouth fans.

### Regional scale

- U-shaped valleys;
- cirques;
- hanging valleys;
- drumlin/lineation fields;
- eskers;
- meltwater channels;
- thaw landscapes.

### Local scale

- striations;
- roche moutonnée;
- patterned ground;
- ice wedges;
- moraine ridges;
- kettle holes;
- thaw scarps;
- till and outwash textures.

## 21. Generator obligation specification

### Canonical state required

- ice mass identity and age;
- accumulation/ablation history;
- ice thickness and surface;
- flow field and speed class;
- basal thermal/hydrologic state;
- erosion/preservation field;
- entrained sediment and deposits;
- margin and moraine history;
- glacial lake and outburst events;
- crustal loading and rebound state;
- permafrost/ground-ice distribution;
- current versus formation climate;
- inherited/fossil glacial landforms.

### Required process fields

- snow/ice mass balance;
- ice deformation/sliding;
- erosion and quarrying;
- sediment entrainment/transport/deposition;
- basal water routing;
- calving/sublimation;
- flexure/isostasy;
- meltwater/outburst routing;
- permafrost freeze/thaw and thermokarst;
- postglacial river/coast adjustment.

### Forbidden shortcuts

- temperature mask → glacier shape;
- generic U-shaped valley filter;
- uniform continental planation;
- moraine ring at every margin;
- ice retreat without water/sediment/rebound consequences;
- all cold ice treated as highly erosive;
- glacial features inferred only from final smoothness.

## 22. Procedural failure signatures

- white texture with no ice thickness or flow;
- glaciers crossing divides without mass/flow logic;
- identical erosion under cold- and warm-based ice;
- fjords generated as arbitrary narrow inlets;
- parallel lineation texture without ice-stream provenance;
- outburst channels without lake/water source;
- rebound without prior load;
- every old mountain range clipped at one snowline;
- permafrost represented only by color;
- thermokarst confused with carbonate karst.

## 23. Stage 2 coverage obligations

Future reference cases must include:

- valley glaciers, ice caps, continental ice sheets, outlet glaciers, and ice streams;
- cold-, polythermal-, and warm-based branches;
- erosion-dominant and preservation-dominant ice;
- advance, stable, retreating, surging, and fossil states;
- glacial valleys, fjords, cirques, overdeepenings, and selective erosion;
- till, moraine, drumlin, esker, outwash, glaciolacustrine, and glaciomarine systems;
- isostatic depression/rebound and shoreline tilting;
- permafrost, thermokarst, patterned ground, and thaw failure;
- Earthlike, Mars-like, low/high-gravity, thin-atmosphere, and ice-shell-adjacent branches;
- negative controls for masks, generic filters, and massless retreat.

## 24. Unresolved questions

1. What minimum ice-flow model is stable at globe resolution?
2. How should basal thermal state be derived without a full thermomechanical model?
3. Which glacial features belong globally versus regionally?
4. How should erosion laws reconcile abrasion, quarrying, and sediment cover?
5. What mantle/isostatic approximation is sufficient for repeated glacial cycles?
6. How should sublimation and debris cover work on Mars-like worlds?
7. What sediment classes are required for till, outwash, and marine export?
8. How should repeated glaciations overprint or preserve earlier valleys?
9. Which buzzsaw relationships are safe as optional branches?
10. How should ice-shell tectonics interface with surface glacial logic?

## 25. Conclusions safe enough to carry forward

### High confidence

- glacial erosion depends strongly on flow, basal temperature, water, sediment, and substrate;
- ice sheets can preserve some terrain while strongly eroding outlet corridors;
- fjords require glacial excavation and later inundation;
- glacial sediment and meltwater require explicit routing;
- loading and rebound alter sea level, rivers, and coasts;
- permafrost thaw can create new relief and sediment, not merely remove ice.

### Model-dependent or incomplete

- universal erosion exponents;
- glacial mountain-height limitation;
- basal drainage parameterization;
- cross-planet ice-flow scaling;
- exact Mars glacial chronology.

### Not approved

- temperature-only ice masks;
- universal U-valley carving;
- generator implementation;
- image generation.

## Sources

See `../sources/remaining-systems-source-register.md`.