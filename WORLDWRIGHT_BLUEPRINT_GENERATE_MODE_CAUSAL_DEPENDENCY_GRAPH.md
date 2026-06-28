# WorldWright Blueprint: Generate Mode Causal Dependency Graph

Status: draft / source architecture blueprint  
Owner: Iron Man  
Purpose: upgrade the early Generate Mode architecture from a simple linear chain into a causal dependency graph with stage gates, so source truth remains web-like while Terrain Birth and later globe-stack systems still cannot bypass required authority layers.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_CHAIN_BACKPATCH_BEFORE_TERRAIN_BIRTH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GENERATOR_CONSTITUTION.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SCOPE_AND_DOMAIN_MAP.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_IDENTITY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_CORE_AND_CRUST_ENGINE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_AND_OCEAN_BASIN_STRUCTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_LANDMASS_GENESIS_INTEGRATION.md
```

---

## 1. Core Law

```text
Generation order may be staged.
Causality is graph-shaped.
Renderer layers are not causality.
Globe stack layers are storage and presentation, not source truth.
```

The approved chain remains the minimum gate:

```text
Planet Foundation
-> Interior/Core/Crust Engine
-> Geologic Spine
-> Process Fields
-> Continent/Ocean-Basin Structure
-> Landmass Genesis
-> Terrain Birth
```

But the actual early generator behaves as a causal dependency graph:

```text
later stages may validate against many upstream sources,
upstream records may feed more than one downstream system,
a field may influence terrain, bathymetry, hydrology, materials, micro tiles, and export,
and no stage owns truth merely because it appears later in the visual globe stack.
```

Short rule:

```text
Chain for gates.
Graph for causality.
Stack for presentation/storage.
```

---

## 2. Why This Matters

A pure chain is too narrow.

It can accidentally imply:

```text
A feeds B feeds C feeds D,
so D only needs C.
```

WorldWright needs:

```text
A must exist before D may run,
but D may validate against A, B, C, and side-branch records.
```

Example:

```text
Terrain Birth requires Landmass Genesis,
but Terrain Birth also validates against Process Fields,
Continent/Ocean Structure,
Interior,
Geologic Spine,
Planet Foundation,
Ghost Audit,
and Seed/Identity records.
```

This prevents dumb isolation.

It also prevents bypasses:

```text
Process Fields -> Terrain Birth without structure,
continentId -> height,
sea level -> continent source,
renderer color -> material authority,
raw noise -> continents.
```

---

## 3. Causal Graph Layers

### 3.1 Source Truth Graph

Owns identity, reproducibility, and source-law records.

Nodes:

```text
Planet Identity,
World Birth Certificate,
Seed Manifest,
Resolved Planet Foundation,
Reality Layers,
Preset Strength Profile,
Interior/Core/Crust Engine,
Capability Matrix.
```

Role:

```text
define which world this is,
define how it can be replayed,
define what rules are allowed,
define what physical/reality capabilities exist.
```

### 3.2 Causal Structure Graph

Owns large-scale causal skeletons.

Nodes:

```text
Geologic Spine,
Geologic Province Graph,
Major Geologic Structures,
Process Intent Fields,
Interior-to-Spine handoffs.
```

Role:

```text
explain why large systems should exist,
not yet create final terrain.
```

### 3.3 Continuous Authority Graph

Owns sampleable continuous authority.

Nodes:

```text
Process Field Set,
crust/surface identity fields,
tectonic/deformation fields,
ocean/bathymetry fields,
ice/desert/impact/volcanic fields,
alien/fantasy support fields,
structural role fields,
suppression fields.
```

Role:

```text
make causes spatially readable,
provide continuous ingredients to structure, terrain, bathymetry, hydrology, materials, micro tiles, and export.
```

### 3.4 Birth Potential Graph

Owns pre-height terrain/bathymetry support.

Nodes:

```text
Continent/Ocean-Basin Structure,
Continent/Ocean Operational Algorithm,
Ghost Continent Audit,
Landmass Genesis,
Bathymetry Prep,
Landform Birth Potential,
Landform Suppression,
Drowned Fragment Records,
Seamount/Island/Arc support.
```

Role:

```text
turn continuous authority into structured potential,
classify special cases,
suppress invalid ghosts,
prepare Terrain Birth and Bathymetry.
```

### 3.5 Globe Stack / Visible World Graph

Owns generated visible state and later consequences.

Nodes:

```text
Terrain Birth,
Ocean/Bathymetry,
Sea-Level Solve,
Hydrology Baseline,
Climate Baseline,
Biomes,
Surface Materials,
Resources,
Settlement Suitability,
Movement/Travel Suitability,
Micro Tile Registry,
Create/Sim/Export/Save handoffs.
```

Role:

```text
create visible/generated world state,
not redefine source truth.
```

---

## 4. Dependency Node Contract

```ts
interface GenerateCausalGraphNode {
  nodeId: string;
  nodeName: string;
  nodeLayer:
    | 'SOURCE_TRUTH'
    | 'CAUSAL_STRUCTURE'
    | 'CONTINUOUS_AUTHORITY'
    | 'BIRTH_POTENTIAL'
    | 'VISIBLE_GLOBE_STACK'
    | 'DIAGNOSTIC_ARTIFACT';

  ownerStage: string;
  dataClass:
    | 'CANONICAL_SOURCE'
    | 'DERIVED_SOURCE'
    | 'CONTINUOUS_FIELD'
    | 'STRUCTURAL_RECORD'
    | 'POTENTIAL_FIELD'
    | 'FINAL_GENERATED_STATE'
    | 'DEBUG_ONLY'
    | 'ARTIFACT';

