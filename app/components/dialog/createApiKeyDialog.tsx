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

	const handleCheckedChange = (name: string, e: boolean | string) => {
		setFormData({ ...formData, [name]: e });
	};

	const { mutate } = useQuery(`/v1/get_account?address=${state.address}&broker_id=book_x`);

	// const [mutate] = useMutation(`v1/get_account?address=${state.address}&broker_id=book_x`);

	const onSubmit = useCallback(async () => {
		setCheckIP(true);
		try {
			const data = await mutate();
			// withdraw()
			console.log('??data', data);
		} catch (err) {
			console.error('Error:', err);
		}
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
								`orderly-rounded-xl orderly-w-full orderly-border-0 focus:orderly-border orderly-outline-none orderly-placeholder-translucent focus:orderly-border-lightPurple`,
							)}
						/>
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
