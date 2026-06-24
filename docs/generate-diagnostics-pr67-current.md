# WorldWright Current-Repo Generate Diagnostics — Branch / PR 67 Context

This investigation was done against the current checked-out repo state, not an old snapshot.

Important branch context:

- Current local branch: `work`.
- The branch history shows PR #67 was merged, then several follow-up commits reverted or removed parts of PR #67.
- This diagnostic reflects the current code after PR #67 plus later removals/reverts, not the original PR #67 merge commit by itself.

Relevant recent history:

```text
work
d82e1de Restore worldCrust export formatting
33761e0 Remove PR #67 crust material authority tests
c9ed6b2 Remove PR #67 material tiny cleanup
2d2839f Remove PR #67 material terrain subpasses
8dd1a1d Remove PR #67 crust material helpers
6526b8c Remove PR #67 crust material blueprint note
9ac936b Revert PR #67 crust material terrain route
65e474a Merge pull request #67 from smchammer3-cyber/crust-material-fields-feature-relief
```

The current Generate pipeline order is:

```text
seed continent skeleton fields
→ apply skeleton base elevation
→ recompute
→ apply generated world quality pass
→ recompute
→ seed continent skeleton fields
→ seed crust fields
→ apply crust terrain influence
→ apply ocean bathymetry smoothing
→ recompute
→ seed continent skeleton fields
→ seed crust fields
```

The current stage diagnostics replay isolates these Generate stages:

```text
RAW_GENERATOR
CONTINENT_FIELDS
SKELETON_ELEVATION
FIRST_RECOMPUTE
QUALITY_PASS
CRUST_FIELDS
CRUST_PROVINCE_DELTA
CRUST_COAST_BREAKUP
CRUST_COHERENCE
CRUST_SKELETON_OBEDIENCE
CRUST_TINY_ISLAND_CLEANUP
OCEAN_BATHYMETRY_SMOOTHING
FINAL_RECOMPUTE
FINAL_CONTINENT_RESEED
FINAL_CRUST_RESEED
```

Diagnostic sample used:

```text
width = 128
height = 64
seed = "67"
continentCount = 4
```

## Short Answers

### 1. Which Generate stage first causes plate/skeleton/province imprint to jump?

Plate imprint first jumps at `SKELETON_ELEVATION`.

```text
RAW_GENERATOR plate imprint:      0.882×
CONTINENT_FIELDS plate imprint:   0.882×
SKELETON_ELEVATION plate imprint: 1.209×
```

Skeleton classification imprint appears as soon as `CONTINENT_FIELDS` are seeded:

```text
CONTINENT_FIELDS skeleton imprint: 1.362×
```

Province imprint first appears at `CRUST_FIELDS`:

```text
CRUST_FIELDS province imprint: 1.503×
```

Then province imprint becomes more terrain-visible at `CRUST_PROVINCE_DELTA`:

```text
CRUST_PROVINCE_DELTA province imprint: 1.769×
```

Final answer:

```text
First plate height imprint jump:    SKELETON_ELEVATION
First skeleton identity imprint:    CONTINENT_FIELDS
First province identity imprint:    CRUST_FIELDS
First province terrain imprint:     CRUST_PROVINCE_DELTA
```

### 2. Is skeleton elevation over-amplifying plate-shaped structure before crust runs?

Somewhat, yes.

`SKELETON_ELEVATION` is the first stage that turns hidden continent/skeleton structure into visible height structure.

In seed 67:

```text
Plate imprint:    0.882× → 1.209×
Land fraction:    31.13% → 29.06%
Land bodies:      44 → 35
Topology flip:    5.82%
Land relief:      0.0338 → 0.0341
```

That means skeleton elevation is not just harmless guidance. It significantly changes terrain and sea-level topology.

However, it is not totally uncontrolled. The current code has safeguards:

- land protection
- weak-ocean uplift reduction
- invalid-fragment handling
- caused-island exceptions
- seam damping

Conclusion:

```text
Skeleton elevation is restrained, but yes, it is the first stage that visibly amplifies hidden plate/skeleton structure before crust runs.
```

### 3. Does crust delta create too many land bodies/fragments?

