# WorldWright Blueprint: Generate Mode Generator Constitution

Status: draft / foundation-level generator constitution  
Owner: Iron Man  
Purpose: define Generate Mode as the world-birth system that creates both the visible macro planet and the dormant structure needed for future local detail, authorship, simulation, save/load, diagnostics, and export.

---

## 1. Core Law

```text
Generate Mode is not a map maker.
Generate Mode is the world-birth system.

Generate Mode creates the world that every other mode must be able to trust.
```

Generate Mode creates:

```text
the canonical macro world,
the dormant micro tile system,
the initial physical fields,
the causal process fields,
the derived preview fields,
the export coordinate contracts,
the save/load source records,
and the diagnostic evidence needed to prove that the world is fit for authorship, simulation, preservation, and export.
```

Generate Mode is not blueprint-ready merely because it produces a visible globe.

Generate Mode is blueprint-ready only when the generated world is:

```text
coherent,
inspectable,
deterministic,
diagnosable,
authorable,
sim-ready,
saveable,
exportable,
and protected against fake success.
```

---

## 2. First Foundation Principle: Macro Birth + Micro Readiness

Generate Mode creates both:

```text
1. the visible macro planet, and
2. the dormant structure for future local detail.
```

This is the first locked generator principle.

Generate Mode is not only:

```text
make world now
```

It is:

```text
make world now,
and prepare every part of it to become deeper later.
```

A generated world must be born with enough structure that later systems do not have to guess how to deepen it.

The macro planet gives the user a navigable world.

The dormant micro tile system gives that world local authoring, local export, and local simulation readiness without keeping every high-detail place active.

Core rule:

```text
Generate Mode creates a planet that is already prepared for local detail, even though local detail remains dormant until activated.
```

---

## 3. The Generator Promise

Generate Mode should not create only the world as it is.

Generate Mode should create the world as a promise of future detail.

Every important generated thing should carry enough meaning for later systems to use it.

### 3.1 Coast Example

A coast should not be only visible coastline.

A generated coast should carry:

```text
coast type,
shelf context,
wave exposure tendency,
river-mouth likelihood,
harbor suitability,
settlement suitability,
erosion/deposition tendency,
local tile edge behavior,
export context,
and diagnostic proof that it is not arbitrary visual noise.
```

### 3.2 Mountain Example

A mountain range should not be only high terrain.

A generated mountain range should carry:

```text
cause,
age tendency,
ridge direction,
pass likelihood,
snowline tendency,
rain shadow effect,
river source potential,
travel difficulty,
resource potential,
local tile context,
and diagnostic proof that it belongs to the geologic spine.
```

### 3.3 River Example

A river should not be only a line or low path.

A generated river should carry:

```text
source region,
flow direction,
basin membership,
downstream outlet,
floodplain tendency,
sediment/deposition tendency,
settlement support,
road/trade crossing potential,
local tile crossings,
and diagnostic proof that it follows terrain and watershed logic.
```

### 3.4 Settlement Suitability Example

A settlement suitability field should not be only a future city marker.

It should carry:

```text
water access,
coast/harbor access,
road/trade potential,
slope/buildability,
flood/storm risk,
biome/resource context,
culture/region affordance,
local tile context,
and export metadata that can later support settlement stickers or external city tools.
```

### 3.5 Micro Tile Example

A micro tile should not be only a square on the globe.

It should carry:

```text
tile ID,
tile bounds,
tile seed,
tile neighbors,
macro context,
local terrain summary,
local hydrology crossings,
local biome/surface summary,
activation recipe,
preview/proxy data,
export coordinate metadata,
dirty-state baseline,
and diagnostics that prove it can be activated later without losing world context.
```

Summary law:

```text
Every generated thing is born with enough meaning for future systems to use it.
```

---

## 4. What Generate Mode Creates

Generate Mode must create more than terrain.

It creates the initial valid state of the world.

Required generated domains:

```text
planet identity,
planet foundation,
seed streams,
macro globe,
world grid / coordinate structure,
dormant micro tile system,
geologic spine,
plate/crust/process fields,
continental and ocean-basin structure,
terrain,
ocean basins,
sea level,
bathymetry,
hydrology,
climate,
biome potential,
surface material potential,
resource potential,
settlement suitability,
movement/travel suitability,
region/culture/civilization starting hints,
simulation initial conditions,
diagnostics,
debug overlays,
stage artifacts,
export coordinate contracts,
save/load source fields.
```

The mistake is treating generator as:

```text
noise heightmap + water + colors
```

WorldWright Generate Mode must be:

```text
seeded world causality
```

A mountain exists because something caused it.

A desert exists because climate and geography caused it.

A river exists because terrain and water flow caused it.

A settlement site exists because geography made it viable.

A micro tile exists because the globe must be ready for local authoring and export.

---

## 5. What Generate Mode Does With Its Created Data

Generate Mode does not merely create data and stop.

Generate Mode must do specific things with every generated output.

### 5.1 Create

Generate creates the initial canonical source for the world.

Examples:

```text
planet foundation,
base generated terrain,
geologic cause fields,
sea level,
initial hydrology,
climate baseline,
biome potential,
micro tile registry,
initial suitability fields.
```

### 5.2 Classify

Generate classifies generated truth into meaningful categories.

Examples:

```text
land role,
ocean role,
coast type,
crust type,
river basin,
climate zone,
biome potential,
surface material tendency,
settlement suitability class,
travel difficulty class,
resource potential class.
```

Classification must explain the world. It must not secretly own visible truth unless its authority is explicitly defined.

### 5.3 Bind

Generate binds fields together by cause and dependency.

Examples:

```text
plate/crust/process fields influence terrain,
terrain plus sea level derives land/water,
terrain drives drainage,
land/ocean/elevation drives climate,
climate plus terrain drives biome potential,
terrain/hydrology/resources drive settlement suitability,
macro context seeds micro tile activation.
```

### 5.4 Seed

Generate assigns stable seeds and seed streams so the world can be regenerated, deepened, diagnosed, and exported without accidental unrelated changes.

Examples:

```text
world seed,
planet foundation seed,
geology seed,
hydrology seed,
climate seed,
biome seed,
resource seed,
settlement suitability seed,
micro tile seed,
stage artifact seed,
diagnostic seed.
```

### 5.5 Expose

Generate exposes outputs to downstream systems through documented contracts.

Examples:

```text
Create Mode reads generated context before placing clay stickers.
Sim Mode reads initial world state before branching.
Save/Load persists canonical generated source and rebuildable cache references.
Export reads height, masks, metadata, and coordinate contracts.
UI displays generated state and debug overlays without owning truth.
Diagnostics inspect generated fields and artifacts.
```

### 5.6 Protect

Generate must protect its owned truth from later silent mutation.

Examples:

```text
Create Mode may add authored clay stickers and edit layers but must not secretly rewrite generated base truth.
Sim Mode may create branch-local deltas but must not silently mutate generated canon.
Renderer may display generated data but must not become data authority.
Export may transform data into artifacts but must not change source world state.
```

### 5.7 Diagnose

Generate must produce enough evidence to prove the world is coherent.

Examples:

```text
stage diagnostics,
field statistics,
visual snapshots,
debug overlays,
failure flags,
seed metadata,
input/output hashes,
regression artifacts.
```

### 5.8 Hand Off

Generate hands the world to other systems.

Examples:

```text
Create Mode receives generated terrain, hydrology, biome/surface context, and sticker-safe local contexts.
Sim Mode receives initial canonical state and proxy fields.
Export receives height, masks, vectors, IDs, coordinate metadata, and loss-report context.
Save/Load receives canonical source fields and recomputable cache definitions.
Future modular tools receive structured metadata rather than hidden assumptions.
```

### 5.9 Preserve

Generate must define what gets saved, what gets recomputed, and what is debug-only.

