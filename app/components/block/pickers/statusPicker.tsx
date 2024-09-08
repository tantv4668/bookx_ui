'use client';
import { FC } from 'react';
import { BasePickerProps } from './types';
import { Select } from '../../select';

export interface StatusPickerProps extends BasePickerProps<any> {}

export const StatusPicker: FC<StatusPickerProps> = (props) => {
	return (
		<div id="orderly-status-picker">
			<Select label="All Status" size={'small'} options={[]} />
		</div>
	);
};
