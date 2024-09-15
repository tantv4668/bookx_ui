'use client';
import { FC, ReactNode, useCallback, useContext } from 'react';
import { useAccount } from '@orderly.network/hooks';
import { showAccountConnectorModal } from '@/app/components/block/walletConnect';
import { AccountStatus } from '@/app/components/block/desktop/accountStatus.desktop';
import { AccountStatusEnum } from '@/app/components/types/constants';
import { OrderlyAppContext } from '@orderly.network/react';

export type TopNavbarProps = {
	left?: ReactNode;
	right?: ReactNode;
	nav?: ReactNode;
};

export const TopLeftNavbar: FC = (props) => {
	const { state } = useAccount();

	const { onWalletConnect, accountMenuItems, onClickAccountMenuItem } = useContext(OrderlyAppContext);

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
			<AccountStatus
				status={state.status}
				address={state.address}
				accountInfo={undefined}
				className="orderly-mr-3"
				onConnect={onConnect}
				dropMenuItem={accountMenuItems}
				onClickDropMenuItem={onClickAccountMenuItem}
			/>
			{/* <TopTips /> */}
		</>
	);
};
