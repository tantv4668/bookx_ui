'use client';

import React, { FC } from 'react';
import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
	size?: number;
	className?: string;
}

export const CopyIDIcon: FC<IconProps> = (props) => {
	const { size, className, ...rest } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="none"
			viewBox="0 0 24 24"
			{...rest}
			className={`orderly-text-white ${className}`}
		>
			<path
				fill="currentcolor"
				fill-opacity="0.54"
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M6.998 2.99a4 4 0 00-4 4v6a4 4 0 004 4 4 4 0 004 4h6a4 4 0 004-4v-6a4 4 0 00-4-4 4 4 0 00-4-4h-6zm10 6a2 2 0 012 2v6a2 2 0 01-2 2h-6a2 2 0 01-2-2h4a4 4 0 004-4v-4z"
			></path>
		</svg>
	);
};
