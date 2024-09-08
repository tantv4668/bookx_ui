'use client';
import { Deposit } from '../deposit/deposit';
import { ExtensionSlot } from '../../plugin/slot';
import { ExtensionPosition, installExtension } from '../../plugin';

installExtension<DepositSlotProps>({
	name: 'default-deposit',
	scope: ['*'],
	positions: [ExtensionPosition.DepositForm],
	__isInternal: true,
})((props: any) => {
	return <Deposit onOk={props.onOk} />;
});

export interface DepositSlotProps {
	onOk: () => void;
}

export const DepositSlot = (props: DepositSlotProps) => {
	return <ExtensionSlot position={ExtensionPosition.DepositForm} onOk={props.onOk} />;
};
