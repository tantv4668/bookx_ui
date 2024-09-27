'use client';
import { FC, PropsWithChildren, useRef, useState } from 'react';
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../../dialog';
import { LeverageEditor } from '../sections/leverageEditor';
import Button from '../../../globals/button';
import { useLeverage } from '@orderly.network/hooks';
import { toast } from '../../../toast';
import { useMarginRatio } from '@orderly.network/hooks';
import { Numeral } from '../../../text/numeral';

interface Props {}

export const LeverageDialog: FC<any> = (props) => {
	const [open, setOpen] = useState(false);
	const { currentLeverage } = useMarginRatio();

	const [maxLeverage, { update, config: leverageLevers, isMutating }] = useLeverage();
	const nextLeverage = useRef(maxLeverage ?? 0);

	const onSave = (value: { leverage: number }) => {
		return Promise.resolve().then(() => {
			//   console.log("value", value);
			nextLeverage.current = value.leverage;
		});
	};

	const onSubmit = () => {
		if (nextLeverage.current === maxLeverage) return;
		update({ leverage: nextLeverage.current }).then(
			(res: any) => {
				setOpen(false);
				toast.success('Leverage updated');
			},
			(err: Error) => {
				console.dir(err);
				toast.error(err.message);
			},
		);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{props.children}</DialogTrigger>
			<DialogContent
				onOpenAutoFocus={(e) => e.preventDefault()}
				closable
				maxWidth={'sm'}
				className="orderly-max-w-[420px]"
			>
				<DialogHeader>
					<DialogTitle>Account Leverage</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<div className="orderly-flex orderly-text-base-contrast-54 orderly-py-5 desktop:orderly-text-xs">
						<div className="orderly-flex-1">Max account leverage</div>
						<div className="orderly-flex orderly-gap-1">
							<span>Current:</span>
							<Numeral className="orderly-text-base-contrast" surfix={'x'}>
								{currentLeverage}
							</Numeral>
						</div>
					</div>
					<div className="orderly-my-5 orderly-h-[80px]">
						<LeverageEditor maxLeverage={maxLeverage} leverageLevers={leverageLevers} onSave={onSave} />
					</div>
				</DialogBody>
				<DialogFooter>
					<Button
						id="orderly-leverage-dialog-cancel"
						fullWidth
						color="tertiary"
						onClick={() => {
							setOpen(false);
						}}
					>
						Cancel
					</Button>
					<Button id="orderly-leverage-dialog-save" fullWidth onClick={() => onSubmit()} loading={isMutating}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
