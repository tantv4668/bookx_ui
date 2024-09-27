'use client';

import React, { FC } from 'react';
import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
	size?: number;
	className?: string;
}

export const FundingIcon: FC<IconProps> = (props) => {
	const { size, className, ...rest } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
			{...rest}
			className={`orderly-w-4 orderly-h-4 ${className}`}
		>
			<path
				fill="currentcolor"
				fillOpacity="1"
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.998 2.014a4 4 0 00-4 4v12a4 4 0 004 4h8a4 4 0 004-4v-12a4 4 0 00-4-4h-8zm0 2h8a2 2 0 012 2v12a2 2 0 01-2 2h-8a2 2 0 01-2-2v-12a2 2 0 012-2zm1 2a1 1 0 00-1 1v1a1 1 0 001 1h6a1 1 0 001-1v-1a1 1 0 00-1-1h-6zm0 4a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 100 2 1 1 0 000-2zm-6 3a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 00-1 1v3a1 1 0 002 0v-3a1 1 0 00-1-1zm-6 3a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 100 2 1 1 0 000-2z"
			></path>
		</svg>
	);
};
