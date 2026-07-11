# Dynamic topography and long-wavelength support

## Research status

- **Domain ID:** V03, with links to F03–F05, G01–G05, O01–O05, X02–X03
- **Status:** IN RESEARCH
- **Stage 2 generation:** BLOCKED
- **Purpose:** define how mantle flow can raise, lower, or tilt the surface independently of simple crustal compensation.

## 1. Definition

Dynamic topography is the component of surface elevation produced by stresses from mantle flow.

It is usually inferred as a residual after attempting to remove other contributions such as:

- crustal-thickness and density effects;
- lithospheric thermal structure;
- sediment and water loading;
- elastic flexure;
- glacial isostatic adjustment;
- volcanic or tectonic loads.

This makes dynamic topography fundamentally different from an directly observed feature map.

## 2. Central Stage 1 rule

> Dynamic topography is a support mechanism and a residual inference, not a terrain texture.

WorldWright must not create it by applying a broad smooth noise field and labeling the result “mantle flow.”

A valid dynamic-topography scenario needs a causal mantle-flow state and must be evaluated together with crustal and lithospheric structure.

## 3. Why the quantity is uncertain

Davies et al. found that most Earth topography is explained by isostatic crust/lithosphere structure, while a distinct mantle-flow contribution remains. Their oceanic residual-topography analysis estimated stronger long-wavelength than shorter-wavelength power and showed that predictive models only reconciled with observations when lithospheric structure was included.

Other studies have inferred smaller amplitudes or different spatial patterns. The disagreement reflects sensitivity to:

- the reference model removed from observed elevation;
- crustal and sediment corrections;
- oceanic-plate cooling model;
- mantle-density model;
- viscosity structure;
- boundary conditions;
- treatment of lithospheric filtering;
- data coverage and wavelength selection.

Stage 1 implication:

- dynamic-topography amplitude must remain a confidence-bounded scenario parameter;
- competing inference methods must not be averaged into one false certainty;
- Stage 2 should represent broad low/moderate/high branches only after the full source pass.

## 4. Mechanisms

## 4.1 Mantle upwelling

Hotter or compositionally buoyant mantle rising beneath the lithosphere can exert upward normal stress.

Potential surface associations:

- broad regional swell;
- plateau or superswell support;
- uplift extending beyond volcanic centers;
- altered drainage gradients;
- emergence or regression of shallow seas;
- long-wavelength tilting.

A mantle upwelling does not require a visible central volcano, although magmatism may accompany it.

## 4.2 Mantle downwelling and slabs

Cold dense mantle sinking beneath a region can exert downward stress.

Potential surface associations:

- broad subsidence;
- continental or oceanic basin development;
- shoreline transgression;
- tilting toward subduction systems;
- drainage reversal or capture over long time scales.

The surface low need not lie directly on the trench or plate boundary because mantle flow is three-dimensional and wavelength-dependent.

## 4.3 Small-scale convection

Shallower or shorter-wavelength convection beneath the lithosphere can produce more regional uplift and subsidence than deep whole-mantle flow.

Its expression may interact strongly with:

- plate age;
- lithosphere thickness;
- rifted margins;
- sedimentary basins;
- erosion and drainage.

## 4.4 Plumes and superswells

A plume-related region may combine:

- thermal buoyancy;
- dynamic support;
- volcanic construction;
- lithospheric thinning;
- crustal underplating;
- flexural loading by later volcanic edifices.

These must be separated in the audit. A broad swell and a volcanic plateau are not the same causal layer.

## 5. Wavelength and amplitude

Dynamic topography is generally expected to be broad relative to local mountains, faults, valleys, or craters.

Davies et al. report larger power at very long wavelengths and a substantial decrease toward shorter wavelengths in their Earth oceanic estimate.

Stage 1 safe inference:

- dynamic topography should primarily alter regional to planetary baselines;
- it may tilt or elevate a pre-existing geological system;
- it should not directly manufacture detailed ridge-and-valley terrain;
- shorter-wavelength dynamic effects remain possible but require lithosphere and shallow-convection context.

No universal numeric wavelength or amplitude threshold is approved for other planets.

## 6. Interaction with crustal architecture

The observed surface is a superposition:

```text
crustal/isostatic elevation
+ flexural response
+ dynamic mantle support
+ active tectonic stress
+ volcanic/impact construction
- erosion and subsidence
+ sediment/ice/water loading effects
```

