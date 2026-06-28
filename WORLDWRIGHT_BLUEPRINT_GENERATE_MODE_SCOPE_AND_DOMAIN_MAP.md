# WorldWright Blueprint: Generate Mode Scope and Domain Map

Status: draft / generator constitution companion  
Owner: Iron Man  
Purpose: define the exact scope of Generate Mode, what Generate owns, what Generate prepares for downstream systems, what Generate must not become, and the domain map used to blueprint the generator one subsystem at a time.

Related governing document: `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GENERATOR_CONSTITUTION.md`

---

## 1. Core Scope Law

```text
Generate Mode owns world birth.
Generate Mode does not own all future world change.
```

Generate Mode creates the first trustworthy state of the world.

It creates the world that later systems live off:

```text
Create Mode authors against it.
Sim Mode evolves it.
Save/Load preserves it.
Export transforms it.
UI displays and inspects it.
Diagnostics judge it.
Future tools consume structured outputs from it.
```

Generate is therefore foundational, but not unlimited.

The generator must be strong enough to feed every later system without swallowing every later system.

---

## 2. Ownership Law

Generate owns:

```text
the initial generated world,
the initial generated source fields,
the initial derived generated fields,
the dormant micro tile registry,
the macro world structure,
the generator seed architecture,
the generator stage artifacts,
the generator diagnostics,
and the first export/save/load coordinate contracts.
```

Generate does not own:

```text
user-authored clay stickers,
committed Create Mode edits,
Sim Mode timeline branches,
Sim Mode branch-local deltas,
external Unreal project state,
external City Maker project state,
manual user lore decisions,
final rendered visual authority,
export artifacts as canonical world truth,
or save-file repair policy.
```

Most important law:

```text
Generate may create potential.
Generate may not pretend potential is authored reality.
```

---

## 3. Potential vs Authored Reality

Generate can identify, suggest, and prepare.

Generate can say:

```text
this coast is harbor-suitable,
this valley is settlement-suitable,
this region may support trade,
this pass is likely,
this tile is ready for activation,
this basin can feed a river network,
this biome can support forest or grassland,
this slope is difficult for roads,
this place is a strong candidate for later authored detail.
```

Generate must not silently turn potential into authored reality.

Generate should not pretend it has created user-authored cities, user-authored roads, user-authored lore, or committed local modifications unless those are explicitly marked as generated suggestions, generated proxies, or generated initial conditions.

### 3.1 Generated Suggestion

A generated suggestion is a non-authoritative hint.

Example:

```text
harbor_candidate_042
settlement_candidate_118
possible_pass_007
trade_route_potential_022
```

A generated suggestion may become an authored object only through an explicit Create Mode action, user acceptance, import rule, or future defined promotion pipeline.

### 3.2 Generated Proxy

A generated proxy is lightweight world context used by macro systems.

Example:

```text
settlement suitability cluster,
travel corridor tendency,
regional population capacity estimate,
micro tile preview summary,
city-maker handoff candidate,
macro sim initial proxy.
```

A generated proxy is not the same thing as a detailed object.

### 3.3 Authored Reality

Authored reality belongs to Create Mode or another explicit authoring/import process.

Example:

```text
committed clay sticker,
locked authored site,
user-named settlement marker,
manual road path,
user-approved region boundary,
City Maker import committed into WorldWright.
```

Generate must not overwrite authored reality.

---

## 4. Generate Owns: Primary Domains

Generate owns the initial birth of these domains.

```text
1. Planet Identity
2. Planet Foundation
3. Seed Architecture
4. Coordinate / Grid / Tile System
5. Macro Globe
6. Dormant Micro Tile Registry
7. Geologic Spine
8. Plate / Crust / Process Fields
9. Continent and Ocean-Basin Structure
10. Landmass Genesis
11. Terrain Birth
12. Ocean / Bathymetry
13. Sea-Level Solve
14. Hydrology Baseline
15. Climate Baseline
16. Biome Potential
17. Surface Material Potential
18. Resource Potential
19. Settlement Suitability
20. Movement / Travel / Trade Suitability
21. Region / Culture / Civilization Starting Hints
22. Initial Sim Proxy Fields
23. Generate-to-Create Handoff
24. Generate-to-Sim Handoff
25. Generate-to-Save/Load Handoff
26. Generate-to-Export Handoff
27. Generate-to-UI Handoff
28. Diagnostics and Stage Artifacts
29. Debug Overlays
30. Generator Performance Budget
```

