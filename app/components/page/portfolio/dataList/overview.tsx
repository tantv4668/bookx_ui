'use client';
import { DepositsWithdrawalsIcon } from '@/app/components/assets/icons/DepositsWithdrawalsIcon';
import { DistributionIcon } from '@/app/components/assets/icons/distributionIcon';
import { EditIcon } from '@/app/components/assets/icons/editIcon';
import { EyeIcon } from '@/app/components/assets/icons/eye';
import { EyeOffIcon } from '@/app/components/assets/icons/eyeOff';
import { FundingIcon } from '@/app/components/assets/icons/fundingIcon';
import { SelectDownIcon } from '@/app/components/assets/icons/selectDownIcon';
import { WithdrawIcon } from '@/app/components/assets/icons/withdrawIcon';
import BarChartComponent from '@/app/components/barChart';
import { LeverageDialog } from '@/app/components/block/accountStatus/full/leverageDialog';
import { DepositAndWithdrawDialog } from '@/app/components/block/depositAndwithdraw/depositAndWithdrawDialog';
import { AccountStatus } from '@/app/components/block/desktop/accountStatus.desktop';
import { showAccountConnectorModal } from '@/app/components/block/walletConnect';
import Button from '@/app/components/globals/button';
import InputDay from '@/app/components/globals/inputDay';
import { Select as SelectGlobals } from '@/app/components/globals/select';
import LineChartComponent from '@/app/components/lineChart';
import { AccountStatusEnum } from '@/app/components/types/constants';
import { formatPreviousDate, getPreviousDate } from '@/app/components/utils/getPreviousDate';
import { useAccount, useAccountInfo, useCollateral, usePositionStream, usePrivateQuery } from '@orderly.network/hooks';
import { Numeral, OrderlyAppContext } from '@orderly.network/react';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Select, { components } from 'react-select';
import AssetHistory from './assetHistory';
import { colourStyles } from './colourStyles';
import {
	dataBar,
	dataLine,
	dayOptions,
	depositsWithdrawalsOptions,
	DistributionOptions,
	fundingOptions,
} from './dataOverview';
import Distribution from './distribution';
import FundingFee from './fundingFee';

export enum EnumPortfolioTab {
	DepositsWithdrawals = 'Deposits & Withdrawals',
	Funding = 'Funding',
	Distribution = 'Distribution',
}

