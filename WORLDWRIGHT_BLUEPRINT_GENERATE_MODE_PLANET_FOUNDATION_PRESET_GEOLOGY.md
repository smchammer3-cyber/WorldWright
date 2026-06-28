# WorldWright Blueprint: Generate Mode Planet Foundation Preset Geology

Status: draft / generator subsystem blueprint  
Owner: Iron Man  
Purpose: define high-quality geology contracts for Planet Foundation presets so Earthlike, Ice World, Desert World, Ocean World, Volcanic World, Barren/Rocky World, Moon, Gas Giant Moon, Alien World, Fantasy World, and Custom worlds are not color themes. Each preset is a physical and systemic premise that constrains how the seed is interpreted and what Generate Mode is allowed to create.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GENERATOR_CONSTITUTION.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SCOPE_AND_DOMAIN_MAP.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_TO_TERRAIN_CAUSALITY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_IDENTITY.md
WORLDWRIGHT_BLUEPRINT_LANDMASS_GENESIS.md
```

---

## 1. Core Law

```text
A planet preset is not a color theme.
A planet preset is a geologic operating system.
```

Planet presets constrain and interpret the seed through Planet Foundation.

```text
Same seed + same preset + same compatible generator version = same world.
Same seed + different preset = different sibling world.
```

The seed supplies reproducible variation.

The preset defines what kind of planet the seed is allowed to build.

Therefore:

```text
Seed supplies variation.
Preset supplies physical premise.
Planet Foundation supplies generation law.
Geology supplies cause.
Terrain Birth supplies form.
Downstream systems inherit the consequences.
```

---

## 2. Selection Screen Law

Generate Mode should include a selection screen before final world birth.

The selection screen should choose or configure:

```text
world seed,
generation profile,
planet class / preset,
style mode,
geology stack,
volatile inventory,
hydrosphere state,
cryosphere state,
atmosphere/erosion premise,
tectonic activity,
heat engine,
land/ocean/ice bias,
custom overrides.
```

Changing the seed changes variation within the same premise.

Changing the preset changes the premise that interprets the seed.

Changing both creates a fully different world.

UI rule:

```text
Change Seed:
  different variation inside the same kind of world.

Change Preset:
  different kind of world using the same seed.

Change Both:
  different world and different variation.
```

---

## 3. Preset Geology Contract

Every Planet Foundation preset must define:

```text
physical premise,
heat engine,
tectonic regime,
crust/material regime,
volatile inventory,
hydrosphere mode,
cryosphere mode,
atmosphere/erosion mode,
resurfacing mode,
impact preservation,
relief style,
ocean/bathymetry rules if applicable,
hydrology rules if applicable,
climate/biome consequences,
settlement/travel/resource implications,
micro tile implications,
export implications,
diagnostics,
forbidden shortcuts.
```

A preset is incomplete if it only changes:

```text
surface color,
biome palette,
water tint,
snow coverage,
renderer material,
or land/water percentage.
```

---

## 4. Shared Geologic Axes

All presets should be built from shared axes so they can be compared, combined, audited, and customized.

### 4.1 Heat Engine

```text
radiogenic/primordial interior heat,
plate tectonic cycling,
stagnant-lid cooling,
tidal heating,
impact heating,
cryogenic internal ocean heat,
magical/fantasy energy field if allowed,
low-heat dead world.
```

### 4.2 Tectonic Regime

```text
active plate tectonics,
limited plate tectonics,
stagnant lid,
mobile ice shell,
extensional/rift-dominated,
contractional/scarp-dominated,
tidally flexed,
impact-dominated,
fantasy-supported tectonics.
```

### 4.3 Surface Material Regime

```text
silicate rock,
basaltic plains,
granitic/continental crust if modeled,
sedimentary cover,
regolith,
water ice,
volatile ice,
sulfur/evaporite-rich surface,
ash/pyroclastic cover,
metallic/crystalline/custom material.
```

### 4.4 Volatile Inventory

```text
water-rich,
water-limited,
water-frozen,
subsurface ocean,
methane/ammonia/nitrogen/CO2 volatile world,
dry rock,
magmatic volatile-rich,
custom fantasy volatile.
```

### 4.5 Erosion Agents

```text
liquid water,
ice/glaciers,
wind/aeolian erosion,
waves/tides/coastal erosion,
mass wasting,
volcanic resurfacing,
cryovolcanic resurfacing,
impact gardening,
chemical weathering,
magical/fantasy process fields.
```

### 4.6 Resurfacing Style

```text
plate recycling,
volcanic flooding,
cryovolcanism,
glacial planing,
aeolian dune migration,
impact gardening,
tectonic cracking,
magical renewal,
low resurfacing / ancient preserved surface.
```

---

## 5. Preset Data Contract

```ts
interface PlanetFoundationPresetGeology {
  presetId: PlanetPresetId;
  displayName: string;
  description: string;

