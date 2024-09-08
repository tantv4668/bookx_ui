'use client';

import React, { FC } from 'react';
import { SVGProps } from 'react';

export interface IconProps {
	size: number;
	className?: string | undefined;
}

export const CheckIcon: FC<IconProps> = (props) => {
	const { size = 20, className, ...rest } = props;
	return (
		<svg width={`${size}px`} height={`${size}px`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<mask
				id="mask0_3451_8999"
				style={{ maskType: 'alpha' }}
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="20"
				height="20"
			>
				<rect width="20" height="20" fill="#D9D9D9" />
			</mask>
			<g mask="url(#mask0_3451_8999)">
				<path
					d="M8.9375 13L13.8958 8.0625L12.8333 7L8.9375 10.875L7.16667 9.125L6.10417 10.1875L8.9375 13ZM4.5 17C4.0875 17 3.73437 16.8531 3.44062 16.5594C3.14687 16.2656 3 15.9125 3 15.5V4.5C3 4.0875 3.14687 3.73438 3.44062 3.44063C3.73437 3.14688 4.0875 3 4.5 3H15.5C15.9125 3 16.2656 3.14688 16.5594 3.44063C16.8531 3.73438 17 4.0875 17 4.5V15.5C17 15.9125 16.8531 16.2656 16.5594 16.5594C16.2656 16.8531 15.9125 17 15.5 17H4.5Z"
					fill="white"
					fillOpacity="0.98"
				/>
			</g>
		</svg>
	);
};
