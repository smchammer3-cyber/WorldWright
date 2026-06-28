# WorldWright Blueprint: Generate Mode Planet Identity

Status: draft / generator subsystem blueprint  
Owner: Iron Man  
Purpose: define the stable identity of a generated world before terrain, geology, micro tiles, exports, saves, diagnostics, or simulation branches attach to it.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GENERATOR_CONSTITUTION.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SCOPE_AND_DOMAIN_MAP.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Core Law

```text
Planet Identity answers: what world is this?

Before WorldWright can generate terrain, save data, export heightmaps, activate micro tiles, run simulations, or hand data to future tools, the world must have a stable identity.
```

Planet Identity is not terrain.

Planet Identity is not the rendered globe.

Planet Identity is not a temporary UI session.

Planet Identity is the stable root object that later generated, authored, simulated, saved, exported, and diagnosed data belongs to.

Core rule:

```text
Every generated field, micro tile, save record, sim branch, export artifact, diagnostic artifact, and future tool handoff must be traceable back to a World Identity.
```

---

## 2. Why Planet Identity Comes Before Planet Foundation

Planet Foundation defines what kind of planet is being born.

Planet Identity defines which world record is receiving that foundation.

The order is:

```text
Planet Identity
-> Seed Architecture
-> Generation Profile
-> Planet Foundation
-> Generated World Fields
```

Planet Foundation may later be regenerated, migrated, compared, forked, or audited.

Planet Identity must remain stable enough to answer:

```text
Which world is this?
Which save owns this data?
Which micro tiles belong to it?
Which exports came from it?
Which sim branches attach to it?
Which authored layers belong to it?
Which diagnostics describe it?
Which future City Maker or Unreal handoff package came from it?
```

Without Planet Identity, every later system can produce data that looks valid but cannot prove what world it belongs to.

---

## 3. Planet Identity vs World State

Planet Identity and World State must not be confused.

### 3.1 Planet Identity

Planet Identity is stable identity metadata.

It includes:

```text
world ID,
project ID if applicable,
root seed identity,
seed architecture version,
generator version,
generation profile ID,
creation timestamp,
identity schema version,
lineage information,
user-facing name,
internal source hash references.
```

### 3.2 World State

World State is the current data attached to that identity.

It includes:

```text
generated fields,
derived fields,
Create Mode authored layers,
Sim Mode branches,
micro tile records,
export records,
diagnostic artifacts,
cache state,
UI session state.
```

Planet Identity says:

```text
this is the world record.
```

World State says:

```text
this is what currently exists inside or attached to that world record.
```

---

## 4. Identity Data Contract

A generated world should have a first-class identity object.

```ts
interface WorldIdentity {
  worldId: string;
  projectId?: string;

  userFacingName?: string;
  generatedName?: string;

  worldSeed: string;
  seedArchitectureVersion: string;
  generatorVersion: string;
  generationProfileId: string;

  identitySchemaVersion: string;
  worldSchemaVersion: string;

  createdAt: string;
  createdBy?: 'USER' | 'GENERATE_MODE' | 'IMPORT' | 'FORK' | 'MIGRATION';

  lineage: WorldLineage;
  sourceHashes: WorldSourceHashes;

  tags?: string[];
  notes?: string;
}
```

### 4.1 World Lineage

World Lineage describes where a world came from.

```ts
interface WorldLineage {
  origin:
    | 'NEW_GENERATION'
    | 'FORKED_FROM_WORLD'
    | 'IMPORTED_WORLD'
    | 'MIGRATED_LEGACY_WORLD'
    | 'GENERATED_FROM_TEMPLATE';

  parentWorldId?: string;
  parentSaveId?: string;
  forkReason?: string;
  importSource?: string;
  migrationRecordId?: string;
}
```

### 4.2 World Source Hashes

World Source Hashes let the system compare whether important identity-linked sources changed.

```ts
interface WorldSourceHashes {
  identityHash: string;
  seedManifestHash?: string;
  generationProfileHash?: string;
  planetFoundationHash?: string;
  canonicalGeneratedSourceHash?: string;
}
```

These hashes are not the world identity by themselves.

They are evidence attached to the identity.

---

