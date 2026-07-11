# Continental collision belt vs radial terrain blob

## Purpose

This brief defines the first high-value geological reference family for the WorldWright audit system:

- **positive target family:** continent-continent collision belts / collisional orogens
- **negative comparison family:** radial terrain blobs that look mountainous but do not express collision-belt structure

The goal is not to force every world to resemble the Himalaya. The goal is to teach the audit layer what *kind* of morphology should appear when WorldWright says a region is governed by continental collision, and what common false shapes should be rejected.

## Boundary

This document is a research-and-curation brief only.

It does **not**:
- change terrain generation;
- declare final numeric thresholds;
- score existing planets automatically;
- claim that one Earth example is the only valid collision-belt shape.

It **does**:
- summarize what collision belts generally look like;
- identify what makes a radial blob geologically suspicious;
- propose observable signals for future metrics;
- define the first reference-family curation plan.

## Core geological picture

The clearest active Earth analogue is the Himalaya-Tibet system. USGS summarizes the Himalaya as a ~2,900 km mountain system formed when India and Eurasia collided; because both were continental landmasses, the collision was relieved by crustal shortening and upward thrusting, producing a long mountain range and plateau rather than a simple subducted trench-and-arc system.[1]

That matters for WorldWright because a continental collision signal should usually create a **belt** rather than a **bullseye**.

### What a collision belt tends to express

A plausible collisional orogen usually shows most of the following:

1. **Strong elongation**
   - The major dimension is much longer than the minor dimension.
   - The structure reads as a chain, arc, suture-parallel uplift zone, or segmented belt.
   - Even when curved, the system still has a clear along-strike direction.

2. **Directional compressional structure**
   - Relief and deformation are organized relative to a convergence direction.
   - Multiple ridges, thrust sheets, and foothill belts tend to be subparallel or gently oblique to the belt trend.
   - The mountain front is not equally expressed in all directions from a central point.

3. **Paired highland + foreland relationship**
   - Collision belts commonly sit next to foreland basins / foredeep lowlands created by flexural loading of the adjacent plate.
   - In map view this often appears as a long upland belt next to a long lowland or shelfward depression.
   - The basin should normally be belt-parallel, not a symmetric moat around a circular massif.

4. **Segmented continuity rather than perfect symmetry**
   - Real belts have salients, embayments, syntaxes, local plateaus, and variable width.
   - But these complexities occur *within* an elongated system.
   - The natural look is connected-but-irregular, not cleanly round.

5. **Drainage that is organized, but not globally radial**
   - Major drainage may run longitudinally along valleys, trellis-like across folded terrain, or transversely across the belt.
   - Local radial drainage can occur around individual peaks or domes, but a whole continent-scale collisional belt should not be dominated by a single radial pattern from one central hump.

6. **Hinterland broadening can occur**
   - Some collision systems include broad plateau interiors behind the main mountain front.
   - This can make the high terrain look wide in places, but the plateau should still relate to a belt / suture framework and should not erase the overall anisotropic structure.

## What a radial terrain blob looks like

The recurring failure mode we want to catch is not "too much uplift" by itself. It is uplift that is shaped as a blob rather than as a tectonic belt.

### Common blob symptoms

1. **Continent-scale circular or oval mountain mass**
   - High terrain is arranged around a center instead of along a directional axis.
   - The relief reads as a swollen disk, shield, or puffy continent interior.

2. **Concentric rings or coast-independent bullseye structure**
   - Elevation bands form roughly circular shells.
   - Inner, middle, and outer relief zones look distance-from-center driven rather than tectonically partitioned.

3. **Global radial drainage from the same center**
   - Rivers and valleys fan away from one generalized hub.
   - This may look visually dramatic, but at large scale it is usually more consistent with domes, volcanic edifices, or impact-scale topography than with a collision belt.

4. **No adjacent belt-parallel foreland expression**
   - The blob lacks a clear paired basin / lowland zone.
   - Relief simply grades outward in all directions without a directional compressional front.

5. **Uniform width in all directions**
   - Real collision belts can widen or narrow, but they usually do not maintain nearly equal radius from a center over a continental area.

## Positive analog families to curate

We do not want one everything-example. We want a segmented family with controlled differences.

### Family A — Active giant collisional arc with plateau
**Anchor analogue:** Himalaya–Tibet

Why it matters:
- long, unmistakably belt-like collision system;
- strong mountain-front expression;
- broad hinterland plateau;
- collision still active.

What it should teach the audit system:
- a continent collision result can be broad and dramatic without becoming circular;
- plateau interiors are compatible with collision *if* the boundary-facing belt logic is preserved.

### Family B — Narrower fold-and-thrust collision belt
**Anchor analogue:** Zagros

Why it matters:
- strong map-view parallelism;
- repeated fold belts;
- clear elongated belt behavior.

What it should teach:
- collision belts can be narrower and more ridge-repetitive than the Himalaya;
- strong anisotropy and banding are normal.

### Family C — Curved / arcuate collisional belt
**Anchor analogue:** Alps / Carpathian-style arc systems

Why it matters:
- shows that curvature is not a failure;
- preserves belt logic while bending significantly.

What it should teach:
- the audit must allow arcs and salients without mistaking them for radial blobs.

### Family D — Older / more eroded thrust belt analogue
**Anchor analogue:** Appalachians / Canadian Rockies style foreland belt examples

