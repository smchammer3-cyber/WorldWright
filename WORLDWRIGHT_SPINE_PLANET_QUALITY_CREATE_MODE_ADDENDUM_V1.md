# WORLDWRIGHT — SPINE, PLANET QUALITY, AND CREATE MODE ADDENDUM V1

Status: Proposed implementation contract / blueprint addendum  
Owner: Iron Man  
Purpose: Make the Master Blueprint more actionable for Codex, define planet quality thresholds, and clarify how Create Mode should work after the World Spine is repaired.

## 0. Direct Answer: How Create Mode Works After the Spine
Create Mode should build on the World Spine. It must not become a second world engine, a second source of truth, or a separate “editor world.”

The World Spine defines what the planet is. Create Mode defines how the user changes that planet safely.

Generate Mode should create believable worlds by default. Create Mode should allow the user to preserve believability through World-Rules tools or intentionally break believability through explicit Manual Override tools.

Therefore: Generate Mode should not generate nonsense by default. Create Mode may let people make impossible, fantasy, stylized, or story-driven changes after generation, but those changes must be tagged as overrides so the engine does not erase them or confuse them with natural results.

| Mode | Primary Job | Believability Rule | What It Must Not Do |
|---|---|---|---|
| Generate | Create initial planet from physical causes | Must pass quality thresholds by default | Randomly paint results without causal logic |
| Create | Let user edit canon safely | World-Rules tools preserve plausibility; Override tools may break it intentionally | Mutate base data directly or create a hidden second world |
| Sim | Run history on branches | May evolve worlds, but only inside branches unless promoted | Silently mutate canon |
| Render/Export | Show and translate WorldBrain | Must read validated world data | Own or rewrite world logic |

## 1. Codex Compliance Checklist
- There is exactly one canonical World type.
- WorldBrain is the single source of truth for terrain, climate, hydrology, biomes, countries, cultures, cities, rivers, stickers, metadata, and exportable data.
- The live world is owned only by worldSession.
- No React component owns canonical world data.
- No renderer mutates world data.
- Generate Mode calls worldGenerator through worldSession.
- Create Mode emits EditActions and never mutates world arrays directly.
- Sim Mode operates on branch snapshots, not canon.
- Exports only read validated World objects.
- baseHeight is never modified after generation.
- editHeightDelta is the only terrain layer changed by Create Mode terrain tools.
- simHeightDelta is only used inside Sim branches.
- Schema version changes require migration or explicit incompatibility.

## 2. Forbidden Architecture Patterns
- useState<World>() inside mode components for canonical world ownership.
- Separate MapWorld, GlobeWorld, SimWorld, or EditorWorld models that diverge from WorldBrain.
- Renderer functions that write to world.cells, world.countries, world.rivers, or other canonical data.
- Create Mode UI directly mutating world.cells, countries, cities, cultures, or rivers.
- Sim ticks modifying canonWorld instead of a branch world.
- Export code rebuilding world data from rendered meshes instead of reading validated WorldBrain.
- Climate, hydrology, biome, or tectonic rules inside React components.
- Save/load code silently changing schema without migration.
- Manual overrides stored only as visual state rather than tagged WorldBrain data.

## 3. Minimum Viable Spine
1. Create a valid World object.
2. Generate baseHeight for every cell.
3. Store editHeightDelta separately from baseHeight.
4. Render the world from WorldBrain only.
5. Apply at least one terrain EditAction through worldSession -> worldEditor.
6. Validate the world with validateWorld(world).
7. Save and reload without data loss.
8. Export debug JSON from the same World object used by rendering and editing.
9. Prove through tests that baseHeight remains unchanged after Create Mode edits.

## 4. Planet Quality Standard
WorldWright planets must be generated from coherent causes, not arbitrary surface results. Randomize causes, validate effects.

| Layer | What Codex/Tests Should Check | Human Review Role |
|---|---|---|
| Raw data correctness | Cell counts, required fields, schema validity, no undefined layers | Minimal |
| Physical logic | Tectonics -> terrain -> climate -> hydrology -> biomes dependencies | Moderate |
| Visual readability | Preview images: height, land/water, rainfall, rivers, biomes | Important |
| Aesthetic quality | Does the map feel inspiring and readable? | Critical |
| Creative usefulness | Does it create story, exploration, and editing potential? | Critical |