Each domain must eventually answer:

```text
what it is,
why Generate creates it,
what data represents it,
what stage creates it,
what fields are canonical,
what fields are derived,
what fields are debug-only,
what downstream systems read it,
what invalidates it,
what proves it works,
what failure looks like,
what shortcuts are forbidden.
```

---

## 5. Generate Does Not Own: Boundary Domains

Generate must not become these systems.

### 5.1 Create Mode

Generate may prepare world context for clay stickers.

Generate may not become the user authoring system.

Generate may create:

```text
sticker-safe terrain context,
settlement suitability,
resource potential,
local tile activation context,
road/travel potential,
coast/harbor suitability,
feature candidates.
```

Generate may not secretly create:

```text
committed clay stickers,
locked authored objects,
user-authored local modifications,
manual lore entries,
user-approved city/site markers.
```

### 5.2 Sim Mode

Generate may create initial sim conditions and proxy fields.

Generate may not become the timeline engine.

Generate may create:

```text
initial resource distribution,
settlement capacity,
movement friction,
climate baseline,
biome baseline,
regional affordances,
initial proxy fields.
```

Generate may not create:

```text
branch-local events,
war outcomes,
simulation deltas,
canon promotion decisions,
user-approved timeline changes.
```

### 5.3 Export

Generate may create export-ready source data and coordinate contracts.

Generate may not become the export artifact owner.

Generate may create:

```text
height data,
water masks,
surface/material potentials,
tile IDs,
world coordinates,
scale metadata,
source IDs,
field mapping hints.
```

Generate may not silently:

```text
change world source during export,
flatten source truth into export-only data,
pretend lossy exports preserve everything,
make external artifacts canonical world truth.
```

### 5.4 Save/Load

Generate may define generated source fields and recomputable caches.

Generate may not own save repair, migration, or user data preservation policy.

Generate may provide:

```text
source field definitions,
seed streams,
generation parameters,
schema identifiers,
cache invalidation hints,
source hashes.
```

Save/Load owns:

```text
serialization,
round-trip validation,
schema migration,
repair reports,
loss reports,
rebuild scheduling.
```

### 5.5 Renderer / UI

Generate may provide visualizable fields and debug overlays.

Generate may not let rendered output become world truth.

Generate may provide:

```text
macro preview fields,
micro tile preview proxies,
debug overlays,
inspector data,
field explanations,
stage warnings.
```

Renderer/UI owns display and interaction state only.

### 5.6 City Maker / Unreal

Generate may provide settlement metadata, height crops, and terrain context.

Generate may not become a city designer or Unreal editor.

Generate may provide:

```text
settlement suitability,
settlement candidates,
height crop context,
local terrain context,
water/slope/surface masks,
world coordinates,
scale metadata,
source IDs,
City Maker handoff candidates.
```

Generate may not create:

```text
full city layouts,
individual buildings,
Unreal actors,
NPC behavior,
final game-ready city scenes.
```

---

## 6. Domain Map Detail

This section defines the generator blueprint sequence.

The domains below should be walked in order, because each one either feeds or constrains the next.

---

### 6.1 Planet Identity

Planet Identity defines what world is being born.

Generate creates:

```text
world ID,
world name or generated placeholder,
seed identity,
style mode,
planet class,
user-selected generation profile,
creation timestamp,
schema version.
```

Downstream systems use Planet Identity to attach:

```text
save files,
exports,
micro tile IDs,
sim branches,
Create Mode authored layers,
diagnostics,
future modular tool handoffs.
```

Failure modes:

```text
world cannot be distinguished from another world,
export lacks source world ID,
save/load cannot verify source identity,
micro tiles collide across worlds,
sim branch attaches to wrong world.
```

---

### 6.2 Planet Foundation

Planet Foundation defines the base physical and stylistic premises of the planet.

Generate creates:

```text
planet radius/scale,
gravity class if modeled,
axial tilt if modeled,
sea level baseline,
world style constraints,
land/ocean target tendencies,
geology stack,
climate premise,
fantasy/stylized/alien allowances if enabled.
```

Planet Foundation constrains every later generated field.

Failure modes:

```text
later systems ignore foundation,
planet profile says one thing but terrain/climate show another,
non-Earthlike profiles accidentally receive Earthlike continent assumptions,
style mode becomes only visual and not systemic.
```

