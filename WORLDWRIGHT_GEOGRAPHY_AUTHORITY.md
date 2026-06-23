# WorldWright Geography Authority Hierarchy

This document defines who is allowed to own each part of globe generation. It is not a claim that the current generator fully obeys this hierarchy yet.

## Intended Authority Order

1. **Geography Profile**
   - Owns target ranges, tolerances, and style/slider budgets.
   - Does not draw terrain directly.

2. **Sphere/Grid**
   - Owns cell positions and sampling geometry.
   - Does not decide land, ocean, climate, or cultures.

3. **Continent/Ocean Skeletons**
   - Own broad land/ocean identity: continent cores, margins, shelves, ocean basins, and broad separation.
   - This layer should decide where the world wants continents and major oceans.

4. **Tectonics**
   - Owns causes: plate motion, boundaries, compression, rifts, trenches, arcs, and mountain-belt potential.
   - It should not directly paint broad continents or visible plate polygons.

5. **Crust Provinces**
   - Own geological expression inside the skeleton budget: shields, mobile belts, basins, rift margins, coastal plains, volcanic provinces, and island arcs.

6. **Terrain Detail / Quality**
   - Adds relief, basin texture, coastline detail, and local variation.
   - It should not become a second continent generator.

7. **Sea Flood and Water Classification**
   - Floods the terrain and classifies shelves, slopes, abyssal plains, trenches, seas, and lakes.

8. **Metrics and Correction**
   - Measures the generated output against the profile and corrects specific failures.
   - It should not blindly add or remove land outside the authority hierarchy.

9. **Recompute-Derived Systems**
   - Derives climate, hydrology, rivers, snow, and biomes from the terrain and water state.

## Current Conflict Being Cleaned Up

The old generator and plate system still create visible terrain authority before the newer continent/ocean skeleton pipeline gets to act. This can expose plate polygons, boundary bands, shelf streaks, shallow-water washes, and correction artifacts.

## PR #36 Scope

PR #36 begins authority cleanup by:

- documenting the intended hierarchy;
- adding an authority cleanup pass after crust influence and before final profile correction;
- suppressing visible plate-boundary bands when they contradict continent/ocean skeleton authority;
- preserving caused plate features where they align with continentality, island arcs, rifts, or collision zones;
- keeping metrics/corrections as a scoreboard, not a false proof that geography is solved.

## Not Solved Yet

- The old generator is still the initial substrate builder.
- Tectonics still need to become more feature-object based instead of direct terrain-band based.
- Crust terrain influence still needs fuller profile integration in a later pass.
- Mountain belts, rift corridors, ocean basin centers, and shelves are not yet true first-class feature objects.
