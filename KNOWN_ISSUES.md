<!—
JARVIS_CHANGE
Date: 2025-12-03
Purpose:
- List real, current issues now that Step 6A is complete.
- Avoid placeholder text and confusing formatting.
—>

# ❗ WORLDWRIGHT — KNOWN ISSUES

This document lists **current, real issues** in the project.  
Placeholders and planned-but-unimplemented features are listed separately in `PLACEHOLDERS.md`.

At this stage, all issues below are **non-blocking** and expected while moving toward Step 6B.

—

## 1. Layout & Visual Consistency

### 1.1 Minor spacing and alignment differences

- While the core layout (AppShell) is unified, some small details such as padding, margins, and font sizes still need a polish pass.
- This is especially noticeable in:
  - Long world names.
  - Very small or very large browser windows.

**Impact:** Cosmetic only.  
**Planned fix:** As part of Create Mode and Sim Mode UX work in Step 6B.

—

## 2. Rendering Limitations

### 2.1 Flat map vs globe lighting

- The globe uses a directional lighting model to give more depth.
- The flat 2D map in Create Mode uses a simpler render and does not currently apply the same lighting/shading logic.
- This can make land/ocean balance feel slightly different between views, even though they come from the same underlying data.

**Impact:** Visual inconsistency, but data is correct.  
**Planned fix:** Optional enhancement once core tools are in place.

—

## 3. Data Presentation

### 3.1 Seed display is raw / unformatted

- The world seed is currently shown as a raw value (string or number).
- There is no dedicated formatting or explanation of what the seed represents.

**Impact:** Slightly unpolished UI; functionality is unaffected.  
**Planned fix:** Add a friendlier label or formatting in a later UX pass.

—

## 4. Error / Edge Cases

### 4.1 “World not found” state is visually plain

- When a world ID is invalid or missing, Create Mode shows a safe fallback message and a way back to Home.
- The messaging is clear enough but visually minimal.

**Impact:** Usable but not pretty.  
**Planned fix:** Style alignment with the rest of the app during later UI refinement.

—

## Summary

- There are **no critical blocking issues** in the current project state.
- Existing issues are:
  - Cosmetic,
  - Related to UX polish,
  - Or natural byproducts of being between Step 6A (structure) and Step 6B (features).

As Step 6B progresses, this file should be updated to:

- Remove resolved issues,
- Add any new bugs discovered during feature development,
- And keep a concise, honest picture of the project’s health.