It creates extra land bodies, but not mainly medium fragments.

Before crust delta:

```text
CRUST_FIELDS
land bodies:        34
medium fragments:   4
medium share:       7.8%
```

After crust delta:

```text
CRUST_PROVINCE_DELTA
land bodies:        41
medium fragments:   4
medium share:       7.72%
```

So crust delta adds:

```text
+7 land bodies
+0 medium fragments
```

Conclusion:

```text
Crust delta does increase total land-body count, but in this current code sample it does not explode medium fragments.
```

### 4. Is crust cohere mostly repairing damage caused by crust delta?

Partly, but no — it is not the main repair pass.

Sequence after crust delta:

```text
CRUST_PROVINCE_DELTA:
land bodies:       41
medium fragments:  4

CRUST_COAST_BREAKUP:
land bodies:       40
medium fragments:  4

CRUST_COHERENCE:
land bodies:       38
medium fragments:  4

CRUST_SKELETON_OBEDIENCE:
land bodies:       36
medium fragments:  2

CRUST_TINY_ISLAND_CLEANUP:
land bodies:       29
medium fragments:  2
```

Crust cohere repairs some damage:

```text
land bodies: 40 → 38
```

But the bigger repairs come later:

```text
CRUST_SKELETON_OBEDIENCE:
medium fragments: 4 → 2

CRUST_TINY_ISLAND_CLEANUP:
land bodies: 36 → 29
```

Conclusion:

```text
Crust cohere helps, but the main repair burden is carried by crust skeleton obedience and tiny island cleanup.
```

### 5. Is crust skeleton double-applying skeleton authority?

Yes, but currently in a restrained way.

There are two skeleton terrain authority stages:

```text
1. Early skeleton elevation:
   applySkeletonBaseElevation

2. Late crust skeleton obedience:
   applyContinentSkeletonTerrainObedience
```

The current code explicitly says the late crust skeleton pass is intended to be restrained and should not behave like a second continent generator.

But in seed 67 it still has a real effect:

```text
Land fraction:      29.16% → 30.69%
Land bodies:        38 → 36
Medium fragments:   4 → 2
Topology flip:      1.65%
Plate imprint:      1.382× → 1.430×
Province imprint:   1.785× → 1.839×
Skeleton imprint:   1.374× → 1.386×
```

Conclusion:

```text
Yes. Crust skeleton is a second skeleton-authority pass. It is restrained and useful for repair, but it still changes terrain and increases imprint.
```

### 6. Are crust fields derived from height/oceanDepthClass in a way that creates feedback?

Yes. This is one of the clearest current feedback risks.

Current crust field seeding reads current terrain and ocean classification:

```text
height
aboveSea
terrainBuoyancy
oceanDepthClass
plateType
boundaryType
upliftRate
volcanicActivity
surfaceAge
```

Then it writes:

```text
crustThickness
crustAge
crustProvince
```

Then the next terrain pass reads those crust fields and modifies height:

```text
crustThickness / crustAge / crustProvince
→ crust province terrain delta
→ changed height
```

So the loop is:

```text
height / oceanDepthClass
→ crust fields
→ crust province
→ height delta
→ final terrain
→ final crust reseed
```

Conclusion:

```text
Yes. Crust fields are partly height-derived, then crust fields modify height. That creates a height → crust → height feedback loop.
```

### 7. Which stage helps land relief, and which stage hurts it?

Using `landHeightStdDev` as the relief metric:

```text
RAW_GENERATOR:              0.0338
SKELETON_ELEVATION:         0.0341
QUALITY_PASS:               0.0329
CRUST_FIELDS:               0.0329
CRUST_PROVINCE_DELTA:       0.0313
CRUST_COAST_BREAKUP:        0.0314
CRUST_COHERENCE:            0.0314
CRUST_SKELETON_OBEDIENCE:   0.0324
FINAL:                      0.0324
```

Stages that help relief:

```text
SKELETON_ELEVATION
CRUST_COAST_BREAKUP, slightly
CRUST_SKELETON_OBEDIENCE
```

Stages that hurt relief:

```text
QUALITY_PASS
CRUST_PROVINCE_DELTA
```

Conclusion:

```text
Best relief helper: CRUST_SKELETON_OBEDIENCE
Secondary helper: SKELETON_ELEVATION
Biggest relief hurt: CRUST_PROVINCE_DELTA
Unexpected relief hurt: QUALITY_PASS
```

### 8. Which pass most increases export risk?

There are two kinds of export risk:

```text
A. terrain/export height risk
B. metadata/debug/color/province export risk
```

Biggest terrain export risk: `CRUST_PROVINCE_DELTA`.

It changes height based on crust province and increases visible imprint:

```text
Plate imprint:     1.227× → 1.344×
Province imprint:  1.503× → 1.769×
Province leak:     13.53% → 18.70%
Land bodies:       34 → 41
```

Biggest metadata/debug/export classification risk: `CRUST_FIELDS`.

This stage does not change height, but it creates crust province labels that immediately have strong spatial imprint:

```text
Province imprint appears at: 1.503×
Province leak jumps to:     13.53%
Ocean leak jumps to:        13.31%
Land leak jumps to:         9.44%
```

Final export metadata risk: `FINAL_CRUST_RESEED`.

This does not change terrain, but it changes/re-syncs final crust/province identity after terrain has settled.

In seed 67:

```text
Province imprint:  1.848× → 1.870×
Province leak:     20.30% → 20.76%
Ocean leak:        15.06% → 15.92%
```

Conclusion:

```text
Most terrain export risk:       CRUST_PROVINCE_DELTA
Most classification/export risk: CRUST_FIELDS
Final export label risk:         FINAL_CRUST_RESEED
Most visible late terrain risk:  CRUST_SKELETON_OBEDIENCE
```

## Full Stage Table

```text
Stage                       Land     Bodies  Medium  Relief   Plate   Province  Skeleton  Flip
RAW_GENERATOR               31.13%   44      9       0.0338   0.882×  —         —         —
CONTINENT_FIELDS            31.13%   44      9       0.0338   0.882×  —         1.362×    0%
SKELETON_ELEVATION          29.06%   35      3       0.0341   1.209×  —         1.362×    5.82%
FIRST_RECOMPUTE             29.06%   35      3       0.0341   1.209×  —         1.362×    0%
QUALITY_PASS                28.97%   34      4       0.0329   1.227×  —         1.363×    1.22%
CRUST_FIELDS                28.97%   34      4       0.0329   1.227×  1.503×    1.348×    0%
CRUST_PROVINCE_DELTA        29.41%   41      4       0.0313   1.344×  1.769×    1.367×    0.49%
CRUST_COAST_BREAKUP         29.28%   40      4       0.0314   1.377×  1.784×    1.374×    0.24%
CRUST_COHERENCE             29.16%   38      4       0.0314   1.382×  1.785×    1.374×    0.24%
CRUST_SKELETON_OBEDIENCE    30.69%   36      2       0.0324   1.430×  1.839×    1.386×    1.65%
CRUST_TINY_ISLAND_CLEANUP   30.48%   29      2       0.0324   1.399×  1.846×    1.378×    0.21%
OCEAN_BATHYMETRY_SMOOTHING  30.48%   29      2       0.0324   1.403×  1.848×    1.376×    0%
FINAL_RECOMPUTE             30.48%   29      2       0.0324   1.403×  1.848×    1.376×    0%
FINAL_CONTINENT_RESEED      30.48%   29      2       0.0324   1.403×  1.848×    1.457×    0%
FINAL_CRUST_RESEED          30.48%   29      2       0.0324   1.403×  1.870×    1.457×    0%
```

## Main Current-Repo Issues

### Issue A — Skeleton elevation is the first major visible cause imprint

The raw generator has lower plate imprint:

```text
0.882×
```

After skeleton elevation:

```text
1.209×
```

This means skeleton elevation is the first pass that visibly increases plate-shaped structure.

### Issue B — Crust fields are height-derived, so they can echo existing terrain

Crust fields are seeded from current height and ocean classification.

Risk:

```text
terrain already has shape
→ crust fields classify from that shape
→ crust terrain pass reinforces that shape
```

This creates feedback.

### Issue C — Province labels create export-visible seams before terrain is changed

