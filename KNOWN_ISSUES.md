<!—
JARVIS_CHANGE
Date: 2025-12-03
Purpose:
- Fix formatting issues (no accidental code blocks)
- Ensure seed example displays correctly
- Ensure sections are continuous and not split
—>

# ❗ WORLDWRIGHT — KNOWN ISSUES (LIVE LIST)

This file tracks *real*, *current*, and *reproducible* issues in the project.  
It does **not** include placeholders or unfinished future features (those are listed in PLACEHOLDERS.md).

—

# 🟥 1. Layout / UI Issues

### **1.1 Create Mode layout not yet unified with Generate Mode**
Create Mode currently uses a temporary layout container for the main map preview, causing:
- the map to appear left-shifted,
- spacing to differ from Generate Mode,
- the minimap to sit slightly off-position.

**Scheduled fix:** Step 6A-5.

—

# 🟧 2. Rendering Limitations

### **2.1 2D map preview lacks lighting**
The flat map uses the basic color renderer.  
The globe uses directional lighting.

This visual mismatch is expected until the Create Mode tool suite is added.

—

# 🟨 3. Legacy Files in Repo

### **3.1 Old screens still present (not used in routing)**
- `GeneratorScreen.tsx`  
- `EditorScreen.tsx`

These are safe and do not affect the app, but will be removed once Create/Sim Modes reach feature completeness.

—

# 🟦 4. Storage / Data Display Issues

### **4.1 World seed display is raw text**
Currently displayed as:

**Seed:** `seed`

This is purely cosmetic and does not indicate a functional problem.  
Final formatting will be handled in Step 6B when UI polishing begins.

—

# 🟩 5. Stability / Error Handling

### **5.1 “World not found” message is functional but unstyled**
The fallback state works correctly and safely, but the presentation is temporary.

—

# 🟢 Summary

All issues listed above are:

- non-blocking,  
- expected for this stage of Step 6A,  
- planned for resolution in upcoming 6A and 6B substeps.

There are **no current blockers** in development.