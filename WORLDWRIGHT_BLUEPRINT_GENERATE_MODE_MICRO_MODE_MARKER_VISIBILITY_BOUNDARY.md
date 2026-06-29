# WorldWright Blueprint: Generate Mode Micro Mode Marker Visibility Boundary

Status: authoritative visibility boundary / correction  
Owner: Iron Man  
Purpose: clarify that Generate Mode may compute settlement, resource, movement, farm, port, mine, biome, material, and other probability/suitability fields, but those fields should not become visible global dots or clutter by default. Macro view remains geography-first. Probability markers and “most likely here” guidance should primarily appear in Micro Mode as a local minimap/overlay that shows where things are most likely to be and what type of thing they are likely to be.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_MARKER_BUILDING_BOUNDARY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_RESOURCES_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SURFACE_MATERIALS_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_OPERATIONAL_ALGORITHM.md
```

---

## 1. Visibility Law

```text
Generate Mode may compute probability and suitability fields.
Generate Mode may store candidate markers and source proof.
Generate Mode should not expose global settlement/resource/building-style dot clutter by default.

Macro Mode should stay geography-first.
Micro Mode may show local marker probability as a minimap or overlay.
```

Short form:

```text
Macro view = world geography.
Micro view = local likelihood map.
```

---

## 2. Macro Mode Rule

Macro Mode should primarily show:

```text
continents,
oceans,
terrain,
coasts,
rivers,
major lakes,
climate/biome/material previews when selected,
large-scale regions,
diagnostics only when explicitly enabled.
```

Macro Mode should not show by default:

```text
global city dots,
global house/building markers,
global resource pickup markers,
global mine/farm/port icons as final truth,
local micro placement hints,
animated settlement actors,
Unreal gameplay spawners.
```

Macro Mode may allow optional debug overlays, but they must be clearly diagnostic and not presented as final world contents.

---

## 3. Micro Mode Rule

Micro Mode may show a local minimap or overlay for:

```text
where settlement is most likely,
where farms are most likely,
where ports/docks are most likely,
where camps/outposts/mines are most likely,
where local resources are most likely,
where roads or route entries may later make sense,
where buildable and no-build zones are,
where hazards are,
where surface/material constraints matter,
where biome/material/ecology support or obstacles are.
```

The overlay should communicate:

```text
likelihood,
type,
confidence,
source/layer reason,
constraints,
warnings.
```

It should not communicate:

```text
this exact building exists,
this exact house exists,
this exact actor spawns,
this exact town layout is final,
this exact economy or population exists.
```

---

## 4. Marker Meaning in Micro Mode

A Micro Mode marker means:

```text
This local area has high support for this kind of possibility.
```

Examples:

```text
likely_village_zone,
likely_farm_zone,
likely_port_zone,
likely_mine_camp_zone,
likely_resource_area,
likely_road_entry_area,
likely_hazard_area,
likely_no_build_area,
likely_biome_material_feature_area.
```

A Micro Mode marker does not mean:

```text
final object already exists,
player-visible object must spawn now,
Unreal actor should be created immediately,
home/building placement is solved,
local animation is solved,
Sim population exists.
```

---

## 5. Minimap / Overlay Data Contract

A local marker overlay should use records similar to:

```ts
interface MicroModeLikelihoodMarker {
  markerId: string;
  tileId: string;
  markerFamily:
    | 'SETTLEMENT_LIKELIHOOD'
    | 'FARM_LIKELIHOOD'
    | 'PORT_LIKELIHOOD'
    | 'MINE_CAMP_LIKELIHOOD'
    | 'RESOURCE_LIKELIHOOD'
    | 'MOVEMENT_ENTRY_LIKELIHOOD'
    | 'HAZARD_LIKELIHOOD'
    | 'NO_BUILD_CONSTRAINT'
    | 'BIOME_MATERIAL_FEATURE'
    | 'CUSTOM';

  likelyType: string;
  likelihood: number;
  confidence: number;
  sourceLayerRefs: string[];
  supportingFactors: string[];
  limitingFactors: string[];
  warnings: string[];
  visibilityMode: 'MICRO_MODE_ONLY' | 'DEBUG_ONLY' | 'EXPLICIT_USER_OVERLAY';
}
```

Rules:

```text
Marker likelihood is not final placement.
Marker type is not final object type.
Marker confidence must stay visible when uncertainty matters.
Marker source refs must point back to generated cause fields.
```

---

## 6. Layer Ownership

Generate Mode owns:

```text
probability fields,
suitability fields,
abstract marker candidates,
source proof,
constraints,
minimap/overlay metadata.
```

Generate Mode does not own:

```text
final local object placement,
home/building placement,
local settlement layout,
actors,
animations,
props,
ambient ground detail,
final gameplay spawner placement.
```

Later systems may own those:

```text
Micro Tile activation,
Settlement Layout,
Building/Housing Layer,
Create Mode,
Sim Mode,
Unreal runtime generation,
Local Detail / Ground Actor / Animation systems.
```

---

## 7. UX Rule

The player-facing default should be:

```text
Look at the planet first.
Open a local micro tile when you want detail.
Use a local minimap/overlay to understand where things are most likely to be.
Choose, reveal, edit, or simulate actual objects later.
```

The UI should avoid implying that hidden Generate Mode fields are already physical objects.

Good labels:

```text
likely village area,
likely farm support,
likely port support,
resource potential,
buildable ground,
no-build hazard,
route entry support.
```

Bad labels:

```text
house,
town exists,
spawn building,
spawn villagers,
resource pickup,
road exists,
economy center.
```

---

## 8. Diagnostics Rule

Diagnostics may show hidden fields globally when explicitly enabled:

```text
settlement suitability overlay,
resource suitability overlay,
movement precondition overlay,
material constraint overlay,
hazard overlay,
confidence overlay,
invalid authority overlay.
```

But diagnostic overlays must be labeled as diagnostics.

They must not become normal player-facing world objects.

---

## 9. Implementation Rule

When implementing marker visibility:

```text
Do not render generated candidate markers as global world contents by default.
Do not render settlement/resource markers as homes/buildings/resources/pickups.
Do not let marker visibility change canonical generation.
Do not let the renderer decide marker truth.
Do not let Unreal spawners become marker source.
```

Instead:

```text
store fields invisibly,
show local likelihood overlays in Micro Mode,
show diagnostics only when requested,
preserve source proof,
hand off to later object/layout systems.
```

---

## 10. Summary Law

```text
WorldWright should not make the macro globe a cluttered board of icons.

Generate Mode stores probability, suitability, and marker metadata.
Macro Mode shows geography.
Micro Mode may show a local minimap of where things are most likely and what kind of thing they may be.
Homes, buildings, actors, animations, props, and final local layouts remain later layers.
```
