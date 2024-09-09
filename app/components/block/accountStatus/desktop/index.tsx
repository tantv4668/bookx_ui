'use client';
import Button from '../../../globals/button';
import { Assets } from './assets';
import { Divider } from '../../../divider';
import { FC, useContext } from 'react';
import { AssetsContext } from '@/app/components/provider';

interface Props {
	// onWithdraw?: () => void;
	// onDeposit?: () => void;
}

export const AccountInfo: FC<Props> = () => {
	const { onDeposit, onWithdraw } = useContext(AssetsContext);

	return (
		<>
			<div className="orderly-flex orderly-items-center orderly-py-4">
				<div className={'orderly-flex-1 orderly-text-base-contrast-80 orderly-text-sm'}>Account</div>
				<div className="orderly-flex orderly-gap-2">
					<Button
						id="orderly-desktop-withdraw-button"
						size={'small'}
						variant={'outlined'}
						color={'tertiary'}
						className="desktop:orderly-text-3xs desktop:orderly-text-base-contrast"
						onClick={() => onWithdraw?.()}
					>
						Withdraw
					</Button>
					<Button
						id="orderly-desktop-deposit-button"
						size={'small'}
						variant={'outlined'}
						color={'tertiary'}
						className="desktop:orderly-text-3xs desktop:orderly-text-base-contrast"
						onClick={() => onDeposit?.()}
					>
						Deposit
					</Button>
				</div>
			</div>
			<Divider />
			{/* <AssetsProvider> */}
			<Assets totalBalance={1013130} />
			{/* </AssetsProvider> */}
		</>
	);
};