Examples:

```text
canonical generated source fields are preserved,
derived fields may be recomputed,
debug overlays may be regenerated or omitted,
large caches may be invalidated and rebuilt,
export artifacts are outputs, not source truth.
```

---

## 6. Macro Birth Contract

Macro Birth is the generation of the visible planet-scale world.

Macro Birth must produce:

```text
planet identity,
planet size/context/style parameters,
macro terrain,
continent/ocean structure,
major geologic structure,
major hydrology,
major climate structure,
major biome/surface potentials,
major resource potentials,
major settlement/travel suitability,
macro diagnostics,
macro debug overlays,
macro view data.
```

Macro Birth is successful only if the user can look at the planet and believe:

```text
this is a coherent world,
this land has structure,
these oceans have depth,
these mountains have cause,
these rivers have basins,
these climates have reasons,
this world is worth entering in Create Mode.
```

Macro Birth is not successful if it merely reaches numerical land/water targets while producing weak, ugly, circular, unsupported, or incoherent forms.

---

## 7. Micro Readiness Contract

Micro Readiness is the generation of dormant local-detail structure.

Generate Mode must create the structure that lets later systems activate local detail without building all local detail immediately.

Micro Readiness must produce:

```text
micro tile registry,
stable tile IDs,
tile bounds,
tile neighbors,
tile seeds,
tile macro context,
tile preview/proxy summaries,
tile activation recipes,
tile edge/neighbor context,
tile coordinate/local-frame metadata,
tile export metadata,
tile dirty-state baseline,
tile save/load references.
```

Micro Readiness does not mean every micro tile has full high-resolution terrain active.

Micro Readiness means every micro tile is prepared to become high-detail later.

Core rule:

```text
Dormant micro tiles are source-preserved potential.
They are not forgotten data.
They are not fully active detail.
```

A micro tile may be activated later by:

```text
user selection,
Create Mode local authoring,
export request,
Sim Mode detailed resolution,
diagnostic sampling,
City Maker handoff request,
manual batch generation.
```

---

## 8. Downstream Handoff Matrix

Generate Mode is the root that other systems live off.

### 8.1 Create Mode Handoff

Generate gives Create Mode:

```text
macro world context,
micro tile context,
base terrain,
water/hydrology context,
biome/surface context,
settlement/travel/resource context,
coordinate/local-frame context,
existing generated constraints,
safe places to author clay stickers,
and diagnostics that explain what the user is authoring against.
```

Create Mode may add:

```text
clay stickers,
authored edit layers,
metadata-rich place markers,
local modifications,
locks,
relationships,
user-authored export intent.
```

Create Mode must not secretly rewrite Generate-owned base truth.

### 8.2 Sim Mode Handoff

Generate gives Sim Mode:

```text
canonical starting world,
terrain and land/water state,
hydrology state,
climate/biome baseline,
settlement suitability,
movement/travel suitability,
resource potential,
macro region hints,
initial proxy fields,
seeded variation context.
```

Sim Mode may create:

```text
branch-local events,
branch-local state changes,
branch-local deltas,
simulation summaries,
canon promotion proposals.
```

Sim Mode must not silently rewrite Generate-owned canon.

### 8.3 Save/Load Handoff

Generate gives Save/Load:

```text
canonical generated source fields,
seed streams,
generation parameters,
field ownership metadata,
micro tile registry,
recomputable cache definitions,
stage artifact references,
schema version,
checksums/hashable source identity.
```

Save/Load must preserve source truth and report repair, migration, cache invalidation, or loss.

### 8.4 Export Handoff

Generate gives Export:

```text
height data,
water masks,
slope/material/surface potentials,
road/river/coast vectors where available,
tile coordinate metadata,
world coordinate metadata,
scale metadata,
source IDs,
field mapping context,
loss-report context.
```

Export must transform generated data into external artifacts without mutating the source world.

### 8.5 UI Handoff

Generate gives UI:

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

