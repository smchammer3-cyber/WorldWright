<!—
JARVIS_CHANGE
Date: 2025-12-03
Purpose:
- Define universal UI rules for all modes and screens
- Ensure generator, create, and sim modes use unified layout
—>

# 🎨 WORLDWRIGHT — UI RULES (GLOBAL)

WorldWright’s UI is defined by a **single, unified visual language** across all modes.  
These rules guarantee consistency and prevent visual drift.

—

# 1. AppShell Layout (Universal)

Every mode (Generate, Create, Sim) uses the same structure:

- **Left toolbar** (tools, sliders, controls)
- **Main viewport** (globe or map)
- **Minimap** (bottom-left overlay of main viewport)
- **Right info panel** (instructions, details, context)
- **Top title bar** (mode title + back button)

The arrangement is **never** changed on a per-mode basis.

—

# 2. Spacing & Proportions

## Left Toolbar
- Fixed width: **260px**
- Vertical layout  
- Standard spacing: **12–16px** between elements  
- All fields use `.ww-field-group`

## Right Panel
- Fixed width: **300px**
- Title: `.ww-panel-title`
- Text: `.ww-panel-text`

## Main Viewport
- Always centered  
- Must be the largest visual element  
- No scrollbars  
- Padding around it: **24–32px**

—

# 3. Minimap Rules

- Always sits **inside main viewport**  
- Position: **bottom-left**  
- Container: `.ww-minimap-card`  
- Must visually match globe/map colors  
- Dropshadow + subtle border (consistent across modes)

—

# 4. Color & Typography

## Colors
- Background: `#0e0f11` or dark neutral  
- Panel background: semi-translucent dark  
- Primary button: bright accent (blue)  
- Text labels: off-white  
- Borders: subtle greys

## Typography
- Title font-size: ~22–28px  
- Normal text: ~15–16px  
- Monospace only for debug

—

# 5. Controls / Sliders

- All sliders use full width of toolbar  
- All controls labeled with `.ww-field-label`  
- Sliders must have integrated value behavior (WIP)

—

# 6. Mode Accent Colors (Subtle Only)

Modes may vary accents:

- Generate Mode → blue  
- Create Mode → green  
- Sim Mode → amber/yellow

But layout + structure stay identical.

—

# 7. Responsiveness Rules

- Desktop-first  
- Mobile shifts to:
  - stacked layout  
  - minimap placed under the main viewport  
  - tool panel collapsible

—

# 8. No Color-Only Cues

All interactive elements require:

- shape feedback  
- iconography  
- hover state

Never rely solely on color.

—

# Summary

This document ensures every WorldWright mode looks unified, predictable, and professional while still allowing mode-specific accents and future UI evolution.