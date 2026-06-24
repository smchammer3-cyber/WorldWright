# WorldWright Blueprint: Generate Pipeline Authority Ledger

Status: PR #65 diagnostic / trace pass; PR #66 interpretation clarification  
Purpose: make Generate Mode explain the full authority circuit from first source to final output.

---

## Why

Reading the pipeline order tells us which functions run, but it does not prove authority flow.

A planet generator can look linear while still feeding backward:

```text
height -> cause fields -> terrain -> cause fields again
```

That feedback is not always wrong, but it must be visible. Otherwise every terrain/color fix becomes guesswork.

---

## Electrical-style trace

The new ledger treats the Generate pipeline like a circuit trace:

```text
source fires
-> stage reads expected layers
-> stage writes allowed layers
-> snapshot diff proves what actually changed
-> warning if a stage wrote outside its authority
-> next stage receives the changed state
```

This gives a stage-by-stage ledger of:

- phase
- expected reads
- allowed writes
- actual writes
- unexpected writes
- changed cell share
- terrain write share
- land/water flip share
- mean/max height delta
- collection changes such as rivers
- warnings about backward or circular authority

---

## Phase language

```text
source              first generator source fields
cause-seed          writes identity/cause fields, should not shape terrain
terrain-shape       writes terrain from established causes
terrain-cleanup     adjusts terrain topology/detail safely
derived-recompute   derives water/climate/biome/rivers from terrain
final-cause-sync    final debug/metadata sync only, must not feed terrain again
```

---

## Important warnings

The ledger intentionally warns on patterns like:

```text
Cause seed reads height after terrain has already been shaped.
Crust province reads terrain/ocean class, then later shapes terrain.
Skeleton shapes terrain twice.
Final cause sync reads final terrain and must not be used later for terrain shaping.
Derived recompute wrote terrain.
Cause seed wrote terrain.
Terrain stage caused large land/water flips.
```

Some warnings are not immediate bugs. They are checkpoints. The purpose is to make feedback visible instead of hidden.

---

## Interpreting the current self-reference points

The first trace runs showed the pipeline was not wildly miswired: no stage was writing completely forbidden fields. That does not mean the design is safe. It means the problems are more specific.

### Continent fields

The early continent/skeleton seed reads terrain and plate context, then writes skeleton cause fields.

This is acceptable as an initial interpretation, but it must stay broad:

```text
seed/parameters/plate context + broad generated terrain -> continent intent
```

It becomes dangerous if later terrain edits or terrain shaping keep redefining the skeleton:

```text
terrain -> skeleton -> terrain -> skeleton -> terrain
```

### Crust fields

Crust fields currently read terrain and derived surface context, then write crust fields.

That is a backward-risk checkpoint because crust terrain later reads those crust fields and changes terrain.

The safe interpretation is:

```text
features/history -> continuous crust material fields -> smooth terrain response
```

The unsafe interpretation is:

```text
height/depth -> crustProvince label -> height stamp
```

### Ocean depth class

Ocean depth class is derived from height/depth. It can be displayed and diagnosed, but it must not be treated as original bathymetric cause by itself.

Unsafe loop:

```text
height makes water deep
-> recompute labels it trench
-> smoothing protects it as caused trench
```

Real ocean feature authority must come from explicit feature causes such as divergent ridges, convergent trenches, rifts, arcs, uplift, volcanism, or future feature-distance fields.

### Final cause sync

Final continent/crust reseeds are allowed only because they are terminal debug/metadata sync stages.

This is safe:

```text
final recompute -> final cause sync -> stop
```

This is not safe:

```text
final cause sync -> terrain shaping
```

---

## Relationship to cause-order audit

The existing cause-order audit answers:

```text
What did the world look like after each stage?
Did seam/authority metrics get better or worse?
```

The new authority ledger answers:

```text
Which stage fired?
What was it allowed to read/write?
What did it actually change?
Where does authority flow backward?
```

Both are useful. The cause-order audit is the oscilloscope; the ledger is the wiring diagram plus voltage trace.

---

## Contract rules for future terrain work

Future terrain fixes should obey these rules:

```text
1. Cause-seed stages write identity/cause fields only.
2. Derived-recompute stages never write terrain or upstream cause fields.
3. Terrain-shape stages read established cause/material fields and write terrain.
4. Final-cause-sync stages are terminal and cannot be followed by terrain-shape stages.
5. Derived labels such as oceanDepthClass and baseBiomeId are not original cause authority.
6. Province labels are summaries; continuous crust material fields are the terrain authority.
```

---

## Not included

This PR does not change generation, terrain, crust, ocean smoothing, color, sea level, or diagnostics thresholds.

It only adds the trace tool and regression tests that prove the trace is replay-only and does not mutate the active world.