---

### 6.3 Seed Architecture

Seed Architecture defines deterministic randomness.

Generate creates:

```text
world seed,
named seed streams,
stage seeds,
domain seeds,
micro tile seeds,
diagnostic seeds,
export reproducibility metadata.
```

Seed Architecture must prevent unrelated changes from cascading accidentally.

Failure modes:

```text
changing climate changes plate layout accidentally,
opening a micro tile changes macro terrain,
adding diagnostics changes generated world,
exports cannot be reproduced,
regression tests become unstable.
```

This should be the next deep-dive after this scope map.

---

### 6.4 Coordinate / Grid / Tile System

The coordinate system defines where things are and how the planet is subdivided.

Generate creates:

```text
global coordinate contract,
render grid relationship,
field indexing rules,
micro tile addressing,
tile neighbor rules,
local frame rules,
edge/adjacency rules,
export coordinate metadata.
```

This system must support both macro globe work and future local detail.

Failure modes:

```text
lat/lon distortion breaks micro tiles,
neighbor edges do not line up,
exports lack scale,
tile IDs are unstable,
micro tile handoff cannot be located on the planet.
```

---

### 6.5 Macro Globe

The Macro Globe is the visible planet-scale world.

Generate creates:

```text
macro terrain representation,
macro ocean/land presentation,
major field previews,
viewable globe mesh/field data,
selection-safe world positions,
macro diagnostic overlays.
```

The Macro Globe must be useful for navigation and world understanding, but it is not required to hold all high-detail local data active.

Failure modes:

```text
macro view looks acceptable but source fields are incoherent,
macro view hides authority failures,
macro view tries to render export-grade micro detail everywhere,
user cannot select meaningful locations.
```

---

### 6.6 Dormant Micro Tile Registry

The Dormant Micro Tile Registry defines local-detail readiness.

Generate creates:

```text
micro tile IDs,
tile bounds,
tile neighbors,
tile seeds,
tile macro context,
tile activation recipes,
tile preview/proxy summaries,
tile local-frame metadata,
tile export metadata,
tile dirty-state baseline,
tile save/load references.
```

The registry is source-preserved potential, not fully active detail.

Failure modes:

```text
micro tiles are only UI boxes,
micro tiles lack stable IDs,
micro tiles cannot be exported,
micro tiles cannot be activated reproducibly,
micro tiles are all generated high-res by default and overload the system.
```

---

### 6.7 Geologic Spine

The Geologic Spine explains the major physical causes of the world.

Generate creates:

```text
plate/process logic,
crustal identity,
continental/oceanic tendencies,
boundary processes,
mountain/ocean basin/rift/arc/hotspot context,
long-range geologic coherence.
```

The Geologic Spine should explain terrain, not merely decorate it after the fact.

Failure modes:

```text
terrain is born from arbitrary noise,
geology labels do not explain visible landforms,
mountains lack process cause,
ocean ghosts survive because geology does not control terrain authority.
```

---

### 6.8 Plate / Crust / Process Fields

These fields translate the Geologic Spine into usable generation inputs.

Generate creates:

```text
plate IDs if used,
crust type,
continentality,
continent core strength,
shelf tendency,
margin tendency,
ocean basin tendency,
ridge/rift/orogen/arc/hotspot process tendencies,
material/age/erosion tendencies if modeled.
```

IDs explain membership. Continuous fields shape outcomes.

Failure modes:

```text
IDs become direct visual authority,
continuous process fields are ignored,
process fields leak into unsupported regions,
crust/province data creates circular submerged ghosts,
debug labels masquerade as terrain truth.
```

---

### 6.9 Continent and Ocean-Basin Structure

This domain defines large-scale land/ocean causality.

Generate creates:

```text
continental blocks,
craton tendencies,
terrane/accretion tendencies,
ocean basin identities,
shelf relationships,
margin relationships,
open-ocean basin context,
continent/ocean authority fields.
```

Failure modes:

```text
large round submerged continent ghosts,
weak ugly landforms,
equal circular blobs,
continent IDs detached from exposed land,
ocean basins lack depth diversity,
shelves detach from land logic.
```

---

### 6.10 Landmass Genesis

Landmass Genesis defines exposed land as geologic result.

Generate creates:

