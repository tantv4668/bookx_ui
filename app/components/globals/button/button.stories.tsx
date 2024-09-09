'use client';
import Button from ".";
import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedButton } from "./segmented";
// @ts-ignore
import React from "react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Base/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
    onClick: { action: "clicked" },
  },
};

type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  render: (args) => {
    return (
      <div className="orderly-flex orderly-gap-3">
        <Button {...args} />
        <Button {...args} disabled />
      </div>
    );
  },
  args: {
    children: "Button",
    variant: "contained",
    size: "default",
  },
};

export const Buttons = {
  render: () => {
    return (
      <div className="orderly-flex orderly-flex-col orderly-gap-3">
        <div className="orderly-flex orderly-gap-3">
          <Button variant={"contained"} size={"small"}>
            Contained
          </Button>
          <Button variant={"outlined"} size={"small"}>
            Outlined
          </Button>
          <Button variant={"contained"} color={"sell"} size={"small"}>
            Sell
          </Button>{" "}
          <Button variant={"contained"} color={"buy"} size={"small"}>
            Buy
          </Button>
          <Button variant={"outlined"} size={"small"} color={"tertiary"}>
            Outlined
          </Button>
        </div>
        <div className="orderly-flex orderly-gap-3">
          <Button variant={"contained"} color={"primary"}>
            Primary
          </Button>
          <Button variant={"outlined"} color={"tertiary"}>
            Tertiary
          </Button>{" "}
          <Button variant={"contained"} color={"sell"}>
            Sell
          </Button>{" "}
          <Button variant={"contained"} color={"buy"}>
            Buy
          </Button>
          <Button variant={"outlined"}>Outlined</Button>
        </div>
      </div>
    );
  },
};

//shadow-[inset_0px_-5px_1px]

export const Segmented = {
  render: () => {
    const [value, setValue] = React.useState("buy");
    return (
      <div className="orderly-flex orderly-flex-col orderly-gap-3">
        <SegmentedButton
          buttons={[
            { label: "Buy", value: "buy" },
            { label: "Sell", value: "sell" },
          ]}
          onClick={(value: any) => {
            setValue(value);
          }}
          value={value}
        />
        <SegmentedButton
          buttons={[
            {
              label: "Buy",
              value: "buy",
              activeClassName:
                "orderly-bg-trade-profit orderly-text-trade-profit-contrast after:orderly-bg-trade-profit",
            },
            {
              label: "Sell",
              value: "sell",
              activeClassName:
                "orderly-bg-trade-loss orderly-text-trade-loss-contrast after:orderly-bg-trade-loss",
            },
          ]}
          onClick={(value: any) => {
            setValue(value);
          }}
          value={value}
        />
      </div>
    );
  },
};
