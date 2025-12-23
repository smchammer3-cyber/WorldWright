CORE_SURGERY_PLAYBOOK.md
———————————

# CORE SURGERY PLAYBOOK — WORLDWRIGHT

This document defines the **non-negotiable process** for changing core engine files.

If any step in this playbook is skipped or feels rushed,  
**the surgery is not allowed to proceed.**


## 1. PURPOSE

Core files power everything else:

- World model
- World generation
- Rendering
- Storage
- Editor modes

If core changes are sloppy, the entire app shatters.

This playbook exists to:

- Prevent repeat failures
- Ensure changes are **additive, predictable, and reversible**
- Force a **full-project view**, not “just the files we think are affected”


## 2. WHAT COUNTS AS CORE SURGERY?

Any change to **any of these files** is core surgery:

- `src/core/world.ts`
- `src/core/worldGenerator.ts`
- `src/core/worldStorage.ts`
- `src/core/planetRenderer.ts`
- `src/core/stickerEngine.ts` (once live)
- Any future worldBrain / world schema file

Additionally, surgery rules apply if:

- The **World** interface changes in any way
- A new core data structure is added that other systems will use
- Any field in the world that generator, storage, or renderer depend on is modified


## 3. PRE-SURGERY CHECKLIST (MUST ALL BE TRUE)

Before touching any core file:

1. **Blueprint alignment**
   - WORLDWRIGHT_STATUS explicitly says this step involves core changes.
   - The change is required by the blueprint, not “nice cleanup.”

2. **Snapshot**
   - A ZIP of the project at the current working state exists.
   - This ZIP is treated as the **restore point** if anything feels wrong.

3. **Goal written down**
   - In `DEV_NOTES_WORLDWRIGHT.md` or this file, write a short goal like:
     - “Add optional `stickers` field to World without breaking existing worlds.”
     - “Store `seaLevel` explicitly in saved worlds to ensure consistency.”

4. **Change is additive**
   - Plan is **add-only** (new optional fields / new types / new functions).
   - No field renames, deletions, or repurposing in this surgery.

5. **Impact map created**
   - See next section — this is critical and prevents the “Jarvis only checked a few files” failure mode.


## 4. IMPACT MAP (MANDATORY, NO EXCEPTIONS)

Before editing code, we must build an **impact map**:

1. **List the field(s) or type(s) being touched**
   - Example:
     - `World.stickers`
     - `World.seaLevel`
     - `World.cells[*].baseHeight`

2. **Search the entire codebase for usages**
   - Grep or search for:
     - The field name (`stickers`, `seaLevel`, `baseHeight`, etc.)
     - Related type names (`World`, `WorldCell`, etc.)
   - Do **not** assume only core files are affected.

3. **List every file that touches the field or type**
   - Example impact map:

     - `src/core/world.ts`
     - `src/core/worldGenerator.ts`
     - `src/core/worldStorage.ts`
     - `src/core/planetRenderer.ts`
     - `src/modes/generate/GenerateModeApp.tsx`
     - `src/modes/create/CreateModeApp.tsx`
     - `src/screens/HomeScreen.tsx`

4. **Surgery is not allowed until the impact map is written down.**
   - This prevents “I only edited the files I thought mattered” mistakes.
   - Every file in the impact map must be reviewed after the change.


## 5. SURGERY EXECUTION RULES

When starting the actual code changes:

1. **Update order (for schema-related changes)**

   1. `world.ts`
      - Add new optional field(s) or type(s).
      - Do NOT remove or rename existing fields.

   2. `worldGenerator.ts`
      - Ensure new worlds get sane defaults.
      - New fields must not break world creation.

   3. `worldStorage.ts`
      - Save/load the new field in a backwards-compatible way.
      - When loading, always handle “field missing” safely.

   4. `planetRenderer.ts`
      - Either:
        - Ignore the new field safely, or
        - Use it **without assuming it always exists**.

2. **No combined refactor + feature**
   - Do not refactor core logic and add new behavior in the same step.
   - If refactor is truly needed, it must be its own surgery with its own impact map.

3. **No UI changes in core surgery**
   - No changes to React components during core surgery.
   - UI wiring to new fields happens in a later, separate step.

4. **CORE_SURGERY header required**
   - Each edited core file must include a header in the top comments similar to:

     - Step: 6B-3X — CORE_SURGERY
     - Summary of the change
     - Which fields/types were touched
     - How backwards compatibility is preserved


## 6. POST-SURGERY VERIFICATION

After changes are made, surgery is **not complete** until the following checks pass:

1. **Golden flow still works**
   - App starts.
   - You can generate a world.
   - You can open Create Mode.
   - Inspect tool still works.
   - Terrain brush still works.

2. **Existing worlds still work**
   - Load at least one previously saved world.
   - Verify it:
     - Renders without errors.
     - Still has expected terrain.
     - Doesn’t crash any mode.

3. **New worlds behave sensibly**
   - Generate a fresh world.
   - Verify:
     - No runtime errors in console.
     - World data looks valid.
     - New fields are present or safely defaulted.

4. **Impact map review**
   - For each file in the impact map:
     - Confirm it still compiles logically.
     - Confirm it handles the new field safely (or ignores it cleanly).
   - No file in the impact map is allowed to remain “unreviewed.”


## 7. FAILURE PROTOCOL (IF ANYTHING FEELS WRONG)

If at any point:

- The app behaves strangely
- A world fails to load
- A core concept feels “fragile” or hard to reason about
- You feel the same dread as last time when everything broke

Then:

1. **STOP immediately.**
2. Do not try to patch around it in random files.
3. **Restore the last known-good ZIP.**
4. Add a note in `KNOWN_ISSUES.md` describing:
   - What surgery was attempted.
   - What went wrong.
   - Why it felt unsafe.
5. Re-design the change with a smaller, more additive approach.

Rolling back is not failure.  
Rolling back is part of this playbook by design.


## 8. SMALL, SAFE STEPS ONLY

Core evolution should follow this pattern:

1. Add optional fields / types.
2. Make generator set safe defaults.
3. Make storage persist them.
4. Make renderer aware (optionally uses or safely ignores).
5. Only then, add UI/editor behavior around the new fields.

At the end of every step, the app must still:

- Load.
- Generate.
- Edit terrain.
- Inspect.
- Save/load worlds.

If a step can’t end in a working state, it’s too big and must be split.


## 9. ROLE OF “JARVIS” (AI ASSISTANT)

When Jarvis proposes core changes, Jarvis must:

- Explicitly call out that this is **CORE_SURGERY**.
- Provide:
  - A written goal for the surgery.
  - The impact map (list of all affected files).
  - Only **additive** changes to world and friends.
  - Consistent updates across world/generator/storage/renderer when schema changes.
- Never:
  - Edit core files casually.
  - Change world schema without updating dependent systems.
  - Mix UI edits into a core surgery step.

If these rules are not followed, the proposal must be rejected and redesigned.


———————————
END OF CORE SURGERY PLAYBOOK
———————————