'use client';

import React, { FC } from 'react';
import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
	size?: number;
	className?: string;
}

export const WithdrawIcon: FC<IconProps> = (props) => {
	const { size, className, ...rest } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			fill="none"
			viewBox="0 0 24 24"
			{...rest}
			className={`oui-text-inherit ${className}`}
		>
			<path
				fill="currentcolor"
				fillOpacity="1"
				fillRule="evenodd"
				clipRule="evenodd"
				d="M6.99 20.99a4 4 0 01-4-4v-10a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4h-10zm5-4a1 1 0 001-1v-5h3l-4-4-4 4h3v5a1 1 0 001 1z"
			></path>
		</svg>
	);
};
