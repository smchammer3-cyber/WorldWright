# Stage 2 Complete Reference Coverage Matrix

## Status

- **Status:** SPECIFICATION DRAFT — BLOCKED PENDING USER APPROVAL AND ASSET LICENSING
- **Reference generation:** NOT STARTED
- **Purpose:** define the complete family of generated and observational comparison cases needed to evaluate the future causal generator.

## 1. Required case classes

Every major domain must include applicable cases from these classes.

### POSITIVE CANONICAL

A clear, causally coherent example of the process/system.

### CONTROLLED VARIABLE SWEEP

One major variable changes while other state remains controlled.

### INTERACTION

Two or more systems reinforce, oppose, or condition one another.

### TEMPORAL SEQUENCE

Formation, active evolution, waning, fossil, burial, exhumation, or reactivation.

### VALID EXCEPTION

An unusual but physically caused morphology that resembles a procedural failure.

### AMBIGUOUS ANALOGUE

Similar appearance from different causes, requiring provenance.

### NEGATIVE PROCEDURAL FAILURE

A deliberately invalid kernel, mask, texture, topology, history, conservation, projection, or contradiction case.

### PLANETARY REGIME COMPARISON

The same process under different gravity, atmosphere, water/ice, heat, tectonic, rotation, or impact states.

## 2. Required metadata for every case

```text
caseId
title
domainIds
caseClass
confidenceClass
sourceOrSpecificationRefs
baseRegime
overlays
planetaryPremise
formationEvents
currentState
scaleViews
controlledVariables
expectedMorphology
requiredRelationships
materialAndWaterLedgers
validVariation
forbiddenSignatures
assetLicenseStatus
reviewStatus
reviewerNotes
```

## 3. Foundations and planetary regimes

| Case family | Required positive/threshold cases | Required exceptions/negatives |
|---|---|---|
| Mass, radius, gravity | low/moderate/high gravity with fixed and varying lithosphere/material | gravity-only height scaling; large planet automatically plate tectonic |
| Internal heat | low, moderate, high, tidal, pulsed, waning | heat → random roughness/volcano density |
| Lithosphere/rheology | thin/weak, thick/strong, heterogeneous, hydrated/dry | age → strength only; smoothness → strength |
| Mobile lid | complete ridge–transform–trench/collision topology | disconnected boundaries; arcs without slabs |
| Stagnant lid | hot active plume/province and cold ancient contraction branches | dead flat shell; Earth plate network |
| Episodic lid | quiescence → overturn → resurfacing → recovery | uniform one-age surface; extra-volcano stagnant lid |
| Deformable lid | diffuse strain, intrusion weakening, patchy resurfacing | Venus colors over Earth plates; corona stamps |
| Heat pipe | emplacement, burial, vertical age stack, low crater retention | many volcanoes with ancient exposed craters |
| Contraction world | global strain budget, scarps, basin reactivation | random scarps; active volcanism without heat source |
| Regime transition | inherited terrain across regime change | present-regime-only surface; deleted history |

## 4. Hypothetical overlays and confidence

| Case family | Required cases | Required failures |
|---|---|---|
| Water inventory | dry, shallow ocean, exposed continents, drowned continents, deep waterworld | flood finished Earth map; water color mask |
| Atmosphere | airless, thin, Earthlike, dense-hot | atmosphere as haze only; incompatible rivers/dunes |
| Tidal heating | weak, regional, Io-like, waning | uniform heat; no orbital source; no resurfacing |
| Rotation/locking | rapid, slow, high-obliquity, locked with heat transport variants | global bands; uniform locked climate |
| Cryosphere | land ice, global ice, ice shell, transient melt | frozen Earth terrain; basaltic cryovolcano templates |
| Impact environment | high early flux, low late flux, saturation, resurfaced | crater density independent of history |
| Confidence | observed, inferred, model, extrapolated, speculative branch pairs | confidence flattening |
| Contradictions | explicit allowed/forbidden combinations | silent incompatible feature coexistence |

## 5. Crust, provinces, and topographic support

