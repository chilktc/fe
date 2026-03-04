import type { Meta, StoryObj } from "@storybook/react";
import { CheckButton } from "./CheckButton";

const meta: Meta<typeof CheckButton> = {
  title: "Shared/CheckButton",
  component: CheckButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckButton>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};
