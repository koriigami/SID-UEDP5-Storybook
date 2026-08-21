import type { Meta, StoryObj } from "@storybook/react";
import { IconButton, type IconButtonType, type IconButtonSize, type IconButtonForcedState } from "./IconButton";

const DashboardIcon = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: "Components/Icon Button",
  component: IconButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Qwark Icon Button — mirrors Figma node 3863:32746. Circle-pill with an icon only; `ariaLabel` is required by the type so icon-only buttons cannot ship without an accessible name.",
      },
    },
  },
  args: {
    ariaLabel: "Dashboard",
    iconType: "primary",
    size: "default",
    forcedState: "default",
    icon: DashboardIcon,
  },
  argTypes: {
    iconType:    { control: "inline-radio", options: ["primary", "tonal", "outline", "standard"] },
    size:        { control: "inline-radio", options: ["default", "small", "xsmall"] },
    forcedState: { control: "inline-radio", options: ["default", "hover", "focused", "pressed", "disabled"] },
    disabled:    { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Primary:  Story = { args: { iconType: "primary" } };
export const Tonal:    Story = { args: { iconType: "tonal" } };
export const Outline:  Story = { args: { iconType: "outline" } };
export const Standard: Story = { args: { iconType: "standard" } };

const TYPES:  IconButtonType[]        = ["primary", "tonal", "outline", "standard"];
const SIZES:  IconButtonSize[]        = ["default", "small", "xsmall"];
const STATES: IconButtonForcedState[] = ["default", "hover", "focused", "pressed", "disabled"];

export const AllStates: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "grid", gap: 32 }}>
      {SIZES.map((s) => (
        <section key={s}>
          <h3 style={{ margin: "0 0 12px", fontFamily: "var(--font-family-serif)", textTransform: "capitalize" }}>Size — {s}</h3>
          <table style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: 8 }}> </th>
                {TYPES.map((t) => (
                  <th key={t} style={{ padding: 8, textAlign: "left", textTransform: "capitalize", fontFamily: "var(--font-family-serif)" }}>{t}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STATES.map((st) => (
                <tr key={st}>
                  <td style={{ padding: 8, opacity: 0.7, textTransform: "capitalize", fontFamily: "var(--font-family-serif)" }}>{st}</td>
                  {TYPES.map((t) => (
                    <td key={t} style={{ padding: 8 }}>
                      <IconButton ariaLabel={`${t} ${s} ${st}`} iconType={t} size={s} forcedState={st} icon={DashboardIcon} />
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
