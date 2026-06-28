# WorldWright Blueprint: Generate Mode Planet Identity

Status: draft / generator subsystem blueprint  
Owner: Iron Man  
Purpose: define Planet Identity as the stable birth certificate and source identity layer that connects the generated world to seeds, planet foundation, coordinates, micro tiles, Create layers, Sim branches, Save/Load, Export, diagnostics, and future modular tools.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GENERATOR_CONSTITUTION.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SCOPE_AND_DOMAIN_MAP.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_TO_TERRAIN_CAUSALITY.md
```

---

## 1. Core Law

```text
Planet Identity is the generated world's birth certificate.

It answers:
What world is this?
What generated birth record does it belong to?
What seed/foundation/profile created it?
What coordinate and tile namespace does it own?
What later authored, simulated, saved, exported, diagnosed, or external data may attach to it?
```

Planet Identity is not terrain.

Planet Identity is not a visual name.

Planet Identity is not only a seed.

Planet Identity is the stable root record that lets every later WorldWright system say:

```text
I belong to this world.
I was derived from this generated birth.
I attach to this coordinate/tile namespace.
I can be traced back to this source identity.
```

---

## 2. Interconnection Law

Planet Identity must not be isolated.

It is the first cross-system connector in Generate Mode.

```text
Planet Identity connects:
world seed,
seed manifest,
generation profile,
generator version,
planet foundation,
coordinate contract,
micro tile namespace,
source field hashes,
Create authored layers,
Sim branches,
Save/Load manifests,
Export packages,
Diagnostics artifacts,
Future modular tool handoffs.
```

Every major downstream artifact must carry either:

```text
sourceWorldId
```

or a stronger identity tuple:

```text
sourceWorldId + generatedBirthId + sourceRevisionId + coordinateNamespaceId
```

No exported heightmap, micro tile file, authored layer, Sim branch, diagnostic artifact, or City Maker handoff should exist without a source identity reference.

---

## 3. Planet Identity vs Related Concepts

These must not be confused.

### 3.1 World ID

The World ID identifies the world project.

It persists across authored edits, sim branches, saves, exports, and compatible recomputes.

Example:

```text
worldId: world_01JZ_WORLD_CAELORA
```

### 3.2 Generated Birth ID

The Generated Birth ID identifies the original Generate Mode birth event.

It changes when the user generates a new world rather than editing the existing one.

Example:

```text
generatedBirthId: birth_01JZ_GENERATE_0001
```

### 3.3 Source Revision ID

The Source Revision ID identifies a meaningful revision of canonical world source.

Examples of source revision changes:

```text
initial generation completed,
Create Mode committed authored clay sticker layer,
Sim branch promoted to canon,
schema migration changed source representation,
user explicitly regenerated base world.
```

Example:

```text
sourceRevisionId: rev_01JZ_WORLD_CAELORA_R0003
```

### 3.4 Display Name

The Display Name is user-facing and mutable.

Example:

```text
displayName: Caelora
```

Changing the display name must not change world identity, seed identity, tile identity, save identity, or export traceability.

### 3.5 World Seed

The World Seed is the root deterministic seed for generated birth.

It is part of identity, but it is not the whole identity.

Two worlds could intentionally use the same seed with different profiles, generator versions, or style settings.

Therefore source identity requires:

```text
world seed,
generation profile,
seed architecture version,
generator version,
planet identity,
source revision.
```

### 3.6 Planet Foundation

Planet Foundation defines physical/style premises.

Planet Identity points to Planet Foundation.

Planet Foundation does not replace identity.

### 3.7 Coordinate Namespace

The Coordinate Namespace defines how positions, tiles, local frames, and exports refer to the world.

Planet Identity owns the namespace root.

### 3.8 Save File Name

A save file name is storage/UI metadata.

It must not be the world identity.

### 3.9 Export Package Name

An export package name is output metadata.

It must not be the world identity.

---

## 4. Planet Identity Data Contract

Planet Identity should be represented by a canonical identity object.

```ts
interface PlanetIdentity {
  schemaVersion: string;

