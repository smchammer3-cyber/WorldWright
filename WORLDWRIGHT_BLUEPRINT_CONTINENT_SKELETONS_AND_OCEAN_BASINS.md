# WorldWright Blueprint Addendum: Continent Skeletons and Ocean Basin Identity

Status: planned geography foundation  
Related blueprint: `WORLDWRIGHT_BLUEPRINT_LEVEL_5_GEOGRAPHY_AND_POLITICAL_SYSTEMS.md`

This note records the next major geography direction after crust provinces and province coherence.

The current generator has improved coast cleanup, crust provinces, caused islands, and globe rendering. The remaining problem is that land can still look like squiggly islands or broken land noise because continents are not yet first-class world objects.

---

## Core principle

Continents are not merely land above sea level.

A continent is a large body of thick, buoyant continental crust organized around one or more old stable cores. Sea level only reveals or hides parts of that body.

A continent may include:

```text
dry land
continental shelf
submerged plateau
old shield / craton
interior basin
mountain belt
rift margin
passive margin
attached shelf islands
nearby accreted fragments
```

Therefore WorldWright should not define continents as:

```text
height > sea level
```

It should define them as:

```text
continent skeleton + continental crust field + margin history + sea-level flooding
```

---

## Planet bones, flesh, and skin

World generation should be organized as:

```text
Bones:
continent cores, ocean basins, plate margins, continent skeletons

Flesh:
crust provinces, mountain belts, basins, shelves, rifts

Skin:
heightmap detail, coast noise, rivers, biomes, snow, colors
```

The current project has some flesh and skin. It still needs stronger bones.

---

## Definition: continent

In WorldWright, a continent should mean:

```text
A large coherent region of continental crust organized around one or more old cores,
with surrounding shelves, margins, basins, and associated islands or fragments.
```

A continent is geological. A landmass is visual.

Important distinctions:

```text
Continent = geological body
Landmass = connected visible dry land above sea level
Island = smaller visible land body, with a cause or ancestry
Ocean = major water basin over oceanic crust
Sea = smaller ocean-connected water body partly enclosed by continents
Lake = enclosed water on continental crust, not connected to global ocean
```

---

## Continent skeleton fields

Future cells should gain hidden skeleton fields such as:

```text
continentId
continentCoreStrength
continentality
distanceToContinentCore
marginType
oceanBasinId
shelfStrength
mountainBeltId
islandCause
waterBodyId
waterBodyType
```

Field meanings:

```text
continentId
= which geological continent this cell belongs to, even if underwater

continentCoreStrength
= how close/strongly tied this cell is to an old stable core

continentality
= how much this cell behaves like continental crust

distanceToContinentCore
= helps decide core, margin, shelf, fragment, or unrelated island

marginType
= passive, active, rift, collision, transform, accreted

oceanBasinId
= which major ocean basin this cell belongs to

shelfStrength
= shallow flooded continental edge

mountainBeltId
= long connected uplift scar

islandCause
= island arc, volcanic hotspot, continental fragment, rift fragment, drowned shelf high, invalid/no-cause

waterBodyType
= ocean, sea, inland sea, lake, wetland
```

---

## Continent shape grammar

A continent should not be a random squiggly blob. It should have a shape archetype.

Each continent skeleton should have:

```text
shapeType
core position
size
main axis
elongation
lobes
rifts
mountain belts
margin arcs
attached fragments
```

Candidate shape types:

```text
COMPACT_SHIELD
A broad stable continent with an old rounded core, mild basins, and broad shelves.

RIFTED_BLOCK
A continent torn open by rifts, with bays, inland seas, stretched margins, and nearby fragments.

COLLISION_WEDGE
A wedge/triangle-like continent with one compressed mountain edge and a lower basin behind it.

ARC_ACCREDITED
A main continent with messy accreted margins, attached island arcs, and welded fragments.

RIBBON_CONTINENT
A long narrow strip of continental crust with a spine or rift axis.

TWIN_LOBE_CONTINENT
Two old cores joined by a belt or basin, often looking like fused land bodies.

PENINSULAR_CONTINENT
One core with one or two long arms or peninsulas.

BROKEN_MARGIN_CONTINENT
A main body with nearby continental shelf islands and fragments.
```