```text
landmass graph,
mainlands,
islands,
peninsulas,
isthmuses,
shelves,
coast process context,
land role classification,
landmass diagnostics.
```

Failure modes:

```text
land is treated as binary mask,
land appears as random speckles,
continents are circular blobs,
coasts are smoothed after failure instead of causally formed,
land roles are not explainable.
```

---

### 6.11 Terrain Birth

Terrain Birth turns causes into height.

Generate creates:

```text
base generated height,
relief structure,
mountain belts,
basins,
plains,
plateaus,
coast approach shapes,
ocean floor structure,
local variation fields.
```

Terrain Birth must respect geologic cause and downstream hydrology/export needs.

Failure modes:

```text
terrain is raw noise,
height exists without cause,
flat bland land,
spiky incoherent land,
water/land split fights terrain,
height cannot export cleanly.
```

---

### 6.12 Ocean / Bathymetry

Ocean and Bathymetry define underwater terrain.

Generate creates:

```text
ocean basin depth,
shelves,
slopes,
trenches,
abyssal plains,
ridges,
seamount tendencies,
coastal bathymetry transitions.
```

Failure modes:

```text
oceans are flat,
submerged continent ghosts dominate,
shelves appear without land relationship,
trenches/ridges are arbitrary,
ocean depth lacks believable structure.
```

---

### 6.13 Sea-Level Solve

Sea-Level Solve reveals land and water from terrain.

Generate creates:

```text
initial sea level,
land/water classification,
coast exposure,
land fraction report,
water connectivity report.
```

Sea level reveals the generated terrain. It must not become a hidden land-mask authority.

Failure modes:

```text
sea level is used to hide bad terrain,
land target is hit while landforms are bad,
coasts are numerically correct but visually/causally weak,
water classification overrides terrain logic.
```

---

### 6.14 Hydrology Baseline

Hydrology Baseline creates the first water-flow logic.

Generate creates:

```text
flow direction,
flow accumulation,
river basins,
watersheds,
rivers/streams where represented,
lakes/wetlands if modeled,
outlets,
floodplain tendencies,
downstream continuity.
```

Failure modes:

```text
rivers flow uphill,
rivers ignore basins,
rivers stop randomly,
major land lacks drainage,
coasts ignore river outlets,
settlement suitability ignores water.
```

---

### 6.15 Climate Baseline

Climate Baseline creates initial climate fields.

Generate creates:

```text
temperature tendencies,
humidity/precipitation tendencies,
wind or circulation approximations if modeled,
latitude/elevation/ocean effects,
rain shadow effects,
seasonal tendencies if modeled.
```

Failure modes:

```text
climate ignores latitude,
climate ignores elevation,
mountains do not affect rainfall,
interiors/ocean edges feel the same,
biomes are assigned without climate cause.
```

---

### 6.16 Biome Potential

Biome Potential translates climate, terrain, and water context into living surface tendency.

Generate creates:

```text
forest potential,
grassland potential,
desert potential,
wetland potential,
tundra/snow/ice potential,
mountain/alpine potential,
coastal biome tendencies,
style-specific biome allowances.
```

Failure modes:

```text
biomes are cosmetic only,
biomes ignore climate,
biomes ignore water,
biome borders are meaningless noise,
biome data cannot support Create/Sim/Export.
```

---

### 6.17 Surface Material Potential

Surface Material Potential defines what the ground tends to be made of or look like.

Generate creates:

```text
rock/sediment/soil tendencies,
sand/silt/gravel tendencies,
snow/ice tendencies,
wet/marsh tendencies,
volcanic/ash tendencies if modeled,
surface export masks.
```

Failure modes:

```text
surface appearance is detached from geology/climate,
export material masks are missing,
surface types cannot support local tiles,
renderer output becomes source truth.
```

---

### 6.18 Resource Potential

Resource Potential defines where useful world materials are likely.

Generate creates:

```text
mineral tendencies,
forest/lumber potential,
farmland potential,
freshwater potential,
fishing/coastal resource potential,
trade resource hints,
style/fantasy resource allowances if enabled.
```

Failure modes:

```text
resources appear randomly,
resources ignore geology/biome/water,
settlements ignore resources,
Sim Mode cannot use resource fields,
export loses resource metadata.
```

---

### 6.19 Settlement Suitability

Settlement Suitability defines where people or civilizations could plausibly settle.

Generate creates:

