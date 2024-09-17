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
import { convertString } from '@/app/components/utils/convertString';
import { convertText } from '@/app/components/utils/convertText';
import { DeleteDialog } from '@/app/components/dialog/deleteDialog';

const ApiKey: React.FC = (props) => {
	const isLoading: boolean = false;

	const { state } = useAccount();

	const { data: dataAPIKeys, mutate } = usePrivateQuery<any>(`/v1/client/key_info?keyStatus=ACTIVE`);

	const handleCopyID = (accountId: string) => {
		navigator.clipboard.writeText(accountId).then(() => {
			toast.success('Copied to clipboard');
		});
	};

	const handleCopy = (content: any) => {
		navigator.clipboard.writeText(content).then(() => {
			toast.success('Copied to clipboard');
		});
	};

	const columns = useMemo<Column[]>(() => {
		return [
			{
				title: 'API key	',
				dataIndex: 'api_key	',
				render(value, record, index) {
					return (
						<div className="orderly-flex orderly-gap-1 orderly-items-center orderly-text-translucentWhite_80 orderly-px-2">
							<Text className="orderly-text-translucentWhite_80 orderly-text-3xs">
								{convertString(record.orderly_key)}
							</Text>
							<span onClick={() => handleCopy(record.orderly_key)} className="orderly-cursor-pointer">
								<CopyIDIcon />
							</span>
						</div>
					);
				},
			},
			{
				title: 'Permission type',
				dataIndex: 'permission_type	',
				render(value, record, index) {
					return (
						<Text className="orderly-text-translucentWhite_80 orderly-text-3xs orderly-px-3">
							{convertText(record.scope)}
						</Text>
					);
				},
			},
			{
				title: 'Restricted IP',
				dataIndex: 'restricted_ip',
				render(value, record, index) {
					return (
						<div className="orderly-flex orderly-gap-1 orderly-items-center orderly-text-translucentWhite_80 orderly-px-2">
							<Text className="orderly-text-translucentWhite_80 orderly-text-3xs">
								{record.ip_restriction_list.toString()}
							</Text>
							{record.ip_restriction_list.toString() && (
								<span
									onClick={() => handleCopy(record.ip_restriction_list.toString())}
									className="orderly-cursor-pointer"
								>
									<CopyIDIcon />
								</span>
							)}
						</div>
					);
				},
			},
			{
				title: 'Expiration date',
				dataIndex: 'Expiration date',
				render(value, record, index) {
					return (
						<Text
							rule="date"
							formatString="YYYY-MM-DD"
							className="orderly-text-translucentWhite_80 orderly-text-3xs orderly-px-2"
						>
							{record.expiration}
						</Text>
					);
				},
			},

			{
				title: '',
				dataIndex: '',
				render(value, record, index) {
					return (
						<div className="orderly-flex orderly-items-center orderly-justify-end orderly-w-full orderly-gap-2 orderly-pt-3">
							<CreateApiKeyDialog isEdit record={record} mutate={mutate}>
								<Button
									onClick={() => {}}
									className="!orderly-w-[37px] orderly-text-[12px] orderly-h-6 !orderly-px-2 !orderly-py-0"
								>
									Edit
								</Button>
							</CreateApiKeyDialog>
							<DeleteDialog record={record} mutate={mutate}>
								<Button className="!orderly-w-[50px] orderly-h-6 !orderly-bg-[#4A5369] orderly-text-[12px] !orderly-px-2 !orderly-py-0">
									Delete
								</Button>
							</DeleteDialog>
						</div>
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
						className={`orderly-button orderly-inline-flex orderly-items-center orderly-justify-center orderly-whitespace-nowrap orderly-transition-colors disabled:orderly-cursor-not-allowed disabled:orderly-bg-base-3 disabled:orderly-text-translucent orderly-px-4 orderly-rounded-md orderly-h-8 orderly-text-sm active:orderly-bg-base-4/50 ${
							state.status === 0
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