  sourceHash?: string;
  requiredInputs: GenerateGraphInputRef[];
  allowedConsumers: GenerateGraphConsumerRef[];
  invalidates: string[];
  diagnostics: string[];
  forbiddenConsumers: string[];
}
```

---

## 5. Dependency Edge Contract

```ts
interface GenerateCausalGraphEdge {
  edgeId: string;
  fromNodeId: string;
  toNodeId: string;

  edgeType:
    | 'REQUIRES'
    | 'VALIDATES_AGAINST'
    | 'DERIVES_FROM'
    | 'SAMPLES_FROM'
    | 'SUPPRESSES'
    | 'CLASSIFIES'
    | 'HANDS_OFF_TO'
    | 'INVALIDATES'
    | 'DIAGNOSTIC_ONLY';

  isSourceAffecting: boolean;
  mustBeHashStable: boolean;
  bypassForbidden: boolean;
  diagnosticExpectation: string;
}
```

Examples:

```text
Planet Foundation -> Interior Engine:
  REQUIRES, source-affecting.

Interior Engine -> Geologic Spine:
  REQUIRES and VALIDATES_AGAINST, source-affecting.

Process Fields -> Continent/Ocean Structure:
  SAMPLES_FROM and DERIVES_FROM, source-affecting.

Continent/Ocean Structure -> Landmass Genesis:
  HANDS_OFF_TO, source-affecting.

Ghost Audit -> Landmass Genesis:
  SUPPRESSES and VALIDATES_AGAINST, source-affecting.

Landmass Genesis -> Terrain Birth:
  HANDS_OFF_TO, source-affecting.

Debug overlay -> Terrain Birth:
  forbidden.
```

---

## 6. Stage Gates vs Graph Reads

Stage gates declare minimum required progression.

Graph reads declare valid dependencies.

Example:

```text
Terrain Birth gate requires LandmassGenesisHash.
Terrain Birth graph reads may also validate against ProcessFieldSetHash, ContinentOceanStructureHash, InteriorEngineHash, GeologicSpineHash, PlanetFoundationHash, and GhostAuditHash.
```

This means:

```text
Terrain Birth cannot bypass Landmass Genesis,
but Terrain Birth is not blind to earlier causes.
```

The right phrase is:

```text
A must exist before D may run, but D may validate against A, B, and C.
```

---

## 7. Invalidations

Every source-affecting node must declare what it invalidates.

Examples:

```text
Changing Planet Foundation invalidates Interior, Spine, Process Fields, Structure, Landmass Genesis, Terrain Birth, Bathymetry, Sea-Level Solve, Hydrology, Climate, Biomes, Resources, Micro Tile recipes, Export metadata.

Changing Interior Engine invalidates Spine, Process Fields, Structure, Landmass Genesis, Terrain Birth validation, Bathymetry validation.

Changing Process Fields invalidates Continent/Ocean Structure, Landmass Genesis, Terrain Birth, Bathymetry, Hydrology support, Micro Tile field summaries.

Changing Continent/Ocean Structure invalidates Landmass Genesis, Terrain Birth, Bathymetry, Sea-Level context, Micro Tile structure refs.

Changing Landmass Genesis invalidates Terrain Birth and downstream visible globe stack.
```

Invalidation rules:

```text
Debug overlays do not invalidate source truth.
Renderer colors do not invalidate source truth unless explicitly source-affecting style is declared.
Export artifacts do not invalidate generator source.
Sim branch deltas do not mutate source graph unless explicitly committed through an authored workflow.
```

---

## 8. Anti-Bypass Graph Rules

Forbidden edges:

```text
UI preset label -> Terrain Birth formula.
Renderer color -> Process Field source.
Debug ID -> height or depth.
Sea-Level Solve -> continent structure.
Final land/water mask -> Landmass Genesis source.
Raw noise -> continent placement without Process/Structure/Landmass chain.
Export artifact -> generator source truth.
```

Required anti-bypass diagnostics:

```text
causalGraphBuilt,
requiredStageGatesSatisfied,
forbiddenEdgeCount,
missingSourceHashCount,
staleSourceHashCount,
debugAuthorityEdgeCount,
rendererAuthorityEdgeCount,
seaLevelPrematureAuthorityEdgeCount,
rawNoiseContinentBypassEdgeCount,
TerrainBirthBypassEdgeCount.
```

---

## 9. Relationship to Globe Stack

The globe stack is downstream representation.

It may store and display:

```text
height,
bathymetry,
water,
hydrology,
climate,
biomes,
materials,
resources,
settlement suitability,
movement suitability,
debug overlays,
export masks.
```

But the globe stack must not retroactively become source truth for early generator stages.

Rule:

```text
The globe stack displays generated consequences.
The causal graph owns why those consequences exist.
```

---

## 10. Required Tests

```text
Terrain Birth cannot start when CausalGraph gate is incomplete.
Terrain Birth may validate against earlier sources without bypassing Landmass Genesis.
Changing ProcessFieldSetHash invalidates Structure, Landmass, Terrain Birth.
Changing StructureHash invalidates Landmass and Terrain Birth.
Changing LandmassGenesisHash invalidates Terrain Birth.
Debug overlay changes do not invalidate source graph.
Renderer palette changes do not change source graph unless declared source-affecting.
Forbidden edge from continentId to height is rejected.
Forbidden edge from sea level to continent source is rejected.
Globe stack output cannot be fed back into Process Fields as source truth.
```

---

## 11. Summary Law

```text
WorldWright Generate Mode should be implemented as a causal dependency graph with stage gates.

The chain prevents shortcuts.
The graph preserves causal richness.
The globe stack displays and stores consequences.

Before Terrain Birth, the generator must prove both:
  the required gate path is complete,
  and every graph dependency is legal, hash-stable, inspectable, and diagnosable.
```
