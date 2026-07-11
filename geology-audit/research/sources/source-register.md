# Stage 1 source register

## Purpose

This register tracks sources used to establish geological rules and Stage 2 coverage requirements. Inclusion here does not automatically mean every interpretation in a source is accepted.

## Evidence labels

- `OBSERVATION` — direct mapped, measured, or mission-derived evidence
- `PROCESS` — physical or numerical explanation of how a feature forms
- `SYNTHESIS` — review or authoritative overview
- `COMPETING MODEL` — useful specifically because the conclusion is debated
- `DATASET` — reusable scientific data product
- `METHOD` — inference or measurement method whose assumptions must be tracked

## Review states

- `QUEUED`
- `SCREENED`
- `EXTRACTED`
- `CROSS-CHECKED`
- `ACCEPTED FOR SPEC`
- `LIMITED USE`
- `REJECTED`

## First tranche: planetary foundations and geodynamic regimes

| ID | Source | Type | State | Use in Stage 1 | Important limitation |
|---|---|---|---|---|---|
| SRC-F-001 | USGS, *Understanding plate motions*, https://pubs.usgs.gov/gip/dynamic/understanding.html | SYNTHESIS / OBSERVATION | EXTRACTED | Establishes Earth plate-boundary families and major surface associations | Earth-specific educational synthesis; not a scaling law for exoplanets |
| SRC-F-002 | USGS, *The Himalayas: Two continents collide*, https://pubs.usgs.gov/gip/dynamic/himalaya.html | SYNTHESIS / OBSERVATION | EXTRACTED | Continental-collision orientation and active Earth analogue | One end-member collision system |
| SRC-F-003 | NASA, *InSight Science*, https://science.nasa.gov/mission/insight/science/ | OBSERVATION / MISSION | EXTRACTED | Establishes why crust, mantle, heat flow, and seismic activity must be separate planetary parameters | Mission measurements are Mars-specific |
| SRC-F-004 | NASA, *GRAIL (Ebb and Flow)*, https://science.nasa.gov/mission/grail/ | DATASET / OBSERVATION | EXTRACTED | Demonstrates gravity + topography + modeling as a route to crustal/impact interpretation; confirms hidden mass structure matters | Lunar impact-dominated body, not an Earth analogue |
| SRC-F-005 | NASA, *Venus: Facts*, https://science.nasa.gov/venus/venus-facts/ | OBSERVATION / SYNTHESIS | EXTRACTED | Venus as a tectonically and volcanically modified non-Earth end member | Some Venus tectonic interpretations remain contested |
| SRC-F-006 | Valencia, O'Connell & Sasselov (2007), *Inevitability of Plate Tectonics on Super-Earths*, https://arxiv.org/abs/0710.0699 | PROCESS / COMPETING MODEL | EXTRACTED | One model branch in which increasing mass favors thinner plates and stronger driving stress | Strong conclusion depends on modeling assumptions; must not become deterministic rule |
| SRC-F-007 | O'Neill & Lenardic (2007), *Geological consequences of super-sized Earths*, Geophysical Research Letters | PROCESS / COMPETING MODEL | QUEUED | Counter-branch in the super-Earth tectonic-regime debate | Full source extraction still required |
| SRC-F-008 | Korenaga (2010), *On the likelihood of plate tectonics on super-Earths: Does size matter?*, Astrophysical Journal Letters | PROCESS / COMPETING MODEL | QUEUED | Challenges simple size-only tectonic predictions | Full source extraction still required |
| SRC-F-009 | van Heck & Tackley (2011), *Plate tectonics on super-Earths: Equally or more likely than on Earth*, Earth and Planetary Science Letters | PROCESS / COMPETING MODEL | QUEUED | Additional numerical branch for mass/rheology dependence | Model-dependent; full extraction required |
| SRC-F-010 | Tackley et al. (2012), *Mantle Dynamics in Super-Earths: Post-Perovskite Rheology and Self-Regulation of Viscosity*, https://arxiv.org/abs/1204.3539 | PROCESS | SCREENED | Shows deep-mantle pressure/rheology and thermal self-regulation complicate simple scaling | Numerical model; surface morphology implications are indirect |
| SRC-F-011 | Tosi et al. (2017), *The habitability of a stagnant-lid Earth*, https://arxiv.org/abs/1707.06051 | PROCESS | EXTRACTED | Establishes stagnant-lid planets as dynamically evolving worlds with volcanism/outgassing, not “dead planets” | Focuses habitability and thermal evolution more than morphology |
| SRC-F-012 | Foley & Smye (2017), *Carbon cycling and habitability of Earth-size stagnant lid planets*, https://arxiv.org/abs/1712.03614 | PROCESS | SCREENED | Supports long-lived volcanic/outgassing evolution under stagnant lid | Climate/carbon focus; morphology indirect |
| SRC-F-013 | Tosi & Padovan (2019), *Mercury, Moon, Mars: Surface expressions of mantle convection and interior evolution of stagnant-lid bodies*, https://arxiv.org/abs/1912.05207 | SYNTHESIS | SCREENED | Cross-body stagnant-lid surface-expression framework | Chapter/review; underlying cases must still be traced |
| SRC-F-014 | Tian, Tackley & Lourenço (2023), *The Tectonics and Volcanism of Venus: New Modes Facilitated by Realistic Crustal Rheology and Intrusive Magmatism*, https://arxiv.org/abs/2302.10821 | PROCESS / COMPETING MODEL | EXTRACTED | Demonstrates that crustal rheology can shift Venus models among stagnant, episodic, and deformable episodic regimes | Venus-focused numerical model; not universal |
| SRC-F-015 | Moore & Webb (2013), *Heat-pipe Earth*, Nature | PROCESS / COMPETING MODEL | QUEUED | Candidate early-world volcanic cooling regime | Early-Earth applicability debated; must be kept separate from established Io observations |
| SRC-F-016 | Moore, Simon & Webb (2017), *Heat-pipe planets*, Earth and Planetary Science Letters | PROCESS | QUEUED | General heat-pipe planetary regime and Stage 2 scenario branch | Full extraction required |
| SRC-F-017 | O'Reilly & Davies (1981), *Magma transport of heat on Io: A mechanism allowing a thick lithosphere*, Geophysical Research Letters | PROCESS / OBSERVATION | QUEUED | Physical basis for Io heat-pipe interpretation | Old model; must be cross-checked with later Io data |
| SRC-F-018 | Meier et al. (2021), *Hemispheric Tectonics on super-Earth LHS 3844b*, https://arxiv.org/abs/2103.02374 | PROCESS | SCREENED | Demonstrates a possible geodynamic regime driven by extreme day–night thermal contrast | Exoplanet-specific model; currently no direct surface map validation |
| SRC-F-019 | Adams & Laughlin (2023), *Turning Earth into Venus: A Stochastic Model of Possible Evolutions of Terrestrial Topography*, https://arxiv.org/abs/2312.07483 | PROCESS / COMPETING MODEL | SCREENED | Connects tectonic regime, erosion, resurfacing, and global topographic spectrum | Highly model-dependent historical scenario |
| SRC-F-020 | Xu (2022), *Beyond Elevation: New Metrics to Quantify the Relief of Mountains and Surfaces of Any Terrestrial Body*, https://arxiv.org/abs/2208.01600 | PROCESS / METHOD | SCREENED | Supports datum-independent relief measures for cross-planet comparison | Metric proposal, not geological process authority |
| SRC-F-021 | Baldassarri et al. (2008), *Fractal properties of isolines at varying altitude reveal different dominant geological processes on Earth*, https://arxiv.org/abs/0811.1183 | METHOD / OBSERVATION | SCREENED | Candidate multiscale geometric descriptors that distinguish ridges, trenches, shelves, rivers, and glacial terrain | Needs replication/validation before audit use |

