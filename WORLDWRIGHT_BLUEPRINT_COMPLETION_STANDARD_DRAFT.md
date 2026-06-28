# WorldWright Blueprint: Completion Standard Draft

Status: draft / constitution-level blueprint standard  
Owner: Iron Man  
Purpose: define the required level of detail for every WorldWright blueprint phase, mode, system, data contract, diagnostic, and user-facing workflow.

---

## 1. Core Law

```text
A WorldWright blueprint is not complete because a feature is named, described, or implemented.

A blueprint is complete only when it is:
1. defined clearly enough to understand,
2. structured clearly enough to implement,
3. measured clearly enough to test,
4. protected clearly enough to reject fake success, and
5. explained clearly enough that future work does not have to guess.
```

This standard applies to all major WorldWright domains:

```text
Generate Mode
Create Mode
Sim Mode
Export
UI
Save/Load
WorldBrain / Data Model
Diagnostics
Testing
Tooling
Project workflow
```

The Landmass Genesis blueprint is the current example of the expected depth: it defines the thing, the causes, the authority model, the pipeline, the data fields, the diagnostics, the failure cases, the non-goals, and the readiness criteria. This file generalizes that standard to the whole project.

---

## 2. The Three-Layer Blueprint Law

Every WorldWright blueprint must be complete at three layers.

### 2.1 Concept Layer

The Concept Layer defines:

```text
what the system is
why it exists
what world purpose it serves
what user purpose it serves
what it is not
what success should feel like
```

A system fails the Concept Layer if a developer, tester, designer, or future Jarvis cannot explain it without reading implementation code.

### 2.2 Contract Layer

The Contract Layer defines:

```text
who owns the system
what data represents it
what creates it
what may mutate it
what must never mutate it
what downstream systems read it
what lifecycle stage it belongs to
how it persists
how it appears in the UI
```

A system fails the Contract Layer if two systems could plausibly claim ownership of the same truth.

### 2.3 Proof Layer

The Proof Layer defines:

```text
what diagnostics measure it
what artifacts prove it
what tests protect it
what failure looks like
what regressions must never return
what shortcuts are forbidden
what exact conditions qualify as ready
```

A system fails the Proof Layer if it can appear to work while violating the intended world model, user contract, or authority contract.

### 2.4 Five-Question Gate

No feature is blueprint-ready until it can survive these questions:

```text
Can a developer implement it without guessing?
Can a tester prove it works without relying on vibes?
Can diagnostics detect when it fails?
Can a user trust what it does?
Can future WorldWright work build on it without corrupting authority?
```

---

## 3. Universal Blueprint Categories

Every major blueprint section must include the categories below, at project-appropriate depth.

```text
Ontology
Authority
Data Contract
Lifecycle / Pipeline
Mutation Rules
User Contract
Visual / Functional Contract
Interaction Contract
Time Behavior
Diagnostics
Failure Modes
Tests
Artifacts
Forbidden Shortcuts
Definition of Done
```

If a category does not apply, the blueprint must say why. Silence is not enough.

---

## 4. Ontology Standard

Every blueprint must define what the thing is.

### Required Detail

Each system must define:

```text
plain-language definition
technical/data definition
world-system role
user-facing role
what it is not
related concepts that must not be confused with it
```

### Examples

Generate Mode must define:

```text
world birth
seed
planet foundation
generated canonical data
derived generated data
debug fields
stage artifacts
```

Create Mode must define:

```text
clay sticker
sticker template
sticker instance
sticker geometry
sticker effect
sticker layer
draft sticker
committed sticker
locked sticker
authored world object
```

Sim Mode must define:

```text
canon
branch
timeline
tick
event
cause
effect
delta
promotion
rollback
```

Export must define:

```text
export profile
target format
field mapping
coordinate mapping
fidelity level
loss report
external artifact
```

UI must define:

```text
active mode
active tool
selection
preview
commit
cancel
inspector
danger state
error state
```

Save/Load must define:

```text
save file
schema version
canonical fields
derived fields
migration
repair
checksum
round trip
```

### Completion Rule