| Case family | Required cases | Required failures |
|---|---|---|
| Continental/oceanic/transitional crust | thickness/density/composition combinations | crust type → direct height; terrain-derived crust |
| Cratons/mobile belts/terranes | old stable, reactivated, buried, accreted, rifted descendants | round province embossing; age smoothing |
| Isostasy | Airy/Pratt/mixed/local/regional/nonequilibrium | thickness = elevation; universal compensation |
| Flexure | loads of differing geometry/age/rigidity; sediment/ice/volcano/foreland | universal moat; distance ring; double-counted response |
| Dynamic support | broad positive/negative, active/decayed, crustally ambiguous | low-frequency noise renamed dynamic topography |
| Delamination/breakoff | uplift–volcanism–collapse sequences and controls | direct thickness threshold; circular uplift stamp |

## 6. Plate boundaries and orogeny

| Case family | Required cases | Required failures |
|---|---|---|
| Ridges | fast/slow/ultraslow, segmented, propagating, hotspot interaction, fossil | uniform stripe; distance-age basin |
| Rifts | narrow/wide, magma-rich/poor, failed/successful, asymmetric | simple trench/ridge pair; universal shoulder uplift |
| Subduction | ocean–continent/ocean–ocean, accretionary/erosive, rollback/flat slab, oblique | generic trench kernel; identical cones; empty forearc |
| Transforms | oceanic active/fossil fracture zone, continental multi-strand, bends/stepovers | flat line; blur for diffuse boundary |
| Collision | prowedge/retrowedge, plateaus, syntax/escape, hot/cold orogens | radial mountain blob; mirror symmetry; boundary ridge |
| Ancient orogens | eroded, glaciated, buried, exhumed, rifted, reactivated | young belt with reduced amplitude; old = smooth |

## 7. Volcanism

| Case family | Required cases | Required failures |
|---|---|---|
| Melt/plumbing | decompression/flux/crustal/tidal; intrusive/extrusive ratios | magma supply = lava; one spherical chamber |
| Edifices | shield, composite, monogenetic, dome, fissure, asymmetric/eroded | universal cone; smooth radial dome |
| Calderas/collapse | basaltic/silicic, nested, trapdoor/piecemeal, sector collapse | crater stamp; collapse without deposit |
| Hotspots | oceanic/continental, moving/fixed-source end members, pulsed/gapped chains | perfect beads; universal fixed source |
| LIPs | flood basalt, oceanic plateau, volcanic margin, intrusive-dominant | giant volcano; uniform lava disk; mandatory hotspot tail |
| Planetary volcanism | Mars/Venus/Io/airless/dense/thin atmosphere/gravity comparisons | Earth rescale; preserved cone overload on heat-pipe world |
| Valid radiality | shield/rift/dike/swell/flexure at correct scales | local radiality leaking globally |

## 8. Oceans, margins, and sea level

| Case family | Required cases | Required failures |
|---|---|---|
| Structural bathymetry | young/old crust, ridge/fabric, sediment/dynamic/volcanic departures | depth-class geology; basin bowl; noise carpet |
| Shelves/margins | passive active transform; magma-rich/poor; glacial/carbonate/volcanic | shelf halo; continent ghost; universal break depth |
| Slopes/canyons/rises | source-connected, tectonic, glacial, current, high/lowstand | canyon scratches; rise without sediment |
| Abyssal plains | sediment-rich/poor, currents, fans, buried basement | abyssal blur; basement deletion |
| Water solve | connected oceans, isolated basins, spill/merge, ice storage, basin change | quantile ocean; global bathtub; double count |
| Shore exposure | transgression/regression, steep/shallow margins, fossil shorelines | uniform coastline buffer |

## 9. Rivers, weathering, sediment, fans, and deltas