const Overview: React.FC = (props) => {
	const [activeTab, setActiveTab] = useState<string>(EnumPortfolioTab.DepositsWithdrawals);
	const [index, setIndex] = useState<number>(0);
	const [valueSelectInput, setValueSelectInput] = useState<any>({ label: 'All', value: 'ALL' });
	// const [dayAssets, setDayAssets] = useState<number>(7);
	const [day, setDay] = useState<number>(7);
	const [valueSelectTab, setValueSelectTab] = useState<string>('All');
	const [searchFunding, setSearchFunding] = useState('');
	const [filterFundingOptions, setFilterFundingOptions] = useState(fundingOptions);
	const [showValue, setShowValue] = useState<boolean>(false);
	const [startEndDay, setStartEndDay] = useState<any>([null, null]);
	const [filterStartEndDay, SetFilterSetStartEndDay] = useState<any>([null, null]);

	const { state } = useAccount();

	const { totalValue, availableBalance } = useCollateral({
		dp: 2,
	});

	const [{ aggregated, totalUnrealizedROI }] = usePositionStream();

	const { data: dataPerformance, error } = usePrivateQuery<any>(
		`/v1/client/statistics/daily?start_date=${formatPreviousDate(day)}&end_date=${formatPreviousDate(0)}`,
	);

	const { totalRoi, totalPnl, totalVolume, pnlArray, accountValueArray, cumulativePnLArray } = useMemo(() => {
		const accountValueArray: any = [];
		const pnlArray: any = [];
		const cumulativePnLArray: any = [];
		let cumulativePnL = 0;
		let totalPnl = 0;
		let totalVolume = 0;
		let totalRoi = 0;

		if (dataPerformance) {
			dataPerformance.forEach((item: any) => {
				pnlArray.push({
					name: item.date,
					value: item.pnl,
				});

				totalPnl += item.pnl;

				accountValueArray.push({
					name: item.date,
					value: item.account_value,
				});

				totalVolume += item.perp_volume;

				cumulativePnL += item.pnl;
				cumulativePnLArray.push({
					name: item.date,
					value: cumulativePnL,
				});
			});

			const initialInvestment = dataPerformance[dataPerformance.length - 1]?.account_value || 0;
			totalRoi = initialInvestment !== 0 ? (totalPnl / initialInvestment) * 100 : 0;
		}

		return { pnlArray, accountValueArray, cumulativePnLArray, totalRoi, totalPnl, totalVolume };
	}, [dataPerformance]);

	const { onWalletConnect, accountMenuItems, onClickAccountMenuItem } = useContext(OrderlyAppContext);

	const handleShowHideUSDC = () => {
		setShowValue(!showValue);
		window.localStorage.setItem('showValue', JSON.stringify(!showValue));
	};

	const handleChangeSelectInput = (option: any) => {
		setValueSelectInput(option);
	};

	useEffect(() => {
		if (startEndDay === null) {
			SetFilterSetStartEndDay([null, null]);
		}
		if (startEndDay !== null && (startEndDay[0] !== null || startEndDay[1] !== null)) {
			const timestamps = startEndDay.map((date: Day) => new Date(date).getTime());
			SetFilterSetStartEndDay(timestamps);
		}
	}, [startEndDay, SetFilterSetStartEndDay]);

	useEffect(() => {
		const showValueLocalStorage = window.localStorage.getItem('showValue');
		setShowValue(!(showValueLocalStorage === `false`));
	}, []);

	const onConnect = useCallback(() => {
		onWalletConnect().then((result: { wallet: any; status: AccountStatusEnum }) => {
			if (result && result.status < AccountStatusEnum.EnableTrading) {
				showAccountConnectorModal({
					status: result.status,
				}).catch((err: any) => {
					console.log('cancel', err);
				});
			}
		});
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

	const dataTab = useMemo(
		() => [
			{
				title: 'Deposits & Withdrawals',
				icon: <DepositsWithdrawalsIcon size={16} />,
				value: EnumPortfolioTab.DepositsWithdrawals,
				component: <AssetHistory filterStartEndDay={filterStartEndDay} filterSide={valueSelectTab} />,
			},
			{
				title: 'Funding',
				icon: <FundingIcon size={16} />,
				value: EnumPortfolioTab.Funding,
				component: <FundingFee filterStartEndDay={filterStartEndDay} filterSymbol={valueSelectInput.value} />,
			},
			{
				title: 'Distribution',
				icon: <DistributionIcon size={16} />,
				value: EnumPortfolioTab.Distribution,
				component: <Distribution filterStartEndDay={filterStartEndDay} filterType={valueSelectTab} />,
			},
		],
		[valueSelectTab, filterStartEndDay, valueSelectInput],
	);

	const { data: info } = useAccountInfo();

	// console.log('state', state);
	// console.log('info', info);

	const handleInputChangeSelectInput = (value: string) => {
		setSearchFunding(value);

		if (value === '' || value.toLowerCase() === 'all'.toLowerCase()) {
			setFilterFundingOptions(fundingOptions);
		} else {
			const filtered = fundingOptions.filter((option: any) => option.label.toLowerCase().includes(value.toLowerCase()));
			setFilterFundingOptions(filtered);
		}
	};

	const handleActiveTab = (value: string) => {
		setActiveTab(value);
		setValueSelectTab('ALL');
		SetFilterSetStartEndDay(null);
		setStartEndDay([null, null]);
		setValueSelectInput({ label: 'All', value: 'ALL' });
	};

	useEffect(() => {
		setIndex(dataTab.findIndex((obj) => obj.value === activeTab));
	}, [dataTab, activeTab]);

	const DropdownIndicator = (props: any) => {
		const { menuIsOpen } = props.selectProps;
		return (
			<components.DropdownIndicator {...props}>
				{!menuIsOpen ? (
					<SelectDownIcon className="-orderly-mt-[2px]" />
				) : (
					<SelectDownIcon className="-orderly-mt-[2px] orderly-rotate-180" />
				)}
			</components.DropdownIndicator>
		);
	};

	return (
		<div className="orderly-flex orderly-flex-col orderly-gap-4 orderly-w-full orderly-text-white ">
			<div className="orderly-grid orderly-grid-cols-2 orderly-gap-4">
				<div className="orderly-card-root orderly-card orderly-rounded-xl orderly-shadow orderly-p-6 orderly-bg-gunmetal orderly-min-h-[240px] orderly-h-full orderly-w-full">
					<div className="orderly-flex orderly-justify-between orderly-items-center">
						<p className=" orderly-card-header-title orderly-font-semibold orderly-leading-none orderly-tracking-tight orderly-text-lg">
							Overview
						</p>
						<div className="orderly-flex orderly-text-black orderly-gap-3">
							<DepositAndWithdrawDialog isWithdraw>
								<Button
									type="button"
									disabled={state.status === 0}
									className={`${
										state.status === 4 && 'hover:orderly-opacity-70'
									} orderly-button orderly-inline-flex orderly-items-center orderly-justify-center orderly-whitespace-nowrap orderly-transition-colors orderly-px-3 orderly-rounded-md orderly-h-8 orderly-text-[14px] hover:orderly-text-black active:orderly-bg-base-4/50 !orderly-bg-lightPurple hover:orderly-bg-lightPurple orderly-text-black disabled:orderly-cursor-not-allowed disabled:orderly-bg-darkSlateBlue disabled:orderly-text-translucent !disabled:hover:orderly-bg-darkSlateBlue`}
								>
									<WithdrawIcon />
									Withdraw
								</Button>
							</DepositAndWithdrawDialog>
							<DepositAndWithdrawDialog>
								<Button
									type="button"
									disabled={state.status === 0}
									className={`${
										state.status === 4 && 'hover:orderly-opacity-70'
									}  orderly-button orderly-inline-flex orderly-items-center orderly-justify-center orderly-whitespace-nowrap orderly-transition-colors orderly-px-3 orderly-rounded-md orderly-h-8 orderly-text-[14px] hover:orderly-text-black active:orderly-bg-primary/50 !orderly-bg-paleLime hover:orderly-bg-paleLime orderly-text-black disabled:orderly-cursor-not-allowed disabled:orderly-bg-darkSlateBlue disabled:orderly-text-translucent !disabled:hover:orderly-bg-darkSlateBlue`}
								>
									<span className="orderly-rotate-180">
										<WithdrawIcon />
									</span>
									Deposit
								</Button>
							</DepositAndWithdrawDialog>
						</div>
					</div>
					<div className="orderly-py-4 orderly-mb-4 orderly-border-b orderly-border-semiTransparentWhite">
						<div className="orderly-text-[13px] orderly-flex orderly-text-translucent orderly-gap-1 orderly-items-center">
							<span>Total value</span>
							<span className="orderly-cursor-pointer" onClick={handleShowHideUSDC}>
								{showValue ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
							</span>
						</div>
						<div className="orderly-text-paleLime orderly-bg-clip-text orderly-font-bold orderly-text-[28px]">
							{showValue ? (
								<Numeral
									// surfix={<span className={'orderly-text-base-contrast-36 orderly-font-semibold'}>USDC</span>}
									className="desktop:orderly-font-semibold"
								>
									{totalValue}
								</Numeral>
							) : (
								'*****'
							)}
							<span className="orderly-text-white orderly-opacity-80 orderly-numeral-unit orderly-text-base orderly-h-9 orderly-ml-1">
								USDC
							</span>
						</div>
					</div>
					{state.status === 0 ? (
						<div className="orderly-w-full">
							<AccountStatus
								hideChain
								status={state.status}
								address={state.address}
								accountInfo={undefined}
								className="orderly-w-full"
								onConnect={onConnect}
								dropMenuItem={accountMenuItems}
								onClickDropMenuItem={onClickAccountMenuItem}
							/>
						</div>
					) : (
						<div className="orderly-box orderly-grid orderly-grid-cols-3 orderly-h-12 orderly-gap-3">
							{dataUser.info.map((data, index) => {
								return (
									<div key={index} className="orderly-text-base orderly-flex orderly-flex-col orderly-items-start">
										<div className="orderly-text-[13px] orderly-text-translucent orderly-statistic-label">
											{data.title}
										</div>
										<div className="orderly-text-white orderly-box orderly-flex orderly-flex-row orderly-items-center orderly-justify-start orderly-flex-nowrap">
											{index === 0 &&
												(showValue ? (
													<>
														<Numeral className="orderly-text-[18px]" coloring>
															{aggregated.unrealPnL}
														</Numeral>
														<Numeral
															rule="percentages"
															coloring
															surfix=")"
															prefix="("
															className="orderly-text-[14px] orderly-opacity-60"
														>
															{totalUnrealizedROI}
														</Numeral>
													</>
												) : (
													<span className="orderly-opacity-55 orderly-text-lg orderly-font-semibold">*****</span>
												))}

											{index === 1 && (
												<LeverageDialog>
													<div className="orderly-cursor-pointer orderly-text-white orderly-box orderly-flex orderly-flex-row orderly-items-center orderly-justify-start orderly-flex-nowrap">
														<span className="orderly-text-[18px] orderly-font-semibold">{info?.max_leverage}x</span>
														<span className="orderly-opacity-55 orderly-text-lg orderly-font-semibold orderly-ml-1">
															<EditIcon />
														</span>
													</div>
												</LeverageDialog>
											)}
											{index === 2 && (
												<>
													{showValue ? (
														<Numeral className="orderly-text-[18px]">{availableBalance}</Numeral>
													) : (
														<span className="orderly-text-lg orderly-font-semibold">*****</span>
													)}
												</>
											)}
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>

				<div className="orderly-card-root orderly-card orderly-rounded-xl orderly-shadow orderly-p-6 orderly-bg-gunmetal orderly-minH-[240px] orderly-w-full">
					<div className="orderly-flex orderly-justify-between orderly-items-center orderly-mb-4">
						<p className="orderly-card-header-title orderly-font-semibold orderly-leading-none orderly-tracking-tight orderly-text-lg">
							Assets
						</p>
						<SelectGlobals
							options={dayOptions}
							value={day}
							onChange={(e) => setDay(e)}
							className="orderly-bg-[#1C1E22] orderly-text-[12px] orderly-border orderly-text-translucent orderly-border-semiTransparentWhite orderly-flex orderly-group orderly-min-w-[56px] orderly-items-center orderly-justify-between orderly-rounded-md orderly-px-2 orderly-space-x-1 orderly-shadow-sm focus:orderly-outline-none focus:orderly-ring-1 disabled:orderly-cursor-not-allowed disabled:orderly-opacity-50 [&>span]:orderly-line-clamp-1 orderly-h-6 orderly-font-semibold focus:orderly-ring-transparent orderly-cursor-auto"
						/>
					</div>
					<LineChartComponent data={accountValueArray} startDay={startDay} />
				</div>
			</div>

			<div className="orderly-card-root orderly-card orderly-rounded-xl orderly-shadow orderly-p-6 orderly-bg-gunmetal orderly-minH-[240px] orderly-w-full">
				<div className="orderly-flex orderly-justify-between orderly-items-center orderly-mb-4">
					<p className="orderly-card-header-title orderly-font-semibold orderly-leading-none orderly-tracking-tight orderly-text-lg">
						Performance
					</p>
					<SelectGlobals
						options={dayOptions}
						value={day}
						onChange={(e) => setDay(e)}
						className="orderly-bg-[#1C1E22] orderly-text-[12px] orderly-border orderly-text-translucent orderly-border-semiTransparentWhite orderly-flex orderly-group orderly-min-w-[56px] orderly-items-center orderly-justify-between orderly-rounded-md orderly-px-2 orderly-space-x-1 orderly-shadow-sm focus:orderly-outline-none focus:orderly-ring-1 disabled:orderly-cursor-not-allowed disabled:orderly-opacity-50 [&>span]:orderly-line-clamp-1 orderly-h-6 orderly-font-semibold focus:orderly-ring-transparent orderly-cursor-auto"
					/>
				</div>

				<div className="orderly-grid orderly-grid-cols-3 orderly-gap-4 orderly-my-4">
					<div className="orderly-box orderly-px-4 orderly-py-2 orderly-border orderly-border-semiTransparentWhite orderly-rounded-md orderly-gradient-neutral orderly-flex orderly-flex-col orderly-items-start orderly-justify-start orderly-flex-nowrap orderly-bg-gradient-gunmetal orderly-w-full">
						<div className="orderly-text-[13px] orderly-opacity-35 orderly-leading-5">{day}D ROI</div>
						<div className="orderly-text-translucent">
							{state.status === 0 ? (
								<span className="orderly-text-[16px]">--</span>
							) : showValue ? (
								<Numeral rule="percentages" coloring className="orderly-text-[18px]">
									{totalRoi}
								</Numeral>
							) : (
								'*****'
							)}
						</div>
					</div>
					<div className="orderly-box orderly-px-4 orderly-py-2 orderly-border orderly-border-semiTransparentWhite orderly-rounded-md orderly-gradient-neutral orderly-flex orderly-flex-col orderly-items-start orderly-justify-start orderly-flex-nowrap orderly-bg-gradient-gunmetal orderly-w-full">
						<div className="orderly-text-[13px] orderly-opacity-35 orderly-leading-5">{day}D PnL</div>
						<div className="orderly-text-translucent">
							{state.status === 0 ? (
								<span className="orderly-text-[16px]">--</span>
							) : showValue ? (
								<Numeral className="orderly-text-[18px]">{totalPnl}</Numeral>
							) : (
								'*****'
							)}
						</div>
					</div>
					<div className="orderly-box orderly-px-4 orderly-py-2 orderly-border orderly-border-semiTransparentWhite orderly-rounded-md orderly-gradient-neutral orderly-flex orderly-flex-col orderly-items-start orderly-justify-start orderly-flex-nowrap orderly-bg-gradient-gunmetal orderly-w-full">
						<div className="orderly-text-[13px] orderly-opacity-35 orderly-leading-5">{day}D Volume (USDC)</div>
						<div className="orderly-text-translucent">
							{state.status === 0 ? (
								<span className="orderly-text-[16px]">--</span>
							) : showValue ? (
								<Numeral className="orderly-text-[18px]">{totalVolume}</Numeral>
							) : (
								'*****'
							)}
						</div>
					</div>
				</div>

				<div className="orderly-grid orderly-grid-cols-2 orderly-gap-4">
					<div>
						<p className="orderly-mb-3 orderly-card-header-title orderly-font-semibold orderly-leading-none orderly-tracking-tight orderly-text-[14px]">
							Daily PnL
						</p>
						<div className="orderly-box orderly-rounded-md orderly-border orderly-border-semiTransparentWhite">
							<BarChartComponent data={pnlArray} height={184} startDay={startDay} />
						</div>
					</div>

					<div>
						<p className="orderly-mb-3 orderly-card-header-title orderly-font-semibold orderly-leading-none orderly-tracking-tight orderly-text-[14px]">
							Cumulative PnL
						</p>
						<div className="orderly-box orderly-rounded-md orderly-border orderly-border-semiTransparentWhite">
							<LineChartComponent data={cumulativePnLArray} height={184} startDay={startDay} />
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

				<div className="orderly-flex orderly-gap-3 orderly-my-3">
					{index !== 1 ? (
						<SelectGlobals
							options={index === 0 ? depositsWithdrawalsOptions : index === 2 ? DistributionOptions : []}
							value={valueSelectTab}
							onChange={(e) => setValueSelectTab(e)}
							className="!orderly-bg-[#1C1E22] orderly-min-w-[96px] orderly-text-[12px] orderly-border orderly-text-translucent orderly-border-semiTransparentWhite orderly-flex orderly-group orderly-items-center orderly-justify-between orderly-rounded-md orderly-px-2 orderly-space-x-1 orderly-shadow-sm focus:orderly-outline-none focus:orderly-ring-1 disabled:orderly-cursor-not-allowed disabled:orderly-opacity-50 [&>span]:orderly-line-clamp-1 orderly-h-6 orderly-font-semibold focus:orderly-ring-transparent orderly-cursor-auto"
						/>
					) : (
						<Select
							menuPlacement="top"
							options={filterFundingOptions}
							onInputChange={handleInputChangeSelectInput}
							inputValue={searchFunding}
							placeholder="All"
							styles={colourStyles}
							value={valueSelectInput}
							onChange={handleChangeSelectInput}
							components={{ DropdownIndicator }}
						/>
					)}
					<InputDay setStartEndDay={setStartEndDay} startEndDay={startEndDay} />
				</div>

				<div className="">{dataTab[index].component}</div>
			</div>
		</div>
	);
};

export default Overview;