```text
A blueprint section fails ontology completion if important words are used before they are defined.
```

---

## 5. Authority Standard

Every blueprint must define ownership.

### Required Detail

Each system must answer:

```text
Who owns this truth?
Who may create it?
Who may mutate it?
Who may derive from it?
Who may read it only?
Who may delete it?
Who may serialize it?
Who may display it?
Who may never touch it?
```

### Global Authority Model

```text
Generate Mode owns initial world birth.
Create Mode owns user-authored clay stickers and edit layers.
Sim Mode owns timeline branches and branch-local deltas.
Recompute owns derived fields.
Renderer reads only.
Export reads and transforms only.
Save/Load persists, restores, migrates, and validates.
UI commands actions and displays state, but does not secretly own world truth.
```

### Authority Principles

```text
IDs explain; they do not directly create visible truth.
Derived fields can be recomputed; canonical fields must be protected.
User-authored clay stickers are world causes, not throwaway UI state.
Simulation branches must not silently change canon.
Export must not mutate the source world.
Save/Load must not invent unrecorded canonical truth.
```

### Completion Rule

```text
A blueprint section fails authority completion if a later system can silently overwrite an earlier system's owned truth.
```

---

## 6. Data Contract Standard

Every blueprint must define the data that represents the system.

### Required Detail

Each system must define:

```text
canonical fields
derived fields
debug fields
transient UI fields
serialized fields
branch-local fields
computed/cache fields
field types
field ranges
field units
field ownership
field invalidation rules
schema behavior
```

### Suggested Field Contract Shape

```ts
interface BlueprintFieldContract {
  fieldName: string;
  owner: 'Generate' | 'Create' | 'Sim' | 'Recompute' | 'UI' | 'SaveLoad' | 'Export';
  type: string;
  range?: string;
  unit?: string;
  canonical: boolean;
  derived: boolean;
  serialized: boolean;
  branchLocal: boolean;
  invalidatedBy: string[];
  recomputedBy?: string;
  diagnostics?: string[];
}
```

### Phase Examples

Generate data examples:

```text
baseHeight
seaLevel
plateId
continentId
continentality
crustType
landRole
coastType
biomePotential
riverBasinId
```

Create data examples:

```text
clayStickerId
clayStickerTemplateId
stickerGeometry
stickerEffect
stickerLayer
editHeightDelta
authoredRegionId
lockedSticker
stickerRelationship
```

Sim data examples:

```text
branchId
tickIndex
eventId
eventCause
eventEffect
simHeightDelta
simStateDelta
canonPromotionStatus
```

Export data examples:

```text
exportProfileId
targetFormat
includedLayers
coordinateSystem
fidelityLevel
lossReport
formatVersion
```

Save/Load data examples:

```text
saveVersion
worldId
seed
canonicalWorldState
createLayers
simBranches
schemaMigrationHistory
checksum
```

UI data examples:

```text
activeMode
activeTool
selectedObjectId
hoverCell
previewDelta
pendingAction
dangerConfirmationState
inspectorState
```

### Completion Rule

```text
A blueprint section fails data completion if important behavior depends on unnamed or undocumented state.
```

---

## 7. Lifecycle and Pipeline Standard

Every blueprint must define when the thing happens.

### Required Detail

Each system must define:

```text
before state
input fields
process order
output fields
derived fields invalidated
downstream systems triggered
when it may rerun
when it may not rerun
how it behaves after user authorship
how it behaves inside simulation branches
how it behaves during save/load
how it behaves during export
```

### Generate Lifecycle

```text
parameters selected
seed streams initialized
planet foundation created
world systems generated in causal order
derived fields recomputed
diagnostics emitted
artifacts generated
world becomes editable
```

### Create Lifecycle

```text
sticker template selected
draft sticker placed
geometry shaped
rules/effects configured
preview recomputed
user commits or cancels
committed sticker becomes selectable and inspectable
derived fields recompute around the sticker
save state records authored object
```

### Sim Lifecycle

```text
branch created or selected
canon + authored layers read as baseline
sim tick applies causal rules
events produce branch-local effects
derived fields recompute within branch
user inspects branch differences
user discards, continues, or explicitly promotes changes
```

