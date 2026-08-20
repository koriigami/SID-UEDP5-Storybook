import { addons } from "@storybook/manager-api";
import { themes } from "@storybook/theming";

const stored = (() => {
  try { return localStorage.getItem("sb-theme"); } catch { return null; }
})();

addons.setConfig({
  theme: stored === "dark" ? themes.dark : themes.light,
  sidebar: { showRoots: true },
});
