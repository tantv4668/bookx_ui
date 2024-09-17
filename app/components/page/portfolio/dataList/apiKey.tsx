'use client';
import { RightIcon } from '@/app/components/assets/icons/rightIcon';
import Button from '@/app/components/globals/button';
import { cn } from '@/app/components/utils/css';
import { useAccount, usePrivateQuery } from '@orderly.network/hooks';
import React, { useMemo } from 'react';
import { Text } from '@/app/components/text';
import { Column, Table } from '@/app/components/table';
import { shortenAddress } from '@/app/components/utils/string';
import Link from 'next/link';
import { CreateApiKeyDialog } from '@/app/components/dialog/createApiKeyDialog';
import { CopyIDIcon } from '@/app/components/assets/icons/copyIDIcon';
import { toast } from '../../../toast';

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

	const { data: dataAPIKeys } = usePrivateQuery<any>(
		`/v1/client/key_info?keyStatus=ACTIVE`,
	);

	console.log("dataAPIKeys", dataAPIKeys)

	const handleCopyID = (accountId: string) => {
		navigator.clipboard.writeText(accountId).then(() => {
			toast.success('Copied to clipboard');
		});
	};

	const columns = useMemo<Column[]>(() => {
		return [
			{
				title: 'API key	',
				dataIndex: 'api_key	',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{record.orderly_key}</Text>;
				},
			},
			{
				title: 'Permission type',
				dataIndex: 'permission_type	',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{record.scope}</Text>;
				},
			},
			{
				title: 'Restricted IP',
				dataIndex: 'restricted_ip',
				render(value, record, index) {
					return <Text className="orderly-text-base-contrast-98 orderly-text-3xs">{record.ip_restriction_list.toString()}</Text>;
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
							{record.expiration}
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
					<div className="orderly-text-[13px] orderly-opacity-35 orderly-leading-5">Account ID</div>
					<div className="orderly-flex orderly-gap-2 orderly-items-center">
						{(state.accountId && shortenAddress(state.accountId)) || '--'}
						{state.accountId && (
							<span onClick={() => state.accountId && handleCopyID(state.accountId)} className="orderly-cursor-pointer">
								<CopyIDIcon />
							</span>
						)}
					</div>
				</div>
				<div className="orderly-box orderly-px-4 orderly-py-2 orderly-border orderly-border-semiTransparentWhite orderly-rounded-xl orderly-gradient-neutral orderly-flex orderly-flex-col orderly-items-start orderly-justify-start orderly-flex-nowrap orderly-bg-eerieBlack orderly-w-full">
					<div className="orderly-text-[13px] orderly-opacity-35 orderly-leading-5">UID</div>
					<div>{state.userId || '--'}</div>
				</div>
			</div>

			<div className="orderly-flex orderly-flex-row orderly-items-center orderly-justify-start orderly-flex-nowrap orderly-text-[14px] orderly-border-b-2 orderly-border-semiTransparentWhite orderly-pb-4 orderly-gap-4">
				<div className="orderly-flex orderly-flex-col orderly-items-start orderly-justify-start orderly-gap-1 orderly-w-full">
					<div className="orderly-text-translucent">
						Create API keys to suit your trading needs. For your security, don't share your API keys with anyone.
					</div>
					<Link
						href={'https://orderly.network/docs/build-on-evm/evm-api/api-authentication'}
						target="_blank"
						className="orderly-text-lightPurple orderly-box orderly-flex orderly-flex-row orderly-items-center orderly-justify-start orderly-flex-nowrap  orderly-fill-primary-light orderly-cursor-pointer orderly-text-2xs md:orderly-text-xs xl:orderly-text-sm"
					>
						<span className="orderly-text-[14px]">Read API guide</span>
						<RightIcon />
					</Link>
				</div>
				<CreateApiKeyDialog>
					<Button
						disabled={state.status === 0}
						type="button"
						className={`orderly-button orderly-inline-flex orderly-items-center orderly-justify-center orderly-whitespace-nowrap orderly-transition-colors disabled:orderly-cursor-not-allowed disabled:orderly-bg-base-3 disabled:orderly-text-translucent orderly-px-4 orderly-rounded-md orderly-h-8 orderly-text-sm active:orderly-bg-base-4/50 ${state.status === 0
							? '!orderly-bg-blueGray !orderly-text-primary-contrast'
							: 'orderly-text-black !orderly-bg-paleLime hover:orderly-opacity-70 hover:orderly-text-black hover:orderly-bg-paleLime'
							}`}
					>
						<span className="orderly-text-sm">+</span>
						Create API key
					</Button>
				</CreateApiKeyDialog>
			</div>

			<div className={dataAPIKeys && dataAPIKeys.length > 0 ? 'orderly-overflow-y-auto' : ''}>
				<Table
					dataSource={dataAPIKeys}
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
			</div>
		</div>
	);
};

export default ApiKey;
