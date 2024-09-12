'use client';

import React, { FC } from 'react';
import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
	size?: number;
	className?: string;
}

export const APIKeyIcon: FC<IconProps> = (props) => {
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
				d="M9.02124 1.49915C7.77849 1.49915 6.77124 2.5064 6.77124 3.74915C6.77124 4.70015 7.40049 5.55517 8.26974 5.86942L8.27124 8.24915H5.27124C4.85724 8.24915 4.52124 8.58515 4.52124 8.99915L4.52048 12.1304C3.65723 12.4274 3.02124 13.2981 3.02124 14.2491C3.02124 15.4919 4.02849 16.4991 5.27124 16.4991C6.51399 16.4991 7.52124 15.4919 7.52124 14.2491C7.52124 13.2981 6.92499 12.4596 6.02949 12.1206L6.02124 9.74915H9.02124H12.0212L12.0265 12.1319C11.1257 12.4446 10.5212 13.2981 10.5212 14.2491C10.5212 15.4919 11.5285 16.4991 12.7712 16.4991C14.014 16.4991 15.0212 15.4919 15.0212 14.2491C15.0212 13.2981 14.407 12.4611 13.5272 12.1281L13.5212 8.99915C13.5212 8.58515 13.1852 8.24915 12.7712 8.24915H9.77124L9.76899 5.86639C10.642 5.55814 11.2712 4.70015 11.2712 3.74915C11.2712 2.5064 10.264 1.49915 9.02124 1.49915Z"
				className="orderly-fill-current group-data-[actived=true]:orderly-fill-[url(#side-menu-gradient)]"
			></path>
		</svg>
	);
};
