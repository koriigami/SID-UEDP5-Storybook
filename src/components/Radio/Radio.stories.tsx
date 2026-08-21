import type { Meta, StoryObj } from "@storybook/react";
import { Radio, type RadioForcedState } from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Qwark Radio — mirrors Figma node 4475:26681. Two selection states × five interactive states.",
      },
    },
  },
  args: {
    label: "Option A",
    checked: false,
    forcedState: "default",
  },
  argTypes: {
    checked:     { control: "boolean" },
    forcedState: { control: "inline-radio", options: ["default", "hover", "focused", "pressed", "disabled"] },
    disabled:    { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Radio>;

export const Selected:   Story = { args: { checked: true } };
export const Unselected: Story = { args: { checked: false } };

const STATES: RadioForcedState[] = ["default", "hover", "focused", "pressed", "disabled"];

export const AllStates: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <table style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ padding: 8 }}> </th>
          <th style={{ padding: 8, textAlign: "left", fontFamily: "var(--font-family-serif)" }}>Selected</th>
          <th style={{ padding: 8, textAlign: "left", fontFamily: "var(--font-family-serif)" }}>Unselected</th>
        </tr>
      </thead>
      <tbody>
        {STATES.map((st) => (
          <tr key={st}>
            <td style={{ padding: 8, opacity: 0.7, textTransform: "capitalize", fontFamily: "var(--font-family-serif)" }}>{st}</td>
            <td style={{ padding: 8 }}><Radio name={`ex-${st}-1`} checked forcedState={st} label="Label" /></td>
            <td style={{ padding: 8 }}><Radio name={`ex-${st}-2`} checked={false} forcedState={st} label="Label" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