  worldId: string;
  generatedBirthId: string;
  sourceRevisionId: string;

  displayName?: string;
  generatedPlaceholderName?: string;

  createdAt: string;
  lastSourceRevisionAt?: string;

  generationProfileId: string;
  generatorVersion: string;
  seedArchitectureVersion: string;
  worldSeed: string;
  seedManifestId: string;

  planetFoundationId: string;
  coordinateNamespaceId: string;
  microTileNamespaceId: string;

  sourceFieldLedgerId?: string;
  diagnosticRunSetId?: string;

  lineage: PlanetIdentityLineage;
  integrity: PlanetIdentityIntegrity;
}
```

### 4.1 Lineage

Lineage records where this world came from.

```ts
interface PlanetIdentityLineage {
  createdBy: 'GENERATE_MODE' | 'IMPORT' | 'TEMPLATE' | 'MIGRATION' | 'DUPLICATE';
  parentWorldId?: string;
  parentSourceRevisionId?: string;
  templateId?: string;
  importedFrom?: string;
  migrationFrom?: string;
  notes?: string;
}
```

### 4.2 Integrity

Integrity records source-trace evidence.

```ts
interface PlanetIdentityIntegrity {
  identityHash: string;
  birthCertificateHash: string;
  seedManifestHash: string;
  planetFoundationHash?: string;
  coordinateContractHash?: string;
  sourceFieldLedgerHash?: string;
  createdWithRepositoryCommit?: string;
  compatibilityStatus:
    | 'CURRENT'
    | 'COMPATIBLE_LEGACY'
    | 'MIGRATION_REQUIRED'
    | 'PARTIAL_COMPATIBILITY'
    | 'LOCKED_LEGACY'
    | 'UNKNOWN';
}
```

---

## 5. World Birth Certificate

Planet Identity should be accompanied by a World Birth Certificate.

The birth certificate is the generated world's traceable origin record.

```ts
interface WorldBirthCertificate {
  worldId: string;
  generatedBirthId: string;
  sourceRevisionId: string;

  worldSeed: string;
  seedArchitectureVersion: string;
  generatorVersion: string;
  generationProfileId: string;

  planetFoundationId: string;
  coordinateNamespaceId: string;
  microTileNamespaceId: string;

  generatedDomains: GeneratedDomainBirthRecord[];
  stageArtifactSetId?: string;
  diagnosticSummaryId?: string;

  createdAt: string;
  birthCertificateHash: string;
}
```

### 5.1 Generated Domain Birth Record

```ts
interface GeneratedDomainBirthRecord {
  domainName: GenerateDomainName;
  stageName?: string;
  sourceClass:
    | 'CANONICAL_GENERATED_SOURCE'
    | 'DERIVED_GENERATED_FIELD'
    | 'DEBUG_FIELD'
    | 'RECOMPUTABLE_CACHE'
    | 'STAGE_ARTIFACT'
    | 'MICRO_TILE_SOURCE'
    | 'SIM_INITIAL_PROXY';
  owner: 'Generate';
  seedStreamsUsed: string[];
  outputHash?: string;
  artifactRef?: string;
  diagnosticVerdict?: 'PASS' | 'WARN' | 'FAIL' | 'NOT_RUN';
}
```

The birth certificate does not need to store every field value directly.

It must store enough source identity to prove what generated the world and what downstream systems are attached to.

---

## 6. Identity Graph

Planet Identity connects the generator graph.

```text
Planet Identity
  -> Seed Manifest
  -> Planet Foundation
  -> Coordinate Namespace
  -> Micro Tile Namespace
  -> Source Field Ledger
  -> Stage Artifacts
  -> Diagnostics
  -> Save Manifest
  -> Export Packages
  -> Create Layers
  -> Sim Branches
  -> Future Tool Handoffs