### Export Lifecycle

```text
profile selected
required fields validated
WorldWright fields mapped to target format
loss/approximation report produced
artifact written
source world remains unchanged
```

### Save/Load Lifecycle

```text
canonical fields collected
authored layers collected
sim branches collected
schema version recorded
checksums recorded
load validates schema
migrations run if needed
derived caches rebuild if needed
repairs/losses are reported
```

### Completion Rule

```text
A blueprint section fails lifecycle completion if it cannot be placed in the project pipeline without guesswork.
```

---

## 8. Mutation Standard

Every blueprint must define what can change, when, and by whom.

### Required Detail

Each system must define:

```text
allowed mutations
forbidden mutations
temporary mutations
preview-only mutations
committed mutations
undoable mutations
destructive mutations
branch-only mutations
canon mutations
migration mutations
export transformations
```

### Mutation Classes

```text
READ_ONLY
DERIVED_RECOMPUTE
PREVIEW_ONLY
USER_AUTHORED_DELTA
SIM_BRANCH_DELTA
CANONICAL_GENERATION
CANONICAL_PROMOTION
SCHEMA_MIGRATION
EXPORT_TRANSFORM
```

### Phase Rules

Generate Mode:

```text
May create base generated fields during initial world creation.
Must not overwrite Create Mode authored data.
Must not overwrite Sim Mode branch data.
```

Create Mode:

```text
May create and modify clay stickers.
May write authored edit layers.
May request derived recompute.
Must not secretly rewrite generated base truth.
```

Sim Mode:

```text
May write branch-local deltas.
May create branch-local events.
May promote changes only through explicit promotion.
Must not silently mutate canon.
```

Export:

```text
May transform data into external formats.
Must not mutate the source world.
Must report unsupported or approximated data.
```

Save/Load:

```text
May migrate schema with recorded migration steps.
May rebuild derived caches.
Must not regenerate missing canonical data as if it had always existed.
```

UI:

```text
May preview pending actions.
May request committed actions.
Must not commit hidden changes outside an explicit user action.
```

### Completion Rule

```text
A blueprint section fails mutation completion if preview, derived recompute, branch change, and canon change can be confused.
```

---

## 9. User Contract Standard

Every blueprint must define what the user is promised.

### Required Detail

Each system must define:

```text
what the user sees
what the user controls
what persists
what is reversible
what is destructive
what needs confirmation
what is previewed
what is committed
what is hidden but inspectable
what errors must be shown
```

### Generate User Contract

```text
The same seed and settings produce the same world.
Randomness is constrained by cause.
The generated world is coherent enough to author against.
Diagnostics and artifacts honestly reveal failures.
```

### Create User Contract

```text
The user authors clay stickers, not surface marks.
Clay stickers are selectable, inspectable, and saved.
Previewed sticker effects must match committed behavior.
Authored objects must not be erased by routine recompute.
The user can intentionally override generated suggestions.
```

### Sim User Contract

```text
Canon is safe unless the user explicitly promotes a branch.
Timeline changes have causes.
Branch differences are inspectable.
Unwanted futures can be rejected.
```

### Export User Contract

```text
The export tells the truth about included data.
Lossy exports report loss.
The source world remains unchanged.
The target artifact validates against its intended format.
```

### Save/Load User Contract

```text
A saved world remains the same world when loaded.
Old saves migrate safely.
Authored work is protected.
Branch state is preserved.
Missing or corrupt data is reported.
```

### UI User Contract

```text
The user knows what mode is active.
The user knows what object is selected.
The user knows what will happen before committing.
Dangerous actions are clearly gated.
Errors are visible and actionable.
```

### Completion Rule

```text
A blueprint section fails user-contract completion if the user could reasonably feel betrayed by correct implementation.
```

---

## 10. Visual and Functional Contract Standard

Every blueprint must define what success looks like and does.

### Required Detail

Each system must define:

```text
expected visible behavior
expected functional behavior
expected edge cases
expected degraded behavior
expected artifact/output
expected inspector/debug view
expected user feedback
```

