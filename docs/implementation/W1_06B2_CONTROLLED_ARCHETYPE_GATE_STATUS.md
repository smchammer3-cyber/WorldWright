# W1-06B2 Controlled Archetype Gate — Implementation Status

## Governing boundary

```text
base branch: WorldWright-new
base commit: fcc8c5670a03bfc01a72852732612b8dfc425cba
implementation branch: agent/w1-06b2-controlled-archetype-gate
W1-06B1: merged through PR #144
physical generator authority: LEGACY
causal authority: CAUSAL_SHADOW only
ordinary Generate integration: forbidden
visible physical output changes: forbidden
CAUSAL_ACTIVE: forbidden and unimplemented
```

## Scope

W1-06B2 adds complete controlled coverage for the ten archetype families frozen by the W1-06 audit contract:

```text
MOBILE_LID_ROCKY
STAGNANT_LID_ROCKY
RIFT_DOMINATED_ROCKY
HOTSPOT_DOMINATED_ROCKY
LOW_HEAT_OLD_ROCKY
HIGH_HEAT_YOUNG_SUPER_EARTH
WATER_RICH_ROCKY
DRY_ROCKY
SUPER_EARTH_DIRECT_INPUT_RANGE
APPROVED_ARTIFICIAL_OR_FANTASY_EXCEPTION
```

The corpus contains three unique seeds per family, for 30 unique cases total.

## Natural controlled routes

Twenty-seven cases use controlled validated premise and interior states, then execute the real detached W1 regime-history and geologic-spine resolvers twice. The gate requires:

```text
byte-identical replay
PARTIAL detached stage status
history and spine hashes
no open contradictions
family-specific bounded criteria
resource-budget compliance
no WorldBrain or physical-field payloads
```

The family-specific criteria are deliberately narrow. Mobile and stagnant cases verify the controlled current regime. Rift- and hotspot-dominated cases compare only the current broad `RIFT_SYSTEM` and `PLUME_SYSTEM` spine counts. Old, young, wet, dry, and super-Earth cases validate their declared controlled input boundaries. None of those checks is presented as final terrain morphology or a unique planetary solution.

## Approved artificial or fantasy exception

The three approved-exception cases invoke the reviewed planetary-premise resolver directly with:

```text
ALLOW_ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL
DECLARED_ARTIFICIAL_LAYER_STACK
DECLARED_ARTIFICIAL_SOLID_SHELL
DECLARED_ARTIFICIAL_SOLID_SURFACE
```

They must resolve `COMPLETE` only at premise classification and must produce `ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL`. They do not run interior, regime-history, geologic-spine, terrain, or any physical route.

This direct premise-resolver path is intentional. The initial-condition resolver still blocks artificial generation because an artificial initial-condition prior is not implemented. W1-06B2 does not bypass or weaken that safeguard.

## Scientific status

```text
software gate target: PASS
scientific status target: PARTIAL
```

Controlled archetype coverage proves that the detached diagnostic chain can represent the frozen test families under explicit controlled upstream states. It does not prove that arbitrary direct-input combinations naturally resolve into those archetypes, and it does not calibrate final physical fields.

## Explicit non-scope

This PR does not:

- add positive, threshold, negative, and approved-exception geology-reference integration;
- change premise, interior, regime-history, or geologic-spine scientific algorithms;
- add causal process fields;
- read legacy solved morphology;
- invoke or alter ordinary Generate;
- write terrain, sea level, bathymetry, climate, hydrology, biomes, materials, resources, rendering, Create, Sim, or storage;
- implement or enable `CAUSAL_ACTIVE`;
- begin W1-07 or Phase D.

## Required exact-head validation

```text
npm run build
npm run test:run
npm run diagnostics:generate
npm run diagnostics:geology-audit
npm run diagnostics:world-audit-export
W1-06A 28-case aggregate gate
W1-06B1 12-axis threshold gate
W1-06B2 30-case controlled archetype gate
snapshot canary
384x192 full-globe review
legacy physical-output equivalence
```

The PR may merge only when the exact audited head passes every applicable gate and legacy physical output remains unchanged.

## Next bounded scope

W1-06B3 should integrate positive, threshold, negative, and approved-exception geology references through a detached adapter outside the causal resolver package. It must distinguish expected rejection from scientific contradiction and keep authority `LEGACY`.
