'use client';
import { memo, useCallback, useContext } from 'react';
import { Numeral } from '../../../text';
import { useCollateral, usePositionStream } from '@orderly.network/hooks';
import { AssetsContext } from '../../../provider';
import { modal } from '../../../modal';
// import { SettlePnlContent } from '@/block/withdraw';
import { RefreshCcw } from 'lucide-react';
import { SettlePnlContent } from '../../withdraw';
// import { DesktopFreeCollat } from '@/block/orderEntry/sections/freeCollat';

const AssetsDetail = () => {
	const { freeCollateral } = useCollateral({
		dp: 2,
	});

	const [{ aggregated }] = usePositionStream();

	const { onSettle } = useContext(AssetsContext);

	const onSettleClick = useCallback(() => {
		modal
			.confirm({
				title: 'Settle PnL',
				content: <SettlePnlContent />,
				maxWidth: 'xs',
				onCancel() {
					return Promise.reject('cancel');
				},
				onOk() {
					return onSettle().catch((e) => {});
				},
			})
			.then(
				() => {},
				(error: any) => {},
			);
	}, []);

	return (
		<div
			className={
				'orderly-text-xs orderly-pb-4 orderly-mb-4 orderly-border-b orderly-border-divider orderly-space-y-2 orderly-tabular-nums'
			}
		>
			<div className={'orderly-flex orderly-justify-between orderly-text-base-contrast-54'}>
				{/* <DesktopFreeCollat title="Free collateral" className="orderly-text-xs" /> */}
				<div className="orderly-flex orderly-justify-end orderly-gap-1">
					<Numeral surfix={<span className={'orderly-text-base-contrast-36'}>USDC</span>}>{freeCollateral}</Numeral>
				</div>
			</div>
		</div>
	);
};

export const MemorizedAssetsDetail = memo(AssetsDetail);