---

## Continent generation order

Better order:

```text
1. Build sphere/grid.
2. Build plates.
3. Place continent cores.
4. Assign continent shape types.
5. Grow continentality fields from cores, lobes, and axis direction.
6. Define ocean basins between continental bodies.
7. Define margins: passive, active, rift, collision, transform, accreted.
8. Define crust provinces inside each continent.
9. Build terrain from skeleton + provinces.
10. Flood by sea level.
11. Classify visible landmasses, islands, shelves, seas, and lakes.
12. Run drainage/rivers.
13. Add climate and biomes.
```

Bad order to avoid:

```text
noise → land → cleanup → hope it looks like continents
```

Good order:

```text
continent skeleton → broad continent mask → province layout → terrain → flood → coast detail
```

---

## Land hierarchy rule

Every visible land cell should belong to one of these systems:

```text
1. continent core/mainland
2. continent margin/shelf/peninsula
3. shelf island or continental fragment
4. island arc
5. volcanic hotspot chain
6. rift fragment
7. other explicit style-mode exception
```

If a land fragment has no cause, it should be merged, lowered, or removed.

This prevents the generator from making worlds that are only medium islands and random fragments.

---

## Ocean basin identity

Oceans should also be first-class structures.

An ocean basin is not merely connected blue pixels. It is a major low region over oceanic crust.

Ocean basin fields may include:

```text
oceanBasinId
oceanicCrustStrength
ridgeDistance
trenchInfluence
abyssalPlainStrength
continentalShelfStrength
```

Ocean classification should happen after sea-level flooding:

```text
global ocean = largest connected salty water system over oceanic basin cells
sea = ocean-connected water partly enclosed by continental margins
inland sea = sea-level basin inside continental crust, connected or nearly connected to ocean
lake = enclosed water on continental crust, not connected to global ocean
```

---

## Lakes

Lakes should be determined after terrain and drainage.

A lake is:

```text
water not connected to the global ocean,
sitting in a depression on continental crust,
usually fed by drainage or climate.
```

Lake causes can later include:

```text
tectonic rift basin
glacial basin
crater basin
endorheic desert basin
flooded sediment basin
river cutoff / oxbow
```

For the first implementation, a simple rule is enough:

```text
water connected to global ocean = ocean/sea
water not connected to global ocean = lake/inland basin
```

---

## Diagnostics needed

The continent skeleton system should add diagnostics that current metrics miss:

```text
continent core count
mainland share
archipelago overload
medium-fragment overload
continent hierarchy score
ocean basin count
invalid island share
shelf island share
continent/terrain mismatch
province/terrain expression
```

Important: tiny island share can be OK while the world still looks like an archipelago planet. The diagnostics need to detect medium-fragment overload and lack of mainland hierarchy.

---

## Next implementation target

Recommended next code PR:

```text
Add continent skeleton shape types
```

Scope:

```text
- Add ContinentShapeType enum.
- Add hidden continent skeleton data.
- Assign each continent a shape type.
- Generate continentCoreStrength / continentality from the skeleton.
- Use shape type to create broad forms:
  compact, rifted, wedge, ribbon, twin-lobe, peninsular, arc-accreted, broken-margin.
- Use continentality to protect mainlands from becoming island confetti.
- Keep coastline noise secondary.
```

The goal is not to perfect visuals immediately. The goal is to make the generator understand:

```text
This is a continent.
This is an ocean.
This is a shelf.
This is a lake.
This is an island because of X.
```

Once this exists, biomes, rivers, countries, cultures, borders, cities, and trade routes can live on a believable skeleton instead of on a noise map.
