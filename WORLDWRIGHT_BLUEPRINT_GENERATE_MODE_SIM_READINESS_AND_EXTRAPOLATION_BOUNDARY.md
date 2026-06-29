# WorldWright Blueprint: Generate Mode Sim Readiness and Extrapolation Boundary

Status: authoritative boundary note / correction  
Owner: Iron Man  
Purpose: clarify that many Generate Mode suitability layers are not meant to instantiate final roads, buildings, homes, settlements, actors, economies, or animated detail. They prepare Sim-ready potential: probability fields, candidate zones, constraints, masks, source proof, and recipe hints that later Sim, Create, Micro Tile, Settlement Layout, Route Generation, Building/Housing, and runtime systems may use to instantiate, grow, decay, extrapolate, and transform local world detail over time.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_MARKER_BUILDING_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MICRO_MODE_MARKER_VISIBILITY_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MOVEMENT_TRAVEL_TRADE_SUITABILITY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_RESOURCES_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_OPERATIONAL_ALGORITHM.md
```

---

## 1. Boundary Law

```text
Generate Mode prepares Sim-readable potential.
Generate Mode does not have to instantiate every world detail.
Generate Mode does not create final buildings, homes, roads, actors, local layouts, or economies.

Sim Mode may instantiate some details from Generate Mode potential.
Sim Mode may extrapolate some details from existing simulated activity.
Sim Mode must preserve source proof, constraints, and versioned causes.
```

Short form:

```text
Generate Mode = birth-state causes, fields, constraints, and dormant potential.
Micro Mode = local reveal and local likelihood guidance.
Sim Mode = time, activity, growth, decay, extrapolation, and state change.
Create Mode = intentional authored edits.
```

---

## 2. Generate Mode Output Is Sim Readiness

Many generated outputs should be treated as Sim readiness fields:

```text
settlement suitability,
settlement candidate zones,
movement corridor suitability,
route-entry likelihood,
resource occurrence/accessibility,
trade preconditions,
farm support,
port support,
mine-camp support,
build/no-build masks,
hazard masks,
material constraints,
biome/ecology constraints,
water and climate reliability,
source proof refs,
recipe hints,
edge continuity constraints.
```

These outputs mean:

```text
Sim or later systems may evaluate this area.
```

They do not mean:

```text
final object already exists.
```

---

## 3. What Sim Mode May Generate From Readiness

Sim Mode may generate, reveal, grow, or extrapolate some local/stateful details when the right support exists.

Examples:

```text
repeated movement through a pass -> trail likelihood increases,
trail use over time -> road improvement may appear,
settlement candidate + water + food + access + population logic -> settlement may emerge,
settlement growth -> homes/buildings may be placed by Building/Housing layer,
farm support + labor/water/soil/economy logic -> farm plots may appear,
port support + water route use + settlement/trade logic -> docks/harbor detail may appear,
resource occurrence + access + labor/demand -> mine camp may appear or expand,
hazard event -> settlement may shrink, abandon, reroute, or move,
route disruption -> trade path may weaken or shift,
climate/resource change -> settlement and movement patterns may adapt.
```

Key rule:

```text
Sim may extrapolate from use and state, but only inside source-supported constraints unless explicitly edited.
```

---

## 4. What Sim Mode Must Not Do Freely

Sim Mode must not use readiness fields as permission to create unsupported detail everywhere.

Forbidden without source support or explicit Create/Sim edit:

```text
spawn buildings where settlement suitability is invalid,
grow roads across hard barriers,
create farms without soil/water/climate/slope support,
create ports without shoreline/bathymetry/support,
create mines without accessible resources,
create trade routes without movement/resource/settlement preconditions,
create economy demand out of nothing,
create culture/countries from movement fields alone,
rewrite geology, terrain, water, climate, biomes, resources, or surface materials to justify Sim state,
turn hidden Generate Mode probability fields into visible global clutter.
```

---

## 5. Extrapolation Classes

Sim extrapolation should be separated by class.

### 5.1 Movement Extrapolation

```text
route use,
trail emergence,
road improvement,
bridge/ferry/canal construction potential,
seasonal route changes,
blocked route decay,
new shortcut discovery.
```

Requires:

```text
movement suitability,
barrier rules,
water/crossing support,
surface material support,
settlement/resource demand or agent activity,
source proof.
```

### 5.2 Settlement Extrapolation

```text
camp emergence,
village emergence,
settlement growth,
settlement shrinkage,
abandonment,
relocation,
frontier outpost expansion,
port town growth,
mine camp growth.
```

Requires:

```text
settlement suitability,
water support,
buildability,
food/survival logic,
hazards,
movement access,
resources where relevant,
source proof.
```

### 5.3 Building / Housing Extrapolation

```text
homes,
shops,
warehouses,
docks,
workshops,
barns,
walls,
local layouts,
props,
animated local life.
```

Requires:

```text
Settlement Layout or Building/Housing layer,
Micro Tile activation or runtime generation,
valid settlement/candidate state,
build masks,
no-build masks,
material constraints,
Create/Sim ownership metadata.
```

Generate Mode does not own this.

### 5.4 Resource Use Extrapolation

```text
mine activity,
quarry activity,
logging activity,
farm expansion,
fishing pressure,
resource depletion,
resource discovery,
resource abandonment.
```

Requires:

```text
resource occurrence/accessibility,
settlement or agent demand,
movement access,
hazard constraints,
Sim economy/resource rules,
source proof.
```

### 5.5 Economy / Trade Extrapolation

```text
trade route emergence,
trade route strengthening,
market center emergence,
transport demand,
resource flow,
route decay,
regional specialization.
```

Requires:

```text
trade preconditions,
settlement state,
resource state,
movement suitability,
access/hazard/cost fields,
economy Sim rules.
```

Trade precondition is not trade.

### 5.6 Ecological / Ground Detail Extrapolation

```text
vegetation regrowth,
trail wear,
mud tracks,
snow tracks,
field clearing,
erosion around roads,
local actor/animation hints,
ambient ground details.
```

Requires:

```text
Micro Tile activation,
Surface Materials,
Biome fields,
Climate/Hydrology support,
Sim or runtime local detail system.
```

---

## 6. State Categories

WorldWright should distinguish these state categories:

```text
GENERATE_POTENTIAL:
  birth-state hidden fields, suitability, probability, masks, constraints, proof.

