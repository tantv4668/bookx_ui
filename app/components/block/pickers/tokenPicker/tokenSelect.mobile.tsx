'use client';
import { FC, ReactNode } from 'react';
import { API } from '@orderly.network/types';
import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTrigger } from '@/app/components/dialog';
import { TokenListView } from '.';

interface TokenSelectProps {
	tokens: API.TokenInfo[];
	onTokenChange?: (token: API.TokenInfo) => void;
	fetchBalance: (token: string, decimals: number) => Promise<any>;
	trigger: ReactNode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onClosed?: () => void;
	disabled?: boolean;
}

export const MobileTokenSelect: FC<TokenSelectProps> = (props) => {
	return (
		<Dialog open={props.open} onOpenChange={props.onOpenChange}>
			<DialogTrigger disabled={props.disabled} asChild>
				{props.trigger}
			</DialogTrigger>

			<DialogContent
				className="orderly-token-select-dialog"
				onCloseAutoFocus={(event) => {
					event.preventDefault();
					props.onClosed?.();
				}}
				onOpenAutoFocus={(event) => event.preventDefault()}
				closable
			>
				<DialogHeader className="after:orderly-hidden">Select token</DialogHeader>
				<DialogBody>
					<TokenListView
						tokens={props.tokens}
						fetchBalance={props.fetchBalance}
						onItemClick={(token) => {
							props.onTokenChange?.(token);
							props.onOpenChange(false);
						}}
					/>
				</DialogBody>
			</DialogContent>
		</Dialog>
	);
};
