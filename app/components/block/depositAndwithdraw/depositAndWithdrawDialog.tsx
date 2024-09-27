'use client';
import { FC, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../../dialog';
import { DepositAndWithdraw } from './depositAndwithdraw';

export const DepositAndWithdrawDialog: FC<any> = (props) => {
	const [open, setOpen] = useState(false);

	const onOk = (data?: any) => {
		// resolve(data);
		// hide();
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{props.children}</DialogTrigger>
			<DialogContent
				onOpenAutoFocus={(e) => e.preventDefault()}
				closable
				maxWidth={'sm'}
				className="xl:orderly-max-w-[480px] orderly-px-5"
			>
				<DepositAndWithdraw activeTab={props.isWithdraw ? 'withdraw' : 'deposit'} onOk={onOk} />
			</DialogContent>
		</Dialog>
	);
};
