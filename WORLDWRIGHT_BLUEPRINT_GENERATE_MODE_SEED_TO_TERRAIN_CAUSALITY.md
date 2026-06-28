# WorldWright Blueprint: Generate Mode Seed-to-Terrain Causality

Status: draft / generator subsystem clarification  
Owner: Iron Man  
Purpose: define how the seed influences terrain without bypassing the causal generator pipeline. This file locks the rule that seeds supply reproducible variation, while geology, process fields, terrain birth, sea-level solve, hydrology, climate, biomes, and diagnostics remain the authority chain.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GENERATOR_CONSTITUTION.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SCOPE_AND_DOMAIN_MAP.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
WORLDWRIGHT_BLUEPRINT_LANDMASS_GENESIS.md
```

---

## 1. Core Law

```text
The seed does not decide land directly.

The seed decides repeatable causes.
Those causes produce terrain.
Sea level reveals land from that terrain.
```

Generate Mode must not work like this:

```text
seed -> random land mask -> smooth it -> color it -> call it a planet
```

WorldWright Generate Mode must work like this:

```text
seed -> named random streams -> planet foundation -> geologic causes -> continent/ocean-basin structure -> crust/process fields -> terrain birth -> sea-level reveal -> hydrology/climate/biome consequences -> diagnostics
```

A seed is the reproducible source of variation.

It is not the authority that says:

```text
this cell is land,
this cell is ocean,
this mountain appears here for no reason,
this river goes here because of a random roll.
```

The pipeline is the authority.

---

## 2. Seed Role vs Pipeline Role

### 2.1 Seed Role

The seed supplies deterministic variation.

The seed may influence:

```text
how many major continental systems are attempted,
where continent cores tend to form,
where ocean basins tend to open,
where margins, shelves, rifts, arcs, and mountain belts tend to appear,
which geologic archetype variants are selected,
how coast irregularity varies inside coast-process constraints,
how terrain roughness varies inside geologic constraints,
how river tie-breakers resolve inside terrain/hydrology constraints,
how micro tile detail varies inside macro context.
```

### 2.2 Pipeline Role

The pipeline supplies cause, authority, and consequence.

The pipeline determines:

```text
what kind of planet is being born,
what physical/geologic processes are allowed,
how crust and process fields shape terrain,
how terrain becomes height,
how sea level reveals land and water,
how water drains,
how climate responds,
how biomes and surface materials derive,
how settlement/travel/resource suitability emerge,
and whether diagnostics accept or reject the result.
```

Summary:

```text
Seed supplies variation.
Pipeline supplies meaning.
```

---

## 3. Correct Terrain Causality Chain

Terrain should be born through a chain like this:

```text
1. World Seed
2. Named Seed Streams
3. Planet Foundation
4. Geologic Spine
5. Continent and Ocean-Basin Structure
6. Crust / Plate / Process Fields
7. Terrain Birth
8. Sea-Level Solve
9. Land / Water Derivation
10. Hydrology Baseline
11. Climate Baseline
12. Biome / Surface / Resource Consequences
13. Settlement / Movement Suitability
14. Diagnostics and Artifacts
```

### 3.1 World Seed

The world seed is the root deterministic identity of the world.

It should not be used directly by terrain generation.

It should be split into named streams.

### 3.2 Named Seed Streams

Named streams isolate domains.

Examples:

```text
planet.foundation
geology.spine
geology.continents
geology.oceanBasins
geology.crust
landmass.genesis
terrain.birth
terrain.detail
seaLevel.solve
hydrology.basins
climate.baseline
biome.potential
microTile.activation
```

### 3.3 Planet Foundation

Planet Foundation establishes world constraints before terrain exists.

Examples:

```text
planet scale,
style mode,
geology stack,
land/ocean tendencies,
climate premise,
sea-level premise,
profile allowances.
```

### 3.4 Geologic Spine

The Geologic Spine creates large-scale causes.

Examples:

```text
continental systems,
ocean basins,
major uplift zones,
rifts,
collision belts,
volcanic arcs,
hotspot tendencies,
passive/active margins.
```

### 3.5 Process Fields

Process fields translate geologic causes into continuous terrain authority.

Examples:

```text
continentality,
continentCoreStrength,
shelfTendency,
marginTendency,
oceanBasinTendency,
upliftTendency,
ridgeTendency,
ridgeDirection,
rainShadowPotential,
erosionResistance,
subsidenceTendency.
```

### 3.6 Terrain Birth

Terrain Birth turns process fields into base generated height.

It may use seeded detail, but seeded detail must be constrained by cause.

Examples:

```text
high continentCoreStrength + old craton = broad stable interior,
marginTendency + shelfTendency = coastal/shelf transition,
upliftTendency + collision field = mountain belt,
oceanBasinTendency = deep basin tendency,
ridge/rift tendency = elevated or lowered linear structure,
arcTendency = island chain or volcanic ridge tendency.
```

### 3.7 Sea-Level Solve

Sea-Level Solve reveals land and water from terrain.

It must not become a hidden land-mask generator.

### 3.8 Consequence Systems

Hydrology, climate, biomes, resources, settlements, and movement suitability read generated terrain and derive consequences.

They do not replace the terrain authority chain.

---

## 4. Bad Model vs WorldWright Model

### 4.1 Bad Model

```ts
for (const cell of world.cells) {
  cell.height = rng.floatRange(-1, 1);
  cell.isLand = cell.height > 0;
}
```

This is not allowed as the primary world model.

It creates:

```text
noise terrain,
random land,
weak continents,
unsupported coasts,
rivers with no meaningful basins,
biomes with no climate cause,
and visuals that downstream systems cannot trust.
```

### 4.2 WorldWright Model

```ts
const seeds = createSeedManifest(worldSeed, generationProfile);

