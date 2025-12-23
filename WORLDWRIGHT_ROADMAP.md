# ============================================================
# WORLDWRIGHT ROADMAP (V1.2)
# Safe, Ordered Development Path for WorldWright
# Aligned with WORLDWRIGHT_SPINE.md and Blueprint V1.2
# ============================================================

This roadmap describes **the exact sequence** in which WorldWright should be built.
Each phase is ordered to ensure:
- Minimal regressions
- Maximum code stability
- Clear extension points
- No core contradictions
- No redesign of completed work

Every step is a “ticket” small enough to implement safely.

============================================================
PHASE 0 — PREP & VERIFICATION
============================================================

**0.1 — Verify Spine Integration**
- Confirm project structure matches AppShell + Mode system.
- Confirm WorldBrain schema fields exist (even if unused).
- Confirm save/load function matches Spine contract.
- Confirm rendering pipeline reads from WorldBrain correctly.

**Done when:** World loads, saves, and switches between screens without error.


============================================================
PHASE 1 — WORLD BRAIN & FOUNDATION (THE SPINE IN CODE)
============================================================

**1.1 — Create the WorldBrain “Core” Module**
- Define full type structure exactly as in Spine.
- Ensure serialization/deserialization works.

**1.2 — Create WorldStorage module**
- saveWorld()
- loadWorld()
- listWorlds()
- deleteWorld()
- duplicateWorld()
- renameWorld()

**1.3 — Wire AppShell + Mode Switching**
- Home → Generator → Create → Sim
- Correct top bar, left bar placeholders, and minimap logic.

**1.4 — Add WORLDWRIGHT_STATUS.md support**
- Used for development tracking, not runtime.

**Done when:** The app is structurally identical to the spine, even without full tools.


============================================================
PHASE 2 — GENERATOR SYSTEM (CONTINENTS FIRST, NOT ISLAND NOISE)
============================================================

**2.1 — Implement Stable Terrain Generation**
- Continents, not scattered islands.
- Mountains along tectonic lines.
- Valleys, plains, erosion logic.
- Sea-level application.

**2.2 — Implement Climate Model**
- Temperature by latitude + elevation.
- Moisture from noise + proximity to water.
- Climate variance slider.

**2.3 — Implement Biome Assignment**
- Smooth transitions.
- Realistic gradients.

**2.4 — Implement River Auto-Generation**
- Rivers flow downhill.
- Merge, form deltas, form lakes.
- Recalculate automatically when Generator parameters change.

**2.5 — Hook Generator → WorldBrain**
- Save baseHeight, baseBiomeId, initial rivers.

**Done when:** Generated worlds look like real continents, not noise.


============================================================
PHASE 3 — CREATE MODE (CORE EDITOR FOUNDATION)
============================================================

**3.1 — Implement Globe & Map Views**
- Smooth rotation, zoom.
- Map pan & zoom.
- Lighting, shading, minimap.

**3.2 — Implement Terrain Brush System**
- Raise, lower, smooth, flatten.
- Continuous stroke behavior.
- Writes to editHeightDelta.
- Undo/redo support.

**3.3 — Implement Biome Tools (Brush)**
- Paint editBiomeId.
- Warnings for unrealistic biome placement.
- Override button.

**3.4 — Implement Manual River Tools**
- Add river.
- Delete river.
- Reshape river polyline.
- Prompt for recalculation if terrain changes create new valid paths.

**3.5 — Implement Stickers (Polygon System)**
- Place sticker.
- Select, drag, resize.
- Vertex editing (add/move/remove).
- Filled + outline visualization.

**3.6 — Sticker Effects**
- Biomes
- Cultures
- Terrain deltas (large-scale)
- Resource regions (placeholder only)

**Done when:** All core editing tools exist and modify the correct layers.


============================================================
PHASE 4 — POLITICAL SYSTEMS (COUNTRIES, CITIES, CULTURES)
============================================================

**4.1 — Country Generation**
- User chooses number of large/medium/small countries.
- System partitions land into country polygons.
- Uses mountains, rivers, coasts as hints.

**4.2 — Border Editing Tools**
- Vertex dragging.
- Edge dragging.
- Add/remove vertices.
- Snap-to (mountains/rivers/coasts).
- Toggle snapping.

**4.3 — City System**
- Place cities.
- Edit city metadata.
- Cities inherit country + culture on placement.

**4.4 — Culture Painting**
- No auto-growth in Create Mode.
- Culture assignment via:
  - Brush
  - Sticker polygons
  - City-based influence region (slider + editable polygon)

**Done when:** Political + cultural geography is fully editable.


============================================================
PHASE 5 — SIM MODE (BRANCH TIMELINES)
============================================================

**5.1 — Branch System**
- Create branch.
- Load branch.
- Delete branch.
- Branch metadata.

**5.2 — Simulation Engine (Basic V1)**
- Time progression.
- Population changes.
- Culture drift (slow, controlled).
- Territorial changes.
- Environmental shifts (rare).

**5.3 — Decision Inbox**
- Required for all major events.
- Accept = apply to branch edit layer.
- Reject = ignore event.

**5.4 — Promote Branch to Canon**
- Branch final snapshot becomes new world.
- Never overwrites old world unless user chooses.

**Done when:** Simulation feels alive but still safe.


============================================================
PHASE 6 — EXPORT SYSTEM
============================================================

**6.1 — Basic Data Exports**
- Heightmap
- Biome map
- Country map
- Culture map
- City list
- Rivers (polyline JSON)
- Metadata manifest

**6.2 — UE5 Profile**
- heightmap.raw
- biome_masks
- country_masks
- culture_masks
- river_splines
- manifest.json (versioned)

**Done when:** Any world can be exported into UE5 reliably.


============================================================
PHASE 7 — VISUAL POLISH & BLUEPRINT COMPLIANCE
============================================================

**7.1 — Globe Visual Polish**
- Smoother oceans.
- Correct shading.
- Better biome blending.

**7.2 — Editor Polish**
- Tooltips.
- Better icons.
- Stickers more visually clear.

**7.3 — UX Pass**
- Fix layout issues.
- Improve touch responsiveness.
- Ensure mobile parity.

**Done when:** The world looks like a real stylized planet, not noise.


============================================================
PHASE 8 — INTEGRATION VALIDATION (BUILT FOR THE FUTURE)
============================================================

**8.1 — Stability Sweep**
- Stress test editing.
- Stress test branch switching.
- Stress test save/load.

**8.2 — Schema Freeze Check**
- Ensure no accidental schema drift.

**8.3 — Spine Integrity Check**
- Confirm contract adherence:
  - Mode separation
  - WorldBrain layers
  - Export correctness

**8.4 — “Visual Final” Review**
- Confirm visual results meet blueprint expectations.


============================================================
SUMMARY (THE ORDER OF BUILDING)
============================================================

1. FOUNDATION (Spine)  
2. Generator  
3. Create Mode  
4. Political/Cultural Systems  
5. Sim Mode  
6. Export System  
7. Visual Polish  
8. Final Integration

This is the correct, safest, professional-grade build sequence.

============================================================
VERSION TAG
============================================================

WORLDWRIGHT_ROADMAP.md  
Version: 1.0  
Aligned with:  
- WORLDWRIGHT_SPINE.md v1.0  
- WORLDWRIGHT_BLUEPRINT_V1.2  
Compiled for: Iron Man  
By: Jarvis

# END OF ROADMAP