| Case family | Required cases | Required failures |
|---|---|---|
| Drainage | integrated/internal, capture/divide migration, antecedent/superposed, lakes/outbursts | draped rivers; immutable divides; every basin ocean-bound |
| Incision | detachment/transport/mixed, sediment tools/cover, thresholds/transients | stream-power canyon stamp; equilibrium profiles only |
| Weathering/regolith | physical/chemical, thin/thick, stripped/buried, climate/material variants | weathering as color; old = smooth |
| Hillslopes | soil creep, bedrock cliffs, threshold failures, landslides/debris flows | uniform blur; scar without deposit |
| Sediment routing | supply/transport limited, storage, sorting, compaction, basin fill | sediment nowhere; instant routing; flat target fill |
| Floodplains | meandering/braided/anabranching, migration/terraces | uniform flat lowland |
| Fans | debris/stream/sheet/mega/coalesced, active/fossil | radial fan stamp; no apex/supply |
| Deltas | river/wave/tide/mixed, lake/marine/fan delta, lobe switching/drowning | triangle icon; static distributaries; no accommodation |

## 10. Glacial and periglacial

| Case family | Required cases | Required failures |
|---|---|---|
| Ice flow | valley, ice cap, sheet, outlet, stream; cold/warm/polythermal | temperature mask; flow crossing impossible divides |
| Erosion/preservation | selective erosion, U-valley/fjord, preserved cold-based uplands | universal U filter; continental planation |
| Deposits | till, moraines, drumlins, eskers, outwash, marine fans | moraine rings; lineation texture without flow |
| Hydrology | subglacial lakes/channels/outbursts | flood channels without water source |
| Isostasy | loading, forebulge, rebound, tilted shorelines | rebound without load; ice-water double count |
| Periglacial | permafrost, active layer, patterned ground, thermokarst/thaw failure | frozen color only; thermokarst = carbonate karst |
| Planetary | Earth/Mars/low-high gravity/thin atmosphere/ice-shell-adjacent | Earth glacier rescale |

## 11. Aeolian and arid systems

| Case family | Required cases | Required failures |
|---|---|---|
| Threshold/transport | initiation/cessation, saltation/suspension, cohesive/moist/crusted surfaces | wind speed alone; transport without sediment |
| Dunes | all major dune families and mixed/relict generations | tiled dunes; one wind vector stripes |
| Deflation | hollows, lag, playas, supply exhaustion | endless bedrock lowering; no exported dust |
| Yardangs | material/structure/wind/abrasive supply variants | directional noise ridges |
| Dust | sources, storms, loess/mantles, ice-albedo branch | dust from wet/resistant surfaces |
| Planetary | Earth/Mars/Titan/Venus-candidate/locked/airless negative | ordinary dunes on airless world; analogue blending |

## 12. Coasts, tides, and reefs

| Case family | Required cases | Required failures |
|---|---|---|
| Beaches | reflective/dissipative/intermediate/gravel/pocket/reef-controlled | fixed beach band |
| Sediment cells | source/transport/sinks, divergence/convergence, canyon loss | independent shoreline cells; source-free beaches |
| Barriers/inlets | rollover/progradation/breach/drowning, tidal variants | parallel stripes; random inlets |
| Rocky/tectonic/volcanic/glacial coasts | cliffs, platforms, terraces, lava/fjord systems | retreat without debris; all inlets alike |
| Tides/estuaries | basin/rotation/geometry variants | global fixed tide; widened river-mouth estuary |
| Reefs/carbonates | fringing/barrier/atoll/platform, growth/drowning/burial | latitude-only reef mask |
| Extreme events | storm and tsunami erosion/deposits/recovery | one-pass erosion without deposits/recovery |
| Exotic fluids/gravity | low/high gravity, dense/thin atmosphere, Titan-like | Earth coastal template everywhere |

## 13. Karst and groundwater

| Case family | Required cases | Required failures |
|---|---|---|
| Material/chemistry | limestone/dolomite/gypsum/salt/exotic branches | identical rates/forms |
| Recharge/flow | diffuse/focused, conduit/matrix, flood/seasonal | cave graph without recharge/outlet |
| Caves | phreatic/vadose/epiphreatic/maze/multilevel/collapse | generic noise tunnels |
| Sinkholes | solution/subsidence/cover collapse/bedrock collapse | evenly spaced circles; collapse without void/debris |
| Surface exchange | sinking streams, springs, dry valleys, poljes | disappearing water with no destination |
| Coastal/fossil | drowned, filled, exhumed, reactivated | current water table explains all levels |
| Lookalikes | lava tubes, thermokarst, impact/volcanic pits, piping | shape-only karst label |

