# WorldWright Blueprint: Generate Mode Planet Interior Technical Flow

Status: draft / technical operational companion  
Owner: Iron Man  
Purpose: define how the Planet Interior / Core / Crust Engine works technically as a deterministic resolver, not a heavy physics simulator, so Planet Foundation can produce inspectable heat, shell, crust, resurfacing, impact, capability, and process-budget outputs for Geologic Spine and Process Fields.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_INTERIOR_CORE_AND_CRUST_ENGINE.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_TECHNICAL_HARDENING.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_GEOLOGIC_SPINE_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Technical Core Law

```text
The Interior Engine is a deterministic resolver, not a full planet physics simulator.

It converts canonical Planet Foundation inputs into normalized, validated, hash-stable interior parameters that downstream generator stages can read.
```

It should be:

```text
deterministic,
canonicalized,
profile-driven,
seeded,
inspectable,
cheap enough for Generate Mode,
rich enough to prevent fake geology.
```

It should not try to simulate real mantle convection, planetary formation, orbital dynamics, or geochemistry at scientific fidelity.

WorldWright needs a causal worldbuilding engine, not a supercomputer model.

---

## 2. Technical Pipeline

```text
ResolvedPlanetFoundation
-> InteriorInputCanonicalization
-> InteriorArchetypeSelection
-> HeatEngineResolve
-> ShellStateResolve
-> CrustSurfaceLayerResolve
-> ResurfacingResolve
-> ImpactStateResolve
-> CapabilityDerivation
-> ProcessBudgetResolve
-> ConsistencyValidation
-> InteriorEngineHash
-> Handoff to Geologic Spine and Process Fields
```

Every step must be inspectable.

Every source-affecting step must participate in hashing.

---

## 3. Inputs: What the Resolver Reads

The resolver reads canonical Foundation values, not UI labels.

```ts
interface InteriorEngineInput {
  identityRef: PlanetIdentityRef;
  seedRef: SeedManifestRef;
  foundation: ResolvedPlanetFoundation;
  foundationHash: string;
  physicalBaseClass: PhysicalBaseClass;
  realityMode: RealityMode;
  presetStrengthProfile: PresetStrengthProfile;
  parentBodyContext?: ParentBodyContext;
  customOverrides?: InteriorCustomOverrides;
}
```

Important source fields:

```text
physicalBaseClass,
heatEngine,
tectionicRegime,
crustMaterialRegime,
volatileInventory,
hydrosphereMode,
cryosphereMode,
atmosphereMode,
resurfacingMode,
impactPreservation,
realityMode,
enabledAlienRules,
enabledFantasyRules,
parentBodyContext,
preset strength values.
```

Forbidden source fields:

```text
thumbnail name,
UI display label,
renderer palette,
terrain height,
land/water mask,
biome color,
debug province id.
```

---

## 4. Interior Archetype Selection

The first technical step chooses an interior archetype.

```ts
type InteriorArchetype =
  | 'EARTHLIKE_ACTIVE_INTERIOR'
  | 'EARTHLIKE_SIMPLIFIED_PLATE_ANALOG'
  | 'STAGNANT_LID_ROCKY'
  | 'LOW_HEAT_DEAD_ROCKY'
  | 'HIGH_HEAT_VOLCANIC'
  | 'TIDALLY_HEATED_SILICATE'
  | 'TIDALLY_HEATED_ICE_SHELL'
  | 'CRYOGENIC_SUBSURFACE_OCEAN'
  | 'GLACIAL_SURFACE_WORLD'
  | 'REGOLITH_IMPACT_WORLD'
  | 'OCEAN_OVER_ACTIVE_SEAFLOOR'
  | 'OCEAN_OVER_ICE_OR_ROCK'
  | 'ALIEN_PHYSICAL_INTERIOR'
  | 'MYTHIC_SUPPORTED_INTERIOR'
  | 'CUSTOM';
```

Selection rules:

```text
Earthlike Rocky + active tectonics -> EARTHLIKE_ACTIVE_INTERIOR or simplified analogue.
Barren/Moon + low heat -> REGOLITH_IMPACT_WORLD or LOW_HEAT_DEAD_ROCKY.
Volcanic World + high heat -> HIGH_HEAT_VOLCANIC.
Gas Giant Moon + tidal context + silicate volcanism -> TIDALLY_HEATED_SILICATE.
Gas Giant Moon + ice shell/subsurface ocean -> TIDALLY_HEATED_ICE_SHELL or CRYOGENIC_SUBSURFACE_OCEAN.
Ice World + ice shell -> CRYOGENIC_SUBSURFACE_OCEAN or GLACIAL_SURFACE_WORLD.
Alien Physical -> ALIEN_PHYSICAL_INTERIOR plus explicit material/volatile rules.
Mythic Fantasy -> MYTHIC_SUPPORTED_INTERIOR only if enabledFantasyRules allow it.
```

