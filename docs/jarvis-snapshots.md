# Jarvis snapshots

WorldWright can generate repeatable Jarvis review artifacts from the Generate screen with:

```bash
npm install --no-save --no-package-lock playwright
npx playwright install chromium
npm run snapshots:jarvis
```

The script starts the Vite app, opens `/generate` in Chromium, sets fixed seeds, captures a visible Generate screenshot, clicks the in-app `Export Jarvis Pack` button, and writes artifacts to:

```text
artifacts/jarvis-snapshots/
```

Default seeds:

```text
1040037,860009786
```

Useful overrides:

```bash
npm run snapshots:jarvis -- --seeds=12345,67890 --width=256 --viewport=1440x1100
```

A CI job can upload `artifacts/jarvis-snapshots/` as a temporary artifact after running the script. Generated screenshots and review packs should stay out of git history.
