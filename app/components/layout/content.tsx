'use client';
import { FC, PropsWithChildren } from 'react';
import { LayoutBaseProps } from './types';
import { cn } from '../utils/css';

export interface ContentProps extends LayoutBaseProps {
	// fixed?: boolean;
	// asChild?: boolean;
}

export const Content: FC<PropsWithChildren<ContentProps>> = (props) => {
	const { className, ...rest } = props;
	return <div {...rest} className={cn('orderly-flex-1', className)} />;
};

Content.displayName = 'Content';
