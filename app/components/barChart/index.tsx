'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from '../globals/CustomTooltip';
import { getPreviousDate, formatDate } from '../utils/getPreviousDate';

const BarChartComponent = ({ data, height, startDay }: any) => {
	return (
		<ResponsiveContainer width="100%" height={height || 152}>
			<BarChart
				data={data}
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
					// tick={({ x, y, payload, index }) => {

					// 	const newX = index === 0 ? x : x + 15;
					// 	return (
					// 		<g transform={`translate(${newX},${y})`}>
					// 			<text
					// 				x={0}
					// 				y={0}
					// 				dy={16}
					// 				textAnchor={index === 0 ? 'end' : index === data.length - 1 ? 'start' : 'middle'}
					// 				fontSize={10}
					// 				fill="#8A8B8D"
					// 			>
					// 				{index === 0
					// 					? formatDate(data[data.length - 1].name) || getPreviousDate(startDay)
					// 					: index === data.length - 1
					// 					? 'Now'
					// 					: ''}
					// 			</text>
					// 		</g>
					// 	);
					// }}
					tickFormatter={(tick, index) => {
						if (index === data.length - 1) {
							return 'Now';
						}
						if (index === 0) {
							return formatDate(data[data.length - 1].name) || getPreviousDate(startDay);
						} else if (index === data.length - 1) {
							return 'Now';
						} else return '';
					}}
					tick={{ fontSize: 10, fill: '#8A8B8D' }}
					tickLine={false}
					dy={8}
					// interval="preserveStartEnd"
					padding={{ left: 0, right: 0 }}
					allowDuplicatedCategory={false}
					// preserveStartEnd
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
					content={<CustomTooltip />}
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
				/>
			</BarChart>
		</ResponsiveContainer>
	);
};

export default BarChartComponent;
