'use client';
import DateRangePicker from 'rsuite/DateRangePicker';

import 'rsuite/DateRangePicker/styles/index.css';

interface Props {
	startEndDay: [Date, Date];
	setStartEndDay: (value: any) => void;
}

export default function InputDay({ setStartEndDay, startEndDay }: Props) {
	return (
		<DateRangePicker
			className="custom-date-range-picker"
			value={startEndDay}
			onChange={(value: any) => {
				setStartEndDay(value);
			}}
			placement="topStart"
		/>
	);
}
