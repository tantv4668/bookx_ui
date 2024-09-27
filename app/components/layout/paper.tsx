'use client';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../utils/css';

const paperVariants = cva(['orderly-rounded orderly-p-3'], {
	variants: {
		variant: {
			outline: 'orderly-border orderly-border-base-100 ',
			contained: 'orderly-bg-base-300',
		},
		square: {
			true: 'orderly-rounded-none',
		},
	},
	defaultVariants: {
		variant: 'contained',
	},
});

export interface PaperProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof paperVariants> {
	asChild?: boolean;
}

const Paper: FC<PropsWithChildren<PaperProps>> = (props) => {
	const { asChild, className, variant, square, ...rest } = props;
	const Comp = asChild ? Slot : 'div';
	return <Comp className={cn(paperVariants({ variant, square, className }))} {...rest} />;
};

export { Paper, paperVariants };
