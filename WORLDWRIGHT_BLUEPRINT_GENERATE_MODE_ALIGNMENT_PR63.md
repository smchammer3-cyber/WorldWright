# WorldWright Blueprint: Generate Mode Authority Alignment

Status: PR #63 alignment / diagnostics pass  
Purpose: make Generate Mode diagnostics truthful before changing terrain again.

---

## Rule

This PR must not tune terrain, smoothing, color palettes, sea level, or land cleanup.

It only aligns authority and diagnostics so future terrain work can trust the measurements.

---

## Changes

### One crust implementation

`src/core/worldCrust.ts` is now a compatibility re-export to `src/core/worldCrust/index.ts`.

This removes the duplicate crust implementation problem:

```text
worldCrust.ts      = import compatibility layer
worldCrust/index   = real implementation
```

Future crust fixes should patch one implementation only.

---

### Final stage audit split

The old stage row called `FINAL_RECOMPUTE` actually did three things:

```text
recomputeWorld
seedContinentSkeletonFields
seedCrustFields
```

The audit now splits those into:

```text
FINAL_RECOMPUTE
FINAL_CONTINENT_RESEED
FINAL_CRUST_RESEED
```

This makes it possible to see whether final imprint changes come from recompute or from final cause-field reseeding.

---

### Shared feature authority in stage audit

The cause-order audit now reports feature-authority coverage and leak shares, not just raw plate/province/skeleton seam ratios.

Key idea:

```text
A seam is not automatically bad.
A seam is bad when it is visible and not explained by shared geologic feature authority.
```

---

### Ocean depth cannot self-authorize

`oceanDepthClass` is derived from height during recompute. Therefore it cannot be used by itself as strong proof that a height jump is geologically justified.

Unsafe loop avoided:

```text
height makes water deep
-> recompute calls it trench/ridge
-> authority says trench/ridge explains height
```

Strong ridge/trench authority now needs cause fields such as boundary type, margin type, island cause, uplift, or volcanism.

---

### Final color authority diagnostics

Final color is now diagnosed separately from height/export diagnostics.

The new diagnostic asks whether visible Final-color jumps are explained by visible surface facts:

```text
water/land
height
biome
snow
temperature
rainfall
```

or whether they line up suspiciously with hidden cause-layer borders:

```text
plateId
crustProvince
continent/ocean basin/margin/island cause
```

---

### UI defaults use core generator defaults

Generate controls now use `createDefaultGeneratorParams()` as their starting point instead of duplicating a second default set.

This keeps tests, code, and screenshots aligned.

---

## Still not fixed here

This PR intentionally does not fix biome override absorption. That belongs in a later Create/Edit authority PR because it needs an explicit user override model instead of a generate-mode diagnostics patch.

---

## Test focus

Run:

```bash
npm test
npm run build
```

Then test seed `887486344` in Generate Mode and compare:

```text
Final color surface authority
Final color hidden leak
Final color plate/province/skeleton imprint
Generate cause-order Auth / PLeak / PrLeak / OLeak / LLeak columns
```
