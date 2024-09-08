'use client';
import { FC, ReactNode, useContext, useMemo, useState } from 'react';
import { AccountStatusEnum } from '@orderly.network/types';
import { useAccount, useChains, useWalletConnector } from '@orderly.network/hooks';
import { isTestnet } from '@orderly.network/utils';
import { AccountStatusProps } from '../sections/accountStatusBar';
import { DesktopWalletConnnectButton } from '../accountStatus/desktop/walletConnectButton.desktop';
import { OrderlyAppContext } from '../../provider';
import { Chains } from '../accountStatus/sections/desktop';
import { cn } from '../../utils/css';

//

export interface DesktopDropMenuItem {
	icon: ReactNode;
	title: string;
	key?: string;
	className?: string;
	onClick?: () => void;
}

export const AccountStatus: FC<
	AccountStatusProps & {
		className?: string;
		dropMenuItem?: DesktopDropMenuItem[] | React.ReactNode;
		onClickDropMenuItem?: (item: DesktopDropMenuItem) => void;
	}
> = (props) => {
	const { status = AccountStatusEnum.NotConnected } = props;
	const { account, state } = useAccount();
	const [open, setOpen] = useState(false);
	const { onWalletDisconnect } = useContext(OrderlyAppContext);

	const { connectedChain } = useWalletConnector();
	const [allChains, { findByChainId }] = useChains(undefined, {
		pick: 'network_infos',
		filter: (chain: any) => chain.network_infos?.bridge_enable || chain.network_infos?.bridgeless,
		// filter: (chain: API.Chain) => isTestnet(chain.network_infos?.chain_id),
	});

	const chains = useMemo(() => {
		if (Array.isArray(allChains)) return allChains;
		if (allChains === undefined) return [];

		// @ts-ignore
		if (connectedChain && isTestnet(parseInt(connectedChain.id))) {
			return allChains.testnet ?? [];
		}

		return allChains.mainnet;
	}, [allChains, connectedChain]);

	return (
		<div className={cn('orderly-h-full orderly-flex orderly-items-center orderly-space-x-2', props.className)}>
			<Chains disabled={status < AccountStatusEnum.NotConnected} className="orderly-rounded-full" />
			<DesktopWalletConnnectButton
				status={status}
				// @ts-ignore
				chains={chains}
				address={props.address}
				balance={props.balance}
				currency={props.currency}
				totalValue={props.totalValue}
				accountInfo={account}
				loading={props.loading}
				onConnect={props.onConnect}
				onDisconnect={props.onDisconnect}
				showGetTestUSDC={props.showGetTestUSDC}
				className={props.className}
				dropMenuItem={props.dropMenuItem}
				onClickDropMenuItem={props.onClickDropMenuItem}
			/>
		</div>
	);
};
