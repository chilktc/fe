import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Shared/Chip",
  component: Chip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Basic: Story = {
  args: {
    selected: false,
    children: "chip",
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    children: "chip",
  },
};