This is conceptual, not a license to linearly add arbitrary maps.

Important cases:

- thick crust plus positive dynamic support;
- thick crust but negative mantle support;
- thin crust raised dynamically;
- stable craton tilted by mantle flow;
- oceanic plateau combining crustal thickening and dynamic uplift;
- basin whose subsidence exceeds what crustal thinning alone predicts.

## 7. Interaction with sea level and shorelines

Dynamic topography can change relative sea level by moving the solid surface.

Potential consequences:

- marine transgression over continental interiors;
- regression and emergence;
- changing shelf width;
- migration of drainage outlets;
- isolation or connection of basins;
- preservation of marine sediments above current sea level;
- long-term shoreline tilting.

WorldWright implication:

> Sea-level history cannot be reconstructed from water volume alone when long-wavelength vertical motion is active.

Stage 1 must later cross V03 with X02.

## 8. Interaction with drainage

Broad uplift or tilt can reorganize drainage even when local mountain structure remains unchanged.

Possible responses:

- river incision following uplift;
- drainage reversal;
- divide migration;
- basin capture;
- rerouting toward a newly lowered margin;
- preservation of antecedent channels through slowly rising terrain.

A valid dynamically tilted landscape should preserve local geological textures while changing long-wavelength gradients.

Procedural failure:

- rotating or tilting the final heightmap without updating drainage, sediment, coastlines, and erosion history.

## 9. Temporal behavior

Dynamic topography can migrate as mantle structures and plates move.

Possible sequence:

1. onset of broad uplift/subsidence;
2. shoreline and drainage response;
3. erosion or sediment accumulation;
4. migration or reversal of the forcing;
5. inherited river profiles, terraces, or stratigraphic sequences;
6. partial relaxation or replacement by another support mechanism.

The fossil landscape may preserve a former dynamic field after the current mantle state changes.

## 10. Non-Earth application

Dynamic topography on other rocky planets is harder to infer because:

- gravity and topography data may be lower resolution;
- crustal thickness is less certain;
- mantle structure is poorly constrained;
- surface ages and resurfacing histories differ;
- plate tectonics may be absent;
- elastic lithospheres may be thicker;
- impacts and volcanism may dominate residual signals.

Stage 2 must label non-Earth dynamic topography as:

- observationally constrained;
- model-supported;
- speculative scenario branch.

It must not project Earth amplitudes unchanged onto other worlds.

## 11. Venusian highlands as a caution

Maia and Wieczorek found that several Venusian crustal plateaus can be explained mainly by crustal thickening at the studied wavelengths, while one region required an additional buoyant layer in their preferred interpretation.

The important lesson is not that Venusian plateaus are all isostatic or all dynamically supported.

It is:

> Similar broad highlands must be tested against multiple support models.

## 12. Planetary and multiscale visual obligations

## 12.1 Planetary scale

- broad hemispheric or multi-thousand-kilometer elevation components;
- large-scale tilting of continents or basins;
- swell and depression systems linked to mantle flow;
- interaction with global hypsometry.

## 12.2 Continental/basin scale

- uplifted plateaus and swells;
- basin-wide subsidence;
- margin tilting;
- altered shoreline position;
- drainage reorganization.

## 12.3 Regional scale

- river-profile adjustment;
- sedimentary unconformities and transgressive/regressive sequences;
- uplifted or drowned surfaces;
- local departures from crust-thickness predictions.

## 12.4 Local scale

Dynamic topography generally supplies background vertical motion rather than a unique local texture. Local surface expression comes through:

- erosion;
- river incision;
- sedimentation;
- faulting;
- coastlines;
- volcanism;
- pre-existing lithology.

## 13. Threshold and interaction axes

## 13.1 Dynamic support amplitude

- negligible: surface controlled primarily by crust, loads, and erosion;
- low: subtle baseline shifts or tilting;
- moderate: regional elevation, shoreline, and drainage effects;
- high: major swell/subsidence systems and broad reorganization;
- extreme: requires scrutiny for model plausibility and possible overlap with plumes, lithospheric thinning, or active tectonics.

## 13.2 Wavelength

- planetary/hemispheric;
- continental;
- regional;
- shallow-convection shorter wavelength.

A scenario should specify which mantle depth and lithosphere state are meant to support the chosen wavelength.

## 13.3 Lithospheric filtering

