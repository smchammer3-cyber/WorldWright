# WorldWright Blueprint: Generate Mode Biome Operational Algorithm

Status: draft / technical operational companion / extra detailed  
Owner: Iron Man  
Purpose: define the concrete algorithm that converts Foundation ecology permissions, Climate fields, Hydrology consequences, Sea-Level exposure, Terrain form, Surface Material readiness, Process support fields, and deterministic biome seed streams into biome suitability fields, ecological activity, dominant/secondary biome candidates, ecotones, barren/sparse outcomes, alien/fantasy ecology records, diagnostics, source proof, and downstream handoffs without painting biomes or repairing upstream failures.

Related documents:

```text
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_BIOME_DEEP_ECOLOGICAL_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_DECISION_LOGIC.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_DEEP_SCIENTIFIC_MODEL.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CLIMATE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_HYDROLOGY_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEA_LEVEL_SOLVE_OPERATIONAL_ALGORITHM.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_TERRAIN_BIRTH_DEEP_OPERATIONAL_MECHANICS.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PROCESS_FIELDS_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_PLANET_FOUNDATION_CORE_CONTRACT.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_CAUSAL_DEPENDENCY_GRAPH.md
WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SEED_ARCHITECTURE.md
```

---

## 1. Operational Core Law

```text
Biome Operational Algorithm is not a color classifier.
Biome Operational Algorithm is not a climate generator.
Biome Operational Algorithm is not a river generator.
Biome Operational Algorithm is not a resource generator.
Biome Operational Algorithm is not settlement logic.

Biome Operational Algorithm is a deterministic ecological-suitability resolver over already-generated climate, hydrology, terrain, exposure, substrate, and world-rule state.
```

Operational mission:

```text
Read Foundation ecology permission and energy base.
Read Climate scientific fields and labels.
Read Hydrology candidates and permanence grading.
Read Sea-Level exposure/coverage and cover medium.
Read Terrain elevation, slope, highland, coast, and form context.
Read Surface Material readiness when available.
Read Process Field ecology support and stress fields.
Compute eligibility gates.
Compute climate envelopes.
Compute water/medium availability.
Compute substrate readiness.
Compute productivity/ecological activity.
Compute parallel biome-family suitability fields.
Resolve dominant, secondary, transition, mosaic, barren, sparse, alien, and fantasy outcomes.
Emit source proof, diagnostics, artifacts, and downstream handoffs.
```

Core rule:

```text
Every biome candidate must have supporting factors, limiting factors, source refs, and confidence.
```

---

## 2. High-Level Algorithm

```text
1. Canonicalize Biome input bundle.
2. Validate causal graph gate and source hashes.
3. Validate ClimateToBiomeHandoff.
4. Validate HydrologyToBiomeMaterialHandoff.
5. Validate SeaLevelToClimateBiomeMaterialHandoff.
6. Validate Foundation ecology permission and energy base.
7. Resolve Biome mode.
8. Build deterministic biome sampling graph.
9. Sample climate, hydrology, exposure, terrain, substrate, process, and Foundation ecology context.
10. Compute exposure/cover eligibility.
11. Compute ecology permission and energy-base gate.
12. Compute climate envelope suitability.
13. Compute water/medium availability.
14. Compute hydrology relationship influence.
15. Compute substrate/soil/material readiness.
16. Compute stress, disturbance, and stability modifiers.
17. Compute productivity and ecological activity.
18. Compute parallel biome-family suitability fields.
19. Resolve dominant/secondary/tertiary biome candidates.
20. Resolve transitions, ecotones, mosaics, and sharp boundaries.
21. Resolve barren, sterile, sparse, marine, freshwater, wetland, alien, and fantasy special outcomes.
22. Run contradiction and authority audits.
23. Emit sample, region, and world proof.
24. Produce Surface Material, Resource, Settlement/Movement, Micro Tile, Export, Create, and Sim handoffs.
25. Hash source-affecting output.
```

Rule:

```text
Biomes may interpret consequences.
Biomes may not mutate Climate, Hydrology, Sea-Level, Terrain, Bathymetry, Materials, Resources, or Settlements.
```

---

## 3. Input Bundle