  planetClass:
    | 'EARTHLIKE'
    | 'ICE_WORLD'
    | 'DESERT_WORLD'
    | 'OCEAN_WORLD'
    | 'VOLCANIC_WORLD'
    | 'BARREN_ROCKY_WORLD'
    | 'MOON'
    | 'GAS_GIANT_MOON'
    | 'ALIEN_WORLD'
    | 'FANTASY_WORLD'
    | 'CUSTOM';

  heatEngine: HeatEngineContract;
  tectonicRegime: TectonicRegimeContract;
  crustMaterialRegime: CrustMaterialContract;
  volatileInventory: VolatileInventoryContract;
  hydrosphereMode: HydrosphereModeContract;
  cryosphereMode: CryosphereModeContract;
  atmosphereErosionMode: AtmosphereErosionContract;
  resurfacingMode: ResurfacingContract;
  impactRegime: ImpactRegimeContract;
  reliefStyle: ReliefStyleContract;

  allowedProcessFields: string[];
  discouragedProcessFields: string[];
  forbiddenProcessFields: string[];

  terrainBirthBiases: TerrainBirthBiases;
  oceanBathymetryBiases?: OceanBathymetryBiases;
  hydrologyBiases?: HydrologyBiases;
  climateBiomeBiases?: ClimateBiomeBiases;
  settlementTravelResourceBiases?: SettlementTravelResourceBiases;

