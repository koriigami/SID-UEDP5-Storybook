import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Text input with label, hint, error, and icon slots. Props mirror the Figma component's variant properties. States: default, hover, focus, disabled, error, empty (via `placeholder`).",
      },
    },
  },
  args: {
    label: "Email",
    placeholder: "you@example.com",
    size: "md",
  },
  argTypes: {
    size:    { control: "inline-radio", options: ["sm", "md", "lg"] },
    disabled:{ control: "boolean" },
    error:   { control: "text" },
    hint:    { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

const MailIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M4 6h16v12H4z M4 6l8 6 8-6" fill-rule="evenodd" />
    <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M4 6l8 6 8-6" />
  </svg>
);

export const Default: Story = {};
export const WithHint: Story = { args: { hint: "We only use this to sign you in." } };
export const WithError: Story = {
  args: { defaultValue: "not-an-email", error: "Enter a valid email address." },
};
export const WithLeadingIcon: Story = { args: { leadingIcon: MailIcon } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "locked@example.com" } };

export const AllStates: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "grid", gap: 24, minWidth: 320 }}>
      <Input label="Empty" placeholder="Empty state" />
      <Input label="With value" defaultValue="hello@world.com" />
      <Input label="With hint" hint="Helper text" placeholder="Type here" />
      <Input label="Error"     error="This field is required." />
      <Input label="Disabled"  disabled defaultValue="Locked" />
    </div>
  ),
};
