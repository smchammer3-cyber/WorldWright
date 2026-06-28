# WorldWright Blueprint: Generate Mode Geologic Spine Operational Flow

Status: draft / operational companion blueprint  
Owner: Iron Man  
Purpose: explain how the Geologic Spine actually converts Planet Foundation rules into causal scaffolds, province graphs, major structures, process intent fields, continuous process authority, and terrain-birth inputs without becoming a land mask or renderer shortcut.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_TECHNICAL_HARDENING.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_TO_TERRAIN_CAUSALITY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
WORLDWRIGHT_BLUEPRINT_LANDMASS_GENESIS.md
```

---

## 1. Core Operational Law

```text
Planet Foundation chooses the rules.
Geologic Spine chooses the causal skeleton.
Process Fields make the skeleton continuous.
Terrain Birth turns that authority into height.
Sea level and hydrology reveal whether the result behaves like a world.
```

The Geologic Spine does not work like this:

```text
foundation says Earthlike
-> draw random continents
-> call them geology
```

It must work like this:

```text
Planet Foundation
-> Geologic Spine archetype
-> province graph
-> major structures
-> process intent fields
-> continuous process fields
-> Terrain Birth
-> sea level / hydrology / climate consequences
```

---

## 2. Step 1: Read Resolved Planet Foundation

The Geologic Spine must read the resolved Planet Foundation, not UI labels.

Example Earthlike Foundation:

```text
physicalBaseClass: EARTHLIKE_ROCKY
realityMode: REALISTIC
heatEngine: ACTIVE_PLATE_TECTONIC
tectonicActivity: 0.78
hydrologyStrength: 0.82
oceanCoverageBias: 0.61
reliefIntensity: 0.55
```

This tells the Spine:

```text
This world should support continents, ocean basins, shelves, mountain belts, rifts, arcs, and river-basin-friendly terrain.
```

Example Ice World Foundation:

```text
physicalBaseClass: ICE_WORLD
cryosphereMode: ICE_SHELL
iceAuthority: PRIMARY_TERRAIN_AUTHORITY
cryotectonicActivity: 0.72
surfaceLiquidWaterStability: 0.03
```

This tells the Spine:

```text
Do not build normal Earthlike continents/rivers as the main authority.
Build ice shell stress, fracture provinces, pressure ridges, subglacial basins, and cryovolcanic zones.
```

---

## 3. Step 2: Choose a Spine Archetype

The Spine chooses a geologic operating pattern.

Examples:

```text
EARTHLIKE_TECTONIC,
CRYOSPHERE_DOMINANT,
ARID_AEOLIAN_ROCKY,
OCEAN_BASIN_DOMINANT,
VOLCANIC_RESURFACING_DOMINANT,
IMPACT_REGOLITH_DOMINANT,
SATELLITE_TIDAL_CONTEXT,
ALIEN_PHYSICAL_PROCESS,
MYTHIC_PROCESS_SUPPORTED.
```

This is not final terrain.

It is world skeleton logic.

Examples:

```text
Earthlike:
  continental systems,
  ocean basins,
  uplift belts,
  rifts,
  shelves,
  island arcs,
  stable interiors.

Moon:
  impact basin hierarchy,
  crater saturation provinces,
  regolith highlands,
  ancient lava plains,
  scarps,
  cold traps.

Mythic Fantasy:
  leyline uplift belts,
  floating mass support provinces,
  ancient event scars,
  crystal growth fields,
  world-root terrain systems.
