# WorldWright Blueprint: Generate Mode Causal Chain Backpatch Before Terrain Birth

Status: draft / chain enforcement backpatch  
Owner: Iron Man  
Purpose: back-patch the Generate Mode causal chain so Process Fields, Continent/Ocean-Basin Structure, the Operational Algorithm, and Landmass Genesis explicitly lock together before Terrain Birth is allowed to consume anything.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_AND_OCEAN_BASIN_STRUCTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CONTINENT_OCEAN_STRUCTURE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_LANDMASS_GENESIS_INTEGRATION.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_CORE_AND_CRUST_ENGINE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
```

---

## 1. Backpatch Core Law

```text
Terrain Birth may not be reached by shortcut.

The approved chain is:

Planet Foundation
-> Interior/Core/Crust Engine
-> Geologic Spine
-> Process Fields
-> Continent/Ocean-Basin Structure
-> Continent/Ocean Operational Algorithm
-> Landmass Genesis
-> Terrain Birth
```

No generator stage may bypass this chain by reading:

```text
UI preset labels,
renderer colors,
debug IDs,
continent IDs,
ocean basin IDs,
raw noise land masks,
sea level results,
final terrain,
or final land/water masks.
```

---

## 2. Why This Backpatch Exists

The chain is already mostly built forward, but Terrain Birth is the dangerous next layer.

If Terrain Birth is allowed to read the wrong source, the entire blueprint chain collapses back into:

```text
random land blobs,
continent IDs as height masks,
flat oceans,
submerged continent ghosts,
coasts with no shelf/margin cause,
noise ridges pretending to be mountains,
Fantasy/Alien renderer weirdness with no support fields.
```

This backpatch formally declares which stage is allowed to transform which kind of truth.

---

## 3. Stage Responsibility Lock

### 3.1 Process Fields

```text
Process Fields own continuous causal authority.
```

Process Fields may output:

```text
continentality,
crustalBuoyancy,
oceanBasinTendency,
bathymetricAuthority,
shelfTendency,
marginTendency,
upliftTendency,
ridgeRiftTendency,
volcanicPotential,
impactBasinAuthority,
iceShellStress,
aridityPotential,
alien/fantasy support fields.
```

Process Fields must not output final land, final water, final terrain, or final coastlines.

Process Fields must explicitly hand structural authority to:

```text
Continent/Ocean-Basin Structure,
Landmass Genesis indirectly through structural roles,
Terrain Birth only through approved downstream contracts.
```

### 3.2 Continent/Ocean-Basin Structure

```text
Continent/Ocean-Basin Structure owns explicit structural systems.
```

It converts Process Fields into:

```text
continent systems,
ocean basin systems,
margins,
shelves,
slopes,
deep basins,
ridges,
arcs,
seamounts,
drowned fragments,
structural role fields,
ghost audit results.
```

It must not create final land/water or final height.

It must hand Landmass Genesis:

```text
structural role fields,
structure system refs,
structural confidence,
ocean-basin suppression roles,
ghost audit verdicts,
drowned fragment classifications.
```

### 3.3 Continent/Ocean Operational Algorithm

```text
The Operational Algorithm owns the machine process for resolving fields into structures.
```

It must:

```text
use stable sampling graphs,
extract candidate regions,
resolve continent/basin conflicts,
allow ocean authority to win,
classify drowned fragments,
run ghost-continent audit,
produce stable IDs,
produce tile-safe role fields.
```

It must not:

```text
turn candidate scores into final land,
use sea level to classify water,
let debug IDs become structure authority,
or let ghost audit only report without gating.
```

### 3.4 Landmass Genesis

```text
Landmass Genesis owns landform birth potential and land suppression.
```

It consumes:

```text
Continent/Ocean structure records,
structural role fields,
ghost audit verdicts,
Process Field support,
Interior/Spine/Foundation permissions.
```

It outputs:

```text
landform birth potential fields,
landform suppression fields,
landmass system intents,
Terrain Birth handoff,
Bathymetry handoff,
Sea-Level Solve handoff,
Micro Tile handoff.
```

It must not output:

```text
final land,
final water,
final height,
final coastline,
raw land mask.
```

### 3.5 Terrain Birth

```text
Terrain Birth owns final generated height and terrain form.
```

Terrain Birth must read:

```text
Landmass Genesis potential fields,
Landmass suppression fields,
Process Fields through approved terrain formulas,
Continent/Ocean structural roles through approved handoff,
Interior/Spine/Foundation refs for validation only unless explicitly allowed.
```

Terrain Birth must not read:

```text
continentId as height,
oceanBasinId as depth,
provinceId as terrain,
renderer color as material authority,
sea level as land source,
UI preset label as terrain recipe,
raw noise as continent placement.
```

---

## 4. Approved Read Matrix

```text
Planet Foundation:
  read by Interior, Geologic Spine, Process Fields, Continent/Ocean Structure, Landmass Genesis, Terrain Birth validation.

