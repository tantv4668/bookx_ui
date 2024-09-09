'use client';

import React, { FC } from 'react';
import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
	size?: number;
	className?: string;
}

export const EditIcon: FC<IconProps> = (props) => {
	const { size, className, ...rest } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			fill="none"
			viewBox="0 0 24 24"
			{...rest}
			className={`oui-text-white ${className}`}
		>
			<path
				fill="currentcolor"
				fillOpacity="0.54"
				d="M16.995 1.953a1.02 1.02 0 00-.719.281l-3 3.002-9.006 9.005-1 1c-.14.14-.212.338-.25.532l-1 5.003a.974.974 0 001.155 1.157l5.003-1c.194-.04.392-.112.532-.25l1-1.002 9.005-9.005c.445-.444 2.447-2.446 3.003-3a1.02 1.02 0 00.28-.72c0-1.637-.417-2.807-1.282-3.69-.873-.89-2.039-1.313-3.72-1.313zm.395 2.02c.902.052 1.488.26 1.889.67.41.417.669.997.724 1.882-.547.547-1.35 1.337-2.006 1.994l-2.565-2.564c.658-.657 1.41-1.436 1.958-1.983zm-3.396 3.42l2.564 2.564-7.567 7.567-2.564-2.564 7.568-7.567zM4.99 16.398l2.564 2.564-.094.094c-.66.132-1.993.411-3.22.657l.656-3.22.094-.095z"
			></path>
		</svg>
	);
};
