# WorldWright Blueprint: Movement Field Name Corrections

Status: correction note / authoritative errata  
Owner: Iron Man  
Purpose: record typo-level wording corrections discovered after creating `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MOVEMENT_TRAVEL_TRADE_SUITABILITY_CORE_CONTRACT.md`.

---

## 1. Corrected Wording

The following wording in the Movement / Travel / Trade Suitability core contract is a typographical mistake and must be interpreted as the corrected wording below.

```text
dice sheet -> ice sheet
```

---

## 2. Authority

```text
The corrected `ice sheet` wording is authoritative.
The `dice sheet` wording is invalid and must not be implemented.
```

---

## 3. Implementation Rule

When implementing Movement Suitability, diagnostics, schema types, artifacts, tests, micro-mode markers, and Unreal handoffs must use:

```text
ice sheet
```

and must reject or migrate:

```text
dice sheet
```

---

## 4. Follow-Up Cleanup

On the next full edit of `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_MOVEMENT_TRAVEL_TRADE_SUITABILITY_CORE_CONTRACT.md`, replace the invalid wording in-place.
