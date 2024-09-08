'use client';
import type { Meta, StoryObj } from '@storybook/react';

import { AssetAndMarginSheet } from './sections/assetAndMargin';

const meta: Meta<typeof AssetAndMarginSheet> = {
	//   tags: ["autodocs"],
	component: AssetAndMarginSheet,
	title: 'Block/AccountStatus/AssetAndMargin',

	argTypes: {
		onLeverageChange: {
			name: 'onLeverageChange',
		},
	},
};

export default meta;

type Story = StoryObj<typeof AssetAndMarginSheet>;

export const Default: Story = {};