### Generate Examples

```text
Land has hierarchy.
Coasts are process-shaped.
Mountains align with causes.
Rivers form logical basins.
Oceans have depth structure.
Biomes follow climate logic.
```

### Create Examples

```text
Clay stickers have visible boundaries and handles.
Sticker previews distinguish draft from committed state.
Sticker effects are inspectable.
Sticker conflicts are explainable.
Locked stickers remain stable.
```

### Sim Examples

```text
Timeline changes are visible.
Events have causes.
Branch differences can be compared.
Slow changes do not appear as random jumps.
Fast disasters have local cause/effect.
```

### Export Examples

```text
Output matches selected profile.
Layer names and metadata are clear.
Unsupported fields are reported.
Target schema validates.
```

### UI Examples

```text
Mode state is obvious.
Selected object is obvious.
Draft state differs from committed state.
Danger state is visible.
Recovery path is clear.
```

### Completion Rule

```text
A blueprint section fails visual/functional completion if nobody can say what good looks like.
```

---

## 11. Interaction Contract Standard

Every blueprint must define what other systems it affects.

### Required Detail

Each system must define:

```text
upstream dependencies
downstream dependencies
fields consumed
fields produced
fields invalidated
mode interactions
Create/Sim conflict behavior
Save/Load behavior
Export behavior
UI inspector behavior
diagnostics behavior
```

### Examples

Land affects:

```text
climate
biomes
hydrology
settlements
borders
resources
travel
erosion
export maps
UI selection
simulation disasters
```

Clay stickers affect:

```text
authored layers
recompute
selection
inspector state
save files
sim branch baseline
export output
diagnostics
```

Hydrology affects:

```text
terrain response
biomes
settlements
floods
deltas
wetlands
trade routes
political borders
```

Sim affects:

```text
branch view
timeline UI
derived fields
event logs
save files
canon promotion
```

Export affects:

```text
external tools
data fidelity
field mapping
round-trip expectations
loss reports
```

### Completion Rule

```text
A blueprint section fails interaction completion if downstream systems must reverse-engineer what to read.
```

---

## 12. Time Behavior Standard

Every blueprint must define how it changes over time, even if the answer is stable.

### Required Detail

Each system must define:

```text
static behavior
short-term behavior
long-term behavior
branch behavior
canon behavior
user-authored behavior
migration behavior
export-time behavior
```

### Generate

```text
Generated birth data is stable after creation unless explicitly regenerated.
Derived data may be recomputed.
Long-timescale systems require Sim Mode or branch behavior.
```

### Create

```text
Clay stickers are authored facts unless given explicit simulation behavior.
Some stickers may be stable.
Some stickers may be sim-reactive.
Some stickers may be branch-local.
Some stickers may be protected from simulation.
```

### Sim

```text
Every sim change declares a timescale.
Every event declares a cause.
Every branch isolates changes.
Every canon promotion is explicit.
```

### Export

```text
Export may represent canon, a branch, or a comparison.
Export must state which time state it represents.
Export must not advance time.
```

### Save/Load

```text
Save preserves current time index.
Save preserves branches.
Save preserves event history where required.
Load must not advance simulation accidentally.
```

### Completion Rule

```text
A blueprint section fails time completion if Sim Mode cannot know whether it may change the system.
```

---

## 13. Diagnostics Standard

Every blueprint must define how success is measured.

### Required Detail

Each diagnostic must define:

```text
metric name
metric purpose
expected range
warning threshold
failure threshold
stage measured
artifact emitted
seeds/scenarios tested
visual or functional correlation
regression protected
```

### Suggested Diagnostic Shape

```ts
interface BlueprintDiagnostic {
  name: string;
  system: string;
  stage: string;
  purpose: string;
  expectedRange?: string;
  warningThreshold?: string;
  failureThreshold?: string;
  artifact?: string;
  correlation: string;
  protectsAgainst: string[];
}
```

### Generate Diagnostics

```text
landFraction
coastlineComplexity
landHeightStdDev
riverBasinQuality
mountainBeltContinuity
openOceanContinentGhostShare
oceanDepthStdDev
biomeDiversity
```

