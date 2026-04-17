import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Shared/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "gray", "red"],
    },
    isLoading: {
      control: "boolean",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Gray: Story = {
  args: {
    variant: "gray",
    children: "Gray Button",
  },
};

export const Red: Story = {
  args: {
    variant: "red",
    children: "Red Button",
  },
};

export const Loading: Story = {
  args: {
    variant: "primary",
    isLoading: true,
    children: "Loading Button",
  },
};