```ts
interface BiomeInput {
  identity: PlanetIdentityRef;
  seedManifest: SeedManifestRef;
  foundation: ResolvedPlanetFoundationRef;
  processFields: ProcessFieldSetRef;
  terrainBirth: TerrainBirthRef;
  oceanBathymetry: OceanBathymetryRef;
  seaLevelSolve: SeaLevelSolveRef;
  hydrology: HydrologyRef;
  climate: ClimateRef;
  surfaceMaterialReadiness?: SurfaceMaterialReadinessRef;
  climateToBiomeHandoff: ClimateToBiomeHandoff;
  hydrologyToBiomeMaterialHandoff: HydrologyToBiomeMaterialHandoff;
  seaLevelToClimateBiomeMaterialHandoff: SeaLevelToClimateBiomeMaterialHandoff;
  causalDependencyGraphVerdict: CausalGraphGateVerdict;
  coordinateNamespace: CoordinateNamespaceRef;
  generationProfile: GenerationProfileRef;
  algorithmVersion: string;
}
```

Forbidden source reads:

```text
renderer biome color,
old biome color map,
manual painted biome mask,
resource map,
settlement map,
political/culture map,
Sim ecology state as Generate source,
export masks,
UI preset label as full biome recipe without resolved Foundation ecology rules,
raw noise as direct forest/desert/wetland/reef authority.
```

---

## 4. Canonical Biome Context

Biome should reduce all inputs into a canonical context before scoring.

```ts
interface CanonicalBiomeContext {
  sourceHashes: BiomeSourceHashes;
  biomeMode: BiomeMode;
  coordinateNamespaceId: string;
  graphConfig: BiomeGraphConfig;
  foundationEcologyProfile: FoundationEcologyProfile;
  climateBiomeRef: ClimateBiomeContextRef;
  hydrologyBiomeRef: HydrologyBiomeContextRef;
  exposureTerrainRef: ExposureTerrainBiomeContextRef;
  surfaceMaterialReadinessRef?: SurfaceMaterialReadinessRef;
  processEcologyFieldsRef: ProcessEcologyFieldSetRef;
  diagnosticsPolicy: BiomeDiagnosticsPolicy;
}
```

Canonicalization rules:

```text
Normalize ecology permissions and energy-base enums.
Normalize climate, hydrology, exposure, and substrate field names.
Clamp normalized suitability/support fields to valid range.
Reject NaN and Infinity.
Sort unordered candidate refs.
Quantize thresholds where required for hash stability.
Record algorithm version and graph config.
Exclude renderer, overlay, resource, settlement, and export styling settings from source hash.
```

---

## 5. Biome Mode Resolver

Resolve one biome mode before scoring.

```ts
type BiomeMode =
  | 'EARTHLIKE_ECOLOGY'
  | 'BARREN_OR_STERILE_SURFACE'
  | 'DRY_SPARSE_ECOLOGY'
  | 'ICE_CRYO_ECOLOGY'
  | 'OCEAN_WORLD_ECOLOGY'
  | 'ALIEN_ECOLOGY'
  | 'MYTHIC_FANTASY_ECOLOGY'
  | 'CUSTOM'
  | 'DIAGNOSTIC_ONLY';
```

Mode resolver sequence:

```text
1. If upstream gate failed, block or use DIAGNOSTIC_ONLY.
2. If Foundation forbids active ecology, use BARREN_OR_STERILE_SURFACE.
3. If alien ecology is declared, use ALIEN_ECOLOGY.
4. If mythic/fantasy ecology support is primary, use MYTHIC_FANTASY_ECOLOGY.
5. If ocean coverage dominates and marine ecology is allowed, use OCEAN_WORLD_ECOLOGY.
6. If cryosphere/ice ecology dominates, use ICE_CRYO_ECOLOGY.
7. If climate/water support is sparse and dry ecology is allowed, use DRY_SPARSE_ECOLOGY.
8. If Earthlike ecology is allowed and climate/hydrology support it, use EARTHLIKE_ECOLOGY.
9. Otherwise use BARREN_OR_STERILE_SURFACE, CUSTOM, or DIAGNOSTIC_ONLY.
```

Mode controls:

```text
allowed biome families,
required energy base,
water/medium semantics,
substrate requirements,
transition behavior,
active ecology permission,
Earthlike fallback rules,
alien/fantasy metadata requirements,
downstream handoff semantics.
```

---

## 6. Biome Sampling Graph

Biome uses a deterministic graph compatible with climate, hydrology, micro tiles, and export.

Graph layers:

```text
GLOBAL_BIOME_ZONE_GRAPH:
  broad suitability fields, dominant candidates, and ecological activity.

CLIMATE_BIOME_GRAPH:
  thermal/moisture/aridity/seasonality envelopes.

HYDROLOGY_BIOME_GRAPH:
  riparian, wetland, floodplain, lake, dry wash, glacial, alien/fantasy water influence.

EXPOSURE_TERRAIN_BIOME_GRAPH:
  land/water/cover eligibility, elevation bands, slope, highland, coast, shallow/deep context.

SUBSTRATE_BIOME_GRAPH:
  soil/material/regolith/volcanic/salt/ice/reef/substrate constraints.

TRANSITION_MOSAIC_GRAPH:
  ecotones, mixed suitability, boundary sharpness, low-confidence gradients.

MICRO_TILE_BIOME_GRAPH:
  local constraints, edge continuity, micro biome recipe hints.
```

Node contract:

```ts
interface BiomeNode {
  nodeId: string;
  stableCoordinateKey: string;
  position: SphericalCoordinateRef;
  tileRefs: string[];
  neighborNodeIds: string[];

  exposureClass: CoverageClassification;
  coverMedium: string;
  elevation: number;
  slope: number;
  terrainFormClasses: string[];
  climateSample: BiomeClimateSample;
  hydrologySample: BiomeHydrologySample;
  substrateSample?: BiomeSubstrateSample;
  foundationEcologySample: FoundationEcologySample;
  processEcologySample: ProcessEcologySample;
}
```

Rules:

```text
Graph traversal order must not affect biome outputs.
Projection seams must not create biome seams.
Climate and hydrology gradients should produce biome gradients where appropriate.
Micro tile edge constraints must be stored.
Diagnostics-only graph walks must not consume canonical RNG.
```

---

## 7. Source Sampling

### 7.1 Foundation Ecology Sample

```ts
interface FoundationEcologySample {
  ecologyPermission: boolean;
  lifePresenceClass: string;
  energyBase: string;
  ecologyComplexityClass: string;
  earthlikeEcologyPermission: boolean;
  alienEcologyPermission: boolean;
  fantasyEcologyPermission: boolean;
  barrenSurfacePermission: boolean;
  marineEcologyPermission: boolean;
  freshwaterEcologyPermission: boolean;
  wetlandEcologyPermission: boolean;
  subsurfaceEcologyPermission: boolean;
  iceEcologyPermission: boolean;
}
```

### 7.2 Climate Sample

```ts
interface BiomeClimateSample {
  temperatureMean: number;
  warmSeasonTemperature: number;
  coldSeasonTemperature: number;
  growingSeasonSupport: number;
  precipitationPotential: number;
  humidityPotential: number;
  aridityIndex: number;
  waterDeficit: number;
  seasonalityIndex: number;
  snowIcePotential: number;
  freezeThawPotential: number;
  stormWindStress: number;
  droughtStress: number;
  climateZoneRefs: string[];
  confidence: number;
}
```

### 7.3 Hydrology Sample

```ts
interface BiomeHydrologySample {
  riverProximity: number;
  lakeProximity: number;
  wetlandReadiness: number;
  floodplainReadiness: number;
  groundwaterHint: number;
  dryWashPresence: number;
  riverPermanencePotential: number;
  lakeStabilityPotential: number;
  floodingInfluence: number;
  flowMedium: string;
  confidence: number;
}
```

### 7.4 Terrain / Exposure Sample

```ts
interface BiomeTerrainExposureSample {
  exposureClass: CoverageClassification;
  coverMedium: string;
  elevation: number;
  slope: number;
  localRelief: number;
  highlandContext: number;
  coastalContext: number;
  shallowMarineContext: number;
  deepMarineContext: number;
  terrainStabilityHint: number;
  confidence: number;
}
```

### 7.5 Substrate and Process Sample

```ts
interface BiomeSubstrateProcessSample {
  soilFormationPotential: number;
  rootingSubstrateSuitability: number;
  regolithSterilityConstraint: number;
  saltToxicityConstraint: number;
  volcanicFreshSurfaceConstraint: number;
  iceSubstrateConstraint: number;
  reefAttachmentPotential: number;
  materialWeatheringSupport: number;
  disturbanceReadiness: number;
  alienEcologySupport: number;
  fantasyEcologySupport: number;
}
```

---

## 8. Exposure / Cover Eligibility Algorithm

Algorithm:

```text
1. Read Sea-Level exposure/coverage class and cover medium.
2. Read terrain elevation/slope and bathymetry/shallow/deep context.
3. Classify node eligibility: terrestrial, coastal, riparian, freshwater, wetland, shallow marine, deep marine, ice-covered, subglacial, subsurface, dry basin, alien solvent, fantasy covered, barren exposed, low confidence.
4. Produce per-family eligibility masks.
5. Block impossible family placements unless explicit special support exists.
```

Hard placement rules:

