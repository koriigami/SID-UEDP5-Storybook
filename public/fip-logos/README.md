# FIP logos (Financial Information Provider marks)

Real bank / depository / RTA / CRA logos referenced by the Storybook
`Foundations → Icons — FIP Logos` page. Files are **not committed** because
the marks are trademarked — pull them fresh from Figma with:

```bash
export FIGMA_ACCESS_TOKEN=figd_...
npm run fip-logos:fetch
```

The script writes one `.svg` per entry in `src/stories/fip-logos.ts` using
the matching Figma nodeId. When a file is missing the Storybook card falls
back to a color-coded monogram chip — the page always renders.
