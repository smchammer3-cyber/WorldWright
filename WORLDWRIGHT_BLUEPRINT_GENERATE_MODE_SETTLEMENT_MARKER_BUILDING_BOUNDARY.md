# WorldWright Blueprint: Generate Mode Settlement Marker / Building Boundary

Status: authoritative boundary note / correction  
Owner: Iron Man  
Purpose: clarify that Generate Mode settlement work is geography, suitability, candidate zones, abstract markers, constraints, masks, and handoff metadata only. Homes, buildings, placed structures, animated actors, props, ground clutter, and lived-in settlement detail belong to later dedicated layers and must not be generated as canonical settlement geometry during Generate Mode.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_DEEP_HABITABILITY_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_OPERATIONAL_ALGORITHM.md
```

---

## 1. Boundary Law

```text
Generate Mode does not place homes.
Generate Mode does not place buildings.
Generate Mode does not place animated people, animals, vehicles, props, smoke, lights, or lived-in detail.
Generate Mode does not build local settlement layouts.

Generate Mode may create geography-backed settlement suitability.
Generate Mode may create abstract settlement candidate zones.
Generate Mode may create abstract settlement markers.
Generate Mode may create build/no-build masks and constraints.
Generate Mode may create micro-tile and Unreal handoff metadata.
```

Short form:

```text
Generate Mode = geography and markers.
Homes/buildings = separate later layer.
Ground actors/animations/detail = later local/runtime layer.
```

---

## 2. What Generate Mode Is Allowed To Emit

Allowed Generate Mode settlement outputs:

```text
settlement suitability fields,
settlement candidate zones,
settlement type candidates,
abstract settlement marker candidates,
water/buildability/habitability/resource/hazard fields,
port/farm/mine/camp precondition masks,
build/no-build/no-settle masks,
road-entry precondition hints,
source proof refs,
edge continuity constraints,
micro tile recipe hints,
Unreal metadata sidecars.
```

These are strategic/geographic outputs.

They are not buildings.

---

## 3. What Generate Mode Must Not Emit

Forbidden as canonical Generate Mode settlement output:

```text
actual houses,
actual cabins,
actual shops,
actual barns,
actual docks as placed meshes,
actual roads as placed local geometry,
actual city blocks,
actual walls/fences,
actual interiors,
actual props,
actual settlement actor spawners,
animated villagers,
ambient animals,
smoke/fire/light actors,
full Unreal building placement,
local settlement layout as final truth.
```

Generate Mode may say:

```text
this tile can support a village marker,
this shore can support a port marker,
this area has farm preconditions,
this zone has mine-camp preconditions,
this micro tile should receive build masks and recipe hints.
```

Generate Mode must not say:

```text
place this exact house here,
spawn this exact building cluster here,
spawn villagers here,
animate a market here,
create this final town layout here.
```

---

## 4. Later Layers That May Own Homes / Buildings

Homes and buildings should belong to later dedicated systems such as:

```text
Settlement Genesis,
Settlement Layout,
Building/Housing Layer,
Create Mode authored placement,
Micro Tile activation,
Unreal runtime generation,
Sim Mode growth/decay/abandonment,
Local Detail / Ground Actor / Animation systems.
```

Those systems may consume Generate Mode outputs:

```text
candidate zones,
settlement type candidates,
build masks,
no-build masks,
terrain constraints,
surface material constraints,
resource constraints,
water constraints,
hazard constraints,
edge continuity,
recipe hints,
source proof.
```

But they must not rewrite the Generate Mode causes unless an explicit Create/Sim edit is versioned and saved.

---

## 5. Marker Meaning

A Generate Mode settlement marker means:

```text
There is geographic support for this kind of settlement possibility here.
```

It does not mean:

```text
Buildings already exist here.
People already live here.
A town layout has been generated.
The economy exists.
Roads exist.
A culture or country owns this place.
Unreal actors should spawn immediately.
```

Marker examples:

```text
candidate_village_zone,
candidate_port_zone,
candidate_farm_support_zone,
candidate_mining_camp_zone,
candidate_nomadic_node,
candidate_frontier_outpost_zone,
low_confidence_settlement_zone.
```

---

## 6. Micro Tile Rule

Micro tiles may receive:

```text
local settlement recipe hints,
build/no-build masks,
no-settle masks,
port/farm/mine/camp precondition masks,
terrain/material/hazard constraints,
edge continuity constraints,
source proof refs.
```

A micro tile must not instantiate final homes/buildings unless:

```text
the micro tile is opened,
a later settlement/building system runs,
Create Mode places authored objects,
Sim Mode grows or modifies settlement detail,
or Unreal/runtime generation explicitly consumes recipe hints.
```

---

## 7. Implementation Rule

When implementing Settlement Suitability:

```text
Do not generate building meshes.
Do not generate final local settlement layouts.
Do not spawn homes.
Do not spawn animated actors.
Do not create runtime ground detail.
Do not treat Unreal building spawners as Generate Mode source truth.
```

Instead, emit:

```text
candidate markers,
suitability fields,
constraints,
source proof,
recipe hints,
metadata handoffs.
```

---

## 8. Summary Law

```text
Generate Mode decides whether the geography can support settlement markers.
It does not create homes.
It does not create buildings.
It does not create local settlement life.

Homes, buildings, ground details, actors, and animations are separate later layers that consume Generate Mode constraints.
```
