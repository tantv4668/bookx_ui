'use client';
import type { Meta, StoryObj } from "@storybook/react";
import { TokenListView } from "./tokenListView";

const meta: Meta<typeof TokenListView> = {
  component: TokenListView,
  title: "Block/TokenPicker",
  argTypes: {
    onItemClick: { action: "onItemClick" },
  },
};

export default meta;

type Story = StoryObj<typeof TokenListView>;

export const Default: Story = {
  args: {
    tokens: [
      {
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        symbol: "ETH",
        decimals: 18,
        display_name: "",
        precision: 0
      },
      {
        address: "0x4200000000000000000000000000000000000006",
        symbol: "ETH",
        decimals: 18,
        display_name: "",
        precision: 0
      },
      {
        address: "0x925AFA2318825FCAC673Ef4eF551208b125dd965",
        symbol: "BTC",
        decimals: 8,
        display_name: "",
        precision: 0
      },
      {
        address: "0xa2101FD320D06e0A744e4FE90ef8A20ECd027001",
        symbol: "USDT",
        decimals: 6,
        display_name: "",
        precision: 0
      },
      {
        address: "0x2e668Bb88287675e34c8dF82686dfd0b7F0c0383",
        symbol: "USDC",
        decimals: 6,
        display_name: "",
        precision: 0
      },
      {
        address: "0x5C8ef0FA2b094276520D25dEf4725F93467227bC",
        symbol: "sgUSDC",
        decimals: 6,
        display_name: "",
        precision: 0
      },
    ],
    fetchBalance: () => {
      return Promise.resolve(0);
    },
  },
};