```

No downstream system should invent its own root identity.

Downstream systems should reference Planet Identity.

---

## 7. Interconnection Contracts

### 7.1 Seed Architecture Connection

Planet Identity stores:

```text
worldSeed,
seedArchitectureVersion,
generatorVersion,
generationProfileId,
seedManifestId,
seedManifestHash.
```

Seed Architecture proves reproducibility.

Planet Identity proves ownership and traceability.

Law:

```text
Seed says how this world can be replayed.
Planet Identity says which world the replay belongs to.
```

### 7.2 Planet Foundation Connection

Planet Identity points to the Planet Foundation.

Planet Foundation defines the world premise:

```text
scale,
style,
geology stack,
climate premise,
sea-level premise,
profile allowances.
```

Planet Identity must know which foundation it was born from.

### 7.3 Coordinate / Grid / Tile Connection

Planet Identity owns the coordinate namespace and micro tile namespace.

A micro tile ID is only globally meaningful when qualified by world identity.

Example:

```text
world_01JZ_WORLD_CAELORA / F2-L8-X103-Y044
```

Rule:

```text
Tile IDs may be locally stable, but exported or saved tile references must include sourceWorldId or coordinateNamespaceId.
```

### 7.4 Generate Field Ledger Connection

Generated fields should reference the source identity.

Examples:

```text
baseHeight belongs to sourceWorldId + sourceRevisionId.
continentality belongs to sourceWorldId + generatedBirthId + fieldOwner Generate.
landWater classification is derived from sourceWorldId + sourceRevisionId + seaLevel.
```

### 7.5 Create Mode Connection

Create Mode authored layers attach to Planet Identity.

A Create layer should store:

```text
sourceWorldId,
baseSourceRevisionId,
coordinateNamespaceId,
authoredLayerId,
createdAt,
requiredGeneratedContextHash if needed.
```

Create Mode must not attach authored clay stickers to a nameless or unstable generated world.

If the base generated world changes, Create layers may need:

```text
revalidation,
conflict review,
reprojection,
manual repair,
or explicit preservation against regenerated source.
```

### 7.6 Sim Mode Connection

Sim branches attach to Planet Identity and a source revision.

A Sim branch should store:

```text
sourceWorldId,
baseSourceRevisionId,
branchId,
branchCreatedAt,
initialSimProxyHash,
branchStateHash.
```

Sim Mode must not run against a world without stable identity.

If generated source changes, Sim branches must be marked:

```text
CURRENT,
STALE,
CONFLICT_REVIEW_REQUIRED,
LEGACY_LOCKED.
```

### 7.7 Save/Load Connection

Save/Load must preserve Planet Identity.

A save manifest should store:

```text
worldId,
generatedBirthId,
sourceRevisionId,
displayName,
seedManifestRef,
planetFoundationRef,
coordinateNamespaceRef,
microTileRegistryRef,
sourceFieldLedgerRef,
createLayerRefs,
simBranchRefs,
exportHistoryRefs,
diagnosticArtifactRefs.
```

Save/Load must not replace identity silently.

### 7.8 Export Connection

Every export package must include source identity.

Required export identity fields:

```text
sourceWorldId,
sourceGeneratedBirthId,
sourceRevisionId,
sourceTileId if tile export,
coordinateNamespaceId,
worldSeed,
generationProfileId,
generatorVersion,
seedArchitectureVersion,
exportProfileId,
exportCreatedAt.
```

Export must not claim source traceability if it lacks source identity.

### 7.9 Diagnostics Connection

Diagnostics must report which world/source revision they evaluated.

Diagnostic artifacts should include:

```text
sourceWorldId,
generatedBirthId,
sourceRevisionId,
seedManifestHash,
planetFoundationHash,
stageArtifactSetId,
diagnosticRunId,
verdict,
createdAt.
```

Diagnostics from one world must never be treated as proof for another world.

### 7.10 Future Tool Connection

Future modular tools, including City Maker or Unreal importers, must receive source identity.

A handoff package should include:

```text
sourceWorldId,
sourceRevisionId,
sourceTileId if local,
sourceStickerId if sticker-based,
coordinateNamespaceId,
scale metadata,
worldSeed,
generatorVersion,
loss report.
```

Future tools must not depend on hidden WorldWright session state.

---

## 8. Identity and Revisions

Planet Identity must separate stable world identity from source revisions.

### 8.1 World ID Persists

The World ID persists when:

```text
the user renames the world,
the user adds clay stickers,
the user creates Sim branches,
the user exports files,
the app rebuilds derived caches,
the app updates debug overlays,
the app migrates compatible schema.
```

### 8.2 Source Revision Changes

The Source Revision ID changes when canonical source changes.

Examples:

```text
initial generated source is committed,
Create Mode commits an authored source layer,
Sim branch is explicitly promoted to canon,
Save/Load migration changes canonical source representation,
user chooses to regenerate source fields,
manual import commits external source data.
```

### 8.3 Generated Birth ID Changes

The Generated Birth ID changes when a new Generate Mode birth replaces the source world rather than editing the existing one.

Examples:

```text
user clicks New World,
user discards current generated world and generates another,
user imports a different generated world,
major seed/profile change creates a new world birth.
```

---

## 9. Name and Lore Rules

World display names and lore names are user-facing.

They are not identity authority.

Generate may create a placeholder name.

The user may rename the world.

Rules:

```text
Renaming does not change worldId.
Renaming does not change seed.
Renaming does not change tile IDs.
Renaming does not invalidate exports by itself.
Generated placeholder names must be marked as generated suggestions, not authored lore.
User-accepted names become authored metadata, not generated terrain authority.
```

---

## 10. Identity in Micro Tile Architecture

A micro tile belongs to a world identity and coordinate namespace.

A tile record should include:

```ts
interface MicroTileIdentityRef {
  sourceWorldId: string;
  generatedBirthId: string;
  sourceRevisionId: string;
  coordinateNamespaceId: string;
  microTileNamespaceId: string;
  tileId: string;
  tileSeedRef?: string;
  macroContextHash?: string;
}
```

Rules:

```text
Tile ID alone is not enough for exported or saved identity.
Tile activation must know which world/source revision it belongs to.
Tile cache must be invalidated if source revision or macro context changes.
Tile export must carry source world and tile identity.
```

---

## 11. Identity in Export Packages

Every export must be traceable.

Example export sidecar identity block:

```json
{
  "sourceWorldId": "world_01JZ_WORLD_CAELORA",
  "sourceGeneratedBirthId": "birth_01JZ_GENERATE_0001",
  "sourceRevisionId": "rev_01JZ_WORLD_CAELORA_R0003",
  "sourceTileId": "F2-L8-X103-Y044",
  "coordinateNamespaceId": "coords_caelora_cube_sphere_v1",
  "worldSeed": "1040037",
  "generationProfileId": "earthlike-default",
  "generatorVersion": "generate-v0.1",
  "seedArchitectureVersion": "generate-seed-architecture-v1",
  "exportProfileId": "unreal-heightmap-2017-r16",
  "exportCreatedAt": "2026-06-28T00:00:00Z"
}
```

Export without identity is a loss of provenance.

---

## 12. Identity Diagnostics

Required diagnostics:

```text
planetIdentityPresent,
worldIdPresent,
generatedBirthIdPresent,
sourceRevisionIdPresent,
seedManifestLinked,
planetFoundationLinked,
coordinateNamespaceLinked,
microTileNamespaceLinked,
sourceFieldLedgerLinked,
identityHashValid,
birthCertificateHashValid,
downstreamIdentityCoverage,
exportIdentityCoverage,
createLayerIdentityCoverage,
simBranchIdentityCoverage,
diagnosticArtifactIdentityCoverage,
futureToolHandoffIdentityCoverage,
identityCollisionCount,
missingSourceReferenceCount,
legacyIdentityCompatibilityStatus.
```

Diagnostics must be able to answer:

```text
Can every major artifact trace back to a world?
Can every micro tile trace back to a coordinate namespace?
Can every export identify its source?
Can every Sim branch identify its base source revision?
Can every Create layer identify the world it authored against?
Can Save/Load round-trip identity without replacement?
```

---

## 13. Tests

Required tests:

```text
new generated world receives stable worldId,
new generated world receives generatedBirthId,
initial generation receives sourceRevisionId,
renaming world does not change worldId,
same seed with different profile produces distinct generated birth identity,
Create layer stores sourceWorldId and baseSourceRevisionId,
Sim branch stores sourceWorldId and baseSourceRevisionId,
Micro tile record stores sourceWorldId and tile namespace,
Export sidecar includes source identity block,
Save/Load preserves PlanetIdentity exactly,
diagnostics artifact includes source identity,
identity hash changes when identity-critical fields change,
identity hash does not change when display name changes if display name is not identity-critical,
legacy/migration status is reported when generator identity versions differ.
```

---

## 14. Failure Modes

Planet Identity fails if:

```text
worlds are identified only by display name,
exports cannot identify their source world,
micro tile IDs collide across worlds,
Create layers attach to unstable or missing base source,
Sim branches cannot identify their starting revision,
Save/Load silently replaces world identity,
seed is treated as the whole identity,
generator version/profile are omitted,
diagnostics from one world are used to prove another world,
external tools receive terrain without source identity,
renaming a world breaks references,
regenerating source fields silently keeps old generatedBirthId when it should create a new birth,
cache/source/artifact identity are confused.
```

Catastrophic failure:

```text
WorldWright cannot prove which generated world an authored layer, sim branch, micro tile, diagnostic artifact, or export package belongs to.
```

---

## 15. Forbidden Shortcuts

```text
Do not use display name as world identity.
Do not use seed alone as world identity.
Do not let tile IDs be globally meaningful without world/namespace qualification.
Do not export terrain without sourceWorldId and sourceRevisionId.
Do not save generated fields without identity references.
Do not attach Create layers to anonymous generated source.
Do not attach Sim branches to anonymous generated source.
Do not let diagnostics run without source identity.
Do not let external tool handoffs depend on hidden session state.
Do not silently replace world identity during migration.
Do not confuse generated birth identity with later source revision identity.
```

---

## 16. Definition of Planet Identity Readiness

Planet Identity is blueprint-ready when it defines:

```text
worldId,
generatedBirthId,
sourceRevisionId,
display name behavior,
lineage,
integrity hashes,
world birth certificate,
seed manifest connection,
planet foundation connection,
coordinate namespace connection,
micro tile namespace connection,
Create layer connection,
Sim branch connection,
Save/Load connection,
Export connection,
Diagnostics connection,
Future tool handoff connection,
identity diagnostics,
tests,
failure modes,
forbidden shortcuts.
```

Implementation is ready when:

```text
every generated world has PlanetIdentity,
every generated world has a WorldBirthCertificate,
every save preserves identity,
every export carries identity,
every micro tile carries source identity,
every Create layer references source identity,
every Sim branch references source identity,
every diagnostic artifact references source identity,
and identity cannot be silently replaced or confused with display name.
```

---

## 17. Summary Law

```text
Planet Identity is the generated world's birth certificate.

Seed tells how the world can be replayed.
Planet Foundation tells what kind of world was born.
Coordinate Namespace tells where things live.
Micro Tile Namespace tells how local detail attaches.
Source Revision tells which version of truth a system depends on.
Planet Identity ties them together.

No authored layer, Sim branch, export, micro tile, diagnostic artifact, save file, or future tool handoff should be trusted unless it can trace back to Planet Identity.
```
