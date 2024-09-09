'use client';
import { useEffect, useState } from 'react';
// import AssetHistory from './assetHistory';
// import FundingFee from './fundingFee';
// import Liquidations from './liquidations';
// import { LayoutContext } from '@/app/components/layout/layoutContext';
// import { TabPane, Tabs } from '@/app/components/tab';
import { PortfolioIcon } from '@/app/components/assets/icons/portfolioIcon';
import Overview from './overview';
import Setting from './setting';
import ApiKey from './apiKey';

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

	const dataTab = [
		{
			value: EnumPortfolioTab.Overview,
			component: <Overview />,
		},
		{
			value: EnumPortfolioTab.API,
			component: <ApiKey />,
		},
		{
			value: EnumPortfolioTab.Setting,
			component: <Setting />,
		},
	];

	useEffect(() => {
		setIndex(dataTab.findIndex((obj) => obj.value === activeTab));
	}, [dataTab, activeTab]);

	// const { pageHeaderHeight, headerHeight, footerHeight } = useContext(LayoutContext);

	const handleActiveTab = (value: string) => {
		setActiveTab(value);
	};

	// const height = `calc(100vh - ${headerHeight + footerHeight + (pageHeaderHeight ?? 0) + 20 + 32}px)`;

	return (
		//   <div
		//   style={{ height }}
		//   className="orderly-overflow-hidden orderly-max-w-[1408px] orderly-min-w-[736px] orderly-mx-auto orderly-tabular-nums"
		// >
		//   <Tabs
		//     value={activeTab}
		//     onTabChange={setActiveTab}
		//     tabBarClassName="orderly-h-[48px] orderly-text-sm orderly-pl-0"
		//   >
		//     <TabPane
		//       title="Deposits & Withdrawals"
		//       value={EPortfolioTab.DepositsWithdrawals}
		//     >
		//       <AssetHistory />
		//     </TabPane>
		//     <TabPane title="Funding" value={EPortfolioTab.Funding}>
		//       <FundingFee />
		//     </TabPane>
		//     <TabPane title="Liquidations" value={EPortfolioTab.Liquidations}>
		//     <Liquidations />
		//   </TabPane>
		//   </Tabs>
		// </div>
		<div className="orderly-overflow-hidden orderly-max-w-[1408px] orderly-min-w-[736px] orderly-mx-auto">
			<div className="orderly-flex">
				<div className="orderly-h-[100vh] orderly-w-[160px] orderly-flex orderly-flex-col orderly-p-4 orderly-m-3 orderly-bg-gunmetal orderly-border orderly-border-semiTransparentWhite orderly-rounded-xl">
					<div className="orderly-text-translucent orderly-text-xs orderly-flex orderly-justify-between">
						<span>Portfolio</span> <PortfolioIcon />
					</div>
					<div className="orderly-py-6 orderly-flex orderly-flex-col orderly-gap-4">
						<div
							onClick={() => handleActiveTab(EnumPortfolioTab.Overview)}
							className={`orderly-cursor-pointer orderly-h-10 orderly-flex orderly-items-center orderly-px-3 orderly-rounded-md orderly-w-full orderly-text-left orderly-group orderly-transition-colors group-data-[state=closed]/bar:orderly-w-[42px] orderly-overflow-hidden 
            ${
							activeTab === EnumPortfolioTab.Overview
								? '!orderly-text-paleLime orderly-bg-charcoalBlue'
								: 'orderly-text-translucentWhite hover:orderly-bg-charcoalGray'
						}`}
						>
							Overview
						</div>
						<div
							onClick={() => handleActiveTab(EnumPortfolioTab.API)}
							className={`orderly-cursor-pointer orderly-h-10 orderly-flex orderly-items-center orderly-px-3 orderly-rounded-md orderly-w-full orderly-text-left orderly-group orderly-transition-colors group-data-[state=closed]/bar:orderly-w-[42px] orderly-overflow-hidden hover:orderly-bg-charcoalGray 
            ${
							activeTab === EnumPortfolioTab.API
								? '!orderly-text-paleLime orderly-bg-charcoalBlue'
								: 'orderly-text-translucentWhite hover:orderly-bg-charcoalGray'
						}`}
						>
							API key
						</div>
						<div
							onClick={() => handleActiveTab(EnumPortfolioTab.Setting)}
							className={`orderly-cursor-pointer orderly-h-10 orderly-flex orderly-items-center orderly-px-3 orderly-rounded-md orderly-w-full orderly-text-left orderly-group orderly-transition-colors group-data-[state=closed]/bar:orderly-w-[42px] orderly-overflow-hidden hover:orderly-bg-charcoalGray 
            ${
							activeTab === EnumPortfolioTab.Setting
								? '!orderly-text-paleLime orderly-bg-charcoalBlue'
								: 'orderly-text-translucentWhite hover:orderly-bg-charcoalGray'
						}`}
						>
							Setting
						</div>
					</div>
				</div>
				<div className="orderly-mx-3 orderly-my-6 orderly-w-[calc(100%-184px)]">{dataTab[index].component}</div>
			</div>
		</div>
	);
};
