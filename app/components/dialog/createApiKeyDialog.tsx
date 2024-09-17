'use client';
import { FC, useCallback, useState } from 'react';
import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import Button from '../globals/button';
import { cn } from '../utils/css';
import { Checkbox } from '../globals/checkbox';
import { useAccount, useMutation } from '@orderly.network/hooks';
import { encodeBase58, ethers } from 'ethers';
import { getPublicKeyAsync, utils } from '@noble/ed25519';
import { toast } from '../toast';
import { CopyIDIcon } from '../assets/icons/copyIDIcon';

declare global {
	interface Window {
		ethereum: any;
	}
}

interface Props {}

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

export const CreateApiKeyDialog: FC<any> = (props) => {
	const defaultForm = {
		ip: props?.isEdit && props?.record?.scope ? props?.record?.ip_restriction_list : '',
		read: props?.isEdit && props?.record?.scope ? props?.record?.scope.includes('read') : true,
		trading: props?.isEdit && props?.record?.scope ? props?.record?.scope.includes('trading') : true,
	};
	const [open, setOpen] = useState(false);
	const [openShowKey, setOpenShowKey] = useState(false);
	const [formData, setFormData] = useState(defaultForm);
	const [keyData, setKeyData] = useState<any>('');

	const { account } = useAccount();

	const CHAIN_ID = account.wallet?.chainId.toString();

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
				scope:
					String(formData.read ? 'read' : '') +
					(formData.read && formData.trading ? ',' : '') +
					String(formData.trading ? 'trading' : ''),
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
					ip_restriction_list: formData.ip,
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

			if (data?.success && keyRes) {
				setKeyData(data.data.orderly_key);
				setOpenShowKey(true);
				setOpen(false);
			}

			console.log('??addAccessKey', data);
		} catch (error) {
			console.error('Error creating Orderly key:', error);
		}
		// const res = await createOrderlyKey(true);
	}, [formData]);

	const handleEdit = useCallback(async () => {
		try {
			if (!window.ethereum) {
				toast.error('MetaMask is not installed');
				return;
			}
			const data = await setIp({
				ip_restriction_list: formData.ip,
				orderly_key: props?.record?.orderly_key,
			});

			data.success && props?.mutate && props.mutate();
			data.success && handleClose();
		} catch (error) {
			console.error('Error creating Orderly key:', error);
		}
	}, [formData]);

	const handleCopy = (content: any) => {
		navigator.clipboard.writeText(content).then(() => {
			toast.success('Copied to clipboard');
		});
	};

	const handleClose = () => {
		setFormData(defaultForm);
		setKeyData('');
		setOpenShowKey(false);
		setOpen(false);
	};

	return (
		<div>
			<Dialog open={open} onOpenChange={open ? handleClose : setOpen}>
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
								rows={4}
								className={cn(
									'orderly-input',
									'orderly-bg-[#4c4464] orderly-text-[12px] orderly-text-white orderly-p-3 orderly-flex-1 focus-visible:orderly-outline-none orderly-h-full orderly-w-full orderly-peer placeholder:orderly-text-base-contrast-20 placeholder:orderly-text-xs orderly-tabular-nums',
									`orderly-rounded-xl orderly-w-full orderly-border-0 focus:orderly-border orderly-outline-none orderly-placeholder-translucent focus:orderly-border-lightPurple`,
								)}
							/>
							<div className="orderly-flex-1 orderly-mb-1 orderly-mt-6 orderly-text-[13px]">Permissions</div>
							<div className="orderly-flex orderly-gap-6 orderly-items-center">
								<div className="orderly-flex orderly-gap-2 orderly-items-center">
									<Checkbox
										disabled={props?.isEdit}
										id={'read'}
										checked={formData.read}
										onCheckedChange={(e) => handleCheckedChange('read', e)}
									/>
									<span>Read</span>
								</div>
								<div className="orderly-flex orderly-gap-2 orderly-items-center">
									<Checkbox
										disabled={props?.isEdit}
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
								disabled={(!formData.trading && !formData.read) || formData.ip === props?.record?.ip_restriction_list}
								id="orderly-leverage-dialog-save"
								fullWidth
								onClick={() => (props?.isEdit ? handleEdit() : onSubmit())}
								// loading={isMutating}
								className="orderly-max-w-[154px] orderly-w-full orderly-h-[32px]"
							>
								Confirm
							</Button>
						</div>
					</DialogBody>
				</DialogContent>
			</Dialog>

			{!props.isEdit && (
				<Dialog open={openShowKey} onOpenChange={openShowKey ? handleClose : setOpenShowKey}>
					<DialogContent
						onOpenAutoFocus={(e) => e.preventDefault()}
						closable
						maxWidth={'sm'}
						className="orderly-max-w-[360px]"
					>
						<DialogHeader>
							<DialogTitle>API key created</DialogTitle>
						</DialogHeader>
						<DialogBody>
							<div className="orderly-text-base-contrast-54 orderly-pt-5 desktop:orderly-text-xs orderly-flex orderly-flex-col orderly-gap-4">
								<div>
									<div className="orderly-flex-1 orderly-mb-1 orderly-text-[13px]">API key</div>
									<div className="orderly-text-white orderly-text-[14px] orderly-flex orderly-items-center orderly-gap-1 orderly-justify-between">
										<div className="orderly-max-w-[300px] orderly-break-words">{keyData}</div>
										<span onClick={() => handleCopy(keyData)} className="orderly-cursor-pointer">
											<CopyIDIcon />
										</span>
									</div>
								</div>

								<div>
									<div className="orderly-flex-1 orderly-mb-1 orderly-text-[13px]">IP</div>
									<div className="orderly-text-white orderly-text-[14px] orderly-flex orderly-items-center orderly-gap-1 orderly-justify-between">
										<div>{formData.ip}</div>
										<span onClick={() => handleCopy(formData.ip)} className="orderly-cursor-pointer">
											<CopyIDIcon />
										</span>
									</div>
								</div>

								<div>
									<div className="orderly-flex-1 orderly-mb-1 orderly-text-[13px]">Permissions</div>
									<div className="orderly-text-white orderly-text-[14px] orderly-flex orderly-items-center orderly-gap-1">
										<div>
											{formData.read
												? 'Read'
												: '' + (formData.trading && formData.read ? ', ' : '') + formData.trading
												? 'Trading'
												: ''}
										</div>
									</div>
								</div>
								<div className="orderly-text-[#D25F00] orderly-text-center orderly-text-[13px] orderly-mt-4">
									Please copy the API secret. Once you close this pop-up, the API secret will be encrypted.
								</div>
							</div>
							<div className="orderly-flex orderly-items-center orderly-w-full orderly-gap-2 orderly-pt-3">
								<Button
									disabled={!formData.trading && !formData.read}
									id="orderly-leverage-dialog-save"
									fullWidth
									onClick={() => {
										const text = `{"key": "${keyData}", "ip": "${formData.ip}", "permissions": "${
											formData.read
												? 'Read'
												: '' + (formData.trading && formData.read ? ', ' : '') + formData.trading
												? 'Trading'
												: ''
										}"}`;
										handleCopy(text);
									}}
									className="orderly-w-full orderly-text-[14px] orderly-h-8 !hover:orderly-bg-[#394155]"
									hover="!hover:orderly-bg-[#394155]"
								>
									Copy API info
								</Button>
								<Button
									disabled={!formData.trading && !formData.read}
									id="orderly-leverage-dialog-save"
									fullWidth
									onClick={handleClose}
									className="orderly-w-full orderly-h-8 !orderly-bg-[#4A5369] orderly-text-[14px]"
									hover="!hover:orderly-bg-[#394155]"
								>
									Ok
								</Button>
							</div>
						</DialogBody>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
};
