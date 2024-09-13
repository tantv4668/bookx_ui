'use client';
import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../utils/css';

const switchVariants = cva('', {
	variants: {
		color: {
			primary: 'data-[state=checked]:orderly-bg-primary data-[state=unchecked]:orderly-bg-base-100',
			profit: 'data-[state=checked]:orderly-bg-trade-profit data-[state=unchecked]:orderly-bg-base-100',
			loss: 'data-[state=checked]:orderly-bg-trade-loss data-[state=unchecked]:orderly-bg-base-100',
			charcoal: 'data-[state=checked]:orderly-bg-charcoal',
		},
		// size:{
		//   default:"",
		//   lager:"peer h-[20px] w-[40px]",
		// }
	},
	defaultVariants: {
		color: 'primary',
	},
});

interface SwitchProps
	extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, 'color'>,
		VariantProps<typeof switchVariants> {
	thumbClassName?: string;
	checked?: boolean;
	onToggle?: (checked: boolean) => void;
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
	({ className, color, thumbClassName, checked = false, onToggle, ...props }, ref) => (
		<SwitchPrimitives.Root
			className={cn(
				'orderly-peer orderly-inline-flex orderly-h-[14px] desktop:orderly-h-[20px] orderly-w-[32px] desktop:orderly-w-[40px] orderly-shrink-0 orderly-cursor-pointer orderly-items-center orderly-rounded-full orderly-border-2 desktop:orderly-border-4 orderly-border-transparent orderly-transition-colors focus-visible:orderly-outline-none focus-visible:orderly-ring-2 focus-visible:orderly-ring-ring focus-visible:orderly-ring-offset-2 focus-visible:orderly-ring-offset-base-700 disabled:orderly-cursor-not-allowed disabled:orderly-opacity-50',
				`orderly-switch orderly-switch-color-${color}`,
				switchVariants({ color, className }),
			)}
			checked={checked}
			onCheckedChange={onToggle}
			{...props}
			ref={ref}
		>
			<SwitchPrimitives.Thumb
				className={cn(
					'orderly-pointer-events-none orderly-block orderly-h-[10px] orderly-w-[10px] orderly-rounded-full orderly-bg-white orderly-shadow-lg orderly-ring-0 orderly-transition-transform data-[state=checked]:orderly-translate-x-[18px] data-[state=checked]:desktop:orderly-translate-x-[20px] data-[state=unchecked]:orderly-translate-x-[1] desktop:orderly-h-[13.3px] desktop:orderly-w-[13.3px]',
					thumbClassName,
				)}
			/>
		</SwitchPrimitives.Root>
	),
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