MICRO_REVEALED_HINT:
  local minimap/overlay showing likely areas and reasons.

SIM_EMERGENT_STATE:
  state that appears because simulated activity, time, population, movement, resource use, or hazards caused it.

CREATE_AUTHORED_STATE:
  user-authored or tool-authored explicit placement/edit.

RUNTIME_DETAIL_STATE:
  temporary local actors, props, animations, ground clutter, VFX, procedural detail, and Unreal runtime embellishment.
```

Rules:

```text
Do not confuse potential with existence.
Do not confuse local hint with final object.
Do not confuse Sim state with Generate source.
Do not confuse runtime detail with saved world truth unless explicitly committed.
```

---

## 7. Sim Ownership of Buildings and City Areas

Buildings and city areas should be separate from Generate Mode.

Generate Mode may store:

```text
candidate settlement area,
settlement type likelihood,
buildable masks,
no-build masks,
water/food/resource/access/hazard support,
layout recipe hints,
source proof.
```

Sim or later layers may own:

```text
city area emergence,
local settlement footprint,
block/parcel/layout choice,
house placement,
building placement,
building growth/decay,
abandonment,
repairs,
fire/destruction/rebuilding,
activity/animation.
```

Rule:

```text
City/building detail is generated from Sim state, Create edits, Micro Tile activation, or dedicated Building/Housing systems — not from Generate Mode directly.
```

---

## 8. Versioning and Source Proof

Every Sim-emergent object or area should record:

```text
sourcePotentialRefs,
simCauseRefs,
creationTickOrEra,
ownerSystem,
version,
supportingFactors,
limitingFactors,
constraintsConsumed,
overridesUsed,
confidenceOrStability,
lastValidatedAgainstGenerateHash.
```

If upstream Generate sources change, Sim-emergent state should be:

```text
validated,
marked stale,
migrated,
kept as authored/sim history,
or recalculated depending on save/version policy.
```

---

## 9. Micro Mode Relationship

Micro Mode is the bridge between hidden Generate potential and visible detail.

Micro Mode may show:

```text
likelihood minimap,
local candidate zones,
build masks,
route-entry likelihood,
resource likelihood,
hazard masks,
Sim-emergent state if it exists,
Create-authored objects if present,
runtime detail if active.
```

Micro Mode should label state clearly:

```text
likely / potential,
emergent / simulated,
authored,
runtime detail,
diagnostic.
```

---

## 10. Implementation Rule

When implementing systems after Generate Mode:

```text
Use Generate outputs as constraints and probabilities.
Use Micro Mode to reveal local likelihood and local active state.
Use Sim Mode to create time-based emergent state.
Use Create Mode to create explicit authored state.
Use Building/Housing/Layout systems to place homes and structures.
Use runtime systems to add actors, animations, VFX, and ground detail.
```

Do not:

```text
treat Generate potential as final existence,
treat hidden fields as global visible clutter,
let Sim create unsupported details,
let runtime actors become source truth accidentally,
let buildings rewrite geography,
let roads rewrite movement suitability,
let economy rewrite resources,
let culture/country maps rewrite physical support.
```

---

## 11. Summary Law

```text
Generate Mode prepares the world.
Micro Mode reveals local likelihood.
Sim Mode can make some things happen over time.
Create Mode can author intentional changes.
Dedicated layout/building/runtime systems create homes, buildings, actors, animations, and local detail.

Sim may extrapolate from generated potential and from its own state,
but it must respect source constraints, versioned causes, and proof.
```