## Second tranche: crustal architecture, compensation, flexure, and dynamic topography

| ID | Source | Type | State | Use in Stage 1 | Important limitation |
|---|---|---|---|---|---|
| SRC-C-001 | Watts (2001), *Isostasy and Flexure of the Lithosphere*, Cambridge University Press | SYNTHESIS / PROCESS | SCREENED | Core vocabulary and distinction among local compensation, regional flexure, elastic thickness, and load response | Book-level synthesis; individual quantitative claims require primary-source tracing |
| SRC-C-002 | Davies et al. (2019), *Earth’s multi-scale topographic response to global mantle flow*, Nature Geoscience, https://www.nature.com/articles/s41561-019-0441-4 | OBSERVATION / PROCESS / METHOD | EXTRACTED | Establishes that most topography is isostatic while a distinct residual component is linked to mantle flow; constrains wavelength dependence and stresses lithospheric filtering | Earth oceanic residual-topography estimate; not directly transferable to other planets |
| SRC-C-003 | Flament, Gurnis & Müller (2013), *A review of observations and models of dynamic topography*, Lithosphere | SYNTHESIS | QUEUED | Historical review of observational and modeling approaches | Full source extraction still required |
| SRC-C-004 | Hoggard, White & Al-Attar (2016), *Global dynamic topography observations reveal limited influence of large-scale mantle flow*, Nature Geoscience | OBSERVATION / COMPETING MODEL | QUEUED | Important lower-amplitude branch in the dynamic-topography debate | Method and residual corrections must be compared with Davies et al. |
| SRC-C-005 | Maia & Wieczorek (2022), *Lithospheric Structure of Venusian Crustal Plateaus*, https://arxiv.org/abs/2202.06971 | OBSERVATION / PROCESS / METHOD | EXTRACTED | Cross-planet example separating Airy support, flexural support, and possible mantle support with gravity/topography admittance | Regional Venus plateaus; model assumptions and gravity resolution limit conclusions |
| SRC-C-006 | Beuthe et al. (2020), *Mercury's crustal thickness correlates with lateral variations in mantle melt production*, https://arxiv.org/abs/2011.15066 | OBSERVATION / PROCESS | EXTRACTED | Demonstrates that crustal thickness can reflect variable melt production and composition rather than merely impact structure or elevation | Depends on density assumptions and northern-hemisphere coverage |
| SRC-C-007 | Plesa et al. (2022), *Interior Dynamics and Thermal Evolution of Mars — a Geodynamic Perspective*, https://arxiv.org/abs/2207.09283 | SYNTHESIS / PROCESS | EXTRACTED | Integrates InSight crustal constraints with thermal and geodynamic models | Review/model synthesis; not a direct global crust map |
| SRC-C-008 | Knapmeyer-Endrun et al. (2021), *Thickness and structure of the martian crust from InSight seismic data*, Science | OBSERVATION | QUEUED | Direct seismic constraint on crust beneath InSight and calibration point for global models | Single-station inference with model ambiguity; full paper extraction required |
| SRC-C-009 | Wieczorek et al. (2013), *The crust of the Moon as seen by GRAIL*, Science | DATASET / OBSERVATION / METHOD | QUEUED | Gravity-derived lunar crustal thickness and density structure | Impact-dominated crust and model-dependent density assumptions |
| SRC-C-010 | Simons & Olhede (2012), *Maximum-likelihood estimation of lithospheric flexural rigidity, initial-loading fraction, and load correlation, under isotropy*, https://arxiv.org/abs/1205.0773 | METHOD / PROCESS | EXTRACTED | Documents non-uniqueness and statistical difficulty of inferring elastic thickness from gravity/topography | Method assumes isotropy in this formulation; not direct morphology authority |
| SRC-C-011 | DeCelles (2012), *Foreland Basin Systems Revisited: Variations in Response to Tectonic Settings* | SYNTHESIS / PROCESS | QUEUED | Foreland-system architecture, flexural basin partitioning, and tectonic-context variation | Full chapter extraction required before visual obligations are approved |
| SRC-C-012 | Lyon-Caen & Molnar (1985), *Gravity anomalies, flexure of the Indian Plate, and the structure, support and evolution of the Himalaya and Ganga Basin*, Tectonics | OBSERVATION / PROCESS | QUEUED | Classic coupled mountain-load and foreland-flexure case | Regional active collision system; older data and assumptions require modern cross-check |
| SRC-C-013 | Deng et al. (2022), *Lithospheric loading model for large impact basin where mantle plug presents*, https://arxiv.org/abs/2210.05428 | PROCESS / METHOD | EXTRACTED | Shows that ordinary surface-load flexure models can fail in impact basins unless mantle uplift is modeled | Specialized Mars impact-basin case |
| SRC-C-014 | Donzé et al. (2020), *Assessing the brittle crust thickness from strike-slip fault segments on Earth, Mars and Icy Moons*, https://arxiv.org/abs/2010.07183 | PROCESS / METHOD | EXTRACTED | Candidate relation between brittle-layer thickness and fault segmentation across bodies | Geometry-to-thickness relation is model-dependent and process-specific |
| SRC-C-015 | Stewart et al. (2023), *Hemispheric Dichotomy of Mantle Dynamics Revealed by Machine Learning*, https://arxiv.org/abs/2306.14312 | METHOD / COMPETING MODEL | SCREENED | Alternative residual-topography inference suggesting smaller mantle-driven amplitudes and strong dependence on crustal correction | Machine-learning residual depends on training features and interpretation |
| SRC-C-016 | Landais, Schmidt & Lovejoy (2018), *Multifractal topography of several planetary bodies in the Solar System*, https://arxiv.org/abs/1805.11249 | METHOD / OBSERVATION | SCREENED | Cross-body multiscale topography comparison and candidate scale-break descriptors | Proposed causal interpretation is not uniquely established |

