'use client';
import { FC, useCallback, useContext, useState } from 'react';

import { useChains } from '@orderly.network/hooks';
import { API } from '@orderly.network/types';
import { toast } from '../../../toast';
import { isTestnet } from '@orderly.network/utils';
import { OrderlyAppContext } from '@/app/components/provider';
import { useTranslation } from '@/app/components/i18n';
import { cn } from '@/app/components/utils/css';
import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTrigger } from '@/app/components/dialog';
import Button from '@/app/components/button';
import { ChainListView } from '../../pickers/chainPicker';

export interface Props {
	onSetChain: (chainId: number) => Promise<any>;
}

export const ChainIdSwtich: FC<Props> = (props) => {
	const [open, setOpen] = useState(false);

	const { onChainChanged } = useContext(OrderlyAppContext);

	const [testChains] = useChains('testnet', {
		pick: 'network_infos',
		filter: (item: API.Chain) => isTestnet(item.network_infos?.chain_id),
	});

	const [mainChains] = useChains('mainnet', {
		pick: 'network_infos',
		filter: (chain: any) => chain.network_infos?.bridge_enable || chain.network_infos?.bridgeless,
	});

	const t = useTranslation();

	const onChainChange = useCallback(({ id, name }: { id: number; name: string }) => {
		props
			.onSetChain(id)
			.then(
				(isSuccess) => {
					if (isSuccess) {
						toast.success(t('toast.networkSwitched'));
						if (onChainChanged) {
							onChainChanged(id, isTestnet(id));
						}
					} else {
						toast.error(t('common.cancel'));
					}
				},
				(error) => {
					toast.error(error.message);
				},
			)
			.finally(() => setOpen(false));
	}, []);

	return (
		<div
			id="orderly-chain-id-switch"
			className={cn(
				'orderly-bg-warning-darken orderly-fixed orderly-left-0 orderly-right-0 orderly-bottom-[64px] orderly-text-warning orderly-z-10 orderly-text-3xs orderly-font-semibold orderly-leading-[18px] orderly-p-[10px]',
				'desktop:orderly-h-[40px] desktop:orderly-text-sm desktop:orderly-flex desktop:orderly-items-center desktop:orderly-justify-center desktop:orderly-static',
			)}
		>
			<span>Please connect to a supported network.</span>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger>
					<div className="desktop:orderly-hidden orderly-text-link-light orderly-ml-[2px]">Switch network</div>

					<Button
						variant={'outlined'}
						size={'small'}
						className="orderly-hidden desktop:orderly-block orderly-text-warning orderly-border-warning hover:orderly-text-warning orderly-px-[8px] orderly-ml-[10px] orderly-text-3xs desktop:orderly-text-3xs"
					>
						Switch network
					</Button>
				</DialogTrigger>
				<DialogContent closable>
					<DialogHeader className="orderly-switch-network-dialog-title orderly-text-xs">Switch network</DialogHeader>
					<DialogBody className="orderly-max-h-[327.5px] orderly-overflow-y-auto orderly-text-3xs">
						<ChainListView
							// @ts-ignore
							mainChains={mainChains}
							// @ts-ignore
							testChains={testChains}
							// @ts-ignore
							onItemClick={onChainChange}
						/>
					</DialogBody>
				</DialogContent>
			</Dialog>
		</div>
	);
};
