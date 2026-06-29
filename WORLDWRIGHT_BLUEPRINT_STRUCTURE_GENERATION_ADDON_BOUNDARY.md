# WorldWright Blueprint: Structure Generation Add-On Boundary

Status: authoritative boundary note / current-scope correction  
Owner: Iron Man  
Purpose: clarify that WorldWright does not currently generate structures. Homes, buildings, cabins, shops, barns, docks as meshes, walls, local settlement layouts, interiors, props, actors, and animated lived-in detail are not part of the current Generate Mode implementation contract. Structure generation is a future add-on/module that may consume Generate/Micro/Sim/Create outputs later.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_MARKER_BUILDING_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MICRO_MODE_MARKER_VISIBILITY_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SIM_READINESS_AND_EXTRAPOLATION_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MOVEMENT_TRAVEL_TRADE_SUITABILITY_CORE_CONTRACT.md
```

---

## 1. Current Scope Law

```text
WorldWright does not generate structures yet.
Structure generation is an add-on.
Generate Mode must not implement structures as part of the current world-generation contract.
```

This applies to:

```text
homes,
houses,
cabins,
shops,
barns,
warehouses,
docks as placed meshes,
bridges as placed meshes,
walls,
fences,
city blocks,
interiors,
props,
actors,
animations,
local settlement layouts,
full Unreal building placement.
```

---

## 2. What Current WorldWright May Generate Instead

Current WorldWright may generate:

```text
geography,
terrain,
oceans,
coasts,
rivers,
climate,
biomes,
surface materials,
resources,
settlement suitability,
movement suitability,
abstract candidate zones,
abstract likelihood markers,
Micro Mode minimap/overlay metadata,
build/no-build masks,
port/farm/mine/camp preconditions,
route-entry likelihood,
source proof,
recipe hints,
constraints and handoffs.
```

These are not structures.

They are inputs a future structure module may consume.

---

## 3. Structure Add-On Ownership

A future Structure Generation add-on may own:

```text
building placement,
housing placement,
shops/workshops/warehouses,
farm structures,
dock meshes,
bridge meshes,
walls/fences,
local settlement layout,
interiors,
props,
local actor spawn hints,
animated settlement life,
Unreal building export.
```

The add-on must consume:

```text
settlement candidate zones,
settlement type candidates,
Sim-emergent settlement state if present,
Create-authored edits if present,
build/no-build masks,
terrain constraints,
surface material constraints,
water constraints,
resource constraints,
movement constraints,
hazard constraints,
Micro Tile bounds and edge continuity,
source proof and version metadata.
```

---

## 4. No Accidental Structure Generation

Current implementation must not accidentally treat these as structures:

```text
candidate_village_zone,
likely_farm_zone,
likely_port_zone,
likely_mine_camp_zone,
route_entry_likelihood,
build_mask,
no_build_mask,
Unreal metadata sidecar,
recipe hint,
local likelihood marker.
```

These mean:

```text
This place could support future detail.
```

They do not mean:

```text
Place a building now.
```

---

## 5. Sim Relationship

Sim Mode may later create conditions for structures, but the structures themselves still belong to the add-on/module.

Examples:

```text
Sim settlement emerges -> Structure add-on may later place homes.
Sim port grows -> Structure add-on may later place docks.
Sim mine camp grows -> Structure add-on may later place mine buildings.
Sim farm expands -> Structure add-on may later place farm buildings.
Create Mode author places a town -> Structure add-on may later materialize layout/buildings.
```

Rules:

```text
Sim can create state that justifies structures.
Structure add-on materializes structures.
Generate Mode does not.
```

---

## 6. Micro Mode Relationship

Micro Mode may show local likelihood and constraints.

Micro Mode must not imply structures exist unless a future Structure add-on, Sim state, or Create-authored state has explicitly produced them.

Allowed Micro Mode labels:

```text
likely village area,
likely farm support,
likely port support,
likely mine camp support,
buildable ground,
no-build hazard,
future structure support.
```

Forbidden labels for current WorldWright unless a Structure add-on exists:

```text
house,
building,
shop,
barn,
dock mesh,
town layout,
spawn building,
spawn villagers,
animated market.
```

---

## 7. Implementation Rule

For current WorldWright:

```text
Do not implement structure generation.
Do not add building placement to Generate Mode.
Do not add local settlement layouts to Generate Mode.
Do not add homes/buildings as Sim side effects unless the Structure add-on exists.
Do not export Unreal building meshes from Generate Mode.
Do not let candidate markers become structures.
```

Instead:

```text
preserve suitability,
preserve masks,
preserve source proof,
preserve recipe hints,
preserve add-on handoff metadata.
```

---

## 8. Future Add-On Contract Placeholder

A future Structure Generation add-on should receive its own blueprint family:

```text
WORLDWRIGHT_BLUEPRINT_STRUCTURE_GENERATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_STRUCTURE_GENERATION_LAYOUT_MODEL.md
WORLDWRIGHT_BLUEPRINT_STRUCTURE_GENERATION_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_STRUCTURE_GENERATION_UNREAL_EXPORT.md
```

Until that exists, structures are out of scope.

---

## 9. Summary Law

```text
No structures are generated in WorldWright yet.
Structures are a future add-on.

Current WorldWright generates geography, fields, masks, likelihood markers, constraints, and handoffs.
It does not generate homes, buildings, layouts, actors, or animated local life.
```
