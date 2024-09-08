'use client';
import { FC, ReactNode, useContext, useMemo } from 'react';
import { StatisticStyleContext } from './defaultStaticStyle';
import { TooltipArrow, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { cn } from '../utils/css';
import { Tooltip } from '../tooltip';
import { Text, Numeral } from '../text';
import { NumeralProps, NumeralRule } from '../text/numeral';
import { TextRule } from '../text/text';

export interface StatisticProps extends Omit<NumeralProps, 'children' | 'rule'> {
	label: string | ReactNode;
	value: string | number | ReactNode;

	coloring?: boolean;
	className?: string;
	labelClassName?: string;
	valueClassName?: string;
	rule?: (TextRule & NumeralRule) | string;
	align?: 'left' | 'right' | 'center';

	asChild?: boolean;

	hint?: string;

	// FormattedPrice
	// as?: "price" | "date";
	id?: string;
}

const alignClasses: Record<string, string> = {
	left: 'orderly-text-left',
	right: 'orderly-text-right',
	center: 'orderly-text-center',
};

const coloringClasses: Record<string, string> = {
	lose: 'orderly-text-trade-loss',
	profit: 'orderly-text-trade-profit',
	neutral: 'orderly-text-base-contrast/50',
};

export const Statistic: FC<StatisticProps> = (props) => {
	const { align = 'left', rule: rule, asChild } = props;
	const { labelClassName, valueClassName } = useContext(StatisticStyleContext);

	const labelElement = useMemo(() => {
		if (typeof props.label === 'string') {
			return props.label;
		}
		return props.label;
	}, [props.label]);

	// lose, profit, neutral
	const colorClassName = useMemo(() => {
		if (!props.coloring) return '';
		if (typeof props.value !== 'number' && typeof props.value !== 'string') return '';

		// if (props.value === 0) return coloringClasses.neutral;

		const num = Number(props.value);

		if (Number.isNaN(num)) {
			// console.warn(`if coloring, value is need number: ${props.value}`);
			return '';
		}
		if (num === 0) return coloringClasses.neutral;
		if (num < 0) return coloringClasses.lose;

		// const firstChar = String(props.value).charAt(0);
		// if (firstChar === "-") return coloringClasses.lose;
		return coloringClasses.profit;
	}, [props.coloring, props.value]);

	// ---------- create value element ----------
	const valueElement = useMemo(() => {
		if (typeof props.value === 'string' || typeof props.value === 'number') {
			if (rule === 'price' || rule === 'percentages') {
				return (
					<Numeral rule={rule} precision={props.precision} visible={props.visible} prefix={props.prefix}>
						{props.value}
					</Numeral>
				);
			}
			// "date" | "address" | "text" | "symbol"
			if (rule === 'date' || rule === 'address' || rule === 'text' || rule === 'symbol' || rule === 'status') {
				return <Text rule={rule}>{props.value}</Text>;
			}

			return <span>{props.value}</span>;
		}
		return props.value ?? '--';
	}, [props.value, rule, props.precision, props.visible]);

	let label;

	if (typeof props.hint === 'undefined') {
		label = <div className={cn(labelClassName, props.labelClassName)}>{labelElement}</div>;
	} else {
		label = (
			<Tooltip content={props.hint} className="orderly-max-w-[200px]">
				<div className={cn(labelClassName, props.labelClassName)}>{labelElement}</div>
			</Tooltip>
		);
	}

	return (
		<div
			id={props.id}
			className={cn(
				alignClasses[align],
				props.className,
				props.hint && 'orderly-cursor-pointer hover:orderly-text-base-contrast',
			)}
		>
			{label}
			<div className={cn(valueClassName, props.valueClassName, colorClassName)}>{valueElement}</div>
		</div>
	);
};
