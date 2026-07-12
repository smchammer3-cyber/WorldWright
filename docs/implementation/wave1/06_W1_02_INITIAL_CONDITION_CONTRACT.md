# W1-02 Initial-Condition and Control-Migration Contract

## Purpose

This document defines the semantic boundary between user/template generation requests and the sanitized causal input consumed by Wave 1. It is a contract, not an implementation.

The initial-condition layer must generate enough coherent physical context for WorldWright to proceed when the user has not supplied every value, while refusing to smuggle solved geology into the causal chain.

## Request semantics

Every requested value must carry one of these meanings:

```text
HARD_CONSTRAINT
  The resolved bundle must preserve the requested value within its declared quantity/enum contract.
  Incompatibility with another hard constraint yields BLOCKED.

SOFT_PREFERENCE
  The resolver should favor the requested tendency when compatible, but may depart from it.
  Any departure is recorded in the resolution trace.

EXCEPTION_PERMISSION
  Allows an otherwise unsupported artificial or fictional branch to be considered.
  Permission does not select the branch and does not waive unrelated validation.

UNSPECIFIED
  The resolver may choose from the reviewed joint/conditional prior bundle.
```

A raw scalar without semantic intent is not a complete causal request.

## Proposed `GenerationRequestV1`

The implementation schema must preserve at least:

```text
schemaVersion
requestContractVersion
rootSeed
controls[]
exceptionPermissions[]
rerollScopes[]
sourceTemplateId, optional
sourceTemplateVersion, optional
limitations[]
contentHash
```

Each control records:

```text
controlId
intent: HARD_CONSTRAINT | SOFT_PREFERENCE | UNSPECIFIED
value or range
quantity/enum contract
source: USER | TEMPLATE | SEEDED_DEFAULT_REQUEST
lockState: LOCKED | UNLOCKED
scope
```

`EXCEPTION_PERMISSION` is represented separately from ordinary controls so an aesthetic mode cannot silently grant scientific exceptions.

## Proposed `PlanetInitialConditionBundleV1`

The resolved bundle must preserve at least:

```text
schemaVersion
bundleContractVersion
requestHash
rootSeed
priorConstraintBundleId
priorConstraintBundleVersion
resolvedDeclarations[]
resolvedCorrelatedSelections[]
approvedDerivations[]
hardConstraints[]
softPreferences[]
exceptionPermissions[]
resolutionTrace[]
conflicts[]
limitations[]
retrySummary
contentHash
```

The bundle must be deterministic, canonical-JSON compatible, deeply immutable, and independent of operational IDs, timestamps, display names, storage IDs, and source revision IDs.

## Forbidden bundle content

The following may not appear as resolved initial conditions:

- geology stack or tectonic regime;
- mantle-convection, tectonic-vigor, rift, hotspot, volcanism, plate-activity, or stagnant-lid conclusions;
- impact history;
- plate, continent, basin, crust-province, feature, or landform identity;
- sea-level shape, coastline placement, terrain height, relief pattern, erosion result, climate field, river, biome, material, or color;
- any value copied from legacy solved morphology merely because it exists on `PlanetFoundationSnapshot`.

Approved physical derivations such as mass, surface gravity, escape velocity, stellar flux, or total heat require separately versioned formulas, units, evidence, and tests.

## Deterministic resolution sequence

W1-02A must follow a fixed versioned sequence:

1. Validate schema, units, enum domains, lock states, and duplicate controls.
2. Normalize legacy-compatible controls through the migration matrix below.
3. Apply explicit exception permissions.
4. Detect direct hard-constraint conflicts before random selection.
5. Select one reviewed correlated prior family using `causal.initial-conditions`.
6. Resolve unlocked variables in a stable documented order using named random addresses.
7. Apply approved physical derivations only after direct declarations are fixed.
8. Revalidate all hard constraints and compatibility rules.
9. Retry or backtrack only within a frozen bounded budget.
10. Emit COMPLETE, PARTIAL, or BLOCKED with a full resolution trace.

No fallback may silently rewrite a hard constraint, substitute a legacy value, or broaden an exception.

## User-lock precedence

Precedence is fixed:

```text
explicit locked user hard constraint
  > explicit locked template hard constraint
  > explicit user soft preference
  > explicit template soft preference
  > seeded joint/conditional default
```

Two incompatible locked hard constraints produce BLOCKED. The resolver reports the smallest known conflict set and does not choose one silently.

A soft preference never overrides a hard constraint. A seed default never overrides either.

## Scoped rerolls

A reroll request must name one or more approved scopes. Initial scopes are:

```text
BODY_AND_COMPOSITION
ORBIT_AND_STELLAR_CONTEXT
VOLATILE_AND_SURFACE_INVENTORY
THERMAL_INITIAL_CONDITIONS
```

Rules:

- locked controls never reroll;
- rerolling a downstream scope cannot alter an upstream locked scope;
- correlated dependents within the rerolled scope may change together;
- the reroll address includes the scope and explicit reroll ordinal;
- identical request, seed, scope, ordinal, versions, and fixtures reproduce byte-identical output;
- incompatible preserved locks yield BLOCKED rather than cross-scope mutation.

## Current-control migration matrix

