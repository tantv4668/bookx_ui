'use client';

import React, { FC } from 'react';
import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
	size?: number;
	className?: string;
}

export const DownIcon: FC<IconProps> = (props) => {
	const { size, className, ...rest } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="12"
			height="12"
			fill="none"
			viewBox="0 0 24 24"
			{...rest}
			className={`oui-transition-transform group-data-[state=open]:oui-rotate-180 group-data-[state=closed]:oui-rotate-0 oui-text-inherit ${className}`}
			aria-hidden="true"
		>
			<path
				fill="currentcolor"
				fillOpacity="1"
				fillRule="evenodd"
				clipRule="evenodd"
				d="M6.007 7.996c-.824 0-1.276.935-.781 1.594l6 8a.994.994 0 0 0 1.593 0l6-8c.495-.66.012-1.594-.812-1.594h-12Z"
			></path>
		</svg>
	);
};
