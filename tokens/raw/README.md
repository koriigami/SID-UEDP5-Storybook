# tokens/raw

Design tokens exported from Figma variables. Do NOT hand-edit
`primitives.json`, `semantic.light.json`, or `semantic.dark.json` for
production — run `npm run tokens:fetch` (requires Figma MCP attached to the
session and `FIGMA_ACCESS_TOKEN` set) to regenerate them from the source of
truth: Figma file `_prod-design-system-V0.2.0`, node `271-15877`.

The seed values in this repo are placeholders sized to real design-system
proportions so the Storybook build works before Figma MCP is reachable —
Style Dictionary consumes them and emits `src/styles/tokens.light.css` and
`src/styles/tokens.dark.css`.

File layout:
- `primitives.json` — mode-agnostic scales (color primitives, spacing,
  radius, font sizes, weights, line-heights, motion durations & easings,
  shadow templates).
- `semantic.light.json` — light-mode aliases (`color.surface.canvas`,
  `color.text.primary`, …) that reference primitives.
- `semantic.dark.json` — dark-mode aliases with the same shape.
- `meta.json` — provenance from the fetch script (file key, node id,
  fetched-at). Small enough to commit; makes token diffs auditable in
  review.