UI may display and command actions. UI must not own generated truth.

### 8.6 Diagnostics Handoff

Generate gives Diagnostics:

```text
stage inputs,
stage outputs,
field statistics,
visual artifacts,
seed metadata,
thresholds,
known failure signatures,
source/output hashes.
```

Diagnostics must be able to reject fake success.

### 8.7 Future Tool Handoff

Generate gives future modular tools:

```text
terrain context,
height crops,
settlement/site metadata,
world coordinates,
scale,
source IDs,
local context,
structured sidecar metadata,
loss reports.
```

Future tools must not depend on hidden WorldWright assumptions.

---

## 9. Generator Authority Law

Generate Mode owns initial world birth only.

Generate may create:

```text
canonical base generated fields,
initial derived fields,
debug fields,
stage artifacts,
macro world records,
micro tile source records,
initial suitability fields,
initial proxy fields,
initial export coordinate contracts.
```

Generate may recompute derived generated fields only while respecting authored and simulated layers.

Generate must not:

```text
overwrite user-authored clay stickers,
silently rewrite committed Create Mode authored data,
mutate Sim Mode branches,
promote branch-local Sim data into canon,
change source world during export,
let renderer output become source truth,
use IDs as direct visual authority unless explicitly contracted,
pretend debug overlays are canonical world data.
```

The stack is:

```text
base generated truth
+ authored clay sticker/edit truth
+ simulation branch truth
= rendered/resolved world
```

Generate creates the first layer.

It does not own the other layers.

---

## 10. Data Class Contract

Every generated field must eventually be classified as one of these data classes:

```text
CANONICAL_GENERATED_SOURCE
DERIVED_GENERATED_FIELD
DEBUG_FIELD
TRANSIENT_PREVIEW
RECOMPUTABLE_CACHE
STAGE_ARTIFACT
EXPORT_ARTIFACT
MICRO_TILE_SOURCE
MICRO_TILE_CACHE
SIM_INITIAL_PROXY
```

### 10.1 Canonical Generated Source

Canonical generated source is preserved.

Examples:

```text
world seed,
planet foundation,
initial generation parameters,
base terrain source fields,
core geologic/process source fields,
micro tile registry,
stable source IDs.
```

### 10.2 Derived Generated Field

Derived generated fields are recomputable from source and rules.

Examples:

```text
land/water classification,
slope,
flow accumulation,
climate bands,
biome potential,
surface tendencies,
settlement suitability.
```

### 10.3 Debug Field

Debug fields explain generation, but must not secretly become source truth.

Examples:

```text
stage labels,
provenance IDs,
diagnostic overlays,
authority visualization layers.
```

### 10.4 Recomputable Cache

Caches may be invalidated and rebuilt.

Examples:

```text
micro tile resolved preview,
render meshes,
export-prep rasters,
stage preview images,
large computed arrays.
```

### 10.5 Export Artifact

Export artifacts are external outputs.

They are not canonical world truth unless explicitly imported and committed by a separate process.

---

## 11. Generator Non-Scope

Generate Mode must not become:

```text
a full Create Mode authoring system,
a full Sim Mode timeline system,
a full renderer authority system,
a full export tool,
a city designer,
an Unreal editor,
a save-file repair tool,
a hidden mutation system.
```

Generate may prepare data for those systems.

Generate may create initial context for those systems.

Generate may validate that those systems can later use the world.

Generate must not secretly do their jobs.

---

## 12. Proof Requirements

Generate Mode must prove itself through multiple evidence types.

No single proof is enough.

Required proof categories:

```text
code audit,
stage diagnostics,
field statistics,
visual snapshots,
seed regression runs,
export sanity checks,
save/load round-trip checks,
authoring safety checks,
sim handoff checks,
micro tile activation checks.
```

The approved authority loop is:

```text
code audits,
generated-stage diagnostics,
CI artifacts,
snapshot visuals,
regression tests.
```

