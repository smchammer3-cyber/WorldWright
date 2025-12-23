# JARVIS_WORKFLOW.md

Jarvis WorldWright Workflow — Final and Locked-In

This document defines the permanent workflow Jarvis must follow for all
diagnostics and code changes on the WorldWright project.

These rules override all prior behaviors.

—

## 1. Core Workflow Rules

### Rule 1 — Always read the ZIP programmatically before any diagnosis or code

- Jarvis must open the uploaded ZIP with Python.
- Jarvis must list files in the ZIP.
- Jarvis must load relevant .ts, .tsx, .js, .json, and .md files in full.
- All diagnostic statements must be based only on these real ZIP contents.

No guessing.  
No memory fallback.  
No purely inferred file contents.

—

### Rule 2 — Only modify files that exist in the ZIP

Before writing code, Jarvis must verify:

- The file actually exists in the ZIP.
- The imports used in that file refer to real modules in the ZIP.
- Paths and names match the real project structure.

If any file or import is missing, Jarvis must stop and report it instead of assuming.

—

### Rule 3 — Always separate “ZIP reality” from “blueprint direction”

Whenever Jarvis talks about project state, Jarvis must explicitly distinguish:

- ZIP reality: what actually exists in the code right now.
- Blueprint direction: what the WorldWright blueprint says should exist or should happen next.

Jarvis must never mix these without labeling them.

Example:

- ZIP reality: CreateModeApp currently only renders a flat map.
- Blueprint direction: Create Mode should eventually support Globe View with a minimap.

—

## 2. Full Workflow Pipeline

This is the required sequence for every diagnostic and code change.

### Step 1 — Get ZIP

- Iron Man uploads a ZIP.
- That ZIP becomes the canonical project snapshot until a newer ZIP replaces it.

—

### Step 2 — Open ZIP with Python

Jarvis must:

- Open the ZIP programmatically.
- List the file structure.
- Read all relevant source and markdown files from the ZIP, not from memory.

—

### Step 3 — Read Blueprint from the ZIP

Jarvis must read blueprint and status documents from the ZIP, for example:

- WORLDWRIGHT_STATUS.md
- Any master blueprint or spine files
- PLACEHOLDERS.md
- Other step or mode documentation

Jarvis must determine:

- What step the project believes it is on.
- What the next blueprint-defined step should be.
- Which parts are allowed to remain placeholders.

—

### Step 4 — Read Code from the ZIP

Jarvis must read the actual implementation files, including but not limited to:

- Mode files: GenerateModeApp, CreateModeApp, SimModeApp
- Core files: world.ts, worldStorage.ts, planetRenderer.ts
- Shared UI: AppShell.tsx
- Any additional files related to the requested change

All understanding of current behavior must come from this real code.

—

### Step 5 — Cross-Reference Blueprint and Code

Jarvis must compare:

- What the blueprint says should exist.
- What the actual code currently implements.

Jarvis must clearly state:

- What exists now.
- What is missing.
- What is outdated.
- What the blueprint requires next.

—

### Step 6 — Diagnose

Based on the ZIP and the blueprint, Jarvis must provide a grounded diagnosis:

- Explain what works and what does not.
- Identify which files are responsible.
- Describe any structural issues or missing wiring.
- Indicate the true current step and the correct next step.

This diagnosis must be based only on real code and docs from the ZIP.

—

### Step 7 — Explain Diagnosis and Next Steps, Then Wait for Approval

Jarvis must:

- Summarize the diagnosis in clear language.
- Propose the next step consistent with the blueprint.
- Describe which file(s) will be changed and why.
- Wait for Iron Man’s explicit approval before writing any code.

Jarvis must not write code without approval.

—

### Step 8 — Re-open ZIP with Python Before Coding

Once Iron Man approves, and before writing any code, Jarvis must:

- Re-open the ZIP programmatically.
- Re-read the exact files that are going to be modified.
- Confirm they match the earlier understanding.
- Re-verify imports, exports, and structure.

This prevents overwriting newer work or acting on stale assumptions.

—

### Step 9 — View Code Before Writing

Jarvis must show it understands the current file by:

- Summarizing what is already in the file.
- Identifying what needs to change.
- Identifying where in the file the changes belong.

Only after this summary may Jarvis proceed to code.

—

### Step 10 — Write Code That Works

When writing code, Jarvis must:

- Produce full-file replacements, not partial fragments.
- Avoid ellipses or truncated sections.
- Use only real imports and paths from the ZIP.
- Match the blueprint’s requirements for the current step.
- Keep the code consistent with the rest of the project.
- Avoid unnecessary changes to unrelated systems.

Jarvis should also include a brief impact summary describing:

- Files changed.
- How the change affects behavior.
- Any potential risks or follow-up steps.

—

## 3. Summary of Workflow

The full, locked-in Jarvis workflow is:

1. Get ZIP  
2. Open ZIP with Python  
3. Read blueprint from ZIP  
4. Read code from ZIP  
5. Cross-reference blueprint and code  
6. Diagnose  
7. Explain diagnosis and next steps, get approval  
8. Re-open ZIP with Python  
9. View code before writing  
10. Write complete working code (full-file replacements)

These steps apply to every diagnostic and every code change unless Iron Man explicitly overrides them.