## 5. Planet Acceptance Thresholds

## 6. Planet Identity and Archetypes
Every generated planet should have at least one dominant global identity, at least two regional surprises, and zero unexplained physical contradictions.

## 7. Canonical Generation Pipeline
1. `createGrid()`
2. `generateTectonicPlates()`
3. `classifyPlateBoundaries()`
4. `generateBaseTerrain()`
5. `applyOceanCoverageAndSeaLevel()`
6. `computeTemperature()`
7. `computeWindAndMoisture()`
8. `computeRainfall()`
9. `computeHydrology()`
10. `buildRiverPolylines()`
11. `assignBiomes()`
12. `generateCountries()`
13. `generateCultures()`
14. `placeCities()`
15. `validateWorld()`
No later system may run before its required inputs exist. Derived layers must be marked stale when their causes change.

## 8. Create Mode Contract
Create Mode is not responsible for inventing a separate planet model. It is responsible for safely editing the canonical WorldBrain through worldSession and worldEditor.

Create Mode has two editing lanes:
- World-Rules Lane: The editor helps the user make plausible changes by recalculating or nudging related systems while warning about improbable edits.
- Manual Override Lane: The editor allows the user to intentionally break realism, but tags the affected data so future recalculations and exports understand it is authored, not naturally generated.

## 9. Definition of Done: Create Mode
- All Create Mode tools emit typed EditActions.
- EditActions are applied only through worldSession -> worldEditor.
- Undo/redo works at meaningful action-group level, such as one brush stroke or one sticker placement.
- No Create Mode component directly mutates WorldBrain arrays.
- Every edit either updates derived layers immediately or marks them stale with clear UI feedback.
- World-Rules tools preserve plausibility where practical.
- Override tools preserve user intent and prevent automatic recalculation from erasing authored regions.
- Renderer updates from the changed WorldBrain and does not become the source of truth.
- Save/reload preserves all edits, stale flags, and override metadata.
- Validation can distinguish generated natural results from manual overrides.

## 10. Required Spine and Create Mode Tests
- Generated world has gridWidth x gridHeight cells.
- Every cell has baseHeight after generation.
- baseHeight does not change after terrain edits.
- Terrain edits change editHeightDelta only.
- Rendered height equals baseHeight + editHeightDelta in Create Mode.
- Rendered height equals baseHeight + editHeightDelta + simHeightDelta in Sim Mode.
- Rivers do not flow uphill unless tagged override.
- Cities cannot be placed on water unless explicitly allowed by a future special rule.
- Renderer can render a world without mutating it.
- Export reads the same validated World object used by render and sim.
- Sim tick does not mutate canonical world.
- Manual overrides survive save/load and local recalculation.

## 11. Required Debug Previews
- heightmap preview
- land/water mask
- plate map
- uplift/boundary map
- temperature map
- rainfall map
- flow accumulation map
- river polyline overlay
- biome map
- country map
- culture map
- combined globe/map screenshot
Codex can help evaluate these previews if the project produces them deterministically, but human review remains necessary for beauty, taste, and story usefulness.

## 12. Codex Prompt Pack
### Audit Prompt
Use the Master Blueprint Parts 1-3, the Modular Blueprint Part 4, and this addendum as canonical. Audit the current codebase for World Spine violations. Do not rewrite code yet. Return current architecture, broken assumptions, files involved, risk level, repair sequence, and tests needed before changing code.

### Spine Repair Prompt
Implement only the first repair task from the audit. Keep public APIs stable where possible. Add tests proving corrected WorldBrain behavior. Do not add new features.

### Planet Validation Prompt
Implement a debug planet validation system that generates a small test world, validates WorldBrain data, and exports previews for height, land/water, temperature, rainfall, rivers, and biomes. Do not redesign the app.

### Create Mode Prompt
After the World Spine tests pass, implement one Create Mode tool using typed EditActions through worldSession and worldEditor. The tool must not mutate world data directly and must support undo/redo and stale-layer marking.


## 13. Final Law
Generate Mode must create coherent worlds from believable causes. Create Mode must let users alter those worlds safely. Manual overrides are allowed, but they must be explicit, tagged, preserved, and never confused with natural generated truth.