```text
terrestrial forest cannot occupy deep marine cells,
reef cannot occupy dry highland cells,
wetland cannot occupy steep dry highlands without support,
deep marine cannot use land-biome logic,
ocean world covered cells use marine/covered-medium logic,
dice-covered cells use ice/cryo/subsurface/sparse logic unless special rules override.
```

---

## 9. Ecology Permission and Energy Gate Algorithm

Algorithm:

```text
1. Check Foundation ecologyPermission.
2. Resolve energy base.
3. Resolve allowed ecology families.
4. Suppress active ecology if permission/energy is missing.
5. Allow barren/sparse/sterile outcomes when life is absent or weak.
6. Validate alien/fantasy ecology semantics when required.
```

Gate formula pattern:

```ts
ecologyActivityPermission = clamp01(
  ecologyPermission
  * energyBaseSupport
  * ecologyComplexityPermission
  * modeFamilyPermission
  - sterileOverridePenalty
);
```

Rules:

```text
No ecology permission means no active living biome.
No compatible energy base means no active living biome.
Barren/sterile can still be canonical output.
Alien/fantasy requires declared semantics.
```

---

## 10. Climate Envelope Algorithm

Compute per-family climate envelope suitability.

Formula pattern:

```ts
climateEnvelopeSuitability(family) = clamp01(
  thermalEnvelope(family, climate.temperatureMean, climate.warmSeasonTemperature, climate.coldSeasonTemperature)
  * moistureEnvelope(family, climate.precipitationPotential, climate.humidityPotential, climate.aridityIndex)
  * seasonalityEnvelope(family, climate.seasonalityIndex, climate.growingSeasonSupport)
  * cryosphereEnvelope(family, climate.snowIcePotential, climate.freezeThawPotential)
  - stressPenalty(family, climate.droughtStress, climate.stormWindStress)
);
```

Family rules:

```text
forest requires moisture/growing-season support,
desert requires aridity/water-deficit support,
tundra requires cold/short-season/cryosphere support,
wetland requires moisture plus hydrology support,
reef requires shallow marine plus compatible thermal/light/medium context,
barren can result from hostile climate envelope.
```

---

## 11. Water / Medium Availability Algorithm

Algorithm:

```text
1. Combine Climate precipitation/humidity/aridity/water deficit.
2. Add Hydrology river/lake/wetland/floodplain/groundwater/snowmelt support.
3. Add compatible Sea-Level cover medium where applicable.
4. Apply aridity, evaporation, ice-lock, wrong-medium, and unreliability penalties.
5. Emit usable medium availability and reliability.
```

Formula pattern:

```ts
usableMediumAvailability = clamp01(
  precipitationSupport
  + riverLakeWetlandSupport
  + groundwaterHint
  + snowMeltSupport
  + compatibleCoverMediumSupport
  - aridityStress
  - evaporationStress
  - iceLockConstraint
  - incompatibleMediumPenalty
);
```

Rules:

```text
Water availability is not water color.
Desert can be valid at low usable water.
Wetland requires high/persistent water influence.
Alien/fantasy ecology must declare what medium availability means.
```

---

## 12. Hydrology Relationship Algorithm

Hydrology modifies suitability locally.

Influences:

```text
riparian boost near reliable rivers,
wetland boost where wetland viability and poor drainage exist,
floodplain boost in floodplain-ready lowlands,
lake-edge boost where lake stability exists,
dry-wash sparse/riparian trace support,
glacial-margin support where ice/melt exists,
alien/fantasy water-medium support where declared.
```

Rules:

```text
Hydrology can boost local biome suitability.
Hydrology cannot create climate.
Hydrology cannot create biome on impossible exposure/substrate by itself.
Hydrology confidence should affect biome confidence.
```

---

## 13. Substrate / Soil / Material Readiness Algorithm

Algorithm:

```text
1. Read material/soil/substrate readiness if present.
2. Estimate missing substrate readiness conservatively from terrain/climate/process context if allowed.
3. Compute rooting, reef, wet soil, regolith, salt, volcanic, ice, and alien/fantasy substrate constraints.
4. Apply family-specific substrate modifiers.
5. Emit substrate support and limiting factors.
```

Rules:

```text
Forest on sterile regolith should be limited unless special support exists.
Reef needs shallow covered substrate or declared floating/alien support.
Volcanic fresh surfaces may be barren or early succession.
Salt/evaporite context may push toward barren/sparse/salt-flat ecology.
Surface Materials own final material map.
```

---

## 14. Stress, Disturbance, and Stability Algorithm

Algorithm:

