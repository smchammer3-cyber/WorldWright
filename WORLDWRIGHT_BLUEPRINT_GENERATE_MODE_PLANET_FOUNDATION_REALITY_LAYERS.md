# WorldWright Blueprint: Generate Mode Planet Foundation Reality Layers

Status: draft / generator subsystem bridge  
Owner: Iron Man  
Purpose: separate physical planet class from reality style, alien-physical rules, mythic/fantasy rules, anomaly layers, and biome/ecology layers so presets stay causal, interoperable, diagnosable, and not vague buckets.

Governing documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GENERATOR_CONSTITUTION.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SCOPE_AND_DOMAIN_MAP.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_TO_TERRAIN_CAUSALITY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_IDENTITY.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_PRESET_GEOLOGY.md
```

---

## 1. Core Law

```text
Fantasy is not a planet class.
Alien is not merely a biome pack.

Planet Class defines the physical base world.
Reality Mode defines how realistic, stylized, alien, or mythic the rules are allowed to become.
Anomaly Layer defines rare special features, wonders, scars, or impossible regions.
Biome/Ecology Layer defines living or surface-ecology expression.
```

WorldWright must not use vague preset buckets like `Fantasy World` or `Alien World` as if they were the same kind of thing as `Ice World`, `Desert World`, or `Ocean World`.

Instead, Planet Foundation should compose the world from interconnected layers:

```text
Physical Base Class
+ Reality Mode
+ Anomaly Layer
+ Biome/Ecology Layer
+ Style/Presentation Mode
+ Custom Overrides
= Planet Foundation Premise
```

---

## 2. Why This Bridge Is Needed Before Planet Foundation Proper

The generator cannot be blueprint-ready if the preset system mixes unrelated questions.

These are different questions:

```text
Is this a rocky planet, ocean world, ice shell, desert, moon, or volcanic body?
How physically realistic should the rules be?
Are alien chemistries and alternate volatiles allowed?
Are mythic or supernatural cause fields allowed?
Are rare terrain anomalies/wonders allowed?
What kind of biomes or ecology can exist?
What should the renderer/style emphasize?
```

If those questions are collapsed into one preset dropdown, the generator will become vague and inconsistent.

This bridge separates them so every later generator stage can know what it is allowed to assume.

---

## 3. Layer Model

### 3.1 Physical Base Class

The Physical Base Class defines the planet's main physical/geologic type.

Examples:

```text
EARTHLIKE_ROCKY
ICE_WORLD
DESERT_WORLD
OCEAN_WORLD
VOLCANIC_WORLD
BARREN_ROCKY
MOON
GAS_GIANT_MOON
CUSTOM_PHYSICAL
```

Physical Base Class controls:

```text
heat engine defaults,
tectonic regime defaults,
crust/material defaults,
hydrosphere defaults,
cryosphere defaults,
atmosphere/erosion defaults,
impact preservation,
terrain birth constraints,
hydrology constraints,
bathymetry constraints,
settlement/travel/resource constraints.
```

### 3.2 Reality Mode

Reality Mode controls how far the world may depart from ordinary physical realism.

```text
REALISTIC:
  physically grounded, no impossible features, no unsupported fantasy fields.

STYLIZED_REALISTIC:
  simplified or exaggerated shapes, but still physically readable.

ALIEN_PHYSICAL:
  physically grounded but non-Earthlike chemistry, volatiles, atmosphere, materials, gravity, erosion, or ecology.

MYTHIC_FANTASY:
  may include supernatural/mythic cause fields, impossible terrain support, magical materials, or sacred/curse fields, but they must still be explicit and inspectable.

CUSTOM_RULESET:
  user-composed reality rules with validation.
```

### 3.3 Anomaly Layer

The Anomaly Layer controls rare special features.

```text
NONE:
  no special anomalies beyond normal geology.

RARE:
  occasional unusual but explainable features.

MODERATE:
  visible wonders/scars/regions that affect worldbuilding.