  microTileImplications: MicroTilePresetImplication[];
  exportImplications: ExportPresetImplication[];
  diagnostics: PresetDiagnosticContract[];
  forbiddenShortcuts: string[];
}
```

---

## 6. Earthlike Preset Geology

### 6.1 Physical Premise

```text
An Earthlike world is a volatile-rich rocky planet with differentiated crust, active or semi-active geology, exposed continents, ocean basins, liquid surface water, weathering, hydrology, climate feedback, and biologically/settlement-relevant terrain diversity.
```

Earthlike does not mean Earth clone.

Earthlike means the generator must support:

```text
continents,
ocean basins,
continental shelves,
mountain belts,
cratons,
rift zones,
volcanic arcs,
river basins,
coasts,
climate gradients,
biome diversity,
resource and settlement logic.
```

### 6.2 Heat Engine

```text
moderate-to-active internal heat,
plate or plate-like cycling if enabled,
volcanic arcs and hotspots,
mountain building,
erosion/transport/deposition.
```

### 6.3 Tectonic Regime

Preferred:

```text
active plate tectonics,
continent/ocean crust distinction,
subduction-like convergent margins,
divergent ridges/rifts,
transform boundaries,
collision belts,
passive margins.
```

Allowed simplified mode:

```text
tectonic-process-field approximation without fully simulated plates.
```

Forbidden:

```text
random land blobs treated as continents.
```

### 6.4 Terrain Signature

```text
broad continent interiors,
coherent mountain ranges,
coastal plains,
river-carved basins,
continental shelves,
deep ocean basins,
volcanic island arcs,
peninsulas and island chains with cause.
```

### 6.5 Downstream Implications

```text
Hydrology should be strong.
Climate should respond to latitude, elevation, ocean proximity, and rain shadows.
Biomes should be diverse.
Settlements should prefer water, coast, rivers, moderate slope, resources, and route connectivity.
Micro tiles should activate rich local detail.
Export should include height, water, slope, surface, biome, river/road/context metadata.
```

### 6.6 Failure Modes

```text
continents are circular blobs,
oceans are flat bowls,
rivers ignore terrain,
mountains lack cause,
biomes are cosmetic,
coasts are smoothed noise,
settlements ignore water/travel/resources.
```

---

## 7. Ice World Preset Geology

### 7.1 Physical Premise

```text
An Ice World is a cold volatile-dominated world where ice is a primary surface and terrain authority, not a visual overlay.
```

Ice World variants:

```text
frozen terrestrial planet,
glacial Earthlike,
ice-shell ocean world,
cryovolcanic ice world,
ancient cratered ice world.
```

### 7.2 Heat Engine

Possible heat engines:

```text
low interior heat with preserved craters,
residual/radiogenic heat beneath thick ice,
tidal heating for active ice shells,
cryovolcanic internal heat,
subsurface ocean circulation.
```

### 7.3 Tectonic / Cryotectonic Regime

Allowed:

```text
ice shell cracking,
ridge bands,
chaos terrain,
pressure ridges,
cryovolcanic domes/flows,
glacial planing,
crevasse fields,
subglacial basin deformation,
impact craters softened by ice relaxation.
```

Earthlike plate tectonics should be disabled or heavily constrained unless explicitly choosing a glacial Earthlike subtype.

### 7.4 Terrain Signature

```text
ice plains,
fracture networks,
pressure ridges,
cryovolcanic resurfacing zones,
buried/subglacial basins,
frozen seas,
exposed nunatak-like highlands if rocky land exists,
low-contrast smoothed relief in old ice sheets,
sharp chaotic terrain in active ice shell regions.
```

### 7.5 Hydrology / Cryosphere

Liquid surface water is rare or seasonal unless a special subtype allows it.

Hydrology becomes:

```text
frozen drainage,
subglacial flow,
melt channels,
ice-covered lakes/seas,
cryovolcanic vents,
plume source regions if enabled.
```

### 7.6 Downstream Implications

```text
Climate is cold-biased.
Biome potential is ice/tundra/cryogenic unless fantasy or alien modes allow more.
Settlement suitability is severely constrained by temperature, ice stability, liquid water access, and travel difficulty.
Travel favors ice plains, ridge gaps, sheltered geothermal/cryothermal areas, and rare exposed rock.
Micro tiles need ice material masks, crack networks, snow/ice depth context, crevasse risk, and subglacial hints.
```

### 7.7 Failure Modes

```text
ice is only a white material over Earthlike terrain,
rivers remain liquid everywhere,
coasts behave like warm oceans,
settlements spawn normally without cold/ice constraints,
cryotectonics lack internal heat or stress cause,
ice world uses normal landmass blueprint without cryosphere authority.
```

---

## 8. Desert World Preset Geology

### 8.1 Physical Premise

```text
A Desert World is a water-limited rocky planet where aridity, wind, exposed rock, preserved basins, dust, dunes, salt flats, ancient channels, and limited active hydrology dominate surface evolution.
```

Desert does not mean flat sand everywhere.

A high-quality Desert World should include:

```text
rocky highlands,
mesas,
escarpments,
canyons,
dry basins,
dune seas,
alluvial fans,
playas/salt flats,
ancient river valleys,
volcanic provinces,
impact craters preserved by low erosion.
```

### 8.2 Heat Engine

Usually:

```text
low-to-moderate internal heat,
stagnant-lid or weak tectonics,
ancient volcanic provinces,
rift/canyon systems possible,
impact features moderately preserved.
```

### 8.3 Surface Process Regime

Dominant processes:

```text
aeolian erosion/deposition,
dust transport,
chemical weathering if atmosphere supports it,
rare flash-flood channels,
ancient fluvial carving,
mass wasting,
thermal fracturing,
impact gardening.
```

### 8.4 Terrain Signature

```text
dune seas in low basins,
rocky plateaus,
yardangs/streamlined wind-eroded forms if modeled,
scarps and mesas,
dry lake beds,
salt pans,
ancient deltas/fans,
large canyons,
volcanic shields or flood basalts if history allows.
```

### 8.5 Downstream Implications

```text
Hydrology is weak, ancient, seasonal, underground, or localized.
Climate has strong aridity and high temperature contrast unless cold desert subtype.
Biome potential is sparse.
Settlement suitability depends on rare water, groundwater, oases, mineral resources, trade corridors, and shelter.
Movement favors basins, plateaus, passes, and dry corridors but penalizes dune seas, salt flats, and canyon barriers.
Micro tiles need dune fields, dust cover, dry channels, erosion scarps, and water-risk metadata.
```

### 8.6 Failure Modes

```text
desert is just Earthlike terrain recolored tan,
hydrology remains dense and wet,
dune seas ignore wind/basin logic,
settlements appear without water/resource/trade reason,
flat sand covers all terrain,
ancient water features have no terrain evidence.
```

---

## 9. Ocean World Preset Geology

### 9.1 Physical Premise

```text
An Ocean World is a water-dominated world where ocean coverage, seafloor structure, island/continent scarcity, bathymetry, tides, storms, and ocean/ice/geologic coupling dominate world shape.
```

Ocean World variants:

```text
surface liquid ocean planet,
archipelago ocean world,
water-rich rocky world with small continents,
subsurface ocean ice world,
deep waterworld with limited exposed land.
```

### 9.2 Heat Engine

Possible:

```text
Earthlike plate/ocean crust cycling,
hotspot island chains,
submarine volcanism,
tidal heating for moon variants,
high-pressure deep-ocean effects if modeled,
weak land tectonics if land is scarce.
```

### 9.3 Terrain / Bathymetry Signature

```text
deep ocean basins,
mid-ocean ridges or ridge analogs,
seamount chains,
submarine plateaus,
trenches if tectonics active,
volcanic island arcs,
atolls/reefs if biology/style allows,
rare continents or archipelagos,
wide shallow seas if shelf-bearing land exists.
```

### 9.4 Hydrology

Surface rivers may be limited if exposed land is scarce.

Ocean dynamics matter more:

```text
tides,
storm exposure,
coastal erosion,
marine sedimentation,
sea passages,
harbor suitability,
island freshwater scarcity.
```

### 9.5 Downstream Implications

```text
Settlement suitability strongly favors islands, shelves, protected harbors, volcanic highlands, freshwater sources, and trade routes.
Travel/trade is maritime-dominant.
Resources include fisheries, reefs, submarine minerals, volcanic islands, salt, coastal resources.
Micro tiles need coastal bathymetry, reef/shelf/harbor context, storm exposure, island relief, and sea-route metadata.
Export must preserve water masks, bathymetry, coastline, shelf, harbor, and island context.
```

### 9.6 Failure Modes

```text
ocean is only high water level over Earthlike terrain,
bathymetry is flat,
islands are random speckles,
settlements spawn without freshwater/harbor logic,
coasts lack shelf/storm/tide context,
seafloor has no geology.
```

---

## 10. Volcanic World Preset Geology

### 10.1 Physical Premise

```text
A Volcanic World is a high-heat or high-resurfacing world where lava, ash, sulfur/volatile deposits, volcanic plains, fissures, calderas, shields, flows, and heat-driven terrain dominate.
```

Volcanic World variants:

```text
tidally heated volcanic moon,
young volcanic rocky planet,
flood basalt world,
lava ocean / extreme volcanic world,
ash-choked volcanic world,
fantasy volcanic hellscape with explicit magic-heat source.
```

### 10.2 Heat Engine

Possible:

```text
extreme tidal heating,
high internal heat,
young mantle convection,
large igneous province activity,
hotspot-dominated volcanism,
magical/geothermal fantasy source if enabled.
```

### 10.3 Tectonic / Volcanic Regime

Dominant processes:

```text
shield volcano growth,
fissure eruptions,
flood lava plains,
caldera collapse,
lava channels/tubes,
pyroclastic deposits,
sulfur/evaporite/ash resurfacing,
thermal uplift/subsidence,
volatile plumes.
```

### 10.4 Terrain Signature

```text
broad lava plains,
volcanic shields,
calderas/paterae,
fissure networks,
flow fronts,
lava channels,
ash plains,
thermal highlands,
young resurfaced regions with few craters,
older preserved regions if activity is patchy.
```

### 10.5 Downstream Implications

```text
Liquid water hydrology is usually weak, absent, or localized unless volcanic+wet subtype.
Climate may be hot, toxic, ash-laden, or thin depending atmosphere.
Biome potential is low unless fantasy/alien ecology.
Settlement suitability is rare and tied to cooled terrain, geothermal resource, sheltered basins, or fantasy constraints.
Movement is constrained by fresh lava, rough flows, fissures, ash plains, toxic vents, and heat zones.
Micro tiles need lava-flow ages, heat-risk fields, vent/fissure networks, ash/sulfur material masks, and resurfacing recency.
```

### 10.6 Failure Modes

```text
volcanic world is just red/orange coloring,
volcanoes appear without heat source,
lava flows ignore slope/topography,
impact craters remain uniformly dense on actively resurfaced areas,
liquid rivers behave normally on a lava world,
settlements ignore heat/toxic terrain.
```

---

## 11. Barren / Rocky World Preset Geology

### 11.1 Physical Premise

```text
A Barren/Rocky World is a low-volatile rocky body where impact cratering, regolith, exposed bedrock, scarps, ancient volcanism, thermal fracturing, and limited erosion dominate.
```

Variants:

```text
airless rocky planet,
thin-atmosphere rocky planet,
ancient dead world,
impact-scarred dwarf planet,
low-volatility volcanic remnant.
```

### 11.2 Heat Engine

Usually:

```text
low internal heat,
stagnant lid,
ancient volcanism,
contractional tectonics,
impact-dominated resurfacing.
```

### 11.3 Terrain Signature

```text
cratered highlands,
impact basins,
ejecta blankets,
regolith plains,
scarps/wrinkle ridges,
ancient lava plains,
fractured crust,
minimal active erosion.
```

### 11.4 Downstream Implications

```text
Hydrology is absent or ancient.
Climate/biome are minimal unless atmosphere is present.
Settlement suitability depends on resources, shelter, crater basins, lava tubes, polar volatiles if enabled, and access routes.
Movement is affected by craters, regolith roughness, scarps, and radiation/exposure if modeled.
Micro tiles need crater fields, regolith depth, rock abundance, slope/roughness, shadow/cold trap context if applicable.
```

### 11.5 Failure Modes

```text
surface is smooth noise instead of cratered/rocky,
active Earthlike rivers exist without water premise,
biomes appear cosmetically,
crater density ignores resurfacing age,
terrain lacks impact basin hierarchy.
```

---

## 12. Moon Preset Geology

### 12.1 Physical Premise

```text
A Moon preset is an airless or near-airless rocky satellite/dwarf body where impact history, regolith, basins, highlands, ancient lava plains, tidal/thermal stresses, and low erosion define the surface.
```

Moon is distinct from generic Barren/Rocky because it should include satellite-specific context:

```text
parent body relationship,
tidal locking possibility,
near/far side asymmetry if enabled,
impact basin/mare-style resurfacing,
regolith maturity,
low gravity effects,
shadowed volatile traps if enabled.
```

### 12.2 Terrain Signature

```text
crater saturation zones,
large impact basins,
smooth basaltic/mare-like plains if enabled,
rugged highlands,
ejecta rays,
rilles/grabens,
wrinkle ridges,
scarps,
regolith plains,
polar cold traps if enabled.
```

### 12.3 Downstream Implications

```text
Hydrology absent except ice deposits or fantasy modes.
Climate minimal/airless.
Biome absent unless fantasy/alien.
Settlement suitability depends on polar volatiles, lava tubes, crater shelter, resource access, landing zones, low slope, and radiation exposure if modeled.
Micro tiles need high crater fidelity, regolith roughness, slope, lighting/shadow metadata if relevant.
```

### 12.4 Failure Modes

```text
moon behaves like a small Earth,
craters are random decals not terrain forms,
regolith is only a texture,
low atmosphere/no hydrology is ignored,
parent-body/tidal context is missing.
```

---

## 13. Gas Giant Moon Preset Geology

### 13.1 Physical Premise

```text
A Gas Giant Moon preset is governed by parent-planet context: tidal heating, orbital resonance, radiation environment, ice/rock composition, volatile chemistry, cryovolcanism, volcanism, methane/organic processes, and subsurface ocean potential.
```

This preset should not be one geology.

It should choose a subtype.

### 13.2 Required Subtypes

```text
ICY_OCEAN_MOON:
  ice shell, subsurface ocean, cryotectonics, cracks, ridges, chaos terrain, possible plumes.