```text
1. Read drought, storm/wind, freeze-thaw, flood, slope instability, volcanic, salt/toxicity, ice, alien/fantasy disturbance fields.
2. Compute ecologyStressIndex.
3. Compute disturbanceReadiness and recoveryPotential.
4. Modify family suitability: forest to woodland/scrub/sparse, wetland to seasonal, grassland/open ecology, barren after severe stress.
5. Emit stress and stability proof.
```

Rules:

```text
Disturbance can shift suitability.
Disturbance cannot create Climate, Hydrology, or Terrain.
Sim Mode owns future disturbance events.
```

---

## 15. Productivity / Ecological Activity Algorithm

Algorithm:

```text
1. Combine energy-base support, thermal suitability, usable medium, substrate support, growing season, and ecology complexity.
2. Subtract stress and incompatible-medium constraints.
3. Compute primary productivity and activity categories.
4. Emit sparse/sterile/active flags.
```

Formula pattern:

```ts
primaryProductivityPotential = clamp01(
  energyBaseSupport
  * thermalSuitability
  * usableMediumAvailability
  * substrateSuitability
  * growingSeasonSupport
  * ecologyComplexityPermission
  - stressPenalty
);
```

Activity categories:

```text
STERILE,
TRACE_OR_MICROBIAL,
SPARSE,
SEASONAL_LOW,
MODERATE,
HIGH,
VERY_HIGH,
ALIEN_ACTIVE,
FANTASY_ACTIVE,
LOW_CONFIDENCE.
```

Rules:

```text
Productivity does not directly choose forest.
Productivity constrains biome families.
Barren and sparse outputs are valid.
```

---

## 16. Parallel Biome Family Suitability Algorithm

Compute all allowed family suitability fields in parallel.

Required families:

```text
forest,
woodland_scrub,
grassland_savanna_steppe,
desert_arid_scrub_playa,
tundra_polar_alpine,
wetland_marsh_swamp,
riparian_floodplain,
freshwater_edge,
coastal_shore,
reef_shallow_marine,
deep_marine,
ice_snow_ecology,
barren_sterile,
volcanic_sparse,
salt_evaporite_sparse,
alien_ecology,
fantasy_ecology,
low_confidence_ecology.
```

Suitability formula pattern:

```ts
familySuitability = clamp01(
  familyPermission
  * exposureEligibility
  * climateEnvelopeSuitability
  * usableMediumModifier
  * hydrologyModifier
  * substrateModifier
  * productivityModifier
  * stressModifier
  * specialSemanticsModifier
);
```

Each family must emit:

```text
suitability,
supportingFactors,
limitingFactors,
sourceRefs,
confidence.
```

Rules:

```text
Multiple families may be suitable at once.
Dominant candidate must not erase secondary candidates.
Mosaic and transition zones are valid.
Low-confidence areas must stay visible.
```

---

## 17. Family-Specific Resolution Rules

### 17.1 Forest / Woodland / Scrub

```text
Forest requires adequate moisture, growing season, thermal envelope, substrate, and productivity.
Dry stress can downgrade forest to woodland/scrub.
Cold stress can downgrade broad forest to boreal/taiga-like or reject it.
Sterile substrate blocks normal forest.
```

### 17.2 Grassland / Savanna / Steppe

```text
Grassland requires moderate productivity and climate/substrate support.
Savanna-like outcomes require seasonal moisture or declared analogue support.
Steppe outcomes require semi-arid/cool dry suitability.
Grassland often emerges where forest and desert/tundra suitability compete.
```

### 17.3 Desert / Dryland / Playa

```text
Desert requires aridity, water deficit, or dry-world support.
Playas require basin/dry-hydrology/salt or evaporite support.
Dryland sparse ecology requires ecology permission plus low water.
```

### 17.4 Tundra / Polar / Alpine

```text
Tundra requires cold, short growing season, snow/ice/permafrost/highland support.
Alpine requires elevation/highland context.
Polar desert requires cold plus dryness/low productivity.
```

### 17.5 Wetland / Riparian / Floodplain

```text
Wetland requires persistent or seasonal water, low slope/poor drainage, climate support, and wetland permission.
Riparian zones require river/lake proximity and water reliability.
Floodplain biomes require floodplain readiness and climate/substrate compatibility.
```

### 17.6 Marine / Reef / Ocean

```text
Marine biomes require covered medium and marine ecology permission.
Reefs require shallow marine, compatible climate/light/medium, and substrate or declared floating/alien support.
Deep marine uses deep-marine logic, not flooded terrestrial biomes.
Ocean Worlds use ocean-first ecology logic.
```