WILD:
  strong anomaly presence, but still governed by explicit fields.
```

Anomalies may be physical, alien, or mythic depending on Reality Mode.

Examples:

```text
mega impact basin,
ancient crater sea,
crystal ridge province,
floating island support zone,
leyline uplift belt,
subsurface ocean plume field,
glass desert,
bioluminescent fungal megaforest,
chaos ice terrain,
world-root terrain system,
magnetic mineral spire field,
portal-scar rift zone.
```

### 3.4 Biome/Ecology Layer

Biome/Ecology Layer defines what kinds of living/surface-ecology systems may exist.

```text
EARTHLIKE_ECOLOGY:
  forests, grasslands, deserts, tundra, wetlands, reefs, etc. where climate supports them.

SPARSE_ECOLOGY:
  limited life, mostly barren or specialized niches.

ALIEN_ECOLOGY:
  non-Earthlike but physically grounded life/ecology tied to atmosphere, chemistry, temperature, water/solvent availability, light, and materials.

MAGICAL_ECOLOGY:
  supernatural or mythic ecology, but tied to explicit support fields.

DEAD_WORLD:
  no natural biomes except surface material states.

CUSTOM_ECOLOGY:
  user-composed ecology rules with validation.
```

Biome/Ecology does not replace geology.

It reads:

```text
Planet Foundation,
climate,
hydrology or solvent cycle,
surface materials,
resources,
reality mode,
anomaly fields,
and style allowances.
```

### 3.5 Style / Presentation Mode

Style controls presentation and allowable simplification.

```text
REALISTIC_RENDERED
STYLIZED_ATLAS
PAINTERLY_MAP
GAME_READY
CINEMATIC
SCIENTIFIC_DEBUG
```

Style must not own world truth.

Style may affect visuals and UI presentation, but not hidden terrain authority.

---

## 4. Fantasy Rule

Fantasy means additional cause fields, not random nonsense.

```text
Fantasy is not a replacement for geology.
Fantasy is an additional rule layer that may introduce mythic process fields, impossible terrain support fields, magical material fields, and supernatural anomaly systems.

Those fields must still be inspectable, diagnosable, saveable, exportable, and connected to Create, Sim, Micro Tile, and Export behavior.
```

Fantasy may allow:

```text
leyline uplift,
floatingMassSupport,
crystalGrowthField,
curseAlterationField,
sacredHydrologyInfluence,
worldRootField,
mythicMaterialPotential,
ancientEventScarField,
portalStressField,
divineImpactField.
```

Fantasy must not allow:

```text
unowned impossible shapes,
random weird terrain,
magic that cannot be inspected,
biomes that violate climate without alternate cause,
floating terrain without support field,
Create/Sim/Export behavior that cannot read the fantasy cause.
```

---

## 5. Alien Rule

Alien means physically grounded alternate foundation, not just weird biomes.

```text
Alien is not a color palette or biome pack.
Alien is a physically grounded alternate rule layer: different chemistry, atmosphere, volatiles, gravity, temperature, materials, erosion agents, hydrology/solvent cycles, and ecology.

