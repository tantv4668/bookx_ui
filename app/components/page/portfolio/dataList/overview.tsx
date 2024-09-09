'use client';
import { DownIcon } from '@/app/components/assets/icons/downIcon';
import { EditIcon } from '@/app/components/assets/icons/editIcon';
import { EyeIcon } from '@/app/components/assets/icons/eye';
import { WithdrawIcon } from '@/app/components/assets/icons/withdrawIcon';
import Button from '@/app/components/globals/button';
import LineChartComponent from '@/app/components/lineChart';
import React from 'react';

const Overview: React.FC = (props) => {
	const dataUser = {
		USDC: '0.00',
		info: [
			{
				title: 'Unrealized PnL',
				value: '0.00',
			},
			{
				title: 'Max account leverage',
				value: 10,
			},
			{
				title: 'Available to withdraw',
				value: '0.00',
			},
		],
	};
	const dataChart = [
		{ name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
		{ name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
		{ name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
		{ name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
		{ name: 'May', uv: 1890, pv: 4800, amt: 2181 },
		{ name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
		{ name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
	];
	return (
		<div className="w-full orderly-text-white">
			<div className="orderly-grid orderly-grid-cols-2 orderly-gap-4">
				<div className="orderly-card-root orderly-card orderly-rounded-xl orderly-shadow orderly-p-6 orderly-bg-gunmetal orderly-minH-[240px] orderly-w-full">
					<div className="orderly-flex orderly-justify-between orderly-items-center">
						<p className=" orderly-card-header-title orderly-font-semibold orderly-leading-none orderly-tracking-tight orderly-text-lg">
							Overview
						</p>
						<div className="orderly-flex orderly-text-black orderly-gap-3">
							<Button
								type="button"
								className="orderly-button orderly-inline-flex orderly-items-center orderly-justify-center orderly-whitespace-nowrap orderly-transition-colors disabled:orderly-cursor-not-allowed disabled:orderly-bg-base-3 disabled:orderly-text-translucent disabled:hover:orderly-bg-base-3 orderly-px-3 orderly-rounded-md orderly-h-8 orderly-text-sm hover:orderly-opacity-70 hover:orderly-text-black active:orderly-bg-base-4/50 orderly-bg-blueGray orderly-text-primary-contrast"
							>
								<WithdrawIcon />
								Withdraw
							</Button>
							<Button
								type="button"
								className="orderly-button orderly-inline-flex orderly-items-center orderly-justify-center orderly-whitespace-nowrap orderly-transition-colors disabled:orderly-cursor-not-allowed disabled:orderly-bg-base-3 disabled:orderly-text-translucent disabled:hover:orderly-bg-base-3 orderly-px-3 orderly-rounded-md orderly-h-8 orderly-text-sm hover:orderly-opacity-70 hover:orderly-text-black active:orderly-bg-primary/50 orderly-bg-paleLime orderly-text-primary-contrast"
							>
								<span className="orderly-rotate-180">
									<WithdrawIcon />
								</span>
								Deposit
							</Button>
						</div>
					</div>
					<div className="orderly-py-4 orderly-mb-4 orderly-border-b orderly-border-semiTransparentWhite">
						<div className="orderly-text-[13px] orderly-flex orderly-text-translucent orderly-gap-1 orderly-items-center">
							<span>Total value</span>
							<EyeIcon size={16} />
						</div>
						<div className="orderly-text-paleLime orderly-bg-clip-text orderly-font-bold orderly-text-3xl orderly-text-[28px]">
							{dataUser.USDC}
							<span className="orderly-text-white orderly-opacity-80 orderly-numeral-unit orderly-text-base orderly-text-base-contrast-80 orderly-h-9 orderly-ml-1">
								USDC
							</span>
						</div>
					</div>
					<div className="orderly-box orderly-grid orderly-grid-cols-3 orderly-h-12">
						{dataUser.info.map((data, index) => {
							return (
								<div key={index} className="orderly-text-base orderly-flex orderly-flex-col orderly-items-start">
									<div className="orderly-text-xs orderly-text-translucent orderly-statistic-label">{data.title}</div>
									<div className="orderly-text-white orderly-box orderly-flex orderly-flex-row orderly-items-center orderly-justify-start orderly-flex-nowrap">
										{index === 0 && (
											<span className="orderly-opacity-55 orderly-text-lg orderly-font-semibold">{data.value}</span>
										)}
										{index === 0 && (
											<span className="orderly-opacity-55 orderly-text-sm orderly-font-semibold">({data.value}%)</span>
										)}
										{index === 1 && <span className="orderly-text-lg orderly-font-semibold">{data.value}x</span>}
										{index === 1 && (
											<span className="orderly-opacity-55 orderly-text-lg orderly-font-semibold orderly-ml-1">
												<EditIcon />
											</span>
										)}
										{index === 2 && <span className="orderly-text-lg orderly-font-semibold">{data.value}</span>}
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="orderly-card-root orderly-card orderly-rounded-xl orderly-shadow orderly-p-6 orderly-bg-gunmetal orderly-minH-[240px] orderly-w-full">
					<div className="orderly-flex orderly-justify-between orderly-items-center orderly-mb-4">
						<p className="orderly-card-header-title orderly-font-semibold orderly-leading-none orderly-tracking-tight orderly-text-lg">
							Assets
						</p>
						<Button
							type="button"
							className="orderly-text-[12px] orderly-border orderly-text-translucent orderly-border-semiTransparentWhite orderly-flex orderly-group orderly-w-[56px] orderly-items-center orderly-justify-between orderly-whitespace-nowrap orderly-rounded-md orderly-px-2 orderly-space-x-2 orderly-shadow-sm focus:orderly-outline-none focus:orderly-ring-1 disabled:orderly-cursor-not-allowed disabled:orderly-opacity-50 [&>span]:orderly-line-clamp-1 orderly-h-6 orderly-font-semibold focus:orderly-ring-transparent orderly-cursor-auto"
						>
							7D
							<DownIcon />
						</Button>
					</div>
					<LineChartComponent data={dataChart} />
				</div>
			</div>
		</div>
	);
};

export default Overview;
