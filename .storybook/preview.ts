import type { Preview } from "@storybook/react";
import "../src/styles/reset.css";
import "../src/styles/tokens.light.css";
import "../src/styles/tokens.dark.css";
import "../src/styles/base.css";
import { installGa4, trackStoryView } from "./ga4";

installGa4();

const preview: Preview = {
  parameters: {
    controls: { expanded: true, matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: { disable: true },
    a11y: {
      config: {
        rules: [
          { id: "color-contrast", enabled: true },
          { id: "focus-visible", enabled: true },
        ],
      },
    },
    options: {
      storySort: {
        order: ["Introduction", "Foundations", ["Tokens"], "Components", ["Button", "Icon Button", "Checkbox", "Radio"]],
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, ctx) => {
      const theme = (ctx.globals.theme as "light" | "dark") ?? "light";
      const root = document.documentElement;
      root.setAttribute("data-theme", theme);
      try {
        localStorage.setItem("sb-theme", theme);
      } catch {
        /* storage disabled */
      }
      trackStoryView(ctx.id);
      return Story();
    },
  ],
};

export default preview;
