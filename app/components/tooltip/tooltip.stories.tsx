'use client';
import type { Meta, StoryObj } from "@storybook/react";

import { Tooltip } from ".";
import React from "react";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: "Base/Tooltip",
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args: any) => (
    <Tooltip content="Quantity should be less or equal to your max Buy.">
      <button>Tooltip trigger</button>
    </Tooltip>
  ),
  args: {
    // label: "Take profit / Stop loss",
  },
};