```text
water access,
buildable slope,
coast/harbor access,
river access,
resource access,
travel access,
flood/storm/drought risk,
trade node potential,
defensibility potential,
regional carrying capacity.
```

Generate may produce settlement candidates or proxies.

Generate must not pretend those are user-authored city stickers unless explicitly promoted.

Failure modes:

```text
settlements are placed on impossible terrain,
settlements ignore water/travel/resources,
generated candidates become hidden authored objects,
City Maker handoff lacks terrain context,
Sim Mode lacks population capacity input.
```

---

### 6.20 Movement / Travel / Trade Suitability

Movement suitability defines where travel is easy, hard, valuable, or likely.

Generate creates:

```text
movement friction,
pass potential,
river crossing potential,
coastal route potential,
trade corridor potential,
road suitability,
mountain/desert/swamp difficulty,
regional connectivity hints.
```

Failure modes:

```text
roads/trade ignore terrain,
passes are not related to mountains,
movement cost cannot feed Sim Mode,
settlement suitability ignores connectivity,
export loses route context.
```

---

### 6.21 Region / Culture / Civilization Starting Hints

Generate may create initial hints for later region/civilization systems.

These are not full authored cultures unless explicitly defined by a later blueprint.

Generate may create:

```text
region affordances,
natural borders,
climate/culture pressure,
travel-separated basins,
resource/carrying-capacity clusters,
potential homeland areas,
macro sim starting hints.
```

Failure modes:

```text
generated hints become fake lore,
regions ignore geography,
Sim Mode has no starting structure,
Create Mode cannot inspect why a place is important.
```

---

### 6.22 Initial Sim Proxy Fields

Initial Sim Proxy Fields give Sim Mode a lightweight starting point.

Generate creates:

```text
regional capacity,
settlement pressure,
movement connectivity,
resource availability,
biome pressure,
climate risk,
conflict/trade affordances if modeled.
```

Failure modes:

```text
Sim Mode must invent world structure from scratch,
Sim proxies contradict generated terrain,
Sim proxies overwrite generated canon,
Sim branches cannot trace initial causes.
```

---

### 6.23 Generate-to-Create Handoff

Generate-to-Create Handoff defines what Create Mode receives.

Generate provides:

```text
world context,
tile context,
terrain/hydrology/biome/surface context,
suitability fields,
constraints,
local frame/coordinate context,
inspector data,
diagnostics.
```

Failure modes:

```text
Create Mode authors blind,
clay stickers attach to unstable fields,
local edits overwrite generated source,
user cannot inspect generated cause before authoring.
```

---

### 6.24 Generate-to-Sim Handoff

Generate-to-Sim Handoff defines the sim starting state.

Generate provides:

```text
canonical world state,
initial proxy fields,
terrain/water/climate/biome/resource context,
settlement/travel potential,
seeded variability context.
```

Failure modes:

```text
Sim starts from wrong assumptions,
Sim modifies generated canon silently,
Sim cannot explain why events happen where they do.
```

---

### 6.25 Generate-to-Save/Load Handoff

Generate-to-Save/Load Handoff defines persistence responsibility.

Generate provides:

```text
canonical generated source fields,
seed architecture,
generation parameters,
field ownership metadata,
micro tile registry,
recomputable cache definitions,
schema version,
source hashes.
```

Failure modes:

```text
save file preserves only visuals,
load cannot rebuild generated fields,
cache is treated as source truth,
micro tile registry is lost,
world cannot round-trip.
```

---

### 6.26 Generate-to-Export Handoff

Generate-to-Export Handoff defines export source material.

Generate provides:

```text
height,
water masks,
slope/surface/material potentials,
road/river/coast vector context where available,
tile coordinate metadata,
world coordinate metadata,
scale metadata,
source IDs,
field mapping context,
loss-report context.
```

Failure modes:

```text
export lacks scale,
export lacks source ID,
heightmap cannot be traced to a tile,
metadata is lost silently,
export mutates source world.
```

---

### 6.27 Generate-to-UI Handoff

Generate-to-UI Handoff defines what the user can see and inspect.

Generate provides:

```text
macro preview,
micro tile overlay/proxies,
debug overlays,
inspector fields,
stage status,
diagnostic warnings,
selection-safe IDs,
user-facing explanations.
```

Failure modes:

```text
UI shows pretty output but hides bad source,
user cannot inspect generated cause,
debug overlays imply false authority,
selection IDs are unstable.
```

