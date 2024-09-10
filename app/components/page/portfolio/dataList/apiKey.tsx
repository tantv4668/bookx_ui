'use client';
import { RightIcon } from '@/app/components/assets/icons/rightIcon';
import Button from '@/app/components/globals/button';
import { cn } from '@/app/components/utils/css';
import { useAccount, usePrivateInfiniteQuery } from '@orderly.network/hooks';
import React, { useCallback, useContext, useMemo } from 'react';
import { generateKeyFun } from '../utils';
import { NetworkImage } from '@/app/components/assets/icons/networkImage';
import { Text } from '@/app/components/text';
import { AccountStatus } from '@/app/components/block/desktop/accountStatus.desktop';
import { OrderlyAppContext } from '@orderly.network/react';
// import { OrderlyAppContext } from '@/app/components/provider';
import { showAccountConnectorModal } from '@/app/components/block/walletConnect';
import { AccountStatusEnum } from '@/app/components/types/constants';
import { Column, Table } from '@/app/components/table';

const ApiKey: React.FC = (props) => {
	// const { data, size, setSize, isLoading } = usePrivateInfiniteQuery(
	// generateKeyFun("/v1/asset/history", { size: 100 }),
	// {
	//   initialSize: 1,
	//   formatter: (data) => data,
	//   revalidateOnFocus: false,
	// }
	// );
	const dataSource: any = []; //get api
	const isLoading: boolean = false; //get api

	const { state } = useAccount();

	console.log('??state', state);

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

	const columns = useMemo<Column[]>(() => {
		return [
			{
				title: 'API key	',
				dataIndex: 'api_key	',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
			{
				title: 'Permission type',
				dataIndex: 'permission_type	',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
			{
				title: 'Restricted IP',
				dataIndex: 'restricted_ip',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{value}</Text>;
				},
			},
			{
				title: 'Expiration date',
				dataIndex: 'Expiration date',
				render(value, record, index) {
					return (
						<Text
							rule="date"
							formatString="YYYY-MM-DD HH:mm:ss"
							className="orderly-text-base-contrast-98 orderly-text-3xs"
						>
							{value}
						</Text>
					);
				},
			},
		];
	}, []);

	return (
		<div className="orderly-card-root orderly-card orderly-rounded-xl orderly-shadow orderly-text-white orderly-p-6 orderly-bg-gunmetal">
			<h3 className="orderly-card-header-title orderly-font-semibold orderly-leading-none orderly-tracking-tight orderly-text-lg orderly-border-b-2 orderly-border-semiTransparentWhite orderly-pb-4 orderly-mb-4">
				API keys
			</h3>

			<div className="orderly-grid orderly-grid-cols-2 orderly-gap-4 orderly-mb-4">
				<div className="orderly-box orderly-px-4 orderly-py-2 orderly-border orderly-border-semiTransparentWhite orderly-rounded-xl orderly-gradient-neutral orderly-flex orderly-flex-col orderly-items-start orderly-justify-start orderly-flex-nowrap orderly-bg-eerieBlack orderly-w-full">
					<div className="orderly-text-xs orderly-opacity-35 orderly-leading-5">Account ID</div>
					<div>--</div>
				</div>
				<div className="orderly-box orderly-px-4 orderly-py-2 orderly-border orderly-border-semiTransparentWhite orderly-rounded-xl orderly-gradient-neutral orderly-flex orderly-flex-col orderly-items-start orderly-justify-start orderly-flex-nowrap orderly-bg-eerieBlack orderly-w-full">
					<div className="orderly-text-xs orderly-opacity-35 orderly-leading-5">UID</div>
					<div>--</div>
				</div>
			</div>

			<div className="orderly-box orderly-size-width orderly-flex orderly-flex-row orderly-items-center orderly-justify-start orderly-flex-nowrap orderly-text-sm orderly-border-b-2 orderly-border-semiTransparentWhite orderly-pb-4 orderly-gap-4">
				<div className="orderly-box orderly-size-width orderly-flex orderly-flex-col orderly-items-start orderly-justify-start orderly-flex-nowrap orderly-gap-1">
					<div className="orderly-text-translucent">
						Create API keys to suit your trading needs. For your security, don't share your API keys with anyone.
					</div>
					<div className="orderly-text-lightPurple orderly-box orderly-flex orderly-flex-row orderly-items-center orderly-justify-start orderly-flex-nowrap  orderly-fill-primary-light orderly-cursor-pointer orderly-text-2xs md:orderly-text-xs xl:orderly-text-sm">
						<span>Read API guide</span>
						<RightIcon />
					</div>
				</div>
				<Button
					disabled={true}
					type="button"
					className="orderly-button orderly-inline-flex orderly-items-center orderly-justify-center orderly-whitespace-nowrap orderly-transition-colors disabled:orderly-cursor-not-allowed disabled:orderly-bg-base-3 disabled:orderly-text-translucent disabled:hover:orderly-bg-base-3 orderly-px-3 orderly-rounded-md orderly-h-8 orderly-text-sm hover:orderly-opacity-70 hover:orderly-text-black active:orderly-bg-base-4/50 orderly-bg-blueGray orderly-text-primary-contrast"
				>
					<span className="orderly-text-sm">+</span>
					Create API key
				</Button>
			</div>

			<div className="orderly-overflow-y-auto">
				<Table
					isApiKeyTab={state.status === 0}
					dataSource={dataSource}
					columns={columns}
					loading={isLoading}
					className="orderly-text-2xs order"
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
		</div>
	);
};

export default ApiKey;
