'use client';
import React, { useEffect, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { formatPreviousDate } from '../utils/getPreviousDate';

const CustomTooltip = ({ position, content, onMouseEnter, onMouseLeave }: any) => {
	const { x, y } = position || {};

	return (
		<div
			className="custom-tooltip"
			style={{ left: x + 5, top: y + 5 }}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{content}
		</div>
	);
};

const Content = ({ name, value }: any) => {
	return (
		<div className="orderly-bg-[#333] orderly-rounded-lg orderly-text-translucent orderly-p-3">
			<div className="orderly-text-[12px]">
				<span className={`${+value > 0 ? 'orderly-text-paleLime' : +value < 0 && 'orderly-text-lightPurple'}`}>
					{+value > 0 && '+'}
					{Number(value.toFixed(2))}
				</span>{' '}
				USDC
			</div>
			<div className="orderly-text-[10px]">{name}</div>
		</div>
	);
};

const BarChartComponent = ({ data, height, startDay }: any) => {
	const reversedData = [...data].reverse();
	const divRef: any = useRef(null);
	const [width, setWidth] = useState(0);

	const chartWidth = width || 0;
	const barCount = data.length || 0;
	const barWidth = chartWidth / barCount;

	useEffect(() => {
		if (divRef.current) {
			setWidth(divRef?.current.offsetWidth);
		}
	}, []);

	const [tooltip, setTooltip] = useState<any>({});
	let tooltipTimeout: any;
	const showTooltip = (item: any, i: any, e: any) => {
		clearTimeout(tooltipTimeout);
		setTooltip({
			show: true,
			position: { x: e.clientX, y: e.clientY },
			content: <Content name={item.name} value={item.value} />,
		});
	};

	const hideTooltip = (e: any) => {
		tooltipTimeout = setTimeout(() => setTooltip({ show: false, ...e }), 200);
	};
	return (
		<>
			<ResponsiveContainer width="100%" height={height || 152} ref={divRef}>
				<BarChart
					data={reversedData}
					margin={{
						top: 10,
						right: 20,
						left: -15,
						bottom: 10,
					}}
					barCategoryGap="5%"
				>
					<CartesianGrid strokeDasharray="0 0" stroke="#ffffff1f" vertical={false} />
					<XAxis
						stroke="#ffffff1f"
						dataKey="name"
						interval={0}
						tick={({ x, y, payload, index }) => {
							const newX = index === 0 ? x - barWidth / 2 : x;
							return (
								<g transform={`translate(${newX},${y})`}>
									<text
										x={0}
										y={0}
										dy={16}
										textAnchor={index === 0 ? 'start' : index === data.length - 1 ? 'start' : 'middle'}
										fontSize={10}
										fill="#8A8B8D"
									>
										{index === 0
											? data[data.length - 1].name || formatPreviousDate(startDay)
											: index === data.length - 1
											? 'Now'
											: ''}
									</text>
								</g>
							);
						}}
						tickLine={false}
						padding={{ left: 0, right: 0 }}
						allowDuplicatedCategory={false}
					/>
					<YAxis
						stroke="none"
						tickLine={false}
						tick={({ x, y, payload, index }) => {
							return (
								<g transform={`translate(${x},${y})`}>
									<text x={0} y={0} textAnchor="end" fontSize={10} fill="#8A8B8D">
										{payload.value}
									</text>
								</g>
							);
						}}
					/>
					<Bar
						dataKey="value"
						shape={({ value, x, y, width, height }: any) => (
							<rect
								x={x}
								y={value < 0 ? y - Math.abs(height) : y}
								width={width}
								height={value < 0 ? -height : height}
								fill={value > 0 ? '#E1F578' : '#AC93DB'}
							/>
						)}
						fill={'#AC93DB'}
						fillOpacity={0}
						onMouseEnter={showTooltip}
						onMouseLeave={hideTooltip}
					/>
				</BarChart>
			</ResponsiveContainer>
			{tooltip.show && (
				<CustomTooltip
					onMouseEnter={() => {
						clearTimeout(tooltipTimeout);
					}}
					onMouseLeave={() => {
						setTooltip({ show: false });
						clearTimeout(tooltipTimeout);
					}}
					{...tooltip}
				/>
			)}
		</>
	);
};

export default BarChartComponent;