Interior/Core/Crust Engine:
  read by Geologic Spine, Process Fields, Continent/Ocean Structure, Landmass Genesis validation, Terrain Birth validation.

Geologic Spine:
  read by Process Fields, Continent/Ocean Structure, Landmass Genesis validation, Terrain Birth validation.

Process Fields:
  read by Continent/Ocean Structure, Landmass Genesis, Terrain Birth formulas, Bathymetry formulas.

Continent/Ocean Structure:
  read by Landmass Genesis, Terrain Birth handoff, Bathymetry handoff, Sea-Level Solve context, Micro Tiles.

Operational Algorithm outputs:
  read by Landmass Genesis and diagnostics; not direct terrain masks.

Landmass Genesis:
  read by Terrain Birth, Bathymetry, Sea-Level Solve, Hydrology/Climate/Biome handoffs, Micro Tiles, Export.

Terrain Birth:
  read by Sea-Level Solve, Hydrology, Climate, Biomes, Surface Materials, Resources, Settlement, Movement, Micro Tiles, Export.
```

---

## 5. Forbidden Bypass Matrix

```text
Process Fields -> final land/water:
  forbidden.

Continent/Ocean Structure -> final height:
  forbidden.

Continent/Ocean Structure IDs -> Terrain Birth height mask:
  forbidden.

Landmass Genesis -> final land mask:
  forbidden.

Sea-Level Solve -> continent source:
  forbidden.

Renderer colors -> any source stage:
  forbidden.

Debug IDs -> any terrain authority:
  forbidden.

Raw noise -> continents without Process/Structure/Landmass chain:
  forbidden.
```

---

## 6. Required Terrain Birth Gate

Terrain Birth must not start unless these are true:

```text
PlanetFoundationHash present,
InteriorEngineHash present,
GeologicSpineHash present,
ProcessFieldSetHash present,
ContinentOceanStructureHash present,
GhostContinentAudit verdict present,
LandmassGenesisHash present,
LandformBirthPotentialFieldSet present,
LandPotentialSuppressionFieldSet present,
TerrainBirthHandoff present.
```

Terrain Birth must block or warn if:

```text
GhostContinentAudit is BLOCKED,
LandmassGenesis did not consume ghost audit,
Landform suppression fields are missing,
Continent/Ocean Structure is missing,
ProcessFieldSet is missing,
any required source hash is stale,
any debug ID authority violation is detected.
```

---

## 7. Explicit Ghost-Protection Chain

Submerged continent ghosts must be attacked in every layer:

```text
Process Fields:
  oceanBasinTendency and bathymetricAuthority suppress unsupported continental authority.

Continent/Ocean Structure:
  high continent + high basin + weak margin/shelf becomes ghost risk, drowned classification, or suppression.

Operational Algorithm:
  resolves conflicts and applies ocean-wins rule.

Landmass Genesis:
  converts ghost risk into landform suppression or explicit drowned plateau potential, not normal land.

Terrain Birth:
  may not resurrect suppressed land potential as normal continent height.

