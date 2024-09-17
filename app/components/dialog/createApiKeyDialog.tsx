'use client';
import { FC, useCallback, useState } from 'react';
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import Button from '../globals/button';
import { Input } from '../globals/input';
import { cn } from '../utils/css';
import { Checkbox } from '../globals/checkbox';
import { useAccount, useMutation, useQuery } from '@orderly.network/hooks';
import { encodeBase58, ethers } from 'ethers';
import { getPublicKeyAsync, utils } from '@noble/ed25519';

declare global {
	interface Window {
		ethereum: any;
	}
}

interface Props { }

const defaultForm = {
	ip: '',
	read: true,
	trading: true,
};

const MESSAGE_TYPES = {
	EIP712Domain: [
		{ name: 'name', type: 'string' },
		{ name: 'version', type: 'string' },
		{ name: 'chainId', type: 'uint256' },
		{ name: 'verifyingContract', type: 'address' },
	],
	AddOrderlyKey: [
		{ name: 'brokerId', type: 'string' },
		{ name: 'chainId', type: 'uint256' },
		{ name: 'orderlyKey', type: 'string' },
		{ name: 'scope', type: 'string' },
		{ name: 'timestamp', type: 'uint64' },
		{ name: 'expiration', type: 'uint64' },
	],
};

const OFF_CHAIN_DOMAIN = {
	name: 'Orderly',
	version: '1',
	chainId: 421614,
	verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
};

const BASE_URL = 'https://testnet-api-evm.orderly.org';
const BROKER_ID = 'book_x';
const CHAIN_ID = 421614;

export const CreateApiKeyDialog: FC<any> = (props) => {
	const [open, setOpen] = useState(false);
	const [checkIP, setCheckIP] = useState(true);
	const [formData, setFormData] = useState(defaultForm);
	// const [account, setAccount] = useState<any>();

	const { account, state, createOrderlyKey } = useAccount();

	const handleCheckedChange = (name: string, e: boolean | string) => {
		setFormData({ ...formData, [name]: e });
	};

	const [createOrderlyKy] = useMutation('/v1/orderly_key', 'POST');

	const [setIp] = useMutation('/v1/client/set_orderly_key_ip_restriction', 'POST');

	const onSubmit = useCallback(async () => {
		try {
			if (!window.ethereum) {
				console.error('MetaMask is not installed');
				return;
			}

			const provider = new ethers.BrowserProvider(window.ethereum);
			await provider.send('eth_requestAccounts', []);
			const signer = await provider.getSigner();

			const privateKey = utils.randomPrivateKey();
			const orderlyKey = `ed25519:${encodeBase58(await getPublicKeyAsync(privateKey))}`;
			const timestamp = Date.now();
			const addKeyMessage = {
				brokerId: BROKER_ID,
				chainId: CHAIN_ID,
				orderlyKey,
				scope: 'read,trading',
				tag: 'manualCreated',
				timestamp,
				expiration: timestamp + 1 * 60 * 60 * 24 * 365, // 1 year
			};

			const typedData = {
				domain: OFF_CHAIN_DOMAIN,
				types: {
					EIP712Domain: MESSAGE_TYPES.EIP712Domain,
					AddOrderlyKey: MESSAGE_TYPES.AddOrderlyKey,
				},
				primaryType: 'AddOrderlyKey',
				message: addKeyMessage,
			};

			const signature = await window.ethereum.request({
				method: 'eth_signTypedData_v4',
				params: [await signer.getAddress(), JSON.stringify(typedData)],
			});

			const userAddress = await signer.getAddress();

			const data = await createOrderlyKy({
				message: addKeyMessage,
				signature,
				userAddress: userAddress,
			});

			data &&
				(await setIp({
					ip_restriction_list: '5.5.5.5',
					orderly_key: orderlyKey,
				}));

			const keyRes = await fetch(`${BASE_URL}/v1/orderly_key`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					message: addKeyMessage,
					signature,
					userAddress: await signer.getAddress(),
				}),
			});

			console.log('addAccessKey', data);
		} catch (error) {
			console.error('Error creating Orderly key:', error);
		}
		// const res = await createOrderlyKey(true);
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
