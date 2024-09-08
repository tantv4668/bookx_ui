'use client';
import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarImage } from ".";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: "Base/Avatar",
  argTypes: {
    // onCheckedChange: { action: "checkedChange" },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const Base: Story = {
  render: () => {
    return (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    );
  },
};
