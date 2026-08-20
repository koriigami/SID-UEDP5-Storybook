import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Interactive button with variants + sizes matching the Figma source. States: default, hover, pressed, focus-visible, disabled, loading. All values are token-driven — no hardcoded colors or spacing.",
      },
    },
  },
  args: {
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
    children: "Continue",
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "ghost", "danger"] },
    size:    { control: "inline-radio", options: ["sm", "md", "lg"] },
    loading: { control: "boolean" },
    disabled:{ control: "boolean" },
    children:{ control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary:   Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost:     Story = { args: { variant: "ghost" } };
export const Danger:    Story = { args: { variant: "danger", children: "Delete" } };

export const Loading:  Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };

export const IconOnly: Story = {
  args: {
    iconOnly: true,
    ariaLabel: "Save file",
    children: (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M17 3H7a2 2 0 0 0-2 2v14l7-3 7 3V5a2 2 0 0 0-2-2Z" />
      </svg>
    ),
  },
};

/** Grid story used by the MDX docs page — every variant × every state. */
export const AllStates: Story = {
  parameters: { layout: "padded" },
  render: () => {
    const variants: Array<"primary" | "secondary" | "ghost" | "danger"> = [
      "primary", "secondary", "ghost", "danger",
    ];
    const rows: Array<{ label: string; extra: Record<string, unknown> }> = [
      { label: "Default",  extra: {} },
      { label: "Disabled", extra: { disabled: true } },
      { label: "Loading",  extra: { loading: true } },
    ];
    return (
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: 8, textAlign: "left" }}> </th>
            {variants.map((v) => (
              <th key={v} style={{ padding: 8, textTransform: "capitalize", textAlign: "left" }}>{v}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <td style={{ padding: 8, opacity: 0.7 }}>{r.label}</td>
              {variants.map((v) => (
                <td key={v} style={{ padding: 8 }}>
                  <Button variant={v} {...r.extra}>Continue</Button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
};
