# SID · UEDP5 — Figma → Storybook Design System

Reference implementation students copy for Assignment 2. React + TypeScript +
Storybook 8, styled entirely from Figma variables via a Style Dictionary
pipeline, deployed to Vercel with Google Analytics 4.

Live: _add Vercel URL here after first deploy._

## Quick start

```bash
npm install
npm run dev                # http://localhost:6006
```

## What lives where

```
tokens/raw/                 # source-of-truth JSON exported from Figma
scripts/build-tokens.mjs    # Style Dictionary v4 build (one instance per mode)
scripts/fetch-figma-tokens.mjs  # Figma MCP → tokens/raw/*.json
src/styles/tokens.*.css     # GENERATED — light + dark CSS variables
src/tokens/generated.ts     # GENERATED — same data as TS, for the token gallery
src/components/Button       # variants, sizes, all states, ARIA, motion
src/components/Input        # label, hint, error, icon slots, ARIA
src/stories/Tokens.mdx      # visual proof no hex is hardcoded
.storybook/                 # framework config, theme toolbar, GA4, no-flash
docs/DEPLOY.md              # student-facing Vercel + GA4 walkthrough
```

## Refreshing tokens from Figma

1. Open the Figma file in **Figma Desktop** (the MCP is dev-mode-only).
2. Select any frame using the design-system variables.
3. In your Claude Code session, ask Claude to run `mcp__Figma__get_variable_defs`
   for the file and pipe the JSON into `node scripts/fetch-figma-tokens.mjs --stdin`.
4. Commit `tokens/raw/*.json` — the diff is your token changelog.

## Deploy

See [`docs/DEPLOY.md`](docs/DEPLOY.md).
