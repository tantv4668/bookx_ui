'use client';
import { RightIcon } from '@/app/components/assets/icons/rightIcon';
import Button from '@/app/components/globals/button';
import { cn } from '@/app/components/utils/css';
import { useAccount, usePrivateInfiniteQuery } from '@orderly.network/hooks';
import React, { FC, PropsWithChildren, useCallback, useContext, useMemo } from 'react';
import { generateKeyFun } from '../utils';
import { NetworkImage } from '@/app/components/assets/icons/networkImage';
import { Text } from '@/app/components/text';
import { AccountStatus } from '@/app/components/block/desktop/accountStatus.desktop';
import { OrderlyAppContext } from '@orderly.network/react';
// import { OrderlyAppContext } from '@/app/components/provider';
import { showAccountConnectorModal } from '@/app/components/block/walletConnect';
import { AccountStatusEnum } from '@/app/components/types/constants';
import { Column, Table } from '@/app/components/table';

interface Props {
	columns: Column[];
	dataSource: any;
	isLoading: boolean;
}

const OverviewTable: FC<PropsWithChildren<Props>> = (props) => {
	const { columns, dataSource, isLoading } = props;

	const { state } = useAccount();

	const { onWalletConnect, onSetChain, onWalletDisconnect, accountMenuItems, onClickAccountMenuItem } =
		useContext(OrderlyAppContext);

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
		<div className="orderly-overflow-y-auto">
			<Table
				isApiKeyTab
				dataSource={dataSource}
				columns={columns}
				loading={isLoading}
				className="orderly-text-2xs"
				headerClassName={cn(
					'orderly-px-3 orderly-py-[3px] orderly-h-10 orderly-border-b orderly-border-line orderly-text-[#ffffff5c] orderly-text-[13px]',
					'orderly-border-b orderly-border-b-semiTransparentWhite',
				)}
				generatedRowKey={(record: any) => record.id}
				onRow={(record: any) => ({
					className:
						'orderly-h-[40px] orderly-border-b-[1px] orderly-border-b-solid orderly-border-semiTransparentWhite',
				})}
			/>
			{dataSource && dataSource.length === 0 && state.status !== 4 && (
				<div className="orderly-flex orderly-flex-col orderly-gap-4 orderly-justify-center orderly-items-center orderly-mt-8 orderly-mb-4">
					<AccountStatus
						isApiKeyTab
						status={state.status}
						address={state.address}
						accountInfo={undefined}
						className="orderly-mr-3"
						onConnect={onConnect}
						dropMenuItem={accountMenuItems}
						onClickDropMenuItem={onClickAccountMenuItem}
					/>
					<div className="orderly-text-[12px] orderly-white orderly-opacity-35 orderly-box orderly-leading-none">
						Please Connect wallet before starting to trade
					</div>
				</div>
			)}
		</div>
	);
};

export default OverviewTable;
