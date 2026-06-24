# Material relief before province constraint

This PR intentionally splits the terrain problem before retrying a province-authority constraint.

## Why

The previous crust-authority experiment reduced province imprint, but full-suite tests showed normal generated worlds became too flat. Cranking the same province delta back up restored relief but also restored province imprint.

That means relief and province labels are currently too entangled.

## Change

- Keeps the existing crust province delta path intact.
- Adds a small material/feature relief reinforcement pass after the existing crust terrain influence.
- The new relief uses crust thickness, crust age, uplift, volcanism, boundary/margin context, continentality gradients, and deterministic local texture.
- It avoids raw `crustProvince` as the driver.
- It protects shoreline/topology by only reinforcing already-land cells with land support.

## Expected result

This should make it safer for a later PR to reduce province-label stamping without flattening the planet.
