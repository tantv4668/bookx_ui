'use client';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { _orderlySymbolKey } from '../constant';

export type Tab = {
	title: string;
	value: string;
	path: () => string;
};

export type NavbarTabProps = {
	activeTab?: string;
	onTabChange?: (tab: Tab) => void;
	tabs?: Tab[];
};

const NavbarTab: React.FC = () => {
	const [activeTab, setActiveTab] = useState('trade');
	const router = useRouter();
	const pathname = usePathname();
	const isProd = process.env.NEXT_PUBLIC_IS_PROD === 'true';

	const tabs = useMemo<Tab[]>(
		() => [
			{
				title: 'Trade',
				value: 'trade',
				path: () => {
					const symbol = localStorage.getItem(_orderlySymbolKey) ?? 'PERP_ETH_USDC';
					return `/perp/${symbol}`;
				},
			},
			{
				title: 'Portfolio',
				value: 'portfolio',
				path: () => '/portfolio',
			},
			{
				title: 'Affiliate',
				value: 'referral',
				path: () => '/referral/dashboard',
			},
			{
				title: 'Swap',
				value: 'swap',
				path: () => '/swap',
			},
			{
				title: 'Rewards',
				value: 'Rewards',
				path: () => ' https://app.orderly.network/tradingRewards',
			},
			{
				title: 'Docs',
				value: 'Docs',
				path: () => 'https://docs.bookx.trade',
			},
			{
				title: 'Feedback',
				value: 'Feedback',
				path: () => 'https://bit.ly/bookx-feedback',
			},
			{
				title: !isProd ? 'Mainnet' : 'Testnet',
				value: !isProd ? 'Mainnet' : 'Testnet',
				path: () => (!isProd ? 'https://app.bookx.trade' : 'https://testnet-app.bookx.trade'),
			},
		],
		[],
	);

	const onTabChange = (tab: Tab) => {
		tab.title !== 'Docs' && tab.title !== 'Feedback' && tab.title !== 'Rewards'
			? router.push(tab.path())
			: window.open(tab.path(), '_blank');
	};

	useEffect(() => {
		setActiveTab(
			pathname === '/portfolio'
				? 'portfolio'
				: pathname === '/referral'
				? 'referral'
				: pathname === '/referral/dashboard'
				? 'referral'
				: pathname === '/swap'
				? 'swap'
				: 'trade',
		);
	}, [pathname]);

	return (
		<div className="orderly-flex orderly-items-center orderly-h-[48px] orderly-text-[13px]">
			{tabs.map((tab) => {
				return (
					<div
						key={tab.value}
						className={`${
							activeTab === tab.value
								? 'orderly-text-[rgba(255,255,255,0.98)]'
								: 'orderly-text-[rgba(255,255,255,0.54)]'
						} hover:orderly-text-[rgba(255,255,255,0.98)] orderly-cursor-pointer orderly-ml-[40px]`}
						onClick={() => {
							onTabChange?.(tab);
						}}
					>
						{tab.title}
					</div>
				);
			})}
		</div>
	);
};

export default NavbarTab;