Alien biomes are consequences of alien foundation rules, not the whole system.
```

Alien may allow:

```text
methane/ethane lakes,
ammonia-water slush cycles,
CO2 ice/glacier cycles,
sulfur volcanism,
organic dune seas,
crystal/mineral growth terrains,
dense-atmosphere wind towers,
low-gravity spire fields,
iron/oxide deserts,
exotic reef or biofilm systems,
subsurface ocean plume ecosystems.
```

Alien must still define:

```text
surface material regime,
volatile/solvent regime,
atmosphere/pressure premise,
temperature range,
erosion agents,
terrain process fields,
biome support conditions,
settlement/resource hazards,
export material masks.
```

---

## 6. Example Compositions

This model allows clear combinations.

### 6.1 Realistic Ice World

```text
Physical Base Class: ICE_WORLD
Reality Mode: REALISTIC
Anomaly Layer: RARE
Biome/Ecology: DEAD_WORLD or SPARSE_ECOLOGY
Style: REALISTIC_RENDERED
```

Expected result:

```text
cryotectonics, fractures, glacial/ice-shell terrain, limited liquid water, sparse or no life.
```

### 6.2 Alien Ocean World

```text
Physical Base Class: OCEAN_WORLD
Reality Mode: ALIEN_PHYSICAL
Anomaly Layer: MODERATE
Biome/Ecology: ALIEN_ECOLOGY
Style: CINEMATIC or GAME_READY
```

Expected result:

```text
non-Earthlike ocean chemistry, exotic reefs or biofilms if supported, unusual coast/bathymetry, alien material masks.
```

### 6.3 Mythic Earthlike World

```text
Physical Base Class: EARTHLIKE_ROCKY
Reality Mode: MYTHIC_FANTASY
Anomaly Layer: MODERATE
Biome/Ecology: EARTHLIKE_ECOLOGY + MAGICAL_ECOLOGY
Style: STYLIZED_ATLAS or GAME_READY
```

Expected result:

```text
normal continents/rivers/climate plus explicit leyline belts, sacred springs, ancient event scars, or mythic materials.
```

### 6.4 Fantasy Desert World

```text
Physical Base Class: DESERT_WORLD
Reality Mode: MYTHIC_FANTASY
Anomaly Layer: WILD
Biome/Ecology: SPARSE_ECOLOGY + MAGICAL_ECOLOGY
```

Expected result:

```text
desert geology remains real: dunes, basins, scarps, dry channels.
Fantasy adds cause fields such as glass curse zones, titan scars, crystal oases, or sacred underground water.
```

### 6.5 Stylized Volcanic Moon

```text
Physical Base Class: MOON or GAS_GIANT_MOON
Reality Mode: STYLIZED_REALISTIC
Anomaly Layer: RARE
Biome/Ecology: DEAD_WORLD
```

Expected result:

```text
exaggerated but coherent craters, lava plains, vents, fissures, parent-body/tidal context if gas giant moon.
```

---

## 7. Planet Foundation Data Contract

Planet Foundation should store these layers separately.

```ts
interface PlanetFoundationRealityLayers {
  physicalBaseClass:
    | 'EARTHLIKE_ROCKY'
    | 'ICE_WORLD'
    | 'DESERT_WORLD'
    | 'OCEAN_WORLD'
    | 'VOLCANIC_WORLD'
    | 'BARREN_ROCKY'
    | 'MOON'
    | 'GAS_GIANT_MOON'
    | 'CUSTOM_PHYSICAL';

  realityMode:
    | 'REALISTIC'
    | 'STYLIZED_REALISTIC'
    | 'ALIEN_PHYSICAL'
    | 'MYTHIC_FANTASY'
    | 'CUSTOM_RULESET';

  anomalyIntensity: 'NONE' | 'RARE' | 'MODERATE' | 'WILD';

  biomeEcologyMode:
    | 'EARTHLIKE_ECOLOGY'
    | 'SPARSE_ECOLOGY'
    | 'ALIEN_ECOLOGY'
    | 'MAGICAL_ECOLOGY'
    | 'DEAD_WORLD'
    | 'CUSTOM_ECOLOGY';

  styleMode:
    | 'REALISTIC_RENDERED'
    | 'STYLIZED_ATLAS'
    | 'PAINTERLY_MAP'
    | 'GAME_READY'
    | 'CINEMATIC'
    | 'SCIENTIFIC_DEBUG';

  enabledAlienRules: AlienRuleSetId[];
  enabledFantasyRules: FantasyRuleSetId[];
  enabledAnomalyFamilies: AnomalyFamilyId[];

  customFoundationHash?: string;
}
```

The old convenience labels can still exist as presets, but they must expand into these fields.

Example:

```text
Fantasy World shortcut
  -> Physical Base Class: EARTHLIKE_ROCKY or CUSTOM_PHYSICAL
  -> Reality Mode: MYTHIC_FANTASY
  -> Anomaly Layer: MODERATE
  -> Biome/Ecology: EARTHLIKE_ECOLOGY + MAGICAL_ECOLOGY if multi-mode support exists
