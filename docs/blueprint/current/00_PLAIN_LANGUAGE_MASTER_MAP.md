# WorldWright Plain-Language Master Map

## Why this document exists

This is the non-technical explanation of what WorldWright is building. When the project feels muddy, this document should answer:

1. What are we trying to create?
2. What step are we currently working on?
3. Why does that step exist?
4. How will it eventually change the visible planet?

## The core idea

WorldWright should create a biography for a planet before it draws the planet.

```text
choose the starting facts
  → decide what kind of planet those facts allow
  → decide how the inside behaves
  → create broad chapters of geological history
  → create the major structures left by that history
  → spread their influence over the globe
  → create the first terrain
  → let water, climate, ice, wind, and sediment reshape it
  → derive the final surface world
```

The visible globe is the consequence, not the first guess.

## Stage 0 — the request and identity

The user, template, or Generate profile supplies constraints and a root seed. Planet Identity gives the world a stable lineage and coordinate namespace.

A display name or timestamp never decides the planet's geology.

## Stage 1 — create the starting conditions

Some users will specify planet size, water, age, orbit, or unusual rules. Others will simply press Generate.

When facts are missing, an **initial-condition resolver** uses the root seed and generation profile to choose them from approved ranges. It may choose size, density, age, star/orbit context, volatile inventory, atmosphere boundary, rotation, and declared fictional exceptions.

It may not choose continent shapes, mountains, plates, tectonic history, or terrain.

Every starting fact records whether it came from the user, a template, an import, or a deterministic generated default.

## Stage 2 — clean and verify those facts

The sanitizer checks units, ranges, source identity, contradictions, and approved physical formulas. It rejects old generator conclusions disguised as facts.

This is like giving a doctor measurements and symptoms without secretly inserting the diagnosis.

## Stage 3 — planetary premise

The premise answers: what broad kind of body and surface-layer arrangement can these facts support?

It may conclude that the world supports rocky layers, an ice shell, a deep ocean, exposed regolith, or another explicitly approved physical arrangement. It records what is certain, uncertain, or blocked.

It does **not** decide that the world already experienced volcanism, impacts, rifting, or plate tectonics. Those are later conclusions.

## Stage 4 — interior and rheology

This stage asks: what is happening inside, and how easily can the outer shell bend, break, move, melt, or preserve old surfaces?

It resolves ranges and capabilities such as remaining heat, shell mobility, melt potential, rift potential, plume potential, and crust-production capacity.

It does not simulate every atom and it does not place continents or events.

## Stage 5 — geological history

WorldWright creates a small number of meaningful eras rather than billions of tiny time steps.

An example history might be:

```text
early hot resurfacing
  → stable crustal regions survive
  → a major rift opens
  → an ocean basin grows
  → convergence closes part of the basin
  → a mountain belt forms
```

History explains why features have age, ancestry, direction, and relationships.

## Stage 6 — geologic spine

The geologic spine is the planet's structural skeleton.

It stores major continental kernels, ocean basins, rifts, convergence belts, transforms, plume systems, accreted fragments, impacts, and inherited scars as spherical objects and relationships—not painted pixels.

## Stage 7 — process fields

The spine is made spatially useful by spreading its influence over the globe.

At every location, process fields answer questions such as:

- how continental or basin-like is this place?
- how strongly is it being uplifted, pulled apart, or sheared?
- how volcanic is it?
- how resistant is its material?
- which direction should major structures follow?

These fields are geological causes and permissions, not final height and not climate-driven erosion.

## Stage 8 — structural roles and materials

Continuous fields are grouped into understandable regional roles: continental interiors, margins, shelves, slopes, deep basins, arcs, ridges, drowned fragments, and material provinces.

This preserves the useful ideas in the older Continent/Ocean Structure and crust blueprints without allowing them to become hidden land masks.

## Stage 9 — landform potential and suppression

Landmass Genesis answers where continent-like, island-like, plateau-like, basin-like, ice-shell, impact, or other approved forms may be born—and where they must be suppressed.

It still does not decide final land or water.

## Stage 10 — base Terrain Birth

Base Terrain Birth creates the solid-body starting height from approved geological causes.

Randomness may make a valid mountain belt irregular or add local texture. It may not create an unsupported continent, mountain, trench, rift, or basin.

Climate-driven river erosion, glaciers, dunes, and marine sediment do not belong in this first pass.

## Stage 11 — provisional surface state

WorldWright temporarily fills water, finds drainage, and estimates a climate boundary from the base terrain and planetary conditions.

This provisional state exists only to drive surface processes. It is not yet the final coastline, river network, or climate record.

## Stage 12 — bounded surface-process evolution

Water, ice, wind, weathering, mass movement, marine processes, and sediment may reshape the base terrain through a fixed, budgeted number of passes.

These processes may wear down a mountain or fill a basin. They may not erase the recorded fact that the mountain was caused by convergence or that the basin belongs to an older rift.

The loop cannot run forever and cannot rewrite the interior, history, or geologic spine.

## Stage 13 — final surface consequences

After surface evolution, WorldWright recomputes final terrain, sea level, land/water, bathymetry, drainage, climate, biomes, materials, resources, and presentation.

Later systems may respond to geology. They may not rewrite its history to make their outputs easier.

## Why this can run on ordinary hardware

WorldWright decides the house before placing every nail.

It resolves a compact set of starting facts, one premise, one interior, several eras, and a limited global graph. It spreads those causes once, then performs bounded grid work. Fine local detail can be generated later or on demand.

It does not simulate every point for every year of planetary history.

## What shadow mode is for

Shadow mode lets the new causal system produce independent records and maps while the legacy generator still draws the visible planet.

It proves the system can operate without reading the old answer, replay deterministically, produce coherent relationships, stay within performance limits, and explain uncertainty and failures.

Shadow mode is not the final destination.

## How causal authority eventually takes control

```text
1. causal records only
2. diagnostic causal maps
3. causal ownership of major geological identities
4. causal ownership of process fields and structural roles
5. a separate full causal terrain candidate
6. one complete physical route selected per generated world
7. active causal geology
8. legacy isolation or retirement
```

Legacy and causal terrain candidates may be compared side by side, but they never both write the same world's final height.

## The current step

The current task is blueprint reconciliation and audit. W1-01 remains a draft implementation. Premise implementation must not begin until the governing blueprint and W1-01 are separately reviewed and approved, and the initial-condition adapter is defined.

## What success ultimately looks like

When a planet looks wrong, WorldWright should be able to identify the earliest wrong cause:

```text
initial conditions: plausible
premise: plausible
interior: plausible
history: plausible
geologic spine: one basin was oversized
process fields and terrain: faithfully reflected that bad basin
```

Then the basin rule can be corrected instead of patching every downstream system.