## 14. Impacts

| Case family | Required cases | Required failures |
|---|---|---|
| Scaling | strength/gravity/mixed, porous/layered targets | one diameter kernel |
| Morphology | simple/complex/peak-ring/multi-ring | decorative peaks/rings |
| Ejecta | proximal/distal/rays/secondaries/atmospheric/ocean/ice | ejecta without mass; every small crater primary |
| Crust/melt | shock, melt, hydrothermal, mascon/crustal modification | impact lava classified volcanic; gravity copied from shape |
| Degradation | erosion/burial/lava/faulting/relaxation/exhumation/saturation | age blur; unlimited accumulation |
| Planetary | airless/Earth/Mars/Venus/ice/waterworld/gravity | universal crater shape |
| Valid radiality | rim/rings/rays/fractures with event provenance | impact kernels leaking globally |

## 15. Climate, time, and overprinting

| Case family | Required cases | Required failures |
|---|---|---|
| Orography | windward/lee, barrier geometry, moisture/seasonality | symmetric precipitation ring |
| Climate extremes | background versus event-dominated erosion | mean-only surface process |
| Feedback | erosion/loading, dust, ice, weathering, volcanism/impact | one-sign or direct-height feedback |
| Climate history | fossil rivers/glaciers/dunes/reefs under changed climate | present-climate fallacy |
| Age dimensions | material/structure/exposure/activity comparisons | single age scalar |
| Burial/exhumation | conceal/reveal/inverted relief/paleosurfaces | buried state deleted |
| Event order | controlled noncommutative sequences | summed unordered offsets |
| Reactivation | inherited faults/rifts/craters/valleys | original event simply restored |

## 16. Multiscale and procedural diagnostics

| Case family | Required cases | Required failures |
|---|---|---|
| Scale ownership | planetary→continental→regional→local refinement | upsample + noise authority |
| Subgrid state | density/orientation/material/age/flux refinement | generic noise summary |
| Sphere/projection | poles, seams, tile/face crossings, cell-area flux | seam breaks; latitude scaling |
| Topology | plate/fault/river/coast/ice/karst/event graphs | plausible pixels without connectivity |
| Conservation | crust/magma/sediment/water/ice/impact ledgers | unexplained residuals |
| Provenance | source→event→field→layer→render trace | renderer causality |
| Earliest failure | staged bad-output examples | final-only diagnosis |
| Repetition | multi-seed/template similarity tests | tiling and motif repetition |
| Numerical behavior | diffusion, ringing, banding, clipping | halos/checkerboards/terraces |
| Confidence | branch labels and speculative controls | equal authority across evidence classes |

## 17. Required scale views per reference case

Each applicable case must include:

- full globe;
- orthographic alternate hemisphere;
- polar view;
- seam/face-boundary view;
- continental/basin crop;
- regional system crop;
- local refinement crop;
- raw graph/field view;
- bedrock/deposit/water/ice separation;
- age/provenance view;
- final physical and rendered views.

## 18. Required comparison forms

- same seed, one-variable change;
- different seed, same premise;
- same present premise, different history;
- different cause, similar morphology;
- same cause, different planetary overlay;
- legacy-versus-causal generator;
- valid exception versus procedural lookalike;
- pre- and post-reconciliation pass;
- raw physical state versus final renderer.

## 19. Licensing gate

No external visual asset enters Stage 2 until the licensing register contains:

- exact asset/product identity;
- rights holder;
- license/public-domain statement;
- permitted transformations;
- attribution;
- redistribution terms;
- version/access date;
- reviewer decision.

Project-generated references must store seed, commit, schema, premise, event history, case ID, and review status.

## 20. Approval rule

Stage 2 may begin only after:

1. this matrix is reviewed against every Stage 1 domain;
2. missing positive, threshold, interaction, temporal, exception, and negative cases are resolved;
3. licensing strategy is approved;
4. the causal architecture implementation reaches the required diagnostic maturity;
5. the user explicitly approves reference generation.