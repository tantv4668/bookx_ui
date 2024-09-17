'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from '../globals/CustomTooltip';
import { formatPreviousDate } from '../utils/getPreviousDate';

const LineChartComponent = ({ data, height, startDay, isAssets, isPerformance }: any) => {
	const reversedData = [...data].reverse();
	const maxY = Math.max(...data.map((d: any) => d.value));

	const ticks = [];
	const tickInterval = maxY / 4;
	for (let i = 0; i <= 4; i++) {
		ticks.push(0 + i * tickInterval);
	}
	return (
		<ResponsiveContainer width="100%" height={height || 152}>
			<LineChart
				data={reversedData}
				margin={{
					top: 10,
					right: 20,
					left: -15,
					bottom: 10,
				}}
			>
				<CartesianGrid strokeDasharray="0 0" stroke="#ffffff1f" vertical={false} />
				<XAxis
					stroke="#ffffff1f"
					dataKey="name"
					tick={({ x, y, payload, index }) => {
						const newX = index === 0 ? x : x - 10;
						return (
							<g transform={`translate(${newX},${y})`}>
								<text
									x={0}
									y={0}
									dy={16}
									textAnchor={index === 0 ? 'start' : index === data.length - 1 ? 'middle' : 'middle'}
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
					// interval="preserveStartEnd"
					interval={0}
					padding={{ left: 0, right: 0 }}
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
				<Tooltip
					contentStyle={{ backgroundColor: '#333', color: '#fff', borderRadius: '8px', border: 'none' }}
					itemStyle={{ color: '#FFD700' }}
					content={<CustomTooltip className={`${isAssets && 'orderly-text-white'}`} isPerformance={isPerformance} />}
				/>
				<Line type="monotone" dataKey="value" stroke="#E1F578" dot={false} />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default LineChartComponent;
