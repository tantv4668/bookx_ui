'use client';
import React, { useMemo, useRef } from 'react';
import { useAccount, usePrivateInfiniteQuery, useQuery } from '@orderly.network/hooks';
import { generateKeyFun1, getInfiniteData, upperFirstLetter } from '../utils';
import { AccountStatusEnum } from '@orderly.network/types';
import { NetworkImage } from '@/app/components/assets/icons/networkImage';
import { Tooltip } from '@/app/components/tooltip';
import { Numeral } from '@/app/components/text/numeral';
import { cn } from '@/app/components/utils/css';
import { useEndReached } from '@/app/components/listView/useEndReached';
import { Text } from '@/app/components/text';
import { Column, Table } from '@/app/components/table';

type DistributionProps = {
	filterStartEndDay: any;
	filterType: string;
};

const Distribution: React.FC<DistributionProps> = (props) => {
	const { filterStartEndDay, filterType } = props;
	const sentinelRef = useRef<HTMLDivElement | null>(null);
	const { state } = useAccount();

	const { data: chains } = useQuery('/v1/public/chain_info');

	const { data, size, setSize, isLoading } = usePrivateInfiniteQuery(
		generateKeyFun1(
			`/v1/client/distribution_history?size=100${
				filterStartEndDay === null || filterStartEndDay[0] === null || filterStartEndDay[1] === null
					? ''
					: `&start_t=${filterStartEndDay[0]}&end_t=${filterStartEndDay[1]}`
			}${filterType === 'ALL' || filterType === '' ? '' : `&type=${filterType}`}`,
			{},
		),
		{
			initialSize: 1,
			formatter: (data) => data,
			revalidateOnFocus: false,
		},
	);

	const dataSource = useMemo(() => {
		if (state.status < AccountStatusEnum.EnableTrading) {
			return [];
		}
		return getInfiniteData(data);
	}, [state, data]);

	useEndReached(sentinelRef, () => {
		if (!isLoading) {
			setSize(size + 1);
		}
	});

	const columns = useMemo<Column[]>(() => {
		return [
			{
				title: 'Token',
				dataIndex: 'token',
				render(value, record, index) {
					return (
						<div className="orderly-flex orderly-items-center orderly-text-base-contrast-80">
							<NetworkImage type={'token'} name={value} size="small" rounded />
							<div className="orderly-ml-[6px]">{value}</div>
						</div>
					);
				},
			},
			{
				title: 'Time',
				dataIndex: 'created_time',
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
			{
				title: 'Status',
				dataIndex: 'trans_status',
				render(value, record, index) {
					const isEnd = ['COMPLETED', 'CANCELED', 'FAILED'].includes(value);
					return (
						<div className={isEnd ? 'orderly-text-base-contrast-54' : 'orderly-text-base-contrast-98'}>
							{upperFirstLetter(value)}
						</div>
					);
				},
			},
			{
				title: 'Type',
				dataIndex: 'side',
				render(value, record, index) {
					return (
						<div className={value === 'DEPOSIT' ? 'orderly-text-paleLime' : 'orderly-text-lightPurple'}>
							{upperFirstLetter(value)}
						</div>
					);
				},
			},

			{
				title: 'Amount',
				dataIndex: 'amount',
				align: 'right',
				className: 'orderly-w-[120px]',
				render(value, record, index) {
					const isDeposit = record.side === 'DEPOSIT';
					return (
						<div className={isDeposit ? 'orderly-text-paleLime' : 'orderly-text-lightPurple'}>
							{isDeposit ? '+' : '-'}
							<Numeral
							// precision={base_dp}
							>
								{Math.abs(value)}
							</Numeral>
						</div>
					);
				},
			},
		];
	}, [chains]);

	return (
		<div className={dataSource && dataSource.length > 0 ? 'orderly-overflow-y-auto' : ''}>
			<Table
				dataSource={dataSource}
				columns={columns}
				loading={isLoading}
				className="orderly-text-2xs orderly-min-h-[300px]"
				headerClassName={cn(
					'orderly-h-[40px] orderly-text-base-contrast-54 orderly-bg-base-900',
					'orderly-border-b orderly-border-b-divider',
				)}
				generatedRowKey={(record: any) => record.id}
				onRow={(record: any) => ({
					className:
						'orderly-h-[40px] orderly-border-b-[1px] orderly-border-b-solid orderly-border-[rgba(255,255,255,0.04)]',
				})}
			/>
			<div ref={sentinelRef} className="orderly-relative orderly-invisible orderly-h-[1px] orderly-top-[-300px]" />
		</div>
	);
};

export default Distribution;
