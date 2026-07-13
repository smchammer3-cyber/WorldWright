# W1-02B Planetary-Premise Research Package

## Status and authority boundary

```text
base: WorldWright-new at a10537eaf17f1bc6464f24e189ce9a43e37166c7
branch: agent/w1-02b-premise-research-fixtures
change class: research, compatibility, fixtures, validation, and budget contracts only
physical generator authority: LEGACY
CAUSAL_ACTIVE: forbidden and unimplemented
causal.premise: RESERVED and inactive
premise resolver: not implemented
ordinary Generate integration: forbidden
PR #118: untouched
```

This package satisfies the research-and-fixture gate that must precede a separate W1-02B resolver implementation decision. Merging it would freeze the evidence vocabulary, compatibility matrix, archetype corpus, holdouts, and resource budgets. It would not activate premise resolution.

## Scientific posture

The package uses published solid-planet mass-radius, rocky differentiation, rock-ice interior, ice-covered ocean-world, high-pressure-ice, and irradiated water-rich planet models. It deliberately avoids universal numeric class thresholds.

The evidence supports broad candidate relations:

- radius and density can constrain broad solid composition families but do not uniquely recover detailed composition;
- differentiated metal-silicate interiors are compatible with broad rocky-planet models;
- volatile-rich low-density solids can retain mixed and differentiated rock-ice alternatives;
- ice shells, internal liquid layers, rocky interiors, and high-pressure ice are compatible alternatives for water-rich cold bodies under suitable heat conditions;
- strong irradiation and volatile inventories can support a pressure-dominated steam or volatile layer over a solid interior;
- mass-radius evidence alone may not distinguish a water-rich solid from a rocky body with a gas or steam envelope.

`REVIEWED` in the research ledger means reviewed for repository applicability, traceability, scope, and faithful representation. It does not mean WorldWright independently reproduced the published science.

## Evidence ledger

The committed source registry includes:

- Seager et al. on mass-radius relations for solid exoplanets;
- Adams, Seager, and Elkins-Tanton on water-world versus atmosphere degeneracy;
- Zeng, Sasselov, and Jacobsen on PREM-based rocky mass-radius relations;
- Rubie et al. on terrestrial accretion and differentiation;
- Vazan, Sari, and Kessel on mixed ice-rock interiors;
- Vance et al. on ice-covered ocean-world interior structures;
- Ueta and Sasaki on internal oceans and high-pressure ice;
- Turbet et al. on irradiated water-rich planets and steam-atmosphere mass-radius effects;
- Marounina and Rogers on water-world interior layering and volatile reservoirs;
- one internal scope source for supported-route and artificial-exception rules.

Bibliographic metadata and high-level relations are committed. No paper text, figures, or datasets are copied.

## Rule eligibility

Ten rules are eligible to contribute to a future COMPLETE premise result because they have reviewed source coverage or are explicit product-scope gates.

`premise/partial-differentiation-remains-provisional-v1` is deliberately PARTIAL-only. Current W1-02A inputs do not encode formation and thermal history with enough fidelity to resolve partial differentiation uniquely.

No rule may infer:

```text
tectonic regime
impact history
plates or plate activity
continents or basins
rifts, convergence, transforms, or hotspots
landforms or terrain
climate outcomes
hydrology or biomes
materials or rendering
```

## Compatibility matrix

The matrix covers all seven approved premise body classes and all four blocked unsupported categories.

Natural rows contain only natural surface and layer vocabulary. The artificial body class contains only declared artificial surface and layer vocabulary and requires explicit exception permission.

The blocked route contains:

```text
BROWN_DWARF
FLUID_ONLY_NO_COHERENT_SHELL
GAS_GIANT_NO_COHERENT_SHELL
STAR_OR_STELLAR_REMNANT
```

These categories are not declared scientifically impossible. They are outside the currently approved WorldWright solid-surface geological route.

## Fixture corpus

The committed corpus includes:

- positive rocky terrestrial, rocky super-Earth, rock-ice mixed, ice-shell ocean, volatile-pressure solid, and permitted artificial cases;
- negative star-like, gas-giant, fluid-only, unpermitted artificial, and solved-tectonic-hint cases;
- a contradictory body/layer hard-constraint case;
- rock-ice and steam-boundary ambiguity cases;
- a missing-evidence partial-differentiation case;
- one withheld holdout for each natural body class.

Holdout fixture IDs and seeds are not referenced by claim rules. A later resolver may not special-case them.

## Frozen research-validation budgets

```text
research sources: 16 maximum
claim rules: 32 maximum
compatibility rows: 7 maximum
blocked categories: 4 maximum
fixtures: 64 maximum
quantities per fixture: 16 maximum
rule evaluations per fixture: 64 maximum
serialized research package: 512 KiB maximum
average validation time: 1,000 ms maximum
heap growth during validation corpus: 128 MiB maximum
```

These are research-package and future resolver-envelope budgets, not claims about final terrain generation cost.

## Explicit non-implementation

This PR does not:

- change `causal.premise` from `RESERVED`;
- add a premise runner or branch-selection algorithm;
- construct `PlanetaryPremiseV1` records;
- attach shadow premise state to ordinary generation;
- alter the legacy generator, physical schema, terrain, rendering, snapshots, or globe output;
- authorize W1-02B implementation or merge.

A separate explicit approval is required before the premise resolver branch begins.

## Honest physical verdict

The rendered planet is expected to remain byte-identical to the W1-02A baseline. The known legacy geological failure at `RAW_GENERATOR` remains the first visible authority failure. Passing this package proves research traceability, fixture coverage, bounded validation, and causal scope—not planet quality.