'use client';

import React, { FC } from 'react';
import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
	size?: number;
	className?: string;
}

export const SelectDownIcon: FC<IconProps> = (props) => {
	const { size, className, ...rest } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="12px"
			height="12px"
			fill="currentColor"
			viewBox="0 0 12 12"
			{...rest}
			className={`orderly-transition-transform ${className}`}
		>
			<path d="M1.739 3.75a.24.24 0 0 0-.183.394l4.26 5.145a.238.238 0 0 0 .367 0l4.261-5.145a.24.24 0 0 0-.183-.394H1.739Z"></path>
		</svg>
	);
};
