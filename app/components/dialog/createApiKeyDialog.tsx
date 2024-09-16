'use client';
import { FC, useCallback, useState } from 'react';
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import Button from '../globals/button';
import { Input } from '../globals/input';
import { cn } from '../utils/css';
import { Checkbox } from '../globals/checkbox';
import { useAccount, useMutation, useQuery } from '@orderly.network/hooks';

interface Props {}

const defaultForm = {
	ip: '',
	read: true,
	trading: true,
};

export const CreateApiKeyDialog: FC<any> = (props) => {
	const [open, setOpen] = useState(false);
	const [checkIP, setCheckIP] = useState(true);
	const [formData, setFormData] = useState(defaultForm);
	// const [account, setAccount] = useState<any>();

	const { account, state } = useAccount();

	console.log('??', account.wallet?.chainId.toString());

	const handleCheckedChange = (name: string, e: boolean | string) => {
		setCheckIP(true);
		setFormData({ ...formData, [name]: e });
	};

	const { mutate } = useQuery(`/v1/get_account?address=${state.address}&broker_id=book_x`);

	// const [mutate] = useMutation(`v1/get_account?address=${state.address}&broker_id=book_x`);

	const onSubmit = useCallback(async () => {
		const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
		if (typeof formData.ip === 'string' && ipPattern.test(formData.ip)) {
			setCheckIP(true);
			try {
				const data = await mutate();
				// withdraw()
				console.log('??data', data);
			} catch (err) {
				console.error('Error:', err);
			}
			// const parts = formData.ip.split('.');
			// if (parts.every((part) => parseInt(part, 10) >= 0 && parseInt(part, 10) <= 255)) {
			// 	setCheckIP(true);
			// 	try {
			// 		const data = await mutate();
			// 		console.log('??data', data);
			// 	} catch (err) {
			// 		console.error('Error:', err);
			// 	}
			// } else setCheckIP(false);
		} else setCheckIP(false);
	}, []);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{props.children}</DialogTrigger>
			<DialogContent
				onOpenAutoFocus={(e) => e.preventDefault()}
				closable
				maxWidth={'sm'}
				className="orderly-max-w-[360px]"
			>
				<DialogHeader>
					<DialogTitle>Create API key</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<div className="orderly-text-base-contrast-54 orderly-py-5 desktop:orderly-text-xs">
						<div className="orderly-flex-1 orderly-mb-1 orderly-text-[12px]">IP restriction (optional)</div>
						<textarea
							onChange={(e) => handleCheckedChange('ip', e.target.value)}
							value={formData.ip}
							placeholder="Add IP addresses, separated by commas."
							rows={3}
							className={cn(
								'orderly-input',
								'orderly-bg-[#4c4464] orderly-text-[12px] orderly-text-white orderly-p-3 orderly-flex-1 focus-visible:orderly-outline-none orderly-h-full orderly-w-full orderly-peer placeholder:orderly-text-base-contrast-20 placeholder:orderly-text-xs orderly-tabular-nums',
								`orderly-rounded-xl orderly-w-full orderly-border-0 focus:orderly-border ${
									!checkIP && 'orderly-border orderly-border-red'
								} orderly-outline-none orderly-placeholder-translucent focus:orderly-border-lightPurple`,
							)}
						/>
						{!checkIP && (
							<div className="orderly-text-red orderly-text-[13px] orderly-flex orderly-gap-1 orderly-items-center">
								<div className="orderly-h-1 orderly-w-1 orderly-rounded-[50%] orderly-bg-red" /> IP restriction format
								is incorrect.
							</div>
						)}
						<div className="orderly-flex-1 orderly-mb-1 orderly-mt-6 orderly-text-[13px]">Permissions</div>
						<div className="orderly-flex orderly-gap-6 orderly-items-center">
							<div className="orderly-flex orderly-gap-2 orderly-items-center">
								<Checkbox id={'read'} checked={formData.read} onCheckedChange={(e) => handleCheckedChange('read', e)} />
								<span>Read</span>
							</div>
							<div className="orderly-flex orderly-gap-2 orderly-items-center">
								<Checkbox
									id={'trading'}
									checked={formData.trading}
									onCheckedChange={(e) => handleCheckedChange('trading', e)}
								/>
								<span>Trading</span>
							</div>
						</div>
					</div>
					<div className="orderly-flex orderly-justify-center orderly-w-full">
						<Button
							disabled={!formData.trading && !formData.read}
							id="orderly-leverage-dialog-save"
							fullWidth
							onClick={() => onSubmit()}
							// loading={isMutating}
							className="orderly-max-w-[154px] orderly-w-full"
						>
							Confirm
						</Button>
					</div>
				</DialogBody>
			</DialogContent>
		</Dialog>
	);
};
