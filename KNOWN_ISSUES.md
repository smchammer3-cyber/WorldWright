<!— JARVIS_CHANGE
Date: 2025-12-02
Purpose: Central log of known issues to avoid “stealth fixes” outside the current step.
—>

# WORLDWRIGHT — KNOWN ISSUES

This file tracks **known bugs, limitations, and rough edges** that we are aware of but
are not addressing in the current blueprint step.

If a problem is discovered while working on another feature, it should be logged here
instead of silently “also being fixed” at the same time.

—

## Open Issues

- [ ] **EditorScreen is a UI stub only.**  
  - File: `src/screens/EditorScreen.tsx`  
  - Status: Placeholder — does not load or modify real worlds yet.  
  - Planned Fix: Replace with proper CreateModeApp / SimModeApp structure per blueprint.

- [ ] **Generator preview is 2D canvas only.**  
  - File: `src/screens/GeneratorScreen.tsx`  
  - Status: Functional but visually limited; does not yet fully match final globe style rules.  
  - Planned Fix: 5G globe/minimap visual polish; eventual integration with dedicated renderer.

- [ ] **No dedicated modes folder structure yet.**  
  - Files: `src/App.tsx`, `src/screens/*`  
  - Status: All modes currently expressed as screens; does not yet follow `modes/generate|create|sim` structure.  
  - Planned Fix: Introduce modes directory and AppShell architecture in future steps.

*(More issues will be added as they are discovered.)*

—

## Closed Issues

*(None yet — this section will record issues resolved in specific steps.)*