ACTIVE_CRYOVOLCANIC_MOON:
  ice shell plus active vents, resurfacing, plume deposits, warm fractures, possible ocean contact.

TIDAL_VOLCANIC_MOON:
  silicate volcanism, lava plains, sulfur/ash deposits, intense resurfacing, few impact craters.

ORGANIC_METHANE_MOON:
  cold volatile cycle, dunes, methane/ethane lakes/seas if enabled, organic haze/sediments.

QUIET_CRATERED_ICE_ROCK_MOON:
  ancient icy/rocky crust, impact-dominated, limited resurfacing.
```

### 13.3 Parent-Planet Fields

Generate should define:

```text
parentBodyType,
orbitalDistanceClass,
tidalHeatingLevel,
orbitalResonanceStrength,
radiationEnvironment,
tidalLocking,
volatileRetention,
subsurfaceOceanLikelihood,
plumeActivityPotential.
```

### 13.4 Terrain Signatures

Depending on subtype:

```text
fractured ice plains,
lineae/ridge bands,
chaos terrain,
plume source fissures,
cryovolcanic plains,
lava plains,
calderas/paterae,
sulfur deposits,
organic dune seas,
methane lake basins,
cratered ice-rock highlands.
```

### 13.5 Downstream Implications

```text
Hydrology may be cryogenic, subsurface, methane-based, absent, or volcanic.
Climate may be airless, thin atmosphere, haze-rich, cryogenic, or radiation dominated.
Settlement suitability depends on radiation, heat, ice stability, resource access, plume/ocean access, and safe terrain.
Micro tiles need subtype-specific masks: cracks, plume deposits, radiation, cryovolcanic flow, lava flow, methane basin, organic sediment, or crater/regolith.
Exports and future tools must know the subtype.
```

### 13.6 Failure Modes

```text
gas giant moon is treated like a small Earth,
parent planet has no geological consequence,
tidal heating is ignored,
ice/ocean/volcanic subtypes are mixed without rules,
radiation/orbital context has no downstream effect,
plumes or volcanoes appear without energy source.
```

---

## 14. Alien World Preset Geology

### 14.1 Physical Premise

```text
An Alien World is a physically grounded non-Earthlike world whose geology may use unfamiliar materials, atmospheres, volatiles, climates, colors, and terrain processes, but still follows explicit causal rules.
```

Alien does not mean random.

Alien means:

```text
choose nonstandard materials,
choose nonstandard volatiles,
choose nonstandard erosion agents,
choose nonstandard climate chemistry,
then make terrain follow those rules.
```

### 14.2 Allowed Alien Geology Families

```text
ammonia/methane volatile world,
CO2 ice/dry ice cycle world,
sulfur-rich volcanic world,
crystalline/mineral-rich world,
iron/oxide desert world,
high-pressure atmosphere erosional world,
low-gravity porous world,
metal-rich asteroid-like world,
biogenic mega-surface world if life/fantasy enabled.
```

### 14.3 Required Causal Fields

Alien worlds must define:

```text
primary crust material,
secondary surface material,
volatile cycle,
heat engine,
atmospheric density/chemistry premise,
erosion agents,
resurfacing mode,
liquid/ice stability,
life/biome compatibility if any,
settlement constraints.
```

### 14.4 Terrain Signature

The terrain can be strange, but must be explainable.

Examples:

```text
crystal ridges from mineral growth fields,
solvent-carved channels from alien volatile flow,
sulfur plains from volcanic deposition,
wind-carved towers in dense atmosphere,
organic dune seas,
magnetically aligned mineral ridges if premise supports it,
floatstone/fantasy-adjacent forms only if physical or magical support is explicit.
```

### 14.5 Failure Modes

```text
alien means random colors only,
geology has no material/volatile premise,
terrain shapes have no process cause,
Earthlike rivers/biomes appear under incompatible chemistry,
settlements ignore alien hazards,
export lacks material/context metadata.
```

---

## 15. Fantasy World Preset Geology

### 15.1 Physical Premise

```text
A Fantasy World may include supernatural or stylized causes, but those causes must still become explicit world process fields rather than arbitrary visual exceptions.
```

Fantasy does not mean no rules.

Fantasy means additional rules.

### 15.2 Fantasy Geologic Allowances

Allowed if explicitly configured:

```text
mana/leyline uplift,
floating continents,
world-tree root terrain,
divine/scarred impact basins,
magical wastelands,
crystal-growth mountain belts,
ancient titan/dragon geologic remnants,
anti-gravity strata,
portal/rift geology,
biome-defying sacred zones,
curse/blessing material alteration.
```

### 15.3 Required Support Fields

Fantasy features must define support fields.

Examples:

```text
leylineStrength,
magicalUpliftTendency,
floatingMassSupport,
curseAlterationField,
sacredHydrologyInfluence,
mythicMaterialPotential,
portalStressField,
ancientEventScarField.
```

### 15.4 Terrain Signature

```text
impossible-but-consistent landforms,
mythic mountain chains with source fields,
floating islands with support zones,
crystal ridges tied to magical/mineral fields,
scarred lands tied to ancient event fields,
unnatural rivers only where magic hydrology field permits,
biome anomalies with explicit cause.
```

### 15.5 Downstream Implications

```text
Create Mode can inspect magical cause fields.
Sim Mode can react to fantasy resources, hazards, sacred regions, and instability.
Export can include fantasy material/magic masks.
Micro tiles can deepen magical terrain without inventing hidden authority.
Settlements can respond to magic/curse/blessing fields.
```

### 15.6 Failure Modes

```text
fantasy becomes random impossible shapes,
magic is only visual color,
floating continents have no support field,
biomes violate climate without alternate cause,
Create/Sim/Export cannot inspect fantasy authority,
magic overrides generated truth silently.
```

---

## 16. Custom Preset Geology

### 16.1 Physical Premise

```text
Custom allows the user to compose a planet foundation from supported geologic axes.
```

Custom must not mean unrestricted contradiction.

The custom builder should expose:

```text
planet class,
heat engine,
tectionic regime,
crust/material regime,
volatile inventory,
hydrosphere,
cryosphere,
atmosphere/erosion,
resurfacing,
impact history,
relief intensity,
style/fantasy allowances.
```

### 16.2 Compatibility Rules

Custom should validate combinations.

Examples:

```text
Dense liquid-water rivers require liquid-water climate/pressure support or fantasy override.
Earthlike forests require compatible climate/biome premise or fantasy ecology override.
Active global volcanism requires heat engine.
Cryovolcanism requires volatile ice/ocean/heat premise.
Floating continents require fantasy support or exotic physics support.
High crater preservation conflicts with high resurfacing unless mixed by region.
```

### 16.3 Failure Modes

```text
custom allows incoherent physical combinations without warning,
custom creates renderer themes instead of generator law,
custom disables diagnostics,
custom hides contradictions instead of reporting them.
```

---

## 17. Preset Matrix

| Preset | Primary Authority | Dominant Processes | Hydrology Mode | Surface Materials | Resurfacing | Settlement Logic |
| --- | --- | --- | --- | --- | --- | --- |
| Earthlike | tectonics + water cycle | plates, uplift, erosion, rivers, climate | liquid surface water | rock, soil, sediment, ice/snow | plate recycling + erosion | water, coast, rivers, resources, routes |
| Ice World | cryosphere | ice shell, glaciers, cryotectonics | frozen/subglacial/ocean | water ice, volatile ice, snow | glacial/cryovolcanic/crack renewal | heat, shelter, water access, ice stability |
| Desert World | aridity + wind | aeolian, ancient fluvial, mass wasting | rare/ancient/groundwater | dust, sand, rock, salt | wind + sparse floods + impact | oases, aquifers, trade, minerals |
| Ocean World | ocean/bathymetry | seafloor, tides, islands, coasts | global ocean | water, seafloor, islands, reefs if allowed | marine + volcanic/tectonic | harbors, freshwater, islands, routes |
| Volcanic World | heat engine | lava, ash, vents, calderas, flows | absent/local/steam | basalt, ash, sulfur, lava | high volcanic resurfacing | rare safe zones, geothermal, resources |
| Barren/Rocky | impacts + low volatiles | cratering, regolith, scarps | absent/ancient | rock, regolith, metal/mineral | low, impact gardening | shelter, resources, polar volatiles |
| Moon | satellite impact history | craters, basins, regolith, maria | absent/ice traps | regolith, basalt, ejecta | impact + ancient volcanism | lava tubes, poles, craters, resources |
| Gas Giant Moon | parent-driven | tidal heating, cryo/volcanic/organic | subtype-specific | ice, sulfur, lava, organics | subtype-specific | radiation, heat, ocean/plume/resource access |
| Alien World | selected exotic premise | custom chemistry/processes | custom volatile | exotic materials | custom | premise-specific hazards/resources |
| Fantasy World | explicit magic/process fields | leyline uplift, mythic scars, support fields | physical or magical | normal + mythic materials | physical + magical | magic/resources/sacred/hazard fields |
| Custom | composed axes | chosen axes | chosen axes | chosen axes | chosen axes | validated by compatibility rules |

---

## 18. Preset-to-Seed Integration

Seed derivation must include preset/foundation identity.

Conceptual derivation:

```ts
const domainSeed = deriveSeed({
  seedArchitectureVersion,
  worldSeed,
  generationProfileId,
  planetFoundationPresetId,
  customFoundationHash,
  streamName,
});
```

Rules:

```text
Same seed + same preset = stable world.
Same seed + different preset = different sibling world.
Preset changes are intentional generator premise changes.
Preset changes must be visible in Planet Identity and World Birth Certificate.
Preset geology must be included in source identity and diagnostics.
```

---

## 19. Preset-to-Downstream Handoff

Planet Foundation presets must inform downstream systems.

### 19.1 Generate-to-Create

Create Mode must know:

```text
what terrain processes are active,
what materials exist,
what clay stickers are compatible,
what environmental constraints apply,
what local edits would conflict with foundation.
```

### 19.2 Generate-to-Sim

Sim Mode must know:

```text
settlement limits,
travel friction,
resource types,
hazards,
climate/biome premise,
volcanic/ice/impact risks,
magic/alien rules if enabled.
```

### 19.3 Generate-to-Export

Export must know:

```text
height scale,
water/ice/ocean masks,
surface material masks,
hazard masks,
subtype metadata,
loss-report requirements,
Unreal/material/PCG hints.
```

### 19.4 Generate-to-Micro Tiles

Micro tiles must know:

```text
which local detail recipe is allowed,
which erosion agents to deepen,
which materials to use,
which hazards/resources to expose,
which edge contracts matter.
```

---

## 20. Preset Diagnostics

Required diagnostics:

```text
planetPresetPresent,
planetPresetLinkedToSeedManifest,
planetPresetLinkedToPlanetFoundation,
planetPresetIncludedInWorldIdentity,
allowedProcessFieldsPresent,
forbiddenProcessFieldViolationCount,
heatEngineMatchesGeology,
volatileInventoryMatchesHydrology,
crustMaterialMatchesTerrain,
resurfacingMatchesImpactPreservation,
hydrologyMatchesPreset,
biomeMatchesPreset,
settlementSuitabilityMatchesPreset,
microTileRecipeMatchesPreset,
exportMasksMatchPreset,
rendererThemeOnlyViolationCount.
```

Per-preset diagnostics:

```text
Earthlike:
  tectonic/terrain/hydrology/climate coherence.

