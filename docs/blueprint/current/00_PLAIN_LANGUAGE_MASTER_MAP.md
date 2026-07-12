# WorldWright Plain-Language Master Map

## Why this document exists

This is the non-technical explanation of what WorldWright is building. When the project feels muddy, this document should answer what we are creating, what step we are on, why it exists, and how it eventually changes the visible planet.

## The core idea

WorldWright should create a biography for a planet before it draws the planet.

```text
choose compatible starting facts
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

The user, template, or Generate profile supplies constraints and a root seed. Planet Identity gives the world lineage and a coordinate namespace. A display name or timestamp never decides geology.

## Stage 1 — create compatible starting conditions

Some users specify planet size, water, age, orbit, or unusual rules. Others simply press Generate.

When facts are missing, an initial-condition resolver chooses them from reviewed possibilities. It does not roll each fact independently. For example, a planet's size, density, star, orbit, atmosphere, age, water, and internal heat must form a compatible family.

The resolver records what the user locked, what a template constrained, what was imported, and what the seed chose. It may reroll an unlocked fact through its own stable random address without scrambling unrelated locked choices.

It may not choose continents, mountains, plates, tectonic history, or terrain.

## Stage 2 — clean and verify those facts

The sanitizer checks units, ranges, relationships, source identity, contradictions, and approved physical formulas. It rejects impossible combinations and old-generator conclusions disguised as facts.

## Stage 3 — planetary premise

The premise answers what broad body and layer arrangement these facts support: rocky layers, an ice shell, a deep ocean, exposed regolith, or another approved arrangement.

It does not decide that the world already experienced plate tectonics, resurfacing, impacts, or rifting. Those are later conclusions.

## Stage 4 — interior and rheology

This stage asks what is happening inside and how easily the outer shell bends, breaks, moves, melts, or preserves old surfaces. It resolves capabilities and ranges, not events or terrain.

## Stage 5 — geological history

WorldWright creates a small number of meaningful eras rather than billions of tiny time steps.

```text
early hot resurfacing
  → stable crustal regions survive
  → a major rift opens
  → an ocean basin grows
  → convergence closes part of the basin
  → a mountain belt forms
```

Each event records when it happened and how long its surface consequences could act. An old mountain should not be treated like a young mountain merely because both are mountains.

## Stage 6 — geologic spine

The spine is the structural skeleton: major continental kernels, ocean basins, rifts, collisions, transforms, plumes, impacts, accreted fragments, and inherited scars as spherical objects and relationships.

## Stage 7 — process fields

The spine's influence is spread over the globe. These fields describe geological support, deformation, material, age, and structural direction. They are not final height and not rainfall, rivers, glaciers, or dunes.

## Stage 8 — structural roles and materials

Continuous fields become understandable regional roles: continental interiors, margins, shelves, slopes, deep basins, arcs, ridges, drowned fragments, and material provinces.

## Stage 9 — landform potential and suppression

This stage answers where approved landforms may be born and where ocean/deep-basin authority must suppress unsupported ones. It still does not decide final land or water.

## Stage 10 — base Terrain Birth

Base Terrain Birth creates solid-body starting height from geological causes. Randomness may shape a valid feature but cannot invent its cause.

Climate-driven river erosion, glaciers, dunes, and marine sediment do not belong in this first pass.

## Stage 11 — provisional surface state

WorldWright temporarily fills water, finds drainage, and estimates broad climate, wind, and ice boundaries. This temporary state exists only to drive surface processes.

## Stage 12 — bounded surface-process evolution

Water, ice, wind, weathering, gravity, coasts, and sediment reshape the base terrain through a fixed schedule and hard limits. The schedule may refresh its temporary climate or drainage at declared checkpoints, but it cannot loop forever.

Surface processes use feature ages and exposure histories so ancient and young structures weather differently. A future decision will determine how much deep-time climate history must be represented rather than approximated.

These processes may wear down a mountain or fill a basin. They may not rewrite the recorded cause or ancestry of either.

## Stage 13 — final surface consequences

WorldWright recomputes final terrain, sea level, land/water, bathymetry, drainage, climate, biomes, materials, resources, and presentation.

## Why this can run on ordinary hardware

WorldWright decides the house before placing every nail. It resolves compact global records first, performs bounded grid work later, and generates high-resolution local detail on demand. It never simulates every point for every year of planetary history.

## What shadow mode is for

Shadow mode proves the new system can operate without reading the old answer, replay deterministically, stay within performance limits, and explain uncertainty and failure. It is not the final destination.

## How causal authority eventually takes control

```text
1. causal records only
2. diagnostic causal maps
3. causal ownership of major geological identities
4. causal ownership of preparation fields and structural roles
5. a separate complete causal terrain candidate
6. one complete physical route selected per generated world
7. active causal geology
8. legacy isolation or retirement
```

Legacy and causal candidates may be compared side by side, but never both write one world's final height.

## The current step

The current task is blueprint reconciliation and audit. W1-01 remains separate and unmerged. Premise implementation must not begin until the governing blueprint and W1-01 are separately approved and the initial-condition adapter is defined.

## What success ultimately looks like

When a planet looks wrong, WorldWright should identify the earliest wrong cause rather than patch the final picture.