```

Example:

```text
Alien World shortcut
  -> Physical Base Class: CUSTOM_PHYSICAL or selected base
  -> Reality Mode: ALIEN_PHYSICAL
  -> Anomaly Layer: RARE/MODERATE
  -> Biome/Ecology: ALIEN_ECOLOGY or SPARSE_ECOLOGY
```

---

## 8. Seed and Identity Integration

Reality layers must participate in seed interpretation and identity.

Seed derivation should include:

```text
worldSeed,
generationProfileId,
physicalBaseClass,
realityMode,
anomalyIntensity,
biomeEcologyMode,
styleMode if style affects generator outputs,
enabledAlienRules,
enabledFantasyRules,
enabledAnomalyFamilies,
customFoundationHash,
seedArchitectureVersion,
generatorVersion.
```

Rules:

```text
Same seed + same reality layers = stable world.
Same seed + changed physical base = different sibling world.
Same seed + changed reality mode = different sibling world.
Same seed + changed anomaly intensity = different sibling world if anomalies affect source.
Same seed + changed biome/ecology = different world ecology, but not necessarily different geology unless ecology affects terrain/source fields.
Style changes should not affect source terrain unless explicitly configured to do so.
```

Planet Identity and World Birth Certificate must record the layer configuration.

---

## 9. Downstream Handoff

### 9.1 To Geology

Geology reads:

```text
physicalBaseClass,
realityMode,
enabledAlienRules,
enabledFantasyRules,
anomalyIntensity,
customFoundationHash.
```

Geology must ask:

```text
What process fields are allowed?
What process fields are forbidden?
Are supernatural support fields allowed?
Are alien materials/volatiles allowed?
What anomalies may alter terrain authority?
```

### 9.2 To Terrain Birth

Terrain Birth reads:

```text
physical base terrain rules,
allowed material/process fields,
anomaly support fields,
fantasy/alien constraints,
style exaggeration allowances if configured.
```

Terrain Birth must not create impossible terrain unless Reality Mode and support fields allow it.

### 9.3 To Climate / Hydrology / Biomes

Climate, Hydrology, and Biomes read:

```text
volatile regime,
hydrosphere/cryosphere mode,
atmosphere/erosion premise,
biomeEcologyMode,
realityMode,
anomaly fields.
```

Alien/fantasy biomes must be consequences of compatible support rules.

### 9.4 To Create Mode

Create Mode reads:

```text
allowed clay sticker families,
incompatible sticker warnings,
fantasy/alien support fields,
world hazards,
local material/biome/ecology context,
source identity.
```

### 9.5 To Sim Mode

Sim Mode reads:

```text
habitability constraints,
travel hazards,
resource families,
magic/alien hazard fields,
anomaly influence,
settlement limitations.
```

### 9.6 To Export

Export reads:

```text
surface/material masks,
liquid/ice/volatile masks,
magic/alien/anomaly masks,
source identity,
loss-report requirements.
```

Export must report if target format cannot represent alien/fantasy/anomaly metadata.

---

## 10. Shortcut Presets vs Canonical Layers

User-facing shortcut presets are allowed.

Examples:

```text
Classic Earthlike
Frozen Ice World
Dune Desert World
Archipelago Ocean World
Volcanic Hellworld
Airless Moon
Alien Ocean World
Mythic Earthlike
Fantasy Desert
Custom
```

But every shortcut must expand into canonical layers.

```ts
interface PlanetFoundationShortcutPreset {
  shortcutPresetId: string;
  displayName: string;
  expandsTo: PlanetFoundationRealityLayers;
  lockedFields?: string[];
  recommendedOverrides?: string[];
}
```

Rules:

```text
Shortcut preset is UI convenience.
Canonical layers are source truth.
Diagnostics judge canonical layers, not marketing names.
Exports record canonical layers.
Save/Load preserves canonical layers.
```

---

## 11. Diagnostics

Required diagnostics:

```text
realityLayersPresent,
physicalBaseClassPresent,
realityModePresent,
anomalyLayerPresent,
biomeEcologyLayerPresent,
shortcutPresetExpanded,
shortcutPresetNotUsedAsSourceTruth,
fantasyRequiresSupportFields,
alienRequiresPhysicalRules,
anomalyRequiresFamilyAndCause,
biomeRequiresFoundationCompatibility,
styleDoesNotMutateSourceUnlessAllowed,
seedDerivationIncludesSourceAffectingLayers,
identityIncludesRealityLayers,
exportIncludesRealityLayers,
unsupportedCombinationCount,
rendererOnlyFantasyViolationCount,
rendererOnlyAlienViolationCount.
```

Diagnostic questions:

```text
Is this world physically classified?
Is reality mode explicit?
Are alien rules physical, not just visual?
Are fantasy rules support-field based, not arbitrary?
Are anomalies rare/supported/diagnosable?
Are biomes compatible with foundation rules?
Did style accidentally become source truth?
Can downstream systems inspect the layer configuration?
```

---

## 12. Tests

Required tests:

```text
Fantasy shortcut expands to physical base + mythic reality mode + anomaly/biome rules.
Alien shortcut expands to physical base + alien physical mode + alien rule set.
Reality mode is stored in Planet Foundation.
Reality mode is included in source identity when source-affecting.
Reality mode participates in seed derivation when source-affecting.
Fantasy terrain cannot appear without enabled fantasy support fields.
Alien biomes cannot appear without compatible alien physical rules.
Anomaly fields are absent when anomaly intensity is NONE.
Style-only change does not alter canonical terrain unless explicitly configured.
Export sidecar records reality layers.
Save/Load preserves reality layers exactly.
Diagnostics fail renderer-only fantasy/alien implementations.
```

---

## 13. Failure Modes

Reality Layer Model fails if:

```text
Fantasy remains a vague planet class,
Alien remains a vague biome palette,
shortcut presets become source truth,
style mode changes hidden terrain authority,
fantasy terrain appears without support fields,
alien biomes appear without physical premise,
anomalies spawn without cause or rarity control,
biome system ignores foundation constraints,
export loses reality/anomaly metadata,
Create/Sim/Micro Tile cannot inspect fantasy/alien/anomaly cause fields.
```

Catastrophic failure:

```text
The generator cannot explain whether a weird feature is physical, alien-physical, mythic, ecological, visual style, or random noise.
```

---

## 14. Forbidden Shortcuts

```text
Do not treat Fantasy as a normal physical planet class.
Do not treat Alien as a biome pack.
Do not let shortcut presets be source truth.
Do not let style mutate canonical source invisibly.
Do not create impossible terrain without support fields.
Do not create alien biomes without compatible physical foundation.
Do not create anomalies without explicit anomaly family, cause, rarity, and diagnostics.
Do not export without reality layer metadata.
Do not let Create/Sim/Micro Tiles guess what kind of rules the world uses.
```

---

## 15. Readiness Criteria

This bridge is ready when WorldWright defines:

```text
Physical Base Class,
Reality Mode,
Anomaly Layer,
Biome/Ecology Layer,
Style Mode,
shortcut preset expansion,
seed integration,
identity integration,
geology/terrain/climate/biome handoff,
Create/Sim/Export/Micro Tile handoff,
diagnostics,
tests,
failure modes,
forbidden shortcuts.
```

Planet Foundation proper should not be finalized until this separation exists.

---

## 16. Summary Law

```text
WorldWright should not ask only: what preset is this?

WorldWright should ask:
What physical world is this?
How realistic or strange are its rules?
Are alien physics/chemistry allowed?
Are mythic support fields allowed?
How many anomalies may exist?
What kind of ecology can exist?
What presentation style should show it?

Those answers together form the Planet Foundation premise.
```
