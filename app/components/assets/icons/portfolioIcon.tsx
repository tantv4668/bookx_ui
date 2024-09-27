'use client';
import React, { FC } from 'react';

export interface IconProps {
	size?: number;
	className?: string | undefined;
}

export const PortfolioIcon: FC<IconProps> = (props) => {
	const { size, className, ...rest } = props;
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...rest}
			className={`group-data-[state=closed]/bar:oui-rotate-90 ${className}`}
		>
			<path
				d="M5.82552 17.4922C3.98469 17.4922 2.49219 15.9997 2.49219 14.1589V5.82552C2.49219 3.98469 3.98469 2.49219 5.82552 2.49219H14.1589C15.9997 2.49219 17.4922 3.98469 17.4922 5.82552V14.1589C17.4922 15.9997 15.9997 17.4922 14.1589 17.4922H5.82552ZM12.4922 13.3255C12.7055 13.3255 12.928 13.2538 13.0913 13.0913C13.4163 12.7655 13.4163 12.2189 13.0913 11.893L9.75802 8.55969L11.6589 6.65885H6.65885V11.6589L8.55969 9.75802L11.893 13.0913C12.0555 13.2538 12.2789 13.3255 12.4922 13.3255Z"
				fill="white"
				fillOpacity="0.2"
			></path>
		</svg>
	);
};
