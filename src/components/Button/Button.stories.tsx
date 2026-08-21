import type { Meta, StoryObj } from "@storybook/react";
import { Button, type ButtonType, type ButtonSize, type ButtonForcedState } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Qwark Button — mirrors Figma node 14:21. Type (primary/tonal/outline/text), size (default/small/xsmall), and state (default/hover/focused/pressed/disabled) match the Figma variant properties 1:1. All values are token-driven — no hardcoded colors, radii, or type.",
      },
    },
  },
  args: {
    buttonType: "primary",
    size: "default",
    forcedState: "default",
    loading: false,
    disabled: false,
    children: "Continue",
  },
  argTypes: {
    buttonType:  { control: "inline-radio", options: ["primary", "tonal", "outline", "text"] },
    size:        { control: "inline-radio", options: ["default", "small", "xsmall"] },
    forcedState: { control: "inline-radio", options: ["default", "hover", "focused", "pressed", "disabled"] },
    loading:     { control: "boolean" },
    disabled:    { control: "boolean" },
    children:    { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { buttonType: "primary" } };
export const Tonal:   Story = { args: { buttonType: "tonal" } };
export const Outline: Story = { args: { buttonType: "outline" } };
export const Text:    Story = { args: { buttonType: "text" } };

export const Small:  Story = { args: { size: "small" } };
export const XSmall: Story = { args: { size: "xsmall" } };

export const Loading:  Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };

const TYPES:  ButtonType[]         = ["primary", "tonal", "outline", "text"];
const SIZES:  ButtonSize[]         = ["default", "small", "xsmall"];
const STATES: ButtonForcedState[]  = ["default", "hover", "focused", "pressed", "disabled"];

/** The full 4 × 3 × 5 matrix — proof every Figma variant is implemented. */
export const AllStates: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "grid", gap: 32 }}>
      {SIZES.map((s) => (
        <section key={s}>
          <h3 style={{ margin: "0 0 12px", fontFamily: "var(--font-family-serif)", textTransform: "capitalize" }}>
            Size — {s}
          </h3>
          <table style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: 8, textAlign: "left" }}> </th>
                {TYPES.map((t) => (
                  <th key={t} style={{ padding: 8, textAlign: "left", textTransform: "capitalize", fontFamily: "var(--font-family-serif)" }}>
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STATES.map((st) => (
                <tr key={st}>
                  <td style={{ padding: 8, opacity: 0.7, textTransform: "capitalize", fontFamily: "var(--font-family-serif)" }}>{st}</td>
                  {TYPES.map((t) => (
                    <td key={t} style={{ padding: 8 }}>
                      <Button buttonType={t} size={s} forcedState={st}>Continue</Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  ),
};
