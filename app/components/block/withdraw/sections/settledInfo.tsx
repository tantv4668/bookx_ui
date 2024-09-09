'use clinet';
import { RotateCw } from 'lucide-react';
import { FC, useCallback, useContext } from 'react';
import { SettlePnlContent } from '../settlePnlContent';
import { AssetsContext } from '@/app/components/provider';
import { modal } from '@/app/components/modal';
import { Numeral } from '@/app/components/text/numeral';
import Button from '@/app/components/globals/button';

interface UnsettledInfoProps {
	unsettledPnL: number;
	hasPositions: boolean;
}

export const UnsettledInfo: FC<UnsettledInfoProps> = (props) => {
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

	if (props.unsettledPnL === 0 && props.hasPositions === false) return null;
	return (
		<div className="orderly-flex orderly-items-center orderly-justify-between orderly-mt-1">
			<div className="orderly-text-4xs orderly-flex orderly-items-center orderly-space-x-1 orderly-text-base-contrast-36">
				<span>{`Unsettled:`}</span>
				<Numeral coloring precision={6}>
					{props.unsettledPnL}
				</Numeral>
				<span>USDC</span>
			</div>
			<Button
				id="orderly-deposit-content-settle-button"
				className="orderly-text-primary-light orderly-text-4xs desktop:orderly-text-3xs"
				size="small"
				variant={'text'}
				// @ts-ignore
				leftIcon={<RotateCw size={15} />}
				onClick={onSettleClick}
			>
				Settle
			</Button>
		</div>
	);
};
