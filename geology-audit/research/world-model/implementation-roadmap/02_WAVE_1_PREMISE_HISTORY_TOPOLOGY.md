# Wave 1 — Premise, History, Topology, and Ledgers

## Goal

Represent the planet’s physical premise, geodynamic regime, ordered history, material accounting, and stable geological topology before terrain is born.

## C05 — Planetary premise and interior/regime resolver

### Purpose

Replace style labels as geological authority with explicit physical state and bounded regime branches.

### Add

- `PlanetaryPremiseRecord` populated from current controls;
- `InteriorThermalRheologyRecord` using normalized or ordinal state;
- `RegimeHistoryRecord` with current regime, alternatives, confidence, and transition placeholders;
- adapters from `PlanetFoundationSnapshot`;
- branches for:
  - mobile lid;
  - stagnant lid;
  - episodic lid;
  - deformable/plutonic lid;
  - heat pipe;
  - cooling/contraction;
- diagnostic rationale for branch selection.

### Preserve

- current user-facing generator controls;
- existing `planetFoundation` compatibility;
- legacy terrain output.

### Done when

- identical input and seed produce identical premise/regime records;
- mass, heat, or water alone never deterministically selects regime;
- conflicting settings produce explicit diagnostics;
- no terrain changes occur.

## C06 — Geologic event graph and multiple age dimensions

### Purpose

Create ordered history and stop relying on one `surfaceAge` value.

### Add

- event graph with epochs;
- parent, overprint, and reactivation edges;
- material age;
- structure/formation age;
- exposure age;
- latest activity age and state;
- event families for tectonics, volcanism, impacts, water/ice, climate, erosion, deposition, and resurfacing;
- chronology and cross-cutting-order validation;
- low-confidence migration from legacy `surfaceAge`.

### Done when

- event order is deterministic;
- impossible chronology is detectable;
- old saves receive explicit migrated age assumptions;
- no terrain changes occur.

## C07 — World ledgers and residual diagnostics

### Purpose

Create accounting before any causal module moves matter or water.

### Add

- crust ledger;
- magma ledger;
- solid material and sediment ledger;
- water ledger;
- ice and load ledger;
- impact material ledger;
- normalized heat-source consistency record;
- transaction/event references;
- residual diagnostics and tolerances.

### Required rules

```text
crust created/added/removed must reconcile
magma supplied must become intrusion, eruption, or declared remainder
eroded material must become storage, deposit, dissolved/exported material
water must remain distributed among declared reservoirs
ice accumulation and loss must reconcile
impact material must become rim, ejecta, melt, vapor, fallback, or escape
```

### Done when

- zero-state and test-event ledgers balance;
- duplicate entries are detected;
- residuals are exported clearly;
- no physical terrain behavior changes.

## C08 — Geologic Spine graph scaffold and scale ownership

### Purpose

Create stable topology for crustal domains, plates, boundaries, structures, and inherited relationships.

### Add

- province graph;
- optional plate graph;
- boundary-system records;
- fault/structure graph;
- inherited relationship graph;
- scale ownership registry;
- parent/child feature relationships;
- subgrid summary contracts;
- diagnostic-only adapters from current plates, continent skeletons, and crust fields;
- seam and pole topology validation.

### Minimum province/domain classes

- continental core/craton;
- mobile/orogenic belt;
- oceanic crustal domain;
- transitional/rifted crust;
- accreted terrane;
- volcanic/intrusive province;
- sedimentary basin;
- impact-modified province;
- glacially modified province;
- soluble/karst-capable province;
- mixed or uncertain province.

### Minimum relationships

- adjacent;
- formerly connected;
- rifted from;
- accreted/collided;
- overriding/subducting;
- loads/flexes;
- drains or supplies sediment to;
- intrudes/overprints;
- buries/exhumes;
- reactivates;
- inherits structure from.

### Done when

- graph identities are stable;
- raster fields are explicitly derived views;
- invalid topology is reported;
- adapters never write height;
- legacy output remains unchanged.

## Wave 1 gate

Proceed only when WorldWright can represent:

- physical premise and uncertain regime branches;
- ordered geological events;
- multiple age dimensions;
- conservation ledgers;
- stable geological topology;
- scale ownership;

all before visible terrain changes.