### 17.7 Barren / Sparse / Sterile

```text
Barren is selected when active ecology permission/productivity/support is absent or hostile.
Sparse is selected when productivity is low but ecology is allowed.
Sterile is selected when Foundation or constraints forbid active ecology.
```

### 17.8 Alien / Fantasy

```text
Alien/fantasy families require declared semantics and support refs.
Earthlike fallback is forbidden unless explicitly allowed.
Impossible ecology must be inspectable, diagnosable, saveable, exportable, and micro-tile readable.
```

---

## 18. Dominant / Secondary / Transition Resolver

Algorithm:

```text
1. Sort family suitability by score and confidence.
2. Select dominant candidate if top score exceeds threshold and margin over second candidate is strong.
3. Select secondary and tertiary candidates if they remain plausible.
4. If top candidates are close, classify as transition or mosaic.
5. If all active ecology families are weak, classify sparse/barren/sterile/low-confidence.
6. Preserve all supporting and limiting factors.
```

Boundary rules:

```text
Hard boundary requires hard cause: coast, ice line, substrate edge, cliff, lava field, fantasy rule boundary.
Soft climate gradients should produce ecotones or mosaics.
Dominant color preview must not erase transition metadata.
```

---

## 19. Ecotone / Mosaic Algorithm

Algorithm:

```text
1. Compare local suitability fields and neighboring suitability gradients.
2. Detect competing families with similar suitability.
3. Detect steep vs gradual source gradients.
4. Compute transition strength and boundary sharpness.
5. Emit ecotone/mosaic records and micro tile recipe hints.
```

Outputs:

```text
dominantCandidate,
secondaryCandidate,
tertiaryCandidate,
transitionStrength,
mosaicPotential,
boundarySharpness,
transitionConfidence,
edgeContinuityRefs.
```

Rules:

```text
Transition is not a bug.
Hard biome lines without hard source are suspicious.
Micro tiles should receive transition recipes instead of single-color mandates.
```

---

## 20. Alien / Fantasy Semantics Algorithm

Algorithm:

```text
1. Validate Foundation permission.
2. Validate support fields.
3. Resolve energy/medium/substrate/temperature semantics.
4. Map Climate/Hydrology/Substrate fields into declared alien/fantasy ecology semantics.
5. Compute special family suitability.
6. Record every impossible behavior as supported exception.
7. Emit semantics metadata for downstream systems.
```

Required metadata:

```text
ecologyMedium,
energyBase,
thermalEnvelopeSemantics,
moistureEnvelopeSemantics,
substrateSemantics,
productivitySemantics,
transitionSemantics,
resourceHandoffSemantics,
settlementHazardSemantics,
exportSemantics,
Create/Sim semantics.
```

Rules:

```text
Alien/fantasy ecology is not palette swapping.
Renderer color cannot be support.
Earthlike fallback is forbidden unless explicitly allowed.
```

---

## 21. Contradiction and Authority Audits

Required audits:

```text
rendererBiomeAuthority,
biomeColorSource,
resourceBiomeSource,
settlementBiomeSource,
simEcologyGenerateSource,
climateMutationAttempt,
hydrologyMutationAttempt,
terrainMutationAttempt,
forestWithoutMoisture,
forestWithoutGrowingSeason,
forestOnSterileSubstrate,
desertWithoutAridity,
wetlandWithoutHydrology,
reefWithoutShallowSea,
tundraWithoutCold,
landBiomeUnderDeepOcean,
marineBiomeOnDryHighland,
activeLifeWithoutEcologyPermission,
earthlikeBiomeFallbackOnAlienOrBarren,
transitionHardBoundaryWithoutCause,
microTileBiomeEdgeMismatch.
```

Contradiction categories:

```text
BLOCKED_SOURCE_VIOLATION,
FOUNDATION_ECOLOGY_CONTRADICTION,
CLIMATE_ENVELOPE_CONTRADICTION,
HYDROLOGY_DEPENDENCE_CONTRADICTION,
EXPOSURE_PLACEMENT_CONTRADICTION,
SUBSTRATE_CONTRADICTION,
SEMANTICS_MISSING,
DOWNSTREAM_METADATA_FAILURE,
LOW_CONFIDENCE_WARNING.
```

Hard rule:

```text
A beautiful biome map is invalid if it cannot explain climate, water, substrate, ecology permission, and source proof.
```

---

## 22. Contribution Proof

Sample proof:

```ts
interface BiomeSampleProof {
  coordinateKey: string;
  biomeMode: BiomeMode;
  dominantCandidate: string;
  secondaryCandidates: string[];
  ecologicalActivityLevel: string;
  familySuitability: Record<string, number>;
  supportingFactors: string[];
  limitingFactors: string[];
  sourceRefs: string[];
  confidence: number;
  warnings: string[];
}
```

Region proof:

```ts
interface BiomeRegionProof {
  regionId: string;
  dominantBiomeCandidates: string[];
  transitionSummary: string;
  productivitySummary: string;
  primaryLimitingFactors: string[];
  sourceRefs: string[];
  confidence: number;
}
```

World proof:

```ts
interface BiomeWorldProof {
  biomeHash: string;
  biomeModeCoverage: Record<BiomeMode, number>;
  ecologicalActivityCoverage: Record<string, number>;
  dominantCandidateCounts: Record<string, number>;
  barrenSparseSterileCoverage: number;
  transitionCoverage: number;
  contradictionSummary: string;
  sourceHashChain: BiomeSourceHashes;
}
```

Minimum diagnostic question:

```text
Why does this biome candidate exist here, and what limits it?
```

Biomes must be able to answer.

---

## 23. Downstream Handoff Algorithm

### 23.1 To Surface Materials

```text
organic matter potential,
vegetation cover potential,
peat/wet soil support,
root/bioturbation readiness,
reef-building support,
wind shielding,
weathering biological modifier,
barren/sparse cover modifier,
source refs,
confidence and warnings.
```

### 23.2 To Resources

```text
biomass potential,
forest/wetland/reef context,
peat/organic accumulation context,
forage/ecological productivity context,
desert/salt exposure context,
alien/fantasy biological resource semantics,
source refs,
confidence and warnings.
```

### 23.3 To Settlement / Movement

```text
vegetation density obstacle,
wetland obstacle,
desert hazard,
tundra/cold hazard,
forest travel penalty,
grassland openness,
water/ecology habitability precondition,
biological hazard or opportunity,
source refs,
confidence and warnings.
```

### 23.4 To Micro Tiles

```text
local dominant/secondary biome candidates,
transition/ecotone refs,
productivity/activity level,
vegetation density hints,
wetland/reef/coastal/ice/alien/fantasy refs,
edge continuity constraints,
source proof refs,
micro biome seed streams,
recipe hints.
```

### 23.5 To Export / Create / Sim

```text
biome suitability fields,
dominant/secondary candidate fields,
transition fields,
ecological activity fields,
alien/fantasy semantics,
metadata sidecar,
source hash chain,
loss report,
Create editing constraints,
Sim ecology initialization hints.
```

---

## 24. Determinism and Hashing

Hash includes:

```text
PlanetFoundationHash,
ProcessFieldSetHash,
TerrainBirthHash,
OceanBathymetryHash,
SeaLevelSolveHash,
HydrologyHash,
ClimateHash,
SurfaceMaterialReadinessHash if present,
CausalDependencyGraphHash,
Biome algorithm version,
biome mode config,
graph config,
eligibility fields,
climate envelope fields,
water/medium availability,
substrate readiness fields,
productivity/activity fields,
family suitability fields,
transition fields,
contradiction report,
downstream handoff metadata.
```

Hash excludes:

```text
renderer colors,
debug overlay colors,
resource outputs,
settlement outputs,
Sim ecology outputs,
Create/Sim uncommitted changes,
export artifact timestamps,
diagnostics-only RNG.
```

Rules:

```text
Same seed + same source hashes + same algorithm version = same BiomeHash.
Diagnostics on/off cannot change biome source.
Renderer colors cannot change biomes.
Resource and settlement systems cannot mutate Biome source.
```

---

## 25. Diagnostics

Required diagnostics:

```text
biomeInputCanonicalized,
causalGraphGateValid,
sourceHashChainValid,
climateHandoffConsumed,
hydrologyHandoffConsumed,
seaLevelHandoffConsumed,
foundationEcologyResolved,
biomeModeResolved,
biomeGraphBuilt,
exposureEligibilityBuilt,
ecologyEnergyGateBuilt,
climateEnvelopesBuilt,
waterMediumAvailabilityBuilt,
hydrologyInfluenceBuilt,
substrateReadinessBuilt,
stressDisturbanceBuilt,
productivityActivityBuilt,
familySuitabilityFieldsBuilt,
dominantSecondaryCandidatesBuilt,
ecotonTransitionFieldsBuilt,
alienFantasySemanticsBuilt,
contradictionReportBuilt,
sourceProofBuilt,
SurfaceMaterialHandoffReady,
ResourceHandoffReady,
SettlementMovementHandoffReady,
MicroTileBiomeHandoffReady,
ExportBiomeMetadataReady,
rendererBiomeAuthorityViolationCount,
biomeColorSourceViolationCount,
forestWithoutMoistureCount,
desertWithoutAridityCount,
wetlandWithoutHydrologyCount,
reefWithoutShallowSeaCount,
tundraWithoutColdCount,
landBiomeUnderDeepOceanCount,
activeLifeWithoutPermissionCount,
earthlikeFallbackViolationCount,
microTileBiomeEdgeMismatchCount.
```