---

### 6.28 Diagnostics and Stage Artifacts

Diagnostics and artifacts prove Generate output.

Generate provides:

```text
stage diagnostics,
field statistics,
visual snapshots,
debug overlays,
failure flags,
seed metadata,
input/output hashes,
regression artifacts,
performance statistics.
```

Failure modes:

```text
planet passes tests but looks wrong,
planet looks acceptable but diagnostics fail,
no artifact proves stage behavior,
regressions cannot be detected,
visual success is greenwashed.
```

---

### 6.29 Debug Overlays

Debug overlays explain generated fields.

They are not canonical world truth.

Generate may create overlays for:

```text
plate/crust fields,
continent/ocean authority,
terrain roles,
land/water classification,
hydrology,
climate,
biomes,
settlement suitability,
micro tile readiness,
failure diagnostics.
```

Failure modes:

```text
debug overlay becomes gameplay/source authority,
overlay hides field weakness,
overlay cannot be traced to data,
UI displays overlay as if it were authored truth.
```

---

### 6.30 Generator Performance Budget

Generate must produce a usable world without exhausting the system.

Generate should define budgets for:

```text
macro generation time,
micro tile registry size,
active memory,
cache size,
artifact size,
diagnostic cost,
activation cost,
export-prep cost.
```

Failure modes:

```text
every micro tile becomes active by default,
diagnostics become too expensive to run,
snapshots are too heavy for CI,
exports require hidden full-world high-res activation,
generator cannot run on expected target machines.
```

---

## 7. Scope Gates

A generator feature must pass these gates.

### Gate 1: Ownership Gate

```text
Is this initial generated world truth, or does it belong to Create/Sim/Export/Save/Load/UI/future tools?
```

If it belongs elsewhere, Generate may only prepare context or initial proxies.

### Gate 2: Source Class Gate

```text
Is this canonical source, derived field, debug field, cache, artifact, proxy, or external output?
```

No field may enter the generator without a class.

### Gate 3: Handoff Gate

```text
Who reads this field after Generate?
What do they need from it?
What must they never assume?
```

### Gate 4: Protection Gate

```text
Can a later system accidentally overwrite this?
Can Generate accidentally overwrite later authored/simulated truth?
```

### Gate 5: Proof Gate

```text
How do we prove this works through diagnostics, tests, artifacts, and visuals?
```

### Gate 6: Performance Gate

```text
Does this require all micro tiles, all exports, or all local detail to be active at once?
```

If yes, it is probably architecturally wrong.

---

## 8. Forbidden Scope Shortcuts

```text
Do not let Generate become Create Mode.
Do not let Generate become Sim Mode.
Do not let Generate become Export.
Do not let Generate become Save/Load.
Do not let Generate become City Maker.
Do not let Generate become Unreal.
Do not treat generated potential as authored reality.
Do not treat debug overlays as source truth.
Do not allow UI-only objects to masquerade as generated data.
Do not store only final visuals.
Do not create high-resolution micro detail everywhere by default.
Do not hide weak generation behind later cleanup.
Do not accept a generator domain without ownership, data class, handoff, proof, and failure modes.
```

---

## 9. Immediate Next Deep Dive

The next generator subsystem should be:

```text
Seed Architecture
```

Reason:

```text
Seed Architecture comes before every later generated domain.
If seed streams are unstable, every stage becomes fragile.
If named streams are missing, unrelated generator changes can corrupt reproducibility.
If micro tile seeds are not planned early, local detail cannot be activated safely later.
If diagnostics use generation randomness, tests become untrustworthy.
```

Seed Architecture must define:

```text
world seed,
subseed derivation,
named random streams,
stage seeds,
domain seeds,
tile seeds,
diagnostic seeds,
export reproducibility,
forbidden shared-random coupling,
seed migration behavior,
seed stability tests.
```

---

## 10. Summary Law

```text
Generate Mode is foundational, but not unlimited.

Generate owns world birth, source fields, initial derived fields, dormant micro tile readiness, stage artifacts, diagnostics, and downstream handoff contracts.

Generate may create potential, proxies, candidates, and context.
Generate may not pretend those are authored reality.

Every generator domain must have ownership, data class, handoff, diagnostics, failure modes, forbidden shortcuts, and readiness criteria before implementation can be trusted.
```