Bathymetry:
  must distinguish true basin, drowned plateau, seamount, impact basin, subglacial basin, alien/fantasy basin.

Sea-Level Solve:
  reveals land/water only after terrain and bathymetry exist; it must not define continent source.
```

---

## 8. Required Cross-Stage Diagnostics

Required diagnostics before Terrain Birth:

```text
causalChainComplete,
sourceHashChainValid,
processFieldsToStructureHandoffPresent,
structureToLandmassHandoffPresent,
landmassToTerrainBirthHandoffPresent,
ghostAuditConsumedByLandmassGenesis,
landSuppressionFieldsPresent,
debugIdAuthorityViolationCount,
rendererInputViolationCount,
uiLabelInputViolationCount,
seaLevelPrematureInputViolationCount,
TerrainBirthBypassAttemptCount,
rawNoiseContinentBypassAttemptCount,
continentIdHeightMaskAttemptCount,
oceanBasinIdDepthMaskAttemptCount.
```

Diagnostic verdicts:

```text
PASS:
  Terrain Birth may proceed.

PASS_WITH_WARNINGS:
  Terrain Birth may proceed but must carry warning metadata.

BLOCKED:
  Terrain Birth must not run for source generation.
```

---

## 9. Required Cross-Stage Tests

```text
Terrain Birth cannot run without LandmassGenesisHash.
Terrain Birth cannot run without LandformBirthPotentialFieldSet.
Terrain Birth cannot run without LandPotentialSuppressionFieldSet.
Terrain Birth cannot read continentId as height authority.
Terrain Birth cannot read oceanBasinId as depth authority.
Terrain Birth cannot read sea-level result as land source.
Terrain Birth cannot read renderer colors.
Terrain Birth cannot create continent interiors where Landmass suppression is high.
Terrain Birth cannot resurrect BLOCKED ghost audit regions as normal land.
Bathymetry cannot ignore ocean-basin structure handoff.
Sea-Level Solve cannot define continent structure.
Same source hashes produce same handoff chain.
Changing ProcessFieldSetHash invalidates Continent/Ocean Structure, Landmass Genesis, and Terrain Birth.
Changing ContinentOceanStructureHash invalidates Landmass Genesis and Terrain Birth.
Changing LandmassGenesisHash invalidates Terrain Birth.
```

---

## 10. Backpatch Obligations By File

### 10.1 Process Fields Core Contract

Must be interpreted as including this law:

```text
Process Fields are not terrain.
They must hand continuous causal authority to Continent/Ocean-Basin Structure and Landmass Genesis through approved contracts before Terrain Birth may use them.
```

### 10.2 Continent/Ocean-Basin Structure

Must be interpreted as including this law:

```text
Continent/Ocean-Basin Structure is the required structural bridge between Process Fields and Landmass Genesis.
Landmass Genesis is the approved consumer that converts structural land-support roles into landform birth potential.
```

### 10.3 Continent/Ocean Operational Algorithm

Must be interpreted as including this law:

```text
The operational algorithm must produce role fields and ghost audit results that Landmass Genesis consumes before Terrain Birth.
```

### 10.4 Landmass Genesis Integration

Must be interpreted as including this law:

```text
Landmass Genesis is the final pre-Terrain-Birth filter for landform support and suppression.
Terrain Birth may not bypass it.
```

### 10.5 Terrain Birth Core Contract

When written, it must begin from this law:

```text
Terrain Birth consumes causal potential and suppression.
Terrain Birth does not invent continent authority.
```

---

## 11. Summary Law

```text
Before Terrain Birth, WorldWright must prove the chain is intact.

Process Fields make authority continuous.
Continent/Ocean Structure makes authority structural.
Operational Algorithm resolves conflicts and ghost risk.
Landmass Genesis turns structure into landform potential and suppression.
Terrain Birth turns approved potential into height.

No bypass.
No debug IDs as authority.
No sea level as source.
No raw noise continents.
No resurrected submerged ghosts.
```
