import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckSquare } from "./CheckSquare";

const meta: Meta<typeof CheckSquare> = {
  title: "Shared/CheckSquare",
  component: CheckSquare,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CheckSquare>;

export const Primary: Story = {
  args: {
    isActive: false,
  },
};
