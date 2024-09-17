'use client';
import { FC, useState } from 'react';
import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import Button from '../globals/button';
import { useMutation } from '@orderly.network/hooks';

declare global {
	interface Window {
		ethereum: any;
	}
}

interface Props {}

export const DeleteDialog: FC<any> = (props) => {
	const [open, setOpen] = useState(false);

	const [removeKey] = useMutation('/v1/client/remove_orderly_key', 'POST');

	const handleOk = async () => {
		const data = await removeKey({
			orderly_key: props?.record?.orderly_key,
		});

		data.success && props?.mutate && props.mutate();
		data.success && setOpen(false);
	};

	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>{props.children}</DialogTrigger>
				<DialogContent
					onOpenAutoFocus={(e) => e.preventDefault()}
					closable
					maxWidth={'sm'}
					className="orderly-max-w-[360px]"
				>
					<DialogHeader>
						<DialogTitle>Delete API key</DialogTitle>
					</DialogHeader>
					<DialogBody>
						<div className="orderly-py-5 orderly-text-[13px]">
							Delete your API key <span className="orderly-text-[#608CFF]">{props.key}</span> ?
						</div>
						<div className="orderly-flex orderly-items-center orderly-w-full orderly-gap-2 orderly-pt-3">
							<Button
								onClick={() => setOpen(false)}
								className="orderly-w-full orderly-h-8 !orderly-bg-[#4A5369] orderly-text-[14px]"
								hover="!hover:orderly-bg-[#394155]"
							>
								Cancel
							</Button>
							<Button
								className="orderly-w-full orderly-text-[14px] orderly-h-8 !hover:orderly-bg-[#394155]"
								onClick={handleOk}
							>
								Confirm
							</Button>
						</div>
					</DialogBody>
				</DialogContent>
			</Dialog>
		</div>
	);
};