Generator work must not be accepted by tests alone if the planet still fails visually or causally.

Generator work must not be accepted by screenshots alone if diagnostics contradict it.

Generator work must not be accepted by diagnostics alone if the world is ugly, incoherent, or unfit for authorship.

---

## 13. First Diagnostic Families

The full diagnostic set will be deepened later, but Generate Mode must eventually cover at least:

```text
seed determinism,
field ownership integrity,
planet foundation validity,
plate/process validity,
landmass quality,
ocean/bathymetry quality,
hydrology continuity,
climate plausibility,
biome/surface coherence,
resource plausibility,
settlement suitability plausibility,
travel/movement plausibility,
micro tile registry integrity,
micro tile neighbor integrity,
micro tile activation readiness,
export coordinate readiness,
save/load source integrity,
performance/memory budget.
```

Diagnostics must be able to answer:

```text
What did Generate create?
Why did it create it?
Who owns it?
What depends on it?
Can it be recomputed?
Can it be saved?
Can it be exported?
Can it be authored against?
Can failure be detected before the user trusts it?
```

---

## 14. First Forbidden Shortcuts

Generate Mode must not use these shortcuts:

```text
Do not treat a visible globe as proof of a good world.
Do not use raw noise terrain as the world spine.
Do not let cleanup hide causal failure.
Do not make land/water the authority instead of terrain plus sea level.
Do not let renderer color become world truth.
Do not treat debug IDs as direct visual authority.
Do not create micro tiles as UI-only selection boxes.
Do not defer all micro tile identity until the user zooms in.
Do not generate every high-resolution micro tile by default.
Do not let Generate overwrite authored clay stickers.
Do not let Sim Mode data leak into generated canon.
Do not export without source IDs, scale metadata, and loss reporting.
Do not save only final visuals while losing source causality.
Do not accept passing tests if generated planets still fail visually and causally.
```

---

## 15. First Definition of Generator Blueprint Readiness

Generate Mode blueprint readiness requires all of the following:

```text
Generate has a core law.
Generate has explicit scope and non-scope.
Generate defines every generated domain.
Generate defines macro birth.
Generate defines micro readiness.
Generate defines authority and ownership.
Generate defines data classes.
Generate defines handoffs to Create, Sim, Save/Load, Export, UI, Diagnostics, and future tools.
Generate defines proof requirements.
Generate defines forbidden shortcuts.
Generate defines initial diagnostics.
Generate defines what is still delegated to specialized generator blueprints.
```

Implementation readiness is not reached until each generated domain also has:

```text
field contracts,
seed contracts,
stage order,
mutation rules,
diagnostic thresholds,
regression tests,
artifacts,
failure modes,
and readiness criteria.
```

---

## 16. Specialized Blueprints Governed By This Constitution

This constitution does not replace specialized generator blueprints.

It governs and organizes them.

Specialized generator blueprints should include or remain responsible for:

```text
Planet Foundation,
Generate Layer Gates,
Generate Pipeline Authority Ledger,
Generate Slider Contract,
Generate Feature Material Handoff,
Geologic Feature Authority,
Continent Skeletons and Ocean Basins,
Landmass Genesis,
Crust Provinces and Islands,
Physical Layer Math,
Climate Surface Feedback,
Export Height Sanity,
Micro Tile Architecture,
Unreal/Heightmap Export Contract.
```

If specialized blueprints conflict with this constitution, the conflict must be resolved explicitly.

If this constitution is too vague for a specialized subsystem, that subsystem must deepen its own blueprint rather than relying on implication.

---

## 17. Locked Summary Law

```text
Generate Mode creates both the visible macro planet and the dormant structure for future local detail.

It does not merely make a world now.
It makes a world now and prepares every part of that world to become deeper later.

Every generated thing must be born with enough meaning for future systems to use it.

Generate is the foundation that Create, Sim, Save/Load, Export, UI, diagnostics, and future modular tools live off.
If Generate is weak, everything downstream inherits weakness.
```
