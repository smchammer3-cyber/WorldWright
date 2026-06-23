# WorldWright Blueprint Addendum: Crust Provinces and Caused Islands

Status: active geography migration note  
Related blueprint: `WORLDWRIGHT_BLUEPRINT_LEVEL_5_GEOGRAPHY_AND_POLITICAL_SYSTEMS.md`

This note records the next geography layer after the cube-sphere renderer stabilization.

---

## Purpose

WorldWright should not make continents and islands by letting random height noise cross sea level everywhere.

The generator needs a middle layer between raw crust fields and visible terrain:

```text
crustThickness + crustAge + boundary activity
→ crust province
→ terrain / coasts / island preservation
```

Crust provinces let the world say why a place exists before it decides what it looks like.

---

## Province classes

The initial province set is:

```text
OLD_SHIELD
MOBILE_BELT
SEDIMENT_BASIN
RIFT_MARGIN
COASTAL_PLAIN
VOLCANIC_PROVINCE
OCEANIC_BASIN
ISLAND_ARC
```

These are not final scientific labels. They are practical cause labels for making geography feel less painted.

---

## Terrain intent

Expected behavior:

```text
OLD_SHIELD → broad stable highlands, modest internal relief
MOBILE_BELT → uplift and rougher relief
SEDIMENT_BASIN → lower, flatter, floodable interior regions
RIFT_MARGIN → broken coasts, rifted bays, straits, fractured margins
COASTAL_PLAIN → low flooded plains and shelves
VOLCANIC_PROVINCE → local uplift and rough volcanic relief
OCEANIC_BASIN → deeper young/thin oceanic crust
ISLAND_ARC → caused islands and shallow arc chains
```

This gives terrain a geological reason instead of only adding more random noise.

---

## Island rule

Do not remove all small islands. Remove accidental islands.

A small island should be preserved when it has a cause:

```text
island arc
volcanic province
rift margin fragment
high/thick old crust remnant
active convergent boundary
high volcanic activity
```

A small island should be sinkable or merged when it is just an accidental tiny height crossing with no cause.

---

## Guardrails

Do not use provinces as a hard land/water mask.

Do not let provinces become obvious puzzle pieces.

Do not over-correct islands until archipelagos disappear.

Do not increase plate seam imprint while trying to add relief.

Do not solve blobby continents by adding unstructured noise everywhere.

---

## Diagnostics to watch

After province work, inspect:

```text
land relief
height relief
largest landmass share
landmass count
tiny island share
coast density
long straight coast
plate seam imprint
plate/terrain mismatch
crust contrast
old stable crust share
```

Visual checks are still required. A planet can pass metrics and still look like painted blobs.