## Source-use rules established by the first two tranches

1. **Mass or gravity alone cannot select the tectonic regime.** Conflicting model families must remain explicit branches.
2. **Mission observations and numerical models are different evidence classes.** They may support one specification together, but cannot be blended without labels.
3. **A planet without mobile plates may still be geologically active.** Volcanism, plume-related deformation, contraction, intrusive weakening, and episodic resurfacing need distinct research branches.
4. **Cross-planet relief cannot rely only on elevation above sea level.** Relative relief, local prominence, wavelength, and support mechanism must be studied.
5. **Interior parameters must remain separate in WorldWright metadata.** Crust thickness, heat, tectonic regime, gravity, and age are related but not interchangeable.
6. **Topographic support must be classified.** Crustal roots, lateral density variation, flexural strength, mantle flow, active stress, volcanism, and impact structure can produce overlapping visible forms.
7. **Gravity/topography inversions are not direct photographs of the crust.** Their load assumptions, density assumptions, wavelength range, and non-uniqueness must travel with every inferred reference.
8. **Dynamic topography is a residual, model-sensitive quantity.** Stage 2 must use broad confidence branches rather than one universal amplitude map.
9. **Elastic thickness is an effective mechanical parameter, not identical to crustal thickness or thermal lithosphere thickness.**
10. **Foreland basins are coupled load-response systems.** A mountain belt and adjacent depression cannot be researched as unrelated visual objects.

## Next source-retrieval queue

Priority full-text or authoritative extraction:

1. O'Neill & Lenardic (2007)
2. Korenaga (2010)
3. van Heck & Tackley (2011)
4. Moore & Webb (2013)
5. Moore, Simon & Webb (2017)
6. Flament, Gurnis & Müller (2013)
7. Hoggard, White & Al-Attar (2016)
8. Knapmeyer-Endrun et al. (2021)
9. Wieczorek et al. (2013)
10. DeCelles (2012)
11. Lyon-Caen & Molnar (1985)
12. global crust-thickness datasets and uncertainty models for Earth, Mars, Moon, Mercury, and Venus
13. modern planetary elastic-thickness compilations with method uncertainty
14. experimental and modeling literature on hydration and lithospheric weakening
