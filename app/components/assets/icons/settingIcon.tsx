'use client';

import React, { FC } from 'react';
import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
	size?: number;
	className?: string;
}

export const SettingIcon: FC<IconProps> = (props) => {
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
				d="M6.72601 1.84159C5.66251 2.17834 4.74527 2.7296 3.93677 3.48185C3.68702 3.7151 3.61052 4.09534 3.77252 4.39609C4.37327 5.50684 3.74476 6.69484 2.39026 6.76309C2.05801 6.78034 1.76477 7.02559 1.68677 7.34884C1.55252 7.90759 1.49927 8.37559 1.49927 8.98984C1.49927 9.50509 1.55476 10.0878 1.66351 10.6068C1.73101 10.9308 2.01302 11.1641 2.34302 11.1933C3.70652 11.3111 4.38152 12.3506 3.77252 13.6773C3.63752 13.9721 3.69902 14.3246 3.93677 14.5443C4.73327 15.2816 5.64826 15.8006 6.72601 16.1381C7.03351 16.2348 7.38076 16.1186 7.56976 15.8568C8.40376 14.7033 9.61352 14.6988 10.4055 15.8568C10.5923 16.1298 10.9343 16.2611 11.2493 16.1613C12.2895 15.8343 13.2585 15.2771 14.0618 14.5443C14.3093 14.3193 14.3745 13.9541 14.226 13.6541C13.602 12.3948 14.3198 11.2383 15.6083 11.2166C15.9503 11.2106 16.2548 10.9856 16.335 10.6541C16.4648 10.1163 16.4993 9.64759 16.4993 8.98984C16.4993 8.42434 16.4325 7.86709 16.3118 7.32559C16.2353 6.98359 15.936 6.74059 15.585 6.73984C14.3168 6.73759 13.6058 5.49109 14.226 4.39609C14.3985 4.09084 14.3445 3.71735 14.085 3.48185C13.2675 2.73935 12.2708 2.15959 11.226 1.84159C10.905 1.74409 10.5638 1.86409 10.3823 2.14609C9.65776 3.27109 8.30477 3.29135 7.59302 2.16935C7.41077 1.8821 7.05001 1.73809 6.72601 1.84159ZM8.99927 5.98984C10.656 5.98984 11.9993 7.33309 11.9993 8.98984C11.9993 10.6466 10.656 11.9898 8.99927 11.9898C7.34252 11.9898 5.99927 10.6466 5.99927 8.98984C5.99927 7.33309 7.34252 5.98984 8.99927 5.98984Z"
				className={`orderly-fill-current group-data-[actived=true]:orderly-fill-[url(#side-menu-gradient)]`}
			></path>
		</svg>
	);
};