`CRUST_FIELDS` does not change height, but province imprint immediately appears:

```text
1.503×
```

This means province labels are already aligned with visible terrain/height structure.

That is risky for:

```text
debug overlays
material exports
province exports
final color authority
height export explanations
```

### Issue D — Crust province delta is the main terrain imprint amplifier

`CRUST_PROVINCE_DELTA` makes province identity visible in terrain:

```text
Province imprint: 1.503× → 1.769×
Land bodies:      34 → 41
```

This is the main pass to inspect if hidden province structure is leaking into export height.

### Issue E — Crust skeleton is useful but still double-applies skeleton authority

The late crust skeleton pass improves topology:

```text
Medium fragments: 4 → 2
```

But it also increases imprint:

```text
Plate imprint:    1.382× → 1.430×
Province imprint: 1.785× → 1.839×
```

So it is useful but risky.

### Issue F — Quality pass may not be helping land relief enough

The quality pass is supposed to add interior relief, but in this sample:

```text
Land relief: 0.0341 → 0.0329
```

This suggests the coast/strait/shelf components may be overpowering the intended interior relief.

## Recommended Next Fixes

### 1. Reduce crust feedback

Separate crust cause fields from current height more strongly.

Current risky loop:

```text
height / oceanDepthClass
→ crustThickness / crustAge / crustProvince
→ crust province terrain delta
→ height
```

Better:

```text
plate + skeleton + tectonic context
→ crust causes
→ terrain influence
```

Height should be a weak modifier, not a primary classifier.

### 2. Add explicit diagnostics for cause-only reseed risk

Stages like these do not change height but can change export labels:

```text
CRUST_FIELDS
FINAL_CONTINENT_RESEED
FINAL_CRUST_RESEED
```

Need a diagnostic like:

```text
cause-only label changed export/color/debug risk
```

Because the current issue is not only terrain height. It is also final labels/materials/province metadata.

### 3. Treat `CRUST_PROVINCE_DELTA` as the main province terrain risk

This pass should probably have stronger limits based on:

```text
province seam imprint
plate seam imprint
land-body count change
medium fragment change
export-height risk
```

Not only topology flips.

### 4. Keep crust skeleton but enforce that it remains repair-only

The current code says it is restrained, but the numbers show it still changes topology significantly.

It should maybe be measured by:

```text
allowed repair improvement
vs
added imprint cost
```

If it reduces fragments but increases plate/province imprint too much, it should back off.

### 5. Rebalance quality pass for relief

If land relief is the goal, the current quality pass should be checked because on seed 67 it reduces land relief.

Possible causes:

```text
coastal breakup overpowering interior relief
strait cuts reducing relief
shelf roughness not helping land relief
interior relief too weak or too gated
```

## Final Diagnostic Conclusions

```text
1. First plate/skeleton/province imprint jump:
   - Plate height imprint: SKELETON_ELEVATION
   - Skeleton identity imprint: CONTINENT_FIELDS
   - Province identity imprint: CRUST_FIELDS
   - Province terrain imprint: CRUST_PROVINCE_DELTA

2. Skeleton elevation over-amplifies plate-shaped structure before crust:
   - Yes, somewhat. It is the first major visible amplification stage.

3. Crust delta creates too many land bodies/fragments:
   - It adds land bodies, but not medium fragments in seed 67.

4. Crust cohere repairs crust delta damage:
   - Partly, but main repairs are crust skeleton obedience and tiny island cleanup.

5. Crust skeleton double-applies skeleton authority:
   - Yes. It is restrained but still a second skeleton terrain pass.

6. Crust fields create feedback:
   - Yes. Current crust fields are partly derived from height/oceanDepthClass, then used to modify height.

7. Stage that helps relief:
   - Best: CRUST_SKELETON_OBEDIENCE
   - Also helps slightly: SKELETON_ELEVATION
   - Hurts most: CRUST_PROVINCE_DELTA
   - Unexpectedly hurts: QUALITY_PASS

8. Pass that most increases export risk:
   - Terrain export risk: CRUST_PROVINCE_DELTA
   - Metadata/debug/export label risk: CRUST_FIELDS
   - Final label risk: FINAL_CRUST_RESEED
```
