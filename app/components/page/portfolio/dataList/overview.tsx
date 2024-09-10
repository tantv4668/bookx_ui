'use client';
import { DownIcon } from '@/app/components/assets/icons/downIcon';
import { EditIcon } from '@/app/components/assets/icons/editIcon';
import { EyeIcon } from '@/app/components/assets/icons/eye';
import { WithdrawIcon } from '@/app/components/assets/icons/withdrawIcon';
import Button from '@/app/components/globals/button';
import LineChartComponent from '@/app/components/lineChart';
import React, { useEffect, useMemo, useState } from 'react';
import { getPreviousDate } from '@/app/components/utils/getPreviousDate';
import OverviewTable from './overviewTable';
import { Column } from '@/app/components/table';
import { Text } from '@/app/components/text';
import { DepositsWithdrawalsIcon } from '@/app/components/assets/icons/DepositsWithdrawalsIcon';
import { FundingIcon } from '@/app/components/assets/icons/fundingIcon';
import { DistributionIcon } from '@/app/components/assets/icons/distributionIcon';
import { Select } from '@/app/components/globals/select';
// import { Select } from '@orderly.network/react';

export enum EnumPortfolioTab {
	DepositsWithdrawals = 'Deposits & Withdrawals',
	Funding = 'Funding',
	Distribution = 'Distribution',
}