## 5. Required Identity Fields

The minimum Planet Identity fields are:

```text
worldId,
worldSeed,
seedArchitectureVersion,
generatorVersion,
generationProfileId,
identitySchemaVersion,
worldSchemaVersion,
createdAt,
lineage.origin.
```

Optional but important fields:

```text
userFacingName,
generatedName,
projectId,
parentWorldId,
source hashes,
tags,
notes.
```

A generated world is not valid for save/load, export, micro tile activation, or simulation if minimum identity fields are missing.

---

## 6. World ID Rules

World ID must be stable and unique enough for local-first use.

Rules:

```text
World ID must be created before generated fields attach to the world.
World ID must be saved.
World ID must not be replaced silently.
World ID must not depend only on user-facing name.
World ID must not depend on transient UI session state.
World ID must not be reused for a different world.
World ID must be included in export and diagnostic sidecars.
World ID must be referenced by micro tile IDs or tile manifests.
```

World ID may be generated from:

```text
UUID/ULID-style identifier,
stable app-generated ID,
imported external ID plus namespace,
or another explicit durable ID scheme.
```

World ID should not be generated from mutable fields like:

```text
world name,
current time alone,
current visible terrain,
latest save path,
UI session ID.
```

---

## 7. Name Rules

Names are user-facing labels, not identity authority.

A world may have:

```text
userFacingName,
generatedName,
internal worldId.
```

Rules:

```text
Renaming a world must not change worldId.
Two worlds may have the same user-facing name.
Generated names may be replaced by user names.
Exports should include both user-facing name and worldId when available.
Diagnostics should use worldId as authority and name as display.
```

Failure example:

```text
User renames Caelora to Stormreach.
All micro tile IDs change.
```

This is forbidden.

---

## 8. Relationship to Seed

World Seed and World ID are different.

### 8.1 World Seed

World Seed answers:

```text
What deterministic seed helped birth this world?
```

### 8.2 World ID

World ID answers:

```text
Which specific world record is this?
```

Two different world records may share the same seed.

Examples:

```text
a copied world,
a forked world,
a regenerated comparison world,
a template-derived world,
two users using the same seed independently.
```

Therefore:

```text
worldSeed must not be treated as worldId.
```

The seed helps reproduce generated source.

The World ID owns the world record, authored layers, sim branches, exports, and tool handoffs.

---

## 9. Relationship to Generation Profile

Generation Profile defines the settings/premises under which the seed is interpreted.

Planet Identity must record:

```text
generationProfileId,
generationProfileHash if available,
generatorVersion,
seedArchitectureVersion.
```

The same seed with a different generation profile is not the same generated source.

Example:

```text
Seed 1040037 + Earthlike Default
Seed 1040037 + Alien Ice Shell
Seed 1040037 + Stylized Archipelago
```

These may produce different worlds.

They may share a seed, but they should not be treated as the same generated world unless explicitly forked/linked.

---

## 10. Relationship to Micro Tiles

Every micro tile must belong to a World Identity.

A micro tile ID should include or reference:

```text
worldId,
tile grid scheme,
tile face/level/x/y or equivalent address,
tile schema version,
tile source hash if needed.
```

Micro tile manifests must be able to answer:

```text
Which world do I belong to?
Which seed architecture birthed me?
Which generation profile defined my macro context?
Which macro context hash did I activate against?
Am I stale relative to my source world?
```

Rules:

```text
Micro tiles must not float unattached to a world.
Micro tile IDs must not collide across worlds.
Opening a tile must verify world identity.
Exporting a tile must include world identity.
Imported tile data must prove or declare its source world identity.
```

---

## 11. Relationship to Save/Load

Save/Load must preserve Planet Identity before preserving generated fields.

A save file must include:

```text
WorldIdentity,
SeedManifest or seed manifest reference,
world schema version,
generated source fields or references,
authored layers,
sim branches,
micro tile registry,
export records,
diagnostic references.
```

Load must validate:

```text
worldId exists,
worldSeed exists,
seedArchitectureVersion exists,
generatorVersion exists,
generationProfileId exists,
schema versions exist,
lineage is valid,
source hashes match or report mismatch.
```

If identity is damaged, Save/Load must report it.

