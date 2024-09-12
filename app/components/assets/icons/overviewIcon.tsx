'use client';

import React, { FC } from 'react';
import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
	size?: number;
	className?: string;
}

export const OverviewIcon: FC<IconProps> = (props) => {
	const { size, className, ...rest } = props;

	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...rest}
			className={className}
		>
			<path
				d="M5.24316 2.19727C3.58641 2.19727 2.24316 3.54044 2.24316 5.19727V12.6973C2.24316 14.3541 3.58641 15.6973 5.24316 15.6973H12.7432C14.3999 15.6973 15.7432 14.3541 15.7432 12.6973V5.19727C15.7432 3.54044 14.3999 2.19727 12.7432 2.19727H5.24316ZM5.24316 3.69727H12.7432C13.5719 3.69727 14.2432 4.36882 14.2432 5.19727V12.6973C14.2432 13.2484 13.9319 13.734 13.4894 13.9947C13.3454 12.2235 11.4427 11.1973 8.99316 11.1973C6.54366 11.1973 4.60341 12.251 4.48566 13.9997C4.04241 13.739 3.74316 13.2484 3.74316 12.6973V5.19727C3.74316 4.36882 4.41441 3.69727 5.24316 3.69727ZM8.99316 5.19727C7.54341 5.19727 6.36816 6.37252 6.36816 7.82227C6.36816 9.27202 7.54341 10.4473 8.99316 10.4473C10.4429 10.4473 11.6182 9.27202 11.6182 7.82227C11.6182 6.37252 10.4429 5.19727 8.99316 5.19727Z"
				className="orderly-fill-current group-data-[actived=true]:orderly-fill-[url(#side-menu-gradient)]"
			></path>
		</svg>
	);
};
