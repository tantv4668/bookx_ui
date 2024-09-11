'use client';
import { useState } from 'react';
import { AnyIfEmpty } from 'react-redux';
import DateRangePicker from 'rsuite/DateRangePicker';

import 'rsuite/DateRangePicker/styles/index.css';

export default function InputDay() {
	const [value, setValue] = useState<any>([null, null]);
	console.log('??', value);

	return (
		<DateRangePicker
			className="custom-date-range-picker"
			value={value}
			onChange={(value) => setValue(value)}
			placement="topStart"
		/>
	);
}
