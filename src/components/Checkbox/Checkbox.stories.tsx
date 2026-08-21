import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, type CheckboxCheckedState, type CheckboxForcedState } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Qwark Checkbox — mirrors Figma node 3907:23153. Selected / Unselected / Indeterminate × Enabled / Hovered / Focused / Pressed / Disabled, with parallel Error variants for validation flows.",
      },
    },
  },
  args: {
    label: "Accept terms",
    checkedState: "unchecked",
    error: false,
    forcedState: "default",
  },
  argTypes: {
    checkedState: { control: "inline-radio", options: ["checked", "unchecked", "indeterminate"] },
    forcedState:  { control: "inline-radio", options: ["default", "hover", "focused", "pressed", "disabled"] },
    error:        { control: "boolean" },
    disabled:     { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Checked:       Story = { args: { checkedState: "checked" } };
export const Unchecked:     Story = { args: { checkedState: "unchecked" } };
export const Indeterminate: Story = { args: { checkedState: "indeterminate" } };
export const ErrorChecked:  Story = { args: { checkedState: "checked", error: true, label: "This field has an error" } };

const CHECKED: CheckboxCheckedState[] = ["checked", "unchecked", "indeterminate"];
const STATES:  CheckboxForcedState[]  = ["default", "hover", "focused", "pressed", "disabled"];

export const AllStates: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "grid", gap: 32 }}>
      {[false, true].map((err) => (
        <section key={err ? "err" : "ok"}>
          <h3 style={{ margin: "0 0 12px", fontFamily: "var(--font-family-serif)" }}>{err ? "Error variants" : "Standard"}</h3>
          <table style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: 8 }}> </th>
                {CHECKED.map((c) => (
                  <th key={c} style={{ padding: 8, textAlign: "left", textTransform: "capitalize", fontFamily: "var(--font-family-serif)" }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STATES.map((st) => (
                <tr key={st}>
                  <td style={{ padding: 8, opacity: 0.7, textTransform: "capitalize", fontFamily: "var(--font-family-serif)" }}>{st}</td>
                  {CHECKED.map((c) => (
                    <td key={c} style={{ padding: 8 }}>
                      <Checkbox checkedState={c} error={err} forcedState={st} label="Label" />
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
