import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Shared/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    isSelected: false,
    children: "Card Box",
  },
};
export const Selected: Story = {
  args: {
    isSelected: true,
    children: "Card Box",
  },
};

export const Dimmed: Story = {
  args: {
    isDimmed: true,
    children: "Card Box",
  },
};
