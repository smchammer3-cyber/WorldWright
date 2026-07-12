# WorldWright Plain-Language Master Map

## Why this document exists

This is the non-technical explanation of what WorldWright is building. When the project feels muddy, this document should answer four questions:

1. What are we trying to create?
2. What step are we currently working on?
3. Why does that step exist?
4. How will it eventually change the visible planet?

## The core idea

WorldWright should create a biography for a planet before it draws the planet.

```text
facts about the planet
  → what kind of planet is possible
  → what is happening inside it
  → what happened during its history
  → what major structures survived
  → how those structures affect each place
  → what terrain should exist today
```

The visible globe is the final consequence, not the first guess.

## Stage 1 — approved planetary facts

WorldWright begins with facts such as size, density, age, water inventory, heat sources, orbit, star, and deliberate fictional exceptions.

It must not begin with conclusions such as continent count, mountain location, tectonic vigour, ocean shapes, or a land mask.

The input firewall is like giving a doctor symptoms and measurements without secretly giving the diagnosis.

## Stage 2 — planetary premise

The premise answers: what broad kind of world can these facts support?

It may conclude that the world is rocky, icy, ocean-covered, volcanically resurfaced, impact-dominated, or something explicitly fictional. It records what is certain, what remains uncertain, and what cannot yet be decided.

There are still no continents or mountains.

## Stage 3 — interior and rheology

This stage answers: how does the inside behave, and how easily can the outer shell move or break?

It resolves ranges and tendencies such as remaining heat, crust production, shell mobility, rifting, plume activity, recycling, and surface preservation.

It does not simulate every atom. It produces a compact, scientifically constrained description that later stages can use.

## Stage 4 — geological history

WorldWright creates a small number of meaningful eras rather than billions of tiny time steps.

An example history might be:

```text
early hot resurfacing
  → stable crustal regions survive
  → a major rift opens
  → an ocean basin grows
  → convergence closes part of the basin
  → a mountain belt forms and later erodes
```

History explains why features have age, ancestry, direction, and relationships.

## Stage 5 — geologic spine

The geologic spine is the planet's structural skeleton.

It stores major continental kernels, ocean basins, rifts, convergence belts, transforms, plume systems, accreted fragments, and inherited scars. These are spherical objects and relationships, not painted pixels.

A mountain belt later exists because the spine records a supported event and structure—not because noise happened to be high.

## Stage 6 — process fields

The spine is made spatially useful by spreading its influence over the globe.

At every location, process fields answer questions such as:

- how continental or basin-like is this place?
- how strongly is it being uplifted or pulled apart?
- how volcanic is it?
- how old and resistant is its material?
- which direction should ridges and valleys tend to follow?

These fields are causes and permissions, not final height.

## Stage 7 — structure and terrain birth

Terrain Birth converts approved causes into height and material structure.

Randomness may make a valid mountain belt irregular, choose between equally valid branches, or add local texture. Randomness may not create an unsupported continent, mountain, trench, rift, or ocean basin.

## Stage 8 — surface consequences

After terrain exists, later systems derive:

- sea level, land, and water;
- ocean shelves, slopes, ridges, and trenches;
- downhill drainage and river basins;
- climate influenced by latitude, elevation, oceans, and circulation;
- biomes and materials;
- resources and future worldbuilding;
- final visual presentation.

Later systems may respond to geology. They may not rewrite its history to make their outputs easier.

## Why this can run on ordinary hardware

WorldWright decides the house before placing every nail.

It resolves a small premise, a compact interior, several eras, and a limited global graph. Only then does it spread causes over the world grid. Fine local detail can be generated later or on demand.

It avoids the impossible approach of simulating every point for every year of planetary history.

## What shadow mode is for

Shadow mode lets the new causal system produce independent records and maps while the legacy generator still draws the visible planet.

Shadow mode proves that the new system can:

- operate without reading the legacy answer;
- replay deterministically;
- produce coherent relationships;
- remain within performance limits;
- explain its uncertainty and failures.

Shadow mode is not the final destination.

## How causal authority eventually takes control

```text
1. causal records only
2. diagnostic causal maps
3. causal ownership of major geological identities
4. causal ownership of process fields
5. causal Terrain Birth experiment
6. active causal geology
7. retirement or isolation of legacy geological authority
```

Each step is narrow, reversible, measured, and separately approved.

## The current step

The current project task is blueprint reconciliation. We are making one authoritative map that joins the existing subsystem blueprints with the newer input firewall, geological history, evidence, performance, and authority-promotion architecture.

W1-01 remains a draft implementation. W1-02 must not begin until the governing blueprint and W1-01 are separately reviewed and approved.

## What success ultimately looks like

When a planet looks wrong, WorldWright should be able to say where the mistake began:

```text
planetary premise: plausible
interior: plausible
history: plausible
geologic spine: one basin was oversized
process fields: faithfully reflected that basin
terrain: correctly followed the bad spine
```

Then the earliest wrong cause can be corrected without patching every downstream system.
