'use client';
import type { Meta, StoryObj } from "@storybook/react";
import { Deposit } from ".";
import { usePreLoadData } from "@orderly.network/hooks";
import { DepositWithDialog } from "./dialog";
// import { Button } from "@/button";

import React from "react";
import { AssetsProvider } from "../../provider";
import { modal } from "../../modal";

const meta: Meta<typeof Deposit> = {
  component: Deposit,
  title: "Block/Deposit",
  tags: ["autodocs"],

  argTypes: {
    // onDeposit: { action: "onDeposit" },
    // onConnectWallet: { action: "onConnectWallet" },
  },
  args: {},
};

export default meta;

type Story = StoryObj<typeof Deposit>;

export const Default: Story = {
  // args: {},
};

export const WithHooks: Story = {
  render: (args) => {
    const { error, done } = usePreLoadData();

    if (!done) return <div>loading</div>;
    return (
      <AssetsProvider>
        <Deposit {...args} />
      </AssetsProvider>
    );
  },
};

export const WithDialog: Story = {
  render: (args) => {
    const onClick = () => {
      modal.show(DepositWithDialog);
    };
    return <button onClick={onClick}>Deposit</button>;
  },
};
