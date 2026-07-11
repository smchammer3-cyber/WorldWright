# Stage 1 source register

## Purpose

This register tracks sources used to establish geological rules and Stage 2 coverage requirements. Inclusion here does not automatically mean every interpretation in a source is accepted.

## Evidence labels

- `OBSERVATION` — direct mapped, measured, or mission-derived evidence
- `PROCESS` — physical or numerical explanation of how a feature forms
- `SYNTHESIS` — review or authoritative overview
- `COMPETING MODEL` — useful specifically because the conclusion is debated
- `DATASET` — reusable scientific data product

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

## Source-use rules established by this tranche

1. **Mass or gravity alone cannot select the tectonic regime.** Conflicting model families must remain explicit branches.
2. **Mission observations and numerical models are different evidence classes.** They may support one specification together, but cannot be blended without labels.
3. **A planet without mobile plates may still be geologically active.** Volcanism, plume-related deformation, contraction, intrusive weakening, and episodic resurfacing need distinct research branches.
4. **Cross-planet relief cannot rely only on elevation above sea level.** Relative relief, local prominence, wavelength, and support mechanism must be studied.
5. **Interior parameters must remain separate in WorldWright metadata.** Crust thickness, heat, tectonic regime, gravity, and age are related but not interchangeable.

## Next source-retrieval queue

Priority full-text or authoritative extraction:

1. O'Neill & Lenardic (2007)
2. Korenaga (2010)
3. van Heck & Tackley (2011)
4. Moore & Webb (2013)
5. Moore, Simon & Webb (2017)
6. modern isostasy and lithospheric-flexure syntheses
7. planetary dynamic-topography studies
8. experimental and modeling literature on hydration and lithospheric weakening
9. global crust-thickness datasets and uncertainty models for Earth, Mars, Moon, and Venus