### Create Diagnostics

```text
stickerLayerIsolation
stickerPreviewAccuracy
stickerCommitIntegrity
stickerSelectionAccuracy
stickerConflictDetection
stickerPersistence
destructiveActionGateCoverage
```

### Sim Diagnostics

```text
branchIsolation
tickDeterminism
eventCauseCoverage
canonLeakCount
deltaGrowthRate
promotionDiffIntegrity
```

### Export Diagnostics

```text
schemaValidity
missingFieldCount
lossReportCompleteness
coordinateMappingAccuracy
roundTripFidelity
targetCompatibility
```

### Save/Load Diagnostics

```text
saveLoadRoundTripEquality
schemaMigrationSuccess
corruptionDetection
derivedCacheRebuildIntegrity
branchPersistenceIntegrity
authoredStickerPersistence
```

### UI Diagnostics

```text
modeStateVisibility
toolPreviewAccuracy
dangerousActionGateCoverage
errorRecoverability
latencyBudget
accessibilityReadability
```

### Completion Rule

```text
A blueprint section fails diagnostics completion if it has no measurable way to prove success or detect regression.
```

---

## 14. Failure Mode Standard

Every blueprint must define what wrong looks like.

### Required Detail

Each system must define:

```text
visible failures
functional failures
authority failures
data failures
user-trust failures
persistence failures
performance failures
regression examples
```

### Generate Failures

```text
mask-like land
flat continents
round submerged ghosts
rivers without basins
mountains unrelated to tectonics
oceans with no bathymetric structure
biomes assigned without climate logic
```

### Create Failures

```text
sticker preview differs from committed result
sticker modifies base truth secretly
locked sticker changes unexpectedly
authored sticker disappears after recompute
sticker conflict is hidden
sticker cannot be inspected
```

### Sim Failures

```text
canon changes during preview
branch leaks into main world
events occur without cause
tick result is non-deterministic
promotion overwrites authored work unexpectedly
```

### Export Failures

```text
source world mutates
fields disappear silently
coordinates shift
target file invalid
lossy export claims full fidelity
```

### Save/Load Failures

```text
loaded world differs from saved world
old save cannot migrate
authored stickers vanish
sim branches vanish
derived cache becomes mistaken for canon
```

### UI Failures

```text
mode is unclear
dangerous action looks safe
selection is ambiguous
error has no recovery
draft state looks committed
```

### Completion Rule

```text
A blueprint section fails failure-mode completion if it defines success but not betrayal cases.
```

---

## 15. Test Standard

Every blueprint must define what tests protect it.

### Required Detail

Each system must define:

```text
unit tests
integration tests
snapshot tests
round-trip tests
regression tests
property/determinism tests
authority tests
migration tests
failure-case tests
artifact review tests
```

### Generate Tests

```text
same seed produces same world
land roles classify correctly
ghost share remains under threshold
coastline complexity is within range
rivers drain logically
mountains correlate with process fields
```

### Create Tests

```text
sticker writes only authored layer
sticker preview matches commit
sticker selection is stable
locked sticker resists unauthorized mutation
sticker survives recompute
sticker survives save/load
```

### Sim Tests

```text
branch does not mutate canon
tick is deterministic
event cause exists
promotion diff is explicit
discard removes branch deltas
```

### Export Tests

```text
valid output schema
source unchanged after export
known world exports expected layers
loss report generated for unsupported fields
coordinate transform round-trips
```

### Save/Load Tests

```text
save/load equality
old schema migration
missing derived cache rebuild
branch persistence
sticker persistence
corruption detection
checksum validation
```

### UI Tests

```text
mode switch visible
danger confirmation appears
tool preview renders
selection state visible
error state visible
```

### Completion Rule

```text
A blueprint section fails test completion if there is no regression test for its most dangerous failure mode.
```

---

## 16. Artifact Standard

Every blueprint must define what evidence is produced.

### Required Detail

Each system must define:

```text
human-visible artifacts
machine-readable artifacts
debug artifacts
comparison artifacts
failure artifacts
historical artifacts
```

