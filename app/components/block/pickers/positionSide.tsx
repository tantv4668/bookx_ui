'use client';
import { FC } from 'react';
import { BasePickerProps } from './types';
import { Picker } from '../../select';

interface SidePickerProps extends BasePickerProps<any> {}

export const SidePicker: FC<SidePickerProps> = () => {
	return (
		<Picker
			id="orderly-side-picker"
			size={'small'}
			options={[
				{
					label: 'Buy',
					value: 'buy',
				},
				{
					label: 'Sell',
					value: 'sell',
				},
			]}
			label="All Side"
		></Picker>
	);
};
