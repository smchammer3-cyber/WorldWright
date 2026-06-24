# PR #76: Coast shape pass

This PR targets the post-PR #75 diagnostics where overall land coverage and export risk are acceptable, but long straight coasts remain bad.

## Change

- Adds a near-shore coast shape pass after the existing crust/material relief path.
- Uses local deterministic terrain texture and current land/water support.
- Does not use raw crust province labels as the terrain driver.
- Guards against unsupported new islands by requiring nearby land support before water cells can become land.

## Expected visual result

The goal is less ruler-straight coastline geometry and less obvious final color imprint from large hidden structure lines.