It must not silently invent a new identity unless the user explicitly imports/forks/repairs under a documented policy.

---

## 12. Relationship to Sim Branches

Every Sim branch must attach to a World Identity.

A Sim branch should record:

```text
worldId,
baseWorldStateHash,
baseGeneratedSourceHash if needed,
branchId,
branchCreatedAt,
branchParentId if any,
canonPromotionStatus.
```

Rules:

```text
Sim branches must not attach to the wrong world.
Sim branches must not survive identity mismatch without warning.
Promoting a Sim branch must not replace Planet Identity.
Forking from a Sim branch may create a new World Identity with lineage.
```

---

## 13. Relationship to Create Mode Authorship

Authored layers belong to a World Identity.

Create Mode authored data should record:

```text
worldId,
authoringLayerId,
clayStickerIds,
source generated context hash if needed,
createdAt,
schema version.
```

Rules:

```text
Authored layers must not attach to a different world silently.
Clay stickers must not become orphaned from world identity.
Forking a world may copy authored layers with lineage.
Regenerating base terrain must not silently detach or overwrite authored layers.
```

---

## 14. Relationship to Export

Every export artifact must identify its source world.

Export sidecars should include:

```text
worldId,
userFacingName if available,
worldSeed,
seedArchitectureVersion,
generatorVersion,
generationProfileId,
source save ID if available,
source tile ID if tile export,
source field hashes,
export profile ID,
export timestamp,
loss report reference.
```

Rules:

```text
No export should be source-anonymous.
Export must not mutate Planet Identity.
Export must not use filename as identity authority.
Export must include enough identity metadata to trace artifacts back to WorldWright.
```

---

## 15. Relationship to Diagnostics and Artifacts

Diagnostics must attach to World Identity.

Diagnostic artifacts should include:

```text
worldId,
worldSeed,
generatorVersion,
seedArchitectureVersion,
generationProfileId,
stage name,
stage input hash,
stage output hash,
artifact timestamp,
run ID,
CI/build context if available.
```

Rules:

```text
Diagnostic artifacts must not be compared across worlds without checking identity.
Snapshots must include or reference world identity metadata.
Stage artifacts must be traceable to the world and generator version.
Diagnostics must report missing or inconsistent identity metadata.
```

---

## 16. Relationship to Future Tools

Future external tools need stable identity handoff.

Examples:

```text
City Maker handoff,
Unreal import package,
external heightmap workflow,
map renderer,
world encyclopedia/lore tool,
simulation replay tool.
```

Handoff packages should include:

```text
worldId,
sourceWorldName,
worldSeed,
generationProfileId,
source tile ID if relevant,
source sticker ID if relevant,
source field hashes,
coordinate/scale metadata,
loss report.
```

Rules:

```text
Future tools must not guess what world a package came from.
WorldWright must not assume external tools preserve identity unless they report it back.
Imported external results must validate source identity or enter as explicit imports.
```

---

## 17. Forking, Copying, Importing, and Regenerating

Planet Identity must handle lineage explicitly.

### 17.1 Copy

Copying a world may create a new world record with new worldId and parentWorldId.

### 17.2 Fork

Forking creates a new world identity derived from a parent.

Reasons may include:

```text
user fork,
Sim branch promotion to new world,
experimental regeneration,
Create Mode alternate version,
import cleanup.
```

### 17.3 Import

Import creates a World Identity from external data.

Import must record source and uncertainty.

### 17.4 Regeneration

Regeneration may create:

```text
same world, recomputed derived fields,
same world, repaired/migrated source with report,
new forked world from same seed/profile,
new unrelated world from same seed.
```

Regeneration must not silently replace the world identity unless the operation is explicitly defined.

---

## 18. Identity Hashing

Identity hash is a stable summary of identity-critical fields.

It may include:

```text
worldId,
worldSeed,
seedArchitectureVersion,
generatorVersion,
generationProfileId,
identitySchemaVersion,
worldSchemaVersion,
lineage origin,
parentWorldId if applicable.
```

Identity hash should not include mutable display fields like:

```text
userFacingName,
notes,
tags,
latest opened time,
UI state,
cache state.
```

Rules:

```text
Changing a world name must not change identity hash.
Changing generator version may change identity/generation compatibility status.
Changing lineage should update identity hash.
Identity hash mismatch must be reported.
```

---

## 19. Diagnostics

Required Planet Identity diagnostics:

```text
worldIdentityPresent,
worldIdPresent,
worldSeedPresent,
seedArchitectureVersionPresent,
generatorVersionPresent,
generationProfileIdPresent,
identitySchemaVersionPresent,
worldSchemaVersionPresent,
lineagePresent,
identityHashPresent,
identityHashValid,
sourceHashConsistency,
microTileWorldIdCoverage,
exportWorldIdCoverage,
simBranchWorldIdCoverage,
authoredLayerWorldIdCoverage,
diagnosticArtifactWorldIdCoverage,
externalHandoffWorldIdCoverage,
nameUsedAsIdentityViolationCount,
seedUsedAsWorldIdViolationCount.
```

Diagnostics must answer:

```text
Can every major artifact trace back to a world?
Can micro tiles prove which world they belong to?
Can exports prove source identity?
Can sim branches prove base identity?
Can authored data prove attachment to the correct world?
Was a mutable name or seed misused as world identity?
```

---

## 20. Tests

Required tests:

```text
new generation creates WorldIdentity before generated fields attach,
worldId survives save/load,
renaming world does not change worldId,
renaming world does not change identity hash if name is excluded,
same seed can create separate worlds with different worldIds,
forked world records parentWorldId,
micro tile manifest references worldId,
export sidecar includes worldId and seed metadata,
sim branch references worldId,
authored layer references worldId,
diagnostic artifact references worldId,
missing identity blocks export or emits hard failure,
seed is not used as worldId,
filename is not used as worldId.
```

---

## 21. Failure Modes

Planet Identity fails if:

```text
world data has no worldId,
worldSeed is used as worldId,
world name is used as worldId,
renaming a world changes attached data IDs,
micro tiles lack world identity,
exports lack source world identity,
sim branches attach to the wrong world,
authored layers become orphaned,
diagnostics cannot trace artifacts to a world,
external handoffs require guessing,
load silently invents identity without reporting repair,
regeneration silently replaces identity,
identity hash includes mutable UI/display fields.
```

Catastrophic failure:

```text
WorldWright cannot prove which world generated, authored, simulated, saved, exported, or diagnosed data belongs to.
```

---

## 22. Forbidden Shortcuts

```text
Do not use the seed as world identity.
Do not use the world name as world identity.
Do not use the save filename as world identity.
Do not use the current UI session as world identity.
Do not allow micro tiles without a world identity reference.
Do not allow exports without source world identity metadata.
Do not allow sim branches without world identity metadata.
Do not allow authored clay sticker layers without world identity metadata.
Do not silently invent or replace identity during load.
Do not include mutable display fields in identity hash.
Do not treat exported files as canonical identity owners.
```

---

## 23. Definition of Planet Identity Readiness

Planet Identity is blueprint-ready when it defines:

```text
worldId,
worldSeed relationship,
seed architecture relationship,
generator version relationship,
generation profile relationship,
identity schema version,
world schema version,
lineage,
source hashes,
name rules,
save/load rules,
micro tile rules,
Create Mode rules,
Sim Mode rules,
Export rules,
Diagnostics rules,
future tool handoff rules,
fork/import/regeneration behavior,
diagnostics,
tests,
failure modes,
forbidden shortcuts.
```

Implementation is ready only when:

```text
new worlds receive identity before generated fields attach,
identity survives save/load,
exports include identity,
micro tiles include identity,
sim branches include identity,
authored layers include identity,
diagnostics can prove identity coverage,
and seed/name/filename are not used as world identity.
```

---

## 24. Summary Law

```text
Planet Identity is the stable root of a WorldWright world record.

The seed helps birth the world.
The generation profile defines how the seed is interpreted.
The generator creates fields attached to the world.
Create Mode authors against the world.
Sim Mode branches from the world.
Save/Load preserves the world.
Export transforms data from the world.
Diagnostics prove facts about the world.
Future tools receive handoff packages from the world.

All of those must point back to one stable World Identity.
```