### Generate Artifacts

```text
full-globe snapshots
stage diagnostics JSON
seed comparison images
debug overlays
before/after visual diffs
```

### Create Artifacts

```text
sticker diff
sticker inspector snapshot
before/after region preview
authored-layer inspection
conflict report
```

### Sim Artifacts

```text
timeline log
branch diff
event graph
tick diagnostics
canon promotion report
```

### Export Artifacts

```text
exported file
validation report
loss report
field mapping report
```

### Save/Load Artifacts

```text
save manifest
schema version report
migration log
checksum report
round-trip comparison
```

### UI Artifacts

```text
mode screenshots
tool-state snapshots
interaction logs for tests
error-state screenshots
```

### Completion Rule

```text
A blueprint section fails artifact completion if success cannot be inspected after the fact.
```

---

## 17. Forbidden Shortcut Standard

Every blueprint must define what fake fixes are banned.

### Required Detail

Each system must define:

```text
forbidden visual tricks
forbidden ownership violations
forbidden cleanup hacks
forbidden silent fallbacks
forbidden data loss
forbidden user-trust shortcuts
forbidden performance shortcuts
forbidden test weakening
```

### Generate Forbidden Shortcuts

```text
Do not fake terrain quality with renderer-only styling.
Do not solve bad land with global smoothing alone.
Do not use IDs as direct visible authority.
Do not weaken diagnostics because artifacts fail.
```

### Create Forbidden Shortcuts

```text
Do not model Create Mode as surface coloring.
Do not make authored stickers hidden destructive terrain mutation.
Do not make undo approximate.
Do not let routine recompute erase authored stickers.
Do not make sticker effects impossible to inspect.
```

### Sim Forbidden Shortcuts

```text
Do not fake simulation by directly editing canon.
Do not create events without causes.
Do not hide branch/canon differences.
```

### Export Forbidden Shortcuts

```text
Do not silently drop unsupported fields.
Do not claim lossless export when the operation is lossy.
Do not mutate the source world.
```

### Save/Load Forbidden Shortcuts

```text
Do not regenerate missing canon data silently.
Do not erase old fields during migration without report.
Do not treat derived caches as authoritative truth.
```

### UI Forbidden Shortcuts

```text
Do not hide dangerous mode state.
Do not make draft state indistinguishable from committed result.
Do not bury critical warnings.
```

### Completion Rule

```text
A blueprint section fails forbidden-shortcut completion if a cheap hack could pass tests while violating the intended system.
```

---

## 18. Definition of Done Standard

Every blueprint must define what complete means.

### Required Detail

Each blueprint needs three definitions of done:

```text
Blueprint Done
Implementation Done
Readiness Done
```

### Blueprint Done

```text
The system is defined.
Authority is clear.
Fields are named.
Pipeline is ordered.
Failure modes are known.
Tests are specified.
Artifacts are defined.
Forbidden shortcuts are explicit.
```

### Implementation Done

```text
Code follows authority rules.
Data contracts exist.
Pipeline integration exists.
Tests pass.
Diagnostics output exists.
Artifacts are generated.
No forbidden shortcuts are used.
```

### Readiness Done

```text
Visible or functional output meets target.
Diagnostics support the result.
Regression tests protect the result.
User contract is not violated.
Save/load/export behavior is safe.
Future developers can audit it.
```

### Completion Rule

```text
A blueprint section fails definition-of-done completion if done means only implemented or tests passed.
```

---

## 19. Create Mode: Clay Sticker Doctrine

This section records the agreed Create Mode model.

### 19.1 Core Law

```text
Create Mode does not alter the world through surface coloring.

Create Mode authors clay stickers: selectable, shaped, semantic world pieces that modify or guide the world through non-destructive authored layers.
```

Even shorter:

```text
Clay stickers are authored causes, not cosmetic marks.
```

### 19.2 What a Clay Sticker Is

```text
A clay sticker is a placed authored world object with geometry, meaning, rules, consequences, and persistence.
```

A clay sticker has two identities:

```text
Geometry:
Where is it?
What shape is it?
How large is it?
How does it blend with or influence nearby world form?
What area does it affect?

Meaning:
What is this thing?
What world systems care about it?
What does it do to terrain, water, climate, biome, civilization, culture, history, or simulation?
Is it natural, built, cultural, political, magical, ruined, protected, or dangerous?
```

### 19.3 Authoring a Sticker

Authoring a sticker means:

```text
choose what kind of world thing it is
place it on the world
shape its geometry
define its world meaning/effects
preview its consequences
commit it as an authored object the world systems respect
```

Users author stickers through:

```text
points
paths
outlines
control handles
size controls
strength controls
age/style controls
relationship settings
lock/protection settings
commit/cancel actions
inspectors
```

### 19.4 Sticker Templates and Instances

```text
ClayStickerTemplate defines a reusable kind of authored thing.
ClayStickerInstance is the actual placed, named, world-specific object.
```

Template examples:

```text
mountain range
valley
river course
lake basin
island
coastline reshaper
city footprint
road or trade route
forest region
kingdom or culture territory
ruin
landmark
volcano
mine
sacred site
```

Instance examples:

```text
Ashcrown Range
River Elen
Lake Durn
Kingdom of Vaelor
Old North Road
The Broken Spire
```

### 19.5 Sticker Geometry Types

```ts
type StickerGeometry =
  | PointStickerGeometry
  | PathStickerGeometry
  | RegionStickerGeometry
  | VolumeStickerGeometry
  | NetworkStickerGeometry;
```

Examples:

```text
Point:
city, ruin, volcano, sacred site, mine, landmark

Path:
river, road, mountain chain, fault, wall, border segment

Region:
forest, kingdom, desert, wetland, protected zone, danger zone

Volume:
mountain mass, plateau, basin, crater, raised island

Network:
road system, river network, trade routes, cultural influence web
```

### 19.6 Sticker Effects

```ts
interface StickerEffects {
  terrain?: TerrainStickerEffect;
  hydrology?: HydrologyStickerEffect;
  climate?: ClimateStickerEffect;
  biome?: BiomeStickerEffect;
  civilization?: CivilizationStickerEffect;
  culture?: CultureStickerEffect;
  history?: HistoryStickerEffect;
  simulation?: SimulationStickerEffect;
  visual?: VisualStickerEffect;
}
```

A sticker may be visible, but visual appearance is not its whole purpose. Its primary purpose is authored world meaning.

### 19.7 Sticker Authority

```text
Generated world = natural/canonical world body.
Create Mode = user-authored clay stickers and authored layers.
Recompute = derived systems react to stickers.
Renderer = displays current world state.
Save/Load = preserves stickers.
Sim = may react to stickers under explicit rules, but must not secretly erase them.
Export = includes stickers and/or their derived effects according to profile.
```

### 19.8 Sticker Lifecycle

```text
template selected
draft sticker placed
geometry shaped
rules/effects configured
preview recomputed
user commits or cancels
committed sticker becomes selectable/editable
save/load preserves it
sim reacts if allowed
export includes it according to profile
```

Draft sticker:

```text
temporary
preview-only
movable
cancelable
not permanent world truth
```

Committed sticker:

```text
saved
selectable
inspectable
participates in recompute
affects derived systems
can be locked
can be edited or removed according to rules
```

### 19.9 Sticker Inspector

Every committed sticker should be inspectable.

Inspector should show:

```text
name
type
layer
geometry
world effects
affected systems
conflicts
dependencies
simulation behavior
export behavior
save status
lock status
```

Example:

```text
Sticker: Ashcrown Range
Type: Mountain Range
Layer: Authored Terrain
Affects:
  terrain height
  river divides
  climate rain shadow
  alpine biome potential
  travel difficulty
Simulation behavior:
  stable over human timescales
Export:
  included as terrain plus named feature
```

### 19.10 Sticker Conflict Rules

Stickers must not stack blindly. They negotiate through world rules.

Examples:

```text
mountain range + river:
river may carve a pass/canyon or reroute around the range

city + floodplain:
warning: flood risk; user may keep it intentionally

kingdom + ocean:
invalid unless maritime claim, island realm, or seafaring domain

lake basin + desert:
may become salt lake, dry basin, wetland remnant, or seasonal lake

road + mountain:
creates pass, tunnel, switchback cost, or impassable warning
```

### 19.11 Sticker Interaction Modes

A clay sticker can:

```text
override
guide
add
suppress
protect
annotate
transform
```

Examples:

```text
Override:
This region is definitely a kingdom.

Guide:
Make the river prefer this course while respecting terrain.

Add:
Place this city here.

Suppress:
No major settlements in this cursed valley.

Protect:
Do not let routine recompute erase this island.

Annotate:
This is sacred ground; no physical effect required.

Transform:
Raise this land into a plateau.
```

### 19.12 Create Mode Completion Checklist

Create Mode is not blueprint-complete until it defines:

```text
clay sticker ontology
sticker templates
sticker instances
sticker geometry types
sticker effects
sticker authority
sticker layers
sticker lifecycle
draft/preview/commit rules
sticker conflict rules
sticker recompute behavior
sticker save/load behavior
sticker simulation behavior
sticker export behavior
sticker UI/inspector behavior
sticker diagnostics
sticker failure modes
forbidden shortcuts
```

### 19.13 Create Mode Forbidden Shortcuts

```text
Do not model Create Mode as surface coloring.
Do not treat authored regions as mere color masks.
Do not let clay stickers become hidden destructive terrain mutation.
Do not allow routine recompute to erase authored stickers.
Do not hide sticker conflicts.
Do not make sticker effects impossible to inspect.
```

---

## 20. Phase Completion Matrix

Each phase must eventually receive its own detailed blueprint that satisfies this standard.

### Generate Mode

Must define:

```text
world causes
generated fields
pipeline order
diagnostics
artifacts
failure modes
seed stability
visual readiness
non-goals
```

### Create Mode

Must define:

```text
clay sticker system
authored layers
sticker lifecycle
selection/inspector behavior
conflicts
recompute behavior
save/load behavior
simulation behavior
export behavior
diagnostics
```

### Sim Mode

Must define:

```text
branch model
time scales
tick ownership
event causality
branch-local deltas
canon promotion
rollback
authored-object interaction
determinism
diagnostics
```

### Export

Must define:

```text
target formats
field mapping
coordinate mapping
fidelity levels
loss reporting
validation
round-trip expectations
source-world immutability
```

### UI

Must define:

```text
mode clarity
tool state
selection feedback
preview behavior
commit/cancel behavior
danger warnings
accessibility
latency budget
empty states
error states
```

### Save/Load

Must define:

```text
schema version
canonical fields
derived fields
authored clay stickers
sim branches
migration rules
corruption handling
round-trip guarantees
backward compatibility
```

### WorldBrain / Data Model

Must define:

```text
canonical truth
derived truth
branch-local truth
authored truth
debug truth
serialization contracts
field ownership
schema migration
query model
inspector model
```

### Diagnostics and Testing

Must define:

```text
required diagnostics
stage artifacts
snapshot artifacts
regression thresholds
seed sets
scenario sets
authority tests
round-trip tests
artifact review workflow
```

---

## 21. Readiness Language

Use these labels consistently.

```text
Concept Draft:
The idea is named and roughly described.

Blueprint Draft:
The system has major categories, but gaps remain.

Blueprint Complete:
The system satisfies the Concept, Contract, and Proof layers.

Implementation Scaffold:
Code exists but may not meet readiness.

Implementation Complete:
Code follows the blueprint and tests pass.

Blueprint Ready:
Implementation, diagnostics, artifacts, and user contract all support the intended result.

Not Blueprint Ready:
Any visual, functional, authority, diagnostic, persistence, or user-trust failure remains unresolved.
```

Passing tests alone does not equal blueprint readiness.

---

## 22. Summary Law

```text
Every WorldWright blueprint must be detailed enough that future work can implement it, audit it, test it, diagnose it, preserve it, export it, simulate it, and reject fake success.
```

WorldWright is not a pile of features. It is a world-authoring and simulation system. Every part must have enough detail to protect that purpose.
