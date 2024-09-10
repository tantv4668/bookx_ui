'use client';
import { FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { StatusContext, WsNetworkStatus, useAccount, useMaintenanceStatus } from '@orderly.network/hooks';
import TopTips from '@/app/components/block/accountStatus/sections/topTips';
import { showAccountConnectorModal } from '@/app/components/block/walletConnect';
// import { OrderlyAppContext } from '@/app/components/provider';
import { AccountStatus } from '@/app/components/block/desktop/accountStatus.desktop';
import { Logo } from '@/app/components/logo';
import { AccountStatusEnum } from '@/app/components/types/constants';
import { OrderlyAppContext } from '@orderly.network/react';
import Link from 'next/link';

export type TopNavbarProps = {
	left?: ReactNode;
	right?: ReactNode;
	nav?: ReactNode;
};

export const TopNavbar: FC = (props) => {
	const { state } = useAccount();
	const { errors, accountMenuItems, onClickAccountMenuItem, topBar, topBarProps } = useContext(OrderlyAppContext);

	const { left, nav, right } = topBarProps || {};

	const { ws: wsStatus } = useContext(StatusContext);

	const { onWalletConnect, onSetChain, onWalletDisconnect } = useContext(OrderlyAppContext);

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

	return (
		<>
			{topBar || (
				<div className="orderly-h-[48px] orderly-flex">
					<div className="orderly-flex orderly-flex-1 orderly-items-center">
						<Logo />
						{left}
						<div>{nav}</div>
					</div>

					{right || (
						<AccountStatus
							status={state.status}
							address={state.address}
							accountInfo={undefined}
							className="orderly-mr-3"
							onConnect={onConnect}
							dropMenuItem={accountMenuItems}
							onClickDropMenuItem={onClickAccountMenuItem}
						/>
					)}
				</div>
			)}
			{/* <TopTips /> */}
		</>
	);
};