The current `GenerateFoundationInput` surface is classified as follows. This matrix governs compatibility adapters; it does not grant direct causal authority.

| Current field | New semantic classification | W1-02 premise authority | Required treatment |
|---|---|---|---|
| `styleMode` | Soft presentation/profile preference | None by itself | May bias supported profile families. `FANTASY` does not grant an exception; a separate permission is required. |
| `seaLevel` | Downstream water/terrain preference | Forbidden | Preserve only for later provisional/final surface work. Never use to choose premise categories. |
| `seaLevelOffset` | Downstream water/terrain preference | Forbidden | Same treatment as `seaLevel`; not an initial physical fact. |
| `waterInventory` | Candidate physical constraint or seeded correlated variable | Allowed when unit/scale contract is valid | Migrate to `inventory.water`; explicit lock is hard, otherwise jointly resolve. |
| `plateActivity` | Solved tectonic preference | Forbidden | Do not include in causal input or premise. Preserve only as legacy comparison metadata. |
| `planetAge` | Legacy normalized age preference | No direct authority until migrated to a unit-bearing quantity | A future adapter may map it to `thermal.age` only through an approved scale/version. |
| `erosionIntensity` | Downstream surface-process preference | Forbidden | Reserve for later surface evolution; never influence premise. |
| `moistureLevel` | Provisional climate/hydrology preference | Forbidden | Reserve for provisional environment; not a premise fact. |
| `temperatureOffset` | Provisional climate preference | Forbidden | Reserve for provisional environment; must not rewrite stellar/orbital inputs. |
| `planetProfile` | Legacy compound profile hint | Preference only, except explicit artificial branch requires permission | Decompose into independent constraints. Never copy profile-derived geology or surface consequences. |
| `planetRadiusEarth` | Direct physical quantity | Allowed | Migrate to `planet.radius` with units and bounds. |
| `planetDensityEarth` | Direct physical quantity | Allowed | Migrate to `planet.density` with units and bounds. |
| `starLuminositySun` | Direct physical quantity | Allowed | Migrate to `star.luminosity` with units and bounds. |
| `orbitalDistanceAU` | Direct physical quantity | Allowed | Migrate to `orbit.distance` with units and bounds. |
| `albedo` | Declared surface/planetary parameter | Limited | Migrate to `climate.declared-albedo`; may constrain surface-medium compatibility but cannot encode climate results. |
| `greenhouseStrength` | Declared atmospheric parameter | Limited | Migrate to `climate.declared-greenhouse`; may constrain compatibility but cannot replace atmosphere or climate resolution. |
| `volatileInventory` | Candidate physical constraint or seeded correlated variable | Allowed | Migrate to `inventory.volatiles` with a reviewed scale. |
| `coreHeatIntent` | Legacy thermal preference, not a measurement | None in W1-02 | Reserve for W1-03 research; do not convert directly to core heat. |
| `tidalHeatingIntent` | Legacy normalized thermal preference | No direct authority until quantity contract exists | May later map to `thermal.tidal-heating` through a reviewed derivation or explicit quantity adapter. |
| `stagnantLidBias` | Solved interior/tectonic preference | Forbidden | Comparison-only. W1-03 must derive lid alternatives independently. |
| `compositionRadioactivity` | Candidate composition preference | None until formula and scale are approved | May later support `thermal.radiogenic-heat`; remains inactive in W1-02. |

## Correlated prior/constraint bundle

The committed prior bundle must:

- use a stable version and content hash;
- define compatible ranges and conditional relations rather than independent defaults;
- separate observed/source-backed constraints from internal modeling priors;
- record every hard rule, soft correlation, and exception rule;
- identify correlation groups so duplicated claims do not inflate confidence;
- contain no solved geology, terrain, or morphology;
- include holdout requests that were not used to tune the bundle;
- expose unsupported combinations explicitly.

Illustrative relation families may include radius-density-mass consistency, luminosity-distance-flux consistency, volatile/water inventory compatibility, thermal-age/heat-source compatibility, and supported solid-surface body constraints. The actual constants, distributions, and weights remain blocked until reviewed evidence and tests are committed.

## Unsatisfiable requests

An unsatisfiable request returns BLOCKED and includes:

```text
blockingReasons[]
conflictingControlIds[]
failedConstraintIds[]
retrySummary
limitations[]
```

The resolver must not:

- clamp a locked value into range without reporting invalid input;
- discard one of two conflicting locks;
- switch to an artificial/fictional branch without explicit permission;
- copy a legacy profile result to escape the conflict;
- reroll indefinitely.

## Required hostile and metamorphic tests

W1-02A must prove:

- field-order, map-insertion-order, operational-ID, timestamp, display-name, and storage-ID changes do not alter the bundle hash;
- identical request/seed/version inputs replay byte-identically;
- one unlocked scoped reroll changes only its allowed scope and correlated dependents;
- locked values survive all rerolls;
- conflicting locks block with stable conflict IDs;
- forbidden legacy fields cannot enter the bundle through nested objects, strings, aliases, or compatibility adapters;
- perturbing legacy plates, terrain, continents, basins, geology stack, or resolved consequences cannot change the bundle;
- retry count, runtime, memory, and artifact size remain under frozen budgets;
- LEGACY physical output remains byte-identical when W1-02A is absent or disabled.