```

Mythic or alien structures may appear only if the resolved Planet Foundation allows them.

---

## 4. Step 3: Create a Province Graph

The Spine creates a graph of large causal regions.

Province nodes may include:

```text
continental core intent,
ocean basin intent,
collision/uplift intent,
ridge/rift intent,
volcanic province,
impact basin province,
ice shell stress province,
aeolian dune basin province,
alien solvent province,
leyline uplift province.
```

Province edges may include:

```text
this province pushes against that one,
this margin transitions into deep basin,
this ice shell stress band connects fracture zones,
this volcanic province feeds an island chain,
this impact basin rim affects surrounding terrain,
this desert basin links dune corridors and ancient channels.
```

This is where shape becomes meaningful.

Still not land.

Still not final terrain.

It is organized cause.

---

## 5. Step 4: Create Major Structures

From the province graph, the Spine creates large structures.

Examples:

```text
mountain belt paths,
ridge/rift corridors,
deep basin centers,
continental shelf zones,
volcanic island chains,
ice fracture networks,
impact basin rings,
dune basin corridors,
cryovolcanic vent belts,
leyline uplift arcs.
```

Major structures say:

```text
Terrain Birth may later form a ridge here.
Ocean Birth may later deepen this basin.
Hydrology may later expect watershed support here.
Micro tiles must know this local area belongs to a larger structure.
```

Major structures are not final height.

They are stable, inspectable, source-referenced structure records.

---

## 6. Step 5: Create Process Intent Fields

The Spine creates soft continuous intent fields.

It must not create hard masks like:

```text
land = true
mountain = true
ocean = false
```

Instead it creates fields such as:

```text
continentalCoreIntent: 0.0 - 1.0
continentalMarginIntent: 0.0 - 1.0
oceanBasinIntent: 0.0 - 1.0
shelfIntent: 0.0 - 1.0
upliftBeltIntent: 0.0 - 1.0
ridgeRiftIntent: 0.0 - 1.0
volcanicProvinceIntent: 0.0 - 1.0
impactProvinceIntent: 0.0 - 1.0
iceShellStressIntent: 0.0 - 1.0
cryotectonicFractureIntent: 0.0 - 1.0
aeolianBasinIntent: 0.0 - 1.0
alienSolventBasinIntent: 0.0 - 1.0
leylineUpliftIntent: 0.0 - 1.0
floatingMassSupportIntent: 0.0 - 1.0
```

Example cell:

```text
continentalCoreIntent: 0.82
marginIntent: 0.18
oceanBasinIntent: 0.02
upliftBeltIntent: 0.41
riftIntent: 0.05
```

Meaning:

```text
This area is probably stable continental interior with some uplift influence.
```

Another cell:

```text
continentalCoreIntent: 0.08
marginIntent: 0.64
shelfIntent: 0.72
oceanBasinIntent: 0.38
```

Meaning:

```text
This is likely a continental margin / shelf transition.
```

That later becomes coastline/shelf/bathymetry logic, not a random coast.

---

## 7. Step 6: Process Fields Strengthen Intent Into Authority

The next layer, Plate / Crust / Process Fields, turns intent into continuous authority.

For Earthlike:

```text
continentality,
crustalBuoyancy,
oceanBasinTendency,
shelfTendency,
marginTendency,
upliftTendency,
riftTendency,
erosionResistance,
materialHardness.
```

For Ice World:

```text
iceThicknessPotential,
iceShellStress,
fractureTendency,
cryovolcanicTendency,
subglacialBasinPotential,
iceRelaxationPotential.
```

For Desert:

```text
aridityPotential,
windErosionPotential,
dryBasinPotential,
duneFieldPotential,
ancientChannelSupport,
playaPotential.
```

For Volcanic:

```text
thermalFlux,
ventDensity,
lavaFlowPotential,
ashDepositPotential,
resurfacingRecency,
calderaCollapsePotential.
```

The Spine gives the why.

Process Fields give the how strongly, where, and in what shape.

---

## 8. Step 7: Terrain Birth Consumes Fields, Not Labels

Terrain Birth reads continuous process fields.

Conceptual Earthlike height logic:

```text
baseHeight =
  crustalBuoyancy
  - oceanBasinSubsidence
  + upliftBeltHeight
  + volcanicConstructs
  + riftDepressionOrShoulder
  + erosionAdjustedRelief
  + boundedDetailNoise
```

Each term is gated by cause.

Mountains should not be:

```text
random noise ridge
```

Mountains should be:

```text
upliftBeltIntent
-> upliftTendency
-> terrain uplift
-> erosion/climate modifies it
-> hydrology drains it
```

Ocean basins should not be:

```text
everything below sea level
```

Ocean basins should be:

```text
oceanBasinIntent
-> basin subsidence / bathymetry authority
-> seafloor texture / ridges / shelves
-> sea level reveals water
```

---

## 9. Example: Earthlike Operational Chain

```text
Foundation:
  Earthlike Rocky,
  active tectonics,
  liquid water,
  moderate-high hydrology,
  moderate relief.