Ice World:
  cryosphere authority, liquid water constraint, cryotectonic cause.

Desert World:
  aridity, wind/basin logic, sparse water, settlement constraint.

Ocean World:
  bathymetry, island/shelf/harbor logic, marine dominance.

Volcanic World:
  heat source, resurfacing, lava/ash/vent coherence.

Barren/Rocky/Moon:
  impact hierarchy, regolith, low erosion, crater preservation.

Gas Giant Moon:
  parent/tidal/radiation/subtype coherence.

Alien/Fantasy:
  explicit nonstandard cause fields and downstream inspectability.
```

---

## 21. Tests

Required tests:

```text
same seed + same preset produces same foundation source,
same seed + different preset produces different foundation source,
preset ID appears in Planet Identity,
preset ID appears in Seed Manifest derivation,
preset ID appears in World Birth Certificate,
Earthlike preset enables Earthlike geology fields,
Ice World preset enables cryosphere fields and constrains liquid-water hydrology,
Desert World preset constrains hydrology and boosts aeolian/basin fields,
Ocean World preset boosts bathymetry/ocean/island/coast fields,
Volcanic World preset requires heat engine and boosts volcanic resurfacing,
Barren/Rocky/Moon presets preserve impact/regolith dominance,
Gas Giant Moon preset requires parent-body context and subtype,
Alien/Fantasy presets require explicit support fields,
forbidden process field violations fail diagnostics,
preset export sidecars include preset metadata.
```

---

## 22. Failure Modes

Preset geology fails if:

```text
preset changes only colors,
preset changes only biome palette,
preset does not alter Planet Foundation,
preset is not part of seed derivation,
preset is not part of identity/export metadata,
Earthlike/ice/desert/ocean/volcanic worlds use the same geologic pipeline without constraints,
Ice World has normal Earthlike rivers everywhere,
Desert World has dense lush hydrology,
Ocean World has flat bathymetry,
Volcanic World has volcanoes without heat source,
Barren/Moon worlds lack crater hierarchy,
Gas Giant Moon ignores parent/tidal/radiation context,
Alien/Fantasy worlds use randomness instead of explicit cause fields.
```

Catastrophic failure:

```text
The preset is only a renderer theme, so Generate produces the same underlying world with different colors.
```

---

## 23. Forbidden Shortcuts

```text
Do not implement presets as color palettes.
Do not implement Ice World as Earthlike plus white overlay.
Do not implement Desert World as Earthlike plus tan overlay.
Do not implement Ocean World as Earthlike plus higher sea level only.
Do not implement Volcanic World as Earthlike plus lava decals.
Do not implement Barren/Moon as Earthlike with no trees.
Do not implement Gas Giant Moon without parent-body/tidal context.
Do not implement Alien as random colors and impossible shapes.
Do not implement Fantasy as uninspectable exceptions.
Do not let presets bypass seed architecture.
Do not let presets bypass Planet Identity.
Do not let presets bypass diagnostics.
```

---

## 24. Readiness Criteria

Planet Foundation preset geology is blueprint-ready when it defines:

```text
selection-screen behavior,
seed integration,
identity integration,
shared geologic axes,
preset data contract,
Earthlike geology,
Ice World geology,
Desert World geology,
Ocean World geology,
Volcanic World geology,
Barren/Rocky geology,
Moon geology,
Gas Giant Moon geology,
Alien World geology,
Fantasy World geology,
Custom compatibility rules,
downstream handoffs,
diagnostics,
tests,
failure modes,
forbidden shortcuts.
```

Implementation is ready when:

```text
preset choice changes Planet Foundation,
preset choice changes allowed process fields,
preset choice participates in seed derivation,
preset choice appears in Planet Identity,
preset choice appears in exports,
preset diagnostics reject renderer-only changes,
and each preset produces visibly and causally different geology.
```

---

## 25. Summary Law

```text
A WorldWright preset is a geologic operating system.

It tells the generator what kind of world the seed is allowed to build.

The same seed with a different preset should create a sibling world, not a recolored copy.

Every preset must change the physical premise, process fields, terrain birth rules, downstream handoffs, diagnostics, and export metadata.
```