const Overview: React.FC = (props) => {
	const [activeTab, setActiveTab] = useState<string>(EnumPortfolioTab.DepositsWithdrawals);
	const [index, setIndex] = useState<number>(0);

	const [dayAssets, setDayAssets] = useState<string>('7D');
	const [dayPerformance, setDayPerformance] = useState<string>('7D');

	const dataSource: any = []; //get api
	const isLoading: boolean = false; //get api

	const columnsDepositsWithdrawals = useMemo<Column[]>(() => {
		return [
			{
				title: 'Token',
				dataIndex: 'token	',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
			{
				title: 'Time',
				dataIndex: 'time	',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
			{
				title: 'TxID',
				dataIndex: 'TxID',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
			{
				title: 'Status',
				dataIndex: 'status',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
			{
				title: 'Type',
				dataIndex: 'type',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
			{
				title: 'Amount',
				dataIndex: 'amount',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
		];
	}, []);

	const columnsFunding = useMemo<Column[]>(() => {
		return [
			{
				title: 'Instrument',
				dataIndex: 'instrument	',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
			{
				title: 'Time',
				dataIndex: 'time',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
			{
				title: 'Funding rate / Annual rate',
				dataIndex: 'rate',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
			{
				title: 'Payment type',
				dataIndex: 'type',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
			{
				title: 'Funding fee (USDC)',
				dataIndex: 'fee',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
		];
	}, []);

	const columnsDistribution = useMemo<Column[]>(() => {
		return [
			{
				title: 'Token',
				dataIndex: 'token	',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
			{
				title: 'Time',
				dataIndex: 'time	',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
			{
				title: 'Status',
				dataIndex: 'status',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
			{
				title: 'Type',
				dataIndex: 'type',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
			{
				title: 'Amount',
				dataIndex: 'amount',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
		];
	}, []);

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

	const startDay = getPreviousDate(7);

	const data = [
		{ name: startDay, value: 600 },
		{ name: '', value: 450 },
		{ name: '', value: 200 },
		{ name: '', value: 150 },
		{ name: '', value: 150 },
		{ name: '', value: 160 },
		{ name: 'now', value: 160 },
		// Add more data as needed
	];

	const options = [
		{ label: '7D', value: '7D' },
		{ label: '30D', value: '30D' },
		{ label: '90D', value: '90D' },
	];

	const dataTab = [
		{
			title: 'Deposits & Withdrawals',
			icon: <DepositsWithdrawalsIcon size={16} />,
			value: EnumPortfolioTab.DepositsWithdrawals,
			component: <OverviewTable columns={columnsDepositsWithdrawals} dataSource={dataSource} isLoading={isLoading} />,
		},
		{
			title: 'Funding',
			icon: <FundingIcon size={16} />,
			value: EnumPortfolioTab.Funding,
			component: <OverviewTable columns={columnsFunding} dataSource={dataSource} isLoading={isLoading} />,
		},
		{
			title: 'Distribution',
			icon: <DistributionIcon size={16} />,
			value: EnumPortfolioTab.Distribution,
			component: <OverviewTable columns={columnsDistribution} dataSource={dataSource} isLoading={isLoading} />,
		},
	];

	const handleActiveTab = (value: string) => {
		setActiveTab(value);
	};

	useEffect(() => {
		setIndex(dataTab.findIndex((obj) => obj.value === activeTab));
	}, [dataTab, activeTab]);

	return (
		<div className="orderly-flex orderly-flex-col orderly-gap-4 orderly-w-full orderly-text-white ">
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
						<Select
							options={[
								{ label: '7D', value: '7D' },
								{ label: '30D', value: '30D' },
								{ label: '90D', value: '90D' },
							]}
							value={dayAssets}
							onChange={(e) => setDayAssets(e)}
							className="orderly-text-[12px] orderly-border orderly-text-translucent orderly-border-semiTransparentWhite orderly-flex orderly-group orderly-min-w-[56px] orderly-items-center orderly-justify-between orderly-rounded-md orderly-px-2 orderly-space-x-1 orderly-shadow-sm focus:orderly-outline-none focus:orderly-ring-1 disabled:orderly-cursor-not-allowed disabled:orderly-opacity-50 [&>span]:orderly-line-clamp-1 orderly-h-6 orderly-font-semibold focus:orderly-ring-transparent orderly-cursor-auto"
						/>
					</div>
					<LineChartComponent data={data} />
				</div>
			</div>

			<div className="orderly-card-root orderly-card orderly-rounded-xl orderly-shadow orderly-p-6 orderly-bg-gunmetal orderly-minH-[240px] orderly-w-full">
				<div className="orderly-flex orderly-justify-between orderly-items-center orderly-mb-4">
					<p className="orderly-card-header-title orderly-font-semibold orderly-leading-none orderly-tracking-tight orderly-text-lg">
						Performance
					</p>
					<Select
						options={[
							{ label: '7D', value: '7D' },
							{ label: '30D', value: '30D' },
							{ label: '90D', value: '90D' },
						]}
						value={dayPerformance}
						onChange={(e) => setDayPerformance(e)}
						className="orderly-text-[12px] orderly-border orderly-text-translucent orderly-border-semiTransparentWhite orderly-flex orderly-group orderly-min-w-[56px] orderly-items-center orderly-justify-between orderly-rounded-md orderly-px-2 orderly-space-x-1 orderly-shadow-sm focus:orderly-outline-none focus:orderly-ring-1 disabled:orderly-cursor-not-allowed disabled:orderly-opacity-50 [&>span]:orderly-line-clamp-1 orderly-h-6 orderly-font-semibold focus:orderly-ring-transparent orderly-cursor-auto"
					/>
				</div>

				<div className="orderly-grid orderly-grid-cols-3 orderly-gap-4 orderly-my-4">
					<div className="orderly-box orderly-px-4 orderly-py-2 orderly-border orderly-border-semiTransparentWhite orderly-rounded-md orderly-gradient-neutral orderly-flex orderly-flex-col orderly-items-start orderly-justify-start orderly-flex-nowrap orderly-bg-gradient-gunmetal orderly-w-full">
						<div className="orderly-text-xs orderly-opacity-35 orderly-leading-5">7D ROI</div>
						<div>--</div>
					</div>
					<div className="orderly-box orderly-px-4 orderly-py-2 orderly-border orderly-border-semiTransparentWhite orderly-rounded-md orderly-gradient-neutral orderly-flex orderly-flex-col orderly-items-start orderly-justify-start orderly-flex-nowrap orderly-bg-gradient-gunmetal orderly-w-full">
						<div className="orderly-text-xs orderly-opacity-35 orderly-leading-5">7D PnL</div>
						<div>--</div>
					</div>
					<div className="orderly-box orderly-px-4 orderly-py-2 orderly-border orderly-border-semiTransparentWhite orderly-rounded-md orderly-gradient-neutral orderly-flex orderly-flex-col orderly-items-start orderly-justify-start orderly-flex-nowrap orderly-bg-gradient-gunmetal orderly-w-full">
						<div className="orderly-text-xs orderly-opacity-35 orderly-leading-5">7D Volume (USDC)</div>
						<div>--</div>
					</div>
				</div>

				<div className="orderly-grid orderly-grid-cols-2 orderly-gap-4">
					<div>
						<p className="orderly-mb-3 orderly-card-header-title orderly-font-semibold orderly-leading-none orderly-tracking-tight orderly-text-sm">
							Daily PnL
						</p>
						<div className="orderly-box orderly-rounded-md orderly-border orderly-border-semiTransparentWhite">
							<LineChartComponent data={data} height={184} />
						</div>
					</div>

					<div>
						<p className="orderly-mb-3 orderly-card-header-title orderly-font-semibold orderly-leading-none orderly-tracking-tight orderly-text-sm">
							Cumulative PnL
						</p>
						<div className="orderly-box orderly-rounded-md orderly-border orderly-border-semiTransparentWhite">
							<LineChartComponent data={data} height={184} />
						</div>
					</div>
				</div>
			</div>

			<div className="orderly-card-root orderly-card orderly-rounded-xl orderly-shadow orderly-p-6 orderly-bg-gunmetal orderly-minH-[240px] orderly-w-full">
				<div className="orderly-flex orderly-gap-1">
					{dataTab.map((data, index) => {
						return (
							<div
								key={index}
								onClick={() => handleActiveTab(data.value)}
								className={`orderly-cursor-pointer orderly-h-9 orderly-w-[auto] orderly-flex orderly-gap-1 orderly-items-center orderly-px-3 orderly-rounded-md orderly-text-left orderly-group orderly-transition-colors 
								${
									activeTab === data.value
										? '!orderly-text-white orderly-bg-charcoalBlue'
										: 'orderly-text-translucentWhite orderly-bg-darkGunmetal'
								}`}
							>
								<span>{data.icon}</span>
								{data.title}
							</div>
						);
					})}
				</div>

				<div className="orderly-flex orderly-gap-3 orderly-mt-3">
					<Button
						type="button"
						className="orderly-text-[12px] orderly-border orderly-text-translucent orderly-border-semiTransparentWhite orderly-flex orderly-group orderly-w-[56px] orderly-items-center orderly-justify-between orderly-whitespace-nowrap orderly-rounded-md orderly-px-2 orderly-space-x-2 orderly-shadow-sm focus:orderly-outline-none focus:orderly-ring-1 disabled:orderly-cursor-not-allowed disabled:orderly-opacity-50 [&>span]:orderly-line-clamp-1 orderly-h-6 orderly-font-semibold focus:orderly-ring-transparent orderly-cursor-auto"
					>
						7D
						<DownIcon />
					</Button>
					<Button
						type="button"
						className="orderly-text-[12px] orderly-border orderly-text-translucent orderly-border-semiTransparentWhite orderly-flex orderly-group orderly-w-[56px] orderly-items-center orderly-justify-between orderly-whitespace-nowrap orderly-rounded-md orderly-px-2 orderly-space-x-2 orderly-shadow-sm focus:orderly-outline-none focus:orderly-ring-1 disabled:orderly-cursor-not-allowed disabled:orderly-opacity-50 [&>span]:orderly-line-clamp-1 orderly-h-6 orderly-font-semibold focus:orderly-ring-transparent orderly-cursor-auto"
					>
						7D
						<DownIcon />
					</Button>
				</div>

				<div className="orderly-mx-3 orderly-my-6">{dataTab[index].component}</div>
			</div>
		</div>
	);
};

export default Overview;