The archetype is not final geology.

It is the interior resolver's operating mode.

---

## 5. Heat Engine Resolve

Heat is resolved into normalized values.

```ts
interface ResolvedHeatEngine {
  heatSourceType: string;
  normalizedHeatFlow: number;
  heatPatchiness: number;
  heatTemporalMode: 'STABLE' | 'DECLINING' | 'PULSED' | 'REGIONAL';
  volcanicSupport: number;
  tectonicMobilitySupport: number;
  cryovolcanicSupport: number;
  interiorOceanSupport: number;
  mythicEnergySupport: number;
}
```

Example resolver:

```ts
function resolveHeatEngine(input: InteriorEngineInput, archetype: InteriorArchetype): ResolvedHeatEngine {
  const profile = input.foundation.presetStrengthProfile;
  const heatBase = table.heatBaseByArchetype[archetype];
  const heatBias = profile.volcanismLevel * 0.35 + profile.tectonicActivity * 0.25;
  const tidalBoost = input.parentBodyContext?.tidalHeatingClass === 'HIGH' ? 0.35 : 0;
  const fantasyBoost = input.realityMode === 'MYTHIC_FANTASY' ? profile.fantasyInfluenceStrength * 0.25 : 0;

  const normalizedHeatFlow = clamp01(heatBase + heatBias + tidalBoost + fantasyBoost);

  return {
    heatSourceType: chooseHeatSourceType(input, archetype),
    normalizedHeatFlow,
    heatPatchiness: derivePatchiness(input, archetype),
    heatTemporalMode: deriveTemporalMode(input, archetype),
    volcanicSupport: clamp01(normalizedHeatFlow * profile.volcanismLevel),
    tectonicMobilitySupport: clamp01(normalizedHeatFlow * profile.tectonicActivity),
    cryovolcanicSupport: deriveCryovolcanicSupport(input, normalizedHeatFlow),
    interiorOceanSupport: deriveInteriorOceanSupport(input, normalizedHeatFlow),
    mythicEnergySupport: input.realityMode === 'MYTHIC_FANTASY' ? profile.fantasyInfluenceStrength : 0,
  };
}
```

These are not literal physical units.

They are normalized generator controls with documented meaning.

---

## 6. Shell State Resolve

Shell state decides whether the outer layer is mobile, stagnant, icy, regolith-dominated, volcanic, etc.

```ts
interface ResolvedShellState {
  shellType: string;
  mobility: number;
  thickness: number;
  strength: number;
  fractureLikelihood: number;
  flexureLikelihood: number;
  recyclingLikelihood: number;
  age: number;
}
```

Example logic:

```text
High heat + Earthlike tectonic premise -> higher mobility and recycling.
Low heat + rocky world -> thick/stagnant shell, high age, low recycling.
Tidal ice shell -> high flexure/fracture, medium mobility, ice authority.
Regolith impact world -> low mobility, high age, high impact preservation.
High heat volcanic -> thin/weak shell, high resurfacing, low impact preservation in active areas.
```

Pseudo-flow:

```ts
const mobility = clamp01(
  heat.tectonicMobilitySupport
  + foundationStrength.tectonicActivity * 0.4
  - crust.thicknessPenalty
  - deadWorldPenalty
);

const fractureLikelihood = clamp01(
  mobility * 0.3
  + heat.heatPatchiness * 0.25
  + tidalStress * 0.35
  + cryosphereStress * 0.25
);
```

Shell state feeds Geologic Spine province type selection.

---

## 7. Crust / Surface Layer Resolve

This stage resolves material and buoyancy possibilities.

```ts
interface ResolvedCrustSurfaceLayer {
  dominantLayer: string;
  differentiation: number;
  buoyancyContrast: number;
  basinProneness: number;
  continentalCoreSupport: number;
  oceanBasinSupport: number;
  shelfSupport: number;
  materialResistanceBase: number;
  sedimentPotential: number;
  regolithPotential: number;
  iceMaterialAuthority: number;
  exoticMaterialAuthority: number;
  mythicMaterialAuthority: number;
}
```

Example rules:

```text
Earthlike active/simplified plate analogue -> high differentiation, continent/ocean contrast, shelf support.
Stagnant rocky lid -> lower differentiation, more regional volcanic/rift/scarp behavior.
Ocean world -> high ocean basin support, shelf/island support depends subtype.
Moon/barren -> high regolith, high impact preservation, low hydrologic sediment.
Ice world -> high ice material authority, rock may be buried or regional.
Alien -> exotic material authority requires explicit alien rules.
Fantasy -> mythic material authority requires explicit fantasy support.
```

This is where continents become possible as a consequence of crust rules, not a seed blob.

---

## 8. Resurfacing Resolve

Resurfacing decides what erases or preserves older structures.

```ts
interface ResolvedResurfacing {
  dominantMode: string;
  strength: number;
  patchiness: number;
  recency: number;
  preservesOldTerrain: number;
  suppressesImpactCraters: number;
  suppressesOldBasins: number;
  createsSmoothPlains: number;
  createsYoungSurfaceTexture: number;
}
```

Example rules:

```text
Volcanic resurfacing high -> suppress impacts, create lava/ash plains, preserve vents/fissures.
Cryovolcanic resurfacing -> smooth/renew ice, produce flow/plume/chaos support.
Glacial planing -> smooth/erode/redirect terrain under ice authority.
Aeolian reworking -> dune/dust/yardang support, does not create wet valleys.
Low resurfacing -> high impact/scarp/regolith preservation.
Plate recycling -> reduces ancient impact preservation in active zones.
```

---

## 9. Impact State Resolve

Impact is not just craters as stickers.

```ts
interface ResolvedImpactState {
  impactDensity: number;
  preservation: number;
  basinHierarchy: number;
  craterSaturation: number;
  ejectaAuthority: number;
  relaxation: number;
  overprintByResurfacing: number;
}
```

Example formula:

```ts
const preservation = clamp01(
  foundation.impactPreservationStrength
  + deadWorldBonus
  + airlessBonus
  + oldShellBonus
  - resurfacing.strength * 0.65
  - atmosphereErosionPenalty
  - glacialOrOceanEraser
);
```

Rules:

```text
If impact preservation is high, impact basins must be terrain authority.
If resurfacing is high, old impacts must fade regionally.
If ice relaxation is high, impact rims may soften or deform.
Crater decals are forbidden as the only implementation.
```

---

## 10. Capability Derivation

Capabilities are computed from resolved interior parameters.

```ts
interface ResolvedInteriorCapabilities {
  canBuildContinentalCores: boolean;
  canBuildOceanBasins: boolean;
  canBuildShelves: boolean;
  canBuildMountainBelts: boolean;
  canBuildRifts: boolean;
  canBuildVolcanicProvinces: boolean;
  canBuildImpactBasins: boolean;
  canBuildRegolithTerrain: boolean;
  canBuildCryotectonicTerrain: boolean;
  canBuildGlacialTerrain: boolean;
  canBuildAeolianTerrain: boolean;
  canBuildAlienSolventTerrain: boolean;
  canBuildFantasySupportedTerrain: boolean;
}
```

Example derivation:

```ts
canBuildContinentalCores =
  crust.continentalCoreSupport > 0.35
  && shell.shellType !== 'REGOLITH_DOMINATED_SURFACE'
  && !foundation.capabilities.deadWorldOnly;

canBuildCryotectonicTerrain =
  crust.iceMaterialAuthority > 0.45
  && shell.fractureLikelihood > 0.25;

canBuildVolcanicProvinces =
  heat.volcanicSupport > 0.25
  || foundation.enabledFantasyRules.includes('MYTHIC_HEAT_SOURCE');
```

Downstream stages query capabilities instead of guessing from preset names.

---

## 11. Process Budget Resolve

Budgets are normalized strengths handed to Geologic Spine and Process Fields.

```ts
interface ResolvedInteriorProcessBudget {
  tectonicBudget: number;
  volcanicBudget: number;
  upliftBudget: number;
  riftBudget: number;
  crustalDifferentiationBudget: number;
  oceanBasinBudget: number;
  shelfBudget: number;
  impactBudget: number;
  regolithBudget: number;
  resurfacingBudget: number;
  cryotectonicBudget: number;
  glacialBudget: number;
  aeolianBudget: number;
  alienProcessBudget: number;
  mythicProcessBudget: number;
}
```

Example budget logic:

```ts
tectonicBudget = clamp01(shell.mobility * heat.tectonicMobilitySupport * profile.tectonicActivity);
volcanicBudget = clamp01(heat.volcanicSupport + resurfacing.volcanicComponent);
upliftBudget = clamp01(tectonicBudget * 0.6 + crust.buoyancyContrast * 0.3 + mythicUpliftBonus);
oceanBasinBudget = clamp01(crust.oceanBasinSupport * foundation.oceanCoverageBias);
impactBudget = clamp01(impact.preservation * impact.basinHierarchy);
cryotectonicBudget = clamp01(shell.fractureLikelihood * crust.iceMaterialAuthority * heat.cryovolcanicSupport);
aeolianBudget = clamp01(profile.aeolianStrength * aridityBias * atmosphere.windSupport);
```

Rules:

```text
Budgets do not directly create terrain.
Budgets scale province counts, field strength, and allowed process fields.
Terrain Birth reads Process Fields, not raw budgets, unless a contract explicitly allows otherwise.
```

---

## 12. Consistency Validation

Interior Engine must validate contradictions before handoff.

Hard blocks:

```text
Volcanic World with zero heat source and no fantasy/custom heat override.
Cryotectonic terrain with no ice/volatile shell support.
Mobile Earthlike plates on regolith-dominated dead moon without custom analogue.
Gas Giant Moon tidal heating without parent-body/orbital context.
Alien material authority without alien rule support.
Fantasy-supported shell without fantasy rules.
```

Warnings:

```text
Earthlike world with extremely low heat but high mountain/uplift expectation.
Ocean World with weak basin support.
Moon with low impact preservation and no resurfacing explanation.
Ice World with high liquid-water hydrology and no warm subtype/magic support.
```

---

## 13. Handoff Objects

The output should be direct and machine-readable.

```ts
interface InteriorEngineHandoffToGeologicSpine {
  interiorArchetype: InteriorArchetype;
  heat: ResolvedHeatEngine;
  shell: ResolvedShellState;
  crust: ResolvedCrustSurfaceLayer;
  resurfacing: ResolvedResurfacing;
  impact: ResolvedImpactState;
  capabilities: ResolvedInteriorCapabilities;
  processBudget: ResolvedInteriorProcessBudget;
}
```

Geologic Spine uses this to choose:

```text
province families,
province counts,
province relationships,
major structure types,
spine archetype,
required process intent fields.
```

Process Fields use this to scale:

```text
continentality,
crustalBuoyancy,
oceanBasinTendency,
upliftTendency,
thermalFlux,
impactPreservation,
iceShellStress,
aolian/dry basin fields,
alien/fantasy support fields.
```

---

## 14. Conceptual Implementation

```ts
function buildPlanetInteriorEngine(input: InteriorEngineInput): PlanetInteriorCoreCrustEngineRecord {
  const canonical = canonicalizeInteriorInput(input);
  const rng = input.seedRef.streams;

  const archetype = selectInteriorArchetype(canonical, rng.stream('interior.archetype'));

  const heat = resolveHeatEngine(canonical, archetype, rng.stream('interior.heatEngine'));
  const shell = resolveShellState(canonical, archetype, heat, rng.stream('interior.shellState'));
  const crust = resolveCrustSurfaceLayer(canonical, archetype, heat, shell, rng.stream('interior.crustSurfaceLayer'));
  const resurfacing = resolveResurfacing(canonical, heat, shell, crust, rng.stream('interior.resurfacing'));
  const impact = resolveImpactState(canonical, shell, resurfacing, rng.stream('interior.impactState'));

  const capabilities = deriveInteriorCapabilities(canonical, heat, shell, crust, resurfacing, impact);
  const processBudget = resolveInteriorProcessBudget(canonical, heat, shell, crust, resurfacing, impact, capabilities);
  const validation = validateInteriorConsistency(canonical, heat, shell, crust, resurfacing, impact, capabilities, processBudget);

  return canonicalizeAndHash({
    identityRef: input.identityRef,
    planetFoundationRef: input.foundation.ref,
    seedRef: input.seedRef,
    archetype,
    heatEngine: heat,
    shellState: shell,
    crustSurfaceLayer: crust,
    resurfacing,
    impactState: impact,
    capabilities,
    processBudget,
    validation,
    handoff: buildInteriorHandoff(archetype, heat, shell, crust, resurfacing, impact, capabilities, processBudget),
  });
}
```

---

## 15. Example: Earthlike Technical Resolve

Input:

```text
physicalBaseClass: EARTHLIKE_ROCKY
heatEngine: ACTIVE_PLATE_TECTONIC
tectonicActivity: 0.78
oceanCoverageBias: 0.61
hydrologyStrength: 0.82
reliefIntensity: 0.55
```

Resolved interior:

```text
archetype: EARTHLIKE_ACTIVE_INTERIOR
normalizedHeatFlow: medium/high
shellMobility: high
crustDifferentiation: high
buoyancyContrast: high
oceanBasinSupport: high
shelfSupport: high
impactPreservation: low/moderate
tectonicBudget: high
oceanBasinBudget: high
upliftBudget: moderate/high
```

