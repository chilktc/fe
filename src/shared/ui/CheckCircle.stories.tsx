import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckCircle } from "./CheckCircle";

const meta: Meta<typeof CheckCircle> = {
  title: "Shared/CheckCircle",
  component: CheckCircle,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckCircle>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};
