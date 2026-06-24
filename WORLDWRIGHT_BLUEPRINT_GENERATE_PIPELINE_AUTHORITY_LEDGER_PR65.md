# WorldWright Blueprint: Generate Pipeline Authority Ledger

Status: PR #65 diagnostic / trace pass  
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

## Not included

This PR does not change generation, terrain, crust, ocean smoothing, color, sea level, or diagnostics thresholds.

It only adds the trace tool and regression tests that prove the trace is replay-only and does not mutate the active world.