Downstream consequence:

```text
Geologic Spine may create continental cores, ocean basins, margins, shelves, uplift belts, rifts, arcs, and stable interiors.
Process Fields may create continentality, crustalBuoyancy, oceanBasinTendency, upliftTendency, shelfTendency, marginTendency, and watershedSupport.
```

---

## 16. Example: Ice World Technical Resolve

Input:

```text
physicalBaseClass: ICE_WORLD
cryosphereMode: ICE_SHELL
iceAuthority: PRIMARY_TERRAIN_AUTHORITY
cryotectonicActivity: 0.72
surfaceLiquidWaterStability: 0.03
```

Resolved interior:

```text
archetype: CRYOGENIC_SUBSURFACE_OCEAN or TIDALLY_HEATED_ICE_SHELL
normalizedHeatFlow: low/moderate or tidal/regional
shellType: MOBILE_ICE_SHELL
iceMaterialAuthority: high
fractureLikelihood: high
cryovolcanicSupport: variable
impactRelaxation: moderate depending heat/ice
cryotectonicBudget: high
EarthlikeTectonicBudget: suppressed
```

Downstream consequence:

```text
Geologic Spine may create ice stress provinces, fracture networks, pressure ridges, subglacial basin hints, cryovolcanic provinces.
Process Fields may create iceShellStress, fractureTendency, iceThicknessPotential, cryovolcanicTendency, glacialFlowPotential.
Normal Earthlike continent/rivers are suppressed unless subtype/override allows them.
```

---

## 17. Example: Volcanic Technical Resolve

Input:

```text
physicalBaseClass: VOLCANIC_WORLD
heatEngine: HIGH_VOLCANIC_HEAT or TIDAL_HEATING
volcanismLevel: 0.91
impactPreservation: low/regional
```

Resolved interior:

```text
archetype: HIGH_HEAT_VOLCANIC or TIDALLY_HEATED_SILICATE
normalizedHeatFlow: high
heatPatchiness: high/regional
shellType: THIN_VOLCANIC_LID
resurfacingStrength: high
impactPreservation: low in active provinces
volcanicBudget: very high
tectonicBudget: variable
```

Downstream consequence:

```text
Geologic Spine may create thermal provinces, fissures, lava plains, caldera zones, resurfacing age contrast.
Process Fields may create thermalFlux, ventDensity, lavaFlowPotential, ashDepositPotential, resurfacingRecency, sulfurOrVolatileDepositPotential.
```

---

## 18. Hashing and Determinism

Hash must include:

```text
planetFoundationHash,
seedArchitectureVersion,
generatorVersion,
interiorEngineSchemaVersion,
interiorArchetype,
heatEngine result,
shellState result,
crustSurfaceLayer result,
resurfacing result,
impactState result,
capabilities,
processBudget,
source-affecting custom overrides.
```

Hash must not include:

```text
UI labels,
thumbnail art,
renderer colors,
diagnostics-only overlays,
file write timestamps,
unordered array order before canonicalization.
```

---

## 19. Diagnostics

Required technical diagnostics:

```text
interiorInputCanonicalized,
interiorArchetypeSelected,
heatEngineResolved,
shellStateResolved,
crustSurfaceLayerResolved,
resurfacingResolved,
impactStateResolved,
capabilitiesDerived,
processBudgetResolved,
validationVerdictPresent,
handoffToGeologicSpinePresent,
handoffToProcessFieldsPresent,
interiorHashStable,
rendererInputViolationCount,
uiLabelInputViolationCount,
unsupportedPhysicalContradictionCount,
capabilityBudgetMismatchCount.
```

---

## 20. Failure Modes

The technical flow fails if:

```text
it is so vague that every preset gets the same budgets,
it is so complex that it becomes impossible to debug,
it reads renderer colors or UI labels,
it creates terrain directly,
it lets volcanoes exist without heat source,
it lets ice-shell worlds use Earthlike plate logic as main authority,
it lets moons skip impact/regolith logic,
it lets gas giant moons ignore parent context,
it lets alien/fantasy weirdness bypass explicit support.
```

---

## 21. Summary Law

```text
Technically, the Interior Engine is a deterministic parameter resolver.

It does not simulate a planet core at scientific fidelity.
It resolves the hidden physical engine into stable, normalized, source-aware parameters.

Those parameters tell Geologic Spine what large structures are possible and tell Process Fields how strong the continuous authority should be.
```