- thin/weak lithosphere: greater response to shorter-wavelength forcing;
- thick/strong lithosphere: stronger smoothing/filtering and broader surface response;
- heterogeneous lithosphere: spatially varying amplitude and wavelength.

## 13.4 Surface-process response

Cross dynamic uplift/subsidence with:

- arid versus humid erosion;
- high versus low sediment supply;
- glacial versus nonglacial climate;
- stable versus changing sea level;
- active versus fossil drainage.

## 14. Required audit metadata

Future references involving dynamic support should record:

- mantle-flow class: upwelling, downwelling, plume, slab, small-scale convection, uncertain;
- forcing wavelength;
- amplitude class and uncertainty;
- inference type: observed residual, numerical model, synthetic scenario;
- crustal correction model;
- lithospheric correction/filter model;
- sediment/water correction;
- active versus inherited state;
- migration direction/rate class;
- drainage and shoreline response state;
- competing interpretations.

## 15. Procedural failure signatures

### 15.1 Smooth-noise uplift
A low-frequency noise field is added to terrain with no mantle-flow or geological relationship.

### 15.2 Circular plume mask leakage
A radial falloff remains directly visible as a continent-scale dome.

### 15.3 Dynamic support creates local texture
The field directly adds ridges, valleys, or roughness instead of shifting the background elevation and process gradients.

### 15.4 Crust and mantle support double-counted
Thick crust is converted to elevation, then the same province receives unrelated positive dynamic uplift because both inputs share an authority mask.

### 15.5 Drainage and coastline inconsistency
Terrain is tilted after hydrology and sea-level response, leaving rivers flowing uphill or shorelines unrelated to elevation.

### 15.6 Universal amplitude
Every world receives Earth-like dynamic-topography magnitude regardless of gravity, rheology, regime, or confidence.

### 15.7 Residual treated as observable truth
A model-dependent inferred field is labeled as a measured geological feature.

## 16. Stage 2 coverage obligations

Future generation must eventually include:

- no-dynamic-support control;
- broad upwelling swell;
- broad downwelling basin;
- plume swell with and without major volcanism;
- slab-related continental tilting;
- small-scale convection beneath a basin or margin;
- thin versus thick lithosphere filtering;
- active versus migrated/fossil forcing;
- shoreline and drainage threshold sequences;
- mixed crustal and dynamic support cases;
- competing interpretations of the same visible topography.

### Required negative controls

- smooth random swell;
- direct radial mantle mask;
- dynamic field painted as local mountains;
- double-counted thick-crust uplift;
- terrain tilted without hydrologic response;
- Earth amplitude copied to all planet classes.

## 17. Unresolved questions

1. Which dynamic-topography inference datasets are sufficiently robust and reusable?
2. What confidence bands should define low/moderate/high amplitude?
3. How should wavelength depend on mantle depth and lithosphere structure in the scenario schema?
4. Which stagnant-lid worlds should allow dynamic topography distinct from plume construction?
5. How should moving mantle forcing interact with WorldWright's geological time model?
6. What observable diagnostics can distinguish dynamic support from crustal thickening?
7. How should sea-level and drainage systems preserve fossil dynamic motion?
8. Which model disagreements need separate Stage 2 branches?
9. Can dynamic support be inferred from final imagery alone, or must causal layers always be required?
10. Which topographic wavelengths can WorldWright's grid resolve without aliasing?

## 18. Conclusions safe enough to carry forward

### High confidence

- dynamic topography is distinct from isostatic crustal support;
- it is usually inferred after other contributions are removed;
- lithospheric structure strongly affects the surface response;
- it is primarily a broad vertical-motion control, not a local texture generator;
- it can influence shorelines, drainage, erosion, and sedimentation;
- similar highlands may be crustally, flexurally, dynamically, volcanically, or jointly supported.

### Model-dependent or disputed

- amplitude and spatial pattern on Earth;
- relative importance of deep versus shallow mantle flow;
- dynamic support beneath specific continental plateaus;
- amplitudes on non-Earth bodies;
- residual fields inferred with different correction methods.

### Not approved

- universal amplitude ranges;
- direct dynamic-topography masks in final terrain;
- image-only diagnosis of mantle support;
- numeric CI thresholds;
- reference-image generation.

## Sources

See `../sources/source-register.md`, especially SRC-C-002 through SRC-C-005 and SRC-C-015.
