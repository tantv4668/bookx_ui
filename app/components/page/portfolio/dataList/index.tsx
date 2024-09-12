'use client';
import { useContext, useEffect, useState } from 'react';
// import AssetHistory from './assetHistory';
// import FundingFee from './fundingFee';
// import Liquidations from './liquidations';
// import { LayoutContext } from '@/app/components/layout/layoutContext';
// import { TabPane, Tabs } from '@/app/components/tab';
import { PortfolioIcon } from '@/app/components/assets/icons/portfolioIcon';
import Overview from './overview';
import Setting from './setting';
import ApiKey from './apiKey';
import { OrderlyAppContext } from '@orderly.network/react';
import { SettingIcon } from '@/app/components/assets/icons/settingIcon';
import { OverviewIcon } from '@/app/components/assets/icons/overviewIcon';
import { APIKeyIcon } from '@/app/components/assets/icons/apiKeyIcon';

export enum EPortfolioTab {
	DepositsWithdrawals = 'deposits_withdrawals',
	Funding = 'funding',
	Liquidations = 'liquidations',
}

export enum EnumPortfolioTab {
	Overview = 'overview',
	API = 'api_key',
	Setting = 'setting',
}

export const DataList = () => {
	const [activeTab, setActiveTab] = useState<string>(EnumPortfolioTab.Overview);
	const [index, setIndex] = useState<number>(0);
	const [showTab, setShowTab] = useState<boolean>(true);

	const { errors } = useContext(OrderlyAppContext);

	const dataTab = [
		{
			title: 'Overview',
			icon: <OverviewIcon />,
			value: EnumPortfolioTab.Overview,
			component: <Overview />,
		},
		{
			title: 'API key',
			icon: <APIKeyIcon />,
			value: EnumPortfolioTab.API,
			component: <ApiKey />,
		},
		{
			title: 'Setting',
			icon: <SettingIcon />,
			value: EnumPortfolioTab.Setting,
			component: <Setting />,
		},
	];

	const handleShowHideTab = () => {
		setShowTab(!showTab);
		window.localStorage.setItem('showTab', JSON.stringify(!showTab));
	};

	useEffect(() => {
		const showTabLocalStorage = window.localStorage.getItem('showTab');
		setShowTab(!(showTabLocalStorage === `false`));
	}, []);

	useEffect(() => {
		setIndex(dataTab.findIndex((obj) => obj.value === activeTab));
	}, [dataTab, activeTab]);

	// const { pageHeaderHeight, headerHeight, footerHeight } = useContext(LayoutContext);

	const handleActiveTab = (value: string) => {
		setActiveTab(value);
	};

	// const height = `calc(100vh - ${headerHeight + footerHeight + (pageHeaderHeight ?? 0) + 20 + 32}px)`;

	return (
		<div className="orderly-overflow-hidden orderly-w-full orderly-mx-auto">
			<div className="orderly-flex">
				<div
					style={{
						minHeight: errors?.ChainNetworkNotSupport ? 'calc(100vh - 162px)' : 'calc(100vh - 116px)',
					}}
					className={`orderly-w-[${
						!showTab ? 'auto' : '160px'
					}] orderly-flex orderly-flex-col orderly-p-4 orderly-m-3 orderly-bg-gunmetal orderly-border orderly-border-semiTransparentWhite orderly-rounded-xl`}
				>
					<div className="orderly-text-translucent orderly-text-xs orderly-flex orderly-justify-between">
						{showTab && <span>Portfolio</span>}
						<div
							className={`orderly-cursor-pointer ${!showTab && 'orderly-rotate-90 orderly-mx-[auto]'}`}
							onClick={handleShowHideTab}
						>
							<PortfolioIcon />
						</div>
					</div>
					<div className="orderly-py-6 orderly-flex orderly-flex-col orderly-gap-4">
						{dataTab.map((data, index) => {
							return (
								<div
									key={index}
									onClick={() => handleActiveTab(data.value)}
									className={`orderly-cursor-pointer orderly-h-10 orderly-flex orderly-items-center orderly-px-3 orderly-rounded-md orderly-w-full orderly-text-left orderly-group orderly-transition-colors group-data-[state=closed]/bar:orderly-w-[42px] orderly-overflow-hidden 
								${
									activeTab === data.value
										? '!orderly-text-paleLime orderly-bg-charcoalBlue'
										: 'orderly-text-translucentWhite hover:orderly-bg-charcoalGray'
								}`}
								>
									{showTab ? data.title : data.icon}
								</div>
							);
						})}
					</div>
				</div>
				<div className={`orderly-mx-3 orderly-my-6 orderly-w-[calc(100%-${!showTab ? '100px' : '184px'})]`}>
					{dataTab[index].component}
				</div>
			</div>
		</div>
	);
};
