'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineChartComponent = ({ data, height }: any) => {
	const maxY = Math.max(...data.map((d: any) => d.value));

	const ticks = [];
	const tickInterval = maxY / 4;
	for (let i = 0; i <= 4; i++) {
		ticks.push(0 + i * tickInterval);
	}
	return (
		<ResponsiveContainer width="100%" height={height || 152}>
			<LineChart
				data={data}
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
						const newX = index === 0 ? x : x - 5;
						return (
							<g transform={`translate(${newX},${y})`}>
								<text x={0} y={0} dy={16} textAnchor="start" fontSize={10} fill="#8A8B8D">
									{payload.value}
								</text>
							</g>
						);
					}}
					tickLine={false}
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
				<Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} itemStyle={{ color: '#FFD700' }} />
				<Line type="monotone" dataKey="value" stroke="#E1F578" dot={false} />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default LineChartComponent;
