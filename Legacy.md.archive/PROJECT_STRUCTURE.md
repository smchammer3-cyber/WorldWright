# PROJECT_STRUCTURE.md
# WorldWright Project Structure (Stable Plain Markdown Version)

This document describes the current directory structure of the WorldWright project as of the latest ZIP.  
It reflects only the real existing folders and files.  
No future directories or speculative items are included.

————————————————————
ROOT STRUCTURE
————————————————————

WorldWright/
    index.html
    package.json
    vite.config.ts
    tsconfig.json

    /public
        (static assets, icons, manifest)

    /src
        main.tsx
        App.tsx

        /core
            worldGenerator.ts
            worldStorage.ts
            planetRenderer.ts

        /ui
            AppShell.tsx
            (shared layout and UI helpers)

        /screens
            HomeScreen.tsx
            GeneratorScreen.tsx      (legacy, not routed)
            EditorScreen.tsx         (legacy, not routed)

        /modes
            /generate
                GenerateModeApp.tsx
            /create
                CreateModeApp.tsx
            /sim
                SimModeApp.tsx

        /styles
            app.css
            globals.css

        /types
            (project-wide TypeScript types, if any)

————————————————————
NOTES
————————————————————

1. The project is now “modes-first.”
   Only HomeScreen is still used from the /screens folder.

2. GeneratorScreen.tsx and EditorScreen.tsx remain in the repo but are not used.

3. All active mini-apps (GenerateModeApp, CreateModeApp, SimModeApp) run inside AppShell.

4. This file reflects the exact structure in the latest ZIP. No generated, missing, or assumed folders are listed.

————————————————————
END OF FILE
————————————————————