---

## 26. Tests

Required tests:

```text
same inputs produce same BiomeHash,
changing Foundation ecology permission invalidates Biomes,
changing ClimateHash invalidates Biomes,
changing HydrologyHash invalidates Biomes,
changing SeaLevelSolveHash invalidates Biomes,
changing SurfaceMaterialReadinessHash invalidates substrate-dependent suitability,
Biomes cannot run without Climate handoff,
Biomes cannot read renderer colors,
Biomes cannot read biome colors as source,
Biomes cannot read resource/settlement maps as source,
Biomes cannot mutate Climate,
Biomes cannot mutate Hydrology,
Biomes cannot mutate Terrain or Sea-Level,
forest requires moisture/growing-season/substrate support,
desert requires aridity/water-deficit support,
wetland requires hydrology and climate support,
reef requires shallow marine and substrate/ecology support,
tundra requires cold/short-season/cryosphere support,
land biome cannot occupy deep ocean,
marine biome cannot occupy dry highland,
no ecology permission produces barren/sterile or blocked active ecology,
alien/fantasy biomes require declared semantics,
transitions derive from gradients or supported hard boundaries,
limiting factors are reported,
micro tile biome edge constraints are preserved,
downstream handoffs include source hashes.
```

Regression tests:

```text
green forest color without climate support fails,
yellow desert color without aridity support fails,
wetland color blend without hydrology fails,
reef color without shallow sea fails,
tundra color without cold support fails,
random alien palette ecology fails,
all-world green ecology on barren/no-atmosphere worlds fails,
biomes hiding failed climate fail,
biomes hiding failed hydrology fail,
micro tile biome mismatch fails.
```

---

## 27. Artifacts

Required artifacts:

```text
biome-operational-input.json
biome-sampling-graph.json
exposure-cover-eligibility-fields.json
ecology-energy-gate-fields.json
biome-climate-envelope-fields.json
water-medium-availability-fields.json
hydrology-biome-influence-fields.json
substrate-biome-readiness-fields.json
stress-disturbance-fields.json
productivity-ecological-activity-fields.json
biome-family-suitability-fields.json
biome-dominant-secondary-candidates.json
ecotone-transition-fields.json
alien-fantasy-biome-semantics.json
biome-contribution-proof.json
biome-contradiction-report.json
biome-downstream-handoffs.json
biome-operational-diagnostics.json
```

Optional overlays:

```text
dominant biome preview,
secondary biome preview,
suitability preview,
productivity preview,
limiting factor preview,
transition/ecotone preview,
barren/sparse preview,
alien/fantasy preview,
invalid authority overlay.
```

Overlays are diagnostic only.

---

## 28. Failure Modes

Biome Operational Algorithm fails if:

```text
it paints biomes from colors,
it uses renderer or old biome maps as source,
it creates climate,
it creates rivers,
it ignores Climate,
it ignores Hydrology,
it ignores Sea-Level exposure,
it ignores substrate readiness,
it forces active life everywhere,
it places forests without moisture,
it places deserts without aridity,
it places wetlands without hydrology,
it places reefs without shallow sea,
it places land biomes under deep ocean,
it defaults alien/fantasy ecology to Earth,
it gives downstream systems biomes without source proof.
```

Catastrophic failure:

```text
The planet looks alive because it is colored like Earth, but ecology is not causally supported by climate, water, terrain, substrate, and world rules.
```

---

## 29. Summary Law

```text
Biome Operational Algorithm turns climate-water-terrain-substrate-world-rule consequences into ecological suitability.

It gates ecology permission.
It computes exposure eligibility.
It computes climate envelopes.
It computes water and medium availability.
It consumes hydrology and substrate.
It computes productivity and ecological activity.
It scores biome families in parallel.
It resolves dominant, secondary, transition, sparse, barren, marine, alien, and fantasy outcomes.
It emits proof and downstream constraints.

It must never become color paint, fake climate, fake water, fake soil, resource placement, or civilization logic.
```