Spine:
  four continental systems,
  three ocean basins,
  two major uplift belts,
  one rift corridor,
  several volcanic arcs,
  shelves around continental margins.

Intent Fields:
  continentalCoreIntent,
  oceanBasinIntent,
  upliftBeltIntent,
  shelfIntent,
  marginIntent,
  volcanicArcIntent.

Process Fields:
  continentality,
  crustalBuoyancy,
  upliftTendency,
  oceanDepthTendency,
  erosionResistance,
  marginTransition.

Terrain Birth:
  broad interiors,
  mountain belts,
  shelves,
  basins,
  coasts,
  islands.

Sea Level:
  reveals land/water.

Hydrology:
  rivers follow terrain.

Climate:
  rain shadows and ocean influence.

Biomes:
  derive from climate/water/elevation.
```

This is how WorldWright avoids round random continents.

---

## 10. Example: Ice World Operational Chain

```text
Foundation:
  Ice World,
  ice shell,
  primary ice terrain authority,
  cryotectonic activity high,
  liquid surface water rare.

Spine:
  ice stress provinces,
  fracture bands,
  pressure ridge belts,
  cryovolcanic zones,
  subglacial basin hints.

Intent Fields:
  iceShellStressIntent,
  cryotectonicFractureIntent,
  glacialFlowIntent,
  cryovolcanicIntent,
  subglacialBasinIntent.

Process Fields:
  iceThicknessPotential,
  fractureTendency,
  ridgeHeightTendency,
  cryovolcanicResurfacing,
  iceRelaxation.

Terrain Birth:
  ice plains,
  ridges,
  cracks,
  chaos terrain,
  buried basins.

Hydrology:
  frozen/subglacial/melt-channel logic, not normal rivers.
```

This is how Ice World becomes a different kind of world, not an Earthlike planet painted white.

---

## 11. Conceptual Algorithm

```ts
function buildGeologicSpine(input: GeologicSpineInput): GeologicSpineRecord {
  const foundation = input.resolvedPlanetFoundation;
  const seeds = input.seedManifest;

  const archetype = chooseSpineArchetype(
    foundation,
    seeds.stream('geologicSpine.archetype'),
  );

  const provinceAnchors = placeStableProvinceAnchors({
    foundation,
    archetype,
    capabilities: foundation.capabilities,
    strengthProfile: foundation.strengthProfile,
    rng: seeds.stream('geologicSpine.provinceAnchors'),
  });

  const provinceGraph = buildProvinceGraph({
    anchors: provinceAnchors,
    foundation,
    rng: seeds.stream('geologicSpine.provinceGraph'),
  });

  const majorStructures = deriveMajorStructures({
    provinceGraph,
    foundation,
    rng: seeds.stream('geologicSpine.majorStructures'),
  });

  const intentFields = sampleProcessIntentFields({
    provinceGraph,
    majorStructures,
    coordinateNamespace: input.coordinateNamespace,
    foundation,
    keyedRandom: seeds.coordinateRandom,
  });

  return {
    identityRef: input.identityRef,
    planetFoundationRef: input.planetFoundationRef,
    spineArchetype: archetype,
    provinceGraph,
    majorStructures,
    processIntentFields: intentFields,
    downstreamContracts: buildSpineHandoffs(foundation),
    diagnostics: diagnoseSpine(...),
    integrity: hashSpine(...),
  };
}
```

Every output must answer:

```text
What foundation rule allowed me?
What seed stream created me?
What stable ID do I have?
What downstream stage may read me?
Am I source truth, derived, debug, or artifact?
```

---

## 12. Summary Law

```text
The Geologic Spine does not generate land.
It generates the causal skeleton that makes later land, ocean, terrain, ice, volcanoes, impacts, alien processes, or fantasy-supported forms make sense.

Foundation chooses rules.
Spine chooses causal skeleton.
Process Fields make skeleton continuous.
Terrain Birth creates form.
Sea level and hydrology reveal consequences.
Diagnostics reject fake causality.
```