const foundation = buildPlanetFoundation(
  seeds.stream('planet.foundation'),
);

const geology = buildGeologicSpine(foundation, {
  spine: seeds.stream('geology.spine'),
  plates: seeds.stream('geology.plates'),
  continents: seeds.stream('geology.continents'),
  oceanBasins: seeds.stream('geology.oceanBasins'),
});

const processFields = buildProcessFields(geology, {
  crust: seeds.stream('geology.crust'),
  landmass: seeds.stream('landmass.genesis'),
});

const terrain = birthTerrainFromCauses(processFields, {
  terrainBirth: seeds.stream('terrain.birth'),
  terrainDetail: seeds.stream('terrain.detail'),
});

const seaLevel = solveSeaLevel(
  terrain,
  foundation,
  seeds.stream('seaLevel.solve'),
);

const water = deriveWaterFromTerrainAndSeaLevel(terrain, seaLevel);

const hydrology = buildHydrology(
  terrain,
  water,
  seeds.stream('hydrology.basins'),
);
```

In this model, seeds appear throughout the pipeline, but the pipeline governs meaning.

---

## 5. What a Seed May Influence

Seeded variation may influence the following, if routed through named streams and causal systems.

### 5.1 Planet Foundation Variation

```text
planet profile variant,
geology stack variant,
land/ocean tendency,
climate premise variation,
style constraint variation.
```

### 5.2 Geologic Variation

```text
continental system count,
ocean basin count,
craton anchor tendencies,
terrane/accretion variation,
ridge/rift/arc/collision placement variation,
margin style variation,
basin archetype variation.
```

### 5.3 Terrain Variation

```text
mountain ridge wobble,
coast roughness,
plateau roughness,
plain texture,
basin asymmetry,
ocean floor texture,
shelf irregularity,
local relief detail.
```

### 5.4 Hydrology Variation

```text
river tie-breakers,
tributary density variation,
floodplain tendency variation,
lake/wetland candidate variation,
watershed boundary tie-breakers.
```

### 5.5 Climate / Biome Variation

```text
humidity variation inside climate logic,
biome transition variation,
forest/grassland/desert mottling inside climate constraints,
snowline/local mountain variation.
```

### 5.6 Micro Tile Variation

```text
local terrain detail,
local hydrology detail,
local surface detail,
local resource flecks,
local settlement context,
export sampling,
diagnostic sampling.
```

---

## 6. What a Seed Must Not Do

A seed must not directly create:

```text
random land masks,
noise-only continents,
noise-only mountains,
noise-only rivers,
noise-only biomes,
land/water labels without height/sea-level cause,
city or settlement truth without suitability/promoted authored reality,
local detail that ignores macro context,
export artifacts that cannot be traced to source,
diagnostic randomness that changes canonical world state.
```

Core prohibition:

```text
Seeded randomness may texture cause.
Seeded randomness may not replace cause.
```

---

## 7. Example: Same Seed, Real Cause Chain

Given a seed like:

```text
1040037
```

Generate may deterministically choose:

```text
four major continental systems,
three major ocean basins,
one old craton-heavy continent,
one fragmented volcanic/island-arc region,
one young collision zone,
one broad passive-margin continent.
```

Then geology creates fields such as:

```text
continentality,
continentCoreStrength,
shelfTendency,
marginTendency,
oceanBasinTendency,
upliftTendency,
ridgeTendency,
ridgeDirection,
rainShadowPotential,
erosionResistance.
```

Then Terrain Birth derives:

```text
broad stable interiors,
mountain belts,
basins,
continental shelves,
coastal transitions,
deep oceans,
ridges,
arcs,
rifted structures,
local variation.
```

Then Sea-Level Solve reveals:

```text
exposed mainland,
islands,
shelves,
submerged shelf,
deep ocean,
coasts.
```

Then consequence systems derive:

```text
rivers,
watersheds,
climate,
biomes,
surface potential,
resource potential,
settlement suitability,
travel suitability.
```

Thus land is an outcome, not the first random decision.

---

## 8. DNA Analogy

A seed is like DNA.

DNA does not say:

```text
put this exact skin cell here randomly.
```

DNA says:

```text
build this kind of body using these growth rules.
```

A WorldWright seed should say:

```text
build this kind of planet using these causal systems.
```

The seed is not every decision.

The seed is the reproducible source that feeds the rules that create the world.

---

## 9. Micro Tile Implication

Micro tile activation must follow the same law.

A micro tile seed must not generate local terrain while ignoring macro truth.

Tile activation should depend on:

```text
world seed,
seed architecture version,
generation profile,
tile ID,
tile purpose,
macro context hash,
tile schema version.
```

Law:

```text
Seed gives identity.
Macro context gives current world truth.
Both are required for safe tile activation.
```

If macro context changes, the tile should not silently regenerate as if nothing happened.

It should become one of:

```text
STALE,
NEEDS_REFRESH,
CONFLICT_REVIEW_REQUIRED,
EXPORT_STALE.
```

---

## 10. Diagnostics

Diagnostics must prove that seed randomness did not bypass the terrain pipeline.

Required diagnostics:

```text
seedToTerrainCausalityPresent,
terrainBirthReadsProcessFields,
landWaterDerivedFromHeightAndSeaLevel,
noiseContributionBounded,
rawNoiseAuthorityViolationCount,
landMaskAuthorityViolationCount,
geologicCauseCoverage,
terrainProcessCorrelation,
coastProcessCorrelation,
hydrologyFollowsTerrain,
biomeFollowsClimateAndTerrain,
settlementSuitabilityFollowsContext,
microTileReadsMacroContext,
seedStreamOwnershipCoverage.
```

Diagnostic questions:

```text
Did this terrain come from cause fields?
Did sea level reveal land instead of creating it directly?
Did noise add texture or replace cause?
Do rivers follow terrain?
Do biomes follow climate and water?
Do local tiles read macro context?
Can the seed-to-terrain path be inspected?
```

---

## 11. Tests

Required tests:

```text
same seed same causal source fields,
same seed same base terrain within compatible generator version,
random stream changes in climate do not alter continent source fields,
random stream changes in diagnostics do not alter terrain,
land/water is derived from height and sea level,
terrain birth reads geologic/process fields,
raw noise cannot be sole source of land authority,
noise contribution remains bounded,
micro tile activation uses macro context hash,
tile activation order does not change tile terrain,
export does not mutate terrain source.
```

Regression tests should include known seeds that previously produced:

```text
round submerged continent ghosts,
weak landforms,
flat oceans,
random speckled land,
rivers without basins,
coasts unsupported by terrain.
```

---

## 12. Failure Modes

This system fails if:

```text
the seed directly creates land/water labels,
noise acts as the primary terrain authority,
terrain ignores geologic/process fields,
sea level is used to hide broken terrain,
land fraction is correct but landforms are weak,
submerged continent ghosts remain because seed/province data bypasses terrain,
hydrology is generated independently from terrain,
climate/biomes are assigned cosmetically,
micro tiles generate local detail without macro context,
diagnostics cannot trace terrain back to seeded causes.
```

Catastrophic failure:

```text
The generated planet looks like a random map rather than a world with seeded causes.
```

---

## 13. Forbidden Shortcuts

```text
Do not treat the seed as a land-mask generator.
Do not let seeded noise become the world spine.
Do not generate random land and explain it afterward.
Do not use sea level to hide bad terrain authority.
Do not let continent IDs directly force visual land/water.
Do not let debug fields become terrain truth.
Do not let tile seeds ignore macro context.
Do not let diagnostics consume or alter canonical seed streams.
Do not accept land coverage targets as proof of terrain quality.
Do not accept a pretty render if the seed-to-terrain causality path is broken.
```

---

## 14. Summary Law

```text
Seed supplies reproducible variation.
Geology supplies cause.
Terrain Birth supplies physical form.
Sea level reveals land and water.
Hydrology, climate, biomes, resources, settlements, and movement suitability prove the world has consequences.
Diagnostics reject worlds where seeded variation bypassed the causal pipeline.
```

The seed feeds the pipeline.

The seed does not replace the pipeline.