Why it matters:
- older systems may be more subdued and dissected;
- clear directional structure can survive despite age and erosion.

What it should teach:
- reduced relief does not erase collision-belt identity;
- the audit should separate "eroded belt" from "blob".

## Negative analog families to curate

### Negative N1 — Symmetric continental mountain blob
A broad, rounded upland with no convincing collision front, no suture-parallel organization, and overly even distance-from-center relief.

### Negative N2 — Concentric ring massif
Mountain and hill bands form nested rings rather than an along-strike system.

### Negative N3 — Radial drainage super-hub
A continent-scale upland whose drainage and valley pattern primarily radiate from one center.

### Negative N4 — Submerged ghost with circular core memory
A partially drowned continent that still retains a round collision-core shape instead of a directional orogenic belt.

## Valid exceptions the audit must not over-penalize

1. **Syntaxes and oroclines**
   - A collision belt may bend sharply or wrap around another structural domain.

2. **Local domes / plutonic uplifts / volcanic overprints**
   - Small radial subpatterns can exist locally within a larger belt.

3. **Broad plateau interiors**
   - High plateau terrain may look smoother or wider than the frontal belt.

4. **Heavily eroded ancient systems**
   - Old collision belts may preserve directional ridges more subtly.

5. **Oblique convergence**
   - Strike-slip partitioning can complicate the map pattern while remaining belt-organized overall.

## Operational implications for WorldWright audit rules

For the first collision-belt rule family, the audit should prefer worlds whose generated diagnostics show the following behavior:

### Expected morphology
- elongated or arcuate highland zone;
- spatial continuity along a dominant axis;
- relief concentrated near a convergent / suture-facing margin or belt core rather than a generalized center;
- adjacent or nearby belt-parallel lowland / basin expression;
- segmented ridge-and-valley organization;
- drainage and slope fields that reveal anisotropy.

### Warning patterns
- circular or subcircular continent-scale uplift;
- concentric elevation shells;
- primary drainage radiating from one interior center across the whole feature;
- lack of a coherent collision front;
- lack of basin pairing;
- mountain mass generated mainly by isotropic smoothing, blur growth, or center-weighted uplift.

## Candidate advisory metrics for later calibration

These are intentionally **not** CI gates yet. They are candidate measurement ideas to calibrate from curated references.

1. **Belt elongation ratio**
   - Compare principal-axis length to effective width.
   - Collision belts should usually exceed blob-like elongation values.

2. **Along-strike coherence**
   - Measure how consistently ridge cells align with the best-fit belt axis or local curved axis.

3. **Radiality penalty**
   - Measure whether slope and drainage vectors over a large region converge on / diverge from one central point too strongly.

4. **Boundary-parallel organization**
   - Compare ridge orientation to the local convergence/suture trend.

5. **Foreland adjacency score**
   - Detect whether a lower-elevation basin / shelfward low occurs adjacent and subparallel to the belt.

6. **Connected highland skeleton score**
   - Prefer chain-like connected uplift over isotropic blobs.

7. **Plateau-with-front logic**
   - If a broad plateau exists, require preservation of at least one clear frontal orogenic edge.

## Curation guidance for the first approved references

Each approved reference case should ideally include:
- shaded relief or DEM-style image;
- tectonic / structural interpretation map;
- drainage view if available;
- satellite or natural-color context view;
- concise note explaining why it is positive, threshold, negative, or exception evidence.

Each case should be labeled for:
- activity state: active / waning / ancient;
- curvature: straight / gently arcuate / strongly arcuate;
- width class: narrow / moderate / broad plateau-backed;
- erosion state: low / moderate / high;
- foreland-basin expression: strong / moderate / weak;
- radiality risk: none / local-only / significant false-positive risk.

## Immediate next bounded step

1. Curate **4–6 positive** collision-belt references across the families above.
2. Curate **3–4 negative** radial-blob references from failed WorldWright outputs.
3. Curate **2–3 exception** references (curved belts, local domes, plateau interiors).
4. Add provisional registry entries with descriptive labels only.
5. Hold off on numeric thresholds until the first approved asset set exists.

## Source status

### Confirmed in this pass
1. U.S. Geological Survey, *The Himalayas: Two continents collide* — https://pubs.usgs.gov/gip/dynamic/himalaya.html

### High-value source queue for next full-source retrieval pass
These are priority items to pull in more formally during the next research/curation pass.

- Duvall, Waldron, Godin, Najman (2020), *Active strike-slip faults and an outer frontal thrust in the Himalayan foreland basin*, PNAS.
- DeCelles (2012), *Foreland Basin Systems Revisited: Variations in Response to Tectonic Settings*.
- Burgess et al. (2012), *Holocene shortening across the Main Frontal Thrust zone in the eastern Himalaya*, Earth and Planetary Science Letters.
- Representative structural syntheses for the Zagros, Alps, and Canadian Rockies / Appalachian fold-thrust systems.

## WorldWright-specific conclusion

For this family, WorldWright should eventually be rewarded for generating **directional, belt-like, segmented, basin-paired collision morphology** and warned when it generates **continent-scale radial mountainous blobs**. The audit should allow curvature, segmentation, and plateau development, but it should reject symmetric or center-driven uplift that lacks collision-belt logic.

---

[1] USGS: The Himalayas stretch 2,900 km, formed when India and Eurasia collided, and their relief was expressed by thrusting and uplift rather than one plate simply subducting beneath the other.